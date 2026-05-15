import React, { useState, useEffect, useRef } from 'react';
import { Home, Hammer, Settings, RotateCcw } from 'lucide-react';

export default function OOP21910_U2_L5_InstantiationDemo() {
  const [houses, setHouses] = useState([]);
  const [houseName, setHouseName] = useState('MyHouse');
  const [houseColor, setHouseColor] = useState('blue');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Class House ready.' }
  ]);
  const consoleRef = useRef(null);

  const colors = [
    { id: 'blue', name: 'น้ำเงิน', class: 'text-blue-500', hex: 'Blue' },
    { id: 'red', name: 'แดง', class: 'text-red-500', hex: 'Red' },
    { id: 'green', name: 'เขียว', class: 'text-emerald-500', hex: 'Green' },
    { id: 'purple', name: 'ม่วง', class: 'text-purple-500', hex: 'Purple' }
  ];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const buildHouse = () => {
    if (!houseName) return;
    
    if (houses.length >= 4) {
      setConsoleHistory(prev => [...prev, { type: 'system', text: 'ERROR: Maximum 4 houses allowed in this demo.' }]);
      return;
    }

    const colorObj = colors.find(c => c.id === houseColor);
    const newId = houses.length + 1;
    const varName = `house_${newId}`;
    
    setHouses(prev => [...prev, { id: newId, name: houseName, color: colorObj, varName }]);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ${varName} = House("${houseName}", "${colorObj.hex}")` },
      { type: 'output', text: `  -> Object ${varName} created in memory.` }
    ]);
  };

  const openDoor = (house) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ${house.varName}.open_door()` },
      { type: 'output', text: `  -> ${house.name}'s door is now open!` }
    ]);
  };

  const clear = () => {
    setHouses([]);
    setHouseName('MyHouse');
    setHouseColor('blue');
    setConsoleHistory([{ type: 'system', text: 'Class House ready.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Home size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การนำคลาสไปสร้างเป็นออบเจ็กต์ (Instantiation)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้วิธีการนำแม่พิมพ์ (Class) ไปสร้างเป็นชิ้นงานจริง (Object) และการนำไปเก็บในตัวแปรเพื่อใช้งาน
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Form Side */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Hammer size={18} className="text-slate-400" /> สร้างบ้าน (Instantiate)
                </h4>
                
                <div className="space-y-5 flex-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">ชื่อบ้าน (name)</label>
                    <input 
                      type="text" 
                      value={houseName}
                      onChange={(e) => setHouseName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">สีบ้าน (color)</label>
                    <div className="flex gap-3">
                      {colors.map(c => (
                        <button key={c.id} onClick={() => setHouseColor(c.id)}
                          className={`w-10 h-10 rounded-full transition-transform border-2 ${c.id === 'red' ? 'bg-red-500 border-red-600' : c.id === 'blue' ? 'bg-blue-500 border-blue-600' : c.id === 'purple' ? 'bg-purple-500 border-purple-600' : 'bg-emerald-500 border-emerald-600'} ${houseColor === c.id ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : ''}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button onClick={buildHouse}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 shadow flex items-center justify-center gap-2">
                    <Hammer size={18} /> สร้าง Object จากคลาส House
                  </button>
                </div>
              </div>

              {/* Objects Side */}
              <div className="bg-[#2d2d2d] rounded-2xl p-5 shadow-inner border border-black flex flex-col h-[350px]">
                <h4 className="font-bold text-slate-300 mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm">
                  <Home size={16} /> Memory
                </h4>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {houses.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs text-center">
                      ยังไม่มี Object<br/>คลิกสร้าง Object จากคลาส House
                    </div>
                  ) : (
                    houses.map(h => (
                      <div key={h.id} className="bg-[#3d3d3d] p-3 rounded-lg border border-slate-600 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-right-4 group">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#1e1e1e] p-2 rounded-md border border-black">
                            <Home size={24} className={h.color.class} />
                          </div>
                          <div>
                            <div className="text-[10px] text-emerald-400 font-mono mb-0.5">{h.varName}</div>
                            <div className="text-xs text-white font-bold">{h.name}</div>
                          </div>
                        </div>
                        <button onClick={() => openDoor(h)} className="opacity-0 group-hover:opacity-100 text-[10px] bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-all">
                          open_door()
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-300 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-xs leading-loose">
              <span className="text-slate-500"># 1. สร้างและเก็บลงตัวแปร</span><br />
              <span className="text-emerald-400">my_house</span> = <span className="text-yellow-300">House</span>(<span className="text-sky-300">"Villa"</span>, <span className="text-sky-300">"Blue"</span>)<br />
              <br />
              <span className="text-slate-500"># 2. เรียกใช้เมธอดของ Object</span><br />
              <span className="text-emerald-400">my_house</span>.open_door()
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-yellow-600 text-sm font-mono mb-1">House(...)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    พิมพ์ชื่อคลาสแล้วตามด้วยวงเล็บ เป็นการสั่งให้ Python สร้าง Object ใหม่ขึ้นมา 1 ตัว
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">my_house =</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เมื่อสร้าง Object แล้ว เราต้องเอาไปเก็บใน "ตัวแปร" (Variable) เสมอ เพื่อให้เรามีชื่อเรียกและสามารถสั่งงานมันได้ในภายหลัง
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm font-mono mb-1">var.method()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้ตัวแปรที่เก็บ Object ไว้ ตามด้วยจุด (.) และชื่อเมธอด เพื่อสั่งให้ Object นั้นทำงาน
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
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Event Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
