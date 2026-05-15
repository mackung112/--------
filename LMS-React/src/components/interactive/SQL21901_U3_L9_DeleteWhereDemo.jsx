import React, { useState, useEffect } from 'react';
  import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Table2,
  RefreshCcw,
  Trash2,
  Filter,
  Code2,
  AlertOctagon,
  XCircle,
  FileWarning,
  Layers
  } from 'lucide-react';

export default function SQL21901_U3_L9_DeleteWhereDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialProducts = [
{ id: 'P01', name: 'แอปเปิ้ล (Apple)', category: 'Food', stock: 50, status: 'Active' },
{ id: 'P02', name: 'นมสด (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
{ id: 'P03', name: 'เสื้อยืดรุ่นเก่า', category: 'Clothing', stock: 5, status: 'Discontinued' },
{ id: 'P04', name: 'ขนมปัง (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
{ id: 'P05', name: 'ตุ๊กตาหมี (ชำรุด)', category: 'Toy', stock: 0, status: 'Damaged' },
{ id: 'P06', name: 'กล้วยหอม', category: 'Food', stock: 30, status: 'Active' },
];

const [products, setProducts] = useState([...initialProducts]);
const [activeScenario, setActiveScenario] = useState('single');
const [highlightedRows, setHighlightedRows] = useState([]);
const [isAnimating, setIsAnimating] = useState(false);

const scenarios = {
single: {
id: 'single',
icon: <Filter size={18} />,
title: "1. ลบด้วย ID (ระบุเจาะจง)",
desc: "ลบสินค้าเจาะจงแถวเดียวด้วย Primary Key",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#fab387]">'P02'</span>;
</>
),
evaluate: (data) => data.filter(r => r.id === 'P02').map(r => r.id)
},
multi: {
id: 'multi',
icon: <Layers size={18} />,
title: "2. ลบเป็นกลุ่ม (เงื่อนไขเดียว)",
desc: "ลบสินค้าทั้งหมดที่สถานะเป็น 'Expired'",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#fab387]">'Expired'</span>;
</>
),
evaluate: (data) => data.filter(r => r.status === 'Expired').map(r => r.id)
},
complex: {
id: 'complex',
icon: <AlertOctagon size={18} />,
title: "3. ลบแบบซับซ้อน (AND)",
desc: "ลบหมวด 'Food' ที่สต็อกเหลือ 0",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> category = <span className="text-[#fab387]">'Food'</span> <br/>
<span className="text-[#cba6f7] font-bold ml-8">AND</span> stock = <span className="text-[#89b4fa]">0</span>;
</>
),
evaluate: (data) => data.filter(r => r.category === 'Food' && r.stock === 0).map(r => r.id)
}
};

const handleExecuteDelete = () => {
if (products.length === 0) {
showToast('ไม่มีข้อมูลเหลืออยู่ในตารางแล้ว กรุณารีเซ็ตตาราง', 'warning');
return;
}

    setIsAnimating(true);
    const targetIds = scenarios[activeScenario].evaluate(products);

    if (targetIds.length === 0) {
      showToast('ไม่พบข้อมูลที่ตรงกับเงื่อนไขนี้ในตาราง', 'warning');
      setIsAnimating(false);
      return;
    }

    // Step 1: Highlight rows to be deleted (simulating processing)
    setHighlightedRows(targetIds);

    // Step 2: Actually remove them after animation
    setTimeout(() => {
      const remainingProducts = products.filter(p => !targetIds.includes(p.id));
      setProducts(remainingProducts);
      setHighlightedRows([]);
      setIsAnimating(false);
      showToast(`ลบข้อมูลสำเร็จจำนวน ${targetIds.length} แถว`, 'success');
    }, 800);

};

const resetSimulator = () => {
setProducts([...initialProducts]);
setHighlightedRows([]);
showToast('รีเซ็ตตารางข้อมูลคลังสินค้าเรียบร้อย', 'success');
};

const handleScenarioChange = (key) => {
setActiveScenario(key);
};

// Game: DELETE FROM products WHERE status = 'Damaged' AND stock = 0
const gameBlocks = [
{ id: 'b1', text: 'DELETE', type: 'cmd' },
{ id: 'b2', text: 'FROM products', type: 'col' },
{ id: 'b3', text: 'WHERE', type: 'logic' },
{ id: 'b4', text: "status = 'Damaged'", type: 'cond' },
{ id: 'b5', text: 'AND', type: 'logic' },
{ id: 'b6', text: 'stock = 0', type: 'cond' },
{ id: 't1', text: ',', type: 'trick' }, // Trick from UPDATE SET
{ id: 't2', text: '*', type: 'trick' }, // Trick from SELECT
];

