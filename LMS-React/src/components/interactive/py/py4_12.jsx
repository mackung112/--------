import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import { 
  Play,
  Code2,
  AlertOctagon,
  ShieldAlert,
  TerminalSquare,
  BookOpen,
  Info
} from 'lucide-react';

const ElseSimulator = () => {
  const [role, setRole] = useState('guest');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState('');

  const runCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
    
    setTimeout(() => setActiveStep(1), 500); 
    
    setTimeout(() => {
      if (role === 'admin') {
        setResult('ยินดีต้อนรับ ผู้ดูแลระบบ (Full Access)');
        setHasPlayed(true);
      } else {
        setActiveStep(2); 
        setTimeout(() => {
          if (role === 'editor') {
            setResult('ยินดีต้อนรับ ผู้แก้ไข (Edit Access)');
            setHasPlayed(true);
          } else {
            setActiveStep(3); 
            setTimeout(() => {
              setResult('เข้าสู่ระบบในฐานะ บุคคลทั่วไป (Read Only)');
              setHasPlayed(true);
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
  };

  const resetCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-rose-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <TerminalSquare className="w-5 h-5" /> 4.12.2 จำลองระบบรักษาความปลอดภัย
        </h4>
        
        <p className="font-sans text-slate-400 text-sm mb-6">
          ทดลองเลือกบทบาท (Role) ที่แปลกประหลาด เช่น hacker แล้วดูว่า else จะดักจับการบุกรุกนี้ได้อย่างไร
        </p>
        
        <div className="bg-slate-800 p-4 rounded-xl mb-4">
          <span className="text-blue-400">role</span> = <select 
            value={role}
            onChange={(e) => {setRole(e.target.value); resetCode();}}
            className="bg-slate-900 text-emerald-400 px-2 py-1 rounded outline-none border border-slate-700 focus:border-rose-500 transition-colors inline-block"
          >
             <option value="admin">"admin"</option>
             <option value="editor">"editor"</option>
             <option value="guest">"guest"</option>
             <option value="hacker">"hacker"</option>
             <option value="user123">"user123"</option>
          </select>
        </div>
        
        <div className="mt-2 flex flex-col gap-1 relative">
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 1 ? 'bg-slate-700 outline outline-1 outline-slate-500' : ''}`}>
             <span className="text-pink-500">if</span> <span className="text-blue-400">role</span> == <span className="text-emerald-400">"admin"</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 1 || (hasPlayed && role === 'admin')) && role === 'admin' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"ยินดีต้อนรับ Admin"</span>)
             </div>
          </div>
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 2 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 2 || (hasPlayed && role === 'editor')) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">role</span> == <span className="text-emerald-400">"editor"</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 2 || (hasPlayed && role === 'editor')) && role === 'editor' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"ยินดีต้อนรับ Editor"</span>)
             </div>
          </div>

          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 3 ? 'bg-rose-950/60 outline outline-1 outline-rose-500' : (activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor')) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">else</span>: <span className="text-slate-500 text-sm ml-2"># ทุกเคสที่เหลือ จะตกมาที่นี่หมด!</span>
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor')) && role !== 'admin' && role !== 'editor' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"เข้าสู่ระบบในฐานะ ผู้เยี่ยมชม"</span>)
             </div>
          </div>

        </div>

        <div className="mt-8 pt-4 flex gap-4">
           <button 
             onClick={runCode}
             disabled={activeStep > 0 && !hasPlayed}
             className="flex-1 bg-rose-500 hover:bg-rose-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
           >
             <Play className="w-5 h-5" /> ตรวจสอบสิทธิ์ Access
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
           การตัดสินใจของระบบ (Decision Log)
        </h4>

        <div className="flex-1 flex flex-col gap-4">
          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 1 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg w-16 text-center">if</div>
             <div className="flex-1 font-mono font-bold text-sm">role == "admin"</div>
             {activeStep > 1 || (hasPlayed && role === 'admin') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role === 'admin' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                 {role === 'admin' ? 'Match' : 'No'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 2 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg w-16 text-center">elif</div>
             <div className="flex-1 font-mono font-bold text-sm">role == "editor"</div>
             {activeStep > 2 || (hasPlayed && role === 'editor' && role !== 'admin') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role === 'editor' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                 {role === 'editor' ? 'Match' : 'No'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-rose-50 p-4 rounded-2xl border ${activeStep === 3 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-rose-200 opacity-90'} transition-all`}>
             <div className="bg-rose-200 p-2 text-xs font-bold text-rose-700 rounded-lg w-16 text-center">else</div>
             <div className="flex-1 font-bold text-sm text-rose-700">(ไม่มีเงื่อนไข ทำงานเมื่อข้อบนเป็นเท็จทั้งหมด)</div>
             {activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role !== 'admin' && role !== 'editor' ? 'bg-rose-500 text-white shadow-lg' : 'bg-transparent text-transparent'}`}>
                 {role !== 'admin' && role !== 'editor' ? 'Triggered!' : ''}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className="mt-auto bg-slate-800 rounded-xl p-6 min-h-[120px] font-mono text-white shadow-inner flex flex-col justify-end border-t-4 border-rose-500">
             <div className="text-slate-400 text-sm mb-2 mt-auto">&gt; Server Response:</div>
             <div className={role === 'hacker' ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function pyUnit4_12_ElseCondition() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม (Else Condition):
1. ให้นักเรียนเขียนโปรแกรมตรวจสอบสิทธิ์ผู้ใช้งาน (level)
2. ถ้า level == 1 ให้พิมพ์ "ผู้ใช้งานทั่วไป"
3. ถ้า level == 2 ให้พิมพ์ "ผู้ดูแลระบบ"
4. นอกเหนือจากนั้น (else) ให้พิมพ์ "รหัสระดับไม่ถูกต้อง กรุณาติดต่อแอดมิน"
5. ทดลองใส่ level เป็นค่าต่างๆ เช่น 1, 2, และ 99 อธิบายผลลัพธ์ที่เกิดขึ้นว่าทำไม else ถึงทำงานเมื่อเราใส่ 99`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-rose-200 selection:text-rose-900">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-rose-100/60 blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Theory Section */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12">
            <h3 className="text-4xl font-black text-rose-600 mb-6 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 flex items-center gap-4">
              <ShieldAlert className="w-10 h-10 text-rose-500" />
              ทางออกสุดท้ายด้วย else
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <BookOpen className="text-rose-500 w-5 h-5" /> 4.12.1 โครงสร้างคำสั่ง else
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    <code className="bg-rose-50 text-rose-700 px-2 py-1 rounded font-bold">else</code> เปรียบเสมือนตะกร้าใบใหญ่ที่รองรับ <strong>"ทุกสิ่งทุกอย่างที่เหลือ"</strong> หากเงื่อนไขใน <code className="bg-slate-100 px-1 rounded">if</code> หรือ <code className="bg-slate-100 px-1 rounded">elif</code> ด้านบนไม่เป็นความจริงเลย โปรแกรมจะตกลงมาทำงานที่บล็อกของ <code className="bg-slate-100 px-1 rounded">else</code> อัตโนมัติ
                  </p>
                  <div className="mt-4 bg-rose-50 p-4 rounded-xl text-rose-800 text-sm flex items-start gap-3 border border-rose-100">
                    <Info className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <strong className="block mb-1">กฎเหล็กของ else:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ห้ามใส่เงื่อนไขต่อท้าย else (เขียนแค่ <code>else:</code> เท่านั้น)</li>
                        <li>ต้องวางไว้ล่างสุดของโครงสร้าง if-elif-else เสมอ</li>
                        <li>มีได้แค่ 1 ตัวต่อ 1 โครงสร้าง</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldAlert className="text-rose-500 w-5 h-5" /> 4.12.2 การจัดการเมื่อไม่ตรงเงื่อนไข (Error Handling)
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-lg mb-4">
                    ประโยชน์หลักของ <code className="bg-slate-100 px-1 rounded">else</code> คือการดักจับข้อผิดพลาด (Fallback) เช่น เมื่อผู้ใช้กรอกข้อมูลที่โปรแกรมไม่รู้จัก หรือป้องกันการบุกรุกโดยไม่ได้รับอนุญาต
                  </p>
                  
                  <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-slate-300 shadow-inner">
                    <span className="text-pink-500">if</span> <span className="text-blue-400">username</span> == <span className="text-emerald-400">"admin"</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-emerald-400">"Login Success"</span>)<br/>
                    <span className="text-pink-500">else</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># ดักจับคนที่ไม่ได้ชื่อ admin ทุกคน!</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-rose-400">"Access Denied!"</span>)<br/>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Simulator */}
        <ElseSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
