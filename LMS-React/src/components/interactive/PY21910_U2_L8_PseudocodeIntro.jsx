import { useState } from 'react';
import { ArrowRight, Sparkles, Code2, FileText, Lightbulb } from 'lucide-react';

const examples = [
  {
    title: '🤝 ทักทายผู้ใช้',
    pseudo: ['START', 'READ name', 'PRINT "Hello, " + name', 'STOP'],
    python: ['# เริ่มต้น', 'name = input("ชื่อ: ")', 'print("Hello, " + name)', '# จบ'],
    desc: 'โปรแกรมพื้นฐานที่สุด — รับชื่อแล้วทักทาย',
  },
  {
    title: '💰 คำนวณราคา',
    pseudo: ['START', 'READ price', 'READ qty', 'COMPUTE total = price × qty', 'PRINT "ราคารวม = " + total', 'STOP'],
    python: ['# เริ่มต้น', 'price = float(input("ราคา: "))', 'qty = int(input("จำนวน: "))', 'total = price * qty', 'print(f"ราคารวม = {total}")', '# จบ'],
    desc: 'รับราคาและจำนวน แล้วคำนวณราคารวม',
  },
  {
    title: '📐 พื้นที่วงกลม',
    pseudo: ['START', 'READ radius', 'COMPUTE area = 3.14 × radius × radius', 'PRINT "พื้นที่ = " + area', 'STOP'],
    python: ['# เริ่มต้น', 'radius = float(input("รัศมี: "))', 'area = 3.14 * radius * radius', 'print(f"พื้นที่ = {area}")', '# จบ'],
    desc: 'คำนวณพื้นที่วงกลมจากรัศมีที่ผู้ใช้ป้อน',
  },
];

const highlights = {
  START: 'text-rose-600 font-bold', STOP: 'text-rose-600 font-bold',
  READ: 'text-green-600 font-bold', PRINT: 'text-amber-600 font-bold',
  COMPUTE: 'text-blue-600 font-bold',
};

function HighlightPseudo({ line }) {
  const words = line.split(' ');
  return (
    <span>
      {words.map((w, i) => (
        <span key={i} className={highlights[w] || ''}>
          {w}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function PY21910_U2_L8_PseudocodeIntro() {
  const [activeExample, setActiveExample] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);
  const ex = examples[activeExample];
  const maxLines = ex.python.length;
  const allRevealed = revealedLines >= maxLines;

  const revealNext = () => { if (revealedLines < maxLines) setRevealedLines(r => r + 1); };
  const revealAll = () => setRevealedLines(maxLines);
  const resetReveal = () => setRevealedLines(0);

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> เปรียบเทียบ Pseudocode กับ Python
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">📝 รหัสเทียม (Pseudocode) คืออะไร?</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">รหัสเทียมคือการเขียนขั้นตอนวิธี (Algorithm) ด้วยภาษาที่คล้ายโค้ด แต่ไม่ผูกกับภาษาใดภาษาหนึ่ง ทำให้ทุกคนอ่านเข้าใจตรงกัน ก่อนจะนำไปแปลงเป็นโค้ดจริง</p>
      </div>

      {/* What is Pseudocode */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-indigo-900">Pseudocode (รหัสเทียม)</h4>
          </div>
          <ul className="space-y-2 text-sm text-indigo-700">
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span> เขียนด้วยภาษากึ่งธรรมชาติ (คล้ายภาษาอังกฤษ)</li>
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span> ไม่ต้องคำนึงถึง Syntax ที่เข้มงวด</li>
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span> ใช้คำหลัก เช่น START, READ, COMPUTE, PRINT, STOP</li>
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span> เหมาะสำหรับวางแผนก่อนเขียนโค้ดจริง</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-emerald-900">Python Code (โค้ดจริง)</h4>
          </div>
          <ul className="space-y-2 text-sm text-emerald-700">
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span> เขียนตาม Syntax ของ Python อย่างเคร่งครัด</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span> สามารถรันได้จริงบนคอมพิวเตอร์</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span> ใช้ฟังก์ชัน เช่น input(), print(), int()</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span> ต้องเว้นวรรค (Indentation) ให้ถูกต้อง</li>
          </ul>
        </div>
      </div>

      {/* Example selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {examples.map((e, i) => (
          <button key={i} onClick={() => { setActiveExample(i); resetReveal(); }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeExample === i ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {e.title}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mb-6">{ex.desc}</p>

      {/* Side by side comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Pseudocode */}
        <div className="rounded-2xl border border-indigo-200 overflow-hidden">
          <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-5 py-3 border-b border-indigo-200 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Pseudocode (รหัสเทียม)
          </div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-1">
            {ex.pseudo.map((line, idx) => (
              <div key={idx} className={`px-3 py-1.5 rounded-lg transition-all duration-500 ${idx < revealedLines ? 'bg-indigo-900/40 text-indigo-200' : 'text-indigo-300/70'}`}>
                <span className="text-indigo-500/50 mr-3 select-none text-xs">{idx + 1}</span>
                <HighlightPseudo line={line} />
              </div>
            ))}
          </div>
        </div>

        {/* Python */}
        <div className="rounded-2xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-5 py-3 border-b border-emerald-200 flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Python Code
          </div>
          <div className="bg-slate-900 p-5 font-mono text-sm space-y-1">
            {ex.python.map((line, idx) => (
              <div key={idx} className={`px-3 py-1.5 rounded-lg transition-all duration-700 ${idx < revealedLines ? 'text-emerald-300 bg-emerald-900/30' : 'text-transparent select-none bg-slate-800/30'}`}>
                <span className={`mr-3 select-none text-xs ${idx < revealedLines ? 'text-emerald-500/50' : 'text-transparent'}`}>{idx + 1}</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={revealNext} disabled={allRevealed}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-all shadow-md">
          <ArrowRight className="w-5 h-5" /> เปิดเผยทีละบรรทัด ({revealedLines}/{maxLines})
        </button>
        <button onClick={revealAll} disabled={allRevealed}
          className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50">
          เปิดทั้งหมด
        </button>
        <button onClick={resetReveal} className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 border border-gray-200 transition-colors">
          🔄 รีเซ็ต
        </button>
      </div>

      {allRevealed && (
        <div className="mt-6 bg-green-50 rounded-2xl p-5 border border-green-200 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-green-600 shrink-0" />
          <p className="text-sm text-green-700">
            <strong>สังเกต:</strong> Pseudocode ใช้คำกว้างๆ เช่น <code className="bg-green-100 px-1 rounded">READ</code> → Python ใช้ <code className="bg-green-100 px-1 rounded">input()</code>, <code className="bg-green-100 px-1 rounded">PRINT</code> → Python ใช้ <code className="bg-green-100 px-1 rounded">print()</code>
          </p>
        </div>
      )}
    </div>
  );
}
