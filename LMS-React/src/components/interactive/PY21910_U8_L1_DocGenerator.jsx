import React, { useState, useEffect, useRef } from 'react';
import { FileText, FileCode2, TerminalSquare, RotateCcw } from 'lucide-react';

const sections = [
  { 
    id: 1,
    title: '1. ปก / README', 
    icon: '📄', 
    content: '# ระบบ Mini POS\nผู้จัดทำ: นายสมชาย ใจดี\nรหัส: 65310001\nวิชา: การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น',
    desc: 'ข้อมูลพื้นฐานของโปรเจกต์และผู้จัดทำ (มักจะอยู่ในไฟล์ README.md)'
  },
  { 
    id: 2,
    title: '2. คำอธิบายโปรแกรม', 
    icon: '📋', 
    content: '## จุดประสงค์\nจำลองระบบแคชเชียร์ร้านค้าขนาดเล็ก\n\n## ฟีเจอร์หลัก\n- เพิ่ม/ลบสินค้าจากตะกร้า\n- คำนวณภาษีและส่วนลดอัตโนมัติ\n- แสดงใบเสร็จรับเงิน',
    desc: 'อธิบายว่าโปรแกรมนี้ทำอะไรได้บ้าง เพื่อให้คนอื่นเข้าใจภาพรวมอย่างรวดเร็ว'
  },
  { 
    id: 3,
    title: '3. วิธีการติดตั้ง', 
    icon: '⚙️', 
    content: '## ความต้องการของระบบ (Prerequisites)\n- Python 3.10 หรือใหม่กว่า\n\n## การติดตั้ง (Installation)\n```bash\n# 1. โคลนโปรเจกต์\ngit clone https://github.com/user/mini-pos.git\n\n# 2. ติดตั้งไลบรารีที่จำเป็น\npip install -r requirements.txt\n\n# 3. รันโปรแกรม\npython main.py\n```',
    desc: 'ขั้นตอนการเซ็ตอัประบบตั้งแต่ต้นจนสามารถรันโปรแกรมได้'
  },
  { 
    id: 4,
    title: '4. คู่มือการใช้งาน', 
    icon: '📖', 
    content: '## วิธีใช้งาน (Usage)\n1. เมื่อรันโปรแกรม จะแสดงเมนูหลัก\n2. กด `1` เพื่อดูรายการสินค้า\n3. พิมพ์รหัสสินค้าที่ต้องการเพิ่มในตะกร้า\n4. กด `2` เพื่อดูสรุปยอดและชำระเงิน\n5. พิมพ์ `exit` เพื่อออกจากโปรแกรม',
    desc: 'อธิบายวิธีการใช้งานโปรแกรมทีละขั้นตอนสำหรับผู้ใช้ (User Manual)'
  },
];

export default function PY21910_U8_L1_DocGenerator() {
  const [active, setActive] = useState(0);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Documentation Generator Ready.' },
    { type: 'system', text: '# กดดูตัวอย่างโครงสร้างเอกสารด้านบน' }
  ]);
  const consoleRef = useRef(null);

  const s = sections[active];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const changeSection = (idx) => {
    setActive(idx);
    setConsoleHistory([
      { type: 'system', text: `--- Generated Documentation: ${sections[idx].title} ---` },
      { type: 'output', text: sections[idx].content }
    ]);
  };

  const clear = () => setConsoleHistory([
    { type: 'system', text: 'Documentation Generator Ready.' },
    { type: 'system', text: '# กดดูตัวอย่างโครงสร้างเอกสารด้านบน' }
  ]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <FileCode2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดทำเอกสารประกอบโปรแกรม</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เอกสารที่ดีเปรียบเสมือนแผนที่ ช่วยให้ผู้อื่น (หรือตัวเราในอนาคต) เข้าใจและใช้งานโปรแกรมได้ง่ายขึ้น ลองสำรวจโครงสร้างเอกสารมาตรฐานด้านล่าง
        </p>
      </div>

      <div className="flex flex-col min-h-[480px]">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
          {sections.map((sec, i) => (
            <button key={i} onClick={() => changeSection(i)}
              className={`flex-1 min-w-[150px] py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                active === i 
                  ? 'border-indigo-500 text-indigo-700 bg-white' 
                  : 'border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}>
              <span>{sec.icon}</span> <span className="hidden sm:inline">{sec.title.substring(3)}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Content Preview */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                <FileText size={16} className="text-slate-700" />
                <span className="text-sm font-bold text-slate-700">{s.title}</span>
              </div>
              <div className="p-5 flex-1 bg-white">
                <pre className="font-mono text-[13px] text-slate-800 whitespace-pre-wrap leading-relaxed">{s.content}</pre>
              </div>
            </div>
            
            <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h4 className="text-sm font-bold text-indigo-800 mb-1 flex items-center gap-2">
                <TerminalSquare size={16} /> ทำไมส่วนนี้ถึงสำคัญ?
              </h4>
              <p className="text-xs text-indigo-700 leading-relaxed">{s.desc}</p>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">รูปแบบเอกสาร (Markdown)</h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                นักพัฒนาซอฟต์แวร์นิยมเขียนเอกสารด้วยภาษา <strong>Markdown (.md)</strong> เพราะเขียนง่าย อ่านง่ายแม้อยู่ในรูปแบบโค้ด และแสดงผลได้สวยงามบน GitHub
              </p>
              
              <div className="space-y-3">
                <div className="border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-100 text-[10px] font-bold text-slate-700 px-2 py-1 border-b border-slate-200">หัวข้อใหญ่</div>
                  <div className="font-mono text-xs p-2 text-slate-700"># หัวข้อหลัก<br/>## หัวข้อย่อย</div>
                </div>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-100 text-[10px] font-bold text-slate-700 px-2 py-1 border-b border-slate-200">ลิสต์รายการ</div>
                  <div className="font-mono text-xs p-2 text-slate-700">- รายการ 1<br/>- รายการ 2</div>
                </div>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-100 text-[10px] font-bold text-slate-700 px-2 py-1 border-b border-slate-200">แทรกโค้ด</div>
                  <div className="font-mono text-xs p-2 text-slate-700">```python<br/>print("Hello")<br/>```</div>
                </div>
              </div>
            </div>
            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> เคลียร์ Terminal
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">cat README.md</span>
            </div>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">$</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-emerald-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
