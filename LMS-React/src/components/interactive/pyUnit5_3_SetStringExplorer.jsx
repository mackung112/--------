import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Layers, RotateCcw, Scissors, Hash } from 'lucide-react';




export default function pyUnit5_3_SetStringExplorer() {
  const [tab, setTab] = useState('set');
  const [text, setText] = useState('Hello Python');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Set & String Explorer Ready.' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const switchTab = (t) => {
    setTab(t);
    if (t === 'set') {
      setConsoleHistory([
        { type: 'system', text: '--- Set Explorer ---' },
        { type: 'command', text: 'a = {1, 2, 3, 4}' },
        { type: 'command', text: 'b = {3, 4, 5, 6}' },
      ]);
    } else {
      setConsoleHistory([
        { type: 'system', text: '--- String Slicing Explorer ---' },
        { type: 'command', text: `text = "${text}"` },
      ]);
    }
  };

  const runSetOp = (cmd, output, desc) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: cmd },
      { type: 'output', text: output },
      { type: 'system', text: `# ${desc}` }
    ]);
  };

  const runSliceOp = (cmd, output, desc) => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: cmd },
      { type: 'output', text: `"${output}"` },
      { type: 'system', text: `# ${desc}` }
    ]);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `text = "${newText}"` }
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
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Layers size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Set & String Slicing</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การดำเนินการของ <code className="bg-slate-200 px-1 rounded text-pink-600">Set</code> และการตัดข้อความ (Slicing) ของ <code className="bg-slate-200 px-1 rounded text-pink-600">String</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[480px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button onClick={() => switchTab('set')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              tab === 'set' ? 'border-orange-500 text-orange-700 bg-orange-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            <Hash size={16} /> Set Operations (เซต)
          </button>
          <button onClick={() => switchTab('slice')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              tab === 'slice' ? 'border-violet-500 text-violet-700 bg-violet-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            <Scissors size={16} /> String Slicing (ตัดคำ)
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Section */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {tab === 'set' ? (
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed">
                  <div className="text-pink-400 mb-2"># กำหนด 2 Sets</div>
                  <div className="text-green-400">a = {'{'}1, 2, 3, 4{'}'}</div>
                  <div className="text-green-400 mb-2">b = {'{'}3, 4, 5, 6{'}'}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { cmd: 'a | b', output: '{1, 2, 3, 4, 5, 6}', name: 'Union (รวมทั้งหมด)', desc: 'รวมสมาชิกทั้งหมดที่ไม่มีตัวซ้ำ' },
                    { cmd: 'a & b', output: '{3, 4}', name: 'Intersection (ส่วนที่ซ้ำ)', desc: 'เอาเฉพาะสมาชิกที่มีในทั้ง a และ b' },
                    { cmd: 'a - b', output: '{1, 2}', name: 'Difference (ลบ)', desc: 'เอาเฉพาะส่วนที่มีใน a แต่ไม่มีใน b' },
                    { cmd: 'a ^ b', output: '{1, 2, 5, 6}', name: 'Symmetric Diff', desc: 'เอาทุกส่วน ยกเว้นส่วนที่ซ้ำกัน' },
                  ].map((op, i) => (
                    <button key={i} onClick={() => runSetOp(op.cmd, op.output, op.desc)}
                      className="bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 p-4 rounded-xl text-left transition-all active:scale-95 group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">{op.cmd}</span>
                      </div>
                      <h5 className="font-bold text-slate-700 text-sm">{op.name}</h5>
                      <p className="text-xs text-slate-700 mt-1">{op.output}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 block">ข้อความ (String)</label>
                  <input type="text" value={text} onChange={handleTextChange}
                    className="w-full text-center font-mono text-xl font-bold border-2 border-violet-300 focus:border-violet-500 focus:outline-none rounded-xl p-3 shadow-sm transition-colors" />
                </div>
                
                <div className="flex flex-wrap justify-center gap-1.5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  {text.split('').map((ch, i) => (
                    <div key={i} className="w-10 h-12 bg-white border border-violet-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-lg font-bold text-slate-800">{ch === ' ' ? '␣' : ch}</span>
                      <span className="text-[10px] font-mono text-violet-500">{i}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { cmd: 'text[0:5]', name: 'ระบุช่วง (Start:Stop)', desc: 'เอา 5 ตัวแรก', output: text.slice(0, 5) },
                    { cmd: 'text[6:]', name: 'ตั้งแต่ Index 6 ขึ้นไป', desc: 'เอาตั้งแต่ตัวที่ 6 จนจบ', output: text.slice(6) },
                    { cmd: 'text[:5]', name: 'จนถึง Index 5', desc: 'เอาตั้งแต่เริ่มจนถึงตัวที่ 4', output: text.slice(0, 5) },
                    { cmd: 'text[::-1]', name: 'Step ติดลบ', desc: 'กลับด้านข้อความ (Reverse)', output: text.split('').reverse().join('') },
                  ].map((op, i) => (
                    <button key={i} onClick={() => runSliceOp(op.cmd, op.output, op.desc)}
                      className="bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50 p-4 rounded-xl text-left transition-all active:scale-95">
                      <div className="font-mono font-bold text-violet-600 mb-1">{op.cmd}</div>
                      <h5 className="font-bold text-slate-700 text-sm">{op.name}</h5>
                      <p className="text-xs text-slate-700 mt-1">→ "{op.output}"</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">สรุปแนวคิด</h4>
            {tab === 'set' ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> ใช้เครื่องหมายปีกกา <code className="bg-slate-100 px-1 rounded text-pink-600">{'{ }'}</code> แบบไม่มี Key</li>
                  <li className="flex gap-2 items-start"><span className="text-orange-600 font-bold">✨</span> <strong>ไม่มีค่าซ้ำ</strong> หากใส่ซ้ำ Set จะกรองเหลือตัวเดียวเสมอ</li>
                  <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> ข้อมูลไม่มีลำดับ (Unordered) ไม่สามารถอ้างอิงด้วย Index ได้</li>
                  <li className="flex gap-2"><span className="text-orange-500 font-bold">•</span> มีตัวดำเนินการทางคณิตศาสตร์ให้ใช้ เช่น Union, Intersect</li>
                </ul>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
                <div className="text-sm font-bold text-slate-700 mb-2">Syntax: <code className="font-mono font-normal text-violet-600">[start:stop:step]</code></div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><span className="text-violet-500 font-bold">•</span> <strong className="w-12 inline-block">start</strong> จุดเริ่มต้น (รวมค่ายนี้)</li>
                  <li className="flex gap-2"><span className="text-violet-500 font-bold">•</span> <strong className="w-12 inline-block">stop</strong> จุดสิ้นสุด (ไม่รวมค่านี้!)</li>
                  <li className="flex gap-2 items-start"><span className="text-violet-500 font-bold">•</span> <strong className="w-12 inline-block">step</strong> ก้าวกระโดด (ถ้าใส่ค่าลบจะเป็นการนับถอยหลัง)</li>
                </ul>
                <div className="mt-4 p-3 bg-violet-50 text-violet-700 rounded-lg text-xs leading-relaxed">
                  💡 การทำ Slicing ของ String ให้ผลลัพธ์เป็น String ใหม่เสมอ ค่าดั้งเดิมจะไม่ถูกเปลี่ยนแปลง (Immutable)
                </div>
              </div>
            )}
            <button onClick={clear}
              className={`w-full text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                tab === 'set' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-violet-600 hover:bg-violet-700'
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
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
