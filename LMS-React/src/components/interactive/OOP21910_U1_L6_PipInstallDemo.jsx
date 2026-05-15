import React, { useState, useEffect, useRef } from 'react';
import { Package, Terminal, Play, RotateCcw, ChevronRight, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function OOP21910_U1_L6_PipInstallDemo() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nTry typing "pip list" or "pip install requests".' }
  ]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [installedPackages, setInstalledPackages] = useState([]);
  const endRef = useRef(null);

  const packageDb = {
    'requests': { version: '2.31.0', desc: 'HTTP library สำหรับเรียก API' },
    'pygame': { version: '2.5.2', desc: 'ไลบรารีสร้างเกม 2D' },
    'numpy': { version: '1.26.4', desc: 'คำนวณทางคณิตศาสตร์ขั้นสูง' },
    'flask': { version: '3.0.3', desc: 'สร้างเว็บแอปพลิเคชัน' },
    'pillow': { version: '10.3.0', desc: 'จัดการรูปภาพ' },
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory(prev => [...prev, { type: 'input', content: `PS C:\\Users\\Student> ${cmd}` }]);
    setIsRunning(true);
    setInput('');

    setTimeout(() => {
      let output = '';
      let isError = false;

      if (cmd.startsWith('pip install ')) {
        const pkg = cmd.replace('pip install ', '').trim();
        if (packageDb[pkg]) {
          if (installedPackages.includes(pkg)) {
            output = `Requirement already satisfied: ${pkg} in c:\\python312\\lib\\site-packages (${packageDb[pkg].version})`;
          } else {
            setInstalledPackages(prev => [...prev, pkg]);
            output = `Collecting ${pkg}\n  Downloading ${pkg}-${packageDb[pkg].version}-py3-none-any.whl (10 kB)\nInstalling collected packages: ${pkg}\nSuccessfully installed ${pkg}-${packageDb[pkg].version}`;
          }
        } else {
          output = `ERROR: Could not find a version that satisfies the requirement ${pkg} (from versions: none)\nERROR: No matching distribution found for ${pkg}`;
          isError = true;
        }
      } else if (cmd === 'pip list') {
        let listStr = 'Package    Version\n---------- -------\npip        24.0\nsetuptools 69.5.1';
        installedPackages.forEach(p => {
          listStr += `\n${p.padEnd(10)} ${packageDb[p].version}`;
        });
        output = listStr;
      } else if (cmd.startsWith('pip uninstall ')) {
        const pkg = cmd.replace('pip uninstall ', '').trim();
        if (installedPackages.includes(pkg)) {
          setInstalledPackages(prev => prev.filter(p => p !== pkg));
          output = `Found existing installation: ${pkg} ${packageDb[pkg].version}\nUninstalling ${pkg}-${packageDb[pkg].version}:\n  Successfully uninstalled ${pkg}-${packageDb[pkg].version}`;
        } else {
          output = `WARNING: Skipping ${pkg} as it is not installed.`;
          isError = true;
        }
      } else if (cmd === 'clear' || cmd === 'cls') {
        setHistory([]);
        setIsRunning(false);
        return;
      } else {
        output = `${cmd.split(' ')[0]} : The term '${cmd.split(' ')[0]}' is not recognized as the name of a cmdlet.`;
        isError = true;
      }

      setHistory(prev => [...prev, { type: 'output', content: output, isError }]);
      setIsRunning(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isRunning) {
      handleCommand();
    }
  };

  const clear = () => {
    setInstalledPackages([]);
    setHistory([{ type: 'system', content: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nTry typing "pip list" or "pip install requests".' }]);
    setInput('');
  };

  const quickCommands = [
    { cmd: 'pip install requests', label: 'ดาวน์โหลดไลบรารี requests' },
    { cmd: 'pip install pygame', label: 'ดาวน์โหลดไลบรารี pygame' },
    { cmd: 'pip list', label: 'ดูรายชื่อไลบรารีทั้งหมดในเครื่อง' },
    { cmd: 'pip uninstall requests', label: 'ถอนการติดตั้งไลบรารี requests' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Package size={20} className="stroke-2" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900">การติดตั้งไลบรารีด้วย pip</h3>
              <p className="font-base text-sm leading-relaxed text-slate-500 mt-1">
                จำลองการใช้งานคำสั่ง pip เพื่อดาวน์โหลด จัดการ และลบ Python Packages
              </p>
            </div>
          </div>
          {installedPackages.length > 0 && (
            <div className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-bold flex items-center gap-2">
              <Package size={14} /> ติดตั้งแล้ว {installedPackages.length} แพ็คเกจ
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Quick Commands */}
          <div className="w-full lg:w-72 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-600" />
              คำสั่งลัด (ทดลองกดได้เลย)
            </h4>
            
            <div className="space-y-3 flex-1">
              {quickCommands.map((q, idx) => (
                <button key={idx} onClick={() => { setInput(q.cmd); }} disabled={isRunning}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                  <code className="text-[11px] font-bold text-indigo-600 mb-1 block">{q.cmd}</code>
                  <div className="text-xs text-slate-600">{q.label}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> ภารกิจของคุณ
              </h4>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                ลองกดปุ่ม <code className="bg-emerald-100 px-1 rounded">pip install requests</code> ดูผลลัพธ์ใน Terminal ด้านล่าง 
                จากนั้นลองสั่ง <code className="bg-emerald-100 px-1 rounded">pip list</code> เพื่อตรวจสอบว่าติดตั้งสำเร็จหรือไม่
              </p>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">คำสั่งที่ควรรู้</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h5 className="font-bold text-emerald-700 font-mono text-sm mb-2">pip install [package]</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ดาวน์โหลดไลบรารีจากคลังแสงส่วนกลางของ Python (PyPI) มาลงในเครื่องของเรา 
                  เราจำเป็นต้องต่ออินเทอร์เน็ตในการใช้คำสั่งนี้
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h5 className="font-bold text-blue-700 font-mono text-sm mb-2">pip list</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  แสดงตารางรายชื่อไลบรารีทั้งหมดที่ถูกติดตั้งเอาไว้ในสภาพแวดล้อมปัจจุบันของเรา (Environment) พร้อมบอกเวอร์ชันด้วย
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h5 className="font-bold text-red-600 font-mono text-sm mb-2">pip uninstall [package]</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ถอนการติดตั้งไลบรารีที่ไม่ได้ใช้แล้วออกไป เพื่อประหยัดพื้นที่และลดความซับซ้อนของโปรเจกต์
                </p>
              </div>
              
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                 <button onClick={clear} disabled={isRunning}
                  className="w-full h-full min-h-[80px] bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <RotateCcw size={16} /> ล้างข้อมูลทั้งหมด
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-64 bg-[#1e1e1e] p-4 font-mono text-[14px] overflow-y-auto flex flex-col w-full border-t border-slate-800 cursor-text relative"
             onClick={() => document.getElementById('pip-terminal-input').focus()}>
          
          <div className="flex-1 flex flex-col">
            {history.map((line, idx) => (
              <div key={idx} className={`mb-1 whitespace-pre-wrap ${line.type === 'input' ? 'text-emerald-400' : line.isError ? 'text-red-400' : line.content.includes('Successfully') ? 'text-emerald-400' : 'text-slate-300'}`}>
                {line.content}
              </div>
            ))}
            
            {isRunning ? (
              <div className="flex items-center text-sky-400 mt-1 gap-2">
                <Loader2 size={14} className="animate-spin" /> กำลังประมวลผลคำสั่ง...
              </div>
            ) : (
              <div className="flex items-center text-emerald-400 mt-1">
                <span className="mr-2 select-none">PS C:\Users\Student&gt;</span>
                <input id="pip-terminal-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-emerald-400"
                  spellCheck="false" autoComplete="off" />
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
