import React, { useState } from 'react';
import { Play, RotateCcw, Calculator, Repeat, GitBranch, ChevronRight } from 'lucide-react';

// ===== Operator Calculator =====
const operators = [
  { symbol: "+", name: "บวก", fn: (a, b) => a + b },
  { symbol: "-", name: "ลบ", fn: (a, b) => a - b },
  { symbol: "*", name: "คูณ", fn: (a, b) => a * b },
  { symbol: "/", name: "หาร", fn: (a, b) => b !== 0 ? a / b : "Error: หารด้วย 0 ไม่ได้!" },
  { symbol: "//", name: "หารปัดเศษ", fn: (a, b) => b !== 0 ? Math.floor(a / b) : "Error" },
  { symbol: "%", name: "หารเอาเศษ", fn: (a, b) => b !== 0 ? a % b : "Error" },
  { symbol: "**", name: "ยกกำลัง", fn: (a, b) => Math.pow(a, b) },
];

// ===== Loop Visualizer Data =====
const loopExamples = [
  {
    id: "for-range",
    title: "For Loop + range()",
    code: "for i in range(1, 6):\n    print(f'รอบที่ {i}')",
    steps: Array.from({ length: 5 }, (_, i) => ({ iteration: i + 1, variable: `i = ${i + 1}`, output: `รอบที่ ${i + 1}` })),
  },
  {
    id: "for-list",
    title: "For Loop + List",
    code: 'fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม"]\nfor fruit in fruits:\n    print(f"ผลไม้: {fruit}")',
    steps: [
      { iteration: 1, variable: 'fruit = "แอปเปิ้ล"', output: "ผลไม้: แอปเปิ้ล" },
      { iteration: 2, variable: 'fruit = "กล้วย"', output: "ผลไม้: กล้วย" },
      { iteration: 3, variable: 'fruit = "ส้ม"', output: "ผลไม้: ส้ม" },
    ],
  },
  {
    id: "while",
    title: "While Loop",
    code: "count = 3\nwhile count > 0:\n    print(f'นับถอยหลัง: {count}')\n    count -= 1\nprint('ปล่อยจรวด!')",
    steps: [
      { iteration: 1, variable: "count = 3", output: "นับถอยหลัง: 3" },
      { iteration: 2, variable: "count = 2", output: "นับถอยหลัง: 2" },
      { iteration: 3, variable: "count = 1", output: "นับถอยหลัง: 1" },
      { iteration: 4, variable: "count = 0", output: "ปล่อยจรวด! 🚀" },
    ],
  },
];

// ===== If-Else Simulator =====
const conditions = [
  { label: "temp > 30", desc: 'อากาศร้อน 🔥' },
  { label: "temp > 20", desc: 'อากาศกำลังดี 🌤️' },
  { label: "else", desc: 'อากาศหนาว ❄️' },
];

