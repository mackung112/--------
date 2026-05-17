import React, { useState, useEffect, useRef } from 'react';
import { Type, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L4_TkinterLabelDemo() {
  const [draftText, setDraftText] = useState('สวัสดีครับ!');
  const [draftSize, setDraftSize] = useState(16);
  const [draftColors, setDraftColors] = useState({ fg: '#1e293b', bg: '#f1f5f9', label: 'เข้ม' });

  const [appliedConfig, setAppliedConfig] = useState({ 
    text: 'สวัสดีครับ!', 
    size: 16, 
    fg: '#1e293b', 
    bg: '#f1f5f9' 
  });

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter Label widget initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const colorPresets = [
    { label: 'เข้ม', fg: '#1e293b', bg: '#f1f5f9' },
    { label: 'น้ำเงิน', fg: '#1d4ed8', bg: '#dbeafe' },
    { label: 'แดง', fg: '#dc2626', bg: '#fee2e2' },
    { label: 'เขียว', fg: '#16a34a', bg: '#dcfce7' },
  ];

  const applyConfig = () => {
    setAppliedConfig({ text: draftText, size: draftSize, fg: draftColors.fg, bg: draftColors.bg });
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ lbl = tk.Label(root, text="${draftText}", font=("Arial", ${draftSize}), fg="${draftColors.fg}", bg="${draftColors.bg}")` },
      { type: 'command', text: `$ lbl.pack()` },
      { type: 'system', text: `  -> Label packed and rendered on screen.` }
    ]);
  };

  const clear = () => {
    setDraftText('สวัสดีครับ!');
    setDraftSize(16);
    setDraftColors(colorPresets[0]);
    setAppliedConfig({ text: 'สวัสดีครับ!', size: 16, fg: colorPresets[0].fg, bg: colorPresets[0].bg });
    setConsoleHistory([
      { type: 'system', text: 'Label widget reset to defaults.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <Type size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การสร้างข้อความด้วย Label</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการใช้ Widget <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">tk.Label</code> เพื่อแสดงข้อความบนหน้าจอ รวมถึงการกำหนดฟอนต์และสี
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
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ข้อความ (text)</label>
                  <input type="text" value={draftText} onChange={e => setDraftText(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ขนาดฟอนต์: <span className="text-rose-600">{draftSize}px</span></label>
                    <input type="range" min="10" max="40" value={draftSize} onChange={e => setDraftSize(Number(e.target.value))} className="w-full accent-rose-600" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ชุดสี</label>
                    <div className="flex gap-2">
                      {colorPresets.map(p => (
                        <button key={p.label} onClick={() => setDraftColors(p)}
                          className={`flex-1 py-1 rounded-md text-[10px] font-bold border-2 transition-all ${draftColors.label === p.label ? 'border-rose-500 scale-105 shadow-md' : 'border-slate-200 opacity-80'}`}
                          style={{ color: p.fg, backgroundColor: p.bg }}>
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={applyConfig} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm mt-2">
                  <Play size={16} fill="currentColor" /> Apply Configuration
                </button>
              </div>

              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[200px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-full max-w-sm border border-slate-400">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-xs ml-2 font-mono">App Window</span>
                  </div>
                  <div className="bg-slate-100 p-8 flex items-center justify-center min-h-[160px]">
                    <div className="px-4 py-3 rounded shadow-sm transition-all" style={{ fontSize: `${appliedConfig.size}px`, color: appliedConfig.fg, backgroundColor: appliedConfig.bg }}>
                      {appliedConfig.text || '(ว่าง)'}
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
              <span className="text-sky-300">tk</span>.<span className="text-blue-300">Label</span>(<br />
              &nbsp;&nbsp;<span className="text-yellow-300">root</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"{appliedConfig.text}"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">font</span>=(<span className="text-green-300">"Arial"</span>, <span className="text-purple-300">{appliedConfig.size}</span>),<br />
              &nbsp;&nbsp;<span className="text-orange-300">fg</span>=<span className="text-green-300">"{appliedConfig.fg}"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">bg</span>=<span className="text-green-300">"{appliedConfig.bg}"</span><br />
              ).<span className="text-blue-300">pack</span>()
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-rose-600 text-sm font-mono mb-1">text="..."</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ข้อความที่ต้องการให้แสดงบนหน้าจอ เป็นข้อความที่ผู้ใช้เห็นแต่แก้ไขไม่ได้
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-rose-600 text-sm font-mono mb-1">font=("...", size)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    กำหนดรูปแบบฟอนต์โดยใช้ Tuple ระบุชื่อฟอนต์และขนาดตัวอักษร
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-rose-600 text-sm font-mono mb-1">fg และ bg</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <code>fg</code> (foreground) คือสีตัวอักษร ส่วน <code>bg</code> (background) คือสีพื้นหลัง สามารถใช้ชื่อสีภาษาอังกฤษ หรือรหัสสี Hex ก็ได้
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
