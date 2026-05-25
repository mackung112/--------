import React, { useState } from 'react';
import { 
  ListOrdered, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ArrowRight
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
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600 border border-cyan-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-cyan-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-cyan-100 text-cyan-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

const RangeSimulator = () => {
  const [start, setStart] = useState(1);
  const [stop, setStop] = useState(6);
  const [step, setStep] = useState(1);

  const getRangeResult = () => {
    let result = [];
    let i = start;
    if (step > 0) {
      while (i < stop) { result.push(i); i += step; }
    } else if (step < 0) {
      while (i > stop) { result.push(i); i += step; }
    }
    return result;
  };

  const result = getRangeResult();

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <ListOrdered className="w-6 h-6 text-cyan-500" /> เครื่องจำลองฟังก์ชัน range()
        </h3>
        <p className="text-slate-500 mt-2">กำหนดค่า Start, Stop, Step เพื่อดูว่า range() จะสร้างตัวเลขชุดไหนออกมา</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-1">Start (เริ่มที่)</label>
            <input type="number" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 0)} className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 font-mono" />
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-1">Stop (หยุดก่อนถึง)</label>
            <input type="number" value={stop} onChange={(e) => setStop(parseInt(e.target.value) || 0)} className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 font-mono" />
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-1">Step (เพิ่ม/ลดทีละ)</label>
            <input type="number" value={step} onChange={(e) => setStep(parseInt(e.target.value) || 1)} className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 font-mono" />
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between h-full">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-sm leading-loose">
              <span className="text-orange-400">for</span> <span className="text-cyan-300">i</span> <span className="text-orange-400">in</span> <span className="text-purple-400">range</span>(<span className="text-emerald-400">{start}</span>, <span className="text-rose-400">{stop}</span>, <span className="text-amber-400">{step}</span>):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-cyan-300">i</span>)
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># ตัวเลขที่ได้ (Console Output)</div>
            <div className="flex flex-wrap gap-2">
              {result.length > 0 ? result.map((num, idx) => (
                <span key={idx} className="bg-cyan-900/50 text-cyan-300 border border-cyan-700 px-3 py-1 rounded-lg font-mono font-bold">
                  {num}
                </span>
              )) : (
                <span className="text-slate-500 font-mono italic">ไม่เกิดตัวเลข (ขัดแย้งเงื่อนไข)</span>
              )}
            </div>
            {result.length > 15 && <div className="text-slate-500 text-xs mt-2">* แสดงผลมากสุดตามที่เห็น</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_16_RangeFunction() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: สูตรคูณแม่ 2
ให้นักเรียนใช้ for loop ร่วมกับคำสั่ง range() เพื่อแสดงผลสูตรคูณแม่ 2 (ตั้งแต่ 2 ถึง 24)
โดยให้แสดงผลเพิ่มขึ้นทีละ 2
(คำใบ้: range(start, stop, step))`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-cyan-200 selection:text-cyan-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-100/60 blur-[120px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-cyan-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">ฟังก์ชัน <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">range()</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-cyan-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed"><code>range()</code> คือผู้ช่วยคนเก่งของ for loop ทำหน้าที่สร้าง <strong>"ชุดตัวเลข"</strong> ให้เราแบบอัตโนมัติ โดยไม่ต้องมานั่งพิมพ์เลขเองทีละตัว มันสามารถบอกจุดเริ่มต้น, จุดสิ้นสุด (หยุดก่อนถึง), และระยะห่างแต่ละก้าวได้</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <RangeSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
