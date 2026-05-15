import { useState } from 'react';

export default function PY21910_U4_L14_WhileLoop() {
  const [target, setTarget] = useState(5);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const run = () => {
    const l = [];
    let count = 1;
    while (count <= target) { l.push(`รอบ ${count}: count = ${count}`); count++; }
    l.push(`count = ${count} > ${target} → จบ loop`);
    setLogs(l); setRunning(true);
  };

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔄 while loop</h3>
      <div className="flex justify-center items-center gap-3 mb-4">
        <span className="text-sm">วนซ้ำ</span>
        <input type="range" min="1" max="10" value={target} onChange={e => { setTarget(+e.target.value); setRunning(false); setLogs([]); }} className="w-40 accent-indigo-500" />
        <span className="font-bold text-indigo-600">{target} รอบ</span>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-8 mb-6">
          <div className="w-full lg:w-1/2 bg-slate-900 rounded-2xl p-5 font-mono text-sm shadow-md">
            <div className="text-purple-400">count = 1</div>
            <div className="text-pink-400">while count &lt;= {target}:</div>
            <div className="ml-4 text-green-400">print(count)</div>
            <div className="ml-4 text-green-400">count += 1</div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <button onClick={running ? () => { setRunning(false); setLogs([]); } : run} className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg mb-3">
              {running ? '🔄 ใหม่' : '▶ รัน'}
            </button>
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-sm">
              เมื่อกดปุ่ม "รัน" โปรแกรมจะจำลองการทำงานของ while loop ตามจำนวนรอบที่กำหนด
            </div>
          </div>
        </div>
        
        {/* Bottom Full-Width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800 rounded-2xl shadow-inner">
          <div className="text-slate-500 mb-3 text-xs font-bold uppercase tracking-wider">Live Console</div>
          {logs.length ? logs.map((l, i) => <div key={i} className="text-green-400">{l}</div>) : <span className="text-slate-500">กดรันเพื่อดูผลลัพธ์</span>}
        </div>
      </div>
    </div>
  );
}
