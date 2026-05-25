import React, { useState } from 'react';
import { 
  GitBranch, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600 border border-orange-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-orange-100 text-orange-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

const IfSimulator = () => {
  const [age, setAge] = useState(15);
  
  const isAdult = age >= 18;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <ShieldAlert className="w-6 h-6 text-orange-500" /> เครื่องจำลองเงื่อนไข if
        </h3>
        <p className="text-slate-500 mt-2">เปลี่ยนอายุเพื่อให้เงื่อนไขอายุมากกว่าหรือเท่ากับ 18 เป็นจริง (True)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-6 items-center">
          <input 
            type="range" min="1" max="100" value={age} 
            onChange={(e) => setAge(parseInt(e.target.value))} 
            className="w-full accent-orange-500" 
          />
          <div className="text-4xl font-bold text-slate-800 font-mono text-center">
            อายุ: <span className="text-orange-500">{age}</span> ปี
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-lg leading-loose">
              <span className="text-orange-400">if</span> age &gt;= <span className="text-amber-400">18</span>:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"เข้าสู่ระบบสำเร็จ"</span>)
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
            <div className={`font-mono font-bold ${isAdult ? 'text-emerald-400' : 'text-slate-600'}`}>
              {isAdult ? '> เข้าสู่ระบบสำเร็จ' : '> (ไม่มีอะไรเกิดขึ้น โปรแกรมจบการทำงาน)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_11_IfStatement() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: ระบบตรวจสอบส่วนสูงรถไฟเหาะ
ให้นักเรียนรับค่าส่วนสูง (ซม.) จากผู้ใช้
ถ้าส่วนสูง มากกว่าหรือเท่ากับ 120 ซม. ให้ print คำว่า "คุณสามารถเล่นรถไฟเหาะได้!"
(คำใบ้: ใช้ if height >= 120: )`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-orange-200 selection:text-orange-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-orange-100/60 blur-[100px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-orange-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">การใช้งานเงื่อนไข <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">if</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-orange-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">คำสั่ง `if` แปลว่า "ถ้า" ใช้เพื่อบอกให้คอมพิวเตอร์ทำงานในบล็อกโค้ดนั้นๆ <strong className="text-orange-600">ก็ต่อเมื่อเงื่อนไขเป็นจริง (True) เท่านั้น</strong> ถ้าไม่จริง มันจะข้ามไปเลย</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <IfSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
