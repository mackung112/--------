import React, { useState } from 'react';
import {
  Database,
  Copy,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Trash2,
  Box,
  Link,
  Cpu,
  FileDigit
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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
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

const MemoryXRaySimulator = () => {
  const [step, setStep] = useState(0);

  // States of memory based on steps
  // Step 0: x = 10
  // Step 1: y = x
  // Step 2: x = 20 (Garbage collection simulation if 10 has no refs, but y points to 10)
  // Step 3: y = 20 (10 is garbage collected)

  const variables = [
    { name: 'x', targetId: step < 2 ? 'mem-10' : 'mem-20' },
    { name: 'y', targetId: step === 0 ? null : (step < 3 ? 'mem-10' : 'mem-20') }
  ];

  const objects = [
    { id: 'mem-10', value: '10', type: 'int', address: '0x7ffd10' },
    { id: 'mem-20', value: '20', type: 'int', address: '0x7ffd20' }
  ];

  const getRefsCount = (objId) => {
    return variables.filter(v => v.targetId === objId).length;
  };

  const getCodeForStep = () => {
    if (step === 0) return "x = 10";
    if (step === 1) return "x = 10\ny = x";
    if (step === 2) return "x = 10\ny = x\nx = 20";
    if (step === 3) return "x = 10\ny = x\nx = 20\ny = 20";
    return "";
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const resetStep = () => {
    setStep(0);
  };

  return (
    <div className="my-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 text-emerald-400">
              <Cpu className="w-8 h-8" />
              เครื่องเอ็กซเรย์หน่วยความจำ (Memory X-Ray)
            </h3>
            <p className="text-slate-400 text-lg">ดูการชี้ของตัวแปรไปยังออบเจกต์ในหน่วยความจำ RAM ทีละสเต็ป</p>
          </div>
          <div className="flex gap-2">
            <button onClick={resetStep} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">Reset</button>
            <button onClick={nextStep} disabled={step >= 3} className={`px-4 py-2 rounded-xl font-bold transition-colors ${step >= 3 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'}`}>
              Next Step <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Code Execution */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-slate-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex-1 flex flex-col">
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Python Script</span>
                <span className="text-xs font-mono text-emerald-400">Step {step + 1}/4</span>
              </div>
              <div className="p-6 font-mono text-sm leading-loose whitespace-pre-wrap flex-1">
                <span className="text-emerald-400 font-bold">{getCodeForStep()}</span>
              </div>
            </div>
          </div>

          {/* Memory Visualizer */}
          <div className="lg:col-span-8 bg-slate-800/80 border border-slate-700 p-8 rounded-2xl relative flex flex-col md:flex-row justify-between items-center gap-12">
            
            {/* Variables (Names) */}
            <div className="flex flex-col gap-8 w-1/3 z-10">
              <div className="text-center text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Variables (Name)</div>
              {variables.map(v => (
                <div key={v.name} className={`h-16 flex items-center justify-center rounded-xl border-2 transition-all duration-500 ${v.targetId ? 'bg-slate-700 border-slate-500' : 'bg-slate-900 border-slate-800 border-dashed opacity-50'}`}>
                  <span className="font-mono text-2xl font-bold text-white">{v.name}</span>
                </div>
              ))}
            </div>

            {/* Links / Arrows (Simulated visually for now) */}
            <div className="hidden md:flex flex-col justify-center gap-8 w-1/3 text-emerald-500/50 z-0 relative h-full">
              {/* Very simplified visual representation of arrows since exact SVG drawing is complex without canvas */}
              <div className="flex justify-center items-center h-full">
                <ArrowRight className="w-12 h-12 text-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Memory Objects */}
            <div className="flex flex-col gap-8 w-1/3 z-10">
              <div className="text-center text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">RAM (Objects)</div>
              {objects.map(obj => {
                const refsCount = getRefsCount(obj.id);
                const isGarbage = step > 0 && refsCount === 0;

                return (
                  <div key={obj.id} className={`p-4 rounded-xl border-2 transition-all duration-700 relative ${isGarbage ? 'bg-rose-950/30 border-rose-900/50 opacity-40 scale-95' : 'bg-emerald-950 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'}`}>
                    
                    {isGarbage && (
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Trash2 className="w-10 h-10 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500 font-mono mb-1 flex justify-between">
                      <span>{obj.type}</span>
                      <span>{obj.address}</span>
                    </div>
                    <div className="text-3xl font-black font-mono text-center text-white my-2">{obj.value}</div>
                    
                    <div className="mt-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${refsCount > 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                        Refs: {refsCount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default function pyUnit3_8_MemoryVisualizer() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "สายลับตามรอยหน่วยความจำ"

ข้อที่ 1: การชี้ไปยังกล่องเดียวกัน
ให้นักเรียนวิเคราะห์โค้ดต่อไปนี้:
a = [1, 2, 3]
b = a
b.append(4)
print(a)
คำถาม: ตัวแปร a จะพิมพ์อะไรออกมา? เพราะเหตุใด? (ใบ้: a และ b ชี้ไปที่กล่องข้อมูลเดียวกันหรือไม่?)

ข้อที่ 2: หน้าที่ของคนเก็บขยะ (Garbage Collector)
จงอธิบายด้วยคำพูดของตนเองว่า Garbage Collector ในภาษา Python ทำหน้าที่อะไร? และจะทำความสะอาดกล่องข้อมูลเมื่อใด?`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[0%] w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-slate-200/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              การจัดสรรหน่วยความจำ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-slate-500">(Memory Allocation)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-emerald-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในภาษาโปรแกรมยุคเก่า นักพัฒนาต้องจองและคืนพื้นที่ RAM ด้วยตัวเอง แต่ใน Python ระบบจัดการทุกอย่างให้อัตโนมัติ! การเข้าใจว่า <strong>ตัวแปรเป็นเพียงแค่ "ป้ายชื่อ" ที่ชี้ไปยัง "กล่องข้อมูล"</strong> คือกุญแจสำคัญสู่การเขียนโค้ดไร้บั๊ก
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.8.1 หลักการเก็บข้อมูลในหน่วยความจำของตัวแปร */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-emerald-500" />
            3.8.1 หลักการเก็บข้อมูลในหน่วยความจำของตัวแปร
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Name */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-emerald-200 transition-all group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileDigit className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">ชื่อตัวแปร (Name)</h3>
              <p className="text-sm text-slate-600 mb-4">ตัวแปรใน Python ไม่ใช่กล่องใส่ของ แต่เป็นเหมือน <strong>"ป้ายแท็ก"</strong> ที่เอาไว้แปะเรียกสิ่งของนั้นๆ มากกว่า</p>
            </div>

            {/* Card 2: Object/Value */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">ออบเจกต์ (Object)</h3>
              <p className="text-sm text-slate-600 mb-4">คือตัวข้อมูลจริงๆ (เช่น เลข 10, ข้อความ "Hello") ซึ่งถูกสร้างและจัดเก็บไว้ในพื้นที่หน่วยความจำ (RAM)</p>
            </div>

            {/* Card 3: Reference */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Link className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-emerald-300 text-lg mb-3">การอ้างอิง (Reference)</h3>
                <p className="text-sm text-slate-400 mb-4">ป้ายชื่อ (ตัวแปร) จะมีเส้นเชือกโยงไปหา ออบเจกต์ ซึ่งป้ายชื่อหลายอันสามารถโยงมาที่ออบเจกต์เดียวกันได้!</p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.8.2 กระบวนการคืนพื้นที่หน่วยความจำ */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <FileDigit className="w-8 h-8 text-emerald-500" />
              3.8.2 กระบวนการคืนพื้นที่หน่วยความจำ (Garbage Collection)
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  ถ้าเราสร้างออบเจกต์ขึ้นมาเยอะแยะ พื้นที่ RAM จะไม่เต็มหรือ? 
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Python มีฮีโร่ลับที่ชื่อว่า <strong>Garbage Collector (คนเก็บขยะ)</strong> ซึ่งจะคอยนับจำนวนเส้นเชือก (Reference Count) ที่โยงมาหาแต่ละออบเจกต์
                </p>
                
                <div className="space-y-4">
                  <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl">
                    <h4 className="font-bold text-rose-800 mb-1 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" /> ทำลายอัตโนมัติเมื่อค่า Reference = 0
                    </h4>
                    <p className="text-rose-700 text-sm">หากไม่มีตัวแปรใดๆ ชี้ไปที่ออบเจกต์นั้นแล้ว (เส้นเชือกขาดหมด) Garbage Collector จะลบข้อมูลนั้นทิ้งและคืนพื้นที่ให้ RAM ทันที!</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Reference Counting</span>
                  </div>
                  <div className="p-6 font-mono text-sm leading-loose">
                    <span className="text-blue-400">a</span> = <span className="text-amber-400">100</span><br />
                    <span className="text-slate-500"># เลข 100 ถูกสร้างขึ้น และมี a ชี้อยู่ (Ref = 1)</span><br />
                    <br />
                    <span className="text-blue-400">b</span> = <span className="text-blue-400">a</span><br />
                    <span className="text-slate-500"># b ชี้ไปที่เลข 100 ด้วย (Ref = 2)</span><br />
                    <br />
                    <span className="text-blue-400">a</span> = <span className="text-amber-400">200</span><br />
                    <span className="text-slate-500"># a เปลี่ยนไปชี้เลข 200 แทน (เลข 100 เหลือ Ref = 1)</span><br />
                    <br />
                    <span className="text-blue-400">b</span> = <span className="text-green-400">"Hello"</span><br />
                    <span className="text-slate-500"># b เปลี่ยนไปชี้ข้อความแทน (เลข 100 เหลือ Ref = 0)</span><br />
                    <span className="text-rose-400 font-bold"># 💣 เลข 100 ถูกทำลายทิ้งโดย Garbage Collector!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulators */}
        <MemoryXRaySimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
