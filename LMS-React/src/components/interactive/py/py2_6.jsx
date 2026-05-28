import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Repeat, 
  RotateCw, 
  Battery, 
  BatteryCharging, 
  BatteryMedium,
  BatteryLow,
  PackageCheck,
  Play,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  Box,
  CheckCircle2
} from 'lucide-react';

const LoopSimulator = () => {
  const [loopType, setLoopType] = useState('while'); // 'while' or 'for'
  
  // While loop state
  const [energy, setEnergy] = useState(3);
  const [laps, setLaps] = useState(0);
  const [runningWhile, setRunningWhile] = useState(false);

  // For loop state
  const [boxes, setBoxes] = useState([false, false, false, false, false]);
  const [currentBox, setCurrentBox] = useState(-1);
  const [runningFor, setRunningFor] = useState(false);

  // Handlers
  const handleRunWhile = () => {
    if (energy <= 0 || runningWhile) return;
    setRunningWhile(true);
    
    // Simulate one loop execution
    setTimeout(() => {
      setLaps(prev => prev + 1);
      setEnergy(prev => prev - 1);
      setRunningWhile(false);
    }, 1000);
  };

  const handleResetWhile = () => {
    setEnergy(3);
    setLaps(0);
  };

  const handleRunFor = () => {
    if (runningFor) return;
    setRunningFor(true);
    setBoxes([false, false, false, false, false]);
    setCurrentBox(0);
  };

  const handleResetFor = () => {
    setBoxes([false, false, false, false, false]);
    setCurrentBox(-1);
    setRunningFor(false);
  };

  // For loop effect
  useEffect(() => {
    if (runningFor && currentBox < 5 && currentBox >= 0) {
      const timer = setTimeout(() => {
        setBoxes(prev => {
          const newBoxes = [...prev];
          newBoxes[currentBox] = true;
          return newBoxes;
        });
        setCurrentBox(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentBox >= 5) {
      setRunningFor(false);
    }
  }, [runningFor, currentBox]);

  const BatteryIcon = () => {
    if (energy === 3) return <BatteryCharging className="w-12 h-12 text-emerald-500" />;
    if (energy === 2) return <BatteryMedium className="w-12 h-12 text-amber-500" />;
    if (energy === 1) return <BatteryLow className="w-12 h-12 text-orange-500" />;
    return <Battery className="w-12 h-12 text-rose-500 opacity-50" />;
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <RotateCw className="w-8 h-8 text-orange-400" />
          Interactive Loop Visualizer
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          เปรียบเทียบการทำงานระหว่าง WHILE Loop (ทำไปเรื่อยๆ จนกว่าพลังงานจะหมด) 
          และ FOR Loop (ทำตามจำนวนรอบที่ระบุไว้ชัดเจน)
        </p>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-xl flex gap-2">
           <button 
             onClick={() => setLoopType('while')}
             className={`px-6 py-2 rounded-lg font-bold transition-colors ${loopType === 'while' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
             WHILE Loop
           </button>
           <button 
             onClick={() => setLoopType('for')}
             className={`px-6 py-2 rounded-lg font-bold transition-colors ${loopType === 'for' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
             FOR Loop
           </button>
        </div>
      </div>

      {/* Visualizers */}
      <div className="relative z-10">
        
        {/* WHILE LOOP VIEW */}
        {loopType === 'while' && (
          <div className="flex flex-col md:flex-row gap-8 bg-slate-800 p-8 rounded-2xl border border-slate-700">
             <div className="flex-1">
               <h4 className="text-orange-400 font-bold mb-4 flex items-center gap-2">
                 <RotateCw className="w-5 h-5" /> การวิ่งออกกำลังกาย
               </h4>
               <p className="text-slate-300 text-sm leading-loose mb-6">
                 "ตราบใดที่ยังมีพลังงานเหลือ (energy &gt; 0) ให้วิ่งต่อไปทีละ 1 รอบ"
               </p>
               
               <div className="bg-slate-900 p-6 rounded-xl flex justify-around items-center mb-6">
                 <div className="text-center">
                   <div className="text-slate-500 text-xs mb-2 font-mono">Energy</div>
                   <div className="flex justify-center"><BatteryIcon /></div>
                   <div className="text-white font-bold text-xl mt-2">{energy}</div>
                 </div>
                 <div className="text-center">
                   <div className="text-slate-500 text-xs mb-2 font-mono">Laps (วิ่งไปแล้ว)</div>
                   <div className="text-orange-400 font-bold text-5xl">{laps}</div>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <button 
                   onClick={handleRunWhile}
                   disabled={runningWhile || energy <= 0}
                   className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50 transition-colors"
                 >
                   {runningWhile ? <RotateCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                   จำลองการวิ่ง 1 รอบ
                 </button>
                 <button 
                   onClick={handleResetWhile}
                   className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-xl flex justify-center items-center transition-colors"
                 >
                   <RotateCcw className="w-5 h-5" />
                 </button>
               </div>
             </div>

             <div className="flex-1 bg-slate-950 p-6 rounded-xl font-mono text-sm leading-loose border border-slate-800">
                <div className="text-slate-500 mb-2">// Pseudocode</div>
                <div className="text-sky-400">SET <span className="text-slate-300">energy = 3</span></div>
                <div className="text-sky-400">SET <span className="text-slate-300">laps = 0</span></div>
                <br/>
                <div className={`transition-all ${energy > 0 ? 'text-orange-400 font-bold scale-105 origin-left' : 'text-slate-600'}`}>
                  WHILE <span className="text-slate-300">energy &gt; 0</span> DO
                </div>
                <div className={`pl-6 transition-colors ${runningWhile ? 'text-white' : 'text-slate-400'}`}>
                  PRINT "วิ่ง 1 รอบ"
                </div>
                <div className={`pl-6 transition-colors ${runningWhile ? 'text-white' : 'text-slate-400'}`}>
                  COMPUTE laps = laps + 1
                </div>
                <div className={`pl-6 transition-colors ${runningWhile ? 'text-rose-400' : 'text-slate-400'}`}>
                  COMPUTE energy = energy - 1
                </div>
                <div className="text-orange-400">END WHILE</div>
             </div>
          </div>
        )}

        {/* FOR LOOP VIEW */}
        {loopType === 'for' && (
          <div className="flex flex-col md:flex-row gap-8 bg-slate-800 p-8 rounded-2xl border border-slate-700">
             <div className="flex-1">
               <h4 className="text-sky-400 font-bold mb-4 flex items-center gap-2">
                 <PackageCheck className="w-5 h-5" /> การประทับตรากล่องสินค้า
               </h4>
               <p className="text-slate-300 text-sm leading-loose mb-6">
                 "รู้จำนวนที่แน่นอนอยู่แล้วว่ามีกล่อง 5 ใบ ก็ทำซ้ำจำนวน 5 ครั้ง"
               </p>
               
               <div className="bg-slate-900 p-6 rounded-xl mb-6">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-sm font-mono">Current Box (i)</span>
                    <span className="text-sky-400 font-bold text-2xl">{currentBox >= 0 && currentBox < 5 ? currentBox + 1 : currentBox >= 5 ? 'Done' : '-'}</span>
                 </div>
                 <div className="flex justify-between">
                    {boxes.map((isStamped, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                         <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${isStamped ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110' : currentBox === idx ? 'bg-sky-500/20 border-sky-500 border-dashed animate-pulse' : 'bg-slate-800 border-slate-600 text-slate-600'}`}>
                           {isStamped ? <CheckCircle2 className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                         </div>
                         <span className="text-xs text-slate-500 font-mono">#{idx+1}</span>
                      </div>
                    ))}
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <button 
                   onClick={handleRunFor}
                   disabled={runningFor}
                   className="flex-1 bg-sky-500 hover:bg-sky-400 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-50 transition-colors"
                 >
                   {runningFor ? <RotateCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                   เริ่มประทับตราอัตโนมัติ
                 </button>
                 <button 
                   onClick={handleResetFor}
                   disabled={runningFor}
                   className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-xl flex justify-center items-center transition-colors disabled:opacity-50"
                 >
                   <RotateCcw className="w-5 h-5" />
                 </button>
               </div>
             </div>

             <div className="flex-1 bg-slate-950 p-6 rounded-xl font-mono text-sm leading-loose border border-slate-800">
                <div className="text-slate-500 mb-2">// Pseudocode</div>
                <br/>
                <div className={`transition-all ${runningFor ? 'text-sky-400 font-bold scale-105 origin-left' : 'text-slate-600'}`}>
                  FOR <span className="text-slate-300">i = 1 TO 5</span> DO
                </div>
                <div className={`pl-6 transition-colors ${runningFor ? 'text-emerald-400' : 'text-slate-400'}`}>
                  PRINT "ประทับตรากล่องใบที่ ", i
                </div>
                <div className="text-sky-400">END FOR</div>
                <br/>
                <div className="text-slate-500 text-xs italic mt-4">
                  *ใน For Loop ตัวแปร i จะเพิ่มค่าตัวเอง<br/>
                  ทีละ 1 อัตโนมัติในแต่ละรอบ จนถึง 5
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

const pyUnit2_6_PseudoLoop = () => {
  const teacherTaskContent = `
    ให้นักเรียนเขียนรหัสเทียมแบบวนซ้ำ (Loop) จากโจทย์ต่อไปนี้:
    1. เขียนโปรแกรมให้นับเลข 1 ถึง 10 ออกทางหน้าจอ (ควรใช้ FOR หรือ WHILE?)
    2. เขียนโปรแกรมรับรหัสผ่าน (Password) ถ้ารหัสผิด ให้ถามใหม่ไปเรื่อยๆ จนกว่าจะถูก (ควรใช้ FOR หรือ WHILE?)
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <Repeat className="w-10 h-10 text-orange-500" />
             รหัสเทียมแบบวนซ้ำ (Looping)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             คอมพิวเตอร์เก่งมากเรื่องการทำงานซ้ำๆ เดิมๆ ได้เป็นล้านครั้งโดยไม่เหนื่อยและไม่บ่น 
             ในการเขียนโปรแกรม หากเรามีคำสั่งที่ต้องทำซ้ำๆ เราจะไม่เขียนคำสั่งเดิมซ้ำกันหลายบรรทัด 
             แต่เราจะใช้ <strong>"โครงสร้างการวนซ้ำ (Loop)"</strong> เข้ามาช่วย เพื่อให้โค้ดสั้นลงและทำงานได้อัตโนมัติ
           </p>
        </div>

        {/* 2.6.1 WHILE LOOP */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-12 flex flex-col lg:flex-row gap-10 items-center">
           <div className="w-full lg:w-3/5">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">1</div>
                การวนซ้ำแบบรู้เงื่อนไข (WHILE LOOP)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                <strong>WHILE</strong> (ตราบใดที่) เป็นลูปที่จะทำซ้ำไปเรื่อยๆ <strong>ตราบใดที่เงื่อนไขยังคงเป็นจริง (True)</strong> 
                มักใช้ในกรณีที่เรา "ไม่ทราบจำนวนรอบที่แน่นอน" ว่าต้องทำกี่รอบกันแน่ รู้แค่ว่าถ้าเข้าเงื่อนไขก็ให้ทำไปเรื่อยๆ
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                 <strong className="text-orange-800 block mb-2">ตัวอย่างการใช้งาน:</strong>
                 <ul className="list-disc ml-5 text-orange-700 leading-loose text-sm space-y-1">
                   <li>ตักน้ำใส่โอ่ง ไปเรื่อยๆ <span className="font-bold underline">จนกว่า</span> น้ำจะเต็มโอ่ง</li>
                   <li>ให้ผู้ใช้ป้อนรหัสผ่านซ้ำๆ <span className="font-bold underline">ตราบใดที่</span> ยังป้อนรหัสผิดอยู่</li>
                 </ul>
              </div>
           </div>
           <div className="w-full lg:w-2/5">
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-loose shadow-xl">
                 <div className="text-slate-500 mb-2">// โครงสร้าง WHILE</div>
                 <div className="text-sky-400">WHILE <span className="text-orange-300">condition is true</span> DO</div>
                 <div className="pl-6 text-slate-300">statement 1</div>
                 <div className="pl-6 text-slate-300">statement 2</div>
                 <div className="text-sky-400">END WHILE</div>
              </div>
           </div>
        </div>

        {/* 2.6.2 FOR LOOP */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-12 flex flex-col lg:flex-row gap-10 items-center">
           <div className="w-full lg:w-2/5 order-2 lg:order-1">
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-loose shadow-xl">
                 <div className="text-slate-500 mb-2">// โครงสร้าง FOR</div>
                 <div className="text-sky-400">FOR <span className="text-blue-300">i = 1 TO 10</span> DO</div>
                 <div className="pl-6 text-slate-300">statement 1</div>
                 <div className="pl-6 text-slate-300">statement 2</div>
                 <div className="text-sky-400">END FOR</div>
              </div>
           </div>
           <div className="w-full lg:w-3/5 order-1 lg:order-2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                การวนซ้ำแบบรู้จำนวนรอบ (FOR LOOP)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                <strong>FOR</strong> (สำหรับรอบที่...) เป็นลูปที่จะทำซ้ำตาม <strong>จำนวนรอบที่กำหนดไว้อย่างชัดเจน</strong> 
                มักจะมี "ตัวแปรนับรอบ" (เช่น i) ที่คอยนับว่าตอนนี้ทำถึงรอบที่เท่าไหร่แล้ว ลูปประเภทนี้เขียนง่ายและจัดการรอบได้สะดวก
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                 <strong className="text-blue-800 block mb-2">ตัวอย่างการใช้งาน:</strong>
                 <ul className="list-disc ml-5 text-blue-700 leading-loose text-sm space-y-1">
                   <li>วิ่งรอบสนาม จำนวน 5 รอบเป๊ะๆ</li>
                   <li>สั่งพิมพ์ข้อความ "Happy Birthday" จำนวน 10 บรรทัด</li>
                 </ul>
              </div>
           </div>
        </div>

        {/* Simulator */}
        <LoopSimulator />

        {/* 2.6.3 Prevent Infinity Loop */}
        <div className="bg-rose-50 rounded-[2.5rem] p-10 md:p-14 border border-rose-200 shadow-lg mb-16 flex flex-col md:flex-row gap-10 items-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="w-full md:w-1/3 flex justify-center relative z-10">
              <AlertTriangle className="w-32 h-32 text-rose-500 animate-pulse" />
           </div>
           <div className="w-full md:w-2/3 relative z-10">
              <h3 className="text-3xl font-bold text-rose-800 mb-4">
                ระวัง! ลูปนรก (Infinity Loop)
              </h3>
              <p className="text-rose-900 text-lg leading-loose mb-6">
                การกำหนดจุดสิ้นสุดการวนซ้ำ (Termination Condition) เป็นสิ่งที่โปรแกรมเมอร์ต้องระวังให้มาก 
                โดยเฉพาะในการใช้ <strong>WHILE LOOP</strong> หากเราไม่เขียนคำสั่งเพื่อเปลี่ยนแปลงค่าของเงื่อนไขเลย 
                เงื่อนไขนั้นก็จะ "เป็นจริงตลอดกาล" ทำให้โปรแกรมค้างและทำงานวนซ้ำไปไม่มีวันจบ
              </p>
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
                 <div className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                   <Lightbulb className="w-5 h-5 text-amber-500" /> วิธีกำหนดจุดสิ้นสุดที่ถูกต้อง
                 </div>
                 <p className="text-slate-600 leading-relaxed text-sm">
                   ภายในบล็อกของ WHILE จะต้องมี <strong className="text-rose-600">อย่างน้อย 1 บรรทัด</strong> ที่คอยปรับปรุงค่าตัวแปร (Update Variable) 
                   เพื่อให้ถึงจุดหนึ่ง เงื่อนไขนั้นจะกลายเป็นเท็จ (False) และหลุดออกจากลูปได้ (เช่น ในตัวอย่างการวิ่ง มีการเขียน <code>energy = energy - 1</code> เอาไว้เสมอ)
                 </p>
              </div>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.6)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_6_PseudoLoop;
