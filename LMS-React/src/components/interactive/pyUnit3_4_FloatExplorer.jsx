import React, { useState } from 'react';
import {
  Hash,
  Copy,
  CheckCircle2,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Settings,
  FileDigit,
  RefreshCw,
  XCircle,
  Lightbulb,
  Eye,
  Target,
  AlertCircle
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
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-teal-100 rounded-2xl text-teal-600 border border-teal-200 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-teal-100 text-teal-600 border border-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-600 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]'
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

const PrecisionSimulator = () => {
  const [val1, setVal1] = useState(0.1);
  const [val2, setVal2] = useState(0.2);

  const result = val1 + val2;
  const isErrorProne = result.toString().length > 5;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Eye className="w-6 h-6 text-amber-500" />
          ห้องทดลองความแม่นยำ (Precision Lab)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองเลือกตัวเลขทศนิยมมาบวกกัน เพื่อดูว่าคอมพิวเตอร์คำนวณได้เป๊ะจริงหรือไม่?</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">ค่าที่ 1</label>
            <select 
              value={val1} 
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full md:w-32 bg-white border-2 border-slate-200 rounded-xl p-4 font-mono text-2xl font-bold text-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer text-center"
            >
              <option value={0.1}>0.1</option>
              <option value={0.2}>0.2</option>
              <option value={0.3}>0.3</option>
              <option value={0.5}>0.5</option>
            </select>
          </div>
          <div className="text-4xl font-light text-slate-300 mt-6">+</div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">ค่าที่ 2</label>
            <select 
              value={val2} 
              onChange={(e) => setVal2(Number(e.target.value))}
              className="w-full md:w-32 bg-white border-2 border-slate-200 rounded-xl p-4 font-mono text-2xl font-bold text-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer text-center"
            >
              <option value={0.1}>0.1</option>
              <option value={0.2}>0.2</option>
              <option value={0.3}>0.3</option>
              <option value={0.5}>0.5</option>
            </select>
          </div>
        </div>

        <div className="text-4xl font-bold text-slate-300 hidden md:block mt-6">=</div>

        <div className="w-full md:w-auto mt-6 md:mt-0">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">ผลลัพธ์ (Python Result)</label>
          <div className={`bg-slate-900 rounded-2xl p-6 shadow-xl border-2 flex flex-col items-center justify-center min-w-[250px] transition-colors ${isErrorProne ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-teal-500/50'}`}>
            <span className={`font-mono text-3xl font-black ${isErrorProne ? 'text-amber-400' : 'text-teal-400'}`}>
              {result}
            </span>
          </div>
        </div>
      </div>

      {isErrorProne && (
        <div className="mt-10 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl relative z-10 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-800">เกิดอะไรขึ้น? ทำไมไม่เท่ากับ {Math.round(result * 10) / 10} เป๊ะๆ</h4>
            <p className="text-sm text-amber-700/80 mt-1 leading-relaxed">
              นี่คือปัญหา <strong>Floating Point Error</strong> ที่เกิดจากการที่คอมพิวเตอร์พยายามแปลงเลขฐาน 10 เป็นเลขฐาน 2 เพื่อเก็บในหน่วยความจำ 
              แต่ทศนิยมบางตัวไม่สามารถเขียนเป็นฐาน 2 ได้ลงตัว ทำให้เกิดเศษ 0000000000...4 ต่อท้าย!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoundingSimulator = () => {
  const [roundVal, setRoundVal] = useState(3.14159265);
  const [roundDecimals, setRoundDecimals] = useState(2);

  return (
    <div className="my-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 text-teal-400">
          <Target className="w-8 h-8" />
          เครื่องมือจำลองการปัดเศษ (round)
        </h3>
        <p className="text-slate-400 text-lg mb-8">ลองเปลี่ยนตัวเลขและจำนวนตำแหน่งทศนิยมที่ต้องการปัดเศษ</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Controls */}
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">ตัวเลขเริ่มต้น (Float)</label>
              <input 
                type="number"
                step="any"
                value={roundVal}
                onChange={(e) => setRoundVal(Number(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 text-white font-mono text-xl p-3 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-300">จำนวนตำแหน่งทศนิยม</label>
                <span className="text-teal-400 font-bold bg-teal-400/10 px-3 py-1 rounded-full text-xs">
                  {roundDecimals === 0 ? 'จำนวนเต็ม' : `${roundDecimals} ตำแหน่ง`}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="5"
                value={roundDecimals}
                onChange={(e) => setRoundDecimals(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-2 px-1">
                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-center">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative">
              <div className="absolute top-0 right-0 bg-slate-700 text-xs text-slate-300 px-3 py-1 font-mono rounded-bl-xl rounded-tr-xl">
                Terminal
              </div>
              
              <div className="mb-4">
                <span className="text-slate-500 font-mono text-sm"># โค้ดที่ใช้เขียน</span>
                <div className="text-xl font-mono mt-1">
                  <span className="text-blue-400">round</span>
                  <span className="text-white">(</span>
                  <span className="text-amber-400">{roundVal}</span>
                  {roundDecimals > 0 ? (
                    <>
                      <span className="text-white">, </span>
                      <span className="text-purple-400">{roundDecimals}</span>
                    </>
                  ) : null}
                  <span className="text-white">)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <span className="text-slate-500 font-mono text-sm"># ผลลัพธ์</span>
                <div className="text-4xl font-mono font-bold text-teal-400 mt-2">
                  {roundDecimals === 0 ? Math.round(roundVal) : Number(roundVal.toFixed(roundDecimals))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit3_4_FloatExplorer() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักแก้ปัญหาตัวเลขและบิลเงินสด"

ข้อที่ 1: อาถรรพ์ทศนิยม
ให้นักเรียนทดลองพิมพ์คำสั่ง 0.1 + 0.2 ในคอมพิวเตอร์ และบันทึกผลลัพธ์
คำถาม: ทำไมคอมพิวเตอร์ถึงคำนวณไม่ได้ 0.3 เป๊ะๆ? (ใบ้: ค้นหาคำว่า Floating Point Error)

ข้อที่ 2: โปรแกรมคิดเงินซุปเปอร์มาร์เก็ต
สมมติว่าลูกค้าซื้อของรวมราคา 199.998 บาท แต่ระบบแคชเชียร์รับเฉพาะทศนิยม 2 ตำแหน่ง 
จงเขียนโปรแกรมรับค่า 199.998 และใช้ฟังก์ชัน round() ปัดเศษให้เหลือ 2 ตำแหน่ง แล้วแสดงผลลัพธ์บนจอภาพ`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-teal-200 selection:text-teal-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-cyan-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-teal-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ข้อมูลทศนิยม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">(Float)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-teal-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในชีวิตจริง ตัวเลขไม่ได้มีแค่จำนวนเต็มเสมอไป <strong>ข้อมูลประเภททศนิยม (Float)</strong> จึงถูกนำมาใช้เก็บค่าอย่าง น้ำหนัก ส่วนสูง หรือจำนวนเงิน แต่ในโลกคอมพิวเตอร์ ทศนิยมมีความท้าทายเรื่องความแม่นยำแฝงอยู่!
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.4.1 ลักษณะของข้อมูลประเภททศนิยม */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Hash className="w-6 h-6 text-teal-500" />
            3.4.1 ลักษณะของข้อมูลประเภททศนิยม
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Decimal Point */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-2xl">.</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">มีจุดทศนิยมเสมอ</h3>
              <p className="text-sm text-slate-600 mb-4">ข้อมูล <code>float</code> จะต้องมีจุดทศนิยมกำกับเสมอ แม้ค่าจะเป็นจำนวนเต็มก็ตาม (เช่น 5.0)</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">pi</span> = <span className="text-amber-600">3.14159</span></div>
                <div><span className="text-blue-500">weight</span> = <span className="text-amber-600">65.0</span></div>
              </div>
            </div>

            {/* Card 2: Positive/Negative */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">±</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">ครอบคลุมทั้งบวกและลบ</h3>
              <p className="text-sm text-slate-600 mb-4">สามารถกำหนดค่าทศนิยมที่เป็นบวกหรือติดลบได้อย่างอิสระ สำหรับข้อมูลที่หลากหลาย</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-blue-500">temp</span> = <span className="text-amber-600">-2.5</span></div>
                <div><span className="text-blue-500">profit</span> = <span className="text-amber-600">+120.75</span></div>
              </div>
            </div>

            {/* Card 3: Scientific Notation */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-900/50 text-teal-400 border border-teal-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xl">e</span>
                </div>
                <h3 className="font-bold text-teal-300 text-lg mb-3">สัญกรณ์วิทยาศาสตร์</h3>
                <p className="text-sm text-slate-400 mb-4">รองรับการเขียนแบบ Scientific notation ด้วยตัว e สำหรับตัวเลขที่มากหรือน้อยเกินไป</p>
                <div className="bg-black/40 p-3 rounded-xl border border-slate-700 font-mono text-sm text-teal-400">
                  <span className="text-blue-400">speed</span> = <span className="text-amber-400">3.0e8</span>
                  <div className="text-[10px] text-slate-500 mt-1"># เท่ากับ 300,000,000.0</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.4.2 ความแม่นยำและการปัดเศษทศนิยม */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-teal-500" />
              3.4.2 ความแม่นยำและการปัดเศษทศนิยม
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  คอมพิวเตอร์เก็บข้อมูลด้วยระบบ <strong>เลขฐานสอง</strong> ทำให้บางครั้งไม่สามารถแทนค่าทศนิยมของฐานสิบได้อย่างสมบูรณ์แบบ เกิดเป็นปัญหา <em>Floating Point Error</em>
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-6">
                  <h4 className="font-bold text-amber-800 mb-1 text-sm">ข้อควรระวังเรื่องความแม่นยำ</h4>
                  <p className="text-amber-700 text-sm">เช่น เมื่อเราบวก <code className="font-mono bg-amber-100 px-1 rounded">0.1 + 0.2</code> ผลลัพธ์ในคอมพิวเตอร์อาจได้ <code className="font-mono bg-amber-100 px-1 rounded">0.30000000000000004</code> แทนที่จะเป็น 0.3</p>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  เราจึงต้องใช้ฟังก์ชัน <code className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded font-bold font-mono">round(ค่า, จำนวนตำแหน่ง)</code> เพื่อปัดเศษทศนิยมให้สวยงาม หรือเท่าที่จำเป็นต่อการใช้งาน
                </p>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">การแก้ปัญหาด้วย round()</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-slate-500"># 1. อาถรรพ์ทศนิยม</span><br />
                    <span className="text-blue-400">total</span> = <span className="text-amber-400">0.1</span> + <span className="text-amber-400">0.2</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-blue-400">total</span>) <span className="text-slate-500"># Output: 0.300...4</span><br />
                    <br />
                    <span className="text-slate-500"># 2. ปัดเศษทศนิยมให้เหลือ 2 ตำแหน่ง</span><br />
                    <span className="text-blue-400">price</span> = <span className="text-amber-400">199.998</span><br />
                    <span className="text-blue-400">final_price</span> = <span className="text-teal-400 font-bold">round</span>(<span className="text-blue-400">price</span>, <span className="text-amber-400">2</span>)<br />
                    <span className="text-yellow-200">print</span>(<span className="text-blue-400">final_price</span>) <span className="text-slate-500"># Output: 200.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulators */}
        <PrecisionSimulator />
        <RoundingSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}