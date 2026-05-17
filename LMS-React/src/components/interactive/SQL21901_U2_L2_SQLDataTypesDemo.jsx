import React, { useState, useEffect, useRef } from 'react';
import { Database, Hash, Type, CalendarDays, FlaskConical, Check, X, Puzzle, RotateCcw, TerminalSquare } from 'lucide-react';

export default function SQL21901_U2_L2_SQLDataTypesDemo() {
  // Validator State
  const [valInt, setValInt] = useState('');
  const [valDec, setValDec] = useState('');
  const [valVar, setValVar] = useState('');
  const [valDate, setValDate] = useState('');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Data Type Engine & Validator Initialized.' },
    { type: 'system', text: 'Ready to process incoming data streams.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const logValidation = (field, type, val, isValid, errorMsg = '') => {
    if (val === '') return;
    if (isValid) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ CAST('${val}' AS ${type})` },
        { type: 'success', text: `> Success: Valid ${type} format.` }
      ]);
    } else {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ CAST('${val}' AS ${type})` },
        { type: 'error', text: `> Error: ${errorMsg}` }
      ]);
    }
  };

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
    return <div className="text-xs mt-2 h-4 font-medium text-rose-600 flex items-center gap-1"><X size={12}/> {invalidMsg}</div>;
  };

  // Match Game State
  const [selectedData, setSelectedData] = useState(null);
  const [matches, setMatches] = useState([]);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  
  const matchData = [
    { id: 'd1', text: 'เบอร์โทร', sub: "(ยาว 10 ตัวเสมอ)", match: 't3' },
    { id: 'd2', text: 'ราคา', sub: "(มีทศนิยม)", match: 't1' },
    { id: 'd3', text: 'จำนวนของ', sub: "(จำนวนนับ)", match: 't4' },
    { id: 'd4', text: 'ชื่อ-สกุล', sub: "ความยาวไม่แน่นอน", match: 't2' }
  ];

  const matchTypes = [
    { id: 't1', text: 'DECIMAL', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 't2', text: 'VARCHAR', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 't3', text: 'CHAR', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 't4', text: 'INT', color: 'text-blue-500', bg: 'bg-blue-50' }
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
    const typeItem = matchTypes.find(t => t.id === tId);

    if (dataItem.match === tId) {
      setMatches([...matches, { d: selectedData, t: tId }]);
      setSelectedData(null);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ MATCH '${dataItem.text}' WITH ${typeItem.text}` },
        { type: 'success', text: `> Correct Data Type matched.` }
      ]);
    } else {
      setSelectedData(null);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ MATCH '${dataItem.text}' WITH ${typeItem.text}` },
        { type: 'error', text: `> Incorrect Match. Try again.` }
      ]);
    }
  };

  const resetMatchGame = () => {
    setMatches([]);
    setSelectedData(null);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `> Match game reset.` }
    ]);
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
        ctx.bezierCurveTo(startX + 30, startY, endX - 30, endY, endX, endY);
        ctx.strokeStyle = '#10b981'; // emerald-500
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      });
    };

    drawLines();
    window.addEventListener('resize', drawLines);
    return () => window.removeEventListener('resize', drawLines);
  }, [matches]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Database size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">SQL Data Types (ชนิดข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้ชนิดข้อมูลหลักๆ ใน SQL และทดสอบความเข้าใจผ่าน Validator และ Match Game
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        {/* Top: Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200 bg-white">
          <div className="p-5 flex gap-4 items-start">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><Hash size={18}/></div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">ตัวเลข (Numeric)</h4>
              <p className="text-xs text-slate-700 mb-2">INT (จำนวนเต็ม) <br/>DECIMAL (ทศนิยม)</p>
            </div>
          </div>
          <div className="p-5 flex gap-4 items-start">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0"><Type size={18}/></div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">ตัวอักษร (String)</h4>
              <p className="text-xs text-slate-700 mb-2">VARCHAR (ยาวตามจริง) <br/>CHAR (ความยาวคงที่)</p>
            </div>
          </div>
          <div className="p-5 flex gap-4 items-start">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0"><CalendarDays size={18}/></div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">วันที่ (Date/Time)</h4>
              <p className="text-xs text-slate-700 mb-2">DATE (YYYY-MM-DD) <br/>DATETIME (วันที่+เวลา)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 bg-slate-50">
          
          {/* Left: Data Validator */}
          <div className="w-full lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex items-center gap-2">
              <FlaskConical size={16} className="text-sky-500"/> Data Validator
            </h4>
            
            <div className="space-y-4 flex-1">
              <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${validateInt(valInt) === true ? 'border-emerald-500 bg-emerald-50' : validateInt(valInt) === false ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`}>
                <label className="flex justify-between font-bold text-slate-700 mb-2 text-sm">
                  อายุ <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">INT</span>
                </label>
                <input type="text" value={valInt} 
                  onChange={e => { setValInt(e.target.value); logValidation('อายุ', 'INT', e.target.value, validateInt(e.target.value), 'Not an integer'); }} 
                  placeholder="ใส่ตัวเลขจำนวนเต็ม..." className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
                {getStatusUI(validateInt(valInt), 'รูปแบบ INT ถูกต้อง', 'ต้องเป็นตัวเลขจำนวนเต็มเท่านั้น')}
              </div>

              <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${validateDec(valDec) === true ? 'border-emerald-500 bg-emerald-50' : validateDec(valDec) === false ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`}>
                <label className="flex justify-between font-bold text-slate-700 mb-2 text-sm">
                  ราคา <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">DECIMAL(5,2)</span>
                </label>
                <input type="text" value={valDec} 
                  onChange={e => { setValDec(e.target.value); logValidation('ราคา', 'DECIMAL', e.target.value, validateDec(e.target.value), 'Invalid decimal or out of bounds'); }} 
                  placeholder="เช่น 199.50" className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
                {getStatusUI(validateDec(valDec), 'รูปแบบ DECIMAL ถูกต้อง', 'ตัวเลขหรือทศนิยมเกินขอบเขต (Max: 999.99)')}
              </div>

              <div className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-colors ${valVar.length > 0 && valVar.length <= 10 ? 'border-emerald-500 bg-emerald-50' : valVar.length > 10 ? 'border-rose-500 bg-rose-50' : 'border-slate-200'}`}>
                <label className="flex justify-between font-bold text-slate-700 mb-2 text-sm">
                  ชื่อ <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">VARCHAR(10)</span>
                </label>
                <input type="text" value={valVar} 
                  onChange={e => { setValVar(e.target.value); logValidation('ชื่อ', 'VARCHAR(10)', e.target.value, e.target.value.length <= 10, 'Data truncated (too long)'); }} 
                  placeholder="พิมพ์ข้อความ..." className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" />
                <div className="flex justify-between items-center mt-1">
                    <span className={`text-[10px] font-mono ${valVar.length > 10 ? 'text-rose-500 font-bold' : 'text-slate-500'}`}>{valVar.length}/10 chars</span>
                </div>
                {getStatusUI(valVar.length > 0 ? valVar.length <= 10 : null, 'ความยาวอยู่ในเกณฑ์', 'ข้อมูลยาวเกิน 10 ตัว จะถูกตัดทิ้ง')}
              </div>
            </div>
          </div>

          {/* Right: Match Game */}
          <div className="w-full lg:w-1/2 bg-white flex flex-col relative" ref={sectionRef}>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>
            
            <div className="p-6 relative z-20 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 flex items-center gap-2">
                  <Puzzle size={16} className="text-orange-500"/> Match Game
                </h4>
                <div className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  Score: <span className="text-emerald-600 text-sm">{matches.length}/4</span>
                </div>
              </div>

              <div className="flex justify-between items-stretch flex-1 px-4 py-2">
                {/* Left: Data */}
                <div className="space-y-4 flex flex-col justify-around">
                  {matchData.map(d => {
                    const isMatched = matches.some(m => m.d === d.id);
                    const isSelected = selectedData === d.id;
                    return (
                      <div 
                        key={d.id}
                        onClick={() => handleDataClick(d.id)}
                        className={`w-32 p-3 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer select-none text-center relative ${
                          isMatched ? 'opacity-50 border-emerald-300 bg-emerald-50 scale-95' :
                          isSelected ? 'bg-slate-800 text-white border-slate-800 scale-105 shadow-md z-30' :
                          'bg-white border-slate-300 shadow-sm hover:border-slate-400'
                        }`}
                      >
                        <div className="font-bold text-sm">{d.text}</div>
                        <div className="text-[10px] opacity-70 mt-1 leading-tight">{d.sub}</div>
                        <div id={`node-${d.id}`} className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Types */}
                <div className="space-y-4 flex flex-col justify-around">
                  {matchTypes.map(t => {
                    const isMatched = matches.some(m => m.t === t.id);
                    return (
                      <div 
                        key={t.id}
                        onClick={() => handleTypeClick(t.id)}
                        className={`w-28 p-3 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer select-none text-center relative ${
                          isMatched ? 'opacity-50 border-emerald-300 bg-emerald-50 scale-95' :
                          `bg-white border-slate-300 shadow-sm hover:${t.bg}`
                        }`}
                      >
                        <div id={`node-${t.id}`} className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className={`font-mono text-sm font-bold ${isMatched ? 'text-emerald-700' : t.color}`}>{t.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button onClick={resetMatchGame} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 font-semibold border border-slate-200 shadow-sm">
                  <RotateCcw size={14}/> Reset Game
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800 shadow-inner">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <TerminalSquare size={14} className="text-slate-600" />
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Type Caster</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed flex gap-2">
                {line.type === 'command' && <><span className="text-emerald-400 font-bold shrink-0">&gt;&gt;&gt;</span> <div className="text-slate-600">{line.text.substring(2)}</div></>}
                {line.type === 'output'  && <><span className="text-cyan-400 font-bold shrink-0">[Log]</span> <div className="text-cyan-300">{line.text.substring(2)}</div></>}
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
