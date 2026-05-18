import React, { useState, useEffect, useRef } from 'react';
import { Workflow, RefreshCcw, TerminalSquare, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'policy', order: 1, title: 'กำหนดนโยบาย (Policy)', desc: 'ตั้งกฎว่าใครทำอะไรได้บ้าง' },
  { id: 'auth', order: 2, title: 'พิสูจน์ตัวตน (Authentication)', desc: 'ตรวจสอบรหัสผ่านว่าถูกต้อง' },
  { id: 'authz', order: 3, title: 'ให้สิทธิ์ (Authorization)', desc: 'อนุญาตตามระดับสิทธิ์' },
  { id: 'audit', order: 4, title: 'ตรวจสอบ (Auditing)', desc: 'เก็บ Log และสุ่มตรวจ' },
];

export default function SQL21901_U5_L2_SQLControlProcess() {
  const [picked, setPicked] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Control Process Simulator loaded.' },
    { type: 'system', text: 'คลิกขั้นตอนตามลำดับ 1 ถึง 4' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const log = (text, type = 'system') => setConsoleHistory(prev => [...prev, { text, type }]);

  const handlePick = (step) => {
    if (picked.find(p => p.id === step.id)) return;
    const nextOrder = picked.length + 1;
    const correct = step.order === nextOrder;
    setPicked([...picked, step]);
    log(`$ process.step(${nextOrder}) -> "${step.id}"`, 'command');
    if (correct) log(`> ถูกต้อง: ${step.title}`, 'success');
    else log(`> ลำดับผิด ควรเป็นขั้นที่ ${step.order}`, 'error');
    if (picked.length + 1 === 4 && correct) log('> กระบวนการควบคุมครบวงจร', 'success');
  };

  const reset = () => { setPicked([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };

  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบก่อน', 'error'); return; }
    setQuizDone(true);
    const ok = quizAnswer === 'auth';
    log(ok ? '> ถูกต้อง Authentication' : '> ผิด คำตอบคือ Authentication', ok ? 'success' : 'error');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg"><Workflow size={20} /></div>
          <h3 className="font-display text-xl font-semibold text-slate-900">กระบวนการควบคุมข้อมูล</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">ฝึกเรียงลำดับ 4 ขั้นตอนการควบคุมการเข้าถึงฐานข้อมูล</p>
      </div>
      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="text-sm font-medium uppercase text-slate-700 mb-4">Pipeline Simulator</h4>
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex items-center gap-3 p-3 mb-2 rounded-lg border-2 border-dashed border-slate-300 bg-white min-h-[52px]">
                <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm">{n}</span>
                <span className="text-sm text-slate-700">{picked[n - 1]?.title || 'รอเลือก'}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mt-4">
              {STEPS.map(s => (
                <button key={s.id} disabled={!!picked.find(p => p.id === s.id)} onClick={() => handlePick(s)} className="px-3 py-2 rounded-lg text-xs font-bold border border-violet-300 bg-white hover:bg-violet-50 active:scale-95 min-h-[44px] disabled:opacity-40">{s.title}</button>
              ))}
            </div>
            <button onClick={reset} className="mt-4 text-xs flex items-center gap-1 border border-slate-200 px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12} /> รีเซ็ต</button>
          </div>
          <div className="lg:w-1/2 p-6">
            <p className="text-sm font-bold text-slate-800 mb-3 leading-relaxed">การตรวจสอบรหัสผ่าน เป็นขั้นตอนใด?</p>
            {[{ v: 'auth', l: 'Authentication' }, { v: 'authz', l: 'Authorization' }, { v: 'audit', l: 'Auditing' }].map(o => (
              <button key={o.v} onClick={() => !quizDone && setQuizAnswer(o.v)} className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${quizDone && o.v === 'auth' ? 'border-emerald-500 bg-emerald-50' : quizAnswer === o.v ? 'border-violet-500 bg-violet-50' : 'border-slate-200'}`}>{o.l}</button>
            ))}
            <button onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium active:scale-95 flex justify-center gap-2 min-h-[44px]"><CheckCircle2 size={16} /> ตรวจคำตอบ</button>
          </div>
        </div>
        <div className="px-5 py-3 bg-violet-50 text-sm leading-relaxed border-b border-violet-100">Policy - Authentication - Authorization - Auditing</div>
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] px-4 py-2 border-b border-slate-700"><TerminalSquare size={14} className="inline text-slate-500" /> <span className="text-slate-500 text-xs ml-2">TERMINAL</span></div>
          <div className="p-4 space-y-1" ref={consoleRef}>{consoleHistory.map((l, i) => <div key={i} className={l.type === 'error' ? 'text-rose-400' : l.type === 'success' ? 'text-emerald-400' : l.type === 'command' ? 'text-teal-300' : 'text-slate-500'}>{l.text}</div>)}</div>
        </div>
      </div>
    </div>
  );
}
