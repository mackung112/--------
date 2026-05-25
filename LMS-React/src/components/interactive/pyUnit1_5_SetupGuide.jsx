import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Settings, RefreshCcw, CheckCircle2, Terminal, Monitor, Code2, AlertCircle, Download, CheckSquare, Square, BoxSelect, Apple, Gamepad2 } from 'lucide-react';




export default function pyUnit1_5_SetupGuide() {
  const [os, setOs] = useState('windows');
  const [activeStep, setActiveStep] = useState('python'); // 'python', 'vscode'
  const [simState, setSimState] = useState('idle'); // idle, installing, success, error
  const [pathChecked, setPathChecked] = useState(false);
  const [logs, setLogs] = useState([]);
  const [quizScore, setQuizScore] = useState(0);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  useEffect(() => {
    resetSimulator();
  }, [os, activeStep]);

  const resetSimulator = () => {
    setSimState('idle');
    setPathChecked(false);
    setLogs([]);
  };

  const handleInstallPython = () => {
    if (os === 'windows') {
      if (!pathChecked) {
        setSimState('error');
        addLog("Installation Warning: 'Add Python to PATH' not checked!", "warn");
        addLog("Python installed, but cannot be run from Command Prompt easily.", "error");
        return;
      }
      setSimState('installing');
      addLog("Starting Python 3.13 installation...", "sys");
      setTimeout(() => addLog("Copying standard libraries...", "info"), 800);
      setTimeout(() => addLog("Updating System PATH variables...", "success"), 1600);
      setTimeout(() => {
        setSimState('success');
        addLog("Python 3.13 Setup was successful.", "success");
        setQuizScore(s => s + 1);
      }, 2500);
    } else {
      // Mac
      setSimState('installing');
      addLog("Running: brew install python", "sys");
      setTimeout(() => addLog("Downloading formulas...", "info"), 800);
      setTimeout(() => addLog("Installing python@3.13...", "success"), 1600);
      setTimeout(() => {
        setSimState('success');
        addLog("Python installed successfully. Accessible via 'python3'.", "success");
        setQuizScore(s => s + 1);
      }, 2500);
    }
  };

  const handleInstallVsCode = () => {
    setSimState('installing');
    addLog("Opening VS Code Extensions Marketplace...", "sys");
    setTimeout(() => addLog("Downloading Python Extension by Microsoft...", "info"), 800);
    setTimeout(() => addLog("Installing Intellisense & Pylance...", "success"), 1600);
    setTimeout(() => {
      setSimState('success');
      addLog("VS Code is now ready for Python development.", "success");
      setQuizScore(s => s + 1);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Download className="w-3 h-3" /> Setup Explorer
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
              Simulator
            </span>
          </div>
          <button 
            onClick={resetSimulator}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> เริ่มใหม่
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">จำลองการติดตั้งเครื่องมือพัฒนา</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          ฝึกจำลองการติดตั้ง Python และ VS Code ให้ถูกต้อง โดยเฉพาะขั้นตอนสำคัญอย่างการตั้งค่า PATH
        </p>

        {/* OS & Step Selector */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-white border border-slate-200 p-1 rounded-lg inline-flex">
            <button 
              onClick={() => setOs('windows')} 
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${os === 'windows' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-200' : 'text-slate-500 hover:bg-slate-50 border border-transparent'}`}
            >
              <Monitor className="w-4 h-4" /> Windows
            </button>
            <button 
              onClick={() => setOs('mac')} 
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${os === 'mac' ? 'bg-slate-100 text-slate-800 shadow-sm border border-slate-300' : 'text-slate-500 hover:bg-slate-50 border border-transparent'}`}
            >
              <Apple className="w-4 h-4" /> macOS
            </button>
          </div>
          
          <div className="w-px bg-slate-200 my-1"></div>

          <div className="bg-white border border-slate-200 p-1 rounded-lg inline-flex">
            <button 
              onClick={() => setActiveStep('python')} 
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeStep === 'python' ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-200' : 'text-slate-500 hover:bg-slate-50 border border-transparent'}`}
            >
              <Terminal className="w-4 h-4" /> 1. ติดตั้ง Python
            </button>
            <button 
              onClick={() => setActiveStep('vscode')} 
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeStep === 'vscode' ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-200' : 'text-slate-500 hover:bg-slate-50 border border-transparent'}`}
            >
              <Code2 className="w-4 h-4" /> 2. ติดตั้ง VS Code
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (The Installer Mock) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex items-center justify-center border-r border-slate-200 relative">
          
          {activeStep === 'python' && os === 'windows' && (
            <div className="w-full max-w-sm bg-slate-50 border border-slate-300 rounded shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-white px-4 py-2 border-b border-slate-300 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800">Python 3.13.0 Setup</span>
                <span className="text-slate-600">✕</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-medium text-slate-800 mb-4">Install Python 3.13.0</h4>
                <div className="space-y-4 mb-8">
                  <div className="border border-slate-300 p-3 bg-white text-slate-600 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-3">
                    <span className="text-blue-600 text-2xl px-2">🛡️</span>
                    <div>
                      <div className="font-bold">Install Now</div>
                      <div className="text-xs">C:\Users\User\AppData\Local\Programs\Python...</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 border border-blue-200 bg-blue-50 p-2 rounded cursor-pointer" onClick={() => simState === 'idle' && setPathChecked(!pathChecked)}>
                  {pathChecked ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-blue-600" />}
                  <span className="text-sm font-bold text-blue-900">Add Python 3.13 to PATH</span>
                  <span className="text-xs text-red-500 font-bold ml-auto">(สำคัญ!)</span>
                </div>

                <div className="flex justify-end gap-2 mt-4 border-t border-slate-200 pt-4">
                  <button className="px-4 py-1.5 border border-slate-300 rounded text-slate-600 text-sm bg-slate-100">Cancel</button>
                  <button 
                    onClick={handleInstallPython}
                    disabled={simState !== 'idle'}
                    className={`px-6 py-1.5 rounded text-white text-sm ${simState !== 'idle' ? 'bg-slate-400' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    Install
                  </button>
                </div>
              </div>
              
              {simState === 'installing' && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center">
                  <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                  <span className="text-sm font-bold text-slate-700">Installing...</span>
                </div>
              )}
              {simState === 'success' && (
                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
                  <span className="text-lg font-bold text-slate-800 mb-2">Setup was successful</span>
                  <p className="text-xs text-slate-700 mb-4">Python and pip are now ready to use.</p>
                  <button onClick={resetSimulator} className="px-6 py-1.5 rounded text-white text-sm bg-slate-800">Close</button>
                </div>
              )}
              {simState === 'error' && (
                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center border-4 border-red-500">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
                  <span className="text-lg font-bold text-slate-800 mb-2">PATH Not Configured!</span>
                  <p className="text-xs text-red-600 font-medium mb-4">คุณลืมติ๊กช่อง Add Python to PATH<br/>จะทำให้ Command Prompt หาคำสั่ง python ไม่เจอ</p>
                  <button onClick={resetSimulator} className="px-6 py-1.5 rounded text-white text-sm bg-slate-800">ลองใหม่</button>
                </div>
              )}
            </div>
          )}

          {activeStep === 'python' && os === 'mac' && (
            <div className="w-full max-w-sm bg-[#1E1E1E] rounded-xl shadow-xl overflow-hidden border border-slate-700 font-mono text-xs animate-in zoom-in-95 duration-300">
              <div className="bg-[#2D2D2D] px-3 py-2 flex items-center gap-2 border-b border-black">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="mx-auto text-slate-600 text-xs">user@macbook ~ zsh</span>
              </div>
              <div className="p-4 text-slate-600 h-64 flex flex-col">
                <div className="mb-2">
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> 
                  {simState === 'idle' && (
                    <button onClick={handleInstallPython} className="ml-2 bg-slate-700 hover:bg-slate-600 text-white px-2 py-0.5 rounded transition-colors animate-pulse">
                      พิมพ์คำสั่ง: brew install python
                    </button>
                  )}
                  {simState !== 'idle' && <span className="ml-2">brew install python</span>}
                </div>
                {simState === 'installing' && (
                  <div className="mt-2 text-slate-600 space-y-1">
                    <div>=={'>'} Downloading https://ghcr.io/v2/homebrew/core/python/3.13...</div>
                    <div className="text-blue-400">######################################## 100.0%</div>
                    <div>=={'>'} Pouring python@3.13.0.arm64_sonoma.bottle.tar.gz</div>
                  </div>
                )}
                {simState === 'success' && (
                  <div className="mt-2 text-slate-600 space-y-1">
                    <div>=={'>'} Downloading https://ghcr.io/v2/homebrew/core/python/3.13...</div>
                    <div className="text-blue-400">######################################## 100.0%</div>
                    <div>=={'>'} Pouring python@3.13.0.arm64_sonoma.bottle.tar.gz</div>
                    <div className="text-green-400 font-bold mt-2">🍺 python@3.13 has been installed!</div>
                    <div className="mt-4"><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeStep === 'vscode' && (
            <div className="w-full max-w-sm bg-[#1e1e1e] rounded shadow-xl overflow-hidden border border-slate-700 animate-in zoom-in-95 duration-300 flex flex-row">
              {/* Activity Bar */}
              <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-slate-700">
                <div className="w-6 h-6 text-slate-700">📁</div>
                <div className="w-6 h-6 text-slate-700">🔍</div>
                <BoxSelect className="w-6 h-6 text-white bg-blue-600 rounded p-0.5" />
              </div>
              {/* Sidebar */}
              <div className="w-full p-4 flex flex-col bg-[#252526]">
                <div className="text-slate-600 text-xs uppercase mb-3">Extensions: Marketplace</div>
                <div className="bg-[#3c3c3c] border border-slate-600 rounded p-1 flex items-center mb-4">
                  <span className="text-slate-600 text-xs px-2">Python</span>
                </div>
                
                {/* Extension Item */}
                <div className="flex gap-3 bg-[#37373d] p-3 rounded border border-transparent hover:border-slate-500 cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded shrink-0 flex items-center justify-center">
                    <span className="text-2xl text-blue-600">🐍</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-white text-sm font-medium">Python</div>
                      {simState === 'idle' && (
                        <button onClick={handleInstallVsCode} className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded animate-pulse">
                          Install
                        </button>
                      )}
                      {simState === 'installing' && (
                        <span className="text-slate-600 text-[10px] px-2 py-0.5">Installing...</span>
                      )}
                      {simState === 'success' && (
                        <Settings className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div className="text-slate-600 text-[10px] mb-1">Microsoft</div>
                    <div className="text-slate-600 text-[10px] truncate">IntelliSense (Pylance), Linting, Debugging</div>
                  </div>
                </div>

                {simState === 'success' && (
                  <div className="mt-auto bg-green-900/50 border border-green-700 p-3 rounded text-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <span className="text-green-400 text-xs font-bold">Extension Active</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            
            <h4 className="text-xl font-bold text-slate-800 mb-2">
              {activeStep === 'python' ? `ติดตั้ง Python บน ${os === 'windows' ? 'Windows' : 'macOS'}` : 'ติดตั้ง VS Code Extension'}
            </h4>
            
            {activeStep === 'python' && os === 'windows' && (
              <div className="animate-in fade-in duration-500 mb-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  การติดตั้งบน Windows จำเป็นต้องตั้งค่าตัวแปรระบบ (Environment Variables) เพื่อให้ Windows รู้จักคำสั่ง `python`
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold">จุดสำคัญที่สุด: </span>
                    ห้ามลืมติ๊กถูกที่ช่อง <b>"Add Python to PATH"</b> (กรอบสีน้ำเงินทางซ้าย) ก่อนกดปุ่ม Install
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-1">วิธีทดสอบหลังติดตั้งเสร็จ</p>
                  <code className="text-xs text-indigo-600 font-mono">เปิด Command Prompt -{'>'} พิมพ์ python --version</code>
                </div>
              </div>
            )}

            {activeStep === 'python' && os === 'mac' && (
              <div className="animate-in fade-in duration-500 mb-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  บน macOS นิยมติดตั้งผ่านเครื่องมือชื่อ <b>Homebrew</b> (Package Manager) เพราะจัดการเวอร์ชันและการอัปเดตได้ง่ายกว่าการโหลดไฟล์ติดตั้งเอง
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-2 mb-4">
                  <Terminal className="w-5 h-5 shrink-0 text-blue-600" />
                  <div>
                    เปิดแอป Terminal แล้วกดปุ่มติดตั้งจำลองที่หน้าจอด้านซ้าย
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-1">วิธีทดสอบหลังติดตั้งเสร็จ</p>
                  <code className="text-xs text-indigo-600 font-mono">ใน Terminal -{'>'} พิมพ์ python3 --version</code><br/>
                  <span className="text-[10px] text-slate-700">(Mac ต้องเติมเลข 3 ต่อท้ายเสมอ)</span>
                </div>
              </div>
            )}

            {activeStep === 'vscode' && (
              <div className="animate-in fade-in duration-500 mb-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  แม้เราจะติดตั้งโปรแกรม VS Code ไว้แล้ว แต่มันยังไม่รู้จัก Python เราจึงต้องโหลด <b>Extension</b> เพื่อให้มันแสดงสี แนะนำโค้ด และรันโปรแกรมได้
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4 list-disc pl-5">
                  <li>ไปที่แท็บ Extensions (ไอคอนบล็อก 4 ชิ้น)</li>
                  <li>ค้นหาคำว่า Python</li>
                  <li>เลือกตัวที่พัฒนาโดย Microsoft แล้วกด Install</li>
                </ul>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <div>
                    ลองจำลองการติดตั้ง Extension ทางด้านซ้ายให้สำเร็จ
                  </div>
                </div>
              </div>
            )}

            {/* Gamification Area */}
            {quizScore >= 2 && (
              <div className="animate-in slide-in-from-bottom-4 duration-500 bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm mt-4 text-center">
                <Gamepad2 className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
                <h4 className="font-bold text-indigo-900 text-lg mb-1">ยินดีด้วย! คุณพร้อมเขียนโค้ดแล้ว</h4>
                <p className="text-sm text-indigo-700">
                  คุณจำลองการติดตั้งสำเร็จทั้ง 2 ขั้นตอน (ระบบสภาพแวดล้อมพร้อมใช้งาน)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {simState === 'installing' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${simState === 'installing' ? 'bg-green-500' : simState === 'success' ? 'bg-emerald-500' : simState === 'error' ? 'bg-red-500' : 'bg-slate-600'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Setup Log</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-700 mr-3 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 w-10 font-bold ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'sys' ? 'text-blue-400' : 'text-slate-300'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={`flex-1 ${
                    log.type === 'error' ? 'text-red-300' :
                    log.type === 'warn' ? 'text-amber-300' :
                    log.type === 'success' ? 'text-emerald-300' :
                    log.type === 'sys' ? 'text-blue-200' : 'text-slate-300'
                  }`}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-slate-600 italic">Waiting for setup action...</div>}
            </div>
          </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
