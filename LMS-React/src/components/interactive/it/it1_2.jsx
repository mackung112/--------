import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Layers,
  Database,
  User,
  ArrowRight,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle,
  FileText,
  Scan,
  Monitor,
  Printer,
  ChevronRight,
  ShoppingCart,
  Video,
  Settings,
  Sparkles,
  Server,
  Terminal,
  Activity,
  FileArchive,
  Globe,
  HardDrive,
  Wrench,
  Code,
  Briefcase,
  HelpCircle,
  Shield,
  Network,
  Radio,
  AlertTriangle,
  ArrowRightLeft
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConsoleScreen,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function IT1_2() {
  // ────────────────────────────────────────────────────────────────────────
  // STATE DEFINITIONS
  // ────────────────────────────────────────────────────────────────────────

  // --- 1.2.2: องค์ประกอบพื้นฐาน 5 ส่วน ---
  const [selectedElement, setSelectedElement] = useState('sender');

  // --- 1.2.3: ประโยชน์การแชร์ทรัพยากร ---
  const [selectedSharing, setSelectedSharing] = useState('hardware');

  // --- 1.2.5: เครื่องจำลองทิศทางการส่งสัญญาณ (Data Transmission Simulator) ---
  const [selectedMode, setSelectedMode] = useState('simplex');
  const [flowActive, setFlowActive] = useState(false);
  const [flowStep, setFlowStep] = useState(0); // 0 = ready, 1 = in progress, 2 = success, 3 = collision
  const [flowSpeed, setFlowSpeed] = useState(1500); // ms per step
  const [sendDirection, setSendDirection] = useState('L2R'); // L2R or R2L or BOTH
  const [scenarioLogs, setScenarioLogs] = useState([
    '[ระบบ] เครือข่ายพร้อมสื่อสาร เลือกทิศทาง/โหมดส่งสัญญาณ และกด PLAY เพื่อเริ่มต้นจำลองกระบวนการ'
  ]);

  // ────────────────────────────────────────────────────────────────────────
  // DATA CONFIGURATIONS
  // ────────────────────────────────────────────────────────────────────────

  // องค์ประกอบการสื่อสาร 5 ส่วน (1.2.2)
  const elements = [
    {
      id: 'sender',
      title: 'ผู้ส่ง (Sender)',
      en: 'Source Device',
      desc: 'อุปกรณ์ต้นทางที่เป็นผู้สร้างสรรค์และเริ่มจ่ายข้อมูลข่าวสารเข้าระบบ เช่น เครื่องคอมพิวเตอร์, เซิร์ฟเวอร์แม่ข่าย, กล้องวงจรปิด UHD หรือเครื่องสแกนบาร์โค้ด',
      color: 'emerald',
      icon: User,
      tech: 'แปลงข้อมูลดิจิทัลเป็นบิตสัญญาณไฟฟ้าหรือคลื่นความถี่พร้อมระบุ IP แอดเดรส'
    },
    {
      id: 'receiver',
      title: 'ผู้รับ (Receiver)',
      en: 'Destination Device',
      desc: 'อุปกรณ์ปลายทางที่เป็นจุดหมายปลายทางที่ข้อมูลจะส่งไปถึง เช่น หน้าจอคอมพิวเตอร์แสดงภาพสี, เครื่องพิมพ์ใบเสร็จ, หรือเทอร์มินัลบอร์ดควบคุมแขนกล',
      color: 'indigo',
      icon: Monitor,
      tech: 'รับกระแสคลื่นสัญญาณมาถอดรหัส (Decoding) แปลกลับเป็นชุดดิจิทัล 0 และ 1'
    },
    {
      id: 'message',
      title: 'ข้อมูลข่าวสาร (Message)',
      en: 'Payload Data',
      desc: 'วัตถุดิบและข่าวสารเนื้อความที่จะถูกนำพาไป เช่น ข้อความสนทนา, แฟ้มข้อมูล, สัญญาณภาพสดกล้อง หรือรหัสตัวเลขอุณหภูมิองศาดิบจาก IoT เซนเซอร์',
      color: 'amber',
      icon: FileText,
      tech: 'จัดโครงสร้างบิตข้อมูลในแพ็กเก็ต (Packet Payload) พร้อมคำสั่งตรวจสอบบั๊ก'
    },
    {
      id: 'medium',
      title: 'สื่อกลางการรับส่ง (Medium)',
      en: 'Transmission Channel',
      desc: 'ช่องทางสะพานเชื่อมต่อที่เป็นทางเดินกายภาพให้สัญญาณเดินทางข้าม เช่น สายทองแดงตีเกลียว UTP, สายโคแอกเชียล, เคเบิลใยแก้วนำแสง หรือคลื่นอากาศไร้สาย',
      color: 'cyan',
      icon: Radio,
      tech: 'รองรับแบนด์วิดท์ความเร็ว ป้องกันสัญญาณเสื่อมถอย (Attenuation) ตามระยะสาย'
    },
    {
      id: 'protocol',
      title: 'โปรโตคอล (Protocol)',
      en: 'Communication Rules',
      desc: 'กฎระเบียบ ข้อกำหนด หรือภาษากลางระดับโครงสร้างทางซอฟต์แวร์ เพื่อให้อุปกรณ์คอมพิวเตอร์แต่ละฝั่งเข้าใจความหมายและประสานสื่อสารกันรู้เรื่องโดยตรง',
      color: 'purple',
      icon: Shield,
      tech: 'กำหนดกรอบของ HTTP/HTTPS, TCP/IP, DNS, และวิธีการสับคิวป้องกันชนกัน'
    }
  ];

  // ประโยชน์การแชร์ทรัพยากร (1.2.3)
  const sharingBenefits = {
    hardware: {
      title: 'การแบ่งปันฮาร์ดแวร์ร่วมกัน (Hardware Sharing)',
      desc: 'ช่วยลดต้นทุนขององค์กรอย่างมหาศาลโดยพึ่งพาระบบศูนย์รวมอุปกรณ์ ไม่ต้องจัดซื้อเครื่องใช้ไฟฟ้าส่วนบุคคลให้กับพนักงานทุกคนแยกรายบุคคล',
      examples: [
        'การติดตั้ง Print Server สำหรับแบ่งปันเครื่องพิมพ์เอกสารกลางของแผนกบัญชี',
        'การเชื่อมต่อระบบ Storage Area Network (SAN) สำหรับดึงพื้นที่เก็บข้อมูลส่วนกลาง',
        'การใช้เครื่องสแกนเอกสารเครือข่าย หรือไดรฟ์บันทึกข้อมูลหลักร่วมกันผ่านวงแลน'
      ]
    },
    software: {
      title: 'การแบ่งปันซอฟต์แวร์ร่วมกัน (Software Sharing)',
      desc: 'ควบคุมระบบโปรแกรมหลักจากเครื่องแม่ข่ายเครื่องเดียว ทำให้ติดตั้งระบบ ดูแล และแก้ไขบั๊กได้รวดเร็วแบบเรียลไทม์จากระบบศูนย์กลาง',
      examples: [
        'ระบบบริหารจัดการทรัพยากรองค์กร (ERP) และซอฟต์แวร์ CRM จัดการสถิติสมาชิก',
        'การแชร์โปรแกรมฐานข้อมูลระบบสต็อกเพื่อการเรียกอ่านแบบ Concurrent พร้อมๆ กัน',
        'การใช้งานเวิร์กสเปซระบบคลาวด์ เช่น Google Workspace หรือ Office 365'
      ]
    },
    data: {
      title: 'การแบ่งปันข้อมูลร่วมกัน (Data Sharing)',
      desc: 'อำนวยความสะดวกให้พนักงานสามารถเข้าถึง ดึงไฟล์ คัดลอก และแก้ไขเอกสารชิ้นเดียวกันได้ทันที ช่วยลดความซ้ำซ้อนของการเก็บแฟ้มซ้ำๆ',
      examples: [
        'โฟลเดอร์แชร์กลางของแผนก (Network Shared Folder) บนเซิร์ฟเวอร์องค์กร',
        'ฐานข้อมูลตารางรายการสินค้า ยอดขายรายวัน และประวัติลูกค้ากลางที่อัปเดตสด',
        'การส่งต่อบล็อกสถิติ รายงานประจำสัปดาห์ และแฟ้มสลิปชำระเงินข้ามแผนก'
      ]
    }
  };

  // 1.2.5: รายละเอียดล็อกสถานการณ์การประมวลผลข้อมูล
  const transmissionLogs = {
    simplex: {
      L2R: [
        '[INPUT] [ผู้ส่ง] ส่งสัญญาณภาพกล้องวงจรปิด UHD แปลงเฟรมพิกเซลรูปภาพเป็นกระแสไฟฟ้าส่งตรงลงสู่สาย Medium แบบต่อเนื่อง.',
        '[MEDIUM] สัญญาณเดินทางเป็นเส้นตรงทิศทางเดียว (Left to Right) ข้ามช่องสายส่งทองแดงด้วยสปีดแบนด์วิดท์ 1Gbps มั่นคง.',
        '[RECEIVER] [ผู้รับ] เครื่องจอแสดงผลรับกระแสบิตไฟฟ้า ทำการประมวลผลถอดรหัสสีออกมาเป็นภาพเคลื่อนไหวสดบนหน้าจอปกติตลอด 24 ชม.',
        '[ระบบ] การส่งสัญญาณแบบ Simplex เสร็จสมบูรณ์ ข้อมูลวิ่งจากผู้ส่งไปผู้รับได้อย่างเดียว ไร้การส่งกลับตรรกะ.'
      ]
    },
    half: {
      L2R: [
        '[INPUT] [ผู้ส่ง] วิทยุส่งพัลส์กระแสเสียงข้อความ "เริ่มเคลื่อนย้ายพัสดุช่อง A" พร้อมกดสวิตช์ส่งสายสัญญาณยึด Medium ชั่วคราว.',
        '[MEDIUM] สัญญาณเสียงเดินทางข้ามสาย UTP ไปยังผู้รับ (Left to Right) โดยที่อีกฝั่งกำลังตั้งช่องรอรับสัญญาณ.',
        '[RECEIVER] [ผู้รับ] ลำโพงปลายทางได้รับกระแสคลื่นเสียง ขับหน้าดอกลำโพงปล่อยข้อความเสียง "เริ่มเคลื่อนย้ายพัสดุช่อง A" สำเร็จ.',
        '[ระบบ] จบการคุยข้อความที่หนึ่ง ปลายทางพูดตอบรับวิทยุสวนกลับได้เป็นลำดับถัดไป (สลับเวลาคุย).'
      ],
      R2L: [
        '[INPUT] [ผู้รับ] กดสวิตช์วิทยุส่งสารกลับคืน "พัสดุช่อง A จัดวางเรียบร้อยแล้ว เปลี่ยน" ส่งกระแสคลื่นสัญญาณไฟฟ้าลง Medium.',
        '[MEDIUM] บิตกระแสเดินทางย้อนทิศทาง (Right to Left) เพื่อส่งสัญญาณคืนสภาพมายังเครื่องต้นทาง.',
        '[SENDER] [ผู้ส่ง] เครื่องสัญญานผู้ส่งรับกระแส ลำโพงเปล่งเสียงรายงานความคืบหน้าการจัดระบบสต็อกสินค้าได้อย่างปลอดภัย.',
        '[ระบบ] การส่งกลับเสร็จสิ้น สลับหน้าช่องคุยได้อย่างมั่นคงทีละชิ้นงาน.'
      ],
      BOTH: [
        '[COLLISION DETECTED] [วิกฤตสัญญาณชนกัน] เครื่องส่งฝั่งซ้าย และเครื่องส่งฝั่งขวา พยายามปล่อยบิตกระแสไฟฟ้าสวนทางกันลงในท่อ Medium เดียวกันในเสี้ยววินาทีเดียวกัน!',
        '[PROCESS] สัญญาณไฟฟ้าปะทะกันกึ่งกลางแกนเรขาคณิต (x = 400) เกิดการกวนและหักล้างของระดับแรงดัน บิตข้อมูลบิดเบี้ยวชำรุด 100%.',
        '[STORAGE] ระบบคลังแลนสืบพบความร้อนและโวลต์เพี้ยนบนช่องส่ง ยื่นสัญญาณแจ้งเตือนขอระงับการส่งทันที.',
        '[ERROR] ข้อมูลสูญหายทั้งหมด! นักเรียนต้องกด RESET เพื่อเคลียร์สาย Medium และสับเวลาคิวส่งใหม่ให้มีคิวต่างเวลา (Half-Duplex Rule).'
      ]
    },
    full: {
      BOTH: [
        '[INPUT] ผู้ใช้งานโทรศัพท์ต้นทาง และผู้รับปลายทาง ปล่อยกระแสเสียงบิตพูดคุยตอบรับกันทันทีข้ามพอร์ตร่วมกัน.',
        '[MEDIUM] สายสัญญาณใยแก้วมีช่องนำทางขนานกัน 2 ทิศทาง ทำให้กระแสสัญญาณฝั่งซ้าย (L2R) และฝั่งขวา (R2L) วิ่งสวนกันได้อย่างอิสระ 100%.',
        '[RECEIVER] ทั้งผู้รับและผู้ส่งปลายทาง สามารถฟังและพูดไปพร้อมกันได้โดยที่ข้อมูลไม่เกิดการชนกันและการกวนสัญญาณใดๆ.',
        '[ระบบ] วงจร Full-Duplex ทำการแลกเปลี่ยนกระแสข้อมูลสองทิศทางพร้อมกันเสร็จสิ้นอย่างสมบูรณ์แบบ.'
      ]
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // SIMULATOR LOGIC
  // ────────────────────────────────────────────────────────────────────────
  
  const startFlow = () => {
    if (selectedMode === 'simplex') {
      setFlowActive(true);
      setFlowStep(1);
      setScenarioLogs([
        `[เริ่มต้น] จำลองทิศทาง Simplex: ${sendDirection === 'L2R' ? 'ส่งสัญญาณแบบทางเดียว' : 'ผู้รับส่งกลับไม่ได้'}`,
        transmissionLogs.simplex.L2R[0]
      ]);
    } else if (selectedMode === 'half') {
      setFlowActive(true);
      setFlowStep(1);
      if (sendDirection === 'BOTH') {
        setFlowStep(3); // Collision directly!
        setScenarioLogs([
          `[ล้มเหลว] ตรวจพบข้อมูลชนกันในช่องส่ง Half-Duplex`,
          transmissionLogs.half.BOTH[0]
        ]);
      } else {
        setScenarioLogs([
          `[เริ่มต้น] จำลองทิศทาง Half-Duplex: ${sendDirection === 'L2R' ? 'ส่งจากซ้ายไปขวา' : 'ส่งจากขวาไปซ้าย'}`,
          transmissionLogs.half[sendDirection][0]
        ]);
      }
    } else if (selectedMode === 'full') {
      setFlowActive(true);
      setFlowStep(1);
      setScenarioLogs([
        `[เริ่มต้น] จำลองทิศทาง Full-Duplex: ส่งสวนทางพร้อมกันอย่างราบรื่น`,
        transmissionLogs.full.BOTH[0]
      ]);
    }
  };

  const resetFlow = () => {
    setFlowActive(false);
    setFlowStep(0);
    setScenarioLogs([
      '[ระบบ] เครือข่ายพร้อมสื่อสาร เลือกทิศทาง/โหมดส่งสัญญาณ และกด PLAY เพื่อเริ่มต้นจำลองกระบวนการ'
    ]);
  };

  useEffect(() => {
    if (!flowActive) return;

    // Simplex control flow
    if (selectedMode === 'simplex' && flowStep >= 1 && flowStep < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStep + 1;
        setFlowStep(nextStep);
        setScenarioLogs(prev => [
          ...prev,
          transmissionLogs.simplex.L2R[nextStep - 1]
        ]);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

    // Half Duplex control flow (single direction)
    if (selectedMode === 'half' && sendDirection !== 'BOTH' && flowStep >= 1 && flowStep < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStep + 1;
        setFlowStep(nextStep);
        setScenarioLogs(prev => [
          ...prev,
          transmissionLogs.half[sendDirection][nextStep - 1]
        ]);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

    // Half Duplex collision flow
    if (selectedMode === 'half' && sendDirection === 'BOTH' && flowStep >= 3 && flowStep < 5) {
      const timer = setTimeout(() => {
        const nextStep = flowStep === 3 ? 4 : 5;
        setFlowStep(nextStep);
        if (nextStep === 4) {
          setScenarioLogs(prev => [...prev, transmissionLogs.half.BOTH[1], transmissionLogs.half.BOTH[2]]);
        } else {
          setFlowActive(false);
          setScenarioLogs(prev => [...prev, transmissionLogs.half.BOTH[3]]);
        }
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

    // Full Duplex control flow
    if (selectedMode === 'full' && flowStep >= 1 && flowStep < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStep + 1;
        setFlowStep(nextStep);
        setScenarioLogs(prev => [
          ...prev,
          transmissionLogs.full.BOTH[nextStep - 1]
        ]);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

    // Success terminations
    if (flowStep === 4 && flowActive) {
      const timer = setTimeout(() => {
        setFlowStep(5);
        setFlowActive(false);
        setScenarioLogs(prev => [...prev, '[เสร็จสิ้น] การส่งถ่ายบิตและควบคุมประสานความเร็วสิ้นสุดอย่างงดงาม.']);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

  }, [flowStep, flowActive, selectedMode, sendDirection, flowSpeed]);

  const activeElementData = elements.find(el => el.id === selectedElement);

  return (
    <>
      {/* 1️⃣ Layer 1: Ambient Backdrop Blobs */}
      <AmbientBackdrop />

      {/* 3️⃣ Layer 3: Main Layout Stacking Subtopics Vertically */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-24 relative z-10">
        
        {/* ====================================================================
            SECTION 1: ความหมายและองค์ประกอบการสื่อสารข้อมูล (1.2.1 & 1.2.2)
            ==================================================================== */}
        <section id="section-meaning-elements" className="space-y-10">
          
          {/* 1.2.1 ความหมายและวัตถุประสงค์ */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ความหมายและวัตถุประสงค์ของระบบเครือข่ายคอมพิวเตอร์
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ระบบเครือข่ายคอมพิวเตอร์คือการรวบรวมเครื่องคอมพิวเตอร์และอุปกรณ์อิเล็กทรอนิกส์สากลมาเชื่อมต่อเข้าด้วยกันผ่านตัวนำสัญญาณทางกายภาพ 
              วัตถุประสงค์เพื่อยกระดับขีดความสามารถการสื่อสาร แบ่งปันพื้นที่เก็บข้อมูล ดำเนินงานโปรแกรมพร้อมกันอย่างปลอดภัย และแชร์เครื่องมือฮาร์ดแวร์เพื่อลดต้นทุนเชิงบริหาร
            </p>
          </div>

          {/* 1.2.2 องค์ประกอบของการสื่อสารข้อมูล */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                องค์ประกอบพื้นฐาน 5 ส่วนของการสื่อสารข้อมูล
              </h2>
            </div>

            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              การเดินทางรับส่งคำสั่งข้ามระบบเครือข่ายจะสมบูรณ์ได้ ต้องพึ่งพาการทำงานร่วมกันขององค์ประกอบสากลทั้ง 5 ข้อ ซึ่งเปรียบเหมือนสายการประสานที่ขาดกันไม่ได้:
            </p>

            {/* Element Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {elements.map((el) => {
                const IconComponent = el.icon;
                const isActive = selectedElement === el.id;
                return (
                  <ConceptCard
                    key={el.id}
                    accent={el.color}
                    active={isActive}
                    onClick={() => setSelectedElement(el.id)}
                    symbol={<IconComponent className="w-7 h-7" />}
                    symbolFont="sans"
                    title={el.title}
                    description={el.en}
                  />
                );
              })}
            </div>

            {/* Detailed Element Display Panel */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-md transition-all duration-300">
              {activeElementData && (
                <div className="flex flex-col md:flex-row gap-6 items-start animate-fadeIn">
                  <div className={`p-4 rounded-2xl bg-${activeElementData.color}-50 text-${activeElementData.color}-600 border border-${activeElementData.color}-100 shrink-0`}>
                    {React.createElement(activeElementData.icon, { className: 'w-10 h-10' })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">{activeElementData.title} ({activeElementData.en})</h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed max-w-3xl">{activeElementData.desc}</p>
                    
                    <div className="space-y-2 border-t border-slate-200/50 pt-3">
                      <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">บทบาทเทคโนโลยีระดับลอจิก</span>
                      <p className="text-[14px] text-slate-700 font-semibold">{activeElementData.tech}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2: ประโยชน์และข้อจำกัด/ต้นทุน (1.2.3 & 1.2.4)
            ==================================================================== */}
        <section id="section-sharing-risks" className="space-y-10">
          
          {/* 1.2.3 ประโยชน์การแชร์ทรัพยากร */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ประโยชน์ของการแบ่งปันทรัพยากรร่วมกันบนระบบเครือข่าย
              </h2>
            </div>

            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              เทคโนโลยีเครือข่ายส่งสัญญาณถูกสรรค์สร้างขึ้นมาเพื่อยกระดับความคุ้มค่าของการดำเนินงาน โดยการจำแนกเป้าหมายการแชร์ร่วมกันออกเป็น **3 มิติเชิงอุตสาหกรรม**:
            </p>

            {/* Sharing selector tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner w-fit cursor-pointer">
              {Object.keys(sharingBenefits).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedSharing(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    selectedSharing === key
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {key === 'hardware' ? 'แบ่งปันฮาร์ดแวร์' : key === 'software' ? 'แบ่งปันซอฟต์แวร์' : 'แบ่งปันข้อมูล'}
                </button>
              ))}
            </div>

            {/* Sharing benefit details card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all duration-300">
              <h4 className="text-[18px] font-bold text-slate-800">{sharingBenefits[selectedSharing].title}</h4>
              <p className="text-[15px] text-slate-600 leading-relaxed max-w-4xl">{sharingBenefits[selectedSharing].desc}</p>
              
              <div className="space-y-2 border-t border-slate-200/50 pt-4">
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">ตัวอย่างเคสและสถิติในองค์กร</span>
                <ul className="space-y-2">
                  {sharingBenefits[selectedSharing].examples.map((ex, i) => (
                    <li key={i} className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 1.2.4 ข้อจำกัด ความเสี่ยง และต้นทุน */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ข้อจำกัด ความเสี่ยง และภาระต้นทุนในการจัดวางเครือข่าย
              </h2>
            </div>

            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              การติดตั้งระบบมีความขัดแย้งเชิงความคุ้มค่าที่ผู้ดูแลระบบต้องพึงระวัง เนื่องจากถึงแม้จะได้รับประสิทธิภาพสูงขึ้น แต่ก็มาพร้อมกับข้อจำกัดและข้อแลกเปลี่ยนทางความมั่นคงปลอดภัยดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl w-fit">
                  <Shield className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-[16px] font-bold text-slate-800">ความมั่นคงปลอดภัย (Security Perils)</h4>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">
                  เนื่องจากคอมพิวเตอร์เข้าถึงสายแกนเดียวกัน ทำให้หากมีเครื่องชิ้นหนึ่งติดไวรัสหรือมัลแวร์ จะสามารถแพร่กระจายตัวอย่างรวดเร็วข้ามวงแลนไปสู่เซิร์ฟเวอร์หลักได้อย่างง่ายดาย
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl w-fit">
                  <Sliders className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-slate-800">ต้นทุนเริ่มแรกสูง (Initial Investments)</h4>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">
                  ต้องใช้เงินทุนเริ่มต้นมหาศาลในการจัดซื้อสาย UTP หมวดหมู่ Cat6/Cat6A, การวางตู้แร็คเซิร์ฟเวอร์, อุปกรณ์จัดเส้นทาง Router, คีย์สวิตช์แลน และจุดควบคุม Access Point
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] font-bold text-slate-800">การดูแลรักษา (Maintenance Complexity)</h4>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">
                  เครือข่ายขนาดใหญ่จำเป็นต้องพึ่งพาช่างเทคนิควิศวกรเฉพาะทางในการควบคุมคิว จัด IP ซับเน็ตติ้ง ตรวจจับคลื่นสัญญาณทับซ้อน และทำสถิติรายงานการกู้ภัยหากสายแลนขาดชำรุด
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3: ทิศทางการส่งสัญญาณข้อมูล (Transmission Simulator) (1.2.5)
            ==================================================================== */}
        <section id="section-transmission" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ทิศทางการส่งสัญญาณข้อมูลในระบบเครือข่าย
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ทิศทางการสื่อสารข่าวสาร (Transmission Mode) ถูกระบุตามความขีดความสามารถการใช้สื่อกลาง โดยแบ่งออกเป็น **3 รูปแบบหลัก** ทางด้านวิศวกรรมเครือข่าย 
              คุณสามารถกดทดลองและสั่งป้อนพัลส์สัญญาณส่งสวนทางกันเพื่อวิเคราะห์ลอจิกการชนกันของกระแสบิตข้อมูลในแบบจำลองอัจฉริยะด้านล่าง:
            </p>

            {/* Interactive Transmission Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">DATA TRANSMISSION MODE INTERACTIVE SIMULATOR</span>
                </div>
                
                {/* Control Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Select Mode */}
                  <select
                    value={selectedMode}
                    onChange={(e) => {
                      setSelectedMode(e.target.value);
                      if (e.target.value === 'simplex') {
                        setSendDirection('L2R');
                      } else if (e.target.value === 'full') {
                        setSendDirection('BOTH');
                      } else {
                        setSendDirection('L2R');
                      }
                      resetFlow();
                    }}
                    disabled={flowActive}
                    className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="simplex">Simplex Mode (ทางเดียว)</option>
                    <option value="half">Half-Duplex Mode (กึ่งสองทาง)</option>
                    <option value="full">Full-Duplex Mode (สองทางพร้อมกัน)</option>
                  </select>

                  {/* Half Duplex Direction Controls */}
                  {selectedMode === 'half' && (
                    <select
                      value={sendDirection}
                      onChange={(e) => {
                        setSendDirection(e.target.value);
                        resetFlow();
                      }}
                      disabled={flowActive}
                      className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="L2R">ซ้าย ➔ ขวา (ส่งข้อความ)</option>
                      <option value="R2L">ขวา ➔ ซ้าย (ตอบรับ)</option>
                      <option value="BOTH">ส่งชนกันพร้อมกัน (กระแสปะทะ!)</option>
                    </select>
                  )}

                  <div className="h-5 w-px bg-slate-700/60" />

                  <button
                    onClick={startFlow}
                    disabled={flowActive || flowStep === 5}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      flowActive || flowStep === 5
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    PLAY
                  </button>

                  <button
                    onClick={resetFlow}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>

              {/* Speed Controller */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-400">ควบคุมความถี่สัญญาณการสื่อสาร (Hz):</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="600"
                    max="3000"
                    step="300"
                    value={3600 - flowSpeed}
                    onChange={(e) => setFlowSpeed(3600 - parseInt(e.target.value))}
                    className="w-32 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-indigo-400">{((3600 - flowSpeed) / 1000).toFixed(1)} Hz</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/40">
                {/* Visual SVG Transmission Canvas */}
                <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-full text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ระบบสายส่ง: {selectedMode === 'simplex' ? 'SIMPLEX' : selectedMode === 'half' ? 'HALF-DUPLEX' : 'FULL-DUPLEX'}
                    </span>
                  </div>

                  <svg width="600" height="380" viewBox="0 0 600 380" className="w-full max-w-[480px]">
                    <defs>
                      <marker id="arrowL" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.4)" />
                      </marker>
                      <marker id="arrowL-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818CF8" />
                      </marker>
                      <marker id="arrowR-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34D399" />
                      </marker>
                    </defs>

                    {/* Symmetrical Transmission Paths */}
                    {/* Basic Line at y = 190 */}
                    {selectedMode !== 'full' ? (
                      <>
                        <path
                          d="M 180,190 H 420"
                          stroke="rgba(148, 163, 184, 0.08)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        {/* Simplex Active Flow */}
                        {selectedMode === 'simplex' && (
                          <path
                            d="M 180,190 H 420"
                            stroke={flowStep > 0 && flowStep < 5 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                            strokeWidth="2.5"
                            markerEnd={flowStep > 0 && flowStep < 5 ? 'url(#arrowL-active)' : 'url(#arrowL)'}
                            className={flowStep > 0 && flowStep < 5 ? 'animate-flow-dash' : ''}
                            style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                          />
                        )}

                        {/* Half Duplex L2R Active Flow */}
                        {selectedMode === 'half' && sendDirection === 'L2R' && (
                          <path
                            d="M 180,190 H 420"
                            stroke={flowStep > 0 && flowStep < 5 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                            strokeWidth="2.5"
                            markerEnd={flowStep > 0 && flowStep < 5 ? 'url(#arrowL-active)' : 'url(#arrowL)'}
                            className={flowStep > 0 && flowStep < 5 ? 'animate-flow-dash' : ''}
                            style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                          />
                        )}

                        {/* Half Duplex R2L Active Flow */}
                        {selectedMode === 'half' && sendDirection === 'R2L' && (
                          <path
                            d="M 420,190 H 180"
                            stroke={flowStep > 0 && flowStep < 5 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                            strokeWidth="2.5"
                            markerEnd={flowStep > 0 && flowStep < 5 ? 'url(#arrowR-active)' : 'url(#arrowL)'}
                            className={flowStep > 0 && flowStep < 5 ? 'animate-flow-dash' : ''}
                            style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                          />
                        )}

                        {/* Half Duplex Collision Signal Flow */}
                        {selectedMode === 'half' && sendDirection === 'BOTH' && (
                          <>
                            <path
                              d="M 180,190 L 300,190"
                              stroke={flowStep === 3 ? '#EF4444' : '#818CF8'}
                              strokeWidth="2.5"
                              className={flowStep === 3 ? 'animate-flow-dash' : ''}
                              style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                            />
                            <path
                              d="M 420,190 L 300,190"
                              stroke={flowStep === 3 ? '#EF4444' : '#34D399'}
                              strokeWidth="2.5"
                              className={flowStep === 3 ? 'animate-flow-dash' : ''}
                              style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                            />
                            {flowStep >= 4 && (
                              <circle cx="300" cy="190" r="15" fill="#EF4444" opacity="0.3" className="animate-ping" />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      // Full Duplex Double Parallel paths
                      <>
                        <path
                          d="M 180,170 H 420"
                          stroke="rgba(148, 163, 184, 0.08)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 420,210 H 180"
                          stroke="rgba(148, 163, 184, 0.08)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        <path
                          d="M 180,170 H 420"
                          stroke={flowStep > 0 && flowStep < 5 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStep > 0 && flowStep < 5 ? 'url(#arrowL-active)' : 'url(#arrowL)'}
                          className={flowStep > 0 && flowStep < 5 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                        />
                        <path
                          d="M 420,210 H 180"
                          stroke={flowStep > 0 && flowStep < 5 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStep > 0 && flowStep < 5 ? 'url(#arrowR-active)' : 'url(#arrowL)'}
                          className={flowStep > 0 && flowStep < 5 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                        />
                      </>
                    )}

                    {/* Nodes representing Sender and Receiver using foreignObject */}
                    {/* Node 1: Sender (Left side, y=140, x=30) */}
                    <foreignObject x={30} y={140} width={150} height={100}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 1 || (flowStep === 3 && selectedMode === 'half')
                          ? 'bg-slate-900 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)] text-indigo-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider uppercase">SENDER / SOURCE</div>
                        <div className="text-[12px] font-semibold text-slate-200 mt-1.5 leading-tight">เครื่องอมพิวเตอร์ส่งส่ง</div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1">IP: 192.168.1.50</span>
                      </div>
                    </foreignObject>

                    {/* Node 2: Receiver (Right side, y=140, x=420) */}
                    <foreignObject x={420} y={140} width={150} height={100}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 2 || (flowStep === 3 && selectedMode === 'half')
                          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.2)] text-emerald-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider uppercase">RECEIVER / TARGET</div>
                        <div className="text-[12px] font-semibold text-slate-200 mt-1.5 leading-tight">หน้าจอรับแสดงผล</div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1">IP: 192.168.1.120</span>
                      </div>
                    </foreignObject>

                    {/* Collision Icon Indicator */}
                    {selectedMode === 'half' && sendDirection === 'BOTH' && flowStep >= 4 && (
                      <g transform="translate(285, 175)" className="animate-fadeIn">
                        <circle cx="15" cy="15" r="18" fill="#EF4444" opacity="0.9" />
                        <foreignObject x="0" y="0" width="30" height="30">
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <AlertTriangle className="w-5 h-5 animate-pulse" />
                          </div>
                        </foreignObject>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Flow Logs Screen */}
                <div className="lg:col-span-5 flex flex-col h-[380px]">
                  <ConsoleScreen
                    title="TRANSMISSION MONITOR LOGGER"
                    logs={scenarioLogs}
                    onClear={() => setScenarioLogs(['Console monitor ready...'])}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4: ใบงานและการประเมินท้ายบทเรียน (TeacherTask)
            ==================================================================== */}
        <SectionBlock>
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                แบบฝึกหัดประเมินความรู้เบื้องต้นระบบเครือข่าย
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ทบทวนลอจิกความเข้าใจเกี่ยวกับความหมาย องค์ประกอบ 5 ส่วนของสารสนเทศ ประโยชน์การแชร์ และทิศทางการไหลของกระแสบิต Half-Duplex/Full-Duplex ในองค์กร
            </p>

            <TeacherTask
              title="ใบงานทบทวนความรู้เบื้องต้นเครือข่าย (Unit 1.2)"
              taskText="ให้นักเรียนวิเคราะห์โจทย์คำถามตรรกะระบบเครือข่ายและเลือกคำตอบที่ถูกต้องที่สุดเพื่อเก็บคะแนนและประเมินผลการสอบผ่านหน่วยการเรียนรู้นี้"
              questions={[
                {
                  question: 'ข้อใดอธิบายวัตถุประสงค์หลักของการจัดตั้งระบบเครือข่ายคอมพิวเตอร์ในองค์กรได้อย่างครอบคลุมที่สุด?',
                  options: [
                    'เพื่อช่วยประหยัดไฟและถนอมสุขภาพหน้าจอมอนิเตอร์พนักงาน',
                    'เพื่อเชื่อมต่ออุปกรณ์ให้แลกเปลี่ยนสารสนเทศและแบ่งปันการใช้ทรัพยากรร่วมกัน',
                    'เพื่อป้องกันการประกอบคอมพิวเตอร์ที่ชำรุดเสียหายเชิงกายภาพ',
                    'เพื่อจำลองการบำรุงรักษาและเคลียร์พื้นที่จัดเก็บข้อมูลบน NVMe SSD เท่านั้น'
                  ],
                  correctIndex: 1
                },
                {
                  question: 'ในองค์ประกอบ 5 ส่วนสากลของการสื่อสารข้อมูล ข้อใดเปรียบเสมือน "กฎและระเบียบร่วมกัน" เพื่อจัดรูปแบบบิตสัญญาณไม่ให้สื่อสารขัดข้อง?',
                  options: [
                    'ข้อมูลข่าวสาร (Message)',
                    'ตัวแปลภาษาไดรเวอร์ (Device Driver)',
                    'สื่อกลางนำสัญญาณ (Medium)',
                    'โปรโตคอลการสื่อสาร (Protocol)'
                  ],
                  correctIndex: 3
                },
                {
                  question: 'การติดตั้ง File Server เพื่อจัดโฟลเดอร์ให้พนักงานบัญชีและฝ่ายขายสามารถแก้ไขเอกสารชิ้นเดียวกันได้ จัดเป็นประโยชน์การแชร์ใด?',
                  options: [
                    'การแบ่งปันซอฟต์แวร์ประยุกต์ (Software Sharing)',
                    'การแบ่งปันอุปกรณ์เครื่องพิมพ์ (Hardware Sharing)',
                    'การแบ่งปันข้อมูลและสารสนเทศ (Data Sharing)',
                    'การแบ่งปันสัญญาณ IP แอดเดรส (IP Address Sharing)'
                  ],
                  correctIndex: 2
                },
                {
                  question: 'ระบบส่งพัลส์สัญญาณภาพเคลื่อนไหวสดจากกล้องวงจรปิด UHD ไปสตรีมแสดงผลยังหน้าจอมอนิเตอร์สถานีตู้ยาม จัดเป็นทิศทางการสื่อสารรูปแบบใด?',
                  options: [
                    'แบบทางเดียว (Simplex Mode)',
                    'แบบกึ่งสองทางสลับส่ง (Half-Duplex Mode)',
                    'แบบสองทางเต็มรูปแบบ (Full-Duplex Mode)',
                    'แบบความเร็วเฉลี่ยผสม (Hybrid Mode)'
                  ],
                  correctIndex: 0
                },
                {
                  question: 'ในสภาพแวดล้อมเครือข่ายแบบ Half-Duplex จะเกิดเหตุขัดข้องประการใดขึ้นหากอุปกรณ์ฝั่งรับและฝั่งส่งพยายามยิงบิตกระแสไฟฟ้าสวนทางกันพร้อมกันบนคู่สายแลนเดี่ยว?',
                  options: [
                    'ความเร็วของอินเทอร์เน็ตจะทวีคูณเป็นสองเท่า',
                    'สาย UTP จะขาดกะทันหันเนื่องจากความร้อนสูง',
                    'เกิดการชนกันของกระแสข้อมูลสัญญาณ (Collision) ทำให้บิตข้อความชำรุด',
                    'สัญญาณจะทำการจัดเรียงคิวสลับวิทยุโดยไม่เกิดข้อผิดพลาดใดๆ'
                  ],
                  correctIndex: 2
                }
              ]}
            />
          </div>
        </SectionBlock>

      </main>
    </>
  );
}
