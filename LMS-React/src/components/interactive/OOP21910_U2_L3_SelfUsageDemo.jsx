import React, { useState, useEffect, useRef } from 'react';
import { Bot, Battery, Zap, RotateCcw, Play } from 'lucide-react';

export default function OOP21910_U2_L3_SelfUsageDemo() {
  const [robots, setRobots] = useState([
    { id: 1, name: 'R2D2', battery: 20 },
    { id: 2, name: 'C3PO', battery: 50 }
  ]);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Robot factory initialized.' },
    { type: 'system', text: 'Created r1 = Robot("R2D2", 20)' },
    { type: 'system', text: 'Created r2 = Robot("C3PO", 50)' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const chargeBattery = (id) => {
    setRobots(prevRobots => prevRobots.map(r => {
      if (r.id === id) {
        return { ...r, battery: Math.min(100, r.battery + 20) };
      }
      return r;
    }));
    
    const botName = id === 1 ? 'r1' : 'r2';
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ${botName}.charge_battery()` },
      { type: 'system', text: `  -> Inside charge_battery, self points to ${botName}` },
      { type: 'output', text: `  -> ${botName}'s battery increased by 20%` }
    ]);
  };

  const clear = () => {
    setRobots([
      { id: 1, name: 'R2D2', battery: 20 },
      { id: 2, name: 'C3PO', battery: 50 }
    ]);
    setConsoleHistory([
      { type: 'system', text: 'Robot factory initialized.' },
      { type: 'system', text: 'Created r1 = Robot("R2D2", 20)' },
      { type: 'system', text: 'Created r2 = Robot("C3PO", 50)' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Bot size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">เข้าใจการใช้งาน self (ตัวแทนของ Object)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้เหตุผลที่ต้องมี <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">self</code> เป็นพารามิเตอร์แรกเสมอ เพื่อให้ Object รู้ว่ามันกำลังทำงานกับตัวมันเอง ไม่ใช่วัตถุอื่น
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Robots */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {robots.map((r, index) => (
                <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${r.id === 1 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                        <Bot size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{r.name}</h4>
                        <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                          Variable: {r.id === 1 ? 'r1' : 'r2'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-mono font-bold text-slate-600">
                      <Battery size={14} className={r.battery > 50 ? 'text-emerald-500' : 'text-orange-500'} /> 
                      {r.battery}%
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
                    <div className={`h-2 rounded-full transition-all duration-500 ${r.battery === 100 ? 'bg-emerald-500' : r.battery > 30 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${r.battery}%` }}></div>
                  </div>

                  <div className="mt-auto">
                    <button 
                      onClick={() => chargeBattery(r.id)}
                      disabled={r.battery >= 100}
                      className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${r.battery >= 100 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-95'}`}
                    >
                      <Zap size={16} className={r.battery < 100 ? "text-yellow-300" : ""} />
                      {r.id === 1 ? 'r1' : 'r2'}.charge_battery()
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">เจาะลึกกลไกการทำงาน</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-xs leading-loose">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Robot</span>:<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">charge_battery</span>(<span className="text-pink-300 font-bold">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-300 font-bold">self</span>.battery += 20
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-slate-800 text-sm mb-1">ทำไมต้องมี self?</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เพราะคลาสเป็นแค่แม่พิมพ์ เมื่อเราสร้างหุ่นยนต์ 2 ตัว (r1, r2) Python ต้องรู้ว่าตอนที่สั่ง <code className="bg-slate-200 px-1 rounded">charge_battery()</code> นั้น กำลังสั่งให้ชาร์จของตัวไหน
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm mb-1">บทบาทของ self</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <code className="bg-slate-200 px-1 rounded text-pink-600">self</code> จึงเป็นตัวแทนที่บอกว่า "ให้จัดการกับ Object นี้นะ" 
                    เช่น เมื่อ r1 สั่งชาร์จ self ก็คือ r1 ทำให้แบตของ r2 ไม่เพิ่มตาม
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
              <span className="text-slate-700 text-xs">Event Log</span>
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
