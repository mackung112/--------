import { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Trophy } from 'lucide-react';

export default function PY21910_U2_L6_IterationFlowchart() {
  const [targetN, setTargetN] = useState(5);
  const [step, setStep] = useState(-1); // -1=idle, 0=start, 1=init, 2=check, 3=process, 4=output, 5=stop
  const [i, setI] = useState(1);
  const [sum, setSum] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const reset = () => { setStep(-1); setI(1); setSum(0); setLogs([]); setIsPlaying(false); setLoopCount(0); };

  const doStep = () => {
    if (step === -1) { setStep(0); setLogs(['▶ START']); return; }
    if (step === 0) { setStep(1); setI(1); setSum(0); setLogs(l => [...l, '  i = 1, sum = 0']); return; }
    if (step === 1) { setStep(2); setLogs(l => [...l, `  ตรวจ: i(${1}) ≤ ${targetN}?`]); return; }
    if (step === 2) {
      if (i <= targetN) {
        setStep(3);
        const newSum = sum + i;
        setLogs(l => [...l, `  ✓ ใช่ → sum = ${sum} + ${i} = ${newSum}, i = ${i+1}`]);
        setSum(newSum);
        setI(i + 1);
        setLoopCount(c => c + 1);
      } else {
        setStep(4);
        setLogs(l => [...l, `  ✗ ไม่ → ออกจาก loop`]);
      }
      return;
    }
    if (step === 3) { setStep(2); setLogs(l => [...l, `  ↰ กลับตรวจ: i(${i}) ≤ ${targetN}?`]); return; }
    if (step === 4) { setStep(5); setLogs(l => [...l, `  📤 PRINT sum = ${sum}`, '■ STOP']); return; }
    reset();
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(doStep, 800);
    return () => clearTimeout(timer);
  }, [isPlaying, step, i]);

  const cx = 200;

  const nodeActive = (s) => step === s;
  const loopActive = step === 2 || step === 3;

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> จำลองการวนซ้ำ Step-by-Step
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔄 ผังงานแบบวนซ้ำ (Iteration)</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">ทำงานซ้ำๆ จนกว่าเงื่อนไขจะเป็นเท็จ — ตัวอย่าง: หาผลรวม 1 ถึง N</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button onClick={() => { if (step === -1 || step === 5) { reset(); setTimeout(() => setIsPlaying(true), 100); } else setIsPlaying(!isPlaying); }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md">
          <Play className="w-5 h-5" /> {step === -1 || step === 5 ? 'เล่นอัตโนมัติ' : isPlaying ? 'หยุด' : 'เล่นต่อ'}
        </button>
        <button onClick={() => { setIsPlaying(false); doStep(); }} disabled={isPlaying}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50">
          ⏭ ทีละขั้น
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors">
          <RotateCcw className="w-5 h-5" /> รีเซ็ต
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-8">
        {/* SVG Flowchart */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex justify-center">
          <svg viewBox="0 0 400 460" className="w-full max-w-sm">
            <defs>
              <marker id="iter-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker>
              <marker id="iter-arrow-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#a855f7"/></marker>
            </defs>

            {/* START */}
            <rect x={cx-80} y={10} width={160} height={40} rx={20} fill={nodeActive(0)?'#fef2f2':'#f8fafc'} stroke={nodeActive(0)?'#ef4444':'#cbd5e1'} strokeWidth={nodeActive(0)?3:2}/>
            <text x={cx} y={35} textAnchor="middle" fontSize="14" fontWeight="bold" fill={nodeActive(0)?'#dc2626':'#64748b'}>START</text>

            <line x1={cx} y1={50} x2={cx} y2={70} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#iter-arrow)"/>

            {/* INIT */}
            <rect x={cx-80} y={73} width={160} height={40} rx={5} fill={nodeActive(1)?'#eff6ff':'#f8fafc'} stroke={nodeActive(1)?'#3b82f6':'#cbd5e1'} strokeWidth={nodeActive(1)?3:2}/>
            <text x={cx} y={98} textAnchor="middle" fontSize="12" fontWeight="bold" fill={nodeActive(1)?'#2563eb':'#64748b'}>i = 1, sum = 0</text>

            <line x1={cx} y1={113} x2={cx} y2={140} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#iter-arrow)"/>

            {/* Decision diamond */}
            <polygon points={`${cx},143 ${cx+75},193 ${cx},243 ${cx-75},193`}
              fill={nodeActive(2)?'#fffbeb':'#f8fafc'} stroke={nodeActive(2)?'#f59e0b':'#cbd5e1'} strokeWidth={nodeActive(2)?3:2}/>
            {nodeActive(2) && <polygon points={`${cx},143 ${cx+75},193 ${cx},243 ${cx-75},193`} fill="none" stroke="#fcd34d" strokeWidth={6} opacity={0.3} className="animate-pulse"/>}
            <text x={cx} y={197} textAnchor="middle" fontSize="11" fontWeight="bold" fill={nodeActive(2)?'#d97706':'#64748b'}>i ≤ {targetN}?</text>

            {/* Yes → Process (down) */}
            <line x1={cx} y1={243} x2={cx} y2={275} stroke={loopActive?'#22c55e':'#94a3b8'} strokeWidth={2} markerEnd="url(#iter-arrow)"/>
            <text x={cx+15} y={262} fontSize="11" fontWeight="bold" fill="#22c55e">Yes</text>

            <rect x={cx-80} y={278} width={160} height={40} rx={5} fill={nodeActive(3)?'#eff6ff':'#f8fafc'} stroke={nodeActive(3)?'#3b82f6':'#cbd5e1'} strokeWidth={nodeActive(3)?3:2}/>
            <text x={cx} y={303} textAnchor="middle" fontSize="12" fontWeight="bold" fill={nodeActive(3)?'#2563eb':'#64748b'}>sum += i; i += 1</text>

            {/* Loop back arrow */}
            <line x1={cx+80} y1={298} x2={cx+120} y2={298} stroke={loopActive?'#a855f7':'#94a3b8'} strokeWidth={2}/>
            <line x1={cx+120} y1={298} x2={cx+120} y2={193} stroke={loopActive?'#a855f7':'#94a3b8'} strokeWidth={2}/>
            <line x1={cx+120} y1={193} x2={cx+78} y2={193} stroke={loopActive?'#a855f7':'#94a3b8'} strokeWidth={2} markerEnd={loopActive?'url(#iter-arrow-p)':'url(#iter-arrow)'}/>
            <text x={cx+130} y={250} fontSize="10" fill={loopActive?'#a855f7':'#94a3b8'} fontWeight="bold" writingMode="tb">↰ วนกลับ</text>

            {/* No → Output (left) */}
            <line x1={cx-75} y1={193} x2={cx-130} y2={193} stroke={step>=4?'#ef4444':'#94a3b8'} strokeWidth={2}/>
            <line x1={cx-130} y1={193} x2={cx-130} y2={360} stroke={step>=4?'#ef4444':'#94a3b8'} strokeWidth={2} markerEnd="url(#iter-arrow)"/>
            <text x={cx-100} y={187} fontSize="11" fontWeight="bold" fill="#ef4444">No</text>

            {/* PRINT sum */}
            <polygon points={`${cx-130-70+14},363 ${cx-130+70},363 ${cx-130+70-14},${363+40} ${cx-130-70},${363+40}`}
              fill={nodeActive(4)?'#f0fdf4':'#f8fafc'} stroke={nodeActive(4)?'#22c55e':'#cbd5e1'} strokeWidth={nodeActive(4)?3:2}/>
            <text x={cx-130} y={388} textAnchor="middle" fontSize="12" fontWeight="bold" fill={nodeActive(4)?'#16a34a':'#64748b'}>PRINT sum</text>

            <line x1={cx-130} y1={403} x2={cx-130} y2={420} stroke="#94a3b8" strokeWidth={2}/>
            <line x1={cx-130} y1={420} x2={cx} y2={420} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#iter-arrow)"/>

            {/* STOP */}
            <rect x={cx-80} y={413} width={160} height={40} rx={20} fill={nodeActive(5)?'#fef2f2':'#f8fafc'} stroke={nodeActive(5)?'#ef4444':'#cbd5e1'} strokeWidth={nodeActive(5)?3:2}/>
            <text x={cx} y={438} textAnchor="middle" fontSize="14" fontWeight="bold" fill={nodeActive(5)?'#dc2626':'#64748b'}>STOP</text>
          </svg>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <label className="text-sm font-bold text-gray-700 mb-3 block">🎛️ เปลี่ยนค่า N (หาผลรวม 1 ถึง N)</label>
            <div className="flex items-center gap-4 mb-2">
              <input type="range" min="1" max="10" value={targetN} onChange={e => { setTargetN(+e.target.value); reset(); }} className="flex-1 accent-indigo-500 h-2" />
              <span className="text-3xl font-extrabold text-indigo-600 w-10 text-right">{targetN}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>คำตอบที่ถูกต้อง:</span>
              <span className="font-bold text-indigo-600">{(targetN * (targetN + 1)) / 2}</span>
              <span className="text-gray-600">| วนลูป {targetN} รอบ</span>
            </div>
          </div>

          {/* Live variables */}
          {step >= 1 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
                <div className="text-xs text-blue-500 font-bold">i</div>
                <div className="text-2xl font-extrabold text-blue-700">{i > targetN ? i-1 : i}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200">
                <div className="text-xs text-green-500 font-bold">sum</div>
                <div className="text-2xl font-extrabold text-green-700">{sum}</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
                <div className="text-xs text-purple-500 font-bold">รอบที่</div>
                <div className="text-2xl font-extrabold text-purple-700">{loopCount}</div>
              </div>
            </div>
          )}

          {/* Console */}
          

          {step === 5 && (
            <div className="bg-green-50 rounded-2xl p-5 border border-green-200 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-bold text-green-800">ผลรวม 1 ถึง {targetN} = {sum}</div>
                <div className="text-sm text-green-600">ใช้ {loopCount} รอบในการวนลูป (i วิ่งจาก 1 ถึง {targetN})</div>
              </div>
            </div>
          )}
        </div>
      </div>
    
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-slate-700 mb-2 text-xs font-bold uppercase tracking-wider">Execution Log</div>
            {logs.length === 0 && <div className="text-slate-600">กดปุ่มเพื่อเริ่มจำลอง...</div>}
            {logs.map((l, idx) => (
              <div key={idx} className={`mb-0.5 ${l.includes('✓') ? 'text-green-400' : l.includes('✗') ? 'text-red-400' : l.includes('📤') ? 'text-yellow-300 font-bold' : l.includes('▶') || l.includes('■') ? 'text-rose-400' : 'text-slate-300'}`}>
                {l}
              </div>
            ))}
          </div>
    </div>
  );
}
