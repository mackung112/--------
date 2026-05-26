import { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, Eye, ChevronRight } from 'lucide-react';

const rules = [
  {
    title: 'จุด START/STOP ต้องมีอย่างละ 1 จุด',
    good: 'ทุกผังงานต้องเริ่มจาก START เพียงจุดเดียว และจบที่ STOP เพียงจุดเดียว เพื่อให้ทิศทางชัดเจน',
    bad: 'มี START 2 จุด หรือไม่มี STOP ทำให้ไม่รู้ว่าโปรแกรมเริ่ม/จบตรงไหน',
    goodSvg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="60" y="10" width="80" height="34" rx="17" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/><text x="100" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16a34a">START</text>
        <line x1="100" y1="44" x2="100" y2="64" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#bp-arr)"/>
        <rect x="50" y="66" width="100" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/><text x="100" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb">Process</text>
        <line x1="100" y1="100" x2="100" y2="120" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#bp-arr)"/>
        <rect x="50" y="122" width="100" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/><text x="100" y="144" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb">Process</text>
        <line x1="100" y1="156" x2="100" y2="170" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#bp-arr)"/>
        <rect x="60" y="172" width="80" height="34" rx="17" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/><text x="100" y="194" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16a34a">STOP</text>
        <defs><marker id="bp-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker></defs>
      </svg>
    ),
    badSvg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="20" y="10" width="70" height="30" rx="15" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="55" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">START</text>
        <rect x="110" y="10" width="70" height="30" rx="15" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="145" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">START</text>
        <text x="100" y="58" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">❌ START 2 จุด!</text>
        <rect x="50" y="68" width="100" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2"/><text x="100" y="88" textAnchor="middle" fontSize="10" fill="#64748b">Process</text>
        <text x="100" y="130" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">❌ ไม่มี STOP!</text>
      </svg>
    ),
  },
  {
    title: 'ใช้สัญลักษณ์ถูกต้องตามมาตรฐาน',
    good: 'ใช้สี่เหลี่ยมผืนผ้าสำหรับ Process, เพชรสำหรับ Decision, ด้านขนานสำหรับ I/O ตามมาตรฐาน ISO 5807',
    bad: 'ใช้สัญลักษณ์ผิดประเภท เช่น ใช้สี่เหลี่ยมผืนผ้าแทนเพชรสำหรับเงื่อนไข',
    goodSvg: (
      <svg viewBox="0 0 200 180" className="w-full h-full">
        <polygon points="60,10 140,10 125,50 45,50" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="95" y="35" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#16a34a">READ (I/O)</text>
        <polygon points="100,60 155,95 100,130 45,95" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2"/><text x="100" y="99" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706">Decision</text>
        <rect x="50" y="140" width="100" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/><text x="100" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb">Process</text>
      </svg>
    ),
    badSvg: (
      <svg viewBox="0 0 200 180" className="w-full h-full">
        <rect x="50" y="10" width="100" height="34" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="100" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">READ?</text>
        <rect x="50" y="60" width="100" height="34" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="100" y="82" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">Decision?</text>
        <text x="100" y="120" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">❌ ใช้แต่สี่เหลี่ยมทั้งหมด!</text>
        <text x="100" y="140" textAnchor="middle" fontSize="9" fill="#ef4444">ไม่สามารถแยกประเภทได้</text>
      </svg>
    ),
  },
  {
    title: 'เส้นลำดับงานต้องมีหัวลูกศรและไม่ตัดกัน',
    good: 'เส้นไหลจากบนลงล่าง มีหัวลูกศรทุกเส้น ไม่มีเส้นตัดกัน วางสัญลักษณ์ให้เป็นระเบียบ',
    bad: 'เส้นไม่มีหัวลูกศร ตัดกันไปมา ทำให้สับสนว่าทำงานอะไรก่อนหลัง',
    goodSvg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs><marker id="bp-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#22c55e"/></marker></defs>
        <rect x="60" y="10" width="80" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="100" y="30" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">A</text>
        <line x1="100" y1="40" x2="100" y2="60" stroke="#22c55e" strokeWidth="2" markerEnd="url(#bp-g)"/>
        <rect x="60" y="62" width="80" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="100" y="82" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">B</text>
        <line x1="100" y1="92" x2="100" y2="112" stroke="#22c55e" strokeWidth="2" markerEnd="url(#bp-g)"/>
        <rect x="60" y="114" width="80" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="100" y="134" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">C</text>
      </svg>
    ),
    badSvg: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <rect x="20" y="10" width="70" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="55" y="30" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">A</text>
        <rect x="110" y="60" width="70" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="145" y="80" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">B</text>
        <rect x="30" y="110" width="70" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="65" y="130" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">C</text>
        <line x1="55" y1="40" x2="145" y2="60" stroke="#ef4444" strokeWidth="2"/>
        <line x1="145" y1="90" x2="65" y2="110" stroke="#ef4444" strokeWidth="2"/>
        <line x1="55" y1="40" x2="65" y2="110" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
        <text x="100" y="155" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">❌ เส้นตัดกัน ไม่มีลูกศร!</text>
      </svg>
    ),
  },
  {
    title: 'ข้อความสั้น กระชับ เข้าใจง่าย',
    good: 'เขียนสั้นๆ ในสัญลักษณ์ เช่น "total = a + b" หรือ "READ name" ไม่เกิน 1 บรรทัด',
    bad: 'เขียนยาวมากจนล้นสัญลักษณ์ เช่น "คำนวณราคาทั้งหมดโดยเอาราคาหน่วยคูณจำนวนแล้วบวกภาษีอีก 7%"',
    goodSvg: (
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <rect x="30" y="10" width="140" height="36" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="100" y="33" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">total = a + b</text>
        <rect x="30" y="56" width="140" height="36" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/><text x="100" y="79" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">PRINT total</text>
      </svg>
    ),
    badSvg: (
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <rect x="10" y="10" width="180" height="80" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
        <text x="100" y="35" textAnchor="middle" fontSize="7" fill="#dc2626">คำนวณราคาทั้งหมดโดยเอา</text>
        <text x="100" y="50" textAnchor="middle" fontSize="7" fill="#dc2626">ราคาหน่วยคูณจำนวนแล้ว</text>
        <text x="100" y="65" textAnchor="middle" fontSize="7" fill="#dc2626">บวกภาษีอีก 7% แล้วปัดเศษ</text>
        <text x="100" y="80" textAnchor="middle" fontSize="7" fill="#dc2626">ให้เหลือทศนิยม 2 ตำแหน่ง</text>
      </svg>
    ),
  },
];

