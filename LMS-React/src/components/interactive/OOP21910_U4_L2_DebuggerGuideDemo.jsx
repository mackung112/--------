import React, { useState, useEffect, useRef } from 'react';
import { Bug, Play, StepForward, RotateCcw, Eye, CircleDot } from 'lucide-react';

export default function OOP21910_U4_L2_DebuggerGuideDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [variables, setVariables] = useState({});
  const [breakpoints, setBreakpoints] = useState(new Set([3, 6]));
  const [isRunning, setIsRunning] = useState(false);
  const [loopStep, setLoopStep] = useState(0);

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Debugger initialized. Set breakpoints and click "Start Debug".' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const codeLines = [
    { code: 'total = 0', action: () => ({ total: 0 }) },
    { code: 'prices = [100, 200, 150]', action: (v) => ({ ...v, prices: '[100, 200, 150]' }) },
    { code: 'for p in prices:', action: (v) => v },
    { code: '    total += p', action: (v, step) => {
      const vals = [100, 200, 150];
      const idx = Math.min(step, 2);
      return { ...v, p: vals[idx], total: (parseInt(v.total) || 0) + vals[idx] };
    }},
    { code: '    print(f"เพิ่ม {p}, รวม = {total}")', action: (v) => v, output: (v) => `เพิ่ม ${v.p}, รวม = ${v.total}` },
    { code: '', action: (v) => v },
    { code: 'print(f"ราคารวม: {total}")', action: (v) => v, output: (v) => `ราคารวม: ${v.total}` },
  ];

  const toggleBreakpoint = (line) => {
    const newBp = new Set(breakpoints);
    if (newBp.has(line)) newBp.delete(line);
    else newBp.add(line);
    setBreakpoints(newBp);
  };

  const stepNext = () => {
    let next = currentLine + 1;
    if (next >= codeLines.length) {
      setIsRunning(false);
      setConsoleHistory(prev => [...prev, { type: 'system', text: 'Debugging session ended. Program exited with code 0.' }]);
      return;
    }
    // Handle loop (jump back to 'for')
    if (next === 5 && loopStep < 2) {
      next = 2; // back to for loop
      setLoopStep(loopStep + 1);
    }
    setCurrentLine(next);
    
    const newVars = codeLines[next].action(variables, loopStep + (next === 3 ? 1 : 0));
    setVariables(newVars);
    
    // Check if there's output
    if (codeLines[next].output) {
      const outText = codeLines[next].output(newVars);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: outText }
      ]);
    }
    
    // If it hit a breakpoint, we could theoretically stop, but this is a manual step-through simulator anyway.
    if (breakpoints.has(next)) {
      setConsoleHistory(prev => [...prev, { type: 'system', text: `[DEBUG] Stopped at breakpoint on line ${next + 1}` }]);
    }
  };

  const startDebug = () => {
    setIsRunning(true); 
    setCurrentLine(0); 
    setVariables(codeLines[0].action({})); 
    setLoopStep(0);
    setConsoleHistory([
      { type: 'system', text: 'Debugger started. Executing line 1...' }
    ]);
  };

  const clear = () => { 
    setIsRunning(false); 
    setCurrentLine(0); 
    setVariables({}); 
    setLoopStep(0); 
    setConsoleHistory([
      { type: 'system', text: 'Debugger reset. Set breakpoints and click "Start Debug".' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Bug size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">จำลองการทำงานของ Debugger</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้วิธีการใช้ <strong>Breakpoint</strong> และ <strong>Step Over</strong> เพื่อตรวจสอบค่าตัวแปรระหว่างที่โปรแกรมทำงานทีละบรรทัด (Step-through)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Code Editor (Debugger View) */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-[#1e1e1e]">
            
            {/* Debug Toolbar */}
            <div className="bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between gap-2">
              <div className="flex gap-2">
                {!isRunning ? (
                  <button onClick={startDebug} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors">
                    <Play size={14} fill="currentColor" /> Start Debug
                  </button>
                ) : (
                  <button onClick={stepNext} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors">
                    <StepForward size={14} fill="currentColor" /> Step Over (F10)
                  </button>
                )}
                <button onClick={clear} className="bg-transparent hover:bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors">
                  <RotateCcw size={14} /> Stop
                </button>
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold hidden sm:block">main.py</div>
            </div>

            {/* Code Lines */}
            <div className="p-4 font-mono text-[13px] flex-1">
              {codeLines.map((line, i) => (
                <div key={i} className={`flex items-center gap-3 py-1 px-2 rounded-sm transition-colors group ${isRunning && currentLine === i ? 'bg-yellow-500/20 border-l-[3px] border-yellow-500 -ml-[3px]' : 'border-l-[3px] border-transparent -ml-[3px] hover:bg-slate-800'}`}>
                  {/* Breakpoint gutter */}
                  <div className="w-5 flex-shrink-0 flex items-center justify-center cursor-pointer" onClick={() => toggleBreakpoint(i)}>
                    {breakpoints.has(i) ? (
                      <CircleDot size={12} className="text-red-500 fill-red-500" />
                    ) : (
                      <CircleDot size={12} className="text-slate-600 opacity-0 group-hover:opacity-50" />
                    )}
                  </div>
                  {/* Line Number */}
                  <div className="w-4 text-right text-slate-600 select-none text-xs">{i + 1}</div>
                  {/* Code */}
                  <div className={`whitespace-pre ${isRunning && currentLine === i ? 'text-white font-bold' : 'text-slate-300'}`}>
                    {line.code || '\u00A0'}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Info & Variables */}
          <div className="w-full lg:w-[380px] bg-slate-50 p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex items-center gap-2">
              <Eye size={16} /> Variables Watch
            </h4>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 mb-6 overflow-y-auto min-h-[200px]">
              {Object.keys(variables).length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm p-6 text-center">
                  <Eye size={32} className="mb-2 opacity-20" />
                  <p>กดปุ่ม <strong>Start Debug</strong> เพื่อเริ่มดูค่าตัวแปรในหน่วยความจำ</p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  <div className="grid grid-cols-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-100">
                    <div>Name</div>
                    <div>Value</div>
                  </div>
                  {Object.entries(variables).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-2 bg-slate-50 border border-slate-100 rounded px-2 py-2 text-sm font-mono items-center hover:bg-slate-100 transition-colors">
                      <div className="text-indigo-600 font-bold truncate pr-2">{key}</div>
                      <div className="text-emerald-700 truncate">{String(val)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
              <div className="space-y-3">
                <div>
                  <h5 className="font-bold text-orange-700 text-sm flex items-center gap-1.5"><CircleDot size={14} className="text-red-500 fill-red-500" /> Breakpoint</h5>
                  <p className="text-xs text-orange-800/80 leading-relaxed mt-1">
                    จุดหยุดการทำงานชั่วคราว ให้เราคลิกที่หน้าบรรทัดเพื่อวางจุดแดง เมื่อโปรแกรมรันมาถึงบรรทัดนี้ มันจะหยุดรอเราทันที
                  </p>
                </div>
                <div className="pt-2 border-t border-orange-200/50">
                  <h5 className="font-bold text-sky-700 text-sm flex items-center gap-1.5"><StepForward size={14} className="text-sky-600" /> Step Over</h5>
                  <p className="text-xs text-orange-800/80 leading-relaxed mt-1">
                    สั่งให้โปรแกรมทำงานต่อไปทีละ 1 บรรทัด (มักใช้คีย์ลัด F10 ใน VS Code) มีประโยชน์มากในการดูว่าลูป (Loop) ทำงานถูกต้องไหม และตัวแปรเปลี่ยนค่าอย่างไร
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">DEBUG CONSOLE</span>
              <span className="text-slate-500 text-xs">Standard Output</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
