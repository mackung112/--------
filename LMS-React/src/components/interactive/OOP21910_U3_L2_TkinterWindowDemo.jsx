import React, { useState, useEffect, useRef } from 'react';
import { AppWindow, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L2_TkinterWindowDemo() {
  const [showWindow, setShowWindow] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Ready. Click "Run" to execute Tkinter window creation.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleRun = () => {
    setShowWindow(true);
    setConsoleHistory([
      { type: 'command', text: '$ python main.py' },
      { type: 'system', text: '> import tkinter as tk' },
      { type: 'system', text: '> root = tk.Tk()' },
      { type: 'system', text: '> root.title("My First App")' },
      { type: 'system', text: '> root.geometry("300x200")' },
      { type: 'output', text: '[INFO] Main window created.' },
      { type: 'system', text: '> root.mainloop()' },
      { type: 'output', text: '[INFO] Entering main event loop. Waiting for user actions...' }
    ]);
  };

  const closeWindow = () => {
    setShowWindow(false);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: '[EVENT] User closed the window.' },
      { type: 'system', text: '[INFO] root.mainloop() exited.' },
      { type: 'system', text: 'Program terminated.' }
    ]);
  };

  const clear = () => {
    setShowWindow(false);
    setConsoleHistory([
      { type: 'system', text: 'Ready. Click "Run" to execute Tkinter window creation.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <AppWindow size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">สร้างหน้าต่างหลัก (Main Window)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้ขั้นตอนพื้นฐานที่สุดในการสร้างโปรแกรม GUI ด้วยการเรียกใช้ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">tk.Tk()</code> และ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">mainloop()</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6 items-center justify-center relative">
              
              {!showWindow && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl">
                  <div className="text-center">
                    <AppWindow size={48} className="text-slate-300 mx-auto mb-4" />
                    <button onClick={handleRun} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2">
                      <Play size={18} fill="currentColor" /> Run Program
                    </button>
                  </div>
                </div>
              )}

              {showWindow && (
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300 border border-slate-400 w-[300px] h-[200px] flex flex-col">
                  {/* Window Title Bar */}
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center opacity-80">
                        <AppWindow size={10} className="text-white" />
                      </div>
                      <span className="text-slate-300 text-xs font-mono">My First App</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-500" />
                      <div className="w-3 h-3 rounded-full bg-slate-500" />
                      <button onClick={closeWindow} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center group">
                        <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-white leading-none -mt-px">x</span>
                      </button>
                    </div>
                  </div>
                  {/* Window Content */}
                  <div className="bg-slate-100 flex-1 flex flex-col items-center justify-center text-slate-400 text-xs font-mono p-4 text-center border-t border-slate-400/20">
                    <div className="border-2 border-dashed border-slate-300 w-full h-full rounded flex items-center justify-center opacity-50">
                      Ready for Widgets
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-300 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span><br />
              <br />
              <span className="text-slate-500"># 1. สร้างหน้าต่างหลัก</span><br />
              <span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">title</span>(<span className="text-green-300">"My First App"</span>)<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">geometry</span>(<span className="text-green-300">"300x200"</span>)<br />
              <br />
              <span className="text-slate-500"># 2. เริ่มลูป Event</span><br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-sky-600 text-sm font-mono mb-1">import tkinter as tk</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    นำเข้าไลบรารี Tkinter และตั้งชื่อย่อว่า <code>tk</code> เพื่อความสะดวกในการพิมพ์
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-yellow-600 text-sm font-mono mb-1">tk.Tk()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    สร้าง Object ของหน้าต่างหลัก ซึ่งมักจะตั้งชื่อตัวแปรว่า <code>root</code> หรือ <code>window</code>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">root.mainloop()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คำสั่งสำคัญที่สุด! ใช้เริ่มวงลูปการทำงาน ทำให้หน้าต่างเปิดค้างไว้และรอรับคำสั่งจากผู้ใช้ (หากไม่มีคำสั่งนี้ หน้าต่างจะเปิดแล้วปิดทันที)
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
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Event Log</span>
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
