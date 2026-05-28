import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  FileCode2, 
  Settings, 
  FileBox, 
  Play, 
  RefreshCw,
  Cpu,
  MonitorPlay,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight
} from 'lucide-react';

const TranslatorSimulator = () => {
  const [activeTab, setActiveTab] = useState('compiler');
  const [executionState, setExecutionState] = useState('idle'); // idle, translating, executing, done, error
  const [currentLine, setCurrentLine] = useState(0);
  
  // Fake code with error on line 3
  const codeLines = [
    "int x = 10;",
    "int y = 20;",
    "print(x + z); // Error: z not defined",
    "print(\"Done\");"
  ];

  const resetSim = () => {
    setExecutionState('idle');
    setCurrentLine(0);
  };

  useEffect(() => {
    let timer;
    if (executionState === 'translating' && activeTab === 'compiler') {
      // Compiler process: scan all lines fast, fail if error found
      timer = setTimeout(() => {
        setExecutionState('error'); // fails during compile time
        setCurrentLine(2); // shows error at line 3
      }, 1500);
    } else if (executionState === 'translating' && activeTab === 'interpreter') {
      // Interpreter process: translates and executes line by line
      if (currentLine < codeLines.length) {
        timer = setTimeout(() => {
          if (currentLine === 2) {
            setExecutionState('error'); // fails at runtime
          } else {
            setCurrentLine(prev => prev + 1);
          }
        }, 1000);
      } else {
        setExecutionState('done');
      }
    }
    return () => clearTimeout(timer);
  }, [executionState, currentLine, activeTab]);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-fuchsia-100 text-fuchsia-600 rounded-2xl mb-4 shadow-sm">
          <Settings className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-2">
          Simulator: เปรียบเทียบการแปลภาษา
        </h3>
        <p className="text-slate-500 text-lg">
          จำลองการทำงานเมื่อพบข้อผิดพลาด (Error) ในโค้ด
        </p>
      </div>

      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-2xl inline-flex shadow-inner">
          <button
            onClick={() => { setActiveTab('compiler'); resetSim(); }}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'compiler' 
                ? 'bg-white text-fuchsia-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Compiler (คอมไพเลอร์)
          </button>
          <button
            onClick={() => { setActiveTab('interpreter'); resetSim(); }}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'interpreter' 
                ? 'bg-white text-orange-500 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Interpreter (อินเทอร์พรีเตอร์)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Code Editor Side */}
        <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-xl border border-slate-700 flex flex-col">
          <div className="bg-[#020617] px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-slate-400 font-mono text-xs flex items-center gap-2">
              <FileCode2 className="w-4 h-4" /> source_code.txt
            </span>
          </div>
          <div className="p-6 font-mono text-sm flex-grow">
            {codeLines.map((line, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 py-1 px-2 rounded-lg transition-colors ${
                  activeTab === 'compiler' && executionState === 'translating' ? 'bg-fuchsia-500/20' : 
                  activeTab === 'interpreter' && currentLine === idx && executionState === 'translating' ? 'bg-orange-500/30 border-l-2 border-orange-500' : 
                  executionState === 'error' && idx === 2 ? 'bg-red-500/20 border-l-2 border-red-500' : 'text-slate-300'
                }`}
              >
                <span className="text-slate-600 select-none">{idx + 1}</span>
                <span className={`${executionState === 'error' && idx === 2 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Engine Side */}
        <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="flex-grow flex flex-col items-center justify-center w-full">
            {activeTab === 'compiler' ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <FileCode2 className="w-12 h-12 text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-500">Source Code</span>
                  </div>
                  <ArrowRight className={`w-6 h-6 ${executionState === 'translating' ? 'text-fuchsia-500 animate-pulse' : 'text-slate-200'}`} />
                  <div className="relative">
                    <Settings className={`w-16 h-16 ${executionState === 'translating' ? 'text-fuchsia-500 animate-spin' : 'text-slate-300'}`} />
                    {executionState === 'error' && <XCircle className="w-8 h-8 text-red-500 absolute -top-2 -right-2 bg-white rounded-full" />}
                  </div>
                  <ArrowRight className={`w-6 h-6 ${executionState === 'done' ? 'text-emerald-500' : 'text-slate-200'}`} />
                  <div className="flex flex-col items-center">
                    <FileBox className={`w-12 h-12 ${executionState === 'done' ? 'text-emerald-500' : 'text-slate-200'} mb-2`} />
                    <span className={`text-sm font-bold ${executionState === 'done' ? 'text-emerald-600' : 'text-slate-400'}`}>Executable</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left mb-6">
                  <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> ลักษณะของ Compiler
                  </h5>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>1. อ่านโค้ด <span className="font-bold text-fuchsia-600">รวดเดียวทั้งหมด</span></li>
                    <li>2. ถ้าเจอ Error แม้แต่จุดเดียว จะแปลไม่ผ่านเลย</li>
                    <li>3. ถ้าผ่าน จะได้ไฟล์ <code>.exe</code> เอาไปรันกี่รอบก็ได้ (เร็วกว่า)</li>
                  </ul>
                </div>

                {executionState === 'error' && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200 animate-bounce">
                    ❌ Compile Error: แปลไม่ผ่าน! ไม่ได้ไฟล์โปรแกรม เนื่องจากบรรทัดที่ 3 ผิดพลาด
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center w-full">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex flex-col items-center">
                    <FileCode2 className="w-10 h-10 text-slate-400 mb-2" />
                  </div>
                  <ArrowRight className={`w-6 h-6 ${executionState === 'translating' ? 'text-orange-500 animate-pulse' : 'text-slate-200'}`} />
                  <div className="relative bg-orange-50 p-4 rounded-full border-2 border-orange-200">
                    <RefreshCw className={`w-10 h-10 ${executionState === 'translating' ? 'text-orange-500 animate-spin' : 'text-slate-300'}`} />
                  </div>
                  <ArrowRight className={`w-6 h-6 ${executionState === 'translating' ? 'text-orange-500 animate-pulse' : 'text-slate-200'}`} />
                  <div className="flex flex-col items-center">
                    <MonitorPlay className={`w-10 h-10 ${executionState === 'translating' || executionState === 'done' ? 'text-emerald-500' : 'text-slate-200'} mb-2`} />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left mb-6">
                  <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> ลักษณะของ Interpreter
                  </h5>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>1. อ่านและแปลทีละบรรทัด <span className="font-bold text-orange-600">แปลเสร็จรันเลย</span></li>
                    <li>2. โค้ดบรรทัดก่อนหน้า (ที่ถูก) จะทำงานไปแล้ว</li>
                    <li>3. โปรแกรมจะหยุดทำงาน (Crash) ทันทีที่เจอบรรทัดที่ Error</li>
                  </ul>
                </div>

                {/* Console Output for Interpreter */}
                <div className="bg-[#0f172a] rounded-xl p-4 text-left font-mono text-sm w-full h-32 border border-slate-700 shadow-inner overflow-y-auto">
                  <div className="text-slate-500 mb-2">Terminal Output:</div>
                  {currentLine > 0 && <div className="text-white">x is defined.</div>}
                  {currentLine > 1 && <div className="text-white">y is defined.</div>}
                  {executionState === 'error' && (
                    <div className="text-red-400 mt-2">
                      RuntimeError at line 3: name 'z' is not defined.<br/>
                      <span className="text-red-500 font-bold">Process terminated.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full mt-6">
            {executionState === 'idle' || executionState === 'done' || executionState === 'error' ? (
              <button 
                onClick={() => setExecutionState('translating')}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'compiler' ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                {executionState === 'idle' ? 'เริ่มแปลภาษาและทำงาน' : 'เริ่มทดสอบใหม่อีกครั้ง'}
              </button>
            ) : (
              <button disabled className="w-full py-4 rounded-xl font-bold text-white bg-slate-300 cursor-not-allowed flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                กำลังทำงาน...
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default function pyUnit1_3_TranslatorCompare() {
  const teacherTaskContent = `คำถามทบทวนความเข้าใจ (1.3):
1. จงสรุปความแตกต่างหลักๆ ระหว่าง Compiler และ Interpreter มาอย่างน้อย 2 ข้อ
2. ทำไมโปรแกรมที่แปลด้วย Compiler จึงมักจะทำงานเร็วกว่าโปรแกรมที่แปลด้วย Interpreter?
3. ภาษา Python ใช้ตัวแปลภาษาประเภทใดในการทำงาน และมีกระบวนการแปลอย่างไรให้คอมพิวเตอร์เข้าใจ?
4. หากนักเรียนต้องการเขียนโปรแกรมที่เน้นให้คนอื่นนำไปใช้งานได้ทันทีโดยไม่ต้องเปิดดูโค้ดต้นฉบับ ควรเลือกใช้ตัวแปลภาษาแบบใด?`;

  return (
    <div className="font-sans text-slate-800 relative pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[0%] w-[500px] h-[500px] rounded-full bg-fuchsia-100/30 blur-[120px]"></div>
        <div className="absolute top-[50%] right-[0%] w-[400px] h-[400px] rounded-full bg-orange-50/50 blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section removed (Handled by LessonViewer) */}

        {/* 1.3.1 & 1.3.2 Concept Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Interpreter Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl shadow-sm">
                  <RefreshCw className="w-7 h-7" />
                </div>
                <div>

                  <h3 className="text-2xl font-bold text-slate-800">อินเทอร์พรีเตอร์ (Interpreter)</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    หลักการทำงาน
                  </h4>
                  <p className="text-slate-600 leading-loose">
                    อ่านและแปลโค้ด <strong>"ทีละบรรทัด"</strong> เมื่อแปลบรรทัดแรกเสร็จก็จะรันคำสั่งนั้นทันที แล้วค่อยไปแปลบรรทัดต่อไป หากพบข้อผิดพลาด โปรแกรมจะหยุดทำงานที่บรรทัดนั้นทันที
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <div className="font-bold text-emerald-600 flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> ข้อดี
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">ค้นหาข้อผิดพลาด (Debug) ง่าย เพราะรู้ว่าหยุดที่บรรทัดไหน และไม่ต้องเสียเวลารอแปลไฟล์ทั้งก้อน</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <div className="font-bold text-red-600 flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" /> ข้อเสีย
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">ทำงานช้ากว่าแบบคอมไพเลอร์ เพราะต้องแปลไปทำไปตลอดเวลา</p>
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-500 border border-slate-100 font-medium">
                  ภาษาที่ใช้: Python, JavaScript, PHP, Ruby
                </div>
              </div>
            </div>
          </div>

          {/* Compiler Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-fuchsia-100 text-fuchsia-600 rounded-2xl shadow-sm">
                  <Settings className="w-7 h-7" />
                </div>
                <div>

                  <h3 className="text-2xl font-bold text-slate-800">คอมไพเลอร์ (Compiler)</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span>
                    หลักการทำงาน
                  </h4>
                  <p className="text-slate-600 leading-loose">
                    อ่านและแปลโค้ด <strong>"รวดเดียวทั้งไฟล์"</strong> ให้กลายเป็นภาษาเครื่อง (เช่นไฟล์ .exe) ก่อน หากเจอข้อผิดพลาดแม้แต่จุดเดียว จะแปลไม่ผ่านและไม่ได้โปรแกรมออกมา
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <div className="font-bold text-emerald-600 flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> ข้อดี
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">โปรแกรมที่ได้จะทำงานเร็วมาก และสามารถปกปิดซอร์สโค้ดไม่ให้คนอื่นเห็นได้</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <div className="font-bold text-red-600 flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" /> ข้อเสีย
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">การแก้ไขข้อผิดพลาด (Debug) ทำได้ยากกว่า และต้องรอเวลาในการคอมไพล์ใหม่ทุกครั้งที่แก้โค้ด</p>
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-500 border border-slate-100 font-medium">
                  ภาษาที่ใช้: C, C++, Java, Go
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 1.3.4 Visual Simulator */}
        <TranslatorSimulator />

        {/* 1.3.3 How Python Works (Hybrid) */}
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-[2.5rem] p-10 md:p-14 border border-slate-700 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              ตัวอย่างการแปลภาษาของ Python (ลูกผสม)
            </h3>
            <p className="text-slate-300 leading-loose max-w-4xl mx-auto mb-10 text-lg">
              หลายคนเข้าใจว่า Python เป็นแค่ Interpreter แต่ความจริงแล้วเบื้องหลัง <strong>Python มีการทำงานของทั้ง Compiler และ Interpreter ผสมกัน (Hybrid)!</strong>
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-left">
              
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-full md:w-1/3 relative z-10">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="text-white font-bold text-xl mb-2">เขียนโค้ด (Source)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  เราเขียนโค้ดภาษา Python แล้วบันทึกเป็นไฟล์ <code>.py</code> ซึ่งมนุษย์สามารถอ่านเข้าใจได้
                </p>
              </div>

              <ArrowRight className="w-8 h-8 text-slate-500 hidden md:block flex-shrink-0" />

              {/* Step 2 */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 w-full md:w-1/3 relative z-10 transform md:-translate-y-4 shadow-xl">
                <div className="w-10 h-10 bg-indigo-500/40 text-indigo-300 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="text-indigo-200 font-bold text-xl mb-2">คอมไพล์ (Compile)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Python จะ <strong>แอบแปลง</strong> โค้ด .py ให้กลายเป็นไฟล์ระดับกลางที่เรียกว่า Bytecode (<code>.pyc</code>) โดยอัตโนมัติ เพื่อให้ทำงานเร็วขึ้นในครั้งต่อไป
                </p>
              </div>

              <ArrowRight className="w-8 h-8 text-slate-500 hidden md:block flex-shrink-0" />

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-full md:w-1/3 relative z-10">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="text-white font-bold text-xl mb-2">รัน (Interpret)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ตัว PVM (Python Virtual Machine) จะทำหน้าที่เป็น <strong>Interpreter</strong> อ่านไฟล์ Bytecode แล้วแปลเป็นภาษาเครื่องทีละบรรทัด เพื่อสั่งให้ CPU ทำงาน
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 1.3)" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
