import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  AlertOctagon,
  Check,
  X,
  XCircle,
  ArrowRight,
  Lock,
  TerminalSquare,
  ShieldAlert
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
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-cyan-100 rounded-2xl text-cyan-600 border border-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-cyan-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-cyan-100 text-cyan-600 border border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

const VariableValidator = () => {
  const [varName, setVarName] = useState('');
  const [validation, setValidation] = useState({
    notEmpty: false,
    noStartNumber: false,
    validChars: false,
    notReserved: false,
    isValid: false
  });

  const reservedWords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 
    'try', 'while', 'with', 'yield'
  ];

  useEffect(() => {
    const checkValidation = () => {
      const name = varName.trim();
      
      const notEmpty = name.length > 0;
      const noStartNumber = notEmpty && !/^[0-9]/.test(name);
      const validChars = notEmpty && /^[a-zA-Z0-9_]+$/.test(name);
      const notReserved = notEmpty && !reservedWords.includes(name);

      setValidation({
        notEmpty,
        noStartNumber,
        validChars,
        notReserved,
        isValid: notEmpty && noStartNumber && validChars && notReserved
      });
    };

    checkValidation();
  }, [varName]);

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <TerminalSquare className="w-6 h-6 text-cyan-500" />
          เครื่องจำลองตรวจสอบชื่อตัวแปร (Variable Validator)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองพิมพ์ชื่อตัวแปรที่คุณต้องการ แล้วดูว่าผ่านกฎของ Python หรือไม่</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* Input Area */}
        <div className="flex flex-col justify-center">
          <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-200 relative focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              พิมพ์ชื่อตัวแปรที่นี่
            </label>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-slate-400 font-mono">$&gt;</span>
              <input 
                type="text" 
                value={varName}
                onChange={(e) => setVarName(e.target.value)}
                className="w-full bg-transparent text-2xl font-bold font-mono text-slate-800 focus:outline-none placeholder-slate-300"
                placeholder="my_variable_1"
                spellCheck="false"
              />
            </div>
          </div>

          <div className={`mt-8 p-6 rounded-2xl flex items-center gap-4 transition-colors duration-300 border-2 ${
            varName.trim() === '' ? 'bg-slate-100 border-slate-200 text-slate-500' : 
            validation.isValid ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-rose-50 border-rose-400 text-rose-700'
          }`}>
            <div className="shrink-0">
              {varName.trim() === '' ? <Type className="w-8 h-8 opacity-50" /> : 
               validation.isValid ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>
            <div>
              <h4 className="font-bold text-lg">
                {varName.trim() === '' ? 'รอการกรอกข้อมูล...' : 
                 validation.isValid ? 'ชื่อนี้สามารถใช้งานได้ (Valid)' : 'ชื่อนี้ผิดกฎการตั้งชื่อ (Invalid)'}
              </h4>
              {varName.trim() !== '' && !validation.isValid && (
                <p className="text-sm mt-1 opacity-80">โปรดตรวจสอบกฎทางด้านขวาและแก้ไขให้ถูกต้อง</p>
              )}
            </div>
          </div>
        </div>

        {/* Validation Rules Checklist */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            ตรวจสอบกฎเกณฑ์
          </h4>
          
          <div className="space-y-4">
            {/* Rule 1: Not Empty */}
            <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
              varName.trim() === '' ? 'bg-slate-800/50' : validation.notEmpty ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-rose-900/30 border border-rose-800'
            }`}>
              {validation.notEmpty ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <X className="w-5 h-5 text-rose-400 shrink-0" />}
              <div>
                <p className={`text-sm font-bold ${validation.notEmpty ? 'text-emerald-300' : 'text-slate-400'}`}>ต้องไม่เป็นค่าว่าง</p>
              </div>
            </div>

            {/* Rule 2: Start with Letter or Underscore */}
            <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
              varName.trim() === '' ? 'bg-slate-800/50' : validation.noStartNumber ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-rose-900/30 border border-rose-800'
            }`}>
              {validation.noStartNumber && varName.trim() !== '' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <X className={`w-5 h-5 shrink-0 ${varName.trim() === '' ? 'text-slate-600' : 'text-rose-400'}`} />}
              <div>
                <p className={`text-sm font-bold ${validation.noStartNumber && varName.trim() !== '' ? 'text-emerald-300' : 'text-slate-400'}`}>ห้ามขึ้นต้นด้วยตัวเลข</p>
                <p className="text-xs text-slate-500 font-mono mt-1">เช่น 1player (ผิด) → player1 (ถูก)</p>
              </div>
            </div>

            {/* Rule 3: Valid Characters */}
            <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
              varName.trim() === '' ? 'bg-slate-800/50' : validation.validChars ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-rose-900/30 border border-rose-800'
            }`}>
               {validation.validChars && varName.trim() !== '' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <X className={`w-5 h-5 shrink-0 ${varName.trim() === '' ? 'text-slate-600' : 'text-rose-400'}`} />}
              <div>
                <p className={`text-sm font-bold ${validation.validChars && varName.trim() !== '' ? 'text-emerald-300' : 'text-slate-400'}`}>ใช้ได้เฉพาะ A-Z, a-z, 0-9 และ _</p>
                <p className="text-xs text-slate-500 font-mono mt-1">ห้ามเว้นวรรค และห้ามใช้สัญลักษณ์พิเศษ (!@#$)</p>
              </div>
            </div>

            {/* Rule 4: Not Reserved Word */}
            <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
              varName.trim() === '' ? 'bg-slate-800/50' : validation.notReserved ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-rose-900/30 border border-rose-800'
            }`}>
               {validation.notReserved && varName.trim() !== '' ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <X className={`w-5 h-5 shrink-0 ${varName.trim() === '' ? 'text-slate-600' : 'text-rose-400'}`} />}
              <div>
                <p className={`text-sm font-bold ${validation.notReserved && varName.trim() !== '' ? 'text-emerald-300' : 'text-slate-400'}`}>ต้องไม่ใช่คำสงวน (Reserved Word)</p>
                <p className="text-xs text-slate-500 font-mono mt-1">เช่น if, for, True, def, class</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "ผู้คัดกรองตัวแปร (Variable Screener)"

