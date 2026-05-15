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

export default function SQL21901_U3_L1_InsertSingleDemo() {
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
const s_id = formData.emp_id ? `'${formData.emp_id}'` : '***';
const s_name = formData.name ? `'${formData.name}'` : '***';
const s_dept = formData.department ? `'${formData.department}'` : '***';
const s_sal = formData.salary ? formData.salary : '***';

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
{/* Header */}
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
              
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
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