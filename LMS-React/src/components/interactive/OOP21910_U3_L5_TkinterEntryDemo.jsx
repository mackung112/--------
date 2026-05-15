import React, { useState } from 'react';
import { TextCursorInput, Play, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L5_TkinterEntryDemo() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const handleGetValue = () => {
    if (!inputValue.trim()) { setOutput('(ไม่มีข้อมูล - ช่องว่าง)'); return; }
    setOutput(inputValue);
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-sky-700 text-white p-5 flex items-center gap-3">
          <TextCursorInput size={24} />
          <h3 className="font-bold text-lg">ทดลองใช้ Entry Widget + .get()</h3>
        </div>

        <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-6">
          {/* Code */}
          <div className="p-6 bg-slate-50 border-r border-slate-200">
            <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm shadow-lg space-y-0.5">
              <div><span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span></div>
              <div className="mt-2"><span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()</div>
              <div className="mt-2"><span className="text-slate-400"># สร้าง Entry</span></div>
              <div><span className="text-yellow-300">entry</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Entry</span>(<span className="text-yellow-300">root</span>)</div>
              <div><span className="text-yellow-300">entry</span>.<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">10</span>)</div>
              <div className="mt-2"><span className="text-slate-400"># ดึงค่าด้วย .get()</span></div>
              <div><span className="text-pink-400">def</span> <span className="text-blue-300">show_value</span>():</div>
              <div>&nbsp;&nbsp;<span className="text-yellow-300">val</span> = <span className="text-yellow-300">entry</span>.<span className="text-blue-300">get</span>()</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">f"ค่าที่กรอก: {'{'}<span className="text-yellow-300">val</span>{'}'}"</span>)</div>
            </div>

            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm text-indigo-700">
              💡 <strong>.get()</strong> คือเมธอดสำหรับดึงค่าที่ผู้ใช้พิมพ์ลงใน Entry มาใช้งาน คืนค่าเป็น string เสมอ
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[300px]">
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs ml-2">Entry Demo</span>
              </div>
              <div className="bg-slate-100 p-6 space-y-3">
                <label className="text-slate-700 text-sm font-semibold">กรุณาพิมพ์ข้อมูล:</label>
                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500" placeholder="พิมพ์อะไรก็ได้..." />
                <button onClick={handleGetValue} className="w-full bg-slate-600 text-white py-2 rounded text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={14} /> เรียก .get()
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800 shadow-inner">
          <div className="text-slate-500 mb-3 text-xs font-bold uppercase tracking-wider">Terminal Output</div>
          {output !== null ? (
            <div className="text-emerald-400">ค่าที่กรอก: <span className="text-white">{output}</span></div>
          ) : (
            <span className="text-slate-600">กดปุ่มเรียก .get() เพื่อดูผลลัพธ์</span>
          )}
        </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">เมธอด <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">.get()</code> ของ Entry จะคืนค่าชนิดข้อมูลอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'str', label: 'string (ข้อความ) เสมอ — ถึงจะพิมพ์ตัวเลขก็ได้ string กลับมา', correct: true },
            { val: 'int', label: 'int (ตัวเลขจำนวนเต็ม)' },
            { val: 'auto', label: 'แล้วแต่ว่าพิมพ์อะไร ระบบจะตรวจสอบให้อัตโนมัติ' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'str' ? 'ถูกต้อง! .get() คืน string เสมอ ต้องแปลงด้วย int() หรือ float() เอง' : 'ไม่ถูกต้อง', quizAnswer === 'str' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
