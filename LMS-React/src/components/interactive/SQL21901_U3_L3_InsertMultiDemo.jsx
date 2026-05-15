import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  MousePointerClick,
  RefreshCcw,
  Code2,
  HelpCircle,
  Lightbulb,
  Plus,
  Trash2,
  Layers,
  CopyPlus
  } from 'lucide-react';

export default function SQL21901_U3_L3_InsertMultiDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
};

// --- Simulator State ---
const initialTableData = [
{ prod_id: 'P001', name: 'อเมริกาโน่', category: 'Coffee', price: 50 },
{ prod_id: 'P002', name: 'ชาเขียวมะลิ', category: 'Tea', price: 45 },
];

const [tableData, setTableData] = useState(initialTableData);
const [hasExecuted, setHasExecuted] = useState(false);

// ชุดข้อมูลจำลองสำหรับให้ผู้เรียนเพิ่ม
const [draftRows, setDraftRows] = useState([
{ id: Date.now(), name: 'ลาเต้', category: 'Coffee', price: 60 },
{ id: Date.now() + 1, name: 'โกโก้', category: 'Milk', price: 55 }
]);

const [liveQuery, setLiveQuery] = useState('');

// อัปเดตคำสั่ง SQL Preview ตามข้อมูลใน Draft
useEffect(() => {
if (draftRows.length === 0) {
setLiveQuery('-- กรุณาเพิ่มข้อมูลอย่างน้อย 1 แถว');
return;
}

    const values = draftRows.map(row =>
      `  ('${row.name}', '${row.category}', ${row.price || 0})`
    ).join(',\n');

    setLiveQuery(`INSERT INTO products (name, category, price)\nVALUES \n${values};`);
    setHasExecuted(false);

}, [draftRows]);

const handleAddRow = () => {
if (draftRows.length >= 5) {
showToast('สามารถจำลองการเพิ่มข้อมูลได้สูงสุด 5 แถวพร้อมกันครับ', 'error');
return;
}
setDraftRows([
...draftRows,
{ id: Date.now(), name: '', category: 'Other', price: '' }
]);
};

const handleRemoveRow = (id) => {
if (draftRows.length <= 1) {
showToast('ต้องมีข้อมูลอย่างน้อย 1 แถว', 'error');
return;
}
setDraftRows(draftRows.filter(row => row.id !== id));
};

const handleRowChange = (id, field, value) => {
setDraftRows(draftRows.map(row =>
row.id === id ? { ...row, [field]: value } : row
));
};

const executeQuery = () => {
// Validate
const hasEmpty = draftRows.some(r => r.name.trim() === '' || String(r.price).trim() === '');
if (hasEmpty) {
showToast('กรุณากรอกข้อมูล ชื่อสินค้า และ ราคา ให้ครบทุกแถวก่อนรันคำสั่ง', 'error');
return;
}

    // Generate new ID and merge
    const newRows = draftRows.map((row, index) => ({
      prod_id: `P${String(tableData.length + index + 1).padStart(3, '0')}`,
      name: row.name,
      category: row.category,
      price: Number(row.price)
    }));

    setTableData([...initialTableData, ...newRows]);
    setHasExecuted(true);
    showToast(`เพิ่มข้อมูล ${draftRows.length} แถว สำเร็จ! (ใช้ 1 คำสั่ง)`, 'success');

};

