import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  MousePointerClick,
  RefreshCcw,
  Code2,
  HelpCircle,
  Plus,
  Trash2,
  Layers,
  CopyPlus,
  TerminalSquare
} from 'lucide-react';


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function SQL21901_U3_L3_InsertMultiDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Syntax Engine Initialized.' },
    { type: 'system', text: 'Multi-row insert capability enabled.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
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

  const handleAddRow = () => {
    if (draftRows.length >= 5) {
      logToTerminal('> Error: สามารถจำลองการเพิ่มข้อมูลได้สูงสุด 5 แถวพร้อมกันครับ', 'error');
      return;
    }
    setDraftRows([
      ...draftRows,
      { id: Date.now(), name: '', category: 'Other', price: '' }
    ]);
  };

  const handleRemoveRow = (id) => {
    if (draftRows.length <= 1) {
      logToTerminal('> Error: ต้องมีข้อมูลอย่างน้อย 1 แถวในคำสั่ง INSERT', 'error');
      return;
    }
    setDraftRows(draftRows.filter(row => row.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setDraftRows(draftRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
    setHasExecuted(false);
  };

  const executeQuery = () => {
    // Generate SQL for log
    const values = draftRows.map(row =>
      `('${row.name}', '${row.category}', ${row.price || 0})`
    ).join(', ');
    const sqlStr = `INSERT INTO products (name, category, price) VALUES ${values};`;
    logToTerminal(`mysql> ${sqlStr}`, 'command');

    // Validate
    const hasEmpty = draftRows.some(r => r.name.trim() === '' || String(r.price).trim() === '');
    if (hasEmpty) {
      logToTerminal('> Error 1048: Column cannot be null. กรุณากรอกข้อมูลให้ครบทุกแถวก่อนรันคำสั่ง', 'error');
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
    logToTerminal(`> Query OK, ${draftRows.length} rows affected. เพิ่มข้อมูลสำเร็จด้วย 1 คำสั่ง!`, 'success');
  };

  const resetSimulator = () => {
    setTableData(initialTableData);
    setHasExecuted(false);
    setDraftRows([
      { id: Date.now(), name: 'ลาเต้', category: 'Coffee', price: 60 },
      { id: Date.now() + 1, name: 'โกโก้', category: 'Milk', price: 55 }
    ]);
    logToTerminal('> System: Table and draft rows reset.', 'system');
  };

  // --- Mini Game State ---
  const gameBlocks = [
    { id: 'b1', text: 'INSERT INTO', type: 'cmd' },
    { id: 'b2', text: 'VALUES', type: 'kw' },
    { id: 'b3', text: "('ชาไทย', 40)", type: 'val' },
    { id: 'b4', text: ',', type: 'comma' },
    { id: 'b5', text: "('นมสด', 35)", type: 'val' },
    { id: 't1', text: 'AND', type: 'trick' },
    { id: 't2', text: 'VALUES', type: 'trick' },
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
      logToTerminal('> Error: Syntax Builder Incomplete. Please fill all dropzones.', 'error');
      return;
    }

    const ans = dropzones.map(b => b.id);

    // Check trick
    if (ans.includes('t1')) {
      logToTerminal('> Error: Invalid Syntax. เราใช้จุลภาค (,) คั่นระหว่างวงเล็บข้อมูล ไม่ใช้คำว่า AND', 'error');
      return;
    }

    // Error analysis
    if (ans[0] !== 'b1') {
      logToTerminal('> Error: คำสั่งแรกต้องเริ่มด้วย INSERT INTO เสมอ', 'error');
      return;
    }
    if (ans[1] !== 'b2' && ans[1] !== 't2') {
      logToTerminal('> Error: หลังจากระบุตารางแล้ว ต้องตามด้วยคีย์เวิร์ดบอกว่าจะเพิ่มข้อมูล (VALUES)', 'error');
      return;
    }
    if (ans[3] !== 'b4') {
      logToTerminal('> Error: เครื่องหมายลูกน้ำ (,) ต้องอยู่ตรงกลางเพื่อเชื่อมข้อมูล 2 ชุดเข้าด้วยกัน', 'error');
      return;
    }

    // Correct Answer Check (Order of b3 and b5 doesn't matter)
    const isVal1Valid = ans[2] === 'b3' || ans[2] === 'b5';
    const isVal2Valid = ans[4] === 'b3' || ans[4] === 'b5';
    const isUniqueVals = ans[2] !== ans[4];

    if (ans[0] === 'b1' && (ans[1] === 'b2' || ans[1] === 't2') && ans[3] === 'b4' && isVal1Valid && isVal2Valid && isUniqueVals) {
      logToTerminal('> Success: Syntax Check Passed. ยอดเยี่ยมมาก! การใส่ข้อมูลหลายแถวแบบนี้ช่วยลดเวลาทำงานได้เยอะเลย', 'success');
    } else {
      logToTerminal('> Error: Syntax Check Failed. ยังมีบางจุดไม่ถูกต้อง ลองเรียงลำดับดูใหม่', 'error');
    }
  };

  const resetGame = () => {
    setDropzones(Array(5).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Layers size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเพิ่มข้อมูลหลายแถว (Multi-row Insert)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้คำสั่ง INSERT INTO ร่วมกับ VALUES หลายชุดเพื่อเพิ่มข้อมูลหลายรายการพร้อมกันในการส่งคำสั่งครั้งเดียว
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top: Explanations */}
        <div className="grid md:grid-cols-2 gap-0 border-b border-slate-200 bg-white">
             <div className="p-6 border-r border-slate-200 hover:bg-slate-50 transition-colors">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-rose-500"/> แบบเดิม (เขียนซ้ำๆ)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-100 p-4 rounded-xl leading-relaxed">
                  <span className="text-indigo-600 font-bold">INSERT INTO</span> products (name)<br/>
                  <span className="text-indigo-600 font-bold">VALUES</span> ('ชาเขียว');<br/><br/>
                  <span className="text-indigo-600 font-bold">INSERT INTO</span> products (name)<br/>
                  <span className="text-indigo-600 font-bold">VALUES</span> ('ชาไทย');<br/>
                </pre>
             </div>
             <div className="p-6 hover:bg-slate-50 transition-colors">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-500"/> แบบหลายแถว (ดีกว่า)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-emerald-50 p-4 rounded-xl leading-relaxed border border-emerald-100">
                  <span className="text-indigo-600 font-bold">INSERT INTO</span> products (name)<br/>
                  <span className="text-indigo-600 font-bold">VALUES</span> <br/>
                  &nbsp;&nbsp;('ชาเขียว')<span className="text-rose-500 font-bold text-lg">,</span><br/>
                  &nbsp;&nbsp;('ชาไทย');<br/>
                </pre>
             </div>
        </div>

        {/* Middle: Simulator & Minigame */}
        <div className="flex flex-col lg:flex-row flex-1 bg-slate-50">
          
          {/* Left Panel: Simulator Form */}
          <div className="w-full lg:w-[45%] p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                <CopyPlus size={16} className="text-blue-600" /> Data Rows
              </h4>
              <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {draftRows.length} / 5 แถว
              </span>
            </div>

            <div className="space-y-3 flex-grow overflow-y-auto pr-2 max-h-[300px]">
              {draftRows.map((row, idx) => (
                <div key={row.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative">
                  <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center rounded-full border border-indigo-200">
                    {idx + 1}
                  </div>
                  <div className="flex gap-2 ml-2">
                    <input
                      type="text"
                      placeholder="ชื่อสินค้า"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, 'name', e.target.value)}
                      className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                    />
                    <input
                      type="number"
                      placeholder="ราคา"
                      value={row.price}
                      onChange={(e) => handleRowChange(row.id, 'price', e.target.value)}
                      className="w-1/3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                    />
                    <button
                      onClick={() => handleRemoveRow(row.id)}
                      disabled={draftRows.length <= 1}
                      className="w-1/6 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg disabled:opacity-30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3 flex-col">
              <button
                onClick={handleAddRow}
                disabled={draftRows.length >= 5}
                className="w-full bg-white border border-slate-300 text-slate-700 font-semibold py-2 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <Plus size={16} /> เพิ่มแถวใหม่
              </button>
              <button
                onClick={executeQuery}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <Play size={16} /> Execute INSERT
              </button>
            </div>
          </div>

          {/* Right Panel: Table & Minigame */}
          <div className="w-full lg:w-[55%] flex flex-col">
            
            {/* Table Area */}
            <div className="p-6 bg-white border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                  <Table2 size={16} className="text-indigo-600" /> products Table
                </h4>
                <div className="flex items-center gap-2">
                  {hasExecuted && (
                    <button onClick={resetSimulator} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1 transition-colors border border-slate-200">
                      <RefreshCcw size={12} /> รีเซ็ต
                    </button>
                  )}
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md border border-slate-200 text-slate-700">
                    Total: {tableData.length} rows
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm max-h-[250px]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
                    <tr className="text-slate-600">
                      <th className="p-3 font-semibold w-24">prod_id</th>
                      <th className="p-3 font-semibold">name</th>
                      <th className="p-3 font-semibold">category</th>
                      <th className="p-3 font-semibold">price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((prod, idx) => (
                      <tr key={idx} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${hasExecuted && idx >= initialTableData.length ? 'bg-indigo-50/50' : ''}`}>
                        <td className="p-3 font-mono text-xs text-slate-700">{prod.prod_id}</td>
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

            {/* Minigame Area */}
            <div className="p-6 flex-1 flex flex-col bg-slate-50">
               <div className="flex justify-between items-center mb-4">
                 <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                   <HelpCircle size={16} className="text-amber-500" /> Syntax Builder
                 </h4>
                 <button onClick={resetGame} className="text-xs text-slate-700 hover:text-slate-800 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                    <RefreshCcw size={12} /> เริ่มใหม่
                  </button>
               </div>
               
               <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <strong className="text-amber-600">ภารกิจ:</strong> ประกอบบล็อกคำสั่ง SQL เพื่อเพิ่มเมนู 'ชาไทย' และ 'นมสด' ลงในตารางให้อยู่ภายใน <strong>1 คำสั่ง</strong>
               </p>

               {/* Dropzones */}
               <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        min-w-[70px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300
                        ${block ? 'bg-indigo-500 text-white shadow-md hover:bg-indigo-400' : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400 hover:bg-slate-700'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-emerald-400 border-solid bg-slate-700' : ''}
                        ${idx === 3 && !block ? 'min-w-[40px]' : ''}
                      `}
                    >
                      {block ? block.text : (idx === 3 ? '?' : `ส่วน ${idx + 1}`)}
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
                          ${isUsed ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50' : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600 active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
               </div>

               <div className="mt-auto flex justify-end">
                 <button onClick={checkGameAnswer} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
                   <CheckCircle2 size={16} /> ตรวจคำตอบ
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
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
                {line.type === 'command' && <><span className="text-indigo-600 font-bold shrink-0"></span> <div className="text-indigo-600 font-bold">{line.text}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0"></span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0"></span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-500 font-bold shrink-0"></span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-500 font-bold shrink-0"></span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>

      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
