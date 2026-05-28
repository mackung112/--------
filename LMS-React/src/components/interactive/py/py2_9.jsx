import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Check, 
  X, 
  AlertTriangle, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  Award, 
  Play, 
  Pause,
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  ArrowRight,
  Info,
  CheckCircle2,
  MousePointerClick,
  Activity,
  ThumbsUp,
  HelpCircle
} from 'lucide-react';

export default function pyUnit2_9_GoodFlowchartPractices() {
  // Simulator 1 State: Interactive Flow Rules Explorer
  const [activeRule, setActiveRule] = useState(null);
  const [lightLevel, setLightLevel] = useState(30); // 0% - 100%
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Start, 2: Input, 3: Decision, 4: Action, 5: Connect, 6: End
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulator 2 State: Flowchart Audit Studio
  const [auditedBugs, setAuditedBugs] = useState({
    multipleStarts: false,
    wrongShape: false,
    danglingArrow: false,
    infiniteLoop: false
  });
  const [activeBugDetail, setActiveBugDetail] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [showCelebrate, setShowCelebrate] = useState(false);

  // Compute audit score
  const solvedCount = Object.values(auditedBugs).filter(Boolean).length;
  const compliancePercentage = solvedCount * 25;

  // Auto progression of rule simulation
  useEffect(() => {
    let timer;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 6) {
            setIsSimulating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      setSimStep(0);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  // Trigger celebration on 100% compliance
  useEffect(() => {
    if (solvedCount === 4) {
      setShowCelebrate(true);
    } else {
      setShowCelebrate(false);
    }
  }, [solvedCount]);

  const handleFixBug = (bugKey) => {
    setAuditedBugs(prev => ({
      ...prev,
      [bugKey]: true
    }));
    setActiveBugDetail(null);
  };

  const handleResetAudit = () => {
    setAuditedBugs({
      multipleStarts: false,
      wrongShape: false,
      danglingArrow: false,
      infiniteLoop: false
    });
    setActiveBugDetail(null);
    setIsScanned(false);
    setShowCelebrate(false);
  };

  const triggerScan = () => {
    setIsScanned(true);
  };

  // Standard Rules Database
  const flowchartRules = [
    {
      id: "flow-direction",
      title: "ทิศทางเป็นระบบและสม่ำเสมอ",
      desc: "ทิศทางการไหลของข้อมูลและลำดับการทำงานควรเรียงลำดับจาก บนลงล่าง (Top-to-Bottom) หรือจาก ซ้ายไปขวา (Left-to-Right) เป็นหลัก หลีกเลี่ยงการลากเส้นวกวนไปมาอย่างไร้ทิศทาง เพื่อให้ผู้คนอ่านเข้าใจง่ายที่สุด",
      tip: "ถ้าจำเป็นต้องวาดเส้นย้อนกลับ (เช่น การวนลูป) ให้ลากลูกศรขึ้นไปเชื่อมกับทิศทางหลักอย่างชัดเจน"
    },
    {
      id: "ansi-standard",
      title: "เลือกใช้สัญลักษณ์ตามมาตรฐาน ANSI",
      desc: "ทุกขั้นตอนทำงานต้องใช้สัญลักษณ์ให้ตรงกับความหมายสากล ห้ามคิดรูปทรงขึ้นมาเอง เช่น สี่เหลี่ยมผืนผ้าสำหรับกระบวนการประมวลผล สี่เหลี่ยมขนมเปียกปูนสำหรับการตัดสินใจ และทรง Display สำหรับแสดงผลจอภาพ",
      tip: "การแสดงผลหน้าจอ (Display) ต้องใช้รูปทรงด้านขวาแหลมและด้านซ้ายโค้งเว้าตามแบบสากลเท่านั้น"
    },
    {
      id: "single-entry-exit",
      title: "มีจุดเริ่มต้นและจุดสิ้นสุดอย่างละหนึ่งเดียว",
      desc: "ผังงานที่ดีต้องมีจุดเริ่มต้น (Start) และจุดสิ้นสุด (Stop) เพียงจุดเดียวเท่านั้น เพื่อไม่ให้เกิดความสับสนว่าโปรแกรมจะเริ่มทำงานจากตรงไหนและสิ้นสุดตรงไหนอย่างเป็นเอกภาพ",
      tip: "กรณีที่มีเงื่อนไขแยกหลายทาง ทุกทิศทางต้องถูกรวบกลับมาบรรจบกันที่จุดสิ้นสุดจุดเดียวกันเสมอ"
    },
    {
      id: "no-crossing",
      title: "หลีกเลี่ยงการลากเส้นตัดกันโดยเด็ดขาด",
      desc: "การวาดเส้นลูกศรตัดทับกันไปมาทำให้ผังงานดูสับสนและยากต่อการแกะรอย ให้พยายามจัดเลย์เอาต์ใหม่ หรือใช้จุดเชื่อมต่อในหน้าเดียวกัน (On-page Connector - วงกลมขนาดเล็ก) หรือเชื่อมโยงหน้าอื่น (Off-page Connector) แทน",
      tip: "หากจำเป็นต้องข้ามเส้น ให้ใช้สัญลักษณ์จุดเชื่อมต่อเพื่อระบุความสัมพันธ์แทนการโยงเส้นข้ามกันตรงๆ"
    },
    {
      id: "clear-text",
      title: "ข้อความด้านในกระชับและตรงประเด็น",
      desc: "ข้อความภายในกล่องสัญลักษณ์ต้องสั้น กระชับ อ่านเข้าใจง่ายในเสี้ยววินาที ควรระบุเป็นคำสั่งสั้นๆ เช่น 'รับค่า X' หรือ 'คำนวณ Sum = A + B' ไม่ควรเขียนคำอธิบายยาวเป็นประโยคข้อความในกล่อง",
      tip: "ใช้รูปแบบคำกริยาหรือคำหลักสไตล์รหัสเทียม (Pseudocode) จะช่วยเพิ่มความกระชับและเป็นมืออาชีพ"
    }
  ];

  // Bug database for the Audit Studio
  const bugDatabase = {
    multipleStarts: {
      key: "multipleStarts",
      title: "จุดเริ่มต้นซ้ำซ้อน (Multiple Start Nodes)",
      whyBad: "การมีจุดเริ่มต้นหลายจุดสร้างความสับสนอย่างรุนแรงในการไล่โค้ด คอมพิวเตอร์ไม่สามารถเริ่มทำงานสองจุดพร้อมกันได้ในผังงานมาตรฐานเดี่ยว",
      howToFix: "รวมเส้นทางทั้งหมดให้ออกจากจุดเริ่มต้นเดียว (Start) แล้วใช้กระบวนการรับข้อมูลหรือทางเลือกในการแยกทิศทางถัดไป",
      icon: <Terminal className="w-5 h-5 text-rose-500" />
    },
    wrongShape: {
      key: "wrongShape",
      title: "สัญลักษณ์เงื่อนไขผิดประเภท (Incorrect Symbol Shape)",
      whyBad: "ใช้รูปสี่เหลี่ยมผืนผ้า (Process) แทนที่จะใช้สี่เหลี่ยมขนมเปียกปูน (Decision) สำหรับขั้นตอนตรวจสอบเงื่อนไข ทำให้ผู้อ่านและผู้วิเคราะห์ระบบมองไม่เห็นจุดแยกการตัดสินใจ",
      howToFix: "เปลี่ยนจากสี่เหลี่ยมผืนผ้าปกติ ให้กลายเป็นสี่เหลี่ยมขนมเปียกปูน (Diamond) เพื่อให้ชัดเจนว่ามีทางเลือกแยกออกไป 2 ทาง",
      icon: <Layers className="w-5 h-5 text-rose-500" />
    },
    danglingArrow: {
      key: "danglingArrow",
      title: "เส้นเชื่อมลอยเคว้งไม่มีจุดหมาย (Dangling Flowline)",
      whyBad: "เส้นเชื่อมโยงทางเดินข้อมูลไม่มีหัวลูกศรกำกับทิศทาง และลากชี้ไปที่พื้นที่ว่างโดยไม่มีจุดเชื่อมต่อ ทำให้อัลกอริทึมขาดตอนและไม่สามารถประมวลผลต่อได้",
      howToFix: "ใส่หัวลูกศรให้ชัดเจน และชี้เชื่อมโยงไปยังสัญลักษณ์ที่เป็นปลายทาง เช่น ส่งข้อความแจ้งเตือนไปที่หน้าจอแสดงผล",
      icon: <Activity className="w-5 h-5 text-rose-500" />
    },
    infiniteLoop: {
      key: "infiniteLoop",
      title: "ลูปอนันต์/ไม่มีทางออกจากระบบ (Infinite Loop / Dead End)",
      whyBad: "การโยงทิศทางกลับเพื่อวนทำงานซ้ำที่ไม่มีการตรวจสอบค่าตรวจสอบใหม่ หรือไม่มีเส้นทางออกไปยังจุดสิ้นสุด (Stop) เลย จะทำให้ระบบทำงานค้างและล่มทันที",
      howToFix: "สร้างทิศทางออก (เช่น เมื่อเกิดข้อผิดพลาดครบ 3 ครั้ง หรือเมื่อผู้ใช้ยกเลิก) และเชื่อมโยงทิศทางนั้นลงไปยังจุดสิ้นสุด (Stop)",
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />
    }
  };

  // Helper to determine simulation step node color
  const getNodeColor = (stepNum, activeColor) => {
    if (simStep === stepNum) return `${activeColor} ring-4 ${activeColor}/40 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.5)]`;
    return 'border-slate-700 bg-slate-800/80 text-slate-300';
  };

  // Teacher Task instruction text
  const teacherTaskContent = `ใบงานปฏิบัติการ "นักวิเคราะห์และสถาปนิกผังงานชั้นครู"
ให้นักเรียนเลือกทำภารกิจต่อไปนี้ลงในสมุดบันทึกหรือเครื่องมือวาดผังงาน:

ภารกิจที่ 1: วิเคราะห์ข้อบกพร่อง (10 คะแนน)
- ครูมีผังงานคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7% (VAT) แต่ผังงานนี้มีจุดบกพร่องตามมาตรฐาน ANSI อยู่ 3 จุดหลัก
- ให้นักเรียนเขียนอธิบายข้อผิดพลาดทั้ง 3 จุดนั้นโดยอ้างอิงหลักการเขียนผังงานที่ดี (เช่น การใช้สัญลักษณ์ผิดรูป, ทิศทางย้อนศร, ขาดจุดสิ้นสุด) พร้อมบอกวิธีแก้ไขที่ถูกต้องอย่างเป็นระบบ

ภารกิจที่ 2: ออกแบบผังงานควบคุมระบบเซนเซอร์แจ้งเตือนน้ำท่วม (15 คะแนน)
- ให้นักเรียนเขียนผังงานแบบโต้ตอบสำหรับควบคุม "เครื่องตรวจวัดระดับน้ำและเปิดสวิตช์เครื่องสูบน้ำอัตโนมัติ"
- ข้อกำหนดในการออกแบบ:
  1. มีจุดเริ่มต้นและจุดสิ้นสุดเพียงอย่างละ 1 จุด
  2. รับค่าระดับน้ำ (Water Level) เข้ามาอย่างต่อเนื่อง
  3. ตรวจสอบว่าระดับน้ำสูงกว่า 80 ซม. หรือไม่?
  4. หากสูงกว่า (ใช่): ให้สั่ง "เปิดเครื่องสูบน้ำอัตโนมัติ" และแสดงข้อความเตือน "ระดับน้ำวิกฤต!" ทางหน้าจอคอมพิวเตอร์ (ใช้รูปทรง ANSI Display ให้ถูกต้อง)
  5. หากไม่สูงกว่า (ไม่ใช่): ให้สั่ง "ปิดเครื่องสูบน้ำ"
  6. วาดผังงานให้สะอาด เรียบร้อย ทิศทางลูกศรไม่อ้อมไปมาหรือตัดกัน และระบุข้อความในกล่องให้กระชับที่สุด
- ส่งผลงานเป็นภาพถ่ายการวาดในกระดาษ หรือลิงก์จากโปรแกรม draw.io`;

  return (
    <div className="min-h-screen text-slate-800 pb-20 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[5%] w-[40rem] h-[40rem] bg-cyan-200/30 rounded-full blur-[130px] duration-10000"></div>
        <div className="absolute top-[60%] left-[40%] w-[25rem] h-[25rem] bg-violet-200/40 rounded-full blur-[100px] animate-bounce duration-7000"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-16">
        
        {/* Subtitle Summary Card */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="bg-indigo-500/20 text-indigo-300 font-mono text-sm px-4 py-1.5 rounded-full border border-indigo-400/30 inline-block font-semibold">
              Algorithm Design & Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-normal tracking-tight">
              ทำไมเราต้องใส่ใจการเขียนผังงานที่ดี?
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              การเขียนผังงาน (Flowchart) ไม่ได้เป็นเพียงแค่การลากรูปส่งๆ ไปเพื่อประกอบเอกสาร 
              แต่เปรียบเสมือน <strong>"พิมพ์เขียววิศวกรรม"</strong> ของระบบซอฟต์แวร์ 
              ผังงานที่ถูกต้องได้มาตรฐานจะช่วยป้องกันความเข้าใจที่คลาดเคลื่อนระหว่างผู้พัฒนาและผู้ออกแบบระบบ 
              รวมถึงทำให้การเปลี่ยนภาพอัลกอริทึมไปเป็นรหัสโปรแกรมจริง (Coding) เป็นไปได้อย่างรวดเร็ว ไร้ข้อผิดพลาด
            </p>
          </div>
        </div>

        {/* 2.9.1 กฎเกณฑ์และข้อกำหนดในการเขียนผังงานที่ดี */}
        <div className="space-y-8">
          <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              กฎเกณฑ์และข้อกำหนดในการเขียนผังงานที่ดี
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              แนวทางเชิงปฏิบัติของสถาบันมาตรฐานสากล เพื่อรังสรรค์ผังงานที่เป็นระบบ สวยงาม และสื่อสารได้อย่างมีประสิทธิภาพสูงสุด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Rules Card List */}
            <div className="lg:col-span-5 space-y-4">
              {flowchartRules.map((rule, idx) => {
                const isActive = activeRule === rule.id;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setActiveRule(isActive ? null : rule.id)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left select-none relative overflow-hidden group ${
                      isActive 
                        ? 'bg-white border-indigo-500 shadow-md shadow-indigo-100 scale-[1.01]' 
                        : 'bg-white/80 hover:bg-white border-slate-200 shadow-sm hover:shadow hover:scale-[1.005]'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                        isActive ? 'bg-indigo-550 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50'
                      }`}>
                        <span className="font-mono font-bold text-sm">0{idx + 1}</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className={`text-base md:text-lg font-bold transition-colors ${
                          isActive ? 'text-indigo-650' : 'text-slate-800'
                        }`}>
                          {rule.title}
                        </h4>
                        
                        {/* Expandable description with smooth transition */}
                        <div className={`transition-all duration-300 overflow-hidden text-sm leading-relaxed ${
                          isActive ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-slate-600 mb-3">{rule.desc}</p>
                          <div className="bg-indigo-50 border-l-2 border-indigo-500 p-2.5 rounded-r-lg text-xs text-indigo-850 font-medium">
                            <span className="font-bold text-indigo-900 block mb-0.5">💡 เคล็ดลับมือโปร:</span>
                            {rule.tip}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Live Interactive SVG Flowchart Simulator */}
            <div className="lg:col-span-7 bg-slate-950 rounded-[2.5rem] p-6 md:p-8 border border-slate-800 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
              
              {/* Dashboard Controller Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6 relative z-10">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    ระบบตรวจวัดและจำลองผังงานอัตโนมัติ
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    ทดสอบควบคุมเงื่อนไขเซนเซอร์แสง และจำลองเส้นทางการไหลตามทฤษฎีผังงานที่ดี
                  </p>
                </div>
                
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 active:scale-95 ${
                    isSimulating 
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20' 
                      : 'bg-indigo-600 hover:bg-indigo-550 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <Pause className="w-4 h-4" /> หยุดจำลอง
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> เริ่มรันผังงาน
                    </>
                  )}
                </button>
              </div>

              {/* Sensor Slider Control */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl">
                    <span className="text-lg font-bold">💡</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">ปริมาณแสงธรรมชาติ (Light Intensity)</span>
                    <span className="text-sm font-mono font-bold text-white">{lightLevel}%</span>
                  </div>
                </div>
                
                <div className="flex-1 max-w-xs flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-bold">มืด</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lightLevel}
                    onChange={(e) => {
                      setLightLevel(Number(e.target.value));
                      if (isSimulating) setIsSimulating(false); // Reset to re-simulate
                    }}
                    className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="text-xs text-slate-500 font-bold">สว่าง</span>
                </div>

                <div className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-center shrink-0 border bg-slate-950 border-slate-800">
                  {lightLevel < 50 ? (
                    <span className="text-amber-400">เงื่อนไข: แสงน้อย (เปิดไฟ)</span>
                  ) : (
                    <span className="text-emerald-400">เงื่อนไข: แสงพอ (ปิดไฟ)</span>
                  )}
                </div>
              </div>

              {/* The Interactive SVG Flowchart container */}
              <div className="flex justify-center items-center overflow-x-auto py-2 bg-slate-950 rounded-2xl border border-slate-900/50">
                <svg width="460" height="520" viewBox="0 0 460 520" className="w-full max-w-[440px] h-auto select-none">
                  <defs>
                    <marker id="arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                    </marker>
                    <marker id="arrow-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                    </marker>
                  </defs>

                  {/* Flow Lines */}
                  {/* Start -> Input */}
                  <line 
                    x1="230" y1="50" x2="230" y2="80" 
                    stroke={simStep >= 1 ? '#6366f1' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-indigo)" 
                    className="transition-colors duration-500"
                  />

                  {/* Input -> Decision */}
                  <line 
                    x1="230" y1="125" x2="230" y2="155" 
                    stroke={simStep >= 2 ? '#6366f1' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-indigo)" 
                    className="transition-colors duration-500"
                  />

                  {/* Decision -> YES (Right branch) */}
                  <path 
                    d="M 305 195 L 350 195 L 350 255" 
                    fill="none" 
                    stroke={simStep >= 3 && lightLevel < 50 ? '#06b6d4' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-cyan)" 
                    className="transition-colors duration-500"
                  />
                  <text x="315" y="185" fill={lightLevel < 50 ? '#06b6d4' : '#64748b'} className="text-[11px] font-bold font-mono transition-colors">ใช่ (True)</text>

                  {/* Decision -> NO (Left branch) */}
                  <path 
                    d="M 155 195 L 110 195 L 110 255" 
                    fill="none" 
                    stroke={simStep >= 3 && lightLevel >= 50 ? '#10b981' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-emerald)" 
                    className="transition-colors duration-500"
                  />
                  <text x="125" y="185" fill={lightLevel >= 50 ? '#10b981' : '#64748b'} className="text-[11px] font-bold font-mono transition-colors">ไม่ใช่ (False)</text>

                  {/* YES Process -> Display (Yes) */}
                  <line 
                    x1="350" y1="300" x2="350" y2="335" 
                    stroke={simStep >= 4 && lightLevel < 50 ? '#06b6d4' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-cyan)" 
                    className="transition-colors duration-500"
                  />

                  {/* NO Process -> Display (No) */}
                  <line 
                    x1="110" y1="300" x2="110" y2="335" 
                    stroke={simStep >= 4 && lightLevel >= 50 ? '#10b981' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-emerald)" 
                    className="transition-colors duration-500"
                  />

                  {/* Display Yes -> Connector */}
                  <path 
                    d="M 350 380 L 350 420 L 245 420" 
                    fill="none" 
                    stroke={simStep >= 5 && lightLevel < 50 ? '#06b6d4' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-cyan)" 
                    className="transition-colors duration-500"
                  />

                  {/* Display No -> Connector */}
                  <path 
                    d="M 110 380 L 110 420 L 215 420" 
                    fill="none" 
                    stroke={simStep >= 5 && lightLevel >= 50 ? '#10b981' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-emerald)" 
                    className="transition-colors duration-500"
                  />

                  {/* Connector -> Stop */}
                  <line 
                    x1="230" y1="435" x2="230" y2="465" 
                    stroke={simStep >= 5 ? '#6366f1' : '#334155'} 
                    strokeWidth="3" 
                    markerEnd="url(#arrow-indigo)" 
                    className="transition-colors duration-500"
                  />

                  {/* NODES GRAPHICS */}
                  
                  {/* Start Node */}
                  <g className="transition-all duration-300">
                    <rect 
                      x="160" y="10" width="140" height="40" rx="20" ry="20"
                      className={`transition-all duration-500 border-2 cursor-pointer ${getNodeColor(1, 'stroke-indigo-500 bg-indigo-500/10')}`}
                      strokeWidth="2.5"
                    />
                    <text x="230" y="34" textAnchor="middle" className="fill-white font-bold text-xs">เริ่มต้น (Start)</text>
                  </g>

                  {/* Input Node (Parallelogram) */}
                  <g className="transition-all duration-300">
                    <polygon 
                      points="160,80 310,80 290,125 140,125"
                      className={`transition-all duration-500 border-2 cursor-pointer ${getNodeColor(2, 'stroke-indigo-500 bg-indigo-500/10')}`}
                      strokeWidth="2.5"
                    />
                    <text x="225" y="107" textAnchor="middle" className="fill-white font-bold text-xs">รับค่าปริมาณแสง (Light)</text>
                  </g>

                  {/* Decision Node (Diamond) */}
                  <g className="transition-all duration-300">
                    <polygon 
                      points="230,155 305,195 230,235 155,195"
                      className={`transition-all duration-500 border-2 cursor-pointer ${getNodeColor(3, 'stroke-indigo-500 bg-indigo-500/10')}`}
                      strokeWidth="2.5"
                    />
                    <text x="230" y="199" textAnchor="middle" className="fill-white font-bold text-2xs md:text-xs">แสง &lt; 50% ?</text>
                  </g>

                  {/* YES Path: Process Node */}
                  <g className="transition-all duration-300">
                    <rect 
                      x="280" y="255" width="140" height="45" rx="6" ry="6"
                      className={`transition-all duration-500 border-2 cursor-pointer ${
                        simStep === 4 && lightLevel < 50 
                          ? 'stroke-cyan-400 bg-cyan-400/20 ring-4 ring-cyan-400/40 scale-105 shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                          : 'stroke-slate-700 bg-slate-800/80 text-slate-300'
                      }`}
                      strokeWidth="2.5"
                    />
                    <text x="350" y="282" textAnchor="middle" className="fill-white font-bold text-xs">สั่งเปิดไฟ (Process)</text>
                  </g>

                  {/* YES Path: Display Node (ANSI SPECIFIC FIX) */}
                  {/* Using standard shape pointed right, concave left */}
                  <g className="transition-all duration-300">
                    <path 
                      d="M 25,5 Q 10,25 25,45 L 95,45 L 115,25 L 95,5 Z" 
                      transform="translate(285, 330) scale(1.1, 1.0)"
                      className={`transition-all duration-500 border-2 cursor-pointer ${
                        simStep === 5 && lightLevel < 50 
                          ? 'stroke-cyan-400 fill-cyan-400/20 ring-4 ring-cyan-400/30 scale-105' 
                          : 'stroke-slate-700 fill-slate-800/80'
                      }`}
                      strokeWidth="2.5"
                    />
                    <text x="350" y="358" textAnchor="middle" className="fill-white font-bold text-xs">แสดงผล: "เปิดไฟถนน"</text>
                  </g>

                  {/* NO Path: Process Node */}
                  <g className="transition-all duration-300">
                    <rect 
                      x="40" y="255" width="140" height="45" rx="6" ry="6"
                      className={`transition-all duration-500 border-2 cursor-pointer ${
                        simStep === 4 && lightLevel >= 50 
                          ? 'stroke-emerald-400 bg-emerald-400/20 ring-4 ring-emerald-400/40 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                          : 'stroke-slate-700 bg-slate-800/80 text-slate-300'
                      }`}
                      strokeWidth="2.5"
                    />
                    <text x="110" y="282" textAnchor="middle" className="fill-white font-bold text-xs">สั่งปิดไฟ (Process)</text>
                  </g>

                  {/* NO Path: Display Node (ANSI SPECIFIC FIX) */}
                  <g className="transition-all duration-300">
                    <path 
                      d="M 25,5 Q 10,25 25,45 L 95,45 L 115,25 L 95,5 Z" 
                      transform="translate(45, 330) scale(1.1, 1.0)"
                      className={`transition-all duration-500 border-2 cursor-pointer ${
                        simStep === 5 && lightLevel >= 50 
                          ? 'stroke-emerald-400 fill-emerald-400/20 ring-4 ring-emerald-400/30 scale-105' 
                          : 'stroke-slate-700 fill-slate-800/80'
                      }`}
                      strokeWidth="2.5"
                    />
                    <text x="110" y="358" textAnchor="middle" className="fill-white font-bold text-xs">แสดงผล: "ปิดไฟถนน"</text>
                  </g>

                  {/* Connector (Circle) */}
                  <g className="transition-all duration-300">
                    <circle 
                      cx="230" cy="420" r="15" 
                      className={`transition-all duration-500 border-2 cursor-pointer ${getNodeColor(5, 'stroke-indigo-500 bg-indigo-500/10')}`}
                      strokeWidth="2.5"
                    />
                    <text x="230" y="424" textAnchor="middle" className="fill-white font-bold text-2xs font-mono">A</text>
                  </g>

                  {/* Stop Node */}
                  <g className="transition-all duration-300">
                    <rect 
                      x="160" y="465" width="140" height="40" rx="20" ry="20"
                      className={`transition-all duration-500 border-2 cursor-pointer ${getNodeColor(6, 'stroke-indigo-500 bg-indigo-500/10')}`}
                      strokeWidth="2.5"
                    />
                    <text x="230" y="489" textAnchor="middle" className="fill-white font-bold text-xs">สิ้นสุด (Stop)</text>
                  </g>

                  {/* Glowing execution pulse dot */}
                  {isSimulating && simStep > 0 && (
                    <circle 
                      cx={
                        simStep === 1 ? 230 :
                        simStep === 2 ? 230 :
                        simStep === 3 ? 230 :
                        simStep === 4 ? (lightLevel < 50 ? 350 : 110) :
                        simStep === 5 ? (lightLevel < 50 ? 350 : 110) :
                        simStep === 6 ? 230 : 230
                      }
                      cy={
                        simStep === 1 ? 30 :
                        simStep === 2 ? 102 :
                        simStep === 3 ? 195 :
                        simStep === 4 ? 277 :
                        simStep === 5 ? 355 :
                        simStep === 6 ? 485 : 30
                      }
                      r="6"
                      fill="#f43f5e"
                      className="animate-ping"
                    />
                  )}
                </svg>
              </div>

              {/* Active Step Context Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-slate-300">
                <span className="text-xs text-indigo-400 font-bold block mb-1">🔍 คำอธิบายการควบคุม:</span>
                <p className="text-xs leading-relaxed text-slate-400">
                  {simStep === 0 && "กดปุ่ม 'เริ่มรันผังงาน' สีน้ำเงินด้านบน เพื่อดูจำลองขั้นตอนการไหลและการประมวลผลของเงื่อนไขการเปิดปิดไฟถนนโดยอัตโนมัติทีละขั้นตอน"}
                  {simStep === 1 && "เริ่มต้น (Start) - จุดทางเข้าเดียวของผังงาน ใช้สัญลักษณ์ทรง Capsule สีม่วง"}
                  {simStep === 2 && "นำข้อมูลเข้า (Input) - รับข้อมูลภายนอกจากเซนเซอร์วัดค่าความสว่างแสง ใช้ทรงสี่เหลี่ยมด้านขนานเอียงลาดอย่างสวยงาม"}
                  {simStep === 3 && "ตรวจสอบการตัดสินใจ (Decision) - ใช้ทางเลือกเปรียบเทียบว่าแสงมืดกว่าเกณฑ์ 50% หรือไม่ ทิศทางแยกออกเป็น ใช่/ไม่ใช่ ชัดเจน"}
                  {simStep === 4 && `เข้าสู่บล็อกโปรเซส (Process) - จัดการส่งสัญญาณฮาร์ดแวร์เพื่อ ${lightLevel < 50 ? 'จ่ายกระแสไฟฟ้า (เปิดไฟ)' : 'ตัดกระแสไฟฟ้า (ปิดไฟ)'}`}
                  {simStep === 5 && `แสดงสถานะ (Display) - ใช้รูปทรงแบบแหลมขวา-เว้าซ้ายเพื่อส่งข้อมูลข้อความ "${lightLevel < 50 ? 'เปิดไฟถนน' : 'ปิดไฟถนน'}" ไปยังจอภาพควบคุม`}
                  {simStep === 6 && "รวบรวมเส้นทางประมวลผลทั้งหมดผ่าน On-page Connector เข้าสู่จุดสิ้นสุด (Stop) อย่างสมบูรณ์แบบ"}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2.9.2 ข้อควรระวังและข้อผิดพลาดที่พบบ่อย */}
        <div className="space-y-8 pt-8">
          <div className="border-l-4 border-rose-500 pl-4 space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              ข้อควรระวังและข้อผิดพลาดที่พบบ่อย
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              วิเคราะห์ความผิดพลาดทางลอจิกและโครงสร้างรูปทรงที่เกิดขึ้นบ่อยในโลกการทำงาน พร้อมสวมบทบาทเป็นผู้ตรวจสอบมืออาชีพแก้ไขระบบให้ผ่านเกณฑ์
            </p>
          </div>

          {/* Interactive Game: Flowchart Audit Studio */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-indigo-500/10 rounded-bl-full blur-3xl pointer-events-none"></div>
            
            {/* Title / Description */}
            <div className="text-center mb-10 relative z-10 space-y-3">
              <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
                <ShieldCheck className="w-8 h-8 text-rose-500" />
                สถาบันตรวจสอบสัญจร: Flowchart Audit Studio
              </h4>
              <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                ผังงานของ "ระบบถอนเงิน ATM อัตโนมัติ" ด้านล่างนี้มีจุดผิดพลาดทางลอจิกและผิดมาตรฐาน ANSI ซ่อนอยู่ <strong>4 จุดหลัก</strong> 
                สวมแว่นขยายตรวจจับ สแกน และทำการแก้ไขให้เสร็จสิ้น 100% เพื่อรับตราใบรับรองสถาปนิกผังงาน
              </p>
            </div>

            {/* Audit Status Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 text-left w-full md:w-auto">
                <span className="text-xs text-slate-400 block font-bold tracking-wider uppercase">เกจวัดความสอดคล้องตามมาตรฐาน (Compliance Meter)</span>
                <div className="flex items-center gap-4">
                  <div className="w-full md:w-64 bg-slate-850 h-3.5 rounded-full overflow-hidden border border-slate-800 flex">
                    <div 
                      className={`h-full transition-all duration-700 ease-out ${
                        compliancePercentage === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                          : 'bg-gradient-to-r from-rose-500 to-indigo-500'
                      }`}
                      style={{ width: `${compliancePercentage}%` }}
                    ></div>
                  </div>
                  <span className={`font-mono text-xl font-bold shrink-0 ${compliancePercentage === 100 ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {compliancePercentage}%
                  </span>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
                {!isScanned ? (
                  <button
                    onClick={triggerScan}
                    className="w-full md:w-auto bg-rose-600 hover:bg-rose-550 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-rose-500/20 text-sm flex items-center justify-center gap-2"
                  >
                    🚀 สแกนระบุข้อผิดพลาด
                  </button>
                ) : (
                  <button
                    onClick={handleResetAudit}
                    className="w-full md:w-auto bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold px-5 py-3 rounded-xl transition-all duration-300 active:scale-95 border border-slate-700 text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> เริ่มใหม่ทั้งหมด
                  </button>
                )}
              </div>
            </div>

            {/* Game Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              
              {/* Left Column: The Buggy / Fixed SVG Flowchart */}
              <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                
                {/* Blueprint grid background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                
                {/* Flowchart SVG */}
                <svg width="460" height="540" viewBox="0 0 460 540" className="w-full max-w-[420px] h-auto">
                  
                  {/* Flow Lines */}
                  
                  {/* Start 1 -> Connector / Check (B1: Multiple starts) */}
                  {!auditedBugs.multipleStarts ? (
                    <>
                      {/* Dangling Start 1 */}
                      <path d="M 120 50 L 120 80 L 230 80" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-slate)" strokeDasharray="4 4" className="animate-pulse" />
                      {/* Dangling Start 2 */}
                      <path d="M 340 50 L 340 80 L 230 80" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-slate)" strokeDasharray="4 4" className="animate-pulse" />
                    </>
                  ) : (
                    // Correct Single Start flow
                    <line x1="230" y1="50" x2="230" y2="85" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
                  )}

                  {/* Start -> Decision 1 (Check PIN) */}
                  <line 
                    x1="230" y1="125" x2="230" y2="155" 
                    stroke={auditedBugs.wrongShape ? '#10b981' : '#f43f5e'} 
                    strokeWidth="2.5" 
                    markerEnd={auditedBugs.wrongShape ? 'url(#arrow-emerald)' : 'url(#arrow-slate)'} 
                  />

                  {/* Decision 1 (Check PIN) -> Display screen (Fail) */}
                  {/* Bug 3: Dangling flowline from pin failure - if not fixed, lines point to nothing */}
                  {!auditedBugs.danglingArrow ? (
                    // Dangling, no destination, no arrow head
                    <line x1="120" y1="185" x2="40" y2="185" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" />
                  ) : (
                    // Fixed arrow pointing clearly to failure screen
                    <path d="M 155 185 L 100 185" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
                  )}

                  {/* Decision 1 (Check PIN) -> Decision 2 (Check Balance - Right) */}
                  <line 
                    x1="305" y1="185" x2="350" y2="185" 
                    stroke={auditedBugs.wrongShape ? '#10b981' : '#475569'} 
                    strokeWidth="2.5" 
                    markerEnd={auditedBugs.wrongShape ? 'url(#arrow-emerald)' : 'url(#arrow-slate)'} 
                  />
                  
                  {/* Decision 2 (Check Balance) -> Process (Dispense Cash) - Down */}
                  <line x1="350" y1="215" x2="350" y2="280" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow-slate)" />
                  
                  {/* Dispense Cash -> Connector */}
                  <path d="M 350 330 L 350 380 L 250 380" fill="none" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow-slate)" />

                  {/* Decision 2 -> Loopback / Infinite Loop (B4: Infinite loop) */}
                  {!auditedBugs.infiniteLoop ? (
                    // Infinite Loop: "No" branch locks back to pin check directly with no escape
                    <path 
                      d="M 400 185 L 430 185 L 430 120 L 330 120" 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="2.5" 
                      markerEnd="url(#arrow-slate)" 
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  ) : (
                    // Fixed: Points to error message then leads to end capsule
                    <path 
                      d="M 400 185 L 440 185 L 440 380 L 250 380" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="3" 
                      markerEnd="url(#arrow-emerald)" 
                    />
                  )}

                  {/* Connector -> End */}
                  <line x1="230" y1="395" x2="230" y2="445" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arrow-slate)" />


                  {/* GRAPHICS NODES */}

                  {/* Bug 1: Multiple Start Nodes (Top area) */}
                  {!auditedBugs.multipleStarts ? (
                    <g>
                      {/* Start Capsule 1 */}
                      <rect x="50" y="10" width="130" height="40" rx="20" ry="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <text x="115" y="34" textAnchor="middle" className="fill-slate-300 font-bold text-2xs">เริ่มต้น: ถอนเงิน</text>
                      
                      {/* Start Capsule 2 */}
                      <rect x="280" y="10" width="130" height="40" rx="20" ry="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <text x="345" y="34" textAnchor="middle" className="fill-slate-300 font-bold text-2xs">เริ่มต้น: บันทึกข้อมูล</text>

                      {/* Hotspot */}
                      {isScanned && (
                        <circle 
                          cx="230" cy="30" r="14" fill="#ef4444" className="animate-ping opacity-60 cursor-pointer" 
                          onClick={() => setActiveBugDetail(bugDatabase.multipleStarts)}
                        />
                      )}
                      {isScanned && (
                        <g className="cursor-pointer" onClick={() => setActiveBugDetail(bugDatabase.multipleStarts)}>
                          <circle cx="230" cy="30" r="10" fill="#ef4444" />
                          <text x="230" y="34" textAnchor="middle" className="fill-white font-bold text-xs">!</text>
                        </g>
                      )}
                    </g>
                  ) : (
                    // Fixed: Clean single start node
                    <g>
                      <rect x="160" y="10" width="140" height="40" rx="20" ry="20" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                      <text x="230" y="34" textAnchor="middle" className="fill-emerald-250 font-bold text-xs">เริ่มต้น (Start)</text>
                      <circle cx="230" cy="30" r="10" fill="#10b981" />
                      <path d="M 227 30 L 229 32 L 233 28" fill="none" stroke="#fff" strokeWidth="2" />
                    </g>
                  )}

                  {/* Bug 2: Wrong shape choice for decision (Check PIN) */}
                  {!auditedBugs.wrongShape ? (
                    <g>
                      {/* Process Rectangle instead of Decision Diamond */}
                      <rect x="155" y="155" width="150" height="60" rx="4" ry="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <text x="230" y="190" textAnchor="middle" className="fill-slate-300 font-bold text-2xs">รหัส PIN ถูกต้องหรือไม่?</text>
                      
                      {/* Hotspot */}
                      {isScanned && (
                        <circle 
                          cx="230" cy="185" r="14" fill="#ef4444" className="animate-ping opacity-60 cursor-pointer" 
                          onClick={() => setActiveBugDetail(bugDatabase.wrongShape)}
                        />
                      )}
                      {isScanned && (
                        <g className="cursor-pointer" onClick={() => setActiveBugDetail(bugDatabase.wrongShape)}>
                          <circle cx="230" cy="185" r="10" fill="#ef4444" />
                          <text x="230" y="189" textAnchor="middle" className="fill-white font-bold text-xs">!</text>
                        </g>
                      )}
                    </g>
                  ) : (
                    // Fixed: Beautiful Decision Diamond shape
                    <g>
                      <polygon points="230,150 280,185 230,220 180,185" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                      <text x="230" y="189" textAnchor="middle" className="fill-emerald-250 font-bold text-[10px]">PIN ถูกต้อง?</text>
                      <circle cx="230" cy="185" r="8" fill="#10b981" />
                      <path d="M 227 185 L 229 187 L 233 183" fill="none" stroke="#fff" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* Failure Screen for wrong PIN */}
                  <g>
                    <path 
                      d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z" 
                      transform="translate(10, 160) scale(0.9, 0.9)"
                      fill="#1e293b" 
                      stroke={auditedBugs.danglingArrow ? '#10b981' : '#f43f5e'} 
                      strokeWidth="2" 
                    />
                    <text x="50" y="185" textAnchor="middle" className="fill-slate-300 font-bold text-[9px]">หน้าจอแจ้งเตือน</text>
                  </g>

                  {/* Bug 3: Dangling line alert hotspot */}
                  {!auditedBugs.danglingArrow && isScanned && (
                    <g>
                      <circle 
                        cx="75" cy="185" r="14" fill="#ef4444" className="animate-ping opacity-60 cursor-pointer" 
                        onClick={() => setActiveBugDetail(bugDatabase.danglingArrow)}
                      />
                      <g className="cursor-pointer" onClick={() => setActiveBugDetail(bugDatabase.danglingArrow)}>
                        <circle cx="75" cy="185" r="10" fill="#ef4444" />
                        <text x="75" y="189" textAnchor="middle" className="fill-white font-bold text-xs">!</text>
                      </g>
                    </g>
                  )}

                  {/* Decision 2: Check Balance (Right branch) */}
                  <g>
                    <polygon points="350,155 400,185 350,215 300,185" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="350" y="189" textAnchor="middle" className="fill-slate-300 font-bold text-[9px]">ยอดเงินพอถอน?</text>
                  </g>

                  {/* Bug 4: Infinite loop hotspot */}
                  {!auditedBugs.infiniteLoop && isScanned && (
                    <g>
                      <circle 
                        cx="420" cy="155" r="14" fill="#ef4444" className="animate-ping opacity-60 cursor-pointer" 
                        onClick={() => setActiveBugDetail(bugDatabase.infiniteLoop)}
                      />
                      <g className="cursor-pointer" onClick={() => setActiveBugDetail(bugDatabase.infiniteLoop)}>
                        <circle cx="420" cy="155" r="10" fill="#ef4444" />
                        <text x="420" y="159" textAnchor="middle" className="fill-white font-bold text-xs">!</text>
                      </g>
                    </g>
                  )}

                  {/* Process: Dispense cash */}
                  <g>
                    <rect x="290" y="280" width="120" height="50" rx="6" ry="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="350" y="310" textAnchor="middle" className="fill-slate-300 font-bold text-2xs">จ่ายเงินสดตามจำนวน</text>
                  </g>

                  {/* Connector */}
                  <circle cx="230" cy="380" r="15" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="230" y="384" textAnchor="middle" className="fill-slate-400 font-bold text-2xs">B</text>

                  {/* End Node */}
                  <rect x="160" y="445" width="140" height="40" rx="20" ry="20" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="230" y="469" textAnchor="middle" className="fill-slate-300 font-bold text-xs">สิ้นสุด (Stop)</text>

                </svg>

                {/* Legend */}
                <div className="w-full flex items-center justify-between border-t border-slate-800 pt-4 mt-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                    <span>สีแดง: จุดบกพร่อง</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>สีเขียว: แก้ไขแล้ว</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                    <span>สีเทา: ขั้นตอนเสถียร</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Detailed Interactive Control Card */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                
                {/* Active Error Panel */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col justify-center min-h-[350px] relative overflow-hidden">
                  
                  {/* Grid effect inside card */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(244, 63, 94, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 63, 94, 0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {activeBugDetail ? (
                    <div className="space-y-5 text-left relative z-10">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                        <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30">
                          {activeBugDetail.icon}
                        </div>
                        <div>
                          <span className="text-rose-400 font-bold text-xs block uppercase tracking-wider">พบข้อควรระวังสำคัญ!</span>
                          <h5 className="text-lg font-bold text-white leading-tight">{activeBugDetail.title}</h5>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm leading-relaxed text-slate-350">
                        <div className="space-y-1">
                          <span className="text-xs text-rose-300 font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> ทำไมจุดนี้ถึงผิดหลักการเขียนผังงานที่ดี?</span>
                          <p className="text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-850">{activeBugDetail.whyBad}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> วิธีแก้ไขตามเกณฑ์ที่ถูกต้องคือ?</span>
                          <p className="text-slate-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/30">{activeBugDetail.howToFix}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleFixBug(activeBugDetail.key)}
                        className="w-full bg-emerald-600 hover:bg-emerald-550 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 mt-4"
                      >
                        <Check className="w-4 h-4" /> ใช้คำสั่งแก้ไขระบบเดี๋ยวนี้!
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4 relative z-10">
                      
                      {compliancePercentage === 100 ? (
                        <div className="space-y-4">
                          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                            <ShieldCheck className="w-12 h-12" />
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                              <Sparkles className="w-5 h-5 text-yellow-400" />
                              การตรวจสอบเสร็จสมบูรณ์!
                            </h5>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                              สุดยอดมาก! ผังงานระบบถอนเงิน ATM ได้มาตรฐาน ANSI 100% เรียบร้อยแล้ว ไม่มีข้อผิดพลาดทางตรรกะเหลืออยู่
                            </p>
                          </div>
                          <div className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20">
                            🏆 ได้รับใบรับรอง: สถาปนิกผังงานดีเด่น
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                            <HelpCircle className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-base font-bold text-slate-300">หน้าต่างรายงานผลการตรวจสอบ</h5>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                              {!isScanned 
                                ? "กดปุ่ม 'สแกนระบุข้อผิดพลาด' ด้านบน เพื่อเริ่มต้นการเข้าตรวจค้นหาจุดบกพร่องตามหลักทฤษฎี"
                                : "คลิกที่หมุดข้อผิดพลาดสีแดง (!) บนผังงาน เพื่อวิเคราะห์ข้อบกพร่องและดำเนินการแก้ไขเป็นรายจุด"}
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>

                {/* Score Summary Box */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-850 text-left text-xs text-slate-400 flex items-center justify-between">
                  <span>แก้ไขแล้ว: <strong className="text-white font-mono text-sm">{solvedCount} / 4</strong></span>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded font-bold font-mono text-[10px] ${auditedBugs.multipleStarts ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>START</span>
                    <span className={`px-2 py-1 rounded font-bold font-mono text-[10px] ${auditedBugs.wrongShape ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>SHAPE</span>
                    <span className={`px-2 py-1 rounded font-bold font-mono text-[10px] ${auditedBugs.danglingArrow ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>FLOW</span>
                    <span className={`px-2 py-1 rounded font-bold font-mono text-[10px] ${auditedBugs.infiniteLoop ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>LOOP</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Informational Visual Summary Block */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <ThumbsUp className="w-6 h-6 text-indigo-500" />
            สรุปเปรียบเทียบ: ผังงานที่ดี (Good Practice) vs ผังงานที่แย่ (Bad Practice)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Good Practice Panel */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-left space-y-4">
              <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                ผังงานมาตรฐานดีเลิศ
              </span>
              <ul className="space-y-3.5 text-slate-700 text-sm leading-relaxed">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>มีจุดทางเข้า (Start) และทางออก (Stop) อย่างชัดเจนและมีแค่จุดเดียว</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>สัญลักษณ์ตรงตามคู่มือ ANSI 100% ไม่สร้างรูปแปลกแยก</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ทิศทางลูกศรตรงสม่ำเสมอเป็นหลัก เลี่ยงเลี้ยวหรือโค้งไปมาหักศอก</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>เขียนคำบรรยายภาษาไทยย่อกระชับ สอดคล้องกับรหัสเทียม (Pseudocode)</span>
                </li>
              </ul>
            </div>

            {/* Bad Practice Panel */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 text-left space-y-4">
              <span className="bg-rose-100 text-rose-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                ข้อบกพร่องที่ควรหลีกเลี่ยง
              </span>
              <ul className="space-y-3.5 text-slate-700 text-sm leading-relaxed">
                <li className="flex gap-2.5 items-start">
                  <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>ขาดจุดเริ่มต้น จุดจบ หรือเส้นทางสิ้นสุดค้างลอยในอากาศ</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>ใช้สัญลักษณ์ประมวลผลกระทำ (Process) ครอบทับกล่องทางเลือกคัดกรอง</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>ลากทิศทางลูกศรตัดกันอย่างไร้ระเบียบ จนเกิดจุดบอดทางสายตา</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>เขียนประโยคอธิบายยาวเหยียดเกินความจำเป็นในกล่องสัญลักษณ์</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.9)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
