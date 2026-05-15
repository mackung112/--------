import React, { useState, useEffect } from 'react';
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
  Code2
  } from 'lucide-react';

export default function SQL21901_U3_L6_UpdateSetDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialEmployees = [
{ id: 'E01', name: 'สมชาย', position: 'Developer', salary: 30000, bonus: 0 },
{ id: 'E02', name: 'สมหญิง', position: 'Designer', salary: 28000, bonus: 0 },
{ id: 'E03', name: 'สมศรี', position: 'Tester', salary: 25000, bonus: 0 },
{ id: 'E04', name: 'สมปอง', position: 'Developer', salary: 32000, bonus: 0 },
];

// Store current state and keep a copy of initial state inside objects for easy comparison rendering
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

    setTimeout(() => {
      const scenarioObj = scenarios[activeScenario];
      const { newData, count, matchIds } = scenarioObj.execute(employees);

      setEmployees(newData);
      setHighlightedRows(matchIds);
      setIsAnimating(false);
      showToast(`อัปเดตข้อมูลสำเร็จ! ผลกระทบ ${count} แถว`, 'success');
    }, 600);

};

const resetSimulator = () => {
setEmployees(createInitialState());
setHighlightedRows([]);
showToast('รีเซ็ตข้อมูลพนักงานกลับค่าเริ่มต้นแล้ว', 'success');
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
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check for common mistake: using AND instead of comma
    if (ans.includes('t1')) {
      showToast('ผิดครับ! การอัปเดตหลายคอลัมน์ในคำสั่ง SET ต้องใช้ลูกน้ำ ( , ) คั่น ห้ามใช้ AND เด็ดขาด', 'error');
      return;
    }

    // Correct sequences (allowing swap of the two SET columns)
    const isCorrect1 = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5';
    const isCorrect2 = ans[0] === 'b1' && ans[1] === 'b4' && ans[2] === 'b3' && ans[3] === 'b2' && ans[4] === 'b5';

    if (isCorrect1 || isCorrect2) {
      showToast('ยอดเยี่ยม! ถูกต้องตามหลักไวยากรณ์ การใช้ลูกน้ำ (,) คั่นคอลัมน์คือหัวใจสำคัญ', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> SET col1 -> , -> col2 -> WHERE', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/* Header */}
<header className="bg-gradient-to-r from-teal-700 to-cyan-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Edit3 className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-teal-100">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-cyan-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-cyan-400/50 backdrop-blur-md shadow-inner text-white">
Unit 3.6 การแก้ไขข้อมูล (SET)
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              กลไกการทำงานของ <span className="text-teal-600">SET Clause</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              หลังจากที่ใช้คำสั่ง <code className="bg-slate-200 px-1.5 rounded font-bold">UPDATE</code> เพื่อบอกว่าจะแก้ไขตารางไหนแล้ว เราต้องใช้ <code className="bg-teal-100 text-teal-800 px-1.5 rounded font-bold">SET</code> เพื่อกำหนด <strong>"คอลัมน์"</strong> และ <strong>"ค่าใหม่"</strong> ที่ต้องการเปลี่ยน
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Edit3 className="text-blue-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไข 1 คอลัมน์</h3>
                <p className="text-sm text-slate-600 mb-4">กำหนดค่าตรงไปตรงมา</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET salary = 35000
                </code>
             </div>

             <div className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">ระวังผิดบ่อย!</div>
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><UserCheck className="text-teal-600"/></div>
                <h3 className="font-bold text-teal-900 mb-2">แก้ไขหลายคอลัมน์</h3>
                <p className="text-sm text-teal-700 mb-4">ต้องใช้ <strong className="text-rose-500 text-lg">,</strong> คั่นเสมอ (ห้ามใช้ AND)</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET status = 'A'<span className="text-rose-400 font-bold text-lg">,</span> <br/>role = 'admin'
                </code>
             </div>

             <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Calculator className="text-amber-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไขด้วยการคำนวณ</h3>
                <p className="text-sm text-slate-600 mb-4">อ้างอิงค่าเดิมมาบวก/ลบได้</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET price = price + 50
                </code>
             </div>
          </div>
        </section>

        {}
        {/* Section 2: Simulator */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-lg"><Code2 className="text-teal-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: UPDATE SET Patterns</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-1.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
              <RefreshCcw size={14} /> รีเซ็ตข้อมูล
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Sidebar: Scenarios */}
              <div className="flex flex-col bg-slate-900 md:w-64 shrink-0 border-r border-slate-700">
                 <div className="px-4 py-3 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">เลือกรูปแบบคำสั่ง</div>
                 {Object.keys(scenarios).map((key) => {
                   const isActive = activeScenario === key;
                   return (
                     <button
                       key={key}
                       onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                       className={`text-left px-4 py-4 flex items-start gap-3 transition-colors border-l-4
                         ${isActive ? 'bg-[#1e1e2e] text-teal-400 border-teal-500' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}
                       `}
                     >
                       <div className={`mt-0.5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`}>
                         {scenarios[key].icon}
                       </div>
                       <div>
                         <div className="font-bold text-sm mb-1">{scenarios[key].title}</div>
                         <div className="text-xs opacity-70 leading-snug">{scenarios[key].desc}</div>
                       </div>
                     </button>
                   )
                 })}
              </div>

              {/* Code Editor Area */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-[15px] leading-loose overflow-x-auto w-full pt-2">
                   <div key={activeScenario} className="animate-in fade-in slide-in-from-right-4 duration-300">
                     {scenarios[activeScenario].sql}
                   </div>
                </div>

                <div className="flex justify-end border-t border-slate-700/50 pt-4">
                  <button
                    onClick={handleExecute}
                    disabled={isAnimating}
                    className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <Play size={18} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Run Update'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom: Visual Table */}
            <div className="p-6 bg-slate-50">
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={18} className="text-teal-600"/> ตาราง Employees</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-3 border-b font-semibold w-16 text-center">ID</th>
                        <th className="p-3 border-b font-semibold">Name</th>
                        <th className="p-3 border-b font-semibold">Position</th>
                        <th className="p-3 border-b font-semibold text-right">Salary (THB)</th>
                        <th className="p-3 border-b font-semibold text-right">Bonus (THB)</th>
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

                        const renderCell = (currentVal, origVal, isChanged, highlightClass = "text-teal-700 font-bold bg-teal-100/50 px-2 py-0.5 rounded") => {
                          if (isChanged) {
                            return (
                              <div className="flex flex-col justify-center animate-in zoom-in duration-500">
                                <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">{origVal.toLocaleString()}</span>
                                <span className={highlightClass}>{currentVal.toLocaleString()}</span>
                              </div>
                            );
                          }
                          return <span>{currentVal.toLocaleString()}</span>;
                        };

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-3 font-mono text-xs text-slate-400 text-center">{row.id}</td>
                            <td className="p-3 font-medium text-slate-700">{row.name}</td>
                            <td className="p-3">
                              {renderCell(row.position, row.orig_position, posChanged, "text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded text-xs")}
                            </td>
                            <td className="p-3 text-right font-mono text-sm">
                               {renderCell(row.salary, row.orig_salary, salChanged)}
                            </td>
                            <td className="p-3 text-right font-mono text-sm">
                               {renderCell(row.bonus, row.orig_bonus, bonChanged, "text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        </section>

        {}
        {/* Section 3: Minigame */}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><HelpCircle className="text-indigo-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">Syntax Challenge: กับดัก AND</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <AlertTriangle className="text-amber-950" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: อัปเดตหลายค่าพร้อมกัน</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    จงประกอบคำสั่งเพื่ออัปเดตตาราง users <br/>
                    โดยเปลี่ยนสถานะ (status) เป็น 'active' <strong>และ</strong> เลื่อนขั้น (role) เป็น 'admin' ให้กับ user ที่ id = 99
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="text-sm text-slate-400 font-mono font-medium">เรียงบล็อกคำสั่งที่นี่:</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? (block.type === 'comma' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 px-6 text-xl' : 'bg-teal-500 text-teal-950 shadow-lg border border-teal-400 hover:scale-105')
                          : 'min-w-[80px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-teal-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วน ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง (ระวังตัวหลอก!):</p>
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
                            : block.type === 'trick' ? 'bg-indigo-900 text-indigo-300 border-indigo-700 hover:bg-indigo-800 cursor-pointer'
                            : block.type === 'comma' ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 text-xl px-6 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-400 hover:-translate-y-1 cursor-pointer active:scale-95'}
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
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
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