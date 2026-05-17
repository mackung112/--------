import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Receipt, Coffee } from 'lucide-react';

export default function OOP21910_U5_L5_POSSystemDemo() {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'POS System Ready.' },
    { type: 'system', text: 'Menu loaded: 6 items.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const menu = [
    { id: 1, name: 'เอสเปรสโซ่', price: 45, emoji: '☕' },
    { id: 2, name: 'คาปูชิโน่', price: 55, emoji: '☕' },
    { id: 3, name: 'ลาเต้', price: 50, emoji: '🥛' },
    { id: 4, name: 'ชาเขียว', price: 40, emoji: '🍵' },
    { id: 5, name: 'โกโก้', price: 50, emoji: '🍫' },
    { id: 6, name: 'เค้กช็อค', price: 65, emoji: '🍰' },
  ];

  const addToCart = (item) => {
    setShowReceipt(false);
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pos.add_to_cart(product_id=${item.id})` },
      { type: 'output', text: `> Added ${item.name} (${item.price} THB) to cart.` }
    ]);
  };

  const updateQty = (id, delta, itemName) => {
    setShowReceipt(false);
    const updated = cart.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0);
    setCart(updated);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pos.update_cart_qty(product_id=${id}, delta=${delta})` },
      { type: 'output', text: `> Updated quantity for ${itemName}.` }
    ]);
  };

  const clearCart = () => {
    setCart([]);
    setShowReceipt(false);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pos.clear_cart()` },
      { type: 'system', text: `> Cart cleared.` }
    ]);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    setShowReceipt(true);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pos.checkout()` },
      { type: 'output', text: `> Subtotal: ${subtotal} THB` },
      { type: 'output', text: `> VAT (7%): ${vat} THB` },
      { type: 'output', text: `> Total: ${total} THB` },
      { type: 'system', text: `> Receipt generated successfully.` }
    ]);
  };

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;
  const cartItemCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <Coffee size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">โปรเจกต์: ระบบ POS ร้านกาแฟ (POS System)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทดลองใช้งานระบบ POS ฉบับย่อ ที่รวบรวมแนวคิด Class, Object, List, และ Loop มาทำงานร่วมกันอย่างสมบูรณ์
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Menu Items */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              Menu (เมนูสินค้า)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {menu.map(item => (
                <button key={item.id} onClick={() => addToCart(item)}
                  className="bg-white p-4 border-2 border-slate-200 rounded-2xl hover:border-emerald-400 hover:shadow-lg transition-all text-center active:scale-95 group flex flex-col items-center justify-center gap-2">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</div>
                  <div className="font-bold text-slate-700 text-sm mt-1">{item.name}</div>
                  <div className="text-emerald-600 font-mono font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs border border-emerald-100">{item.price} ฿</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Cart and Receipt */}
          <div className="w-full lg:w-[400px] bg-white flex flex-col">
            
            {showReceipt && cart.length > 0 ? (
              // Receipt View
              <div className="p-6 flex-1 flex flex-col bg-slate-50">
                 <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
                  Receipt (ใบเสร็จรับเงิน)
                </h4>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col relative overflow-hidden">
                  {/* Decorative receipt edge top */}
                  <div className="absolute top-0 left-0 right-0 flex -mt-2 opacity-20">
                    {Array.from({length: 30}).map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-slate-800 -ml-1"></div>)}
                  </div>
                  
                  <div className="text-center font-mono font-bold text-lg text-slate-800 mb-1 pt-2">☕ Coffee OOP</div>
                  <div className="text-center text-xs text-slate-700 mb-4 font-mono">TAX ID: 0123456789012</div>
                  
                  <div className="border-b-2 border-dashed border-slate-300 mb-4"></div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 font-mono text-sm">
                    {cart.map(c => (
                      <div key={c.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-slate-800 font-bold">{c.name}</div>
                          <div className="text-xs text-slate-700">{c.qty} x {c.price}</div>
                        </div>
                        <div className="text-slate-800">{c.price * c.qty}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-dashed border-slate-300 mt-4 pt-4 font-mono text-sm space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>VAT (7%)</span>
                      <span>{vat}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 pb-1">
                      <span>TOTAL</span>
                      <span>{total} ฿</span>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-slate-600 font-mono mt-6">
                    Thank you / ขอบคุณที่ใช้บริการ
                  </div>

                   {/* Decorative receipt edge bottom */}
                   <div className="absolute bottom-0 left-0 right-0 flex -mb-2 opacity-20">
                    {Array.from({length: 30}).map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-slate-800 -ml-1"></div>)}
                  </div>
                </div>

                <button onClick={() => { clearCart(); }} className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-bold transition-all shadow-md">
                  ปิดและเริ่มบิลใหม่
                </button>
              </div>
            ) : (
              // Cart View
              <div className="p-6 flex-1 flex flex-col h-full">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2"><ShoppingCart size={16} /> Cart (ตะกร้า)</div>
                  {cartItemCount > 0 && <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-bold">{cartItemCount} item{cartItemCount > 1 ? 's' : ''}</span>}
                </h4>

                <div className="flex-1 border border-slate-200 rounded-xl bg-slate-50 flex flex-col overflow-hidden">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-6 text-center">
                      <ShoppingCart size={48} className="mb-4 opacity-20" />
                      <p className="text-sm">ตะกร้าว่างเปล่า<br/>คลิกเลือกสินค้าจากเมนูด้านซ้าย</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                        {cart.map(c => (
                          <div key={c.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xl bg-slate-50 p-1.5 rounded-md">{c.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-slate-800 truncate">{c.name}</div>
                              <div className="text-xs text-slate-700 font-mono">{c.price}฿</div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                                <button onClick={() => updateQty(c.id, -1, c.name)} className="w-6 h-6 rounded-md bg-white text-slate-600 shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"><Minus size={14} /></button>
                                <span className="w-6 text-center font-mono font-bold text-slate-700 text-xs">{c.qty}</span>
                                <button onClick={() => updateQty(c.id, 1, c.name)} className="w-6 h-6 rounded-md bg-white text-slate-600 shadow-sm flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors"><Plus size={14} /></button>
                              </div>
                              <div className="font-mono text-sm font-bold text-indigo-600">{c.price * c.qty}฿</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white border-t border-slate-200 p-4 space-y-2">
                        <div className="flex justify-between text-slate-700 text-xs font-mono"><span>Subtotal:</span><span>{subtotal}฿</span></div>
                        <div className="flex justify-between text-slate-700 text-xs font-mono"><span>VAT (7%):</span><span>{vat}฿</span></div>
                        <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-slate-100 pt-2"><span>Total:</span><span className="text-emerald-600 font-mono">{total}฿</span></div>
                        
                        <div className="flex gap-2 mt-4 pt-2">
                          <button onClick={clearCart} className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors border border-red-200" title="ล้างตะกร้า">
                            <Trash2 size={20} />
                          </button>
                          <button onClick={checkout} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
                            <Receipt size={18} /> ออกใบเสร็จ (Checkout)
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">POS Server Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
