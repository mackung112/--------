import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Type, Hash, ToggleLeft, List, Play, RotateCcw, CheckCircle2, Terminal } from 'lucide-react';

const dataTypes = [
  { name: "str (String)", desc: "ข้อความ ใช้เครื่องหมายคำพูด", icon: Type, color: "text-pink-600 bg-pink-100", examples: ['"สวัสดี"', "'Hello'", '"""multi-line"""'], tryValue: '"สวัสดี Python!"', classPrefix: "str" },
  { name: "int (Integer)", desc: "จำนวนเต็ม ไม่มีจุดทศนิยม", icon: Hash, color: "text-blue-600 bg-blue-100", examples: ["42", "-10", "0", "1000000"], tryValue: "42", classPrefix: "int" },
  { name: "float (Float)", desc: "ทศนิยม มีจุดทศนิยม", icon: Hash, color: "text-cyan-600 bg-cyan-100", examples: ["3.14", "-0.5", "100.0"], tryValue: "3.14", classPrefix: "float" },
  { name: "bool (Boolean)", desc: "ค่าความจริง True/False", icon: ToggleLeft, color: "text-amber-600 bg-amber-100", examples: ["True", "False"], tryValue: "True", classPrefix: "bool" },
  { name: "list (List)", desc: "รายการข้อมูล แก้ไขได้", icon: List, color: "text-purple-600 bg-purple-100", examples: ['[1, 2, 3]', '["a", "b"]', "[]"], tryValue: "[1, 2, 3]", classPrefix: "list" },
];

const codeExperiments = [
  {
    id: 1,
    title: "f-string (การแทรกตัวแปร)",
    code: 'name = "สมชาย"\nage = 18\nprint(f"ชื่อ {name} อายุ {age} ปี")',
    output: "ชื่อ สมชาย อายุ 18 ปี",
    explanation: "f-string ใช้ f หน้าเครื่องหมายคำพูด แล้วใส่ตัวแปรใน {}"
  },
  {
    id: 2,
    title: "การแปลงชนิดข้อมูล (Type Casting)",
    code: 'x = "100"\ny = int(x)  # แปลง string → int\nz = float(x)  # แปลง string → float\nprint(type(y), y)\nprint(type(z), z)',
    output: "<class 'int'> 100\n<class 'float'> 100.0",
    explanation: "ใช้ int(), float(), str() เพื่อแปลงชนิดข้อมูล"
  },
  {
    id: 3,
    title: "Indentation (การย่อหน้า)",
    code: 'if True:\n    print("บรรทัดนี้ย่อหน้า 4 เคาะ")\n    print("บรรทัดนี้ก็ย่อหน้าเท่ากัน")\nprint("บรรทัดนี้ไม่ย่อหน้า")',
    output: 'บรรทัดนี้ย่อหน้า 4 เคาะ\nบรรทัดนี้ก็ย่อหน้าเท่ากัน\nบรรทัดนี้ไม่ย่อหน้า',
    explanation: "Python ใช้ Indentation (4 spaces) แทน {} ในการกำหนดบล็อกโค้ด"
  },
  {
    id: 4,
    title: "การรับค่าจากผู้ใช้ (Input)",
    code: 'name = input("คุณชื่ออะไร? ")\nprint(f"สวัสดีครับ คุณ{name}!")',
    output: "คุณชื่ออะไร? สมชาย\nสวัสดีครับ คุณสมชาย!",
    explanation: "input() จะหยุดรอให้ผู้ใช้พิมพ์ แล้วคืนค่าเป็น string เสมอ"
  },
];




export default function pyUnit3_1_PythonStructure() {
  const [activeType, setActiveType] = useState(0);
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [consoleHistory, setConsoleHistory] = useState([]);
  const [mode, setMode] = useState('type'); // 'type' | 'experiment'
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const runDataTypeExperiment = (typeIndex) => {
    setActiveType(typeIndex);
    setMode('type');
    const dt = dataTypes[typeIndex];
    setConsoleHistory([
      { type: 'command', text: `x = ${dt.tryValue}` },
      { type: 'command', text: `type(x)` },
      { type: 'output', text: `<class '${dt.classPrefix}'>` },
      { type: 'command', text: `print(x)` },
      { type: 'output', text: dt.tryValue.replace(/['"]/g, '') }
    ]);
  };

  const runCodeExperiment = (expIndex) => {
    setActiveExperiment(expIndex);
    setMode('experiment');
    const exp = codeExperiments[expIndex];
    setConsoleHistory([
      { type: 'system', text: `Running: ${exp.title}...` },
      { type: 'code', text: exp.code },
      { type: 'system', text: '--- Output ---' },
      { type: 'output', text: exp.output },
      { type: 'success', text: `✓ ${exp.explanation}` }
    ]);
  };

  const clearConsole = () => {
    setConsoleHistory([]);
    setActiveExperiment(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Terminal size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Python Structure & Data Types</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้โครงสร้างภาษา Python เบื้องต้นและชนิดข้อมูลพื้นฐาน พร้อมทดลองรันคำสั่งจริงใน Terminal แบบจำลอง
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer (Data Types) */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. ชนิดข้อมูลพื้นฐาน (Data Types)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {dataTypes.map((dt, idx) => {
                const Icon = dt.icon;
                const isActive = mode === 'type' && activeType === idx;
                return (
                  <button 
                    key={idx} 
                    onClick={() => runDataTypeExperiment(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all active:scale-95 ${
                      isActive 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${dt.color}`}>
                      <Icon size={16} className="stroke-2" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{dt.name}</div>
                      <div className="text-slate-700 text-xs mt-0.5 leading-relaxed">{dt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {mode === 'type' && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-sm font-bold text-slate-800 mb-2">ตัวอย่างข้อมูล {dataTypes[activeType].name}</div>
                <div className="flex flex-wrap gap-2">
                  {dataTypes[activeType].examples.map((ex, i) => (
                    <div key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-md font-mono text-xs text-slate-700 shadow-sm">
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Control / Gamification (Code Experiments) */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. ทดลองรันโค้ด (Experiments)</h4>
            <div className="flex flex-col gap-3 flex-1">
              {codeExperiments.map((exp, idx) => {
                const isActive = mode === 'experiment' && activeExperiment === idx;
                return (
                  <button 
                    key={exp.id} 
                    onClick={() => runCodeExperiment(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <span>{exp.title}</span>
                    <Play size={16} className={isActive ? "text-white" : "text-blue-500"} />
                  </button>
                );
              })}
            </div>

            {mode === 'experiment' && activeExperiment !== null && (
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 animate-in fade-in zoom-in-95">
                <div className="flex gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    {codeExperiments[activeExperiment].explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          {/* Console Header */}
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python</span>
            </div>
            <button 
              onClick={clearConsole}
              className="text-slate-600 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          
          {/* Console Output Area */}
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.length === 0 ? (
              <div className="text-slate-700 italic">กดเลือกหัวข้อด้านบนเพื่อรันคำสั่ง...</div>
            ) : (
              consoleHistory.map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line.type === 'command' && (
                    <div className="text-slate-600">
                      <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                    </div>
                  )}
                  {line.type === 'output' && (
                    <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>
                  )}
                  {line.type === 'system' && (
                    <div className="text-slate-700 mt-2 mb-1">{line.text}</div>
                  )}
                  {line.type === 'code' && (
                    <div className="text-slate-600 whitespace-pre-wrap pl-4 border-l-2 border-slate-600 my-2">{line.text}</div>
                  )}
                  {line.type === 'success' && (
                    <div className="text-emerald-400 mt-2">{line.text}</div>
                  )}
                </div>
              ))
            )}
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
