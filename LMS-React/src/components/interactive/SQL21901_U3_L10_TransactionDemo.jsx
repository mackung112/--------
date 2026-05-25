import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  ArrowRightLeft,
  Save,
  Undo2,
  Play,
  Landmark,
  TerminalSquare,
  HelpCircle
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

export default function SQL21901_U3_L10_TransactionDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Transaction Demo loaded.' },
    { type: 'system', text: 'BEGIN → UPDATE → COMMIT หรือ ROLLBACK' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'system') => {
    setConsoleHistory((prev) => [...prev, { text, type }]);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const initialAlice = 50000;
  const initialBob = 10000;

  const [aliceBal, setAliceBal] = useState(initialAlice);
  const [bobBal, setBobBal] = useState(initialBob);
  const [pendingAlice, setPendingAlice] = useState(null);
  const [pendingBob, setPendingBob] = useState(null);
  const [activeScenario, setActiveScenario] = useState('success');
  const [isAnimating, setIsAnimating] = useState(false);
  const [sqlLogs, setSqlLogs] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState('IDLE');

  const scenarios = {
    success: {
      id: 'success',
      icon: <Save size={18} />,
      title: '1. โอนสำเร็จ (COMMIT)',
      desc: 'โอน 5,000 บาทและบันทึกถาวร',
    },
    error: {
      id: 'error',
      icon: <Undo2 size={18} />,
      title: '2. ระบบล่ม (ROLLBACK)',
      desc: 'ไฟดับกลางคัน — ย้อนกลับทั้งหมด',
    },
  };

  const pushSql = (text, type = 'cmd') => {
    setSqlLogs((prev) => [...prev, { text, type }]);
    logToTerminal(text, type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'rollback' ? 'warning' : 'command');
  };

  const executeScenario = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSqlLogs([]);
    setPendingAlice(null);
    setPendingBob(null);
    setTransactionStatus('ACTIVE');

    if (activeScenario === 'success') {
      pushSql('BEGIN;');
      await delay(800);
      pushSql("UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';");
      setPendingAlice(aliceBal - 5000);
      await delay(1200);
      pushSql("UPDATE accounts SET balance = balance + 5000 WHERE name = 'Bob';");
      setPendingBob(bobBal + 5000);
      await delay(1200);
      pushSql('COMMIT;', 'success');
      setAliceBal((prev) => prev - 5000);
      setBobBal((prev) => prev + 5000);
      setPendingAlice(null);
      setPendingBob(null);
      setTransactionStatus('COMMITTED');
      logToTerminal('> Transaction committed — ข้อมูลบันทึกถาวร', 'success');
    } else {
      pushSql('BEGIN;');
      await delay(800);
      pushSql("UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';");
      setPendingAlice(aliceBal - 5000);
      await delay(1200);
      setTransactionStatus('ERROR');
      pushSql('-- ERROR: Database Connection Lost --', 'error');
      await delay(1500);
      pushSql('ROLLBACK;', 'rollback');
      setPendingAlice(null);
      setPendingBob(null);
      setTransactionStatus('ROLLED_BACK');
      logToTerminal('> ROLLBACK — ยอดเงินกลับสู่ค่าเดิม', 'warning');
    }
    setIsAnimating(false);
  };

  const resetSimulator = () => {
    if (isAnimating) return;
    setAliceBal(initialAlice);
    setBobBal(initialBob);
    setPendingAlice(null);
    setPendingBob(null);
    setSqlLogs([]);
    setTransactionStatus('IDLE');
    logToTerminal('> System: Accounts reset.', 'system');
  };

  const gameBlocks = [
    { id: 'b1', text: 'BEGIN;', type: 'ctrl' },
    { id: 'b2', text: 'UPDATE account SET bal = bal - 100', type: 'cmd' },
    { id: 'b3', text: 'UPDATE account SET bal = bal + 100', type: 'cmd' },
    { id: 'b4', text: 'COMMIT;', type: 'ctrl' },
    { id: 't1', text: 'ROLLBACK;', type: 'trick' },
    { id: 't2', text: 'SELECT *', type: 'trick' },
  ];

  const [dropzones, setDropzones] = useState(Array(4).fill(null));
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  const handleBlockClick = (block) => {
    if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
      const newDropzones = [...dropzones];
      newDropzones[activeZoneIndex] = block;
      setDropzones(newDropzones);
      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) nextIndex++;
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
      logToTerminal('> Error: ต่อบล็อกให้ครบ 4 ช่อง', 'error');
      return;
    }
    const ans = dropzones.map((b) => b.id);
    if (ans.includes('t2')) {
      logToTerminal('> Error: SELECT ไม่เกี่ยวกับ Transaction', 'error');
      return;
    }
    if (ans[0] !== 'b1') {
      logToTerminal('> Error: ต้องเริ่มด้วย BEGIN;', 'error');
      return;
    }
    if (ans[3] === 't1') {
      logToTerminal('> Warning: ภารกิจนี้ต้อง COMMIT ไม่ใช่ ROLLBACK', 'warning');
      return;
    }
    if (ans[3] !== 'b4') {
      logToTerminal('> Error: ต้องจบด้วย COMMIT;', 'error');
      return;
    }
    const hasUpdates = (ans[1] === 'b2' && ans[2] === 'b3') || (ans[1] === 'b3' && ans[2] === 'b2');
    logToTerminal(
      hasUpdates ? '> Success: BEGIN → UPDATE → UPDATE → COMMIT' : '> Error: ตรวจลำดับ UPDATE',
      hasUpdates ? 'success' : 'error'
    );
  };

  const resetGame = () => {
    setDropzones(Array(4).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  const statusLabel = {
    IDLE: 'พร้อม',
    ACTIVE: 'กำลังทำ Transaction',
    COMMITTED: 'COMMITTED',
    ROLLED_BACK: 'ROLLED BACK',
    ERROR: 'ERROR',
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
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <ArrowRightLeft size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Transaction (BEGIN / COMMIT / ROLLBACK)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จับกลุ่มคำสั่งเป็นงานเดียว — สำเร็จทั้งหมดหรือไม่ก็ยกเลิกทั้งหมด (All or Nothing)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-6 hover:bg-slate-50">
            <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <Play size={18} className="text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">BEGIN;</h3>
            <p className="text-sm text-slate-600">เริ่ม Transaction</p>
          </div>
          <div className="p-6 hover:bg-slate-50">
            <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <Save size={18} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-emerald-900 mb-1">COMMIT;</h3>
            <p className="text-sm text-emerald-800">บันทึกถาวร</p>
          </div>
          <div className="p-6 bg-rose-50/30">
            <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <Undo2 size={18} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-rose-900 mb-1">ROLLBACK;</h3>
            <p className="text-sm text-rose-800">ย้อนกลับทั้งหมด</p>
          </div>
        </div>

        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <Landmark size={16} className="text-indigo-600" />
              <span className="font-semibold text-slate-700 text-sm">Simulator: Bank Transfer</span>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">{statusLabel[transactionStatus] || transactionStatus}</span>
            </div>
            <button
              type="button"
              onClick={resetSimulator}
              disabled={isAnimating}
              className="text-xs bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95 disabled:opacity-50"
            >
              <RefreshCcw size={12} /> รีเซ็ต
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
              <div className="flex border-b border-slate-700 bg-slate-900">
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  const isSuccess = key === 'success';
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={isAnimating}
                      onClick={() => setActiveScenario(key)}
                      className={`flex-1 py-3 text-[10px] font-bold uppercase flex items-center justify-center gap-1 active:scale-95
                        ${isActive
                          ? isSuccess
                            ? 'bg-[#1e1e2e] text-emerald-400 border-b-2 border-emerald-500'
                            : 'bg-[#1e1e2e] text-rose-400 border-b-2 border-rose-500'
                          : 'text-slate-500 hover:bg-slate-800'}
                        ${isAnimating ? 'opacity-50' : ''}`}
                    >
                      {scenarios[key].icon}
                    </button>
                  );
                })}
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3 min-h-[200px]">
                <div className="font-mono text-xs text-slate-400 flex-1 overflow-y-auto space-y-1 max-h-32">
                  {sqlLogs.length === 0 && <span className="italic text-slate-600">// รอ Execute...</span>}
                  {sqlLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.type === 'success'
                          ? 'text-emerald-400 font-bold'
                          : log.type === 'error'
                            ? 'text-rose-400'
                            : log.type === 'rollback'
                              ? 'text-amber-400 font-bold'
                              : 'text-blue-300'
                      }
                    >
                      {log.text}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={executeScenario}
                  disabled={isAnimating}
                  className={`w-full font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-white active:scale-95 disabled:opacity-50
                    ${activeScenario === 'success' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}
                >
                  {isAnimating ? <RefreshCcw size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
                  Execute Transaction
                </button>
              </div>
            </div>

            <div className="p-6 md:w-7/12 flex flex-col items-center justify-center gap-6 bg-slate-50">
              <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-lg">
                <div
                  className={`flex-1 bg-white p-5 rounded-xl border text-center shadow-sm ${
                    pendingAlice !== null ? 'ring-2 ring-amber-400' : 'border-slate-200'
                  }`}
                >
                  <p className="font-bold text-slate-700 mb-2">Alice</p>
                  {pendingAlice !== null ? (
                    <div>
                      <p className="text-xs line-through text-slate-400">{aliceBal.toLocaleString()} ฿</p>
                      <p className="text-xl font-bold text-amber-600 font-mono">{pendingAlice.toLocaleString()} ฿</p>
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">pending</span>
                    </div>
                  ) : (
                    <p className={`text-xl font-bold font-mono ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {aliceBal.toLocaleString()} ฿
                    </p>
                  )}
                </div>
                <ArrowRightLeft size={28} className={`text-slate-400 shrink-0 ${transactionStatus === 'ACTIVE' ? 'text-amber-500 animate-pulse' : ''}`} />
                <div
                  className={`flex-1 bg-white p-5 rounded-xl border text-center shadow-sm ${
                    pendingBob !== null ? 'ring-2 ring-amber-400' : 'border-slate-200'
                  }`}
                >
                  <p className="font-bold text-slate-700 mb-2">Bob</p>
                  {pendingBob !== null ? (
                    <div>
                      <p className="text-xs line-through text-slate-400">{bobBal.toLocaleString()} ฿</p>
                      <p className="text-xl font-bold text-amber-600 font-mono">{pendingBob.toLocaleString()} ฿</p>
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded">pending</span>
                    </div>
                  ) : (
                    <p className={`text-xl font-bold font-mono ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {bobBal.toLocaleString()} ฿
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500">โอน 5,000 ฿ จาก Alice → Bob</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <HelpCircle size={16} className="text-indigo-500" /> Challenge: Transaction ที่ปลอดภัย
            </h4>
            <button type="button" onClick={resetGame} className="text-xs border bg-white px-2 py-1 rounded active:scale-95">
              เริ่มใหม่
            </button>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 min-h-[70px]">
            {dropzones.map((block, idx) => (
              <button
                key={`z-${idx}`}
                type="button"
                onClick={() => handleZoneClick(idx)}
                className={`min-w-[100px] h-10 px-2 rounded-lg font-mono text-xs font-bold active:scale-95
                  ${block
                    ? block.type === 'trick'
                      ? 'bg-rose-500 text-white'
                      : block.type === 'ctrl'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 text-white'
                    : 'border border-dashed border-slate-500 text-slate-400 bg-slate-700/50'}
                  ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400' : ''}`}
              >
                {block ? block.text : `ส่วน ${idx + 1}`}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {gameBlocks.map((block) => {
              const isUsed = dropzones.some((b) => b && b.id === block.id);
              return (
                <button
                  key={block.id}
                  type="button"
                  disabled={isUsed}
                  onClick={() => !isUsed && handleBlockClick(block)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border active:scale-95
                    ${isUsed ? 'opacity-40 bg-slate-200' : block.type === 'trick' ? 'bg-rose-50 border-rose-200 text-rose-700' : block.type === 'ctrl' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-300'}`}
                >
                  {block.text}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={checkGameAnswer} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 text-sm active:scale-95">
              <CheckCircle2 size={16} /> ตรวจคำตอบ
            </button>
          </div>
        </div>

        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs font-semibold tracking-wider">TERMINAL</span>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-teal-300 font-bold">{line.text}</div>}
                {line.type === 'output' && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system' && <div className="text-slate-500">{line.text}</div>}
                {line.type === 'error' && <div className="text-rose-400 font-bold">{line.text}</div>}
                {line.type === 'success' && <div className="text-emerald-400 font-bold">{line.text}</div>}
                {line.type === 'warning' && <div className="text-amber-400 font-bold">{line.text}</div>}
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
