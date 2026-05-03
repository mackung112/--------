import React, { useState, useEffect } from 'react';

const translators = [
  {
    id: 'interpreter', title: 'Interpreter', titleTh: 'ตัวแปลแบบทีละบรรทัด', emoji: '🔄',
    color: 'from-orange-500 to-amber-500', bgLight: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-700',
    description: 'อ่านและแปลซอร์สโค้ดทีละบรรทัด แล้วสั่งให้คอมพิวเตอร์ทำงานทันที',
    pros: ['แก้ไขโค้ดง่าย ทดสอบได้เร็ว', 'เห็นผลทันทีทีละบรรทัด', 'เหมาะกับการเรียนรู้'],
    cons: ['ทำงานช้ากว่า Compiler', 'ต้องมี Interpreter ตลอด', 'แปลใหม่ทุกครั้งที่รัน'],
    languages: ['Python 🐍', 'JavaScript 🟨', 'Ruby 💎', 'PHP 🐘'],
  },
  {
    id: 'compiler', title: 'Compiler', titleTh: 'ตัวแปลแบบทั้งไฟล์', emoji: '⚡',
    color: 'from-blue-500 to-indigo-500', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-700',
    description: 'แปลซอร์สโค้ดทั้งไฟล์ให้เป็นภาษาเครื่องก่อน แล้วค่อยสั่งให้ทำงานทีเดียว',
    pros: ['ทำงานเร็วมากหลังแปลแล้ว', 'ไม่ต้องมี Compiler ตอนรัน', 'เหมาะกับโปรแกรมใหญ่'],
    cons: ['ต้องรอแปลทั้งไฟล์ก่อน', 'แก้โค้ดต้อง Compile ใหม่', 'Error รายงานรวม'],
    languages: ['C/C++ 🔧', 'Java ☕', 'Go 🐹', 'Rust 🦀'],
  },
];

const simCode = [
  { line: 'print("สวัสดี")', result: 'สวัสดี' },
  { line: 'x = 10 + 20', result: 'x → 30' },
  { line: 'print(x)', result: '30' },
  { line: 'print("จบ!")', result: 'จบ!' },
];

export default function TranslatorCompare() {
  const [mode, setMode] = useState('compare');
  const [simType, setSimType] = useState('interpreter');
  const [currentLine, setCurrentLine] = useState(-1);
  const [outputs, setOutputs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [compiled, setCompiled] = useState(false);

  const resetSim = () => { setCurrentLine(-1); setOutputs([]); setIsRunning(false); setCompiled(false); };
  useEffect(() => { resetSim(); }, [simType]);

  const runInterpreter = () => {
    resetSim(); setIsRunning(true);
    simCode.forEach((_, i) => {
      setTimeout(() => {
        setCurrentLine(i);
        setOutputs(prev => [...prev, simCode[i].result]);
        if (i === simCode.length - 1) setIsRunning(false);
      }, (i + 1) * 1200);
    });
  };

  const runCompiler = () => {
    resetSim(); setIsRunning(true);
    simCode.forEach((_, i) => { setTimeout(() => setCurrentLine(i), (i + 1) * 400); });
    setTimeout(() => { setCompiled(true); setCurrentLine(-1); }, simCode.length * 400 + 500);
    setTimeout(() => { setOutputs(simCode.map(c => c.result)); setIsRunning(false); }, simCode.length * 400 + 1200);
  };

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔄 Interpreter vs Compiler</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">เปรียบเทียบ หรือ ลองจำลองการทำงาน</p>
      <div className="flex gap-2 mb-6 justify-center">
        {['compare', 'simulate'].map(m => (
          <button key={m} onClick={() => { setMode(m); resetSim(); }} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${mode === m ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {m === 'compare' ? '📊 เปรียบเทียบ' : '▶️ จำลองการทำงาน'}
          </button>
        ))}
      </div>

      {mode === 'compare' && (
        <div className="grid md:grid-cols-2 gap-4">
          {translators.map(t => (
            <div key={t.id} className={`${t.bgLight} ${t.borderColor} border rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-3"><span className="text-2xl">{t.emoji}</span><div><h4 className={`font-bold ${t.textColor}`}>{t.title}</h4><span className="text-xs text-gray-500">{t.titleTh}</span></div></div>
              <p className="text-sm text-gray-700 mb-3">{t.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div><p className="text-xs font-bold text-green-600 mb-1">✅ ข้อดี</p>{t.pros.map((p, i) => <p key={i} className="text-xs text-gray-600">• {p}</p>)}</div>
                <div><p className="text-xs font-bold text-red-500 mb-1">❌ ข้อเสีย</p>{t.cons.map((c, i) => <p key={i} className="text-xs text-gray-600">• {c}</p>)}</div>
              </div>
              <div className="flex flex-wrap gap-1">{t.languages.map((l, i) => <span key={i} className="px-2 py-1 bg-white rounded-lg text-xs font-bold text-gray-700 border border-gray-200">{l}</span>)}</div>
            </div>
          ))}
        </div>
      )}

      {mode === 'simulate' && (
        <div>
          <div className="flex gap-2 mb-4 justify-center">
            <button onClick={() => setSimType('interpreter')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${simType === 'interpreter' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}>🔄 Interpreter</button>
            <button onClick={() => setSimType('compiler')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${simType === 'compiler' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-gray-100 text-gray-600'}`}>⚡ Compiler</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-2xl p-4">
              <p className="text-xs text-slate-400 font-bold mb-3">📄 ซอร์สโค้ด</p>
              {simCode.map((c, i) => (
                <div key={i} className={`flex items-center gap-2 py-1.5 px-2 rounded-lg mb-1 transition-all duration-300 ${currentLine === i ? 'bg-amber-900/50 border border-amber-500/50' : ''}`}>
                  <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                  <code className="text-green-400 text-sm font-mono">{c.line}</code>
                  {currentLine === i && <span className="text-amber-400 text-xs animate-pulse">◀</span>}
                </div>
              ))}
              {compiled && <p className="text-green-400 text-xs mt-2 font-bold">✅ Compile สำเร็จ!</p>}
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 font-bold mb-3">🖥️ ผลลัพธ์</p>
              <div className="min-h-32">
                {outputs.length === 0 && !isRunning && <p className="text-gray-400 text-sm">กดปุ่ม รัน เพื่อเริ่ม</p>}
                {outputs.map((o, i) => <div key={i} className="py-1 text-sm font-mono text-gray-800"><span className="text-gray-400 mr-2">{'>'}</span>{o}</div>)}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={simType === 'interpreter' ? runInterpreter : runCompiler} disabled={isRunning}
              className={`px-6 py-3 rounded-2xl font-bold text-white transition-all ${isRunning ? 'bg-gray-400 cursor-not-allowed' : `bg-gradient-to-r ${simType === 'interpreter' ? 'from-orange-500 to-amber-500' : 'from-blue-500 to-indigo-500'} hover:shadow-lg hover:-translate-y-1`}`}>
              {isRunning ? '⏳ กำลังทำงาน...' : '▶️ รัน'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
