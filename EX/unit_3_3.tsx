import React, { useState } from 'react';
import { 
  Hash, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  AlertTriangle,
  ArrowRight,
  Calculator,
  Settings,
  FileDigit,
  RefreshCw,
  XCircle,
  Lightbulb
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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
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

const TypeCastingSimulator = () => {
  const [activeCase, setActiveCase] = useState(0);

  const testCases = [
    {
      id: 0,
      label: 'ข้อความตัวเลข',
      inputRaw: '"42"',
      inputType: 'str',
      output: '42',
      outputType: 'int',
      isError: false,
      explanation: 'ดึงเอาเฉพาะตัวเลขออกมาจากเครื่องหมายคำพูด แปลงเป็นจำนวนเต็มได้สำเร็จ'
    },
    {
      id: 1,
      label: 'ตัวเลขทศนิยม',
      inputRaw: '3.99',
      inputType: 'float',
      output: '3',
      outputType: 'int',
      isError: false,
      explanation: 'ตัดเศษทศนิยมทิ้งทั้งหมด (ปัดลงเสมอ) ไม่มีการปัดเศษขึ้นเหมือนคณิตศาสตร์ทั่วไป'
    },
    {
      id: 2,
      label: 'ค่าความจริง',
      inputRaw: 'True',
      inputType: 'bool',
      output: '1',
      outputType: 'int',
      isError: false,
      explanation: 'ในคอมพิวเตอร์ True มีค่าเท่ากับ 1 (และ False มีค่าเท่ากับ 0)'
    },
    {
      id: 3,
      label: 'ข้อความทั่วไป',
      inputRaw: '"Hello"',
      inputType: 'str',
      output: 'ValueError',
      outputType: 'Error',
      isError: true,
      explanation: 'ข้อผิดพลาด! ไม่สามารถแปลงตัวอักษรเป็นตัวเลขได้'
    },
    {
      id: 4,
      label: 'ข้อความทศนิยม',
      inputRaw: '"3.14"',
      inputType: 'str',
      output: 'ValueError',
      outputType: 'Error',
      isError: true,
      explanation: 'ข้อผิดพลาด! ฟังก์ชัน int() ไม่รองรับข้อความที่มีจุดทศนิยม ต้องแปลงเป็น float() ก่อน'
    }
  ];

  const currentCase = testCases[activeCase];

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Settings className="w-6 h-6 text-emerald-500 animate-spin-slow" />
          โรงงานแปลงข้อมูล (int() Factory)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองส่งข้อมูลชนิดต่างๆ เข้าไปในเครื่องจักร <code className="bg-slate-100 text-emerald-600 px-1 rounded">int()</code> เพื่อดูผลลัพธ์</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Selector Panel */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">เลือกวัตถุดิบ (Input Data)</h4>
          {testCases.map((tc) => (
            <button
              key={tc.id}
              onClick={() => setActiveCase(tc.id)}
              className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 flex justify-between items-center ${
                activeCase === tc.id 
                  ? 'bg-emerald-50 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                  : 'bg-white border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div>
                <div className={`font-mono font-bold text-lg ${activeCase === tc.id ? 'text-emerald-700' : 'text-slate-700'}`}>
                  {tc.inputRaw}
                </div>
                <div className="text-xs text-slate-500 mt-1">{tc.label}</div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${
                tc.inputType === 'str' ? 'bg-amber-100 text-amber-700' : 
                tc.inputType === 'float' ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {tc.inputType}
              </span>
            </button>
          ))}
        </div>

        {/* Factory Visualizer */}
        <div className="lg:col-span-8 bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-inner relative flex flex-col justify-center min-h-[300px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Input Node */}
            <div className="flex flex-col items-center">
              <span className="text-slate-400 font-mono text-sm mb-2">Input</span>
              <div className="bg-slate-800 border-2 border-slate-600 rounded-xl p-4 w-32 h-24 flex items-center justify-center shadow-lg">
                <span className="text-xl font-mono font-bold text-white">{currentCase.inputRaw}</span>
              </div>
            </div>

            {/* Processor */}
            <div className="flex flex-col items-center flex-grow">
              <ArrowRight className="w-8 h-8 text-emerald-500 mb-2 hidden md:block" />
              <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-full px-6 py-4 flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
                <span className="font-mono text-2xl font-black text-emerald-400 tracking-wider">int()</span>
              </div>
              <ArrowRight className="w-8 h-8 text-emerald-500 mt-2 hidden md:block" />
            </div>

            {/* Output Node */}
            <div className="flex flex-col items-center">
              <span className="text-slate-400 font-mono text-sm mb-2">Output</span>
              <div className={`border-2 rounded-xl p-4 w-32 h-24 flex items-center justify-center shadow-lg transition-colors ${
                currentCase.isError 
                  ? 'bg-rose-950/50 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                  : 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              }`}>
                {currentCase.isError ? (
                  <XCircle className="w-8 h-8 text-rose-500" />
                ) : (
                  <span className="text-3xl font-mono font-black text-emerald-400">{currentCase.output}</span>
                )}
              </div>
              {!currentCase.isError && (
                 <span className="mt-2 text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded font-mono border border-indigo-500/50">
                   type: {currentCase.outputType}
                 </span>
              )}
            </div>
          </div>

          {/* Explanation Box */}
          <div className={`mt-8 relative z-10 p-4 rounded-xl border ${
            currentCase.isError ? 'bg-rose-900/20 border-rose-800/50 text-rose-200' : 'bg-emerald-900/20 border-emerald-800/50 text-emerald-200'
          }`}>
            <div className="flex items-start gap-3">
               <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${currentCase.isError ? 'text-rose-400' : 'text-emerald-400'}`} />
               <p className="text-sm leading-relaxed">{currentCase.explanation}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักแปลงข้อมูล (The Data Caster)"

ข้อที่ 1: การคำนวณอายุจากปีเกิด
ให้นักเรียนเขียนโปรแกรมรับ "ปี ค.ศ. เกิด" จากผู้ใช้งาน และคำนวณหา "อายุ" ในปีปัจจุบัน (2024)
*ข้อควรระวัง: ข้อมูลที่รับจาก input() จะเป็นข้อความเสมอ ต้องแปลงเป็นจำนวนเต็มก่อนคำนวณ

ตัวอย่างโครงสร้างโค้ด:
birth_year_str = input("คุณเกิดปี ค.ศ. อะไร?: ")
# เติมโค้ดแปลงข้อมูลบรรทัดนี้
...
age = 2024 - birth_year
print(f"ปีนี้คุณอายุ {age} ปี")

ข้อที่ 2: ปัดเศษราคาสินค้าทิ้ง
สมมติว่าร้านค้ามีโปรโมชั่น "ไม่คิดเศษสตางค์" 
ให้รับค่าราคาสินค้าที่เป็นทศนิยม (เช่น 199.99) แล้วแปลงให้เป็นจำนวนเต็ม เพื่อแสดงราคาที่ลูกค้าต้องจ่ายจริง`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-teal-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ข้อมูลจำนวนเต็ม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">(Integer / int)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-emerald-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในโลกการเขียนโปรแกรม <strong className="text-emerald-700">ตัวเลขจำนวนเต็ม (Integer)</strong> ถูกใช้บ่อยที่สุด ทั้งการนับจำนวน การคำนวณอายุ หรือการระบุตำแหน่งข้อมูล โดยในภาษา Python ใช้ชื่อย่อว่า <code>int</code>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section 3.3.1 Characteristic */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Hash className="w-6 h-6 text-emerald-500" />
            3.3.1 ลักษณะของข้อมูลประเภทจำนวนเต็ม
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Positive/Negative */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-emerald-200 transition-all group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">±</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">ครอบคลุมทุกค่า</h3>
              <p className="text-sm text-slate-600 mb-4">ข้อมูล <code>int</code> สามารถเป็นได้ทั้ง จำนวนเต็มบวก จำนวนเต็มลบ และศูนย์ (แต่ต้องไม่มีจุดทศนิยม)</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">score</span> = <span className="text-amber-600">100</span></div>
                <div><span className="text-blue-500">temp</span> = <span className="text-amber-600">-5</span></div>
                <div><span className="text-blue-500">balance</span> = <span className="text-amber-600">0</span></div>
              </div>
            </div>

            {/* Card 2: Math Operations */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-emerald-200 transition-all group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">คำนวณได้ทันที</h3>
              <p className="text-sm text-slate-600 mb-4">สามารถนำตัวแปรชนิด <code>int</code> มาบวก ลบ คูณ หาร กันได้เหมือนคณิตศาสตร์ทั่วไป</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">a</span> = <span className="text-amber-600">10</span></div>
                <div><span className="text-blue-500">b</span> = <span className="text-amber-600">5</span></div>
                <div><span className="text-yellow-600">print</span>(<span className="text-blue-500">a</span> + <span className="text-blue-500">b</span>) <span className="text-slate-400"># 15</span></div>
              </div>
            </div>

            {/* Card 3: Unlimited Size */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">∞</span>
                </div>
                <h3 className="font-bold text-emerald-300 text-lg mb-3">ไร้ขีดจำกัด (Unlimited Size)</h3>
                <p className="text-sm text-slate-400 mb-4">จุดเด่นของ Python 3 คือ จำนวนเต็ม <strong>ไม่มีเพดานสูงสุด</strong> (ขึ้นอยู่กับ RAM ของเครื่อง) ต่างจากภาษา C หรือ Java ที่มีขีดจำกัด (เช่น ปัญหา Y2K)</p>
                <div className="bg-black/40 p-3 rounded-xl border border-slate-700 font-mono text-xs text-emerald-400 break-all">
                  9999999999999999999999
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.3.2 Type Casting */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full pointer-events-none -z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-emerald-500" />
              3.3.2 การแปลงชนิดข้อมูล (Type Casting)
            </h2>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  บ่อยครั้งที่เราได้รับข้อมูลมาในรูปแบบของ "ข้อความ (String)" โดยเฉพาะเวลาที่เราใช้คำสั่ง <code className="bg-slate-100 text-purple-600 px-1 rounded font-mono">input()</code> รับค่าจากคีย์บอร์ด 
                </p>
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl mb-6">
                  <h4 className="font-bold text-rose-800 mb-1 text-sm">ปัญหาที่พบบ่อย</h4>
                  <p className="text-rose-600 text-sm">ถ้าเราเอาข้อความมาบวกกัน มันจะนำมา <strong>ต่อกัน (Concat)</strong> ไม่ได้บวกแบบตัวเลข เช่น <code className="font-mono bg-rose-100 px-1 rounded">"10" + "5"</code> จะได้ <code className="font-mono bg-rose-100 px-1 rounded">"105"</code> ไม่ใช่ 15!</p>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  เราจึงต้องใช้ฟังก์ชัน <code className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold font-mono">int(ข้อมูล)</code> เพื่อแปลงข้อมูลนั้นให้กลายเป็นจำนวนเต็ม ก่อนนำไปคำนวณคณิตศาสตร์
                </p>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">การแก้ปัญหาด้วย int()</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-slate-500"># 1. รับค่าเป็น String</span><br/>
                    <span className="text-blue-400">age_str</span> = <span className="text-green-400">"18"</span><br/>
                    <br/>
                    <span className="text-slate-500"># 2. แปลงเป็น Integer</span><br/>
                    <span className="text-blue-400">age_int</span> = <span className="text-emerald-400 font-bold">int</span>(<span className="text-blue-400">age_str</span>)<br/>
                    <br/>
                    <span className="text-slate-500"># 3. นำไปคำนวณได้แล้ว!</span><br/>
                    <span className="text-blue-400">next_year</span> = <span className="text-blue-400">age_int</span> + <span className="text-amber-400">1</span><br/>
                    <span className="text-yellow-200">print</span>(<span className="text-blue-400">next_year</span>) <span className="text-slate-500"># Output: 19</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <TypeCastingSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />
        
        {/* Next Unit Recommendation */}
        <div className="mt-16 flex justify-end">
          <div className="bg-emerald-50 border border-emerald-100 px-6 py-4 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group">
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">หัวข้อถัดไป</p>
              <h4 className="text-slate-800 font-bold group-hover:text-emerald-700 transition-colors">3.4 ข้อมูลทศนิยม (Float)</h4>
            </div>
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-200">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}