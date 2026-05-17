import { useState } from 'react';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

const keywords = [
  { word: 'START', desc: 'กำหนดจุดเริ่มต้นของอัลกอริทึม ทุก Pseudocode ต้องขึ้นต้นด้วยคำนี้เสมอ', example: 'START', python: '# เริ่มต้นโปรแกรม', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 border-rose-200', textColor: 'text-rose-700', icon: '🟢' },
  { word: 'STOP', desc: 'กำหนดจุดสิ้นสุดของอัลกอริทึม ทุก Pseudocode ต้องจบด้วยคำนี้เสมอ', example: 'STOP', python: '# จบโปรแกรม', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 border-rose-200', textColor: 'text-rose-700', icon: '🔴' },
  { word: 'READ', desc: 'อ่านข้อมูลเข้าจากผู้ใช้ (Input) เปรียบเสมือนการรอให้ผู้ใช้พิมพ์ค่าเข้ามา', example: 'READ name\nREAD age', python: 'name = input("ชื่อ: ")\nage = int(input("อายุ: "))', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '📥' },
  { word: 'COMPUTE', desc: 'คำนวณหรือประมวลผลข้อมูล (Process) ใช้สำหรับกำหนดค่าหรือคำนวณสูตร', example: 'COMPUTE total = price × qty\nCOMPUTE tax = total × 0.07', python: 'total = price * qty\ntax = total * 0.07', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', icon: '⚙️' },
  { word: 'PRINT', desc: 'แสดงผลลัพธ์ออกทางหน้าจอ (Output) เป็นวิธีสื่อสารผลลัพธ์ให้ผู้ใช้เห็น', example: 'PRINT "ผลรวม = ", total\nPRINT result', python: 'print(f"ผลรวม = {total}")\nprint(result)', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700', icon: '📤' },
  { word: 'SET', desc: 'กำหนดค่าเริ่มต้นให้ตัวแปร (Initialize) มักใช้ในขั้นตอนเตรียมการก่อนเริ่มประมวลผล', example: 'SET count = 0\nSET total = 0', python: 'count = 0\ntotal = 0', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', icon: '📌' },
];

// Drag & Drop matching game
const matchItems = [
  { keyword: 'READ', python: 'input()' },
  { keyword: 'PRINT', python: 'print()' },
  { keyword: 'COMPUTE', python: '= (กำหนดค่า)' },
  { keyword: 'SET', python: '= 0 (ค่าเริ่มต้น)' },
];

export default function PY21910_U2_L9_PseudocodeKeywords() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [gameAnswers, setGameAnswers] = useState({});
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const active = activeIdx !== null ? keywords[activeIdx] : null;

  const handleMatch = (pythonItem) => {
    if (selectedKeyword === null) return;
    const correct = matchItems.find(m => m.keyword === selectedKeyword);
    if (correct && correct.python === pythonItem) {
      setGameAnswers(prev => ({ ...prev, [selectedKeyword]: true }));
    } else {
      setGameAnswers(prev => ({ ...prev, [selectedKeyword]: false }));
      setTimeout(() => setGameAnswers(prev => { const n = { ...prev }; delete n[selectedKeyword]; return n; }), 800);
    }
    setSelectedKeyword(null);
  };

  const gameComplete = matchItems.every(m => gameAnswers[m.keyword] === true);

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> สำรวจคำหลัก 6 ตัว
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">🔑 คำหลัก (Keywords) ของรหัสเทียม</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">คำหลักเป็นคำที่มีหน้าที่ชัดเจนในรหัสเทียม ช่วยให้ทุกคนอ่านแล้วเข้าใจตรงกัน กดที่แต่ละคำเพื่อดูรายละเอียดและตัวอย่าง Python ที่ตรงกัน</p>
      </div>

      {/* Keyword buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {keywords.map((k, i) => (
          <button key={i} onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className={`group relative px-6 py-3 rounded-2xl font-mono font-bold text-sm transition-all duration-300 ${
              activeIdx === i ? `bg-gradient-to-r ${k.color} text-white shadow-xl scale-110 ring-2 ring-offset-2 ring-indigo-300` : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5'
            }`}>
            <span className="mr-2">{k.icon}</span>{k.word}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div className={`rounded-3xl p-8 border-2 ${active.bg} transition-all duration-500 mb-8`}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-2xl font-extrabold ${active.textColor} mb-3 font-mono flex items-center gap-2`}>
                {active.icon} {active.word}
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">{active.desc}</p>
              <div className="bg-white/80 rounded-xl p-4 border border-gray-200/50">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">ตัวอย่าง Pseudocode</span>
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{active.example}</pre>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-emerald-800">แปลงเป็น Python ได้อย่างไร?</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm">
                <div className="text-slate-700 text-xs mb-3 uppercase tracking-wider font-bold">Python Equivalent</div>
                <pre className="text-emerald-400 whitespace-pre-wrap">{active.python}</pre>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">
                <ArrowRight className="w-3 h-3" />
                <span><code className="bg-gray-100 px-1 rounded font-mono">{active.word}</code> ใน Pseudocode → ตรงกับฟังก์ชัน/คำสั่งใน Python ด้านบน</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matching Game */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-bold text-purple-900">🎮 เกม: จับคู่ Keyword กับ Python!</h4>
        </div>
        <p className="text-purple-700 text-sm mb-6">กดเลือก Keyword ทางซ้าย แล้วกดเลือก Python ที่ตรงกันทางขวา</p>

        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
          {/* Keywords */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Pseudocode</div>
            {matchItems.map(m => (
              <button key={m.keyword} onClick={() => setSelectedKeyword(m.keyword)}
                disabled={gameAnswers[m.keyword] === true}
                className={`w-full p-3 rounded-xl font-mono font-bold text-sm transition-all border-2 ${
                  gameAnswers[m.keyword] === true ? 'bg-green-100 border-green-400 text-green-700 opacity-70' :
                  gameAnswers[m.keyword] === false ? 'bg-red-100 border-red-400 text-red-700 animate-shake' :
                  selectedKeyword === m.keyword ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105' :
                  'bg-white border-gray-200 text-gray-700 hover:border-purple-400'
                }`}>
                {m.keyword}
              </button>
            ))}
          </div>

          {/* Python */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Python</div>
            {[...matchItems].sort(() => 0.5 - Math.random()).map(m => (
              <button key={m.python} onClick={() => handleMatch(m.python)}
                disabled={Object.entries(gameAnswers).some(([k, v]) => v === true && matchItems.find(x => x.keyword === k)?.python === m.python)}
                className={`w-full p-3 rounded-xl font-mono text-sm transition-all border-2 ${
                  Object.entries(gameAnswers).some(([k, v]) => v === true && matchItems.find(x => x.keyword === k)?.python === m.python) ? 'bg-green-100 border-green-400 text-green-700 opacity-70' :
                  'bg-white border-gray-200 text-gray-700 hover:border-emerald-400'
                }`}>
                {m.python}
              </button>
            ))}
          </div>
        </div>

        {gameComplete && (
          <div className="mt-6 bg-green-100 rounded-2xl p-4 text-center">
            <span className="text-green-800 font-bold text-lg">🎉 จับคู่ครบทุกคำแล้ว!</span>
          </div>
        )}
      </div>
    </div>
  );
}
