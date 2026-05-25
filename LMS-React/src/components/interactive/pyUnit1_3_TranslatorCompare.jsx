import React, { useState, useEffect, useRef } from 'react';
import { Settings, Zap, ArrowRight, Play, RefreshCcw, CheckCircle2, Terminal, Gamepad2, FileCode2, PackageOpen } from 'lucide-react';

const simCode = [
  { line: 'print("Hello")', result: 'Hello' },
  { line: 'x = 10 + 20', result: 'x → 30' },
  { line: 'print(x)', result: '30' },
  { line: 'print("Done")', result: 'Done' }
];


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

export default function pyUnit1_3_TranslatorCompare() {
  const [activeSim, setActiveSim] = useState(null); // 'interpreter', 'compiler'
  const [simState, setSimState] = useState(0); // 0: idle, 1: running, 2: done
  const [currentLine, setCurrentLine] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
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

  const runInterpreter = () => {
    setActiveSim('interpreter');
    setSimState(1);
    setCurrentLine(-1);
    setLogs([]);
    addLog("Interpreter Mode Started", "info");

    simCode.forEach((cmd, i) => {
      setTimeout(() => {
        setCurrentLine(i);
        addLog(`Translating: ${cmd.line}`, "sys");
        setTimeout(() => {
          addLog(`Output: ${cmd.result}`, "success");
          if (i === simCode.length - 1) {
            setSimState(2);
            setShowQuiz(true);
            addLog("Interpreter execution finished.", "info");
            setCurrentLine(-1);
          }
        }, 500);
      }, i * 1500 + 500);
    });
  };

  const runCompiler = () => {
    setActiveSim('compiler');
    setSimState(1);
    setCurrentLine(-1);
    setLogs([]);
    addLog("Compiler Mode Started", "info");

    // Phase 1: Compile all
    addLog("Phase 1: Compiling entire file...", "sys");
    simCode.forEach((cmd, i) => {
      setTimeout(() => {
        setCurrentLine(i);
      }, i * 300 + 500);
    });

    // Phase 2: Execution
    setTimeout(() => {
      setCurrentLine(-1);
      addLog("Compilation Successful. Executable created.", "success");
      addLog("Phase 2: Executing file...", "sys");
      setTimeout(() => {
        simCode.forEach(cmd => addLog(`Output: ${cmd.result}`, "success"));
        setSimState(2);
        setShowQuiz(true);
        addLog("Compiler execution finished.", "info");
      }, 1000);
    }, simCode.length * 300 + 1000);
  };

  const resetSimulator = () => {
    setActiveSim(null);
    setSimState(0);
    setCurrentLine(-1);
    setLogs([]);
    setShowQuiz(false);
    setQuizAnswers({ q1: null, q2: null });
    setQuizScore(0);
  };

  const handleQuiz = (q, answer) => {
    setQuizAnswers(prev => ({ ...prev, [q]: answer }));
    if ((q === 'q1' && answer === 'interpreter') || (q === 'q2' && answer === 'compiler')) {
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
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Settings className="w-3 h-3" /> Translator Explorer
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
        <h3 className="text-xl font-bold text-slate-900 mb-1">ตัวแปลภาษา (Interpreter vs Compiler)</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          จำลองความแตกต่างของการแปลภาษาแบบ "ทีละบรรทัด" และ "รวบยอดทั้งไฟล์" 
        </p>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col gap-6 border-r border-slate-200 relative">
          
          <div className="flex gap-4">
            <button 
              onClick={runInterpreter}
              disabled={simState === 1}
              className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex flex-col items-center justify-center gap-1 border-2
                ${simState === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 active:scale-95'}
                ${activeSim === 'interpreter' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-transparent text-slate-600 hover:border-orange-200'}`}
            >
              <Settings className={`w-6 h-6 ${activeSim === 'interpreter' && simState === 1 ? 'animate-spin' : ''}`} />
              แบบ Interpreter
            </button>
            <button 
              onClick={runCompiler}
              disabled={simState === 1}
              className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex flex-col items-center justify-center gap-1 border-2
                ${simState === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 active:scale-95'}
                ${activeSim === 'compiler' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-transparent text-slate-600 hover:border-blue-200'}`}
            >
              <Zap className={`w-6 h-6 ${activeSim === 'compiler' && simState === 1 ? 'animate-pulse' : ''}`} />
              แบบ Compiler
            </button>
          </div>

          <div className="flex-1 bg-slate-800 rounded-xl p-4 shadow-inner relative overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
              <FileCode2 className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-600">source_code.py</span>
            </div>
            
            <div className="space-y-2 flex-1">
              {simCode.map((cmd, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm transition-all duration-300
                  ${currentLine === i ? 
                    activeSim === 'interpreter' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50' : 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                  : 'bg-transparent text-slate-400 border border-transparent'}`}
                >
                  <span className="text-slate-600 w-4">{i+1}</span>
                  <span>{cmd.line}</span>
                  {currentLine === i && (
                    <span className="ml-auto flex items-center gap-1">
                      {activeSim === 'interpreter' ? 
                        <Settings className="w-4 h-4 animate-spin text-orange-400" /> : 
                        <Zap className="w-4 h-4 text-blue-400" />
                      }
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Compiler Package Visual */}
            {activeSim === 'compiler' && simState === 2 && (
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
                <PackageOpen className="w-16 h-16 text-blue-400 mb-2" />
                <span className="text-blue-300 font-bold text-sm">program.exe Compiled!</span>
              </div>
            )}
          </div>

        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            {simState === 0 && (
              <div className="text-center text-slate-700 mt-10">
                <ArrowRight className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>เลือกกดปุ่ม <b>Interpreter</b> หรือ <b>Compiler</b><br/>ทางด้านซ้ายเพื่อดูการทำงาน</p>
              </div>
            )}

            {activeSim === 'interpreter' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 mb-6">
                <h4 className="text-xl font-bold text-orange-600 mb-2">ตัวแปลแบบ Interpreter</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  ทำงานแบบ <b>"แปลทีละบรรทัด แล้วทำตามทันที"</b> เหมือนมีล่ามคอยแปลคำพูดให้ฟังทีละประโยค
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-700 block mb-1">จุดเด่น</span>
                    <span className="text-sm text-emerald-600 font-medium">แก้ไขง่าย เห็นผลทันที เหมาะกับการเรียนรู้ (เช่น Python)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-700 block mb-1">จุดด้อย</span>
                    <span className="text-sm text-rose-600 font-medium">ทำงานช้า เพราะต้องแปลใหม่ทุกครั้งที่รัน</span>
                  </div>
                </div>
              </div>
            )}

            {activeSim === 'compiler' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 mb-6">
                <h4 className="text-xl font-bold text-blue-600 mb-2">ตัวแปลแบบ Compiler</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  ทำงานแบบ <b>"แปลทั้งไฟล์ให้เสร็จก่อน"</b> แล้วห่อเป็นไฟล์โปรแกรม (เช่น .exe) ค่อยรันทีเดียว เหมือนแปลหนังสือทั้งเล่มให้เสร็จก่อนตีพิมพ์
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-700 block mb-1">จุดเด่น</span>
                    <span className="text-sm text-emerald-600 font-medium">เมื่อแปลเสร็จแล้ว จะทำงานได้เร็วมาก (เช่น C++, Java)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-700 block mb-1">จุดด้อย</span>
                    <span className="text-sm text-rose-600 font-medium">ต้องรอแปลจนเสร็จ ถ้ามี Error นิดเดียวก็แปลไม่ผ่านเลย</span>
                  </div>
                </div>
              </div>
            )}

            {/* Gamification Area */}
            {showQuiz && (
              <div className="animate-in slide-in-from-bottom-4 duration-500 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm mt-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Gamepad2 className="w-5 h-5 text-indigo-600" /> มินิควิซทดสอบความเข้าใจ
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm text-slate-800 mb-2">1. Python ใช้ตัวแปลภาษาแบบใด?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleQuiz('q1', 'interpreter')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q1 === 'interpreter' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >Interpreter</button>
                      <button 
                        onClick={() => handleQuiz('q1', 'compiler')}
                        disabled={quizAnswers.q1 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q1 === 'compiler' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >Compiler</button>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-sm text-slate-800 mb-2">2. ตัวแปลภาษาใดที่ต้องรอแปลทั้งไฟล์ก่อน จึงจะทำงานได้?</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleQuiz('q2', 'interpreter')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q2 === 'interpreter' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >Interpreter</button>
                      <button 
                        onClick={() => handleQuiz('q2', 'compiler')}
                        disabled={quizAnswers.q2 !== null}
                        className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${quizAnswers.q2 === 'compiler' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                      >Compiler</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {simState === 1 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${simState === 1 ? 'bg-green-500' : 'bg-slate-600'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Live Console</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed flex-1">
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
              {logs.length === 0 && <div className="text-slate-600 italic">Console ready...</div>}
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
