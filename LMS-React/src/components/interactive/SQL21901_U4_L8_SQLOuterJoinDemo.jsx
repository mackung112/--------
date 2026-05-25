import React, { useState, useRef, useEffect } from 'react';
import { CircleDashed, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare, Users, ShoppingCart } from 'lucide-react';


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function SQL21901_U4_L8_SQLOuterJoinDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'LEFT/RIGHT JOIN Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const customers = [
    { id: 1, name: 'สมชาย' },
    { id: 2, name: 'สมหญิง' },
    { id: 3, name: 'วิชัย' },
  ];
  const orders = [
    { id: 101, c_id: 1, item: 'Laptop' },
    { id: 102, c_id: 1, item: 'Mouse' },
    { id: 103, c_id: 99, item: 'Keyboard (ไม่มีเจ้าของ)' },
  ];

  const scenarios = {
    left: {
      title: '1. LEFT JOIN', desc: 'เอาตาราง A (ซ้าย) เป็นหลัก ลูกค้าทุกคนแสดง',
      sqlStr: 'SELECT c.name, o.item FROM customers c LEFT JOIN orders o ON c.id = o.c_id;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> c.name, o.item<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span> c<br/><span className="text-[#89dceb] font-bold">LEFT JOIN</span> <span className="text-[#a6e3a1]">orders</span> o<br/>{'  '}<span className="text-[#89dceb]">ON</span> c.id = o.c_id;</>),
      run: () => [
        { name: 'สมชาย', item: 'Laptop' },
        { name: 'สมชาย', item: 'Mouse' },
        { name: 'สมหญิง', item: 'NULL' },
        { name: 'วิชัย', item: 'NULL' },
      ],
      color: 'emerald',
    },
    right: {
      title: '2. RIGHT JOIN', desc: 'เอาตาราง B (ขวา) เป็นหลัก ออเดอร์ทุกรายการแสดง',
      sqlStr: 'SELECT c.name, o.item FROM customers c RIGHT JOIN orders o ON c.id = o.c_id;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> c.name, o.item<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span> c<br/><span className="text-[#f38ba8] font-bold">RIGHT JOIN</span> <span className="text-[#a6e3a1]">orders</span> o<br/>{'  '}<span className="text-[#89dceb]">ON</span> c.id = o.c_id;</>),
      run: () => [
        { name: 'สมชาย', item: 'Laptop' },
        { name: 'สมชาย', item: 'Mouse' },
        { name: 'NULL', item: 'Keyboard (ไม่มีเจ้าของ)' },
      ],
      color: 'rose',
    },
    compare: {
      title: '3. เปรียบเทียบ', desc: 'INNER vs LEFT vs RIGHT — ดูจำนวนแถว',
      sqlStr: '-- INNER=2, LEFT=4, RIGHT=3',
      sql: (<><span className="text-slate-500">-- เปรียบเทียบ</span><br/><span className="text-[#89b4fa]">INNER</span>: 2 rows (เฉพาะคู่ที่ match)<br/><span className="text-[#a6e3a1]">LEFT</span>: 4 rows (ลูกค้าทุกคน)<br/><span className="text-[#f38ba8]">RIGHT</span>: 3 rows (ออเดอร์ทุกรายการ)</>),
      run: () => [
        { type: 'INNER', rows: 2, nulls: '0 NULL' },
        { type: 'LEFT', rows: 4, nulls: '2 NULL (ฝั่ง B)' },
        { type: 'RIGHT', rows: 3, nulls: '1 NULL (ฝั่ง A)' },
      ],
      color: 'sky',
    },
  };

  const [active, setActive] = useState('left');
  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setAnim(false);
      log(`> ${r.length} row(s) returned`, 'success');
      r.forEach(row => log(`> ${Object.values(row).join(' | ')}`, 'output'));
    }, 500);
  };
  const reset = () => { setResults([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'LEFT JOIN — เอาตาราง A (ซ้าย) เป็นหลัก ใครไม่มีคู่ฝั่ง B จะเป็น NULL', correct: true },
    { val: 'b', label: 'INNER JOIN — แสดงทุกแถวจากทั้ง 2 ตาราง' },
    { val: 'c', label: 'RIGHT JOIN — แสดงเฉพาะตาราง A' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! LEFT JOIN เอาตารางซ้ายเป็นหลัก แถวที่ไม่มีคู่ ฝั่ง B = NULL' : '> ❌ LEFT = ซ้ายเป็นหลัก, RIGHT = ขวาเป็นหลัก, INNER = เฉพาะคู่ที่ match', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  const cl = sc.color;
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><CircleDashed size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">LEFT / RIGHT JOIN (Outer Join)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">LEFT JOIN เอาตาราง <strong>ซ้ายเป็นหลัก</strong> — RIGHT JOIN เอา<strong>ขวาเป็นหลัก</strong> — แถวที่ไม่มีคู่จะเป็น NULL</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? `bg-[#1e1e2e] text-${scenarios[k].color}-400 border-b-2 border-${scenarios[k].color}-500` : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><Users size={12} className="text-emerald-600"/> customers (A)</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-emerald-50 text-emerald-700"><tr><th className="p-1.5 border-b font-semibold">id</th><th className="p-1.5 border-b font-semibold">name</th></tr></thead>
                    <tbody>{customers.map(c => <tr key={c.id} className="border-t"><td className="p-1.5 text-center font-mono">{c.id}</td><td className="p-1.5 font-medium">{c.name}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><ShoppingCart size={12} className="text-rose-600"/> orders (B)</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-rose-50 text-rose-700"><tr><th className="p-1.5 border-b font-semibold">id</th><th className="p-1.5 border-b font-semibold">c_id</th><th className="p-1.5 border-b font-semibold">item</th></tr></thead>
                    <tbody>{orders.map(o => <tr key={o.id} className="border-t"><td className="p-1.5 text-center font-mono">{o.id}</td><td className="p-1.5 text-center font-mono font-bold text-indigo-600">{o.c_id}</td><td className="p-1.5 text-xs">{o.item}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ ({results.length} แถว)</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm"><thead className="bg-slate-100 text-slate-600"><tr>{Object.keys(results[0]).map(k => <th key={k} className="p-2 border-b font-semibold text-left">{k}</th>)}</tr></thead>
                    <tbody>{results.map((r, i) => <tr key={i} className="border-t bg-emerald-50/50">{Object.values(r).map((v, j) => <td key={j} className={`p-2 font-mono text-sm ${v === 'NULL' ? 'text-slate-400 italic bg-slate-50' : 'font-medium'}`}>{v}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-emerald-500"/> Quiz: LEFT JOIN</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ถ้าต้องการแสดงลูกค้าทุกคน ไม่ว่าจะมี order หรือไม่ ควรใช้ JOIN แบบใด?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-emerald-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
