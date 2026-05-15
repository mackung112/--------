import React, { useState } from 'react';
import { ListFilter, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L8_TkinterComboDemo() {
  const [options, setOptions] = useState(['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต']);
  const [selected, setSelected] = useState('');
  const [newOption, setNewOption] = useState('');
  const [output, setOutput] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const addOption = () => {
    if (!newOption.trim()) return;
    setOptions([...options, newOption.trim()]);
    setNewOption('');
    showToast(`เพิ่มตัวเลือก "${newOption}" สำเร็จ`, 'success');
  };

  const removeOption = (idx) => {
    const removed = options[idx];
    setOptions(options.filter((_, i) => i !== idx));
    if (selected === removed) setSelected('');
    showToast(`ลบตัวเลือก "${removed}" แล้ว`, 'success');
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-5 flex items-center gap-3">
          <ListFilter size={24} />
          <h3 className="font-bold text-lg">ทดลอง Combobox (กล่องเลือก)</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Controls */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">รายการตัวเลือกปัจจุบัน:</label>
              <div className="space-y-1">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
                    <span className="flex-1 text-slate-700">{opt}</span>
                    <button onClick={() => removeOption(i)} className="text-red-400 hover:text-red-600 transition-colors text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" value={newOption} onChange={e => setNewOption(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addOption(); }}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="เพิ่มตัวเลือกใหม่..." />
              <button onClick={addOption} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">เพิ่ม</button>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-inner">
              <div><span className="text-pink-400">from</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">import</span> <span className="text-sky-300">ttk</span></div>
              <div className="mt-1"><span className="text-yellow-300">combo</span> = <span className="text-sky-300">ttk</span>.<span className="text-blue-300">Combobox</span>(<span className="text-yellow-300">root</span>)</div>
              <div><span className="text-yellow-300">combo</span>[<span className="text-green-300">"values"</span>] = [</div>
              {options.map((opt, i) => (
                <div key={i}>&nbsp;&nbsp;<span className="text-green-300">"{opt}"</span>{i < options.length - 1 ? ',' : ''}</div>
              ))}
              <div>]</div>
              <div><span className="text-yellow-300">combo</span>.<span className="text-blue-300">pack</span>()</div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[300px]">
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-72">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs ml-2">Combobox Demo</span>
              </div>
              <div className="bg-slate-100 p-6 space-y-3">
                <label className="text-slate-700 text-sm font-semibold">เลือกจังหวัด:</label>
                <select value={selected} onChange={e => setSelected(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500">
                  <option value="">-- เลือก --</option>
                  {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
                <button onClick={() => { if (selected) { setOutput(selected); showToast(`ค่าที่เลือก: ${selected}`, 'success'); } }} className="w-full bg-slate-600 text-white py-2 rounded text-sm font-semibold hover:bg-slate-700 transition-colors">
                  เรียก .get()
                </button>
              </div>
            </div>

            {output && (
              <div className="bg-slate-900 rounded-xl p-4 w-72 font-mono text-sm shadow-lg">
                <div className="text-slate-500 text-xs mb-1">Terminal Output:</div>
                <div className="text-emerald-400">ค่าที่เลือก: <span className="text-white">{output}</span></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">Combobox อยู่ใน module ใดของ Tkinter?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'ttk', label: 'tkinter.ttk (Themed Tkinter — Widget รุ่นใหม่ที่สวยกว่า)', correct: true },
            { val: 'tk', label: 'tkinter (ตัวหลัก)' },
            { val: 'msg', label: 'tkinter.messagebox' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'ttk' ? 'ถูกต้อง! Combobox อยู่ใน ttk ซึ่งเป็น Widget รุ่นใหม่' : 'ไม่ถูกต้อง', quizAnswer === 'ttk' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
