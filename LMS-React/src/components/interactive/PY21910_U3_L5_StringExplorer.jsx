import { useState } from 'react';

export default function PY21910_U3_L5_StringExplorer() {
  const [text, setText] = useState('สวัสดี Python');
  const methods = [
    { label: 'len()', result: text.length },
    { label: '.upper()', result: text.toUpperCase() },
    { label: '.lower()', result: text.toLowerCase() },
    { label: '[0]', result: text[0] || '' },
    { label: '[-1]', result: text[text.length - 1] || '' },
    { label: '[0:5]', result: text.slice(0, 5) },
    { label: '.replace("Python","World")', result: text.replace('Python', 'World') },
    { label: '.split(" ")', result: JSON.stringify(text.split(' ')) },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📝 สำรวจข้อความ (String)</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">พิมพ์ข้อความแล้วดูผลลัพธ์ของ method ต่างๆ</p>
      <div className="flex justify-center mb-6">
        <input type="text" value={text} onChange={e => setText(e.target.value)} className="text-center text-lg font-bold border-2 border-violet-300 rounded-xl p-3 w-72 focus:outline-none focus:border-violet-500" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {methods.map((m, i) => (
          <div key={i} className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-center">
            <div className="font-mono text-xs text-violet-600 mb-1">{m.label}</div>
            <div className="text-sm font-bold text-violet-800 truncate">{String(m.result)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
