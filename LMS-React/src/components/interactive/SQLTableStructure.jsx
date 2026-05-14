import React, { useState, useEffect } from 'react';
import { Database, Table, Columns, Rows, Grid3X3, ArrowRight, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SQLTableStructure() {
  const [highlight, setHighlight] = useState({ type: null, val: null });
  
  // Quiz State
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState({
    column: null,
    row: null,
    field: null
  });
  const [toast, setToast] = useState(null);
  
  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Info Panel Data
  const infoData = {
    'column': {
      title: 'Column / Field (คอลัมน์)',
      icon: <Columns className="text-sky-500" size={24} />,
      bg: 'bg-sky-100',
      desc: 'ข้อมูลในแนวตั้ง หมายถึง ประเภทของข้อมูล 1 ชนิดที่อยู่ในตาราง เช่น คอลัมน์ "first_name" จะเก็บเฉพาะชื่อพนักงานเท่านั้น โปรแกรมเมอร์มักเรียกว่า "ฟิลด์" (Field)'
    },
    'row': {
      title: 'Row / Record (แถว)',
      icon: <Rows className="text-rose-500" size={24} />,
      bg: 'bg-rose-100',
      desc: 'ข้อมูลในแนวนอน หมายถึง ข้อมูล 1 รายการ ที่ประกอบไปด้วยฟิลด์ต่างๆ รวมกัน เช่น แถวที่ 2 คือข้อมูลของพนักงานชื่อ Suda แผนก HR โปรแกรมเมอร์มักเรียกว่า "เรคคอร์ด" (Record)'
    },
    'cell': {
      title: 'Data Value (ข้อมูล)',
      icon: <Grid3X3 className="text-yellow-600" size={24} />,
      bg: 'bg-yellow-100',
      desc: 'จุดตัดระหว่างแถวและคอลัมน์ คือ เนื้อข้อมูลจริงๆ 1 ค่า (Single Value) เช่น คำว่า "IT" หรือตัวเลข "35000"'
    }
  };

  const handleCellClick = (type, val) => {
    setHighlight({ type, val });
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem === zone) {
      setDropZones(prev => ({ ...prev, [zone]: draggedItem }));
      setDraggedItem(null);
      showToast('ถูกต้องครับ!', 'success');
    } else {
      showToast('อ๊ะ! ยังไม่ถูกนะ ลองใหม่ครับ', 'error');
    }
  };

  const resetQuiz = () => {
    setDropZones({ column: null, row: null, field: null });
    setDraggedItem(null);
  };

  const isQuizComplete = Object.values(dropZones).every(v => v !== null);

  const getCellClasses = (type, colIdx, rowIdx) => {
    let classes = "bg-white p-3 text-center transition-all cursor-pointer border border-slate-200 relative ";
    if (type === 'header') classes = "bg-slate-100 font-bold text-slate-800 p-3 text-center transition-all cursor-pointer border border-slate-200 ";
    if (type === 'id') classes = "bg-slate-200 font-bold text-slate-500 p-3 text-center transition-all cursor-pointer border border-slate-200 ";

    // Highlight Logic
    if (highlight.type === 'column' && highlight.val === colIdx) {
      classes += "bg-sky-100 border-x-2 border-x-sky-400 z-10 ";
      if (type === 'header') classes += "border-t-2 border-t-sky-400 ";
      if (rowIdx === 3) classes += "border-b-2 border-b-sky-400 ";
    }
    
    if (highlight.type === 'row' && highlight.val === rowIdx) {
      classes += "bg-rose-100 border-y-2 border-y-rose-400 z-10 ";
      if (colIdx === 0) classes += "border-l-2 border-l-rose-400 ";
      if (colIdx === 4) classes += "border-r-2 border-r-rose-400 ";
    }

    if (highlight.type === 'cell' && highlight.val === `${colIdx}-${rowIdx}`) {
      classes += "bg-yellow-200 border-2 border-yellow-500 scale-105 shadow-lg z-20 font-bold ";
    }

    return classes;
  };

  return (
    <div className="space-y-12 my-8">
      {/* 1. โครงสร้างพื้นฐาน */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-4 border-b border-slate-700 flex items-center gap-2">
          <Table className="text-cyan-400" />
          <h3 className="font-bold text-cyan-400">Interactive: Table Anatomy (ตารางพนักงาน)</h3>
        </div>
        
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Table */}
          <div className="w-full lg:w-2/3 overflow-x-auto pb-4">
            <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr] rounded-lg overflow-hidden border-2 border-slate-300">
              {/* Headers */}
              <div onClick={() => handleCellClick('column', 0)} className={getCellClasses('header', 0, 0)}>PK</div>
              <div onClick={() => handleCellClick('column', 1)} className={getCellClasses('header', 1, 0)}>emp_id</div>
              <div onClick={() => handleCellClick('column', 2)} className={getCellClasses('header', 2, 0)}>first_name</div>
              <div onClick={() => handleCellClick('column', 3)} className={getCellClasses('header', 3, 0)}>department</div>
              <div onClick={() => handleCellClick('column', 4)} className={getCellClasses('header', 4, 0)}>salary</div>

              {/* Row 1 */}
              <div onClick={() => handleCellClick('row', 1)} className={getCellClasses('id', 0, 1)}>1</div>
              <div onClick={() => handleCellClick('cell', '1-1')} className={getCellClasses('cell', 1, 1)}>101</div>
              <div onClick={() => handleCellClick('cell', '2-1')} className={getCellClasses('cell', 2, 1)}>Somchai</div>
              <div onClick={() => handleCellClick('cell', '3-1')} className={getCellClasses('cell', 3, 1)}>IT</div>
              <div onClick={() => handleCellClick('cell', '4-1')} className={getCellClasses('cell', 4, 1)}>35000</div>

              {/* Row 2 */}
              <div onClick={() => handleCellClick('row', 2)} className={getCellClasses('id', 0, 2)}>2</div>
              <div onClick={() => handleCellClick('cell', '1-2')} className={getCellClasses('cell', 1, 2)}>102</div>
              <div onClick={() => handleCellClick('cell', '2-2')} className={getCellClasses('cell', 2, 2)}>Suda</div>
              <div onClick={() => handleCellClick('cell', '3-2')} className={getCellClasses('cell', 3, 2)}>HR</div>
              <div onClick={() => handleCellClick('cell', '4-2')} className={getCellClasses('cell', 4, 2)}>28000</div>

              {/* Row 3 */}
              <div onClick={() => handleCellClick('row', 3)} className={getCellClasses('id', 0, 3)}>3</div>
              <div onClick={() => handleCellClick('cell', '1-3')} className={getCellClasses('cell', 1, 3)}>103</div>
              <div onClick={() => handleCellClick('cell', '2-3')} className={getCellClasses('cell', 2, 3)}>Mana</div>
              <div onClick={() => handleCellClick('cell', '3-3')} className={getCellClasses('cell', 3, 3)}>Sales</div>
              <div onClick={() => handleCellClick('cell', '4-3')} className={getCellClasses('cell', 4, 3)}>42000</div>
            </div>
            <div className="text-center text-xs text-slate-400 mt-4 animate-bounce">
               👆 ลองคลิกที่หัวคอลัมน์, ตัวเลขแถว หรือข้อมูลข้างในดูสิครับ
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-1/3 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-center min-h-[250px]">
            {!highlight.type ? (
              <div className="text-center text-slate-400">
                <ArrowRight className="mx-auto mb-2 opacity-50" size={32} />
                <p>คลิกที่ส่วนต่างๆ ของตารางทางซ้าย<br/>เพื่อดูคำศัพท์และคำอธิบาย</p>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-300">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${infoData[highlight.type].bg}`}>
                    {infoData[highlight.type].icon}
                  </div>
                  <h4 className="font-bold text-lg text-slate-800">{infoData[highlight.type].title}</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{infoData[highlight.type].desc}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Drag & Drop Quiz */}
      <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Database className="text-orange-400" /> กิจกรรมตรวจสอบความเข้าใจ
        </h2>
        <p className="text-slate-300 text-sm mb-8">ลากป้ายคำศัพท์ด้านล่าง ไปวางในช่องว่างให้ตรงกับความหมายที่ถูกต้อง</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Questions */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold shrink-0">1</div>
              <div className="flex-grow text-sm leading-relaxed">
                ข้อมูลใน <strong className="text-sky-400">แนวตั้ง</strong> ที่ระบุหัวข้อ เช่น 'ราคาสินค้า' เรียกว่า <br/>
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'column')}
                  className={`mt-2 inline-flex items-center justify-center w-32 h-10 border-2 rounded-lg transition-all ${dropZones.column ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400 font-bold' : 'border-dashed border-slate-600 bg-slate-800'}`}
                >
                  {dropZones.column ? dropZones.column : ''}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold shrink-0">2</div>
              <div className="flex-grow text-sm leading-relaxed">
                ข้อมูลลูกค้า 1 คนแบบครบถ้วน ที่เรียงใน <strong className="text-rose-400">แนวนอน</strong> เรียกว่า <br/>
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'row')}
                  className={`mt-2 inline-flex items-center justify-center w-32 h-10 border-2 rounded-lg transition-all ${dropZones.row ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400 font-bold' : 'border-dashed border-slate-600 bg-slate-800'}`}
                >
                  {dropZones.row ? dropZones.row : ''}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold shrink-0">3</div>
              <div className="flex-grow text-sm leading-relaxed">
                คำศัพท์ที่โปรแกรมเมอร์มักใช้เรียกแทนคำว่า 'Column' คือคำว่า <br/>
                <div 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDrop(e, 'field')}
                  className={`mt-2 inline-flex items-center justify-center w-32 h-10 border-2 rounded-lg transition-all ${dropZones.field ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400 font-bold' : 'border-dashed border-slate-600 bg-slate-800'}`}
                >
                  {dropZones.field ? dropZones.field : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Draggables */}
          <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
            <h4 className="text-sm font-semibold text-slate-300 mb-4 text-center border-b border-slate-600 pb-2">คลังคำศัพท์ (ลากไปวาง)</h4>
            <div className="flex flex-wrap gap-3 justify-center min-h-[150px] content-start">
              {!Object.values(dropZones).includes('Column') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'Column')} className="cursor-grab active:cursor-grabbing bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded shadow-lg border border-sky-400 font-semibold text-sm">
                  <Columns size={16} className="inline mr-1" /> Column
                </div>
              )}
              {!Object.values(dropZones).includes('Record') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'Record')} className="cursor-grab active:cursor-grabbing bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded shadow-lg border border-rose-400 font-semibold text-sm">
                  <Rows size={16} className="inline mr-1" /> Record
                </div>
              )}
              {!Object.values(dropZones).includes('Field') && (
                <div draggable onDragStart={(e) => handleDragStart(e, 'Field')} className="cursor-grab active:cursor-grabbing bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded shadow-lg border border-emerald-400 font-semibold text-sm">
                  <Database size={16} className="inline mr-1" /> Field
                </div>
              )}
              <div draggable onDragStart={(e) => handleDragStart(e, 'Database')} className="cursor-grab active:cursor-grabbing bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded shadow-lg border border-slate-400 font-semibold text-sm opacity-50 hover:opacity-100">
                <Database size={16} className="inline mr-1" /> Database
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center h-8">
              <button onClick={resetQuiz} className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1">
                <RotateCcw size={14} /> รีเซ็ต
              </button>
              {isQuizComplete && (
                <div className="text-emerald-400 font-bold text-sm animate-pulse flex items-center gap-1">
                  <CheckCircle2 size={16} /> เก่งมาก! ตอบถูกทั้งหมด
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : 'bg-slate-800 border-rose-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="text-emerald-500" /> : <ShieldAlert className="text-rose-500" />}
          <div className="font-medium text-lg">{toast.msg}</div>
        </div>
      )}
    </div>
  );
}
