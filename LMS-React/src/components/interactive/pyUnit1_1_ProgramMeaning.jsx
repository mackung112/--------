import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  History, 
  Code2, 
  Sparkles, 
  ArrowRight,
  Monitor,
  Activity,
  Zap,
  BookOpen,
  Copy,
  Info,
  Check,
  AlertTriangle,
  XCircle,
  HelpCircle
} from 'lucide-react';

// ==========================================
// 1. TeacherTask Component (Standardized Footer)
// ==========================================
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
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-200 shadow-[0_0_20px_rgba(79,70,229,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.15)]'
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

// ==========================================
// 2. Main pyUnit1_1_ProgramMeaning Component
// ==========================================
export default function pyUnit1_1_ProgramMeaning() {
  const [activeTab, setActiveTab] = useState('components'); // 'components' | 'evolution'
  
  // Tab 1: Code Component Inspector States
  const [selectedToken, setSelectedToken] = useState(null);
  const [namingInput, setNamingInput] = useState('');
  const [inspectorScore, setInspectorScore] = useState(0);
  const [completedDetections, setCompletedDetections] = useState([]);
  
  // Tab 2: Evolution Timeline States
  const [selectedEra, setSelectedEra] = useState('python'); // 'machine', 'assembly', 'c', 'python'
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Source, 2: Translating, 3: Binary, 4: Hardware/CPU
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [cpuState, setCpuState] = useState({ R1: '00000000', IP: '0000', status: 'WAIT' });




  // Code tokens database for inspector
  const codeTokens = [
    { id: 1, text: "# ตรวจสอบคะแนนสอบ", type: "comment", desc: "Comment (คำอธิบายโค้ด): ข้อความอธิบายที่คนเขียนโปรแกรมเขียนทิ้งไว้เพื่อให้ตัวเราหรือผู้อื่นมาอ่านทำความเข้าใจ โดยตัวแปลภาษา Python จะมองข้ามและไม่นำส่วนนี้ไปประมวลผลเด็ดขาด", highlight: "text-slate-500 font-normal italic" },
    { id: 2, text: "score", type: "variable", desc: "Variable (ตัวแปร): ชื่อกล่องหรือพื้นที่หน่วยความจำที่ผู้เขียนโปรแกรมกำหนดขึ้นชั่วคราว เพื่อใช้ในการจัดเก็บข้อมูลประเภทต่างๆ ในที่นี้คือการเก็บตัวเลขคะแนนสอบ", highlight: "text-indigo-600 font-bold" },
    { id: 3, text: "=", type: "operator", desc: "Assignment Operator (ตัวดำเนินการกำหนดค่า): เครื่องหมายเท่ากับหนึ่งตัว ทำหน้าที่ดึงข้อมูลหรือผลลัพธ์จากทางฝั่งขวา (ขวาสุด) ไปจัดเก็บไว้ในตัวแปรทางฝั่งซ้าย", highlight: "text-amber-500 font-semibold" },
    { id: 4, text: "85", type: "datatype", desc: "Data Type: Integer (ชนิดข้อมูล: จำนวนเต็ม): ข้อมูลตัวเลขที่ไม่มีจุดทศนิยม สามารถนำไปบวก ลบ คูณ หาร หรือเปรียบเทียบทางคณิตศาสตร์ได้ทันที", highlight: "text-cyan-600 font-bold" },
    { id: 5, text: "\n", type: "newline", desc: "", highlight: "" },
    { id: 6, text: "if", type: "reserved", desc: "Reserved Word (คำสงวน/คำคีย์เวิร์ด): คำสั่งหรือคำพิเศษที่ภาษา Python กำหนดหน้าที่ไว้ชัดเจนในระบบและล็อกสิทธิ์การใช้งานไว้ ห้ามผู้เรียนนำไปตั้งเป็นชื่อตัวแปรเด็ดขาด ในที่นี้คือการเริ่มต้นเงื่อนไขเลือกทำ", highlight: "text-fuchsia-600 font-bold" },
    { id: 7, text: "score", type: "variable", desc: "Variable (ตัวแปร): เป็นการเรียกใช้งานค่าปัจจุบันที่ถูกจัดเก็บอยู่ในตัวแปร 'score' (ซึ่งขณะนี้มีค่าเป็น 85) เพื่อส่งต่อไปยังกระบวนการเปรียบเทียบเงื่อนไข", highlight: "text-indigo-600 font-bold" },
    { id: 8, text: ">=", type: "comparison", desc: "Comparison Operator (ตัวดำเนินการเปรียบเทียบ): สัญลักษณ์เพื่อตรวจสอบเงื่อนไขความสัมพันธ์ว่าค่าของตัวแปรฝั่งซ้ายมากกว่าหรือเท่ากับค่าฝั่งขวาหรือไม่ ผลลัพธ์จะเป็น จริง (True) หรือ เท็จ (False)", highlight: "text-amber-500 font-semibold" },
    { id: 9, text: "80", type: "datatype", desc: "Data Type: Integer (ชนิดข้อมูล: จำนวนเต็ม): เกณฑ์คะแนนที่นำมาเปรียบเทียบ", highlight: "text-cyan-600 font-bold" },
    { id: 10, text: ":", type: "syntax", desc: "Syntax Symbol (สัญลักษณ์ไวยากรณ์): เครื่องหมายทวิภาค (Colon) ใช้ปิดท้ายประโยคเงื่อนไขเพื่อส่งสัญญาณว่าคำสั่งย่อยต่อจากนี้จะถูกย่อหน้าเข้าไปในบล็อกการทำงาน (Indentation Block)", highlight: "text-zinc-800 font-bold" },
    { id: 11, text: "\n    ", type: "newline", desc: "", highlight: "" },
    { id: 12, text: "print", type: "function", desc: "Built-in Function (ฟังก์ชันมาตรฐาน): ฟังก์ชันสำเร็จรูปที่ระบบจัดเตรียมไว้ให้ใช้งานได้ทันที มีหน้าที่นำข้อมูลหรืออาร์กิวเมนต์ที่ป้อนในวงเล็บ ส่งออกไปจัดแสดงผลบนหน้าจออุปกรณ์แสดงผล", highlight: "text-emerald-600 font-semibold" },
    { id: 13, text: "(\"ผ่านเกณฑ์!\")", type: "datatype_str", desc: "Data Type: String (ชนิดข้อมูล: สายอักขระ/ข้อความ): กลุ่มตัวอักษรใดๆ ที่ต้องล้อมรอบด้วยเครื่องหมายคำพูดคู่ (Double Quotes) หรือคำพูดเดี่ยว (Single Quotes) เพื่อบอกระบบให้มองข้อมูลเป็นข้อความดิบ", highlight: "text-teal-600 font-medium" },
  ];

  // Naming sandbox validator function
  const validateVariableName = (name) => {
    const rules = {
      notEmpty: name.trim().length > 0,
      notStartDigit: !/^[0-9]/.test(name),
      onlyAllowedChars: /^[a-zA-Z0-9_]*$/.test(name),
      notReserved: !['if', 'else', 'elif', 'for', 'while', 'def', 'class', 'import', 'return', 'and', 'or', 'not', 'is', 'in', 'try', 'except', 'None', 'True', 'False'].includes(name.trim()),
    };
    return rules;
  };

  const nameRules = validateVariableName(namingInput);
  const isNameValid = Object.values(nameRules).every(Boolean);

  const getRuleMessage = () => {
    if (!nameRules.notEmpty) return { text: "กรุณาเริ่มพิมพ์ชื่อตัวแปรเพื่อทดสอบกฎไวยากรณ์...", color: "text-slate-500", icon: HelpCircle };
    if (!nameRules.notStartDigit) return { text: "❌ Syntax Error: ห้ามตั้งชื่อตัวแปรขึ้นต้นด้วยตัวเลขเด็ดขาด!", color: "text-rose-500", icon: XCircle };
    if (!nameRules.onlyAllowedChars) return { text: "❌ Syntax Error: ชื่อตัวแปรมีสัญลักษณ์พิเศษหรือช่องว่าง! (อนุญาตเฉพาะอักษร, ตัวเลข และ _)", color: "text-rose-500", icon: XCircle };
    if (!nameRules.notReserved) return { text: "❌ Syntax Error: ชื่อนี้คือ 'คำสงวน (Reserved Word)' ที่ถูกล็อกฟังก์ชันโดยภาษา Python!", color: "text-amber-500", icon: AlertTriangle };
    return { text: "✅ ถูกต้องยอดเยี่ยม! ชื่อตัวแปรเป็นไปตามกฎไวยากรณ์ภาษาคอมพิวเตอร์และทำงานได้จริง", color: "text-emerald-500", icon: CheckCircle2 };
  };

  const validationStatus = getRuleMessage();

  const handleSelectToken = (token) => {
    if (token.type === 'newline') return;
    setSelectedToken(token);
    if (!completedDetections.includes(token.id)) {
      setCompletedDetections(prev => {
        const next = [...prev, token.id];
        // Only count distinct educational element types (variable, datatype, reserved, etc.)
        const uniqueTypes = new Set(next.map(id => codeTokens.find(t => t.id === id).type));
        setInspectorScore(uniqueTypes.size);
        return next;
      });
    }
  };

  // Tab 2: Evolution Era Data
  const eras = {
    machine: {
      name: "1G: Machine Language",
      title: "ยุคภาษาเครื่อง (ช่วงปี 1940s)",
      desc: "เป็นภาษาเดียวที่หน่วยประมวลผลฮาร์ดแวร์เข้าใจอย่างแท้จริง เขียนขึ้นจากตัวเลขฐานสอง 0 และ 1 ซึ่งแทนค่าสัญญาณไฟฟ้าเปิด/ปิดของวงจร ทรานซิสเตอร์ หรือหลอดสุญญากาศ การเขียนโค้ดยากระดับสูงสุดและไม่มีระบบอำนวยความสะดวกใดๆ",
      code: "10110000 01010101",
      translator: "ไม่ต้องผ่านตัวแปลภาษา (Hardware Direct Connection)",
      speed: "100%",
      readability: "5%",
      speedVal: 5,
      readVal: 0.5,
      accent: "from-rose-500 to-orange-500",
      themeColor: "text-rose-500 border-rose-200 bg-rose-50",
      logRun: [
        "Connecting mechanical switches to vacuum tubes...",
        "Physical voltage injection set to Register AL (Pin: 8-bit).",
        "Loading binary instruction 10110000 (opcode for LOAD AL).",
        "Loading binary data 01010101 (constant value 85).",
        "Hardware Arithmetic Logic Unit (ALU) executed instantly.",
        "Halt signal generated. Execution completed in 1 CPU cycle."
      ],
      cpuReg: "AL: 01010101 (85)",
    },
    assembly: {
      name: "2G: Assembly Language",
      title: "ยุคภาษาแอสเซมบลี (ช่วงปี 1950s)",
      desc: "สร้างขึ้นเพื่อแก้ไขความยากลำบากของภาษาเครื่อง โดยใช้คำคีย์เวิร์ดที่เป็นรหัสช่วยจำภาษาอังกฤษสั้นๆ (Mnemonics) เช่น ADD, SUB, MOV แทนการพิมพ์เลขฐานสอง แต่ยังจำเป็นต้องส่งผ่านตัวแปลพิเศษ (Assembler) เพื่อกลับให้กลายเป็นรหัสไฟฟ้า 0 และ 1 เสมอ",
      code: "MOV AL, 85",
      translator: "ผ่านล่ามแปลรหัส Assembler (แปลงโครงสร้างแบบ 1 ต่อ 1)",
      speed: "98%",
      readability: "25%",
      speedVal: 4.8,
      readVal: 1.5,
      accent: "from-amber-500 to-yellow-500",
      themeColor: "text-amber-500 border-amber-200 bg-amber-50",
      logRun: [
        "Reading source file: source.asm",
        "Initializing Assembler Engine...",
        "Parsing command: MOV (opcode 10110000) target: AL",
        "Parsing operand: 85 (converted to binary 01010101)",
        "Assembler successfully generated source.bin (16 bytes).",
        "Sending binary instructions to CPU Instruction Register...",
        "AL Register updated to binary 01010101. Process finished."
      ],
      cpuReg: "AL: 01010101 (85)",
    },
    c: {
      name: "3G: Structured Language",
      title: "ยุคภาษาระดับสูง (ช่วงปี 1970s - C Language)",
      desc: "เป็นยุคที่เปลี่ยนทิศทางการโปรแกรมให้มนุษย์สามารถเขียนนิพจน์คณิตศาสตร์และสมการได้อิสระ โดยใช้ตัวแปลภาษาประเภท Compiler ตรวจสอบความถูกต้องของไวยากรณ์ทั้งโปรแกรมให้เสร็จสิ้นก่อน แล้วบันทึกรวมเป็นไฟล์รันคำสั่ง (.exe หรือ Binary) เพื่อส่งให้ระบบปฏิบัติการนำไปเรียกเปิดงานรันได้รวดเร็วทันใจ",
      code: "int score = 85;",
      translator: "ใช้ตัวประมวลคอมไพเลอร์ Compiler (แปลทั้งหน้ากลายเป็น Binary ก่อนรัน)",
      speed: "85%",
      readability: "70%",
      speedVal: 4.2,
      readVal: 3.5,
      accent: "from-cyan-500 to-indigo-500",
      themeColor: "text-cyan-500 border-cyan-200 bg-cyan-50",
      logRun: [
        "Calling GCC Compiler for main.c...",
        "Step 1: Syntax Analysis & Lexer check: OK",
        "Step 2: Memory allocation logic. Mapping variable 'score' to offset [ESP-4].",
        "Step 3: Generating Assembly Code: mov dword [esp-4], 85",
        "Step 4: Compiling to Machine Code. Linking stdio libraries.",
        "Linker completed. Executable main.exe generated successfully.",
        "Executing main.exe: Variable 'score' loaded with value 85 in RAM stack."
      ],
      cpuReg: "Stack: Offset [85]",
    },
    python: {
      name: "4G+: Modern Language",
      title: "ภาษายุคใหม่ที่เน้นมนุษย์เป็นศูนย์กลาง (Python - 1990s+)",
      desc: "เป้าหมายหลักคือการเขียนง่าย กระชับ ไร้ความหยุมหยิมของสัญลักษณ์ ตัวโค้ดมีความใกล้เคียงการบอกเล่าภาษาอังกฤษปกติเกือบ 100% ตัวแปลภาษาจะทำงานเป็นแบบล่ามทีละบรรทัด (Interpreter) รันโค้ดทันทีโดยไม่ต้องรอคอมไพล์ สะดวกสบาย รวดเร็ว มีระบบจัดการความจำอัตโนมัติ",
      code: "score = 85",
      translator: "ใช้ตัวแปลแบบล่าม Interpreter (อ่านและดำเนินการทีละบรรทัดเรียลไทม์)",
      speed: "60%",
      readability: "100%",
      speedVal: 3.0,
      readVal: 5.0,
      accent: "from-indigo-600 via-purple-600 to-cyan-500",
      themeColor: "text-indigo-600 border-indigo-200 bg-indigo-50",
      logRun: [
        "Python 3.x Engine initialized.",
        "Reading current line: score = 85",
        "Dynamically checking data type: detected integer (int).",
        "Allocating memory address on Heap segment.",
        "Binding reference label 'score' to memory address.",
        "Value 85 successfully set in virtual environment variables.",
        "Garbage Collector verified. Ready for next line."
      ],
      cpuReg: "Heap Var 'score' -> 85",
    }
  };

  const handleSimulate = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setSimLogs([]);
    setCpuState({ R1: '00000000', IP: '0000', status: 'LOAD' });

    const eraData = eras[selectedEra];
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Phase 1: Source
    setSimLogs([{ text: `[1/4] ตรวจพบคำสั่งของ ${eraData.name}`, type: 'sys' }]);
    await sleep(700);
    setSimLogs(prev => [...prev, { text: `-> Source Code: "${eraData.code}"`, type: 'info' }]);
    await sleep(900);

    // Phase 2: Translation
    setSimStep(2);
    setSimLogs(prev => [...prev, { text: `[2/4] เริ่มส่งคำสั่งเข้ากระบวนการแปลความหมาย`, type: 'sys' }]);
    await sleep(600);
    setSimLogs(prev => [...prev, { text: `-> ตัวแปลภาษา: ${eraData.translator}`, type: 'info' }]);
    await sleep(800);
    for (let i = 0; i < Math.min(3, eraData.logRun.length); i++) {
      setSimLogs(prev => [...prev, { text: eraData.logRun[i], type: 'process' }]);
      await sleep(500);
    }

    // Phase 3: Binary
    setSimStep(3);
    setSimLogs(prev => [...prev, { text: `[3/4] สัญญาณผ่านการเข้ารหัสรหัสไฟฟ้า (เลขฐานสอง)`, type: 'sys' }]);
    await sleep(700);
    setSimLogs(prev => [...prev, { text: `-> รหัสเครื่องที่เกิดขึ้น: "10110000 01010101"`, type: 'success' }]);
    await sleep(900);

    // Phase 4: Hardware/CPU
    setSimStep(4);
    setCpuState({ R1: '01010101', IP: '0001', status: 'EXEC' });
    setSimLogs(prev => [...prev, { text: `[4/4] สัญญาณไฟฟ้าส่งตรงไปยังแกนรีจิสเตอร์ของตัวประมวลผล CPU`, type: 'sys' }]);
    await sleep(700);
    setSimLogs(prev => [...prev, { text: `-> อัปเดตรีจิสเตอร์: ${eraData.cpuReg}`, type: 'success' }]);
    setSimLogs(prev => [...prev, { text: `-> [HALT] การประมวลผลคำสั่งสำเร็จสมบูรณ์ 100%!`, type: 'success' }]);
    
    setIsSimulating(false);
  };

  const handleResetSim = () => {
    setSimStep(0);
    setIsSimulating(false);
    setSimLogs([]);
    setCpuState({ R1: '00000000', IP: '0000', status: 'WAIT' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-800 pb-24 relative overflow-hidden">
      
      {/* Layer 1: Ambient Backdrop (Soft Pastel Blurs) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-300/25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-300/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-amber-300/15 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Standardized Hero Header (Theme Gradient) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200">
                บทเรียนหลักสูตรคอมพิวเตอร์เบื้องต้น
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-600 border border-cyan-200">
                รหัสวิชา 21910-1003
              </span>
            </div>
            
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 mb-2 uppercase">
              หน่วยที่ 1: หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              1.1 แนะนำภาษาคอมพิวเตอร์และโปรแกรม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                (Introduction to Computer Languages and Programming)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-indigo-500 pl-6 mt-4 relative">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              ภาษาคอมพิวเตอร์คือระบบสัญลักษณ์ที่ใช้สื่อสารเจตนารมณ์ของมนุษย์ไปยังฮาร์ดแวร์อิเล็กทรอนิกส์ ในหน้านี้เราจะมาเจาะลึก <strong>องค์ประกอบพื้นฐาน 4 ด้าน</strong> และย้อนเวลาสำรวจ <strong>วิวัฒนาการในการแปลความหมายคำสั่ง</strong> ทีละบรรทัดผ่านระบบ Interactive Sandbox
            </p>
          </div>
        </div>
      </header>

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation Tabs (Chips Selector) */}
        <div className="flex items-center gap-2 mb-8 bg-zinc-200/50 p-1.5 rounded-2xl w-fit border border-zinc-200/60 shadow-inner">
          <button 
            onClick={() => setActiveTab('components')}
            className={`inline-flex items-center px-5 h-[38px] rounded-xl text-xs font-bold transition-all duration-300 ${
              activeTab === 'components' 
                ? 'bg-[#4F46E5] text-white border-transparent shadow-md' 
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Code2 className="w-4 h-4 mr-2" />
            1.1.1 องค์ประกอบของภาษาคอมพิวเตอร์
          </button>
          
          <button 
            onClick={() => setActiveTab('evolution')}
            className={`inline-flex items-center px-5 h-[38px] rounded-xl text-xs font-bold transition-all duration-300 ${
              activeTab === 'evolution' 
                ? 'bg-[#4F46E5] text-white border-transparent shadow-md' 
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <History className="w-4 h-4 mr-2" />
            1.1.2 ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์
          </button>
        </div>

        {/* Tab CONTENT 1: Code Components & Variables */}
        {activeTab === 'components' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Box: Interactive Inspector */}
            <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 bg-slate-50/50 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">เครื่องมือวิเคราะห์องค์ประกอบโปรแกรม (Code Component Inspector)</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    ทดลองจิ้มคำศัพท์หรือสัญลักษณ์ในกล่องโค้ด Python เพื่อแยกแยะ <strong>ไวยากรณ์ (Syntax)</strong>, <strong>ความหมาย (Semantics)</strong>, <strong>คำสงวน (Reserved Word)</strong> และ <strong>ชนิดข้อมูล (Data Type)</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                  <span className="text-xs font-bold text-indigo-800">
                    สำรวจแล้ว: {inspectorScore} / 5 หมวดหมู่
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left side: Code display */}
                <div className="col-span-1 lg:col-span-6 p-6 md:p-8 border-r border-zinc-100 flex flex-col justify-center">
                  <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">กล่องรหัสโปรแกรม (Python Source)</span>
                  <div className="bg-[#18181B] p-6 rounded-2xl shadow-inner text-sm md:text-base font-mono leading-loose relative overflow-x-auto">
                    <div className="absolute top-2 right-3 text-[10px] text-zinc-500 uppercase tracking-wider select-none">Python Code</div>
                    
                    <pre className="text-zinc-100 select-none whitespace-pre-wrap">
                      {codeTokens.map((token) => {
                        if (token.type === 'newline') {
                          return <span key={token.id}>{token.text}</span>;
                        }
                        
                        let isSelected = selectedToken?.id === token.id;
                        let tokenBg = isSelected 
                          ? 'bg-indigo-500 text-white font-bold ring-4 ring-indigo-500/20' 
                          : 'hover:bg-zinc-800 text-zinc-300 cursor-pointer';

                        return (
                          <span
                            key={token.id}
                            onClick={() => handleSelectToken(token)}
                            className={`px-1.5 py-0.5 rounded transition-all duration-150 inline-block my-0.5 mx-0.5 ${tokenBg}`}
                          >
                            {token.text}
                          </span>
                        );
                      })}
                    </pre>
                  </div>
                  <span className="text-[11px] text-zinc-400 mt-4 leading-relaxed italic block">
                    💡 คลิกคำหรือสัญลักษณ์ใดๆ ในกล่องรหัสสีดำเพื่อตรวจวิเคราะห์ความหมาย
                  </span>
                </div>

                {/* Right side: Explanation output panel */}
                <div className="col-span-1 lg:col-span-6 p-6 md:p-8 bg-slate-50/20 flex flex-col justify-between">
                  <div className="h-full flex flex-col justify-center">
                    {selectedToken ? (
                      <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            selectedToken.type === 'comment' ? 'bg-slate-100 text-slate-700' :
                            selectedToken.type === 'variable' ? 'bg-indigo-100 text-indigo-700 font-bold' :
                            selectedToken.type === 'operator' || selectedToken.type === 'comparison' ? 'bg-amber-100 text-amber-700' :
                            selectedToken.type === 'reserved' ? 'bg-fuchsia-100 text-fuchsia-700' :
                            selectedToken.type === 'syntax' ? 'bg-zinc-100 text-zinc-800' : 'bg-teal-100 text-teal-700'
                          }`}>
                            {selectedToken.type.toUpperCase()}
                          </span>
                          <span className="text-xs font-medium text-slate-400">องค์ประกอบวิเคราะห์</span>
                        </div>

                        <h4 className="text-2xl font-extrabold text-slate-800">
                          {selectedToken.text.replace(/\n/g, '')}
                        </h4>

                        <div className="p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm text-sm text-slate-600 leading-relaxed font-sans">
                          {selectedToken.desc}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 px-6 flex flex-col items-center justify-center">
                        <Info className="w-12 h-12 text-slate-300 mb-3 animate-pulse" />
                        <h4 className="text-base font-bold text-slate-700">รอการเลือกองค์ประกอบในโค้ด</h4>
                        <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
                          กดเลือกคำสั่งใด ๆ ในกล่องรหัสฝั่งซ้าย เพื่อแยกแยะวิเคราะห์องค์ประกอบหลักสูตรทีละชิ้นส่วนแบบอินเทอร์แอกทีฟ
                        </p>
                      </div>
                    )}
                  </div>

                  {inspectorScore === 5 && (
                    <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 animate-in zoom-in-95 duration-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-emerald-800">สุดยอด! สำรวจองค์ประกอบครบถ้วน</h5>
                        <p className="text-[11px] text-emerald-600 leading-relaxed mt-0.5">คุณเข้าใจองค์ประกอบของภาษาคอมพิวเตอร์ครบถ้วนทั้งกฎไวยากรณ์ (Syntax), ความหมาย (Semantics), คำสงวน และชนิดข้อมูล เรียบร้อยแล้วครับ</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box: Naming Sandbox */}
            <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8">
              <div className="mb-6">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">กล่องทดสอบปฏิบัติจริง (Live Variable Sandbox)</span>
                <h3 className="text-2xl font-bold text-slate-800">ทดลองกฎไวยากรณ์: กฎการตั้งชื่อตัวแปร (Variable Naming Checker)</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  ในกฎไวยากรณ์ (Syntax) ของภาษาคอมพิวเตอร์ทั่วไป การตั้งชื่อตัวแปรมีข้อจำกัดที่เคร่งครัด ลองพิมพ์ตั้งชื่อลงในกล่องข้อความด้านล่าง เพื่อส่งชื่อไปให้ระบบตรวจสอบความถูกต้องแบบวินาทีต่อวินาที
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Input block */}
                <div className="col-span-1 lg:col-span-6 space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">ป้อนชื่อตัวแปรของคุณ:</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={namingInput}
                        onChange={(e) => setNamingInput(e.target.value.replace(/[^a-zA-Z0-9_\s]/g, ''))} // Filter weird characters
                        placeholder="เช่น student_score, player1"
                        maxLength={30}
                        className="w-full h-[46px] px-4 py-2 bg-white border border-zinc-300 text-slate-800 placeholder-zinc-400 text-sm font-semibold rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono"
                      />
                      {namingInput.length > 0 && (
                        <button 
                          onClick={() => setNamingInput('')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          ล้างค่า
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rules Checklist */}
                  <div className="bg-slate-50 border border-zinc-200/60 rounded-2xl p-4 space-y-2.5 font-sans">
                    <h4 className="text-xs font-bold text-slate-700 mb-1">กฎการตั้งชื่อตัวแปร (Syntax Checklist):</h4>
                    
                    <div className="flex items-center gap-2 text-xs">
                      {namingInput.trim().length > 0 ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block"></span>
                      )}
                      <span className={`${namingInput.trim().length > 0 ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>
                        ห้ามตั้งเว้นว่างเปล่า
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {namingInput.trim().length > 0 && nameRules.notStartDigit ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : namingInput.trim().length > 0 && !nameRules.notStartDigit ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block"></span>
                      )}
                      <span className={`${namingInput.trim().length > 0 && nameRules.notStartDigit ? 'text-emerald-700 font-medium' : namingInput.trim().length > 0 && !nameRules.notStartDigit ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                        ห้ามเริ่มต้นด้วยตัวเลข (เช่น 2score ❌)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {namingInput.trim().length > 0 && nameRules.onlyAllowedChars ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : namingInput.trim().length > 0 && !nameRules.onlyAllowedChars ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block"></span>
                      )}
                      <span className={`${namingInput.trim().length > 0 && nameRules.onlyAllowedChars ? 'text-emerald-700 font-medium' : namingInput.trim().length > 0 && !nameRules.onlyAllowedChars ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                        ห้ามมีสัญลักษณ์พิเศษ หรือ เว้นวรรค (ยกเว้น _ ได้)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {namingInput.trim().length > 0 && nameRules.notReserved ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : namingInput.trim().length > 0 && !nameRules.notReserved ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 inline-block"></span>
                      )}
                      <span className={`${namingInput.trim().length > 0 && nameRules.notReserved ? 'text-emerald-700 font-medium' : namingInput.trim().length > 0 && !nameRules.notReserved ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>
                        ห้ามใช้คำสงวนในภาษา Python (เช่น if, else, def ❌)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Validation status block */}
                <div className="col-span-1 lg:col-span-6 bg-slate-50/50 border border-zinc-200 rounded-3xl p-6 h-full flex flex-col justify-center text-center">
                  <div className="flex justify-center mb-3">
                    <validationStatus.icon className={`w-14 h-14 ${
                      validationStatus.color === 'text-slate-500' ? 'text-slate-400' :
                      validationStatus.color === 'text-rose-500' ? 'text-rose-500 animate-bounce' :
                      validationStatus.color === 'text-amber-500' ? 'text-amber-500 animate-pulse' : 'text-emerald-500'
                    }`} />
                  </div>
                  <h4 className={`text-base font-bold leading-relaxed ${validationStatus.color}`}>
                    {validationStatus.text}
                  </h4>
                  {namingInput.trim().length > 0 && isNameValid && (
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl max-w-sm mx-auto">
                      <p className="text-xs text-indigo-700 font-semibold leading-relaxed">
                        💻 โค้ดตัวอย่างจริง: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-indigo-900 border border-indigo-200">{namingInput.trim()} = 100</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab CONTENT 2: Evolution & Translation Pipelines */}
        {activeTab === 'evolution' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Timeline Selection grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(eras).map((eraKey) => {
                const era = eras[eraKey];
                const isSelected = selectedEra === eraKey;
                
                return (
                  <button
                    key={eraKey}
                    onClick={() => {
                      if (!isSimulating) {
                        setSelectedEra(eraKey);
                        handleResetSim();
                      }
                    }}
                    disabled={isSimulating}
                    className={`p-4 rounded-3xl border text-left flex flex-col justify-between transition-all duration-300 relative ${
                      isSelected 
                        ? 'bg-white border-[#4F46E5] ring-4 ring-[#4F46E5]/10 shadow-md translate-y-[-2px]' 
                        : 'bg-white/80 border-zinc-200 hover:border-zinc-300 shadow-sm opacity-80'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{era.name.split(':')[0]}</span>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">{era.name.split(':')[1]}</h4>
                    
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>รันคำสั่ง</span>
                      <ArrowRight className={`w-3.5 h-3.5 transform transition-transform ${isSelected ? 'translate-x-1 text-indigo-600' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Deep details panel */}
            <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual comparative statistics (Left) */}
                <div className="col-span-1 lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">สเปกรายละเอียดภาษายุคประวัติศาสตร์</span>
                    <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{eras[selectedEra].title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">{eras[selectedEra].desc}</p>
                  </div>

                  {/* Comparative bars */}
                  <div className="bg-slate-50 border border-zinc-200/60 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase mb-1">เปรียบเทียบประสิทธิผลคอมพิวเตอร์:</h4>
                    
                    {/* Readability bar */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                        <span>ความอ่านง่ายสำหรับคน (Readability):</span>
                        <span className="text-indigo-600">{eras[selectedEra].readability}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" 
                          style={{ width: `${(eras[selectedEra].readVal / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Performance bar */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                        <span>ความเร็วรันเครื่อง (Execution Speed):</span>
                        <span className="text-emerald-600">{eras[selectedEra].speed}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                          style={{ width: `${(eras[selectedEra].speedVal / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Program Code Box */}
                  <div className="bg-[#18181B] p-5 rounded-2xl shadow-inner relative font-mono text-sm">
                    <span className="absolute top-2 right-3 text-[10px] text-zinc-500 uppercase tracking-widest font-sans">โค้ดตัวอย่าง</span>
                    <h5 className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-sans font-bold">Code Syntax:</h5>
                    <pre className="text-indigo-300 font-bold select-all whitespace-pre-wrap">{eras[selectedEra].code}</pre>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSimulate}
                      disabled={isSimulating}
                      className={`flex-1 h-[42px] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/10 ${
                        isSimulating 
                          ? 'bg-indigo-300 text-white cursor-not-allowed opacity-75' 
                          : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] active:scale-98'
                      }`}
                    >
                      <Play className="w-4 h-4" /> จำลองการประมวลผลโค้ด
                    </button>
                    {simStep > 0 && (
                      <button
                        onClick={handleResetSim}
                        className="px-3.5 h-[42px] border border-zinc-300 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated Translation Pipeline (Right) */}
                <div className="col-span-1 lg:col-span-7 space-y-6">
                  <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    ท่อประมวลผลคำสั่งทีละขั้น (Translation & Execution Pipeline)
                  </span>

                  {/* Flow Steps layout */}
                  <div className="space-y-4 font-sans text-xs">
                    
                    {/* Step 1: Input Code */}
                    <div className={`p-4 border rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 ${
                      simStep >= 1 ? 'bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-500/10' : 'bg-slate-50 border-zinc-200 opacity-60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center ${
                          simStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>1</span>
                        <div>
                          <h4 className="font-bold text-slate-800">Source Input (รหัสต้นฉบับ)</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">รับข้อความคำสั่งจากภาษาในยุคนั้น ๆ เข้าสู่ระบบประมวลผล</p>
                        </div>
                      </div>
                      {simStep >= 1 && <span className="font-mono text-[11px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">{eras[selectedEra].code}</span>}
                    </div>

                    {/* Step 2: Translation System */}
                    <div className={`p-4 border rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 ${
                      simStep >= 2 ? 'bg-white border-fuchsia-500 shadow-sm ring-1 ring-fuchsia-500/10' : 'bg-slate-50 border-zinc-200 opacity-60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center ${
                          simStep >= 2 ? 'bg-fuchsia-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>2</span>
                        <div>
                          <h4 className="font-bold text-slate-800">Translator & Lexer Stage (ตัวแปลภาษา)</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">การวิเคราะห์แปลความหมายข้ามรูปแบบของไวยากรณ์</p>
                        </div>
                      </div>
                      {simStep >= 2 && <span className="text-[11px] font-bold text-fuchsia-600 bg-fuchsia-50 px-2.5 py-1 rounded-lg border border-fuchsia-200">
                        {selectedEra === 'machine' ? 'Hardware Direct' : selectedEra === 'assembly' ? 'Assembler' : selectedEra === 'c' ? 'Compiler' : 'Interpreter'}
                      </span>}
                    </div>

                    {/* Step 3: Binary Code Generation */}
                    <div className={`p-4 border rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 ${
                      simStep >= 3 ? 'bg-white border-cyan-500 shadow-sm ring-1 ring-cyan-500/10' : 'bg-slate-50 border-zinc-200 opacity-60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center ${
                          simStep >= 3 ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>3</span>
                        <div>
                          <h4 className="font-bold text-slate-800">Machine Code Generation (รหัสเครื่องฐานสอง)</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">เปลี่ยนกลุ่มคำสั่งให้กลายเป็นรหัสเปิด/ปิดสัญญาณไฟฟ้า (เลขฐานสอง)</p>
                        </div>
                      </div>
                      {simStep >= 3 && <span className="font-mono text-[11px] font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200 tracking-tighter">10110000 01010101</span>}
                    </div>

                    {/* Step 4: CPU Physical Registers */}
                    <div className={`p-4 border rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 ${
                      simStep >= 4 ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/10' : 'bg-slate-50 border-zinc-200 opacity-60'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center ${
                          simStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>4</span>
                        <div>
                          <h4 className="font-bold text-slate-800">CPU Registers Execution (จัดประมวลผลฮาร์ดแวร์)</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">กระแสไฟฟ้าวิ่งตรงเข้าขับเคลื่อนกลไกวงจร ALU และ Register สำเร็จ</p>
                        </div>
                      </div>
                      {simStep >= 4 && <span className="font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">CPU Loaded!</span>}
                    </div>

                  </div>
                </div>

              </div>

              {/* VS Code Terminal Console Output */}
              <div className="bg-[#121214] rounded-2xl border border-zinc-800 mt-8 overflow-hidden font-mono text-xs shadow-lg">
                <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-[10px] uppercase tracking-wider">Console Terminal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                </div>

                <div className="p-4 h-40 overflow-y-auto space-y-1.5 text-zinc-300 leading-relaxed font-mono select-text">
                  <div className="flex gap-2 text-zinc-500 select-none">
                    <span>[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                    <span className="text-zinc-600">[SYS] Ready for emulation. Press 'จำลองการประมวลผลโค้ด'...</span>
                  </div>
                  
                  {simLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                      <span className="text-zinc-600 shrink-0 select-none">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                      <span className={`font-bold uppercase shrink-0 w-12 select-none ${
                        log.type === 'sys' ? 'text-indigo-400' :
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'process' ? 'text-fuchsia-400' : 'text-zinc-400'
                      }`}>
                        {log.type === 'sys' ? 'STAGE' : log.type === 'success' ? ' DONE' : log.type === 'process' ? ' PROC' : ' INFO'}
                      </span>
                      <span className={
                        log.type === 'sys' ? 'text-indigo-200 font-semibold' :
                        log.type === 'success' ? 'text-emerald-300 font-semibold' :
                        log.type === 'process' ? 'text-fuchsia-200' : 'text-zinc-300'
                      }>
                        {log.text}
                      </span>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* Layer 4: Standardized TeacherTask Footer */}
        <div className="relative z-10">
          <TeacherTask 
            title="ภารกิจประจำบทเรียน: การวิเคราะห์และจำแนกส่วนประกอบโปรแกรม" 
            taskText={`[โจทย์ปฏิบัติประจำบทเรียน 1.1]
1. ให้นักเรียนทำการศึกษาจำแนกส่วนประกอบของรหัสโค้ดภาษาคอมพิวเตอร์ต่อไปนี้ โดยแยกแยะระบุให้ถูกต้องว่าส่วนใดคือ ไวยากรณ์ (Syntax), ความหมาย (Semantics), คำสงวน (Reserved Word) หรือชนิดข้อมูล (Data Type):
   โค้ดตั้งต้น:
   x = 10
   if x > 5:
       print("Large")

2. จงตรวจสอบชื่อตัวแปรที่ระบุด้านล่างนี้ ว่าเป็นไปตามกฎไวยากรณ์ (Syntax) ที่ทดลองใน Variable Naming Sandbox หรือไม่ หากผิดกฎ ให้บอกเหตุผลประกอบ:
   A. student_score
   B. 2nd_player
   C. class
   D. total value`} 
          />
        </div>

      </main>

    </div>
  );
}
