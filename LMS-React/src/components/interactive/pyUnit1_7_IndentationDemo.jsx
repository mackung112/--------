import React, { useState, useEffect, useRef } from 'react';
import { AlignLeft, RefreshCcw, CheckCircle2, Play, AlertTriangle, Info, ShieldCheck, Terminal } from 'lucide-react';

const blocks = [
  { id: 0, text: 'password = "123"', correctIndent: 0, color: 'text-purple-400' },
  { id: 1, text: 'if password == "123":', correctIndent: 0, color: 'text-pink-400' },
  { id: 2, text: 'print("รหัสผ่านถูกต้อง")', correctIndent: 1, color: 'text-emerald-400' },
  { id: 3, text: 'print("ยินดีต้อนรับ!")', correctIndent: 1, color: 'text-emerald-400' },
  { id: 4, text: 'else:', correctIndent: 0, color: 'text-pink-400' },
  { id: 5, text: 'print("รหัสผ่านผิด")', correctIndent: 1, color: 'text-amber-400' },
  { id: 6, text: 'print("จบการทำงาน")', correctIndent: 0, color: 'text-sky-400' },
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

export default function pyUnit1_7_IndentationDemo() {
  const [indents, setIndents] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [simState, setSimState] = useState('idle'); // idle, running, success, error
  const [logs, setLogs] = useState([]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  const handleIndent = (idx, amount) => {
    if (simState === 'running') return;
    const newIndents = [...indents];
    newIndents[idx] = Math.max(0, Math.min(2, newIndents[idx] + amount));
    setIndents(newIndents);
    setSimState('idle');
  };

  const checkError = () => {
    if (indents[2] === 0 || indents[3] === 0 || indents[5] === 0) {
      return "IndentationError: expected an indented block (ลืมย่อหน้าหลัง if/else)";
    }
    if (indents[2] !== indents[3]) {
      return "IndentationError: unindent does not match any outer indentation level (ย่อหน้าไม่ตรงกัน)";
    }
    if (indents[4] !== indents[1]) {
      return "SyntaxError: invalid syntax (else ย่อหน้าไม่ตรงกับ if)";
    }
    if (!indents.every((val, idx) => val === blocks[idx].correctIndent)) {
        return "LogicalError: โค้ดทำงานได้แต่โครงสร้างตรรกะอาจผิดเพี้ยนไปจากที่ควรเป็น";
    }
    return null;
  };

  const handleRun = () => {
    setSimState('running');
    setLogs([]);
    addLog("Executing login.py...", "sys");

    setTimeout(() => {
      const errorMsg = checkError();
      if (errorMsg) {
        setSimState('error');
        addLog(errorMsg, "error");
        addLog("Process terminated with Exit Code 1", "warn");
      } else {
        setSimState('success');
        addLog("รหัสผ่านถูกต้อง", "success");
        addLog("ยินดีต้อนรับ!", "success");
        addLog("จบการทำงาน", "info");
        addLog("Process finished with Exit Code 0", "success");
      }
    }, 800);
  };

  const resetSimulator = () => {
    setIndents([0, 0, 0, 0, 0, 0, 0]);
    setSimState('idle');
    setLogs([]);
  };

  const showSolution = () => {
    setIndents(blocks.map(b => b.correctIndent));
    setSimState('idle');
    setLogs([]);
    addLog("Solution applied. Press Run to test.", "info");
  };

  const isAllCorrect = indents.every((val, idx) => val === blocks[idx].correctIndent);

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
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <AlignLeft className="w-3 h-3" /> Syntax Explorer
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
        <h3 className="text-xl font-bold text-slate-900 mb-1">ความสำคัญของการจัดย่อหน้า (Indentation)</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          ใน Python การย่อหน้าไม่ใช่แค่เพื่อความสวยงาม แต่เป็นการกำหนดขอบเขตคำสั่ง (Block) ลองจัดย่อหน้าโค้ดให้ถูกต้องเพื่อให้โปรแกรมทำงานได้
        </p>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (Code Editor) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col border-r border-slate-200 relative">
          
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-slate-700 flex-1 flex flex-col">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-600 text-xs font-mono">login.py</span>
              </div>
              <button 
                onClick={showSolution}
                className="text-[10px] text-slate-600 hover:text-white underline transition-colors"
              >
                ดูเฉลย
              </button>
            </div>
            
            <div className="p-4 font-mono text-sm leading-relaxed relative flex-1">
              {/* Indentation Guidelines */}
              <div className="absolute top-0 bottom-0 left-[48px] border-l border-slate-700/50"></div>
              <div className="absolute top-0 bottom-0 left-[80px] border-l border-slate-700/50"></div>

              <div className="space-y-1 mt-2">
                {blocks.map((block, idx) => (
                  <div key={idx} className="flex items-center group relative">
                    <span className="w-8 text-slate-600 text-xs select-none text-right pr-3">{idx + 1}</span>
                    
                    {/* Controls (Hidden until hover) */}
                    <div className="absolute left-10 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-[#1e1e1e] px-1 rounded">
                      <button 
                        onClick={() => handleIndent(idx, -1)}
                        disabled={indents[idx] === 0 || simState === 'running'}
                        className="w-5 h-5 rounded bg-slate-700 text-slate-300 hover:bg-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={() => handleIndent(idx, 1)}
                        disabled={indents[idx] === 2 || simState === 'running'}
                        className="w-5 h-5 rounded bg-slate-700 text-slate-300 hover:bg-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                      >
                        ▶
                      </button>
                    </div>
                    
                    <div 
                      className={`py-0.5 px-2 rounded transition-all duration-300 ${block.color} ${
                        simState === 'error' && indents[idx] !== block.correctIndent ? 'bg-red-500/20 border border-red-500/50' : 'border border-transparent'
                      }`}
                      style={{ marginLeft: `${indents[idx] * 32}px` }}
                    >
                      {block.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button 
              onClick={handleRun}
              disabled={simState === 'running'}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-all text-white
                ${simState === 'running' ? 'bg-slate-400 cursor-not-allowed scale-95' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 active:scale-95'}
              `}
            >
              {simState === 'running' ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
              รันทดสอบโค้ด
            </button>
          </div>

        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            
            {simState === 'idle' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-3 text-indigo-700">
                  <Info className="w-6 h-6" />
                  <h4 className="text-lg font-bold">ภารกิจของคุณ</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  นำเมาส์ไปชี้ที่บรรทัดโค้ดทางซ้าย แล้วกดลูกศร ◀ ▶ เพื่อเลื่อนย่อหน้าให้ถูกต้องตามตรรกะ (Logic) ของโปรแกรม
                </p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
                  <h5 className="font-bold text-slate-800 text-sm mb-2">💡 กฎการจัดย่อหน้าใน Python</h5>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li>ใช้การย่อหน้าเพื่อบอกว่าคำสั่งใดอยู่ภายใต้ <b>if</b> หรือ <b>else</b> หรือคำสั่งควบคุมอื่นๆ</li>
                    <li>ต้องใช้ระยะย่อหน้าเท่ากัน (ปกติคือ 4 Space) ใน Block เดียวกัน</li>
                    <li>ถ้าไม่ย่อหน้าเลย คำสั่งนั้นจะทำงานทุกครั้ง ไม่ว่าจะเข้าเงื่อนไขหรือไม่ก็ตาม</li>
                  </ul>
                </div>
              </div>
            )}

            {simState === 'error' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                  <h4 className="text-lg font-bold">โปรแกรมพัง (Crash!)</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-red-50 p-4 rounded-lg border border-red-100 font-medium">
                  Python ตรวจพบการจัดย่อหน้าที่ไม่ถูกต้อง ทำให้ไม่สามารถตีความโครงสร้างโปรแกรมได้ กรุณาแก้ไขแล้วรันใหม่
                </p>
              </div>
            )}

            {simState === 'success' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                  <h4 className="text-lg font-bold">ยอดเยี่ยม! โค้ดทำงานได้สมบูรณ์</h4>
                </div>
                
                {isAllCorrect ? (
                  <p className="text-sm text-emerald-800 leading-relaxed mb-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100 font-medium">
                    คุณจัดย่อหน้าได้ถูกต้อง 100% ทำให้โปรแกรมรู้ว่าบรรทัดไหนควรทำงานเมื่อเงื่อนไขเป็นจริง (if) บรรทัดไหนควรทำงานเมื่อเงื่อนไขเป็นเท็จ (else) และบรรทัดไหนอยู่นอกเงื่อนไข
                  </p>
                ) : (
                  <p className="text-sm text-amber-800 leading-relaxed mb-6 bg-amber-50 p-4 rounded-lg border border-amber-200 font-medium flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    แม้โค้ดจะรันผ่านโดยไม่ Error แต่โครงสร้างยังไม่เหมือนกับต้นฉบับ ลองตรวจสอบดูว่าคำสั่ง "จบการทำงาน" ควรอยู่ข้างใน else หรืออยู่นอกสุด?
                  </p>
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
                {simState === 'running' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${simState === 'running' ? 'bg-green-500' : simState === 'success' ? 'bg-emerald-500' : simState === 'error' ? 'bg-red-500' : 'bg-slate-600'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Terminal Output</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  {log.type === 'error' || log.type === 'sys' || log.type === 'warn' ? (
                    <>
                      <span className="text-slate-700 mr-3 shrink-0">[{log.time}]</span>
                      <span className={`shrink-0 w-10 font-bold ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'warn' ? 'text-amber-400' :
                        log.type === 'sys' ? 'text-blue-400' : 'text-slate-300'
                      }`}>
                        {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : 'SYS'}
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-600 mr-3 shrink-0 w-10 text-right pr-2">&gt;</span>
                  )}
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
              {logs.length === 0 && <div className="text-slate-600 italic">Waiting for execution...</div>}
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
