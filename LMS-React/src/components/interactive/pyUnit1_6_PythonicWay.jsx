import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, RefreshCcw, CheckCircle2, Terminal, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const examples = [
  {
    id: 'swap',
    title: 'สลับค่า (Swap)',
    bad: `temp = a\na = b\nb = temp`,
    good: `a, b = b, a`,
    lint: 'Unnecessary temporary variable used for swapping.',
    desc: 'Python สามารถสลับค่าตัวแปรได้ในบรรทัดเดียวผ่าน Tuple Unpacking ไม่ต้องใช้ตัวแปรชั่วคราว (temp) มาช่วย ทำให้โค้ดสะอาดขึ้นมาก',
    improvement: 'ลดจำนวนบรรทัดจาก 3 เหลือ 1 (ดีขึ้น 66%)'
  },
  {
    id: 'loop',
    title: 'วนลูปพร้อม Index',
    bad: `i = 0\nwhile i < len(items):\n    print(i, items[i])\n    i += 1`,
    good: `for i, item in enumerate(items):\n    print(i, item)`,
    lint: 'Consider using enumerate() instead of while loop with index tracking.',
    desc: 'การใช้ enumerate() เพื่อดึงทั้งเลขตำแหน่ง (index) และข้อมูล (item) ออกมาพร้อมกัน ลดโอกาสเกิดบั๊ก (Off-by-one error) และอ่านเข้าใจง่ายกว่า C-style while loop',
    improvement: 'ลดความซับซ้อนของการจัดการตัวแปร i (ปลอดภัยขึ้น)'
  },
  {
    id: 'list',
    title: 'สร้าง List ใหม่',
    bad: `evens = []\nfor x in range(10):\n    if x % 2 == 0:\n        evens.append(x)`,
    good: `evens = [x for x in range(10) if x % 2 == 0]`,
    lint: 'Loop can be rewritten as a list comprehension.',
    desc: 'List Comprehension คือ "ท่าไม้ตาย" ของ Python ช่วยยุบโค้ดวนลูปเพื่อสร้าง List ให้เหลือบรรทัดเดียว และทำงานเร็วกว่าการใช้ .append() แบบปกติ',
    improvement: 'ทำงานเร็วขึ้นประมาณ 20% ในระดับ C-level'
  },
  {
    id: 'file',
    title: 'เปิดอ่านไฟล์',
    bad: `f = open('data.txt')\ndata = f.read()\nf.close()`,
    good: `with open('data.txt') as f:\n    data = f.read()`,
    lint: 'File resource may leak if an exception occurs before close(). Use "with" statement.',
    desc: 'การใช้ "with" block จะเรียกว่า Context Manager ซึ่งจะจัดการปิดไฟล์ให้อัตโนมัติ แม้ว่าโปรแกรมจะเกิด Error ระหว่างการอ่านไฟล์ก็ตาม',
    improvement: 'ป้องกันปัญหา Memory Leak จากการลืมปิดไฟล์ 100%'
  }
];




