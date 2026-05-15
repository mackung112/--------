import React, { useState, useEffect } from 'react';
import { Play, Database, Table, Plus, Trash2, Key, ArrowDown10, Copy, Check, Terminal, Wand2 } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLCreateTableDemo = () => {
  const [tableName, setTableName] = useState('employees');
  const [columns, setColumns] = useState([
    { id: Date.now(), name: 'emp_id', type: 'INT', pk: true, ai: true, nn: false, uq: false },
    { id: Date.now() + 1, name: 'first_name', type: 'VARCHAR(50)', pk: false, ai: false, nn: true, uq: false },
    { id: Date.now() + 2, name: 'email', type: 'VARCHAR(100)', pk: false, ai: false, nn: false, uq: true }
  ]);

  const [isExecuting, setIsExecuting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [consoleLog, setConsoleLog] = useState('');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const availableTypes = ['INT', 'VARCHAR(50)', 'VARCHAR(100)', 'VARCHAR(255)', 'TEXT', 'DATE', 'DATETIME', 'DECIMAL(10,2)', 'BOOLEAN'];

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2500);
  };

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      {
        id: Date.now(),
        name: `col_${columns.length + 1}`,
        type: 'VARCHAR(50)',
        pk: false, ai: false, nn: false, uq: false
      }
    ]);
  };

  const handleUpdateColumn = (id, field, value) => {
    setColumns(cols => cols.map(col => {
      if (col.id === id) {
        const newCol = { ...col, [field]: value };
        if (field === 'type' && !value.includes('INT')) {
          newCol.ai = false; // Disable AI if not INT
        }
        return newCol;
      }
      return col;
    }));
  };

  const handleDeleteColumn = (id) => {
    setColumns(cols => cols.filter(col => col.id !== id));
  };

  const generateSQL = () => {
    const safeTableName = tableName || 'table_name';
    let sql = `CREATE TABLE ${safeTableName} (\n`;
    let primaryKeys = [];

    columns.forEach((col, index) => {
      const isLast = (index === columns.length - 1) && primaryKeys.length === 0;
      const safeColName = col.name || 'column_name';

      let line = `    ${safeColName} ${col.type}`;

      if (col.nn && !col.pk) line += ` NOT NULL`;
      if (col.uq) line += ` UNIQUE`;
      if (col.ai && col.type.includes('INT')) line += ` AUTO_INCREMENT`;

      if (col.pk) primaryKeys.push(safeColName);

      line += `${isLast ? '' : ','}\n`;
      sql += line;
    });

    if (primaryKeys.length > 0) {
      sql += `    PRIMARY KEY (${primaryKeys.join(', ')})\n`;
    }

    sql += `);`;
    return sql;
  };

  const handleExecute = () => {
    if (!tableName) {
      showToastMsg('กรุณากำหนดชื่อตาราง', 'error');
      return;
    }
    if (columns.length === 0) {
      showToastMsg('ตารางต้องมีอย่างน้อย 1 คอลัมน์', 'error');
      return;
    }
    if (columns.some(c => c.name.trim() === '')) {
      showToastMsg('ชื่อคอลัมน์ห้ามเป็นค่าว่าง', 'error');
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowResult(true);
      const sqlQuery = generateSQL().split('\n').join('<br/>    ');
      setConsoleLog(`mysql> ${sqlQuery}<br/><br/><span class="text-emerald-400 font-bold">Query OK, 0 rows affected (0.02 sec)</span><br/><br/>mysql> DESCRIBE ${tableName};`);
      showToastMsg(`สร้างตาราง ${tableName} สำเร็จ!`, 'success');
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSQL());
    setCopied(true);
    showToastMsg('คัดลอกโค้ด SQL แล้ว', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-emerald-500' : 
          toast.type === 'error' ? 'border-red-500' : 'border-blue-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
          <Database size={240} />
        </div>
        
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-cyan-300">
          <Wand2 className="w-6 h-6" /> โครงสร้างไวยากรณ์ (Syntax)
        </h3>

        <div className="bg-[#282c34] p-6 rounded-xl text-sm md:text-base leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`CREATE TABLE table_name (
    column1_name data_type constraints,
    column2_name data_type constraints,
    PRIMARY KEY (column1_name)
);`) }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <span className="text-[#c678dd] font-mono font-bold text-sm">CREATE TABLE</span>
            <p className="text-sm text-slate-300 mt-1">คำสั่งหลักสำหรับสร้างตารางใหม่ ตามด้วยชื่อตารางที่เราต้องการตั้ง</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <span className="text-[#e06c75] font-mono font-bold text-sm">column_name</span> + <span className="text-[#e5c07b] font-mono font-bold text-sm">data_type</span>
            <p className="text-sm text-slate-300 mt-1">กำหนดชื่อคอลัมน์ และประเภทข้อมูล (เช่น INT, VARCHAR)</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <span className="text-[#c678dd] font-mono font-bold text-sm">constraints</span>
            <p className="text-sm text-slate-300 mt-1">กฎเกณฑ์เพิ่มเติม (เช่น NOT NULL, UNIQUE, AUTO_INCREMENT)</p>
          </div>
        </div>
      </section>

      {/* Interactive Builder */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
            <Table size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: SQL Table Builder</h2>
            <p className="text-slate-600 text-sm mt-1">ลองออกแบบตารางของคุณเอง ระบบจะแปลเป็นคำสั่ง SQL ให้โดยอัตโนมัติ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form Builder */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-400">
              <label className="block text-sm font-bold text-slate-700 mb-2">ชื่อตาราง (Table Name) <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Table className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none font-mono text-sm transition-all" 
                  placeholder="e.g. users, products"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex-grow flex flex-col transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-slate-700">คอลัมน์ (Columns)</label>
                <button 
                  onClick={handleAddColumn}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" /> เพิ่มคอลัมน์
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 pb-2 custom-scrollbar flex-grow">
                {columns.length === 0 ? (
                  <div className="text-center text-sm text-slate-400 py-8 italic border-2 border-dashed rounded-lg border-slate-300 bg-slate-50/50">
                    ยังไม่มีคอลัมน์ กรุณากดปุ่ม "เพิ่มคอลัมน์"
                  </div>
                ) : (
                  columns.map(col => (
                    <div key={col.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center group hover:border-indigo-200 transition-colors">
                      <div className="w-full sm:w-1/3">
                        <input 
                          type="text" 
                          value={col.name}
                          onChange={(e) => handleUpdateColumn(col.id, 'name', e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-shadow" 
                          placeholder="column_name"
                        />
                      </div>
                      <div className="w-full sm:w-1/4">
                        <select 
                          value={col.type}
                          onChange={(e) => handleUpdateColumn(col.id, 'type', e.target.value)}
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono bg-slate-50 focus:border-indigo-500 outline-none transition-shadow cursor-pointer hover:bg-white"
                        >
                          {availableTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="w-full sm:w-auto flex flex-wrap gap-2">
                        {/* Custom Checkboxes */}
                        {[
                          { prop: 'pk', label: 'PK', title: 'Primary Key' },
                          { prop: 'ai', label: 'A_I', title: 'Auto Increment', disabled: !col.type.includes('INT') },
                          { prop: 'nn', label: 'NN', title: 'Not Null' },
                          { prop: 'uq', label: 'UQ', title: 'Unique' }
                        ].map(cb => (
                          <button
                            key={cb.prop}
                            disabled={cb.disabled}
                            onClick={() => handleUpdateColumn(col.id, cb.prop, !col[cb.prop])}
                            title={cb.title}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                              col[cb.prop] 
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                                : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100 hover:border-slate-400'
                            } ${cb.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
                          >
                            {cb.label}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleDeleteColumn(col.id)}
                        className="ml-auto text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-md hover:bg-red-50" 
                        title="ลบคอลัมน์"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right: Code Preview & Execute */}
          <div className="lg:col-span-5 flex flex-col gap-4 h-full">
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl flex flex-col h-full border border-slate-800">
              <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-black/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-2 text-xs font-mono text-slate-400">Generated_SQL.sql</span>
                <button 
                  onClick={copyToClipboard}
                  className="ml-auto text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10" 
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div 
                className="p-5 font-mono text-sm overflow-x-auto flex-grow custom-scrollbar"
                dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(generateSQL()) }}
              />
              <div className="p-4 bg-[#2d2d2d] border-t border-black/20">
                <button 
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isExecuting ? (
                    <><div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> กำลังประมวลผล...</>
                  ) : (
                    <><Play className="w-5 h-5 fill-current" /> จำลองการรันคำสั่ง (Execute)</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResult && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 duration-500 fade-in">
          <div className="bg-[#1e1e1e] text-green-400 p-5 rounded-2xl font-mono text-sm shadow-xl border border-slate-800 relative">
            <div className="absolute top-2 right-4 text-slate-500 text-xs flex items-center gap-1">
              <Terminal className="w-3 h-3" /> Terminal
            </div>
            <div dangerouslySetInnerHTML={{ __html: consoleLog }} className="mt-2 leading-relaxed" />
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex items-center gap-2">
              <Table className="w-5 h-5 text-indigo-600" /> 
              ผลลัพธ์: ตารางที่ถูกสร้างขึ้น (Schema)
            </h4>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    {columns.map(col => (
                      <th key={col.id} className="px-4 py-3 font-mono border-b-2 border-slate-200 bg-slate-50/50">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-700 font-bold whitespace-nowrap">{col.name}</span>
                          {col.pk && <Key className="w-3 h-3 text-amber-500" title="Primary Key" />}
                          {col.ai && <ArrowDown10 className="w-3 h-3 text-blue-500" title="Auto Increment" />}
                        </div>
                        <div className="text-xs text-indigo-600 font-normal mt-0.5">{col.type}</div>
                        {(col.nn || col.uq) && (
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                            ({[col.nn && 'NN', col.uq && 'UQ'].filter(Boolean).join(',')})
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={columns.length || 1} className="py-8 text-center text-slate-400 italic bg-slate-50/30">
                      Empty set (ยังไม่มีข้อมูล)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SQLCreateTableDemo;
