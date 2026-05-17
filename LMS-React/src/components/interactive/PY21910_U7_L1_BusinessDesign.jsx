import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

const principles = [
  { 
    id: 1, 
    title: 'ใช้ฟังก์ชันแยกงาน (Modularity)', 
    desc: 'แบ่งโปรแกรมเป็นฟังก์ชันย่อย แต่ละฟังก์ชันควรทำงานเพียง 1 อย่าง (Single Responsibility) เพื่อให้อ่านง่ายและนำไปใช้ซ้ำได้', 
    icon: '🧩', 
    good: 'def calc_tax(price):\n    return price * 0.07\n\ndef calc_total(price, qty):\n    return (price * qty) + calc_tax(price)', 
    bad: '# เขียนยาวๆ รวมกันหมด ไม่แบ่งฟังก์ชัน\ntotal = (price * qty)\ntax = price * 0.07\nnet = total + tax\nprint(net)' 
  },
  { 
    id: 2, 
    title: 'ตรวจสอบข้อมูล Input (Validation)', 
    desc: 'ก่อนนำข้อมูลไปคำนวณ ต้องตรวจสอบว่าข้อมูลถูกต้องเสมอ เพื่อป้องกันโปรแกรมพัง (Crash) หรือให้ผลลัพธ์ผิดพลาด', 
    icon: '🛡️', 
    good: 'def process_order(price):\n    if price <= 0:\n        return "Error: ราคาต้อง > 0"\n    return price * 1.07', 
    bad: 'def process_order(price):\n    # ถ้า user ใส่ -5 โปรแกรมจะคำนวณต่อ\n    # ทำให้ยอดติดลบ!\n    return price * 1.07' 
  },
  { 
    id: 3, 
    title: 'ตั้งชื่อสื่อความหมาย (Naming)', 
    desc: 'ชื่อตัวแปรและฟังก์ชันต้องบอกได้ชัดเจนว่าเก็บข้อมูลอะไร หรือทำงานอะไร โดยไม่ต้องเดา', 
    icon: '📛', 
    good: 'total_price = price * quantity\ndiscount_rate = 0.10\nnet_amount = total_price * (1 - discount_rate)', 
    bad: 'x = p * q\nd = 0.10\nn = x * (1 - d)' 
  },
  { 
    id: 4, 
    title: 'คอมเมนต์อย่างมีคุณค่า (Comment)', 
    desc: 'เขียนคอมเมนต์เพื่ออธิบาย "ทำไมถึงเขียนแบบนี้" ไม่ใช่อธิบายว่า "โค้ดนี้คืออะไร" (เพราะโค้ดควรอ่านเข้าใจได้เอง)', 
    icon: '📝', 
    good: '# จัดโปรลด 10% ช่วงปีใหม่ (1-5 ม.ค.)\nif is_new_year_promo():\n    price = price * 0.90', 
    bad: '# เอา price คูณ 0.90\nprice = price * 0.90' 
  },
];

export default function PY21910_U7_L1_BusinessDesign() {
  const [active, setActive] = useState(0);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Business Design Principles Explorer Ready.' }
  ]);
  const consoleRef = useRef(null);
  
  const p = principles[active];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const changePrinciple = (idx) => {
    setActive(idx);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `load_principle(${idx + 1})` },
      { type: 'output', text: `Loaded: ${principles[idx].title}` }
    ]);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'Business Design Principles Explorer Ready.' }]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Briefcase size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">หลักการออกแบบโปรแกรมทางธุรกิจ</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้แนวปฏิบัติที่ดี (Best Practices) ในการเขียนโค้ดสำหรับระบบงานจริง เพื่อให้ระบบดูแลรักษาง่าย และลดข้อผิดพลาด
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Content */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-6">
              {principles.map((pr, i) => (
                <button key={i} onClick={() => changePrinciple(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 ${
                    active === i 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  <span>{pr.icon}</span> <span className="hidden sm:inline">{pr.title}</span><span className="sm:hidden">หลักที่ {i+1}</span>
                </button>
              ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6">
              <h4 className="font-bold text-indigo-900 text-lg mb-2 flex items-center gap-2">
                <span>{p.icon}</span> {p.title}
              </h4>
              <p className="text-indigo-700 text-sm leading-relaxed">{p.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div className="flex flex-col rounded-xl border border-emerald-200 overflow-hidden bg-white shadow-sm">
                <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span className="text-emerald-800 text-sm font-bold">Good Practice (แนะนำ)</span>
                </div>
                <div className="bg-slate-900 p-4 flex-1 overflow-x-auto">
                  <pre className="text-emerald-400 font-mono text-xs leading-relaxed">{p.good}</pre>
                </div>
              </div>

              <div className="flex flex-col rounded-xl border border-rose-200 overflow-hidden bg-white shadow-sm">
                <div className="bg-rose-50 border-b border-rose-200 px-4 py-3 flex items-center gap-2">
                  <XCircle size={16} className="text-rose-600" />
                  <span className="text-rose-800 text-sm font-bold">Bad Practice (ควรหลีกเลี่ยง)</span>
                </div>
                <div className="bg-slate-900 p-4 flex-1 overflow-x-auto">
                  <pre className="text-rose-400 font-mono text-xs leading-relaxed">{p.bad}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ทำไมต้องสนใจ Best Practices?</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                ในโลกการทำงานจริง โค้ดที่เราเขียนจะถูกนำไปใช้งานเป็นเวลานาน และอาจมีคนอื่น (หรือตัวเราในอนาคต) ต้องกลับมาแก้ไข
              </p>
              <div className="p-3 bg-amber-50 text-amber-800 rounded-lg text-xs leading-relaxed border border-amber-200">
                <strong className="block mb-1">"Code is read more often than it is written."</strong>
                โค้ดถูกอ่านบ่อยกว่าตอนเขียนเสมอ ดังนั้นการเขียนโค้ดให้อ่านง่าย สำคัญพอๆ กับการเขียนโค้ดให้ทำงานได้
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">✅ ลดเวลาในการหา Bug</li>
                <li className="flex gap-2">✅ ทำงานร่วมกับทีมง่ายขึ้น</li>
                <li className="flex gap-2">✅ เพิ่มฟีเจอร์ใหม่ได้เร็วขึ้น</li>
              </ul>
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
              <span className="text-slate-700 text-xs">python -i</span>
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
  );
}
