import React, { useState, useEffect, useRef } from 'react';
import { Settings, RotateCcw, Search, Terminal } from 'lucide-react';

const builtins = [
  { name: 'print()', desc: 'แสดงผลออกทางหน้าจอ', example: 'print("Hello")', result: 'Hello' },
  { name: 'len()', desc: 'นับจำนวนสมาชิกใน List/String', example: 'len([1, 2, 3])', result: '3' },
  { name: 'type()', desc: 'ตรวจสอบชนิดข้อมูล', example: 'type(3.14)', result: "<class 'float'>" },
  { name: 'int()', desc: 'แปลงค่าเป็นจำนวนเต็ม', example: 'int("42")', result: '42' },
  { name: 'float()', desc: 'แปลงค่าเป็นทศนิยม', example: 'float("3.14")', result: '3.14' },
  { name: 'str()', desc: 'แปลงค่าเป็นข้อความ', example: 'str(100)', result: '"100"' },
  { name: 'max()', desc: 'หาค่าที่มากที่สุด', example: 'max(3, 7, 1)', result: '7' },
  { name: 'min()', desc: 'หาค่าที่น้อยที่สุด', example: 'min(3, 7, 1)', result: '1' },
  { name: 'sum()', desc: 'หาผลรวมทั้งหมด', example: 'sum([1, 2, 3])', result: '6' },
  { name: 'abs()', desc: 'หาค่าสัมบูรณ์', example: 'abs(-5)', result: '5' },
  { name: 'round()', desc: 'ปัดเศษทศนิยม', example: 'round(3.567, 1)', result: '3.6' },
  { name: 'sorted()', desc: 'เรียงลำดับข้อมูลใหม่', example: 'sorted([3, 1, 2])', result: '[1, 2, 3]' },
];

export default function PY21910_U6_L1_BuiltinFunctions() {
  const [search, setSearch] = useState('');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Built-in Functions Explorer Ready.' },
  ]);
  const consoleRef = useRef(null);

  const filtered = builtins.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.desc.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runFunc = (b) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: b.example },
      { type: 'output', text: b.result },
      { type: 'system', text: `# ${b.desc}` }
    ]);
  };

  const clear = () => setConsoleHistory([{ type: 'system', text: 'Built-in Functions Explorer Ready.' }]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <Settings size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Built-in Functions</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ฟังก์ชันมาตรฐานที่ Python เตรียมไว้ให้ใช้งานได้ทันทีโดยไม่ต้อง <code className="bg-slate-200 px-1 rounded text-pink-600">import</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive List */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <div className="flex items-center gap-2 mb-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
              <Search size={18} className="text-slate-600" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm w-full font-medium placeholder:text-slate-600 text-slate-700" 
                placeholder="ค้นหาฟังก์ชัน เช่น len, type หรือ คำอธิบาย..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 max-h-[400px]">
              {filtered.map((b, i) => (
                <button key={i} onClick={() => runFunc(b)}
                  className="bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50 p-4 rounded-xl text-left transition-all active:scale-95 group flex flex-col h-full">
                  <div className="font-mono font-bold text-sky-600 mb-1 flex items-center justify-between">
                    <span>{b.name}</span>
                    <Terminal size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs text-slate-700 mb-3 flex-1">{b.desc}</div>
                  <div className="bg-slate-900 rounded-lg p-2 font-mono text-[11px] mt-auto">
                    <div className="text-emerald-400">{b.example}</div>
                    <div className="text-cyan-300">→ {b.result}</div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-1 sm:col-span-2 text-center py-10 text-slate-600 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                  ไม่พบฟังก์ชันที่ค้นหา "{search}"
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">แนวคิดสำคัญ</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <p className="text-sm text-slate-700 font-bold mb-2">โครงสร้างการเรียกใช้</p>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-100 leading-relaxed mb-4">
                <span className="text-sky-400">function_name</span>(<span className="text-yellow-300">arguments</span>)
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-sky-500 font-bold">•</span> <strong>function_name</strong>: ชื่อฟังก์ชันที่ต้องการเรียกใช้</li>
                <li className="flex gap-2"><span className="text-sky-500 font-bold">•</span> <strong>arguments</strong>: ค่าที่ส่งเข้าไปให้ฟังก์ชันประมวลผล (บางฟังก์ชันไม่ต้องมีก็ได้)</li>
                <li className="flex gap-2"><span className="text-sky-500 font-bold">•</span> ฟังก์ชันส่วนใหญ่จะมีการคืนค่า <strong>(Return)</strong> ออกมาให้เรานำไปใช้งานต่อได้</li>
              </ul>
            </div>
            <button onClick={clear}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
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
