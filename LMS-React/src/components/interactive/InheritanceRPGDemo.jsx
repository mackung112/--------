import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Sword, Wand2, Star, Flame, Heart, ArrowDown, Check, MousePointerClick, RotateCcw, Keyboard, CheckCircle2, XCircle, AlertCircle, Info, Footprints } from 'lucide-react';

export default function InheritanceRPGDemo() {
  const [currentObj, setCurrentObj] = useState(null);
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Quiz State
  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const explanations = {
    'inherit': {
      title: 'การระบุคลาสแม่',
      desc: 'class Warrior(Hero): หมายถึงการประกาศสร้างคลาส Warrior โดยระบุในวงเล็บว่าจะขอสืบทอดความสามารถ (Inherit) มาจากคลาส Hero',
      color: 'text-white'
    },
    'super': {
      title: 'ฟังก์ชัน super()',
      desc: 'เนื่องจาก Warrior มีการเขียน __init__ ใหม่ (Overriding) หากเราไม่เรียก super().__init__() จะทำให้ name และ hp จากคลาสแม่ไม่ถูกสร้างขึ้นมา super() จึงเปรียบเสมือนตัวแทนที่ใช้เรียกฟังก์ชันจากคลาสแม่นั่นเอง',
      color: 'text-sky-400'
    }
  };

  class Hero {
    constructor(name) {
      this.name = name;
      this.hp = 100;
    }
    walk() {
      return `${this.name} walks forward.`;
    }
  }

  class Warrior extends Hero {
    constructor(name) {
      super(name);
      this.className = "Warrior";
      this.weapon = "Great Sword";
      this.type = "warrior";
    }
    slash() {
      return `${this.name} performs a heavy Slash with ${this.weapon}!`;
    }
  }

  class Mage extends Hero {
    constructor(name) {
      super(name);
      this.className = "Mage";
      this.mana = 200;
      this.type = "mage";
    }
    cast() {
      return `${this.name} casts a Fireball! (Mana -20)`;
    }
  }

  const appendLog = (msg) => {
    setLogs(prev => [...prev, msg]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const spawnCharacter = (type) => {
    if (type === 'Warrior') {
      setCurrentObj(new Warrior("Arthur"));
      setLogs(["> สร้าง Object: arthur = Warrior('Arthur')"]);
      showToast(`สร้าง Object Warrior สำเร็จ!`, 'success');
    } else if (type === 'Mage') {
      setCurrentObj(new Mage("Merlin"));
      setLogs(["> สร้าง Object: merlin = Mage('Merlin')"]);
      showToast(`สร้าง Object Mage สำเร็จ!`, 'success');
    }
  };

  const triggerMethod = (type) => {
    if (!currentObj) return;
    
    if (type === 'walk') {
      appendLog(`> ${currentObj.walk()}`);
    } else if (type === 'special') {
      if (currentObj instanceof Warrior) appendLog(`> ${currentObj.slash()}`);
      else if (currentObj instanceof Mage) appendLog(`> ${currentObj.cast()}`);
    }
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
      showToast('กรุณาเติมคำสั่งให้ครบทุกช่องก่อนตรวจคำตอบครับ', 'warning');
      return;
    }

    if (ans1 === 'Employee' && ans2 === '__init__' && ans3 === 'super()') {
      showToast('ถูกต้องยอดเยี่ยม! คุณเข้าใจการทำงานของ Inheritance และ super() แล้ว', 'success');
      setIsSuccess(true);
    } else {
      let msg = 'ยังไม่ถูกต้องครับ ';
      if (ans1 !== 'Employee') msg += 'ช่องที่ 1: คลาส Manager ต้องสืบทอดจากใคร? (ระบุในวงเล็บ)';
      else if (ans2 !== '__init__') msg += 'ช่องที่ 2: ฟังก์ชันสำหรับสร้าง Object หรือ Constructor ใน Python ชื่ออะไร?';
      else if (ans3 !== 'super()') msg += 'ช่องที่ 3: คำสั่งที่ใช้เป็นตัวแทนเพื่อเรียกใช้คลาสแม่ คือคำสั่งอะไร?';
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
      {/* 1. Interactive RPG Logic */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-4 border-b border-slate-700 flex items-center gap-2">
            <Gamepad2 className="text-yellow-400" />
            <h3 className="font-bold">Interactive: ระบบสร้างตัวละครเกม RPG</h3>
        </div>
        
        <div className="flex flex-col lg:flex-row min-h-[400px]">
            {/* Left: Hierarchy / Control Panel */}
            <div className="w-full lg:w-1/3 bg-slate-50 p-6 border-r border-slate-200 flex flex-col justify-center">
                
                <h4 className="text-sm font-bold text-slate-700 mb-4 text-center">Class Hierarchy (โครงสร้างคลาส)</h4>
                
                {/* Diagram */}
                <div className="flex flex-col items-center mb-8 relative">
                    {/* Parent */}
                    <div className="bg-blue-100 border-2 border-blue-400 text-blue-800 px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-sm z-10 text-center w-32">
                        Hero<br />
                        <span className="text-[10px] font-normal text-blue-600 block leading-tight">Parent Class</span>
                    </div>
                    
                    <div className="h-6 w-0.5 bg-slate-400 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-slate-400"></div>
                    </div>
                    
                    {/* Children */}
                    <div className="flex gap-8 mt-0 w-full justify-center">
                        <div className="relative pt-6 flex flex-col items-center">
                            <div className="absolute top-0 w-0.5 h-6 bg-slate-400"></div>
                            <button onClick={() => spawnCharacter('Warrior')} className="bg-red-50 hover:bg-red-100 border-2 border-red-400 text-red-700 px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-sm transition-transform active:scale-95 w-24 flex flex-col items-center gap-1">
                                <Sword size={18} />
                                Warrior
                            </button>
                        </div>
                        <div className="relative pt-6 flex flex-col items-center">
                            <div className="absolute top-0 w-0.5 h-6 bg-slate-400"></div>
                            <button onClick={() => spawnCharacter('Mage')} className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-400 text-purple-700 px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-sm transition-transform active:scale-95 w-24 flex flex-col items-center gap-1">
                                <Wand2 size={18} />
                                Mage
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-slate-500 text-center bg-white p-3 rounded border border-slate-200 shadow-inner">
                    คลิกเลือก Class ย่อยด้านบนเพื่อสร้าง Object ตัวละครใหม่
                </div>
            </div>

            {/* Right: Character Display Zone */}
            <div className="w-full lg:w-2/3 p-6 bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                
                {!currentObj ? (
                  <div className="text-slate-400 text-center">
                      <Gamepad2 className="text-6xl mb-4 opacity-50 mx-auto" size={64} />
                      <p className="font-mono">รอคำสั่งสร้างออบเจ็กต์ (Object Instantiation)...</p>
                  </div>
                ) : (
                  <div key={currentObj.className} className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-300 animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
                      {/* Card Header */}
                      <div className={`text-white p-4 flex justify-between items-center relative overflow-hidden transition-all duration-500 ${currentObj.type === 'warrior' ? 'bg-gradient-to-r from-red-700 to-red-900' : 'bg-gradient-to-r from-purple-700 to-purple-900'}`}>
                          {/* Background Icon */}
                          {currentObj.type === 'warrior' ? (
                            <Sword className="absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12 transition-all duration-500" size={96} />
                          ) : (
                            <Wand2 className="absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12 transition-all duration-500" size={96} />
                          )}
                          
                          <div>
                              <h3 className="text-xl font-bold font-mono">{currentObj.name}</h3>
                              <p className={`text-xs px-2 py-0.5 rounded inline-block mt-1 font-mono ${currentObj.type === 'warrior' ? 'bg-red-500/50' : 'bg-purple-500/50'}`}>{currentObj.className}</p>
                          </div>
                          <div className="text-right">
                              <div className="text-[10px] uppercase tracking-wider text-slate-300 font-bold mb-1">HP (Inherited)</div>
                              <div className="bg-red-500 text-white font-mono font-bold px-3 py-1 rounded-full text-sm shadow-inner flex items-center gap-1">
                                  <Heart size={12} fill="currentColor" /> <span>{currentObj.hp}</span>
                              </div>
                          </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-4 bg-slate-50 border-b border-slate-200">
                          <div className="flex justify-between items-start mb-3">
                              <div className="w-1/2 pr-2 border-r border-slate-200">
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                      <ArrowDown size={12} className="text-blue-400" /> จาก Parent
                                  </h4>
                                  <ul className="text-sm font-mono text-slate-600 space-y-1">
                                      <li className="flex items-center gap-1"><Check size={10} className="text-emerald-500" />name</li>
                                      <li className="flex items-center gap-1"><Check size={10} className="text-emerald-500" />hp</li>
                                  </ul>
                              </div>
                              <div className="w-1/2 pl-3">
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                      <Star size={12} className="text-yellow-500" fill="currentColor" /> เฉพาะ Child
                                  </h4>
                                  <ul className="text-sm font-mono text-slate-600 space-y-1">
                                      {currentObj.type === 'warrior' ? (
                                        <li className="flex items-center gap-1 text-[11px]"><PlusIcon color="text-red-500" />weapon: <span className="text-red-500">"{currentObj.weapon}"</span></li>
                                      ) : (
                                        <li className="flex items-center gap-1 text-[11px]"><PlusIcon color="text-purple-500" />mana: <span className="text-purple-500">{currentObj.mana}</span></li>
                                      )}
                                  </ul>
                              </div>
                          </div>
                      </div>

                      {/* Card Actions (Methods) */}
                      <div className="p-4 bg-white flex gap-2">
                          <button onClick={() => triggerMethod('walk')} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded text-xs font-bold transition-colors border border-slate-300 shadow-sm relative group flex items-center justify-center gap-1">
                              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[8px] px-1 rounded shadow">Parent</span>
                              <Footprints size={14} /> walk()
                          </button>
                          <button onClick={() => triggerMethod('special')} className={`flex-1 text-white py-2 rounded text-xs font-bold transition-colors shadow-sm relative group flex items-center justify-center gap-1 ${currentObj.type === 'warrior' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                              <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-800 text-[8px] px-1 rounded shadow">Child</span>
                              {currentObj.type === 'warrior' ? <Sword size={14} /> : <Flame size={14} />} <span>{currentObj.type === 'warrior' ? 'slash()' : 'cast()'}</span>
                          </button>
                      </div>
                  </div>
                )}

                {/* Action Log */}
                {logs.length > 0 && (
                  <div ref={logRef} className="mt-6 w-full max-w-sm bg-black/50 text-emerald-400 font-mono text-xs p-3 rounded border border-slate-700 min-h-[60px] max-h-[100px] overflow-y-auto animate-in fade-in">
                    {logs.map((log, i) => <div key={i}>{log}</div>)}
                  </div>
                )}

            </div>
        </div>
      </section>

      {/* 2. Syntax */}
      <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">วิธีการเขียน (Syntax) และการใช้ `super()`</h2>
          <p className="text-slate-600">ในการสืบทอดคลาส เราจะใส่ชื่อคลาสแม่ไว้ในวงเล็บหลังชื่อคลาสลูก และหากคลาสลูกมีการสร้าง <code>__init__</code> ใหม่ เราจำเป็นต้องใช้คำสั่ง <code>super().__init__()</code> เพื่อเรียกใช้ตัวสร้างของคลาสแม่ด้วย เพื่อให้ Attributes ของคลาสแม่ถูกสร้างขึ้นมาอย่างถูกต้อง</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Code Block */}
              <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-sm md:text-base overflow-x-auto leading-loose relative text-white">
                  <span className="text-slate-400"># --- 1. Parent Class (คลาสแม่) ---</span><br />
                  <span className="text-pink-400">class</span> <span className="text-yellow-300">Hero</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">name</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.name = name<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.hp = <span className="text-purple-300">100</span><br /><br />

                  <span className="text-slate-400"># --- 2. Child Class (คลาสลูก) ---</span><br />
                  <span 
                    onMouseEnter={() => setActiveTooltip('inherit')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed ${activeTooltip === 'inherit' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >
                    <span className="text-pink-400">class</span> <span className="text-yellow-300">Warrior</span>(<span className="text-yellow-300">Hero</span>):
                  </span> <span className="text-slate-400">&lt;- ระบุคลาสแม่ในวงเล็บ</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">name</span>, <span className="text-sky-300">weapon</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># เรียก __init__ ของคลาสแม่ (Hero)</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span 
                    onMouseEnter={() => setActiveTooltip('super')}
                    className={`cursor-pointer transition-all border-b-2 border-dashed ${activeTooltip === 'super' ? 'bg-yellow-400/20 border-yellow-400 rounded' : 'border-transparent'}`}
                  >
                    <span className="text-sky-300">super</span>().<span className="text-pink-400">__init__</span>(<span className="text-sky-300">name</span>)
                  </span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># กำหนดค่าเฉพาะตัวของคลาสลูก</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.weapon = weapon<br /><br />
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-blue-300">slash</span>(<span className="text-orange-300">self</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">print</span>(<span className="text-white">f</span><span className="text-green-300">"{'{'}<span className="text-orange-300">self</span>.name{'}'} attacks with {'{'}<span className="text-orange-300">self</span>.weapon{'}'}!"</span>)
              </div>

              {/* Explanation Panel */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full min-h-[220px] flex items-center justify-center">
                  {activeTooltip ? (
                    <div className="animate-in fade-in zoom-in-95 w-full text-left p-2">
                        <h4 className={`text-lg font-bold ${explanations[activeTooltip].color} mb-3 border-b pb-2 flex items-center gap-2`}><Info className="text-yellow-400" />{explanations[activeTooltip].title}</h4>
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
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2 relative z-10">
              <Keyboard className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold">ทดสอบความเข้าใจ</h2>
          </div>
          <p className="text-slate-300 relative z-10">โจทย์: ต้องการสร้างคลาส <code className="bg-slate-700 px-1 rounded">Manager</code> ที่สืบทอดมาจากคลาส <code className="bg-slate-700 px-1 rounded">Employee</code> จงเติมคำสั่งลงในช่องว่างให้ถูกต้องสมบูรณ์</p>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm md:text-base my-6 overflow-x-auto leading-loose whitespace-nowrap relative z-10">
              
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Employee</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def __init__</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">name</span>, <span className="text-sky-300">salary</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.name = <span className="text-sky-300">name</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.salary = <span className="text-sky-300">salary</span><br /><br />

              <span className="text-slate-500"># คลาส Manager สืบทอดจาก Employee</span><br />
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Manager</span>(
              <div 
                onClick={() => setActiveDropzone(1)}
                className={`inline-flex items-center justify-center min-w-24 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 1 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-yellow-300' : currentAnswers[1] ? 'border-indigo-500 bg-slate-800 text-yellow-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[1] || ''}
              </div>
              ):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> 
              <div 
                onClick={() => setActiveDropzone(2)}
                className={`inline-flex items-center justify-center min-w-28 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 2 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-pink-400' : currentAnswers[2] ? 'border-indigo-500 bg-slate-800 text-pink-400' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[2] || ''}
              </div>
              (<span className="text-orange-300">self</span>, <span className="text-sky-300">name</span>, <span className="text-sky-300">salary</span>, <span className="text-sky-300">department</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># เรียกใช้ Constructor ของคลาสแม่</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div 
                onClick={() => setActiveDropzone(3)}
                className={`inline-flex items-center justify-center min-w-24 px-2 h-8 border-2 rounded-md cursor-pointer transition-colors mx-1 translate-y-1 ${activeDropzone === 3 && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-sky-300' : currentAnswers[3] ? 'border-indigo-500 bg-slate-800 text-sky-300' : 'border-dashed border-slate-500 bg-slate-800'}`}
              >
                {currentAnswers[3] || ''}
              </div>
              .<span className="text-pink-400">__init__</span>(<span className="text-sky-300">name</span>, <span className="text-sky-300">salary</span>)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.department = <span className="text-sky-300">department</span>
          </div>

          <div className="space-y-3 relative z-10">
              <p className="text-sm text-slate-400">ตัวเลือก:</p>
              <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleOptionClick('super()')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-sky-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">super()</button>
                  <button onClick={() => handleOptionClick('Employee')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">Employee</button>
                  <button onClick={() => handleOptionClick('self')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-orange-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">self</button>
                  <button onClick={() => handleOptionClick('Manager')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 line-through">Manager</button>
                  <button onClick={() => handleOptionClick('__init__')} disabled={isSuccess} className="bg-slate-700 hover:bg-slate-600 text-pink-400 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600">__init__</button>
              </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700 relative z-10">
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

function PlusIcon({ color }) {
  return (
    <svg className={`w-3 h-3 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
    </svg>
  );
}
