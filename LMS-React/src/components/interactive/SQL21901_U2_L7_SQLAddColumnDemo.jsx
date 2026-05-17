import React, { useState, useEffect } from 'react';
import { Database, Wrench, TableProperties, PlusSquare, Play, Lightbulb, Key } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLAddColumnDemo = () => {
  const [columns, setColumns] = useState([
    { id: 'c1', name: 'emp_id', type: 'INT', isPK: true },
    { id: 'c2', name: 'first_name', type: 'VARCHAR(50)', isPK: false }
  ]);

  const [tableData, setTableData] = useState([
    { emp_id: 101, first_name: 'สมชาย' },
    { emp_id: 102, first_name: 'สุดา' },
    { emp_id: 103, first_name: 'มานะ' }
  ]);

  const [colName, setColName] = useState('');
  const [colType, setColType] = useState('VARCHAR(100)');
  const [position, setPosition] = useState('LAST');
  const [afterCol, setAfterCol] = useState('first_name');
  
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Update afterCol default when columns change
  useEffect(() => {
    if (columns.length > 0 && !columns.find(c => c.name === afterCol)) {
      setAfterCol(columns[columns.length - 1].name);
    }
  }, [columns, afterCol]);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2500);
  };

  const getSqlPreview = () => {
    const rawName = colName.trim() || 'new_column';
    const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, '');
    let sql = `ALTER TABLE employees\nADD COLUMN ${safeName} ${colType}`;

    if (position === 'FIRST') {
      sql += ' FIRST;';
    } else if (position === 'AFTER') {
      sql += ` AFTER ${afterCol};`;
    } else {
      sql += ';';
    }
    return sql;
  };

  const handleExecute = () => {
    const rawName = colName.trim();
    if (!rawName) {
      showToastMsg('กรุณากรอกชื่อคอลัมน์', 'error');
      return;
    }

    const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, '');
    if (safeName !== rawName || safeName === '') {
      showToastMsg('ชื่อคอลัมน์ควรใช้ภาษาอังกฤษ ตัวเลข และ _ เท่านั้น', 'error');
      return;
    }

    if (columns.some(c => c.name.toLowerCase() === safeName.toLowerCase())) {
      showToastMsg(`คอลัมน์ '${safeName}' มีอยู่แล้ว!`, 'error');
      return;
    }

    let insertIndex = columns.length;
    if (position === 'FIRST') {
      insertIndex = 0;
    } else if (position === 'AFTER') {
      const foundIndex = columns.findIndex(c => c.name === afterCol);
      if (foundIndex !== -1) insertIndex = foundIndex + 1;
    }

    const newColObj = {
      id: 'c_' + Date.now(),
      name: safeName,
      type: colType,
      isPK: false
    };

    const newColumns = [...columns];
    newColumns.splice(insertIndex, 0, newColObj);
    
    // We intentionally don't update tableData. Existing rows will render undefined as NULL.
    setColumns(newColumns);
    setHighlightedCol(safeName);
    setColName('');
    setPosition('LAST');
    
    showToastMsg(`เพิ่มคอลัมน์ ${safeName} สำเร็จ!`, 'success');

    setTimeout(() => setHighlightedCol(null), 2000);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-emerald-500' : 'border-rose-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-slate-700/50 z-0 pointer-events-none">
          <Wrench size={240} />
        </div>

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
          <Wrench className="w-5 h-5" /> โครงสร้างไวยากรณ์ (Syntax)
        </h3>
        <p className="text-sm text-slate-600 mb-6 relative z-10">เราสามารถระบุตำแหน่งของคอลัมน์ใหม่ได้ด้วยคำสั่งเสริม <code>AFTER</code> หรือ <code>FIRST</code></p>

        <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`-- แบบปกติ (คอลัมน์ใหม่จะไปต่อท้ายสุดของตาราง)
ALTER TABLE table_name 
ADD COLUMN new_column_name datatype;

-- แบบระบุตำแหน่ง (แทรกคอลัมน์ไว้หลังคอลัมน์ที่กำหนด)
ALTER TABLE table_name 
ADD COLUMN new_column_name datatype AFTER existing_column;`) }} />
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
            <TableProperties size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: Alter Table Simulator</h2>
            <p className="text-slate-600 text-sm mt-1">ทดลองเพิ่มคอลัมน์ใหม่เข้าไปในตาราง <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">employees</code> สังเกตดูว่าเกิดอะไรขึ้นกับข้อมูลเดิม!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <PlusSquare className="w-5 h-5 text-emerald-500" /> กำหนดคอลัมน์ใหม่
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">ชื่อคอลัมน์ (Column Name)</label>
                  <input 
                    type="text" 
                    value={colName}
                    onChange={(e) => setColName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
                    className="w-full px-4 py-2 border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none font-mono text-sm transition-all" 
                    placeholder="เช่น email, salary, phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">ประเภทข้อมูล (Data Type)</label>
                  <select 
                    value={colType}
                    onChange={(e) => setColType(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white cursor-pointer"
                  >
                    <option value="VARCHAR(100)">VARCHAR(100)</option>
                    <option value="INT">INT</option>
                    <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                    <option value="DATE">DATE</option>
                  </select>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-600 mb-3 border-b border-slate-100 pb-2">ตำแหน่ง (Position)</label>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="colPosition" 
                        value="LAST" 
                        checked={position === 'LAST'}
                        onChange={() => setPosition('LAST')}
                        className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="group-hover:text-indigo-600 transition-colors">ต่อท้ายสุด (Default)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="colPosition" 
                        value="FIRST" 
                        checked={position === 'FIRST'}
                        onChange={() => setPosition('FIRST')}
                        className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">FIRST</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="colPosition" 
                        value="AFTER" 
                        checked={position === 'AFTER'}
                        onChange={() => setPosition('AFTER')}
                        className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">AFTER</span>
                      <select 
                        value={afterCol}
                        onChange={(e) => setAfterCol(e.target.value)}
                        disabled={position !== 'AFTER'}
                        className="border border-slate-300 rounded-md px-2 py-1 text-xs font-mono outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:border-indigo-500 cursor-pointer"
                      >
                        {columns.map(col => (
                          <option key={col.id} value={col.name}>{col.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={handleExecute}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4 hover:shadow-emerald-500/30"
                >
                  <Play className="w-4 h-4 fill-current" /> รันคำสั่ง (Execute)
                </button>
              </div>
            </div>

            {/* Live SQL Preview */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-600 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
              <div 
                className="text-sm font-mono break-words min-h-[40px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(getSqlPreview()) }}
              />
            </div>
          </div>

          {/* Right: Database Table Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600" /> ตาราง employees
                </div>
                <div className="text-xs text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 shadow-inner">
                  Rows: <span className="font-bold text-slate-700">{tableData.length}</span>
                </div>
              </div>

              <div className="overflow-x-auto p-4 bg-slate-50 relative min-h-[250px] custom-scrollbar flex-grow flex items-start">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-slate-200 text-sm">
                  <thead>
                    <tr>
                      {columns.map(col => (
                        <th 
                          key={col.id} 
                          className={`bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 border-r border-slate-700 whitespace-nowrap transition-colors duration-500 ${
                            highlightedCol === col.name ? 'border-b-emerald-500 border-b-4 text-emerald-400 bg-slate-900' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {col.name}
                            {col.isPK && <Key className="w-3 h-3 text-amber-500" title="PK" />}
                          </div>
                          <div className="text-[10px] text-slate-600 font-normal mt-0.5">{col.type}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors group border-b border-slate-200 last:border-b-0">
                        {columns.map(col => {
                          const val = row[col.name];
                          const isHighlighted = highlightedCol === col.name;
                          return (
                            <td 
                              key={col.id} 
                              className={`px-4 py-3 font-mono border-r border-slate-200 last:border-r-0 whitespace-nowrap transition-colors duration-1000 ${
                                isHighlighted ? 'bg-emerald-50/50 text-emerald-700 font-bold' : ''
                              }`}
                            >
                              {val === undefined ? (
                                <span className="text-slate-600 italic">NULL</span>
                              ) : (
                                <span className={col.isPK ? 'font-bold text-slate-600' : 'text-indigo-600'}>
                                  {val}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-800 flex items-start gap-3 shadow-sm">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-600 animate-pulse" />
              </div>
              <div className="leading-relaxed">
                <strong className="block mb-1 text-blue-900">รู้หรือไม่?</strong> 
                เมื่อเราใช้คำสั่ง <code>ADD COLUMN</code> กับตารางที่มีข้อมูลอยู่แล้ว ข้อมูลในแถวเดิมทั้งหมดจะถูกกำหนดให้เป็นค่า <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-700 italic border border-blue-200">NULL</span> (ค่าว่าง) โดยอัตโนมัติ (ยกเว้นแต่เราจะกำหนด <code>DEFAULT</code> ไว้ด้วย)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SQLAddColumnDemo;
