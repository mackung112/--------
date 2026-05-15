import React, { useState, useEffect, useRef } from 'react';
  import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  Code2,
  AlertOctagon,
  XCircle,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
  Save,
  Undo2,
  Play,
  Landmark,
  TerminalSquare
  } from 'lucide-react';

export default function SQL21901_U3_L10_TransactionDemo() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Simulator State ---
const initialAlice = 50000;
const initialBob = 10000;

const [aliceBal, setAliceBal] = useState(initialAlice);
const [bobBal, setBobBal] = useState(initialBob);

// Pending states represent uncommitted data inside a transaction
const [pendingAlice, setPendingAlice] = useState(null);
const [pendingBob, setPendingBob] = useState(null);

const [activeScenario, setActiveScenario] = useState('success');
const [isAnimating, setIsAnimating] = useState(false);
const [logs, setLogs] = useState([]);
const [transactionStatus, setTransactionStatus] = useState('IDLE'); // IDLE, ACTIVE, COMMITTED, ROLLED_BACK, ERROR

const scenarios = {
success: {
id: 'success',
icon: <Save size={18} />,
title: "1. โอนสำเร็จ (COMMIT)",
desc: "จำลองการโอนเงิน 5,000 ราบรื่น และบันทึกถาวร",
color: "emerald"
},
error: {
id: 'error',
icon: <Undo2 size={18} />,
title: "2. ระบบล่ม (ROLLBACK)",
desc: "จำลองไฟดับระหว่างโอน ยกเลิกคำสั่งทั้งหมดให้กลับเป็นเหมือนเดิม",
color: "rose"
}
};

const executeScenario = async () => {
if (isAnimating) return;
setIsAnimating(true);
setLogs([]);
setPendingAlice(null);
setPendingBob(null);
setTransactionStatus('ACTIVE');

    if (activeScenario === 'success') {
      // Step 1: BEGIN
      setLogs([{ text: "BEGIN;", type: 'cmd' }]);
      await delay(800);

      // Step 2: Deduct Alice
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';", type: 'cmd' }]);
      setPendingAlice(aliceBal - 5000);
      await delay(1200);

      // Step 3: Add Bob
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance + 5000 WHERE name = 'Bob';", type: 'cmd' }]);
      setPendingBob(bobBal + 5000);
      await delay(1200);

      // Step 4: COMMIT
      setLogs(prev => [...prev, { text: "COMMIT;", type: 'success' }]);
      setAliceBal(prev => prev - 5000);
      setBobBal(prev => prev + 5000);
      setPendingAlice(null);
      setPendingBob(null);
      setTransactionStatus('COMMITTED');
      showToast('Transaction ถูกยืนยัน ข้อมูลถูกบันทึกถาวรแล้ว', 'success');

    } else if (activeScenario === 'error') {
      // Step 1: BEGIN
      setLogs([{ text: "BEGIN;", type: 'cmd' }]);
      await delay(800);

      // Step 2: Deduct Alice
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';", type: 'cmd' }]);
      setPendingAlice(aliceBal - 5000);
      await delay(1200);

      // Step 3: SYSTEM CRASH
      setTransactionStatus('ERROR');
      setLogs(prev => [...prev, { text: "-- ERROR: Database Connection Lost --", type: 'error' }]);
      showToast('เกิดข้อผิดพลาด! ระบบล่มกลางคัน', 'error');
      await delay(1500);

      // Step 4: ROLLBACK
      setLogs(prev => [...prev, { text: "ROLLBACK;", type: 'rollback' }]);
      setPendingAlice(null); // Discard pending changes
      setPendingBob(null);
      setTransactionStatus('ROLLED_BACK');
      showToast('ระบบทำการ Rollback คืนเงินกลับสู่สถานะเดิมก่อนโอน', 'warning');
    }

    setIsAnimating(false);

};

const resetSimulator = () => {
if (isAnimating) return;
setAliceBal(initialAlice);
setBobBal(initialBob);
setPendingAlice(null);
setPendingBob(null);
setLogs([]);
setTransactionStatus('IDLE');
showToast('รีเซ็ตยอดเงินในบัญชีกลับเป็นค่าเริ่มต้น', 'success');
};

