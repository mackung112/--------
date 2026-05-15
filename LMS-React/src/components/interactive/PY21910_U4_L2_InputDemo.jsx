import { useState } from 'react';

export default function PY21910_U4_L2_InputDemo() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">⌨️ จำลองคำสั่ง input()</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ลองพิมพ์ชื่อแล้วกด Enter</p>
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm max-w-lg mx-auto">
        <div className="text-green-400 mb-2">name = input("กรุณาใส่ชื่อ: ")</div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-300">กรุณาใส่ชื่อ: </span>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setSubmitted(true)}
            className="bg-slate-800 text-white border border-slate-600 rounded px-2 py-1 flex-1 focus:outline-none focus:border-green-500" placeholder="พิมพ์ที่นี่..." />
        </div>
        {submitted && (
          <>
            <div className="text-green-400 mt-3">print("สวัสดี " + name)</div>
            <div className="text-yellow-300 mt-1">สวัสดี {name}</div>
            <div className="text-slate-500 mt-2">---</div>
            <div className="text-slate-400 text-xs">type(name) → &lt;class 'str'&gt; ⚠️ input() ได้ค่าเป็น str เสมอ!</div>
          </>
        )}
      </div>
      {!submitted && <p className="text-center text-xs text-gray-400 mt-2">กด Enter เพื่อส่งค่า</p>}
      {submitted && <button onClick={() => { setName(''); setSubmitted(false); }} className="block mx-auto mt-3 text-sm text-indigo-500 underline">🔄 ลองใหม่</button>}
    </div>
  );
}
