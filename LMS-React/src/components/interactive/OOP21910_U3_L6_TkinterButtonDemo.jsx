import React, { useState } from 'react';
import { MousePointer2, Play, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L6_TkinterButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [output, setOutput] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setOutput(prev => [...prev, `ปุ่มถูกกดครั้งที่ ${newCount}`]);
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-5 flex items-center gap-3">
          <MousePointer2 size={24} />
          <h3 className="font-bold text-lg">ทดลอง Button + command function</h3>
        </div>

        <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-6">
          {/* Code */}
          <div className="p-6 bg-slate-50 border-r border-slate-200">
            <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm shadow-lg space-y-0.5">
              <div><span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span></div>
              <div className="mt-2"><span className="text-yellow-300">count</span> = <span className="text-purple-300">0</span></div>
              <div className="mt-2"><span className="text-pink-400">def</span> <span className="text-blue-300">on_click</span>():</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">global</span> <span className="text-yellow-300">count</span></div>
              <div>&nbsp;&nbsp;<span className="text-yellow-300">count</span> += <span className="text-purple-300">1</span></div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">f"ปุ่มถูกกดครั้งที่ {'{'}<span className="text-yellow-300">count</span>{'}'}"</span>)</div>
              <div className="mt-2"><span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()</div>
              <div><span className="text-sky-300">tk</span>.<span className="text-blue-300">Button</span>(</div>
              <div>&nbsp;&nbsp;<span className="text-yellow-300">root</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"คลิกเลย!"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-orange-300">command</span>=<span className="text-yellow-300">on_click</span></div>
              <div>).<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">20</span>)</div>
            </div>

            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-700">
              💡 <strong>command</strong> คือพารามิเตอร์ที่ผูกฟังก์ชันเข้ากับปุ่ม — เมื่อกดปุ่ม ฟังก์ชัน <code>on_click</code> จะถูกเรียกทำงาน (สังเกตว่าไม่มีวงเล็บ <code>()</code> ตามหลัง)
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[300px]">
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs ml-2">Button Demo</span>
              </div>
              <div className="bg-slate-100 p-8 flex flex-col items-center justify-center gap-3">
                <button onClick={handleClick} className="bg-slate-600 hover:bg-slate-700 active:scale-95 text-white px-8 py-3 rounded text-sm font-semibold transition-all shadow-md">
                  คลิกเลย!
                </button>
                <div className="text-sm text-slate-500">กดแล้ว: <span className="font-bold text-indigo-600">{clickCount}</span> ครั้ง</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800 shadow-inner">
          <div className="text-slate-500 mb-3 text-xs font-bold uppercase tracking-wider">Terminal Output</div>
          {output.length > 0 ? (
            output.map((o, i) => <div key={i} className="text-emerald-400">{o}</div>)
          ) : (
            <span className="text-slate-600">กดปุ่มคลิกเลย! เพื่อดูผลลัพธ์</span>
          )}
        </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">เราผูก function <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">on_click</code> กับ Button อย่างไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'no_paren', label: 'command=on_click (ไม่มีวงเล็บ — ส่งตัวฟังก์ชันเข้าไป)', correct: true },
            { val: 'paren', label: 'command=on_click() (มีวงเล็บ)' },
            { val: 'string', label: 'command="on_click"' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-mono text-sm transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); setClickCount(0); setOutput([]); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'no_paren' ? 'ถูกต้อง! ต้องไม่ใส่ () เพราะจะทำให้ฟังก์ชันถูกเรียกทันทีตอนสร้างปุ่ม' : 'ไม่ถูกต้อง: ต้องเขียน command=on_click (ไม่มีวงเล็บ)', quizAnswer === 'no_paren' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
