import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Repeat, 
  Play,
  RotateCcw,
  AlertOctagon,
  Info,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const FlowLoopAnimator = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [animTrigger, setAnimTrigger] = useState(0);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0); // START

    // Start sequence
    setTimeout(() => {
      setActiveStep(1); // INIT: count = 1
      setCounter(1);
      setTimeout(() => {
        runLoop(1);
      }, 1000);
    }, 1000);
  };

  const runLoop = (currentCount) => {
    setActiveStep(2); // DECISION (count <= 3?)
    
    setTimeout(() => {
      if (currentCount <= 3) {
        // True Path
        setActiveStep(3); // PRINT count
        setTimeout(() => {
          setActiveStep(4); // count = count + 1
          setCounter(currentCount + 1);
          setTimeout(() => {
            setActiveStep(5); // LOOP BACK LINE
            setAnimTrigger(prev => prev + 1); // Trigger line pulse
            setTimeout(() => {
              runLoop(currentCount + 1); // Next iteration
            }, 800);
          }, 1000);
        }, 1000);
      } else {
        // False Path
        setActiveStep(6); // END
        setIsRunning(false);
        setIsDone(true);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setCounter(0);
    setIsDone(false);
  };

  const getShapeClass = (idx) => {
    if (activeStep === idx) return "border-orange-500 bg-orange-500/20 text-orange-300 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-10 transition-all duration-300";
    if (activeStep > idx && !isDone) return "border-orange-800 bg-orange-900/30 text-orange-600 transition-all duration-300";
    if (isDone) return "border-orange-800 bg-orange-900/30 text-orange-600";
    return "border-slate-600 bg-slate-800 text-slate-500";
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Repeat className="w-8 h-8 text-orange-400" />
          Loop Flow Animation: โปรแกรมนับเลข 1 ถึง 3
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          กดเริ่มทำงานเพื่อดู "เส้นย้อนกลับ (Loop Back)" ซึ่งเป็นหัวใจสำคัญของการเขียนผังงานแบบวนซ้ำ 
          โปรแกรมจะวนซ้ำจนกว่าเงื่อนไขนับเลขครบ 3 รอบ (count &gt; 3) แล้วจึงหลุดจากลูป
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-start min-h-[600px]">
        
        {/* Flowchart Column */}
        <div className="flex flex-col items-center w-full md:w-1/2 relative mt-4">
           
           {/* 0: START */}
           <div className={`w-32 h-12 rounded-full flex items-center justify-center border-4 relative ${getShapeClass(0)}`}>
             <span className="font-bold">START</span>
           </div>
           
           <div className={`w-1 h-6 transition-colors duration-300 ${activeStep >= 1 ? 'bg-orange-500' : 'bg-slate-700'}`}></div>

           {/* 1: INIT */}
           <div className={`w-36 h-12 flex items-center justify-center border-4 relative ${getShapeClass(1)}`}>
             <span className="font-bold">count = 1</span>
           </div>

           <div className={`w-1 h-6 transition-colors duration-300 ${activeStep >= 2 ? 'bg-orange-500' : 'bg-slate-700'}`}></div>

           {/* 2: DECISION */}
           <div className={`w-36 h-36 flex items-center justify-center border-4 rotate-45 relative ${getShapeClass(2)}`}>
             <span className="font-bold -rotate-45 text-sm">count &lt;= 3?</span>
           </div>

           {/* Branching from Decision */}
           <div className="relative w-full h-12">
             {/* TRUE Line (Down) */}
             <div className={`absolute top-0 left-1/2 w-1 h-12 transition-colors duration-300 ${activeStep >= 3 && !isDone ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
             <span className={`absolute top-2 left-[calc(50%+10px)] font-bold text-xs ${activeStep >= 3 && !isDone ? 'text-emerald-400' : 'text-slate-500'}`}>True</span>
             
             {/* FALSE Line (Right) */}
             <div className={`absolute top-[-72px] left-[calc(50%+72px)] w-24 h-1 transition-colors duration-300 ${isDone || activeStep === 6 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <span className={`absolute top-[-92px] left-[calc(50%+90px)] font-bold text-xs ${isDone || activeStep === 6 ? 'text-rose-400' : 'text-slate-500'}`}>False</span>
             <div className={`absolute top-[-72px] left-[calc(50%+168px)] w-1 h-[450px] transition-colors duration-300 ${isDone || activeStep === 6 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <div className={`absolute top-[378px] left-[calc(50%+10px)] w-[160px] h-1 transition-colors duration-300 ${isDone || activeStep === 6 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             
             {/* Note: The false line goes right, down a long way, and merges back at the bottom before END */}
           </div>

           {/* 3: PRINT */}
           <div className={`w-36 h-12 flex items-center justify-center border-4 -skew-x-[15deg] relative ${getShapeClass(3)}`}>
             <span className="font-bold skew-x-[15deg]">PRINT count</span>
           </div>

           <div className={`w-1 h-6 transition-colors duration-300 ${activeStep >= 4 && !isDone ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>

           {/* 4: UPDATE */}
           <div className={`w-40 h-12 flex items-center justify-center border-4 relative ${getShapeClass(4)}`}>
             <span className="font-bold">count = count + 1</span>
           </div>

           <div className={`w-1 h-12 transition-colors duration-300 ${activeStep === 5 ? 'bg-orange-500' : 'bg-slate-700'}`}></div>

           {/* 5: LOOP BACK PATH (Left Side) */}
           <div className="relative w-full h-8">
             <div className={`absolute top-[-48px] right-[calc(50%+80px)] w-24 h-1 transition-colors duration-300 ${activeStep === 5 ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-slate-700'} ${activeStep === 5 ? 'animate-pulse' : ''}`}></div>
             <div className={`absolute top-[-268px] right-[calc(50%+176px)] w-1 h-[220px] transition-colors duration-300 ${activeStep === 5 ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-slate-700'} ${activeStep === 5 ? 'animate-pulse' : ''}`}></div>
             <div className={`absolute top-[-268px] right-[calc(50%+72px)] w-[104px] h-1 transition-colors duration-300 ${activeStep === 5 ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-slate-700'} ${activeStep === 5 ? 'animate-pulse' : ''}`}></div>
             {/* Arrow head pointing to decision */}
             <div className={`absolute top-[-272px] right-[calc(50%+72px)] w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-b-[4px] border-b-transparent transition-colors duration-300 ${activeStep === 5 ? 'border-l-orange-500' : 'border-l-slate-700'}`}></div>
           </div>

           <div className={`w-1 h-6 transition-colors duration-300 ${isDone ? 'bg-rose-500' : 'bg-slate-700'}`}></div>

           {/* 6: END */}
           <div className={`w-32 h-12 rounded-full flex items-center justify-center border-4 relative ${getShapeClass(6)}`}>
             <span className="font-bold">END</span>
           </div>

        </div>

        {/* Control Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-sm">
           
           <div className="flex gap-4">
              <button 
                onClick={handleRun}
                disabled={isRunning || isDone}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-orange-500/20"
              >
                {isRunning ? <Repeat className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                {isRunning ? 'ระบบกำลังวนลูป...' : 'เริ่มโปรแกรม'}
              </button>
              <button 
                onClick={handleReset}
                disabled={isRunning}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl flex justify-center items-center transition-colors disabled:opacity-50 border border-slate-700"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
           </div>

           {/* Variable Monitor */}
           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner relative mt-4">
              <div className="absolute -top-3 left-6 bg-slate-800 text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                ตัวแปร (Variables)
              </div>
              <div className="flex justify-between items-center mt-2">
                 <span className="text-slate-400 font-mono text-lg">count</span>
                 <span className={`font-mono font-bold text-4xl transition-colors ${counter > 0 && !isDone ? 'text-orange-400 scale-110 origin-right' : 'text-slate-500'}`}>
                   {counter}
                 </span>
              </div>
           </div>
           
           {/* Terminal Output */}
           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner relative min-h-[160px]">
              <div className="absolute -top-3 left-6 bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                หน้าจอแสดงผล
              </div>
              <div className="mt-2 font-mono text-emerald-400 text-[15px] leading-loose flex flex-col">
                 {counter > 1 && <div>&gt; 1</div>}
                 {counter > 2 && <div>&gt; 2</div>}
                 {counter > 3 && <div>&gt; 3</div>}
                 {isDone && <div className="text-amber-400 mt-4 border-t border-slate-800 pt-2 animate-pulse">Program Finished.</div>}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

const pyUnit2_12_FlowLoop = () => {
  const teacherTaskContent = `
    ใบงาน "สร้างลูปไร้ที่สิ้นสุด (Infinity Loop)"
    1. ให้นักเรียนลองวาดผังงานแบบวนซ้ำ (WHILE) แบบสั้นๆ ที่วาดแล้ว "ไม่มีวันหลุดออกจากลูปได้เลย" (เป็นลูปนรก)
    2. จากนั้นให้ใช้ปากกาสีแดง วาดเพิ่มคำสั่งหรือสัญลักษณ์ลงไป เพื่อแก้ไขให้หลุดลูปได้อย่างถูกต้อง
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <Repeat className="w-10 h-10 text-orange-500" />
             ผังงานแบบวนซ้ำ (Looping Flowchart)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             การวนซ้ำคือท่าไม้ตายของคอมพิวเตอร์! ในผังงานจะไม่มีสัญลักษณ์พิเศษสำหรับการวนซ้ำโดยตรง 
             แต่เราจะใช้ <strong>"สี่เหลี่ยมข้าวหลามตัด (Decision) ร่วมกับการลากเส้นย้อนกลับไปด้านบน (Loop Back Line)"</strong> 
             เพื่อสร้างวงจร (Cycle) ให้ทำงานซ้ำๆ จนกว่าเงื่อนไขจะเป็นเท็จ
           </p>
        </div>

        {/* 2.12.1 Concept */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-10 items-center">
           <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                แนวคิดการหมุนวนของข้อมูล
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                ลองจินตนาการถึงรถแข่งที่วิ่งวนรอบสนาม การวนซ้ำในผังงานก็เหมือนกัน 
                จุดสำคัญที่สุดที่ทำให้มันต่างจาก <strong>ผังงานแบบตัดสินใจปกติ (IF)</strong> คือเส้นทางใดเส้นทางหนึ่ง (ปกติจะเป็นเส้น True) 
                จะต้อง <strong className="text-orange-600">ชี้สวนทางกลับขึ้นไปข้างบน</strong> เพื่อเชื่อมต่อกลับเข้าไปทำงานบล็อกเดิมซ้ำอีกครั้ง
              </p>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                 <strong className="text-orange-800 block mb-4 flex items-center gap-2"><AlertOctagon className="w-5 h-5"/> 3 สิ่งที่ต้องมีในลูปเสมอ:</strong>
                 <ul className="text-orange-700 leading-loose text-md space-y-3">
                   <li className="flex items-start gap-3"><span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-sm font-bold mt-1">1</span> <strong>จุดเริ่มต้น (Init):</strong> ต้องตั้งค่าเริ่มต้นตัวแปรก่อนเข้าลูปเสมอ</li>
                   <li className="flex items-start gap-3"><span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-sm font-bold mt-1">2</span> <strong>จุดตัดสินใจ (Decision):</strong> เงื่อนไขบอกว่าจะวนต่อ หรือหยุด</li>
                   <li className="flex items-start gap-3"><span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-sm font-bold mt-1">3</span> <strong>จุดเปลี่ยนแปลง (Update):</strong> ต้องมีกล่องประมวลผลให้ตัวแปรเปลี่ยนค่า (เช่น +1) ไม่งั้นจะกลายเป็นลูปนรก!</li>
                 </ul>
              </div>
           </div>
           <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1549474937-2fb33f7c9e01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Endless loop concept" 
                className="rounded-3xl shadow-xl object-cover h-[350px] w-full"
              />
           </div>
        </div>

        {/* 2.12.2 Simulator */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-orange-500 mt-20">
          จำลองการเขียนผังงานแบบวนซ้ำ (WHILE)
        </h3>
        
        <FlowLoopAnimator />

        <div className="bg-slate-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-16 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
           <div className="relative z-10 flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <CheckCircle2 className="w-8 h-8 text-emerald-400" />
               <h3 className="text-2xl font-bold text-white">ยินดีด้วย! คุณเรียนจบหน่วยที่ 2 แล้ว</h3>
             </div>
             <p className="text-slate-400 text-lg max-w-xl leading-loose">
               คุณได้เรียนรู้ทั้ง <strong>"รหัสเทียม (Pseudocode)"</strong> และ <strong>"ผังงาน (Flowchart)"</strong> ทั้ง 3 โครงสร้างหลักเรียบร้อยแล้ว (เรียงลำดับ, เลือกทำ, วนซ้ำ) 
               ตอนนี้คุณพร้อมที่จะนำอาวุธเหล่านี้ไปเขียนโปรแกรมภาษา Python ของจริงในหน่วยถัดไปแล้วครับ!
             </p>
           </div>
           <div className="relative z-10">
             <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-3 transition-transform hover:scale-105">
               ไปสู่หน่วยที่ 3 <ArrowRight className="w-6 h-6" />
             </button>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.12)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_12_FlowLoop;
