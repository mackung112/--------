import React, { useState } from 'react';
import { Monitor, Cpu, Code2, ArrowDown, ChevronRight } from 'lucide-react';

const levels = [
  {
    id: 1,
    name: "ภาษาเครื่อง (Machine Language)",
    desc: "ประกอบด้วยเลขฐานสอง (0 และ 1) เท่านั้น CPU เข้าใจได้ทันทีโดยไม่ต้องแปล แต่มนุษย์อ่านเข้าใจยากมาก",
    example: "10110000 01100001",
    difficulty: "ยากมาก",
    speed: "เร็วที่สุด",
    icon: Cpu,
    color: "from-red-500 to-rose-600",
    lightBg: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  {
    id: 2,
    name: "ภาษาแอสแซมบลี (Assembly Language)",
    desc: "ใช้รหัสช่วยจำ (Mnemonic) เช่น MOV, ADD แทนเลขฐานสอง ต้องใช้ Assembler แปลงเป็นภาษาเครื่อง",
    example: "MOV AL, 61h\nADD AL, 42h",
    difficulty: "ยาก",
    speed: "เร็วมาก",
    icon: Monitor,
    color: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  {
    id: 3,
    name: "ภาษาระดับสูง (High-Level Language)",
    desc: "ออกแบบให้คล้ายภาษาอังกฤษ มนุษย์อ่านเข้าใจง่าย เช่น Python, Java, C++ ต้องใช้ Compiler หรือ Interpreter แปลงเป็นภาษาเครื่อง",
    example: 'print("สวัสดี Python!")\nname = input("ชื่อ: ")',
    difficulty: "ง่าย",
    speed: "ปานกลาง",
    icon: Code2,
    color: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
];

const comparisonData = [
  { aspect: "ความง่ายในการเขียน", machine: 1, assembly: 3, highlevel: 9 },
  { aspect: "ความเร็วในการทำงาน", machine: 10, assembly: 9, highlevel: 7 },
  { aspect: "ความสามารถในการอ่าน", machine: 1, assembly: 4, highlevel: 10 },
  { aspect: "ความยืดหยุ่น (Portability)", machine: 2, assembly: 3, highlevel: 9 },
];

export default function LanguageLevels() {
  const [activeLevel, setActiveLevel] = useState(2); // default = high-level
  const [showComparison, setShowComparison] = useState(false);

  const active = levels.find(l => l.id === activeLevel);

  return (
    <div className="w-full my-12">
      <p className="text-gray-600 text-lg mb-8">
        คลิกเลือกแต่ละระดับเพื่อดูรายละเอียด ตัวอย่างโค้ด และการเปรียบเทียบ:
      </p>

      {/* Level Selector */}
      <div className="flex flex-col items-center gap-3 mb-10">
        {levels.map((level, idx) => {
          const Icon = level.icon;
          const isActive = activeLevel === level.id;
          return (
            <React.Fragment key={level.id}>
              {idx > 0 && (
                <div className="flex flex-col items-center">
                  <ArrowDown className="w-5 h-5 text-gray-300" />
                  <span className="text-xs text-gray-400 font-medium">แปลง</span>
                  <ArrowDown className="w-5 h-5 text-gray-300" />
                </div>
              )}
              <button
                onClick={() => setActiveLevel(level.id)}
                className={`w-full max-w-lg flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isActive 
                    ? `${level.lightBg} ${level.borderColor} shadow-lg scale-[1.02]` 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center text-white shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className={`font-bold ${isActive ? level.textColor : 'text-gray-800'}`}>
                    ระดับ {level.id}: {level.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-0.5">ความยาก: {level.difficulty} | ความเร็ว: {level.speed}</p>
                </div>
                <ChevronRight className={`w-5 h-5 ml-auto transition-transform ${isActive ? `${level.textColor} rotate-90` : 'text-gray-400'}`} />
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail Card */}
      {active && (
        <div className={`${active.lightBg} rounded-2xl p-6 md:p-8 border ${active.borderColor} mb-8`}>
          <h4 className={`text-xl font-bold ${active.textColor} mb-3`}>{active.name}</h4>
          <p className="text-gray-700 mb-6">{active.desc}</p>
          <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-slate-100">
            <div className="text-slate-400 text-xs mb-2">// ตัวอย่างโค้ดระดับนี้:</div>
            <pre className="whitespace-pre-wrap">{active.example}</pre>
          </div>
        </div>
      )}

      {/* Comparison Toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-md mx-auto mb-6"
      >
        {showComparison ? 'ซ่อนตารางเปรียบเทียบ' : 'ดูตารางเปรียบเทียบทั้ง 3 ระดับ'}
      </button>

      {showComparison && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left rounded-tl-xl">ด้าน</th>
                <th className="p-3 text-center text-red-700">ภาษาเครื่อง</th>
                <th className="p-3 text-center text-amber-700">แอสแซมบลี</th>
                <th className="p-3 text-center text-green-700 rounded-tr-xl">ภาษาระดับสูง</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 font-medium text-gray-800">{row.aspect}</td>
                  {[row.machine, row.assembly, row.highlevel].map((val, vi) => (
                    <td key={vi} className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className={`h-3 rounded-full ${vi === 0 ? 'bg-red-400' : vi === 1 ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${val * 10}%` }}></div>
                        <span className="text-xs font-bold text-gray-500">{val}/10</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
