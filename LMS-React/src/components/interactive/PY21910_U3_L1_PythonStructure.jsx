import { useState } from 'react';
import { Type, Hash, ToggleLeft, List, Play, RotateCcw, CheckCircle2, } from 'lucide-react';

const dataTypes = [
  { name: "str (String)", desc: "ข้อความ ใช้เครื่องหมายคำพูด", icon: Type, color: "bg-pink-500", examples: ['"สวัสดี"', "'Hello'", '"""multi-line"""'], tryValue: '"สวัสดี Python!"' },
  { name: "int (Integer)", desc: "จำนวนเต็ม ไม่มีจุดทศนิยม", icon: Hash, color: "bg-blue-500", examples: ["42", "-10", "0", "1000000"], tryValue: "42" },
  { name: "float (Float)", desc: "ทศนิยม มีจุดทศนิยม", icon: Hash, color: "bg-cyan-500", examples: ["3.14", "-0.5", "100.0"], tryValue: "3.14" },
  { name: "bool (Boolean)", desc: "ค่าความจริง True/False", icon: ToggleLeft, color: "bg-amber-500", examples: ["True", "False"], tryValue: "True" },
  { name: "list (List)", desc: "รายการข้อมูล แก้ไขได้", icon: List, color: "bg-purple-500", examples: ['[1, 2, 3]', '["a", "b"]', "[]"], tryValue: "[1, 2, 3]" },
];

// Interactive Python variable explorer
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

export default function PY21910_U3_L1_PythonStructure() {
  const [activeType, setActiveType] = useState(0);
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [tab, setTab] = useState("types"); // "types" | "experiments"

  return (
    <div className="w-full my-12">
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setTab("types")} className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${tab === "types" ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
          ชนิดข้อมูล Python
        </button>
        <button onClick={() => setTab("experiments")} className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${tab === "experiments" ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
          ทดลองโค้ด
        </button>
      </div>

      {tab === "types" && (
        <div>
          <p className="text-gray-600 mb-6">คลิกเลือกชนิดข้อมูลเพื่อดูตัวอย่างการใช้งานจริง:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {dataTypes.map((dt, idx) => {
              const Icon = dt.icon;
              return (
                <button key={idx} onClick={() => setActiveType(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${activeType === idx ? `${dt.color} text-white shadow-md` : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
                  <Icon className="w-4 h-4" /> {dt.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 text-lg mb-2">{dataTypes[activeType].name}</h4>
              <p className="text-gray-600 mb-4">{dataTypes[activeType].desc}</p>
              <div className="space-y-2">
                {dataTypes[activeType].examples.map((ex, i) => (
                  <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg font-mono text-sm text-gray-800">{ex}</div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="text-green-400 text-xs font-bold mb-3">{">>>"} ลองใน Python Shell</div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-slate-300">
                  <span className="text-green-400">{">>> "}</span>x = {dataTypes[activeType].tryValue}
                </div>
                <div className="text-slate-300">
                  <span className="text-green-400">{">>> "}</span>type(x)
                </div>
                <div className="text-amber-300">
                  {"<class '"}{dataTypes[activeType].name.split(" ")[0]}{"'>"}
                </div>
                <div className="text-slate-300">
                  <span className="text-green-400">{">>> "}</span>print(x)
                </div>
                <div className="text-cyan-300">{dataTypes[activeType].tryValue.replace(/['"]/g, '')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "experiments" && (
        <div>
          <p className="text-gray-600 mb-6">เลือกตัวอย่าง แล้วกด "รัน" เพื่อดูผลลัพธ์:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {codeExperiments.map((exp, idx) => (
              <button key={exp.id} onClick={() => { setActiveExperiment(idx); setShowOutput(false); }}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeExperiment === idx ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {exp.title}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-xs font-bold">📄 {codeExperiments[activeExperiment].title}</span>
              <div className="flex gap-2">
                <button onClick={() => setShowOutput(true)}
                  className="flex items-center gap-1 px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
                  <Play className="w-3 h-3" /> รัน
                </button>
                <button onClick={() => setShowOutput(false)}
                  className="flex items-center gap-1 px-4 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-600 transition-colors">
                  <RotateCcw className="w-3 h-3" /> ล้าง
                </button>
              </div>
            </div>
            <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap">{codeExperiments[activeExperiment].code}</pre>
            
            {showOutput && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-green-400 text-xs font-bold mb-2">OUTPUT:</div>
                <pre className="font-mono text-sm text-cyan-300 whitespace-pre-wrap">{codeExperiments[activeExperiment].output}</pre>
              </div>
            )}
          </div>

          {showOutput && (
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              <p className="text-indigo-800 text-sm font-medium">{codeExperiments[activeExperiment].explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
