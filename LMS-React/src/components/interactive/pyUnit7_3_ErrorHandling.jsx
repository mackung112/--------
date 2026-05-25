import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Bug, ShieldCheck, Play, RotateCcw, FileWarning } from 'lucide-react';

const errorScenarios = [
  {
    id: 1,
    name: "ValueError",
    desc: "เกิดเมื่อใช้ประเภทข้อมูลไม่ถูกต้อง เช่น แปลงข้อความเป็นตัวเลขไม่ได้",
    codeWithout: 'price = int(input("ราคา: "))\nprint(f"ราคาคือ {price} บาท")',
    codeWith: 'try:\n    price = int(input("ราคา: "))\n    print(f"ราคาคือ {price} บาท")\nexcept ValueError:\n    print("❌ ValueError: กรุณากรอกเป็นตัวเลข!")',
    inputs: [
      { label: 'ป้อน "100" (ปกติ)', value: "100", type: 'success', outputSafe: "ราคาคือ 100 บาท", outputCrash: "ราคาคือ 100 บาท" },
      { label: 'ป้อน "abc" (ผิดประเภท)', value: "abc", type: 'error', outputSafe: "❌ ValueError: กรุณากรอกเป็นตัวเลข!", outputCrash: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\nValueError: invalid literal for int() with base 10: 'abc'" },
    ]
  },
  {
    id: 2,
    name: "ZeroDivisionError",
    desc: "เกิดเมื่อนำตัวเลขไปหารด้วยศูนย์",
    codeWithout: 'a = int(input("ตัวตั้ง: "))\nb = int(input("ตัวหาร: "))\nresult = a / b\nprint(f"ผลลัพธ์: {result}")',
    codeWith: 'try:\n    a = int(input("ตัวตั้ง: "))\n    b = int(input("ตัวหาร: "))\n    result = a / b\n    print(f"ผลลัพธ์: {result}")\nexcept ZeroDivisionError:\n    print("❌ ZeroDivisionError: ไม่สามารถหารด้วย 0 ได้!")',
    inputs: [
      { label: 'ป้อน 10 / 2', value: "10/2", type: 'success', outputSafe: "ผลลัพธ์: 5.0", outputCrash: "ผลลัพธ์: 5.0" },
      { label: 'ป้อน 10 / 0', value: "10/0", type: 'error', outputSafe: "❌ ZeroDivisionError: ไม่สามารถหารด้วย 0 ได้!", outputCrash: "Traceback (most recent call last):\n  File \"main.py\", line 3, in <module>\nZeroDivisionError: division by zero" },
    ]
  },
  {
    id: 3,
    name: "IndexError",
    desc: "เกิดเมื่ออ้างอิงตำแหน่ง (Index) ที่ไม่มีอยู่ใน List",
    codeWithout: 'fruits = ["Apple", "Banana", "Orange"]\nidx = int(input("ตำแหน่ง (0-2): "))\nprint(f"ผลไม้: {fruits[idx]}")',
    codeWith: 'fruits = ["Apple", "Banana", "Orange"]\ntry:\n    idx = int(input("ตำแหน่ง (0-2): "))\n    print(f"ผลไม้: {fruits[idx]}")\nexcept IndexError:\n    print("❌ IndexError: ตำแหน่งเกินขอบเขตที่มีอยู่!")',
    inputs: [
      { label: 'ป้อน 1 (กล้วย)', value: "1", type: 'success', outputSafe: "ผลไม้: Banana", outputCrash: "ผลไม้: Banana" },
      { label: 'ป้อน 5 (ไม่มี)', value: "5", type: 'error', outputSafe: "❌ IndexError: ตำแหน่งเกินขอบเขตที่มีอยู่!", outputCrash: "Traceback (most recent call last):\n  File \"main.py\", line 3, in <module>\nIndexError: list index out of range" },
    ]
  }
];




export default function pyUnit7_3_ErrorHandling() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [useTryExcept, setUseTryExcept] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Error Handling Simulator Ready.' }
  ]);
  const consoleRef = useRef(null);

  const s = errorScenarios[activeScenario];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const changeScenario = (idx) => {
    setActiveScenario(idx);
    setUseTryExcept(false);
    setConsoleHistory([
      { type: 'system', text: `Loaded Scenario: ${errorScenarios[idx].name}` }
    ]);
  };

  const toggleSafety = (safe) => {
    setUseTryExcept(safe);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: safe ? '🛡️ Enabled: Try-Except Block' : '⚠️ Disabled: Try-Except Block' }
    ]);
  };

  const runTest = (inp) => {
    const isError = inp.type === 'error';
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `# ทดสอบป้อนค่า: ${inp.label}` },
    ]);

    setTimeout(() => {
      if (!useTryExcept && isError) {
        setConsoleHistory(prev => [
          ...prev,
          { type: 'error', text: inp.outputCrash },
          { type: 'system', text: '💥 โปรแกรมล่ม (Crashed)! ต้องหยุดทำงานทันที' }
        ]);
      } else {
        setConsoleHistory(prev => [
          ...prev,
          { type: 'output', text: inp.outputSafe },
          ...(isError ? [{ type: 'system', text: '🛡️ จัดการ Error สำเร็จ โปรแกรมไม่ล่มและทำงานต่อไปได้' }] : [])
        ]);
      }
    }, 300);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'Error Handling Simulator Ready.' }]);

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
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <ShieldAlert size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">จัดการข้อผิดพลาด (Error Handling)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้ <code className="bg-slate-200 px-1 rounded text-pink-600">try-except</code> เพื่อดักจับ Error ป้องกันไม่ให้โปรแกรมล่มเมื่อเกิดข้อผิดพลาด
        </p>
      </div>

      <div className="flex flex-col min-h-[550px]">
        {/* Top Control Bar */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {errorScenarios.map((scen, idx) => (
              <button key={scen.id} onClick={() => changeScenario(idx)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  activeScenario === idx 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                <FileWarning size={14} /> {scen.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Code & Interaction */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 text-lg mb-1">{s.name}</h4>
              <p className="text-slate-600 text-sm mb-4">{s.desc}</p>

              <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                <button onClick={() => toggleSafety(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    !useTryExcept ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}>
                  <Bug size={16} /> ไม่มี try-except (เสี่ยงพัง)
                </button>
                <button onClick={() => toggleSafety(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    useTryExcept ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}>
                  <ShieldCheck size={16} /> ใส่ try-except (ปลอดภัย)
                </button>
              </div>

              <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-100 overflow-x-auto min-h-[160px] border border-slate-700">
                <pre dangerouslySetInnerHTML={{
                  __html: (useTryExcept ? s.codeWith : s.codeWithout)
                    .replace(/try:/g, '<span class="text-pink-400 font-bold">try:</span>')
                    .replace(/except (.*):/g, '<span class="text-pink-400 font-bold">except</span> <span class="text-yellow-300">$1</span>:')
                    .replace(/print/g, '<span class="text-cyan-400">print</span>')
                }} />
              </div>
            </div>

            <div>
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3">จำลองการป้อนข้อมูล</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.inputs.map((inp, idx) => (
                  <button key={idx} onClick={() => runTest(inp)}
                    className={`border p-4 rounded-xl text-left transition-all active:scale-95 group ${
                      inp.type === 'error' 
                        ? 'border-rose-200 bg-rose-50 hover:bg-rose-100' 
                        : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                    }`}>
                    <div className={`font-bold mb-1 ${inp.type === 'error' ? 'text-rose-800' : 'text-emerald-800'}`}>
                      {inp.label}
                    </div>
                    <div className={`text-xs flex items-center gap-1 ${inp.type === 'error' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      <Play size={12} className="fill-current" /> กดรันเพื่อทดสอบ
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โครงสร้าง Try-Except</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-2 items-start">
                  <div className="bg-slate-100 text-slate-700 font-mono font-bold px-1.5 py-0.5 rounded text-xs mt-0.5">try:</div>
                  <p className="text-xs leading-relaxed">บล็อกโค้ดปกติที่<strong className="text-rose-600">อาจเกิด Error</strong></p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="bg-slate-100 text-slate-700 font-mono font-bold px-1.5 py-0.5 rounded text-xs mt-0.5">except:</div>
                  <p className="text-xs leading-relaxed">ถ้าเกิด Error ขึ้น จะ<strong className="text-emerald-600">กระโดดมาทำคำสั่งในนี้ทันที</strong> แทนที่โปรแกรมจะพัง (Crash)</p>
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-2">ทำไมต้องระบุชื่อ Error?</p>
                <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg leading-relaxed border border-amber-200">
                  <span className="font-mono bg-white px-1 rounded">except ValueError:</span><br/>
                  การเจาะจงชื่อ Error ทำให้เรารู้ได้แน่ชัดว่าเกิดอะไรขึ้น และสามารถจัดการแต่ละปัญหาด้วยวิธีที่ต่างกันได้
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
              <span className="text-slate-700 text-xs">python main.py</span>
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
                {line.type === 'error'   && <div className="text-rose-400 whitespace-pre-wrap">{line.text}</div>}
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
