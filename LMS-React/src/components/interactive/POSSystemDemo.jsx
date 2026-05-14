import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Receipt, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function POSSystemDemo() {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const menu = [
    { id: 1, name: 'เอสเปรสโซ่', price: 45, emoji: '☕' },
    { id: 2, name: 'คาปูชิโน่', price: 55, emoji: '☕' },
    { id: 3, name: 'ลาเต้', price: 50, emoji: '🥛' },
    { id: 4, name: 'ชาเขียว', price: 40, emoji: '🍵' },
    { id: 5, name: 'โกโก้', price: 50, emoji: '🍫' },
    { id: 6, name: 'เค้กช็อค', price: 65, emoji: '🍰' },
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { ...item, qty: 1 }]);
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center gap-3">
          <ShoppingCart size={24} />
          <h3 className="font-bold text-lg">จำลองระบบ POS ร้านกาแฟ</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Menu */}
          <div className="p-5 border-r border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm mb-3">📋 เมนูสินค้า (คลิกเพื่อเพิ่ม)</h4>
            <div className="grid grid-cols-2 gap-3">
              {menu.map(item => (
                <button key={item.id} onClick={() => addToCart(item)}
                  className="p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all text-center active:scale-95">
                  <div className="text-3xl mb-1">{item.emoji}</div>
                  <div className="font-bold text-slate-700 text-sm">{item.name}</div>
                  <div className="text-emerald-600 font-mono font-bold">{item.price}฿</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="p-5">
            <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><ShoppingCart size={14} /> ตะกร้าสินค้า ({cart.reduce((s, c) => s + c.qty, 0)} ชิ้น)</h4>

            {cart.length === 0 ? (
              <div className="text-center text-slate-400 py-12">ยังไม่มีสินค้าในตะกร้า<br />คลิกที่เมนูเพื่อเพิ่ม</div>
            ) : (<>
              <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto">
                {cart.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-lg">{c.emoji}</span>
                    <span className="flex-1 text-sm font-semibold text-slate-700">{c.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(c.id, -1)} className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-red-100 hover:text-red-600"><Minus size={12} /></button>
                      <span className="w-8 text-center font-mono font-bold text-slate-700">{c.qty}</span>
                      <button onClick={() => updateQty(c.id, 1)} className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600"><Plus size={12} /></button>
                    </div>
                    <span className="font-mono text-sm text-indigo-600 w-16 text-right">{c.price * c.qty}฿</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600"><span>ราคาสินค้า</span><span className="font-mono">{subtotal}฿</span></div>
                <div className="flex justify-between text-slate-600"><span>VAT 7%</span><span className="font-mono">{vat}฿</span></div>
                <div className="flex justify-between text-lg font-bold text-slate-800 pt-1 border-t border-slate-300"><span>รวมทั้งหมด</span><span className="text-emerald-600 font-mono">{total}฿</span></div>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => { setShowReceipt(true); showToast('ออกใบเสร็จสำเร็จ!', 'success'); }} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"><Receipt size={16} /> ออกใบเสร็จ</button>
                <button onClick={() => { setCart([]); setShowReceipt(false); }} className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-4 py-2.5 rounded-xl text-sm transition-colors"><Trash2 size={16} /></button>
              </div>
            </>)}

            {showReceipt && cart.length > 0 && (
              <div className="mt-4 bg-white border-2 border-dashed border-slate-300 rounded-xl p-4 font-mono text-xs text-center">
                <div className="font-bold text-sm mb-1">☕ Coffee OOP</div>
                <div className="text-slate-500 mb-2">{'='.repeat(30)}</div>
                {cart.map(c => (<div key={c.id} className="flex justify-between"><span>{c.name} x{c.qty}</span><span>{c.price * c.qty}฿</span></div>))}
                <div className="text-slate-500 my-1">{'-'.repeat(30)}</div>
                <div className="flex justify-between"><span>VAT 7%</span><span>{vat}฿</span></div>
                <div className="flex justify-between font-bold text-sm"><span>รวม</span><span>{total}฿</span></div>
                <div className="text-slate-500 mt-2 text-[10px]">ขอบคุณที่ใช้บริการ 🙏</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ในระบบ POS คลาสใดควรรับผิดชอบคำนวณราคารวม?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'order', label: 'Order — เพราะรู้ข้อมูลรายการสินค้าทั้งหมดในออเดอร์', correct: true },
            { val: 'product', label: 'Product — เพราะรู้ราคาของสินค้า' },
            { val: 'gui', label: 'GUI — เพราะเป็นส่วนที่แสดงผล' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'order' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'order' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
