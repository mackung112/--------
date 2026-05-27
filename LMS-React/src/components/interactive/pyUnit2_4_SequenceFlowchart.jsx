import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

const steps = [
  { id: 0, label: 'START', type: 'terminal' },
  { id: 1, label: 'READ radius', type: 'io' },
  { id: 2, label: 'area = π × radius²', type: 'process' },
  { id: 3, label: 'PRINT area', type: 'io' },
  { id: 4, label: 'STOP', type: 'terminal' },
];

function FlowNode({ step, isActive, y }) {
  const cx = 200;
  const w = 170, h = 46;

  if (step.type === 'terminal') {
    return (
      <g>
        <rect x={cx - w/2} y={y} width={w} height={h} rx={23} ry={23}
          fill={isActive ? '#fef2f2' : '#f8fafc'} stroke={isActive ? '#ef4444' : '#cbd5e1'} strokeWidth={isActive ? 3 : 2}
          className="transition-all duration-500"
        />
        {isActive && <rect x={cx - w/2} y={y} width={w} height={h} rx={23} ry={23} fill="none" stroke="#fca5a5" strokeWidth={6} opacity={0.4} className="animate-pulse"/>}
        <text x={cx} y={y + h/2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={isActive ? '#dc2626' : '#64748b'}>{step.label}</text>
      </g>
    );
  }
  if (step.type === 'io') {
    const skew = 18;
    const points = `${cx - w/2 + skew},${y} ${cx + w/2},${y} ${cx + w/2 - skew},${y + h} ${cx - w/2},${y + h}`;
    return (
      <g>
        <polygon points={points} fill={isActive ? '#f0fdf4' : '#f8fafc'} stroke={isActive ? '#22c55e' : '#cbd5e1'} strokeWidth={isActive ? 3 : 2} className="transition-all duration-500"/>
        {isActive && <polygon points={points} fill="none" stroke="#86efac" strokeWidth={6} opacity={0.4} className="animate-pulse"/>}
        <text x={cx} y={y + h/2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isActive ? '#16a34a' : '#64748b'}>{step.label}</text>
      </g>
    );
  }
  // process
  return (
    <g>
      <rect x={cx - w/2} y={y} width={w} height={h} rx={6} ry={6}
        fill={isActive ? '#eff6ff' : '#f8fafc'} stroke={isActive ? '#3b82f6' : '#cbd5e1'} strokeWidth={isActive ? 3 : 2}
        className="transition-all duration-500"
      />
      {isActive && <rect x={cx - w/2} y={y} width={w} height={h} rx={6} ry={6} fill="none" stroke="#93c5fd" strokeWidth={6} opacity={0.4} className="animate-pulse"/>}
      <text x={cx} y={y + h/2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isActive ? '#2563eb' : '#64748b'}>{step.label}</text>
    </g>
  );
}

export default function pyUnit2_4_SequenceFlowchart() {
  const [current, setCurrent] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radius, setRadius] = useState(5);
  const area = (Math.PI * radius * radius).toFixed(2);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const reset = () => { setCurrent(-1); setIsPlaying(false); };

  const nodeH = 46, gap = 24;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 pt-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-[120px]"></div>
      </div>
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> จำลองการทำงานแบบ Step-by-Step
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔽 ผังงานแบบเรียงลำดับ (Sequence)</h3>
        <p className="text-gray-700 max-w-xl mx-auto">คำสั่งทำงานจากบนลงล่าง ทีละขั้น ไม่มีเงื่อนไขหรือการวนซ้ำ — ตัวอย่าง: คำนวณพื้นที่วงกลม</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-8">
        <button onClick={() => { if (current === -1) setCurrent(0); setIsPlaying(!isPlaying); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          {isPlaying ? <><Pause className="w-5 h-5" /> หยุด</> : <><Play className="w-5 h-5" /> {current > -1 ? 'เล่นต่อ' : 'เล่นอัตโนมัติ'}</>}
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
            <svg viewBox="0 0 400 380" className="w-full max-w-sm">
              <defs>
                <marker id="seq-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
                </marker>
              </defs>
              {steps.map((step, i) => {
                const y = i * (nodeH + gap) + 15;
                return (
                  <g key={step.id}>
                    {i > 0 && <line x1={200} y1={y - gap + 2} x2={200} y2={y - 2} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#seq-arrow)"/>}
                    <FlowNode step={step} isActive={current === i} y={y} />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: Controls and Explanation */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <label className="text-sm font-bold text-gray-700 mb-3 block">🎛️ ลองเปลี่ยนค่า radius</label>
            <div className="flex items-center gap-4">
              <input type="range" min="1" max="20" value={radius} onChange={e => { setRadius(+e.target.value); reset(); }} className="flex-1 accent-indigo-500 h-2" />
              <span className="text-2xl font-extrabold text-indigo-600 w-10 text-right">{radius}</span>
            </div>
          </div>

          {/* Step Explanation */}
          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex-1">
            <span className="text-sm font-bold text-indigo-800 block mb-1">
              {current === -1 && '📋 พร้อมเริ่ม'}
              {current === 0 && '🟢 ขั้นตอนที่ 1: เริ่มต้นโปรแกรม'}
              {current === 1 && '📥 ขั้นตอนที่ 2: รับค่า radius จากผู้ใช้'}
              {current === 2 && '⚙️ ขั้นตอนที่ 3: คำนวณพื้นที่ด้วยสูตร π × r²'}
              {current === 3 && '📤 ขั้นตอนที่ 4: แสดงผลลัพธ์ area'}
              {current === 4 && '🔴 ขั้นตอนที่ 5: จบโปรแกรม'}
            </span>
            <p className="text-xs text-indigo-600">
              {current === -1 && 'ผังงานนี้มี 5 ขั้นตอน ทำงานจากบนลงล่าง (Sequence)'}
              {current === 0 && 'จุดเริ่มต้น (Terminal) ทุกผังงานต้องเริ่มจาก START'}
              {current === 1 && 'สัญลักษณ์ด้านขนาน (I/O) ใช้สำหรับรับข้อมูลเข้า'}
              {current === 2 && 'สัญลักษณ์สี่เหลี่ยม (Process) ใช้สำหรับการคำนวณ'}
              {current === 3 && 'สัญลักษณ์ด้านขนาน (I/O) ใช้สำหรับแสดงผลลัพธ์'}
              {current === 4 && 'จุดสิ้นสุด (Terminal) ทุกผังงานต้องจบด้วย STOP'}
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
        <div className="text-slate-700 mb-3 text-xs font-bold uppercase tracking-wider">Live Console</div>
        {current >= 0 && <div className="text-emerald-400 mb-1">{'>'} โปรแกรมเริ่มทำงาน...</div>}
        {current >= 1 && <div className="text-purple-400 mb-1">{'>'} radius = <span className="text-yellow-300">{radius}</span></div>}
        {current >= 2 && <div className="text-blue-400 mb-1">{'>'} area = π × {radius}² = <span className="text-yellow-300">{area}</span></div>}
        {current >= 3 && <div className="text-yellow-300 mb-1 text-lg font-bold">📤 Output: {area}</div>}
        {current >= 4 && <div className="text-rose-400 mt-2">--- โปรแกรมจบการทำงาน ---</div>}
        {current === -1 && <div className="text-slate-600">กดปุ่มเล่นเพื่อดูการทำงาน...</div>}
      </div>
    </div>
      </main>
    </div>
  );
}
