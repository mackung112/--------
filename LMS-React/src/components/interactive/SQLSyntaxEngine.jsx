import React, { useState, useEffect, useRef } from 'react';
import { MousePointerClick, TerminalSquare, RotateCcw } from 'lucide-react';

export default function SQLSyntaxEngine({ title, icon: Icon, description, codeParts, explanations}) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [qa, setQa] = useState(null);
  const [qc, setQc] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'SQL Syntax Parser Initialized.' },
    { type: 'system', text: 'Waiting for syntax block selection...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleHover = (key) => {
    if (activeTooltip === key) return;
    setActiveTooltip(key);
    const exp = explanations[key];
    if (exp) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ parser.inspect("${key}")` },
        { type: 'output', text: `> Analyzing Token: [${exp.title}]` },
        { type: 'system', text: `> ${exp.desc}` }
      ]);
    }
  };

  const submitQuiz = () => {
    if (!qa) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'error', text: 'Error: No answer selected.' }
      ]);
      return;
    }
    setQc(true); 
    const isCorrect = quiz.opts.find(o => o.val === qa)?.correct;
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ eval_quiz(answer="${qa}")` },
      { type: 'system', text: `> Checking against knowledge base...` },
      { type: isCorrect ? 'success' : 'error', text: isCorrect ? '✅ STATUS: CORRECT (1/1 points)' : '❌ STATUS: FAILED (Incorrect Selection)' }
    ]);
  };

  const resetQuiz = () => {
    setQa(null);
    setQc(false);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `> Quiz environment reset.` }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Icon size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">{description}</p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Syntax Viewer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <TerminalSquare size={16} /> SQL Syntax Explorer
            </h4>

            <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-700 font-mono text-base text-white leading-loose overflow-x-auto my-auto">
              {codeParts.map((part, i) => {
                if (part.key && explanations[part.key]) {
                  const isActive = activeTooltip === part.key;
                  const color = explanations[part.key].color || 'text-yellow-300';
                  return (
                    <span 
                      key={i}
                      onMouseEnter={() => handleHover(part.key)}
                      onClick={() => handleHover(part.key)}
                      className={`cursor-pointer border-b-2 border-dashed transition-all px-1.5 py-0.5 mx-0.5 ${isActive ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-slate-500'} ${color}`}
                    >
                      {part.text}
                    </span>
                  );
                }
                return <span key={i} className={part.className || 'text-slate-300'} dangerouslySetInnerHTML={{__html: part.text}} />;
              })}
            </div>
          </div>

          {/* Right: Explanation & Quiz */}
          <div className="w-full lg:w-[400px] bg-white flex flex-col relative">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Definition Box */}
              <div>
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3">
                  Token Definition
                </h4>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl min-h-[140px] flex items-center justify-center">
                  {activeTooltip && explanations[activeTooltip] ? (
                    <div className="w-full text-left animate-in fade-in duration-300">
                        <h4 className={`text-sm font-bold ${explanations[activeTooltip].color || 'text-indigo-600'} mb-2 flex items-center gap-2 uppercase tracking-wide`}>
                          {explanations[activeTooltip].title}
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed">{explanations[activeTooltip].desc}</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-600 flex flex-col items-center">
                        <MousePointerClick className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Hover a keyword</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quiz Box */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-3 flex items-center gap-2">
                  <span className="text-yellow-500">?</span> Knowledge Check
                </h4>
                <p className="text-sm text-slate-800 font-bold mb-4 leading-relaxed">{quiz.q}</p>
                
                <div className="space-y-2">
                  {quiz.opts.map(o => (
                    <button 
                      key={o.val} 
                      onClick={() => { if (!qc) setQa(o.val) }} 
                      className={`w-full text-left p-3 rounded-lg border-2 font-semibold transition-all text-sm shadow-sm ${
                        qc && o.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 
                        qc && qa === o.val && !o.correct ? 'border-red-400 bg-red-50 text-red-800' : 
                        qa === o.val ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 
                        'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={resetQuiz} className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                    <RotateCcw size={16}/>
                  </button>
                  <button 
                    onClick={submitQuiz}
                    disabled={qc}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white py-2 rounded-lg font-bold transition-all shadow-md text-sm"
                  >
                    ตรวจคำตอบ
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Syntax Engine</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">&gt;&gt;&gt;</span> <div className="text-slate-600">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text.substring(2)}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0">[Sys]</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-red-400 font-bold shrink-0">[Err]</span> <div className="text-red-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-400 font-bold shrink-0">[Ok]</span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
