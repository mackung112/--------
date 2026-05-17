import React, { useState, useEffect, useRef } from 'react';
import { Cookie, Box, Wand2, MousePointerClick, RotateCcw, AlertCircle } from 'lucide-react';

export default function OOP21910_U2_L1_ClassDefinitionDemo() {
  const [objectCount, setObjectCount] = useState(0);
  const [objects, setObjects] = useState([]);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Interpreter Ready.' },
    { type: 'system', text: 'คลาส Cookie ถูกสร้างขึ้น (ยังไม่มีคุณสมบัติใดๆ)' }
  ]);
  const consoleRef = useRef(null);

  const cookieColors = ['text-orange-300', 'text-yellow-600', 'text-amber-500'];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleCreateObject = () => {
    const newCount = objectCount + 1;
    setObjectCount(newCount);
    const color = cookieColors[Math.floor(Math.random() * cookieColors.length)];
    setObjects(prev => [...prev, { id: newCount, color }]);
    
    // Simulate memory address
    const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ obj_${newCount} = Cookie()` },
      { type: 'output', text: `<__main__.Cookie object at 0x000002${hex}>` }
    ]);
  };

  const clear = () => {
    setObjectCount(0);
    setObjects([]);
    setConsoleHistory([
      { type: 'system', text: 'Python Interpreter Ready.' },
      { type: 'system', text: 'คลาส Cookie ถูกสร้างขึ้น (ยังไม่มีคุณสมบัติใดๆ)' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Box size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">คลาสและการสร้างออบเจ็กต์เบื้องต้น</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การประกาศ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">class</code> เพื่อสร้างเป็น "แม่พิมพ์" และทดลองสร้างวัตถุ (Object) จากแม่พิมพ์นั้น
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Factory */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col items-center justify-center gap-6 h-full w-full">
              {/* Class Side */}
              <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-indigo-200 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">แม่พิมพ์</div>
                <h4 className="text-lg font-bold mb-4 text-indigo-700 flex items-center justify-center gap-2">
                  <Cookie size={24} className="text-amber-600" /> Class: Cookie
                </h4>
                
                <div className="bg-[#1e1e1e] text-white rounded-lg p-4 font-mono text-left text-sm shadow-inner mb-6">
                  <span className="text-pink-400">class</span> <span className="text-yellow-300">Cookie</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600">pass</span>
                </div>
                
                <button onClick={handleCreateObject}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-transform active:scale-95 shadow flex items-center justify-center gap-2">
                  <Wand2 size={18} /> สั่งสร้าง Object ใหม่
                </button>
              </div>

              {/* Arrow */}
              <div className="text-slate-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Objects Side */}
              <div className="w-full bg-emerald-50 rounded-2xl p-6 border border-emerald-200 shadow-inner min-h-[200px] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                    <Box size={20} /> วัตถุที่ถูกสร้างขึ้น (Objects)
                  </h4>
                  <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    จำนวน: {objectCount}
                  </span>
                </div>

                <div className="flex-1 flex flex-wrap content-start gap-4 overflow-y-auto max-h-[250px] relative">
                  {objects.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                      ยังไม่มี Object ถูกสร้าง
                    </div>
                  ) : (
                    objects.map(obj => (
                      <div key={obj.id} className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow border border-emerald-100 w-20 animate-in zoom-in duration-300">
                        <Cookie className={`w-8 h-8 mb-2 ${obj.color}`} />
                        <span className="text-[10px] font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">obj_{obj.id}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โครงสร้างและไวยากรณ์</h4>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm mb-4 flex-1">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-pink-600 text-sm font-mono mb-1">class</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คีย์เวิร์ดสำหรับบอก Python ว่าเรากำลังจะสร้างแม่พิมพ์ใหม่
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-yellow-600 text-sm font-mono mb-1">Cookie</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ชื่อของคลาส นิยมตั้งชื่อแบบ <strong className="text-indigo-600">PascalCase</strong> (ขึ้นต้นด้วยตัวใหญ่เสมอ) เช่น Student, Car, Cookie
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm font-mono mb-1">: (Colon)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เครื่องหมายโคลอน บอกว่าบรรทัดถัดไปที่เยื้องเข้าไป คือส่วนประกอบภายในคลาสนี้
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-700 text-sm font-mono mb-1">pass</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คำสั่งพิเศษที่บอกให้ Python "ข้ามไปก่อน" ใช้เมื่อเราสร้างโครงคลาสไว้ แต่ยังไม่ได้เขียนการทำงานข้างใน เพื่อไม่ให้เกิด Error
                  </p>
                </div>
              </div>

              <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  สังเกตใน Terminal ด้านล่าง เมื่อเราสร้าง Object โปรแกรมจะจองพื้นที่ในหน่วยความจำ (Memory Address) เช่น <code className="bg-amber-100 px-1 rounded">0x...</code> ซึ่งแต่ละ Object จะมีที่อยู่ไม่ซ้ำกันเลย
                </p>
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
              <span className="text-slate-700 text-xs">Python</span>
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
