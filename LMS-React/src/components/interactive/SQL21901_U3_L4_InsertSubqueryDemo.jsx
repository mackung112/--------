import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  RefreshCcw,
  Code2,
  HelpCircle,
  Layers,
  CopyPlus,
  ArrowRightCircle,
  Filter,
  Copy
  } from 'lucide-react';

export default function SQL21901_U3_L4_InsertSubqueryDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
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

    // Simulate delay for animation effect
    setTimeout(() => {
      let filteredData = [];
      if (selectedCondition === "tier = 'Gold'") {
        filteredData = sourceData.filter(c => c.tier === 'Gold');
      } else if (selectedCondition === "points >= 1000") {
        filteredData = sourceData.filter(c => c.points >= 1000);
      }

      // Map to match target table structure (ignoring ID to let DB auto-generate, or mapping it)
      const newDataToInsert = filteredData.map(c => ({
        name: c.name,
        points: c.points
      }));

      if (newDataToInsert.length === 0) {
        showToast('ไม่มีข้อมูลที่ตรงตามเงื่อนไข (0 rows affected)', 'error');
        setIsAnimating(false);
        return;
      }

      setTargetData([...targetData, ...newDataToInsert]);
      setHasExecuted(true);
      setIsAnimating(false);
      showToast(`คัดลอกข้อมูลสำเร็จ ${newDataToInsert.length} แถวเข้าสู่ตารางเป้าหมาย!`, 'success');
    }, 800);

};

