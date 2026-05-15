import React, { useState } from 'react';
import { Shield, ShieldAlert, Key, Zap, Ban, ArrowRight, Play, Terminal, Database, CheckCircle2 } from 'lucide-react';

export default function SQL21901_U2_L3_SQLConstraintsDemo() {
  // Simulator State
  const [logs, setLogs] = useState([
    { type: 'info', text: 'MySQL Engine v8.0.32' },
    { type: 'info', text: 'Connected to database "company_db"' },
    { type: 'info', text: 'Table "employees" has been created with constraints.' }
  ]);
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Somchai', email: 'somchai@x.com', role: 'Staff' }
  ]);
  const [insertVals, setInsertVals] = useState({ id: '2', name: 'Suda', email: '', role: '' });
  
  const addLog = (text, type = 'info') => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const handleInsert = () => {
    const { id, name, email, role } = insertVals;
    addLog(`> INSERT INTO employees VALUES (${id}, '${name}', '${email}', '${role || 'DEFAULT'}');`, 'command');
    
    // Validation
    if (!id) {
      addLog('Error: Column \'id\' cannot be null (PRIMARY KEY)', 'error');
      return;
    }
    if (tableData.some(r => r.id == id)) {
      addLog(`Error: Duplicate entry '${id}' for key 'PRIMARY'`, 'error');
      return;
    }
    if (!name) {
      addLog('Error: Column \'name\' cannot be null (NOT NULL)', 'error');
      return;
    }
    if (email && tableData.some(r => r.email === email)) {
      addLog(`Error: Duplicate entry '${email}' for key 'UNIQUE'`, 'error');
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
    addLog('Query OK, 1 row affected', 'success');
    
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
    } else {
      addLog(`Schema Error: ${draggedBadge} ไม่เหมาะกับคอลัมน์ ${col}`, 'error');
    }
  };

  const isSchemaComplete = Object.values(schemaZones).every(v => v !== null);

  return (
    <div className="space-y-12 my-8">
      {/* 2. กฎ 4 ข้อ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shrink-0">
            <Ban />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">NOT NULL</h3>
            <p className="text-sm text-slate-600">ห้ามเป็นค่าว่างเปล่า (ห้ามเป็น NULL) ต้องใส่ข้อมูลเสมอ เช่น "ชื่อพนักงาน" จะเว้นว่างไม่ได้</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldAlert />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">UNIQUE</h3>
            <p className="text-sm text-slate-600">ข้อมูลห้ามซ้ำกันในคอลัมน์นั้น (แต่เป็น NULL ได้) เช่น "อีเมล" หรือ "เบอร์โทร" ต้องไม่ซ้ำกับคนอื่น</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
            <Key />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">PRIMARY KEY</h3>
            <p className="text-sm text-slate-600">คีย์หลัก! คือการรวมร่างของ <strong>NOT NULL + UNIQUE</strong> ใช้เป็นรหัสอ้างอิงประจำแถว เช่น "รหัสพนักงาน"</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Zap />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">DEFAULT</h3>
            <p className="text-sm text-slate-600">กำหนดค่าเริ่มต้นอัตโนมัติ ถ้าตอนเพิ่มข้อมูลไม่ได้ระบุค่ามาให้ เช่น "สัญชาติ" ให้เป็น "Thai" อัตโนมัติ</p>
          </div>
        </div>
      </div>

      {/* 3. Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Interactive */}
        <div className="w-full md:w-3/5 border-r border-slate-200">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Play className="text-indigo-500" /> Simulator: ทดสอบฝ่าด่าน Constraints
            </h2>
            <p className="text-sm text-slate-500 mt-1">ลองเพิ่มข้อมูลลงตาราง โดยจงใจทำผิดกฎดูสิครับ</p>
          </div>

          <div className="p-6">
            <table className="w-full text-sm text-left mb-6">
              <thead className="text-xs text-slate-600 uppercase bg-slate-100 border-y border-slate-200">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200">id <br/><span className="text-[10px] text-yellow-600 bg-yellow-100 px-1 rounded font-mono">PRIMARY KEY</span></th>
                  <th className="px-4 py-3 border-r border-slate-200">name <br/><span className="text-[10px] text-rose-600 bg-rose-100 px-1 rounded font-mono">NOT NULL</span></th>
                  <th className="px-4 py-3 border-r border-slate-200">email <br/><span className="text-[10px] text-sky-600 bg-sky-100 px-1 rounded font-mono">UNIQUE</span></th>
                  <th className="px-4 py-3">role <br/><span className="text-[10px] text-emerald-600 bg-emerald-100 px-1 rounded font-mono">DEFAULT 'Staff'</span></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="px-4 py-2 border-r border-slate-100">{row.id}</td>
                    <td className="px-4 py-2 border-r border-slate-100">{row.name}</td>
                    <td className="px-4 py-2 border-r border-slate-100">{row.email}</td>
                    <td className="px-4 py-2">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Input Form */}
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-800 mb-3 uppercase tracking-wider">ทดลอง INSERT ข้อมูลใหม่</h4>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <input type="text" value={insertVals.id} onChange={e => setInsertVals({...insertVals, id: e.target.value})} placeholder="id" className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500" />
                <input type="text" value={insertVals.name} onChange={e => setInsertVals({...insertVals, name: e.target.value})} placeholder="name" className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500" />
                <input type="text" value={insertVals.email} onChange={e => setInsertVals({...insertVals, email: e.target.value})} placeholder="email" className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500" />
                <input type="text" value={insertVals.role} onChange={e => setInsertVals({...insertVals, role: e.target.value})} placeholder="role" className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleInsert} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-1">
                  <Play size={14} /> INSERT
                </button>
                <button onClick={() => setInsertVals({id: '1', name: '', email: 'somchai@x.com', role: ''})} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg text-xs hover:bg-slate-50 transition-colors">
                  โหลดค่ากวนๆ 😈
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Console */}
        <div className="w-full md:w-2/5 bg-slate-900 text-slate-300 font-mono text-xs flex flex-col h-64 md:h-auto">
          <div className="bg-slate-800 text-slate-400 px-4 py-2 border-b border-slate-700 flex items-center gap-2 text-sm font-sans">
            <Terminal size={14}/> Console Log
          </div>
          <div className="p-4 flex-grow overflow-y-auto space-y-1" id="console-logs">
            {logs.map((log, i) => (
              <div key={i} className={`
                ${log.type === 'error' ? 'text-rose-400' : ''}
                ${log.type === 'success' ? 'text-emerald-400' : ''}
                ${log.type === 'command' ? 'text-cyan-300 mt-2 font-bold' : ''}
                ${log.type === 'info' ? 'text-slate-500' : ''}
              `}>
                {log.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Interactive Schema Builder */}
      <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-2xl"></div>
        
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Database className="text-indigo-400" /> Interactive: Schema Builder
        </h2>
        <p className="text-slate-300 text-sm mb-8">ลากป้าย Constraint ด้านล่าง ไปวางให้ตรงกับคอลัมน์ที่เหมาะสมที่สุด (ลองดูคอนโซลด้านบนประกอบ หากวางผิด)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columns */}
          <div className="space-y-3">
            {Object.keys(schemaZones).map((col) => (
              <div key={col} className="bg-slate-900 border border-slate-700 p-3 rounded-lg flex items-center justify-between">
                <div className="font-mono text-cyan-300">{col}</div>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, col)}
                  className={`w-32 h-8 border-2 border-dashed rounded flex items-center justify-center text-xs font-bold transition-colors ${schemaZones[col] ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-slate-600 bg-slate-800 text-slate-500'}`}
                >
                  {schemaZones[col] ? schemaZones[col] : 'Drop here'}
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-center items-center">
            <h4 className="text-slate-400 text-sm mb-4 font-bold">คลัง Constraints</h4>
            <div className="flex flex-wrap gap-3 justify-center min-h-[100px] content-start">
              {!Object.values(schemaZones).includes('PRIMARY KEY') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'PRIMARY KEY')} className="cursor-grab active:cursor-grabbing bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-3 py-1.5 rounded shadow-lg font-bold text-xs">
                  PRIMARY KEY
                </div>
              )}
              {!Object.values(schemaZones).includes('NOT NULL') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'NOT NULL')} className="cursor-grab active:cursor-grabbing bg-rose-500 hover:bg-rose-400 text-white px-3 py-1.5 rounded shadow-lg font-bold text-xs">
                  NOT NULL
                </div>
              )}
              {!Object.values(schemaZones).includes('UNIQUE') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'UNIQUE')} className="cursor-grab active:cursor-grabbing bg-sky-500 hover:bg-sky-400 text-white px-3 py-1.5 rounded shadow-lg font-bold text-xs">
                  UNIQUE
                </div>
              )}
              {!Object.values(schemaZones).includes('DEFAULT') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'DEFAULT')} className="cursor-grab active:cursor-grabbing bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded shadow-lg font-bold text-xs">
                  DEFAULT
                </div>
              )}
            </div>

            {isSchemaComplete && (
              <div className="mt-4 text-emerald-400 font-bold flex items-center gap-2 animate-pulse">
                <CheckCircle2 /> สุดยอด! คุณออกแบบ Schema ได้ถูกต้อง
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
