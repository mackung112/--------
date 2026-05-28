import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Play,
  Code2,
  ListOrdered,
  ArrowDownUp,
  AlertOctagon,
  ShieldAlert,
  MoveDown
} from 'lucide-react';

// Sub-component for 4.11.1
const ElifSimulator = () => {
  const [score, setScore] = useState(75);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState('');

  const runCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
    
    setTimeout(() => setActiveStep(1), 500); 
    
    setTimeout(() => {
      if (score >= 80) {
        setResult('ได้เกรด A');
        setHasPlayed(true);
      } else {
        setActiveStep(2); 
        setTimeout(() => {
          if (score >= 70) {
            setResult('ได้เกรด B');
            setHasPlayed(true);
          } else {
            setActiveStep(3); 
            setTimeout(() => {
              if (score >= 60) {
                setResult('ได้เกรด C');
                setHasPlayed(true);
              } else {
                setActiveStep(4); 
                setHasPlayed(true);
              }
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
  };

  const resetCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-100/50 rounded-br-full blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-sky-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <ListOrdered className="w-5 h-5" /> 4.11.1 โครงสร้างคำสั่ง elif 
        </h4>
        
        <div>
          <span className="text-blue-400">score</span> = <input 
            type="number" 
            value={score}
            onChange={(e) => {setScore(Number(e.target.value)); resetCode();}}
            className="bg-slate-800 text-amber-400 w-20 px-2 py-1 rounded outline-none border border-slate-700 focus:border-sky-500 transition-colors inline-block"
          />
        </div>
        
        <div className="mt-4 flex flex-col gap-1 relative">
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 1 ? 'bg-slate-700 outline outline-1 outline-slate-500' : ''}`}>
             <span className="text-pink-500">if</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">80</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 1 || (hasPlayed && score >= 80)) && score >= 80 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด A"</span>)
             </div>
          </div>
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 2 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 2 || (hasPlayed && score >= 70 && score < 80)) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">70</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 2 || (hasPlayed && score >= 70 && score < 80)) && score >= 70 && score < 80 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด B"</span>)
             </div>
          </div>

          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 3 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 3 || (hasPlayed && score >= 60 && score < 70)) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">60</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 3 || (hasPlayed && score >= 60 && score < 70)) && score >= 60 && score < 70 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด C"</span>)
             </div>
          </div>

        </div>

        <div className="mt-8 pt-4 flex gap-4">
           <button 
             onClick={runCode}
             disabled={activeStep > 0 && !hasPlayed}
             className="flex-1 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
           >
             <Play className="w-5 h-5" /> รันโค้ดแบบทีละขั้น
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
           ลำดับการตรวจสอบ
        </h4>

        <div className="flex-1 flex flex-col gap-4">
          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 1 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 1</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 80</div>
             {activeStep > 1 || (hasPlayed && score >= 80) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 80 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 2 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 2</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 70</div>
             {activeStep > 2 || (hasPlayed && score >= 70 && score < 80) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 70 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 3 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 3</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 60</div>
             {activeStep > 3 || (hasPlayed && score >= 60 && score < 70) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 60 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 60 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className="mt-auto bg-black rounded-xl p-6 min-h-[120px] font-mono text-emerald-400 shadow-inner flex flex-col justify-end">
             <div className="text-slate-500 text-sm mb-2 mt-auto">$ python grader.py</div>
             <div>{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for 4.11.2 Priority / Short-circuit Bug
const PrioritySim = () => {
  const [isWrongOrder, setIsWrongOrder] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [result, setResult] = useState('');
  
  const score = 85;

  const runCode = () => {
    if (isWrongOrder) {
      if (score >= 50) setResult('เกรด D (ซึ่งผิด!)');
      else if (score >= 80) setResult('เกรด A');
    } else {
      if (score >= 80) setResult('เกรด A');
      else if (score >= 50) setResult('เกรด D');
    }
    setHasPlayed(true);
  };

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white flex flex-col lg:flex-row gap-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col">
        <h4 className="text-xl font-bold text-rose-400 mb-2 flex items-center gap-2"><ShieldAlert /> 4.11.2 การจัดลำดับความสำคัญ</h4>
        <p className="text-slate-400 mb-6 text-sm">การทำงานของ if-elif จะหยุดทันทีที่เจอเงื่อนไขที่เป็น <strong>True อันแรก (Short-circuit)</strong> ดังนั้น <strong>ต้องเอาเงื่อนไขที่แคบกว่า/ยากกว่า ขึ้นก่อนเสมอ</strong></p>
        
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col gap-3 relative">
           
           <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-700">
             <span className="text-blue-400 font-mono">score</span>
             <span className="text-amber-400 font-mono font-bold bg-black px-4 py-1 rounded">85</span>
           </div>

           <div className="relative mt-2">
             <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-slate-600 border-l border-dashed z-0"></div>
             
             {isWrongOrder ? (
               // WRONG ORDER
               <div className="flex flex-col gap-2 relative z-10 font-mono bg-rose-950/30 p-2 rounded-xl border border-rose-900/50">
                 <div className="bg-slate-900 p-3 rounded-lg border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                   <span className="text-pink-500">if</span> score &gt;= <span className="text-amber-400">50</span>: <span className="text-slate-500 text-xs ml-2"># เงื่อนไขกว้างเกินไป</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด D"</span>)</div>
                 </div>
                 <div className="flex justify-center text-rose-500"><MoveDown className="w-4 h-4" /></div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 opacity-50">
                   <span className="text-pink-500">elif</span> score &gt;= <span className="text-amber-400">80</span>: <span className="text-slate-500 text-xs ml-2"># ไม่มีวันมาถึง!</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด A"</span>)</div>
                 </div>
               </div>
             ) : (
               // CORRECT ORDER
               <div className="flex flex-col gap-2 relative z-10 font-mono bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/50">
                 <div className="bg-slate-900 p-3 rounded-lg border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                   <span className="text-pink-500">if</span> score &gt;= <span className="text-amber-400">80</span>: <span className="text-slate-500 text-xs ml-2"># เงื่อนไขแคบสุดขึ้นก่อน</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด A"</span>)</div>
                 </div>
                 <div className="flex justify-center text-emerald-500"><MoveDown className="w-4 h-4" /></div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                   <span className="text-pink-500">elif</span> score &gt;= <span className="text-amber-400">50</span>:
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด D"</span>)</div>
                 </div>
               </div>
             )}
           </div>

           <button 
             onClick={() => { setIsWrongOrder(!isWrongOrder); setHasPlayed(false); setResult(''); }}
             className="mt-2 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
           >
             <ArrowDownUp className="w-4 h-4" /> สลับลำดับบล็อกโค้ด
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center">
         <button 
           onClick={runCode}
           className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-6 transition-all active:scale-95 shadow-lg ${isWrongOrder ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'}`}
         >
           <Play className="w-5 h-5" /> รันโค้ดด้วยคะแนน 85
         </button>
         
         <div className="w-full bg-black rounded-xl p-6 font-mono border-t-4 border-slate-700 min-h-[140px] flex flex-col">
            <span className="text-slate-500 text-sm mb-2">Output:</span>
            {hasPlayed && (
              <div className={`text-2xl font-bold animate-[fade-in_0.3s_ease-out] ${isWrongOrder ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result}
              </div>
            )}
            {hasPlayed && isWrongOrder && (
              <div className="mt-4 text-sm text-rose-300/80 leading-snug">
                🚨 ผิดพลาด! แม้ว่า 85 จะมากกว่า 80 แต่โปรแกรมทำงานบรรทัด `score >= 50` ก่อน ซึ่งเป็น True เลยออกจากการเช็คไปเลย!
              </div>
            )}
            {hasPlayed && !isWrongOrder && (
              <div className="mt-4 text-sm text-emerald-300/80 leading-snug">
                ✅ ถูกต้อง! โปรแกรมเช็ค `score >= 80` เป็น True จึงได้เกรด A และไม่ไปเช็คบรรทัดอื่นต่อ
              </div>
            )}
         </div>
      </div>
    </div>
  );
};


export default function pyUnit4_11_ElifCondition() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Elif Condition):
1. ให้นักเรียนเขียนโปรแกรมตรวจสอบอุณหภูมิ (temp)
2. ถ้า temp > 35 พิมพ์ "อากาศร้อนมาก"
3. ถ้า temp > 25 พิมพ์ "อากาศปกติ"
4. ถ้า temp > 15 พิมพ์ "อากาศเย็น"
5. ทดสอบใส่ค่า temp เป็น 28 และสังเกตลำดับการตรวจสอบของโปรแกรมว่า เช็คเงื่อนไขที่ 2 แล้วทำไมถึงไม่ไปเช็คเงื่อนไขที่ 3 ต่อ? (อธิบายเรื่องการหลุดออกจากโครงสร้างเมื่อเจอเงื่อนไขที่เป็นจริง)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-sky-100/60 blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-4xl font-black text-sky-600 mb-4 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              จัดการหลายทางเลือกด้วย elif
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              <code className="bg-sky-50 text-sky-700 px-2 py-1 rounded font-bold">elif</code> ย่อมาจาก <strong>else if</strong> มีไว้เพิ่มเงื่อนไขทางเลือก แต่มีข้อควรระวังสำคัญคือ <strong>มันจะถูกพิจารณาจากบนลงล่าง และถ้าเจออันไหนจริง มันจะทำแค่อันนั้นแล้วหยุดทันที!</strong>
            </p>
        </div>

        {/* 4.11.1 Simulator */}
        <ElifSimulator />

        {/* 4.11.2 Priority Simulator */}
        <PrioritySim />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
