import React, { useState, useEffect, useRef } from 'react';
import { Key, RefreshCcw, TerminalSquare, CheckCircle2, Play } from 'lucide-react';
const PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];
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
  );
}