const resetSimulator = () => {
setTableData(initialTableData);
setHasExecuted(false);
setDraftRows([
{ id: Date.now(), name: 'ลาเต้', category: 'Coffee', price: 60 },
{ id: Date.now() + 1, name: 'โกโก้', category: 'Milk', price: 55 }
]);
};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'INSERT INTO', type: 'cmd' },
{ id: 'b2', text: 'VALUES', type: 'kw' },
{ id: 'b3', text: "('ชาไทย', 40)", type: 'val' },
{ id: 'b4', text: ',', type: 'comma' },
{ id: 'b5', text: "('นมสด', 35)", type: 'val' },
{ id: 't1', text: 'AND', type: 'trick' }, // Trick
{ id: 't2', text: 'VALUES', type: 'trick' }, // Trick duplicate
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      // Auto move to next empty zone
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
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check trick
    if (ans.includes('t1')) {
      showToast('ผิดครับ! ใน SQL เราใช้จุลภาค (,) คั่นระหว่างวงเล็บข้อมูล ไม่ใช้คำว่า AND', 'error');
      return;
    }

    // Error analysis
    if (ans[0] !== 'b1') {
      showToast('คำสั่งแรกต้องเริ่มด้วย INSERT INTO เสมอครับ', 'error');
      return;
    }
    if (ans[1] !== 'b2' && ans[1] !== 't2') {
      showToast('หลังจากบอกตารางแล้ว ต้องตามด้วยคีย์เวิร์ดบอกว่าจะเพิ่มข้อมูล (VALUES)', 'error');
      return;
    }
    if (ans[3] !== 'b4') {
      showToast('เครื่องหมายลูกน้ำ (,) ต้องอยู่ตรงกลางเพื่อเชื่อมข้อมูล 2 ชุดเข้าด้วยกันครับ', 'error');
      return;
    }

    // Correct Answer Check (Order of b3 and b5 doesn't matter)
    const isVal1Valid = ans[2] === 'b3' || ans[2] === 'b5';
    const isVal2Valid = ans[4] === 'b3' || ans[4] === 'b5';
    const isUniqueVals = ans[2] !== ans[4];

    if (ans[0] === 'b1' && (ans[1] === 'b2' || ans[1] === 't2') && ans[3] === 'b4' && isVal1Valid && isVal2Valid && isUniqueVals) {
      showToast('ยอดเยี่ยมมาก! การใส่ข้อมูลหลายแถวแบบนี้ช่วยลดเวลาทำงานได้เยอะเลย 🎉', 'success');
    } else {
      showToast('ยังมีบางจุดไม่ถูกต้อง ลองเรียงลำดับดูใหม่นะ', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (

<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/* Header */}
<header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Layers className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-md shadow-inner">
Unit 3.3 การเพิ่มข้อมูลหลายแถว
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
              1. ทำไมต้องเพิ่มข้อมูลหลายแถวพร้อมกัน?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              แทนที่เราจะเขียนคำสั่ง <code className="bg-slate-200 px-1.5 rounded text-indigo-700">INSERT INTO</code> ซ้ำๆ หลายครั้ง
              SQL อนุญาตให้เราเพิ่มข้อมูลหลายแถวใน <strong>"คำสั่งเดียว"</strong> โดยใช้ <strong className="text-rose-500 text-xl">, (Comma)</strong> คั่น
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
                <h3 className="font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <AlertCircle size={20}/> แบบเดิม (เขียนซ้ำๆ)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed">
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> ('ชาเขียว');<br/><br/>
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> ('ชาไทย');<br/><br/>
                  <span className="text-slate-400">-- ต้องคุยกับ Database หลายรอบ ช้า!</span>
                </pre>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20}/> แบบหลายแถว (ดีกว่า)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-emerald-100">
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> <br/>
                  &nbsp;&nbsp;('ชาเขียว')<span className="text-rose-500 font-bold text-lg">,</span><br/>
                  &nbsp;&nbsp;('ชาไทย');<br/><br/>
                  <span className="text-emerald-500">-- คุยรอบเดียว ส่งข้อมูลได้ครบ เร็วและสั้น!</span>
                </pre>
             </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><CopyPlus className="text-blue-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Multi-Row Insert</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Input Form */}
            <div className="w-full lg:w-5/12 bg-slate-50 border-r border-slate-200 p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800">
                  เตรียมชุดข้อมูล (VALUES)
                </h3>
                <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {draftRows.length} / 5 แถว
                </span>
              </div>

              <div className="space-y-3 flex-grow overflow-y-auto pr-2 max-h-[350px]">
                {draftRows.map((row, idx) => (
                  <div key={row.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative animate-in fade-in slide-in-from-left-2">
                    <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <input
                        type="text"
                        placeholder="ชื่อสินค้า..."
                        value={row.name}
                        onChange={(e) => handleRowChange(row.id, 'name', e.target.value)}
                        className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                      />
                      <input
                        type="number"
                        placeholder="ราคา..."
                        value={row.price}
                        onChange={(e) => handleRowChange(row.id, 'price', e.target.value)}
                        className="w-1/3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                      />
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={draftRows.length <= 1}
                        className="w-1/6 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={handleAddRow}
                  disabled={draftRows.length >= 5}
                  className="flex-1 bg-white border-2 border-dashed border-indigo-200 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> เพิ่มแถวข้อมูล
                </button>
              </div>
            </div>

            {/* Right: Preview & Table */}
            <div className="w-full lg:w-7/12 flex flex-col bg-white">
              {/* Live Preview */}
              <div className="bg-[#1e1e2e] p-6 text-slate-300 relative border-b-4 border-indigo-500">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-mono text-sm text-indigo-300 flex items-center gap-2">
                    <Code2 size={16} /> SQL Preview
                  </h3>
                  {hasExecuted && (
                    <button onClick={resetSimulator} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors">
                      <RefreshCcw size={12} /> รีเซ็ตตาราง
                    </button>
                  )}
                </div>
                <pre className="font-mono text-[15px] leading-relaxed">
                  <span className="text-[#cba6f7]">INSERT INTO</span> <span className="text-[#f9e2af]">products</span> (name, category, price){'\n'}
                  <span className="text-[#cba6f7]">VALUES</span>{'\n'}
                  {draftRows.map((row, i) => (
                    <span key={row.id}>
                      <span className="text-[#a6e3a1]">  ('{row.name || '?'}'</span>, <span className="text-[#a6e3a1]">'Other'</span>, <span className="text-[#fab387]">{row.price || 0}</span>)
                      {i < draftRows.length - 1 ? <span className="text-rose-400 font-bold text-lg">,</span> : <span className="text-slate-400">;</span>}
                      {'\n'}
                    </span>
                  ))}
                </pre>

                {!hasExecuted && (
                  <button
                    onClick={executeQuery}
                    className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-bold py-2 px-5 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Play size={16} fill="currentColor" /> Execute
                  </button>
                )}
              </div>

              {/* Table Output */}
              <div className="p-6 bg-slate-50 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Table2 size={18} className="text-indigo-600" /> ตาราง products
                  </h3>
                  <span className="text-xs font-mono bg-white px-2 py-1 rounded-md border border-slate-200 text-slate-500">
                    Total: {tableData.length} rows
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white max-h-[300px]">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="sticky top-0 bg-slate-100 z-10">
                      <tr className="text-slate-600">
                        <th className="p-3 border-b border-slate-200 font-semibold w-24">prod_id</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">name</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">category</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((prod, idx) => (
                        <tr key={idx} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${hasExecuted && idx >= initialTableData.length ? 'bg-indigo-50/50 animate-in fade-in' : ''}`}>
                          <td className="p-3 font-mono text-xs text-slate-500">{prod.prod_id}</td>
                          <td className={`p-3 font-medium ${hasExecuted && idx >= initialTableData.length ? 'text-indigo-700' : 'text-slate-800'}`}>
                            {prod.name}
                            {hasExecuted && idx >= initialTableData.length && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">New</span>}
                          </td>
                          <td className="p-3 text-slate-600">
                            <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs">{prod.category}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-700">฿{prod.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><Blocks className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <HelpCircle className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: สั่งออเดอร์รวดเดียว!</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    จงประกอบบล็อกคำสั่ง SQL เพื่อเพิ่มข้อมูลเมนู <span className="text-white font-bold bg-indigo-600/50 px-2 py-0.5 rounded">'ชาไทย'</span> และ <span className="text-white font-bold bg-indigo-600/50 px-2 py-0.5 rounded">'นมสด'</span> ลงในตารางให้อยู่ภายใน <strong>1 คำสั่ง</strong>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับซ้ายไปขวา:</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-black/50 p-5 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[80px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                        ${idx === 3 && !block ? 'min-w-[50px]' : ''} /* Make comma slot smaller if empty */
                      `}
                    >
                      {block ? block.text : (idx === 3 ? '?' : `ส่วนที่ ${idx + 1}`)}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง:</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> คืนค่า
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-30 cursor-not-allowed shadow-none scale-95'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-95 cursor-pointer'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-slate-700 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20'
            : 'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

/* Helper Component for icon not in lucide standard bundle sometimes */
function Blocks(props) {
return (
<svg
{...props}
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round" >
<rect width="7" height="7" x="14" y="3" rx="1" />
<path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
</svg>
)
}