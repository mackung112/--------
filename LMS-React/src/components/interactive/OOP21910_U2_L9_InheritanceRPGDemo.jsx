import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Sword, Wand2, Heart, RotateCcw } from 'lucide-react';

export default function OOP21910_U2_L9_InheritanceRPGDemo() {
  const [currentObj, setCurrentObj] = useState(null);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Class Hero initialized.' },
    { type: 'system', text: 'Class Warrior(Hero) initialized.' },
    { type: 'system', text: 'Class Mage(Hero) initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const spawnCharacter = (type) => {
    if (type === 'Warrior') {
      setCurrentObj({
        type: 'Warrior',
        name: 'Arthur',
        hp: 100, // from Hero
        weapon: 'Great Sword' // from Warrior
      });
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ arthur = Warrior("Arthur", "Great Sword")` },
        { type: 'system', text: `  -> Called super().__init__("Arthur") to set name & hp.` },
        { type: 'output', text: `  -> Warrior 'Arthur' created.` }
      ]);
    } else if (type === 'Mage') {
      setCurrentObj({
        type: 'Mage',
        name: 'Merlin',
        hp: 100, // from Hero
        mana: 200 // from Mage
      });
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ merlin = Mage("Merlin", 200)` },
        { type: 'system', text: `  -> Called super().__init__("Merlin") to set name & hp.` },
        { type: 'output', text: `  -> Mage 'Merlin' created.` }
      ]);
    }
  };

  const triggerWalk = () => {
    if (!currentObj) return;
    const varName = currentObj.name.toLowerCase();
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ${varName}.walk()` },
      { type: 'system', text: `  -> Method found in parent class (Hero).` },
      { type: 'output', text: `  -> ${currentObj.name} walks forward.` }
    ]);
  };

  const triggerSpecial = () => {
    if (!currentObj) return;
    const varName = currentObj.name.toLowerCase();
    if (currentObj.type === 'Warrior') {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${varName}.slash()` },
        { type: 'system', text: `  -> Method found in child class (Warrior).` },
        { type: 'output', text: `  -> ${currentObj.name} performs a heavy Slash with ${currentObj.weapon}!` }
      ]);
    } else {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${varName}.cast()` },
        { type: 'system', text: `  -> Method found in child class (Mage).` },
        { type: 'output', text: `  -> ${currentObj.name} casts a Fireball! (Mana -20)` }
      ]);
    }
  };

  const clear = () => {
    setCurrentObj(null);
    setConsoleHistory([
      { type: 'system', text: 'Class Hero initialized.' },
      { type: 'system', text: 'Class Warrior(Hero) initialized.' },
      { type: 'system', text: 'Class Mage(Hero) initialized.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <Gamepad2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Inheritance (การสืบทอดคุณสมบัติ)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การสร้างคลาสลูกให้สืบทอดคุณสมบัติจากคลาสแม่ (Parent) เพื่อลดการเขียนโค้ดซ้ำ และสามารถเพิ่มเติมความสามารถเฉพาะตัวได้
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              {/* Hierarchy Visual */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center relative min-h-[160px]">
                {/* Parent */}
                <div className="bg-blue-100 border-2 border-blue-400 text-blue-800 px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-sm z-10 text-center w-32 relative">
                  Hero
                  <span className="text-[9px] font-normal text-blue-600 block leading-tight uppercase tracking-widest mt-1">Parent Class</span>
                  <div className="absolute -bottom-4 left-1/2 w-0.5 h-4 bg-slate-300"></div>
                </div>
                
                {/* Connector */}
                <div className="w-48 h-0.5 bg-slate-300 mt-4 mb-4 relative"></div>
                
                {/* Children */}
                <div className="flex justify-between w-56 relative -top-4">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-slate-300 mb-0"></div>
                    <button onClick={() => spawnCharacter('Warrior')} className="bg-red-50 hover:bg-red-100 border-2 border-red-400 text-red-700 w-24 py-2 rounded-lg font-mono font-bold text-xs shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1 group">
                      <Sword size={16} className="group-hover:scale-110 transition-transform" /> Warrior
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-slate-300 mb-0"></div>
                    <button onClick={() => spawnCharacter('Mage')} className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-400 text-purple-700 w-24 py-2 rounded-lg font-mono font-bold text-xs shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1 group">
                      <Wand2 size={16} className="group-hover:scale-110 transition-transform" /> Mage
                    </button>
                  </div>
                </div>
              </div>

              {/* Character Card */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[220px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                {!currentObj ? (
                  <div className="text-slate-700 text-xs text-center flex flex-col items-center">
                    <Gamepad2 size={32} className="mb-2 opacity-30" />
                    คลิกเลือกคลาสลูกด้านบนเพื่อสร้างตัวละคร
                  </div>
                ) : (
                  <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-300 animate-in zoom-in-95 fade-in duration-300">
                    <div className={`text-white p-3 flex justify-between items-center relative overflow-hidden ${currentObj.type === 'Warrior' ? 'bg-gradient-to-r from-red-700 to-red-900' : 'bg-gradient-to-r from-purple-700 to-purple-900'}`}>
                      <div>
                        <h3 className="text-lg font-bold font-mono">{currentObj.name}</h3>
                        <p className={`text-[10px] px-1.5 py-0.5 rounded inline-block font-mono bg-black/30`}>{currentObj.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase tracking-wider text-slate-600 font-bold mb-0.5">HP (from Hero)</div>
                        <div className="bg-red-500 text-white font-mono font-bold px-2 py-0.5 rounded-full text-xs shadow-inner flex items-center gap-1">
                          <Heart size={10} fill="currentColor" /> <span>{currentObj.hp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 border-b border-slate-200">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="border-r border-slate-200">
                          <h4 className="font-bold text-blue-500 mb-1 text-[9px] uppercase">จาก Parent (Hero)</h4>
                          <div className="font-mono text-slate-600">name: "{currentObj.name}"</div>
                          <div className="font-mono text-slate-600">hp: {currentObj.hp}</div>
                        </div>
                        <div className="pl-2">
                          <h4 className="font-bold text-yellow-600 mb-1 text-[9px] uppercase">เฉพาะตัว ({currentObj.type})</h4>
                          {currentObj.type === 'Warrior' ? (
                            <div className="font-mono text-slate-600">weapon: "{currentObj.weapon}"</div>
                          ) : (
                            <div className="font-mono text-slate-600">mana: {currentObj.mana}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white flex gap-2">
                      <button onClick={triggerWalk} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded text-[10px] font-bold transition-colors border border-slate-300 flex items-center justify-center gap-1 relative overflow-hidden">
                        walk() <span className="absolute bottom-0 right-0 bg-blue-100 text-blue-600 text-[8px] px-1">Parent</span>
                      </button>
                      <button onClick={triggerSpecial} className={`flex-1 text-white py-1.5 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1 relative overflow-hidden ${currentObj.type === 'Warrior' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {currentObj.type === 'Warrior' ? 'slash()' : 'cast()'} <span className="absolute bottom-0 right-0 bg-black/30 text-[8px] px-1 text-white">Self</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[360px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-slate-700"># 1. Parent Class</span><br />
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Hero</span>:<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">__init__</span>(<span className="text-orange-300">self</span>, name):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.name = name<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.hp = 100<br />
              <br />
              <span className="text-slate-700"># 2. Child Class สืบทอดโดยใส่วงเล็บ</span><br />
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Warrior</span>(<span className="text-yellow-300">Hero</span>):<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">__init__</span>(<span className="text-orange-300">self</span>, name, weapon):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">super</span>().<span className="text-pink-400">__init__</span>(name) <span className="text-slate-700"># ให้แม่ตั้งชื่อและ HP ให้</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.weapon = weapon <span className="text-slate-700"># เก็บอาวุธเอง</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-yellow-600 text-sm font-mono mb-1">class Child(Parent):</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    สร้างคลาสลูกโดยใส่ชื่อคลาสแม่ไว้ในวงเล็บ คลาสลูกจะได้รับตัวแปรและเมธอดทั้งหมดจากคลาสแม่โดยอัตโนมัติ (เช่น <code>walk()</code>)
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-sky-600 text-sm font-mono mb-1">super().__init__()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ถ้าคลาสลูกเขียน <code>__init__</code> ใหม่ (เพื่อรับค่าเพิ่ม) เราต้องใช้ <code>super()</code> เรียกตัวสร้างของคลาสแม่ด้วย เพื่อให้คุณสมบัติเดิม (เช่น hp) ถูกสร้างขึ้นอย่างถูกต้อง
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Event Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
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
