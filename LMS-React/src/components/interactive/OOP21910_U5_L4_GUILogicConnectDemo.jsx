import React, { useState, useEffect, useRef } from 'react';
import { Link2, ArrowDown, MousePointer2, Server, TerminalSquare } from 'lucide-react';

export default function OOP21910_U5_L4_GUILogicConnectDemo() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'GUI and Logic Event Listener initialized.' },
    { type: 'system', text: 'Waiting for user interaction...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleAdd = () => {
    if (!name.trim() || !price.trim()) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ click [เพิ่มสินค้า]` },
        { type: 'error', text: `❌ Validation Error: Name and price are required.` }
      ]);
      return;
    }
    
    const p = parseFloat(price);
    if (isNaN(p)) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ click [เพิ่มสินค้า]` },
        { type: 'error', text: `❌ Validation Error: Price must be a number.` }
      ]);
      return;
    }

    setItems([...items, { name: name.trim(), price: p }]);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ click [เพิ่มสินค้า]` },
      { type: 'system', text: `[GUI Event] -> add_product("${name.trim()}", ${p})` },
      { type: 'output', text: `[Logic] Instantiating Product("${name.trim()}", ${p})` },
      { type: 'output', text: `[Logic] Appending to internal list. Total items: ${items.length + 1}` },
      { type: 'system', text: `[GUI Update] <- Re-rendering table with new data` }
    ]);

    setName(''); 
    setPrice('');
  };

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <Link2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเชื่อมต่อ GUI กับ Logic</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้วงจรการทำงานเมื่อผู้ใช้กดปุ่มบนหน้าจอ (GUI Layer) ไปจนถึงการประมวลผลข้อมูล (Logic Layer) และการอัปเดตหน้าจอกลับ
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: GUI Application */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex items-center gap-2">
              <MousePointer2 size={16} /> GUI Layer (หน้าจอ)
            </h4>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-sm mx-auto w-full">
              {/* Window Header */}
              <div className="bg-slate-800 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-slate-300 text-xs font-semibold ml-2">POS App Window</span>
              </div>

              {/* Window Body */}
              <div className="p-5 space-y-3 bg-slate-50">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600">ชื่อสินค้า</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                    placeholder="เช่น กาแฟ" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600">ราคา (บาท)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                    placeholder="เช่น 50" />
                </div>
                
                <button onClick={handleAdd} className="w-full bg-violet-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-violet-700 transition-all shadow-md active:scale-95 mt-2">
                  เพิ่มสินค้า (Add)
                </button>

                {items.length > 0 && (
                  <div className="mt-4 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
                        <tr>
                          <th className="px-3 py-2 text-left font-bold border-b border-slate-200">สินค้า</th>
                          <th className="px-3 py-2 text-right font-bold border-b border-slate-200">ราคา</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it, i) => (
                          <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            <td className="px-3 py-2">{it.name}</td>
                            <td className="px-3 py-2 text-right font-mono text-violet-700">{it.price}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50 font-bold border-t border-slate-200">
                          <td className="px-3 py-2 text-slate-700">รวมทั้งหมด</td>
                          <td className="px-3 py-2 text-right font-mono text-emerald-600">{total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Data Flow Explanation */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex items-center gap-2">
              <Server size={16} /> Logic Flow (การทำงานเบื้องหลัง)
            </h4>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex-1 relative flex flex-col justify-center">
              
              <div className="space-y-0 relative z-10">
                {/* Step 1 */}
                <div className="bg-white border-2 border-violet-200 rounded-xl p-3 shadow-sm relative z-10">
                  <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">1. User Action (GUI)</div>
                  <div className="text-sm text-slate-700">ผู้ใช้กรอกข้อมูลและกดปุ่ม "เพิ่มสินค้า"</div>
                </div>

                <div className="h-6 flex items-center justify-center -my-1 relative z-0">
                  <div className="w-1 h-full bg-slate-200"></div>
                  <ArrowDown size={14} className="text-slate-400 absolute text-slate-300" />
                </div>

                {/* Step 2 */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-3 shadow-sm relative z-10">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">2. Event Handler</div>
                  <div className="text-sm text-slate-700 font-mono text-xs">btn_add.config(command=add_logic)</div>
                </div>

                <div className="h-6 flex items-center justify-center -my-1 relative z-0">
                  <div className="w-1 h-full bg-slate-200"></div>
                  <ArrowDown size={14} className="text-slate-400 absolute text-slate-300" />
                </div>

                {/* Step 3 */}
                <div className="bg-white border-2 border-emerald-200 rounded-xl p-3 shadow-sm relative z-10">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">3. Business Logic</div>
                  <div className="text-sm text-slate-700">
                    - ตรวจสอบความถูกต้อง (Validate)<br/>
                    - สร้าง Object บันทึกลง List
                  </div>
                </div>

                <div className="h-6 flex items-center justify-center -my-1 relative z-0">
                  <div className="w-1 h-full bg-slate-200"></div>
                  <ArrowDown size={14} className="text-slate-400 absolute text-slate-300" />
                </div>

                {/* Step 4 */}
                <div className="bg-white border-2 border-amber-200 rounded-xl p-3 shadow-sm relative z-10">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">4. UI Update (GUI)</div>
                  <div className="text-sm text-slate-700">อ่าน List ล่าสุด มาอัปเดตตารางแสดงผลบนหน้าจอ</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-56 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-400" />
              <span className="text-slate-300 text-xs font-semibold tracking-wider">EVENT LOG</span>
              <span className="text-slate-500 text-xs">Watch real-time GUI & Logic interactions</span>
            </div>
          </div>
          <div className="p-4 space-y-1.5 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-violet-400 font-bold shrink-0">[User]</span> <div className="text-slate-300">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-emerald-400 font-bold shrink-0">[Logic]</span> <div className="text-emerald-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-blue-400 font-bold shrink-0">[System]</span> <div className="text-blue-300">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-red-400 font-bold shrink-0">[Error]</span> <div className="text-red-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
