import React, { useState, useEffect, useRef } from 'react';
import { Database, Play, RotateCcw, Table2 } from 'lucide-react';

export default function SQLDataSimulatorEngine({ title, icon: Icon, description, initialTable, queries, quiz }) {
  const [activeQuery, setActiveQuery] = useState(null);
  const [currentTable, setCurrentTable] = useState(initialTable);
  
  const [qa, setQa] = useState(null);
  const [qc, setQc] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'SQL Database Engine started. Connected to virtual instance.' },
    { type: 'system', text: 'Type a query or select from the panel to execute.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory, currentTable]);

  const handleRunQuery = (q) => {
    setActiveQuery(q.id);
    setCurrentTable(q.resultTable);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ${q.sql}` },
      { type: 'system', text: `> Executing query...` },
      { type: 'output', text: `> ${q.resultTable.rows.length} rows in set (0.01 sec)` },
      { type: 'system', text: `> ${q.resultMsg}` }
    ]);
  };

  const handleReset = () => {
    setActiveQuery(null);
    setCurrentTable(initialTable);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ROLLBACK;` },
      { type: 'system', text: `> Database state restored to initial.` }
    ]);
  };

  const submitQuiz = () => {
    if (!qa) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'error', text: 'Error: No answer selected for knowledge check.' }
      ]);
      return;
    }
    setQc(true); 
    const isCorrect = quiz.opts.find(o => o.val === qa)?.correct;
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ check_knowledge("${qa}")` },
      { type: isCorrect ? 'success' : 'error', text: isCorrect ? '✅ STATUS: CORRECT (1/1 points)' : '❌ STATUS: FAILED (Incorrect Selection)' }
    ]);
  };

  const resetQuiz = () => {
    setQa(null);
    setQc(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
              <Icon size={20} className="stroke-2" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
          </div>
          <button onClick={handleReset} className="text-slate-700 hover:text-slate-800 transition-colors flex items-center gap-1 text-sm bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
            <RotateCcw size={14}/> Reset DB
          </button>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">{description}</p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-800">
          
          {/* Left: Query Selection */}
          <div className="w-full lg:w-[350px] p-0 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="p-4 border-b border-slate-200">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                <Database size={16} /> SQL Queries
              </h4>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar">
              {queries.map(q => (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer group shadow-sm ${activeQuery === q.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}
                  onClick={() => handleRunQuery(q)}
                >
                  <div className={`font-mono text-xs font-bold mb-2 ${activeQuery === q.id ? 'text-teal-700' : 'text-slate-700'}`}>{q.sql}</div>
                  <p className="text-slate-700 text-xs leading-relaxed">{q.desc}</p>
                  <div className="mt-3 flex justify-end">
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition-colors ${activeQuery === q.id ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-700'}`}>
                      <Play size={12}/> {activeQuery === q.id ? 'Executed' : 'Run'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Result Data Table & Quiz */}
          <div className="flex-1 bg-white flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700">
                Result Set
              </h4>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-white px-2 py-1 border border-slate-200 rounded shadow-sm">
                <Table2 size={14}/> {currentTable.rows.length} rows
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-auto bg-[#f8fafc] relative">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200 font-mono">
                    <tr>
                      {currentTable.columns.map((col, i) => (
                        <th key={i} className="px-4 py-3 font-bold border-r border-slate-200 last:border-0">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTable.rows.length === 0 ? (
                      <tr>
                        <td colSpan={currentTable.columns.length} className="px-4 py-8 text-center text-slate-600 italic">
                          (Empty set)
                        </td>
                      </tr>
                    ) : (
                      currentTable.rows.map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 last:border-0 transition-colors ${row.highlight ? 'bg-yellow-50' : 'hover:bg-slate-50'}`}>
                          {row.data.map((cell, j) => (
                            <td key={j} className={`px-4 py-2.5 font-mono border-r border-slate-100 last:border-0 ${cell === null ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                              {cell === null ? 'NULL' : cell}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quiz Section (Collapsible or small at the bottom of Right pane) */}
            <div className="border-t border-slate-200 bg-white p-5">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-2 flex items-center gap-2">
                <span className="text-yellow-500">?</span> Knowledge Check
              </h4>
              <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
                <p className="text-sm text-slate-800 font-bold">{quiz.q}</p>
                <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                  {quiz.opts.map(o => (
                    <button 
                      key={o.val} 
                      onClick={() => { if (!qc) setQa(o.val) }} 
                      className={`flex-1 xl:flex-none text-left px-3 py-1.5 rounded-lg border-2 font-semibold transition-all text-xs shadow-sm ${
                        qc && o.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 
                        qc && qa === o.val && !o.correct ? 'border-red-400 bg-red-50 text-red-800' : 
                        qa === o.val ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 
                        'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                  <div className="flex gap-1">
                    <button onClick={resetQuiz} className="px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200">
                      <RotateCcw size={14}/>
                    </button>
                    <button onClick={submitQuiz} disabled={qc} className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg font-bold shadow-md text-xs">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">MySQL CLI Simulation</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-teal-400 font-bold shrink-0">mysql&gt;</span> <div className="text-slate-600 font-bold">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-slate-700 font-bold shrink-0"></span> <div className="text-teal-300">{line.text.substring(2)}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0"></span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-red-500 font-bold shrink-0"></span> <div className="text-red-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-500 font-bold shrink-0"></span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
