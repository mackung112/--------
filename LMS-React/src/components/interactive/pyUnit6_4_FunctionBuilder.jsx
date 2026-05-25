import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Settings2, RotateCcw, Play, CheckCircle2 } from 'lucide-react';

const presetFunctions = [
  {
    id: 1,
    name: "คำนวณพื้นที่",
    desc: "ฟังก์ชันรับค่าความกว้างและส่วนสูง แล้วคืนค่าพื้นที่",
    params: [{ name: "width", default: "5" }, { name: "height", default: "10" }],
    template: (args) => `def calculate_area(width, height):\n    area = width * height\n    return area\n\nresult = calculate_area(${args[0]}, ${args[1]})\nprint(f"พื้นที่ = {result} ตร.หน่วย")`,
    compute: (args) => {
      const w = Number(args[0]) || 0;
      const h = Number(args[1]) || 0;
      return { val: w * h, out: `พื้นที่ = ${w * h} ตร.หน่วย` };
    },
    cmd: (args) => `calculate_area(${args[0]}, ${args[1]})`
  },
  {
    id: 2,
    name: "ระบบทักทาย",
    desc: "ฟังก์ชันรับชื่อและคำทักทาย โดยมีค่า Default Parameter",
    params: [{ name: "name", default: "สมชาย" }, { name: "greeting", default: "สวัสดี" }],
    template: (args) => `def greet(name, greeting="สวัสดี"):\n    return f"{greeting}, {name}!"\n\nmessage = greet("${args[0]}", "${args[1]}")\nprint(message)`,
    compute: (args) => ({ val: `${args[1]}, ${args[0]}!`, out: `${args[1]}, ${args[0]}!` }),
    cmd: (args) => `greet("${args[0]}", "${args[1]}")`
  },
  {
    id: 3,
    name: "คำนวณเกรด",
    desc: "ฟังก์ชันรับคะแนนและใช้ if-elif คืนค่าเกรด",
    params: [{ name: "score", default: "75" }],
    template: (args) => `def get_grade(score):\n    if score >= 80:\n        return "A"\n    elif score >= 70:\n        return "B"\n    elif score >= 60:\n        return "C"\n    else:\n        return "F"\n\ngrade = get_grade(${args[0]})\nprint(f"ได้เกรด {grade}")`,
    compute: (args) => {
      const s = Number(args[0]) || 0;
      const g = s >= 80 ? 'A' : s >= 70 ? 'B' : s >= 60 ? 'C' : 'F';
      return { val: `'${g}'`, out: `ได้เกรด ${g}` };
    },
    cmd: (args) => `get_grade(${args[0]})`
  }
];




export default function pyUnit6_4_FunctionBuilder() {
  const [activeFunc, setActiveFunc] = useState(0);
  const [paramValues, setParamValues] = useState(presetFunctions[0].params.map(p => p.default));
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Function Builder Ready.' }
  ]);
  const consoleRef = useRef(null);

  const func = presetFunctions[activeFunc];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const changeFunc = (idx) => {
    setActiveFunc(idx);
    setParamValues(presetFunctions[idx].params.map(p => p.default));
    setConsoleHistory([{ type: 'system', text: `Switched to: ${presetFunctions[idx].name}` }]);
  };

  const updateParam = (idx, val) => {
    const newParams = [...paramValues];
    newParams[idx] = val;
    setParamValues(newParams);
  };

  const runFunction = () => {
    const res = func.compute(paramValues);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: func.cmd(paramValues) },
      { type: 'output', text: res.out },
      { type: 'system', text: `# ฟังก์ชัน Return ค่า: ${res.val}` }
    ]);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'Function Builder Ready.' }]);

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
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <Settings2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Function Builder (จำลองการทำงานของฟังก์ชัน)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทดลองปรับค่า Parameter แล้วดูการเปลี่ยนแปลงของโค้ดและผลลัพธ์การทำงานของฟังก์ชันแบบ Real-time
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top Control Bar */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            {presetFunctions.map((f, idx) => (
              <button key={f.id} onClick={() => changeFunc(idx)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeFunc === idx 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Input & Process */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-emerald-800 text-sm mb-1">{func.name}</h4>
              <p className="text-emerald-600 text-xs">{func.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700">1. ปรับค่าตัวแปร (Arguments)</h4>
                {func.params.map((param, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <label className="text-xs font-bold text-slate-600 mb-1 block">{param.name}</label>
                    <input
                      type="text"
                      value={paramValues[idx]}
                      onChange={e => updateParam(idx, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                ))}
                <button onClick={runFunction}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Play size={16} className="fill-current" /> รันฟังก์ชัน
                </button>
              </div>

              <div className="flex flex-col h-full">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3">2. โค้ดที่ทำงานจริง (Process)</h4>
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-100 flex-1 overflow-x-auto">
                  <pre>{func.template(paramValues)}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">สรุปแนวคิดการออกแบบ</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div><strong className="text-slate-800">Reusable</strong><br/>ฟังก์ชันช่วยให้เราไม่ต้องเขียนโค้ดเดิมซ้ำๆ แค่เปลี่ยนค่า Argument ที่ส่งเข้าไป</div>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div><strong className="text-slate-800">Modularity</strong><br/>การแยกโค้ดยาวๆ ออกเป็นฟังก์ชันย่อยๆ ทำให้โปรแกรมอ่านง่ายและแก้บักง่ายขึ้น</div>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div><strong className="text-slate-800">Black Box</strong><br/>คนเรียกใช้ฟังก์ชันไม่จำเป็นต้องรู้ว่าข้างในเขียนยังไง สนใจแค่ "ใส่ค่าอะไรเข้าไป" และ "ได้อะไรกลับมา"</div>
                </li>
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
              <span className="text-slate-700 text-xs">python program.py</span>
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
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
