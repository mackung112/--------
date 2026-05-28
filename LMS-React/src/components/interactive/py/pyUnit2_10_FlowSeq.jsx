import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ArrowDownCircle, 
  Play,
  RotateCcw,
  CheckCircle2,
  BoxSelect,
  MousePointer2
} from 'lucide-react';

const SequentialAnimator = () => {
  const [activeStep, setActiveStep] = useState(-1); // -1 means not started
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { type: 'start', text: 'START' },
    { type: 'input', text: 'READ width' },
    { type: 'input', text: 'READ height' },
    { type: 'process', text: 'area = width * height' },
    { type: 'output', text: 'PRINT area' },
    { type: 'end', text: 'END' }
  ];

  // Logic data to show during animation
  const logicState = [
    { w: '-', h: '-', a: '-' }, // step 0 (START)
    { w: '5', h: '-', a: '-' },  // step 1 (READ w)
    { w: '5', h: '10', a: '-' }, // step 2 (READ h)
    { w: '5', h: '10', a: '50' },// step 3 (Process area)
    { w: '5', h: '10', a: '50' },// step 4 (PRINT area)
    { w: '5', h: '10', a: '50' } // step 5 (END)
  ];

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(-1);
  };

  useEffect(() => {
    if (isRunning && activeStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (activeStep >= steps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, activeStep]);

  const renderShape = (step, idx) => {
    const isActive = activeStep === idx;
    const isPast = activeStep > idx;
    
    // Default colors (not reached yet)
    let shapeClass = "border-2 border-slate-600 bg-slate-800 text-slate-500 shadow-sm";
    let textClass = "font-bold text-sm text-slate-400";
    
    if (isActive) {
      shapeClass = "border-4 border-emerald-500 bg-emerald-500/20 text-emerald-300 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)] z-10 transition-all duration-300";
      textClass = "font-bold text-[15px] text-white";
    } else if (isPast) {
      shapeClass = "border-2 border-emerald-800 bg-emerald-900/30 text-emerald-600 transition-all duration-300";
      textClass = "font-bold text-sm text-emerald-500";
    }

    if (step.type === 'start' || step.type === 'end') {
      return (
        <div className={`w-32 h-12 rounded-full flex items-center justify-center ${shapeClass} relative`}>
          {isActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>}
          <span className={textClass}>{step.text}</span>
        </div>
      );
    } else if (step.type === 'input' || step.type === 'output') {
      return (
        <div className={`w-36 h-12 flex items-center justify-center -skew-x-[15deg] ${shapeClass} relative`}>
          {isActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping skew-x-[15deg]"></div>}
          <span className={`${textClass} skew-x-[15deg]`}>{step.text}</span>
        </div>
      );
    } else if (step.type === 'process') {
      return (
        <div className={`w-40 h-14 flex items-center justify-center rounded-md ${shapeClass} relative`}>
          {isActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>}
          <span className={textClass}>{step.text}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ArrowDownCircle className="w-8 h-8 text-emerald-400" />
          Sequential Animation: โปรแกรมคำนวณพื้นที่สี่เหลี่ยม
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองกดปุ่ม Play เพื่อดูการทำงานของผังงานแบบเรียงลำดับ โปรแกรมจะไหลจากบนลงล่างทีละสเต็ป 
          พร้อมจำลองการเปลี่ยนแปลงของตัวแปรด้านขวามือ
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-center md:items-start min-h-[500px]">
        
        {/* Flowchart Column */}
        <div className="flex flex-col items-center w-full md:w-1/2 relative">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {renderShape(step, idx)}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center my-1 relative">
                  <div className={`w-1 h-6 transition-colors duration-300 ${activeStep > idx ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                  <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-b-[6px] border-b-transparent rotate-90 absolute top-5 -translate-x-[0.5px] transition-colors duration-300 ${activeStep > idx ? 'border-l-emerald-500' : 'border-l-slate-700'}`}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Data & Control Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-sm">
           
           <div className="flex gap-4">
              <button 
                onClick={handleRun}
                disabled={isRunning || activeStep >= steps.length - 1}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-500/20"
              >
                {isRunning ? <ArrowDownCircle className="w-5 h-5 animate-bounce" /> : <Play className="w-5 h-5 fill-current" />}
                {isRunning ? 'กำลังทำงาน...' : 'เริ่มโปรแกรม'}
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

           {/* Variable State Monitor */}
           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner relative mt-4">
              <div className="absolute -top-3 left-6 bg-slate-800 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                Data Monitor
              </div>
              
              <div className="flex flex-col gap-4 mt-2">
                 <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400 font-mono text-sm">width (กว้าง)</span>
                    <span className={`font-mono font-bold text-xl transition-colors ${activeStep >= 1 ? 'text-sky-400' : 'text-slate-600'}`}>
                      {activeStep >= 0 ? logicState[activeStep].w : '-'}
                    </span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400 font-mono text-sm">height (ยาว)</span>
                    <span className={`font-mono font-bold text-xl transition-colors ${activeStep >= 2 ? 'text-sky-400' : 'text-slate-600'}`}>
                      {activeStep >= 0 ? logicState[activeStep].h : '-'}
                    </span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-400 font-mono text-sm">area (พื้นที่)</span>
                    <span className={`font-mono font-bold text-2xl transition-colors ${activeStep >= 3 ? 'text-amber-400 scale-110 origin-right' : 'text-slate-600'}`}>
                      {activeStep >= 0 ? logicState[activeStep].a : '-'}
                    </span>
                 </div>
              </div>
           </div>
           
           {/* Terminal Output */}
           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner relative min-h-[120px]">
              <div className="absolute -top-3 left-6 bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                Terminal Output
              </div>
              <div className="mt-2 font-mono text-emerald-400 text-[15px] leading-loose">
                 {activeStep >= 1 && <div>&gt; Input width: 5</div>}
                 {activeStep >= 2 && <div>&gt; Input height: 10</div>}
                 {activeStep >= 4 && <div className="text-amber-400 mt-2 animate-pulse">&gt; Area is 50</div>}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

const pyUnit2_10_FlowSeq = () => {
  const teacherTaskContent = `
    ใบงาน "นักแปลงร่าง"
    1. ครูจะมีรหัสเทียม (Pseudocode) แบบเรียงลำดับให้ 1 ข้อ เช่น "รับค่าน้ำหนัก ส่วนสูง และคำนวณ BMI"
    2. ให้นักเรียนแปลรหัสเทียมนั้น ออกมาเป็น "ผังงาน (Flowchart) แบบเรียงลำดับ" ลงในกระดาษ
    3. ตรวจสอบให้แน่ใจว่าใช้สัญลักษณ์ถูกต้อง และลูกศรชี้ลงมาเป็นทางเดียว
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <ArrowDownCircle className="w-10 h-10 text-emerald-500" />
             ผังงานแบบเรียงลำดับ (Sequential Flowchart)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             นี่คือโครงสร้างพื้นฐานที่สุดของการเขียนโปรแกรม โครงสร้างแบบเรียงลำดับ (Sequence Structure) 
             คือการทำงานแบบเส้นตรง <strong>วิ่งจากบนลงล่าง (Top-Down) ทีละคำสั่ง</strong> โดยไม่มีการข้ามขั้นตอน ไม่มีการย้อนกลับ และไม่มีทางแยกใดๆ ทั้งสิ้น
           </p>
        </div>

        {/* 2.10.1 Concept */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-16 flex flex-col md:flex-row gap-10 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full md:w-1/2 flex justify-center">
             <div className="relative w-64 h-80 bg-emerald-50 rounded-3xl border-4 border-emerald-100 flex flex-col items-center justify-center p-6">
                <div className="w-12 h-6 border-2 border-emerald-400 rounded-full flex items-center justify-center text-[10px] text-emerald-600 font-bold mb-2">START</div>
                <div className="w-1 h-4 bg-emerald-300"></div>
                <div className="w-16 h-8 border-2 border-emerald-400 -skew-x-[15deg] flex items-center justify-center text-[10px] text-emerald-600 font-bold my-2">INPUT A</div>
                <div className="w-1 h-4 bg-emerald-300"></div>
                <div className="w-16 h-8 border-2 border-emerald-400 flex items-center justify-center text-[10px] text-emerald-600 font-bold my-2">PROCESS</div>
                <div className="w-1 h-4 bg-emerald-300"></div>
                <div className="w-16 h-8 border-2 border-emerald-400 -skew-x-[15deg] flex items-center justify-center text-[10px] text-emerald-600 font-bold my-2">OUTPUT</div>
                <div className="w-1 h-4 bg-emerald-300"></div>
                <div className="w-12 h-6 border-2 border-emerald-400 rounded-full flex items-center justify-center text-[10px] text-emerald-600 font-bold mt-2">END</div>
                
                {/* Arrow animation overlay */}
                <div className="absolute top-10 left-[50%] -translate-x-[0.5px] w-1 h-64 overflow-hidden pointer-events-none">
                  <div className="w-full h-8 bg-gradient-to-b from-transparent to-emerald-500 animate-[drop_3s_infinite]"></div>
                </div>
             </div>
           </div>
           <div className="w-full md:w-1/2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                แนวคิดการทำงานแบบลำดับจากบนลงล่าง
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                เปรียบเสมือนการอ่านหนังสือภาษาไทย ที่เราต้องอ่านจากบรรทัดบนสุด ไล่ลงมาทีละบรรทัดจนถึงบรรทัดล่างสุด 
                โปรแกรมจะทำคำสั่งที่ 1 เสร็จ ค่อยไปทำคำสั่งที่ 2 และ 3 ตามลำดับ 
                โครงสร้างนี้ <strong>จะไม่มีสัญลักษณ์รูปข้าวหลามตัด (Decision)</strong> ปรากฏอยู่เลย
              </p>
              <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200">
                 <strong className="text-slate-700 block mb-2 flex items-center gap-2"><BoxSelect className="w-5 h-5 text-emerald-500"/> ลักษณะเด่น:</strong>
                 <ul className="list-disc ml-5 text-slate-600 leading-loose text-sm space-y-1">
                   <li>ทำงานตามลำดับคำสั่งเป๊ะๆ</li>
                   <li>ทุกคำสั่งจะถูกรันอย่างแน่นอน 1 ครั้ง (ไม่มีการข้าม)</li>
                   <li>เหมาะสำหรับโปรแกรมคำนวณง่ายๆ ที่ไม่มีเงื่อนไขซับซ้อน</li>
                 </ul>
              </div>
           </div>
        </div>

        {/* 2.10.2 Example Simulator */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-emerald-500 mt-20">
          ตัวอย่างการเขียนผังงานแบบเรียงลำดับ
        </h3>
        
        <SequentialAnimator />

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-2xl mb-16 flex items-start gap-6 shadow-sm mt-10">
           <MousePointer2 className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
           <div>
             <h4 className="text-xl font-bold text-emerald-800 mb-3">สรุปโครงสร้างแบบเรียงลำดับ</h4>
             <p className="text-emerald-900 leading-loose">
               ถึงแม้ว่าโปรแกรมนี้จะดูเรียบง่าย แต่ในโลกความเป็นจริง ซอฟต์แวร์ที่ซับซ้อนก็เกิดจากการนำ 
               "บล็อกคำสั่งแบบเรียงลำดับ" เล็กๆ จำนวนมาก ไปประกอบเข้ากับเงื่อนไขและการวนซ้ำ 
               ดังนั้นการเข้าใจพื้นฐานการไหลของข้อมูล (Data Flow) แบบบรรทัดต่อบรรทัด จึงเป็นพื้นฐานที่สำคัญที่สุดของโปรแกรมเมอร์
             </p>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.10)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_10_FlowSeq;
