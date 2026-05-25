import React, { useState, useEffect, useRef } from 'react';
import { Code2, Monitor, Cpu, ArrowDown, Play, RefreshCcw, CheckCircle2, Terminal, AlertTriangle, Gamepad2 } from 'lucide-react';


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function pyUnit1_2_LanguageLevels() {
  const [activeLevel, setActiveLevel] = useState(null);
  const [pipelineState, setPipelineState] = useState(0); // 0: input, 1: high, 2: assembly, 3: machine, 4: quiz
  const [logs, setLogs] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null });

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  const startTranslation = () => {
    setPipelineState(1);
    setActiveLevel('high');
    setLogs([]);
    addLog("Input received: print('Hello')", "info");
    setTimeout(() => {
      setPipelineState(2);
      setActiveLevel('assembly');
      addLog("Compiler: Translating High-level to Assembly...", "sys");
      addLog("Generated: MOV AH, 09h...", "success");
    }, 1500);

    setTimeout(() => {
      setPipelineState(3);
      setActiveLevel('machine');
      addLog("Assembler: Translating Assembly to Machine Code...", "sys");
      addLog("Generated: 01100010 11010001...", "success");
      addLog("CPU: Executing binary instructions.", "warn");
    }, 3000);
  };

  const resetSimulator = () => {
    setPipelineState(0);
    setActiveLevel(null);
    setLogs([]);
    setQuizScore(0);
    setQuizAnswers({ q1: null, q2: null });
  };

  const handleQuiz = (q, answer) => {
    setQuizAnswers(prev => ({ ...prev, [q]: answer }));
    if ((q === 'q1' && answer === 'machine') || (q === 'q2' && answer === 'high')) {
      setQuizScore(s => s + 1);
      addLog(`Quiz: Correct!`, "success");
    } else {
      addLog(`Quiz: Incorrect answer.`, "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* 1. Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Code2 className="w-3 h-3" /> Language Explorer
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
              Simulator
            </span>
          </div>
          <button 
            onClick={resetSimulator}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> เริ่มใหม่
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">ระดับของภาษาคอมพิวเตอร์</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          จำลองกระบวนการแปลภาษาจากภาษาระดับสูง (ที่มนุษย์เข้าใจ) ลงไปสู่ภาษาเครื่อง (ที่ CPU เข้าใจ)
        </p>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (The Pipeline) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col items-center justify-center gap-2 border-r border-slate-200 relative">
          
          {pipelineState === 0 && (
            <button 
              onClick={startTranslation}
              className="absolute z-20 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" /> เริ่มจำลองการแปลภาษา
            </button>
          )}

          {/* High-Level Language */}
          <div 
            onClick={() => setActiveLevel('high')}
            className={`w-full max-w-sm rounded-xl border-2 transition-all duration-300 cursor-pointer p-4 relative z-10 flex flex-col
            ${activeLevel === 'high' ? 'bg-emerald-50 border-emerald-500 shadow-md scale-105' : 
              pipelineState >= 1 ? 'bg-white border-slate-300 opacity-80 scale-100 hover:border-emerald-300' : 'bg-transparent border-dashed border-slate-300 opacity-40'}`}
          >
            <div className="flex items-center gap-3 text-emerald-700 font-bold mb-2">
              <Code2 className="w-6 h-6" /> ภาษาระดับสูง (High-Level)
            </div>
            <div className="bg-slate-900 rounded p-2 text-emerald-400 font-mono text-sm">
              print("Hello World")
            </div>
          </div>

          <ArrowDown className={`w-6 h-6 transition-all duration-500 ${pipelineState >= 2 ? 'text-indigo-500' : 'text-slate-300'}`} />

          {/* Assembly Language */}
          <div 
            onClick={() => setActiveLevel('assembly')}
            className={`w-full max-w-sm rounded-xl border-2 transition-all duration-300 cursor-pointer p-4 relative z-10 flex flex-col
            ${activeLevel === 'assembly' ? 'bg-amber-50 border-amber-500 shadow-md scale-105' : 
              pipelineState >= 2 ? 'bg-white border-slate-300 opacity-80 scale-100 hover:border-amber-300' : 'bg-transparent border-dashed border-slate-300 opacity-40'}`}
          >
            <div className="flex items-center gap-3 text-amber-700 font-bold mb-2">
              <Monitor className="w-6 h-6" /> ภาษาแอสแซมบลี (Assembly)
            </div>
            <div className="bg-slate-900 rounded p-2 text-amber-400 font-mono text-sm leading-tight">
              MOV AH, 09h<br/>
              LEA DX, msg<br/>
              INT 21h
            </div>
          </div>

          <ArrowDown className={`w-6 h-6 transition-all duration-500 ${pipelineState >= 3 ? 'text-indigo-500' : 'text-slate-300'}`} />

          {/* Machine Language */}
          <div 
            onClick={() => setActiveLevel('machine')}
            className={`w-full max-w-sm rounded-xl border-2 transition-all duration-300 cursor-pointer p-4 relative z-10 flex flex-col
            ${activeLevel === 'machine' ? 'bg-red-50 border-red-500 shadow-md scale-105' : 
              pipelineState >= 3 ? 'bg-white border-slate-300 opacity-80 scale-100 hover:border-red-300' : 'bg-transparent border-dashed border-slate-300 opacity-40'}`}
          >
            <div className="flex items-center gap-3 text-red-700 font-bold mb-2">
              <Cpu className="w-6 h-6" /> ภาษาเครื่อง (Machine)
            </div>
            <div className="bg-slate-900 rounded p-2 text-red-400 font-mono text-xs break-all leading-tight">
              10110100 00001001 10001101 00010110<br/>
              00000000 00000000 11001101 00100001
            </div>
          </div>

          {pipelineState >= 3 && (
            <button 
              onClick={() => setPipelineState(4)}
              className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md font-bold text-sm hover:bg-indigo-200 transition-colors"
            >
              ทดสอบความเข้าใจ
            </button>
          )}
        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            {pipelineState === 0 && (
              <div className="text-center text-slate-700 mt-10">
                <Terminal className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>กดปุ่ม <b>"เริ่มจำลองการแปลภาษา"</b> ทางด้านซ้าย<br/>เพื่อดูกระบวนการทำงาน</p>
              </div>
            )}

            {activeLevel === 'high' && pipelineState > 0 && pipelineState < 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-xl font-bold text-emerald-700 mb-2">ภาษาระดับสูง (High-Level Language)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  ออกแบบมาให้คล้ายภาษาอังกฤษ เพื่อให้มนุษย์สามารถอ่าน เขียน และบำรุงรักษาโค้ดได้ง่าย เช่น Python, Java, C++
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความง่ายในการเขียน</span>
                    <span className="font-bold text-emerald-600">ง่ายมาก</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความเร็วในการทำงาน</span>
                    <span className="font-bold text-amber-600">ช้า (ต้องผ่านตัวแปล)</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>เป็นภาษาที่โปรแกรมเมอร์ใช้เขียนโปรแกรมในปัจจุบัน</span>
                </div>
              </div>
            )}

            {activeLevel === 'assembly' && pipelineState > 0 && pipelineState < 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-xl font-bold text-amber-700 mb-2">ภาษาแอสแซมบลี (Assembly Language)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  ภาษาระดับต่ำที่ใช้ตัวอักษรย่อ (Mnemonic) แทนเลขฐานสอง เพื่อให้มนุษย์อ่านง่ายกว่าภาษาเครื่องเล็กน้อย ต้องใช้โปรแกรม Assembler แปลงเป็นภาษาเครื่องอีกที
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความง่ายในการเขียน</span>
                    <span className="font-bold text-red-500">ยาก</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความเร็วในการทำงาน</span>
                    <span className="font-bold text-emerald-600">เร็วมาก</span>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>มักใช้ในการควบคุมฮาร์ดแวร์โดยตรง หรือสร้างไดร์เวอร์</span>
                </div>
              </div>
            )}

            {activeLevel === 'machine' && pipelineState > 0 && pipelineState < 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-xl font-bold text-red-700 mb-2">ภาษาเครื่อง (Machine Language)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  เป็นภาษาเดียวที่ CPU เข้าใจโดยตรง ประกอบด้วยเลขฐานสอง (0 และ 1) เท่านั้น ทำงานได้เร็วที่สุดแต่มนุษย์อ่านไม่รู้เรื่องเลย
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความง่ายในการเขียน</span>
                    <span className="font-bold text-red-700">ยากที่สุด</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <span className="text-xs text-slate-700 block">ความเร็วในการทำงาน</span>
                    <span className="font-bold text-emerald-600">เร็วที่สุด</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-2">
                  <Cpu className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>CPU ทุกตัวประมวลผลคำสั่งที่เป็นเลข 0 และ 1 เท่านั้น ไม่ว่าเราจะเขียนด้วยภาษาอะไรก็ตาม</span>
                </div>
              </div>
            )}

            {/* Gamification Area */}
            {pipelineState === 4 && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Gamepad2 className="w-5 h-5 text-indigo-600" /> มินิควิซจับคู่ความรู้
                </h4>
                
                <div className="space-y-6">
                  {/* Q1 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="font-medium text-sm text-slate-800 mb-3">1. ภาษาใดทำงานได้เร็วที่สุด และ CPU เข้าใจได้ทันที?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleQuiz('q1', 'high')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q1 === 'high' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาระดับสูง</button>
                      <button 
                        onClick={() => handleQuiz('q1', 'assembly')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q1 === 'assembly' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาแอสแซมบลี</button>
                      <button 
                        onClick={() => handleQuiz('q1', 'machine')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q1 === 'machine' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาเครื่อง</button>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="font-medium text-sm text-slate-800 mb-3">2. Python จัดเป็นภาษาในระดับใด?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleQuiz('q2', 'high')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q2 === 'high' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาระดับสูง</button>
                      <button 
                        onClick={() => handleQuiz('q2', 'assembly')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q2 === 'assembly' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาแอสแซมบลี</button>
                      <button 
                        onClick={() => handleQuiz('q2', 'machine')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q2 === 'machine' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >ภาษาเครื่อง</button>
                    </div>
                  </div>
                </div>

                {quizAnswers.q1 !== null && quizAnswers.q2 !== null && (
                  <div className="mt-4 text-center font-bold text-indigo-700 bg-indigo-50 py-3 rounded-lg border border-indigo-200">
                    คะแนนรวม: {quizScore} / 2
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {pipelineState > 0 && pipelineState < 4 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${pipelineState > 0 && pipelineState < 4 ? 'bg-green-500' : 'bg-slate-600'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Compilation Log</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-700 mr-3 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 w-10 font-bold ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'sys' ? 'text-blue-400' : 'text-slate-300'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={`flex-1 ${
                    log.type === 'error' ? 'text-red-300' :
                    log.type === 'warn' ? 'text-amber-300' :
                    log.type === 'success' ? 'text-emerald-300' :
                    log.type === 'sys' ? 'text-blue-200' : 'text-slate-300'
                  }`}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-slate-600 italic">Waiting for input...</div>}
            </div>
          </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
