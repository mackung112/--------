import React, { useState, useEffect, useRef } from 'react';
import { Sword, Heart, Star, Shield, RotateCcw, Info } from 'lucide-react';

export default function OOP21910_U2_L4_MethodCreationDemo() {
  const [hero, setHero] = useState({
    name: 'Arthur',
    hp: 100,
    level: 1,
    exp: 0
  });
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Class Hero initialized.' },
    { type: 'system', text: 'Created hero1 = Hero("Arthur")' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const attack = () => {
    setHero(prev => ({ ...prev, exp: prev.exp + 20 }));
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: '$ hero1.attack()' },
      { type: 'output', text: '  -> Arthur attacked! Gained 20 EXP.' }
    ]);
  };

  const heal = () => {
    setHero(prev => {
      const healAmount = 30;
      const newHp = Math.min(100, prev.hp + healAmount);
      const actualHeal = newHp - prev.hp;
      
      setConsoleHistory(history => [
        ...history,
        { type: 'command', text: '$ hero1.heal()' },
        { type: 'output', text: `  -> Arthur healed for ${actualHeal} HP.` }
      ]);
      return { ...prev, hp: newHp };
    });
  };

  const levelUp = () => {
    if (hero.exp >= 100) {
      setHero(prev => ({
        ...prev,
        level: prev.level + 1,
        exp: prev.exp - 100,
        hp: 100
      }));
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ hero1.level_up()' },
        { type: 'output', text: `  -> LEVEL UP! Arthur is now Level ${hero.level + 1}. HP restored to max.` }
      ]);
    } else {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ hero1.level_up()' },
        { type: 'system', text: `  -> Failed: Not enough EXP (${hero.exp}/100)` }
      ]);
    }
  };

  const takeDamage = () => {
    setHero(prev => {
      const newHp = Math.max(0, prev.hp - 40);
      setConsoleHistory(history => [
        ...history,
        { type: 'command', text: '$ hero1.take_damage(40)' },
        { type: 'output', text: `  -> Arthur took 40 damage! HP is now ${newHp}.` }
      ]);
      return { ...prev, hp: newHp };
    });
  };

  const clear = () => {
    setHero({ name: 'Arthur', hp: 100, level: 1, exp: 0 });
    setConsoleHistory([
      { type: 'system', text: 'Class Hero initialized.' },
      { type: 'system', text: 'Created hero1 = Hero("Arthur")' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <Sword size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การสร้างพฤติกรรมให้ Object (Methods)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้การสร้าง Method ซึ่งเปรียบเสมือนกริยา (Verb) เพื่อให้ Object สามารถกระทำสิ่งต่างๆ หรือเปลี่ยนแปลงสถานะตัวเองได้
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive UI */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col gap-6 h-full">
              {/* Hero Status Card */}
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shadow-inner">
                      <Shield size={24} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-0.5">Hero Object</div>
                      <h4 className="font-bold text-xl text-white">{hero.name}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Level</div>
                    <div className="text-2xl font-bold text-blue-400 font-mono">{hero.level}</div>
                  </div>
                </div>

                <div className="relative z-10 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-400">HP (Health Points)</span>
                      <span className={hero.hp < 30 ? 'text-red-400' : 'text-emerald-400'}>{hero.hp} / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3 shadow-inner overflow-hidden border border-slate-700">
                      <div className={`h-full transition-all duration-300 ${hero.hp < 30 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${hero.hp}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-400">EXP (Experience)</span>
                      <span className="text-yellow-400">{hero.exp} / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-3 shadow-inner overflow-hidden border border-slate-700">
                      <div className="h-full bg-yellow-500 transition-all duration-300" style={{ width: `${hero.exp}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Methods Control */}
              <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Available Methods</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={attack}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 p-3 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 group">
                    <Sword size={20} className="mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="font-mono font-bold text-xs">attack()</span>
                  </button>
                  <button onClick={heal} disabled={hero.hp >= 100 || hero.hp <= 0}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 p-3 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed">
                    <Heart size={20} className="mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="font-mono font-bold text-xs">heal()</span>
                  </button>
                  <button onClick={levelUp} disabled={hero.exp < 100}
                    className={`col-span-2 p-3 rounded-xl flex items-center justify-center gap-2 transition-all font-mono font-bold text-xs ${hero.exp >= 100 ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300 active:scale-95 shadow-md animate-pulse' : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'}`}>
                    <Star size={16} /> level_up()
                  </button>
                </div>

                {/* Secret method for demo */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <button onClick={takeDamage} disabled={hero.hp <= 0} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                    <Info size={12} /> Test Damage Method
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[340px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-300 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-xs leading-loose overflow-x-auto">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">Hero</span>:<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">attack</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.exp += 20<br />
              <br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">level_up</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> <span className="text-orange-300">self</span>.exp &gt;= 100:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.level += 1
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-sky-600 text-sm font-mono mb-1">def method_name(self):</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    สร้าง Method โดยใช้คำสั่ง <code className="bg-slate-200 px-1 rounded">def</code> เหมือนฟังก์ชันปกติ แต่ต้องอยู่ใต้คลาส และต้องรับ <code className="bg-slate-200 px-1 rounded">self</code> เสมอ
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-orange-600 text-sm font-mono mb-1">self.attribute</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ภายใน Method เราสามารถอ่านหรือเปลี่ยนแปลงคุณสมบัติของ Object ได้ผ่าน <code className="bg-slate-200 px-1 rounded">self</code> เช่น <code className="bg-slate-200 px-1 rounded">self.exp += 20</code>
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Method Call Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
