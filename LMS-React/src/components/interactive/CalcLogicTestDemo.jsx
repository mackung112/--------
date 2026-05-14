import React, { useState } from 'react';
import { Calculator, Play, Check, X, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function CalcLogicTestDemo() {
  const [tests, setTests] = useState([
    { id: 1, desc: 'สินค้า 3 ชิ้น ราคาชิ้นละ 50', code: 'assert calc_total(3, 50) == 150', fn: (a, b) => a * b, args: [3, 50], expected: 150, passed: null },
    { id: 2, desc: 'ส่วนลด 10%', code: 'assert apply_discount(200, 10) == 180', fn: (price, pct) => price - (price * pct / 100), args: [200, 10], expected: 180, passed: null },
    { id: 3, desc: 'ภาษี VAT 7%', code: 'assert add_vat(100, 7) == 107', fn: (price, vat) => price + (price * vat / 100), args: [100, 7], expected: 107, passed: null },
    { id: 4, desc: 'เงินทอน', code: 'assert calc_change(100, 73) == 27', fn: (paid, total) => paid - total, args: [100, 73], expected: 27, passed: null },
    { id: 5, desc: 'ราคารวมของ list', code: 'assert sum_prices([50, 30, 20]) == 100', fn: (arr) => arr.reduce((s, v) => s + v, 0), args: [[50, 30, 20]], expected: 100, passed: null },
  ]);
  const [runIdx, setRunIdx] = useState(-1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const runSingle = (idx) => {
    setRunIdx(idx);
    setTimeout(() => {
      const t = tests[idx];
      const actual = t.fn(...t.args);
      const newTests = [...tests];
      newTests[idx] = { ...t, passed: actual === t.expected };
      setTests(newTests);
      setRunIdx(-1);
    }, 500);
  };

  const runAll = () => {
    const results = tests.map(t => ({ ...t, passed: t.fn(...t.args) === t.expected }));
    setTests(results);
    const allPass = results.every(t => t.passed);
    showToast(allPass ? 'ทุก Test ผ่านหมด! 🎉' : 'บาง Test ไม่ผ่าน', allPass ? 'success' : 'error');
  };

  const resetAll = () => setTests(tests.map(t => ({ ...t, passed: null })));
  const passedCount = tests.filter(t => t.passed === true).length;
  const totalRan = tests.filter(t => t.passed !== null).length;

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-5 flex items-center gap-3">
          <Calculator size={24} />
          <h3 className="font-bold text-lg">ทดสอบตรรกะคำนวณ ด้วย assert</h3>
          {totalRan > 0 && <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">{passedCount}/{totalRan} ผ่าน</div>}
        </div>

        <div className="p-6">
          <div className="space-y-2 mb-6">
            {tests.map((t, i) => (
              <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${t.passed === true ? 'bg-emerald-50 border-emerald-300' : t.passed === false ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'} ${runIdx === i ? 'animate-pulse' : ''}`}>
                <div className="w-6 flex-shrink-0">
                  {t.passed === true ? <Check size={18} className="text-emerald-600" /> : t.passed === false ? <X size={18} className="text-red-600" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 font-semibold">{t.desc}</div>
                  <code className="text-xs text-slate-500 font-mono">{t.code}</code>
                </div>
                <button onClick={() => runSingle(i)} disabled={runIdx >= 0}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex-shrink-0">
                  <Play size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={runAll} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md">
              <Play size={16} /> รันทุก Test
            </button>
            <button onClick={resetAll} className="text-slate-500 hover:text-slate-700 px-4 py-2 rounded-xl text-sm flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ถ้า <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">assert calc_total(2, 30) == 60</code> ผ่าน แปลว่าอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'correct', label: 'ฟังก์ชัน calc_total(2, 30) คืนค่า 60 ซึ่งตรงกับที่คาดหวัง', correct: true },
            { val: 'error', label: 'ฟังก์ชันมี Error' },
            { val: 'print', label: 'ฟังก์ชัน print ค่า 60 ออกหน้าจอ' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'correct' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'correct' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
