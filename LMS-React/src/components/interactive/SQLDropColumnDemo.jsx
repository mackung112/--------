import React, { useState } from 'react';
import { Database, Scissors, Trash2, TriangleAlert, Info } from 'lucide-react';
import { SQLSyntaxEngine } from './utils/SQLSyntaxEngine';

const SQLDropColumnDemo = () => {
  const [columns, setColumns] = useState([
    { id: 'c1', name: 'mem_id', type: 'INT', isPK: true, removable: false },
    { id: 'c2', name: 'username', type: 'VARCHAR(50)', isPK: false, removable: false },
    { id: 'c3', name: 'fax_number', type: 'VARCHAR(20)', isPK: false, removable: true },
    { id: 'c4', name: 'line_id', type: 'VARCHAR(50)', isPK: false, removable: true },
    { id: 'c5', name: 'blood_type', type: 'VARCHAR(5)', isPK: false, removable: true },
    { id: 'c6', name: 'created_at', type: 'DATETIME', isPK: false, removable: false }
  ]);

  const [tableData, setTableData] = useState([
    { c1: 1, c2: 'admin_01', c3: '02-111-2222', c4: '@admin01', c5: 'AB', c6: '2025-01-10' },
    { c1: 2, c2: 'johndoe', c3: '-', c4: 'john.d', c5: 'O', c6: '2025-02-15' },
    { c1: 3, c2: 'somying', c3: '053-999-888', c4: 'ying_zaa', c5: 'B', c6: '2025-03-20' }
  ]);

  const removableCols = columns.filter(c => c.removable);
  const [selectedColId, setSelectedColId] = useState(removableCols.length > 0 ? removableCols[0].id : '');
  const [animatingColId, setAnimatingColId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [showHelper, setShowHelper] = useState(true);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const getSqlPreview = () => {
    if (removableCols.length === 0) return '-- No columns available to drop --';
    const colObj = columns.find(c => c.id === selectedColId);
    if (!colObj) return '';
    return `ALTER TABLE members\nDROP COLUMN ${colObj.name};`;
  };

  const handlePrepareDrop = () => {
    if (!selectedColId) return;
    setShowConfirmModal(true);
  };

  const handleConfirmDrop = () => {
    setShowConfirmModal(false);
    setShowHelper(false);
    setAnimatingColId(selectedColId);

    const colObj = columns.find(c => c.id === selectedColId);

    setTimeout(() => {
      setColumns(prev => prev.filter(c => c.id !== selectedColId));
      
      setTableData(prev => prev.map(row => {
        const newRow = { ...row };
        delete newRow[selectedColId];
        return newRow;
      }));

      setAnimatingColId(null);
      
      const newRemovable = columns.filter(c => c.removable && c.id !== selectedColId);
      if (newRemovable.length > 0) {
        setSelectedColId(newRemovable[0].id);
      } else {
        setSelectedColId('');
      }

      showToastMsg(`ลบคอลัมน์ <span class="font-mono bg-white/20 px-1 rounded">${colObj.name}</span> ถาวรแล้ว!`, 'success');
    }, 800); // Wait for shrinkAndFade animation (approx 0.8s)
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 bg-slate-800 text-white pop-in ${
          toast.type === 'success' ? 'border-emerald-500' : 'border-rose-500'
        }`}>
          {toast.type === 'success' ? <div className="text-emerald-500">✓</div> : <div className="text-rose-500">⚠</div>}
          <div dangerouslySetInnerHTML={{ __html: toast.message }} />
        </div>
      )}

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden h-full">
          <div className="absolute -right-6 -top-6 text-slate-700/50 z-0 pointer-events-none">
            <Trash2 size={240} />
          </div>

          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-rose-400">
            <Trash2 className="w-5 h-5" /> โครงสร้างไวยากรณ์ (Syntax)
          </h3>

          <div className="bg-[#282c34] p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 font-mono">
            <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(`-- การลบคอลัมน์ (ลบแค่โครงสร้างบางส่วน)
ALTER TABLE table_name 
DROP COLUMN column_name;

-- ตัวอย่าง: ลบคอลัมน์ 'fax_number' ทิ้งไป
ALTER TABLE companies DROP COLUMN fax_number;

-- ----------------------------------------
-- [อันตรายขั้นสุด] การลบทิ้งทั้งตาราง!
DROP TABLE table_name;`) }} />
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center h-full">
          <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
            <TriangleAlert className="text-rose-500 w-6 h-6 flex-shrink-0" /> คำเตือนจาก DBA
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            ในโลกการทำงานจริง โปรแกรมเมอร์มักจะไม่ค่อยใช้คำสั่ง DROP เพื่อลบข้อมูลโดยตรง แต่มักจะเพิ่มคอลัมน์เช่น <code className="bg-rose-100 px-1 rounded text-rose-700">is_active</code> หรือ <code className="bg-rose-100 px-1 rounded text-rose-700">deleted_at</code> เพื่อซ่อนข้อมูลแทน (Soft Delete) เพราะข้อมูลทุกอย่างมีค่าและอาจต้องใช้ตรวจสอบย้อนหลังครับ
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shadow-inner">
            <Trash2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Interactive: DROP Simulator</h2>
            <p className="text-slate-600 text-sm mt-1">ตาราง <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">members</code> ด้านล่างมีคอลัมน์ที่ไม่จำเป็นและกินพื้นที่อยู่ ลองเลือกคอลัมน์แล้วสั่งลบทิ้งดูครับ!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Control Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-rose-500" /> เลือกลบคอลัมน์
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการลบ <span className="text-red-500">*</span></label>
                  <select 
                    value={selectedColId}
                    onChange={(e) => setSelectedColId(e.target.value)}
                    disabled={removableCols.length === 0}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {removableCols.length > 0 ? (
                      removableCols.map(col => (
                        <option key={col.id} value={col.id}>{col.name}</option>
                      ))
                    ) : (
                      <option value="">-- ไม่มีคอลัมน์ให้ลบแล้ว --</option>
                    )}
                  </select>
                </div>

                <button 
                  onClick={handlePrepareDrop}
                  disabled={removableCols.length === 0}
                  className={`w-full text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4 ${
                    removableCols.length > 0 
                      ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-rose-500/30' 
                      : 'bg-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Trash2 className="w-4 h-4" /> สั่งทำงาน (Execute)
                </button>
              </div>
            </div>

            {/* Live SQL Preview */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
              <div className="text-sm font-mono break-words min-h-[40px] leading-relaxed">
                {removableCols.length === 0 ? (
                  <span className="text-slate-500 italic">-- No columns available to drop --</span>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: SQLSyntaxEngine.highlight(getSqlPreview()).replace(/DROP COLUMN/g, '<span class="text-rose-400 font-bold">DROP COLUMN</span>') }} />
                )}
              </div>
            </div>
          </div>

          {/* Right: Database Table Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                <div className="font-bold text-slate-700 flex items-center gap-2">
                  <Database className="w-4 h-4 text-rose-600" /> ตาราง members
                </div>
              </div>

              <div className="overflow-x-auto p-4 bg-slate-50 relative flex-grow min-h-[220px] custom-scrollbar">
                {showHelper && (
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-bounce opacity-90 z-20">
                    ↑ ลบคอลัมน์ <strong>fax_number</strong> กับ <strong>line_id</strong> ทิ้งไปเลย! ไม่มีใครใช้แล้ว
                  </div>
                )}

                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm border border-slate-200 text-sm table-fixed">
                  <thead>
                    <tr>
                      {columns.map(col => (
                        <th 
                          key={col.id} 
                          className={`bg-slate-800 text-slate-200 px-4 py-3 font-mono border-b-2 border-slate-900 border-r border-slate-700 whitespace-nowrap transition-all duration-300 ${
                            animatingColId === col.id ? 'animate-shrinkAndFade w-0 p-0 overflow-hidden border-none opacity-0' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span>{col.name}</span>
                            {col.isPK && <Info className="w-3 h-3 text-amber-500" title="PK" />}
                          </div>
                          <div className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20 font-normal mt-0.5 inline-block truncate">{col.type}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-b-0">
                        {columns.map(col => (
                          <td 
                            key={col.id} 
                            className={`px-4 py-3 font-mono border-r border-slate-200 last:border-r-0 whitespace-nowrap overflow-hidden transition-all duration-300 ${col.isPK ? 'font-bold text-slate-500' : 'text-slate-600'} ${
                              animatingColId === col.id ? 'animate-shrinkAndFade w-0 p-0 border-none opacity-0' : ''
                            }`}
                          >
                            {row[col.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirm Drop Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-rose-500">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
              <TriangleAlert size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">คำเตือน!</h3>
            <p className="text-slate-600 mb-6">
              คุณกำลังจะลบคอลัมน์ <br />
              <strong className="text-rose-600 text-lg font-mono bg-rose-50 px-2 py-1 rounded border border-rose-200 block mt-2">
                {columns.find(c => c.id === selectedColId)?.name}
              </strong>
              <br /><span className="text-sm">ข้อมูลที่อยู่ในคอลัมน์นี้ของทุกๆ แถวจะหายไปอย่างถาวร ยืนยันหรือไม่?</span>
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors"
              >
                ยกเลิก (Cancel)
              </button>
              <button 
                onClick={handleConfirmDrop}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-rose-500/30"
              >
                ยืนยันลบ (DROP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SQLDropColumnDemo;
