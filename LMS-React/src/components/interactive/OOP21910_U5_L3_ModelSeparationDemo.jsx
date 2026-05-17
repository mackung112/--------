import React, { useState, useEffect, useRef } from 'react';
import { FolderTree, FileCode, Play } from 'lucide-react';

export default function OOP21910_U5_L3_ModelSeparationDemo() {
  const [selectedFile, setSelectedFile] = useState('main');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Project Workspace initialized.' },
    { type: 'system', text: 'Select a file to view its contents.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const files = {
    main: { name: 'main.py', desc: 'ไฟล์หลัก (Controller) — นำเข้าไฟล์อื่นๆ มารัน', code: [
      { text: 'from product import Product', color: 'text-pink-400 font-bold' },
      { text: 'from order import Order', color: 'text-pink-400 font-bold' },
      { text: '', color: '' },
      { text: '# สร้าง object จาก Class ที่ถูก import มา', color: 'text-slate-500 italic' },
      { text: 'p = Product("กาแฟ", 50)', color: 'text-white' },
      { text: 'o = Order()', color: 'text-white' },
      { text: 'o.add_item(p)', color: 'text-white' },
      { text: 'print(f"Total: {o.total()} THB")', color: 'text-white' },
    ]},
    product: { name: 'product.py', desc: 'คลาส Product — แยกโมเดลสินค้ามาไว้ไฟล์นี้ไฟล์เดียว', code: [
      { text: 'class Product:', color: 'text-yellow-300 font-bold' },
      { text: '    def __init__(self, name, price):', color: 'text-blue-300' },
      { text: '        self.name = name', color: 'text-white' },
      { text: '        self.price = price', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def __str__(self):', color: 'text-blue-300' },
      { text: '        return f"{self.name} - {self.price} บาท"', color: 'text-green-300' },
    ]},
    order: { name: 'order.py', desc: 'คลาส Order — แยกโมเดลรายการสั่งซื้อมาไว้ไฟล์นี้', code: [
      { text: 'class Order:', color: 'text-yellow-300 font-bold' },
      { text: '    def __init__(self):', color: 'text-blue-300' },
      { text: '        self.items = []', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def add_item(self, product):', color: 'text-blue-300' },
      { text: '        self.items.append(product)', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def total(self):', color: 'text-blue-300' },
      { text: '        return sum(i.price for i in self.items)', color: 'text-white' },
    ]},
  };

  const handleSelect = (key) => {
    setSelectedFile(key);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ cat ${files[key].name}` },
      { type: 'system', text: `Viewed ${files[key].name} (${files[key].code.length} lines)` }
    ]);
  };

  const runMain = () => {
    setSelectedFile('main');
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ python main.py` },
      { type: 'system', text: `Loading product.py...` },
      { type: 'system', text: `Loading order.py...` },
      { type: 'output', text: `Total: 50 THB` },
      { type: 'system', text: `Process finished with exit code 0` }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <FolderTree size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การแยกไฟล์และโมดูล (Model Separation)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เพื่อให้โปรเจกต์ขนาดใหญ่อ่านง่ายและจัดการง่าย เราจะแยกแต่ละคลาส (Class) ออกไปอยู่คนละไฟล์ (File) แล้วค่อย <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">import</code> เข้ามาใช้งานที่ไฟล์หลัก
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Project Explorer */}
          <div className="w-full lg:w-[280px] border-b lg:border-b-0 lg:border-r border-slate-200 bg-[#252526] flex flex-col text-slate-600">
            <div className="px-4 py-3 text-xs font-bold tracking-widest text-slate-600 uppercase">Explorer</div>
            
            <div className="flex-1 py-2">
              <div className="px-2 flex flex-col gap-0.5">
                <div className="px-2 py-1 flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <FolderTree size={14} className="text-slate-600" /> POS_Project
                </div>
                
                {/* File list */}
                {Object.entries(files).map(([key, f]) => (
                  <button key={key} onClick={() => handleSelect(key)}
                    className={`ml-3 px-2 py-1.5 flex items-center gap-2 text-sm rounded-sm transition-colors text-left ${selectedFile === key ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-slate-400'}`}>
                    <FileCode size={14} className={key === 'main' ? 'text-blue-400' : 'text-yellow-500'} />
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#1e1e1e] border-t border-[#333]">
              <button onClick={runMain} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-bold transition-colors flex items-center justify-center gap-2 text-sm shadow-md active:scale-95">
                <Play size={14} fill="currentColor" /> Run main.py
              </button>
            </div>
          </div>

          {/* Right: Code Editor View */}
          <div className="flex-1 bg-[#1e1e1e] flex flex-col min-w-0">
            {/* Editor Tabs */}
            <div className="flex bg-[#2d2d2d] overflow-x-auto custom-scrollbar">
              {Object.entries(files).map(([key, f]) => (
                <button key={key} onClick={() => handleSelect(key)}
                  className={`px-4 py-2 text-sm flex items-center gap-2 border-r border-[#1e1e1e] min-w-max transition-colors ${selectedFile === key ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-slate-400 hover:bg-[#2d2d2d]/80 border-t-2 border-t-transparent'}`}>
                  <FileCode size={14} className={key === 'main' ? 'text-blue-400' : 'text-yellow-500'} />
                  {f.name}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 font-mono text-[14px] leading-relaxed overflow-y-auto bg-[#1e1e1e]">
              <div className="mb-4 text-xs font-sans text-slate-400 bg-slate-800/50 p-2 rounded border border-slate-700">
                ℹ️ {files[selectedFile].desc}
              </div>
              
              <div className="space-y-0.5">
                {files[selectedFile].code.map((line, i) => (
                  <div key={i} className="flex gap-4 hover:bg-white/5 px-2 rounded-sm group">
                    <span className="text-slate-600 w-6 text-right select-none">{i + 1}</span>
                    <span className={`${line.color} whitespace-pre`}>{line.text || '\u00A0'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">bash</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">PS C:\pos_project&gt;</span>{line.text.substring(2)}</div>}
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
