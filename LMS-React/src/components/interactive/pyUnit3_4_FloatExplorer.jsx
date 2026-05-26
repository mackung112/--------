import React, { useState } from 'react';
import TeacherTask from '../ui/TeacherTask';
import { CircleDot, Target, ArrowRight, RotateCcw, AlertCircle, Eye, Calculator } from 'lucide-react';

export default function pyUnit3_4_FloatExplorer() {
  const [activeTab, setActiveTab] = useState('precision');
  
  // Precision Simulator State
  const [val1, setVal1] = useState(0.1);
  const [val2, setVal2] = useState(0.2);

  // Rounding Simulator State
  const [roundVal, setRoundVal] = useState(3.1415926535);
  const [roundDecimals, setRoundDecimals] = useState(2);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 pb-24">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-teal-100/40 to-emerald-100/40 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-tl from-cyan-100/40 to-blue-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      {/* Header */}
      <header className="relative pt-16 pb-12 z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-bold tracking-widest text-teal-600 mb-4 uppercase">
          หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
            ข้อมูลทศนิยม (Float)
          </span>
        </h1>
        <div className="pt-6 border-l-4 border-teal-600 pl-6 mt-4">
          <p className="text-[18px] font-normal leading-[1.6] text-zinc-600">
            ข้อมูลประเภททศนิยม (float) ใช้สำหรับเก็บตัวเลขที่มีเศษส่วนหรือจุดทศนิยม 
            รวมถึงเรียนรู้ข้อจำกัดเรื่องความแม่นยำ (Precision) ของคอมพิวเตอร์และการใช้งานฟังก์ชัน round() เพื่อปัดเศษ
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col min-h-[600px]">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-white/50">
            <button 
              onClick={() => setActiveTab('precision')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'precision' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Eye size={18} />
              3.4.1 ลักษณะและความแม่นยำ
            </button>
            <button 
              onClick={() => setActiveTab('rounding')}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'rounding' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Target size={18} />
              3.4.2 การปัดเศษ (Rounding)
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row bg-[#FAFAFA]">
            {activeTab === 'precision' ? (
              <>
                {/* Left: Content */}
                <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-8 flex flex-col gap-6">
                  <div className="bg-amber-50 p-5 rounded-[16px] border border-amber-200">
                    <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                      <AlertCircle size={18} /> ข้อควรระวังของ Float
                    </h3>
                    <p className="text-[14px] leading-relaxed text-zinc-700">
                      คอมพิวเตอร์เก็บข้อมูลทศนิยมในรูปแบบเลขฐานสอง (Binary) ทำให้บางครั้งไม่สามารถเก็บค่าที่แม่นยำได้ 100% 
                      เช่น <code className="font-mono bg-white px-1 py-0.5 rounded text-amber-700 text-xs">0.1 + 0.2</code> จะไม่ได้เท่ากับ <code className="font-mono bg-white px-1 py-0.5 rounded text-amber-700 text-xs">0.3</code> เป๊ะๆ เสมอไป
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-bold tracking-wider text-slate-400 uppercase mb-3">ตัวอย่างข้อมูล Float</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 flex justify-between items-center font-mono text-sm">
                        <span className="text-slate-600">pi = </span>
                        <span className="text-teal-600 font-bold">3.14159</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 flex justify-between items-center font-mono text-sm">
                        <span className="text-slate-600">gravity = </span>
                        <span className="text-teal-600 font-bold">9.81</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200 flex justify-between items-center font-mono text-sm">
                        <span className="text-slate-600">temperature = </span>
                        <span className="text-teal-600 font-bold">-2.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Precision Simulator */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Calculator className="text-teal-500" /> ห้องทดลองความแม่นยำ (Precision Lab)
                  </h3>

                  <div className="w-full max-w-md space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">ค่าที่ 1</label>
                        <select 
                          value={val1} 
                          onChange={(e) => setVal1(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-[12px] p-3 font-mono text-lg focus:outline-none focus:border-teal-500 shadow-sm"
                        >
                          <option value={0.1}>0.1</option>
                          <option value={0.2}>0.2</option>
                          <option value={0.3}>0.3</option>
                          <option value={0.5}>0.5</option>
                        </select>
                      </div>
                      <div className="text-3xl font-light text-slate-400 mt-4">+</div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">ค่าที่ 2</label>
                        <select 
                          value={val2} 
                          onChange={(e) => setVal2(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-[12px] p-3 font-mono text-lg focus:outline-none focus:border-teal-500 shadow-sm"
                        >
                          <option value={0.1}>0.1</option>
                          <option value={0.2}>0.2</option>
                          <option value={0.3}>0.3</option>
                          <option value={0.5}>0.5</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                        =
                      </div>
                    </div>

                    <div className="bg-[#1e1e1e] rounded-[16px] p-6 shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500"></div>
                      <div className="text-xs text-slate-400 font-mono mb-2">Python Result (IEEE 754)</div>
                      <div className={`font-mono text-2xl font-bold break-all ${
                        (val1 + val2).toString().length > 5 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {val1 + val2}
                      </div>
                      
                      {(val1 + val2).toString().length > 5 && (
                        <div className="mt-4 text-xs text-amber-300/80 leading-relaxed bg-amber-900/30 p-2 rounded">
                          สังเกตว่าผลลัพธ์มีเศษ 000...4 ต่อท้าย! นี่คือปัญหาคลาสสิกของทศนิยมในภาษาคอมพิวเตอร์
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 3.4.2 Rounding Simulator */}
                <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-8 flex flex-col gap-6">
                  <div className="bg-teal-50 p-5 rounded-[16px] border border-teal-100">
                    <h3 className="font-bold text-teal-900 mb-2">ฟังก์ชัน round()</h3>
                    <p className="text-[14px] leading-relaxed text-zinc-600">
                      เพื่อแก้ปัญหาความแม่นยำ หรือเพื่อความสวยงามในการแสดงผล เราสามารถใช้ฟังก์ชัน `round(ตัวเลข, จำนวนตำแหน่ง)` เพื่อปัดเศษทศนิยมได้
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-[12px] border border-slate-200 text-[13px] font-mono leading-relaxed text-slate-700">
                      <span className="text-slate-400"># ปัดเศษให้เหลือ 2 ตำแหน่ง</span><br/>
                      round(3.14159, 2) <span className="text-teal-600"># 3.14</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-[12px] border border-slate-200 text-[13px] font-mono leading-relaxed text-slate-700">
                      <span className="text-slate-400"># ปัดให้เป็นจำนวนเต็ม (ไม่ใส่ตำแหน่ง)</span><br/>
                      round(3.99) <span className="text-teal-600"># 4</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-[20px] p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Target className="text-teal-500" /> เครื่องมือจำลองการปัดเศษ
                    </h3>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-[13px] font-medium text-[#3F3F46] mb-1">ตัวเลขเริ่มต้น (Float)</label>
                        <input 
                          type="number"
                          step="any"
                          value={roundVal}
                          onChange={(e) => setRoundVal(Number(e.target.value) || 0)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[8px] font-mono text-lg focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[13px] font-medium text-[#3F3F46] mb-1">ต้องการทศนิยมกี่ตำแหน่ง?</label>
                        <input 
                          type="range"
                          min="0"
                          max="5"
                          value={roundDecimals}
                          onChange={(e) => setRoundDecimals(Number(e.target.value))}
                          className="w-full accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                          <span>0</span>
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="text-center font-bold text-teal-600 mt-2">
                          {roundDecimals === 0 ? '0 (ปัดเป็นจำนวนเต็ม)' : `${roundDecimals} ตำแหน่ง`}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">โครงสร้างโค้ด</label>
                        <div className="bg-slate-800 text-slate-300 font-mono text-sm p-4 rounded-[12px] text-center">
                          round({roundVal}, {roundDecimals})
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">ผลลัพธ์ (Result)</label>
                        <div className="bg-teal-50 border-2 border-teal-200 rounded-[12px] p-4 text-center">
                          <span className="text-3xl font-bold font-mono text-teal-700">
                            {Number(roundVal.toFixed(roundDecimals))}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Teacher Task */}
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask 
          title="ใบงาน: ธรรมชาติของตัวเลขทศนิยม" 
          taskText="1. ให้นักเรียนลองบวก 0.1 กับ 0.2 ในคอมพิวเตอร์ และให้ค้นหาข้อมูลว่าทำไมผลลัพธ์จึงคลาดเคลื่อน\n2. อภิปรายความแตกต่างระหว่างการใช้ int(3.99) และ round(3.99)"
        />
      </div>
    </div>
  );
}