const [dropzones, setDropzones] = useState(Array(6).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 6 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t1')) {
      showToast('ผิดพลาด! ในเงื่อนไข WHERE ต้องเชื่อมด้วย AND หรือ OR ห้ามใช้เครื่องหมายลูกน้ำ (,) เด็ดขาด', 'error');
      return;
    }
    if (ans.includes('t2')) {
      showToast('ผิดพลาด! คำสั่ง DELETE ไม่ต้องใส่ดอกจัน (*) เพราะมันลบข้อมูลทั้งแถวอยู่แล้ว', 'error');
      return;
    }

    // Check sequence: DELETE -> FROM -> WHERE -> (cond AND cond) or (cond AND cond - flipped)
    const isValidBase = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3';
    const isValidLogic1 = ans[3] === 'b4' && ans[4] === 'b5' && ans[5] === 'b6'; // status = 'Damaged' AND stock = 0
    const isValidLogic2 = ans[3] === 'b6' && ans[4] === 'b5' && ans[5] === 'b4'; // stock = 0 AND status = 'Damaged'

    if (isValidBase && (isValidLogic1 || isValidLogic2)) {
      showToast('ถูกต้องและแม่นยำมาก! คุณเข้าใจโครงสร้าง DELETE WHERE ที่ซับซ้อนแล้ว', 'success');
    } else {
       showToast('ลำดับคำสั่งยังไม่ถูกต้อง ลองตรวจสอบโครงสร้างพื้นฐานและการเชื่อมเงื่อนไขดูอีกครั้ง', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(6).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/* Header */}
<header className="bg-gradient-to-r from-rose-700 to-slate-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm shadow-inner border border-white/20">
<Trash2 className="text-rose-300" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-rose-200 opacity-90">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-rose-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-400/50 backdrop-blur-md shadow-inner text-white tracking-wide">
Unit 3.9 การลบข้อมูล (DELETE WHERE)
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full mb-2">
               <XCircle className="text-rose-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              กำจัดข้อมูลที่ซ่อนอยู่ด้วย <span className="text-rose-600">DELETE WHERE</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              หลังจากที่เราแน่ใจแล้วว่าข้อมูลใดควรถูกลบ การเขียนเงื่อนไข <strong>WHERE</strong> ให้แม่นยำคือสิ่งสำคัญที่สุด
              คุณสามารถใช้ตัวดำเนินการอย่าง <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-700 font-mono">AND</code> หรือ <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-700 font-mono">OR</code> เพื่อเจาะจงเป้าหมายให้ชัดเจนขึ้น เหมือนการล็อคเป้าก่อนกดยิง
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10"></div>
                <div className="bg-rose-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-rose-200"><Code2 className="text-rose-700"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">โครงสร้างคำสั่ง (Syntax)</h3>
                <p className="text-sm text-slate-600 mb-4">ระบุชื่อตาราง และตามด้วยเงื่อนไขเพื่อหา <strong>"แถว"</strong> ที่ต้องการลบ</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 leading-relaxed">
                  <span className="text-rose-400 font-bold">DELETE FROM</span> <span className="text-emerald-300">table_name</span><br/>
                  <span className="text-purple-400 font-bold">WHERE</span> <span className="text-slate-300">condition1</span> <span className="text-blue-400 font-bold">AND</span> <span className="text-slate-300">condition2</span>;
                </div>
             </div>

             <div className="bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-rose-100"><AlertTriangle className="text-rose-600"/></div>
                <h3 className="font-bold text-rose-900 mb-2 text-lg">ข้อควรระวัง (Traps)</h3>
                <ul className="space-y-3 text-sm text-rose-800">
                  <li className="flex items-start gap-2">
                    <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5"/>
                    <span><strong>ห้ามใช้ * (ดอกจัน):</strong> DELETE ทำงานระดับแถว ไม่ต้องระบุคอลัมน์ (ห้ามใช้ <code>DELETE * FROM...</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5"/>
                    <span><strong>ห้ามใช้ลูกน้ำ ( , ) ใน WHERE:</strong> ถ้ามีหลายเงื่อนไข ให้เชื่อมด้วย <code>AND</code> หรือ <code>OR</code> เท่านั้น</span>
                  </li>
                </ul>
             </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-lg shadow-sm border border-rose-200"><Database className="text-rose-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: Data Cleanup</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-rose-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm">
              <RefreshCcw size={16} /> โหลดตารางสินค้าใหม่
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 min-h-[450px]">

            {/* Sidebar: Scenarios */}
            <div className="flex flex-col bg-slate-50 md:w-80 shrink-0 border-r border-slate-200 z-10">
                <div className="px-5 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 bg-slate-100/50">
                  <Layers size={14}/> เลือกเงื่อนไขการลบ
                </div>
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleScenarioChange(key)}
                      disabled={isAnimating}
                      className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                        ${isActive ? 'bg-white border-rose-500 shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10' : 'border-transparent hover:bg-white/60'}
                        ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}`}>
                        {scenarios[key].icon}
                      </div>
                      <div>
                        <div className={`font-bold text-sm mb-1 ${isActive ? 'text-rose-700' : 'text-slate-700'}`}>{scenarios[key].title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{scenarios[key].desc}</div>
                      </div>
                    </button>
                  )
                })}
            </div>

            {/* Main Content Area: SQL & Table */}
            <div className="flex-1 flex flex-col relative bg-white">
              {/* Top: SQL Command */}
              <div className="bg-[#1e1e2e] p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div className="font-mono text-base md:text-lg leading-[1.8] overflow-x-auto w-full">
                    <div key={activeScenario} className="animate-in fade-in slide-in-from-left-4 duration-300">
                      {scenarios[activeScenario].sql}
                    </div>
                 </div>
                 <button
                    onClick={handleExecuteDelete}
                    disabled={isAnimating || products.length === 0}
                    className={`shrink-0 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
                      ${isAnimating || products.length === 0
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:-translate-y-0.5 active:translate-y-0'}`}
                  >
                    <Trash2 size={18} /> {isAnimating ? 'Executing...' : 'Run DELETE'}
                  </button>
              </div>

              {/* Bottom: Table Display */}
              <div className="p-6 flex-1 bg-slate-50/50 overflow-y-auto relative">
                <h3 className="font-bold text-slate-700 flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2"><Table2 size={20} className="text-indigo-600"/> ตาราง สินค้า (Products)</span>
                  <span className="text-xs font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                    Total Rows: {products.length}
                  </span>
                </h3>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {products.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center h-48">
                      <Database size={40} className="mb-3 opacity-20" />
                      <p>ตารางว่างเปล่า (Empty Table)</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="p-3 font-semibold w-16 text-center">ID</th>
                          <th className="p-3 font-semibold">Name</th>
                          <th className="p-3 font-semibold text-center">Category</th>
                          <th className="p-3 font-semibold text-right">Stock</th>
                          <th className="p-3 font-semibold text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((row) => {
                          const isTarget = highlightedRows.includes(row.id);

                          // Animation classes for deleting
                          let rowClasses = "transition-all duration-700 ease-in-out ";
                          if (isTarget) {
                            rowClasses += "bg-rose-100 text-rose-900 border-l-4 border-rose-500 opacity-0 scale-y-50 -translate-x-4";
                          } else {
                            rowClasses += "bg-white hover:bg-slate-50 border-l-4 border-transparent opacity-100";
                          }

                          return (
                            <tr key={row.id} className={rowClasses}>
                              <td className="p-3 font-mono text-xs text-slate-400 text-center font-semibold">
                                {isTarget ? <XCircle size={14} className="mx-auto text-rose-500 animate-pulse"/> : row.id}
                              </td>
                              <td className={`p-3 font-medium ${isTarget ? 'line-through text-rose-500' : 'text-slate-700'}`}>{row.name}</td>
                              <td className="p-3 text-center">
                                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                  {row.category}
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono font-medium text-slate-600 pr-4">
                                 {row.stock}
                              </td>
                              <td className="p-3 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider
                                  ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                    row.status === 'Expired' ? 'bg-amber-100 text-amber-700' :
                                    row.status === 'Damaged' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-indigo-100 p-2.5 rounded-xl shadow-sm border border-indigo-200"><Layers className="text-indigo-600" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Logic Challenge: สร้างเงื่อนไขสุดหิน</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบการประกอบคำสั่ง DELETE ที่มีหลายเงื่อนไข (AND)</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <Trash2 className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-indigo-300 font-bold text-xl mb-2">ภารกิจ: เคลียร์สินค้าชำรุด</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อ <strong>ลบข้อมูล</strong> สินค้าที่สถานะชำรุด (<code className="text-rose-300 bg-slate-900 px-1 rounded">status = 'Damaged'</code>) <strong>และ</strong> สต็อกหมดแล้ว (<code className="text-rose-300 bg-slate-900 px-1 rounded">stock = 0</code>)<br/>
                    <span className="text-sm text-slate-400 mt-1 block">*ระวังบล็อกหลอกที่ไม่ควรใช้ในคำสั่ง DELETE</span>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-wrap gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-rose-500/50' : 'bg-indigo-600 text-white shadow-lg border border-indigo-500 hover:-translate-y-1 hover:shadow-indigo-500/50')
                          : 'min-w-[100px] flex-1 bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <div className="h-14 flex items-end pb-2">
                    <span className="text-slate-500 font-mono text-3xl font-bold leading-none">;</span>
                  </div>
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-5 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-3 rounded-xl font-mono text-sm font-bold shadow-sm transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-50 cursor-not-allowed scale-95'
                            : block.type === 'trick' ? 'bg-slate-800 text-rose-300 border-rose-900/50 hover:bg-rose-900/40 hover:text-rose-200 hover:border-rose-500 cursor-pointer text-lg'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-md cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบคำสั่ง
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}