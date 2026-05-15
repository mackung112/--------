import React, { useState } from 'react';
import { Presentation, Check, CheckCircle2, XCircle, AlertCircle, RotateCcw, Star, Award } from 'lucide-react';

export default function OOP21910_U5_L8_PresentationDemo() {
  const [checklist, setChecklist] = useState([
    { id: 'demo', text: '🖥️ เตรียมโปรเจกต์ที่รันได้จริง', checked: false, tip: 'ลอง Demo สดให้ผู้ฟังเห็น ดีกว่าแค่โชว์สไลด์' },
    { id: 'slides', text: '📊 เตรียมสไลด์ 5-8 หน้า', checked: false, tip: 'ปก, ปัญหา, วิธีแก้, สาธิต, UML, สรุป' },
    { id: 'story', text: '📖 เตรียม Story (ปัญหา → วิธีแก้)', checked: false, tip: 'เล่าว่าปัญหาคืออะไร แล้วโปรแกรมเราแก้ปัญหาอย่างไร' },
    { id: 'time', text: '⏱️ ฝึกซ้อมให้อยู่ใน 5-10 นาที', checked: false, tip: 'จับเวลาขณะซ้อม ถ้าเกิน 10 นาทีให้ตัดบางส่วนออก' },
    { id: 'qa', text: '❓ เตรียมตอบคำถาม', checked: false, tip: 'คิดล่วงหน้าว่าอาจารย์จะถามอะไร เช่น "ทำไมเลือก OOP?"' },
    { id: 'backup', text: '💾 สำรองไฟล์และ Screenshot', checked: false, tip: 'เผื่อเน็ตล่ม หรือโปรแกรม Error ให้มี Screenshot สำรอง' },
  ]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const toggleCheck = (id) => {
    setChecklist(checklist.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
    setSelectedTip(id);
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const allChecked = checkedCount === checklist.length;

  const slideTemplate = [
    { num: 1, title: 'หน้าปก', desc: 'ชื่อโปรเจกต์ + ชื่อสมาชิก' },
    { num: 2, title: 'ปัญหา (Problem)', desc: 'ปัญหาที่ต้องการแก้คืออะไร?' },
    { num: 3, title: 'วิธีแก้ (Solution)', desc: 'โปรแกรมของเราแก้ปัญหาอย่างไร?' },
    { num: 4, title: 'UML Diagram', desc: 'แสดงโครงสร้างคลาสและความสัมพันธ์' },
    { num: 5, title: 'สาธิต (Demo)', desc: 'รันโปรแกรมให้ดูสด!' },
    { num: 6, title: 'สรุปและบทเรียน', desc: 'สิ่งที่ได้เรียนรู้จากโปรเจกต์นี้' },
  ];

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-600 to-pink-700 text-white p-5 flex items-center gap-3">
          <Presentation size={24} />
          <h3 className="font-bold text-lg">เตรียมตัวนำเสนอผลงาน</h3>
          <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">{checkedCount}/{checklist.length} เสร็จ</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Checklist */}
          <div className="p-6 border-r border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm mb-3">✅ Checklist การเตรียมตัว</h4>
            <div className="space-y-2">
              {checklist.map(c => (
                <button key={c.id} onClick={() => toggleCheck(c.id)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${c.checked ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${c.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                    {c.checked && <Check size={12} />}
                  </div>
                  <span className={`text-sm ${c.checked ? 'text-slate-500 line-through' : 'text-slate-700 font-semibold'}`}>{c.text}</span>
                </button>
              ))}
            </div>

            {selectedTip && (
              <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700">
                💡 <strong>เคล็ดลับ:</strong> {checklist.find(c => c.id === selectedTip)?.tip}
              </div>
            )}

            {allChecked && (
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-700 flex items-center gap-2">
                <Award size={20} /> <strong>พร้อมนำเสนอแล้ว! 🎉</strong>
              </div>
            )}
          </div>

          {/* Slide Template */}
          <div className="p-6">
            <h4 className="font-bold text-slate-700 text-sm mb-3">📊 Template สไลด์นำเสนอ</h4>
            <div className="space-y-2">
              {slideTemplate.map(s => (
                <div key={s.num} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">{s.num}</div>
                  <div>
                    <div className="font-bold text-slate-700 text-sm">{s.title}</div>
                    <div className="text-xs text-slate-500">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">อะไรทำให้การนำเสนอโปรเจกต์ประทับใจมากที่สุด?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'demo', label: 'สาธิตโปรแกรมที่รันได้จริง (Live Demo) พร้อมเล่า Story ของปัญหา', correct: true },
            { val: 'slides', label: 'สไลด์สวยมากๆ 50+ หน้า' },
            { val: 'code', label: 'แสดงโค้ดทุกบรรทัดบนจอ' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'demo' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'demo' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
