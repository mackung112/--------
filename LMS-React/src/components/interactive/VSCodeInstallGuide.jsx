import React, { useState } from 'react';
import { Code2, Download, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick, Layout, Terminal, Puzzle, FolderOpen, Search, Settings } from 'lucide-react';

export default function VSCodeInstallGuide() {
  const [activeArea, setActiveArea] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Quiz
  const [currentAnswers, setCurrentAnswers] = useState({ 1: null, 2: null, 3: null });
  const [activeDropzone, setActiveDropzone] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const areas = {
    sidebar: { title: 'Sidebar (แถบด้านซ้าย)', desc: 'ใช้สำหรับเข้าถึงเครื่องมือสำคัญ เช่น File Explorer, Search, Extensions, Source Control และ Debug', icon: Layout, color: 'text-blue-600' },
    editor: { title: 'Editor (พื้นที่เขียนโค้ด)', desc: 'หน้าต่างหลักสำหรับเขียนและแก้ไขโค้ด สามารถเปิดหลายไฟล์พร้อมกันเป็น Tab ได้', icon: Code2, color: 'text-emerald-600' },
    terminal: { title: 'Terminal (คอนโซล)', desc: 'ใช้รันคำสั่ง Python, pip หรือ Git ได้โดยตรง โดยไม่ต้องเปิดหน้าต่างอื่น กด Ctrl+` เพื่อเปิด/ปิด', icon: Terminal, color: 'text-purple-600' },
    extensions: { title: 'Extensions (ส่วนเสริม)', desc: 'ตลาดส่วนเสริมที่ช่วยเพิ่มความสามารถให้ VS Code เช่น Python Extension, Prettier, Theme', icon: Puzzle, color: 'text-amber-600' },
    explorer: { title: 'Explorer (จัดการไฟล์)', desc: 'แสดงโครงสร้างไฟล์และโฟลเดอร์ของโปรเจกต์ ใช้สร้าง/ลบ/เปลี่ยนชื่อไฟล์ได้', icon: FolderOpen, color: 'text-rose-600' },
    palette: { title: 'Command Palette', desc: 'เครื่องมือลับที่สำคัญที่สุด! กด Ctrl+Shift+P เพื่อเปิด แล้วพิมพ์ชื่อคำสั่งที่ต้องการ (เช่น "Python: Select Interpreter")', icon: Search, color: 'text-indigo-600' },
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleOptionClick = (val) => {
    if (activeDropzone <= 3) {
      setCurrentAnswers({ ...currentAnswers, [activeDropzone]: val });
      if (activeDropzone < 3) setActiveDropzone(activeDropzone + 1);
      else setActiveDropzone(4);
    }
  };

  const checkAnswer = () => {
    if (!currentAnswers[1] || !currentAnswers[2] || !currentAnswers[3]) {
      showToast('กรุณาเติมคำตอบให้ครบทุกช่อง', 'warning'); return;
    }
    if (currentAnswers[1] === 'Ctrl' && currentAnswers[2] === 'Shift' && currentAnswers[3] === 'P') {
      showToast('ถูกต้อง! Ctrl+Shift+P เปิด Command Palette ซึ่งเป็นเครื่องมือที่สำคัญที่สุดใน VS Code', 'success');
      setIsSuccess(true);
    } else {
      showToast('ยังไม่ถูกต้อง: ลองคิดว่าปุ่มลัดสำหรับเปิด Command Palette คือปุ่มอะไร?', 'error');
    }
  };

  const resetQuiz = () => { setCurrentAnswers({ 1: null, 2: null, 3: null }); setActiveDropzone(1); setIsSuccess(false); };

  return (
    <div className="space-y-12 my-8">
      {/* 1. VS Code UI Explorer */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5 flex items-center gap-3">
          <Code2 size={24} />
          <h3 className="font-bold text-lg">สำรวจหน้าตา VS Code</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Interactive UI Map */}
          <div className="p-6 bg-slate-50 border-r border-slate-200">
            <p className="text-sm text-slate-500 mb-4">คลิกที่แต่ละส่วนเพื่อดูคำอธิบาย</p>

            {/* Simulated VS Code Layout */}
            <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-600">
              {/* Title Bar */}
              <div className="bg-slate-700 px-3 py-1.5 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
                <span className="text-slate-400 text-xs font-mono ml-2">my_project — VS Code</span>
              </div>

              <div className="flex min-h-[280px]">
                {/* Activity Bar */}
                <div className="w-12 bg-slate-900 flex flex-col items-center py-3 gap-3">
                  <button onClick={() => setActiveArea('explorer')} className={`p-1.5 rounded transition-colors ${activeArea === 'explorer' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}><FolderOpen size={18} /></button>
                  <button onClick={() => setActiveArea('palette')} className={`p-1.5 rounded transition-colors ${activeArea === 'palette' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Search size={18} /></button>
                  <button onClick={() => setActiveArea('extensions')} className={`p-1.5 rounded transition-colors ${activeArea === 'extensions' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Puzzle size={18} /></button>
                  <button onClick={() => setActiveArea('sidebar')} className={`p-1.5 rounded transition-colors ${activeArea === 'sidebar' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}><Settings size={18} /></button>
                </div>

                {/* Sidebar */}
                <button onClick={() => setActiveArea('sidebar')} className={`w-40 bg-slate-800 border-r border-slate-700 p-3 text-left transition-all ${activeArea === 'sidebar' ? 'ring-2 ring-inset ring-blue-400' : ''}`}>
                  <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Explorer</div>
                  <div className="text-slate-300 text-xs space-y-1">
                    <div>📁 my_project</div>
                    <div className="pl-3">📄 main.py</div>
                    <div className="pl-3">📄 student.py</div>
                    <div className="pl-3">📁 assets</div>
                  </div>
                </button>

                {/* Editor + Terminal */}
                <div className="flex-1 flex flex-col">
                  <button onClick={() => setActiveArea('editor')} className={`flex-1 p-4 text-left transition-all ${activeArea === 'editor' ? 'ring-2 ring-inset ring-emerald-400' : ''}`}>
                    <div className="bg-slate-700 text-xs text-slate-400 px-3 py-1 rounded-t inline-block mb-2">main.py</div>
                    <div className="font-mono text-xs space-y-0.5">
                      <div><span className="text-pink-400">class</span> <span className="text-yellow-300">Student</span>:</div>
                      <div className="pl-4"><span className="text-pink-400">def</span> <span className="text-blue-300">__init__</span>(<span className="text-orange-300">self</span>):</div>
                      <div className="pl-8"><span className="text-orange-300">self</span><span className="text-white">.name = </span><span className="text-green-300">"Mac"</span></div>
                    </div>
                  </button>

                  <button onClick={() => setActiveArea('terminal')} className={`h-20 bg-slate-900 border-t border-slate-700 p-3 text-left transition-all ${activeArea === 'terminal' ? 'ring-2 ring-inset ring-purple-400' : ''}`}>
                    <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Terminal</div>
                    <div className="font-mono text-[11px] text-emerald-400">$ python main.py</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="p-6 flex items-center justify-center min-h-[220px]">
            {activeArea && areas[activeArea] ? (
              <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                  {React.createElement(areas[activeArea].icon, { size: 28, className: areas[activeArea].color })}
                  <h4 className={`text-xl font-bold ${areas[activeArea].color}`}>{areas[activeArea].title}</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">{areas[activeArea].desc}</p>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <MousePointerClick className="text-slate-300 mx-auto mb-3" size={32} />
                คลิกที่ส่วนต่างๆ ของ VS Code ทางด้านซ้าย<br />เพื่อดูคำอธิบาย
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ปุ่มลัดสำหรับเปิด <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">Command Palette</code> ใน VS Code คืออะไร?</p>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-lg my-6 text-white">
          {[1, 2, 3].map(n => (
            <React.Fragment key={n}>
              <div onClick={() => setActiveDropzone(n)}
                className={`inline-flex items-center justify-center min-w-20 px-3 h-10 border-2 rounded-md cursor-pointer transition-colors mx-1 align-middle ${activeDropzone === n && !isSuccess ? 'border-yellow-300 bg-slate-700 ring-2 ring-indigo-500' : isSuccess ? 'border-emerald-500 bg-emerald-900/30 text-sky-300' : currentAnswers[n] ? 'border-indigo-500 bg-slate-800 text-sky-300' : 'border-dashed border-slate-500 bg-slate-800'}`}>
                {currentAnswers[n] || ''}
              </div>
              {n < 3 && <span className="text-slate-400 mx-1">+</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-300">ตัวเลือก:</p>
          <div className="flex flex-wrap gap-3">
            {['Ctrl', 'Shift', 'P', 'Alt', 'F1'].map(opt => (
              <button key={opt} onClick={() => handleOptionClick(opt)} disabled={isSuccess}
                className={`bg-slate-700 hover:bg-slate-600 text-sky-300 px-4 py-2 rounded font-mono shadow transition-colors border border-slate-600 ${['Alt', 'F1'].includes(opt) ? 'line-through text-slate-500' : ''}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={resetQuiz} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={checkAnswer} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
