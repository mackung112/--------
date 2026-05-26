import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  ListOrdered, 
  ChefHat, 
  Laptop,
  Search,
  PenTool,
  Code2,
  Bug,
  Play,
  RotateCcw,
  ArrowRight,
  Database,
  Monitor
} from 'lucide-react';

// --- Shared Components ---

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-blue-100 text-blue-600 border border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
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

// --- Interactive Simulator ---

const AlgorithmSimulator = () => {
  const [activeScenario, setActiveScenario] = useState('math');
  const [step, setStep] = useState(0);
  
  // Variables for Math Scenario
  const [base, setBase] = useState(10);
  const [height, setHeight] = useState(5);

  const scenarios = {
    daily: {
      title: "อัลกอริทึม: ต้มบะหมี่กึ่งสำเร็จรูป",
      icon: <ChefHat className="w-5 h-5 text-orange-500" />,
      color: "orange",
      steps: [
        { desc: "เริ่มต้นทำงาน (Start)", memory: null, output: null },
        { desc: "ต้มน้ำให้เดือด", memory: { action: "กำลังต้มน้ำ..." }, output: null },
        { desc: "ใส่บะหมี่และเครื่องปรุงลงในน้ำเดือด", memory: { action: "น้ำเดือดแล้ว ใส่เส้น" }, output: null },
        { desc: "รอ 3 นาที", memory: { action: "รอเวลา 3:00" }, output: null },
        { desc: "เทใส่ชาม พร้อมรับประทาน", memory: { action: "เสร็จสิ้น" }, output: "🍜 บะหมี่พร้อมทาน!" },
        { desc: "จบการทำงาน (End)", memory: null, output: "🍜 บะหมี่พร้อมทาน!" }
      ]
    },
    math: {
      title: "อัลกอริทึม: คำนวณพื้นที่สามเหลี่ยม",
      icon: <Laptop className="w-5 h-5 text-blue-500" />,
      color: "blue",
      steps: [
        { desc: "เริ่มต้นทำงาน (Start)", memory: {}, output: null },
        { desc: "รับค่า ฐาน (base)", memory: { base: base }, output: null },
        { desc: "รับค่า สูง (height)", memory: { base: base, height: height }, output: null },
        { desc: "คำนวณ พื้นที่ = 0.5 * ฐาน * สูง", memory: { base: base, height: height, area: (0.5 * base * height) }, output: null },
        { desc: "แสดงผลลัพธ์ (พื้นที่)", memory: { base: base, height: height, area: (0.5 * base * height) }, output: `พื้นที่สามเหลี่ยมคือ: ${(0.5 * base * height)}` },
        { desc: "จบการทำงาน (End)", memory: {}, output: `พื้นที่สามเหลี่ยมคือ: ${(0.5 * base * height)}` }
      ]
    }
  };

  const currentScen = scenarios[activeScenario];

  const handleNext = () => {
    if (step < currentScen.steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  const changeScenario = (type) => {
    setActiveScenario(type);
    setStep(0);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <ListOrdered className="w-6 h-6 text-blue-500" />
          เครื่องจำลองการทำงานของอัลกอริทึม (Algorithm Visualizer)
        </h3>
        <p className="text-slate-500 mt-2">กดปุ่ม "ทำขั้นตอนต่อไป" เพื่อดูการเปลี่ยนแปลงของข้อมูลในแต่ละขั้น</p>
      </div>

      <div className="flex justify-center gap-4 mb-8 relative z-10">
        <button 
          onClick={() => changeScenario('daily')}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeScenario === 'daily' ? 'bg-orange-50 border-2 border-orange-400 text-orange-600 shadow-lg' : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-orange-200'}`}
        >
          {scenarios.daily.icon} อัลกอริทึมในชีวิตประจำวัน
        </button>
        <button 
          onClick={() => changeScenario('math')}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeScenario === 'math' ? 'bg-blue-50 border-2 border-blue-400 text-blue-600 shadow-lg' : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-blue-200'}`}
        >
          {scenarios.math.icon} อัลกอริทึมคอมพิวเตอร์
        </button>
      </div>

      {activeScenario === 'math' && step === 0 && (
        <div className="flex justify-center gap-4 mb-6 relative z-10 animate-fade-in">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
            <label className="text-sm font-bold text-slate-500">ค่าฐาน (Base):</label>
            <input type="number" value={base} onChange={(e)=>setBase(Number(e.target.value))} className="w-20 px-2 py-1 border rounded bg-white text-center font-mono font-bold text-blue-600" />
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
            <label className="text-sm font-bold text-slate-500">ค่าสูง (Height):</label>
            <input type="number" value={height} onChange={(e)=>setHeight(Number(e.target.value))} className="w-20 px-2 py-1 border rounded bg-white text-center font-mono font-bold text-blue-600" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Steps Panel */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] border-2 border-slate-100 p-6 shadow-inner relative overflow-hidden">
          <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <BrainCircuit className={`w-5 h-5 text-${currentScen.color}-500`} /> 
            ลำดับขั้นตอน (Algorithm)
          </h4>
          <div className="space-y-2 relative">
            {/* Connection Line */}
            <div className="absolute left-[1.1rem] top-4 bottom-4 w-0.5 bg-slate-100 z-0"></div>
            
            {currentScen.steps.map((s, idx) => (
              <div key={idx} className={`relative z-10 flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                idx === step 
                  ? `bg-${currentScen.color}-50 border border-${currentScen.color}-200 shadow-md scale-[1.02] ml-2` 
                  : idx < step 
                    ? 'opacity-50' 
                    : 'opacity-80'
              }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-colors ${
                  idx === step 
                    ? `bg-${currentScen.color}-500 border-${currentScen.color}-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]` 
                    : idx < step 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {idx < step ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`font-medium ${idx === step ? `text-${currentScen.color}-700 font-bold` : 'text-slate-600'}`}>
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* State Panel (Memory & Output) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Memory Visualizer */}
          <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-6 shadow-xl flex-grow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <h4 className="font-mono text-slate-400 text-sm mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" /> หน่วยความจำ (Memory State)
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentScen.steps[step].memory ? (
                Object.entries(currentScen.steps[step].memory).map(([key, val]) => (
                  <div key={key} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center animate-fade-in-up">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">{key}</span>
                    <span className="text-lg font-bold font-mono text-cyan-300 text-center break-all">{val}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-full h-24 flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-xl">
                  [ ไม่มีข้อมูลในหน่วยความจำ ]
                </div>
              )}
            </div>
          </div>

          {/* Output Visualizer */}
          <div className="bg-slate-100 rounded-[2rem] border-2 border-slate-200 p-6 flex flex-col items-center justify-center min-h-[120px]">
            <h4 className="font-bold text-slate-400 text-sm mb-2 flex items-center gap-2 uppercase tracking-widest">
              <Monitor className="w-4 h-4 text-slate-500" /> หน้าจอแสดงผล (Output)
            </h4>
            {currentScen.steps[step].output ? (
              <div className="text-2xl font-black text-slate-800 font-mono animate-bounce-short">
                {currentScen.steps[step].output}
              </div>
            ) : (
              <div className="text-slate-400 font-mono italic">_ (รอการประมวลผล)</div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mt-2">
            <button
              onClick={handleReset}
              disabled={step === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                step === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <RotateCcw className="w-4 h-4" /> เริ่มใหม่
            </button>
            <button
              onClick={handleNext}
              disabled={step === currentScen.steps.length - 1}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                step === currentScen.steps.length - 1 
                  ? 'bg-emerald-100 text-emerald-500 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/30'
              }`}
            >
              {step === currentScen.steps.length - 1 ? 'สิ้นสุดโปรแกรม' : 'ทำขั้นตอนต่อไป'} <Play className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Required style for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}} />
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `โจทย์กิจกรรม: "ฝึกคิดแบบอัลกอริทึม"

ข้อที่ 1: อัลกอริทึมในชีวิตประจำวัน
ให้นักเรียนเขียนลำดับขั้นตอน (Algorithm) "การกดเงินจากตู้ ATM" โดยเขียนเป็นข้อๆ ตั้งแต่เริ่มต้นจนจบกระบวนการให้ละเอียดที่สุด (สมมติว่ามีบัตร ATM อยู่ในมือแล้ว)

ข้อที่ 2: อัลกอริทึมทางคอมพิวเตอร์
จงเขียนลำดับขั้นตอนการแก้ปัญหา (Algorithm) ของโปรแกรม "คำนวณราคาสินค้าหลังหักส่วนลด 10%" 
(ใบ้: ต้องมีการรับข้อมูลราคาสินค้า, การคำนวณส่วนลด, การคำนวณราคาสุทธิ, และการแสดงผล)`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-20 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-4 uppercase flex items-center gap-2">
              <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700">Unit 2.1</span>
              ขั้นตอนการเขียนโปรแกรม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              แนวคิดและอัลกอริทึม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">(Concept & Algorithm)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-blue-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ก่อนที่เราจะสั่งให้คอมพิวเตอร์ทำงานใดๆ เราต้องสอนมันก่อนว่าต้องทำ <strong>"อะไร"</strong> และทำ <strong>"อย่างไร"</strong> ตามลำดับขั้นตอนที่ชัดเจน ซึ่งกระบวนการคิดที่เป็นลำดับขั้นนี้ เราเรียกว่า <strong>"อัลกอริทึม" (Algorithm)</strong>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* 2.1.1 ความหมายของอัลกอริทึม */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-blue-500">2.1.1</span> ความหมายของอัลกอริทึม
          </h2>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full z-0"></div>
            <div className="relative z-10">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                <strong>อัลกอริทึม (Algorithm)</strong> คือ กระบวนการหรือลำดับขั้นตอนในการแก้ปัญหาใดปัญหาหนึ่งอย่างเป็นระบบ มีจุดเริ่มต้นและจุดสิ้นสุดที่ชัดเจน เมื่อทำตามขั้นตอนเหล่านี้อย่างถูกต้อง จะต้องได้ผลลัพธ์ที่ต้องการเสมอ เปรียบเสมือน <strong>"สูตรทำอาหาร" (Recipe)</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 1: Everyday Life */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:border-orange-300 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">ตัวอย่างในชีวิตประจำวัน</h3>
              </div>
              <h4 className="font-bold text-slate-600 mb-3 border-b pb-2">อัลกอริทึม: การทอดไข่ดาว</h4>
              <ol className="space-y-2 text-slate-600 list-decimal list-inside font-medium">
                <li>ตั้งกระทะบนเตา</li>
                <li>เทน้ำมัน รอให้น้ำมันร้อน</li>
                <li>ตอกไข่ใส่กระทะ</li>
                <li>รอจนไข่ขาวสุก</li>
                <li>ตักไข่ดาวขึ้นใส่จาน</li>
              </ol>
            </div>

            {/* Example 2: Computer Tech */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:border-blue-300 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">ตัวอย่างทางคอมพิวเตอร์</h3>
              </div>
              <h4 className="font-bold text-slate-600 mb-3 border-b pb-2">อัลกอริทึม: การเข้าสู่ระบบ (Login)</h4>
              <ol className="space-y-2 text-slate-600 list-decimal list-inside font-medium">
                <li>เปิดหน้าจอ Login</li>
                <li>ผู้ใช้กรอก Username และ Password</li>
                <li>ตรวจสอบข้อมูลในฐานข้อมูล</li>
                <li><strong>ถ้า</strong> ข้อมูลถูกต้อง ➔ เข้าสู่ระบบสำเร็จ</li>
                <li><strong>ถ้า</strong> ข้อมูลผิด ➔ แสดงข้อความแจ้งเตือนให้กรอกใหม่</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 2.1.2 ขั้นตอนและกระบวนการแก้ปัญหา */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-indigo-500">2.1.2</span> ขั้นตอนและกระบวนการแก้ปัญหา
          </h2>
          
          <p className="text-slate-600 mb-8 text-lg">
            ในการเขียนโปรแกรมคอมพิวเตอร์ โปรแกรมเมอร์ไม่ได้เริ่มพิมพ์โค้ดทันที แต่ต้องผ่านกระบวนการคิดแก้ปัญหา (Problem Solving Process) ซึ่งมี 4 ขั้นตอนหลัก ดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
              <div className="text-5xl font-black text-slate-100 absolute -right-2 -bottom-4 z-0 group-hover:text-amber-50 transition-colors">1</div>
              <div className="relative z-10">
                <Search className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-2">วิเคราะห์ปัญหา</h3>
                <p className="text-sm text-slate-500">ทำความเข้าใจปัญหา ระบุว่าอะไรคือ "ข้อมูลนำเข้า (Input)" และอะไรคือ "ผลลัพธ์ (Output)" ที่ต้องการ</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
              <div className="text-5xl font-black text-slate-100 absolute -right-2 -bottom-4 z-0 group-hover:text-blue-50 transition-colors">2</div>
              <div className="relative z-10">
                <PenTool className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-2">ออกแบบอัลกอริทึม</h3>
                <p className="text-sm text-slate-500">คิดลำดับขั้นตอนวิธีแก้ปัญหา อาจเขียนในรูปของรหัสเทียม (Pseudocode) หรือผังงาน (Flowchart)</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400"></div>
              <div className="text-5xl font-black text-slate-100 absolute -right-2 -bottom-4 z-0 group-hover:text-indigo-50 transition-colors">3</div>
              <div className="relative z-10">
                <Code2 className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-2">เขียนโปรแกรม</h3>
                <p className="text-sm text-slate-500">นำอัลกอริทึมที่ออกแบบไว้ มาแปลงเป็นภาษาคอมพิวเตอร์ (Coding) เช่น ภาษา Python</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
              <div className="text-5xl font-black text-slate-100 absolute -right-2 -bottom-4 z-0 group-hover:text-emerald-50 transition-colors">4</div>
              <div className="relative z-10">
                <Bug className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-2">ทดสอบและแก้ไข</h3>
                <p className="text-sm text-slate-500">รันโปรแกรมเพื่อหาข้อผิดพลาด (Bug) และแก้ไข (Debug) เพื่อให้แน่ใจว่าได้ผลลัพธ์ที่ถูกต้องเสมอ</p>
              </div>
            </div>

          </div>
          
          {/* Example 4 Steps */}
          <div className="mt-10 bg-slate-800 rounded-3xl p-8 text-white shadow-lg border border-slate-700">
            <h4 className="text-xl font-bold text-blue-300 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> ตัวอย่างการประยุกต์ใช้ 4 ขั้นตอน: โปรแกรมเช็คเลขคู่/คี่
            </h4>
            <div className="space-y-4 font-medium text-sm md:text-base">
              <div className="flex gap-4 items-start">
                <div className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg shrink-0 w-24 text-center">ขั้นที่ 1</div>
                <div className="text-slate-300">Input: ตัวเลข 1 ตัว, Output: แสดงคำว่า "เลขคู่" หรือ "เลขคี่"</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg shrink-0 w-24 text-center">ขั้นที่ 2</div>
                <div className="text-slate-300">นำตัวเลขนั้นมาหารเอาเศษ (Modulo) ด้วย 2 ถ้าเศษ = 0 เป็นเลขคู่ ถ้าเศษ = 1 เป็นเลขคี่</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg shrink-0 w-24 text-center">ขั้นที่ 3</div>
                <div className="text-slate-300 font-mono text-blue-200">เขียนโค้ด: <code className="bg-slate-900 px-2 py-0.5 rounded">if num % 2 == 0: print("คู่") else: print("คี่")</code></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg shrink-0 w-24 text-center">ขั้นที่ 4</div>
                <div className="text-slate-300">ลองป้อนเลข 4 หวังว่าผลจะเป็น "คู่", ลองป้อนเลข 7 หวังว่าผลจะเป็น "คี่"</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Simulator Component */}
        <AlgorithmSimulator />

        {/* Teacher Task */}
        <TeacherTask title="แบบฝึกหัดท้ายบท" taskText={teacherTaskContent} />

        {/* Next Topic Suggestion */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4 font-medium">เข้าใจแนวคิดและลำดับขั้นตอนแล้วใช่ไหม?</p>
          <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-full shadow-md border border-slate-200">
            <span className="text-slate-600">หัวข้อถัดไป:</span>
            <span className="font-bold text-blue-600 text-lg">2.2 วงจรการพัฒนาซอฟต์แวร์ (SDLC)</span>
            <ArrowRight className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-xs text-slate-400 mt-4">(พิมพ์ "2.2" เพื่อเข้าสู่เนื้อหาถัดไป)</p>
        </div>
        
      </main>
    </div>
  );
}