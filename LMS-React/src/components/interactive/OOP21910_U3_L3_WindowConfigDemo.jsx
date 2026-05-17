import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L3_WindowConfigDemo() {
  const [draftTitle, setDraftTitle] = useState('My App');
  const [draftWidth, setDraftWidth] = useState(300);
  const [draftHeight, setDraftHeight] = useState(200);

  const [appliedConfig, setAppliedConfig] = useState({ title: 'My App', width: 300, height: 200 });

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter window initialized with default size.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const applyConfig = () => {
    setAppliedConfig({ title: draftTitle, width: draftWidth, height: draftHeight });
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ root.title("${draftTitle}")` },
      { type: 'system', text: `  -> Window title updated to "${draftTitle}".` },
      { type: 'command', text: `$ root.geometry("${draftWidth}x${draftHeight}")` },
      { type: 'system', text: `  -> Window size updated to ${draftWidth}x${draftHeight} pixels.` }
    ]);
  };

  const clear = () => {
    setDraftTitle('My App');
    setDraftWidth(300);
    setDraftHeight(200);
    setAppliedConfig({ title: 'My App', width: 300, height: 200 });
    setConsoleHistory([
      { type: 'system', text: 'Tkinter window reset to default size.' }
    ]);
  };

  const scaleW = Math.min(appliedConfig.width / 2, 250);
  const scaleH = Math.min(appliedConfig.height / 2, 200);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
            <Maximize2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ปรับแต่งขนาดและชื่อหน้าต่าง (Window Configuration)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการใช้คำสั่ง <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">title()</code> และ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">geometry()</code> เพื่อปรับแต่งหน้าต่างหลัก
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              {/* Form */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ชื่อหน้าต่าง (title)</label>
                  <input type="text" value={draftTitle} onChange={e => setDraftTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ความกว้าง: <span className="text-teal-600">{draftWidth}px</span></label>
                    <input type="range" min="100" max="600" value={draftWidth} onChange={e => setDraftWidth(Number(e.target.value))} className="w-full accent-teal-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ความสูง: <span className="text-teal-600">{draftHeight}px</span></label>
                    <input type="range" min="80" max="400" value={draftHeight} onChange={e => setDraftHeight(Number(e.target.value))} className="w-full accent-teal-600" />
                  </div>
                </div>

                <button onClick={applyConfig} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm mt-2">
                  <Play size={16} fill="currentColor" /> Apply Configuration
                </button>
              </div>

              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[260px]" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col border border-slate-400" style={{ width: `${scaleW}px`, height: `${scaleH}px`, minWidth: '120px', minHeight: '80px' }}>
                  <div className="bg-slate-700 px-2 py-1.5 flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-[10px] ml-1 font-mono truncate">{appliedConfig.title}</span>
                  </div>
                  <div className="bg-slate-100 flex-1 flex flex-col items-center justify-center text-slate-600 text-xs font-mono">
                    <span className="bg-white/50 px-2 py-1 rounded shadow-sm border border-slate-200">
                      {appliedConfig.width}x{appliedConfig.height}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-yellow-300">root</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Tk</span>()<br />
              <span className="text-slate-700"># ตั้งชื่อหน้าต่างโปรแกรม</span><br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">title</span>(<span className="text-green-300">"{appliedConfig.title}"</span>)<br />
              <span className="text-slate-700"># กำหนดขนาด (กว้างxสูง)</span><br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">geometry</span>(<span className="text-green-300">"{appliedConfig.width}x{appliedConfig.height}"</span>)<br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">mainloop</span>()
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-teal-600 text-sm font-mono mb-1">root.title("...")</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้เปลี่ยนชื่อที่แสดงบนแถบหัวหน้าต่าง (Title Bar) ควรตั้งชื่อให้สื่อความหมายถึงตัวโปรแกรม
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-teal-600 text-sm font-mono mb-1">root.geometry("WxH")</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้กำหนดขนาดเริ่มต้นของหน้าต่าง โดยกำหนดเป็นข้อความ string ในรูปแบบ <code>"กว้างxสูง"</code> (ใช้ตัวอักษร <b>x</b> ตัวเล็ก)
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
