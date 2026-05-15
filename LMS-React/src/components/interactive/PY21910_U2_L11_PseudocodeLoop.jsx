import { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Trophy, Lightbulb } from 'lucide-react';

export default function PY21910_U2_L11_PseudocodeLoop() {
  const [n, setN] = useState(5);
  const [currentI, setCurrentI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState([]);
  const [phase, setPhase] = useState('idle'); // idle, init, loop, done

  const reset = () => { setCurrentI(0); setIsPlaying(false); setLogs([]); setPhase('idle'); };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        setPhase('init');
        setCurrentI(1);
        setLogs(['▶ START', '  SET i = 1']);
      } else if (phase === 'init') {
        setPhase('loop');
        setLogs(l => [...l, `  ตรวจ: WHILE 1 <= ${n}? → ใช่ ✓`]);
      } else if (phase === 'loop') {
        if (currentI <= n) {
          setLogs(l => [...l, `    PRINT ${currentI}`, `    SET i = ${currentI} + 1 = ${currentI + 1}`]);
          const nextI = currentI + 1;
          setCurrentI(nextI);
          if (nextI <= n) {
            setLogs(l => [...l, `  ตรวจ: WHILE ${nextI} <= ${n}? → ใช่ ✓`]);
          } else {
            setLogs(l => [...l, `  ตรวจ: WHILE ${nextI} <= ${n}? → ไม่ ✗ → ออกลูป`]);
            setPhase('done');
          }
        }
      } else {
        setLogs(l => [...l, '■ STOP']);
        setIsPlaying(false);
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [isPlaying, phase, currentI, n]);

  const pseudoLines = [
    { text: 'START', highlight: phase === 'idle' || phase === 'init' },
    { text: '  SET i = 1', highlight: phase === 'init' },
    { text: `  WHILE i <= ${n} DO`, highlight: phase === 'loop' },
    { text: '    PRINT i', highlight: phase === 'loop' && currentI <= n },
    { text: '    SET i = i + 1', highlight: phase === 'loop' && currentI <= n },
    { text: '  ENDWHILE', highlight: phase === 'done' },
    { text: 'STOP', highlight: phase === 'done' && !isPlaying },
  ];

  const pythonLines = [
    { text: '# เริ่มต้น', highlight: phase !== 'idle' },
    { text: 'i = 1', highlight: phase === 'init' },
    { text: `while i <= ${n}:`, highlight: phase === 'loop' },
    { text: '    print(i)', highlight: phase === 'loop' && currentI <= n },
    { text: '    i = i + 1', highlight: phase === 'loop' && currentI <= n },
    { text: '# จบ', highlight: phase === 'done' && !isPlaying },
  ];

  // Visual output boxes
  const outputs = [];
  for (let x = 1; x <= Math.min(currentI - 1, n); x++) outputs.push(x);

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> จำลอง WHILE...DO แบบ Real-time
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔄 การวนซ้ำในรหัสเทียม (WHILE...DO)</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">ใช้ WHILE...DO เมื่อต้องทำงานซ้ำ ลองรันดูว่าแต่ละรอบเกิดอะไรขึ้น และสังเกตว่าโค้ดบรรทัดไหนทำงานในแต่ละ step</p>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 max-w-md mx-auto mb-6">
        <label className="text-sm font-bold text-gray-700 mb-3 block">🎛️ พิมพ์ตัวเลข 1 ถึง N (ปรับค่า N)</label>
        <div className="flex items-center gap-4">
          <input type="range" min="1" max="10" value={n} onChange={e => { setN(+e.target.value); reset(); }} className="flex-1 accent-indigo-500 h-2" />
          <span className="text-3xl font-extrabold text-indigo-600 w-10 text-right">{n}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button onClick={() => { if (phase === 'idle') { setIsPlaying(true); } else if (phase === 'done' && !isPlaying) { reset(); } else { setIsPlaying(!isPlaying); }}}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md">
          <Play className="w-5 h-5" /> {phase === 'idle' ? 'เล่นอัตโนมัติ' : phase === 'done' && !isPlaying ? 'เล่นใหม่' : isPlaying ? 'หยุด' : 'เล่นต่อ'}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors">
          <RotateCcw className="w-5 h-5" /> รีเซ็ต
        </button>
      </div>

      {/* Visual output */}
      {outputs.length > 0 && (
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {outputs.map(x => (
            <div key={x} className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md animate-bounce" style={{ animationDelay: `${x * 100}ms`, animationDuration: '0.5s', animationIterationCount: 1 }}>
              {x}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Pseudocode */}
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-5 py-3">📋 Pseudocode</div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-0.5">
            {pseudoLines.map((line, idx) => (
              <div key={idx} className={`px-2 py-1 rounded transition-all duration-500 ${line.highlight ? 'bg-indigo-900/40 text-indigo-200' : 'text-slate-600'}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Python */}
        <div className="rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-5 py-3">🐍 Python Code</div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-0.5">
            {pythonLines.map((line, idx) => (
              <div key={idx} className={`px-2 py-1 rounded transition-all duration-500 ${line.highlight ? 'bg-emerald-900/30 text-emerald-300' : 'text-slate-600'}`}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live variables */}
      {phase !== 'idle' && (
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-sm mx-auto">
          <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
            <div className="text-xs text-blue-500 font-bold">ตัวแปร i</div>
            <div className="text-2xl font-extrabold text-blue-700">{currentI}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
            <div className="text-xs text-purple-500 font-bold">รอบที่</div>
            <div className="text-2xl font-extrabold text-purple-700">{Math.min(currentI - 1, n)}</div>
          </div>
        </div>
      )}

      {/* Console log */}
      <div className="bg-slate-900 rounded-2xl p-5 font-mono text-xs max-h-[200px] overflow-y-auto mb-6">
        <div className="text-slate-500 mb-2 text-xs font-bold uppercase tracking-wider">Execution Log</div>
        {logs.length === 0 && <div className="text-slate-600">กดปุ่มเพื่อเริ่มจำลอง...</div>}
        {logs.map((l, i) => (
          <div key={i} className={`mb-0.5 ${l.includes('✓') ? 'text-green-400' : l.includes('✗') ? 'text-red-400' : l.includes('▶') || l.includes('■') ? 'text-rose-400' : l.includes('PRINT') ? 'text-yellow-300' : 'text-slate-300'}`}>{l}</div>
        ))}
      </div>

      {phase === 'done' && !isPlaying && (
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200 flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-green-600" />
          <div>
            <div className="font-bold text-green-800">พิมพ์ตัวเลข 1 ถึง {n} สำเร็จ!</div>
            <div className="text-sm text-green-600">ลูปวน {n} รอบ จนกว่า i = {n + 1} ซึ่ง {n + 1} {'>'} {n} จึงออกจาก WHILE</div>
          </div>
        </div>
      )}

      <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-purple-800 font-medium">WHILE...DO ในรหัสเทียม ต้องปิดด้วย <code className="bg-purple-200/50 px-1 rounded font-mono">ENDWHILE</code> เสมอ</p>
          <p className="text-xs text-purple-600 mt-1">Loop ที่ดีต้องมี 3 อย่าง: ค่าเริ่มต้น (SET i = 1), เงื่อนไขหยุด (i {'<='} N), และการเปลี่ยนค่า (i = i + 1)</p>
        </div>
      </div>
    </div>
  );
}
