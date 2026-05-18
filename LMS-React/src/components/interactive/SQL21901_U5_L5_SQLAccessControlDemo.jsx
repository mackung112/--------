import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, RefreshCcw, TerminalSquare, CheckCircle2 } from 'lucide-react';

export default function SQL21901_U5_L5_SQLAccessControlDemo() {
  const [user, setUser] = useState('john');
  const [host, setHost] = useState('192.168.1.10');
  const [created, setCreated] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Access Control Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const runCreate = () => {
    log(`mysql> CREATE USER "${user}"@"${host}" IDENTIFIED BY '***';`, 'command');
    setCreated(c => [...c, { user, host }]);
    log('> Query OK', 'success');
  };
  const reset = () => { setCreated([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'ip' ? '> ถูกต้อง' : '> ผิด', quizAnswer === 'ip' ? 'success' : 'error');
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><UserPlus size={20}/></div><h3 className="font-display text-xl font-semibold text-slate-900">การควบคุมการเข้าถึง</h3></div>
        <p className="font-base text-sm leading-relaxed text-slate-700">สร้างผู้ใช้พร้อมจำกัด Host</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-3">
            <label className="block text-sm font-medium text-slate-700">Username<input value={user} onChange={e=>setUser(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/></label>
            <label className="block text-sm font-medium text-slate-700">Host<input value={host} onChange={e=>setHost(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-blue-500 outline-none"/></label>
            <button type="button" onClick={runCreate} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium active:scale-95 min-h-[44px]">Run CREATE USER</button>
            <button type="button" onClick={reset} className="text-xs flex items-center gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
            {created.map((c,i)=><p key={i} className="text-xs font-mono bg-white border p-2 rounded">{c.user}@{c.host}</p>)}
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">"john"@"192.168.1.10" หมายความว่า?</p>
            {[{v:'ip',l:'John ล็อคอินได้จาก IP นี้เท่านั้น'},{v:'any',l:'ล็อคอินจากที่ไหนก็ได้'},{v:'pw',l:'ใช้ IP เป็นรหัสผ่าน'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${quizDone&&o.v==='ip'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-teal-500 bg-teal-50':'border-slate-200'}`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <p className="px-5 py-3 bg-teal-50 text-sm border-b leading-relaxed">CREATE USER ระบุ Host จำกัดที่มา</p>
        
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