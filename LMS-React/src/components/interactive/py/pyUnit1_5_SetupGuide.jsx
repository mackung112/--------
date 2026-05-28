import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  DownloadCloud, 
  TerminalSquare, 
  CheckSquare, 
  Square,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Box,
  MonitorDown
} from 'lucide-react';

const InstallerSimulator = () => {
  const [step, setStep] = useState(0);
  const [addToPath, setAddToPath] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInstall = () => {
    setIsInstalling(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsInstalling(false);
          setStep(2);
        }, 500);
      }
    }, 500);
  };

  const resetSim = () => {
    setStep(0);
    setAddToPath(false);
    setProgress(0);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4 shadow-sm">
          <DownloadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-2">
          Simulator: การติดตั้ง Python
        </h3>
        <p className="text-slate-500 text-lg">
          ทดลองติดตั้งผ่านหน้าต่างจำลอง เพื่อเรียนรู้จุดที่มักผิดพลาดบ่อยที่สุด!
        </p>
      </div>

      <div className="relative z-10 flex justify-center">
        {/* Fake Windows Installer */}
        <div className="w-full max-w-2xl bg-slate-50 rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col">
          
          {/* Window Header */}
          <div className="bg-white border-b border-slate-300 px-4 py-2 flex justify-between items-center select-none">
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded-sm inline-block"></span>
              Python 3.x.x (64-bit) Setup
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-sm border border-slate-400"></div>
              <div className="w-3 h-3 rounded-sm border border-slate-400"></div>
              <div className="w-3 h-3 rounded-sm border border-slate-400 bg-red-500"></div>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-8 flex-grow bg-slate-50 min-h-[300px] flex flex-col">
            
            {step === 0 && (
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-slate-800 mb-6">Install Python 3.x.x (64-bit)</h4>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 p-4 bg-white border-2 border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Install Now</div>
                      <div className="text-sm text-slate-500">C:\Users\Student\AppData\Local\Programs\Python\Python3x</div>
                      <div className="text-sm text-slate-500 mt-1">Includes IDLE, pip and documentation</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-slate-100/50 border border-slate-200 rounded-lg opacity-60">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full border border-slate-400"></div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-600">Customize installation</div>
                      <div className="text-sm text-slate-500">Choose location and features</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer group mb-2">
                    <div className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center opacity-50">
                      <CheckSquare className="w-4 h-4 text-slate-800" />
                    </div>
                    <span className="text-sm text-slate-600">Install launcher for all users (recommended)</span>
                  </label>
                  
                  {/* CRITICAL CHECKBOX */}
                  <label 
                    className="flex items-center gap-3 cursor-pointer group relative"
                    onClick={() => setAddToPath(!addToPath)}
                  >
                    <div className={`w-5 h-5 rounded border ${addToPath ? 'border-emerald-500 bg-emerald-500' : 'border-red-400 bg-red-50'} flex items-center justify-center transition-colors`}>
                      {addToPath && <CheckSquare className="w-4 h-4 text-white absolute" />}
                      {!addToPath && <Square className="w-4 h-4 text-red-500 absolute" />}
                    </div>
                    <span className={`text-sm font-bold ${addToPath ? 'text-emerald-700' : 'text-red-600'} transition-colors`}>
                      Add Python 3.x to PATH
                    </span>
                    {!addToPath && (
                      <span className="absolute left-8 -bottom-6 text-xs text-red-500 font-bold animate-pulse">
                        ↑ จุดนี้ห้ามลืมติ๊กเด็ดขาด!
                      </span>
                    )}
                  </label>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col items-center justify-center flex-grow">
                <h4 className="text-xl font-bold text-slate-800 mb-6 w-full text-left">Setup Progress</h4>
                <div className="w-full mb-2 flex justify-between text-sm text-slate-500">
                  <span>Installing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-8">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="w-full text-left text-xs text-slate-400 font-mono">
                  Extracting: python3.dll...
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col flex-grow text-left">
                <h4 className="text-2xl font-bold text-slate-800 mb-4">Setup was successful</h4>
                <p className="text-slate-600 mb-6 text-sm">
                  Special thanks to Mark Hammond, without whose years of freely shared Windows expertise, Python for Windows would still be Python for DOS.
                </p>
                
                {addToPath ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-emerald-800">ยอดเยี่ยมมาก!</h5>
                      <p className="text-sm text-emerald-600 mt-1">คุณได้ติ๊ก Add to PATH เรียบร้อยแล้ว ตอนนี้คุณสามารถพิมพ์คำสั่ง <code>python</code> ในหน้าต่าง Command Prompt ได้เลย</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-red-800">เกิดข้อผิดพลาดในการใช้งานจริง!</h5>
                      <p className="text-sm text-red-600 mt-1">คุณลืมติ๊กช่อง "Add Python to PATH" เมื่อเปิด Command Prompt แล้วพิมพ์ <code>python</code> เครื่องจะฟ้องว่า "python is not recognized"</p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Window Footer */}
          <div className="bg-slate-100 border-t border-slate-300 p-4 flex justify-end gap-3">
            {step === 0 && (
              <button 
                onClick={handleInstall}
                className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 font-medium"
              >
                Install Now
              </button>
            )}
            {step === 1 && (
              <button disabled className="px-6 py-2 bg-slate-300 text-slate-500 rounded font-medium cursor-not-allowed">
                Cancel
              </button>
            )}
            {step === 2 && (
              <button 
                onClick={resetSim}
                className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 font-medium"
              >
                Close (Try Again)
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default function pyUnit1_5_SetupGuide() {
  const teacherTaskContent = `คำถามทบทวนความเข้าใจ (1.5):
1. ทำไมขั้นตอนการติดตั้ง Python จึงต้องเน้นย้ำให้ผู้ใช้งานติ๊กช่อง "Add Python to PATH"?
2. หากนักเรียนลืมติ๊กช่อง Add to PATH ไปแล้ว จะเกิดผลเสียอย่างไรเมื่อเรียกใช้งานผ่าน Command Prompt?
3. IDE ย่อมาจากอะไร? และมีความสำคัญอย่างไรต่อการเขียนโปรแกรมเมื่อเทียบกับการเขียนใน Notepad ธรรมดา?
4. ให้นักเรียนยกตัวอย่างโปรแกรม IDE ที่ได้รับความนิยมในปัจจุบันมาอย่างน้อย 2 โปรแกรม`;

  return (
    <div className="font-sans text-slate-800 relative pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-emerald-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[0%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section removed (Handled by LessonViewer) */}

        {/* 1.5.1 Python Installation & Simulator */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Box className="w-6 h-6" />
            </div>
            <div>

              <h3 className="text-2xl font-bold text-slate-800">การติดตั้งตัวแปลภาษา Python</h3>
            </div>
          </div>
          <p className="text-slate-600 leading-loose text-lg mb-8 max-w-4xl">
            ก่อนที่เราจะเขียนภาษา Python ได้ คอมพิวเตอร์ต้องมี <strong>"ตัวแปลภาษา (Interpreter)"</strong> ติดตั้งอยู่ในเครื่องก่อน ซึ่งสามารถดาวน์โหลดได้ฟรีจากเว็บไซต์หลัก <code>python.org</code>
          </p>

          <InstallerSimulator />
        </div>

        {/* 1.5.2 IDE Overview */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <TerminalSquare className="w-6 h-6" />
            </div>
            <div>

              <h3 className="text-2xl font-bold text-slate-800">โปรแกรมสำหรับเขียนโค้ด (IDE)</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[2.5rem] p-10 border border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-white">
                <h4 className="text-2xl font-bold mb-4">IDE คืออะไร?</h4>
                <p className="text-slate-300 leading-loose mb-6">
                  <strong>IDE (Integrated Development Environment)</strong> คือโปรแกรมสำเร็จรูปที่รวมเครื่องมืออำนวยความสะดวกทุกอย่างสำหรับโปรแกรมเมอร์ไว้ในที่เดียว 
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">มีสีสันแยกคำสั่งให้ดูง่าย (Syntax Highlighting)</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">ระบบช่วยพิมพ์และเติมโค้ดอัตโนมัติ (Auto-complete)</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">ระบบช่วยหาจุดผิดพลาด (Debugger)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" /> IDE ยอดนิยมสำหรับ Python
                </h4>
                
                <div className="space-y-4">
                  <div className="p-5 border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-2xl">VS</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg mb-1">Visual Studio Code (VS Code)</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">ได้รับความนิยมสูงสุดในปัจจุบัน ฟรี น้ำหนักเบา และสามารถติดตั้งส่วนขยาย (Extensions) เพิ่มเติมได้มหาศาล</p>
                    </div>
                  </div>

                  <div className="p-5 border border-slate-200 rounded-2xl hover:border-green-400 hover:shadow-md transition-all flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-green-500">
                      <span className="text-green-500 font-bold text-xl">PC</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg mb-1">PyCharm</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">IDE ที่สร้างมาเพื่อ Python โดยเฉพาะ ทรงพลังมาก เหมาะสำหรับโปรเจกต์ขนาดใหญ่ (มีทั้งรุ่นฟรีและเสียเงิน)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 1.5)" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
