import React, { useState } from 'react';

export default function WhileLoop() {
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
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-purple-400">count = 1</div>
          <div className="text-pink-400">while count &lt;= {target}:</div>
          <div className="ml-4 text-green-400">print(count)</div>
          <div className="ml-4 text-green-400">count += 1</div>
        </div>
        <div>
          <button onClick={running ? () => { setRunning(false); setLogs([]); } : run} className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg mb-3">
            {running ? '🔄 ใหม่' : '▶ รัน'}
          </button>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 max-h-[180px] overflow-y-auto">
            {logs.length ? logs.map((l, i) => <div key={i}>{l}</div>) : <span className="text-slate-500">กดรัน</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
