import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  Cpu,
  Code,
  Database,
  Brain,
  Layers,
  ArrowRight,
  Activity,
  Server,
  Network,
  Sparkles,
  TerminalSquare,
  Globe,
  Heart,
  Clock,
  HelpCircle,
  Check,
  Play,
  RotateCcw,
  AlertCircle,
  Terminal,
  Info,
  ChevronRight,
  Sliders,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Zap,
  X,
  FileCode,
  Laptop
} from 'lucide-react';

export default function py1_1() {
  // ==========================================
  // Card 1 STATES (ภาษาคอมพิวเตอร์ คืออะไร)
  // ==========================================
  const [c1Option, setC1Option] = useState('greet');
  const [c1Pulse, setC1Pulse] = useState(false);

  const handleC1OptionChange = (opt) => {
    setC1Option(opt);
    setC1Pulse(true);
    setTimeout(() => setC1Pulse(false), 800);
  };

  const getC1Translations = () => {
    switch (c1Option) {
      case 'greet':
        return {
          human: 'หุ่นยนต์แสดงข้อความทักทาย สวัสดีชาวโลก',
          python: 'print("สวัสดีชาวโลก")',
          binary: '01110000 01110010 01101001 01101110 01110100 00101000 00100010 01110011 01100001 01110111 01100001 01110011 01100100 01100101 01100101 00100010 00101001'
        };
      case 'calc':
        return {
          human: 'ให้เอาผลรวมของ 15 บวก 30 เก็บไว้ในผลลัพธ์',
          python: 'result = 15 + 30',
          binary: '01110010 01100101 01110011 01110101 01101100 01110100 00100000 00111101 00100000 00110001 00110101 00100000 00101011 00100000 00110011 00110000'
        };
      case 'decide':
        return {
          human: 'ถ้าอายุมากกว่าหรือเท่ากับ 18 ปี ให้พิมพ์คำว่า ผ่าน',
          python: 'if age >= 18:\n    print("ผ่าน")',
          binary: '01101001 01100110 00100000 01100001 01100111 01100101 00100000 00111101 00111110 00100000 00110001 00111000 00111010 00100000 01110000 01110010 01101001 01101110 01110100'
        };
      default:
        return {};
    }
  };

  const c1Data = getC1Translations();

  // ==========================================
  // Card 2 STATES (บิดาแห่งภาษาโปรแกรมคอมพิวเตอร์)
  // ==========================================
  const [gearRotation, setGearRotation] = useState(0);
  const [analyticalOutput, setAnalyticalOutput] = useState([]);
  const [gearRunning, setGearRunning] = useState(false);

  const runAnalyticalEngine = () => {
    if (gearRunning) return;
    setGearRunning(true);
    setGearRotation(prev => prev + 360);

    const bernoulliSeq = ['1', '-1/2', '1/6', '0', '-1/30', '0', '1/42'];
    let index = 0;
    setAnalyticalOutput([]);

    const interval = setInterval(() => {
      if (index < bernoulliSeq.length) {
        setAnalyticalOutput(prev => [...prev, `B[${index * 2}] = ${bernoulliSeq[index]}`]);
        index++;
      } else {
        clearInterval(interval);
        setGearRunning(false);
      }
    }, 400);
  };

  const resetAnalyticalEngine = () => {
    setGearRotation(0);
    setAnalyticalOutput([]);
    setGearRunning(false);
  };

  // ==========================================
  // Card 3 STATES (องค์ประกอบของภาษาคอมพิวเตอร์)
  // ==========================================
  const [c3Snippet, setC3Snippet] = useState(1); // 1 = Syntax, 2 = Semantics, 3 = Pragmatics
  const [c3Repaired, setC3Repaired] = useState({ 1: false, 2: false, 3: false });
  const [c3Flash, setC3Flash] = useState(false);

  const handleC3Repair = (id) => {
    setC3Flash(true);
    setTimeout(() => setC3Flash(false), 600);
    setC3Repaired(prev => ({ ...prev, [id]: true }));
  };

  const handleC3Reset = (id) => {
    setC3Repaired(prev => ({ ...prev, [id]: false }));
  };

  const c3SnippetsData = {
    1: {
      title: 'ไวยากรณ์ (Syntax) - ความถูกต้องของอักขระและรูปประโยค',
      bugDesc: 'ลืมปิดเครื่องหมายวงเล็บปิดและเครื่องหมายคำพูด (Quote) โค้ดคอมไพล์ไม่ผ่านเกิด SyntaxError ทันที',
      wrongCode: 'print("ยินดีต้อนรับสู่โลกของไพธอน',
      rightCode: 'print("ยินดีต้อนรับสู่โลกของไพธอน")',
      explain: 'ไวยากรณ์เปรียบเสมือนหลักสะกดคำ คอมพิวเตอร์ต้องการความสมบูรณ์แบบ 100% ขาดสัญลักษณ์เพียงตัวเดียวเครื่องจะไม่ประมวลผล'
    },
    2: {
      title: 'ความหมาย (Semantics) - ความถูกต้องเชิงตรรกะและการประมวลผล',
      bugDesc: 'เขียนสูตรคำนวณพื้นที่สี่เหลี่ยมผืนผ้าผิดตรรกะ โดยไปนำความกว้างมา "บวก" ความสูง แทนที่จะนำมา "คูณ"',
      wrongCode: 'width = 10\nheight = 5\narea = width + height # เกิดข้อผิดพลาดเชิงความหมาย',
      rightCode: 'width = 10\nheight = 5\narea = width * height # แก้ไขตรรกะให้ถูกต้องเชิงคณิตศาสตร์',
      explain: 'คำสั่งถูกตามไวยากรณ์และรันได้ปกติ แต่ผลลัพธ์ที่ได้เพี้ยนจากความเป็นจริง เนื่องจากตรรกะเบื้องหลังไม่ถูกต้องตามหลักการ'
    },
    3: {
      title: 'การประยุกต์ใช้ (Pragmatics) - ความสมเหตุสมผลและประสิทธิภาพ',
      bugDesc: 'เขียนโครงสร้างวนซ้ำ (Loop) ทำงานเพียงรอบเดียวเพื่อพิมพ์ข้อความ ซึ่งเป็นการเขียนที่ซับซ้อนโดยไม่จำเป็นและเปลืองทรัพยากร',
      wrongCode: 'for i in range(1):\n    print("สวัสดี") # ลูปทำงานรอบเดียวโดยไม่จำเป็น',
      rightCode: 'print("สวัสดี") # เขียนอย่างตรงไปตรงมาและรวดเร็วกว่า',
      explain: 'การออกแบบโปรแกรมต้องไม่เพียงแค่ทำงานได้ แต่ต้องเขียนง่าย มีประสิทธิภาพสูง อ่านเข้าใจง่าย และไม่สิ้นเปลืองเวลา CPU'
    }
  };

  // ==========================================
  // Card 4 STATES (ประวัติและวิวัฒนาการ)
  // ==========================================
  const [activeEra, setActiveEra] = useState(0);

  const eras = [
    {
      name: 'ยุคกลไกคณิตศาสตร์',
      period: 'ปี ค.ศ. 1843',
      title: 'ต้นกำเนิดโปรแกรมและฟันเฟือง',
      desc: 'เอดา เลิฟเลซ เขียนขั้นตอนคำนวณในกระดาษวิเคราะห์ เป็นแบบแผนการทำตามลำดับชุดคำสั่งทางคณิตศาสตร์ยุคแรกสุด',
      codeTitle: 'รหัสแผนการประมวลผลของเอดา (เขียนจำลองคำอธิบายด้วยลายมือ):',
      code: 'Operation Card 1: Multiply (v1 × v2)\nOperation Card 2: Subtract (v3 - v4)\nOperation Card 3: Store Result to Variable v5',
      badge: '1GL Mechanical'
    },
    {
      name: 'ยุคภาษาเครื่อง (Machine)',
      period: 'ปี ค.ศ. 1940s',
      title: 'ตัวเลขฐานสองแห่งแผงวงจร',
      desc: 'สื่อสารและควบคุมทรานซิสเตอร์ด้วยไฟฟ้าแรงดันสูงและต่ำ แทนที่ด้วยรหัสเลข 0 และ 1 โดยตรง มนุษย์เข้าใจยากและเขียนยากสุดขีด',
      codeTitle: 'ภาษาเครื่องสั่งแสดงผล (ตัวเลขฐานสองบนหน่วยความจำ):',
      code: '10101100 00010101 11001110 01100011\n00111100 00000000 11111111 00001111',
      badge: '1GL Binary'
    },
    {
      name: 'ยุคภาษาแอสเซมบลี',
      period: 'ปี ค.ศ. 1950s',
      title: 'รหัสตัวย่อช่วยจำเชิงเทคนิค',
      desc: 'เริ่มใช้คำย่อภาษาอังกฤษ (Mnemonics) เช่น ADD, SUB, MOV แทนการกรอกเลขศูนย์และหนึ่ง ช่วยเพิ่มความเร็วการเขียนโค้ด',
      codeTitle: 'รหัสภาษาแอสเซมบลี (Assembly Language):',
      code: 'MOV AX, 40\nADD AX, 20\nMOV total, AX\nHLT',
      badge: '2GL Assembly'
    },
    {
      name: 'ยุคภาษาระดับสูงเชิงโครงสร้าง',
      period: 'ปี ค.ศ. 1960s-1980s',
      title: 'ไวยากรณ์ใกล้เคียงกับภาษาอังกฤษ',
      desc: 'มนุษย์สามารถเขียนด้วยหลักเกณฑ์คำอ่านที่เข้าใจง่ายอย่างเป็นโครงสร้าง เช่น ภาษา Fortran, C, Pascal และ C++ ที่พัฒนาต่อมา',
      codeTitle: 'ตัวอย่างโค้ดโครงสร้างภาษา C:',
      code: '#include <stdio.h>\nint main() {\n    printf("สวัสดีคุณครูแม็ค\\n");\n    return 0;\n}',
      badge: '3GL Structural'
    },
    {
      name: 'ยุคภาษาสมัยใหม่ (Modern)',
      period: 'ปี ค.ศ. 1990s-ปัจจุบัน',
      title: 'เน้นความง่ายและความรวดเร็ว',
      desc: 'ภาษารุ่นใหม่ที่ไวยากรณ์คลีน ไม่ซับซ้อน เช่น Python, JavaScript, Java ซึ่งทำงานข้ามแพลตฟอร์มได้อย่างอิสระและทรงพลัง',
      codeTitle: 'รหัสภาษา Python สมัยใหม่:',
      code: 'name = "ครูแม็ค"\nprint(f"ยินดีต้อนรับ {name}")',
      badge: '3GL-4GL Object-Oriented'
    },
    {
      name: 'ยุคภาษาธรรมชาติและ AI',
      period: 'ยุคปัจจุบันและอนาคต',
      title: 'การสั่งการด้วยภาษาพูดผ่านปัญญาประดิษฐ์',
      desc: 'การใช้อินเทอร์เฟซภาษาธรรมชาติที่ปัญญาประดิษฐ์เข้าใจ ช่วยเขียนและตรวจทานรหัสโค้ดอย่างทรงประสิทธิภาพสูงสุดผ่านโมเดล LLM',
      codeTitle: 'คำสั่งภาษาพูดมนุษย์แบบพร้อมใช้ (Natural Language AI Prompt):',
      code: 'เขียนโปรแกรมไพธอนเพื่อคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7%\nพร้อมแสดงผลลัพธ์ผ่านหน้าจอ virtual cash register\n>>> AI ทำการสังเคราะห์ตัวโค้ดพร้อมทำงานให้ทันที',
      badge: '5GL AI-Driven'
    }
  ];

  // ==========================================
  // Card 5 STATES (ความสัมพันธ์ภาษากับโปรแกรม)
  // ==========================================
  const [c5Step, setC5Step] = useState('logic'); // logic -> code -> app
  const [c5Flowing, setC5Flowing] = useState(false);
  const [c5AppInputValue, setC5AppInputValue] = useState(25); // Celsius value for simulator

  const triggerC5Flow = (step) => {
    setC5Step(step);
    setC5Flowing(true);
    setTimeout(() => setC5Flowing(false), 600);
  };

  // ==========================================
  // Card 6 STATES (ความสำคัญของภาษาคอมพิวเตอร์)
  // ==========================================
  const [c6Level, setC6Level] = useState(1); // 1 = Low, 2 = Medium, 3 = High

  // ==========================================
  // Card 7 STATES (การเลือกใช้ภาษาที่เหมาะสม)
  // ==========================================
  const [c7Answers, setC7Answers] = useState({
    ai: '',
    web: '',
    chip: '',
    db: ''
  });
  const [c7Checked, setC7Checked] = useState(false);
  const [c7Score, setC7Score] = useState(0);
  const [selectedLangInfo, setSelectedLangInfo] = useState('Python');


  const challenges = [
    {
      id: 'ai',
      title: 'วิเคราะห์โครงสร้างข้อมูลภาพทางการแพทย์และสร้างโมเดลปัญญาประดิษฐ์เพื่อช่วยวินิจฉัยโรค',
      bestLanguage: 'Python',
      why: 'มีระบบนิเวศน์ทางคลังข้อมูลปัญญาประดิษฐ์และคณิตศาสตร์ที่ครอบคลุม เช่น TensorFlow, PyTorch และ NumPy'
    },
    {
      id: 'web',
      title: 'พัฒนาหน้าอินเทอร์เฟซเว็บไซต์ของสถาบันศึกษาให้ตอบสนองทันท่วงทีลื่นไหลและดูสวยงามทันสมัย',
      bestLanguage: 'JavaScript',
      why: 'เป็นภาษาเดียวที่เว็บบราวเซอร์ทุกตัวรองรับการรันไคลเอนต์และเขียนการโต้ตอบหน้าเว็บได้สมบูรณ์'
    },
    {
      id: 'chip',
      title: 'เขียนโปรแกรมควบคุมชิปประมวลผลขนาดจิ๋วในกลไกของเบรก ABS อัตโนมัติในรถยนต์ไฟฟ้า',
      bestLanguage: 'C++',
      why: 'ทำงานได้เร็วสุดขีด เข้าถึงหน่วยความจำทางฮาร์ดแวร์โดยตรงโดยปราศจากอาการหน่วงและไม่กินไฟ'
    },
    {
      id: 'db',
      title: 'สืบค้นข้อมูลธุรกรรมย้อนหลังของนักเรียนกว่าสี่หมื่นคนอย่างเร่งด่วนในเซิร์ฟเวอร์หลังบ้าน',
      bestLanguage: 'SQL',
      why: 'เป็นภาษาสอบถามที่ออกแบบมาสำหรับจัดการโครงสร้างตารางข้อมูลขนาดใหญ่โดยเฉพาะและทำงานได้รวดเร็ว'
    }
  ];

  const handleC7Select = (key, val) => {
    setC7Answers(prev => ({ ...prev, [key]: val }));
    setC7Checked(false);
  };

  const checkC7Matching = () => {
    let score = 0;
    challenges.forEach(ch => {
      if (c7Answers[ch.id] === ch.bestLanguage) {
        score += 25;
      }
    });
    setC7Score(score);
    setC7Checked(true);
  };

  const resetC7Matching = () => {
    setC7Answers({ ai: '', web: '', chip: '', db: '' });
    setC7Checked(false);
    setC7Score(0);
  };

  // ==========================================
  // Quiz STATES (ควิซทดสอบสะสมแต้ม)
  // ==========================================
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizState, setQuizState] = useState('playing'); // playing, success, fail
  const [xp, setXp] = useState(0);

  const quizCases = [
    {
      question: 'ผู้บุกเบิกท่านใดที่ได้รับการยกย่องอย่างสากลว่าเป็น "โปรแกรมเมอร์คนแรกของโลก" จากการเขียนขั้นตอนคำนวณตัวเลข Bernoulli ในอดีต?',
      options: [
        { key: 'A', text: 'Grace Hopper', isCorrect: false },
        { key: 'B', text: 'Ada Lovelace', isCorrect: true, feedback: 'เป๊ะมาก! เอดา เลิฟเลซ ออกแบบขั้นตอนอัลกอริทึมให้กับเครื่อง Analytical Engine ในปี ค.ศ. 1843' },
        { key: 'C', text: 'Guido van Rossum', isCorrect: false },
        { key: 'D', text: 'Dennis Ritchie', isCorrect: false }
      ]
    },
    {
      question: 'ข้อผิดพลาดในรูปแบบการสะกดข้อความตกหล่น ลืมใส่เครื่องหมายสำคัญ หรือจัดรูปสัญลักษณ์ไม่ตรงข้อกำหนดภาษา จัดเป็นความบกพร่องประเภทใด?',
      options: [
        { key: 'A', text: 'Syntax Error (ข้อผิดพลาดทางไวยากรณ์)', isCorrect: true, feedback: 'ถูกต้อง! ความสมบูรณ์แบบของรูปประโยคจัดอยู่ในองค์ประกอบไวยากรณ์ (Syntax)' },
        { key: 'B', text: 'Semantics Error (ข้อผิดพลาดเชิงความหมาย)', isCorrect: false },
        { key: 'C', text: 'Pragmatics Error (ข้อผิดพลาดด้านการใช้งาน)', isCorrect: false },
        { key: 'D', text: 'Logical Error (ข้อผิดพลาดการทำงานภายนอก)', isCorrect: false }
      ]
    },
    {
      question: 'เมื่อมองย้อนประวัติศาสตร์การเขียนโปรแกรม ยุคที่มีการนำ "ภาษาธรรมชาติ (Natural Language) และ AI" เข้ามาช่วยในการพัฒนาโค้ดจัดเป็นวิวัฒนาการในระดับใด?',
      options: [
        { key: 'A', text: 'ภาษาเครื่องยุคต้น (1GL)', isCorrect: false },
        { key: 'B', text: 'ภาษารุ่นที่ 2 (2GL) และการ์ดกระดาษ', isCorrect: false },
        { key: 'C', text: 'ภาษาระดับโครงสร้างระดับสูง (3GL)', isCorrect: false },
        { key: 'D', text: 'ภาษาปัญญาประดิษฐ์และสั่งการด้วยภาษาธรรมชาติ (5GL / AI Era)', isCorrect: true, feedback: 'ยอดเยี่ยม! การเชื่อมโยงเจตจำนงของมนุษย์ด้วยคำสั่งภาษาธรรมชาติตต่อ AI เป็นภาพวิวัฒนาการขั้นล่าสุด' }
      ]
    }
  ];

  const handleQuizAnswer = (opt) => {
    if (quizState !== 'playing') return;
    setSelectedAns(opt);
    if (opt.isCorrect) {
      setQuizState('success');
      setXp(prev => prev + 15);
    } else {
      setQuizState('fail');
    }
  };

  const nextQuizLevel = () => {
    setQuizIndex(prev => prev + 1);
    setSelectedAns(null);
    setQuizState('playing');
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAns(null);
    setQuizState('playing');
    setXp(0);
  };

  const activeQuiz = quizCases[quizIndex];

  // ==========================================
  // TeacherTask Content
  // ==========================================
  const teacherTaskContent = `ให้นักเรียนจัดทำบันทึกสรุปลงในสมุดจดบันทึก หรือโปรแกรมเอกสาร โดยวิเคราะห์หัวข้อดังต่อไปนี้:
1. ภาษาคอมพิวเตอร์และโปรแกรมคอมพิวเตอร์มีความสัมพันธ์และแตกต่างกันอย่างไร?
2. ยกตัวอย่างสถานการณ์จริงที่คุณต้องการสร้างซอฟต์แวร์ขึ้นมา 1 อย่าง พร้อมระบุชื่อภาษาคอมพิวเตอร์ที่ต้องการเลือกใช้ และอธิบายเหตุผลประกอบโดยละเอียด (อ้างอิงหลักการเลือกภาษาที่เหมาะสมกับงาน)`;

  return (
    <div className="w-full mx-auto space-y-8 font-['Inter',_'Noto_Sans_Thai'] pb-12">
      {/* Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[15%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Layer 3: Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-12">

        {/* ============================================================================
            1️⃣ CARD 1: ภาษาคอมพิวเตอร์ คืออะไร (1.1.1)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Laptop className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  ภาษาคอมพิวเตอร์ คืออะไร
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">What is a Computer Language?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed">
                  คอมพิวเตอร์เป็นอุปกรณ์ฮาร์ดแวร์ดิจิทัลที่ทำงานด้วยสัญญาณวงจรไฟฟ้า แต่ไม่สามารถเข้าใจหรือตีความคำพูดที่ซับซ้อนของมนุษย์ได้โดยตรง
                  มนุษย์จึงต้องสร้าง <strong>"ภาษาคอมพิวเตอร์ (Computer Language)"</strong> ขึ้นมาเพื่อเป็นข้อตกลงและเป็นสื่อกลางนำรหัสส่งคำสั่งควบคุมการทำงาน
                </p>

                <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-zinc-50 rounded-r-xl">
                  <span className="font-bold text-zinc-800 text-[16px] block">ข้อสรุปหัวใจสำคัญ:</span>
                  <span className="text-zinc-500 text-[15px] leading-relaxed block mt-0.5">
                    ภาษาคอมพิวเตอร์แตกต่างจากภาษาพูดทั่วไปตรงที่มีความกระชับ รัดกุม ชัดเจน และมีรูปแบบโครงสร้างไวยากรณ์ (Syntax) ที่ตรงไปตรงมา ปราศจากความคลุมเครือ เพื่อให้เครื่องจักรทำงานอย่างแม่นยำ
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="block text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-widest">กดเลือกคำสั่งตรรกะจำลองภาษา:</span>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleC1OptionChange('greet')}
                      className={`py-2.5 px-4 text-xs md:text-sm font-bold rounded-xl border transition-all active:scale-98 ${c1Option === 'greet'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                      แสดงการทักทาย
                    </button>
                    <button
                      onClick={() => handleC1OptionChange('calc')}
                      className={`py-2.5 px-4 text-xs md:text-sm font-bold rounded-xl border transition-all active:scale-98 ${c1Option === 'calc'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                      สั่งคิดคำนวณ
                    </button>
                    <button
                      onClick={() => handleC1OptionChange('decide')}
                      className={`py-2.5 px-4 text-xs md:text-sm font-bold rounded-xl border transition-all active:scale-98 ${c1Option === 'decide'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                      สั่งตัดสินเงื่อนไข
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 font-mono text-sm text-zinc-350 shadow-2xl relative overflow-hidden min-h-[290px] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-8 bg-zinc-900 border-b border-zinc-800/80 flex items-center px-4 gap-2 justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-zinc-500 font-sans">interactive_translator.sh</span>
                  </div>

                  <div className={`mt-8 space-y-4 transition-all duration-300 ${c1Pulse ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'}`}>
                    <div>
                      <span className="text-zinc-500 block text-xs uppercase font-sans tracking-widest font-bold">1. แนวคิดภาษาธรรมชาติมนุษย์ (Human intent):</span>
                      <p className="text-indigo-400 font-sans text-[15px] mt-1">{c1Data.human}</p>
                    </div>

                    <div className="border-t border-zinc-900 pt-3">
                      <span className="text-zinc-500 block text-xs uppercase font-sans tracking-widest font-bold">2. รหัสภาษาไพธอน (High-level Code):</span>
                      <pre className="text-cyan-400 text-[14px] font-semibold mt-1 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-900 whitespace-pre-wrap">{c1Data.python}</pre>
                    </div>

                    <div className="border-t border-zinc-900 pt-3">
                      <span className="text-zinc-500 block text-xs uppercase font-sans tracking-widest font-bold">3. รหัสเครื่องฐานสองคอมพิวเตอร์ (Binary Machine Code):</span>
                      <p className="text-emerald-400 break-all text-[13px] leading-relaxed mt-1 font-semibold tracking-wider">{c1Data.binary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================================
            2️⃣ CARD 2: บิดาแห่งภาษาโปรแกรมคอมพิวเตอร์ (1.1.2)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Heart className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  บิดาแห่งภาษาโปรแกรมคอมพิวเตอร์
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">Ada Lovelace: The First Programmer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed">
                    แม้ <strong>Charles Babbage</strong> จะเป็นผู้ออกแบบสร้างเครื่องคำนวณเชิงวิเคราะห์ (Analytical Engine)
                    แต่ผู้ที่เล็งเห็นว่าเครื่องจักรฟันเฟืองกระดาษนี้ สามารถคำนวณสิ่งที่นอกเหนือจากเลขคณิตปกติได้คือ <strong>Ada Lovelace (เอดา เลิฟเลซ)</strong>
                  </p>
                  <p className="text-zinc-500 text-[15px] leading-relaxed">
                    เอดาเขียนคำอธิบายรายละเอียดตารางขั้นตอนในการหมุนเฟืองประมวลผลคำนวณลำดับตัวเลข <strong>Bernoulli Numbers</strong> ซึ่งแผนผังชิ้นนี้ได้รับการยอมรับในฐานะ <strong>"โปรแกรมซอฟต์แวร์คอมพิวเตอร์ชิ้นแรกของโลก"</strong> ส่งผลให้เธอได้รับการยกย่องเป็นโปรแกรมเมอร์คนแรก
                  </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4.5 my-4">
                  <span className="text-xs md:text-sm font-bold text-indigo-800 uppercase block mb-1">ความเห็นเชิงทฤษฎีเด่นชัด:</span>
                  <p className="text-zinc-600 text-[13.5px] leading-relaxed">
                    "เอดาเชื่อมั่นว่า เครื่องยนต์วิเคราะห์นี้สามารถรังสรรค์สิ่งทอ หรือแม้กระทั่งเขียนท่วงทำนองเสียงเพลงได้ หากเราป้อนตรรกะภาษาคำสั่งเชิงวิทยาศาสตร์ที่ถูกต้อง"
                  </p>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={runAnalyticalEngine}
                    disabled={gearRunning}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 active:scale-98 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100"
                  >
                    <Play className={`w-4 h-4 ${gearRunning ? 'animate-spin' : ''}`} />
                    {gearRunning ? 'เครื่องจักรกลกำลังหมุนเฟือง...' : 'จำลองสั่งงาน Analytical Engine'}
                  </button>
                  {analyticalOutput.length > 0 && (
                    <button
                      onClick={resetAnalyticalEngine}
                      className="p-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 active:scale-95 rounded-xl border border-zinc-200 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between h-full min-h-[300px]">

                  {/* SVG Cogwheels simulation */}
                  <div className="flex justify-center items-center py-4 relative">
                    <svg width="220" height="120" viewBox="0 0 220 120" className="opacity-80">
                      {/* Left Big Cog */}
                      <g transform={`translate(60, 60) rotate(${gearRotation})`} className="transition-transform duration-[2000ms] ease-out">
                        <circle cx="0" cy="0" r="40" fill="none" stroke="#818cf8" strokeWidth="4" strokeDasharray="10 5" />
                        <circle cx="0" cy="0" r="28" fill="none" stroke="#4f46e5" strokeWidth="2" />
                        <path d="M-40 0 L40 0 M0 -40 L0 40" stroke="#818cf8" strokeWidth="2" />
                      </g>

                      {/* Right Small Cog */}
                      <g transform={`translate(150, 60) rotate(${-gearRotation * 1.5})`} className="transition-transform duration-[2000ms] ease-out">
                        <circle cx="0" cy="0" r="26" fill="none" stroke="#22d3ee" strokeWidth="4" strokeDasharray="8 4" />
                        <circle cx="0" cy="0" r="16" fill="none" stroke="#0891b2" strokeWidth="2" />
                        <path d="M-26 0 L26 0 M0 -26 L0 26" stroke="#22d3ee" strokeWidth="1.5" />
                      </g>

                      {/* Connection lines */}
                      <path d="M 60,60 L 150,60" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    </svg>

                    <div className="absolute top-1 right-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Mechanical Engine v1843
                    </div>
                  </div>

                  {/* Punch card simulation output */}
                  <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 font-mono text-xs md:text-[13px] leading-relaxed text-emerald-400 shadow-inner min-h-[110px]">
                    <span className="text-zinc-600 block text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" /> Punch-Card Printed Output:
                    </span>
                    {analyticalOutput.length === 0 ? (
                      <span className="text-zinc-500 italic block mt-3 text-xs md:text-[13px]">กดปุ่มเริ่มทำงานเครื่องยนต์วิเคราะห์เพื่อประมวลผลตัวเลขเบอร์นูลลี...</span>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {analyticalOutput.map((out, i) => (
                          <div key={i} className="animate-pulse">➔ {out}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================================
            3️⃣ CARD 3: องค์ประกอบของภาษาคอมพิวเตอร์ (1.1.3)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  องค์ประกอบของภาษาคอมพิวเตอร์
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">Core Elements: Syntax, Semantics & Pragmatics</p>
              </div>
            </div>

            <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed mb-6 max-w-4xl">
              ภาษาคอมพิวเตอร์ทุกภาษาไม่ว่าจะเป็นระดับใด มีความเข้มข้นประกอบด้วย 3 ส่วนสำคัญที่ช่วยจัดโครงสร้างคำสั่ง ควบคุมความสมเหตุสมผล และประสิทธิภาพการนำไปใช้งานจริง:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {[
                { id: 1, name: 'Syntax (ไวยากรณ์)', desc: 'กฎเกณฑ์รูปแบบการเขียน ตัวสะกด เครื่องหมาย วงเล็บ และการวางโครงสร้างคำให้ถูกต้องเพื่อให้คอมพิวเตอร์เข้าใจโครงประโยค' },
                { id: 2, name: 'Semantics (ความหมาย)', desc: 'ตรรกะเบื้องหลัง โค้ดสะกดถูกแต่ต้องคำนวณได้ค่าที่สมเหตุสมผลและได้ตรรกะที่ถูกต้องเชิงทฤษฎีระบบคอมพิวเตอร์' },
                { id: 3, name: 'Pragmatics (การประยุกต์ใช้)', desc: 'ความสอดคล้องกับวัตถุประสงค์ การประหยัดเวลา CPU ทรัพยากรเครื่องจักร และความง่ายของนักพัฒนาในการดูแลต่อยอด' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setC3Snippet(item.id)}
                  className={`p-5 rounded-2xl border text-left transition-all active:scale-98 flex flex-col justify-between ${c3Snippet === item.id
                      ? 'bg-indigo-50/50 border-indigo-500/80 shadow-md'
                      : 'bg-white border-zinc-200/80 hover:bg-zinc-50'
                    }`}
                >
                  <div>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg font-bold text-xs mb-3 ${c3Snippet === item.id ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500'
                      }`}>{item.id}</span>
                    <h5 className="font-bold text-zinc-900 text-[15px] md:text-[16px] mb-1.5">{item.name}</h5>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-indigo-600 mt-4 flex items-center gap-1">
                    ทดสอบแก้ไขส่วนที่ {item.id} <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>

            {/* Repair Area */}
            <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-bl-full pointer-events-none z-0"></div>

              <div className="relative z-10">
                <span className="text-zinc-500 block text-xs uppercase font-mono tracking-widest font-bold mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" /> Syntax & Semantics repair station
                </span>

                <h6 className="text-white text-base font-bold mb-1 leading-relaxed">
                  {c3SnippetsData[c3Snippet].title}
                </h6>
                <p className="text-zinc-400 text-xs md:text-sm mb-4">{c3SnippetsData[c3Snippet].bugDesc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Wrong code panel */}
                  <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4.5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block mb-2 font-sans flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> โค้ดที่มีความบกพร่อง (Buggy Code):
                      </span>
                      <pre className="font-mono text-xs md:text-[13.5px] text-red-300 whitespace-pre">{c3SnippetsData[c3Snippet].wrongCode}</pre>
                    </div>

                    {!c3Repaired[c3Snippet] ? (
                      <button
                        onClick={() => handleC3Repair(c3Snippet)}
                        className="mt-4 w-full bg-red-950/40 hover:bg-red-950/60 border border-red-900 text-red-200 active:scale-98 py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all"
                      >
                        🔧 ตรวจพบจุดพัง ➔ ทำการซ่อมตรรกะ
                      </button>
                    ) : (
                      <span className="text-zinc-600 text-xs md:text-sm italic mt-4 block">ซ่อมแซมเสร็จสิ้นแล้ว</span>
                    )}
                  </div>

                  {/* Fixed code panel */}
                  <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4.5 flex flex-col justify-between min-h-[140px] relative">
                    <div className={`absolute inset-0 bg-emerald-500/5 rounded-2xl pointer-events-none transition-opacity duration-300 ${c3Flash ? 'opacity-100' : 'opacity-0'}`}></div>

                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-2 font-sans flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> โค้ดหลังปรับปรุงแก้ไข (Corrected Code):
                      </span>
                      {c3Repaired[c3Snippet] ? (
                        <pre className="font-mono text-xs md:text-[13.5px] text-emerald-400 whitespace-pre animate-pulse">{c3SnippetsData[c3Snippet].rightCode}</pre>
                      ) : (
                        <span className="text-zinc-600 text-xs md:text-sm italic block mt-3">รอคำสั่งซ่อมแซมตรรกะด้านซ้าย...</span>
                      )}
                    </div>

                    {c3Repaired[c3Snippet] && (
                      <div className="mt-4 flex gap-2">
                        <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-xl p-3 flex-1 text-xs md:text-[13px] leading-relaxed text-emerald-350 font-sans">
                          {c3SnippetsData[c3Snippet].explain}
                        </div>
                        <button
                          onClick={() => handleC3Reset(c3Snippet)}
                          className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-zinc-700 active:scale-95 flex items-center justify-center"
                          title="จำลองใหม่"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ============================================================================
            4️⃣ CARD 4: ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์ (1.1.4)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">Historical Pioneers & Code Evolution Timeline</p>
              </div>
            </div>

            <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed mb-8">
              การเขียนโปรแกรมคอมพิวเตอร์ผ่านวิวัฒนาการทางภาษามาอย่างยาวนาน จากกลไกกลอนกลองกระดาษและการต่อวงจรสายไฟยุคสงครามโลก สู่กระบวนการเขียนคำสั่งสากล และการประยุกต์ใช้ <strong>ภาษาธรรมชาติควบคุม AI</strong> ร่วมเขียนรหัสในปัจจุบัน <strong>เลือกช่วงเวลายุคประวัติศาสตร์เพื่อศึกษาการพัฒนา:</strong>
            </p>

            {/* Horizontal Era selector with indicators */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 mb-8">
              {eras.map((era, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEra(index)}
                  className={`p-4 rounded-2xl text-center transition-all duration-200 active:scale-95 flex flex-col justify-between border ${activeEra === index
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl scale-[1.01]'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900'
                    }`}
                >
                  <span className={`text-[11px] font-bold block mb-1 font-sans ${activeEra === index ? 'text-indigo-400' : 'text-zinc-500'}`}>
                    {era.period}
                  </span>
                  <span className="text-[13.5px] font-bold block leading-snug font-sans">{era.name}</span>
                </button>
              ))}
            </div>

            {/* Details Panel */}
            <div className="bg-zinc-900 text-white rounded-3xl p-6.5 border border-zinc-800 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-semibold">
                    {eras[activeEra].badge}
                  </div>
                  <h4 className="text-[22px] md:text-2xl font-bold text-white mb-2 leading-relaxed">{eras[activeEra].title}</h4>
                  <p className="text-zinc-300 text-xs md:text-[15px] leading-relaxed max-w-2xl">{eras[activeEra].desc}</p>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-zinc-950 rounded-2xl p-4.5 border border-zinc-800 font-mono text-xs md:text-[13px] leading-relaxed text-zinc-300">
                    <span className="text-zinc-500 block text-[10.5px] uppercase tracking-wider mb-2 font-sans font-bold">
                      {eras[activeEra].codeTitle}
                    </span>
                    <pre className="text-indigo-300 whitespace-pre-wrap">{eras[activeEra].code}</pre>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================================
            5️⃣ CARD 5: ความสัมพันธ์ระหว่างภาษากับโปรแกรม (1.1.5)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Network className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  ความสัมพันธ์ระหว่างภาษาคอมพิวเตอร์กับโปรแกรม
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">Language-to-Program Relationship Simulator</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="space-y-4 flex-1">
                  <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed">
                    ความสัมพันธ์ระหว่าง <strong>"ภาษาคอมพิวเตอร์"</strong> กับ <strong>"โปรแกรม"</strong> เปรียบเสมือนความสัมพันธ์ระหว่าง <strong>พิมพ์เขียว (Blueprint)</strong> กับ <strong>บ้านที่ก่อสร้างจริง</strong>
                  </p>
                  <ul className="space-y-3.5 text-zinc-500 text-[14px] md:text-[15px] leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-indigo-500 font-bold">➔</span>
                      <span><strong>ภาษาคอมพิวเตอร์:</strong> คือชุดของคำศัพท์ ไวยากรณ์ และโครงสร้างข้อตกลงที่ใช้ในการสร้างข้อเสนอสั่งงาน</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-500 font-bold">➔</span>
                      <span><strong>โปรแกรมคอมพิวเตอร์:</strong> คือผลลัพธ์ที่เป็นชุดคำสั่งสำเร็จรูปประมวลผล (Executable Program) ที่ถูกคอมไพล์หรือนำมาใช้ติดตั้งในแรมของคอมพิวเตอร์เพื่อทำงาน</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 mt-6">
                  <span className="block text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-widest">ขั้นตอนการแปลงสภาพตรรกะ (Interactive Flow):</span>
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => triggerC5Flow('logic')}
                      className={`p-3.5 text-xs md:text-sm font-bold text-left rounded-xl transition-all border flex items-center justify-between ${c5Step === 'logic'
                          ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                    >
                      <span>ขั้นที่ 1: ตรรกะมนุษย์ (Logic Idea)</span>
                      {c5Step === 'logic' && <ArrowRight className="w-4 h-4 text-indigo-400" />}
                    </button>
                    <button
                      onClick={() => triggerC5Flow('code')}
                      className={`p-3.5 text-xs md:text-sm font-bold text-left rounded-xl transition-all border flex items-center justify-between ${c5Step === 'code'
                          ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                    >
                      <span>ขั้นที่ 2: รหัสภาษาคอมพิวเตอร์ (Programming Code)</span>
                      {c5Step === 'code' && <ArrowRight className="w-4 h-4 text-indigo-400" />}
                    </button>
                    <button
                      onClick={() => triggerC5Flow('app')}
                      className={`p-3.5 text-xs md:text-sm font-bold text-left rounded-xl transition-all border flex items-center justify-between ${c5Step === 'app'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                    >
                      <span>ขั้นที่ 3: โปรแกรมพร้อมใช้งานจริง (Executable App)</span>
                      {c5Step === 'app' && <ArrowRight className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-zinc-950 rounded-3xl p-6 border border-zinc-800 shadow-2xl flex flex-col justify-between min-h-[380px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"></div>

                <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-slate-800 pb-2 mb-3">
                  <span className="uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" /> structural conversion visualizer
                  </span>
                  <span className="text-indigo-400 font-semibold font-mono">
                    {c5Step === 'logic' ? 'logic layout' : c5Step === 'code' ? 'parsing code' : 'application active'}
                  </span>
                </div>

                {/* SVG logic transition */}
                <div className={`relative z-10 flex-1 flex items-center justify-center py-2 transition-all duration-300 ${c5Flowing ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                  {c5Step === 'logic' && (
                    <div className="text-center space-y-4 max-w-md p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 animate-pulse">
                      <span className="text-indigo-400 text-xs md:text-sm font-bold block uppercase tracking-wider">แนวคิดและตรรกะในหัวสมองของมนุษย์:</span>
                      <p className="text-white text-sm md:text-[15px] leading-relaxed">
                        "ต้องการนำอุณหภูมิองศาเซลเซียสมาปรับแปลงค่าเป็นองศาฟาเรนไฮต์ เพื่อคำนวณเกณฑ์ประมวลผลระบบทำความเย็น"
                      </p>
                    </div>
                  )}

                  {c5Step === 'code' && (
                    <div className="w-full text-left space-y-3 font-mono">
                      <span className="text-cyan-400 text-xs block uppercase font-sans font-bold">เขียนคำสั่งภาษาคอมพิวเตอร์ (Python):</span>
                      <div className="bg-zinc-900 rounded-xl p-4.5 border border-zinc-800 text-xs md:text-[13.5px] leading-relaxed text-zinc-300">
                        <div>celsius = <span className="text-orange-400">25.0</span></div>
                        <div className="text-zinc-500"># สูตรประมวลผลคำนวณแปลงค่า:</div>
                        <div>fahrenheit = (celsius * <span className="text-orange-400">9</span> / <span className="text-orange-400">5</span>) + <span className="text-orange-400">32</span></div>
                        <div className="text-pink-400 mt-2">print<span className="text-white">(fahrenheit)</span></div>
                      </div>
                    </div>
                  )}

                  {c5Step === 'app' && (
                    <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-4 text-center font-sans">
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
                        <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Laptop className="w-4 h-4 text-indigo-400" /> temperature_converter.exe
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase block text-left">ปรับตั้งอุณหภูมิเซนติเกรดจำลอง (Celsius):</label>
                        <div className="flex justify-between items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={c5AppInputValue}
                            onChange={(e) => setC5AppInputValue(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <span className="text-sm md:text-base font-bold text-white w-14 text-right font-mono">{c5AppInputValue} °C</span>
                        </div>
                      </div>

                      <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 flex justify-between items-center font-mono text-xs md:text-[13px]">
                        <span className="font-semibold text-zinc-500">ฟาเรนไฮต์ (Fahrenheit):</span>
                        <strong className="text-indigo-400 text-sm md:text-base font-bold">{(c5AppInputValue * 9 / 5 + 32).toFixed(1)} °F</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 pt-3 border-t border-zinc-900 text-xs text-zinc-500 leading-relaxed font-sans">
                  {c5Step === 'logic' && '💡 โครงสร้างความคิดในระดับนี้คอมพิวเตอร์ยังทำงานไม่ได้ ต้องถูกแปลงเป็นข้อตกลงภาษาเขียนเสียก่อน'}
                  {c5Step === 'code' && '💡 โค้ดที่มนุษย์พิมพ์จะถูกเครื่องอ่านสแกนและแปลลงสู่รหัสเครื่อง (Machine Code) เพื่อสร้างโปรแกรม'}
                  {c5Step === 'app' && '💡 ยินดีด้วย! โปรแกรมได้รับการสร้างขึ้นและติดตั้งเรียบร้อยแล้ว ลองขยับสไลเดอร์เพื่อดูการคิดเลขแบบเรียลไทม์'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================================
            6️⃣ CARD 6: ความสำคัญของภาษาคอมพิวเตอร์ในการเขียนโปรแกรม (1.1.6)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  ความสำคัญของภาษาคอมพิวเตอร์ในการเขียนโปรแกรม
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">The Vital Role of Computer Languages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed">
                  หากปราศจากภาษาคอมพิวเตอร์ระดับสูง มนุษย์จะต้องป้อนคำสั่งและค่าที่ต้องการจัดเก็บด้วย <strong>เลขฐานสองเป็นล้านๆ บรรทัด</strong>
                  ผ่านแผงเจาะรูวงจรไฟฟ้า ซึ่งยากลำบาก มีความผิดพลาดง่าย และแทบจะเป็นไปไม่ได้เลยในการสร้างแอปพลิเคชันหรือปัญญาประดิษฐ์ในโลกยุคใหม่
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-zinc-50 border border-zinc-200/60 rounded-2xl">
                    <span className="font-bold text-zinc-800 text-[13.5px] block mb-1">➔ จัดระเบียบการสั่งงาน</span>
                    <span className="text-zinc-500 text-xs md:text-sm leading-relaxed">ช่วยแปลงตรรกะที่ซับซ้อนของสมองให้กลายเป็นชุดสเต็ปที่เครื่องจักรทำตามเป็นขั้นบันไดได้ดี</span>
                  </div>
                  <div className="p-4 bg-zinc-50 border border-zinc-200/60 rounded-2xl">
                    <span className="font-bold text-zinc-800 text-[13.5px] block mb-1">➔ มอบความเป็นมาตรฐานเดียวกัน</span>
                    <span className="text-zinc-500 text-xs md:text-sm leading-relaxed">โปรแกรมเมอร์หลายหมื่นคนสามารถเข้าใจรหัส อ่านโค้ด พัฒนา และดูแลระบบร่วมกันได้ทั่วโลก</span>
                  </div>
                </div>

                {/* Interactive Slider for scale of task complexity */}
                <div className="space-y-2.5 pt-3">
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-zinc-600 tracking-wide font-sans">
                    <span>ระดับความซับซ้อนของระบบงาน:</span>
                    <span className="text-indigo-600 font-bold">
                      {c6Level === 1 && 'ต่ำ (บวกเลขอย่างง่าย)'}
                      {c6Level === 2 && 'ปานกลาง (คัดกรองข้อมูลธุรกรรม)'}
                      {c6Level === 3 && 'สูงขีดสุด (สั่งจรวดร่อนข้ามฟากดารา)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={c6Level}
                    onChange={(e) => setC6Level(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 flex flex-col justify-between min-h-[240px] font-mono text-xs md:text-[13px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-8 bg-zinc-900 border-b border-zinc-800/80 flex items-center px-4 justify-between">
                    <span className="text-[10px] md:text-xs text-zinc-400 font-sans font-bold uppercase tracking-wider">เปรียบเทียบการพัฒนาในทางปฏิบัติ</span>
                    <span className="text-zinc-600 text-[9px] font-mono">comp_spec.sh</span>
                  </div>

                  <div className="mt-8 space-y-4 text-left">
                    <div>
                      <span className="text-red-500 font-bold block text-[10px] md:text-xs uppercase font-sans tracking-wide">หากเขียนด้วยเลขฐานสอง (ไม่ใช้ภาษาคอมพิวเตอร์ระดับสูง):</span>
                      <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-900 text-xs md:text-[13.5px] text-red-300 break-all leading-relaxed max-h-[70px] overflow-y-auto">
                        {c6Level === 1 && '01010100 01101000 01100101 00100000 01101110 01110101 01101101 01100010 01100101 01110010'}
                        {c6Level === 2 && '10101110 10101011 00111100 00001111 00111111 01010101 11001100 00110011 00110011 00001111 00110011 00001111 00110011 11001100 11001100 00110011'}
                        {c6Level === 3 && '01011010 11010101 11110000 00001111 01010101 11001100 00110011 11001100 11110000 00001111 01010101 11001100 00110011 11001100 11110000 00001111 01010101 11001100 00110011 11001100 01011010 11010101 11110000 00001111 01010101 11001100 00110011 11001100 11110000 00001111 01010101 11001100 00110011 11001100 11110000 00001111 01010101 11001100 00110011 11001100'}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-sans block mt-1">ต้องเขียนรหัสอย่างไม่มีที่สิ้นสุด ตรวจหาบักไม่เจอ</span>
                    </div>

                    <div className="border-t border-zinc-900 pt-3">
                      <span className="text-emerald-400 font-bold block text-[10px] md:text-xs uppercase font-sans tracking-wide">เขียนด้วยภาษาคอมพิวเตอร์ระดับสูง (Python):</span>
                      <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-900 text-xs md:text-[13.5px] text-emerald-350 font-mono">
                        {c6Level === 1 && 'result = A + B'}
                        {c6Level === 2 && 'active_users = [u for u in users if u.is_active]'}
                        {c6Level === 3 && 'rocket.calculate_orbit(target_coordinate)'}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-sans block mt-1">เข้าใจได้ทันที รัดกุม แก้ไขตรรกะได้คล่องตัวสูง</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================================
            7️⃣ CARD 7: การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสมกับงาน (1.1.7)
            ============================================================================ */}
        {/* ============================================================================
            7️⃣ CARD 7: การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสมกับงาน (1.1.7)
            ============================================================================ */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <TerminalSquare className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed tracking-tight">
                  การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสมกับงาน
                </h4>
                <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mt-0.5">Language Suitability Directory & Advisor</p>
              </div>
            </div>

            <p className="text-zinc-600 text-[16px] md:text-[17px] leading-relaxed mb-6 max-w-4xl">
              ไม่มีภาษาคอมพิวเตอร์ใดที่ดีที่สุดในโลกสำหรับทุกโครงการ แต่ละภาษาถูกออกแบบมาเพื่อรองรับวัตถุประสงค์ สภาพแวดล้อม และสถาปัตยกรรมระบบที่แตกต่างกัน
              <strong>ลองคลิกแท็บเพื่อศึกษาความเหมาะสมของแต่ละภาษา ก่อนจะทดสอบจับคู่ด้านล่าง:</strong>
            </p>

            {/* Language Directory Tabs */}
            <div className="flex flex-wrap gap-2.5 mb-6 bg-zinc-100 p-2 rounded-2xl border border-zinc-200/60">
              {[
                { name: 'Python', icon: Cpu, desc: 'AI & Data Science' },
                { name: 'JavaScript', icon: Globe, desc: 'Web & App Front-End' },
                { name: 'C++', icon: Code, desc: 'System & Game Engine' },
                { name: 'SQL', icon: Database, desc: 'Database & Analytics' }
              ].map((lang) => {
                const IconComponent = lang.icon;
                const isActive = selectedLangInfo === lang.name;
                return (
                  <button
                    key={lang.name}
                    onClick={() => setSelectedLangInfo(lang.name)}
                    className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold transition-all active:scale-98 text-xs md:text-sm border ${isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600'
                      }`}
                  >
                    <IconComponent className="w-4.5 h-4.5" />
                    <div className="text-left">
                      <div className="block font-bold text-[13px] md:text-sm leading-tight">{lang.name}</div>
                      <div className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-zinc-400'} font-normal mt-0.5`}>{lang.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Language Knowledge Advisor Dashboard */}
            {(() => {
              const langDetails = {
                Python: {
                  suited: 'ปัญญาประดิษฐ์ (AI), วิทยาการข้อมูล (Data Science), ระบบอัตโนมัติ (Automation/Scripting), และระบบเซิร์ฟเวอร์หลังบ้าน',
                  strengths: [
                    'ไวยากรณ์คลีน คล้ายภาษาอังกฤษทั่วไป ทำความเข้าใจได้ง่ายและรวดเร็วที่สุดสำหรับผู้เริ่มต้น',
                    'มีระบบนิเวศของคลังโค้ด (Libraries) ด้านข้อมูลและ AI ที่ใหญ่ที่สุดในโลก เช่น PyTorch, TensorFlow และ Pandas',
                    'มีความยืดหยุ่นในการเขียนสูง รองรับการเขียนแบบสคริปต์สั้นๆ ไปจนถึงแอปพลิเคชันระบบใหญ่'
                  ],
                  projects: 'ChatGPT, อัลกอริทึมแนะนำภาพยนตร์ของ Netflix, โมเดลวิเคราะห์โรคในภาพเอ็กซ์เรย์ทางการแพทย์',
                  ratings: { ease: 5, speed: 2, hardware: 1.5, webBrowser: 1 },
                  accentColor: 'text-blue-600 bg-blue-50 border-blue-200/50'
                },
                JavaScript: {
                  suited: 'การพัฒนาหน้าตาเว็บไซต์ (Web Front-End), แอปพลิเคชันบนมือถือ, และหน้าเว็บที่ตอบสนองโต้ตอบทันทีแบบเรียลไทม์',
                  strengths: [
                    'ภาษาเดียวในโลกที่เว็บบราวเซอร์ทุกค่ายเข้าใจและรันได้ทันทีโดยไม่ต้องติดตั้งตัวแปลภาษาเพิ่มเติมในเครื่องผู้ใช้',
                    'รองรับการตอบสนองที่รวดเร็ว (Asynchronous) เหมาะกับการสตรีมมิ่งข้อมูลและการคลิกหน้าเว็บแบบฉับไว',
                    'เป็นภาษายอดนิยมที่มีคลังสำหรับสร้าง UI หน้าตาหรูหราล้ำสมัยและตอบสนองได้นุ่มนวลที่สุด'
                  ],
                  projects: 'ระบบแผนที่นำทางแบบโต้ตอบของ Google Maps, หน้าอินเทอร์เฟซหลักของ Facebook, เกมบนเว็บเบราว์เซอร์',
                  ratings: { ease: 4, speed: 3.5, hardware: 2, webBrowser: 5 },
                  accentColor: 'text-amber-600 bg-amber-50 border-amber-200/50'
                },
                'C++': {
                  suited: 'ระบบฝังตัวขนาดจิ๋ว (Embedded System / IoT), เอนจิ้นเกมสามมิติขนาดใหญ่ (Game Engine), ซอฟต์แวร์ประมวลผลสูงขีดสุด',
                  strengths: [
                    'ทำงานได้รวดเร็วปานสายฟ้าแลบ สามารถเข้าควบคุมฮาร์ดแวร์และวงจรไฟฟ้าของบอร์ดได้โดยตรง',
                    'มีประสิทธิภาพการบริหารแรมที่ทรงพลังอย่างยิ่ง จึงใช้ทรัพยากรน้อย ช่วยให้อุปกรณ์พกพาประหยัดไฟฟ้าสูงสุด',
                    'เป็นภาษาหลักในด้านการคำนวณกราฟิก 3D และฟิสิกส์เชิงลึกในเกมระดับฟอร์มยักษ์'
                  ],
                  projects: 'ชิปตรรกะระบบเบรกล้อ ABS รถยนต์ไฟฟ้า, เครื่องยนต์สร้างเกม Unreal Engine 5, ระบบปฏิบัติการ Windows/macOS',
                  ratings: { ease: 1.5, speed: 5, hardware: 5, webBrowser: 1 },
                  accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-200/50'
                },
                SQL: {
                  suited: 'การสืบค้น จัดเก็บข้อมูล และประมวลผลชุดข้อมูลขนาดใหญ่ในระบบฐานข้อมูลเชิงสัมพันธ์ขององค์กร',
                  strengths: [
                    'ออกแบบมาเฉพาะทางสำหรับการดึง คัดกรอง ค้นหา และรวมข้อมูลในตารางขนาดใหญ่หลายล้านแถวได้ในเสี้ยววินาที',
                    'มีความปลอดภัยและถูกต้องในการจัดการธุรกรรมการเงินสูงมาก ป้องกันการบันทึกข้อมูลทับซ้อนหรือสูญหาย',
                    'ใช้ประโยคคำสั่งสืบค้น (Query) ที่สั้นและทรงพลังตามหลักคณิตศาสตร์สถิติ'
                  ],
                  projects: 'ระบบบันทึกและสืบค้นความปลอดภัยธุรกรรมฝาก-ถอนของธนาคาร, ระบบดึงประวัตินักเรียนและคะแนนทั่วประเทศ',
                  ratings: { ease: 4, speed: 5, hardware: 1, webBrowser: 1 },
                  accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/50'
                }
              };

              const currentInfo = langDetails[selectedLangInfo];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8 animate-fadeIn">
                  {/* Left Column - Detailed Explanations */}
                  <div className="lg:col-span-8 bg-zinc-50 border border-zinc-200 p-6 rounded-3xl space-y-5 text-left">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border ${currentInfo.accentColor}`}>
                        <Sparkles className="w-3.5 h-3.5" />
                        เหมาะสำหรับงานประเภท:
                      </span>
                      <p className="text-zinc-800 text-[16px] md:text-[17px] font-bold mt-2.5 leading-relaxed">
                        {currentInfo.suited}
                      </p>
                    </div>

                    <div className="border-t border-zinc-200/60 pt-4">
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block mb-2.5">จุดแข็งและจุดเด่นหลัก:</span>
                      <ul className="space-y-2">
                        {currentInfo.strengths.map((str, idx) => (
                          <li key={idx} className="flex gap-2 text-zinc-600 text-sm md:text-[15px] leading-relaxed">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✔</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-zinc-200/60 pt-4">
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block mb-1">ตัวอย่างโครงการประยุกต์ใช้จริง:</span>
                      <p className="text-zinc-700 text-sm md:text-[15px] font-medium leading-relaxed font-sans">
                        💡 {currentInfo.projects}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Ratings Meter Dashboard */}
                  <div className="lg:col-span-4 bg-zinc-950 rounded-3xl p-6 border border-zinc-850 flex flex-col justify-between text-white text-left">
                    <div>
                      <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest block mb-1">CAPABILITY RADAR</span>
                      <h5 className="font-bold text-white text-lg mb-4">ดัชนีชี้วัดความสามารถ</h5>

                      <div className="space-y-4">
                        {[
                          { label: 'เรียนรู้และเขียนง่าย (Ease of Learning)', value: currentInfo.ratings.ease },
                          { label: 'ความเร็วการประมวลผล (Performance)', value: currentInfo.ratings.speed },
                          { label: 'ควบคุมระดับฮาร์ดแวร์ (Hardware Control)', value: currentInfo.ratings.hardware },
                          { label: 'การทำงานบนเบราว์เซอร์ (Web Native)', value: currentInfo.ratings.webBrowser }
                        ].map((rate, rIdx) => (
                          <div key={rIdx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-zinc-400">
                              <span>{rate.label}</span>
                              <span className="text-white font-bold font-mono">{rate.value} / 5</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-850 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                                style={{ width: `${(rate.value / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-850 text-[11px] text-zinc-500 leading-relaxed font-mono">
                      * ดัชนีเปรียบเทียบตามมาตรฐานสภาพแวดล้อมสถาปัตยกรรมคอมพิวเตอร์ระดับสากล
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Matching Challenge Game Section */}
            <div className="border-t border-zinc-200/60 pt-6">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-4.5 text-left">
                🎮 มินิเกมประลองปัญญา: จับคู่ความเหมาะสมเพื่อพิชิตคะแนน XP
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Question list */}
                <div className="lg:col-span-8 space-y-4.5 text-left">
                  {challenges.map((ch) => {
                    const isCorrect = c7Answers[ch.id] === ch.bestLanguage;

                    return (
                      <div
                        key={ch.id}
                        className={`p-5 rounded-2xl border transition-all ${c7Checked
                            ? isCorrect
                              ? 'bg-emerald-50/50 border-emerald-500/80 shadow-sm'
                              : 'bg-rose-50/50 border-rose-500/80 shadow-sm'
                            : 'bg-zinc-50/50 border-zinc-200 hover:bg-zinc-50'
                          }`}
                      >
                        <h5 className="font-bold text-zinc-800 text-[15px] leading-relaxed mb-3 flex gap-2">
                          <span>🎯</span>
                          <span>{ch.title}</span>
                        </h5>

                        <div className="flex flex-wrap gap-2.5 items-center">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide mr-2">ตัวเลือกภาษาจับคู่:</span>
                          {['Python', 'JavaScript', 'C++', 'SQL'].map((lang) => (
                            <button
                              key={lang}
                              disabled={c7Checked}
                              onClick={() => handleC7Select(ch.id, lang)}
                              className={`py-2 px-3.5 rounded-lg text-xs md:text-sm font-bold transition-all active:scale-97 border ${c7Answers[ch.id] === lang
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50'
                                }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>

                        {c7Checked && (
                          <div className="mt-3.5 pt-3 border-t border-zinc-200/60 text-xs md:text-sm leading-relaxed flex gap-2">
                            <span className={`text-[13.5px] md:text-[14px] shrink-0 font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isCorrect ? '✔ ถูกต้อง' : '✘ ตรรกะเบี่ยงเบน'}
                            </span>
                            <span className="text-zinc-500 leading-relaxed block">
                              <strong>เหตุผล:</strong> {ch.why} (ภาษาที่ดีที่สุดคือ {ch.bestLanguage})
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Control Panel & XP Board */}
                <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between text-white text-center min-h-[300px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h5 className="font-bold text-white text-base md:text-lg mb-1">บอร์ดประเมินตรรกะจับคู่</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed">สะสมแต้มคะแนนผ่านด่านการทดสอบความเหมาะสมด้านวิชาการ</p>

                    {c7Checked && (
                      <div className="mt-6 bg-zinc-950 p-4.5 rounded-2xl border border-zinc-800/80 animate-pulse">
                        <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest block mb-1">SCORE:</span>
                        <strong className="text-indigo-400 text-3xl md:text-4xl font-mono block">{c7Score} XP</strong>
                        <span className="text-zinc-400 text-xs mt-1.5 block">
                          {c7Score === 100 ? 'ยอดเยี่ยม! จับคู่สมบูรณ์แบบร้อยคะแนนเต็ม' : 'ลองทบทวนตรรกะเหตุผลและกดแก้ไขใหม่อีกรอบครับ'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 space-y-2 mt-6">
                    {!c7Checked ? (
                      <button
                        onClick={checkC7Matching}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 active:scale-98 rounded-xl text-xs md:text-sm transition-all shadow-md shadow-indigo-150"
                      >
                        🚀 ยื่นตรวจสอบตรรกะการจับคู่
                      </button>
                    ) : (
                      <button
                        onClick={resetC7Matching}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 active:scale-98 rounded-xl text-xs md:text-sm transition-all border border-zinc-700"
                      >
                        🔄 รีเซ็ตและจำลองการท้าทายใหม่
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ============================================================================
            8️⃣ REINFORCEMENT QUIZ BOARD
            ============================================================================ */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-6 md:p-8 border border-zinc-800 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-bl-full blur-3xl pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center mb-6 border-b border-zinc-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-xl">
                <Sparkles className="w-5.5 h-5.5 animate-pulse" />
              </div>
              <div className="text-left">
                <h5 className="text-lg md:text-xl font-bold text-white leading-tight">แบบทดสอบด่วน: แนะนำภาษาคอมพิวเตอร์</h5>
                <p className="text-zinc-500 text-xs md:text-sm mt-0.5 font-mono">Instant Reinforcement Quiz | SCORE: {xp} XP</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-zinc-800 text-xs md:text-sm font-bold font-mono">
              <span className="text-indigo-400">ด่าน {quizIndex + 1} / {quizCases.length}</span>
              <div className="flex gap-1 ml-2">
                {quizCases.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-1.5 rounded-full transition-all ${idx === quizIndex ? 'bg-indigo-400 w-6' : idx < quizIndex ? 'bg-emerald-400' : 'bg-zinc-850'
                      }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {quizIndex < quizCases.length ? (
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Question board */}
              <div className="lg:col-span-7 bg-zinc-950 p-6 rounded-2xl border border-zinc-850 flex flex-col justify-between text-left min-h-[190px]">
                <div>
                  <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">โจทย์ประเมินผล:</span>
                  <h6 className="text-[15px] md:text-[16px] font-bold text-zinc-100 mb-3 leading-relaxed">{activeQuiz.question}</h6>
                </div>

                {quizState === 'success' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-3.5 rounded-xl text-xs md:text-sm leading-relaxed flex gap-2">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs md:text-sm">ตรรกะถูกต้อง (+15 XP)</strong>
                      <span className="text-zinc-300 font-sans block mt-1">{selectedAns.feedback}</span>
                    </div>
                  </div>
                )}

                {quizState === 'fail' && (
                  <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3.5 rounded-xl text-xs md:text-sm leading-relaxed flex gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs md:text-sm">คำตอบคลาดเคลื่อนจากความจริง</strong>
                      <span className="text-zinc-300 font-sans block mt-1">ลองทบทวนตรรกะ และคลิกเลือกคำตอบใหม่อีกครั้งครับ</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Answers choices */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                <div className="grid grid-cols-1 gap-2.5 flex-1 justify-center">
                  {activeQuiz.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleQuizAnswer(opt)}
                      disabled={quizState !== 'playing'}
                      className={`p-3.5 rounded-xl border text-left transition-all active:scale-97 text-xs md:text-sm flex items-center gap-3 ${selectedAns?.key === opt.key
                          ? opt.isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-white font-semibold'
                            : 'bg-red-500/20 border-red-500 text-white font-semibold'
                          : 'bg-zinc-950 border-zinc-850 text-zinc-300 hover:bg-zinc-900 disabled:opacity-50'
                        }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] md:text-xs shrink-0 ${selectedAns?.key === opt.key
                          ? opt.isCorrect
                            ? 'bg-emerald-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-zinc-850 text-zinc-400'
                        }`}>
                        {opt.key}
                      </span>
                      <span className="font-sans leading-relaxed">{opt.text}</span>
                    </button>
                  ))}
                </div>

                {/* Progress actions */}
                <div className="flex gap-2">
                  {quizState === 'success' && quizIndex < quizCases.length - 1 && (
                    <button
                      onClick={nextQuizLevel}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    >
                      ผ่านด่านถัดไป <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {quizState === 'success' && quizIndex === quizCases.length - 1 && (
                    <button
                      onClick={resetQuiz}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs md:text-sm transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" /> ทำแบบทดสอบสะสมแต้มใหม่อีกครั้ง
                    </button>
                  )}

                  {quizState === 'fail' && (
                    <button
                      onClick={() => { setSelectedAns(null); setQuizState('playing'); }}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs md:text-sm transition-all border border-zinc-700"
                    >
                      🔄 ลองเลือกตอบอีกครั้ง
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-indigo-400 text-2xl md:text-3xl block mb-2 font-bold">🎉 ยินดีด้วย!</span>
              <p className="text-zinc-300 text-sm md:text-base">คุณทำแบบทดสอบครบถ้วน ได้คะแนน XP ทั้งหมด {xp} XP เต็มเปี่ยม!</p>
              <button
                onClick={resetQuiz}
                className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm active:scale-98 transition-all"
              >
                ลองทำข้อสอบใหม่อีกรอบ
              </button>
            </div>
          )}
        </div>

        {/* ============================================================================
            9️⃣ TEACHER TASK FOOTER (Layer 4)
            ============================================================================ */}
        <TeacherTask
          title="ใบงานบทเรียน 1.1: สรุปความสำคัญและการเลือกใช้ภาษาคอมพิวเตอร์"
          taskText={teacherTaskContent}
        />

      </main>
    </div>
  );
}
