import React, { useState, useEffect, useRef } from 'react';
import { Wand2, Play, Keyboard, RotateCcw } from 'lucide-react';

export default function OOP21910_U2_L7_PropertyDecoratorDemo() {
  const [inputScore, setInputScore] = useState('');
  const [actualScore, setActualScore] = useState(0);
  const [flowActive, setFlowActive] = useState(false);
  const [activeCond, setActiveCond] = useState(null);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'student = Student() initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleAssign = () => {
    if (inputScore === '') return;

    const value = parseInt(inputScore, 10);
    let finalScore = 0;
    let cond = null;
    let consoleOutput = '';

    setConsoleHistory(prev => [...prev, { type: 'command', text: `$ student.score = ${value}` }]);

    if (value < 0) {
      finalScore = 0;
      cond = 'cond1';
      consoleOutput = `  -> @score.setter intercepted: value < 0. Set to 0.`;
    } else if (value > 100) {
      finalScore = 100;
      cond = 'cond2';
      consoleOutput = `  -> @score.setter intercepted: value > 100. Set to 100.`;
    } else {
      finalScore = value;
      cond = 'cond3';
      consoleOutput = `  -> @score.setter accepted: valid score. Set to ${value}.`;
    }

    setActiveCond(cond);
    setFlowActive(true);

    setTimeout(() => {
      setActualScore(finalScore);
      setConsoleHistory(prev => [...prev, { type: 'output', text: consoleOutput }]);
      setTimeout(() => {
        setFlowActive(false);
        setActiveCond(null);
      }, 500);
    }, 800);
  };

  const clear = () => {
    setInputScore('');
    setActualScore(0);
    setFlowActive(false);
    setActiveCond(null);
    setConsoleHistory([{ type: 'system', text: 'student = Student() initialized.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <Wand2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Property Decorators (@property, @setter)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้การใช้ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">@property</code> เพื่อสร้าง Getter และ Setter ทำให้ตัวแปร Private สามารถถูกอ่านหรือเขียนได้ง่ายเหมือนตัวแปรปกติ แต่ยังคงกรองข้อมูลได้
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Tester */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                  <Keyboard size={16} className="text-slate-400" /> จำลองการ Assign Value
                </h4>
                <p className="text-xs text-slate-500 mb-4">ลองใส่คะแนนที่ <u>ผิดปกติ</u> (เช่น -50 หรือ 999) แล้วดูว่าระบบ Setter ป้องกันอย่างไร</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <code className="bg-slate-100 border border-slate-200 px-3 py-2.5 rounded-lg text-slate-800 font-mono flex-1 text-sm">
                    <span className="text-emerald-600">student</span>.<span className="text-blue-600">score</span> = 
                  </code>
                  <input 
                    type="number" 
                    value={inputScore}
                    onChange={(e) => setInputScore(e.target.value)}
                    placeholder="0-100" 
                    className="w-24 bg-white border-2 border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 font-mono text-center"
                  />
                </div>
                
                <button onClick={handleAssign}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 text-sm">
                  <Play size={16} fill="currentColor" /> รันบรรทัดนี้
                </button>
              </div>

              {/* The Interceptor */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                
                <div className={`bg-slate-900 border-2 p-4 rounded-xl shadow-lg z-10 w-full max-w-sm transition-all duration-300 ${activeCond ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'border-slate-700'}`}>
                  <div className="text-[10px] text-yellow-400 font-mono mb-2 font-bold uppercase tracking-wider">@score.setter (Interceptor)</div>
                  <div className="font-mono text-xs text-white leading-relaxed">
                    <span className="text-pink-400">def</span> <span className="text-blue-300">score</span>(<span className="text-orange-300">self</span>, <span className="text-sky-300">value</span>):<br />
                    &nbsp;&nbsp;<span className="text-pink-400">if</span> value &lt; 0:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = 0 <span className={`transition-colors ${activeCond === 'cond1' ? 'bg-rose-500/50 text-white px-1 rounded' : 'text-slate-500'}`}># ปรับเป็น 0</span><br />
                    &nbsp;&nbsp;<span className="text-pink-400">elif</span> value &gt; 100:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = 100 <span className={`transition-colors ${activeCond === 'cond2' ? 'bg-rose-500/50 text-white px-1 rounded' : 'text-slate-500'}`}># ปรับเป็น 100</span><br />
                    &nbsp;&nbsp;<span className="text-pink-400">else</span>:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = value <span className={`transition-colors ${activeCond === 'cond3' ? 'bg-emerald-500/50 text-white px-1 rounded' : 'text-slate-500'}`}># ปกติ</span>
                  </div>
                </div>

                {/* Flow Line */}
                <div className="w-1 h-8 bg-slate-700 relative overflow-hidden my-2">
                  {flowActive && (
                    <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 animate-[flowAnim_1s_linear_infinite]" style={{ background: 'linear-gradient(to bottom, transparent, #facc15, transparent)' }}></div>
                  )}
                </div>

                {/* The Actual Data */}
                <div className={`bg-slate-900 border border-emerald-500/50 p-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10 w-28 h-28 flex flex-col items-center justify-center relative transition-transform duration-300 ${flowActive ? 'scale-110' : ''}`}>
                  <div className="text-[10px] text-emerald-400 font-mono absolute top-3">self.__score</div>
                  <div className="text-3xl font-mono font-bold text-white mt-3">{actualScore}</div>
                </div>

              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-300 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-yellow-300 bg-slate-800 px-1 rounded">@property</span><br />
              <span className="text-pink-400">def</span> <span className="text-sky-300">score</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">self</span>.__score<br />
              <br />
              <span className="text-yellow-300 bg-slate-800 px-1 rounded">@score.setter</span><br />
              <span className="text-pink-400">def</span> <span className="text-sky-300">score</span>(<span className="text-orange-300">self</span>, value):<br />
              &nbsp;&nbsp;<span className="text-pink-400">if</span> value &gt;= 0 <span className="text-pink-400">and</span> value &lt;= 100:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.__score = value
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-yellow-600 text-sm font-mono mb-1">@property</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    วางไว้บนฟังก์ชัน เพื่อบอกว่าฟังก์ชันนี้คือ <strong className="text-indigo-600">Getter</strong> ทำหน้าที่ส่งคืนค่าจาก Private Variable
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-orange-600 text-sm font-mono mb-1">@name.setter</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    วางไว้บนฟังก์ชัน เพื่อบอกว่าฟังก์ชันนี้คือ <strong className="text-indigo-600">Setter</strong> ทำหน้าที่รับค่ามาตรวจสอบก่อนที่จะบันทึกลงใน Private Variable
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm font-mono mb-1">def score():</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ข้อควรระวัง: ทั้ง Getter และ Setter <strong>ต้องตั้งชื่อฟังก์ชันให้เหมือนกัน</strong> ซึ่งชื่อนั้นจะกลายเป็นชื่อ Property ที่เราใช้เรียกแทนตัวแปร Private (เช่น <code>student.score</code>)
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
              <span className="text-slate-500 text-xs">Event Log</span>
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
