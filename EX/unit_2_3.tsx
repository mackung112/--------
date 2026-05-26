import React, { useState } from 'react';
import { 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  ArrowDown,
  Info,
  Code2,
  TerminalSquare,
  BoxSelect,
  Diamond,
  CircleDot,
  MousePointer2,
  Lightbulb
} from 'lucide-react';

// --- Shared Components ---

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-fuchsia-50 rounded-2xl text-fuchsia-600 border border-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-600 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]'
            }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

// --- Interactive Simulator ---

const FlowchartSimulator = () => {
  const [activeNode, setActiveNode] = useState(null);

  const nodesInfo = {
    start: {
      type: "Terminal (จุดเริ่มต้น/สิ้นสุด)",
      shapeClass: "rounded-full",
      desc: "ใช้สำหรับกำหนดจุดเริ่มต้น (Start) และจุดสิ้นสุด (End) ของโปรแกรม ทุกผังงานต้องมีและมีเพียง 1 จุดเริ่มต้นเท่านั้น",
      code: "# โปรแกรมเริ่มทำงาน\ndef main():",
      color: "from-emerald-400 to-teal-500"
    },
    input: {
      type: "Input/Output (รับ/แสดงผล)",
      shapeClass: "skew-x-[-15deg]",
      desc: "สี่เหลี่ยมด้านขนาน ใช้รับข้อมูลจากผู้ใช้ (เช่น การพิมพ์คีย์บอร์ด) หรือแสดงผลข้อมูลทั่วไปที่ไม่ได้ระบุอุปกรณ์เฉพาะเจาะจง",
      code: "score = int(input('กรอกคะแนน: '))",
      color: "from-blue-400 to-cyan-500"
    },
    decision: {
      type: "Decision (การตัดสินใจ)",
      shapeClass: "rotate-45",
      desc: "สี่เหลี่ยมขนมเปียกปูน ใช้เมื่อมีเงื่อนไขให้เลือก (ใช่/ไม่ใช่) จะต้องมีลูกศรชี้ออก 2 ทางเสมอ (True และ False)",
      code: "if score >= 50:\n    # ทำเมื่อจริง\nelse:\n    # ทำเมื่อเท็จ",
      color: "from-amber-400 to-orange-500"
    },
    process: {
      type: "Process (กระบวนการ/คำนวณ)",
      shapeClass: "rounded-lg",
      desc: "สี่เหลี่ยมผืนผ้า ใช้สำหรับคำสั่งคำนวณ ประมวลผล หรือกำหนดค่าตัวแปรต่างๆ",
      code: "status = 'สอบผ่าน'\n# หรือ\nresult = a + b",
      color: "from-fuchsia-400 to-purple-500"
    },
    output: {
      type: "Input/Output (รับ/แสดงผล)",
      shapeClass: "skew-x-[-15deg]",
      desc: "สี่เหลี่ยมด้านขนาน ในกรณีนี้ใช้เพื่อแสดงผลลัพธ์ (เช่น พิมพ์ออกทางหน้าจอ)",
      code: "print(status)",
      color: "from-blue-400 to-cyan-500"
    }
  };

  const handleNodeClick = (nodeKey) => {
    setActiveNode(nodeKey);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] z-0 pointer-events-none opacity-40 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400 transition-all duration-1000"></div>
      
      <div className="relative z-10 text-center mb-10">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-200 bg-white/70 shadow-sm mb-4 text-fuchsia-600 text-sm font-bold">
          <MousePointer2 className="w-4 h-4" /> Interactive Visualizer
        </div>
        <h3 className="text-3xl font-bold text-slate-800">
          จำลองการอ่านผังงาน (Flowchart)
        </h3>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">ลองคลิกที่ <strong>"สัญลักษณ์"</strong> ในผังงานด้านซ้าย เพื่อดูความหมายและโค้ด Python ที่ตรงกันทางด้านขวา</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left: The Flowchart Canvas */}
        <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-200 rounded-[2rem] p-8 flex flex-col items-center shadow-inner relative">
           
           {/* Flowchart Elements */}
           <div className="flex flex-col items-center w-full relative py-4">
             
             {/* 1. Start */}
             <button onClick={() => handleNodeClick('start')} className={`w-32 h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 shadow-md transition-all hover:scale-105 rounded-full z-10 relative ${activeNode === 'start' ? 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'border-slate-300 hover:border-emerald-300'}`}>
               Start
             </button>
             
             {/* Line */}
             <div className="w-0.5 h-6 bg-slate-400 z-0"></div>
             <ArrowDown className="w-5 h-5 text-slate-400 -mt-2 z-10" />

             {/* 2. Input */}
             <button onClick={() => handleNodeClick('input')} className={`relative w-36 h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 shadow-md transition-all hover:scale-105 skew-x-[-15deg] z-10 ${activeNode === 'input' ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]' : 'border-slate-300 hover:border-blue-300'}`}>
                <span className="skew-x-[15deg]">รับค่า score</span>
             </button>

             {/* Line */}
             <div className="w-0.5 h-6 bg-slate-400 z-0"></div>
             <ArrowDown className="w-5 h-5 text-slate-400 -mt-2 z-10" />

             {/* 3. Decision & Branches */}
             <div className="relative flex flex-col items-center w-full">
               {/* Diamond */}
               <button onClick={() => handleNodeClick('decision')} className={`w-24 h-24 bg-white border-4 flex items-center justify-center shadow-md transition-all hover:scale-105 rotate-45 z-10 relative ${activeNode === 'decision' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'border-slate-300 hover:border-amber-300'}`}>
                  <span className="-rotate-45 font-bold text-slate-700 text-center text-sm">score &gt;= 50</span>
               </button>
               
               {/* Horizontal Branching Lines (Top 12 is 48px which is exact center of h-24) */}
               <div className="absolute top-12 right-1/2 w-[110px] h-0.5 bg-slate-400 z-0 pointer-events-none"></div>
               <div className="absolute top-12 left-1/2 w-[110px] h-0.5 bg-slate-400 z-0 pointer-events-none"></div>
               
               {/* Yes/No Labels */}
               <div className="absolute top-[22px] right-[calc(50%+45px)] text-xs font-bold text-emerald-600 bg-slate-50 px-1 z-10">Yes</div>
               <div className="absolute top-[22px] left-[calc(50%+45px)] text-xs font-bold text-rose-600 bg-slate-50 px-1 z-10">No</div>

               {/* Vertical Drop Lines */}
               <div className="absolute top-12 right-[calc(50%+110px-1px)] w-0.5 h-[50px] bg-slate-400 z-0 pointer-events-none"></div>
               <div className="absolute top-12 left-[calc(50%+110px-1px)] w-0.5 h-[50px] bg-slate-400 z-0 pointer-events-none"></div>
               
               {/* Arrow Heads for branches */}
               <ArrowDown className="absolute top-[86px] right-[calc(50%+110px-10px)] w-5 h-5 text-slate-400 z-10 pointer-events-none" />
               <ArrowDown className="absolute top-[86px] left-[calc(50%+110px-10px)] w-5 h-5 text-slate-400 z-10 pointer-events-none" />
             </div>

             {/* 4. Processes (Left and Right) */}
             <div className="flex justify-between w-[220px] mt-1 relative z-10">
                <button onClick={() => handleNodeClick('process')} className={`w-[90px] h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 text-xs shadow-md transition-all hover:scale-105 rounded-lg -ml-[45px] ${activeNode === 'process' ? 'border-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.5)]' : 'border-slate-300 hover:border-fuchsia-300'}`}>
                  "สอบผ่าน"
                </button>
                <button onClick={() => handleNodeClick('process')} className={`w-[90px] h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 text-xs shadow-md transition-all hover:scale-105 rounded-lg -mr-[45px] ${activeNode === 'process' ? 'border-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.5)]' : 'border-slate-300 hover:border-fuchsia-300'}`}>
                  "สอบตก"
                </button>
             </div>

             {/* 5. Bottom Connecting Lines */}
             <div className="relative flex flex-col items-center w-full h-[40px]">
               {/* Vertical drop lines from processes */}
               <div className="absolute top-0 right-[calc(50%+110px-1px)] w-0.5 h-[20px] bg-slate-400 z-0 pointer-events-none"></div>
               <div className="absolute top-0 left-[calc(50%+110px-1px)] w-0.5 h-[20px] bg-slate-400 z-0 pointer-events-none"></div>
               
               {/* Horizontal joining line */}
               <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[220px] h-0.5 bg-slate-400 z-0 pointer-events-none"></div>
               
               {/* Center vertical line going down */}
               <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-0.5 h-[20px] bg-slate-400 z-0 pointer-events-none"></div>
               
               {/* Arrow down to Output */}
               <ArrowDown className="absolute top-[30px] left-1/2 -translate-x-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
             </div>

             {/* 6. Output */}
             <button onClick={() => handleNodeClick('output')} className={`relative w-36 h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 shadow-md transition-all hover:scale-105 skew-x-[-15deg] z-10 ${activeNode === 'output' ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]' : 'border-slate-300 hover:border-blue-300'}`}>
                 <span className="skew-x-[15deg]">พิมพ์ผลลัพธ์</span>
             </button>
             
             {/* Line */}
             <div className="w-0.5 h-6 bg-slate-400 z-0"></div>
             <ArrowDown className="w-5 h-5 text-slate-400 -mt-2 z-10" />

             {/* 7. End */}
             <button onClick={() => handleNodeClick('start')} className={`w-32 h-12 bg-white border-4 flex items-center justify-center font-bold text-slate-700 shadow-md transition-all hover:scale-105 rounded-full z-10 relative ${activeNode === 'start' ? 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'border-slate-300 hover:border-emerald-300'}`}>
               End
             </button>

           </div>
        </div>

        {/* Right: Info Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {activeNode ? (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden animate-fade-in">
              {/* Dynamic Gradient Top border */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${nodesInfo[activeNode].color}`}></div>
              
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-slate-400" />
                <h3 className="text-2xl font-bold text-slate-800">{nodesInfo[activeNode].type}</h3>
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {nodesInfo[activeNode].desc}
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-fuchsia-400" />
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest">เทียบกับโค้ด Python</h4>
                </div>
                <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed">
                  {nodesInfo[activeNode].code}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-white/50 border-2 border-dashed border-slate-300 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <MousePointer2 className="w-10 h-10 text-slate-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-slate-500 mb-2">คลิกที่สัญลักษณ์ในผังงาน</h3>
              <p className="text-slate-400">เพื่อดูคำอธิบายและตัวอย่างโค้ดในภาษาระดับสูง</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "แปลงเรื่องราวเป็นผังงาน"

สถานการณ์: เครื่องกดน้ำอัตโนมัติ (Vending Machine)
- น้ำเปล่าราคา 10 บาท, น้ำอัดลมราคา 15 บาท
- ถ้ายอดเงินที่หยอด >= ราคาน้ำ ให้จ่ายน้ำ และ ทอนเงิน (ถ้ามี)
- ถ้ายอดเงินที่หยอด < ราคาน้ำ ให้แสดงข้อความ "เงินไม่พอ" และ คืนเงิน

คำสั่ง:
ให้นักเรียนวาดผังงาน (Flowchart) ของการทำงานเครื่องกดน้ำนี้ โดยใช้สัญลักษณ์มาตรฐาน ANSI (วาดลงในกระดาษ หรือโปรแกรม draw.io)
โดยต้องมีสัญลักษณ์ครบทั้ง:
1. Terminal (เริ่ม/จบ)
2. Input (รับเงิน/เลือกน้ำ)
3. Decision (ตรวจสอบเงินพอหรือไม่)
4. Process (คำนวณเงินทอน)
5. Output (จ่ายน้ำ/ทอนเงิน/แสดงข้อความ)`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-fuchsia-200 selection:text-fuchsia-900">
      
      {/* Complex Vibrant Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-300/30 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-400/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-amber-300/20 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-20 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 mb-4 uppercase flex items-center gap-2">
              <span className="bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">Unit 2.3</span>
              ขั้นตอนการเขียนโปรแกรม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4">
              สัญลักษณ์ผังงาน <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500">
                (Flowchart Symbols)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-amber-400 pl-6 mt-4 relative">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              เมื่อเราคิด "อัลกอริทึม" ได้แล้ว การเขียนอธิบายเป็นตัวหนังสือยาวๆ อาจทำให้ทีมงานสับสนได้ <strong>ผังงาน (Flowchart)</strong> จึงเป็นเหมือน "ภาษาสากล" หรือพิมพ์เขียว (Blueprint) ที่โปรแกรมเมอร์ทั่วโลกใช้สื่อสารกระบวนการทำงานให้เห็นภาพชัดเจนที่สุด
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* 2.3.1 สัญลักษณ์มาตรฐานสากล */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-cyan-500">2.3.1</span> สัญลักษณ์มาตรฐานสากล (ANSI)
          </h2>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-xl relative overflow-hidden group">
             <p className="text-slate-600 mb-8 text-lg">
              สถาบันมาตรฐานแห่งชาติของสหรัฐอเมริกา (ANSI - American National Standards Institute) ได้กำหนดสัญลักษณ์สากล เพื่อให้ทุกคนวาดผังงานแล้วสื่อความหมายตรงกัน สัญลักษณ์หลักๆ ที่ต้องจำให้แม่น มีดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Symbol: Terminal */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-32 h-10 border-4 border-emerald-400 bg-emerald-50 rounded-full group-hover/card:scale-110 transition-transform shadow-md"></div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Terminal</h3>
                <p className="text-sm text-emerald-600 font-bold text-center mb-2">จุดเริ่มต้น / สิ้นสุด</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">ใช้กำกับจุดเริ่มต้น (Start) และจุดสิ้นสุด (End) ของโปรแกรม <em>(แคปซูล)</em></p>
              </div>

              {/* Symbol: Process */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-fuchsia-300 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-28 h-14 border-4 border-fuchsia-400 bg-fuchsia-50 rounded-md group-hover/card:scale-110 transition-transform shadow-md"></div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Process</h3>
                <p className="text-sm text-fuchsia-600 font-bold text-center mb-2">ประมวลผล / คำนวณ</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">ใช้สำหรับคำสั่งคำนวณทางคณิตศาสตร์ หรือกำหนดค่าให้ตัวแปร <em>(สี่เหลี่ยมผืนผ้า)</em></p>
              </div>

              {/* Symbol: Input/Output */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-28 h-12 border-4 border-blue-400 bg-blue-50 skew-x-[-20deg] group-hover/card:scale-110 transition-transform shadow-md"></div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Input / Output</h3>
                <p className="text-sm text-blue-600 font-bold text-center mb-2">รับ / แสดงข้อมูล (ทั่วไป)</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">รับค่าหรือแสดงผล โดยไม่ระบุอุปกรณ์เฉพาะเจาะจง <em>(สี่เหลี่ยมด้านขนาน)</em></p>
              </div>

              {/* Symbol: Decision */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-300 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 border-4 border-amber-400 bg-amber-50 rotate-45 group-hover/card:scale-110 transition-transform shadow-md"></div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Decision</h3>
                <p className="text-sm text-amber-600 font-bold text-center mb-2">การตัดสินใจ / เงื่อนไข</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">ตรวจสอบเงื่อนไข จะมีทางแยกออก 2 ทางเสมอ (ใช่/ไม่ใช่) <em>(สี่เหลี่ยมขนมเปียกปูน)</em></p>
              </div>

              {/* Symbol: Flowline */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-400 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                   <div className="flex items-center group-hover/card:scale-110 transition-transform">
                     <div className="w-16 h-1 bg-slate-500"></div>
                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-500 border-b-[6px] border-b-transparent"></div>
                   </div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Flowline</h3>
                <p className="text-sm text-slate-600 font-bold text-center mb-2">ทิศทางการไหล</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">ลูกศรบอกลำดับการทำงานของโปรแกรม จากบนลงล่าง หรือซ้ายไปขวา</p>
              </div>

              {/* Symbol: Connector */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-colors group/card shadow-sm">
                <div className="h-20 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 border-4 border-indigo-400 bg-indigo-50 rounded-full group-hover/card:scale-110 transition-transform shadow-md"></div>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 text-center">Connector</h3>
                <p className="text-sm text-indigo-600 font-bold text-center mb-2">จุดเชื่อมต่อหน้ากระดาษเดียวกัน</p>
                <p className="text-xs text-slate-500 text-center leading-relaxed">ใช้เมื่อเส้นลูกศรยาวเกินไป หรือตัดกันจนสับสน เพื่อให้ผังงานดูสะอาดตา <em>(วงกลม)</em></p>
              </div>

            </div>
          </div>
        </section>

        {/* 2.3.2 ความหมายและการนำสัญลักษณ์ไปใช้งาน */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-fuchsia-500">2.3.2</span> ความหมายและการนำสัญลักษณ์ไปใช้งาน
          </h2>
          
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 shadow-md mb-10 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Lightbulb className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-amber-800 mb-2">กฎเหล็กของการเขียนผังงาน!</h4>
              <ul className="text-sm text-amber-700 space-y-2 font-medium">
                <li>• ต้องมี <strong>Start</strong> และ <strong>End</strong> เสมอ และมีเพียงอย่างละ 1 อันเท่านั้น</li>
                <li>• ทิศทางของลูกศร นิยมให้ไหลจาก <strong>"บนลงล่าง"</strong> และ <strong>"ซ้ายไปขวา"</strong></li>
                <li>• เส้นลูกศร <strong>ห้ามตัดกัน</strong> หากจำเป็นต้องข้ามให้ใช้จุดเชื่อมต่อ (Connector) แทน</li>
                <li>• กล่อง Decision (เงื่อนไข) เป็นกล่องเดียวที่ <strong>ต้องมีลูกศรชี้ออก 2 เส้น</strong> (True/False)</li>
              </ul>
            </div>
          </div>

          <FlowchartSimulator />
        </section>
        
        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมการเรียนรู้: Algorithm to Flowchart" taskText={teacherTaskContent} />

        {/* Next Topic Suggestion */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4 font-medium">เข้าใจสัญลักษณ์ทั้งหมดแล้วใช่ไหมครับ? ในหัวข้อหน้าเราจะมาเริ่มประกอบร่างสัญลักษณ์เหล่านี้ให้ทำงานแบบ "เรียงลำดับ" กัน</p>
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-lg border border-fuchsia-100 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-slate-600">หัวข้อถัดไป:</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-500 text-lg">2.4 ผังงานแบบเรียงลำดับ</span>
            <ArrowRight className="w-5 h-5 text-fuchsia-500" />
          </div>
          <p className="text-xs text-slate-400 mt-4">(พิมพ์ "2.4" เพื่อเข้าสู่เนื้อหาถัดไป)</p>
        </div>
        
      </main>

      {/* Global Style for Gradients & Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: 0% 0%;
          }
          50% {
            background-size: 200% 200%;
            background-position: 100% 100%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}} />
    </div>
  );
}