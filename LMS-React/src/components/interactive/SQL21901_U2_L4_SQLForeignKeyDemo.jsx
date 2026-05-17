import React, { useState, useEffect, useRef } from 'react';
import { Link, Users, Building2, Key, Database, ArrowRight, Share2, MousePointerClick, RefreshCcw, TerminalSquare } from 'lucide-react';

export default function SQL21901_U2_L4_SQLForeignKeyDemo() {
  const [hoveredDept, setHoveredDept] = useState(null);
  
  const depts = [
    { id: 1, name: 'ฝ่ายบุคคล (HR)', color: 'bg-rose-100', border: 'border-rose-400', text: 'text-rose-700' },
    { id: 2, name: 'ฝ่ายไอที (IT)', color: 'bg-sky-100', border: 'border-sky-400', text: 'text-sky-700' },
    { id: 3, name: 'ฝ่ายขาย (Sales)', color: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700' }
  ];

  const employees = [
    { id: 101, name: 'Somchai', dept_id: 2 },
    { id: 102, name: 'Suda', dept_id: 1 },
    { id: 103, name: 'Mana', dept_id: 3 },
    { id: 104, name: 'Wichai', dept_id: 2 },
    { id: 105, name: 'Nipa', dept_id: 1 }
  ];

  // Console State
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Relational Engine Initialized.' },
    { type: 'system', text: 'Waiting for foreign key constraints...' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleHoverDept = (id) => {
    if (id === hoveredDept) return;
    setHoveredDept(id);
    if (id) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ SELECT * FROM employees WHERE dept_id = ${id};` },
        { type: 'output', text: `> Found ${employees.filter(e => e.dept_id === id).length} records matching Foreign Key.` }
      ]);
    }
  };

  // Game State
  const [isDragging, setIsDragging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const drawLine = (startX, startY, endX, endY, color = '#64748b') => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    // bezier curve for smooth line
    ctx.bezierCurveTo(startX + 30, startY, endX - 30, endY, endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash(isConnected ? [] : [5, 5]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(startX, startY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(endX, endY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const handleDragStart = (e) => {
    if (isConnected) return;
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'fk');
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `> Initiating relationship definition...` }
    ]);
  };

  const handleDrag = (e) => {
    if (!isDragging || !canvasRef.current || !containerRef.current) return;
    if (e.clientX === 0 && e.clientY === 0) return;

    const fkNode = document.getElementById('fk-node');
    if (!fkNode) return;

    const contRect = containerRef.current.getBoundingClientRect();
    const fkRect = fkNode.getBoundingClientRect();

    const startX = fkRect.left - contRect.left + (fkRect.width / 2);
    const startY = fkRect.top - contRect.top + (fkRect.height / 2);

    const endX = e.clientX - contRect.left;
    const endY = e.clientY - contRect.top;

    drawLine(startX, startY, endX, endY, '#3b82f6'); // blue-500
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isConnected && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'fk') {
      setIsConnected(true);
      drawConnectedLine();
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ALTER TABLE employees ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(id);` },
        { type: 'success', text: `> 1:N Relationship established successfully.` }
      ]);
    }
  };

  const drawConnectedLine = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const fkNode = document.getElementById('fk-node');
    const pkNode = document.getElementById('pk-node');
    if (!fkNode || !pkNode) return;

    const contRect = containerRef.current.getBoundingClientRect();
    const fkRect = fkNode.getBoundingClientRect();
    const pkRect = pkNode.getBoundingClientRect();

    const startX = fkRect.left - contRect.left + (fkRect.width / 2);
    const startY = fkRect.top - contRect.top + (fkRect.height / 2);

    const endX = pkRect.left - contRect.left + (pkRect.width / 2);
    const endY = pkRect.top - contRect.top + (pkRect.height / 2);

    drawLine(startX, startY, endX, endY, '#10b981'); // emerald-500
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const resizeCanvas = () => {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      if (isConnected) drawConnectedLine();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isConnected]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
            <Share2 size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Foreign Key (คีย์นอก)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การเชื่อมตาราง 2 ตารางเข้าด้วยกันเพื่อลดความซ้ำซ้อนของข้อมูล (ความสัมพันธ์แบบ 1-to-Many)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 bg-slate-50">
          
          {/* Left: Interactive Data View */}
          <div className="w-full lg:w-[55%] p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <MousePointerClick size={16} className="text-pink-500"/> Interactive Tables
            </h4>
            <p className="text-xs text-slate-700 mb-6">ลองนำเมาส์ไปชี้ (Hover) ที่ตารางแผนก เพื่อดูพนักงานที่เชื่อมโยงอยู่ด้วย Foreign Key</p>

            <div className="flex flex-col gap-6">
              {/* Departments Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-indigo-600 text-white p-2.5 px-4 font-bold flex items-center gap-2 text-sm">
                  <Building2 size={16} /> departments (แผนก)
                </div>
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="p-2 text-left w-24">id <Key size={10} className="inline text-yellow-600"/> (PK)</th>
                      <th className="p-2 text-left">name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depts.map(d => (
                      <tr 
                        key={d.id} 
                        onMouseEnter={() => handleHoverDept(d.id)}
                        onMouseLeave={() => handleHoverDept(null)}
                        className={`cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${hoveredDept === d.id ? d.color + ' ' + d.text + ' font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                      >
                        <td className="p-2.5 font-mono">{d.id}</td>
                        <td className="p-2.5">{d.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Arrow Indicator */}
              <div className="flex justify-center text-slate-600">
                <ArrowRight size={24} className={`transition-transform duration-300 rotate-90 ${hoveredDept ? 'text-indigo-500 translate-y-1' : ''}`} />
              </div>

              {/* Employees Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-teal-600 text-white p-2.5 px-4 font-bold flex items-center gap-2 text-sm">
                  <Users size={16} /> employees (พนักงาน)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-2 text-left w-16">id (PK)</th>
                        <th className="p-2 text-left">name</th>
                        <th className="p-2 text-left w-32">dept_id <Link size={10} className="inline text-sky-600"/> (FK)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(e => {
                        const dept = depts.find(d => d.id === e.dept_id);
                        const isHighlighted = hoveredDept === e.dept_id;
                        return (
                          <tr 
                            key={e.id} 
                            className={`transition-colors border-b border-slate-100 last:border-0 ${isHighlighted ? dept.color + ' ' + dept.text + ' font-bold' : 'text-slate-600'}`}
                          >
                            <td className="p-2.5 font-mono">{e.id}</td>
                            <td className="p-2.5">{e.name}</td>
                            <td className="p-2.5 font-mono">{e.dept_id}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Schema Connect Game */}
          <div className="w-full lg:w-[45%] bg-white p-6 flex flex-col relative">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <Database size={16} className="text-sky-500"/> Schema Connection
            </h4>
            <p className="text-xs text-slate-700 mb-6">ลากเส้นจาก <span className="text-sky-500 font-bold">FK (dept_id)</span> ไปหา <span className="text-yellow-500 font-bold">PK (id)</span> เพื่อสร้างความสัมพันธ์</p>

            <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-8">
              <div ref={containerRef} className="relative w-full h-[300px] flex justify-between items-center z-10">
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
                
                {/* Source Table (Employees) */}
                <div className="bg-white border border-slate-200 rounded-xl w-36 shadow-sm z-20">
                  <div className="bg-teal-50 text-teal-700 font-bold p-2 text-center border-b border-slate-200 rounded-t-xl text-xs">
                    employees
                  </div>
                  <div className="p-2 space-y-1 text-[10px]">
                    <div className="flex justify-between items-center text-slate-700 px-2 py-1">
                      <span>id</span>
                      <Key size={10} className="text-yellow-500"/>
                    </div>
                    <div className="flex justify-between items-center text-slate-700 px-2 py-1">
                      <span>name</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 border border-slate-200 p-1.5 rounded relative">
                      <span className="text-sky-600 font-bold">dept_id</span>
                      <div 
                        id="fk-node"
                        draggable={!isConnected}
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        className={`absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all ${isConnected ? 'bg-emerald-500' : 'bg-sky-500 hover:scale-125 shadow-[0_0_8px_rgba(14,165,233,0.5)] animate-pulse'}`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Target Table (Departments) */}
                <div className="bg-white border border-slate-200 rounded-xl w-36 shadow-sm z-20">
                  <div className="bg-indigo-50 text-indigo-700 font-bold p-2 text-center border-b border-slate-200 rounded-t-xl text-xs">
                    departments
                  </div>
                  <div className="p-2 space-y-1 text-[10px]">
                    <div 
                      className={`flex justify-between items-center bg-slate-50 border p-1.5 rounded relative transition-colors ${isConnected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <div 
                        id="pk-node"
                        className={`absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all ${isConnected ? 'bg-emerald-500' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]'}`}
                      ></div>
                      <span className="text-yellow-600 font-bold pl-2">id</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700 px-2 py-1">
                      <span>name</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Overlay */}
              {isConnected && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-xl animate-in fade-in">
                  <div className="text-center p-6 bg-white border border-emerald-200 rounded-2xl shadow-xl">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Link size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">เชื่อมต่อสำเร็จ!</h3>
                    <p className="text-xs text-slate-700 mb-4">Foreign Key ผูกกับ Primary Key เรียบร้อยแล้ว</p>
                    <button 
                      onClick={() => {
                        setIsConnected(false);
                        setConsoleHistory(prev => [
                          ...prev,
                          { type: 'command', text: `$ ALTER TABLE employees DROP FOREIGN KEY fk_dept;` },
                          { type: 'system', text: `> Relationship removed.` }
                        ]);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 mx-auto shadow-sm"
                    >
                      <RefreshCcw size={12} /> ลองใหม่อีกครั้ง
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-600" />
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Foreign Key Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">mysql&gt;</span> <div className="text-slate-600 font-bold">{line.text}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0">[Sys]</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-500 font-bold shrink-0">[Err]</span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-500 font-bold shrink-0">[Ok]</span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
