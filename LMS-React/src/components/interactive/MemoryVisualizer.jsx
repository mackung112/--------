import { useState } from 'react';
import { ArrowRight, RefreshCw, Eye, } from 'lucide-react';

const scenarios = [
  {
    id: 1,
    title: "Immutable (int) — สร้าง Object ใหม่",
    code: 'a = 10\nb = a\na = 20\nprint("a =", a)  # 20\nprint("b =", b)  # 10',
    steps: [
      { desc: 'สร้าง a = 10', memory: [{ name: 'a', value: 10, addr: '0x100', color: 'bg-blue-100 border-blue-400' }] },
      { desc: 'b = a (b ชี้ที่เดียวกับ a)', memory: [{ name: 'a', value: 10, addr: '0x100', color: 'bg-blue-100 border-blue-400' }, { name: 'b', value: 10, addr: '0x100', color: 'bg-green-100 border-green-400' }] },
      { desc: 'a = 20 (สร้าง Object ใหม่ เพราะ int เป็น Immutable)', memory: [{ name: 'a', value: 20, addr: '0x200', color: 'bg-red-100 border-red-400', isNew: true }, { name: 'b', value: 10, addr: '0x100', color: 'bg-green-100 border-green-400' }] },
    ],
  },
  {
    id: 2,
    title: "Mutable (list) — แก้ไขที่เดิม",
    code: 'list_a = [1, 2, 3]\nlist_b = list_a\nlist_b.append(4)\nprint("list_a =", list_a)  # [1,2,3,4]\nprint("list_b =", list_b)  # [1,2,3,4]',
    steps: [
      { desc: 'สร้าง list_a = [1, 2, 3]', memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400' }] },
      { desc: 'list_b = list_a (ชี้ที่เดียวกัน!)', memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400' }, { name: 'list_b', value: '[1, 2, 3]', addr: '0x300', color: 'bg-orange-100 border-orange-400' }] },
      { desc: 'list_b.append(4) — แก้ไขในที่อยู่เดิม ทั้งคู่เห็นการเปลี่ยนแปลง!', memory: [{ name: 'list_a', value: '[1, 2, 3, 4]', addr: '0x300', color: 'bg-purple-100 border-purple-400', changed: true }, { name: 'list_b', value: '[1, 2, 3, 4]', addr: '0x300', color: 'bg-orange-100 border-orange-400', changed: true }] },
    ],
  },
  {
    id: 3,
    title: "การ Copy List อย่างถูกต้อง",
    code: 'list_a = [1, 2, 3]\nlist_b = list_a.copy()  # สร้างสำเนาใหม่\nlist_b.append(4)\nprint("list_a =", list_a)  # [1,2,3]\nprint("list_b =", list_b)  # [1,2,3,4]',
    steps: [
      { desc: 'สร้าง list_a = [1, 2, 3]', memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400' }] },
      { desc: 'list_b = list_a.copy() (สำเนาใหม่ ที่อยู่ต่างกัน!)', memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400' }, { name: 'list_b', value: '[1, 2, 3]', addr: '0x400', color: 'bg-teal-100 border-teal-400', isNew: true }] },
      { desc: 'list_b.append(4) — แก้เฉพาะ list_b เท่านั้น', memory: [{ name: 'list_a', value: '[1, 2, 3]', addr: '0x300', color: 'bg-purple-100 border-purple-400' }, { name: 'list_b', value: '[1, 2, 3, 4]', addr: '0x400', color: 'bg-teal-100 border-teal-400', changed: true }] },
    ],
  },
];

export default function MemoryVisualizer() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [step, setStep] = useState(0);

  const scenario = scenarios[activeScenario];
  const currentStep = scenario.steps[step];

  return (
    <div className="w-full my-12">
      <p className="text-gray-600 text-lg mb-6">เลือกสถานการณ์ แล้วกดขั้นตอนถัดไปเพื่อดูการเปลี่ยนแปลงในหน่วยความจำ:</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {scenarios.map((s, idx) => (
          <button key={s.id} onClick={() => { setActiveScenario(idx); setStep(0); }}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeScenario === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="bg-slate-900 rounded-2xl p-5 mb-6 border border-slate-700">
        <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap">{scenario.code}</pre>
      </div>

      {/* Memory Visualization */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-gray-900">หน่วยความจำ (Memory) — ขั้นตอนที่ {step + 1}</h4>
        </div>
        <p className="text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-lg text-sm">{currentStep.desc}</p>

        <div className="flex flex-wrap justify-center gap-6">
          {currentStep.memory.map((mem, idx) => (
            <div key={idx} className={`relative p-5 rounded-2xl border-2 ${mem.color} min-w-[160px] transition-all duration-500 ${mem.changed ? 'ring-2 ring-red-400 ring-offset-2' : ''} ${mem.isNew ? 'ring-2 ring-green-400 ring-offset-2' : ''}`}>
              <div className="text-xs font-bold text-gray-400 mb-1">ตัวแปร</div>
              <div className="text-2xl font-extrabold text-gray-900 mb-2">{mem.name}</div>
              <div className="text-xs text-gray-500 mb-1">ค่า:</div>
              <div className="font-mono text-lg font-bold text-gray-800">{mem.value}</div>
              <div className="text-xs text-gray-400 mt-2 font-mono">addr: {mem.addr}</div>
              {mem.changed && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">เปลี่ยน!</div>}
              {mem.isNew && <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">ใหม่!</div>}
            </div>
          ))}
          {currentStep.memory.filter(m => m.addr === currentStep.memory[0]?.addr).length > 1 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:bg-gray-100 disabled:opacity-40 transition-all">
          ← ย้อนกลับ
        </button>
        <button onClick={() => setStep(Math.min(scenario.steps.length - 1, step + 1))} disabled={step >= scenario.steps.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-all shadow-md">
          ขั้นตอนถัดไป <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={() => setStep(0)}
          className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:bg-gray-100 transition-all">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
