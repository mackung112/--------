import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Type, Play, RotateCcw } from 'lucide-react';

export default function PY21910_U3_L5_StringExplorer() {
  const [text, setText] = useState('สวัสดี Python');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python String Explorer Ready.' },
    { type: 'command', text: 'text = "สวัสดี Python"' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const updateText = (newText) => {
    setText(newText);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `text = "${newText}"` }
    ]);
  };

  const methods = [
    { label: 'len(text)', result: text.length, desc: 'นับจำนวนตัวอักษรทั้งหมด' },
    { label: 'text.upper()', result: `'${text.toUpperCase()}'`, desc: 'เปลี่ยนเป็นตัวพิมพ์ใหญ่' },
    { label: 'text.lower()', result: `'${text.toLowerCase()}'`, desc: 'เปลี่ยนเป็นตัวพิมพ์เล็ก' },
    { label: 'text[0]', result: `'${text[0] || ''}'`, desc: 'ดึงตัวอักษรตัวแรก (Index 0)' },
    { label: 'text[-1]', result: `'${text[text.length - 1] || ''}'`, desc: 'ดึงตัวอักษรตัวสุดท้าย (Index -1)' },
    { label: 'text[0:5]', result: `'${text.slice(0, 5)}'`, desc: 'ตัดสไลด์ (Slicing) เอาตำแหน่ง 0-4' },
    { label: 'text.replace("Python","World")', result: `'${text.replace('Python', 'World')}'`, desc: 'แทนที่คำ' },
    { label: 'text.split(" ")', result: JSON.stringify(text.split(' ')).replace(/"/g, "'"), desc: 'แยกข้อความด้วยช่องว่าง (ได้ผลลัพธ์เป็น List)' },
  ];

  const runOperation = (demo) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: demo.label.startsWith('len(') ? demo.label : `print(${demo.label})` },
      { type: 'output', text: `${demo.result}` }
    ]);
  };

  const checkType = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `type(text)` },
      { type: 'output', text: `<class 'str'>` }
    ]);
  };

  const clearConsole = () => {
    setConsoleHistory([]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <Type size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">String Explorer (ข้อความ)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          สำรวจชนิดข้อมูล String (str) การจัดการข้อความ และการเข้าถึงตัวอักษรด้วย Index
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">1. กำหนดค่าตัวแปร text</h4>
            
            <div className="flex justify-center mb-8">
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center w-full max-w-md">
                <label className="block text-sm font-bold text-violet-700 mb-2">ตัวแปร text (String)</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={e => updateText(e.target.value)} 
                  className="w-full text-center text-lg font-bold font-mono border-2 border-violet-300 rounded-xl p-2 focus:outline-none focus:border-violet-500 bg-white" 
                  placeholder="พิมพ์ข้อความที่นี่..."
                />
              </div>
            </div>

            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">2. เมธอดและการจัดการ String</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {methods.map((m, i) => (
                <button 
                  key={i} 
                  onClick={() => runOperation(m)}
                  className="bg-white border border-slate-200 rounded-xl p-3 text-left transition-all hover:border-violet-400 hover:shadow-md active:scale-95 group flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-sm font-bold text-violet-700 mb-1 truncate">{m.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed mb-3">{m.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-violet-600 font-bold bg-violet-50 py-1.5 px-2 rounded-md w-max">
                    <Play size={12} className="fill-current" /> รันเพื่อดูผล
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Control / Gamification */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">คำอธิบายเพิ่มเติม</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
              <p className="text-sm font-bold text-slate-800 mb-2">String Indexing</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Python นับ Index เริ่มจาก 0 และสามารถนับจากหลังมาหน้าด้วยเลขติดลบ (-1)
              </p>
              <div className="flex justify-center gap-1 font-mono text-sm">
                {text.slice(0, 5).split('').map((char, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-violet-100 border border-violet-200 rounded text-violet-900 font-bold">{char}</div>
                    <div className="text-xs text-slate-400 mt-1">{i}</div>
                  </div>
                ))}
                {text.length > 5 && <div className="self-center mx-1 text-slate-400">...</div>}
              </div>
            </div>

            <button 
              onClick={checkType}
              className="mt-auto w-full bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Type size={18} /> เช็คชนิดข้อมูล type(text)
            </button>
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">python -i</span>
            </div>
            <button 
              onClick={clearConsole}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-300">
                    <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-cyan-300">{line.text}</div>
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
