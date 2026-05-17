import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, ArrowRight, RefreshCw, Play, CheckCircle2 } from 'lucide-react';

const scenarios = [
  {
    id: 1,
    title: "Immutable (int) — สร้าง Object ใหม่",
    code: 'a = 10\nb = a\na = 20\nprint("a =", a)\nprint("b =", b)',
    steps: [
      { 
        desc: 'สร้างตัวแปร a ชี้ไปที่ Object ที่มีค่า 10', 
        memory: [{ name: 'a', value: 10, addr: '0x100', color: 'bg-blue-100 border-blue-400 text-blue-900', isNew: true }],
        consoleOutput: [
          { type: 'command', text: '>>> a = 10' }
        ]
      },
      { 
        desc: 'กำหนด b = a ทำให้ b ชี้ไปที่ Object เดียวกับ a', 
        memory: [
          { name: 'a', value: 10, addr: '0x100', color: 'bg-blue-100 border-blue-400 text-blue-900' }, 
          { name: 'b', value: 10, addr: '0x100', color: 'bg-indigo-100 border-indigo-400 text-indigo-900', isNew: true }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> b = a' }
        ]
      },
      { 
        desc: 'เปลี่ยนค่า a = 20 ระบบสร้าง Object ใหม่ขึ้นมา เพราะ int แก้ไขค่าไม่ได้ (Immutable)', 
        memory: [
          { name: 'a', value: 20, addr: '0x200', color: 'bg-rose-100 border-rose-400 text-rose-900', changed: true }, 
          { name: 'b', value: 10, addr: '0x100', color: 'bg-indigo-100 border-indigo-400 text-indigo-900' }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> a = 20' },
          { type: 'command', text: '>>> print("a =", a)' },
          { type: 'output', text: 'a = 20' },
          { type: 'command', text: '>>> print("b =", b)' },
          { type: 'output', text: 'b = 10' }
        ]
      },
    ],
  },
  {
    id: 2,
    title: "Mutable (list) — แก้ไขที่เดิม",
    code: 'list_a = [1, 2, 3]\nlist_b = list_a\nlist_b.append(4)\nprint("list_a =", list_a)\nprint("list_b =", list_b)',
    steps: [
      { 
        desc: 'สร้าง list_a ชี้ไปที่ List Object [1, 2, 3]', 
        memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900', isNew: true }],
        consoleOutput: [
          { type: 'command', text: '>>> list_a = [1, 2, 3]' }
        ]
      },
      { 
        desc: 'กำหนด list_b = list_a ทำให้ทั้งคู่ชี้ไปที่ List Object เดียวกันเป๊ะๆ', 
        memory: [
          { name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900' }, 
          { name: 'list_b', value: '[1, 2, 3]', addr: '0x300', color: 'bg-fuchsia-100 border-fuchsia-400 text-fuchsia-900', isNew: true }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> list_b = list_a' }
        ]
      },
      { 
        desc: 'เพิ่มเลข 4 เข้าไปใน list_b ค่าในตำแหน่งเดิมเปลี่ยน ส่งผลกระทบถึง list_a ด้วย!', 
        memory: [
          { name: 'list_a', value: '[1, 2, 3, 4]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900', changed: true }, 
          { name: 'list_b', value: '[1, 2, 3, 4]', addr: '0x300', color: 'bg-fuchsia-100 border-fuchsia-400 text-fuchsia-900', changed: true }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> list_b.append(4)' },
          { type: 'command', text: '>>> print("list_a =", list_a)' },
          { type: 'output', text: 'list_a = [1, 2, 3, 4]' },
          { type: 'command', text: '>>> print("list_b =", list_b)' },
          { type: 'output', text: 'list_b = [1, 2, 3, 4]' }
        ]
      },
    ],
  },
  {
    id: 3,
    title: "การ Copy List ที่ถูกต้อง (.copy())",
    code: 'list_a = [1, 2, 3]\nlist_b = list_a.copy()\nlist_b.append(4)\nprint("list_a =", list_a)\nprint("list_b =", list_b)',
    steps: [
      { 
        desc: 'สร้าง list_a', 
        memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900' }],
        consoleOutput: [
          { type: 'command', text: '>>> list_a = [1, 2, 3]' }
        ]
      },
      { 
        desc: 'สร้าง list_b โดยการ .copy() ระบบจะสร้าง Object ใหม่ที่มีข้อมูลเหมือนเดิม แต่คนละที่อยู่กัน', 
        memory: [
          { name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900' }, 
          { name: 'list_b', value: '[1, 2, 3]', addr: '0x400', color: 'bg-teal-100 border-teal-400 text-teal-900', isNew: true }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> list_b = list_a.copy()' }
        ]
      },
      { 
        desc: 'เพิ่มเลข 4 ใน list_b คราวนี้ list_a ไม่โดนผลกระทบแล้ว', 
        memory: [
          { name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400 text-purple-900' }, 
          { name: 'list_b', value: '[1, 2, 3, 4]', addr: '0x400', color: 'bg-teal-100 border-teal-400 text-teal-900', changed: true }
        ],
        consoleOutput: [
          { type: 'command', text: '>>> list_b.append(4)' },
          { type: 'command', text: '>>> print("list_a =", list_a)' },
          { type: 'output', text: 'list_a = [1, 2, 3]' },
          { type: 'command', text: '>>> print("list_b =", list_b)' },
          { type: 'output', text: 'list_b = [1, 2, 3, 4]' }
        ]
      },
    ],
  },
];

export default function PY21910_U3_L8_MemoryVisualizer() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [step, setStep] = useState(0);
  const consoleRef = useRef(null);

  const scenario = scenarios[activeScenario];
  const currentStep = scenario.steps[step];

  // Aggregate console output up to the current step
  const getConsoleHistory = () => {
    let history = [{ type: 'system', text: `--- Scenario: ${scenario.title} ---` }];
    for (let i = 0; i <= step; i++) {
      history = [...history, ...scenario.steps[i].consoleOutput];
    }
    return history;
  };

  const consoleHistory = getConsoleHistory();

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory, step, activeScenario]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Cpu size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Memory Visualizer (หน่วยความจำ)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการทำงานของตัวแปรในหน่วยความจำ RAM และทำความเข้าใจความแตกต่างของ Immutable vs Mutable ใน Python
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-6">
              {scenarios.map((s, idx) => (
                <button 
                  key={s.id} 
                  onClick={() => { setActiveScenario(idx); setStep(0); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    activeScenario === idx 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="flex flex-wrap justify-center gap-8 w-full max-w-2xl relative">
                {currentStep.memory.map((mem, idx) => (
                  <div 
                    key={idx} 
                    className={`relative p-5 rounded-2xl border-2 ${mem.color} min-w-[160px] bg-white transition-all duration-500 shadow-sm ${mem.changed ? 'ring-4 ring-rose-300 ring-offset-2 scale-105' : ''} ${mem.isNew ? 'ring-4 ring-emerald-300 ring-offset-2 scale-105' : ''}`}
                  >
                    <div className="text-xs font-bold text-slate-600 mb-1">ตัวแปร</div>
                    <div className="text-2xl font-extrabold text-slate-900 mb-2 font-mono">{mem.name}</div>
                    <div className="text-xs text-slate-700 mb-1">ค่า:</div>
                    <div className="font-mono text-lg font-bold text-slate-800">{mem.value}</div>
                    <div className="text-[11px] text-slate-600 mt-3 font-mono bg-slate-50 p-1 rounded inline-block">addr: {mem.addr}</div>
                    
                    {mem.changed && <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm animate-bounce">Changed!</div>}
                    {mem.isNew && <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm animate-pulse">New!</div>}
                  </div>
                ))}

                {currentStep.memory.filter(m => m.addr === currentStep.memory[0]?.addr).length > 1 && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={14} /> ชี้มาที่เดียวกันเป๊ะ! (Reference เดียวกัน)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">การทำงานปัจจุบัน</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6 flex-1 flex flex-col justify-center">
              <div className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Play size={14} /> Step {step + 1} of {scenario.steps.length}
              </div>
              <p className="text-slate-800 leading-relaxed font-medium">
                {currentStep.desc}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex justify-between gap-2">
                <button 
                  onClick={() => setStep(Math.max(0, step - 1))} 
                  disabled={step === 0}
                  className="flex-1 py-3 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-sm"
                >
                  ย้อนกลับ
                </button>
                <button 
                  onClick={() => setStep(Math.min(scenario.steps.length - 1, step + 1))} 
                  disabled={step >= scenario.steps.length - 1}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-700 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 text-sm"
                >
                  ขั้นตอนถัดไป <ArrowRight size={16} />
                </button>
              </div>
              <button 
                onClick={() => setStep(0)}
                className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
              >
                <RefreshCw size={16} /> เริ่มต้นใหม่
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python memory_test.py</span>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
            </div>
          </div>
          
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-600">
                    <span className="text-green-400 mr-2">{line.text.startsWith('>>>') ? '' : '>>>'}</span>
                    {line.text}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300">{line.text}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-slate-700 mb-2 font-bold">{line.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
