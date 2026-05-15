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

export default function SQL21901_U3_L8_PreDeleteCheckDemo() {
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
<span className="text-[#cba6f7] font-bold">SELECT</span> <span className="text-[#a6e3a1]">*</span><br/>
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
{/* Header */}
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