// Game: Arrange safe transaction
const gameBlocks = [
{ id: 'b1', text: 'BEGIN;', type: 'ctrl' },
{ id: 'b2', text: "UPDATE account SET bal = bal - 100", type: 'cmd' },
{ id: 'b3', text: "UPDATE account SET bal = bal + 100", type: 'cmd' },
{ id: 'b4', text: 'COMMIT;', type: 'ctrl' },
{ id: 't1', text: 'ROLLBACK;', type: 'trick' }, // Trick
{ id: 't2', text: 'SELECT *', type: 'trick' }, // Trick
];

const [dropzones, setDropzones] = useState(Array(4).fill(null));
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
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 4 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t2')) {
      showToast('ผิดพลาด! SELECT ใช้ดูข้อมูลเฉยๆ ไม่เกี่ยวข้องกับการล็อก Transaction เพื่อเปลี่ยนแปลงข้อมูล', 'error');
      return;
    }

    if (ans[0] !== 'b1') {
      showToast('ผิดพลาด! Transaction ต้องเริ่มต้นด้วยคำสั่ง BEGIN; เสมอ', 'error');
      return;
    }

    if (ans[3] === 't1') {
      showToast('โครงสร้างถูก แต่ถ้าใช้ ROLLBACK; ข้อมูลที่ทำมาทั้งหมดจะถูกยกเลิกนะ! ภารกิจนี้เราต้องการให้โอนสำเร็จ', 'warning');
      return;
    }

    if (ans[3] !== 'b4') {
      showToast('ผิดพลาด! ต้องปิดท้ายด้วย COMMIT; เพื่อเซฟข้อมูลลงฐานข้อมูลอย่างถาวร', 'error');
      return;
    }

    // Check middle steps (can be either order for deductions/additions)
    const hasUpdates = (ans[1] === 'b2' && ans[2] === 'b3') || (ans[1] === 'b3' && ans[2] === 'b2');

    if (ans[0] === 'b1' && hasUpdates && ans[3] === 'b4') {
      showToast('ถูกต้อง ยอดเยี่ยม! นี่คือโครงสร้าง Transaction พื้นฐานที่ปลอดภัย (BEGIN -> งานต่างๆ -> COMMIT)', 'success');
    } else {
       showToast('ลำดับคำสั่งยังไม่ถูกต้อง ลองตรวจสอบการวางคำสั่ง UPDATE อีกครั้ง', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(4).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/* Header */}
<header className="bg-gradient-to-r from-indigo-800 to-slate-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm shadow-inner border border-white/20">
<ShieldCheck className="text-indigo-300" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-indigo-200 opacity-90">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-indigo-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-400/50 backdrop-blur-md shadow-inner text-white tracking-wide">
Unit 3.10 การใช้ Transaction
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Theory Section */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-2">
               <ArrowRightLeft className="text-indigo-700" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              คุ้มครองข้อมูลด้วย <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Transaction</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              <strong>Transaction</strong> คือการจับมัดรวมคำสั่ง SQL หลายๆ คำสั่งให้ทำงานเสมือนเป็น "งานชิ้นเดียว"
              มีกฎเหล็กคือ <strong>"All or Nothing" (ต้องสำเร็จทั้งหมด หรือไม่ก็ยกเลิกทั้งหมด)</strong> เพื่อป้องกันปัญหาข้อมูลครึ่งๆ กลางๆ เช่น ตัดเงินจากบัญชี A แล้ว แต่ระบบพังก่อนเข้าบัญชี B
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
             <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-slate-200">
                  <Play size={20} className="text-slate-600" fill="currentColor"/>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 text-lg">BEGIN;</h3>
                <p className="text-sm text-slate-600">จุดเริ่มต้น ประกาศให้ฐานข้อมูลรู้ว่าคำสั่งต่อจากนี้ให้ผูกรวมเป็นงานเดียวกัน ยังไม่ให้บันทึกจริงจนกว่าจะสั่ง</p>
             </div>

             <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-emerald-200">
                  <Save size={20} className="text-emerald-700"/>
                </div>
                <h3 className="font-bold text-emerald-900 mb-1 text-lg">COMMIT;</h3>
                <p className="text-sm text-emerald-800">จุดจบแบบสมบูรณ์ ถ้าง่ายทุกคำสั่งรันผ่านหมด สั่ง COMMIT เพื่อ "ยืนยันการบันทึก" ข้อมูลลงดิสก์อย่างถาวร</p>
             </div>

             <div className="bg-rose-50 border-2 border-rose-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-rose-200">
                  <Undo2 size={20} className="text-rose-700"/>
                </div>
                <h3 className="font-bold text-rose-900 mb-1 text-lg">ROLLBACK;</h3>
                <p className="text-sm text-rose-800">จุดจบแบบฉุกเฉิน หากมี Error เกิดขึ้น สั่ง ROLLBACK เพื่อ "ย้อนกลับ" ข้อมูลทุกอย่างไปสู่สภาพเดิมก่อนเริ่ม BEGIN</p>
             </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg shadow-sm border border-indigo-200"><Landmark className="text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: Bank Transfer</h2>
            </div>
            <button onClick={resetSimulator} disabled={isAnimating} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-indigo-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50">
              <RefreshCcw size={16} /> รีเซ็ตยอดเงิน
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 min-h-[500px]">

            {/* Sidebar: Scenarios */}
            <div className="flex flex-col bg-slate-50 md:w-80 shrink-0 border-r border-slate-200 z-10">
                <div className="px-5 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 bg-slate-100/50">
                  <Layers size={14}/> เลือกสถานการณ์
                </div>
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  const sc = scenarios[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveScenario(key)}
                      disabled={isAnimating}
                      className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                        ${isActive ? `bg-white border-${sc.color}-500 shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10` : 'border-transparent hover:bg-white/60'}
                        ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? `bg-${sc.color}-100 text-${sc.color}-600` : 'bg-slate-200 text-slate-500'}`}>
                        {sc.icon}
                      </div>
                      <div>
                        <div className={`font-bold text-sm mb-1 ${isActive ? `text-${sc.color}-700` : 'text-slate-700'}`}>{sc.title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{sc.desc}</div>
                      </div>
                    </button>
                  )
                })}

                <div className="mt-auto p-5 border-t border-slate-200">
                  <button
                      onClick={executeScenario}
                      disabled={isAnimating}
                      className={`w-full font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-white
                        ${isAnimating ? 'bg-slate-400 cursor-not-allowed' :
                          activeScenario === 'success' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                        }`}
                    >
                      {isAnimating ? <RefreshCcw size={18} className="animate-spin"/> : <Play size={18} fill="currentColor" />}
                      {isAnimating ? 'กำลังจำลองระบบ...' : 'Execute Transaction'}
                  </button>
                </div>
            </div>

            {/* Main Content Area: Terminal & Bank Cards */}
            <div className="flex-1 flex flex-col relative bg-slate-100/50">

              {/* Top: Terminal SQL Viewer */}
              <div className="bg-[#1e1e2e] p-5 flex flex-col h-48 border-b border-slate-700 shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3 border-b border-slate-700 pb-2">
                  <TerminalSquare size={14}/> SQL Execution Log
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 pr-2">
                  {logs.length === 0 && <span className="text-slate-600 italic">// รอการรันคำสั่ง...</span>}
                  {logs.map((log, idx) => (
                    <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2
                      ${log.type === 'cmd' ? 'text-blue-300' :
                        log.type === 'success' ? 'text-emerald-400 font-bold' :
                        log.type === 'rollback' ? 'text-rose-400 font-bold' : 'text-amber-400 bg-amber-400/10 inline-block px-2 py-0.5 rounded'}
                    `}>
                      <span className="text-slate-500 mr-2">{'>'}</span>{log.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Visual Accounts */}
              <div className="p-6 flex-1 flex flex-col items-center justify-center relative">

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm
                    ${transactionStatus === 'IDLE' ? 'bg-slate-200 text-slate-600 border-slate-300' :
                      transactionStatus === 'ACTIVE' ? 'bg-amber-100 text-amber-700 border-amber-300 animate-pulse' :
                      transactionStatus === 'COMMITTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                      transactionStatus === 'ERROR' ? 'bg-rose-600 text-white border-rose-700 animate-bounce' :
                      'bg-rose-100 text-rose-700 border-rose-300'}`}>

                    {transactionStatus === 'IDLE' && <CheckCircle2 size={12}/>}
                    {transactionStatus === 'ACTIVE' && <RefreshCcw size={12} className="animate-spin"/>}
                    {transactionStatus === 'COMMITTED' && <Save size={12}/>}
                    {transactionStatus === 'ERROR' && <AlertTriangle size={12}/>}
                    {transactionStatus === 'ROLLED_BACK' && <Undo2 size={12}/>}
                    {transactionStatus}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 mt-4">

                  {/* Account A (Alice) */}
                  <div className={`bg-white p-6 rounded-2xl w-full max-w-[280px] text-center transition-all duration-500
                    ${transactionStatus === 'ACTIVE' && pendingAlice !== null ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : 'shadow-md border border-slate-200'}`}>
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-2xl">A</span>
                    </div>
                    <h3 className="font-bold text-slate-700 text-lg">บัญชีนาย A (Alice)</h3>

                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                      <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-widest">Balance</div>

                      {pendingAlice !== null ? (
                        <div className="animate-in slide-in-from-top-4 duration-300">
                          <div className="text-sm text-slate-400 line-through mb-0.5 font-mono">{aliceBal.toLocaleString()} ฿</div>
                          <div className="text-2xl font-bold text-amber-500 font-mono flex items-center justify-center gap-1">
                            {pendingAlice.toLocaleString()} ฿ <span className="text-xs font-normal text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">*Pending</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-2xl font-bold font-mono transition-colors duration-500
                          ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {aliceBal.toLocaleString()} ฿
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transfer Arrow */}
                  <div className={`flex flex-col items-center justify-center transition-opacity duration-300
                    ${transactionStatus === 'ACTIVE' ? 'opacity-100' : 'opacity-20'}`}>
                    <div className="text-xs font-bold text-amber-600 mb-2 bg-amber-100 px-3 py-1 rounded-full animate-pulse shadow-sm">
                      โอน 5,000 ฿
                    </div>
                    <ArrowRightLeft size={32} className={`text-slate-400 ${transactionStatus === 'ACTIVE' ? 'text-amber-500 animate-pulse' : ''}`} />
                  </div>

                  {/* Account B (Bob) */}
                  <div className={`bg-white p-6 rounded-2xl w-full max-w-[280px] text-center transition-all duration-500
                    ${transactionStatus === 'ACTIVE' && pendingBob !== null ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : 'shadow-md border border-slate-200'}`}>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-2xl">B</span>
                    </div>
                    <h3 className="font-bold text-slate-700 text-lg">บัญชีนาย B (Bob)</h3>

                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                      <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-widest">Balance</div>

                      {pendingBob !== null ? (
                        <div className="animate-in slide-in-from-top-4 duration-300">
                          <div className="text-sm text-slate-400 line-through mb-0.5 font-mono">{bobBal.toLocaleString()} ฿</div>
                          <div className="text-2xl font-bold text-amber-500 font-mono flex items-center justify-center gap-1">
                            {pendingBob.toLocaleString()} ฿ <span className="text-xs font-normal text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">*Pending</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-2xl font-bold font-mono transition-colors duration-500
                          ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {bobBal.toLocaleString()} ฿
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logic Challenge Section */}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-purple-100 p-2.5 rounded-xl shadow-sm border border-purple-200"><Code2 className="text-purple-700" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Logic Challenge: สร้าง Transaction ที่สมบูรณ์</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบการจัดลำดับคำสั่งเพื่อความปลอดภัยของข้อมูล</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <ShieldCheck className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-indigo-300 font-bold text-xl mb-2">ภารกิจ: โอนเงิน 100 บาทอย่างปลอดภัย</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อ <strong>สร้าง Transaction</strong> ที่หักเงินบัญชีหนึ่ง และเพิ่มเงินให้อีกบัญชีหนึ่ง
                    และจบกระบวนการเพื่อ <strong>บันทึกข้อมูลถาวร</strong>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-wrap gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-rose-500/50' :
                             block.type === 'ctrl' ? 'bg-emerald-600 text-white shadow-emerald-600/50' : 'bg-indigo-600 text-white shadow-lg border border-indigo-500 hover:-translate-y-1')
                          : 'min-w-[120px] flex-1 bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-5 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-3 rounded-xl font-mono text-sm font-bold shadow-sm transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-50 cursor-not-allowed scale-95'
                            : block.type === 'trick' ? 'bg-slate-800 text-rose-300 border-rose-900/50 hover:bg-rose-900/40 hover:text-rose-200 hover:border-rose-500 cursor-pointer text-lg'
                            : block.type === 'ctrl' ? 'bg-slate-800 text-emerald-300 border-emerald-900/50 hover:bg-emerald-900/40 hover:text-emerald-200 hover:border-emerald-500 cursor-pointer text-lg'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-md cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบคำสั่ง
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast Notification */}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}