import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  GitCommit, 
  Search, 
  PenTool, 
  Code2, 
  TestTube2, 
  Wrench,
  AlertTriangle,
  Settings,
  ShieldCheck,
  TrendingUp,
  MonitorSmartphone,
  Server
} from 'lucide-react';

const SdlcTimelineSimulator = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { 
      id: 1, 
      name: "Planning (การวางแผน)", 
      icon: <Search className="w-8 h-8" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      desc: "เป็นระยะเริ่มต้นที่สำคัญที่สุด ทีมงานจะทำการรวบรวมความต้องการ (Requirement) จากลูกค้าหรือผู้ใช้งาน เพื่อทำความเข้าใจว่าปัญหาคืออะไร ระบบใหม่ควรมีฟีเจอร์อะไรบ้าง มีการวิเคราะห์ความเป็นไปได้ทางเทคนิค (Feasibility Study) ประเมินงบประมาณ กำลังคน และระยะเวลาที่ใช้",
      example: "ผู้อำนวยการโรงเรียนต้องการ 'ระบบยืมคืนห้องสมุด' ทีมงานเข้าไปสัมภาษณ์บรรณารักษ์ว่าต้องการให้ระบบทำอะไรได้บ้าง เช่น สแกนบาร์โค้ดได้, แจ้งเตือนคนค้างส่งหนังสือผ่าน Line ได้ เป็นต้น"
    },
    { 
      id: 2, 
      name: "Analysis (การวิเคราะห์)", 
      icon: <Settings className="w-8 h-8" />,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-200",
      desc: "นำข้อมูลจากระยะการวางแผนมาวิเคราะห์เชิงลึก เพื่อกำหนดขอบเขต (Scope) ของระบบให้ชัดเจน รวมถึงวิเคราะห์ระบบงานเดิม (ถ้ามี) ว่ามีปัญหาจุดไหน เพื่อนำมาปรับปรุงในระบบใหม่ ผลลัพธ์ของขั้นตอนนี้มักได้เอกสารข้อกำหนดความต้องการระบบ (SRS - Software Requirement Specification)",
      example: "ทีมงานสรุปว่าระบบยืมคืนหนังสือ จะต้องแบ่งสิทธิ์ผู้ใช้งานเป็น 2 ระดับ คือ นักเรียน (ดูประวัติการยืมได้) และ บรรณารักษ์ (จัดการข้อมูลหนังสือและอนุมัติการยืมได้)"
    },
    { 
      id: 3, 
      name: "Design (การออกแบบ)", 
      icon: <PenTool className="w-8 h-8" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      desc: "นำเอกสาร Requirement มาออกแบบสถาปัตยกรรมของระบบ ประกอบด้วย: การออกแบบฐานข้อมูล (Database Design), การออกแบบหน้าจอผู้ใช้งาน (UI/UX Design), และการออกแบบตรรกะหรืออัลกอริทึมการทำงานของโปรแกรมผ่านผังงาน (Flowchart)",
      example: "ทีมออกแบบวาดหน้าจอ (Mockup) ของแอปพลิเคชันห้องสมุด กำหนดว่าปุ่มยืมหนังสือสีเขียว ปุ่มคืนสีแดง และออกแบบตารางฐานข้อมูลเพื่อเก็บรายชื่อนักเรียนและหนังสือ"
    },
    { 
      id: 4, 
      name: "Implementation (การพัฒนา/เขียนโค้ด)", 
      icon: <Code2 className="w-8 h-8" />,
      color: "bg-pink-500",
      lightColor: "bg-pink-50",
      textColor: "text-pink-700",
      borderColor: "border-pink-200",
      desc: "ระยะที่โปรแกรมเมอร์จะลงมือเขียนโค้ด (Coding) จริงๆ โดยอาศัยภาษาคอมพิวเตอร์และเครื่องมือต่างๆ ตามที่ได้ออกแบบไว้ในระยะ Design ซึ่งเป็นขั้นตอนที่ใช้เวลามากที่สุดในการพัฒนาซอฟต์แวร์",
      example: "โปรแกรมเมอร์ใช้ภาษา Python ในการเขียนระบบหลังบ้าน (Backend) เพื่อคำนวณค่าปรับเมื่อส่งหนังสือเกินกำหนด และใช้ React สร้างหน้าเว็บ (Frontend)"
    },
    { 
      id: 5, 
      name: "Testing (การทดสอบ)", 
      icon: <TestTube2 className="w-8 h-8" />,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      desc: "นำโปรแกรมที่เขียนเสร็จแล้วมาทดสอบหาข้อผิดพลาด (Bug) และตรวจสอบว่าทำงานได้ถูกต้องตรงตาม Requirement ในระยะ Planning หรือไม่ โดยมีทั้งการทดสอบโดยทีมพัฒนา (Alpha Test) และทดสอบโดยผู้ใช้จริง (Beta Test/UAT)",
      example: "ทดลองสแกนบาร์โค้ดหนังสือจริง ทดลองให้ค้างส่งเกินกำหนดเพื่อดูว่าระบบคิดค่าปรับถูกต้องหรือไม่ หากเจอข้อผิดพลาด (Bug) เช่น คำนวณค่าปรับผิด ก็ส่งให้โปรแกรมเมอร์แก้"
    },
    { 
      id: 6, 
      name: "Maintenance (การบำรุงรักษา)", 
      icon: <Wrench className="w-8 h-8" />,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      desc: "ระยะหลังจากการส่งมอบซอฟต์แวร์ให้ลูกค้าใช้งานจริงแล้ว จะต้องมีการดูแลรักษา คอยแก้ปัญหาที่ผู้ใช้พบภายหลัง หรือทำการอัปเดตฟีเจอร์ใหม่ๆ (Patch Update) เพื่อให้ระบบมีความทันสมัยและปลอดภัยอยู่เสมอ",
      example: "โรงเรียนใช้งานระบบไปได้ 1 ปี มีการขอเพิ่มฟีเจอร์จองหนังสือล่วงหน้า ทีมงานก็ต้องทำการเขียนโค้ดเพิ่มเติมและปล่อยอัปเดตให้ระบบห้องสมุด"
    }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full -z-0"></div>
      
      <div className="relative z-10 text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-4">
          Interactive Timeline: ระยะต่างๆ ของ SDLC
        </h3>
        <p className="text-slate-500 text-lg">คลิกเลือกแต่ละระยะ (Phase) เพื่อศึกษาคำอธิบายและตัวอย่างการใช้งาน</p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-stretch">
        
        {/* Timeline Items */}
        <div className="w-full lg:w-2/5 flex flex-col gap-3 relative">
          <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-slate-100 z-0"></div>
          {phases.map((phase, idx) => (
            <div 
              key={phase.id}
              onClick={() => setActivePhase(idx)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 relative z-10 ${
                activePhase === idx 
                  ? `${phase.lightColor} border border-${phase.borderColor} shadow-sm translate-x-2` 
                  : `bg-white border border-transparent hover:bg-slate-50`
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0 shadow-md transition-transform ${
                activePhase === idx ? `${phase.color} scale-110` : 'bg-slate-300'
              }`}>
                {phase.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400">Phase {phase.id}</div>
                <div className={`text-lg font-bold ${activePhase === idx ? phase.textColor : 'text-slate-600'}`}>
                  {phase.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="w-full lg:w-3/5 flex">
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white flex-1 flex flex-col transition-all duration-300 border border-slate-700">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-800">
               <div className={`p-4 rounded-2xl ${phases[activePhase].color}`}>
                 {phases[activePhase].icon}
               </div>
               <div>
                  <div className={`font-mono font-bold mb-1 ${activePhase === 0 ? 'text-blue-400' : activePhase === 1 ? 'text-indigo-400' : activePhase === 2 ? 'text-purple-400' : activePhase === 3 ? 'text-pink-400' : activePhase === 4 ? 'text-emerald-400' : 'text-orange-400'}`}>
                    PHASE {phases[activePhase].id}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold leading-tight">{phases[activePhase].name}</h4>
               </div>
            </div>
            
            <div className="flex-1">
              <h5 className="text-lg font-bold text-slate-300 mb-3 flex items-center gap-2">
                <Search className="w-5 h-5" /> รายละเอียดการทำงาน
              </h5>
              <p className="text-lg leading-loose text-slate-300 mb-8">
                {phases[activePhase].desc}
              </p>

              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
                <h5 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5" /> ตัวอย่าง: โครงการระบบห้องสมุดโรงเรียน
                </h5>
                <p className="text-slate-300 leading-loose">
                  {phases[activePhase].example}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const pyUnit2_2_SDLC = () => {
  const teacherTaskContent = `
    ใบงาน "Software Company" ให้นักเรียนแบ่งกลุ่มเป็นบริษัทพัฒนาซอฟต์แวร์:
    1. ให้แต่ละกลุ่มเลือกหัวข้อโปรแกรม 1 อย่าง (เช่น แอปจองโต๊ะโรงอาหาร, แอปเรียกรถรับส่งนักเรียน, ระบบสั่งซื้อชุดนักเรียน)
    2. เขียนแผนการทำงานในแต่ละ Phase ของ SDLC ให้ชัดเจน (Planning -> Analysis -> Design -> Implementation -> Testing -> Maintenance)
    3. นำเสนอหน้าชั้นเรียน และให้เพื่อนกลุ่มอื่นช่วยกันหาช่องโหว่ในแผนการทำงาน
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        {/* Section 2.2.1: SDLC Meaning & Importance */}
        <div className="mb-16">
          <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-lg shadow-slate-200/50">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-4">
              <GitCommit className="w-10 h-10 text-emerald-500" />
              ความหมายและความสำคัญของ SDLC
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-slate-600 text-lg leading-loose mb-6">
                  <strong>SDLC (Software Development Life Cycle)</strong> หรือ วงจรการพัฒนาซอฟต์แวร์ 
                  คือ กระบวนการหรือกรอบการทำงาน (Framework) ขั้นพื้นฐานที่เป็นมาตรฐานในการสร้างและบำรุงรักษาซอฟต์แวร์ 
                  ทำหน้าที่เป็นแผนที่นำทางให้กับทีมพัฒนาตั้งแต่จุดเริ่มต้นที่ซอฟต์แวร์เป็นเพียงแค่ไอเดีย ไปจนถึงการเขียนโปรแกรม การทดสอบ และการใช้งานจริง
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                  <h4 className="font-bold text-emerald-800 text-xl mb-2">เป้าหมายสูงสุดของ SDLC</h4>
                  <p className="text-emerald-700 leading-loose">
                    เพื่อผลิตซอฟต์แวร์ที่มี <strong>คุณภาพสูง (High Quality)</strong> ตรงตามความต้องการของลูกค้าอย่างครบถ้วน 
                    สร้างเสร็จภายใน <strong>เวลาที่กำหนด (On-time)</strong> และใช้ <strong>งบประมาณไม่บานปลาย (On-budget)</strong>
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h4 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-rose-500" /> 
                  จะเกิดอะไรขึ้นถ้าพัฒนาซอฟต์แวร์โดยไม่ใช้ SDLC?
                </h4>
                <div className="space-y-4">
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                    <div className="mt-1 bg-rose-200 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                    <p className="text-rose-900 leading-loose"><strong>พัฒนาผิดทิศทาง:</strong> สร้างโปรแกรมเสร็จแล้ว แต่ไม่ใช่สิ่งที่ลูกค้าต้องการ ทำให้เสียเวลาและเงินฟรี</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                    <div className="mt-1 bg-rose-200 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                    <p className="text-rose-900 leading-loose"><strong>โครงสร้างเละเทะ (Spaghetti Code):</strong> เขียนโค้ดโดยไม่ออกแบบล่วงหน้า พอกลับมาแก้บั๊กจะทำได้ยากมาก และอาจกระทบส่วนอื่น</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                    <div className="mt-1 bg-rose-200 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                    <p className="text-rose-900 leading-loose"><strong>โปรแกรมพังเมื่อคนใช้เยอะ:</strong> ไม่มีการทดสอบ (Testing) อย่างเป็นระบบ เมื่อนำไปใช้งานจริงระบบอาจล่มทันที</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2.2.2 & 2.2.3: Phases of SDLC & Examples */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-emerald-500">
          ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์ และตัวอย่างการใช้งาน
        </h3>
        <p className="text-slate-600 text-lg leading-loose mb-10">
          วงจร SDLC มักจะแบ่งออกเป็น 5-7 ระยะ (Phase) แล้วแต่โมเดลที่ใช้งาน แต่รูปแบบมาตรฐานที่นิยมใช้กันทั่วไปเพื่อสร้างความเข้าใจพื้นฐาน จะประกอบด้วย 6 ระยะหลัก ดังนี้
        </p>

        <SdlcTimelineSimulator />

        <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl mb-16 text-center">
           <h3 className="text-2xl font-bold text-white mb-4">เกร็ดความรู้เพิ่มเติม: โมเดลการพัฒนาซอฟต์แวร์</h3>
           <p className="text-slate-400 leading-loose max-w-4xl mx-auto">
             SDLC ที่ทำงานเป็นลำดับขั้น น้ำไหลจากบนลงล่างโดยไม่ย้อนกลับ เรียกว่า <strong>Waterfall Model</strong> แต่ในปัจจุบัน โลกหมุนเร็วขึ้น บริษัทไอทีสมัยใหม่ (เช่น Google, Facebook) นิยมใช้การพัฒนาแบบ <strong>Agile</strong> ซึ่งเป็นการแบ่งการทำงานเป็นรอบสั้นๆ (Sprint) นำซอฟต์แวร์ชิ้นเล็กๆ ไปให้ลูกค้าลองใช้และรับ Feedback มาปรับปรุงทันที ทำให้ยืดหยุ่นต่อการเปลี่ยนแปลงมากกว่า
           </p>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.2)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_2_SDLC;
