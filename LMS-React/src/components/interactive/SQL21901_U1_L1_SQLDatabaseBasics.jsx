import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Search, Zap, CheckCircle2, RotateCcw, AlertTriangle, Play } from 'lucide-react';

export default function SQL21901_U1_L1_SQLDatabaseBasics() {
  const [targetId, setTargetId] = useState(8);
  const [raceStatus, setRaceStatus] = useState('idle'); // idle, racing, finished
  const [tableProgress, setTableProgress] = useState(-1);
  const [indexProgress, setIndexProgress] = useState(-1);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Database Storage Engine Initialized.' },
    { type: 'system', text: 'Ready for Indexing Performance Test.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const totalBlocks = 10;
  
  const startRace = () => {
    setRaceStatus('racing');
    setTableProgress(0);
    setIndexProgress(0);

    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ EXECUTE QUERY: SELECT * FROM users WHERE id = ${targetId}` },
      { type: 'system', text: `> Running execution plan [Full Table Scan vs Index Scan]...` }
    ]);

    // Full Table Scan logic (1 block per 300ms)
    let currentTable = 0;
    const tableInterval = setInterval(() => {
      if (currentTable >= targetId) {
        clearInterval(tableInterval);
        return;
      }
      currentTable++;
      setTableProgress(currentTable);
    }, 300);

    // Index Scan logic
    setTimeout(() => {
      setIndexProgress(targetId);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: `[Index Scan] B-Tree Traversal found ID=${targetId} instantly.` },
        { type: 'success', text: `[Index Scan] Finished in 400ms.` }
      ]);
    }, 400);

    // Check when finished
    setTimeout(() => {
      setRaceStatus('finished');
      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: `[Full Table Scan] Sequentially read up to ID=${targetId}.` },
        { type: 'error', text: `[Full Table Scan] Finished in ${(targetId * 300)}ms.` },
        { type: 'system', text: `> Race completed.` }
      ]);
    }, targetId * 300 + 100);
  };

  const reset = () => {
    const newTarget = Math.floor(Math.random() * 5) + 5; // random 5-9
    setRaceStatus('idle');
    setTableProgress(-1);
    setIndexProgress(-1);
    setTargetId(newTarget);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `> Environment reset. New Target ID = ${newTarget}` }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <FastForward size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Index Racing Simulator (แข่งความเร็วค้นหาข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทำไมฐานข้อมูลถึงค้นหาข้อมูลนับล้านเรคคอร์ดได้ในเสี้ยววินาที? คำตอบคือการทำ <strong>Index (ดัชนี)</strong> ลองกดปุ่มค้นหาเพื่อดูแอนิเมชันเปรียบเทียบระหว่างการหาแบบปกติกับการใช้ Index ดูครับ!
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Race Track */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="flex justify-between items-center mb-6">
               <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                <Search size={16} /> เป้าหมายการค้นหา
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-600">ID = <span className="text-yellow-600 text-xl">{targetId}</span></span>
                {raceStatus === 'idle' ? (
                  <button onClick={startRace} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
                    <Play size={16}/> Start Query
                  </button>
                ) : raceStatus === 'finished' ? (
                  <button onClick={reset} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
                    <RotateCcw size={16}/> Reset
                  </button>
                ) : (
                  <button disabled className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm cursor-not-allowed">
                    Running...
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {/* Track 1: Full Table Scan */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <div className="flex justify-between items-end mb-3 border-b border-slate-100 pb-2">
                  <h3 className="text-rose-600 font-bold flex items-center gap-2 text-sm">
                    <AlertTriangle size={16}/> 1. Full Table Scan (ไม่มี Index)
                  </h3>
                  {raceStatus === 'finished' && <span className="text-rose-600 text-xs font-mono bg-rose-50 px-2 py-0.5 rounded font-bold border border-rose-200">{(targetId * 300)}ms</span>}
                </div>
                
                <div className="flex gap-2 overflow-x-auto relative min-h-[70px] custom-scrollbar pb-2">
                  {Array.from({length: totalBlocks}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-12 h-14 shrink-0 rounded-lg flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                        i === targetId && tableProgress >= i ? 'bg-emerald-500 text-white shadow-md z-10' :
                        tableProgress === i ? 'bg-rose-500 text-white shadow-md z-10' :
                        tableProgress > i ? 'bg-slate-100 text-slate-400' :
                        'bg-white border border-slate-300 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">ID</span>
                      <span>{i}</span>
                    </div>
                  ))}
                  
                  {/* Progress Line */}
                  {tableProgress >= 0 && (
                    <div 
                      className="absolute bottom-0 w-12 h-1 bg-rose-500 rounded-full transition-all duration-300"
                      style={{ left: `calc(${(tableProgress / totalBlocks) * 100}% + 8px)` }}
                    ></div>
                  )}
                </div>
              </div>

              {/* Track 2: Index Scan */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                <div className="flex justify-between items-end mb-3 border-b border-slate-100 pb-2">
                  <h3 className="text-emerald-600 font-bold flex items-center gap-2 text-sm">
                    <Zap size={16}/> 2. Index Scan (มี Index)
                  </h3>
                  {raceStatus === 'finished' && <span className="text-emerald-600 text-xs font-mono bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">400ms</span>}
                </div>
                
                <div className="flex gap-2 overflow-x-auto relative min-h-[70px] custom-scrollbar pb-2">
                  {Array.from({length: totalBlocks}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-12 h-14 shrink-0 rounded-lg flex flex-col items-center justify-center font-mono font-bold transition-all duration-500 ${
                        i === targetId && indexProgress === targetId ? 'bg-emerald-500 text-white shadow-md z-10' :
                        'bg-white border border-slate-300 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">ID</span>
                      <span>{i}</span>
                    </div>
                  ))}

                  {/* Jump Line Animation */}
                  {indexProgress === targetId && (
                    <svg className="absolute top-2 left-0 w-full h-16 pointer-events-none animate-in fade-in z-20">
                      <path 
                        d={`M 25 10 Q ${(targetId * 56) / 2 + 16} -20, ${targetId * 56 + 28} 10`} 
                        fill="none" 
                        stroke="#10B981" 
                        strokeWidth="2" 
                        strokeDasharray="4,4" 
                      />
                      <circle cx={targetId * 56 + 28} cy="10" r="3" fill="#10B981" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Explanations */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">
              อธิบายการทำงาน
            </h4>
            
            <div className="space-y-4 flex-1">
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-sm text-rose-900 shadow-sm">
                <strong className="block mb-1">Full Table Scan</strong>
                เหมือนการเปิดหนังสือทีละหน้าเพื่อหาคำที่ต้องการ ต้องไล่ค้นหาตั้งแต่ข้อมูลตัวแรกสุดไปเรื่อยๆ จนกว่าจะเจอ (ช้ามากๆ ถ้าข้อมูลมีเป็นล้านแถว)
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-900 shadow-sm">
                <strong className="block mb-1">Index Scan</strong>
                เหมือนการเปิดหน้า "สารบัญ" (B-Tree) ดูว่าคำที่ต้องการอยู่หน้าไหน แล้วกระโดดข้ามไปยังหน้านั้นได้ทันทีโดยไม่ต้องไล่ทีละหน้า (เร็วฟ้าผ่า!)
              </div>

              {raceStatus === 'finished' && (
                <div className="mt-4 bg-slate-800 text-white p-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4 border border-slate-700">
                  <h5 className="font-bold flex items-center gap-2 mb-2 text-yellow-400">
                    <CheckCircle2 size={18}/> สรุปผล
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    นี่คือเหตุผลที่การกำหนด <code>Primary Key</code> หรือการใส่ <code>INDEX</code> ให้กับคอลัมน์ที่มีการค้นหาบ่อยๆ ถึงทำให้ระบบทำงานเร็วขึ้นแบบก้าวกระโดด!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Query Performance Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-yellow-400 font-bold shrink-0">mysql&gt;</span> <div className="text-slate-600">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0">[Sys]</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-400 font-bold shrink-0">[Slow]</span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-400 font-bold shrink-0">[Fast]</span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
