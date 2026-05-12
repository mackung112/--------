import { useState } from 'react';

const blocks = [
  { id: 0, text: 'password = "123"', correctIndent: 0, color: 'text-purple-400' },
  { id: 1, text: 'if password == "123":', correctIndent: 0, color: 'text-pink-400' },
  { id: 2, text: 'print("รหัสผ่านถูกต้อง")', correctIndent: 1, color: 'text-green-400' },
  { id: 3, text: 'print("ยินดีต้อนรับ!")', correctIndent: 1, color: 'text-green-400' },
  { id: 4, text: 'else:', correctIndent: 0, color: 'text-pink-400' },
  { id: 5, text: 'print("รหัสผ่านผิด")', correctIndent: 1, color: 'text-red-400' },
  { id: 6, text: 'print("จบการทำงาน")', correctIndent: 0, color: 'text-blue-400' },
];

export default function IndentationDemo() {
  // state เก็บระดับ indentation (0=ชิดซ้าย, 1=เคาะ 1 tab, 2=เคาะ 2 tab)
  const [indents, setIndents] = useState([0, 0, 0, 0, 0, 0, 0]);
  
  const handleIndent = (idx, amount) => {
    const newIndents = [...indents];
    newIndents[idx] = Math.max(0, Math.min(2, newIndents[idx] + amount));
    setIndents(newIndents);
  };

  const isCorrect = () => {
    return indents.every((val, idx) => val === blocks[idx].correctIndent);
  };

  const checkError = () => {
    if (indents[2] === 0 || indents[3] === 0 || indents[5] === 0) {
      return "IndentationError: expected an indented block (ลืมย่อหน้าหลัง if/else)";
    }
    if (indents[2] !== indents[3]) {
      return "IndentationError: unindent does not match any outer indentation level (ย่อหน้าไม่ตรงกัน)";
    }
    if (indents[4] !== indents[1]) {
      return "SyntaxError: invalid syntax (else ย่อหน้าไม่ตรงกับ if)";
    }
    return null;
  };

  const errorMsg = checkError();
  const allCorrect = isCorrect();

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">📏 ความสำคัญของการจัดย่อหน้า (Indentation)</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">ในภาษา Python การย่อหน้า (Tab หรือ 4 Spaces) คือการกำหนดขอบเขตของคำสั่ง (Block) <br/>ลองกดลูกศร ซ้าย-ขวา เพื่อจัดย่อหน้าให้ถูกต้อง!</p>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        
        {/* Editor Area */}
        <div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-inner font-mono text-sm border border-slate-700">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-700">
            <span className="text-slate-400 font-bold text-xs">login.py</span>
            {allCorrect ? (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">✨ จัดย่อหน้าถูกต้อง!</span>
            ) : (
              <button 
                onClick={() => setIndents(blocks.map(b => b.correctIndent))}
                className="text-indigo-400 hover:text-indigo-300 text-xs underline"
              >
                ดูเฉลย
              </button>
            )}
          </div>

          <div className="space-y-1 relative">
            {/* เส้น Guide Line */}
            <div className="absolute top-0 bottom-0 left-[24px] border-l border-slate-700/50"></div>
            <div className="absolute top-0 bottom-0 left-[56px] border-l border-slate-700/50"></div>

            {blocks.map((block, idx) => (
              <div key={idx} className="flex items-center group">
                <span className="w-6 text-slate-600 text-xs select-none">{idx + 1}</span>
                <div className="flex gap-1 mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleIndent(idx, -1)}
                    disabled={indents[idx] === 0}
                    className="w-6 h-6 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                  >
                    ◀
                  </button>
                  <button 
                    onClick={() => handleIndent(idx, 1)}
                    disabled={indents[idx] === 2}
                    className="w-6 h-6 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                  >
                    ▶
                  </button>
                </div>
                
                <div 
                  className={`py-1 px-2 rounded transition-all duration-300 ${block.color} ${
                    indents[idx] !== block.correctIndent && !allCorrect ? 'bg-red-500/10 border border-red-500/30' : 'hover:bg-slate-800 border border-transparent'
                  }`}
                  style={{ marginLeft: `${indents[idx] * 32}px` }}
                >
                  {block.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Console / Status Area */}
        <div className="flex flex-col gap-4">
          <div className={`flex-1 rounded-2xl p-5 border ${allCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="font-bold text-sm mb-2 text-slate-800">🖥️ สถานะโปรแกรม</p>
            {allCorrect ? (
              <div>
                <p className="text-green-600 text-sm font-bold mb-2">✅ พร้อมทำงาน (No Syntax Error)</p>
                <div className="bg-black text-green-400 p-3 rounded-xl font-mono text-xs">
                  &gt; python login.py<br/>
                  รหัสผ่านถูกต้อง<br/>
                  ยินดีต้อนรับ!<br/>
                  จบการทำงาน
                </div>
              </div>
            ) : (
              <div>
                <p className="text-red-600 text-sm font-bold mb-2">❌ โปรแกรมพัง (Crash)</p>
                <div className="bg-black text-red-400 p-3 rounded-xl font-mono text-xs overflow-hidden text-ellipsis">
                  {errorMsg}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-800">
            <strong>กฎการจัดย่อหน้า:</strong>
            <ul className="list-disc ml-4 mt-2 space-y-1 text-xs">
              <li>ใช้ Tab หรือ Space 4 เคาะ</li>
              <li>คำสั่งใน Block เดียวกันต้องตรงกันเป๊ะ</li>
              <li>ถ้าจบ Block ให้ถอยกลับมาเท่าเดิม</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
