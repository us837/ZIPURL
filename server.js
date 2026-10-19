require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

// 1. PostgreSQL Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 2. Redis Connection
// const redisClient = createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        // Automatically enables TLS if connecting via Upstash rediss://
        tls: process.env.REDIS_URL?.startsWith('rediss://') ? true : undefined
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Base62 Character Set
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(num) {
    if (num === 0) return CHARS[0];
    let encoded = "";
    while (num > 0) {
        encoded = CHARS[num % 62] + encoded;
        num = Math.floor(num / 62);
    }
    return encoded;
}

// Initialize Database Table if it doesn't exist
async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS urls (
            id SERIAL PRIMARY KEY,
            long_url TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

// Endpoint: Shorten a URL
app.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    try {
        // Insert into Postgres to get an auto-incrementing ID
        const result = await pool.query(
            'INSERT INTO urls (long_url) VALUES ($1) RETURNING id',
            [longUrl]
        );
        const id = result.rows[0].id;

        // Encode ID to Base62 slug
        const slug = encodeBase62(id);

        // Cache the slug -> longUrl mapping in Redis
        await redisClient.set(slug, longUrl);

        res.json({
            slug,
            shortUrl: `${req.protocol}://${req.get('host')}/${slug}`,
            longUrl
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint: Redirect short slug to original URL (Cache-Aside Pattern)
app.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        // Step 1: Check Redis Cache first
        let longUrl = await redisClient.get(slug);

        if (longUrl) {
            return res.redirect(301, longUrl);
        }

        // Step 2: Cache Miss -> Query PostgreSQL
        // Decode slug back to ID (or query by matching pattern, but since we map slug directly, let's reverse-engineer ID or store slug in DB. For simplicity, let's decode Base62 to ID)
        let id = 0;
        for (let i = 0; i < slug.length; i++) {
            id = id * 62 + CHARS.indexOf(slug[i]);
        }

        const result = await pool.query('SELECT long_url FROM urls WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'URL not found' });
        }

        longUrl = result.rows[0].long_url;

        // Step 3: Warm the Redis cache for future requests
        await redisClient.set(slug, longUrl);

        return res.redirect(301, longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
async function start() {
    await redisClient.connect();
    await initDB();
    app.listen(PORT, () => {
        console.log(`ZIPURL server running on port ${PORT}`);
    });
}

start();