import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  MousePointerClick,
  RefreshCcw,
  ShieldAlert,
  HelpCircle,
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

export default function SQL21901_U3_L2_NullHandlingDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Syntax Engine Initialized.' },
    { type: 'system', text: 'Ready to evaluate NULL expressions.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
  };

  // --- Simulator State ---
  const initialData = [
    { emp_id: 'E001', name: 'สมชาย ใจดี', department: 'IT', bonus: 5000 },
    { emp_id: 'E002', name: 'สมหญิง รักงาน', department: 'HR', bonus: null },
    { emp_id: 'E003', name: 'วิชัย เก่งกาจ', department: 'Sales', bonus: 12000 },
    { emp_id: 'E004', name: 'มาลี สวยงาม', department: 'IT', bonus: null },
    { emp_id: 'E005', name: 'ธนา พาเพลิน', department: 'Marketing', bonus: 0 },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [queryCondition, setQueryCondition] = useState('ALL');
  const [hasExecuted, setHasExecuted] = useState(false);

  useEffect(() => {
    setHasExecuted(false);
  }, [queryCondition]);

  const executeQuery = () => {
    setHasExecuted(true);
    let result = [];

    let sqlStr = "SELECT * FROM employees ";
    if (queryCondition === 'IS_NULL') sqlStr += "WHERE bonus IS NULL;";
    else if (queryCondition === 'IS_NOT_NULL') sqlStr += "WHERE bonus IS NOT NULL;";
    else if (queryCondition === 'EQUAL_NULL') sqlStr += "WHERE bonus = NULL;";
    else if (queryCondition === 'EQUAL_ZERO') sqlStr += "WHERE bonus = 0;";
    else sqlStr += ";";

    logToTerminal(`mysql> ${sqlStr}`, 'command');

    switch (queryCondition) {
      case 'ALL':
        result = initialData;
        logToTerminal(`> Query OK, ${result.length} rows returned.`, 'success');
        break;
      case 'IS_NULL':
        result = initialData.filter(emp => emp.bonus === null);
        logToTerminal(`> Query OK, ${result.length} rows returned. (IS NULL returns missing values)`, 'success');
        break;
      case 'IS_NOT_NULL':
        result = initialData.filter(emp => emp.bonus !== null);
        logToTerminal(`> Query OK, ${result.length} rows returned. (IS NOT NULL returns non-missing values including 0)`, 'success');
        break;
      case 'EQUAL_NULL':
        result = []; 
        logToTerminal('> Warning: = NULL does not match anything in SQL. Use IS NULL instead.', 'error');
        break;
      case 'EQUAL_ZERO':
        result = initialData.filter(emp => emp.bonus === 0);
        logToTerminal(`> Query OK, ${result.length} rows returned. (0 is a value, not NULL)`, 'success');
        break;
      default:
        result = initialData;
    }
    setTableData(result);
  };

  // --- Mini Game State ---
  const gameBlocks = [
    { id: 'b1', text: 'SELECT * FROM employees', type: 'select' },
    { id: 'b2', text: 'WHERE', type: 'keyword' },
    { id: 'b3', text: 'bonus', type: 'col' },
    { id: 'b4', text: 'IS NULL', type: 'operator' },
    { id: 'b5', text: '= NULL', type: 'trick' },
    { id: 'b6', text: 'IS NOT NULL', type: 'trick' },
  ];

  const expectedAnswer = ['b1', 'b2', 'b3', 'b4'];
  const [dropzones, setDropzones] = useState([null, null, null, null]);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  const handleBlockClick = (block) => {
    if (activeZoneIndex < dropzones.length && activeZoneIndex !== -1) {
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
    const currentAnswer = dropzones.map(b => b ? b.id : null);
    if (currentAnswer.includes(null)) {
      logToTerminal('> Error: Syntax Builder Incomplete. Please fill all dropzones.', 'error');
      return;
    }

    let isCorrect = true;
    for (let i = 0; i < expectedAnswer.length; i++) {
      if (currentAnswer[i] !== expectedAnswer[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      logToTerminal('> Success: Syntax Check Passed - IS NULL correctly used to find missing values.', 'success');
    } else {
      if (currentAnswer.includes('b5')) {
         logToTerminal('> Error: Invalid SQL. Cannot use "=" operator with NULL. Use IS NULL.', 'error');
      } else if (currentAnswer.includes('b6')) {
         logToTerminal('> Error: IS NOT NULL finds rows WITH data. The task requires finding missing data.', 'error');
      } else {
         logToTerminal('> Error: Syntax Check Failed. Order of SQL clauses is incorrect.', 'error');
      }
    }
  };

  const resetGame = () => {
    setDropzones([null, null, null, null]);
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
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Database size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดการค่า NULL (NULL Handling)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้ความแตกต่างระหว่าง 0, ค่าว่าง และ NULL และการใช้คำสั่ง IS NULL ในการกรองข้อมูล
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top: Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-5 flex gap-4 items-start hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">0</div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">เลขศูนย์ (Zero)</h4>
              <p className="text-xs text-slate-700">มีข้อมูลเป็นตัวเลขศูนย์ (เช่น ได้โบนัส 0 บาท ถือเป็นค่าหนึ่งค่า)</p>
            </div>
          </div>
          <div className="p-5 flex gap-4 items-start hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">''</div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">ช่องว่าง (Empty String)</h4>
              <p className="text-xs text-slate-700">มีข้อมูลเป็นข้อความแต่ไม่มีตัวอักษร</p>
            </div>
          </div>
          <div className="p-5 flex gap-4 items-start bg-indigo-50/50">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">NULL</div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">NULL</h4>
              <p className="text-xs text-slate-700">ช่องโหว่ ยังไม่มีการกรอกข้อมูลใดๆ ลงไปเลย ไม่ทราบค่า</p>
            </div>
          </div>
        </div>

        {/* Middle: Simulator & Minigame */}
        <div className="flex flex-col lg:flex-row flex-1 bg-slate-50">
          
          {/* Left Panel: Simulator Form */}
          <div className="w-full lg:w-[40%] p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <MousePointerClick size={16} className="text-teal-500" /> Query Simulator
            </h4>
            <p className="text-xs text-slate-700 mb-6">ทดลองดึงข้อมูลจากตาราง <code>employees</code> โดยใช้เงื่อนไขต่างๆ สังเกตความแตกต่างเมื่อใช้ <code>=</code> กับ <code>IS</code></p>

            <div className="space-y-2 mb-6">
              {[
                { val: 'ALL', label: 'แสดงทั้งหมด (ไม่มี WHERE)' },
                { val: 'IS_NULL', label: 'WHERE bonus IS NULL' },
                { val: 'IS_NOT_NULL', label: 'WHERE bonus IS NOT NULL' },
                { val: 'EQUAL_ZERO', label: 'WHERE bonus = 0' },
                { val: 'EQUAL_NULL', label: 'WHERE bonus = NULL (ผิดกติกา)' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setQueryCondition(opt.val)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-mono transition-all duration-200 ${
                    queryCondition === opt.val
                      ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-800 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button onClick={executeQuery}
              className={`w-full font-bold py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-sm mt-auto ${
                queryCondition === 'EQUAL_NULL' ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}>
              <Play size={16} /> รันคำสั่ง SQL
            </button>
          </div>

          {/* Right Panel: Table & Minigame */}
          <div className="w-full lg:w-[60%] flex flex-col">
            
            {/* Table Area */}
            <div className="p-6 bg-white border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                  <Table2 size={16} className="text-indigo-500" /> employees Table
                </h4>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                  Rows: {hasExecuted ? tableData.length : initialData.length}
                </span>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">emp_id</th>
                      <th className="p-3 font-semibold">name</th>
                      <th className="p-3 font-semibold">department</th>
                      <th className="p-3 font-semibold text-right">bonus</th>
                    </tr>
                  </thead>
                  <tbody className={hasExecuted ? 'animate-in fade-in duration-300' : ''}>
                    {(hasExecuted ? tableData : initialData).map((emp, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-slate-600">{emp.emp_id}</td>
                        <td className="p-3 text-slate-800">{emp.name}</td>
                        <td className="p-3 text-slate-600">
                          <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium">{emp.department}</span>
                        </td>
                        <td className="p-3 text-right">
                          {emp.bonus === null ? (
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-xs font-bold font-mono border border-rose-100">NULL</span>
                          ) : (
                            <span className="font-mono text-slate-700 font-medium">{emp.bonus.toLocaleString()}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {hasExecuted && tableData.length === 0 && (
                       <tr><td colSpan="4" className="p-6 text-center text-rose-500 font-medium bg-rose-50/50">ไม่พบข้อมูล หรือ ผิดหลักไวยากรณ์ (= NULL)</td></tr>
                    )}
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
                 <strong className="text-amber-600">ภารกิจ:</strong> ดึงรายชื่อพนักงานทั้งหมด ที่ <strong>"ยังไม่มีข้อมูลโบนัสในระบบ"</strong> (ช่อง bonus ว่างเปล่า เป็น NULL)
               </p>

               {/* Dropzones */}
               <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        min-w-[80px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300
                        ${block ? 'bg-teal-500 text-teal-950 shadow-md hover:bg-teal-400' : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400 hover:bg-slate-700'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-teal-400 border-solid bg-slate-700' : ''}
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
                          ${isUsed ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50' : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500 hover:text-teal-700 active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
               </div>

               <div className="mt-auto flex justify-end">
                 <button onClick={checkGameAnswer} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
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
              <span className="text-slate-700 text-xs">Condition Evaluator</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-teal-400 font-bold shrink-0"></span> <div className="text-teal-300 font-bold">{line.text}</div></>}
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
