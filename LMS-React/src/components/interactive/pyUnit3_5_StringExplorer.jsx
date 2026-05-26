import React, { useState } from 'react';
import {
  Type,
  Copy,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Plus,
  X,
  RefreshCw,
  FileDigit,
  Quote,
  AlignLeft,
  Scissors
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
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-violet-100 rounded-2xl text-violet-600 border border-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-violet-100 text-violet-600 border border-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
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

const StringSlicerSimulator = () => {
  const [text, setText] = useState("PYTHON_ROCK");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);

  const safeText = text || " ";
  const safeStart = Math.max(0, Math.min(start, safeText.length));
  const safeEnd = Math.max(0, Math.min(end, safeText.length));
  const displayStart = Math.min(safeStart, safeEnd);
  const displayEnd = Math.max(safeStart, safeEnd);

  const slicedText = safeText.slice(displayStart, displayEnd);

  return (
    <div className="my-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 text-fuchsia-400">
          <Scissors className="w-8 h-8" />
          เครื่องตัดสไลด์ข้อความ (String Slicer)
        </h3>
        <p className="text-slate-400 text-lg mb-8">ลองเปลี่ยนข้อความและปรับแถบตัวเลข (Index) เพื่อดูวิธีการตัดข้อความใน Python</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Controls */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">ข้อความเริ่มต้น (String)</label>
              <input 
                type="text"
                value={text}
                maxLength={15}
                onChange={(e) => setText(e.target.value.replace(/ /g, "_"))}
                className="w-full bg-slate-800 border border-slate-700 text-white font-mono text-xl p-3 rounded-xl focus:outline-none focus:border-fuchsia-500"
              />
              <p className="text-xs text-slate-500 mt-2">* แทนที่ช่องว่างด้วย _ เพื่อให้เห็นชัดเจน</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-300">จุดเริ่มต้น (Start Index)</label>
                <span className="text-fuchsia-400 font-bold bg-fuchsia-400/10 px-3 py-1 rounded-full text-xs">
                  {displayStart}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max={safeText.length}
                value={start}
                onChange={(e) => setStart(Number(e.target.value))}
                className="w-full accent-fuchsia-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-300">จุดสิ้นสุด (End Index)</label>
                <span className="text-pink-400 font-bold bg-pink-400/10 px-3 py-1 rounded-full text-xs">
                  {displayEnd}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max={safeText.length}
                value={end}
                onChange={(e) => setEnd(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
              <p className="text-xs text-slate-500 mt-2">* Python จะตัดถึงตำแหน่งก่อน End Index (ไม่รวมตัวที่ End)</p>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-center gap-6">
            
            {/* Visualizer */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 overflow-x-auto">
              <div className="flex gap-1 min-w-max justify-center">
                {safeText.split('').map((char, index) => {
                  const isHighlighted = index >= displayStart && index < displayEnd;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold font-mono transition-colors ${isHighlighted ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-slate-900 text-slate-500 border border-slate-700'}`}>
                        {char}
                      </div>
                      <div className={`text-xs mt-2 font-mono ${isHighlighted ? 'text-fuchsia-400 font-bold' : 'text-slate-600'}`}>
                        {index}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Output */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative">
              <div className="absolute top-0 right-0 bg-slate-700 text-xs text-slate-300 px-3 py-1 font-mono rounded-bl-xl rounded-tr-xl">
                Terminal
              </div>
              
              <div className="mb-4">
                <span className="text-slate-500 font-mono text-sm"># โค้ดที่ใช้เขียน</span>
                <div className="text-xl font-mono mt-1">
                  <span className="text-blue-400">text</span>
                  <span className="text-white">[</span>
                  <span className="text-fuchsia-400">{displayStart}</span>
                  <span className="text-white">:</span>
                  <span className="text-pink-400">{displayEnd}</span>
                  <span className="text-white">]</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <span className="text-slate-500 font-mono text-sm"># ผลลัพธ์</span>
                <div className="text-4xl font-mono font-bold text-white mt-2">
                  "<span className="text-fuchsia-400">{slicedText}</span>"
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit3_5_StringExplorer() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักเจาะรหัสข้อความ"

ข้อที่ 1: การต่อข้อความ (Concatenation)
ให้นักเรียนสร้างตัวแปรรับค่า "ชื่อ" และ "นามสกุล" จากผู้ใช้ 
จากนั้นให้นำมาต่อกันโดยมี "ช่องว่าง" คั่นกลาง และพิมพ์ความยาวของข้อความทั้งหมด
ตัวอย่างโค้ด:
first = "Somchai"
last = "Jaidee"
full = first + " " + last
print("ชื่อเต็ม:", full, "มีความยาว:", len(full))

ข้อที่ 2: Slicing หั่นข้อความ
กำหนดให้ text = "Supercalifragilistic"
จงเขียนคำสั่งเพื่อดึงเฉพาะคำว่า "cali" ออกมาจากตัวแปร text (ใบ้: ต้องเริ่มที่ Index 5)`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-violet-200 selection:text-violet-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-fuchsia-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-violet-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ข้อมูลข้อความ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">(String / str)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-violet-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในคอมพิวเตอร์ ข้อมูลไม่ได้มีแค่ตัวเลขเท่านั้น การเก็บชื่อ ที่อยู่ หรือประโยคยาวๆ เราจะใช้ <strong className="text-violet-700">ข้อมูลประเภทข้อความ (String)</strong> ซึ่งในภาษา Python มีเครื่องมือทรงพลังมากมายให้เราหั่น ต่อ หรือดัดแปลงข้อความได้อย่างง่ายดาย
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.5.1 การประกาศตัวแปรและกำหนดค่าข้อความ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Type className="w-6 h-6 text-violet-500" />
            3.5.1 การประกาศตัวแปรและกำหนดค่าข้อความ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Single Quote */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-violet-200 transition-all group">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-2xl">' '</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">Single Quote</h3>
              <p className="text-sm text-slate-600 mb-4">ใช้เครื่องหมายขีดเดียวครอบข้อความ เหมาะสำหรับคำสั้นๆ หรือข้อความที่ไม่มีตัว ' (Apostrophe) ข้างใน</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">name</span> = <span className="text-green-600">'Somchai'</span></div>
                <div><span className="text-blue-500">color</span> = <span className="text-green-600">'Red'</span></div>
              </div>
            </div>

            {/* Card 2: Double Quote */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-fuchsia-200 transition-all group">
              <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-2xl">" "</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">Double Quote</h3>
              <p className="text-sm text-slate-600 mb-4">ใช้เครื่องหมายฟันหนู นิยมใช้แพร่หลายและมีประโยชน์เมื่อในข้อความมีเครื่องหมาย ' อยู่ด้วย</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">text</span> = <span className="text-green-600">"I'm Happy"</span></div>
                <div><span className="text-blue-500">msg</span> = <span className="text-green-600">"Hello"</span></div>
              </div>
            </div>

            {/* Card 3: Multi-line Quote */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-violet-900/50 text-violet-400 border border-violet-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlignLeft className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-violet-300 text-lg mb-3">Triple Quote</h3>
                <p className="text-sm text-slate-400 mb-4">ใช้ขีดสามอัน (""" หรือ ''') สำหรับข้อความยาวๆ ที่มีการขึ้นบรรทัดใหม่ในตัวเอง</p>
                <div className="bg-black/40 p-3 rounded-xl border border-slate-700 font-mono text-xs text-green-400 leading-relaxed">
                  """บรรทัดที่ 1<br/>
                  บรรทัดที่ 2<br/>
                  บรรทัดที่ 3"""
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.5.2 การเชื่อมต่อและการคัดลอกข้อความ */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-fuchsia-500" />
              3.5.2 การเชื่อมต่อและการคัดลอกข้อความ
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  เครื่องหมายคณิตศาสตร์ใน Python ทำงานกับ String ได้ด้วย! แต่ผลลัพธ์จะแตกต่างจากการคำนวณตัวเลข
                </p>
                
                <div className="space-y-4">
                  <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-violet-800 mb-1 flex items-center gap-2">
                      <Plus className="w-4 h-4" /> การเชื่อมต่อ (Concatenation)
                    </h4>
                    <p className="text-violet-700 text-sm">เครื่องหมาย <code className="font-bold">+</code> จะนำข้อความสองอันมาต่อกันเป็นข้อความเดียว</p>
                  </div>
                  <div className="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-fuchsia-800 mb-1 flex items-center gap-2">
                      <X className="w-4 h-4" /> การคัดลอก (Duplication)
                    </h4>
                    <p className="text-fuchsia-700 text-sm">เครื่องหมาย <code className="font-bold">*</code> ตามด้วยตัวเลข จะทำการทำซ้ำข้อความนั้นตามจำนวนรอบที่ระบุ</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">การใช้งาน + และ *</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-slate-500"># การเชื่อมต่อข้อความ (ต่อ String เข้าด้วยกัน)</span><br />
                    <span className="text-blue-400">word1</span> = <span className="text-green-400">"Py"</span><br />
                    <span className="text-blue-400">word2</span> = <span className="text-green-400">"thon"</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-blue-400">word1</span> <span className="text-violet-400 font-bold">+</span> <span className="text-blue-400">word2</span>) <span className="text-slate-500"># Output: Python</span><br />
                    <br />
                    <span className="text-slate-500"># การคัดลอกข้อความ (ทำซ้ำ)</span><br />
                    <span className="text-blue-400">laugh</span> = <span className="text-green-400">"Ha"</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-blue-400">laugh</span> <span className="text-fuchsia-400 font-bold">*</span> <span className="text-amber-400">3</span>) <span className="text-slate-500"># Output: HaHaHa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulators */}
        <StringSlicerSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
