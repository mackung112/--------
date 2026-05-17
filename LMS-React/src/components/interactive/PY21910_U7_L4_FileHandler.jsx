import React, { useState, useEffect, useRef } from 'react';
import { FolderOpen, RotateCcw, FileText, Database, FilePlus, Download } from 'lucide-react';

export default function PY21910_U7_L4_FileHandler() {
  const [tab, setTab] = useState('read');
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'File Handler Simulator Ready.' }
  ]);
  const consoleRef = useRef(null);

  const csvData = 'name,price,qty\nApple,30,5\nBanana,15,10\nOrange,25,8';
  const rows = csvData.split('\n').map(r => r.split(','));

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const switchTab = (t) => {
    setTab(t);
    if (t === 'read') {
      setConsoleHistory([
        { type: 'system', text: '--- Read File Explorer (.txt) ---' },
        { type: 'command', text: 'with open("data.txt", "r", encoding="utf-8") as f:' },
        { type: 'command', text: '    content = f.read()' },
        { type: 'command', text: '    print(content)' },
        { type: 'output', text: 'สวัสดีชาว Python!\nยินดีต้อนรับสู่การจัดการไฟล์' }
      ]);
    } else if (t === 'write') {
      setConsoleHistory([
        { type: 'system', text: '--- Write File Explorer (.txt) ---' },
        { type: 'command', text: 'with open("output.txt", "w", encoding="utf-8") as f:' },
        { type: 'command', text: '    f.write("สร้างไฟล์ใหม่สำเร็จ\\n")' },
        { type: 'command', text: '    f.write("บรรทัดที่ 2")' },
        { type: 'system', text: '# บันทึกไฟล์ output.txt เรียบร้อยแล้ว' }
      ]);
    } else {
      setConsoleHistory([
        { type: 'system', text: '--- CSV Data Explorer (.csv) ---' },
        { type: 'command', text: 'import csv' },
        { type: 'command', text: 'with open("products.csv", "r") as f:' },
        { type: 'command', text: '    reader = csv.reader(f)' },
        { type: 'command', text: '    for row in reader:' },
        { type: 'command', text: '        print(row)' },
        { type: 'output', text: "['name', 'price', 'qty']" },
        { type: 'output', text: "['Apple', '30', '5']" },
        { type: 'output', text: "['Banana', '15', '10']" },
        { type: 'output', text: "['Orange', '25', '8']" }
      ]);
    }
  };

  const clear = () => switchTab(tab);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <FolderOpen size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การทำงานกับไฟล์ (File Handling)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การอ่าน (Read) การเขียน (Write) และการจัดการข้อมูลแบบตารางด้วยไฟล์ CSV
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button onClick={() => switchTab('read')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              tab === 'read' ? 'border-sky-500 text-sky-700 bg-sky-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            <FileText size={16} /> 📖 อ่านไฟล์
          </button>
          <button onClick={() => switchTab('write')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              tab === 'write' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            <FilePlus size={16} /> ✍️ เขียนไฟล์
          </button>
          <button onClick={() => switchTab('csv')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
              tab === 'csv' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}>
            <Database size={16} /> 📊 อ่าน CSV
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Code Explorer */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-center">
            
            {tab === 'read' && (
              <div className="space-y-4 max-w-xl mx-auto w-full">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed shadow-inner">
                  <div className="text-slate-700 mb-2"># ใช้ with open() เพื่อความปลอดภัย (ปิดไฟล์ให้อัตโนมัติ)</div>
                  <div><span className="text-pink-400">with</span> <span className="text-sky-300">open</span>(<span className="text-emerald-300">"data.txt"</span>, <span className="text-emerald-300">"r"</span>, encoding=<span className="text-emerald-300">"utf-8"</span>) <span className="text-pink-400">as</span> f:</div>
                  <div className="ml-4 text-cyan-300">content = f.read()</div>
                  <div className="ml-4 text-cyan-300">print(content)</div>
                </div>
                <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 text-sky-800 p-4 rounded-xl text-sm">
                  <Download size={24} className="text-sky-500 shrink-0" />
                  <p>โหมด <code className="bg-white px-1 rounded font-bold text-sky-600">"r"</code> (Read) ใช้สำหรับอ่านไฟล์อย่างเดียว หากไม่มีไฟล์อยู่จะเกิด Error</p>
                </div>
              </div>
            )}

            {tab === 'write' && (
              <div className="space-y-4 max-w-xl mx-auto w-full">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-relaxed shadow-inner">
                  <div className="text-slate-700 mb-2"># โหมด "w" (Write) จะสร้างไฟล์ใหม่หรือเขียนทับไฟล์เดิม</div>
                  <div><span className="text-pink-400">with</span> <span className="text-sky-300">open</span>(<span className="text-emerald-300">"output.txt"</span>, <span className="text-emerald-300">"w"</span>, encoding=<span className="text-emerald-300">"utf-8"</span>) <span className="text-pink-400">as</span> f:</div>
                  <div className="ml-4 text-cyan-300">f.write(<span className="text-emerald-300">"สวัสดี Python!\n"</span>)</div>
                  <div className="ml-4 text-cyan-300">f.write(<span className="text-emerald-300">"บรรทัดที่ 2"</span>)</div>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm">
                  <FilePlus size={24} className="text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold mb-1">โหมดการเขียนที่ควรรู้:</p>
                    <ul className="list-disc ml-4 text-xs space-y-1 text-amber-700">
                      <li><code className="bg-white px-1 rounded font-bold">"w"</code> (Write): สร้างใหม่ / เขียนทับของเดิมทั้งหมด</li>
                      <li><code className="bg-white px-1 rounded font-bold">"a"</code> (Append): เขียนต่อท้ายข้อมูลเดิม</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tab === 'csv' && (
              <div className="space-y-4 max-w-xl mx-auto w-full">
                <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs leading-relaxed shadow-inner mb-4">
                  <div><span className="text-pink-400">import</span> csv</div>
                  <div className="mt-2"><span className="text-pink-400">with</span> <span className="text-sky-300">open</span>(<span className="text-emerald-300">"products.csv"</span>) <span className="text-pink-400">as</span> f:</div>
                  <div className="ml-4 text-cyan-300">reader = csv.reader(f)</div>
                  <div className="ml-4"><span className="text-pink-400">for</span> row <span className="text-pink-400">in</span> reader:</div>
                  <div className="ml-8 text-cyan-300">print(row)</div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 text-xs font-bold text-slate-700 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                    <span>👀 มุมมองแบบตาราง (products.csv)</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-600 font-mono text-xs uppercase border-b border-slate-200">
                        <tr>
                          {rows[0].map((h, i) => <th key={i} className="px-4 py-3">{h}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-xs text-slate-700">
                        {rows.slice(1).map((r, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            {r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-80 bg-slate-50 p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โครงสร้าง `with open()`</h4>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 flex-1">
              <div className="font-mono text-xs font-bold bg-slate-100 p-2 rounded mb-3 text-slate-700 text-center">
                with open("file", "mode") as f:
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-2 items-start">
                  <span className="text-sky-500 font-bold mt-1">1.</span> 
                  <div><strong className="text-slate-800">with</strong><br/>จัดการเปิดและ "ปิดไฟล์" ให้อัตโนมัติเมื่อทำงานจบบล็อก (ป้องกันไฟล์ค้าง/ลืมปิด)</div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-sky-500 font-bold mt-1">2.</span> 
                  <div><strong className="text-slate-800">open(...)</strong><br/>ฟังก์ชันเปิดไฟล์ โดยระบุชื่อไฟล์และโหมดการทำงาน</div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-sky-500 font-bold mt-1">3.</span> 
                  <div><strong className="text-slate-800">as f</strong><br/>ตั้งชื่อตัวแปรแทนไฟล์ที่เปิด เพื่อนำไปใช้เรียกคำสั่งเช่น f.read(), f.write()</div>
                </li>
              </ul>
            </div>
            <button onClick={clear}
              className={`w-full text-white font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                tab === 'read' ? 'bg-sky-600 hover:bg-sky-700' : tab === 'write' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
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
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
