import React, { useState } from 'react';
import { FastForward, Search, Zap, CheckCircle2, RotateCcw, AlertTriangle, Play } from 'lucide-react';

export default function SQLDatabaseBasics() {
  const [targetId, setTargetId] = useState(8);
  const [raceStatus, setRaceStatus] = useState('idle'); // idle, racing, finished
  const [tableProgress, setTableProgress] = useState(-1);
  const [indexProgress, setIndexProgress] = useState(-1);

  const totalBlocks = 10;
  
  const startRace = () => {
    setRaceStatus('racing');
    setTableProgress(0);
    setIndexProgress(0);

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

    // Index Scan logic (instant jump via B-Tree simulation)
    // Actually, let's just make it jump immediately after 400ms to show O(1) or O(log n)
    setTimeout(() => {
      setIndexProgress(targetId);
    }, 400);

    // Check when finished
    setTimeout(() => {
      setRaceStatus('finished');
    }, targetId * 300 + 100);
  };

  const reset = () => {
    setRaceStatus('idle');
    setTableProgress(-1);
    setIndexProgress(-1);
    setTargetId(Math.floor(Math.random() * 5) + 5); // random 5-9
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl shrink-0">
          <FastForward size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Index Racing Simulator (แข่งความเร็วค้นหาข้อมูล)</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ทำไมฐานข้อมูลถึงค้นหาข้อมูลนับล้านเรคคอร์ดได้ในเสี้ยววินาที? คำตอบคือการทำ <strong>Index (ดัชนี)</strong> ลองกดปุ่มค้นหาเพื่อดูแอนิเมชันเปรียบเทียบระหว่างการหาแบบปกติกับการใช้ Index ดูครับ!
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-700 p-6 md:p-8 overflow-hidden">
        
        {/* Objective */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700 text-white">
          <div className="flex items-center gap-3">
            <Search className="text-sky-400"/> 
            <span>เป้าหมายที่ต้องการค้นหา: <strong className="text-yellow-400 text-2xl ml-2">ID = {targetId}</strong></span>
          </div>
          {raceStatus === 'idle' && (
            <button 
              onClick={startRace}
              className="mt-4 md:mt-0 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all hover:scale-105 flex items-center gap-2"
            >
              <Play size={20}/> START QUERY!
            </button>
          )}
          {raceStatus === 'finished' && (
            <button 
              onClick={reset}
              className="mt-4 md:mt-0 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-full transition-all flex items-center gap-2"
            >
              <RotateCcw size={18}/> ลองอีกครั้ง
            </button>
          )}
        </div>

        {/* Race Tracks */}
        <div className="space-y-8">
          
          {/* Track 1: Full Table Scan */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-rose-400 font-bold flex items-center gap-2">
                <AlertTriangle size={18}/> 1. Full Table Scan (ไม่มี Index)
              </h3>
              {raceStatus === 'finished' && <span className="text-rose-400 text-sm font-mono bg-rose-900/30 px-2 py-1 rounded">Time: {(targetId * 300)}ms</span>}
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex gap-2 overflow-x-auto relative min-h-[100px]">
              {Array.from({length: totalBlocks}).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-14 h-16 shrink-0 rounded-lg flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                    i === targetId && tableProgress >= i ? 'bg-emerald-500 text-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10' :
                    tableProgress === i ? 'bg-rose-500 text-white scale-110 shadow-lg z-10' :
                    tableProgress > i ? 'bg-slate-700 text-slate-500 opacity-50' :
                    'bg-slate-700 border-2 border-slate-600 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] opacity-50">ID</span>
                  <span>{i}</span>
                </div>
              ))}
              
              {/* Turtle / Car representation */}
              {tableProgress >= 0 && (
                <div 
                  className="absolute bottom-1 w-14 h-1 bg-rose-500 rounded-full transition-all duration-300"
                  style={{ left: `calc(${(tableProgress / totalBlocks) * 100}% + 16px)`, transform: 'translateX(-50%)' }}
                ></div>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-2 font-mono">
              เหมือนการเปิดหนังสือทีละหน้าเพื่อหาคำที่ต้องการ (ช้ามากๆ ถ้าข้อมูลเยอะ)
            </p>
          </div>

          {/* Track 2: Index Scan */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                <Zap size={18}/> 2. Index Scan (มี Index)
              </h3>
              {raceStatus === 'finished' && <span className="text-emerald-400 text-sm font-mono bg-emerald-900/30 px-2 py-1 rounded">Time: 400ms</span>}
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex gap-2 overflow-x-auto relative min-h-[100px]">
              {Array.from({length: totalBlocks}).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-14 h-16 shrink-0 rounded-lg flex flex-col items-center justify-center font-mono font-bold transition-all duration-500 ${
                    i === targetId && indexProgress === targetId ? 'bg-emerald-500 text-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10' :
                    'bg-slate-700 border-2 border-slate-600 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] opacity-50">ID</span>
                  <span>{i}</span>
                </div>
              ))}

              {/* Jump Line Animation */}
              {indexProgress === targetId && (
                <svg className="absolute top-4 left-0 w-full h-20 pointer-events-none animate-in fade-in z-20">
                  <path 
                    d={`M 35 10 Q ${(targetId * 64) / 2 + 16} -20, ${targetId * 64 + 40} 10`} 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    strokeDasharray="5,5" 
                  />
                  <circle cx={targetId * 64 + 40} cy="10" r="4" fill="#10B981" />
                </svg>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-2 font-mono">
              เหมือนการเปิดหน้า "สารบัญ" (B-Tree) แล้วกระโดดข้ามไปยังหน้าที่ต้องการได้ทันที (เร็วฟ้าผ่า!)
            </p>
          </div>

        </div>

        {/* Conclusion */}
        {raceStatus === 'finished' && (
          <div className="mt-8 bg-emerald-900/30 border border-emerald-500/30 p-6 rounded-xl animate-in slide-in-from-bottom-4">
            <h4 className="text-emerald-400 font-bold text-xl flex items-center gap-2 mb-2">
              <CheckCircle2 /> Index Scan ชนะขาดลอย!
            </h4>
            <p className="text-emerald-100/80 leading-relaxed">
              นี่คือเหตุผลที่การทำ <code>Primary Key</code> หรือการใส่ <code>INDEX</code> ลงในคอลัมน์ที่มีการค้นหาบ่อยๆ (เช่น รหัสพนักงาน, อีเมล) ถึงทำให้ระบบทำงานเร็วขึ้นแบบก้าวกระโดด! แต่ข้อควรระวังคือ ถ้าใส่ Index เยอะเกินไป จะทำให้การ `INSERT` / `UPDATE` ข้อมูลช้าลงแทนนะ เพราะระบบต้องอัปเดตสารบัญใหม่ตลอดเวลา
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
