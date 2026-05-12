import { useState } from 'react';
import { Sparkles, Trophy, RotateCcw, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';

const lines = [
  { text: 'START', correct: 0, type: 'keyword' },
  { text: 'READ price, qty', correct: 1, type: 'io' },
  { text: 'COMPUTE total = price × qty', correct: 1, type: 'process' },
  { text: 'IF total > 1000 THEN', correct: 1, type: 'condition' },
  { text: 'COMPUTE discount = total × 0.1', correct: 2, type: 'process' },
  { text: 'ELSE', correct: 1, type: 'condition' },
  { text: 'SET discount = 0', correct: 2, type: 'process' },
  { text: 'ENDIF', correct: 1, type: 'keyword' },
  { text: 'PRINT total - discount', correct: 1, type: 'io' },
  { text: 'STOP', correct: 0, type: 'keyword' },
];

const typeColors = {
  keyword: { bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Keyword' },
  io: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'I/O' },
  process: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Process' },
  condition: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Condition' },
};

export default function PseudocodeFormat() {
  const [indents, setIndents] = useState(lines.map(() => 0));
  const [showHints, setShowHints] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleIndent = (idx, delta) => {
    const n = [...indents];
    n[idx] = Math.max(0, Math.min(3, n[idx] + delta));
    setIndents(n);
    setAttempts(a => a + 1);
  };

  const correctCount = indents.filter((v, i) => v === lines[i].correct).length;
  const isCorrect = correctCount === lines.length;

  const resetAll = () => { setIndents(lines.map(() => 0)); setShowHints(false); setAttempts(0); };

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> เกม: จัดย่อหน้ารหัสเทียม
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">📐 การจัดย่อหน้า (Indentation) ของรหัสเทียม</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">ลองเลื่อนแต่ละบรรทัดให้ย่อหน้าถูกต้อง — บรรทัดภายใน IF/ELSE ต้องย่อเข้าไป เพื่อให้อ่านง่ายและเห็นโครงสร้างชัดเจน</p>
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-600">ความถูกต้อง</span>
          <span className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-indigo-600'}`}>{correctCount}/{lines.length} บรรทัด</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-500 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} style={{ width: `${(correctCount / lines.length) * 100}%` }} />
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl mb-6">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-400 text-xs ml-3 font-mono">calculate_discount.pseudo</span>
          </div>
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <span className="text-green-400 text-xs font-bold flex items-center gap-1"><Trophy className="w-4 h-4" /> สมบูรณ์แบบ!</span>
            ) : (
              <>
                <button onClick={() => setShowHints(!showHints)} className="text-slate-400 text-xs hover:text-indigo-400 transition-colors">
                  {showHints ? 'ซ่อน Hints' : '💡 แสดง Hints'}
                </button>
                <button onClick={() => setIndents(lines.map(l => l.correct))} className="text-indigo-400 text-xs underline hover:text-indigo-300 transition-colors">
                  ดูเฉลย
                </button>
              </>
            )}
          </div>
        </div>

        {/* Code lines */}
        <div className="p-4 space-y-0.5">
          {lines.map((line, i) => {
            const isLineCorrect = indents[i] === line.correct;
            const tc = typeColors[line.type];
            return (
              <div key={i} className={`group flex items-center rounded-lg py-1.5 px-2 transition-all ${isLineCorrect ? 'bg-slate-800/30' : 'bg-red-500/5'}`}>
                {/* Line number */}
                <span className="w-8 text-slate-600 text-xs font-mono shrink-0 text-right mr-3">{i + 1}</span>

                {/* Indent controls */}
                <div className="flex gap-1 mr-2 opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => handleIndent(i, -1)} disabled={indents[i] === 0}
                    className="w-6 h-6 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-20 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleIndent(i, 1)} disabled={indents[i] === 3}
                    className="w-6 h-6 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Code text */}
                <span className={`font-mono text-sm transition-all duration-300 ${isLineCorrect ? tc.text : 'text-red-400'}`}
                  style={{ marginLeft: `${indents[i] * 28}px` }}>
                  {line.text}
                </span>

                {/* Badges */}
                <div className="ml-auto flex items-center gap-2 shrink-0">
                  {showHints && !isLineCorrect && (
                    <span className="text-xs text-amber-400 opacity-70">indent: {line.correct}</span>
                  )}
                  {isLineCorrect && <span className="text-green-500 text-xs">✓</span>}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${tc.bg} ${tc.text} opacity-60`}>{tc.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={resetAll} className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
          <RotateCcw className="w-4 h-4" /> เริ่มใหม่
        </button>
      </div>

      {isCorrect && (
        <div className="max-w-2xl mx-auto bg-green-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-green-600" />
            <div>
              <div className="font-bold text-green-800 text-lg">🎉 ย่อหน้าถูกต้องทุกบรรทัด!</div>
              <div className="text-sm text-green-600">ใช้ {attempts} ครั้งในการจัดย่อหน้า</div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="max-w-2xl mx-auto mt-6 bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-sm text-indigo-700">
          <p className="font-medium mb-2">หลักการย่อหน้ารหัสเทียม:</p>
          <ul className="space-y-1 text-indigo-600">
            <li>• <strong>START / STOP</strong> ไม่ต้องย่อหน้า (indent = 0)</li>
            <li>• คำสั่งทั่วไป (READ, COMPUTE, PRINT) ย่อ 1 ระดับ</li>
            <li>• คำสั่งภายใน IF / ELSE ย่อเพิ่มอีก 1 ระดับ</li>
            <li>• IF, ELSE, ENDIF อยู่ระดับเดียวกัน</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
