import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Trash2, Receipt, Calculator, RotateCcw, MonitorPlay } from 'lucide-react';

const catalog = [
  { id: 1, name: "หนังสือ Python 101", price: 350, emoji: "📘" },
  { id: 2, name: "กาแฟอเมริกาโน่", price: 65, emoji: "☕" },
  { id: 3, name: "เค้กช็อกโกแลต", price: 120, emoji: "🍰" },
  { id: 4, name: "น้ำส้มคั้นสด", price: 45, emoji: "🍊" },
  { id: 5, name: "แซนด์วิช", price: 80, emoji: "🥪" },
  { id: 6, name: "ไอศกรีมวานิลา", price: 55, emoji: "🍦" },
];

const VAT_RATE = 0.07;


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function pyUnit8_2_MiniPOS() {
  const [cart, setCart] = useState([]);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Mini POS System Initialized.' },
    { type: 'system', text: '--- ยินดีต้อนรับสู่ระบบแคชเชียร์ ---' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `add_item("${item.name}")` },
        { type: 'output', text: `เพิ่มจำนวน ${item.name} เป็น ${existing.qty + 1} ชิ้น` }
      ]);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `add_item("${item.name}")` },
        { type: 'output', text: `เพิ่ม ${item.name} ลงในตะกร้า` }
      ]);
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find(c => c.id === id);
    setCart(cart.filter(c => c.id !== id));
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `remove_item("${item.name}")` },
      { type: 'output', text: `ลบ ${item.name} ออกจากตะกร้าแล้ว` }
    ]);
  };

  const clearCart = () => {
    setCart([]);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'clear_cart()' },
      { type: 'output', text: 'ล้างตะกร้าสินค้าเรียบร้อย' }
    ]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const checkout = () => {
    if (cart.length === 0) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: 'checkout()' },
        { type: 'error', text: 'Error: ตะกร้าว่างเปล่า ไม่สามารถชำระเงินได้' }
      ]);
      return;
    }

    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'checkout()' },
      { type: 'system', text: '\n' + '='.repeat(35) },
      { type: 'output', text: '        ใบเสร็จรับเงิน (RECEIPT)' },
      { type: 'system', text: '='.repeat(35) },
      ...cart.map(c => ({
        type: 'output',
        text: `${c.name} x${c.qty}  ${(c.price * c.qty).toFixed(2).padStart(10)} ฿`
      })),
      { type: 'system', text: '-'.repeat(35) },
      { type: 'output', text: `รวม:          ${subtotal.toFixed(2).padStart(12)} ฿` },
      { type: 'output', text: `VAT 7%:       ${vat.toFixed(2).padStart(12)} ฿` },
      { type: 'output', text: `ยอดสุทธิ:     ${total.toFixed(2).padStart(12)} ฿` },
      { type: 'system', text: '='.repeat(35) + '\n' }
    ]);
  };

  const clearLog = () => setConsoleHistory([
    { type: 'system', text: 'Mini POS System Initialized.' },
    { type: 'system', text: '--- ยินดีต้อนรับสู่ระบบแคชเชียร์ ---' }
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <MonitorPlay size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">โปรเจกต์: ระบบแคชเชียร์ (Mini POS)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          นำความรู้ทั้งหมดมาสร้างระบบจำลองการขายสินค้า กดเพิ่มสินค้าแล้วดูการทำงานและการออกใบเสร็จใน Terminal
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Store Interface */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50/50">
            
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <ShoppingCart className="text-emerald-600" size={18} /> รายการสินค้า (Catalog)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {catalog.map(item => (
                <button key={item.id} onClick={() => addToCart(item)}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all text-left group">
                  <span className="text-2xl bg-slate-50 p-2 rounded-lg">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-700 text-sm truncate">{item.name}</div>
                    <div className="text-emerald-600 font-bold text-sm">{item.price} ฿</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <Plus size={16} />
                  </div>
                </button>
              ))}
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3">โค้ดที่อยู่เบื้องหลัง (Behind the Scenes)</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-100 flex-1 shadow-inner overflow-x-auto min-h-[150px] border border-slate-700">
              <div className="text-pink-400">def <span className="text-blue-400 font-bold">add_item</span>(<span className="text-orange-300">name</span>):</div>
              <div className="ml-4 text-slate-700"># จำลองการเพิ่มสินค้าลงตะกร้า (List)</div>
              <div className="ml-4 text-emerald-300">cart.append(name)</div>
              <div className="text-pink-400 mt-2">def <span className="text-blue-400 font-bold">checkout</span>():</div>
              <div className="ml-4 text-emerald-300">subtotal = sum_prices(cart)</div>
              <div className="ml-4 text-emerald-300">vat = subtotal * 0.07</div>
              <div className="ml-4 text-emerald-300">total = subtotal + vat</div>
              <div className="ml-4 text-cyan-400">print_receipt(cart, subtotal, vat, total)</div>
            </div>
          </div>

          {/* Right: Cart & Checkout */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.02)] relative z-10">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                ตะกร้าสินค้า
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{cart.length}</span>
              </h4>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors">
                  <RotateCcw size={12} /> ล้าง
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-1 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center justify-center">
                  <ShoppingCart size={32} className="text-slate-200 mb-2" />
                  <p className="text-slate-600 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-xs text-slate-800 truncate">{item.name}</span>
                      <div className="flex items-center gap-2 text-[11px] mt-0.5">
                        <span className="text-slate-700">{item.price} ฿</span>
                        <span className="text-slate-600">x</span>
                        <span className="font-bold text-emerald-600">{item.qty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-2">
                      <span className="font-bold text-xs text-slate-900">{(item.price * item.qty).toLocaleString()} ฿</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-600 p-1 bg-rose-50 rounded-md transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-auto">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs"><span className="text-slate-700">รวมเป็นเงิน:</span><span className="font-mono font-bold text-slate-700">{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})} ฿</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-700">ภาษี (VAT 7%):</span><span className="font-mono font-bold text-slate-700">{vat.toLocaleString(undefined, {minimumFractionDigits: 2})} ฿</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800">ยอดชำระสุทธิ:</span>
                  <span className="font-mono font-bold text-emerald-600">{total.toLocaleString(undefined, {minimumFractionDigits: 2})} ฿</span>
                </div>
              </div>
              <button onClick={checkout} disabled={cart.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                  cart.length > 0 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}>
                <Receipt size={16} /> พิมพ์ใบเสร็จ (Checkout)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-[250px] bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python mini_pos.py</span>
            </div>
            <button onClick={clearLog} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Clear Log
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-slate-200 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-rose-400 font-bold whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
