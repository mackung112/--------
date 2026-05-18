import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L3_SQLOrderByDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'ORDER BY Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const products = [
    { id: 1, name: 'Laptop', price: 25000, stock: 15 },
    { id: 2, name: 'Mouse', price: 590, stock: 80 },
    { id: 3, name: 'Keyboard', price: 1200, stock: 45 },
    { id: 4, name: 'Monitor', price: 8500, stock: 20 },
    { id: 5, name: 'Headset', price: 2500, stock: 35 },
  ];

  const scenarios = {
    asc: {
      title: '1. ASC (น้อย→มาก)', desc: 'เรียงราคาจากถูกที่สุด',
      sqlStr: 'SELECT * FROM products ORDER BY price ASC;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/><span className="text-[#cba6f7] font-bold">ORDER BY</span> price <span className="text-[#89dceb]">ASC</span>;</>),
      run: () => [...products].sort((a, b) => a.price - b.price),
    },
    desc: {
      title: '2. DESC (มาก→น้อย)', desc: 'เรียงราคาจากแพงที่สุด',
      sqlStr: 'SELECT * FROM products ORDER BY price DESC;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/><span className="text-[#cba6f7] font-bold">ORDER BY</span> price <span className="text-[#89dceb]">DESC</span>;</>),
      run: () => [...products].sort((a, b) => b.price - a.price),
    },
    multi: {
      title: '3. หลายคอลัมน์', desc: 'เรียงตาม stock (ASC) ถ้าซ้ำจัดตาม price (DESC)',
      sqlStr: 'SELECT * FROM products ORDER BY stock ASC, price DESC;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> * <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/><span className="text-[#cba6f7] font-bold">ORDER BY</span> stock <span className="text-[#89dceb]">ASC</span>, price <span className="text-[#89dceb]">DESC</span>;</>),
      run: () => [...products].sort((a, b) => a.stock - b.stock || b.price - a.price),
    },
  };

  const [active, setActive] = useState('asc');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      log(`> ${r.length} rows sorted`, 'success');
      r.forEach((row, i) => log(`> #${i + 1}: ${row.name} — ฿${row.price.toLocaleString()} (stock: ${row.stock})`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'ORDER BY price DESC', correct: true },
    { val: 'b', label: 'ORDER BY price ASC' },
    { val: 'c', label: 'ORDER BY price HIGH' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! DESC = มากไปน้อย ราคาแพงสุดมาก่อน' : '> ❌ ASC เรียงจากน้อยไปมาก, SQL ไม่มี HIGH keyword', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><ArrowUpDown size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดเรียงข้อมูล (ORDER BY)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">ORDER BY จัดเรียงผลลัพธ์ — ASC (น้อย→มาก, Default), DESC (มาก→น้อย) และเรียงหลายคอลัมน์ได้</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-amber-400 border-b-2 border-amber-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
                  {scenarios[k].title}
                </button>
              ))}
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="font-mono text-[14px] leading-loose mb-3"><div key={active} className="animate-in fade-in zoom-in-95 duration-300">{sc.sql}</div></div>
                <p className="text-xs text-slate-600 border-t border-slate-700/50 pt-3">{sc.desc}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={anim} className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-amber-600"/> {results.length > 0 ? 'ผลลัพธ์หลังจัดเรียง' : 'ตาราง products (ก่อนจัดเรียง)'}</h4>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">#</th><th className="p-2 border-b font-semibold">name</th><th className="p-2 border-b font-semibold text-right">price</th><th className="p-2 border-b font-semibold text-right">stock</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {(results.length > 0 ? results : products).map((r, i) => (
                    <tr key={r.id} className={`transition-all duration-500 ${results.length > 0 ? 'bg-amber-50' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="p-2 text-center font-mono text-xs text-slate-500">{i + 1}</td>
                      <td className="p-2 font-medium text-slate-700">{r.name}</td>
                      <td className="p-2 text-right font-mono text-sm font-bold text-amber-700">฿{r.price.toLocaleString()}</td>
                      <td className="p-2 text-right font-mono text-sm">{r.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-amber-500"/> Quiz: ORDER BY</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ถ้าต้องการแสดงสินค้า "ราคาแพงที่สุด" ขึ้นมาก่อน ต้องเรียงแบบใด?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all ${qAns === o.val ? 'bg-amber-50 border-amber-400 text-amber-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-amber-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
