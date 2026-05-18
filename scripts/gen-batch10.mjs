import fs from 'fs';
import path from 'path';

const dir = 'd:/Teach/LMS-React/src/components/interactive';

function terminalBlock() {
  return `
        <MOTIONELM className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full shadow-inner">
          <MOTIONELM className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs font-semibold tracking-wider">TERMINAL</span>
          </MOTIONELM>
          <MOTIONELM className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <MOTIONELM key={i} className="leading-relaxed">
                {line.type === 'command' && <MOTIONELM className="text-teal-300 font-bold">{line.text}</MOTIONELM>}
                {line.type === 'output' && <MOTIONELM className="text-cyan-300">{line.text}</MOTIONELM>}
                {line.type === 'system' && <MOTIONELM className="text-slate-500">{line.text}</MOTIONELM>}
                {line.type === 'error' && <MOTIONELM className="text-rose-400 font-bold">{line.text}</MOTIONELM>}
                {line.type === 'success' && <MOTIONELM className="text-emerald-400 font-bold">{line.text}</MOTIONELM>}
                {line.type === 'warning' && <MOTIONELM className="text-amber-400 font-bold">{line.text}</MOTIONELM>}
              </MOTIONELM>
            ))}
          </MOTIONELM>
        </MOTIONELM>`;
}

function fix(s) {
  return s.split('MOTIONELM').join('MOTIONELM').split('MOTIONELM').join('MOTIONELM').split('MOTIONELM').join('div');
}

// Fix the typo helper
function toDiv(s) {
  return s.replaceAll('MOTIONELM', 'MOTIONELM').replaceAll('MOTIONELM', 'div');
}

// --- L7: patch return only ---
const l7Path = path.join(dir, 'SQL21901_U3_L7_UpdateWhereDemo.jsx');
let l7 = fs.readFileSync(l7Path, 'utf8');

// Add sqlStr to scenarios
l7 = l7.replace(
  "title: \"1. ระบุตัวตน (Exact Match)\",\n      desc:",
  "title: \"1. ระบุตัวตน (Exact Match)\",\n      sqlStr: \"UPDATE employees SET perf = 'B' WHERE id = 'E04';\",\n      desc:"
);
l7 = l7.replace(
  "title: \"2. เงื่อนไขช่วง (Range/Compare)\",\n      desc:",
  "title: \"2. เงื่อนไขช่วง (Range/Compare)\",\n      sqlStr: \"UPDATE employees SET salary = 30000 WHERE salary < 30000;\",\n      desc:"
);
l7 = l7.replace(
  "title: \"3. หลายเงื่อนไข (Logical AND)\",\n      desc:",
  "title: \"3. หลายเงื่อนไข (Logical AND)\",\n      sqlStr: \"UPDATE employees SET bonus = 10000 WHERE dept = 'IT' AND perf = 'A';\",\n      desc:"
);

l7 = l7.replace(
  `  const handleExecute = () => {
    setIsAnimating(true);
    setHighlightedRows([]);

    setTimeout(() => {
      const scenarioObj = scenarios[activeScenario];`,
  `  const handleExecute = () => {
    setIsAnimating(true);
    setHighlightedRows([]);
    const scenarioObj = scenarios[activeScenario];
    logToTerminal(\`mysql> \${scenarioObj.sqlStr}\`, 'command');

    setTimeout(() => {`
);

l7 = l7.replace(
  `  const resetGame = () => {
    setDropzones(Array(5).fill(null));
    setActiveZoneIndex(0);
  };`,
  `  const resetGame = () => {
    setDropzones(Array(5).fill(null));
    setActiveZoneIndex(0);
    logToTerminal('> System: Minigame reset.', 'system');
  };`
);

const l7BodyStart = l7.indexOf('<div className="min-h-screen bg-indigo-50/50');
const l7Start = l7.lastIndexOf('  return (', l7BodyStart);
if (l7Start === -1) throw new Error('L7 start not found');

