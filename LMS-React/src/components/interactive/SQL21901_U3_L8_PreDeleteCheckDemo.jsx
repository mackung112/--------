import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Table2,
  RefreshCcw,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  Eye,
  Search,
  AlertOctagon,
  Code2,
  FileWarning,
  HelpCircle,
  TerminalSquare
} from 'lucide-react';

export default function SQL21901_U3_L8_PreDeleteCheckDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Pre-DELETE Check Demo loaded.' },
    { type: 'system', text: 'ขั้นที่ 1: SELECT พรีวิว → ขั้นที่ 2: DELETE' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'system') => {
    setConsoleHistory((prev) => [...prev, { text, type }]);
  };

  const initialUsers = [
    { id: 'U01', username: 'admin_somchai', role: 'Admin', status: 'Active', days_inactive: 1 },
    { id: 'U02', username: 'guest_001', role: 'Guest', status: 'Inactive', days_inactive: 400 },
    { id: 'U03', username: 'spam_bot99', role: 'User', status: 'Banned', days_inactive: 2 },
    { id: 'U04', username: 'user_somsri', role: 'User', status: 'Active', days_inactive: 0 },
    { id: 'U05', username: 'test_account', role: 'Guest', status: 'Inactive', days_inactive: 365 },
  ];

  const [users, setUsers] = useState([...initialUsers]);
  const [activeScenario, setActiveScenario] = useState('banned');
  const [step, setStep] = useState(1);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const scenarios = {
    banned: {
      id: 'banned',
      icon: <ShieldCheck size={18} />,
      title: '1. ลบไอดีที่ถูกแบน',
      desc: "ลบ User ที่ status = 'Banned'",
      selectStr: "SELECT * FROM users WHERE status = 'Banned';",
      deleteStr: "DELETE FROM users WHERE status = 'Banned';",
      selectSql: (
        <>
          <span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">*</span><br />
          <span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span><br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#a6e3a1]">'Banned'</span>;
        </>
      ),
      deleteSql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span><br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#a6e3a1]">'Banned'</span>;
        </>
      ),
      evaluate: (data) => data.filter((r) => r.status === 'Banned').map((r) => r.id),
    },
    guest: {
      id: 'guest',
      icon: <Search size={18} />,
      title: '2. ลบ Guest เก่า',
      desc: "Guest ที่ไม่ใช้งาน > 300 วัน",
      selectStr: "SELECT * FROM users WHERE role = 'Guest' AND days_inactive > 300;",
      deleteStr: "DELETE FROM users WHERE role = 'Guest' AND days_inactive > 300;",
      selectSql: (
        <>
          <span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">*</span><br />
          <span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span><br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> role = <span className="text-[#a6e3a1]">'Guest'</span> <br />
          <span className="text-[#cba6f7] font-bold ml-8">AND</span> days_inactive {'>'} <span className="text-[#fab387]">300</span>;
        </>
      ),
      deleteSql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span><br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> role = <span className="text-[#a6e3a1]">'Guest'</span> <br />
          <span className="text-[#cba6f7] font-bold ml-8">AND</span> days_inactive {'>'} <span className="text-[#fab387]">300</span>;
        </>
      ),
      evaluate: (data) => data.filter((r) => r.role === 'Guest' && r.days_inactive > 300).map((r) => r.id),
    },
    disaster: {
      id: 'disaster',
      icon: <AlertOctagon size={18} />,
      title: '3. ภัยพิบัติ (ลืม WHERE)',
      desc: 'DELETE โดยไม่มีเงื่อนไข',
      selectStr: 'SELECT * FROM users;',
      deleteStr: 'DELETE FROM users;',
      selectSql: (
        <>
          <span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">*</span><br />
          <span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;
        </>
      ),
      deleteSql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span>;
        </>
      ),
      evaluate: (data) => data.map((r) => r.id),
    },
  };

  const sc = scenarios[activeScenario];

  const handleSelectPreview = () => {
    setIsAnimating(true);
    logToTerminal(`mysql> ${sc.selectStr}`, 'command');
    setTimeout(() => {
      const matchIds = sc.evaluate(users);
      setHighlightedRows(matchIds);
      setIsAnimating(false);
      if (matchIds.length > 0) {
        setStep(2);
        if (activeScenario === 'disaster') {
          logToTerminal(`> Warning: จะลบทั้งตาราง ${matchIds.length} แถว!`, 'error');
        } else {
          logToTerminal(`> พบ ${matchIds.length} แถว — ตรวจสอบแล้วกด DELETE`, 'warning');
        }
      } else {
        logToTerminal('> 0 rows — ไม่มีข้อมูลตรงเงื่อนไข', 'output');
        setStep(1);
      }
    }, 500);
  };

  const handleExecuteDelete = () => {
    setIsAnimating(true);
    logToTerminal(`mysql> ${sc.deleteStr}`, 'command');
    setTimeout(() => {
      const matchIds = sc.evaluate(users);
      setUsers(users.filter((u) => !matchIds.includes(u.id)));
      setHighlightedRows([]);
      setStep(1);
      setIsAnimating(false);
      if (activeScenario === 'disaster') {
        logToTerminal(`> ลบทั้งตารางแล้ว (${matchIds.length} rows)`, 'error');
      } else {
        logToTerminal(`> Query OK, ${matchIds.length} rows deleted.`, 'success');
      }
    }, 600);
  };

  const resetSimulator = () => {
    setUsers([...initialUsers]);
    setHighlightedRows([]);
    setStep(1);
    logToTerminal('> System: Table reset.', 'system');
  };

  const handleScenarioChange = (key) => {
    setActiveScenario(key);
    setHighlightedRows([]);
    setStep(1);
  };

  const gameBlocks = [
    { id: 'b1', text: 'DELETE', type: 'cmd' },
    { id: 'b2', text: 'FROM users', type: 'col' },
    { id: 'b3', text: 'WHERE', type: 'logic' },
    { id: 'b4', text: "status = 'spam'", type: 'cond' },
    { id: 't1', text: '*', type: 'trick' },
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
    if (ans.includes('t1')) {
      logToTerminal('> Error: DELETE ห้ามใช้ * — ลบทั้งแถวอยู่แล้ว', 'error');
      return;
    }
    const isCorrect = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4';
    logToTerminal(
      isCorrect ? '> Success: DELETE FROM table WHERE condition' : '> Error: ลำดับ DELETE → FROM → WHERE → condition',
      isCorrect ? 'success' : 'error'
    );
  };

  const resetGame = () => {
    setDropzones(Array(4).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
            <FileWarning size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ตรวจสอบก่อนลบ (SELECT → DELETE)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ใช้ SELECT พรีวิวแถวที่จะลบก่อน แล้วค่อยรัน DELETE — ห้ามลืม WHERE
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Eye size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Step 1: SELECT</h3>
            <p className="text-sm text-slate-700 mb-4">ค้นหาแถวที่จะลบก่อน</p>
            <code className="block bg-slate-100 text-emerald-700 p-3 rounded-lg text-sm font-mono border border-slate-200">
              SELECT * FROM users WHERE ...
            </code>
          </div>
          <div className="p-6 hover:bg-slate-50 transition-colors">
            <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Trash2 size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Step 2: DELETE</h3>
            <p className="text-sm text-slate-700 mb-4">ยืนยันแล้วค่อยลบ</p>
            <code className="block bg-slate-100 text-rose-700 p-3 rounded-lg text-sm font-mono border border-slate-200">
              DELETE FROM users WHERE ...
            </code>
          </div>
          <div className="p-6 bg-rose-50/40 relative">
            <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
              ระวัง!
            </div>
            <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-rose-900 mb-2">ห้ามใช้ *</h3>
            <p className="text-sm text-rose-800 mb-2">DELETE ลบทั้งแถว — ไม่ใช้ดอกจัน</p>
            <code className="block bg-slate-100 text-slate-500 line-through text-xs p-2 rounded">DELETE * FROM</code>
          </div>
        </div>

        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-rose-600" />
              <span className="font-semibold text-slate-700 text-sm">Simulator: SELECT before DELETE</span>
            </div>
            <button
              type="button"
              onClick={resetSimulator}
              className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95"
            >
              <RefreshCcw size={12} /> รีเซ็ต
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
              <div className="flex flex-col bg-slate-900 border-b border-slate-700 overflow-x-auto">
                <div className="flex">
                  {Object.keys(scenarios).map((key) => {
                    const isActive = activeScenario === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleScenarioChange(key)}
                        className={`flex-1 text-center py-3 font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 px-1 active:scale-95 whitespace-nowrap
                          ${isActive ? 'bg-[#1e1e2e] text-rose-400 border-b-2 border-rose-500' : 'text-slate-500 hover:bg-slate-800'}`}
                      >
                        {scenarios[key].icon}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex gap-2 text-xs font-bold mb-2">
                  <span className={`px-2 py-1 rounded-full ${step === 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-500'}`}>
                    1. SELECT
                  </span>
                  <span className={`px-2 py-1 rounded-full ${step === 2 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'text-slate-500'}`}>
                    2. DELETE
                  </span>
                </div>
                <div className="font-mono text-[14px] leading-loose">
                  {step === 1 ? sc.selectSql : sc.deleteSql}
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={handleSelectPreview}
                      disabled={isAnimating}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 active:scale-95 disabled:opacity-50 text-sm"
                    >
                      <Search size={14} /> SELECT Preview
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={() => setStep(1)} className="bg-slate-700 text-white py-2 px-3 rounded-lg text-sm active:scale-95">
                        ยกเลิก
                      </button>
                      <button
                        type="button"
                        onClick={handleExecuteDelete}
                        disabled={isAnimating}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 active:scale-95 disabled:opacity-50 text-sm"
                      >
                        <Trash2 size={14} /> Run DELETE
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:w-7/12 bg-slate-50">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                <Table2 size={16} className="text-rose-600" /> Users
                {highlightedRows.length > 0 && step === 2 && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-auto">
                    เตรียมลบ {highlightedRows.length} แถว
                  </span>
                )}
              </h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {users.length === 0 ? (
                  <p className="p-8 text-center text-slate-500 text-sm">ตารางว่าง</p>
                ) : (
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-2 border-b text-center">ID</th>
                        <th className="p-2 border-b">Username</th>
                        <th className="p-2 border-b text-center">Role</th>
                        <th className="p-2 border-b text-center">Status</th>
                        <th className="p-2 border-b text-right">Inactive</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((row) => {
                        const mark = highlightedRows.includes(row.id) && step === 2;
                        return (
                          <tr key={row.id} className={mark ? 'bg-amber-50' : 'hover:bg-slate-50'}>
                            <td className="p-2 text-center font-mono text-xs">{row.id}</td>
                            <td className={`p-2 ${mark ? 'line-through text-amber-800' : ''}`}>{row.username}</td>
                            <td className="p-2 text-center text-xs">{row.role}</td>
                            <td className="p-2 text-center text-xs">{row.status}</td>
                            <td className="p-2 text-right font-mono">{row.days_inactive}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <HelpCircle size={16} className="text-rose-500" /> Syntax Challenge: DELETE ที่ถูกต้อง
            </h4>
            <button type="button" onClick={resetGame} className="text-xs border border-slate-200 bg-white px-2 py-1 rounded active:scale-95">
              <RefreshCcw size={12} className="inline" /> เริ่มใหม่
            </button>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 min-h-[70px]">
            {dropzones.map((block, idx) => (
              <button
                key={`z-${idx}`}
                type="button"
                onClick={() => handleZoneClick(idx)}
                className={`min-w-[80px] h-10 px-2 rounded-lg font-mono text-xs font-bold active:scale-95
                  ${block ? (block.type === 'trick' ? 'bg-rose-500 text-white text-lg' : 'bg-rose-600 text-white') : 'border border-dashed border-slate-500 text-slate-400 bg-slate-700/50'}
                  ${activeZoneIndex === idx && !block ? 'ring-2 ring-rose-400' : ''}`}
              >
                {block ? block.text : `${idx + 1}`}
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
                    ${isUsed ? 'opacity-40 bg-slate-200' : block.type === 'trick' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-slate-300'}`}
                >
                  {block.text}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={checkGameAnswer} className="bg-rose-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 text-sm active:scale-95">
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
  );
}
