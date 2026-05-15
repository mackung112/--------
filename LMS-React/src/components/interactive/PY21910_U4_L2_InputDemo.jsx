import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Keyboard, Play, RotateCcw } from 'lucide-react';

export default function PY21910_U4_L2_InputDemo() {
  const [inputValue, setInputValue] = useState('');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Input Demo Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const handleRun = () => {
    if (inputValue.trim() === '') return;
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `input_value = "${inputValue}"` },
      { type: 'output', text: `คุณพิมพ์: ${inputValue}` }
    ]);
    setInputValue('');
  };

  const clearConsole = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Keyboard size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Input Demo (รับค่า)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          จำลองการรับค่าจากผู้ใช้ด้วย <code className="bg-slate-200 px-1 rounded">input()</code> แล้วแสดงผลที่ Terminal
        </p>
      </div>

      {/* Main */}
      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ใส่ข้อความแล้วกดรัน</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="พิมพ์ข้อความที่นี่…"
              />
              <button
                onClick={handleRun}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1 transition-all"
              >
                <Play size={14} /> รัน
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">อธิบายการทำงาน</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-600 leading-relaxed">
                ใน Python เราใช้ <code className="bg-slate-100 px-1 rounded">input()</code> เพื่อรับค่าจากผู้ใช้ ซึ่งค่าที่ได้จะเป็นสตริงโดยอัตโนมัติ
              </p>
            </div>
            <button
              onClick={clearConsole}
              className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> เคลียร์ Terminal
            </button>
          </div>
        </div>
        {/* Bottom Console */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">python -i</span>
            </div>
            <button onClick={clearConsole} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-300">
                    <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-slate-500">{line.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
