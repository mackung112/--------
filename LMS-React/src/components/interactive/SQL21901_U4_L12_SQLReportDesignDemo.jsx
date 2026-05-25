import React, { useState, useRef, useEffect } from 'react';
import { FileText, Play, CheckCircle2, RefreshCcw, HelpCircle, TerminalSquare, Settings2 } from 'lucide-react';


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

export default function SQL21901_U4_L12_SQLReportDesignDemo() {
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Report Design Studio ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'output') => setConsoleHistory(p => [...p, { text: t, type }]);

  const steps = [
    { key: 'req', title: '1. เข้าใจความต้องการ', desc: 'ใครเป็นคนดูรายงาน? ต้องการรู้อะไร?', icon: '🎯', color: 'bg-pink-50 border-pink-200 text-pink-700',
      sql: "-- ผู้จัดการต้องการดูยอดขายรายแผนก",
      query: "-- Step 1: ระบุผู้ใช้และข้อมูลที่ต้องการ\n-- ผู้ใช้: ผู้จัดการ\n-- ข้อมูล: ยอดขายรวมแยกตามแผนก" },
    { key: 'query', title: '2. เขียน Query สรุป', desc: 'ใช้ JOIN + GROUP BY + Aggregate', icon: '⚙️', color: 'bg-amber-50 border-amber-200 text-amber-700',
      sql: "SELECT d.name AS dept,\n  COUNT(o.id) AS total_orders,\n  SUM(o.amount) AS revenue\nFROM departments d\nJOIN orders o ON d.id = o.dept_id\nGROUP BY d.name\nORDER BY revenue DESC;",
      query: null },
    { key: 'format', title: '3. จัดรูปแบบ', desc: 'ใช้ CONCAT, DATE_FORMAT ให้พร้อมใช้', icon: '🎨', color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      sql: "SELECT d.name AS dept,\n  CONCAT('฿', FORMAT(SUM(o.amount), 0)) AS revenue,\n  DATE_FORMAT(MAX(o.order_date), '%d/%m/%Y') AS last_order\nFROM departments d\nJOIN orders o ON d.id = o.dept_id\nGROUP BY d.name;",
      query: null },
    { key: 'view', title: '4. สร้าง VIEW', desc: 'บันทึกเป็น VIEW เรียกใช้ง่ายเหมือนตาราง', icon: '💾', color: 'bg-sky-50 border-sky-200 text-sky-700',
      sql: "CREATE VIEW v_dept_report AS\nSELECT d.name, SUM(o.amount) AS revenue\nFROM departments d\nJOIN orders o ON d.id = o.dept_id\nGROUP BY d.name;\n\n-- เรียกใช้: SELECT * FROM v_dept_report;",
      query: null },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [anim, setAnim] = useState(false);

  const handleRun = () => {
    setAnim(true);
    const s = steps[activeStep];
    log(`mysql> ${s.sql.split('\n')[0]}`, 'command');
    setTimeout(() => {
      setAnim(false);
      log(`> Step "${s.title}" executed`, 'success');
      if (s.query) log(s.query, 'output');
      else s.sql.split('\n').forEach(line => log(`  ${line}`, 'output'));
    }, 500);
  };
  const reset = () => { setActiveStep(0); log('> Reset to Step 1.', 'system'); };

  const [qAns, setQAns] = useState(null);
  const [qDone, setQDone] = useState(false);
  const qOpts = [
    { val: 'a', label: 'ให้ Database คำนวณผลสรุปผ่าน Query (GROUP BY + Aggregate)', correct: true },
    { val: 'b', label: 'SELECT * ดึงดิบทั้งหมด แล้ววนลูปคำนวณในโปรแกรม' },
    { val: 'c', label: 'ไม่ต้องออกแบบ เขียน SQL สุ่มๆ ไป' },
  ];
  const checkQ = () => { setQDone(true); const ok = qOpts.find(o => o.val === qAns)?.correct; log(ok ? '> ✅ ถูกต้อง! ให้ DB คำนวณ = เร็วกว่า ประหยัด bandwidth ไม่ต้องส่ง raw data ออก' : '> ❌ SELECT * + loop ในโปรแกรมทำให้ช้ามากเมื่อข้อมูลเยอะ', ok ? 'success' : 'error'); };

  const s = steps[activeStep];
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
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><FileText size={20} className="stroke-2"/></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การออกแบบรายงาน (Report Design)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">4 ขั้นตอนสร้างรายงาน: เข้าใจความต้องการ → เขียน Query สรุป → จัดรูปแบบ → สร้าง VIEW</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row border-b border-slate-200">
          <div className="lg:w-5/12 p-5 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-700"><Settings2 size={16}/> ขั้นตอนการออกแบบ</div>
            <div className="space-y-2">
              {steps.map((st, i) => (
                <button key={st.key} onClick={() => setActiveStep(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all active:scale-95 text-sm text-left ${activeStep === i ? `${st.color} border-current shadow-sm font-bold` : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                  <span className="text-lg">{st.icon}</span>
                  <div><div className="font-bold">{st.title}</div><div className="text-xs opacity-70">{st.desc}</div></div>
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <button onClick={reset} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-3 rounded-lg text-sm transition-all active:scale-95"><RefreshCcw size={13}/></button>
              <button onClick={handleRun} disabled={anim} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 text-sm">
                <Play size={14} fill="currentColor"/> {anim ? 'Running...' : 'Run Step'}
              </button>
            </div>
          </div>
          <div className="lg:w-7/12 flex flex-col">
            <div className="p-5 bg-[#1e1e2e] flex-1">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-white">{s.icon} {s.title}</div>
              <pre className="font-mono text-sm leading-relaxed text-white whitespace-pre-wrap bg-[#2d2d2d] p-4 rounded-lg border border-slate-700">{s.sql}</pre>
              <p className="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-3">{s.desc}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-emerald-500"/> Quiz: Report Design</h4>
            <button onClick={() => { setQAns(null); setQDone(false); }} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm"><RefreshCcw size={12}/> เริ่มใหม่</button>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-3 rounded-lg border border-slate-200">หลักการที่ดีในการทำรายงานด้วย Database คืออะไร?</p>
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
