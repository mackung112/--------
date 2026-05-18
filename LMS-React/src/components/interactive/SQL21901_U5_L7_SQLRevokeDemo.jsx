import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, RefreshCcw, TerminalSquare, CheckCircle2, Play } from 'lucide-react';
export default function SQL21901_U5_L7_SQLRevokeDemo() {
  const [privs, setPrivs] = useState(['SELECT', 'INSERT', 'UPDATE']);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'REVOKE Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const showGrants = () => { log('mysql> SHOW GRANTS FOR "employee";', 'command'); log(`> Grants: ${privs.join(', ')}`, 'output'); };
  const revokeInsert = () => {
    log('mysql> REVOKE INSERT ON mydb.* FROM "employee";', 'command');
    setPrivs(p => p.filter(x => x !== 'INSERT'));
    log('> Query OK', 'success');
  };
  const revokeAll = () => {
    log('mysql> REVOKE ALL PRIVILEGES ON mydb.* FROM "employee";', 'command');
    setPrivs([]);
    log('> All privileges revoked', 'success');
  };
  const reset = () => { setPrivs(['SELECT','INSERT','UPDATE']); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'show' ? '> ถูกต้อง SHOW GRANTS' : '> ผิด', quizAnswer === 'show' ? 'success' : 'error');
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><KeyRound size={20}/></div><h3 className="font-display text-xl font-semibold text-slate-900">การยกเลิกสิทธิ์ (REVOKE)</h3></div>
        <p className="font-base text-sm leading-relaxed text-slate-700">SHOW GRANTS ก่อน REVOKE</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <button type="button" onClick={showGrants} className="w-full mb-2 bg-slate-800 text-white py-2 rounded-md text-sm active:scale-95 min-h-[44px]">SHOW GRANTS</button>
            <button type="button" onClick={revokeInsert} className="w-full mb-2 bg-rose-600 text-white py-2 rounded-md text-sm active:scale-95 min-h-[44px] flex justify-center gap-2"><Play size={14}/> REVOKE INSERT</button>
            <button type="button" onClick={revokeAll} className="w-full mb-2 border-2 border-rose-300 text-rose-700 py-2 rounded-md text-sm active:scale-95 min-h-[44px]">REVOKE ALL</button>
            <button type="button" onClick={reset} className="text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
            <p className="mt-4 text-sm">สิทธิ์คงเหลือ: <strong>{privs.length ? privs.join(', ') : 'ไม่มี'}</strong></p>
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">ก่อน REVOKE ควรใช้คำสั่งใด?</p>
            {[{v:'show',l:'SHOW GRANTS FOR "user";'},{v:'select',l:'SELECT * FROM user_privileges;'},{v:'check',l:'CHECK PRIVILEGES FOR "user";'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-xs font-mono active:scale-95 min-h-[44px] ${quizDone&&o.v==='show'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-rose-300 bg-rose-50':'border-slate-200'}`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <p className="px-5 py-3 bg-rose-50 text-sm border-b leading-relaxed">REVOKE ต้องระบุระดับเดียวกับที่เคย GRANT</p>
        
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