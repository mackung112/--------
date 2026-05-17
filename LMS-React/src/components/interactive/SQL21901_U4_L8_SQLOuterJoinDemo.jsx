import React, { useState } from 'react';
import { CircleDashed, Users, ShoppingCart, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function SQLInnerJoinDemo() {
  const [joinType, setJoinType] = useState('inner'); // inner, left, right, full

  const customers = [
    { id: 1, name: 'สมชาย' },
    { id: 2, name: 'สมหญิง' },
    { id: 3, name: 'วิชัย' }
  ];

  const orders = [
    { id: 101, c_id: 1, item: 'Laptop' },
    { id: 102, c_id: 1, item: 'Mouse' },
    { id: 103, c_id: 99, item: 'Keyboard (ไม่มีเจ้าของ)' }
  ];

  // Logic to determine which rows are visible based on join
  const getResult = () => {
    let res = [];
    if (joinType === 'inner') {
      res = [
        { c: customers[0], o: orders[0] },
        { c: customers[0], o: orders[1] }
      ];
    } else if (joinType === 'left') {
      res = [
        { c: customers[0], o: orders[0] },
        { c: customers[0], o: orders[1] },
        { c: customers[1], o: null },
        { c: customers[2], o: null }
      ];
    } else if (joinType === 'right') {
      res = [
        { c: customers[0], o: orders[0] },
        { c: customers[0], o: orders[1] },
        { c: null, o: orders[2] }
      ];
    }
    return res;
  };

  const results = getResult();

  return (
    <div className="space-y-12 my-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
          <CircleDashed size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Venn Diagram JOIN Visualizer</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ทำความเข้าใจการเชื่อมตาราง (JOIN) ผ่านภาพวงกลม Venn Diagram และดูว่าข้อมูลถูกจับคู่กันอย่างไรแบบเรียลไทม์
          </p>
        </div>
      </div>

      
    
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
        
        {/* Controls */}
        <div className="bg-slate-800 p-6 border-b border-slate-700 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setJoinType('inner')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${joinType === 'inner' ? 'bg-indigo-500 text-white shadow-lg scale-105' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'}`}
          >
            INNER JOIN
          </button>
          <button 
            onClick={() => setJoinType('left')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${joinType === 'left' ? 'bg-emerald-500 text-white shadow-lg scale-105' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'}`}
          >
            LEFT JOIN
          </button>
          <button 
            onClick={() => setJoinType('right')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${joinType === 'right' ? 'bg-rose-500 text-white shadow-lg scale-105' : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'}`}
          >
            RIGHT JOIN
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          
          {/* Venn Diagram Visualizer */}
          <div className="flex flex-col items-center justify-center relative h-[300px]">
            {/* Left Circle */}
            <div className={`absolute w-48 h-48 rounded-full border-4 flex items-center justify-start pl-4 text-white font-bold text-xl transition-all duration-500 ${
              joinType === 'left' ? 'bg-emerald-500/80 border-emerald-400 z-20 scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 
              'bg-slate-700/50 border-slate-500 z-10'
            }`} style={{ left: '50%', transform: 'translateX(-80%)' }}>
              <div className="flex flex-col items-center ml-2">
                <Users size={24} className="mb-2 opacity-80" />
                Table A
              </div>
            </div>

            {/* Right Circle */}
            <div className={`absolute w-48 h-48 rounded-full border-4 flex items-center justify-end pr-4 text-white font-bold text-xl transition-all duration-500 ${
              joinType === 'right' ? 'bg-rose-500/80 border-rose-400 z-20 scale-105 shadow-[0_0_30px_rgba(244,63,94,0.3)]' : 
              'bg-slate-700/50 border-slate-500 z-10'
            }`} style={{ right: '50%', transform: 'translateX(80%)' }}>
              <div className="flex flex-col items-center mr-2">
                <ShoppingCart size={24} className="mb-2 opacity-80" />
                Table B
              </div>
            </div>

            {/* Intersection (Inner Join) */}
            <div className={`absolute w-24 h-40 rounded-[50%] border-0 flex items-center justify-center text-white font-bold text-sm transition-all duration-500 z-30 ${
              joinType === 'inner' ? 'bg-indigo-500/90 shadow-[0_0_30px_rgba(99,102,241,0.5)] scale-110' : 
              joinType === 'left' ? 'bg-emerald-500/0' : 
              joinType === 'right' ? 'bg-rose-500/0' :
              'bg-slate-600/50'
            }`} style={{ left: '50%', transform: 'translateX(-50%)' }}>
              <div className="flex flex-col items-center">
                <span className="opacity-90">INNER</span>
                <span className="opacity-90">(ตรงกัน)</span>
              </div>
            </div>

            <div className="absolute bottom-0 w-full text-center text-slate-600 text-sm font-mono mt-8">
              {joinType === 'inner' && "SELECT * FROM A INNER JOIN B ON A.id = B.c_id"}
              {joinType === 'left' && "SELECT * FROM A LEFT JOIN B ON A.id = B.c_id"}
              {joinType === 'right' && "SELECT * FROM A RIGHT JOIN B ON A.id = B.c_id"}
            </div>
          </div>

          {/* Data Tables */}
          <div className="flex flex-col gap-6">
            
            <div className="flex gap-4">
              {/* Table A Raw */}
              <div className="flex-1 bg-white rounded-xl overflow-hidden border border-slate-300">
                <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 text-center border-b">Table A (Customers)</div>
                <table className="w-full text-xs text-center">
                  <thead><tr className="bg-slate-50 text-slate-700"><th className="p-1">id</th><th className="p-1">name</th></tr></thead>
                  <tbody>
                    {customers.map(c => <tr key={c.id} className="border-t"><td className="p-1">{c.id}</td><td className="p-1">{c.name}</td></tr>)}
                  </tbody>
                </table>
              </div>

              {/* Table B Raw */}
              <div className="flex-1 bg-white rounded-xl overflow-hidden border border-slate-300">
                <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 text-center border-b">Table B (Orders)</div>
                <table className="w-full text-xs text-center">
                  <thead><tr className="bg-slate-50 text-slate-700"><th className="p-1">id</th><th className="p-1">c_id</th><th className="p-1">item</th></tr></thead>
                  <tbody>
                    {orders.map(o => <tr key={o.id} className="border-t"><td className="p-1">{o.id}</td><td className="p-1 text-indigo-600 font-bold">{o.c_id}</td><td className="p-1">{o.item}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Result Table */}
            <div className="bg-indigo-50 rounded-xl overflow-hidden border border-indigo-200 mt-2 shadow-inner">
              <div className="bg-indigo-100 px-3 py-3 text-sm font-bold text-indigo-800 text-center border-b border-indigo-200 flex justify-center items-center gap-2">
                <ArrowRight size={16}/> ผลลัพธ์จากการ JOIN ({results.length} แถว)
              </div>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-sm text-center">
                  <thead>
                    <tr className="bg-white text-indigo-500 border-b border-indigo-100 sticky top-0 shadow-sm">
                      <th className="p-2 border-r border-indigo-50">A.id</th>
                      <th className="p-2 border-r border-indigo-200">A.name</th>
                      <th className="p-2 border-r border-indigo-50">B.id</th>
                      <th className="p-2 border-r border-indigo-50">B.c_id</th>
                      <th className="p-2">B.item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr><td colSpan="5" className="p-4 text-slate-600">No data found</td></tr>
                    ) : (
                      results.map((r, i) => (
                        <tr key={i} className="border-b border-indigo-50 bg-white hover:bg-indigo-50 transition-colors animate-in fade-in slide-in-from-top-2">
                          <td className={`p-2 border-r border-indigo-50 ${!r.c && 'text-slate-300 italic bg-slate-50'}`}>{r.c ? r.c.id : 'NULL'}</td>
                          <td className={`p-2 border-r border-indigo-200 ${!r.c && 'text-slate-300 italic bg-slate-50'}`}>{r.c ? r.c.name : 'NULL'}</td>
                          <td className={`p-2 border-r border-indigo-50 ${!r.o && 'text-slate-300 italic bg-slate-50'}`}>{r.o ? r.o.id : 'NULL'}</td>
                          <td className={`p-2 border-r border-indigo-50 ${!r.o && 'text-slate-300 italic bg-slate-50'}`}>{r.o ? r.o.c_id : 'NULL'}</td>
                          <td className={`p-2 ${!r.o && 'text-slate-300 italic bg-slate-50'}`}>{r.o ? r.o.item : 'NULL'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-slate-800 p-6 border-t border-slate-700 text-slate-300 text-sm leading-relaxed">
          {joinType === 'inner' && <p><strong className="text-indigo-600">INNER JOIN:</strong> ดึงมาเฉพาะแถวที่ <strong>A.id และ B.c_id ตรงกันเท่านั้น</strong> (สมชายสั่งซื้อของ 2 ชิ้น เลยได้ 2 แถว ส่วนสมหญิงกับวิชัยไม่ได้ซื้อของ เลยหายไป)</p>}
          {joinType === 'left' && <p><strong className="text-emerald-400">LEFT JOIN:</strong> เอาตาราง <strong>A (ซ้าย) เป็นหลัก ดึงลูกค้ามาทุกคน</strong> ใครไม่มี Order (เช่น สมหญิง, วิชัย) ข้อมูลฝั่ง B จะกลายเป็น <span className="bg-slate-700 px-1 rounded text-white">NULL</span></p>}
          {joinType === 'right' && <p><strong className="text-rose-400">RIGHT JOIN:</strong> เอาตาราง <strong>B (ขวา) เป็นหลัก ดึงออเดอร์มาทั้งหมด</strong> ออเดอร์ของคีย์บอร์ดที่ไม่มีเจ้าของ (c_id=99) ข้อมูลฝั่ง A จะกลายเป็น <span className="bg-slate-700 px-1 rounded text-white">NULL</span></p>}
        </div>
      </div>
    </div>
  );
}
