import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Play, Check, X, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L8_CalcLogicTestDemo() {
  const [tests, setTests] = useState([
    { id: 1, desc: 'ราคาสินค้า 3 ชิ้น x 50 บาท', code: 'assert calc_total(3, 50) == 150', fn: (a, b) => a * b, args: [3, 50], expected: 150, passed: null },
    { id: 2, desc: 'ลดราคา 10%', code: 'assert apply_discount(200, 10) == 180', fn: (price, pct) => price - (price * pct / 100), args: [200, 10], expected: 180, passed: null },
    { id: 3, desc: 'บวกภาษี VAT 7%', code: 'assert add_vat(100, 7) == 107', fn: (price, vat) => price + (price * vat / 100), args: [100, 7], expected: 107, passed: null },
    { id: 4, desc: 'ทอนเงิน (จ่าย 100, รวม 73)', code: 'assert calc_change(100, 73) == 27', fn: (paid, total) => paid - total, args: [100, 73], expected: 27, passed: null },
    { id: 5, desc: 'รวมราคาลิสต์', code: 'assert sum_prices([50, 30, 20]) == 100', fn: (arr) => arr.reduce((s, v) => s + v, 0), args: [[50, 30, 20]], expected: 100, passed: null },
  ]);
  const [runIdx, setRunIdx] = useState(-1);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Calculator Logic Test Simulator initialized.' },
    { type: 'system', text: 'Ready to assert test cases.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runSingle = (idx) => {
    setRunIdx(idx);
    const t = tests[idx];
    setConsoleHistory(prev => [...prev, { type: 'command', text: `$ pytest -k "${t.code.split(' ')[1].split('(')[0]}"` }]);

    setTimeout(() => {
      const actual = t.fn(...t.args);
      const isPass = actual === t.expected;
      
      const newTests = [...tests];
      newTests[idx] = { ...t, passed: isPass };
      setTests(newTests);
      setRunIdx(-1);

      setConsoleHistory(prev => [
        ...prev,
        { type: isPass ? 'output' : 'error', text: isPass ? `✅ PASS: ${t.code}` : `❌ FAIL: AssertionError. Expected ${t.expected}, got ${actual}` }
      ]);
    }, 600);
  };

  const runAll = () => {
    setIsRunningAll(true);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pytest test_calculator.py` },
      { type: 'system', text: `============================= test session starts ==============================` }
    ]);

    setTimeout(() => {
      const results = tests.map(t => ({ ...t, passed: t.fn(...t.args) === t.expected }));
      setTests(results);
      setIsRunningAll(false);
      
      const passedCount = results.filter(r => r.passed).length;
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: `test_calculator.py ${'.'.repeat(results.length)}                                                       [100%]` },
        { type: 'output', text: `============================== ${passedCount} passed in 0.05s ===============================` }
      ]);
    }, 1000);
  };

  const resetAll = () => {
    setTests(tests.map(t => ({ ...t, passed: null })));
    setConsoleHistory([
      { type: 'system', text: 'Tests reset.' }
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
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Calculator size={20} className="stroke-2" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">ทดสอบตรรกะการคำนวณ (Business Logic Test)</h3>
          </div>
          {totalRan > 0 && (
            <div className="text-sm bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full border border-indigo-200 shadow-sm">
              {passedCount}/{tests.length} PASS
            </div>
          )}
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">assert</code> เพื่อตรวจสอบสูตรและตรรกะการคำนวณที่สำคัญในระบบ e-Commerce
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Test Cases */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex justify-between items-center">
              <span>Test Cases (test_calculator.py)</span>
              <div className="flex gap-2">
                <button onClick={runAll} disabled={isRunningAll || runIdx >= 0} className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                  <Play size={12} fill="currentColor" /> Run All
                </button>
                <button onClick={resetAll} className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </h4>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {tests.map((t, i) => (
                <div key={t.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all bg-white shadow-sm hover:border-indigo-300 ${t.passed === true ? 'border-emerald-300 bg-emerald-50/30' : t.passed === false ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} ${runIdx === i ? 'animate-pulse border-indigo-400 bg-indigo-50/50' : ''}`}>
                  <div className="shrink-0 mt-0.5">
                    {t.passed === true ? (
                      <div className="bg-emerald-100 p-1.5 rounded-full"><Check size={14} className="text-emerald-600 stroke-[3]" /></div>
                    ) : t.passed === false ? (
                      <div className="bg-red-100 p-1.5 rounded-full"><X size={14} className="text-red-600 stroke-[3]" /></div>
                    ) : runIdx === i ? (
                      <div className="w-7 h-7 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-slate-200 bg-slate-50" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 mb-1 truncate">{t.desc}</div>
                    <div className="bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">
                      {t.code}
                    </div>
                  </div>

                  <button onClick={() => runSingle(i)} disabled={runIdx >= 0 || isRunningAll}
                    className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <Play size={18} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">การทำงานของ Assert</h4>
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6 text-sm text-indigo-900 leading-relaxed">
              <div className="font-mono font-bold text-indigo-700 mb-2 pb-2 border-b border-indigo-200">assert {"<condition>"} == {"<expected>"}</div>
              <ul className="space-y-3 mt-3">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>ถ้าเงื่อนไขเป็นจริง (True) โปรแกรมจะทำงานต่อไปเงียบๆ (ถือว่า <strong>PASS</strong>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>ถ้าเงื่อนไขเป็นเท็จ (False) โปรแกรมจะหยุดและโยน <strong>AssertionError</strong> ทันที (ถือว่า <strong>FAIL</strong>)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800 text-slate-300 p-4 rounded-xl font-mono text-[11px] shadow-inner flex-1 flex flex-col justify-center">
              <div className="text-slate-700 mb-2"># เบื้องหลังฟังก์ชันสมมติ (mock implementation)</div>
              <span className="text-pink-400">def</span> <span className="text-blue-300">apply_discount</span>(<span className="text-orange-300">price</span>, <span className="text-orange-300">pct</span>):<br />
              &nbsp;&nbsp;<span className="text-slate-700"># 200 - (200 * 10 / 100) = 180</span><br />
              &nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">price</span> - (<span className="text-orange-300">price</span> * <span className="text-orange-300">pct</span> / <span className="text-orange-300">100</span>)
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">pytest console</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-emerald-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
