import { useState } from 'react';

export default function PY21910_U4_L12_ElifStatement() {
  const [score, setScore] = useState(75);
  const grade = score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F';
  const colors = { A: 'text-green-600 bg-green-100', B: 'text-blue-600 bg-blue-100', C: 'text-amber-600 bg-amber-100', D: 'text-orange-600 bg-orange-100', F: 'text-red-600 bg-red-100' };
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📊 เงื่อนไข elif (หลายทางเลือก)</h3>
      <div className="flex justify-center items-center gap-3 mb-6">
        <input type="range" min="0" max="100" value={score} onChange={e => setScore(+e.target.value)} className="w-48 accent-indigo-500" />
        <span className="text-2xl font-bold text-indigo-600">{score}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className={`${score >= 80 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>if score &gt;= 80:</div>
          <div className={`ml-4 ${score >= 80 ? 'text-green-400' : 'text-slate-600'}`}>grade = "A"</div>
          <div className={`${score >= 70 && score < 80 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>elif score &gt;= 70:</div>
          <div className={`ml-4 ${score >= 70 && score < 80 ? 'text-green-400' : 'text-slate-600'}`}>grade = "B"</div>
          <div className={`${score >= 60 && score < 70 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>elif score &gt;= 60:</div>
          <div className={`ml-4 ${score >= 60 && score < 70 ? 'text-green-400' : 'text-slate-600'}`}>grade = "C"</div>
          <div className={`${score >= 50 && score < 60 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>elif score &gt;= 50:</div>
          <div className={`ml-4 ${score >= 50 && score < 60 ? 'text-green-400' : 'text-slate-600'}`}>grade = "D"</div>
          <div className={`${score < 50 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>else:</div>
          <div className={`ml-4 ${score < 50 ? 'text-red-400' : 'text-slate-600'}`}>grade = "F"</div>
        </div>
        <div className="flex items-center justify-center">
          <div className={`text-center rounded-3xl p-8 ${colors[grade]}`}>
            <div className="text-6xl font-extrabold">{grade}</div>
            <div className="text-sm mt-2">คะแนน {score}/100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
