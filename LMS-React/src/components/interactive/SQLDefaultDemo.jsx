import React, { useState, useEffect } from 'react';
import { Database, Wand2, ArrowDown10, Plus, Keyboard, PaperPlane, Table, Clock, Bot, Asterisk, Terminal, FolderOpen } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLDefaultDemo = () => {
  const [orders, setOrders] = useState([]);
  const [autoIncrementId, setAutoIncrementId] = useState(1001);
  const [customerName, setCustomerName] = useState('');
  const [overrideStatus, setOverrideStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('paid');
  const [sqlCommand, setSqlCommand] = useState('-- รอการสั่งรัน...');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [highlightId, setHighlightId] = useState(null);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2500);
  };

  const getMySQLDateTime = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };

  const handleInsert = () => {
    const custName = customerName.trim();
    if (!custName) {
      showToastMsg('กรุณากรอกชื่อลูกค้าก่อนครับ', 'error');
      return;
    }

    const currentId = autoIncrementId;
    const currentTime = getMySQLDateTime();
    const statusValue = overrideStatus ? selectedStatus : 'pending';

    const newOrder = {
      id: currentId,
      customer: custName,
      status: statusValue,
      date: currentTime,
      isDefaultStatus: !overrideStatus
    };

    setOrders([newOrder, ...orders]); // Prepend
    setAutoIncrementId(prev => prev + 1);
    setHighlightId(currentId);

    let sqlStr = overrideStatus
      ? `INSERT INTO orders (customer_name, status) VALUES ('${custName}', '${statusValue}');`
      : `INSERT INTO orders (customer_name) VALUES ('${custName}');`;

    setSqlCommand(`> ${sqlStr}`);
    setCustomerName('');
    showToastMsg('เพิ่มข้อมูลสำเร็จ!', 'success');

    // Remove highlight after animation
    setTimeout(() => setHighlightId(null), 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleInsert();
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

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-6 -top-6 text-slate-100 group-hover:text-blue-50 transition-colors z-0">
            <ArrowDown10 size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-inner">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 font-mono">AUTO_INCREMENT</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">ใช้กับคอลัมน์ตัวเลข (มักเป็น Primary Key) เพื่อให้ระบบรันเลขรหัสถัดไปให้เอง โดยที่เราไม่ต้องจำว่ารหัสล่าสุดคือเลขอะไร</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-mono">
              <span className="text-[#c678dd]">id</span> <span className="text-[#e5c07b]">INT</span> <span className="text-[#c678dd]">AUTO_INCREMENT</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-6 -top-6 text-slate-100 group-hover:text-emerald-50 transition-colors z-0">
            <Wand2 size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-inner">
              <Asterisk className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 font-mono">DEFAULT 'value'</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">หากผู้ใช้ไม่กรอกข้อมูลในคอลัมน์นี้ ระบบจะยัด "ค่าเริ่มต้น" ที่เราตั้งไว้ให้ทันที เช่น ตั้งสถานะเริ่มต้นเป็น 'รอดำเนินการ'</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-mono">
              <span className="text-[#c678dd]">status</span> <span className="text-[#e5c07b]">VARCHAR(20)</span> <span className="text-[#c678dd]">DEFAULT</span> <span className="text-[#98c379]">'pending'</span>
            </div>
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-300">
          <Wand2 className="w-5 h-5" /> โครงสร้างการสร้างตารางคำสั่งซื้อ (Orders)
        </h3>
        <p className="text-sm text-slate-300 mb-6">ตัวอย่างนี้มีการใช้ <code>CURRENT_TIMESTAMP</code> ซึ่งเป็นฟังก์ชันพิเศษของ SQL ที่ดึงวันและเวลาปัจจุบันของเซิร์ฟเวอร์มาใส่ให้โดยอัตโนมัติ</p>

        <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto font-mono">
          <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- ค่าเริ่มต้นคือ pending
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP -- ยัดเวลาปัจจุบันให้อัตโนมัติ
);

-- กำหนดให้ AUTO_INCREMENT เริ่มรันเลขที่ 1001 (แทนที่จะเริ่มที่ 1)
ALTER TABLE orders AUTO_INCREMENT = 1001;`) }} />
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: Order System Simulator</h2>
            <p className="text-slate-600 text-sm mt-1">ทดลองจำลองการเพิ่มข้อมูลคำสั่งซื้อ โดยกรอกแค่ชื่อลูกค้า แล้วดูความฉลาดของฐานข้อมูล</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-indigo-500" /> ฟอร์มรับคำสั่งซื้อ
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">ชื่อลูกค้า (customer_name) <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none text-sm transition-all" 
                    placeholder="เช่น สมชาย ใจดี"
                  />
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 transition-colors focus-within:border-indigo-300">
                  <label className="flex items-center cursor-pointer justify-between group">
                    <div className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">ระบุสถานะเองหรือไม่?</div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={overrideStatus}
                        onChange={() => setOverrideStatus(!overrideStatus)}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${overrideStatus ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${overrideStatus ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </label>

                  {overrideStatus ? (
                    <div className="mt-3 pop-in">
                      <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 cursor-pointer"
                      >
                        <option value="paid">paid (จ่ายเงินแล้ว)</option>
                        <option value="shipped">shipped (จัดส่งแล้ว)</option>
                      </select>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-slate-400 italic">
                      * หากไม่ระบุ ฐานข้อมูลจะใช้ค่า DEFAULT ('pending')
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleInsert}
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  <PaperPlane className="w-4 h-4" /> เพิ่มข้อมูล (INSERT)
                </button>
              </div>
            </div>

            {/* Mini Console */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> SQL Executed:
              </div>
              <div className="text-sm font-mono text-emerald-400 break-words min-h-[40px] leading-relaxed">
                {sqlCommand}
              </div>
            </div>
          </div>

          {/* Right: Database Table Viewer */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg flex-grow flex flex-col">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-600" /> ตาราง orders
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200">
                  AUTO_INCREMENT = <span className="text-indigo-600 font-bold">{autoIncrementId}</span>
                </div>
              </div>

              <div className="overflow-x-auto flex-grow relative custom-scrollbar bg-slate-50/30">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 whitespace-nowrap">
                        order_id <span className="text-amber-500 ml-1 text-xs" title="PK">PK</span>
                      </th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 whitespace-nowrap">
                        customer_name
                      </th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 whitespace-nowrap">
                        status <span className="text-[10px] text-emerald-400 font-normal ml-1 border border-emerald-400/50 px-1 rounded bg-emerald-400/10">DEF</span>
                      </th>
                      <th className="bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 whitespace-nowrap">
                        order_date <span className="text-[10px] text-emerald-400 font-normal ml-1 border border-emerald-400/50 px-1 rounded bg-emerald-400/10">DEF</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan="4" className="h-64 relative">
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                              <FolderOpen className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium text-lg">ตารางยังว่างเปล่า</p>
                            <p className="text-sm text-slate-400 mt-1">ลองเพิ่มคำสั่งซื้อทางด้านซ้ายดูสิ!</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {orders.map(order => (
                      <tr 
                        key={order.id} 
                        className={`bg-white border-b border-slate-200 transition-colors hover:bg-slate-50 font-mono text-sm ${
                          highlightId === order.id ? 'bg-emerald-50/80 animate-pulse-once border-l-4 border-l-emerald-500' : ''
                        }`}
                      >
                        <td className="px-4 py-3 font-bold text-slate-600" title="Generated by AUTO_INCREMENT">
                          <div className="flex items-center gap-1.5">
                            {order.id} <Bot className="w-3 h-3 text-blue-400" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-indigo-600 font-semibold">{order.customer}</td>
                        <td className={`px-4 py-3 ${order.isDefaultStatus ? 'text-emerald-600 font-semibold' : 'text-slate-700'}`} title={order.isDefaultStatus ? "Generated by DEFAULT constraint" : ""}>
                          <div className="flex items-center gap-1.5">
                            {order.status}
                            {order.isDefaultStatus && <Wand2 className="w-3 h-3 text-emerald-400 opacity-70" />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-emerald-600 font-semibold" title="Generated by DEFAULT CURRENT_TIMESTAMP">
                          <div className="flex items-center gap-1.5">
                            {order.date} <Clock className="w-3 h-3 text-emerald-400 opacity-70" />
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default SQLDefaultDemo;
