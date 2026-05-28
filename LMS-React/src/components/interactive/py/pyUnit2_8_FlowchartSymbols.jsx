import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Shapes, 
  HelpCircle, 
  MousePointerClick, 
  BookOpen, 
  Monitor, 
  Mouse,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const SymbolInspector = () => {
  const [activeSymbol, setActiveSymbol] = useState(0);

  const symbols = [
    {
      id: 0,
      name: "Terminal (จุดเริ่มต้นและสิ้นสุด)",
      shape: (
        <div className="w-32 h-16 border-4 border-violet-500 rounded-full flex items-center justify-center bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <span className="font-bold text-violet-400">Start / Stop</span>
        </div>
      ),
      desc: "สัญลักษณ์รูปแคปซูล หรือวงรี ใช้สำหรับแสดง 'จุดเริ่มต้น' (Start/Begin) และ 'จุดสิ้นสุด' (End/Stop) ของการทำงานเสมอ ผังงานทุกอันต้องมีสัญลักษณ์นี้หัวและท้าย",
      example: "START, END"
    },
    {
      id: 1,
      name: "Process (การประมวลผล)",
      shape: (
        <div className="w-32 h-20 border-4 border-blue-500 flex items-center justify-center bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <span className="font-bold text-blue-400">Process</span>
        </div>
      ),
      desc: "สัญลักษณ์รูปสี่เหลี่ยมผืนผ้า ใช้สำหรับคำสั่ง 'การประมวลผล' (Process) หรือ 'การกำหนดค่า' (Assign) เช่น การคำนวณทางคณิตศาสตร์",
      example: "Area = Width * Height, x = 0"
    },
    {
      id: 2,
      name: "Input / Output (รับเข้า/ส่งออก)",
      shape: (
        <div className="w-32 h-20 border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)] -skew-x-[20deg]">
          <span className="font-bold text-emerald-400 skew-x-[20deg]">I / O</span>
        </div>
      ),
      desc: "สัญลักษณ์รูปสี่เหลี่ยมด้านขนาน ใช้สำหรับ 'รับข้อมูลเข้า' (Input) หรือ 'แสดงผลข้อมูลออก' (Output) ในกรณีที่ไม่ระบุอุปกรณ์เฉพาะเจาะจง",
      example: "Read Name, Print Total"
    },
    {
      id: 3,
      name: "Decision (การตัดสินใจ)",
      shape: (
        <div className="w-24 h-24 border-4 border-rose-500 flex items-center justify-center bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,114,0.3)] rotate-45 mx-auto">
          <span className="font-bold text-rose-400 -rotate-45 text-sm">Condition?</span>
        </div>
      ),
      desc: "สัญลักษณ์รูปสี่เหลี่ยมขนมเปียกปูน ใช้สำหรับ 'เงื่อนไข' (Condition) ที่ต้องมีการตัดสินใจ (Yes/No, True/False) จะมีลูกศรชี้เข้า 1 ทาง และชี้ออก 2 ทางเสมอ",
      example: "Score >= 50 ?"
    },
    {
      id: 4,
      name: "Display (แสดงผลทางหน้าจอ)",
      shape: (
        <div className="w-32 h-20 border-4 border-amber-500 flex items-center justify-center bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]" style={{ borderRadius: '10px 40px 10px 10px / 10px 40px 10px 10px' }}>
          <span className="font-bold text-amber-400">Display</span>
        </div>
      ),
      desc: "สัญลักษณ์คล้ายจอโทรทัศน์ด้านข้าง ใช้สำหรับ 'แสดงผลข้อมูลออกทางหน้าจอคอมพิวเตอร์' โดยเฉพาะ (ถ้าใช้รูปสี่เหลี่ยมด้านขนานจะหมายถึงอุปกรณ์อะไรก็ได้)",
      example: "Show 'Hello World' on screen"
    },
    {
      id: 5,
      name: "Manual Input (รับข้อมูลจากแป้นพิมพ์)",
      shape: (
        <div className="w-32 h-20 border-4 border-cyan-500 flex items-center justify-center bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px', clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 100%)' }}>
          <span className="font-bold text-cyan-400 mt-2">Keyboard</span>
        </div>
      ),
      desc: "สัญลักษณ์คล้ายคีย์บอร์ดเอียงๆ ใช้สำหรับระบุชัดเจนว่า เป็นการ 'รับข้อมูลเข้าผ่านทางแป้นพิมพ์' (Keyboard) โดยผู้ใช้งาน",
      example: "Type Password"
    },
    {
      id: 6,
      name: "Flow Line (ทิศทางการทำงาน)",
      shape: (
        <div className="w-32 h-20 flex items-center justify-center relative">
          <div className="w-24 h-1 bg-slate-300"></div>
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-slate-300 border-b-[8px] border-b-transparent"></div>
        </div>
      ),
      desc: "เส้นลูกศร ใช้บอก 'ทิศทาง' การไหลของข้อมูลและลำดับการทำงาน ต้องมีหัวลูกศรเสมอ (ห้ามใช้เส้นตรงเฉยๆ) ปกติจะไหลจากบนลงล่าง หรือซ้ายไปขวา",
      example: "เชื่อมสัญลักษณ์หนึ่งไปยังอีกสัญลักษณ์หนึ่ง"
    }
  ];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Shapes className="w-8 h-8 text-violet-400" />
          Interactive Symbol Inspector
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          คลิกที่สัญลักษณ์แต่ละรูปด้านซ้ายมือ เพื่อดูความหมายและตัวอย่างการนำไปใช้งาน
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 min-h-[400px]">
        {/* Symbol Grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {symbols.map((sym, idx) => (
            <div 
              key={sym.id}
              onClick={() => setActiveSymbol(idx)}
              className={`bg-slate-800 border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-700 ${activeSymbol === idx ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-slate-800/80 scale-105' : 'border-slate-700'}`}
            >
               <div className="h-24 flex items-center justify-center mb-4 transform scale-50 md:scale-75 origin-center">
                 {sym.shape}
               </div>
               <div className={`text-xs text-center font-bold px-2 ${activeSymbol === idx ? 'text-violet-300' : 'text-slate-400'}`}>
                 {sym.name.split(' ')[0]}
               </div>
            </div>
          ))}
        </div>

        {/* Details Card */}
        <div className="w-full md:w-1/2">
           <div className="bg-slate-950 rounded-3xl p-8 border border-slate-700 shadow-inner h-full flex flex-col justify-center relative overflow-hidden">
             
             {/* Blueprint grid background */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="relative z-10 flex flex-col items-center h-full">
               <div className="h-40 flex items-center justify-center w-full mb-6">
                 {symbols[activeSymbol].shape}
               </div>
               <div className="w-full text-center mb-6 pb-6 border-b border-slate-800">
                 <h4 className="text-2xl font-bold text-white mb-2">{symbols[activeSymbol].name}</h4>
               </div>
               <div className="w-full flex-1">
                 <div className="flex gap-3 items-start mb-4">
                   <BookOpen className="w-6 h-6 text-violet-400 shrink-0" />
                   <p className="text-slate-300 leading-loose">
                     {symbols[activeSymbol].desc}
                   </p>
                 </div>
                 <div className="bg-violet-900/30 border border-violet-500/30 rounded-xl p-4 mt-6">
                   <span className="text-violet-300 font-bold text-sm block mb-1">ตัวอย่างการใช้งาน:</span>
                   <span className="text-white font-mono">{symbols[activeSymbol].example}</span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const pyUnit2_8_FlowchartSymbols = () => {
  const teacherTaskContent = `
    ใบงาน "นักถอดรหัสผังงาน"
    1. ครูจะวาดสัญลักษณ์ผังงานเปล่าๆ (ไม่มีข้อความข้างใน) เรียงต่อกันบนกระดาน 
    2. ให้นักเรียนทายว่า "โปรแกรมนี้คือโปรแกรมอะไร" จากการดูแค่รูปร่างสัญลักษณ์ (เช่น เห็นรูปข้าวหลามตัด ก็รู้ว่าต้องมีการตัดสินใจ)
    3. ให้นักเรียนลองเข้าไปเล่นเว็บ draw.io แล้วทดลองลากสัญลักษณ์ต่างๆ มาวางเรียงกันให้คุ้นชิน
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <Layers className="w-10 h-10 text-violet-500" />
             สัญลักษณ์ผังงาน (Flowchart Symbols)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             เมื่อเรารู้จัก "รหัสเทียม (Pseudocode)" ที่เป็นการเขียนอธิบายด้วยข้อความแล้ว 
             อีกเครื่องมือหนึ่งที่ทรงพลังมากคือ <strong>"ผังงาน (Flowchart)"</strong> ซึ่งเป็นการใช้ <strong>รูปภาพและสัญลักษณ์</strong> ในการอธิบายอัลกอริทึม 
             ทำให้เห็นภาพรวมได้ชัดเจน ทั่วโลกจึงตกลงใช้สัญลักษณ์มาตรฐานเดียวกันเพื่อให้ทุกคนเข้าใจตรงกัน
           </p>
        </div>

        {/* 2.8.1 ANSI Standard */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-12 flex flex-col md:flex-row gap-10 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full md:w-1/3 flex justify-center">
             <div className="w-48 h-48 bg-violet-50 rounded-full flex items-center justify-center border-[8px] border-violet-100 relative">
               <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
               <div className="absolute bottom-4 right-4 w-12 h-12 bg-emerald-400 rounded-sm rotate-12"></div>
               <div className="absolute top-1/2 right-2 w-10 h-10 bg-rose-400 rotate-45"></div>
               <div className="font-bold text-violet-600 text-3xl z-10 text-center tracking-widest">ANSI<br/><span className="text-sm font-normal tracking-normal text-violet-500">Standard</span></div>
             </div>
           </div>
           <div className="w-full md:w-2/3">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                สถาบันมาตรฐานแห่งชาติสหรัฐอเมริกา (ANSI)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                เพื่อให้โปรแกรมเมอร์ชาวไทย จีน ฝรั่ง หรือใครก็ตามบนโลก อ่านผังงานแล้วเข้าใจตรงกันเหมือนภาษาดนตรี 
                สถาบัน <strong>ANSI (American National Standards Institute)</strong> และ <strong>ISO</strong> จึงได้ร่วมกันกำหนดสัญลักษณ์มาตรฐานสากลขึ้นมา 
                โดยกำหนดให้แต่ละ "รูปทรงเรขาคณิต" มีความหมายเฉพาะตัว ห้ามวาดรูปมั่วๆ หรือวาดรูปดาว รูปหัวใจลงไปในผังงานเด็ดขาด!
              </p>
           </div>
        </div>

        {/* 2.8.2 Symbol Meanings (Inspector) */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-violet-500 mt-20">
          ความหมายและการนำไปใช้งาน
        </h3>
        <p className="text-slate-600 text-lg leading-loose mb-10">
          สัญลักษณ์พื้นฐานที่โปรแกรมเมอร์ใช้บ่อยที่สุดมีประมาณ 5-6 ตัว หากจำสัญลักษณ์เหล่านี้ได้ ก็สามารถวาดผังงานของโปรแกรมได้เกือบทุกรูปแบบ
        </p>
        
        <SymbolInspector />

        {/* 2.8.3 draw.io */}
        <div className="mb-16 mt-20">
           <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-blue-500">
             การใช้โปรแกรมวาดผังงาน (draw.io)
           </h3>
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl flex flex-col lg:flex-row gap-10 items-center">
             <div className="w-full lg:w-3/5">
                <p className="text-slate-600 leading-loose text-lg mb-6">
                  ในอดีตเราอาจจะต้องใช้ไม้บรรทัดที่มีแม่แบบเจาะรู (Template) ในการวาดผังงานลงกระดาษ 
                  แต่ปัจจุบันมีเครื่องมือฟรีที่ทรงพลังมากๆ อย่าง <strong>draw.io (หรือ app.diagrams.net)</strong> ซึ่งทำงานผ่านเว็บเบราว์เซอร์ได้เลย โดยไม่ต้องติดตั้งโปรแกรม
                </p>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                   <strong className="text-blue-800 block mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> ข้อดีของการใช้ draw.io</strong>
                   <ul className="text-blue-700 leading-loose text-md space-y-3">
                     <li className="flex items-center gap-3"><MousePointerClick className="w-5 h-5 text-blue-500"/> ลากและวาง (Drag & Drop) สัญลักษณ์ได้ง่าย</li>
                     <li className="flex items-center gap-3"><div className="w-5 h-5 bg-blue-500 rounded-full"></div> มีเส้นเชื่อม (Flow line) ที่ฉลาด ลากเชื่อมแล้วไม่ขาดจากกันตอนย้ายรูป</li>
                     <li className="flex items-center gap-3"><Monitor className="w-5 h-5 text-blue-500"/> บันทึกเข้า Google Drive หรือ Export เป็นรูปภาพ PNG ได้ทันที</li>
                   </ul>
                   <a 
                     href="https://app.diagrams.net" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
                   >
                     ทดลองใช้งาน draw.io <ExternalLink className="w-5 h-5" />
                   </a>
                </div>
             </div>
             <div className="w-full lg:w-2/5 flex justify-center">
                <div className="bg-slate-800 p-4 rounded-2xl shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-sm">
                   <div className="flex gap-2 mb-3">
                     <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                   </div>
                   <img 
                     src="https://raw.githubusercontent.com/jgraph/drawio/master/docs/assets/images/drawio-logo-google-drive.png" 
                     alt="draw.io interface" 
                     className="w-full rounded-xl bg-white/10 h-auto opacity-80"
                     onError={(e) => { e.target.src = "https://via.placeholder.com/400x300.png?text=draw.io+Interface" }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-slate-900/80 text-white px-4 py-2 rounded-lg font-mono text-sm border border-slate-700 backdrop-blur-sm flex items-center gap-2">
                        <Mouse className="w-4 h-4" /> Drag to draw
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.8)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_8_FlowchartSymbols;
