import { useState } from 'react';
import { GitMerge, User, BookOpen, Briefcase, Plus, Minus, ArrowDown } from 'lucide-react';

export default function InheritanceBuilder() {
  const [baseAttrs, setBaseAttrs] = useState(['name', 'age']);
  
  const toggleAttr = (attr) => {
    if (baseAttrs.includes(attr)) {
      setBaseAttrs(baseAttrs.filter(a => a !== attr));
    } else {
      setBaseAttrs([...baseAttrs, attr]);
    }
  };

  const availableBaseAttrs = [
    { id: 'name', label: 'ชื่อ (name)' },
    { id: 'age', label: 'อายุ (age)' },
    { id: 'address', label: 'ที่อยู่ (address)' },
    { id: 'phone', label: 'เบอร์โทร (phone)' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <GitMerge className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Inheritance (การสืบทอด)</h2>
          <p className="text-cyan-100 mt-1">คลาสลูกจะได้รับคุณสมบัติทั้งหมดที่คลาสแม่มีโดยอัตโนมัติ</p>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-slate-50 flex flex-col items-center">
        
        {/* Base Class (Person) */}
        <div className="w-full max-w-md bg-white border-2 border-blue-400 rounded-xl shadow-lg overflow-hidden z-10 relative">
          <div className="bg-blue-100 p-3 flex justify-between items-center border-b border-blue-200">
            <div className="font-bold text-blue-800 flex items-center gap-2">
              <User className="w-5 h-5" /> 
              Class: Person (คลาสแม่)
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 text-center">จัดการคุณสมบัติพื้นฐาน</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableBaseAttrs.map(attr => {
                const isActive = baseAttrs.includes(attr.id);
                return (
                  <button
                    key={attr.id}
                    onClick={() => toggleAttr(attr.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-all
                      ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <span>{attr.id}</span>
                    {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs font-mono text-slate-500 mb-2">คุณสมบัติที่มี:</div>
            <div className="flex flex-wrap gap-2">
              {baseAttrs.map(attr => (
                <span key={attr} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono border border-blue-200">
                  self.{attr}
                </span>
              ))}
              {baseAttrs.length === 0 && <span className="text-slate-400 text-xs italic">ไม่มีคุณสมบัติ</span>}
            </div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-full max-w-2xl relative h-16 flex justify-center">
          <div className="absolute top-0 bottom-0 w-px bg-slate-300"></div>
          <div className="absolute top-8 w-2/3 h-px bg-slate-300"></div>
          
          <div className="absolute top-8 left-[16.6%] bottom-0 w-px bg-slate-300">
            <ArrowDown className="absolute -bottom-3 -left-2 w-4 h-4 text-slate-400" />
          </div>
          <div className="absolute top-8 right-[16.6%] bottom-0 w-px bg-slate-300">
            <ArrowDown className="absolute -bottom-3 -left-2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Derived Classes */}
        <div className="w-full max-w-2xl grid grid-cols-2 gap-8 z-10">
          
          {/* Teacher Class */}
          <div className="bg-white border-2 border-emerald-400 rounded-xl shadow-lg overflow-hidden transition-all duration-500">
            <div className="bg-emerald-100 p-3 font-bold text-emerald-800 border-b border-emerald-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> 
              Class: Teacher
            </div>
            
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="text-xs font-mono text-slate-500 mb-2">คุณสมบัติที่สืบทอดมา (Inherited):</div>
              <div className="flex flex-wrap gap-2 min-h-[28px]">
                {baseAttrs.map(attr => (
                  <span key={`t-${attr}`} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-mono border border-blue-100 animate-in fade-in zoom-in">
                    self.{attr}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs font-mono text-slate-500 mb-2">คุณสมบัติเฉพาะตัว (Specific):</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-mono border border-emerald-200">
                  self.salary
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-mono border border-emerald-200">
                  self.subject
                </span>
              </div>
            </div>
          </div>

          {/* Student Class */}
          <div className="bg-white border-2 border-orange-400 rounded-xl shadow-lg overflow-hidden transition-all duration-500">
            <div className="bg-orange-100 p-3 font-bold text-orange-800 border-b border-orange-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> 
              Class: Student
            </div>
            
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="text-xs font-mono text-slate-500 mb-2">คุณสมบัติที่สืบทอดมา (Inherited):</div>
              <div className="flex flex-wrap gap-2 min-h-[28px]">
                {baseAttrs.map(attr => (
                  <span key={`s-${attr}`} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-mono border border-blue-100 animate-in fade-in zoom-in">
                    self.{attr}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs font-mono text-slate-500 mb-2">คุณสมบัติเฉพาะตัว (Specific):</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono border border-orange-200">
                  self.grade
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono border border-orange-200">
                  self.gpa
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Code Explanation */}
        <div className="w-full max-w-2xl mt-8 bg-slate-900 rounded-xl p-5 shadow-inner border border-slate-800 relative">
          <div className="text-xs text-slate-400 absolute top-3 right-4 font-mono">python</div>
          <pre className="font-mono text-sm text-slate-300 leading-relaxed overflow-x-auto">
<span className="text-pink-400">class</span> <span className="text-blue-300">Teacher</span>(<span className="text-emerald-300">Person</span>):  <span className="text-slate-500"># สืบทอดจาก Person</span>
    <span className="text-pink-400">def</span> <span className="text-blue-300">__init__</span>(self, {baseAttrs.join(', ')}{baseAttrs.length > 0 ? ', ' : ''}salary, subject):
        <span className="text-yellow-200">super()</span>.__init__({baseAttrs.join(', ')}) <span className="text-slate-500"># เรียกใช้ __init__ ของแม่</span>
        self.salary = salary
        self.subject = subject
          </pre>
        </div>

      </div>
    </div>
  );
}
