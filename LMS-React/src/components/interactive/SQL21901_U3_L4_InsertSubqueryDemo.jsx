import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  Code2,
  HelpCircle,
  Copy,
  CopyPlus,
  ArrowRightCircle,
  Filter,
  TerminalSquare
} from 'lucide-react';

export default function SQL21901_U3_L4_InsertSubqueryDemo() {
  // --- Terminal State ---
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Syntax Engine Initialized.' },
    { type: 'system', text: 'Subquery insertion mode enabled. Select data from source table to insert into target table.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
  };

  // --- Simulator State ---
  const initialSourceData = [
    { id: 'C01', name: 'สมชาย', points: 150, tier: 'Silver' },
    { id: 'C02', name: 'สมหญิง', points: 1200, tier: 'Gold' },
    { id: 'C03', name: 'ใจดี', points: 80, tier: 'Bronze' },
    { id: 'C04', name: 'รักชาติ', points: 2500, tier: 'Platinum' },
    { id: 'C05', name: 'มีสุข', points: 950, tier: 'Gold' },
  ];

  const initialTargetData = [];

  const [sourceData, setSourceData] = useState(initialSourceData);
  const [targetData, setTargetData] = useState(initialTargetData);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState("tier = 'Gold'");
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Logic for Simulator ---
  const executeSubquery = () => {
    if (hasExecuted) return;

    setIsAnimating(true);
    const sqlStr = `INSERT INTO premium_customers (name, points) SELECT name, points FROM all_customers WHERE ${selectedCondition};`;
    logToTerminal(`mysql> ${sqlStr}`, 'command');

    // Simulate delay for animation effect
    setTimeout(() => {
      let filteredData = [];
      if (selectedCondition === "tier = 'Gold'") {
        filteredData = sourceData.filter(c => c.tier === 'Gold');
      } else if (selectedCondition === "points >= 1000") {
        filteredData = sourceData.filter(c => c.points >= 1000);
      }

      const newDataToInsert = filteredData.map(c => ({
        name: c.name,
        points: c.points
      }));

      if (newDataToInsert.length === 0) {
        logToTerminal('> Query OK, 0 rows affected. ไม่มีข้อมูลที่ตรงตามเงื่อนไข (0 rows)', 'error');
        setIsAnimating(false);
        return;
      }

      setTargetData([...targetData, ...newDataToInsert]);
      setHasExecuted(true);
      setIsAnimating(false);
      logToTerminal(`> Query OK, ${newDataToInsert.length} rows affected. คัดลอกข้อมูลสำเร็จ!`, 'success');
    }, 800);
  };

  const resetSimulator = () => {
    setTargetData(initialTargetData);
    setHasExecuted(false);
    setIsAnimating(false);
    logToTerminal('> System: Table and simulator reset.', 'system');
  };

  // --- Mini Game State ---
  const gameBlocks = [
    { id: 'b1', text: 'INSERT INTO', type: 'cmd' },
    { id: 'b2', text: 'history_logs', type: 'table' },
    { id: 'b3', text: 'SELECT * FROM', type: 'cmd2' },
    { id: 'b4', text: 'active_logs', type: 'table' },
    { id: 'b5', text: "WHERE status = 'old'", type: 'cond' },
    { id: 't1', text: 'VALUES', type: 'trick' },
    { id: 't2', text: 'UPDATE', type: 'trick' },
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

    // Check tricks
    if (ans.includes('t1')) {
      logToTerminal('> Error: Invalid Syntax. เมื่อดึงข้อมูลจากตารางอื่นด้วย SELECT เราจะไม่ใช้คำว่า VALUES แล้ว', 'error');
      return;
    }

    // Exact match expected for logic
    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      logToTerminal('> Success: Syntax Check Passed. ถูกต้องสมบูรณ์! การย้ายข้อมูลเก่าไปตาราง History มักใช้ท่านี้แหละครับ', 'success');
    } else {
      if (ans[0] !== 'b1') {
         logToTerminal('> Error: คำสั่งต้องเริ่มด้วยการระบุว่าจะ "เพิ่มข้อมูล" (INSERT INTO)', 'error');
      } else if (ans[1] !== 'b2') {
         logToTerminal('> Error: ต้องตามด้วย "ตารางเป้าหมาย" ที่ต้องการนำข้อมูลไปใส่', 'error');
      } else if (ans[2] !== 'b3') {
         logToTerminal('> Error: ต้องใช้คำสั่งดึงข้อมูล (SELECT) จากตารางต้นทาง', 'error');
      } else {
         logToTerminal('> Error: Syntax Check Failed. การเรียงลำดับยังไม่ถูกต้อง ลองอ่านทบทวนประโยคดูใหม่', 'error');
      }
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
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <Copy size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเพิ่มข้อมูลด้วย Subquery (INSERT INTO ... SELECT)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การนำข้อมูลที่ได้จากการ SELECT จากตารางหนึ่ง มาเพิ่ม (INSERT) ลงในอีกตารางหนึ่ง
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top: Explanations */}
        <div className="p-6 border-b border-slate-200 bg-white grid md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Database size={20}/> โครงสร้างคำสั่ง (ลดรูป VALUES ทิ้ง)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-white p-4 rounded-xl leading-relaxed border border-slate-200">
                  <span className="text-blue-600 font-bold">INSERT INTO</span> <span className="text-emerald-600 font-bold">ตารางเป้าหมาย</span> (คอลัมน์1, คอลัมน์2)<br/>
                  <span className="text-indigo-600 font-bold">SELECT</span> คอลัมน์1, คอลัมน์2<br/>
                  <span className="text-indigo-600 font-bold">FROM</span> <span className="text-amber-600 font-bold">ตารางต้นทาง</span><br/>
                  <span className="text-indigo-600 font-bold">WHERE</span> เงื่อนไข;
                </pre>
            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-gradient-to-r from-slate-100 to-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600"><Table2 size={24}/></div>
                  <div>
                    <p className="font-bold text-slate-700">ตารางต้นทาง (Source)</p>
                    <p className="text-xs text-slate-700">มีข้อมูลอยู่แล้ว 10,000 แถว</p>
                  </div>
                </div>
                <div className="flex justify-center -my-2 z-10">
                  <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md border-4 border-white flex items-center gap-2">
                    <Filter size={14} /> SELECT (กรองเฉพาะที่ต้องการ)
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><Table2 size={24}/></div>
                  <div>
                    <p className="font-bold text-emerald-800">ตารางเป้าหมาย (Target)</p>
                    <p className="text-xs text-emerald-600/70">รับข้อมูลที่กรองแล้วเข้าไปต่อท้าย</p>
                  </div>
                </div>
            </div>
        </div>

        {/* Middle: Simulator */}
        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          {/* SQL Command Builder */}
          <div className="bg-[#1e1e2e] p-5 text-slate-600 relative border-b-4 border-indigo-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="font-mono text-sm leading-loose overflow-x-auto w-full">
              <span className="text-[#cba6f7]">INSERT INTO</span> <span className="text-[#a6e3a1]">premium_customers</span> (name, points)<br/>
              <span className="text-[#cba6f7]">SELECT</span> name, points <span className="text-[#cba6f7]">FROM</span> <span className="text-[#f9e2af]">all_customers</span> <br className="md:hidden" />
              <span className="text-[#cba6f7]">WHERE</span>
              <select
                value={selectedCondition}
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                  setHasExecuted(false);
                  setTargetData([]);
                }}
                disabled={hasExecuted}
                className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 outline-none focus:border-indigo-400 disabled:opacity-50"
              >
                <option value="tier = 'Gold'">tier = 'Gold'</option>
                <option value="points >= 1000">points &gt;= 1000</option>
              </select>
              <span className="text-slate-600">;</span>
            </div>

            <div className="shrink-0 flex gap-2 w-full md:w-auto">
              {hasExecuted ? (
                <button onClick={resetSimulator} className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <RefreshCcw size={16} /> รีเซ็ต
                </button>
              ) : (
                <button
                  onClick={executeSubquery}
                  disabled={isAnimating}
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Execute'}
                </button>
              )}
            </div>
          </div>

          {/* Visual Tables */}
          <div className="grid md:grid-cols-2 p-6 gap-6 relative">
            {/* Arrow Indicator in Middle (Desktop) */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
              <div className={`transition-all duration-700 transform ${hasExecuted ? 'text-emerald-500 scale-125' : isAnimating ? 'text-indigo-400 translate-x-4 opacity-50' : 'text-slate-300'}`}>
                <ArrowRightCircle size={40} fill="currentColor" className="text-white bg-slate-50 rounded-full" />
              </div>
            </div>

            {/* Source Table */}
            <div>
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                <Database size={16} className="text-amber-500"/> ตารางต้นทาง (all_customers)
              </h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold w-16">id</th>
                      <th className="p-2 border-b font-semibold">name</th>
                      <th className="p-2 border-b font-semibold">points</th>
                      <th className="p-2 border-b font-semibold">tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourceData.map((row) => {
                      let isMatch = false;
                      if (selectedCondition === "tier = 'Gold'" && row.tier === 'Gold') isMatch = true;
                      if (selectedCondition === "points >= 1000" && row.points >= 1000) isMatch = true;

                      return (
                        <tr key={row.id} className={`border-b last:border-0 transition-colors duration-500
                          ${isMatch ? (hasExecuted ? 'bg-indigo-50 border-indigo-200' : 'bg-amber-50/60') : ''}
                        `}>
                          <td className="p-2 font-mono text-xs text-slate-700">{row.id}</td>
                          <td className="p-2 font-medium text-slate-800">{row.name}</td>
                          <td className="p-2 text-slate-600">{row.points}</td>
                          <td className="p-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider
                              ${row.tier === 'Gold' ? 'bg-amber-100 text-amber-800' :
                                row.tier === 'Platinum' ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600'}
                            `}>{row.tier}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Table */}
            <div>
                <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-3 bg-emerald-50 p-2 border border-emerald-200 rounded-lg shadow-sm">
                <Database size={16} className="text-emerald-500"/> ตารางเป้าหมาย (premium_customers)
              </h3>
              <div className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-500 h-[calc(100%-48px)] flex flex-col
                ${hasExecuted ? 'bg-white border-emerald-300 ring-2 ring-emerald-100' : 'bg-slate-100/50 border-slate-200 border-dashed'}
              `}>
                <table className="w-full text-left border-collapse text-sm flex-1">
                  <thead className={`${hasExecuted ? 'bg-emerald-50' : 'bg-slate-100'} text-slate-600 transition-colors`}>
                    <tr>
                      <th className="p-2 border-b font-semibold">name <span className="text-[10px] font-normal text-emerald-600">(รอรับค่า)</span></th>
                      <th className="p-2 border-b font-semibold">points <span className="text-[10px] font-normal text-emerald-600">(รอรับค่า)</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetData.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="p-8 text-center text-slate-600 italic font-medium">
                          {isAnimating ? 'กำลังคัดลอกข้อมูล...' : 'ตารางยังว่างเปล่า รันคำสั่งเพื่อดึงข้อมูลมาใส่'}
                        </td>
                      </tr>
                    ) : (
                      targetData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 bg-white animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms`}}>
                          <td className="p-2 font-medium text-emerald-700 flex items-center gap-2">
                            {row.name}
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase font-bold">New</span>
                          </td>
                          <td className="p-2 font-mono text-slate-700">{row.points}</td>
                        </tr>
                      ))
                    )}
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
               <HelpCircle size={16} className="text-indigo-500" /> Syntax Builder
             </h4>
             <button onClick={resetGame} className="text-xs text-slate-700 hover:text-slate-800 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                <RefreshCcw size={12} /> เริ่มใหม่
              </button>
           </div>
           
           <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
             <strong className="text-indigo-600">ภารกิจ:</strong> ย้ายข้อมูลเก่าไปเก็บ นำข้อมูลจากตาราง <code>active_logs</code> เฉพาะสถานะ 'old' ไปบันทึกเก็บไว้ในตาราง <code>history_logs</code>
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
                    ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 border-solid bg-slate-700' : ''}
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
                      ${isUsed ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50' : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-500 hover:text-indigo-700 active:scale-95'}
                    `}
                  >
                    {block.text}
                  </button>
                );
              })}
           </div>

           <div className="mt-auto flex justify-end">
             <button onClick={checkGameAnswer} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
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
  );
}