import React, { useState } from 'react';
import { ShieldCheck, Check, X, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function ValidationDemo() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const validations = [
    { field: 'ชื่อ', value: name, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: name.trim().length > 0 },
      { label: 'ความยาว 2-50 ตัวอักษร', pass: name.trim().length >= 2 && name.trim().length <= 50 },
    ]},
    { field: 'อายุ', value: age, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: age.trim().length > 0 },
      { label: 'เป็นตัวเลข', pass: !isNaN(age) && age.trim() !== '' },
      { label: 'อยู่ระหว่าง 1-120', pass: !isNaN(age) && parseInt(age) >= 1 && parseInt(age) <= 120 },
    ]},
    { field: 'อีเมล', value: email, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: email.trim().length > 0 },
      { label: 'มีเครื่องหมาย @', pass: email.includes('@') },
      { label: 'มี . หลัง @', pass: email.includes('@') && email.split('@')[1]?.includes('.') },
    ]},
  ];

  const allPassed = validations.every(v => v.rules.every(r => r.pass));

  const handleSubmit = () => {
    setSubmitted(true);
    if (allPassed) showToast('ข้อมูลถูกต้องครบถ้วน! ส่งข้อมูลสำเร็จ', 'success');
    else showToast('กรุณาแก้ไขข้อมูลที่ไม่ผ่านการตรวจสอบ', 'error');
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex items-center gap-3">
          <ShieldCheck size={24} />
          <h3 className="font-bold text-lg">ทดลองระบบ Validation แบบ Real-time</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Form */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ชื่อ</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className={`w-full border-2 rounded-lg px-3 py-2 outline-none transition-colors ${submitted && !validations[0].rules.every(r => r.pass) ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-indigo-500'}`} placeholder="กรอกชื่อ..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">อายุ</label>
              <input type="text" value={age} onChange={e => setAge(e.target.value)} className={`w-full border-2 rounded-lg px-3 py-2 outline-none transition-colors ${submitted && !validations[1].rules.every(r => r.pass) ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-indigo-500'}`} placeholder="กรอกอายุ..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">อีเมล</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} className={`w-full border-2 rounded-lg px-3 py-2 outline-none transition-colors ${submitted && !validations[2].rules.every(r => r.pass) ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-indigo-500'}`} placeholder="กรอกอีเมล..." />
            </div>
            <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all shadow-md">ส่งข้อมูล</button>
          </div>

          {/* Validation Results */}
          <div className="p-6 space-y-4">
            <h4 className="font-bold text-slate-700 flex items-center gap-2"><ShieldCheck size={16} /> ผลการตรวจสอบ</h4>
            {validations.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="font-bold text-slate-700 text-sm mb-2">{v.field}: <span className="font-mono text-indigo-600">{v.value || '(ว่าง)'}</span></div>
                <div className="space-y-1">
                  {v.rules.map((r, j) => (
                    <div key={j} className={`flex items-center gap-2 text-sm ${r.pass ? 'text-emerald-600' : 'text-red-500'}`}>
                      {r.pass ? <Check size={14} /> : <X size={14} />}
                      {r.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ทำไมเราต้องตรวจสอบข้อมูล (Validation) ก่อนนำไปใช้?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'prevent', label: 'เพื่อป้องกัน Error และข้อมูลผิดพลาดก่อนที่จะนำไปประมวลผล', correct: true },
            { val: 'speed', label: 'เพื่อทำให้โปรแกรมทำงานเร็วขึ้น' },
            { val: 'style', label: 'เพื่อให้โค้ดดูสวยงามและเป็นระเบียบ' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'prevent' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'prevent' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
