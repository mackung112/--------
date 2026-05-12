import React, { useState } from 'react';
import { Car, Wrench, Settings, AlertCircle, CheckCircle2, XCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function ConstructorDemo() {
  const [activeBrand, setActiveBrand] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [cars, setCars] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const colors = [
    { id: 'red', name: 'แดง', class: 'text-red-500' },
    { id: 'blue', name: 'น้ำเงิน', class: 'text-blue-500' },
    { id: 'green', name: 'เขียว', class: 'text-emerald-500' }
  ];

  const handleCreateCar = () => {
    if (!activeBrand || !activeColor) {
      showToast('กรุณาเลือกยี่ห้อและสีก่อนสร้างรถ', 'warning');
      return;
    }
    const colorObj = colors.find(c => c.id === activeColor);
    setCars([...cars, { id: cars.length + 1, brand: activeBrand, color: colorObj }]);
  };

  const explanations = {
    'init-method': {
      title: 'เมธอด __init__',
      desc: 'เรียกอีกอย่างว่า Constructor จะถูกเรียกใช้อัตโนมัติทันทีที่มีการสร้าง Object ใหม่ มักใช้สำหรับกำหนดค่าเริ่มต้นให้คุณสมบัติต่างๆ ของ Object',
      color: 'text-blue-400'
    },
    'self-param': {
      title: 'พารามิเตอร์ self',
      desc: 'ตัวแทนของ Object ที่กำลังถูกสร้างหรือถูกเรียกใช้งาน ต้องเป็นพารามิเตอร์แรกเสมอในเมธอดของคลาส',
      color: 'text-pink-400'
    },
    'attr-assign': {
      title: 'การกำหนดค่าให้คุณสมบัติ (Attribute)',
      desc: 'นำค่าพารามิเตอร์ที่รับมา (เช่น name, color) ไปเก็บไว้ในตัวแปรของ Object นั้นๆ โดยใช้ self.ตัวแปร = ค่า',
      color: 'text-yellow-300'
    }
  };

  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleOptionClick = (val) => {
    if (activeDropzone <= 4) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 4) {
        setActiveDropzone(activeDropzone + 1);
      } else {
        setActiveDropzone(5);
      }
    }
  };

  const checkAnswer = () => {
    const ans1 = currentAnswers[1];
    const ans2 = currentAnswers[2];
    const ans3 = currentAnswers[3];
    const ans4 = currentAnswers[4];

    if (!ans1 || !ans2 || !ans3 || !ans4) {
      showToast('กรุณาเติมคำในช่องว่างให้ครบถ้วน', 'warning');
      return;
    }

    if (ans1 === '__init__' && ans2 === 'self' && ans3 === 'self' && ans4 === 'name') {
      showToast('ถูกต้อง! เข้าใจการทำงานของ Constructor แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้อง ลองพิจารณาดูอีกครั้ง';
      if (ans1 !== '__init__') msg = 'ชื่อฟังก์ชันเริ่มต้นเมื่อสร้าง Object คืออะไร (มี _ สองตัวหน้าหลัง)?';
      else if (ans2 !== 'self') msg = 'พารามิเตอร์แรกสุดในเมธอดของคลาสต้องเป็นคำว่าอะไร?';
      else if (ans3 !== 'self') msg = 'การชี้ไปที่คุณสมบัติของ Object ต้องใช้คำนำหน้าอะไร?';
      else if (ans4 !== 'name') msg = 'ตัวแปรใดที่ใช้รับค่ามาจากพารามิเตอร์ name?';
      
      showToast(msg, 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null, 3: null, 4: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Factory Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
            {/* Setting Side */}
            <div className="flex-1 text-center bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-300">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 flex items-center justify-center">
                  <Wrench className="mr-2" /> กำหนดค่าเริ่มต้น (Constructor)
                </h3>
                <div className="bg-slate-900 text-white rounded-lg p-4 font-mono text-left text-sm md:text-base shadow-inner mb-6 space-y-2">
                    <span className="text-pink-400">def</span> <span className="text-blue-300">__init__</span>(<span className="text-pink-300">self</span>, brand, color):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;self.brand = brand<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;self.color = color
                </div>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">brand</label>
                        <select 
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                          value={activeBrand}
                          onChange={(e) => setActiveBrand(e.target.value)}
                        >
                            <option value="">-- เลือกยี่ห้อ --</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Tesla">Tesla</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">color</label>
                        <div className="flex justify-center gap-3">
                            {colors.map(c => (
                              <button 
                                key={c.id}
                                onClick={() => setActiveColor(c.id)}
                                className={`w-10 h-10 rounded-full transition-transform ${c.id === 'red' ? 'bg-red-500' : c.id === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'} ${activeColor === c.id ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : ''}`}
                              ></button>
                            ))}
                        </div>
                    </div>
                </div>

                <button 
                  onClick={handleCreateCar}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform active:scale-95 shadow-md flex items-center justify-center mx-auto gap-2 w-full"
                >
                    <Settings size={20} /> Build Object
                </button>
            </div>

            {/* Objects Side */}
            <div className="flex-1 text-center min-h-[300px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4 text-emerald-600 flex items-center justify-center">
                  <Car className="mr-2" /> Car Objects
                </h3>
                <div className="flex-1 bg-emerald-50 rounded-xl border border-emerald-100 p-4 flex flex-wrap content-start gap-4 shadow-inner relative overflow-y-auto max-h-[400px]">
                    {cars.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        สร้างรถคันแรกของคุณ
                      </div>
                    ) : (
                      cars.map(obj => (
                        <div key={obj.id} className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-emerald-100 w-full animate-in slide-in-from-left duration-300">
                          <div className="flex items-center gap-4 w-full">
                            <Car className={`w-12 h-12 ${obj.color.class}`} />
                            <div className="text-left">
                                <div className="text-xs font-mono text-slate-400 mb-1">Car Object</div>
                                <div className="font-semibold text-slate-800">{obj.brand}</div>
                                <div className="text-sm text-slate-500">Color: {obj.color.name}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">อธิบายคำสั่ง __init__</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg text-white leading-relaxed">
                  <span className="text-pink-400">class</span> <span className="text-yellow-300">Car</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span>{' '}
                  <span 
                    onMouseEnter={() => setActiveTooltip('init-method')}
                    onClick={() => setActiveTooltip('init-method')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'init-method' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-blue-300`}
                  >__init__</span>(
                  <span 
                    onMouseEnter={() => setActiveTooltip('self-param')}
                    onClick={() => setActiveTooltip('self-param')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'self-param' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-pink-300`}
                  >self</span>, name, color):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span 
                    onMouseEnter={() => setActiveTooltip('attr-assign')}
                    onClick={() => setActiveTooltip('attr-assign')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'attr-assign' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'}`}
                  >
                    <span className="text-pink-300">self</span>.name = name<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-300">self</span>.color = color
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
            <span className="text-yellow-300">#</span> ลองกำหนดคุณสมบัติให้แมว
          </h2>
          <p className="text-slate-300">เติมโค้ดเพื่อสร้าง Constructor รับชื่อแมวมากำหนดเป็นคุณสมบัติ</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <div className="mb-2"><span className="text-pink-400">class</span> <span className="text-yellow-300">Cat</span>:</div>
              <div className="flex flex-wrap items-center gap-2 mb-2 leading-loose pl-8">
                  <span className="text-pink-400">def</span>
                  <div 
                    onClick={() => setActiveDropzone(1)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-blue-300' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-blue-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[1] || ''}
                  </div>
                  <span>(</span>
                  <div 
                    onClick={() => setActiveDropzone(2)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-pink-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[2] || ''}
                  </div>
                  <span>, name):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 leading-loose pl-16">
                  <div 
                    onClick={() => setActiveDropzone(3)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-300' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-pink-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[3] || ''}
                  </div>
                  <span>.name = </span>
                  <div 
                    onClick={() => setActiveDropzone(4)}
                    className={`inline-flex items-center justify-center min-w-16 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 4 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-white' : currentAnswers[4] ? 'border-indigo-500 bg-slate-800 text-white' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[4] || ''}
                  </div>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก (เรียงลำดับการคลิกให้ถูกต้อง):</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('__init__')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-blue-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">__init__</button>
                  <button onClick={() => handleOptionClick('init')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-slate-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">init</button>
                  <button onClick={() => handleOptionClick('self')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">self</button>
                  <button onClick={() => handleOptionClick('name')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">name</button>
                  <button onClick={() => handleOptionClick('Cat')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">Cat</button>
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
