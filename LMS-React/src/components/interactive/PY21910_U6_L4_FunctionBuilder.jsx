import { useState } from 'react';
import { Play, ArrowRight, Box, Zap } from 'lucide-react';

const presetFunctions = [
  {
    id: 1,
    name: "คำนวณพื้นที่สี่เหลี่ยม",
    params: [{ name: "width", type: "number", default: 5 }, { name: "height", type: "number", default: 10 }],
    body: "    area = width * height\n    return area",
    template: (args) => `def calculate_area(width, height):\n    area = width * height\n    return area\n\nresult = calculate_area(${args[0]}, ${args[1]})\nprint(f"พื้นที่ = {result} ตร.หน่วย")`,
    compute: (args) => ({ result: args[0] * args[1], output: `พื้นที่ = ${args[0] * args[1]} ตร.หน่วย` }),
  },
  {
    id: 2,
    name: "ทักทาย (Default Parameter)",
    params: [{ name: "name", type: "text", default: "สมชาย" }, { name: "greeting", type: "text", default: "สวัสดี" }],
    body: '    return f"{greeting}, {name}!"',
    template: (args) => `def greet(name, greeting="สวัสดี"):\n    return f"{greeting}, {name}!"\n\nmessage = greet("${args[0]}", "${args[1]}")\nprint(message)`,
    compute: (args) => ({ result: `${args[1]}, ${args[0]}!`, output: `${args[1]}, ${args[0]}!` }),
  },
  {
    id: 3,
    name: "คำนวณเกรด",
    params: [{ name: "score", type: "number", default: 75 }],
    body: '    if score >= 80:\n        return "A"\n    elif score >= 70:\n        return "B"\n    elif score >= 60:\n        return "C"\n    else:\n        return "F"',
    template: (args) => `def get_grade(score):\n    if score >= 80:\n        return "A"\n    elif score >= 70:\n        return "B"\n    elif score >= 60:\n        return "C"\n    else:\n        return "F"\n\ngrade = get_grade(${args[0]})\nprint(f"คะแนน {${args[0]}} ได้เกรด {grade}")`,
    compute: (args) => {
      const s = Number(args[0]);
      const g = s >= 80 ? 'A' : s >= 70 ? 'B' : s >= 60 ? 'C' : 'F';
      return { result: g, output: `คะแนน ${s} ได้เกรด ${g}` };
    },
  },
  {
    id: 4,
    name: "หาค่ามากสุดจาก List",
    params: [{ name: "numbers", type: "text", default: "10, 45, 23, 67, 12" }],
    body: '    max_val = numbers[0]\n    for num in numbers:\n        if num > max_val:\n            max_val = num\n    return max_val',
    template: (args) => `def find_max(numbers):\n    max_val = numbers[0]\n    for num in numbers:\n        if num > max_val:\n            max_val = num\n    return max_val\n\ndata = [${args[0]}]\nresult = find_max(data)\nprint(f"ค่ามากสุดคือ: {result}")`,
    compute: (args) => {
      const nums = args[0].split(',').map(Number);
      const max = Math.max(...nums);
      return { result: max, output: `ค่ามากสุดคือ: ${max}` };
    },
  },
];

export default function PY21910_U6_L4_FunctionBuilder() {
  const [activeFunc, setActiveFunc] = useState(0);
  const [paramValues, setParamValues] = useState(presetFunctions[0].params.map(p => String(p.default)));
  const [showResult, setShowResult] = useState(false);

  const func = presetFunctions[activeFunc];

  const changeFunc = (idx) => {
    setActiveFunc(idx);
    setParamValues(presetFunctions[idx].params.map(p => String(p.default)));
    setShowResult(false);
  };

  const updateParam = (idx, val) => {
    const newParams = [...paramValues];
    newParams[idx] = val;
    setParamValues(newParams);
    setShowResult(false);
  };

  const runFunction = () => setShowResult(true);
  const result = showResult ? func.compute(paramValues) : null;

  return (
    <div className="w-full my-12">
      <p className="text-gray-600 text-lg mb-6">เลือกฟังก์ชัน ปรับค่า Parameter แล้วกดรันเพื่อดูผลลัพธ์:</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {presetFunctions.map((f, idx) => (
          <button key={f.id} onClick={() => changeFunc(idx)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeFunc === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {f.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Box className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-gray-900">INPUT (Parameters)</h4>
          </div>
          <div className="space-y-4">
            {func.params.map((param, idx) => (
              <div key={idx}>
                <label className="text-sm font-bold text-gray-500 mb-1 block">{param.name}</label>
                <input
                  type={param.type === "number" ? "number" : "text"}
                  value={paramValues[idx]}
                  onChange={e => updateParam(idx, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button onClick={runFunction}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md mt-4">
              <Play className="w-5 h-5" /> รันฟังก์ชัน
            </button>
          </div>
        </div>

        {/* Code Panel */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-xs font-bold">PROCESS (โค้ดฟังก์ชัน)</span>
          </div>
          <pre className="font-mono text-sm text-slate-100 whitespace-pre-wrap">{func.template(paramValues)}</pre>
        </div>

        {/* Output Panel */}
        <div className={`rounded-2xl p-6 border shadow-sm transition-all duration-500 ${showResult ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-gray-900">OUTPUT (ผลลัพธ์)</h4>
          </div>
          {showResult ? (
            <div>
              <div className="bg-white rounded-xl p-4 border border-green-200 font-mono text-lg text-green-800 font-bold text-center mb-3">
                {result.output}
              </div>
              <div className="text-sm text-gray-600 text-center">
                return → <span className="font-bold text-indigo-600">{JSON.stringify(result.result)}</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">กดปุ่ม "รันฟังก์ชัน" เพื่อดูผลลัพธ์</div>
          )}
        </div>
      </div>
    </div>
  );
}
