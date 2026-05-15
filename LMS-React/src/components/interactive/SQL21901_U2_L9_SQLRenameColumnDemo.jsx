import React, { useState } from 'react';
import { Database, Tag, PenLine, Play, ArrowDown, Lightbulb, Key } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLRenameColumnDemo = () => {
  const [columns, setColumns] = useState([
    { id: 'c1', name: 'c_id', type: 'INT', isPK: true },
    { id: 'c2', name: 'nm', type: 'VARCHAR(100)', isPK: false },
    { id: 'c3', name: 'tel', type: 'VARCHAR(20)', isPK: false },
    { id: 'c4', name: 'addr', type: 'TEXT', isPK: false }
  ]);

  const [tableData] = useState([
    { c1: 1, c2: 'สมชาย ใจดี', c3: '081-234-5678', c4: 'กรุงเทพฯ' },
    { c1: 2, c2: 'สุดา มานะ', c3: '089-876-5432', c4: 'เชียงใหม่' },
    { c1: 3, c2: 'ปิติ ดีใจ', c3: '082-333-4444', c4: 'ขอนแก่น' }
  ]);

  const [selectedColId, setSelectedColId] = useState('c2');
  const [newName, setNewName] = useState('');
  const [historyLog, setHistoryLog] = useState([]);
  const [animatingColId, setAnimatingColId] = useState(null);
  const [oldNameDisplay, setOldNameDisplay] = useState(null);
  const [showHelper, setShowHelper] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [nameHintVisible, setNameHintVisible] = useState(false);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 2500);
  };

  const getSqlPreview = () => {
    const colObj = columns.find(c => c.id === selectedColId);
    if (!colObj) return '';
    const oldN = colObj.name;
    const newN = newName.trim() || 'new_column_name';
    return `ALTER TABLE customers\nRENAME COLUMN ${oldN} TO ${newN};`;
  };

  const handleExecute = () => {
    const rawNewName = newName.trim();
    const colObj = columns.find(c => c.id === selectedColId);
    if (!colObj) return;

    if (!rawNewName) {
      showToastMsg('กรุณากำหนดชื่อคอลัมน์ใหม่ครับ', 'error');
      return;
    }

    const safeName = rawNewName.replace(/[^a-zA-Z0-9_]/g, '');
    if (safeName !== rawNewName) {
      showToastMsg('ใช้ได้แค่ภาษาอังกฤษ ตัวเลข และ _ เท่านั้นครับ', 'error');
      return;
    }

    if (safeName.toLowerCase() === colObj.name.toLowerCase()) {
      showToastMsg('ชื่อใหม่เหมือนกับชื่อเดิมเลยครับ', 'error');
      return;
    }

    if (columns.some(c => c.name.toLowerCase() === safeName.toLowerCase())) {
      showToastMsg(`ชื่อคอลัมน์ '${safeName}' มีอยู่แล้วในตารางนี้ครับ`, 'error');
      return;
    }

    // Success
    const oldName = colObj.name;
    setOldNameDisplay({ colId: colObj.id, oldName });
    setAnimatingColId(colObj.id);
    setShowHelper(false);

    setColumns(cols => cols.map(c =>
      c.id === colObj.id ? { ...c, name: safeName } : c
    ));

    setHistoryLog(prev => [...prev, { old: oldName, newName: safeName }]);
    setNewName('');

    showToastMsg(`เปลี่ยนชื่อคอลัมน์เป็น ${safeName} สำเร็จ!`, 'success');

    setTimeout(() => {
      setAnimatingColId(null);
      setOldNameDisplay(null);
    }, 1500);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-sky-500' : 'border-rose-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Syntax + Knowledge Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-slate-700/50 z-0 pointer-events-none">
            <Tag size={200} />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
            <Tag className="w-5 h-5" /> โครงสร้างไวยากรณ์ (Syntax)
          </h3>
          <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
            <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`ALTER TABLE table_name 
RENAME COLUMN old_column_name TO new_column_name;

-- ตัวอย่าง: เปลี่ยนชื่อคอลัมน์จาก tel เป็น phone_number
ALTER TABLE customers 
RENAME COLUMN tel TO phone_number;`) }} />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" /> เกร็ดความรู้
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            ใน MySQL เวอร์ชันเก่า (ก่อน 8.0) เรามักจะใช้คำสั่ง <code className="bg-blue-100 px-1 rounded">CHANGE</code> ซึ่ง <strong>บังคับให้เราต้องพิมพ์ Data Type ซ้ำอีกรอบ</strong> ถึงแม้เราแค่อยากจะเปลี่ยนแค่ชื่อก็ตาม
            <br /><br />
            <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-blue-100 block">ALTER TABLE t CHANGE old new INT;</span>
            <br />
            แต่ปัจจุบัน <code className="bg-blue-100 px-1 rounded">RENAME COLUMN</code> นั้นสะดวกและปลอดภัยกว่ามากครับ!
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 shadow-inner">
            <PenLine size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: Rename Simulator</h2>
            <p className="text-slate-600 text-sm mt-1">ตาราง <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">customers</code> ด้านล่างมีคอลัมน์ที่ชื่ออ่านยากจัง ลองแก้ให้มันดูเป็นมืออาชีพขึ้นหน่อยครับ!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <PenLine className="w-5 h-5 text-sky-500" /> กำหนดชื่อใหม่
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการเปลี่ยนชื่อ</label>
                  <select
                    value={selectedColId}
                    onChange={(e) => { setSelectedColId(e.target.value); setNewName(''); setNameHintVisible(false); }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 bg-white cursor-pointer"
                  >
                    {columns.map(col => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-5 h-5" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">ชื่อใหม่ (New Name) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      setNameHintVisible(/[^a-zA-Z0-9_]/.test(e.target.value));
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
                    className="w-full px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-xl outline-none font-mono text-sm transition-all"
                    placeholder="พิมพ์ชื่อคอลัมน์ใหม่ที่นี่..."
                  />
                  {nameHintVisible && (
                    <p className="text-xs text-rose-500 mt-1">ใช้ภาษาอังกฤษ ตัวเลข หรือ _ เท่านั้น</p>
                  )}
                </div>

                <button
                  onClick={handleExecute}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4 hover:shadow-sky-500/30"
                >
                  <Play className="w-4 h-4 fill-current" /> รันคำสั่ง (Execute)
                </button>
              </div>
            </div>

            {/* SQL Preview */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
              <div className="text-sm font-mono break-words min-h-[40px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(getSqlPreview()) }}
              />
            </div>
          </div>

          {/* Right: Table + History */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-600" /> ตาราง customers
                </div>
              </div>

              <div className="overflow-x-auto p-4 bg-slate-50 relative flex-grow min-h-[200px] custom-scrollbar">
                {showHelper && (
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-bounce opacity-90 z-20">
                    ↑ ลองเปลี่ยน <strong>nm</strong> เป็น <strong>name</strong> ดูสิ!
                  </div>
                )}
                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-slate-200 text-sm">
                  <thead>
                    <tr>
                      {columns.map(col => (
                        <th
                          key={col.id}
                          className={`bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 border-r border-slate-700 whitespace-nowrap transition-all duration-500 ${
                            animatingColId === col.id ? 'border-b-sky-400 border-b-4 text-sky-300 bg-slate-900' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {oldNameDisplay && oldNameDisplay.colId === col.id && (
                              <span className="line-through opacity-50 text-sm mr-1">{oldNameDisplay.oldName}</span>
                            )}
                            <span>{col.name}</span>
                            {col.isPK && <Key className="w-3 h-3 text-amber-500" />}
                          </div>
                          <div className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20 font-normal mt-0.5 inline-block">{col.type}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-b-0">
                        {columns.map(col => (
                          <td key={col.id} className={`px-4 py-3 font-mono border-r border-slate-200 last:border-r-0 whitespace-nowrap ${col.isPK ? 'font-bold text-slate-500' : 'text-slate-600'}`}>
                            {row[col.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* History Log */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600">
              <strong>บันทึกประวัติการแก้ไข:</strong>
              <ul className="mt-2 space-y-1 text-xs font-mono text-slate-500 list-disc list-inside pl-4">
                {historyLog.length === 0 ? (
                  <li className="italic opacity-50">ยังไม่มีการแก้ไข...</li>
                ) : (
                  [...historyLog].reverse().map((log, i) => (
                    <li key={i}>
                      เปลี่ยน <span className="text-rose-400 line-through">{log.old}</span> เป็น <span className="text-sky-500 font-bold">{log.newName}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SQLRenameColumnDemo;
