import React, { useState, useEffect, useRef } from 'react';
import { Settings, ChevronRight, CheckCircle2, RotateCcw, MonitorPlay, MousePointerClick, CheckSquare } from 'lucide-react';

const interpreters = [
  { id: 'py312', label: "Python 3.12.4 64-bit", path: "C:\\Python312\\python.exe", recommended: true },
  { id: 'py311', label: "Python 3.11.9 64-bit", path: "C:\\Python311\\python.exe", recommended: false },
  { id: 'venv', label: "Python 3.12.4 ('venv')", path: ".\\venv\\Scripts\\python.exe", recommended: false },
];

export default function OOP21910_U1_L4_InterpreterSetupDemo() {
  const [step, setStep] = useState(0); // 0: Start, 1: Palette, 2: Select, 3: Done
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Interpreter Setup Simulator Initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleStep = (nextStep) => {
    setStep(nextStep);
    if (nextStep === 1) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: 'Shortcut triggered: Ctrl + Shift + P' },
        { type: 'command', text: '> Python: Select Interpreter' }
      ]);
    }
  };

  const selectInterpreter = (interp) => {
    setSelectedInterpreter(interp.id);
    setStep(3);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'output', text: `Selected Python Interpreter: ${interp.label}` },
      { type: 'system', text: `Path: ${interp.path}` },
      { type: 'system', text: 'VS Code is now configured to use this Python version.' }
    ]);
  };

  const clear = () => {
    setStep(0);
    setSelectedInterpreter(null);
    setConsoleHistory([{ type: 'system', text: 'Interpreter Setup Simulator Initialized.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Settings size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การตั้งค่า Python Interpreter</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้วิธีบอก VS Code ว่าเราต้องการใช้ Python เวอร์ชันไหนในการรันโค้ด ผ่านเมนู Command Palette
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Section */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-center items-center bg-slate-100">
            
            <div className="w-full max-w-lg bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-[350px] relative">
              <div className="bg-[#2d2d2d] px-3 py-1.5 flex items-center gap-2 border-b border-black">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"/><div className="w-3 h-3 rounded-full bg-amber-500"/><div className="w-3 h-3 rounded-full bg-emerald-500"/></div>
                <span className="text-slate-400 text-xs font-mono ml-2 flex-1 text-center">VS Code</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                
                {step === 0 && (
                  <div className="text-center space-y-6">
                    <div className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-600">
                      <div className="text-slate-400 text-xs mb-3 font-mono">1. กดปุ่มลัดเพื่อเปิด Command Palette</div>
                      <div className="flex items-center justify-center gap-2">
                        {['Ctrl', 'Shift', 'P'].map((key, i) => (
                          <React.Fragment key={key}>
                            <div className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono font-bold shadow text-sm border border-slate-600">{key}</div>
                            {i < 2 && <span className="text-slate-500 text-sm">+</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => handleStep(1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 mx-auto">
                      เปิด Command Palette <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {(step === 1 || step === 2) && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-80 bg-[#252526] border border-slate-600 rounded-lg shadow-2xl z-20 flex flex-col animate-in slide-in-from-top-4">
                    <div className="p-2 border-b border-slate-600 flex items-center gap-2 bg-[#333333] rounded-t-lg">
                      <span className="text-emerald-400 font-mono text-sm">&gt;</span>
                      <input type="text" value={step === 1 ? "Python: Select Interpreter" : ""} placeholder={step === 2 ? "Select Interpreter" : ""} readOnly 
                             className="bg-transparent text-slate-200 text-sm outline-none flex-1 font-mono" />
                    </div>
                    
                    {step === 1 && (
                      <button onClick={() => handleStep(2)} className="p-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-mono text-left transition-colors">
                        Python: Select Interpreter
                      </button>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col py-1">
                        {interpreters.map(interp => (
                          <button key={interp.id} onClick={() => selectInterpreter(interp)}
                            className="p-3 hover:bg-[#2a2d2e] text-left transition-colors flex items-start gap-3 border-b border-slate-700/50 last:border-0 group">
                            <div className="mt-0.5 text-yellow-500">🐍</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-slate-200 font-semibold text-xs flex items-center justify-between">
                                <span className="truncate">{interp.label}</span>
                                {interp.recommended && <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">Recommended</span>}
                              </div>
                              <div className="text-slate-500 text-[10px] font-mono mt-1 truncate">{interp.path}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center space-y-4 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 size={32} className="text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-400">Setup Complete!</h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                      VS Code จะใช้ <span className="text-yellow-400">{interpreters.find(i => i.id === selectedInterpreter)?.label}</span> ในการรันไฟล์ Python
                    </p>
                    <div className="mt-4 p-2 bg-[#2d2d2d] rounded-lg border border-slate-600 inline-flex items-center gap-2 text-xs text-slate-300 font-mono">
                      <span>🐍 3.12.4</span>
                      <span className="text-slate-600">|</span>
                      <span>UTF-8</span>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-slate-50 p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">คำอธิบาย</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-4 flex-1">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-slate-800 text-sm mb-1">Interpreter คืออะไร?</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คือตัวแปลภาษาที่อ่านโค้ด Python แล้วสั่งให้คอมพิวเตอร์ทำงาน ในเครื่องเราอาจมี Python หลายเวอร์ชัน 
                    เราจึงต้องบอก VS Code เสมอว่าจะให้ใช้ตัวไหน
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <h5 className="font-bold text-slate-800 text-sm mb-1">Command Palette</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    กด <b>Ctrl+Shift+P</b> (หรือ Cmd+Shift+P บน Mac) เป็นช่องทางลัดสำหรับเข้าถึงคำสั่งทุกอย่างของ VS Code 
                    พิมพ์ค้นหาคำว่า "Select Interpreter" ได้เลย
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <h5 className="font-bold text-slate-800 text-sm mb-1">สถานะมุมขวาล่าง</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    หลังจากเลือกเสร็จ ที่มุมขวาล่างสุดของหน้าจอ VS Code จะแสดงเวอร์ชันของ Python ที่เลือกไว้ 
                    ถ้ามันขึ้นเป็นสีเหลืองหรือฟ้อง Error แสดงว่ายังไม่ได้เลือก
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

        {/* Bottom VS Code Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Event Log</span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Clear Log
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">⚙️</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap ml-6">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
