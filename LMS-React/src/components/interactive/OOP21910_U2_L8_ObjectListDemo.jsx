import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, PackageOpen, Plus, Trash2, ShoppingBasket, Lightbulb, Keyboard, RotateCcw, CheckCircle2, XCircle, AlertCircle, MousePointerClick, Box } from 'lucide-react';

export default function OOP21910_U2_L8_ObjectListDemo() {
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [cartArray, setCartArray] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const listRef = useRef(null);

  // Syntax hover
  const [activeTooltip, setActiveTooltip] = useState(null);
  const explanations = {
    'create-list': {
      title: 'เตรียม List ว่าง',
      desc: '[] คือสัญลักษณ์ของการสร้าง List เปล่าๆ ขึ้นมาเปรียบเสมือนการเตรียมตะกร้าเปล่า 1 ใบเพื่อรอใส่ของ',
      color: 'text-indigo-600'
    },
    'append': {
      title: 'เมธอด .append()',
      desc: 'ฟังก์ชันประจำตัวของ List ใน Python ใช้สำหรับ นำข้อมูลไปต่อท้าย แถวเสมอ ในที่นี้เราสร้าง Product() ขึ้นมาใหม่แล้วโยนเข้าไปเก็บในวงเล็บของ append ได้เลยในบรรทัดเดียว',
      color: 'text-emerald-600'
    },
    'for-loop': {
      title: 'การวนลูป (For Loop)',
      desc: 'for item in cart: หมายถึง "ให้หยิบของในตะกร้า cart ออกมาทีละชิ้น แล้วตั้งชื่อชิ้นที่หยิบมาว่า item"',
      color: 'text-pink-600'
    },
    'access-attr': {
      title: 'การเข้าถึงคุณสมบัติ (Attributes)',
      desc: 'เมื่อหยิบ Object ออกมาเก็บในตัวแปร item แล้ว เราสามารถใช้จุด (Dot) เพื่อดึงข้อมูลข้างในออกมาได้ เช่น item.name หรือ item.price',
      color: 'text-sky-600'
    }
  };

  // Quiz
  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAppend = () => {
    const name = prodName.trim();
    const price = parseFloat(prodPrice);

    if (!name || isNaN(price)) {
      showToast('กรุณากรอกชื่อและราคาให้ครบถ้วนก่อน Append นะครับ', 'warning');
      return;
    }

    const newObj = { id: Date.now(), name, price };
    setCartArray(prev => [...prev, newObj]);
    
    showToast(`Append '${name}' สำเร็จ! (Index: ${cartArray.length})`, 'success');
    
    setProdName('');
    setProdPrice('');
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: listRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [cartArray]);

  const handleClear = () => {
    if(cartArray.length === 0) return;
    setCartArray([]);
    showToast('ล้างข้อมูลใน List เรียบร้อยแล้ว', 'warning');
  };

  const handleOptionClick = (val) => {
    if (activeDropzone <= 3) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 3) setActiveDropzone(activeDropzone + 1);
      else setActiveDropzone(4);
    }
  };

  const checkAnswer = () => {
    const ans1 = currentAnswers[1];
    const ans2 = currentAnswers[2];
    const ans3 = currentAnswers[3];

    if (!ans1 || !ans2 || !ans3) {
      showToast('กรุณาเติมคำสั่งให้ครบถ้วนก่อนตรวจคำตอบครับ', 'warning');
      return;
    }

    if (ans1 === 'append' && ans2 === 'for' && ans3 === 'in') {
      showToast('ถูกต้องยอดเยี่ยม! คุณพร้อมที่จะนำ Object เก็บลง List แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้องครับ ลองคิดดูดีๆ';
      if (ans1 === 'add') msg = 'ช่องที่ 1: ใน Python เราใช้ append ในการเพิ่มข้อมูลเข้า List นะครับ (add มักใช้กับภาษาอื่น)';
      else if (ans1 !== 'append') msg = 'ช่องที่ 1: ใช้คำสั่งอะไรในการ "ต่อท้าย" List?';
      else if (ans2 !== 'for' || ans3 !== 'in') msg = 'ช่องที่ 2 และ 3: โครงสร้างการวนลูปคือ [???] ตัวแปร [???] List:';
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
      {/* 1. Interactive Shopping Cart */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-4 border-b border-slate-700 flex items-center gap-2">
            <ShoppingCart className="text-yellow-400" />
            <h3 className="font-bold">Interactive: ระบบตะกร้าสินค้า (Shopping Cart)</h3>
        </div>
        
        <div className="flex flex-col md:flex-row min-h-[350px]">
            {/* Left: Control Panel */}
            <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 flex flex-col justify-between">
                <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                      <PackageOpen size={16} /> สร้าง Product Object
                    </h4>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-500 mb-1 font-bold">ชื่อสินค้า (Name)</label>
                            <input 
                              type="text" 
                              value={prodName}
                              onChange={(e) => setProdName(e.target.value)}
                              placeholder="เช่น กาแฟเย็น" 
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 mb-1 font-bold">ราคา (Price)</label>
                            <input 
                              type="number" 
                              value={prodPrice}
                              onChange={(e) => setProdPrice(e.target.value)}
                              placeholder="เช่น 45" 
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="mt-6">
                    <button 
                      onClick={handleAppend}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Plus size={18} /> .append() ลงใน List
                    </button>
                    
                    <div className="mt-4 p-3 bg-slate-800 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto whitespace-nowrap">
                        <span className="text-pink-400">cart</span>.append(<span className="text-yellow-300">Product</span>(<span className="text-green-300">"{prodName || '...'}"</span>, <span className="text-purple-300">{prodPrice || 0}</span>))
                    </div>
                </div>
            </div>

            {/* Right: Visual List */}
            <div className="w-full md:w-2/3 p-6 flex flex-col relative bg-slate-100" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                <div className="flex items-center justify-between mb-4 z-10">
                    <div className="font-mono text-lg font-bold text-slate-700 bg-white px-3 py-1 rounded shadow-sm border border-slate-200">
                        cart = [ <span className="text-indigo-600">{cartArray.length} items</span> ]
                    </div>
                    <button onClick={handleClear} className="text-xs text-red-500 hover:text-red-700 underline flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm">
                        <Trash2 size={14} /> ล้างข้อมูล
                    </button>
                </div>

                {/* List Items Container */}
                <div ref={listRef} className="flex gap-4 overflow-x-auto pb-4 items-center flex-grow px-2 z-10">
                    {cartArray.length === 0 ? (
                      <div className="w-full text-center text-slate-400 flex flex-col items-center justify-center space-y-2 my-auto">
                          <ShoppingBasket className="text-4xl opacity-30" size={48} />
                          <p>List ยังว่างเปล่า ลองสร้าง Object แล้ว Add เข้ามาสิครับ</p>
                      </div>
                    ) : (
                      cartArray.map((item, idx) => (
                        <div key={item.id} className="animate-in slide-in-from-right-4 flex-shrink-0 w-48 bg-white border-2 border-slate-300 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center relative group">
                            <div className="absolute -top-3 -right-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded shadow">
                                [{idx}]
                            </div>
                            <div className="w-12 h-12 bg-blue-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-2">
                                <Box size={24} />
                            </div>
                            <div className="font-bold text-slate-800 text-center truncate w-full" title={item.name}>{item.name}</div>
                            <div className="text-sm font-mono text-emerald-600 mt-1">฿{item.price}</div>
                            <div className="text-[10px] text-slate-400 mt-2 font-mono bg-slate-100 px-2 rounded">Object: Product</div>
                        </div>
                      ))
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* 2. Syntax */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">วิธีใช้งาน (Syntax) และการวนลูป (Looping)</h2>
          <p className="text-slate-600">เมื่อเราเก็บ Object หลายๆ ตัวไว้ใน List เราสามารถใช้ <code>for loop</code> เพื่อดึง Object แต่ละตัวออกมาทำงานได้ (เช่น การคำนวณราคารวม หรือการพิมพ์ข้อมูล)</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Code Block */}
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-sm md:text-base overflow-x-auto leading-loose text-white">
                  <span className="text-slate-400"># 1. สร้างคลาส</span><br />
                  <span className="text-pink-400">class</span> <span className="text-yellow-300">Product</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">name</span>, <span className="text-sky-300">price</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.name = name<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.price = price<br /><br />

                  <span className="text-slate-400"># 2. สร้าง List ว่างๆ มารองรับ</span><br />
                  <span 
                    onMouseEnter={() => setActiveTooltip('create-list')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed ${activeTooltip === 'create-list' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >cart = []</span><br /><br />

                  <span className="text-slate-400"># 3. สร้าง Object และเพิ่มเข้า List ทันที</span><br />
                  <span 
                    onMouseEnter={() => setActiveTooltip('append')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed ${activeTooltip === 'append' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >cart.append(</span> <span className="text-yellow-300">Product</span>(<span className="text-green-300">"Water"</span>, <span className="text-purple-300">10</span>) )<br />
                  <span className="text-white">cart.append(</span> <span className="text-yellow-300">Product</span>(<span className="text-green-300">"Bread"</span>, <span className="text-purple-300">20</span>) )<br /><br />

                  <span className="text-slate-400"># 4. วนลูปดึง Object ออกมาใช้งานทีละตัว</span><br />
                  <span 
                    onMouseEnter={() => setActiveTooltip('for-loop')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed text-pink-400 ${activeTooltip === 'for-loop' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >for</span> <span className="text-sky-300">item</span> <span className="text-pink-400">in</span> <span className="text-white">cart:</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span 
                    onMouseEnter={() => setActiveTooltip('access-attr')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed text-yellow-300 ${activeTooltip === 'access-attr' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >print</span>(<span className="text-white">f</span><span className="text-green-300">"สินค้า: {'{'}</span><span className="text-sky-300">item</span><span className="text-white">.name</span><span className="text-green-300">{'}'} ราคา: {'{'}</span><span className="text-sky-300">item</span><span className="text-white">.price</span><span className="text-green-300">{'}'}"</span>)
              </div>

              {/* Explanation Panel */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full min-h-[220px] flex items-center justify-center">
                  {activeTooltip ? (
                    <div className="animate-in fade-in zoom-in-95 w-full text-left p-2">
                        <h4 className={`text-lg font-bold ${explanations[activeTooltip].color} mb-3 border-b pb-2 flex items-center gap-2`}><Lightbulb className="text-yellow-400" />{explanations[activeTooltip].title}</h4>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">{explanations[activeTooltip].desc}</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500">
                        <MousePointerClick className="text-slate-300 text-3xl mb-3 mx-auto" size={32} />
                        ชี้หรือคลิกที่โค้ดที่มี <u className="underline-offset-2 border-slate-400 border-dashed border-b-2 decoration-transparent">เส้นประ</u> ด้านซ้ายเพื่อดูคำอธิบายการทำงาน
                    </div>
                  )}
              </div>
          </div>
      </section>

      {/* 3. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white">
          <div className="flex items-center gap-3 mb-2">
              <Keyboard className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold">ทดสอบความเข้าใจ</h2>
          </div>
          <p className="text-slate-300">คลิกเลือกคำสั่งด้านล่างไปเติมในช่องว่างให้ถูกต้อง เพื่อนำออบเจ็กต์พนักงาน (Employee) เก็บเข้า List และวนลูปแสดงชื่อออกมา</p>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm md:text-base my-6 overflow-x-auto leading-loose whitespace-nowrap">
              <span className="text-slate-400"># เตรียม List ว่าง</span><br />
              <span className="text-white">staff_list = []</span><br /><br />

              <span className="text-slate-400"># นำ Object เก็บเข้า List</span><br />
              <span className="text-white">staff_list.</span>
              <div 
                onClick={() => setActiveDropzone(1)}
                className={`inline-flex items-center justify-center min-w-20 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[1] || ''}
              </div>
              ( <span className="text-yellow-300">Employee</span>(<span className="text-green-300">"Somsak"</span>) )<br /><br />

              <span className="text-slate-400"># วนลูปอ่านข้อมูลทีละคน</span><br />
              <div 
                onClick={() => setActiveDropzone(2)}
                className={`inline-flex items-center justify-center min-w-14 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[2] || ''}
              </div> <span className="text-sky-300">emp</span> 
              <div 
                onClick={() => setActiveDropzone(3)}
                className={`inline-flex items-center justify-center min-w-12 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[3] || ''}
              </div> <span className="text-white">staff_list:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">print</span>(<span className="text-sky-300">emp</span><span className="text-white">.name</span>)
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('append')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">append</button>
                  <button onClick={() => handleOptionClick('for')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">for</button>
                  <button onClick={() => handleOptionClick('add')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">add</button>
                  <button onClick={() => handleOptionClick('in')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">in</button>
                  <button onClick={() => handleOptionClick('while')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">while</button>
              </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
              <button onClick={resetQuiz} className="text-slate-400 hover:text-white transition-colors underline text-sm flex items-center gap-1">
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
