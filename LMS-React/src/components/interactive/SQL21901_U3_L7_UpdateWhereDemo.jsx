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

export default function SQL21901_U3_L7_UpdateWhereDemo() {
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
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br />
          <span className="text-[#f9e2af] font-bold">SET</span> perf = <span className="text-[#a6e3a1]">'B'</span><br />
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
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br />
          <span className="text-[#f9e2af] font-bold">SET</span> salary = <span className="text-[#fab387]">30000</span><br />
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
          <span className="text-[#f9e2af] font-bold">UPDATE</span> <span className="text-[#a6e3a1]">employees</span><br />
          <span className="text-[#f9e2af] font-bold">SET</span> bonus = <span className="text-[#fab387]">10000</span><br />
          <span className="text-[#cba6f7] font-bold">WHERE</span> dept = <span className="text-[#a6e3a1]">'IT'</span> <br />
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
      {/* Header */}
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
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Target className="text-indigo-600" /></div>
              <h3 className="font-bold text-slate-800 mb-2 text-lg">เงื่อนไขแบบเจาะจง</h3>
              <p className="text-sm text-slate-600 mb-4">อัปเดตเฉพาะแถวที่มีค่าตรงกับที่ระบุเป๊ะๆ มักใช้กับ Primary Key</p>
              <code className="block bg-slate-800 text-indigo-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                WHERE id = 'E01'
              </code>
            </div>

            <div className="bg-white border-2 border-fuchsia-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-fuchsia-300 transition-all duration-300">
              <div className="bg-fuchsia-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Filter className="text-fuchsia-600" /></div>
              <h3 className="font-bold text-slate-800 mb-2 text-lg">เงื่อนไขแบบช่วง (Range)</h3>
              <p className="text-sm text-slate-600 mb-4">ใช้เครื่องหมาย &gt;, &lt;, &gt;=, &lt;= ในการหาช่วงข้อมูลที่ต้องการอัปเดต</p>
              <code className="block bg-slate-800 text-fuchsia-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                WHERE salary &lt; 30000
              </code>
            </div>

            <div className="bg-violet-50 border-2 border-violet-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">จุดผิดบ่อย!</div>
              <div className="bg-violet-200 w-12 h-12 rounded-full flex items-center justify-center mb-4"><Users className="text-violet-700" /></div>
              <h3 className="font-bold text-violet-900 mb-2 text-lg">หลายเงื่อนไข</h3>
              <p className="text-sm text-violet-700 mb-4">ห้ามใช้ลูกน้ำ (,) คั่น! ต้องใช้ <strong className="text-violet-800 bg-white px-1 rounded">AND</strong> หรือ <strong className="text-violet-800 bg-white px-1 rounded">OR</strong> เท่านั้น</p>
              <code className="block bg-slate-800 text-violet-300 p-3 rounded-lg text-sm font-mono shadow-inner border border-slate-700">
                WHERE dept = 'IT'<br /><span className="text-white font-bold bg-violet-600/50 px-1 rounded">AND</span> perf = 'A'
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
                <div className="px-5 py-4 border-b border-slate-800 text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Filter size={14} /> เลือกสถานการณ์
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
                <span className="flex items-center gap-2 text-lg"><Table2 size={20} className="text-indigo-600" /> ตาราง พนักงาน (Employees)</span>
                {highlightedRows.length > 0 && (
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <CheckCircle2 size={12} /> อัปเดต {highlightedRows.length} แถว
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
                              <span className="text-[10px] text-slate-600 line-through leading-none mb-1 opacity-70">{origVal.toLocaleString()}</span>
                              <span className={highlightClass}>{currentVal.toLocaleString()}</span>
                            </div>
                          );
                        }
                        return <span>{currentVal.toLocaleString()}</span>;
                      };

                      return (
                        <tr key={row.id} className={rowClasses}>
                          <td className="p-4 font-mono text-xs text-slate-600 text-center font-semibold">{row.id}</td>
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
              <p className="text-slate-700 text-sm mt-1">ทดสอบความเข้าใจ จุดที่คนเขียน SQL ผิดบ่อยที่สุด</p>
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
                  <h3 className="text-indigo-600 font-bold text-xl mb-2">ภารกิจ: เลื่อนขั้นระดับ VIP</h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    จงประกอบคำสั่งเพื่อเปลี่ยนสถานะ (status) เป็น 'VIP' <br className="hidden md:block" />
                    ให้กับ user ที่มี <span className="text-white font-mono bg-slate-700 px-1 rounded">points &gt; 1000</span> <strong>และ</strong> <span className="text-white font-mono bg-slate-700 px-1 rounded">level = 5</span>
                  </p>
                </div>
              </div>

              {/* Dropzones */}
              <div className="mb-10 overflow-x-auto pb-6">
                <div className="flex items-center gap-2 mb-4 min-w-max px-2">
                  <span className="text-sm text-slate-600 font-mono font-bold tracking-widest uppercase">Query Workspace</span>
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
                  <p className="text-sm text-slate-600 font-mono font-bold uppercase tracking-widest">Blocks Bank (คลิกเพื่อเลือก)</p>
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
        <div className={`flex items-start gap-4 px-6 py-5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-500/20' :
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