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
  Edit3,
  UserCheck,
  Calculator,
  Code2,
  TerminalSquare
} from 'lucide-react';

export default function SQL21901_U3_L6_UpdateSetDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Syntax Engine Initialized.' },
    { type: 'system', text: 'UPDATE SET Demo module loaded.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
  };

  // --- Simulator State ---
  const initialEmployees = [
    { id: 'E01', name: 'สมชาย', position: 'Developer', salary: 30000, bonus: 0 },
    { id: 'E02', name: 'สมหญิง', position: 'Designer', salary: 28000, bonus: 0 },
    { id: 'E03', name: 'สมศรี', position: 'Tester', salary: 25000, bonus: 0 },
    { id: 'E04', name: 'สมปอง', position: 'Developer', salary: 32000, bonus: 0 },
  ];

  const createInitialState = () => initialEmployees.map(emp => ({
    ...emp,
    orig_position: emp.position,
    orig_salary: emp.salary,
    orig_bonus: emp.bonus
  }));

  const [employees, setEmployees] = useState(createInitialState());
  const [activeScenario, setActiveScenario] = useState('single');
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedRows, setHighlightedRows] = useState([]);

  // --- Scenarios Definition ---
  const scenarios = {
    single: {
      id: 'single',
      icon: <Edit3 size={18} />,
      title: "1. แก้ไข 1 คอลัมน์",
      desc: "ปรับเงินเดือนพนักงานรหัส E01 เป็น 35,000",
      sqlStr: "UPDATE employees SET salary = 35000 WHERE id = 'E01';",
      sql: (
        <>
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
          <span className="text-[#f9e2af] font-bold">SET</span> salary = <span className="text-[#fab387]">35000</span><br/>
          <span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#a6e3a1]">'E01'</span>;
        </>
      ),
      execute: (data) => {
        let count = 0;
        const newData = data.map(e => {
          if (e.id === 'E01') { count++; return { ...e, salary: 35000 }; }
          return e;
        });
        return { newData, count, matchIds: ['E01'] };
      }
    },
    multiple: {
      id: 'multiple',
      icon: <UserCheck size={18} />,
      title: "2. แก้ไขหลายคอลัมน์",
      desc: "เลื่อนตำแหน่ง E03 เป็น QA Lead และปรับเงินเดือน",
      sqlStr: "UPDATE employees SET position = 'QA Lead', salary = 32000 WHERE id = 'E03';",
      sql: (
        <>
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
          <span className="text-[#f9e2af] font-bold">SET</span> position = <span className="text-[#a6e3a1]">'QA Lead'</span><span className="text-rose-400 font-bold text-lg animate-pulse"> , </span><br/>
          <span className="text-transparent">SET</span> salary = <span className="text-[#fab387]">32000</span><br/>
          <span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#a6e3a1]">'E03'</span>;
        </>
      ),
      execute: (data) => {
        let count = 0;
        const newData = data.map(e => {
          if (e.id === 'E03') { count++; return { ...e, position: 'QA Lead', salary: 32000 }; }
          return e;
        });
        return { newData, count, matchIds: ['E03'] };
      }
    },
    math: {
      id: 'math',
      icon: <Calculator size={18} />,
      title: "3. แก้ไขด้วยการคำนวณ",
      desc: "แจกโบนัสให้ Developer ทุกคน เพิ่มคนละ 5,000",
      sqlStr: "UPDATE employees SET bonus = bonus + 5000 WHERE position = 'Developer';",
      sql: (
        <>
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
          <span className="text-[#f9e2af] font-bold">SET</span> bonus = <span className="border-b border-dashed border-slate-400 pb-0.5">bonus + <span className="text-[#fab387]">5000</span></span><br/>
          <span className="text-[#cba6f7] font-bold">WHERE</span> position = <span className="text-[#a6e3a1]">'Developer'</span>;
        </>
      ),
      execute: (data) => {
        let count = 0;
        let matchIds = [];
        const newData = data.map(e => {
          if (e.position === 'Developer' || e.orig_position === 'Developer') {
            count++;
            matchIds.push(e.id);
            return { ...e, bonus: e.bonus + 5000 };
          }
          return e;
        });
        return { newData, count, matchIds };
      }
    }
  };

  const handleExecute = () => {
    setIsAnimating(true);
    setHighlightedRows([]);
    const scenarioObj = scenarios[activeScenario];
    
    logToTerminal(`mysql> ${scenarioObj.sqlStr}`, 'command');

    setTimeout(() => {
      const { newData, count, matchIds } = scenarioObj.execute(employees);

      setEmployees(newData);
      setHighlightedRows(matchIds);
      setIsAnimating(false);
      logToTerminal(`> Query OK, ${count} rows affected. อัปเดตข้อมูลสำเร็จ!`, 'success');
    }, 600);
  };

  const resetSimulator = () => {
    setEmployees(createInitialState());
    setHighlightedRows([]);
    logToTerminal('> System: Table and data reset to initial state.', 'system');
  };

  // --- Minigame State ---
  const gameBlocks = [
    { id: 'b1', text: 'UPDATE users', type: 'cmd' },
    { id: 'b2', text: "SET status = 'active'", type: 'col' },
    { id: 'b3', text: ",", type: 'comma' },
    { id: 'b4', text: "role = 'admin'", type: 'col2' },
    { id: 'b5', text: 'WHERE id = 99', type: 'cond' },
    { id: 't1', text: 'AND', type: 'trick' },
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
      logToTerminal('> Error: Invalid Syntax. การอัปเดตหลายคอลัมน์ในคำสั่ง SET ต้องใช้ลูกน้ำ ( , ) คั่น ห้ามใช้ AND เด็ดขาด', 'error');
      return;
    }

    const isCorrect1 = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5';
    const isCorrect2 = ans[0] === 'b1' && ans[1] === 'b4' && ans[2] === 'b3' && ans[3] === 'b2' && ans[4] === 'b5';

    if (isCorrect1 || isCorrect2) {
      logToTerminal('> Success: Syntax Check Passed. ยอดเยี่ยม! ถูกต้องตามหลักไวยากรณ์ การใช้ลูกน้ำ (,) คั่นคอลัมน์คือหัวใจสำคัญ', 'success');
    } else {
       logToTerminal('> Error: Syntax Check Failed. การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> SET col1 -> , -> col2 -> WHERE', 'error');
    }
  };

  const resetGame = () => {
    setDropzones(Array(5).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
            <Edit3 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การแก้ไขข้อมูล (UPDATE SET)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้คำสั่ง UPDATE ควบคู่กับ SET เพื่อกำหนดค่าใหม่ให้กับคอลัมน์ ทั้งแบบค่าคงที่ และแบบการคำนวณ
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top: Explanations */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
             <div className="p-6 hover:bg-slate-50 transition-colors">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Edit3 size={20} className="text-blue-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไข 1 คอลัมน์</h3>
                <p className="text-sm text-slate-700 mb-4">กำหนดค่าตรงไปตรงมา</p>
                <code className="block bg-slate-100 text-blue-700 p-3 rounded-lg text-sm font-mono border border-slate-200">
                  SET salary = 35000
                </code>
             </div>

             <div className="p-6 bg-rose-50/30 hover:bg-rose-50/50 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">ระวังผิดบ่อย!</div>
                <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><UserCheck size={20} className="text-rose-600"/></div>
                <h3 className="font-bold text-rose-900 mb-2">แก้ไขหลายคอลัมน์</h3>
                <p className="text-sm text-rose-700/80 mb-4">ต้องใช้ <strong className="text-rose-500 text-lg">,</strong> คั่นเสมอ (ห้ามใช้ AND)</p>
                <code className="block bg-white text-slate-700 p-3 rounded-lg text-sm font-mono border border-rose-200">
                  SET status = 'A'<span className="text-rose-500 font-bold text-lg">,</span> <br/>role = 'admin'
                </code>
             </div>

             <div className="p-6 hover:bg-slate-50 transition-colors">
                <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Calculator size={20} className="text-amber-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไขด้วยการคำนวณ</h3>
                <p className="text-sm text-slate-700 mb-4">อ้างอิงค่าเดิมมาบวก/ลบได้</p>
                <code className="block bg-slate-100 text-amber-700 p-3 rounded-lg text-sm font-mono border border-slate-200">
                  SET price = price + 50
                </code>
             </div>
        </div>

        {/* Middle: Simulator */}
        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
             <div className="flex items-center gap-2">
                <Code2 size={16} className="text-teal-600"/>
                <span className="font-semibold text-slate-700 text-sm">Simulator: UPDATE SET Patterns</span>
             </div>
             <button onClick={resetSimulator} className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
               <RefreshCcw size={12} /> รีเซ็ตข้อมูล
             </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* SQL Command Builder */}
            <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
              <div className="flex flex-col bg-slate-900 border-b border-slate-700 overflow-x-auto">
                 <div className="flex">
                   {Object.keys(scenarios).map((key) => {
                     const isActive = activeScenario === key;
                     return (
                       <button
                         key={key}
                         onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                         className={`flex-1 text-center py-3 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors whitespace-nowrap px-2
                           ${isActive ? 'bg-[#1e1e2e] text-teal-400 border-b-2 border-teal-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                         `}
                       >
                         {scenarios[key].icon} {scenarios[key].title}
                       </button>
                     )
                   })}
                 </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-[15px] leading-loose overflow-x-auto w-full pt-2">
                   <div key={activeScenario} className="animate-in fade-in zoom-in-95 duration-300">
                     {scenarios[activeScenario].sql}
                     <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">{scenarios[activeScenario].desc}</p>
                     </div>
                   </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleExecute}
                    disabled={isAnimating}
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Run Update'}
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Table */}
            <div className="p-6 md:w-7/12 bg-slate-50">
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={16} className="text-teal-600"/> ตาราง Employees</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-2 border-b font-semibold w-12 text-center">ID</th>
                        <th className="p-2 border-b font-semibold">Name</th>
                        <th className="p-2 border-b font-semibold">Position</th>
                        <th className="p-2 border-b font-semibold text-right">Salary</th>
                        <th className="p-2 border-b font-semibold text-right">Bonus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {employees.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const posChanged = row.position !== row.orig_position;
                        const salChanged = row.salary !== row.orig_salary;
                        const bonChanged = row.bonus !== row.orig_bonus;

                        let rowClasses = "transition-all duration-500 ";
                        if (isHighlighted) rowClasses += "bg-teal-50 ";
                        else rowClasses += "bg-white hover:bg-slate-50";

                        const renderCell = (currentVal, origVal, isChanged, highlightClass = "text-teal-700 font-bold bg-teal-100/50 px-1.5 py-0.5 rounded") => {
                          if (isChanged) {
                            return (
                              <div className="flex flex-col justify-center animate-in zoom-in duration-500 items-end md:items-start">
                                <span className="text-[9px] text-slate-600 line-through leading-none mb-0.5">{origVal.toLocaleString()}</span>
                                <span className={highlightClass}>{currentVal.toLocaleString()}</span>
                              </div>
                            );
                          }
                          return <span>{currentVal.toLocaleString()}</span>;
                        };

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-2 font-mono text-[11px] text-slate-600 text-center">{row.id}</td>
                            <td className="p-2 font-medium text-slate-700">{row.name}</td>
                            <td className="p-2 text-xs">
                              {renderCell(row.position, row.orig_position, posChanged, "text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.5 rounded")}
                            </td>
                            <td className="p-2 text-right font-mono text-sm">
                               <div className="flex justify-end">{renderCell(row.salary, row.orig_salary, salChanged)}</div>
                            </td>
                            <td className="p-2 text-right font-mono text-sm">
                               <div className="flex justify-end">{renderCell(row.bonus, row.orig_bonus, bonChanged, "text-amber-600 font-bold bg-amber-100 px-1.5 py-0.5 rounded")}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        </div>

        {/* Minigame Area */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
               <HelpCircle size={16} className="text-teal-500" /> Syntax Challenge: กับดัก AND
             </h4>
             <button onClick={resetGame} className="text-xs text-slate-700 hover:text-slate-800 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                <RefreshCcw size={12} /> เริ่มใหม่
              </button>
           </div>
           
           <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
             <strong className="text-teal-600">ภารกิจ:</strong> อัปเดตตาราง users โดยเปลี่ยนสถานะ (status) เป็น 'active' <strong>และ</strong> เลื่อนขั้น (role) เป็น 'admin' ให้กับ user ที่ id = 99
           </p>

           {/* Dropzones */}
           <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
              {dropzones.map((block, idx) => (
                <button
                  key={`zone-${idx}`}
                  onClick={() => handleZoneClick(idx)}
                  className={`
                    min-w-[70px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all duration-300
                    ${block ? (block.type === 'comma' ? 'bg-rose-500 text-white shadow-md text-base px-5' : 'bg-teal-500 text-teal-950 shadow-md hover:bg-teal-400') : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400 hover:bg-slate-700'}
                    ${activeZoneIndex === idx && !block ? 'ring-2 ring-teal-400 border-solid bg-slate-700' : ''}
                    ${idx === 2 && !block ? 'min-w-[40px]' : ''}
                  `}
                >
                  {block ? block.text : (idx === 2 ? '?' : `ส่วน ${idx + 1}`)}
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
                      ${isUsed ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50' : block.type === 'trick' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400' : block.type === 'comma' ? 'bg-rose-50 text-rose-600 border-rose-200 text-base px-4' : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500 hover:text-teal-700 active:scale-95'}
                    `}
                  >
                    {block.text}
                  </button>
                );
              })}
           </div>

           <div className="mt-auto flex justify-end">
             <button onClick={checkGameAnswer} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
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
  );
}