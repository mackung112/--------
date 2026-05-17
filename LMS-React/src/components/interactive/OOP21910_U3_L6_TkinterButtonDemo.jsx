import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L6_TkinterButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter Button widget initialized. Waiting for click event...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Button clicked.` },
      { type: 'command', text: `$ on_click()` },
      { type: 'output', text: `  -> ปุ่มถูกกดครั้งที่ ${newCount}` }
    ]);
  };

  const clear = () => {
    setClickCount(0);
    setConsoleHistory([
      { type: 'system', text: 'Tkinter Button widget reset. Waiting for click event...' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
            <MousePointer2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ปุ่มกดและฟังก์ชัน (Button & Command)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการสร้างปุ่ม <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">tk.Button</code> และการผูกฟังก์ชันให้ทำงานเมื่อถูกคลิกด้วยพารามิเตอร์ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">command</code>
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
                    <span className="text-slate-600 text-xs ml-2 font-mono">Button Demo</span>
                  </div>
                  <div className="bg-slate-100 p-8 flex flex-col items-center justify-center gap-4 min-h-[160px]">
                    <button onClick={handleClick} className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white px-8 py-3 rounded-lg text-sm font-bold transition-all shadow-md">
                      คลิกเลย!
                    </button>
                    <div className="text-sm text-slate-700 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                      กดแล้ว: <span className="font-bold text-violet-600">{clickCount}</span> ครั้ง
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-slate-700"># 1. เขียนฟังก์ชันการทำงาน</span><br />
              <span className="text-pink-400">def</span> <span className="text-blue-300">on_click</span>():<br />
              &nbsp;&nbsp;<span className="text-pink-400">print</span>(<span className="text-green-300">"ปุ่มถูกกด!"</span>)<br />
              <br />
              <span className="text-slate-700"># 2. สร้างปุ่มและผูกฟังก์ชัน</span><br />
              <span className="text-sky-300">tk</span>.<span className="text-blue-300">Button</span>(<br />
              &nbsp;&nbsp;<span className="text-yellow-300">root</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"คลิกเลย!"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">command</span>=<span className="text-yellow-300">on_click</span><br />
              ).<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">20</span>)
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-violet-600 text-sm font-mono mb-1">tk.Button()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    สร้างปุ่มกดที่สามารถคลิกได้ มักใช้ร่วมกับ <code>text</code> เพื่อแสดงข้อความบนปุ่ม
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">command=...</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    พารามิเตอร์สำหรับระบุ <strong className="text-slate-800 text-rose-500">ชื่อฟังก์ชัน</strong> ที่จะให้ทำงานเมื่อปุ่มถูกกด <br/><br/>
                    <strong className="text-red-500">ข้อควรระวัง:</strong> ห้ามใส่วงเล็บ <code>()</code> ท้ายชื่อฟังก์ชัน เช่น ให้เขียน <code>command=on_click</code> (ถูกต้อง) ห้ามเขียน <code>command=on_click()</code> (ผิด) เพราะจะทำให้ฟังก์ชันทำงานทันทีตั้งแต่โปรแกรมเริ่มรัน
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
