import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Check, ChevronRight, FileText, Download } from 'lucide-react';

export default function OOP21910_U5_L7_UserManualDemo() {
  const [sections, setSections] = useState([
    { id: 'intro', title: '1. บทนำ', content: 'ภาพรวมว่าโปรแกรม POS นี้ทำอะไรได้บ้าง', included: false },
    { id: 'install', title: '2. วิธีติดตั้ง', content: 'ขั้นตอนการติดตั้ง Python และ Libraries ที่จำเป็น', included: false },
    { id: 'usage', title: '3. วิธีใช้งาน', content: 'อธิบาย Flow การใช้งานหลัก (เพิ่มสินค้า -> สั่งซื้อ -> จ่ายเงิน)', included: false },
    { id: 'faq', title: '4. คำถามที่พบบ่อย', content: 'ปัญหาที่อาจจะเจอระหว่างการใช้งานและวิธีแก้ไข', included: false },
    { id: 'contact', title: '5. ข้อมูลติดต่อ', content: 'ชื่อผู้จัดทำและอีเมลติดต่อ', included: false },
  ]);
  const [title, setTitle] = useState('คู่มือการใช้งานระบบ POS');
  const [author, setAuthor] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Documentation Generator Initialized.' },
    { type: 'system', text: 'Select sections to include in the User Manual.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const toggleSection = (id) => {
    const newSections = sections.map(s => s.id === id ? { ...s, included: !s.included } : s);
    setSections(newSections);
    
    const sec = sections.find(s => s.id === id);
    const isNowIncluded = !sec.included;
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ doc_builder.toggle("${id}", status=${isNowIncluded})` },
      { type: 'system', text: `> Section "${sec.title}" ${isNowIncluded ? 'added to' : 'removed from'} draft.` }
    ]);
  };

  const handlePreview = () => {
    setShowPreview(true);
    const included = sections.filter(s => s.included);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ doc_builder.generate_preview()` },
      { type: 'output', text: `> Compiling document...` },
      { type: 'output', text: `> Title: ${title}` },
      { type: 'output', text: `> Author: ${author || 'Anonymous'}` },
      { type: 'output', text: `> Included ${included.length} sections.` },
      { type: 'system', text: `> Render complete.` }
    ]);
  };

  const includedCount = sections.filter(s => s.included).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <BookOpen size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การเขียนคู่มือการใช้งาน (User Manual)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้องค์ประกอบที่สำคัญในการเขียนเอกสารอธิบายการใช้งานโปรแกรม เพื่อให้ผู้ใช้สามารถเข้าใจและนำไปใช้ได้จริง
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Document Builder */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex items-center gap-2">
              <FileText size={16} /> Document Builder
            </h4>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">ชื่อเอกสาร</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">ชื่อผู้เขียน</label>
                  <input type="text" value={author} onChange={e => setAuthor(e.target.value)} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" 
                    placeholder="ระบุชื่อ-นามสกุล / รหัสนักศึกษา" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">เลือกหัวข้อที่จะใส่ในคู่มือ</label>
                <div className="space-y-2">
                  {sections.map(s => (
                    <button key={s.id} onClick={() => toggleSection(s.id)}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-3 shadow-sm ${s.included ? 'border-sky-400 bg-sky-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${s.included ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-300'}`}>
                        {s.included && <Check size={12} strokeWidth={3} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm ${s.included ? 'text-sky-800' : 'text-slate-700'}`}>{s.title}</div>
                        <div className={`text-xs mt-0.5 ${s.included ? 'text-sky-600' : 'text-slate-500'}`}>{s.content}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handlePreview} disabled={includedCount === 0} 
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4">
                <ChevronRight size={18} /> อัปเดตตัวอย่างเอกสาร
              </button>
            </div>
          </div>

          {/* Right: Document Preview */}
          <div className="w-full lg:w-[450px] bg-slate-200 p-6 flex flex-col items-center">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 self-start">Live Preview</h4>
            
            {showPreview && includedCount > 0 ? (
              <div className="bg-white w-full max-w-[400px] flex-1 border border-slate-300 shadow-xl p-8 flex flex-col relative aspect-[1/1.4] overflow-y-auto custom-scrollbar">
                
                {/* Document Header */}
                <div className="text-center mb-8 pb-6 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{title}</h2>
                  {author && <p className="text-sm font-semibold text-slate-600">โดย {author}</p>}
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Version 1.0</p>
                </div>

                {/* Table of Contents */}
                <div className="mb-8">
                  <h3 className="font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">สารบัญ</h3>
                  <div className="space-y-1.5">
                    {sections.filter(s => s.included).map((s, idx) => (
                      <div key={`toc-${s.id}`} className="flex justify-between items-baseline text-sm">
                        <span className="text-sky-700 font-medium">{s.title}</span>
                        <div className="flex-1 border-b border-dotted border-slate-300 mx-2"></div>
                        <span className="text-slate-500 text-xs">{(idx + 1) * 2}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {sections.filter(s => s.included).map(s => (
                    <div key={`content-${s.id}`}>
                      <h4 className="font-bold text-slate-800 text-base mb-2 pb-1 border-b border-slate-100">{s.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{s.content}</p>
                      
                      {/* Mock content blocks */}
                      <div className="mt-3 bg-slate-50 border border-slate-100 rounded p-3 h-16 flex items-center justify-center">
                        <span className="text-slate-300 text-xs font-mono">[Image / Code Snippet Placeholder]</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="flex-1 w-full bg-white/50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                <BookOpen className="text-slate-300 mb-4 opacity-50" size={48} />
                <p className="text-sm font-semibold">ยังไม่มีตัวอย่างเอกสาร</p>
                <p className="text-xs mt-1 text-slate-500">เลือกหัวข้อทางซ้ายแล้วกดปุ่ม "อัปเดตตัวอย่างเอกสาร"</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">DocGen Process</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
