import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Languages, 
  Code, 
  FileJson, 
  ArrowRight,
  BookOpen,
  ArrowLeftRight,
  Network,
  Scale,
  BrainCircuit,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

const PseudocodeComparison = () => {
  const [activeLang, setActiveLang] = useState(0);

  const examples = [
    {
      title: "ภาษาคน (Natural Language)",
      icon: <MessageSquare className="w-8 h-8 text-fuchsia-500" />,
      color: "bg-fuchsia-50",
      borderColor: "border-fuchsia-200",
      textColor: "text-fuchsia-700",
      desc: "ภาษาที่เราใช้พูดคุยกันปกติ เข้าใจง่ายที่สุด แต่อาจมีความคลุมเครือ ไม่รัดกุม",
      code: "ถ้าคะแนนสอบมากกว่าหรือเท่ากับ 50 ให้บอกว่า 'สอบผ่าน' \nแต่ถ้าคะแนนน้อยกว่านั้น ให้บอกว่า 'สอบตก'"
    },
    {
      title: "รหัสเทียม (Pseudocode)",
      icon: <FileJson className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      desc: "โครงสร้างแบบคอมพิวเตอร์ แต่ใช้คำศัพท์ภาษาอังกฤษที่คนทั่วไปอ่านเข้าใจ",
      code: "IF score >= 50 THEN\n    PRINT 'Pass'\nELSE\n    PRINT 'Fail'\nEND IF"
    },
    {
      title: "ภาษาโปรแกรม (Python)",
      icon: <Code className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      desc: "โค้ดจริงๆ ที่รันบนคอมพิวเตอร์ได้ ต้องเขียนให้ถูกไวยากรณ์ (Syntax) เป๊ะๆ",
      code: "if score >= 50:\n    print('Pass')\nelse:\n    print('Fail')"
    }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-bl-full -z-0"></div>
      
      <div className="relative z-10 text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
          <ArrowLeftRight className="w-8 h-8 text-fuchsia-500" />
          เปรียบเทียบ ภาษาคน vs รหัสเทียม vs โค้ดจริง
        </h3>
        <p className="text-slate-500 text-lg">รหัสเทียมคือ "สะพานเชื่อม" ระหว่างความคิดของมนุษย์กับภาษาของคอมพิวเตอร์</p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-stretch justify-center">
        {examples.map((ex, idx) => (
          <React.Fragment key={idx}>
            <div 
              className={`flex-1 rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col ${
                activeLang === idx ? `shadow-xl ${ex.borderColor} scale-105 ${ex.color} z-10` : `border-slate-100 hover:border-slate-300 bg-white`
              }`}
              onMouseEnter={() => setActiveLang(idx)}
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`mb-4 p-4 rounded-2xl shadow-sm inline-block ${activeLang === idx ? 'bg-white' : ex.color}`}>
                  {ex.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{ex.title}</h4>
                <p className="text-slate-500 text-sm mb-6 h-12">{ex.desc}</p>
                <div className="w-full bg-slate-900 rounded-xl p-5 text-left shadow-inner flex-1 flex flex-col justify-center min-h-[140px]">
                  <pre className={`font-mono text-sm md:text-base whitespace-pre-wrap leading-relaxed w-full ${activeLang === idx ? ex.textColor.replace('text-', 'text-').replace('700', '400') : 'text-slate-300'}`}>
                    {ex.code}
                  </pre>
                </div>
              </div>
            </div>
            
            {idx < examples.length - 1 && (
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-slate-300" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const pyUnit2_3_PseudocodeIntro = () => {
  const teacherTaskContent = `
    ให้นักเรียนเขียนรหัสเทียม (Pseudocode) จากสถานการณ์ต่อไปนี้ลงในสมุด:
    1. รับค่าราคาสินค้า (Price) และจำนวนสินค้า (Quantity)
    2. นำราคาคูณด้วยจำนวน เพื่อหาค่า ยอดรวม (Total)
    3. หากยอดรวมมากกว่า 1000 บาท ให้ลดราคาให้ 10%
    4. แสดงผลราคาสุทธิที่ต้องจ่าย
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        {/* Section 2.3.1: Pseudocode Meaning */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-fuchsia-500" />
            ความหมายและประโยชน์ของรหัสเทียม
          </h3>
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-2/3">
              <p className="text-slate-600 text-lg leading-loose mb-6">
                <strong>รหัสเทียม (Pseudocode)</strong> ย่อมาจากคำว่า Pseudo ที่แปลว่า "เทียม/ปลอม" และ Code ที่แปลว่า "รหัสคำสั่ง" 
                รวมกันจึงหมายถึง <strong>รหัสคำสั่งที่ไม่ได้ใช้จริงในคอมพิวเตอร์</strong> แต่เขียนขึ้นเพื่อจำลองความคิดและการทำงานของอัลกอริทึมให้อยู่ในรูปแบบที่มนุษย์อ่านและทำความเข้าใจได้ง่าย 
                โดยมีโครงสร้างละม้ายคล้ายคลึงกับภาษาโปรแกรมมิ่ง (เช่น มีคำสั่งรับค่า แสดงผล วนลูป) แต่ไม่ต้องเคร่งครัดเรื่องไวยากรณ์ (Syntax) หรือเครื่องหมายวรรคตอนต่างๆ
              </p>
              
              <div className="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-6 rounded-r-xl">
                <h4 className="font-bold text-fuchsia-800 text-xl mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-6 h-6" /> ทำไมเราต้องเขียนรหัสเทียมก่อนเขียนโค้ด?
                </h4>
                <ul className="space-y-3 text-fuchsia-900 leading-loose">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0 mt-1" /> 
                    <span><strong>โฟกัสที่ "ลอจิก" ไม่ใช่ "ไวยากรณ์":</strong> ช่วยให้โปรแกรมเมอร์มีสมาธิกับการคิดวิธีแก้ปัญหา โดยไม่ต้องกังวลว่าจะลืมใส่เซมิโคลอน (;) หรือวงเล็บผิดที่</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0 mt-1" /> 
                    <span><strong>เป็นภาษาสากลในทีมนักพัฒนา:</strong> ไม่ว่าโปรแกรมเมอร์ในทีมจะถนัดภาษา Python, Java, หรือ C++ ทุกคนก็สามารถอ่านรหัสเทียมร่วมกันเข้าใจได้</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0 mt-1" /> 
                    <span><strong>แปลงเป็นโค้ดจริงได้ง่าย:</strong> เมื่อลอจิกในรหัสเทียมถูกต้อง การนำไปแปลเป็นภาษาคอมพิวเตอร์ใดๆ ก็ทำได้อย่างรวดเร็ว</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 flex justify-center">
               <div className="w-full max-w-[300px] aspect-[3/4] bg-slate-900 rounded-3xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-slate-800 relative">
                 <div className="absolute top-4 left-4 flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="mt-10 font-mono text-slate-300 leading-loose">
                   <div className="text-fuchsia-400 mb-2 text-lg">BEGIN</div>
                   <div className="pl-4 text-emerald-400">READ score</div>
                   <div className="pl-4 text-sky-400">IF score &ge; 50 THEN</div>
                   <div className="pl-12 text-blue-300">PRINT "Pass"</div>
                   <div className="pl-4 text-sky-400">ELSE</div>
                   <div className="pl-12 text-blue-300">PRINT "Fail"</div>
                   <div className="pl-4 text-sky-400">END IF</div>
                   <div className="text-fuchsia-400 mt-2 text-lg">END</div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Section 2.3.2: Principles */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-fuchsia-500">
            หลักการเขียนรหัสเทียมเบื้องต้น
          </h3>
          <p className="text-slate-600 text-lg leading-loose mb-8">
            แม้รหัสเทียมจะไม่มีกฎตายตัวเหมือนภาษาคอมพิวเตอร์ แต่เพื่อให้สื่อสารได้ตรงกันทั่วโลก จึงมีแนวปฏิบัติ (Conventions) ที่นิยมใช้ดังนี้
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-fuchsia-300">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">1</div>
              <h4 className="font-bold text-slate-800 text-lg mb-3">ใช้คำศัพท์ภาษาอังกฤษ</h4>
              <p className="text-slate-600 leading-loose text-sm">
                นิยมใช้ Keyword ภาษาอังกฤษพิมพ์ใหญ่ เช่น <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">READ</span>, <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">PRINT</span>, <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">IF</span>, <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">WHILE</span> เพื่อให้เด่นชัดและแยกออกจากตัวแปรได้ง่าย
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-fuchsia-300">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">2</div>
              <h4 className="font-bold text-slate-800 text-lg mb-3">หนึ่งคำสั่ง ต่อ หนึ่งบรรทัด</h4>
              <p className="text-slate-600 leading-loose text-sm">
                เพื่อความอ่านง่าย ไม่ควรเขียนคำสั่งหลายอันต่อกันในบรรทัดเดียว ลำดับการทำงานจะอ่านจากบนลงล่าง (Top to Bottom) เสมอ
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-fuchsia-300">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">3</div>
              <h4 className="font-bold text-slate-800 text-lg mb-3">BEGIN และ END</h4>
              <p className="text-slate-600 leading-loose text-sm">
                ต้องระบุจุดเริ่มต้นของอัลกอริทึมด้วยคำว่า <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">BEGIN</span> (หรือ START) และจุดสิ้นสุดด้วย <span className="font-mono text-fuchsia-600 bg-fuchsia-50 px-1 rounded">END</span> (หรือ STOP) เสมอ
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-fuchsia-300">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">4</div>
              <h4 className="font-bold text-slate-800 text-lg mb-3">การเคาะย่อหน้า (Indentation)</h4>
              <p className="text-slate-600 leading-loose text-sm">
                คำสั่งที่อยู่ภายใต้เงื่อนไขหรือลูป จำเป็นต้องเคาะย่อหน้า (Indent) เข้าไป เพื่อแสดงความเป็นบล็อกเดียวกัน ช่วยให้เห็นโครงสร้างชัดเจน
              </p>
            </div>
          </div>
        </div>

        {/* Section 2.3.3: Comparison */}
        <PseudocodeComparison />

        {/* Section 2.3.3 part 2: Relationship with Flowchart */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 border border-slate-800 shadow-xl mb-16 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center text-white">
             <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Scale className="w-8 h-8 text-fuchsia-400" />
                  ความสัมพันธ์ระหว่างรหัสเทียมและผังงาน
                </h3>
                <p className="text-slate-300 leading-loose text-lg mb-6">
                  ทั้ง <strong>รหัสเทียม (Pseudocode)</strong> และ <strong>ผังงาน (Flowchart)</strong> ต่างก็เป็นเครื่องมือสำหรับออกแบบอัลกอริทึมเหมือนกัน โปรแกรมเมอร์มักจะเลือกใช้อย่างใดอย่างหนึ่ง (หรือใช้ร่วมกันในโปรเจกต์ขนาดใหญ่) โดยมีข้อดีแตกต่างกัน:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <FileJson className="w-8 h-8 text-blue-400 shrink-0" />
                    <div>
                      <strong className="text-blue-300 block mb-1">รหัสเทียม (เขียนเป็นข้อความ)</strong>
                      <span className="text-slate-400 leading-relaxed text-sm">พิมพ์ง่าย แก้ไขง่าย แปลงเป็นโค้ดได้รวดเร็วมาก เหมาะสำหรับคนที่มีพื้นฐานโปรแกรมมิ่งมาบ้างแล้ว</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <Network className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-emerald-300 block mb-1">ผังงาน (วาดเป็นภาพสัญลักษณ์)</strong>
                      <span className="text-slate-400 leading-relaxed text-sm">เห็นภาพรวมชัดเจน ดูทิศทางการไหลของข้อมูลได้ง่ายมาก เหมาะสำหรับใช้นำเสนองานให้บุคคลทั่วไปหรือลูกค้าดู</span>
                    </div>
                  </li>
                </ul>
             </div>
             <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 text-center relative w-full max-w-sm shadow-2xl">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full p-2 border border-slate-700 z-20">
                     <ArrowLeftRight className="w-6 h-6 text-fuchsia-400" />
                   </div>
                   
                   <div className="mb-8 pb-8 border-b border-slate-700 border-dashed">
                      <div className="text-fuchsia-400 font-bold mb-4 uppercase tracking-widest text-sm">Pseudocode</div>
                      <div className="font-mono text-sm text-left bg-slate-950 p-4 rounded-xl text-slate-300">
                        IF rain THEN<br/>
                        &nbsp;&nbsp;PRINT "Take Umbrella"<br/>
                        END IF
                      </div>
                   </div>
                   
                   <div>
                      <div className="text-fuchsia-400 font-bold mb-4 uppercase tracking-widest text-sm">Flowchart</div>
                      <div className="flex flex-col items-center">
                         <div className="w-24 h-12 bg-blue-500/20 border-2 border-blue-500 rotate-45 transform flex items-center justify-center mx-auto mb-6">
                            <span className="text-blue-300 font-mono text-xs -rotate-45">rain?</span>
                         </div>
                         <div className="text-xs text-slate-400 mb-2">Yes ↓</div>
                         <div className="px-4 py-2 bg-emerald-500/20 border-2 border-emerald-500 rounded flex items-center justify-center">
                            <span className="text-emerald-300 font-mono text-xs">Take Umbrella</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.3)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_3_PseudocodeIntro;
