import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherTask from '../../ui/TeacherTask';
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Info,
  Cpu,
  Award,
  HelpCircle,
  ListChecks,
  Check,
  Zap,
  TrendingDown,
  Monitor,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ListPlus,
  FileCode,
  LayoutGrid,
  Wand2,
  Terminal
} from 'lucide-react';

export default function py2_9() {
  // --- Section 1: Rules Explorer State ---
  const [activeRule, setActiveRule] = useState(0);
  const [ruleToggleState, setRuleToggleState] = useState(false);

  // --- Section 2: Workspace Selection ---
  const [workspaceTab, setWorkspaceTab] = useState('drawio'); // 'drawio' or 'code'

  // --- Section 3: Diagram as Code Editor States ---
  const [codeText, setCodeText] = useState(
`START
input: "รับค่าน้ำหนัก (W) และ ส่วนสูง (H)"
process: "คำนวณ BMI = W / (H/100)^2"
if "ดัชนีมวลกาย BMI >= 25.0?":
    display: "แสดงผล: น้ำหนักเกินมาตรฐาน (อ้วน)"
else:
    display: "แสดงผล: น้ำหนักปกติสมส่วน"
display: "พิมพ์ใบวิเคราะห์สุขภาพและให้คำปรึกษา"
END`
  );

  const [compiledBlocks, setCompiledBlocks] = useState([]);
  const [compileErrors, setCompileErrors] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [highlightLine, setHighlightLine] = useState(null);

  // Preset Code Templates for Diagram as Code
  const loadCodeTemplate = (templateType) => {
    if (templateType === 'bmi') {
      setCodeText(
`START
input: "รับค่าน้ำหนัก (W) และ ส่วนสูง (H)"
process: "คำนวณ BMI = W / (H/100)^2"
if "ดัชนีมวลกาย BMI >= 25.0?":
    display: "แสดงผล: น้ำหนักเกินมาตรฐาน (อ้วน)"
else:
    display: "แสดงผล: น้ำหนักปกติสมส่วน"
display: "พิมพ์ใบวิเคราะห์สุขภาพและให้คำปรึกษา"
END`
      );
    } else if (templateType === 'atm') {
      setCodeText(
`START
input: "ตรวจสอบบัตร ATM และป้อนรหัส 4 หลัก"
if "รหัสผ่านถูกต้องสมบูรณ์?":
    input: "ระบุจำนวนเงินที่ต้องการถอนสด"
    process: "ระบบตัดยอดบัญชีสะสมธนาคาร"
    display: "จ่ายธนบัตรออกทางหน้าตู้"
else:
    display: "แจ้งเตือนรหัสผ่านผิดพลาดและคืนบัตร"
END`
      );
    } else if (templateType === 'grade') {
      setCodeText(
`START
input: "รับคะแนนสะสมวิชา Python"
if "คะแนนสอบผ่านเกณฑ์ >= 50?":
    display: "แสดงคำชมเชย: สอบผ่าน (PASS)"
else:
    display: "แสดงคำแนะนำ: สอบแก้ตัวใหม่ (FAIL)"
END`
      );
    }
  };

  // Compiler logic: Parsed Line-by-Line to Flowchart Blocks
  useEffect(() => {
    setIsCompiling(true);
    const timer = setTimeout(() => {
      const lines = codeText.split('\n');
      const blocks = [];
      const errors = [];
      
      let currentDecision = null;
      let currentBranch = null; // 'yes' or 'no'

      let hasStart = false;
      let hasEnd = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        if (trimmed === '' || trimmed.startsWith('#')) continue;

        const upperTrimmed = trimmed.toUpperCase();
        if (upperTrimmed === 'START') hasStart = true;
        if (upperTrimmed === 'END') hasEnd = true;

        // Check indentation
        const isIndented = line.startsWith(' ') || line.startsWith('\t');

        if (!isIndented) {
          // Reset branch context when we hit a non-indented line
          currentDecision = null;
          currentBranch = null;
        }

        if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
          const text = trimmed.substring(3, trimmed.length - 1).replace(/^["']|["']$/g, '').trim();
          const newBlock = {
            id: `line-${lineNum}`,
            type: 'decision',
            text: text || 'ตรวจสอบเงื่อนไข?',
            lineNum,
            yesBranch: [],
            noBranch: []
          };
          blocks.push(newBlock);
          currentDecision = newBlock;
          currentBranch = 'yes';
        } else if (trimmed === 'else:') {
          if (currentDecision) {
            currentBranch = 'no';
          } else {
            errors.push(`บรรทัดที่ ${lineNum}: พบคำสั่ง 'else:' โดยไม่มี 'if' นำหน้าก่อนหน้า`);
          }
        } else {
          // Parse basic statements
          let blockType = '';
          let content = '';

          if (upperTrimmed === 'START') {
            blockType = 'start';
            content = 'START';
          } else if (upperTrimmed === 'END') {
            blockType = 'end';
            content = 'END';
          } else if (trimmed.startsWith('input:')) {
            blockType = 'input';
            content = trimmed.substring(6).replace(/^["']|["']$/g, '').trim();
          } else if (trimmed.startsWith('process:')) {
            blockType = 'process';
            content = trimmed.substring(8).replace(/^["']|["']$/g, '').trim();
          } else if (trimmed.startsWith('display:')) {
            blockType = 'display';
            content = trimmed.substring(8).replace(/^["']|["']$/g, '').trim();
          } else {
            // Default parse warning for non-matching statements
            blockType = 'process';
            content = trimmed;
            if (upperTrimmed !== 'START' && upperTrimmed !== 'END') {
              errors.push(`บรรทัดที่ ${lineNum}: รูปแบบไวยากรณ์ไม่ถูกต้อง แนะนำให้ระบุนำหน้าด้วย input:, process:, หรือ display:`);
            }
          }

          const blockNode = {
            id: `line-${lineNum}`,
            type: blockType,
            text: content,
            lineNum
          };

          if (isIndented && currentDecision && currentBranch) {
            if (currentBranch === 'yes') {
              currentDecision.yesBranch.push(blockNode);
            } else {
              currentDecision.noBranch.push(blockNode);
            }
          } else {
            blocks.push(blockNode);
          }
        }
      }

      if (!hasStart) {
        errors.unshift("⚠️ ไม่พบจุดเริ่มต้นแผนภูมิ 'START' บนหัวโค้ด");
      }
      if (!hasEnd) {
        errors.push("⚠️ ไม่พบจุดสิ้นสุดแผนภูมิ 'END' ที่ท้ายโค้ด");
      }

      setCompiledBlocks(blocks);
      setCompileErrors(errors);
      setIsCompiling(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [codeText]);

  // --- Data structures for Rules Explorer ---
  const flowchartRules = [
    {
      title: "ทิศทางการไหลที่ชัดเจน",
      subtitle: "Clear Flow Direction",
      icon: <ArrowRight className="w-6 h-6 text-indigo-500" />,
      desc: "ทิศทางการทำงานของผังงานจะต้องมีความเป็นระเบียบ เรียงลำดับสายธารกระบวนการจาก บนลงล่าง (Top-to-Bottom) หรือจาก ซ้ายไปขวา (Left-to-Right) เป็นหลักเท่านั้น เพื่อหลีกเลี่ยงการสับสน เส้นเชื่อมโยงต้องไม่คดเคี้ยวไปมาอย่างไร้เป้าหมาย",
      incorrectDesc: "เส้นทางลูกศรวนไปวนมา ทิศทางชี้ขึ้นและชี้ลงสลับกันอย่างไร้ทิศทาง ทำให้สมองประมวลผลลำดับขั้นตอนได้ยากมาก",
      correctDesc: "เส้นทางโปรแกรมไหลจากบนลงล่างเป็นแนวตรงที่ชัดเจน จุดสิ้นสุดปลายทางอยู่ด้านล่างสุดเสมอ เข้าใจขั้นตอนการทำงานได้ใน 3 วินาที",
      tips: [
        "หลีกเลี่ยงการโยงลูกศรย้อนกลับขึ้นไปข้างบน เว้นแต่จะเป็นการวนซ้ำ (Loop) ที่ผ่านการตรวจสอบเงื่อนไขแล้ว",
        "ควรรักษาแนวเส้นเชื่อมโยง (Flowlines) ให้เป็นแนวตั้งหรือแนวนอนขนานกัน และไม่ทำมุมเฉียงสะเปะสะปะ"
      ]
    },
    {
      title: "จุดเริ่มต้นและจุดสิ้นสุดมีเพียงจุดเดียว",
      subtitle: "Single Entry & Single Exit",
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />,
      desc: "ผังงานที่ดีต้องมีสัญลักษณ์ START (จุดเริ่มต้น) และ END (จุดสิ้นสุด) เพียงอย่างละ 1 จุดในแผนผังทั้งหมดเท่านั้น เพื่อป้องกันไม่ให้เกิดความสับสนว่าโปรแกรมสามารถเข้าทำงานหรือสิ้นสุดจากทางไหนได้บ้าง",
      incorrectDesc: "มีสัญลักษณ์จุดสิ้นสุด (END) กระจัดกระจายอยู่ตามทางแยกเงื่อนไขต่างๆ ทำให้ยากต่อการติดตามว่าโครงสร้างหน่วยความจำถูกทำลายหรือปิดการทำงานเรียบร้อยครบทุกจุดหรือไม่",
      correctDesc: "ใช้การรวบรวมทางแยกการทำงาน (Branches) ทั้งหมดกลับเข้ามาบรรจบกันที่สัญลักษณ์จุดเชื่อมต่อ (Connector) ก่อนจะส่งต่อเข้าสู่จุดสิ้นสุด (END) เพียงจุดเดียวด้านล่างสุด",
      tips: [
        "หากโปรแกรมมีเงื่อนไขและต้องการออกจากโปรแกรมทันที ให้ลากเส้นรวมคำสั่งเหล่านั้นมาผสานที่จุดเชื่อมต่อหลักเดียวกันก่อนเชื่อมเข้าหา END",
        "จุดเริ่มต้น (START) จะต้องไม่มีลูกศรชี้เข้าหาตัวมันเองเด็ดขาด"
      ]
    },
    {
      title: "การเลือกใช้สัญลักษณ์ที่ถูกต้อง",
      subtitle: "Standardized ANSI Symbols",
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      desc: "สัญลักษณ์ที่นำมาใช้วาดผังงานต้องเป็นไปตามมาตรฐานสากลที่กำหนดโดยสถาบัน ANSI (American National Standards Institute) เพื่อให้ผู้พัฒนาโปรแกรมหรือบุคคลอื่นที่มาอ่านเข้าใจความหมายตรงกันโดยไม่ต้องแปลไทยเป็นไทยซ้ำอีกรอบ",
      incorrectDesc: "ใช้กล่องสี่เหลี่ยมผืนผ้าทั่วไป (Process) ในการเขียนขั้นตอนรับค่าจากแป้นพิมพ์ หรือวาดรูปทรงแปลกประหลาดที่ไม่อยู่ในสารบบวิศวกรรมซอฟต์แวร์",
      correctDesc: "ใช้รูปสี่เหลี่ยมด้านขนาน (Parallelogram) สำหรับการรับข้อมูลนำเข้าและแสดงผลทั่วไป และใช้รูปทรงจอภาพแบบปีกหัวแหลมปลายเว้าของสากลในการแสดงผลหน้าจออย่างแม่นยำ",
      tips: [
        "จำหลักการง่ายๆ: สี่เหลี่ยมผืนผ้า = ประมวลผลคำนวณภายในระบบ, สี่เหลี่ยมด้านขนาน = นำเข้าหรือส่งออกข้อมูล (I/O) โดยไม่ได้ระบุประเภทสื่อ",
        "สัญลักษณ์การแสดงผลออกทางหน้าจอ (Display) จะต้องใช้ทรง ANSI แท้ คือ ด้านขวาแหลมมนและด้านซ้ายเว้าโค้งเข้าด้านใน"
      ]
    },
    {
      title: "เส้นเชื่อมโยงห้ามตัดกันเด็ดขาด",
      subtitle: "No Crossing Connection Lines",
      icon: <ListChecks className="w-6 h-6 text-indigo-500" />,
      desc: "เส้นไหลข้อมูล (Flowlines) ที่มีลูกศรกำกับห้ามลากทับตัดกันเด็ดขาด เพราะจะทำให้ผู้อ่านสับสนว่าเส้นทางเดินไหนเชื่อมต่อไปยังรูปทรงใด หากหลีกเลี่ยงไม่ได้จริงๆ ต้องใช้สัญลักษณ์ จุดเชื่อมต่อหน้าเดียวกัน (On-page Connector) แทน",
      incorrectDesc: "ลากเส้นพาดผ่านแนวลูกศรอื่นโดยไม่มีตัวเชื่อม ทำให้แผนภาพดูพันกันเป็นตารางตาข่าย เกิดโอกาสในการอ่านเงื่อนไขผิดพลาดสูง",
      correctDesc: "ใช้จุดเชื่อมต่อเป็นรูปวงกลมขนาดเล็กพร้อมใส่ตัวอักษรระบุกำกับ (เช่น A, B) เพื่อเป็นสะพานวาร์ปข้ามเส้นเชื่อมต่ออย่างเป็นระบบระเบียบ",
      tips: [
        "จุดเชื่อมต่อ (Connector) ในหน้าเดียวกันจะใช้สัญลักษณ์ วงกลมขนาดเล็ก และมักระบุตัวอักษรภาษาอังกฤษภายใน",
        "หากต้องโยงไปคนละหน้ากระดาษ ให้ใช้สัญลักษณ์รูปห้าเหลี่ยมคว่ำชี้ลง (Off-page Connector)"
      ]
    },
    {
      title: "ข้อความสั้น กระชับ ชัดเจน",
      subtitle: "Concise Statements",
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      desc: "ข้อความที่เขียนบรรยายในสัญลักษณ์แต่ละรูปทรง ควรเป็นภาษาคนทั่วไปที่กระชับ สั้น และเข้าใจง่ายที่สุด ไม่ควรนำซอร์สโค้ดดิบ (Source Code) ยาวๆ ของภาษาคอมพิวเตอร์ไปยัดไว้ข้างใน เพราะผังงานคือเครื่องมือสำหรับสื่อสารเชิงตรรกะ ไม่ใช่ตัวรันโค้ด",
      incorrectDesc: "นำโค้ด Python ดิบยัดเข้าไป เช่น score = float(input('Enter Score: ')) ซึ่งอ่านยากและยาวเกินกรอบสัญลักษณ์",
      correctDesc: "เขียนข้อความสั้นๆ ได้ใจความชัดเจน เช่น รับคะแนนดิบ หรือ คำนวณเกรดเฉลี่ย ช่วยให้คนที่ไม่เป็นโปรแกรมเมอร์ก็อ่านเข้าใจได้ทันที",
      tips: [
        "ควรรักษาความยาวของข้อความให้อยู่ในกรอบรูปทรง และหลีกเลี่ยงการใช้ศัพท์เฉพาะทางที่ซับซ้อนเกินจำเป็น",
        "หลีกเลี่ยงการใช้คำกริยาซ้ำซ้อน เช่น 'ทำการรับเอาค่าตัวแปรเข้ามา' ให้เขียนสั้นๆ ว่า 'รับค่าตัวแปร' พอ"
      ]
    }
  ];

  return (
    <div className="text-zinc-950 pb-24 font-sans select-none relative animate-fade-in">
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-15%] w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[140px]"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        @keyframes flow-dash {
          to { stroke-dashoffset: -40; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s infinite ease-in-out;
        }
        .flow-line-anim {
          stroke-dasharray: 8;
          animation: flow-dash 1.5s infinite linear;
        }
      `}} />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-16 relative z-10">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-indigo-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.2),transparent_60%)]"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-3xl space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase">
                <Sparkles className="w-4 h-4 animate-spin" /> คัมภีร์โปรแกรมเมอร์
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold pb-2 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300">
                ทำไมผังงานที่สะอาดยิ่งใหญ่ <br className="hidden md:inline" /> ถึงสร้างโปรเจกต์ระดับล้านได้จริง?
              </h2>
              <p className="text-[16px] text-indigo-200/90 leading-relaxed font-normal">
                ผังงาน (Flowchart) เปรียบเสมือนแบบแปลนพิมพ์เขียนของวิศวกรโครงสร้าง หากแบบแปลนบิดเบี้ยว มีรูรั่ว หรือโยงเส้นผิดหลักการ
                ถึงคุณจะมีช่างปูนชั้นยอด ตึกที่สร้างขึ้นก็ย่อมพังทลายลงมา เช่นเดียวกับการเขียนโค้ดคอมพิวเตอร์
                การมีตรรกะและความเข้าใจใน <strong>"หลักการเขียนผังงานที่ดี"</strong> จึงเป็นเกราะป้องกันข้อผิดพลาดที่เหนียวแน่นที่สุดของโปรแกรมเมอร์มืออาชีพ
              </p>
            </div>
            
            <div className="flex gap-4 shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center flex flex-col justify-center items-center w-36 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-2xl font-bold font-mono">100%</span>
                <span className="text-xs text-indigo-200 font-medium mt-1">ถูกต้องตาม ANSI</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center flex flex-col justify-center items-center w-36 shadow-lg">
                <TrendingDown className="w-8 h-8 text-red-400 mb-2" />
                <span className="text-2xl font-bold font-mono">90%</span>
                <span className="text-xs text-indigo-200 font-medium mt-1">ลดโอกาสเกิดบั๊ก</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: กฎเกณฑ์และข้อกำหนดในการเขียน */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 gap-4">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> บทเรียนส่วนแรก
              </span>
              <h3 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                กฎเกณฑ์และข้อกำหนดในการเขียน
              </h3>
            </div>
            <p className="text-zinc-500 max-w-md text-sm md:text-right leading-relaxed">
              ศึกษา 5 กฎทองข้อกำหนดมาตรฐานสากลเพื่อการเขียนแผนภูมิการไหลที่มีประสิทธิภาพ พร้อมเปรียบเทียบตรรกะแบบโต้ตอบได้
            </p>
          </div>

          {/* Interactive Rules Explorer layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Rule Cards Menu */}
            <div className="lg:col-span-5 space-y-4">
              {flowchartRules.map((rule, idx) => {
                const isActive = activeRule === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveRule(idx);
                      setRuleToggleState(false);
                    }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden active:scale-98 ${
                      isActive 
                        ? 'bg-white border-indigo-600 shadow-[0_12px_24px_-4px_rgba(79,70,229,0.1)]' 
                        : 'bg-white/60 border-zinc-200/80 hover:bg-white hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600"></div>
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-indigo-100/80 text-indigo-600 scale-105' : 'bg-zinc-100 text-zinc-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                    }`}>
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold transition-colors text-[16px] ${isActive ? 'text-indigo-900' : 'text-zinc-800'}`}>
                        {rule.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono tracking-wide uppercase mt-0.5">{rule.subtitle}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? 'text-indigo-600 translate-x-1' : 'text-zinc-300 group-hover:text-zinc-500'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Side: Interactive Panel */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden min-h-[580px] flex flex-col">
              
              {/* Header Panel */}
              <div className="p-6 md:p-8 bg-gradient-to-b from-indigo-50/50 to-transparent border-b border-zinc-100 relative">
                <div className="absolute top-6 right-6 font-mono text-zinc-200 text-6xl font-extrabold select-none opacity-30">
                  {`0${activeRule + 1}`}
                </div>
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-1">
                  <Zap className="w-3.5 h-3.5 fill-current" /> กฎเกณฑ์ที่ได้รับการยอมรับสากล
                </div>
                <h3 className="text-2xl font-extrabold text-zinc-900">
                  {flowchartRules[activeRule].title}
                </h3>
                <p className="text-zinc-500 font-mono text-sm mt-0.5">{flowchartRules[activeRule].subtitle}</p>
                <p className="text-zinc-600 text-[15px] leading-relaxed mt-4">
                  {flowchartRules[activeRule].desc}
                </p>
              </div>

              {/* Visual Interactive Sandbox */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Toggle button bad vs good */}
                  <div className="flex justify-between items-center bg-zinc-100 p-1.5 rounded-xl border border-zinc-200/80 max-w-sm mx-auto">
                    <button
                      onClick={() => setRuleToggleState(false)}
                      className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-all ${
                        !ruleToggleState 
                          ? 'bg-red-500 text-white shadow-md' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <XCircle className="w-4 h-4" /> ผิดระเบียบ (Bad)
                    </button>
                    <button
                      onClick={() => setRuleToggleState(true)}
                      className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-all ${
                        ruleToggleState 
                          ? 'bg-emerald-500 text-white shadow-md' 
                          : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" /> ถูกระเบียบ (Good)
                    </button>
                  </div>

                  {/* Simulator Screen */}
                  <div className="border border-zinc-200 rounded-2xl bg-zinc-50/70 p-6 min-h-[220px] flex items-center justify-center relative overflow-hidden">
                    
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-30"></div>
                    
                    {/* Interactive Content Switcher */}
                    <div className="relative z-10 w-full flex justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeRule}-${ruleToggleState}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="w-full flex flex-col items-center"
                        >
                          
                          {/* Rule 1: Flow Direction */}
                          {activeRule === 0 && (
                            <div className="flex flex-col items-center gap-2">
                              {!ruleToggleState ? (
                                /* Bad: Chaos flow */
                                <div className="flex flex-col items-center gap-2 bg-white/80 p-4 rounded-xl shadow-sm border border-red-200">
                                  <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">สับสับสนวุ่นวาย</span>
                                  <svg width="240" height="110" viewBox="0 0 240 110" className="stroke-red-400 fill-none stroke-[2]">
                                    <rect x="10" y="35" width="60" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
                                    <text x="40" y="53" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold" stroke="none">START</text>
                                    <path d="M 70,50 L 100,50 A 20,20 0 0,0 120,70 L 120,90 A 20,20 0 0,1 100,110 L 40,110 L 40,80" markerEnd="url(#arrow-red)" />
                                    <rect x="130" y="20" width="70" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
                                    <text x="165" y="38" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold" stroke="none">PROCESS</text>
                                    <path d="M 130,35 L 70,35" markerEnd="url(#arrow-red)" />
                                    <path d="M 165,50 L 165,80 A 10,10 0 0,0 175,90 L 210,90" markerEnd="url(#arrow-red)" />
                                    <defs>
                                      <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                                      </marker>
                                    </defs>
                                  </svg>
                                </div>
                              ) : (
                                /* Good: Neat top-down flow */
                                <div className="flex flex-col items-center gap-1.5 bg-white/80 p-4 rounded-xl shadow-sm border border-emerald-200">
                                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ลื่นไหลชัดเจน</span>
                                  <svg width="240" height="120" viewBox="0 0 240 120" className="stroke-emerald-500 fill-none stroke-[2]">
                                    <rect x="90" y="5" width="60" height="22" rx="11" fill="#ecfdf5" stroke="#10b981" />
                                    <text x="120" y="19" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold" stroke="none">START</text>
                                    
                                    <path d="M 120,27 L 120,43" markerEnd="url(#arrow-green)" className="flow-line-anim" />
                                    
                                    <rect x="85" y="45" width="70" height="25" rx="4" fill="#ecfdf5" stroke="#10b981" />
                                    <text x="120" y="60" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold" stroke="none">ประมวลผล</text>
                                    
                                    <path d="M 120,70 L 120,88" markerEnd="url(#arrow-green)" className="flow-line-anim" />
                                    
                                    <rect x="90" y="90" width="60" height="22" rx="11" fill="#ecfdf5" stroke="#10b981" />
                                    <text x="120" y="104" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold" stroke="none">END</text>
                                    <defs>
                                      <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                                      </marker>
                                    </defs>
                                  </svg>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Rule 2: Single Start/End */}
                          {activeRule === 1 && (
                            <div className="w-full max-w-md">
                              {!ruleToggleState ? (
                                <div className="bg-white/80 p-4 rounded-xl border border-red-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">END โผล่ทุกหนทุกแห่ง</span>
                                  <div className="flex justify-center items-center gap-6">
                                    <div className="flex flex-col items-center">
                                      <div className="w-20 h-10 border-2 border-red-500 bg-red-50 rounded-full flex items-center justify-center text-xs font-bold text-red-900">START</div>
                                      <div className="w-0.5 h-4 bg-red-300"></div>
                                      <div className="w-24 h-10 border-2 border-red-500 bg-red-50 flex items-center justify-center text-xs font-bold text-red-900 text-center px-1">พบข้อผิดพลาด?</div>
                                      <div className="flex justify-between w-32 mt-1">
                                        <div className="flex flex-col items-center">
                                          <span className="text-[9px] text-red-500 font-bold">ใช่</span>
                                          <div className="w-0.5 h-4 bg-red-300"></div>
                                          <div className="w-14 h-8 border-2 border-red-500 bg-red-100/50 rounded-full flex items-center justify-center text-[10px] font-bold text-red-700">END (1)</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <span className="text-[9px] text-red-500 font-bold">ไม่ใช่</span>
                                          <div className="w-0.5 h-4 bg-red-300"></div>
                                          <div className="w-14 h-8 border-2 border-red-500 bg-red-100/50 rounded-full flex items-center justify-center text-[10px] font-bold text-red-700">END (2)</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white/80 p-4 rounded-xl border border-emerald-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">รวมศูนย์สู่สากลจุดเดียว</span>
                                  <div className="flex flex-col items-center">
                                    <div className="w-20 h-8 border-2 border-emerald-500 bg-emerald-50 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-800">START</div>
                                    <div className="w-0.5 h-3 bg-emerald-300"></div>
                                    <div className="w-24 h-8 border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center text-[10px] font-bold text-emerald-800 text-center">พบข้อผิดพลาด?</div>
                                    <div className="w-32 h-6 flex justify-between relative mt-1">
                                      <div className="w-0.5 h-6 bg-emerald-300 absolute left-4"></div>
                                      <span className="text-[8px] text-emerald-600 font-bold absolute left-5 -top-1">ใช่</span>
                                      <div className="w-0.5 h-6 bg-emerald-300 absolute right-4"></div>
                                      <span className="text-[8px] text-emerald-600 font-bold absolute right-7 -top-1">ไม่ใช่</span>
                                    </div>
                                    <div className="w-[66px] h-0.5 bg-emerald-300 mt-0"></div>
                                    <div className="w-0.5 h-3 bg-emerald-300"></div>
                                    <div className="w-4 h-4 border-2 border-emerald-500 bg-emerald-100/80 rounded-full flex items-center justify-center text-[8px] font-bold text-emerald-700"></div>
                                    <div className="w-0.5 h-3 bg-emerald-300"></div>
                                    <div className="w-20 h-8 border-2 border-emerald-500 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-800">END</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Rule 3: Correct Symbols */}
                          {activeRule === 2 && (
                            <div className="w-full max-w-md">
                              {!ruleToggleState ? (
                                <div className="bg-white/80 p-4 rounded-xl border border-red-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">ใช้กล่อง Process พร่ำเพรื่อ</span>
                                  <div className="flex justify-center items-center gap-4">
                                    <div className="border-2 border-red-500 bg-red-50/50 p-2.5 rounded text-center w-28 shadow-sm">
                                      <div className="w-full h-8 bg-red-100 border border-red-300 flex items-center justify-center text-[10px] font-mono font-bold text-red-800 uppercase">Rectangle</div>
                                      <span className="text-[9px] text-red-600 font-bold block mt-1.5">รับค่าน้ำหนัก</span>
                                    </div>
                                    <div className="border-2 border-red-500 bg-red-50/50 p-2.5 rounded text-center w-28 shadow-sm">
                                      <div className="w-full h-8 bg-red-100 border border-red-300 flex items-center justify-center text-[10px] font-mono font-bold text-red-800 uppercase">Rectangle</div>
                                      <span className="text-[9px] text-red-600 font-bold block mt-1.5">แสดงคำตอบ</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white/80 p-4 rounded-xl border border-emerald-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">สัญลักษณ์สากล ANSI ถูกฟังก์ชัน</span>
                                  <div className="flex justify-center items-center gap-4">
                                    <div className="border-2 border-emerald-500 bg-emerald-50/50 p-2.5 rounded text-center w-28 shadow-sm">
                                      {/* Parallelogram */}
                                      <div className="w-full h-8 bg-emerald-100 border border-emerald-300 flex items-center justify-center -skew-x-[15deg]">
                                        <span className="text-[8px] font-mono font-bold text-emerald-800 uppercase skew-x-[15deg]">INPUT Shape</span>
                                      </div>
                                      <span className="text-[9px] text-emerald-700 font-bold block mt-1.5">รับค่าน้ำหนัก</span>
                                    </div>
                                    <div className="border-2 border-emerald-500 bg-emerald-50/50 p-2.5 rounded text-center w-32 shadow-sm">
                                      {/* ANSI Display shape */}
                                      <div className="w-full h-8 flex justify-center items-center">
                                        <svg width="80" height="28" viewBox="0 0 100 35" className="fill-emerald-100 stroke-emerald-400 stroke-[2.5]">
                                          <path d="M 20,2 Q 5,17.5 20,33 L 80,33 L 95,17.5 L 80,2 Z" />
                                          <text x="50" y="21" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold" stroke="none">DISPLAY</text>
                                        </svg>
                                      </div>
                                      <span className="text-[9px] text-emerald-700 font-bold block mt-1.5">แสดงทางหน้าจอ</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Rule 4: No Crossing lines */}
                          {activeRule === 3 && (
                            <div className="w-full max-w-md">
                              {!ruleToggleState ? (
                                <div className="bg-white/80 p-4 rounded-xl border border-red-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">สายไฟพันกันระโยงระยาง</span>
                                  <svg width="260" height="100" viewBox="0 0 260 100" className="stroke-red-400 stroke-[2] fill-none">
                                    <rect x="5" y="35" width="55" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
                                    <text x="32.5" y="53" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold" stroke="none">ตรรกะ 1</text>
                                    
                                    <rect x="200" y="35" width="55" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
                                    <text x="227.5" y="53" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold" stroke="none">ตรรกะ 2</text>
                                    
                                    <path d="M 60,40 L 200,60" markerEnd="url(#arrow-red)" />
                                    <path d="M 60,60 L 200,40" markerEnd="url(#arrow-red)" className="stroke-[3] stroke-red-600" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="bg-white/80 p-4 rounded-xl border border-emerald-200 text-center space-y-3">
                                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ตัดขาดสัญญาณด้วย Connector วงกลม</span>
                                  <div className="flex justify-center items-center gap-6 bg-emerald-50/20 p-2.5 rounded-xl border border-emerald-100">
                                    <div className="flex items-center gap-2">
                                      <div className="w-12 h-8 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-800">บล็อก 1</div>
                                      <span className="text-zinc-400">➡️</span>
                                      <div className="w-6 h-6 border-2 border-emerald-500 bg-emerald-100 rounded-full flex items-center justify-center text-[9px] font-bold text-emerald-700">A</div>
                                    </div>
                                    <div className="w-px h-8 bg-zinc-200"></div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 border-2 border-emerald-500 bg-emerald-100 rounded-full flex items-center justify-center text-[9px] font-bold text-emerald-700">A</div>
                                      <span className="text-zinc-400">➡️</span>
                                      <div className="w-12 h-8 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-center text-[10px] font-bold text-emerald-800">บล็อก 2</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Rule 5: Concise Statements */}
                          {activeRule === 4 && (
                            <div className="w-full max-w-md">
                              {!ruleToggleState ? (
                                <div className="bg-white/80 p-4 rounded-xl border border-red-200 text-center space-y-2">
                                  <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">เขียนโค้ดยาวล้นสัญญาลักษณ์</span>
                                  <div className="mx-auto w-64 p-4 border-2 border-red-400 bg-red-50 text-red-900 rounded font-mono text-[9px] text-left leading-relaxed">
                                    {`while player_hp > 0 and enemy_hp > 0:`}<br />
                                    {`  dmg = random.randint(10, 20)`}<br />
                                    {`  enemy_hp -= dmg`}
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white/80 p-4 rounded-xl border border-emerald-200 text-center space-y-2">
                                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ไทยกระชับ อ่านจบปุ๊บรู้เรื่องปั๊บ</span>
                                  <div className="mx-auto w-48 p-4 border-2 border-emerald-500 bg-emerald-50 text-emerald-900 rounded-lg text-sm font-bold shadow-sm">
                                    ลูปต่อสู้ <br />
                                    ลดพลังชีวิตศัตรู
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* Compare text explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-red-800 text-xs tracking-wider uppercase mb-1">ผลกระทบแบบผิดระเบียบ</h5>
                      <p className="text-zinc-600 text-xs leading-relaxed">{flowchartRules[activeRule].incorrectDesc}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-emerald-800 text-xs tracking-wider uppercase mb-1">ประโยชน์แบบถูกระเบียบ</h5>
                      <p className="text-zinc-600 text-xs leading-relaxed">{flowchartRules[activeRule].correctDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Rules Checklist tips */}
                <div className="bg-indigo-50/30 rounded-2xl border border-indigo-100/50 p-5 mt-4">
                  <h4 className="font-bold text-indigo-950 text-[14px] flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-indigo-600" /> เคล็ดลับจากครูแม็ค (Pro Tips)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 leading-relaxed pl-5 list-disc">
                    {flowchartRules[activeRule].tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: พื้นที่ปฏิบัติการสร้างผังงานจริง (Flowchart Workspace) */}
        <section className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 gap-4">
            <div className="space-y-2">
              <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> บทเรียนส่วนที่สอง
              </span>
              <h3 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                พื้นที่ปฏิบัติการสร้างผังงานจริง
              </h3>
            </div>
            
            {/* Tab Controller */}
            <div className="flex bg-zinc-100 p-1.5 rounded-xl border border-zinc-200">
              <button
                onClick={() => setWorkspaceTab('drawio')}
                className={`py-1.5 px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                  workspaceTab === 'drawio' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> draw.io ของแท้ (Embedded)
              </button>
              <button
                onClick={() => setWorkspaceTab('code')}
                className={`py-1.5 px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                  workspaceTab === 'code' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 animate-pulse" /> Diagram as Code (เครื่องมือวาดด้วยรหัส)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* TAB 1: DRAW.IO EMBEDDED WORKSPACE */}
            {workspaceTab === 'drawio' && (
              <motion.div
                key="drawio-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl">
                  
                  {/* Browser-like window header */}
                  <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs text-zinc-400 font-mono ml-4 tracking-wider uppercase">Diagrams.net (draw.io) Integration API</span>
                    </div>
                    <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold">
                      PRO WORKSPACE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Embedded Editor Iframe */}
                    <div className="lg:col-span-9 h-[620px] bg-zinc-100 relative">
                      <iframe
                        src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json"
                        className="w-full h-full border-0 absolute inset-0"
                        title="draw.io workspace"
                      ></iframe>
                    </div>

                    {/* Pro Instructions Sidebar */}
                    <div className="lg:col-span-3 bg-zinc-50 border-l border-zinc-200 p-6 flex flex-col justify-between h-[620px] overflow-y-auto">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="font-extrabold text-zinc-900 text-sm flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-indigo-600" /> คำแนะนำการใช้งาน
                          </h4>
                          <p className="text-xs text-zinc-600 leading-relaxed">
                            นี่คือโปรแกรมเขียนผังงานและไดอะแกรมระดับโลก **draw.io (ของแท้)** ที่ถูกผสานการทำงานเข้าสู่ระบบห้องเรียนของครูแม็คโดยตรงผ่าน API
                          </p>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 space-y-2.5">
                          <h5 className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> โจทย์กิจกรรมท้าทาย
                          </h5>
                          <p className="text-[11px] text-zinc-700 leading-relaxed">
                            จงออกแบบผังงาน **"ระบบตรวจสอบสิทธิ์เข้าสู่ระบบ (Login Security)"** โดยมีขั้นตอน:
                          </p>
                          <ul className="list-decimal pl-4 text-[10px] text-zinc-600 space-y-1 leading-normal">
                            <li>รับค่าชื่อผู้ใช้และรหัสผ่าน</li>
                            <li>ถ้าถูก ให้เข้าหน้าระบบหลัก แล้วจบ</li>
                            <li>ถ้าผิด เกิน 3 ครั้ง ให้ล็อกไอดี</li>
                          </ul>
                        </div>

                        <div className="space-y-2.5">
                          <h5 className="font-bold text-zinc-800 text-xs">🛠️ วิธีดึงสัญลักษณ์ ANSI ใน draw.io</h5>
                          <ul className="text-[11px] text-zinc-500 space-y-1.5 list-disc pl-4 leading-normal">
                            <li>สัญลักษณ์กระบวนการ: เลือกทรง **Rectangle** (สี่เหลี่ยมผืนผ้า)</li>
                            <li>สัญลักษณ์ตัดสินใจ: เลือกทรง **Rhombus** (สี่เหลี่ยมขนมเปียกปูน)</li>
                            <li>สัญลักษณ์รับข้อมูล (I/O): เลือกทรง **Parallelogram** (สี่เหลี่ยมด้านขนาน)</li>
                            <li>สัญลักษณ์หน้าจอ: ค้นหาด้วยคำว่า **Display**</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-zinc-200 pt-4 mt-6">
                        <span className="text-[10px] text-zinc-400 leading-normal block">
                          * เมื่อทำการเขียนเสร็จสิ้น สามารถกดเมนู **File &rarr; Export as &rarr; PNG/SVG** ในหน้าต่าง draw.io เพื่อเซฟรูปผังงานลงเครื่องส่งครูได้ทันที
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DIAGRAM AS CODE STUDIO */}
            {workspaceTab === 'code' && (
              <motion.div
                key="code-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                
                {/* 💻 DIAGRAM AS CODE WRITER (LEFT SIDE) */}
                <div className="lg:col-span-5 bg-zinc-950 border border-zinc-850 rounded-[2.5rem] p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[640px]">
                  
                  {/* Backdrop glowing grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>

                  <div className="relative z-10 space-y-4 flex-1 flex flex-col justify-start">
                    
                    {/* Header of Editor */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs text-zinc-400">flowchart_compiler.py</span>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => loadCodeTemplate('bmi')}
                          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider transition-all"
                        >
                          สูตร BMI
                        </button>
                        <button
                          onClick={() => loadCodeTemplate('atm')}
                          className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider transition-all"
                        >
                          ตู้ ATM
                        </button>
                        <button
                          onClick={() => loadCodeTemplate('grade')}
                          className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider transition-all"
                        >
                          ตัดเกรด
                        </button>
                      </div>
                    </div>

                    {/* Instruction Cheat-sheet banner */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-start gap-2 text-[10px] leading-relaxed text-zinc-400">
                      <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <strong>วิธีเขียน Diagram as Code:</strong> ระบุคำสั่งนำหน้าด้วย <code className="text-cyan-300 font-mono">input:</code> (รับข้อมูล), <code className="text-indigo-300 font-mono">process:</code> (คำนวณ), หรือ <code className="text-purple-300 font-mono">display:</code> (แสดงผล) และใช้เว้นวรรค 4 ช่อง (Indent) ใต้เงื่อนไข <code className="text-amber-300 font-mono">if:</code> และ <code className="text-amber-300 font-mono">else:</code> เพื่อแยกเส้นทางเดินเงื่อนไข
                      </div>
                    </div>

                    {/* Main Code Editor Box */}
                    <div className="flex-1 min-h-[320px] bg-zinc-900 rounded-2xl border border-zinc-800 relative font-mono text-xs text-indigo-100 flex p-3 overflow-hidden">
                      {/* Gutter Line Numbers */}
                      <div className="text-zinc-600 text-right pr-3 select-none border-r border-zinc-800 flex flex-col pt-1.5 gap-[18px]">
                        {codeText.split('\n').map((_, idx) => (
                          <div key={idx} className={`h-4 leading-none text-[10px] ${highlightLine === idx + 1 ? 'text-indigo-400 font-bold' : ''}`}>
                            {idx + 1}
                          </div>
                        ))}
                      </div>

                      {/* Textarea Input area */}
                      <textarea
                        value={codeText}
                        onChange={(e) => setCodeText(e.target.value)}
                        className="flex-1 bg-transparent border-0 focus:ring-0 outline-none text-zinc-200 px-3 py-1 font-mono text-xs leading-[34px] resize-none overflow-y-auto min-h-full whitespace-pre"
                        placeholder="เริ่มต้นเขียนโค้ดที่นี่..."
                        spellCheck="false"
                      />
                    </div>

                  </div>

                  {/* Compiler Console Status (Bottom) */}
                  <div className="relative z-10 border-t border-zinc-800 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        {isCompiling ? (
                          <>
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
                            <span>กำลังแปลงโค้ดเป็นบล็อกตรรกะ...</span>
                          </>
                        ) : compileErrors.length > 0 ? (
                          <>
                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                            <span className="text-red-400 font-bold">🔴 พบคอนฟลิกตรรกะผังงาน</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                            <span className="text-emerald-400 font-bold">🟢 ผ่านการคอมไพล์ตรรกะสากล</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10px]">ANSI COMPILER v1.0.3</span>
                    </div>

                    {compileErrors.length > 0 && (
                      <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3 text-[10px] text-red-300 font-mono space-y-1 max-h-[100px] overflow-y-auto">
                        {compileErrors.map((err, idx) => (
                          <div key={idx} className="leading-relaxed">{err}</div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* 📊 LIVE INTERACTIVE FLOWCHART CANVAS (RIGHT SIDE) */}
                <div className="lg:col-span-7 bg-zinc-950 border border-zinc-850 rounded-[2.5rem] p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[640px] relative overflow-hidden">
                  
                  {/* Technology backdrop pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>

                  {/* Header title */}
                  <div className="relative z-10 flex justify-between items-center border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                        <LayoutGrid className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Live Compiler Preview</h4>
                        <h3 className="font-extrabold text-sm text-zinc-200">แบบจำลองสัญลักษณ์ ANSI อัจฉริยะ</h3>
                      </div>
                    </div>

                    <span className="text-[10px] text-zinc-500">
                      อัปเดตแบบเรียลไทม์ตามรหัสโค้ด
                    </span>
                  </div>

                  {/* Central Flow Stack renderer */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-start py-8 space-y-0 max-h-[460px] overflow-y-auto my-4 px-2">
                    <AnimatePresence>
                      {compiledBlocks.length === 0 ? (
                        <div className="text-zinc-600 italic text-center py-24 flex flex-col justify-center items-center gap-3">
                          <HelpCircle className="w-10 h-10 text-zinc-700 animate-bounce" />
                          <span>กรุณาพิมพ์หรือเลือกแม่แบบคำสั่งเพื่อสร้างสากลผังงาน</span>
                        </div>
                      ) : (
                        compiledBlocks.map((block, idx) => {
                          const isHovered = highlightLine === block.lineNum;

                          return (
                            <React.Fragment key={block.id}>
                              
                              {/* Standard shape rendering */}
                              {block.type !== 'decision' ? (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  onMouseEnter={() => setHighlightLine(block.lineNum)}
                                  onMouseLeave={() => setHighlightLine(null)}
                                  className={`w-full max-w-[260px] h-[48px] flex items-center justify-center font-bold text-xs cursor-help transition-all duration-200 z-10 ${
                                    isHovered 
                                      ? 'scale-105 ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950 z-20' 
                                      : 'opacity-90 hover:opacity-100'
                                  }`}
                                >
                                  {block.type === 'start' && (
                                    <div className="w-full h-full rounded-full border border-emerald-500 bg-emerald-950/40 text-emerald-300 flex items-center justify-center shadow-lg uppercase tracking-wider">
                                      {block.text}
                                    </div>
                                  )}

                                  {block.type === 'end' && (
                                    <div className="w-full h-full rounded-full border border-red-500 bg-red-950/40 text-red-300 flex items-center justify-center shadow-lg uppercase tracking-wider">
                                      {block.text}
                                    </div>
                                  )}

                                  {block.type === 'input' && (
                                    <div className="w-full h-full flex items-center justify-center -skew-x-[15deg] border border-sky-500 bg-sky-950/30 text-sky-300 shadow-md">
                                      <span className="skew-x-[15deg] block truncate text-center px-4 font-bold">{block.text}</span>
                                    </div>
                                  )}

                                  {block.type === 'process' && (
                                    <div className="w-full h-full rounded-lg border border-indigo-500 bg-indigo-950/30 text-indigo-300 flex items-center justify-center shadow-md px-4 text-center">
                                      <span className="block truncate">{block.text}</span>
                                    </div>
                                  )}

                                  {block.type === 'display' && (
                                    <div className="w-full h-full relative flex items-center justify-center">
                                      <svg width="100%" height="100%" viewBox="0 0 260 48" preserveAspectRatio="none" className="absolute inset-0 fill-purple-950/30 stroke-purple-500 stroke-[1.5] drop-shadow-md">
                                        <path d="M 22,0 Q 2,24 22,48 L 238,48 L 255,24 L 238,0 Z" />
                                      </svg>
                                      <div className="relative z-10 w-full text-center px-8 text-purple-300 text-[10px] leading-normal font-extrabold truncate">
                                        {block.text}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              ) : (
                                /* Nested Decision Node UI (Selection Structure) */
                                <div className="w-full flex flex-col items-center z-10">
                                  {/* Decision Diamond shape */}
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    onMouseEnter={() => setHighlightLine(block.lineNum)}
                                    onMouseLeave={() => setHighlightLine(null)}
                                    className={`w-full max-w-[260px] h-[52px] relative flex items-center justify-center cursor-help transition-all duration-200 z-10 ${
                                      isHovered ? 'scale-105 z-20' : ''
                                    }`}
                                  >
                                    <svg width="100%" height="100%" viewBox="0 0 260 52" preserveAspectRatio="none" className={`absolute inset-0 fill-amber-950/30 stroke-[1.5] drop-shadow-md ${isHovered ? 'stroke-indigo-500' : 'stroke-amber-500'}`}>
                                      <polygon points="130,0 260,26 130,52 0,26" />
                                    </svg>
                                    <div className="relative z-10 w-full text-center px-8 text-amber-300 text-[10px] leading-normal font-extrabold truncate">
                                      {block.text}
                                    </div>
                                  </motion.div>

                                  {/* Forking connection arrows */}
                                  <div className="w-full max-w-lg flex justify-between px-10 relative">
                                    {/* Yes Branch Arrow Left */}
                                    <div className="flex flex-col items-center flex-1">
                                      <span className="text-[9px] text-emerald-400 font-mono font-bold mb-1">ใช่ (Yes)</span>
                                      <svg width="40" height="24" viewBox="0 0 40 24" className="stroke-emerald-500 stroke-[1.5] fill-none">
                                        <path d="M 35,0 Q 20,20 5,20 L 5,24" markerEnd="url(#arrow-emerald)" />
                                      </svg>
                                    </div>

                                    {/* No Branch Arrow Right */}
                                    <div className="flex flex-col items-center flex-1">
                                      <span className="text-[9px] text-red-400 font-mono font-bold mb-1">ไม่ใช่ (No)</span>
                                      <svg width="40" height="24" viewBox="0 0 40 24" className="stroke-red-500 stroke-[1.5] fill-none">
                                        <path d="M 5,0 Q 20,20 35,20 L 35,24" markerEnd="url(#arrow-red)" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Forking Side-by-Side Content Columns */}
                                  <div className="w-full max-w-xl grid grid-cols-2 gap-4 items-stretch px-2 my-2 z-10">
                                    
                                    {/* YES column path stack */}
                                    <div className="border border-emerald-900/30 bg-emerald-950/5 rounded-2xl p-4 flex flex-col items-center space-y-4">
                                      {block.yesBranch.length === 0 ? (
                                        <span className="text-[9px] text-zinc-600 italic">ข้ามผ่านตรรกะนี้</span>
                                      ) : (
                                        block.yesBranch.map((subBlock, sIdx) => (
                                          <React.Fragment key={subBlock.id}>
                                            <div 
                                              onMouseEnter={() => setHighlightLine(subBlock.lineNum)}
                                              onMouseLeave={() => setHighlightLine(null)}
                                              className={`w-full max-w-[180px] h-[40px] flex items-center justify-center font-bold text-[10px] cursor-help transition-all duration-150 rounded-lg ${
                                                highlightLine === subBlock.lineNum 
                                                  ? 'scale-105 ring-1 ring-emerald-400 bg-emerald-900/40 text-emerald-300' 
                                                  : 'bg-emerald-950/20 border border-emerald-800/40 text-emerald-400'
                                              }`}
                                            >
                                              {subBlock.type === 'process' && <div className="truncate px-2">{subBlock.text}</div>}
                                              {subBlock.type === 'input' && <div className="truncate px-2 -skew-x-[10deg]"><span className="skew-x-[10deg] block">{subBlock.text}</span></div>}
                                              {subBlock.type === 'display' && <div className="truncate px-2 italic">{subBlock.text}</div>}
                                            </div>
                                            {sIdx < block.yesBranch.length - 1 && (
                                              <svg width="20" height="12" viewBox="0 0 20 12" className="stroke-emerald-600/50 stroke-[1.5] fill-none">
                                                <line x1="10" y1="0" x2="10" y2="8" />
                                                <path d="M 7,5 L 10,8 L 13,5" />
                                              </svg>
                                            )}
                                          </React.Fragment>
                                        ))
                                      )}
                                    </div>

                                    {/* NO column path stack */}
                                    <div className="border border-red-900/30 bg-red-950/5 rounded-2xl p-4 flex flex-col items-center space-y-4">
                                      {block.noBranch.length === 0 ? (
                                        <span className="text-[9px] text-zinc-600 italic">ข้ามผ่านตรรกะนี้</span>
                                      ) : (
                                        block.noBranch.map((subBlock, sIdx) => (
                                          <React.Fragment key={subBlock.id}>
                                            <div 
                                              onMouseEnter={() => setHighlightLine(subBlock.lineNum)}
                                              onMouseLeave={() => setHighlightLine(null)}
                                              className={`w-full max-w-[180px] h-[40px] flex items-center justify-center font-bold text-[10px] cursor-help transition-all duration-150 rounded-lg ${
                                                highlightLine === subBlock.lineNum 
                                                  ? 'scale-105 ring-1 ring-red-400 bg-red-900/40 text-red-300' 
                                                  : 'bg-red-950/20 border border-red-800/40 text-red-400'
                                              }`}
                                            >
                                              {subBlock.type === 'process' && <div className="truncate px-2">{subBlock.text}</div>}
                                              {subBlock.type === 'input' && <div className="truncate px-2 -skew-x-[10deg]"><span className="skew-x-[10deg] block">{subBlock.text}</span></div>}
                                              {subBlock.type === 'display' && <div className="truncate px-2 italic">{subBlock.text}</div>}
                                            </div>
                                            {sIdx < block.noBranch.length - 1 && (
                                              <svg width="20" height="12" viewBox="0 0 20 12" className="stroke-red-600/50 stroke-[1.5] fill-none">
                                                <line x1="10" y1="0" x2="10" y2="8" />
                                                <path d="M 7,5 L 10,8 L 13,5" />
                                              </svg>
                                            )}
                                          </React.Fragment>
                                        ))
                                      )}
                                    </div>

                                  </div>

                                  {/* Merging arrows flow down from branches */}
                                  <div className="w-full max-w-lg flex justify-between px-10 relative">
                                    <div className="flex-1 flex justify-center">
                                      <svg width="40" height="24" viewBox="0 0 40 24" className="stroke-emerald-500 stroke-[1.5] fill-none">
                                        <path d="M 5,0 L 5,10 Q 20,20 35,20" />
                                      </svg>
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                      <svg width="40" height="24" viewBox="0 0 40 24" className="stroke-red-500 stroke-[1.5] fill-none">
                                        <path d="M 35,0 L 35,10 Q 20,20 5,20" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Merge node dot */}
                                  <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700 z-20 -mt-1 shadow"></div>
                                </div>
                              )}

                              {/* Connective Arrow pointing down to the next block */}
                              {idx < compiledBlocks.length - 1 && (
                                <div className="w-[30px] h-[24px] flex items-center justify-center">
                                  <svg width="30" height="24" viewBox="0 0 30 24" className="stroke-zinc-800 stroke-[2] fill-none">
                                    <line x1="15" y1="0" x2="15" y2="18" />
                                    <path d="M 11,13 L 15,18 L 19,13" />
                                  </svg>
                                </div>
                              )}

                            </React.Fragment>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Standard compilation definitions footer */}
                  <div className="relative z-10 bg-zinc-900/60 border border-zinc-900 p-4 rounded-2xl text-[11px] text-zinc-500 text-center leading-relaxed">
                    💡 **เคล็ดลับความเร็วสูง:** นำเมาส์ไปชี้ที่บล็อกใดๆ บนแคนวาสฝังขวา เพื่อไฮไลท์ตรวจสอบความสอดคล้องของบรรทัดโค้ดฝั่งซ้ายแบบมีมิติสมดุล!
                  </div>

                </div>

                {/* SVG Definitions for arrows */}
                <svg width="0" height="0" className="absolute invisible pointer-events-none">
                  <defs>
                    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                    </marker>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>

              </motion.div>
            )}

          </AnimatePresence>
        </section>

        {/* Dynamic Interactive Conclusion Banner */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-lg relative overflow-hidden hover:shadow-xl transition-all">
          <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-indigo-500 to-cyan-500"></div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-lg font-bold text-zinc-950">สรุปแนวทางการเขียนผังงานเพื่อไปเขียนโค้ดจริง</h4>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-4xl">
                การปฏิบัติตามกฎเกณฑ์มาตรฐานไม่เพียงแต่ช่วยให้ผังงานของคุณดูสวยงามเป็นมืออาชีพเท่านั้น แต่ยังมีผลโดยตรงกับโครงสร้างของภาษาคอมพิวเตอร์ 
                เมื่อคุณเขียนรหัสความต้องการในแบบจำลอง **Diagram as Code** สังเกตว่าโค้ดบรรทัดตัดสินใจที่ผ่านเงื่อนไขจะสร้างทางแยกอย่างถูกต้อง 
                ซึ่งสอดคล้องกับคีย์เวิร์ดโครงสร้างการทำงานในภาษา Python เช่น `if` และ `else` การแบ่งส่วนการทำงานย่อยช่วยป้องกันการเกิดข้อผิดพลาดในการเขียนโปรแกรมจริงได้สูงสุด
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
      <TeacherTask 
        title="ใบงานกิจกรรมสร้างสรรค์ (ทบทวนความรู้ 2.9)" 
        taskText={`ใบงานฝึกทักษะ: "ตู้เอทีเอ็มออมสินหรรษา"

คำอธิบายภารกิจสำหรับผู้เรียน:
1. ให้นักเรียนสังเกตและทบทวนความรู้กฎเกณฑ์ผังงานที่ดี 5 ประการจากหน้าจอจำลองด้านบน
2. ให้ใช้เครื่องมือ "Diagram as Code" ทางด้านขวาในการเขียนรหัสจำลองระบบการทำธุรกรรมของ "ตู้เอทีเอ็ม (ATM) สำหรับถอนเงินสด" โดยมีข้อกำหนด:
   - รับรหัสและตรวจสอบเงื่อนไข (input -> if)
   - หากรหัสผ่านถูกต้อง ให้รับยอดเงินสดที่ต้องการถอน และตัดยอดบัญชีเพื่อจ่ายธนบัตรออก (process -> display)
   - หากรหัสผ่านผิดพลาด ให้ทำกานแสดงข้อผิดพลาดบนจอภาพและคืนบัตร (display)
3. ⚠️ ข้อห้ามสำคัญตามมาตรฐานความปลอดภัย ANSI:
   - ห้ามมีสัญลักษณ์ END มากกว่า 1 จุด
   - สัญลักษณ์การทำงานที่รับเข้าทางแป้นพิมพ์ต้องใช้ Parallelogram ห้ามชุ่ยใช้สี่เหลี่ยมผืนผ้า
   - เส้นทางไหลของเงื่อนไขการหักเงินในบัญชี ต้องกำกับป้าย "ใช่" และ "ไม่ใช่" ให้ชัดเจน
4. เมื่อนักเรียนแปลงโค้ดออกมาเป็นแผนผังสำเร็จเรียบร้อย สามารถทำการส่งแคปเจอร์หน้าจอและสัญลักษณ์ความถูกต้อง ANSI ไปยังช่องทางของคุณครูแม็คในชั่วโมงเรียนคอมพิวเตอร์`} 
      />
    </div>
  );
}
