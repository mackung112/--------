import React, { useState, useEffect, useRef } from 'react';
import { History, Search, ChevronRight, RefreshCcw, CheckCircle2, Terminal, Code2, ShieldCheck, Zap, Globe, Users, Gift, Cpu, ArrowDown } from 'lucide-react';

const timeline = [
  { year: '1991', version: 'Python 0.9', feature: 'จุดเริ่มต้น', desc: 'Guido van Rossum สร้าง Python ขึ้นมาจากภาษา ABC รองรับ Exception Handling, Functions, Module', bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  { year: '2000', version: 'Python 2.0', feature: 'พร้อมใช้งานจริง', desc: 'เพิ่ม List Comprehension, Garbage Collection และ Unicode Support เบื้องต้น ทำให้ได้รับความนิยมสูง', bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-700' },
  { year: '2008', version: 'Python 3.0', feature: 'การเปลี่ยนแปลงครั้งใหญ่', desc: 'ปรับโครงสร้างใหม่ (ไม่รองรับโค้ดเก่า) เปลี่ยน print เป็นฟังก์ชัน ปรับ Unicode เป็นค่าเริ่มต้น', bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700' },
  { year: '2020', version: 'Python 3.9+', feature: 'ยุคความเร็ว', desc: 'เพิ่ม Type Hinting, Pattern Matching (3.10), ทำให้โค้ดอ่านง่ายและลดข้อผิดพลาด', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700' },
  { year: '2024', version: 'Python 3.13', feature: 'ไร้ขีดจำกัด', desc: 'นำ GIL ออก (Free-threading) และเริ่มใช้ JIT Compiler เบื้องต้น ทำให้ทำงานพร้อมกันหลายคอร์ได้จริง', bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' },
];

const strengths = [
  { icon: Code2, title: 'อ่านง่าย (Readable)', desc: 'ไวยากรณ์เหมือนภาษาอังกฤษ คนที่เพิ่งเริ่มเรียนก็เข้าใจได้เร็ว' },
  { icon: Zap, title: 'สั้นกระชับ (Concise)', desc: 'ใช้จำนวนบรรทัดน้อยกว่าภาษา C หรือ Java ในการแก้ปัญหาเดียวกัน' },
  { icon: Globe, title: 'ครอบจักรวาล (Versatile)', desc: 'ทำได้ตั้งแต่ Web, Data Science, AI, Game ยันคุม Hardware' },
  { icon: Users, title: 'ชุมชนใหญ่ (Community)', desc: 'มีผู้ใช้งานทั่วโลก ถ้าเจอปัญหา แค่ค้นหาใน Google ก็เจอทางแก้เสมอ' },
  { icon: Gift, title: 'ฟรีและเปิดกว้าง (Open Source)', desc: 'ใช้งานได้ฟรี 100% แม้กระทั่งเอาไปทำซอฟต์แวร์ขายในเชิงพาณิชย์' }
];

export default function PY21910_U1_L4_PythonTimeline() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showStrengths, setShowStrengths] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg, type }]);
  };

  const handleScan = (idx) => {
    setActiveIdx(idx);
    setScanned(false);
    setLogs([]);
    const item = timeline[idx];

    addLog(`Time Engine: Calibrating coordinates to year ${item.year}...`, "sys");
    
    setTimeout(() => {
      addLog(`Arrived at ${item.year}. Found ${item.version}.`, "warn");
      addLog(`Scanning features...`, "sys");
    }, 800);

    setTimeout(() => {
      addLog(`Feature extracted: ${item.feature}`, "success");
      setScanned(true);
      
      if (idx === timeline.length - 1) {
        setTimeout(() => {
          addLog("All eras explored. Analyzing global strengths...", "info");
          setShowStrengths(true);
        }, 1500);
      }
    }, 1800);
  };

  const resetSimulator = () => {
    setActiveIdx(null);
    setScanned(false);
    setLogs([]);
    setShowStrengths(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
              <History className="w-3 h-3" /> Timeline Explorer
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
              Simulator
            </span>
          </div>
          <button 
            onClick={resetSimulator}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> เริ่มใหม่
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">ประวัติศาสตร์และจุดเด่นของ Python</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          เดินทางข้ามเวลาเพื่อดูวิวัฒนาการของภาษา Python ตั้งแต่จุดเริ่มต้น จนถึงปัจจุบัน ว่ามีอะไรเปลี่ยนไปบ้าง
        </p>
      </div>

      {/* Interactive Explorer Container */}
      <div className="flex flex-col min-h-[500px]">
        {/* Top 2-Column Split */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Visual Area (The Timeline Console) */}
        <div className="w-full lg:w-1/2 bg-slate-100 p-6 flex flex-col gap-3 border-r border-slate-200 relative overflow-y-auto">
          
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" /> เลือกช่วงเวลาเพื่อสำรวจ
          </h4>

          <div className="space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Timeline Dot */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300
                  ${activeIdx === idx ? 'bg-indigo-500 border-indigo-200 scale-110 z-10' : 'bg-white border-slate-200 group-hover:border-indigo-300'}
                `}>
                  {activeIdx === idx && scanned ? <CheckCircle2 className="w-5 h-5 text-white" /> : <span className={`text-xs font-bold ${activeIdx === idx ? 'text-white' : 'text-slate-500'}`}>{idx+1}</span>}
                </div>
                
                {/* Timeline Card */}
                <button 
                  onClick={() => handleScan(idx)}
                  className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border-2 transition-all duration-300 text-left relative
                    ${activeIdx === idx ? `${item.bg} ${item.border} shadow-md scale-105 z-10` : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm opacity-80'}
                  `}
                >
                  <div className={`font-bold text-lg mb-1 ${activeIdx === idx ? item.text : 'text-slate-700'}`}>{item.year}</div>
                  <div className="text-xs font-bold text-slate-700">{item.version}</div>
                  
                  {/* Arrow pointer */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2
                    ${activeIdx === idx ? `${item.bg} ${item.border}` : 'bg-white border-slate-200'}
                    md:group-odd:right-[-7px] md:group-odd:border-l-0 md:group-odd:border-b-0
                    md:group-even:left-[-7px] md:group-even:border-r-0 md:group-even:border-t-0
                    left-[-7px] border-r-0 border-t-0 md:hidden
                  `}></div>
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Control / Explanation / Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          
          <div className="p-6 flex-1 overflow-y-auto">
            {activeIdx === null && (
              <div className="text-center text-slate-700 mt-20">
                <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>กดปุ่ม <b>ค.ศ. (ปี)</b> ทางด้านซ้าย<br/>เพื่อเริ่มการสแกนข้อมูลทางประวัติศาสตร์</p>
              </div>
            )}

            {activeIdx !== null && (
              <div className="animate-in slide-in-from-right-4 duration-500 mb-6">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${timeline[activeIdx].bg} ${timeline[activeIdx].text}`}>
                  {timeline[activeIdx].version}
                </div>
                <h4 className={`text-2xl font-bold mb-2 ${timeline[activeIdx].text}`}>
                  {scanned ? timeline[activeIdx].feature : 'กำลังสแกน...'}
                </h4>
                
                {scanned && (
                  <p className="text-slate-700 leading-relaxed mb-4 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                    {timeline[activeIdx].desc}
                  </p>
                )}
                
                {scanned && activeIdx === 2 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Python 3.0 หักดิบโดยไม่รองรับโค้ดเก่า (Backward Incompatible) เพื่อวางรากฐานให้ภาษาดีขึ้นระยะยาว</span>
                  </div>
                )}
                
                {scanned && activeIdx === 4 && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-800 flex items-start gap-2 mb-4">
                    <Cpu className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Free-threading ใน 3.13 คือการปลดล็อกข้อจำกัดใหญ่ของ Python ที่เคยกีดกันไม่ให้ CPU ทำงาน 100% ทุกคอร์พร้อมกันได้</span>
                  </div>
                )}
              </div>
            )}

            {/* Strengths Section */}
            {showStrengths && (
              <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 mt-8 pt-6 border-t-2 border-dashed border-slate-200">
                <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-amber-500" /> ทำไม Python ถึงยอดเยี่ยม?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {strengths.map((str, i) => {
                    const Icon = str.icon;
                    return (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-amber-300 hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                          <h5 className="font-bold text-slate-800 text-sm">{str.title}</h5>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{str.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div ref={scrollContainerRef} className="h-48 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full border-t border-slate-800">
            <div className="absolute top-2 right-3 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {activeIdx !== null && !scanned && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${activeIdx !== null && !scanned ? 'bg-green-500' : 'bg-slate-600'}`}></span>
              </span>
              <span className="text-slate-700 text-[10px] uppercase tracking-wider">Time Scanner Log</span>
            </div>

            <div className="mt-3 space-y-1.5 font-mono text-[13px] leading-relaxed flex-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-slate-700 mr-3 shrink-0">[{log.time}]</span>
                  <span className={`shrink-0 w-10 font-bold ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warn' ? 'text-amber-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'sys' ? 'text-blue-400' : 'text-slate-300'
                  }`}>
                    {log.type === 'error' ? 'ERR' : log.type === 'warn' ? 'WRN' : log.type === 'success' ? 'OK ' : 'SYS'}
                  </span>
                  <span className={`flex-1 ${
                    log.type === 'error' ? 'text-red-300' :
                    log.type === 'warn' ? 'text-amber-300' :
                    log.type === 'success' ? 'text-emerald-300' :
                    log.type === 'sys' ? 'text-blue-200' : 'text-slate-300'
                  }`}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && <div className="text-slate-600 italic">Awaiting coordinates...</div>}
            </div>
          </div>
      </div>
    </div>
  );
}
