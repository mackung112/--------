import React, { useState } from 'react';
import { Sword, Heart, Star, AlertCircle, CheckCircle2, XCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function OOP21910_U2_L4_MethodCreationDemo() {
  const [hero, setHero] = useState({
    name: 'Arthur',
    hp: 100,
    level: 1,
    exp: 0
  });
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const attack = () => {
    setHero(prev => ({
      ...prev,
      exp: prev.exp + 20
    }));
    showToast('โจมตีสำเร็จ! ได้รับ 20 EXP', 'success');
  };

  const heal = () => {
    setHero(prev => ({
      ...prev,
      hp: Math.min(100, prev.hp + 30)
    }));
    showToast('ฟื้นฟูพลังชีวิต 30 HP', 'success');
  };

  const levelUp = () => {
    if (hero.exp >= 100) {
      setHero(prev => ({
        ...prev,
        level: prev.level + 1,
        exp: prev.exp - 100,
        hp: 100
      }));
      showToast('เลเวลอัป! พลังชีวิตเต็มแล้ว', 'success');
    } else {
      showToast('EXP ยังไม่พอสำหรับการอัปเลเวล (ต้องการ 100 EXP)', 'warning');
    }
  };

  const explanations = {
    'method-def': {
      title: 'การสร้างเมธอด (Method Definition)',
      desc: 'ใช้คำสั่ง def เหมือนการสร้างฟังก์ชันปกติ แต่ต้องอยู่ภายใต้การเยื้อง (Indentation) ของคลาส',
      color: 'text-pink-400'
    },
    'self-param': {
      title: 'พารามิเตอร์ self',
      desc: 'เมธอดทุกตัวต้องมี self เป็นพารามิเตอร์แรกเสมอ เพื่อให้เมธอดนั้นสามารถเข้าถึงคุณสมบัติของ Object ได้',
      color: 'text-yellow-300'
    },
    'attr-update': {
      title: 'การปรับปรุงค่า (Attribute Update)',
      desc: 'สามารถเปลี่ยนแปลงค่าของคุณสมบัติได้ผ่าน self เช่น เพิ่ม exp ขึ้น 20',
      color: 'text-blue-300'
    }
  };

  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOptionClick = (val) => {
    if (activeDropzone <= 3) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 3) {
        setActiveDropzone(activeDropzone + 1);
      } else {
        setActiveDropzone(4);
      }
    }
  };

  const checkAnswer = () => {
    const ans1 = currentAnswers[1];
    const ans2 = currentAnswers[2];
    const ans3 = currentAnswers[3];

    if (!ans1 || !ans2 || !ans3) {
      showToast('กรุณาเติมคำในช่องว่างให้ครบถ้วน', 'warning');
      return;
    }

    if (ans1 === 'def' && ans2 === 'self' && ans3 === 'amount') {
      showToast('ถูกต้อง! คุณเข้าใจการสร้างเมธอดที่รับค่าพารามิเตอร์แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้อง ลองพิจารณาดูอีกครั้ง';
      if (ans1 !== 'def') msg = 'คำสั่งในการสร้างเมธอด (หรือฟังก์ชัน) คืออะไร?';
      else if (ans2 !== 'self') msg = 'พารามิเตอร์แรกของเมธอดเสมอคือคำว่าอะไร?';
      else if (ans3 !== 'amount') msg = 'ค่าที่รับเข้ามาเพื่อหักออกจาก balance คือตัวแปรใด?';
      
      showToast(msg, 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null, 3: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Method Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Object State */}
            <div className="w-full lg:w-1/3 bg-slate-800 p-6 rounded-xl border-2 border-slate-700 shadow-xl text-white">
                <h3 className="text-xl font-bold mb-6 text-center border-b border-slate-700 pb-4">Hero Object</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Name</div>
                    <div className="text-lg font-bold text-yellow-400">{hero.name}</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">HP</span>
                      <span className="font-mono">{hero.hp}/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${hero.hp}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                    <div>
                      <div className="text-xs text-slate-400">Level</div>
                      <div className="text-xl font-bold text-blue-400">{hero.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">EXP</div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">{hero.exp}</div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Methods Control */}
            <div className="flex-1 w-full bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-300">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">เรียกใช้ Methods</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={attack}
                    className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 p-4 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95"
                  >
                    <Sword size={24} className="mb-2" />
                    <span className="font-mono font-bold">attack()</span>
                  </button>
                  
                  <button 
                    onClick={heal}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-200 p-4 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95"
                  >
                    <Heart size={24} className="mb-2" />
                    <span className="font-mono font-bold">heal()</span>
                  </button>

                  <button 
                    onClick={levelUp}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${hero.exp >= 100 ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-200 active:scale-95 shadow-md' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'}`}
                  >
                    <Star size={24} className="mb-2" />
                    <span className="font-mono font-bold">level_up()</span>
                  </button>
                </div>

                <div className="bg-slate-900 text-white rounded-lg p-4 font-mono text-left text-sm shadow-inner">
                    <span className="text-slate-400"># โค้ดที่อยู่เบื้องหลัง</span><br />
                    <span className="text-pink-400">def</span> <span className="text-blue-300">attack</span>(<span className="text-pink-300">self</span>):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-300">self</span>.exp += 20
                </div>
            </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">พฤติกรรม (Methods) ของคลาส</h2>
          <p className="text-slate-600">Method คือฟังก์ชันที่อยู่ภายในคลาส ใช้สำหรับกำหนดพฤติกรรมของ Object ว่าสามารถทำอะไรได้บ้าง</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg text-white leading-relaxed">
                  <span className="text-pink-400">class</span> <span className="text-yellow-300">Hero</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span 
                    onMouseEnter={() => setActiveTooltip('method-def')}
                    onClick={() => setActiveTooltip('method-def')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'method-def' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'}`}
                  ><span className="text-pink-400">def</span> <span className="text-blue-300">attack</span></span>(<span 
                    onMouseEnter={() => setActiveTooltip('self-param')}
                    onClick={() => setActiveTooltip('self-param')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'self-param' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-pink-300`}
                  >self</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span 
                    onMouseEnter={() => setActiveTooltip('attr-update')}
                    onClick={() => setActiveTooltip('attr-update')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'attr-update' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'}`}
                  ><span className="text-pink-300">self</span>.exp += 20</span>
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
            <span className="text-yellow-300">#</span> เติมคำสั่งสร้างเมธอดถอนเงิน
          </h2>
          <p className="text-slate-300">จงเติมคำในช่องว่างเพื่อสร้างเมธอด <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">withdraw</code> ที่รับค่า <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">amount</code> สำหรับคลาสบัญชีธนาคาร</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <div className="mb-2"><span className="text-pink-400">class</span> <span className="text-yellow-300">BankAccount</span>:</div>
              <div className="flex flex-wrap items-center gap-2 mb-2 leading-loose pl-8">
                  <div 
                    onClick={() => setActiveDropzone(1)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[1] || ''}
                  </div>
                  <span className="text-blue-300">withdraw</span>
                  <span>(</span>
                  <div 
                    onClick={() => setActiveDropzone(2)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-pink-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[2] || ''}
                  </div>
                  <span>, amount):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 leading-loose pl-16">
                  <span className="text-pink-300">self</span>
                  <span>.balance -= </span>
                  <div 
                    onClick={() => setActiveDropzone(3)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-white' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-white' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[3] || ''}
                  </div>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('class')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">class</button>
                  <button onClick={() => handleOptionClick('amount')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">amount</button>
                  <button onClick={() => handleOptionClick('self')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">self</button>
                  <button onClick={() => handleOptionClick('def')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">def</button>
                  <button onClick={() => handleOptionClick('balance')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">balance</button>
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
