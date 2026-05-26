import React, { useState } from 'react';
import { 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  Search,
  PenTool,
  Code2,
  Bug,
  Rocket,
  Wrench,
  Layers,
  Users,
  Settings,
  Sparkles
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
      {/* Vibrant Gradient Background for Border */}
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

const SDLCSimulator = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: 1,
      title: "วิเคราะห์ความต้องการ",
      subtitle: "Requirement Analysis",
      icon: <Search className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-500",
      bgLight: "bg-cyan-50",
      textDark: "text-cyan-700",
      borderGlow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
      desc: "พูดคุยกับลูกค้า (User) เพื่อหาว่าแอปพลิเคชันนี้ต้องทำอะไรได้บ้าง ใครเป็นคนใช้ และมีข้อจำกัดอะไรไหม",
      output: "เอกสารความต้องการระบบ (SRS)",
      roles: ["System Analyst (SA)", "Product Owner"]
    },
    {
      id: 2,
      title: "การออกแบบระบบ",
      subtitle: "System Design",
      icon: <PenTool className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-indigo-50",
      textDark: "text-indigo-700",
      borderGlow: "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
      desc: "นำความต้องการมาออกแบบหน้าตาแอปพลิเคชัน (UI/UX) และวางโครงสร้างฐานข้อมูล (Database) ก่อนลงมือเขียนโค้ด",
      output: "Wireframe / Mockup / Database Schema",
      roles: ["UX/UI Designer", "System Architect"]
    },
    {
      id: 3,
      title: "การพัฒนาซอฟต์แวร์",
      subtitle: "Development / Coding",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgLight: "bg-purple-50",
      textDark: "text-purple-700",
      borderGlow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      desc: "โปรแกรมเมอร์เริ่มลงมือเขียนโค้ดภาษาต่างๆ (เช่น Python, JavaScript) ตามแบบที่ได้วางไว้ในขั้นตอน Design",
      output: "Source Code / ตัวแอปพลิเคชันเวอร์ชันแรก",
      roles: ["Frontend Developer", "Backend Developer"]
    },
    {
      id: 4,
      title: "การทดสอบ",
      subtitle: "Testing",
      icon: <Bug className="w-6 h-6" />,
      color: "from-purple-500 to-fuchsia-500",
      bgLight: "bg-fuchsia-50",
      textDark: "text-fuchsia-700",
      borderGlow: "shadow-[0_0_20px_rgba(217,70,239,0.4)]",
      desc: "ทดลองใช้งานแอปพลิเคชันเพื่อหาข้อผิดพลาด (Bugs) และตรวจสอบว่าทำงานได้ครบตามที่วิเคราะห์ไว้หรือไม่",
      output: "Test Report / ซอฟต์แวร์ที่พร้อมใช้งาน",
      roles: ["QA / Tester", "QC"]
    },
    {
      id: 5,
      title: "ติดตั้งและใช้งานจริง",
      subtitle: "Deployment",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-fuchsia-500 to-pink-500",
      bgLight: "bg-pink-50",
      textDark: "text-pink-700",
      borderGlow: "shadow-[0_0_20px_rgba(236,72,153,0.4)]",
      desc: "นำซอฟต์แวร์ไปติดตั้งบน Server หรือนำขึ้น App Store/Play Store เพื่อให้ผู้ใช้งานทั่วไปสามารถดาวน์โหลดและเริ่มใช้งานได้",
      output: "Live Application",
      roles: ["DevOps Engineer", "System Admin"]
    },
    {
      id: 6,
      title: "บำรุงรักษา",
      subtitle: "Maintenance",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-pink-500 to-amber-400",
      bgLight: "bg-amber-50",
      textDark: "text-amber-700",
      borderGlow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
      desc: "คอยแก้ไขปัญหาที่ผู้ใช้แจ้งเข้ามา (Fix Bugs) อัปเดตความปลอดภัย และเพิ่มฟีเจอร์ใหม่ๆ ในอนาคต",
      output: "Software Updates / Patches",
      roles: ["Support Team", "Developer"]
    }
  ];

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden group">
      {/* Dynamic Glow Background based on active phase */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] z-0 pointer-events-none opacity-40 transition-all duration-1000 bg-gradient-to-br ${phases[activePhase].color}`}></div>
      
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-200 bg-white/70 shadow-sm mb-4 text-fuchsia-600 text-sm font-bold">
          <Layers className="w-4 h-4" /> Interactive Journey
        </div>
        <h3 className="text-3xl font-bold text-slate-800">
          จำลองวงจรการทำงาน SDLC
        </h3>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">คลิกที่แต่ละขั้นตอนเพื่อดูหน้าที่, บทบาททีมงาน และผลลัพธ์ที่ได้จากการทำงานในเฟสนั้นๆ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Timeline Navigation */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {phases.map((phase, idx) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(idx)}
              className={`relative flex items-center p-4 rounded-2xl transition-all duration-300 text-left border-2
                ${activePhase === idx 
                  ? `bg-white border-transparent ${phase.borderGlow} scale-[1.02]` 
                  : 'bg-white/50 border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100'}
              `}
            >
              {/* Animated Gradient Border for active state */}
              {activePhase === idx && (
                <div className={`absolute inset-0 bg-gradient-to-r ${phase.color} rounded-2xl -z-10 p-[2px]`}>
                  <div className="absolute inset-0 bg-white rounded-2xl"></div>
                </div>
              )}
              
              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4 transition-colors duration-300 ${activePhase === idx ? `bg-gradient-to-br ${phase.color} text-white shadow-lg` : 'bg-slate-100 text-slate-400'}`}>
                {phase.icon}
              </div>
              <div className="relative z-10">
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${activePhase === idx ? phase.textDark : 'text-slate-400'}`}>
                  Phase {phase.id}
                </div>
                <div className={`font-bold text-lg leading-tight ${activePhase === idx ? 'text-slate-800' : 'text-slate-600'}`}>
                  {phase.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Phase Details Content */}
        <div className="lg:col-span-7 flex flex-col">
          <div className={`flex-grow rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl relative overflow-hidden transition-all duration-500 bg-white`}>
            
            {/* Top right decorative icon */}
            <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10 flex items-center justify-center bg-gradient-to-br ${phases[activePhase].color}`}>
              {phases[activePhase].icon}
            </div>

            <div className="relative z-10">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">รายละเอียด (Description)</h4>
              <h3 className={`text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${phases[activePhase].color}`}>
                {phases[activePhase].title} <br/>
                <span className="text-xl font-bold text-slate-400">{phases[activePhase].subtitle}</span>
              </h3>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {phases[activePhase].desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Output Card */}
                <div className={`${phases[activePhase].bgLight} p-5 rounded-2xl border border-white/50 shadow-inner`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className={`w-5 h-5 ${phases[activePhase].textDark}`} />
                    <h5 className={`font-bold ${phases[activePhase].textDark}`}>สิ่งที่ได้ (Output)</h5>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-700 bg-white p-3 rounded-xl shadow-sm">
                    {phases[activePhase].output}
                  </div>
                </div>

                {/* Team Card */}
                <div className={`${phases[activePhase].bgLight} p-5 rounded-2xl border border-white/50 shadow-inner`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className={`w-5 h-5 ${phases[activePhase].textDark}`} />
                    <h5 className={`font-bold ${phases[activePhase].textDark}`}>ทีมงานหลัก (Roles)</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phases[activePhase].roles.map(role => (
                      <span key={role} className={`text-xs font-bold px-3 py-1.5 rounded-lg bg-white shadow-sm border border-slate-100 ${phases[activePhase].textDark}`}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "จำลองการสร้างแอปพลิเคชันด้วยแนวคิด SDLC"

สถานการณ์: 
โรงเรียนต้องการสร้าง "แอปพลิเคชันสั่งอาหารโรงอาหารล่วงหน้า (School Food Delivery)" เพื่อแก้ปัญหานักเรียนรอคิวซื้อข้าวนานในช่วงพักเที่ยง

คำสั่ง:
ให้นักเรียนแบ่งกลุ่ม และร่วมกันเขียนแผนการทำงานตามวงจร SDLC 6 ขั้นตอน ว่าในแต่ละขั้นตอน กลุ่มของนักเรียนจะต้อง "ทำอะไรบ้าง" สำหรับแอปพลิเคชันนี้

ตัวอย่างแนวการตอบ:
1. วิเคราะห์ (Requirement): ไปสัมภาษณ์แม่ค้าและนักเรียน ว่าต้องการระบบจ่ายเงินแบบไหน เมนูมีอะไรบ้าง
2. ออกแบบ (Design): วาดหน้าจอแอปพลิเคชันว่าปุ่มสั่งอาหารอยู่ตรงไหน สีอะไร
... (ให้นักเรียนเขียนต่อจนถึงขั้นที่ 6)`;

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
              <span className="bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">Unit 2.2</span>
              ขั้นตอนการเขียนโปรแกรม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              วงจรการพัฒนาซอฟต์แวร์ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500">
                (Software Development Life Cycle)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-fuchsia-500 pl-6 mt-4 relative">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              การสร้างโปรแกรมหรือแอปพลิเคชันหนึ่งตัว ไม่ใช่แค่การเปิดคอมพิวเตอร์แล้วนั่งพิมพ์โค้ดทันที แต่เปรียบเสมือน <strong>"การสร้างบ้าน"</strong> ที่ต้องมี การคุยกับเจ้าของบ้าน ออกแบบแปลน ก่อสร้าง ทดสอบระบบไฟ และการบำรุงรักษา กระบวนการทั้งหมดนี้เราเรียกว่า <strong>SDLC</strong>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* 2.2.1 ความหมายและความสำคัญ */}
        {}
        <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-fuchsia-50 opacity-50 z-0"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-3/5">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <span className="text-fuchsia-500">2.2.1</span> ความหมายและความสำคัญ
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>SDLC (Software Development Life Cycle)</strong> คือ กรอบการทำงาน (Framework) หรือมาตรฐานที่อธิบายถึงขั้นตอนการสร้างซอฟต์แวร์ ตั้งแต่เริ่มต้นคิดโปรเจกต์ ไปจนถึงการปล่อยซอฟต์แวร์ให้ใช้งานจริง และการดูแลรักษาอย่างต่อเนื่อง 
                </p>
                <p className="text-md text-slate-600 leading-relaxed mb-6 bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm">
                  หากนักพัฒนาโปรแกรม (Developer) เริ่มต้นเขียนโค้ดทันทีโดยไม่มีการวางแผนตาม SDLC ผลลัพธ์ที่ได้มักจะเป็นซอฟต์แวร์ที่ "ทำงานไม่ตรงกับที่ลูกค้าต้องการ" "มีบั๊ก (Bug) มหาศาล" หรือ "งบประมาณบานปลาย" ซึ่งภาษาโปรแกรมเมอร์มักเรียกโค้ดที่ไม่ได้วางแผนว่า <em>Spaghetti Code</em> (โค้ดที่พันกันมั่วไปหมดเหมือนเส้นสปาเก็ตตี้)
                </p>

                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-full blur-[50px] opacity-30"></div>
                  <h4 className="font-bold text-cyan-400 mb-4 flex items-center gap-2 text-lg">
                    <Settings className="w-5 h-5" /> ทำไมทุกองค์กรเทคโนโลยีต้องใช้ SDLC?
                  </h4>
                  <ul className="space-y-4 text-slate-300 font-medium text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-white block mb-1">ทำงานอย่างมีทิศทาง (Clear Goal)</strong>
                        ทีมงานทุกคน (ทั้งโปรแกรมเมอร์, นักออกแบบ, ผู้ทดสอบระบบ) จะรู้ว่าตอนนี้โปรเจกต์อยู่ในขั้นตอนไหน และเป้าหมายของขั้นตอนนี้คืออะไร
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                         <strong className="text-white block mb-1">ควบคุมต้นทุนและเวลา (Time & Cost Control)</strong>
                         ลดปัญหาการต้องรื้อระบบทำใหม่ทั้งหมด เพราะมีการตรวจสอบและยืนยันความถูกต้องในทุกๆ ขั้นตอน
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-white block mb-1">ส่งมอบซอฟต์แวร์ที่มีคุณภาพ (High Quality)</strong>
                        ลดข้อผิดพลาด (Bugs) ก่อนถึงมือผู้ใช้งานจริง เนื่องจากมีขั้นตอนการ Testing อย่างเป็นระบบ
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="md:w-2/5 flex flex-col gap-6">
                {/* Decorative Element */}
                <div className="relative w-full aspect-square max-w-[250px] mx-auto">
                  <div className="absolute inset-0 border-4 border-dashed border-fuchsia-300 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute inset-4 bg-white rounded-full shadow-xl flex items-center justify-center flex-col text-center p-4">
                    <Layers className="w-12 h-12 text-fuchsia-500 mb-2" />
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-2xl leading-none">6 Phases<br/><span className="text-sm font-bold text-slate-400">of SDLC</span></span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-amber-200 opacity-50"><BookOpen className="w-24 h-24" /></div>
                  <h4 className="font-bold text-amber-700 mb-2 relative z-10 flex items-center gap-2">💡 เปรียบเทียบให้เห็นภาพ</h4>
                  <p className="text-sm text-amber-800 leading-relaxed relative z-10">
                    การเขียนโปรแกรมโดยไม่มี SDLC ก็เหมือน <strong>การสร้างตึกโดยไม่มีแปลน</strong> <br/><br/>
                    คุณอาจจะก่ออิฐได้เร็วในวันแรก แต่เมื่อสร้างไปถึงชั้น 3 คุณอาจพบว่าบันไดผิดตำแหน่ง ท่อประปาขวางทางเดิน และสุดท้ายตึกอาจถล่มลงมา การใช้ SDLC คือการร่างแบบแปลนและตรวจฐานรากให้แน่นก่อนลงมือก่อสร้างนั่นเอง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.2.2 ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์ (Integrated via Simulator) */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <span className="text-cyan-500">2.2.2</span> ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์
          </h2>
          <p className="text-slate-600 mb-8 text-lg">แม้ว่าการพัฒนาซอฟต์แวร์จะมีหลายโมเดล (เช่น Waterfall, Agile) แต่โดยทั่วไปจะประกอบด้วย 6 ระยะหลัก ลองคลิกดูด้านล่างเลยครับ!</p>
          
          <SDLCSimulator />
        </section>
        
        {/* 2.2.3 ตัวอย่างการใช้งาน SDLC */}
        {}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-amber-500">2.2.3</span> ตัวอย่างการใช้งาน SDLC ในสถานการณ์จริง
          </h2>
          
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
               <h3 className="text-3xl font-black relative z-10 drop-shadow-md">
                 Case Study: ระบบยืม-คืนหนังสือห้องสมุดโรงเรียน
               </h3>
               <p className="text-amber-50 mt-2 text-lg relative z-10 font-medium">
                 มาดูกันว่าถ้านักเรียนต้องสร้างโปรแกรมให้ห้องสมุด จะต้องผ่าน 6 ขั้นตอนอย่างไรบ้าง?
               </p>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              
              {/* Phase 1 & 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-8 border-l-2 border-cyan-400">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-cyan-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-cyan-500 font-black">1. วิเคราะห์</span> (Requirement)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    ไปสัมภาษณ์คุณครูบรรณารักษ์ พบปัญหาว่า <em>"จดลงสมุดแล้วหายบ่อย เด็กจำวันคืนไม่ได้"</em> จึงสรุปความต้องการว่า โปรแกรมต้องสามารถ <strong>สแกนบาร์โค้ดหนังสือได้, บันทึกชื่อนักเรียนได้, และคำนวณค่าปรับอัตโนมัติหากส่งช้า</strong>
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-blue-500 font-black">2. ออกแบบ</span> (Design)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    วาดหน้าจอ (Mockup) ว่าปุ่มสแกนอยู่ตรงไหน สีอะไร ออกแบบฐานข้อมูลตารางหนังสือที่มี (รหัสหนังสือ, ชื่อเรื่อง, สถานะยืม/ว่าง) และตารางนักเรียน (รหัสนักเรียน, ชื่อ, ประวัติการยืม) เพื่อเตรียมความพร้อมให้โปรแกรมเมอร์
                  </p>
                </div>
              </div>

              {/* Phase 3 & 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-8 border-l-2 border-indigo-500">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-indigo-500 font-black">3. พัฒนา</span> (Development)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    นักเรียนที่รับหน้าที่เขียนโค้ด (Coder) เริ่มเปิดโปรแกรม VS Code และใช้ภาษา Python เขียนคำสั่งรับค่าบาร์โค้ด, ตรวจสอบเงื่อนไขใน Database, และคำนวณวันกำหนดคืน
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-purple-500">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-purple-500 font-black">4. ทดสอบ</span> (Testing)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    ลองพิมพ์รหัสนักเรียนมั่วๆ ดูว่าโปรแกรมแจ้งเตือนไหม? ลองปรับวันที่ในคอมพิวเตอร์ให้เกินกำหนดคืน แล้วดูว่าโปรแกรมคิดค่าปรับวันละ 5 บาทได้ถูกต้องหรือไม่ ถ้าโปรแกรมค้าง (Crash) ต้องกลับไปแก้โค้ดใหม่
                  </p>
                </div>
              </div>

              {/* Phase 5 & 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-8 border-l-2 border-fuchsia-500">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-fuchsia-500 ring-4 ring-fuchsia-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-fuchsia-500 font-black">5. ติดตั้งใช้งาน</span> (Deployment)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    นำโปรแกรมที่สมบูรณ์ไปติดตั้งลงในคอมพิวเตอร์ที่เคาน์เตอร์ห้องสมุด เชื่อมต่อกับเครื่องสแกนบาร์โค้ดของจริง และจัดอบรมสอนคุณครูบรรณารักษ์ให้ใช้งานโปรแกรมเบื้องต้น
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-amber-500">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                    <span className="text-amber-500 font-black">6. บำรุงรักษา</span> (Maintenance)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    ผ่านไป 3 เดือน คุณครูแจ้งว่า "อยากให้ระบบเชื่อมกับ LINE เพื่อทวงหนังสือเด็กได้" ทีมงานจึงต้องมารับฟังความต้องการ (วนกลับไปข้อ 1 ใหม่) และอัปเดตเวอร์ชันโปรแกรมให้เก่งขึ้น
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมการเรียนรู้: SDLC In Action" taskText={teacherTaskContent} />

        {/* Next Topic Suggestion */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4 font-medium">เข้าใจภาพรวมของการสร้างซอฟต์แวร์แล้วใช่ไหม? ขั้นตอนต่อไปเราจะมาเจาะลึกการ "ออกแบบ" ด้วยผังงานกัน</p>
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-lg border border-fuchsia-100 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-slate-600">หัวข้อถัดไป:</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-amber-500 text-lg">2.3 สัญลักษณ์ผังงาน (Flowchart)</span>
            <ArrowRight className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-xs text-slate-400 mt-4">(พิมพ์ "2.3" เพื่อเข้าสู่เนื้อหาถัดไป)</p>
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
      `}} />
    </div>
  );
}