import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Terminal, Layers, Server, Package, Smartphone, RefreshCcw, CheckCircle2, ChevronRight, Play, Cpu, HardDrive, Gamepad2, FileText } from 'lucide-react';

export default function PY21910_U1_L1_ProgramMeaning() {
  const [step, setStep] = useState(0); // 0: Hardware, 1: System, 2: Application, 3: Package, 4: Gamification
  const [logs, setLogs] = useState([]);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState(null); // 'idle', 'correct', 'wrong'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    let t1, t2;
    if (step === 0) {
      setLogs([{ time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: "Initializing Hardware Components...", type: "sys" }]);
      t1 = setTimeout(() => addLog("CPU: OK, RAM: OK, Disk: OK", "success"), 500);
      t2 = setTimeout(() => addLog("Waiting for Operating System (System Software)...", "warn"), 1000);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step]);

  const handleInstallSystem = () => {
    if (step < 1) {
      setStep(1);
      addLog("Installing System Software (OS)...", "sys");
      setTimeout(() => addLog("Windows 11 Kernel Loaded successfully.", "success"), 600);
      setTimeout(() => addLog("System is now ready for applications.", "info"), 1200);
    }
  };

  const handleInstallApplication = () => {
    if (step === 1) {
      setStep(2);
      addLog("Installing Application Software...", "sys");
      setTimeout(() => addLog("Custom POS System configured.", "success"), 600);
      setTimeout(() => addLog("Banking API integration complete.", "success"), 1200);
    }
  };

  const handleInstallPackage = () => {
    if (step === 2) {
      setStep(3);
      addLog("Installing Package Software...", "sys");
      setTimeout(() => addLog("Microsoft Office Suite installed.", "success"), 600);
      setTimeout(() => addLog("Google Chrome browser ready.", "success"), 1200);
      setTimeout(() => setShowQuiz(true), 2000);
    }
  };

  const resetSimulator = () => {
    setStep(0);
    setLogs([]);
    setScore(0);
    setShowQuiz(false);
    setQuizState(null);
    setCurrentQuestionIndex(0);
  };

  const quizQuestions = [
    { text: "ระบบปฏิบัติการ Android บนมือถือ จัดเป็นซอฟต์แวร์ประเภทใด?", options: ["System Software", "Application Software", "Package Software"], answer: 0 },
    { text: "โปรแกรม Microsoft Word ที่ซื้อมาใช้งานได้ทันที จัดเป็นประเภทใด?", options: ["System Software", "Application Software", "Package Software"], answer: 2 },
    { text: "ระบบเช็คชื่อนักเรียนที่โรงเรียนจ้างเขียนขึ้นมาเฉพาะ จัดเป็นประเภทใด?", options: ["System Software", "Application Software", "Package Software"], answer: 1 }
  ];

  const handleAnswer = (index) => {
    const isCorrect = index === quizQuestions[currentQuestionIndex].answer;
    if (isCorrect) {
      setQuizState('correct');
      setScore(s => s + 1);
      addLog(`Quiz: Correct answer for Q${currentQuestionIndex + 1}`, "success");
    } else {
      setQuizState('wrong');
      addLog(`Quiz: Incorrect answer for Q${currentQuestionIndex + 1}`, "error");
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setQuizState('idle');
      } else {
        setStep(4); // Finished Gamification
        addLog(`Quiz completed! Score: ${score + (isCorrect ? 1 : 0)}/${quizQuestions.length}`, "success");
      }
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* 1. Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Layers className="w-3 h-3" /> Architecture Explorer
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
        <h3 className="text-xl font-bold text-slate-900 mb-1">ชั้นโครงสร้างซอฟต์แวร์ (Software Stack)</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          คอมพิวเตอร์ไม่สามารถทำงานได้หากมีแค่ฮาร์ดแวร์ ทดลองประกอบชั้นซอฟต์แวร์ตามลำดับ เพื่อดูความสัมพันธ์และบทบาทของซอฟต์แวร์แต่ละประเภท
        </p>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col h-auto lg:min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (The Stack) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col items-center justify-end gap-3 border-r border-slate-200 relative overflow-hidden">
          
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>

          {/* Layer 3: Package Software */}
          <div className={`w-full max-w-sm rounded-xl border-2 transition-all duration-500 transform origin-bottom flex flex-col p-4 shadow-sm relative z-10
            ${step >= 3 ? 'bg-emerald-50 border-emerald-500 scale-100 opacity-100 translate-y-0' : 'bg-transparent border-dashed border-slate-300 scale-95 opacity-50 translate-y-4'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Package className="w-5 h-5" /> Package Software
              </div>
              {step >= 3 && <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-pulse" />}
            </div>
            <p className="text-xs text-emerald-600 mb-2 font-medium">ซอฟต์แวร์สำเร็จรูป (Word, Excel, Chrome)</p>
            {step < 3 && step >= 2 ? (
              <button onClick={handleInstallPackage} className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-md">
                ติดตั้ง Package Software
              </button>
            ) : (
              <div className="flex justify-around mt-2 opacity-70">
                <FileText className="w-6 h-6 text-emerald-600" />
                <Monitor className="w-6 h-6 text-emerald-600" />
              </div>
            )}
          </div>

          {/* Layer 2: Application Software */}
          <div className={`w-full max-w-sm rounded-xl border-2 transition-all duration-500 transform origin-bottom flex flex-col p-4 shadow-sm relative z-10
            ${step >= 2 ? 'bg-purple-50 border-purple-500 scale-100 opacity-100 translate-y-0' : 'bg-transparent border-dashed border-slate-300 scale-95 opacity-50 translate-y-4'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-purple-700 font-bold">
                <Smartphone className="w-5 h-5" /> Application Software
              </div>
              {step >= 2 && <CheckCircle2 className="w-5 h-5 text-purple-500" />}
            </div>
            <p className="text-xs text-purple-600 mb-2 font-medium">ซอฟต์แวร์ประยุกต์เฉพาะงาน (POS, แบงก์กิ้ง)</p>
            {step < 2 && step >= 1 ? (
              <button onClick={handleInstallApplication} className="mt-2 w-full py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 active:scale-95 transition-all shadow-md">
                ติดตั้ง Application Software
              </button>
            ) : (
              <div className="flex justify-around mt-2 opacity-70">
                <Gamepad2 className="w-6 h-6 text-purple-600" />
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
            )}
          </div>

          {/* Layer 1: System Software */}
          <div className={`w-full max-w-sm rounded-xl border-2 transition-all duration-500 transform origin-bottom flex flex-col p-4 shadow-sm relative z-10
            ${step >= 1 ? 'bg-blue-50 border-blue-500 scale-100 opacity-100 translate-y-0' : 'bg-transparent border-dashed border-slate-300 scale-95 opacity-50 translate-y-4'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <Monitor className="w-5 h-5" /> System Software
              </div>
              {step >= 1 && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-xs text-blue-600 mb-2 font-medium">ระบบปฏิบัติการ (Windows, macOS, Android)</p>
            {step < 1 && step >= 0 ? (
              <button onClick={handleInstallSystem} className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md">
                ติดตั้ง System Software
              </button>
            ) : (
              <div className="flex justify-around mt-2 opacity-70">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
            )}
          </div>

          {/* Layer 0: Hardware */}
          <div className="w-full max-w-sm bg-slate-800 border-2 border-slate-900 rounded-xl p-4 flex flex-col shadow-lg relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Cpu className="w-5 h-5 text-amber-400" /> Hardware
              </div>
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-slate-400 font-medium">ชิ้นส่วนอุปกรณ์ (CPU, RAM, Hard Disk)</p>
            <div className="flex justify-around mt-3">
              <Cpu className="w-6 h-6 text-slate-500" />
              <HardDrive className="w-6 h-6 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Right: Control / Explanation / Quiz */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          {/* Step Explanation Area */}
          <div className="p-6 flex-1 border-b border-slate-100">
            {step === 0 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-lg font-bold text-slate-900 mb-2">เริ่มต้นจาก Hardware</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  ฮาร์ดแวร์คือชิ้นส่วนเครื่องจักรกลที่จับต้องได้ แต่ตัวมันเองทำงานไม่ได้เลยหากไม่มี "วิญญาณ" หรือคำสั่งมาคอยควบคุม 
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex items-start gap-2">
                  <Play className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>ลองกดปุ่ม <b>ติดตั้ง System Software</b> ที่ฝั่งซ้าย เพื่อปลุกฮาร์ดแวร์ให้ตื่นขึ้น</span>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-lg font-bold text-blue-700 mb-2">System Software (ซอฟต์แวร์ระบบ)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  เปรียบเสมือน <b>"ผู้จัดการ"</b> ที่คอยควบคุมทรัพยากรฮาร์ดแวร์ (CPU, RAM) และเป็นตัวกลางให้ซอฟต์แวร์อื่นๆ มาทำงานบนเครื่องได้
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4 list-disc pl-5">
                  <li>ระบบปฏิบัติการคอมพิวเตอร์: Windows, macOS, Linux</li>
                  <li>ระบบปฏิบัติการมือถือ: iOS, Android</li>
                </ul>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                  <Play className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>เมื่อมี OS แล้ว เครื่องก็พร้อมติดตั้งซอฟต์แวร์ใช้งาน ลองติดตั้ง <b>Application Software</b></span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-lg font-bold text-purple-700 mb-2">Application Software (ซอฟต์แวร์ประยุกต์)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  ซอฟต์แวร์ที่สร้างขึ้นมาเพื่อ "ตอบโจทย์งานเฉพาะด้าน" มักเป็นโปรแกรมที่สั่งทำพิเศษหรือมีฟังก์ชันจำเพาะเจาะจงสูง
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4 list-disc pl-5">
                  <li>ระบบหน้าร้าน POS, ระบบคลังสินค้า</li>
                  <li>แอปพลิเคชันธนาคาร, เกมเฉพาะแพลตฟอร์ม</li>
                </ul>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800 flex items-start gap-2">
                  <Play className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>ยังมีซอฟต์แวร์อีกกลุ่มที่ซื้อแล้วใช้ได้ทันที ลองติดตั้ง <b>Package Software</b></span>
                </div>
              </div>
            )}

            {step >= 3 && !showQuiz && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="text-lg font-bold text-emerald-700 mb-2">Package Software (ซอฟต์แวร์สำเร็จรูป)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  เป็นซอฟต์แวร์ที่ผลิตออกมาขายเป็นชุดพร้อมใช้งาน (Off-the-shelf) สำหรับงานทั่วไปที่คนส่วนใหญ่ต้องการเหมือนๆ กัน
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4 list-disc pl-5">
                  <li>จัดการเอกสาร: Microsoft Word, Excel, PowerPoint</li>
                  <li>กราฟิกและสื่อ: Photoshop, Premiere Pro</li>
                </ul>
              </div>
            )}

            {/* Gamification / Quiz Area */}
            {showQuiz && step < 4 && (
              <div className="animate-in slide-in-from-bottom-4 duration-500 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-indigo-600" /> มินิควิซทดสอบความเข้าใจ
                  </h4>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {currentQuestionIndex + 1} / {quizQuestions.length}
                  </span>
                </div>
                
                <p className="text-sm text-slate-700 mb-4 font-medium leading-relaxed">
                  {quizQuestions[currentQuestionIndex].text}
                </p>

                <div className="space-y-2">
                  {quizQuestions[currentQuestionIndex].options.map((opt, idx) => {
                    let btnClass = "w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-300 ";
                    
                    if (quizState === null || quizState === 'idle') {
                      btnClass += "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 active:scale-95";
                    } else {
                      if (idx === quizQuestions[currentQuestionIndex].answer) {
                        btnClass += "bg-emerald-100 border-emerald-500 text-emerald-800 scale-100";
                      } else {
                        btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-50 scale-95 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={quizState !== null && quizState !== 'idle'}
                        className={btnClass}
                      >
                        <span className="inline-block w-6 text-center mr-2 opacity-50">{['A', 'B', 'C'][idx]}</span> 
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in-95 duration-500 bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-4xl">
                  {score === quizQuestions.length ? '🏆' : '👍'}
                </div>
                <h4 className="font-bold text-indigo-900 text-xl mb-1">ยอดเยี่ยมมาก!</h4>
                <p className="text-indigo-700 text-sm mb-4">คุณเข้าใจโครงสร้างของซอฟต์แวร์แล้ว</p>
                <div className="inline-block bg-white px-4 py-2 rounded-lg font-bold text-indigo-600 border border-indigo-100 shadow-sm">
                  คะแนนของคุณ: {score} / {quizQuestions.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Bottom Full-Width Console Output (VS Code Style) */}
        <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] text-green-400 p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider">System Log</span>
            </div>
            
            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-500 mr-3 shrink-0">[{log.time}]</span>
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
                    log.type === 'sys' ? 'text-blue-200' : 'text-green-300'
                  }`}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-slate-600 italic">Waiting for hardware initialization...</div>}
            </div>
          </div>
        </div>
      </div>
  );
}
