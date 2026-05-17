import React, { useState, useEffect, useRef } from 'react';
import { Car, Wrench, Settings, RotateCcw, AlertCircle } from 'lucide-react';

export default function OOP21910_U2_L2_ConstructorDemo() {
  const [activeBrand, setActiveBrand] = useState('Toyota');
  const [activeColor, setActiveColor] = useState('red');
  const [cars, setCars] = useState([]);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Class Car initialized with __init__(self, brand, color).' }
  ]);
  const consoleRef = useRef(null);

  const colors = [
    { id: 'red', name: 'แดง', class: 'text-red-500', hex: 'Red' },
    { id: 'blue', name: 'น้ำเงิน', class: 'text-blue-500', hex: 'Blue' },
    { id: 'green', name: 'เขียว', class: 'text-emerald-500', hex: 'Green' }
  ];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleCreateCar = () => {
    const colorObj = colors.find(c => c.id === activeColor);
    const newId = cars.length + 1;
    setCars(prev => [...prev, { id: newId, brand: activeBrand, color: colorObj }]);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ car_${newId} = Car("${activeBrand}", "${colorObj.hex}")` },
      { type: 'system', text: `  -> Calling __init__(self, "${activeBrand}", "${colorObj.hex}")` },
      { type: 'output', text: `  -> Object car_${newId} created with attributes { brand: '${activeBrand}', color: '${colorObj.hex}' }` }
    ]);
  };

  const clear = () => {
    setCars([]);
    setActiveBrand('Toyota');
    setActiveColor('red');
    setConsoleHistory([{ type: 'system', text: 'Class Car initialized with __init__(self, brand, color).' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Wrench size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">กำหนดค่าเริ่มต้นด้วย Constructor (__init__)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีกำหนดคุณสมบัติ (Attributes) ให้กับ Object ทันทีที่ถูกสร้างขึ้น ผ่านฟังก์ชันพิเศษ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">__init__</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Factory */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Form Side */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-slate-600" /> ตั้งค่าพารามิเตอร์
                </h4>
                
                <div className="space-y-5 flex-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">brand</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                      value={activeBrand}
                      onChange={(e) => setActiveBrand(e.target.value)}
                    >
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Tesla">Tesla</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">color</label>
                    <div className="flex gap-3">
                      {colors.map(c => (
                        <button key={c.id} onClick={() => setActiveColor(c.id)}
                          className={`w-10 h-10 rounded-full transition-transform border-2 ${c.id === 'red' ? 'bg-red-500 border-red-600' : c.id === 'blue' ? 'bg-blue-500 border-blue-600' : 'bg-emerald-500 border-emerald-600'} ${activeColor === c.id ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button onClick={handleCreateCar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 shadow flex items-center justify-center gap-2">
                    <Wrench size={18} /> สร้าง Object ใหม่
                  </button>
                </div>
              </div>

              {/* Objects Side */}
              <div className="bg-[#2d2d2d] rounded-2xl p-5 shadow-inner border border-black flex flex-col h-[350px]">
                <h4 className="font-bold text-slate-600 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm">
                  <Car size={16} /> Car Objects in Memory
                </h4>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {cars.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-700 text-xs">
                      รอคำสั่งสร้าง Object...
                    </div>
                  ) : (
                    cars.map(obj => (
                      <div key={obj.id} className="bg-[#3d3d3d] p-3 rounded-lg border border-slate-600 flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-[#1e1e1e] p-2 rounded-md border border-black">
                          <Car size={24} className={obj.color.class} />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-600 font-mono mb-0.5">car_{obj.id} = Car()</div>
                          <div className="text-xs text-white font-bold">{obj.brand} <span className="text-slate-600 font-normal">({obj.color.name})</span></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-xs leading-loose">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Car</span>:<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">__init__</span>(<span className="text-orange-300">self</span>, brand, color):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.brand = brand<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.color = color
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-sky-600 text-sm font-mono mb-1">__init__</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ฟังก์ชันพิเศษ หรือ Constructor จะถูกรันอัตโนมัติ 1 ครั้งถ้วน เมื่อมีการสร้าง Object ใหม่
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-orange-600 text-sm font-mono mb-1">self</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ตัวแทนของ Object ที่กำลังถูกสร้าง ต้องใส่เป็นพารามิเตอร์แรกในทุกๆ เมธอดของคลาสเสมอ
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm font-mono mb-1">self.variable = ...</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คือการนำค่าพารามิเตอร์ที่รับมา ไปบันทึกเก็บไว้เป็น "คุณสมบัติ" (Attribute) ประจำตัวของ Object นั้นๆ
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Python Memory Log</span>
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
