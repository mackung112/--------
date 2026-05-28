import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play,
  RotateCcw,
  Code2,
  RefreshCw,
  List,
  Box,
  ArrowRight,
  Database,
  ArrowDownCircle
} from 'lucide-react';

const ForSimulator = () => {
  const [dataType, setDataType] = useState('list'); // 'list' or 'string'
  
  const [sim, setSim] = useState({
    currentIndex: -1,
    logs: [],
    isRunning: false
  });
  
  const timerRef = useRef(null);

  const listData = ["🍎", "🍌", "🍇", "🍉", "🍒"];
  const stringData = "PYTHON";

  const currentData = dataType === 'list' ? listData : stringData.split('');

  const resetSim = () => {
    setSim({
      currentIndex: -1,
      logs: [],
      isRunning: false
    });
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startSim = () => {
    resetSim();
    setSim(prev => ({ ...prev, isRunning: true }));
  };

  useEffect(() => {
    if (!sim.isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSim(prev => {
        let { currentIndex, logs, isRunning } = prev;
        
        let nextIndex = currentIndex + 1;
        if (nextIndex >= currentData.length) {
          isRunning = false;
        } else {
          let item = currentData[nextIndex];
          let formattedItem = dataType === 'list' ? `"${item}"` : `'${item}'`;
          logs = [...logs, `print(${formattedItem})`];
        }

        return { currentIndex: nextIndex, logs, isRunning };
      });
    }, 1200);

    return () => clearInterval(timerRef.current);
  }, [sim.isRunning, currentData, dataType]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-purple-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <Database className="w-5 h-5" /> 4.14.2 การดึงข้อมูลจากชุดข้อมูล (Iteration)
        </h4>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => {setDataType('list'); resetSim();}}
            disabled={sim.isRunning}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${dataType === 'list' ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <List className="w-4 h-4" /> ดึงจาก List (รายการ)
          </button>
          <button 
            onClick={() => {setDataType('string'); resetSim();}}
            disabled={sim.isRunning}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${dataType === 'string' ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            <Box className="w-4 h-4" /> ดึงจาก String (ข้อความ)
          </button>
        </div>
        
        <div className="bg-black/30 p-4 rounded-xl border border-slate-800 mb-6">
          <span className="text-blue-400">data</span> = {dataType === 'list' ? (
            <span>[<span className="text-emerald-400">"🍎"</span>, <span className="text-emerald-400">"🍌"</span>, <span className="text-emerald-400">"🍇"</span>, <span className="text-emerald-400">"🍉"</span>, <span className="text-emerald-400">"🍒"</span>]</span>
          ) : (
            <span className="text-emerald-400">"PYTHON"</span>
          )}
        </div>
        
        <div className="flex flex-col gap-1 relative text-xl bg-slate-800/50 p-6 rounded-2xl">
          <div className="transition-all duration-300 rounded p-1 relative">
             <span className="text-pink-500">for</span> <span className="text-amber-400">item</span> <span className="text-pink-500">in</span> <span className="text-blue-400">data</span>:
             {sim.currentIndex >= 0 && sim.currentIndex < currentData.length && (
               <div className="absolute -right-2 top-0 text-sm font-bold bg-amber-900/80 text-amber-400 px-3 py-1 rounded-lg border border-amber-500 shadow-lg animate-pulse">
                 item = {dataType === 'list' ? `"${currentData[sim.currentIndex]}"` : `'${currentData[sim.currentIndex]}'`}
               </div>
             )}
          </div>
          
          <div className={`ml-8 mt-2 transition-all duration-300 rounded p-1 ${(sim.isRunning && sim.currentIndex >= 0 && sim.currentIndex < currentData.length) ? 'bg-purple-900/60 outline outline-1 outline-purple-500/50' : ''}`}>
             <span className="text-yellow-200">print</span>(<span className="text-amber-400">item</span>)
          </div>
        </div>

        <div className="mt-8 flex gap-2">
            <button 
              onClick={startSim}
              disabled={sim.isRunning}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-5 h-5" /> เริ่มจำลองการทำงาน
            </button>
            <button 
              onClick={resetSim}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
        </div>

      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        
        {/* Visualized Collection */}
        <div className="mb-8">
           <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
             <ArrowDownCircle className="text-purple-500 w-5 h-5" /> แอนิเมชันการดึงข้อมูล
           </h4>
           <div className="bg-white border-2 border-purple-100 rounded-3xl p-6 flex items-center justify-center gap-3 min-h-[120px] shadow-inner relative overflow-hidden">
             {currentData.map((item, idx) => (
               <div 
                 key={idx}
                 className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-2xl transition-all duration-700 ${idx === sim.currentIndex ? 'bg-purple-500 text-white scale-125 shadow-[0_10px_20px_rgba(168,85,247,0.5)] -translate-y-4' : idx < sim.currentIndex ? 'bg-slate-200 text-slate-400 opacity-40 scale-90' : 'bg-slate-800 text-slate-300 shadow-md'}`}
               >
                 {item}
               </div>
             ))}
           </div>
        </div>

        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
           <RefreshCw className={`w-5 h-5 text-purple-500 ${sim.isRunning ? 'animate-spin' : ''}`} /> Terminal Output
        </h4>

        <div className="flex-1 bg-black rounded-xl p-6 font-mono text-emerald-400 shadow-inner overflow-y-auto max-h-[250px]">
           <div className="text-slate-500 text-sm mb-4">$ python loop_for.py</div>
           <div className="flex flex-col gap-2">
             {sim.logs.map((log, i) => (
               <div key={i} className="animate-[fade-in_0.3s_ease-out] flex items-center gap-2">
                 <ArrowRight className="w-4 h-4 text-purple-500 opacity-70" />
                 {log}
               </div>
             ))}
             {!sim.isRunning && sim.currentIndex >= currentData.length && (
               <div className="text-slate-500 mt-4 border-t border-slate-800 pt-2">Process finished with exit code 0.</div>
             )}
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default function pyUnit4_14_ForLoop() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (For Loop):
1. ให้นักเรียนสร้าง List เก็บชื่อเพื่อน 3 คน \`friends = ["สมชาย", "สมหญิง", "สมศักดิ์"]\`
2. ใช้ for loop เพื่อดึงชื่อเพื่อนออกมาทีละคน และพิมพ์ข้อความต้อนรับ เช่น "สวัสดี สมชาย!"
3. ลองนำ for loop ไปใช้กับ String ดูบ้าง เช่น \`for char in "PYTHON":\` แล้วสั่ง print(char) สังเกตผลลัพธ์ที่ได้
4. (Optional) เปรียบเทียบความแตกต่างของการเขียนลูป for ใน Python กับภาษา C/Java (เรื่อง For-Each)`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-purple-200 selection:text-purple-900">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-fuchsia-50/70 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Theory Section */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12">
           <h3 className="text-4xl font-black text-purple-600 mb-8 tracking-tight leading-normal pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-600 flex items-center gap-4">
             <List className="w-10 h-10 text-purple-500" /> ลูปทำงานซ้ำ for
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
              <div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">
                  4.14.1 โครงสร้างคำสั่ง for loop
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  คำสั่ง <code className="bg-purple-50 text-purple-700 px-2 py-1 rounded font-bold">for</code> ในภาษา Python นั้นแปลกกว่าภาษาอื่น เพราะมันถูกออกแบบมาให้ทำงานแบบ <strong>"For Each" (ดึงของออกมาทีละชิ้น)</strong> เสมอ! เราไม่ต้องมาคอยตั้งค่า <code>i = 0; i &lt; length; i++</code> อีกต่อไป
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner font-mono text-sm text-slate-300 leading-loose">
                   <span className="text-pink-500">for</span> <span className="text-amber-400">ตัวแปรรับค่า</span> <span className="text-pink-500">in</span> <span className="text-blue-400">ชุดข้อมูล</span>:<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># ตัวแปรจะเก็บค่าที่ถูกดึงออกมาในรอบนั้นๆ</span><br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># นำตัวแปรไปใช้งานได้เลย</span>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">
                  ทำงานร่วมกับอะไรได้บ้าง?
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100 flex items-start gap-4">
                     <div className="bg-fuchsia-200 text-fuchsia-700 p-3 rounded-lg"><List className="w-6 h-6"/></div>
                     <div>
                       <h5 className="font-bold text-fuchsia-900 mb-1">List (รายการข้อมูล)</h5>
                       <p className="text-sm text-fuchsia-800/80">จะดึงข้อมูลออกมาทีละ Index ตามลำดับจนครบทุกตัว เหมาะกับการประมวลผลข้อมูลจำนวนมาก</p>
                     </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-4">
                     <div className="bg-purple-200 text-purple-700 p-3 rounded-lg"><Box className="w-6 h-6"/></div>
                     <div>
                       <h5 className="font-bold text-purple-900 mb-1">String (ข้อความ)</h5>
                       <p className="text-sm text-purple-800/80">ข้อความถือเป็นชุดข้อมูลของตัวอักษร เมื่อใช้ for จะเป็นการดึงทีละ 1 ตัวอักษรออกมาใช้งาน</p>
                     </div>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Simulator */}
        <ForSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
