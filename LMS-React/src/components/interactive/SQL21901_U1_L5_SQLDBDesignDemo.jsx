import React, { useState, useEffect } from 'react';
import { Network, Key, Link as LinkIcon, CheckCircle2, XCircle, MousePointerClick, RefreshCw } from 'lucide-react';

export default function SQL21901_U1_L5_SQLDBDesignDemo() {
  const [selectedField, setSelectedField] = useState(null);
  const [linked, setLinked] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldClick = (table, field, type) => {
    if (linked) return;

    if (!selectedField) {
      if (type === 'PK') {
        setSelectedField({ table, field, type });
      } else {
        showToast('กรุณาเริ่มเชื่อมจาก Primary Key (กุญแจทอง) ก่อนครับ', 'error');
      }
    } else {
      if (selectedField.table === table) {
        showToast('ไม่สามารถเชื่อมตารางเดียวกันได้ครับ', 'error');
        setSelectedField(null);
        return;
      }
      
      // Check if correct link (customers.id -> orders.customer_id)
      if (selectedField.field === 'id' && field === 'customer_id') {
        setLinked(true);
        setSelectedField(null);
        showToast('ยอดเยี่ยม! คุณสร้างความสัมพันธ์ 1:N (Primary Key ➔ Foreign Key) สำเร็จ!', 'success');
      } else {
        showToast('การเชื่อมต่อไม่ถูกต้อง ลองหา Foreign Key ที่มีชนิดข้อมูลตรงกันและสื่อถึง ID ของลูกค้าดูนะครับ', 'error');
        setSelectedField(null);
      }
    }
  };

  const reset = () => {
    setSelectedField(null);
    setLinked(false);
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-sky-100 text-sky-600 rounded-xl shrink-0">
          <Network size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Database Schema Builder</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ฝึกออกแบบฐานข้อมูลด้วยการสร้างความสัมพันธ์ (Relationship) ระหว่างตาราง ลองคลิกที่ <strong className="text-yellow-600">Primary Key (PK)</strong> ของตารางลูกค้า แล้วไปคลิกที่ <strong className="text-slate-600">Foreign Key (FK)</strong> ของตารางออเดอร์เพื่อลากเส้นเชื่อมต่อกัน!
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-300 relative overflow-hidden min-h-[400px]">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="flex flex-col md:flex-row justify-around items-center h-full relative z-10 gap-12">
          
          {/* Table 1: Customers */}
          <div className={`bg-white rounded-xl shadow-xl border-2 w-64 transition-all duration-300 ${selectedField?.table === 'customers' ? 'border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105' : 'border-slate-200'}`}>
            <div className="bg-sky-600 text-white font-bold py-3 px-4 rounded-t-lg flex justify-between items-center">
              <span>Customers</span>
              <span className="text-xs bg-sky-500 px-2 py-1 rounded">1</span>
            </div>
            <div className="p-0">
              <div 
                onClick={() => handleFieldClick('customers', 'id', 'PK')}
                className={`flex items-center justify-between p-3 border-b border-slate-100 cursor-pointer transition-colors ${selectedField?.field === 'id' ? 'bg-sky-100' : 'hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-yellow-500" />
                  <span className="font-bold text-slate-700">id</span>
                </div>
                <span className="text-xs text-slate-400">INT (PK)</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 opacity-70">
                <span className="text-slate-600">name</span>
                <span className="text-xs text-slate-400">VARCHAR</span>
              </div>
              <div className="flex items-center justify-between p-3 opacity-70">
                <span className="text-slate-600">email</span>
                <span className="text-xs text-slate-400">VARCHAR</span>
              </div>
            </div>
          </div>

          {/* Connection Line (SVG) */}
          {linked && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-in fade-in duration-1000 hidden md:block">
              <path 
                d="M 256 120 C 350 120, 350 120, 450 120" 
                fill="transparent" 
                stroke="#0EA5E9" 
                strokeWidth="4" 
                strokeDasharray="8 8"
                className="animate-[dash_1s_linear_infinite]"
              />
              <circle cx="256" cy="120" r="6" fill="#0EA5E9" />
              <polygon points="440,115 450,120 440,125" fill="#0EA5E9" />
              <style>{`@keyframes dash { to { stroke-dashoffset: -16; } }`}</style>
            </svg>
          )}

          {/* Linking visual cue for mobile */}
          {linked && (
            <div className="md:hidden flex flex-col items-center text-sky-500 animate-bounce py-4">
              <div className="h-8 w-1 bg-sky-500"></div>
              <div className="w-4 h-4 border-b-4 border-r-4 border-sky-500 transform rotate-45"></div>
            </div>
          )}

          {/* Table 2: Orders */}
          <div className={`bg-white rounded-xl shadow-xl border-2 w-64 transition-all duration-300 ${selectedField?.table === 'orders' ? 'border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105' : 'border-slate-200'}`}>
            <div className="bg-emerald-600 text-white font-bold py-3 px-4 rounded-t-lg flex justify-between items-center">
              <span>Orders</span>
              <span className="text-xs bg-emerald-500 px-2 py-1 rounded">N</span>
            </div>
            <div className="p-0">
              <div className="flex items-center justify-between p-3 border-b border-slate-100 opacity-70">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-yellow-500" />
                  <span className="font-bold text-slate-700">order_id</span>
                </div>
                <span className="text-xs text-slate-400">INT (PK)</span>
              </div>
              <div 
                onClick={() => handleFieldClick('orders', 'customer_id', 'FK')}
                className={`flex items-center justify-between p-3 border-b border-slate-100 cursor-pointer transition-colors ${linked ? 'bg-sky-50' : 'hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                  <LinkIcon size={16} className={linked ? "text-sky-500" : "text-slate-400"} />
                  <span className={`font-bold ${linked ? "text-sky-600" : "text-slate-700"}`}>customer_id</span>
                </div>
                <span className="text-xs text-slate-400">INT (FK)</span>
              </div>
              <div className="flex items-center justify-between p-3 opacity-70">
                <span className="text-slate-600">total_price</span>
                <span className="text-xs text-slate-400">DECIMAL</span>
              </div>
            </div>
          </div>

        </div>

        {/* Overlay Instructions */}
        {!linked && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <MousePointerClick size={20} className="text-yellow-400"/>
            {selectedField ? `กำลังเชื่อมต่อจาก ${selectedField.table}.${selectedField.field}... ให้คลิกที่ FK เลย!` : 'คลิกที่ Primary Key ของ Customers เพื่อเริ่ม'}
          </div>
        )}
        
        {linked && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button onClick={reset} className="bg-white text-slate-700 border border-slate-300 px-6 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <RefreshCw size={18}/> ทำลายความสัมพันธ์และเริ่มใหม่
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : 'bg-slate-800 border-rose-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500" /> : <XCircle className="text-rose-500" />}
          <div className="font-medium text-lg">{toast.msg}</div>
        </div>
      )}
    </div>
  );
}
