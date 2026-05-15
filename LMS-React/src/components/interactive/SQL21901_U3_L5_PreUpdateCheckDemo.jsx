import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  HelpCircle,
  Copy,
  AlertTriangle,
  Eye,
  ShieldAlert,
  ArrowRight,
  DatabaseBackup
  } from 'lucide-react';

export default function SQL21901_U3_L5_PreUpdateCheckDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialProducts = [
{ id: 'P01', name: 'MacBook Air', category: 'IT', price: 35000, originalPrice: 35000 },
{ id: 'P02', name: 'Logitech Mouse', category: 'IT', price: 900, originalPrice: 900 },
{ id: 'P03', name: 'Office Desk', category: 'Furniture', price: 4500, originalPrice: 4500 },
{ id: 'P04', name: 'Ergo Chair', category: 'Furniture', price: 8900, originalPrice: 8900 },
{ id: 'P05', name: 'Mechanical Keyboard', category: 'IT', price: 3200, originalPrice: 3200 },
];

const [products, setProducts] = useState(initialProducts);
const [highlightedRows, setHighlightedRows] = useState([]);
const [simMode, setSimMode] = useState('SELECT'); // 'SELECT' | 'UPDATE'
const [selectedCondition, setSelectedCondition] = useState("category = 'IT'");
const [isAnimating, setIsAnimating] = useState(false);
const [isDisaster, setIsDisaster] = useState(false);
const [updateCount, setUpdateCount] = useState(0);

// --- Simulator Logic ---
const conditionEvaluators = {
"category = 'IT'": (row) => row.category === 'IT',
"price < 5000": (row) => row.price < 5000,
"NONE": (row) => true, // No WHERE clause
};

const handlePreview = () => {
setIsAnimating(true);
setHighlightedRows([]);
setIsDisaster(false);

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      const matchedIds = products.filter(conditionFunc).map(p => p.id);

      setHighlightedRows(matchedIds);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        showToast(`ระวัง! คำสั่ง SELECT นี้ดึงข้อมูลมาทั้งหมด ${matchedIds.length} แถว เพราะไม่มีเงื่อนไข WHERE`, 'warning');
      } else {
        showToast(`Preview: พบข้อมูลที่เข้าเงื่อนไขจำนวน ${matchedIds.length} แถว`, 'success');
      }
    }, 600);

};

const handleUpdate = () => {
setIsAnimating(true);
setHighlightedRows([]);

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      let affectedRows = 0;

      const newProducts = products.map(product => {
        if (conditionFunc(product)) {
          affectedRows++;
          return { ...product, price: product.price + 500 }; // Increase price by 500
        }
        return product;
      });

      setProducts(newProducts);
      setUpdateCount(prev => prev + 1);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        setIsDisaster(true);
        showToast(`🚨 หายนะ! คุณลืมใส่ WHERE สินค้าทั้งหมด ${affectedRows} รายการถูกปรับราคาขึ้นไปมั่วหมดเลย!`, 'error');
      } else {
        const matchedIds = newProducts.filter(conditionFunc).map(p => p.id);
        setHighlightedRows(matchedIds); // Highlight updated rows
        showToast(`อัปเดตข้อมูลสำเร็จ! สินค้าถูกปรับราคาขึ้นจำนวน ${affectedRows} แถว อย่างปลอดภัย`, 'success');
      }
    }, 800);

};

const resetSimulator = () => {
setProducts(initialProducts);
setHighlightedRows([]);
setIsDisaster(false);
setUpdateCount(0);
};

