import { useState } from 'react';

const modules = [
  { name: 'math', desc: 'ฟังก์ชันทางคณิตศาสตร์', funcs: [
    { call: 'math.sqrt(16)', result: '4.0' },
    { call: 'math.pi', result: '3.141592653589793' },
    { call: 'math.ceil(4.2)', result: '5' },
    { call: 'math.floor(4.8)', result: '4' },
  ]},
  { name: 'random', desc: 'สุ่มตัวเลข', funcs: [
    { call: 'random.randint(1, 10)', result: 'สุ่ม 1-10' },
    { call: 'random.choice(["A","B","C"])', result: 'สุ่มเลือก 1 ตัว' },
    { call: 'random.random()', result: 'ทศนิยม 0.0-1.0' },
  ]},
  { name: 'datetime', desc: 'วันที่และเวลา', funcs: [
    { call: 'datetime.datetime.now()', result: new Date().toLocaleString('th-TH') },
    { call: 'datetime.date.today()', result: new Date().toLocaleDateString('th-TH') },
  ]},
];

export default function ImportModule() {
  const [active, setActive] = useState(0);
  const mod = modules[active];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📦 การ import โมดูลมาตรฐาน</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">กดเลือกโมดูลเพื่อดูฟังก์ชันที่ใช้ได้</p>
      <div className="flex justify-center gap-3 mb-6">
        {modules.map((m, i) => (
          <button key={i} onClick={() => setActive(i)} className={`px-5 py-2 rounded-xl font-mono font-bold text-sm transition-all ${active === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{m.name}</button>
        ))}
      </div>
      <div className="bg-slate-900 rounded-2xl p-4 font-mono text-sm mb-4">
        <span className="text-pink-400">import</span> <span className="text-green-400">{mod.name}</span>
      </div>
      <div className="space-y-2">
        {mod.funcs.map((f, i) => (
          <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <code className="text-sm text-indigo-700 font-bold flex-1">{f.call}</code>
            <span className="text-sm text-gray-500">→</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">{f.result}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500 text-center">💡 Python มีโมดูลมาตรฐานมากกว่า 200 ตัวที่ใช้งานได้ทันทีโดยไม่ต้องติดตั้งเพิ่ม</div>
    </div>
  );
}
