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
  RefreshCw,
  BarChart2,
  Thermometer,
  ShoppingBag,
  Eye,
  TrendingUp,
  Info
} from 'lucide-react';
import {
  AmbientBackdrop,
  OptionSelector,
  ConsoleScreen,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function IT1_1() {
  // ────────────────────────────────────────────────────────────────────────
  // STATE DEFINITIONS
  // ────────────────────────────────────────────────────────────────────────

  // --- 1.1.1: เสาหลัก 4 ประการ ---
  const [selectedPillar, setSelectedPillar] = useState('hardware');

  // --- 1.1.1: ตัวจำลองการทำงานเมนบอร์ด (RAM -> CPU -> SSD) ---
  const [motherboardStep, setMotherboardStep] = useState(0);
  const [motherboardLogs, setMotherboardLogs] = useState([
    'System ready. Waiting for transaction process request...'
  ]);
  const [isMbRunning, setIsMbRunning] = useState(false);

  // --- 1.1.1: ภาคธุรกิจและ Stepper ---
  const [selectedSector, setSelectedSector] = useState('retail');

  // --- 1.1.2: ตัวจำลองหน่วยการทำงานทั้ง 4 (Data Flow Simulator) ---
  const [selectedScenario, setSelectedScenario] = useState('checkout');
  const [flowActive, setFlowActive] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [flowSpeed, setFlowSpeed] = useState(1500); // ms per step
  const [scenarioLogs, setScenarioLogs] = useState([
    '[SYSTEM] Ready. Select a scenario and press PLAY to visualize the 4-Unit Data Flow.'
  ]);

  // --- 1.1.3: ตัวจำลองระบบซอฟต์แวร์ 4 เลเยอร์ (4-Layer Software Stack Simulator) ---
  const [selectedScenarioSW, setSelectedScenarioSW] = useState('compression');
  const [flowActiveSW, setFlowActiveSW] = useState(false);
  const [flowStepSW, setFlowStepSW] = useState(0);
  const [flowSpeedSW, setFlowSpeedSW] = useState(1500); // ms per step
  const [scenarioLogsSW, setScenarioLogsSW] = useState([
    '[SYSTEM] Ready. Select a software operation scenario and press PLAY to visualize the 4-Layer translation.'
  ]);

  // --- 1.1.4: เครื่องจำลองการส่งต่อภาระงานด้านไอทีในองค์กร (Organizational IT Workflow Simulator) ---
  const [selectedScenarioPW, setSelectedScenarioPW] = useState('dbCrash');
  const [flowActivePW, setFlowActivePW] = useState(false);
  const [flowStepPW, setFlowStepPW] = useState(0);
  const [flowSpeedPW, setFlowSpeedPW] = useState(1500); // ms per step
  const [scenarioLogsPW, setScenarioLogsPW] = useState([
    '[ระบบ] สภาพแวดล้อมพร้อมใช้งาน กรุณาเลือกสถานการณ์และกดปุ่มจำลอง เพื่อดูการส่งต่อภาระงานของบุคลากรคอมพิวเตอร์'
  ]);

  // --- 1.1.5 & 1.1.6: เครื่องจำลองการประมวลผลและการตัดสินใจ (Data-to-Information Decision Simulator) ---
  const [selectedScenarioDI, setSelectedScenarioDI] = useState('sentiment');
  const [flowActiveDI, setFlowActiveDI] = useState(false);
  const [flowStepDI, setFlowStepDI] = useState(0);
  const [flowSpeedDI, setFlowSpeedDI] = useState(1500); // ms per step
  const [scenarioLogsDI, setScenarioLogsDI] = useState([
    '[ระบบ] ระบบพร้อมทำงาน กรุณาเลือกสถานการณ์และกด PLAY เพื่อเริ่มวงจรประมวลผลข้อมูล'
  ]);

  // --- 1.1.7: สภาพแวดล้อมจำลองอุตสาหกรรม 4.0 (Industry 4.0 Smart Factory Visualizer) ---
  const [selectedPillar4, setSelectedPillar4] = useState('iiot');
  const [isFactorySimulating, setIsFactorySimulating] = useState(false);
  const [factoryTicks, setFactoryTicks] = useState(0);
  const [factoryData, setFactoryData] = useState({
    boilerPressure: 120, // psi
    conveyorSpeed: 150,  // rpm
    armAngle: 0,         // degrees
    motorTemp: 52,       // °C
    motorHealth: 98      // %
  });

  // ────────────────────────────────────────────────────────────────────────
  // DATA CONFIGURATIONS
  // ────────────────────────────────────────────────────────────────────────

  // เสาหลัก 4 ประการ (1.1.1)
  const pillars = [
    {
      id: 'hardware',
      title: 'ฮาร์ดแวร์ (Hardware)',
      en: 'Physical Components',
      desc: 'องค์ประกอบทางกายภาพและอุปกรณ์อิเล็กทรอนิกส์ที่จับต้องได้ของระบบคอมพิวเตอร์ ทำหน้าที่รับข้อมูล ประมวลผล จัดเก็บ และแสดงผลลัพธ์',
      color: 'indigo',
      icon: Cpu,
      examples: ['หน่วยประมวลผลกลาง (CPU)', 'หน่วยความจำชั่วคราว (RAM)', 'อุปกรณ์บันทึกข้อมูล (SSD)', 'แผงวงจรหลัก (Motherboard)']
    },
    {
      id: 'software',
      title: 'ซอฟต์แวร์ (Software)',
      en: 'Instruction Sets',
      desc: 'โปรแกรม ชุดคำสั่ง หรือกฎเกณฑ์คอมพิวเตอร์ที่เขียนขึ้นเพื่อควบคุมการสั่งงานฮาร์ดแวร์และประมวลผลแอปพลิเคชันตามตรรกะที่กำหนด',
      color: 'cyan',
      icon: Layers,
      examples: ['ระบบปฏิบัติการ (Windows, Linux)', 'ซอฟต์แวร์ประยุกต์ (Web Browser, Office)', 'ไดรเวอร์ควบคุม (Device Drivers)', 'โปรแกรมอรรถประโยชน์ (Utility Programs)']
    },
    {
      id: 'peopleware',
      title: 'บุคลากร (Peopleware)',
      en: 'Human Resource',
      desc: 'บุคลากรในสาขาคอมพิวเตอร์และผู้ใช้งานทั่วไป ซึ่งมีความรู้ความเข้าใจในการควบคุม พัฒนา หรือใช้คอมพิวเตอร์อย่างมีตรรกะ',
      color: 'emerald',
      icon: User,
      examples: ['นักเขียนโปรแกรม (Programmer)', 'นักวิเคราะห์ระบบ (System Analyst)', 'วิศวกรเครือข่าย (Network Engineer)', 'ผู้ใช้งานปลายทาง (End-User)']
    },
    {
      id: 'data',
      title: 'ข้อมูลและสารสนเทศ (Data & Information)',
      en: 'Input & Processed Insights',
      desc: 'วัตถุดิบนำเข้า (Raw Data) เช่น ข้อความ ตัวเลข หรือรูปภาพ และผลผลิตประมวลผล (Information) ที่ใช้ตัดสินใจทางธุรกิจ',
      color: 'amber',
      icon: Database,
      examples: ['ข้อมูลดิบการขายปลีก', 'ภาพถ่ายสินค้าบนสายพาน', 'รายงานผลประกอบการไตรมาส', 'สถิติสแกนเวลาเข้างาน']
    }
  ];

  // ภาคธุรกิจและขั้นตอนประยุกต์ (1.1.1)
  const businessSectors = {
    retail: {
      title: 'ภาคการค้าปลีกและออนไลน์ (Smart Retail & E-Commerce)',
      desc: 'การใช้คอมพิวเตอร์วิเคราะห์ข้อมูลสต็อกและยอดขายแบบเรียลไทม์ เพื่อให้ธุรกิจจัดส่งสินค้าได้รวดเร็วและตรงความต้องการผู้ซื้อ',
      steps: [
        { title: 'บันทึกบาร์โค้ด', text: 'เครื่องสแกนบาร์โค้ดสแกนรหัสสินค้าที่ชำระเงิน นำเข้าค่ารหัสผ่านสายสัญญาณ' },
        { title: 'ดึงข้อมูลสินค้า', text: 'CPU ประมวลผลคำสั่งดึงข้อมูลราคาสินค้าจากฐานข้อมูลในแรมและบันทึกแฟ้มดิสก์' },
        { title: 'หักสต็อกอัตโนมัติ', text: 'ระบบหักยอดคงเหลือสินค้าในสต็อกทันที เพื่อป้องกันสินค้าขาดแคลนหรือตกค้าง' },
        { title: 'ออกใบเสร็จส่งอีเมล', text: 'ส่งข้อมูลออกผ่านเครื่องพิมพ์ใบเสร็จ และส่งอีเมลยืนยันการขายแก่ลูกค้าทันที' }
      ]
    },
    finance: {
      title: 'ภาคการเงินอัจฉริยะ (FinTech & Security)',
      desc: 'การป้องกันการฉ้อโกงและตรวจสอบประวัติการทำธุรกรรมด้วยตรรกะคอมพิวเตอร์ความเร็วสูงแบบเรียลไทม์เพื่อความปลอดภัยสูงสุด',
      steps: [
        { title: 'ส่งคำขอทำรายการ', text: 'ผู้ใช้งานระบุรหัสธุรกรรมและยอดโอนผ่านสมาร์ตโฟนเพื่อส่งเข้าระบบส่งข้อมูล' },
        { title: 'ตรวจสอบสิทธิ์ตรรกะ', text: 'ระบบหักบัตรสากลตรวจสอบความถูกต้องของลายเซ็นดิจิทัลและการมีอยู่ของบัญชี' },
        { title: 'บันทึกประวัติการโอน', text: 'เขียนบันทึกประวัติธุรกรรม (Transaction Log) ลงบนระบบจัดเก็บข้อมูลกระจายศูนย์' },
        { title: 'อัปเดตสถานะยอดเงิน', text: 'แสดงผลลัพธ์ผ่านหน้าจอและส่งสัญญาณข้อความยืนยันธุรกรรม (SMS) ทันที' }
      ]
    },
    logistics: {
      title: 'ภาคโลจิสติกส์การขนส่ง (Smart Logistics)',
      desc: 'การควบคุมทิศทางและการขนส่งโดยพึ่งพาระบบพิกัดภูมิศาสตร์และการประมวลผลเส้นทางที่สิ้นเปลืองพลังงานและเวลาน้อยที่สุด',
      steps: [
        { title: 'ปักพิกัดต้นทาง-ปลายทาง', text: 'รับข้อมูลพิกัด GPS ปัจจุบันและจุดรับสินค้าปลายทางเข้าสู่ระบบบอร์ดคอมพิวเตอร์' },
        { title: 'คำนวณเส้นทางสั้นสุด', text: 'CPU ประมวลผลอัลกอริทึมเลือกเส้นทางที่ดีที่สุดตามพิกัดและการจราจรเรียลไทม์' },
        { title: 'จัดแจงคิวรถส่งของ', text: 'บันทึกตารางกำหนดเวลาขนส่งลงระบบจัดเก็บ เพื่อระบุคิวพนักงานขับรถส่งสินค้า' },
        { title: 'แสดงเส้นทางการวิ่ง', text: 'ส่งข้อมูลเส้นทางขึ้นหน้าจอคอนโซลรถและแผนที่ติดตามรถแบบเรียลไทม์' }
      ]
    }
  };

  // 1.1.2: สถานการณ์จำลอง Data Flow ทั้ง 4
  const scenarios = {
    checkout: {
      title: 'ระบบชำระเงินอัจฉริยะ (Smart POS Checkout)',
      description: 'จำลองขั้นตอนการประมวลผลเมื่อแคชเชียร์ทำการสแกนบาร์โค้ดเพื่อคำนวณราคาและบันทึกประวัติการชำระเงินของลูกค้า',
      inputName: 'เครื่องสแกนบาร์โค้ด (Barcode Scanner)',
      inputDetails: 'แปลงรหัสสะท้อนแสงเลเซอร์เป็นชุดสัญญาณข้อมูลดิจิทัล',
      processName: 'หน่วยประมวลผล (CPU-ALU)',
      processDetails: 'ค้นหาฐานข้อมูล คิดราคารวมและคำนวณลด 10% ของสมาชิก',
      storageName: 'หน่วยความจำและดิสก์ (RAM & SSD)',
      storageDetails: 'RAM พักยอดซื้อชั่วคราว; SSD เขียนประวัติรายการถาวร',
      outputName: 'หน้าจอ & เครื่องพิมพ์ (Screen & Printer)',
      outputDetails: 'แสดงยอดเงินสุทธิบนจอสี และขับหัวพิมพ์ใบเสร็จทางกายภาพ',
      logs: [
        '[INPUT] เครื่องสแกนตรวจพบแสงสะท้อนบาร์โค้ด แปลงรหัสบาร์โค้ด "885123456789" เป็นบิตไฟฟ้า 0 และ 1 ส่งผ่านสาย USB เข้ามายังระบบ.',
        '[PROCESS] CPU (CU) ต้อนรับชุดบิตคำสั่งเข้าสู่รีจิสเตอร์ และสั่งการให้หน่วยคำนวณ (ALU) เปรียบเทียบรหัสกับฐานข้อมูลและคำนวณส่วนลดสมาชิก 10% จากยอดซื้อ 200 บาท เหลือ 180 บาท.',
        '[STORAGE] ระบบทำการพักตัวแปรยอดคำนวณ 180 บาทลงในสแต็กแรม (RAM) พร้อมเขียนบันทึกประวัติธุรกรรมยอดชำระเงินชิ้นนี้เก็บถาวรลงในฐานข้อมูลบน SSD.',
        '[OUTPUT] คอนโทรลเลอร์ขับสัญญาณส่งพิกเซลสีแสดงผล "SUCCESS: 180 THB" บนหน้าจอ พร้อมส่งพัลส์ไฟฟ้าสั่งมอเตอร์ขับเครื่องพิมพ์ให้พ่นน้ำหมึกพิมพ์ใบเสร็จออกมาสำเร็จ.'
      ]
    },
    face: {
      title: 'ระบบ AI บันทึกเวลาด้วยใบหน้า (AI Face Attendance)',
      description: 'จำลองขั้นตอนการประมวลผลเมื่อกล้องวงจรปิดทำการสแกนตรวจจับใบหน้าพนักงานเพื่อเปรียบเทียบตารางลงเวลาทำงาน',
      inputName: 'กล้องวงจรปิด UHD (Camera Sensor)',
      inputDetails: 'แปลงระดับแสงสีพิกเซลเลนส์ภาพให้เป็นโครงข่ายเมทริกซ์ดิจิทัล',
      processName: 'หน่วยประมวลผล (CPU-Neural Engine)',
      processDetails: 'ประมวลผลโมเดลโครงข่ายประสาทเทียมเพื่อจับพิกัดโครงสร้างรูปหน้า',
      storageName: 'หน่วยความจำและดิสก์ (RAM & SSD)',
      storageDetails: 'RAM ดึงเวกเตอร์ฐานข้อมูลพนักงาน; SSD อัปเดตประวัติการสแกนเข้า',
      outputName: 'หน้าจอบอกสถานะ & ลำโพง (Display & Speaker)',
      outputDetails: 'แสดงผลกรอบสีเขียวล้อมรูปหน้าพร้อมข้อความ "APPROVED: SOMCHAI" และขับสัญญาณเสียงต้อนรับ',
      logs: [
        '[INPUT] เลนส์เซนเซอร์กล้องรับภาพโครงสร้างแสงธรรมชาติ แปลงสัญญาณแสงเป็นรหัสเมทริกซ์ 0, 1 ของช่องสี RGB ขนาดความละเอียดสูงส่งเข้าระบบ.',
        '[PROCESS] หน่วยประมวลผลประสาทเทียมใน CPU ทำการคำนวณจุดเวกเตอร์ระยะห่างใบหน้า (ดวงตา จมูก ปาก) เทียบกับพิกัดโครงสร้างพนักงานเป้าหมายตามอัลกอริทึม.',
        '[STORAGE] ระบบใช้ RAM ดึงชุดเวกเตอร์ใบหน้าพนักงานอ้างอิงขึ้นมาตรวจสอบ เมื่อพบพิกัดตรงกัน จึงเขียนบันทึกเวลาสแกนเข้างาน (นายสมชาย, เวลา 08:00 น.) ลงแฟ้มข้อมูลถาวรบน SSD.',
        '[OUTPUT] คอนโทรลเลอร์สั่งควบคุมขอบหน้าต่าง UI แสดงผลเป็นกรอบสีเขียวล้อมรูปหน้าพร้อมข้อความ "APPROVED: SOMCHAI" และขับกระแสไฟลำโพงให้ปล่อยเสียงเตือน Chime ยืนยัน.'
      ]
    },
    sorting: {
      title: 'ระบบสายพานคัดแยกพัสดุ (Smart Conveyor Sorter)',
      description: 'จำลองขั้นตอนเมื่อเซนเซอร์ตรวจจับขนาดและน้ำหนักของพัสดุเพื่อประมวลคำสั่งควบคุมแขนกลให้คัดแยกกล่องออกปลายทาง',
      inputName: 'เซนเซอร์เลเซอร์วัดพิกัด (Laser Rangefinder)',
      inputDetails: 'แปลงระยะการสะท้อนสะสมของแสงวัดความยาวกล่องเป็นบิตข้อมูล',
      processName: 'หน่วยประมวลผล (CPU-Control Logic)',
      processDetails: 'ตรวจสอบตรรกะเปรียบเทียบเงื่อนไข: ความยาว > 80 ซม. หรือไม่',
      storageName: 'หน่วยความจำและดิสก์ (RAM & SSD)',
      storageDetails: 'RAM บันทึกคิวตำแหน่งสายพาน; SSD บันทึกประวัติสถิติการคัดแยก',
      outputName: 'หน้าจอกล้อง & แขนกลคัดแยก (Monitor & Actuator Arm)',
      outputDetails: 'แสดงสถานะเตือนกล่องพัสดุเกินขนาด และขับกำลังไฟแขนกลคัดแยกออก',
      logs: [
        '[INPUT] เซนเซอร์เลเซอร์และเครื่องชั่งน้ำหนักตรวจจับตำแหน่งการผ่านของกล่องพัสดุ แปลงความเข้มสัญญาณตรรกะเป็นความยาว 85 ซม. ส่งเข้าพอร์ตไมโครคอนโทรลเลอร์.',
        '[PROCESS] CPU นำค่า 85 ซม. ไปเข้าลอจิกเปรียบเทียบใน ALU: (ความยาว > 80 ซม.?) ผลลัพธ์สมมติฐานคำนวณได้เป็น TRUE (พัสดุเกินขนาดมาตรฐาน).',
        '[STORAGE] ระบบทำการระบุรหัสตำแหน่งของพัสดุลงบนแถวคิวงาน (RAM Queue) พร้อมทั้งบันทึกรายงานสถิติตัวแปรพัสดุประเภทพิเศษนี้ลงในไฟล์สรุปรายงานประจำสัปดาห์บน SSD.',
        '[OUTPUT] คอนโทรลเลอร์ขับกำลังไฟฟ้ากระแสสูงไปยังมอเตอร์แขนกล (Actuator) ให้กางแกนแยกพัสดุกล่องยาวออกนอกเส้นทางสายพานหลัก พร้อมแสดงคำเตือน "OVERSIZED" บนจอมอนิเตอร์.'
      ]
    }
  };

  // 1.1.3: สถานการณ์จำลอง 4-Layer Software Stack
  const scenariosSW = {
    compression: {
      title: 'การบีบอัดและรักษาข้อมูลไฟล์ (Data Compression Utility)',
      description: 'จำลองขั้นตอนเมื่อผู้ใช้ต้องการย่อขนาดไฟล์งานโดยพึ่งพายูทิลิตี้ลดขนาดพื้นที่เพื่อเตรียมจัดเก็บ',
      userAction: 'เปิดแอปพลิเคชัน 7-Zip และกด "บีบอัดไฟล์"',
      appName: '7-Zip File Archiver',
      appDetails: 'แอปพลิเคชันเฉพาะงานประทับตรา GUI รับคำสั่งผู้ใช้',
      systemName: 'Deflate Algorithm & OS',
      systemDetails: 'โปรแกรมยูทิลิตี้ลดพื้นที่ และ OS จัดคิวจัดสรรแรม',
      hardwareName: 'CPU & SSD Storage',
      hardwareDetails: 'CPU ประมวลคำสั่งเลขฐาน และ SSD บันทึกไฟล์ถาวร',
      logs: [
        '[USER] ผู้ใช้งานคลิกเลือกไฟล์งานแล้วกดคลิกคำสั่งบีบอัด (Compress File) บนอินเตอร์เฟสโปรแกรม 7-Zip.',
        '[APPLICATION] แอปประยุกต์ 7-Zip รับรู้การสั่งงาน และเรียกใช้งาน API ระบบปฏิบัติการเพื่อดึงข้อมูลบล็อกไฟล์เข้าจัดเตรียมในบัฟเฟอร์.',
        '[SYSTEM & UTILITY] โปรแกรมยูทิลิตี้คำนวณรหัสบีบอัด (LZMA/Deflate) ทำงานร่วมกับระบบปฏิบัติการในการขอกำหนดตำแหน่งจัดสรรหน่วยความจำแรม (RAM Space) และจัดลำดับกระบวนการประมวลผล.',
        '[HARDWARE] ชิปวงจร CPU ประมวลผลเลขฐานสิบคำนวณการย่อขนาดไฟล์ และส่งคำสั่งควบคุมให้คอนโทรลเลอร์จัดเก็บ NVMe SSD เขียนข้อมูลไฟล์บีบอัดใหม่ลงบล็อกดิสก์ถาวร.'
      ]
    },
    printing: {
      title: 'การจัดพิมพ์ภาพบนกระดาษ (Paper Printing Process)',
      description: 'จำลองขั้นตอนเมื่อผู้ใช้งานสั่งการพิมพ์ภาพในแอปพลิเคชันเพื่อขับสัญญาณสัญญาณหัวพิมพ์ทางกายภาพ',
      userAction: 'เปิดแอปพลิเคชันวาดรูป และคลิก "PRINT"',
      appName: 'Graphic Photo Editor',
      appDetails: 'ซอฟต์แวร์ประยุกต์ปรับแต่งแสงสีภาพ และแปลงข้อมูลพิกเซลสากล',
      systemName: 'Print Spooler & Device Driver',
      systemDetails: 'ไดรเวอร์เครื่องพิมพ์แปลงพิกเซลสีเป็นภาษาบอร์ดไฟฟ้า; OS คุมคิว',
      hardwareName: 'Printer Mainboard & Motors',
      hardwareDetails: 'เมนบอร์ดควบคุมเครื่องรับรหัสพัลส์ไฟฟ้า ขับมอเตอร์และหัวพ่นสี',
      logs: [
        '[USER] ผู้ใช้งานเลือกเครื่องพิมพ์เป้าหมายและคลิกปุ่มพิมพ์ (Print) บนโปรแกรมประยุกต์วาดเขียนหรือภาพถ่าย.',
        '[APPLICATION] ซอฟต์แวร์ประยุกต์แปลงอาร์เรย์พิกเซลสีรูปภาพให้กลายเป็นภาษา PostScript สำหรับงานสิ่งพิมพ์แล้วยิงคำขอยื่นไปหา OS.',
        '[SYSTEM & UTILITY] ระบบปฏิบัติการบริหารจัดคิวงานพิมพ์ (Print Spooler) พร้อมให้ตัวแปลภาษาซอฟต์แวร์ระบบ (Device Driver) แปลงรหัสรูปภาพเป็นภาษาควบคุมสัญญาณของเครื่องพิมพ์ปลายทาง.',
        '[HARDWARE] บอร์ดประมวลผลกระแสไฟฟ้าเครื่องพิมพ์ยอมรับคำสั่ง ดำเนินงานจ่ายกำลังไฟฟ้าขับมอเตอร์เดินกระดาษและสั่งหัวพิมพ์สีพ่นน้ำหมึกลงผิวสัมผัสกระดาษ.'
      ]
    },
    network: {
      title: 'การสืบค้นประวัติและที่อยู่เว็บไซต์ (Web Browser Request)',
      description: 'จำลองขั้นตอนการประมวลเมื่อผู้ใช้กรอกที่อยู่เว็บไซต์และเบราว์เซอร์สืบค้นชื่อไอพีปลายทาง',
      userAction: 'กรอกที่อยู่เว็บไซต์ www.google.com บน Chrome',
      appName: 'Chrome Web Browser',
      appDetails: 'ซอฟต์แวร์ประยุกต์รับชมเว็บเพจ จัดการโปรโตคอล HTTPS',
      systemName: 'DNS Client & NIC Driver',
      systemDetails: 'ยูทิลิตี้เปลี่ยนโดเมนเป็นไอพี; ไดรเวอร์เปิดช่องการ์ดเครือข่าย',
      hardwareName: 'Network Interface Card (NIC)',
      hardwareDetails: 'ชิปแลนแปลงบิตไฟฟ้าเป็นคลื่นความถี่เดินทางผ่านสายทองแดง',
      logs: [
        '[USER] ผู้ใช้งานระบุพิมพ์ตัวอักษร "www.google.com" ลงในแอดเดรสบาร์ของโปรแกรมเว็บเบราว์เซอร์ Chrome.',
        '[APPLICATION] เบราว์เซอร์ประยุกต์ยอมรับคำสั่ง วิเคราะห์พาร์สโปรโตคอล (HTTPS) และจัดเรียงเฟรมคำขอภาพสีและข้อความเว็บเพจ.',
        '[SYSTEM & UTILITY] OS เรียกซอฟต์แวร์ระบบ DNS Client แปลงชื่อโดเมนเป็นหมายเลขไอพีเครื่องคอมพิวเตอร์ปลายทาง พร้อมเรียกไดรเวอร์การ์ดเน็ต (NIC) เปิดพอร์ตสัญญาณ.',
        '[HARDWARE] ชิปเซตทางกายภาพของการ์ดแลน (NIC) รับตัวแปรบิตคำสั่ง ทำการแปลงสัญญาณดิจิทัลเป็นคลื่นความถี่ยิงเดินทางผ่านสายทองแดง LAN เคเบิลข้ามเครือข่าย.'
      ]
    }
  };

  // 1.1.4: สถานการณ์จำลองกระบวนการทำงานด้านไอทีของบุคลากร (Peopleware) ในองค์กร
  const scenariosPW = {
    dbCrash: {
      title: 'การกู้คืนเซิร์ฟเวอร์ฐานข้อมูลล่ม (Database Server Crash Recovery)',
      description: 'จำลองกระบวนการเมื่อตารางข้อมูลในคลังประมวลผลชำรุดเสียหายจนส่งผลให้แอปพลิเคชันค้าง ใช้งานไม่ได้ทั่วองค์กร',
      steps: [
        { level: 'user', title: 'ระดับผู้ใช้งาน (User Level)', sub: 'General / End-User', role: 'ผู้ใช้ทั่วไปเผชิญปัญหาระบบค้าง แจ้งเคสเปิดตั๋วงานซ่อมแซม', icon: User },
        { level: 'support', title: 'ระดับปฏิบัติการและบำรุงรักษา', sub: 'Technical Support / Helpdesk', role: 'รับตั๋วเคส ตรวจสอบเบื้องต้น พบปัญหา Database Engine ดับ ประสานนักพัฒนา', icon: Wrench },
        { level: 'dev', title: 'ระดับพัฒนาระบบ (Development)', sub: 'DBA & Programmer', role: 'ดึงล็อกฐานข้อมูล เขียนสคริปต์กู้คืนโครงสร้าง และซ่อมแซมข้อมูลจนผ่านเกณฑ์', icon: Code },
        { level: 'manager', title: 'ระดับบริหารจัดการ (Management)', sub: 'IT Manager / CIO', role: 'สอบทานรายงาน ประเมินนโยบายความมั่นคงปลอดภัย และเซ็นอนุมัติให้คืนค่าระบบ', icon: Briefcase }
      ],
      logs: [
        '[ระดับผู้ใช้] พนักงานหน้าเคาน์เตอร์บริการพบว่าฐานข้อมูลสินค้าไม่แสดงผล หน้าจอนิ่งค้าง จึงกรอกแบบฟอร์มเปิดใบงานแจ้งเรื่องไปยังแผนกบริการเทคโนโลยีสารสนเทศ.',
        '[ระดับปฏิบัติการ] ฝ่ายสนับสนุน Helpdesk ได้รับเรื่อง ดำเนินการคัดกรองเบื้องต้นโดยพยายามเชื่อมต่อเซิร์ฟเวอร์ฐานข้อมูล แต่พบข้อความปฏิเสธการเชื่อมต่อ จึงประสานส่งต่อสายงานวิเคราะห์ให้ผู้ดูแลฐานข้อมูล (DBA).',
        '[ระดับพัฒนาระบบ] DBA และโปรแกรมเมอร์ร่วมมือกันสืบค้นล็อก ค้นพบโครงสร้างตารางระบบเสียหาย จึงทำการกู้คืนประวัติสำรองข้อมูลและรันสคริปต์ซ่อมตรรกะจนฐานข้อมูลพร้อมทำงาน 100% พร้อมยื่นเสนอขอปล่อยใช้งานจริง.',
        '[ระดับบริหาร] IT Manager ทำการตรวจสอบมาตรการความปลอดภัยและประเมินผลกระทบก่อนจะอนุมัติการแก้ไขอย่างเป็นทางการ พร้อมสั่งระบบอัปเดตและแจ้งเตือนผู้ใช้งานถึงความพร้อมระบบ'
      ]
    },
    newFeature: {
      title: 'การพัฒนาฟีเจอร์ชำระเงินใหม่ (New E-Commerce Feature Request)',
      description: 'จำลองการผลักดันช่องทางการชำระเงินแบบไร้สัมผัสใหม่เพื่อเพิ่มประสิทธิภาพทางธุรกิจและการบริการลูกค้า',
      steps: [
        { level: 'user', title: 'ระดับผู้ใช้งาน (User Level)', sub: 'General / End-User', role: 'ยื่นข้อเสนอแนะความต้องการ อยากให้มีระบบจ่ายเงินด้วย QR Code ทันสมัย', icon: User },
        { level: 'manager', title: 'ระดับบริหารจัดการ (Management)', sub: 'IT Manager / CIO', role: 'ประเมินต้นทุน ความคุ้มค่า ความปลอดภัย ลงอนุมัติงบประมาณและทรัพยากร', icon: Briefcase },
        { level: 'dev', title: 'ระดับพัฒนาระบบ (Development)', sub: 'System Analyst & Programmer', role: 'วิเคราะห์การไหลของข้อมูล ออกแบบ UI/UX และเขียนซอร์สโค้ดฟังก์ชันระบบใหม่', icon: Code },
        { level: 'support', title: 'ระดับปฏิบัติการและบำรุงรักษา', sub: 'System Administrator (SysAdmin)', role: 'จัดตั้งสภาพแวดล้อมรันระบบ คอมไพล์ซอฟต์แวร์ และทำการ Deploy ขึ้น Cloud Production', icon: Wrench }
      ],
      logs: [
        '[ระดับผู้ใช้] กลุ่มผู้ใช้บริการหน้าร้านและพนักงานบริการขาย ขอความเห็นร่วมอยากให้มีระบบสแกน QR Code หน้าจอแสดงการจ่ายเงินผ่านบอร์ดเชื่อมต่อเพื่อลดการถือเงินสด.',
        '[ระดับบริหาร] ผู้จัดการฝ่ายไอที (IT Manager) และผู้อำนวยการเทคโนโลยี (CIO) นำข้อเสนอมาพิจารณา วางแผนด้านทิศทางธุรกิจ งบประมาณ และนโยบายความมั่นคงปลอดภัย ก่อนจะเซ็นอนุมัติงบโครงการเปิดไฟเขียว.',
        '[ระดับพัฒนาระบบ] นักวิเคราะห์ระบบ (System Analyst) ร่างสเปกกระบวนการข้อมูล จากนั้นโปรแกรมเมอร์ (Programmer) ดำเนินการเขียนโค้ดภาษาเชื่อม API ระบบธนาคาร ตรวจสอบการทำธุรกรรมจำลองเสร็จสมบูรณ์.',
        '[ระดับปฏิบัติการ] System Administrator ได้รับซอร์สโค้ดและไลบรารีที่เสร็จสมบูรณ์ นำมาทดสอบบนพื้นที่ทดลอง (Staging) และติดตั้งซอฟต์แวร์ฟีเจอร์ใหม่ขึ้นสู่ Cloud Server ให้พร้อมรันใช้งานจริง.'
      ]
    },
    networkIssue: {
      title: 'เครือข่ายไร้สายขัดข้องและเปลี่ยนอุปกรณ์สวิตช์ (Network Disruption)',
      description: 'จำลองกระบวนการซ่อมแซมอย่างเร่งด่วนเมื่อการ์ดหรืออุปกรณ์สวิตช์แลนทางกายภาพลัดวงจร',
      steps: [
        { level: 'user', title: 'ระดับผู้ใช้งาน (User Level)', sub: 'General / End-User', role: 'ผู้ใช้งานทั่วไปตรวจพบสัญญาณอินเทอร์เน็ตขาดหาย ส่งงานไม่ผ่านสายแลน', icon: User },
        { level: 'support', title: 'ระดับปฏิบัติการและบำรุงรักษา', sub: 'Helpdesk & Network Engineer', role: 'Helpdesk ตรวจสายสัญญาณภายนอก; วิศวกรเครือข่ายเข้าตรวจสอบตู้แร็คเปลี่ยนสวิตช์พอร์ตชำรุด', icon: Wrench },
        { level: 'manager', title: 'ระดับบริหารจัดการ (Management)', sub: 'IT Manager', role: 'สอบทานดัชนีชี้วัดประสิทธิภาพระบบเครือข่าย ตรวจสอบความปลอดภัย อนุมัติลงบันทึกบำรุงรักษา', icon: Briefcase },
        { level: 'user', title: 'ระดับผู้ใช้งาน (User Level)', sub: 'General / End-User', role: 'รับทราบสัญญาณเครือข่ายฟื้นตัว ทดสอบส่งข้อมูล และยืนยันกลับมาปฏิบัติงาน', icon: User }
      ],
      logs: [
        '[ระดับผู้ใช้] พนักงานฝ่ายสำนักงานพบว่าอินเทอร์เน็ตภายในขาดหายกะทันหัน ส่งอีเมลติดต่อลูกค้าภายนอกไม่ได้ โทรแจ้งสายตรงมายังศูนย์ปฏิบัติการคอมพิวเตอร์.',
        '[ระดับปฏิบัติการ] เจ้าหน้าที่สนับสนุนทางเทคนิค (Helpdesk) รับเคสและตรวจสอบสถานะการเชื่อมโยงระบบเครือข่าย จากนั้นวิศวกรเครือข่าย (Network Engineer) เดินทางไปห้องควบคุม (Server Room) ตรวจเช็คตู้แร็ค.',
        '[ระดับปฏิบัติการ] วิศวกรเครือข่ายตรวจสอบพบสวิตช์กระจายสายสัญญาณ (Switch Hub) ร้อนจัดและบอร์ดวงจรรวน จึงถอดสวิตช์ตัวเก่าออก ติดตั้งเครื่องใหม่ทดแทน ย้ายสายสัญญาณ UTP เข้าช่องพอร์ต และเซ็ตอัป VLAN ค่าคงที่ใหม่.',
        '[ระดับบริหาร] IT Manager ทำการตรวจสอบการไหลของข้อมูลและปริมาณแบนด์วิดท์ ยืนยันความสมบูรณ์และเซ็นชื่อรับรองผลการทำ Preventive Maintenance ปิดเคสบำรุงรักษาถาวร.'
      ]
    }
  };

  // --- 1.1.5 & 1.1.6: เครื่องจำลองการประมวลผลและการตัดสินใจ (Data-to-Information Decision Simulator) ---
  const scenariosDI = {
    sentiment: {
      title: 'ระบบวิเคราะห์ความพึงพอใจลูกค้า (Customer Sentiment Analyzer)',
      description: 'ประมวลผลคำติชมดิบจำนวนมากของลูกค้าเพื่อวัดระดับความพึงพอใจและวางแผนกลยุทธ์บริการ',
      inputTitle: 'คำติชมดิบ (Raw Reviews)',
      inputDesc: 'รวบรวมข้อความดิบ: "พังเร็ว", "ส่งไวมาก", "ใช้ดีแต่แพง"',
      processTitle: 'การวิเคราะห์ NLP (Natural Language Processing)',
      processDesc: 'จัดกลุ่มข้อความ ค้นหาคำหลัก และประเมินอารมณ์',
      storageTitle: 'คลังข้อมูลผู้บริโภค (Customer Database)',
      storageDesc: 'บันทึกคะแนน Index ลงบนตารางประวัติถาวร',
      outputTitle: 'สารสนเทศสถิติ (Sentiment Report)',
      outputDesc: 'ดัชนี Positive 65% แนะนำเพิ่มประกันสินค้า',
      logs: [
        '[INPUT] รวบรวมคำติชมดิบแบบข้อความธรรมดานับร้อยรายการจากหน้าเว็บไซต์สินค้า เช่น "ใช้ดีแต่ราคาค่อนข้างแพง", "จัดส่งเร็ว", "พลาสติกดูบอบบางพังง่าย".',
        '[PROCESS] หน่วยประมวลผล CPU โหลดโมเดลวิเคราะห์ข้อความธรรมดา (NLP) เพื่อคัดแยกคำศัพท์หลัก (เช่น "แพง" = เชิงลบ, "ดี/เร็ว" = เชิงบวก) และประเมินผลตรรกะของอารมณ์.',
        '[STORAGE] บันทึกผลลัพธ์คะแนนดัชนีและเวกเตอร์คำหลักแยกตามรายสินค้าลงในแฟ้มฐานข้อมูลถาวรบนระบบจัดเก็บ เพื่อเรียกสถิตินำไปพิจารณาภายหลัง.',
        '[OUTPUT] สรุปเป็นรายงาน Dashboard สวยงามชี้วัดว่าความพึงพอใจเป็นบวก 65% และระบุปัญหาหลักเรื่องความคงทน ทำให้ผู้จัดการสามารถลงมติปรับปรุงคุณภาพวัสดุได้ถูกต้อง.'
      ]
    },
    temp: {
      title: 'ระบบอุณหภูมิโรงงานอัจฉริยะ (IoT Factory Temperature Processing)',
      description: 'รวบรวมสัญญาณอุณหภูมิสดจากเซนเซอร์ IoT ทั่วโรงงานเพื่อควบคุมวาล์วระบายความร้อนป้องกันอันตราย',
      inputTitle: 'สัญญาณองศาดิบ (IoT Temp Sensor)',
      inputDesc: 'รหัสตัวเลขสดกระจัดกระจาย: 42.5, 43.1, 48.0, 52.1',
      processTitle: 'ตรวจสอบเกณฑ์ความปลอดภัย (Threshold Filter)',
      processDesc: 'คำนวณสถิติค่าเฉลี่ย ตรวจเช็คอุณหภูมิเกินวิกฤต',
      storageTitle: 'คลังสถิติอุณหภูมิ (Factory Metrics SSD)',
      storageDesc: 'บันทึกล็อกพิกัดความร้อนทุกนาทีเพื่อเก็บประวัติเชิงสถิติ',
      outputTitle: 'การควบคุมปิดวาล์วฉุกเฉิน (Boiler Shutoff)',
      outputDesc: 'แจ้งเตือนไฟแดงกะพริบ และเปิดพัลส์ระบายน้ำหล่อเย็นทันที',
      logs: [
        '[INPUT] อุปกรณ์เซนเซอร์ความเข้มข้นอุณหภูมิส่งบิตสัญญาณไฟฟ้าดิบ ซึ่งระบุองศาเซลเซียสสด (42.5, 48.0, 52.1°C) เข้าสู่บอร์ดควบคุมแบบอนุกรม.',
        '[PROCESS] หน่วยประมวลผลประเมินตรรกะเปรียบเทียบเทียบกับค่าวิกฤต: (อุณหภูมิเฉลี่ย > 50°C หรือไม่) และตรวจจับว่าอุณหภูมิกำลังทะลุขีดจำกัดเป็นจริง (TRUE).',
        '[STORAGE] บันทึกสถิติอุณหภูมิและพิกัดเครื่องจักรทุกรอบนาทีลงในแฟ้มข้อมูลความร้อนถาวร เพื่อใช้สืบค้นวิเคราะห์การเสื่อมของหม้อน้ำภายหลัง.',
        '[OUTPUT] ระบบยิงสัญญาณไฟเตือนสีแดงกะพริบบนจอมอนิเตอร์ของช่างเทคนิค พร้อมส่งคำสั่งกระแสไฟฟ้าตรงไปปลดมอเตอร์วาล์วให้เปิดระบบน้ำหล่อเย็นระบายความร้อนทันที.'
      ]
    },
    campaign: {
      title: 'ระบบส่งแคมเปญการซื้อเจาะเป้าหมาย (E-Commerce Targeting Campaign)',
      description: 'วิเคราะห์พฤติกรรมการคลิกชมและกดสั่งของลูกค้าดิบ เพื่อสืบหาความต้องการและยิงคูปองส่วนลดแบบตรงใจ',
      inputTitle: 'ประวัติการคลิกดิบ (Clickstream Raw Logs)',
      inputDesc: 'ลูกค้ากดคลิกดูสินค้า: "พัดลม", "หม้อข้าว", "คลิก 12 ครั้ง"',
      processTitle: 'ประเมินพฤติกรรม (Behavior Analysis)',
      processDesc: 'จัดกลุ่มตามความชอบและความถี่ คาดเดาความน่าจะเป็นในการซื้อ',
      storageTitle: 'โปรไฟล์ข้อมูลผู้ใช้ (User Interest SSD)',
      storageDesc: 'เขียนอัปเดตสถิติความสนใจ "เครื่องใช้ไฟฟ้าในบ้าน" ในแผ่นเก็บประวัติ',
      outputTitle: 'คูปองส่งเสริมเฉพาะบุคคล (Targeted Promo Code)',
      outputDesc: 'ส่งป้ายคูปอง "ส่วนลดพัดลมไอเย็น 15% บ่ายนี้" กระตุ้นการตัดสินใจ',
      logs: [
        '[INPUT] ระบบจดจำประวัติบันทึกการเคลื่อนไหวเมาส์สดของลูกค้า (Clickstream Logs) เช่น คลิกดูรายละเอียดพัดลม 8 ครั้ง ใส่ตะกร้าแต่ยังไม่จ่ายเงิน.',
        '[PROCESS] CPU ประมวลผลอัลกอริทึมประเมินความชอบ คํานวณหาดัชนีโอกาสซื้อภายใน 2 ชั่วโมงข้างหน้า พบว่าสูงกว่า 80% จึงเข้าสู่ตรรกะจัดแคมเปญ.',
        '[STORAGE] เขียนบันทึกข้อมูลประเภทความสนใจล่าสุด "เครื่องใช้ไฟฟ้าในบ้าน" อัปเกรดลงบนข้อมูลโปรไฟล์สมาชิกบนไดรฟ์ SSD คลังหลัก.',
        '[OUTPUT] หน้าต่าง UI ส่งภาพแบนเนอร์แสดงโปรโมชันส่วนลดเฉพาะบุคคล "รับส่วนลด 15% สำหรับพัดลมไอเย็นใบนี้ด่วนภายใน 1 ชั่วโมง" ยอดขายกระเตื้องทันที.'
      ]
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // SIDE EFFECTS & STEP CONTROL LOGIC
  // ────────────────────────────────────────────────────────────────────────

  // --- 1.1.1: อัปเดตตรรกะบอร์ดจำลอง (RAM -> CPU -> SSD) ---
  const triggerMotherboardSimulation = () => {
    if (isMbRunning) return;
    setIsMbRunning(true);
    setMotherboardStep(1);
    setMotherboardLogs(prev => [
      ...prev,
      `[1/3] [RAM] กำลังส่งต่อข้อมูลธุรกรรมจากหน่วยความจำชั่วคราวเข้าสู่หน่วยประมวลผลกลาง...`
    ]);
  };

  useEffect(() => {
    if (!isMbRunning) return;

    if (motherboardStep === 1) {
      const timer = setTimeout(() => {
        setMotherboardStep(2);
        setMotherboardLogs(prev => [
          ...prev,
          `[2/3] [CPU] ได้รับบิตข้อมูลในหน่วยลงทะเบียนประมวลผล (Register). หน่วยคำนวณและตรรกะ (ALU) กำลังคิดภาษีหัก ณ ที่จ่ายและลดหย่อนสมาชิก...`
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (motherboardStep === 2) {
      const timer = setTimeout(() => {
        setMotherboardStep(3);
        setMotherboardLogs(prev => [
          ...prev,
          `[3/3] [STORAGE] การคำนวณผลลัพธ์สุทธิเสร็จสมบูรณ์. กำลังนำส่งสัญญาณเพื่อเขียนประวัติธุรกรรมถาวรลงบนบล็อกหน่วยความจำ NVMe SSD ที่ตำแหน่งแอดเดรส 0x7FFF.`
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (motherboardStep === 3) {
      const timer = setTimeout(() => {
        setMotherboardStep(0);
        setIsMbRunning(false);
        setMotherboardLogs(prev => [
          ...prev,
          `[สำเร็จ] ระบบบอร์ดควบคุมประมวลผลเสร็จสิ้นทุกกระบวนการ. อุปกรณ์พร้อมรับธุรกรรมถัดไป.`
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [motherboardStep, isMbRunning]);

  // --- 1.1.2: อัปเดตตรรกะ Data Flow Simulator ---
  const startFlow = () => {
    setFlowActive(true);
    setFlowStep(1);
    setScenarioLogs([
      `[ระบบ] เริ่มจำลองกระบวนการ: ${scenarios[selectedScenario].title}`,
      scenarios[selectedScenario].logs[0]
    ]);
  };

  const pauseFlow = () => {
    setFlowActive(false);
  };

  const resetFlow = () => {
    setFlowActive(false);
    setFlowStep(0);
    setScenarioLogs([
      '[ระบบ] รีเซ็ตสภาวะบอร์ดสำเร็จ. กรุณาเลือกสถานการณ์ประมวลผลและกดปุ่ม PLAY เพื่อเริ่มกระบวนการเคลื่อนย้ายข้อมูล'
    ]);
  };

  useEffect(() => {
    if (!flowActive) return;

    if (flowStep >= 1 && flowStep < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStep + 1;
        setFlowStep(nextStep);
        setScenarioLogs(prev => [
          ...prev,
          scenarios[selectedScenario].logs[nextStep - 1]
        ]);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }

    if (flowStep === 4) {
      const timer = setTimeout(() => {
        setFlowStep(5);
        setFlowActive(false);
        setScenarioLogs(prev => [
          ...prev,
          `[วงจรข้อมูลสมบูรณ์] วงจรข้อมูล 4 หน่วยงานหลัก ประสานความสอดคล้องกัน 100% สัญญาณถูกส่งผ่านเรียบร้อย`
        ]);
      }, flowSpeed);
      return () => clearTimeout(timer);
    }
  }, [flowStep, flowActive, selectedScenario, flowSpeed]);

  // --- 1.1.3: อัปเดตตรรกะ Software Stack Simulator ---
  const startFlowSW = () => {
    setFlowActiveSW(true);
    setFlowStepSW(1);
    setScenarioLogsSW([
      `[ระบบ] เริ่มจำลองซอฟต์แวร์ประสานงาน: ${scenariosSW[selectedScenarioSW].title}`,
      scenariosSW[selectedScenarioSW].logs[0]
    ]);
  };

  const resetFlowSW = () => {
    setFlowActiveSW(false);
    setFlowStepSW(0);
    setScenarioLogsSW([
      '[ระบบ] รีเซ็ตสภาพแวดล้อมเสร็จสิ้น. เลือกสภาวการณ์จำลองแล้วกดเริ่ม เพื่อวิเคราะห์การแปลงความต้องการผ่านโครงสร้างซอฟต์แวร์ 4 ชั้น'
    ]);
  };

  useEffect(() => {
    if (!flowActiveSW) return;

    if (flowStepSW >= 1 && flowStepSW < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStepSW + 1;
        setFlowStepSW(nextStep);
        setScenarioLogsSW(prev => [
          ...prev,
          scenariosSW[selectedScenarioSW].logs[nextStep - 1]
        ]);
      }, flowSpeedSW);
      return () => clearTimeout(timer);
    }

    if (flowStepSW === 4) {
      const timer = setTimeout(() => {
        setFlowStepSW(5);
        setFlowActiveSW(false);
        setScenarioLogsSW(prev => [
          ...prev,
          `[การประสานซอฟต์แวร์สำเร็จ] คำสั่งสั่งการไหลลื่นลงสู่ฮาร์ดแวร์จริงและทำงานอย่างมีตรรกะสูงสุด`
        ]);
      }, flowSpeedSW);
      return () => clearTimeout(timer);
    }
  }, [flowStepSW, flowActiveSW, selectedScenarioSW, flowSpeedSW]);

  // --- 1.1.4: อัปเดตตรรกะ Peopleware Workflow Simulator ---
  const startFlowPW = () => {
    setFlowActivePW(true);
    setFlowStepPW(1);
    setScenarioLogsPW([
      `[ระบบ] เริ่มต้นกระบวนการส่งต่อภาระงาน: ${scenariosPW[selectedScenarioPW].title}`,
      scenariosPW[selectedScenarioPW].logs[0]
    ]);
  };

  const resetFlowPW = () => {
    setFlowActivePW(false);
    setFlowStepPW(0);
    setScenarioLogsPW([
      '[ระบบ] สภาพแวดล้อมพร้อมใช้งาน กรุณาเลือกสถานการณ์และกดปุ่มจำลอง เพื่อดูการส่งต่อภาระงานของบุคลากรคอมพิวเตอร์แต่ละระดับ'
    ]);
  };

  useEffect(() => {
    if (!flowActivePW) return;

    const currentScenario = scenariosPW[selectedScenarioPW];
    const maxSteps = currentScenario.steps.length;

    if (flowStepPW >= 1 && flowStepPW < maxSteps) {
      const timer = setTimeout(() => {
        const nextStep = flowStepPW + 1;
        setFlowStepPW(nextStep);
        setScenarioLogsPW(prev => [
          ...prev,
          currentScenario.logs[nextStep - 1]
        ]);
      }, flowSpeedPW);
      return () => clearTimeout(timer);
    }

    if (flowStepPW === maxSteps) {
      const timer = setTimeout(() => {
        setFlowStepPW(maxSteps + 1);
        setFlowActivePW(false);
        setScenarioLogsPW(prev => [
          ...prev,
          `[เสร็จสิ้น] การไหลของงาน (Workflow Cycle) ระหว่างบุคลากรเสร็จสมบูรณ์ ตอบสนองวัตถุประสงค์องค์กรเรียบร้อย.`
        ]);
      }, flowSpeedPW);
      return () => clearTimeout(timer);
    }
  }, [flowStepPW, flowActivePW, selectedScenarioPW, flowSpeedPW]);

  // --- 1.1.5 & 1.1.6: อัปเดตตรรกะ Data-to-Information Simulator ---
  const startFlowDI = () => {
    setFlowActiveDI(true);
    setFlowStepDI(1);
    setScenarioLogsDI([
      `[ระบบ] เริ่มต้นการแปรรูป: ${scenariosDI[selectedScenarioDI].title}`,
      scenariosDI[selectedScenarioDI].logs[0]
    ]);
  };

  const resetFlowDI = () => {
    setFlowActiveDI(false);
    setFlowStepDI(0);
    setScenarioLogsDI([
      '[ระบบ] ระบบพร้อมทำงาน กรุณาเลือกสถานการณ์และกด PLAY เพื่อเริ่มวงจรประมวลผลข้อมูล'
    ]);
  };

  useEffect(() => {
    if (!flowActiveDI) return;

    if (flowStepDI >= 1 && flowStepDI < 4) {
      const timer = setTimeout(() => {
        const nextStep = flowStepDI + 1;
        setFlowStepDI(nextStep);
        setScenarioLogsDI(prev => [
          ...prev,
          scenariosDI[selectedScenarioDI].logs[nextStep - 1]
        ]);
      }, flowSpeedDI);
      return () => clearTimeout(timer);
    }

    if (flowStepDI === 4) {
      const timer = setTimeout(() => {
        setFlowStepDI(5);
        setFlowActiveDI(false);
        setScenarioLogsDI(prev => [
          ...prev,
          `[ประมวลผลสำเร็จ] ข้อมูลดิบถูกแปรสภาพเป็นสารสนเทศเชิงประกอบการตัดสินใจธุรกิจอย่างสมบูรณ์แบบ.`
        ]);
      }, flowSpeedDI);
      return () => clearTimeout(timer);
    }
  }, [flowStepDI, flowActiveDI, selectedScenarioDI, flowSpeedDI]);

  // --- 1.1.7: อัปเดตการทำงานจำลองโรงงาน 4.0 Ticker ---
  useEffect(() => {
    if (!isFactorySimulating) return;

    const interval = setInterval(() => {
      setFactoryTicks(prev => prev + 1);
      setFactoryData(prev => {
        // Arm oscillates back and forth
        const newAngle = (prev.armAngle + 15) % 180;
        
        // Pressure oscillates slightly
        const pressureDelta = Math.sin(factoryTicks * 0.5) * 4;
        const newPressure = Math.min(150, Math.max(90, Math.round(120 + pressureDelta)));

        // Temp increases slowly if health is declining
        const newTemp = Math.round(prev.motorTemp + (Math.random() > 0.6 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0));
        
        // Health declines slowly
        const healthDelta = Math.random() > 0.85 ? 1 : 0;
        const newHealth = Math.max(20, prev.motorHealth - healthDelta);

        return {
          boilerPressure: newPressure,
          conveyorSpeed: 150,
          armAngle: newAngle,
          motorTemp: Math.min(95, Math.max(35, newTemp)),
          motorHealth: newHealth
        };
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isFactorySimulating, factoryTicks]);

  const handleMaintenance = () => {
    setFactoryData(prev => ({
      ...prev,
      motorHealth: 100,
      motorTemp: 42
    }));
  };

  const activeScenario = scenarios[selectedScenario];
  const activeScenarioSW = scenariosSW[selectedScenarioSW];
  const activeScenarioPW = scenariosPW[selectedScenarioPW];
  const activeScenarioDI = scenariosDI[selectedScenarioDI];

  return (
    <>
      {/* 1️⃣ Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop />

      <style>{`
        @keyframes strokeFlow {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-flow-dash {
          stroke-dasharray: 8 4;
          animation: strokeFlow var(--flow-anim-speed, 1.5s) linear infinite;
        }
      `}</style>

      {/* 3️⃣ Layer 3: Main Layout Stacking Subtopics Vertically */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-24 relative z-10">
        
        {/* ====================================================================
            SECTION 1: องค์ประกอบของระบบคอมพิวเตอร์เชิงลึก (ความหมาย/หน้าที่)
            ==================================================================== */}
        <section id="section-components" className="space-y-10">
          
          {/* ความหมายและองค์ประกอบของระบบคอมพิวเตอร์ */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ความหมายและองค์ประกอบของระบบคอมพิวเตอร์
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              คอมพิวเตอร์คืออุปกรณ์อิเล็กทรอนิกส์ดิจิทัลที่สามารถรับข้อมูลเข้า ดำเนินการประมวลผลตรรกะตามคำสั่ง ควบคุมและเขียนผลลัพธ์จัดเก็บเพื่อเรียกใช้ประโยชน์ได้ 
              โดยระบบคอมพิวเตอร์จะดำเนินงานร่วมกันอย่างเป็นระบบผ่าน **เสาหลักสำคัญ 4 ประการ** ที่ขาดส่วนใดส่วนหนึ่งไม่ได้:
            </p>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p) => {
                const IconComponent = p.icon;
                const isActive = selectedPillar === p.id;
                return (
                  <ConceptCard
                    key={p.id}
                    accent={p.color}
                    active={isActive}
                    onClick={() => setSelectedPillar(p.id)}
                    symbol={<IconComponent className="w-7 h-7" />}
                    symbolFont="sans"
                    title={p.title}
                    description={p.en}
                  />
                );
              })}
            </div>

            {/* Display Detailed Active Pillar */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-md transition-all duration-300">
              {pillars.map((p) => {
                if (p.id !== selectedPillar) return null;
                const IconComponent = p.icon;
                return (
                  <div key={p.id} className="flex flex-col md:flex-row gap-6 items-start animate-fadeIn">
                    <div className={`p-4 rounded-2xl bg-${p.color}-50 text-${p.color}-600 border border-${p.color}-100 shrink-0`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-800">{p.title} ({p.en})</h3>
                      <p className="text-[15px] text-slate-600 leading-relaxed max-w-3xl">{p.desc}</p>
                      
                      <div className="space-y-2">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">ตัวอย่างเทคโนโลยีหลัก</span>
                        <div className="flex flex-wrap gap-2">
                          {p.examples.map((ex, i) => (
                            <span key={i} className="px-3 py-1 bg-white/80 border border-slate-200/60 rounded-full text-xs font-semibold text-slate-600 shadow-sm">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* หน้าที่หลักและการทำงานของระบบคอมพิวเตอร์ */}
          <div className="space-y-8">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                หน้าที่หลักและการทำงานของระบบคอมพิวเตอร์
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              การทำงานของบอร์ดคอมพิวเตอร์มีหน้าที่สอดรับกันอย่างเป็นพลวัต โดยอุปกรณ์ต่าง ๆ ประสานสัญญาณเพื่อนำพาคำสั่งและเขียนข้อมูลลงบนระบบจัดเก็บ 
              คุณสามารถกดทดลองจำลองเพื่อดู **เส้นทางสื่อสัญญาณทองแดง (Copper Trace)** จากหน่วยแรม เข้าสู่ชิปประมวลผล CPU และลงบันทึกถาวรที่ไดรฟ์ SSD
            </p>

            {/* Motherboard Trace Visualizer Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                  <span className="font-mono text-xs font-semibold tracking-wider">SYSTEM MOTHERBOARD TRACE SIMULATOR</span>
                </div>
                <button
                  onClick={triggerMotherboardSimulation}
                  disabled={isMbRunning}
                  className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    isMbRunning
                      ? 'bg-slate-800 text-slate-500 border border-slate-700/50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] border border-indigo-500'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isMbRunning ? 'กำลังวิเคราะห์...' : 'เริ่มต้นจำลองตรรกะ'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/50">
                {/* Visual Canvas Panel */}
                <div className="lg:col-span-7 bg-slate-950 p-6 flex items-center justify-center min-h-[380px]">
                  <svg width="600" height="380" viewBox="0 0 600 380" className="w-full max-w-[500px]">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79, 70, 229, 0.04)" strokeWidth="1" />
                      </pattern>
                      
                      <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                      <linearGradient id="ramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#0891B2" />
                      </linearGradient>
                      <linearGradient id="ssdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                    </defs>
                    <rect width="600" height="380" fill="url(#grid)" />

                    <path
                      d="M 300,115 L 300,165"
                      stroke="rgba(226, 232, 240, 0.08)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 300,115 L 300,165"
                      stroke={motherboardStep === 1 ? '#06B6D4' : 'rgba(79, 70, 229, 0.15)'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className={motherboardStep === 1 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': '1.2s' }}
                    />

                    <path
                      d="M 300,235 L 300,285"
                      stroke="rgba(226, 232, 240, 0.08)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 300,235 L 300,285"
                      stroke={motherboardStep === 3 ? '#F59E0B' : 'rgba(79, 70, 229, 0.15)'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className={motherboardStep === 3 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': '1.2s' }}
                    />

                    <g transform="translate(230, 40)" className="cursor-pointer">
                      <rect
                        x="0" y="0" width="140" height="75" rx="8"
                        fill="rgba(15, 23, 42, 0.8)"
                        stroke={motherboardStep === 1 ? '#06B6D4' : 'rgba(148, 163, 184, 0.15)'}
                        strokeWidth="1.5"
                      />
                      <rect x="5" y="5" width="130" height="8" rx="2" fill="url(#ramGrad)" opacity="0.8" />
                      <text x="70" y="42" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PRIMARY MEMORY</text>
                      <text x="70" y="58" fill="#F8FAFC" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">RAM MODULE</text>
                      {motherboardStep === 1 && (
                        <circle cx="70" cy="40" r="5" fill="#22D3EE" className="animate-ping" />
                      )}
                    </g>

                    <g transform="translate(230, 160)">
                      <rect
                        x="0" y="0" width="140" height="75" rx="8"
                        fill="rgba(15, 23, 42, 0.8)"
                        stroke={motherboardStep === 2 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                        strokeWidth="1.5"
                      />
                      <rect x="5" y="5" width="130" height="8" rx="2" fill="url(#cpuGrad)" opacity="0.8" />
                      <text x="70" y="42" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CENTRAL PROCESS</text>
                      <text x="70" y="58" fill="#F8FAFC" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CPU Core (ALU)</text>
                      {motherboardStep === 2 && (
                        <circle cx="70" cy="40" r="5" fill="#818CF8" className="animate-ping" />
                      )}
                    </g>

                    <g transform="translate(230, 280)">
                      <rect
                        x="0" y="0" width="140" height="75" rx="8"
                        fill="rgba(15, 23, 42, 0.8)"
                        stroke={motherboardStep === 3 ? '#F59E0B' : 'rgba(148, 163, 184, 0.15)'}
                        strokeWidth="1.5"
                      />
                      <rect x="5" y="5" width="130" height="8" rx="2" fill="url(#ssdGrad)" opacity="0.8" />
                      <text x="70" y="42" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">STORAGE BLOCK</text>
                      <text x="70" y="58" fill="#F8FAFC" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">NVMe SSD</text>
                      {motherboardStep === 3 && (
                        <circle cx="70" cy="40" r="5" fill="#FBBF24" className="animate-ping" />
                      )}
                    </g>
                  </svg>
                </div>

                {/* Console Reporter Panel */}
                <div className="lg:col-span-5 flex flex-col h-[380px]">
                  <ConsoleScreen
                    title="MOTHERBOARD SYSTEM LOGGER"
                    logs={motherboardLogs}
                    onClear={() => setMotherboardLogs(['System cleared. Waiting for request...'])}
                  />
                </div>
              </div>

              {/* Business Sector Stepper Block */}
              <div className="p-6 md:p-8 bg-slate-950/20 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">ตัวอย่างการประยุกต์ใช้งานเชิงธุรกิจ</h4>
                    <p className="text-[13px] text-slate-500">เลือกสาขาอาชีพเพื่อวิเคราะห์สเต็ปลอจิกของการประมวลผล</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                    <button
                      onClick={() => setSelectedSector('retail')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSector === 'retail'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      ค้าปลีก / POS
                    </button>
                    <button
                      onClick={() => setSelectedSector('finance')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSector === 'finance'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      ธนาคาร / โอนเงิน
                    </button>
                    <button
                      onClick={() => setSelectedSector('logistics')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSector === 'logistics'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      ขนส่ง / GPS
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {businessSectors[selectedSector].steps.map((st, i) => (
                    <div key={i} className="bg-white/70 border border-slate-200/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold">
                          {i + 1}
                        </span>
                        <h5 className="text-[14px] font-bold text-slate-800">{st.title}</h5>
                        <p className="text-[13px] text-slate-500 leading-relaxed">{st.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2: ฮาร์ดแวร์และการทำงานทั้ง 4 หน่วย (Data Flow Simulator)
            ==================================================================== */}
        <section id="section-hardware" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ฮาร์ดแวร์และการทำงานทั้ง 4 หน่วย
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              การทำงานประสานกันของอุปกรณ์ฮาร์ดแวร์จะเรียงลำดับต่อเนื่องเป็นวงจรอินเตอร์แอกทีฟ โดยข้อมูลนำเข้าผ่าน **Input Unit** ถูกส่งผ่านสะพานสัญญาณเข้าสู่ **Process Unit** เพื่อรันอัลกอริทึมเปรียบเทียบตรรกะในคลังความจำ **Storage Unit** และขับผลลัพธ์ออกสู่สายตากายภาพผ่าน **Output Unit**
            </p>

            {/* 4-Unit Simulator Panel */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">4-UNIT DATA FLOW INTERACTIVE SIMULATOR</span>
                </div>
                
                {/* Control Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedScenario}
                    onChange={(e) => {
                      setSelectedScenario(e.target.value);
                      resetFlow();
                    }}
                    disabled={flowActive}
                    className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="checkout">Smart POS Checkout</option>
                    <option value="face">AI Face Attendance</option>
                    <option value="sorting">Smart Conveyor Sorter</option>
                  </select>

                  <div className="h-5 w-px bg-slate-700/60" />

                  <button
                    onClick={startFlow}
                    disabled={flowActive || flowStep === 5}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      flowActive || flowStep === 5
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    PLAY
                  </button>

                  <button
                    onClick={pauseFlow}
                    disabled={!flowActive}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:text-slate-600 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    PAUSE
                  </button>

                  <button
                    onClick={resetFlow}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>

              {/* Speed Slider Header inside Canvas block */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-400">ควบคุมความเร็วรอบการทำงาน (Hz):</span>
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
                {/* Flow Visual Canvas */}
                <div className="lg:col-span-8 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-full text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      สถานการณ์การทำงาน: {activeScenario.title}
                    </span>
                  </div>

                  <svg width="800" height="380" viewBox="0 0 800 380" className="w-full max-w-[640px]">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.4)" />
                      </marker>
                      <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818CF8" />
                      </marker>
                    </defs>

                    {/* Symmetrical Connecting Paths at x=400 Center */}
                    {/* Path 1: Input to CPU (x=120 to x=330, y=100) */}
                    <path
                      d="M 260,140 H 330"
                      stroke={flowStep === 1 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStep === 1 ? 'url(#arrow-active)' : 'url(#arrow)'}
                      className={flowStep === 1 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                    />
                    
                    {/* Path 2: CPU to Output (x=470 to x=540, y=100) */}
                    <path
                      d="M 470,140 H 540"
                      stroke={flowStep === 4 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStep === 4 ? 'url(#arrow-active)' : 'url(#arrow)'}
                      className={flowStep === 4 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                    />

                    {/* Path 3: CPU to Storage (Vertical from y=180 to y=280 at x=400) */}
                    <path
                      d="M 400,180 V 280"
                      stroke={flowStep === 2 || flowStep === 3 ? '#FBBF24' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStep === 2 || flowStep === 3 ? 'url(#arrow-active)' : 'url(#arrow)'}
                      className={flowStep === 2 || flowStep === 3 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeed / 1000}s` }}
                    />

                    {/* Node 1: Input Unit (y=100, x=120) */}
                    <foreignObject x={120} y={100} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 1
                          ? 'bg-slate-900 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)] text-indigo-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[12px] font-bold tracking-wide uppercase">INPUT UNIT</div>
                        <div className="text-[13px] font-semibold truncate text-slate-200 mt-1">{activeScenario.inputName}</div>
                      </div>
                    </foreignObject>

                    {/* Node 2: Processing Unit (y=100, x=330, center of 800) */}
                    <foreignObject x={330} y={100} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 2
                          ? 'bg-slate-900 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)] text-indigo-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[12px] font-bold tracking-wide uppercase">PROCESS UNIT</div>
                        <div className="text-[13px] font-semibold truncate text-slate-200 mt-1">{activeScenario.processName}</div>
                      </div>
                    </foreignObject>

                    {/* Node 3: Output Unit (y=100, x=540) */}
                    <foreignObject x={540} y={100} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 4
                          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.2)] text-emerald-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[12px] font-bold tracking-wide uppercase">OUTPUT UNIT</div>
                        <div className="text-[13px] font-semibold truncate text-slate-200 mt-1">{activeScenario.outputName}</div>
                      </div>
                    </foreignObject>

                    {/* Node 4: Storage Unit (y=280, x=330) */}
                    <foreignObject x={330} y={280} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 transition-all duration-300 text-center ${
                        flowStep === 3
                          ? 'bg-slate-900 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)] text-amber-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[12px] font-bold tracking-wide uppercase">STORAGE UNIT</div>
                        <div className="text-[13px] font-semibold truncate text-slate-200 mt-1">{activeScenario.storageName}</div>
                      </div>
                    </foreignObject>
                  </svg>
                </div>

                {/* Flow Logs Screen */}
                <div className="lg:col-span-4 flex flex-col h-[380px]">
                  <ConsoleScreen
                    title="DATA FLOW TRACE LOGS"
                    logs={scenarioLogs}
                    onClear={() => setScenarioLogs(['System log cleared. Waiting for execute...'])}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3: ซอฟต์แวร์ประเภทต่างๆ (4-Layer Software Stack Simulator)
            ==================================================================== */}
        <section id="section-software-layers" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ซอฟต์แวร์ประเภทต่างๆ และการประสานงานระดับโครงสร้าง
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ซอฟต์แวร์จำแนกตามโครงสร้างปฏิบัติการและระดับการประสานเป็น **3 กลุ่มทางวิชาการ** โดยทำงานเป็นเลเยอร์ซ้อนกัน ซึ่งจะยื่นขอจัดสรรช่องทรัพยากรบอร์ดประมวลผล โดยซอฟต์แวร์ประยุกต์ประสานผ่านซอฟต์แวร์ระบบเพื่อขับควบคุมสัญญาณสู่ชิปวงจรฮาร์ดแวร์
            </p>

            {/* Concept Cards for 3 Software Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl w-fit">
                  <Settings className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800">ซอฟต์แวร์ระบบ (System Software)</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  เป็นซอฟต์แวร์ควบคุมและประสานงานฮาร์ดแวร์อย่างใกล้ชิด เช่น ระบบปฏิบัติการ (OS) ทำหน้าที่จัดสรรคิว เมมโมรี่ แฟ้มข้อมูล และไดรเวอร์ควบคุม (Device Driver) ที่คอยเป็นล่ามแปลงสัญญาณสั่งการทางกายภาพ
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                  <Monitor className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800">ซอฟต์แวร์ประยุกต์ (Application Software)</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  เป็นซอฟต์แวร์ระดับผู้ใช้ที่สร้างขึ้นเพื่อตอบสนองวัตถุประสงค์เฉพาะทาง เช่น เว็บเบราว์เซอร์สำหรับเข้าอินเทอร์เน็ต แอปพลิเคชันคำนวณและปรับภาพ หรือระบบบัญชีชำระเงินที่แคชเชียร์สแกนบาร์โค้ด
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                  <FileArchive className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800">ซอฟต์แวร์อรรถประโยชน์ (Utility Software)</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  ช่วยดูแล บำรุงรักษา และเพิ่มประสิทธิภาพการทำงานของคอมพิวเตอร์ เช่น โปรแกรมบีบอัดไฟล์ (Zip) สำหรับลดพื้นที่, โปรแกรมสแกนไวรัสปกป้องระบบ และระบบคลีนเนอร์จำกัดขยะข้อมูลบน NVMe SSD
                </p>
              </div>
            </div>

            {/* 4-Layer SW Stack Simulator Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">4-LAYER SOFTWARE STACK CO-OPERATION SIMULATOR</span>
                </div>
                
                {/* Control Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedScenarioSW}
                    onChange={(e) => {
                      setSelectedScenarioSW(e.target.value);
                      resetFlowSW();
                    }}
                    disabled={flowActiveSW}
                    className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="compression">File Compression</option>
                    <option value="printing">Paper Printing</option>
                    <option value="network">Web DNS Query</option>
                  </select>

                  <div className="h-5 w-px bg-slate-700/60" />

                  <button
                    onClick={startFlowSW}
                    disabled={flowActiveSW || flowStepSW === 5}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      flowActiveSW || flowStepSW === 5
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    PLAY
                  </button>

                  <button
                    onClick={resetFlowSW}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>

              {/* Speed Controller */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-400">ควบคุมความเร็วรอบการแปลคำสั่ง (Hz):</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="600"
                    max="3000"
                    step="300"
                    value={3600 - flowSpeedSW}
                    onChange={(e) => setFlowSpeedSW(3600 - parseInt(e.target.value))}
                    className="w-32 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-indigo-400">{((3600 - flowSpeedSW) / 1000).toFixed(1)} Hz</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/40">
                {/* Flow Visual Canvas */}
                <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-full text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ความต้องการผู้ใช้งาน: "{activeScenarioSW.userAction}"
                    </span>
                  </div>

                  <svg width="600" height="380" viewBox="0 0 600 380" className="w-full max-w-[480px]">
                    <defs>
                      <marker id="arrowSW" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.4)" />
                      </marker>
                      <marker id="arrowSW-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818CF8" />
                      </marker>
                    </defs>

                    {/* Symmetrical Vertical Connection Trace at Center x=300 */}
                    <path
                      d="M 300,60 V 320"
                      stroke="rgba(148, 163, 184, 0.12)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Dynamic dashed flow segments based on execution */}
                    <path
                      d="M 300,60 L 300,120"
                      stroke={flowStepSW === 1 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepSW === 1 ? 'url(#arrowSW-active)' : 'url(#arrowSW)'}
                      className={flowStepSW === 1 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedSW / 1000}s` }}
                    />
                    <path
                      d="M 300,120 L 300,200"
                      stroke={flowStepSW === 2 ? '#22D3EE' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepSW === 2 ? 'url(#arrowSW-active)' : 'url(#arrowSW)'}
                      className={flowStepSW === 2 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedSW / 1000}s` }}
                    />
                    <path
                      d="M 300,200 L 300,280"
                      stroke={flowStepSW === 3 ? '#FBBF24' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepSW === 3 ? 'url(#arrowSW-active)' : 'url(#arrowSW)'}
                      className={flowStepSW === 3 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedSW / 1000}s` }}
                    />

                    {/* Layer 1: User Level Node (y=20, x=300 center) */}
                    <foreignObject x={180} y={20} width={240} height={40}>
                      <div className={`w-full h-full rounded-lg border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        flowStepSW === 1
                          ? 'bg-slate-900 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)] text-indigo-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        USER / ACTION (ชั้นที่ 1)
                      </div>
                    </foreignObject>

                    {/* Layer 2: Application Layer (y=100) */}
                    <foreignObject x={180} y={100} width={240} height={50}>
                      <div className={`w-full h-full rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${
                        flowStepSW === 2
                          ? 'bg-slate-900 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.2)] text-cyan-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[10px] font-bold uppercase">APPLICATION SOFTWARE</div>
                        <div className="text-[12px] font-semibold text-slate-200 truncate w-full">{activeScenarioSW.appName}</div>
                      </div>
                    </foreignObject>

                    {/* Layer 3: System & Utility OS (y=180) */}
                    <foreignObject x={180} y={180} width={240} height={50}>
                      <div className={`w-full h-full rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${
                        flowStepSW === 3
                          ? 'bg-slate-900 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)] text-amber-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[10px] font-bold uppercase">SYSTEM & UTILITY SOFTWARE</div>
                        <div className="text-[12px] font-semibold text-slate-200 truncate w-full">{activeScenarioSW.systemName}</div>
                      </div>
                    </foreignObject>

                    {/* Layer 4: Hardware Engine (y=260) */}
                    <foreignObject x={180} y={260} width={240} height={50}>
                      <div className={`w-full h-full rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${
                        flowStepSW === 4
                          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.2)] text-emerald-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[10px] font-bold uppercase">HARDWARE EXECUTION</div>
                        <div className="text-[12px] font-semibold text-slate-200 truncate w-full">{activeScenarioSW.hardwareName}</div>
                      </div>
                    </foreignObject>
                  </svg>
                </div>

                {/* Flow Logs Screen */}
                <div className="lg:col-span-5 flex flex-col h-[380px]">
                  <ConsoleScreen
                    title="SOFTWARE TRANSLATION LOGS"
                    logs={scenarioLogsSW}
                    onClear={() => setScenarioLogsSW(['System logs cleared. Waiting for execute...'])}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4: บทบาทและระดับของบุคลากรคอมพิวเตอร์ในองค์กร
            ==================================================================== */}
        <section id="section-peopleware" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                บทบาทและระดับของบุคลากรคอมพิวเตอร์ในองค์กร
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              บุคลากรคอมพิวเตอร์ (Peopleware) คือทรัพยากรบุคคลที่มีบทบาทและสติปัญญาในการบริหารจัดการและป้อนคำสั่งให้เทคโนโลยีดำเนินไปอย่างสอดคล้องกับกลยุทธ์ขององค์กร 
              โดยจำแนกอย่างชัดเจนออกเป็น **4 ระดับมาตรฐานสากล** ที่แบ่งขอบเขตและหน้าที่การดูแลระบบแตกต่างกันดังนี้:
            </p>

            {/* Premium 4-Level Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                    <User className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-800">ระดับผู้ใช้งาน (User Level)</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    ผู้ใช้คอมพิวเตอร์ทั่วไปและผู้รับบริการปลายทาง (General User / End-User) ทำหน้าที่ป้อนความต้องการ คีย์ยอดขาย หรือรายงานปัญหาระบบเพื่อให้ไอทีช่วยแก้ไข
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-800">ระดับปฏิบัติการ (Operation)</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    วิศวกรเครือข่าย, ผู้ดูแลระบบ (SysAdmin), Helpdesk คอยควบคุมเสถียรภาพกายภาพ บำรุงรักษาสวิตช์ฮับ สายแลน เซิร์ฟเวอร์ และรับแก้ปัญหาขัดข้องในแต่ละวัน
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl w-fit">
                    <Code className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-800">ระดับพัฒนาระบบ (Development)</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    นักวิเคราะห์ระบบ (System Analyst), โปรแกรมเมอร์ (Programmer / Developer), ผู้ดูแลฐานข้อมูล (DBA) ทำหน้าที่วิเคราะห์ความต้องการมาสร้างสรรค์โครงสร้างและเขียนซอร์สโค้ด
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-800">ระดับบริหาร (Management)</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    ผู้จัดการไอที (IT Manager), ผู้อำนวยการฝ่ายเทคโนโลยี (CIO) วางนโยบาย วางแผนยุทธศาสตร์ความปลอดภัย ประเมินงบประมาณโครงการ และอนุมัติการใช้งานจริง
                  </p>
                </div>
              </div>
            </div>

            {/* IT Workflow Simulator Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Network className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">ORGANIZATIONAL IT WORKFLOW SIMULATOR</span>
                </div>
                
                {/* Control Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedScenarioPW}
                    onChange={(e) => {
                      setSelectedScenarioPW(e.target.value);
                      resetFlowPW();
                    }}
                    disabled={flowActivePW}
                    className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="dbCrash">Database Crash Recovery</option>
                    <option value="newFeature">New QR Code Payment Feature</option>
                    <option value="networkIssue">Network Disruption & Hardware</option>
                  </select>

                  <div className="h-5 w-px bg-slate-700/60" />

                  <button
                    onClick={startFlowPW}
                    disabled={flowActivePW || flowStepPW > activeScenarioPW.steps.length}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      flowActivePW || flowStepPW > activeScenarioPW.steps.length
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    PLAY
                  </button>

                  <button
                    onClick={resetFlowPW}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>

              {/* Speed Controller */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-400">ความเร็วการส่งมอบงาน (วินาที):</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="600"
                    max="3000"
                    step="300"
                    value={3600 - flowSpeedPW}
                    onChange={(e) => setFlowSpeedPW(3600 - parseInt(e.target.value))}
                    className="w-32 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-indigo-400">{((3600 - flowSpeedPW) / 1000).toFixed(1)}s</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/40">
                {/* SVG Workflow Panel */}
                <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[460px]">
                  <div className="w-full text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      กระบวนการ: {activeScenarioPW.title}
                    </span>
                  </div>

                  <svg width="800" height="460" viewBox="0 0 800 460" className="w-full max-w-[600px]">
                    <defs>
                      <marker id="arrowPW" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.4)" />
                      </marker>
                      <marker id="arrowPW-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366F1" />
                      </marker>
                    </defs>

                    {/* Symmetrical Vertical Center Traces at x=400 */}
                    <path
                      d="M 400,85 V 355"
                      stroke="rgba(148, 163, 184, 0.08)"
                      strokeWidth="5"
                    />

                    {/* Dynamic Path Highlights based on Scenario and Step */}
                    {selectedScenarioPW === 'dbCrash' && (
                      <>
                        <path
                          d="M 400,85 V 135"
                          stroke={flowStepPW === 1 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 1 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 1 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 400,195 V 245"
                          stroke={flowStepPW === 2 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 2 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 2 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 400,305 V 355"
                          stroke={flowStepPW === 3 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 3 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 3 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 270,385 H 170 V 165 H 270"
                          fill="none"
                          stroke={flowStepPW === 4 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 4 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 4 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                      </>
                    )}

                    {selectedScenarioPW === 'newFeature' && (
                      <>
                        <path
                          d="M 530,55 H 630 V 385 H 530"
                          fill="none"
                          stroke={flowStepPW === 1 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 1 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 1 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 400,355 V 305"
                          stroke={flowStepPW === 2 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 2 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 2 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 400,245 V 195"
                          stroke={flowStepPW === 3 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 3 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 3 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 400,135 V 85"
                          stroke={flowStepPW === 4 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 4 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 4 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                      </>
                    )}

                    {selectedScenarioPW === 'networkIssue' && (
                      <>
                        <path
                          d="M 400,85 V 135"
                          stroke={flowStepPW === 1 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 1 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 1 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 470,165 H 510 V 185 H 470"
                          fill="none"
                          stroke={flowStepPW === 2 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          className={flowStepPW === 2 ? 'animate-pulse' : ''}
                        />
                        <path
                          d="M 530,165 H 610 V 385 H 530"
                          fill="none"
                          stroke={flowStepPW === 3 ? '#6366F1' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 3 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 3 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                        <path
                          d="M 270,385 H 170 V 55 H 270"
                          fill="none"
                          stroke={flowStepPW === 4 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                          strokeWidth="2.5"
                          markerEnd={flowStepPW === 4 ? 'url(#arrowPW-active)' : 'url(#arrowPW)'}
                          className={flowStepPW === 4 ? 'animate-flow-dash' : ''}
                          style={{ '--flow-anim-speed': `${flowSpeedPW / 1000}s` }}
                        />
                      </>
                    )}

                    {/* Nodes using foreignObject for text wrapping */}
                    {activeScenarioPW.steps.map((st, i) => {
                      const IconComponent = st.icon;
                      let yCoord = 25;
                      if (st.level === 'support') yCoord = 135;
                      if (st.level === 'dev') yCoord = 245;
                      if (st.level === 'manager') yCoord = 355;

                      const isNodeActive = flowStepPW === (i + 1);

                      return (
                        <g key={i}>
                          <foreignObject x={270} y={yCoord} width={260} height={60}>
                            <div className={`w-full h-full rounded-xl border flex items-center px-4 gap-3 transition-all duration-300 ${
                              isNodeActive
                                ? `bg-slate-900 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] text-indigo-400`
                                : `bg-slate-900/90 border-slate-800 text-slate-400`
                            }`}>
                              <div className={`p-1.5 rounded-lg shrink-0 ${isNodeActive ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-[13px] font-bold truncate leading-tight text-slate-200">
                                  {st.title}
                                </div>
                                <div className="text-[11px] opacity-75 truncate leading-none mt-1 text-slate-400">
                                  {st.sub}
                                </div>
                              </div>
                              {isNodeActive && (
                                <span className="flex h-2.5 w-2.5 relative shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                                </span>
                              )}
                            </div>
                          </foreignObject>

                          {/* Hover Tooltip when Active */}
                          {isNodeActive && (
                            <foreignObject x={30} y={yCoord} width={220} height={60}>
                              <div className="bg-slate-950/95 border border-indigo-500/50 rounded-xl p-2.5 text-xs text-slate-300 leading-normal animate-fadeIn shadow-lg">
                                <div className="font-bold text-indigo-400 mb-0.5">บทบาทปฏิบัติงาน:</div>
                                <div className="line-clamp-2">{st.role}</div>
                              </div>
                            </foreignObject>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Logs Screen */}
                <div className="lg:col-span-5 flex flex-col h-[460px]">
                  <ConsoleScreen
                    title="PEOPLEWARE WORKFLOW LOGS"
                    logs={scenarioLogsPW}
                    onClear={() => setScenarioLogsPW(['ประวัติสัญญาณว่างเปล่า. รอการทดสอบจำลองส่งมอบเคส...'])}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 5: ข้อมูลและสารสนเทศ (Data & Information) (1.1.5 & 1.1.6)
            ==================================================================== */}
        <section id="section-data-info" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ความสัมพันธ์และวงจรการประมวลผลข้อมูลสู่สารสนเทศอัจฉริยะ
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ความแตกต่างสำคัญระหว่าง **ข้อมูลดิบ (Raw Data)** และ **สารสนเทศเชิงลึก (Actionable Information)** คือระดับการกลั่นกรองและโครงสร้าง 
              โดยข้อมูลดิบจะถูกนำเข้าสู่ **วงจรการประมวลผลข้อมูล (Data Processing Cycle)** เพื่อแปรสภาพให้พร้อมสนับสนุนการตัดสินใจทางธุรกิจของฝ่ายบริหาร
            </p>

            {/* Fluid Open-Air Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                  <Database className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800">ข้อมูลดิบ (Raw Data)</h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  ข้อเท็จจริง ตัวเลข ข้อความ หรือภาพถ่ายกระจัดกระจายที่ถูกบันทึกเข้ามาโดยเซนเซอร์หรือผู้ใช้ ซึ่งยังไม่ได้รับการกรอง คัดแยก หรือคำนวณเปรียบเทียบเชิงสถิติ ทำให้ไม่มีประโยชน์เพียงพอที่จะนำไปตัดสินใจประกอบกิจการได้ทันที
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800">สารสนเทศเชิงประกอบการตัดสินใจ (Actionable Information)</h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  ผลผลิตประมวลผลข้อมูลดิบผ่านตรรกะคอมพิวเตอร์อย่างมีทิศทาง จนได้ข้อสรุป มีแนวโน้มเชิงปริมาณ และจัดโครงสร้าง Dashboard สวยงาม ซึ่งช่วยชี้ขาดและคาดการณ์อนาคตของแผนงานธุรกิจได้อย่างแม่นยำ
                </p>
              </div>
            </div>

            {/* Data Processing Cycle Simulator Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-300">DATA PROCESSING CYCLE SIMULATOR</span>
                </div>
                
                {/* Control Toolbar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedScenarioDI}
                    onChange={(e) => {
                      setSelectedScenarioDI(e.target.value);
                      resetFlowDI();
                    }}
                    disabled={flowActiveDI}
                    className="bg-slate-800 text-slate-200 border border-slate-700/60 px-3 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="sentiment">Customer Sentiment Analysis</option>
                    <option value="temp">IoT Factory Temperature Control</option>
                    <option value="campaign">Targeted E-Commerce Campaign</option>
                  </select>

                  <div className="h-5 w-px bg-slate-700/60" />

                  <button
                    onClick={startFlowDI}
                    disabled={flowActiveDI || flowStepDI === 5}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      flowActiveDI || flowStepDI === 5
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    PLAY
                  </button>

                  <button
                    onClick={resetFlowDI}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>

              {/* Speed Controller */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-400">ควบคุมความเร็วสัญญาณการประมวล (Hz):</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="600"
                    max="3000"
                    step="300"
                    value={3600 - flowSpeedDI}
                    onChange={(e) => setFlowSpeedDI(3600 - parseInt(e.target.value))}
                    className="w-32 accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-indigo-400">{((3600 - flowSpeedDI) / 1000).toFixed(1)} Hz</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-800/40">
                {/* Visual SVG Flowchart */}
                <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-full text-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ระบบแปรสภาพ: {activeScenarioDI.title}
                    </span>
                  </div>

                  <svg width="800" height="400" viewBox="0 0 800 400" className="w-full max-w-[620px]">
                    <defs>
                      <marker id="arrowDI" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.4)" />
                      </marker>
                      <marker id="arrowDI-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818CF8" />
                      </marker>
                    </defs>

                    {/* Symmetrical Connectors and Junctions */}
                    {/* Raw Input to Process (H 260 to 330) */}
                    <path
                      d="M 260,120 H 330"
                      stroke={flowStepDI === 1 ? '#818CF8' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepDI === 1 ? 'url(#arrowDI-active)' : 'url(#arrowDI)'}
                      className={flowStepDI === 1 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedDI / 1000}s` }}
                    />

                    {/* Process to Storage (V 160 to 260) */}
                    <path
                      d="M 400,160 V 260"
                      stroke={flowStepDI === 3 ? '#FBBF24' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepDI === 3 ? 'url(#arrowDI-active)' : 'url(#arrowDI)'}
                      className={flowStepDI === 3 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedDI / 1000}s` }}
                    />

                    {/* Process to Output (H 470 to 540) */}
                    <path
                      d="M 470,120 H 540"
                      stroke={flowStepDI === 4 ? '#34D399' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      markerEnd={flowStepDI === 4 ? 'url(#arrowDI-active)' : 'url(#arrowDI)'}
                      className={flowStepDI === 4 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedDI / 1000}s` }}
                    />

                    {/* Database Feedback Trace Loop (Symmetrical) */}
                    <path
                      d="M 330,300 H 210 V 160 H 330"
                      fill="none"
                      stroke={flowStepDI === 2 ? '#22D3EE' : 'rgba(148, 163, 184, 0.15)'}
                      strokeWidth="2.5"
                      className={flowStepDI === 2 ? 'animate-flow-dash' : ''}
                      style={{ '--flow-anim-speed': `${flowSpeedDI / 1000}s` }}
                    />

                    {/* 4 Nodes using foreignObject for text wrapping */}
                    {/* Node 1: Input Raw Data (y=80, x=120) */}
                    <foreignObject x={120} y={80} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 text-center transition-all duration-300 ${
                        flowStepDI === 1
                          ? 'bg-slate-900 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.2)] text-indigo-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider text-slate-500">INPUT / RAW</div>
                        <div className="text-[13px] font-semibold text-slate-200 mt-1 leading-tight line-clamp-2">{activeScenarioDI.inputTitle}</div>
                      </div>
                    </foreignObject>

                    {/* Node 2: CPU Process (y=80, x=330) */}
                    <foreignObject x={330} y={80} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 text-center transition-all duration-300 ${
                        flowStepDI === 2
                          ? 'bg-slate-900 border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.2)] text-cyan-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider text-slate-500">PROCESSING / CPU</div>
                        <div className="text-[13px] font-semibold text-slate-200 mt-1 leading-tight line-clamp-2">{activeScenarioDI.processTitle}</div>
                      </div>
                    </foreignObject>

                    {/* Node 3: Storage (y=260, x=330) */}
                    <foreignObject x={330} y={260} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 text-center transition-all duration-300 ${
                        flowStepDI === 3
                          ? 'bg-slate-900 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)] text-amber-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider text-slate-500">STORAGE / SSD</div>
                        <div className="text-[13px] font-semibold text-slate-200 mt-1 leading-tight line-clamp-2">{activeScenarioDI.storageTitle}</div>
                      </div>
                    </foreignObject>

                    {/* Node 4: Output Actionable Info (y=80, x=540) */}
                    <foreignObject x={540} y={80} width={140} height={80}>
                      <div className={`w-full h-full rounded-xl border flex flex-col justify-between p-3 text-center transition-all duration-300 ${
                        flowStepDI === 4
                          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.2)] text-emerald-400'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400'
                      }`}>
                        <div className="text-[11px] font-bold tracking-wider text-slate-500">OUTPUT / INFORMATION</div>
                        <div className="text-[13px] font-semibold text-slate-200 mt-1 leading-tight line-clamp-2">{activeScenarioDI.outputTitle}</div>
                      </div>
                    </foreignObject>
                  </svg>

                  {/* Context Info Box */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 mt-2 text-center text-xs text-slate-400 w-full max-w-[500px]">
                    <span className="font-bold text-indigo-400 uppercase tracking-wide mr-1.5">[สถานะล่าสุด]</span>
                    {flowStepDI === 0 && 'รอการเปิดใช้งาน...'}
                    {flowStepDI === 1 && `นำเข้ารับข้อมูลดิบ: ${activeScenarioDI.inputDesc}`}
                    {flowStepDI === 2 && `ประมวลผลดึงลักษณะ: ${activeScenarioDI.processDesc}`}
                    {flowStepDI === 3 && `บันทึกประวัติถาวร: ${activeScenarioDI.storageDesc}`}
                    {flowStepDI === 4 && `กลั่นกรองคำตัดสินใจ: ${activeScenarioDI.outputDesc}`}
                    {flowStepDI === 5 && 'แปรรูปข้อมูลสำเร็จอย่างเป็นวงจร.'}
                  </div>
                </div>

                {/* Flow Logs Screen */}
                <div className="lg:col-span-5 flex flex-col h-[400px]">
                  <ConsoleScreen
                    title="DATA TO INFORMATION RECIPE LOGGER"
                    logs={scenarioLogsDI}
                    onClear={() => setScenarioLogsDI(['Logs cleared. Select scenario to trace...'])}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 6: ประโยชน์และบทบาทระบบคอมพิวเตอร์ในอุตสาหกรรม 4.0 (1.1.7)
            ==================================================================== */}
        <section id="section-industry-4" className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                บทบาทและระบบคอมพิวเตอร์ในอุตสาหกรรมอัจฉริยะยุค 4.0
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ในยุคปฏิวัติอุตสาหกรรม **Industry 4.0** สถาปัตยกรรมคอมพิวเตอร์และระบบ Big Data ทำหน้าที่เป็นระบบประสาทแกนหลักคอยรวบรวมข้อมูลสด เพื่อสนับสนุนการทำนายปัญหาฮาร์ดแวร์ล่วงหน้าและการประสานสัญญาณสายพานอย่างแม่นยำ
            </p>

            {/* Industry 4.0 Pillars Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div
                onClick={() => setSelectedPillar4('iiot')}
                className={`bg-white/60 backdrop-blur-xl border rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  selectedPillar4 === 'iiot' ? 'border-indigo-500 shadow-indigo-100/50' : 'border-white/50'
                }`}
              >
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                  <Network className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800 mt-3">Industrial IoT (IIoT)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-2">
                  การติดตั้งเซนเซอร์ไร้สายและบอร์ดรับส่งสัญญาณบนเครื่องจักรทั่วทั้งโรงงาน เพื่อวิเคราะห์อัตราการเคลื่อนตัว ปริมาณไฟฟ้า และสถิติการไหลในสายพานแบบเรียลไทม์
                </p>
              </div>

              <div
                onClick={() => setSelectedPillar4('cps')}
                className={`bg-white/60 backdrop-blur-xl border rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  selectedPillar4 === 'cps' ? 'border-indigo-500 shadow-indigo-100/50' : 'border-white/50'
                }`}
              >
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl w-fit">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800 mt-3">Cyber-Physical Systems (CPS)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-2">
                  การผสานการทำงานระหว่างเครื่องจักรกลกายภาพ (เช่น แขนกล) และโมเดลคอมพิวเตอร์เสมือนจริง (Digital Twin) เพื่อคำนวณ จำลองทิศทาง และปรับแก้ไขมุมการหมุนของแขนกลแบบไร้รอยต่อ
                </p>
              </div>

              <div
                onClick={() => setSelectedPillar4('pm')}
                className={`bg-white/60 backdrop-blur-xl border rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  selectedPillar4 === 'pm' ? 'border-indigo-500 shadow-indigo-100/50' : 'border-white/50'
                }`}
              >
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800 mt-3">Predictive Maintenance (PM)</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-2">
                  การวิเคราะห์ข้อมูลขนาดใหญ่ (Big Data) จากสุขภาพมอเตอร์ เพื่อทำนายล่วงหน้าก่อนที่จะชำรุดเสียหายจริง ช่วยป้องกันปัญหาเครื่องจักรระเบิดหรือสะดุดล้มเหลวโดยมีเป้าหมายล่วงหน้า
                </p>
              </div>
            </div>

            {/* Dynamic Telemetry Simulator Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-mono text-xs font-bold tracking-wider">INDUSTRY 4.0 SMART TELEMETRY SYSTEM</span>
                  </div>
                  <p className="text-xs text-slate-500">จำลองการประมวลวิเคราะห์เครื่องจักรสดและระบบ Digital Twin ป้องกันความเสียหาย</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setIsFactorySimulating(!isFactorySimulating)}
                    className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      isFactorySimulating
                        ? 'bg-amber-600 text-white hover:bg-amber-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02]'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isFactorySimulating ? 'PAUSE MONITOR' : 'START SIMULATION'}
                  </button>
                  <button
                    onClick={handleMaintenance}
                    className="px-4 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    RUN PREVENTIVE MAINTENANCE
                  </button>
                </div>
              </div>

              {/* Dynamic Showcase Viewports */}
              {selectedPillar4 === 'iiot' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">IIOT BOILER PRESSURE</span>
                    <div className="my-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-indigo-400">{factoryData.boilerPressure}</span>
                      <span className="text-xs text-slate-600">PSI</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(factoryData.boilerPressure / 150) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">IIOT CONVEYOR BELT</span>
                    <div className="my-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-cyan-400">{isFactorySimulating ? factoryData.conveyorSpeed : 0}</span>
                      <span className="text-xs text-slate-600">RPM</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300" style={{ width: isFactorySimulating ? '65%' : '0%' }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">MOTOR TEMPERATURE</span>
                    <div className="my-2 flex items-baseline gap-1.5">
                      <span className={`text-2xl font-bold font-mono ${factoryData.motorTemp > 75 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>{factoryData.motorTemp}</span>
                      <span className="text-xs text-slate-600">°C</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${factoryData.motorTemp > 75 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${(factoryData.motorTemp / 95) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">IOT GATEWAY STATUS</span>
                    <div className="my-2 flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${isFactorySimulating ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`}></span>
                      <span className="text-[13px] font-bold text-slate-300 font-mono">{isFactorySimulating ? 'STREAMING REALTIME' : 'STANDBY'}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono">Baud Rate: 115200bps</span>
                  </div>
                </div>
              )}

              {selectedPillar4 === 'cps' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  {/* Physical Representation */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 mb-4 tracking-wider uppercase">[1] PHYSICAL ASSEMBLY ROBOT</span>
                    <svg width="220" height="180" viewBox="0 0 220 180" className="bg-slate-900 border border-slate-800 rounded-lg">
                      <rect x="0" y="160" width="220" height="20" fill="#334155" />
                      <circle cx="110" cy="130" r="15" fill="#f43f5e" />
                      <line
                        x1="110" y1="130"
                        x2={110 + Math.cos((factoryData.armAngle * Math.PI) / 180) * 70}
                        y2={130 - Math.sin((factoryData.armAngle * Math.PI) / 180) * 70}
                        stroke="#f43f5e"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={110 + Math.cos((factoryData.armAngle * Math.PI) / 180) * 70}
                        cy={130 - Math.sin((factoryData.armAngle * Math.PI) / 180) * 70}
                        r="8"
                        fill="#fda4af"
                      />
                    </svg>
                    <span className="text-xs font-mono text-slate-400 mt-3">มุมของข้อต่อแขนกลกล: {factoryData.armAngle}°</span>
                  </div>

                  {/* Digital Twin Sync */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 mb-4 tracking-wider uppercase">[2] DIGITAL TWIN MODEL SYNC</span>
                    <svg width="220" height="180" viewBox="0 0 220 180" className="bg-slate-900/50 border border-cyan-800/40 rounded-lg">
                      <defs>
                        <pattern id="twinGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34, 211, 238, 0.05)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="220" height="180" fill="url(#twinGrid)" />
                      <rect x="0" y="160" width="220" height="20" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="110" cy="130" r="15" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="2 2" className="animate-spin" />
                      <line
                        x1="110" y1="130"
                        x2={110 + Math.cos((factoryData.armAngle * Math.PI) / 180) * 70}
                        y2={130 - Math.sin((factoryData.armAngle * Math.PI) / 180) * 70}
                        stroke="#22d3ee"
                        strokeWidth="3"
                        strokeDasharray="4 2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={110 + Math.cos((factoryData.armAngle * Math.PI) / 180) * 70}
                        cy={130 - Math.sin((factoryData.armAngle * Math.PI) / 180) * 70}
                        r="6"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-xs font-mono text-cyan-400 mt-3 animate-pulse">CYBER PHYSICAL STATE: SYNCHRONIZED</span>
                  </div>
                </div>
              )}

              {selectedPillar4 === 'pm' && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
                  <div className="space-y-4 flex-1">
                    <h5 className="text-[15px] font-bold text-slate-300 tracking-wider">BIG DATA PREDICTIVE HEALTH MONITOR</h5>
                    <p className="text-[13px] text-slate-500 leading-normal">
                      ระบบประมวลผลดึงปริมาณความร้อน ประสิทธิภาพเชิงกล และการใช้กระแสไฟฟ้า เพื่อนำมาประเมินหาดัชนีสุขภาพโดยเฉลี่ยของมอเตอร์หลัก ป้องกันความสูญเสียกะทันหัน
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">ESTIMATED ENGINE HEALTH:</span>
                        <span className={factoryData.motorHealth > 70 ? 'text-green-400' : factoryData.motorHealth > 40 ? 'text-amber-400 animate-pulse' : 'text-red-500 animate-pulse'}>{factoryData.motorHealth}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            factoryData.motorHealth > 70
                              ? 'bg-green-500'
                              : factoryData.motorHealth > 40
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${factoryData.motorHealth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center shrink-0 w-full md:w-56 space-y-3">
                    <div className="text-xs text-slate-500 font-semibold uppercase">การวินิจฉัยสุขภาพ</div>
                    {factoryData.motorHealth > 75 ? (
                      <div className="text-green-400 text-sm font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> สุขภาพยอดเยี่ยม
                      </div>
                    ) : factoryData.motorHealth > 45 ? (
                      <div className="text-amber-400 text-sm font-bold flex items-center justify-center gap-1.5 animate-pulse">
                        <Info className="w-4 h-4" /> ควรเข้าบำรุงรักษา
                      </div>
                    ) : (
                      <div className="text-red-500 text-sm font-bold flex items-center justify-center gap-1.5 animate-pulse">
                        <Shield className="w-4 h-4" /> วิกฤต: เสี่ยงพังเสียหาย
                      </div>
                    )}
                    
                    <button
                      onClick={handleMaintenance}
                      className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      รันสคริปต์ซ่อมบำรุงด่วน
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 7: ใบงานและการประเมินท้ายบทเรียน (TeacherTask) (1.1.1 - 1.1.7)
            ==================================================================== */}
        <SectionBlock>
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                แบบฝึกหัดประเมินระดับความรู้พื้นฐานคอมพิวเตอร์
              </h2>
            </div>
            
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-4xl">
              ทดสอบความเข้าใจเกี่ยวกับความหมาย หน้าที่ของฮาร์ดแวร์ การประสานซอฟต์แวร์ สายงานของบุคลากร Peopleware วงจรการแปรรูปข้อมูลดิบ และบทบาทคอมพิวเตอร์ในอุตสาหกรรมอัจฉริยะ 4.0
            </p>

            <TeacherTask
              title="ใบงานทบทวนระบบคอมพิวเตอร์เชิงลึก (Unit 1.1)"
              taskText="ให้นักเรียนตอบคำถามประเมินความรู้พื้นฐานคอมพิวเตอร์และเทคโนโลยีระดับอัจฉริยะทั้ง 7 ข้อให้ได้คะแนนเต็ม 100% เพื่อผ่านบททดสอบสากลประจำหน่วยการเรียนรู้นี้"
              questions={[
                {
                  question: 'อุปกรณ์ใดทำหน้าที่เป็น "หน่วยประมวลผลหลัก" ในการประมวลสัญญาณตรรกะและจัดการสืบเนื่องคิวคำสั่งของบอร์ดคอมพิวเตอร์?',
                  options: [
                    'หน่วยประมวลผลกลาง (CPU Core)',
                    'หน่วยความจำสำรอง (SSD Flash)',
                    'สายเชื่อมสัญญาณทองแดง (Bus Tracer)',
                    'หน่วยความจำชั่วคราว (RAM Module)'
                  ],
                  correctIndex: 0
                },
                {
                  question: 'ในการจำลองการทำงาน 4 หน่วย (Data Flow Cycle) ขั้นตอนที่แขนกล actuator ดันคัดแยกกล่องพัสดุออกนอกสายพานหลักจัดอยู่ในหน่วยการทำงานใด?',
                  options: [
                    'หน่วยรับข้อมูล (Input Unit)',
                    'หน่วยจัดเก็บข้อมูล (Storage Unit)',
                    'หน่วยประมวลผลตรรกะ (Process Unit)',
                    'หน่วยแสดงผลลัพธ์ (Output Unit)'
                  ],
                  correctIndex: 3
                },
                {
                  question: 'ซอฟต์แวร์ชนิดใดมีบทบาทเป็น "ล่ามระบบ" คอยประสานงานแปลตารางพิกเซลข้อมูลรูปภาพจากแอปประยุกต์ ไปเป็นพัลส์พ่นหมึกของเครื่องพิมพ์ทางกายภาพ?',
                  options: [
                    'ซอฟต์แวร์ระบบปฏิบัติการ (Operating System)',
                    'ซอฟต์แวร์ระบบไดรเวอร์เฉพาะ (Device Driver)',
                    'ซอฟต์แวร์อรรถประโยชน์บีบอัด (Utility Software)',
                    'ซอฟต์แวร์ประยุกต์สำนักงาน (Application Software)'
                  ],
                  correctIndex: 1
                },
                {
                  question: 'หากบริษัทเผชิญปัญหาฐานข้อมูลเสียหายเร่งด่วน บุคลากรในข้อใดจัดอยู่ใน "ระดับพัฒนาระบบ (Development)" ที่มีบทบาทเขียนรหัสสคริปต์กู้คืนฐานข้อมูล?',
                  options: [
                    'ผู้ใช้งานทั่วไป (General User)',
                    'ผู้ดูแลเซิร์ฟเวอร์ (System Administrator)',
                    'ผู้ดูแลระบบฐานข้อมูล (Database Administrator - DBA)',
                    'ผู้จัดการฝ่ายเทคโนโลยีสารสนเทศ (IT Manager)'
                  ],
                  correctIndex: 2
                },
                {
                  question: 'ในวงจรการประมวลผลข้อมูล (Data Processing Cycle) ข้อใดเรียงลำดับขั้นตอนกระบวนการได้อย่างถูกต้องและสอดคล้องตามตรรกะสากล?',
                  options: [
                    'การนำเข้าข้อมูล ➔ การแสดงผลลัพธ์ ➔ การประมวลผล ➔ การจัดเก็บข้อมูล',
                    'การนำเข้าข้อมูล ➔ การประมวลผล ➔ การจัดเก็บข้อมูล ➔ การแสดงผลลัพธ์',
                    'การประมวลผล ➔ การนำเข้าข้อมูล ➔ การจัดเก็บข้อมูล ➔ การแสดงผลลัพธ์',
                    'การจัดเก็บข้อมูล ➔ การนำเข้าข้อมูล ➔ การประมวลผล ➔ การแสดงผลลัพธ์'
                  ],
                  correctIndex: 1
                },
                {
                  question: 'คำอธิบายใดเปรียบเทียบความแตกต่างระหว่าง "ข้อมูลดิบ (Raw Data)" และ "สารสนเทศ (Information)" ได้อย่างถูกต้องและเด่นชัดที่สุด?',
                  options: [
                    'ข้อมูลดิบคือข้อมูลที่ผ่านการสรุปเชิงสถิติแล้ว; สารสนเทศคือตัวเลขอุณหภูมิสดจากเซนเซอร์',
                    'ข้อมูลดิบคือรหัสสัญญาณหรือข้อความที่กระจัดกระจายยังไม่ผ่านการจัดระเบียบ; สารสนเทศคือผลลัพธ์ที่ผ่านการวิเคราะห์เพื่อช่วยในการตัดสินใจ',
                    'ข้อมูลดิบไม่สามารถนำเข้าสู่ระบบคอมพิวเตอร์ได้; สารสนเทศสามารถนำเข้าและบันทึกได้โดยตรง',
                    'ข้อมูลดิบเก็บอยู่บนแรมชั่วคราวเท่านั้น; สารสนเทศจะจัดเก็บอยู่บน SSD ถาวรอย่างเดียว'
                  ],
                  correctIndex: 1
                },
                {
                  question: 'บทบาทหลักของระบบคอมพิวเตอร์และ Big Data ในการทำ "การบำรุงรักษาเชิงป้องกัน (Predictive Maintenance)" ของอุตสาหกรรมยุค 4.0 คือข้อใด?',
                  options: [
                    'การจัดเก็บประวัติการเช็คชื่อเข้างานของช่างเทคนิคทุกเช้า',
                    'การวิเคราะห์สถิติสุขภาพของเครื่องจักรและมอเตอร์เพื่อคาดเดาและป้องกันความเสียหายล่วงหน้าก่อนอุปกรณ์ชำรุดจริง',
                    'การเพิ่มแรงดันในหม้อน้ำโรงงานโดยช่างเพื่อเพิ่มความแรงสูงสุด',
                    'การเปลี่ยนสายพานและระบบไฟทุกสัปดาห์โดยไม่คำนึงถึงอายุการใช้งาน'
                  ],
                  correctIndex: 1
                }
              ]}
            />
          </div>
        </SectionBlock>

      </main>
    </>
  );
}
