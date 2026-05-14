import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';

export default function ErrorReadingDemo() {
  const [selectedError, setSelectedError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const errors = [
    { id: 'name', title: 'NameError', code: 'print(namee)', error: "NameError: name 'namee' is not defined", line: 1, highlight: 'namee', fix: 'ตรวจสอบชื่อตัวแปรว่าสะกดถูกต้องหรือไม่ อาจเขียนผิดจาก name เป็น namee', color: 'border-red-500' },
    { id: 'syntax', title: 'SyntaxError', code: 'if x > 5\n    print("OK")', error: 'SyntaxError: expected \':\'', line: 1, highlight: 'if x > 5', fix: 'ลืมเครื่องหมาย Colon (:) หลัง if ต้องเขียนเป็น if x > 5:', color: 'border-orange-500' },
    { id: 'type', title: 'TypeError', code: 'age = "20"\nresult = age + 5', error: "TypeError: can only concatenate str (not \"int\") to str", line: 2, highlight: 'age + 5', fix: 'age เป็น string แต่ 5 เป็น int ต้องแปลงก่อน: int(age) + 5', color: 'border-yellow-500' },
    { id: 'index', title: 'IndexError', code: 'items = [1, 2, 3]\nprint(items[5])', error: 'IndexError: list index out of range', line: 2, highlight: 'items[5]', fix: 'list มีแค่ index 0-2 (3 ตัว) แต่เรียก index 5 ซึ่งไม่มี', color: 'border-purple-500' },
  ];

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 flex items-center gap-3">
          <AlertTriangle size={24} />
          <h3 className="font-bold text-lg">เรียนรู้การอ่าน Error ใน Python</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Error List */}
          <div className="p-4 border-r border-slate-200 space-y-2">
            <p className="text-sm text-slate-500 mb-3">เลือก Error เพื่อดูวิธีอ่านและแก้ไข:</p>
            {errors.map(err => (
              <button key={err.id} onClick={() => setSelectedError(err.id)}
                className={`w-full text-left p-4 rounded-xl border-l-4 ${err.color} transition-all ${selectedError === err.id ? 'bg-slate-50 shadow-md border-2 border-slate-300' : 'bg-white border border-slate-200 hover:shadow-sm'}`}>
                <div className="font-bold text-slate-800">{err.title}</div>
                <code className="text-xs text-slate-500 font-mono">{err.error.substring(0, 50)}...</code>
              </button>
            ))}
          </div>

          {/* Error Detail */}
          <div className="p-6 min-h-[350px]">
            {selectedError ? (() => {
              const err = errors.find(e => e.id === selectedError);
              return (
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm shadow-lg">
                    <div className="text-slate-500 text-xs mb-2">📄 main.py</div>
                    {err.code.split('\n').map((line, i) => (
                      <div key={i} className={`flex gap-3 ${i + 1 === err.line ? 'bg-red-500/20 rounded' : ''}`}>
                        <span className="text-slate-600 w-5 text-right">{i + 1}</span>
                        <span className="text-slate-300">{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="text-red-700 font-mono text-sm font-bold mb-2">❌ {err.error}</div>
                    <div className="flex items-start gap-2 mt-3">
                      <ArrowRight size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 text-sm leading-relaxed"><strong className="text-emerald-700">วิธีแก้:</strong> {err.fix}</p>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="h-full flex items-center justify-center text-slate-500 text-center">
                <div><AlertTriangle className="text-slate-300 mx-auto mb-3" size={32} />เลือก Error ทางด้านซ้าย<br />เพื่อดูวิธีอ่านและแก้ไข</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ถ้าเจอ Error <code className="text-red-400 bg-slate-700 px-2 py-0.5 rounded">NameError: name 'x' is not defined</code> สาเหตุมักเกิดจากอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'typo', label: 'ชื่อตัวแปรสะกดผิด หรือยังไม่ได้สร้างตัวแปรนั้น', correct: true },
            { val: 'syntax', label: 'ลืมใส่เครื่องหมาย Colon (:)' },
            { val: 'type', label: 'ชนิดข้อมูลไม่ตรงกัน' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'typo' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'typo' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
