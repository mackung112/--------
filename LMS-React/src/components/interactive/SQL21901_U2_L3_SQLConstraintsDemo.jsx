import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldAlert, Key, Zap, Ban, Play, TerminalSquare, Database, CheckCircle2 } from 'lucide-react';

export default function SQL21901_U2_L3_SQLConstraintsDemo() {
  // Console State
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'MySQL Engine v8.0.32' },
    { type: 'system', text: 'Connected to database "company_db"' },
    { type: 'system', text: 'Table "employees" has been created with constraints.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const addLog = (text, type = 'info') => {
    setConsoleHistory(prev => [...prev, { text, type }]);
  };

  // Simulator State
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Somchai', email: 'somchai@x.com', role: 'Staff' }
  ]);
  const [insertVals, setInsertVals] = useState({ id: '2', name: 'Suda', email: '', role: '' });
  
  const handleInsert = () => {
    const { id, name, email, role } = insertVals;
    addLog(`$ INSERT INTO employees VALUES (${id || 'NULL'}, ${name ? `'${name}'` : 'NULL'}, ${email ? `'${email}'` : 'NULL'}, ${role ? `'${role}'` : 'DEFAULT'});`, 'command');
    
    // Validation
    if (!id) {
      addLog('> Error 1048: Column \'id\' cannot be null (PRIMARY KEY constraint violation)', 'error');
      return;
    }
    if (tableData.some(r => r.id == id)) {
      addLog(`> Error 1062: Duplicate entry '${id}' for key 'PRIMARY'`, 'error');
      return;
    }
    if (!name) {
      addLog('> Error 1048: Column \'name\' cannot be null (NOT NULL constraint violation)', 'error');
      return;
    }
    if (email && tableData.some(r => r.email === email)) {
      addLog(`> Error 1062: Duplicate entry '${email}' for key 'email' (UNIQUE constraint violation)`, 'error');
      return;
    }

    // Success
    const newRow = {
      id: parseInt(id),
      name: name,
      email: email || 'NULL',
      role: role || 'Staff'
    };
    setTableData([...tableData, newRow]);
    addLog('> Query OK, 1 row affected', 'success');
    
    // Clear inputs
    setInsertVals({ id: '', name: '', email: '', role: '' });
  };

  // Schema Builder State
  const [draggedBadge, setDraggedBadge] = useState(null);
  const [schemaZones, setSchemaZones] = useState({
    user_id: null,
    username: null,
    email: null,
    status: null
  });

  const handleDragStart = (e, badge) => {
    setDraggedBadge(badge);
  };

  const handleDrop = (e, col) => {
    e.preventDefault();
    if (!draggedBadge) return;
    
    // validation map
    const correctMap = {
      'user_id': 'PRIMARY KEY',
      'username': 'NOT NULL',
      'email': 'UNIQUE',
      'status': 'DEFAULT'
    };

    if (correctMap[col] === draggedBadge) {
      setSchemaZones({ ...schemaZones, [col]: draggedBadge });
      setDraggedBadge(null);
      addLog(`$ ALTER TABLE users MODIFY ${col} ... ${draggedBadge};`, 'command');
      addLog(`> Success: Constraint applied to ${col}.`, 'success');
    } else {
      addLog(`$ ALTER TABLE users MODIFY ${col} ... ${draggedBadge};`, 'command');
      addLog(`> Error 1064: Schema logic error - ${draggedBadge} is not suitable for ${col}.`, 'error');
    }
  };

  const isSchemaComplete = Object.values(schemaZones).every(v => v !== null);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Shield size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">SQL Constraints (ข้อจำกัดข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้กฎเหล็กเพื่อป้องกันไม่ให้มีข้อมูลขยะหรือข้อมูลผิดพลาดเข้ามาในตารางของเรา
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        
        {/* Top: Explanations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-5 flex flex-col gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2 text-rose-600 font-bold">
              <Ban size={18} /> NOT NULL
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">ห้ามเป็นค่าว่างเปล่า ต้องมีข้อมูลเสมอ เช่น ชื่อพนักงาน จะปล่อยให้โล่งไม่ได้</p>
          </div>
          <div className="p-5 flex flex-col gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2 text-sky-600 font-bold">
              <ShieldAlert size={18} /> UNIQUE
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">ข้อมูลห้ามซ้ำกัน (แต่เป็น NULL ได้) เช่น อีเมล หรือ เบอร์โทร ต้องไม่ซ้ำกับคนอื่น</p>
          </div>
          <div className="p-5 flex flex-col gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2 text-yellow-600 font-bold">
              <Key size={18} /> PRIMARY KEY
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">คีย์หลัก! รวม <strong>NOT NULL + UNIQUE</strong> เข้าด้วยกัน เป็นรหัสอ้างอิงประจำแถว</p>
          </div>
          <div className="p-5 flex flex-col gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Zap size={18} /> DEFAULT
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">ถ้าไม่ใส่ข้อมูล ระบบจะเติมค่าเริ่มต้นให้อัตโนมัติ เช่น ให้บทบาทเป็น Staff ทันที</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 bg-slate-50">
          
          {/* Left: Interactive Schema Builder */}
          <div className="w-full lg:w-[40%] p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <Database size={16} className="text-indigo-500"/> Schema Constraint Builder
            </h4>
            <p className="text-xs text-slate-700 mb-6">ลากป้าย Constraint ด้านล่าง ไปวางให้ตรงกับคอลัมน์ที่เหมาะสมที่สุด (ลองดูคอนโซลด้านล่างประกอบ หากวางผิด)</p>

            <div className="space-y-3 mb-8">
              {Object.keys(schemaZones).map((col) => (
                <div key={col} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm">
                  <div className="font-mono text-sm font-bold text-slate-700">{col}</div>
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, col)}
                    className={`w-[120px] h-8 border-2 border-dashed rounded flex items-center justify-center text-[10px] font-bold transition-colors ${schemaZones[col] ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-300 bg-slate-50 text-slate-400'}`}
                  >
                    {schemaZones[col] ? schemaZones[col] : 'Drop Constraint'}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mt-auto">
              <h5 className="text-xs font-semibold text-slate-600 mb-3 text-center uppercase tracking-wider">คลัง Constraints</h5>
              <div className="flex flex-wrap gap-2 justify-center">
                {!Object.values(schemaZones).includes('PRIMARY KEY') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'PRIMARY KEY')} className="cursor-grab active:cursor-grabbing bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-3 py-1.5 rounded-lg shadow-md font-bold text-[10px]">
                    PRIMARY KEY
                  </div>
                )}
                {!Object.values(schemaZones).includes('NOT NULL') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'NOT NULL')} className="cursor-grab active:cursor-grabbing bg-rose-500 hover:bg-rose-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-[10px]">
                    NOT NULL
                  </div>
                )}
                {!Object.values(schemaZones).includes('UNIQUE') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'UNIQUE')} className="cursor-grab active:cursor-grabbing bg-sky-500 hover:bg-sky-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-[10px]">
                    UNIQUE
                  </div>
                )}
                {!Object.values(schemaZones).includes('DEFAULT') && (
                  <div draggable onDragStart={(e) => handleDragStart(e, 'DEFAULT')} className="cursor-grab active:cursor-grabbing bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded-lg shadow-md font-bold text-[10px]">
                    DEFAULT
                  </div>
                )}
              </div>

              {isSchemaComplete && (
                <div className="mt-4 text-emerald-400 font-bold flex items-center justify-center gap-1 text-xs animate-pulse">
                  <CheckCircle2 size={14} /> สุดยอด! คุณออกแบบ Schema ได้ถูกต้อง
                </div>
              )}
            </div>
          </div>

          {/* Right: Simulator */}
          <div className="w-full lg:w-[60%] bg-white p-6 flex flex-col relative">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <Play size={16} className="text-emerald-500"/> Data Insertion Simulator
            </h4>
            <p className="text-xs text-slate-700 mb-4">ลองเพิ่มข้อมูลลงตาราง โดยจงใจทำผิดกฎของ Constraint ดูสิครับ</p>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">
                        <span className="block text-slate-700">id</span>
                        <span className="text-[9px] text-yellow-700 bg-yellow-100 px-1 rounded font-mono">PRIMARY KEY</span>
                      </th>
                      <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">
                        <span className="block text-slate-700">name</span>
                        <span className="text-[9px] text-rose-700 bg-rose-100 px-1 rounded font-mono">NOT NULL</span>
                      </th>
                      <th className="px-4 py-3 border-r border-slate-200 whitespace-nowrap">
                        <span className="block text-slate-700">email</span>
                        <span className="text-[9px] text-sky-700 bg-sky-100 px-1 rounded font-mono">UNIQUE</span>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap">
                        <span className="block text-slate-700">role</span>
                        <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1 rounded font-mono">DEFAULT 'Staff'</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-2 border-r border-slate-100 font-mono text-slate-600">{row.id}</td>
                        <td className="px-4 py-2 border-r border-slate-100 text-slate-600">{row.name}</td>
                        <td className={`px-4 py-2 border-r border-slate-100 ${row.email === 'NULL' ? 'text-slate-400 italic' : 'text-slate-600'}`}>{row.email}</td>
                        <td className="px-4 py-2 text-slate-600">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Input Form */}
            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 mt-auto">
              <h4 className="text-[11px] font-bold text-indigo-600 mb-3 uppercase tracking-wider">Test INSERT Query</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] text-slate-700 mb-1 font-bold">id (PK)</label>
                  <input type="text" value={insertVals.id} onChange={e => setInsertVals({...insertVals, id: e.target.value})} placeholder="e.g. 2" className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 font-mono bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-700 mb-1 font-bold">name (NOT NULL)</label>
                  <input type="text" value={insertVals.name} onChange={e => setInsertVals({...insertVals, name: e.target.value})} placeholder="e.g. Suda" className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 font-mono bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-700 mb-1 font-bold">email (UNIQUE)</label>
                  <input type="text" value={insertVals.email} onChange={e => setInsertVals({...insertVals, email: e.target.value})} placeholder="Leave blank for NULL" className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 font-mono bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-700 mb-1 font-bold">role (DEFAULT)</label>
                  <input type="text" value={insertVals.role} onChange={e => setInsertVals({...insertVals, role: e.target.value})} placeholder="Leave blank" className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 font-mono bg-white shadow-sm" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setInsertVals({id: '1', name: '', email: 'somchai@x.com', role: ''})} className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition-colors shadow-sm font-medium">
                  Fill Invalid Data 😈
                </button>
                <button onClick={handleInsert} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5">
                  <Play size={12} /> Execute INSERT
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-600" />
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Constraint Engine</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">mysql&gt;</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0"></span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0"></span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-500 font-bold shrink-0"></span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-500 font-bold shrink-0"></span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
