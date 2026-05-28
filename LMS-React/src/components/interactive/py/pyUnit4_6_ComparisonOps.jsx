import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Copy, 
  CheckCircle2, 
  BookOpen,
  AlertOctagon,
  Check,
  X,
  ArrowRightLeft,
  Search
} from 'lucide-react';



const ComparisonSimulator = () => {
  const [leftVal, setLeftVal] = useState('10');
  const [rightVal, setRightVal] = useState('5');
  const [operator, setOperator] = useState('>');
  const [result, setResult] = useState(true);

  const operators = [
    { symbol: '==', label: 'เท่ากับ' },
    { symbol: '!=', label: 'ไม่เท่ากับ' },
    { symbol: '>', label: 'มากกว่า' },
    { symbol: '<', label: 'น้อยกว่า' },
    { symbol: '>=', label: 'มากกว่าหรือเท่ากับ' },
    { symbol: '<=', label: 'น้อยกว่าหรือเท่ากับ' }
  ];

  useEffect(() => {
    // Determine types
    let a = isNaN(leftVal) || leftVal === '' ? leftVal : Number(leftVal);
    let b = isNaN(rightVal) || rightVal === '' ? rightVal : Number(rightVal);
    
    // Evaluate based on operator
    let res = false;
    if (operator === '==') res = a == b; // Using loose equality for simulation ease, though Python uses strict
    if (operator === '!=') res = a != b;
    if (operator === '>') res = a > b;
    if (operator === '<') res = a < b;
    if (operator === '>=') res = a >= b;
    if (operator === '<=') res = a <= b;

    setResult(res);
  }, [leftVal, rightVal, operator]);

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Scale className="w-6 h-6 text-amber-500" />
          เครื่องจำลองตาชั่งตรรกะ (Logic Scale)
        </h3>
        <p className="text-slate-500 mt-2">ทดลองใส่ค่าและเปลี่ยนเครื่องหมาย เพื่อดูผลลัพธ์ว่าสมการนี้เป็นจริง (True) หรือเท็จ (False)</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 relative z-10">
        
        {/* Left Input */}
        <div className="w-full lg:w-1/3">
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 focus-within:border-amber-400 focus-within:shadow-md transition-all">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">ข้อมูลฝั่งซ้าย</label>
            <input 
              type="text" 
              value={leftVal}
              onChange={(e) => setLeftVal(e.target.value)}
              className="w-full bg-transparent text-center text-3xl font-bold font-mono text-slate-700 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Operator Selector */}
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-2">
          <div className="relative group">
            <select 
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="appearance-none bg-slate-800 text-amber-400 text-3xl font-bold font-mono px-8 py-4 rounded-2xl border-2 border-slate-700 shadow-xl cursor-pointer hover:bg-slate-700 transition-colors text-center focus:outline-none"
            >
              {operators.map(op => (
                <option key={op.symbol} value={op.symbol}>{op.symbol}</option>
              ))}
            </select>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 whitespace-nowrap">
              {operators.find(op => op.symbol === operator)?.label}
            </div>
          </div>
        </div>

        {/* Right Input */}
        <div className="w-full lg:w-1/3">
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 focus-within:border-amber-400 focus-within:shadow-md transition-all">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">ข้อมูลฝั่งขวา</label>
            <input 
              type="text" 
              value={rightVal}
              onChange={(e) => setRightVal(e.target.value)}
              className="w-full bg-transparent text-center text-3xl font-bold font-mono text-slate-700 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="mt-16 flex flex-col items-center relative z-10">
        <div className="text-sm font-bold text-slate-400 mb-3 tracking-widest uppercase">ผลลัพธ์ (Result)</div>
        <div className={`px-12 py-4 rounded-[2rem] text-4xl font-black font-mono transition-all duration-500 shadow-2xl border-4 ${
          result 
            ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/40 scale-110' 
            : 'bg-rose-500 text-white border-rose-400 shadow-rose-500/40 scale-95 opacity-80'
        }`}>
          {result ? 'True' : 'False'}
        </div>
        <div className="mt-6 bg-slate-900 rounded-xl px-6 py-3 border border-slate-800 font-mono text-sm shadow-inner">
          <span className="text-yellow-200">print</span>(<span className="text-blue-300">{leftVal || '0'}</span> <span className="text-amber-500">{operator}</span> <span className="text-blue-300">{rightVal || '0'}</span>) 
          <span className="text-slate-500 mx-2"># Output:</span> 
          <span className={result ? 'text-emerald-400' : 'text-rose-400'}>{result ? 'True' : 'False'}</span>
        </div>
      </div>
    </div>
  );
};

export default function pyUnit4_6_ComparisonOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม: "ตรวจสอบสิทธิ์การเล่นเครื่องเล่น"
สวนสนุกแห่งหนึ่งมีกฎว่า ผู้ที่จะเล่นรถไฟเหาะได้ ต้องมีอายุ 12 ปีขึ้นไป และส่วนสูง 140 ซม. ขึ้นไป

ให้นักเรียนเขียนโปรแกรม:
1. รับค่าอายุ (age) และ ส่วนสูง (height) จากผู้ใช้ (ระวังชนิดข้อมูล)
2. ใช้ตัวดำเนินการเปรียบเทียบ (>=) เพื่อเช็คเงื่อนไข
3. แสดงผลทางหน้าจอเป็น True หรือ False 

