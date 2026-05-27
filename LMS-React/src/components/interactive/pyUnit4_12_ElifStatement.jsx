import TeacherTask from '../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  GitBranchPlus, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  TrafficCone
} from 'lucide-react';



const ElifSimulator = () => {
  const [score, setScore] = useState(75);
  
  let grade = '';
  if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 50) grade = 'D';

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <TrafficCone className="w-6 h-6 text-amber-500" /> เครื่องจำลองการตัดเกรด (elif)
        </h3>
        <p className="text-slate-500 mt-2">เลื่อนเพื่อเปลี่ยนคะแนนสอบ ระบบจะตรวจสอบเงื่อนไขจากบนลงล่าง</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-6 items-center">
          <input 
            type="range" min="40" max="100" value={score} 
            onChange={(e) => setScore(parseInt(e.target.value))} 
            className="w-full accent-amber-500" 
          />
          <div className="text-4xl font-bold text-slate-800 font-mono text-center">
            คะแนน: <span className="text-amber-500">{score}</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-sm leading-loose">
              <span className={`transition-all duration-300 ${score >= 80 ? 'bg-amber-500/20 px-2 py-1 rounded text-white border border-amber-500/50' : ''}`}>
                <span className="text-orange-400">if</span> score &gt;= <span className="text-amber-400">80</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"เกรด A"</span>)
              </span><br/>
              <span className={`transition-all duration-300 ${score < 80 && score >= 70 ? 'bg-amber-500/20 px-2 py-1 rounded text-white border border-amber-500/50' : 'opacity-50'}`}>
                <span className="text-orange-400">elif</span> score &gt;= <span className="text-amber-400">70</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"เกรด B"</span>)
              </span><br/>
              <span className={`transition-all duration-300 ${score < 70 && score >= 60 ? 'bg-amber-500/20 px-2 py-1 rounded text-white border border-amber-500/50' : 'opacity-50'}`}>
                <span className="text-orange-400">elif</span> score &gt;= <span className="text-amber-400">60</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"เกรด C"</span>)
              </span>
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
            <div className="font-mono font-bold text-emerald-400">
              {grade ? `> เกรด ${grade}` : '> (ตกทุกเงื่อนไข ไม่มีอะไรแสดงผล)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_12_ElifStatement() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: เครื่องจำลองขนาดเสื้อ
รับค่ารอบอก (นิ้ว) จากผู้ใช้ และให้โปรแกรมแสดงขนาดเสื้อ
- ถ้ารอบอก >= 42 ให้ print "Size XL"
- ถ้ารอบอก >= 40 ให้ print "Size L"
- ถ้ารอบอก >= 38 ให้ print "Size M"
(คำใบ้: ใช้ if, elif, elif ในการตรวจสอบ)`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-amber-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-[120px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-amber-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">เงื่อนไขทางเลือก <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">elif</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-amber-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">คำว่า <code>elif</code> ย่อมาจาก "else if" แปลว่า <strong>"แล้วถ้า..."</strong> ใช้เมื่อเรามีเงื่อนไขให้ตรวจสอบมากกว่า 1 ข้อ ระบบจะตรวจสอบจากบนลงล่าง หากเจออันไหนที่จริง (True) แล้ว มันจะทำอันนั้นแล้ว <strong className="text-amber-600">กระโดดข้าม</strong> ที่เหลือทั้งหมดทันที</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <ElifSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
