import { useState } from 'react';

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
      { name: 'Windows 11', icon: '🪟', desc: 'ระบบปฏิบัติการสำหรับ PC', details: 'Windows 11 เป็นระบบปฏิบัติการล่าสุดจากไมโครซอฟท์ ออกแบบมาเพื่อเพิ่มประสิทธิภาพการทำงานและรองรับการเล่นเกม มีฟีเจอร์เด่นอย่าง Snap Layouts และรองรับแอป Android' },
      { name: 'macOS', icon: '🍎', desc: 'ระบบปฏิบัติการของ Apple', details: 'macOS เป็นระบบปฏิบัติการที่พัฒนาโดย Apple สำหรับเครื่อง Mac มีความเสถียรสูง ปลอดภัย และออกแบบมาให้ทำงานร่วมกับอุปกรณ์ Apple อื่นๆ ได้อย่างไร้รอยต่อ' },
      { name: 'Linux', icon: '🐧', desc: 'ระบบปฏิบัติการ Open Source', details: 'Linux เป็นระบบปฏิบัติการแบบ Open Source ที่เปิดให้ทุกคนใช้งานและดัดแปลงได้ฟรี นิยมใช้มากในระดับเซิร์ฟเวอร์ (Server) และกลุ่มนักพัฒนาซอฟต์แวร์' },
      { name: 'Android', icon: '🤖', desc: 'ระบบปฏิบัติการมือถือ', details: 'Android เป็นระบบปฏิบัติการสำหรับอุปกรณ์พกพาที่พัฒนาโดย Google เป็นที่นิยมมากที่สุดในโลก มีความยืดหยุ่นสูงและมีแอปพลิเคชันให้เลือกใช้งานมากมาย' },
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
      { name: 'โปรแกรมบัญชี', icon: '📊', desc: 'จัดการรายรับ-รายจ่าย', details: 'โปรแกรมที่ช่วยบันทึกและคำนวณข้อมูลทางการเงิน ช่วยให้ออกรายงานงบการเงินได้ง่ายและแม่นยำ ลดความผิดพลาดจากการคิดเลขด้วยมือ' },
      { name: 'เกม', icon: '🎮', desc: 'ความบันเทิง', details: 'ซอฟต์แวร์ที่สร้างขึ้นเพื่อความบันเทิงและการแข่งขัน มีตั้งแต่เกมไขปริศนาง่ายๆ ไปจนถึงเกม 3D ที่มีความสมจริงสูง' },
      { name: 'แอปธนาคาร', icon: '🏦', desc: 'ธุรกรรมการเงิน', details: 'แอปพลิเคชันของธนาคารที่ช่วยให้ผู้ใช้สามารถโอนเงิน ชำระบิล หรือตรวจสอบยอดเงินได้ตลอด 24 ชั่วโมงผ่านโทรศัพท์มือถือ' },
      { name: 'ระบบ POS', icon: '🛒', desc: 'ขายสินค้าหน้าร้าน', details: 'Point of Sale (POS) คือระบบจัดการหน้าร้านที่ช่วยคิดเงิน ตัดสต๊อกสินค้า และออกใบเสร็จรับเงินให้ลูกค้าโดยอัตโนมัติ' },
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
      { name: 'Microsoft Word', icon: '📝', desc: 'พิมพ์เอกสาร', details: 'โปรแกรมประมวลผลคำยอดฮิต มีเครื่องมือจัดหน้ากระดาษ ใส่รูปภาพ และสร้างตาราง เหมาะสำหรับการทำรายงานหรือจดหมาย' },
      { name: 'Excel', icon: '📈', desc: 'ตารางคำนวณ', details: 'โปรแกรมกระดานคำนวณที่โดดเด่นเรื่องการใช้สูตร (Formula) และฟังก์ชันจัดการตัวเลข สามารถสร้างกราฟและวิเคราะห์ข้อมูลจำนวนมากได้' },
      { name: 'Photoshop', icon: '🎨', desc: 'แต่งภาพ', details: 'ซอฟต์แวร์ตกแต่งภาพถ่ายระดับมืออาชีพ ใช้สำหรับรีทัชภาพ ตัดต่อ หรือสร้างงานกราฟิกดิจิทัลขั้นสูง' },
      { name: 'Chrome', icon: '🌐', desc: 'ท่องเว็บ', details: 'เว็บเบราว์เซอร์จาก Google ที่มีความรวดเร็วและใช้งานง่าย รองรับส่วนขยาย (Extensions) ที่ช่วยเพิ่มความสามารถในการท่องเว็บ' },
    ],
    analogy: 'เปรียบเสมือน "อาหารแช่แข็ง" พร้อมใช้ ไม่ต้องปรุงเอง',
  },
];

const getSelectedStyle = (typeId) => {
  if (typeId === 'system') return 'border-blue-500 bg-blue-100 ring-2 ring-blue-300';
  if (typeId === 'application') return 'border-purple-500 bg-purple-100 ring-2 ring-purple-300';
  if (typeId === 'package') return 'border-green-500 bg-green-100 ring-2 ring-green-300';
  return 'border-gray-500 bg-gray-50 ring-2 ring-gray-300';
};

export default function PY21910_U1_L1_ProgramMeaning() {
  const [activeType, setActiveType] = useState('system');
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);

  const active = softwareTypes.find(t => t.id === activeType);

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🖥️ สำรวจประเภทของซอฟต์แวร์</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">กดเลือกแต่ละประเภทและคลิกที่ตัวอย่างเพื่อดูคำอธิบายเชิงลึก</p>

      {/* Selector Tabs */}
      <div className="flex gap-3 mb-8 justify-center flex-wrap">
        {softwareTypes.map(type => (
          <button
            key={type.id}
            onClick={() => { setActiveType(type.id); setShowAnalogy(false); setSelectedExample(null); }}
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
            {active.examples.map((ex, i) => {
              const isSelected = selectedExample?.name === ex.name;
              return (
                <button 
                  key={i} 
                  onClick={() => setSelectedExample(isSelected ? null : ex)}
                  className={`rounded-xl p-3 text-center shadow-sm border transition-all duration-300 transform outline-none w-full
                    ${isSelected 
                      ? getSelectedStyle(active.id) + ' scale-105 shadow-md'
                      : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-300 hover:-translate-y-1'}`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl block mb-1">{ex.icon}</span>
                    <p className="font-bold text-sm text-gray-800">{ex.name}</p>
                    <p className="text-xs text-gray-500">{ex.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Example Detail Sub-panel */}
          <div className={`overflow-hidden transition-all duration-300 ${selectedExample ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
            {selectedExample && (
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                <div className="absolute top-0 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform -translate-y-1/2 rotate-45 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{selectedExample.icon}</span>
                    <h5 className="font-bold text-gray-800">{selectedExample.name}</h5>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedExample.details}</p>
                </div>
              </div>
            )}
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
          
          <div className={`overflow-hidden transition-all duration-300 ${showAnalogy ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
            {showAnalogy && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 text-gray-700 text-sm leading-relaxed shadow-sm">
                🏠 {active.analogy}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
