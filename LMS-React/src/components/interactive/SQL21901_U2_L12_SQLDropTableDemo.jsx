import React, { useState } from 'react';
import { Database, Terminal, Flame, Eraser, ShieldHalf, Building, Users, FileText, Key, Link as LinkIcon, TriangleAlert, Skull, RotateCcw, Code, Trash2 } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const initialTablesState = {
  temp_logs: { id: 'temp_logs', name: 'temp_logs', icon: FileText, exists: true, isParent: false, isChild: false, rows: '12,450', desc: 'Independent' },
  employees: { id: 'employees', name: 'employees', icon: Users, exists: true, isParent: false, isChild: true, rows: '142', desc: 'Child Table' },
  departments: { id: 'departments', name: 'departments', icon: Building, exists: true, isParent: true, isChild: false, rows: '5', desc: 'Parent Table' }
};

const SQLDropTableDemo = () => {
  const [tablesState, setTablesState] = useState({ ...initialTablesState });
  const [selectedTable, setSelectedTable] = useState('');
  const [ifExists, setIfExists] = useState(false);
  const [consoleLog, setConsoleLog] = useState([{ type: 'info', text: '> SELECT * FROM information_schema.tables;' }]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Animation states
  const [isShaking, setIsShaking] = useState(false);
  const [shakeTables, setShakeTables] = useState([]);
  const [explodeTable, setExplodeTable] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const addLog = (text, type = 'info') => {
    setConsoleLog(prev => [...prev, { text, type }]);
  };

  const getSqlPreview = () => {
    if (!selectedTable) return '';
    let sql = `DROP TABLE `;
    if (ifExists) sql += `IF EXISTS `;
    sql += `${selectedTable};`;
    return sql;
  };

  const handlePrepareDrop = () => {
    if (!selectedTable) return;

    if (!tablesState[selectedTable].exists) {
      if (ifExists) {
        addLog(`> ${getSqlPreview()}`, 'command');
        addLog(`Query OK, 0 rows affected, 1 warning. Warning: Unknown table 'company_db.${selectedTable}'`, 'warning');
        showToastMsg(`ข้ามการทำงาน: ตาราง ${selectedTable} ไม่มีอยู่แล้ว (รอด Error เพราะใส่ IF EXISTS)`, 'info');
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        addLog(`> ${getSqlPreview()}`, 'command');
        addLog(`ERROR 1051 (42S02): Unknown table 'company_db.${selectedTable}'`, 'error');
        showToastMsg(`ERROR! พยายามลบตารางที่ไม่มีอยู่จริง (ลืมใส่ IF EXISTS)`, 'error');
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmDrop = () => {
    setShowConfirmModal(false);
    const tbl = selectedTable;
    
    addLog(`> ${getSqlPreview()}`, 'command');

    // Rule Check: Cannot drop Parent if Child exists
    if (tbl === 'departments' && tablesState['employees'].exists) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      setShakeTables(['departments', 'employees']);
      setTimeout(() => setShakeTables([]), 500);

      addLog(`ERROR 3730 (HY000): Cannot drop table '${tbl}' referenced by a foreign key constraint 'fk_emp_dept' on table 'employees'.`, 'error');
      showToastMsg(`ลบไม่ได้! ตาราง departments ถูกอ้างอิงอยู่โดยตาราง employees (ติด Foreign Key)`, 'error');
      return;
    }

    // Success Proceed
    setExplodeTable(tbl);

    setTimeout(() => {
      setTablesState(prev => ({
        ...prev,
        [tbl]: { ...prev[tbl], exists: false }
      }));
      setExplodeTable(null);
      addLog(`Query OK, 0 rows affected.`, 'success');
      showToastMsg(`ทำลายตาราง ${tbl} ถาวรแล้ว!`, 'success');
      setSelectedTable(''); // Reset selection after drop
    }, 800);
  };

  const isDatabaseEmpty = !Object.values(tablesState).some(t => t.exists);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-emerald-500' : toast.type === 'error' ? 'border-rose-500' : toast.type === 'warning' ? 'border-amber-500' : 'border-sky-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 text-slate-700/40 z-0 transform rotate-12 pointer-events-none">
          <Flame size={240} />
        </div>

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-rose-400">
          <Code size={20} /> โครงสร้างไวยากรณ์ (Syntax)
        </h3>

        <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 mb-6 font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`-- ลบตารางปกติ (ถ้าพิมพ์ชื่อตารางผิด หรือตารางไม่มีอยู่จริง จะเกิด Error)
DROP TABLE table_name;

-- ลบแบบปลอดภัย (ตรวจสอบก่อนว่ามีตารางนี้อยู่จริงไหม ค่อยลบ จะไม่เกิด Error)
DROP TABLE IF EXISTS table_name;`) }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="bg-slate-900/60 border border-slate-700 p-4 rounded-xl">
            <h4 className="font-bold text-sky-400 mb-2 flex items-center gap-2"><Eraser className="w-4 h-4" /> TRUNCATE vs DROP</h4>
            <p className="text-sm text-slate-300">
              ถ้าอยากลบแค่ "ข้อมูลข้างใน" ให้เกลี้ยง แต่ยังคงโครงสร้างตาราง (คอลัมน์ต่างๆ) เอาไว้ให้ใช้คำสั่ง <code className="text-sky-300">TRUNCATE TABLE</code> แทนครับ
            </p>
          </div>
          <div className="bg-rose-900/30 border border-rose-800/50 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2"><ShieldHalf className="w-4 h-4" /> ข้อควรระวัง (Foreign Key)</h4>
            <p className="text-sm text-slate-300">
              คุณ <strong>ไม่สามารถ</strong> สั่งลบตารางหลัก (Parent Table) ได้ หากยังมีตารางลูก (Child Table) อ้างอิง Foreign Key ถึงตารางนี้อยู่ (ต้องลบลูกก่อน ค่อยลบแม่)
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shadow-inner">
            <Flame size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: The Demolition Zone</h2>
            <p className="text-slate-600 text-sm mt-1">ฐานข้อมูล <code>company_db</code> มี 3 ตาราง ลองเลือกลบตารางที่ไม่จำเป็นทิ้งดูครับ สังเกตปฏิกิริยาของระบบให้ดี!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner transition-transform duration-300 ${isShaking ? 'animate-shake-error border-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]' : ''}`}>
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-slate-500" /> คำสั่งดำเนินการ
              </h4>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">1. เลือกตารางเป้าหมาย</label>
                  <select 
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-white cursor-pointer shadow-sm"
                  >
                    <option value="" disabled>-- เลือกตารางที่จะลบ --</option>
                    <option value="temp_logs">temp_logs (ข้อมูลชั่วคราว)</option>
                    <option value="employees">employees (พนักงาน - ตารางลูก)</option>
                    <option value="departments">departments (แผนก - ตารางแม่)</option>
                  </select>
                </div>

                <div 
                  onClick={() => setIfExists(!ifExists)}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center cursor-pointer hover:border-slate-300 transition-colors select-none"
                >
                  <div>
                    <div className="text-sm font-bold font-mono text-slate-700">IF EXISTS</div>
                    <div className="text-xs text-slate-500">ใส่เพื่อป้องกัน Error หากตารางไม่มีอยู่จริง</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors relative flex items-center ${ifExists ? 'bg-sky-500 border-sky-600' : 'bg-slate-200 border-slate-300'} border`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-transform ${ifExists ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </div>
                </div>

                <button 
                  onClick={handlePrepareDrop}
                  disabled={!selectedTable}
                  className={`w-full text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-2 ${
                    !selectedTable ? 'bg-slate-400 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-rose-500/30'
                  }`}
                >
                  <Flame className="w-5 h-5" /> สั่งทำลายตาราง!
                </button>
              </div>
            </div>

            {/* Live SQL Preview */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800 flex flex-col h-[200px]">
              <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1 flex justify-between shrink-0">
                <span>MySQL Console:</span>
              </div>
              <div className="text-xs font-mono break-words overflow-y-auto custom-scrollbar flex-grow flex flex-col gap-2">
                {consoleLog.map((log, i) => (
                  <div key={i} className={`border-t border-slate-700/50 border-dashed pt-1 first:border-0 first:pt-0
                    ${log.type === 'command' ? 'text-slate-300' : ''}
                    ${log.type === 'error' ? 'text-rose-400' : ''}
                    ${log.type === 'success' ? 'text-emerald-400' : ''}
                    ${log.type === 'warning' ? 'text-amber-400' : ''}
                    ${log.type === 'info' ? 'text-slate-500 italic' : ''}
                  `}>
                    {log.type === 'command' && <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(log.text.substring(2)).replace(/DROP TABLE/g, '<span class="text-rose-400 font-bold">DROP TABLE</span>') }} />}
                    {log.type !== 'command' && log.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Visual Database Schema */}
          <div className="lg:col-span-7 bg-slate-100 border border-slate-200 rounded-2xl p-6 shadow-inner relative flex flex-col items-center justify-center min-h-[400px]">
            
            <div className="absolute top-4 left-4 font-bold text-slate-400 text-sm flex items-center gap-2">
              <Database className="w-4 h-4" /> Database: company_db
            </div>

            {isDatabaseEmpty ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 animate-in zoom-in">
                <Database className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-bold">Database is Empty</h3>
                <p className="text-sm">คุณลบตารางทิ้งไปหมดแล้ว!</p>
                <button 
                  onClick={() => {
                    setTablesState({...initialTablesState});
                    setConsoleLog([{ type: 'info', text: '> SELECT * FROM information_schema.tables;' }]);
                    setSelectedTable('');
                  }}
                  className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> รีเซ็ตหน้าเว็บ
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md relative mt-4">
                
                {/* Independent Table */}
                {tablesState.temp_logs.exists && (
                  <div className={`bg-white p-4 rounded-xl border-2 shadow-sm flex items-center justify-between mb-8 transition-all duration-300
                    ${selectedTable === 'temp_logs' ? 'border-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.2)] transform -translate-y-1' : 'border-slate-300 hover:border-slate-400 hover:-translate-y-1'}
                    ${explodeTable === 'temp_logs' ? 'animate-explode-anim' : ''}
                  `}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 border border-slate-200">
                        <tablesState.temp_logs.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 font-mono">temp_logs</h4>
                        <p className="text-xs text-slate-500">{tablesState.temp_logs.rows} rows | <span className="text-emerald-500">Safe to drop</span></p>
                      </div>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">Independent</span>
                  </div>
                )}

                {/* Parent Table */}
                {tablesState.departments.exists && (
                  <div className={`bg-white p-4 rounded-xl border-2 shadow-sm flex items-center justify-between relative z-10 transition-all duration-300
                    ${selectedTable === 'departments' ? 'border-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.2)] transform -translate-y-1' : 'border-slate-300 hover:border-slate-400 hover:-translate-y-1'}
                    ${shakeTables.includes('departments') ? 'animate-shake-error' : ''}
                    ${explodeTable === 'departments' ? 'animate-explode-anim' : ''}
                  `}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 border border-orange-200">
                        <tablesState.departments.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 font-mono flex items-center gap-1">
                          departments <Key className="w-3 h-3 text-orange-400" />
                        </h4>
                        <p className="text-xs text-slate-500">{tablesState.departments.rows} rows | Parent Table</p>
                      </div>
                    </div>
                    {tablesState.employees.exists ? (
                      <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded font-bold">Referenced</span>
                    ) : (
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">Safe to drop</span>
                    )}
                  </div>
                )}

                {/* FK Connection Line */}
                {tablesState.departments.exists && tablesState.employees.exists && (
                  <div className="absolute left-1/2 w-0.5 border-l-2 border-dashed border-sky-400 z-0 h-[40px] transform -translate-x-1/2" style={{ top: tablesState.temp_logs.exists ? '164px' : '76px' }}>
                    <div className="absolute top-1/2 left-2 text-[10px] font-bold text-sky-500 bg-slate-100 px-1 py-0.5 rounded border border-sky-200 transform -translate-y-1/2 whitespace-nowrap flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> FOREIGN KEY
                    </div>
                  </div>
                )}

                {/* Child Table */}
                {tablesState.employees.exists && (
                  <div className={`bg-white p-4 rounded-xl border-2 shadow-sm flex items-center justify-between relative z-10 transition-all duration-300 ${tablesState.departments.exists ? 'mt-10' : ''}
                    ${selectedTable === 'employees' ? 'border-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.2)] transform -translate-y-1' : 'border-slate-300 hover:border-slate-400 hover:-translate-y-1'}
                    ${shakeTables.includes('employees') ? 'animate-shake-error' : ''}
                    ${explodeTable === 'employees' ? 'animate-explode-anim' : ''}
                  `}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-500 border border-sky-200">
                        <tablesState.employees.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 font-mono">employees</h4>
                        <p className="text-xs text-slate-500">{tablesState.employees.rows} rows | Child Table</p>
                      </div>
                    </div>
                    {tablesState.departments.exists ? (
                      <span className="text-xs bg-sky-100 text-sky-600 px-2 py-1 rounded font-bold">Has FK</span>
                    ) : (
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">Independent</span>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirm Drop Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-rose-600">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-600 relative">
              <TriangleAlert size={48} className="absolute animate-ping opacity-20" />
              <TriangleAlert size={48} className="relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">คุณแน่ใจหรือไม่?</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              คำสั่งนี้จะทำลายตาราง <br />
              <strong className="text-rose-600 font-mono text-xl bg-rose-50 px-3 py-1 rounded-lg border border-rose-200 inline-block mt-2 mb-1 shadow-sm">
                {selectedTable}
              </strong><br />
              <span className="text-sm font-bold text-rose-500">ข้อมูลทั้งหมดจะสูญหายอย่างถาวร!</span>
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleConfirmDrop}
                className="flex-[1.5] bg-gradient-to-r from-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-rose-500/40 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Skull className="w-4 h-4" /> ยืนยันทำลาย!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SQLDropTableDemo;
