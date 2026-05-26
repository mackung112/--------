import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Monitor, 
  Cpu, 
  ArrowDown, 
  Play, 
  RefreshCcw, 
  RotateCcw,
  CheckCircle2, 
  Terminal, 
  AlertTriangle, 
  Gamepad2,
  BookOpen,
  Copy,
  Info,
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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-indigo-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
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
// 2. Main pyUnit1_2_LanguageLevels Component
// ==========================================
export default function pyUnit1_2_LanguageLevels() {
  const [activeLevel, setActiveLevel] = useState('high');
  const [pipelineState, setPipelineState] = useState(0); // 0: Idle, 1: High, 2: Assembly, 3: Machine, 4: Quiz
  const [logs, setLogs] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null });
  const [isTranslating, setIsTranslating] = useState(false);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  const startTranslation = async () => {
    if (isTranslating) return;
    setIsTranslating(true);
    setPipelineState(1);
    setActiveLevel('high');
    setLogs([]);
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    addLog("ตรวจจับชุดคำสั่งรหัสต้นฉบับ (Source Input)...", "sys");
    addLog("High-Level: print('Hello World')", "info");
    await sleep(1000);

    setPipelineState(2);
    setActiveLevel('assembly');
    addLog("คอมไพเลอร์ (Compiler) กำลังถอดแบบไวยากรณ์...", "sys");
    addLog("คำสั่งแปลรหัส Assembly: MOV AH, 09h (เตรียมแสดงอักขระ)", "success");
    addLog("คำสั่งแปลรหัส Assembly: LEA DX, msg (อ้างอิงตำแหน่งข้อความ)", "success");
    addLog("คำสั่งแปลรหัส Assembly: INT 21h (เรียกใช้คำสั่งระบบ OS)", "success");
    await sleep(1000);

    setPipelineState(3);
    setActiveLevel('machine');
    addLog("ตัวแปลรหัสเครื่อง (Assembler) เข้ารหัสสัญญาณไฟฟ้าแบบ 1:1...", "sys");
    addLog("ชุดบิตตัวเลขที่แปลงเสร็จสิ้น: 10110100 00001001...", "success");
    addLog("ชุดบิตตัวเลขที่แปลงเสร็จสิ้น: 00000000 11001101...", "success");
    addLog("ฮาร์ดแวร์ CPU: ดำเนินการประมวลผลคำสั่งสำเร็จสมบูรณ์!", "warn");
    
    setIsTranslating(false);
  };

  const resetSimulator = () => {
    setPipelineState(0);
    setActiveLevel('high');
    setLogs([]);
    setQuizScore(0);
    setQuizAnswers({ q1: null, q2: null });
    setIsTranslating(false);
  };

  const handleQuiz = (q, answer) => {
    setQuizAnswers(prev => ({ ...prev, [q]: answer }));
    if ((q === 'q1' && answer === 'machine') || (q === 'q2' && answer === 'high')) {
      setQuizScore(s => s + 1);
      addLog(`Quiz: คำตอบข้อ ${q === 'q1' ? '1' : '2'} ถูกต้องยอดเยี่ยม!`, "success");
    } else {
      addLog(`Quiz: คำตอบข้อ ${q === 'q1' ? '1' : '2'} ยังไม่ถูกต้องตามหลักการ`, "error");
    }
  };

  const levelsDetails = {
    high: {
      title: "ภาษาระดับสูง (High-Level Language)",
      desc: "ออกแบบโดยเน้นความอ่านง่ายของมนุษย์ โครงสร้างคล้ายคลึงคำบอกเล่าภาษาอังกฤษและสูตรคณิตศาสตร์ ทำให้เรียนรู้ เขียนโค้ด และดูแลรักษาระบบได้สะดวก เช่น Python, C++, Java",
      readability: "ง่ายมาก (100%)",
      speed: "ช้ากว่าระดับต่ำ (ต้องผ่านล่ามแปลภาษา)",
      readVal: 5.0,
      speedVal: 3.0,
      badgeColor: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      accentBorder: "border-emerald-500 bg-emerald-50/40",
      example: 'print("Hello World")'
    },
    assembly: {
      title: "ภาษาแอสเซมบลี (Assembly Language)",
      desc: "ภาษาระดับต่ำที่ใช้สัญลักษณ์อักษรย่อช่วยจำ (Mnemonics) เช่น ADD, MOV, INT แทนเลขฐานสองที่สลับซับซ้อน เขียนยากและขึ้นอยู่กับชนิดสถาปัตยกรรมของ CPU ตัวเครื่องโดยตรง",
      readability: "ยาก (25%)",
      speed: "เร็วมาก (สามารถควบคุมฮาร์ดแวร์ได้เกือบโดยตรง)",
      readVal: 2.0,
      speedVal: 4.5,
      badgeColor: "bg-amber-100 text-amber-700 border border-amber-200",
      accentBorder: "border-amber-500 bg-amber-50/40",
      example: 'MOV AH, 09h\nLEA DX, msg\nINT 21h'
    },
    machine: {
      title: "ภาษาเครื่อง (Machine Language)",
      desc: "ภาษาระดับต่ำที่สุดที่ CPU เข้าใจและทำงานได้โดยตรงโดยไม่ต้องมีตัวแปลภาษาใดๆ ประกอบด้วยเลขฐานสอง (0 และ 1) ซึ่งแปลงเป็นกระแสไฟฟ้าเปิด/ปิดของวงจร ทำงานได้เร็วที่สุดในโลก",
      readability: "ยากที่สุด (0%)",
      speed: "เร็วที่สุด (ประมวลผลทันทีในระดับวงจรไฟฟ้า)",
      readVal: 0.5,
      speedVal: 5.0,
      badgeColor: "bg-rose-100 text-rose-700 border border-rose-200",
      accentBorder: "border-rose-500 bg-rose-50/40",
      example: '10110100 00001001\n00000000 11001101'
    }
  };

  const curData = levelsDetails[activeLevel || 'high'];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-800 pb-24 relative overflow-hidden">
      
      {/* Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-300/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-200/20 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Standardized Hero Header */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                บทเรียนหลักสูตรคอมพิวเตอร์เบื้องต้น
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-600 border border-cyan-200">
                รหัสวิชา 21910-1003
              </span>
            </div>
            
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 mb-2 uppercase">
              หน่วยที่ 1: หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              1.2 ระดับของภาษาคอมพิวเตอร์ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">
                (Levels of Computer Languages)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-emerald-500 pl-6 mt-4 relative">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              ภาษาคอมพิวเตอร์ถูกจำแนกออกตามระดับความใกล้เคียงกับภาษาธรรมชาติของมนุษย์ ทดลองศึกษาโครงสร้าง <strong>สแต็กของภาษาคอมพิวเตอร์ (Language Stack)</strong> และดูการไหลของชุดแปลสัญญาณลงไปสู่สัญญาณไฟฟ้า
            </p>
          </div>
        </div>
      </header>

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden mb-8">
          
          {/* Header Bar */}
          <div className="p-6 md:p-8 bg-slate-50/50 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-850">ตัวจำลองลึกลงสู่สถิติระดับของภาษาคอมพิวเตอร์</h3>
              <p className="text-xs text-slate-500 mt-1">
                คลิกเลือกภาษาในแต่ละสแต็กทางซ้าย เพื่อประเมินความแตกต่างของสปีดความเร็วและเปรียบเทียบกับคำสั่งไฟฟ้าจริง
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={startTranslation}
                disabled={isTranslating}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-600/10 ${
                  isTranslating 
                    ? 'bg-emerald-300 text-white cursor-not-allowed opacity-75' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" /> เริ่มจำลองการแปลภาษา
              </button>
              
              <button
                onClick={resetSimulator}
                className="px-3.5 border border-zinc-300 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" /> รีเซ็ต
              </button>
            </div>
          </div>

          {/* Interactive Split Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-100">
            
            {/* Left Column: Stack Panel */}
            <div className="col-span-1 lg:col-span-6 p-6 md:p-8 bg-slate-50/20 border-r border-zinc-100 flex flex-col items-center justify-center gap-3">
              
              {/* High-Level Language Stack */}
              <div 
                onClick={() => !isTranslating && setActiveLevel('high')}
                className={`w-full max-w-md rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer flex flex-col relative ${
                  activeLevel === 'high' 
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md scale-[1.02]' 
                    : 'border-zinc-200 bg-white hover:border-emerald-300 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-700 text-sm">
                    <Code2 className="w-5 h-5 text-emerald-500" /> 1. ภาษาระดับสูง (High-Level Language)
                  </div>
                  {pipelineState >= 1 && <Check className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />}
                </div>
                <div className="bg-[#121214] p-3 rounded-xl font-mono text-xs text-emerald-400 border border-zinc-800">
                  print("Hello World")
                </div>
              </div>

              <ArrowDown className={`w-5 h-5 transition-all duration-300 ${pipelineState >= 2 ? 'text-teal-500' : 'text-zinc-300'}`} />

              {/* Assembly Language Stack */}
              <div 
                onClick={() => !isTranslating && setActiveLevel('assembly')}
                className={`w-full max-w-md rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer flex flex-col relative ${
                  activeLevel === 'assembly' 
                    ? 'border-amber-500 bg-amber-50/50 shadow-md scale-[1.02]' 
                    : 'border-zinc-200 bg-white hover:border-amber-300 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-700 text-sm">
                    <Monitor className="w-5 h-5 text-amber-500" /> 2. ภาษาแอสเซมบลี (Assembly Language)
                  </div>
                  {pipelineState >= 2 && <Check className="w-4.5 h-4.5 text-amber-500 animate-pulse" />}
                </div>
                <div className="bg-[#121214] p-3 rounded-xl font-mono text-xs text-amber-400 border border-zinc-800 leading-relaxed">
                  MOV AH, 09h<br/>INT 21h
                </div>
              </div>

              <ArrowDown className={`w-5 h-5 transition-all duration-300 ${pipelineState >= 3 ? 'text-teal-500' : 'text-zinc-300'}`} />

              {/* Machine Language Stack */}
              <div 
                onClick={() => !isTranslating && setActiveLevel('machine')}
                className={`w-full max-w-md rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer flex flex-col relative ${
                  activeLevel === 'machine' 
                    ? 'border-rose-500 bg-rose-50/50 shadow-md scale-[1.02]' 
                    : 'border-zinc-200 bg-white hover:border-rose-300 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-extrabold text-slate-700 text-sm">
                    <Cpu className="w-5 h-5 text-rose-500" /> 3. ภาษาเครื่อง (Machine Language)
                  </div>
                  {pipelineState >= 3 && <Check className="w-4.5 h-4.5 text-rose-500 animate-pulse" />}
                </div>
                <div className="bg-[#121214] p-3 rounded-xl font-mono text-xs text-rose-400 border border-zinc-800 break-all leading-relaxed">
                  10110100 00001001 11001101 00100001
                </div>
              </div>

              {pipelineState >= 3 && (
                <button
                  onClick={() => setPipelineState(4)}
                  className="mt-4 px-6 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-1.5 animate-in slide-in-from-bottom-2 shadow-sm"
                >
                  <Gamepad2 className="w-4 h-4 text-indigo-600" /> ทำควิซทดสอบความเข้าใจ
                </button>
              )}
            </div>

            {/* Right Column: Level Specifications & Details */}
            <div className="col-span-1 lg:col-span-6 p-6 md:p-8 flex flex-col justify-center">
              
              {pipelineState < 4 ? (
                <div className="space-y-5 animate-in fade-in duration-300">
                  
                  {/* Category Title */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${curData.badgeColor}`}>
                      ระดับขั้นระดับการเขียนโค้ด
                    </span>
                    <span className="text-[11px] text-slate-400">Specification</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-800">{curData.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm">
                    {curData.desc}
                  </p>

                  {/* Visual Bar Comparison */}
                  <div className="space-y-3 bg-slate-50 border border-zinc-200/60 p-4 rounded-2xl">
                    
                    {/* Readability bar */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                        <span>ความง่ายต่อการเขียนและอ่านออก (Readability):</span>
                        <span className="text-emerald-600">{curData.readability}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${(curData.readVal / 5) * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Speed bar */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                        <span>ประสิทธิภาพความเร็วรันเครื่อง (Speed):</span>
                        <span className="text-indigo-600">{curData.speed}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${(curData.speedVal / 5) * 100}%` }}></div>
                      </div>
                    </div>

                  </div>

                  {/* Era Example syntax code */}
                  <div className="bg-[#121214] p-4 rounded-xl border border-zinc-800 relative font-mono text-xs">
                    <span className="absolute top-2.5 right-3 text-[10px] text-zinc-500 font-sans uppercase tracking-widest">ตัวอย่างคำสั่ง</span>
                    <pre className="text-emerald-400 leading-relaxed font-bold whitespace-pre-wrap">{curData.example}</pre>
                  </div>
                </div>
              ) : (
                
                // Minicwz Quiz Area
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                    <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-indigo-600" /> มินิควิซจำหลักการระดับภาษา
                    </h4>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
                      คะแนน: {quizScore} / 2
                    </span>
                  </div>

                  {/* Q1 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-zinc-200 space-y-3">
                    <p className="font-bold text-xs md:text-sm text-slate-850">1. ภาษาคอมพิวเตอร์ระดับต่ำสุดที่ CPU สามารถถอดคำสั่งไฟฟ้ามาจัดทำงานได้ทันทีโดยไม่ต้องผ่านล่ามแปลภาษาคืออะไร?</p>
                    <div className="flex gap-2 font-bold text-[10px] md:text-xs">
                      <button 
                        onClick={() => handleQuiz('q1', 'high')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q1 === 'high' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาระดับสูง</button>
                      <button 
                        onClick={() => handleQuiz('q1', 'assembly')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q1 === 'assembly' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาแอสเซมบลี</button>
                      <button 
                        onClick={() => handleQuiz('q1', 'machine')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q1 === 'machine' ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาเครื่อง</button>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-zinc-200 space-y-3">
                    <p className="font-bold text-xs md:text-sm text-slate-850">2. ภาษาเขียนโปรแกรม Python ที่ลดความยุ่งยากของเครื่องหมายและจัด Indentation จัดอยู่ในระดับภาษาขั้นใด?</p>
                    <div className="flex gap-2 font-bold text-[10px] md:text-xs">
                      <button 
                        onClick={() => handleQuiz('q2', 'high')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q2 === 'high' ? 'bg-emerald-100 border-emerald-400 text-emerald-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาระดับสูง</button>
                      <button 
                        onClick={() => handleQuiz('q2', 'assembly')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q2 === 'assembly' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาแอสเซมบลี</button>
                      <button 
                        onClick={() => handleQuiz('q2', 'machine')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 rounded-xl border transition-all ${quizAnswers.q2 === 'machine' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-zinc-200 hover:bg-slate-50 text-slate-600'}`}
                      >ภาษาเครื่อง</button>
                    </div>
                  </div>
                </div>

              )}

            </div>
          </div>

          {/* VS Code console log outputs at the bottom of the simulator */}
          <div className="bg-[#121214] p-4 font-mono text-xs border-t border-zinc-900">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" /> Translator Process Logs
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${pipelineState > 0 && pipelineState < 4 ? 'bg-emerald-500 animate-ping' : 'bg-zinc-650'}`}></span>
                <span className="text-[9px] text-zinc-600 tracking-widest font-sans font-bold">READY</span>
              </div>
            </div>

            <div className="h-44 overflow-y-auto space-y-1.5 text-[11px] leading-relaxed text-zinc-300">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 font-bold uppercase w-10 ${
                    log.type === 'error' ? 'text-rose-400' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'sys' ? 'text-blue-400' : 'text-slate-400'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={
                    log.type === 'error' ? 'text-rose-300 font-semibold animate-pulse' :
                    log.type === 'warn' ? 'text-amber-300' :
                    log.type === 'success' ? 'text-emerald-300' :
                    log.type === 'sys' ? 'text-blue-200 font-semibold' : 'text-zinc-300'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-zinc-600 italic select-none">Waiting for translation pipeline triggers...</div>}
            </div>
          </div>

        </div>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="งานที่ได้รับมอบหมาย: การศึกษาวิเคราะห์ความสูงต่ำของระดับภาษาคอมพิวเตอร์" 
          taskText={`[โจทย์ปฏิบัติประจำบทเรียน 1.2]
1. จงจำแนกประเภทของภาษาคอมพิวเตอร์ต่อไปนี้ ว่าอยู่ในระดับภาษาเครื่อง (Machine), ภาษาแอสเซมบลี (Assembly) หรือภาษาระดับสูง (High-Level):
   A. C++
   B. 10110000 00000101
   C. MOV AH, 4Ch
   D. Java
   E. Python

2. อธิบายจุดเปรียบเทียบในแง่ของ "ความง่ายต่อการเขียนของมนุษย์ (Readability)" และ "ความเร็วในการประมวลผลของคอมพิวเตอร์ (Speed)" ระหว่างภาษาระดับสูงกับภาษาเครื่องมาพอสังเขป`} 
        />

      </main>

    </div>
  );
}
