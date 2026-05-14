import React, { useState } from 'react';
import { ClipboardCheck, Play, Check, X, CheckCircle2, XCircle, AlertCircle, RotateCcw, Loader2 } from 'lucide-react';

export default function E2ETestDemo() {
  const [tests, setTests] = useState([
    { id: 1, scenario: 'เพิ่มสินค้าลงตะกร้า', steps: ['เปิดหน้าเมนู', 'คลิก "เอสเปรสโซ่"', 'ตรวจสอบว่าตะกร้ามี 1 รายการ'], passed: null },
    { id: 2, scenario: 'คำนวณราคารวมถูกต้อง', steps: ['เพิ่มสินค้า 2 ชิ้น (45 + 55)', 'ตรวจสอบราคารวม = 100', 'ตรวจสอบ VAT 7% = 7'], passed: null },
    { id: 3, scenario: 'ออกใบเสร็จได้', steps: ['เพิ่มสินค้าอย่างน้อย 1 รายการ', 'กดปุ่ม "ออกใบเสร็จ"', 'ตรวจสอบว่าใบเสร็จแสดงผลถูกต้อง'], passed: null },
    { id: 4, scenario: 'ลบสินค้าออกจากตะกร้า', steps: ['เพิ่มสินค้า', 'กดปุ่มลบ', 'ตรวจสอบว่าตะกร้าว่าง'], passed: null },
    { id: 5, scenario: 'Validation ชื่อลูกค้า', steps: ['พิมพ์ชื่อว่าง', 'กดบันทึก', 'ต้องแสดง Error "กรุณากรอกชื่อ"'], passed: null },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const runAll = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTests(tests.map(t => ({ ...t, passed: true })));
      setIsRunning(false);
      showToast('ทุก E2E Test ผ่าน! ระบบพร้อมใช้งาน 🎉', 'success');
    }, 1500);
  };

  const passedCount = tests.filter(t => t.passed === true).length;
  const totalRan = tests.filter(t => t.passed !== null).length;

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-5 flex items-center gap-3">
          <ClipboardCheck size={24} />
          <h3 className="font-bold text-lg">ทดสอบระบบรวม (E2E Testing)</h3>
          {totalRan > 0 && <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">{passedCount}/{totalRan} ผ่าน</div>}
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            {tests.map(t => (
              <div key={t.id} className={`border-2 rounded-xl overflow-hidden transition-all ${t.passed === true ? 'border-emerald-300 bg-emerald-50' : t.passed === false ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center gap-3 p-4">
                  <div className="w-6 flex-shrink-0">
                    {t.passed === true ? <Check size={18} className="text-emerald-600" /> : t.passed === false ? <X size={18} className="text-red-600" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-sm">Scenario: {t.scenario}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {t.steps.map((s, i) => <span key={i} className="inline-block mr-3">Step {i + 1}: {s}</span>)}
                    </div>
                  </div>
                  {t.passed !== null && <span className={`text-xs font-bold px-2 py-0.5 rounded ${t.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{t.passed ? 'PASS' : 'FAIL'}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={runAll} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md">
              {isRunning ? <><Loader2 size={16} className="animate-spin" /> กำลังทดสอบ...</> : <><Play size={16} /> รัน E2E Test ทั้งหมด</>}
            </button>
            <button onClick={() => setTests(tests.map(t => ({ ...t, passed: null })))} className="text-slate-500 hover:text-slate-700 px-4 py-2 text-sm flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">E2E Test ต่างจาก Unit Test อย่างไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'flow', label: 'E2E ทดสอบทั้ง Flow ตั้งแต่ต้นจนจบ ส่วน Unit Test ทดสอบแค่ฟังก์ชันเดียว', correct: true },
            { val: 'same', label: 'เหมือนกัน แค่เรียกคนละชื่อ' },
            { val: 'speed', label: 'E2E เร็วกว่า Unit Test' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'flow' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'flow' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
