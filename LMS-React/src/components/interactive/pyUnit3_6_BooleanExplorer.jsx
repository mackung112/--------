import React, { useState } from 'react';
import {
  ToggleLeft,
  Copy,
  CheckCircle2,
  BookOpen,
  Zap,
  ShieldAlert,
  HelpCircle,
  FileDigit,
  Cpu,
  XCircle
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
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-rose-400 to-red-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600 border border-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-orange-100 text-orange-600 border border-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]'
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

const LogicGateSimulator = () => {
  const [valA, setValA] = useState(true);
  const [valB, setValB] = useState(false);
  const [operator, setOperator] = useState('and');

  const getResult = () => {
    if (operator === 'and') return valA && valB;
    if (operator === 'or') return valA || valB;
    if (operator === 'not') return !valA; // not A
    return false;
  };

  const result = getResult();

  return (
    <div className="my-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 text-orange-400">
          <Cpu className="w-8 h-8" />
          เครื่องจำลองตรรกะ (Logic Gate Simulator)
        </h3>
        <p className="text-slate-400 text-lg mb-8">เปิด-ปิดสวิตช์ (True/False) เพื่อเรียนรู้การทำงานของ AND, OR, NOT</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Inputs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl relative">
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-slate-600"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg text-slate-200">ตัวแปร A</h4>
                  <p className="text-xs text-slate-500">สวิตช์ที่ 1</p>
                </div>
                <button 
                  onClick={() => setValA(!valA)}
                  className={`w-20 h-10 rounded-full flex items-center p-1 transition-colors ${valA ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-700'}`}
                >
                  <div className={`w-8 h-8 rounded-full bg-white transition-transform ${valA ? 'translate-x-10' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="mt-3 text-right">
                <span className={`font-mono font-bold ${valA ? 'text-orange-400' : 'text-slate-500'}`}>{valA ? 'True' : 'False'}</span>
              </div>
            </div>

            <div className={`bg-slate-800/80 border border-slate-700 p-6 rounded-2xl relative transition-opacity ${operator === 'not' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-slate-600"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg text-slate-200">ตัวแปร B</h4>
                  <p className="text-xs text-slate-500">สวิตช์ที่ 2</p>
                </div>
                <button 
                  onClick={() => setValB(!valB)}
                  className={`w-20 h-10 rounded-full flex items-center p-1 transition-colors ${valB ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-700'}`}
                >
                  <div className={`w-8 h-8 rounded-full bg-white transition-transform ${valB ? 'translate-x-10' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="mt-3 text-right">
                <span className={`font-mono font-bold ${valB ? 'text-rose-400' : 'text-slate-500'}`}>{valB ? 'True' : 'False'}</span>
              </div>
            </div>
          </div>

          {/* Processor (Gate) */}
          <div className="lg:col-span-3 flex justify-center relative">
            <div className="absolute -left-3 top-1/3 transform -translate-y-1/2 w-6 h-1 bg-slate-600"></div>
            <div className={`absolute -left-3 top-2/3 transform -translate-y-1/2 w-6 h-1 bg-slate-600 ${operator === 'not' ? 'hidden' : ''}`}></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-slate-600"></div>
            
            <div className="bg-slate-950 border-2 border-slate-700 rounded-3xl p-6 flex flex-col items-center shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 w-full max-w-[200px]">
              <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Operator</h4>
              <div className="flex flex-col gap-2 w-full">
                <button onClick={() => setOperator('and')} className={`py-2 rounded-lg font-bold font-mono transition-all ${operator === 'and' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>and</button>
                <button onClick={() => setOperator('or')} className={`py-2 rounded-lg font-bold font-mono transition-all ${operator === 'or' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>or</button>
                <button onClick={() => setOperator('not')} className={`py-2 rounded-lg font-bold font-mono transition-all ${operator === 'not' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>not A</button>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Output Result</h4>
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 ${result ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.5)] scale-110' : 'bg-slate-900 border-slate-700 scale-100'}`}>
              <span className={`text-2xl font-black font-mono tracking-wider ${result ? 'text-white' : 'text-slate-600'}`}>
                {result ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            
            <div className="mt-8 bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-center w-full">
              <span className="text-slate-400 text-xs font-mono">CODE: </span>
              <span className="font-mono font-bold text-orange-300">
                {operator === 'not' ? `not ${valA ? 'True' : 'False'}` : `${valA ? 'True' : 'False'} ${operator} ${valB ? 'True' : 'False'}`}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function pyUnit3_6_BooleanExplorer() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "สายลับตรรกะ"

ข้อที่ 1: วิเคราะห์รหัสผ่าน
ให้นักเรียนดูเงื่อนไขการเข้าสู่ระบบ:
is_admin = False
has_password = True
can_login = is_admin or has_password
คำถาม: จากโค้ดด้านบน can_login จะมีค่าเป็นอะไร? เพราะเหตุใด? (ใบ้: or ต้องการความจริงแค่ 1 อย่าง)

ข้อที่ 2: ตั้งสวิตช์เปิดไฟ
ไฟในห้องจะเปิดก็ต่อเมื่อ "มืดแล้ว" (is_dark = True) และ "มีคนอยู่ในห้อง" (has_person = True)
จงเขียนโค้ดเพื่อเก็บสถานะว่าไฟควรเปิดหรือไม่ ลงในตัวแปร light_on`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-orange-200 selection:text-orange-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-orange-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-rose-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-orange-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ข้อมูลตรรกะ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-500">(Boolean / bool)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-orange-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในโลกคอมพิวเตอร์ ข้อมูลไม่ได้มีแค่ตัวเลขหรือข้อความ บางครั้งระบบจำเป็นต้องตัดสินใจ ข้อมูลตรรกะ (Boolean) คือผู้พิทักษ์ที่ถือครองความจริงเพียงสองสถานะ: <strong className="text-orange-600">จริง (True)</strong> หรือ <strong className="text-rose-600">เท็จ (False)</strong>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.6.1 ค่าความจริง (True) และเท็จ (False) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <ToggleLeft className="w-6 h-6 text-orange-500" />
            3.6.1 ค่าความจริง (True) และเท็จ (False)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1: True */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-orange-100 shadow-lg shadow-orange-100/50 flex flex-col items-center text-center group transition-all hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-black font-mono text-3xl text-slate-800 mb-2">True</h3>
              <p className="text-slate-600 mb-4">หมายถึง <strong>"จริง"</strong> หรือ <strong>"ใช่"</strong> หรือ <strong>"เปิด"</strong> (ในภาษาเครื่องเทียบเท่ากับเลข 1)</p>
              <div className="bg-slate-50 w-full p-4 rounded-xl border border-slate-200 font-mono text-sm">
                <span className="text-blue-500">is_admin</span> = <span className="text-orange-500 font-bold">True</span>
              </div>
            </div>

            {/* Card 2: False */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-slate-100 shadow-lg flex flex-col items-center text-center group transition-all hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <XCircle className="w-10 h-10" />
              </div>
              <h3 className="font-black font-mono text-3xl text-slate-800 mb-2">False</h3>
              <p className="text-slate-600 mb-4">หมายถึง <strong>"เท็จ"</strong> หรือ <strong>"ไม่ใช่"</strong> หรือ <strong>"ปิด"</strong> (ในภาษาเครื่องเทียบเท่ากับเลข 0)</p>
              <div className="bg-slate-50 w-full p-4 rounded-xl border border-slate-200 font-mono text-sm">
                <span className="text-blue-500">has_error</span> = <span className="text-slate-500 font-bold">False</span>
              </div>
            </div>

          </div>
          
          <div className="mt-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-4 items-center">
            <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
            <p className="text-sm text-rose-800">
              <strong>ข้อควรระวัง:</strong> ในภาษา Python <code>True</code> และ <code>False</code> ต้องขึ้นต้นด้วย <strong>ตัวพิมพ์ใหญ่เสมอ!</strong> หากพิมพ์ <code>true</code> (ตัวเล็ก) โปรแกรมจะมองว่าเป็นชื่อตัวแปรและทำให้เกิด Error
            </p>
          </div>
        </div>

        {/* Section 3.6.2 การประเมินค่าทางตรรกศาสตร์เบื้องต้น */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-orange-500" />
              3.6.2 การประเมินค่าทางตรรกศาสตร์เบื้องต้น
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  เราสามารถนำค่า Boolean หลายๆ ตัวมาเชื่อมกันเพื่อสร้างเงื่อนไขที่ซับซ้อนขึ้นได้ โดยใช้ <strong>ตัวดำเนินการทางตรรกศาสตร์ (Logical Operators)</strong>
                </p>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-800 mb-1 font-mono text-lg">and (และ)</h4>
                    <p className="text-orange-700 text-sm">ต้องเป็น True <strong>ทั้งคู่</strong> ผลลัพธ์ถึงจะเป็น True</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h4 className="font-bold text-amber-800 mb-1 font-mono text-lg">or (หรือ)</h4>
                    <p className="text-amber-700 text-sm">เป็น True <strong>แค่ตัวใดตัวหนึ่ง</strong> ผลลัพธ์ก็เป็น True ทันที</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-800 mb-1 font-mono text-lg">not (ไม่)</h4>
                    <p className="text-rose-700 text-sm">เป็นการ <strong>กลับค่า</strong> จาก True เป็น False และ False เป็น True</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">การใช้งาน AND, OR, NOT</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-slate-500"># and</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-orange-400 font-bold">True</span> <span className="text-fuchsia-400 font-bold">and</span> <span className="text-orange-400 font-bold">True</span>)  <span className="text-slate-500"># Output: True</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-orange-400 font-bold">True</span> <span className="text-fuchsia-400 font-bold">and</span> <span className="text-slate-400 font-bold">False</span>) <span className="text-slate-500"># Output: False</span><br />
                    <br />
                    <span className="text-slate-500"># or</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-orange-400 font-bold">True</span> <span className="text-fuchsia-400 font-bold">or</span> <span className="text-slate-400 font-bold">False</span>)  <span className="text-slate-500"># Output: True</span><br />
                    <br />
                    <span className="text-slate-500"># not</span><br />
                    <span className="text-yellow-200">print</span>(<span className="text-fuchsia-400 font-bold">not</span> <span className="text-orange-400 font-bold">True</span>)        <span className="text-slate-500"># Output: False</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulators */}
        <LogicGateSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
