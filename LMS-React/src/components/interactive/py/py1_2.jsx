import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Layers, 
  Cpu, 
  Database, 
  BrainCircuit, 
  Code2, 
  Binary,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const LanguageGenerationSimulator = () => {
  const [activeGen, setActiveGen] = useState(2); // Default 3GL (index 2)

  const generations = [
    {
      id: "1GL",
      name: "First Generation (1GL)",
      thaiName: "ภาษาเครื่อง (Machine Language)",
      icon: <Binary className="w-6 h-6" />,
      color: "from-slate-700 to-slate-900",
      accent: "border-slate-500",
      desc: "คุยกับเครื่องจักรโดยตรงด้วยเลข 0 และ 1 ประมวลผลเร็วที่สุด แต่เขียนและแก้ไขยากมาก",
      example: "10110000 01100001\n00000100 00000001",
      usage: "ไม่ค่อยมีใครเขียนโดยตรงแล้วในปัจจุบัน ยกเว้นการออกแบบชิป"
    },
    {
      id: "2GL",
      name: "Second Generation (2GL)",
      thaiName: "ภาษาแอสเซมบลี (Assembly)",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
      accent: "border-blue-400",
      desc: "ใช้สัญลักษณ์ (Mnemonic) หรือตัวย่อภาษาอังกฤษแทนเลข 0, 1 ต้องใช้ Assembler แปลงเป็นภาษาเครื่อง",
      example: "MOV AL, 61h\nADD AL, 1\nINT 21h",
      usage: "เขียนไดรเวอร์ (Driver) หรือระบบฝังตัวที่ต้องการคุมฮาร์ดแวร์"
    },
    {
      id: "3GL",
      name: "Third Generation (3GL)",
      thaiName: "ภาษาระดับสูง (High-Level)",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-600",
      accent: "border-indigo-400",
      desc: "ใช้คำสั่งภาษาอังกฤษที่มนุษย์เข้าใจง่าย โครงสร้างเป็นระบบ ต้องใช้ Compiler หรือ Interpreter แปลภาษา",
      example: "int age = 18;\nif (age >= 18) {\n  print(\"Adult\");\n}",
      usage: "C, Java, Python, JavaScript (การพัฒนาซอฟต์แวร์ทั่วไปในปัจจุบัน)"
    },
    {
      id: "4GL",
      name: "Fourth Generation (4GL)",
      thaiName: "ภาษาเฉพาะทาง (Very High-Level)",
      icon: <Database className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600",
      accent: "border-emerald-400",
      desc: "เน้น 'ต้องการผลลัพธ์อะไร' มากกว่า 'ทำอย่างไร' เขียนสั้นกว่า 3GL มาก มักใช้กับการจัดการฐานข้อมูล",
      example: "SELECT name, age\nFROM Users\nWHERE age >= 18;",
      usage: "SQL, MATLAB, ภาษาจัดการฐานข้อมูลและสถิติ"
    },
    {
      id: "5GL",
      name: "Fifth Generation (5GL)",
      thaiName: "ภาษาธรรมชาติ / AI (Natural Language)",
      icon: <BrainCircuit className="w-6 h-6" />,
      color: "from-rose-500 to-orange-500",
      accent: "border-rose-400",
      desc: "ใช้ภาษาแบบที่มนุษย์คุยกัน หรือใช้ AI สร้างโค้ดให้ เน้นการแก้ปัญหาด้วยตรรกะและปัญญาประดิษฐ์",
      example: "Prompt: \"สร้างฟังก์ชันคำนวณอายุจากปีเกิดให้หน่อย\"",
      usage: "Prolog, LISP หรือการใช้ ChatGPT/Copilot สร้างซอฟต์แวร์"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-10 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4 shadow-sm">
          <Layers className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-2">
          Simulator: ระดับของภาษาคอมพิวเตอร์ (1GL - 5GL)
        </h3>
        <p className="text-slate-500 text-lg">
          วิวัฒนาการจากภาษาที่ "เครื่องจักรชอบ" สู่ภาษาที่ "มนุษย์ชอบ"
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Generational Staircase */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {generations.map((gen, idx) => (
            <button
              key={gen.id}
              onClick={() => setActiveGen(idx)}
              className={`relative p-4 rounded-2xl transition-all duration-300 text-left border-2 flex items-center gap-4 group hover:-translate-y-1 ${
                activeGen === idx 
                  ? `bg-gradient-to-r ${gen.color} text-white shadow-lg border-transparent scale-[1.02]` 
                  : 'bg-white border-slate-100 hover:border-indigo-200 text-slate-600'
              }`}
            >
              <div className={`p-3 rounded-xl transition-colors ${
                activeGen === idx ? 'bg-white/20' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'
              }`}>
                {gen.icon}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold ${activeGen === idx ? 'text-white/80' : 'text-slate-400'}`}>
                  {gen.id}
                </div>
                <div className={`font-bold text-lg ${activeGen === idx ? 'text-white' : 'text-slate-800'}`}>
                  {gen.thaiName}
                </div>
              </div>
              {activeGen === idx && <ArrowRight className="w-5 h-5 text-white/70" />}
            </button>
          ))}
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-7">
          <div className={`h-full rounded-3xl p-1 bg-gradient-to-br ${generations[activeGen].color} shadow-2xl transition-all duration-500`}>
            <div className="h-full bg-white rounded-[1.4rem] p-8 flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-40 h-40 opacity-10 rounded-bl-full bg-gradient-to-br ${generations[activeGen].color}`}></div>
              
              <div className="mb-6 flex-grow relative z-10">
                <h4 className="text-2xl font-bold text-slate-800 mb-2">{generations[activeGen].name}</h4>
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold mb-4 border border-slate-200">
                  {generations[activeGen].usage}
                </div>
                <p className="text-slate-600 leading-loose text-lg mb-6">
                  {generations[activeGen].desc}
                </p>

                <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                  <div className="bg-[#020617] px-4 py-2 flex items-center justify-between border-b border-slate-800">
                    <span className="text-slate-400 font-mono text-xs flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> Code Example
                    </span>
                  </div>
                  <div className="p-6 font-mono text-emerald-400 text-base whitespace-pre-line leading-loose overflow-x-auto">
                    {generations[activeGen].example}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function pyUnit1_2_LanguageLevels() {
  const teacherTaskContent = `คำถามทบทวนความเข้าใจ (1.2):
1. ภาษาระดับต่ำ (Low-level Language) และ ภาษาระดับสูง (High-level Language) มีความแตกต่างกันอย่างไร?
2. ทำไมโปรแกรมเมอร์ส่วนใหญ่ในปัจจุบันจึงเลือกใช้ "ภาษาระดับสูง" ในการพัฒนาซอฟต์แวร์ แทนที่จะเขียนด้วยภาษาเครื่องโดยตรง?
3. ยกตัวอย่างภาษาคอมพิวเตอร์ในระดับ 4GL มา 1 ภาษา และอธิบายว่ามันถูกนำไปใช้งานด้านใดเป็นหลัก
4. นักเรียนคิดว่า AI (5GL) จะมาแทนที่โปรแกรมเมอร์ที่เขียนโค้ดแบบ 3GL (เช่น Python, Java) ได้ทั้งหมดหรือไม่? เพราะเหตุใด?`;

  return (
    <div className="font-sans text-slate-800 relative pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-emerald-50/50 blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section removed (Handled by LessonViewer) */}

        {/* 1.2.1 & 1.2.2 Low vs High Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:border-slate-300 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                  <Binary className="w-6 h-6" />
                </div>
                <div>

                  <h3 className="text-2xl font-bold text-slate-800">ภาษาระดับต่ำ (Low-level)</h3>
                </div>
              </div>
              <p className="text-slate-600 leading-loose text-lg mb-4">
                เป็นภาษาที่มีความใกล้เคียงกับฮาร์ดแวร์มากที่สุด คอมพิวเตอร์สามารถเข้าใจและทำงานได้ทันที (หรือแปลเพียงเล็กน้อย)
              </p>
              <ul className="space-y-3 text-slate-600 leading-loose">
                <li className="flex gap-2 items-start">
                  <ArrowUpRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>ข้อดี:</strong> ทำงานได้รวดเร็วที่สุด และสามารถควบคุมฮาร์ดแวร์ได้ในระดับลึก</span>
                </li>
                <li className="flex gap-2 items-start">
                  <ArrowUpRight className="w-5 h-5 text-red-500 flex-shrink-0 mt-1 transform rotate-90" />
                  <span><strong>ข้อเสีย:</strong> เขียนยาก โค้ดยาว มนุษย์อ่านเข้าใจยาก และต้องเขียนใหม่หากเปลี่ยนชนิดของ CPU</span>
                </li>
              </ul>
              <div className="mt-6 px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-500 border border-slate-100">
                ตัวอย่าง: ภาษาเครื่อง (1GL) และ ภาษาแอสเซมบลี (2GL)
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-lg hover:border-indigo-300 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>

                  <h3 className="text-2xl font-bold text-slate-800">ภาษาระดับสูง (High-level)</h3>
                </div>
              </div>
              <p className="text-slate-600 leading-loose text-lg mb-4">
                เป็นภาษาที่มีรูปแบบและไวยากรณ์ใกล้เคียงกับภาษาอังกฤษที่มนุษย์ใช้ ทำให้ง่ายต่อการเรียนรู้และเขียนโปรแกรม
              </p>
              <ul className="space-y-3 text-slate-600 leading-loose">
                <li className="flex gap-2 items-start">
                  <ArrowUpRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>ข้อดี:</strong> เขียนง่าย แก้ไขง่าย นำโค้ดไปรันในเครื่องต่างระบบกันได้ง่ายกว่า (Portability)</span>
                </li>
                <li className="flex gap-2 items-start">
                  <ArrowUpRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1 transform rotate-90" />
                  <span><strong>ข้อเสีย:</strong> ต้องมีตัวแปลภาษา (Compiler/Interpreter) ทำให้ทำงานช้ากว่าภาษาระดับต่ำเล็กน้อย</span>
                </li>
              </ul>
              <div className="mt-6 px-4 py-2 bg-indigo-50 rounded-lg text-sm text-indigo-600 border border-indigo-100">
                ตัวอย่าง: Python, Java, C++, JavaScript (3GL)
              </div>
            </div>
          </div>

        </div>

        {/* Generational Simulator */}
        <LanguageGenerationSimulator />

        {/* 1.2.6 Future Trends */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-10 md:p-14 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white/10 text-emerald-400 rounded-2xl backdrop-blur-sm shadow-inner">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>

                <h3 className="text-3xl font-bold text-white">แนวโน้มภาษาโปรแกรมคอมพิวเตอร์ในอนาคต</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-xl font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" /> Low-Code / No-Code
                </h4>
                <p className="text-slate-300 leading-loose">
                  แพลตฟอร์มที่ช่วยให้คนทั่วไปที่ไม่ได้เรียนจบไอทีสามารถสร้างแอปพลิเคชันได้ ด้วยการลากวาง (Drag & Drop) และตั้งค่าเงื่อนไขโดยไม่ต้องเขียนโค้ด (หรือเขียนน้อยมาก) 
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h4 className="text-xl font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <BrainCircuit className="w-5 h-5" /> AI-Assisted Programming
                </h4>
                <p className="text-slate-300 leading-loose">
                  การใช้ AI เช่น GitHub Copilot หรือ ChatGPT เข้ามาช่วยเขียนและตรวจสอบโค้ด (5GL) ทำให้โปรแกรมเมอร์ทำงานได้เร็วขึ้นหลายเท่าตัว แต่อย่างไรก็ตาม โปรแกรมเมอร์ยังต้องมีความเข้าใจใน 3GL (เช่น Python) เพื่อตรวจสอบว่า AI เขียนโค้ดมาถูกต้องและปลอดภัยหรือไม่
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Task */}
        <div className="mt-16">
          <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 1.2)" taskText={teacherTaskContent} />
        </div>
        
      </main>
    </div>
  );
}
