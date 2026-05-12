import React, { useState } from 'react';
import { Settings, Check, ChevronRight, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick, Lightbulb } from 'lucide-react';

export default function InterpreterSetupDemo() {
  const [step, setStep] = useState(0);
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const interpreters = [
    { id: 'py312', label: "Python 3.12.4 64-bit", path: "C:\\Python312\\python.exe", recommended: true },
    { id: 'py311', label: "Python 3.11.9 64-bit", path: "C:\\Python311\\python.exe", recommended: false },
    { id: 'venv', label: "Python 3.12.4 ('venv')", path: ".\\venv\\Scripts\\python.exe", recommended: false },
  ];

  const [activeTooltip, setActiveTooltip] = useState(null);
  const explanations = {
    'interpreter': { title: 'Interpreter คืออะไร?', desc: 'ตัวแปลภาษา Python ที่จะใช้รันโค้ดของเรา เครื่องหนึ่งอาจมีหลายเวอร์ชัน เราต้องบอก VS Code ว่าจะใช้ตัวไหน', color: 'text-blue-600' },
    'command-palette': { title: 'Command Palette', desc: 'เมนูลัดที่สำคัญที่สุดใน VS Code กด Ctrl+Shift+P เพื่อเปิด แล้วพิมพ์ "Python: Select Interpreter" เพื่อเลือก Interpreter', color: 'text-purple-600' },
    'venv': { title: 'Virtual Environment (venv)', desc: 'สภาพแวดล้อมจำลองที่แยกไลบรารีของแต่ละโปรเจกต์ออกจากกัน ป้องกันไลบรารีชนกันระหว่างโปรเจกต์', color: 'text-emerald-600' },
  };

  const showToast = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Quiz
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  return (
    <div className="space-y-12 my-8">
      {/* 1. Interpreter Setup Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5 flex items-center gap-3">
          <Settings size={24} />
          <h3 className="font-bold text-lg">จำลองการตั้งค่า Python Interpreter</h3>
        </div>

        <div className="p-6">
          {/* Step 1: Command Palette */}
          {step === 0 && (
            <div className="text-center space-y-6">
              <div className="bg-slate-800 rounded-xl p-6 inline-block shadow-lg mx-auto">
                <div className="text-slate-400 text-sm mb-3">กดปุ่มลัดเพื่อเปิด Command Palette</div>
                <div className="flex items-center justify-center gap-2">
                  {['Ctrl', 'Shift', 'P'].map((key, i) => (
                    <React.Fragment key={key}>
                      <div className="bg-slate-700 text-white px-4 py-2 rounded-lg font-mono font-bold shadow border border-slate-600">{key}</div>
                      {i < 2 && <span className="text-slate-500">+</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2 mx-auto">
                เปิด Command Palette <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Search */}
          {step === 1 && (
            <div className="max-w-lg mx-auto space-y-4">
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
                <div className="p-3 border-b border-slate-700">
                  <div className="bg-slate-700 rounded-lg px-4 py-2 text-sm font-mono text-yellow-300 flex items-center gap-2">
                    <span className="text-slate-500">{">"}</span>
                    Python: Select Interpreter
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full p-3 text-left text-slate-300 text-sm hover:bg-slate-700 transition-colors flex items-center gap-2">
                  <Settings size={14} className="text-amber-400" />
                  Python: Select Interpreter — เลือกตัวแปลภาษา Python
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm">คลิกที่รายการด้านบนเพื่อดำเนินการต่อ</p>
            </div>
          )}

          {/* Step 3: Select Interpreter */}
          {step === 2 && (
            <div className="max-w-lg mx-auto space-y-4">
              <h4 className="text-lg font-bold text-slate-700 text-center mb-2">เลือก Python Interpreter</h4>
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg divide-y divide-slate-700">
                {interpreters.map(interp => (
                  <button key={interp.id} onClick={() => { setSelectedInterpreter(interp.id); setStep(3); showToast(`ตั้งค่า Interpreter เป็น ${interp.label} เรียบร้อยแล้ว`, 'success'); }}
                    className="w-full p-4 text-left hover:bg-slate-700 transition-colors flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 font-bold text-sm">🐍</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm flex items-center gap-2">
                        {interp.label}
                        {interp.recommended && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">แนะนำ</span>}
                      </div>
                      <div className="text-slate-500 text-xs font-mono">{interp.path}</div>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-emerald-700">ตั้งค่า Interpreter สำเร็จ!</h4>
              <p className="text-slate-600">VS Code จะใช้ <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-600 font-mono text-sm">{interpreters.find(i => i.id === selectedInterpreter)?.label}</code> ในการรัน Python</p>
              <button onClick={() => { setStep(0); setSelectedInterpreter(null); }}
                className="text-indigo-600 hover:text-indigo-800 underline text-sm flex items-center gap-1 mx-auto">
                <RotateCcw size={14} /> ลองใหม่อีกครั้ง
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">คำศัพท์สำคัญ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(explanations).map(([key, info]) => (
            <div key={key} onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${activeTooltip === key ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
              <h4 className={`font-bold ${info.color} mb-2`}>{info.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ทำไมเราถึงต้องเลือก Python Interpreter ใน VS Code?</p>

        <div className="space-y-3 my-6">
          {[
            { val: 'multi', label: 'เพราะเครื่องอาจมี Python หลายเวอร์ชัน ต้องบอก VS Code ว่าจะใช้ตัวไหน', correct: true },
            { val: 'speed', label: 'เพื่อทำให้โปรแกรมรันเร็วขึ้น' },
            { val: 'color', label: 'เพื่อเปลี่ยนสี Theme ของ VS Code' },
            { val: 'font', label: 'เพื่อเปลี่ยนฟอนต์ในการเขียนโค้ด' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' :
                quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' :
                quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' :
                'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}>{opt.label}</button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => {
            if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; }
            setQuizChecked(true);
            showToast(quizAnswer === 'multi' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง: เหตุผลหลักคือเครื่องอาจมี Python หลายเวอร์ชัน', quizAnswer === 'multi' ? 'success' : 'error');
          }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
