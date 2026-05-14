import React, { useState } from 'react';
import { FlaskConical, Play, Check, X, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function UnitTestDemo() {
  const [tests, setTests] = useState([
    { id: 1, name: 'test_add', code: 'assert add(2, 3) == 5', expected: 5, actual: null, passed: null },
    { id: 2, name: 'test_add_negative', code: 'assert add(-1, 1) == 0', expected: 0, actual: null, passed: null },
    { id: 3, name: 'test_add_zero', code: 'assert add(0, 0) == 0', expected: 0, actual: null, passed: null },
    { id: 4, name: 'test_multiply', code: 'assert multiply(3, 4) == 12', expected: 12, actual: null, passed: null },
    { id: 5, name: 'test_multiply_zero', code: 'assert multiply(5, 0) == 0', expected: 0, actual: null, passed: null },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const runTests = () => {
    setIsRunning(true);
    const results = tests.map((t, i) => {
      const actual = t.expected; // simulate correct results
      return { ...t, actual, passed: actual === t.expected };
    });
    setTimeout(() => { setTests(results); setIsRunning(false); }, 800);
  };

  const resetTests = () => setTests(tests.map(t => ({ ...t, actual: null, passed: null })));
  const passedCount = tests.filter(t => t.passed === true).length;
  const totalRan = tests.filter(t => t.passed !== null).length;

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-5 flex items-center gap-3">
          <FlaskConical size={24} />
          <h3 className="font-bold text-lg">จำลอง Unit Test</h3>
          {totalRan > 0 && <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">{passedCount}/{totalRan} ผ่าน</div>}
        </div>

        <div className="p-6">
          {/* Function being tested */}
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-lg mb-6">
            <div className="text-slate-500 mb-2"># ฟังก์ชันที่จะทดสอบ</div>
            <div><span className="text-pink-400">def</span> <span className="text-blue-300">add</span>(<span className="text-orange-300">a</span>, <span className="text-orange-300">b</span>):</div>
            <div>&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">a</span> + <span className="text-orange-300">b</span></div>
            <div className="mt-2"><span className="text-pink-400">def</span> <span className="text-blue-300">multiply</span>(<span className="text-orange-300">a</span>, <span className="text-orange-300">b</span>):</div>
            <div>&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">a</span> * <span className="text-orange-300">b</span></div>
          </div>

          {/* Test Cases */}
          <div className="space-y-2 mb-6">
            {tests.map(t => (
              <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all font-mono text-sm ${t.passed === true ? 'bg-emerald-50 border-emerald-300' : t.passed === false ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
                <div className="w-6 flex-shrink-0">
                  {t.passed === true ? <Check size={18} className="text-emerald-600" /> : t.passed === false ? <X size={18} className="text-red-600" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                </div>
                <div className="flex-1">
                  <span className="text-indigo-600 font-bold">{t.name}</span>
                  <span className="text-slate-500 ml-2 text-xs">{t.code}</span>
                </div>
                {t.passed !== null && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${t.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {t.passed ? 'PASS' : 'FAIL'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={runTests} disabled={isRunning} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md">
              <Play size={16} /> {isRunning ? 'กำลังทดสอบ...' : 'รัน Test ทั้งหมด'}
            </button>
            <button onClick={resetTests} className="text-slate-500 hover:text-slate-700 px-4 py-2 rounded-xl text-sm flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">คำสั่ง <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">assert</code> ทำงานอย่างไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'check', label: 'ตรวจสอบว่าเงื่อนไขเป็นจริง ถ้าไม่จริงจะ Raise AssertionError', correct: true },
            { val: 'print', label: 'แสดงผลลัพธ์ออกหน้าจอ' },
            { val: 'return', label: 'คืนค่าจากฟังก์ชัน' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'check' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'check' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
