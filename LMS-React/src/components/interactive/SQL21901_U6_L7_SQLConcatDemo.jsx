import React, { useState, useRef, useEffect } from 'react';
import { Link2, Play, CheckCircle2, RefreshCcw, HelpCircle, Table2, TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L7_SQLConcatDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'CONCAT Function Simulator ready.' },
  ]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const users = [
    { id: 1, fname: 'สมชาย', lname: 'ใจดี', email: 'somchai@test.com' },
    { id: 2, fname: 'สมหญิง', lname: null, email: 'somying@test.com' },
    { id: 3, fname: 'วิชัย', lname: 'สุขสบาย', email: 'wichai@test.com' },
    { id: 4, fname: 'มาลี', lname: 'รุ่งเรือง', email: 'malee@test.com' },
  ];

  const scenarios = {
    concat: {
      title: '1. CONCAT()', desc: 'เชื่อม fname + " " + lname',
      sqlStr: 'SELECT CONCAT(fname, " ", lname) AS full_name FROM users;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">CONCAT</span>(fname, <span className="text-[#a6e3a1]">" "</span>, lname) <span className="text-[#f9e2af]">AS</span> full_name<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;</>),
      run: () => users.map(u => ({ id: u.id, src: `${u.fname} + ${u.lname ?? 'NULL'}`, val: u.lname === null ? 'NULL' : `${u.fname} ${u.lname}`, bad: u.lname === null })),
    },
    ws: {
      title: '2. CONCAT_WS()', desc: 'With Separator — ข้าม NULL อัตโนมัติ',
      sqlStr: 'SELECT CONCAT_WS(" ", fname, lname) AS full_name FROM users;',
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">CONCAT_WS</span>(<span className="text-[#a6e3a1]">" "</span>, fname, lname) <span className="text-[#f9e2af]">AS</span> full_name<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;</>),
      run: () => users.map(u => ({ id: u.id, src: `${u.fname} + ${u.lname ?? 'NULL'}`, val: u.lname === null ? u.fname : `${u.fname} ${u.lname}`, bad: false })),
    },
    ifnull: {
      title: '3. IFNULL+CONCAT', desc: 'ใช้ IFNULL แก้ NULL ก่อน CONCAT',
      sqlStr: "SELECT CONCAT(fname,' ',IFNULL(lname,'(ไม่ระบุ)')) AS full_name FROM users;",
      sql: (<><span className="text-[#f9e2af] font-bold">SELECT</span> <span className="text-[#89dceb]">CONCAT</span>(fname, <span className="text-[#a6e3a1]">' '</span>,<br/>{'  '}<span className="text-[#89dceb]">IFNULL</span>(lname, <span className="text-[#a6e3a1]">'(ไม่ระบุ)'</span>)) <span className="text-[#f9e2af]">AS</span> full_name<br/><span className="text-[#f9e2af] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;</>),
      run: () => users.map(u => ({ id: u.id, src: `${u.fname} + ${u.lname ?? 'NULL'}`, val: `${u.fname} ${u.lname ?? '(ไม่ระบุ)'}`, bad: false })),
    },
  };

  const [active, setActive] = useState('concat');
  const [results, setResults] = useState([]);
  const [hlRows, setHlRows] = useState([]);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true); setResults([]); setHlRows([]);
    const sc = scenarios[active];
    log(`mysql> ${sc.sqlStr}`, 'command');
    setTimeout(() => {
      const r = sc.run();
      setResults(r); setHlRows(users.map(u => u.id)); setAnim(false);
      r.forEach(row => log(`> ${row.src} → ${row.val}${row.bad ? ' ⚠️' : ''}`, row.bad ? 'error' : 'success'));
    }, 500);
  };
  const reset = () => { setResults([]); setHlRows([]); log('> Reset.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'NULL — CONCAT ธรรมดาถ้ามี NULL ผลลัพธ์เป็น NULL ทั้งหมด', correct: true },
    { val: 'b', label: '"สมหญิง" — NULL จะถูกข้ามอัตโนมัติ' },
    { val: 'c', label: '"สมหญิง NULL" — แสดง NULL เป็นข้อความ' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! CONCAT() return NULL ถ้า parameter ตัวใดเป็น NULL' : '> ❌ ลองรัน Scenario 1 ดู id=2', ok ? 'success' : 'error'); };

  const sc = scenarios[active];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg"><Link2 size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเชื่อมข้อความ (CONCAT)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">CONCAT() เชื่อมข้อความเข้าด้วยกัน <strong>ระวัง! ถ้า parameter เป็น NULL ผลลัพธ์จะเป็น NULL ทั้งหมด</strong></p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
            <div className="flex bg-slate-900 border-b border-slate-700">
              {Object.keys(scenarios).map(k => (
                <button key={k} onClick={() => { setActive(k); setResults([]); setHlRows([]); }}
                  className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors px-1 ${active === k ? 'bg-[#1e1e2e] text-rose-400 border-b-2 border-rose-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
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
                <button onClick={handleRun} disabled={anim} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm">
                  <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Query'}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-5 bg-slate-50 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-2 text-sm"><Table2 size={14} className="text-rose-600"/> ตาราง users</h4>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600"><tr><th className="p-2 border-b font-semibold text-center">id</th><th className="p-2 border-b font-semibold">fname</th><th className="p-2 border-b font-semibold">lname</th><th className="p-2 border-b font-semibold">email</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(r => (
                      <tr key={r.id} className={`transition-all duration-500 ${hlRows.includes(r.id) ? 'bg-rose-50' : 'bg-white hover:bg-slate-50'}`}>
                        <td className="p-2 text-center font-mono text-xs text-slate-500">{r.id}</td>
                        <td className="p-2 font-medium text-slate-700">{r.fname}</td>
                        <td className="p-2 font-mono text-sm">{r.lname !== null ? r.lname : <span className="text-slate-400 italic">NULL</span>}</td>
                        <td className="p-2 font-mono text-xs text-slate-500">{r.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {results.length > 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 text-sm mb-2">ผลลัพธ์ — full_name</h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100"><tr><th className="p-2 border-b text-left font-semibold">เดิม</th><th className="p-2 border-b text-left font-semibold">→ full_name</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.map(r => (
                        <tr key={r.id} className={r.bad ? 'bg-rose-50' : 'bg-emerald-50'}>
                          <td className="p-2 font-mono text-xs text-slate-500">{r.src}</td>
                          <td className={`p-2 font-mono text-xs font-bold ${r.bad ? 'text-rose-600' : 'text-emerald-700'}`}>{r.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-rose-500"/> Quiz: CONCAT กับ NULL</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">ถ้า fname="สมหญิง" และ lname=NULL ผลลัพธ์ของ CONCAT(fname," ",lname) คืออะไร?</p>
          <div className="space-y-2 mb-4">
            {qOpts.map(o => (
              <button key={o.val} onClick={() => !qDone && setQAns(o.val)} disabled={qDone}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${qAns === o.val ? 'bg-rose-50 border-rose-400 text-rose-800 font-medium' : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'} ${qDone && o.correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold' : ''} ${qDone && qAns === o.val && !o.correct ? 'bg-rose-50 border-rose-400 text-rose-800' : ''}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={checkQ} disabled={!qAns || qDone} className="bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10"><TerminalSquare size={14} className="text-slate-600"/><span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span></div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (<div key={i} className="leading-relaxed">{l.type==='command' && <div className="text-rose-300 font-bold">{l.text}</div>}{l.type==='output' && <div className="text-cyan-300">{l.text}</div>}{l.type==='system' && <div className="text-slate-600">{l.text}</div>}{l.type==='error' && <div className="text-rose-400 font-bold">{l.text}</div>}{l.type==='success' && <div className="text-emerald-400 font-bold">{l.text}</div>}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