export default function pyUnit1_6_PythonicWay() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [refactored, setRefactored] = useState(false);
  const [completedList, setCompletedList] = useState([]);
  const [logs, setLogs] = useState([]);

  const ex = examples[activeIdx];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  useEffect(() => {
    setRefactored(false);
    let t1, t2;
    // Initial sync log to prevent array append duplication
    setLogs([{ time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: "Linter analyzing code...", type: "sys" }]);
    
    t1 = setTimeout(() => {
      addLog(`Warning: ${examples[activeIdx].lint}`, "warn");
      addLog("Status: Non-Pythonic (C/Java Style)", "error");
    }, 500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeIdx]);

  const handleRefactor = () => {
    addLog("Applying Pythonic Refactoring...", "sys");
    setTimeout(() => {
      setRefactored(true);
      addLog("Refactoring successful!", "success");
      addLog(`Status: Pythonic (Beautiful & Fast)`, "success");
      addLog(`Metrics: ${ex.improvement}`, "info");

      if (!completedList.includes(activeIdx)) {
        setCompletedList(prev => [...prev, activeIdx]);
      }
    }, 800);
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
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Code Refactor
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
              Simulator
            </span>
          </div>
          <button 
            onClick={() => setActiveIdx(0)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> เริ่มใหม่
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">วิถีแห่ง Python (The Pythonic Way)</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          การเขียนโค้ดที่ "ทำงานได้" กับ "เขียนแบบมือโปร" นั้นต่างกัน ลองวิเคราะห์โค้ดเก่าแล้วกด Refactor เพื่อดูความมหัศจรรย์ของ Python
        </p>

        {/* Level Selector */}
        <div className="flex flex-wrap gap-2">
          {examples.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
                ${activeIdx === idx ? 'bg-emerald-600 text-white shadow-md' : 
                  completedList.includes(idx) ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
              `}
            >
              {completedList.includes(idx) && activeIdx !== idx ? <CheckCircle2 className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[450px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (The Code Editor) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col justify-center border-r border-slate-200 relative">
          
          <div className={`w-full rounded-xl overflow-hidden shadow-xl border-2 transition-all duration-500 bg-[#1e1e1e]
            ${refactored ? 'border-emerald-500 shadow-emerald-500/20' : 'border-slate-700'}
          `}>
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black">
              <div className="flex items-center gap-2">
                <FileIcon />
                <span className="text-slate-600 text-xs font-mono">main.py</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider
                ${refactored ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}
              `}>
                {refactored ? 'Pythonic Way' : 'C-Style (Bad)'}
              </span>
            </div>
            
            <div className="p-4 relative min-h-[150px] flex flex-col justify-center">
              {/* Bad Code */}
              <pre className={`font-mono text-sm leading-relaxed transition-all duration-500 absolute w-full left-4
                ${refactored ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 text-red-300'}
              `}>
                <code>{ex.bad}</code>
              </pre>

              {/* Good Code */}
              <pre className={`font-mono text-sm leading-relaxed transition-all duration-500 w-full
                ${refactored ? 'opacity-100 translate-y-0 text-emerald-300' : 'opacity-0 translate-y-4 pointer-events-none'}
              `}>
                <code>{ex.good}</code>
              </pre>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleRefactor}
              disabled={refactored}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all text-white
                ${refactored ? 'bg-slate-300 cursor-not-allowed scale-95' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 active:scale-95'}
              `}
            >
              {refactored ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              {refactored ? 'ปรับปรุงโค้ดแล้ว' : 'กดร่ายมนตร์ Pythonic!'}
            </button>
          </div>

        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            
            {!refactored ? (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                  <h4 className="text-lg font-bold">ปัญหาของโค้ดนี้</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 bg-red-50 p-4 rounded-lg border border-red-100">
                  การเขียนโค้ดลักษณะนี้ เป็นการนำนิสัยการเขียนจากภาษาอื่น (เช่น C หรือ Java) มาใช้ใน Python ทำให้โค้ดยาวเกินความจำเป็น อ่านยาก และบางครั้งก็ทำงานช้ากว่าที่ควรจะเป็น
                </p>
                <div className="flex items-center gap-2 text-slate-700 text-sm mt-8 justify-center">
                  <ArrowRight className="w-5 h-5 animate-pulse text-emerald-500" />
                  <span>ลองกดปุ่มด้านซ้ายเพื่อดูการเปลี่ยนแปลง</span>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                  <h4 className="text-lg font-bold">วิถีแห่ง Python (Pythonic)</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100 font-medium">
                  {ex.desc}
                </p>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> ผลลัพธ์ที่ได้
                  </h5>
                  <p className="text-sm text-indigo-700 font-bold bg-white px-3 py-2 rounded border border-indigo-100 shadow-sm inline-block">
                    {ex.improvement}
                  </p>
                </div>

                {completedList.length === examples.length && (
                  <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl shadow-lg text-center animate-in zoom-in-95 duration-700">
                    <Sparkles className="w-10 h-10 text-yellow-300 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-lg mb-1">Pythonic Master!</h4>
                    <p className="text-indigo-100 text-xs">คุณเรียนรู้วิธีการเขียนโค้ดแบบมืออาชีพครบทุกตัวอย่างแล้ว</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {!refactored && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${refactored ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Linter Console</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-700 mr-3 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 w-10 font-bold ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'sys' ? 'text-blue-400' : 'text-slate-300'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={`flex-1 ${
                    log.type === 'error' ? 'text-red-300' :
                    log.type === 'warn' ? 'text-amber-300' :
                    log.type === 'success' ? 'text-emerald-300' :
                    log.type === 'sys' ? 'text-blue-200' : 'text-slate-300'
                  }`}>
                    {log.msg}
                  </span>
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

// Helper icon component
function FileIcon() {
  return (
    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.14,7.5A2.86,2.86,0,0,1,16.5,4.86V4.5a2.5,2.5,0,0,0-5,0v.36A2.86,2.86,0,0,1,8.86,7.5H8.5a2.5,2.5,0,0,0,0,5h.36a2.86,2.86,0,0,1,2.64,2.64v.36a2.5,2.5,0,0,0,5,0v-.36A2.86,2.86,0,0,1,19.14,12.5h.36a2.5,2.5,0,0,0,0-5Zm-2.64,3.5A4.35,4.35,0,0,0,12.5,15v.36a1,1,0,0,1-2,0V15A4.35,4.35,0,0,0,6.5,11H6a1,1,0,0,1,0-2H6.5A4.35,4.35,0,0,0,10.5,5V4.64a1,1,0,0,1,2,0V5a4.35,4.35,0,0,0,4,4h.5a1,1,0,0,1,0,2Z"/>
    </svg>
  );
}
