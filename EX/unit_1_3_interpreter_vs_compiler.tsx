import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCode2, 
  Zap, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb,
  Settings,
  Play,
  Bug,
  FileBox,
  Check,
  X,
  AlertOctagon,
  Clock,
  Terminal
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
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-violet-100 rounded-2xl text-violet-600 border border-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            aria-label="คัดลอกโจทย์กิจกรรม"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-violet-100 text-violet-600 border border-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
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

const ExecutionSimulator = () => {
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
    setLogs(['[System] เริ่มการคอมไพล์โค้ดทั้งหมด...']);
    setActiveLine(-1);
    
    await sleep(1500); // Simulate compile time

    if (hasError) {
      setStatus('error');
      setActiveLine(3);
      setLogs(prev => [...prev, '[Compiler Error] บรรทัดที่ 4: พบข้อผิดพลาดร้ายแรง', '❌ ไม่สามารถสร้างไฟล์ .exe ได้!']);
    } else {
      setStatus('ready');
      setLogs(prev => [...prev, '[System] คอมไพล์สำเร็จ! ได้ไฟล์ program.exe', '✅ พร้อมทำงาน']);
    }
  };

  const runCompiledProgram = async () => {
    setStatus('running');
    setLogs(['[System] รันไฟล์ program.exe...']);
    await sleep(500);
    
    // Executes everything instantly
    const outputs = codeLines.filter(line => line.output).map(line => line.output);
    setLogs(prev => [...prev, ...outputs, '✅ โปรแกรมทำงานจบสมบูรณ์']);
    setStatus('done');
  };

  const runInterpreter = async () => {
    setStatus('running');
    setLogs(['[System] เริ่มอ่านและรันโค้ดทีละบรรทัด...']);
    
    for (let i = 0; i < codeLines.length; i++) {
      setActiveLine(i);
      await sleep(800); // Simulate line-by-line speed

      if (codeLines[i].type === 'error') {
        setStatus('error');
        setLogs(prev => [...prev, `❌ [Runtime Error] บรรทัดที่ ${i + 1}: ${codeLines[i].output}`]);
        return; // Halt execution
      }

      if (codeLines[i].output) {
        setLogs(prev => [...prev, codeLines[i].output]);
      }
    }
    
    setStatus('done');
    setActiveLine(-1);
    setLogs(prev => [...prev, '✅ โปรแกรมทำงานจบสมบูรณ์']);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-40 transition-colors duration-1000 ${mode === 'compiler' ? 'bg-violet-400' : 'bg-orange-400'}`}></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Settings className="w-6 h-6 text-slate-700 animate-[spin_4s_linear_infinite]" />
          เครื่องจำลองตัวแปลภาษา (Execution Simulator)
        </h3>
        <p className="text-slate-500 mt-2">ทดสอบเปรียบเทียบการทำงานระหว่าง Compiler และ Interpreter โดยเฉพาะเมื่อ <strong>"มีโค้ดที่เขียนผิด"</strong></p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Controls & Code Panel */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          
          <div className="flex justify-between items-center bg-slate-100 p-2 rounded-2xl border border-slate-200">
             <div className="flex gap-2">
               <button 
                 onClick={() => setMode('compiler')}
                 className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'compiler' ? 'bg-white shadow-sm text-violet-600 border border-violet-100' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <FileCode2 className="w-4 h-4" /> Compiler
               </button>
               <button 
                 onClick={() => setMode('interpreter')}
                 className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'interpreter' ? 'bg-white shadow-sm text-orange-600 border border-orange-100' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Zap className="w-4 h-4" /> Interpreter
               </button>
             </div>
             
             <button
               onClick={() => setHasError(!hasError)}
               className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${hasError ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
             >
               <Bug className="w-3 h-3" /> {hasError ? 'ซ่อน Bug' : 'ใส่ Bug ลงไป'}
             </button>
          </div>

          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-800 flex flex-col h-full">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-mono text-sm">script.py</span>
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              {codeLines.map((line, idx) => (
                <div key={idx} className={`px-2 py-1.5 rounded-md transition-colors duration-300 flex items-center ${activeLine === idx ? (line.type === 'error' && status === 'error' ? 'bg-rose-500/20 border-l-2 border-rose-500' : 'bg-slate-700/50 border-l-2 border-emerald-400') : 'border-l-2 border-transparent'}`}>
                  <span className="text-slate-600 w-6 inline-block select-none">{idx + 1}</span>
                  <span className={line.type === 'error' ? 'text-rose-400 font-bold' : 'text-slate-300'}>{line.text}</span>
                  {line.type === 'error' && <Bug className="w-3.5 h-3.5 text-rose-500 ml-auto animate-pulse" />}
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950 mt-auto flex justify-center gap-3">
               {mode === 'compiler' ? (
                 <>
                   <button onClick={runCompiler} disabled={status !== 'idle' && status !== 'error'} className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-violet-900/50 flex items-center gap-2">
                     <Settings className={`w-4 h-4 ${status === 'processing' ? 'animate-spin' : ''}`} /> 1. คอมไพล์ (Compile)
                   </button>
                   <button onClick={runCompiledProgram} disabled={status !== 'ready'} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-emerald-900/50 flex items-center gap-2">
                     <Play className="w-4 h-4" /> 2. รัน (Run EXE)
                   </button>
                 </>
               ) : (
                 <button onClick={runInterpreter} disabled={status === 'running' || status === 'done' || status === 'error'} className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white px-8 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-orange-900/50 flex items-center gap-2">
                   <Play className={`w-4 h-4 ${status === 'running' ? 'animate-pulse' : ''}`} /> รันโปรแกรม (Run)
                 </button>
               )}
               {(status === 'done' || status === 'error' || status === 'ready') && (
                  <button onClick={resetSim} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    รีเซ็ต
                  </button>
               )}
            </div>
          </div>
        </div>

        {/* Output Console */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-black rounded-2xl p-6 shadow-inner border-2 border-slate-800 h-full flex flex-col font-mono relative group">
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none rounded-2xl"></div>
             <div className="text-slate-500 text-xs mb-4 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-2">
               <Terminal className="w-4 h-4" /> Terminal Output
             </div>
             
             <div className="flex-grow space-y-2 text-sm overflow-y-auto">
                {logs.length === 0 && <div className="text-slate-600 italic">รอการทำงาน...</div>}
                {logs.map((log, idx) => (
                  <div key={idx} className={`
                    ${log.includes('Error') || log.includes('❌') ? 'text-rose-400' : ''}
                    ${log.includes('System') || log.includes('✅') ? 'text-blue-400' : ''}
                    ${!log.includes('[') && !log.includes('❌') && !log.includes('✅') ? 'text-emerald-400' : ''}
                  `}>
                    {log}
                  </div>
                ))}
             </div>
             
             {/* File Indicator for Compiler */}
             {mode === 'compiler' && status === 'ready' && (
                <div className="mt-4 p-3 bg-violet-900/30 border border-violet-500/50 rounded-xl flex items-center gap-3 animate-pulse">
                  <FileBox className="w-8 h-8 text-violet-400" />
                  <div>
                    <div className="text-violet-300 font-bold text-sm">program.exe</div>
                    <div className="text-violet-500 text-xs">ไฟล์พร้อมใช้งานแล้ว</div>
                  </div>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรม Unplugged: "นักแปลหนังสือ vs ล่ามแปลสด"

คำชี้แจง: แบ่งกลุ่มนักเรียนและให้แต่ละกลุ่มทดลองสวมบทบาทการทำงาน 2 แบบ:
บทบาทที่ 1 (Compiler): ให้กระดาษที่มีข้อความภาษาอังกฤษ 5 ประโยค. นักเรียนต้อง "แปลให้เสร็จทั้งหน้า" ก่อน จึงจะส่งกระดาษที่แปลเสร็จแล้วไปให้เพื่อนอีกคนอ่านได้ทีเดียว
บทบาทที่ 2 (Interpreter): ให้กระดาษข้อความเดิม. นักเรียนต้อง "อ่านภาษาอังกฤษ 1 ประโยค แล้วพูดแปลเป็นไทยทันที" ทีละประโยคให้เพื่อนฟัง

คำถามชวนคิด:
1. หากประโยคที่ 4 มีคำศัพท์ที่เขียนผิด (Syntax Error) การแปลแบบไหนจะรู้ตัวก่อน? และการแปลแบบไหนจะแปลประโยค 1-3 ให้เพื่อนฟังได้สำเร็จก่อนที่จะพัง?
2. หากต้องนำไปให้เพื่อนห้องอื่นอ่านซ้ำอีกรอบ วิธีไหนจะเร็วกว่ากัน? (Hint: ไฟล์ .exe)`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-violet-200 selection:text-violet-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-24 pb-16 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 bg-white/70 backdrop-blur-md shadow-sm mb-6">
            <Settings className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-bold tracking-widest text-violet-700 uppercase">Unit 1.3 | หลักการเขียนโปรแกรมเบื้องต้น</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-slate-800 tracking-tight">
            ตัวแปลภาษา: <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-orange-500">Compiler vs Interpreter</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium leading-relaxed border-l-4 border-violet-500 pl-6 mt-4">
            เราทราบแล้วว่าภาษาระดับสูงต้องถูก <strong>"แปล"</strong> เป็นภาษาเครื่องก่อน แต่รู้หรือไม่ว่าวิธีการแปลนั้นมี 2 แบบหลักๆ ซึ่งมีข้อดีและข้อเสียต่างกันอย่างสิ้นเชิง!
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* COMPILER */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border-2 border-violet-100 shadow-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-100 rounded-full blur-2xl group-hover:bg-violet-200 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <FileCode2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Compiler</h3>
                  <p className="text-sm font-bold text-violet-500 uppercase tracking-widest">คอมไพเลอร์</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                เปรียบเหมือน <strong>"นักแปลหนังสือ"</strong> ที่จะแปลโค้ดทั้งไฟล์ให้เสร็จสมบูรณ์รวดเดียว หากพบข้อผิดพลาด (Error) แม้แต่จุดเดียว จะตีกลับและไม่แปลให้เลย เมื่อแปลสำเร็จจะได้ไฟล์ใหม่ที่พร้อมใช้งาน (เช่น .exe)
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <Clock className="w-5 h-5 text-violet-500 shrink-0" />
                  <span className="text-sm text-slate-700"><strong>รันได้เร็วมาก:</strong> เพราะแปลเสร็จหมดแล้ว แค่เปิดไฟล์ก็ทำงานได้ทันที</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <FileBox className="w-5 h-5 text-violet-500 shrink-0" />
                  <span className="text-sm text-slate-700"><strong>แชร์ง่าย:</strong> ส่งแค่ไฟล์ที่คอมไพล์แล้ว (.exe) ให้คนอื่นรันได้เลย โดยที่เขาไม่ต้องมีโค้ดต้นฉบับ</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">ตัวอย่างภาษาที่ใช้</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-violet-700">C</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-violet-700">C++</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-violet-700">Go</span>
                </div>
              </div>
            </div>
          </div>

          {/* INTERPRETER */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border-2 border-orange-100 shadow-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-orange-100 rounded-full blur-2xl group-hover:bg-orange-200 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Interpreter</h3>
                  <p className="text-sm font-bold text-orange-500 uppercase tracking-widest">อินเทอร์พรีเตอร์</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                เปรียบเหมือน <strong>"ล่ามแปลสด"</strong> ที่จะแปลและรันโค้ดไปทีละบรรทัด หากโปรแกรมมี 10 บรรทัดและมีบรรทัดที่ 5 ผิด โปรแกรมจะยังคงทำงานบรรทัด 1-4 ได้สำเร็จ ก่อนที่จะแจ้ง Error แล้วหยุดทำงาน
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <Bug className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm text-slate-700"><strong>หาบั๊กง่าย:</strong> หยุดทำงานและแจ้งเตือนทันทีที่บรรทัดนั้นมีปัญหา ทำให้รู้จุดแก้ทันที</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <AlertOctagon className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm text-slate-700"><strong>ช้ากว่าเล็กน้อย:</strong> เพราะต้องเสียเวลาแปลใหม่ทุกครั้งที่กดรัน และไม่มีการสร้างไฟล์ .exe ออกมา</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">ตัวอย่างภาษาที่ใช้</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-orange-700">Python</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-orange-700">JavaScript</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-orange-700">PHP</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Simulator */}
        <ExecutionSimulator />

        {/* Summary Quick Look */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" /> ตารางสรุปแบบรวบรัด
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left bg-white border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="p-4 font-bold">คุณสมบัติ</th>
                  <th className="p-4 font-bold text-violet-600">Compiler</th>
                  <th className="p-4 font-bold text-orange-600">Interpreter</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">รูปแบบการแปล</td>
                  <td className="p-4">แปลรวดเดียวทั้งโปรแกรม</td>
                  <td className="p-4">แปลทีละบรรทัด พร้อมรันทันที</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">การแจ้งเตือน Error</td>
                  <td className="p-4">แจ้งทั้งหมดรวดเดียวก่อนเริ่มทำงาน</td>
                  <td className="p-4">ทำงานไปก่อน เจอ Error ตรงไหนค่อยหยุดและแจ้ง</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">ไฟล์ที่ได้</td>
                  <td className="p-4 font-mono text-violet-500 font-bold">ได้ไฟล์ Executable (เช่น .exe)</td>
                  <td className="p-4 font-mono text-orange-500 font-bold">ไม่ได้ไฟล์ใหม่ (อ่านจาก Source Code ตลอด)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">ความเร็วในการทำงาน (รัน)</td>
                  <td className="p-4 text-emerald-600 font-bold">รวดเร็วมาก</td>
                  <td className="p-4 text-amber-600 font-bold">ช้ากว่า (เพราะต้องแปลสดทุกรอบ)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask 
          title="กิจกรรม: นักแปลหนังสือ vs ล่ามแปลสด" 
          taskText={teacherTaskContent} 
        />
        
        {/* Next Lesson Hint */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-2">เข้าใจกลไกการแปลภาษาแล้วใช่ไหม?</p>
          <p className="text-lg font-medium text-slate-700">
            หัวข้อถัดไป: ลองพิมพ์ <strong className="text-blue-600 cursor-pointer hover:underline">[1.4 จุดเด่นของภาษา Python]</strong> เพื่อทำความรู้จักภาษาพระเอกของเราในวิชานี้!
          </p>
        </div>

      </main>
    </div>
  );
}