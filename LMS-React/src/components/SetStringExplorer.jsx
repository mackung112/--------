import React, { useState } from 'react';

export default function SetStringExplorer() {
  const [tab, setTab] = useState('set');
  const [text, setText] = useState('Hello Python');
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🧩 Set & String Slicing</h3>
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setTab('set')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'set' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>Set</button>
        <button onClick={() => setTab('slice')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'slice' ? 'bg-violet-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>String Slicing</button>
      </div>
      {tab === 'set' ? (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-green-400">a = {'{'}1, 2, 3, 4{'}'}</div>
          <div className="text-green-400">b = {'{'}3, 4, 5, 6{'}'}</div>
          <div className="text-purple-400 mt-3">a | b  → {'{'}1, 2, 3, 4, 5, 6{'}'} <span className="text-slate-500"># Union</span></div>
          <div className="text-purple-400">a & b  → {'{'}3, 4{'}'} <span className="text-slate-500"># Intersection</span></div>
          <div className="text-purple-400">a - b  → {'{'}1, 2{'}'} <span className="text-slate-500"># Difference</span></div>
          <div className="text-purple-400">a ^ b  → {'{'}1, 2, 5, 6{'}'} <span className="text-slate-500"># Symmetric Diff</span></div>
          <div className="mt-3 bg-orange-50 text-orange-700 rounded-xl p-3 text-xs font-sans">💡 Set ไม่มีลำดับ ไม่มีสมาชิกซ้ำ เหมาะสำหรับตัดซ้ำและเปรียบเทียบกลุ่ม</div>
        </div>
      ) : (
        <div>
          <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full text-center font-mono text-lg border-2 border-violet-300 rounded-xl p-3 mb-4" />
          <div className="flex flex-wrap justify-center gap-1 mb-4">
            {text.split('').map((ch, i) => (
              <div key={i} className="w-8 h-10 bg-violet-100 border border-violet-300 rounded flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{ch === ' ' ? '␣' : ch}</span>
                <span className="text-[8px] text-violet-500">{i}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm space-y-1">
            <div className="text-purple-400">[0:5] → "{text.slice(0, 5)}"</div>
            <div className="text-purple-400">[6:] → "{text.slice(6)}"</div>
            <div className="text-purple-400">[::-1] → "{text.split('').reverse().join('')}"</div>
          </div>
        </div>
      )}
    </div>
  );
}
