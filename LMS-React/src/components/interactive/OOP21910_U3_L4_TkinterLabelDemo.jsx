import React, { useState } from 'react';
import { Type, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function OOP21910_U3_L4_TkinterLabelDemo() {
  const [labelText, setLabelText] = useState('สวัสดีครับ!');
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#1e293b');
  const [bgColor, setBgColor] = useState('#f1f5f9');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const colorPresets = [
    { label: 'เข้ม', fg: '#1e293b', bg: '#f1f5f9' },
    { label: 'สีน้ำเงิน', fg: '#1d4ed8', bg: '#dbeafe' },
    { label: 'สีแดง', fg: '#dc2626', bg: '#fee2e2' },
    { label: 'สีเขียว', fg: '#16a34a', bg: '#dcfce7' },
  ];

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-600 to-pink-700 text-white p-5 flex items-center gap-3">
          <Type size={24} />
          <h3 className="font-bold text-lg">ทดลองสร้าง Label แบบ Real-time</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Controls */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ข้อความ (text)</label>
              <input type="text" value={labelText} onChange={e => setLabelText(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ขนาดฟอนต์: <span className="text-indigo-600">{fontSize}px</span></label>
              <input type="range" min="10" max="40" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ชุดสี:</label>
              <div className="flex gap-2">
                {colorPresets.map(p => (
                  <button key={p.label} onClick={() => { setFontColor(p.fg); setBgColor(p.bg); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${fontColor === p.fg ? 'border-indigo-500 shadow-md' : 'border-slate-200'}`}
                    style={{ color: p.fg, backgroundColor: p.bg }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code */}
            <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-inner mt-4">
              <span className="text-sky-300">tk</span>.<span className="text-blue-300">Label</span>(<br />
              &nbsp;&nbsp;<span className="text-yellow-300">root</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"{labelText}"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">font</span>=(<span className="text-green-300">"Arial"</span>, <span className="text-purple-300">{fontSize}</span>),<br />
              &nbsp;&nbsp;<span className="text-orange-300">fg</span>=<span className="text-green-300">"{fontColor}"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">bg</span>=<span className="text-green-300">"{bgColor}"</span><br />
              ).<span className="text-blue-300">pack</span>()
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex items-center justify-center min-h-[300px]">
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs ml-2">Label Demo</span>
              </div>
              <div className="bg-slate-100 p-8 flex items-center justify-center min-h-[160px]">
                <div className="px-4 py-3 rounded transition-all" style={{ fontSize: `${fontSize}px`, color: fontColor, backgroundColor: bgColor }}>
                  {labelText || '(ว่าง)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">Widget <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">Label</code> ใช้ทำอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'text', label: 'แสดงข้อความบนหน้าจอ (ผู้ใช้อ่านได้อย่างเดียว แก้ไขไม่ได้)', correct: true },
            { val: 'input', label: 'รับข้อมูลจากผู้ใช้ (พิมพ์ได้)' },
            { val: 'button', label: 'สร้างปุ่มกด' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'text' ? 'ถูกต้อง! Label ใช้แสดงข้อความแบบ read-only' : 'ไม่ถูกต้อง', quizAnswer === 'text' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
