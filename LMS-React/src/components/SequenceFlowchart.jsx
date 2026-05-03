import React, { useState } from 'react';

const steps = [
  { label: 'START', type: 'terminal' },
  { label: 'READ radius', type: 'io' },
  { label: 'area = 3.14 × radius²', type: 'process' },
  { label: 'PRINT area', type: 'io' },
  { label: 'STOP', type: 'terminal' },
];

export default function SequenceFlowchart() {
  const [current, setCurrent] = useState(-1);
  const [radius, setRadius] = useState(5);
  const area = (3.14 * radius * radius).toFixed(2);
  const colors = { terminal: 'bg-rose-500', io: 'bg-green-500', process: 'bg-blue-500' };

  const runStep = () => setCurrent(prev => (prev < steps.length - 1 ? prev + 1 : -1));

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔽 ผังงานแบบเรียงลำดับ</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">คำสั่งทำงานจากบนลงล่าง ทีละขั้น ไม่มีเงื่อนไข</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center gap-1">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className={`px-6 py-3 text-white font-bold text-sm text-center min-w-[200px] transition-all rounded-xl ${colors[s.type]} ${current === i ? 'ring-4 ring-yellow-400 scale-110 shadow-xl' : 'opacity-60'}`}>{s.label}</div>
              {i < steps.length - 1 && <div className="text-gray-400 text-xl">↓</div>}
            </React.Fragment>
          ))}
          <button onClick={runStep} className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-all">
            {current === -1 ? '▶ เริ่มจำลอง' : current < steps.length - 1 ? '⏭ ถัดไป' : '🔄 ใหม่'}
          </button>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <label className="text-sm text-gray-600">ลองเปลี่ยนค่า radius:</label>
          <input type="range" min="1" max="20" value={radius} onChange={e => setRadius(+e.target.value)} className="w-full mb-3 accent-indigo-500" />
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 min-h-[100px]">
            {current >= 1 && <div>radius = {radius}</div>}
            {current >= 2 && <div>area = 3.14 × {radius}² = {area}</div>}
            {current >= 3 && <div className="text-yellow-300">OUTPUT: {area}</div>}
            {current >= 4 && <div className="text-rose-400">--- จบ ---</div>}
            {current === -1 && <div className="text-slate-500">กดปุ่มเริ่มจำลอง</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
