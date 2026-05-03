import React, { useState } from 'react';

export default function MembershipOps() {
  const [search, setSearch] = useState('Python');
  const list = ['Python', 'Java', 'C++', 'JavaScript', 'Go'];
  const text = 'Hello Python World';
  const inList = list.includes(search);
  const inText = text.includes(search);
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔎 ตัวดำเนินการความเป็นสมาชิก (in / not in)</h3>
      <div className="flex justify-center mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="text-center text-lg font-bold border-2 border-indigo-300 rounded-xl p-2 w-48" placeholder="ค้นหา..." />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className={`rounded-2xl p-5 border-2 ${inList ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
          <div className="text-xs text-gray-500 mb-1">ค้นหาใน List</div>
          <code className="text-sm">"{search}" in {JSON.stringify(list)}</code>
          <div className={`text-2xl font-bold mt-2 ${inList ? 'text-green-600' : 'text-red-600'}`}>{inList ? 'True ✅' : 'False ❌'}</div>
        </div>
        <div className={`rounded-2xl p-5 border-2 ${inText ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
          <div className="text-xs text-gray-500 mb-1">ค้นหาใน String</div>
          <code className="text-sm">"{search}" in "{text}"</code>
          <div className={`text-2xl font-bold mt-2 ${inText ? 'text-green-600' : 'text-red-600'}`}>{inText ? 'True ✅' : 'False ❌'}</div>
        </div>
      </div>
    </div>
  );
}
