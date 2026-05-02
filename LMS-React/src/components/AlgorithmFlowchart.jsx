import React, { useState, useCallback } from 'react';
import { 
  ArrowDown, ArrowRight, Play, RotateCcw, CheckCircle2,
  Diamond, RectangleHorizontal, Circle, Hexagon,
  Lightbulb, Code2
} from 'lucide-react';

// ===========================
// 1) Flowchart Symbols Guide
// ===========================
const symbols = [
  { 
    name: "Terminal (เริ่ม/จบ)", 
    desc: "ใช้แสดงจุดเริ่มต้นและจุดสิ้นสุดของผังงาน",
    shape: "rounded-full",
    color: "bg-green-100 border-green-400 text-green-800",
    example: "เริ่มต้น / จบ"
  },
  { 
    name: "Process (กระบวนการ)", 
    desc: "ใช้แสดงการประมวลผลหรือการทำงาน เช่น การคำนวณ",
    shape: "rounded-lg",
    color: "bg-blue-100 border-blue-400 text-blue-800",
    example: "total = price * qty"
  },
  { 
    name: "Decision (การตัดสินใจ)", 
    desc: "ใช้แสดงเงื่อนไข ที่ผลลัพธ์จะมีสองทาง (ใช่/ไม่ใช่)",
    shape: "rotate-45 rounded-md",
    color: "bg-amber-100 border-amber-400 text-amber-800",
    example: "score >= 50?"
  },
  { 
    name: "Input/Output (รับ/แสดงผล)", 
    desc: "ใช้แสดงการรับข้อมูลเข้า หรือการแสดงผลลัพธ์ออก",
    shape: "skew-x-[-12deg] rounded-md",
    color: "bg-purple-100 border-purple-400 text-purple-800",
    example: 'input("ชื่อ:")'
  },
];

// ===========================
// 2) Interactive Flowchart Builder (ตรวจผ่าน/ตก)
// ===========================
const flowSteps = [
  { id: 1, type: "terminal", label: "เริ่มต้น", color: "bg-green-500" },
  { id: 2, type: "io", label: "รับค่า score", color: "bg-purple-500" },
  { id: 3, type: "decision", label: "score >= 50 ?", color: "bg-amber-500", yes: 4, no: 5 },
  { id: 4, type: "io", label: 'แสดง "สอบผ่าน"', color: "bg-blue-500" },
  { id: 5, type: "io", label: 'แสดง "สอบตก"', color: "bg-red-500" },
  { id: 6, type: "terminal", label: "จบ", color: "bg-green-500" },
];

// ===========================
// 3) Pseudocode → Python Mapper
// ===========================
const pseudocodeExamples = [
  {
    id: 1,
    title: "ตรวจสอบเกรด",
    pseudo: [
      "เริ่มต้น",
      "รับค่า คะแนน (score)",
      "ถ้า score >= 80 แล้ว",
      "    แสดง \"เกรด A\"",
      "มิฉะนั้น ถ้า score >= 70 แล้ว",
      "    แสดง \"เกรด B\"",
      "มิฉะนั้น ถ้า score >= 60 แล้ว",
      "    แสดง \"เกรด C\"",
      "มิฉะนั้น",
      "    แสดง \"เกรด F\"",
      "จบ"
    ],
    python: [
      "# เริ่มต้น",
      "score = int(input('กรุณาใส่คะแนน: '))",
      "if score >= 80:",
      "    print('เกรด A')",
      "elif score >= 70:",
      "    print('เกรด B')",
      "elif score >= 60:",
      "    print('เกรด C')",
      "else:",
      "    print('เกรด F')",
      "# จบ"
    ]
  },
  {
    id: 2,
    title: "หาค่าเฉลี่ย",
    pseudo: [
      "เริ่มต้น",
      "กำหนด ผลรวม = 0",
      "กำหนด จำนวน = 5",
      "ทำซ้ำ i ตั้งแต่ 1 ถึง จำนวน",
      "    รับค่า ตัวเลข",
      "    ผลรวม = ผลรวม + ตัวเลข",
      "ค่าเฉลี่ย = ผลรวม / จำนวน",
      "แสดง ค่าเฉลี่ย",
      "จบ"
    ],
    python: [
      "# เริ่มต้น",
      "total = 0",
      "count = 5",
      "for i in range(1, count + 1):",
      "    num = float(input(f'ใส่ตัวเลขที่ {i}: '))",
      "    total = total + num",
      "average = total / count",
      "print(f'ค่าเฉลี่ย = {average}')",
      "# จบ"
    ]
  },
  {
    id: 3,
    title: "นับถอยหลัง",
    pseudo: [
      "เริ่มต้น",
      "กำหนด ตัวนับ = 10",
      "ทำซ้ำ ตราบที่ ตัวนับ > 0",
      "    แสดง ตัวนับ",
      "    ตัวนับ = ตัวนับ - 1",
      "แสดง \"ปล่อยจรวด!\"",
      "จบ"
    ],
    python: [
      "# เริ่มต้น",
      "count = 10",
      "while count > 0:",
      "    print(count)",
      "    count = count - 1",
      "print('ปล่อยจรวด!')",
      "# จบ"
    ]
  }
];

