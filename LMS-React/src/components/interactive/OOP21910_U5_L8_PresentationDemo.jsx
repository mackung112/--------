import React, { useState, useEffect, useRef } from 'react';
import { Presentation, Check, Award, LayoutTemplate } from 'lucide-react';

export default function OOP21910_U5_L8_PresentationDemo() {
  const [checklist, setChecklist] = useState([
    { id: 'demo', text: 'เตรียมโปรเจกต์ที่รันได้จริง', checked: false, tip: 'ลอง Demo สดให้ผู้ฟังเห็น ดีกว่าแค่โชว์สไลด์' },
    { id: 'slides', text: 'เตรียมสไลด์ 5-8 หน้า', checked: false, tip: 'ปก, ปัญหา, วิธีแก้, สาธิต, UML, สรุป' },
    { id: 'story', text: 'เตรียม Story (ปัญหา → วิธีแก้)', checked: false, tip: 'เล่าว่าปัญหาคืออะไร แล้วโปรแกรมเราแก้ปัญหาอย่างไร' },
    { id: 'time', text: 'ฝึกซ้อมให้อยู่ใน 5-10 นาที', checked: false, tip: 'จับเวลาขณะซ้อม ถ้าเกิน 10 นาทีให้ตัดบางส่วนออก' },
    { id: 'qa', text: 'เตรียมตอบคำถามล่วงหน้า', checked: false, tip: 'คิดล่วงหน้าว่าผู้ฟังจะถามอะไร เช่น "ทำไมเลือกใช้ List แทน Dictionary?"' },
    { id: 'backup', text: 'สำรองไฟล์และ Screenshot', checked: false, tip: 'เผื่อเน็ตล่ม หรือรันโปรแกรมไม่ขึ้น ให้มีรูป Backup โชว์ได้' },
  ]);
  const [selectedTip, setSelectedTip] = useState(null);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Presentation Preparation Tracker initialized.' },
    { type: 'system', text: 'Complete the checklist to ensure you are ready.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const toggleCheck = (id) => {
    const newChecklist = checklist.map(c => c.id === id ? { ...c, checked: !c.checked } : c);
    setChecklist(newChecklist);
    setSelectedTip(id);
    
    const item = checklist.find(c => c.id === id);
    const isNowChecked = !item.checked;
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ tracker.update_status("${item.id}", done=${isNowChecked})` },
      { type: 'output', text: `> ${isNowChecked ? '✅ Completed' : '🔄 Unchecked'}: ${item.text}` }
    ]);

    const checkedCount = newChecklist.filter(c => c.checked).length;
    if (checkedCount === newChecklist.length) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: `======================================================` },
        { type: 'output', text: `🎉 ALL TASKS COMPLETED. You are 100% ready to present!` }
      ]);
    }
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const allChecked = checkedCount === checklist.length;

  const slideTemplate = [
    { num: 1, title: 'หน้าปก (Title Slide)', desc: 'ชื่อโปรเจกต์ + รายชื่อสมาชิกกลุ่ม' },
    { num: 2, title: 'ปัญหา (Problem Statement)', desc: 'เราเจอปัญหาอะไร ทำไมถึงอยากทำโปรเจกต์นี้?' },
    { num: 3, title: 'วิธีแก้ปัญหา (Proposed Solution)', desc: 'อธิบายว่าโปรเจกต์ของเราจะเข้าไปช่วยแก้ปัญหาอย่างไร' },
    { num: 4, title: 'โครงสร้างระบบ (UML Class Diagram)', desc: 'อธิบาย Class ที่สำคัญ และความสัมพันธ์เบื้องต้น' },
    { num: 5, title: 'สาธิตโปรแกรม (Live Demo)', desc: 'สลับหน้ารันโปรแกรมจริงให้ดู (รันคำสั่งที่เตรียมไว้)' },
    { num: 6, title: 'สรุปและบทเรียน (Conclusion & Lessons)', desc: 'สิ่งที่ได้เรียนรู้ ปัญหาที่พบ และแนวทางพัฒนาต่อ' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Presentation size={20} className="stroke-2" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">เตรียมตัวนำเสนอผลงาน (Presentation)</h3>
          </div>
          {checkedCount > 0 && (
            <div className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${allChecked ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'}`}>
              {checkedCount}/{checklist.length} Completed
            </div>
          )}
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          ขั้นตอนสุดท้ายของโปรเจกต์คือการนำเสนอ (Pitching) ผลงานให้ผู้อื่นเข้าใจ Checklist ด้านล่างจะช่วยให้คุณไม่พลาดสิ่งสำคัญ
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Checklist */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">
              ✅ Preparation Checklist
            </h4>
            
            <div className="space-y-3 flex-1">
              {checklist.map(c => (
                <button key={c.id} onClick={() => toggleCheck(c.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 shadow-sm ${c.checked ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${c.checked ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' : 'border-slate-300 bg-slate-50'}`}>
                    {c.checked && <Check size={16} strokeWidth={3} />}
                  </div>
                  
                  <span className={`text-sm flex-1 font-semibold ${c.checked ? 'text-emerald-800 line-through opacity-70' : 'text-slate-800'}`}>
                    {c.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Tip Box */}
            <div className={`mt-6 rounded-xl p-5 border transition-all duration-300 shadow-inner ${allChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : selectedTip ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              {allChecked ? (
                <div className="flex items-center gap-3">
                  <Award size={28} className="text-emerald-500 shrink-0" />
                  <div>
                    <strong className="block text-base mb-0.5">ยอดเยี่ยม! คุณพร้อมนำเสนอแล้ว 🎉</strong>
                    <span className="text-sm opacity-90">ขอให้มั่นใจและโชคดีกับการนำเสนอโปรเจกต์ของคุณ</span>
                  </div>
                </div>
              ) : selectedTip ? (
                <div>
                  <strong className="flex items-center gap-2 text-sm mb-1 text-indigo-900"><Presentation size={16} className="text-indigo-600"/> เคล็ดลับเพิ่มเติม:</strong>
                  <span className="text-sm">{checklist.find(c => c.id === selectedTip)?.tip}</span>
                </div>
              ) : (
                <div className="text-sm text-center">คลิกที่รายการด้านบน เพื่อดูเคล็ดลับในการเตรียมตัว</div>
              )}
            </div>
          </div>

          {/* Right: Slide Template */}
          <div className="w-full lg:w-[450px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4 flex items-center gap-2">
              <LayoutTemplate size={16} /> Slide Deck Template
            </h4>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex-1 shadow-sm">
              <div className="space-y-3">
                {slideTemplate.map(s => (
                  <div key={s.num} className="flex gap-4 p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors group">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {s.num}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="font-bold text-slate-800 text-sm mb-0.5">{s.title}</div>
                      <div className="text-xs text-slate-500 leading-relaxed pr-2">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">💡</span>
                <span><strong>ข้อควรระวัง:</strong> สไลด์ไม่ควรมีตัวหนังสือเยอะเกินไป เน้นใส่รูปภาพ/Diagram และใช้การ "พูดอธิบาย" แทนการ "อ่านสไลด์"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Progress Tracker</span>
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
