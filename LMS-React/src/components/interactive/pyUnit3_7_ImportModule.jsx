import React, { useState } from 'react';
import {
  Package,
  Copy,
  CheckCircle2,
  BookOpen,
  Box,
  Puzzle,
  Globe2,
  FileDigit,
  Wrench,
  Dices,
  Calculator,
  ChevronRight
} from 'lucide-react';

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-blue-100 text-blue-600 border border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

const ModuleToolboxSimulator = () => {
  const [activeModule, setActiveModule] = useState(null); // 'math' or 'random'
  const [output, setOutput] = useState([]);
  const [inputValue, setInputValue] = useState(16);

  const runCommand = (cmd, result) => {
    setOutput(prev => [...prev, { cmd, result }]);
  };

  const handleClear = () => {
    setOutput([]);
    setActiveModule(null);
  };

  return (
    <div className="my-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 text-blue-400">
          <Wrench className="w-8 h-8" />
          กล่องเครื่องมือวิเศษ (Module Toolbox)
        </h3>
        <p className="text-slate-400 text-lg mb-8">ลองเรียกใช้งาน (import) โมดูลที่ต้องการ แล้วปลดล็อกฟังก์ชันลับเพื่อใช้งาน</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Modules Selection */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">1. เลือกนำเข้าโมดูล (Import)</h4>
              
              <button 
                onClick={() => { setActiveModule('math'); runCommand('import math', '✅ โมดูล math ถูกนำเข้าสำเร็จแล้ว!'); }}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${activeModule === 'math' ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-800 border-slate-700 hover:border-blue-400'}`}
              >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-blue-400">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-slate-200">import math</div>
                  <div className="text-xs text-slate-400 mt-1">กล่องเครื่องมือคณิตศาสตร์ขั้นสูง</div>
                </div>
              </button>

              <button 
                onClick={() => { setActiveModule('random'); runCommand('import random', '✅ โมดูล random ถูกนำเข้าสำเร็จแล้ว!'); }}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${activeModule === 'random' ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-800 border-slate-700 hover:border-amber-400'}`}
              >
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-amber-400">
                  <Dices className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-slate-200">import random</div>
                  <div className="text-xs text-slate-400 mt-1">กล่องเครื่องมือสุ่มตัวเลข</div>
                </div>
              </button>
            </div>

            <div className={`bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4 transition-opacity ${!activeModule ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">2. เรียกใช้ฟังก์ชันในโมดูล</h4>
              
              {activeModule === 'math' && (
                <>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="number" 
                      value={inputValue} 
                      onChange={e => setInputValue(Number(e.target.value))}
                      className="w-20 bg-slate-800 border border-slate-700 rounded-lg text-center font-mono focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={() => runCommand(`math.sqrt(${inputValue})`, Math.sqrt(inputValue))}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-mono py-3 rounded-lg transition-colors text-sm"
                    >
                      math.sqrt({inputValue})
                    </button>
                  </div>
                  <button 
                    onClick={() => runCommand('math.pi', Math.PI)}
                    className="w-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-mono py-3 rounded-lg border border-blue-500/50 transition-colors text-sm"
                  >
                    math.pi
                  </button>
                </>
              )}

              {activeModule === 'random' && (
                <>
                  <button 
                    onClick={() => runCommand('random.randint(1, 100)', Math.floor(Math.random() * 100) + 1)}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-mono py-3 rounded-lg transition-colors text-sm"
                  >
                    random.randint(1, 100)
                  </button>
                  <button 
                    onClick={() => {
                      const choices = ['Rock', 'Paper', 'Scissors'];
                      runCommand('random.choice(["Rock", "Paper", "Scissors"])', `'${choices[Math.floor(Math.random() * choices.length)]}'`);
                    }}
                    className="w-full bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 font-mono py-3 rounded-lg border border-amber-500/50 transition-colors text-sm"
                  >
                    random.choice(...)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Console Terminal */}
          <div className="lg:col-span-7 bg-[#1e1e1e] rounded-2xl border border-slate-700 shadow-2xl flex flex-col h-full min-h-[400px]">
            <div className="bg-[#2d2d2d] px-4 py-3 border-b border-slate-700 flex justify-between items-center rounded-t-2xl">
              <span className="text-slate-400 text-xs font-mono tracking-widest">PYTHON CONSOLE</span>
              <button onClick={handleClear} className="text-slate-500 hover:text-white text-xs">Clear</button>
            </div>
            
            <div className="p-6 font-mono text-sm leading-loose overflow-y-auto max-h-[350px] flex-1">
              <div className="text-slate-500 mb-4">Python 3.10.0 (default, Oct  4 2021, 00:00:00)<br/>Type "help", "copyright", "credits" or "license" for more information.</div>
              
              {output.map((line, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-slate-300">
                    <span className="text-green-400 mr-2">{">>>"}</span>
                    {line.cmd}
                  </div>
                  <div className="text-blue-300 ml-8">{line.result}</div>
                </div>
              ))}
              
              {!activeModule && (
                <div className="text-slate-600 mt-4 animate-pulse">
                  <span className="text-green-400/50 mr-2">{">>>"}</span> _
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function pyUnit3_7_ImportModule() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักอัญเชิญเวทมนตร์ (Module Summoner)"

ข้อที่ 1: ทอยลูกเต๋า
ให้นักเรียนใช้โมดูล random สร้างโปรแกรม "ทอยลูกเต๋า" 1 ลูก (ได้แต้ม 1-6)
ตัวอย่างโครงสร้าง:
import random
dice = random.randint(?, ?)
print(f"คุณทอยได้เลข: {dice}")

ข้อที่ 2: วงกลมมรณะ
ให้รับค่า "รัศมี (radius)" จากผู้ใช้ แล้วคำนวณหา "พื้นที่วงกลม" โดยสูตรคือ Area = π * r^2
*ข้อควรระวัง: ให้นำเข้าโมดูล math เพื่อใช้ค่าพาย (math.pi)`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-sky-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              การนำเข้าโมดูล <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">(import Module)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-blue-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              เปรียบเสมือนการที่เราจะซ่อมบ้าน เราไม่ต้องสร้างค้อนหรือไขควงขึ้นมาเอง แต่เราแค่ไปซื้อ <strong>"กล่องเครื่องมือ"</strong> มาใช้งาน การเขียนโปรแกรมก็เช่นกัน <strong>Module</strong> คือชุดโค้ดสำเร็จรูปที่คนอื่นเขียนไว้ให้เรา <code>import</code> เข้ามาใช้ได้อย่างสะดวกสบาย
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.7.1 ความหมายและประโยชน์ของโมดูล */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-500" />
            3.7.1 ความหมายและประโยชน์ของโมดูล
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Pre-built */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-blue-200 transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">ไม่ต้องเริ่มจากศูนย์</h3>
              <p className="text-sm text-slate-600">มีฟังก์ชันที่ถูกเขียนและทดสอบมาอย่างดีแล้วให้เราเรียกใช้ทันที ช่วยประหยัดเวลาพัฒนาได้อย่างมหาศาล</p>
            </div>

            {/* Card 2: Reusable */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-sky-200 transition-all group">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Puzzle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">โค้ดเป็นระเบียบ</h3>
              <p className="text-sm text-slate-600">การแยกโค้ดส่วนต่างๆ ออกเป็นโมดูล ทำให้โปรแกรมหลักของเราอ่านง่าย ไม่รกรุงรัง และแก้ไขได้เฉพาะจุด</p>
            </div>

            {/* Card 3: Community */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-900/50 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-blue-300 text-lg mb-3">ระบบนิเวศขนาดใหญ่</h3>
                <p className="text-sm text-slate-400">จุดเด่นที่สุดของ Python คือมีโมดูลเสริมจากชุมชนนักพัฒนาทั่วโลกมหาศาล ครอบคลุมตั้งแต่ทำ AI ไปจนถึงสร้างเว็บไซต์</p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.7.2 รูปแบบการเรียกใช้งาน */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-blue-500" />
              3.7.2 รูปแบบการเรียกใช้งาน (import / from...import)
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  การเรียกใช้โมดูลใน Python ทำได้ 2 รูปแบบหลักๆ ซึ่งมีข้อดีและข้อเสียต่างกัน
                </p>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-blue-800 mb-1 font-mono">1. import [module_name]</h4>
                    <p className="text-blue-700 text-sm">การนำเข้าทั้งกล่องเครื่องมือ เวลาเรียกใช้งานฟังก์ชันจะต้องมีชื่อโมดูลนำหน้าเสมอ เช่น <code className="font-bold">math.sqrt()</code> ช่วยป้องกันชื่อฟังก์ชันซ้ำซ้อน</p>
                  </div>
                  <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-sky-800 mb-1 font-mono">2. from [module_name] import [function_name]</h4>
                    <p className="text-sky-700 text-sm">การหยิบมาเฉพาะเครื่องมือที่ต้องการ เวลาใช้งานสามารถเรียกชื่อฟังก์ชันได้เลย เช่น <code className="font-bold">sqrt()</code> สะดวกเวลาต้องเรียกใช้บ่อยๆ</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Code Comparison</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-slate-500"># แบบที่ 1: import มาทั้งกล่อง</span><br />
                    <span className="text-blue-400 font-bold">import</span> <span className="text-slate-200">math</span><br />
                    <span className="text-slate-200">result1</span> = <span className="text-slate-200">math</span>.<span className="text-blue-300">sqrt</span>(<span className="text-amber-400">25</span>)<br />
                    <br />
                    <div className="border-t border-slate-700 my-2"></div>
                    <br />
                    <span className="text-slate-500"># แบบที่ 2: หยิบเฉพาะเครื่องมือ sqrt</span><br />
                    <span className="text-blue-400 font-bold">from</span> <span className="text-slate-200">math</span> <span className="text-blue-400 font-bold">import</span> <span className="text-slate-200">sqrt</span><br />
                    <span className="text-slate-200">result2</span> = <span className="text-blue-300">sqrt</span>(<span className="text-amber-400">25</span>) <span className="text-slate-500"># ไม่ต้องมี math. นำหน้า</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulators */}
        <ModuleToolboxSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
