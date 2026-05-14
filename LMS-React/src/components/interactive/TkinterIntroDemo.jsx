import React, { useState } from 'react';
import { Monitor, Terminal, MousePointerClick, CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';

export default function TkinterIntroDemo() {
  const [mode, setMode] = useState('cli');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const [activeTooltip, setActiveTooltip] = useState(null);
  const explanations = {
    'tkinter': { title: 'Tkinter คืออะไร?', desc: 'ไลบรารีมาตรฐานของ Python สำหรับสร้าง GUI (Graphical User Interface) ติดตั้งมาพร้อมกับ Python เลย ไม่ต้อง pip install เพิ่ม', color: 'text-blue-600' },
    'widget': { title: 'Widget คืออะไร?', desc: 'ส่วนประกอบต่างๆ บนหน้าจอ เช่น ปุ่มกด (Button), ช่องกรอก (Entry), ข้อความ (Label), กล่องเลือก (Combobox) ทุกอย่างที่ผู้ใช้มองเห็นและโต้ตอบได้คือ Widget', color: 'text-emerald-600' },
    'event': { title: 'Event-Driven คืออะไร?', desc: 'โปรแกรม GUI จะ "รอ" ให้ผู้ใช้กดปุ่มหรือพิมพ์ข้อความก่อน แล้วค่อยทำงานตอบสนอง ต่างจากโปรแกรม CLI ที่รันจากบนลงล่างทีเดียว', color: 'text-purple-600' },
  };

  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  return (
    <div className="space-y-12 my-8">
      {/* 1. CLI vs GUI Comparison */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5 flex items-center gap-3">
          <Monitor size={24} />
          <h3 className="font-bold text-lg">เปรียบเทียบ CLI vs GUI</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-3 mb-6 justify-center">
            <button onClick={() => setMode('cli')} className={`px-6 py-2 rounded-xl font-bold transition-all ${mode === 'cli' ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              <Terminal size={16} className="inline mr-2" />CLI (Command Line)
            </button>
            <button onClick={() => setMode('gui')} className={`px-6 py-2 rounded-xl font-bold transition-all ${mode === 'gui' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              <Monitor size={16} className="inline mr-2" />GUI (Tkinter)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code */}
            <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm shadow-lg">
              {mode === 'cli' ? (<>
                <div className="text-slate-400 mb-2"># โปรแกรม CLI</div>
                <div><span className="text-yellow-300">name</span> = <span className="text-pink-400">input</span>(<span className="text-green-300">"ชื่อ: "</span>)</div>
                <div><span className="text-yellow-300">age</span> = <span className="text-pink-400">input</span>(<span className="text-green-300">"อายุ: "</span>)</div>
                <div><span className="text-pink-400">print</span>(<span className="text-green-300">f"สวัสดี {'{'}<span className="text-yellow-300">name</span>{'}'} อายุ {'{'}<span className="text-yellow-300">age</span>{'}'} ปี"</span>)</div>
              </>) : (<>
                <div className="text-slate-400 mb-2"># โปรแกรม GUI ด้วย Tkinter</div>
                <div><span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span></div>
                <div className="mt-2"><span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()</div>
                <div><span className="text-sky-300">tk</span>.<span className="text-blue-300">Label</span>(<span className="text-yellow-300">root</span>, <span className="text-orange-300">text</span>=<span className="text-green-300">"ชื่อ:"</span>).<span className="text-blue-300">pack</span>()</div>
                <div><span className="text-sky-300">tk</span>.<span className="text-blue-300">Entry</span>(<span className="text-yellow-300">root</span>).<span className="text-blue-300">pack</span>()</div>
                <div><span className="text-sky-300">tk</span>.<span className="text-blue-300">Button</span>(<span className="text-yellow-300">root</span>, <span className="text-orange-300">text</span>=<span className="text-green-300">"ยืนยัน"</span>).<span className="text-blue-300">pack</span>()</div>
                <div><span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()</div>
              </>)}
            </div>

            {/* Preview */}
            <div className="flex items-center justify-center">
              {mode === 'cli' ? (
                <div className="bg-slate-900 rounded-xl p-5 w-full max-w-sm shadow-lg font-mono text-sm">
                  <div className="text-emerald-400">ชื่อ: <span className="text-white animate-pulse">|</span></div>
                  <div className="text-slate-500 mt-1">อายุ: _</div>
                  <div className="text-slate-600 mt-1">สวัสดี ... อายุ ... ปี</div>
                </div>
              ) : (
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-lg w-full max-w-xs">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-slate-400 text-xs ml-2">tk</span>
                  </div>
                  <div className="bg-slate-100 p-6 space-y-3">
                    <div className="text-slate-700 text-sm font-semibold">ชื่อ:</div>
                    <input type="text" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white" placeholder="กรอกชื่อ..." readOnly />
                    <div className="text-slate-700 text-sm font-semibold">อายุ:</div>
                    <input type="text" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white" placeholder="กรอกอายุ..." readOnly />
                    <button className="w-full bg-slate-600 text-white py-2 rounded text-sm font-semibold hover:bg-slate-700 transition-colors">ยืนยัน</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vocabulary */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">คำศัพท์สำคัญ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(explanations).map(([key, info]) => (
            <div key={key} onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${activeTooltip === key ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
              <h4 className={`font-bold ${info.color} mb-2`}>{info.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">Tkinter เป็นไลบรารีประเภทใด?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'gui', label: 'ไลบรารีสร้าง GUI ที่ติดมากับ Python (ไม่ต้อง pip install)', correct: true },
            { val: 'web', label: 'ไลบรารีสร้างเว็บไซต์' },
            { val: 'db', label: 'ไลบรารีเชื่อมต่อฐานข้อมูล' },
            { val: 'ml', label: 'ไลบรารี Machine Learning' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'gui' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'gui' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
