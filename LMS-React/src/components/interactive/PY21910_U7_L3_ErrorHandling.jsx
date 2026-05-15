import { useState } from 'react';
import { AlertTriangle, ShieldCheck, Bug, CheckCircle2 } from 'lucide-react';

const errorScenarios = [
  {
    id: 1,
    title: "ValueError — ป้อนตัวอักษรแทนตัวเลข",
    codeWithout: 'price = int(input("ราคา: "))\nprint(f"ราคาคือ {price} บาท")',
    codeWith: 'try:\n    price = int(input("ราคา: "))\n    print(f"ราคาคือ {price} บาท")\nexcept ValueError:\n    print("❌ กรุณากรอกเป็นตัวเลข!")',
    inputs: [
      { label: 'ป้อน "100"', value: "100", willCrash: false, output: "ราคาคือ 100 บาท", outputSafe: "ราคาคือ 100 บาท" },
      { label: 'ป้อน "abc"', value: "abc", willCrash: true, output: "💥 ValueError: invalid literal for int()", outputSafe: "❌ กรุณากรอกเป็นตัวเลข!" },
      { label: 'ป้อน ""', value: "", willCrash: true, output: "💥 ValueError: invalid literal for int()", outputSafe: "❌ กรุณากรอกเป็นตัวเลข!" },
    ]
  },
  {
    id: 2,
    title: "ZeroDivisionError — หารด้วยศูนย์",
    codeWithout: 'a = int(input("ตัวตั้ง: "))\nb = int(input("ตัวหาร: "))\nresult = a / b\nprint(f"ผลลัพธ์: {result}")',
    codeWith: 'try:\n    a = int(input("ตัวตั้ง: "))\n    b = int(input("ตัวหาร: "))\n    result = a / b\n    print(f"ผลลัพธ์: {result}")\nexcept ZeroDivisionError:\n    print("❌ ไม่สามารถหารด้วย 0 ได้!")\nexcept ValueError:\n    print("❌ กรุณากรอกตัวเลข!")',
    inputs: [
      { label: 'ป้อน 10 / 3', value: "10/3", willCrash: false, output: "ผลลัพธ์: 3.333...", outputSafe: "ผลลัพธ์: 3.333..." },
      { label: 'ป้อน 10 / 0', value: "10/0", willCrash: true, output: "💥 ZeroDivisionError: division by zero", outputSafe: "❌ ไม่สามารถหารด้วย 0 ได้!" },
    ]
  },
  {
    id: 3,
    title: "IndexError — เข้าถึงสมาชิกเกินขอบเขต",
    codeWithout: 'fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม"]\nidx = int(input("ตำแหน่ง (0-2): "))\nprint(f"ผลไม้: {fruits[idx]}")',
    codeWith: 'fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม"]\ntry:\n    idx = int(input("ตำแหน่ง (0-2): "))\n    print(f"ผลไม้: {fruits[idx]}")\nexcept IndexError:\n    print("❌ ตำแหน่งเกินขอบเขต!")\nexcept ValueError:\n    print("❌ กรุณากรอกตัวเลข!")',
    inputs: [
      { label: 'ป้อน 1', value: "1", willCrash: false, output: "ผลไม้: กล้วย", outputSafe: "ผลไม้: กล้วย" },
      { label: 'ป้อน 5', value: "5", willCrash: true, output: "💥 IndexError: list index out of range", outputSafe: "❌ ตำแหน่งเกินขอบเขต!" },
    ]
  },
];

export default function PY21910_U7_L3_ErrorHandling() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeInput, setActiveInput] = useState(null);
  const [useTryExcept, setUseTryExcept] = useState(false);

  const scenario = errorScenarios[activeScenario];

  return (
    <div className="w-full my-12">
      <p className="text-gray-600 text-lg mb-6">เลือกสถานการณ์ข้อผิดพลาด แล้วลองสลับระหว่าง "ไม่มี Try-Except" กับ "มี Try-Except" เพื่อดูความแตกต่าง:</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {errorScenarios.map((s, idx) => (
          <button key={s.id} onClick={() => { setActiveScenario(idx); setActiveInput(null); }}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeScenario === idx ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {s.title.split(' — ')[0]}
          </button>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-4 mb-6 bg-gray-100 rounded-xl p-4">
        <button onClick={() => { setUseTryExcept(false); setActiveInput(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${!useTryExcept ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-600'}`}>
          <Bug className="w-4 h-4" /> ไม่มี Try-Except
        </button>
        <button onClick={() => { setUseTryExcept(true); setActiveInput(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${useTryExcept ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600'}`}>
          <ShieldCheck className="w-4 h-4" /> มี Try-Except
        </button>
      </div>

      {/* Code Display */}
      

      {/* Input Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="text-sm font-bold text-gray-500 self-center">ลองป้อนค่า:</span>
        {scenario.inputs.map((inp, idx) => (
          <button key={idx} onClick={() => setActiveInput(idx)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all border-2 ${
              activeInput === idx
                ? (inp.willCrash && !useTryExcept ? 'bg-red-50 border-red-400 text-red-700' : 'bg-green-50 border-green-400 text-green-700')
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}>
            {inp.label}
          </button>
        ))}
      </div>

      {/* Result */}
      {activeInput !== null && (
        <div className={`rounded-2xl p-6 border-2 transition-all duration-500 ${
          scenario.inputs[activeInput].willCrash && !useTryExcept
            ? 'bg-red-50 border-red-300'
            : 'bg-green-50 border-green-300'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {scenario.inputs[activeInput].willCrash && !useTryExcept ? (
              <><AlertTriangle className="w-6 h-6 text-red-600" /><span className="font-bold text-red-800 text-lg">โปรแกรมล่ม! 💥</span></>
            ) : (
              <><CheckCircle2 className="w-6 h-6 text-green-600" /><span className="font-bold text-green-800 text-lg">โปรแกรมทำงานปกติ ✅</span></>
            )}
          </div>
          <div className="font-mono text-sm bg-white rounded-xl p-4 border border-gray-200">
            {useTryExcept ? scenario.inputs[activeInput].outputSafe : scenario.inputs[activeInput].output}
          </div>
        </div>
      )}
    
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
        <div className="flex items-center gap-2 mb-3">
          {useTryExcept ? <ShieldCheck className="w-4 h-4 text-green-400" /> : <Bug className="w-4 h-4 text-red-400" />}
          <span className="text-slate-400 text-xs font-bold">{useTryExcept ? '✅ มี Error Handling' : '⚠️ ไม่มี Error Handling'}</span>
        </div>
        <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap">{useTryExcept ? scenario.codeWith : scenario.codeWithout}</pre>
      </div>
    </div>
  );
}
