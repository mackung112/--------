import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Keyboard, 
  Monitor, 
  AlertCircle, 
  Code2,
  ChevronRight,
  Sparkles
} from 'lucide-react';



const TerminalSimulator = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  // Auto focus input when step changes to requiring input
  useEffect(() => {
    if ((step === 1 || step === 3) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleRun = () => {
    setStep(1);
    setName('');
    setYear('');
    setInputVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputVal.trim() !== '') {
      if (step === 1) {
        setName(inputVal);
        setInputVal('');
        setStep(2);
        setTimeout(() => setStep(3), 600); // Small delay for effect
      } else if (step === 3) {
        setYear(inputVal);
        setInputVal('');
        setStep(4);
      }
    }
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Terminal className="w-6 h-6 text-emerald-500" />
          เครื่องจำลอง Console (Interactive I/O)
        </h3>
        <p className="text-slate-500 mt-2">จำลองการทำงานของโค้ดที่มีทั้งการรับและแสดงผลข้อมูล</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Source Code Panel */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
          <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center gap-3">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-400 font-mono text-sm">chatbot.py</span>
          </div>
          <div className="p-6 font-mono text-sm leading-loose text-slate-300 flex-grow">
            <div className={`p-1 rounded transition-colors ${step >= 1 && step <= 2 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
              <span className="text-blue-400">name</span> = <span className="text-yellow-200">input</span>(<span className="text-green-400">"คุณชื่ออะไร? : "</span>)
            </div>
            <div className={`p-1 rounded transition-colors ${step >= 3 && step <= 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
              <span className="text-blue-400">birth_year</span> = <span className="text-yellow-200">int</span>(<span className="text-yellow-200">input</span>(<span className="text-green-400">"เกิดปี ค.ศ. อะไร? : "</span>))
            </div>
            <br />
            <div className={`p-1 rounded transition-colors ${step === 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
              <span className="text-blue-400">age</span> = <span className="text-amber-400">2024</span> - <span className="text-blue-400">birth_year</span>
            </div>
            <div className={`p-1 rounded transition-colors ${step === 4 ? 'bg-emerald-900/40 border-l-2 border-emerald-500 -ml-2 pl-2' : ''}`}>
              <span className="text-yellow-200">print</span>(<span className="text-green-400">f"สวัสดี <span className="text-blue-300">{`{name}`}</span> ปีนี้คุณอายุ <span className="text-blue-300">{`{age}`}</span> ปีแล้วนะ!"</span>)
            </div>
          </div>
          <div className="bg-slate-950 p-4 border-t border-slate-800 text-center">
             <button 
                onClick={handleRun}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-6 rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                {step === 0 ? '▶ รันโปรแกรม (Run)' : 'เริ่มใหม่ (Restart)'}
              </button>
          </div>
        </div>

        {/* Terminal Output Panel */}
        <div className="bg-[#0f172a] rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col relative group">
          {/* Subtle terminal glow */}
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="bg-[#020617] px-6 py-3 border-b border-slate-800 flex justify-between items-center">
             <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-slate-500 font-mono text-sm">Console</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
          </div>
          
          <div className="p-6 font-mono text-sm leading-loose text-emerald-400 flex-grow">
            {step === 0 && (
              <div className="text-slate-500 flex items-center justify-center h-full">
                รอการรันโปรแกรม...
              </div>
            )}
            
            {step >= 1 && (
              <div className="mb-2">
                คุณชื่ออะไร? : {name ? <span className="text-white">{name}</span> : 
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-transparent border-none outline-none text-white w-32 animate-pulse focus:animate-none border-b border-emerald-500/50"
                    placeholder="พิมพ์ที่นี่..."
                    autoFocus
                  />
                }
              </div>
            )}

            {step >= 3 && (
              <div className="mb-2">
                เกิดปี ค.ศ. อะไร? : {year ? <span className="text-white">{year}</span> : 
                  <input 
                    ref={inputRef}
                    type="number" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-transparent border-none outline-none text-white w-32 animate-pulse focus:animate-none border-b border-emerald-500/50"
                    placeholder="พิมพ์ตัวเลข..."
                  />
                }
              </div>
            )}

            {step === 4 && (
              <div className="mt-4 pt-4 border-t border-slate-800 text-emerald-300">
                <ChevronRight className="w-4 h-4 inline-block mr-1 text-emerald-500" />
                สวัสดี <span className="text-white font-bold">{name}</span> ปีนี้คุณอายุ <span className="text-white font-bold">{2024 - parseInt(year)}</span> ปีแล้วนะ!
              </div>
            )}

            {(step === 1 || step === 3) && (
              <div className="mt-8 text-xs text-slate-500 flex items-center gap-2">
                <Keyboard className="w-4 h-4" /> กด Enter เพื่อยืนยัน
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_2_InputDemo() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม:
ให้นักเรียนสร้างโปรแกรม "เครื่องคิดเลข BMI" (Body Mass Index)
1. ให้โปรแกรมรับค่า "น้ำหนัก (กิโลกรัม)" และ "ส่วนสูง (เซนติเมตร)" จากผู้ใช้ (ระวังเรื่องการแปลงชนิดข้อมูล)
2. นำส่วนสูงมาแปลงเป็นเมตร (หารด้วย 100)
3. คำนวณ BMI ด้วยสูตร: น้ำหนัก / (ส่วนสูงหน่วยเมตร ยกกำลัง 2)
4. แสดงผลลัพธ์ออกทางหน้าจอด้วย f-string เช่น "ค่า BMI ของคุณคือ 22.5"`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-teal-50/60 blur-[120px]"></div>
      </div>

      {/* Header Section (Left-aligned as requested) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 mb-4 uppercase">
              หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              การรับและแสดงผลข้อมูล <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">(Input & Print)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-emerald-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              การสื่อสารระหว่างมนุษย์กับคอมพิวเตอร์ผ่านฟังก์ชันพื้นฐาน 2 ตัว คือ <strong>input()</strong> สำหรับถามและรับข้อมูลจากคีย์บอร์ด และ <strong>print()</strong> สำหรับแสดงผลลัพธ์ออกทางหน้าจอ
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* PRINT Card */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-lg hover:border-emerald-200 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <Monitor className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">print()</h3>
              </div>
              <p className="text-slate-600 mb-6">ฟังก์ชันสำหรับสั่งให้คอมพิวเตอร์แสดงข้อความหรือค่าของตัวแปรออกทางหน้าจอ</p>
              
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
                  <span className="text-slate-500 mb-1 block text-xs"># แสดงข้อความปกติ</span>
                  <span className="text-yellow-200">print</span>(<span className="text-green-400">"Hello World!"</span>)
                </div>
                
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm relative border border-emerald-500/30">
                  <div className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">RECOMMENDED</div>
                  <span className="text-slate-500 mb-1 block text-xs"># แสดงข้อความผสมตัวแปร (f-string)</span>
                  <span className="text-blue-400">score</span> = <span className="text-amber-400">95</span><br/>
                  <span className="text-yellow-200">print</span>(<span className="text-green-400">f"คุณได้คะแนน <span className="text-blue-300">{`{score}`}</span> แต้ม"</span>)
                </div>
              </div>
            </div>
          </div>

          {/* INPUT Card */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-lg hover:border-teal-200 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">input()</h3>
              </div>
              <p className="text-slate-600 mb-6">ฟังก์ชันสำหรับหยุดรอให้ผู้ใช้พิมพ์ข้อมูลทางคีย์บอร์ดแล้วกด Enter เพื่อเก็บข้อมูล</p>
              
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
                  <span className="text-slate-500 mb-1 block text-xs"># รับข้อมูลมาเก็บในตัวแปร name</span>
                  <span className="text-blue-400">name</span> = <span className="text-yellow-200">input</span>(<span className="text-green-400">"Enter name: "</span>)
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 text-sm mb-1">ระวังเรื่องชนิดข้อมูล!</h4>
                      <p className="text-amber-700 text-xs leading-relaxed">
                        คำสั่ง <code className="bg-amber-100 px-1 rounded">input()</code> จะมองทุกอย่างที่พิมพ์เข้ามาเป็น <strong>ข้อความ (String) เสมอ</strong> 
                        ถ้าต้องการรับตัวเลขเพื่อนำไปคำนวณ ต้องครอบด้วย <code className="bg-amber-100 px-1 rounded">int()</code> หรือ <code className="bg-amber-100 px-1 rounded">float()</code>
                      </p>
                      <div className="mt-2 bg-white/60 p-2 rounded text-xs font-mono text-slate-700">
                        age = <span className="text-teal-600 font-bold">int</span>(input("อายุ: "))
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Simulator */}
        <TerminalSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}