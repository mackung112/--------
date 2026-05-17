import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Play,
  CheckCircle2,
  Table2,
  MousePointerClick,
  RefreshCcw,
  ShieldAlert,
  TerminalSquare
} from 'lucide-react';

export default function SQL21901_U3_L1_InsertSingleDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL DML Engine v8.0.32 Initialized.' },
    { type: 'system', text: 'Connected to database "company_db"' },
    { type: 'system', text: 'Ready to receive INSERT INTO commands.' }
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
    { emp_id: 'E001', name: 'สมชาย ใจดี', department: 'IT', salary: 45000 },
    { emp_id: 'E002', name: 'สมหญิง รักงาน', department: 'HR', salary: 38000 }
  ];
  const [tableData, setTableData] = useState(initialData);
  const [formData, setFormData] = useState({
    emp_id: '',
    name: '',
    department: 'Marketing',
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeInsert = () => {
    const s_id = formData.emp_id ? `'${formData.emp_id}'` : 'NULL';
    const s_name = formData.name ? `'${formData.name}'` : 'NULL';
    const s_dept = formData.department ? `'${formData.department}'` : 'NULL';
    const s_sal = formData.salary ? formData.salary : 'NULL';

    const sqlStr = `INSERT INTO employees (emp_id, name, department, salary) VALUES (${s_id}, ${s_name}, ${s_dept}, ${s_sal});`;
    logToTerminal(`mysql> ${sqlStr}`, 'command');

    if (!formData.emp_id || !formData.name || !formData.salary) {
      logToTerminal('> Error 1048: Column cannot be null. กรุณากรอกข้อมูลให้ครบถ้วนก่อนรันคำสั่ง!', 'error');
      return;
    }
    if (tableData.some(emp => emp.emp_id === formData.emp_id)) {
      logToTerminal(`> Error 1062: Duplicate entry '${formData.emp_id}' for key 'PRIMARY' (รหัสพนักงานซ้ำ)`, 'error');
      return;
    }

    const newRow = {
      emp_id: formData.emp_id,
      name: formData.name,
      department: formData.department,
      salary: Number(formData.salary)
    };

    setTableData([...tableData, newRow]);
    logToTerminal('> Query OK, 1 row affected. ข้อมูลถูกเพิ่มลงในตารางแล้ว', 'success');
    setFormData({ emp_id: '', name: '', department: 'Marketing', salary: '' });
  };

  // --- Mini Game State ---
  const gameBlocks = [
    { id: 'b1', text: 'INSERT INTO', type: 'keyword' },
    { id: 'b2', text: 'VALUES', type: 'keyword' },
    { id: 'b3', text: 'products', type: 'table' },
    { id: 'b4', text: '(id, name, price)', type: 'cols' },
    { id: 'b5', text: "('P01', 'Mouse', 500)", type: 'vals' },
    { id: 'b6', text: 'UPDATE', type: 'trick' },
    { id: 'b7', text: 'SET', type: 'trick' }
  ];

  const expectedAnswer = ['b1', 'b3', 'b4', 'b2', 'b5'];

  const [dropzones, setDropzones] = useState([null, null, null, null, null]);
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
      logToTerminal('> Error: Syntax Check Failed - กรุณาต่อบล็อกคำสั่งให้ครบก่อนตรวจคำตอบ', 'error');
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
      logToTerminal('> Success: Syntax Check Passed - ยอดเยี่ยมมาก! ต่อคำสั่ง SQL ได้ถูกต้องสมบูรณ์', 'success');
    } else {
      logToTerminal('> Error: Syntax Check Failed - ยังไม่ถูกต้อง ลองทบทวนลำดับของคำสั่ง INSERT ดูอีกครั้ง', 'error');
    }
  };

  const resetGame = () => {
    setDropzones([null, null, null, null, null]);
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Database size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเพิ่มข้อมูล (INSERT INTO)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการนำข้อมูลใหม่เข้าไปเก็บในตาราง (Table) ของฐานข้อมูล ทีละ 1 แถว (Row)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Main Workspace */}
        <div className="flex flex-col xl:flex-row flex-1 bg-slate-50">
          
          {/* Left Panel: Simulator Form */}
          <div className="w-full xl:w-[35%] p-6 border-b xl:border-b-0 xl:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <MousePointerClick size={16} className="text-indigo-500" /> Database Simulator
            </h4>
            <p className="text-xs text-slate-700 mb-6">กรอกข้อมูลพนักงานใหม่ทางด้านล่าง สังเกตการตอบสนองใน Terminal และในตาราง</p>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รหัสพนักงาน (emp_id) <span className="text-rose-500">*</span></label>
                <input type="text" name="emp_id" value={formData.emp_id} onChange={handleInputChange} placeholder="เช่น E003"
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-สกุล (name) <span className="text-rose-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="เช่น อารี ใจดี"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">แผนก (department)</label>
                <select name="department" value={formData.department} onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="IT">IT (เทคโนโลยีสารสนเทศ)</option>
                  <option value="HR">HR (ฝ่ายบุคคล)</option>
                  <option value="Marketing">Marketing (การตลาด)</option>
                  <option value="Sales">Sales (ฝ่ายขาย)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">เงินเดือน (salary) <span className="text-rose-500">*</span></label>
                <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="เช่น 25000"
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <button onClick={executeInsert}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-sm mt-2">
                <Play size={16} /> Execute INSERT
              </button>
            </div>

            {/* Quick Note */}
            <div className="mt-auto bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <p>สังเกตว่าข้อมูลประเภท Text (รหัส, ชื่อ, แผนก) จะต้องมีเครื่องหมาย <code>''</code> (Single Quote) ครอบไว้เสมอ แต่ข้อมูลตัวเลข (เงินเดือน) ไม่ต้องมี</p>
            </div>
          </div>

          {/* Right Panel: Table & Minigame */}
          <div className="w-full xl:w-[65%] flex flex-col">
            
            {/* Table Area */}
            <div className="p-6 bg-white border-b border-slate-200">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
                <Table2 size={16} className="text-purple-500" /> employees Table
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">emp_id (PK)</th>
                      <th className="p-3 font-semibold">name</th>
                      <th className="p-3 font-semibold">department</th>
                      <th className="p-3 font-semibold text-right">salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tableData.map((emp, idx) => (
                      <tr key={idx} className={`hover:bg-slate-50 transition-colors ${idx >= initialData.length ? 'bg-emerald-50/50' : ''}`}>
                        <td className="p-3 font-mono text-slate-700">{emp.emp_id}</td>
                        <td className="p-3 text-slate-700">{emp.name}</td>
                        <td className="p-3 text-slate-700">
                          <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">{emp.department}</span>
                        </td>
                        <td className="p-3 text-right font-mono text-slate-700">{emp.salary.toLocaleString()}</td>
                      </tr>
                    ))}
                    {tableData.length === 0 && (
                      <tr><td colSpan="4" className="p-6 text-center text-slate-600">ไม่มีข้อมูลในตาราง</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Minigame Area */}
            <div className="p-6 flex-1 flex flex-col bg-slate-50">
               <div className="flex justify-between items-center mb-4">
                 <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                   <Database size={16} className="text-emerald-500" /> Syntax Builder
                 </h4>
                 <button onClick={resetGame} className="text-xs text-slate-700 hover:text-slate-800 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                    <RefreshCcw size={12} /> เริ่มใหม่
                  </button>
               </div>
               
               <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <strong className="text-emerald-600">ภารกิจ:</strong> จงสร้างคำสั่ง SQL เพื่อเพิ่มข้อมูลสินค้าใหม่: รหัส 'P01', ชื่อ 'Mouse', ราคา 500 ลงในตาราง products
               </p>

               {/* Dropzones */}
               <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        min-w-[80px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300
                        ${block ? 'bg-indigo-500 text-white shadow-md hover:bg-indigo-400' : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400 hover:bg-slate-700'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-emerald-400 border-solid bg-slate-700' : ''}
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
              <span className="text-slate-700 text-xs">SQL Event Logger</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0"></span> <div className="text-emerald-300 font-bold">{line.text}</div></>}
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
  );
}