import React, { useState } from 'react';
import { Home, Hammer, AlertCircle, CheckCircle2, XCircle, RotateCcw, MousePointerClick, ChevronRight } from 'lucide-react';

export default function OOP21910_U2_L5_InstantiationDemo() {
  const [houses, setHouses] = useState([]);
  const [houseName, setHouseName] = useState('MyHouse');
  const [houseColor, setHouseColor] = useState('blue');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const colors = [
    { id: 'blue', name: 'น้ำเงิน', class: 'bg-blue-500', text: 'text-blue-500' },
    { id: 'red', name: 'แดง', class: 'bg-red-500', text: 'text-red-500' },
    { id: 'green', name: 'เขียว', class: 'bg-emerald-500', text: 'text-emerald-500' },
    { id: 'purple', name: 'ม่วง', class: 'bg-purple-500', text: 'text-purple-500' }
  ];

  const buildHouse = () => {
    if (!houseName) {
      showToast('กรุณาตั้งชื่อบ้านก่อนสร้าง', 'warning');
      return;
    }
    
    if (houses.length >= 4) {
      showToast('สร้างบ้านได้สูงสุด 4 หลังเท่านั้น', 'warning');
      return;
    }

    const colorObj = colors.find(c => c.id === houseColor);
    setHouses([...houses, { id: Date.now(), name: houseName, color: colorObj }]);
    showToast(`สร้างบ้าน ${houseName} สี${colorObj.name} สำเร็จ`, 'success');
  };

  const explanations = {
    'var-name': {
      title: 'ตัวแปรออบเจ็กต์ (Object Variable)',
      desc: 'ตัวแปรที่เราสร้างขึ้นมาเพื่อเก็บตัวตนของ Object ที่เพิ่งถูกสร้างขึ้น ทำให้เราสามารถเรียกใช้งานคุณสมบัติหรือเมธอดของมันได้ในภายหลัง',
      color: 'text-emerald-400'
    },
    'class-call': {
      title: 'เรียกใช้งานคลาส',
      desc: 'เขียนชื่อคลาสตามด้วยวงเล็บ () เพื่อสั่งให้โปรแกรมสร้าง Object ใหม่ขึ้นมาจากแม่พิมพ์ (Class) นั้น',
      color: 'text-yellow-300'
    },
    'args': {
      title: 'ส่งค่า Arguments',
      desc: 'หากคลาสมีเมธอด __init__ ที่รอรับค่า (พารามิเตอร์) เราต้องส่งค่าเข้าไปในวงเล็บตามลำดับให้ครบถ้วนด้วย',
      color: 'text-blue-300'
    }
  };

  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (ans1 === 'my_house' && ans2 === 'House' && ans3 === 'color' && ans4 === 'my_house') {
      showToast('ถูกต้อง! คุณสามารถสร้าง Object และเรียกใช้งานมันได้แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้อง ลองพิจารณาดูอีกครั้ง';
      if (ans1 !== 'my_house') msg = 'เราต้องการเก็บ Object ไว้ในตัวแปรชื่ออะไรตามโจทย์?';
      else if (ans2 !== 'House') msg = 'คลาสแม่พิมพ์สำหรับสร้างบ้านชื่อว่าอะไร?';
      else if (ans3 !== 'color') msg = 'พารามิเตอร์ตัวที่ 2 ที่ต้องส่งให้ House() คืออะไร?';
      else if (ans4 !== 'my_house') msg = 'ถ้าจะให้บ้านนี้เปิดประตู ต้องเรียกเมธอดจากตัวแปรใด?';
      
      showToast(msg, 'error');
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({ 1: null, 2: null, 3: null, 4: null });
    setActiveDropzone(1);
    setIsSuccess(false);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. Blueprint Simulator */}
      <section className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 md:p-8 text-white">
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Home className="text-indigo-400" size={28} /> จำลองการสร้างบ้านจาก Blueprint
        </h3>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
            {/* Blueprint Form */}
            <div className="w-full lg:w-1/3 bg-slate-900/50 p-6 rounded-xl border border-blue-500/30 shadow-inner flex flex-col">
                <div className="font-mono text-sm text-blue-300 mb-6 border-b border-blue-500/20 pb-4">
                  <div className="text-pink-400">class <span className="text-yellow-300">House</span>:</div>
                  <div className="pl-4">def __init__(self, name, color):</div>
                  <div className="pl-8 text-slate-400">self.name = name</div>
                  <div className="pl-8 text-slate-400">self.color = color</div>
                </div>
                
                <div className="flex-1 space-y-5">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">กำหนดชื่อบ้าน (name):</label>
                    <input 
                      type="text" 
                      value={houseName}
                      onChange={(e) => setHouseName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">เลือกสีบ้าน (color):</label>
                    <div className="flex gap-3">
                      {colors.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setHouseColor(c.id)}
                          className={`w-10 h-10 rounded-lg transition-all ${c.class} ${houseColor === c.id ? 'ring-4 ring-offset-2 ring-offset-slate-900 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                          title={c.name}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={buildHouse}
                  className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
                >
                  <Hammer size={20} /> สร้าง Object (Instantiation)
                </button>
            </div>

            {/* Built Objects */}
            
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">อธิบายคำสั่ง Instantiation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg text-white leading-relaxed">
                  <span className="text-slate-500"># ตัวแปร = ชื่อคลาส(ค่าพารามิเตอร์)</span><br />
                  <span 
                    onMouseEnter={() => setActiveTooltip('var-name')}
                    onClick={() => setActiveTooltip('var-name')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'var-name' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-emerald-400`}
                  >my_house</span> = <span 
                    onMouseEnter={() => setActiveTooltip('class-call')}
                    onClick={() => setActiveTooltip('class-call')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'class-call' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-yellow-300`}
                  >House</span>(<span 
                    onMouseEnter={() => setActiveTooltip('args')}
                    onClick={() => setActiveTooltip('args')}
                    className={`cursor-pointer border-b-2 border-dashed transition-all ${activeTooltip === 'args' ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-transparent'} text-blue-300`}
                  >"บ้านแสนสุข", "red"</span>)<br /><br />
                  <span className="text-slate-500"># การเรียกใช้เมธอดของ Object</span><br />
                  <span className="text-emerald-400">my_house</span>.open_door()
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
            <span className="text-yellow-300">#</span> สร้าง Object ด้วยตัวเอง
          </h2>
          <p className="text-slate-300">เติมโค้ดเพื่อสร้างบ้านสีน้ำเงิน เก็บไว้ในตัวแปรชื่อ <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">my_house</code> และสั่งเปิดประตู</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <div className="text-slate-500 mb-2"># 1. สร้าง Object จากคลาส House</div>
              <div className="flex flex-wrap items-center gap-2 mb-6 leading-loose pl-4">
                  <div 
                    onClick={() => setActiveDropzone(1)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-emerald-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[1] || ''}
                  </div>
                  <span>=</span>
                  <div 
                    onClick={() => setActiveDropzone(2)}
                    className={`inline-flex items-center justify-center min-w-20 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[2] || ''}
                  </div>
                  <span>("Villa",</span>
                  <div 
                    onClick={() => setActiveDropzone(3)}
                    className={`inline-flex items-center justify-center min-w-20 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-blue-300' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-blue-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[3] || ''}
                  </div>
                  <span>)</span>
              </div>

              <div className="text-slate-500 mb-2"># 2. เรียกใช้งานเมธอด open_door()</div>
              <div className="flex flex-wrap items-center gap-2 leading-loose pl-4">
                  <div 
                    onClick={() => setActiveDropzone(4)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 4 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : currentAnswers[4] ? 'border-indigo-500 bg-slate-800 text-emerald-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[4] || ''}
                  </div>
                  <span>.open_door()</span>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('House')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">House</button>
                  <button onClick={() => handleOptionClick('color')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-blue-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">"blue"</button>
                  <button onClick={() => handleOptionClick('my_house')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-emerald-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">my_house</button>
                  <button onClick={() => handleOptionClick('self')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">self</button>
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
    
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
                <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider text-center">Houses (Objects in Memory)</h4>
                
                <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-max">
                    {houses.length === 0 ? (
                      <div className="col-span-2 h-full flex flex-col items-center justify-center text-slate-600">
                        <Home size={48} className="mb-3 opacity-20" />
                        <p>รอการสร้าง Object จากคลาส House</p>
                      </div>
                    ) : (
                      houses.map(h => (
                        <div key={h.id} className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-4 animate-in zoom-in duration-300">
                          <div className={`p-3 rounded-lg ${h.color.class} bg-opacity-20`}>
                            <Home size={32} className={h.color.text} />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs text-emerald-400 font-mono mb-1">Instance of House</div>
                            <div className="font-bold text-white truncate">{h.name}</div>
                            <div className="text-sm text-slate-400">Color: {h.color.id}</div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
                
                {houses.length > 0 && (
                  <button 
                    onClick={() => setHouses([])} 
                    className="mt-4 self-center text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <XCircle size={14} /> เคลียร์พื้นที่
                  </button>
                )}
            </div>
    </div>
  );
}
