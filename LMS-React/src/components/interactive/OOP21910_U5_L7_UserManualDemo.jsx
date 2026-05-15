import React, { useState } from 'react';
import { BookOpen, Check, CheckCircle2, XCircle, AlertCircle, RotateCcw, ChevronRight } from 'lucide-react';

export default function OOP21910_U5_L7_UserManualDemo() {
  const [sections, setSections] = useState([
    { id: 'intro', title: '1. บทนำ', content: 'อธิบายว่าโปรแกรมนี้ทำอะไร', included: false },
    { id: 'install', title: '2. วิธีติดตั้ง', content: 'ขั้นตอนการติดตั้งและ setup', included: false },
    { id: 'usage', title: '3. วิธีใช้งาน', content: 'อธิบาย Feature หลักพร้อมภาพประกอบ', included: false },
    { id: 'faq', title: '4. คำถามที่พบบ่อย', content: 'ปัญหาที่พบบ่อยและวิธีแก้', included: false },
    { id: 'contact', title: '5. ข้อมูลติดต่อ', content: 'อีเมลหรือช่องทางติดต่อผู้พัฒนา', included: false },
  ]);
  const [title, setTitle] = useState('คู่มือการใช้งานระบบ POS');
  const [author, setAuthor] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const toggleSection = (id) => setSections(sections.map(s => s.id === id ? { ...s, included: !s.included } : s));
  const includedCount = sections.filter(s => s.included).length;

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-5 flex items-center gap-3">
          <BookOpen size={24} />
          <h3 className="font-bold text-lg">สร้างคู่มือการใช้งาน</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Builder */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ชื่อคู่มือ</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ผู้เขียน</label>
              <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="ชื่อ-นามสกุล" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">เลือกส่วนที่จะใส่ในคู่มือ:</label>
              <div className="space-y-2">
                {sections.map(s => (
                  <button key={s.id} onClick={() => toggleSection(s.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${s.included ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${s.included ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                      {s.included && <Check size={12} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-700 text-sm">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.content}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setShowPreview(true)} disabled={includedCount === 0} className="w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              ดูตัวอย่างคู่มือ <ChevronRight size={16} />
            </button>
          </div>

          {/* Preview */}
          <div className="p-6 min-h-[400px]">
            {showPreview && includedCount > 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6 pb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                  {author && <p className="text-sm text-slate-500 mt-1">โดย {author}</p>}
                  <p className="text-xs text-slate-400 mt-1">เอกสารฉบับ v1.0</p>
                </div>

                <h3 className="font-bold text-slate-700 text-sm mb-2">📋 สารบัญ</h3>
                <div className="mb-4 pb-4 border-b border-slate-200">
                  {sections.filter(s => s.included).map(s => (
                    <div key={s.id} className="text-sm text-indigo-600 py-0.5">{s.title}</div>
                  ))}
                </div>

                {sections.filter(s => s.included).map(s => (
                  <div key={s.id} className="mb-4">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{s.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-center">
                <div><BookOpen className="text-slate-300 mx-auto mb-3" size={32} />เลือกส่วนประกอบทางซ้าย<br />แล้วกด "ดูตัวอย่าง"</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">คู่มือการใช้งานที่ดีควรมีส่วนใดเป็นอย่างน้อย?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'all', label: 'บทนำ, วิธีติดตั้ง, วิธีใช้งาน, และ FAQ — ครอบคลุมทุกสิ่งที่ผู้ใช้ต้องการ', correct: true },
            { val: 'code', label: 'โค้ดต้นฉบับทั้งหมด' },
            { val: 'contact', label: 'แค่ข้อมูลติดต่อก็พอ' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'all' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'all' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