ข้อที่ 1: จงพิจารณาชื่อตัวแปรต่อไปนี้ ว่าสามารถใช้งานใน Python ได้หรือไม่? 
หาก "ไม่ได้" ให้อธิบายเหตุผลประกอบ
1. student_name
2. 1st_prize
3. my-score
4. total_amount!
5. True
6. age25

ข้อที่ 2: จงแปลงข้อความต่อไปนี้ ให้เป็นชื่อตัวแปรที่ถูกต้องตามกฎ และอ่านเข้าใจง่าย (แนะนำให้ใช้เครื่องหมาย _ แทนการเว้นวรรค)
- "รหัสนักเรียน"         -> ______________
- "คะแนนสอบกลางภาค"    -> ______________
- "จำนวนเงินทั้งหมด"     -> ______________`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-cyan-200 selection:text-cyan-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-cyan-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              กฎการตั้งชื่อตัวแปร <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">(Variable Naming Rules)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-cyan-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              การตั้งชื่อตัวแปร (Variable) เปรียบเสมือนการแปะป้ายชื่อบน <strong>"กล่องเก็บข้อมูล"</strong> เพื่อให้เราหยิบมาใช้ได้ถูกกล่องในอนาคต ดังนั้นชื่อตัวแปรที่ดี ต้องถูกต้องตามกฎของ Python และสื่อความหมายให้มนุษย์อ่านเข้าใจ
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Rules Section 3.2.1 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <AlertOctagon className="w-6 h-6 text-cyan-500" />
            3.2.1 หลักเกณฑ์และข้อห้ามในการตั้งชื่อ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Valid Rules */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-emerald-100 shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> สิ่งที่ทำได้ (Valid)
              </h3>
              
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <span className="font-bold text-slate-700">ใช้ตัวอักษรภาษาอังกฤษ ตัวเลข และ ขีดล่าง (_)</span>
                    <div className="mt-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-mono text-sm border border-emerald-200 inline-block">
                      score_1, playerName, user_id
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <span className="font-bold text-slate-700">ขึ้นต้นด้วยอักษรภาษาอังกฤษ หรือ (_) ก็ได้</span>
                    <div className="mt-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-mono text-sm border border-emerald-200 inline-block">
                      _privateVar, Data
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <span className="font-bold text-slate-700">คำนึงถึงตัวพิมพ์เล็ก-ใหญ่ (Case-Sensitive)</span>
                    <p className="text-sm text-slate-500 mt-1">
                      <code className="bg-slate-100 px-1 rounded">Age</code> กับ <code className="bg-slate-100 px-1 rounded">age</code> ถือเป็นคนละตัวแปรกัน
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Invalid Rules */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-rose-100 shadow-lg relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold text-rose-700 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6" /> ข้อห้าม (Invalid)
              </h3>
              
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200">X</div>
                  <div>
                    <span className="font-bold text-slate-700">ห้ามขึ้นต้นด้วยตัวเลข</span>
                    <div className="mt-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg font-mono text-sm border border-rose-200 inline-block line-through opacity-80">
                      1st_place, 2player
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200">X</div>
                  <div>
                    <span className="font-bold text-slate-700">ห้ามมีช่องว่าง (เว้นวรรค)</span>
                    <div className="mt-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg font-mono text-sm border border-rose-200 inline-block line-through opacity-80">
                      my score, first name
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200">X</div>
                  <div>
                    <span className="font-bold text-slate-700">ห้ามใช้สัญลักษณ์พิเศษ (ยกเว้น _)</span>
                    <div className="mt-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg font-mono text-sm border border-rose-200 inline-block line-through opacity-80">
                      user@name, total$, amount%
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Reserved Words Section 3.2.2 */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 border border-slate-800 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-cyan-400">
              <Lock className="w-8 h-8" />
              3.2.2 คำสงวน (Reserved Words)
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-3xl">
              คำสงวน คือคำที่ภาษา Python จองไว้ใช้เป็น <strong>"คำสั่งหลัก"</strong> ของโปรแกรม เราจึง <strong>ห้ามนำคำเหล่านี้มาตั้งเป็นชื่อตัวแปร</strong> โดยเด็ดขาด เพราะจะทำให้คอมพิวเตอร์สับสน!
            </p>

            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
               <h4 className="text-slate-500 font-mono text-sm mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">ตัวอย่างคำสงวนที่พบบ่อย</h4>
               <div className="flex flex-wrap gap-3">
                  {['if', 'else', 'elif', 'while', 'for', 'True', 'False', 'None', 'and', 'or', 'not', 'def', 'class', 'import', 'return', 'break', 'continue'].map(word => (
                    <span key={word} className="bg-slate-800 text-cyan-300 font-mono font-bold px-4 py-2 rounded-lg border border-slate-700 shadow-sm hover:border-cyan-500 hover:text-cyan-100 transition-colors cursor-default">
                      {word}
                    </span>
                  ))}
                  <span className="text-slate-500 font-mono px-4 py-2 self-center">และอื่นๆ...</span>
               </div>
            </div>

            <div className="mt-8 bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <strong className="text-blue-300">Tips:</strong> ในโปรแกรมเขียนโค้ด (IDE) เช่น VS Code คำสงวนเหล่านี้มักจะถูก <strong>เปลี่ยนสีอัตโนมัติ</strong> (เช่น สีม่วง สีน้ำเงิน) หากพิมพ์ชื่อตัวแปรแล้วเปลี่ยนสี ให้เดาไว้ก่อนว่าอาจเป็นคำสงวน!
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <VariableValidator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />
        
        {/* Next Unit Recommendation */}
        <div className="mt-16 flex justify-end">
          <div className="bg-cyan-50 border border-cyan-100 px-6 py-4 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-cyan-300 transition-all cursor-pointer group">
            <div className="text-right">
              <p className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-1">หัวข้อถัดไป</p>
              <h4 className="text-slate-800 font-bold group-hover:text-cyan-700 transition-colors">3.3 ข้อมูลจำนวนเต็ม (Integer)</h4>
            </div>
            <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-200">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}