import { useState } from 'react';

export default function PY21910_U4_L8_IdentityOps() {
  const [mode, setMode] = useState(0);
  const demos = [
    { title: 'is กับ Integer เล็ก', code: 'a = 5\nb = 5\nprint(a is b)', result: 'True', note: 'Python cache จำนวนเต็ม -5 ถึง 256 จึงชี้ที่เดียวกัน' },
    { title: 'is กับ Integer ใหญ่', code: 'a = 1000\nb = 1000\nprint(a is b)', result: 'False (อาจ)', note: 'จำนวนเกิน 256 อาจสร้าง object ใหม่' },
    { title: 'is กับ List', code: 'a = [1,2]\nb = [1,2]\nprint(a is b)\nprint(a == b)', result: 'is → False\n== → True', note: 'is ตรวจว่าเป็น object เดียวกัน, == ตรวจว่าค่าเท่ากัน' },
    { title: 'is not', code: 'a = [1]\nb = [1]\nprint(a is not b)', result: 'True', note: 'a กับ b เป็นคนละ object ถึงค่าเท่ากัน' },
  ];
  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🔍 ตัวดำเนินการระบุเอกลักษณ์ (is / is not)</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {demos.map((d, i) => (
          <button key={i} onClick={() => setMode(i)} className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === i ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>{d.title}</button>
        ))}
      </div>
      
      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 text-center max-w-md mx-auto">💡 {demos[mode].note}</div>
    
      {/* Bottom Full-Width Console Output (VS Code Style) */}
      <div className="h-48 mt-6 bg-[#1e1e1e] p-4 font-mono text-[13px] overflow-y-auto flex flex-col relative w-full rounded-2xl border border-slate-800 shadow-inner">
        <pre className="text-green-400 whitespace-pre-wrap">{demos[mode].code}</pre>
        <div className="border-t border-slate-700 mt-3 pt-3 text-yellow-300 whitespace-pre-wrap">{demos[mode].result}</div>
      </div>
    </div>
  );
}
