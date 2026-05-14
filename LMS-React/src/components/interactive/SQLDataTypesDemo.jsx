import React, { useState, useEffect, useRef } from 'react';
import { Database, Hash, Type, CalendarDays, FlaskConical, Check, X, Puzzle, RotateCcw, PartyPopper } from 'lucide-react';

export default function SQLDataTypesDemo() {
  // Validator State
  const [valInt, setValInt] = useState('');
  const [valDec, setValDec] = useState('');
  const [valVar, setValVar] = useState('');
  const [valDate, setValDate] = useState('');
  
  const validateInt = (val) => {
    if(!val) return null;
    return /^-?\d+$/.test(val);
  };
  
  const validateDec = (val) => {
    if(!val) return null;
    return /^-?\d{1,3}(\.\d{1,2})?$/.test(val) && !isNaN(parseFloat(val));
  };
  
  const validateDate = (val) => {
    if(!val) return null;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (dateRegex.test(val)) {
      const d = new Date(val);
      if(!isNaN(d.getTime())) return true;
    }
    return false;
  };

  const getStatusUI = (isValid, validMsg, invalidMsg) => {
    if (isValid === null) return <div className="text-xs mt-2 h-4"></div>;
    if (isValid) return <div className="text-xs mt-2 h-4 font-medium text-emerald-600 flex items-center gap-1"><Check size={12}/> {validMsg}</div>;
    return <div className="text-xs mt-2 h-4 font-medium text-rose-600 flex items-center gap-1 animate-in slide-in-from-left-1"><X size={12}/> {invalidMsg}</div>;
  };

  // Match Game State
  const [selectedData, setSelectedData] = useState(null);
  const [matches, setMatches] = useState([]);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  
  const matchData = [
    { id: 'd1', text: 'เบอร์โทรศัพท์มือถือ', sub: "เช่น '0812345678' (ยาว 10 ตัวเสมอ)", match: 't3' },
    { id: 'd2', text: 'ราคาสินค้า', sub: "เช่น 250.50 (มีทศนิยม)", match: 't1' },
    { id: 'd3', text: 'จำนวนสินค้าคงคลัง', sub: "เช่น 1500 (จำนวนนับ)", match: 't4' },
    { id: 'd4', text: 'ชื่อ-นามสกุลลูกค้า', sub: "ความยาวไม่แน่นอน", match: 't2' }
  ];

  const matchTypes = [
    { id: 't1', text: 'DECIMAL', color: 'text-blue-300' },
    { id: 't2', text: 'VARCHAR', color: 'text-orange-300' },
    { id: 't3', text: 'CHAR', color: 'text-orange-300' },
    { id: 't4', text: 'INT', color: 'text-blue-300' }
  ];

  const handleDataClick = (id) => {
    if (matches.some(m => m.d === id)) return; // Already matched
    if (selectedData === id) setSelectedData(null);
    else setSelectedData(id);
  };

  const handleTypeClick = (tId) => {
    if (matches.some(m => m.t === tId)) return; // Already matched
    if (!selectedData) return;

    const dataItem = matchData.find(d => d.id === selectedData);
    if (dataItem.match === tId) {
      // Correct
      setMatches([...matches, { d: selectedData, t: tId }]);
      setSelectedData(null);
    } else {
      // Wrong - we can just clear selection or flash error
      setSelectedData(null);
      // Optional: add shake effect
    }
  };

  const resetMatchGame = () => {
    setMatches([]);
    setSelectedData(null);
  };

  // Draw Lines
  useEffect(() => {
    const drawLines = () => {
      if (!canvasRef.current || !sectionRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const section = sectionRef.current;
      
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      matches.forEach(m => {
        const dEl = document.getElementById(`node-${m.d}`);
        const tEl = document.getElementById(`node-${m.t}`);
        if (!dEl || !tEl) return;
        
        const dRect = dEl.getBoundingClientRect();
        const tRect = tEl.getBoundingClientRect();
        const sRect = section.getBoundingClientRect();

        const startX = dRect.left - sRect.left + (dRect.width / 2);
        const startY = dRect.top - sRect.top + (dRect.height / 2);
        
        const endX = tRect.left - sRect.left + (tRect.width / 2);
        const endY = tRect.top - sRect.top + (tRect.height / 2);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(startX + 50, startY, endX - 50, endY, endX, endY);
        ctx.strokeStyle = '#10b981'; // emerald-500
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      });
    };

    drawLines();
    window.addEventListener('resize', drawLines);
    return () => window.removeEventListener('resize', drawLines);
  }, [matches]);

  return (
    <div className="space-y-12 my-8">
      
      {/* 2. ประเภทข้อมูลหลัก */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="bg-blue-100 px-4 py-3 border-b border-blue-200 flex items-center gap-2">
            <Hash className="text-blue-600" />
            <h3 className="font-bold text-blue-800 text-lg">ตัวเลข (Numeric)</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">INT</span>
              <p className="text-sm text-slate-600">เลขจำนวนเต็ม (ไม่มีทศนิยม) เหมาะสำหรับ รหัส, จำนวนนับ, อายุ</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> 100, -5, 2026</p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DECIMAL(M,D)</span>
              <p className="text-sm text-slate-600">เลขทศนิยมที่ต้องการความแม่นยำสูง เหมาะสำหรับ จำนวนเงิน, ราคาสินค้า <br/>(M=หลักทั้งหมด, D=ทศนิยม)</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> DECIMAL(8,2) -{">"} 123456.78</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
            <Type className="text-orange-600" />
            <h3 className="font-bold text-orange-800 text-lg">ตัวอักษร (String)</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">VARCHAR(N)</span>
              <p className="text-sm text-slate-600">ข้อความยาวไม่เกิน N ตัวอักษร (ปรับขนาดตามจริง) เหมาะสำหรับ ชื่อ, อีเมล</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> 'Somchai', 'admin@x.com'</p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">CHAR(N)</span>
              <p className="text-sm text-slate-600">ข้อความความยาว <strong>คงที่</strong> N ตัวอักษร เหมาะสำหรับ ข้อมูลที่ยาวเท่ากันเสมอ เช่น รหัส ปณ., เบอร์โทร</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> '10200', '0812345678'</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="bg-emerald-100 px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
            <CalendarDays className="text-emerald-600" />
            <h3 className="font-bold text-emerald-800 text-lg">วันที่และเวลา (Date/Time)</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DATE</span>
              <p className="text-sm text-slate-600">เก็บเฉพาะวันที่ รูปแบบ <code>YYYY-MM-DD</code> เหมาะสำหรับ วันเกิด, วันเริ่มงาน</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> '2026-12-31'</p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DATETIME</span>
              <p className="text-sm text-slate-600">เก็บทั้งวันที่และเวลา <code>YYYY-MM-DD HH:MM:SS</code></p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Check size={12} className="text-emerald-500"/> '2026-12-31 23:59:59'</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Data Validator */}
      <div className="bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <FlaskConical className="text-sky-500" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">เครื่องจำลองการตรวจสอบข้อมูล (Data Validator)</h2>
            <p className="text-slate-600 text-sm">ลองพิมพ์ข้อมูลลงในช่องเพื่อดูว่า ฐานข้อมูลจะยอมรับเข้าคอลัมน์ประเภทต่างๆ หรือไม่</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${validateInt(valInt) === true ? 'border-emerald-500 bg-emerald-50' : validateInt(valInt) === false ? 'border-rose-500 bg-rose-50' : 'border-transparent'}`}>
            <label className="block font-bold text-slate-700 mb-1">อายุ <span className="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">INT</span></label>
            <input type="text" value={valInt} onChange={e => setValInt(e.target.value)} placeholder="ใส่ตัวเลขจำนวนเต็ม..." className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
            {getStatusUI(validateInt(valInt), 'รูปแบบ INT ถูกต้อง', 'ต้องเป็นตัวเลขจำนวนเต็มเท่านั้น')}
          </div>

          <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${validateDec(valDec) === true ? 'border-emerald-500 bg-emerald-50' : validateDec(valDec) === false ? 'border-rose-500 bg-rose-50' : 'border-transparent'}`}>
            <label className="block font-bold text-slate-700 mb-1">ราคา <span className="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">DECIMAL(5,2)</span></label>
            <input type="text" value={valDec} onChange={e => setValDec(e.target.value)} placeholder="เช่น 199.50" className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
            {getStatusUI(validateDec(valDec), 'รูปแบบ DECIMAL ถูกต้อง', 'ตัวเลขหรือทศนิยมเกินขอบเขต (Max: 999.99)')}
          </div>

          <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${valVar.length > 0 && valVar.length <= 10 ? 'border-emerald-500 bg-emerald-50' : valVar.length > 10 ? 'border-rose-500 bg-rose-50' : 'border-transparent'}`}>
            <label className="block font-bold text-slate-700 mb-1">ชื่อ <span className="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">VARCHAR(10)</span></label>
            <input type="text" value={valVar} onChange={e => setValVar(e.target.value)} placeholder="พิมพ์ข้อความ..." className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
            <div className="flex justify-between items-center mt-1">
                <span className={`text-xs font-mono ${valVar.length > 10 ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>{valVar.length}/10</span>
            </div>
            {getStatusUI(valVar.length > 0 ? valVar.length <= 10 : null, 'ความยาวอยู่ในเกณฑ์', 'ข้อมูลยาวเกิน 10 ตัว จะถูกตัดทิ้ง (Truncated)')}
          </div>

          <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${validateDate(valDate) === true ? 'border-emerald-500 bg-emerald-50' : validateDate(valDate) === false ? 'border-rose-500 bg-rose-50' : 'border-transparent'}`}>
            <label className="block font-bold text-slate-700 mb-1">วันเกิด <span className="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">DATE</span></label>
            <input type="text" value={valDate} onChange={e => setValDate(e.target.value)} placeholder="YYYY-MM-DD" className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
            {getStatusUI(validateDate(valDate), 'รูปแบบ DATE ถูกต้อง', 'ต้องอยู่ในรูปแบบ YYYY-MM-DD')}
          </div>
        </div>
      </div>

      {/* 4. Match Game */}
      <div ref={sectionRef} className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden relative">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>

        <div className="p-6 md:p-8 text-white relative z-20">
          <div className="flex justify-between items-end mb-6 border-b border-slate-700 pb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Puzzle className="text-orange-400" size={32}/>
                <h2 className="text-2xl font-bold">เกมจับคู่: เลือก Data Type ให้เหมาะสม</h2>
              </div>
              <p className="text-slate-300 text-sm">คลิกเลือก "ตัวอย่างข้อมูล" ทางซ้าย แล้วไปคลิกเลือก "ประเภทข้อมูล" ทางขวาที่คิดว่าถูกต้องที่สุด</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">คะแนน</div>
              <div className="text-3xl font-bold text-emerald-400 font-mono">{matches.length}/4</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto py-4">
            {/* Left: Data */}
            <div className="space-y-4">
              <div className="text-center font-bold text-cyan-300 mb-4 border-b border-cyan-800 pb-2">ข้อมูลที่ต้องการเก็บ</div>
              {matchData.map(d => {
                const isMatched = matches.some(m => m.d === d.id);
                const isSelected = selectedData === d.id;
                return (
                  <div 
                    key={d.id}
                    onClick={() => handleDataClick(d.id)}
                    className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all cursor-pointer select-none ${
                      isMatched ? 'opacity-50 cursor-not-allowed bg-emerald-900/30 border-emerald-500 scale-95' :
                      isSelected ? 'bg-slate-600 border-orange-400 scale-105 z-10 shadow-lg' :
                      'bg-slate-700 border-slate-600 shadow-md hover:bg-slate-600'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{d.text}</div>
                      <div className="text-xs text-slate-400 font-mono mt-1">{d.sub}</div>
                    </div>
                    <div id={`node-${d.id}`} className={`w-4 h-4 rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                  </div>
                );
              })}
            </div>

            {/* Right: Types */}
            <div className="space-y-4">
              <div className="text-center font-bold text-orange-300 mb-4 border-b border-orange-800 pb-2">ประเภทข้อมูล (Data Type)</div>
              {matchTypes.map(t => {
                const isMatched = matches.some(m => m.t === t.id);
                return (
                  <div 
                    key={t.id}
                    onClick={() => handleTypeClick(t.id)}
                    className={`p-4 rounded-xl border-2 flex items-center justify-start gap-4 transition-all cursor-pointer select-none ${
                      isMatched ? 'opacity-50 cursor-not-allowed bg-emerald-900/30 border-emerald-500 scale-95' :
                      'bg-slate-900 border-slate-700 shadow-md hover:bg-slate-800'
                    }`}
                  >
                    <div id={`node-${t.id}`} className={`w-4 h-4 rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                    <div className={`font-mono text-lg font-bold ${t.color}`}>{t.text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {matches.length === 4 && (
            <div className="mt-8 text-center animate-in zoom-in">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500 px-6 py-3 rounded-xl font-bold">
                <PartyPopper /> ยอดเยี่ยม! คุณเข้าใจการเลือกประเภทข้อมูลเบื้องต้นแล้ว
              </div>
              <div className="mt-4">
                <button onClick={resetMatchGame} className="text-sm text-slate-400 hover:text-white underline flex items-center justify-center gap-1 mx-auto">
                  <RotateCcw size={14}/> เล่นใหม่อีกครั้ง
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
