import React, { useState } from 'react';
import { Bug, Play, StepForward, CheckCircle2, XCircle, AlertCircle, RotateCcw, Eye, CircleDot } from 'lucide-react';

export default function OOP21910_U4_L2_DebuggerGuideDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [variables, setVariables] = useState({});
  const [breakpoints, setBreakpoints] = useState(new Set([3, 6]));
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const codeLines = [
    { code: 'total = 0', action: () => ({ total: 0 }) },
    { code: 'prices = [100, 200, 150]', action: (v) => ({ ...v, prices: '[100, 200, 150]' }) },
    { code: 'for p in prices:', action: (v) => v },
    { code: '    total += p', action: (v, step) => {
      const vals = [100, 200, 150];
      const idx = Math.min(step, 2);
      return { ...v, p: vals[idx], total: (parseInt(v.total) || 0) + vals[idx] };
    }},
    { code: '    print(f"เพิ่ม {p}, รวม = {total}")', action: (v) => v, output: (v) => `เพิ่ม ${v.p}, รวม = ${v.total}` },
    { code: '', action: (v) => v },
    { code: 'print(f"ราคารวม: {total}")', action: (v) => v, output: (v) => `ราคารวม: ${v.total}` },
  ];

  const [loopStep, setLoopStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const toggleBreakpoint = (line) => {
    const newBp = new Set(breakpoints);
    if (newBp.has(line)) newBp.delete(line);
    else newBp.add(line);
    setBreakpoints(newBp);
  };

  const stepNext = () => {
    let next = currentLine + 1;
    if (next >= codeLines.length) {
      setIsRunning(false);
      return;
    }
    // Handle loop
    if (next === 5 && loopStep < 2) {
      next = 2; // back to for loop
      setLoopStep(loopStep + 1);
    }
    setCurrentLine(next);
    const newVars = codeLines[next].action(variables, loopStep + (next === 3 ? 1 : 0));
    setVariables(newVars);
    if (codeLines[next].output) setOutput(prev => [...prev, codeLines[next].output(newVars)]);
  };

  const startDebug = () => {
    setIsRunning(true); setCurrentLine(0); setVariables({}); setOutput([]); setLoopStep(0);
    setVariables(codeLines[0].action({}));
  };

  const reset = () => { setIsRunning(false); setCurrentLine(0); setVariables({}); setOutput([]); setLoopStep(0); };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-5 flex items-center gap-3">
          <Bug size={24} />
          <h3 className="font-bold text-lg">จำลอง Debugger: Step-through</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Code Editor */}
          <div className="lg:col-span-2 bg-slate-900 p-4">
            <div className="flex gap-3 mb-4">
              {!isRunning ? (
                <button onClick={startDebug} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1"><Play size={14} /> Start Debug</button>
              ) : (
                <button onClick={stepNext} className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1"><StepForward size={14} /> Step Over (F10)</button>
              )}
              <button onClick={reset} className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
            </div>

            <div className="font-mono text-sm">
              {codeLines.map((line, i) => (
                <div key={i} className={`flex items-center gap-2 py-0.5 px-2 rounded transition-all ${isRunning && currentLine === i ? 'bg-yellow-500/20 border-l-2 border-yellow-400' : ''}`}>
                  <button onClick={() => toggleBreakpoint(i)} className="w-4 flex-shrink-0">
                    {breakpoints.has(i) ? <CircleDot size={12} className="text-red-500" /> : <span className="text-slate-700 text-xs">{i + 1}</span>}
                  </button>
                  <span className={`${isRunning && currentLine === i ? 'text-white' : 'text-slate-400'}`}>{line.code || '\u00A0'}</span>
                </div>
              ))}
            </div>

            {output.length > 0 && (
              <div className="mt-4 border-t border-slate-700 pt-3">
                <div className="text-slate-500 text-xs mb-1">Output:</div>
                {output.map((o, i) => <div key={i} className="text-emerald-400 text-sm font-mono">{o}</div>)}
              </div>
            )}
          </div>

          {/* Variables Watch */}
          <div className="p-4 bg-slate-50 border-l border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><Eye size={14} /> Variables Watch</h4>
            {Object.keys(variables).length === 0 ? (
              <div className="text-slate-400 text-sm">กด Start Debug เพื่อเริ่ม</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(variables).map(([key, val]) => (
                  <div key={key} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm flex justify-between">
                    <span className="font-mono text-indigo-600 font-bold">{key}</span>
                    <span className="font-mono text-slate-700">{String(val)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              💡 <strong>Breakpoint</strong> = จุดหยุดที่คลิกตั้งไว้ข้างเลขบรรทัด<br />
              <strong>Step Over</strong> = รันทีละบรรทัดเพื่อดูค่าตัวแปร
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">Breakpoint (จุดหยุด) ใช้ทำอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'stop', label: 'ทำให้โปรแกรมหยุดชั่วคราวที่บรรทัดนั้น เพื่อให้เราตรวจสอบค่าตัวแปรได้', correct: true },
            { val: 'delete', label: 'ลบบรรทัดนั้นออกจากโปรแกรม' },
            { val: 'comment', label: 'ทำให้บรรทัดนั้นกลายเป็น comment' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'stop' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'stop' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
