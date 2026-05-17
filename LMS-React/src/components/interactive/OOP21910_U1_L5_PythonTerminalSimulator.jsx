import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function OOP21910_U1_L5_PythonTerminalSimulator() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nTry typing "python --version" or "python" to start interactive mode.' }
  ]);
  const [input, setInput] = useState('');
  const [inPythonMode, setInPythonMode] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, { type: 'input', content: `${inPythonMode ? '>>>' : 'PS C:\\Users\\Student>'} ${cmd}` }]);

    let output = '';

    if (inPythonMode) {
      if (trimmedCmd === 'exit()') {
        setInPythonMode(false);
      } else if (trimmedCmd.startsWith('print(') && trimmedCmd.endsWith(')')) {
        output = trimmedCmd.substring(6, trimmedCmd.length - 1).replace(/^["']|["']$/g, '');
      } else if (trimmedCmd === '1 + 1') {
        output = '2';
      } else {
        output = `Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name '${trimmedCmd.split(' ')[0]}' is not defined`;
      }
    } else {
      if (trimmedCmd === 'python --version' || trimmedCmd === 'python -V') {
        output = 'Python 3.12.4';
      } else if (trimmedCmd === 'python') {
        output = 'Python 3.12.4 (tags/v3.12.4:7d4cc5a, Apr  5 2024, 00:38:17) [MSC v.1929 64 bit (AMD64)] on win32\nType "help", "copyright", "credits" or "license" for more information.';
        setInPythonMode(true);
      } else if (trimmedCmd.startsWith('pip install')) {
        const pkg = trimmedCmd.split(' ')[2];
        output = `Collecting ${pkg || 'package'}\n  Downloading ${pkg || 'package'}-1.0.0-py3-none-any.whl (10 kB)\nInstalling collected packages: ${pkg || 'package'}\nSuccessfully installed ${pkg || 'package'}-1.0.0`;
      } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
        setHistory([]);
        return;
      } else {
        output = `${trimmedCmd.split(' ')[0]} : The term '${trimmedCmd.split(' ')[0]}' is not recognized as the name of a cmdlet, function, script file, or operable program.`;
      }
    }

    if (output) {
      setHistory(prev => [...prev, { type: 'output', content: output, isError: output.includes('Error') || output.includes('Traceback') || output.includes('is not recognized') }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const clear = () => {
    setInPythonMode(false);
    setHistory([{ type: 'system', content: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nTry typing "python --version" or "python" to start interactive mode.' }]);
    setInput('');
  };

  const presetCommands = [
    "python --version",
    "pip install requests",
    "python",
    "print('Hello World!')",
    "exit()"
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-800 text-slate-100 rounded-lg">
            <Terminal size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Python Terminal & Interactive Mode</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองการใช้งาน Terminal (Command Line) พิมพ์คำสั่งเพื่อรัน Python หรือจัดการไลบรารีด้วย pip
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Shortcuts */}
          <div className="w-full lg:w-64 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-600" />
              คำสั่งน่าลอง
            </h4>
            
            <div className="space-y-3 flex-1">
              {presetCommands.map((cmd, idx) => (
                <button key={idx} onClick={() => { setInput(cmd); }}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all group flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 shrink-0 mt-0.5" />
                  <code className="text-xs text-slate-700">{cmd}</code>
                </button>
              ))}
            </div>

            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> ภารกิจของคุณ
              </h4>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                คลิกคำสั่งด้านบน หรือพิมพ์ <code className="bg-emerald-100 px-1 rounded font-mono">python</code> ที่ Terminal ด้านล่าง 
                เพื่อเข้าโหมด <b>Interactive</b> (จะสังเกตเห็น <code className="bg-emerald-100 px-1 rounded font-mono">&gt;&gt;&gt;</code>)
                จากนั้นลองพิมพ์สูตรคณิตศาสตร์ หรือ <code className="bg-emerald-100 px-1 rounded font-mono">print()</code> 
                แล้วออกจากระบบด้วย <code className="bg-emerald-100 px-1 rounded font-mono">exit()</code>
              </p>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">สถานะการทำงาน (Mode)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {/* OS Terminal Mode */}
              <div className={`p-5 rounded-xl border-2 transition-colors ${!inPythonMode ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={18} className={!inPythonMode ? 'text-blue-600' : 'text-slate-400'} />
                  <h5 className={`font-bold ${!inPythonMode ? 'text-blue-800' : 'text-slate-600'}`}>OS Terminal Mode</h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  โหมดระบบปฏิบัติการปกติ (เช่น PowerShell หรือ bash) ใช้สำหรับจัดการไฟล์ หรือเรียกใช้โปรแกรม
                </p>
                <div className="font-mono text-[10px] bg-slate-900 text-slate-300 p-2 rounded leading-loose">
                  <span className="text-blue-400">PS C:\Users\Student&gt;</span> python --version<br/>
                  <span className="text-blue-400">PS C:\Users\Student&gt;</span> pip install numpy
                </div>
              </div>

              {/* Python Interactive Mode */}
              <div className={`p-5 rounded-xl border-2 transition-colors ${inPythonMode ? 'bg-emerald-50 border-emerald-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🐍</span>
                  <h5 className={`font-bold ${inPythonMode ? 'text-emerald-800' : 'text-slate-600'}`}>Python Interactive Mode</h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  โหมดโต้ตอบของ Python (REPL) ใช้พิมพ์โค้ด Python และดูผลลัพธ์ทันที โดยไม่ต้องสร้างไฟล์ เหมาะสำหรับทดสอบโค้ดสั้นๆ
                </p>
                <div className="font-mono text-[10px] bg-slate-900 text-slate-300 p-2 rounded leading-loose">
                  <span className="text-emerald-400">&gt;&gt;&gt;</span> print("Hello")<br/>
                  Hello<br/>
                  <span className="text-emerald-400">&gt;&gt;&gt;</span> exit()
                </div>
              </div>
            </div>
            
            <button onClick={clear}
              className="mt-4 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> เคลียร์หน้าจอทั้งหมด
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-64 bg-[#1e1e1e] p-4 font-mono text-[14px] overflow-y-auto flex flex-col w-full border-t border-slate-800 cursor-text"
             onClick={() => document.getElementById('terminal-input').focus()}>
          
          <div className="flex-1 flex flex-col">
            {history.map((line, idx) => (
              <div key={idx} className={`mb-1 whitespace-pre-wrap ${line.type === 'input' ? 'text-emerald-400' : line.isError ? 'text-red-400' : 'text-slate-300'}`}>
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center text-emerald-400 mt-1">
              <span className="mr-2 select-none">{inPythonMode ? '>>>' : 'PS C:\\Users\\Student>'}</span>
              <input id="terminal-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-emerald-400"
                spellCheck="false" autoFocus autoComplete="off" />
            </div>
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
