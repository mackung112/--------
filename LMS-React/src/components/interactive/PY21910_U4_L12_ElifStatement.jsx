import React, { useState, useEffect, useRef } from 'react';
import { Star, RotateCcw } from 'lucide-react';

const gradeInfo = {
  A: { label: 'ดีเยี่ยม',   color: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
  B: { label: 'ดี',        color: 'bg-blue-50 border-blue-300 text-blue-700' },
  C: { label: 'ปานกลาง',   color: 'bg-amber-50 border-amber-300 text-amber-700' },
  D: { label: 'พอผ่าน',    color: 'bg-orange-50 border-orange-300 text-orange-700' },
  F: { label: 'ไม่ผ่าน',   color: 'bg-rose-50 border-rose-300 text-rose-700' },
};

export default function PY21910_U4_L12_ElifStatement() {
  const [score, setScore] = useState(75);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'elif Statement Simulator Ready.' },
  ]);
  const consoleRef = useRef(null);

  const grade = score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F';
  const gInfo = gradeInfo[grade];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleChange = (val) => {
    setScore(val);
    const g = val >= 80 ? 'A' : val >= 70 ? 'B' : val >= 60 ? 'C' : val >= 50 ? 'D' : 'F';
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `score = ${val}` },
      { type: 'command', text: `# ประเมินเกรดด้วย if-elif-else` },
      { type: 'output',  text: `grade = "${g}"  # ${gradeInfo[g].label}` },
    ]);
  };

  const clear = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Star size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">elif Statement (หลายเงื่อนไข)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ใช้ <code className="bg-slate-200 px-1 rounded text-pink-600">if-elif-else</code> เพื่อตรวจสอบหลายเงื่อนไขแบบต่อเนื่อง Python จะประเมินตั้งแต่บนลงล่าง
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Simulator */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-6">ปรับคะแนนเพื่อดูเกรด</h4>
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="text-6xl font-black text-slate-800">{score}<span className="text-2xl font-medium text-slate-600">/100</span></div>
              <input type="range" min="0" max="100" step="1" value={score}
                onChange={e => handleChange(+e.target.value)}
                className="w-64 accent-indigo-500" />
              <div className={`text-center py-4 px-10 rounded-2xl font-bold text-5xl border-2 transition-all duration-300 ${gInfo.color}`}>
                {grade}
                <div className="text-sm mt-1 font-medium">{gInfo.label}</div>
              </div>
            </div>

            {/* Live Code Block */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm max-w-xs mx-auto">
              {[
                { cond: score >= 80,                     line: 'if score >= 80:',    val: '"A"' },
                { cond: score >= 70 && score < 80,       line: 'elif score >= 70:',  val: '"B"' },
                { cond: score >= 60 && score < 70,       line: 'elif score >= 60:',  val: '"C"' },
                { cond: score >= 50 && score < 60,       line: 'elif score >= 50:',  val: '"D"' },
                { cond: score < 50,                      line: 'else:',              val: '"F"' },
              ].map((row, i) => (
                <div key={i}>
                  <div className={`${row.cond ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>{row.line}</div>
                  <div className={`ml-4 mb-1 ${row.cond ? 'text-cyan-300' : 'text-slate-700'}`}>grade = {row.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Guide */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">เกณฑ์การตัดเกรด</h4>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-4 overflow-hidden flex-1">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-slate-700 font-medium">คะแนน</th>
                    <th className="py-2 px-4 text-left text-slate-700 font-medium">เกรด</th>
                    <th className="py-2 px-4 text-left text-slate-700 font-medium">ระดับ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['≥ 80', 'A', 'ดีเยี่ยม'],
                    ['70–79', 'B', 'ดี'],
                    ['60–69', 'C', 'ปานกลาง'],
                    ['50–59', 'D', 'พอผ่าน'],
                    ['< 50', 'F', 'ไม่ผ่าน'],
                  ].map(([r, g, l], i) => (
                    <tr key={i} className={`border-b border-slate-100 ${grade === g ? 'bg-indigo-50 font-bold' : ''}`}>
                      <td className="py-2 px-4 font-mono text-slate-700">{r}</td>
                      <td className={`py-2 px-4 font-bold ${gradeInfo[g].color.split(' ')[2]}`}>{g}</td>
                      <td className="py-2 px-4 text-slate-600 text-xs">{l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={clear}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Clear Terminal
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
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
  );
}
