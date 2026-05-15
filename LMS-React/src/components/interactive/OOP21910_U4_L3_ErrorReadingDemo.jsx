import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L3_ErrorReadingDemo() {
  const [selectedError, setSelectedError] = useState(null);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Error Log Viewer initialized. Select an error type to view traceback.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const errors = [
    { id: 'name', title: 'NameError', code: 'print(namee)', error: "NameError: name 'namee' is not defined", line: 1, highlight: 'namee', fix: 'ตรวจสอบชื่อตัวแปรว่าสะกดถูกต้องหรือไม่ อาจเขียนผิดจาก name เป็น namee', color: 'border-red-500', traceback: 'Traceback (most recent call last):\n  File "main.py", line 1, in <module>\n    print(namee)\nNameError: name \'namee\' is not defined' },
    { id: 'syntax', title: 'SyntaxError', code: 'if x > 5\n    print("OK")', error: 'SyntaxError: expected \':\'', line: 1, highlight: 'if x > 5', fix: 'ลืมเครื่องหมาย Colon (:) หลัง if ต้องเขียนเป็น if x > 5:', color: 'border-orange-500', traceback: '  File "main.py", line 1\n    if x > 5\n            ^\nSyntaxError: expected \':\'' },
    { id: 'type', title: 'TypeError', code: 'age = "20"\nresult = age + 5', error: "TypeError: can only concatenate str (not \"int\") to str", line: 2, highlight: 'age + 5', fix: 'age เป็น string แต่ 5 เป็น int ต้องแปลงก่อน: int(age) + 5', color: 'border-yellow-500', traceback: 'Traceback (most recent call last):\n  File "main.py", line 2, in <module>\n    result = age + 5\nTypeError: can only concatenate str (not "int") to str' },
    { id: 'index', title: 'IndexError', code: 'items = [1, 2, 3]\nprint(items[5])', error: 'IndexError: list index out of range', line: 2, highlight: 'items[5]', fix: 'list มีแค่ index 0-2 (3 ตัว) แต่เรียก index 5 ซึ่งไม่มี', color: 'border-purple-500', traceback: 'Traceback (most recent call last):\n  File "main.py", line 2, in <module>\n    print(items[5])\nIndexError: list index out of range' },
  ];

  const handleSelectError = (id) => {
    setSelectedError(id);
    const err = errors.find(e => e.id === id);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ python main.py` },
      { type: 'system', text: `[FATAL] Unhandled Exception occurred.` },
      { type: 'error', text: err.traceback }
    ]);
  };

  const clear = () => {
    setSelectedError(null);
    setConsoleHistory([
      { type: 'system', text: 'Error Log Viewer reset.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <AlertTriangle size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การอ่านและวิเคราะห์ Error (Traceback)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้วิธีการอ่านข้อความแจ้งเตือน (Traceback) เมื่อโปรแกรมพัง เพื่อให้รู้ว่าเกิด Error ที่บรรทัดไหน และเกิดจากสาเหตุใด
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Error List */}
          <div className="w-full lg:w-[320px] bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-2">ประเภท Error ที่พบบ่อย</div>
            
            {errors.map(err => (
              <button key={err.id} onClick={() => handleSelectError(err.id)}
                className={`w-full text-left p-3 rounded-xl border-l-[4px] transition-all ${err.color} ${selectedError === err.id ? 'bg-white shadow-md border-r border-y border-slate-300 scale-[1.02]' : 'bg-white border-r border-y border-slate-200 hover:shadow-sm hover:bg-slate-50'}`}>
                <div className="font-bold text-slate-800 text-sm mb-1">{err.title}</div>
                <div className="text-xs text-slate-500 font-mono truncate">{err.error}</div>
              </button>
            ))}

            <button onClick={clear} className="mt-auto bg-transparent hover:bg-slate-200 text-slate-500 border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>

          {/* Right: Info & Fix */}
          <div className="flex-1 bg-white p-6 flex flex-col">
            {selectedError ? (() => {
              const err = errors.find(e => e.id === selectedError);
              return (
                <div className="h-full flex flex-col animate-in fade-in duration-300">
                  <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">ตัวอย่างโค้ดที่ทำให้เกิดปัญหา</h4>
                  
                  <div className="bg-[#1e1e1e] rounded-xl p-4 font-mono text-[13px] shadow-inner border border-slate-700 mb-6">
                    <div className="text-slate-500 text-xs mb-3 border-b border-slate-700 pb-2">📄 main.py</div>
                    {err.code.split('\n').map((line, i) => (
                      <div key={i} className={`flex gap-3 px-2 py-0.5 rounded ${i + 1 === err.line ? 'bg-red-500/20 border-l-2 border-red-500 -ml-2' : ''}`}>
                        <span className="text-slate-600 w-5 text-right select-none">{i + 1}</span>
                        <span className="text-slate-300">{line}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">การวิเคราะห์และวิธีแก้ไข</h4>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm flex-1">
                    <div className="text-red-700 font-mono text-sm font-bold mb-4 pb-3 border-b border-red-200/50">
                      ❌ {err.error}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold text-red-800/70 uppercase tracking-wider mb-1">ความหมาย:</div>
                        <p className="text-sm text-red-900 leading-relaxed">โปรแกรมแจ้งว่าเป็นปัญหาประเภท <strong>{err.title}</strong> เกิดขึ้นที่บรรทัดที่ {err.line}</p>
                      </div>
                      
                      <div className="bg-white/60 rounded-lg p-4 border border-red-100">
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shrink-0">
                            <ArrowRight size={14} className="stroke-[3]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">วิธีแก้ (Fix):</div>
                            <p className="text-sm text-slate-700 leading-relaxed">{err.fix}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <AlertTriangle size={48} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">เลือก Error ทางด้านซ้าย</h3>
                <p className="text-sm text-slate-500 max-w-sm">คลิกเลือกรายการ Error ที่พบบ่อยเพื่อดูตัวอย่างโค้ด วิธีการอ่าน Traceback และแนวทางการแก้ไขที่ถูกต้อง</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-56 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Python Traceback Console</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'error'  && <div className="text-red-400 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className={line.text.includes('FATAL') ? 'text-red-500 font-bold bg-red-950/30 inline-block px-1 rounded' : 'text-slate-500 whitespace-pre-wrap'}>{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