export default function ControlFlow() {
  const [tab, setTab] = useState("operators");

  // Operator state
  const [numA, setNumA] = useState(10);
  const [numB, setNumB] = useState(3);

  // Loop state
  const [activeLoop, setActiveLoop] = useState(0);
  const [loopStep, setLoopStep] = useState(-1);
  const [isLoopPlaying, setIsLoopPlaying] = useState(false);

  // If-Else state
  const [tempValue, setTempValue] = useState(25);

  const getConditionResult = (temp) => {
    if (temp > 30) return 0;
    if (temp > 20) return 1;
    return 2;
  };

  const playLoop = () => {
    setLoopStep(-1);
    setIsLoopPlaying(true);
    const steps = loopExamples[activeLoop].steps;
    let current = 0;
    const interval = setInterval(() => {
      setLoopStep(current);
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setIsLoopPlaying(false);
      }
    }, 1000);
  };

  const tabs = [
    { id: "operators", label: "ตัวดำเนินการ", icon: Calculator },
    { id: "condition", label: "เงื่อนไข If-Else", icon: GitBranch },
    { id: "loops", label: "การวนซ้ำ Loop", icon: Repeat },
  ];

  return (
    <div className="w-full my-12">
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${tab === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB: Operators */}
      {tab === "operators" && (
        <div>
          <p className="text-gray-600 mb-6">ใส่ตัวเลข 2 ค่า แล้วดูผลลัพธ์ของ Operator แต่ละตัว:</p>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <label className="text-sm font-bold text-gray-500 block mb-1">ค่า A</label>
              <input type="number" value={numA} onChange={e => setNumA(Number(e.target.value))} className="w-24 px-4 py-3 rounded-xl border border-gray-200 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <span className="text-2xl font-bold text-gray-400 mt-5">?</span>
            <div>
              <label className="text-sm font-bold text-gray-500 block mb-1">ค่า B</label>
              <input type="number" value={numB} onChange={e => setNumB(Number(e.target.value))} className="w-24 px-4 py-3 rounded-xl border border-gray-200 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {operators.map((op, idx) => {
              const result = op.fn(numA, numB);
              return (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-500">{op.name}</span>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-xs font-bold">{op.symbol}</span>
                  </div>
                  <div className="font-mono text-sm text-gray-700">{numA} {op.symbol} {numB} = <span className="font-bold text-indigo-600 text-lg">{typeof result === 'number' ? (Number.isInteger(result) ? result : result.toFixed(4)) : result}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: If-Else */}
      {tab === "condition" && (
        <div>
          <p className="text-gray-600 mb-6">ลากสไลเดอร์เปลี่ยนค่าอุณหภูมิ แล้วดูว่า Python จะเลือกเข้าเงื่อนไขไหน:</p>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gray-900 mb-2">{tempValue}°C</div>
            <input type="range" min={-10} max={50} value={tempValue} onChange={e => setTempValue(Number(e.target.value))}
              className="w-full max-w-md accent-indigo-600" />
            <div className="flex justify-between text-xs text-gray-400 max-w-md mx-auto mt-1">
              <span>-10°C</span><span>20°C</span><span>30°C</span><span>50°C</span>
            </div>
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            {conditions.map((cond, idx) => {
              const isMatch = getConditionResult(tempValue) === idx;
              return (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${isMatch ? 'bg-green-50 border-green-500 shadow-md scale-[1.02]' : 'bg-white border-gray-200 opacity-50'}`}>
                  <div className={`w-3 h-3 rounded-full ${isMatch ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="font-mono text-sm flex-1">
                    <span className="text-purple-600 font-bold">{idx === 0 ? 'if' : idx < conditions.length - 1 ? 'elif' : 'else'}</span>
                    {cond.label !== "else" && <span className="text-gray-700"> {cond.label}:</span>}
                    {cond.label === "else" && <span className="text-gray-700">:</span>}
                  </div>
                  <span className={`font-bold text-lg ${isMatch ? 'text-green-700' : 'text-gray-400'}`}>{cond.desc}</span>
                  {isMatch && <ChevronRight className="w-5 h-5 text-green-600" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Loops */}
      {tab === "loops" && (
        <div>
          <p className="text-gray-600 mb-6">เลือกประเภท Loop แล้วกดเล่นเพื่อดูการทำงานทีละรอบ:</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {loopExamples.map((ex, idx) => (
              <button key={ex.id} onClick={() => { setActiveLoop(idx); setLoopStep(-1); }}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeLoop === idx ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {ex.title}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mb-6">
            <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap">{loopExamples[activeLoop].code}</pre>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            <button onClick={playLoop} disabled={isLoopPlaying}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors shadow-md">
              <Play className="w-5 h-5" /> เล่นจำลอง Loop
            </button>
            <button onClick={() => setLoopStep(-1)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors">
              <RotateCcw className="w-5 h-5" /> รีเซ็ต
            </button>
          </div>

          <div className="space-y-2">
            {loopExamples[activeLoop].steps.map((step, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                idx <= loopStep
                  ? 'bg-purple-50 border-purple-400 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-40'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${idx <= loopStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step.iteration}
                </div>
                <div className="flex-1">
                  <span className="font-mono text-sm text-purple-700">{step.variable}</span>
                </div>
                <div className={`font-mono text-sm transition-opacity ${idx <= loopStep ? 'text-gray-800 opacity-100' : 'opacity-0'}`}>
                  → {step.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
