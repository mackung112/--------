import React, { useState } from 'react';
import { Palette, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function TkinterStyleDemo() {
  const [bgColor, setBgColor] = useState('#f0f9ff');
  const [fgColor, setFgColor] = useState('#1e40af');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(14);
  const [btnBg, setBtnBg] = useState('#4f46e5');
  const [btnFg, setBtnFg] = useState('#ffffff');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const fonts = ['Arial', 'Courier New', 'Times New Roman', 'Helvetica'];
  const presets = [
    { name: 'ธีมน้ำเงิน', bg: '#f0f9ff', fg: '#1e40af', btnBg: '#4f46e5', btnFg: '#ffffff' },
    { name: 'ธีมเขียว', bg: '#f0fdf4', fg: '#166534', btnBg: '#16a34a', btnFg: '#ffffff' },
    { name: 'ธีมมืด', bg: '#1e293b', fg: '#e2e8f0', btnBg: '#6366f1', btnFg: '#ffffff' },
    { name: 'ธีมชมพู', bg: '#fdf2f8', fg: '#9d174d', btnBg: '#ec4899', btnFg: '#ffffff' },
  ];

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white p-5 flex items-center gap-3">
          <Palette size={24} />
          <h3 className="font-bold text-lg">ปรับแต่งสีและฟอนต์แบบ Real-time</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Controls */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ธีมสำเร็จรูป:</label>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button key={p.name} onClick={() => { setBgColor(p.bg); setFgColor(p.fg); setBtnBg(p.btnBg); setBtnFg(p.btnFg); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-slate-200 hover:border-indigo-400 transition-all" style={{ backgroundColor: p.bg, color: p.fg }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">สีพื้นหลัง (bg)</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">สีตัวอักษร (fg)</label>
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">สีปุ่ม (bg)</label>
                <input type="color" value={btnBg} onChange={e => setBtnBg(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">สีตัวอักษรปุ่ม</label>
                <input type="color" value={btnFg} onChange={e => setBtnFg(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ฟอนต์: <span className="text-indigo-600">{fontFamily}</span></label>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
                {fonts.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ขนาดฟอนต์: <span className="text-indigo-600">{fontSize}px</span></label>
              <input type="range" min="10" max="28" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>

            {/* Code */}
            <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs shadow-inner">
              <div><span className="text-yellow-300">root</span>.<span className="text-blue-300">configure</span>(<span className="text-orange-300">bg</span>=<span className="text-green-300">"{bgColor}"</span>)</div>
              <div className="mt-1"><span className="text-sky-300">tk</span>.<span className="text-blue-300">Label</span>(</div>
              <div>&nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"สวัสดี"</span>, <span className="text-orange-300">fg</span>=<span className="text-green-300">"{fgColor}"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-orange-300">bg</span>=<span className="text-green-300">"{bgColor}"</span>, <span className="text-orange-300">font</span>=(<span className="text-green-300">"{fontFamily}"</span>, <span className="text-purple-300">{fontSize}</span>)</div>
              <div>)</div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs ml-2">Style Demo</span>
              </div>
              <div className="p-6 space-y-4 transition-all" style={{ backgroundColor: bgColor }}>
                <div style={{ color: fgColor, fontFamily, fontSize: `${fontSize}px` }} className="font-semibold text-center">ระบบลงทะเบียน</div>
                <div style={{ color: fgColor, fontFamily, fontSize: `${Math.max(fontSize - 4, 10)}px` }}>ชื่อ:</div>
                <input type="text" className="w-full border rounded px-3 py-1.5 text-sm" style={{ fontFamily, fontSize: `${Math.max(fontSize - 4, 10)}px` }} placeholder="กรอกชื่อ..." readOnly />
                <div style={{ color: fgColor, fontFamily, fontSize: `${Math.max(fontSize - 4, 10)}px` }}>อายุ:</div>
                <input type="text" className="w-full border rounded px-3 py-1.5 text-sm" style={{ fontFamily, fontSize: `${Math.max(fontSize - 4, 10)}px` }} placeholder="กรอกอายุ..." readOnly />
                <button className="w-full py-2 rounded font-semibold transition-colors text-sm" style={{ backgroundColor: btnBg, color: btnFg, fontFamily }}>ลงทะเบียน</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">พารามิเตอร์ <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">fg</code> ใน Widget หมายถึงอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'fg', label: 'สีตัวอักษร (foreground color)', correct: true },
            { val: 'bg', label: 'สีพื้นหลัง (background color)' },
            { val: 'font', label: 'ชนิดฟอนต์' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'fg' ? 'ถูกต้อง! fg = foreground = สีตัวอักษร' : 'ไม่ถูกต้อง: fg ย่อมาจาก foreground คือสีตัวอักษร', quizAnswer === 'fg' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
