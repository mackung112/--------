import React, { useState } from 'react';
import { Bot, Battery, Zap, AlertCircle, CheckCircle2, XCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function OOP21910_U2_L3_SelfUsageDemo() {
  const [robots, setRobots] = useState([
    { id: 1, name: 'R2D2', battery: 20 },
    { id: 2, name: 'C3PO', battery: 50 }
  ]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const chargeBattery = (id) => {
    setRobots(robots.map(r => {
      if (r.id === id) {
        return { ...r, battery: Math.min(100, r.battery + 20) };
      }
      return r;
    }));
    showToast(`ชาร์จแบตเตอรี่ให้หุ่นยนต์ ${id === 1 ? 'R2D2' : 'C3PO'} เรียบร้อย`, 'success');
  };

  const explanations = {
    'self-param': {
      title: 'ทำไมต้องมี self ?',
      desc: 'เพราะคลาสเป็นแค่แม่พิมพ์ เมื่อเราสร้างหุ่นยนต์ 2 ตัว (R2D2, C3PO) Python ต้องรู้ว่าตอนที่สั่ง charge_battery() นั้น กำลังสั่งให้ชาร์จของตัวไหน self จึงเป็นตัวแทนที่บอกว่า "ให้จัดการกับ Object นี้นะ"',
      color: 'text-pink-400'
    },
    'self-attr': {
      title: 'self.battery',
      desc: 'ชี้ไปยังระดับแบตเตอรี่ของหุ่นยนต์ตัวนั้นๆ โดยเฉพาะ ทำให้เวลา R2D2 ชาร์จแบต แบตของ C3PO จะไม่เพิ่มตาม',
      color: 'text-yellow-300'
    }
  };

  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleOptionClick = (val) => {
    if (activeDropzone <= 2) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 2) {
        setActiveDropzone(activeDropzone + 1);
      } else {
        setActiveDropzone(3);
      }
    }
  };

  const checkAnswer = () => {
    const ans1 = currentAnswers[1];
    const ans2 = currentAnswers[2];

    if (!ans1 || !ans2) {
      showToast('กรุณาเติมคำในช่องว่างให้ครบถ้วน', 'warning');
      return;
    }

    if (ans1 === 'self' && ans2 === 'self') {
      showToast('ถูกต้อง! คุณเข้าใจการใช้ self อย่างถ่องแท้', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้อง ลองพิจารณาดูอีกครั้ง';
      if (ans1 !== 'self') msg = 'พารามิเตอร์แรกในเมธอด introduce คืออะไร?';
      else if (ans2 !== 'self') msg = 'ถ้าต้องการเข้าถึงคุณสมบัติ name ของ Object ตัวเอง ต้องใช้คำนำหน้าอะไร?';
      
      showToast(msg, 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Self Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Concept Side */}
            <div className="flex-1 text-center w-full bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-300">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 flex items-center justify-center">
                  <Bot className="mr-2" /> class Robot
                </h3>
                <div className="bg-slate-900 text-white rounded-lg p-4 font-mono text-left text-sm md:text-base shadow-inner mb-6 space-y-2">
                    <span className="text-pink-400">def</span> <span className="text-blue-300">charge_battery</span>(<span className="text-pink-300 font-bold">self</span>):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-300 font-bold">self</span>.battery += 20
                </div>
                <div className="text-sm text-slate-600 bg-white p-4 rounded-lg shadow-sm">
                    <strong>self</strong> คือตัวเชื่อมโยง เมื่อ Object ไหนเป็นคนเรียกใช้เมธอด <code>self</code> จะชี้ไปที่ Object นั้น
                </div>
            </div>

            {/* Objects Side */}
            <div className="flex-1 w-full space-y-6">
                {robots.map(r => (
                  <div key={r.id} className={`bg-white rounded-xl border-2 shadow-sm p-5 flex items-center gap-6 transition-colors ${r.id === 1 ? 'border-blue-200 hover:border-blue-300' : 'border-amber-200 hover:border-amber-300'}`}>
                      <div className={`p-4 rounded-full ${r.id === 1 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                          <Bot size={40} />
                      </div>
                      <div className="flex-1">
                          <h4 className="font-bold text-lg text-slate-800">{r.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                              <Battery size={16} /> แบตเตอรี่: 
                              <span className="font-mono font-bold text-emerald-600">{r.battery}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5 mb-3">
                              <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${r.battery}%` }}></div>
                          </div>
                      </div>
                      <button 
                        onClick={() => chargeBattery(r.id)}
                        disabled={r.battery >= 100}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${r.battery >= 100 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95'}`}
                        title="เรียกใช้ r.charge_battery()"
                      >
                          <Zap size={20} className={r.battery < 100 ? "text-yellow-500" : ""} />
                          <span className="text-xs font-semibold mt-1">Charge</span>
                      </button>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">เจาะลึกการใช้ self</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg text-white leading-relaxed">
                  <span className="text-pink-400">def</span> <span className="text-blue-300">charge_battery</span>(
                  <span 
                    onMouseEnter={() => setActiveTooltip('self-param')}
                    onClick={() => setActiveTooltip('self-param')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'self-param' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-pink-300 font-bold`}
                  >self</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span 
                    onMouseEnter={() => setActiveTooltip('self-attr')}
                    onClick={() => setActiveTooltip('self-attr')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'self-attr' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'}`}
                  >
                    <span className="text-pink-300">self</span>.battery += 20
                  </span>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[150px] flex items-center justify-center">
                  {activeTooltip ? (
                    <div className="w-full text-left animate-in fade-in duration-300">
                        <h4 className={`text-lg font-bold ${explanations[activeTooltip].color} mb-2 border-b pb-2`}>
                          {explanations[activeTooltip].title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{explanations[activeTooltip].desc}</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500">
                        <MousePointerClick className="w-8 h-8 mb-3 text-slate-300 mx-auto" />
                        ชี้หรือคลิกที่ส่วนต่างๆ ของโค้ด<br />เพื่อดูคำอธิบาย
                    </div>
                  )}
              </div>
          </div>
      </section>

      {/* 3. Interactive Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-300">#</span> เติมคำสั่งสร้างความคุ้นเคย
          </h2>
          <p className="text-slate-300">เติมคีย์เวิร์ดที่หายไป เพื่อให้ Employee แนะนำตัวเองได้อย่างถูกต้อง</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <div className="mb-2"><span className="text-pink-400">class</span> <span className="text-yellow-300">Employee</span>:</div>
              <div className="flex flex-wrap items-center gap-2 mb-2 leading-loose pl-8">
                  <span className="text-pink-400">def</span>
                  <span className="text-blue-300">introduce</span>
                  <span>(</span>
                  <div 
                    onClick={() => setActiveDropzone(1)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-300' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-pink-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[1] || ''}
                  </div>
                  <span>):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 leading-loose pl-16">
                  <span className="text-blue-300">print</span>
                  <span>(f"สวัสดี ฉันชื่อ </span>
                  <div 
                    onClick={() => setActiveDropzone(2)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-pink-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[2] || ''}
                  </div>
                  <span>.name")</span>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('Employee')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">Employee</button>
                  <button onClick={() => handleOptionClick('self')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">self</button>
                  <button onClick={() => handleOptionClick('name')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">name</button>
              </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
              <button onClick={resetQuiz} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
                  <RotateCcw size={16} /> เริ่มใหม่
              </button>
              <button onClick={checkAnswer} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">
                  ตรวจคำตอบ
              </button>
          </div>
      </section>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : 
          toast.type === 'error' ? 'bg-slate-800 border-red-500' : 
          'bg-slate-800 border-yellow-500'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
