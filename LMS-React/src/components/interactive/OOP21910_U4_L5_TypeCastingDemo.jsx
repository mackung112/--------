import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightLeft, ArrowRight, RotateCcw, Play } from 'lucide-react';

export default function OOP21910_U4_L5_TypeCastingDemo() {
  const [inputVal, setInputVal] = useState('42');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Type Casting Demo initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const getCastResults = (val) => {
    const results = [];
    results.push({ func: 'str()', result: `"${val}"`, type: 'str', success: true });
    
    const intVal = parseInt(val); 
    const isInt = !isNaN(intVal) && String(intVal) === val.trim() && val.trim() !== '';
    results.push({ func: 'int()', result: isInt ? String(intVal) : 'ValueError', type: 'int', success: isInt });
    
    const floatVal = parseFloat(val); 
    const isFloat = !isNaN(floatVal) && val.trim() !== '';
    results.push({ func: 'float()', result: isFloat ? String(floatVal) : 'ValueError', type: 'float', success: isFloat });
    
    const boolVal = val.trim() !== '' && val.trim() !== '0' && val.trim().toLowerCase() !== 'false';
    results.push({ func: 'bool()', result: String(boolVal), type: 'bool', success: true });
    
    return results;
  };

  const results = getCastResults(inputVal);

  const testCasting = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ val = "${inputVal}"` }
    ]);

    results.forEach(r => {
      if (r.success) {
        setConsoleHistory(prev => [...prev, { type: 'system', text: `  ${r.func} -> ${r.result} (<class '${r.type}'>)` }]);
      } else {
        setConsoleHistory(prev => [...prev, { type: 'error', text: `  ${r.func} -> ValueError: invalid literal for ${r.func}` }]);
      }
    });
  };

  const clear = () => {
    setInputVal('42');
    setConsoleHistory([
      { type: 'system', text: 'Type Casting Demo reset.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <ArrowRightLeft size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การแปลงชนิดข้อมูล (Type Casting)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          ทดลองป้อนค่าต่างๆ แล้วดูผลลัพธ์เมื่อใช้ฟังก์ชันแปลงข้อมูล เช่น <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">int()</code>, <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">float()</code>, <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">str()</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Input & Execution */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              
              <div className="text-center w-full max-w-xs mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ค่าเริ่มต้น (ชนิด String)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-mono text-xl">"</span>
                  </div>
                  <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && testCasting()}
                    className="text-center text-2xl font-mono border-2 border-violet-300 rounded-xl px-8 py-4 w-full outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-inner bg-slate-50" placeholder="ป้อนข้อความ..." />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-mono text-xl">"</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-violet-50 border border-violet-100 rounded-lg p-3 text-xs text-violet-700 leading-relaxed text-left">
                  💡 ลองป้อนค่าเหล่านี้ดูสิ: <br/>
                  <code className="bg-white px-1.5 py-0.5 rounded font-bold mt-1 inline-block border border-violet-200">3.14</code> (ทศนิยม)<br/>
                  <code className="bg-white px-1.5 py-0.5 rounded font-bold mt-1 inline-block border border-violet-200">hello</code> (ตัวอักษร)<br/>
                  <code className="bg-white px-1.5 py-0.5 rounded font-bold mt-1 inline-block border border-violet-200">0</code> หรือเว้นว่าง
                </div>
              </div>

              <div className="flex gap-3 w-full max-w-xs">
                <button onClick={testCasting} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Play size={16} fill="currentColor" /> ทดสอบแปลงค่า
                </button>
                <button onClick={clear} className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-3 rounded-xl font-bold transition-all flex items-center justify-center">
                  <RotateCcw size={16} />
                </button>
              </div>

            </div>
          </div>

          {/* Right: Results Dashboard */}
          <div className="w-full lg:w-[450px] bg-slate-100 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 text-center">ผลลัพธ์การแปลงค่า</h4>
            
            <div className="grid grid-cols-1 gap-3 flex-1">
              {results.map(r => (
                <div key={r.func} className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between bg-white shadow-sm ${r.success ? 'border-slate-200 hover:border-violet-300' : 'border-red-300 bg-red-50/50'}`}>
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg font-mono text-sm font-bold ${r.success ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'}`}>
                      {r.func}
                    </div>
                    <ArrowRight size={16} className={r.success ? 'text-slate-400' : 'text-red-400'} />
                    <div className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${r.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {r.type}
                    </div>
                  </div>

                  <div className={`font-mono font-bold text-right ${r.success ? 'text-slate-800 text-lg' : 'text-red-600 text-sm'}`}>
                    {r.result}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Casting Output</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'error'  && <div className="text-red-400 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-400 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
