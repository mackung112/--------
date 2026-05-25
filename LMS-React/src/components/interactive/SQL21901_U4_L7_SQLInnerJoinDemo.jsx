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

export default function SQL21901_U4_L7_SQLInnerJoinDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'INNER JOIN Visualizer ready.' }]);
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
    { id: 103, c_id: 99, item: 'Keyboard' },
  ];

  const [results, setResults] = useState([]);
  const [anim, setAnim] = useState(false);
  const [hlCIds, setHlCIds] = useState([]);

  const sqlStr = 'SELECT c.name, o.item FROM customers c INNER JOIN orders o ON c.id = o.c_id;';
  const innerResult = [
    { c_name: 'สมชาย', o_item: 'Laptop', c_id: 1 },
    { c_name: 'สมชาย', o_item: 'Mouse', c_id: 1 },
  ];

  const handleRun = () => {
    setAnim(true); setResults([]); setHlCIds([]);
    log(`mysql> ${sqlStr}`, 'command');
    setTimeout(() => {
      setResults(innerResult); setHlCIds([1]); setAnim(false);
      log('> 2 row(s) returned — เฉพาะแถวที่ c.id = o.c_id ตรงกัน', 'success');
      innerResult.forEach(r => log(`> ${r.c_name} — ${r.o_item}`, 'output'));
      log('> สมหญิง & วิชัย ไม่มี order → หายไป', 'output');
      log('> Keyboard c_id=99 ไม่มีลูกค้า → หายไป', 'output');
    }, 500);
  };
  const reset = () => { setResults([]); setHlCIds([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'เฉพาะแถวที่จับคู่ได้ทั้ง 2 ตาราง (ไม่มี NULL)', correct: true },
    { val: 'b', label: 'ทุกแถวจากทั้ง 2 ตาราง (เหมือน UNION)' },
    { val: 'c', label: 'เฉพาะตารางซ้ายเท่านั้น' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! INNER JOIN แสดงเฉพาะแถวที่ match กันทั้ง 2 ฝั่ง' : '> ❌ INNER JOIN ไม่แสดงแถวที่ไม่มีคู่ ต่างจาก LEFT/RIGHT JOIN', ok ? 'success' : 'error'); };

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
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><CircleDashed size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเชื่อมตาราง (INNER JOIN)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">INNER JOIN ดึงเฉพาะแถวที่มี <strong>คู่ตรงกัน</strong> ในทั้ง 2 ตาราง — แถวที่ไม่มีคู่จะหายไป</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="font-mono text-[14px] leading-loose mb-3">
                  <span className="text-[#f9e2af] font-bold">SELECT</span> c.name, o.item<br/>
                  <span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">customers</span> c<br/>
                  <span className="text-[#cba6f7] font-bold">INNER JOIN</span> <span className="text-[#a6e3a1]">orders</span> o<br/>
                  {'  '}<span className="text-[#89dceb]">ON</span> c.id = o.c_id;
                </div>
                <p className="text-xs text-slate-600 border-t border-slate-700/50 pt-3">INNER JOIN: แสดงเฉพาะแถวที่ Key ตรงกันทั้ง 2 ฝั่ง</p>
                {/* Mini Venn */}
                <div className="flex items-center justify-center mt-4 gap-0">
                  <div className={`w-16 h-16 rounded-full border-2 ${results.length > 0 ? 'border-slate-500 bg-slate-700/30' : 'border-indigo-400 bg-indigo-500/20'} flex items-center justify-center -mr-3 z-0`}><Users size={14} className="text-slate-400"/></div>
                  <div className={`w-8 h-14 rounded-full ${results.length > 0 ? 'bg-indigo-500/80' : 'bg-indigo-500/30'} z-10 transition-all duration-500`}></div>
                  <div className={`w-16 h-16 rounded-full border-2 ${results.length > 0 ? 'border-slate-500 bg-slate-700/30' : 'border-indigo-400 bg-indigo-500/20'} flex items-center justify-center -ml-3 z-0`}><ShoppingCart size={14} className="text-slate-400"/></div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-3 rounded-lg text-sm transition-all active:scale-95"><RefreshCcw size={13}/></button>
                <button onClick={handleRun} disabled={anim} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><Users size={12} className="text-indigo-600"/> customers</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-indigo-50 text-indigo-700"><tr><th className="p-1.5 border-b font-semibold">id</th><th className="p-1.5 border-b font-semibold">name</th></tr></thead>
                    <tbody>{customers.map(c => <tr key={c.id} className={`border-t transition-all duration-500 ${hlCIds.includes(c.id) ? 'bg-indigo-50' : ''}`}><td className="p-1.5 text-center font-mono">{c.id}</td><td className="p-1.5 font-medium">{c.name}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-xs"><ShoppingCart size={12} className="text-rose-600"/> orders</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-xs"><thead className="bg-rose-50 text-rose-700"><tr><th className="p-1.5 border-b font-semibold">id</th><th className="p-1.5 border-b font-semibold">c_id</th><th className="p-1.5 border-b font-semibold">item</th></tr></thead>
                    <tbody>{orders.map(o => <tr key={o.id} className={`border-t transition-all duration-500 ${hlCIds.includes(o.c_id) ? 'bg-indigo-50' : ''}`}><td className="p-1.5 text-center font-mono">{o.id}</td><td className="p-1.5 text-center font-mono font-bold text-indigo-600">{o.c_id}</td><td className="p-1.5">{o.item}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ INNER JOIN ({results.length} แถว)</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm"><thead className="bg-indigo-50 text-indigo-700"><tr><th className="p-2 border-b font-semibold">c.name</th><th className="p-2 border-b font-semibold">o.item</th></tr></thead>
                    <tbody>{results.map((r, i) => <tr key={i} className="border-t bg-indigo-50"><td className="p-2 font-medium">{r.c_name}</td><td className="p-2">{r.o_item}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-indigo-500"/> Quiz: INNER JOIN</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">INNER JOIN แสดงข้อมูลอะไรบ้าง?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-indigo-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
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
