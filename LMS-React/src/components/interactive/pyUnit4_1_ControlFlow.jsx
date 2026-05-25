import TeacherTask from '../ui/TeacherTask';
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Type, 
  Hash, 
  ToggleLeft, 
  Quote,
  ArrowRight
} from 'lucide-react';



const VariableSimulator = () => {
  const [varName, setVarName] = useState('score');
  const [varValue, setVarValue] = useState('100');
  const [varType, setVarType] = useState('int');
  const [typeColor, setTypeColor] = useState('bg-blue-500');

  useEffect(() => {
    // Auto-detect type based on value
    const val = varValue.trim();
    if (val === '') {
      setVarType('NoneType');
      setTypeColor('bg-slate-400');
    } else if (val === 'True' || val === 'False') {
      setVarType('bool');
      setTypeColor('bg-purple-500');
    } else if (!isNaN(val) && val !== '') {
      if (val.includes('.')) {
        setVarType('float');
        setTypeColor('bg-cyan-500');
      } else {
        setVarType('int');
        setTypeColor('bg-indigo-500');
      }
    } else {
      setVarType('str');
      setTypeColor('bg-amber-500');
    }
  }, [varValue]);

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Box className="w-6 h-6 text-blue-500" />
          เครื่องจำลองกล่องเก็บข้อมูล (Variable Box)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองเปลี่ยนค่าในกล่อง แล้วดูว่า Python มองเห็นเป็นชนิดข้อมูลอะไร</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">ชื่อตัวแปร (Variable Name)</label>
            <input 
              type="text" 
              value={varName}
              onChange={(e) => setVarName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="เช่น score, name"
            />
            <p className="text-xs text-slate-400 mt-2">* ใช้ได้เฉพาะภาษาอังกฤษ ตัวเลข และ _ (ห้ามขึ้นต้นด้วยตัวเลข)</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">ข้อมูลที่ต้องการเก็บ (Value)</label>
            <input 
              type="text" 
              value={varValue}
              onChange={(e) => setVarValue(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="ลองพิมพ์ 100, 3.14, Hello หรือ True"
            />
          </div>
        </div>

        {/* Visualization */}
        <div className="flex flex-col items-center justify-center">
          {/* The Box */}
          <div className="relative group">
            {/* Box Shadow Effect */}
            <div className={`absolute -inset-4 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${typeColor}`}></div>
            
            <div className="relative bg-white border-4 border-slate-100 shadow-xl rounded-3xl p-8 w-64 h-64 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
              
              {/* Variable Name Tag */}
              <div className="absolute -top-5 bg-slate-800 text-white font-mono px-4 py-1.5 rounded-lg text-sm shadow-md flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-300" />
                {varName || 'unnamed'}
              </div>

              {/* Data Type Badge */}
              <div className={`absolute top-4 right-4 text-white text-xs font-bold font-mono px-2 py-1 rounded shadow-sm ${typeColor}`}>
                {varType}
              </div>

              {/* The Value */}
              <div className="text-3xl font-mono font-bold text-slate-700 break-all text-center">
                {varType === 'str' && varValue !== '' ? `"${varValue}"` : varValue}
              </div>

            </div>
          </div>

          {/* Python Code Equivalent */}
          <div className="mt-10 bg-slate-900 rounded-2xl p-4 shadow-inner w-full max-w-sm border border-slate-800 flex items-center gap-3">
            <span className="text-slate-500 font-mono select-none">&gt;&gt;&gt;</span>
            <code className="font-mono text-sm text-slate-300">
              <span className="text-blue-400">{varName || 'unnamed'}</span> = {varType === 'str' && varValue !== '' ? <span className="text-green-400">"{varValue}"</span> : <span className="text-amber-400">{varValue}</span>}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_1_ControlFlow() {
  const teacherTaskContent = `กิจกรรม Unplugged: "กล่องหรรษา ทายชนิดข้อมูล"
อุปกรณ์: 
1. กล่องกระดาษเปล่า 1 ใบ (แปะป้ายคำว่า "ตัวแปร / Variable")
2. กระดาษโพสต์อิท (Post-it) 

วิธีทำกิจกรรม:
1. ให้นักเรียนเขียน "ชื่อตัวแปร" ลงบนโพสต์อิทสีหนึ่ง แปะไว้หน้ากล่อง
2. ให้นักเรียนเขียน "ข้อมูล" (เช่น 25, "สมชาย", 99.99, True) ลงบนโพสต์อิทอีกสีหนึ่ง แล้วหย่อนลงในกล่อง
3. สุ่มหยิบข้อมูลในกล่องขึ้นมาทีละใบ แล้วให้เพื่อนในห้องทายว่า ข้อมูลนั้นเป็น "ชนิดข้อมูล (Data Type)" อะไร (int, float, str, bool)
4. อภิปรายร่วมกันว่า ทำไมเราไม่สามารถเอาข้อความมาบวกกับตัวเลขได้ตรงๆ`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/50 blur-[120px]"></div>
      </div>

      {/* Header Section (Left-aligned as requested) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-4 uppercase">
              หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ตัวแปรและชนิดข้อมูล <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">(Variables & Data Types)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-blue-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              เปรียบเสมือน <strong>"กล่อง"</strong> ที่ใช้เก็บของต่างๆ ในคอมพิวเตอร์ โดยเราต้องตั้งชื่อกล่อง (Variable Name) และคอมพิวเตอร์จะแยกแยะชนิดของสิ่งที่อยู่ข้างใน (Data Type) โดยอัตโนมัติ
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Data Types Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">ชนิดข้อมูลพื้นฐาน 4 ประเภท (ใน Python)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* INT */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Hash className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">int</h3>
              <p className="text-xs font-mono text-indigo-500 mb-3">Integer</p>
              <p className="text-sm text-slate-600 mb-4">จำนวนเต็ม ไม่มีทศนิยม ทั้งค่าบวก ค่าลบ และศูนย์</p>
              <div className="bg-slate-50 p-2 rounded text-sm font-mono text-slate-700 border border-slate-100">
                10, -5, 0, 999
              </div>
            </div>

            {/* FLOAT */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl leading-none">.</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">float</h3>
              <p className="text-xs font-mono text-cyan-500 mb-3">Floating Point</p>
              <p className="text-sm text-slate-600 mb-4">ตัวเลขที่มีจุดทศนิยม ใช้กับค่าที่ต้องการความละเอียด</p>
              <div className="bg-slate-50 p-2 rounded text-sm font-mono text-slate-700 border border-slate-100">
                3.14, 0.5, -12.0
              </div>
            </div>

            {/* STRING */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Quote className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">str</h3>
              <p className="text-xs font-mono text-amber-500 mb-3">String</p>
              <p className="text-sm text-slate-600 mb-4">ข้อความหรือตัวอักษร ต้องอยู่ภายใต้เครื่องหมาย " " หรือ ' '</p>
              <div className="bg-slate-50 p-2 rounded text-sm font-mono text-slate-700 border border-slate-100">
                "Hello", '123'
              </div>
            </div>

            {/* BOOLEAN */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ToggleLeft className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">bool</h3>
              <p className="text-xs font-mono text-purple-500 mb-3">Boolean</p>
              <p className="text-sm text-slate-600 mb-4">ค่าความจริงทางตรรกศาสตร์ มีแค่ 2 ค่าเท่านั้น</p>
              <div className="bg-slate-50 p-2 rounded text-sm font-mono text-slate-700 border border-slate-100">
                True, False
              </div>
            </div>

          </div>
        </div>

        {/* Rules of Variables */}
        <div className="bg-slate-800 rounded-3xl p-8 md:p-10 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <h2 className="text-2xl font-bold mb-6 relative z-10">กฎการตั้งชื่อตัวแปร (Naming Rules)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>ใช้ภาษาอังกฤษ ตัวเลข และ Underscore (_) ได้เท่านั้น</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>ตัวพิมพ์เล็กและพิมพ์ใหญ่ ถือว่าเป็นคนละตัวแปร (Case-sensitive) เช่น <code className="bg-slate-700 px-1 rounded text-sm">Age</code> กับ <code className="bg-slate-700 px-1 rounded text-sm">age</code></span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-rose-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/50">X</div>
                <span><strong>ห้าม</strong> ขึ้นต้นด้วยตัวเลข เช่น <code className="bg-rose-900/50 px-1 rounded text-sm">1name</code></span>
              </li>
              <li className="flex items-start gap-3 text-rose-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/50">X</div>
                <span><strong>ห้าม</strong> มีเว้นวรรค และห้ามใช้เครื่องหมายพิเศษ (ยกเว้น _)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Simulator */}
        <VariableSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}