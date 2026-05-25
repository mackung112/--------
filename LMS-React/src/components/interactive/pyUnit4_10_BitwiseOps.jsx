import React, { useState } from 'react';
import { 
  Binary, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  Cpu
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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

export default function pyUnit4_10_BitwiseOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: สำรวจเลขฐานสอง
1. ให้นักเรียนลองใช้คำสั่ง bin(10) เพื่อดูว่าเลข 10 เขียนเป็นฐานสองอย่างไร
2. ลองเปรียบเทียบผลลัพธ์ของ 5 & 3 (AND) กับ 5 | 3 (OR)`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/60 blur-[100px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">ตัวดำเนินการระดับบิต<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">(Bitwise Operators)</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-emerald-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Bitwise จะแปลงตัวเลขให้กลายเป็น "เลขฐานสอง (Binary: 0 และ 1)" ก่อนที่จะนำมาเปรียบเทียบหรือกระทำกันทีละตำแหน่ง ซึ่งมักใช้ในระบบเครือข่าย หรือการเขียนโปรแกรมควบคุมฮาร์ดแวร์ระดับต่ำ</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl mb-12 flex flex-col md:flex-row gap-10 items-center overflow-hidden">
          <div className="w-full text-center">
             <Cpu className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
             <h2 className="text-2xl font-bold text-slate-800 mb-4">ระดับบิตทำงานอย่างไร?</h2>
             <div className="bg-slate-900 rounded-2xl p-6 text-emerald-400 font-mono text-left inline-block w-full md:w-auto">
               <span className="text-slate-500"># ตัวเลข 10 ในฐานสองคือ 1010</span><br/>
               <span className="text-slate-500"># ตัวเลข 12 ในฐานสองคือ 1100</span><br/>
               <span className="text-blue-300">print</span>(10 <span className="text-white">&</span> 12)<br/>
               <span className="text-slate-500"># ผลลัพธ์: 8 (ฐานสองคือ 1000)</span>
             </div>
          </div>
        </div>

        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
