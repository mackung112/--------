import React, { useState, useEffect, useRef } from 'react';
import { Layout, Monitor, Code, Settings, PlusSquare, Type, Square, LayoutGrid, RotateCcw } from 'lucide-react';

const layoutOptions = [
  { id: 'grid', name: 'Grid Layout', desc: 'จัดวางแบบตาราง (แถว, คอลัมน์)' },
  { id: 'pack', name: 'Pack Layout', desc: 'จัดเรียงต่อกันบนลงล่าง' }
];

export default function OOP21910_U3_L7_TkinterPreviewer() {
  const [layoutStyle, setLayoutStyle] = useState('grid');
  const [btnColor, setBtnColor] = useState('#4f46e5');
  const [bgColor, setBgColor] = useState('#f0f0f0');

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'GUI Previewer initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const elements = [
    { id: 1, type: 'label', text: 'เข้าสู่ระบบ', row: 0, col: 0, colspan: 2 },
    { id: 2, type: 'label', text: 'ชื่อผู้ใช้:', row: 1, col: 0, colspan: 1 },
    { id: 3, type: 'entry', text: '', row: 1, col: 1, colspan: 1 },
    { id: 4, type: 'label', text: 'รหัสผ่าน:', row: 2, col: 0, colspan: 1 },
    { id: 5, type: 'entry', text: '', row: 2, col: 1, colspan: 1 },
    { id: 6, type: 'button', text: 'Login', row: 3, col: 0, colspan: 2 }
  ];

  const handleLayoutChange = (id) => {
    setLayoutStyle(id);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Layout changed to ${id}.` },
      { type: 'command', text: `$ # widgets will use .${id}() instead of other layout managers.` }
    ]);
  };

  const handleColorChange = (color) => {
    setBtnColor(color);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Button color changed to ${color}.` },
      { type: 'command', text: `$ btn.config(bg="${color}")` }
    ]);
  };

  const simulateLogin = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Login button clicked.` },
      { type: 'command', text: `$ on_login_click()` },
      { type: 'output', text: `  -> Simulating login process...` }
    ]);
  };

  const clear = () => {
    setLayoutStyle('grid');
    setBtnColor('#4f46e5');
    setConsoleHistory([
      { type: 'system', text: 'GUI Previewer reset.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <Layout size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดวาง Layout (Pack vs Grid)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้ความแตกต่างระหว่างการจัดวาง Widget ด้วย <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">.pack()</code> (เรียงต่อกัน) และ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">.grid()</code> (จัดเป็นตาราง)
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
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">รูปแบบการจัดวาง (Layout)</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    {layoutOptions.map(opt => (
                      <button key={opt.id} onClick={() => handleLayoutChange(opt.id)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${layoutStyle === opt.id ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">สีปุ่ม (Button Color)</label>
                  <div className="flex gap-2">
                    {['#4f46e5', '#10b981', '#ef4444', '#f59e0b'].map(c => (
                      <button key={c} onClick={() => handleColorChange(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${btnColor === c ? 'border-slate-800 ring-2 ring-slate-300' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[260px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-full max-w-sm border border-slate-400">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-xs ml-2 font-mono">ระบบล็อกอิน</span>
                  </div>
                  
                  <div className="p-6 min-h-[220px] transition-colors duration-500 bg-slate-100 flex items-center justify-center">
                    <div className="w-full">
                      {layoutStyle === 'grid' ? (
                        <div className="grid grid-cols-2 gap-3 items-center">
                          {elements.map(el => {
                            let colSpanClass = el.colspan === 2 ? 'col-span-2' : 'col-span-1';
                            if (el.type === 'label') {
                              return <div key={el.id} className={`${colSpanClass} ${el.colspan === 2 ? 'text-center text-lg font-bold mb-2' : 'text-right pr-2 text-sm text-slate-700'} flex items-center justify-end`}>{el.text}</div>;
                            }
                            if (el.type === 'entry') {
                              return <div key={el.id} className={`${colSpanClass}`}><input type="text" className="w-full border border-slate-300 px-2 py-1 bg-white focus:outline-none rounded text-sm" disabled /></div>;
                            }
                            if (el.type === 'button') {
                              return (
                                <div key={el.id} className={`${colSpanClass} mt-3`}>
                                  <button onClick={simulateLogin} className="w-full text-white py-1.5 px-4 rounded shadow-sm hover:opacity-90 transition-opacity font-bold text-sm" style={{ backgroundColor: btnColor }}>
                                    {el.text}
                                  </button>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          {elements.map(el => {
                            if (el.type === 'label') {
                              return <div key={el.id} className={`${el.colspan === 2 ? 'text-lg font-bold mb-1' : 'text-sm text-slate-700'}`}>{el.text}</div>;
                            }
                            if (el.type === 'entry') {
                              return <div key={el.id} className="w-3/4"><input type="text" className="w-full border border-slate-300 px-2 py-1 bg-white focus:outline-none rounded text-sm" disabled /></div>;
                            }
                            if (el.type === 'button') {
                              return (
                                <div key={el.id} className="w-1/2 mt-2">
                                  <button onClick={simulateLogin} className="w-full text-white py-1.5 px-4 rounded shadow-sm hover:opacity-90 transition-opacity font-bold text-sm" style={{ backgroundColor: btnColor }}>
                                    {el.text}
                                  </button>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
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
              <span className="text-slate-700"># 1. การใช้ .pack()</span><br />
              <span className="text-yellow-300">lbl_title</span>.<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">5</span>)<br />
              <span className="text-yellow-300">lbl_user</span>.<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">5</span>)<br />
              <span className="text-yellow-300">entry_user</span>.<span className="text-blue-300">pack</span>(<span className="text-orange-300">pady</span>=<span className="text-purple-300">5</span>)<br />
              <br />
              <span className="text-slate-700"># 2. การใช้ .grid()</span><br />
              <span className="text-yellow-300">lbl_title</span>.<span className="text-blue-300">grid</span>(<span className="text-orange-300">row</span>=<span className="text-purple-300">0</span>, <span className="text-orange-300">column</span>=<span className="text-purple-300">0</span>, <span className="text-orange-300">columnspan</span>=<span className="text-purple-300">2</span>)<br />
              <span className="text-yellow-300">lbl_user</span>.<span className="text-blue-300">grid</span>(<span className="text-orange-300">row</span>=<span className="text-purple-300">1</span>, <span className="text-orange-300">column</span>=<span className="text-purple-300">0</span>)<br />
              <span className="text-yellow-300">entry_user</span>.<span className="text-blue-300">grid</span>(<span className="text-orange-300">row</span>=<span className="text-purple-300">1</span>, <span className="text-orange-300">column</span>=<span className="text-purple-300">1</span>)
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">.pack()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    วาง Widget เรียงต่อกันจากบนลงล่าง เหมาะกับหน้าต่างที่มีโครงสร้างเรียบง่าย แต่ถ้ามีช่องกรอกคู่กับข้อความ (ซ้าย-ขวา) จะจัดยาก
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm font-mono mb-1">.grid()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    วาง Widget แบบตาราง โดยระบุตำแหน่ง <code>row</code> (แถวแนวนอน) และ <code>column</code> (แนวตั้ง) คล้ายโปรแกรม Excel <br/><br/>หากต้องการให้กินพื้นที่หลายช่อง สามารถใช้ <code>columnspan</code> ได้
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
