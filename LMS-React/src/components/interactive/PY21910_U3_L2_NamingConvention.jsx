import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Play, Info } from 'lucide-react';

const rules = [
  { id: 'start', rule: 'ต้องขึ้นต้นด้วยตัวอักษร (a-z, A-Z) หรือ _ (underscore)', good: 'student_name', bad: '1student', errorMsg: 'SyntaxError: invalid decimal literal' },
  { id: 'chars', rule: 'ประกอบด้วยตัวอักษร ตัวเลข และ _ เท่านั้น (ห้ามเว้นวรรค ห้ามอักขระพิเศษ)', good: 'total_price_2', bad: 'total-price!', errorMsg: 'SyntaxError: cannot assign to operator' },
  { id: 'case', rule: 'Python แยกแยะตัวพิมพ์เล็ก-ใหญ่ (Case Sensitive)', good: 'Name ≠ name', bad: 'NAME = 10; print(name)', errorMsg: "NameError: name 'name' is not defined" },
  { id: 'reserved', rule: 'ห้ามใช้คำสงวน (Reserved Words) เช่น if, for, while, True', good: 'is_valid', bad: 'if = 10', errorMsg: 'SyntaxError: invalid syntax' },
  { id: 'convention', rule: 'ใช้ snake_case สำหรับตัวแปรและฟังก์ชัน (มาตรฐาน PEP8)', good: 'student_age', bad: 'studentAge', warningMsg: 'PEP 8: variable name should be lowercase (snake_case)' },
];

export default function PY21910_U3_L2_NamingConvention() {
  const [activeRule, setActiveRule] = useState(0);
  const [testVarName, setTestVarName] = useState('');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Name Validator Ready.' },
    { type: 'system', text: 'Type a variable name to check its validity.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const runRuleDemo = (index) => {
    setActiveRule(index);
    const r = rules[index];
    const newHistory = [
      { type: 'system', text: `--- Checking Rule: ${r.id} ---` },
      { type: 'command', text: `${r.good} = "Valid Name"` },
      { type: 'success', text: `✓ Valid assignment.` },
      { type: 'command', text: `${r.bad} = "Invalid Name"` },
    ];
    
    if (r.errorMsg) {
      newHistory.push({ type: 'error', text: r.errorMsg });
    } else if (r.warningMsg) {
      newHistory.push({ type: 'warning', text: r.warningMsg });
    }
    
    setConsoleHistory(newHistory);
  };

  const validateCustomName = (e) => {
    e.preventDefault();
    if (!testVarName.trim()) return;

    const vName = testVarName.trim();
    const newHistory = [...consoleHistory, { type: 'command', text: `${vName} = "Test"` }];

    // Simple Validator Logic
    const reservedWords = ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];
    
    if (reservedWords.includes(vName)) {
      newHistory.push({ type: 'error', text: 'SyntaxError: invalid syntax (Reserved Word)' });
    } else if (/^[0-9]/.test(vName)) {
      newHistory.push({ type: 'error', text: 'SyntaxError: invalid decimal literal (Cannot start with number)' });
    } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(vName)) {
      newHistory.push({ type: 'error', text: 'SyntaxError: invalid character in identifier (Only alphanumeric and _ allowed)' });
    } else if (/[A-Z]/.test(vName)) {
      newHistory.push({ type: 'success', text: `✓ Valid syntax.` });
      newHistory.push({ type: 'warning', text: `Warning: PEP 8 recommends using snake_case (e.g. ${vName.toLowerCase()})` });
    } else {
      newHistory.push({ type: 'success', text: `✓ Valid syntax and follows PEP 8 conventions.` });
    }

    setConsoleHistory(newHistory);
    setTestVarName('');
  };

  const clearConsole = () => {
    setConsoleHistory([]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Simulator Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Terminal size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Python Naming Convention</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้กฎการตั้งชื่อตัวแปรที่ถูกต้อง และทดสอบตั้งชื่อตัวแปรใน Validator Console
        </p>
      </div>

      {/* Interactive Container */}
      <div className="flex flex-col min-h-[450px]">
        
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Visual Explorer (Rules) */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. กฎการตั้งชื่อ (Naming Rules)</h4>
            
            <div className="flex flex-col gap-3">
              {rules.map((r, idx) => {
                const isActive = activeRule === idx;
                return (
                  <button 
                    key={idx} 
                    onClick={() => runRuleDemo(idx)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all active:scale-95 ${
                      isActive 
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-sm mb-2">{idx + 1}. {r.rule}</div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2 text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-emerald-700">
                        <CheckCircle2 size={14} /> {r.good}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-red-600">
                        <XCircle size={14} /> {r.bad}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Control / Gamification (Validator) */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. ทดสอบตั้งชื่อ (Validator)</h4>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                พิมพ์ชื่อตัวแปรที่ต้องการทดสอบ แล้วกด Enter เพื่อตรวจสอบความถูกต้อง
              </p>
              <form onSubmit={validateCustomName} className="flex gap-2">
                <input 
                  type="text" 
                  value={testVarName}
                  onChange={(e) => setTestVarName(e.target.value)}
                  placeholder="เช่น my_var_1"
                  className="flex-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-mono"
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md active:scale-95 transition-all shrink-0"
                >
                  <Play size={18} className="fill-current" />
                </button>
              </form>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <Info size={20} className="text-blue-600 shrink-0" />
              <div className="text-xs text-blue-800 leading-relaxed font-medium">
                <strong>PEP 8 Recommendation:</strong> แนะนำให้ตั้งชื่อตัวแปรให้สื่อความหมาย และใช้ภาษาอังกฤษล้วน (หลีกเลี่ยงภาษาไทย)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-width Console Output (VS Code Style) */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
          {/* Console Header */}
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">name_validator.py</span>
            </div>
            <button 
              onClick={clearConsole}
              className="text-slate-600 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          
          {/* Console Output Area */}
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line.type === 'command' && (
                  <div className="text-slate-600">
                    <span className="text-green-400 mr-2">{">>>"}</span>{line.text}
                  </div>
                )}
                {line.type === 'system' && (
                  <div className="text-slate-700 mt-2 mb-1">{line.text}</div>
                )}
                {line.type === 'success' && (
                  <div className="text-emerald-400">{line.text}</div>
                )}
                {line.type === 'error' && (
                  <div className="text-red-400">{line.text}</div>
                )}
                {line.type === 'warning' && (
                  <div className="text-amber-400">{line.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
