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
  LockKeyhole,
  Building,
  Key
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConsoleScreen,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function IT1_3() {
  // ────────────────────────────────────────────────────────────────────────
  // STATE DEFINITIONS
  // ────────────────────────────────────────────────────────────────────────

  // --- 1.3.1: จำแนกเครือข่ายตามระยะทาง ---
  const [selectedDistance, setSelectedDistance] = useState('lan');

  // --- 1.3.2 & 1.3.3: Client-Server vs Peer-to-Peer Simulator ---
  const [simMode, setSimMode] = useState('clientserver'); // clientserver | peertopeer | perimeter
  const [isServerCrashed, setIsServerCrashed] = useState(false);
  const [p2pNodes, setP2pNodes] = useState({
    NodeA: true,
    NodeB: true,
    NodeC: true,
    NodeD: true
  });
  const [activeTransfer, setActiveTransfer] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferLog, setTransferLog] = useState([
    '[ระบบ] แบบจำลองพร้อมทำงาน เลือกสถาปัตยกรรมด้านบนเพื่อทดสอบกลไกการรับส่งข้อมูล'
  ]);
  const [simulationSpeed, setSimulationSpeed] = useState(1500); // ms

  // --- 1.3.4: Intranet, Extranet, Internet (Perimeter Security) ---
  const [selectedPacketType, setSelectedPacketType] = useState('internal');
  const [packetFlowStep, setPacketFlowStep] = useState(0); // 0 = ready, 1 = gateway, 2 = destination/block

  // ────────────────────────────────────────────────────────────────────────
  // DATA CONFIGURATIONS
  // ────────────────────────────────────────────────────────────────────────

  // 1.3.1: ข้อมูลขนาดเครือข่าย
  const networkSizes = {
    pan: {
      title: 'เครือข่ายส่วนบุคคล (Personal Area Network - PAN)',
      range: '1 - 10 เมตร',
      speed: '1 Mbps - 480 Mbps',
      medium: 'คลื่นวิทยุความถี่สั้น (Bluetooth, Zigbee), ลำแสงอินฟราเรด (IR)',
      protocol: 'IEEE 802.15.1 (Bluetooth), IEEE 802.15.4',
      usecase: 'การเชื่อมต่อหูฟังไร้สาย (TWS) กับสมาร์ทโฟน, สมาร์ทวอทช์ส่งข้อมูลก้าวเดิน, การรับส่งไฟล์รูปภาพด่วนผ่าน AirDrop ในห้องส่วนตัว',
      accent: 'emerald',
      bgGradient: 'from-emerald-50 to-white'
    },
    lan: {
      title: 'เครือข่ายเฉพาะที่ (Local Area Network - LAN)',
      range: '10 เมตร - 1 กิโลเมตร',
      speed: '100 Mbps - 10 Gbps',
      medium: 'สายทองแดงคู่ตีเกลียว (UTP Cat6), คลื่นอากาศแลนไร้สาย (Wi-Fi)',
      protocol: 'IEEE 802.3 (Ethernet), IEEE 802.11 (Wi-Fi)',
      usecase: 'การเชื่อมโยงระบบห้องคอมพิวเตอร์โรงเรียนอาชีวะ, การจัดส่งไฟล์เอกสารกลางในสำนักงานธุรกิจ, ระบบแชร์เครื่องพิมพ์ในแผนกจัดซื้อ',
      accent: 'indigo',
      bgGradient: 'from-indigo-50 to-white'
    },
    man: {
      title: 'เครือข่ายระดับเมือง (Metropolitan Area Network - MAN)',
      range: '1 - 50 กิโลเมตร',
      speed: '1 Gbps - 100 Gbps',
      medium: 'สายใยแก้วนำแสงสมรรถนะสูง (Fiber Optic Backbone), คลื่นไมโครเวฟ',
      protocol: 'Metro Ethernet, SD-WAN, DWDM',
      usecase: 'เครือข่ายสายส่ง Fiber Ring เชื่อมโยงอาคารศาลากลางกับสำนักงานเขตทั่วกรุงเทพฯ, ระบบกล้องวงจรปิดครอบคลุมทางด่วนพิเศษทั่วเมืองหลวง',
      accent: 'amber',
      bgGradient: 'from-amber-50 to-white'
    },
    wan: {
      title: 'เครือข่ายบริเวณกว้าง (Wide Area Network - WAN)',
      range: 'ข้ามจังหวัด ประเทศ หรือทั่วโลก',
      speed: '10 Mbps - 100 Gbps+',
      medium: 'โครงข่ายสายเคเบิลใยแก้วใต้ทะเล (Submarine Cables), สัญญาณผ่านดาวเทียมวงโคจรต่ำ (Low Earth Orbit Satellite)',
      protocol: 'IP/MPLS, Frame Relay, Border Gateway Protocol (BGP)',
      usecase: 'โครงข่ายอินเทอร์เน็ตเวิลด์ไวด์เว็บเชื่อมต่อข้อมูลข้ามทวีป, ระบบตู้เอทีเอ็ม (ATM) ธนาคารเชื่อมต่อแลกเปลี่ยนยอดบัญชีกับศูนย์คลังกรุงเทพฯ',
      accent: 'rose',
      bgGradient: 'from-rose-50 to-white'
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // SIMULATOR LOGIC
  // ────────────────────────────────────────────────────────────────────────

  // เริ่มจำลองกระบวนการ Client-Server
  const handleClientServerRequest = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setTransferProgress(0);
    setPacketFlowStep(0);

    if (isServerCrashed) {
      setTransferLog([
        '[ส่งข่าวสาร] โหนดลูกข่าย (Client) พยายามจ่ายบิตข้อมูลร้องขอไปยังศูนย์กลาง...',
        '[MEDIUM] สัญญาณผ่านสายทองแดงเดินทางด้วยทราฟฟิกปกติเข้าสู่จุดกึ่งกลาง (x = 400)',
        '[ERROR] [ล้มเหลวอย่างรุนแรง] ศูนย์บริการคอมพิวเตอร์แม่ข่ายหลักขัดข้อง (Server Crashed)!',
        '[SPOF ALERT] ตรวจพบจุดล้มเหลวเดี่ยว (Single Point of Failure)! ลอจิกการเชื่อมโยงขาดสะบั้น การแชร์ฐานข้อมูลหยุดชะงัก 100%'
      ]);
      setTransferProgress(50); // ค้างกลางทาง
      setActiveTransfer(false);
    } else {
      setTransferLog([
        '[ส่งข่าวสาร] โหนด Client 1 และ 2 เริ่มต้นส่งสารร้องขอ (HTTP GET Request) ลงสู่ช่องส่ง',
        '[MEDIUM] กระแสบิตข้อมูลเคลื่อนผ่านสาย UTP คอนเนคเตอร์ มุ่งสู่กึ่งกลางเรขาคณิต (x = 400)',
        '[SERVER] เครื่องแม่ข่ายประมวลผลดึงข้อมูลยอดขายประจำวันและแปลรหัส SQL สำเร็จ',
        '[OUTPUT] แม่ข่ายส่งสารตอบกลับ (HTTP 200 OK) ปลายทางได้รับสถิติข้อมูลแชร์ราบรื่นเสร็จสมบูรณ์!'
      ]);
      
      // อัปเดต Progress
      let step = 0;
      const interval = setInterval(() => {
        step += 25;
        setTransferProgress(step);
        if (step >= 100) {
          clearInterval(interval);
          setActiveTransfer(false);
        }
      }, simulationSpeed / 4);
    }
  };

  // เริ่มจำลองกระบวนการ Peer-to-Peer
  const handleP2pTransfer = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setTransferProgress(0);

    const activeCount = Object.values(p2pNodes).filter(v => v).length;
    if (activeCount < 2) {
      setTransferLog([
        '[ERROR] ต้องการโหนดที่อยู่ในสถานะออนไลน์ (Online) อย่างน้อย 2 โหนด เพื่อทำการรับส่งข้อมูลแบบสากล!'
      ]);
      setActiveTransfer(false);
      return;
    }

    if (!p2pNodes.NodeA || !p2pNodes.NodeC) {
      // โหนดหลักขัดข้อง แต่ยังมีตัวสำรองรันเนอร์
      setTransferLog([
        '[กระบวนการ] โหนด A พยายามส่งแฟ้มงานสต็อกสินค้าไปยังโหนด C โดยตรง...',
        '[เส้นทางสำรอง] ตรวจพบโหนดปลายทางขัดข้องชั่วคราว! ระบบคัดกรองจัดสรรเส้นทางสำรอง',
        '[PEER ROUTING] ข้อมูลทำการสลับโหมดผ่านโหนดเพื่อนบ้านที่เปิดใช้งานอยู่แทน',
        '[เสร็จสิ้น] โครงข่ายแบบกระจายศูนย์ (Decentralized) ทำงานสำเร็จ ข้อมูลไหลเวียนต่อได้ ไร้ Single Point of Failure!'
      ]);
    } else {
      setTransferLog([
        '[กระบวนการ] โหนด A ทำการร้องขอไฟล์กับโหนด C ผ่านโครงข่ายสเปซกึ่งกลางไร้เซิร์ฟเวอร์',
        '[MEDIUM] บิตข้อมูลไหลสวนทางกันบนสายสัญญาณแบบ Mesh ทั่วถึง (Full Connection)',
        '[SUCCESS] ทั้งสองฝ่ายทำการดึงบล็อกข้อมูลชิ้นงานขนานพร้อมกันเสร็จสิ้น ความเร็วแลกเปลี่ยนสูงสุด!'
      ]);
    }

    let step = 0;
    const interval = setInterval(() => {
      step += 25;
      setTransferProgress(step);
      if (step >= 100) {
        clearInterval(interval);
        setActiveTransfer(false);
      }
    }, simulationSpeed / 4);
  };

  // เริ่มจำลองกระบวนการแชร์พื้นที่ Intranet/Extranet/Internet
  const handlePerimeterSend = () => {
    if (activeTransfer) return;
    setActiveTransfer(true);
    setPacketFlowStep(1);
    setTransferProgress(0);

    if (selectedPacketType === 'internal') {
      setTransferLog([
        '[1. ข้อมูลนำเข้า] เอกสารทฤษฎีความลับการค้าภายในองค์กร (Intranet Content) เริ่มจ่ายเข้าระบบ...',
        '[2. ด่านเกตเวย์] ดักกรอง ณ จุดเชื่อมต่อ (Firewall Security Inspection)...',
        '[3. ตรวจสอบเงื่อนไข] ปฏิเสธการออกสู่ภายนอก! บล็อกแพ็กเก็ตไม่ให้ออกสู่โครงข่าย Extranet/Internet เพื่อป้องกันข้อมูลรั่วไหล'
      ]);
      
      setTimeout(() => {
        setPacketFlowStep(2);
        setActiveTransfer(false);
      }, simulationSpeed);
    } else if (selectedPacketType === 'partner') {
      setTransferLog([
        '[1. ข้อมูลนำเข้า] ใบส่งของยอดบัญชีคู่ค้าภายนอก (Extranet Payload) เริ่มการส่ง...',
        '[2. ด่านเกตเวย์] ตรวจสอบสิทธิ์การเข้ารหัสอุโมงค์ VPN (Virtual Private Network Auth)...',
        '[3. ตรวจสอบเงื่อนไข] อนุญาตให้ผ่าน! ข้อมูลเข้าถึงระบบ Extranet ไปยังคู่ค้าธุรกิจที่ได้ลงทะเบียนยืนยันเรียบร้อย'
      ]);

      setTimeout(() => {
        setPacketFlowStep(2);
        setActiveTransfer(false);
      }, simulationSpeed);
    } else {
      setTransferLog([
        '[1. ข้อมูลนำเข้า] การสืบค้นหน้าเว็บไซต์สาธารณะ (Internet Web Query) เริ่มการจ่ายสัญญาณ...',
        '[2. ด่านเกตเวย์] ผ่านกลไกการแปลงที่อยู่เน็ตเวิร์ก (NAT) มุ่งหน้าสู่ DNS สาธารณะ...',
        '[3. ตรวจสอบเงื่อนไข] จัดส่งแพ็กเก็ตสำเร็จ! ลูกค้าสามารถมองเห็นบล็อกข้อมูลสินค้าบนคลาวด์จากภายนอกเสรี 100%'
      ]);

      setTimeout(() => {
        setPacketFlowStep(2);
        setActiveTransfer(false);
      }, simulationSpeed);
    }
  };

  // รีเซ็ตสถานะการจำลองทั้งหมด
  const handleResetSimulator = () => {
    setIsServerCrashed(false);
    setP2pNodes({ NodeA: true, NodeB: true, NodeC: true, NodeD: true });
    setActiveTransfer(false);
    setTransferProgress(0);
    setPacketFlowStep(0);
    setTransferLog([
      '[ระบบ] รีเซ็ตแบบจำลองเสร็จสมบูรณ์ ช่องสัญญาณและระดับความปลอดภัยพร้อมกลับเข้าสู่สภาวะปกติ'
    ]);
  };

  return (
    <>
      {/* 1️⃣ Layer 1: Ambient Backdrop Glimmer Theme */}
      <AmbientBackdrop
        blobs={[
          { color: 'bg-blue-200', size: 'w-96 h-96', position: '-top-10 -left-10', opacity: 'opacity-40' },
          { color: 'bg-indigo-200', size: 'w-80 h-80', position: 'top-1/3 -right-10', opacity: 'opacity-35' },
          { color: 'bg-purple-200', size: 'w-72 h-72', position: '-bottom-10 left-1/4', opacity: 'opacity-25' }
        ]}
      />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactive Visualizer */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-24 relative z-10">
        
        {/* ====================================================================
            SECTION 1: การจำแนกเครือข่ายตามระยะทางและขนาดพื้นที่ (1.3.1)
            ==================================================================== */}
        <section id="section-distance-types" className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                การจำแนกประเภทเครือข่ายคอมพิวเตอร์ตามระยะทาง
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ในทางวิศวกรรมการออกแบบระบบสารสนเทศ เครือข่ายสื่อสารข้อมูลจะถูกจำแนกออกเป็นประเภทหลักตามความกว้างขวางเชิงพื้นที่ (Coverage area) 
              และข้อจำกัดทางกายภาพของสื่อกลางความถี่ สถาปัตยกรรมเหล่านี้ออกแบบขึ้นมาเพื่อแก้โจทย์ความมั่นคง ความคุ้มค่า และการกระจายสัญญาณที่ต่างระดับกัน:
            </p>
          </div>

          {/* Interactive Coverage Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.keys(networkSizes).map((key) => {
              const active = selectedDistance === key;
              const sizeData = networkSizes[key];
              
              // Map Icon semantic
              let SizeIcon = Wifi;
              if (key === 'pan') SizeIcon = User;
              if (key === 'lan') SizeIcon = Monitor;
              if (key === 'man') SizeIcon = Building;
              if (key === 'wan') SizeIcon = Globe;

              return (
                <div
                  key={key}
                  onClick={() => setSelectedDistance(key)}
                  className={`bg-white/60 backdrop-blur-xl border rounded-2xl p-6 relative overflow-hidden transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg ${
                    active
                      ? `border-${sizeData.accent}-500/50 ring-2 ring-${sizeData.accent}-300 ring-offset-2 shadow-md`
                      : 'border-slate-200 hover:border-indigo-500/20'
                  }`}
                >
                  <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-${sizeData.accent}-400 blur-2xl opacity-20 pointer-events-none`} />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase">{key} scale</span>
                    <div className={`p-2.5 rounded-xl bg-${sizeData.accent}-50 text-${sizeData.accent}-600 border border-${sizeData.accent}-100`}>
                      <SizeIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-[16px] font-bold text-slate-800 mb-1 leading-snug">
                    {sizeData.title.split(' (')[0]}
                  </h3>
                  <p className="text-[13px] text-slate-500 font-mono mb-3">{sizeData.range}</p>
                </div>
              );
            })}
          </div>

          {/* Detailed Coverage Information Display */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 md:p-8 shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-start animate-fadeIn">
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    เจาะลึกองค์ความรู้ระดับอุตสาหกรรม
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2.5">
                    {networkSizes[selectedDistance].title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-slate-200/50 py-5">
                  <div>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">ระยะส่งสูงสุด</span>
                    <p className="text-[15px] font-semibold text-slate-700 mt-1">{networkSizes[selectedDistance].range}</p>
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">สปีดการรับส่งข้อมูล</span>
                    <p className="text-[15px] font-semibold text-slate-700 mt-1">{networkSizes[selectedDistance].speed}</p>
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">โปรโตคอลแกนหลัก</span>
                    <p className="text-[15px] font-semibold text-slate-700 mt-1 font-mono">{networkSizes[selectedDistance].protocol}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block mb-1">สื่อกลางหลักการรับส่ง (Transmission Medium)</span>
                    <p className="text-[14.5px] text-slate-600 leading-relaxed font-medium">{networkSizes[selectedDistance].medium}</p>
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ตัวอย่างการติดตั้งหน้างานจริง (Practical Usecases)</span>
                    <p className="text-[14.5px] text-slate-700 font-semibold bg-slate-50 border border-slate-100 rounded-xl p-3.5 leading-relaxed">
                      {networkSizes[selectedDistance].usecase}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2: สถาปัตยกรรมเครือข่ายและการจัดความปลอดภัย (1.3.2 - 1.3.4)
            ==================================================================== */}
        <section id="section-architectures-sim" className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                สถาปัตยกรรมโครงสร้างเครือข่ายและการบริหารความปลอดภัย
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              สถาปัตยกรรมการแชร์ทรัพยากรระดับเซิร์ฟเวอร์บ่งชี้วิธีกระจายบทบาทของอุปกรณ์ลูกข่ายและแม่ข่าย 
              ศึกษาการเปรียบเทียบเชิงลึกและลอจิกความปลอดภัยระหว่าง Client-Server และ Peer-to-Peer ในแบบจำลองอัจฉริยะด้านล่าง:
            </p>
          </div>

          {/* Interactive Multi-Mode Dashboard */}
          <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Mode selection top menu bar */}
            <div className="p-4 md:p-6 bg-slate-950/80 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Network className="w-5 h-5 text-indigo-400" />
                <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">
                  NETWORK ARCHITECTURE & SECURITY PERIMETER SIMULATOR
                </span>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-slate-800/80 border border-slate-700/60 p-1 rounded-xl shadow-inner cursor-pointer shrink-0">
                <button
                  onClick={() => { setSimMode('clientserver'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'clientserver' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Client-Server
                </button>
                <button
                  onClick={() => { setSimMode('peertopeer'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'peertopeer' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Peer-to-Peer
                </button>
                <button
                  onClick={() => { setSimMode('perimeter'); handleResetSimulator(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    simMode === 'perimeter' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Intranet / Internet
                </button>
              </div>
            </div>

            {/* Dashboard Control panel */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Dynamic Controls based on selected mode */}
              <div className="flex items-center gap-3 flex-wrap">
                {simMode === 'clientserver' && (
                  <>
                    <button
                      onClick={handleClientServerRequest}
                      disabled={activeTransfer}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      ส่งข่าวสาร (Request)
                    </button>
                    <button
                      onClick={() => {
                        setIsServerCrashed(!isServerCrashed);
                        setTransferLog(prev => [
                          ...prev,
                          isServerCrashed
                            ? '[ซ่อมบำรุง] ติดตั้งการ์ดแลนและโมดูล Server คืนสถานะ Active แล้ว'
                            : '[ALERT] วิศวกรเครือข่ายปลดปลั๊กไฟเลี้ยงเซิร์ฟเวอร์แม่ข่ายหลักขัดข้องล้มเหลวชั่วคราว!'
                        ]);
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer ${
                        isServerCrashed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : 'bg-rose-600 text-white hover:bg-rose-500'
                      }`}
                    >
                      {isServerCrashed ? 'ซ่อมแซมระบบ (Repair)' : 'จำลองแม่ข่ายล่ม (Crash Server)'}
                    </button>
                  </>
                )}

                {simMode === 'peertopeer' && (
                  <>
                    <button
                      onClick={handleP2pTransfer}
                      disabled={activeTransfer}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      ส่งไฟล์ตรง (P2P Share)
                    </button>
                    <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/60 px-3 py-1 rounded-lg">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">สลับสิทธิ์โหนดออนไลน์:</span>
                      {Object.keys(p2pNodes).map(nodeKey => (
                        <label key={nodeKey} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={p2pNodes[nodeKey]}
                            onChange={(e) => {
                              setP2pNodes(prev => ({ ...prev, [nodeKey]: e.target.checked }));
                              setTransferLog(p => [...p, `[P2P] ปรับเปลี่ยนสถานะ ${nodeKey} เป็น ${e.target.checked ? 'ONLINE' : 'OFFLINE'}`]);
                            }}
                            className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold text-slate-200">{nodeKey.replace('Node', '')}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {simMode === 'perimeter' && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">เลือกประเภทแพ็กเก็ตข้อมูล:</span>
                      <select
                        value={selectedPacketType}
                        onChange={(e) => { setSelectedPacketType(e.target.value); setPacketFlowStep(0); }}
                        disabled={activeTransfer}
                        className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="internal">1.3.4.1 เอกสารความลับแผนการเงินภายใน (Internal Confidential)</option>
                        <option value="partner">1.3.4.2 ใบสลิปยอดสั่งพัสดุคู่ค้า VPN (B2B Partner Invoice)</option>
                        <option value="public">1.3.4.3 บล็อกเกอร์โฆษณาสาธารณะ (Public Web Data)</option>
                      </select>
                    </div>
                    <button
                      onClick={handlePerimeterSend}
                      disabled={activeTransfer}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      ส่งข้ามเกตเวย์ (Send Packet)
                    </button>
                  </>
                )}

                <button
                  onClick={handleResetSimulator}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Simulation Frequency Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-slate-500">ปรับความหน่วงวินาที:</span>
                <input
                  type="range"
                  min="600"
                  max="3000"
                  step="400"
                  value={3600 - simulationSpeed}
                  onChange={(e) => setSimulationSpeed(3600 - parseInt(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-indigo-400">{(simulationSpeed / 1000).toFixed(1)}s</span>
              </div>
            </div>

            {/* Dashboard Graphics & Logs panel split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/80">
              
              {/* Graphic SVG Panel (Col 7) */}
              <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
                
                {simMode === 'clientserver' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    <defs>
                      <marker id="serverArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.3)" />
                      </marker>
                      <marker id="serverArrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={isServerCrashed ? '#EF4444' : '#818CF8'} />
                      </marker>
                    </defs>

                    {/* Symmetrical Connector Lines connecting exactly to center points of nodes */}
                    {/* Node A (Client 1) - x:150, y:70. Node B (Client 2) - x:450, y:70. Node C (Client 3) - x:150, y:270. Node D (Client 4) - x:450, y:270 */}
                    {/* Center Server Node - cx: 300, cy: 170 */}
                    <path
                      d="M 150,70 L 300,170"
                      stroke={activeTransfer && !isServerCrashed ? '#818CF8' : isServerCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#serverArrow-active)' : 'url(#serverArrow)'}
                      className={activeTransfer && !isServerCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simulationSpeed / 1000}s` }}
                    />
                    <path
                      d="M 450,70 L 300,170"
                      stroke={activeTransfer && !isServerCrashed ? '#818CF8' : isServerCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#serverArrow-active)' : 'url(#serverArrow)'}
                      className={activeTransfer && !isServerCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simulationSpeed / 1000}s` }}
                    />
                    <path
                      d="M 150,270 L 300,170"
                      stroke={activeTransfer && !isServerCrashed ? '#818CF8' : isServerCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#serverArrow-active)' : 'url(#serverArrow)'}
                      className={activeTransfer && !isServerCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simulationSpeed / 1000}s` }}
                    />
                    <path
                      d="M 450,270 L 300,170"
                      stroke={activeTransfer && !isServerCrashed ? '#818CF8' : isServerCrashed ? '#EF4444' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={activeTransfer ? 'url(#serverArrow-active)' : 'url(#serverArrow)'}
                      className={activeTransfer && !isServerCrashed ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${simulationSpeed / 1000}s` }}
                    />

                    {/* Nodes - Client 1 (Top Left) */}
                    <g transform="translate(90, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 1</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.10</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Nodes - Client 2 (Top Right) */}
                    <g transform="translate(390, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 2</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.11</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Nodes - Central Server (Center) */}
                    <g transform="translate(230, 125)">
                      <rect
                        width="140"
                        height="90"
                        rx="20"
                        fill={isServerCrashed ? '#450A0A' : '#1E1B4B'}
                        stroke={isServerCrashed ? '#EF4444' : '#4F46E5'}
                        strokeWidth="3"
                        className={activeTransfer && !isServerCrashed ? 'animate-pulse' : ''}
                      />
                      <Server className={`w-6 h-6 mx-auto mt-3 ${isServerCrashed ? 'text-rose-500' : 'text-indigo-400'}`} />
                      <text x="70" y="55" textAnchor="middle" fill={isServerCrashed ? '#FCA5A5' : '#E0E7FF'} fontSize="13" fontWeight="bold" fontFamily="sans-serif">MAIN SERVER</text>
                      <text x="70" y="73" textAnchor="middle" fill={isServerCrashed ? '#EF4444' : '#38BDF8'} fontSize="11" fontWeight="bold" fontFamily="mono">192.168.1.254</text>
                    </g>

                    {/* Nodes - Client 3 (Bottom Left) */}
                    <g transform="translate(90, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 3</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.12</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>

                    {/* Nodes - Client 4 (Bottom Right) */}
                    <g transform="translate(390, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">CLIENT 4</text>
                      <text x="60" y="58" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">192.168.1.13</text>
                      <circle cx="15" cy="15" r="5" fill="#22C55E" />
                    </g>
                  </svg>
                )}

                {simMode === 'peertopeer' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    {/* Symmetrical P2P mesh links */}
                    {/* Node A (150, 70), Node B (450, 70), Node C (150, 270), Node D (450, 270) */}
                    <line x1="150" y1="70" x2="450" y2="70" stroke={p2pNodes.NodeA && p2pNodes.NodeB ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="150" y1="70" x2="150" y2="270" stroke={p2pNodes.NodeA && p2pNodes.NodeC ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="150" y1="70" x2="450" y2="270" stroke={p2pNodes.NodeA && p2pNodes.NodeD ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="450" y1="70" x2="150" y2="270" stroke={p2pNodes.NodeB && p2pNodes.NodeC ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="450" y1="70" x2="450" y2="270" stroke={p2pNodes.NodeB && p2pNodes.NodeD ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="150" y1="270" x2="450" y2="270" stroke={p2pNodes.NodeC && p2pNodes.NodeD ? '#10B981' : 'rgba(148, 163, 184, 0.08)'} strokeWidth="2" strokeDasharray="4 4" />

                    {/* Active File Packet Path (A to C or secondary route) */}
                    {activeTransfer && (
                      <path
                        d={p2pNodes.NodeA && p2pNodes.NodeC ? 'M 150,70 L 150,270' : 'M 150,70 L 450,70 L 450,270 L 150,270'}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        className="animate-flow-dash"
                        style={{ '--flow-anim-speed': `${simulationSpeed / 1000}s` }}
                      />
                    )}

                    {/* Node A */}
                    <g transform="translate(90, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke={p2pNodes.NodeA ? '#10B981' : '#EF4444'} strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE A</text>
                      <text x="60" y="58" textAnchor="middle" fill={p2pNodes.NodeA ? '#10B981' : '#EF4444'} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                        {p2pNodes.NodeA ? 'ONLINE' : 'CRASHED'}
                      </text>
                      <circle cx="15" cy="15" r="5" fill={p2pNodes.NodeA ? '#22C55E' : '#EF4444'} />
                    </g>

                    {/* Node B */}
                    <g transform="translate(390, 30)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke={p2pNodes.NodeB ? '#10B981' : '#EF4444'} strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE B</text>
                      <text x="60" y="58" textAnchor="middle" fill={p2pNodes.NodeB ? '#10B981' : '#EF4444'} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                        {p2pNodes.NodeB ? 'ONLINE' : 'CRASHED'}
                      </text>
                      <circle cx="15" cy="15" r="5" fill={p2pNodes.NodeB ? '#22C55E' : '#EF4444'} />
                    </g>

                    {/* Node C */}
                    <g transform="translate(90, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke={p2pNodes.NodeC ? '#10B981' : '#EF4444'} strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE C</text>
                      <text x="60" y="58" textAnchor="middle" fill={p2pNodes.NodeC ? '#10B981' : '#EF4444'} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                        {p2pNodes.NodeC ? 'ONLINE' : 'CRASHED'}
                      </text>
                      <circle cx="15" cy="15" r="5" fill={p2pNodes.NodeC ? '#22C55E' : '#EF4444'} />
                    </g>

                    {/* Node D */}
                    <g transform="translate(390, 230)">
                      <rect width="120" height="80" rx="16" fill="#1E293B" stroke={p2pNodes.NodeD ? '#10B981' : '#EF4444'} strokeWidth="2" />
                      <text x="60" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">NODE D</text>
                      <text x="60" y="58" textAnchor="middle" fill={p2pNodes.NodeD ? '#10B981' : '#EF4444'} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                        {p2pNodes.NodeD ? 'ONLINE' : 'CRASHED'}
                      </text>
                      <circle cx="15" cy="15" r="5" fill={p2pNodes.NodeD ? '#22C55E' : '#EF4444'} />
                    </g>
                  </svg>
                )}

                {simMode === 'perimeter' && (
                  <svg width="600" height="340" viewBox="0 0 600 340" className="w-full max-w-[480px]">
                    <defs>
                      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* concentric Venn boundaries representing Intranet, Extranet, Internet */}
                    {/* Zone 1: Intranet (Left Circle) */}
                    <circle cx="180" cy="170" r="120" fill="none" stroke="rgba(79, 70, 229, 0.2)" strokeWidth="4" />
                    <text x="100" y="80" fill="rgba(79, 70, 229, 0.6)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">INTRANET ZONE</text>
                    
                    {/* Zone 2: Extranet (Middle Loop) */}
                    <rect x="230" y="60" width="140" height="220" rx="30" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="4" />
                    <text x="300" y="85" textAnchor="middle" fill="rgba(6, 182, 212, 0.6)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">EXTRANET</text>

                    {/* Zone 3: Internet (Right Loop) */}
                    <circle cx="420" cy="170" r="120" fill="none" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="4" />
                    <text x="490" y="80" textAnchor="end" fill="rgba(244, 63, 94, 0.5)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">INTERNET ZONE</text>

                    {/* Center Gateway / Firewall (Symmetrical x = 300) */}
                    <g transform="translate(275, 120)">
                      <rect width="50" height="100" rx="12" fill="url(#shieldGrad)" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                      <Shield className="w-6 h-6 text-white mx-auto mt-6 animate-pulse" />
                      <text x="25" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">GATEWAY</text>
                    </g>

                    {/* Dynamic Packet Path Animation */}
                    {activeTransfer && packetFlowStep === 1 && (
                      <circle cx="160" cy="170" r="8" fill="#F59E0B" className="animate-ping" />
                    )}

                    {/* Final state */}
                    {packetFlowStep === 2 && selectedPacketType === 'internal' && (
                      <>
                        <path d="M 160,170 H 265" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="5 5" />
                        <circle cx="265" cy="170" r="8" fill="#EF4444" />
                        <XCircle className="w-5 h-5 text-rose-500" x="255" y="125" />
                      </>
                    )}

                    {packetFlowStep === 2 && selectedPacketType === 'partner' && (
                      <>
                        <path d="M 160,170 H 300 H 350" fill="none" stroke="#22C55E" strokeWidth="3" />
                        <circle cx="350" cy="170" r="8" fill="#22C55E" />
                        <Check className="w-5 h-5 text-emerald-500" x="340" y="125" />
                      </>
                    )}

                    {packetFlowStep === 2 && selectedPacketType === 'public' && (
                      <>
                        <path d="M 160,170 H 450" fill="none" stroke="#38BDF8" strokeWidth="3" />
                        <circle cx="450" cy="170" r="8" fill="#38BDF8" />
                        <Check className="w-5 h-5 text-sky-500" x="440" y="125" />
                      </>
                    )}
                  </svg>
                )}

              </div>

              {/* Console Logs Panel (Col 5) */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800/80">
                <ConsoleScreen
                  title="ระบบตรวจสอบทราฟฟิกแพ็กเก็ตเครือข่าย"
                  output={transferLog.join('\n')}
                  height="h-[380px]"
                />
              </div>

            </div>

            {/* Bottom Progress Bar Panel */}
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

          {/* Academic Table Comparison Matrix */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-800">
                ตารางวิเคราะห์เปรียบเทียบสถาปัตยกรรมเครือข่ายเชิงปฏิบัติการ
              </h3>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white/60 backdrop-blur-xl">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">หัวข้อการเปรียบเทียบ</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Client-Server Architecture</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">Peer-to-Peer Architecture</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-sans text-sm text-slate-700">
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">ศูนย์กลางการควบคุม</td>
                    <td className="px-6 py-4">รวมศูนย์กลาง (Centralized) ควบคุมสิทธิ์ทั้งหมดผ่านทางเครื่องแม่ข่าย</td>
                    <td className="px-6 py-4">กระจายศูนย์กลาง (Decentralized) แต่ละเครื่องมีฐานะเท่าเทียมกันเป็นทั้งลูกข่ายและแม่ข่าย</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">การติดตั้งและดูแลระบบ</td>
                    <td className="px-6 py-4">ซับซ้อนสูง ต้องพึ่งพาผู้ดูแลระบบเฉพาะทาง (Network Administrator)</td>
                    <td className="px-6 py-4">ง่ายมาก ผู้ใช้ทั่วไปสามารถจัดสายแลนต่อกันเองได้ทันที</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">จุดล้มเหลวเดี่ยว (SPOF)</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">มี (เซิร์ฟเวอร์ล่ม บริการทั้งหมดจะหยุดชะงัก)</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ไม่มี (โหนดหนึ่งล่ม โหนดที่เหลือยังสื่อสารแลกเปลี่ยนกันได้ปกติ)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">ประสิทธิภาพเมื่อเครื่องลูกเพิ่มขึ้น</td>
                    <td className="px-6 py-4">อาจติดขัด (Bottleneck) หากมีโหนดเข้ามาดึงไฟล์พร้อมๆ กันจำนวนมหาศาล</td>
                    <td className="px-6 py-4">เสถียรยิ่งขึ้น ยิ่งมีคนช่วยปล่อยไฟล์มาก สปีดการแชร์จะยิ่งทวีความเร็ว</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">ความมั่นคงปลอดภัยขั้นสูง</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">ดีเยี่ยม ป้องกันข้อมูลด้วยนโยบาย Domain, Firewall, Active Directory</td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">ต่ำ ควบคุมความปลอดภัยของสิทธิ์ข้ามเครื่องได้ยาก เสี่ยงไวรัสข้ามวง</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-slate-800">ต้นทุนการติดตั้งแรกเริ่ม</td>
                    <td className="px-6 py-4">สูงมาก (ค่าใบอนุญาต OS Server, ฮาร์ดแวร์แม่ข่ายเฉพาะชิ้น)</td>
                    <td className="px-6 py-4">ต่ำ (พึ่งพาเฉพาะสายแลนและเครื่องพีซีส่วนตัวปกติที่ใช้งานอยู่เดิม)</td>
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
              ทบทวนขีดความสามารถการจำแนกขนาดและสถาปัตยกรรมความมั่นคงปลอดภัยของเครือข่ายคอมพิวเตอร์ 
              ตอบคำถามระดับวิชาชีพ 5 ข้อด้านล่างเพื่อประเมินความพร้อมสู่การทำงานจริงในสนามอุตสาหกรรมอัจฉริยะ:
            </p>
          </div>

          {/* Gamified Quiz Engine */}
          <QuizEngine
            title="เกมทดสอบ: สถาปนิกและผู้คัดกรองสัญญาณเครือข่าย"
            description="วิเคราะห์สถานการณ์เพื่อเลือกประเภทโครงสร้างและแนวทางความปลอดภัยที่ถูกต้องที่สุด"
            levels={[
              {
                title: 'โจทย์ที่ 1: การจำแนกประเภทตามระยะทาง',
                desc: 'โรงเรียนต้องการเชื่อมโยงห้องปฏิบัติการคอมพิวเตอร์ 2 ห้องที่อยู่ในตึกเรียนเดียวกัน ระยะทางห่างกันประมาณ 50 เมตร สื่อกลางเป็นสายแลน UTP ถือเป็นเครือข่ายขนาดใด?',
                options: [
                  { key: 'A', text: 'PAN (Personal Area Network)', isCorrect: false },
                  { key: 'B', text: 'LAN (Local Area Network)', isCorrect: true },
                  { key: 'C', text: 'MAN (Metropolitan Area Network)', isCorrect: false },
                  { key: 'D', text: 'WAN (Wide Area Network)', isCorrect: false }
                ],
                tip: 'เครือข่ายเฉพาะภายในอาคารหรือตึกเดียวกัน ระยะไม่เกิน 1 กิโลเมตร ถือเป็นระดับท้องถิ่น'
              },
              {
                title: 'โจทย์ที่ 2: วิกฤตจุดล้มเหลวเดี่ยว (SPOF)',
                desc: 'หากบริษัทนำเสนอระบบจัดเก็บคลาวด์แชร์ข้อมูลโดยใช้เครื่องเก็บข้อมูล NAS ตัวหลักเพียงตัวเดียว และระบบขัดข้องล่มลง ส่งผลให้พนักงานทุกคนไม่สามารถทำงานต่อได้ ลักษณะปัญหานี้สอดคล้องกับคุณสมบัติใด?',
                options: [
                  { key: 'A', text: 'การชนกันของทราฟฟิกบัส (Bus Collision)', isCorrect: false },
                  { key: 'B', text: 'ความปลอดภัยระบบไร้สายบกพร่อง (Wireless Defect)', isCorrect: false },
                  { key: 'C', text: 'จุดล้มเหลวเดี่ยว (Single Point of Failure - SPOF)', isCorrect: true },
                  { key: 'D', text: 'การกระจายข้อมูลเท่าเทียมกัน (Decentralized Path)', isCorrect: false }
                ],
                tip: 'เมื่อการล่มสลายของจุดศูนย์กลางจุดเดียวส่งผลกระทบต่อทั้งระบบ เรียกว่า Single Point of Failure'
              },
              {
                title: 'โจทย์ที่ 3: สถาปัตยกรรมเครือข่ายแบบ Peer-to-Peer',
                desc: 'ข้อใดคือข้อดีสำคัญของการเลือกใช้ระบบแชร์ไฟล์ P2P (เช่น BitTorrent) เมื่อเทียบกับระบบดาวน์โหลดผ่านเซิร์ฟเวอร์หลักเชิงธุรกิจ?',
                options: [
                  { key: 'A', text: 'ผู้ดูแลระบบสามารถควบคุมนโยบายความมั่นคงปลอดภัยแบบรวมศูนย์ได้ดีกว่า', isCorrect: false },
                  { key: 'B', text: 'ไม่มีความเสี่ยงต่อมัลแวร์แพร่กระจายตัวข้ามเครื่องคอมพิวเตอร์', isCorrect: false },
                  { key: 'C', text: 'ต้นทุนเริ่มแรกในการซื้อเครื่องแม่ข่ายพรีเมียมราคาแพงสูงขึ้น', isCorrect: false },
                  { key: 'D', text: 'ไม่มีจุดล้มเหลวเดี่ยว และแบนด์วิดท์ยิ่งดีขึ้นเมื่อจำนวนผู้ปล่อยไฟล์มากขึ้น', isCorrect: true }
                ],
                tip: 'ระบบ Peer-to-Peer กระจายภาระงานแชร์ทำให้ระบบทนทานต่อการล่มและดึงความเร็วได้ดีเยี่ยม'
              },
              {
                title: 'โจทย์ที่ 4: ความปลอดภัยระดับขอบเขต (Perimeter Security)',
                desc: 'บริษัทห้างร้านขนาดใหญ่จำยอมต้องการให้ "คู่ค้าจัดจำหน่ายภายนอก (Vendors)" สามารถเข้าถึงตารางสต็อกสินค้ารายวันได้ แต่ห้ามเข้าถึงข้อมูลการจ่ายภาษีและบัญชีลับส่วนตัวของพนักงาน ควรจัดระเบียบโครงสร้างความปลอดภัยนี้ในขอบเขตใด?',
                options: [
                  { key: 'A', text: 'เครือข่ายส่วนตัวภายใน (Intranet Zone)', isCorrect: false },
                  { key: 'B', text: 'เครือข่ายกึ่งภายนอกสำหรับคู่ค้า (Extranet Zone)', isCorrect: true },
                  { key: 'C', text: 'เครือข่ายสาธารณะเสรีไร้ขอบเขต (Internet Zone)', isCorrect: false },
                  { key: 'D', text: 'เครือข่ายเฉพาะบุคคล (PAN Zone)', isCorrect: false }
                ],
                tip: 'เครือข่ายกึ่งโปร่งใสที่ยินยอมให้บุคคลภายนอกที่ได้รับอนุมัติเฉพาะชิ้นผ่าน VPN เข้ามา เรียกว่า Extranet'
              },
              {
                title: 'โจทย์ที่ 5: สถาปัตยกรรมการเชื่อมต่อของธนาคารข้ามประเทศ',
                desc: 'ระบบสัญญารับส่งยอดตู้ ATM ข้ามจังหวัด หรือการทำรายการธุรกรรมตัดบัตรเครดิตระหว่างประเทศไทยกับสหรัฐอเมริกา ต้องประสานการทำรายการผ่านประเภทเครือข่ายขนาดพื้นที่ข้อใด?',
                options: [
                  { key: 'A', text: 'PAN (Personal Area Network)', isCorrect: false },
                  { key: 'B', text: 'LAN (Local Area Network)', isCorrect: false },
                  { key: 'C', text: 'MAN (Metropolitan Area Network)', isCorrect: false },
                  { key: 'D', text: 'WAN (Wide Area Network)', isCorrect: true }
                ],
                tip: 'โครงข่ายเชื่อมข้อมูลระดับข้ามรัฐ ข้ามประเทศ ข้ามมหาสมุทร ถือเป็นขอบเขตบริเวณกว้าง (Wide)'
              }
            ]}
            accentColor="from-blue-500/20 to-indigo-500/20"
            icon={<Network className="w-8 h-8 text-indigo-400" />}
          />

          {/* Consolidated Written Assessment (TeacherTask) */}
          <TeacherTask
            title="ภารกิจประจำหน่วย 1.3: ออกแบบสถาปัตยกรรมและระดับสิทธิ์ความมั่นคงปลอดภัยสำหรับระบบไอทีองค์กร"
            taskText={`วิเคราะห์สถานการณ์เพื่อตอบคำถามลงใบงานให้ครบถ้วนทุกข้อการวิเคราะห์:
1. ให้เปรียบเทียบระยะทางความกว้างของ PAN, LAN, MAN, WAN และระบุว่าระบบสถิติกดบัตรเข้าคิวโรงพยาบาลควรจัดอยู่ในประเภทใด
2. อธิบายความหมายและวิกฤตของ Single Point of Failure (SPOF) ที่มักเกิดขึ้นใน Client-Server พร้อมเสนอแนวทางการลดความเสี่ยง 1 แนวทาง
3. ให้เปรียบเทียบข้อดี-ข้อเสียของสถาปัตยกรรมแบบ Peer-to-Peer เมื่อองค์กรนำมาใช้จัดระเบียบสตรีมไฟล์ขนาดใหญ่ในเครือข่าย
4. จำแนกขอบเขตระหว่าง Intranet, Extranet, Internet และอธิบายความแตกต่างในการคัดกรองข้อมูลของระบบเกตเวย์ความปลอดภัย`}
          />

        </section>

      </main>
    </>
  );
}
