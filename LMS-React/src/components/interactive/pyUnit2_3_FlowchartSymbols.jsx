import { useState } from 'react';
import { ChevronRight, Sparkles, Eye } from 'lucide-react';

const symbols = [
  {
    id: 'terminal', name: 'เริ่มต้น/สิ้นสุด (Terminal)',
    desc: 'รูปวงรี (Oval/Stadium) ใช้แสดงจุดเริ่มต้นและจุดจบของผังงาน ทุกผังงานต้องมี START และ STOP เสมอ',
    example: 'START / STOP',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <rect x="5" y="5" width="150" height="60" rx="30" ry="30" fill={active ? '#fef2f2' : '#f8fafc'} stroke={active ? '#ef4444' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill={active ? '#dc2626' : '#64748b'}>START</text>
      </svg>
    ),
    color: 'border-rose-400 bg-rose-50'
  },
  {
    id: 'process', name: 'กระบวนการ (Process)',
    desc: 'รูปสี่เหลี่ยมผืนผ้า (Rectangle) ใช้แสดงการประมวลผล คำนวณ หรือกำหนดค่าตัวแปร เช่น การบวกเลข การกำหนดค่าเริ่มต้น',
    example: 'total = price × qty',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <rect x="5" y="5" width="150" height="60" rx="4" ry="4" fill={active ? '#eff6ff' : '#f8fafc'} stroke={active ? '#3b82f6' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill={active ? '#2563eb' : '#64748b'}>total = price × qty</text>
      </svg>
    ),
    color: 'border-blue-400 bg-blue-50'
  },
  {
    id: 'decision', name: 'ตัดสินใจ (Decision)',
    desc: 'รูปสี่เหลี่ยมขนมเปียกปูน (Diamond) ใช้แสดงเงื่อนไขที่ต้องตัดสินใจ ผลลัพธ์จะแยกเป็น 2 ทาง คือ ใช่ (Yes) และ ไม่ใช่ (No)',
    example: 'score >= 50 ?',
    svg: (active) => (
      <svg viewBox="0 0 160 100" className="w-full h-full">
        <polygon points="80,5 155,50 80,95 5,50" fill={active ? '#fffbeb' : '#f8fafc'} stroke={active ? '#f59e0b' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="53" textAnchor="middle" fontSize="11" fontWeight="bold" fill={active ? '#d97706' : '#64748b'}>score ≥ 50?</text>
      </svg>
    ),
    color: 'border-amber-400 bg-amber-50'
  },
  {
    id: 'io', name: 'นำเข้า/แสดงผล (Input/Output)',
    desc: 'รูปสี่เหลี่ยมด้านขนาน (Parallelogram) ใช้แสดงการรับข้อมูลเข้า (เช่น input) หรือการแสดงผลลัพธ์ออก (เช่น print)',
    example: 'READ name / PRINT result',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <polygon points="30,5 155,5 130,65 5,65" fill={active ? '#f0fdf4' : '#f8fafc'} stroke={active ? '#22c55e' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill={active ? '#16a34a' : '#64748b'}>READ name</text>
      </svg>
    ),
    color: 'border-green-400 bg-green-50'
  },
  {
    id: 'predefined', name: 'กระบวนการย่อย (Predefined Process)',
    desc: 'รูปสี่เหลี่ยมผืนผ้ามีขีดข้าง 2 ด้าน ใช้แสดงการเรียกใช้ฟังก์ชัน (Function) หรือกระบวนการย่อยที่ถูกนิยามไว้แล้ว',
    example: 'CALL calculate_tax()',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <rect x="5" y="5" width="150" height="60" rx="2" ry="2" fill={active ? '#faf5ff' : '#f8fafc'} stroke={active ? '#a855f7' : '#94a3b8'} strokeWidth="2.5"/>
        <line x1="20" y1="5" x2="20" y2="65" stroke={active ? '#a855f7' : '#94a3b8'} strokeWidth="2"/>
        <line x1="140" y1="5" x2="140" y2="65" stroke={active ? '#a855f7' : '#94a3b8'} strokeWidth="2"/>
        <text x="80" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={active ? '#9333ea' : '#64748b'}>calculate_tax()</text>
      </svg>
    ),
    color: 'border-purple-400 bg-purple-50'
  },
  {
    id: 'connector', name: 'จุดเชื่อมต่อ (Connector)',
    desc: 'รูปวงกลมขนาดเล็ก ใช้เชื่อมต่อเส้นในผังงานที่มีขนาดใหญ่ มักเขียนตัวอักษร A, B, C กำกับ เพื่อบอกว่าเชื่อมกับจุดใด',
    example: 'A, B, 1, 2',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <circle cx="80" cy="35" r="25" fill={active ? '#fdf4ff' : '#f8fafc'} stroke={active ? '#d946ef' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill={active ? '#c026d3' : '#64748b'}>A</text>
      </svg>
    ),
    color: 'border-fuchsia-400 bg-fuchsia-50'
  },
  {
    id: 'document', name: 'เอกสาร (Document)',
    desc: 'รูปสี่เหลี่ยมขอบล่างเป็นคลื่น ใช้แสดงเอกสารหรือรายงานที่เป็นผลลัพธ์ของโปรแกรม เช่น ใบเสร็จ รายงาน',
    example: 'Report / Invoice',
    svg: (active) => (
      <svg viewBox="0 0 160 80" className="w-full h-full">
        <path d="M 5 5 L 155 5 L 155 55 Q 120 75 80 55 Q 40 35 5 55 Z" fill={active ? '#ecfdf5' : '#f8fafc'} stroke={active ? '#10b981' : '#94a3b8'} strokeWidth="2.5"/>
        <text x="80" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill={active ? '#059669' : '#64748b'}>Report</text>
      </svg>
    ),
    color: 'border-emerald-400 bg-emerald-50'
  },
  {
    id: 'flowline', name: 'เส้นลำดับงาน (Flow Line)',
    desc: 'ลูกศร (Arrow) บอกทิศทางลำดับการทำงาน โดยปกติจะไหลจากบนลงล่าง หรือจากซ้ายไปขวา ต้องมีหัวลูกศรกำกับเสมอ',
    example: '↓ →',
    svg: (active) => (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={active ? '#6366f1' : '#94a3b8'}/></marker></defs>
        <line x1="20" y1="35" x2="140" y2="35" stroke={active ? '#6366f1' : '#94a3b8'} strokeWidth="3" markerEnd="url(#arrowhead)"/>
      </svg>
    ),
    color: 'border-indigo-400 bg-indigo-50'
  },
];

