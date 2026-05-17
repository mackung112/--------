import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, Play } from 'lucide-react';

export default function PY21910_U4_L10_BitwiseOps() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(10);
  const [selected, setSelected] = useState(null);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Python Bitwise Ops Explorer Ready.' },
    { type: 'system', text: 'a = 12  (0000 1100)' },
    { type: 'system', text: 'b = 10  (0000 1010)' },
  ]);
  const consoleRef = useRef(null);

  const toBin = n => (n >>> 0).toString(2).padStart(8, '0');

  const ops = [
    { sym: '&',  name: 'AND',          desc: 'ทั้งสองบิตต้องเป็น 1 ถึงจะได้ 1', result: a & b },
    { sym: '|',  name: 'OR',           desc: 'บิตใดบิตหนึ่งเป็น 1 ได้ผลเป็น 1', result: a | b },
    { sym: '^',  name: 'XOR',          desc: 'บิตต่างกันได้ 1 เหมือนกันได้ 0', result: a ^ b },
    { sym: '~',  name: 'NOT a',        desc: 'กลับทุกบิตของ a', result: ~a },
    { sym: '<<', name: 'เลื่อนซ้าย 1',  desc: 'เลื่อนบิตของ a ไปทางซ้าย 1 ตำแหน่ง (× 2)', result: a << 1 },
    { sym: '>>',  name: 'เลื่อนขวา 1', desc: 'เลื่อนบิตของ a ไปทางขวา 1 ตำแหน่ง (÷ 2)', result: a >> 1 },
  ];

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const runOp = (op) => {
    setSelected(op.sym);
    const expr = op.sym === '~' ? `~a` : op.sym === '<<' ? `a << 1` : op.sym === '>>' ? `a >> 1` : `a ${op.sym} b`;
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `a = ${a}  # ${toBin(a)}` },
      { type: 'command', text: `b = ${b}  # ${toBin(b)}` },
      { type: 'command', text: `print(${expr})` },
      { type: 'output',  text: `${op.result}  # ${toBin(op.result)}` },
    ]);
  };

  const updateValues = () => {
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `a = ${a}  (${toBin(a)})` },
      { type: 'system', text: `b = ${b}  (${toBin(b)})` },
    ]);
  };

  const clear = () => setConsoleHistory([]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Zap size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Bitwise Operators (ตัวดำเนินการระดับบิต)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          สำรวจการทำงานของ Bitwise operators ที่ใช้ในงานระดับ low-level เช่น Network, Cryptography และ Embedded Systems
        </p>
      </div>

      {/* Main */}
      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Input Controls */}
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">1. กำหนดค่า a และ b</h4>
            <div className="flex justify-center gap-6 mb-6">
              <div className="text-center">
                <label className="text-xs text-slate-700 block mb-1 font-medium">a</label>
                <input type="number" value={a}
                  onChange={e => setA(+e.target.value)}
                  className="w-20 text-center text-xl font-bold border-2 border-amber-300 rounded-xl p-2 focus:outline-none focus:border-amber-500" />
                <div className="font-mono text-[11px] text-amber-600 mt-1">{toBin(a)}</div>
              </div>
              <div className="text-center">
                <label className="text-xs text-slate-700 block mb-1 font-medium">b</label>
                <input type="number" value={b}
                  onChange={e => setB(+e.target.value)}
                  className="w-20 text-center text-xl font-bold border-2 border-amber-300 rounded-xl p-2 focus:outline-none focus:border-amber-500" />
                <div className="font-mono text-[11px] text-amber-600 mt-1">{toBin(b)}</div>
              </div>
              <button onClick={updateValues}
                className="self-center px-3 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-200 active:scale-95 transition-all">
                อัปเดตค่า
              </button>
            </div>

            {/* Operation Buttons */}
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">2. เลือก Bitwise Operator</h4>
            <div className="space-y-2">
              {ops.map((op, i) => (
                <button key={i} onClick={() => runOp(op)}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 transition-all active:scale-95 border ${
                    selected === op.sym
                      ? 'bg-amber-50 border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}>
                  <span className="font-mono font-bold text-amber-600 w-10 text-center shrink-0">{op.sym}</span>
                  <span className="text-sm font-medium text-slate-700 w-24 shrink-0">{op.name}</span>
                  <span className="text-xs text-slate-700 flex-1 text-left leading-relaxed">{op.desc}</span>
                  <div className="font-mono text-xs text-slate-600 shrink-0">{toBin(op.result)}</div>
                  <div className="font-bold text-emerald-600 w-12 text-right shrink-0">= {op.result}</div>
                  <Play size={12} className="text-slate-600 shrink-0 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ตารางอ้างอิง Bitwise</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-auto">
              <table className="w-full text-xs text-center font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700">
                    <th className="py-1.5">bit A</th>
                    <th className="py-1.5 border-l border-slate-100">bit B</th>
                    <th className="py-1.5 border-l border-slate-100">AND</th>
                    <th className="py-1.5 border-l border-slate-100">OR</th>
                    <th className="py-1.5 border-l border-slate-100">XOR</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[[0,0],[0,1],[1,0],[1,1]].map(([x,y],i) => (
                    <tr key={i} className={i%2===0 ? 'bg-slate-50' : ''}>
                      <td className="py-1.5 font-bold">{x}</td>
                      <td className="py-1.5 border-l border-slate-100 font-bold">{y}</td>
                      <td className={`py-1.5 border-l border-slate-100 font-bold ${x&&y ? 'text-emerald-600' : 'text-rose-500'}`}>{x&y}</td>
                      <td className={`py-1.5 border-l border-slate-100 font-bold ${x||y ? 'text-emerald-600' : 'text-rose-500'}`}>{x|y}</td>
                      <td className={`py-1.5 border-l border-slate-100 font-bold ${x^y ? 'text-emerald-600' : 'text-rose-500'}`}>{x^y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={clear}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Clear Terminal
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
