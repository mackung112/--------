import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Code2,
  Terminal,
  Play
} from 'lucide-react';



const PrintFormatSimulator = () => {
  const [var1, setVar1] = useState('แม็ค');
  const [var2, setVar2] = useState('25');
  
  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Printer className="w-6 h-6 text-sky-500" /> เครื่องจำลอง f-string (Format String)
        </h3>
        <p className="text-slate-500 mt-2">พิมพ์ข้อความเพื่อดูว่า f-string แทรกตัวแปรเข้าไปในข้อความอย่างไร</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">ตัวแปร name</label>
            <input type="text" value={var1} onChange={(e) => setVar1(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-sky-400" />
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">ตัวแปร age</label>
            <input type="text" value={var2} onChange={(e) => setVar2(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-sky-400" />
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-sky-300 font-mono text-sm leading-loose">
              name = "{var1}"<br/>
              age = {var2 || '0'}<br/>
              <span className="text-yellow-200">print</span>(<span className="text-green-400">f"สวัสดี ผมชื่อ <span className="text-orange-300 font-bold">{`{name}`}</span> อายุ <span className="text-orange-300 font-bold">{`{age}`}</span> ปีครับ"</span>)
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2 flex items-center gap-2"><Terminal className="w-4 h-4"/> Console Output</div>
            <div className="text-emerald-400 font-mono">
              สวัสดี ผมชื่อ {var1} อายุ {var2} ปีครับ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_3_PrintFormat() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: การใช้ f-string
ให้นักเรียนสร้างโปรแกรมทักทาย โดยให้มีตัวแปร 3 ตัว:
- hero_name = "อัศวิน"
- level = 99
- weapon = "ดาบศักดิ์สิทธิ์"

ให้นักเรียนใช้คำสั่ง print() ร่วมกับ f-string เพื่อแสดงผลลัพธ์ว่า:
"ผู้กล้า อัศวิน เลเวล 99 ถืออาวุธ ดาบศักดิ์สิทธิ์ พร้อมลุย!"`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-sky-200 selection:text-sky-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sky-100/60 blur-[100px]"></div>
      </div>
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <PrintFormatSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