const spotTheError = [
  {
    q: 'ผังงานนี้ผิดตรงไหน?',
    svg: (
      <svg viewBox="0 0 200 180" className="w-full h-full">
        <defs><marker id="spot-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/></marker></defs>
        <rect x="60" y="5" width="80" height="30" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/><text x="100" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">START</text>
        <line x1="100" y1="35" x2="100" y2="50" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#spot-arr)"/>
        <rect x="40" y="52" width="120" height="30" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/><text x="100" y="72" textAnchor="middle" fontSize="10" fill="#64748b">READ score</text>
        <line x1="100" y1="82" x2="100" y2="97" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#spot-arr)"/>
        <rect x="50" y="99" width="100" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/><text x="100" y="119" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d97706">score ≥ 50?</text>
        <line x1="100" y1="129" x2="100" y2="155" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#spot-arr)"/>
        <rect x="60" y="155" width="80" height="30" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/><text x="100" y="175" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">STOP</text>
      </svg>
    ),
    opts: ['ไม่มี START', 'ใช้สี่เหลี่ยมแทนเพชรสำหรับ Decision', 'เส้นตัดกัน', 'ข้อความยาวเกินไป'],
    ans: 1,
    explain: 'เงื่อนไข "score ≥ 50?" ควรใช้สัญลักษณ์เพชร (Diamond) ไม่ใช่สี่เหลี่ยมผืนผ้า'
  }
];

export default function pyUnit2_7_FlowchartBestPractice() {
  const [activeRule, setActiveRule] = useState(0);
  const [view, setView] = useState('good');
  const [spotAnswer, setSpotAnswer] = useState(null);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 pt-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-[120px]"></div>
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> เปรียบเทียบผังงานที่ถูก vs ผิด
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">📋 คุณลักษณะของผังงานที่ดี</h3>
        <p className="text-gray-700 max-w-xl mx-auto">เรียนรู้หลักการสำคัญ 4 ข้อ พร้อมเปรียบเทียบตัวอย่างที่ถูกต้องกับตัวอย่างที่ผิดพลาด</p>
      </div>

      {/* Rule Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {rules.map((r, i) => (
          <button key={i} onClick={() => { setActiveRule(i); setView('good'); }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeRule === i ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {i + 1}. {r.title.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{rules[activeRule].title}</h4>

          {/* Toggle */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setView('good')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${view === 'good' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <CheckCircle2 className="w-4 h-4" /> ตัวอย่างที่ถูกต้อง
            </button>
            <button onClick={() => setView('bad')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${view === 'bad' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <XCircle className="w-4 h-4" /> ตัวอย่างที่ผิดพลาด
            </button>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
            {/* SVG */}
            <div className={`rounded-2xl p-6 border-2 ${view === 'good' ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
              <div className="w-full h-48">
                {view === 'good' ? rules[activeRule].goodSvg : rules[activeRule].badSvg}
              </div>
            </div>

            {/* Explanation */}
            <div className={`rounded-2xl p-6 border ${view === 'good' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                {view === 'good' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                <span className={`font-bold ${view === 'good' ? 'text-green-800' : 'text-red-800'}`}>
                  {view === 'good' ? 'ทำไมถึงถูกต้อง?' : 'ผิดตรงไหน?'}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${view === 'good' ? 'text-green-700' : 'text-red-700'}`}>
                {view === 'good' ? rules[activeRule].good : rules[activeRule].bad}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spot the Error Game */}
      <div className="mt-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-amber-600" />
          <h4 className="text-lg font-bold text-amber-900">🎯 เกม: จับผิดผังงาน!</h4>
        </div>
        <p className="text-amber-800 mb-4">{spotTheError[0].q}</p>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6">
          <div className="bg-white rounded-2xl p-4 border border-amber-200 h-48">
            {spotTheError[0].svg}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2">
              {spotTheError[0].opts.map((opt, i) => (
                <button key={i} onClick={() => setSpotAnswer(i)} disabled={spotAnswer !== null}
                  className={`p-3 rounded-xl text-sm font-semibold text-left transition-all border-2 ${
                    spotAnswer === null ? 'bg-white border-gray-200 hover:border-amber-400' :
                    i === spotTheError[0].ans ? 'bg-green-100 border-green-500 text-green-800' :
                    i === spotAnswer ? 'bg-red-100 border-red-500 text-red-800' :
                    'bg-white border-gray-200 opacity-50'
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
            {spotAnswer !== null && (
              <div className={`mt-4 p-4 rounded-xl text-sm ${spotAnswer === spotTheError[0].ans ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {spotAnswer === spotTheError[0].ans ? '✅ ถูกต้อง! ' : '❌ ผิด! '}
                {spotTheError[0].explain}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  );
}
