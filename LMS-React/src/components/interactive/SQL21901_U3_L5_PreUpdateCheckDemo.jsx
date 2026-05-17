import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  HelpCircle,
  AlertTriangle,
  Eye,
  ShieldAlert,
  DatabaseBackup,
  TerminalSquare
} from 'lucide-react';

export default function SQL21901_U3_L5_PreUpdateCheckDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Syntax Engine Initialized.' },
    { type: 'system', text: 'Pre-update check mode enabled.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
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
    "NONE": (row) => true,
  };

  const handlePreview = () => {
    setIsAnimating(true);
    setHighlightedRows([]);
    setIsDisaster(false);

    let sqlStr = "SELECT * FROM products";
    if (selectedCondition !== "NONE") sqlStr += ` WHERE ${selectedCondition}`;
    sqlStr += ";";
    logToTerminal(`mysql> ${sqlStr}`, 'command');

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      const matchedIds = products.filter(conditionFunc).map(p => p.id);

      setHighlightedRows(matchedIds);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        logToTerminal(`> Warning: คำสั่ง SELECT นี้ดึงข้อมูลมาทั้งหมด ${matchedIds.length} แถว เพราะไม่มีเงื่อนไข WHERE`, 'warning');
      } else {
        logToTerminal(`> Query OK, ${matchedIds.length} rows returned. พบข้อมูลที่เข้าเงื่อนไขจำนวน ${matchedIds.length} แถว`, 'success');
      }
    }, 600);
  };

  const handleUpdate = () => {
    setIsAnimating(true);
    setHighlightedRows([]);

    let sqlStr = "UPDATE products SET price = price + 500";
    if (selectedCondition !== "NONE") sqlStr += ` WHERE ${selectedCondition}`;
    sqlStr += ";";
    logToTerminal(`mysql> ${sqlStr}`, 'command');

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      let affectedRows = 0;

      const newProducts = products.map(product => {
        if (conditionFunc(product)) {
          affectedRows++;
          return { ...product, price: product.price + 500 };
        }
        return product;
      });

      setProducts(newProducts);
      setUpdateCount(prev => prev + 1);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        setIsDisaster(true);
        logToTerminal(`> Error: หายนะ! คุณลืมใส่ WHERE สินค้าทั้งหมด ${affectedRows} รายการถูกปรับราคาขึ้นไปมั่วหมดเลย!`, 'error');
      } else {
        const matchedIds = newProducts.filter(conditionFunc).map(p => p.id);
        setHighlightedRows(matchedIds);
        logToTerminal(`> Query OK, ${affectedRows} rows affected. อัปเดตข้อมูลสำเร็จอย่างปลอดภัย`, 'success');
      }
    }, 800);
  };

  const resetSimulator = () => {
    setProducts(initialProducts);
    setHighlightedRows([]);
    setIsDisaster(false);
    setUpdateCount(0);
    logToTerminal('> System: Simulator reset.', 'system');
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
      logToTerminal('> Error: Syntax Builder Incomplete. กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
      return;
    }

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t1')) {
      logToTerminal('> Error: Invalid Syntax. ในคำสั่งแก้ไขข้อมูล เราจะใช้แค่ UPDATE เท่านั้น ไม่ใช้ SELECT ตรงนี้', 'error');
      return;
    }

    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      logToTerminal('> Success: Syntax Check Passed. ถูกต้องสมบูรณ์! นี่คือโครงสร้าง UPDATE ที่ปลอดภัยและมี WHERE เสมอ', 'success');
    } else {
       logToTerminal('> Error: Syntax Check Failed. การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> ตาราง -> SET -> WHERE -> เงื่อนไข', 'error');
    }
  };

  const resetGame = () => {
    setDropzones(Array(5).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Background Red Flash on Disaster */}
      {isDisaster && <div className="fixed inset-0 bg-red-500/10 pointer-events-none z-0 animate-pulse"></div>}

      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
            <ShieldAlert size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การตรวจสอบก่อนแก้ไข (Pre-update Check)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          คำสั่ง UPDATE เป็นคำสั่งที่อันตราย ดังนั้นควรใช้ SELECT ทดสอบเงื่อนไข WHERE ดูข้อมูลก่อนการอัปเดตเสมอ
        </p>
      </div>

      <div className="flex flex-col min-h-[500px] relative z-10">
        {/* Top: Explanations */}
        <div className="p-6 border-b border-slate-200 bg-white grid md:grid-cols-2 gap-6 items-center">
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

        {/* Middle: Simulator */}
        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          <div className="p-5 flex justify-between items-center border-b border-slate-200">
             <div className="flex items-center gap-2">
                <DatabaseBackup size={16} className="text-indigo-600"/>
                <span className="font-semibold text-slate-700 text-sm">Safe Update Simulator</span>
             </div>
             {updateCount > 0 && (
                <button onClick={resetSimulator} className="text-xs bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                  <RefreshCcw size={12} /> รีเซ็ตข้อมูลกลับค่าเริ่มต้น
                </button>
             )}
          </div>
          <div className="p-4 bg-white">
            <p className="text-sm text-slate-600">
              <strong>ภารกิจ:</strong> ผู้จัดการสั่งให้ <u className="underline-offset-4 decoration-wavy decoration-indigo-400 font-semibold">ปรับราคาสินค้าหมวด IT ขึ้นชิ้นละ 500 บาท</u> เลือกลอง Preview ดูข้อมูลก่อน แล้วค่อยกดสลับโหมดไป Update จริง
            </p>
          </div>

          <div className={`flex flex-col md:flex-row border-y transition-colors duration-500 ${isDisaster ? 'border-rose-300' : 'border-slate-200'}`}>
            {/* Left: Code Editor */}
            <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col relative">
              <div className="flex bg-slate-900 shrink-0 border-b border-slate-700">
                 <button
                   onClick={() => { setSimMode('SELECT'); setHighlightedRows([]); }}
                   className={`flex-1 text-center py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors
                     ${simMode === 'SELECT' ? 'bg-[#1e1e2e] text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <Eye size={16} /> 1. PREVIEW
                 </button>
                 <button
                   onClick={() => { setSimMode('UPDATE'); setHighlightedRows([]); }}
                   className={`flex-1 text-center py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors
                     ${simMode === 'UPDATE' ? 'bg-[#1e1e2e] text-amber-400 border-b-2 border-amber-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <AlertTriangle size={16} /> 2. UPDATE
                 </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-[15px] leading-loose overflow-x-auto w-full text-slate-600">
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
                      <span className="text-slate-600">;</span>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">products</span> <br/>
                      <span className="text-[#f9e2af] font-bold">SET</span> price = price + <span className="text-[#fab387]">500</span><br/>

                      {selectedCondition !== "NONE" ? (
                        <>
                          <span className="text-[#cba6f7] font-bold">WHERE</span>
                          <span className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 select-none opacity-80 cursor-not-allowed inline-block">
                            {selectedCondition}
                          </span>
                        </>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold animate-pulse inline-block mt-1">-- ไม่มี WHERE Clause! --</span>
                      )}

                      <span className="text-slate-600">;</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-3">
                  {simMode === 'SELECT' ? (
                    <button
                      onClick={handlePreview}
                      disabled={isAnimating}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      <Eye size={16} /> {isAnimating ? 'กำลังค้นหา...' : 'Preview Data'}
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      disabled={isAnimating || (selectedCondition === "NONE" && isDisaster)} 
                      className={`font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none
                        ${selectedCondition === 'NONE' ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-amber-950'}
                      `}
                    >
                      <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : (selectedCondition === 'NONE' ? 'Execute (DANGER!)' : 'Execute Update')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Visual Table */}
            <div className={`p-6 md:w-7/12 transition-colors duration-500 ${isDisaster ? 'bg-rose-50/50' : 'bg-slate-50'}`}>
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={16} className="text-indigo-500"/> ตาราง Products</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-2 border-b font-semibold w-12 text-center">ID</th>
                        <th className="p-2 border-b font-semibold">Name</th>
                        <th className="p-2 border-b font-semibold">Category</th>
                        <th className="p-2 border-b font-semibold text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const isPriceChanged = row.price !== row.originalPrice;

                        let rowClasses = "transition-all duration-500 ";
                        let priceClasses = "text-right p-2 font-mono text-sm font-medium transition-colors ";

                        if (isHighlighted) {
                          if (simMode === 'SELECT') {
                            rowClasses += "bg-blue-50 ";
                            priceClasses += "text-slate-700";
                          } else {
                            if (isDisaster) {
                              rowClasses += "bg-rose-100 ";
                              priceClasses += "text-rose-700 font-bold";
                            } else {
                              rowClasses += "bg-emerald-50 ";
                              priceClasses += "text-emerald-700 font-bold";
                            }
                          }
                        } else {
                           rowClasses += "bg-white hover:bg-slate-50";
                           if(isPriceChanged) priceClasses += "text-amber-600";
                           else priceClasses += "text-slate-600";
                        }

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-2 font-mono text-[11px] text-slate-600 text-center">{row.id}</td>
                            <td className="p-2 font-medium text-slate-800">{row.name}</td>
                            <td className="p-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                                ${row.category === 'IT' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
                              `}>{row.category}</span>
                            </td>
                            <td className={priceClasses}>
                              <div className="flex flex-col items-end justify-center h-full">
                                {isPriceChanged && (
                                   <span className="text-[9px] text-slate-600 line-through mb-0.5 leading-none">
                                     {row.originalPrice.toLocaleString()}
                                   </span>
                                )}
                                <span>{row.price.toLocaleString()}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
               {isDisaster && (
                 <div className="mt-4 p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <h4 className="font-bold">จำลองความเสียหายสำเร็จ!</h4>
                      <p className="mt-1">นี่คือเหตุผลที่ต้องรัน SELECT ก่อนเสมอ สินค้าที่ไม่ใช่ IT เช่น เก้าอี้ โต๊ะ ถูกบวกราคาเพิ่มไปหมดแล้วในระบบจริง! กรุณากดปุ่มรีเซ็ตเพื่อแก้ไขให้ถูกต้อง</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Minigame Area */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
               <HelpCircle size={16} className="text-amber-500" /> Syntax Challenge
             </h4>
             <button onClick={resetGame} className="text-xs text-slate-700 hover:text-slate-800 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                <RefreshCcw size={12} /> เริ่มใหม่
              </button>
           </div>
           
           <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
             <strong className="text-emerald-600">ภารกิจ: ล้างสต๊อกสินค้าเก่า</strong> สมมติว่าคุณรัน SELECT เพื่อดูข้อมูลแล้วถูกต้อง ประกอบบล็อกคำสั่ง <strong>UPDATE</strong> เพื่อปรับลดราคา (price = 0) ให้กับสินค้าสถานะ 'obsolete'
           </p>

           {/* Dropzones */}
           <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
              {dropzones.map((block, idx) => (
                <button
                  key={`zone-${idx}`}
                  onClick={() => handleZoneClick(idx)}
                  className={`
                    min-w-[80px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300
                    ${block ? 'bg-amber-500 text-amber-950 shadow-md hover:bg-amber-400' : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400 hover:bg-slate-700'}
                    ${activeZoneIndex === idx && !block ? 'ring-2 ring-amber-400 border-solid bg-slate-700' : ''}
                  `}
                >
                  {block ? block.text : `ส่วน ${idx + 1}`}
                </button>
              ))}
              <span className="text-slate-700 font-mono text-lg font-bold">;</span>
           </div>

           {/* Blocks */}
           <div className="flex flex-wrap gap-2 mb-6">
              {gameBlocks.map(block => {
                const isUsed = dropzones.find(b => b && b.id === block.id);
                return (
                  <button
                    key={block.id}
                    onClick={() => !isUsed && handleBlockClick(block)}
                    disabled={isUsed}
                    className={`
                      px-3 py-1.5 rounded-lg font-mono text-xs font-bold shadow-sm transition-all border
                      ${isUsed ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50' : 'bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-700 active:scale-95'}
                    `}
                  >
                    {block.text}
                  </button>
                );
              })}
           </div>

           <div className="mt-auto flex justify-end">
             <button onClick={checkGameAnswer} className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
               <CheckCircle2 size={16} /> ตรวจคำตอบ
             </button>
           </div>
        </div>

        {/* Bottom Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-600" />
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Query Execution Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-blue-400 font-bold shrink-0"></span> <div className="text-blue-300 font-bold">{line.text}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0"></span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0"></span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'warning' && <><span className="text-amber-500 font-bold shrink-0"></span> <div className="text-amber-400 font-bold">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-500 font-bold shrink-0"></span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-500 font-bold shrink-0"></span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}