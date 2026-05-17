import React, { useState, useEffect, useRef } from 'react';
import { Thermometer, RotateCcw } from 'lucide-react';

export default function PY21910_U4_L11_IfStatement() {
  const [temp, setTemp] = useState(38.0);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'If Statement Simulator Ready.' },
    { type: 'command', text: 'temp = 38.0' },
    { type: 'command', text: 'if temp >= 37.5:' },
    { type: 'output',  text: 'มีไข้! ควรไปพบแพทย์' },
  ]);
  const consoleRef = useRef(null);
  const hasFever = temp >= 37.5;

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleChange = (val) => {
    setTemp(val);
    const fever = val >= 37.5;
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `temp = ${val}` },
      { type: 'command', text: `if temp >= 37.5:` },
      fever
        ? { type: 'output', text: 'มีไข้! ควรไปพบแพทย์' }
        : { type: 'system', text: '# เงื่อนไขไม่เป็น True — ไม่มีการแสดงผล' },
    ]);
  };

  const clear = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <Thermometer size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">if Statement (เงื่อนไข if)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทดลองเปลี่ยนอุณหภูมิเพื่อดูว่าเงื่อนไข <code className="bg-slate-200 px-1 rounded text-pink-600">if</code> จะทำงานหรือไม่
        </p>
      </div>

      <div className="flex flex-col min-h-[420px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Simulator */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-6">ปรับอุณหภูมิ</h4>
            <div className="flex flex-col items-center gap-6">
              {/* Thermometer Visual */}
              <div className={`text-7xl font-black font-mono transition-colors ${hasFever ? 'text-rose-500' : 'text-emerald-500'}`}>
                {temp.toFixed(1)}°C
              </div>
              <input
                type="range" min="35" max="42" step="0.1" value={temp}
                onChange={e => handleChange(+e.target.value)}
                className="w-64 accent-rose-500"
              />
              <div className="flex justify-between w-64 text-xs text-slate-600 font-mono">
                <span>35°C</span><span>37.5°C (เกณฑ์ไข้)</span><span>42°C</span>
              </div>

              {/* Result badge */}
              <div className={`w-full max-w-xs text-center py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                hasFever
                  ? 'bg-rose-100 text-rose-700 border-2 border-rose-300'
                  : 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200'
              }`}>
                {hasFever ? '🤒 มีไข้! ควรไปพบแพทย์' : '😊 ปกติ ไม่มีไข้'}
              </div>

              {/* Code visual */}
              <div className="w-full max-w-xs bg-slate-900 rounded-xl p-4 font-mono text-sm">
                <div className="text-purple-400">temp = {temp.toFixed(1)}</div>
                <div className={`text-pink-400 mt-1 ${hasFever ? 'font-bold' : ''}`}>if temp &gt;= 37.5:</div>
                <div className={`ml-4 mt-0.5 transition-opacity ${hasFever ? 'text-yellow-300 opacity-100' : 'text-slate-600 opacity-40'}`}>
                  print("มีไข้!")
                </div>
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โครงสร้าง if</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-700 font-bold mb-2">รูปแบบ Syntax</p>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-100 leading-relaxed">
                <span className="text-pink-400">if</span> <span className="text-yellow-300">เงื่อนไข</span>:<br/>
                <span className="ml-4 text-cyan-300">{'# โค้ดที่รัน'}</span><br/>
                <span className="ml-4 text-cyan-300">{'# เมื่อเงื่อนไขเป็น True'}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-3">
                Python จะทำงานในบล็อก <code className="bg-slate-100 px-1 rounded">if</code> ก็ต่อเมื่อเงื่อนไขประเมินค่าเป็น <strong>True</strong> เท่านั้น ถ้า False จะข้ามไปเลย
              </p>
            </div>
            <button onClick={clear}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Clear Terminal
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
            </div>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