const resetSimulator = () => {
setTargetData(initialTargetData);
setHasExecuted(false);
setIsAnimating(false);
};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'INSERT INTO', type: 'cmd' },
{ id: 'b2', text: 'history_logs', type: 'table' },
{ id: 'b3', text: 'SELECT * FROM', type: 'cmd2' },
{ id: 'b4', text: 'active_logs', type: 'table' },
{ id: 'b5', text: "WHERE status = 'old'", type: 'cond' },
{ id: 't1', text: 'VALUES', type: 'trick' }, // Trick
{ id: 't2', text: 'UPDATE', type: 'trick' }, // Trick
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

    // Check tricks
    if (ans.includes('t1')) {
      showToast('ผิดครับ! เมื่อดึงข้อมูลจากตารางอื่นด้วย SELECT เราจะไม่ใช้คำว่า VALUES แล้ว', 'error');
      return;
    }

    // Exact match expected for logic
    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      showToast('ถูกต้องสมบูรณ์! การย้ายข้อมูลเก่าไปตาราง History มักใช้ท่านี้แหละครับ 🎉', 'success');
    } else {
      if (ans[0] !== 'b1') {
         showToast('คำสั่งต้องเริ่มด้วยการระบุว่าจะ "เพิ่มข้อมูล" (INSERT INTO)', 'error');
      } else if (ans[1] !== 'b2') {
         showToast('ต้องตามด้วย "ตารางเป้าหมาย" ที่ต้องการนำข้อมูลไปใส่', 'error');
      } else if (ans[2] !== 'b3') {
         showToast('ต้องใช้คำสั่งดึงข้อมูล (SELECT) จากตารางต้นทาง', 'error');
      } else {
         showToast('การเรียงลำดับยังไม่ถูกต้อง ลองอ่านทบทวนประโยคดูใหม่นะ', 'error');
      }
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
<Copy className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-md shadow-inner">
Unit 3.4 การเพิ่มข้อมูลด้วย Subquery
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
              1. ก๊อปปี้ข้อมูลข้ามตาราง (INSERT INTO ... SELECT)
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              บางครั้งเราไม่ได้ต้องการพิมพ์ข้อมูลใหม่เองทีละตัว แต่ต้องการ <strong className="text-indigo-600">"คัดลอก"</strong> ข้อมูลที่มีอยู่แล้วในตารางหนึ่ง ไปใส่ในอีกตารางหนึ่ง (เช่น การทำตารางสรุป, การย้ายข้อมูลเก่าไปเก็บ) เราจะใช้คำสั่ง <code className="bg-slate-200 px-1.5 rounded">SELECT</code> เข้ามาช่วยแทนการใช้ <code className="bg-slate-200 px-1.5 rounded">VALUES</code>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Database size={20}/> โครงสร้างคำสั่ง
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100">
                  <span className="text-blue-600">INSERT INTO</span> <span className="text-emerald-600">ตารางเป้าหมาย</span> (คอลัมน์1, คอลัมน์2)<br/>
                  <span className="text-rose-500 font-bold bg-rose-50 px-1 rounded">-- ตัดคำว่า VALUES ทิ้งไปเลย --</span><br/>
                  <span className="text-indigo-600 font-bold">SELECT</span> คอลัมน์1, คอลัมน์2<br/>
                  <span className="text-indigo-600 font-bold">FROM</span> <span className="text-amber-600">ตารางต้นทาง</span><br/>
                  <span className="text-indigo-600 font-bold">WHERE</span> เงื่อนไข;
                </pre>
                <div className="mt-4 text-sm text-rose-600 bg-rose-50 p-3 rounded-lg flex items-start gap-2 border border-rose-100">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p><strong>ข้อควรระวัง:</strong> จำนวนคอลัมน์และชนิดข้อมูลของ SELECT ต้อง <u className="underline-offset-2">ตรงกันและเรียงลำดับเหมือนกัน</u> กับตารางเป้าหมาย</p>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <div className="bg-gradient-to-r from-slate-100 to-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600"><Table2 size={24}/></div>
                  <div>
                    <p className="font-bold text-slate-700">ตารางต้นทาง (Source)</p>
                    <p className="text-xs text-slate-500">มีข้อมูลอยู่แล้ว 10,000 แถว</p>
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
        </section>

        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><CopyPlus className="text-blue-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Data Transfer</h2>
          </div>
          <p className="text-slate-600 max-w-3xl">
            สถานการณ์: เราต้องการเลื่อนขั้นลูกค้าเข้าสู่ตาราง <code>premium_customers</code> ลองเลือกเงื่อนไข (Subquery) เพื่อคัดลอกข้อมูลจากตาราง <code>all_customers</code> ดูครับ
          </p>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] p-5 text-slate-300 relative border-b-4 border-indigo-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                <span className="text-slate-400">;</span>
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

            {/* Bottom: Visual Tables */}
            <div className="grid md:grid-cols-2 bg-slate-50 p-6 gap-6 relative">
              {/* Arrow Indicator in Middle (Desktop) */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
                <div className={`transition-all duration-700 transform ${hasExecuted ? 'text-emerald-500 scale-125' : isAnimating ? 'text-indigo-400 translate-x-4 opacity-50' : 'text-slate-300'}`}>
                  <ArrowRightCircle size={40} fill="currentColor" className="text-white" />
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
                        <th className="p-2 border-b font-semibold">id</th>
                        <th className="p-2 border-b font-semibold">name</th>
                        <th className="p-2 border-b font-semibold">points</th>
                        <th className="p-2 border-b font-semibold">tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceData.map((row) => {
                        // Logic to highlight rows based on condition
                        let isMatch = false;
                        if (selectedCondition === "tier = 'Gold'" && row.tier === 'Gold') isMatch = true;
                        if (selectedCondition === "points >= 1000" && row.points >= 1000) isMatch = true;

                        return (
                          <tr key={row.id} className={`border-b last:border-0 transition-colors duration-500
                            ${isMatch ? (hasExecuted ? 'bg-indigo-50 border-indigo-200' : 'bg-yellow-50/60') : ''}
                          `}>
                            <td className="p-2 font-mono text-xs text-slate-500">{row.id}</td>
                            <td className="p-2 font-medium">{row.name}</td>
                            <td className="p-2 text-slate-600">{row.points}</td>
                            <td className="p-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold
                                ${row.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
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
                <div className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-500 min-h-[180px]
                  ${hasExecuted ? 'bg-white border-emerald-300 ring-2 ring-emerald-100' : 'bg-slate-100/50 border-slate-200 border-dashed'}
                `}>
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className={`${hasExecuted ? 'bg-emerald-50' : 'bg-slate-100'} text-slate-600 transition-colors`}>
                      <tr>
                        <th className="p-2 border-b font-semibold">name <span className="text-xs font-normal text-emerald-600">(รอรับค่า)</span></th>
                        <th className="p-2 border-b font-semibold">points <span className="text-xs font-normal text-emerald-600">(รอรับค่า)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {targetData.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="p-8 text-center text-slate-400 italic font-medium">
                            {isAnimating ? 'กำลังคัดลอกข้อมูล...' : 'ตารางยังว่างเปล่า รันคำสั่งเพื่อดึงข้อมูลมาใส่'}
                          </td>
                        </tr>
                      ) : (
                        targetData.map((row, idx) => (
                          <tr key={idx} className="border-b last:border-0 bg-white animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms`}}>
                            <td className="p-2 font-medium text-emerald-700 flex items-center gap-2">
                              {row.name}
                              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1 rounded uppercase">New</span>
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
        </section>

        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><Blocks className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <HelpCircle className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: ย้ายข้อมูลเก่าไปเก็บ</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    ประกอบบล็อกคำสั่งเพื่อนำข้อมูลจากตาราง <code className="text-white bg-slate-700 px-1.5 rounded">active_logs</code> เฉพาะสถานะ 'old' ไปบันทึกเก็บไว้ในตาราง <code className="text-white bg-emerald-700 px-1.5 rounded">history_logs</code>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับ:</p>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[100px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
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
                            : block.type === 'table' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 cursor-pointer hover:shadow-indigo-500/20 active:scale-95'}
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

      {/* Global Toast */}
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