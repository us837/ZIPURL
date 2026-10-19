require('dotenv').config();
const express = require('express');
const { createClient } = require('redis');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

// PostgreSQL Pool Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Redis Client Connection
// const redisClient = createClient({
//     url: process.env.REDIS_URL || 'redis://redis:6379',
//     socket: {
//         reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
//     }
// });

// redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Redis Client Connection
// const redisClient = createClient({
//     url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
//     socket: {
//         tls: process.env.REDIS_URL?.startsWith('rediss://') ? true : undefined,
//         reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
//     }
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Redis Client Connection with TLS support for Upstash
// Redis Client Setup
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const isSecure = redisUrl.startsWith('rediss://');

const redisClient = createClient({
    url: redisUrl,
    socket: {
        tls: isSecure ? { rejectUnauthorized: false } : undefined,
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully.');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

// Base62 Algorithm
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(num) {
    if (!Number.isSafeInteger(num) || num < 0) {
        throw new Error("Input must be a non-negative safe integer");
    }
    if (num === 0) return CHARS[0];
    let encoded = "";
    while (num > 0) {
        encoded = CHARS[num % 62] + encoded;
        num = Math.floor(num / 62);
    }
    return encoded;
}

// Rate Limiting Middleware using Redis
async function rateLimiter(req, res, next) {
    const clientIp = req.ip || req.socket.remoteAddress;
    const rateLimitKey = `ratelimit:${clientIp}`;
    const WINDOW_SECONDS = 60;
    const MAX_REQUESTS = 5; // Limit to 5 shorten requests per minute for testing

    try {
        const requests = await redisClient.incr(rateLimitKey);
        if (requests === 1) {
            await redisClient.expire(rateLimitKey, WINDOW_SECONDS);
        }

        if (requests > MAX_REQUESTS) {
            const ttl = await redisClient.ttl(rateLimitKey);
            return res.status(429).json({ 
                error: 'Too many requests, please try again later.',
                retryAfterSeconds: ttl 
            });
        }
        next();
    } catch (err) {
        console.error('Rate limiter error:', err);
        // Fail open if Redis hiccups so the app doesn't go down
        next(); 
    }
}

app.get('/health', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        const redisReady = redisClient.isOpen;
        res.json({ ok: true, postgres: true, redis: redisReady });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(503).json({ ok: false, error: 'Service unavailable' });
    }
});

// Endpoint: Shorten a URL (Protected with Rate Limiter)
app.post('/api/shorten', rateLimiter, async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO urls (long_url) VALUES ($1) RETURNING id',
            [longUrl]
        );
        
        const id = parseInt(result.rows[0].id, 10);
        const slug = encodeBase62(id);

        await redisClient.set(slug, longUrl);

        res.json({
            slug,
            shortUrl: `${req.protocol}://${req.get('host')}/${slug}`,
            longUrl
        });
    } catch (err) {
        console.error('Error shortening URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint: Redirect short slug
app.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        let longUrl = await redisClient.get(slug);
        if (longUrl) {
            return res.redirect(301, longUrl);
        }

        let id = 0;
        for (let i = 0; i < slug.length; i++) {
            const index = CHARS.indexOf(slug[i]);
            if (index === -1) {
                return res.status(404).json({ error: 'Invalid short URL slug' });
            }
            id = id * 62 + index;
        }

        const result = await pool.query('SELECT long_url FROM urls WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'URL not found' });
        }

        longUrl = result.rows[0].long_url;
        await redisClient.set(slug, longUrl);

        return res.redirect(301, longUrl);
    } catch (err) {
        console.error('Error redirecting slug:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Robust Startup Sequence
async function start() {
    try {
        console.log('Connecting to PostgreSQL...');
        await pool.query('SELECT 1');
        console.log('PostgreSQL connected successfully.');

        console.log('Connecting to Redis...');
        await redisClient.connect();
        console.log('Redis connected successfully.');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`ZIPURL server running live on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start ZIPURL application:', err);
        process.exit(1);
    }
}

start();