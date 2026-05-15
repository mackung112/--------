import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';

export default function OOP21910_U4_L5_TypeCastingDemo() {
  const [inputVal, setInputVal] = useState('42');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const getCastResults = (val) => {
    const results = [];
    results.push({ func: 'str()', result: `"${val}"`, type: 'str', success: true });
    const intVal = parseInt(val); const isInt = !isNaN(intVal) && String(intVal) === val.trim();
    results.push({ func: 'int()', result: isInt ? String(intVal) : 'ValueError!', type: 'int', success: isInt });
    const floatVal = parseFloat(val); const isFloat = !isNaN(floatVal);
    results.push({ func: 'float()', result: isFloat ? String(floatVal) : 'ValueError!', type: 'float', success: isFloat });
    const boolVal = val.trim() !== '' && val.trim() !== '0' && val.trim().toLowerCase() !== 'false';
    results.push({ func: 'bool()', result: String(boolVal), type: 'bool', success: true });
    return results;
  };

  const results = getCastResults(inputVal);

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-5 flex items-center gap-3">
          <ArrowRightLeft size={24} />
          <h3 className="font-bold text-lg">ทดลองแปลงชนิดข้อมูล (Type Casting)</h3>
        </div>

        <div className="p-6">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">ใส่ค่าที่ต้องการแปลง:</label>
              <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
                className="text-center text-2xl font-mono border-2 border-indigo-300 rounded-xl px-6 py-3 w-64 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              <div className="text-sm text-slate-500 mt-1">ชนิดปัจจุบัน: <span className="text-indigo-600 font-mono font-bold">str</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(r => (
                <div key={r.func} className={`p-4 rounded-xl border-2 transition-all ${r.success ? 'border-slate-200 bg-white' : 'border-red-300 bg-red-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-indigo-600 font-mono font-bold text-sm">{r.func}</code>
                    <ArrowRight size={14} className="text-slate-400" />
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${r.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{r.type}</span>
                  </div>
                  <div className={`font-mono text-lg ${r.success ? 'text-slate-800' : 'text-red-600'}`}>{r.result}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700">
              💡 ลองใส่ค่าต่างๆ เช่น: <code className="bg-indigo-200/50 px-1 rounded">3.14</code>, <code className="bg-indigo-200/50 px-1 rounded">hello</code>, <code className="bg-indigo-200/50 px-1 rounded">0</code>, <code className="bg-indigo-200/50 px-1 rounded">True</code> เพื่อดูว่าแปลงได้หรือไม่
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200"><code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">int("hello")</code> จะเกิดอะไรขึ้น?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'error', label: 'เกิด ValueError เพราะ "hello" แปลงเป็นตัวเลขไม่ได้', correct: true },
            { val: 'zero', label: 'ได้ค่า 0' },
            { val: 'hash', label: 'ได้ค่า hash ของคำว่า hello' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'error' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'error' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
