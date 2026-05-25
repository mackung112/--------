import React, { useState, useEffect } from 'react';
import { 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  PlaySquare,
  Square
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
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-pink-100 rounded-2xl text-pink-600 border border-pink-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-pink-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-pink-100 text-pink-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-pink-300 hover:text-pink-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

const WhileSimulator = () => {
  const [count, setCount] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isRunning && count <= 5) {
      timer = setTimeout(() => {
        setCount(c => c + 1);
      }, 1000);
    } else if (count > 5) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, count]);

  const handleStart = () => {
    setCount(1);
    setIsRunning(true);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <RefreshCcw className={`w-6 h-6 text-pink-500 ${isRunning ? 'animate-spin' : ''}`} /> เครื่องจำลองการวนลูป (while)
        </h3>
        <p className="text-slate-500 mt-2">กดปุ่มเริ่ม เพื่อดูโปรแกรมวนซ้ำจนกว่า count จะเกิน 5</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="text-6xl font-black text-slate-800 font-mono text-center mb-4">
            count = <span className="text-pink-500">{count > 5 ? 6 : count}</span>
          </div>
          
          <button 
            onClick={handleStart} 
            disabled={isRunning}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${isRunning ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-105 hover:shadow-pink-500/30'}`}
          >
            {isRunning ? <Square className="w-5 h-5 fill-current" /> : <PlaySquare className="w-5 h-5" />}
            {isRunning ? 'กำลังทำงาน...' : 'เริ่มวนลูป'}
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-sm leading-loose">
              <span className="text-blue-300">count</span> = <span className="text-amber-400">1</span><br/>
              <span className={`transition-all duration-300 ${isRunning && count <= 5 ? 'bg-pink-500/20 px-2 py-1 rounded text-white border border-pink-500/50' : ''}`}>
                <span className="text-orange-400">while</span> count &lt;= <span className="text-amber-400">5</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">f"รอบที่ {`{count}`}"</span>)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;count += <span className="text-amber-400">1</span>
              </span><br/>
              <span className={`transition-all duration-300 ${count > 5 ? 'bg-emerald-500/20 px-2 py-1 rounded text-white border border-emerald-500/50' : 'opacity-50'}`}>
                <span className="text-yellow-200">print</span>(<span className="text-green-400">"จบการทำงาน"</span>)
              </span>
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
            <div className="font-mono text-slate-300 h-24 overflow-y-auto flex flex-col gap-1">
              {Array.from({length: Math.min(count - 1, 5)}).map((_, i) => (
                <div key={i} className="text-pink-300">&gt; รอบที่ {i + 1}</div>
              ))}
              {count > 5 && <div className="text-emerald-400 font-bold mt-2">&gt; จบการทำงาน</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_14_WhileLoop() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: จรวดนับถอยหลัง
ให้นักเรียนสร้างโปรแกรมนับถอยหลัง โดยตั้งค่าเริ่มต้น time = 10
ใช้ while loop เพื่อแสดงผลนับถอยหลังจนถึง 1 แล้วเมื่อนับจบให้ print "Blast off!"
(คำใบ้: อย่าลืมทำ time -= 1 ไม่งั้นโปรแกรมจะค้างเป็นลูปอนันต์ หรือ Infinite Loop)`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-pink-200 selection:text-pink-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-pink-100/60 blur-[100px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-pink-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">ลูปเงื่อนไข <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">while</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-pink-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">คำว่า <code>while</code> แปลว่า "ในขณะที่..." มันจะทำคำสั่งซ้ำๆ ไปเรื่อยๆ <strong className="text-pink-600">ตราบใดที่เงื่อนไขยังคงเป็นจริง</strong> และจะหยุดทันทีเมื่อเงื่อนไขเป็นเท็จ (ข้อควรระวัง: หากเงื่อนไขเป็นจริงตลอดเวลา จะทำให้โปรแกรมค้าง เรียกว่า Infinite Loop)</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <WhileSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
