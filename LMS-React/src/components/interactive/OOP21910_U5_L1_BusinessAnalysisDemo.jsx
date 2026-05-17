import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, ShoppingCart, ClipboardList, ArrowRight, RotateCcw } from 'lucide-react';

export default function OOP21910_U5_L1_BusinessAnalysisDemo() {
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Business Analyst Workspace initialized.' },
    { type: 'system', text: 'Waiting for requirement analysis...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const scenario = {
    title: '☕ ร้านกาแฟ Coffee OOP',
    desc: 'ร้านกาแฟต้องการระบบ POS สำหรับรับออเดอร์และคำนวณราคา พนักงานจะใช้จอ Touch เพื่อเลือกเมนู ระบบต้องคำนวณราคารวม ออกใบเสร็จ และเก็บบันทึกยอดขาย',
  };

  const actors = [
    { id: 'cashier', name: 'พนักงานเคาน์เตอร์', icon: '🧑‍💼', correct: true },
    { id: 'customer', name: 'ลูกค้า', icon: '👤', correct: true },
    { id: 'manager', name: 'ผู้จัดการ', icon: '👔', correct: true },
    { id: 'delivery', name: 'คนส่งของ', icon: '🚚', correct: false },
  ];

  const features = [
    { id: 'menu', name: 'แสดงเมนูเครื่องดื่ม', class: 'Menu', correct: true },
    { id: 'order', name: 'รับออเดอร์', class: 'Order', correct: true },
    { id: 'calc', name: 'คำนวณราคารวม', class: 'Calculator', correct: true },
    { id: 'receipt', name: 'ออกใบเสร็จ', class: 'Receipt', correct: true },
    { id: 'game', name: 'เล่นเกมมินิ', class: 'Game', correct: false },
    { id: 'report', name: 'รายงานยอดขาย', class: 'Report', correct: true },
  ];

  const toggleActor = (id) => {
    setSelectedActors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setAnalyzed(false);
  };
  const toggleFeature = (id) => {
    setSelectedFeatures(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setAnalyzed(false);
  };

  const checkAnalysis = () => {
    setAnalyzed(true);
    const correctActors = actors.filter(a => a.correct).map(a => a.id);
    const correctFeatures = features.filter(f => f.correct).map(f => f.id);
    
    const actorsOk = correctActors.every(a => selectedActors.includes(a)) && !selectedActors.some(a => !correctActors.includes(a));
    const featuresOk = correctFeatures.every(f => selectedFeatures.includes(f)) && !selectedFeatures.some(f => !correctFeatures.includes(f));
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ analyze_requirements(actors=${selectedActors.length}, features=${selectedFeatures.length})` }
    ]);

    if (!actorsOk) {
      setConsoleHistory(prev => [...prev, { type: 'error', text: `❌ FAIL: Actor analysis is incorrect. Please re-read the scenario.` }]);
    } else {
      setConsoleHistory(prev => [...prev, { type: 'system', text: `✅ PASS: Actors correctly identified.` }]);
    }

    if (!featuresOk) {
      setConsoleHistory(prev => [...prev, { type: 'error', text: `❌ FAIL: Feature analysis is incorrect. Please select only required features.` }]);
    } else {
      setConsoleHistory(prev => [...prev, { type: 'system', text: `✅ PASS: Features correctly identified.` }]);
    }

    if (actorsOk && featuresOk) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'output', text: `==============================================================` },
        { type: 'output', text: `🎉 SUCCESS: System Requirements Document (SRD) Approved.` },
        { type: 'output', text: `Ready to proceed to Class Design phase.` }
      ]);
    }
  };

  const clear = () => {
    setSelectedActors([]);
    setSelectedFeatures([]);
    setAnalyzed(false);
    setConsoleHistory([
      { type: 'system', text: 'Workspace reset. Ready for analysis.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Briefcase size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">วิเคราะห์ความต้องการของระบบ (Requirement Analysis)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ขั้นตอนแรกสุดของการทำโปรเจกต์คือ <strong>การอ่านโจทย์ธุรกิจ</strong> เพื่อระบุผู้ใช้งาน (Actors) และความสามารถหลักที่ระบบต้องมี (Features)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Analysis Form */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Actors Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Users size={18} className="text-blue-500" /> เลือก Actor (ผู้ใช้งาน)
                </h4>
                <div className="space-y-2">
                  {actors.map(a => {
                    const isSelected = selectedActors.includes(a.id);
                    const showFeedback = analyzed;
                    let borderClass = isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300 bg-white';
                    
                    if (showFeedback) {
                      if (isSelected && a.correct) borderClass = 'border-emerald-500 bg-emerald-50';
                      if (isSelected && !a.correct) borderClass = 'border-red-500 bg-red-50';
                      if (!isSelected && a.correct) borderClass = 'border-orange-400 bg-orange-50 border-dashed';
                    }

                    return (
                      <button key={a.id} onClick={() => toggleActor(a.id)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 shadow-sm ${borderClass}`}>
                        <span className="text-2xl">{a.icon}</span>
                        <span className="font-semibold text-slate-700 text-sm flex-1">{a.name}</span>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ClipboardList size={18} className="text-emerald-500" /> เลือก Feature (ฟังก์ชัน)
                </h4>
                <div className="space-y-2">
                  {features.map(f => {
                    const isSelected = selectedFeatures.includes(f.id);
                    const showFeedback = analyzed;
                    let borderClass = isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300 bg-white';
                    
                    if (showFeedback) {
                      if (isSelected && f.correct) borderClass = 'border-emerald-500 bg-emerald-50';
                      if (isSelected && !f.correct) borderClass = 'border-red-500 bg-red-50';
                      if (!isSelected && f.correct) borderClass = 'border-orange-400 bg-orange-50 border-dashed';
                    }

                    return (
                      <button key={f.id} onClick={() => toggleFeature(f.id)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 shadow-sm ${borderClass}`}>
                        <span className="font-semibold text-slate-700 text-sm flex-1">{f.name}</span>
                        {isSelected && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">{f.class}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={checkAnalysis} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">
                ตรวจคำตอบ <ArrowRight size={18} />
              </button>
              <button onClick={clear} className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center shadow-sm">
                <RotateCcw size={18} />
              </button>
            </div>

          </div>

          {/* Right: Info / Scenario */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">โจทย์ธุรกิจ (Business Scenario)</h4>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 shadow-sm">
              <h4 className="text-base font-bold text-amber-900 mb-3 pb-2 border-b border-amber-200/50">{scenario.title}</h4>
              <p className="text-sm text-amber-800/90 leading-relaxed indent-4">{scenario.desc}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1">
              <h5 className="font-bold text-slate-700 text-sm mb-2">💡 ทริคการวิเคราะห์</h5>
              <ul className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span><strong>Actor</strong> คือ คนหรือระบบภายนอกที่มีส่วนเกี่ยวข้องกับโปรแกรมนี้โดยตรง</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Feature</strong> คือ สิ่งที่โปรแกรมต้องทำได้ (Requirement) มักจะกลายมาเป็น Class หรือ Method ในขั้นตอนต่อไป</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Analysis Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-emerald-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-600 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
