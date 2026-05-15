import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export default function PY21910_U2_L5_SelectionFlowchart() {
  const [score, setScore] = useState(65);
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const passed = score >= 50;

  useEffect(() => {
    if (!isPlaying) return;
    const sequence = passed ? [0,1,2,3,5] : [0,1,2,4,5];
    let idx = 0;
    setStep(sequence[0]);
    const timer = setInterval(() => {
      idx++;
      if (idx >= sequence.length) { setIsPlaying(false); clearInterval(timer); return; }
      setStep(sequence[idx]);
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying, passed]);

  const reset = () => { setStep(-1); setIsPlaying(false); };
  const cx = 200, nodeW = 160, nodeH = 42;

  const isActive = (s) => step === s;

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> จำลองผังงานแบบตัดสินใจ
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔀 ผังงานแบบมีทางเลือก (Selection)</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">ใช้เมื่อต้องตัดสินใจ — ผลลัพธ์จะแยกเป็น 2 ทาง (Yes/No) ตามเงื่อนไขที่กำหนด ลองลากแถบเปลี่ยนคะแนนแล้วดูว่าผังงานเดินทางไหน</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button onClick={() => { reset(); setTimeout(() => setIsPlaying(true), 100); }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md">
          <Play className="w-5 h-5" /> เล่นจำลอง
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors">
          <RotateCcw className="w-5 h-5" /> รีเซ็ต
        </button>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Visual Area (Flowchart) */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex justify-center">
          <svg viewBox="0 0 400 480" className="w-full max-w-sm">
            <defs>
              <marker id="sel-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker>
              <marker id="sel-arrow-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#22c55e"/></marker>
              <marker id="sel-arrow-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ef4444"/></marker>
            </defs>

            {/* START */}
            <rect x={cx-nodeW/2} y={10} width={nodeW} height={nodeH} rx={21} fill={isActive(0)?'#fef2f2':'#f8fafc'} stroke={isActive(0)?'#ef4444':'#cbd5e1'} strokeWidth={isActive(0)?3:2}/>
            <text x={cx} y={36} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isActive(0)?'#dc2626':'#64748b'}>START</text>

            {/* Arrow */}
            <line x1={cx} y1={52} x2={cx} y2={72} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#sel-arrow)"/>

            {/* READ score */}
            <polygon points={`${cx-nodeW/2+16},75 ${cx+nodeW/2},75 ${cx+nodeW/2-16},${75+nodeH} ${cx-nodeW/2},${75+nodeH}`}
              fill={isActive(1)?'#f0fdf4':'#f8fafc'} stroke={isActive(1)?'#22c55e':'#cbd5e1'} strokeWidth={isActive(1)?3:2}/>
            <text x={cx} y={100} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isActive(1)?'#16a34a':'#64748b'}>READ score</text>

            {/* Arrow to decision */}
            <line x1={cx} y1={117} x2={cx} y2={145} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#sel-arrow)"/>

            {/* Decision diamond */}
            <polygon points={`${cx},148 ${cx+80},198 ${cx},248 ${cx-80},198`}
              fill={isActive(2)?'#fffbeb':'#f8fafc'} stroke={isActive(2)?'#f59e0b':'#cbd5e1'} strokeWidth={isActive(2)?3:2}/>
            {isActive(2) && <polygon points={`${cx},148 ${cx+80},198 ${cx},248 ${cx-80},198`} fill="none" stroke="#fcd34d" strokeWidth={6} opacity={0.3} className="animate-pulse"/>}
            <text x={cx} y={202} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isActive(2)?'#d97706':'#64748b'}>score ≥ 50?</text>

            {/* Yes branch (left) */}
            <line x1={cx-80} y1={198} x2={cx-130} y2={198} stroke={passed&&step>=3?'#22c55e':'#94a3b8'} strokeWidth={2}/>
            <line x1={cx-130} y1={198} x2={cx-130} y2={290} stroke={passed&&step>=3?'#22c55e':'#94a3b8'} strokeWidth={2} markerEnd={passed&&step>=3?'url(#sel-arrow-g)':'url(#sel-arrow)'}/>
            <text x={cx-100} y={192} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#22c55e">Yes</text>

            {/* Yes box */}
            <polygon points={`${cx-130-nodeW/2+16},293 ${cx-130+nodeW/2},293 ${cx-130+nodeW/2-16},${293+nodeH} ${cx-130-nodeW/2},${293+nodeH}`}
              fill={isActive(3)?'#f0fdf4':'#f8fafc'} stroke={isActive(3)?'#22c55e':'#cbd5e1'} strokeWidth={isActive(3)?3:2}/>
            <text x={cx-130} y={318} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isActive(3)?'#16a34a':'#64748b'}>PRINT "ผ่าน"</text>

            {/* No branch (right) */}
            <line x1={cx+80} y1={198} x2={cx+130} y2={198} stroke={!passed&&step>=4?'#ef4444':'#94a3b8'} strokeWidth={2}/>
            <line x1={cx+130} y1={198} x2={cx+130} y2={290} stroke={!passed&&step>=4?'#ef4444':'#94a3b8'} strokeWidth={2} markerEnd={!passed&&step>=4?'url(#sel-arrow-r)':'url(#sel-arrow)'}/>
            <text x={cx+105} y={192} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ef4444">No</text>

            {/* No box */}
            <polygon points={`${cx+130-nodeW/2+16},293 ${cx+130+nodeW/2},293 ${cx+130+nodeW/2-16},${293+nodeH} ${cx+130-nodeW/2},${293+nodeH}`}
              fill={isActive(4)?'#fef2f2':'#f8fafc'} stroke={isActive(4)?'#ef4444':'#cbd5e1'} strokeWidth={isActive(4)?3:2}/>
            <text x={cx+130} y={318} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isActive(4)?'#dc2626':'#64748b'}>PRINT "ไม่ผ่าน"</text>

            {/* Merge lines */}
            <line x1={cx-130} y1={335} x2={cx-130} y2={380} stroke="#94a3b8" strokeWidth={2}/>
            <line x1={cx+130} y1={335} x2={cx+130} y2={380} stroke="#94a3b8" strokeWidth={2}/>
            <line x1={cx-130} y1={380} x2={cx+130} y2={380} stroke="#94a3b8" strokeWidth={2}/>
            <line x1={cx} y1={380} x2={cx} y2={410} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#sel-arrow)"/>

            {/* STOP */}
            <rect x={cx-nodeW/2} y={413} width={nodeW} height={nodeH} rx={21} fill={isActive(5)?'#fef2f2':'#f8fafc'} stroke={isActive(5)?'#ef4444':'#cbd5e1'} strokeWidth={isActive(5)?3:2}/>
            <text x={cx} y={438} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isActive(5)?'#dc2626':'#64748b'}>STOP</text>
          </svg>
          </div>

          {/* Right: Controls and Explanation */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <label className="text-sm font-bold text-gray-700 mb-3 block">🎛️ ปรับคะแนน score</label>
            <div className="flex items-center gap-4 mb-3">
              <input type="range" min="0" max="100" value={score} onChange={e => { setScore(+e.target.value); reset(); }} className="flex-1 accent-indigo-500 h-2" />
              <span className={`text-3xl font-extrabold w-14 text-right ${passed ? 'text-green-600' : 'text-red-600'}`}>{score}</span>
            </div>
            <div className={`rounded-xl p-4 text-center text-lg font-bold ${passed ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
              {passed ? '✅ สอบผ่าน (score ≥ 50)' : '❌ สอบตก (score < 50)'}
            </div>
          </div>

            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm flex-1 min-h-[160px] hidden">
              {/* Moved to bottom console */}
            </div>

          {/* Explanation */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <span className="text-sm font-bold text-amber-800 block mb-1">
              {step === -1 && '📋 กดเล่นเพื่อจำลองการทำงานของผังงาน'}
              {step === 0 && '🟢 เริ่มต้นโปรแกรม'}
              {step === 1 && '📥 รับค่า score จากผู้ใช้'}
              {step === 2 && '💎 ตรวจสอบเงื่อนไข: score ≥ 50 หรือไม่?'}
              {step === 3 && `✅ เงื่อนไขเป็นจริง (${score} ≥ 50) → เดินไปทาง Yes`}
              {step === 4 && `❌ เงื่อนไขเป็นเท็จ (${score} < 50) → เดินไปทาง No`}
              {step === 5 && '🔴 จบโปรแกรม (ทั้ง 2 ทางมาบรรจบกันที่ STOP)'}
            </span>
            <p className="text-xs text-amber-600">
              {step === 2 && 'สัญลักษณ์เพชร (Diamond) ใช้แสดงเงื่อนไขที่ต้องตัดสินใจ ผลลัพธ์เป็น True/False'}
              {step === 5 && 'สังเกตว่าเส้นทั้ง 2 ฝั่งจะวนมาบรรจบกัน ก่อนไปถึง STOP เสมอ'}
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
        <div className="text-slate-500 mb-3 text-xs font-bold uppercase tracking-wider">Python Code Trace</div>
        <div className={step>=1 ? 'text-purple-400' : 'text-slate-700'}>score = {score}</div>
        <div className={step>=2 ? 'text-pink-400' : 'text-slate-700'}>if score {'>'}= 50:</div>
        <div className={`ml-4 ${step===3 && passed ? 'text-yellow-300 font-bold' : 'text-slate-700'}`}>print("สอบผ่าน ✅")</div>
        <div className={step>=2 ? 'text-pink-400' : 'text-slate-700'}>else:</div>
        <div className={`ml-4 ${step===4 && !passed ? 'text-yellow-300 font-bold' : 'text-slate-700'}`}>print("สอบตก ❌")</div>
      </div>
    </div>
  );
}
