import React, { useState, useEffect, useRef } from 'react';
import { Network, Key, Link as LinkIcon, CheckCircle2, RefreshCw, TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L5_SQLDBDesignDemo() {
  const [selectedField, setSelectedField] = useState(null);
  const [linked, setLinked] = useState(false);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Schema Builder Initialized.' },
    { type: 'system', text: 'Select a Primary Key to begin creating relationships.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleFieldClick = (table, field, type) => {
    if (linked) return;

    if (!selectedField) {
      if (type === 'PK') {
        setSelectedField({ table, field, type });
        setConsoleHistory(prev => [
          ...prev,
          { type: 'command', text: `$ click [${table}.${field}]` },
          { type: 'system', text: `> Selected Primary Key: ${table}.${field}` },
          { type: 'system', text: `> Awaiting Target Foreign Key selection...` }
        ]);
      } else {
        setConsoleHistory(prev => [
          ...prev,
          { type: 'command', text: `$ click [${table}.${field}]` },
          { type: 'error', text: `Error: Relationship must originate from a Primary Key (PK).` }
        ]);
      }
    } else {
      if (selectedField.table === table) {
        setConsoleHistory(prev => [
          ...prev,
          { type: 'command', text: `$ click [${table}.${field}]` },
          { type: 'error', text: `Error: Cannot create relationship within the same table in this demo.` }
        ]);
        setSelectedField(null);
        return;
      }
      
      // Check if correct link (customers.id -> orders.customer_id)
      if (selectedField.field === 'id' && field === 'customer_id') {
        setLinked(true);
        setSelectedField(null);
        setConsoleHistory(prev => [
          ...prev,
          { type: 'command', text: `$ click [${table}.${field}]` },
          { type: 'command', text: `$ ALTER TABLE ${table} ADD CONSTRAINT fk_${table}_${selectedField.table} FOREIGN KEY (${field}) REFERENCES ${selectedField.table}(${selectedField.field});` },
          { type: 'success', text: `> Success: 1:N Relationship established between ${selectedField.table} and ${table}.` }
        ]);
      } else {
        setConsoleHistory(prev => [
          ...prev,
          { type: 'command', text: `$ click [${table}.${field}]` },
          { type: 'error', text: `Error: Invalid connection. Data types or context do not match.` }
        ]);
        setSelectedField(null);
      }
    }
  };

  const reset = () => {
    setSelectedField(null);
    setLinked(false);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ ALTER TABLE orders DROP FOREIGN KEY fk_orders_customers;` },
      { type: 'system', text: `> Relationship removed. Schema reset.` }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
            <Network size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Database Schema Builder (การออกแบบฐานข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          ฝึกออกแบบฐานข้อมูลด้วยการสร้างความสัมพันธ์ (Relationship) ระหว่างตาราง 1 ต่อกลุ่ม (1:N)
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Interactive Schema Builder */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50 relative overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur z-20">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex justify-between items-center">
                <span>ER Diagram Visualizer</span>
                {linked && (
                  <button onClick={reset} className="text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
                    <RefreshCw size={12}/> Reset Schema
                  </button>
                )}
              </h4>
            </div>

            {/* Canvas */}
            <div className="flex-1 relative p-8 flex flex-col items-center justify-center min-h-[400px]">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-2xl relative z-10 gap-12 lg:gap-20">
                
                {/* Table 1: Customers */}
                <div className={`bg-white rounded-xl shadow-lg border-2 w-56 transition-all duration-300 ${selectedField?.table === 'customers' ? 'border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105' : 'border-slate-200'}`}>
                  <div className="bg-sky-600 text-white font-bold py-2.5 px-4 rounded-t-lg flex justify-between items-center text-sm">
                    <span>Customers</span>
                    <span className="text-xs bg-sky-500 px-2 py-0.5 rounded font-mono">1</span>
                  </div>
                  <div className="text-sm">
                    <div 
                      onClick={() => handleFieldClick('customers', 'id', 'PK')}
                      className={`flex items-center justify-between p-2.5 border-b border-slate-100 cursor-pointer transition-colors ${selectedField?.field === 'id' ? 'bg-sky-100' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Key size={14} className="text-yellow-500" />
                        <span className="font-bold text-slate-700">id</span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">INT (PK)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 border-b border-slate-100 opacity-70">
                      <span className="text-slate-600 pl-6">name</span>
                      <span className="text-[10px] text-slate-600 font-mono">VARCHAR</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 opacity-70">
                      <span className="text-slate-600 pl-6">email</span>
                      <span className="text-[10px] text-slate-600 font-mono">VARCHAR</span>
                    </div>
                  </div>
                </div>

                {/* Connection Line (SVG) */}
                {linked && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-in fade-in duration-1000 hidden md:block">
                    <path 
                      d="M 230 150 C 350 150, 350 150, 430 150" 
                      fill="transparent" 
                      stroke="#0EA5E9" 
                      strokeWidth="3" 
                      strokeDasharray="6 6"
                      className="animate-[dash_1s_linear_infinite]"
                    />
                    <circle cx="230" cy="150" r="5" fill="#0EA5E9" />
                    <polygon points="420,145 430,150 420,155" fill="#0EA5E9" />
                    <style>{`@keyframes dash { to { stroke-dashoffset: -12; } }`}</style>
                  </svg>
                )}

                {/* Table 2: Orders */}
                <div className={`bg-white rounded-xl shadow-lg border-2 w-56 transition-all duration-300 ${selectedField?.table === 'orders' ? 'border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105' : 'border-slate-200'}`}>
                  <div className="bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-t-lg flex justify-between items-center text-sm">
                    <span>Orders</span>
                    <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded font-mono">N</span>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center justify-between p-2.5 border-b border-slate-100 opacity-70">
                      <div className="flex items-center gap-2">
                        <Key size={14} className="text-yellow-500" />
                        <span className="font-bold text-slate-700">order_id</span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">INT (PK)</span>
                    </div>
                    <div 
                      onClick={() => handleFieldClick('orders', 'customer_id', 'FK')}
                      className={`flex items-center justify-between p-2.5 border-b border-slate-100 cursor-pointer transition-colors ${linked ? 'bg-sky-50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon size={14} className={linked ? "text-sky-500" : "text-slate-400"} />
                        <span className={`font-bold ${linked ? "text-sky-600" : "text-slate-700"}`}>customer_id</span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">INT (FK)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 opacity-70">
                      <span className="text-slate-600 pl-6">total</span>
                      <span className="text-[10px] text-slate-600 font-mono">DECIMAL</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">
              คำอธิบายการออกแบบ
            </h4>
            
            <div className="space-y-4 flex-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 shadow-sm">
                <strong className="block mb-2 text-sky-700 flex items-center gap-2">
                  <Key size={16} className="text-yellow-500"/> Primary Key (PK)
                </strong>
                คีย์หลักของตาราง ต้องไม่ซ้ำกัน เช่น รหัสลูกค้า <code>id</code> ในตาราง Customers
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 shadow-sm">
                <strong className="block mb-2 text-emerald-700 flex items-center gap-2">
                  <LinkIcon size={16} className="text-slate-700"/> Foreign Key (FK)
                </strong>
                คีย์นอกที่ใช้อ้างอิงไปยังตารางอื่น เช่น <code>customer_id</code> ในตาราง Orders
              </div>

              {linked ? (
                <div className="mt-4 bg-emerald-50 text-emerald-900 p-4 rounded-xl shadow-sm border border-emerald-200 animate-in fade-in slide-in-from-bottom-4">
                  <h5 className="font-bold flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-emerald-500"/> One-to-Many (1:N)
                  </h5>
                  <p className="text-xs leading-relaxed">
                    ลูกค้า 1 คน สามารถมีได้หลายคำสั่งซื้อ (Orders) การเชื่อมต่อสำเร็จแล้ว! สังเกตจากคำสั่ง `ALTER TABLE` ด้านล่าง
                  </p>
                </div>
              ) : (
                <div className="mt-4 bg-yellow-50 text-yellow-900 p-4 rounded-xl shadow-sm border border-yellow-200">
                  <p className="text-xs leading-relaxed font-bold text-center">
                    เริ่มเชื่อมต่อโดยคลิกที่ PK ของ Customers จากนั้นคลิกที่ FK ของ Orders
                  </p>
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
              <span className="text-slate-700 text-xs">Schema DDL Builder</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">mysql&gt;</span> <div className="text-slate-600 font-bold">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text}</div></>}
                {line.type === 'system'  && <><span className="text-slate-700 font-bold shrink-0">[Sys]</span> <div className="text-slate-600">{line.text}</div></>}
                {line.type === 'error'   && <><span className="text-rose-400 font-bold shrink-0">[Err]</span> <div className="text-rose-400 font-bold">{line.text}</div></>}
                {line.type === 'success' && <><span className="text-emerald-400 font-bold shrink-0">[Ok]</span> <div className="text-emerald-400 font-bold">{line.text}</div></>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
