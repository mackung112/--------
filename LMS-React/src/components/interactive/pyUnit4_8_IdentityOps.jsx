import React, { useState } from 'react';
import { 
  Fingerprint, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Cpu, 
  Scale, 
  Box,
  Link,
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
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
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
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
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

const MemorySimulator = () => {
  const [scenario, setScenario] = useState('different'); 
  const memoryA = "0x7F10A";
  const memoryB = scenario === 'different' ? "0x8B22C" : "0x7F10A";
  
  const isValueEqual = true; 
  const isIdentityEqual = memoryA === memoryB;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Cpu className="w-6 h-6 text-teal-500" />
          เครื่องจำลองหน่วยความจำ (Memory Tracker)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองสร้างตัวแปรเพื่อเปรียบเทียบการทำงานของ <code className="bg-slate-100 text-teal-600 px-1 py-0.5 rounded font-mono">==</code> และ <code className="bg-slate-100 text-teal-600 px-1 py-0.5 rounded font-mono">is</code></p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 relative z-10">
        <button 
          onClick={() => setScenario('different')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 justify-center
            ${scenario === 'different' ? 'bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-105' : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-500'}`}
        >
          <Box className="w-5 h-5" /> สร้างข้อมูลใหม่ 2 กล่อง
        </button>
        <button 
          onClick={() => setScenario('same')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 justify-center
            ${scenario === 'same' ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-cyan-200 hover:text-cyan-500'}`}
        >
          <Link className="w-5 h-5" /> ชี้ไปที่กล่องเดียวกัน
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-inner text-slate-300 font-mono text-sm leading-relaxed border border-slate-800">
            <div className="text-slate-500 mb-2"># โค้ด Python</div>
            <div><span className="text-blue-400">list_a</span> = [<span className="text-amber-400">1</span>, <span className="text-amber-400">2</span>, <span className="text-amber-400">3</span>]</div>
            {scenario === 'different' ? (
              <div><span className="text-blue-400">list_b</span> = [<span className="text-amber-400">1</span>, <span className="text-amber-400">2</span>, <span className="text-amber-400">3</span>] <span className="text-slate-500 ml-2"># สร้างกล่องใหม่ ค่าเหมือนกัน</span></div>
            ) : (
              <div><span className="text-blue-400">list_b</span> = <span className="text-blue-400">list_a</span> <span className="text-slate-500 ml-2"># ชี้ไปที่กล่องเดิมของ list_a</span></div>
            )}
          </div>
          <div className="flex justify-around items-center bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-mono">list_a</span>
              <div className="h-12 w-0.5 bg-teal-300 border border-dashed"></div>
              <span className="text-xs font-mono bg-teal-100 text-teal-700 px-2 py-1 rounded shadow-sm">ID: {memoryA}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-mono">list_b</span>
              <div className="h-12 w-0.5 bg-cyan-300 border border-dashed"></div>
              <span className="text-xs font-mono bg-cyan-100 text-cyan-700 px-2 py-1 rounded shadow-sm">ID: {memoryB}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-5 h-5 text-indigo-500" />
                <h4 className="font-bold text-slate-700">ตรวจสอบ "ค่า"</h4>
              </div>
              <code className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded text-sm font-mono border border-indigo-100">list_a == list_b</code>
            </div>
            <div className={`px-4 py-2 rounded-2xl font-bold font-mono text-xl ${isValueEqual ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-rose-100 text-rose-600'}`}>True</div>
          </div>

          <div className={`p-6 rounded-3xl border-2 transition-all duration-500 flex items-center justify-between shadow-md ${isIdentityEqual ? 'bg-teal-50 border-teal-300' : 'bg-rose-50 border-rose-200'}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Fingerprint className={`w-5 h-5 ${isIdentityEqual ? 'text-teal-600' : 'text-rose-500'}`} />
                <h4 className={`font-bold ${isIdentityEqual ? 'text-teal-800' : 'text-rose-800'}`}>ตรวจสอบ "ตัวตน (ID)"</h4>
              </div>
              <code className={`${isIdentityEqual ? 'text-teal-700 bg-teal-100/80 border border-teal-200' : 'text-rose-700 bg-rose-100/80 border border-rose-200'} font-bold px-2 py-1 rounded text-sm font-mono`}>list_a is list_b</code>
            </div>
            <div className={`px-4 py-2 rounded-2xl font-bold font-mono text-xl ${isIdentityEqual ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'}`}>{isIdentityEqual ? 'True' : 'False'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_8_IdentityOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Identity Operators):
1. การโคลน vs การอ้างอิง
กำหนดให้: 
x = [10, 20, 30]
y = x
z = x.copy()

ให้นักเรียนใช้ print ตรวจสอบผลลัพธ์ต่อไปนี้ และอธิบายว่าทำไมถึงได้ค่าดังกล่าว:
- print(x == y)
- print(x is y)
- print(x == z)
- print(x is z)

2. การตรวจสอบ None (Best Practice ใน Python)
กำหนดให้ data = None
การตรวจสอบว่าตัวแปรมีค่าเป็น None หรือไม่ ใน Python นิยมใช้ "is" มากกว่า "==" ให้นักเรียนเขียนคำสั่งเพื่อตรวจสอบตัวแปร data`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-teal-200 selection:text-teal-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-50/70 blur-[100px]"></div>
      </div>

      {/* Header Section (Left-aligned) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 mb-4 uppercase flex items-center gap-2">
              หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ตัวดำเนินการเอกลักษณ์ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">(Identity Operators)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-teal-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในโลกของคอมพิวเตอร์ <strong>"ค่าเท่ากัน" อาจไม่ใช่ "สิ่งเดียวกัน" เสมอไป</strong> ตัวดำเนินการกลุ่มนี้จะใช้ตรวจสอบว่าข้อมูล 2 ตัวแปรนั้น ถูกเก็บอยู่ใน "หน่วยความจำ (Memory Address) ตำแหน่งเดียวกัน" จริงๆ หรือไม่
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Differences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* IS */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:border-teal-300 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-mono text-teal-600 mb-2">is</h3>
              <h4 className="font-bold text-slate-800 mb-4 text-lg">"คือสิ่งเดียวกัน"</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                จะคืนค่า True ก็ต่อเมื่อตัวแปรทั้งสองตัว <strong>ชี้ไปยังหน่วยความจำก้อนเดียวกันเป๊ะๆ</strong> เปรียบเหมือนฝาแฝดที่มีบัตรประชาชนใบเดียวกัน
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-teal-500 shrink-0" />
                <span className="text-slate-600">มักใช้ตรวจสอบเงื่อนไขที่เกี่ยวข้องกับ <code className="bg-teal-100 text-teal-700 px-1 rounded font-bold">None</code> เช่น <code className="bg-white px-1 rounded border border-slate-200">if x is None:</code></span>
              </div>
            </div>
          </div>

          {/* IS NOT */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg hover:border-cyan-300 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black font-mono text-cyan-500 mb-2">is not</h3>
              <h4 className="font-bold text-slate-800 mb-4 text-lg">"ไม่ใช่สิ่งเดียวกัน"</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                จะคืนค่า True ก็ต่อเมื่อตัวแปรทั้งสองตัว <strong>อยู่คนละตำแหน่งในหน่วยความจำ</strong> แม้ว่าข้อมูลข้างในจะมีค่า (Value) เท่ากันก็ตาม
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-100 flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-cyan-500 shrink-0" />
                 <span className="text-slate-600">ใช้เพื่อยืนยันว่าข้อมูลที่เรากำลังจัดการ เป็นคนละ Object กับข้อมูลอ้างอิง เพื่อป้องกันการแก้ไขข้อมูลผิดตัว</span>
              </div>
            </div>
          </div>

        </div>

        {/* Analogy Box */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 border border-slate-800 relative overflow-hidden text-white">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
           <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-teal-400">
                <Fingerprint className="w-6 h-6" /> เปรียบเทียบให้เห็นภาพ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="font-bold text-amber-400 mb-2 font-mono text-lg">== (ตรวจสอบค่า)</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    เปรียบเหมือนฝาแฝดสองคน (A และ B) ที่หน้าตาเหมือนกันเป๊ะ, น้ำหนักเท่ากัน, ส่วนสูงเท่ากัน <br/><br/>ถ้าเราถามว่า A <strong>เหมือนกับ</strong> B ไหม? คำตอบคือ <strong className="text-emerald-400">ใช่ (True)</strong>
                  </p>
                </div>
                <div className="bg-teal-900/20 border border-teal-500/30 p-6 rounded-2xl">
                  <h4 className="font-bold text-teal-400 mb-2 font-mono text-lg">is (ตรวจสอบตัวตน)</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    แต่ถ้าเราถามว่า A <strong>คือคนคนเดียวกับ</strong> B ใช่หรือไม่? คำตอบคือ <strong className="text-rose-400">ไม่ใช่ (False)</strong> เพราะทั้งคู่เป็นคนละคนกัน มีบัตรประชาชนคนละใบ (คนละ Memory ID)
                  </p>
                </div>
              </div>
           </div>
        </div>

        {/* Interactive Simulator */}
        <MemorySimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}