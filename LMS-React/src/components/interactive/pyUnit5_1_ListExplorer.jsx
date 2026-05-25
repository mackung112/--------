import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { List, RotateCcw, Plus, X } from 'lucide-react';




export default function pyUnit5_1_ListExplorer() {
  const [items, setItems] = useState(['Python', 'Java', 'C++']);
  const [newItem, setNewItem] = useState('');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'List Explorer Simulator Ready.' },
    { type: 'command', text: 'langs = ["Python", "Java", "C++"]' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const addItem = () => {
    if (newItem.trim()) {
      const val = newItem.trim();
      setItems([...items, val]);
      setNewItem('');
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `langs.append("${val}")` },
        { type: 'output', text: `[${[...items, val].map(i => `"${i}"`).join(', ')}]` }
      ]);
    }
  };

  const removeItem = (idx) => {
    const removed = items[idx];
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `langs.pop(${idx})  # เอา "${removed}" ออก` },
      { type: 'output', text: `[${newItems.map(i => `"${i}"`).join(', ')}]` }
    ]);
  };

  const clear = () => {
    setItems(['Python', 'Java', 'C++']);
    setConsoleHistory([
      { type: 'system', text: 'List Explorer Simulator Ready.' },
      { type: 'command', text: 'langs = ["Python", "Java", "C++"]' }
    ]);
  };

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
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <List size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">List (รายการข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          List คือตัวแปรที่สามารถเก็บข้อมูลได้หลายค่า (เหมือน array) โดยแต่ละค่าจะมี <code className="bg-slate-200 px-1 rounded text-pink-600">index</code> กำกับ เริ่มจาก 0
        </p>
      </div>

      <div className="flex flex-col min-h-[450px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive List */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">จัดการ List</h4>
            
            <div className="flex gap-2 mb-6">
              <input type="text" value={newItem}
                onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addItem()}
                className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="เพิ่มข้อมูลใหม่..." />
              <button onClick={addItem}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center gap-1">
                <Plus size={16} /> เพิ่ม
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 transition-colors group">
                  <div className="bg-slate-200 text-slate-700 text-xs font-mono font-bold px-2 py-1 rounded">
                    [{i}]
                  </div>
                  <span className="flex-1 font-bold text-slate-700 text-sm font-mono">"{item}"</span>
                  <button onClick={() => removeItem(i)}
                    className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-medium">
                    <X size={14} /> ลบ
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-8 text-slate-600 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                  List ว่างเปล่า (Empty List)
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โค้ด Python ที่เทียบเท่า</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm mb-4 flex-1">
              <div className="text-green-400 mb-2">langs = {JSON.stringify(items).replace(/,/g, ', ')}</div>
              <div className="text-slate-700 text-xs mb-3"># จำนวนข้อมูล: {items.length}</div>
              
              {items.length > 0 && (
                <>
                  <div className="text-slate-700 text-xs mb-1 mt-4"># เข้าถึงข้อมูลด้วย Index</div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1 mb-1">
                    <span className="text-pink-400">langs[0]</span>
                    <span className="text-emerald-300">"{items[0]}"</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800/50 rounded px-2 py-1">
                    <span className="text-pink-400">langs[-1]</span>
                    <span className="text-emerald-300">"{items[items.length-1]}"</span>
                  </div>
                </>
              )}
            </div>
            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ตเป็นค่าเริ่มต้น
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
