import React, { useState, useEffect, useRef } from 'react';
import { FileSearch, RefreshCcw, TerminalSquare, CheckCircle2 } from 'lucide-react';
const LOG_TYPES = [
  { id: 'log', label: 'General Query Log', sample: 'SELECT * FROM orders;' },
  { id: 'slow', label: 'Slow Query Log', sample: 'SELECT ... (12.4 sec)' },
  { id: 'err', label: 'Error Log', sample: 'ERROR 1062: Duplicate entry' },
  { id: 'trigger', label: 'Audit Table (Trigger)', sample: 'UPDATE salaries SET amount=99999' },
];
export default function SQL21901_U5_L8_SQLAuditDemo() {
  const [active, setActive] = useState('log');
  const [logs, setLogs] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Audit Log Explorer ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const capture = (lt) => {
    setActive(lt.id);
    const entry = { type: lt.label, msg: lt.sample, time: new Date().toLocaleTimeString('th-TH') };
    setLogs(l => [entry, ...l].slice(0, 8));
    log(`$ audit.capture(type="${lt.id}")`, 'command');
    log(`> [${entry.time}] ${entry.msg}`, 'output');
  };
  const reset = () => { setLogs([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'slow' ? '> ถูกต้อง Slow Query Log' : '> ผิด', quizAnswer === 'slow' ? 'success' : 'error');
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-slate-200 text-slate-700 rounded-lg"><FileSearch size={20}/></div><h3 className="font-display text-xl font-semibold text-slate-900">การตรวจสอบการใช้งาน (Auditing)</h3></div>
        <p className="font-base text-sm leading-relaxed text-slate-700">เปิดดูประเภท Log ต่างๆ ของ MySQL</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            {LOG_TYPES.map(lt => (
              <button key={lt.id} type="button" onClick={() => capture(lt)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${active===lt.id?'border-slate-600 bg-slate-100':'border-slate-200 bg-white'}`}>{lt.label}</button>
            ))}
            <button type="button" onClick={reset} className="text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-xs font-bold text-slate-500 mb-2">AUDIT STREAM</p>
            {logs.length===0 ? <p className="text-sm text-slate-400">คลิกประเภท Log เพื่อจำลอง</p> : logs.map((e,i)=><p key={i} className="text-xs font-mono mb-2 p-2 bg-slate-900 text-green-300 rounded">[{e.time}] {e.msg}</p>)}
            <p className="text-sm font-bold mt-4 mb-3 leading-relaxed">คำสั่ง SQL ที่ทำให้เว็บช้า ดู Log ใด?</p>
            {[{v:'slow',l:'Slow Query Log'},{v:'err',l:'Error Log'},{v:'gen',l:'General Query Log'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${quizDone&&o.v==='slow'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-slate-400 bg-slate-50':'border-slate-200'}`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <p className="px-5 py-3 bg-slate-100 text-sm border-b leading-relaxed">Slow Query Log ช่วยหาคำสั่งที่ต้อง Optimize</p>
        
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