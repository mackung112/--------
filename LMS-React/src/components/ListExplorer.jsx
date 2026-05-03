import React, { useState } from 'react';

export default function ListExplorer() {
  const [items, setItems] = useState(['Python', 'Java', 'C++']);
  const [newItem, setNewItem] = useState('');
  const addItem = () => { if (newItem.trim()) { setItems([...items, newItem.trim()]); setNewItem(''); } };
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📋 สำรวจ List</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">เพิ่ม ลบ สมาชิก แล้วดูโค้ด Python ที่เทียบเท่า</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} className="flex-1 border-2 border-indigo-300 rounded-xl px-3 py-2 text-sm" placeholder="พิมพ์แล้ว Enter..." />
            <button onClick={addItem} className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold text-sm">+ เพิ่ม</button>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-xs text-gray-400 w-6">[{i}]</span>
                <span className="flex-1 font-bold text-sm">{item}</span>
                <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-xs">✕ ลบ</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-green-400">langs = {JSON.stringify(items)}</div>
          <div className="text-slate-500 mt-2"># len = {items.length}</div>
          {items.length > 0 && <>
            <div className="text-purple-400 mt-1">langs[0] → "{items[0]}"</div>
            <div className="text-purple-400">langs[-1] → "{items[items.length-1]}"</div>
          </>}
        </div>
      </div>
    </div>
  );
}
