import React, { useState } from 'react';

export default function FileHandler() {
  const [tab, setTab] = useState('read');
  const csvData = 'name,price,qty\nApple,30,5\nBanana,15,10\nOrange,25,8';
  const rows = csvData.split('\n').map(r => r.split(','));
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📁 การทำงานกับไฟล์</h3>
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setTab('read')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'read' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>📖 อ่านไฟล์</button>
        <button onClick={() => setTab('write')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'write' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>✍️ เขียนไฟล์</button>
        <button onClick={() => setTab('csv')} className={`px-5 py-2 rounded-xl font-bold text-sm ${tab === 'csv' ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>📊 CSV</button>
      </div>
      {tab === 'read' && (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div className="text-pink-400">with</div> <span className="text-yellow-300">open("data.txt")</span> <span className="text-pink-400">as</span> <span className="text-green-400">f:</span>
          <div className="ml-4 text-green-400">content = f.read()</div>
          <div className="ml-4 text-green-400">print(content)</div>
          <div className="mt-3 text-slate-400 text-xs"># with block ปิดไฟล์ให้อัตโนมัติ</div>
        </div>
      )}
      {tab === 'write' && (
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
          <div><span className="text-pink-400">with</span> <span className="text-yellow-300">open("output.txt", "w")</span> <span className="text-pink-400">as</span> <span className="text-green-400">f:</span></div>
          <div className="ml-4 text-green-400">f.write("สวัสดี Python!\n")</div>
          <div className="ml-4 text-green-400">f.write("บรรทัดที่ 2")</div>
          <div className="mt-3 text-slate-400 text-xs"># "w" = เขียนทับ, "a" = เขียนต่อท้าย</div>
        </div>
      )}
      {tab === 'csv' && (
        <div>
          <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm mb-4">
            <div><span className="text-pink-400">import</span> <span className="text-green-400">csv</span></div>
            <div><span className="text-pink-400">with</span> <span className="text-yellow-300">open("products.csv")</span> <span className="text-pink-400">as</span> <span className="text-green-400">f:</span></div>
            <div className="ml-4">reader = csv.reader(f)</div>
            <div className="ml-4 text-pink-400">for <span className="text-green-400">row</span> in reader:</div>
            <div className="ml-8 text-green-400">print(row)</div>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead><tr>{rows[0].map((h, i) => <th key={i} className="bg-indigo-100 text-indigo-700 p-2 border border-indigo-200 font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.slice(1).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="p-2 border border-gray-200 text-center">{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
