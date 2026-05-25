import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Package, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';




export default function pyUnit5_2_TupleDictExplorer() {
  const [tab, setTab] = useState('tuple');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tuple & Dictionary Explorer Ready.' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const switchTab = (t) => {
    setTab(t);
    if (t === 'tuple') {
      setConsoleHistory([
        { type: 'system', text: '--- Tuple Explorer ---' },
        { type: 'command', text: 'colors = ("red", "green", "blue")' },
        { type: 'command', text: 'print(colors)' },
        { type: 'output', text: "('red', 'green', 'blue')" },
      ]);
    } else {
      setConsoleHistory([
        { type: 'system', text: '--- Dictionary Explorer ---' },
        { type: 'command', text: 'student = {"name": "สมชาย", "age": 18}' },
        { type: 'command', text: 'print(student)' },
        { type: 'output', text: "{'name': 'สมชาย', 'age': 18}" },
      ]);
    }
  };

  const tryEditTuple = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'colors[0] = "yellow"' },
      { type: 'error', text: "TypeError: 'tuple' object does not support item assignment" },
      { type: 'system', text: '# Error: Tuple แก้ไขค่าไม่ได้ (Immutable)' }
    ]);
  };

  const tryEditDict = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: 'student["gpa"] = 3.9' },
      { type: 'output', text: '# เพิ่ม Key-Value ใหม่สำเร็จ' },
      { type: 'command', text: 'print(student)' },
      { type: 'output', text: "{'name': 'สมชาย', 'age': 18, 'gpa': 3.9}" }
    ]);
  };

  const clear = () => switchTab(tab);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <Package size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Tuple & Dictionary</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้โครงสร้างข้อมูลแบบ Tuple (ไม่สามารถแก้ไขได้) และ Dictionary (คู่ Key-Value)
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button onClick={() => switchTab('tuple')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              tab === 'tuple' ? 'border-purple-500 text-purple-700 bg-purple-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            📦 Tuple (ทูเพิล)
          </button>
          <button onClick={() => switchTab('dict')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              tab === 'dict' ? 'border-teal-500 text-teal-700 bg-teal-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            📖 Dictionary (ดิกชันนารี)
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Code Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {tab === 'tuple' ? (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed">
                  <div className="text-pink-400 mb-3"># สร้าง Tuple (ใช้วงเล็บ)</div>
                  <div className="text-green-400 mb-2">colors = ("red", "green", "blue")</div>
                  
                  <div className="text-slate-700 mt-4 mb-1"># การเข้าถึงข้อมูล</div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1 mb-1">
                    <span className="text-cyan-300">colors[0]</span>
                    <span className="text-emerald-300">"red"</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1">
                    <span className="text-cyan-300">len(colors)</span>
                    <span className="text-emerald-300">3</span>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h5 className="font-bold text-rose-800 text-sm mb-1">ทดลองแก้ไขค่าใน Tuple</h5>
                      <p className="text-rose-600 text-xs mb-3">Tuple เป็น Immutable (แก้ไขไม่ได้) หากพยายามเปลี่ยนค่าจะเกิด Error</p>
                      <button onClick={tryEditTuple}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-colors active:scale-95">
                        colors[0] = "yellow"
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed">
                  <div className="text-pink-400 mb-3"># สร้าง Dictionary (ใช้วงเล็บปีกกา)</div>
                  <div className="text-green-400">student = {'{'}</div>
                  <div className="ml-4 text-emerald-300">"name"<span className="text-slate-600">: </span><span className="text-green-400">"สมชาย"</span>,</div>
                  <div className="ml-4 text-emerald-300">"age"<span className="text-slate-600">: </span><span className="text-purple-300">18</span></div>
                  <div className="text-green-400 mb-2">{'}'}</div>

                  <div className="text-slate-700 mt-4 mb-1"># การเข้าถึงข้อมูล (ใช้ Key)</div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1 mb-1">
                    <span className="text-cyan-300">student["name"]</span>
                    <span className="text-emerald-300">"สมชาย"</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1">
                    <span className="text-cyan-300">student.get("age")</span>
                    <span className="text-emerald-300">18</span>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h5 className="font-bold text-teal-800 text-sm mb-1">ทดลองเพิ่ม Key-Value ใหม่</h5>
                      <p className="text-teal-600 text-xs mb-3">Dictionary เป็น Mutable (แก้ไขได้) สามารถเพิ่มหรือเปลี่ยนค่าได้อย่างอิสระ</p>
                      <button onClick={tryEditDict}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-colors active:scale-95">
                        student["gpa"] = 3.9
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">สรุปความแตกต่าง</h4>
            {tab === 'tuple' ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">•</span> ใช้เครื่องหมายวงเล็บ <code className="bg-slate-100 px-1 rounded text-pink-600">()</code></li>
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">•</span> ข้อมูลมีลำดับ (Ordered) อ้างอิงด้วย Index</li>
                  <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold">❌</span> <strong>แก้ไขไม่ได้ (Immutable)</strong> เมื่อสร้างแล้วห้ามเปลี่ยน เพิ่ม หรือลบข้อมูล</li>
                  <li className="flex gap-2"><span className="text-purple-500 font-bold">•</span> เหมาะกับข้อมูลคงที่ เช่น พิกัด (x,y), วันในสัปดาห์</li>
                </ul>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-teal-500 font-bold">•</span> ใช้ปีกกา <code className="bg-slate-100 px-1 rounded text-pink-600">{'{ }'}</code></li>
                  <li className="flex gap-2"><span className="text-teal-500 font-bold">•</span> เก็บข้อมูลเป็นคู่ <code className="font-mono text-xs">"Key": Value</code></li>
                  <li className="flex gap-2 items-start"><span className="text-teal-600 font-bold">✅</span> <strong>แก้ไขได้ (Mutable)</strong> สามารถเพิ่ม ลบ และอัปเดตข้อมูลได้ตลอด</li>
                  <li className="flex gap-2"><span className="text-teal-500 font-bold">•</span> เหมาะกับการเก็บโครงสร้างข้อมูลคล้าย JSON หรือข้อมูลที่มี property กำกับ</li>
                </ul>
              </div>
            )}
            <button onClick={clear}
              className={`w-full text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                tab === 'tuple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-teal-600 hover:bg-teal-700'
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
                {line.type === 'error'   && <div className="text-rose-400 font-bold">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
