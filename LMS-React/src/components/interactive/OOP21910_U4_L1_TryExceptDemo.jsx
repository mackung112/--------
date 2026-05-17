import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Bug, ShieldCheck, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L1_TryExceptDemo() {
  const [useTryExcept, setUseTryExcept] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Terminal initialized. Ready to execute main.py' },
    { type: 'output', text: 'กรอกตัวเลขเพื่อคำนวณอายุ' },
    { type: 'command', text: '$ Waiting for user input...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runCode = () => {
    if (!inputValue) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: 'Please enter a value before running.' }
      ]);
      return;
    }

    setConsoleHistory(prev => [...prev, { type: 'command', text: `$ User Input: "${inputValue}"` }]);

    setTimeout(() => {
      if (!useTryExcept) {
        // Without error handling
        if (isNaN(inputValue) || inputValue.trim() === '') {
          setConsoleHistory(prev => [
            ...prev, 
            { type: 'system', text: '[FATAL ERROR] Unhandled Exception' },
            { type: 'output', text: `Traceback (most recent call last):\n  File "main.py", line 2, in <module>\n    birth_year = int("${inputValue}")\nValueError: invalid literal for int() with base 10: '${inputValue}'` },
            { type: 'system', text: '❌ โปรแกรมหยุดทำงานกะทันหัน (Crash)!' }
          ]);
        } else {
          const age = 2024 - parseInt(inputValue);
          setConsoleHistory(prev => [
            ...prev, 
            { type: 'output', text: `คุณอายุ ${age} ปี` },
            { type: 'system', text: '✅ โปรแกรมทำงานเสร็จสมบูรณ์ (Exit code 0)' }
          ]);
        }
      } else {
        // With try-except
        try {
          if (isNaN(inputValue) || inputValue.trim() === '') {
            throw new Error('ValueError');
          }
          const age = 2024 - parseInt(inputValue);
          setConsoleHistory(prev => [
            ...prev, 
            { type: 'output', text: `คุณอายุ ${age} ปี` },
            { type: 'system', text: '✅ โปรแกรมทำงานเสร็จสมบูรณ์ (Exit code 0)' }
          ]);
        } catch (error) {
          setConsoleHistory(prev => [
            ...prev, 
            { type: 'system', text: '[HANDLED EXCEPTION] ValueError caught by except block.' },
            { type: 'output', text: '⚠️ ข้อผิดพลาด: กรุณากรอกเฉพาะตัวเลขเท่านั้น!' },
            { type: 'system', text: '✅ โปรแกรมทำงานต่อไปได้ตามปกติ ไม่หยุดทำงาน (Exit code 0)' }
          ]);
        }
      }
    }, 400);
  };

  const clear = () => {
    setInputValue('');
    setConsoleHistory([
      { type: 'system', text: 'Terminal reset. Ready to execute main.py' },
      { type: 'output', text: 'กรอกตัวเลขเพื่อคำนวณอายุ' },
      { type: 'command', text: '$ Waiting for user input...' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <AlertTriangle size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การดักจับข้อผิดพลาด (Try-Except)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการเกิดโปรแกรมพัง (Crash) เมื่อผู้ใช้กรอกข้อมูลผิดประเภท และการป้องกันด้วยการใช้โครงสร้าง <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">try...except</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              <div className="flex gap-4">
                <button onClick={() => setUseTryExcept(false)} className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${!useTryExcept ? 'bg-red-100 text-red-700 border-2 border-red-300 shadow-sm' : 'bg-white text-slate-500 border border-slate-300 hover:bg-slate-100'}`}>
                  <Bug size={16} /> ไม่ดักจับ Error
                </button>
                <button onClick={() => setUseTryExcept(true)} className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${useTryExcept ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 shadow-sm' : 'bg-white text-slate-500 border border-slate-300 hover:bg-slate-100'}`}>
                  <ShieldCheck size={16} /> ใช้ Try-Except
                </button>
              </div>

              {/* Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[200px] flex-1">
                <div className="w-full max-w-sm space-y-4">
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800">โปรแกรมคำนวณอายุ</h4>
                    <p className="text-xs text-slate-700 mt-1">ลองพิมพ์ตัวอักษร เช่น "สิบห้า" หรือ "abc" แทนตัวเลขเพื่อจำลอง Error</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ป้อนปีเกิด (ค.ศ.):</label>
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && runCode()} className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all" placeholder="เช่น 2004..." />
                  </div>
                  
                  <button onClick={runCode} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                    <Play size={16} fill="currentColor" /> รันโปรแกรม (Execute)
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[420px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax) - main.py</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              {!useTryExcept ? (
                <>
                  <span className="text-slate-700"># แบบไม่ดักจับ Error (อาจทำให้โปรแกรมพัง)</span><br />
                  <span className="text-yellow-300">text_input</span> = <span className="text-blue-300">input</span>(<span className="text-green-300">"ป้อนปีเกิด: "</span>)<br />
                  <br />
                  <span className="text-slate-700"># ❌ จุดที่อาจเกิด ValueError หากกรอกตัวอักษร</span><br />
                  <div className="border-l-2 border-red-500 pl-2 -ml-2.5 bg-red-500/10 py-1">
                    <span className="text-yellow-300">birth_year</span> = <span className="text-purple-300">int</span>(<span className="text-yellow-300">text_input</span>)<br />
                    <span className="text-yellow-300">age</span> = <span className="text-orange-300">2024</span> - <span className="text-yellow-300">birth_year</span><br />
                    <span className="text-pink-400">print</span>(<span className="text-green-300">f"คุณอายุ {'{'}<span className="text-yellow-300">age</span>{'}'} ปี"</span>)
                  </div>
                </>
              ) : (
                <>
                  <span className="text-slate-700"># แบบใช้ Try-Except (โปรแกรมทำงานต่อได้)</span><br />
                  <span className="text-yellow-300">text_input</span> = <span className="text-blue-300">input</span>(<span className="text-green-300">"ป้อนปีเกิด: "</span>)<br />
                  <br />
                  <span className="text-purple-400 font-bold">try</span>:<br />
                  &nbsp;&nbsp;<span className="text-slate-700"># โค้ดที่เสี่ยงต่อการ Error ให้อยู่ใน try</span><br />
                  &nbsp;&nbsp;<span className="text-yellow-300">birth_year</span> = <span className="text-purple-300">int</span>(<span className="text-yellow-300">text_input</span>)<br />
                  &nbsp;&nbsp;<span className="text-yellow-300">age</span> = <span className="text-orange-300">2024</span> - <span className="text-yellow-300">birth_year</span><br />
                  &nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">f"คุณอายุ {'{'}<span className="text-yellow-300">age</span>{'}'} ปี"</span>)<br />
                  <span className="text-purple-400 font-bold">except</span> <span className="text-red-400">ValueError</span>:<br />
                  &nbsp;&nbsp;<span className="text-slate-700"># ทำงานเมื่อเกิด ValueError</span><br />
                  &nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">"กรุณากรอกเฉพาะตัวเลขเท่านั้น!"</span>)
                </>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-red-600 text-sm font-mono mb-1">try:</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    บล็อกโค้ดที่เรา "ลองทำ" ซึ่งเป็นส่วนที่มีความเสี่ยงว่าจะเกิด Error (เช่น การแปลง String เป็น Int, การหารด้วยศูนย์)
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">except ErrorType:</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    บล็อกโค้ดที่จะทำงาน "เมื่อเกิดข้อผิดพลาด" ขึ้นในบล็อก try จะช่วยดักจับ Error ทำให้โปรแกรมไม่ปิดตัวลง และสามารถแสดงข้อความแจ้งเตือนที่เข้าใจง่ายแทนได้
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
                {line.type === 'output'  && <div className={line.text.includes('Traceback') || line.text.includes('Error') || line.text.includes('ข้อผิดพลาด') ? 'text-red-400 whitespace-pre-wrap' : 'text-cyan-300 whitespace-pre-wrap'}>{line.text}</div>}
                {line.type === 'system'  && <div className={line.text.includes('FATAL') || line.text.includes('❌') ? 'text-red-500 font-bold bg-red-950/30 inline-block px-1 rounded' : 'text-slate-500 whitespace-pre-wrap'}>{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
