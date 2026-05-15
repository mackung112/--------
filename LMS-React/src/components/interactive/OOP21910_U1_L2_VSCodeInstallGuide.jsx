import React, { useState, useEffect, useRef } from 'react';
import { Code2, Terminal, Puzzle, FolderOpen, Search, Settings, RotateCcw, MonitorPlay, MousePointerClick, CheckSquare } from 'lucide-react';

const areas = {
  sidebar: { title: 'Activity Bar (แถบซ้ายสุด)', desc: 'ปุ่มลัดเพื่อเข้าถึงเครื่องมือหลัก เช่น Explorer (จัดการไฟล์), Search (ค้นหา), Source Control (Git), Run/Debug, และ Extensions (ส่วนเสริม)', icon: Settings, color: 'text-blue-600' },
  explorer: { title: 'Explorer (แถบจัดการไฟล์)', desc: 'แสดงรายชื่อไฟล์และโฟลเดอร์ทั้งหมดในโปรเจกต์ของเรา สามารถคลิกขวาเพื่อสร้าง ลบ หรือเปลี่ยนชื่อไฟล์ได้', icon: FolderOpen, color: 'text-rose-600' },
  editor: { title: 'Editor (พื้นที่เขียนโค้ด)', desc: 'พื้นที่หลักสำหรับพิมพ์โค้ด มีระบบ Syntax Highlighting (เปลี่ยนสีโค้ด) และ Auto-complete (เดาคำอัตโนมัติ) เพื่อช่วยให้เขียนโค้ดได้เร็วและผิดพลาดน้อยลง', icon: Code2, color: 'text-emerald-600' },
  terminal: { title: 'Integrated Terminal', desc: 'หน้าต่างพิมพ์คำสั่ง (Command Line) ที่ฝังมาใน VS Code เลย ไม่ต้องสลับหน้าต่างไปมา ใช้รันคำสั่ง python หรือ pip ได้ทันที (กด Ctrl + ` เพื่อเปิด/ปิด)', icon: Terminal, color: 'text-purple-600' },
  palette: { title: 'Command Palette', desc: 'เครื่องมือลับและสำคัญที่สุด! เปิดโดยกด Ctrl + Shift + P ใช้พิมพ์ค้นหาคำสั่งทุกอย่างที่มีใน VS Code', icon: Search, color: 'text-amber-600' },
};

