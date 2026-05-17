import React, { useState, useEffect, useRef } from 'react';
import { TextCursorInput, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L5_TkinterEntryDemo() {
  const [inputValue, setInputValue] = useState('');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter Entry widget initialized. Waiting for input...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleGetValue = () => {
    if (!inputValue.trim()) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ val = entry.get()` },
        { type: 'system', text: `  -> Returned empty string.` },
        { type: 'output', text: `ค่าที่กรอก: (ไม่มีข้อมูล - ช่องว่าง)` }
      ]);
      return;
    }
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ val = entry.get()` },
      { type: 'system', text: `  -> get() returned "${inputValue}"` },
      { type: 'output', text: `ค่าที่กรอก: ${inputValue}` }
    ]);
  };

  const clear = () => {
    setInputValue('');
    setConsoleHistory([
      { type: 'system', text: 'Tkinter Entry widget reset. Waiting for input...' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
            <TextCursorInput size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">รับข้อมูลด้วย Entry Widget</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการใช้ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">tk.Entry</code> สำหรับสร้างช่องกรอกข้อความ และใช้เมธอด <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">.get()</code> เพื่อดึงข้อมูลมาใช้งาน
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[260px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-full max-w-sm border border-slate-400">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-xs ml-2 font-mono">Entry Demo</span>
                  </div>
                  <div className="bg-slate-100 p-8 flex flex-col gap-3 min-h-[160px]">
                    <label className="text-slate-700 text-sm font-semibold">กรุณาพิมพ์ข้อมูล:</label>
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500" placeholder="พิมพ์อะไรก็ได้..." />
                    <button onClick={handleGetValue} className="w-full bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2">
                      <Play size={14} fill="currentColor" /> เรียก .get()
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-slate-700"># 1. สร้างช่องกรอก (Entry)</span><br />
              <span className="text-yellow-300">entry</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Entry</span>(<span className="text-yellow-300">root</span>)<br />
              <span className="text-yellow-300">entry</span>.<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">10</span>)<br />
              <br />
              <span className="text-slate-700"># 2. ฟังก์ชันเมื่อกดปุ่ม</span><br />
              <span className="text-pink-400">def</span> <span className="text-blue-300">show_value</span>():<br />
              &nbsp;&nbsp;<span className="text-slate-700"># ดึงข้อมูลด้วย .get()</span><br />
              &nbsp;&nbsp;<span className="text-yellow-300">val</span> = <span className="text-yellow-300">entry</span>.<span className="text-blue-300">get</span>()<br />
              &nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">f"ค่าที่กรอก: {'{'}<span className="text-yellow-300">val</span>{'}'}"</span>)
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-cyan-600 text-sm font-mono mb-1">tk.Entry()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    สร้างกล่องข้อความบรรทัดเดียว (Single-line input) ให้ผู้ใช้สามารถพิมพ์ข้อความหรือตัวเลขลงไปได้
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">entry.get()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้สำหรับดึงค่าปัจจุบันที่อยู่ในกล่อง Entry ออกมา <strong className="text-slate-800">ค่าที่ได้จะเป็น String เสมอ</strong> หากต้องการนำไปคำนวณ ต้องแปลงเป็น int() หรือ float() ก่อน
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Event Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
