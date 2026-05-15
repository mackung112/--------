import React, { useState, useEffect, useRef } from 'react';
import { ClipboardCheck, Play, Check, X, Loader2, RotateCcw } from 'lucide-react';

export default function OOP21910_U5_L6_E2ETestDemo() {
  const [tests, setTests] = useState([
    { id: 1, name: 'test_add_to_cart', scenario: 'เพิ่มสินค้าลงตะกร้า', steps: ['เปิดหน้าเมนู', 'คลิก "เอสเปรสโซ่"', 'ตรวจสอบว่าตะกร้ามี 1 รายการ'], passed: null },
    { id: 2, name: 'test_calculate_total', scenario: 'คำนวณราคารวมถูกต้อง', steps: ['เพิ่มสินค้า 2 ชิ้น (45 + 55)', 'ตรวจสอบราคารวม = 100', 'ตรวจสอบ VAT 7% = 7'], passed: null },
    { id: 3, name: 'test_checkout_flow', scenario: 'ออกใบเสร็จได้', steps: ['เพิ่มสินค้าอย่างน้อย 1 รายการ', 'กดปุ่ม "ออกใบเสร็จ"', 'ตรวจสอบว่าใบเสร็จแสดงผลถูกต้อง'], passed: null },
    { id: 4, name: 'test_remove_from_cart', scenario: 'ลบสินค้าออกจากตะกร้า', steps: ['เพิ่มสินค้า', 'กดปุ่มลบ', 'ตรวจสอบว่าตะกร้าว่างเปล่า'], passed: null },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [runIdx, setRunIdx] = useState(-1);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'E2E Testing Framework (pytest + selenium mockup) initialized.' },
    { type: 'system', text: 'Ready to run test suite.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runSingle = (idx) => {
    setIsRunning(true);
    setRunIdx(idx);
    const t = tests[idx];
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pytest test_e2e.py::${t.name} -v` }
    ]);

    setTimeout(() => {
      const newTests = [...tests];
      newTests[idx] = { ...t, passed: true };
      setTests(newTests);
      setRunIdx(-1);
      setIsRunning(false);

      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: `test_e2e.py::${t.name} PASSED [100%]` },
      ]);
    }, 800);
  };

  const runAll = () => {
    setIsRunning(true);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ pytest test_e2e.py -v` },
      { type: 'system', text: `============================= test session starts ==============================` },
      { type: 'system', text: `collecting ... collected ${tests.length} items` }
    ]);

    setTimeout(() => {
      setTests(tests.map(t => ({ ...t, passed: true })));
      setIsRunning(false);
      
      setConsoleHistory(prev => [
        ...prev,
        ...tests.map(t => ({ type: 'output', text: `test_e2e.py::${t.name} PASSED` })),
        { type: 'system', text: `============================== ${tests.length} passed in 3.24s ===============================` },
        { type: 'output', text: `🎉 All End-to-End tests passed successfully! System is ready for deployment.` }
      ]);
    }, 1500);
  };

  const resetAll = () => {
    setTests(tests.map(t => ({ ...t, passed: null })));
    setConsoleHistory([
      { type: 'system', text: 'Test suite reset.' }
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
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ClipboardCheck size={20} className="stroke-2" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">ทดสอบระบบรวม (End-to-End Testing)</h3>
          </div>
          {totalRan > 0 && (
            <div className="text-sm bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full border border-blue-200 shadow-sm">
              {passedCount}/{tests.length} PASS
            </div>
          )}
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          จำลองการทดสอบแบบ End-to-End (E2E) คือการทดสอบโดยจำลองพฤติกรรมผู้ใช้งานจริงตั้งแต่เปิดแอป คลิกปุ่ม จนถึงผลลัพธ์สุดท้าย
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Test Cases */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex justify-between items-center">
              <span>Test Scenarios (test_e2e.py)</span>
              <div className="flex gap-2">
                <button onClick={runAll} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                  {isRunning && runIdx === -1 ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />} Run All
                </button>
                <button onClick={resetAll} disabled={isRunning} className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </h4>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {tests.map((t, i) => (
                <div key={t.id} className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all bg-white shadow-sm hover:border-blue-300 ${t.passed === true ? 'border-emerald-300 bg-emerald-50/30' : t.passed === false ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} ${runIdx === i ? 'animate-pulse border-blue-400 bg-blue-50/50' : ''}`}>
                  <div className="shrink-0 mt-0.5">
                    {t.passed === true ? (
                      <div className="bg-emerald-100 p-1.5 rounded-full"><Check size={16} className="text-emerald-600 stroke-[3]" /></div>
                    ) : t.passed === false ? (
                      <div className="bg-red-100 p-1.5 rounded-full"><X size={16} className="text-red-600 stroke-[3]" /></div>
                    ) : runIdx === i || (isRunning && runIdx === -1) ? (
                      <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-slate-50" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-bold text-slate-800 mb-2">{t.scenario}</div>
                    <div className="space-y-1">
                      {t.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-2 text-xs text-slate-600">
                          <span className="font-mono text-slate-400">{idx + 1}.</span> {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => runSingle(i)} disabled={isRunning}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 mt-0.5">
                    <Play size={18} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">E2E Testing คืออะไร?</h4>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-sm text-blue-900 leading-relaxed shadow-sm">
              <p><strong>End-to-End (E2E) Testing</strong> คือการทดสอบระบบเสมือนมีผู้ใช้งานจริงมากดใช้งาน</p>
              <div className="mt-4 space-y-2">
                <div className="bg-white p-2 rounded border border-blue-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <span className="text-xs">เปิดโปรแกรม / หน้าเว็บ</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <span className="text-xs">พิมพ์ข้อมูลและคลิกปุ่มต่างๆ</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <span className="text-xs">ตรวจสอบผลลัพธ์บนหน้าจอว่าถูกต้องไหม</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1">
               <h5 className="font-bold text-slate-700 text-sm mb-2">เปรียบเทียบกับ Unit Test</h5>
               <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Unit Test:</strong> ทดสอบฟังก์ชันเล็กๆ หลังบ้าน (เจาะจง ลึก)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>E2E Test:</strong> ทดสอบทั้ง Flow การใช้งานตั้งแต่หน้าบ้านยันหลังบ้าน (กว้าง ครอบคลุม)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
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
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-400 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
