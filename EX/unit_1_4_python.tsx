import React, { useState } from 'react';
import { 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb,
  Sparkles,
  Code2,
  Globe2,
  Blocks,
  BrainCircuit,
  Gamepad2,
  BarChart3,
  Coffee,
  Check,
  Rocket
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            aria-label="คัดลอกโจทย์กิจกรรม"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
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

const PythonEcosystemSimulator = () => {
  const [activeCategory, setActiveCategory] = useState('ai');

  const categories = {
    ai: {
      id: 'ai',
      title: 'AI & Machine Learning',
      icon: <BrainCircuit className="w-6 h-6" />,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      library: 'TensorFlow, PyTorch, scikit-learn',
      desc: 'Python เป็นภาษาอันดับ 1 ในวงการปัญญาประดิษฐ์ (AI) ไม่ว่าจะเป็นการวิเคราะห์ภาพ, ChatGPT, หรือรถยนต์ขับเคลื่อนอัตโนมัติ ล้วนใช้ Python เป็นหลัก',
      code: `import tensorflow as tf\n\n# สร้างโมเดล AI จำลองสมองมนุษย์\nmodel = tf.keras.models.Sequential([\n  tf.keras.layers.Dense(128, activation='relu')\n])\nprint("AI Model Created!")`
    },
    data: {
      id: 'data',
      title: 'Data Science & Analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600',
      library: 'Pandas, NumPy, Matplotlib',
      desc: 'เครื่องมือทรงพลังสำหรับนักวิทยาศาสตร์ข้อมูล ใช้ในการทำความสะอาดข้อมูล วิเคราะห์สถิติ และวาดกราฟเพื่อหา Insight เชิงธุรกิจ',
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# โหลดข้อมูลยอดขายและสร้างกราฟ\ndata = pd.read_csv("sales.csv")\ndata.plot(kind='bar', x='Month', y='Sales')\nplt.show()`
    },
    web: {
      id: 'web',
      title: 'Web Development',
      icon: <Globe2 className="w-6 h-6" />,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      library: 'Django, Flask, FastAPI',
      desc: 'สร้างเว็บไซต์หลังบ้าน (Backend) ที่ปลอดภัยและรองรับผู้ใช้จำนวนมหาศาล เว็บไซต์ระดับโลกอย่าง Instagram, Spotify, และ Pinterest ก็ใช้ Python',
      code: `from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return "Welcome to my Awesome Website!"\n\napp.run()`
    },
    game: {
      id: 'game',
      title: 'Game Development',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-600',
      library: 'Pygame, Godot (GDScript)',
      desc: 'แม้จะไม่ใช่ภาษาหลักในการสร้างเกม 3D ฟอร์มยักษ์ แต่ Python เหมาะมากสำหรับการสร้างเกม 2D อินดี้ หรือใช้เขียนสคริปต์เสริมในเกมต่างๆ',
      code: `import pygame\npygame.init()\n\n# สร้างหน้าต่างเกมขนาด 800x600\nscreen = pygame.display.set_mode((800, 600))\npygame.display.set_caption("My First Game")\nprint("Game Engine Started!")`
    }
  };

  const activeData = categories[activeCategory];

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Blocks className="w-6 h-6 text-amber-500" />
          เครื่องจำลองพลังของ Python (Ecosystem Explorer)
        </h3>
        <p className="text-slate-500 mt-2">กดเลือกหมวดหมู่เพื่อดูว่า "ความสามารถพิเศษ" ของ Python นำไปประยุกต์ใช้สร้างอะไรได้บ้าง</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Category Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {Object.values(categories).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border-2 text-left
                ${activeCategory === cat.id 
                  ? `${cat.lightBg} ${cat.borderColor} shadow-md scale-105 transform` 
                  : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-colors duration-300
                ${activeCategory === cat.id ? `${cat.color} text-white` : 'bg-slate-100 text-slate-400'}`}>
                {cat.icon}
              </div>
              <div className="font-bold text-slate-700">
                {cat.title}
              </div>
            </button>
          ))}
        </div>

        {/* Info & Code Display */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className={`p-6 md:p-8 rounded-3xl border-2 transition-all duration-500 bg-white ${activeData.borderColor} shadow-sm`}>
             <div className="flex flex-col md:flex-row gap-6 items-start">
               
               <div className="flex-grow">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 mb-4">
                   <Sparkles className="w-3 h-3 text-amber-500" /> ไลบรารียอดนิยม: {activeData.library}
                 </div>
                 <h3 className={`text-2xl font-bold mb-3 ${activeData.textColor}`}>
                   {activeData.title}
                 </h3>
                 <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                   {activeData.desc}
                 </p>
               </div>
               
               <div className={`w-24 h-24 shrink-0 rounded-full flex items-center justify-center opacity-20 ${activeData.color}`}>
                 {React.cloneElement(activeData.icon, { className: "w-12 h-12 text-white" })}
               </div>
             </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl flex flex-col overflow-hidden relative group h-full min-h-[200px]">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2 relative z-10">
                <Code2 className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-400">example.py</span>
             </div>
             <div className="p-6 font-mono text-sm leading-relaxed flex-grow flex items-center relative z-10 text-emerald-400 whitespace-pre-wrap">
               {activeData.code}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติในห้องเรียน: "Python Detective สำรวจโลกของไพทอน"

โจทย์ข้อที่ 1 (ค้นคว้าอิสระ): 
ให้นักเรียนใช้เวลา 5 นาที ค้นหาแอปพลิเคชัน เว็บไซต์ หรือบริษัทระดับโลก "อย่างน้อย 3 แห่ง" ที่มีการใช้งานภาษา Python เป็นเบื้องหลัง (เช่น Instagram, Spotify) พร้อมระบุสั้นๆ ว่าพวกเขาใช้ Python ทำอะไร?

โจทย์ข้อที่ 2 (อภิปรายกลุ่ม): 
จากที่ได้เรียนจุดเด่นของ Python ไป ให้นักเรียนจับคู่แล้วช่วยกันสรุปว่า...
"ทำไมมหาวิทยาลัยและโรงเรียนทั่วโลก ถึงนิยมเลือกภาษา Python เป็นภาษาแรก (First Language) ในการสอนนักเรียนเขียนโปรแกรม?"
(ใบ้: ลองเปรียบเทียบความยาวของโค้ดกับภาษาอื่นดูสิ!)`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-[120px]"></div>
      </div>

      {/* Header Section (Left-aligned as requested) */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-4 uppercase">
              หน่วยที่ 1 หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              จุดเด่นและเอกลักษณ์ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">ของภาษา Python</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-amber-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Python ไม่ใช่แค่งูยักษ์ แต่เป็นชื่อของภาษาคอมพิวเตอร์ที่ถูกสร้างขึ้นโดย <strong>Guido van Rossum</strong> ในปี 1991 ด้วยปรัชญาที่ว่า <strong className="text-blue-600">"โค้ดควรอ่านง่ายเหมือนภาษาอังกฤษ"</strong>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Core Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">1. อ่านง่าย เขียนง่าย (Simple & Readable)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              ไม่มีเครื่องหมายปีกกา {`{ }`} หรือเซมิโคลอน (;) ให้ปวดหัว โค้ดของ Python ถูกบังคับให้จัดหน้าย่อหน้า (Indentation) อย่างเป็นระเบียบ ทำให้อ่านง่ายเหมือนอ่านประโยคภาษาอังกฤษ
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Blocks className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">2. มีไลบรารีมหาศาล (Batteries Included)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              มีโมดูลเสริมและไลบรารีที่คนทั่วโลกเขียนแจกฟรีเยอะมาก (เรียกว่า ecosystem ที่แข็งแกร่ง) ไม่ต้องเขียนโค้ดเองตั้งแต่ศูนย์ แค่ Import เครื่องมือมาประกอบกันก็สร้างแอปเจ๋งๆ ได้เลย
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">3. ทำงานได้ทุกระบบ (Cross-platform)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              เขียนโค้ดเพียงครั้งเดียว (Write once, run anywhere) สามารถนำไปรันได้ทั้งบน Windows, macOS, หรือ Linux โดยแทบไม่ต้องแก้ไขโค้ดใหม่ เพราะเป็นภาษาแบบ Interpreter
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">4. พิมพ์นิยมในตลาดงาน (High Demand)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              ด้วยความที่มันนำไปใช้ได้ทั้งทำเว็บ, สร้าง AI, วิเคราะห์ข้อมูล, หรือเขียนบอททำงานอัตโนมัติ ทำให้โปรแกรมเมอร์ Python เป็นที่ต้องการตัวของบริษัทเทคโนโลยีทั่วโลก
            </p>
          </div>

        </div>

        {/* Code Comparison Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 text-white relative overflow-hidden border border-slate-800">
           <div className="relative z-10 mb-8 text-center">
             <h3 className="text-3xl font-bold mb-2">พิสูจน์ความ "ง่าย" ของ Python</h3>
             <p className="text-slate-400">มาลองดูว่าการสั่งให้คอมพิวเตอร์พิมพ์คำว่า "Hello World" ในแต่ละภาษาต่างกันอย่างไร?</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
             
             {/* Java Code */}
             <div className="bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden">
               <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                 <Coffee className="w-4 h-4 text-orange-400" />
                 <span className="text-xs font-bold text-slate-300">ภาษา Java (ต้องมีโครงสร้างคลาส)</span>
               </div>
               <div className="p-6 font-mono text-sm leading-loose">
                 <span className="text-orange-400">public class</span> <span className="text-amber-200">Main</span> {`{`}<br/>
                 &nbsp;&nbsp;<span className="text-orange-400">public static void</span> <span className="text-blue-300">main</span>(String[] args) {`{`}<br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;System.out.<span className="text-blue-300">println</span>(<span className="text-green-400">"Hello, World!"</span>);<br/>
                 &nbsp;&nbsp;{`}`}<br/>
                 {`}`}
               </div>
             </div>

             {/* Python Code */}
             <div className="bg-[#0f172a] rounded-2xl border-2 border-blue-500/50 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)]">
               <div className="bg-blue-900/40 px-4 py-2 flex justify-between items-center border-b border-blue-500/30">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-amber-400 flex items-center justify-center shrink-0 shadow-sm"></div>
                   <span className="text-xs font-bold text-blue-100">ภาษา Python</span>
                 </div>
                 <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Winner</span>
               </div>
               <div className="p-6 font-mono text-sm leading-loose h-full flex flex-col">
                 <span className="text-yellow-200">print</span>(<span className="text-green-400">"Hello, World!"</span>)
                 <div className="mt-auto pt-6 text-slate-400 flex items-center gap-2 text-xs font-sans">
                   <Check className="w-4 h-4 text-emerald-400" /> สั้น, กระชับ, และตรงไปตรงมา ไม่ต้องมี Boilerplate code
                 </div>
               </div>
             </div>

           </div>
        </div>

        {/* Interactive Simulator */}
        <PythonEcosystemSimulator />

        {/* Teacher Task */}
        <TeacherTask 
          title="กิจกรรม: Python Detective สำรวจโลกของไพทอน" 
          taskText={teacherTaskContent} 
        />

        {/* Next Lesson Hint */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-2">ตื่นเต้นที่จะเขียนโค้ดแรกหรือยังครับ?</p>
          <p className="text-lg font-medium text-slate-700">
            หัวข้อถัดไป: ลองพิมพ์ <strong className="text-amber-500 cursor-pointer hover:underline">[1.5 การติดตั้ง Python และ IDE]</strong> เพื่อเตรียมคอมพิวเตอร์ของคุณให้พร้อมสำหรับการเขียนโปรแกรม!
          </p>
        </div>
        
      </main>
    </div>
  );
}