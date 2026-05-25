import React, { useState, useEffect, useRef } from 'react';
import { Key, RefreshCcw, TerminalSquare, CheckCircle2, Play } from 'lucide-react';
const PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

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

export default function SQL21901_U5_L6_SQLGrantDemo() {
  const [user] = useState('employee');
  const [table] = useState('customers');
  const [selected, setSelected] = useState(['SELECT']);
  const [granted, setGranted] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'GRANT Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const toggle = (p) => setSelected(s => s.includes(p) ? s.filter(x=>x!==p) : [...s,p]);
  const runGrant = () => {
    log(`mysql> GRANT ${selected.join(', ')} ON ${table} TO "${user}";`, 'command');
    log('mysql> FLUSH PRIVILEGES;', 'command');
    setGranted([...selected]);
    log('> Query OK', 'success');
  };
  const reset = () => { setSelected(['SELECT']); setGranted([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'sel' ? '> ถูกต้อง' : '> ผิด', quizAnswer === 'sel' ? 'success' : 'error');
  };
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
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Key size={20}/></div><h3 className="font-display text-xl font-semibold text-slate-900">การให้สิทธิ์ (GRANT)</h3></div>
        <p className="font-base text-sm leading-relaxed text-slate-700">เลือกสิทธิ์และรัน GRANT</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-[#1e1e2e] text-white border-b lg:border-b-0 lg:border-r border-slate-700">
            <p className="font-mono text-sm leading-loose"><span className="text-yellow-300 font-bold">GRANT</span> {selected.join(', ')}<br/><span className="text-slate-400">ON</span> <span className="text-green-300">{table}</span><br/><span className="text-slate-400">TO</span> <span className="text-green-300">"{user}"</span>;</p>
            <div className="flex flex-wrap gap-2 mt-4">{PRIVS.map(p=><button key={p} type="button" onClick={()=>toggle(p)} className={`px-2 py-1 rounded text-xs font-bold border active:scale-95 ${selected.includes(p)?'bg-emerald-600 text-white':'border-slate-600 text-slate-400'}`}>{p}</button>)}</div>
            <button type="button" onClick={runGrant} className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg font-bold active:scale-95 flex justify-center gap-2 min-h-[44px]"><Play size={16}/> Run GRANT</button>
            <button type="button" onClick={reset} className="mt-2 text-xs text-slate-400 flex gap-1"><RefreshCcw size={12}/> รีเซ็ต</button>
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-sm mb-2">สิทธิ์: {(granted.length?granted:['—']).join(', ')}</p>
            <p className="text-sm font-bold mb-3 leading-relaxed">ให้ดู customers อย่างเดียว?</p>
            {[{v:'sel',l:'GRANT SELECT ON customers TO "employee";'},{v:'all',l:'GRANT ALL ON customers TO "employee";'},{v:'view',l:'GRANT VIEW ON customers TO "employee";'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-xs font-mono active:scale-95 min-h-[44px] ${quizDone&&o.v==='sel'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-emerald-300 bg-emerald-50/30':'border-slate-200'}`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <p className="px-5 py-3 bg-emerald-50 text-sm border-b leading-relaxed">ใช้ SELECT แทน ALL PRIVILEGES สำหรับพนักงานทั่วไป</p>
        
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs">TERMINAL</span>
          </div>
          <div className="p-4 space-y-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (
              <p key={i} className={l.type === 'error' ? 'text-rose-400 font-bold' : l.type === 'success' ? 'text-emerald-400 font-bold' : l.type === 'command' ? 'text-teal-300' : 'text-slate-500'}>{l.text}</p>
            ))}
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
