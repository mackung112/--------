import React, { useState } from 'react';
import { Cookie, Box, Wand2, MousePointerClick, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function OOP21910_U2_L1_ClassDefinitionDemo() {
  const [objectCount, setObjectCount] = useState(0);
  const [objects, setObjects] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const cookieColors = ['text-orange-300', 'text-yellow-600', 'text-amber-500'];

  const handleCreateObject = () => {
    const newCount = objectCount + 1;
    setObjectCount(newCount);
    const color = cookieColors[Math.floor(Math.random() * cookieColors.length)];
    setObjects([...objects, { id: newCount, color }]);
  };

  const [activeTooltip, setActiveTooltip] = useState(null);
  
  const explanations = {
    'class-keyword': {
      title: 'คีย์เวิร์ด class',
      desc: 'คำสงวน (Keyword) ในภาษา Python ที่ใช้สำหรับประกาศเริ่มต้นการสร้างคลาสใหม่ เหมือนการบอกโปรแกรมว่า "นี่คือแม่พิมพ์นะ"',
      color: 'text-pink-500'
    },
    'class-name': {
      title: 'ชื่อคลาส (Class Name)',
      desc: 'ชื่อของคลาสที่เราตั้งขึ้นมาเอง ธรรมเนียมปฏิบัติ (Convention) ของ Python นิยมตั้งชื่อคลาสแบบ PascalCase คือขึ้นต้นด้วยตัวพิมพ์ใหญ่เสมอ เช่น Student, Employee, CarModel',
      color: 'text-yellow-500'
    },
    'colon': {
      title: 'เครื่องหมาย Colon (:)',
      desc: 'ใช้เพื่อบอกว่าส่วนหัวของการประกาศจบลงแล้ว และบรรทัดต่อๆ ไปที่เยื้องเข้าไป (Indentation) จะเป็นเนื้อหาภายในคลาสนี้',
      color: 'text-slate-600'
    },
    'pass-keyword': {
      title: 'คำสั่ง pass',
      desc: 'คำสั่งพิเศษที่บอกให้ Python "ข้ามไปก่อน" ใช้เมื่อเราต้องสร้างโครงสร้างคลาสไว้ แต่ยังไม่ได้เขียนเนื้อหาการทำงานข้างใน เพื่อไม่ให้เกิด Error',
      color: 'text-slate-500'
    }
  };

  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

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

    if (ans1 === 'class' && ans2 === 'Car' && ans3 === 'pass') {
      showToast('ถูกต้อง! เก่งมาก คุณสร้างคลาสพื้นฐานเป็นแล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้อง ลองพิจารณาโครงสร้างอีกครั้ง';
      if (ans1 !== 'class') msg = 'คีย์เวิร์ดแรกสุดในการสร้างคลาสคืออะไร?';
      else if (ans2 === 'car') msg = 'ชื่อคลาสนิยมขึ้นต้นด้วยตัวพิมพ์ใหญ่ (PascalCase) นะครับ';
      else if (ans2 !== 'Car') msg = 'ตรวจดูชื่อคลาสให้ตรงตามโจทย์';
      else if (ans3 !== 'pass') msg = 'เมื่อยังไม่มีการทำงานภายใน ต้องใช้คำสั่งใดเพื่อข้ามไปก่อน?';
      
      showToast(msg, 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null, 3: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Class vs Object Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Class Side */}
            <div className="flex-1 text-center w-full bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-300">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 flex items-center justify-center">
                  <Cookie className="mr-2" /> Class (แม่พิมพ์)
                </h3>
                <div className="bg-slate-900 text-white rounded-lg p-4 font-mono text-left text-sm md:text-base shadow-inner mb-6">
                    <span className="text-pink-400">class</span> <span className="text-yellow-300">Cookie</span>:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">pass</span>
                </div>
                <button 
                  onClick={handleCreateObject}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform active:scale-95 shadow-md flex items-center justify-center mx-auto gap-2 w-full sm:w-auto"
                >
                    <Wand2 size={20} /> สร้าง Object ใหม่
                </button>
                <p className="text-xs text-slate-500 mt-3">คลิกเพื่อจำลองการสร้างออบเจ็กต์จากคลาส</p>
            </div>

            {/* Objects Side */}
            <div className="flex-1 text-center w-full min-h-[300px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4 text-emerald-600 flex items-center justify-center">
                  <Box className="mr-2" /> Objects (วัตถุที่สร้างขึ้น)
                </h3>
                <div className="flex-1 bg-emerald-50 rounded-xl border border-emerald-100 p-4 flex flex-wrap content-start gap-4 shadow-inner relative overflow-y-auto max-h-[300px]">
                    {objects.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        ยังไม่มี Object ถูกสร้าง
                      </div>
                    ) : (
                      objects.map(obj => (
                        <div key={obj.id} className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-sm border border-emerald-100 w-20 h-24 animate-in zoom-in duration-300">
                          <Cookie className={`w-8 h-8 mb-2 ${obj.color}`} />
                          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">obj_{obj.id}</span>
                        </div>
                      ))
                    )}
                </div>
                <div className="mt-4 text-sm font-medium text-slate-600 bg-white inline-block mx-auto px-4 py-1 rounded-full shadow-sm border border-slate-200">
                    จำนวน Object: <span className="text-emerald-600 text-lg">{objectCount}</span>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">โครงสร้างและไวยากรณ์ (Syntax)</h2>
          <p className="text-slate-600">การสร้างคลาสใน Python นั้นง่ายมาก ลองเอาเมาส์ชี้หรือคลิกที่โค้ดด้านล่างเพื่อดูคำอธิบายของแต่ละส่วน</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg md:text-xl text-white">
                  <span 
                    onMouseEnter={() => setActiveTooltip('class-keyword')}
                    onClick={() => setActiveTooltip('class-keyword')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'class-keyword' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-pink-400`}
                  >class</span> 
                  {' '}
                  <span 
                    onMouseEnter={() => setActiveTooltip('class-name')}
                    onClick={() => setActiveTooltip('class-name')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'class-name' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-yellow-300`}
                  >Student</span>
                  <span 
                    onMouseEnter={() => setActiveTooltip('colon')}
                    onClick={() => setActiveTooltip('colon')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'colon' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-white`}
                  >:</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span 
                    onMouseEnter={() => setActiveTooltip('pass-keyword')}
                    onClick={() => setActiveTooltip('pass-keyword')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'pass-keyword' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-slate-400`}
                  >pass</span>
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
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white !mt-0">
            <span className="text-yellow-300">#</span> ลองเขียนโค้ดด้วยตัวเอง
          </h2>
          <p className="text-slate-200">จงเติมคำในช่องว่างเพื่อสร้างคลาสที่ชื่อว่า <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">Car</code> โดยยังไม่มีการทำงานใดๆ อยู่ข้างใน</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <div className="flex flex-wrap items-center gap-2 mb-2 leading-loose">
                  <div 
                    onClick={() => setActiveDropzone(1)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[1] || ''}
                  </div>
                  <div 
                    onClick={() => setActiveDropzone(2)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[2] || ''}
                  </div>
                  <span className="text-white">:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 leading-loose">
                  <span className="text-slate-400 pl-8"># ยังไม่ต้องทำอะไร ให้ใช้คำสั่งข้ามไปก่อน</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 leading-loose pl-8">
                  <div 
                    onClick={() => setActiveDropzone(3)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-slate-300' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-slate-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[3] || ''}
                  </div>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-300">คลิกที่คำศัพท์ด้านล่าง เพื่อเติมลงในช่องว่างตามลำดับ:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('class')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">class</button>
                  <button onClick={() => handleOptionClick('Car')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">Car</button>
                  <button onClick={() => handleOptionClick('def')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">def</button>
                  <button onClick={() => handleOptionClick('pass')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">pass</button>
                  <button onClick={() => handleOptionClick('car')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">car</button>
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
