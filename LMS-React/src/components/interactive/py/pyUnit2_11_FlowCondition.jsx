import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  GitMerge, 
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  LockKeyhole
} from 'lucide-react';

const FlowConditionAnimator = () => {
  const [password, setPassword] = useState("");
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = () => {
    if (isRunning || password === "") return;
    setIsRunning(true);
    setResult(null);
    setActiveStep(0); // START

    setTimeout(() => {
      setActiveStep(1); // INPUT
      setTimeout(() => {
        setActiveStep(2); // DECISION
        setTimeout(() => {
          if (password === "1234") {
            setActiveStep(3); // TRUE PATH (PRINT SUCCESS)
            setTimeout(() => {
              setActiveStep(5); // END
              setResult(true);
              setIsRunning(false);
            }, 1000);
          } else {
            setActiveStep(4); // FALSE PATH (PRINT FAIL)
            setTimeout(() => {
              setActiveStep(5); // END
              setResult(false);
              setIsRunning(false);
            }, 1000);
          }
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setResult(null);
    setPassword("");
  };

  const getShapeClass = (idx) => {
    if (activeStep === idx) return "border-rose-500 bg-rose-500/20 text-rose-300 scale-110 shadow-[0_0_20px_rgba(244,63,114,0.4)] z-10 transition-all duration-300";
    if (activeStep > idx) return "border-rose-800 bg-rose-900/30 text-rose-600 transition-all duration-300";
    return "border-slate-600 bg-slate-800 text-slate-500";
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <GitMerge className="w-8 h-8 text-rose-400" />
          Decision Flow Animation: จำลองระบบ Login (IF-ELSE)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองป้อนรหัสผ่าน (รหัสที่ถูกคือ 1234) แล้วดูการทำงานของผังงาน 
          จะเห็นว่าเมื่อถึงสัญลักษณ์สี่เหลี่ยมขนมเปียกปูน (Decision) เส้นทางจะแยกออกเป็น 2 ทาง
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Input Control */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 mb-12 shadow-inner">
           <div className="flex items-center gap-3">
             <LockKeyhole className="w-6 h-6 text-rose-400" />
             <input 
               type="password" 
               placeholder="Enter Password..."
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               disabled={isRunning}
               className="bg-slate-950 border border-slate-600 focus:border-rose-500 rounded-xl px-4 py-2 text-white font-mono outline-none disabled:opacity-50"
             />
           </div>
           <div className="flex gap-3">
             <button 
               onClick={handleRun}
               disabled={isRunning || password === ""}
               className="bg-rose-500 hover:bg-rose-400 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-rose-500/20"
             >
               <Play className="w-5 h-5 fill-current" /> RUN
             </button>
             <button 
               onClick={handleReset}
               disabled={isRunning}
               className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
             >
               <RotateCcw className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Flowchart Diagram */}
        <div className="relative w-full max-w-3xl flex flex-col items-center min-h-[550px]">
           
           {/* Step 0: Start */}
           <div className={`w-32 h-12 rounded-full flex items-center justify-center border-4 relative ${getShapeClass(0)}`}>
             <span className="font-bold">START</span>
           </div>
           
           <div className={`w-1 h-8 transition-colors duration-300 ${activeStep >= 1 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
           
           {/* Step 1: Input */}
           <div className={`w-40 h-12 flex items-center justify-center border-4 -skew-x-[15deg] relative ${getShapeClass(1)}`}>
             <span className="font-bold skew-x-[15deg]">INPUT pass</span>
           </div>

           <div className={`w-1 h-8 transition-colors duration-300 ${activeStep >= 2 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>

           {/* Step 2: Decision */}
           <div className={`w-32 h-32 flex items-center justify-center border-4 rotate-45 relative ${getShapeClass(2)}`}>
             <span className="font-bold -rotate-45 text-sm whitespace-nowrap">pass == 1234?</span>
           </div>

           {/* Branches */}
           <div className="w-full relative h-40">
              
              {/* TRUE BRANCH (Left) */}
              <div className={`absolute top-0 left-1/2 w-[180px] h-1 -translate-x-[180px] transition-colors duration-300 ${activeStep === 3 || activeStep === 5 && result === true ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              <div className={`absolute top-0 left-[calc(50%-180px)] w-1 h-12 transition-colors duration-300 ${activeStep === 3 || activeStep === 5 && result === true ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              <span className={`absolute top-[-25px] left-[calc(50%-100px)] font-bold text-sm ${activeStep >= 3 && result === true ? 'text-emerald-400' : 'text-slate-500'}`}>Yes (True)</span>
              
              {/* Step 3: Output True */}
              <div className="absolute top-[48px] left-[calc(50%-240px)] w-full">
                <div className={`w-36 h-12 mx-auto flex items-center justify-center border-4 -skew-x-[15deg] relative ${activeStep === 3 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)] z-10' : activeStep > 3 && result === true ? 'border-emerald-800 bg-emerald-900/30 text-emerald-600' : 'border-slate-600 bg-slate-800 text-slate-500'}`}>
                  <span className="font-bold skew-x-[15deg]">PRINT "Success"</span>
                </div>
              </div>

              {/* FALSE BRANCH (Right) */}
              <div className={`absolute top-0 left-1/2 w-[180px] h-1 transition-colors duration-300 ${activeStep === 4 || activeStep === 5 && result === false ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              <div className={`absolute top-0 left-[calc(50%+180px)] w-1 h-12 transition-colors duration-300 ${activeStep === 4 || activeStep === 5 && result === false ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              <span className={`absolute top-[-25px] left-[calc(50%+60px)] font-bold text-sm ${activeStep >= 3 && result === false ? 'text-rose-400' : 'text-slate-500'}`}>No (False)</span>
              
              {/* Step 4: Output False */}
              <div className="absolute top-[48px] left-[calc(50%+60px)] w-full">
                <div className={`w-36 h-12 mx-auto flex items-center justify-center border-4 -skew-x-[15deg] relative ${getShapeClass(4)}`}>
                  <span className="font-bold skew-x-[15deg]">PRINT "Fail"</span>
                </div>
              </div>

              {/* Connecting back to END */}
              <div className={`absolute top-[96px] left-[calc(50%-180px)] w-1 h-12 transition-colors duration-300 ${activeStep === 5 && result === true ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              <div className={`absolute top-[96px] left-[calc(50%+180px)] w-1 h-12 transition-colors duration-300 ${activeStep === 5 && result === false ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              
              <div className={`absolute top-[144px] left-[calc(50%-180px)] w-[180px] h-1 transition-colors duration-300 ${activeStep === 5 && result === true ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              <div className={`absolute top-[144px] left-1/2 w-[180px] h-1 transition-colors duration-300 ${activeStep === 5 && result === false ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
              
              <div className={`absolute top-[144px] left-1/2 w-1 h-8 transition-colors duration-300 ${activeStep === 5 ? (result ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-700'}`}></div>
           </div>

           {/* Step 5: End */}
           <div className={`w-32 h-12 mt-8 rounded-full flex items-center justify-center border-4 relative ${getShapeClass(5)}`}>
             <span className="font-bold">END</span>
           </div>

        </div>
      </div>
    </div>
  );
};

const pyUnit2_11_FlowCondition = () => {
  const teacherTaskContent = `
    ใบงาน "ออกแบบเส้นทางเลือก"
    1. ให้นักเรียนวาดผังงาน (Flowchart) แบบ IF-ELSE เพื่อตรวจสอบว่าตัวเลขที่รับเข้ามา (Number) เป็นเลขคู่ หรือ เลขคี่
    (คำใบ้: ใช้สัญลักษณ์ Decision ตรวจสอบเงื่อนไข Number MOD 2 == 0)
    2. ระบุเส้นทาง Yes และ No ให้ชัดเจน
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <GitMerge className="w-10 h-10 text-rose-500" />
             ผังงานแบบเลือกทำ (Decision Flowchart)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             เมื่อโลกไม่ได้มีแค่ทางตรงเพียงอย่างเดียว โปรแกรมก็ต้องรู้จัก <strong>"การแยกแยะและตัดสินใจ"</strong> 
             ในผังงาน เราจะใช้สัญลักษณ์ <strong>สี่เหลี่ยมข้าวหลามตัด (Decision)</strong> เพื่อสร้างทางแยกให้กับข้อมูล 
             โดยจะต้องมีทางออก 2 ทางเสมอ คือ กรณีที่เงื่อนไขเป็นจริง (Yes/True) และกรณีที่เป็นเท็จ (No/False)
           </p>
        </div>

        {/* 2.11.1 IF and IF-ELSE */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-16 flex flex-col lg:flex-row gap-10 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full lg:w-1/2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">1</div>
                เงื่อนไขแบบ IF และ IF-ELSE
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                <strong>ผังงานแบบ IF (ทางเลือกเดียว):</strong> เมื่อเป็นจริง (Yes) ข้อมูลจะวิ่งไปทำกระบวนการบางอย่าง แต่ถ้าเป็นเท็จ (No) จะวิ่งอ้อมผ่านไปเลยโดยไม่ทำอะไร<br/><br/>
                <strong>ผังงานแบบ IF-ELSE (สองทางเลือก):</strong> จะมีกระบวนการรออยู่ทั้ง 2 ฝั่ง ไม่ว่าข้อมูลจะวิ่งไปทาง Yes หรือ No ก็จะต้องถูกประมวลผลก่อนกลับมารวมกันในเส้นทางหลัก
              </p>
              <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl">
                 <strong className="text-rose-800 block mb-2 flex items-center gap-2"><HelpCircle className="w-5 h-5"/> กฎสำคัญ:</strong>
                 <p className="text-rose-700 leading-loose text-sm">
                   เส้นทางที่แยกออกไปจาก Decision <strong>ต้องกลับมารวมกัน (Merge) เสมอ</strong> ก่อนจะไหลไปยังคำสั่งถัดไป หรือไปยังจุดสิ้นสุด (END) ไม่ควรปล่อยให้เส้นหายไปเฉยๆ
                 </p>
              </div>
           </div>
           <div className="w-full lg:w-1/2 flex justify-center">
             <div className="relative w-full max-w-sm h-80 bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 flex flex-col items-center">
                <div className="text-slate-400 font-mono text-xs uppercase mb-4">IF-ELSE Structure</div>
                
                <div className="w-1 h-6 bg-slate-600"></div>
                <div className="w-24 h-24 border-2 border-rose-500 bg-rose-500/20 rotate-45 flex items-center justify-center relative">
                  <span className="-rotate-45 text-rose-300 font-bold text-xs">Condition?</span>
                </div>
                
                <div className="w-full relative h-32 mt-[-10px]">
                  {/* Left branch */}
                  <div className="absolute top-4 left-1/4 w-[25%] h-1 bg-slate-600"></div>
                  <div className="absolute top-4 left-1/4 w-1 h-8 bg-slate-600"></div>
                  <span className="absolute top-0 left-[35%] text-[10px] text-slate-400 font-bold">Yes</span>
                  <div className="absolute top-12 left-[12.5%] w-20 h-10 border-2 border-blue-400 bg-blue-500/20 flex items-center justify-center text-blue-300 text-[10px]">Process A</div>
                  <div className="absolute top-[88px] left-1/4 w-1 h-8 bg-slate-600"></div>
                  <div className="absolute top-[120px] left-1/4 w-[25%] h-1 bg-slate-600"></div>
                  
                  {/* Right branch */}
                  <div className="absolute top-4 right-1/4 w-[25%] h-1 bg-slate-600"></div>
                  <div className="absolute top-4 right-1/4 w-1 h-8 bg-slate-600"></div>
                  <span className="absolute top-0 right-[35%] text-[10px] text-slate-400 font-bold">No</span>
                  <div className="absolute top-12 right-[12.5%] w-20 h-10 border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center text-amber-300 text-[10px]">Process B</div>
                  <div className="absolute top-[88px] right-1/4 w-1 h-8 bg-slate-600"></div>
                  <div className="absolute top-[120px] right-1/4 w-[25%] h-1 bg-slate-600"></div>
                  
                  {/* Merge */}
                  <div className="absolute top-[120px] left-1/2 w-1 h-8 bg-slate-600"></div>
                  <div className="absolute top-[148px] left-1/2 w-2 h-2 rounded-full bg-rose-500 -translate-x-1/2"></div>
                </div>
             </div>
           </div>
        </div>

        {/* Simulator */}
        <FlowConditionAnimator />

        {/* 2.11.2 Nested Flowchart */}
        <div className="mb-16 mt-20">
           <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-purple-500">
             เงื่อนไขแบบซ้อนทับ (Nested Flowchart)
           </h3>
           <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-10 items-center">
             <div className="w-full md:w-1/2">
                <p className="text-slate-600 leading-loose text-lg mb-6">
                  เหมือนกับการเขียนโปรแกรม (IF ซ้อน IF) ในผังงานเราก็สามารถวาด <strong>"สี่เหลี่ยมข้าวหลามตัด ซ้อนกันหลายๆ อัน"</strong> ได้ 
                  โดยนำสัญลักษณ์ Decision ไปวางไว้บนเส้นทาง Yes หรือ No ของเงื่อนไขก่อนหน้า 
                  เพื่อใช้ตรวจสอบข้อมูลที่ซับซ้อน เช่น การตัดเกรด A, B, C, D, F ซึ่งมีหลายเงื่อนไขต่อเนื่องกัน
                </p>
                <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl mb-4">
                  <strong className="text-purple-800 block mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> ข้อควรระวัง:</strong>
                  <p className="text-purple-700 leading-loose text-sm">
                    ผังงานแบบซ้อนทับ มักจะกินพื้นที่หน้ากระดาษกว้างมากทางแนวนอน จึงต้องวางแผนการจัดเรียงกล่องและลากเส้นให้ดี เพื่อไม่ให้เส้นตัดกันจนดูสับสน
                  </p>
                </div>
             </div>
             <div className="w-full md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Complex branching logic" 
                  className="rounded-2xl shadow-lg object-cover h-[250px] w-full"
                />
             </div>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.11)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_11_FlowCondition;
