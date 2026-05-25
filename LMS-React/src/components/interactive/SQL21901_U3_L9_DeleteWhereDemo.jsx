import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Table2,
  RefreshCcw,
  Trash2,
  Filter,
  Code2,
  AlertOctagon,
  XCircle,
  Layers,
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

export default function SQL21901_U3_L9_DeleteWhereDemo() {
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'DELETE WHERE Demo loaded.' },
    { type: 'system', text: 'เลือกสถานการณ์แล้วกด Run DELETE' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logToTerminal = (text, type = 'system') => {
    setConsoleHistory((prev) => [...prev, { text, type }]);
  };

  const initialProducts = [
    { id: 'P01', name: 'แอปเปิ้ล (Apple)', category: 'Food', stock: 50, status: 'Active' },
    { id: 'P02', name: 'นมสด (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
    { id: 'P03', name: 'เสื้อยืดรุ่นเก่า', category: 'Clothing', stock: 5, status: 'Discontinued' },
    { id: 'P04', name: 'ขนมปัง (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
    { id: 'P05', name: 'ตุ๊กตาหมี (ชำรุด)', category: 'Toy', stock: 0, status: 'Damaged' },
    { id: 'P06', name: 'กล้วยหอม', category: 'Food', stock: 30, status: 'Active' },
  ];

  const [products, setProducts] = useState([...initialProducts]);
  const [activeScenario, setActiveScenario] = useState('single');
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const scenarios = {
    single: {
      id: 'single',
      icon: <Filter size={18} />,
      title: '1. ลบด้วย ID',
      desc: 'ลบแถวเดียวด้วย Primary Key',
      sqlStr: "DELETE FROM products WHERE id = 'P02';",
      sql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span>
          <br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#fab387]">'P02'</span>;
        </>
      ),
      evaluate: (data) => data.filter((r) => r.id === 'P02').map((r) => r.id),
    },
    multi: {
      id: 'multi',
      icon: <Layers size={18} />,
      title: "2. ลบกลุ่ม (status)",
      desc: "ลบ status = 'Expired'",
      sqlStr: "DELETE FROM products WHERE status = 'Expired';",
      sql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span>
          <br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#fab387]">'Expired'</span>;
        </>
      ),
      evaluate: (data) => data.filter((r) => r.status === 'Expired').map((r) => r.id),
    },
    complex: {
      id: 'complex',
      icon: <AlertOctagon size={18} />,
      title: '3. ลบซับซ้อน (AND)',
      desc: "Food + stock = 0",
      sqlStr: "DELETE FROM products WHERE category = 'Food' AND stock = 0;",
      sql: (
        <>
          <span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span>
          <br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> category = <span className="text-[#fab387]">'Food'</span>
          <br />
          <span className="text-[#cba6f7] font-bold ml-8">AND</span> stock = <span className="text-[#89b4fa]">0</span>;
        </>
      ),
      evaluate: (data) => data.filter((r) => r.category === 'Food' && r.stock === 0).map((r) => r.id),
    },
  };

  const handleExecuteDelete = () => {
    if (products.length === 0) {
      logToTerminal('> Warning: ตารางว่าง — รีเซ็ตก่อน', 'warning');
      return;
    }
    const sc = scenarios[activeScenario];
    logToTerminal(`mysql> ${sc.sqlStr}`, 'command');
    setIsAnimating(true);
    const targetIds = sc.evaluate(products);
    if (targetIds.length === 0) {
      logToTerminal('> 0 rows — ไม่มีแถวตรงเงื่อนไข', 'output');
      setIsAnimating(false);
      return;
    }
    setHighlightedRows(targetIds);
    setTimeout(() => {
      setProducts(products.filter((p) => !targetIds.includes(p.id)));
      setHighlightedRows([]);
      setIsAnimating(false);
      logToTerminal(`> Query OK, ${targetIds.length} rows deleted.`, 'success');
    }, 800);
  };

  const resetSimulator = () => {
    setProducts([...initialProducts]);
    setHighlightedRows([]);
    logToTerminal('> System: Products table reset.', 'system');
  };

  const gameBlocks = [
    { id: 'b1', text: 'DELETE', type: 'cmd' },
    { id: 'b2', text: 'FROM products', type: 'col' },
    { id: 'b3', text: 'WHERE', type: 'logic' },
    { id: 'b4', text: "status = 'Damaged'", type: 'cond' },
    { id: 'b5', text: 'AND', type: 'logic' },
    { id: 'b6', text: 'stock = 0', type: 'cond' },
    { id: 't1', text: ',', type: 'trick' },
    { id: 't2', text: '*', type: 'trick' },
  ];

  const [dropzones, setDropzones] = useState(Array(6).fill(null));
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
      logToTerminal('> Error: ต่อบล็อกให้ครบ 6 ช่อง', 'error');
      return;
    }
    const ans = dropzones.map((b) => b.id);
    if (ans.includes('t1')) {
      logToTerminal('> Error: WHERE ใช้ AND/OR ห้ามใช้ ,', 'error');
      return;
    }
    if (ans.includes('t2')) {
      logToTerminal('> Error: DELETE ห้ามใช้ *', 'error');
      return;
    }
    const base = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3';
    const ok = (ans[3] === 'b4' && ans[4] === 'b5' && ans[5] === 'b6') || (ans[3] === 'b6' && ans[4] === 'b5' && ans[5] === 'b4');
    logToTerminal(
      base && ok ? '> Success: DELETE WHERE with AND' : '> Error: ตรวจลำดับ DELETE → FROM → WHERE → conditions',
      base && ok ? 'success' : 'error'
    );
  };

  const resetGame = () => {
    setDropzones(Array(6).fill(null));
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
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
            <Trash2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การลบข้อมูล (DELETE WHERE)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ใช้ WHERE ระบุแถวที่จะลบ — ห้ามใช้ * และห้ามใช้ลูกน้ำในเงื่อนไข
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-6 hover:bg-slate-50">
            <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Code2 size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Syntax</h3>
            <code className="block bg-slate-100 text-rose-700 p-3 rounded-lg text-xs font-mono border border-slate-200">
              DELETE FROM table WHERE cond AND cond;
            </code>
          </div>
          <div className="p-6 bg-rose-50/30">
            <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-rose-900 mb-2">ข้อควรระวัง</h3>
            <ul className="text-sm text-rose-800 space-y-1 list-disc list-inside">
              <li>ห้าม DELETE * FROM</li>
              <li>WHERE หลายเงื่อนไขใช้ AND/OR</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-rose-600" />
              <span className="font-semibold text-slate-700 text-sm">Simulator: DELETE WHERE</span>
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
              <div className="flex bg-slate-900 border-b border-slate-700 overflow-x-auto">
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActiveScenario(key);
                        setHighlightedRows([]);
                      }}
                      disabled={isAnimating}
                      className={`flex-1 py-3 text-[10px] font-bold uppercase flex items-center justify-center gap-1 px-1 active:scale-95 whitespace-nowrap
                        ${isActive ? 'bg-[#1e1e2e] text-rose-400 border-b-2 border-rose-500' : 'text-slate-500 hover:bg-slate-800'}
                        ${isAnimating ? 'opacity-50' : ''}`}
                    >
                      {scenarios[key].icon}
                    </button>
                  );
                })}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-[14px] leading-loose">{scenarios[activeScenario].sql}</div>
                <p className="text-xs text-slate-400 font-sans">{scenarios[activeScenario].desc}</p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleExecuteDelete}
                    disabled={isAnimating || products.length === 0}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <Trash2 size={16} /> {isAnimating ? 'Deleting...' : 'Run DELETE'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:w-7/12 bg-slate-50">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                <Table2 size={16} className="text-rose-600" /> Products ({products.length} rows)
              </h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {products.length === 0 ? (
                  <p className="p-8 text-center text-slate-500 text-sm">ตารางว่าง</p>
                ) : (
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-2 border-b text-center">ID</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b text-center">Category</th>
                        <th className="p-2 border-b text-right">Stock</th>
                        <th className="p-2 border-b text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((row) => {
                        const isTarget = highlightedRows.includes(row.id);
                        return (
                          <tr
                            key={row.id}
                            className={
                              isTarget
                                ? 'bg-rose-100 text-rose-900 border-l-4 border-rose-500 opacity-0 scale-y-95 transition-all duration-700'
                                : 'hover:bg-slate-50'
                            }
                          >
                            <td className="p-2 text-center font-mono text-xs">
                              {isTarget ? <XCircle size={14} className="mx-auto text-rose-500" /> : row.id}
                            </td>
                            <td className={`p-2 ${isTarget ? 'line-through' : ''}`}>{row.name}</td>
                            <td className="p-2 text-center text-xs">{row.category}</td>
                            <td className="p-2 text-right font-mono">{row.stock}</td>
                            <td className="p-2 text-center text-xs">{row.status}</td>
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
              <HelpCircle size={16} className="text-rose-500" /> Challenge: DELETE หลายเงื่อนไข
            </h4>
            <button type="button" onClick={resetGame} className="text-xs border bg-white px-2 py-1 rounded active:scale-95">
              เริ่มใหม่
            </button>
          </div>
          <p className="text-xs text-slate-600 mb-3 bg-white p-2 rounded border">
            ลบ status = &apos;Damaged&apos; AND stock = 0
          </p>
          <div className="flex flex-wrap gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 min-h-[70px]">
            {dropzones.map((block, idx) => (
              <button
                key={`z-${idx}`}
                type="button"
                onClick={() => handleZoneClick(idx)}
                className={`min-w-[70px] h-10 px-2 rounded-lg font-mono text-xs font-bold active:scale-95
                  ${block ? (block.type === 'trick' ? 'bg-rose-500 text-white' : 'bg-rose-600 text-white') : 'border border-dashed border-slate-500 text-slate-400 bg-slate-700/50'}
                  ${activeZoneIndex === idx && !block ? 'ring-2 ring-rose-400' : ''}`}
              >
                {block ? block.text : idx + 1}
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
                    ${isUsed ? 'opacity-40 bg-slate-200' : block.type === 'trick' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-300'}`}
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
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