export default function pyUnit2_3_FlowchartSymbols() {
  const [activeId, setActiveId] = useState('terminal');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizQ, setQuizQ] = useState(0);

  const active = symbols.find(s => s.id === activeId);

  const quizzes = [
    { q: 'สัญลักษณ์รูปสี่เหลี่ยมขนมเปียกปูน (◇) ใช้แสดงอะไร?', opts: ['การประมวลผล', 'การรับข้อมูล', 'การตัดสินใจ', 'จุดเริ่มต้น'], ans: 2 },
    { q: 'สัญลักษณ์รูปสี่เหลี่ยมด้านขนาน ใช้แสดงอะไร?', opts: ['การคำนวณ', 'การรับ/แสดงผลข้อมูล', 'การตัดสินใจ', 'จุดเชื่อมต่อ'], ans: 1 },
    { q: 'สัญลักษณ์รูปวงรีใช้แสดงอะไร?', opts: ['การประมวลผล', 'การนำเข้าข้อมูล', 'จุดเชื่อมต่อ', 'จุดเริ่มต้นและจุดสิ้นสุด'], ans: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 pt-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-[120px]"></div>
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="w-full my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> สำรวจสัญลักษณ์แบบ Interactive
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">📐 สัญลักษณ์มาตรฐานของผังงาน (ISO 5807)</h3>
        <p className="text-gray-700 max-w-xl mx-auto">กดที่สัญลักษณ์แต่ละตัวเพื่อดูรูปร่าง คำอธิบาย และตัวอย่างการใช้งาน</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
        {/* Symbol Grid */}
        <div className="grid grid-cols-2 gap-3">
          {symbols.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`rounded-2xl p-4 border-2 text-center transition-all duration-300 hover:shadow-md ${
                activeId === s.id ? s.color + ' scale-105 shadow-lg ring-2 ring-offset-2 ring-indigo-300' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-full h-14 mb-2">{s.svg(activeId === s.id)}</div>
              <div className="text-xs font-bold text-gray-700 leading-tight">{s.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        {active && (
          <div className={`rounded-3xl p-8 border-2 ${active.color} transition-all duration-500 flex flex-col`}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-32 h-20 shrink-0">{active.svg(true)}</div>
              <div>
                <h4 className="text-xl font-extrabold text-gray-900 mb-1">{active.name}</h4>
                <p className="text-gray-700 leading-relaxed">{active.desc}</p>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-5 border border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700">ตัวอย่างการใช้งาน</span>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400">
                {active.example}
              </div>
            </div>

            <div className="mt-4 bg-white/70 rounded-2xl p-5 border border-gray-200/50">
              <span className="text-sm font-bold text-gray-700 mb-2 block">💡 เคล็ดลับ</span>
              <p className="text-sm text-gray-600">
                {active.id === 'terminal' && 'ทุกผังงานต้องมี START อยู่บนสุด และ STOP อยู่ล่างสุดเสมอ ห้ามมีมากกว่าอย่างละ 1 ตัว'}
                {active.id === 'process' && 'เขียนคำสั่งสั้นๆ เช่น "total = a + b" ห้ามเขียนยาวเกิน 1 บรรทัดในกล่องเดียว'}
                {active.id === 'decision' && 'ต้องมีทางออก 2 ทางเสมอ: Yes (ใช่) และ No (ไม่ใช่) เขียนกำกับไว้ที่เส้น'}
                {active.id === 'io' && 'ใช้ READ สำหรับรับข้อมูล และ PRINT สำหรับแสดงผล ตรงกับ input() และ print() ใน Python'}
                {active.id === 'predefined' && 'ใช้เมื่อมีกระบวนการที่ซับซ้อน ที่แยกเป็นผังงานย่อยต่างหาก เช่น ฟังก์ชันคำนวณภาษี'}
                {active.id === 'connector' && 'ใช้เมื่อผังงานใหญ่เกินกว่าจะวาดในหน้าเดียว เขียนตัวอักษรเดียวกันที่จุดเชื่อม'}
                {active.id === 'document' && 'ใช้เมื่อผลลัพธ์เป็นเอกสาร เช่น ใบเสร็จ รายงาน แตกต่างจาก I/O ที่แสดงผลหน้าจอ'}
                {active.id === 'flowline' && 'เส้นต้องมีหัวลูกศรเสมอ ปกติไหลจากบนลงล่าง ถ้าต้องวนกลับ ให้ลากจากขวาขึ้นบน'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mini Quiz */}
      <div className="mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h4 className="text-lg font-bold text-indigo-900">🎯 ทดสอบความเข้าใจ</h4>
        </div>
        <p className="text-indigo-800 font-medium mb-4">{quizzes[quizQ].q}</p>
        <div className="grid grid-cols-2 gap-3">
          {quizzes[quizQ].opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => setQuizAnswer(i)}
              disabled={quizAnswer !== null}
              className={`p-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                quizAnswer === null ? 'bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50' :
                i === quizzes[quizQ].ans ? 'bg-green-100 border-green-500 text-green-800' :
                i === quizAnswer ? 'bg-red-100 border-red-500 text-red-800' :
                'bg-white border-gray-200 opacity-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {quizAnswer !== null && (
          <div className="mt-4 flex items-center gap-3">
            <span className={`text-sm font-bold ${quizAnswer === quizzes[quizQ].ans ? 'text-green-700' : 'text-red-700'}`}>
              {quizAnswer === quizzes[quizQ].ans ? '✅ ถูกต้อง!' : `❌ คำตอบคือ: ${quizzes[quizQ].opts[quizzes[quizQ].ans]}`}
            </span>
            {quizQ < quizzes.length - 1 && (
              <button onClick={() => { setQuizQ(q => q + 1); setQuizAnswer(null); }} className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
                ข้อถัดไป <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
      </main>
    </div>
  );
}
