import { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

const scenarios = [
  {
    title: '🗳️ สิทธิ์เลือกตั้ง',
    variable: 'age', label: 'อายุ', min: 1, max: 60, defaultVal: 20,
    condition: (v) => v >= 18,
    conditionText: 'age >= 18',
    trueResult: 'มีสิทธิ์เลือกตั้ง ✅',
    falseResult: 'ยังไม่มีสิทธิ์เลือกตั้ง ❌',
    pseudo: (v, cond) => [
      { text: 'START', indent: 0, type: 'keyword' },
      { text: `READ age`, indent: 1, type: 'io', active: true },
      { text: `IF age >= 18 THEN`, indent: 1, type: 'condition', active: true },
      { text: `    PRINT "มีสิทธิ์เลือกตั้ง"`, indent: 2, type: 'action', active: cond },
      { text: `ELSE`, indent: 1, type: 'condition' },
      { text: `    PRINT "ยังไม่มีสิทธิ์"`, indent: 2, type: 'action', active: !cond },
      { text: `ENDIF`, indent: 1, type: 'keyword' },
      { text: 'STOP', indent: 0, type: 'keyword' },
    ],
    python: (v, cond) => [
      { text: `age = int(input("อายุ: "))`, active: true },
      { text: `if age >= 18:`, active: true },
      { text: `    print("มีสิทธิ์เลือกตั้ง")`, active: cond },
      { text: `else:`, active: true },
      { text: `    print("ยังไม่มีสิทธิ์")`, active: !cond },
    ],
    explain: 'IF...THEN...ELSE ใช้เมื่อต้องตัดสินใจ 2 ทาง ถ้าเงื่อนไขจริง ทำ THEN ถ้าเท็จ ทำ ELSE และปิดด้วย ENDIF เสมอ'
  },
  {
    title: '🎓 ตัดเกรด',
    variable: 'score', label: 'คะแนน', min: 0, max: 100, defaultVal: 75,
    condition: (v) => v >= 80 ? 'A' : v >= 70 ? 'B' : v >= 60 ? 'C' : 'F',
    conditionText: 'score >= 80/70/60',
    trueResult: '',
    falseResult: '',
    pseudo: (v, grade) => [
      { text: 'START', indent: 0, type: 'keyword' },
      { text: `READ score`, indent: 1, type: 'io', active: true },
      { text: `IF score >= 80 THEN`, indent: 1, type: 'condition', active: grade === 'A' },
      { text: `    PRINT "เกรด A"`, indent: 2, type: 'action', active: grade === 'A' },
      { text: `ELSE IF score >= 70 THEN`, indent: 1, type: 'condition', active: grade === 'B' },
      { text: `    PRINT "เกรด B"`, indent: 2, type: 'action', active: grade === 'B' },
      { text: `ELSE IF score >= 60 THEN`, indent: 1, type: 'condition', active: grade === 'C' },
      { text: `    PRINT "เกรด C"`, indent: 2, type: 'action', active: grade === 'C' },
      { text: `ELSE`, indent: 1, type: 'condition', active: grade === 'F' },
      { text: `    PRINT "เกรด F"`, indent: 2, type: 'action', active: grade === 'F' },
      { text: `ENDIF`, indent: 1, type: 'keyword' },
      { text: 'STOP', indent: 0, type: 'keyword' },
    ],
    python: (v, grade) => [
      { text: `score = int(input("คะแนน: "))`, active: true },
      { text: `if score >= 80:`, active: grade === 'A' },
      { text: `    print("เกรด A")`, active: grade === 'A' },
      { text: `elif score >= 70:`, active: grade === 'B' },
      { text: `    print("เกรด B")`, active: grade === 'B' },
      { text: `elif score >= 60:`, active: grade === 'C' },
      { text: `    print("เกรด C")`, active: grade === 'C' },
      { text: `else:`, active: grade === 'F' },
      { text: `    print("เกรด F")`, active: grade === 'F' },
    ],
    explain: 'ใช้ ELSE IF เพิ่มเงื่อนไขหลายทาง Python ใช้ elif แทน ตรวจสอบจากเงื่อนไขแรกไปถึงสุดท้าย'
  }
];

export default function pyUnit2_10_PseudocodeCondition() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [value, setValue] = useState(scenarios[0].defaultVal);

  const sc = scenarios[scenarioIdx];
  const result = sc.condition(value);
  const pseudoLines = sc.pseudo(value, result);
  const pythonLines = sc.python(value, result);

  const changeScenario = (idx) => { setScenarioIdx(idx); setValue(scenarios[idx].defaultVal); };

  const typeColor = { keyword: 'text-rose-400', io: 'text-green-400', condition: 'text-amber-400', action: 'text-purple-300' };

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> จำลอง IF...THEN...ELSE แบบ Real-time
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔀 เงื่อนไขในรหัสเทียม (IF...THEN...ELSE)</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">เมื่อต้องตัดสินใจ ใช้โครงสร้าง IF...THEN...ELSE ลองปรับค่าดูว่าโปรแกรมเดินทางไหน บรรทัดที่ทำงานจะสว่างขึ้น</p>
      </div>

      {/* Scenario tabs */}
      <div className="flex justify-center gap-3 mb-6">
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => changeScenario(i)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${scenarioIdx === i ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 max-w-md mx-auto mb-8">
        <label className="text-sm font-bold text-gray-700 mb-3 block">🎛️ ปรับค่า {sc.label}</label>
        <div className="flex items-center gap-4">
          <input type="range" min={sc.min} max={sc.max} value={value} onChange={e => setValue(+e.target.value)} className="flex-1 accent-indigo-500 h-2" />
          <span className="text-3xl font-extrabold text-indigo-600 w-14 text-right">{value}</span>
        </div>
        <div className={`mt-3 rounded-xl p-3 text-center text-sm font-bold ${typeof result === 'boolean' ? (result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-indigo-100 text-indigo-700'}`}>
          ผลลัพธ์: {typeof result === 'boolean' ? (result ? sc.trueResult : sc.falseResult) : `เกรด ${result}`}
        </div>
      </div>

      {/* Side by side */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-5 py-3 flex items-center gap-2">📋 Pseudocode</div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-0.5">
            {pseudoLines.map((line, idx) => (
              <div key={idx} className={`px-2 py-1 rounded transition-all duration-500 ${line.active ? 'bg-indigo-900/40 ' + (typeColor[line.type] || 'text-indigo-300') : 'text-slate-600'}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-5 py-3 flex items-center gap-2">🐍 Python Code</div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-0.5">
            {pythonLines.map((line, idx) => (
              <div key={idx} className={`px-2 py-1 rounded transition-all duration-500 ${line.active ? 'bg-emerald-900/30 text-emerald-300' : 'text-slate-600'}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explain */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">{sc.explain}</p>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <ArrowRight className="w-3 h-3" />
            IF-THEN-ELSE ในรหัสเทียม ต้องปิดด้วย <code className="bg-amber-200/50 px-1 rounded font-mono">ENDIF</code> เสมอ
          </p>
        </div>
      </div>
    </div>
  );
}
