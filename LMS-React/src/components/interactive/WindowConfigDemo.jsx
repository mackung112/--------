import React, { useState } from 'react';
import { Maximize2, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function WindowConfigDemo() {
  const [winTitle, setWinTitle] = useState('My App');
  const [winWidth, setWinWidth] = useState(300);
  const [winHeight, setWinHeight] = useState(200);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const scaleW = Math.min(winWidth / 2, 200);
  const scaleH = Math.min(winHeight / 2, 160);

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-5 flex items-center gap-3">
          <Maximize2 size={24} />
          <h3 className="font-bold text-lg">ปรับแต่งขนาดและชื่อหน้าต่าง (Real-time)</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Controls */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ชื่อหน้าต่าง (title)</label>
              <input type="text" value={winTitle} onChange={e => setWinTitle(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ความกว้าง (width): <span className="text-indigo-600">{winWidth}px</span></label>
              <input type="range" min="100" max="600" value={winWidth} onChange={e => setWinWidth(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ความสูง (height): <span className="text-indigo-600">{winHeight}px</span></label>
              <input type="range" min="80" max="400" value={winHeight} onChange={e => setWinHeight(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>

            {/* Live Code */}
            <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-inner">
              <span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span><br />
              <span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">title</span>(<span className="text-green-300">"{winTitle}"</span>)<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">geometry</span>(<span className="text-green-300">"{winWidth}x{winHeight}"</span>)<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex items-center justify-center min-h-[350px] bg-slate-100" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 0)', backgroundSize: '20px 20px' }}>
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl transition-all duration-300" style={{ width: `${scaleW}px`, minWidth: '120px' }}>
              <div className="bg-slate-700 px-2 py-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-[10px] ml-1 font-mono truncate">{winTitle}</span>
              </div>
              <div className="bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-mono transition-all duration-300" style={{ height: `${scaleH}px` }}>
                {winWidth} × {winHeight}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">คำสั่ง <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">root.geometry("400x300")</code> หมายความว่าอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'size', label: 'ตั้งค่าหน้าต่างกว้าง 400 พิกเซล สูง 300 พิกเซล', correct: true },
            { val: 'pos', label: 'ย้ายหน้าต่างไปตำแหน่ง (400, 300)' },
            { val: 'font', label: 'ตั้งค่าขนาดฟอนต์เป็น 400x300' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'size' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง: geometry ใช้ตั้งค่าขนาดหน้าต่าง', quizAnswer === 'size' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
