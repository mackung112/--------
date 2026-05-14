import React, { useState, useEffect } from 'react';
import { Database, ShieldAlert, Zap, Code, Building, Users, Trash2, RotateCcw, ShieldHalf, AlertCircle, Sparkles, Link as LinkIcon, Info } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const initialParents = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'HR' }
];

const initialChildren = [
  { id: 101, name: 'สมชาย (Somchai)', dept_id: 1 },
  { id: 102, name: 'สุดา (Suda)', dept_id: 2 },
  { id: 103, name: 'มานะ (Mana)', dept_id: 1 }
];

const SQLCascadeDemo = () => {
  const [parents, setParents] = useState([...initialParents]);
  const [children, setChildren] = useState([...initialChildren]);
  
  const [mode, setMode] = useState('RESTRICT');
  const [consoleLog, setConsoleLog] = useState([{ type: 'info', text: '> รอคำสั่ง...' }]);
  const [isShaking, setIsShaking] = useState(false);
  const [flashRows, setFlashRows] = useState([]);
  const [dissolveRows, setDissolveRows] = useState({ parents: [], children: [] });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3500);
  };

  const addLog = (text, type = 'info') => {
    setConsoleLog(prev => [...prev, { text, type }]);
  };

  const handleReset = () => {
    setParents([...initialParents]);
    setChildren([...initialChildren]);
    setConsoleLog([{ type: 'info', text: '> รอคำสั่ง...' }]);
    setDissolveRows({ parents: [], children: [] });
    setFlashRows([]);
    setIsDeleting(false);
  };

  const handleDelete = () => {
    const targetDeptId = 1; // IT
    const hasTarget = parents.some(p => p.id === targetDeptId);

    addLog(`> DELETE FROM departments WHERE id = ${targetDeptId};`, 'command');

    if (!hasTarget) {
      addLog('Query OK, 0 rows affected.', 'success');
      return;
    }

    const dependentChildren = children.filter(c => c.dept_id === targetDeptId);

    if (mode === 'RESTRICT') {
      if (dependentChildren.length > 0) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        const childIds = dependentChildren.map(c => c.id);
        setFlashRows(childIds);
        setTimeout(() => setFlashRows([]), 1000);

        addLog(`ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails.`, 'error');
        showToastMsg(`ลบไม่ได้! ติดกฏ RESTRICT เนื่องจากยังมีพนักงานแผนก 1 อยู่`, 'error');
      } else {
        // Technically this shouldn't happen with initial data unless manually modified, 
        // but included for logic completeness
        setParents(prev => prev.filter(p => p.id !== targetDeptId));
        addLog('Query OK, 1 row affected.', 'success');
      }
    } else if (mode === 'CASCADE') {
      setIsDeleting(true);
      const childIdsToDissolve = dependentChildren.map(c => c.id);
      
      setDissolveRows({
        parents: [],
        children: childIdsToDissolve
      });

      // Animate Parent row dissolving slightly after
      setTimeout(() => {
        setDissolveRows(prev => ({
          ...prev,
          parents: [targetDeptId]
        }));
      }, 400);

      // Update actual data state and re-render after animation completes
      setTimeout(() => {
        setChildren(prev => prev.filter(c => c.dept_id !== targetDeptId));
        setParents(prev => prev.filter(p => p.id !== targetDeptId));
        setDissolveRows({ parents: [], children: [] });
        setIsDeleting(false);
        addLog(`Query OK, ${1 + dependentChildren.length} rows affected.`, 'success');
        showToastMsg(`ลบแบบ CASCADE สำเร็จ! ข้อมูลลูกถูกลบตามไปด้วย (โดมิโน)`, 'success');
      }, 1200);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-purple-500' : toast.type === 'error' ? 'border-rose-500' : 'border-sky-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-slate-200 hover:border-slate-400 transition-colors relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-slate-100 group-hover:text-slate-200 transition-colors z-0">
            <ShieldHalf size={120} className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 font-mono">ON DELETE RESTRICT</h3>
            <p className="text-sm text-slate-600 mb-4 h-16">
              <strong>(ค่าเริ่มต้น)</strong> ฐานข้อมูลจะทำหน้าที่เป็นยามป้องกัน <span className="text-rose-600 font-bold">"ห้ามลบเด็ดขาด"</span> หากตารางหลักยังมีข้อมูลลูกๆ อ้างอิงถึงอยู่ (ป้องกันลูกกำพร้า)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-purple-200 hover:border-purple-400 transition-colors relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-purple-50 group-hover:text-purple-100 transition-colors z-0">
            <Zap size={120} className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 font-mono">ON DELETE CASCADE</h3>
            <p className="text-sm text-slate-600 mb-4 h-16">
              <strong>(เอฟเฟกต์โดมิโน)</strong> หากเราลบข้อมูลตารางหลัก ฐานข้อมูลจะ <span className="text-purple-600 font-bold">"ลบข้อมูลในตารางลูกทั้งหมดที่เกี่ยวข้องตามไปด้วยทันที"</span> (ลบถอนรากถอนโคน)
            </p>
          </div>
        </div>
      </section>

      {/* Syntax Section */}
      <section className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
          <Code className="w-5 h-5" /> โครงสร้างไวยากรณ์ (Syntax) ตอนสร้างตารางลูก
        </h3>

        <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
    ON DELETE CASCADE -- < เพิ่มคำสั่งนี้ต่อท้าย FK
);`).replace(/ON DELETE CASCADE/g, '<span class="text-purple-400 font-bold">ON DELETE CASCADE</span>') }} />
        </div>
        
        <div className="mt-4 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
          <span>เกร็ดความรู้: นอกจากการลบตารางด้วย <code>DROP TABLE</code> จะไม่สามารถทำได้ถ้าติด Foreign Key แล้ว การลบข้อมูล (Row) ก็ใช้กฎเดียวกันครับ</span>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner transition-transform duration-300 ${isShaking ? 'animate-shake-error border-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]' : ''}`}>
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-sky-500" /> ตั้งค่า Foreign Key
              </h4>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className={`flex items-start p-3 border-2 rounded-xl cursor-pointer transition-all ${mode === 'RESTRICT' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white hover:border-sky-300'}`}>
                    <input 
                      type="radio" 
                      name="fkMode" 
                      value="RESTRICT" 
                      checked={mode === 'RESTRICT'}
                      onChange={() => setMode('RESTRICT')}
                      className="mt-1 text-sky-500 focus:ring-sky-500 mr-3 w-4 h-4 cursor-pointer" 
                    />
                    <div>
                      <div className="font-bold text-slate-700 font-mono text-sm">ON DELETE RESTRICT</div>
                      <div className="text-xs text-slate-500 mt-0.5">ห้ามลบถ้ามีลูกอ้างอิงอยู่ (ปลอดภัย)</div>
                    </div>
                  </label>

                  <label className={`flex items-start p-3 border-2 rounded-xl cursor-pointer transition-all ${mode === 'CASCADE' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}>
                    <input 
                      type="radio" 
                      name="fkMode" 
                      value="CASCADE" 
                      checked={mode === 'CASCADE'}
                      onChange={() => setMode('CASCADE')}
                      className="mt-1 text-purple-500 focus:ring-purple-500 mr-3 w-4 h-4 cursor-pointer" 
                    />
                    <div>
                      <div className="font-bold text-slate-700 font-mono text-sm">ON DELETE CASCADE</div>
                      <div className="text-xs text-slate-500 mt-0.5">ลบแผนกปุ๊บ พนักงานหายปั๊บ! (โดมิโน)</div>
                    </div>
                  </label>
                </div>

                <button 
                  onClick={handleDelete}
                  disabled={isDeleting || parents.length === 0}
                  className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-rose-500/30 active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" /> สั่งลบแผนก IT (dept_id=1)
                </button>

                <button 
                  onClick={handleReset}
                  disabled={isDeleting}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4" /> รีเซ็ตข้อมูลใหม่
                </button>
              </div>
            </div>

            {/* Mini Console */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1 flex justify-between">
                <span>MySQL Response:</span>
              </div>
              <div className="text-xs font-mono break-words min-h-[60px] max-h-[120px] overflow-y-auto custom-scrollbar flex flex-col gap-1">
                {consoleLog.map((log, i) => (
                  <div key={i} className={`
                    ${log.type === 'command' ? 'text-slate-300' : ''}
                    ${log.type === 'error' ? 'text-rose-400 mt-1' : ''}
                    ${log.type === 'success' ? 'text-purple-400 mt-1' : ''}
                    ${log.type === 'info' ? 'text-slate-500 italic' : ''}
                  `}>
                    {log.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Visual Tables */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Parent Table */}
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-orange-500" /> departments (Parent Table)
                </div>
              </div>
              <div className="overflow-x-auto p-3 bg-slate-50">
                <table className="w-full border-collapse rounded-lg overflow-hidden border border-slate-200 text-sm">
                  <thead>
                    <tr>
                      <th className="bg-slate-800 text-slate-200 px-4 py-2 font-mono border-r border-slate-700 w-24 text-left">
                        id <Key className="inline w-3 h-3 text-orange-400" />
                      </th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-2 font-mono text-left">dept_name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parents.length === 0 ? (
                      <tr><td colSpan={2} className="text-center italic text-slate-400 p-4">Empty set</td></tr>
                    ) : (
                      parents.map(p => (
                        <tr 
                          key={p.id} 
                          className={`bg-white border-b border-slate-200 transition-all duration-300 
                            ${dissolveRows.parents.includes(p.id) ? 'animate-dissolve-fast opacity-0 scale-95 blur-sm bg-purple-500 text-white' : ''}
                          `}
                        >
                          <td className={`px-4 py-2 font-mono border-r border-slate-200 ${p.id === 1 ? 'font-bold text-rose-500' : 'font-bold text-slate-500'}`}>
                            {p.id}
                          </td>
                          <td className={`px-4 py-2 ${p.id === 1 ? 'bg-rose-50/50 text-rose-700 font-medium' : 'text-slate-600'}`}>
                            {p.name}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Connection Line visualizer */}
            <div className="flex justify-center -my-3 z-20 relative h-6">
              <div className="w-0.5 bg-slate-300 h-full absolute"></div>
              <div className="absolute bg-white border-2 border-slate-300 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-500 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <LinkIcon className="w-3 h-3 text-sky-500" /> FOREIGN KEY
              </div>
            </div>

            {/* Child Table */}
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm relative">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-sky-500" /> employees (Child Table)
                </div>
              </div>
              <div className="overflow-x-auto p-3 bg-slate-50 min-h-[150px]">
                <table className="w-full border-collapse rounded-lg overflow-hidden border border-slate-200 text-sm relative z-10">
                  <thead>
                    <tr>
                      <th className="bg-slate-800 text-slate-200 px-4 py-2 font-mono border-r border-slate-700 w-24 text-left">emp_id</th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-2 font-mono border-r border-slate-700 text-left">name</th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-2 font-mono w-24 text-left">
                        dept_id <LinkIcon className="inline w-3 h-3 text-sky-400" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.length === 0 ? (
                      <tr><td colSpan={3} className="text-center italic text-slate-400 p-4">Empty set</td></tr>
                    ) : (
                      children.map(c => (
                        <tr 
                          key={c.id} 
                          className={`bg-white border-b border-slate-200 transition-all duration-300
                            ${flashRows.includes(c.id) ? 'bg-rose-100 animate-flash-warning' : ''}
                            ${dissolveRows.children.includes(c.id) ? 'animate-dissolve opacity-0 scale-95 blur-sm bg-purple-500 text-white' : ''}
                          `}
                        >
                          <td className="px-4 py-2 font-mono text-slate-500 border-r border-slate-200">{c.id}</td>
                          <td className="px-4 py-2 text-slate-600 border-r border-slate-200">{c.name}</td>
                          <td className={`px-4 py-2 font-mono font-bold ${c.dept_id === 1 ? 'text-rose-500 bg-rose-50/50' : 'text-sky-600'}`}>
                            {c.dept_id}
                          </td>
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
    </div>
  );
};

export default SQLCascadeDemo;
