import React, { useState } from 'react';
import { 
  Search, 
  ListChecks, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Database,
  ArrowRightCircle,
  AlertTriangle
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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 border border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-purple-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-purple-100 text-purple-600 border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
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

const MembershipSimulator = () => {
  const [searchTerm, setSearchTerm] = useState('apple');
  const fruits = ['apple', 'banana', 'cherry', 'date'];
  
  const isInList = fruits.includes(searchTerm.toLowerCase());

  return (
    <div className="my-16 bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 md:p-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Database className="w-6 h-6 text-purple-500" />
          เครื่องจำลอง Membership Checker
        </h3>
        <p className="text-slate-500 mt-2">พิมพ์ชื่อผลไม้ เพื่อเช็คว่ามีอยู่ในตะกร้า (List) หรือไม่</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Input & Logic */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-8 shadow-inner text-slate-300 font-mono text-sm leading-relaxed border border-slate-800">
            <div className="text-slate-500 mb-4"># ตะกร้าผลไม้ของเรา</div>
            <div className="text-indigo-300 font-bold mb-4">
              basket = ["apple", "banana", "cherry", "date"]
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-purple-400">ค้นหา:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-b-2 border-purple-500 focus:outline-none w-32 px-1 text-white font-bold"
              />
            </div>

            <div className="text-xl font-bold">
              <span className="text-purple-400">print</span>(
              <span className="text-indigo-300">"{searchTerm.toLowerCase()}"</span> <span className="text-amber-400 font-bold">in</span> <span className="text-indigo-300">basket</span>)
            </div>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {fruits.map(f => (
              <div 
                key={f}
                className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border-2 transition-all duration-300
                  ${searchTerm.toLowerCase() === f 
                    ? 'bg-purple-500 text-white border-purple-600 scale-110 shadow-lg' 
                    : 'bg-white text-slate-600 border-slate-200'
                  }
                `}
              >
                {f}
              </div>
            ))}
          </div>

          <div className={`px-8 py-4 rounded-full font-bold font-mono text-2xl transition-all duration-500 border-2
            ${isInList 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
              : 'bg-rose-50 border-rose-400 text-rose-600'
            }
          `}>
            {String(isInList).toUpperCase()}
          </div>
          <p className="text-slate-500 text-sm">ผลลัพธ์การตรวจสอบ</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Membership Operators):
ให้นักเรียนทดลองเขียนโค้ดเพื่อตรวจสอบผลลัพธ์ด้วยตนเอง

ข้อที่ 1: ตรวจสอบรายชื่อผู้ใช้งาน
กำหนดรายชื่อผู้ใช้งานในระบบ:
users = ["admin", "teacher", "student"]
ให้รับค่าชื่อผู้ใช้จาก input()
- ถ้าชื่อที่กรอก "อยู่ใน" (in) รายชื่อ users ให้พิมพ์ "เข้าสู่ระบบได้"
- ถ้าชื่อที่กรอก "ไม่อยู่ใน" (not in) รายชื่อ users ให้พิมพ์ "ไม่มีชื่อในระบบ"

ข้อที่ 2: ตรวจสอบตัวอักษรในข้อความ
กำหนดให้:
sentence = "Python is amazing"
ให้เขียนตรวจสอบว่ามีตัวอักษร "z" อยู่ใน sentence หรือไม่ (ใช้ print ตรวจสอบ)
และตรวจสอบว่า "z" ไม่อยู่ใน sentence หรือไม่ (ใช้ print ตรวจสอบ)`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-purple-200 selection:text-purple-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-24 pb-16 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-white/70 backdrop-blur-md shadow-sm mb-6">
            <ListChecks className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold tracking-widest text-purple-700">UNIT 4.9</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-slate-800 tracking-tight">
            ตัวดำเนินการ <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-mono">
              สมาชิก (Membership)
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            เคยสงสัยไหมว่า ข้อมูลตัวนี้ <strong className="text-purple-600">มีอยู่จริงไหม</strong> ในรายการชุดข้อมูลขนาดใหญ่? <br/>
            นี่คือเครื่องมือที่จะช่วยคุณค้นหาคำตอบในพริบตา!
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 'in' Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold border border-purple-200 mb-6 shadow-inner">
                in
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">ตรวจสอบการมีอยู่ (in)</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                คืนค่าเป็น <span className="font-mono font-bold text-emerald-500">True</span> ถ้าสิ่งที่คุณหา <strong className="underline decoration-purple-400 decoration-2 underline-offset-4">พบอยู่ในชุดข้อมูล</strong> นั้นๆ
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm border-l-4 border-purple-500 text-slate-300">
                <span className="text-emerald-400">"apple"</span> <span className="text-purple-400">in</span> basket
              </div>
            </div>

            {/* 'not in' Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center font-mono text-xl font-bold border border-pink-200 mb-6 shadow-inner text-center leading-tight">
                not<br/>in
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">ตรวจสอบการไม่มีอยู่ (not in)</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                คืนค่าเป็น <span className="font-mono font-bold text-emerald-500">True</span> ถ้าสิ่งที่คุณหา <strong className="underline decoration-pink-400 decoration-2 underline-offset-4">ไม่ปรากฏอยู่ในชุดข้อมูล</strong> นั้น
              </p>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm border-l-4 border-pink-500 text-slate-300">
                <span className="text-emerald-400">"durian"</span> <span className="text-pink-400">not in</span> basket
              </div>
            </div>
          </div>
        </div>

        <MembershipSimulator />

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4">ทำไม Membership Operators ถึงทรงพลัง?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Sparkles className="text-purple-500"/> ความเรียบง่าย</h3>
              <p className="text-slate-500 leading-relaxed">
                แทนที่จะต้องใช้ Loop วนลูปเพื่อไล่เช็คทีละค่า (ซึ่งยาวและซับซ้อน) เราสามารถใช้ <code className="bg-slate-100 text-purple-600 font-mono px-1 rounded">in</code> ได้ในบรรทัดเดียว ประหยัดเวลาและโค้ดดูสะอาดขึ้นมาก!
              </p>
            </div>
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><ArrowRightCircle className="text-pink-500"/> ยืดหยุ่นสูง</h3>
              <p className="text-slate-500 leading-relaxed">
                ไม่เพียงแค่ใช้กับ List เท่านั้น แต่ยังใช้เช็คตัวอักษรในประโยค (String) ได้อีกด้วย ทำให้การกรองข้อมูลทำได้หลากหลายมิติ
              </p>
            </div>
          </div>
        </section>

        <TeacherTask 
          title="ใบงานปฏิบัติ: แกะรอยข้อมูลในรายการ" 
          taskText={teacherTaskContent} 
        />
      </main>
    </div>
  );
}