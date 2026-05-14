## Unit 3: งานจัดการข้อมูล

- 3.1 การเพิ่มข้อมูลแถวเดียว
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  MousePointerClick,
  RefreshCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Code2
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
};

// --- Simulator State ---
const initialData = [
{ emp_id: 'E001', name: 'สมชาย ใจดี', department: 'IT', salary: 45000 },
{ emp_id: 'E002', name: 'สมหญิง รักงาน', department: 'HR', salary: 38000 }
];
const [tableData, setTableData] = useState(initialData);
const [formData, setFormData] = useState({
emp_id: '',
name: '',
department: 'Marketing',
salary: ''
});
const [liveQuery, setLiveQuery] = useState('');

// Update Live Query when form changes
useEffect(() => {
const s\*id = formData.emp\*id ? `'${formData.emp_id}'` : '\*\**';
const s*name = formData.name ? `'${formData.name}'` : '**\*';
const s_dept = formData.department ? `'${formData.department}'` : '\***';
const s*sal = formData.salary ? formData.salary : '*\*\*';

    setLiveQuery(`INSERT INTO employees (emp_id, name, department, salary)\nVALUES (${s_id}, ${s_name}, ${s_dept}, ${s_sal});`);

}, [formData]);

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
};

const executeInsert = () => {
if (!formData.emp_id || !formData.name || !formData.salary) {
showToast('กรุณากรอกข้อมูลให้ครบถ้วนก่อนรันคำสั่งครับ!', 'error');
return;
}
if (tableData.some(emp => emp.emp_id === formData.emp_id)) {
showToast(`Error: รหัสพนักงาน ${formData.emp_id} ซ้ำในระบบ (Primary Key Violation)`, 'error');
return;
}

    const newRow = {
      emp_id: formData.emp_id,
      name: formData.name,
      department: formData.department,
      salary: Number(formData.salary)
    };

    setTableData([...tableData, newRow]);
    showToast('รันคำสั่งสำเร็จ! ข้อมูลถูกเพิ่มลงในตารางแล้ว', 'success');
    setFormData({ emp_id: '', name: '', department: 'Marketing', salary: '' }); // Reset

};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'INSERT INTO', type: 'keyword' },
{ id: 'b2', text: 'VALUES', type: 'keyword' },
{ id: 'b3', text: 'products', type: 'table' },
{ id: 'b4', text: '(id, name, price)', type: 'cols' },
{ id: 'b5', text: "('P01', 'Mouse', 500)", type: 'vals' },
{ id: 'b6', text: 'UPDATE', type: 'trick' }, // Trick
{ id: 'b7', text: 'SET', type: 'trick' } // Trick
];

const expectedAnswer = ['b1', 'b3', 'b4', 'b2', 'b5'];

const [dropzones, setDropzones] = useState([null, null, null, null, null]);
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      // Auto move to next empty zone
      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
