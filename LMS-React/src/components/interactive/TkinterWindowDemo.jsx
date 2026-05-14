import React, { useState } from 'react';
import { AppWindow, Play, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function TkinterWindowDemo() {
  const [showWindow, setShowWindow] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const explanations = {
    'import': { title: 'import tkinter as tk', desc: 'นำเข้าไลบรารี Tkinter แล้วตั้งชื่อย่อว่า tk เพื่อให้เขียนสั้นลง (จาก tkinter.Button เหลือ tk.Button)', color: 'text-pink-500' },
    'root': { title: 'root = tk.Tk()', desc: 'สร้างหน้าต่างหลัก (Main Window) ซึ่งเป็นฐานรากของทุก Widget ทั้งหมด ตัวแปร root เป็นชื่อนิยมที่ใช้กัน', color: 'text-yellow-500' },
    'mainloop': { title: 'root.mainloop()', desc: 'เริ่มลูปการทำงานของ GUI ทำให้หน้าต่างแสดงผลค้างไว้และรอรับ Event จากผู้ใช้ (เช่น คลิกปุ่ม) ถ้าไม่มีบรรทัดนี้ หน้าต่างจะเปิดแล้วปิดทันที!', color: 'text-emerald-500' },
  };

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Live Window Demo */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-5 flex items-center gap-3">
          <AppWindow size={24} />
          <h3 className="font-bold text-lg">จำลองการสร้างหน้าต่าง Tkinter</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Code */}
          <div className="p-6 bg-slate-50 border-r border-slate-200">
            <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm shadow-lg leading-loose">
              <span onMouseEnter={() => setActiveTooltip('import')} className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'import' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}>
                <span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span>
              </span><br /><br />
              <span onMouseEnter={() => setActiveTooltip('root')} className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'root' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}>
                <span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()
              </span><br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">title</span>(<span className="text-green-300">"My First App"</span>)<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">geometry</span>(<span className="text-green-300">"300x200"</span>)<br /><br />
              <span onMouseEnter={() => setActiveTooltip('mainloop')} className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'mainloop' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}>
                <span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()
              </span>
            </div>

            <button onClick={() => setShowWindow(true)} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95">
              <Play size={18} /> รันโปรแกรม
            </button>
          </div>

          {/* Preview / Explanation */}
          <div className="p-6 flex items-center justify-center min-h-[300px]">
            {showWindow ? (
              <div className="animate-in zoom-in-95 fade-in duration-500">
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <button onClick={() => setShowWindow(false)} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-slate-400 text-xs ml-2 font-mono">My First App</span>
                  </div>
                  <div className="bg-slate-100 h-44 flex items-center justify-center text-slate-400 text-sm">
                    (หน้าต่างว่าง — พร้อมใส่ Widget)
                  </div>
                </div>
                <p className="text-center text-sm text-emerald-600 font-semibold mt-3">✅ หน้าต่างแสดงผลแล้ว!</p>
              </div>
            ) : activeTooltip && explanations[activeTooltip] ? (
              <div className="w-full animate-in fade-in">
                <h4 className={`text-lg font-bold font-mono ${explanations[activeTooltip].color} mb-2 border-b pb-2`}>{explanations[activeTooltip].title}</h4>
                <p className="text-slate-600 leading-relaxed">{explanations[activeTooltip].desc}</p>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <MousePointerClick className="text-slate-300 mx-auto mb-3" size={32} />
                ชี้ที่โค้ดเพื่อดูคำอธิบาย<br />หรือกด "รันโปรแกรม" เพื่อดูผลลัพธ์
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ถ้าไม่เขียน <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">root.mainloop()</code> จะเกิดอะไรขึ้น?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'close', label: 'หน้าต่างจะเปิดขึ้นมาแล้วปิดทันที (แวบเดียว)', correct: true },
            { val: 'error', label: 'โปรแกรมจะ Error ทันที' },
            { val: 'nothing', label: 'ไม่เกิดอะไร หน้าต่างแสดงผลปกติ' },
            { val: 'slow', label: 'หน้าต่างจะทำงานช้าลง' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'close' ? 'ถูกต้อง! mainloop() ทำให้หน้าต่างค้างรอ Event' : 'ไม่ถูกต้อง', quizAnswer === 'close' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
