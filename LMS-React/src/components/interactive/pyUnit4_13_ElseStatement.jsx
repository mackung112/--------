import React, { useState } from 'react';
import { 
  XOctagon, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  ArrowRightLeft
} from 'lucide-react';

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 border border-rose-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600'}`}>
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-sm">{taskText}</div>
      </div>
    </div>
  );
};

const ElseSimulator = () => {
  const [password, setPassword] = useState('');
  
  const isCorrect = password === '1234';
  const hasInput = password.length > 0;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <ArrowRightLeft className="w-6 h-6 text-rose-500" /> เครื่องจำลองรหัสผ่าน (else)
        </h3>
        <p className="text-slate-500 mt-2">พิมพ์รหัสผ่าน (รหัสที่ถูกคือ 1234) เพื่อดูการทำงานของ else</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        <div className="flex flex-col gap-6 items-center w-full max-w-sm mx-auto">
           <input 
             type="text" 
             placeholder="ป้อนรหัสผ่าน..."
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-mono text-center text-xl focus:outline-none focus:border-rose-400"
           />
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="text-slate-500 text-xs font-mono mb-2"># โค้ด Python</div>
            <code className="text-slate-300 font-mono text-sm leading-loose">
              <span className={`transition-all duration-300 ${isCorrect ? 'bg-emerald-500/20 px-2 py-1 rounded text-white border border-emerald-500/50' : 'opacity-50'}`}>
                <span className="text-orange-400">if</span> password == <span className="text-green-400">"1234"</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"ยินดีต้อนรับ"</span>)
              </span><br/>
              <span className={`transition-all duration-300 ${!isCorrect && hasInput ? 'bg-rose-500/20 px-2 py-1 rounded text-white border border-rose-500/50' : 'opacity-50'}`}>
                <span className="text-orange-400">else</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-green-400">"รหัสผ่านผิดพลาด!"</span>)
              </span>
            </code>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-slate-500 text-xs font-mono mb-2"># Console Output</div>
            {hasInput ? (
               <div className={`font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                 {isCorrect ? '> ยินดีต้อนรับ' : '> รหัสผ่านผิดพลาด!'}
               </div>
            ) : (
               <div className="font-mono text-slate-600">รอการป้อนข้อมูล...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_13_ElseStatement() {
  const teacherTaskContent = `โจทย์ปฏิบัติ: ตรวจสอบเลขคู่หรือคี่
รับค่าตัวเลขจากผู้ใช้
ถ้านำตัวเลขมา % 2 แล้วเท่ากับ 0 ให้ print "เลขคู่"
นอกเหนือจากนั้น (else) ให้ print "เลขคี่"
(คำใบ้: ใช้ if num % 2 == 0: และตามด้วย else: )`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-rose-200 selection:text-rose-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-rose-100/60 blur-[100px]"></div>
      </div>
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-rose-600 mb-4 uppercase">หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">กรณีที่เหลือทั้งหมด <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-500">else</span></h1>
          </div>
          <div className="pt-6 border-l-4 border-rose-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">คำว่า <code>else</code> แปลว่า "มิฉะนั้น" ใช้เป็น <strong>ทางเลือกสุดท้ายเสมอ</strong> ถ้าเงื่อนไข if และ elif ก่อนหน้านี้ไม่มีอันไหนเป็นจริงเลย คอมพิวเตอร์จะทำใน else อัตโนมัติ (else จะไม่มีเงื่อนไขต่อท้าย)</p>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 relative z-10">
        <ElseSimulator />
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
      </main>
    </div>
  );
}
