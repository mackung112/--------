import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Indent, 
  AlignLeft, 
  MessageSquareQuote,
  Wand2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const FormatVisualizer = () => {
  const [isFormatted, setIsFormatted] = useState(false);
  const [showGuides, setShowGuides] = useState(false);

  // Messy code
  const messyCode = [
    { text: "BEGIN", indent: 0 },
    { text: "PRINT \"Enter your score:\"", indent: 0 },
    { text: "READ score", indent: 0 },
    { text: "IF score >= 50 THEN", indent: 0 },
    { text: "PRINT \"You Passed!\"", indent: 0 },
    { text: "IF score >= 80 THEN", indent: 0 },
    { text: "PRINT \"Excellent!\"", indent: 0 },
    { text: "END IF", indent: 0 },
    { text: "ELSE", indent: 0 },
    { text: "PRINT \"You Failed!\"", indent: 0 },
    { text: "END IF", indent: 0 },
    { text: "END", indent: 0 },
  ];

  // Formatted code
  const cleanCode = [
    { text: "BEGIN", indent: 0 },
    { text: "PRINT \"Enter your score:\"", indent: 1 },
    { text: "READ score", indent: 1 },
    { text: "IF score >= 50 THEN", indent: 1 },
    { text: "PRINT \"You Passed!\"", indent: 2 },
    { text: "IF score >= 80 THEN", indent: 2 },
    { text: "PRINT \"Excellent!\"", indent: 3 },
    { text: "END IF", indent: 2 },
    { text: "ELSE", indent: 1 },
    { text: "PRINT \"You Failed!\"", indent: 2 },
    { text: "END IF", indent: 1 },
    { text: "END", indent: 0 },
  ];

  const codeToRender = isFormatted ? cleanCode : messyCode;

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Indent className="w-8 h-8 text-teal-400" />
          Interactive Code Formatter
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          โค้ดที่ไม่ได้จัดย่อหน้า (Indentation) จะอ่านยากและสับสนว่าคำสั่งไหนอยู่ในเงื่อนไขไหน 
          ลองกดปุ่มเพื่อจัดระเบียบโครงสร้างให้สวยงาม
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
         {/* Controls */}
         <div className="w-full md:w-1/3 flex flex-col gap-4 justify-center">
            <button 
              onClick={() => setIsFormatted(!isFormatted)}
              className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isFormatted ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/30'}`}
            >
              {isFormatted ? <XCircle className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
              {isFormatted ? 'ยกเลิกการจัดหน้า' : 'จัดระเบียบย่อหน้า (Format)'}
            </button>

            <button 
              onClick={() => setShowGuides(!showGuides)}
              disabled={!isFormatted}
              className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!isFormatted ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : showGuides ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
            >
              {showGuides ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {showGuides ? 'ซ่อนเส้นนำสายตา' : 'แสดงเส้นนำสายตา (Guides)'}
            </button>
            
            <div className="mt-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h4 className="text-teal-400 font-bold mb-2">บทสรุป:</h4>
               {isFormatted ? (
                 <p className="text-slate-300 text-sm leading-loose">
                   เมื่อจัดย่อหน้าแล้ว จะเห็นชัดเจนว่า PRINT "Excellent!" อยู่ภายในเงื่อนไข IF ซ้อน IF อีกที และอ่านโค้ดได้ลื่นไหลขึ้น
                 </p>
               ) : (
                 <p className="text-rose-400 text-sm leading-loose">
                   โค้ดติดขอบซ้ายทั้งหมด ทำให้ดูไม่ออกเลยว่าคำสั่ง END IF ตัวไหน เป็นของการเช็คเงื่อนไขตัวไหน อาจทำให้โปรแกรมเมอร์แก้ไขโค้ดผิดพลาดได้
                 </p>
               )}
            </div>
         </div>

         {/* Editor View */}
         <div className="w-full md:w-2/3 bg-slate-950 rounded-2xl border border-slate-700 shadow-inner p-6 relative min-h-[380px]">
            {/* Visual Guides */}
            {isFormatted && showGuides && (
               <div className="absolute inset-y-6 left-6 pointer-events-none flex">
                 <div className="w-[32px] h-full border-r border-slate-700/50"></div>
                 <div className="w-[32px] h-full border-r border-teal-500/30"></div>
                 <div className="w-[32px] h-full border-r border-purple-500/30"></div>
               </div>
            )}
            
            <div className="font-mono text-[15px] leading-loose relative z-10">
               {codeToRender.map((line, idx) => {
                 let color = "text-slate-300";
                 if (line.text.startsWith("IF") || line.text.startsWith("ELSE") || line.text.startsWith("END IF")) color = "text-sky-400 font-bold";
                 if (line.text.startsWith("BEGIN") || line.text.startsWith("END")) color = "text-teal-400 font-bold";
                 if (line.text.startsWith("PRINT") || line.text.startsWith("READ")) color = "text-emerald-300";

                 return (
                   <div 
                     key={idx} 
                     className="transition-all duration-500 ease-in-out flex"
                     style={{ paddingLeft: `${line.indent * 32}px` }}
                   >
                      <span className={`${color}`}>{line.text}</span>
                   </div>
                 );
               })}
            </div>
         </div>
      </div>
    </div>
  );
};

const pyUnit2_7_PseudoStructure = () => {
  const teacherTaskContent = `
    ใบงาน "นักจัดระเบียบโค้ด"
    1. ครูจะมีรหัสเทียมแบบติดขอบซ้าย (ไม่มีย่อหน้า) ให้นักเรียน 1 ชุด
    2. ให้นักเรียนนำไปเขียนใหม่ลงในสมุด โดยจัดย่อหน้า (Indentation) ให้ถูกต้องสวยงาม
    3. พร้อมทั้งเขียนคอมเมนต์ (//) อธิบายการทำงานของแต่ละเงื่อนไขไว้ด้านหลัง
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <AlignLeft className="w-10 h-10 text-teal-500" />
             การจัดโครงสร้างรหัสเทียม (Structure)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             การเขียนโปรแกรมไม่ใช่แค่ทำให้คอมพิวเตอร์เข้าใจ แต่ <strong>"ต้องทำให้มนุษย์อ่านเข้าใจด้วย"</strong> 
             เพราะในโลกความเป็นจริง เราต้องทำงานเป็นทีมและมีการกลับมาแก้ไขโค้ดอยู่เสมอ 
             ดังนั้นการจัดโครงสร้างโค้ดให้เป็นระเบียบจึงเป็น "มารยาท" และ "หัวใจสำคัญ" ของโปรแกรมเมอร์มืออาชีพ
           </p>
        </div>

        {/* 2.7.1 Indentation */}
        <div className="mb-16">
           <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-teal-500">
             การย่อหน้า (Indentation)
           </h3>
           <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-10 items-center">
             <div className="w-full md:w-1/2">
                <p className="text-slate-600 leading-loose text-lg mb-6">
                  <strong>Indentation (การร่นย่อหน้า)</strong> คือการเคาะวรรค (Space) หรือเคาะแท็บ (Tab) เพื่อเว้นระยะจากขอบซ้าย 
                  เข้าไปด้านใน มักใช้กับคำสั่งที่อยู่ภายใต้บล็อกของเงื่อนไข (IF) หรือบล็อกของการวนซ้ำ (LOOP)
                </p>
                <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl mb-4">
                  <strong className="text-teal-800 block mb-2">ทำไมต้องย่อหน้า?</strong>
                  <ul className="list-disc ml-5 text-teal-700 leading-loose text-sm space-y-1">
                    <li>เพื่อแสดงลำดับชั้น (Hierarchy) ของคำสั่ง</li>
                    <li>ช่วยให้โปรแกรมเมอร์หาจุดเริ่มต้นและจุดสิ้นสุดของเงื่อนไขได้ง่ายมาก (จับคู่ IF กับ END IF ได้เร็ว)</li>
                    <li>ในบางภาษา (เช่น Python) การย่อหน้าถือเป็น <strong>"ไวยากรณ์บังคับ"</strong> ถ้าย่อหน้าผิด โปรแกรมจะพังทันที!</li>
                  </ul>
                </div>
             </div>
             <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Code structure" 
                  className="rounded-2xl shadow-lg object-cover h-[300px] w-full"
                />
             </div>
           </div>
        </div>

        {/* Simulator */}
        <FormatVisualizer />

        {/* 2.7.2 Comments */}
        <div className="mb-16">
           <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-blue-500">
             การเขียนหมายเหตุ (Comment)
           </h3>
           <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-10 items-center">
             <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="bg-slate-900 rounded-2xl p-6 shadow-xl font-mono text-sm leading-loose">
                   <div className="text-slate-500 italic mb-2">/* นี่คือคอมเมนต์แบบหลายบรรทัด<br/>เอาไว้อธิบายฟังก์ชันการคำนวณภาษี */</div>
                   <div className="text-sky-400">COMPUTE <span className="text-slate-300">tax = price * 0.07</span> <span className="text-slate-500 italic ml-2">// คำนวณภาษีมูลค่าเพิ่ม 7%</span></div>
                   <div className="text-emerald-400 mt-2">PRINT <span className="text-slate-300">tax</span> <span className="text-slate-500 italic ml-2">// แสดงผลภาษีออกทางหน้าจอ</span></div>
                </div>
             </div>
             <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquareQuote className="w-8 h-8 text-blue-500" />
                  <h4 className="text-2xl font-bold text-slate-800">อธิบายโค้ดให้คนอื่น (และตัวเอง) ฟัง</h4>
                </div>
                <p className="text-slate-600 leading-loose text-lg mb-6">
                  <strong>Comment</strong> คือข้อความที่โปรแกรมเมอร์พิมพ์แทรกไว้ในโค้ด เพื่อใช้อธิบายว่าโค้ดบรรทัดนั้นทำงานอย่างไร 
                  โดยคอมพิวเตอร์จะ <strong>"มองข้าม"</strong> และไม่นำข้อความส่วนนี้ไปประมวลผลเลย (มีไว้ให้คนอ่านเท่านั้น)
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                   <strong className="text-blue-800 block mb-2">สัญลักษณ์ที่นิยมใช้:</strong>
                   <ul className="text-blue-700 leading-loose text-sm space-y-2">
                     <li><code>// ข้อความ</code> สำหรับคอมเมนต์บรรทัดเดียว (Single-line)</li>
                     <li><code>/* ข้อความ */</code> สำหรับคอมเมนต์หลายบรรทัด (Multi-line)</li>
                     <li>ในภาษา Python จะใช้เครื่องหมาย <code># ข้อความ</code></li>
                   </ul>
                </div>
             </div>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.7)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_7_PseudoStructure;
