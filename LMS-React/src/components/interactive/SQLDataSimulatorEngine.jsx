import React, { useState } from 'react';
import { Database, Play, CheckCircle2, XCircle, AlertCircle, RotateCcw, Table2 } from 'lucide-react';

export default function SQLDataSimulatorEngine({ title, icon: Icon, description, initialTable, queries, quiz }) {
  const [activeQuery, setActiveQuery] = useState(null);
  const [currentTable, setCurrentTable] = useState(initialTable);
  const [msg, setMsg] = useState('คลิกปุ่ม "Run Query" ด้านบนเพื่อดูผลลัพธ์');
  
  const [qa, setQa] = useState(null);
  const [qc, setQc] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const st = (m, t) => {
    setToast({ show: true, message: m, type: t });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleRunQuery = (q) => {
    setActiveQuery(q.id);
    setCurrentTable(q.resultTable);
    setMsg(q.resultMsg);
  };

  const handleReset = () => {
    setActiveQuery(null);
    setCurrentTable(initialTable);
    setMsg('คลิกปุ่ม "Run Query" ด้านบนเพื่อดูผลลัพธ์');
  };

  return (
    <div className="space-y-12 my-8">
      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-teal-100 text-teal-600 rounded-xl shrink-0">
          <Icon size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
        </div>
      </div>

      {/* Simulator */}
      <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
        <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Database size={18} /> SQL Query Simulator
          </div>
          <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <RotateCcw size={16}/> Reset Data
          </button>
        </div>
        
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Query Selection */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-white font-semibold mb-4 text-lg border-b border-slate-700 pb-2">คำสั่ง SQL สำหรับทดสอบ:</h3>
            {queries.map(q => (
              <div 
                key={q.id}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${activeQuery === q.id ? 'border-teal-500 bg-teal-900/30' : 'border-slate-700 bg-slate-800 hover:border-teal-400'}`}
                onClick={() => handleRunQuery(q)}
              >
                <div className="font-mono text-sm text-yellow-300 mb-2">{q.sql}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{q.desc}</p>
                <button className={`mt-3 flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeQuery === q.id ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-300 group-hover:bg-teal-600 group-hover:text-white'}`}>
                  <Play size={14}/> Run Query
                </button>
              </div>
            ))}
          </div>

          {/* Result Table */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-lg border-b border-slate-700 pb-2 flex justify-between">
              <span>ผลลัพธ์ (Result Set):</span>
              <span className="text-teal-400 text-sm">{msg}</span>
            </h3>
            
            <div className="flex-1 bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      {currentTable.columns.map((col, i) => (
                        <th key={i} className="px-6 py-4 font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTable.rows.length === 0 ? (
                      <tr>
                        <td colSpan={currentTable.columns.length} className="px-6 py-8 text-center text-slate-400 italic">
                          (ไม่มีข้อมูลตรงตามเงื่อนไข / Empty set)
                        </td>
                      </tr>
                    ) : (
                      currentTable.rows.map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 transition-colors animate-in fade-in duration-500 ${row.highlight ? 'bg-yellow-50' : 'hover:bg-slate-50'}`}>
                          {row.data.map((cell, j) => (
                            <td key={j} className={`px-6 py-3 ${cell === null ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                              {cell === null ? 'NULL' : cell}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 bg-slate-800 p-3 rounded-lg">
              <Table2 size={16}/> แสดงข้อมูลจำนวน {currentTable.rows.length} แถว
            </div>
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
