import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  RefreshCcw, 
  CheckCircle2, 
  Terminal, 
  Monitor, 
  Code2, 
  AlertCircle, 
  Download, 
  CheckSquare, 
  Square, 
  BoxSelect, 
  Apple, 
  Gamepad2,
  BookOpen,
  Copy,
  ArrowRight,
  Info,
  Check
} from 'lucide-react';

// ==========================================
// 1. TeacherTask Component (Standardized Footer)
// ==========================================
const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      {/* Vibrant Gradient Background for Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 border border-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-pink-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-pink-300 hover:text-pink-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]'
            }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. Main pyUnit1_5_SetupGuide Component
// ==========================================
export default function pyUnit1_5_SetupGuide() {
  const [os, setOs] = useState('windows');
  const [activeStep, setActiveStep] = useState('python'); // 'python', 'vscode'
  const [simState, setSimState] = useState('idle'); // idle, installing, success, error
  const [pathChecked, setPathChecked] = useState(false);
  const [logs, setLogs] = useState([]);
  const [completedSteps, setCompletedSteps] = useState({ python: false, vscode: false });

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
        addLog("Installation Warning: 'Add Python to PATH' NOT checked!", "error");
        addLog("Error: Command Prompt will not recognize the 'python' command.", "error");
        addLog("Suggestion: Restart setup and make sure to check the box 'Add Python 3.13 to PATH'", "warn");
        return;
      }
      setSimState('installing');
      addLog("Initializing Python 3.13 Windows Installer...", "sys");
      
      setTimeout(() => addLog("Extracting standard libraries & modules...", "info"), 600);
      setTimeout(() => addLog("Updating Environment Variables (PATH)...", "info"), 1200);
      setTimeout(() => addLog("Registering pip package manager...", "success"), 1800);
      setTimeout(() => {
        setSimState('success');
        addLog("✅ Python 3.13 Setup was successful.", "success");
        addLog("You can now open CMD and run: python --version", "success");
        setCompletedSteps(prev => ({ ...prev, python: true }));
      }, 2400);
    } else {
      // MacOS
      setSimState('installing');
      addLog("macOS Terminal: Initiating Homebrew installation...", "sys");
      addLog("Executing command: brew install python@3.13", "sys");

      setTimeout(() => addLog("==> Downloading https://formulae.brew.sh/api/formula/python", "info"), 600);
      setTimeout(() => addLog("==> Installing python@3.13 dependency libraries...", "info"), 1200);
      setTimeout(() => addLog("==> Pouring python@3.13.0.arm64_sequoia.bottle.tar.gz", "success"), 1800);
      setTimeout(() => {
        setSimState('success');
        addLog("🍺 python@3.13 has been installed successfully!", "success");
        addLog("Accessible via terminal command: python3 --version", "success");
        setCompletedSteps(prev => ({ ...prev, python: true }));
      }, 2400);
    }
  };

  const handleInstallVsCode = () => {
    setSimState('installing');
    addLog("VS Code Extension Manager: Connecting to Marketplace...", "sys");
    
    setTimeout(() => addLog("Downloading Microsoft Python Extension (ms-python.python)...", "info"), 600);
    setTimeout(() => addLog("Installing Intellisense Engine (Pylance)...", "info"), 1200);
    setTimeout(() => addLog("Registering default Python interpreter mapping...", "success"), 1800);
    setTimeout(() => {
      setSimState('success');
      addLog("✅ Python Extension for VS Code installed and active.", "success");
      addLog("Intellisense, Auto-Completion, and Debugger features are now fully enabled.", "success");
      setCompletedSteps(prev => ({ ...prev, vscode: true }));
    }, 2400);
  };

  const fullSuccess = completedSteps.python && completedSteps.vscode;

  const teacherTaskContent = `[โจทย์ปฏิบัติประจำบทเรียน 1.5: Python & IDE Setup Lab]

โจทย์ข้อที่ 1 (วินิจฉัยบั๊ก):
หากนักเรียนสั่งติดตั้ง Python 3.13 บน Windows แล้วลืมติ๊กช่อง "Add Python to PATH"
ก. จะส่งผลอย่างไรเมื่อเราพิมพ์คำสั่ง "python" ใน Command Prompt?
ข. จงบอกวิธีการจำลองแก้ไขสถานการณ์นี้ หากเกิดเหตุการณ์ดังกล่าวในการทำงานจริง

โจทย์ข้อที่ 2 (ทดสอบการทำงาน):
หลังจากทำลองใช้ Simulator การติดตั้งเรียบร้อยแล้ว ให้นักเรียนจำลองการตอบคำถามดังนี้:
ก. การเรียกเช็คเวอร์ชัน Python ของ Windows และ macOS ในโปรแกรม Terminal มีคำสั่งต่างกันอย่างไร?
ข. เพราะเหตุใด เราจึงจำเป็นต้องลง "Python Extension" ในโปรแกรม VS Code ทั้งๆ ที่ติดตั้งตัวโปรแกรมหลัก Python ไปแล้ว?`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-800 pb-24 relative overflow-hidden">
      
      {/* Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-200/20 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-200/20 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Standardized Hero Header */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-600 border border-pink-200">
                เตรียมความพร้อมก่อนการเขียนโปรแกรม
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                รหัสวิชา 21910-1003
              </span>
            </div>
            
            <h2 className="text-sm font-bold tracking-widest text-pink-600 mb-2 uppercase">
              หน่วยที่ 1: หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              1.5 การติดตั้ง Python และ IDE <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                (Installing Python and IDE Setup Guide)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-pink-500 pl-6 mt-4 relative">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              การพัฒนาโปรแกรมจำเป็นต้องพึ่งพาเครื่องมือ 2 ส่วนหลัก คือ <strong>ตัวแปลความหมายภาษา (Python Interpreter)</strong> เพื่อแปลงโค้ดไปสู่ภาษาเครื่อง และ <strong>เครื่องมือแก้ไขโค้ด (VS Code Editor)</strong> ซึ่งช่วยในการพิมพ์ ทดสอบ และควบคุมบั๊กอย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>
      </header>

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Step Progression Visualizer */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="p-3 bg-pink-50 rounded-2xl text-pink-600 border border-pink-100 shrink-0">
              <Settings className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <div>
              <h3 className="font-bold text-slate-850">ขั้นตอนการติดตั้งสภาพแวดล้อมใช้งาน</h3>
              <p className="text-xs text-slate-500 mt-0.5">ติดตั้งตัวประมวลผลหลัก และจับคู่เข้ากับโปรแกรมเขียนรหัสให้เสร็จสมบูรณ์</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Step 1 badge */}
            <div className={`flex-1 md:flex-initial flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs transition-all ${
              completedSteps.python 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${completedSteps.python ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span>1. Python Interpreter</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-350 hidden md:block" />

            {/* Step 2 badge */}
            <div className={`flex-1 md:flex-initial flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs transition-all ${
              completedSteps.vscode 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${completedSteps.vscode ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span>2. VS Code Extension</span>
            </div>
          </div>
        </div>

        {/* Combined Installation Studio Card */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
          {/* Controls Header */}
          <div className="p-6 bg-slate-50/60 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2.5">
              {/* OS Selector group */}
              <div className="bg-white border border-slate-200 p-1 rounded-xl flex shadow-sm">
                <button
                  onClick={() => { setOs('windows'); setActiveStep('python'); }}
                  disabled={simState === 'installing'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    os === 'windows' ? 'bg-blue-600 text-white' : 'text-slate-550 hover:bg-slate-50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Windows
                </button>
                <button
                  onClick={() => { setOs('mac'); setActiveStep('python'); }}
                  disabled={simState === 'installing'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    os === 'mac' ? 'bg-slate-800 text-white' : 'text-slate-550 hover:bg-slate-50'
                  }`}
                >
                  <Apple className="w-3.5 h-3.5" /> macOS
                </button>
              </div>

              {/* Step selector group */}
              <div className="bg-white border border-slate-200 p-1 rounded-xl flex shadow-sm">
                <button
                  onClick={() => setActiveStep('python')}
                  disabled={simState === 'installing'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    activeStep === 'python' ? 'bg-pink-600 text-white' : 'text-slate-550 hover:bg-slate-50'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" /> 1. ติดตั้ง Python
                </button>
                <button
                  onClick={() => setActiveStep('vscode')}
                  disabled={simState === 'installing'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    activeStep === 'vscode' ? 'bg-pink-600 text-white' : 'text-slate-550 hover:bg-slate-50'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> 2. ตั้งค่า VS Code Extension
                </button>
              </div>
            </div>

            <button
              onClick={resetSimulator}
              disabled={simState === 'installing'}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm bg-white active:scale-95"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> เริ่มทดลองใหม่
            </button>
          </div>

          {/* Double split preview area */}
          <div className="flex flex-col lg:flex-row min-h-[420px] border-b border-slate-200">
            
            {/* Left Box: Graphic Mock Window */}
            <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex items-center justify-center border-r border-slate-200 relative">
              
              {/* Step 1: Windows Mockup */}
              {activeStep === 'python' && os === 'windows' && (
                <div className="w-full max-w-sm bg-slate-50 border border-slate-350 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
                  {/* Top Bar */}
                  <div className="bg-white px-4 py-3 border-b border-slate-250 flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-2"><Download className="w-3.5 h-3.5 text-blue-500" /> Python 3.13.0 (64-bit) Setup</span>
                    <button onClick={resetSimulator} className="text-slate-400 hover:text-slate-700">✕</button>
                  </div>
                  
                  {/* Main Setup Content */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-800">Install Python 3.13.0</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">เลือกรูปแบบความปลอดภัยเพื่อติดตั้งตัวคอมไพเลอร์ของภาษาลงในดิสก์หลักของอุปกรณ์ของคุณ</p>
                    </div>

                    <div className="bg-white border border-slate-250 hover:bg-slate-50 cursor-pointer p-4 rounded-xl flex items-start gap-3 transition-colors shadow-sm">
                      <span className="text-2xl pt-1">🛡️</span>
                      <div>
                        <div className="font-extrabold text-xs md:text-sm text-slate-800">Install Now (ติดตั้งตอนนี้)</div>
                        <div className="text-[10px] text-slate-450 mt-1 font-mono">C:\Users\Admin\AppData\Local\Programs\Python313</div>
                      </div>
                    </div>

                    {/* PATH toggle check box */}
                    <div 
                      onClick={() => simState === 'idle' && setPathChecked(!pathChecked)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        pathChecked 
                          ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200'
                      }`}
                    >
                      {pathChecked ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-350 shrink-0" />}
                      <div className="flex-1 text-left">
                        <span className="text-xs font-extrabold block">Add Python 3.13 to PATH</span>
                        <span className="text-[9px] block text-slate-400 font-medium">เพิ่มลงในระบบเพื่อเรียกใช้คำสั่งผ่าน Command Prompt ทั่วไป</span>
                      </div>
                      <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-200 animate-pulse shrink-0">สำคัญมาก!</span>
                    </div>

                    {/* Footer Setup Actions */}
                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                      <button onClick={resetSimulator} className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-xs bg-white">Cancel</button>
                      <button 
                        onClick={handleInstallPython}
                        disabled={simState !== 'idle'}
                        className={`px-5 py-2 font-bold text-xs rounded-lg text-white shadow-sm transition-all active:scale-95 ${
                          simState !== 'idle' ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                      >
                        Install
                      </button>
                    </div>
                  </div>

                  {/* Absolute Loader Screens */}
                  {simState === 'installing' && (
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs font-bold text-slate-700">กำลังสแกนและประมวลผลติดตั้งไฟล์...</span>
                    </div>
                  )}

                  {simState === 'success' && (
                    <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                      <span className="text-base font-extrabold text-slate-800">Setup was successful</span>
                      <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">ติดตั้ง Python Interpreter และ PIP สำหรับ Windows สำเร็จสมบูรณ์แล้ว</p>
                      <button onClick={resetSimulator} className="mt-5 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all">Close Window</button>
                    </div>
                  )}

                  {simState === 'error' && (
                    <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center border-4 border-rose-500 animate-in zoom-in-95 duration-300">
                      <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
                      <span className="text-base font-extrabold text-slate-800">PATH Check Failed!</span>
                      <p className="text-xs text-rose-600 font-bold mt-2 max-w-[240px] leading-relaxed">
                        คุณไม่ได้ติ๊กเครื่องหมายถูกที่ช่อง <br className="hidden md:block"/> "Add Python 3.13 to PATH"
                      </p>
                      <button onClick={resetSimulator} className="mt-5 px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg active:scale-95 transition-all">กลับไปทำใหม่</button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 1: macOS Terminal Mockup */}
              {activeStep === 'python' && os === 'mac' && (
                <div className="w-full max-w-sm bg-[#1E1E1E] rounded-2xl shadow-xl overflow-hidden border border-zinc-700 font-mono text-[10px] md:text-xs animate-in zoom-in-95 duration-300">
                  <div className="bg-[#2D2D2D] px-4 py-2.5 flex items-center justify-between border-b border-black">
                    <div className="flex gap-1.5 select-none">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-zinc-500 text-[10px] font-sans">user@macbook-pro ~ zsh</span>
                    <span className="w-6"></span>
                  </div>
                  <div className="p-4 text-zinc-400 h-64 flex flex-col justify-start gap-2 overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">➜</span>
                      <span className="text-sky-400">~</span>
                      {simState === 'idle' ? (
                        <button 
                          onClick={handleInstallPython}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-3 py-1 rounded-md text-[10px] animate-pulse transition-all active:scale-95"
                        >
                          คลิกพิมพ์: brew install python@3.13
                        </button>
                      ) : (
                        <span>brew install python@3.13</span>
                      )}
                    </div>

                    {simState === 'installing' && (
                      <div className="text-zinc-500 space-y-1.5 animate-in fade-in duration-200">
                        <div>==&gt; Downloading https://ghcr.io/v2/homebrew/core/python/3.13...</div>
                        <div className="text-sky-400">######################################## 100.0%</div>
                        <div>==&gt; Pouring python@3.13.0.arm64_sequoia.bottle.tar.gz</div>
                      </div>
                    )}

                    {simState === 'success' && (
                      <div className="text-zinc-500 space-y-1.5 animate-in fade-in duration-300">
                        <div>==&gt; Downloading https://ghcr.io/v2/homebrew/core/python/3.13...</div>
                        <div className="text-sky-400">######################################## 100.0%</div>
                        <div>==&gt; Pouring python@3.13.0.arm64_sequoia.bottle.tar.gz</div>
                        <div className="text-emerald-400 font-bold mt-2">🍺 python@3.13 has been installed!</div>
                        <div className="flex items-center gap-2 mt-4 text-zinc-400">
                          <span className="text-emerald-400">➜</span>
                          <span className="text-sky-400">~</span>
                          <span className="w-1.5 h-4 bg-zinc-400 animate-ping"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: VS Code Mockup Extension */}
              {activeStep === 'vscode' && (
                <div className="w-full max-w-sm bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden border border-zinc-700 animate-in zoom-in-95 duration-300 flex font-sans">
                  {/* Activity Bar */}
                  <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-zinc-700 shrink-0">
                    <span className="text-xl text-zinc-650 cursor-pointer">📁</span>
                    <span className="text-xl text-zinc-650 cursor-pointer">🔍</span>
                    <BoxSelect className="w-6 h-6 text-white bg-blue-600 rounded p-0.5 cursor-pointer shadow-sm shadow-blue-500/30" />
                  </div>

                  {/* Sidebar Extension */}
                  <div className="flex-1 p-4 flex flex-col bg-[#252526] select-none text-left">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-3">EXTENSIONS: MARKETPLACE</div>
                    
                    {/* Search Mockup */}
                    <div className="bg-[#3c3c3c] border border-zinc-600 rounded-lg p-1.5 text-xs text-zinc-300 mb-4 font-mono">
                      python
                    </div>

                    {/* Extension Detail Item */}
                    <div className="flex gap-3 bg-[#37373d] p-3 rounded-xl border border-zinc-600 shadow-sm relative group">
                      <div className="w-10 h-10 bg-slate-900 border border-zinc-750 rounded-xl shrink-0 flex items-center justify-center text-xl">
                        🐍
                      </div>
                      
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-start">
                          <span className="text-white text-xs font-bold block">Python</span>
                          
                          {simState === 'idle' && (
                            <button 
                              onClick={handleInstallVsCode}
                              className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md animate-pulse transition-all active:scale-95"
                            >
                              Install
                            </button>
                          )}
                          {simState === 'installing' && (
                            <span className="text-zinc-500 text-[10px] font-bold">Installing...</span>
                          )}
                          {simState === 'success' && (
                            <Settings className="w-4 h-4 text-zinc-500" />
                          )}
                        </div>

                        <span className="text-[10px] text-zinc-500 block">Microsoft</span>
                        <span className="text-[9px] text-zinc-400 block truncate mt-1">Rich support for Python language...</span>
                      </div>
                    </div>

                    {/* Installed Status Feedback screen */}
                    {simState === 'success' && (
                      <div className="mt-auto bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl text-center animate-in slide-in-from-bottom-2 duration-300">
                        <Check className="w-5 h-5 text-emerald-400 mx-auto mb-1 animate-pulse" />
                        <span className="text-emerald-400 text-[10px] font-bold">Extension Active</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Instructions / Guide Details */}
            <div className="w-full lg:w-1/2 flex flex-col bg-white p-6 justify-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 border border-pink-200">
                    Step Guide
                  </span>
                  <span className="text-xs text-slate-400">Documentation</span>
                </div>

                <h4 className="text-2xl font-extrabold text-slate-800">
                  {activeStep === 'python' ? `ติดตั้ง Python บน ${os === 'windows' ? 'Windows OS' : 'macOS'}` : 'ติดตั้ง VS Code Extension'}
                </h4>

                {activeStep === 'python' && os === 'windows' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      การติดตั้งบน Windows จุดชี้วัดความเป็นความตายของโปรแกรมคือการตั้งค่า <strong>ตัวแปรระบบ (PATH)</strong> เพื่อให้คำสั่งย่อยใน CMD สามารถหาที่ตั้งของตัวประมวลผลคำสั่ง Python เจอ
                    </p>
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                      <div className="text-xs text-rose-800 leading-relaxed font-sans">
                        <span className="font-bold">กฎวิกฤต: </span>
                        ห้ามลืมข้ามการทำสัญลักษณ์ติ๊กถูกในกล่อง <strong className="underline">Add Python 3.13 to PATH</strong> ก่อนที่จะดำเนินการคลิก Install เด็ดขาด!
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 'python' && os === 'mac' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      บนระบบปฏิบัติการ macOS การติดตั้งที่ดีที่สุดคือการเรียกใช้ผ่านเครื่องมือจัดการแพ็คเกจที่ชื่อว่า <strong>Homebrew</strong> เพราะปลอดภัยและบริหารจัดการรุ่นภาษาได้มีประสิทธิภาพสูงสุด
                    </p>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5">
                      <Terminal className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
                      <div className="text-xs text-blue-800 leading-relaxed font-sans">
                        เรียกเปิดโปรแกรม Terminal ของระบบ จากนั้นเพียงคลิกที่ปุ่มจำลองการพิมพ์คำสั่งในหน้าต่างสีดำทางซ้าย เพื่อเริ่มจำลองการรันระบบ
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 'vscode' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      แม้คุณจะสามารถติดตั้งตัวประมวลภาษา Python หลักเสร็จสิ้นแล้ว แต่โปรแกรมเขียนโค้ดอย่าง VS Code จะยังไม่รู้จักและไม่สามารถตรวจความผิดพลาดได้ จึงต้องพึ่งพา <strong>Extension สำหรับการจัดสคริปต์</strong>
                    </p>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs text-slate-600 leading-relaxed">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>เปิดแถบเมนู Extensions (ไอคอนบล็อก 4 ชิ้น)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>ค้นหาชุดโปรแกรมคำสำคัญ: <strong>Python</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>คลิกปุ่ม Install เพื่อเปิดใช้เครื่องมือช่วยเหลือ</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive success display when completed */}
                {fullSuccess && (
                  <div className="animate-in slide-in-from-bottom-4 duration-500 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                    <Gamepad2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                    <h5 className="font-extrabold text-emerald-950 text-sm">การตั้งค่าสมบูรณ์แบบ 100%!</h5>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      คุณจำลองการติดตั้ง Python Interpreter และติดตั้ง VS Code Extension สำเร็จ ครบถ้วน พร้อมที่จะเขียนโปรแกรมภาษาไพทอนจริงแล้ว
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom VS Code Terminal console */}
          <div className="bg-[#121214] p-4 font-mono text-[11px] md:text-xs border-t border-zinc-900">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Terminal className="w-4 h-4 text-pink-400 animate-pulse" /> Environment Setup Console Logs
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${simState === 'installing' ? 'bg-pink-500 animate-ping' : simState === 'success' ? 'bg-emerald-500' : simState === 'error' ? 'bg-rose-500' : 'bg-zinc-650'}`}></span>
                <span className="text-[9px] text-zinc-600 tracking-widest font-sans font-bold">READY</span>
              </div>
            </div>

            <div className="h-44 overflow-y-auto space-y-1.5 text-zinc-300">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-150">
                  <span className="text-zinc-650 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 font-bold uppercase w-10 ${
                    log.type === 'error' ? 'text-rose-400 animate-pulse' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400 font-bold' :
                    log.type === 'sys' ? 'text-pink-400 font-semibold' : 'text-zinc-400'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={
                    log.type === 'error' ? 'text-rose-300 font-semibold' :
                    log.type === 'warn' ? 'text-amber-350' :
                    log.type === 'success' ? 'text-emerald-350' :
                    log.type === 'sys' ? 'text-pink-200' : 'text-zinc-300'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-zinc-600 italic select-none">Waiting for system installations triggers...</div>}
            </div>
          </div>

        </div>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="งานที่ได้รับมอบหมาย: การติดตั้งและเตรียมเครื่องมือเขียนโปรแกรม" 
          taskText={teacherTaskContent} 
        />

      </main>

    </div>
  );
}
