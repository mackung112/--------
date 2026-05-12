import { useState } from 'react';
import { UserCircle, Code2, ArrowRight, Play, Info } from 'lucide-react';

export default function SelfKeywordDemo() {
  const [activeObject, setActiveObject] = useState(null);
  const [output, setOutput] = useState("ยังไม่มีการเรียกใช้งาน...");

  const students = [
    { id: 's1', varName: 'student1', name: 'สมชาย', age: 15, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-300' },
    { id: 's2', varName: 'student2', name: 'สมหญิง', age: 16, color: 'text-pink-500', bg: 'bg-pink-100', border: 'border-pink-300' },
    { id: 's3', varName: 'student3', name: 'วิชัย', age: 15, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-300' }
  ];

  const handleCallMethod = (student) => {
    setActiveObject(student.id);
    setOutput(`กำลังทำงาน... self ถูกผูกกับ '${student.name}'`);
    
    // Simulate delay for effect
    setTimeout(() => {
      setOutput(`>>> สวัสดีครับ/ค่ะ ผม/หนูชื่อ ${student.name} อายุ ${student.age} ปี`);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Self Keyword Demo</h2>
          <p className="text-indigo-100 mt-1">เข้าใจการทำงานของคำว่า self ใน Python</p>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-slate-50 flex flex-col gap-8">
        
        {/* Definition Box */}
        <div className="bg-white border-l-4 border-violet-500 p-4 rounded-r-lg shadow-sm">
          <p className="text-slate-700 flex gap-3">
            <Info className="w-6 h-6 text-violet-500 shrink-0" />
            <span>
              <strong>self</strong> คือตัวแปรพิเศษที่ชี้ไปยัง <strong>"ออบเจ็กต์ปัจจุบัน"</strong> ที่กำลังเรียกใช้เมธอดอยู่ 
              ลองกดปุ่ม <code>.introduce()</code> ของนักเรียนแต่ละคนดูสิ!
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code View */}
          <div className="bg-slate-900 rounded-2xl p-5 font-mono text-sm shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 text-xs text-slate-400 rounded-bl-lg border-b border-l border-slate-700">class_definition.py</div>
            <pre className="text-slate-300 mt-4 leading-relaxed">
<span className="text-pink-400">class</span> <span className="text-emerald-300">Student</span>:
    <span className="text-pink-400">def</span> <span className="text-blue-300">__init__</span>(self, name, age):
        <span className={`transition-all duration-300 px-1 rounded ${activeObject ? 'bg-slate-700 font-bold text-white' : ''}`}>self</span>.name = name
        <span className={`transition-all duration-300 px-1 rounded ${activeObject ? 'bg-slate-700 font-bold text-white' : ''}`}>self</span>.age = age

    <span className="text-pink-400">def</span> <span className="text-blue-300">introduce</span>(self):
        <span className="text-yellow-200">print</span>(<span className="text-amber-300">f"สวัสดีครับ/ค่ะ ผม/หนูชื่อ </span>{`{`}
          <span className={`transition-all duration-300 px-1 rounded inline-block ${activeObject ? 'bg-amber-800 font-bold text-amber-100 -translate-y-1' : ''}`}>self.name</span>
        {`}`}
        <span className="text-amber-300"> อายุ </span>{`{`}
          <span className={`transition-all duration-300 px-1 rounded inline-block ${activeObject ? 'bg-amber-800 font-bold text-amber-100 -translate-y-1' : ''}`}>self.age</span>
        {`}`}
        <span className="text-amber-300"> ปี"</span>)
            </pre>
          </div>

          {/* Objects Area */}
          <div className="flex flex-col gap-4">
            {students.map((student) => (
              <div 
                key={student.id}
                className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${activeObject === student.id ? `${student.border} ${student.bg} scale-[1.02] shadow-md` : 'bg-white border-slate-200 hover:border-slate-300'}`}
              >
                <div className={`p-3 rounded-full mr-4 ${student.bg}`}>
                  <UserCircle className={`w-8 h-8 ${student.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500 mb-1">{student.varName} = Student("{student.name}", {student.age})</div>
                  <div className="font-bold text-slate-800">{student.name}</div>
                </div>

                <button 
                  onClick={() => handleCallMethod(student)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm
                    ${activeObject === student.id 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                >
                  {student.varName}.introduce()
                  <Play className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Console Output */}
        <div className="mt-4">
          <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Terminal Output
          </h3>
          <div className={`p-4 rounded-xl font-mono text-sm transition-colors duration-300 border
            ${activeObject ? 'bg-slate-900 text-emerald-400 border-slate-800' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
          >
            {output}
          </div>
        </div>

      </div>
    </div>
  );
}