export default function OOP21910_U1_L2_VSCodeInstallGuide() {
  const [activeArea, setActiveArea] = useState('editor');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'VS Code Simulator Initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const selectArea = (areaKey) => {
    setActiveArea(areaKey);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `Selected UI Component: ${areas[areaKey].title}` }
    ]);
  };

  const simulateCommandPalette = () => {
    selectArea('palette');
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: 'Shortcut triggered: Ctrl + Shift + P' },
      { type: 'command', text: '> Python: Select Interpreter' },
      { type: 'output', text: 'Selected: Python 3.12.4' }
    ]);
  };

  const clear = () => {
    setActiveArea('editor');
    setConsoleHistory([{ type: 'system', text: 'VS Code Simulator Initialized.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Code2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">สำรวจหน้าตา VS Code</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          ทำความรู้จักส่วนประกอบต่างๆ ของโปรแกรม VS Code ที่เราจะใช้เป็นเครื่องมือหลัก (IDE) ตลอดทั้งเทอม
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top Control Bar */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={simulateCommandPalette}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all flex items-center gap-2 shadow-sm border border-amber-200">
              <Search size={14} /> จำลองการกด Ctrl + Shift + P
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive UI Map */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-center bg-slate-100">
            
            <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-[400px]">
              {/* Title Bar */}
              <div className="bg-[#2d2d2d] px-3 py-1.5 flex items-center gap-2 border-b border-black select-none">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"/><div className="w-3 h-3 rounded-full bg-amber-500"/><div className="w-3 h-3 rounded-full bg-emerald-500"/></div>
                <span className="text-slate-400 text-xs font-mono ml-2 flex-1 text-center">my_project — VS Code</span>
              </div>

              <div className="flex flex-1 overflow-hidden relative">
                
                {/* Command Palette Overlay */}
                {activeArea === 'palette' && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-80 bg-[#252526] border border-slate-600 rounded-lg shadow-2xl z-20 flex flex-col animate-in slide-in-from-top-4">
                    <div className="p-2 border-b border-slate-600 flex items-center gap-2">
                      <span className="text-emerald-400 font-mono text-sm">&gt;</span>
                      <input type="text" value="Python: Select Interpreter" readOnly className="bg-transparent text-slate-200 text-sm outline-none flex-1 font-mono" />
                    </div>
                    <div className="p-2 bg-blue-600/30 text-blue-300 text-xs font-mono">
                      Python: Select Interpreter
                    </div>
                  </div>
                )}

                {/* Activity Bar */}
                <div className={`w-12 bg-[#333333] flex flex-col items-center py-3 gap-4 border-r border-slate-800 transition-all cursor-pointer hover:bg-[#3a3a3a] ${activeArea === 'sidebar' ? 'ring-2 ring-inset ring-blue-500 bg-[#3a3a3a]' : ''}`}
                     onClick={() => selectArea('sidebar')}>
                  <FolderOpen size={24} className="text-slate-400 hover:text-white" />
                  <Search size={24} className="text-slate-400 hover:text-white" />
                  <Puzzle size={24} className="text-slate-400 hover:text-white" />
                  <Settings size={24} className="text-slate-400 hover:text-white mt-auto" />
                </div>

                {/* Explorer */}
                <div className={`w-48 bg-[#252526] border-r border-slate-800 flex flex-col transition-all cursor-pointer hover:bg-[#2a2a2b] ${activeArea === 'explorer' ? 'ring-2 ring-inset ring-rose-500 bg-[#2a2a2b]' : ''}`}
                     onClick={() => selectArea('explorer')}>
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Explorer</div>
                  <div className="px-2 py-1 flex flex-col gap-0.5">
                    <div className="text-slate-300 text-sm font-bold flex items-center gap-1 hover:bg-slate-700 px-2 py-1 rounded">
                      <span className="text-[10px]">▼</span> MY_PROJECT
                    </div>
                    <div className="text-slate-400 text-sm flex items-center gap-2 hover:bg-slate-700 px-2 py-1 rounded ml-3">
                      <span className="text-sky-400 text-xs font-mono">Py</span> main.py
                    </div>
                    <div className="text-slate-400 text-sm flex items-center gap-2 hover:bg-slate-700 px-2 py-1 rounded ml-3">
                      <span className="text-sky-400 text-xs font-mono">Py</span> student.py
                    </div>
                  </div>
                </div>

                {/* Main Area (Editor + Terminal) */}
                <div className="flex-1 flex flex-col relative min-w-0">
                  {/* Editor */}
                  <div className={`flex-1 bg-[#1e1e1e] flex flex-col transition-all cursor-pointer hover:bg-[#222222] ${activeArea === 'editor' ? 'ring-2 ring-inset ring-emerald-500' : ''}`}
                       onClick={() => selectArea('editor')}>
                    <div className="flex bg-[#2d2d2d]">
                      <div className="bg-[#1e1e1e] text-emerald-400 px-4 py-2 text-xs border-t-2 border-emerald-500 font-mono flex items-center gap-2">
                        <span className="text-sky-400 text-xs">Py</span> main.py
                      </div>
                    </div>
                    <div className="p-4 font-mono text-sm leading-loose">
                      <div><span className="text-pink-400">print</span>(<span className="text-orange-300">"Hello, VS Code!"</span>)</div>
                    </div>
                  </div>

                  {/* Integrated Terminal */}
                  <div className={`h-32 bg-[#1e1e1e] border-t border-slate-700 flex flex-col transition-all cursor-pointer hover:bg-[#222222] ${activeArea === 'terminal' ? 'ring-2 ring-inset ring-purple-500' : ''}`}
                       onClick={() => selectArea('terminal')}>
                    <div className="flex bg-[#1e1e1e] border-b border-slate-700">
                      <div className="text-slate-300 px-4 py-1 text-[11px] uppercase tracking-wider border-b-2 border-blue-500">Terminal</div>
                    </div>
                    <div className="p-3 font-mono text-[13px] text-slate-300">
                      C:\project&gt; <span className="text-emerald-400">python main.py</span><br/>
                      Hello, VS Code!
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-slate-50 p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">คำอธิบายส่วนประกอบ</h4>
            
            <div className={`bg-white border-2 rounded-xl p-5 shadow-sm mb-4 flex-1 transition-all duration-300 ${activeArea ? 'border-' + areas[activeArea].color.split('-')[1] + '-200' : 'border-slate-200'}`}>
              {activeArea ? (
                <>
                  <div className={`flex items-center gap-3 mb-4 ${areas[activeArea].color}`}>
                    {React.createElement(areas[activeArea].icon, { size: 28 })}
                    <h5 className="font-bold text-lg">{areas[activeArea].title}</h5>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {areas[activeArea].desc}
                  </p>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <MousePointerClick size={32} className="mb-2 opacity-50" />
                  <p className="text-sm">คลิกที่ส่วนต่างๆ ของ VS Code จำลองด้านซ้าย</p>
                </div>
              )}
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ตหน้าต่าง
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Event Log</span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Clear Log
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">⌨️</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap ml-6">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