# ตัวอย่างการเขียนโค้ด (ยังไม่ใช้ if)
age = int(input("อายุของคุณ: "))
height = int(input("ส่วนสูงของคุณ (ซม.): "))

# เก็บผลลัพธ์การเปรียบเทียบลงตัวแปร
is_old_enough = age >= 12
is_tall_enough = height >= 140

print(f"อายุผ่านเกณฑ์หรือไม่? : {is_old_enough}")
print(f"ส่วนสูงผ่านเกณฑ์หรือไม่? : {is_tall_enough}")`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-50/70 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Core Warning: = vs == */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-10 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 text-rose-400 font-bold mb-4 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-full text-sm">
              <AlertOctagon className="w-4 h-4" /> ข้อควรระวังระดับสูงสุด
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              อย่าสับสนระหว่าง <br/>
              <code className="text-amber-400 bg-slate-800 px-2 rounded font-mono">=</code> กับ <code className="text-emerald-400 bg-slate-800 px-2 rounded font-mono">==</code>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              เป็นบั๊ก (Bug) ที่พบบ่อยที่สุดในบรรดาผู้เริ่มต้นเขียนโปรแกรม การใช้เครื่องหมายผิดตัวจะทำให้โปรแกรมทำงานผิดพลาดทันที
            </p>
          </div>

          <div className="md:w-1/2 w-full flex flex-col gap-4 relative z-10">
            {/* Assignment = */}
            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-black font-mono text-amber-400 w-12 text-center">=</span>
                <div>
                  <h4 className="font-bold text-white">กำหนดค่า (Assignment)</h4>
                  <p className="text-sm text-slate-400">เอาของฝั่งขวา ไปใส่กล่องฝั่งซ้าย</p>
                </div>
              </div>
              <code className="block bg-black/50 p-2 rounded text-sm text-slate-300 font-mono mt-2 text-center">
                <span className="text-blue-400">score</span> <span className="text-amber-400">=</span> <span className="text-purple-400">100</span>
              </code>
            </div>

            {/* Comparison == */}
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-black font-mono text-emerald-400 w-12 text-center">==</span>
                <div>
                  <h4 className="font-bold text-white">เปรียบเทียบ (Equality)</h4>
                  <p className="text-sm text-slate-400">ถามว่าฝั่งซ้าย เท่ากับ ฝั่งขวาใช่หรือไม่?</p>
                </div>
              </div>
              <code className="block bg-black/50 p-2 rounded text-sm text-slate-300 font-mono mt-2 text-center">
                <span className="text-yellow-200">print</span>(<span className="text-blue-400">score</span> <span className="text-emerald-400">==</span> <span className="text-purple-400">100</span>) <span className="text-slate-500"># Output: True</span>
              </code>
            </div>
          </div>
        </div>

        {/* Operator List Table/Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Search className="w-6 h-6 text-orange-500" />
            ตารางเครื่องหมายเปรียบเทียบ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-blue-500 mb-2">==</div>
              <h3 className="font-bold text-slate-800 mb-1">เท่ากับ (Equal)</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ตรวจสอบว่าค่าทั้งสองฝั่งมีค่าเท่ากันหรือไม่</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                10 == 10 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-emerald-500 font-bold">True</span>
              </code>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-rose-500 mb-2">!=</div>
              <h3 className="font-bold text-slate-800 mb-1">ไม่เท่ากับ (Not Equal)</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ตรวจสอบว่าค่าทั้งสองฝั่งมีค่า <strong>ไม่ตรงกัน</strong> ใช่หรือไม่</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                5 != 10 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-emerald-500 font-bold">True</span>
              </code>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-amber-500 mb-2">&gt;</div>
              <h3 className="font-bold text-slate-800 mb-1">มากกว่า (Greater than)</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ฝั่งซ้ายมีค่ามากกว่าฝั่งขวาอย่างชัดเจน</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                8 &gt; 8 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-rose-500 font-bold">False</span>
              </code>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-amber-500 mb-2">&lt;</div>
              <h3 className="font-bold text-slate-800 mb-1">น้อยกว่า (Less than)</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ฝั่งซ้ายมีค่าน้อยกว่าฝั่งขวาอย่างชัดเจน</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                2 &lt; 5 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-emerald-500 font-bold">True</span>
              </code>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-purple-500 mb-2">&gt;=</div>
              <h3 className="font-bold text-slate-800 mb-1">มากกว่าหรือเท่ากับ</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ฝั่งซ้ายมากกว่า <strong>หรือ</strong> เท่ากับฝั่งขวา</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                8 &gt;= 8 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-emerald-500 font-bold">True</span>
              </code>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-black font-mono text-purple-500 mb-2">&lt;=</div>
              <h3 className="font-bold text-slate-800 mb-1">น้อยกว่าหรือเท่ากับ</h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">ฝั่งซ้ายน้อยกว่า <strong>หรือ</strong> เท่ากับฝั่งขวา</p>
              <code className="block bg-slate-50 text-slate-600 p-2 rounded text-center text-sm font-mono border border-slate-100">
                2 &lt;= 1 <ArrowRightLeft className="w-3 h-3 inline text-slate-400 mx-1"/> <span className="text-rose-500 font-bold">False</span>
              </code>
            </div>

          </div>
        </div>

        {/* Interactive Simulator */}
        <ComparisonSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}