const l7Return = toDiv(`  return (
    <MOTIONELM className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <MOTIONELM className="bg-slate-50 border-b border-slate-200 p-5">
        <MOTIONELM className="flex items-center gap-3 mb-2">
          <MOTIONELM className="p-2 bg-violet-100 text-violet-700 rounded-lg"><Filter size={20} className="stroke-2" /></MOTIONELM>
          <h3 className="font-display text-xl font-semibold text-slate-900">เงื่อนไขการแก้ไข (UPDATE WHERE)</h3>
        </MOTIONELM>
        <p className="font-base text-sm leading-relaxed text-slate-700">ใช้ WHERE ระบุแถวที่ต้องการแก้ไข — ห้ามลืมเงื่อนไขเพื่อไม่ให้เปลี่ยนทั้งตาราง</p>
      </MOTIONELM>
      <MOTIONELM className="flex flex-col min-h-[500px]">
        <MOTIONELM className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <MOTIONELM className="p-6 hover:bg-slate-50 transition-colors">
            <MOTIONELM className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Target size={20} className="text-indigo-600"/></MOTIONELM>
            <h3 className="font-bold text-slate-800 mb-2">เงื่อนไขเจาะจง</h3>
            <p className="text-sm text-slate-700 mb-4">มักใช้กับ Primary Key</p>
            <code className="block bg-slate-100 text-indigo-700 p-3 rounded-lg text-sm font-mono border border-slate-200">WHERE id = 'E01'</code>
          </MOTIONELM>
          <MOTIONELM className="p-6 hover:bg-slate-50 transition-colors">
            <MOTIONELM className="bg-fuchsia-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Filter size={20} className="text-fuchsia-600"/></MOTIONELM>
            <h3 className="font-bold text-slate-800 mb-2">เงื่อนไขช่วง</h3>
            <p className="text-sm text-slate-700 mb-4">ใช้ &lt; &gt; เปรียบเทียบค่า</p>
            <code className="block bg-slate-100 text-fuchsia-700 p-3 rounded-lg text-sm font-mono border border-slate-200">WHERE salary &lt; 30000</code>
          </MOTIONELM>
          <MOTIONELM className="p-6 bg-violet-50/40 hover:bg-violet-50/60 transition-colors relative">
            <MOTIONELM className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">ระวัง!</MOTIONELM>
            <MOTIONELM className="bg-violet-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Users size={20} className="text-violet-600"/></MOTIONELM>
            <h3 className="font-bold text-violet-900 mb-2">หลายเงื่อนไข</h3>
            <p className="text-sm text-violet-800 mb-4">ใช้ AND/OR ห้ามใช้ลูกน้ำใน WHERE</p>
            <code className="block bg-slate-100 text-violet-800 p-3 rounded-lg text-sm font-mono border border-violet-200">WHERE dept='IT' AND perf='A'</code>
          </MOTIONELM>
        </MOTIONELM>
        <MOTIONELM className="flex flex-col bg-slate-50 border-b border-slate-200">
          <MOTIONELM className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <MOTIONELM className="flex items-center gap-2"><Code2 size={16} className="text-violet-600"/><span className="font-semibold text-slate-700 text-sm">Simulator: UPDATE WHERE</span></MOTIONELM>
            <button type="button" onClick={resetSimulator} className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95"><RefreshCcw size={12} /> รีเซ็ตข้อมูล</button>
          </MOTIONELM>
          <MOTIONELM className="flex flex-col md:flex-row">
            <MOTIONELM className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
              <MOTIONELM className="flex flex-col bg-slate-900 border-b border-slate-700 overflow-x-auto">
                <MOTIONELM className="flex">
                  {Object.keys(scenarios).map((key) => {
                    const isActive = activeScenario === key;
                    return (
                      <button key={key} type="button" onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                        className={\`flex-1 text-center py-3 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors whitespace-nowrap px-2 active:scale-95 \${isActive ? 'bg-[#1e1e2e] text-violet-400 border-b-2 border-violet-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}\`}>
                        {scenarios[key].icon} {scenarios[key].title}
                      </button>
                    );
                  })}
                </MOTIONELM>
              </MOTIONELM>
              <MOTIONELM className="p-5 flex-1 flex flex-col justify-between gap-4">
                <MOTIONELM className="font-mono text-[15px] leading-loose overflow-x-auto w-full pt-2">
                  <MOTIONELM key={activeScenario} className="animate-in fade-in zoom-in-95 duration-300">
                    {scenarios[activeScenario].sql}
                    <MOTIONELM className="mt-4 pt-4 border-t border-slate-700/50"><p className="text-xs text-slate-400 leading-relaxed font-sans">{scenarios[activeScenario].desc}</p></MOTIONELM>
                  </MOTIONELM>
                </MOTIONELM>
                <MOTIONELM className="flex justify-end pt-4">
                  <button type="button" onClick={handleExecute} disabled={isAnimating} className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50">
                    <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Run Update'}
                  </button>
                </MOTIONELM>
              </MOTIONELM>
            </MOTIONELM>
            <MOTIONELM className="p-6 md:w-7/12 bg-slate-50">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3"><Table2 size={16} className="text-violet-600"/> ตาราง Employees</h3>
              <MOTIONELM className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600"><tr>
                    <th className="p-2 border-b font-semibold w-12 text-center">ID</th>
                    <th className="p-2 border-b font-semibold">Name</th>
                    <th className="p-2 border-b font-semibold text-center">Dept</th>
                    <th className="p-2 border-b font-semibold text-center">Perf</th>
                    <th className="p-2 border-b font-semibold text-right">Salary</th>
                    <th className="p-2 border-b font-semibold text-right">Bonus</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((row) => {
                      const isHighlighted = highlightedRows.includes(row.id);
                      const salChanged = row.salary !== row.orig_salary;
                      const perfChanged = row.perf !== row.orig_perf;
                      const bonChanged = row.bonus !== row.orig_bonus;
                      const rowClasses = isHighlighted ? 'bg-violet-50' : 'bg-white hover:bg-slate-50';
                      const renderCell = (cur, orig, changed, cls = 'text-violet-700 font-bold bg-violet-100/50 px-1.5 py-0.5 rounded') => {
                        if (!changed) return <span>{typeof cur === 'number' ? cur.toLocaleString() : cur}</span>;
                        return (
                          <MOTIONELM className="flex flex-col items-end md:items-center">
                            <span className="text-[9px] text-slate-500 line-through">{typeof orig === 'number' ? orig.toLocaleString() : orig}</span>
                            <span className={cls}>{typeof cur === 'number' ? cur.toLocaleString() : cur}</span>
                          </MOTIONELM>
                        );
                      };
                      return (
                        <tr key={row.id} className={rowClasses}>
                          <td className="p-2 font-mono text-[11px] text-center">{row.id}</td>
                          <td className="p-2 font-medium text-slate-700">{row.name}</td>
                          <td className="p-2 text-center text-xs">{row.dept}</td>
                          <td className="p-2 text-center">{renderCell(row.perf, row.orig_perf, perfChanged, 'text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded')}</td>
                          <td className="p-2 text-right font-mono">{renderCell(row.salary, row.orig_salary, salChanged)}</td>
                          <td className="p-2 text-right font-mono">{renderCell(row.bonus, row.orig_bonus, bonChanged, 'text-amber-600 font-bold bg-amber-100 px-1.5 py-0.5 rounded')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </MOTIONELM>
            </MOTIONELM>
          </MOTIONELM>
        </MOTIONELM>
        <MOTIONELM className="p-6 bg-slate-50 border-b border-slate-200">
          <MOTIONELM className="flex justify-between items-center mb-4">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2"><HelpCircle size={16} className="text-violet-500" /> Syntax Challenge: กับดัก AND ใน WHERE</h4>
            <button type="button" onClick={resetGame} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 active:scale-95"><RefreshCcw size={12} /> เริ่มใหม่</button>
          </MOTIONELM>
          <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200"><strong className="text-violet-600">ภารกิจ:</strong> UPDATE users SET status='VIP' WHERE points &gt; 1000 AND level = 5</p>
          <MOTIONELM className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
            {dropzones.map((block, idx) => (
              <button key={\`zone-\${idx}\`} type="button" onClick={() => handleZoneClick(idx)}
                className={\`min-w-[70px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center active:scale-95 \${block ? (block.type === 'trick' ? 'bg-rose-500 text-white text-base px-5' : 'bg-violet-500 text-white shadow-md') : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400'} \${activeZoneIndex === idx && !block ? 'ring-2 ring-violet-400 border-solid bg-slate-700' : ''}\`}>
                {block ? block.text : \`ส่วน \${idx + 1}\`}
              </button>
            ))}
            <span className="text-slate-600 font-mono text-lg font-bold">;</span>
          </MOTIONELM>
          <MOTIONELM className="flex flex-wrap gap-2 mb-6">
            {gameBlocks.map(block => {
              const isUsed = dropzones.find(b => b && b.id === block.id);
              return (
                <button key={block.id} type="button" onClick={() => !isUsed && handleBlockClick(block)} disabled={isUsed}
                  className={\`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border active:scale-95 \${isUsed ? 'opacity-40 cursor-not-allowed bg-slate-200' : block.type === 'trick' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-slate-700 border-slate-300 hover:border-violet-500'}\`}>
                  {block.text}
                </button>
              );
            })}
          </MOTIONELM>
          <MOTIONELM className="flex justify-end">
            <button type="button" onClick={checkGameAnswer} className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 active:scale-95 text-sm"><CheckCircle2 size={16} /> ตรวจคำตอบ</button>
          </MOTIONELM>
        </MOTIONELM>
        ${terminalBlock()}
      </MOTIONELM>
    </MOTIONELM>
  );`);

l7 = l7.slice(0, l7Start) + l7Return + '\n';
fs.writeFileSync(l7Path, toDiv(l7), 'utf8');
console.log('L7 done');