const gameBlocks = [
{ id: 'b1', text: 'UPDATE', type: 'cmd' },
{ id: 'b2', text: 'products', type: 'table' },
{ id: 'b3', text: "SET price = 0", type: 'cmd2' },
{ id: 'b4', text: 'WHERE', type: 'cond' },
{ id: 'b5', text: "status = 'obsolete'", type: 'cond2' },
{ id: 't1', text: 'SELECT * FROM', type: 'trick' },
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
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
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t1')) {
      showToast('ผิดครับ! ในคำสั่งแก้ไขข้อมูล เราจะใช้แค่ UPDATE เท่านั้น ไม่ใช้ SELECT ตรงนี้', 'error');
      return;
    }

    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      showToast('ถูกต้องสมบูรณ์! นี่คือโครงสร้าง UPDATE ที่ปลอดภัยและมี WHERE เสมอ 🎉', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> ตาราง -> SET -> WHERE -> เงื่อนไข', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 transition-colors duration-500">
{/* Background Red Flash on Disaster */}
{isDisaster && <div className="fixed inset-0 bg-red-500/10 pointer-events-none z-0 animate-pulse"></div>}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <ShieldAlert className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
              <p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="bg-rose-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-400/50 backdrop-blur-md shadow-inner text-white">
              Unit 3.5 การตรวจสอบก่อนแก้ไข
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12 relative z-10">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              1. กฎเหล็ก: <span className="text-rose-600">"ดูให้แน่ ก่อนแก้ข้อมูล"</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              คำสั่ง <code className="bg-amber-100 text-amber-800 px-1.5 rounded font-bold">UPDATE</code> และ <code className="bg-rose-100 text-rose-800 px-1.5 rounded font-bold">DELETE</code> เป็นคำสั่งที่อันตรายที่สุด! หากคุณลืมใส่เงื่อนไข <code className="bg-slate-200 px-1.5 rounded font-bold">WHERE</code> ข้อมูลทั้งตารางจะถูกเปลี่ยนหรือถูกลบไปทั้งหมด ดังนั้นมืออาชีพจะใช้คำสั่ง <code className="bg-blue-100 text-blue-800 px-1.5 rounded font-bold">SELECT</code> เพื่อดูหน้าตาข้อมูลก่อนแก้ไขเสมอ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
             <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Eye size={100} /></div>
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  PREVIEW ขั้นตอนตรวจสอบ (ปลอดภัย)
                </h3>
                <pre className="text-sm font-mono text-slate-700 bg-white p-4 rounded-xl leading-relaxed border border-blue-100 shadow-inner">
                  <span className="text-blue-600 font-bold">SELECT</span> * <br/>
                  <span className="text-blue-600 font-bold">FROM</span> products <br/>
                  <span className="text-indigo-600 font-bold">WHERE</span> category = 'IT';
                </pre>
                <p className="mt-4 text-sm text-blue-700 font-medium">✨ ตรวจสอบดูว่า 2-3 แถวที่จะโผล่มานี้ คือสิ่งที่เราต้องการแก้ไขจริงๆ ใช่หรือไม่?</p>
             </div>

             <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={100} /></div>
                <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  EXECUTE ขั้นตอนแก้ไขจริง
                </h3>
                <pre className="text-sm font-mono text-slate-700 bg-white p-4 rounded-xl leading-relaxed border border-amber-100 shadow-inner">
                  <span className="text-amber-600 font-bold">UPDATE</span> products <br/>
                  <span className="text-amber-600 font-bold">SET</span> price = price + 500 <br/>
                  <span className="text-rose-600 font-bold border-b-2 border-rose-400 border-dashed">WHERE category = 'IT';</span>
                </pre>
                <p className="mt-4 text-sm text-amber-800 font-medium">⚠️ ก็อปปี้เงื่อนไข WHERE จากคำสั่ง SELECT มาวางได้เลย มั่นใจได้ว่าแก้ถูกแถวชัวร์!</p>
             </div>
          </div>
        </section>

        {/* Section 2: Simulator */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg"><DatabaseBackup className="text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Safe Update Practice</h2>
            </div>
            {updateCount > 0 && (
              <button onClick={resetSimulator} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-1.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
                <RefreshCcw size={14} /> รีเซ็ตข้อมูลกลับค่าเริ่มต้น
              </button>
            )}
          </div>

          <p className="text-slate-600 max-w-3xl">
            <strong>ภารกิจ:</strong> ผู้จัดการสั่งให้ <u className="underline-offset-4 decoration-wavy decoration-indigo-400 font-semibold">ปรับราคาสินค้าหมวด IT ขึ้นชิ้นละ 500 บาท</u> เลือกลอง Preview ดูข้อมูลก่อน แล้วค่อยกดสลับโหมดไป Update จริง (ลองเลือกแบบไม่มีเงื่อนไขดูได้เพื่อดูสิ่งที่จะเกิดขึ้น)
          </p>

          <div className={`bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border-2 transition-colors duration-500 ${isDisaster ? 'border-rose-500 shadow-rose-500/20' : 'border-slate-200'}`}>

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Tab Selector */}
              <div className="flex flex-row md:flex-col bg-slate-900 md:w-48 shrink-0">
                 <button
                   onClick={() => { setSimMode('SELECT'); setHighlightedRows([]); }}
                   className={`flex-1 md:flex-none text-left px-4 py-4 font-bold text-sm flex items-center gap-2 transition-colors
                     ${simMode === 'SELECT' ? 'bg-[#1e1e2e] text-blue-400 border-b-2 md:border-b-0 md:border-l-4 border-blue-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <Eye size={16} /> 1. PREVIEW
                 </button>
                 <button
                   onClick={() => { setSimMode('UPDATE'); setHighlightedRows([]); }}
                   className={`flex-1 md:flex-none text-left px-4 py-4 font-bold text-sm flex items-center gap-2 transition-colors
                     ${simMode === 'UPDATE' ? 'bg-[#1e1e2e] text-amber-400 border-b-2 md:border-b-0 md:border-l-4 border-amber-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <AlertTriangle size={16} /> 2. UPDATE
                 </button>
              </div>

              {/* Code Editor Area */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-sm leading-loose overflow-x-auto w-full">
                  {simMode === 'SELECT' ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-[#89b4fa] font-bold">SELECT</span> * <span className="text-[#89b4fa] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
                      {selectedCondition !== "NONE" && <span className="text-[#cba6f7] font-bold">WHERE</span>}
                      <select
                        value={selectedCondition}
                        onChange={(e) => { setSelectedCondition(e.target.value); setHighlightedRows([]); setIsDisaster(false); }}
                        className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 outline-none focus:border-blue-400"
                      >
                        <option value="category = 'IT'">category = 'IT'</option>
                        <option value="price < 5000">price &lt; 5000</option>
                        <option value="NONE">(ไม่มีเงื่อนไข - อันตราย!)</option>
                      </select>
                      <span className="text-slate-400">;</span>
                      <p className="mt-3 text-xs text-slate-500 border-t border-slate-700/50 pt-2 flex items-center gap-1.5"><HelpCircle size={12}/> กด Preview Data เพื่อดูแถวที่ได้รับผลกระทบจากเงื่อนไขที่คุณเลือก</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">products</span> <br className="md:hidden"/>
                      <span className="text-[#f9e2af] font-bold">SET</span> price = price + <span className="text-[#fab387]">500</span><br/>

                      {selectedCondition !== "NONE" ? (
                        <>
                          <span className="text-[#cba6f7] font-bold">WHERE</span>
                          <span className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 select-none opacity-80 cursor-not-allowed">
                            {selectedCondition}
                          </span>
                        </>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold animate-pulse">-- ไม่มี WHERE Clause! --</span>
                      )}

                      <span className="text-slate-400">;</span>
                      <p className="mt-3 text-xs text-amber-500/70 border-t border-slate-700/50 pt-2 flex items-center gap-1.5"><AlertTriangle size={12}/> นี่คือการเปลี่ยนแปลงข้อมูลจริง หากเงื่อนไขกว้างเกินไป ข้อมูลที่ไม่เกี่ยวข้องจะถูกแก้ไขด้วย</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end border-t border-slate-700/50 pt-3">
                  {simMode === 'SELECT' ? (
                    <button
                      onClick={handlePreview}
                      disabled={isAnimating}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      <Eye size={18} /> {isAnimating ? 'กำลังค้นหา...' : 'Preview Data'}
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      disabled={isAnimating || (selectedCondition === "NONE" && isDisaster)} // Disable if already ruined
                      className={`font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none
                        ${selectedCondition === 'NONE' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-lg shadow-amber-500/30'}
                      `}
                    >
                      <Play size={18} fill="currentColor" /> {isAnimating ? 'Executing...' : (selectedCondition === 'NONE' ? 'Execute (DANGER!)' : 'Execute Update')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom: Visual Table */}
            <div className={`p-6 bg-slate-50 transition-colors duration-500 ${isDisaster ? 'bg-rose-50/50' : ''}`}>
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={18} className="text-indigo-500"/> ตาราง Products</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-3 border-b font-semibold w-16">ID</th>
                        <th className="p-3 border-b font-semibold">Name</th>
                        <th className="p-3 border-b font-semibold">Category</th>
                        <th className="p-3 border-b font-semibold text-right">Price (THB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const isPriceChanged = row.price !== row.originalPrice;

                        // Styling logic based on mode and state
                        let rowClasses = "transition-all duration-500 ";
                        let priceClasses = "text-right p-3 font-mono text-sm font-medium transition-colors ";

                        if (isHighlighted) {
                          if (simMode === 'SELECT') {
                            rowClasses += "bg-blue-50 ";
                            priceClasses += "text-slate-700";
                          } else {
                            if (isDisaster) {
                              rowClasses += "bg-rose-100 ";
                              priceClasses += "text-rose-700 font-bold scale-110 transform origin-right";
                            } else {
                              rowClasses += "bg-emerald-50 ";
                              priceClasses += "text-emerald-700 font-bold scale-110 transform origin-right";
                            }
                          }
                        } else {
                           rowClasses += "bg-white hover:bg-slate-50";
                           if(isPriceChanged) priceClasses += "text-amber-600"; // Keep changed ones somewhat colored if focus lost
                           else priceClasses += "text-slate-600";
                        }

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-3 font-mono text-xs text-slate-400">{row.id}</td>
                            <td className="p-3 font-medium text-slate-800">{row.name}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                                ${row.category === 'IT' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
                              `}>{row.category}</span>
                            </td>
                            <td className={priceClasses}>
                              <div className="flex flex-col items-end justify-center h-full">
                                {isPriceChanged && (
                                   <span className="text-[10px] text-slate-400 line-through mb-0.5 leading-none">
                                     {row.originalPrice.toLocaleString()}
                                   </span>
                                )}
                                <span>{row.price.toLocaleString()}</span>
                              
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-emerald-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <CheckCircle2 className="text-emerald-950" size={24} />
                </div>
                <div>
                  <h3 className="text-emerald-300 font-bold text-lg mb-1">ภารกิจ: ล้างสต๊อกสินค้าเก่า</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    สมมติว่าคุณรัน <code>SELECT * FROM products WHERE status = 'obsolete'</code> ดูหน้าตาข้อมูลแล้วถูกต้อง<br/>
                    จงประกอบบล็อกคำสั่ง <strong className="text-amber-400">UPDATE</strong> เพื่อปรับลดราคา (price = 0) ให้กับสินค้ากลุ่มนั้น
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับคำสั่งที่ปลอดภัย:</p>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? 'bg-amber-500 text-amber-950 shadow-lg border border-amber-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[100px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-amber-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง (มีตัวหลอกซ่อนอยู่):</p>
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
                            : block.type === 'trick' ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-400 cursor-pointer'
                            : block.type === 'table' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-400 hover:-translate-y-1 cursor-pointer hover:shadow-amber-500/20 active:scale-95'}
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
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
    </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
               {isDisaster && (
                 <div className="mt-4 p-4 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <ShieldAlert className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">จำลองความเสียหายสำเร็จ!</h4>
                      <p className="text-sm mt-1">นี่คือเหตุผลที่ต้องรัน SELECT ก่อนเสมอ สินค้าที่ไม่ใช่ IT เช่น เก้าอี้ โต๊ะ ถูกบวกราคาเพิ่มไปหมดแล้วในระบบจริง! กรุณากดปุ่มรีเซ็ตด้านบนเพื่อแก้ไขให้ถูกต้อง</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </section>

        {/* Section 3: Minigame */}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><HelpCircle className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          
        </section>

      </main>

      {/* Global Toast Component */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800 shadow-amber-500/20' :
          'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" /> :
           <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}