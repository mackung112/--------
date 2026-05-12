import { useState } from 'react';
import { AlertTriangle, Terminal, Code, Bug, ShieldCheck, Play } from 'lucide-react';

export default function TryExceptDemo() {
  const [useTryExcept, setUseTryExcept] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: 'Terminal started...' },
    { type: 'info', text: 'กรอกตัวเลขเพื่อคำนวณอายุ' }
  ]);

  const runCode = () => {
    // Add command to terminal
    setTerminalOutput(prev => [...prev, { type: 'input', text: `> ป้อนปีเกิด: ${inputValue}` }]);

    setTimeout(() => {
      if (!useTryExcept) {
        // Without error handling
        if (isNaN(inputValue) || inputValue.trim() === '') {
          setTerminalOutput(prev => [...prev, 
            { type: 'error', text: 'Traceback (most recent call last):' },
            { type: 'error', text: '  File "main.py", line 2, in <module>' },
            { type: 'error', text: `    birth_year = int("${inputValue}")` },
            { type: 'error', text: 'ValueError: invalid literal for int() with base 10' },
            { type: 'fatal', text: '❌ โปรแกรมหยุดทำงานกะทันหัน (Crash)!' }
          ]);
        } else {
          const age = 2024 - parseInt(inputValue);
          setTerminalOutput(prev => [...prev, 
            { type: 'success', text: `คุณอายุ ${age} ปี` },
            { type: 'info', text: '✅ โปรแกรมทำงานเสร็จสมบูรณ์' }
          ]);
        }
      } else {
        // With try-except
        try {
          if (isNaN(inputValue) || inputValue.trim() === '') {
            throw new Error('ValueError');
          }
          const age = 2024 - parseInt(inputValue);
          setTerminalOutput(prev => [...prev, 
            { type: 'success', text: `คุณอายุ ${age} ปี` },
            { type: 'info', text: '✅ โปรแกรมทำงานเสร็จสมบูรณ์' }
          ]);
        } catch (error) {
          setTerminalOutput(prev => [...prev, 
            { type: 'warning', text: '⚠️ ข้อผิดพลาด: กรุณากรอกเฉพาะตัวเลขเท่านั้น!' },
            { type: 'info', text: '✅ โปรแกรมทำงานต่อไปได้ตามปกติ ไม่หยุดทำงาน' }
          ]);
        }
      }
    }, 400);
  };

  const clearTerminal = () => {
    setTerminalOutput([
      { type: 'info', text: 'Terminal cleared.' },
      { type: 'info', text: 'กรอกตัวเลขเพื่อคำนวณอายุ' }
    ]);
    setInputValue('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Try-Except Simulator</h2>
          <p className="text-red-100 mt-1">จำลองโปรแกรมพัง (Crash) และการป้องกันด้วยการดักจับ Error</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Left: Code & Controls */}
        <div className="p-6 md:p-8 bg-slate-50 border-r border-slate-200 flex flex-col">
          
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setUseTryExcept(false)}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${!useTryExcept ? 'bg-red-100 text-red-700 border-2 border-red-300 shadow-sm' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
            >
              <Bug className="w-5 h-5" /> ไม่ดักจับ Error
            </button>
            <button
              onClick={() => setUseTryExcept(true)}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${useTryExcept ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 shadow-sm' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
            >
              <ShieldCheck className="w-5 h-5" /> ใช้ Try-Except
            </button>
          </div>

          <div className="flex-1 bg-slate-900 rounded-xl p-5 mb-6 shadow-inner font-mono text-sm leading-relaxed">
            <div className="flex items-center gap-2 text-slate-400 mb-3 pb-2 border-b border-slate-700">
              <Code className="w-4 h-4" /> <span>main.py</span>
            </div>
            
            <div className="text-slate-300">
              <span className="text-blue-400">print</span>(<span className="text-green-300">"กรอกตัวเลขเพื่อคำนวณอายุ"</span>)
            </div>
            <div className="text-slate-300 mt-2">
              text_input = <span className="text-blue-400">input</span>(<span className="text-green-300">"ป้อนปีเกิด: "</span>)
            </div>
            
            {!useTryExcept ? (
              <div className="mt-4 border-l-2 border-red-500 pl-3">
                <div className="text-slate-300">
                  <span className="text-slate-500"># โค้ดที่อาจทำให้โปรแกรมพังได้</span>
                </div>
                <div className="text-slate-300">
                  birth_year = <span className="text-purple-400">int</span>(text_input)
                </div>
                <div className="text-slate-300 mt-2">
                  age = <span className="text-orange-400">2024</span> - birth_year
                </div>
                <div className="text-slate-300">
                  <span className="text-blue-400">print</span>(<span className="text-green-300">f"คุณอายุ {age} ปี"</span>)
                </div>
              </div>
            ) : (
              <div className="mt-4 border-l-2 border-emerald-500 pl-3">
                <div className="text-purple-400 font-bold">try:</div>
                <div className="ml-4 text-slate-300">
                  birth_year = <span className="text-purple-400">int</span>(text_input)
                </div>
                <div className="ml-4 text-slate-300">
                  age = <span className="text-orange-400">2024</span> - birth_year
                </div>
                <div className="ml-4 text-slate-300">
                  <span className="text-blue-400">print</span>(<span className="text-green-300">f"คุณอายุ {age} ปี"</span>)
                </div>
                <div className="text-purple-400 font-bold mt-2">except <span className="text-red-400">ValueError</span>:</div>
                <div className="ml-4 text-slate-300">
                  <span className="text-blue-400">print</span>(<span className="text-green-300">"ข้อผิดพลาด: กรุณากรอกเฉพาะตัวเลขเท่านั้น!"</span>)
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runCode()}
              placeholder="ลองพิมพ์ตัวอักษรแทนตัวเลขดูสิ..." 
              className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button 
              onClick={runCode}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <Play className="w-5 h-5" /> รัน
            </button>
          </div>
        </div>

        {/* Right: Terminal Output */}
        <div className="bg-black p-6 flex flex-col font-mono text-sm">
          <div className="flex items-center justify-between text-slate-400 mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" /> <span>Terminal Output</span>
            </div>
            <button onClick={clearTerminal} className="text-xs hover:text-white transition-colors">
              Clear
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1 pr-2">
            {terminalOutput.map((out, i) => (
              <div key={i} className={
                out.type === 'error' ? 'text-red-400' :
                out.type === 'fatal' ? 'text-red-500 bg-red-950/50 p-2 rounded border border-red-900 mt-2 font-bold' :
                out.type === 'warning' ? 'text-yellow-400' :
                out.type === 'success' ? 'text-emerald-400' :
                out.type === 'input' ? 'text-white font-bold mt-3' :
                'text-slate-400'
              }>
                {out.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer explanation */}
      <div className="bg-orange-50 p-4 border-t border-orange-100 text-sm text-orange-900 text-center">
        💡 <strong>บทเรียน:</strong> การใช้ <code>try...except</code> ช่วยป้องกันไม่ให้โปรแกรมปิดตัวเองลงเมื่อผู้ใช้งานกรอกข้อมูลผิดประเภท (เช่น พิมพ์ตัวอักษรใส่ช่องตัวเลข)
      </div>
    </div>
  );
}
