import React, { useState, useEffect, useRef } from 'react';
import { Download, Globe, AlertTriangle, Monitor, RotateCcw, CheckSquare, Settings } from 'lucide-react';

const steps = [
  { id: 0, title: 'เข้าเว็บไซต์', cmd: 'curl https://www.python.org/downloads', output: 'Found Python 3.12.x for Windows/macOS' },
  { id: 1, title: 'ดาวน์โหลดไฟล์', cmd: 'wget python-3.12-installer.exe', output: 'Downloading [====================] 100%' },
  { id: 2, title: 'ติดตั้ง', cmd: 'start python-3.12-installer.exe', output: 'Opening installer GUI...' },
  { id: 3, title: 'ตรวจสอบ', cmd: 'python --version', output: 'Python 3.12.4' }
];

export default function OOP21910_U1_L1_PythonInstallGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [checkboxes, setCheckboxes] = useState({ path: false, pip: false, launcher: false });
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Installation Simulator Ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleStep = (idx) => {
    setActiveStep(idx);
    const step = steps[idx];
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: step.cmd },
      { type: 'output', text: step.output }
    ]);
  };

  const handleCheckbox = (key, name) => {
    const val = !checkboxes[key];
    setCheckboxes(prev => ({ ...prev, [key]: val }));
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `Option '${name}' set to ${val ? 'TRUE' : 'FALSE'}` }
    ]);
  };

  const clear = () => {
    setActiveStep(0);
    setCheckboxes({ path: false, pip: false, launcher: false });
    setConsoleHistory([{ type: 'system', text: 'Python Installation Simulator Ready.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Download size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การติดตั้ง Python</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีดาวน์โหลดและติดตั้งตัวแปรภาษา (Interpreter) ของ Python พร้อมการตั้งค่าสำคัญอย่าง PATH
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button onClick={() => handleStep(0)}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeStep === 0 ? 'border-blue-500 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'
            }`}>
            <Globe size={16} /> <span className="hidden sm:inline">1. เว็บไซต์</span>
          </button>
          <button onClick={() => handleStep(1)}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeStep === 1 ? 'border-blue-500 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'
            }`}>
            <Download size={16} /> <span className="hidden sm:inline">2. ดาวน์โหลด</span>
          </button>
          <button onClick={() => handleStep(2)}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeStep === 2 ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-slate-500 hover:bg-slate-100'
            }`}>
            <AlertTriangle size={16} /> <span className="hidden sm:inline">3. ตั้งค่า (สำคัญ)</span>
          </button>
          <button onClick={() => handleStep(3)}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeStep === 3 ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:bg-slate-100'
            }`}>
            <Monitor size={16} /> <span className="hidden sm:inline">4. ตรวจสอบ</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Section */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-center items-center bg-slate-50/50">
            
            {activeStep === 0 && (
              <div className="text-center space-y-4 max-w-sm">
                <Globe size={48} className="text-blue-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-800">เข้าสู่เว็บไซต์ python.org</h4>
                <p className="text-sm text-slate-600">เปิดเบราว์เซอร์ไปที่เว็บไซต์ทางการของ Python แล้วไปที่เมนู Downloads</p>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm font-mono text-sm text-blue-600">
                  https://www.python.org
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="text-center space-y-4 max-w-sm">
                <Download size={48} className="text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-800">ดาวน์โหลดตัวติดตั้ง</h4>
                <p className="text-sm text-slate-600">กดปุ่มดาวน์โหลดสำหรับ Windows หรือ macOS เลือกรุ่นล่าสุด (เช่น 3.12+)</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-6 py-3 rounded-lg shadow-md transition-colors w-full flex items-center justify-center gap-2 cursor-default">
                  Download Python 3.12.4
                </button>
              </div>
            )}

            {activeStep === 2 && (
              <div className="w-full max-w-md bg-white border-2 border-slate-300 shadow-xl rounded-lg overflow-hidden">
                <div className="bg-slate-100 border-b border-slate-300 p-3 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-700">Python 3.12 Setup</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h4 className="font-bold text-lg text-slate-800">Install Python 3.12</h4>
                  
                  <div className="space-y-3 bg-amber-50 border border-amber-200 p-4 rounded-xl mt-4 relative">
                    <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
                      ห้ามลืมติ๊ก!
                    </div>
                    
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                        checkboxes.path ? 'bg-blue-600 border-blue-600' : 'border-slate-400 group-hover:border-blue-500'
                      }`}>
                        {checkboxes.path && <CheckSquare size={14} className="text-white" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">Add Python 3.12 to PATH</div>
                        <div className="text-xs text-amber-700 mt-1">สำคัญ! เพื่อให้เรียกใช้ python ผ่าน Terminal ได้จากทุกที่</div>
                      </div>
                    </label>
                  </div>
                  
                  <button className="w-full bg-slate-200 text-slate-700 font-bold py-2 rounded mt-4 cursor-default">
                    Install Now
                  </button>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="w-full max-w-md">
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-700">
                  <div className="bg-[#2d2d2d] px-4 py-2 border-b border-black flex items-center gap-2">
                    <Monitor size={14} className="text-slate-600" />
                    <span className="text-slate-600 text-xs font-mono">Command Prompt</span>
                  </div>
                  <div className="p-4 font-mono text-sm leading-loose">
                    <div className="text-slate-600">C:\Users\Student&gt; <span className="text-white">python --version</span></div>
                    <div className="text-emerald-400 mb-2">Python 3.12.4</div>
                    <div className="text-slate-600">C:\Users\Student&gt; <span className="text-white">pip --version</span></div>
                    <div className="text-emerald-400">pip 24.0 from ...</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[320px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ข้อมูลเพิ่มเติม</h4>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1 overflow-y-auto custom-scrollbar">
              {activeStep === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Python เป็นภาษาที่มีคนดูแลอย่างเป็นทางการ (Python Software Foundation) 
                    คุณสามารถโหลดตัวติดตั้งที่ปลอดภัยที่สุดได้จากเว็บนี้
                  </p>
                </div>
              )}
              {activeStep === 1 && (
                <div className="space-y-3">
                  <h5 className="font-bold text-slate-800 text-sm">เลือกรุ่นไหนดี?</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    ระบบจะตรวจจับ OS ของคุณอัตโนมัติ ให้โหลดเวอร์ชันล่าสุด (เช่น 3.12) ได้เลย 
                    ไม่ควรใช้เวอร์ชัน 2.x เพราะเก่าและไม่ได้รับการอัปเดตแล้ว
                  </p>
                </div>
              )}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-amber-100 border border-amber-300 p-3 rounded-lg">
                    <h5 className="font-bold text-amber-900 text-sm mb-1">ทำไมต้องติ๊ก PATH?</h5>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      "PATH" คือรายชื่อโฟลเดอร์ที่ระบบปฏิบัติการจะไปค้นหาโปรแกรม ถ้าไม่ติ๊ก เวลาพิมพ์คำสั่ง <code>python</code> ใน Terminal 
                      ระบบจะบอกว่าไม่รู้จักคำสั่งนี้ (Command not found)
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <h5 className="font-bold text-blue-900 text-sm mb-1">pip คืออะไร?</h5>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      "pip" คือโปรแกรมจัดการแพ็คเกจ ใช้โหลดไลบรารีเสริมเจ๋งๆ มาใช้ เช่น numpy, pygame ตัวติดตั้งมักจะติ๊กมาให้แล้ว
                    </p>
                  </div>
                </div>
              )}
              {activeStep === 3 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    การเช็คเวอร์ชัน (<code>--version</code>) เป็นการพิสูจน์ว่าระบบรู้จักคำสั่ง python และ pip แล้ว พร้อมสำหรับการเขียนโปรแกรมต่อไป!
                  </p>
                </div>
              )}
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-[200px] bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">bash</span>
            </div>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Clear Log
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">$</span>{line.text}</div>}
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
