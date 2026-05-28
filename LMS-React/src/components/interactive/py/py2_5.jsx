import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  GitBranch, 
  HelpCircle, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  TrainTrack, // doesn't exist in lucide-react, will use Waypoints instead
  Waypoints,
  SplitSquareHorizontal,
  Workflow
} from 'lucide-react';

const LogicVisualizer = () => {
  const [score, setScore] = useState(75);
  const [running, setRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [result, setResult] = useState(null);

  const handleRun = () => {
    if (running) return;
    setRunning(true);
    setResult(null);
    setActiveNode("start");

    setTimeout(() => {
      setActiveNode("check-80");
      setTimeout(() => {
        if (score >= 80) {
          setActiveNode("grade-a");
          setResult("ได้เกรด A");
          setRunning(false);
        } else {
          setActiveNode("check-70");
          setTimeout(() => {
            if (score >= 70) {
              setActiveNode("grade-b");
              setResult("ได้เกรด B");
              setRunning(false);
            } else {
              setActiveNode("check-60");
              setTimeout(() => {
                if (score >= 60) {
                  setActiveNode("grade-c");
                  setResult("ได้เกรด C");
                  setRunning(false);
                } else {
                  setActiveNode("check-50");
                  setTimeout(() => {
                    if (score >= 50) {
                      setActiveNode("grade-d");
                      setResult("ได้เกรด D");
                      setRunning(false);
                    } else {
                      setActiveNode("grade-f");
                      setResult("ตก (F)");
                      setRunning(false);
                    }
                  }, 800);
                }
              }, 800);
            }
          }, 800);
        }
      }, 800);
    }, 600);
  };

  const NodeBox = ({ id, label, isCondition, isResult }) => {
    const isActive = activeNode === id;
    
    let baseClass = "p-4 rounded-xl border-2 transition-all duration-500 flex flex-col items-center justify-center text-center shadow-sm relative";
    let colorClass = "bg-white border-slate-200 text-slate-500";
    
    if (isActive) {
      if (isCondition) colorClass = "bg-rose-100 border-rose-500 text-rose-700 scale-110 shadow-lg shadow-rose-500/30 z-10";
      else if (isResult) colorClass = "bg-emerald-100 border-emerald-500 text-emerald-700 scale-110 shadow-lg shadow-emerald-500/30 z-10";
      else colorClass = "bg-slate-100 border-slate-500 text-slate-800 scale-110 z-10";
    } else if (result && isResult && activeNode === id) {
       colorClass = "bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/50";
    } else if (isCondition) {
       colorClass = "bg-rose-50 border-rose-200 text-rose-600";
    }

    return (
      <div className={`${baseClass} ${colorClass} w-32 min-h-[80px]`}>
        {isActive && !isResult && <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full animate-ping"></div>}
        {isCondition && <HelpCircle className={`w-6 h-6 mb-2 ${isActive ? 'text-rose-600' : 'text-rose-400'}`} />}
        {isResult && <CheckCircle2 className={`w-6 h-6 mb-2 ${isActive ? 'text-emerald-600' : 'text-emerald-400'}`} />}
        <span className="font-bold text-sm leading-tight">{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-bl-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Waypoints className="w-8 h-8 text-rose-400" />
          Interactive Logic Branching: จำลองการตัดเกรด (IF-ELIF-ELSE)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose">
          ลองป้อนคะแนนสอบ (0-100) แล้วกด <strong>"เริ่มการตรวจสอบเงื่อนไข"</strong> 
          เพื่อดูว่าลอจิกของโปรแกรมจะวิ่งไปตามเงื่อนไข (Branch) ไหนบ้าง
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Controls */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 mb-12 shadow-inner w-full max-w-2xl">
          <div className="flex-1 flex items-center justify-center gap-4 w-full">
            <span className="text-rose-300 font-mono font-bold text-lg">SCORE =</span>
            <input 
              type="number" 
              value={score} 
              onChange={(e) => setScore(Number(e.target.value))}
              disabled={running}
              min="0" max="100"
              className="bg-slate-950 border-2 border-rose-900 focus:border-rose-500 rounded-xl px-4 py-2 text-white font-mono text-xl w-24 text-center outline-none disabled:opacity-50"
            />
          </div>
          <button 
            onClick={handleRun}
            disabled={running}
            className="w-full md:w-auto bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/30 disabled:opacity-50"
          >
            <Play className="w-5 h-5 fill-current" /> เริ่มการตรวจสอบเงื่อนไข
          </button>
        </div>

        {/* Visualizer Flow */}
        <div className="flex flex-col items-center relative w-full overflow-x-auto pb-8">
           
           {/* Row 1: Start */}
           <div className="flex flex-col items-center mb-8">
             <div className={`px-6 py-2 rounded-full font-bold text-sm ${activeNode === 'start' ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
               จุดเริ่มต้น (Start)
             </div>
             <div className="w-1 h-8 bg-slate-700 mt-2"></div>
           </div>

           {/* Row 2: IF >= 80 */}
           <div className="flex items-start gap-8 relative mb-12">
             <NodeBox id="check-80" label="IF score >= 80" isCondition={true} />
             
             {/* True Path */}
             <div className="flex flex-col items-center pt-8">
               <div className="flex items-center absolute left-[8rem] top-10">
                 <div className={`w-8 h-1 ${activeNode === 'grade-a' || (activeNode === 'check-80' && score >= 80) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <span className="text-xs text-emerald-400 font-bold px-2">TRUE</span>
                 <div className={`w-8 h-1 ${activeNode === 'grade-a' || (activeNode === 'check-80' && score >= 80) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <div className={`w-0 h-0 border-t-4 border-t-transparent border-l-8 ${activeNode === 'grade-a' || (activeNode === 'check-80' && score >= 80) ? 'border-l-emerald-500' : 'border-l-slate-700'} border-b-4 border-b-transparent`}></div>
               </div>
             </div>
             
             <NodeBox id="grade-a" label="PRINT 'A'" isResult={true} />
             
             {/* False Path Line (down) */}
             <div className={`absolute left-16 top-[80px] w-1 h-12 ${activeNode === 'check-70' || (activeNode === 'check-80' && score < 80) ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <span className="absolute left-[70px] top-[95px] text-xs text-rose-400 font-bold bg-slate-900 px-1 z-10">FALSE</span>
           </div>

           {/* Row 3: ELIF >= 70 */}
           <div className="flex items-start gap-8 relative mb-12">
             <NodeBox id="check-70" label="ELIF score >= 70" isCondition={true} />
             
             <div className="flex flex-col items-center pt-8">
               <div className="flex items-center absolute left-[8rem] top-10">
                 <div className={`w-8 h-1 ${activeNode === 'grade-b' || (activeNode === 'check-70' && score >= 70) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <span className="text-xs text-emerald-400 font-bold px-2">TRUE</span>
                 <div className={`w-8 h-1 ${activeNode === 'grade-b' || (activeNode === 'check-70' && score >= 70) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <div className={`w-0 h-0 border-t-4 border-t-transparent border-l-8 ${activeNode === 'grade-b' || (activeNode === 'check-70' && score >= 70) ? 'border-l-emerald-500' : 'border-l-slate-700'} border-b-4 border-b-transparent`}></div>
               </div>
             </div>
             
             <NodeBox id="grade-b" label="PRINT 'B'" isResult={true} />
             
             <div className={`absolute left-16 top-[80px] w-1 h-12 ${activeNode === 'check-60' || (activeNode === 'check-70' && score < 70) ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <span className="absolute left-[70px] top-[95px] text-xs text-rose-400 font-bold bg-slate-900 px-1 z-10">FALSE</span>
           </div>

           {/* Row 4: ELIF >= 60 */}
           <div className="flex items-start gap-8 relative mb-12">
             <NodeBox id="check-60" label="ELIF score >= 60" isCondition={true} />
             
             <div className="flex flex-col items-center pt-8">
               <div className="flex items-center absolute left-[8rem] top-10">
                 <div className={`w-8 h-1 ${activeNode === 'grade-c' || (activeNode === 'check-60' && score >= 60) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <span className="text-xs text-emerald-400 font-bold px-2">TRUE</span>
                 <div className={`w-8 h-1 ${activeNode === 'grade-c' || (activeNode === 'check-60' && score >= 60) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <div className={`w-0 h-0 border-t-4 border-t-transparent border-l-8 ${activeNode === 'grade-c' || (activeNode === 'check-60' && score >= 60) ? 'border-l-emerald-500' : 'border-l-slate-700'} border-b-4 border-b-transparent`}></div>
               </div>
             </div>
             
             <NodeBox id="grade-c" label="PRINT 'C'" isResult={true} />
             
             <div className={`absolute left-16 top-[80px] w-1 h-12 ${activeNode === 'check-50' || (activeNode === 'check-60' && score < 60) ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <span className="absolute left-[70px] top-[95px] text-xs text-rose-400 font-bold bg-slate-900 px-1 z-10">FALSE</span>
           </div>

           {/* Row 5: ELIF >= 50 and ELSE */}
           <div className="flex items-start gap-8 relative">
             <NodeBox id="check-50" label="ELIF score >= 50" isCondition={true} />
             
             <div className="flex flex-col items-center pt-8">
               <div className="flex items-center absolute left-[8rem] top-10">
                 <div className={`w-8 h-1 ${activeNode === 'grade-d' || (activeNode === 'check-50' && score >= 50) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <span className="text-xs text-emerald-400 font-bold px-2">TRUE</span>
                 <div className={`w-8 h-1 ${activeNode === 'grade-d' || (activeNode === 'check-50' && score >= 50) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                 <div className={`w-0 h-0 border-t-4 border-t-transparent border-l-8 ${activeNode === 'grade-d' || (activeNode === 'check-50' && score >= 50) ? 'border-l-emerald-500' : 'border-l-slate-700'} border-b-4 border-b-transparent`}></div>
               </div>
             </div>
             
             <NodeBox id="grade-d" label="PRINT 'D'" isResult={true} />
             
             {/* ELSE branch */}
             <div className={`absolute left-16 top-[80px] w-1 h-12 ${activeNode === 'grade-f' || (activeNode === 'check-50' && score < 50) ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
             <span className="absolute left-[70px] top-[95px] text-xs text-rose-400 font-bold bg-slate-900 px-1 z-10">FALSE (ELSE)</span>
             
             {/* ELSE Result */}
             <div className="absolute left-0 top-[128px]">
               <NodeBox id="grade-f" label="PRINT 'F'" isResult={true} />
             </div>
           </div>

        </div>

        {/* Final Result Display */}
        {result && (
          <div className="mt-28 bg-emerald-900/50 border border-emerald-500/50 rounded-xl px-8 py-4 flex items-center gap-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div className="text-emerald-300 font-bold text-xl">
              จบโปรแกรม: ผลลัพธ์คือ <span className="text-white text-2xl ml-2">{result}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NestedIfVisualizer = () => {
  const [hasTicket, setHasTicket] = useState(false);
  const [isVip, setIsVip] = useState(false);

  return (
     <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner my-10">
       <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
         <Workflow className="w-6 h-6 text-indigo-500" /> Interactive: เงื่อนไขซ้อนทับ (ตั๋วคอนเสิร์ต)
       </h4>
       
       <div className="flex flex-col md:flex-row gap-8 mb-8">
         <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h5 className="font-bold text-slate-700 mb-4">กำหนดสถานะของคุณ:</h5>
            <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100" onClick={() => setHasTicket(!hasTicket)}>
               <span className="font-semibold text-slate-700">1. คุณมีตั๋วเข้างานหรือไม่?</span>
               <div className={`w-12 h-6 rounded-full p-1 transition-colors ${hasTicket ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hasTicket ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </div>
            </div>
            
            <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${hasTicket ? 'bg-slate-50 border-slate-100 cursor-pointer hover:bg-slate-100' : 'bg-slate-100 border-transparent opacity-50 cursor-not-allowed'}`} onClick={() => hasTicket && setIsVip(!isVip)}>
               <span className="font-semibold text-slate-700">2. ตั๋วของคุณเป็นแบบ VIP ใช่ไหม?</span>
               <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isVip && hasTicket ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isVip && hasTicket ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">*คำถามที่ 2 จะทำได้ก็ต่อเมื่อมีตั๋ว (คำถามที่ 1 เป็นจริง)</p>
         </div>

         <div className="flex-1 bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-center">
            <div className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">ผลลัพธ์การตรวจสอบ (OUTPUT)</div>
            
            {!hasTicket ? (
              <div className="flex items-center gap-4 animate-pulse">
                <XCircle className="w-10 h-10 text-rose-500 shrink-0" />
                <span className="text-rose-400 font-bold text-xl leading-relaxed">
                  กลับบ้านได้เลยครับ<br/>คุณไม่มีตั๋วเข้างาน!
                </span>
              </div>
            ) : hasTicket && isVip ? (
              <div className="flex items-center gap-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-bold text-xl leading-relaxed">
                  เชิญเข้างานครับ!<br/>แถมสิทธิ์เข้าเลานจ์ VIP พิเศษให้ด้วย
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 shrink-0" />
                <span className="text-emerald-400 font-bold text-xl leading-relaxed">
                  เชิญเข้างานครับ!<br/>โซนทั่วไป เชิญทางขวาครับ
                </span>
              </div>
            )}
         </div>
       </div>

       <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm leading-loose">
         <div className="text-sky-400">IF <span className="text-white">hasTicket == True</span> THEN</div>
         <div className="pl-6 text-slate-400">PRINT "เชิญเข้างานครับ"</div>
         <div className="pl-6 text-rose-400">IF <span className="text-white">isVip == True</span> THEN <span className="text-slate-500 text-xs ml-2">// นี่คือเงื่อนไขซ้อนทับ (Nested IF)</span></div>
         <div className="pl-12 text-slate-400">PRINT "แถมสิทธิ์เข้าเลานจ์ VIP"</div>
         <div className="pl-6 text-rose-400">ELSE</div>
         <div className="pl-12 text-slate-400">PRINT "โซนทั่วไป เชิญทางขวา"</div>
         <div className="pl-6 text-rose-400">END IF</div>
         <div className="text-sky-400">ELSE</div>
         <div className="pl-6 text-slate-400">PRINT "กลับบ้านได้เลยครับ ไม่มีตั๋ว"</div>
         <div className="text-sky-400">END IF</div>
       </div>
     </div>
  );
};

const pyUnit2_5_PseudoCondition = () => {
  const teacherTaskContent = `
    ให้นักเรียนเขียนรหัสเทียม (Pseudocode) จากเงื่อนไขต่อไปนี้:
    1. รับค่า "อายุ" (Age) ของผู้ใช้งาน
    2. ถ้าอายุ >= 60 ปี ให้พิมพ์ "ผู้สูงอายุ"
    3. ถ้าอายุ >= 18 ปี ให้พิมพ์ "ผู้ใหญ่"
    4. ถ้าอายุต่ำกว่า 18 ปี ให้พิมพ์ "เด็กและเยาวชน"
    (คำใบ้: ใช้โครงสร้างแบบ IF-ELIF-ELSE)
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
           <h3 className="text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-4">
             <GitBranch className="w-10 h-10 text-rose-500" />
             รหัสเทียมแบบมีเงื่อนไข (Condition)
           </h3>
           <p className="text-xl text-slate-600 leading-loose">
             ในชีวิตจริงเรามักจะต้อง <strong>"ตัดสินใจ"</strong> เสมอ เช่น ถ้าฝนตกจะกางร่ม ถ้าแดดออกจะใส่หมวก 
             คอมพิวเตอร์ก็เช่นกัน โปรแกรมที่ฉลาดจะต้องรู้จักเลือกการทำงานตาม "เงื่อนไข" ที่กำหนดไว้ 
             ซึ่งในภาษาโปรแกรมเราจะใช้คำสั่ง <code>IF</code> (ถ้า) เป็นตัวตัดสินใจ
           </p>
        </div>

        {/* 2.5.1 IF */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-12 flex flex-col lg:flex-row gap-10 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full lg:w-1/2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">1</div>
                เงื่อนไขทางเลือกเดียว (IF)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                เป็นเงื่อนไขแบบง่ายที่สุด คือตรวจสอบว่าเงื่อนไข <strong>เป็นจริง (True)</strong> หรือไม่ 
                ถ้าเป็นจริง โปรแกรมจะทำงานในบล็อกที่กำหนด แต่ถ้า <strong>เป็นเท็จ (False)</strong> โปรแกรมจะข้ามบล็อกนั้นไปเลย (ทำเป็นไม่สนใจ)
              </p>
              <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl">
                 <strong className="text-rose-800 block mb-2">ตัวอย่างในชีวิตจริง:</strong>
                 <p className="text-rose-700 leading-loose text-sm">
                   "ถ้าเงินในกระเป๋ามากกว่า 100 บาท (IF) ให้ซื้อชานมไข่มุก (THEN)" 
                   (แต่ถ้าเงินไม่ถึง ก็ไม่ต้องซื้ออะไร เดินกลับบ้านเฉยๆ)
                 </p>
              </div>
           </div>
           <div className="w-full lg:w-1/2">
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-loose shadow-xl">
                 <div className="text-slate-500 mb-2">// โครงสร้างรหัสเทียม IF</div>
                 <div className="text-sky-400">IF <span className="text-rose-300">condition</span> THEN</div>
                 <div className="pl-6 text-slate-300">statement 1</div>
                 <div className="pl-6 text-slate-300">statement 2</div>
                 <div className="text-sky-400">END IF</div>
              </div>
           </div>
        </div>

        {/* 2.5.2 IF-ELSE */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-200/50 mb-12 flex flex-col lg:flex-row gap-10 items-center hover:-translate-y-1 transition-transform">
           <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-loose shadow-xl">
                 <div className="text-slate-500 mb-2">// โครงสร้างรหัสเทียม IF-ELSE</div>
                 <div className="text-sky-400">IF <span className="text-rose-300">condition</span> THEN</div>
                 <div className="pl-6 text-slate-300">statement (ทำเมื่อเป็นจริง)</div>
                 <div className="text-sky-400">ELSE</div>
                 <div className="pl-6 text-slate-300">statement (ทำเมื่อเป็นเท็จ)</div>
                 <div className="text-sky-400">END IF</div>
              </div>
           </div>
           <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">2</div>
                เงื่อนไขแบบสองทางเลือก (IF-ELSE)
              </h4>
              <p className="text-slate-600 leading-loose text-lg mb-6">
                อัปเกรดความฉลาดขึ้นมาอีกนิด โปรแกรมจะมีทางเลือก 2 ทางเสมอ คือถ้าเงื่อนไข <strong>เป็นจริง (True)</strong> ให้ทำอย่างหนึ่ง 
                แต่ถ้า <strong>เป็นเท็จ (False)</strong> ให้ไปทำอีกอย่างหนึ่งแทน (ไม่มีการข้ามไปเฉยๆ แบบ IF ปกติ)
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
                 <strong className="text-indigo-800 block mb-2">ตัวอย่างในชีวิตจริง:</strong>
                 <p className="text-indigo-700 leading-loose text-sm">
                   "ถ้าฝนตก (IF) ให้กางร่ม (THEN) มิฉะนั้น (ELSE) ให้ใส่แว่นกันแดด"
                 </p>
              </div>
           </div>
        </div>

        {/* 2.5.3 IF-ELIF-ELSE */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-rose-500 mt-20">
          เงื่อนไขแบบหลายทางเลือก (IF-ELIF-ELSE)
        </h3>
        <p className="text-slate-600 text-lg leading-loose mb-10">
          เมื่อโลกนี้ไม่ได้มีแค่ ขาวกับดำ (True กับ False) แต่มีหลายทางเลือกให้พิจารณา เช่น การตัดเกรดที่มีทั้ง A, B, C, D, F 
          เราจะใช้คำสั่ง <code>ELIF</code> (ย่อมาจาก Else If หรือ "มิฉะนั้นถ้า") เข้ามาช่วยตรวจสอบเงื่อนไขถัดไปเรื่อยๆ
        </p>

        {/* Visualizer Simulator */}
        <LogicVisualizer />

        {/* 2.5.4 Nested IF */}
        <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-purple-500 mt-20">
          การเขียนเงื่อนไขซ้อนทับ (NESTED IF)
        </h3>
        <p className="text-slate-600 text-lg leading-loose mb-10">
          ในบางครั้ง การตัดสินใจจะมีความซับซ้อนมาก เช่น ต้องผ่านเงื่อนไขแรกให้ได้ก่อน ถึงจะไปพิจารณาเงื่อนไขที่สองต่อได้ 
          ลักษณะที่มี <strong>"คำสั่ง IF ซ้อนอยู่ข้างในคำสั่ง IF อีกที"</strong> เรียกว่า Nested IF 
          (มักพบบ่อยในระบบยืนยันตัวตน เช่น ตรวจสอบ Username ผ่านก่อน ค่อยตรวจสอบ Password)
        </p>

        {/* Nested IF Simulator */}
        <NestedIfVisualizer />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 2.5)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_5_PseudoCondition;
