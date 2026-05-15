import React, { useState } from 'react';
import { Briefcase, Users, ShoppingCart, ClipboardList, CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight, Check } from 'lucide-react';

export default function OOP21910_U5_L1_BusinessAnalysisDemo() {
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const scenario = {
    title: '☕ ร้านกาแฟ Coffee OOP',
    desc: 'ร้านกาแฟต้องการระบบ POS สำหรับรับออเดอร์และคำนวณราคา พนักงานจะใช้จอ Touch เพื่อเลือกเมนู ระบบต้องคำนวณราคารวม ออกใบเสร็จ และเก็บบันทึกยอดขาย',
  };

  const actors = [
    { id: 'cashier', name: 'พนักงานเคาน์เตอร์', icon: '🧑‍💼', correct: true },
    { id: 'customer', name: 'ลูกค้า', icon: '👤', correct: true },
    { id: 'manager', name: 'ผู้จัดการ', icon: '👔', correct: true },
    { id: 'delivery', name: 'คนส่งของ', icon: '🚚', correct: false },
  ];

  const features = [
    { id: 'menu', name: 'แสดงเมนูเครื่องดื่ม', class: 'Menu', correct: true },
    { id: 'order', name: 'รับออเดอร์', class: 'Order', correct: true },
    { id: 'calc', name: 'คำนวณราคารวม', class: 'Calculator', correct: true },
    { id: 'receipt', name: 'ออกใบเสร็จ', class: 'Receipt', correct: true },
    { id: 'game', name: 'เล่นเกมมินิ', class: '???', correct: false },
    { id: 'report', name: 'รายงานยอดขาย', class: 'Report', correct: true },
  ];

  const toggleActor = (id) => setSelectedActors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleFeature = (id) => setSelectedFeatures(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const checkAnalysis = () => {
    const correctActors = actors.filter(a => a.correct).map(a => a.id);
    const correctFeatures = features.filter(f => f.correct).map(f => f.id);
    const actorsOk = correctActors.every(a => selectedActors.includes(a)) && !selectedActors.some(a => !correctActors.includes(a));
    const featuresOk = correctFeatures.every(f => selectedFeatures.includes(f)) && !selectedFeatures.some(f => !correctFeatures.includes(f));
    if (actorsOk && featuresOk) showToast('ยอดเยี่ยม! วิเคราะห์โจทย์ได้ถูกต้องครบถ้วน 🎉', 'success');
    else showToast('ยังไม่ครบ — ลองอ่านโจทย์อีกครั้งแล้วเลือกใหม่', 'error');
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-5 flex items-center gap-3">
          <Briefcase size={24} />
          <h3 className="font-bold text-lg">วิเคราะห์โจทย์ธุรกิจ</h3>
        </div>

        <div className="p-6">
          {/* Scenario */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <h4 className="text-xl font-bold text-amber-800 mb-2">{scenario.title}</h4>
            <p className="text-amber-700 leading-relaxed">{scenario.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Actors */}
            <div>
              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Users size={18} /> เลือก Actor (ผู้ใช้ระบบ)</h4>
              <div className="space-y-2">
                {actors.map(a => (
                  <button key={a.id} onClick={() => toggleActor(a.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedActors.includes(a.id) ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <span className="text-2xl">{a.icon}</span>
                    <span className="font-semibold text-slate-700">{a.name}</span>
                    {selectedActors.includes(a.id) && <Check size={16} className="ml-auto text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><ClipboardList size={18} /> เลือก Feature (ฟีเจอร์ที่ต้องมี)</h4>
              <div className="space-y-2">
                {features.map(f => (
                  <button key={f.id} onClick={() => toggleFeature(f.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedFeatures.includes(f.id) ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <span className="font-semibold text-slate-700 flex-1">{f.name}</span>
                    {selectedFeatures.includes(f.id) && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono">{f.class}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={checkAnalysis} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 mx-auto">
            ตรวจคำตอบ <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ขั้นตอนแรกของการทำโปรเจกต์ธุรกิจคืออะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'analyze', label: 'วิเคราะห์โจทย์ — ระบุ Actor, Feature, และ Class ที่ต้องสร้าง', correct: true },
            { val: 'code', label: 'เริ่มเขียนโค้ดทันที' },
            { val: 'gui', label: 'ออกแบบ GUI ก่อน' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'analyze' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'analyze' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
