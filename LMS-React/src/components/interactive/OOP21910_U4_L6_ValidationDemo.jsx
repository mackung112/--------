import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Check, X, RotateCcw, Send } from 'lucide-react';

export default function OOP21910_U4_L6_ValidationDemo() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Validation System initialized. Waiting for form submission...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const validations = [
    { field: 'ชื่อ', value: name, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: name.trim().length > 0 },
      { label: 'ความยาว 2-50 ตัวอักษร', pass: name.trim().length >= 2 && name.trim().length <= 50 },
    ]},
    { field: 'อายุ', value: age, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: age.trim().length > 0 },
      { label: 'เป็นตัวเลข', pass: !isNaN(age) && age.trim() !== '' },
      { label: 'อยู่ระหว่าง 1-120', pass: !isNaN(age) && parseInt(age) >= 1 && parseInt(age) <= 120 },
    ]},
    { field: 'อีเมล', value: email, rules: [
      { label: 'ไม่เป็นค่าว่าง', pass: email.trim().length > 0 },
      { label: 'มีเครื่องหมาย @', pass: email.includes('@') },
      { label: 'มี . หลัง @', pass: email.includes('@') && email.split('@')[1]?.includes('.') },
    ]},
  ];

  const allPassed = validations.every(v => v.rules.every(r => r.pass));

  const handleSubmit = () => {
    setSubmitted(true);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ validate_form(name="${name}", age="${age}", email="${email}")` }
    ]);

    validations.forEach(v => {
      const fieldPassed = v.rules.every(r => r.pass);
      if (!fieldPassed) {
        const failedRules = v.rules.filter(r => !r.pass).map(r => r.label).join(', ');
        setConsoleHistory(prev => [...prev, { type: 'error', text: `  [FAIL] ${v.field}: Failed rules -> ${failedRules}` }]);
      } else {
        setConsoleHistory(prev => [...prev, { type: 'system', text: `  [PASS] ${v.field}: Valid.` }]);
      }
    });

    if (allPassed) {
      setConsoleHistory(prev => [...prev, { type: 'output', text: `✅ SUCCESS: All fields are valid. Form submitted.` }]);
    } else {
      setConsoleHistory(prev => [...prev, { type: 'error', text: `❌ ERROR: Form validation failed. Please fix errors.` }]);
    }
  };

  const clear = () => {
    setName(''); setAge(''); setEmail(''); setSubmitted(false);
    setConsoleHistory([
      { type: 'system', text: 'Form and Validation System reset.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <ShieldCheck size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การตรวจสอบความถูกต้องของข้อมูล (Validation)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          ก่อนนำข้อมูลไปประมวลผล ควรสร้างเงื่อนไข (Rules) ตรวจสอบความถูกต้องเสมอ เพื่อป้องกัน Error ที่อาจทำให้โปรแกรมพัง
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Form Input */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
              <h4 className="font-bold text-slate-800 text-center mb-6">ฟอร์มลงทะเบียน</h4>
              
              <div className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">ชื่อ (Name)</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} 
                    className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${submitted && !validations[0].rules.every(r => r.pass) ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'}`} 
                    placeholder="กรอกชื่อ-นามสกุล..." />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">อายุ (Age)</label>
                  <input type="text" value={age} onChange={e => setAge(e.target.value)} 
                    className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${submitted && !validations[1].rules.every(r => r.pass) ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'}`} 
                    placeholder="ตัวเลขเท่านั้น เช่น 20..." />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">อีเมล (Email)</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} 
                    className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-all ${submitted && !validations[2].rules.every(r => r.pass) ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'}`} 
                    placeholder="example@email.com" />
                </div>

                <div className="pt-4 flex gap-3">
                  <button onClick={handleSubmit} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Send size={16} fill="currentColor" className="text-indigo-100" /> ส่งข้อมูล (Submit)
                  </button>
                  <button onClick={clear} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 rounded-xl font-bold transition-all flex items-center justify-center">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Validation Results */}
          <div className="w-full lg:w-[420px] bg-slate-800 p-6 flex flex-col" style={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-400 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} /> กฎการตรวจสอบ (Rules)
            </h4>
            
            <div className="space-y-4 flex-1">
              {validations.map((v, i) => (
                <div key={i} className={`bg-slate-900/80 border rounded-xl p-4 transition-all ${submitted ? (v.rules.every(r => r.pass) ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]') : 'border-slate-700'}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
                    <div className="font-bold text-slate-300 text-sm">{v.field}</div>
                    <div className="font-mono text-xs text-indigo-400 max-w-[150px] truncate bg-indigo-950/50 px-2 py-0.5 rounded">
                      "{v.value}"
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {v.rules.map((r, j) => {
                      // show neutral slate state until submitted
                      const isPass = r.pass;
                      const icon = submitted ? (isPass ? <Check size={14} className="text-emerald-500 stroke-[3]" /> : <X size={14} className="text-red-500 stroke-[3]" />) : <div className="w-2 h-2 rounded-full bg-slate-600 mx-1" />;
                      const textClass = submitted ? (isPass ? 'text-emerald-400' : 'text-red-400 font-medium') : 'text-slate-400';
                      
                      return (
                        <div key={j} className={`flex items-start gap-2 text-xs ${textClass}`}>
                          <div className="mt-0.5">{icon}</div>
                          <div className="leading-relaxed">{r.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">Validation Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-emerald-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-400 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
