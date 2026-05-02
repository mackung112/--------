import React, { useState } from 'react';
import { ShoppingCart, Plus, Trash2, Receipt, Calculator, RotateCcw } from 'lucide-react';

const catalog = [
  { id: 1, name: "หนังสือ Python 101", price: 350, emoji: "📘" },
  { id: 2, name: "กาแฟอเมริกาโน่", price: 65, emoji: "☕" },
  { id: 3, name: "เค้กช็อกโกแลต", price: 120, emoji: "🍰" },
  { id: 4, name: "น้ำส้มคั้นสด", price: 45, emoji: "🍊" },
  { id: 5, name: "แซนด์วิช", price: 80, emoji: "🥪" },
  { id: 6, name: "ไอศกรีมวานิลา", price: 55, emoji: "🍦" },
];

const VAT_RATE = 0.07;

export default function MiniPOS() {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    setShowReceipt(false);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id));
    setShowReceipt(false);
  };

  const clearCart = () => { setCart([]); setShowReceipt(false); };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  // Generate Python code equivalent
  const pythonCode = `# ระบบแคชเชียร์ (Mini POS)

def calculate_vat(subtotal, vat_rate=0.07):
    """ฟังก์ชันคำนวณภาษีมูลค่าเพิ่ม"""
    return subtotal * vat_rate

def print_receipt(items, total_price):
    """ฟังก์ชันพิมพ์ใบเสร็จ"""
    print("\\n" + "=" * 35)
    print("   ใบเสร็จรับเงิน (RECEIPT)")
    print("=" * 35)
    for name, price, qty in items:
        line_total = price * qty
        print(f"{name} x{qty}  {line_total:>10.2f} ฿")
    
    vat = calculate_vat(total_price)
    grand_total = total_price + vat
    
    print("-" * 35)
    print(f"รวม:          {total_price:>12.2f} ฿")
    print(f"VAT 7%:       {vat:>12.2f} ฿")
    print(f"ยอดสุทธิ:     {grand_total:>12.2f} ฿")
    print("=" * 35)

# ตะกร้าสินค้า
cart = [
${cart.map(c => `    ("${c.name}", ${c.price}, ${c.qty}),`).join('\n') || '    # (ยังไม่มีสินค้าในตะกร้า)'}
]

total = sum(price * qty for _, price, qty in cart)
print_receipt(cart, total)`;

  return (
    <div className="w-full my-12">
      <p className="text-gray-600 text-lg mb-6">ลองเพิ่มสินค้าลงตะกร้า แล้วดูโค้ด Python ที่เทียบเท่ากับการทำงานของระบบนี้:</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Shop + Cart */}
        <div>
          {/* Catalog */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-indigo-600" /> รายการสินค้า
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {catalog.map(item => (
                <button key={item.id} onClick={() => addToCart(item)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 transition-all text-left">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm truncate">{item.name}</div>
                    <div className="text-indigo-600 font-bold text-sm">{item.price} ฿</div>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                🛒 ตะกร้า ({cart.length} รายการ)
              </h4>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-red-500 text-xs font-bold flex items-center gap-1 hover:text-red-700">
                  <RotateCcw className="w-3 h-3" /> ล้างตะกร้า
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-4">ยังไม่มีสินค้า</p>
            ) : (
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <span className="font-medium text-sm text-gray-800">{item.name}</span>
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">x{item.qty}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-gray-900">{(item.price * item.qty).toFixed(2)} ฿</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-600">รวม:</span><span className="font-bold">{subtotal.toFixed(2)} ฿</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">VAT 7%:</span><span className="font-bold">{vat.toFixed(2)} ฿</span></div>
                <div className="flex justify-between text-lg font-extrabold text-indigo-700 pt-2 border-t border-gray-200">
                  <span>ยอดสุทธิ:</span><span>{total.toFixed(2)} ฿</span>
                </div>
                <button onClick={() => setShowReceipt(true)}
                  className="w-full flex items-center justify-center gap-2 mt-3 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md">
                  <Receipt className="w-5 h-5" /> พิมพ์ใบเสร็จ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Python Code */}
        <div>
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">🐍 โค้ด Python ที่เทียบเท่า</span>
            </div>
            <pre className="font-mono text-xs text-slate-100 whitespace-pre-wrap overflow-x-auto max-h-[500px] overflow-y-auto">{pythonCode}</pre>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="mt-6 bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg max-w-md mx-auto font-mono text-sm">
          <div className="text-center mb-4">
            <div className="text-lg font-bold">{"=".repeat(30)}</div>
            <div className="font-bold text-lg mt-1">ใบเสร็จรับเงิน</div>
            <div className="text-lg font-bold">{"=".repeat(30)}</div>
          </div>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.emoji} {item.name} x{item.qty}</span>
              <span>{(item.price * item.qty).toFixed(2)} ฿</span>
            </div>
          ))}
          <div className="my-2">{"-".repeat(30)}</div>
          <div className="flex justify-between"><span>รวม:</span><span>{subtotal.toFixed(2)} ฿</span></div>
          <div className="flex justify-between"><span>VAT 7%:</span><span>{vat.toFixed(2)} ฿</span></div>
          <div className="flex justify-between font-bold text-lg mt-2"><span>ยอดสุทธิ:</span><span>{total.toFixed(2)} ฿</span></div>
          <div className="text-center mt-4 text-lg font-bold">{"=".repeat(30)}</div>
          <div className="text-center mt-2 text-xs text-gray-400">ขอบคุณที่ใช้บริการ 🙏</div>
        </div>
      )}
    </div>
  );
}
