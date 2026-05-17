import React, { useState, useEffect, useRef } from 'react';
import { Palette, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L9_TkinterStyleDemo() {
  const [bgColor, setBgColor] = useState('#f0f9ff');
  const [fgColor, setFgColor] = useState('#1e40af');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(14);
  const [btnBg, setBtnBg] = useState('#4f46e5');
  const [btnFg, setBtnFg] = useState('#ffffff');
  
  const [appliedConfig, setAppliedConfig] = useState({
    bgColor: '#f0f9ff', fgColor: '#1e40af', fontFamily: 'Arial', fontSize: 14, btnBg: '#4f46e5', btnFg: '#ffffff'
  });

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter Style config initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const fonts = ['Arial', 'Courier New', 'Times New Roman', 'Helvetica'];
  const presets = [
    { name: 'ธีมน้ำเงิน', bg: '#f0f9ff', fg: '#1e40af', btnBg: '#4f46e5', btnFg: '#ffffff' },
    { name: 'ธีมเขียว', bg: '#f0fdf4', fg: '#166534', btnBg: '#16a34a', btnFg: '#ffffff' },
    { name: 'ธีมมืด', bg: '#1e293b', fg: '#e2e8f0', btnBg: '#6366f1', btnFg: '#ffffff' },
    { name: 'ธีมชมพู', bg: '#fdf2f8', fg: '#9d174d', btnBg: '#ec4899', btnFg: '#ffffff' },
  ];

  const applyPreset = (p) => {
    setBgColor(p.bg);
    setFgColor(p.fg);
    setBtnBg(p.btnBg);
    setBtnFg(p.btnFg);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Preset "${p.name}" selected.` }
    ]);
  };

  const applyConfig = () => {
    setAppliedConfig({ bgColor, fgColor, fontFamily, fontSize, btnBg, btnFg });
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ root.configure(bg="${bgColor}")` },
      { type: 'command', text: `$ lbl = tk.Label(..., fg="${fgColor}", font=("${fontFamily}", ${fontSize}))` },
      { type: 'command', text: `$ btn = tk.Button(..., bg="${btnBg}", fg="${btnFg}")` },
      { type: 'system', text: `  -> Styles updated on screen.` }
    ]);
  };

  const clear = () => {
    const defaultP = presets[0];
    setBgColor(defaultP.bg); setFgColor(defaultP.fg); setBtnBg(defaultP.btnBg); setBtnFg(defaultP.btnFg);
    setFontFamily('Arial'); setFontSize(14);
    setAppliedConfig({ bgColor: defaultP.bg, fgColor: defaultP.fg, fontFamily: 'Arial', fontSize: 14, btnBg: defaultP.btnBg, btnFg: defaultP.btnFg });
    setConsoleHistory([
      { type: 'system', text: 'Tkinter Style config reset to default.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
            <Palette size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การปรับแต่งสีและฟอนต์ (Styling)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการกำหนดค่า <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">bg, fg, font</code> ให้กับ Widget ต่างๆ เพื่อให้โปรแกรมดูสวยงามและน่าใช้งาน
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              {/* Form Config */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">ธีมสำเร็จรูป:</label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map(p => (
                      <button key={p.name} onClick={() => applyPreset(p)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 shadow-sm transition-transform active:scale-95" style={{ backgroundColor: p.bg, color: p.fg }}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">สีพื้นหลัง (bg)</label>
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer border border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">สีตัวอักษร (fg)</label>
                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer border border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">สีปุ่ม (btn bg)</label>
                    <input type="color" value={btnBg} onChange={e => setBtnBg(e.target.value)} className="w-full h-8 rounded cursor-pointer border border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">สีตัวอักษรปุ่ม</label>
                    <input type="color" value={btnFg} onChange={e => setBtnFg(e.target.value)} className="w-full h-8 rounded cursor-pointer border border-slate-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ฟอนต์ (Font)</label>
                    <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-pink-500">
                      {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">ขนาด: <span className="text-pink-600">{fontSize}px</span></label>
                    <input type="range" min="10" max="28" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-pink-600" />
                  </div>
                </div>

                <button onClick={applyConfig} className="w-full bg-pink-600 hover:bg-pink-700 active:scale-95 text-white py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2">
                  <Play size={14} fill="currentColor" /> Apply Style
                </button>
              </div>

              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[220px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-full max-w-sm border border-slate-400">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-xs ml-2 font-mono">Style Demo</span>
                  </div>
                  
                  <div className="p-6 space-y-4 transition-all duration-500" style={{ backgroundColor: appliedConfig.bgColor }}>
                    <div style={{ color: appliedConfig.fgColor, fontFamily: appliedConfig.fontFamily, fontSize: `${appliedConfig.fontSize}px` }} className="font-semibold text-center">ระบบลงทะเบียน</div>
                    
                    <div>
                      <div style={{ color: appliedConfig.fgColor, fontFamily: appliedConfig.fontFamily, fontSize: `${Math.max(appliedConfig.fontSize - 4, 10)}px` }} className="mb-1">ชื่อ:</div>
                      <input type="text" className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none" style={{ fontFamily: appliedConfig.fontFamily, fontSize: `${Math.max(appliedConfig.fontSize - 4, 10)}px` }} placeholder="กรอกชื่อ..." disabled />
                    </div>
                    
                    <button className="w-full py-2 rounded shadow-sm font-bold transition-colors mt-2" style={{ backgroundColor: appliedConfig.btnBg, color: appliedConfig.btnFg, fontFamily: appliedConfig.fontFamily, fontSize: `${Math.max(appliedConfig.fontSize - 2, 12)}px` }}>
                      ลงทะเบียน
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-slate-700"># ตั้งสีหน้าต่างหลัก</span><br />
              <span className="text-yellow-300">root</span>.<span className="text-blue-300">configure</span>(<span className="text-orange-300">bg</span>=<span className="text-green-300">"{appliedConfig.bgColor}"</span>)<br />
              <br />
              <span className="text-slate-700"># ตั้งสีและฟอนต์ให้ Label</span><br />
              <span className="text-yellow-300">lbl</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Label</span>(<br />
              &nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"ระบบลงทะเบียน"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">fg</span>=<span className="text-green-300">"{appliedConfig.fgColor}"</span>, <span className="text-orange-300">bg</span>=<span className="text-green-300">"{appliedConfig.bgColor}"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">font</span>=(<span className="text-green-300">"{appliedConfig.fontFamily}"</span>, <span className="text-purple-300">{appliedConfig.fontSize}</span>)<br />
              )<br />
              <br />
              <span className="text-slate-700"># ตั้งสีปุ่ม</span><br />
              <span className="text-yellow-300">btn</span> = <span className="text-sky-300">tk</span>.<span className="text-blue-300">Button</span>(<br />
              &nbsp;&nbsp;<span className="text-orange-300">text</span>=<span className="text-green-300">"ลงทะเบียน"</span>,<br />
              &nbsp;&nbsp;<span className="text-orange-300">bg</span>=<span className="text-green-300">"{appliedConfig.btnBg}"</span>, <span className="text-orange-300">fg</span>=<span className="text-green-300">"{appliedConfig.btnFg}"</span><br />
              )
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-pink-600 text-sm font-mono mb-1">bg และ fg</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <code>bg (background)</code> กำหนดสีพื้นหลัง และ <code>fg (foreground)</code> กำหนดสีตัวอักษร ใช้โค้ดสี Hex (#FFFFFF) หรือชื่อสี (red, blue) ก็ได้
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-pink-600 text-sm font-mono mb-1">font=("Name", Size)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้ Tuple กำหนดรูปแบบฟอนต์ โดยตัวแรกคือชื่อฟอนต์ (เช่น "Arial") และตัวที่สองคือขนาด (เช่น 14)
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
