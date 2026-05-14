import React, { useState, useEffect } from 'react';
import { Target, Zap, RotateCcw, AlertCircle, Play, CheckCircle2 } from 'lucide-react';

export default function SQLLikeDemo() {
  const [pattern, setPattern] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('เตรียมตัวยิงเลเซอร์! พิมพ์คำสั่ง LIKE ให้ตรงกับเป้าหมาย');

  const [targets, setTargets] = useState([]);

  // Generate targets based on level
  const startLevel = (lvl) => {
    let words = [];
    if (lvl === 1) {
      words = ['Somchai', 'Somsri', 'Manee', 'Piti', 'Chujai'];
      setMessage('Level 1: ทำลายคำที่ขึ้นต้นด้วย "S" (ใช้ S%)');
    } else if (lvl === 2) {
      words = ['Banana', 'Apple', 'Orange', 'Mango', 'Melon'];
      setMessage('Level 2: ทำลายคำที่มีตัว "a" อยู่ข้างใน (ใช้ %a%)');
    } else if (lvl === 3) {
      words = ['car', 'cat', 'cap', 'dog', 'bat'];
      setMessage('Level 3: ทำลายคำที่ขึ้นต้นด้วย c และลงท้ายด้วย t (ใช้ c%t หรือ c_t)');
    } else {
      setMessage('🎉 ภารกิจสำเร็จทั้งหมด!');
      setTargets([]);
      setIsPlaying(false);
      return;
    }

    const newTargets = words.map((w, i) => ({
      id: i,
      word: w,
      destroyed: false,
      x: Math.random() * 60 + 20, // 20% to 80% width
      y: Math.random() * 40 + 10  // 10% to 50% height
    }));
    
    setTargets(newTargets);
    setPattern('');
    setLevel(lvl);
    setIsPlaying(true);
  };

  const handleFire = (e) => {
    e.preventDefault();
    if (!isPlaying) return;

    // Convert SQL LIKE to JS Regex
    // % -> .*
    // _ -> .
    let regexStr = '^' + pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$';
    let regex;
    try {
      regex = new RegExp(regexStr, 'i');
    } catch (e) {
      setMessage('Syntax Error: รูปแบบ LIKE ไม่ถูกต้อง!');
      return;
    }

    let hits = 0;
    const updatedTargets = targets.map(t => {
      if (!t.destroyed && regex.test(t.word)) {
        hits++;
        return { ...t, destroyed: true };
      }
      return t;
    });

    setTargets(updatedTargets);

    if (hits > 0) {
      setScore(prev => prev + (hits * 100));
      // Check if level clear
      const remaining = updatedTargets.filter(t => !t.destroyed).length;
      
      // Validation rules for levels
      let valid = false;
      if (level === 1 && pattern.toLowerCase() === 's%') valid = true;
      else if (level === 2 && pattern.toLowerCase() === '%a%') valid = true;
      else if (level === 3 && (pattern.toLowerCase() === 'c%t' || pattern.toLowerCase() === 'c_t')) valid = true;

      if (valid) {
        if (remaining === 3 || remaining === 2 || remaining === 4) {
             setMessage(`Boom! โดนไป ${hits} เป้าหมาย! ลุยต่อเลเวลถัดไป`);
             setTimeout(() => startLevel(level + 1), 2000);
        } else {
            // Might have hit but not the right exact ones? Actually if logic valid, we just pass
            setMessage(`Boom! โดนไป ${hits} เป้าหมาย! ลุยต่อเลเวลถัดไป`);
             setTimeout(() => startLevel(level + 1), 2000);
        }
      } else {
        setMessage(`โดนเป้าหมาย แต่ยังไม่ตรงกับโจทย์ที่ขอ ลองใหม่นะ!`);
        setTimeout(() => startLevel(level), 2000);
      }
    } else {
      setMessage('Miss! ยิงพลาด ไม่มีคำไหนตรงกับเงื่อนไขนี้เลย');
    }
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-fuchsia-100 text-fuchsia-600 rounded-xl shrink-0">
          <Target size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">The Regex Blaster (เกมยิงเป้าคำสั่ง LIKE)</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            คำสั่ง <code className="text-fuchsia-600 font-bold bg-fuchsia-50 px-1 rounded">LIKE</code> ใช้สำหรับค้นหาข้อความบางส่วน (Pattern Matching) โดยใช้สัญลักษณ์ <code>%</code> (แทนกี่ตัวอักษรก็ได้) และ <code>_</code> (แทน 1 ตัวอักษร)
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 p-6">
        
        {/* Score Board */}
        <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 text-white font-bold">
          <div className="flex items-center gap-2">
             <Target className="text-fuchsia-400"/> เลเวล {level > 3 ? 3 : level}/3
          </div>
          <div className="text-center text-slate-300 font-normal">
            {message}
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
             <Zap /> Score: {score}
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative w-full h-[300px] bg-slate-950 rounded-xl border-2 border-slate-800 overflow-hidden mb-6"
             style={{ backgroundImage: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)' }}>
          
          {/* Targets */}
          {targets.map(t => (
            <div 
              key={t.id}
              className={`absolute px-4 py-2 rounded-full font-mono text-lg font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500 ${
                t.destroyed ? 'scale-150 opacity-0 bg-red-500 text-white' : 'scale-100 opacity-100 bg-slate-800 text-sky-300 border border-sky-500/30'
              }`}
              style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {t.destroyed ? '💥 BOOM' : t.word}
            </div>
          ))}

          {/* Start Screen Overlay */}
          {!isPlaying && level <= 3 && (
            <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
              <button 
                onClick={() => startLevel(1)}
                className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-xl rounded-full shadow-[0_0_30px_rgba(192,38,211,0.5)] transition-transform hover:scale-110 flex items-center gap-3"
              >
                <Play size={24}/> START GAME
              </button>
            </div>
          )}

          {level > 3 && (
            <div className="absolute inset-0 bg-emerald-900/80 flex flex-col items-center justify-center backdrop-blur-sm z-10 text-white">
              <CheckCircle2 size={64} className="text-emerald-400 mb-4 animate-bounce" />
              <h3 className="text-3xl font-black mb-2">MISSION CLEARED!</h3>
              <p className="text-emerald-200">คุณมีความแม่นยำในการใช้ LIKE ยอดเยี่ยมมาก</p>
              <button 
                onClick={() => { setScore(0); startLevel(1); }}
                className="mt-6 px-6 py-2 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-100 flex items-center gap-2"
              >
                <RotateCcw size={18}/> เล่นอีกครั้ง
              </button>
            </div>
          )}
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleFire} className="flex gap-4">
          <div className="flex-1 bg-slate-800 p-2 rounded-xl flex items-center border border-slate-700 focus-within:border-fuchsia-500 focus-within:ring-1 focus-within:ring-fuchsia-500 transition-all">
            <div className="px-4 text-fuchsia-400 font-mono font-bold">SELECT * FROM words WHERE word LIKE</div>
            <input 
              type="text" 
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-lg"
              placeholder="e.g. %a%"
              disabled={!isPlaying}
              autoFocus
            />
          </div>
          <button 
            type="submit"
            disabled={!isPlaying || !pattern}
            className="px-8 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white font-black rounded-xl transition-all shadow-[0_4px_0_rgb(134,25,143)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(134,25,143)] active:translate-y-[4px] active:shadow-none flex items-center gap-2"
          >
            <Target size={20}/> FIRE!
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400 justify-center">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><strong>%</strong> = กี่ตัวอักษรก็ได้ (หรือไม่มีเลย)</div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><strong>_</strong> = 1 ตัวอักษรเท่านั้น</div>
        </div>
      </div>
    </div>
  );
}
