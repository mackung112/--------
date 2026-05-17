import React, { useState, useEffect, useRef } from 'react';
import { ListFilter, Play, RotateCcw } from 'lucide-react';

export default function OOP21910_U3_L8_TkinterComboDemo() {
  const [options, setOptions] = useState(['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต']);
  const [selected, setSelected] = useState('');
  const [newOption, setNewOption] = useState('');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Tkinter Combobox widget initialized.' },
    { type: 'system', text: 'Values loaded: ["กรุงเทพฯ", "เชียงใหม่", "ภูเก็ต"]' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const addOption = () => {
    const val = newOption.trim();
    if (!val) return;
    setOptions(prev => [...prev, val]);
    setNewOption('');
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ values = list(combo["values"])` },
      { type: 'command', text: `$ values.append("${val}")` },
      { type: 'command', text: `$ combo["values"] = tuple(values)` },
      { type: 'system', text: `  -> Option "${val}" added.` }
    ]);
  };

  const removeOption = (idx) => {
    const removed = options[idx];
    setOptions(prev => prev.filter((_, i) => i !== idx));
    if (selected === removed) setSelected('');
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `[EVENT] Option "${removed}" removed from list.` }
    ]);
  };

  const handleGetValue = () => {
    if (!selected) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ val = combo.get()` },
        { type: 'system', text: `  -> Returned empty string.` },
        { type: 'output', text: `ค่าที่เลือก: (ไม่ได้เลือก)` }
      ]);
      return;
    }
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ val = combo.get()` },
      { type: 'system', text: `  -> get() returned "${selected}"` },
      { type: 'output', text: `ค่าที่เลือก: ${selected}` }
    ]);
  };

  const clear = () => {
    setOptions(['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต']);
    setSelected('');
    setNewOption('');
    setConsoleHistory([
      { type: 'system', text: 'Tkinter Combobox widget reset to default options.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <ListFilter size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">รับข้อมูลด้วย Combobox (Dropdown)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการใช้ Widget <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">ttk.Combobox</code> เพื่อสร้างรายการตัวเลือกแบบ Dropdown
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              
              {/* Form Config */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">จัดการรายการตัวเลือก (values)</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={newOption} onChange={e => setNewOption(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addOption(); }}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500" placeholder="เพิ่มตัวเลือกใหม่..." />
                    <button onClick={addOption} className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors shadow-sm active:scale-95">เพิ่ม</button>
                  </div>
                  
                  <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
                    {options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
                        <span className="flex-1 text-slate-700">{opt}</span>
                        <button onClick={() => removeOption(i)} className="text-slate-600 hover:text-red-500 transition-colors text-xs font-bold w-5 h-5 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-sm">✕</button>
                      </div>
                    ))}
                    {options.length === 0 && <div className="text-slate-600 text-xs text-center py-2 italic">ไม่มีตัวเลือก</div>}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col items-center justify-center relative min-h-[200px]" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="bg-slate-200 rounded-xl overflow-hidden shadow-2xl w-full max-w-sm border border-slate-400">
                  <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-600 text-xs ml-2 font-mono">Combobox Demo</span>
                  </div>
                  <div className="bg-slate-100 p-8 flex flex-col gap-3 min-h-[160px]">
                    <label className="text-slate-700 text-sm font-semibold">เลือกจังหวัด:</label>
                    <select value={selected} onChange={e => setSelected(e.target.value)}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50">
                      <option value="">-- เลือก --</option>
                      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <button onClick={handleGetValue} className="w-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2">
                      <Play size={14} fill="currentColor" /> เรียก .get()
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[380px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-pink-400">from</span> <span className="text-sky-300">tkinter</span> <span className="text-pink-400">import</span> <span className="text-sky-300">ttk</span><br />
              <br />
              <span className="text-slate-700"># 1. สร้าง Combobox</span><br />
              <span className="text-yellow-300">combo</span> = <span className="text-sky-300">ttk</span>.<span className="text-blue-300">Combobox</span>(<span className="text-yellow-300">root</span>)<br />
              <span className="text-slate-700"># 2. กำหนดรายการตัวเลือก</span><br />
              <span className="text-yellow-300">combo</span>[<span className="text-green-300">"values"</span>] = [<span className="text-green-300">"กทม"</span>, <span className="text-green-300">"ชลบุรี"</span>]<br />
              <span className="text-yellow-300">combo</span>.<span className="text-blue-300">pack</span>()<br />
              <br />
              <span className="text-slate-700"># 3. ดึงข้อมูลที่ถูกเลือก</span><br />
              <span className="text-yellow-300">val</span> = <span className="text-yellow-300">combo</span>.<span className="text-blue-300">get</span>()
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-amber-600 text-sm font-mono mb-1">import ttk</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Combobox ไม่ได้อยู่ใน `tk` โดยตรง แต่อยู่ในโมดูลย่อยชื่อ <code>ttk</code> (Themed Tkinter) ซึ่งเป็น Widget รุ่นใหม่ที่หน้าตาดูทันสมัยขึ้น
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-amber-600 text-sm font-mono mb-1">combo["values"]</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้กำหนดรายการที่จะแสดงใน Dropdown โดยรับข้อมูลเป็น List (เช่น <code>["A", "B", "C"]</code>)
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Event Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
