import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowDownRight,
  TrendingDown,
  Waypoints,
  MoveDown
} from 'lucide-react';

const DosAndDontsVisualizer = () => {
  const [activeRule, setActiveRule] = useState(0);

  const rules = [
    {
      id: 0,
      title: "จุดเริ่มต้นและจุดสิ้นสุด",
      wrongDesc: "มีจุดเริ่มต้น 2 ที่ หรือลืมใส่จุดสิ้นสุด",
      rightDesc: "ต้องมีจุด Start แค่ 1 จุด และมี End แค่ 1 จุดเสมอ",
      wrongVisual: (
        <div className="flex flex-col items-center gap-2">
           <div className="flex gap-4">
             <div className="px-4 py-1 rounded-full border-2 border-rose-500 bg-rose-500/10 text-rose-400 text-xs">Start</div>
             <div className="px-4 py-1 rounded-full border-2 border-rose-500 bg-rose-500/10 text-rose-400 text-xs">Start</div>
           </div>
           <MoveDown className="w-4 h-4 text-slate-500" />
           <div className="w-16 h-8 border-2 border-slate-500 bg-slate-800 flex items-center justify-center text-xs">Process</div>
           {/* No end */}
        </div>
      ),
      rightVisual: (
        <div className="flex flex-col items-center gap-2">
           <div className="px-4 py-1 rounded-full border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 text-xs font-bold">Start</div>
           <MoveDown className="w-4 h-4 text-emerald-500" />
           <div className="w-16 h-8 border-2 border-blue-500 bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs">Process</div>
           <MoveDown className="w-4 h-4 text-emerald-500" />
           <div className="px-4 py-1 rounded-full border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 text-xs font-bold">End</div>
        </div>
      )
    },
    {
      id: 1,
      title: "ทิศทางของลูกศร (Flow lines)",
      wrongDesc: "ลูกศรชี้ขึ้นสลับลง หรือชี้สวนทางกันมั่วซั่ว ไม่มีหัวลูกศร",
      rightDesc: "ทิศทางหลักต้องไหลจาก บนลงล่าง (Top to Bottom) หรือ ซ้ายไปขวา (Left to Right)",
      wrongVisual: (
        <div className="flex flex-col items-center gap-2 relative">
           <div className="w-16 h-8 border-2 border-rose-500 bg-rose-500/10 text-xs flex items-center justify-center">A</div>
           <div className="flex gap-4 items-center">
             <div className="w-16 h-8 border-2 border-rose-500 bg-rose-500/10 text-xs flex items-center justify-center">B</div>
             {/* Messy line without arrow */}
             <div className="absolute left-1/2 top-[30px] w-[2px] h-[30px] bg-rose-500 rotate-45"></div>
           </div>
        </div>
      ),
      rightVisual: (
        <div className="flex flex-col items-center gap-2">
           <div className="w-16 h-8 border-2 border-emerald-500 bg-emerald-500/10 text-xs flex items-center justify-center">A</div>
           <MoveDown className="w-4 h-4 text-emerald-500" />
           <div className="w-16 h-8 border-2 border-emerald-500 bg-emerald-500/10 text-xs flex items-center justify-center">B</div>
           <MoveDown className="w-4 h-4 text-emerald-500" />
           <div className="w-16 h-8 border-2 border-emerald-500 bg-emerald-500/10 text-xs flex items-center justify-center">C</div>
        </div>
      )
    },
    {
      id: 2,
      title: "เส้นตัดไขว้กัน (Crossing lines)",
      wrongDesc: "ลากเส้นตัดกันเหมือนใยแมงมุม ทำให้ดูยากว่าเส้นไหนไปทางไหน",
      rightDesc: "ห้ามลากเส้นตัดกัน หากหลีกเลี่ยงไม่ได้ให้ใช้จุดเชื่อมต่อ (Connector)",
      wrongVisual: (
        <div className="relative w-32 h-32 flex items-center justify-center border border-slate-700 rounded-lg">
           <div className="absolute top-2 left-2 w-8 h-8 border border-rose-500"></div>
           <div className="absolute bottom-2 right-2 w-8 h-8 border border-rose-500"></div>
           <div className="absolute top-2 right-2 w-8 h-8 border border-rose-500"></div>
           <div className="absolute bottom-2 left-2 w-8 h-8 border border-rose-500"></div>
           {/* Crossing lines */}
           <svg className="absolute inset-0 w-full h-full">
             <line x1="20" y1="20" x2="100" y2="100" stroke="#f43f5e" strokeWidth="2" />
             <line x1="100" y1="20" x2="20" y2="100" stroke="#f43f5e" strokeWidth="2" />
           </svg>
        </div>
      ),
      rightVisual: (
        <div className="relative w-32 h-32 flex items-center justify-center border border-slate-700 rounded-lg">
           <div className="absolute top-2 left-2 w-8 h-8 border border-emerald-500 flex items-center justify-center text-[10px]">A</div>
           <div className="absolute bottom-2 left-2 w-8 h-8 border border-emerald-500 flex items-center justify-center text-[10px]">B</div>
           
           <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400">1</div>
           <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400">1</div>
           
           {/* Non-crossing lines using connectors */}
           <svg className="absolute inset-0 w-full h-full">
             <line x1="40" y1="24" x2="90" y2="24" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
             <line x1="104" y1="40" x2="104" y2="90" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
           </svg>
        </div>
      )
    },
    {
      id: 3,
      title: "ทางออกของการตัดสินใจ (Decision)",
      wrongDesc: "สัญลักษณ์เงื่อนไขมีทางออกแค่ทางเดียว หรือทางออกไม่ระบุว่าเส้นไหนคือ True/False",
      rightDesc: "ต้องมีทางออก 2 ทางเสมอ (จริง/เท็จ) และต้องเขียนกำกับเส้นไว้ชัดเจน",
      wrongVisual: (
        <div className="flex flex-col items-center gap-2">
           <div className="w-16 h-16 border-2 border-rose-500 bg-rose-500/10 rotate-45 flex items-center justify-center mt-4"></div>
           <MoveDown className="w-4 h-4 text-rose-500 mt-2" />
           <div className="w-16 h-8 border-2 border-rose-500 bg-rose-500/10"></div>
        </div>
      ),
      rightVisual: (
        <div className="flex flex-col items-center gap-2 relative mt-4">
           <div className="w-16 h-16 border-2 border-emerald-500 bg-emerald-500/10 rotate-45 flex items-center justify-center"></div>
           
           {/* True branch */}
           <div className="absolute left-[70px] top-[30px] flex items-center">
             <div className="w-8 h-1 bg-emerald-500"></div>
             <span className="text-[10px] text-emerald-400 mx-1 font-bold">Yes</span>
           </div>
           
           {/* False branch */}
           <MoveDown className="w-4 h-4 text-emerald-500 mt-2" />
           <span className="absolute left-[40px] top-[75px] text-[10px] text-emerald-400 font-bold">No</span>
           <div className="w-16 h-8 border-2 border-emerald-500 bg-emerald-500/10"></div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ShieldCheck className="w-8 h-8 text-fuchsia-400" />
          Interactive: กฎเหล็ก Do & Don't
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          คลิกเลือกหัวข้อด้านล่างเพื่อเปรียบเทียบการเขียนผังงานที่ <strong>"ผิดพลาดบ่อย" (Don't)</strong> 
          และการเขียนที่ <strong>"ถูกต้องตามมาตรฐาน" (Do)</strong>
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Topic Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {rules.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setActiveRule(idx)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${activeRule === idx ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'}`}
            >
              {idx + 1}. {r.title}
            </button>
          ))}
        </div>

        {/* Comparison Board */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Wrong Side */}
           <div className="bg-rose-950/30 border border-rose-900/50 rounded-3xl p-8 flex flex-col shadow-inner">
             <div className="flex items-center justify-center gap-2 mb-6 text-rose-400 border-b border-rose-900/50 pb-4">
               <XCircle className="w-6 h-6" />
               <h4 className="text-xl font-bold uppercase tracking-widest">Don't (ผิด)</h4>
             </div>
             <div className="flex-1 flex items-center justify-center min-h-[200px]">
               {rules[activeRule].wrongVisual}
             </div>
             <div className="mt-6 bg-slate-900/80 p-4 rounded-xl border border-rose-900/50 text-rose-300 text-sm leading-loose text-center">
               {rules[activeRule].wrongDesc}
             </div>
           </div>

           {/* Right Side */}
           <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-3xl p-8 flex flex-col shadow-inner">
             <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400 border-b border-emerald-900/50 pb-4">
               <CheckCircle2 className="w-6 h-6" />
               <h4 className="text-xl font-bold uppercase tracking-widest">Do (ถูก)</h4>
             </div>
             <div className="flex-1 flex items-center justify-center min-h-[200px]">
               {rules[activeRule].rightVisual}
             </div>
             <div className="mt-6 bg-slate-900/80 p-4 rounded-xl border border-emerald-900/50 text-emerald-300 text-sm leading-loose text-center">
               {rules[activeRule].rightDesc}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const pyUnit2_9_FlowchartRules = () => {
  const teacherTaskContent = `
    ใบงาน "นักสืบจับผิดผังงาน"
    1. ครูจะมีรูปผังงาน 1 รูป ที่มีข้อผิดพลาดซ่อนอยู่ 5 จุด (เช่น เส้นตัดกัน, ทิศทางลูกศรผิด, ใส่กล่องผิดประเภท)
    2. ให้นักเรียนช่วยกันวงกลมจุดที่ผิดพลาด
    3. แล้ววาดผังงานนั้นใหม่ให้ถูกต้องตามหลักมาตรฐานสากล
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <ShieldCheck className="w-10 h-10 text-fuchsia-500" />
             หลักการเขียนผังงานที่ดี
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             การวาดผังงานก็เหมือนการวาดแปลนบ้าน ถ้าคนออกแบบวาดผิด สัญลักษณ์ไม่ตรงมาตรฐาน 
             ช่างก่อสร้าง (โปรแกรมเมอร์) ก็อาจจะสร้างบ้านออกมาเบี้ยวหรือพังทลายได้ 
             ดังนั้นการเขียนผังงานที่ดีจะต้องปฏิบัติตามกฎเหล็กอย่างเคร่งครัด
           </p>
        </div>

        {/* 2.9.1 Rules */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-16">
           <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-fuchsia-500">
             กฎเกณฑ์ข้อกำหนดในการเขียน
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="flex gap-4">
               <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600 font-bold shrink-0">1</div>
               <div>
                 <h4 className="text-xl font-bold text-slate-800 mb-2">ทิศทางหลักชัดเจน</h4>
                 <p className="text-slate-600 leading-loose">เส้นทางหลัก (Main Flow) ของโปรแกรม จะต้องไหลจาก <strong>บนลงล่าง (Top to Bottom)</strong> หรือจาก <strong>ซ้ายไปขวา (Left to Right)</strong> เสมอ</p>
               </div>
             </div>
             
             <div className="flex gap-4">
               <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600 font-bold shrink-0">2</div>
               <div>
                 <h4 className="text-xl font-bold text-slate-800 mb-2">ต้องมีหัวลูกศรกำกับเสมอ</h4>
                 <p className="text-slate-600 leading-loose">ห้ามลากเส้นตรงเฉยๆ เส้นเชื่อมทุกเส้นจะต้องมี <strong>หัวลูกศร (Arrowhead)</strong> เพื่อระบุทิศทางการทำงานที่แน่นอน</p>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600 font-bold shrink-0">3</div>
               <div>
                 <h4 className="text-xl font-bold text-slate-800 mb-2">ใช้สัญลักษณ์ให้ตรงกับงาน</h4>
                 <p className="text-slate-600 leading-loose">เช่น การรับค่าจากคีย์บอร์ดให้ใช้รูปสี่เหลี่ยมด้านขนาน การคำนวณให้ใช้สี่เหลี่ยมผืนผ้า ห้ามวาดรูปทรงแปลกๆ นอกเหนือจากมาตรฐาน ANSI</p>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-600 font-bold shrink-0">4</div>
               <div>
                 <h4 className="text-xl font-bold text-slate-800 mb-2">ข้อความสั้นกระชับเข้าใจง่าย</h4>
                 <p className="text-slate-600 leading-loose">ข้อความภายในสัญลักษณ์ (Label) ควรเขียนให้สั้นที่สุดเท่าที่จะทำได้ แต่ยังคงใจความสำคัญไว้ (ใช้ Keyword สั้นๆ คล้ายรหัสเทียม)</p>
               </div>
             </div>
           </div>
        </div>

        {/* 2.9.2 Do and Don't */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-rose-500 mt-20">
          ข้อควรระวังและข้อผิดพลาดที่พบบ่อย (Do & Don't)
        </h3>
        
        <DosAndDontsVisualizer />

        {/* Note on complexity */}
        <div className="bg-blue-50 rounded-[2rem] p-8 md:p-10 border border-blue-100 mb-16 flex items-start gap-6">
           <AlertTriangle className="w-10 h-10 text-blue-500 shrink-0 mt-1" />
           <div>
             <h4 className="text-2xl font-bold text-blue-800 mb-4">ข้อแนะนำสำหรับโปรแกรมที่ซับซ้อน</h4>
             <p className="text-blue-900 text-lg leading-loose">
               หากผังงานมีความยาวมากจน <strong>"ล้นหน้ากระดาษ"</strong> ไม่ควรพยายามบีบรูปให้เล็กลง หรือลากเส้นโยงข้ามหน้าจนมั่วซั่ว 
               แต่ให้ใช้สัญลักษณ์ <strong>จุดเชื่อมต่อ (Connector)</strong> ซึ่งมี 2 แบบ:
             </p>
             <ul className="mt-4 space-y-3 text-blue-800 leading-loose">
               <li><strong className="text-blue-700">1. จุดเชื่อมต่อหน้าเดียวกัน (วงกลม):</strong> ใช้เมื่อเส้นเริ่มพันกันในหน้าเดียว (มักใส่ตัวอักษร A, B, C กำกับ)</li>
               <li><strong className="text-blue-700">2. จุดเชื่อมต่อข้ามหน้า (คล้ายป้ายห้าเหลี่ยม):</strong> ใช้เมื่อผังงานยาวจนต้องขึ้นหน้ากระดาษใหม่ (มักใส่เลขหน้า 1, 2, 3 กำกับ)</li>
             </ul>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.9)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_9_FlowchartRules;
