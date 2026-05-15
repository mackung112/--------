import React, { useState } from 'react';
import { Link2, ArrowDown, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointer2 } from 'lucide-react';

export default function OOP21910_U5_L4_GUILogicConnectDemo() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [log, setLog] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const handleAdd = () => {
    if (!name.trim() || !price.trim()) { showToast('กรุณากรอกข้อมูลให้ครบ', 'warning'); return; }
    const p = parseFloat(price);
    if (isNaN(p)) { showToast('ราคาต้องเป็นตัวเลข', 'error'); return; }
    setItems([...items, { name: name.trim(), price: p }]);
    setLog(prev => [...prev,
      `[GUI] ปุ่ม "เพิ่ม" ถูกกด`,
      `[GUI→Logic] เรียก add_product("${name}", ${p})`,
      `[Logic] สร้าง Product("${name}", ${p})`,
      `[Logic→GUI] อัปเดตตาราง → ${items.length + 1} รายการ`,
    ]);
    setName(''); setPrice('');
  };

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-700 text-white p-5 flex items-center gap-3">
          <Link2 size={24} />
          <h3 className="font-bold text-lg">จำลองการเชื่อม GUI ↔ Logic</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* GUI Layer */}
          <div className="p-5 border-r border-slate-200">
            <h4 className="font-bold text-violet-700 text-sm mb-3 flex items-center gap-2"><MousePointer2 size={14} /> GUI Layer</h4>
            <div className="bg-slate-200 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-[10px] ml-1">POS App</span>
              </div>
              <div className="bg-slate-100 p-4 space-y-2">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" placeholder="ชื่อสินค้า" />
                <input type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" placeholder="ราคา" />
                <button onClick={handleAdd} className="w-full bg-violet-600 text-white py-1.5 rounded text-xs font-semibold hover:bg-violet-700 transition-colors">เพิ่มสินค้า</button>
                {items.length > 0 && (
                  <div className="border border-slate-300 rounded bg-white p-2 text-xs">
                    {items.map((it, i) => (
                      <div key={i} className="flex justify-between py-0.5 border-b border-slate-100 last:border-0">
                        <span>{it.name}</span><span className="text-indigo-600 font-mono">{it.price}฿</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-1 font-bold text-slate-800 border-t border-slate-300 mt-1">
                      <span>รวม</span><span className="text-emerald-600">{total}฿</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="p-5 flex items-center justify-center border-r border-slate-200">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 w-full">
              <h4 className="font-bold text-slate-700 text-sm mb-2 text-center">🔄 Data Flow</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="bg-violet-100 text-violet-700 p-2 rounded text-center">GUI: ผู้ใช้กดปุ่ม</div>
                <div className="text-center text-slate-400"><ArrowDown size={16} className="mx-auto" /></div>
                <div className="bg-blue-100 text-blue-700 p-2 rounded text-center">Command: เรียก function</div>
                <div className="text-center text-slate-400"><ArrowDown size={16} className="mx-auto" /></div>
                <div className="bg-emerald-100 text-emerald-700 p-2 rounded text-center">Logic: ประมวลผลข้อมูล</div>
                <div className="text-center text-slate-400"><ArrowDown size={16} className="mx-auto" /></div>
                <div className="bg-amber-100 text-amber-700 p-2 rounded text-center">GUI: อัปเดตหน้าจอ</div>
              </div>
            </div>
          </div>

          {/* Log */}
          <div className="p-5">
            <h4 className="font-bold text-slate-700 text-sm mb-3">📋 Event Log</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs min-h-[250px] max-h-[300px] overflow-y-auto shadow-inner">
              {log.length === 0 ? (
                <div className="text-slate-600">ลองกดปุ่ม "เพิ่มสินค้า" เพื่อดู Event Flow</div>
              ) : log.map((l, i) => (
                <div key={i} className={`py-0.5 ${l.startsWith('[GUI→') ? 'text-sky-400' : l.startsWith('[Logic→') ? 'text-amber-400' : l.startsWith('[Logic]') ? 'text-emerald-400' : 'text-violet-400'}`}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">เมื่อผู้ใช้กดปุ่มบน GUI ลำดับการทำงานที่ถูกต้องคือ?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'flow', label: 'GUI → เรียก function → Logic ประมวลผล → อัปเดต GUI', correct: true },
            { val: 'direct', label: 'GUI → อัปเดตหน้าจอทันที (ไม่ผ่าน Logic)' },
            { val: 'logic', label: 'Logic → GUI → ผู้ใช้กดปุ่ม' },
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
