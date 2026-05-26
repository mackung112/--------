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
  Rocket,
  RotateCcw,
  Terminal,
  Play,
  Cpu,
  Monitor,
  Database,
  ArrowRight
} from 'lucide-react';

// ==========================================
// 1. TeacherTask Component (Standardized Footer)
// ==========================================
const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      {/* Vibrant Gradient Background for Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
              <BookOpen className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500 mb-1 tracking-widest uppercase">กิจกรรมปฏิบัติในห้องเรียน</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
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

// ==========================================
// 2. Python Ecosystem Simulator
// ==========================================
const PythonEcosystemSimulator = () => {
  const [activeCategory, setActiveCategory] = useState('ai');
  const [isRunning, setIsRunning] = useState(false);
  const [simOutput, setSimOutput] = useState([]);
  const [showVisual, setShowVisual] = useState(false);

  const categories = {
    ai: {
      id: 'ai',
      title: 'AI & Machine Learning',
      icon: <BrainCircuit className="w-5 h-5" />,
      color: 'bg-purple-500 text-purple-600 border-purple-200',
      textColor: 'text-purple-600',
      library: 'PyTorch, TensorFlow, scikit-learn',
      desc: 'Python ครองแชมป์อันดับ 1 ในด้านปัญญาประดิษฐ์ เพราะไวยากรณ์เรียบง่ายช่วยให้นักวิจัยโฟกัสที่คณิตศาสตร์และโครงสร้างนิวรอน แทนที่จะมาเสียเวลากับภาษาที่ซับซ้อน',
      code: `import torch\nimport torch.nn as nn\n\n# 1. สร้างโครงข่ายประสาทเทียมจำลอง\nmodel = nn.Sequential(\n    nn.Linear(2, 4),  # Input Layer\n    nn.ReLU(),       # Activation\n    nn.Linear(4, 1)   # Output Layer\n)\n\n# 2. ป้อนข้อมูลพิกัดสีเพื่อแยกวัตถุ\nx = torch.tensor([[0.5, 0.8]])\noutput = model(x)\nprint("Neural Network Status: ACTIVE")\nprint("Predict Probability:", torch.sigmoid(output).item())`,
      outputs: [
        '[System] Initializing CUDA Core for Tensor Processing...',
        '[Info] PyTorch successfully bound to CPU/GPU pipeline.',
        '[Model] Created deep linear neural network model architecture.',
        '[Predict] Output tensor calculated: tensor([[0.6842]])',
        '✅ Neural Network Status: ACTIVE | Probability: 68.4%'
      ]
    },
    data: {
      id: 'data',
      title: 'Data Science & Analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'bg-emerald-500 text-emerald-600 border-emerald-200',
      textColor: 'text-emerald-600',
      library: 'Pandas, NumPy, Matplotlib, Seaborn',
      desc: 'เครื่องมือระดับพระกาฬในการวิเคราะห์ คลีนข้อมูลดิบ และปั้นออกมารวมศูนย์เป็นตารางสถิติหรือกราฟธุรกิจในบรรทัดเดียว นิยมมากในบริษัทวิเคราะห์การเงินระดับโลก',
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# 1. โหลดข้อมูลยอดขายประจำปี\ndata = pd.DataFrame({\n    'Month': ['Jan', 'Feb', 'Mar', 'Apr'],\n    'Sales': [120, 210, 180, 350]\n})\n\n# 2. คำนวณหาค่าเฉลี่ยและวาดกราฟแท่ง\nmean_sales = data['Sales'].mean()\nprint("Average Sales:", mean_sales)\ndata.plot(kind='bar', x='Month', y='Sales')\nplt.show()`,
      outputs: [
        '[Pandas] Loading DataFrame into volatile system storage...',
        '[Stats] Column "Sales" computed successfully.',
        '[Stats] Median: 195.00 | Standard Deviation: 98.42',
        'Average Sales: 215.0',
        '✅ Data Pipeline: Finished! Rendering vector bar chart window...'
      ]
    },
    web: {
      id: 'web',
      title: 'Web Development (Backend)',
      icon: <Globe2 className="w-5 h-5" />,
      color: 'bg-blue-500 text-blue-600 border-blue-200',
      textColor: 'text-blue-600',
      library: 'FastAPI, Django, Flask',
      desc: 'สร้างระบบเซิร์ฟเวอร์หลังบ้านที่มีความเร็วสูง ปลอดภัย และขยายตัวได้ง่าย เว็บไซต์ยักษ์ใหญ่อย่าง Instagram, Spotify และ Netflix ล้วนทำระบบแผงหลังด้วยภาษา Python',
      code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n# สร้างช่องทางเชื่อมต่อ API สำหรับผู้เล่น\n@app.get("/api/v1/player/{player_id}")\ndef get_player(player_id: int):\n    return {\n        "status": "Online",\n        "id": player_id,\n        "rank": "Grandmaster"\n    }\n\nprint("Server started on port: 8000")`,
      outputs: [
        '[Uvicorn] Running server on http://127.0.0.1:8000 (Press CTRL+C to quit)',
        '[System] OpenAPI documentation automatically generated at /docs',
        '[Router] Mapping route "/api/v1/player/{player_id}" to handler get_player...',
        'Server started on port: 8000',
        '✅ API Endpoint Ready! Servicing secure JSON requests.'
      ]
    },
    game: {
      id: 'game',
      title: 'Game Development & Graphics',
      icon: <Gamepad2 className="w-5 h-5" />,
      color: 'bg-amber-500 text-amber-600 border-amber-200',
      textColor: 'text-amber-600',
      library: 'Pygame, Godot GDScript (Pythonic syntax)',
      desc: 'แม้จะไม่ใช่ภาษาหลักที่ใช้สำหรับทำเกมสามมิติฟอร์มยักษ์ระดับพระกาฬ แต่ Python เหมาะสมที่สุดในการสอนตรรกะเกมสองมิติ และเป็นภาษาพื้นฐานของสคริปต์ในเอนจินระดับโลก',
      code: `import pygame\n\npygame.init()\nscreen = pygame.display.set_mode((400, 300))\n\n# จำลองตำแหน่งยานอวกาศเคลื่อนที่\nship_x, ship_y = 200, 150\nrunning = True\n\nprint("Pygame core engine initialized successfully.")\nprint("Ship position:", ship_x, ship_y)`,
      outputs: [
        '[Pygame] Initializing audio/video drivers...',
        '[Engine] Set hardware display window size to: 400x300',
        '[Assets] Loading player_ship.png vector graphic...",',
        'Pygame core engine initialized successfully.',
        'Ship position: 200 150',
        '✅ Graphics Frame: Rendered! Player controller active.'
      ]
    }
  };

  const activeData = categories[activeCategory];

  const triggerRun = () => {
    setIsRunning(true);
    setSimOutput([]);
    setShowVisual(false);

    // Simulate logs appearing gradually
    let currentLogs = [];
    activeData.outputs.forEach((log, index) => {
      setTimeout(() => {
        currentLogs.push(log);
        setSimOutput([...currentLogs]);
        if (index === activeData.outputs.length - 1) {
          setIsRunning(false);
          setShowVisual(true);
        }
      }, (index + 1) * 400);
    });
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSimOutput([]);
    setShowVisual(false);
    setIsRunning(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-blue-100/20 blur-[80px] pointer-events-none"></div>
      
      <div className="text-center mb-8 relative z-10">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">Ecosystem Sandbox</span>
        <h3 className="text-2xl font-bold text-slate-800">เครื่องจำลองระบบนิเวศการประยุกต์ใช้ของ Python</h3>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed">
          กดเลือกสายงานประยุกต์ใช้หลัก 4 กลุ่ม เพื่อดูความคล่องตัว โค้ดตัวอย่าง และจำลองผลลัพธ์การคอมไพล์งานจริงแบบโต้ตอบได้
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Category Selectors & Detail */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200 flex flex-col gap-1 shadow-inner">
            {Object.values(categories).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  disabled={isRunning}
                  className={`w-full p-3.5 rounded-xl text-left font-bold text-sm transition-all flex items-center gap-3 active:scale-98 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                      : 'bg-transparent text-slate-650 hover:bg-slate-100 hover:text-slate-850'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {cat.icon}
                  </span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Specification Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">กลุ่มไลบรารีและเครื่องมือที่ยอดนิยม</h4>
            <div className="flex flex-wrap gap-1.5">
              {activeData.library.split(', ').map((lib, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 font-bold rounded-lg text-xs font-mono">
                  {lib}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-2">
              {activeData.desc}
            </p>
          </div>
        </div>

        {/* Right Column: Code Studio & Terminal Preview */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Editor block */}
          <div className="bg-[#121214] rounded-2xl border border-zinc-800 overflow-hidden shadow-md flex flex-col flex-1 min-h-[260px]">
            <div className="bg-[#1e1e1e] px-4 py-3 border-b border-zinc-850 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-zinc-400">main.py</span>
              </div>
              <button
                onClick={triggerRun}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-900/30"
              >
                <Play className="w-3 h-3 fill-current" />
                {isRunning ? 'กำลังประมวลผล...' : 'รันรหัสโค้ด (Run Code)'}
              </button>
            </div>
            <div className="p-5 font-mono text-xs md:text-sm text-emerald-400 leading-relaxed flex-1 flex items-center bg-[#121214] whitespace-pre-wrap select-all">
              {activeData.code}
            </div>
          </div>

          {/* Combined Output (Terminal Console & Visual Sandbox) */}
          <div className="bg-[#121214] rounded-2xl p-5 border border-zinc-800 shadow-inner flex flex-col md:flex-row gap-5">
            {/* Console Log */}
            <div className="flex-1 font-mono text-[11px] md:text-xs leading-relaxed flex flex-col">
              <div className="text-zinc-500 border-b border-zinc-850 pb-2 mb-2 uppercase text-[10px] tracking-widest font-sans font-bold flex items-center gap-1.5 select-none">
                <Terminal className="w-4 h-4 text-blue-400" /> Terminal Console Log
              </div>
              <div className="space-y-1.5 h-36 overflow-y-auto pr-2 text-zinc-350">
                {simOutput.map((log, idx) => {
                  let isOk = log.startsWith('✅');
                  let isErr = log.includes('ERR') || log.includes('Error');
                  return (
                    <div key={idx} className={`animate-in fade-in slide-in-from-left-2 duration-200 ${isOk ? 'text-emerald-400 font-bold' : isErr ? 'text-red-400' : 'text-zinc-300'}`}>
                      {log}
                    </div>
                  );
                })}
                {simOutput.length === 0 && (
                  <div className="text-zinc-600 italic select-none">
                    [System] Waiting to compile and execute program...
                  </div>
                )}
              </div>
            </div>

            {/* Visual Screen Sandbox Output */}
            <div className="w-full md:w-56 h-48 md:h-auto bg-[#1a1a1e] rounded-xl border border-zinc-800 p-3 flex flex-col items-center justify-center text-center relative overflow-hidden shrink-0">
              <div className="absolute top-2 left-2 text-[9px] text-zinc-600 font-bold uppercase tracking-wider">Live Preview</div>
              
              {!showVisual && !isRunning && (
                <div className="text-zinc-500 text-xs flex flex-col items-center gap-2">
                  <Monitor className="w-6 h-6 text-zinc-600" />
                  <span>กดปุ่มรันเพื่อดูผลลัพธ์ภาพ</span>
                </div>
              )}

              {isRunning && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-zinc-400 text-[10px] font-mono">Executing...</span>
                </div>
              )}

              {showVisual && activeCategory === 'ai' && (
                <div className="animate-in zoom-in-95 duration-300 space-y-3 w-full flex flex-col items-center">
                  <svg className="w-20 h-16" viewBox="0 0 100 60">
                    <circle cx="20" cy="15" r="5" fill="#a855f7" className="animate-pulse" />
                    <circle cx="20" cy="45" r="5" fill="#a855f7" className="animate-pulse" />
                    <circle cx="50" cy="10" r="5" fill="#3b82f6" />
                    <circle cx="50" cy="30" r="5" fill="#3b82f6" />
                    <circle cx="50" cy="50" r="5" fill="#3b82f6" />
                    <circle cx="80" cy="30" r="5" fill="#10b981" />
                    <line x1="25" y1="15" x2="45" y2="10" stroke="#4b5563" strokeWidth="1" />
                    <line x1="25" y1="15" x2="45" y2="30" stroke="#4b5563" strokeWidth="1" />
                    <line x1="25" y1="45" x2="45" y2="30" stroke="#4b5563" strokeWidth="1" />
                    <line x1="25" y1="45" x2="45" y2="50" stroke="#4b5563" strokeWidth="1" />
                    <line x1="55" y1="10" x2="75" y2="30" stroke="#4b5563" strokeWidth="1" />
                    <line x1="55" y1="30" x2="75" y2="30" stroke="#4b5563" strokeWidth="1" />
                    <line x1="55" y1="50" x2="75" y2="30" stroke="#4b5563" strokeWidth="1" />
                  </svg>
                  <span className="text-[10px] text-purple-300 font-bold font-mono">Neural Net Active</span>
                </div>
              )}

              {showVisual && activeCategory === 'data' && (
                <div className="animate-in zoom-in-95 duration-300 w-full flex flex-col items-center justify-end h-24 pb-1">
                  <div className="flex items-end gap-2.5 h-16 w-32 border-b border-l border-zinc-700 px-2 pb-0.5">
                    <div className="w-5 bg-emerald-500 rounded-t" style={{ height: '34.28%' }}></div>
                    <div className="w-5 bg-emerald-500 rounded-t" style={{ height: '60.00%' }}></div>
                    <div className="w-5 bg-emerald-500 rounded-t" style={{ height: '51.42%' }}></div>
                    <div className="w-5 bg-emerald-500 rounded-t" style={{ height: '100.00%' }}></div>
                  </div>
                  <span className="text-[9px] text-emerald-300 font-bold mt-2 font-sans">matplotlib.pyplot</span>
                </div>
              )}

              {showVisual && activeCategory === 'web' && (
                <div className="animate-in zoom-in-95 duration-300 w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 flex flex-col">
                  <div className="flex gap-1 mb-2 bg-zinc-950 p-1 rounded items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <div className="bg-zinc-900 px-2 py-0.5 rounded text-[8px] text-zinc-500 flex-1 truncate select-none font-mono">127.0.0.1:8000</div>
                  </div>
                  <div className="text-[9px] text-left text-zinc-300 font-mono space-y-0.5 bg-zinc-950 p-1.5 rounded border border-zinc-850">
                    <div className="text-blue-400">{"{"}</div>
                    <div className="pl-2"><span className="text-amber-400">"status"</span>: <span className="text-emerald-400">"Online"</span>,</div>
                    <div className="pl-2"><span className="text-amber-400">"rank"</span>: <span className="text-emerald-400">"Grandmaster"</span></div>
                    <div className="text-blue-400">{"}"}</div>
                  </div>
                </div>
              )}

              {showVisual && activeCategory === 'game' && (
                <div className="animate-in zoom-in-95 duration-300 w-full aspect-video bg-zinc-950 rounded border border-zinc-850 p-2 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-2 w-4 h-4 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-2 w-12 h-2 bg-blue-500 rounded"></div>
                  <span className="text-[8px] text-amber-300 font-bold uppercase tracking-wider animate-pulse absolute bottom-6">Pygame Window</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. Main pyUnit1_4_PythonTimeline Component
// ==========================================
export default function pyUnit1_4_PythonTimeline() {
  const [selectedTopic, setSelectedTopic] = useState('simple');

  const topicContents = {
    simple: {
      id: 'simple',
      title: '1. อ่านง่าย เขียนง่าย (Simple & Readable)',
      desc: 'Python ได้รับการออกแบบให้โค้ดมีความคลีน สะอาดตา ไร้ปีกกา { } หรือเซมิโคลอน (;) บีบให้ผู้พัฒนาจัดวรรคย่อหน้า (Indentation) เสมือนแต่งประโยคภาษาอังกฤษ ทำให้อ่านทบทวนแก้ปัญหาได้ราบรื่นที่สุด',
      accent: 'border-blue-500 text-blue-600 bg-blue-50/20'
    },
    libraries: {
      id: 'libraries',
      title: '2. แหล่งไลบรารีมหาศาล (Rich Ecosystem)',
      desc: 'แนวคิด "Batteries Included" มีชุดเครื่องมือและส่วนขยายของระบบนิเวศ (Ecosystem) มากกว่าแสนประเภทที่พร้อมดาวน์โหลดใช้งานทันที ไม่จำเป็นต้องเขียนโค้ดเพื่อคำนวณฐานข้อมูลหรือสร้าง AI ขึ้นจากศูนย์ด้วยตนเอง',
      accent: 'border-indigo-500 text-indigo-650 bg-indigo-50/20'
    },
    crossplatform: {
      id: 'crossplatform',
      title: '3. ทำงานข้ามระบบได้ (Cross-platform)',
      desc: 'ด้วยความเป็นภาษาแบบ Interpreter โค้ด Python ที่คุณเขียนบนระบบ Windows สามารถส่งไปรันใช้งานได้ใน macOS หรือ Linux ทันทีอย่างไร้รอยต่อ โดยปราศจากการแก้ไขโครงสร้างคำสั่งแต่อย่างใด',
      accent: 'border-emerald-500 text-emerald-600 bg-emerald-50/20'
    },
    demand: {
      id: 'demand',
      title: '4. ความต้องการตลาดงานสูง (High Demand)',
      desc: 'ความอเนกประสงค์รอบด้านที่สามารถใช้ทำปัญญาประดิษฐ์ (AI), พัฒนาเว็บ (Web), จัดสถิติ (Data Science), หรือเขียนบอททำงานอัตโนมัติ ส่งผลให้โปรแกรมเมอร์ที่มีทักษะ Python มีสถิติตลาดจัดจ้างและรายรับสูงเป็นอันดับต้นๆ ของโลก',
      accent: 'border-amber-500 text-amber-600 bg-amber-50/20'
    }
  };

  const curTopic = topicContents[selectedTopic];

  const teacherTaskContent = `[โจทย์ปฏิบัติประจำบทเรียน 1.4: Python Ecosystem & Core Strengths]

โจทย์ข้อที่ 1 (วิเคราะห์เปรียบเทียบ):
จากที่นักเรียนได้เรียนรู้ข้อแตกต่างความยาวและโครงสร้างของภาษาระดับสูง
จงสังเกตข้อเปรียบเทียบรหัสโค้ดระหว่างภาษา Java และภาษา Python ในบทเรียน
แล้วสรุปจุดเด่นที่ทำให้ภาษา Python "เขียนง่ายและเรียนรู้ได้เร็วกว่า" เป็นภาษาแรกมาเป็นข้อๆ

โจทย์ข้อที่ 2 (สำรวจโลก Ecosystem):
ให้นักเรียนใช้จำลอง "Python Ecosystem Simulator" ทางด้านบน
คลิกทดลองรันโค้ดและสังเกต Output ของสายงาน AI, Data Science, Web, และ Game
จากนั้นให้นักเรียนเลือกสายงานที่สนใจที่สุด 1 สายงาน พร้อมระบุชื่อโมดูล/ไลบรารีมาตรฐานที่เป็นพระเอกของสายงานนั้นมา 2 ตัว`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-zinc-800 pb-24 relative overflow-hidden">
      
      {/* Layer 1: Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-200/20 blur-[130px] mix-blend-multiply"></div>
      </div>

      {/* Layer 2: Standardized Hero Header */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                บทเรียนหลักสูตรคอมพิวเตอร์เบื้องต้น
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                รหัสวิชา 21910-1003
              </span>
            </div>
            
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-2 uppercase">
              หน่วยที่ 1: หลักการเขียนโปรแกรมเบื้องต้น
            </h2>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              1.4 จุดเด่นของภาษา Python <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-650 to-amber-500">
                (Ecosystem and Strengths of Python)
              </span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-blue-500 pl-6 mt-4 relative">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed relative z-10">
              ภาษา Python ถูกสร้างขึ้นโดย <strong>Guido van Rossum</strong> ในปี 1991 ภายใต้ปรัชญาที่ยึดมั่นว่า <strong className="text-blue-600">"โค้ดควรอ่านเข้าใจได้ง่ายเหมือนข้อความปกติ"</strong> ร่วมเรียนรู้จุดเด่นและพลังแห่งการควบคุมอุปกรณ์และไลบรารีหลากหลายด้านล่างนี้
            </p>
          </div>
        </div>
      </header>

      {/* Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Core Strengths Section */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Core Qualities</span>
            <h3 className="text-xl font-bold text-slate-800">4 จุดเด่นครอบจักรวาลของ Python</h3>
            <p className="text-xs text-slate-500 mt-1">คลิกเลือกคุณลักษณะจุดเด่นหลักในปุ่มทางซ้าย เพื่อดูคำอธิบายและแนวคิดจำแนกเปรียบเทียบในกรอบรายละเอียด</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Buttons list (Left 5 columns) */}
            <div className="md:col-span-5 flex flex-col gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              {Object.values(topicContents).map((topic) => {
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full p-3.5 rounded-xl font-bold text-xs md:text-sm text-left transition-all active:scale-98 ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {topic.title}
                  </button>
                );
              })}
            </div>

            {/* Explanation box (Right 7 columns) */}
            <div className={`md:col-span-7 rounded-2xl border-2 p-6 transition-all duration-500 ${curTopic.accent} shadow-sm min-h-[160px] flex flex-col justify-center`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                <h4 className="font-extrabold text-slate-800 text-base">{curTopic.title}</h4>
              </div>
              <p className="text-sm text-slate-650 leading-relaxed font-sans">
                {curTopic.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Code comparison panel */}
        <div className="bg-[#121214] rounded-3xl p-6 md:p-8 shadow-2xl text-white relative overflow-hidden border border-zinc-800">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 mb-8 text-center">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">Comparison Lab</span>
            <h3 className="text-2xl font-bold">พิสูจน์ความความกระชับ: Python vs Java</h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed">
              เปรียบเทียบการเขียนโปรแกรมพิมพ์คำว่า "Hello, World!" ระหว่างสถาปัตยกรรมของ Java ที่ต้องมีโครงสร้าง Class และของ Python ที่เรียกคำสั่งตรงๆ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {/* Java Code block */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
              <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-2 border-b border-zinc-900">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-zinc-450 font-mono">Main.java</span>
              </div>
              <div className="p-5 font-mono text-xs md:text-sm leading-relaxed flex-1 flex flex-col justify-center bg-zinc-950/80 text-zinc-400">
                <div><span className="text-orange-450">public class</span> <span className="text-yellow-200">Main</span> {"{"}</div>
                <div className="pl-4"><span className="text-orange-450">public static void</span> <span className="text-blue-300">main</span>(String[] args) {"{"}</div>
                <div className="pl-8 text-zinc-300">System.out.println(<span className="text-emerald-400">"Hello, World!"</span>);</div>
                <div className="pl-4">{"}"}</div>
                <div>{"}"}</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border-t border-zinc-850 text-[10px] text-zinc-500 font-sans flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Boilerplate เยอะ, ต้องประกาศ Class
              </div>
            </div>

            {/* Python Code block */}
            <div className="bg-[#0b0f19] rounded-2xl border-2 border-blue-500/40 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <div className="bg-[#121829] px-4 py-2.5 flex justify-between items-center border-b border-blue-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-amber-400 flex items-center justify-center shrink-0 shadow-sm"></div>
                  <span className="text-xs font-bold text-blue-100 font-mono">hello.py</span>
                </div>
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Winner (1 Line)</span>
              </div>
              <div className="p-5 font-mono text-xs md:text-sm leading-relaxed flex-1 flex flex-col justify-center text-zinc-200">
                <div><span className="text-yellow-200">print</span>(<span className="text-emerald-400">"Hello, World!"</span>)</div>
              </div>
              <div className="p-3 bg-blue-950/20 border-t border-blue-500/10 text-[10px] text-blue-400 font-sans flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> สั้น กระชับ ตรงไปตรงมา เรียนรู้ได้ไวที่สุด
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <PythonEcosystemSimulator />

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask 
          title="งานที่ได้รับมอบหมาย: การสำรวจจุดเด่นและขุมพลัง Python" 
          taskText={teacherTaskContent} 
        />

      </main>

    </div>
  );
}