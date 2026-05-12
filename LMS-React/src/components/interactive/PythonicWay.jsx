import { useState } from 'react';

const examples = [
  {
    id: 'swap',
    title: 'สลับค่าตัวแปร (Swap Variables)',
    bad: `temp = a\na = b\nb = temp`,
    good: `a, b = b, a`,
    desc: 'Python สามารถสลับค่าตัวแปรได้ในบรรทัดเดียว ไม่ต้องใช้ตัวแปรชั่วคราว (temp) มาช่วย'
  },
  {
    id: 'loop',
    title: 'วนลูปพร้อม Index',
    bad: `i = 0\nwhile i < len(items):\n    print(i, items[i])\n    i += 1`,
    good: `for i, item in enumerate(items):\n    print(i, item)`,
    desc: 'ใช้ enumerate() เพื่อดึงทั้งเลขตำแหน่ง (index) และข้อมูลออกมาพร้อมกัน สะอาดและลดโอกาสเกิดบั๊ก (Off-by-one error)'
  },
  {
    id: 'list',
    title: 'สร้าง List ใหม่จากเงื่อนไข',
    bad: `evens = []\nfor x in range(10):\n    if x % 2 == 0:\n        evens.append(x)`,
    good: `evens = [x for x in range(10) if x % 2 == 0]`,
    desc: 'List Comprehension คือท่าไม้ตายของ Python ช่วยย่อโค้ดวนลูปสร้าง List ให้เหลือบรรทัดเดียวและทำงานเร็วกว่า'
  },
  {
    id: 'file',
    title: 'การเปิดอ่านไฟล์',
    bad: `f = open('data.txt')\ndata = f.read()\nf.close()`,
    good: `with open('data.txt') as f:\n    data = f.read()`,
    desc: 'การใช้ with block จะจัดการปิดไฟล์ (close) ให้เราอัตโนมัติ แม้ว่าโปรแกรมจะเกิด Error ระหว่างอ่านไฟล์ก็ตาม'
  }
];

export default function PythonicWay() {
  const [activeId, setActiveId] = useState('swap');
  
  const activeEx = examples.find(ex => ex.id === activeId);

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">✨ วิถีแห่ง Python (The Pythonic Way)</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">การเขียนโค้ดที่ "ถูกต้องตามไวยากรณ์" กับ "เขียนแบบมือโปร" ต่างกันอย่างไร?</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {examples.map(ex => (
          <button
            key={ex.id}
            onClick={() => setActiveId(ex.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeId === ex.id 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <p className="text-gray-700 text-sm mb-6 text-center bg-teal-50 text-teal-800 py-3 rounded-xl">
          💡 {activeEx.desc}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Bad Code */}
          <div className="rounded-2xl overflow-hidden border border-red-200">
            <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-2 border-b border-red-200 flex items-center justify-between">
              <span>❌ เขียนแบบภาษาอื่น (C/Java style)</span>
              <span>เยิ่นเย้อ</span>
            </div>
            <div className="bg-slate-900 p-4">
              <pre className="text-red-300 font-mono text-sm leading-relaxed overflow-x-auto">
                <code>{activeEx.bad}</code>
              </pre>
            </div>
          </div>

          {/* Good Code */}
          <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)] relative">
            <div className="absolute top-2 right-2 text-2xl animate-pulse">✨</div>
            <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 border-b border-emerald-200 flex items-center justify-between">
              <span>✅ เขียนแบบ Pythonic Way</span>
              <span>สะอาด ชัดเจน</span>
            </div>
            <div className="bg-slate-900 p-4 h-full">
              <pre className="text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto">
                <code>{activeEx.good}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
