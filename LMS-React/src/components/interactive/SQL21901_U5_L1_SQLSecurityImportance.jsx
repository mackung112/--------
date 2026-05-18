import React, { useState, useEffect, useRef } from 'react';
import { Shield, RefreshCcw, HelpCircle, TerminalSquare, Eye } from 'lucide-react';

const SCENARIOS = [
  { id: 's1', text: 'แฮกเกอร์แอบอ่านข้อมูลเงินเดือนพนักงาน', answer: 'conf' },
  { id: 's2', text: 'มีคนแก้ยอดขายในตาราง orders โดยไม่ได้รับอนุญาต', answer: 'integ' },
  { id: 's3', text: 'เซิร์ฟเวอร์ DB ล่ม ทำให้แอปพลิเคชันเข้าใช้งานไม่ได้', answer: 'avail' },
  { id: 's4', text: 'รหัสผ่านรั่วไหล ผู้ไม่มีสิทธิ์เข้าถึงข้อมูลลูกค้า', answer: 'conf' },
];

const CIA = {
  conf: { title: 'Confidentiality (ความลับ)', desc: 'ข้อมูลเข้าถึงได้เฉพาะผู้มีสิทธิ์ — ป้องกันการรั่วไหล', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-300' },
  integ: { title: 'Integrity (ความถูกต้อง)', desc: 'ข้อมูลไม่ถูกแก้ไขโดยไม่ได้รับอนุญาต — รักษาความน่าเชื่อถือ', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-300' },
  avail: { title: 'Availability (ความพร้อมใช้)', desc: 'ระบบพร้อมให้บริการเมื่อผู้ใช้ที่ได้รับอนุญาตต้องการ', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-300' },
};

export default function SQL21901_U5_L1_SQLSecurityImportance() {
  const [activeCia, setActiveCia] = useState('conf');
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Security Module: CIA Triad Simulator loaded.' },
    { type: 'system', text: 'เลือกหลักการ CIA หรือจับคู่สถานการณ์' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const log = (text, type = 'system') => setConsoleHistory((prev) => [...prev, { text, type }]);

  const handleCiaClick = (key) => {
    setActiveCia(key);
    const c = CIA[key];
    log(`$ explain --principle="${key}"`, 'command');
    log(`> ${c.title}: ${c.desc}`, 'output');
  };

  const handleScenarioPick = (key) => {
    const sc = SCENARIOS[scenarioIdx];
    log(`$ classify --scenario="${sc.id}" --choice="${key}"`, 'command');
    if (key === sc.answer) {
      setScore((s) => s + 1);
      log(`> ถูกต้อง! หลักการ: ${CIA[key].title}`, 'success');
      if (scenarioIdx < SCENARIOS.length - 1) setScenarioIdx((i) => i + 1);
      else log('> ภารกิจจับคู่ครบทุกข้อ', 'success');
    } else {
      log('> ยังไม่ตรง — ลองคิดว่าเป็นเรื่องความลับ ความถูกต้อง หรือความพร้อมใช้', 'error');
    }
  };

  const submitQuiz = () => {
    if (!quizAnswer) {
      log('> Error: เลือกคำตอบก่อนตรวจ', 'error');
      return;
    }
    setQuizDone(true);
    const ok = quizAnswer === 'integ';
    log(`$ quiz.submit(answer="${quizAnswer}")`, 'command');
    log(ok ? '> ถูกต้อง! Integrity' : '> ผิด — คำตอบคือ Integrity', ok ? 'success' : 'error');
  };

  const resetAll = () => {
    setScenarioIdx(0);
    setScore(0);
    setQuizAnswer(null);
    setQuizDone(false);
    setActiveCia('conf');
    log('> System: reset.', 'system');
  };

  const sc = SCENARIOS[scenarioIdx];
  const active = CIA[activeCia];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Shield size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ความสำคัญของการควบคุมข้อมูล</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">เรียนรู้ CIA Triad ผ่านการจำลองสถานการณ์จริงในฐานข้อมูล</p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <Eye size={16} /> CIA Triad Explorer
            </h4>
            <div className="flex justify-center gap-4 mb-4">
              {['conf', 'integ', 'avail'].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCiaClick(key)}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all active:scale-95 min-h-[44px] min-w-[88px] ${
                    activeCia === key ? `${CIA[key].border} ${CIA[key].bg} ring-2 ring-indigo-300` : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`text-2xl font-bold ${CIA[key].color}`}>{key === 'conf' ? 'C' : key === 'integ' ? 'I' : 'A'}</span>
                  <span className="text-[10px] text-slate-600 mt-1">{key === 'conf' ? 'ความลับ' : key === 'integ' ? 'ถูกต้อง' : 'พร้อมใช้'}</span>
                </button>
              ))}
            </div>
            <div className={`p-4 rounded-xl border ${active.bg} ${active.border}`}>
              <p className={`text-sm font-bold ${active.color} mb-1`}>{active.title}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{active.desc}</p>
            </div>
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col gap-6">
            <div>
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3 flex items-center gap-2">
                <HelpCircle size={16} className="text-indigo-500" /> จับคู่สถานการณ์ ({score}/{SCENARIOS.length})
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">{sc.text}</p>
              <div className="grid gap-2">
                {Object.entries(CIA).map(([key, c]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleScenarioPick(key)}
                    className="w-full text-left p-3 rounded-lg border-2 border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 font-medium text-sm transition-all active:scale-95 min-h-[44px]"
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm font-bold text-slate-800 mb-3 leading-relaxed">การป้องกันไม่ให้แฮกเกอร์แอบแก้เงินเดือน ตรงกับหลักการใด?</p>
              <div className="space-y-2">
                {[
                  { val: 'integ', label: 'Integrity (ความถูกต้อง)' },
                  { val: 'conf', label: 'Confidentiality (ความลับ)' },
                  { val: 'avail', label: 'Availability (ความพร้อมใช้)' },
                ].map((o) => (
                  <button
                    key={o.val}
                    type="button"
                    onClick={() => !quizDone && setQuizAnswer(o.val)}
                    className={`w-full text-left p-3 rounded-lg border-2 text-sm font-semibold transition-all active:scale-95 min-h-[44px] ${
                      quizDone && o.val === 'integ' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : ''
                    } ${quizDone && quizAnswer === o.val && o.val !== 'integ' ? 'border-red-400 bg-red-50 text-red-800' : ''} ${
                      !quizDone && quizAnswer === o.val ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={resetAll} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <RefreshCcw size={16} />
                </button>
                <button type="button" onClick={submitQuiz} disabled={quizDone} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md font-medium active:scale-95 text-sm min-h-[44px]">
                  ตรวจคำตอบ Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100 text-sm text-indigo-900 leading-relaxed">
          <strong>ขั้นตอน:</strong> คลิก C/I/A → จับคู่สถานการณ์ → ทำ Quiz
        </div>

        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 z-10 flex items-center gap-2">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs font-semibold">TERMINAL</span>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-teal-300">{line.text}</div>}
                {line.type === 'output' && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system' && <div className="text-slate-500">{line.text}</div>}
                {line.type === 'error' && <div className="text-rose-400 font-bold">{line.text}</div>}
                {line.type === 'success' && <div className="text-emerald-400 font-bold">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
