import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Terminal, MousePointerClick, RotateCcw, Play } from 'lucide-react';

export default function OOP21910_U3_L1_TkinterIntroDemo() {
  const [mode, setMode] = useState('cli');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Terminal initialized. Ready for simulation.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const switchMode = (newMode) => {
    setMode(newMode);
    if (newMode === 'cli') {
      setConsoleHistory([
        { type: 'system', text: 'Switched to CLI Mode.' },
        { type: 'command', text: '$ python app.py' },
        { type: 'output', text: 'ชื่อ: Somchai' },
        { type: 'output', text: 'อายุ: 25' },
        { type: 'output', text: 'สวัสดี Somchai อายุ 25 ปี' },
        { type: 'system', text: 'Program exited.' }
      ]);
    } else {
      setConsoleHistory([
        { type: 'system', text: 'Switched to GUI Mode (Tkinter).' },
        { type: 'command', text: '$ python app_gui.py' },
        { type: 'system', text: 'Initializing GUI window...' },
        { type: 'output', text: '[INFO] Main window displayed.' },
        { type: 'system', text: 'Waiting for Event-Driven actions...' }
      ]);
    }
  };

  const submitGUI = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: '[EVENT] Button "ยืนยัน" clicked.' },
      { type: 'output', text: 'สวัสดี ผู้ใช้งาน!' }
    ]);
  };

  const clear = () => {
    setMode('cli');
    setConsoleHistory([
      { type: 'system', text: 'Terminal initialized. Ready for simulation.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Monitor size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">เปรียบเทียบ CLI vs GUI</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้ความแตกต่างระหว่างโปรแกรมแบบ Command Line Interface (CLI) และ Graphical User Interface (GUI)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Simulation */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex gap-3 mb-6 justify-center">
              <button onClick={() => switchMode('cli')} className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${mode === 'cli' ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
                <Terminal size={16} /> CLI Mode
              </button>
              <button onClick={() => switchMode('gui')} className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${mode === 'gui' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
                <Monitor size={16} /> GUI Mode
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center bg-[#2d2d2d] rounded-2xl p-6 shadow-inner border border-black relative overflow-hidden">
              {mode === 'cli' ? (
                <div className="w-full h-full text-emerald-400 font-mono text-sm leading-loose">
                  <div className="text-slate-500 mb-2 border-b border-slate-700 pb-2">Terminal Simulation</div>
                  <div>$ python app.py</div>
                  <div>ชื่อ: Somchai</div>
                  <div>อายุ: 25</div>
                  <div className="text-white font-bold mt-2">สวัสดี Somchai อายุ 25 ปี</div>
                  <div className="mt-4 text-emerald-400/50 animate-pulse">_</div>
                </div>
              ) : (
                <div className="w-full max-w-sm bg-slate-200 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-slate-400">
                  <div className="bg-slate-700 px-3 py-2 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-slate-300 text-xs ml-2 font-mono">tk</span>
                  </div>
                  <div className="bg-slate-100 p-6 space-y-4">
                    <div>
                      <div className="text-slate-700 text-xs font-bold mb-1">ชื่อ:</div>
                      <input type="text" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="กรอกชื่อ..." defaultValue="ผู้ใช้งาน" />
                    </div>
                    <div>
                      <div className="text-slate-700 text-xs font-bold mb-1">อายุ:</div>
                      <input type="text" className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="กรอกอายุ..." defaultValue="20" />
                    </div>
                    <button onClick={submitGUI} className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">
                      ยืนยัน (Trigger Event)
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ไวยากรณ์และแนวคิด</h4>
            
            <div className="bg-[#1e1e1e] text-slate-300 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              {mode === 'cli' ? (
                <>
                  <span className="text-slate-500"># CLI - ทำงานจากบนลงล่างทันที</span><br />
                  <span className="text-yellow-300">name</span> = <span className="text-pink-400">input</span>(<span className="text-green-300">"ชื่อ: "</span>)<br />
                  <span className="text-yellow-300">age</span> = <span className="text-pink-400">input</span>(<span className="text-green-300">"อายุ: "</span>)<br />
                  <span className="text-yellow-300">print</span>(<span className="text-green-300">f"สวัสดี {'{'}<span className="text-yellow-300">name</span>{'}'}"</span>)
                </>
              ) : (
                <>
                  <span className="text-slate-500"># GUI - นำเข้า Tkinter</span><br />
                  <span className="text-pink-400">import</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">as</span> <span className="text-sky-300">tk</span><br />
                  <span className="text-slate-500"># สร้างหน้าต่างหลัก</span><br />
                  <span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()<br />
                  <span className="text-slate-500"># สร้างปุ่ม (Widget)</span><br />
                  <span className="text-sky-300">tk</span>.<span className="text-blue-300">Button</span>(<span className="text-yellow-300">root</span>, <span className="text-orange-300">text</span>=<span className="text-green-300">"ยืนยัน"</span>).<span className="text-blue-300">pack</span>()<br />
                  <span className="text-slate-500"># รอรับคำสั่ง (Event-Driven)</span><br />
                  <span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()
                </>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                {mode === 'cli' ? (
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">CLI (Command Line)</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      โปรแกรมทำงานแบบบรรทัดต่อบรรทัด แสดงผลเป็นข้อความ (Text) เท่านั้น ผู้ใช้ต้องโต้ตอบผ่านการพิมพ์คำสั่งผ่านคีย์บอร์ด
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h5 className="font-bold text-indigo-600 text-sm mb-1">GUI (Graphical User Interface)</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        แสดงผลด้วยภาพกราฟิก หน้าต่าง ปุ่มกด (Widget) สามารถใช้เมาส์คลิกได้ มีความสวยงามและใช้งานง่ายกว่า
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200">
                      <h5 className="font-bold text-emerald-600 text-sm mb-1">Event-Driven</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        GUI ทำงานโดยรอ <strong className="text-slate-800">เหตุการณ์ (Event)</strong> เช่น รอให้ผู้ใช้คลิกปุ่ม พิมพ์ข้อความ โปรแกรมถึงจะทำงานตอบสนอง
                      </p>
                    </div>
                  </>
                )}
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
