import React, { useState, useEffect } from 'react';
import { 
  Repeat, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  PlaySquare,
  Square,
  Box
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
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-violet-100 rounded-2xl text-violet-600 border border-violet-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-violet-100 text-violet-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

const ForSimulator = () => {
  const items = ["แอปเปิล", "กล้วย", "ส้ม"];
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && currentIndex < items.length) {
      timer = setTimeout(() => {
        setCurrentIndex(c => c + 1);
      }, 1000);
    } else if (currentIndex >= items.length) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, items.length]);

  const handleStart = () => {
    setCurrentIndex(0);
    setIsRunning(true);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Repeat className={`w-6 h-6 text-violet-500 ${isRunning ? 'animate-spin-slow' : ''}`} /> เครื่องจำลองการดึงของจากกล่อง (for)
        </h3>
        <p className="text-slate-500 mt-2">for loop จะดึงของออกมาทีละชิ้นจนกว่าจะหมด</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex gap-4">
            {items.map((item, i) => (
              <div key={i} className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-lg transition-all duration-500 ${currentIndex === i ? 'bg-violet-500 text-white scale-110 shadow-lg shadow-violet-500/30 -translate-y-4' : currentIndex > i ? 'bg-slate-100 text-slate-300' : 'bg-white border-2 border-slate-200 text-slate-600'}`}>
                <Box className={`w-6 h-6 ${currentIndex === i ? 'text-white' : 'text-slate-400'}`} />
                {item}
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleStart} 
            disabled={isRunning}
            className={`mt-4 flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${isRunning ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:scale-105 hover:shadow-violet-500/30'}`}
          >
            {isRunning ? <Square className="w-5 h-5 fill-current" /> : <PlaySquare className="w-5 h-5" />}
            {isRunning ? 'กำลังทำงาน...' : 'เริ่มวนลูป'}
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-sm leading-loose">
              <span className="text-blue-300">fruits</span> = [<span className="text-green-400">"แอปเปิล"</span>, <span className="text-green-400">"กล้วย"</span>, <span className="text-green-400">"ส้ม"</span>]<br/>
              <span className={`transition-all duration-300 ${isRunning && currentIndex < items.length ? 'bg-violet-500/20 px-2 py-1 rounded text-white border border-violet-500/50' : ''}`}>
                <span className="text-orange-400">for</span> <span className="text-cyan-300">fruit</span> <span className="text-orange-400">in</span> <span className="text-blue-300">fruits</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-cyan-300">fruit</span>)
              </span><br/>
              <span className={`transition-all duration-300 ${currentIndex >= items.length && currentIndex !== -1 ? 'bg-emerald-500/20 px-2 py-1 rounded text-white border border-emerald-500/50' : 'opacity-50'}`}>
                <span className="text-yellow-200">print</span>(<span className="text-green-400">"กินหมดแล้ว!"</span>)
              </span>
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
            <div className="font-mono text-slate-300 flex flex-col gap-1 min-h-[100px]">
              {items.slice(0, currentIndex + 1).map((item, i) => (
                <div key={i} className="text-violet-300">&gt; {item}</div>
              ))}
              {currentIndex >= items.length && <div className="text-emerald-400 font-bold mt-2">&gt; กินหมดแล้ว!</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_15_ForLoop() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: พิมพ์ชื่อเพื่อน
ให้นักเรียนสร้าง List ที่เก็บชื่อเพื่อนสนิท 3 คน
จากนั้นใช้ for loop ในการดึงชื่อเพื่อนออกมาทีละคน และ print ว่า "สวัสดี [ชื่อเพื่อน]"
(คำใบ้: ใช้ f-string ประกอบกัน เช่น print(f"สวัสดี {friend}"))`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-violet-200 selection:text-violet-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-violet-100/60 blur-[100px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-violet-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">ลูปดึงข้อมูล <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">for</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-violet-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">คำว่า <code>for</code> ใน Python มักใช้อ่านค่าแบบ "ดึงของออกมาทีละชิ้นจากกล่อง" (เช่น จาก List หรือข้อความ) ข้อดีคือ <strong className="text-violet-600">มันรู้เองว่าของจะหมดเมื่อไหร่</strong> ทำให้ไม่ต้องกลัวลูปอนันต์เหมือน while</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <ForSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
