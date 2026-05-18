import fs from 'fs';

const p = 'd:/Teach/LMS-React/src/components/interactive/SQL21901_U3_L7_UpdateWhereDemo.jsx';
let c = fs.readFileSync(p, 'utf8');

// Fix resetGame
c = c.replace(
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

const start = c.indexOf('  return (\n    <div className="min-h-screen');
const end = c.lastIndexOf('  );\n}');
if (start === -1 || end === -1) {
  console.error('markers not found', start, end);
  process.exit(1);
}

const newReturn = `  return (
    <motionless className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <motionless className="bg-slate-50 border-b border-slate-200 p-5">
        <motionless className="flex items-center gap-3 mb-2">
          <motionless className="p-2 bg-violet-100 text-violet-700 rounded-lg">
            <Filter size={20} className="stroke-2" />
          </motionless>
          <h3 className="font-display text-xl font-semibold text-slate-900">เงื่อนไขการแก้ไข (UPDATE WHERE)</h3>
        </motionless>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ใช้ WHERE ระบุแถวที่ต้องการแก้ไข — ห้ามลืมเงื่อนไขเพื่อไม่ให้เปลี่ยนทั้งตาราง
        </p>
      </motionless>

      <motionless className="flex flex-col min-h-[500px]">
        <motionless className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <motionless className="p-6 hover:bg-slate-50 transition-colors">
            <motionless className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Target size={20} className="text-indigo-600"/></motionless>
            <h3 className="font-bold text-slate-800 mb-2">เงื่อนไขเจาะจง</h3>
            <p className="text-sm text-slate-700 mb-4">มักใช้กับ Primary Key</p>
            <code className="block bg-slate-100 text-indigo-700 p-3 rounded-lg text-sm font-mono border border-slate-200">WHERE id = 'E01'</code>
          </motionless>
          <motionless className="p-6 hover:bg-slate-50 transition-colors">
            <motionless className="bg-fuchsia-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Filter size={20} className="text-fuchsia-600"/></motionless>
            <h3 className="font-bold text-slate-800 mb-2">เงื่อนไขช่วง</h3>
            <p className="text-sm text-slate-700 mb-4">ใช้ &lt; &gt; เปรียบเทียบค่า</p>
            <code className="block bg-slate-100 text-fuchsia-700 p-3 rounded-lg text-sm font-mono border border-slate-200">WHERE salary &lt; 30000</code>
          </motionless>
          <motionless className="p-6 bg-violet-50/40 hover:bg-violet-50/60 transition-colors relative">
            <motionless className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">ระวัง!</motionless>
            <motionless className="bg-violet-100 w-10 h-10 rounded-full flex items-center justify-center mb-4"><Users size={20} className="text-violet-600"/></motionless>
            <h3 className="font-bold text-violet-900 mb-2">หลายเงื่อนไข</h3>
            <p className="text-sm text-violet-800 mb-4">ใช้ AND/OR ห้ามใช้ลูกน้ำใน WHERE</p>
            <code className="block bg-slate-100 text-violet-800 p-3 rounded-lg text-sm font-mono border border-violet-200">WHERE dept='IT' AND perf='A'</code>
          </motionless>
        </motionless>

        <motionless className="flex flex-col bg-slate-50 border-b border-slate-200">
          <motionless className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <motionless className="flex items-center gap-2">
              <Code2 size={16} className="text-violet-600"/>
              <span className="font-semibold text-slate-700 text-sm">Simulator: UPDATE WHERE</span>
            </motionless>
            <button type="button" onClick={resetSimulator} className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95">
              <RefreshCcw size={12} /> รีเซ็ตข้อมูล
            </button>
          </motionless>

          <motionless className="flex flex-col md:flex-row">
            <motionless className="bg-[#1e1e2e] md:w-5/12 flex flex-col border-r border-slate-700">
              <motionless className="flex flex-col bg-slate-900 border-b border-slate-700 overflow-x-auto">
                <motionless className="flex">
                  {Object.keys(scenarios).map((key) => {
                    const isActive = activeScenario === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                        className={\`flex-1 text-center py-3 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors whitespace-nowrap px-2 active:scale-95
                          \${isActive ? 'bg-[#1e1e2e] text-violet-400 border-b-2 border-violet-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                        \`}
                      >
                        {scenarios[key].icon} {scenarios[key].title}
                      </button>
                    );
                  })}
                </motionless>
              </motionless>
              <motionless className="p-5 flex-1 flex flex-col justify-between gap-4">
                <motionless className="font-mono text-[15px] leading-loose overflow-x-auto w-full pt-2">
                  <motionless key={activeScenario} className="animate-in fade-in zoom-in-95 duration-300">
                    {scenarios[activeScenario].sql}
                    <motionless className="mt-4 pt-4 border-t border-slate-700/50">
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{scenarios[activeScenario].desc}</p>
                    </motionless>
                  </motionless>
                </motionless>
                <motionless className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleExecute}
                    disabled={isAnimating}
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Run Update'}
                  </button>
                </motionless>
              </motionless>
            </motionless>

            <motionless className="p-6 md:w-7/12 bg-slate-50">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                <Table2 size={16} className="text-violet-600"/> ตาราง Employees
              </h3>
              <motionless className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="p-2 border-b font-semibold w-12 text-center">ID</th>
                      <th className="p-2 border-b font-semibold">Name</th>
                      <th className="p-2 border-b font-semibold text-center">Dept</th>
                      <th className="p-2 border-b font-semibold text-center">Perf</th>
                      <th className="p-2 border-b font-semibold text-right">Salary</th>
                      <th className="p-2 border-b font-semibold text-right">Bonus</th>
                    </tr>
                  </thead>
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
                          <motionless className="flex flex-col items-end md:items-center">
                            <span className="text-[9px] text-slate-500 line-through">{typeof orig === 'number' ? orig.toLocaleString() : orig}</span>
                            <span className={cls}>{typeof cur === 'number' ? cur.toLocaleString() : cur}</span>
                          </motionless>
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
              </motionless>
            </motionless>
          </motionless>
        </motionless>

        <motionless className="p-6 bg-slate-50 border-b border-slate-200">
          <motionless className="flex justify-between items-center mb-4">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
              <HelpCircle size={16} className="text-violet-500" /> Syntax Challenge: กับดัก AND ใน WHERE
            </h4>
            <button type="button" onClick={resetGame} className="text-xs text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 active:scale-95">
              <RefreshCcw size={12} /> เริ่มใหม่
            </button>
          </motionless>
          <p className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-violet-600">ภารกิจ:</strong> UPDATE users SET status='VIP' WHERE points &gt; 1000 AND level = 5
          </p>
          <motionless className="flex flex-wrap items-center gap-2 bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 shadow-inner min-h-[80px]">
            {dropzones.map((block, idx) => (
              <button
                key={\`zone-\${idx}\`}
                type="button"
                onClick={() => handleZoneClick(idx)}
                className={\`min-w-[70px] h-10 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all active:scale-95
                  \${block ? (block.type === 'trick' ? 'bg-rose-500 text-white text-base px-5' : 'bg-violet-500 text-white shadow-md') : 'bg-slate-700/50 border border-dashed border-slate-500 text-slate-400'}
                  \${activeZoneIndex === idx && !block ? 'ring-2 ring-violet-400 border-solid bg-slate-700' : ''}
                \`}
              >
                {block ? block.text : \`ส่วน \${idx + 1}\`}
              </button>
            ))}
            <span className="text-slate-600 font-mono text-lg font-bold">;</span>
          </motionless>
          <motionless className="flex flex-wrap gap-2 mb-6">
            {gameBlocks.map(block => {
              const isUsed = dropzones.find(b => b && b.id === block.id);
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => !isUsed && handleBlockClick(block)}
                  disabled={isUsed}
                  className={\`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all active:scale-95
                    \${isUsed ? 'opacity-40 cursor-not-allowed bg-slate-200' : block.type === 'trick' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-slate-700 border-slate-300 hover:border-violet-500'}
                  \`}
                >
                  {block.text}
                </button>
              );
            })}
          </motionless>
          <motionless className="flex justify-end">
            <button type="button" onClick={checkGameAnswer} className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 active:scale-95 text-sm">
              <CheckCircle2 size={16} /> ตรวจคำตอบ
            </button>
          </motionless>
        </motionless>

        <motionless className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full shadow-inner">
          <motionless className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center gap-2 z-10">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs font-semibold tracking-wider">TERMINAL</span>
          </motionless>
          <motionless className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <motionless key={i} className="leading-relaxed">
                {line.type === 'command' && <motionless className="text-teal-300 font-bold">{line.text}</motionless>}
                {line.type === 'output' && <motionless className="text-cyan-300">{line.text}</motionless>}
                {line.type === 'system' && <motionless className="text-slate-500">{line.text}</motionless>}
                {line.type === 'error' && <motionless className="text-rose-400 font-bold">{line.text}</motionless>}
                {line.type === 'success' && <motionless className="text-emerald-400 font-bold">{line.text}</motionless>}
              </motionless>
            ))}
          </motionless>
        </motionless>
      </motionless>
    </motionless>
  );`;

c = c.slice(0, start) + newReturn + '\n}\n';
c = c.split('motionless').join('div');

// Remove Zap reference if any broken import - already removed from imports

fs.writeFileSync(p, c, 'utf8');
console.log('patched L7');
