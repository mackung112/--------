import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Percent, 
  Divide, 
  PlusSquare,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 border border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-rose-100 text-rose-600 border border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]'
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

const MathSimulator = () => {
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(3);
  const [operator, setOperator] = useState('%');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  const operators = [
    { symbol: '+', name: 'บวก', color: 'bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-400' },
    { symbol: '-', name: 'ลบ', color: 'bg-indigo-100 text-indigo-600 border-indigo-200 hover:border-indigo-400' },
    { symbol: '*', name: 'คูณ', color: 'bg-violet-100 text-violet-600 border-violet-200 hover:border-violet-400' },
    { symbol: '/', name: 'หาร', color: 'bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200 hover:border-fuchsia-400' },
    { symbol: '//', name: 'หารปัดเศษทิ้ง', color: 'bg-rose-100 text-rose-600 border-rose-200 hover:border-rose-400' },
    { symbol: '%', name: 'หารเอาเศษ', color: 'bg-pink-100 text-pink-600 border-pink-200 hover:border-pink-400' },
    { symbol: '**', name: 'ยกกำลัง', color: 'bg-orange-100 text-orange-600 border-orange-200 hover:border-orange-400' },
  ];

  useEffect(() => {
    calculateResult();
  }, [num1, num2, operator]);

  const calculateResult = () => {
    setError('');
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('?');
      return;
    }

    try {
      if ((operator === '/' || operator === '//' || operator === '%') && b === 0) {
        setError('ZeroDivisionError: ห้ามหารด้วยศูนย์!');
        setResult('Error');
        return;
      }

      let res = 0;
      switch (operator) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '*': res = a * b; break;
        case '/': res = a / b; break;
        case '//': res = Math.floor(a / b); break;
        case '%': res = a % b; break;
        case '**': res = Math.pow(a, b); break;
        default: res = 0;
      }
      
      // Format to avoid super long decimals
      setResult(Number.isInteger(res) ? res : parseFloat(res.toFixed(4)));
    } catch (e) {
      setError('เกิดข้อผิดพลาดในการคำนวณ');
      setResult('Error');
    }
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400"></div>
      
      <div className="p-8 md:p-12">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Calculator className="w-6 h-6 text-rose-500" />
            เครื่องจำลองตัวดำเนินการ (Operator Simulator)
          </h3>
          <p className="text-slate-500 mt-2">ทดลองเปลี่ยนตัวเลขและเครื่องหมาย เพื่อดูผลลัพธ์การทำงานของ Python</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Inputs & Operators */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 justify-center">
              <div className="flex flex-col items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">ค่าที่ 1</label>
                <input 
                  type="number" 
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-24 h-16 text-center text-2xl font-bold font-mono bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all"
                />
              </div>
              
              <div className="text-3xl font-bold text-rose-400 font-mono w-12 text-center">
                {operator}
              </div>

              <div className="flex flex-col items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">ค่าที่ 2</label>
                <input 
                  type="number" 
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-24 h-16 text-center text-2xl font-bold font-mono bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {operators.map((op) => (
                <button
                  key={op.symbol}
                  onClick={() => setOperator(op.symbol)}
                  className={`px-4 py-2 rounded-xl font-mono text-lg font-bold border-2 transition-all duration-300 ${
                    operator === op.symbol 
                      ? `${op.color.split(' ')[0]} ${op.color.split(' ')[1]} border-${op.color.split('-')[1]}-400 shadow-[0_0_15px_rgba(244,63,94,0.3)] scale-110` 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  title={op.name}
                >
                  {op.symbol}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 font-medium">เครื่องหมายที่เลือก: <span className="text-rose-500 font-bold">{operators.find(o => o.symbol === operator)?.name}</span></p>
          </div>

          {/* Output & Code */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-inner flex flex-col relative overflow-hidden group">
            {/* Subtle glow inside the code block */}
            <div className="absolute -inset-10 bg-rose-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div>
                <div className="text-slate-500 text-xs font-mono mb-2"># Python Code</div>
                <div className="font-mono text-lg text-slate-300">
                  <span className="text-blue-400">a</span> = <span className="text-amber-400">{num1 === '' ? '0' : num1}</span><br/>
                  <span className="text-blue-400">b</span> = <span className="text-amber-400">{num2 === '' ? '0' : num2}</span><br/>
                  <span className="text-blue-400">result</span> = <span className="text-blue-400">a</span> <span className="text-rose-400 font-bold">{operator}</span> <span className="text-blue-400">b</span><br/>
                  <span className="text-yellow-200">print</span>(<span className="text-blue-400">result</span>)
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
                {error ? (
                  <div className="text-rose-400 font-mono text-sm animate-pulse bg-rose-950/50 p-3 rounded-lg border border-rose-900/50">
                    {error}
                  </div>
                ) : (
                  <div className="text-4xl font-mono font-bold text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-900/50 inline-block shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    {result}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม:
ข้อ 1: โปรแกรมคำนวณเงินทอน
ให้นักเรียนรับค่า "ราคาสินค้า" และ "จำนวนเงินที่จ่าย" จากนั้นให้โปรแกรมคำนวณและแสดงผล "เงินทอน" ที่ลูกค้าจะได้รับ

ข้อ 2: โปรแกรมแปลงหน่วยเวลา (เน้นใช้ // และ %)
ให้นักเรียนรับค่า "จำนวนวินาที" (เช่น 4000 วินาที)
แล้วนำมาคำนวณหาว่า จำนวนวินาทีนั้น คิดเป็นกี่ชั่วโมง กี่นาที และกี่วินาที
(คำใบ้: 1 ชั่วโมง = 3600 วินาที, 1 นาที = 60 วินาที)
ตัวอย่างผลรัน: "4000 วินาที คิดเป็น 1 ชั่วโมง 6 นาที 40 วินาที"`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-rose-200 selection:text-rose-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pink-100/60 blur-[100px]"></div>
      </div>

      {/* Header Section (Left-aligned) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-rose-600 mb-4 uppercase">
              หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ตัวดำเนินการคณิตศาสตร์ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">(Arithmetic Operators)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-rose-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              การสั่งให้คอมพิวเตอร์คำนวณตัวเลขเปรียบเสมือนการใช้เครื่องคิดเลข แต่ใน Python มีเครื่องหมายพิเศษบางตัวที่เหนือกว่าเครื่องคิดเลขทั่วไป เช่น การหารปัดเศษทิ้ง และ การหาเศษเหลือ
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Basic vs Advanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Basic Operators */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <PlusSquare className="w-6 h-6 text-blue-500" /> เครื่องหมายพื้นฐาน
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">+</span>
                <div><span className="font-bold text-slate-700">บวก (Addition)</span><br/><code className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">5 + 2 = 7</code></div>
              </li>
              <li className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">-</span>
                <div><span className="font-bold text-slate-700">ลบ (Subtraction)</span><br/><code className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">5 - 2 = 3</code></div>
              </li>
              <li className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <span className="w-10 h-10 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center font-bold text-xl">*</span>
                <div><span className="font-bold text-slate-700">คูณ (Multiplication)</span><br/><code className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">5 * 2 = 10</code></div>
              </li>
              <li className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <span className="w-10 h-10 bg-fuchsia-100 text-fuchsia-600 rounded-lg flex items-center justify-center font-bold text-xl">/</span>
                <div><span className="font-bold text-slate-700">หาร (Division)</span> <span className="text-[10px] text-fuchsia-500 font-bold bg-fuchsia-100 px-1 rounded ml-1">ผลเป็น Float เสมอ</span><br/><code className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">5 / 2 = 2.5</code></div>
              </li>
            </ul>
          </div>

          {/* Advanced Operators */}
          <div className="bg-white rounded-3xl p-8 border-2 border-rose-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full z-0"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-rose-500" /> เครื่องหมายที่ต้องระวัง
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <span className="w-10 h-10 bg-rose-200 text-rose-700 rounded-lg flex items-center justify-center font-bold text-xl">//</span>
                  <div>
                    <span className="font-bold text-rose-900">หารปัดเศษทิ้ง (Floor Division)</span>
                    <p className="text-xs text-rose-600 mt-0.5 mb-1 leading-snug">หารแบบไม่เอาทศนิยม ตัดทิ้งหมด</p>
                    <code className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm border border-rose-100">5 // 2 = 2</code>
                  </div>
                </li>
                <li className="flex items-center gap-4 p-3 bg-pink-50 rounded-xl border border-pink-100">
                  <span className="w-10 h-10 bg-pink-200 text-pink-700 rounded-lg flex items-center justify-center font-bold text-xl">%</span>
                  <div>
                    <span className="font-bold text-pink-900">หารเอาเศษ (Modulo)</span>
                    <p className="text-xs text-pink-600 mt-0.5 mb-1 leading-snug">เอาเฉพาะ "เศษ" ที่เหลือจากการหาร</p>
                    <code className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm border border-pink-100">5 % 2 = 1</code>
                  </div>
                </li>
                <li className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="w-10 h-10 bg-orange-200 text-orange-700 rounded-lg flex items-center justify-center font-bold text-xl">**</span>
                  <div>
                    <span className="font-bold text-orange-900">ยกกำลัง (Exponentiation)</span>
                    <p className="text-xs text-orange-600 mt-0.5 mb-1 leading-snug">นำตัวเลขตัวแรกไปยกกำลังตัวที่สอง</p>
                    <code className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm border border-orange-100">5 ** 2 = 25</code>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Deep Dive into Modulo (%) */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 md:p-10 text-white shadow-xl mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-7 h-7 text-yellow-300" />
                เคล็ดลับ: ทำไม Modulo (%) ถึงสำคัญมาก?
              </h2>
              <p className="text-pink-100 leading-relaxed mb-4">
                ในการเขียนโปรแกรม เราใช้ <strong>เครื่องหมาย % (หารเอาเศษ)</strong> บ่อยมากสำหรับแก้ปัญหาต่างๆ เช่น:
              </p>
              <ul className="space-y-3 font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-sm mt-0.5">1</span>
                  <span><strong>เช็คเลขคู่/คี่:</strong> เลขอะไรก็ตาม <code>% 2</code> แล้วเหลือเศษ 0 แปลว่าเป็นเลขคู่ ถ้าเหลือ 1 เป็นเลขคี่</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-sm mt-0.5">2</span>
                  <span><strong>การแยกหลักตัวเลข:</strong> <code>125 % 10</code> จะได้เศษ 5 (หลักหน่วย) ช่วยให้ดึงตัวเลขตัวท้ายสุดออกมาได้</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 w-full bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/20 font-mono text-sm shadow-inner">
              <span className="text-pink-300"># ตรวจสอบเลขคู่คี่</span><br/>
              <span className="text-blue-300">num</span> = <span className="text-amber-300">10</span><br/>
              <span className="text-yellow-300">print</span>(<span className="text-blue-300">num</span> <span className="text-white font-bold">%</span> <span className="text-amber-300">2</span>)<br/>
              <span className="text-slate-400"># Output: 0 (ลงตัว)</span>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <MathSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}