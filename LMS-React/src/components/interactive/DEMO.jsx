import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Terminal, 
  Layers, 
  Cpu, 
  Code2, 
  BookOpen, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  Globe,
  HelpCircle,
  HelpCircle as QuizIcon,
  Play
} from 'lucide-react';

// ============================================================================
// LAYER 4: STANDARD TEACHERTASK COMPONENT (กิจกรรมปฏิบัติในห้องเรียน)
// ============================================================================
const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-20 rounded-3xl p-[1px] overflow-hidden group">
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

// ============================================================================
// MAIN LESSON INTERACTIVE COMPONENT
// ============================================================================
export default function DEMO() {
  const [activeTab, setActiveTab] = useState('components'); // 'components' (1.1.1) or 'evolution' (1.1.2)
  const [selectedToken, setSelectedToken] = useState(null); // Tokens for 1.1.1
  const [evoIndex, setEvoIndex] = useState(0); // Index for 1.1.2
  const [logs, setLogs] = useState([]);
  const consoleEndRef = useRef(null);

  const addLog = (msg, type = "info") => {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time: timeStr, msg, type }]);
  };

  // Auto-scroll console
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Initial tab logs
  useEffect(() => {
    if (activeTab === 'components') {
      setLogs([{ time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: "Initializing Code Lexical & Syntax Analyzer...", type: "sys" }]);
      addLog("Lexer configuration loaded. Syntax highlighting ready.", "success");
      addLog("Click on any highlighted token of the code snippet below to parse its lexical meaning.", "info");
    } else {
      setLogs([{ time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: "Booting Language Evolution Simulator...", type: "sys" }]);
      addLog("History matrix generated. Assembler, Compiler and Interpreter layers synced.", "success");
      addLog("Select an era from the timeline to simulate compilation and translation stages.", "info");
    }
    setSelectedToken(null);
  }, [activeTab]);

  // --- 1.1.1 Language Components Data ---
  const codeTokens = [
    { id: 'if', text: 'if', type: 'reserved', name: 'คำสงวน (Reserved Word)', desc: 'เป็นคำสั่งพิเศษที่ถูกจองไว้โดยภาษา Python มีหน้าที่กำหนดรูปแบบทางตรรกศาสตร์ (การตัดสินใจเงื่อนไข) ห้ามนำคำนี้ไปตั้งเป็นชื่อตัวแปรโดยเด็ดขาด' },
    { id: 'age', text: ' age ', type: 'variable', name: 'ตัวแปร (Variable)', desc: 'ชื่อที่ใช้อ้างอิงแทนตำแหน่งบนหน่วยความจำสำหรับจัดเก็บข้อมูลเพื่อนำไปประมวลผล ในที่นี้ใช้จัดเก็บข้อมูลอายุของผู้ใช้งาน' },
    { id: 'op', text: '>=', type: 'operator', name: 'ตัวดำเนินการ (Operator)', desc: 'เครื่องหมายที่ใช้เปรียบเทียบหรือประมวลผล ในที่นี้คือเครื่องหมายเปรียบเทียบค่า "มากกว่าหรือเท่ากับ" เพื่อประเมินผลลัพธ์เป็นค่าตรรกศาสตร์' },
    { id: 'val1', text: ' 18', type: 'datatype', name: 'ชนิดข้อมูล: จำนวนเต็ม (Integer / Data Type)', desc: 'ประเภทของข้อมูลที่ใช้ประมวลผล ในที่นี้คือเลข 18 ซึ่งเป็นจำนวนเต็มที่ไม่มีทศนิยม (int)' },
    { id: 'colon', text: ':', type: 'syntax', name: 'ไวยากรณ์ควบคุมบล็อก (Syntax / Colon)', desc: 'เครื่องหมายไวยากรณ์ภาคบังคับใน Python ที่ใช้ระบุเพื่อบอกขอบเขตการเริ่มต้นบล็อกชุดคำสั่งถัดไปหลังจากวิเคราะห์เงื่อนไข' },
    { id: 'indent', text: '    ', type: 'syntax_indent', name: 'ย่อหน้าบังคับ (Indentation / Syntax)', desc: 'เครื่องหมายสำคัญสูงสุดทางไวยากรณ์ของ Python แทนการใช้วงเล็บปีกกา เพื่อบอกว่าบรรทัดคำสั่งนี้อยู่ภายใต้บล็อกคำสั่ง if ด้านบน' },
    { id: 'print', text: 'print', type: 'reserved', name: 'ฟังก์ชันสำเร็จรูป (Built-in Function)', desc: 'ชุดคำสั่งพื้นฐานที่ติดมากับภาษา มีหน้าที่สั่งการให้อุปกรณ์ส่งข้อมูลออกไปแสดงผลทางอุปกรณ์แสดงผลภายนอก (เช่น หน้าจอ Terminal)' },
    { id: 'val2', text: '("Welcome")', type: 'datatype_str', name: 'ชนิดข้อมูล: ข้อความ (String / Data Type)', desc: 'ประเภทข้อมูลชนิดตัวอักษรหรือข้อความ (str) บังคับห่อด้วยเครื่องหมายอัญประกาศคู่หรือคี่ เพื่อแยกแยะออกจากรหัสคำสั่ง' }
  ];

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    addLog(`Lexical Analysis: Token [${token.text.trim()}] classified as ${token.name}.`, "success");
  };

  // --- 1.1.2 Evolution Data ---
  const evolutionEras = [
    {
      year: "1940s",
      title: "ภาษาเครื่อง (Machine Language)",
      code: `01001000 01001001\n00000000 00000001\n11100011 01011011`,
      translator: "ไม่ต้องแปล (Hardware Direct Execution)",
      pros: "ทำงานเร็วที่สุด กินทรัพยากรน้อยที่สุด เพราะประมวลผลผ่านตัวเครื่องได้โดยตรง",
      cons: "เขียนและทำความเข้าใจยากที่สุด มีปัญหาสระลอยและพิมพ์พลาดง่าย เพราะมีแต่เลข 0 และ 1",
      desc: "ภาษาคอมพิวเตอร์ยุคแรกเริ่มที่เขียนขึ้นด้วยเลขฐานสอง (Binary Code) เพื่อกระตุ้นกระแสไฟฟ้าระดับฮาร์ดแวร์โดยตรง มนุษย์ต้องจำชุดรหัสคำสั่งเฉพาะของ CPU แต่ละตระกูล",
      glow: "from-amber-500 to-orange-600",
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      year: "1950s",
      title: "ภาษาแอสเซมบลี (Assembly Language)",
      code: `MOV AX, 18\nCMP AX, 10\nJGE WELCOME_MSG\nWELCOME_MSG:\n  PRINT "Welcome"`,
      translator: "ตัวแปลภาษาแอสเซมเบลอร์ (Assembler)",
      pros: "อ่านง่ายขึ้นกว่าเลข 0 และ 1, มีรหัสจำช่วยงาน (Mnemonics) ช่วยให้มนุษย์เขียนคำสั่งได้รวดเร็วขึ้น",
      cons: "ยังคงผูกติดกับโครงสร้าง CPU ชนิดเฉพาะตัว ไม่สามารถนำโค้ดไปรันข้ามสถาปัตยกรรมชิปเซ็ตได้",
      desc: "ภาษาระดับต่ำยุคที่สองที่ใช้ตัวอักษรภาษาอังกฤษย่อสั้นๆ (เช่น MOV, ADD, CMP) เข้ามาแทนรหัสเลขฐานสอง โดยใช้ตัวแปลภาษา Assembler เพื่อแปลงกลับไปเป็นรหัสเครื่อง",
      glow: "from-cyan-500 to-blue-600",
      accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      year: "1970s",
      title: "ภาษาระดับสูง (High-Level / C Language)",
      code: `#include <stdio.h>\nint main() {\n    int age = 18;\n    if (age >= 18) {\n        printf("Welcome");\n    }\n    return 0;\n}`,
      translator: "คอมไพเลอร์ (Compiler / แปลทีเดียวทั้งไฟล์)",
      pros: "มีไวยากรณ์คล้ายภาษาอังกฤษและคณิตศาสตร์ รันข้ามระบบปฏิบัติการได้ (Cross-platform) หลังผ่านการคอมไพล์",
      cons: "ต้องระบุชนิดข้อมูลอย่างเคร่งครัด ลืมปิดปีกกาหรือเซมิโคลอน (;) จะคอมไพล์ไม่ผ่านทันที",
      desc: "ยุคปฏิวัติวงการเขียนโปรแกรมด้วยภาษาที่เหมือนภาษามนุษย์ มีโครงสร้างชัดเจน ไม่ขึ้นกับฮาร์ดแวร์ จัดการหน่วยความจำได้ทรงประสิทธิภาพ มีเครื่องมือ Compiler แปลงรวดเดียวได้ไฟล์รันสำเร็จรูป (.exe)",
      glow: "from-purple-500 to-indigo-600",
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    {
      year: "1990s+",
      title: "ภาษาระดับสูงมาก (Modern Python)",
      code: `age = 18\nif age >= 18:\n    print("Welcome")`,
      translator: "อินเตอร์พรีเตอร์ (Interpreter / แปลและรันทีละบรรทัด)",
      pros: "เขียนสั้น กระชับ อ่านเข้าใจง่ายเหมือนเขียนเรียงความภาษาอังกฤษ ไม่มีวงเล็บปีกกาหรือเซมิโคลอนกวนใจ",
      cons: "การรันทีละบรรทัดทำให้อาจทำงานช้ากว่าภาษาที่ถูกคอมไพล์มารวดเดียวเล็กน้อยในการคำนวณขั้นสูง",
      desc: "ภาษาโปรแกรมสมัยใหม่ที่เน้นความง่ายในการเขียนและการทำความเข้าใจของมนุษย์ (Readability) ตัดกฎเกณฑ์ซับซ้อนทิ้ง มีเครื่องแปล Interpreter คอยวิเคราะห์และส่งผลประมวลผลทันที",
      glow: "from-fuchsia-500 to-rose-600",
      accent: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20"
    }
  ];

  const handleEvoChange = (index) => {
    setEvoIndex(index);
    addLog(`Simulation: Selected Era [${evolutionEras[index].year}]. Simulating [${evolutionEras[index].title}]...`, "sys");
    if (index === 0) {
      setTimeout(() => addLog("Direct Hardware trigger active. Zero translator abstraction required.", "success"), 600);
    } else {
      setTimeout(() => addLog(`Source file sent to [${evolutionEras[index].translator}]. Translation complete.`, "success"), 600);
    }
  };

  const teacherTaskContent = `กิจกรรมปฏิบัติ: "วิเคราะห์และถอดรหัสวิวัฒนาการซอฟต์แวร์"

สถานการณ์:
หากนักเรียนได้รับมอบหมายให้เขียนโปรแกรม "คำนวณผลการเรียนเฉลี่ยและเกรดเฉลี่ยของเพื่อนในชั้นเรียน"

คำสั่ง:
1. ให้นักเรียนเปรียบเทียบความแตกต่างระหว่างการเขียนโปรแกรมในยุค "ภาษาเครื่อง (Machine Language)" กับยุคปัจจุบัน "ภาษา Python (High-level Language)" ว่าการเขียนในแต่ละยุคสร้างความยากง่ายและความท้าทายต่อนักพัฒนาต่างกันอย่างไรบ้าง
2. ให้นักเรียนค้นหาตัวอย่างคีย์เวิร์ดของคำที่เป็น "คำสงวน (Reserved Words)" ในภาษา Python นอกเหนือจากคำว่า "if" มาเพิ่มเติมอย่างน้อย 3 คำ พร้อมบอกหน้าที่ของคำนั้นๆ

ตัวอย่างแนวการตอบ:
- ข้อ 1: ภาษาเครื่องเขียนยากเพราะประกอบด้วยรหัสตัวเลข 0 และ 1 ซึ่งมนุษย์ทำความเข้าใจและตรวจหาบั๊กได้ยากมาก ในขณะที่ภาษา Python เขียนง่ายและสั้นเหมือนภาษาอังกฤษทั่วไป ทำให้การประมวลผลพัฒนาได้รวดเร็วและปลอดภัยกว่ามาก
- ข้อ 2: 
  1) "for" -> ใช้สำหรับคำสั่งทำซ้ำตามจำนวนรอบที่ระบุ
  2) "while" -> ใช้สำหรับคำสั่งทำซ้ำจนกว่าเงื่อนไขจะเป็นเท็จ
  3) "else" -> ใช้ระบุชุดคำสั่งเมื่อเงื่อนไขหลักใน if ไม่เป็นจริง`;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans relative overflow-hidden pb-24 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* ============================================================================
          LAYER 1: AMBIENT BACKDROP (พื้นหลังเรืองแสงมีชีวิต)
          ============================================================================ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-200/25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-200/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-amber-200/15 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* ============================================================================
          LAYER 2: STANDARDIZED HERO HEADER (ส่วนหัวบทเรียนพรีเมียม - จุดภาพแรก)
          ============================================================================ */}
      <header className="relative pt-16 pb-10 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 mb-4 uppercase">
              หน่วยที่ 1 หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              แนะนำภาษาคอมพิวเตอร์และโปรแกรม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-500">
                (Introduction to Computer Programming & Languages)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-indigo-500 pl-6 mt-4 relative">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              ภาษาคอมพิวเตอร์เป็นสะพานเชื่อมความคิดและตรรกะของมนุษย์ให้กลายเป็นสัญญาณไฟฟ้าที่หน่วยประมวลผลสามารถตอบสนองได้ โดยประกอบด้วยองค์กรไวยากรณ์ที่แน่นอน และมีวิวัฒนาการที่เติบโตควบคู่ไปกับขีดความสามารถของฮาร์ดแวร์
             </p>
          </div>
        </div>
      </header>

      {/* ============================================================================
          LAYER 3: FLEXIBLE CONTENT AREA (พื้นที่เครื่องมือจำลองอิสระ)
          ============================================================================ */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation Selector Tabs */}
        <div className="flex bg-white/80 backdrop-blur-md rounded-2xl p-2 border border-slate-200 shadow-sm mb-8 gap-2">
          <button
            onClick={() => setActiveTab('components')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300
              ${activeTab === 'components' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <Code2 className="w-4 h-4" />
            1.1.1 องค์ประกอบของภาษาคอมพิวเตอร์ (Code Analyzer)
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300
              ${activeTab === 'evolution' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <Globe className="w-4 h-4" />
            1.1.2 ประวัติและวิวัฒนาการของภาษา (Evolution Timeline)
          </button>
        </div>

        {/* Tab content 1.1.1: องค์ประกอบของภาษาคอมพิวเตอร์ */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Left: Code Parser Shell */}
            <div className="lg:col-span-6 bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[440px]">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">python_lexer.py</span>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-500 mb-2 select-none">// คลิกเลือกองค์ประกอบที่ไฮไลต์เพื่อถอดรหัสคำสั่ง</div>
                  
                  {/* Line 1 */}
                  <div className="font-mono text-lg flex flex-wrap items-center">
                    <span className="text-slate-600 mr-4 select-none">1</span>
                    {codeTokens.slice(0, 5).map(token => {
                      let tokenStyle = "px-1.5 py-0.5 rounded cursor-pointer transition-all duration-200 hover:scale-105 mx-0.5 font-bold ";
                      if (selectedToken?.id === token.id) {
                        tokenStyle += "ring-2 ring-white/50 ";
                      }
                      
                      if (token.type === 'reserved') tokenStyle += "text-fuchsia-400 bg-fuchsia-400/10";
                      else if (token.type === 'variable') tokenStyle += "text-sky-300 bg-sky-300/10";
                      else if (token.type === 'operator') tokenStyle += "text-amber-400 bg-amber-400/10";
                      else if (token.type === 'datatype') tokenStyle += "text-emerald-400 bg-emerald-400/10";
                      else if (token.type === 'syntax') tokenStyle += "text-slate-300 bg-slate-800";

                      return (
                        <span 
                          key={token.id} 
                          className={tokenStyle}
                          onClick={() => handleTokenClick(token)}
                        >
                          {token.text}
                        </span>
                      );
                    })}
                  </div>

                  {/* Line 2 */}
                  <div className="font-mono text-lg flex flex-wrap items-center">
                    <span className="text-slate-600 mr-4 select-none">2</span>
                    {codeTokens.slice(5).map(token => {
                      let tokenStyle = "px-1.5 py-0.5 rounded cursor-pointer transition-all duration-200 hover:scale-105 mx-0.5 font-bold ";
                      if (selectedToken?.id === token.id) {
                        tokenStyle += "ring-2 ring-white/50 ";
                      }
                      
                      if (token.type === 'syntax_indent') tokenStyle += "bg-slate-800/40 border-b border-dashed border-slate-600 w-12 text-center text-xs text-slate-500 font-bold select-none mr-2";
                      else if (token.type === 'reserved') tokenStyle += "text-indigo-400 bg-indigo-400/10";
                      else if (token.type === 'datatype_str') tokenStyle += "text-emerald-400 bg-emerald-400/10";

                      return (
                        <span 
                          key={token.id} 
                          className={tokenStyle}
                          onClick={() => handleTokenClick(token)}
                        >
                          {token.text}
                        </span>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Explainer Box */}
              <div className="mt-8 pt-4 border-t border-slate-900 text-xs text-slate-400 font-mono">
                องค์ประกอบเหล่านี้เรียกรวมกันว่า <strong>Lexeme</strong> ซึ่งเมื่อจับคู่เข้ากับโครงสร้างไวยากรณ์ (Syntax rules) จะแปรสภาพกลายเป็นบล็อกคำสั่งประมวลผลคอมพิวเตอร์
              </div>

            </div>

            {/* Right: Analyzer details */}
            <div className="lg:col-span-6 bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col justify-between min-h-[440px]">
              
              <div className="flex-1 flex flex-col justify-center">
                {selectedToken === null ? (
                  <div className="text-center p-6 animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                      <Code2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">ยินดีต้อนรับสู่เครื่องวิเคราะห์รหัสคำสั่ง</h4>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">คลิกเลือกคำสั่งใด ๆ ในกล่องแก้ไขโค้ดด้านซ้ายเพื่อดูองค์ประกอบความสำคัญของภาษาคอมพิวเตอร์</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-4 ${
                      selectedToken.type === 'reserved' ? 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200' :
                      selectedToken.type === 'variable' ? 'text-sky-600 bg-sky-50 border-sky-200' :
                      selectedToken.type === 'operator' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                      selectedToken.type === 'syntax' || selectedToken.type === 'syntax_indent' ? 'text-slate-600 bg-slate-50 border-slate-200' :
                      'text-emerald-600 bg-emerald-50 border-emerald-200'
                    }`}>
                      ประเภท: {selectedToken.type}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 mb-1">{selectedToken.name}</h3>
                    <code className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2 py-1 rounded font-bold font-mono">Token: "{selectedToken.text.trim()}"</code>
                    
                    <div className="mt-6 border-l-4 border-indigo-500 pl-4 py-1">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedToken.desc}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 mt-6 text-xs text-slate-500 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                      <span><strong>ไวยากรณ์ (Syntax)</strong> และ <strong>ความหมาย (Semantics)</strong> เป็นเกณฑ์ที่ช่วยให้ตัวแปลภาษาคอมพิวเตอร์ถอดโค้ดออกเป็นขั้นตอนที่ CPU ทำงานได้</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* Tab content 1.1.2: วิวัฒนาการของภาษา */}
        {activeTab === 'evolution' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Horizontal Timeline navigation */}
            <div className="grid grid-cols-4 gap-3 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-sm">
              {evolutionEras.map((era, idx) => (
                <button
                  key={era.year}
                  onClick={() => handleEvoChange(idx)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 border-2
                    ${evoIndex === idx 
                      ? `bg-white border-indigo-500 scale-[1.02] shadow-md shadow-indigo-600/5` 
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  <span className={`text-[10px] font-extrabold tracking-wider ${evoIndex === idx ? 'text-indigo-600' : 'text-slate-400'}`}>{era.year}</span>
                  <span className="text-xs font-bold mt-1 text-center truncate w-full">{era.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left: Code Viewer Mockup */}
              <div className="lg:col-span-5 bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-[100px] z-0 pointer-events-none opacity-30 bg-gradient-to-br ${evolutionEras[evoIndex].glow}`}></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 text-xs text-slate-500 font-mono">
                      <span>Syntax Viewer ({evolutionEras[evoIndex].year})</span>
                      <span className={`px-2 py-0.5 rounded border text-[10px] ${evolutionEras[evoIndex].accent}`}>{evolutionEras[evoIndex].year}</span>
                    </div>
                    
                    <pre className="font-mono text-sm leading-relaxed text-slate-200 whitespace-pre overflow-x-auto bg-slate-900/40 p-5 rounded-2xl border border-slate-800/40">
                      {evolutionEras[evoIndex].code}
                    </pre>
                  </div>

                  <div className="mt-8 text-xs font-mono text-slate-500 border-t border-slate-900 pt-4">
                    ชุดคำสั่ง: แสดงคำว่า "Welcome" ตามเงื่อนไข
                  </div>
                </div>
              </div>

              {/* Right: Evolution details */}
              <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col justify-between min-h-[400px]">
                
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1 block">วิวัฒนาการของภาษาคอมพิวเตอร์</span>
                    <h3 className="text-2xl font-black text-slate-800">{evolutionEras[evoIndex].title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">ยุคปี {evolutionEras[evoIndex].year}</p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {evolutionEras[evoIndex].desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Translator info */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-xs">
                        <Monitor className="w-4 h-4" /> ตัวแปลโปรแกรม (Translator)
                      </div>
                      <span className="text-slate-700 text-xs font-mono font-bold bg-white px-2 py-1 border rounded shadow-sm inline-block">
                        {evolutionEras[evoIndex].translator}
                      </span>
                    </div>

                    {/* Pros/Cons */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" /> จุดเด่น / ข้อจำกัด
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed"><strong className="text-slate-700">ข้อดี:</strong> {evolutionEras[evoIndex].pros}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1"><strong className="text-slate-700">ข้อเสีย:</strong> {evolutionEras[evoIndex].cons}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>เปรียบเทียบระดับ: {evoIndex <= 1 ? 'ภาษาระดับต่ำ (Low-level)' : 'ภาษาระดับสูง (High-level)'}</span>
                  <button 
                    onClick={() => handleEvoChange((evoIndex + 1) % evolutionEras.length)}
                    className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    ยุคถัดไป <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Real-time system console (VS Code Style) */}
        <div className="mt-8 rounded-3xl bg-[#1e1e1e] border border-slate-800 overflow-hidden shadow-2xl w-full">
          <div className="bg-[#252526] px-5 py-2.5 border-b border-[#1e1e1e] flex justify-between items-center text-xs font-semibold text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span>TERMINAL - compiler.log</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-green-500/80 uppercase font-bold">Live Monitor</span>
            </div>
          </div>
          
          <div className="h-36 p-5 overflow-y-auto font-mono text-[13px] leading-relaxed flex flex-col justify-start gap-1 text-slate-300">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-slate-600 select-none shrink-0 font-medium">[{log.time}]</span>
                <span className={`shrink-0 w-10 font-bold text-center rounded text-[10px] px-1 py-0.5 ${
                  log.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/10' :
                  log.type === 'warn' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/10' :
                  log.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/10' :
                  log.type === 'sys' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/10' : 'bg-slate-700/20 text-slate-400'
                }`}>
                  {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'SUCCESS' : 'SYSTEM'}
                </span>
                <span className={`flex-1 font-mono ${
                  log.type === 'error' ? 'text-red-300' :
                  log.type === 'warn' ? 'text-amber-200' :
                  log.type === 'success' ? 'text-emerald-300' :
                  log.type === 'sys' ? 'text-blue-200' : 'text-slate-300'
                }`}>
                  {log.msg}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </div>

        {/* ============================================================================
            LAYER 4: STANDARDIZED TEACHERTASK FOOTER (กิจกรรมปฏิบัติในห้องเรียน)
            ============================================================================ */}
        <TeacherTask title="วิเคราะห์องค์ประกอบภาษาและวิวัฒนาการซอฟต์แวร์" taskText={teacherTaskContent} />

      </main>

      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 200% 200%;
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 12s ease infinite;
        }
      `}} />

    </div>
  );
}
