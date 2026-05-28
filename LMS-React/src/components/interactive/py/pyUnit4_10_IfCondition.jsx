import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Play,
  Code2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  GitMerge,
  AlignLeft,
  Bug
} from 'lucide-react';

// Sub-component for 4.10.1
const SimpleIfSim = () => {
  const [score, setScore] = useState(75);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  const condition = score >= 50;

  const runCode = () => {
    setHasPlayed(true);
  };

  const resetCode = () => {
    setHasPlayed(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      {/* Code Editor Panel */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-emerald-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <GitMerge className="w-5 h-5" /> 4.10.1 โครงสร้างคำสั่ง if เชิงเดี่ยว
        </h4>
        
        <div className="bg-black/30 p-4 rounded-xl border border-slate-800/50 mb-4">
          <span className="text-blue-400">score</span> = <input 
            type="number" 
            value={score}
            onChange={(e) => {setScore(Number(e.target.value)); resetCode();}}
            className="bg-slate-800 text-amber-400 w-20 px-2 py-1 rounded outline-none border border-slate-700 focus:border-emerald-500 transition-colors inline-block"
          />
        </div>
        
        <div className="mt-2 flex flex-col gap-1">
          <div className="text-pink-500">if <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">50</span>:</div>
          <div className={`ml-8 transition-all duration-300 ${hasPlayed ? (condition ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1' : 'opacity-30') : ''}`}>
            <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"สอบผ่าน!"</span>)
          </div>
          <div className="text-yellow-200 mt-2">print(<span className="text-emerald-400">"จบโปรแกรม"</span>)</div>
        </div>

        <div className="mt-8">
           <button 
             onClick={runCode}
             className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
           >
             <Play className="w-5 h-5" /> ทดสอบรันโค้ด
           </button>
        </div>
      </div>

      {/* Flowchart Panel */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
           Flowchart (ผังงานจำลอง)
        </h4>

        <div className="flex-1 flex flex-col items-center">
          {/* Start */}
          <div className="bg-slate-300 px-6 py-2 rounded-full font-bold text-slate-700 text-sm mb-4">รับค่า score = {score}</div>
          <div className="w-0.5 h-6 bg-slate-300 mb-4"></div>
          
          {/* Diamond */}
          <div className={`w-40 h-40 transform rotate-45 flex items-center justify-center border-4 transition-all duration-500 shadow-lg ${hasPlayed ? (condition ? 'bg-emerald-100 border-emerald-400' : 'bg-rose-100 border-rose-400') : 'bg-white border-slate-300'}`}>
             <div className="transform -rotate-45 font-bold font-mono text-center px-4">
                score &gt;= 50
             </div>
          </div>
          
          {/* Branches */}
          <div className="relative w-64 h-24 mt-2">
             {/* True Branch */}
             <div className={`absolute top-0 right-[50%] w-32 h-0.5 transition-all duration-500 ${hasPlayed && condition ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}`}>
                <span className={`absolute -top-6 right-2 font-bold text-sm ${hasPlayed && condition ? 'text-emerald-600' : 'text-slate-500'}`}>True</span>
             </div>
             <div className={`absolute top-0 left-0 w-0.5 h-16 transition-all duration-500 ${hasPlayed && condition ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}`}></div>
             
             {/* True Action Box */}
             <div className={`absolute top-16 -left-16 w-32 bg-white border-2 py-3 rounded-lg text-center font-bold font-mono text-sm shadow-md transition-all duration-500 ${hasPlayed && condition ? 'border-emerald-500 text-emerald-700 scale-110' : 'border-slate-300 text-slate-400'}`}>
                พิมพ์ "สอบผ่าน!"
             </div>

             {/* False Branch (Straight down) */}
             <div className={`absolute top-0 left-[50%] w-0.5 h-36 transition-all duration-500 ${hasPlayed && !condition ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-slate-300'}`}>
                <span className={`absolute top-2 left-2 font-bold text-sm ${hasPlayed && !condition ? 'text-rose-600' : 'text-slate-500'}`}>False</span>
             </div>

             {/* Join True Path Back */}
             <div className={`absolute top-28 left-0 w-32 h-0.5 transition-all duration-500 ${hasPlayed && condition ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}`}></div>
          </div>

          <div className={`w-0.5 h-8 mt-12 transition-all duration-500 ${hasPlayed ? (condition ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-300'}`}></div>
          <div className="bg-slate-300 px-6 py-2 rounded-full font-bold text-slate-700 text-sm mt-4">พิมพ์ "จบโปรแกรม"</div>
        </div>

        {/* Terminal Output */}
        {hasPlayed && (
          <div className="mt-8 bg-black rounded-xl p-4 font-mono text-emerald-400 shadow-inner text-sm animate-[fade-in_0.3s_ease-out]">
             <div className="text-slate-500 mb-2">$ python main.py</div>
             {condition && <div>สอบผ่าน!</div>}
             <div>จบโปรแกรม</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component for 4.10.2 Indentation
const IndentationSim = () => {
  const [indent, setIndent] = useState(0); // 0 = none, 1 = 2 spaces, 2 = 4 spaces
  
  const getStatus = () => {
    if (indent === 0) return { error: true, msg: "IndentationError: expected an indented block", type: "error" };
    if (indent === 1) return { error: false, msg: "โค้ดทำงานได้ แต่ผิดมาตรฐาน PEP8 (ควรใช้ 4 เคาะ)", type: "warning" };
    return { error: false, msg: "โค้ดสมบูรณ์ ทำงานได้ถูกต้องตามมาตรฐาน", type: "success" };
  };

  const status = getStatus();

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-sky-400 mb-2 flex items-center gap-2"><AlignLeft /> 4.10.2 การเขียนบล็อกคำสั่ง (Indentation)</h4>
        <p className="text-slate-400 mb-8 text-sm">ในภาษา Python <strong>ห้ามใช้ปีกกา {}</strong> แต่จะใช้ <strong>การย่อหน้า (Indent)</strong> เพื่อบอกว่าคำสั่งไหนอยู่ในบล็อกของ if ลองปรับการย่อหน้าด้านล่างดู</p>
        
        <div className="flex flex-col md:flex-row gap-8">
           
           <div className="w-full md:w-1/2 flex flex-col gap-4">
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 font-mono text-lg shadow-inner">
               <div className="text-pink-500">if <span className="text-blue-400">True</span>:</div>
               <div className="flex items-center mt-2">
                 {/* Visual Indent Indicators */}
                 {indent === 1 && <div className="w-4 h-6 border-l border-b border-slate-600 border-dashed mr-1"></div>}
                 {indent === 2 && <div className="w-8 h-6 border-l border-b border-slate-600 border-dashed mr-1"></div>}
                 
                 <div className={`transition-all duration-300 ${indent === 0 ? 'border-l-4 border-rose-500 pl-2 bg-rose-500/10 rounded-r' : ''}`}>
                   <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"ฉันอยู่ในบล็อก IF"</span>)
                 </div>
               </div>
             </div>

             <div className="flex gap-2">
               <button onClick={() => setIndent(0)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent === 0 ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>0 เคาะ (ไม่ย่อหน้า)</button>
               <button onClick={() => setIndent(1)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent === 1 ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>2 เคาะ</button>
               <button onClick={() => setIndent(2)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent === 2 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>4 เคาะ (มาตรฐาน)</button>
             </div>
           </div>

           <div className="w-full md:w-1/2">
             <div className={`h-full p-6 rounded-2xl border-2 flex flex-col justify-center items-center text-center transition-all duration-500 ${status.type === 'error' ? 'bg-rose-950/50 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : status.type === 'warning' ? 'bg-amber-950/50 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-emerald-950/50 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
                {status.type === 'error' && <Bug className="w-12 h-12 text-rose-500 mb-4 animate-bounce" />}
                {status.type === 'warning' && <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />}
                {status.type === 'success' && <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />}
                
                <h5 className={`font-bold font-mono text-lg mb-2 ${status.type === 'error' ? 'text-rose-400' : status.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {status.error ? 'รันโค้ดพัง! (Syntax Error)' : 'รันโค้ดผ่าน!'}
                </h5>
                <p className="text-slate-300 text-sm leading-relaxed font-mono bg-black/40 px-4 py-2 rounded-lg">
                  {status.msg}
                </p>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};


export default function pyUnit4_10_IfCondition() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (If Condition):
1. ให้นักเรียนเขียนโปรแกรมรับค่าอายุ (age) 
2. ตรวจสอบเงื่อนไขว่า ถ้าอายุ >= 18 ให้พิมพ์ข้อความว่า "อนุญาตให้เข้าใช้งานระบบได้"
3. ทดสอบการรันโปรแกรมโดยใส่อายุ 20 และอายุ 15 ว่าได้ผลลัพธ์เหมือนหรือต่างกันอย่างไร (อธิบายหลักการของ if เชิงเดี่ยว)
4. ทดลองลบการย่อหน้า (Indentation) หน้าคำสั่ง print แล้วรันโปรแกรม บันทึกข้อความ Error ที่เกิดขึ้น`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-4xl font-black text-emerald-600 mb-4 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              สร้างทางเลือกให้โปรแกรมด้วย if
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              <strong>if (ถ้า)</strong> เป็นพื้นฐานที่สุดของการตัดสินใจ หากเงื่อนไขหลัง if เป็น <strong className="text-emerald-500">True</strong> โค้ดในบล็อกจะถูกดึงมาทำ แต่ถ้าเป็น <strong className="text-rose-500">False</strong> คอมพิวเตอร์จะเมินมันไปเลย!
            </p>
        </div>

        {/* 4.10.1 Simulator */}
        <SimpleIfSim />

        {/* 4.10.2 Indentation Simulator */}
        <IndentationSim />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