// Remove block from zone if clicked again
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
const currentAnswer = dropzones.map(b => b ? b.id : null);
if (currentAnswer.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบก่อนตรวจคำตอบครับ', 'error');
return;
}

    let isCorrect = true;
    for (let i = 0; i < expectedAnswer.length; i++) {
      if (currentAnswer[i] !== expectedAnswer[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      showToast('ยอดเยี่ยมมาก! คุณต่อคำสั่ง SQL ได้ถูกต้องสมบูรณ์ 🌟', 'success');
    } else {
      showToast('ยังไม่ถูกต้องครับ ลองทบทวนลำดับของคำสั่ง INSERT ดูอีกครั้งนะ', 'error');
    }

};

const resetGame = () => {
setDropzones([null, null, null, null, null]);
setActiveZoneIndex(0);
};

return (

<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Database className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-indigo-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 backdrop-blur-md shadow-inner">
Unit 3.1 การเพิ่มข้อมูลแถวเดียว
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Intro & Syntax Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600">
            1. การเพิ่มข้อมูล (INSERT INTO)
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            คำสั่ง <strong>INSERT INTO</strong> ใช้สำหรับนำข้อมูลใหม่เข้าไปเก็บในตาราง (Table) ของฐานข้อมูล
            โดยการทำงานพื้นฐานที่สุดคือการ "เพิ่มข้อมูลทีละ 1 แถว (Row)"
          </p>
        </section>

        {/* Database Simulator Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><Terminal className="text-indigo-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Database Simulator</h2>
          </div>
          <p className="text-slate-600">จำลองการทำงานของ MySQL Workbench กรอกข้อมูลพนักงานใหม่ทางด้านซ้าย สังเกตคำสั่ง SQL ที่เกิดขึ้น และกด Execute เพื่อบันทึกลงตารางจริง</p>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Input Form (Action Area) */}
            <div className="w-full lg:w-5/12 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <MousePointerClick size={18} className="text-indigo-500" /> Form Input
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">รหัสพนักงาน (emp_id) <span className="text-red-500">*</span></label>
                    <input type="text" name="emp_id" value={formData.emp_id} onChange={handleInputChange} placeholder="เช่น E003"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อ-สกุล (name) <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="เช่น อารี ใจดี"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">แผนก (department)</label>
                    <select name="department" value={formData.department} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                      <option value="IT">IT (เทคโนโลยีสารสนเทศ)</option>
                      <option value="HR">HR (ฝ่ายบุคคล)</option>
                      <option value="Marketing">Marketing (การตลาด)</option>
                      <option value="Sales">Sales (ฝ่ายขาย)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">เงินเดือน (salary) <span className="text-red-500">*</span></label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="ตัวเลขเท่านั้น เช่น 25000"
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button onClick={executeInsert}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                  <Play size={20} fill="currentColor" /> Execute Query
                </button>
              </div>
            </div>

            {/* Right: Live Console & Table Result */}
            <div className="w-full lg:w-7/12 flex flex-col">
              {/* Live Console */}
              <div className="bg-slate-900 p-6 text-slate-300 border-b border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-sm text-indigo-400 flex items-center gap-2">
                    <Code2 size={16} /> SQL Preview
                  </h3>
                  <span className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </span>
                </div>
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                  <span className="text-pink-400">INSERT INTO</span> <span className="text-yellow-300">employees</span> <span className="text-slate-400">(emp_id, name, department, salary)</span>{'\n'}
                  <span className="text-pink-400">VALUES</span> <span className="text-slate-400">(</span>
                  <span className="text-green-300">{formData.emp_id ? `'${formData.emp_id}'` : '___'}</span>,
                  <span className="text-green-300"> {formData.name ? `'${formData.name}'` : '___'}</span>,
                  <span className="text-green-300"> {formData.department ? `'${formData.department}'` : '___'}</span>,
                  <span className="text-orange-300"> {formData.salary || '___'}</span>
                  <span className="text-slate-400">);</span>
                </pre>
                <div className="mt-3 text-xs text-slate-500 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 flex items-start gap-2">
                  <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
                  <p>สังเกตว่าข้อมูลประเภท Text (รหัส, ชื่อ, แผนก) จะต้องมีเครื่องหมาย <code className="text-green-300">''</code> (Single Quote) ครอบไว้เสมอ แต่ข้อมูลตัวเลข (เงินเดือน) ไม่ต้องมี</p>
                </div>
              </div>

              {/* Table Result */}
              <div className="p-6 bg-white flex-grow">
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <Table2 size={18} className="text-purple-500" /> Table: employees
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm">
                        <th className="p-3 border-b border-slate-200 font-semibold">emp_id (PK)</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">name</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">department</th>
                        <th className="p-3 border-b border-slate-200 font-semibold text-right">salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((emp, idx) => (
                        <tr key={idx} className={`border-b border-slate-100 last:border-0 hover:bg-indigo-50/50 transition-colors ${idx >= initialData.length ? 'bg-green-50/30 animate-in fade-in slide-in-from-left-4 duration-500' : ''}`}>
                          <td className="p-3 font-mono text-sm text-slate-700">{emp.emp_id}</td>
                          <td className="p-3 text-slate-700">{emp.name}</td>
                          <td className="p-3 text-slate-700">
                            <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">{emp.department}</span>
                          </td>
                          <td className="p-3 text-right font-mono text-sm text-slate-700">{emp.salary.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {tableData.length === 0 && (
                     <div className="p-8 text-center text-slate-400">ไม่มีข้อมูลในตาราง</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Query Builder Challenge Section */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg"><MousePointerClick className="text-purple-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Query Builder Challenge</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 md:p-8 shadow-2xl border border-indigo-500/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Database className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-400 font-bold text-lg">ภารกิจ:</h3>
                  <p className="text-slate-300 leading-relaxed">จงสร้างคำสั่ง SQL เพื่อเพิ่มข้อมูลสินค้าใหม่: <br/> รหัส <strong>'P01'</strong>, ชื่อ <strong>'Mouse'</strong>, ราคา <strong>500</strong> ลงในตาราง <strong>products</strong></p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8">
                <p className="text-sm text-indigo-300 mb-3 font-mono">1. คลิกเลือกกล่องคำสั่งด้านล่างเพื่อเติมลงในช่องว่าง</p>
                <div className="flex flex-wrap items-center gap-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800 min-h-[80px]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        min-w-[80px] h-12 px-4 rounded-xl font-mono text-sm font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border border-indigo-400 hover:scale-105 hover:-translate-y-1'
                          : 'bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-800 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ช่องที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-xl ml-2">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <p className="text-sm text-indigo-300 mb-3 font-mono flex justify-between items-center">
                  <span>2. กล่องคำสั่ง (ระวังคำลวง!)</span>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </p>
                <div className="flex flex-wrap gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2 rounded-xl font-mono text-sm font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-50 cursor-not-allowed'
                            : 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 hover:-translate-y-1 hover:shadow-indigo-500/20 cursor-pointer'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500" /> : <AlertCircle className="text-rose-500" />}
          <span className="font-medium">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.2 การจัดการค่า NULL
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  MousePointerClick,
  RefreshCcw,
  ShieldAlert,
  Code2,
  HelpCircle,
  Lightbulb
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
};

// --- Simulator State ---
// ข้อมูลจำลองที่มีทั้ง NULL, 0 และ ค่าว่าง
const initialData = [
{ emp_id: 'E001', name: 'สมชาย ใจดี', department: 'IT', bonus: 5000 },
{ emp_id: 'E002', name: 'สมหญิง รักงาน', department: 'HR', bonus: null },
{ emp_id: 'E003', name: 'วิชัย เก่งกาจ', department: 'Sales', bonus: 12000 },
{ emp_id: 'E004', name: 'มาลี สวยงาม', department: 'IT', bonus: null },
{ emp_id: 'E005', name: 'ธนา พาเพลิน', department: 'Marketing', bonus: 0 },
];

const [tableData, setTableData] = useState(initialData);
const [queryCondition, setQueryCondition] = useState('ALL');
const [liveQuery, setLiveQuery] = useState('');
const [hasExecuted, setHasExecuted] = useState(false);

// อัปเดตคำสั่ง SQL Preview ตามเงื่อนไขที่เลือก
useEffect(() => {
let whereClause = '';
switch (queryCondition) {
case 'IS*NULL':
whereClause = 'WHERE bonus IS NULL;';
break;
case 'IS_NOT_NULL':
whereClause = 'WHERE bonus IS NOT NULL;';
break;
case 'EQUAL_NULL':
whereClause = 'WHERE bonus = NULL; /* ❌ ผิดหลักไวยากรณ์ \_/';
break;
case 'EQUAL_ZERO':
whereClause = 'WHERE bonus = 0;';
break;
default:
whereClause = ';';
}
setLiveQuery(`SELECT * \nFROM employees\n${whereClause}`);
setHasExecuted(false); // Reset executed state when query changes
}, [queryCondition]);

const executeQuery = () => {
setHasExecuted(true);
let result = [];

    switch (queryCondition) {
      case 'ALL':
        result = initialData;
        showToast('แสดงข้อมูลทั้งหมดสำเร็จ', 'success');
        break;
      case 'IS_NULL':
        result = initialData.filter(emp => emp.bonus === null);
        showToast('ถูกต้อง! IS NULL ใช้ดึงข้อมูลที่ยังไม่มีค่า (NULL) ได้สำเร็จ', 'success');
        break;
      case 'IS_NOT_NULL':
        result = initialData.filter(emp => emp.bonus !== null);
        showToast('ถูกต้อง! IS NOT NULL กรองคนที่มีข้อมูลโบนัส (รวมถึงคนที่ได้ 0)', 'success');
        break;
      case 'EQUAL_NULL':
        result = []; // ใน SQL การเปรียบเทียบ = NULL จะได้ผลลัพธ์เป็น Unknown (ไม่แสดงผล)
        showToast('ระวัง! ใน SQL เราไม่สามารถใช้เครื่องหมาย = กับ NULL ได้ ผลลัพธ์จึงไม่แสดงอะไรเลย', 'error');
        break;
      case 'EQUAL_ZERO':
        result = initialData.filter(emp => emp.bonus === 0);
        showToast('แสดงข้อมูลที่โบนัสเป็น 0 (สังเกตว่า 0 ไม่ใช่ NULL)', 'success');
        break;
      default:
        result = initialData;
    }
    setTableData(result);

};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'SELECT * FROM employees', type: 'select' },
{ id: 'b2', text: 'WHERE', type: 'keyword' },
{ id: 'b3', text: 'bonus', type: 'col' },
{ id: 'b4', text: 'IS NULL', type: 'operator' },
{ id: 'b5', text: '= NULL', type: 'trick' }, // Trick
{ id: 'b6', text: 'IS NOT NULL', type: 'trick' }, // Trick
];

const expectedAnswer = ['b1', 'b2', 'b3', 'b4'];
const [dropzones, setDropzones] = useState([null, null, null, null]);
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      // Auto move to next empty zone
      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
const currentAnswer = dropzones.map(b => b ? b.id : null);
if (currentAnswer.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบช่องก่อนตรวจคำตอบครับ', 'error');
return;
}

    let isCorrect = true;
    for (let i = 0; i < expectedAnswer.length; i++) {
      if (currentAnswer[i] !== expectedAnswer[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      showToast('ยอดเยี่ยม! ใช้ IS NULL เพื่อหาคนที่ยังไม่มีข้อมูลได้ถูกต้อง 🎉', 'success');
    } else {
      // วิเคราะห์จุดผิดเพื่อบอกใบ้
      if (currentAnswer.includes('b5')) {
         showToast('เกือบถูกแล้ว! แต่จำไว้ว่าเราใช้เครื่องหมาย = กับ NULL ไม่ได้ ต้องใช้ IS นะ', 'error');
      } else if (currentAnswer.includes('b6')) {
         showToast('คำสั่ง IS NOT NULL จะหาคนที่มีโบนัส แต่ภารกิจคือหาคนที่ "ไม่มีข้อมูล" ครับ', 'error');
      } else {
         showToast('ยังไม่ถูกต้องครับ ลองเรียงลำดับคำสั่ง SQL ใหม่อีกครั้ง', 'error');
      }
    }

};

const resetGame = () => {
setDropzones([null, null, null, null]);
setActiveZoneIndex(0);
};

return (

<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-teal-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Database className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-teal-100">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-md shadow-inner">
Unit 3.2 การจัดการค่า NULL
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        <section className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-indigo-600">
              1. ทำความรู้จักกับค่า NULL
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              ในฐานข้อมูล <strong>NULL</strong> ไม่ใช่เลข 0 และไม่ใช่ช่องว่าง (Empty String) <br className="hidden md:block"/>
              แต่ NULL หมายถึง <strong>"ไม่มีข้อมูล"</strong> หรือ <strong>"ไม่ทราบค่า" (Unknown)</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold text-xl">0</div>
                <h3 className="font-bold text-slate-800">เลขศูนย์ (Zero)</h3>
                <p className="text-sm text-slate-500">คือมีข้อมูลเป็นตัวเลขศูนย์ (เช่น ได้โบนัส 0 บาท)</p>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl">''</div>
                <h3 className="font-bold text-slate-800">ช่องว่าง (Empty String)</h3>
                <p className="text-sm text-slate-500">คือมีข้อมูลเป็นข้อความแต่ไม่มีตัวอักษร</p>
             </div>
             <div className="bg-white p-5 rounded-2xl border-indigo-200 shadow-md flex flex-col items-center text-center gap-2 ring-2 ring-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">NULL</div>
                <h3 className="font-bold text-indigo-800">NULL</h3>
                <p className="text-sm text-indigo-600/80">คือช่องโหว่ ยังไม่มีการกรอกข้อมูลใดๆ ลงไปเลย</p>
             </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg"><Terminal className="text-teal-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Query Simulator: IS NULL / IS NOT NULL</h2>
          </div>
          <p className="text-slate-600">ทดลองดึงข้อมูลจากตาราง <code>employees</code> โดยใช้เงื่อนไขต่างๆ สังเกตความแตกต่างเมื่อใช้ <code>=</code> กับ <code>IS</code></p>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Query Controls */}
            <div className="w-full lg:w-4/12 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                  <MousePointerClick size={18} className="text-teal-500" /> สร้างเงื่อนไข
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">เลือกคำสั่ง WHERE สำหรับคอลัมน์ bonus</label>
                    <div className="space-y-2">
                      {[
                        { val: 'ALL', label: 'แสดงข้อมูลทั้งหมด (ไม่มี WHERE)' },
                        { val: 'IS_NULL', label: 'WHERE bonus IS NULL' },
                        { val: 'IS_NOT_NULL', label: 'WHERE bonus IS NOT NULL' },
                        { val: 'EQUAL_ZERO', label: 'WHERE bonus = 0' },
                        { val: 'EQUAL_NULL', label: 'WHERE bonus = NULL (ผิดหลักการ)' },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setQueryCondition(opt.val)}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                            queryCondition === opt.val
                              ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-800 font-medium shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <code className="font-mono text-sm">{opt.label}</code>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button onClick={executeQuery}
                  className={`w-full font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                    queryCondition === 'EQUAL_NULL'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-rose-500/30 text-white'
                    : 'bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 shadow-teal-500/30 text-white'
                  }`}>
                  <Play size={20} fill="currentColor" /> รันคำสั่ง SQL
                </button>
              </div>
            </div>

            {/* Right: Live Console & Table Result */}
            <div className="w-full lg:w-8/12 flex flex-col">
              {/* Live Console */}
              <div className="bg-slate-900 p-6 text-slate-300 border-b border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-sm text-teal-400 flex items-center gap-2">
                    <Code2 size={16} /> SQL Code
                  </h3>
                </div>
                <pre className="font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                  <span className="text-pink-400">SELECT</span> <span className="text-white">*</span>{'\n'}
                  <span className="text-pink-400">FROM</span> <span className="text-yellow-300">employees</span>{'\n'}
                  {queryCondition !== 'ALL' && (
                    <>
                      <span className="text-pink-400">WHERE</span> <span className="text-slate-300">bonus </span>
                      {queryCondition === 'IS_NULL' && <span className="text-emerald-400 font-bold">IS NULL</span>}
                      {queryCondition === 'IS_NOT_NULL' && <span className="text-emerald-400 font-bold">IS NOT NULL</span>}
                      {queryCondition === 'EQUAL_ZERO' && <span className="text-orange-300">= 0</span>}
                      {queryCondition === 'EQUAL_NULL' && <span className="text-rose-400 border-b border-rose-400/50">= NULL</span>}
                      <span className="text-slate-400">;</span>
                    </>
                  )}
                  {queryCondition === 'ALL' && <span className="text-slate-400">;</span>}
                </pre>

                {/* Educational Hint Box */}
                {queryCondition === 'EQUAL_NULL' && (
                   <div className="mt-4 text-sm text-rose-200 bg-rose-950/50 p-3 rounded-lg border border-rose-800/50 flex items-start gap-2 animate-in fade-in">
                     <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-rose-400" />
                     <p>ข้อควรจำ: เราใช้ <code>= NULL</code> หรือ <code>!= NULL</code> <strong>ไม่ได้</strong> เพราะ NULL หมายถึงไม่ทราบค่า การเอาไปเทียบด้วย = จึงได้ผลเป็นไม่ทราบค่า (ไม่แสดงผล) เสมอ</p>
                   </div>
                )}
              </div>

              {/* Table Result */}
              <div className="p-6 bg-slate-50 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Table2 size={18} className="text-indigo-500" /> ผลลัพธ์: ตาราง employees
                  </h3>
                  <span className="text-sm font-mono bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm text-slate-500">
                    Rows: {hasExecuted ? tableData.length : initialData.length}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm">
                        <th className="p-3 border-b border-slate-200 font-semibold">emp_id</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">name</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">department</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">bonus</th>
                      </tr>
                    </thead>
                    <tbody className={hasExecuted ? 'animate-in fade-in duration-500' : ''}>
                      {(hasExecuted ? tableData : initialData).map((emp, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono text-sm text-slate-600">{emp.emp_id}</td>
                          <td className="p-3 text-slate-800">{emp.name}</td>
                          <td className="p-3 text-slate-600">
                            <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">{emp.department}</span>
                          </td>
                          <td className="p-3">
                            {emp.bonus === null ? (
                              <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-xs font-bold font-mono border border-rose-100">
                                NULL
                              </span>
                            ) : (
                              <span className="font-mono text-slate-700 font-medium">
                                {emp.bonus.toLocaleString()}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hasExecuted && tableData.length === 0 && (
                     <div className="p-10 text-center flex flex-col items-center justify-center gap-2">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                           <ShieldAlert className="text-slate-400" size={32} />
                        </div>
                        <p className="text-slate-500 font-medium">ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p>
                        {queryCondition === 'EQUAL_NULL' && (
                          <p className="text-sm text-rose-500 mt-1">เป็นเพราะการใช้ <code>= NULL</code> นั่นเอง!</p>
                        )}
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><Lightbulb className="text-indigo-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Query Builder Challenge</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 md:p-8 shadow-2xl border border-teal-500/20 relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg">
                  <HelpCircle className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: ตามหาคนยังไม่ประเมิน!</h3>
                  <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                    ฝ่ายบุคคลต้องการรายชื่อพนักงานทั้งหมด ที่ <strong>"ยังไม่มีข้อมูลโบนัสในระบบ"</strong> (ช่อง bonus ว่างเปล่า) <br className="hidden md:block"/>
                    จงต่อบล็อกคำสั่ง SQL ด้านล่างให้ถูกต้องเพื่อดึงข้อมูลนี้
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8">
                <p className="text-sm text-teal-300 mb-3 font-mono font-medium">พื้นที่ต่อบล็อกคำสั่ง:</p>
                <div className="flex flex-wrap items-center gap-2 bg-black/40 p-5 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? 'bg-gradient-to-b from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 border border-teal-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[100px] bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-teal-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-teal-300 font-mono font-medium">บล็อกคำสั่งที่เลือกได้:</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800/50 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-40 cursor-not-allowed shadow-none'
                            : 'bg-slate-700 text-slate-100 border-slate-500 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-95 cursor-pointer'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 border border-emerald-400"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20'
            : 'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.3 การเพิ่มข้อมูลหลายแถว
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  MousePointerClick,
  RefreshCcw,
  Code2,
  HelpCircle,
  Lightbulb,
  Plus,
  Trash2,
  Layers,
  CopyPlus
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
};

// --- Simulator State ---
const initialTableData = [
{ prod_id: 'P001', name: 'อเมริกาโน่', category: 'Coffee', price: 50 },
{ prod_id: 'P002', name: 'ชาเขียวมะลิ', category: 'Tea', price: 45 },
];

const [tableData, setTableData] = useState(initialTableData);
const [hasExecuted, setHasExecuted] = useState(false);

// ชุดข้อมูลจำลองสำหรับให้ผู้เรียนเพิ่ม
const [draftRows, setDraftRows] = useState([
{ id: Date.now(), name: 'ลาเต้', category: 'Coffee', price: 60 },
{ id: Date.now() + 1, name: 'โกโก้', category: 'Milk', price: 55 }
]);

const [liveQuery, setLiveQuery] = useState('');

// อัปเดตคำสั่ง SQL Preview ตามข้อมูลใน Draft
useEffect(() => {
if (draftRows.length === 0) {
setLiveQuery('-- กรุณาเพิ่มข้อมูลอย่างน้อย 1 แถว');
return;
}

    const values = draftRows.map(row =>
      `  ('${row.name}', '${row.category}', ${row.price || 0})`
    ).join(',\n');

    setLiveQuery(`INSERT INTO products (name, category, price)\nVALUES \n${values};`);
    setHasExecuted(false);

}, [draftRows]);

const handleAddRow = () => {
if (draftRows.length >= 5) {
showToast('สามารถจำลองการเพิ่มข้อมูลได้สูงสุด 5 แถวพร้อมกันครับ', 'error');
return;
}
setDraftRows([
...draftRows,
{ id: Date.now(), name: '', category: 'Other', price: '' }
]);
};

const handleRemoveRow = (id) => {
if (draftRows.length <= 1) {
showToast('ต้องมีข้อมูลอย่างน้อย 1 แถว', 'error');
return;
}
setDraftRows(draftRows.filter(row => row.id !== id));
};

const handleRowChange = (id, field, value) => {
setDraftRows(draftRows.map(row =>
row.id === id ? { ...row, [field]: value } : row
));
};

const executeQuery = () => {
// Validate
const hasEmpty = draftRows.some(r => r.name.trim() === '' || String(r.price).trim() === '');
if (hasEmpty) {
showToast('กรุณากรอกข้อมูล ชื่อสินค้า และ ราคา ให้ครบทุกแถวก่อนรันคำสั่ง', 'error');
return;
}

    // Generate new ID and merge
    const newRows = draftRows.map((row, index) => ({
      prod_id: `P${String(tableData.length + index + 1).padStart(3, '0')}`,
      name: row.name,
      category: row.category,
      price: Number(row.price)
    }));

    setTableData([...initialTableData, ...newRows]);
    setHasExecuted(true);
    showToast(`เพิ่มข้อมูล ${draftRows.length} แถว สำเร็จ! (ใช้ 1 คำสั่ง)`, 'success');

};

const resetSimulator = () => {
setTableData(initialTableData);
setHasExecuted(false);
setDraftRows([
{ id: Date.now(), name: 'ลาเต้', category: 'Coffee', price: 60 },
{ id: Date.now() + 1, name: 'โกโก้', category: 'Milk', price: 55 }
]);
};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'INSERT INTO', type: 'cmd' },
{ id: 'b2', text: 'VALUES', type: 'kw' },
{ id: 'b3', text: "('ชาไทย', 40)", type: 'val' },
{ id: 'b4', text: ',', type: 'comma' },
{ id: 'b5', text: "('นมสด', 35)", type: 'val' },
{ id: 't1', text: 'AND', type: 'trick' }, // Trick
{ id: 't2', text: 'VALUES', type: 'trick' }, // Trick duplicate
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      // Auto move to next empty zone
      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check trick
    if (ans.includes('t1')) {
      showToast('ผิดครับ! ใน SQL เราใช้จุลภาค (,) คั่นระหว่างวงเล็บข้อมูล ไม่ใช้คำว่า AND', 'error');
      return;
    }

    // Error analysis
    if (ans[0] !== 'b1') {
      showToast('คำสั่งแรกต้องเริ่มด้วย INSERT INTO เสมอครับ', 'error');
      return;
    }
    if (ans[1] !== 'b2' && ans[1] !== 't2') {
      showToast('หลังจากบอกตารางแล้ว ต้องตามด้วยคีย์เวิร์ดบอกว่าจะเพิ่มข้อมูล (VALUES)', 'error');
      return;
    }
    if (ans[3] !== 'b4') {
      showToast('เครื่องหมายลูกน้ำ (,) ต้องอยู่ตรงกลางเพื่อเชื่อมข้อมูล 2 ชุดเข้าด้วยกันครับ', 'error');
      return;
    }

    // Correct Answer Check (Order of b3 and b5 doesn't matter)
    const isVal1Valid = ans[2] === 'b3' || ans[2] === 'b5';
    const isVal2Valid = ans[4] === 'b3' || ans[4] === 'b5';
    const isUniqueVals = ans[2] !== ans[4];

    if (ans[0] === 'b1' && (ans[1] === 'b2' || ans[1] === 't2') && ans[3] === 'b4' && isVal1Valid && isVal2Valid && isUniqueVals) {
      showToast('ยอดเยี่ยมมาก! การใส่ข้อมูลหลายแถวแบบนี้ช่วยลดเวลาทำงานได้เยอะเลย 🎉', 'success');
    } else {
      showToast('ยังมีบางจุดไม่ถูกต้อง ลองเรียงลำดับดูใหม่นะ', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (

<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Layers className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-md shadow-inner">
Unit 3.3 การเพิ่มข้อมูลหลายแถว
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
              1. ทำไมต้องเพิ่มข้อมูลหลายแถวพร้อมกัน?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              แทนที่เราจะเขียนคำสั่ง <code className="bg-slate-200 px-1.5 rounded text-indigo-700">INSERT INTO</code> ซ้ำๆ หลายครั้ง
              SQL อนุญาตให้เราเพิ่มข้อมูลหลายแถวใน <strong>"คำสั่งเดียว"</strong> โดยใช้ <strong className="text-rose-500 text-xl">, (Comma)</strong> คั่น
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
                <h3 className="font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <AlertCircle size={20}/> แบบเดิม (เขียนซ้ำๆ)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed">
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> ('ชาเขียว');<br/><br/>
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> ('ชาไทย');<br/><br/>
                  <span className="text-slate-400">-- ต้องคุยกับ Database หลายรอบ ช้า!</span>
                </pre>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20}/> แบบหลายแถว (ดีกว่า)
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-emerald-100">
                  <span className="text-blue-600">INSERT INTO</span> products (name)<br/>
                  <span className="text-blue-600">VALUES</span> <br/>
                  &nbsp;&nbsp;('ชาเขียว')<span className="text-rose-500 font-bold text-lg">,</span><br/>
                  &nbsp;&nbsp;('ชาไทย');<br/><br/>
                  <span className="text-emerald-500">-- คุยรอบเดียว ส่งข้อมูลได้ครบ เร็วและสั้น!</span>
                </pre>
             </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><CopyPlus className="text-blue-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Multi-Row Insert</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Input Form */}
            <div className="w-full lg:w-5/12 bg-slate-50 border-r border-slate-200 p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800">
                  เตรียมชุดข้อมูล (VALUES)
                </h3>
                <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {draftRows.length} / 5 แถว
                </span>
              </div>

              <div className="space-y-3 flex-grow overflow-y-auto pr-2 max-h-[350px]">
                {draftRows.map((row, idx) => (
                  <div key={row.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative animate-in fade-in slide-in-from-left-2">
                    <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <input
                        type="text"
                        placeholder="ชื่อสินค้า..."
                        value={row.name}
                        onChange={(e) => handleRowChange(row.id, 'name', e.target.value)}
                        className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                      />
                      <input
                        type="number"
                        placeholder="ราคา..."
                        value={row.price}
                        onChange={(e) => handleRowChange(row.id, 'price', e.target.value)}
                        className="w-1/3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                      />
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={draftRows.length <= 1}
                        className="w-1/6 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={handleAddRow}
                  disabled={draftRows.length >= 5}
                  className="flex-1 bg-white border-2 border-dashed border-indigo-200 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> เพิ่มแถวข้อมูล
                </button>
              </div>
            </div>

            {/* Right: Preview & Table */}
            <div className="w-full lg:w-7/12 flex flex-col bg-white">
              {/* Live Preview */}
              <div className="bg-[#1e1e2e] p-6 text-slate-300 relative border-b-4 border-indigo-500">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-mono text-sm text-indigo-300 flex items-center gap-2">
                    <Code2 size={16} /> SQL Preview
                  </h3>
                  {hasExecuted && (
                    <button onClick={resetSimulator} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors">
                      <RefreshCcw size={12} /> รีเซ็ตตาราง
                    </button>
                  )}
                </div>
                <pre className="font-mono text-[15px] leading-relaxed">
                  <span className="text-[#cba6f7]">INSERT INTO</span> <span className="text-[#f9e2af]">products</span> (name, category, price){'\n'}
                  <span className="text-[#cba6f7]">VALUES</span>{'\n'}
                  {draftRows.map((row, i) => (
                    <span key={row.id}>
                      <span className="text-[#a6e3a1]">  ('{row.name || '?'}'</span>, <span className="text-[#a6e3a1]">'Other'</span>, <span className="text-[#fab387]">{row.price || 0}</span>)
                      {i < draftRows.length - 1 ? <span className="text-rose-400 font-bold text-lg">,</span> : <span className="text-slate-400">;</span>}
                      {'\n'}
                    </span>
                  ))}
                </pre>

                {!hasExecuted && (
                  <button
                    onClick={executeQuery}
                    className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-bold py-2 px-5 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Play size={16} fill="currentColor" /> Execute
                  </button>
                )}
              </div>

              {/* Table Output */}
              <div className="p-6 bg-slate-50 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Table2 size={18} className="text-indigo-600" /> ตาราง products
                  </h3>
                  <span className="text-xs font-mono bg-white px-2 py-1 rounded-md border border-slate-200 text-slate-500">
                    Total: {tableData.length} rows
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white max-h-[300px]">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="sticky top-0 bg-slate-100 z-10">
                      <tr className="text-slate-600">
                        <th className="p-3 border-b border-slate-200 font-semibold w-24">prod_id</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">name</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">category</th>
                        <th className="p-3 border-b border-slate-200 font-semibold">price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((prod, idx) => (
                        <tr key={idx} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${hasExecuted && idx >= initialTableData.length ? 'bg-indigo-50/50 animate-in fade-in' : ''}`}>
                          <td className="p-3 font-mono text-xs text-slate-500">{prod.prod_id}</td>
                          <td className={`p-3 font-medium ${hasExecuted && idx >= initialTableData.length ? 'text-indigo-700' : 'text-slate-800'}`}>
                            {prod.name}
                            {hasExecuted && idx >= initialTableData.length && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">New</span>}
                          </td>
                          <td className="p-3 text-slate-600">
                            <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs">{prod.category}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-700">฿{prod.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><Blocks className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <HelpCircle className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: สั่งออเดอร์รวดเดียว!</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    จงประกอบบล็อกคำสั่ง SQL เพื่อเพิ่มข้อมูลเมนู <span className="text-white font-bold bg-indigo-600/50 px-2 py-0.5 rounded">'ชาไทย'</span> และ <span className="text-white font-bold bg-indigo-600/50 px-2 py-0.5 rounded">'นมสด'</span> ลงในตารางให้อยู่ภายใน <strong>1 คำสั่ง</strong>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับซ้ายไปขวา:</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-black/50 p-5 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[80px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                        ${idx === 3 && !block ? 'min-w-[50px]' : ''} /* Make comma slot smaller if empty */
                      `}
                    >
                      {block ? block.text : (idx === 3 ? '?' : `ส่วนที่ ${idx + 1}`)}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง:</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> คืนค่า
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-30 cursor-not-allowed shadow-none scale-95'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-95 cursor-pointer'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-slate-700 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20'
            : 'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

/_ Helper Component for icon not in lucide standard bundle sometimes _/
function Blocks(props) {
return (
<svg
{...props}
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round" >
<rect width="7" height="7" x="14" y="3" rx="1" />
<path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
</svg>
)
}

---

- 3.4 การเพิ่มข้อมูลจาก Subquery
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Table2,
  RefreshCcw,
  Code2,
  HelpCircle,
  Layers,
  CopyPlus,
  ArrowRightCircle,
  Filter,
  Copy
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
};

// --- Simulator State ---
const initialSourceData = [
{ id: 'C01', name: 'สมชาย', points: 150, tier: 'Silver' },
{ id: 'C02', name: 'สมหญิง', points: 1200, tier: 'Gold' },
{ id: 'C03', name: 'ใจดี', points: 80, tier: 'Bronze' },
{ id: 'C04', name: 'รักชาติ', points: 2500, tier: 'Platinum' },
{ id: 'C05', name: 'มีสุข', points: 950, tier: 'Gold' },
];

const initialTargetData = [];

const [sourceData, setSourceData] = useState(initialSourceData);
const [targetData, setTargetData] = useState(initialTargetData);
const [hasExecuted, setHasExecuted] = useState(false);
const [selectedCondition, setSelectedCondition] = useState("tier = 'Gold'");
const [isAnimating, setIsAnimating] = useState(false);

// --- Logic for Simulator ---
const executeSubquery = () => {
if (hasExecuted) return;

    setIsAnimating(true);

    // Simulate delay for animation effect
    setTimeout(() => {
      let filteredData = [];
      if (selectedCondition === "tier = 'Gold'") {
        filteredData = sourceData.filter(c => c.tier === 'Gold');
      } else if (selectedCondition === "points >= 1000") {
        filteredData = sourceData.filter(c => c.points >= 1000);
      }

      // Map to match target table structure (ignoring ID to let DB auto-generate, or mapping it)
      const newDataToInsert = filteredData.map(c => ({
        name: c.name,
        points: c.points
      }));

      if (newDataToInsert.length === 0) {
        showToast('ไม่มีข้อมูลที่ตรงตามเงื่อนไข (0 rows affected)', 'error');
        setIsAnimating(false);
        return;
      }

      setTargetData([...targetData, ...newDataToInsert]);
      setHasExecuted(true);
      setIsAnimating(false);
      showToast(`คัดลอกข้อมูลสำเร็จ ${newDataToInsert.length} แถวเข้าสู่ตารางเป้าหมาย!`, 'success');
    }, 800);

};

const resetSimulator = () => {
setTargetData(initialTargetData);
setHasExecuted(false);
setIsAnimating(false);
};

// --- Mini Game State ---
const gameBlocks = [
{ id: 'b1', text: 'INSERT INTO', type: 'cmd' },
{ id: 'b2', text: 'history_logs', type: 'table' },
{ id: 'b3', text: 'SELECT * FROM', type: 'cmd2' },
{ id: 'b4', text: 'active_logs', type: 'table' },
{ id: 'b5', text: "WHERE status = 'old'", type: 'cond' },
{ id: 't1', text: 'VALUES', type: 'trick' }, // Trick
{ id: 't2', text: 'UPDATE', type: 'trick' }, // Trick
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      // Auto move to next empty zone
      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check tricks
    if (ans.includes('t1')) {
      showToast('ผิดครับ! เมื่อดึงข้อมูลจากตารางอื่นด้วย SELECT เราจะไม่ใช้คำว่า VALUES แล้ว', 'error');
      return;
    }

    // Exact match expected for logic
    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      showToast('ถูกต้องสมบูรณ์! การย้ายข้อมูลเก่าไปตาราง History มักใช้ท่านี้แหละครับ 🎉', 'success');
    } else {
      if (ans[0] !== 'b1') {
         showToast('คำสั่งต้องเริ่มด้วยการระบุว่าจะ "เพิ่มข้อมูล" (INSERT INTO)', 'error');
      } else if (ans[1] !== 'b2') {
         showToast('ต้องตามด้วย "ตารางเป้าหมาย" ที่ต้องการนำข้อมูลไปใส่', 'error');
      } else if (ans[2] !== 'b3') {
         showToast('ต้องใช้คำสั่งดึงข้อมูล (SELECT) จากตารางต้นทาง', 'error');
      } else {
         showToast('การเรียงลำดับยังไม่ถูกต้อง ลองอ่านทบทวนประโยคดูใหม่นะ', 'error');
      }
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (

<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Copy className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 backdrop-blur-md shadow-inner">
Unit 3.4 การเพิ่มข้อมูลด้วย Subquery
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
              1. ก๊อปปี้ข้อมูลข้ามตาราง (INSERT INTO ... SELECT)
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              บางครั้งเราไม่ได้ต้องการพิมพ์ข้อมูลใหม่เองทีละตัว แต่ต้องการ <strong className="text-indigo-600">"คัดลอก"</strong> ข้อมูลที่มีอยู่แล้วในตารางหนึ่ง ไปใส่ในอีกตารางหนึ่ง (เช่น การทำตารางสรุป, การย้ายข้อมูลเก่าไปเก็บ) เราจะใช้คำสั่ง <code className="bg-slate-200 px-1.5 rounded">SELECT</code> เข้ามาช่วยแทนการใช้ <code className="bg-slate-200 px-1.5 rounded">VALUES</code>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Database size={20}/> โครงสร้างคำสั่ง
                </h3>
                <pre className="text-sm font-mono text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100">
                  <span className="text-blue-600">INSERT INTO</span> <span className="text-emerald-600">ตารางเป้าหมาย</span> (คอลัมน์1, คอลัมน์2)<br/>
                  <span className="text-rose-500 font-bold bg-rose-50 px-1 rounded">-- ตัดคำว่า VALUES ทิ้งไปเลย --</span><br/>
                  <span className="text-indigo-600 font-bold">SELECT</span> คอลัมน์1, คอลัมน์2<br/>
                  <span className="text-indigo-600 font-bold">FROM</span> <span className="text-amber-600">ตารางต้นทาง</span><br/>
                  <span className="text-indigo-600 font-bold">WHERE</span> เงื่อนไข;
                </pre>
                <div className="mt-4 text-sm text-rose-600 bg-rose-50 p-3 rounded-lg flex items-start gap-2 border border-rose-100">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p><strong>ข้อควรระวัง:</strong> จำนวนคอลัมน์และชนิดข้อมูลของ SELECT ต้อง <u className="underline-offset-2">ตรงกันและเรียงลำดับเหมือนกัน</u> กับตารางเป้าหมาย</p>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <div className="bg-gradient-to-r from-slate-100 to-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600"><Table2 size={24}/></div>
                  <div>
                    <p className="font-bold text-slate-700">ตารางต้นทาง (Source)</p>
                    <p className="text-xs text-slate-500">มีข้อมูลอยู่แล้ว 10,000 แถว</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2 z-10">
                  <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md border-4 border-white flex items-center gap-2">
                    <Filter size={14} /> SELECT (กรองเฉพาะที่ต้องการ)
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><Table2 size={24}/></div>
                  <div>
                    <p className="font-bold text-emerald-800">ตารางเป้าหมาย (Target)</p>
                    <p className="text-xs text-emerald-600/70">รับข้อมูลที่กรองแล้วเข้าไปต่อท้าย</p>
                  </div>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><CopyPlus className="text-blue-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Data Transfer</h2>
          </div>
          <p className="text-slate-600 max-w-3xl">
            สถานการณ์: เราต้องการเลื่อนขั้นลูกค้าเข้าสู่ตาราง <code>premium_customers</code> ลองเลือกเงื่อนไข (Subquery) เพื่อคัดลอกข้อมูลจากตาราง <code>all_customers</code> ดูครับ
          </p>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] p-5 text-slate-300 relative border-b-4 border-indigo-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="font-mono text-sm leading-loose overflow-x-auto w-full">
                <span className="text-[#cba6f7]">INSERT INTO</span> <span className="text-[#a6e3a1]">premium_customers</span> (name, points)<br/>
                <span className="text-[#cba6f7]">SELECT</span> name, points <span className="text-[#cba6f7]">FROM</span> <span className="text-[#f9e2af]">all_customers</span> <br className="md:hidden" />
                <span className="text-[#cba6f7]">WHERE</span>
                <select
                  value={selectedCondition}
                  onChange={(e) => {
                    setSelectedCondition(e.target.value);
                    setHasExecuted(false);
                    setTargetData([]);
                  }}
                  disabled={hasExecuted}
                  className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 outline-none focus:border-indigo-400 disabled:opacity-50"
                >
                  <option value="tier = 'Gold'">tier = 'Gold'</option>
                  <option value="points >= 1000">points &gt;= 1000</option>
                </select>
                <span className="text-slate-400">;</span>
              </div>

              <div className="shrink-0 flex gap-2 w-full md:w-auto">
                {hasExecuted ? (
                  <button onClick={resetSimulator} className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <RefreshCcw size={16} /> รีเซ็ต
                  </button>
                ) : (
                  <button
                    onClick={executeSubquery}
                    disabled={isAnimating}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Play size={16} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Execute'}
                  </button>
                )}
              </div>
            </div>

            {/* Bottom: Visual Tables */}
            <div className="grid md:grid-cols-2 bg-slate-50 p-6 gap-6 relative">
              {/* Arrow Indicator in Middle (Desktop) */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
                <div className={`transition-all duration-700 transform ${hasExecuted ? 'text-emerald-500 scale-125' : isAnimating ? 'text-indigo-400 translate-x-4 opacity-50' : 'text-slate-300'}`}>
                  <ArrowRightCircle size={40} fill="currentColor" className="text-white" />
                </div>
              </div>

              {/* Source Table */}
              <div>
                <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                  <Database size={16} className="text-amber-500"/> ตารางต้นทาง (all_customers)
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-2 border-b font-semibold">id</th>
                        <th className="p-2 border-b font-semibold">name</th>
                        <th className="p-2 border-b font-semibold">points</th>
                        <th className="p-2 border-b font-semibold">tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceData.map((row) => {
                        // Logic to highlight rows based on condition
                        let isMatch = false;
                        if (selectedCondition === "tier = 'Gold'" && row.tier === 'Gold') isMatch = true;
                        if (selectedCondition === "points >= 1000" && row.points >= 1000) isMatch = true;

                        return (
                          <tr key={row.id} className={`border-b last:border-0 transition-colors duration-500
                            ${isMatch ? (hasExecuted ? 'bg-indigo-50 border-indigo-200' : 'bg-yellow-50/60') : ''}
                          `}>
                            <td className="p-2 font-mono text-xs text-slate-500">{row.id}</td>
                            <td className="p-2 font-medium">{row.name}</td>
                            <td className="p-2 text-slate-600">{row.points}</td>
                            <td className="p-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold
                                ${row.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                                  row.tier === 'Platinum' ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-600'}
                              `}>{row.tier}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target Table */}
              <div>
                 <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-3 bg-emerald-50 p-2 border border-emerald-200 rounded-lg shadow-sm">
                  <Database size={16} className="text-emerald-500"/> ตารางเป้าหมาย (premium_customers)
                </h3>
                <div className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-500 min-h-[180px]
                  ${hasExecuted ? 'bg-white border-emerald-300 ring-2 ring-emerald-100' : 'bg-slate-100/50 border-slate-200 border-dashed'}
                `}>
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className={`${hasExecuted ? 'bg-emerald-50' : 'bg-slate-100'} text-slate-600 transition-colors`}>
                      <tr>
                        <th className="p-2 border-b font-semibold">name <span className="text-xs font-normal text-emerald-600">(รอรับค่า)</span></th>
                        <th className="p-2 border-b font-semibold">points <span className="text-xs font-normal text-emerald-600">(รอรับค่า)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {targetData.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="p-8 text-center text-slate-400 italic font-medium">
                            {isAnimating ? 'กำลังคัดลอกข้อมูล...' : 'ตารางยังว่างเปล่า รันคำสั่งเพื่อดึงข้อมูลมาใส่'}
                          </td>
                        </tr>
                      ) : (
                        targetData.map((row, idx) => (
                          <tr key={idx} className="border-b last:border-0 bg-white animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms`}}>
                            <td className="p-2 font-medium text-emerald-700 flex items-center gap-2">
                              {row.name}
                              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1 rounded uppercase">New</span>
                            </td>
                            <td className="p-2 font-mono text-slate-700">{row.points}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><Blocks className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <HelpCircle className="text-slate-900" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: ย้ายข้อมูลเก่าไปเก็บ</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    ประกอบบล็อกคำสั่งเพื่อนำข้อมูลจากตาราง <code className="text-white bg-slate-700 px-1.5 rounded">active_logs</code> เฉพาะสถานะ 'old' ไปบันทึกเก็บไว้ในตาราง <code className="text-white bg-emerald-700 px-1.5 rounded">history_logs</code>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับ:</p>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? 'bg-indigo-600 text-white shadow-lg border border-indigo-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[100px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง:</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> คืนค่า
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-30 cursor-not-allowed shadow-none scale-95'
                            : block.type === 'table' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 cursor-pointer hover:shadow-indigo-500/20 active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-slate-700 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20'
            : 'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

function Blocks(props) {
return (
<svg
{...props}
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round" >
<rect width="7" height="7" x="14" y="3" rx="1" />
<path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
</svg>
)
}

---

- 3.5 การตรวจสอบก่อนแก้ไข
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  HelpCircle,
  Copy,
  AlertTriangle,
  Eye,
  ShieldAlert,
  ArrowRight,
  DatabaseBackup
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialProducts = [
{ id: 'P01', name: 'MacBook Air', category: 'IT', price: 35000, originalPrice: 35000 },
{ id: 'P02', name: 'Logitech Mouse', category: 'IT', price: 900, originalPrice: 900 },
{ id: 'P03', name: 'Office Desk', category: 'Furniture', price: 4500, originalPrice: 4500 },
{ id: 'P04', name: 'Ergo Chair', category: 'Furniture', price: 8900, originalPrice: 8900 },
{ id: 'P05', name: 'Mechanical Keyboard', category: 'IT', price: 3200, originalPrice: 3200 },
];

const [products, setProducts] = useState(initialProducts);
const [highlightedRows, setHighlightedRows] = useState([]);
const [simMode, setSimMode] = useState('SELECT'); // 'SELECT' | 'UPDATE'
const [selectedCondition, setSelectedCondition] = useState("category = 'IT'");
const [isAnimating, setIsAnimating] = useState(false);
const [isDisaster, setIsDisaster] = useState(false);
const [updateCount, setUpdateCount] = useState(0);

// --- Simulator Logic ---
const conditionEvaluators = {
"category = 'IT'": (row) => row.category === 'IT',
"price < 5000": (row) => row.price < 5000,
"NONE": (row) => true, // No WHERE clause
};

const handlePreview = () => {
setIsAnimating(true);
setHighlightedRows([]);
setIsDisaster(false);

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      const matchedIds = products.filter(conditionFunc).map(p => p.id);

      setHighlightedRows(matchedIds);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        showToast(`ระวัง! คำสั่ง SELECT นี้ดึงข้อมูลมาทั้งหมด ${matchedIds.length} แถว เพราะไม่มีเงื่อนไข WHERE`, 'warning');
      } else {
        showToast(`Preview: พบข้อมูลที่เข้าเงื่อนไขจำนวน ${matchedIds.length} แถว`, 'success');
      }
    }, 600);

};

const handleUpdate = () => {
setIsAnimating(true);
setHighlightedRows([]);

    setTimeout(() => {
      const conditionFunc = conditionEvaluators[selectedCondition];
      let affectedRows = 0;

      const newProducts = products.map(product => {
        if (conditionFunc(product)) {
          affectedRows++;
          return { ...product, price: product.price + 500 }; // Increase price by 500
        }
        return product;
      });

      setProducts(newProducts);
      setUpdateCount(prev => prev + 1);
      setIsAnimating(false);

      if (selectedCondition === "NONE") {
        setIsDisaster(true);
        showToast(`🚨 หายนะ! คุณลืมใส่ WHERE สินค้าทั้งหมด ${affectedRows} รายการถูกปรับราคาขึ้นไปมั่วหมดเลย!`, 'error');
      } else {
        const matchedIds = newProducts.filter(conditionFunc).map(p => p.id);
        setHighlightedRows(matchedIds); // Highlight updated rows
        showToast(`อัปเดตข้อมูลสำเร็จ! สินค้าถูกปรับราคาขึ้นจำนวน ${affectedRows} แถว อย่างปลอดภัย`, 'success');
      }
    }, 800);

};

const resetSimulator = () => {
setProducts(initialProducts);
setHighlightedRows([]);
setIsDisaster(false);
setUpdateCount(0);
};

const gameBlocks = [
{ id: 'b1', text: 'UPDATE', type: 'cmd' },
{ id: 'b2', text: 'products', type: 'table' },
{ id: 'b3', text: "SET price = 0", type: 'cmd2' },
{ id: 'b4', text: 'WHERE', type: 'cond' },
{ id: 'b5', text: "status = 'obsolete'", type: 'cond2' },
{ id: 't1', text: 'SELECT * FROM', type: 'trick' },
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'error');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t1')) {
      showToast('ผิดครับ! ในคำสั่งแก้ไขข้อมูล เราจะใช้แค่ UPDATE เท่านั้น ไม่ใช้ SELECT ตรงนี้', 'error');
      return;
    }

    if (ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5') {
      showToast('ถูกต้องสมบูรณ์! นี่คือโครงสร้าง UPDATE ที่ปลอดภัยและมี WHERE เสมอ 🎉', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> ตาราง -> SET -> WHERE -> เงื่อนไข', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 transition-colors duration-500">
{/_ Background Red Flash on Disaster _/}
{isDisaster && <div className="fixed inset-0 bg-red-500/10 pointer-events-none z-0 animate-pulse"></div>}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <ShieldAlert className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
              <p className="text-sm text-blue-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="bg-rose-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-400/50 backdrop-blur-md shadow-inner text-white">
              Unit 3.5 การตรวจสอบก่อนแก้ไข
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12 relative z-10">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              1. กฎเหล็ก: <span className="text-rose-600">"ดูให้แน่ ก่อนแก้ข้อมูล"</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              คำสั่ง <code className="bg-amber-100 text-amber-800 px-1.5 rounded font-bold">UPDATE</code> และ <code className="bg-rose-100 text-rose-800 px-1.5 rounded font-bold">DELETE</code> เป็นคำสั่งที่อันตรายที่สุด! หากคุณลืมใส่เงื่อนไข <code className="bg-slate-200 px-1.5 rounded font-bold">WHERE</code> ข้อมูลทั้งตารางจะถูกเปลี่ยนหรือถูกลบไปทั้งหมด ดังนั้นมืออาชีพจะใช้คำสั่ง <code className="bg-blue-100 text-blue-800 px-1.5 rounded font-bold">SELECT</code> เพื่อดูหน้าตาข้อมูลก่อนแก้ไขเสมอ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
             <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Eye size={100} /></div>
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  PREVIEW ขั้นตอนตรวจสอบ (ปลอดภัย)
                </h3>
                <pre className="text-sm font-mono text-slate-700 bg-white p-4 rounded-xl leading-relaxed border border-blue-100 shadow-inner">
                  <span className="text-blue-600 font-bold">SELECT</span> * <br/>
                  <span className="text-blue-600 font-bold">FROM</span> products <br/>
                  <span className="text-indigo-600 font-bold">WHERE</span> category = 'IT';
                </pre>
                <p className="mt-4 text-sm text-blue-700 font-medium">✨ ตรวจสอบดูว่า 2-3 แถวที่จะโผล่มานี้ คือสิ่งที่เราต้องการแก้ไขจริงๆ ใช่หรือไม่?</p>
             </div>

             <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-sm h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={100} /></div>
                <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2 text-lg">
                  <span className="bg-amber-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  EXECUTE ขั้นตอนแก้ไขจริง
                </h3>
                <pre className="text-sm font-mono text-slate-700 bg-white p-4 rounded-xl leading-relaxed border border-amber-100 shadow-inner">
                  <span className="text-amber-600 font-bold">UPDATE</span> products <br/>
                  <span className="text-amber-600 font-bold">SET</span> price = price + 500 <br/>
                  <span className="text-rose-600 font-bold border-b-2 border-rose-400 border-dashed">WHERE category = 'IT';</span>
                </pre>
                <p className="mt-4 text-sm text-amber-800 font-medium">⚠️ ก็อปปี้เงื่อนไข WHERE จากคำสั่ง SELECT มาวางได้เลย มั่นใจได้ว่าแก้ถูกแถวชัวร์!</p>
             </div>
          </div>
        </section>

        {/* Section 2: Simulator */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg"><DatabaseBackup className="text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">2. Simulator: Safe Update Practice</h2>
            </div>
            {updateCount > 0 && (
              <button onClick={resetSimulator} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-1.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
                <RefreshCcw size={14} /> รีเซ็ตข้อมูลกลับค่าเริ่มต้น
              </button>
            )}
          </div>

          <p className="text-slate-600 max-w-3xl">
            <strong>ภารกิจ:</strong> ผู้จัดการสั่งให้ <u className="underline-offset-4 decoration-wavy decoration-indigo-400 font-semibold">ปรับราคาสินค้าหมวด IT ขึ้นชิ้นละ 500 บาท</u> เลือกลอง Preview ดูข้อมูลก่อน แล้วค่อยกดสลับโหมดไป Update จริง (ลองเลือกแบบไม่มีเงื่อนไขดูได้เพื่อดูสิ่งที่จะเกิดขึ้น)
          </p>

          <div className={`bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border-2 transition-colors duration-500 ${isDisaster ? 'border-rose-500 shadow-rose-500/20' : 'border-slate-200'}`}>

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Tab Selector */}
              <div className="flex flex-row md:flex-col bg-slate-900 md:w-48 shrink-0">
                 <button
                   onClick={() => { setSimMode('SELECT'); setHighlightedRows([]); }}
                   className={`flex-1 md:flex-none text-left px-4 py-4 font-bold text-sm flex items-center gap-2 transition-colors
                     ${simMode === 'SELECT' ? 'bg-[#1e1e2e] text-blue-400 border-b-2 md:border-b-0 md:border-l-4 border-blue-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <Eye size={16} /> 1. PREVIEW
                 </button>
                 <button
                   onClick={() => { setSimMode('UPDATE'); setHighlightedRows([]); }}
                   className={`flex-1 md:flex-none text-left px-4 py-4 font-bold text-sm flex items-center gap-2 transition-colors
                     ${simMode === 'UPDATE' ? 'bg-[#1e1e2e] text-amber-400 border-b-2 md:border-b-0 md:border-l-4 border-amber-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                   `}
                 >
                   <AlertTriangle size={16} /> 2. UPDATE
                 </button>
              </div>

              {/* Code Editor Area */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-sm leading-loose overflow-x-auto w-full">
                  {simMode === 'SELECT' ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-[#89b4fa] font-bold">SELECT</span> * <span className="text-[#89b4fa] font-bold">FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
                      {selectedCondition !== "NONE" && <span className="text-[#cba6f7] font-bold">WHERE</span>}
                      <select
                        value={selectedCondition}
                        onChange={(e) => { setSelectedCondition(e.target.value); setHighlightedRows([]); setIsDisaster(false); }}
                        className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 outline-none focus:border-blue-400"
                      >
                        <option value="category = 'IT'">category = 'IT'</option>
                        <option value="price < 5000">price &lt; 5000</option>
                        <option value="NONE">(ไม่มีเงื่อนไข - อันตราย!)</option>
                      </select>
                      <span className="text-slate-400">;</span>
                      <p className="mt-3 text-xs text-slate-500 border-t border-slate-700/50 pt-2 flex items-center gap-1.5"><HelpCircle size={12}/> กด Preview Data เพื่อดูแถวที่ได้รับผลกระทบจากเงื่อนไขที่คุณเลือก</p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">products</span> <br className="md:hidden"/>
                      <span className="text-[#f9e2af] font-bold">SET</span> price = price + <span className="text-[#fab387]">500</span><br/>

                      {selectedCondition !== "NONE" ? (
                        <>
                          <span className="text-[#cba6f7] font-bold">WHERE</span>
                          <span className="ml-2 bg-slate-800 border border-slate-600 text-[#fab387] rounded px-2 py-1 select-none opacity-80 cursor-not-allowed">
                            {selectedCondition}
                          </span>
                        </>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold animate-pulse">-- ไม่มี WHERE Clause! --</span>
                      )}

                      <span className="text-slate-400">;</span>
                      <p className="mt-3 text-xs text-amber-500/70 border-t border-slate-700/50 pt-2 flex items-center gap-1.5"><AlertTriangle size={12}/> นี่คือการเปลี่ยนแปลงข้อมูลจริง หากเงื่อนไขกว้างเกินไป ข้อมูลที่ไม่เกี่ยวข้องจะถูกแก้ไขด้วย</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end border-t border-slate-700/50 pt-3">
                  {simMode === 'SELECT' ? (
                    <button
                      onClick={handlePreview}
                      disabled={isAnimating}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      <Eye size={18} /> {isAnimating ? 'กำลังค้นหา...' : 'Preview Data'}
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      disabled={isAnimating || (selectedCondition === "NONE" && isDisaster)} // Disable if already ruined
                      className={`font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none
                        ${selectedCondition === 'NONE' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-lg shadow-amber-500/30'}
                      `}
                    >
                      <Play size={18} fill="currentColor" /> {isAnimating ? 'Executing...' : (selectedCondition === 'NONE' ? 'Execute (DANGER!)' : 'Execute Update')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom: Visual Table */}
            <div className={`p-6 bg-slate-50 transition-colors duration-500 ${isDisaster ? 'bg-rose-50/50' : ''}`}>
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={18} className="text-indigo-500"/> ตาราง Products</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-3 border-b font-semibold w-16">ID</th>
                        <th className="p-3 border-b font-semibold">Name</th>
                        <th className="p-3 border-b font-semibold">Category</th>
                        <th className="p-3 border-b font-semibold text-right">Price (THB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const isPriceChanged = row.price !== row.originalPrice;

                        // Styling logic based on mode and state
                        let rowClasses = "transition-all duration-500 ";
                        let priceClasses = "text-right p-3 font-mono text-sm font-medium transition-colors ";

                        if (isHighlighted) {
                          if (simMode === 'SELECT') {
                            rowClasses += "bg-blue-50 ";
                            priceClasses += "text-slate-700";
                          } else {
                            if (isDisaster) {
                              rowClasses += "bg-rose-100 ";
                              priceClasses += "text-rose-700 font-bold scale-110 transform origin-right";
                            } else {
                              rowClasses += "bg-emerald-50 ";
                              priceClasses += "text-emerald-700 font-bold scale-110 transform origin-right";
                            }
                          }
                        } else {
                           rowClasses += "bg-white hover:bg-slate-50";
                           if(isPriceChanged) priceClasses += "text-amber-600"; // Keep changed ones somewhat colored if focus lost
                           else priceClasses += "text-slate-600";
                        }

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-3 font-mono text-xs text-slate-400">{row.id}</td>
                            <td className="p-3 font-medium text-slate-800">{row.name}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                                ${row.category === 'IT' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
                              `}>{row.category}</span>
                            </td>
                            <td className={priceClasses}>
                              <div className="flex flex-col items-end justify-center h-full">
                                {isPriceChanged && (
                                   <span className="text-[10px] text-slate-400 line-through mb-0.5 leading-none">
                                     {row.originalPrice.toLocaleString()}
                                   </span>
                                )}
                                <span>{row.price.toLocaleString()}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
               {isDisaster && (
                 <div className="mt-4 p-4 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <ShieldAlert className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">จำลองความเสียหายสำเร็จ!</h4>
                      <p className="text-sm mt-1">นี่คือเหตุผลที่ต้องรัน SELECT ก่อนเสมอ สินค้าที่ไม่ใช่ IT เช่น เก้าอี้ โต๊ะ ถูกบวกราคาเพิ่มไปหมดแล้วในระบบจริง! กรุณากดปุ่มรีเซ็ตด้านบนเพื่อแก้ไขให้ถูกต้อง</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </section>

        {/* Section 3: Minigame */}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg"><HelpCircle className="text-amber-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">3. Syntax Challenge</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-emerald-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <CheckCircle2 className="text-emerald-950" size={24} />
                </div>
                <div>
                  <h3 className="text-emerald-300 font-bold text-lg mb-1">ภารกิจ: ล้างสต๊อกสินค้าเก่า</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    สมมติว่าคุณรัน <code>SELECT * FROM products WHERE status = 'obsolete'</code> ดูหน้าตาข้อมูลแล้วถูกต้อง<br/>
                    จงประกอบบล็อกคำสั่ง <strong className="text-amber-400">UPDATE</strong> เพื่อปรับลดราคา (price = 0) ให้กับสินค้ากลุ่มนั้น
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className="text-sm text-slate-400 font-mono font-medium">วางบล็อกเรียงลำดับคำสั่งที่ปลอดภัย:</p>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? 'bg-amber-500 text-amber-950 shadow-lg border border-amber-400 hover:scale-105 hover:-translate-y-1'
                          : 'min-w-[100px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-amber-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง (มีตัวหลอกซ่อนอยู่):</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> คืนค่า
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-30 cursor-not-allowed shadow-none scale-95'
                            : block.type === 'trick' ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-400 cursor-pointer'
                            : block.type === 'table' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-400 hover:-translate-y-1 cursor-pointer hover:shadow-amber-500/20 active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-slate-700 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast Component */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800 shadow-amber-500/20' :
          'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" /> :
           <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.6 การแก้ไขข้อมูล (UPDATE SET)
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  HelpCircle,
  AlertTriangle,
  Edit3,
  UserCheck,
  Calculator,
  Code2
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialEmployees = [
{ id: 'E01', name: 'สมชาย', position: 'Developer', salary: 30000, bonus: 0 },
{ id: 'E02', name: 'สมหญิง', position: 'Designer', salary: 28000, bonus: 0 },
{ id: 'E03', name: 'สมศรี', position: 'Tester', salary: 25000, bonus: 0 },
{ id: 'E04', name: 'สมปอง', position: 'Developer', salary: 32000, bonus: 0 },
];

// Store current state and keep a copy of initial state inside objects for easy comparison rendering
const createInitialState = () => initialEmployees.map(emp => ({
...emp,
orig_position: emp.position,
orig_salary: emp.salary,
orig_bonus: emp.bonus
}));

const [employees, setEmployees] = useState(createInitialState());
const [activeScenario, setActiveScenario] = useState('single');
const [isAnimating, setIsAnimating] = useState(false);
const [highlightedRows, setHighlightedRows] = useState([]);

// --- Scenarios Definition ---
const scenarios = {
single: {
id: 'single',
icon: <Edit3 size={18} />,
title: "1. แก้ไข 1 คอลัมน์",
desc: "ปรับเงินเดือนพนักงานรหัส E01 เป็น 35,000",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> salary = <span className="text-[#fab387]">35000</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#a6e3a1]">'E01'</span>;
</>
),
execute: (data) => {
let count = 0;
const newData = data.map(e => {
if (e.id === 'E01') { count++; return { ...e, salary: 35000 }; }
return e;
});
return { newData, count, matchIds: ['E01'] };
}
},
multiple: {
id: 'multiple',
icon: <UserCheck size={18} />,
title: "2. แก้ไขหลายคอลัมน์",
desc: "เลื่อนตำแหน่ง E03 เป็น QA Lead และปรับเงินเดือน",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> position = <span className="text-[#a6e3a1]">'QA Lead'</span><span className="text-rose-400 font-bold text-lg animate-pulse"> , </span><br/>
<span className="text-transparent">SET</span> salary = <span className="text-[#fab387]">32000</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#a6e3a1]">'E03'</span>;
</>
),
execute: (data) => {
let count = 0;
const newData = data.map(e => {
if (e.id === 'E03') { count++; return { ...e, position: 'QA Lead', salary: 32000 }; }
return e;
});
return { newData, count, matchIds: ['E03'] };
}
},
math: {
id: 'math',
icon: <Calculator size={18} />,
title: "3. แก้ไขด้วยการคำนวณ",
desc: "แจกโบนัสให้ Developer ทุกคน เพิ่มคนละ 5,000",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> bonus = <span className="border-b border-dashed border-slate-400 pb-0.5">bonus + <span className="text-[#fab387]">5000</span></span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> position = <span className="text-[#a6e3a1]">'Developer'</span>;
</>
),
execute: (data) => {
let count = 0;
let matchIds = [];
const newData = data.map(e => {
if (e.position === 'Developer' || e.orig_position === 'Developer') {
count++;
matchIds.push(e.id);
return { ...e, bonus: e.bonus + 5000 };
}
return e;
});
return { newData, count, matchIds };
}
}
};

const handleExecute = () => {
setIsAnimating(true);
setHighlightedRows([]);

    setTimeout(() => {
      const scenarioObj = scenarios[activeScenario];
      const { newData, count, matchIds } = scenarioObj.execute(employees);

      setEmployees(newData);
      setHighlightedRows(matchIds);
      setIsAnimating(false);
      showToast(`อัปเดตข้อมูลสำเร็จ! ผลกระทบ ${count} แถว`, 'success');
    }, 600);

};

const resetSimulator = () => {
setEmployees(createInitialState());
setHighlightedRows([]);
showToast('รีเซ็ตข้อมูลพนักงานกลับค่าเริ่มต้นแล้ว', 'success');
};

// --- Minigame State ---
const gameBlocks = [
{ id: 'b1', text: 'UPDATE users', type: 'cmd' },
{ id: 'b2', text: "SET status = 'active'", type: 'col' },
{ id: 'b3', text: ",", type: 'comma' },
{ id: 'b4', text: "role = 'admin'", type: 'col2' },
{ id: 'b5', text: 'WHERE id = 99', type: 'cond' },
{ id: 't1', text: 'AND', type: 'trick' },
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check for common mistake: using AND instead of comma
    if (ans.includes('t1')) {
      showToast('ผิดครับ! การอัปเดตหลายคอลัมน์ในคำสั่ง SET ต้องใช้ลูกน้ำ ( , ) คั่น ห้ามใช้ AND เด็ดขาด', 'error');
      return;
    }

    // Correct sequences (allowing swap of the two SET columns)
    const isCorrect1 = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5';
    const isCorrect2 = ans[0] === 'b1' && ans[1] === 'b4' && ans[2] === 'b3' && ans[3] === 'b2' && ans[4] === 'b5';

    if (isCorrect1 || isCorrect2) {
      showToast('ยอดเยี่ยม! ถูกต้องตามหลักไวยากรณ์ การใช้ลูกน้ำ (,) คั่นคอลัมน์คือหัวใจสำคัญ', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> SET col1 -> , -> col2 -> WHERE', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-teal-700 to-cyan-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
<Edit3 className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-teal-100">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-cyan-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-cyan-400/50 backdrop-blur-md shadow-inner text-white">
Unit 3.6 การแก้ไขข้อมูล (SET)
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              กลไกการทำงานของ <span className="text-teal-600">SET Clause</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              หลังจากที่ใช้คำสั่ง <code className="bg-slate-200 px-1.5 rounded font-bold">UPDATE</code> เพื่อบอกว่าจะแก้ไขตารางไหนแล้ว เราต้องใช้ <code className="bg-teal-100 text-teal-800 px-1.5 rounded font-bold">SET</code> เพื่อกำหนด <strong>"คอลัมน์"</strong> และ <strong>"ค่าใหม่"</strong> ที่ต้องการเปลี่ยน
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Edit3 className="text-blue-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไข 1 คอลัมน์</h3>
                <p className="text-sm text-slate-600 mb-4">กำหนดค่าตรงไปตรงมา</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET salary = 35000
                </code>
             </div>

             <div className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">ระวังผิดบ่อย!</div>
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><UserCheck className="text-teal-600"/></div>
                <h3 className="font-bold text-teal-900 mb-2">แก้ไขหลายคอลัมน์</h3>
                <p className="text-sm text-teal-700 mb-4">ต้องใช้ <strong className="text-rose-500 text-lg">,</strong> คั่นเสมอ (ห้ามใช้ AND)</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET status = 'A'<span className="text-rose-400 font-bold text-lg">,</span> <br/>role = 'admin'
                </code>
             </div>

             <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Calculator className="text-amber-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2">แก้ไขด้วยการคำนวณ</h3>
                <p className="text-sm text-slate-600 mb-4">อ้างอิงค่าเดิมมาบวก/ลบได้</p>
                <code className="block bg-slate-800 text-teal-300 p-3 rounded-lg text-sm font-mono">
                  SET price = price + 50
                </code>
             </div>
          </div>
        </section>

        {}
        {/* Section 2: Simulator */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-lg"><Code2 className="text-teal-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: UPDATE SET Patterns</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-1.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
              <RefreshCcw size={14} /> รีเซ็ตข้อมูล
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Sidebar: Scenarios */}
              <div className="flex flex-col bg-slate-900 md:w-64 shrink-0 border-r border-slate-700">
                 <div className="px-4 py-3 border-b border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">เลือกรูปแบบคำสั่ง</div>
                 {Object.keys(scenarios).map((key) => {
                   const isActive = activeScenario === key;
                   return (
                     <button
                       key={key}
                       onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                       className={`text-left px-4 py-4 flex items-start gap-3 transition-colors border-l-4
                         ${isActive ? 'bg-[#1e1e2e] text-teal-400 border-teal-500' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}
                       `}
                     >
                       <div className={`mt-0.5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`}>
                         {scenarios[key].icon}
                       </div>
                       <div>
                         <div className="font-bold text-sm mb-1">{scenarios[key].title}</div>
                         <div className="text-xs opacity-70 leading-snug">{scenarios[key].desc}</div>
                       </div>
                     </button>
                   )
                 })}
              </div>

              {/* Code Editor Area */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="font-mono text-[15px] leading-loose overflow-x-auto w-full pt-2">
                   <div key={activeScenario} className="animate-in fade-in slide-in-from-right-4 duration-300">
                     {scenarios[activeScenario].sql}
                   </div>
                </div>

                <div className="flex justify-end border-t border-slate-700/50 pt-4">
                  <button
                    onClick={handleExecute}
                    disabled={isAnimating}
                    className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <Play size={18} fill="currentColor" /> {isAnimating ? 'Executing...' : 'Run Update'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom: Visual Table */}
            <div className="p-6 bg-slate-50">
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2"><Table2 size={18} className="text-teal-600"/> ตาราง Employees</span>
               </h3>

               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="p-3 border-b font-semibold w-16 text-center">ID</th>
                        <th className="p-3 border-b font-semibold">Name</th>
                        <th className="p-3 border-b font-semibold">Position</th>
                        <th className="p-3 border-b font-semibold text-right">Salary (THB)</th>
                        <th className="p-3 border-b font-semibold text-right">Bonus (THB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {employees.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const posChanged = row.position !== row.orig_position;
                        const salChanged = row.salary !== row.orig_salary;
                        const bonChanged = row.bonus !== row.orig_bonus;

                        let rowClasses = "transition-all duration-500 ";
                        if (isHighlighted) rowClasses += "bg-teal-50 ";
                        else rowClasses += "bg-white hover:bg-slate-50";

                        const renderCell = (currentVal, origVal, isChanged, highlightClass = "text-teal-700 font-bold bg-teal-100/50 px-2 py-0.5 rounded") => {
                          if (isChanged) {
                            return (
                              <div className="flex flex-col justify-center animate-in zoom-in duration-500">
                                <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">{origVal.toLocaleString()}</span>
                                <span className={highlightClass}>{currentVal.toLocaleString()}</span>
                              </div>
                            );
                          }
                          return <span>{currentVal.toLocaleString()}</span>;
                        };

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-3 font-mono text-xs text-slate-400 text-center">{row.id}</td>
                            <td className="p-3 font-medium text-slate-700">{row.name}</td>
                            <td className="p-3">
                              {renderCell(row.position, row.orig_position, posChanged, "text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded text-xs")}
                            </td>
                            <td className="p-3 text-right font-mono text-sm">
                               {renderCell(row.salary, row.orig_salary, salChanged)}
                            </td>
                            <td className="p-3 text-right font-mono text-sm">
                               {renderCell(row.bonus, row.orig_bonus, bonChanged, "text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        </section>

        {}
        {/* Section 3: Minigame */}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg"><HelpCircle className="text-indigo-600" /></div>
            <h2 className="text-2xl font-bold text-slate-800">Syntax Challenge: กับดัก AND</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-inner">
                <div className="bg-amber-400 p-2.5 rounded-xl shadow-lg shrink-0">
                  <AlertTriangle className="text-amber-950" size={24} />
                </div>
                <div>
                  <h3 className="text-amber-300 font-bold text-lg mb-1">ภารกิจ: อัปเดตหลายค่าพร้อมกัน</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    จงประกอบคำสั่งเพื่ออัปเดตตาราง users <br/>
                    โดยเปลี่ยนสถานะ (status) เป็น 'active' <strong>และ</strong> เลื่อนขั้น (role) เป็น 'admin' ให้กับ user ที่ id = 99
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-8 overflow-x-auto pb-4">
                <div className="flex items-center gap-2 mb-3 min-w-max">
                  <span className="text-sm text-slate-400 font-mono font-medium">เรียงบล็อกคำสั่งที่นี่:</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-2xl border border-slate-700 min-h-[90px] shadow-inner min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-12 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? (block.type === 'comma' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 px-6 text-xl' : 'bg-teal-500 text-teal-950 shadow-lg border border-teal-400 hover:scale-105')
                          : 'min-w-[80px] bg-slate-800/80 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-teal-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900 border-solid bg-slate-800' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วน ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-500 font-mono text-2xl ml-1 font-bold">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-slate-400 font-mono font-medium">คลังบล็อกคำสั่ง (ระวังตัวหลอก!):</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-1.5 text-sm bg-slate-800 px-3 py-1 rounded-full transition-colors border border-slate-700">
                    <RefreshCcw size={14} /> คืนค่า
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-inner">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-800 text-slate-600 border-slate-700 opacity-30 cursor-not-allowed shadow-none scale-95'
                            : block.type === 'trick' ? 'bg-indigo-900 text-indigo-300 border-indigo-700 hover:bg-indigo-800 cursor-pointer'
                            : block.type === 'comma' ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 text-xl px-6 cursor-pointer'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-400 hover:-translate-y-1 cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end border-t border-slate-700 pt-6">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 size={20} /> ตรวจคำตอบ
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast Component */}
      <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 max-w-sm w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800 shadow-amber-500/20' :
          'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" /> :
           <AlertCircle className="text-rose-500 shrink-0 mt-0.5" />}
          <span className="font-medium text-sm md:text-base leading-snug pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.7 เงื่อนไขการแก้ไข (UPDATE WHERE)
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  HelpCircle,
  AlertTriangle,
  Filter,
  Users,
  Target,
  Zap,
  Code2
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialEmployees = [
{ id: 'E01', name: 'สมชาย', dept: 'IT', salary: 25000, perf: 'A', bonus: 0 },
{ id: 'E02', name: 'สมหญิง', dept: 'HR', salary: 35000, perf: 'B', bonus: 0 },
{ id: 'E03', name: 'สมศรี', dept: 'IT', salary: 45000, perf: 'A', bonus: 0 },
{ id: 'E04', name: 'สมปอง', dept: 'Sales', salary: 28000, perf: 'C', bonus: 0 },
{ id: 'E05', name: 'สมหมาย', dept: 'IT', salary: 29000, perf: 'B', bonus: 0 },
];

// Store current state and keep a copy of initial state inside objects for easy comparison rendering
const createInitialState = () => initialEmployees.map(emp => ({
...emp,
orig_salary: emp.salary,
orig_perf: emp.perf,
orig_bonus: emp.bonus
}));

const [employees, setEmployees] = useState(createInitialState());
const [activeScenario, setActiveScenario] = useState('exact');
const [isAnimating, setIsAnimating] = useState(false);
const [highlightedRows, setHighlightedRows] = useState([]);

const scenarios = {
exact: {
id: 'exact',
icon: <Target size={18} />,
title: "1. ระบุตัวตน (Exact Match)",
desc: "แก้ไขข้อมูลเฉพาะคนที่ระบุรหัสตรงเป๊ะ (id = 'E04')",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> perf = <span className="text-[#a6e3a1]">'B'</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#a6e3a1]">'E04'</span>;
</>
),
execute: (data) => {
let count = 0;
const newData = data.map(e => {
if (e.id === 'E04') { count++; return { ...e, perf: 'B' }; }
return e;
});
return { newData, count, matchIds: ['E04'] };
}
},
range: {
id: 'range',
icon: <Filter size={18} />,
title: "2. เงื่อนไขช่วง (Range/Compare)",
desc: "ปรับเงินเดือนให้คนที่เงินเดือนน้อยกว่า 30,000",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> salary = <span className="text-[#fab387]">30000</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> salary <span className="text-[#89dceb] font-bold">&lt;</span> <span className="text-[#fab387]">30000</span>;
</>
),
execute: (data) => {
let count = 0;
let matchIds = [];
const newData = data.map(e => {
if (e.orig_salary < 30000) {
count++;
matchIds.push(e.id);
return { ...e, salary: 30000 };
}
return e;
});
return { newData, count, matchIds };
}
},
logical: {
id: 'logical',
icon: <Users size={18} />,
title: "3. หลายเงื่อนไข (Logical AND)",
desc: "แจกโบนัสให้แผนก IT 'และ' ต้องได้ประเมินเกรด A",
sql: (
<>
<span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br/>
<span className="text-[#f9e2af] font-bold">SET</span> bonus = <span className="text-[#fab387]">10000</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> dept = <span className="text-[#a6e3a1]">'IT'</span> <br/>
<span className="text-[#cba6f7] font-bold ml-8">AND</span> perf = <span className="text-[#a6e3a1]">'A'</span>;
</>
),
execute: (data) => {
let count = 0;
let matchIds = [];
const newData = data.map(e => {
if (e.dept === 'IT' && e.orig_perf === 'A') {
count++;
matchIds.push(e.id);
return { ...e, bonus: 10000 };
}
return e;
});
return { newData, count, matchIds };
}
}
};

const handleExecute = () => {
setIsAnimating(true);
setHighlightedRows([]);

    setTimeout(() => {
      const scenarioObj = scenarios[activeScenario];
      const { newData, count, matchIds } = scenarioObj.execute(employees);

      setEmployees(newData);
      setHighlightedRows(matchIds);
      setIsAnimating(false);

      if (count > 0) {
        showToast(`แก้ไขข้อมูลสำเร็จ! พบข้อมูลที่ตรงเงื่อนไข ${count} แถว`, 'success');
      } else {
        showToast(`คำสั่งทำงานสำเร็จ แต่ไม่มีข้อมูลแถวใดตรงกับเงื่อนไขเลย (0 Rows updated)`, 'warning');
      }
    }, 600);

};

const resetSimulator = () => {
setEmployees(createInitialState());
setHighlightedRows([]);
showToast('รีเซ็ตข้อมูลพนักงานกลับค่าเริ่มต้นแล้ว', 'success');
};

const gameBlocks = [
{ id: 'b1', text: 'UPDATE users', type: 'cmd' },
{ id: 'b2', text: "SET status = 'VIP'", type: 'col' },
{ id: 'b3', text: 'WHERE points > 1000', type: 'cond1' },
{ id: 'b4', text: 'AND', type: 'logic' },
{ id: 'b5', text: 'level = 5', type: 'cond2' },
{ id: 't1', text: ',', type: 'trick' },
];

const [dropzones, setDropzones] = useState(Array(5).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 5 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check for common mistake: using comma instead of AND in WHERE clause
    if (ans.includes('t1')) {
      showToast('ผิดครับ! การเชื่อมหลายเงื่อนไขใน WHERE ต้องใช้ AND หรือ OR ห้ามใช้ลูกน้ำ (,) เด็ดขาด', 'error');
      return;
    }

    // Correct sequences
    const isCorrect1 = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4' && ans[4] === 'b5';
    const isCorrect2 = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b5' && ans[3] === 'b4' && ans[4] === 'b3';

    if (isCorrect1 || isCorrect2) {
      showToast('ยอดเยี่ยม! คุณเข้าใจความแตกต่างของการใช้ลูกน้ำใน SET และการใช้ AND ใน WHERE แล้ว', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: UPDATE -> SET -> WHERE -> AND -> Condition', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(5).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-indigo-50/50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-violet-700 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-inner">
<Filter className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-indigo-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-indigo-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-400/50 backdrop-blur-md shadow-inner text-white">
Unit 3.7 เงื่อนไขการแก้ไข (WHERE)
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Section 1: Theory */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-full mb-2">
               <Zap className="text-violet-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              เจาะจงเป้าหมายด้วย <span className="text-violet-600 bg-violet-100 px-3 py-1 rounded-lg">WHERE Clause</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              การใช้ <code className="bg-slate-200 px-1.5 rounded font-bold text-slate-700">UPDATE</code> โดยไม่มี `WHERE` จะทำให้ข้อมูลเปลี่ยน <strong>"ทั้งตาราง"</strong> ดังนั้นเราจึงต้องใช้เงื่อนไข <code className="bg-violet-100 text-violet-800 px-1.5 rounded font-bold">WHERE</code> เสมอ เพื่อระบุว่า <strong>"ต้องการแก้ไขแถวไหนบ้าง"</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Target className="text-indigo-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">เงื่อนไขแบบเจาะจง</h3>
                <p className="text-sm text-slate-600 mb-4">อัปเดตเฉพาะแถวที่มีค่าตรงกับที่ระบุเป๊ะๆ มักใช้กับ Primary Key</p>
                <code className="block bg-slate-800 text-indigo-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                  WHERE id = 'E01'
                </code>
             </div>

             <div className="bg-white border-2 border-fuchsia-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-fuchsia-300 transition-all duration-300">
                <div className="bg-fuchsia-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Filter className="text-fuchsia-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">เงื่อนไขแบบช่วง (Range)</h3>
                <p className="text-sm text-slate-600 mb-4">ใช้เครื่องหมาย &gt;, &lt;, &gt;=, &lt;= ในการหาช่วงข้อมูลที่ต้องการอัปเดต</p>
                <code className="block bg-slate-800 text-fuchsia-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                  WHERE salary &lt; 30000
                </code>
             </div>

             <div className="bg-violet-50 border-2 border-violet-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">จุดผิดบ่อย!</div>
                <div className="bg-violet-200 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Users className="text-violet-700"/></div>
                <h3 className="font-bold text-violet-900 mb-2 text-lg">หลายเงื่อนไข</h3>
                <p className="text-sm text-violet-700 mb-4">ห้ามใช้ลูกน้ำ (,) คั่น! ต้องใช้ <strong className="text-violet-800 bg-white px-1 rounded">AND</strong> หรือ <strong className="text-violet-800 bg-white px-1 rounded">OR</strong> เท่านั้น</p>
                <code className="block bg-slate-800 text-violet-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                  WHERE dept = 'IT'<br/><span className="text-white font-bold bg-violet-600/50 px-1 rounded">AND</span> perf = 'A'
                </code>
             </div>
          </div>
        </section>

        {/* Section 2: Simulator */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg shadow-sm border border-indigo-200"><Code2 className="text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: UPDATE WHERE In Action</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-indigo-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm">
              <RefreshCcw size={16} /> รีเซ็ตตารางข้อมูล
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Sidebar: Scenarios */}
              <div className="flex flex-col bg-slate-900 md:w-72 shrink-0 border-r border-slate-700 z-10 shadow-xl">
                 <div className="px-5 py-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                   <Filter size={14}/> เลือกสถานการณ์
                 </div>
                 {Object.keys(scenarios).map((key) => {
                   const isActive = activeScenario === key;
                   return (
                     <button
                       key={key}
                       onClick={() => { setActiveScenario(key); setHighlightedRows([]); }}
                       className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                         ${isActive ? 'bg-[#2a2a3c] text-violet-400 border-violet-500 shadow-inner' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}
                       `}
                     >
                       {isActive && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.8)]"></div>}
                       <div className={`mt-0.5 p-1.5 rounded-lg ${isActive ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
                         {scenarios[key].icon}
                       </div>
                       <div>
                         <div className={`font-bold text-sm mb-1 ${isActive ? 'text-violet-300' : 'text-slate-300'}`}>{scenarios[key].title}</div>
                         <div className="text-xs opacity-80 leading-relaxed">{scenarios[key].desc}</div>
                       </div>
                     </button>
                   )
                 })}
              </div>

              {/* Code Editor Area */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6 relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Database size={120} />
                </div>

                <div className="font-mono text-base md:text-lg leading-[2] overflow-x-auto w-full z-10">
                   <div key={activeScenario} className="animate-in fade-in zoom-in-95 duration-300">
                     {scenarios[activeScenario].sql}
                   </div>
                </div>

                <div className="flex justify-end border-t border-slate-700/50 pt-5 z-10 mt-4">
                  <button
                    onClick={handleExecute}
                    disabled={isAnimating}
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <Play size={18} fill="currentColor" /> {isAnimating ? 'Updating...' : 'รันคำสั่ง (Execute)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom: Visual Table */}
            <div className="p-6 bg-slate-50/80">
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-4 px-2">
                  <span className="flex items-center gap-2 text-lg"><Table2 size={20} className="text-indigo-600"/> ตาราง พนักงาน (Employees)</span>
                  {highlightedRows.length > 0 && (
                     <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                       <CheckCircle2 size={12}/> อัปเดต {highlightedRows.length} แถว
                     </span>
                  )}
               </h3>

               <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-100/80 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-semibold w-16 text-center">ID</th>
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold text-center">Department</th>
                        <th className="p-4 font-semibold text-center">Perf. Grade</th>
                        <th className="p-4 font-semibold text-right">Salary (THB)</th>
                        <th className="p-4 font-semibold text-right pr-6">Bonus (THB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {employees.map((row) => {
                        const isHighlighted = highlightedRows.includes(row.id);
                        const salChanged = row.salary !== row.orig_salary;
                        const perfChanged = row.perf !== row.orig_perf;
                        const bonChanged = row.bonus !== row.orig_bonus;

                        let rowClasses = "transition-all duration-700 ";
                        if (isHighlighted) rowClasses += "bg-violet-50/80 border-l-4 border-violet-500 shadow-[inset_0_0_15px_rgba(139,92,246,0.1)]";
                        else rowClasses += "bg-white hover:bg-slate-50 border-l-4 border-transparent";

                        const renderCell = (currentVal, origVal, isChanged, highlightClass = "text-violet-700 font-bold bg-violet-100 px-2 py-1 rounded-md shadow-sm") => {
                          if (isChanged) {
                            return (
                              <div className="flex flex-col justify-center items-end md:items-center animate-in slide-in-from-top-2 fade-in duration-500">
                                <span className="text-[10px] text-slate-400 line-through leading-none mb-1 opacity-70">{origVal.toLocaleString()}</span>
                                <span className={highlightClass}>{currentVal.toLocaleString()}</span>
                              </div>
                            );
                          }
                          return <span>{currentVal.toLocaleString()}</span>;
                        };

                        return (
                          <tr key={row.id} className={rowClasses}>
                            <td className="p-4 font-mono text-xs text-slate-400 text-center font-semibold">{row.id}</td>
                            <td className="p-4 font-medium text-slate-700">{row.name}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.dept === 'IT' ? 'bg-blue-100 text-blue-700' : row.dept === 'HR' ? 'bg-pink-100 text-pink-700' : 'bg-orange-100 text-orange-700'}`}>
                                {row.dept}
                              </span>
                            </td>
                            <td className="p-4 text-center font-bold text-slate-600">
                              {renderCell(row.perf, row.orig_perf, perfChanged, "text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md shadow-sm scale-110 inline-block")}
                            </td>
                            <td className="p-4 text-right font-mono text-sm">
                               {renderCell(row.salary, row.orig_salary, salChanged, "text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded-md border border-rose-200")}
                            </td>
                            <td className="p-4 text-right font-mono text-sm pr-6">
                               {renderCell(row.bonus, row.orig_bonus, bonChanged, "text-amber-600 font-bold bg-amber-100 px-2 py-1 rounded-md shadow-sm")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: Minigame */}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-rose-100 p-2.5 rounded-xl shadow-sm border border-rose-200"><AlertTriangle className="text-rose-600" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Syntax Challenge: กับดักระหว่าง SET และ WHERE</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบความเข้าใจ จุดที่คนเขียน SQL ผิดบ่อยที่สุด</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-indigo-400 to-violet-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <Target className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-indigo-300 font-bold text-xl mb-2">ภารกิจ: เลื่อนขั้นระดับ VIP</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อเปลี่ยนสถานะ (status) เป็น 'VIP' <br className="hidden md:block"/>
                    ให้กับ user ที่มี <span className="text-white font-mono bg-slate-700 px-1 rounded">points &gt; 1000</span> <strong>และ</strong> <span className="text-white font-mono bg-slate-700 px-1 rounded">level = 5</span>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 overflow-x-auto pb-6">
                <div className="flex items-center gap-2 mb-4 min-w-max px-2">
                  <span className="text-sm text-slate-400 font-mono font-bold tracking-widest uppercase">Query Workspace</span>
                </div>
                <div className="flex items-center gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-5 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] px-6 text-2xl' : 'bg-indigo-500 text-white shadow-lg border border-indigo-400 hover:-translate-y-1 hover:shadow-indigo-500/50')
                          : 'min-w-[100px] bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-600 font-mono text-4xl ml-2 font-bold leading-none">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-4 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank (คลิกเพื่อเลือก)</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-5 py-3 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-40 cursor-not-allowed shadow-none scale-95'
                            : block.type === 'trick' ? 'bg-slate-700 text-rose-300 border-rose-900/50 hover:bg-slate-600 hover:text-rose-200 hover:border-rose-500 cursor-pointer text-2xl px-6'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-xl cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบโค้ด
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast Component */}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.8 การประเมินก่อนลบ
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  Play,
  CheckCircle2,
  AlertCircle,
  Table2,
  RefreshCcw,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  Eye,
  Search,
  AlertOctagon,
  Code2,
  FileWarning
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialUsers = [
{ id: 'U01', username: 'admin_somchai', role: 'Admin', status: 'Active', days_inactive: 1 },
{ id: 'U02', username: 'guest_001', role: 'Guest', status: 'Inactive', days_inactive: 400 },
{ id: 'U03', username: 'spam_bot99', role: 'User', status: 'Banned', days_inactive: 2 },
{ id: 'U04', username: 'user_somsri', role: 'User', status: 'Active', days_inactive: 0 },
{ id: 'U05', username: 'test_account', role: 'Guest', status: 'Inactive', days_inactive: 365 },
];

const [users, setUsers] = useState([...initialUsers]);
const [activeScenario, setActiveScenario] = useState('banned');
const [step, setStep] = useState(1); // 1 = Preview (SELECT), 2 = Execute (DELETE)
const [highlightedRows, setHighlightedRows] = useState([]);
const [isAnimating, setIsAnimating] = useState(false);

const scenarios = {
banned: {
id: 'banned',
icon: <ShieldCheck size={18} />,
title: "1. ลบไอดีที่ถูกแบน",
desc: "เป้าหมาย: ลบ User ที่มีสถานะเป็น 'Banned'",
selectSql: (
<>
<span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">_</span><br/>
<span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#a6e3a1]">'Banned'</span>;
</>
),
deleteSql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#a6e3a1]">'Banned'</span>;
</>
),
evaluate: (data) => data.filter(r => r.status === 'Banned').map(r => r.id)
},
guest: {
id: 'guest',
icon: <Search size={18} />,
title: "2. ลบบัญชี Guest เก่า",
desc: "เป้าหมาย: ลบ Role 'Guest' ที่ไม่ได้ใช้งานเกิน 300 วัน",
selectSql: (
<>
<span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">_</span><br/>
<span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> role = <span className="text-[#a6e3a1]">'Guest'</span> <br/>
<span className="text-[#cba6f7] font-bold ml-8">AND</span> days_inactive {'>'} <span className="text-[#fab387]">300</span>;
</>
),
deleteSql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> role = <span className="text-[#a6e3a1]">'Guest'</span> <br/>
<span className="text-[#cba6f7] font-bold ml-8">AND</span> days_inactive {'>'} <span className="text-[#fab387]">300</span>;
</>
),
evaluate: (data) => data.filter(r => r.role === 'Guest' && r.days_inactive > 300).map(r => r.id)
},
disaster: {
id: 'disaster',
icon: <AlertOctagon size={18} />,
title: "3. ภัยพิบัติ (ลืม WHERE)",
desc: "เป้าหมาย: รันคำสั่ง DELETE โดยไม่มีเงื่อนไข",
selectSql: (
<>
<span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">\*</span><br/>
<span className="text-[#cba6f7] font-bold">FROM</span> <span className="text-[#a6e3a1]">users</span>;
</>
),
deleteSql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">users</span>;
</>
),
evaluate: (data) => data.map(r => r.id) // All rows
}
};

const handleSelectPreview = () => {
setIsAnimating(true);
setTimeout(() => {
const matchIds = scenarios[activeScenario].evaluate(users);
setHighlightedRows(matchIds);
setStep(2);
setIsAnimating(false);

      if (matchIds.length > 0) {
        if (activeScenario === 'disaster') {
          showToast(`คำเตือนร้ายแรง! คุณกำลังจะลบข้อมูลทั้งหมด ${matchIds.length} แถว (ทั้งตาราง!)`, 'error');
        } else {
          showToast(`ค้นพบข้อมูลที่ตรงเงื่อนไข ${matchIds.length} แถว ตรวจสอบก่อนกดยืนยันการลบ`, 'warning');
        }
      } else {
        showToast(`ไม่พบข้อมูลที่ตรงเงื่อนไข (0 Rows found)`, 'success');
        setStep(1); // Reset to step 1 if nothing to delete
      }
    }, 500);

};

const handleExecuteDelete = () => {
setIsAnimating(true);
setTimeout(() => {
const matchIds = scenarios[activeScenario].evaluate(users);
const remainingUsers = users.filter(u => !matchIds.includes(u.id));

      setUsers(remainingUsers);
      setHighlightedRows([]);
      setStep(1);
      setIsAnimating(false);

      if (activeScenario === 'disaster') {
        showToast(`หายนะ! ข้อมูลถูกลบเกลี้ยงตารางแล้ว (${matchIds.length} แถว)`, 'error');
      } else {
        showToast(`ลบข้อมูลสำเร็จ ${matchIds.length} แถว`, 'success');
      }
    }, 600);

};

const resetSimulator = () => {
setUsers([...initialUsers]);
setHighlightedRows([]);
setStep(1);
showToast('รีเซ็ตตารางข้อมูลกลับค่าเริ่มต้นแล้ว', 'success');
};

const handleScenarioChange = (key) => {
setActiveScenario(key);
setHighlightedRows([]);
setStep(1);
};

const gameBlocks = [
{ id: 'b1', text: 'DELETE', type: 'cmd' },
{ id: 'b2', text: 'FROM users', type: 'col' },
{ id: 'b3', text: 'WHERE', type: 'logic' },
{ id: 'b4', text: "status = 'spam'", type: 'cond' },
{ id: 't1', text: '*', type: 'trick' },
];

const [dropzones, setDropzones] = useState(Array(4).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 4 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    // Check for common mistake: using * in DELETE
    if (ans.includes('t1')) {
      showToast('ผิดครับ! DELETE ลบข้อมูล "ทั้งแถว" เสมอ จึงห้ามใช้เครื่องหมายดอกจัน (*) ต่อท้าย DELETE เด็ดขาด', 'error');
      return;
    }

    // Correct sequences
    const isCorrect = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3' && ans[3] === 'b4';

    if (isCorrect) {
      showToast('ยอดเยี่ยม! คุณเข้าใจ Syntax ของคำสั่ง DELETE ที่ถูกต้องแล้ว (DELETE FROM table WHERE ...)', 'success');
    } else {
       showToast('การเรียงลำดับยังไม่ถูกต้อง ลองทบทวนโครงสร้าง: DELETE -> FROM table -> WHERE -> Condition', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(4).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-rose-50/30 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-rose-700 to-red-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-inner">
<FileWarning className="text-white" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-rose-200">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-rose-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-400/50 backdrop-blur-md shadow-inner text-white">
Unit 3.8 การประเมินก่อนลบ
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        { }
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-2">
               <ShieldCheck className="text-red-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              กฎเหล็กของ DBA: <span className="text-rose-600 bg-rose-100 px-3 py-1 rounded-lg">Check Before DELETE</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              คำสั่ง <code className="bg-rose-100 text-rose-800 px-1.5 rounded font-bold">DELETE</code> เป็นคำสั่งที่อันตรายที่สุดใน SQL หากคุณลืมใส่ `WHERE` ข้อมูลจะหายไปทั้งตารางทันที กฎของมืออาชีพคือ <strong>"ให้ใช้ SELECT เพื่อค้นหาและพรีวิวข้อมูลที่จะลบก่อนเสมอ"</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white border-2 border-emerald-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Eye className="text-emerald-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">Step 1: SELECT (Preview)</h3>
                <p className="text-sm text-slate-600 mb-4">เขียนคำสั่งค้นหาข้อมูลด้วยเงื่อนไขที่คุณต้องการลบ เพื่อตรวจสอบว่าแถวที่ได้ตรงตามความต้องการหรือไม่</p>
                <code className="block bg-slate-800 text-emerald-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                  SELECT * FROM users<br/>WHERE status = 'Banned'
                </code>
             </div>

             <div className="bg-white border-2 border-rose-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300">
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Trash2 className="text-rose-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">Step 2: DELETE (Execute)</h3>
                <p className="text-sm text-slate-600 mb-4">เมื่อมั่นใจแล้ว ให้เปลี่ยนคำว่า SELECT * เป็น DELETE แล้วกดรันคำสั่ง ข้อมูลชุดนั้นจะถูกลบทิ้งถาวร</p>
                <code className="block bg-slate-800 text-rose-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                  DELETE FROM users<br/>WHERE status = 'Banned'
                </code>
             </div>

             <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">จุดผิดบ่อยสุดๆ!</div>
                <div className="bg-red-200 w-12 h-12 rounded-full flex items-center justify-center mb-4"><AlertTriangle className="text-red-700"/></div>
                <h3 className="font-bold text-red-900 mb-2 text-lg">ห้ามใส่ดอกจัน (*)</h3>
                <p className="text-sm text-red-700 mb-4">DELETE หมายถึงการลบ "ทั้งแถว" เสมอ จึงไม่ต้องระบุคอลัมน์เหมือนคำสั่ง SELECT</p>
                <div className="space-y-2">
                  <code className="block bg-red-900/10 text-red-700 p-2 rounded-lg text-xs font-mono line-through opacity-70">
                    DELETE * FROM users
                  </code>
                  <code className="block bg-emerald-900/10 text-emerald-700 p-2 rounded-lg text-xs font-mono font-bold">
                    DELETE FROM users
                  </code>
                </div>
             </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-lg shadow-sm border border-rose-200"><Code2 className="text-rose-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: SELECT before DELETE</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-rose-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm">
              <RefreshCcw size={16} /> รีเซ็ตตารางข้อมูล
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">

            {/* Top: SQL Command Builder */}
            <div className="bg-[#1e1e2e] relative flex flex-col md:flex-row border-b border-slate-700">

              {/* Sidebar: Scenarios */}
              <div className="flex flex-col bg-slate-900 md:w-72 shrink-0 border-r border-slate-700 z-10 shadow-xl">
                 <div className="px-5 py-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                   <Search size={14}/> เลือกสถานการณ์ลบข้อมูล
                 </div>
                 {Object.keys(scenarios).map((key) => {
                   const isActive = activeScenario === key;
                   return (
                     <button
                       key={key}
                       onClick={() => handleScenarioChange(key)}
                       className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                         ${isActive ? 'bg-[#2a2a3c] text-rose-400 border-rose-500 shadow-inner' : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'}
                       `}
                     >
                       {isActive && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_8px_rgba(2fb,113,133,0.8)]"></div>}
                       <div className={`mt-0.5 p-1.5 rounded-lg ${isActive ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-500'}`}>
                         {scenarios[key].icon}
                       </div>
                       <div>
                         <div className={`font-bold text-sm mb-1 ${isActive ? 'text-rose-300' : 'text-slate-300'}`}>{scenarios[key].title}</div>
                         <div className="text-xs opacity-80 leading-relaxed">{scenarios[key].desc}</div>
                       </div>
                     </button>
                   )
                 })}
              </div>

              {/* Code Editor Area */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6 relative">
                {/* Flow Progress Indicator */}
                <div className="flex items-center gap-4 mb-2 z-10">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${step === 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-500'}`}>
                    <Eye size={16}/> 1. พรีวิวข้อมูล
                  </div>
                  <div className="h-0.5 w-8 bg-slate-700"></div>
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${step === 2 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-slate-800 text-slate-500'}`}>
                    <Trash2 size={16}/> 2. ยืนยันการลบ
                  </div>
                </div>

                <div className="font-mono text-base md:text-lg leading-[2] overflow-x-auto w-full z-10 p-4 bg-black/40 rounded-xl border border-slate-700/50">
                   <div key={`${activeScenario}-${step}`} className="animate-in fade-in zoom-in-95 duration-300">
                     {step === 1 ? scenarios[activeScenario].selectSql : scenarios[activeScenario].deleteSql}
                   </div>
                </div>

                <div className="flex justify-end pt-2 z-10 mt-2">
                  {step === 1 ? (
                    <button
                      onClick={handleSelectPreview}
                      disabled={isAnimating}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                    >
                      <Search size={18} /> {isAnimating ? 'กำลังค้นหา...' : 'ค้นหา (SELECT) เพื่อพรีวิว'}
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                      >
                        ยกเลิก
                      </button>
                      <button
                        onClick={handleExecuteDelete}
                        disabled={isAnimating}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 animate-pulse"
                      >
                        <Trash2 size={18} fill="currentColor" /> {isAnimating ? 'กำลังลบข้อมูล...' : 'รันคำสั่ง (DELETE)'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {}
            <div className="p-6 bg-slate-50/80">
               <h3 className="font-bold text-slate-700 flex items-center justify-between mb-4 px-2">
                  <span className="flex items-center gap-2 text-lg"><Table2 size={20} className="text-rose-600"/> ตาราง บัญชีผู้ใช้ (Users)</span>
                  {highlightedRows.length > 0 && step === 2 && (
                     <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full animate-pulse flex items-center gap-1 border border-amber-300">
                       <AlertTriangle size={12}/> เตรียมลบ {highlightedRows.length} แถว
                     </span>
                  )}
               </h3>

               <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {users.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
                      <Database size={48} className="mb-4 opacity-20" />
                      <p>ไม่มีข้อมูลเหลืออยู่ในตาราง (Table is empty)</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-slate-100/80 text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="p-4 font-semibold w-16 text-center">ID</th>
                          <th className="p-4 font-semibold">Username</th>
                          <th className="p-4 font-semibold text-center">Role</th>
                          <th className="p-4 font-semibold text-center">Status</th>
                          <th className="p-4 font-semibold text-right pr-6">Inactive Days</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((row) => {
                          const isHighlighted = highlightedRows.includes(row.id);

                          let rowClasses = "transition-all duration-500 ";
                          if (isHighlighted && step === 2) {
                            rowClasses += "bg-amber-50 border-l-4 border-amber-500 shadow-[inset_0_0_15px_rgba(245,158,11,0.1)] opacity-70 scale-[0.99] grayscale-[50%]";
                          } else {
                            rowClasses += "bg-white hover:bg-slate-50 border-l-4 border-transparent";
                          }

                          return (
                            <tr key={row.id} className={rowClasses}>
                              <td className="p-4 font-mono text-xs text-slate-400 text-center font-semibold">
                                {isHighlighted && step === 2 ? <Trash2 size={14} className="mx-auto text-amber-500"/> : row.id}
                              </td>
                              <td className={`p-4 font-medium ${isHighlighted && step===2 ? 'text-amber-900 line-through' : 'text-slate-700'}`}>{row.username}</td>
                              <td className="p-4 text-center">
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                  {row.role}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Banned' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="p-4 text-right font-mono text-sm pr-6 text-slate-500">
                                 {row.days_inactive}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
               </div>
            </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-rose-100 p-2.5 rounded-xl shadow-sm border border-rose-200"><AlertTriangle className="text-rose-600" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Syntax Challenge: ดอกจันที่หายไป</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบความเข้าใจ จุดที่คนเพิ่งเริ่มเขียน SQL ผิดบ่อยที่สุด</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-rose-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <Trash2 className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-rose-300 font-bold text-xl mb-2">ภารกิจ: ลบบัญชีสแปม</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อ <strong>ลบข้อมูล</strong> ผู้ใช้ (users) ที่มีสถานะเป็น <span className="text-white font-mono bg-slate-700 px-1 rounded">status = 'spam'</span> <br/>
                    (ระวัง! มีบล็อกหลอก 1 ชิ้นที่ไม่ต้องใช้ในคำสั่ง DELETE)
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 overflow-x-auto pb-6">
                <div className="flex items-center gap-2 mb-4 min-w-max px-2">
                  <span className="text-sm text-slate-400 font-mono font-bold tracking-widest uppercase">Query Workspace</span>
                </div>
                <div className="flex items-center gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] min-w-max">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-5 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300 shrink-0
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] px-6 text-2xl' : 'bg-slate-700 text-white shadow-lg border border-slate-600 hover:-translate-y-1 hover:shadow-slate-500/50')
                          : 'min-w-[120px] bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-rose-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-rose-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <span className="text-slate-600 font-mono text-4xl ml-2 font-bold leading-none">;</span>
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-4 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank (คลิกเพื่อเลือก)</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-5 py-3 rounded-xl font-mono text-sm md:text-base font-bold shadow-md transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-40 cursor-not-allowed shadow-none scale-95'
                            : block.type === 'trick' ? 'bg-slate-700 text-amber-300 border-amber-900/50 hover:bg-slate-600 hover:text-amber-200 hover:border-amber-500 cursor-pointer text-2xl px-6'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-400 hover:-translate-y-1 hover:shadow-xl cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-rose-500/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบโค้ด
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.9 การลบข้อมูล (DELETE WHERE)
  import React, { useState, useEffect } from 'react';
  import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Table2,
  RefreshCcw,
  Trash2,
  Filter,
  Code2,
  AlertOctagon,
  XCircle,
  FileWarning,
  Layers
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

// --- Simulator State ---
const initialProducts = [
{ id: 'P01', name: 'แอปเปิ้ล (Apple)', category: 'Food', stock: 50, status: 'Active' },
{ id: 'P02', name: 'นมสด (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
{ id: 'P03', name: 'เสื้อยืดรุ่นเก่า', category: 'Clothing', stock: 5, status: 'Discontinued' },
{ id: 'P04', name: 'ขนมปัง (หมดอายุ)', category: 'Food', stock: 0, status: 'Expired' },
{ id: 'P05', name: 'ตุ๊กตาหมี (ชำรุด)', category: 'Toy', stock: 0, status: 'Damaged' },
{ id: 'P06', name: 'กล้วยหอม', category: 'Food', stock: 30, status: 'Active' },
];

const [products, setProducts] = useState([...initialProducts]);
const [activeScenario, setActiveScenario] = useState('single');
const [highlightedRows, setHighlightedRows] = useState([]);
const [isAnimating, setIsAnimating] = useState(false);

const scenarios = {
single: {
id: 'single',
icon: <Filter size={18} />,
title: "1. ลบด้วย ID (ระบุเจาะจง)",
desc: "ลบสินค้าเจาะจงแถวเดียวด้วย Primary Key",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> id = <span className="text-[#fab387]">'P02'</span>;
</>
),
evaluate: (data) => data.filter(r => r.id === 'P02').map(r => r.id)
},
multi: {
id: 'multi',
icon: <Layers size={18} />,
title: "2. ลบเป็นกลุ่ม (เงื่อนไขเดียว)",
desc: "ลบสินค้าทั้งหมดที่สถานะเป็น 'Expired'",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> status = <span className="text-[#fab387]">'Expired'</span>;
</>
),
evaluate: (data) => data.filter(r => r.status === 'Expired').map(r => r.id)
},
complex: {
id: 'complex',
icon: <AlertOctagon size={18} />,
title: "3. ลบแบบซับซ้อน (AND)",
desc: "ลบหมวด 'Food' ที่สต็อกเหลือ 0",
sql: (
<>
<span className="text-[#f38ba8] font-bold">DELETE FROM</span> <span className="text-[#a6e3a1]">products</span><br/>
<span className="text-[#cba6f7] font-bold">WHERE</span> category = <span className="text-[#fab387]">'Food'</span> <br/>
<span className="text-[#cba6f7] font-bold ml-8">AND</span> stock = <span className="text-[#89b4fa]">0</span>;
</>
),
evaluate: (data) => data.filter(r => r.category === 'Food' && r.stock === 0).map(r => r.id)
}
};

const handleExecuteDelete = () => {
if (products.length === 0) {
showToast('ไม่มีข้อมูลเหลืออยู่ในตารางแล้ว กรุณารีเซ็ตตาราง', 'warning');
return;
}

    setIsAnimating(true);
    const targetIds = scenarios[activeScenario].evaluate(products);

    if (targetIds.length === 0) {
      showToast('ไม่พบข้อมูลที่ตรงกับเงื่อนไขนี้ในตาราง', 'warning');
      setIsAnimating(false);
      return;
    }

    // Step 1: Highlight rows to be deleted (simulating processing)
    setHighlightedRows(targetIds);

    // Step 2: Actually remove them after animation
    setTimeout(() => {
      const remainingProducts = products.filter(p => !targetIds.includes(p.id));
      setProducts(remainingProducts);
      setHighlightedRows([]);
      setIsAnimating(false);
      showToast(`ลบข้อมูลสำเร็จจำนวน ${targetIds.length} แถว`, 'success');
    }, 800);

};

const resetSimulator = () => {
setProducts([...initialProducts]);
setHighlightedRows([]);
showToast('รีเซ็ตตารางข้อมูลคลังสินค้าเรียบร้อย', 'success');
};

const handleScenarioChange = (key) => {
setActiveScenario(key);
};

// Game: DELETE FROM products WHERE status = 'Damaged' AND stock = 0
const gameBlocks = [
{ id: 'b1', text: 'DELETE', type: 'cmd' },
{ id: 'b2', text: 'FROM products', type: 'col' },
{ id: 'b3', text: 'WHERE', type: 'logic' },
{ id: 'b4', text: "status = 'Damaged'", type: 'cond' },
{ id: 'b5', text: 'AND', type: 'logic' },
{ id: 'b6', text: 'stock = 0', type: 'cond' },
{ id: 't1', text: ',', type: 'trick' }, // Trick from UPDATE SET
{ id: 't2', text: '*', type: 'trick' }, // Trick from SELECT
];

const [dropzones, setDropzones] = useState(Array(6).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 6 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t1')) {
      showToast('ผิดพลาด! ในเงื่อนไข WHERE ต้องเชื่อมด้วย AND หรือ OR ห้ามใช้เครื่องหมายลูกน้ำ (,) เด็ดขาด', 'error');
      return;
    }
    if (ans.includes('t2')) {
      showToast('ผิดพลาด! คำสั่ง DELETE ไม่ต้องใส่ดอกจัน (*) เพราะมันลบข้อมูลทั้งแถวอยู่แล้ว', 'error');
      return;
    }

    // Check sequence: DELETE -> FROM -> WHERE -> (cond AND cond) or (cond AND cond - flipped)
    const isValidBase = ans[0] === 'b1' && ans[1] === 'b2' && ans[2] === 'b3';
    const isValidLogic1 = ans[3] === 'b4' && ans[4] === 'b5' && ans[5] === 'b6'; // status = 'Damaged' AND stock = 0
    const isValidLogic2 = ans[3] === 'b6' && ans[4] === 'b5' && ans[5] === 'b4'; // stock = 0 AND status = 'Damaged'

    if (isValidBase && (isValidLogic1 || isValidLogic2)) {
      showToast('ถูกต้องและแม่นยำมาก! คุณเข้าใจโครงสร้าง DELETE WHERE ที่ซับซ้อนแล้ว', 'success');
    } else {
       showToast('ลำดับคำสั่งยังไม่ถูกต้อง ลองตรวจสอบโครงสร้างพื้นฐานและการเชื่อมเงื่อนไขดูอีกครั้ง', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(6).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-rose-700 to-slate-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm shadow-inner border border-white/20">
<Trash2 className="text-rose-300" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-rose-200 opacity-90">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-rose-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-400/50 backdrop-blur-md shadow-inner text-white tracking-wide">
Unit 3.9 การลบข้อมูล (DELETE WHERE)
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full mb-2">
               <XCircle className="text-rose-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              กำจัดข้อมูลที่ซ่อนอยู่ด้วย <span className="text-rose-600">DELETE WHERE</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              หลังจากที่เราแน่ใจแล้วว่าข้อมูลใดควรถูกลบ การเขียนเงื่อนไข <strong>WHERE</strong> ให้แม่นยำคือสิ่งสำคัญที่สุด
              คุณสามารถใช้ตัวดำเนินการอย่าง <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-700 font-mono">AND</code> หรือ <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-700 font-mono">OR</code> เพื่อเจาะจงเป้าหมายให้ชัดเจนขึ้น เหมือนการล็อคเป้าก่อนกดยิง
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10"></div>
                <div className="bg-rose-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-rose-200"><Code2 className="text-rose-700"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">โครงสร้างคำสั่ง (Syntax)</h3>
                <p className="text-sm text-slate-600 mb-4">ระบุชื่อตาราง และตามด้วยเงื่อนไขเพื่อหา <strong>"แถว"</strong> ที่ต้องการลบ</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 leading-relaxed">
                  <span className="text-rose-400 font-bold">DELETE FROM</span> <span className="text-emerald-300">table_name</span><br/>
                  <span className="text-purple-400 font-bold">WHERE</span> <span className="text-slate-300">condition1</span> <span className="text-blue-400 font-bold">AND</span> <span className="text-slate-300">condition2</span>;
                </div>
             </div>

             <div className="bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-rose-100"><AlertTriangle className="text-rose-600"/></div>
                <h3 className="font-bold text-rose-900 mb-2 text-lg">ข้อควรระวัง (Traps)</h3>
                <ul className="space-y-3 text-sm text-rose-800">
                  <li className="flex items-start gap-2">
                    <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5"/>
                    <span><strong>ห้ามใช้ * (ดอกจัน):</strong> DELETE ทำงานระดับแถว ไม่ต้องระบุคอลัมน์ (ห้ามใช้ <code>DELETE * FROM...</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5"/>
                    <span><strong>ห้ามใช้ลูกน้ำ ( , ) ใน WHERE:</strong> ถ้ามีหลายเงื่อนไข ให้เชื่อมด้วย <code>AND</code> หรือ <code>OR</code> เท่านั้น</span>
                  </li>
                </ul>
             </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-lg shadow-sm border border-rose-200"><Database className="text-rose-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: Data Cleanup</h2>
            </div>
            <button onClick={resetSimulator} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-rose-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm">
              <RefreshCcw size={16} /> โหลดตารางสินค้าใหม่
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 min-h-[450px]">

            {/* Sidebar: Scenarios */}
            <div className="flex flex-col bg-slate-50 md:w-80 shrink-0 border-r border-slate-200 z-10">
                <div className="px-5 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 bg-slate-100/50">
                  <Layers size={14}/> เลือกเงื่อนไขการลบ
                </div>
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleScenarioChange(key)}
                      disabled={isAnimating}
                      className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                        ${isActive ? 'bg-white border-rose-500 shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10' : 'border-transparent hover:bg-white/60'}
                        ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}`}>
                        {scenarios[key].icon}
                      </div>
                      <div>
                        <div className={`font-bold text-sm mb-1 ${isActive ? 'text-rose-700' : 'text-slate-700'}`}>{scenarios[key].title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{scenarios[key].desc}</div>
                      </div>
                    </button>
                  )
                })}
            </div>

            {/* Main Content Area: SQL & Table */}
            <div className="flex-1 flex flex-col relative bg-white">
              {/* Top: SQL Command */}
              <div className="bg-[#1e1e2e] p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div className="font-mono text-base md:text-lg leading-[1.8] overflow-x-auto w-full">
                    <div key={activeScenario} className="animate-in fade-in slide-in-from-left-4 duration-300">
                      {scenarios[activeScenario].sql}
                    </div>
                 </div>
                 <button
                    onClick={handleExecuteDelete}
                    disabled={isAnimating || products.length === 0}
                    className={`shrink-0 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
                      ${isAnimating || products.length === 0
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:-translate-y-0.5 active:translate-y-0'}`}
                  >
                    <Trash2 size={18} /> {isAnimating ? 'Executing...' : 'Run DELETE'}
                  </button>
              </div>

              {/* Bottom: Table Display */}
              <div className="p-6 flex-1 bg-slate-50/50 overflow-y-auto relative">
                <h3 className="font-bold text-slate-700 flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2"><Table2 size={20} className="text-indigo-600"/> ตาราง สินค้า (Products)</span>
                  <span className="text-xs font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                    Total Rows: {products.length}
                  </span>
                </h3>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {products.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center h-48">
                      <Database size={40} className="mb-3 opacity-20" />
                      <p>ตารางว่างเปล่า (Empty Table)</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="p-3 font-semibold w-16 text-center">ID</th>
                          <th className="p-3 font-semibold">Name</th>
                          <th className="p-3 font-semibold text-center">Category</th>
                          <th className="p-3 font-semibold text-right">Stock</th>
                          <th className="p-3 font-semibold text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((row) => {
                          const isTarget = highlightedRows.includes(row.id);

                          // Animation classes for deleting
                          let rowClasses = "transition-all duration-700 ease-in-out ";
                          if (isTarget) {
                            rowClasses += "bg-rose-100 text-rose-900 border-l-4 border-rose-500 opacity-0 scale-y-50 -translate-x-4";
                          } else {
                            rowClasses += "bg-white hover:bg-slate-50 border-l-4 border-transparent opacity-100";
                          }

                          return (
                            <tr key={row.id} className={rowClasses}>
                              <td className="p-3 font-mono text-xs text-slate-400 text-center font-semibold">
                                {isTarget ? <XCircle size={14} className="mx-auto text-rose-500 animate-pulse"/> : row.id}
                              </td>
                              <td className={`p-3 font-medium ${isTarget ? 'line-through text-rose-500' : 'text-slate-700'}`}>{row.name}</td>
                              <td className="p-3 text-center">
                                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                  {row.category}
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono font-medium text-slate-600 pr-4">
                                 {row.stock}
                              </td>
                              <td className="p-3 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider
                                  ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                    row.status === 'Expired' ? 'bg-amber-100 text-amber-700' :
                                    row.status === 'Damaged' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-indigo-100 p-2.5 rounded-xl shadow-sm border border-indigo-200"><Layers className="text-indigo-600" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Logic Challenge: สร้างเงื่อนไขสุดหิน</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบการประกอบคำสั่ง DELETE ที่มีหลายเงื่อนไข (AND)</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <Trash2 className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-indigo-300 font-bold text-xl mb-2">ภารกิจ: เคลียร์สินค้าชำรุด</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อ <strong>ลบข้อมูล</strong> สินค้าที่สถานะชำรุด (<code className="text-rose-300 bg-slate-900 px-1 rounded">status = 'Damaged'</code>) <strong>และ</strong> สต็อกหมดแล้ว (<code className="text-rose-300 bg-slate-900 px-1 rounded">stock = 0</code>)<br/>
                    <span className="text-sm text-slate-400 mt-1 block">*ระวังบล็อกหลอกที่ไม่ควรใช้ในคำสั่ง DELETE</span>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-wrap gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-rose-500/50' : 'bg-indigo-600 text-white shadow-lg border border-indigo-500 hover:-translate-y-1 hover:shadow-indigo-500/50')
                          : 'min-w-[100px] flex-1 bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                  <div className="h-14 flex items-end pb-2">
                    <span className="text-slate-500 font-mono text-3xl font-bold leading-none">;</span>
                  </div>
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-5 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-3 rounded-xl font-mono text-sm font-bold shadow-sm transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-50 cursor-not-allowed scale-95'
                            : block.type === 'trick' ? 'bg-slate-800 text-rose-300 border-rose-900/50 hover:bg-rose-900/40 hover:text-rose-200 hover:border-rose-500 cursor-pointer text-lg'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-md cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบคำสั่ง
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}

---

- 3.10 การใช้ Transaction
  import React, { useState, useEffect, useRef } from 'react';
  import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  Code2,
  AlertOctagon,
  XCircle,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
  Save,
  Undo2,
  Play,
  Landmark,
  TerminalSquare
  } from 'lucide-react';

export default function App() {
// --- Global Toast State ---
const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

const showToast = (msg, type = 'success') => {
setToast({ show: true, msg, type });
setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 5000);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Simulator State ---
const initialAlice = 50000;
const initialBob = 10000;

const [aliceBal, setAliceBal] = useState(initialAlice);
const [bobBal, setBobBal] = useState(initialBob);

// Pending states represent uncommitted data inside a transaction
const [pendingAlice, setPendingAlice] = useState(null);
const [pendingBob, setPendingBob] = useState(null);

const [activeScenario, setActiveScenario] = useState('success');
const [isAnimating, setIsAnimating] = useState(false);
const [logs, setLogs] = useState([]);
const [transactionStatus, setTransactionStatus] = useState('IDLE'); // IDLE, ACTIVE, COMMITTED, ROLLED_BACK, ERROR

const scenarios = {
success: {
id: 'success',
icon: <Save size={18} />,
title: "1. โอนสำเร็จ (COMMIT)",
desc: "จำลองการโอนเงิน 5,000 ราบรื่น และบันทึกถาวร",
color: "emerald"
},
error: {
id: 'error',
icon: <Undo2 size={18} />,
title: "2. ระบบล่ม (ROLLBACK)",
desc: "จำลองไฟดับระหว่างโอน ยกเลิกคำสั่งทั้งหมดให้กลับเป็นเหมือนเดิม",
color: "rose"
}
};

const executeScenario = async () => {
if (isAnimating) return;
setIsAnimating(true);
setLogs([]);
setPendingAlice(null);
setPendingBob(null);
setTransactionStatus('ACTIVE');

    if (activeScenario === 'success') {
      // Step 1: BEGIN
      setLogs([{ text: "BEGIN;", type: 'cmd' }]);
      await delay(800);

      // Step 2: Deduct Alice
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';", type: 'cmd' }]);
      setPendingAlice(aliceBal - 5000);
      await delay(1200);

      // Step 3: Add Bob
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance + 5000 WHERE name = 'Bob';", type: 'cmd' }]);
      setPendingBob(bobBal + 5000);
      await delay(1200);

      // Step 4: COMMIT
      setLogs(prev => [...prev, { text: "COMMIT;", type: 'success' }]);
      setAliceBal(prev => prev - 5000);
      setBobBal(prev => prev + 5000);
      setPendingAlice(null);
      setPendingBob(null);
      setTransactionStatus('COMMITTED');
      showToast('Transaction ถูกยืนยัน ข้อมูลถูกบันทึกถาวรแล้ว', 'success');

    } else if (activeScenario === 'error') {
      // Step 1: BEGIN
      setLogs([{ text: "BEGIN;", type: 'cmd' }]);
      await delay(800);

      // Step 2: Deduct Alice
      setLogs(prev => [...prev, { text: "UPDATE accounts SET balance = balance - 5000 WHERE name = 'Alice';", type: 'cmd' }]);
      setPendingAlice(aliceBal - 5000);
      await delay(1200);

      // Step 3: SYSTEM CRASH
      setTransactionStatus('ERROR');
      setLogs(prev => [...prev, { text: "-- ERROR: Database Connection Lost --", type: 'error' }]);
      showToast('เกิดข้อผิดพลาด! ระบบล่มกลางคัน', 'error');
      await delay(1500);

      // Step 4: ROLLBACK
      setLogs(prev => [...prev, { text: "ROLLBACK;", type: 'rollback' }]);
      setPendingAlice(null); // Discard pending changes
      setPendingBob(null);
      setTransactionStatus('ROLLED_BACK');
      showToast('ระบบทำการ Rollback คืนเงินกลับสู่สถานะเดิมก่อนโอน', 'warning');
    }

    setIsAnimating(false);

};

const resetSimulator = () => {
if (isAnimating) return;
setAliceBal(initialAlice);
setBobBal(initialBob);
setPendingAlice(null);
setPendingBob(null);
setLogs([]);
setTransactionStatus('IDLE');
showToast('รีเซ็ตยอดเงินในบัญชีกลับเป็นค่าเริ่มต้น', 'success');
};

// Game: Arrange safe transaction
const gameBlocks = [
{ id: 'b1', text: 'BEGIN;', type: 'ctrl' },
{ id: 'b2', text: "UPDATE account SET bal = bal - 100", type: 'cmd' },
{ id: 'b3', text: "UPDATE account SET bal = bal + 100", type: 'cmd' },
{ id: 'b4', text: 'COMMIT;', type: 'ctrl' },
{ id: 't1', text: 'ROLLBACK;', type: 'trick' }, // Trick
{ id: 't2', text: 'SELECT *', type: 'trick' }, // Trick
];

const [dropzones, setDropzones] = useState(Array(4).fill(null));
const [activeZoneIndex, setActiveZoneIndex] = useState(0);

const handleBlockClick = (block) => {
if (activeZoneIndex !== -1 && activeZoneIndex < dropzones.length) {
const newDropzones = [...dropzones];
newDropzones[activeZoneIndex] = block;
setDropzones(newDropzones);

      let nextIndex = activeZoneIndex + 1;
      while (nextIndex < dropzones.length && newDropzones[nextIndex] !== null) {
        nextIndex++;
      }
      setActiveZoneIndex(nextIndex < dropzones.length ? nextIndex : -1);
    }

};

const handleZoneClick = (index) => {
setActiveZoneIndex(index);
if (dropzones[index] !== null) {
const newDropzones = [...dropzones];
newDropzones[index] = null;
setDropzones(newDropzones);
}
};

const checkGameAnswer = () => {
if (dropzones.includes(null)) {
showToast('กรุณาต่อบล็อกคำสั่งให้ครบทั้ง 4 ช่อง', 'warning');
return;
}

    const ans = dropzones.map(b => b.id);

    if (ans.includes('t2')) {
      showToast('ผิดพลาด! SELECT ใช้ดูข้อมูลเฉยๆ ไม่เกี่ยวข้องกับการล็อก Transaction เพื่อเปลี่ยนแปลงข้อมูล', 'error');
      return;
    }

    if (ans[0] !== 'b1') {
      showToast('ผิดพลาด! Transaction ต้องเริ่มต้นด้วยคำสั่ง BEGIN; เสมอ', 'error');
      return;
    }

    if (ans[3] === 't1') {
      showToast('โครงสร้างถูก แต่ถ้าใช้ ROLLBACK; ข้อมูลที่ทำมาทั้งหมดจะถูกยกเลิกนะ! ภารกิจนี้เราต้องการให้โอนสำเร็จ', 'warning');
      return;
    }

    if (ans[3] !== 'b4') {
      showToast('ผิดพลาด! ต้องปิดท้ายด้วย COMMIT; เพื่อเซฟข้อมูลลงฐานข้อมูลอย่างถาวร', 'error');
      return;
    }

    // Check middle steps (can be either order for deductions/additions)
    const hasUpdates = (ans[1] === 'b2' && ans[2] === 'b3') || (ans[1] === 'b3' && ans[2] === 'b2');

    if (ans[0] === 'b1' && hasUpdates && ans[3] === 'b4') {
      showToast('ถูกต้อง ยอดเยี่ยม! นี่คือโครงสร้าง Transaction พื้นฐานที่ปลอดภัย (BEGIN -> งานต่างๆ -> COMMIT)', 'success');
    } else {
       showToast('ลำดับคำสั่งยังไม่ถูกต้อง ลองตรวจสอบการวางคำสั่ง UPDATE อีกครั้ง', 'error');
    }

};

const resetGame = () => {
setDropzones(Array(4).fill(null));
setActiveZoneIndex(0);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
{/_ Header _/}
<header className="bg-gradient-to-r from-indigo-800 to-slate-900 text-white shadow-xl sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm shadow-inner border border-white/20">
<ShieldCheck className="text-indigo-300" size={28} />
</div>
<div>
<h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">SQL Interactive Learning</h1>
<p className="text-sm text-indigo-200 opacity-90">21901-2001 ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น</p>
</div>
</div>
<div className="hidden md:block">
<span className="bg-indigo-500/80 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-400/50 backdrop-blur-md shadow-inner text-white tracking-wide">
Unit 3.10 การใช้ Transaction
</span>
</div>
</div>
</header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">

        {/* Theory Section */}
        <section className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-2">
               <ArrowRightLeft className="text-indigo-700" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              คุ้มครองข้อมูลด้วย <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Transaction</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4">
              <strong>Transaction</strong> คือการจับมัดรวมคำสั่ง SQL หลายๆ คำสั่งให้ทำงานเสมือนเป็น "งานชิ้นเดียว"
              มีกฎเหล็กคือ <strong>"All or Nothing" (ต้องสำเร็จทั้งหมด หรือไม่ก็ยกเลิกทั้งหมด)</strong> เพื่อป้องกันปัญหาข้อมูลครึ่งๆ กลางๆ เช่น ตัดเงินจากบัญชี A แล้ว แต่ระบบพังก่อนเข้าบัญชี B
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
             <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-slate-200">
                  <Play size={20} className="text-slate-600" fill="currentColor"/>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 text-lg">BEGIN;</h3>
                <p className="text-sm text-slate-600">จุดเริ่มต้น ประกาศให้ฐานข้อมูลรู้ว่าคำสั่งต่อจากนี้ให้ผูกรวมเป็นงานเดียวกัน ยังไม่ให้บันทึกจริงจนกว่าจะสั่ง</p>
             </div>

             <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-emerald-200">
                  <Save size={20} className="text-emerald-700"/>
                </div>
                <h3 className="font-bold text-emerald-900 mb-1 text-lg">COMMIT;</h3>
                <p className="text-sm text-emerald-800">จุดจบแบบสมบูรณ์ ถ้าง่ายทุกคำสั่งรันผ่านหมด สั่ง COMMIT เพื่อ "ยืนยันการบันทึก" ข้อมูลลงดิสก์อย่างถาวร</p>
             </div>

             <div className="bg-rose-50 border-2 border-rose-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-rose-100 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-rose-200">
                  <Undo2 size={20} className="text-rose-700"/>
                </div>
                <h3 className="font-bold text-rose-900 mb-1 text-lg">ROLLBACK;</h3>
                <p className="text-sm text-rose-800">จุดจบแบบฉุกเฉิน หากมี Error เกิดขึ้น สั่ง ROLLBACK เพื่อ "ย้อนกลับ" ข้อมูลทุกอย่างไปสู่สภาพเดิมก่อนเริ่ม BEGIN</p>
             </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg shadow-sm border border-indigo-200"><Landmark className="text-indigo-700" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Simulator: Bank Transfer</h2>
            </div>
            <button onClick={resetSimulator} disabled={isAnimating} className="text-sm bg-white border border-slate-300 hover:bg-slate-100 hover:text-indigo-600 text-slate-700 font-bold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50">
              <RefreshCcw size={16} /> รีเซ็ตยอดเงิน
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 min-h-[500px]">

            {/* Sidebar: Scenarios */}
            <div className="flex flex-col bg-slate-50 md:w-80 shrink-0 border-r border-slate-200 z-10">
                <div className="px-5 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 bg-slate-100/50">
                  <Layers size={14}/> เลือกสถานการณ์
                </div>
                {Object.keys(scenarios).map((key) => {
                  const isActive = activeScenario === key;
                  const sc = scenarios[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveScenario(key)}
                      disabled={isAnimating}
                      className={`text-left px-5 py-5 flex items-start gap-4 transition-all duration-300 border-l-4 relative
                        ${isActive ? `bg-white border-${sc.color}-500 shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10` : 'border-transparent hover:bg-white/60'}
                        ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className={`mt-0.5 p-2 rounded-lg transition-colors ${isActive ? `bg-${sc.color}-100 text-${sc.color}-600` : 'bg-slate-200 text-slate-500'}`}>
                        {sc.icon}
                      </div>
                      <div>
                        <div className={`font-bold text-sm mb-1 ${isActive ? `text-${sc.color}-700` : 'text-slate-700'}`}>{sc.title}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{sc.desc}</div>
                      </div>
                    </button>
                  )
                })}

                <div className="mt-auto p-5 border-t border-slate-200">
                  <button
                      onClick={executeScenario}
                      disabled={isAnimating}
                      className={`w-full font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-white
                        ${isAnimating ? 'bg-slate-400 cursor-not-allowed' :
                          activeScenario === 'success' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                        }`}
                    >
                      {isAnimating ? <RefreshCcw size={18} className="animate-spin"/> : <Play size={18} fill="currentColor" />}
                      {isAnimating ? 'กำลังจำลองระบบ...' : 'Execute Transaction'}
                  </button>
                </div>
            </div>

            {/* Main Content Area: Terminal & Bank Cards */}
            <div className="flex-1 flex flex-col relative bg-slate-100/50">

              {/* Top: Terminal SQL Viewer */}
              <div className="bg-[#1e1e2e] p-5 flex flex-col h-48 border-b border-slate-700 shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3 border-b border-slate-700 pb-2">
                  <TerminalSquare size={14}/> SQL Execution Log
                </div>
                <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 pr-2">
                  {logs.length === 0 && <span className="text-slate-600 italic">// รอการรันคำสั่ง...</span>}
                  {logs.map((log, idx) => (
                    <div key={idx} className={`animate-in fade-in slide-in-from-bottom-2
                      ${log.type === 'cmd' ? 'text-blue-300' :
                        log.type === 'success' ? 'text-emerald-400 font-bold' :
                        log.type === 'rollback' ? 'text-rose-400 font-bold' : 'text-amber-400 bg-amber-400/10 inline-block px-2 py-0.5 rounded'}
                    `}>
                      <span className="text-slate-500 mr-2">{'>'}</span>{log.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Visual Accounts */}
              <div className="p-6 flex-1 flex flex-col items-center justify-center relative">

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm
                    ${transactionStatus === 'IDLE' ? 'bg-slate-200 text-slate-600 border-slate-300' :
                      transactionStatus === 'ACTIVE' ? 'bg-amber-100 text-amber-700 border-amber-300 animate-pulse' :
                      transactionStatus === 'COMMITTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                      transactionStatus === 'ERROR' ? 'bg-rose-600 text-white border-rose-700 animate-bounce' :
                      'bg-rose-100 text-rose-700 border-rose-300'}`}>

                    {transactionStatus === 'IDLE' && <CheckCircle2 size={12}/>}
                    {transactionStatus === 'ACTIVE' && <RefreshCcw size={12} className="animate-spin"/>}
                    {transactionStatus === 'COMMITTED' && <Save size={12}/>}
                    {transactionStatus === 'ERROR' && <AlertTriangle size={12}/>}
                    {transactionStatus === 'ROLLED_BACK' && <Undo2 size={12}/>}
                    {transactionStatus}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 mt-4">

                  {/* Account A (Alice) */}
                  <div className={`bg-white p-6 rounded-2xl w-full max-w-[280px] text-center transition-all duration-500
                    ${transactionStatus === 'ACTIVE' && pendingAlice !== null ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : 'shadow-md border border-slate-200'}`}>
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-2xl">A</span>
                    </div>
                    <h3 className="font-bold text-slate-700 text-lg">บัญชีนาย A (Alice)</h3>

                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                      <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-widest">Balance</div>

                      {pendingAlice !== null ? (
                        <div className="animate-in slide-in-from-top-4 duration-300">
                          <div className="text-sm text-slate-400 line-through mb-0.5 font-mono">{aliceBal.toLocaleString()} ฿</div>
                          <div className="text-2xl font-bold text-amber-500 font-mono flex items-center justify-center gap-1">
                            {pendingAlice.toLocaleString()} ฿ <span className="text-xs font-normal text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">*Pending</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-2xl font-bold font-mono transition-colors duration-500
                          ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {aliceBal.toLocaleString()} ฿
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transfer Arrow */}
                  <div className={`flex flex-col items-center justify-center transition-opacity duration-300
                    ${transactionStatus === 'ACTIVE' ? 'opacity-100' : 'opacity-20'}`}>
                    <div className="text-xs font-bold text-amber-600 mb-2 bg-amber-100 px-3 py-1 rounded-full animate-pulse shadow-sm">
                      โอน 5,000 ฿
                    </div>
                    <ArrowRightLeft size={32} className={`text-slate-400 ${transactionStatus === 'ACTIVE' ? 'text-amber-500 animate-pulse' : ''}`} />
                  </div>

                  {/* Account B (Bob) */}
                  <div className={`bg-white p-6 rounded-2xl w-full max-w-[280px] text-center transition-all duration-500
                    ${transactionStatus === 'ACTIVE' && pendingBob !== null ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : 'shadow-md border border-slate-200'}`}>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-2xl">B</span>
                    </div>
                    <h3 className="font-bold text-slate-700 text-lg">บัญชีนาย B (Bob)</h3>

                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                      <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-widest">Balance</div>

                      {pendingBob !== null ? (
                        <div className="animate-in slide-in-from-top-4 duration-300">
                          <div className="text-sm text-slate-400 line-through mb-0.5 font-mono">{bobBal.toLocaleString()} ฿</div>
                          <div className="text-2xl font-bold text-amber-500 font-mono flex items-center justify-center gap-1">
                            {pendingBob.toLocaleString()} ฿ <span className="text-xs font-normal text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">*Pending</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-2xl font-bold font-mono transition-colors duration-500
                          ${transactionStatus === 'COMMITTED' ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {bobBal.toLocaleString()} ฿
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logic Challenge Section */}
        <section className="space-y-6 pb-12 pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-purple-100 p-2.5 rounded-xl shadow-sm border border-purple-200"><Code2 className="text-purple-700" size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Logic Challenge: สร้าง Transaction ที่สมบูรณ์</h2>
               <p className="text-slate-500 text-sm mt-1">ทดสอบการจัดลำดับคำสั่งเพื่อความปลอดภัยของข้อมูล</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-inner">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3.5 rounded-xl shadow-lg shrink-0">
                  <ShieldCheck className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-indigo-300 font-bold text-xl mb-2">ภารกิจ: โอนเงิน 100 บาทอย่างปลอดภัย</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อ <strong>สร้าง Transaction</strong> ที่หักเงินบัญชีหนึ่ง และเพิ่มเงินให้อีกบัญชีหนึ่ง
                    และจบกระบวนการเพื่อ <strong>บันทึกข้อมูลถาวร</strong>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 w-full overflow-x-auto pb-4">
                <div className="flex flex-wrap gap-3 bg-black/40 p-5 rounded-2xl border border-slate-700/80 min-h-[100px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                  {dropzones.map((block, idx) => (
                    <button
                      key={`zone-${idx}`}
                      onClick={() => handleZoneClick(idx)}
                      className={`
                        h-14 px-4 rounded-xl font-mono text-sm md:text-base font-bold flex items-center justify-center transition-all duration-300
                        ${block
                          ? (block.type === 'trick' ? 'bg-rose-500 text-white shadow-rose-500/50' :
                             block.type === 'ctrl' ? 'bg-emerald-600 text-white shadow-emerald-600/50' : 'bg-indigo-600 text-white shadow-lg border border-indigo-500 hover:-translate-y-1')
                          : 'min-w-[120px] flex-1 bg-slate-800/50 border-2 border-dashed border-slate-600 text-slate-500 hover:bg-slate-700 hover:border-indigo-400'}
                        ${activeZoneIndex === idx && !block ? 'ring-2 ring-indigo-400 ring-offset-4 ring-offset-slate-900 border-solid bg-slate-800/80' : ''}
                      `}
                    >
                      {block ? block.text : `ส่วนที่ ${idx + 1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blocks Bank */}
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-5 px-2">
                  <p className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest">Blocks Bank</p>
                  <button onClick={resetGame} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-full transition-all border border-slate-700">
                    <RefreshCcw size={14} /> เริ่มใหม่
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {gameBlocks.map(block => {
                    const isUsed = dropzones.find(b => b && b.id === block.id);
                    return (
                      <button
                        key={block.id}
                        onClick={() => !isUsed && handleBlockClick(block)}
                        disabled={isUsed}
                        className={`
                          px-4 py-3 rounded-xl font-mono text-sm font-bold shadow-sm transition-all duration-300 border
                          ${isUsed
                            ? 'bg-slate-900 text-slate-700 border-slate-800 opacity-50 cursor-not-allowed scale-95'
                            : block.type === 'trick' ? 'bg-slate-800 text-rose-300 border-rose-900/50 hover:bg-rose-900/40 hover:text-rose-200 hover:border-rose-500 cursor-pointer text-lg'
                            : block.type === 'ctrl' ? 'bg-slate-800 text-emerald-300 border-emerald-900/50 hover:bg-emerald-900/40 hover:text-emerald-200 hover:border-emerald-500 cursor-pointer text-lg'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-md cursor-pointer active:scale-95'}
                        `}
                      >
                        {block.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={checkGameAnswer}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  <CheckCircle2 size={24} /> ตรวจสอบคำสั่ง
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Toast Notification */}
      <div className={`fixed bottom-8 right-8 transition-all duration-500 z-[100] max-w-md w-full md:w-auto ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
          toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-500/20' :
          'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-500/20'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} /> :
           toast.type === 'warning' ? <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} /> :
           <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={24} />}
          <span className="font-bold text-sm md:text-base leading-relaxed pr-2">{toast.msg}</span>
        </div>
      </div>
    </div>

);
}
