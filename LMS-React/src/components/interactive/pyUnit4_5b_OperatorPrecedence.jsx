import React, { useState } from 'react';
import { 
  Calculator, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ListOrdered,
  AlertTriangle,
  Play,
  RotateCcw,
  Brackets,
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
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 border border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-purple-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-purple-100 text-purple-600 border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
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

const PrecedenceSimulator = () => {
  const [selectedEq, setSelectedEq] = useState('eq1');
  const [step, setStep] = useState(0);

  // Hardcoded simulation steps for visual clarity
  const equations = {
    eq1: {
      label: '8 + 4 * 2',
      desc: 'คูณ (*) ทำก่อน บวก (+)',
      steps: [
        { display: <><span className="text-slate-400">8 + </span><span className="text-purple-600">4 * 2</span></>, highlight: '4 * 2', result: '8' },
        { display: <><span className="text-slate-400">8 + </span><span className="text-emerald-500">8</span></>, highlight: '8 + 8', result: '16' },
        { display: <span className="text-blue-600 text-5xl font-black">16</span>, highlight: '', result: '' }
      ]
    },
    eq2: {
      label: '(8 + 4) * 2',
      desc: 'วงเล็บ () ทำก่อนเสมอ',
      steps: [
        { display: <><span className="text-purple-600">(8 + 4)</span><span className="text-slate-400"> * 2</span></>, highlight: '(8 + 4)', result: '12' },
        { display: <><span className="text-emerald-500">12</span><span className="text-slate-400"> * 2</span></>, highlight: '12 * 2', result: '24' },
        { display: <span className="text-blue-600 text-5xl font-black">24</span>, highlight: '', result: '' }
      ]
    },
    eq3: {
      label: '10 - 4 + 2',
      desc: 'ระดับเท่ากัน ทำจาก ซ้าย ไป ขวา',
      steps: [
        { display: <><span className="text-purple-600">10 - 4</span><span className="text-slate-400"> + 2</span></>, highlight: '10 - 4', result: '6' },
        { display: <><span className="text-emerald-500">6</span><span className="text-slate-400"> + 2</span></>, highlight: '6 + 2', result: '8' },
        { display: <span className="text-blue-600 text-5xl font-black">8</span>, highlight: '', result: '' }
      ]
    }
  };

  const handleNext = () => {
    if (step < equations[selectedEq].steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  const switchEquation = (eqKey) => {
    setSelectedEq(eqKey);
    setStep(0);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Calculator className="w-6 h-6 text-purple-500" />
          เครื่องจำลองลำดับการคำนวณ (Step-by-step Evaluator)
        </h3>
        <p className="text-slate-500 mt-2">คอมพิวเตอร์ไม่ได้คิดจากซ้ายไปขวาเสมอไป ลองกดปุ่มทีละขั้นตอนเพื่อดูวิธีการคิดของมัน</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-2">เลือกสมการเพื่อทดสอบ</h4>
          {Object.keys(equations).map((key) => (
            <button
              key={key}
              onClick={() => switchEquation(key)}
              className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 ${
                selectedEq === key 
                  ? 'bg-purple-50 border-purple-400 shadow-md' 
                  : 'bg-white border-slate-100 hover:border-purple-200'
              }`}
            >
              <div className={`font-mono text-xl font-bold mb-1 ${selectedEq === key ? 'text-purple-700' : 'text-slate-700'}`}>
                {equations[key].label}
              </div>
              <div className="text-sm text-slate-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> {equations[key].desc}
              </div>
            </button>
          ))}
        </div>

        {/* Display Area */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="w-full h-64 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl flex flex-col items-center justify-center relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="font-mono text-4xl md:text-5xl font-bold tracking-widest text-white mb-4 transition-all duration-500 ease-in-out">
                {equations[selectedEq].steps[step].display}
              </div>
              
              {/* Highlight Note */}
              {step < 2 && (
                <div className="bg-purple-500/20 border border-purple-500/50 text-purple-300 px-4 py-2 rounded-full font-mono text-sm animate-pulse">
                  คำนวณ: [ {equations[selectedEq].steps[step].highlight} ] ➔ {equations[selectedEq].steps[step].result}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
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
              disabled={step === 2}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                step === 2 ? 'bg-emerald-100 text-emerald-400 cursor-not-allowed shadow-none' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/30'
              }`}
            >
              {step === 2 ? 'เสร็จสิ้น' : 'คำนวณขั้นต่อไป'} <Play className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_5b_OperatorPrecedence() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม: "คำนวณค่าเฉลี่ย"
ให้นักเรียนเขียนโปรแกรมรับค่าคะแนนสอบ 3 วิชา (วิชาละ 100 คะแนน) และหา "ค่าเฉลี่ย (Average)" ของคะแนนทั้ง 3 วิชานั้น

ข้อควรระวัง! การเขียนสมการหาค่าเฉลี่ย:
❌ ผิด: avg = score1 + score2 + score3 / 3  (มันจะเอาแค่ score3 ไปหาร 3 ก่อน)
✅ ถูก: avg = (score1 + score2 + score3) / 3 (ใช้วงเล็บเพื่อบังคับให้บวกกันให้เสร็จก่อน)

คำสั่ง:
1. รับคะแนนจากผู้ใช้ 3 ตัวแปร (ใช้ float(input()))
2. คำนวณค่าเฉลี่ยโดยใช้วงเล็บให้ถูกต้อง
3. แสดงผลลัพธ์ออกทางหน้าจอ`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-purple-200 selection:text-purple-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-50/70 blur-[100px]"></div>
      </div>

      {/* Header Section (Left-aligned) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-purple-600 mb-4 uppercase flex items-center gap-2">
              หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ลำดับความสำคัญของตัวดำเนินการ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">(Operator Precedence)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-purple-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              เมื่อในหนึ่งสมการมีเครื่องหมายหลายตัว คอมพิวเตอร์จะมีกฎว่าต้อง <strong>"ทำอันไหนก่อน อันไหนหลัง"</strong> (เหมือนหลักคณิตศาสตร์ PEMDAS) หากเราไม่เข้าใจกฎนี้ อาจทำให้ได้คำตอบที่ผิดเพี้ยนไปจากที่ตั้งใจไว้
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Hierarchy (The Pyramid/List) */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden mb-12 flex flex-col lg:flex-row">
          
          {/* Left Side: Explaining the rules */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-slate-900 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ListOrdered className="w-8 h-8 text-purple-400" /> 
                ลำดับชั้นการทำงาน
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold text-xl shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-purple-300">วงเล็บ (Parentheses)</h4>
                    <p className="text-slate-400 text-sm font-mono mt-1">( ) ทำในนี้ให้เสร็จก่อนเสมอ</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center font-bold text-xl shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-fuchsia-300">เลขยกกำลัง (Exponentiation)</h4>
                    <p className="text-slate-400 text-sm font-mono mt-1">**</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xl shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-blue-300">คูณ หาร หารปัดเศษ เอาเศษ</h4>
                    <p className="text-slate-400 text-sm font-mono mt-1">* , / , // , %</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-emerald-300">บวก ลบ (Add, Subtract)</h4>
                    <p className="text-slate-400 text-sm font-mono mt-1">+ , -</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-800 p-4 rounded-xl text-sm text-slate-300 border-l-4 border-amber-400">
                <strong className="text-amber-400">กฎเพิ่มเติม:</strong> หากมีเครื่องหมายที่อยู่ <strong>ระดับเดียวกัน</strong> (เช่น มีทั้งคูณและหารในสมการเดียว) โปรแกรมจะทำจาก <strong>ซ้าย ไป ขวา (Left to Right)</strong>
              </div>
            </div>
          </div>

          {/* Right Side: Common Mistake */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-white flex flex-col justify-center">
             <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-4 bg-rose-50 px-3 py-1.5 rounded-full text-sm self-start">
              <AlertTriangle className="w-4 h-4" /> จุดผิดพลาดยอดฮิต (Bug Alert!)
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-6">สมการหาค่าเฉลี่ย (Average)</h3>
            <p className="text-slate-600 mb-6">สมมติเราต้องการหาค่าเฉลี่ยของเลข 10 และ 20 (คำตอบที่ถูกคือ 15)</p>
            
            <div className="space-y-4">
              {/* Bad Code */}
              <div className="border border-rose-200 rounded-2xl p-5 bg-rose-50/50">
                <div className="flex items-center gap-2 text-rose-600 font-bold mb-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center">✕</div> 
                  เขียนแบบไม่ใส่วงเล็บ
                </div>
                <code className="block bg-white p-3 rounded-lg text-slate-700 border border-rose-100 font-mono text-sm">
                  avg = 10 + <span className="text-rose-500 underline decoration-wavy underline-offset-4">20 / 2</span>
                </code>
                <p className="text-sm text-rose-600 mt-2 font-mono">
                  คอมพิวเตอร์จะทำหารก่อน (20/2 = 10) แล้วค่อยบวก ทำให้ได้ <span className="font-bold">20</span> ซึ่ง <strong>ผิด!</strong>
                </p>
              </div>

              {/* Good Code */}
              <div className="border border-emerald-200 rounded-2xl p-5 bg-emerald-50/50">
                <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center">✓</div> 
                  เขียนแบบใส่วงเล็บควบคุม
                </div>
                <code className="block bg-white p-3 rounded-lg text-slate-700 border border-emerald-100 font-mono text-sm">
                  avg = <span className="text-emerald-500 font-bold">(10 + 20)</span> / 2
                </code>
                <p className="text-sm text-emerald-700 mt-2 font-mono">
                  บวกกันในวงเล็บก่อน (30) แล้วค่อยเอาไปหาร 2 ทำให้ได้ <span className="font-bold">15</span> ซึ่ง <strong>ถูกต้อง!</strong>
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-purple-600 bg-purple-50 p-4 rounded-xl border border-purple-100 text-sm font-bold">
              <Brackets className="w-5 h-5" />
              เคล็ดลับ: ถ้าไม่แน่ใจลำดับ ให้ใส่วงเล็บ ( ) ครอบไว้ก่อนเสมอ!
            </div>
          </div>

        </div>

        {/* Interactive Simulator */}
        <PrecedenceSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}