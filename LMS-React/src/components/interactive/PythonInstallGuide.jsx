import React, { useState } from 'react';
import { Download, CheckCircle2, XCircle, AlertCircle, RotateCcw, Monitor, MousePointerClick, Globe, ChevronRight, Check, AlertTriangle } from 'lucide-react';

export default function PythonInstallGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkboxes, setCheckboxes] = useState({ path: false, pip: false, launcher: false });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Quiz
  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { title: 'เข้าเว็บไซต์ python.org', icon: Globe, desc: 'เปิดเบราว์เซอร์แล้วไปที่ python.org เลือก Downloads → Python 3.x.x', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'ดาวน์โหลดตัวติดตั้ง', icon: Download, desc: 'คลิกปุ่ม "Download Python 3.x.x" เลือกเวอร์ชันที่ตรงกับระบบปฏิบัติการ (Windows/macOS)', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'ติ๊กตัวเลือกสำคัญ ⚠️', icon: AlertTriangle, desc: 'หน้าจอติดตั้งจะมีตัวเลือกสำคัญ 3 ข้อ ต้องติ๊กให้ครบ!', color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'ตรวจสอบการติดตั้ง', icon: Monitor, desc: 'เปิด Terminal แล้วพิมพ์ python --version เพื่อเช็คว่าติดตั้งสำเร็จ', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const explanations = {
    'path': { title: 'Add Python to PATH', desc: 'ตัวเลือกนี้สำคัญมาก! ถ้าไม่ติ๊ก คุณจะพิมพ์คำสั่ง python ใน Terminal ไม่ได้ เพราะระบบจะหา Python ไม่เจอ (PATH คือรายชื่อโฟลเดอร์ที่ระบบไปหาโปรแกรมมารัน)', color: 'text-amber-600' },
    'pip': { title: 'Install pip', desc: 'pip คือตัวจัดการแพ็คเกจ (Package Manager) ของ Python ใช้สำหรับดาวน์โหลดไลบรารีเสริม เช่น pip install pygame', color: 'text-emerald-600' },
    'launcher': { title: 'Install launcher for all users', desc: 'ติดตั้งให้ทุกผู้ใช้ในเครื่องสามารถใช้ Python ได้ (แนะนำสำหรับเครื่องส่วนตัว)', color: 'text-blue-600' },
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCheckbox = (key) => {
    setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOptionClick = (val) => {
    if (activeDropzone <= 2) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 2) setActiveDropzone(activeDropzone + 1);
      else setActiveDropzone(3);
    }
  };

  const checkAnswer = () => {
    if (!currentAnswers[1] || !currentAnswers[2]) {
      showToast('กรุณาเติมคำตอบให้ครบทุกช่อง', 'warning'); return;
    }
    if (currentAnswers[1] === 'python' && currentAnswers[2] === '--version') {
      showToast('ถูกต้อง! คำสั่งนี้ใช้ตรวจสอบว่า Python ถูกติดตั้งสำเร็จหรือไม่', 'success');
      setIsSuccess(true);
    } else {
      showToast('ยังไม่ถูกต้อง: คำสั่งตรวจสอบเวอร์ชันใน Terminal คือ python --version', 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Step-by-step Installation Wizard */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex items-center gap-3">
          <Download size={24} />
          <h3 className="font-bold text-lg">ขั้นตอนการติดตั้ง Python</h3>
        </div>

        <div className="p-6">
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    i === currentStep ? 'bg-indigo-600 text-white shadow-lg scale-110' :
                    i < currentStep ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {i < currentStep ? <Check size={16} /> : i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-1 w-8 md:w-16 mx-1 rounded ${i < currentStep ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className={`${steps[currentStep].bg} rounded-xl p-6 border border-slate-100 min-h-[200px]`}>
            <div className="flex items-start gap-4">
              {React.createElement(steps[currentStep].icon, { size: 32, className: steps[currentStep].color })}
              <div className="flex-1">
                <h4 className={`text-xl font-bold ${steps[currentStep].color} mb-2`}>{steps[currentStep].title}</h4>
                <p className="text-slate-700 leading-relaxed mb-4">{steps[currentStep].desc}</p>

                {/* Step 2: Checkboxes */}
                {currentStep === 2 && (
                  <div className="space-y-3 mt-4">
                    {Object.entries(explanations).map(([key, info]) => (
                      <div
                        key={key}
                        onClick={() => { handleCheckbox(key); setActiveTooltip(key); }}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                          checkboxes[key] ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          checkboxes[key] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}>
                          {checkboxes[key] && <Check size={14} />}
                        </div>
                        <span className={`font-mono text-sm font-semibold ${info.color}`}>{info.title}</span>
                      </div>
                    ))}
                    {activeTooltip && explanations[activeTooltip] && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h5 className={`font-bold ${explanations[activeTooltip].color} mb-1`}>{explanations[activeTooltip].title}</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">{explanations[activeTooltip].desc}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Terminal Simulation */}
                {currentStep === 3 && (
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm mt-4 shadow-inner">
                    <div className="text-slate-400 mb-1">$ python --version</div>
                    <div className="text-emerald-400">Python 3.12.4</div>
                    <div className="text-slate-400 mt-2">$ pip --version</div>
                    <div className="text-emerald-400">pip 24.0 from ...</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}
              className="px-4 py-2 text-slate-500 hover:text-indigo-600 disabled:opacity-30 transition-colors font-semibold">
              ← ย้อนกลับ
            </button>
            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-30 transition-colors font-semibold flex items-center gap-1">
              ถัดไป <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white !mt-0">
          <span className="text-yellow-300">#</span> ทดสอบความเข้าใจ
        </h2>
        <p className="text-slate-200">หลังติดตั้ง Python เสร็จ เราจะใช้คำสั่งอะไรใน Terminal เพื่อตรวจสอบว่าติดตั้งสำเร็จหรือไม่?</p>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
          <span className="text-slate-400">$</span>{' '}
          <div onClick={() => setActiveDropzone(1)}
            className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors mx-1 align-middle ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-emerald-300' : 'border-dashed border-slate-500 bg-slate-800'}`}>
            {currentAnswers[1] || ''}
          </div>{' '}
          <div onClick={() => setActiveDropzone(2)}
            className={`inline-flex items-center justify-center min-w-28 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors mx-1 align-middle ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}>
            {currentAnswers[2] || ''}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-300">ตัวเลือก:</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => handleOptionClick('python')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-emerald-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">python</button>
            <button onClick={() => handleOptionClick('--version')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">--version</button>
            <button onClick={() => handleOptionClick('install')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-slate-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">install</button>
            <button onClick={() => handleOptionClick('pip')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-slate-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">pip</button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={resetQuiz} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <RotateCcw size={16} /> เริ่มใหม่
          </button>
          <button onClick={checkAnswer} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">
            ตรวจคำตอบ
          </button>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
