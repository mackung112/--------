import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCode2, 
  Zap, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Settings,
  Play,
  Bug,
  FileBox,
  AlertOctagon,
  Clock,
  Terminal,
  RotateCcw,
  Info
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
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-violet-50 rounded-2xl text-violet-600 border border-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-orange-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]'
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
// 2. Main pyUnit1_3_TranslatorCompare Component
// ==========================================
export default function pyUnit1_3_TranslatorCompare() {
  const [mode, setMode] = useState('compiler'); // 'compiler' or 'interpreter'
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, ready, running, done, error
  const [activeLine, setActiveLine] = useState(-1);
  const [logs, setLogs] = useState([]);
  
  const simulationRef = useRef(null);

  const codeLines = [
    { text: 'print("Start Game")', type: 'log', output: 'Start Game' },
    { text: 'score = 100', type: 'assign' },
    { text: 'print("Score:", score)', type: 'log', output: 'Score: 100' },
    { text: hasError ? 'print(10 / 0)' : 'score = score + 50', type: hasError ? 'error' : 'assign', output: hasError ? 'ZeroDivisionError: division by zero' : '' },
    { text: 'print("End Game")', type: 'log', output: 'End Game' }
  ];

  const resetSim = () => {
    setStatus('idle');
    setActiveLine(-1);
    setLogs([]);
    if (simulationRef.current) clearTimeout(simulationRef.current);
  };

  useEffect(() => {
    resetSim();
  }, [mode, hasError]);

  const sleep = (ms) => new Promise(resolve => {
    simulationRef.current = setTimeout(resolve, ms);
  });

  const runCompiler = async () => {
    setStatus('processing');
    setLogs(['[System] เริ่มกระบวนการคอมไพล์ซอร์สโค้ดทั้งหมด (GCC Compiler)...']);
    setActiveLine(-1);
    
    await sleep(1500); // Simulate compile time

    if (hasError) {
      setStatus('error');
      setActiveLine(3);
      setLogs(prev => [...prev, '[Compiler Error] บรรทัดที่ 4: พบข้อผิดพลาดร้ายแรงทางคณิตศาสตร์ (Division by Zero)', '❌ การคอมไพล์ล้มเหลว! ไม่สามารถสร้างไฟล์ .exe ได้!']);
    } else {
      setStatus('ready');
      setLogs(prev => [...prev, '[System] คอมไพล์สำเร็จ! สร้างไฟล์โปรแกรมสำเร็จรูป "program.exe" (32KB)', '✅ ไฟล์พร้อมใช้งานแล้ว (สามารถเรียกเปิดใช้ซ้ำได้ทันที)']);
    }
  };

  const runCompiledProgram = async () => {
    setStatus('running');
    setLogs(['[System] กำลังเปิดโหลดรันไฟล์ program.exe ในระบบปฏิบัติการ...']);
    await sleep(600);
    
    const outputs = codeLines.filter(line => line.output).map(line => line.output);
    setLogs(prev => [...prev, ...outputs, '✅ โปรแกรมทำภารกิจจบสมบูรณ์ (รันผ่านไบนารีโดยตรง)']);
    setStatus('done');
  };

  const runInterpreter = async () => {
    setStatus('running');
    setLogs(['[System] เริ่มการทำงานแบบล่ามแปลความหมาย (Python Interpreter)...']);
    
    for (let i = 0; i < codeLines.length; i++) {
      setActiveLine(i);
      await sleep(900); // Simulate line-by-line speed

      if (codeLines[i].type === 'error') {
        setStatus('error');
        setLogs(prev => [...prev, `❌ [Runtime Error] บรรทัดที่ ${i + 1}: ${codeLines[i].output}`, '🛑 โปรแกรมหยุดการทำงานและส่งสัญญาณแครชทันที!']);
        return; // Halt execution
      }

      if (codeLines[i].output) {
        setLogs(prev => [...prev, codeLines[i].output]);
      }
    }
    
    setStatus('done');
    setActiveLine(-1);
    setLogs(prev => [...prev, '✅ โปรแกรมล่ามทำงานจบสมบูรณ์']);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-800 pb-24 relative overflow-hidden">
      
      {/* Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-200/25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-200/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-pink-100/20 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Standardized Hero Header */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-200">
                บทเรียนหลักสูตรคอมพิวเตอร์เบื้องต้น
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200">
                รหัสวิชา 21910-1003
              </span>
            </div>
            
            <h2 className="text-sm font-bold tracking-widest text-violet-600 mb-2 uppercase">
              หน่วยที่ 1: หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              1.3 Interpreter vs Compiler <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                (Translator Engine: Compiler vs Interpreter)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-violet-500 pl-6 mt-4 relative">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              เมื่อภาษาระดับสูงไม่สามารถทำงานตรง ๆ บน CPU ได้ เราจึงต้องการโปรแกรมตัวแปลสัญญาณภาษา โดยจำแนกออกเป็น 2 แนวคิดหลักที่มีวิธีวิเคราะห์รหัสและรับมือข้อผิดพลาด (Bugs) ต่างกันสิ้นเชิง
            </p>
          </div>
        </div>
      </header>

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Strengths side-by-side card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Compiler card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-violet-100 shadow-sm hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-100/30 rounded-full blur-2xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center border border-violet-200">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Compiler (คอมไพเลอร์)</h3>
                  <span className="text-[10px] font-bold text-violet-500 tracking-widest uppercase">ตัวแปลรวบยอด</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                เปรียบเสมือน <strong>"นักแปลหนังสือ"</strong> ที่ทำการสแกนตรวจสอบไวยากรณ์และแปลโค้ดทั้งไฟล์พร้อมกันรวดเดียว หากตรวจเจอจุดผิด (Error) แม้แต่นิดเดียว จะล้มเหลวและปฏิเสธการแปลงไฟล์ทั้งหมดทันที แต่หากเสร็จสิ้นจะได้ไฟล์สำเร็จรูป <strong>(.exe)</strong> ที่พร้อมรันด้วยความเร็วสูง
              </p>
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <span><strong>รันเร็วที่สุด:</strong> เนื่องจากแปลเป็นสัญญาณเครื่องล่วงหน้าแล้ว ไม่ต้องแปลซ้ำอีก</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileBox className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <span><strong>แชร์ไฟล์ง่าย:</strong> ส่งเพียงไฟล์ `.exe` ปลายทางก็เปิดรันได้ทันทีโดยไม่ต้องการซอร์สโค้ด</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ตัวอย่างภาษา:</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">C</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">C++</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Go</span>
              </div>
            </div>
          </div>

          {/* Interpreter card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-orange-100 shadow-sm hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-orange-100/30 rounded-full blur-2xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-200">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Interpreter (อินเทอร์พรีเตอร์)</h3>
                  <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">ตัวแปลล่ามสด</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                เปรียบเสมือน <strong>"ล่ามแปลสด"</strong> ที่คอยวิเคราะห์โค้ดและดำเนินการรันไปทีละบรรทัดเรื่อย ๆ ตามลำดับ หากบรรทัดที่ 4 มีจุดเขียนผิด โปรแกรมจะยังคงสั่งแสดงผลและดำเนินการบรรทัดที่ 1-3 ได้จนเสร็จสิ้น ก่อนจะแครชแผลงฤทธิ์เมื่อวิ่งมาชนบรรทัดที่มีข้อผิดพลาด
              </p>
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <Bug className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>ดีบักง่ายมาก:</strong> ระบบจะฟ้องแสดงผลและหยุดทำงาน ณ จุดที่ผิดพลาดย่อยทันที</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>เปิดรันช้ากว่า:</strong> เพราะทุกครั้งที่รันระบบจะต้องสแกนโหลดแปลใหม่ทั้งหมดทีละแถว</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ตัวอย่างภาษา:</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Python</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">JavaScript</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Ruby</span>
              </div>
            </div>
          </div>

        </div>

        {/* IDE Simulator box */}
        <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden p-6 md:p-8 mb-12">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest block mb-1">กล่องสตูดิโอทดลองจำลองเชิงระบบ (Sandbox Mode)</span>
            <h3 className="text-2xl font-bold text-slate-800">เครื่องวิเคราะห์ผลกระทบบั๊ก: Compiler vs Interpreter IDE</h3>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto mt-2 leading-relaxed">
              สลับระบบจำลองเพื่อทดลองตรวจสอบและรันโค้ด Python ด้านล่างนี้ โดยจำกัดการประเมินเทียบกันเมื่อ <strong>"มีข้อผิดพลาด (Bug)"</strong> ว่าการทำระบบแปลทั้ง 2 รูปแบบส่งผลการทำงานต่างกันอย่างไร
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Editor column (Left) */}
            <div className="col-span-1 lg:col-span-6 flex flex-col gap-5">
              
              {/* Selector buttons */}
              <div className="flex justify-between items-center bg-slate-100/80 p-1.5 rounded-2xl border border-zinc-200 shadow-inner">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setMode('compiler')}
                    disabled={status === 'processing' || status === 'running'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      mode === 'compiler' 
                        ? 'bg-white shadow-sm text-violet-600 border border-violet-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <FileCode2 className="w-4 h-4" /> Compiler
                  </button>
                  <button 
                    onClick={() => setMode('interpreter')}
                    disabled={status === 'processing' || status === 'running'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      mode === 'interpreter' 
                        ? 'bg-white shadow-sm text-orange-600 border border-orange-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Zap className="w-4 h-4" /> Interpreter
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    if (status === 'idle' || status === 'error' || status === 'done' || status === 'ready') {
                      setHasError(!hasError);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1 hover:scale-[1.02] active:scale-95 ${
                    hasError 
                      ? 'bg-rose-100 text-rose-600 border border-rose-200 shadow-sm' 
                      : 'bg-slate-200 text-slate-500 hover:bg-slate-300 border border-transparent'
                  }`}
                >
                  <Bug className="w-3.5 h-3.5" />
                  {hasError ? 'สอดแทรก Bug อยู่ 🐛' : 'ใส่ Bug จำลอง'}
                </button>
              </div>

              {/* IDE Code window */}
              <div className="bg-[#121214] rounded-2xl overflow-hidden shadow-md border border-zinc-800 flex flex-col min-h-[220px]">
                <div className="bg-[#1E1E1E] px-4 py-2.5 border-b border-zinc-850 flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-mono">script.py</span>
                  <div className="flex gap-1.5 select-none">
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                  </div>
                </div>

                <div className="p-4 font-mono text-xs md:text-sm leading-relaxed flex-1 flex flex-col justify-center gap-1.5 bg-[#121214]">
                  {codeLines.map((line, idx) => {
                    let isLineActive = activeLine === idx;
                    let isLineError = line.type === 'error' && status === 'error';
                    
                    return (
                      <div 
                        key={idx} 
                        className={`px-3 py-1 rounded transition-colors duration-300 flex items-center gap-3 ${
                          isLineActive 
                            ? (isLineError ? 'bg-rose-500/20 border-l-2 border-rose-500 text-rose-300 font-bold' : 'bg-slate-800 text-emerald-400 font-semibold border-l-2 border-emerald-500') 
                            : 'border-l-2 border-transparent text-zinc-400'
                        }`}
                      >
                        <span className="text-zinc-650 w-4 inline-block select-none">{idx + 1}</span>
                        <span>{line.text}</span>
                        {line.type === 'error' && <Bug className="w-3.5 h-3.5 text-rose-500 ml-auto animate-pulse" />}
                      </div>
                    );
                  })}
                </div>

                {/* IDE buttons */}
                <div className="p-4 bg-[#1E1E1E] flex justify-center gap-3 border-t border-zinc-850">
                  {mode === 'compiler' ? (
                    <>
                      <button 
                        onClick={runCompiler} 
                        disabled={status !== 'idle' && status !== 'error'} 
                        className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-violet-900/40 flex items-center gap-1.5 active:scale-95"
                      >
                        <Settings className={`w-3.5 h-3.5 ${status === 'processing' ? 'animate-spin' : ''}`} /> 1. คอมไพล์ (Compile)
                      </button>
                      <button 
                        onClick={runCompiledProgram} 
                        disabled={status !== 'ready'} 
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-900/40 flex items-center gap-1.5 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> 2. รัน (Run EXE)
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={runInterpreter} 
                      disabled={status === 'running' || status === 'done' || status === 'error'} 
                      className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white px-8 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-900/40 flex items-center gap-1.5 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> รันโปรแกรมทีละบรรทัด (Run)
                    </button>
                  )}
                  {(status === 'done' || status === 'error' || status === 'ready') && (
                    <button 
                      onClick={resetSim} 
                      className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                    >
                      รีเซ็ต
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Output console column (Right) */}
            <div className="col-span-1 lg:col-span-6 flex flex-col">
              <div className="bg-[#121214] rounded-2xl p-6 shadow-inner border border-zinc-800 h-full flex flex-col font-mono relative overflow-hidden">
                <div className="text-zinc-500 text-[10px] uppercase tracking-widest flex items-center justify-between border-b border-zinc-850 pb-2 mb-4">
                  <span className="flex items-center gap-2 font-bold select-none"><Terminal className="w-4 h-4 text-emerald-400 animate-pulse" /> Terminal Window</span>
                  <span className="text-zinc-700">STATUS: {status.toUpperCase()}</span>
                </div>
                
                <div className="flex-grow space-y-2 text-xs md:text-sm text-zinc-200 h-44 overflow-y-auto leading-relaxed">
                  {logs.length === 0 && <div className="text-zinc-600 italic select-none">Waiting for compiler or interpreter execution...</div>}
                  {logs.map((log, idx) => {
                    let isErr = log.includes('Error') || log.includes('❌') || log.includes('ล้มเหลว');
                    let isSys = log.includes('System') || log.includes('✅') || log.includes('สำเร็จ');
                    
                    return (
                      <div 
                        key={idx} 
                        className={`animate-in fade-in slide-in-from-left-2 duration-150 ${
                          isErr ? 'text-rose-400' :
                          isSys ? 'text-indigo-400 font-medium' : 'text-emerald-400'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })}
                </div>
                
                {/* Visual Binary file box output for Compiler */}
                {mode === 'compiler' && status === 'ready' && (
                  <div className="mt-4 p-3 bg-violet-950/40 border border-violet-500/30 rounded-xl flex items-center gap-3 animate-in zoom-in-95 duration-300">
                    <FileBox className="w-7 h-7 text-violet-400 shrink-0" />
                    <div>
                      <div className="text-violet-300 font-bold text-xs font-mono">program.exe</div>
                      <div className="text-[10px] text-violet-500 font-sans">สร้างไฟล์ไบนารีสำเร็จรูปเรียบร้อย!</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Core summary table section */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" /> ตารางเปรียบเทียบเชิงลึก (Comparison Matrix)
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200/70 shadow-sm">
            <table className="w-full text-left bg-white border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-extrabold text-[11px] md:text-xs">
                  <th className="p-4 uppercase tracking-wider">คุณสมบัติการวิเคราะห์</th>
                  <th className="p-4 text-violet-700 uppercase tracking-wider bg-violet-50/20">Compiler (คอมไพเลอร์)</th>
                  <th className="p-4 text-orange-700 uppercase tracking-wider bg-orange-50/20">Interpreter (อินเทอร์พรีเตอร์)</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">กระบวนการแปล (Mechanism)</td>
                  <td className="p-4 bg-violet-50/5">สแกนและแปล **พร้อมกันรวดเดียว** ทั้งแอปพลิเคชัน</td>
                  <td className="p-4 bg-orange-50/5">อ่านและแปลความหมาย **ทีละบรรทัด** ดำเนินการทันที</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">การดักตรวจจับ Bug (Error Checking)</td>
                  <td className="p-4 bg-violet-50/5 text-rose-500 font-medium">ต้องล้าง Error ทั้งโปรแกรมให้หมดก่อนเริ่มรัน</td>
                  <td className="p-4 bg-orange-50/5 text-emerald-600 font-medium">รันบรรทัดก่อนหน้าได้เรื่อย ๆ จนกว่าจะวิ่งชนบั๊ก</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">ผลผลิตโปรแกรม (Outputs)</td>
                  <td className="p-4 bg-violet-50/5 font-mono text-violet-600 font-bold text-xs">ได้ไฟล์ไบนารีรันเดี่ยว (เช่น .exe)</td>
                  <td className="p-4 bg-orange-50/5 font-mono text-orange-600 font-bold text-xs">ไม่ได้ไฟล์ใหม่ (ต้องดึงอ่านสคริปต์ต้นฉบับตลอด)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">ความเร็วในการปฏิบัติงาน (Performance)</td>
                  <td className="p-4 bg-violet-50/5 text-emerald-600 font-bold">รวดเร็วสูงสุด ( CPU คุยกับไบนารีตรง ๆ )</td>
                  <td className="p-4 bg-orange-50/5 text-amber-600 font-bold">ช้ากว่า (เนื่องจากเสียเวลาคุยแปลภาษาล่ามใหม่ทุกรอบ)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="กิจกรรม: นักแปลหนังสือ vs ล่ามแปลสด" 
          taskText={`กิจกรรม Unplugged: "นักแปลหนังสือ vs ล่ามแปลสด"

คำชี้แจง: แบ่งกลุ่มนักเรียนและให้แต่ละกลุ่มทดลองสวมบทบาทการทำงาน 2 แบบ:
บทบาทที่ 1 (Compiler): ให้กระดาษที่มีข้อความภาษาอังกฤษ 5 ประโยค. นักเรียนต้อง "แปลให้เสร็จทั้งหน้า" ก่อน จึงจะส่งกระดาษที่แปลเสร็จแล้วไปให้เพื่อนอีกคนอ่านได้ทีเดียว
บทบาทที่ 2 (Interpreter): ให้กระดาษข้อความเดิม. นักเรียนต้อง "อ่านภาษาอังกฤษ 1 ประโยค แล้วพูดแปลเป็นไทยทันที" ทีละประโยคให้เพื่อนฟัง

คำถามชวนคิด:
1. หากประโยคที่ 4 มีคำศัพท์ที่เขียนผิด (Syntax Error) การแปลแบบไหนจะรู้ตัวก่อน? และการแปลแบบไหนจะแปลประโยค 1-3 ให้เพื่อนฟังได้สำเร็จก่อนที่จะพัง?
2. หากต้องนำไปให้เพื่อนห้องอื่นอ่านซ้ำอีกรอบ วิธีไหนจะเร็วกว่ากัน? (Hint: ไฟล์ .exe)`} 
        />

      </main>

    </div>
  );
}