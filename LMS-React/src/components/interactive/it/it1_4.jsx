import React, { useState, useEffect } from 'react';
import {
  Globe,
  Server,
  Layers,
  Network,
  Shield,
  Activity,
  Cpu,
  Monitor,
  Database,
  User,
  ArrowRight,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle,
  FileText,
  AlertTriangle,
  ArrowRightLeft,
  XCircle,
  Wifi,
  Lock,
  Eye,
  Settings,
  HelpCircle,
  Check,
  Terminal,
  Share2,
  Trash2,
  GitCommit,
  Workflow
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConsoleScreen,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function IT1_4() {
  // ────────────────────────────────────────────────────────────────────────
  // STATE DEFINITIONS
  // ────────────────────────────────────────────────────────────────────────

  // --- 1.4.1 - 1.4.5: สลับประเภท Topology ในการศึกษาทฤษฎี ---
  const [selectedTopology, setSelectedTopology] = useState('star');

  // --- 1.4.6: Topology Collision & Fault Simulator State ---
  const [simMode, setSimMode] = useState('bus'); // bus | star | ring | mesh
  const [simStep, setSimStep] = useState(0); // 0 = ready, 1 = moving, 2 = result/collision
  const [isCentralSwitchCrashed, setIsCentralSwitchCrashed] = useState(false);
  const [meshCables, setMeshCables] = useState({
    AC: true,
    AB: true,
    BC: true,
    AD: true,
    BD: true,
    CD: true
  });
  const [tokenPosition, setTokenPosition] = useState(0); // 0, 90, 180, 270 degrees
  const [tokenCarrier, setTokenCarrier] = useState(null); // node currently holding token
  const [activeTransfer, setActiveTransfer] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferLog, setTransferLog] = useState([
    '[ระบบ] แบบจำลองโทโพโลยีพร้อมทำงาน เลือกโหมดด้านบนเพื่อตรวจสอบกลไกการรับส่งข้อมูล'
  ]);
  const [simSpeed, setSimSpeed] = useState(1500); // ms

  // ────────────────────────────────────────────────────────────────────────
  // DATA CONFIGURATIONS
  // ────────────────────────────────────────────────────────────────────────

  const topologiesInfo = {
    bus: {
      title: 'การเชื่อมต่อแบบบัส (Bus Topology)',
      desc: 'ใช้สายเคเบิลแกนหลักร่วมกัน (Single Coaxial Backbone) โหนดทุกเครื่องต่อพ่วงผ่านตัวเชื่อม T-Connector และปิดขอบสายด้วยตัวต้านทาน Terminator ป้องกันสัญญาณสะท้อนกลับ',
      advantages: 'ใช้สายสัญญาณน้อยมาก ต้นทุนเริ่มแรกต่ำที่สุด ติดตั้งง่าย ไม่ต้องการอุปกรณ์ศูนย์กลางสลับข้อมูลซับซ้อน',
      disadvantages: 'หากสาย Backbone หลักชำรุดเสียหาย โครงข่ายทั้งหมดจะล่มลงทันที วิเคราะห์หาจุดบกพร่องยาก และเสี่ยงข้อมูลชนกัน (Collision) สูงเมื่อมีทราฟฟิกพร้อมกัน',
      accent: 'amber',
      bgGradient: 'from-amber-50 to-white'
    },
    star: {
      title: 'การเชื่อมต่อแบบดาว (Star Topology)',
      desc: 'รูปแบบที่นิยมใช้มากที่สุดในปัจจุบัน ทุกโหนดเชื่อมโยงโดยตรงเข้าสู่ศูนย์กลางการสื่อสารหลัก (Switch หรือ Hub) ผ่านพอร์ต RJ-45 และสายคู่ตีเกลียวอิสระ',
      advantages: 'หากสายของโหนดลูกเครื่องใดขาด จะไม่ส่งผลกระทบต่อเครื่องอื่นๆ, ค้นหาจุดเสียหายได้ง่าย, ไม่มีปัญหาสัญญาณชนกันเพราะ Switch ช่วยกระจายพอร์ต',
      disadvantages: 'มาพร้อมความเสี่ยง จุดล้มเหลวเดี่ยว (Single Point of Failure) หากอุปกรณ์ Switch ศูนย์กลางขัดข้อง โครงข่ายทั้งหมดจะดับสนิท และต้องใช้สายเคเบิลจำนวนมาก',
      accent: 'indigo',
      bgGradient: 'from-indigo-50 to-white'
    },
    ring: {
      title: 'การเชื่อมต่อแบบวงแหวน (Ring Topology)',
      desc: 'ต่อโหนดเป็นวงกลมวงปิดทางเดียว (Closed Loop) ข้อมูลส่งเวียนเป็นทิศทางเดียว โหนดจะคุยได้เมื่อครอบครองเหรียญอนุญาตสื่อสารที่วิ่งสับรอบ เรียกว่า โทเคน (Token passing)',
      advantages: 'หมดปัญหาเรื่องสัญญาณชนกัน (No Collision) เนื่องจากแต่ละเครื่องต้องถือ Token ถึงจะสามารถคุยได้ ทำให้บริหารแบนด์วิดท์ได้สม่ำเสมอ',
      disadvantages: 'หากเครื่องคอมพิวเตอร์หรือการ์ดแลนของโหนดชิ้นใดชิ้นหนึ่งเสีย วงแหวนสัญญาณจะขาด ทำให้ทั้งเครือข่ายหยุดทำงานทันที และขยายโหนดเพิ่มทำได้ยาก',
      accent: 'emerald',
      bgGradient: 'from-emerald-50 to-white'
    },
    mesh: {
      title: 'การเชื่อมต่อแบบเมช (Mesh Topology)',
      desc: 'การต่อสายสัญญาณแบบซ้ำซ้อนสูงสุด มีทั้ง Full Mesh (ทุกเครื่องมีพอร์ตต่อเครื่องอื่นโดยตรงทั้งหมด) และ Partial Mesh (ต่อสำรองสายเฉพาะจุดสำคัญ)',
      advantages: 'ความทนทานเป็นเลิศ (High Fault Tolerance) หากสายเชื่อมจุดใดขาด ข้อมูลจะทำการอ้อมเปลี่ยนเส้นทางสำรอง (Routing redirection) ทันที มีความเป็นส่วนตัวสูงสุด',
      disadvantages: 'สิ้นเปลืองค่าสายเคเบิลมหาศาล ($N(N-1)/2$ เส้น), การตั้งค่าโปรโตคอลการหาเส้นทางซับซ้อน และต้องพึ่งพาแผงพอร์ตเชื่อมต่อ (NIC Port) จำนวนมาก',
      accent: 'rose',
      bgGradient: 'from-rose-50 to-white'
    },
    hybrid: {
      title: 'การเชื่อมต่อแบบผสม (Hybrid Topology)',
      desc: 'การผสมผสานจุดเด่นของ Topology ตั้งแต่ 2 ประเภทขึ้นไปเข้ามาอยู่ในระบบเครือข่ายเดียวกัน เช่น Star-Bus หรือ Star-Ring เพื่อบริหารพื้นที่ขนาดใหญ่',
      advantages: 'ยืดหยุ่นสูงสุด สามารถขยายโครงข่ายข้ามตึก ข้ามแผนก ได้โดยไม่รบกวนแกนเดิม รองรับการเติบโตเชิงธุรกิจขององค์กรระดับมหภาค',
      disadvantages: 'ค่าบำรุงรักษาสูง อุปกรณ์จัดหาเส้นทางมีความหลากหลาย และต้องใช้ช่างผู้เชี่ยวชาญที่มีความเข้าใจโครงสร้างพอร์ตเชื่อมต่อที่ซับซ้อน',
      accent: 'purple',
      bgGradient: 'from-purple-50 to-white'
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // SIMULATOR LOGIC
  // ────────────────────────────────────────────────────────────────────────

  // จำลอง Bus Topology Collision
  const handleBusCollision = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setSimStep(1);
    setTransferProgress(0);
    setTransferLog([
      '[เริ่มต้นจำลอง] โหนดลูกข่ายเครื่องที่ 1 และเครื่องที่ 4 ทำการส่งแพ็กเก็ตข้อมูลลงสาย Backbone แกนร่วมพร้อมๆ กัน...',
      '[backbone] แพ็กเก็ตแล่นผ่านสายสัญญาณ Coaxial มาพะวักพะวนกึ่งกลางสายส่งร่วมกัน'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step += 25;
      setTransferProgress(step);
      
      if (step === 50) {
        setSimStep(2); // collision happening at x = 300
        setTransferLog(prev => [
          ...prev,
          '[ALERT - COLLISION] [ตรวจพบกระแสข้อมูลปะทะชนกัน!] ระดับแรงดันไฟฟ้าสะท้อนชนกันที่แกนกลางทางเรขาคณิต (x = 300) ข้อมูลบิดเบี้ยว 100%!',
          '[CSMA/CD LOGIC] การ์ด NIC ตรวจพบความถี่ผิดปกติ ส่งสัญญาณ Jam Signal เพื่อแจ้งเตือนขอระงับการส่งทันที',
          '[วิธีแก้ไข] โหนดแต่ละเครื่องต้องถอยกลับ และสุ่มเวลาเพื่อสับคิวรอส่งข้อมูลใหม่อีกรอบ (Random Backoff Time)'
        ]);
      }

      if (step >= 100) {
        clearInterval(interval);
        setActiveTransfer(false);
      }
    }, simSpeed / 4);
  };

  // จำลอง Star Topology Flow & SPOF
  const handleStarFlow = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setSimStep(1);
    setTransferProgress(0);

    if (isCentralSwitchCrashed) {
      setTransferLog([
        '[ส่งข้อมูล] โหนดเครื่องที่ 1 จ่ายกระแสสัญญาณมุ่งตรงเข้าสู่ สวิตช์ศูนย์กลาง (Switch)...',
        '[SPOF ALERT] [ล้มเหลว!] สวิตช์ศูนย์กลางชำรุดขัดข้อง (Central Switch Fault)!',
        '[วิเคราะห์ปัญหา] จุดล้มเหลวเดี่ยวเกิดปัญหา ระบบทั้งหมดไม่สามารถส่งคำสั่งสลับช่องสัญญาณได้ เครื่องลูกข่ายตัดขาดการเชื่อมโยงทันที'
      ]);
      setTransferProgress(50);
      setActiveTransfer(false);
    } else {
      setTransferLog([
        '[ส่งข้อมูล] โหนดเครื่องที่ 1 ร้องขอส่งไฟล์ไปยังโหนดเครื่องที่ 3 ทางสาย UTP ส่วนตัว...',
        '[SWITCH] สวิตช์ศูนย์กลางอ่านตาราง MAC Address Table เพื่อตรวจสอบพอร์ตเป้าหมาย...',
        '[SUCCESS] สวิตช์ส่งกระแสข้อมูลเข้าหาพอร์ตของเครื่องที่ 3 สำเร็จ ข้อมูลแลกเปลี่ยนกันรวดเร็วไร้การชนสัญญาณ!'
      ]);

      let step = 0;
      const interval = setInterval(() => {
        step += 25;
        setTransferProgress(step);
        if (step >= 100) {
          clearInterval(interval);
          setActiveTransfer(false);
        }
      }, simSpeed / 4);
    }
  };

  // จำลอง Ring Topology Token Passing
  const handleRingTokenPassing = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setTransferProgress(0);
    setTransferLog([
      '[1. เริ่มกลไก] เหรียญสิทธิ์สื่อสาร (Token Frame) หมุนตามเข็มนาฬิกาไปยังโหนดต่างๆ ในวงแหวน...',
      '[2. ครองเหรียญ] โหนดที่ 1 ต้องการส่งข้อมูล ทำการดึงและครอบครอง Token ชั่วคราว (สลักสถานะเป็น BUSY)...',
      '[3. ตรวจสอบแอดเดรส] สัญญาณเดินทางเป็นวงแหวนผ่านโหนดที่ 2 เพื่อตรวจสอบพิกัด โดยโหนดที่ 2 ทำการทวนสัญญาณให้เท่านั้น...',
      '[4. เข้าถึงผู้รับ] โหนดที่ 3 (ผู้รับ) ตรวจสอบพบเป็นแพ็กเก็ตตน คัดลอกข้อมูล และส่ง Acknowledgement วิ่งกลับมายังต้นทางเพื่อส่งสิทธิ์คืน'
    ]);

    let angle = 0;
    const interval = setInterval(() => {
      angle += 90;
      setTokenPosition(angle % 360);
      setTransferProgress(angle * 100 / 360);
      
      if (angle >= 360) {
        clearInterval(interval);
        setActiveTransfer(false);
      }
    }, simSpeed / 4);
  };

  // จำลอง Mesh Topology Cable Cut Redirection
  const handleMeshRouting = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setSimStep(1);
    setTransferProgress(0);

    const directPath = meshCables.AC;
    if (directPath) {
      setTransferLog([
        '[เส้นทางส่ง] โหนด A จ่ายกระแสสัญญาณผ่านพอร์ต 1 ตรงเข้าหาสายส่งตรงไปยังโหนด C...',
        '[SUCCESS] สายสัญญาณสมบูรณ์ 100% ข้อมูลวิ่งเข้าเส้นทางหลักเร็วที่สุดโดยตรง'
      ]);
    } else {
      // สายตรงหลักขาด แต่ Mesh มีสายสำรอง
      const backupPathAvailable = meshCables.AB && meshCables.BC;
      if (backupPathAvailable) {
        setTransferLog([
          '[เส้นทางส่ง] โหนด A พยายามส่งตรงไปยังโหนด C...',
          '[สายขาด!] ตรวจพบสายสัญญาณหลัก A ➔ C ขาดชำรุดหรือคลื่นกวน!',
          '[DYNAMIC ROUTING] ระบบโปรโตคอล Mesh ทำการจัดเส้นทางใหม่ (Redirection path): ส่งผ่าน A ➔ B แล้วต่อ B ➔ C...',
          '[เสร็จสิ้น] ข้อมูลส่งถึงปลายทางสำเร็จอย่างปลอดภัยด้วยสายสัญญาณสำรอง ระบบ Mesh ทนทานสูงสุด!'
        ]);
      } else {
        setTransferLog([
          '[เส้นทางส่ง] โหนด A พยายามส่งผ่านสำรอง...',
          '[ERROR] สายสำรองทั้งหมดขาดสะบั้น! โครงข่ายขัดข้องเนื่องจากการล้มสลายของลิงก์ย่อยเกินขีดจำกัด'
        ]);
        setTransferProgress(50);
        setActiveTransfer(false);
        return;
      }
    }

    let step = 0;
    const interval = setInterval(() => {
      step += 25;
      setTransferProgress(step);
      if (step >= 100) {
        clearInterval(interval);
        setActiveTransfer(false);
      }
    }, simSpeed / 4);
  };

  // รีเซ็ตสถานะการจำลองทั้งหมด
  const handleResetSimulator = () => {
    setSimStep(0);
    setIsCentralSwitchCrashed(false);
    setMeshCables({ AC: true, AB: true, BC: true, AD: true, BD: true, CD: true });
    setTokenPosition(0);
    setActiveTransfer(false);
    setTransferProgress(0);
    setTransferLog([
      '[ระบบ] รีเซ็ตแบบจำลองเสร็จสมบูรณ์ สายสัญญาณและโทโพโลยีกลับคืนสู่ความพร้อมใช้งานปกติแล้ว'
    ]);
  };

  return (
    <>
      {/* 1️⃣ Layer 1: Ambient Backdrop Glimmer Theme */}
      <AmbientBackdrop
        blobs={[
          { color: 'bg-emerald-200', size: 'w-96 h-96', position: '-top-10 -left-10', opacity: 'opacity-35' },
          { color: 'bg-teal-200', size: 'w-80 h-80', position: 'top-1/3 -right-10', opacity: 'opacity-30' },
          { color: 'bg-indigo-200', size: 'w-72 h-72', position: '-bottom-10 left-1/4', opacity: 'opacity-25' }
        ]}
      />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactive Visualizer */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-24 relative z-10">
        
        {/* ====================================================================
            SECTION 1: ทำความเข้าใจ 5 สถาปัตยกรรม (1.4.1 - 1.4.5)
            ==================================================================== */}
        <section id="section-topologies-theory" className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                รูปแบบการเชื่อมต่อเครือข่ายทางกายภาพ (Network Topology)
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              โครงสร้างรูปแบบการจัดวาง (Topology) คือแผนผังระเบียบทางวิศวกรรมในการเชื่อมต่อสายและทราฟฟิกข้อมูลของแต่ละเครื่องคอมพิวเตอร์ 
              ซึ่งแต่ละรูปแบบล้วนมีขีดความสามารถ ข้อจำกัด และค่าตอบแทนด้านประสิทธิภาพและงบประมาณการจัดซื้อที่ผู้พัฒนาเครือข่ายต้องประเมิน:
            </p>
          </div>

          {/* Selector Grid of Topologies */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(topologiesInfo).map((key) => {
              const active = selectedTopology === key;
              const info = topologiesInfo[key];
              return (
                <div
                  key={key}
                  onClick={() => setSelectedTopology(key)}
                  className={`bg-white/60 backdrop-blur-xl border rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                    active
                      ? `border-${info.accent}-500/50 ring-2 ring-${info.accent}-300 ring-offset-2 shadow-sm bg-white`
                      : 'border-slate-200 hover:border-indigo-500/20'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2 bg-${info.accent}-50 text-${info.accent}-600 border border-${info.accent}-100`}>
                    {key.toUpperCase().substring(0, 2)}
                  </span>
                  <h4 className="text-[13.5px] font-bold text-slate-800 leading-tight">
                    {info.title.split(' (')[0].replace('การเชื่อมต่อแบบ', '')}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Detailed Academic Display Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 md:p-8 shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-start animate-fadeIn">
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    เอกสารประกอบวิชาชีพและวิเคราะห์ทางเทคนิค
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2.5">
                    {topologiesInfo[selectedTopology].title}
                  </h3>
                  <p className="text-[15.5px] text-slate-600 mt-2 leading-relaxed font-medium">
                    {topologiesInfo[selectedTopology].desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200/50 pt-5">
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">จุดเด่นสำคัญ (Advantages)</span>
                    <p className="text-[14px] text-emerald-800 leading-relaxed font-semibold">
                      {topologiesInfo[selectedTopology].advantages}
                    </p>
                  </div>
                  <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-2">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">ข้อจำกัดหลัก (Disadvantages)</span>
                    <p className="text-[14px] text-rose-800 leading-relaxed font-semibold">
                      {topologiesInfo[selectedTopology].disadvantages}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2: เครื่องจำลองการชนกันและจุดขัดข้องระบบ (Simulator Zone)
            ==================================================================== */}
        <section id="section-collision-sim" className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                แบบจำลองลอจิกความขัดข้องและการชนกันของสัญญาณในแต่ละ Topology
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ทดสอบกลไกและข้อจำกัดการสื่อสารทางกายภาพของแต่ละรูปแบบการจัดวงจร 
              วิเคราะห์ความแตกต่างของอัตราการกวนของคลื่น ทราฟฟิก และกระแสไฟฟ้าอ้อมในหน้าจำลองด้านล่าง:
            </p>
          </div>

          {/* Advanced Multi-Mode Simulator Block */}
          <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Top Menu Bar */}
            <div className="p-4 md:p-6 bg-slate-950/80 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-indigo-400" />
                <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">
                  TOPOLOGY COLLISION & FAULT RECOVERY SIMULATOR
                </span>
              </div>

              {/* Mode Selection buttons */}
              <div className="flex bg-slate-800/80 border border-slate-700/60 p-1 rounded-xl shadow-inner cursor-pointer shrink-0">
                <button
                  onClick={() => { setSimMode('bus'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'bus' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bus (Collision)
                </button>
                <button
                  onClick={() => { setSimMode('star'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'star' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Star (SPOF)
                </button>
                <button
                  onClick={() => { setSimMode('ring'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'ring' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Ring (Token Passing)
                </button>
                <button
                  onClick={() => { setSimMode('mesh'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'mesh' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mesh (Fault Redirection)
                </button>
              </div>
            </div>

            {/* Controls panel bar */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex items-center gap-3 flex-wrap">
                {simMode === 'bus' && (
                  <button
                    onClick={handleBusCollision}
                    disabled={activeTransfer}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    ชนสัญญาณกัน (Simulate Collision)
                  </button>
                )}

                {simMode === 'star' && (
                  <>
                    <button
                      onClick={handleStarFlow}
                      disabled={activeTransfer}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      ส่งข้อมูลผ่านบอร์ด (Send Data)
                    </button>
                    <button
                      onClick={() => {
                        setIsCentralSwitchCrashed(!isCentralSwitchCrashed);
                        setTransferLog(prev => [
                          ...prev,
                          isCentralSwitchCrashed
                            ? '[ซ่อมบำรุง] เปิดการจ่ายไฟและรีบูตหน่วยควบคุม Switch ประสบความสำเร็จ'
                            : '[ALERT] วิศวกรเครือข่ายถอดระบบสลับสัญญาณ (Central Switch) ดำเนินการอัดโปรโตคอลขัดข้องชั่วคราว!'
                        ]);
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer ${
                        isCentralSwitchCrashed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : 'bg-rose-600 text-white hover:bg-rose-500'
                      }`}
                    >
                      {isCentralSwitchCrashed ? 'ซ่อมสวิตช์ระบบ (Repair Switch)' : 'จำลองสวิตช์ล่ม (Crash Switch)'}
                    </button>
                  </>
                )}

                {simMode === 'ring' && (
                  <button
                    onClick={handleRingTokenPassing}
                    disabled={activeTransfer}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    รันโทเคนรอบแหวน (Token Run)
                  </button>
                )}

                {simMode === 'mesh' && (
                  <>
                    <button
                      onClick={handleMeshRouting}
                      disabled={activeTransfer}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      จัดส่งและอ้อมเส้นทาง (Mesh Route)
                    </button>
                    <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/60 px-3 py-1 rounded-lg">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">เชื่อมสาย A-C:</span>
                      <input
                        type="checkbox"
                        checked={meshCables.AC}
                        onChange={(e) => {
                          setMeshCables(prev => ({ ...prev, AC: e.target.checked }));
                          setTransferLog(p => [...p, `[MESH] ปรับสายหลัก A ➔ C เป็น ${e.target.checked ? 'CONNECT' : 'CUT/DISCONNECTED'}`]);
                        }}
                        className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-slate-200">{meshCables.AC ? 'ต่อสายแลน' : 'ตัดสายแลน'}</span>
                    </div>
                  </>
                )}

                <button
                  onClick={handleResetSimulator}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Speed controls */}
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-slate-500">ความถี่สัญญาณ:</span>
                <input
                  type="range"
                  min="600"
                  max="3000"
                  step="400"
                  value={3600 - simSpeed}
                  onChange={(e) => setSimSpeed(3600 - parseInt(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-indigo-400">{(simSpeed / 1000).toFixed(1)}s</span>
              </div>
            </div>

            {/* Split Graphic (Col 7) / Logs Panel (Col 5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/80">
              
              <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
                
                {simMode === 'bus' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    {/* Symmetrical horizontal backbone cable at y = 170 */}
                    <path d="M 80,170 H 520" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                    
                    {/* Terminators at end */}
                    <rect x="70" y="150" width="10" height="40" fill="#94A3B8" rx="2" />
                    <rect x="520" y="150" width="10" height="40" fill="#94A3B8" rx="2" />

                    {/* Nodes connectors at center alignment */}
                    <line x1="140" y1="100" x2="140" y2="170" stroke="#475569" strokeWidth="3" />
                    <line x1="240" y1="100" x2="240" y2="170" stroke="#475569" strokeWidth="3" />
                    <line x1="360" y1="100" x2="360" y2="170" stroke="#475569" strokeWidth="3" />
                    <line x1="460" y1="100" x2="460" y2="170" stroke="#475569" strokeWidth="3" />

                    {/* Collision path flow anim */}
                    {activeTransfer && (
                      <>
                        {/* Node 1 to center */}
                        <path
                          d="M 140,100 V 170 H 300"
                          fill="none"
                          stroke={simStep === 2 ? '#EF4444' : '#F59E0B'}
                          strokeWidth="3.5"
                          className="animate-flow-dash"
                          style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                        />
                        {/* Node 4 to center */}
                        <path
                          d="M 460,100 V 170 H 300"
                          fill="none"
                          stroke={simStep === 2 ? '#EF4444' : '#F59E0B'}
                          strokeWidth="3.5"
                          className="animate-flow-dash"
                          style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                        />
                      </>
                    )}

                    {/* Node 1 */}
                    <g transform="translate(90, 30)">
                      <rect width="100" height="70" rx="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                      <text x="50" y="40" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 1</text>
                    </g>
                    {/* Node 2 */}
                    <g transform="translate(190, 30)">
                      <rect width="100" height="70" rx="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                      <text x="50" y="40" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 2</text>
                    </g>
                    {/* Node 3 */}
                    <g transform="translate(310, 30)">
                      <rect width="100" height="70" rx="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                      <text x="50" y="40" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 3</text>
                    </g>
                    {/* Node 4 */}
                    <g transform="translate(410, 30)">
                      <rect width="100" height="70" rx="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                      <text x="50" y="40" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 4</text>
                    </g>

                    {/* Symmetrical Collision explode symbol at x = 300 */}
                    {simStep === 2 && (
                      <g transform="translate(280, 150)">
                        <circle cx="20" cy="20" r="22" fill="#EF4444" opacity="0.3" className="animate-ping" />
                        <polygon points="20,0 25,12 38,15 28,24 33,37 20,30 7,37 12,24 2,15 15,12" fill="#F59E0B" stroke="#EF4444" strokeWidth="2" />
                      </g>
                    )}
                  </svg>
                )}

                {simMode === 'star' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    <defs>
                      <marker id="starArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.3)" />
                      </marker>
                      <marker id="starArrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={isCentralSwitchCrashed ? '#EF4444' : '#818CF8'} />
                      </marker>
                    </defs>

                    {/* Symmetrical connectors to central Switch (cx: 300, cy: 170) */}
                    <path
                      d="M 150,70 L 300,170"
                      stroke={activeTransfer && !isCentralSwitchCrashed ? '#818CF8' : isCentralSwitchCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#starArrow-active)' : 'url(#starArrow)'}
                      className={activeTransfer && !isCentralSwitchCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                    />
                    <path
                      d="M 450,70 L 300,170"
                      stroke={activeTransfer && !isCentralSwitchCrashed ? '#818CF8' : isCentralSwitchCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#starArrow-active)' : 'url(#starArrow)'}
                      className={activeTransfer && !isCentralSwitchCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                    />
                    <path
                      d="M 150,270 L 300,170"
                      stroke={activeTransfer && !isCentralSwitchCrashed ? '#818CF8' : isCentralSwitchCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#starArrow-active)' : 'url(#starArrow)'}
                      className={activeTransfer && !isCentralSwitchCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                    />
                    <path
                      d="M 450,270 L 300,170"
                      stroke={activeTransfer && !isCentralSwitchCrashed ? '#818CF8' : isCentralSwitchCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#starArrow-active)' : 'url(#starArrow)'}
                      className={activeTransfer && !isCentralSwitchCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                    />

                    {/* Nodes - Client 1 */}
                    <g transform="translate(90, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 1</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.10</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Nodes - Client 2 */}
                    <g transform="translate(390, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 2</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.11</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Center Switch (x:230, y:125) */}
                    <g transform="translate(230, 125)">
                      <rect
                        width="140"
                        height="90"
                        rx="20"
                        fill={isCentralSwitchCrashed ? '#450A0A' : '#1E1B4B'}
                        stroke={isCentralSwitchCrashed ? '#EF4444' : '#4F46E5'}
                        strokeWidth="3"
                        className={activeTransfer && !isCentralSwitchCrashed ? 'animate-pulse' : ''}
                      />
                      <Network className={`w-6 h-6 mx-auto mt-3 ${isCentralSwitchCrashed ? 'text-rose-500' : 'text-indigo-400'}`} />
                      <text x="70" y="55" textAnchor="middle" fill={isCentralSwitchCrashed ? '#FCA5A5' : '#E0E7FF'} fontSize="13" fontWeight="bold" fontFamily="sans-serif">CENTRAL SWITCH</text>
                      <text x="70" y="73" textAnchor="middle" fill={isCentralSwitchCrashed ? '#EF4444' : '#38BDF8'} fontSize="11" fontWeight="bold" fontFamily="mono">192.168.1.254</text>
                    </g>

                    {/* Nodes - Client 3 */}
                    <g transform="translate(90, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 3</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.12</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Nodes - Client 4 */}
                    <g transform="translate(390, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 4</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.13</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                  </svg>
                )}

                {simMode === 'ring' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    {/* Symmetrical ring circular path */}
                    <circle cx="300" cy="170" r="100" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="6" />

                    {/* Active circular flow path */}
                    {activeTransfer && (
                      <circle
                        cx="300"
                        cy="170"
                        r="100"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeDasharray="8 8"
                        className="animate-spin"
                        style={{ animationDuration: `${simSpeed * 2 / 1000}s` }}
                      />
                    )}

                    {/* Symmetrical Nodes along the ring at 90deg steps */}
                    {/* Node 1 (Top: 300, 70) */}
                    <g transform="translate(250, 20)">
                      <rect width="100" height="50" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                      <text x="50" y="30" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 1</text>
                    </g>
                    {/* Node 2 (Right: 400, 170) */}
                    <g transform="translate(420, 145)">
                      <rect width="100" height="50" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                      <text x="50" y="30" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 2</text>
                    </g>
                    {/* Node 3 (Bottom: 300, 270) */}
                    <g transform="translate(250, 270)">
                      <rect width="100" height="50" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                      <text x="50" y="30" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 3</text>
                    </g>
                    {/* Node 4 (Left: 200, 170) */}
                    <g transform="translate(80, 145)">
                      <rect width="100" height="50" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
                      <text x="50" y="30" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">NODE 4</text>
                    </g>

                    {/* Rotating Token icon */}
                    <g
                      transform={`translate(300, 170) rotate(${tokenPosition}) translate(100, 0)`}
                    >
                      <circle cx="0" cy="0" r="10" fill="#F59E0B" className="animate-pulse" />
                      <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">T</text>
                    </g>
                  </svg>
                )}

                {simMode === 'mesh' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    {/* Full Mesh links */}
                    <line x1="150" y1="70" x2="450" y2="70" stroke={meshCables.AB ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" />
                    <line x1="150" y1="70" x2="150" y2="270" stroke={meshCables.AC ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" strokeDasharray={meshCables.AC ? 'none' : '3 3'} />
                    <line x1="150" y1="70" x2="450" y2="270" stroke={meshCables.AD ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" />
                    <line x1="450" y1="70" x2="150" y2="270" stroke={meshCables.BC ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" />
                    <line x1="450" y1="70" x2="450" y2="270" stroke={meshCables.BD ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" />
                    <line x1="150" y1="270" x2="450" y2="270" stroke={meshCables.CD ? '#3B82F6' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2.5" />

                    {/* Symmetrical active packet flow */}
                    {activeTransfer && (
                      <path
                        d={meshCables.AC ? 'M 150,70 L 150,270' : 'M 150,70 L 450,70 L 150,270'}
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="3.5"
                        className="animate-flow-dash"
                        style={{ '--flow-anim-speed': `${simSpeed / 1000}s` }}
                      />
                    )}

                    {/* Nodes - Node A */}
                    <g transform="translate(90, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE A</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                    {/* Nodes - Node B */}
                    <g transform="translate(390, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE B</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                    {/* Nodes - Node C */}
                    <g transform="translate(90, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE C</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                    {/* Nodes - Node D */}
                    <g transform="translate(390, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE D</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                  </svg>
                )}

              </div>

              {/* Console Logs Panel (Col 5) */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800/80">
                <ConsoleScreen
                  title="ตัววิเคราะห์คิวสถานะ Topology"
                  output={transferLog.join('\n')}
                  height="h-[380px]"
                />
              </div>

            </div>

            {/* Carrier Progress Bar */}
            <div className="p-4 bg-slate-950/60 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400">สถานะแบนด์วิดท์สายส่ง (Carrier Progress):</span>
              <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${transferProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400">{transferProgress}%</span>
            </div>

          </div>

          {/* Symmetrical Matrix Comparison Table */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-800">
                ตารางวิเคราะห์เปรียบเทียบสถาปัตยกรรมแบบ Topology เชิงอุตสาหกรรม
              </h3>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white/60 backdrop-blur-xl">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Topology</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">สถิติสายเคเบิล</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-rose-500 uppercase tracking-wider">จุดล้มเหลวเดี่ยว (SPOF)</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">ประสิทธิภาพ CSMA / CD</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ความยากง่ายในการกู้ภัย</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-sans text-sm text-slate-700">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">Bus Topology</td>
                    <td className="px-6 py-4">น้อยที่สุด ( Backbone เส้นเดียว )</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">มี ( หากสาย Backbone หลักชำรุด )</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">เกิดการชนข้อมูลสูงเมื่อแชร์ส่งพร้อมกัน</td>
                    <td className="px-6 py-4">ยากมาก ( ต้องไล่เคาะจุด T-Connector ทั่ววง )</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">Star Topology</td>
                    <td className="px-6 py-4">ปานกลาง ( $N$ เส้นต่อจุดแลน )</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">มี ( หาก Switch หลักล่ม )</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ดีเยี่ยม ( ไร้การชน สวิตช์สับพอร์ตให้ )</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ง่ายที่สุด ( โหนดขาด สวิตช์แจ้งเตือนไฟทันที )</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">Ring Topology</td>
                    <td className="px-6 py-4">ปานกลาง ( เชื่อมกันเป็นห่วงวงแหวน )</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">มี ( หากสายขาดระหว่างโหนดใดๆ )</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ดีเยี่ยม ( สัญญาณเดินทางทางเดียวตามคิว Token )</td>
                    <td className="px-6 py-4">ปานกลาง ( ต้องไล่สืบแผงรับส่งการ์ดแลน )</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">Mesh Topology</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">มหาศาล ($N(N-1)/2$ เส้น)</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ไม่มี ( ทนทานชำรุดสูง มีสายอ้อมสำรอง )</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ดีเยี่ยม ( ช่องส่งเฉพาะจุด ไม่ติดขัด )</td>
                    <td className="px-6 py-4">ปานกลาง-ยาก ( ตั้งค่าระบบจัดหาเส้นทางซับซ้อน )</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* ====================================================================
            GAMIFICATION ZONE & ASSESSMENT (Consolidated MCQ)
            ==================================================================== */}
        <section id="section-gamification-mcq" className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                ด่านทดสอบความรู้และใบงานปลายทาง (Assessments)
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ตอบคำถามระดับทฤษฎีและลอจิกสเป็ก Topology ทั้ง 5 ข้อ เพื่อเคลียร์ภารกิจและใบงานระดับวิชาชีพ:
            </p>
          </div>

          {/* Quiz Engine */}
          <QuizEngine
            title="เกมทดสอบ: สถาปัตยกรและวิศวกรวางทราฟฟิกเครือข่าย"
            description="วิเคราะห์ลักษณะโครงสร้างทางกายภาพและคัดกรองปัญหาสายส่งคอมพิวเตอร์ที่ถูกต้องที่สุด"
            levels={[
              {
                title: 'โจทย์ที่ 1: การเชื่อมปิดขอบสาย Backbone',
                desc: 'ในการติดตั้ง Bus Topology อุปกรณ์ข้อใดมีความสำคัญสูงสุดในการดูดซับสัญญาณและป้องกันการสะท้อนกลับของกระแสไฟฟ้าปลายสาย?',
                options: [
                  { key: 'A', text: 'T-Connector', isCorrect: false },
                  { key: 'B', text: 'Terminator (ตัวต้านทานปิดขอบ)', isCorrect: true },
                  { key: 'C', text: 'Central Switch', isCorrect: false },
                  { key: 'D', text: 'Token Frame', isCorrect: false }
                ],
                tip: 'อุปกรณ์ที่ปิดท้ายสายของ Coaxial เพื่อป้องกันสัญญาณหักล้าง เรียกว่า Terminator'
              },
              {
                title: 'โจทย์ที่ 2: วัตถุประสงค์ของ Token passing',
                desc: 'ในการทำหน้าที่ของ Ring Topology กลไกการเวียนส่ง Token มีวัตถุประสงค์แกนหลักอย่างไรในลอจิก Data Link Layer?',
                options: [
                  { key: 'A', text: 'เพื่อรักษาค่าโวลต์ให้แบรนด์วิดท์กระจายเร็วขึ้น', isCorrect: false },
                  { key: 'B', text: 'ป้องกันสัญญาณข้อมูลชนกัน (Collision Avoidance)', isCorrect: true },
                  { key: 'C', text: 'เพื่อจ่าย IP Address แบบอัตโนมัติ', isCorrect: false },
                  { key: 'D', text: 'เพื่อแปลงคลื่นอนาล็อกเป็นดิจิทัลข่าวสาร', isCorrect: false }
                ],
                tip: 'การถือสิทธิ์ Token การคุยทีละเครื่อง ช่วยขจัดปัญหาการชนกันอย่างเด็ดขาด'
              },
              {
                title: 'โจทย์ที่ 3: สถิติสายเคเบิลของ Full Mesh',
                desc: 'หากสำนักงานมีเซิร์ฟเวอร์ย่อย 6 โหนด และต้องการเชื่อมโยงด้วย Full Mesh Topology ต้องจัดหากล่องพอร์ตแลนและเชื่อมสายสัญญาณทั้งหมดจำนวนเท่าใด?',
                options: [
                  { key: 'A', text: '6 เส้น', isCorrect: false },
                  { key: 'B', text: '12 เส้น', isCorrect: false },
                  { key: 'C', text: '15 เส้น', isCorrect: true },
                  { key: 'D', text: '30 เส้น', isCorrect: false }
                ],
                tip: 'คำนวณตามสูตรสากล: N(N-1)/2 ➔ 6(5)/2 = 15 เส้น'
              },
              {
                title: 'โจทย์ที่ 4: การขยายอาคารข้ามแผนก',
                desc: 'องค์กรขนาดใหญ่เชื่อมตึกแผนกไอที ตึกแผนกการเงิน และตึกฝ่ายผลิตเข้าด้วยกัน โดยแต่ละตึกรัน Star Topology แล้วนำ Switch แกนหลักมาเชื่อมกันลงสาย Backbone สอดคล้องกับประเภทข้อใด?',
                options: [
                  { key: 'A', text: 'Bus Topology', isCorrect: false },
                  { key: 'B', text: 'Ring Topology', isCorrect: false },
                  { key: 'C', text: 'Mesh Topology', isCorrect: false },
                  { key: 'D', text: 'Hybrid Topology (แบบผสม)', isCorrect: true }
                ],
                tip: 'การผสมกันหลายลักษณะข้ามตึกเรียนและสำนักงาน จัดอยู่ในกลุ่มรูปแบบผสม'
              },
              {
                title: 'โจทย์ที่ 5: การค้นหาโหนดขาดสายเคเบิลล้มเหลว',
                desc: 'ข้อใดคือเหตุผลที่ Star Topology กลายเป็นรูปแบบสถาปัตยกรรมทางกายภาพยอดนิยมที่สุดของหน่วยงานธุรกิจยุคปัจจุบัน?',
                options: [
                  { key: 'A', text: 'เพราะไม่มีจุดล้มเหลวเดี่ยวกลางระบบ', isCorrect: false },
                  { key: 'B', text: 'ประหยัดสายสัญญาณและคาร์บอนฟุตพริ้นท์ดีที่สุด', isCorrect: false },
                  { key: 'C', text: 'โหนดชำรุดขาดเครื่องเดียว เครื่องที่เหลือไม่กระทบ และค้นหาจุดเสียหายง่าย', isCorrect: true },
                  { key: 'D', text: 'มีขั้นตอนการเข้าหัวสาย RJ-45 ที่ง่ายกว่าบัส', isCorrect: false }
                ],
                tip: 'Star ทนทานต่อการชำรุดของเครื่องลูกข่ายเดี่ยว ทำให้ระบบยังรันต่อไปได้อย่างสง่างาม'
              }
            ]}
            accentColor="from-emerald-500/20 to-teal-500/20"
            icon={<GitCommit className="w-8 h-8 text-emerald-400" />}
          />

          {/* Consolidated Written Assessment (TeacherTask) */}
          <TeacherTask
            title="ภารกิจประจำหน่วย 1.4: ออกแบบแผนผัง Topology และการคำนวณความซ้ำซ้อนเพื่อติดตั้งเน็ตเวิร์กองค์กร"
            taskText={`วิเคราะห์สถานการณ์เพื่อดำเนินการเขียนรายงานส่งทางช่องทางปฏิบัติ:
1. อธิบายกลไกทางฟิสิกส์และการแก้ไขปัญหาเมื่อสัญญาณข้อมูลชนกัน (Collision) ในการสื่อสารแบบ Bus Topology
2. ให้วาด/ออกแบบแผนผังความกะทัดรัด (Diagram) ของ Star Topology พร้อมระบุขอบเขตของความมั่นคงและ Single Point of Failure
3. คำนวณสายสัญญาณหากโหนดเครือข่ายมีขนาด N = 8 และต้องการวางแบบ Full Mesh พร้อมแจกแจงข้อดีข้อเสียเปรียบเทียบกับ Star
4. ให้เสนอการออกแบบระบบแบบ Hybrid Topology เพื่อรองรับขอบเขตการขยายธุรกิจข้ามจังหวัดของบริษัทจัดจำหน่ายสินค้าอัจฉริยะ`}
          />

        </section>

      </main>
    </>
  );
}
