import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../ui/TeacherTask';
import { Play, RotateCcw, Terminal, Code2, AlignLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const lessons = [
  {
    id: 'syntax',
    icon: Code2,
    title: "3.1.1 รูปแบบคำสั่งและไวยากรณ์เบื้องต้น",
    desc: "ภาษา Python ถูกออกแบบมาให้อ่านง่าย คล้ายภาษาอังกฤษ ไม่จำเป็นต้องใช้เซมิโคลอน (;) ปิดท้ายคำสั่ง ทดลองรันโค้ดเบื้องต้นเพื่อดูการทำงาน",
    initialCode: 'message = "ยินดีต้อนรับสู่โลกของ Python"\nversion = 3.12\n\nprint("ข้อความ:", message)\nprint("เวอร์ชัน:", version)',
    execute: (code) => {
      // แบบจำลองการทำงานง่ายๆ สำหรับบทย่อย 1
      return "ข้อความ: ยินดีต้อนรับสู่โลกของ Python\nเวอร์ชัน: 3.12";
    },
    validate: (code) => true
  },
  {
    id: 'indentation',
    icon: AlignLeft,
    title: "3.1.2 การเว้นวรรคและย่อหน้า (Indentation)",
    desc: "Python ใช้การย่อหน้า (แนะนำ 4 เคาะ) เพื่อแบ่งบล็อกคำสั่ง (Block of code) แทนการใช้วงเล็บปีกกา { } ลองแก้ไขโค้ดที่ผิดพลาดด้านล่าง โดยเติมเว้นวรรค 4 เคาะหน้าคำสั่ง print ทั้ง 2 บรรทัด",
    initialCode: 'score = 85\n\nif score >= 50:\nprint("สอบผ่าน")\nprint("ยินดีด้วย!")',
    execute: (code) => {
      const lines = code.split('\n');
      const print1 = lines.find(l => l.includes('print("สอบผ่าน")'));
      const print2 = lines.find(l => l.includes('print("ยินดีด้วย!")'));
      
      const p1Indented = print1 && (print1.startsWith('    print') || print1.startsWith('\tprint'));
      const p2Indented = print2 && (print2.startsWith('    print') || print2.startsWith('\tprint'));

      if (p1Indented && p2Indented) {
        return "สอบผ่าน\nยินดีด้วย!";
      } else {
        throw new Error("IndentationError: expected an indented block after 'if' statement");
      }
    },
    validate: (code) => {
      const lines = code.split('\n');
      const print1 = lines.find(l => l.includes('print("สอบผ่าน")'));
      const print2 = lines.find(l => l.includes('print("ยินดีด้วย!")'));
      return print1 && (print1.startsWith('    print') || print1.startsWith('\tprint')) && 
             print2 && (print2.startsWith('    print') || print2.startsWith('\tprint'));
    }
  }
];

export default function pyUnit3_1_PythonStructure() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [code, setCode] = useState(lessons[0].initialCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(lessons[activeLesson].initialCode);
    setOutput("");
    setError(null);
    setSuccess(false);
  }, [activeLesson]);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput("");
    setSuccess(false);

    // จำลอง delay การรันโค้ด
    setTimeout(() => {
      try {
        const lesson = lessons[activeLesson];
        const res = lesson.execute(code);
        setOutput(res);
        
        if (lesson.id === 'indentation') {
           if (lesson.validate(code)) {
              setSuccess(true);
           }
        } else {
          setSuccess(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const handleReset = () => {
    setCode(lessons[activeLesson].initialCode);
    setOutput("");
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 pb-24">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      {/* Header */}
      <header className="relative pt-16 pb-12 z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 mb-4 uppercase">
          หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            โครงสร้างโค้ด Python
          </span>
        </h1>
        <div className="pt-6 border-l-4 border-indigo-600 pl-6 mt-4">
          <p className="text-[18px] font-normal leading-[1.6] text-zinc-600">
            เรียนรู้รูปแบบคำสั่งและไวยากรณ์เบื้องต้น (Syntax) รวมถึงการเว้นวรรคและย่อหน้า (Indentation) 
            ซึ่งเป็นหัวใจสำคัญในการเขียนโปรแกรมภาษา Python
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Interactive Simulator */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Panel: Menu & Instruction */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 bg-white/50 p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-[14px] font-bold tracking-[0.09em] uppercase text-zinc-500 mb-4">หัวข้อย่อย</h3>
              <div className="flex flex-col gap-3">
                {lessons.map((lesson, idx) => {
                  const Icon = lesson.icon;
                  const isActive = activeLesson === idx;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(idx)}
                      className={`flex flex-col text-left p-4 rounded-[12px] border transition-all active:scale-98 ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={18} className={isActive ? "text-indigo-600" : "text-slate-500"} />
                        <span className={`text-[14px] font-medium ${isActive ? "text-indigo-700" : "text-slate-700"}`}>
                          {lesson.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-[12px] border border-indigo-100 flex-1">
              <h4 className="text-[14px] font-semibold text-indigo-900 mb-2">คำอธิบาย</h4>
              <p className="text-[14px] leading-[1.6] text-zinc-600">
                {lessons[activeLesson].desc}
              </p>
            </div>
          </div>

          {/* Right Panel: Code Editor & Console */}
          <div className="flex-1 flex flex-col bg-[#FAFAFA]">
            {/* Editor Area */}
            <div className="flex-1 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <Code2 size={18} />
                  <span className="font-semibold text-[14px]">Python Editor</span>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-transparent text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] rounded-[8px] px-3 py-2 transition-all active:scale-98 flex items-center gap-2 text-sm font-medium"
                >
                  <RotateCcw size={16} /> รีเซ็ตโค้ด
                </button>
              </div>

              <div className="relative flex-1 min-h-[200px] border border-slate-300 rounded-[12px] overflow-hidden shadow-sm bg-[#1e1e1e]">
                {/* Editor Line Numbers (Simulated) */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#252526] border-r border-[#333] flex flex-col items-end py-4 px-2 text-[#858585] font-mono text-[14px] leading-relaxed select-none">
                  {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  className="absolute inset-0 pl-16 py-4 w-full h-full bg-transparent text-[#d4d4d4] font-mono text-[14px] leading-relaxed focus:outline-none resize-none caret-white whitespace-pre"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] active:scale-98 font-semibold text-sm rounded-[8px] px-6 h-[46px] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_6px_-1px_rgba(24,24,27,0.07)] hover:shadow-[0_10px_15px_-3px_rgba(24,24,27,0.08)]"
                >
                  {isRunning ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Play size={18} />
                  )}
                  {isRunning ? 'กำลังทำงาน...' : 'รันโค้ด (Run)'}
                </button>
              </div>
            </div>

            {/* Console Output */}
            <div className="h-[200px] bg-[#1e1e1e] border-t border-slate-800 flex flex-col font-mono relative">
              <div className="px-4 py-2 bg-[#2d2d2d] flex items-center gap-2 text-[#858585] text-[12px] font-semibold tracking-wider border-b border-[#333]">
                <Terminal size={14} />
                TERMINAL OUTPUT
              </div>
              <div className="p-4 flex-1 overflow-y-auto text-[14px] leading-[1.6]">
                {error ? (
                  <div className="text-[#EF4444] whitespace-pre-wrap flex items-start gap-2">
                    <AlertCircle size={16} className="mt-1 shrink-0" />
                    <span>{error}</span>
                  </div>
                ) : output ? (
                  <div className="text-[#22C55E] whitespace-pre-wrap">
                    {output}
                  </div>
                ) : (
                  <div className="text-zinc-500 italic text-[13px]">
                    คลิก "รันโค้ด" เพื่อดูผลลัพธ์...
                  </div>
                )}
                
                {success && (
                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-[8px] flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 size={18} />
                    <span>ยอดเยี่ยม! โค้ดทำงานถูกต้องสมบูรณ์</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Teacher Task */}
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask 
          title="ใบงาน: การตั้งค่าและการเยื้องหน้า (Indentation)" 
          taskText="1. ให้นักเรียนทดลองรันโค้ดและแก้ไขบรรทัดที่มีปัญหา Indentation จนผ่าน\n2. อธิบายความสำคัญของการย่อหน้าในภาษา Python ให้ผู้สอนฟัง"
        />
      </div>
    </div>
  );
}
