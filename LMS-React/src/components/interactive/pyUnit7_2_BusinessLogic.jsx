import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Calculator, RotateCcw, Play, Tag, ShoppingCart, Percent } from 'lucide-react';




export default function pyUnit7_2_BusinessLogic() {
  const [price, setPrice] = useState(1200);
  const [qty, setQty] = useState(3);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Business Logic Simulator Ready.' }
  ]);
  const consoleRef = useRef(null);

  const total = price * qty;
  const discount = total > 3000 ? total * 0.1 : total > 1000 ? total * 0.05 : 0;
  const net = total - discount;
  const vat = net * 0.07;
  const grandTotal = net + vat;

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runCalculation = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `price = ${price}` },
      { type: 'command', text: `qty = ${qty}` },
      { type: 'command', text: `total = price * qty  # ${total}` },
      { type: 'system', text: '# ตรวจสอบเงื่อนไขส่วนลด (Discount)' },
      ...(total > 3000 
        ? [
            { type: 'command', text: 'if total > 3000:' },
            { type: 'output', text: `    discount = total * 0.10  # ${discount}` }
          ]
        : total > 1000 
        ? [
            { type: 'command', text: 'elif total > 1000:' },
            { type: 'output', text: `    discount = total * 0.05  # ${discount}` }
          ]
        : [
            { type: 'command', text: 'else:' },
            { type: 'output', text: `    discount = 0  # ${discount}` }
          ]
      ),
      { type: 'command', text: `net = total - discount  # ${net}` },
      { type: 'command', text: `vat = net * 0.07  # ${vat.toFixed(2)}` },
      { type: 'command', text: `grand_total = net + vat` },
      { type: 'output', text: `ยอดสุทธิ = ${grandTotal.toFixed(2)}` }
    ]);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'Business Logic Simulator Ready.' }]);

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
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Calculator size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ตรรกะธุรกิจ (Business Logic)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการคำนวณระบบขายสินค้า ซึ่งประกอบด้วยการคูณ (หาผลรวม), การสร้างเงื่อนไข <code>if-elif</code> (คิดส่วนลด) และการคิดภาษี
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Input & Code */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <label className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1"><Tag size={14} /> ราคา/ชิ้น (Price)</label>
                <input type="number" value={price} onChange={e => setPrice(+e.target.value)}
                  className="w-full px-3 py-2 text-lg font-bold text-slate-800 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <label className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1"><ShoppingCart size={14} /> จำนวน (Quantity)</label>
                <input type="number" value={qty} onChange={e => setQty(+e.target.value)}
                  className="w-full px-3 py-2 text-lg font-bold text-slate-800 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs shadow-inner flex-1 mb-4">
              <div className="text-slate-700 mb-2"># 1. หาราคารวม</div>
              <div className="text-emerald-300">total = price * qty</div>
              <div className="text-cyan-400 mb-4 ml-4"># = {total.toLocaleString()}</div>

              <div className="text-slate-700 mb-2"># 2. เงื่อนไขคิดส่วนลด</div>
              <div className={`${total > 3000 ? 'text-yellow-300 font-bold' : 'text-slate-400'}`}>if total &gt; 3000:</div>
              <div className={`ml-4 ${total > 3000 ? 'text-emerald-300' : 'text-slate-500'}`}>discount = total * 0.10</div>
              
              <div className={`${total > 1000 && total <= 3000 ? 'text-yellow-300 font-bold' : 'text-slate-400'}`}>elif total &gt; 1000:</div>
              <div className={`ml-4 ${total > 1000 && total <= 3000 ? 'text-emerald-300' : 'text-slate-500'}`}>discount = total * 0.05</div>
              
              <div className={`${total <= 1000 ? 'text-yellow-300 font-bold' : 'text-slate-400'}`}>else:</div>
              <div className={`ml-4 ${total <= 1000 ? 'text-emerald-300' : 'text-slate-500'}`}>discount = 0</div>
              
              <div className="text-cyan-400 mb-4 ml-4 mt-1"># ส่วนลด = {discount.toLocaleString()}</div>

              <div className="text-slate-700 mb-2"># 3. คำนวณยอดหลังหักส่วนลด และภาษี</div>
              <div className="text-emerald-300">net = total - discount</div>
              <div className="text-emerald-300">vat = net * 0.07</div>
            </div>

            <button onClick={runCalculation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
              <Play size={16} className="fill-current" /> คำนวณ (Run Logic)
            </button>
          </div>

          {/* Right: Info / Receipt */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ใบเสร็จจำลอง (Receipt)</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-4 flex-1 flex flex-col p-4">
              <div className="text-center font-bold text-slate-800 mb-4 pb-4 border-b border-dashed border-slate-300">
                สรุปยอดชำระเงิน
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">ยอดรวม (Total)</span>
                  <span className="font-mono font-bold text-slate-800">{total.toLocaleString()} ฿</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Percent size={12} className="text-emerald-500" />
                    ส่วนลด (Discount)
                  </span>
                  <span className="font-mono font-bold text-emerald-600">-{discount.toLocaleString()} ฿</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">ยอดสุทธิก่อนภาษี (Net)</span>
                  <span className="font-mono font-bold text-slate-800">{net.toLocaleString()} ฿</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">ภาษีมูลค่าเพิ่ม (VAT 7%)</span>
                  <span className="font-mono font-bold text-amber-600">+{vat.toFixed(2)} ฿</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center bg-blue-50 px-3 py-4 rounded-lg border border-blue-100">
                  <span className="font-bold text-blue-900 text-sm">ยอดชำระสุทธิ</span>
                  <span className="font-mono font-bold text-blue-700 text-xl">{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ฿</span>
                </div>
              </div>
            </div>
            
            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> เคลียร์ Terminal
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python pos_logic.py</span>
            </div>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
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
