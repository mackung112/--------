import React, { useState, useEffect, useRef } from 'react';
import { Link2, RefreshCcw, TerminalSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
export default function SQL21901_U5_L10_SQLIntegrityDemo() {
  const [depts] = useState([{ id: 1, name: 'IT' }, { id: 2, name: 'HR' }]);
  const [emps, setEmps] = useState([{ id: 1, name: 'สมชาย', dept_id: 1 }]);
  const [newDept, setNewDept] = useState('99');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Integrity Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const tryInsert = () => {
    const id = parseInt(newDept, 10);
    log(`mysql> INSERT INTO employees (name, dept_id) VALUES ('ใหม่', ${id});`, 'command');
    if (depts.some(d => d.id === id)) {
      setEmps(e => [...e, { id: e.length + 1, name: 'ใหม่', dept_id: id }]);
      log('> 1 row inserted — Referential OK', 'success');
    } else {
      log('> ERROR 1452: Cannot add child row — FK constraint fails (Referential Integrity)', 'error');
    }
  };
  const reset = () => { setEmps([{ id: 1, name: 'สมชาย', dept_id: 1 }]); setNewDept('99'); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'ref' ? '> ถูกต้อง Referential Integrity' : '> ผิด', quizAnswer === 'ref' ? 'success' : 'error');
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Link2 size={20}/></div><h3 className="font-display text-xl font-semibold text-slate-900">การรักษาความถูกต้องของข้อมูล</h3></div>
        <p className="font-base text-sm leading-relaxed text-slate-700">ทดลอง INSERT ที่ละเมิด Foreign Key</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <p className="text-xs font-bold mb-2">departments (PK)</p>
            {depts.map(d=><p key={d.id} className="text-sm font-mono mb-1">id={d.id} {d.name}</p>)}
            <p className="text-xs font-bold mt-4 mb-2">employees (FK dept_id)</p>
            {emps.map(e=><p key={e.id} className="text-sm mb-1">{e.name} → dept {e.dept_id}</p>)}
            <label className="block text-sm mt-4">dept_id ใหม่<input value={newDept} onChange={e=>setNewDept(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md font-mono"/></label>
            <button type="button" onClick={tryInsert} className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><AlertTriangle size={16}/> ลอง INSERT</button>
            <button type="button" onClick={reset} className="mt-2 text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">ห้ามใส่รหัสแผนกที่ไม่มีอยู่ = ประเภทใด?</p>
            {[{v:'ref',l:'Referential Integrity (FK)'},{v:'entity',l:'Entity Integrity (PK)'},{v:'domain',l:'Domain Integrity'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${quizDone&&o.v==='ref'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-indigo-300 bg-indigo-50':'border-slate-200'}`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </div>
        </div>
        <p className="px-5 py-3 bg-indigo-50 text-sm border-b leading-relaxed">Foreign Key รักษา Referential Integrity</p>
        
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