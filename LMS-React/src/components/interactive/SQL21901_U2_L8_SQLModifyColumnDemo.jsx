import React, { useState, useEffect } from 'react';
import { Database, Edit, SlidersHorizontal, Play, Lightbulb, TriangleAlert, Box, Key } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLModifyColumnDemo = () => {
  const [columns, setColumns] = useState([
    { id: 'c1', name: 'prod_id', type: 'INT', notNull: true, isPK: true },
    { id: 'c2', name: 'prod_name', type: 'VARCHAR(50)', notNull: true, isPK: false },
    { id: 'c3', name: 'category', type: 'VARCHAR(50)', notNull: false, isPK: false },
    { id: 'c4', name: 'description', type: 'VARCHAR(255)', notNull: false, isPK: false }
  ]);

  const [tableData, setTableData] = useState([
    { prod_id: 1, prod_name: 'Gaming Mouse', category: 'Accessories', description: 'Wireless RGB Mouse' },
    { prod_id: 2, prod_name: 'Mechanical Keyboard', category: null, description: 'Blue Switch 104 Keys' }, // Null to test NOT NULL
    { prod_id: 3, prod_name: 'Monitor 24"', category: 'Display', description: '144Hz IPS Panel' }
  ]);

  const [selectedCol, setSelectedCol] = useState('prod_name');
  const [newType, setNewType] = useState('VARCHAR(50)');
  const [isNotNull, setIsNotNull] = useState(true);
  
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isShakeError, setIsShakeError] = useState(false);

  // Sync controls when selected column changes
  useEffect(() => {
    const col = columns.find(c => c.name === selectedCol);
    if (col) {
      setNewType(col.type);
      setIsNotNull(col.notNull);
      setErrorMsg('');
    }
  }, [selectedCol, columns]);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2500);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setIsShakeError(true);
    showToastMsg('เกิดข้อผิดพลาดจากฐานข้อมูล', 'error');
    setTimeout(() => setIsShakeError(false), 500);
  };

  const getSqlPreview = () => {
    let sql = `ALTER TABLE products\nMODIFY COLUMN ${selectedCol} ${newType}`;
    if (isNotNull) {
      sql += ' NOT NULL;';
    } else {
      sql += ';';
    }
    return sql;
  };

  const extractVarcharLen = (typeStr) => {
    const match = typeStr.match(/VARCHAR\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  };

  const handleExecute = () => {
    setErrorMsg('');
    const colObj = columns.find(c => c.name === selectedCol);
    
    if (!colObj) return;

    // 1. Validation: Data Truncation (e.g. VARCHAR(255) -> VARCHAR(10))
    if (newType.startsWith('VARCHAR') && colObj.type.startsWith('VARCHAR')) {
      const newLen = extractVarcharLen(newType);
      
      for (let row of tableData) {
        const val = row[selectedCol];
        if (val && typeof val === 'string' && val.length > newLen) {
          showError(`Data Truncation: ข้อมูล "${val}" (ยาว ${val.length} ตัวอักษร) จะถูกตัดทิ้ง เพราะคอลัมน์ใหม่รับได้แค่ ${newLen} ตัวอักษร`);
          return;
        }
      }
    }

    // 2. Type mismatch validation (simple simulation)
    if (newType === 'INT') {
      for (let row of tableData) {
        const val = row[selectedCol];
        if (val !== null && isNaN(parseInt(val))) {
          showError(`Type Mismatch: ไม่สามารถเปลี่ยนข้อความ "${val}" ให้เป็นตัวเลข (INT) ได้`);
          return;
        }
      }
    }

    // 3. Validation: NOT NULL constraint violation
    if (isNotNull && !colObj.notNull) {
      for (let row of tableData) {
        if (row[selectedCol] === null) {
          showError(`Constraint Violation: มีข้อมูลที่เป็นค่าว่าง (NULL) อยู่ในแถวรหัส ${row.prod_id} จึงไม่สามารถตั้งค่า NOT NULL ได้`);
          return;
        }
      }
    }

    // Success: Update Schema
    const newColumns = columns.map(c => 
      c.name === selectedCol ? { ...c, type: newType, notNull: isNotNull } : c
    );
    
    setColumns(newColumns);
    setHighlightedCol(selectedCol);
    
    showToastMsg(`แก้ไขคอลัมน์ ${selectedCol} สำเร็จ!`, 'success');

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
        <div className="absolute -right-6 -top-6 text-slate-700/50 z-0 pointer-events-none">
          <Edit size={240} />
        </div>

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
          <Edit className="w-5 h-5" /> โครงสร้างไวยากรณ์ (Syntax)
        </h3>

        <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`-- โครงสร้างพื้นฐาน
ALTER TABLE table_name 
MODIFY COLUMN column_name new_datatype [new_constraints];

-- ตัวอย่าง: ขยายขนาด VARCHAR จากเดิมอาจจะแค่ 50 เป็น 150
ALTER TABLE products MODIFY COLUMN prod_name VARCHAR(150);

-- ตัวอย่าง: บังคับให้คอลัมน์เดิม ห้ามเป็นค่าว่าง (NOT NULL)
ALTER TABLE products MODIFY COLUMN price DECIMAL(10,2) NOT NULL;`) }} />
        </div>

        <div className="mt-5 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex gap-3 relative z-10">
          <TriangleAlert className="text-amber-500 w-6 h-6 flex-shrink-0" />
          <div className="text-sm text-amber-200">
            <strong className="text-amber-400">ข้อควรระวัง!</strong> หากตารางมีข้อมูลอยู่แล้ว การลดขนาดข้อมูล (เช่น จาก VARCHAR(100) เหลือ VARCHAR(10)) อาจทำให้ข้อมูลสูญหาย (Data Truncation) หรือการสั่ง NOT NULL กับคอลัมน์ที่มีค่าว่างอยู่แล้ว จะทำให้เกิด <strong>Error</strong> ได้ครับ
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
            <Edit size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: MODIFY Column Simulator</h2>
            <p className="text-slate-600 text-sm mt-1">ตาราง <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">products</code> ด้านล่างมีข้อมูลอยู่แล้ว ลองปรับแก้คุณสมบัติของคอลัมน์ต่างๆ เพื่อดูว่าฐานข้อมูลจะยอมหรือไม่!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-500" /> ตั้งค่าการแก้ไข
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการแก้</label>
                  <select 
                    value={selectedCol}
                    onChange={(e) => setSelectedCol(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white cursor-pointer"
                  >
                    {columns.filter(c => !c.isPK).map(col => (
                      <option key={col.id} value={col.name}>{col.name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 flex justify-between items-center shadow-inner">
                  <span>เดิม: <span className="text-slate-700 font-bold">{columns.find(c => c.name === selectedCol)?.type}</span></span>
                  {columns.find(c => c.name === selectedCol)?.notNull ? (
                    <span className="text-rose-500 font-bold">NOT NULL</span>
                  ) : (
                    <span className="text-slate-600">NULL (อนุญาตค่าว่าง)</span>
                  )}
                </div>

                <hr className="border-slate-200" />

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">เปลี่ยนเป็น (New Data Type)</label>
                  <select 
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white cursor-pointer"
                  >
                    <option value="INT">INT</option>
                    <option value="VARCHAR(10)">VARCHAR(10)</option>
                    <option value="VARCHAR(50)">VARCHAR(50)</option>
                    <option value="VARCHAR(255)">VARCHAR(255)</option>
                    <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                  </select>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center focus-within:border-amber-300 transition-colors">
                  <label className="text-sm font-semibold text-slate-600">ห้ามเป็นค่าว่าง (NOT NULL)</label>
                  <div className="relative cursor-pointer group" onClick={() => setIsNotNull(!isNotNull)}>
                    <input type="checkbox" className="sr-only" checked={isNotNull} readOnly />
                    <div className={`block w-10 h-6 rounded-full transition-colors border border-slate-300 ${isNotNull ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-200'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${isNotNull ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <button 
                  onClick={handleExecute}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4 hover:shadow-orange-500/30"
                >
                  <Play className="w-4 h-4 fill-current" /> สั่งทำงาน (Execute)
                </button>
              </div>
            </div>

            {/* Live SQL Preview */}
            <div className={`bg-[#1e1e1e] rounded-xl p-4 shadow-xl border ${isShakeError ? 'border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.2)] animate-shake-error' : 'border-slate-800'}`}>
              <div className="text-xs font-mono text-slate-600 mb-2 border-b border-slate-700 pb-1 flex justify-between">
                <span>SQL Preview:</span>
              </div>
              <div 
                className="text-sm font-mono break-words min-h-[40px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(getSqlPreview()) }}
              />
              {errorMsg && (
                <div className="text-sm font-mono text-rose-400 break-words mt-3 pt-3 border-t border-slate-700 border-dashed flex items-start gap-2">
                  <TriangleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Database Table Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-600" /> ตาราง products
                </div>
              </div>

              <div className="overflow-x-auto p-4 bg-slate-50 relative flex-grow custom-scrollbar">
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-slate-200 text-sm">
                  <thead>
                    <tr>
                      {columns.map(col => (
                        <th 
                          key={col.id} 
                          className={`bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 border-r border-slate-700 whitespace-nowrap transition-colors duration-500 ${
                            highlightedCol === col.name ? 'border-b-amber-500 border-b-4 text-amber-400 bg-slate-900' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {col.name}
                            {col.isPK && <Key className="w-3 h-3 text-amber-500" title="PK" />}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20 font-normal">{col.type}</span>
                            {col.notNull && <span className="text-[10px] text-rose-400 font-normal ml-1" title="NOT NULL">NN</span>}
                          </div>
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
                                isHighlighted ? 'bg-amber-50/80 text-amber-700 font-bold' : ''
                              }`}
                            >
                              {val === null ? (
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
                ลองลดขนาด <strong>description</strong> เป็น <code className="bg-blue-100 px-1 rounded text-blue-900">VARCHAR(10)</code> หรือตั้ง <strong>category</strong> ให้เป็น <strong>NOT NULL</strong> ดูสิครับ
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SQLModifyColumnDemo;
