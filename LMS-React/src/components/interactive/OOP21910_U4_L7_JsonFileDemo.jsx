import React, { useState, useEffect, useRef } from 'react';
import { FileJson, Play, Download, Upload, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L7_JsonFileDemo() {
  const [data, setData] = useState({ name: 'สมชาย', age: 20, gpa: 3.5, courses: ['OOP', 'Web Dev'] });
  const [jsonStr, setJsonStr] = useState('');
  const [loadedData, setLoadedData] = useState(null);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'JSON Module Demo initialized.' },
    { type: 'system', text: 'Ready to write (dump) and read (load) JSON.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleDump = () => {
    const json = JSON.stringify(data, null, 2);
    setJsonStr(json);
    setLoadedData(null); // reset load
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ import json` },
      { type: 'command', text: `$ with open("student.json", "w") as file:` },
      { type: 'command', text: `$     json.dump(student_dict, file, indent=2)` },
      { type: 'output', text: `> Successfully wrote 4 keys to student.json` }
    ]);
  };

  const handleLoad = () => {
    if (!jsonStr) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'error', text: `FileNotFoundError: [Errno 2] No such file or directory: 'student.json'` }
      ]);
      return;
    }
    
    try {
      const parsed = JSON.parse(jsonStr);
      setLoadedData(parsed);
      
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ with open("student.json", "r") as file:` },
        { type: 'command', text: `$     loaded_data = json.load(file)` },
        { type: 'system', text: `> type(loaded_data) -> <class 'dict'>` },
        { type: 'output', text: `> Successfully loaded data from student.json` }
      ]);
    } catch (e) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'error', text: `JSONDecodeError: Expecting value: line 1 column 1 (char 0)` }
      ]);
    }
  };

  const clear = () => {
    setJsonStr('');
    setLoadedData(null);
    setConsoleHistory([
      { type: 'system', text: 'Files and memory cleared. Reset to initial state.' }
    ]);
  };

  const renderJsonTree = (obj, depth = 0) => {
    if (Array.isArray(obj)) {
      return (
        <div style={{ paddingLeft: depth * 16 }}>
          <span className="text-slate-700">[</span>
          {obj.map((item, i) => (
            <div key={i} style={{ paddingLeft: 16 }}>
              <span className="text-emerald-400">"{item}"</span>
              {i < obj.length - 1 && <span className="text-slate-700">,</span>}
            </div>
          ))}
          <span className="text-slate-700">]</span>
        </div>
      );
    }
    return Object.entries(obj).map(([key, val], i, arr) => (
      <div key={key} style={{ paddingLeft: depth * 16 }}>
        <span className="text-sky-300">"{key}"</span><span className="text-slate-700">: </span>
        {typeof val === 'string' ? <span className="text-emerald-400">"{val}"</span> :
         typeof val === 'number' ? <span className="text-orange-400">{val}</span> :
         Array.isArray(val) ? renderJsonTree(val, depth + 1) :
         <span className="text-yellow-400">{String(val)}</span>}
        {i < arr.length - 1 && <span className="text-slate-700">,</span>}
      </div>
    ));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <FileJson size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การอ่านและเขียนไฟล์ JSON (json.dump & load)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการบันทึก Dictionary เป็นไฟล์ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">.json</code> ด้วย <code>dump()</code> และการอ่านไฟล์กลับมาเป็น Dictionary ด้วย <code>load()</code>
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Memory (Dict) */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">Memory: Python Dictionary</h4>
            
            <div className="bg-[#1e1e1e] p-5 rounded-2xl shadow-inner border border-slate-700 font-mono text-[13px] leading-loose flex-1 mb-4 relative">
              <div className="absolute top-2 right-3 text-[10px] text-slate-700 uppercase tracking-widest font-bold border border-slate-700 px-2 py-0.5 rounded">dict</div>
              <div className="text-yellow-300">student_dict = {'{'}</div>
              {renderJsonTree(data, 1)}
              <div className="text-yellow-300">{'}'}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleDump} className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm">
                <Upload size={16} /> json.dump()
              </button>
              <button onClick={handleLoad} className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm">
                <Download size={16} /> json.load()
              </button>
            </div>
          </div>

          {/* Right: Storage (File) & Result */}
          <div className="w-full lg:w-[450px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4 flex justify-between items-center">
              <span>Storage: student.json</span>
              <button onClick={clear} className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-600 font-bold normal-case">
                <RotateCcw size={12} /> เคลียร์ไฟล์
              </button>
            </h4>
            
            <div className={`flex-1 rounded-2xl border-2 transition-all p-4 font-mono text-[13px] flex flex-col ${jsonStr ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-dashed border-slate-300 items-center justify-center'}`}>
              {jsonStr ? (
                <pre className="text-amber-900 whitespace-pre-wrap leading-relaxed">{jsonStr}</pre>
              ) : (
                <div className="text-center text-slate-600">
                  <FileJson size={48} className="mx-auto mb-3 opacity-20" />
                  <p>ยังไม่มีไฟล์ JSON<br/>คลิก <strong>json.dump()</strong> เพื่อสร้างไฟล์</p>
                </div>
              )}
            </div>

            {/* Load Result Info Box */}
            <div className={`mt-4 rounded-xl p-4 transition-all border ${loadedData ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">ผลลัพธ์จากการ Load กลับ</div>
              {loadedData ? (
                <div className="font-mono text-xs text-emerald-800 bg-emerald-100/50 p-2 rounded">
                  ✅ <span className="font-bold">loaded_data</span> พร้อมใช้งาน<br/>
                  ชนิดข้อมูลคือ <strong>dict</strong> สามารถอ้างอิงคีย์ได้เลย เช่น <code>loaded_data['name']</code>
                </div>
              ) : (
                <div className="text-xs text-slate-600">รอการโหลดข้อมูล...</div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Python Interactive Console</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-emerald-400 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
