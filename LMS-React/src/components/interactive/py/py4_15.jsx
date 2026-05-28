import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useMemo } from 'react';
import { 
  Play,
  Code2,
  Settings2,
  ListOrdered,
  AlertCircle,
  MoveRight,
  Calculator,
  ChevronsRight,
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';

const RangeSimulator = () => {
  const [params, setParams] = useState({
    start: 0,
    stop: 10,
    step: 1
  });

  const [mode, setMode] = useState(1); 

  const updateParam = (key, val) => {
    setParams(prev => ({ ...prev, [key]: Number(val) }));
  };

  const generateRange = () => {
    let { start, stop, step } = params;
    
    if (mode === 1) {
      start = 0;
      step = 1;
    } else if (mode === 2) {
      step = 1;
    }

    const result = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        result.push(i);
        if (result.length > 50) break;
      }
    } else if (step < 0) {
      for (let i = start; i > stop; i += step) {
        result.push(i);
        if (result.length > 50) break;
      }
    }
    return result;
  };

  const result = useMemo(() => generateRange(), [params, mode]);

  // Derived display values for visualizer
  const activeStart = mode === 1 ? 0 : params.start;
  const activeStep = (mode === 1 || mode === 2) ? 1 : params.step;
  const activeStop = params.stop;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/50 rounded-tl-[100px] blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      {/* Configuration Panel */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-orange-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <Calculator className="w-5 h-5" /> 4.15.2 ปรับตั้งค่า Range
        </h4>
        
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(m => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-sans font-bold transition-all shadow-md active:scale-95 ${mode === m ? 'bg-orange-500 text-white shadow-orange-500/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              แบบ {m} พารามิเตอร์
            </button>
          ))}
        </div>
        
        <div className="mb-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col gap-6">
           {mode >= 2 && (
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-sans font-bold text-slate-400">จุดเริ่มต้น (Start)</label>
                 <input 
                   type="number" 
                   value={params.start}
                   onChange={(e) => updateParam('start', e.target.value)}
                   className="bg-slate-900 text-orange-400 w-24 px-3 py-2 rounded-lg outline-none border border-slate-600 focus:border-orange-500 transition-colors text-right font-bold text-xl shadow-inner"
                 />
               </div>
               <p className="text-xs font-sans text-slate-500">ค่าแรกที่จะปรากฏในลำดับ (รวมค่านี้)</p>
             </div>
           )}
           <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center">
               <label className="text-sm font-sans font-bold text-emerald-400">จุดสิ้นสุด (Stop)</label>
               <input 
                 type="number" 
                 value={params.stop}
                 onChange={(e) => updateParam('stop', e.target.value)}
                 className="bg-slate-900 text-emerald-400 w-24 px-3 py-2 rounded-lg outline-none border border-emerald-600/50 focus:border-emerald-500 transition-colors text-right font-bold text-xl shadow-inner"
               />
             </div>
             <p className="text-xs font-sans text-emerald-500/70 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900">
               *โปรแกรมจะ <strong>หยุดก่อนถึง</strong> ค่านี้เสมอ (ไม่รวมค่านี้เด็ดขาด!)
             </p>
           </div>
           {mode === 3 && (
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                 <label className="text-sm font-sans font-bold text-slate-400">ระยะก้าวเดิน (Step)</label>
                 <input 
                   type="number" 
                   value={params.step}
                   onChange={(e) => updateParam('step', e.target.value)}
                   className="bg-slate-900 text-sky-400 w-24 px-3 py-2 rounded-lg outline-none border border-slate-600 focus:border-sky-500 transition-colors text-right font-bold text-xl shadow-inner"
                 />
               </div>
               <p className="text-xs font-sans text-slate-500">ค่าบวก = เดินหน้า | ค่าลบ = ถอยหลัง (นับลง)</p>
             </div>
           )}
        </div>
        
        <div className="mt-auto flex flex-col gap-2 bg-black/40 p-6 rounded-2xl border border-slate-800">
          <div className="text-sm font-sans text-slate-500 mb-2">ตัวอย่างโค้ด:</div>
          <div className="transition-all duration-300 rounded text-xl">
             <span className="text-pink-500">for</span> <span className="text-blue-400">i</span> <span className="text-pink-500">in</span> <span className="text-purple-400 font-bold">range</span>(
               {mode === 1 && <span className="text-emerald-400 font-bold">{params.stop}</span>}
               {mode === 2 && <span><span className="text-orange-400 font-bold">{params.start}</span>, <span className="text-emerald-400 font-bold">{params.stop}</span></span>}
               {mode === 3 && <span><span className="text-orange-400 font-bold">{params.start}</span>, <span className="text-emerald-400 font-bold">{params.stop}</span>, <span className="text-sky-400 font-bold">{params.step}</span></span>}
             ):
          </div>
          <div className="ml-8 mt-1">
             <span className="text-yellow-200">print</span>(<span className="text-blue-400">i</span>)
          </div>
        </div>

      </div>

      {/* Output Panel */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        
        <h4 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
           <span className="flex items-center gap-2"><ListOrdered className="w-5 h-5 text-orange-500" /> ผลลัพธ์ (Output Sequence)</span>
           <span className="text-sm font-normal text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{result.length} ตัวเลข</span>
        </h4>

        {/* Visualized Steps Line */}
        <div className="mb-6 relative h-20 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner px-8">
           {result.length === 0 ? (
             <span className="text-slate-400 text-sm font-bold flex items-center gap-2">
               <AlertCircle className="w-4 h-4"/> ไม่เกิดการสร้างตัวเลข
             </span>
           ) : (
             <div className="flex items-center gap-1 w-full justify-between relative z-10">
               <div className="flex flex-col items-center">
                 <span className="text-xs font-bold text-orange-500 mb-1">Start</span>
                 <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center font-bold text-sm z-10">
                   {activeStart}
                 </div>
               </div>
               
               <div className="flex-1 border-b-2 border-dashed border-slate-300 relative mx-2">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full border border-sky-200 flex items-center gap-1">
                   {activeStep > 0 ? <TrendingUp className="w-3 h-3"/> : <TrendingDown className="w-3 h-3"/>}
                   ก้าวละ {activeStep}
                 </div>
               </div>
               
               <div className="flex flex-col items-center opacity-50 grayscale">
                 <span className="text-xs font-bold text-rose-500 mb-1">Stop Line</span>
                 <div className="w-8 h-8 rounded-lg bg-rose-50 border-2 border-rose-300 border-dashed flex items-center justify-center font-bold text-sm z-10">
                   {activeStop}
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Output Boxes */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-inner overflow-y-auto min-h-[300px]">
           {result.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
               <AlertCircle className="w-12 h-12 mb-2 text-rose-400" />
               <p className="text-center font-bold">พารามิเตอร์ขัดแย้งกัน!<br/>ไม่สามารถก้าวจาก {activeStart} ไปหา {activeStop} ด้วยก้าว {activeStep} ได้</p>
             </div>
           ) : (
             <div className="flex flex-wrap gap-2">
               {result.map((num, i) => (
                 <div key={i} className="w-14 h-14 flex items-center justify-center bg-orange-50 text-orange-700 font-black font-mono text-xl rounded-xl border-2 border-orange-200 shadow-sm transition-all hover:scale-110 hover:bg-orange-500 hover:text-white hover:border-orange-600 cursor-default">
                   {num}
                 </div>
               ))}
               {result.length > 50 && (
                 <div className="w-14 h-14 flex items-center justify-center text-slate-400 font-bold bg-slate-100 rounded-xl">...</div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_15_RangeFunction() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Range Function):
1. ให้นักเรียนเขียน for loop คู่กับ range() เพื่อพิมพ์ตัวเลขตั้งแต่ 1 ถึง 10
2. เขียนคำสั่งเพื่อพิมพ์เฉพาะเลขคู่ ตั้งแต่ 2 ถึง 20 (ใช้ Step)
3. เขียนคำสั่งเพื่อพิมพ์เลขนับถอยหลัง จาก 10 ลงมาถึง 1 (ใช้ Step ติดลบ)
4. อธิบายเหตุผลว่าทำไม \`range(5)\` ถึงสร้างเลข 0, 1, 2, 3, 4 แต่ไม่มีเลข 5 ?`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-orange-200 selection:text-orange-900">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-100/60 blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Theory Section */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12">
            <h3 className="text-4xl font-black text-orange-600 mb-6 tracking-tight leading-normal pb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 flex items-center gap-4">
              <ChevronsRight className="w-10 h-10 text-orange-500" />
              เสกตัวเลขด้วย range()
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-lg mb-8 max-w-3xl">
              ฟังก์ชัน <code className="bg-orange-50 text-orange-700 px-2 py-1 rounded font-bold">range()</code> คือเครื่องมือสร้าง "ลำดับตัวเลข" (Sequence of numbers) นิยมใช้คู่กับ <code className="bg-slate-100 px-1 rounded">for</code> เพื่อกำหนดจำนวนรอบการทำงาน โดยไม่ต้องสร้างตัวแปรมานั่งบวกค่าเองทีละหนึ่งเหมือน <code className="bg-slate-100 px-1 rounded">while</code>
            </p>

            <h4 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-4">
              4.15.1 รูปแบบพารามิเตอร์ (การเรียกใช้งาน 3 แบบ)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                 <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span> ใส่ค่าเดียว (Stop)</h5>
                 <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(5)</code>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   ถ้าระบุแค่ 1 ค่า ระบบจะมองว่านั่นคือ <strong>จุดสิ้นสุด (Stop)</strong><br/>
                   ระบบจะแอบตั้งค่าเริ่มต้น (Start) เป็น <strong className="text-orange-500">0</strong> ให้เสมอ
                 </p>
                 <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">0, 1, 2, 3, 4</div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                 <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span> ใส่สองค่า (Start, Stop)</h5>
                 <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(1, 6)</code>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   ระบุ <strong>จุดเริ่มต้น (Start)</strong> และ <strong>จุดสิ้นสุด (Stop)</strong><br/>
                   จำไว้ว่ามันจะหยุด <strong className="text-rose-500">"ก่อนถึง"</strong> เลข Stop เสมอ (ไม่รวมเลข 6)
                 </p>
                 <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">1, 2, 3, 4, 5</div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors">
                 <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">3</span> ใส่สามค่า (+ Step)</h5>
                 <code className="block bg-white p-3 rounded-xl border border-slate-200 font-bold text-orange-600 text-center shadow-sm mb-4">range(0, 10, 2)</code>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   ค่าที่สามคือ <strong>ระยะก้าว (Step)</strong><br/>
                   บอกว่าจะให้เพิ่มทีละเท่าไร (หรือลดทีละเท่าไรถ้าใส่ค่าติดลบ)
                 </p>
                 <div className="mt-4 font-mono text-sm bg-slate-200 px-3 py-2 rounded-lg text-slate-700 text-center">0, 2, 4, 6, 8</div>
              </div>
              
            </div>

            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 flex gap-4 items-start">
               <Info className="w-8 h-8 text-rose-500 shrink-0" />
               <div>
                 <h5 className="font-bold text-rose-800 mb-1">ทำไม Stop ถึงไม่ถูกรวม? (Exclusive Boundary)</h5>
                 <p className="text-rose-700/80 text-sm leading-relaxed">
                   เป็นรูปแบบดั้งเดิมของชาวโปรแกรมเมอร์ (0-indexed) การเขียนว่า <code>range(5)</code> แปลว่า <strong>"ขอตัวเลข 5 ตัว"</strong> ถ้าเริ่มนับจาก 0 มันก็จะไปจบที่ 4 (0, 1, 2, 3, 4 ได้ครบ 5 ตัวพอดี) ถ้ารวมเลข 5 ไปด้วย มันจะกลายเป็น 6 ตัว ซึ่งทำให้งงกว่าเดิมเวลาเอาไปประยุกต์ใช้กับตำแหน่ง (Index) ของ List
                 </p>
               </div>
            </div>

        </div>

        {/* Simulator */}
        <RangeSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
