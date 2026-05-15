import React, { useState, useEffect, useRef } from 'react';
import { FlaskConical, Play, Check, X, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L4_UnitTestDemo() {
  const [tests, setTests] = useState([
    { id: 1, name: 'test_add', code: 'assert add(2, 3) == 5', expected: 5, actual: null, passed: null },
    { id: 2, name: 'test_add_negative', code: 'assert add(-1, 1) == 0', expected: 0, actual: null, passed: null },
    { id: 3, name: 'test_add_zero', code: 'assert add(0, 0) == 0', expected: 0, actual: null, passed: null },
    { id: 4, name: 'test_multiply', code: 'assert multiply(3, 4) == 12', expected: 12, actual: null, passed: null },
    { id: 5, name: 'test_multiply_zero', code: 'assert multiply(5, 0) == 0', expected: 0, actual: null, passed: null },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Unit Test Simulator initialized.' },
    { type: 'system', text: 'Ready to run test suite (5 tests).' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runTests = () => {
    setIsRunning(true);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pytest test_math.py` },
      { type: 'system', text: `============================= test session starts ==============================` },
      { type: 'system', text: `collecting ... collected 5 items` }
    ]);

    setTimeout(() => {
      const results = tests.map((t) => {
        const actual = t.expected; // simulate correct results
        return { ...t, actual, passed: actual === t.expected };
      });
      setTests(results);
      setIsRunning(false);
      
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: `test_math.py .....                                                       [100%]` },
        { type: 'system', text: `============================== 5 passed in 0.03s ===============================` },
        { type: 'output', text: `✅ All unit tests passed successfully.` }
      ]);
    }, 800);
  };

  const resetTests = () => {
    setTests(tests.map(t => ({ ...t, actual: null, passed: null })));
    setConsoleHistory([
      { type: 'system', text: 'Test results cleared. Ready to run test suite.' }
    ]);
  };

  const passedCount = tests.filter(t => t.passed === true).length;
  const totalRan = tests.filter(t => t.passed !== null).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <FlaskConical size={20} className="stroke-2" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">การเขียน Unit Test</h3>
          </div>
          {totalRan > 0 && (
            <div className="text-sm bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
              {passedCount}/{totalRan} PASS
            </div>
          )}
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้การใช้คำสั่ง <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">assert</code> เพื่อตรวจสอบว่าฟังก์ชันที่เราเขียนทำงานได้ผลลัพธ์ตรงตามที่คาดหวังหรือไม่
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Code to Test */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ฟังก์ชันที่ต้องการทดสอบ (math_funcs.py)</h4>
            
            <div className="bg-[#1e1e1e] p-5 rounded-2xl shadow-inner border border-slate-700 font-mono text-[13px] leading-loose flex-1">
              <span className="text-slate-500"># ฟังก์ชันบวกเลข</span><br />
              <span className="text-pink-400">def</span> <span className="text-blue-300">add</span>(<span className="text-orange-300">a</span>, <span className="text-orange-300">b</span>):<br />
              &nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">a</span> + <span className="text-orange-300">b</span><br />
              <br />
              <span className="text-slate-500"># ฟังก์ชันคูณเลข</span><br />
              <span className="text-pink-400">def</span> <span className="text-blue-300">multiply</span>(<span className="text-orange-300">a</span>, <span className="text-orange-300">b</span>):<br />
              &nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">a</span> * <span className="text-orange-300">b</span>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={runTests} disabled={isRunning} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                <Play size={16} fill="currentColor" /> {isRunning ? 'กำลังทดสอบ...' : 'รัน Test Suite'}
              </button>
              <button onClick={resetTests} className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          {/* Right: Test Cases */}
          <div className="w-full lg:w-[450px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">กรณีทดสอบ (Test Cases - test_math.py)</h4>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {tests.map(t => (
                <div key={t.id} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all ${t.passed === true ? 'bg-emerald-50 border-emerald-200' : t.passed === false ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                  <div className="mt-0.5 shrink-0">
                    {t.passed === true ? (
                      <div className="bg-emerald-100 p-1 rounded-full"><Check size={14} className="text-emerald-600 stroke-[3]" /></div>
                    ) : t.passed === false ? (
                      <div className="bg-red-100 p-1 rounded-full"><X size={14} className="text-red-600 stroke-[3]" /></div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-slate-50" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-800 font-bold text-sm truncate">{t.name}</span>
                      {t.passed !== null && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${t.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {t.passed ? 'PASS' : 'FAIL'}
                        </span>
                      )}
                    </div>
                    <div className="bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">
                      {t.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <h5 className="font-bold text-emerald-700 text-sm font-mono mb-1">assert condition</h5>
              <p className="text-xs text-emerald-800/80 leading-relaxed">
                คำสั่ง <code className="bg-emerald-200/50 px-1 rounded">assert</code> จะตรวจสอบว่าเงื่อนไขเป็น <code>True</code> หรือไม่ หากเป็น <code>False</code> โปรแกรมจะแจ้งเตือน <code>AssertionError</code> ทันที ซึ่งเราใช้กลไกนี้เพื่อยืนยันความถูกต้องของฟังก์ชัน
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">pytest console</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-emerald-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-400 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
