import React, { useState, useEffect, useRef } from 'react';
import { Database, Table, Columns, Rows, Grid3X3, ArrowRight, RotateCcw, CheckCircle2, ShieldAlert, TerminalSquare } from 'lucide-react';


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

export default function SQL21901_U2_L1_SQLTableStructure() {
  const [highlight, setHighlight] = useState({ type: null, val: null });
  
  // Quiz State
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState({
    column: null,
    row: null,
    field: null
  });
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Table Structure Analyzer Initialized.' },
    { type: 'system', text: 'Click on table elements to inspect their properties.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  // Info Panel Data
  const infoData = {
    'column': {
      title: 'Column / Field (คอลัมน์)',
      icon: <Columns className="text-sky-500" size={24} />,
      bg: 'bg-sky-100',
      desc: 'ข้อมูลในแนวตั้ง หมายถึง ประเภทของข้อมูล 1 ชนิดที่อยู่ในตาราง เช่น คอลัมน์ "first_name" จะเก็บเฉพาะชื่อพนักงานเท่านั้น โปรแกรมเมอร์มักเรียกว่า "ฟิลด์" (Field)'
    },
    'row': {
      title: 'Row / Record (แถว)',
      icon: <Rows className="text-rose-500" size={24} />,
      bg: 'bg-rose-100',
      desc: 'ข้อมูลในแนวนอน หมายถึง ข้อมูล 1 รายการ ที่ประกอบไปด้วยฟิลด์ต่างๆ รวมกัน เช่น แถวที่ 2 คือข้อมูลของพนักงานชื่อ Suda แผนก HR โปรแกรมเมอร์มักเรียกว่า "เรคคอร์ด" (Record)'
    },
    'cell': {
      title: 'Data Value (ข้อมูล)',
      icon: <Grid3X3 className="text-yellow-600" size={24} />,
      bg: 'bg-yellow-100',
      desc: 'จุดตัดระหว่างแถวและคอลัมน์ คือ เนื้อข้อมูลจริงๆ 1 ค่า (Single Value) เช่น คำว่า "IT" หรือตัวเลข "35000"'
    }
  };

  const handleCellClick = (type, val) => {
    setHighlight({ type, val });
    
    let command = '';
    if (type === 'column') command = `SELECT ${['PK', 'emp_id', 'first_name', 'department', 'salary'][val]} FROM employees;`;
    else if (type === 'row') command = `SELECT * FROM employees WHERE PK = ${val};`;
    else command = `SELECT data FROM employees WHERE ...;`;

    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ INSPECT ${type.toUpperCase()}` },
      { type: 'output', text: `> Related SQL: ${command}` },
      { type: 'system', text: `> Definition: ${infoData[type].title}` }
    ]);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem === zone) {
      setDropZones(prev => ({ ...prev, [zone]: draggedItem }));
      setDraggedItem(null);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'success', text: `> Match Success: ${zone} correctly identified.` }
      ]);
    } else {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'error', text: `> Error: Invalid assignment. Try again.` }
      ]);
    }
  };

  const resetQuiz = () => {
    setDropZones({ column: null, row: null, field: null });
    setDraggedItem(null);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `> Knowledge Check Reset.` }
    ]);
  };

  const isQuizComplete = Object.values(dropZones).every(v => v !== null);

  const getCellClasses = (type, colIdx, rowIdx) => {
    let classes = "bg-white p-2.5 text-center text-xs md:text-sm transition-all cursor-pointer border border-slate-200 relative ";
    if (type === 'header') classes = "bg-slate-100 font-bold text-slate-800 p-2.5 text-xs md:text-sm text-center transition-all cursor-pointer border border-slate-200 ";
    if (type === 'id') classes = "bg-slate-200 font-bold text-slate-500 p-2.5 text-center text-xs md:text-sm transition-all cursor-pointer border border-slate-200 ";

    // Highlight Logic
    if (highlight.type === 'column' && highlight.val === colIdx) {
      classes += "bg-sky-100 border-x-2 border-x-sky-400 z-10 ";
      if (type === 'header') classes += "border-t-2 border-t-sky-400 ";
      if (rowIdx === 3) classes += "border-b-2 border-b-sky-400 ";
    }
    
    if (highlight.type === 'row' && highlight.val === rowIdx) {
      classes += "bg-rose-100 border-y-2 border-y-rose-400 z-10 ";
      if (colIdx === 0) classes += "border-l-2 border-l-rose-400 ";
      if (colIdx === 4) classes += "border-r-2 border-r-rose-400 ";
    }

    if (highlight.type === 'cell' && highlight.val === `${colIdx}-${rowIdx}`) {
      classes += "bg-yellow-200 border-2 border-yellow-500 scale-105 shadow-lg z-20 font-bold ";
    }

    return classes;
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
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
            <Table size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Table Structure (โครงสร้างตาราง)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทำความรู้จักส่วนประกอบพื้นฐานของตารางข้อมูล: คอลัมน์, แถว, และข้อมูล
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Table Visualizer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50 overflow-hidden">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              Interactive Table Anatomy
            </h4>

            <div className="w-full overflow-x-auto pb-4">
              <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr] rounded-lg overflow-hidden border border-slate-300 shadow-sm min-w-[500px]">
                {/* Headers */}
                <div onClick={() => handleCellClick('column', 0)} className={getCellClasses('header', 0, 0)}>PK</div>
                <div onClick={() => handleCellClick('column', 1)} className={getCellClasses('header', 1, 0)}>emp_id</div>
                <div onClick={() => handleCellClick('column', 2)} className={getCellClasses('header', 2, 0)}>first_name</div>
                <div onClick={() => handleCellClick('column', 3)} className={getCellClasses('header', 3, 0)}>department</div>
                <div onClick={() => handleCellClick('column', 4)} className={getCellClasses('header', 4, 0)}>salary</div>

                {/* Row 1 */}
                <div onClick={() => handleCellClick('row', 1)} className={getCellClasses('id', 0, 1)}>1</div>
                <div onClick={() => handleCellClick('cell', '1-1')} className={getCellClasses('cell', 1, 1)}>101</div>
                <div onClick={() => handleCellClick('cell', '2-1')} className={getCellClasses('cell', 2, 1)}>Somchai</div>
                <div onClick={() => handleCellClick('cell', '3-1')} className={getCellClasses('cell', 3, 1)}>IT</div>
                <div onClick={() => handleCellClick('cell', '4-1')} className={getCellClasses('cell', 4, 1)}>35000</div>

                {/* Row 2 */}
                <div onClick={() => handleCellClick('row', 2)} className={getCellClasses('id', 0, 2)}>2</div>
                <div onClick={() => handleCellClick('cell', '1-2')} className={getCellClasses('cell', 1, 2)}>102</div>
                <div onClick={() => handleCellClick('cell', '2-2')} className={getCellClasses('cell', 2, 2)}>Suda</div>
                <div onClick={() => handleCellClick('cell', '3-2')} className={getCellClasses('cell', 3, 2)}>HR</div>
                <div onClick={() => handleCellClick('cell', '4-2')} className={getCellClasses('cell', 4, 2)}>28000</div>

                {/* Row 3 */}
                <div onClick={() => handleCellClick('row', 3)} className={getCellClasses('id', 0, 3)}>3</div>
                <div onClick={() => handleCellClick('cell', '1-3')} className={getCellClasses('cell', 1, 3)}>103</div>
                <div onClick={() => handleCellClick('cell', '2-3')} className={getCellClasses('cell', 2, 3)}>Mana</div>
                <div onClick={() => handleCellClick('cell', '3-3')} className={getCellClasses('cell', 3, 3)}>Sales</div>
                <div onClick={() => handleCellClick('cell', '4-3')} className={getCellClasses('cell', 4, 3)}>42000</div>
              </div>
            </div>
            <div className="text-center text-xs text-slate-700 font-medium animate-pulse mt-2">
              👆 ลองคลิกที่หัวคอลัมน์ ตัวเลขแถว หรือข้อมูลข้างในดูสิครับ
            </div>

            {/* Info Panel under table */}
            <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 min-h-[140px] flex items-center shadow-sm">
              {!highlight.type ? (
                <div className="text-center text-slate-600 w-full flex flex-col items-center">
                  <ArrowRight className="mb-2 opacity-50 transform rotate-90 md:rotate-0" size={24} />
                  <p className="text-sm">คำอธิบายจะปรากฏที่นี่</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300 w-full">
                  <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${infoData[highlight.type].bg}`}>
                      {infoData[highlight.type].icon}
                    </div>
                    <h4 className="font-bold text-slate-800">{infoData[highlight.type].title}</h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{infoData[highlight.type].desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Drag & Drop Quiz */}
          <div className="w-full lg:w-[450px] bg-white p-6 flex flex-col border-t lg:border-t-0 border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <span className="text-yellow-500">?</span> Knowledge Check
            </h4>
            
            <p className="text-xs text-slate-700 mb-4">ลากป้ายคำศัพท์ด้านล่าง ไปวางในช่องว่างให้ตรงกับความหมายที่ถูกต้อง</p>

            <div className="space-y-4 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <span className="font-bold text-slate-600 mr-2">1.</span> ข้อมูลใน <strong className="text-sky-500">แนวตั้ง</strong> เช่น 'ราคาสินค้า' เรียกว่า
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'column')}
                  className={`mt-2 flex items-center justify-center w-full h-10 border-2 rounded-lg transition-all text-xs font-bold ${dropZones.column ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-dashed border-slate-300 bg-white text-slate-400'}`}
                >
                  {dropZones.column || 'Drop here'}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <span className="font-bold text-slate-600 mr-2">2.</span> ข้อมูล 1 รายการ ใน <strong className="text-rose-500">แนวนอน</strong> เรียกว่า
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'row')}
                  className={`mt-2 flex items-center justify-center w-full h-10 border-2 rounded-lg transition-all text-xs font-bold ${dropZones.row ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-dashed border-slate-300 bg-white text-slate-400'}`}
                >
                  {dropZones.row || 'Drop here'}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <span className="font-bold text-slate-600 mr-2">3.</span> คำศัพท์ที่โปรแกรมเมอร์มักใช้เรียกแทนคำว่า 'Column'
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'field')}
                  className={`mt-2 flex items-center justify-center w-full h-10 border-2 rounded-lg transition-all text-xs font-bold ${dropZones.field ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-dashed border-slate-300 bg-white text-slate-400'}`}
                >
                  {dropZones.field || 'Drop here'}
                </div>
              </div>
            </div>

            {/* Draggables Box */}
            <div className="mt-6 bg-slate-800 p-4 rounded-xl shadow-inner border border-slate-700">
              <h5 className="text-xs font-semibold text-slate-600 mb-3 text-center uppercase tracking-wider">คลังคำศัพท์ (Drag Words)</h5>
              <div className="flex flex-wrap gap-2 justify-center">
                {!Object.values(dropZones).includes('Column') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'Column')} className="cursor-grab active:cursor-grabbing bg-sky-500 hover:bg-sky-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-xs flex items-center gap-1">
                    <Columns size={14} /> Column
                  </div>
                )}
                {!Object.values(dropZones).includes('Record') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'Record')} className="cursor-grab active:cursor-grabbing bg-rose-500 hover:bg-rose-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-xs flex items-center gap-1">
                    <Rows size={14} /> Record
                  </div>
                )}
                {!Object.values(dropZones).includes('Field') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'Field')} className="cursor-grab active:cursor-grabbing bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-xs flex items-center gap-1">
                    <Database size={14} /> Field
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center border-t border-slate-700 pt-3">
                <button onClick={resetQuiz} className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 font-medium bg-slate-700/50 px-2 py-1 rounded">
                  <RotateCcw size={12} /> Reset
                </button>
                {isQuizComplete && (
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 animate-pulse">
                    <CheckCircle2 size={14} /> All Correct!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-600" />
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Event Logger</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">&gt;&gt;&gt;</span> <div className="text-slate-600">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text.substring(2)}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0">[Sys]</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-400 font-bold shrink-0">[Err]</span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-400 font-bold shrink-0">[Ok]</span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
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
