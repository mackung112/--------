import React, { useState } from 'react';
import { MousePointerClick, CheckCircle2, XCircle, AlertCircle, RotateCcw, TerminalSquare } from 'lucide-react';

export default function SQLSyntaxEngine({ title, icon: Icon, description, codeParts, explanations, quiz }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [qa, setQa] = useState(null);
  const [qc, setQc] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const st = (m, t) => {
    setToast({ show: true, message: m, type: t });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="space-y-12 my-8">
      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
          <Icon size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
        </div>
      </div>

      {/* Syntax Explainer */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4 flex items-center gap-2">
          <TerminalSquare className="text-indigo-600" /> โครงสร้างและไวยากรณ์ (Syntax)
        </h3>
        <p className="text-slate-600">เอาเมาส์ชี้หรือคลิกที่โค้ดแต่ละส่วนเพื่อดูคำอธิบายอย่างละเอียด</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg font-mono text-lg md:text-xl text-white leading-loose overflow-x-auto">
            {codeParts.map((part, i) => {
              if (part.key && explanations[part.key]) {
                const isActive = activeTooltip === part.key;
                const color = explanations[part.key].color || 'text-yellow-300';
                return (
                  <span 
                    key={i}
                    onMouseEnter={() => setActiveTooltip(part.key)}
                    onClick={() => setActiveTooltip(part.key)}
                    className={`cursor-pointer border-b-2 border-dashed transition-all px-1 mx-0.5 ${isActive ? 'border-yellow-300 bg-yellow-300/20 rounded' : 'border-slate-500'} ${color}`}
                  >
                    {part.text}
                  </span>
                );
              }
              return <span key={i} className={part.className || 'text-slate-300'} dangerouslySetInnerHTML={{__html: part.text}} />;
            })}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[200px] flex items-center justify-center">
            {activeTooltip && explanations[activeTooltip] ? (
              <div className="w-full text-left animate-in fade-in duration-300">
                  <h4 className={`text-xl font-bold ${explanations[activeTooltip].color || 'text-indigo-600'} mb-3 border-b pb-3 flex items-center gap-2`}>
                    <Icon size={20}/> {explanations[activeTooltip].title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-lg">{explanations[activeTooltip].desc}</p>
              </div>
            ) : (
              <div className="text-center text-slate-500 flex flex-col items-center">
                  <MousePointerClick className="w-10 h-10 mb-4 text-slate-300 animate-bounce" />
                  <span className="text-lg">ชี้หรือคลิกที่ส่วนต่างๆ ของโค้ด<br/>เพื่อดูความหมาย</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200 text-lg">{quiz.q}</p>
        <div className="space-y-3 my-6">
          {quiz.opts.map(o => (
            <button 
              key={o.val} 
              onClick={() => { if (!qc) setQa(o.val) }} 
              className={`w-full text-left p-5 rounded-xl border-2 font-semibold transition-all text-lg ${
                qc && o.correct ? 'border-emerald-500 bg-emerald-900/40 text-emerald-300' : 
                qc && qa === o.val && !o.correct ? 'border-red-500 bg-red-900/30 text-red-300' : 
                qa === o.val ? 'border-indigo-500 bg-indigo-900/50 text-white shadow-lg' : 
                'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQa(null); setQc(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <RotateCcw size={18}/> เริ่มใหม่
          </button>
          <button 
            onClick={() => { 
              if (!qa) { st('เลือกคำตอบก่อนนะครับ', 'warning'); return; }
              setQc(true); 
              const isCorrect = quiz.opts.find(o=>o.val===qa)?.correct;
              st(isCorrect ? 'ยอดเยี่ยม! ถูกต้องครับ' : 'ยังไม่ถูกครับ ลองทบทวนดูใหม่นะ', isCorrect ? 'success' : 'error');
            }} 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-lg"
          >
            ตรวจคำตอบ
          </button>
        </div>
      </section>

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : 
          toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500"/>}
          {toast.type === 'error' && <XCircle className="text-red-500"/>}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500"/>}
          <div className="font-medium text-lg">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
