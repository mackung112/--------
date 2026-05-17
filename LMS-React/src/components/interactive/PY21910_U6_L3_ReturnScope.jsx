import React, { useState, useEffect, useRef } from 'react';
import { CornerDownLeft, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function PY21910_U6_L3_ReturnScope() {
  const [tab, setTab] = useState('return');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'return & Scope Explorer Ready.' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const switchTab = (t) => {
    setTab(t);
    if (t === 'return') {
      setConsoleHistory([
        { type: 'system', text: '--- Return Statement Explorer ---' },
        { type: 'command', text: 'def add(a, b):\n    return a + b' },
      ]);
    } else {
      setConsoleHistory([
        { type: 'system', text: '--- Variable Scope Explorer ---' },
        { type: 'command', text: 'x = "Global"' },
        { type: 'command', text: 'def test():\n    x = "Local"\n    print(f"ในฟังก์ชัน x = {x}")' },
      ]);
    }
  };

  const runReturnOp = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'total = add(3, 5)' },
      { type: 'command', text: 'print(total)' },
      { type: 'output', text: '8' },
      { type: 'system', text: '# ฟังก์ชันส่งค่า 8 กลับมาเก็บไว้ในตัวแปร total' }
    ]);
  };

  const runScopeOp = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'test()' },
      { type: 'output', text: 'ในฟังก์ชัน x = Local' },
      { type: 'command', text: 'print(f"นอกฟังก์ชัน x = {x}")' },
      { type: 'output', text: 'นอกฟังก์ชัน x = Global' },
      { type: 'system', text: '# ตัวแปร Local ไม่กระทบกับ Global' }
    ]);
  };

  const clear = () => switchTab(tab);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <CornerDownLeft size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">return & ขอบเขตตัวแปร (Scope)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ทำความเข้าใจการส่งค่ากลับด้วย <code className="bg-slate-200 px-1 rounded text-pink-600">return</code> และความแตกต่างระหว่างตัวแปร Local กับ Global
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button onClick={() => switchTab('return')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              tab === 'return' ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            ↩️ การส่งค่ากลับ (return)
          </button>
          <button onClick={() => switchTab('scope')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              tab === 'scope' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            🌍 Local vs Global Scope
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Section */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {tab === 'return' ? (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed">
                  <div className="text-pink-400">def <span className="text-blue-400 font-bold">add</span>(<span className="text-orange-300">a</span>, <span className="text-orange-300">b</span>):</div>
                  <div className="ml-4 text-emerald-300">result = a + b</div>
                  <div className="ml-4 mt-2 mb-4">
                    <span className="bg-pink-500 text-white px-1.5 py-0.5 rounded font-bold">return</span> <span className="text-emerald-300">result</span>
                    <span className="text-slate-700 ml-2"># ส่งค่ากลับ</span>
                  </div>
                  
                  <div className="text-slate-700 mb-1"># การเรียกใช้และรับค่ากลับ</div>
                  <div className="text-yellow-300">total = add(3, 5)</div>
                  <div className="text-cyan-300">print(total)</div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h5 className="font-bold text-indigo-800 text-sm mb-1">ทดลองรันโค้ด</h5>
                      <p className="text-indigo-600 text-xs mb-3">ดูการทำงานของการคืนค่า (return) ไปเก็บไว้ในตัวแปร</p>
                      <button onClick={runReturnOp}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-colors active:scale-95">
                        รันโค้ด
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-slate-700">ตัวแปร Global (อยู่ข้างนอกฟังก์ชัน)</span>
                  </div>
                  <div className="text-emerald-300 mb-4">x = <span className="text-rose-400 font-bold">"Global"</span></div>

                  <div className="text-pink-400">def <span className="text-blue-400 font-bold">test</span>():</div>
                  <div className="ml-4 flex items-center gap-2 mt-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className="text-slate-700">ตัวแปร Local (อยู่ข้างในฟังก์ชัน สร้างใหม่)</span>
                  </div>
                  <div className="ml-4 text-emerald-300">x = <span className="text-cyan-400 font-bold">"Local"</span></div>
                  <div className="ml-4 text-cyan-300 mt-2">print(f"ในฟังก์ชัน x = {'{'}x{'}'}")</div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h5 className="font-bold text-amber-800 text-sm mb-1">ทดสอบเรื่องขอบเขต (Scope)</h5>
                      <p className="text-amber-700 text-xs mb-3">เมื่อรันฟังก์ชัน ตัวแปร Local จะไม่ไปทับตัวแปร Global ที่ชื่อเหมือนกัน</p>
                      <button onClick={runScopeOp}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-colors active:scale-95">
                        test() แล้วเรียก print(x)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">สรุปแนวคิด</h4>
            {tab === 'return' ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex gap-2 items-start">
                    <span className="text-indigo-500 font-bold mt-1">1.</span> 
                    <span><strong className="text-slate-800">คืนค่าผลลัพธ์</strong> ออกจากฟังก์ชันไปให้คนเรียกใช้งาน</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-indigo-500 font-bold mt-1">2.</span> 
                    <span>เมื่อฟังก์ชันเจอคำสั่ง <code>return</code> <strong className="text-rose-600">ฟังก์ชันจะจบการทำงานทันที</strong> (โค้ดบรรทัดหลังจาก return จะไม่ถูกรัน)</span>
                  </li>
                  <li className="flex gap-2 items-start p-3 bg-indigo-50 text-indigo-800 rounded-lg">
                    <span className="font-bold">💡</span> 
                    <span className="text-xs">ถ้าฟังก์ชันไม่มีคำสั่ง return, Python จะแอบคืนค่า <code>None</code> ให้โดยอัตโนมัติ</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex gap-2 items-start">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 shrink-0 mt-1"></div>
                    <div><strong className="text-slate-800">Local Scope</strong><br/>ตัวแปรที่สร้างในฟังก์ชัน จะถูกทำลายทิ้งทันทีเมื่อฟังก์ชันทำงานเสร็จ คนนอกมองไม่เห็น</div>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shrink-0 mt-1"></div>
                    <div><strong className="text-slate-800">Global Scope</strong><br/>ตัวแปรที่สร้างไว้นอกสุดของไฟล์ ฟังก์ชันสามารถอ่านค่าได้ แต่แก้ไขค่าตรงๆ ไม่ได้ (ต้องใช้คำสั่ง global)</div>
                  </li>
                </ul>
              </div>
            )}
            <button onClick={clear}
              className={`w-full text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                tab === 'return' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-600 hover:bg-amber-700'
              }`}>
              <RotateCcw size={16} /> รีเซ็ตหน้าต่าง
            </button>
          </div>
        </div>

        {/* Bottom VS Code Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">python -i</span>
            </div>
            <button onClick={clear} className="text-slate-600 hover:text-white flex items-center gap-1 text-xs">
              <RotateCcw size={14} /> Clear
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-green-400 mr-2">{">>>"}</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
