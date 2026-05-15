import React, { useState, useEffect, useRef } from 'react';
import { Link, Users, Building2, Key, Database, ArrowRight, Share2, MousePointerClick, RefreshCcw } from 'lucide-react';

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
    ctx.bezierCurveTo(startX + 50, startY, endX - 50, endY, endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.setLineDash(isConnected ? [] : [5, 5]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const handleDragStart = (e) => {
    if (isConnected) return;
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'fk');
  };

  const handleDrag = (e) => {
    if (!isDragging || !canvasRef.current || !containerRef.current) return;
    if (e.clientX === 0 && e.clientY === 0) return; // ignore invalid coordinates on drag end

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
    <div className="space-y-12 my-8">
      {/* 1. ความสัมพันธ์ 1-to-Many */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <Share2 size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">1. ความสัมพันธ์แบบ 1-to-Many</h2>
            <p className="text-slate-600">แผนก 1 แผนก มีพนักงานได้หลายคน แต่พนักงาน 1 คน สังกัดได้แค่แผนกเดียว</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
            <MousePointerClick className="text-indigo-500"/> Interactive: ลองนำเมาส์ไปชี้ (Hover) ที่ตารางแผนก
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Departments Table */}
            <div className="w-full md:w-5/12 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-indigo-600 text-white p-3 font-bold flex items-center gap-2">
                <Building2 size={18} /> ตารางแผนก (departments)
              </div>
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-3 text-left w-24">id <Key size={12} className="inline text-yellow-600"/></th>
                    <th className="p-3 text-left">name</th>
                  </tr>
                </thead>
                <tbody>
                  {depts.map(d => (
                    <tr 
                      key={d.id} 
                      onMouseEnter={() => setHoveredDept(d.id)}
                      onMouseLeave={() => setHoveredDept(null)}
                      className={`cursor-pointer transition-all border-b border-slate-100 ${hoveredDept === d.id ? d.color + ' ' + d.border + ' border-l-4 font-bold scale-[1.02] shadow-sm' : 'hover:bg-slate-50'}`}
                    >
                      <td className="p-3 font-mono">{d.id}</td>
                      <td className={`p-3 ${hoveredDept === d.id ? d.text : ''}`}>{d.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Connection Arrow */}
            <div className="hidden md:flex flex-col items-center justify-center text-slate-400 mt-16">
               <ArrowRight size={32} className={`transition-all duration-300 ${hoveredDept ? 'text-indigo-500 scale-125' : ''}`} />
               <div className="text-xs font-bold mt-2">เชื่อมโยงด้วย<br/>dept_id</div>
            </div>

            {/* Employees Table */}
            <div className="w-full md:w-7/12 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-teal-600 text-white p-3 font-bold flex items-center gap-2">
                <Users size={18} /> ตารางพนักงาน (employees)
              </div>
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-3 text-left w-16">id</th>
                    <th className="p-3 text-left">name</th>
                    <th className="p-3 text-left w-24">dept_id <Link size={12} className="inline text-sky-600"/></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(e => {
                    const dept = depts.find(d => d.id === e.dept_id);
                    const isHighlighted = hoveredDept === e.dept_id;
                    return (
                      <tr 
                        key={e.id} 
                        className={`transition-all border-b border-slate-100 ${isHighlighted ? dept.color + ' font-bold scale-[1.02] shadow-sm z-10 relative' : 'text-slate-600'}`}
                      >
                        <td className="p-3 font-mono">{e.id}</td>
                        <td className="p-3">{e.name}</td>
                        <td className={`p-3 font-mono ${isHighlighted ? dept.text + ' font-bold text-lg' : ''}`}>{e.dept_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Schema Connect Game */}
      <div className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Database className="text-sky-400" /> เกมลากเส้น: Schema Connect
        </h2>
        <p className="text-slate-300 text-sm mb-8">ลากเส้นจากจุด <span className="text-sky-300 font-mono">FK (dept_id)</span> ในตาราง employees ไปหาจุด <span className="text-yellow-400 font-mono">PK (id)</span> ในตาราง departments เพื่อสร้างความสัมพันธ์</p>

        <div ref={containerRef} className="relative w-full max-w-3xl mx-auto h-[400px] border-2 border-slate-700 border-dashed rounded-xl p-8 overflow-visible flex items-center justify-between">
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>

          {/* Table Employees (Source) */}
          <div className="bg-slate-900 border border-slate-600 rounded-xl w-48 shadow-lg z-20">
            <div className="bg-teal-700/50 text-teal-300 font-bold p-3 text-center border-b border-slate-600 rounded-t-xl">
              employees
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">id</span>
                <Key size={12} className="text-yellow-600"/>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">name</span>
              </div>
              <div className="flex justify-between items-center text-sm bg-slate-800 p-2 rounded border border-slate-700">
                <span className="text-sky-300 font-bold">dept_id</span>
                <div 
                  id="fk-node"
                  draggable={!isConnected}
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  className={`w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all ${isConnected ? 'bg-emerald-500' : 'bg-sky-500 hover:scale-125 shadow-[0_0_10px_rgba(14,165,233,0.8)] animate-pulse'}`}
                ></div>
              </div>
            </div>
          </div>

          {/* Table Departments (Target) */}
          <div className="bg-slate-900 border border-slate-600 rounded-xl w-48 shadow-lg z-20">
            <div className="bg-indigo-700/50 text-indigo-300 font-bold p-3 text-center border-b border-slate-600 rounded-t-xl">
              departments
            </div>
            <div className="p-3 space-y-2">
              <div 
                className={`flex justify-between items-center text-sm bg-slate-800 p-2 rounded border transition-colors ${isConnected ? 'border-emerald-500 bg-emerald-900/30' : 'border-slate-700'}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div 
                  id="pk-node"
                  className={`w-4 h-4 rounded-full transition-all ${isConnected ? 'bg-emerald-500' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'}`}
                ></div>
                <span className="text-yellow-400 font-bold">id</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">name</span>
              </div>
            </div>
          </div>

          {/* Success Message overlay */}
          {isConnected && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-xl animate-in zoom-in duration-300">
              <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-300 p-6 rounded-2xl text-center shadow-2xl">
                <Link size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">เชื่อมต่อสำเร็จ!</h3>
                <p className="text-sm">คุณสร้างความสัมพันธ์แบบ 1-to-Many สำเร็จแล้ว</p>
                <button 
                  onClick={() => setIsConnected(false)}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-2 mx-auto"
                >
                  <RefreshCcw size={16} /> ลองใหม่อีกครั้ง
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
