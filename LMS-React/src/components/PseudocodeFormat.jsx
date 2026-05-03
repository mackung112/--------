import React, { useState } from 'react';

const lines = [
  { text: 'START', correct: 0 },
  { text: 'READ price, qty', correct: 1 },
  { text: 'COMPUTE total = price × qty', correct: 1 },
  { text: 'IF total > 1000 THEN', correct: 1 },
  { text: 'COMPUTE discount = total × 0.1', correct: 2 },
  { text: 'ELSE', correct: 1 },
  { text: 'SET discount = 0', correct: 2 },
  { text: 'ENDIF', correct: 1 },
  { text: 'PRINT total - discount', correct: 1 },
  { text: 'STOP', correct: 0 },
];

export default function PseudocodeFormat() {
  const [indents, setIndents] = useState(lines.map(() => 0));
  const handleIndent = (idx, delta) => {
    const n = [...indents];
    n[idx] = Math.max(0, Math.min(3, n[idx] + delta));
    setIndents(n);
  };
  const isCorrect = indents.every((v, i) => v === lines[i].correct);

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📐 การจัดย่อหน้ารหัสเทียม</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดลูกศรเพื่อจัดย่อหน้าให้ถูกต้อง — บรรทัดภายใน IF/ELSE ต้องย่อเข้าไป</p>
      <div className="bg-slate-900 rounded-2xl p-4 font-mono text-sm">
        <div className="flex justify-between items-center mb-3 border-b border-slate-700 pb-2">
          <span className="text-slate-400 text-xs">pseudocode_format.txt</span>
          {isCorrect ? <span className="text-green-400 text-xs font-bold animate-pulse">✨ ถูกต้อง!</span> : <button onClick={() => setIndents(lines.map(l => l.correct))} className="text-indigo-400 text-xs underline">ดูเฉลย</button>}
        </div>
        {lines.map((line, i) => (
          <div key={i} className="flex items-center group py-1">
            <span className="w-6 text-slate-600 text-xs">{i + 1}</span>
            <div className="flex gap-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleIndent(i, -1)} disabled={indents[i] === 0} className="w-5 h-5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 text-xs flex items-center justify-center">◀</button>
              <button onClick={() => handleIndent(i, 1)} disabled={indents[i] === 3} className="w-5 h-5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 text-xs flex items-center justify-center">▶</button>
            </div>
            <span className={`transition-all ${indents[i] !== lines[i].correct ? 'text-red-400 bg-red-500/10 px-1 rounded' : 'text-indigo-300'}`} style={{ marginLeft: `${indents[i] * 24}px` }}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
