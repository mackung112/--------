import { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  AmbientBackdrop, 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  QuizEngine,
  PY4_BLOBS 
} from '../shared';
import { 
  RefreshCw, 
  Play, 
  RotateCcw, 
  Code2, 
  ShoppingBag, 
  ArrowRight,
  Truck,
  Gamepad2,
  Database,
  Repeat
} from 'lucide-react';

// ============================================================================
// 1. เครื่องยนต์นับรอบลูป (Loop Iteration Engine - For Loop Structure)
// ============================================================================
const LoopIterationEngine = () => {
  const [activeStep, setActiveStep] = useState(0); // 0=idle, 1=loop1, 2=loop2, 3=loop3, 4=loop4, 5=end
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  
  const totalLoops = 4;
  
  const getLineHighlight = (lineNum) => {
    if (activeStep === 0) return false;
    if (activeStep === 5) return lineNum === 3;
    if (lineNum === 1) return true; // for line is always evaluated
    if (lineNum === 2) return true; // print line inside loop is executed
    return false;
  };

  const handleStep = () => {
    if (activeStep >= 5) {
      // Reset
      setActiveStep(0);
      setConsoleLogs([]);
      return;
    }
    
    setIsRunning(true);
    setTimeout(() => {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setIsRunning(false);
      
      if (nextStep >= 1 && nextStep <= totalLoops) {
        setConsoleLogs(prev => [...prev, `รอบที่ ${nextStep}: ขุดแร่ทองคำ ⛏️`]);
      } else if (nextStep === 5) {
        setConsoleLogs(prev => [...prev, 'สิ้นสุดกระบวนการทำงานลูป!']);
      }
    }, 400);
  };

  const resetEngine = () => {
    setActiveStep(0);
    setConsoleLogs([]);
  };

  return (
    <SimulatorShell
      title="เครื่องยนต์นับรอบลูป (Loop Iteration Engine)"
      accentBg="bg-indigo-50/80"
      iconColor="text-indigo-600"
      icon={<Repeat className="w-6 h-6 text-indigo-600" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Controls and Variables */}
        <div className="flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <span className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3">จำลองการทำงานทีละคำสั่ง:</span>
            
            {/* Visual Code block with line highlights */}
            <div className="bg-slate-900 rounded-xl p-4.5 border border-slate-800 font-mono text-[13.5px] leading-relaxed mb-6">
              <div className={`px-2 py-0.5 rounded transition-all duration-300 ${getLineHighlight(1) ? 'bg-indigo-500/20 text-indigo-200 font-bold border-l-4 border-indigo-500 pl-1.5' : 'text-slate-300'}`}>
                <span className="text-slate-600 select-none mr-3">1</span>
                for count in range(1, 5):
              </div>
              <div className={`px-2 py-0.5 rounded transition-all duration-300 ${getLineHighlight(2) ? 'bg-indigo-500/20 text-indigo-200 font-bold border-l-4 border-indigo-500 pl-1.5' : 'text-slate-300'}`}>
                <span className="text-slate-600 select-none mr-3">2</span>
                &nbsp;&nbsp;&nbsp;&nbsp;print(f"รอบที่ {`{count}`}: ขุดแร่ทองคำ ⛏️")
              </div>
              <div className={`px-2 py-0.5 rounded transition-all duration-300 ${getLineHighlight(3) ? 'bg-slate-800 text-slate-400 border-l-4 border-slate-600 pl-1.5' : 'text-slate-500'}`}>
                <span className="text-slate-600 select-none mr-3">3</span>
                print("สิ้นสุดลูป")
              </div>
            </div>

            {/* Loop state variables */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" /> ตารางหน่วยความจำตัวแปร (Variables Tracker)
              </span>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[11px] text-slate-400 font-bold font-mono">ตัวแปร count</span>
                  <strong className={`block text-lg mt-0.5 font-mono ${activeStep >= 1 && activeStep <= 4 ? 'text-indigo-600 font-black' : 'text-slate-400'}`}>
                    {activeStep >= 1 && activeStep <= 4 ? activeStep : '-'}
                  </strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[11px] text-slate-400 font-bold font-mono">สถานะลูป (Status)</span>
                  <strong className={`block text-sm mt-1 font-bold ${activeStep === 0 ? 'text-slate-400' : activeStep === 5 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {activeStep === 0 ? 'ยังไม่ทำงาน' : activeStep === 5 ? 'หลุดลูป (End)' : `รอบที่ ${activeStep} / 4`}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleStep}
              disabled={isRunning}
              className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:scale-[1.02] active:scale-98 cursor-pointer rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 text-[13px] md:text-sm"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : activeStep === 0 ? (
                <>เริ่มทำงานลูป <Play className="w-4 h-4" /></>
              ) : activeStep >= 5 ? (
                <>ทำซ้ำใหม่อีกครั้ง <RotateCcw className="w-4 h-4" /></>
              ) : (
                <>รันขั้นตอนถัดไป <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
            {activeStep > 0 && (
              <button 
                onClick={resetEngine}
                className="px-4 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer transition-all active:scale-95 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Console view */}
        <ConsoleScreen
          label="# loop execution view"
          accentLabel="for iteration simulation"
          accentColor="text-indigo-400"
          isLoading={isRunning}
          multiline={true}
          output={consoleLogs.join('\n')}
          placeholder="กดปุ่มเริ่มทำงานลูปเพื่อจำลองเอาต์พุต..."
        />

      </div>
    </SimulatorShell>
  );
};

// ============================================================================
// 2. ระบบจำลองรถบรรทุกจัดส่งผลไม้ (Fruit Truck Delivery - Looping Lists)
// ============================================================================
const LoopingListsDelivery = () => {
  const [activeFruitIdx, setActiveFruitIdx] = useState(-1); // -1=idle, 0=apple, 1=banana, 2=orange, 3=grape, 4=done
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryOutput, setDeliveryOutput] = useState([]);

  const fruitsList = [
    { name: 'แอปเปิ้ล', emoji: '🍎', color: 'bg-rose-100 border-rose-300 text-rose-700' },
    { name: 'กล้วย', emoji: '🍌', color: 'bg-amber-100 border-amber-300 text-amber-700' },
    { name: 'ส้ม', emoji: '🍊', color: 'bg-orange-100 border-orange-300 text-orange-700' },
    { name: 'องุ่น', emoji: '🍇', color: 'bg-purple-100 border-purple-300 text-purple-700' }
  ];

  const handleNextFruit = () => {
    if (activeFruitIdx >= 4) {
      setActiveFruitIdx(-1);
      setDeliveryOutput([]);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const nextIdx = activeFruitIdx + 1;
      setActiveFruitIdx(nextIdx);
      setIsProcessing(false);

      if (nextIdx >= 0 && nextIdx < fruitsList.length) {
        const item = fruitsList[nextIdx];
        setDeliveryOutput(prev => [...prev, `[รถจัดส่ง]: นำส่งกล่อง ${item.emoji} ${item.name} สำเร็จแล้ว!`]);
      } else if (nextIdx === 4) {
        setDeliveryOutput(prev => [...prev, '📦 สินค้าทั้งหมดจัดส่งเรียบร้อยแล้ว!']);
      }
    }, 450);
  };

  return (
    <SimulatorShell
      title="ระบบจำลองจัดส่งผลไม้จากลิสต์ (Fruit Delivery Iteration)"
      accentBg="bg-sky-50"
      iconColor="text-sky-600"
      icon={<Truck className="w-6 h-6 text-sky-600" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Simulation Sandbox */}
        <div className="flex flex-col justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <span className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-4">ตระกร้าข้อมูลลิสต์: fruits = ["🍎 แอปเปิ้ล", "🍌 กล้วย", "🍊 ส้ม", "🍇 องุ่น"]</span>

            {/* Iterative Container for Fruits */}
            <div className="grid grid-cols-4 gap-3 mb-6 relative">
              {fruitsList.map((fruit, idx) => {
                const isCurrent = activeFruitIdx === idx;
                const isPassed = activeFruitIdx > idx;

                return (
                  <div
                    key={fruit.name}
                    className={`p-3 rounded-2xl border-2 text-center transition-all duration-300 ${fruit.color} ${
                      isCurrent 
                        ? 'ring-4 ring-sky-500/50 scale-105 shadow-md border-sky-400 font-bold' 
                        : isPassed 
                          ? 'opacity-40 border-slate-200 bg-slate-100 text-slate-400' 
                          : 'shadow-sm border-slate-200'
                    }`}
                  >
                    <div className="text-3xl mb-1.5 animate-bounce">{fruit.emoji}</div>
                    <div className="text-[13px] font-semibold">{fruit.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Code syntax block */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-[13.5px] leading-relaxed mb-4 text-slate-300">
              <span className="text-slate-500 text-[11.5px] block mb-2">// โค้ดที่ประมวลผลอยู่จริงในรอบนี้</span>
              <div>fruits = [<span className="text-emerald-400">"แอปเปิ้ล"</span>, <span className="text-emerald-400">"กล้วย"</span>, <span className="text-emerald-400">"ส้ม"</span>, <span className="text-emerald-400">"องุ่น"</span>]</div>
              <div className="text-indigo-400">for <span className="text-amber-400">fruit</span> in <span className="text-emerald-400">fruits</span>:</div>
              <div className="pl-4">
                print(f<span className="text-emerald-400">"ส่งมอบ: {`{fruit}`}"</span>)
              </div>
            </div>
          </div>

          {/* Controller button */}
          <button
            onClick={handleNextFruit}
            disabled={isProcessing}
            className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white active:scale-98 rounded-xl font-bold py-3 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-[13px] md:text-sm disabled:opacity-50"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : activeFruitIdx === -1 ? (
              <>เริ่มทำการวนลูปลิสต์ <Play className="w-4 h-4" /></>
            ) : activeFruitIdx >= 4 ? (
              <>เริ่มจำลองรถส่งผลไม้อีกครั้ง <RotateCcw className="w-4 h-4" /></>
            ) : (
              <>ส่งกล่องผลไม้ตัวถัดไป <Truck className="w-4 h-4" /></>
            )}
          </button>
        </div>

        {/* Delivery Shell Logs */}
        <ConsoleScreen
          label="# fruit truck terminal log"
          accentLabel="list sequence processing"
          accentColor="text-sky-400"
          isLoading={isProcessing}
          multiline={true}
          output={deliveryOutput.join('\n')}
          placeholder="รอออกตัวนำส่งรถเพื่อวนประมวลผลจากอาร์กิวเมนต์ลิสต์..."
        />

      </div>
    </SimulatorShell>
  );
};

// ============================================================================
// 3. มินิเกมโจทย์คำถาม For Loop (Instant Reinforcement)
// ============================================================================
const FOR_QUIZ_LEVELS = [
  {
    title: 'ภารกิจที่ 1: วิเคราะห์จำนวนรอบลูป',
    desc: 'ถ้ารันคำสั่ง "for num in [10, 20, 30, 40, 50]:" โค้ดที่อยู่ภายใต้บล็อกลูปนี้จะทำซ้ำเป็นจำนวนทั้งหมดกี่รอบ?',
    target: '5 รอบ',
    code: 'for num in [10, 20, 30, 40, 50]:\n    print(num)',
    options: [
      { key: 'A', text: '4 รอบ', isCorrect: false },
      { key: 'B', text: '5 รอบ', isCorrect: true },
      { key: 'C', text: '10 รอบ', isCorrect: false },
      { key: 'D', text: 'ไม่มีจำนวนรอบที่แน่นอน', isCorrect: false }
    ],
    tip: 'ลูป for จะวนทำงานซ้ำตามจำนวนสมาชิกที่อยู่ในชุดข้อมูล (ลิสต์) โดยในที่นี้มีจำนวนสมาชิกอยู่ทั้งหมด 5 ตัว'
  },
  {
    title: 'ภารกิจที่ 2: ผลรวมยอดรวมลูป',
    desc: 'พิจารณาโค้ดสะสมแต้มคะแนนด้านล่าง เมื่อรันลูปเสร็จสมบูรณ์ ตัวแปร score_total จะเก็บค่าสุดท้ายเท่าใด?',
    target: '15',
    code: 'score_total = 0\nfor score in [2, 5, 8]:\n    score_total += score\nprint(score_total)',
    options: [
      { key: 'A', text: '8', isCorrect: false },
      { key: 'B', text: '10', isCorrect: false },
      { key: 'C', text: '15', isCorrect: true },
      { key: 'D', text: '0', isCorrect: false }
    ],
    tip: 'นำค่าในลิสต์แต่ละตัวมาบวกสะสมลงในตัวแปร score_total ทีละขั้นตอน: 0 + 2 -> 2 + 5 -> 7 + 8 -> 15'
  },
  {
    title: 'ภารกิจที่ 3: เติมสัญลักษณ์เชื่อมโยงลูป',
    desc: 'ต้องการเขียนลูปเพื่อสแกนคำหาตัวอักษรในสตริง text = "PYTHON" ให้นักเรียนระบุตัวเชื่อมคีย์เวิร์ดในเครื่องหมาย ? ให้ถูกต้อง',
    target: 'in',
    code: 'text = "PYTHON"\nfor char ? text:\n    print(char)',
    options: [
      { key: 'A', text: 'is', isCorrect: false },
      { key: 'B', text: 'in', isCorrect: true },
      { key: 'C', text: 'at', isCorrect: false },
      { key: 'D', text: 'of', isCorrect: false }
    ],
    tip: 'คีย์เวิร์ดมาตรฐานในภาษา Python ที่ใช้ดึงสมาชิกออกมาจากชุดข้อมูลคือคำว่า "in"'
  }
];

// ============================================================================
// 4. หน้าหลักของบทเรียน (Vertical Stack Immersive)
// ============================================================================
export default function Py4_14() {
  const teacherTaskContent = `ใบงานกิจกรรม: ปฏิบัติการคำสั่งวนซ้ำแบบมีจำนวนรอบแน่นอน (for)
ให้นักเรียนวิเคราะห์การทำงานของลูปและปฏิบัติงานส่งคำสั่ง Python ดังนี้:

1. เขียนชุดคำสั่งลูป for เพื่อพิมพ์แสดงรายชื่อนักเรียนในลิสต์:
   students = ["กิตติ", "นิภา", "ประชัน", "รุ่งอรุณ"]
   ให้ออกมาพิมพ์ผลลัพธ์ทีละชื่อในบรรทัดของตัวเอง ดังนี้:
   "นักเรียน: กิตติ"
   "นักเรียน: นิภา"
   ...

2. เขียนโค้ดเพื่อบวกทวีคูณค่านมกล่องจากลิสต์ราคา [12, 15, 12, 10] ลงในตัวแปรสะสม total_price
   และพิมพ์ยอดเงินสุทธิสุดท้ายออกมา

3. สังเกตความแตกต่างเมื่อใช้ลูป for เข้าถึงสตริง "CPU" และอธิบายจำนวนรอบที่วนทำซ้ำลงสมุด`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop */}
      <AmbientBackdrop blobs={PY4_BLOBS} />

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">
        
        {/* Section 1: โครงสร้างคำสั่ง for loop */}
        <SectionBlock
          title="โครงสร้างพื้นฐานและการวนซ้ำของ For Loop"
          icon={<Code2 className="w-5 h-5 text-indigo-500" />}
          description="การทำซ้ำแบบทราบจำนวนรอบที่ชัดเจนตามชุดข้อมูลหรือช่วงที่กำหนดไว้ล่วงหน้า"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ConceptCard 
              symbol="for"
              title="คำสั่งเริ่มวนลูป"
              description="การจองห้องทำงานของโปรเซสเซอร์เพื่อเตรียมนำชุดคำสั่งด้านในมาทำซ้ำเป็นจำนวนรอบตามกำหนด"
              accent="purple"
            />
            <ConceptCard 
              symbol="count"
              title="ตัวแปรนับรอบ"
              description="ตัวแปรชั่วคราวที่จะหยิบและสับเปลี่ยนชิ้นข้อมูลจากขวดลิสต์มาเก็บไว้ในตัวเพื่อส่งคำสั่งประมวลผล"
              accent="amber"
            />
            <ConceptCard 
              symbol="in"
              title="คีย์เวิร์ดตัวเชื่อม"
              description="ตัวเชื่อมมาตรฐานที่ใช้กำหนดขอบเขตและระบุว่าจะดึงตัวนับรอบมาจากชุดข้อมูลตะกร้าชิ้นใด"
              accent="violet"
            />
            <ConceptCard 
              symbol="range()"
              title="ฟังก์ชันสร้างชุดลำดับ"
              description="ฟังก์ชันในการผลิตกลุ่มช่วงตัวเลขลำดับอย่างรวดเร็ว เช่น range(1, 5) จะผลิตลำดับตัวเลข 1, 2, 3, 4"
              accent="cyan"
            />
          </div>

          <LoopIterationEngine />
        </SectionBlock>

        {/* Section 2: การดึงข้อมูลจากลิสต์มาใช้งาน */}
        <SectionBlock
          title="การดึงข้อมูลและจัดการสมาชิกในลิสต์"
          icon={<ShoppingBag className="w-5 h-5 text-sky-500" />}
          description="หัวใจสำคัญของการประมวลผลข้อมูลปริมาณมากในโลกของโปรแกรมมิ่งด้วยการ Iterator ข้อมูลทีละชิ้น"
          variant="tinted"
          accent="sky"
        >
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm mb-6 leading-relaxed text-slate-600 text-sm md:text-base">
            เมื่อตัวแปรเก็บข้อมูลแบบ **ลิสต์ (List)** หรือคอลเลกชัน เราสามารถใช้โครงสร้างลูป <code>for</code> เข้าไปหยิบจับดึงข้อมูลแต่ละตัวออกมาใช้ในโปรแกรมได้อย่างเป็นระบบ โดยลูปจะดำเนินการหยุดประมวลผลทันทีเมื่อนำข้อมูลออกมาจนครบตัวสุดท้าย
          </div>

          <LoopingListsDelivery />
        </SectionBlock>

        {/* Section 3: มินิเกมไขโจทย์วัดผลด่วน */}
        <QuizEngine
          title="มินิเกมด่าน: ค่ายกลถอดรหัส For Loop!"
          description="ทดสอบความรู้ความสมเหตุสมผลของนักเรียนผ่านการแก้ไขโจทย์คำสั่งและวิเคราะห์ลูปจำนวนรอบจริง"
          levels={FOR_QUIZ_LEVELS}
          accentColor="from-indigo-500/20 to-purple-500/20"
          icon={<Gamepad2 className="w-8 h-8 text-indigo-400" />}
        />

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask title="ใบงานบทเรียน 4.14" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
