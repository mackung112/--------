import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Play, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L12_SQLDashboardDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Dashboard Builder Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const products = [
    { id: 1, name: 'Laptop', category: 'IT', qty: 45, price: 25000 },
    { id: 2, name: 'Mouse', category: 'IT', qty: 120, price: 590 },
    { id: 3, name: 'Desk', category: 'Furniture', qty: 30, price: 4500 },
    { id: 4, name: 'Chair', category: 'Furniture', qty: 25, price: 3800 },
    { id: 5, name: 'Monitor', category: 'IT', qty: 60, price: 8500 },
    { id: 6, name: 'Keyboard', category: 'IT', qty: 80, price: 1200 },
  ];

  const scenarios = {
    kpi: {
      title: '1. Key Metrics', desc: 'ดึงตัวเลขสำคัญแสดงบน Dashboard',
      sqlStr: 'SELECT COUNT(*) AS total_products, SUM(qty*price) AS revenue, ROUND(AVG(price),0) AS avg_price FROM products;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span><br/>{'  '}<span className="text-[#89dceb]">COUNT</span>(*) <span className="text-[#f9e2af]">AS</span> total_products,<br/>{'  '}<span className="text-[#89dceb]">SUM</span>(qty*price) <span className="text-[#f9e2af]">AS</span> revenue,<br/>{'  '}<span className="text-[#89dceb]">ROUND</span>(<span className="text-[#89dceb]">AVG</span>(price),<span className="text-[#fab387]">0</span>) <span className="text-[#f9e2af]">AS</span> avg_price<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span>;</>),
      run: () => {
        const total = products.length;
        const revenue = products.reduce((s, p) => s + p.qty * p.price, 0);
        const avg = Math.round(products.reduce((s, p) => s + p.price, 0) / total);
        return { type: 'kpi', cards: [
          { label: 'สินค้าทั้งหมด', value: total, unit: 'รายการ', color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: 'รายได้รวม', value: `฿${revenue.toLocaleString()}`, unit: '', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'ราคาเฉลี่ย', value: `฿${avg.toLocaleString()}`, unit: '', color: 'bg-amber-50 border-amber-200 text-amber-700' },
        ]};
      },
    },
    top: {
      title: '2. Top Products', desc: 'สินค้ารายได้สูงสุด 5 อันดับ',
      sqlStr: 'SELECT name, qty*price AS total_sales FROM products ORDER BY total_sales DESC LIMIT 5;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> name,<br/>{'  '}qty*price <span className="text-[#f9e2af]">AS</span> total_sales<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/><span className="text-[#cba6f7] font-bold">ORDER BY</span> total_sales <span className="text-[#cba6f7]">DESC</span><br/><span className="text-[#cba6f7] font-bold">LIMIT</span> <span className="text-[#fab387]">5</span>;</>),
      run: () => {
        const sorted = products.map(p => ({ ...p, total: p.qty * p.price })).sort((a, b) => b.total - a.total).slice(0, 5);
        const max = sorted[0].total;
        return { type: 'top', rows: sorted, max };
      },
    },
    category: {
      title: '3. By Category', desc: 'ยอดขายแยกตามหมวดหมู่',
      sqlStr: 'SELECT category, COUNT(*) AS cnt, SUM(qty*price) AS total FROM products GROUP BY category;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> category,<br/>{'  '}<span className="text-[#89dceb]">COUNT</span>(*) <span className="text-[#f9e2af]">AS</span> cnt,<br/>{'  '}<span className="text-[#89dceb]">SUM</span>(qty*price) <span className="text-[#f9e2af]">AS</span> total<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/><span className="text-[#cba6f7] font-bold">GROUP BY</span> category;</>),
      run: () => {
        const groups = {};
        products.forEach(p => {
          if (!groups[p.category]) groups[p.category] = { cnt: 0, total: 0 };
          groups[p.category].cnt++; groups[p.category].total += p.qty * p.price;
        });
        const rows = Object.entries(groups).map(([cat, d]) => ({ cat, ...d }));
        const max = Math.max(...rows.map(r => r.total));
        return { type: 'cat', rows, max };
      },
    },
  };

  const [active, setActive] = useState('kpi');
  const [result, setResult] = useState(null);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResult(null);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResult(r); setAnim(false);
      if (r.type === 'kpi') r.cards.forEach(c => log(`> ${c.label}: ${c.value} ${c.unit}`, 'success'));
      else if (r.type === 'top') r.rows.forEach(row => log(`> ${row.name}: ฿${row.total.toLocaleString()}`, 'success'));
      else r.rows.forEach(row => log(`> ${row.cat}: ${row.cnt} items, ฿${row.total.toLocaleString()}`, 'success'));
    }, 500);
  };
  const reset = () => { setResult(null); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'ORDER BY total_sales DESC LIMIT 10', correct: true },
    { val: 'b', label: 'SELECT TOP 10 * FROM products' },
    { val: 'c', label: 'SELECT MAX(total_sales) 10' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! MySQL ใช้ ORDER BY...DESC + LIMIT N หา Top N' : '> ❌ SELECT TOP เป็นของ SQL Server ไม่ใช่ MySQL', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg"><LayoutDashboard size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การสร้างแดชบอร์ด (Dashboard)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">Dashboard คือหน้าจอสรุปข้อมูลสำคัญ — ใช้ Aggregate Functions สร้าง KPI, Bar Charts และ Top N Rankings</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResult(null); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm flex items-center gap-1 transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={anim} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <h4 className="font-bold text-slate-700 text-sm">📊 Dashboard Preview</h4>
            {result ? (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                {result.type === 'kpi' && (
                  <div className="grid grid-cols-3 gap-3">
                    {result.cards.map(c => (
                      <div key={c.label} className={`${c.color} border rounded-xl p-4 text-center`}>
                        <div className="text-xs font-bold uppercase mb-1 opacity-70">{c.label}</div>
                        <div className="text-2xl font-bold font-mono">{c.value}</div>
                        {c.unit && <div className="text-xs mt-1">{c.unit}</div>}
                      </div>
                    ))}
                  </div>
                )}
                {result.type === 'top' && (
                  <div className="space-y-2">
                    {result.rows.map((r, i) => (
                      <div key={r.id} className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-400 text-white' : i === 2 ? 'bg-orange-400 text-white' : 'bg-slate-200 text-slate-600'}`}>{i + 1}</span>
                        <span className="w-20 text-sm font-medium text-slate-700">{r.name}</span>
                        <div className="flex-1"><div className="h-5 rounded bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-700" style={{ width: `${(r.total / result.max) * 100}%` }}></div></div>
                        <span className="text-xs font-mono text-cyan-700 font-bold w-24 text-right">฿{r.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
                {result.type === 'cat' && (
                  <div className="space-y-3">
                    {result.rows.map(r => (
                      <div key={r.cat} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-700">{r.cat}</span>
                          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-bold">{r.cnt} items</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1"><div className="h-4 rounded bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-700" style={{ width: `${(r.total / result.max) * 100}%` }}></div></div>
                          <span className="text-xs font-mono text-cyan-700 font-bold">฿{r.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm gap-2">
                <LayoutDashboard size={32} className="opacity-30"/>
                <span>กด Run Query เพื่อดู Dashboard</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-cyan-500"/> Quiz: Top N</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">คำสั่งใดเหมาะที่สุดสำหรับหา "สินค้าขายดีที่สุด 10 อันดับแรก" บน Dashboard?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all ${qAns === o.val ? 'bg-cyan-50 border-cyan-400 text-cyan-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-cyan-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-200">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
