import React, { useState } from 'react';

const softwareTypes = [
  {
    id: 'system',
    title: 'ซอฟต์แวร์ระบบ',
    subtitle: 'System Software',
    emoji: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description: 'ซอฟต์แวร์ที่ทำหน้าที่ควบคุมและจัดการทรัพยากรฮาร์ดแวร์ของคอมพิวเตอร์ เป็นตัวกลางระหว่างผู้ใช้กับเครื่อง',
    examples: [
      { name: 'Windows 11', icon: '🪟', desc: 'ระบบปฏิบัติการสำหรับ PC' },
      { name: 'macOS', icon: '🍎', desc: 'ระบบปฏิบัติการของ Apple' },
      { name: 'Linux', icon: '🐧', desc: 'ระบบปฏิบัติการ Open Source' },
      { name: 'Android', icon: '🤖', desc: 'ระบบปฏิบัติการมือถือ' },
    ],
    analogy: 'เปรียบเสมือน "ผู้จัดการอาคาร" ที่ดูแลระบบไฟ, น้ำ, ลิฟต์ ให้ทุกอย่างทำงานได้',
  },
  {
    id: 'application',
    title: 'ซอฟต์แวร์ประยุกต์',
    subtitle: 'Application Software',
    emoji: '📱',
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    description: 'ซอฟต์แวร์ที่ถูกพัฒนาขึ้นเพื่อตอบโจทย์งานเฉพาะด้าน สร้างขึ้นตามความต้องการของผู้ใช้',
    examples: [
      { name: 'โปรแกรมบัญชี', icon: '📊', desc: 'จัดการรายรับ-รายจ่าย' },
      { name: 'เกม', icon: '🎮', desc: 'ความบันเทิง' },
      { name: 'แอปธนาคาร', icon: '🏦', desc: 'ธุรกรรมการเงิน' },
      { name: 'ระบบ POS', icon: '🛒', desc: 'ขายสินค้าหน้าร้าน' },
    ],
    analogy: 'เปรียบเสมือน "ร้านค้าต่างๆ ในห้าง" แต่ละร้านให้บริการคนละอย่าง',
  },
  {
    id: 'package',
    title: 'ซอฟต์แวร์สำเร็จรูป',
    subtitle: 'Package Software',
    emoji: '📦',
    color: 'from-green-500 to-emerald-500',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    description: 'ซอฟต์แวร์ที่ผลิตออกมาเป็นสำเร็จรูป ใช้ได้ทันทีโดยไม่ต้องเขียนโค้ดเพิ่ม เหมาะสำหรับงานทั่วไป',
    examples: [
      { name: 'Microsoft Word', icon: '📝', desc: 'พิมพ์เอกสาร' },
      { name: 'Excel', icon: '📈', desc: 'ตารางคำนวณ' },
      { name: 'Photoshop', icon: '🎨', desc: 'แต่งภาพ' },
      { name: 'Chrome', icon: '🌐', desc: 'ท่องเว็บ' },
    ],
    analogy: 'เปรียบเสมือน "อาหารแช่แข็ง" พร้อมใช้ ไม่ต้องปรุงเอง',
  },
];

export default function ProgramMeaning() {
  const [activeType, setActiveType] = useState('system');
  const [showAnalogy, setShowAnalogy] = useState(false);

  const active = softwareTypes.find(t => t.id === activeType);

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🖥️ สำรวจประเภทของซอฟต์แวร์</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">กดเลือกแต่ละประเภทเพื่อดูตัวอย่างและคำอธิบาย</p>

      {/* Selector Tabs */}
      <div className="flex gap-3 mb-8 justify-center flex-wrap">
        {softwareTypes.map(type => (
          <button
            key={type.id}
            onClick={() => { setActiveType(type.id); setShowAnalogy(false); }}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              activeType === type.id
                ? `bg-gradient-to-r ${type.color} text-white shadow-lg scale-105`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{type.emoji}</span>{type.title}
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      {active && (
        <div className={`${active.bgLight} ${active.borderColor} border rounded-2xl p-6 transition-all duration-500`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{active.emoji}</span>
            <div>
              <h4 className={`text-lg font-bold ${active.textColor}`}>{active.title}</h4>
              <span className="text-xs text-gray-500">{active.subtitle}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">{active.description}</p>

          {/* Examples Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {active.examples.map((ex, i) => (
              <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-1">{ex.icon}</span>
                <p className="font-bold text-sm text-gray-800">{ex.name}</p>
                <p className="text-xs text-gray-500">{ex.desc}</p>
              </div>
            ))}
          </div>

          {/* Analogy Toggle */}
          <button
            onClick={() => setShowAnalogy(!showAnalogy)}
            className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${
              showAnalogy
                ? `bg-gradient-to-r ${active.color} text-white`
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {showAnalogy ? '🔽 ซ่อนอุปมา' : '💡 ดูอุปมาเปรียบเทียบ'}
          </button>
          {showAnalogy && (
            <div className="mt-3 bg-white rounded-xl p-4 border border-gray-100 text-gray-700 text-sm leading-relaxed">
              🏠 {active.analogy}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
