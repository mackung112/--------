import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  TerminalSquare, 
  Monitor, 
  Cpu, 
  Code2,
  History,
  MessageSquareCode,
  ArrowRight,
  Binary,
  Lightbulb,
  BookOpen,
  Network,
  Wand2,
  CheckCircle2
} from 'lucide-react';

const LanguageEvolutionTimeline = () => {
  const [activeEra, setActiveEra] = useState(0);

  const eras = [
    {
      year: "1940s",
      name: "ยุคภาษาเครื่อง (Machine Language)",
      icon: <Binary className="w-6 h-6" />,
      color: "from-slate-600 to-slate-800",
      textColor: "text-slate-800",
      bgColor: "bg-slate-100",
      description: "สั่งงานด้วยเลข 0 และ 1 โดยตรง ทำงานเร็วมากแต่เขียนยากที่สุด มนุษย์แทบอ่านไม่รู้เรื่อง",
      codeSnippet: "01001000 01100101 01101100 01101100 01101111"
    },
    {
      year: "1950s",
      name: "ยุคภาษาแอสเซมบลี (Assembly Language)",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      description: "เริ่มใช้ตัวย่อภาษาอังกฤษ (Mnemonic) แทนตัวเลข 0,1 เช่น ADD, MOV ทำให้จำง่ายขึ้น แต่ยังผูกติดกับฮาร์ดแวร์",
      codeSnippet: "MOV AX, 1\nADD AX, 2\nINT 21h"
    },
    {
      year: "1970s",
      name: "ยุคภาษาระดับสูง (High-Level Language)",
      icon: <TerminalSquare className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-50",
      description: "ใช้ไวยากรณ์คล้ายภาษาอังกฤษมนุษย์ (เช่น C, Pascal) อ่านและเขียนง่ายขึ้นมาก สามารถนำไปรันได้ในหลายเครื่อง",
      codeSnippet: "printf(\"Hello World\");\nint sum = 1 + 2;"
    },
    {
      year: "1990s-ปัจจุบัน",
      name: "ยุคภาษาสมัยใหม่ (Modern/Object-Oriented)",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-emerald-400 to-teal-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
      description: "ภาษาอย่าง Python, Java, JavaScript เน้นความเรียบง่าย เขียนสั้น ทำงานได้หลากหลายตั้งแต่เว็บยัน AI",
      codeSnippet: "print('Hello World')\ntotal = 1 + 2"
    }
  ];

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
          <History className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-2">
          ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์
        </h3>
        <p className="text-slate-500 text-lg">คลิกเลือกยุคสมัยเพื่อดูการเปลี่ยนแปลงของหน้าตาโค้ดโปรแกรม</p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Timeline Navigation */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {eras.map((era, index) => (
            <button
              key={index}
              onClick={() => setActiveEra(index)}
              className={`p-4 rounded-2xl transition-all duration-300 text-left border-2 flex items-center gap-4 group hover:scale-[1.02] active:scale-95 ${
                activeEra === index 
                  ? `border-transparent shadow-lg bg-gradient-to-r ${era.color} text-white transform scale-[1.02]` 
                  : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-600'
              }`}
            >
              <div className={`p-3 rounded-xl transition-colors ${
                activeEra === index ? 'bg-white/20 text-white' : era.bgColor + ' ' + era.textColor
              }`}>
                {era.icon}
              </div>
              <div>
                <div className={`text-sm font-bold ${activeEra === index ? 'text-white/80' : 'text-slate-400'}`}>
                  {era.year}
                </div>
                <div className={`font-bold text-lg ${activeEra === index ? 'text-white' : 'text-slate-800'}`}>
                  {era.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Timeline Content Showcase */}
        <div className="lg:col-span-7">
          <div className={`h-full rounded-3xl p-1 bg-gradient-to-br ${eras[activeEra].color} shadow-xl transition-all duration-500`}>
            <div className="h-full bg-white rounded-[1.4rem] p-8 flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full bg-gradient-to-br ${eras[activeEra].color}`}></div>
              
              <div className="mb-6 flex-grow relative z-10">
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${eras[activeEra].bgColor} ${eras[activeEra].textColor}`}>
                  {eras[activeEra].year}
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4">{eras[activeEra].name}</h4>
                <p className="text-slate-600 leading-loose text-lg">
                  {eras[activeEra].description}
                </p>
              </div>

              <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative z-10">
                <div className="bg-[#020617] px-4 py-2 flex items-center justify-between border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-slate-500 font-mono text-xs">ตัวอย่างโค้ด</span>
                </div>
                <div className="p-6 font-mono text-emerald-400 text-sm whitespace-pre-line leading-loose overflow-x-auto">
                  {eras[activeEra].codeSnippet}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function pyUnit1_1_ProgramMeaning() {
  const teacherTaskContent = `คำถามทบทวนความเข้าใจ (กิจกรรมท้ายบท):
1. จงอธิบาย "ความหมายของภาษาคอมพิวเตอร์" และความแตกต่างระหว่างภาษาคอมพิวเตอร์กับภาษาของมนุษย์
2. เอดา เลิฟเลซ (Ada Lovelace) มีความสำคัญอย่างไรต่อวงการโปรแกรมเมอร์?
3. ทำไมเราจึงต้องมี "ตัวแปลภาษา" (Translator/Compiler) ในการเขียนโปรแกรม?
4. หากนักเรียนต้องการพัฒนาเว็บไซต์ นักเรียนควรเลือกใช้ภาษาคอมพิวเตอร์ใด? เพราะเหตุใด?`;

  return (
    <div className="font-sans text-slate-800 relative pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[0%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[0%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-emerald-50/40 blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section removed (Handled by LessonViewer) */}

        {/* Section 1.1.1 & 1.1.3: Meaning & Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm">
                  <Monitor className="w-7 h-7" />
                </div>
                <div>

                  <h3 className="text-2xl font-bold text-slate-800">ความหมายและองค์ประกอบ</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    ภาษาคอมพิวเตอร์ (Computer Language)
                  </h4>
                  <p className="text-slate-600 leading-loose">
                    คือ <strong>"สื่อกลาง"</strong> หรือสัญลักษณ์ที่กำหนดขึ้นเพื่อใช้สำหรับสื่อสารระหว่างมนุษย์กับเครื่องคอมพิวเตอร์ เนื่องจากคอมพิวเตอร์เข้าใจเพียงแค่สัญญาณไฟฟ้า (0 และ 1) จึงต้องมีภาษาที่มนุษย์อ่านเข้าใจ แล้วค่อยนำไปแปลเป็นภาษาเครื่องอีกที
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    องค์ประกอบที่สำคัญ
                  </h4>
                  <ul className="space-y-3 text-slate-600 leading-loose ml-4">
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span><strong>คำศัพท์ (Vocabulary):</strong> คำสงวนหรือคำสั่งเฉพาะของแต่ละภาษา เช่น <code>print</code>, <code>if</code>, <code>while</code></span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span><strong>ไวยากรณ์ (Syntax):</strong> กฎกติกาในการเขียน คล้ายกับไวยากรณ์ในภาษาอังกฤษ หากเขียนผิดกติกา เครื่องจะไม่ยอมทำงาน (Syntax Error)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Section 1.1.2: Pioneer */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-700 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full"></div>
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/10 text-purple-300 rounded-2xl backdrop-blur-sm">
                    <Wand2 className="w-6 h-6" />
                  </div>
                  <div>

                    <h3 className="text-2xl font-bold">บิดา/มารดาแห่งภาษาโปรแกรม</h3>
                  </div>
                </div>
                <p className="text-slate-300 leading-loose mb-4">
                  <strong>เอดา เลิฟเลซ (Ada Lovelace)</strong> ได้รับการยกย่องว่าเป็น "โปรแกรมเมอร์คนแรกของโลก" เธอเป็นผู้สร้างแนวคิดในการเขียนคำสั่งให้เครื่องจักรทำงานตามลำดับขั้นตอน (Algorithm) ตั้งแต่ยุคที่คอมพิวเตอร์ยังเป็นเครื่องจักรกล (Analytical Engine ของ Charles Babbage)
                </p>
                <div className="inline-block px-4 py-2 bg-white/10 rounded-xl text-purple-200 text-sm font-medium border border-white/10">
                  "แนวคิดของเธอคือรากฐานของโปรแกรมในปัจจุบัน"
                </div>
              </div>
            </div>

            {/* Section 1.1.5 & 1.1.6: Relationship & Importance */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">

                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">ความสัมพันธ์และความสำคัญ</h3>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between text-slate-700">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl mb-2">📝</div>
                      <span className="text-xs font-bold text-blue-600 text-center">ภาษาคอมพิวเตอร์</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl mb-2">⚙️</div>
                      <span className="text-xs font-bold text-slate-500 text-center">ประกอบกันเป็น</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl mb-2">💻</div>
                      <span className="text-xs font-bold text-emerald-600 text-center">โปรแกรม</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-loose mt-4 text-sm">
                  <strong>ความสำคัญ:</strong> ภาษาคอมพิวเตอร์ช่วยให้เราสามารถควบคุมและสั่งการเครื่องจักรให้ทำงานที่ซับซ้อน คำนวณรวดเร็ว และประมวลผลข้อมูลมหาศาลได้อย่างถูกต้องแม่นยำ
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 1.1.4: History Timeline */}
        <LanguageEvolutionTimeline />

        {/* Section 1.1.7: Choosing the right language */}
        <div className="mb-16">
          <div className="text-center mb-10">

            <h3 className="text-3xl font-bold text-slate-800">การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสม</h3>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto leading-loose">
              ปัจจุบันมีภาษาคอมพิวเตอร์หลายร้อยภาษา แต่ละภาษามีจุดเด่นและถูกสร้างมาเพื่องานที่แตกต่างกัน การเลือกภาษาให้ตรงกับงานคือหัวใจสำคัญของโปรแกรมเมอร์
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-md">
                Py
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Python</h4>
              <p className="text-slate-600 text-sm leading-loose">
                เหมาะสำหรับ: Data Science, AI, งานคำนวณทางวิทยาศาสตร์, และผู้เริ่มต้นเขียนโปรแกรม (เขียนง่าย อ่านง่าย)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl flex items-center justify-center text-slate-800 font-bold text-2xl mb-4 shadow-md">
                JS
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">JavaScript</h4>
              <p className="text-slate-600 text-sm leading-loose">
                เหมาะสำหรับ: การพัฒนาเว็บไซต์ส่วนหน้า (Frontend) และเว็บแอปพลิเคชัน (ทำงานร่วมกับ HTML/CSS)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-md">
                C++
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">C / C++</h4>
              <p className="text-slate-600 text-sm leading-loose">
                เหมาะสำหรับ: การเขียนโปรแกรมควบคุมฮาร์ดแวร์, ระบบปฏิบัติการ, และเกม (เน้นความเร็วและประสิทธิภาพสูง)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-md">
                Java
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Java</h4>
              <p className="text-slate-600 text-sm leading-loose">
                เหมาะสำหรับ: ระบบงานระดับองค์กรขนาดใหญ่ (Enterprise), และการพัฒนาแอปพลิเคชันบนระบบ Android
              </p>
            </div>

          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 1.1.1 - 1.1.7)" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
