import React, { useState, useEffect, useRef } from 'react';
import { Puzzle, Check, Download, Star, RotateCcw, MonitorPlay, Search } from 'lucide-react';

const extensionsData = [
  { id: 'python', name: 'Python', author: 'Microsoft', desc: 'เครื่องมือพื้นฐานสำหรับเขียน Python (IntelliSense, Linting, Debugging)', essential: true, stars: '4.8', downloads: '120M', icon: '🐍' },
  { id: 'pylance', name: 'Pylance', author: 'Microsoft', desc: 'ทำงานร่วมกับ Python Extension เพื่อให้แนะนำโค้ดได้รวดเร็วและแม่นยำขึ้น', essential: true, stars: '4.7', downloads: '80M', icon: '⚡' },
  { id: 'prettier', name: 'Prettier', author: 'Prettier', desc: 'ช่วยจัดรูปแบบโค้ด (Format) ให้สวยงามและเป็นระเบียบอัตโนมัติ', essential: false, stars: '4.5', downloads: '45M', icon: '✨' },
  { id: 'material', name: 'Material Icon Theme', author: 'PKief', desc: 'เปลี่ยนไอคอนไฟล์ในแถบ Explorer ให้ดูสวยงามและแยกแยะง่าย', essential: false, stars: '4.9', downloads: '25M', icon: '🎨' },
];

export default function OOP21910_U1_L3_ExtensionInstallDemo() {
  const [installed, setInstalled] = useState({});
  const [activeExt, setActiveExt] = useState(extensionsData[0]);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'VS Code Extension Manager Ready.' },
    { type: 'system', text: 'คำแนะนำ: ติดตั้ง Extension ที่จำเป็น (Essential) ให้ครบ' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleInstall = (ext) => {
    if (installed[ext.id]) return;
    setInstalled(prev => ({ ...prev, [ext.id]: true }));
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `code --install-extension ${ext.author.toLowerCase()}.${ext.id}` },
      { type: 'output', text: `Installing ${ext.name}...` },
      { type: 'output', text: `Successfully installed ${ext.name}!` }
    ]);
  };

  const clear = () => {
    setInstalled({});
    setActiveExt(extensionsData[0]);
    setConsoleHistory([
      { type: 'system', text: 'VS Code Extension Manager Ready.' },
      { type: 'system', text: 'คำแนะนำ: ติดตั้ง Extension ที่จำเป็น (Essential) ให้ครบ' }
    ]);
  };

  const essentialCount = extensionsData.filter(e => e.essential).length;
  const installedEssentialCount = extensionsData.filter(e => e.essential && installed[e.id]).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Puzzle size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">ติดตั้ง Extensions ที่จำเป็น</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          VS Code เปล่าๆ ไม่สามารถทำอะไรได้มากนัก เราต้องติดตั้ง "ส่วนเสริม" (Extensions) เพื่อให้มันเก่งขึ้น โดยเฉพาะสำหรับภาษา Python
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top Control Bar */}
        <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
            สถานะส่วนเสริมจำเป็น: 
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${installedEssentialCount === essentialCount ? 'bg-emerald-500' : 'bg-amber-500'}`}>
              {installedEssentialCount} / {essentialCount}
            </span>
          </div>
          {installedEssentialCount === essentialCount && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check size={14} /> พร้อมเรียน!
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Extension Marketplace List */}
          <div className="flex-1 p-0 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-100">
            <div className="p-4 border-b border-slate-200 bg-[#252526] text-white">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input type="text" placeholder="Search Extensions in Marketplace" readOnly 
                       className="w-full bg-[#3c3c3c] border-none text-sm text-slate-200 pl-10 pr-3 py-2 rounded focus:outline-none" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-[#252526] divide-y divide-slate-700/50">
              {extensionsData.map(ext => (
                <div key={ext.id} onClick={() => setActiveExt(ext)}
                     className={`p-4 flex gap-4 cursor-pointer transition-colors ${activeExt.id === ext.id ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}>
                  <div className="text-3xl shrink-0">{ext.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-200 text-sm truncate">{ext.name}</h4>
                      {ext.essential && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded ml-2 border border-amber-500/30">จำเป็น</span>}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 truncate">{ext.desc}</div>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                      <span>{ext.author}</span>
                      <span className="flex items-center gap-0.5"><Download size={10} /> {ext.downloads}</span>
                      <span className="flex items-center gap-0.5"><Star size={10} className="text-amber-500" /> {ext.stars}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Extension Details */}
          <div className="w-full lg:w-[350px] bg-white flex flex-col border-l border-slate-200">
            <div className="p-6 flex-1 overflow-y-auto">
              {activeExt ? (
                <div className="animate-in fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{activeExt.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-800">{activeExt.name}</h4>
                      <div className="text-sm text-indigo-600 font-medium">{activeExt.author}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-100">
                    <span className="flex items-center gap-1"><Download size={14} /> {activeExt.downloads}</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-400" /> {activeExt.stars}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {activeExt.desc}
                  </p>

                  <button onClick={() => handleInstall(activeExt)} disabled={installed[activeExt.id]}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex justify-center items-center gap-2 ${
                      installed[activeExt.id] 
                        ? 'bg-slate-100 text-emerald-600 cursor-not-allowed border border-emerald-200' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
                    }`}>
                    {installed[activeExt.id] ? <><Check size={16} /> Installed</> : 'Install'}
                  </button>

                  {activeExt.essential && !installed[activeExt.id] && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600 flex items-start gap-2">
                      <span className="mt-0.5">⚠️</span> 
                      <span>เป็น Extension สำคัญมาก ควรติดตั้งก่อนเริ่มเขียนโค้ดเสมอ</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Select an extension to view details.
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200">
              <button onClick={clear}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
                <RotateCcw size={16} /> รีเซ็ต
              </button>
            </div>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Extension CLI</span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Clear Log
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">$</span>{line.text}</div>}
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