export default function AlgorithmFlowchart() {
  const [activeTab, setActiveTab] = useState("symbols");
  const [flowActive, setFlowActive] = useState(0);
  const [isFlowPlaying, setIsFlowPlaying] = useState(false);

  const [selectedExample, setSelectedExample] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);

  // Flowchart animation
  const startFlowAnimation = useCallback(() => {
    setFlowActive(0);
    setIsFlowPlaying(true);
    let step = 0;
    const sequence = [0, 1, 2, 3, 5, 2, 4, 5]; // simulate: start -> input -> decision -> pass -> end -> decision again -> fail -> end
    const interval = setInterval(() => {
      step++;
      if (step >= sequence.length) {
        clearInterval(interval);
        setIsFlowPlaying(false);
        return;
      }
      setFlowActive(sequence[step]);
    }, 1200);
  }, []);

  const resetFlow = () => {
    setFlowActive(0);
    setIsFlowPlaying(false);
  };

  // Pseudocode reveal
  const revealNextLine = () => {
    const maxLines = pseudocodeExamples[selectedExample].python.length;
    if (revealedLines < maxLines) {
      setRevealedLines(prev => prev + 1);
    }
  };

  const resetReveal = () => {
    setRevealedLines(0);
  };

  const changeExample = (idx) => {
    setSelectedExample(idx);
    setRevealedLines(0);
  };

  const tabs = [
    { id: "symbols", label: "สัญลักษณ์ผังงาน", icon: Diamond },
    { id: "flowchart", label: "จำลองผังงาน", icon: Play },
    { id: "pseudocode", label: "Pseudocode → Python", icon: Code2 },
  ];

  return (
    <div className="w-full my-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Flowchart Symbols */}
      {activeTab === "symbols" && (
        <div className="space-y-4">
          <p className="text-gray-600 text-lg mb-6">
            ผังงาน (Flowchart) ใช้สัญลักษณ์มาตรฐานในการแสดงขั้นตอนการทำงานของโปรแกรม สัญลักษณ์หลักๆ มีดังนี้:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {symbols.map((sym, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-16 h-12 ${sym.color} border-2 ${sym.shape} flex items-center justify-center text-xs font-bold shrink-0`}>
                    <span className={sym.shape.includes("rotate") ? "-rotate-45 text-[10px]" : "text-[10px]"}>
                      {sym.example}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{sym.name}</h4>
                    <p className="text-gray-600 text-sm">{sym.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Flowchart */}
      {activeTab === "flowchart" && (
        <div>
          <p className="text-gray-600 text-lg mb-6">
            ลองดูการทำงานของผังงานโปรแกรม "ตรวจสอบผ่าน/ตก" กดปุ่มเล่นเพื่อดูการไหลของข้อมูลแต่ละขั้นตอน:
          </p>
          
          <div className="flex justify-center gap-3 mb-8">
            <button 
              onClick={startFlowAnimation} 
              disabled={isFlowPlaying}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors shadow-md"
            >
              <Play className="w-5 h-5" /> เล่นจำลอง
            </button>
            <button 
              onClick={resetFlow}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> รีเซ็ต
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            {flowSteps.map((step, idx) => {
              const isActive = idx === flowActive;

              if (step.type === "decision") {
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {idx > 0 && <ArrowDown className={`w-6 h-6 mb-2 transition-colors ${isActive ? 'text-amber-500' : 'text-gray-300'}`} />}
                    <div className={`relative w-44 h-44 flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
                      <div className={`absolute inset-0 rotate-45 rounded-xl border-3 transition-all duration-500 ${isActive ? 'bg-amber-100 border-amber-500 shadow-xl shadow-amber-200' : 'bg-white border-gray-300'}`}></div>
                      <span className={`relative z-10 text-sm font-bold text-center transition-colors ${isActive ? 'text-amber-800' : 'text-gray-600'}`}>{step.label}</span>
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold text-green-600">ใช่</span> <ArrowDown className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold text-red-600">ไม่ใช่</span> <ArrowDown className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                    {/* Yes/No branches */}
                    <div className="flex gap-8 mt-2">
                      {[flowSteps[3], flowSteps[4]].map((branch, bi) => {
                        const branchActive = (bi === 0 && flowActive === 3) || (bi === 1 && flowActive === 4);
                        return (
                          <div key={branch.id} className={`px-6 py-3 rounded-lg border-2 text-sm font-bold text-center transition-all duration-500 ${
                            branchActive ? (bi === 0 ? 'bg-blue-100 border-blue-500 text-blue-800 scale-110 shadow-lg' : 'bg-red-100 border-red-500 text-red-800 scale-110 shadow-lg') : 'bg-white border-gray-200 text-gray-500'
                          }`}>
                            {branch.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Skip steps 4,5 - already rendered as branches
              if (step.id === 4 || step.id === 5) return null;

              const shapeClass = step.type === "terminal" ? "rounded-full" : "rounded-lg";

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {idx > 0 && step.id !== 6 && <ArrowDown className={`w-6 h-6 mb-2 transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-300'}`} />}
                  {step.id === 6 && <ArrowDown className={`w-6 h-6 mt-4 mb-2 transition-colors ${isActive ? 'text-green-500' : 'text-gray-300'}`} />}
                  <div className={`px-8 py-4 ${shapeClass} border-2 text-sm font-bold transition-all duration-500 ${
                    isActive ? `${step.color} text-white border-transparent shadow-xl scale-110` : 'bg-white border-gray-200 text-gray-600'
                  }`}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Pseudocode → Python */}
      {activeTab === "pseudocode" && (
        <div>
          <p className="text-gray-600 text-lg mb-6">
            เลือกตัวอย่างด้านล่าง แล้วกดปุ่ม "เปิดเผยทีละบรรทัด" เพื่อดูว่ารหัสเทียม (Pseudocode) ภาษาไทย ถูกแปลงเป็นโค้ด Python ได้อย่างไร:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {pseudocodeExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => changeExample(idx)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  selectedExample === idx
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pseudocode Panel */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-amber-900">รหัสเทียม (Pseudocode)</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                {pseudocodeExamples[selectedExample].pseudo.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
                      idx < revealedLines 
                        ? 'bg-amber-200/50 text-amber-900' 
                        : 'text-amber-700'
                    }`}
                  >
                    <span className="text-amber-400 mr-3 select-none">{idx + 1}.</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Python Panel */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-green-400" />
                <h4 className="font-bold text-green-400">Python Code</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                {pseudocodeExamples[selectedExample].python.map((line, idx) => (
                  <div 
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg transition-all duration-500 ${
                      idx < revealedLines
                        ? 'text-slate-100 bg-slate-800/50'
                        : 'text-transparent select-none'
                    }`}
                  >
                    <span className={`mr-3 select-none ${idx < revealedLines ? 'text-slate-500' : 'text-transparent'}`}>{idx + 1}.</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button 
              onClick={revealNextLine}
              disabled={revealedLines >= pseudocodeExamples[selectedExample].python.length}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors shadow-md"
            >
              <ArrowRight className="w-5 h-5" />
              เปิดเผยทีละบรรทัด ({revealedLines}/{pseudocodeExamples[selectedExample].python.length})
            </button>
            <button 
              onClick={resetReveal}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> รีเซ็ต
            </button>
            {revealedLines >= pseudocodeExamples[selectedExample].python.length && (
              <div className="flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-full font-bold">
                <CheckCircle2 className="w-5 h-5" /> ครบทุกบรรทัดแล้ว!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
