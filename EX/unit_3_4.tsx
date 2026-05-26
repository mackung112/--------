import React, { useState, useEffect } from 'react';
import { 
  Percent, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  AlertTriangle,
  ArrowRight,
  Target,
  FlaskConical,
  Ruler,
  Bug,
  Check,
  Scissors
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
      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-sky-100 rounded-2xl text-sky-600 border border-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-sky-100 text-sky-600 border border-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]'
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

const FloatSimulator = () => {
  const [val1, setVal1] = useState('0.1');
  const [val2, setVal2] = useState('0.2');
  const [roundDigits, setRoundDigits] = useState(1);

  // Compute the actual JavaScript float logic (which is exactly the same IEEE 754 as Python)
  const num1 = parseFloat(val1) || 0;
  const num2 = parseFloat(val2) || 0;
  const rawResult = num1 + num2;
  
  // Safe rounding for simulation
  const multiplier = Math.pow(10, roundDigits);
  const roundedResult = Math.round(rawResult * multiplier) / multiplier;

  const isAnomaly = rawResult.toString().length > 10;

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Bug className="w-6 h-6 text-sky-500" />
          เครื่องจำลองปัญหาทศนิยม (Precision Anomaly)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองบวกเลข <code className="bg-slate-100 text-sky-600 px-1 rounded">0.1 + 0.2</code> เพื่อดูว่าคอมพิวเตอร์คำนวณได้ 0.3 เป๊ะๆ หรือไม่?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* Left: Input */}
        <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-200 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-2 w-1/3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ค่าที่ 1</label>
              <input 
                type="number" 
                step="0.1"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full text-center text-3xl font-bold font-mono bg-white border-2 border-slate-200 rounded-2xl py-4 focus:border-sky-400 focus:outline-none transition-colors"
              />
            </div>
            <div className="text-4xl font-bold text-slate-300 pb-2">+</div>
            <div className="flex flex-col items-center gap-2 w-1/3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ค่าที่ 2</label>
              <input 
                type="number" 
                step="0.1"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full text-center text-3xl font-bold font-mono bg-white border-2 border-slate-200 rounded-2xl py-4 focus:border-sky-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
             <Target className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
             <p>คอมพิวเตอร์เก็บข้อมูลเป็นฐานสอง (0 และ 1) ทำให้เศษส่วนฐานสิบอย่าง 0.1 หรือ 0.2 ไม่สามารถแปลงเป็นฐานสองได้ลงตัวเป๊ะๆ จึงเกิดเศษตกค้างเล็กน้อยที่ปลายหาง!</p>
          </div>
        </div>

        {/* Right: Output & Rounding */}
        <div className="flex flex-col gap-6">
          
          {/* Raw Output */}
          <div className={`p-6 rounded-[2rem] border-2 relative overflow-hidden transition-colors ${
            isAnomaly ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className={isAnomaly ? 'text-rose-500' : 'text-slate-400'}>ผลลัพธ์ดิบ (Raw Output)</span>
              {isAnomaly && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">Precision Anomaly Detected!</span>}
            </div>
            <div className={`font-mono text-2xl md:text-3xl font-bold break-all ${isAnomaly ? 'text-rose-600' : 'text-slate-700'}`}>
              {rawResult}
            </div>
          </div>

          {/* Rounding Tool */}
          <div className="bg-slate-900 rounded-[2rem] p-6 border border-slate-800 shadow-xl text-white flex flex-col justify-between flex-grow">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sky-400 font-bold flex items-center gap-2"><Scissors className="w-4 h-4"/> แก้ไขด้วย round()</span>
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                  <button onClick={() => setRoundDigits(Math.max(0, roundDigits - 1))} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-mono">-</button>
                  <span className="font-mono text-sm w-12 text-center">{roundDigits} ตำแหน่ง</span>
                  <button onClick={() => setRoundDigits(Math.min(5, roundDigits + 1))} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-mono">+</button>
                </div>
              </div>
              <code className="block bg-black/50 p-3 rounded-xl font-mono text-sm border border-slate-700 mb-4">
                <span className="text-yellow-200">print</span>(<span className="text-emerald-400">round</span>(<span className="text-blue-300">val1 + val2</span>, <span className="text-amber-400">{roundDigits}</span>))
              </code>
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <span className="text-slate-500 text-sm">ผลลัพธ์หลังปัดเศษ:</span>
              <span className="text-emerald-400 font-mono text-3xl font-bold flex items-center gap-2">
                {roundedResult} <Check className="w-6 h-6" />
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักคณิตศาสตร์คอมพิวเตอร์"

ข้อที่ 1: เครื่องคิดเลข BMI (แบบแม่นยำ)
ให้นักเรียนเขียนโปรแกรมรับน้ำหนัก (kg) และ ส่วนสูง (m) เป็นทศนิยม (float) 
จากนั้นคำนวณค่า BMI (น้ำหนัก / ส่วนสูงยกกำลังสอง) 
และใช้ฟังก์ชัน round() หรือ f-string เพื่อแสดงผลลัพธ์ทศนิยมแค่ 2 ตำแหน่ง

ตัวอย่างผลรัน:
น้ำหนัก (kg): 65.5
ส่วนสูง (m): 1.75
ค่า BMI ของคุณคือ: 21.39

ข้อที่ 2: ปัญหา 0.1 + 0.2
ให้นักเรียนพิมพ์โค้ดบรรทัดนี้ลงในโปรแกรม:
print(0.1 + 0.2 == 0.3)
ผลลัพธ์ที่ได้คือ True หรือ False? ให้อธิบายว่าทำไมถึงเป็นเช่นนั้น และจะแก้ปัญหานี้ให้เงื่อนไขเป็น True ได้อย่างไรโดยใช้ฟังก์ชัน round()`;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-800 pb-24 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-sky-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              ข้อมูลทศนิยม <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">(Floating Point / float)</span>
            </h1>
          </div>
          
          <div className="pt-6 border-l-4 border-sky-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              ในโลกความจริง ข้อมูลไม่ได้มีแค่จำนวนเต็มเสมอไป การวัดส่วนสูง อุณหภูมิ หรือจำนวนเงิน มักต้องการ <strong>ความละเอียด (Precision)</strong> เราจึงต้องใช้ข้อมูลชนิด <code className="bg-sky-100 text-sky-700 px-1 rounded">float</code> เพื่อเก็บตัวเลขที่มีจุดทศนิยม
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section 3.4.1 Characteristic */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Ruler className="w-6 h-6 text-sky-500" />
            3.4.1 ลักษณะของข้อมูลประเภททศนิยม
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Decimal */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-sky-200 transition-all group">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="font-bold text-2xl leading-none">.</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">มีจุดทศนิยมเสมอ</h3>
              <p className="text-sm text-slate-600 mb-4">แค่ใส่จุด <code>.</code> เข้าไป Python จะมองว่าเป็น float ทันที แม้ข้างหลังจุดจะเป็นเลข 0 ก็ตาม</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-sky-600 font-bold">3.14</span></div>
                <div><span className="text-sky-600 font-bold">-0.001</span></div>
                <div><span className="text-sky-600 font-bold">5.0</span> <span className="text-slate-400 text-xs"># นี่คือ float ไม่ใช่ int</span></div>
              </div>
            </div>

            {/* Card 2: Scientific Notation */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-lg hover:border-sky-200 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">สัญกรณ์วิทยาศาสตร์</h3>
              <p className="text-sm text-slate-600 mb-4">ใช้ตัว <code>e</code> หรือ <code>E</code> เพื่อแทนคำว่า "คูณ 10 ยกกำลัง" เหมาะกับเลขที่ใหญ่มากหรือเล็กมากๆ</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-sm space-y-1">
                <div><span className="text-indigo-600 font-bold">1.5e3</span> <span className="text-slate-400 text-xs"># = 1500.0</span></div>
                <div><span className="text-indigo-600 font-bold">2.5e-2</span> <span className="text-slate-400 text-xs"># = 0.025</span></div>
              </div>
            </div>

            {/* Card 3: Type Casting float() */}
            <div className="bg-slate-900 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-sky-900/50 text-sky-400 border border-sky-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform font-mono font-bold">
                  f()
                </div>
                <h3 className="font-bold text-sky-300 text-lg mb-3">การแปลงเป็นทศนิยม</h3>
                <p className="text-sm text-slate-400 mb-4">ใช้คำสั่ง <code>float()</code> เพื่อแปลงข้อมูลตัวอักษรหรือจำนวนเต็ม ให้กลายเป็นเลขทศนิยม</p>
                <div className="bg-black/40 p-3 rounded-xl border border-slate-700 font-mono text-xs text-sky-400 space-y-1">
                  <div>float(<span className="text-green-400">"3.5"</span>) <span className="text-slate-500">→ 3.5</span></div>
                  <div>float(<span className="text-amber-400">10</span>) <span className="text-slate-500">→ 10.0</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.4.2 Formatting & Rounding */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-12 border border-slate-200 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-50 rounded-tl-full pointer-events-none -z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
              <Percent className="w-8 h-8 text-sky-500" />
              3.4.2 การจัดการความแม่นยำ (Precision & Rounding)
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              เมื่อเราคำนวณเลขทศนิยม (โดยเฉพาะเรื่องเงินทอง) เรามักต้องการแสดงผลลัพธ์แค่ 2 ตำแหน่ง ใน Python มี 2 วิธีหลักๆ ในการจัดการทศนิยมส่วนเกิน
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Method 1: round() */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-sky-50 px-6 py-4 border-b border-slate-200">
                  <h4 className="font-bold text-sky-800">วิธีที่ 1: ใช้ฟังก์ชัน round()</h4>
                  <p className="text-sm text-sky-600">แปลงค่าตัวเลขให้ถูกปัดเศษจริงๆ นำไปคำนวณต่อได้</p>
                </div>
                <div className="p-6 bg-slate-900 font-mono text-sm leading-loose">
                  <span className="text-slate-500"># รูปแบบ: round(ตัวเลข, จำนวนตำแหน่ง)</span><br/>
                  <span className="text-blue-400">pi_value</span> = <span className="text-amber-400">3.14159265</span><br/>
                  <span className="text-blue-400">short_pi</span> = <span className="text-emerald-400 font-bold">round</span>(<span className="text-blue-400">pi_value</span>, <span className="text-amber-400">2</span>)<br/>
                  <span className="text-yellow-200">print</span>(<span className="text-blue-400">short_pi</span>) <span className="text-slate-500"># Output: 3.14</span>
                </div>
              </div>

              {/* Method 2: f-string */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-50 px-6 py-4 border-b border-slate-200">
                  <h4 className="font-bold text-indigo-800">วิธีที่ 2: ใช้ f-string formatting</h4>
                  <p className="text-sm text-indigo-600">จัดการตอนแสดงผลเท่านั้น (ค่าจริงในตัวแปรไม่เปลี่ยน)</p>
                </div>
                <div className="p-6 bg-slate-900 font-mono text-sm leading-loose">
                   <span className="text-slate-500"># รูปแบบ: {`{ตัวแปร:.2f}`} หมายถึง ทศนิยม 2 ตำแหน่ง</span><br/>
                  <span className="text-blue-400">price</span> = <span className="text-amber-400">199.999</span><br/>
                  <span className="text-yellow-200">print</span>(<span className="text-green-400">f"ราคา: <span className="text-blue-300">{`{price:.2f}`}</span> บาท"</span>)<br/>
                  <span className="text-slate-500"># Output: ราคา: 200.00 บาท</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <FloatSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />
        
        {/* Next Unit Recommendation */}
        <div className="mt-16 flex justify-end">
          <div className="bg-sky-50 border border-sky-100 px-6 py-4 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group">
            <div className="text-right">
              <p className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">หัวข้อถัดไป</p>
              <h4 className="text-slate-800 font-bold group-hover:text-sky-700 transition-colors">3.5 ข้อมูลข้อความ (String)</h4>
            </div>
            <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors shadow-lg shadow-sky-200">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}