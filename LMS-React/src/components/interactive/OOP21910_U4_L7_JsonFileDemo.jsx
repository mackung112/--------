import React, { useState } from 'react';
import { FileJson, ChevronRight, ChevronDown, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function OOP21910_U4_L7_JsonFileDemo() {
  const [data, setData] = useState({ name: 'สมชาย', age: 20, gpa: 3.5, courses: ['OOP', 'Web Dev'] });
  const [jsonStr, setJsonStr] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const handleDump = () => {
    const json = JSON.stringify(data, null, 2);
    setJsonStr(json);
    setLoaded(false);
    showToast('json.dump() สำเร็จ — ข้อมูลถูกบันทึกเป็น JSON แล้ว', 'success');
  };

  const handleLoad = () => {
    if (!jsonStr) { showToast('ยังไม่มีข้อมูล JSON ให้โหลด กด dump ก่อน', 'warning'); return; }
    setLoaded(true);
    showToast('json.load() สำเร็จ — อ่านข้อมูลจาก JSON กลับมาเป็น dict', 'success');
  };

  const renderJsonTree = (obj, depth = 0) => {
    if (Array.isArray(obj)) {
      return (<div style={{ paddingLeft: depth * 16 }}><span className="text-slate-500">[</span>{obj.map((item, i) => (<div key={i} style={{ paddingLeft: 16 }}><span className="text-green-400">"{item}"</span>{i < obj.length - 1 && <span className="text-slate-500">,</span>}</div>))}<span className="text-slate-500">]</span></div>);
    }
    return Object.entries(obj).map(([key, val]) => (
      <div key={key} style={{ paddingLeft: depth * 16 }}>
        <span className="text-sky-300">"{key}"</span><span className="text-slate-500">: </span>
        {typeof val === 'string' ? <span className="text-green-400">"{val}"</span> :
         typeof val === 'number' ? <span className="text-purple-400">{val}</span> :
         Array.isArray(val) ? renderJsonTree(val, depth + 1) :
         <span className="text-yellow-400">{String(val)}</span>}
        <span className="text-slate-500">,</span>
      </div>
    ));
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white p-5 flex items-center gap-3">
          <FileJson size={24} />
          <h3 className="font-bold text-lg">จำลอง json.dump() → json.load()</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Python dict */}
          <div className="p-5 bg-slate-50 border-r border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm mb-3">📦 Python dict</h4>
            <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs shadow-inner">
              <div className="text-yellow-300">student = {'{'}</div>
              {renderJsonTree(data, 1)}
              <div className="text-yellow-300">{'}'}</div>
            </div>
            <button onClick={handleDump} className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              json.dump() →
            </button>
          </div>

          {/* JSON File */}
          <div className="p-5 border-r border-slate-200">
            <h4 className="font-bold text-slate-700 text-sm mb-3">📄 student.json</h4>
            <div className={`bg-slate-900 p-4 rounded-xl font-mono text-xs shadow-inner min-h-[150px] transition-all ${jsonStr ? '' : 'flex items-center justify-center'}`}>
              {jsonStr ? <pre className="text-slate-300 whitespace-pre-wrap">{jsonStr}</pre> : <span className="text-slate-600">ยังไม่มีไฟล์ JSON<br />กด dump เพื่อสร้าง</span>}
            </div>
            <button onClick={handleLoad} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              ← json.load()
            </button>
          </div>

          {/* Loaded Result */}
          <div className="p-5">
            <h4 className="font-bold text-slate-700 text-sm mb-3">🔄 ผลจาก load()</h4>
            <div className={`bg-slate-900 p-4 rounded-xl font-mono text-xs shadow-inner min-h-[150px] transition-all ${loaded ? '' : 'flex items-center justify-center'}`}>
              {loaded ? (<>
                <div className="text-slate-400 mb-2"># อ่านกลับมาเป็น dict</div>
                <div className="text-yellow-300">data = {'{'}</div>
                {renderJsonTree(data, 1)}
                <div className="text-yellow-300">{'}'}</div>
                <div className="mt-2 text-emerald-400">type(data) → {'<'}class 'dict'{'>'}</div>
              </>) : <span className="text-slate-600">กด load เพื่ออ่านข้อมูล</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200"><code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">json.dump()</code> ใช้ทำอะไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'write', label: 'บันทึก Python dict ลงไฟล์ JSON', correct: true },
            { val: 'read', label: 'อ่านไฟล์ JSON กลับมาเป็น dict' },
            { val: 'delete', label: 'ลบไฟล์ JSON' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'write' ? 'ถูกต้อง! dump = เขียน, load = อ่าน' : 'ไม่ถูกต้อง', quizAnswer === 'write' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
