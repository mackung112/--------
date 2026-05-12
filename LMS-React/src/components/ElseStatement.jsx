import { useState } from 'react';

export default function ElseStatement() {
  const [num, setNum] = useState(7);
  const isEven = num % 2 === 0;
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔀 เงื่อนไข else (ทางเลือกสุดท้าย)</h3>
      <div className="flex justify-center items-center gap-3 mb-6">
        <input type="number" value={num} onChange={e => setNum(+e.target.value)} className="w-24 text-center text-2xl font-bold border-2 border-indigo-300 rounded-xl p-2" />
      </div>
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm max-w-md mx-auto">
        <div className="text-purple-400">num = {num}</div>
        <div className={`text-pink-400 ${isEven ? 'font-bold' : ''}`}>if num % 2 == 0:</div>
        <div className={`ml-4 ${isEven ? 'text-green-400 font-bold' : 'text-slate-600'}`}>print(f"{'{'}num{'}'} เป็นเลขคู่")</div>
        <div className={`text-pink-400 ${!isEven ? 'font-bold' : ''}`}>else:</div>
        <div className={`ml-4 ${!isEven ? 'text-amber-400 font-bold' : 'text-slate-600'}`}>print(f"{'{'}num{'}'} เป็นเลขคี่")</div>
      </div>
      <div className={`mt-4 p-4 rounded-2xl text-center font-bold max-w-md mx-auto ${isEven ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
        {num} เป็นเลข{isEven ? 'คู่' : 'คี่'}
      </div>
    </div>
  );
}
