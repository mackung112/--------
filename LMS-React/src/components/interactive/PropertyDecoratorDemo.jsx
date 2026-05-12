import React, { useState } from 'react';
import { Wand2, Keyboard, Play, Lightbulb, MousePointerClick, RotateCcw, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

export default function PropertyDecoratorDemo() {
  const [inputScore, setInputScore] = useState('');
  const [actualScore, setActualScore] = useState(0);
  const [flowActive, setFlowActive] = useState(false);
  const [activeCond, setActiveCond] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const explanations = {
    'create-list': {
      title: 'เตรียม List ว่าง',
      desc: '`[]` คือสัญลักษณ์ของการสร้าง List เปล่าๆ ขึ้นมาเปรียบเสมือนการเตรียมตะกร้าเปล่า 1 ใบเพื่อรอใส่ของ',
      color: 'text-white'
    }
  };

  const handleAssign = () => {
    if (inputScore === '') {
      showToast('กรุณาระบุตัวเลขคะแนนก่อนครับ', 'warning');
      return;
    }

    const value = parseInt(inputScore, 10);
    let finalScore = 0;
    let cond = null;

    if (value < 0) {
      finalScore = 0;
      cond = 'cond1';
      showToast(' Setter ดักจับ: คะแนนติดลบ ปรับเป็น 0 อัตโนมัติ', 'warning');
    } else if (value > 100) {
      finalScore = 100;
      cond = 'cond2';
      showToast(' Setter ดักจับ: คะแนนเกินร้อย ปรับเป็น 100 อัตโนมัติ', 'warning');
    } else {
      finalScore = value;
      cond = 'cond3';
      showToast(' Setter อนุญาต: บันทึกคะแนนสำเร็จ', 'success');
    }

    setActiveCond(cond);
    setFlowActive(true);

    setTimeout(() => {
      setActualScore(finalScore);
      setTimeout(() => {
        setFlowActive(false);
        setActiveCond(null);
      }, 500);
    }, 800);
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
      showToast('กรุณาเติมคำตอบให้ครบทุกช่องก่อนครับ', 'warning');
      return;
    }

    if (ans1 === '@property' && ans2 === '@price.setter' && ans3 === '__price') {
      showToast('ถูกต้องสมบูรณ์แบบ! คุณเข้าใจ @property แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้องครับ ';
      if (ans1 !== '@property') msg += 'ช่อง 1: Getter ต้องใช้ Decorator หลักคืออะไร?';
      else if (ans2 !== '@price.setter') msg += 'ช่อง 2: Setter ต้องตั้งชื่อตามฟังก์ชันเป๊ะๆ คือ @ชื่อ.setter';
      else if (ans3 !== '__price') msg += 'ช่อง 3: ตัวแปรที่เก็บค่าจริงๆ ต้องเป็นแบบ Private (__ นำหน้า)';
      
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
      {/* 1. Interactive Property Setter */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-4 border-b border-slate-700 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <Wand2 className="text-yellow-400" />
                <h3 className="font-bold">Interactive: ระบบบันทึกคะแนนนักเรียน (Smart Setter)</h3>
            </div>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">Private: <code className="font-mono">__score</code></span>
        </div>
        
        <div className="flex flex-col md:flex-row min-h-[350px]">
            {/* Left: User Action */}
            <div className="w-full md:w-1/2 bg-slate-50 p-6 border-r border-slate-200 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Keyboard className="text-slate-500" size={16} /> จำลองการพิมพ์โค้ด (Assign Value)
                </h4>
                <p className="text-xs text-slate-600 mb-6">ลองกำหนดค่าคะแนนที่ <u className="underline underline-offset-2">ผิดปกติ</u> (เช่น ติดลบ หรือ เกิน 100) แล้วดูว่า Setter จัดการอย่างไร</p>
                
                <div className="flex items-center gap-2 mb-4">
                    <code className="text-lg bg-white border border-slate-300 px-3 py-2 rounded text-slate-800 font-mono flex-grow shadow-inner">
                        <span className="text-sky-600">student</span>.<span className="text-pink-600">score</span> = 
                    </code>
                    <input 
                      type="number" 
                      value={inputScore}
                      onChange={(e) => setInputScore(e.target.value)}
                      placeholder="0-100" 
                      className="w-24 text-lg bg-white border-2 border-slate-300 rounded px-3 py-2 outline-none focus:border-indigo-500 font-mono text-center"
                    />
                </div>
                
                <button 
                  onClick={handleAssign}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                    <Play size={18} fill="currentColor" /> รันคำสั่งบรรทัดนี้
                </button>
            </div>

            {/* Right: Behind the scenes */}
            <div className="w-full md:w-1/2 p-6 bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                {/* The Setter Interceptor */}
                <div className={`bg-slate-900 border-2 p-4 rounded-xl shadow-lg z-10 w-full max-w-sm transition-all duration-300 transform ${activeCond ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-700'}`}>
                    <div className="text-[10px] text-pink-400 font-mono mb-1 font-bold">@score.setter (ผู้ตรวจจับ)</div>
                    <div className="font-mono text-sm text-white leading-relaxed">
                        <span className="text-pink-400">def</span> <span className="text-blue-300">score</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">value</span>):<br />
                        &nbsp;&nbsp;<span className="text-pink-400">if</span> value &lt; 0:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = 0 <span className={`transition-all ${activeCond === 'cond1' ? 'bg-yellow-400/20 text-yellow-300 font-bold px-1 rounded' : 'text-slate-400'}`}># ติดลบให้เป็น 0</span><br />
                        &nbsp;&nbsp;<span className="text-pink-400">elif</span> value &gt; 100:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = 100 <span className={`transition-all ${activeCond === 'cond2' ? 'bg-yellow-400/20 text-yellow-300 font-bold px-1 rounded' : 'text-slate-400'}`}># เกินให้เป็น 100</span><br />
                        &nbsp;&nbsp;<span className="text-pink-400">else</span>:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = value <span className={`transition-all ${activeCond === 'cond3' ? 'bg-yellow-400/20 text-yellow-300 font-bold px-1 rounded' : 'text-slate-400'}`}># ปกติ</span>
                    </div>
                </div>

                {/* Flow Line */}
                <div className="w-1 h-8 bg-slate-700 relative overflow-hidden my-1">
                  {flowActive && (
                    <div className="absolute top-0 left-0 w-full h-full bg-emerald-400 animate-[flowAnim_1s_linear_infinite]" style={{ background: 'linear-gradient(to bottom, transparent, #34d399, transparent)' }}></div>
                  )}
                </div>

                {/* The Actual Data (Private) */}
                <div className={`bg-slate-900 border border-emerald-500/50 p-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10 w-40 h-40 flex flex-col items-center justify-center relative transition-transform duration-300 ${flowActive ? 'scale-110' : ''}`}>
                    <div className="text-[10px] text-emerald-400 font-mono mb-1 absolute top-4">ตัวแปรจริง (Private)</div>
                    <div className="text-sm font-mono text-slate-400 mt-2">__score</div>
                    <div className="text-4xl font-mono font-bold text-white mt-1">{actualScore}</div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">วิธีการเขียน (Syntax)</h2>
          <p className="text-slate-600">การสร้าง Property จะต้องสร้าง Getter ก่อนด้วย <code>@property</code> จากนั้นค่อยสร้าง Setter ด้วย <code>@ชื่อฟังก์ชัน.setter</code> โดยทั้งสองฟังก์ชัน <strong className="text-red-500">ต้องตั้งชื่อเหมือนกัน</strong> (คือชื่อที่เราต้องการให้เป็นชื่อ Property)</p>
          
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg text-white leading-relaxed relative">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Student</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># ซ่อนตัวแปรจริงไว้ (Private)</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = <span className="text-purple-300">0</span><br /><br />
              
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># 1. สร้าง Getter เปลี่ยนฟังก์ชันให้กลายเป็น Property</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300 bg-slate-800 px-1 rounded">@property</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-blue-300">score</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">self</span>.__score<br /><br />

              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># 2. สร้าง Setter (ใช้ชื่อฟังก์ชันเดิม + .setter)</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300 bg-slate-800 px-1 rounded">@score.setter</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-blue-300">score</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">value</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> <span className="text-sky-300">value</span> &gt;= <span className="text-purple-300">0</span> <span className="text-pink-400">and</span> <span className="text-sky-300">value</span> &lt;= <span className="text-purple-300">100</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = <span className="text-sky-300">value</span>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg text-slate-700 flex gap-3 shadow-sm">
              <Info className="text-indigo-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                  <strong>ข้อสังเกต:</strong> สังเกตว่าฟังก์ชันทั้งสองตั้งชื่อว่า <code className="bg-indigo-100 px-1 rounded">score</code> เหมือนกันเลย! นี่คือการบอก Python ว่า "ถ้ามีการอ่านค่าให้มาทำงานที่ตัวบน แต่ถ้ามีการกำหนดค่า (=) ให้มาทำงานที่ตัวล่างนะ"
              </div>
          </div>
      </section>

      {/* 3. Interactive Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-300">#</span> ทดสอบความเข้าใจ
          </h2>
          <p className="text-slate-300">ระบบจัดการสินค้า (Product) ต้องการทำ <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">price</code> (ราคา) ให้เป็น Property โดยไม่ให้ราคาติดลบ จงเติม Decorator ให้ถูกต้อง</p>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Product</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">price</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.price = <span className="text-sky-300">price</span> <span className="text-slate-500"># ไปเรียก setter อัตโนมัติ</span><br /><br />
              
              <div className="flex items-center gap-2 pl-8">
                <div 
                  onClick={() => setActiveDropzone(1)}
                  className={`inline-flex items-center justify-center min-w-32 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                >
                  {currentAnswers[1] || ''}
                </div>
                <span className="text-slate-500">&lt;- (สำหรับอ่านค่า)</span>
              </div>
              <div className="pl-8"><span className="text-pink-400">def</span> <span className="text-blue-300">price</span>(<span className="text-orange-300">self</span>):</div>
              <div className="pl-12"><span className="text-pink-400">return</span> <span className="text-orange-300">self</span>.__price</div><br />

              <div className="flex items-center gap-2 pl-8">
                <div 
                  onClick={() => setActiveDropzone(2)}
                  className={`inline-flex items-center justify-center min-w-36 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                >
                  {currentAnswers[2] || ''}
                </div>
                <span className="text-slate-500">&lt;- (สำหรับกำหนดค่า)</span>
              </div>
              <div className="pl-8"><span className="text-pink-400">def</span> <span className="text-blue-300">price</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">value</span>):</div>
              <div className="pl-12"><span className="text-pink-400">if</span> <span className="text-sky-300">value</span> &gt;= <span className="text-purple-300">0</span>:</div>
              <div className="flex items-center gap-1 pl-16">
                  <span className="text-orange-300">self</span>.
                  <div 
                    onClick={() => setActiveDropzone(3)}
                    className={`inline-flex items-center justify-center min-w-24 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-orange-300' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-orange-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
                  >
                    {currentAnswers[3] || ''}
                  </div>
                  <span>=</span> <span className="text-sky-300">value</span>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('@price.setter')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">@price.setter</button>
                  <button onClick={() => handleOptionClick('__price')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-orange-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">__price</button>
                  <button onClick={() => handleOptionClick('@property')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">@property</button>
                  <button onClick={() => handleOptionClick('price')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-orange-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">price</button>
                  <button onClick={() => handleOptionClick('@setter')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">@setter</button>
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
