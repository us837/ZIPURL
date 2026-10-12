'use client';

import { useState } from 'react';

const colors = ['#171717', '#dc2626', '#ea580c', '#16a34a', '#0ea5e9', '#1458e9', '#7c3aed', '#db2777'];

function cellIsFilled(row, column) {
  const finder = (top, left) => {
    const r = row - top;
    const c = column - left;
    if (r < 0 || r > 6 || c < 0 || c > 6) return false;
    return r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
  };
  if (finder(0, 0) || finder(0, 14) || finder(14, 0)) return true;
  return ((row * 13 + column * 7 + row * column * 3) % 11) < 5;
}

function QrPreview({ color, pattern, corner }) {
  const shape = pattern === 'dots' ? 'rounded-full' : pattern === 'rounded' ? 'rounded-[3px]' : 'rounded-[1px]';
  return <div aria-label="QR code visual preview" className={`relative w-full max-w-[270px] rounded-xl bg-white p-4 shadow-sm ${corner === 'framed' ? 'ring-1 ring-slate-300' : ''}`}><div className="grid aspect-square grid-cols-[repeat(21,minmax(0,1fr))] gap-px">{Array.from({ length: 441 }, (_, index) => <span key={index} className={`aspect-square ${shape}`} style={{ backgroundColor: cellIsFilled(Math.floor(index / 21), index % 21) ? color : 'transparent' }} />)}</div><span className="absolute bottom-2 right-2 rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-black tracking-tight text-slate-500">ZIPURL</span></div>;
}

function Option({ active, onClick, children, label }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`flex h-14 flex-1 items-center justify-center rounded-lg border transition ${active ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-slate-400'}`} aria-label={label}>{children}</button>;
}

export default function QrDesigner() {
  const [url, setUrl] = useState('');
  const [pattern, setPattern] = useState('square');
  const [corner, setCorner] = useState('solid');
  const [color, setColor] = useState('#1458e9');
  const [frame, setFrame] = useState('none');

  return <div className="grid overflow-hidden rounded-2xl border border-slate-100 lg:grid-cols-[1.15fr_.85fr]">
    <div className="p-5 sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Create a QR Code</h2>
      <div className="mt-7 space-y-6">
        <div><label htmlFor="qr-url" className="text-sm font-bold text-slate-800">1. Enter your URL destination</label><input id="qr-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/my-long-url" className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /></div>
        <div><p className="text-sm font-bold text-slate-800">2. Select a style <span className="font-normal text-slate-400">(optional)</span></p><div className="mt-3 grid grid-cols-3 gap-2"><Option active={pattern === 'square'} onClick={() => setPattern('square')} label="Square pattern"><span className="grid grid-cols-4 gap-0.5">{Array.from({ length: 16 }, (_, index) => <i key={index} className="h-2 w-2 bg-slate-800" />)}</span></Option><Option active={pattern === 'rounded'} onClick={() => setPattern('rounded')} label="Rounded pattern"><span className="grid grid-cols-4 gap-0.5">{Array.from({ length: 16 }, (_, index) => <i key={index} className="h-2 w-2 rounded-sm bg-slate-800" />)}</span></Option><Option active={pattern === 'dots'} onClick={() => setPattern('dots')} label="Dot pattern"><span className="grid grid-cols-4 gap-0.5">{Array.from({ length: 16 }, (_, index) => <i key={index} className="h-2 w-2 rounded-full bg-slate-800" />)}</span></Option></div><p className="mt-3 text-xs font-semibold text-slate-500">Corners</p><div className="mt-2 grid grid-cols-2 gap-2"><Option active={corner === 'solid'} onClick={() => setCorner('solid')} label="Solid square corners"><span className="h-6 w-6 border-[5px] border-slate-800 bg-white outline outline-2 outline-slate-800" /></Option><Option active={corner === 'framed'} onClick={() => setCorner('framed')} label="Framed square corners"><span className="flex h-8 w-8 items-center justify-center rounded-sm border-4 border-slate-800"><span className="h-2 w-2 bg-slate-800" /></span></Option></div></div>
        <div><p className="text-sm font-bold text-slate-800">3. Choose your color <span className="font-normal text-slate-400">(optional)</span></p><div className="mt-3 flex flex-wrap gap-2.5">{colors.map((item) => <button type="button" key={item} onClick={() => setColor(item)} aria-label={`Choose ${item} QR color`} aria-pressed={color === item} className={`h-7 w-7 rounded-full transition ${color === item ? 'ring-2 ring-offset-2 ring-slate-900' : 'hover:scale-110'}`} style={{ backgroundColor: item }} />)}</div></div>
        <div><p className="text-sm font-bold text-slate-800">4. Select a frame <span className="font-normal text-slate-400">(optional)</span></p><div className="mt-3 grid grid-cols-4 gap-2"><Option active={frame === 'none'} onClick={() => setFrame('none')} label="No frame"><span className="text-xl font-light text-slate-500">×</span></Option><Option active={frame === 'border'} onClick={() => setFrame('border')} label="Square border frame"><span className="h-8 w-9 border-2 border-slate-800" /></Option><Option active={frame === 'scan'} onClick={() => setFrame('scan')} label="Scan me banner frame"><span className="border-2 border-slate-800 px-1 py-0.5 text-[7px] font-black">SCAN ME</span></Option><Option active={frame === 'bubble'} onClick={() => setFrame('bubble')} label="Speech bubble frame"><span className="rounded-full border-2 border-slate-800 px-1.5 py-1 text-[7px] font-bold">Scan</span></Option></div></div>
      </div>
    </div>
    <aside className="flex flex-col items-center justify-center bg-[#f7f4ee] px-5 py-8 text-center sm:px-8">
      <div className={`flex w-full max-w-[310px] justify-center ${frame === 'border' ? 'border-4 border-slate-800 p-3' : frame === 'scan' ? 'border-4 border-slate-800 p-3 pt-8' : frame === 'bubble' ? 'rounded-[2rem] border-4 border-slate-800 p-3' : ''}`}><QrPreview color={color} pattern={pattern} corner={corner} /></div>
      <p className="mt-4 text-xs text-slate-500">Note: This is a standard QR Code preview.</p>
      <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1458e9] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700">Get your QR Code for free <span aria-hidden="true">→</span></button>
      <p className="mt-3 text-xs text-slate-500">No credit card required.</p>
      <div className="mt-7 grid grid-cols-3 gap-2 text-[7px] font-black leading-tight text-slate-600"><span className="rounded-md border border-slate-300 bg-white px-2 py-3">G2<br /><b className="text-[8px] text-orange-600">LEADER</b><br />WINTER 2024</span><span className="rounded-md border border-slate-300 bg-white px-2 py-3">G2<br /><b className="text-[8px] text-orange-600">LEADER</b><br />SMALL BUSINESS</span><span className="rounded-md border border-slate-300 bg-white px-2 py-3">G2<br /><b className="text-[8px] text-orange-600">HIGHEST</b><br />USER ADOPTION</span></div>
    </aside>
  </div>;
}
