import { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function OOP21910_U1_L5_PythonTerminalSimulator() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Windows PowerShell\\nCopyright (C) Microsoft Corporation. All rights reserved.\\n\\nTry typing "python --version" or "python" to start interactive mode.' }
  ]);
  const [input, setInput] = useState('');
  const [inPythonMode, setInPythonMode] = useState(false);
  const endRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: `${inPythonMode ? '>>>' : 'PS C:\\\\Users\\\\Student>'} ${cmd}` }]);

    let output = '';

    if (inPythonMode) {
      // Python Interactive Mode Simulation
      if (trimmedCmd === 'exit()') {
        setInPythonMode(false);
      } else if (trimmedCmd.startsWith('print(') && trimmedCmd.endsWith(')')) {
        const text = trimmedCmd.substring(6, trimmedCmd.length - 1).replace(/^["']|["']$/g, '');
        output = text;
      } else if (trimmedCmd === '1 + 1') {
        output = '2';
      } else {
        output = `Traceback (most recent call last):\\n  File "<stdin>", line 1, in <module>\\nNameError: name '${trimmedCmd.split(' ')[0]}' is not defined`;
      }
    } else {
      // PowerShell Mode Simulation
      if (trimmedCmd === 'python --version' || trimmedCmd === 'python -V') {
        output = 'Python 3.10.11';
      } else if (trimmedCmd === 'python') {
        output = 'Python 3.10.11 (tags/v3.10.11:7d4cc5a, Apr  5 2023, 00:38:17) [MSC v.1929 64 bit (AMD64)] on win32\\nType "help", "copyright", "credits" or "license" for more information.';
        setInPythonMode(true);
      } else if (trimmedCmd.startsWith('pip install')) {
        const pkg = trimmedCmd.split(' ')[2];
        output = `Collecting ${pkg || 'package'}\\n  Downloading ${pkg || 'package'}-1.0.0-py3-none-any.whl (10 kB)\\nInstalling collected packages: ${pkg || 'package'}\\nSuccessfully installed ${pkg || 'package'}-1.0.0`;
      } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
        setHistory([]);
        return;
      } else {
        output = `${trimmedCmd.split(' ')[0]} : The term '${trimmedCmd.split(' ')[0]}' is not recognized as the name of a cmdlet, function, script file, or operable program.`;
      }
    }

    if (output) {
      setHistory(prev => [...prev, { type: 'output', content: output, isError: output.includes('Error') }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const handleReset = () => {
    setInPythonMode(false);
    setHistory([{ type: 'system', content: 'Windows PowerShell\\nCopyright (C) Microsoft Corporation. All rights reserved.\\n\\nTry typing "python --version" or "python" to start interactive mode.' }]);
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
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-slate-800 p-4 text-white flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <Terminal className="w-5 h-5 text-slate-400 ml-2" />
          <span className="font-mono text-sm font-semibold text-slate-300">Terminal - Python Simulator</span>
        </div>
        <button 
          onClick={handleReset}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs bg-slate-700 px-2 py-1 rounded"
        >
          <RotateCcw className="w-3 h-3" /> รีเซ็ต
        </button>
      </div>

      <div className="grid lg:grid-cols-4 min-h-[400px]">
        {/* Terminal Area */}
        <div className="lg:col-span-3 bg-slate-900 p-4 font-mono text-sm overflow-y-auto max-h-[500px] flex flex-col">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`mb-1 whitespace-pre-wrap ${line.type === 'input' ? 'text-emerald-400' : line.isError ? 'text-red-400' : 'text-slate-300'}`}
            >
              {line.content}
            </div>
          ))}
          
          <div className="flex items-center text-emerald-400 mt-2">
            <span className="mr-2">{inPythonMode ? '>>>' : 'PS C:\\\\Users\\\\Student>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-emerald-400"
              spellCheck="false"
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>

        {/* Instructions / Shortcuts */}
        <div className="bg-slate-50 border-l border-slate-200 p-5 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-600" />
            คำสั่งน่าลอง
          </h3>
          
          <div className="space-y-3 flex-1">
            {presetCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(cmd);
                }}
                className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all group flex items-start gap-2"
              >
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 shrink-0 mt-0.5" />
                <code className="text-xs text-slate-700">{cmd}</code>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
            <h4 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ภารกิจของคุณ
            </h4>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              ลองพิมพ์ <code className="bg-emerald-100 px-1 rounded">python</code> เพื่อเข้าโหมด Interactive 
              จากนั้นลองสั่ง <code className="bg-emerald-100 px-1 rounded">print('Hello')</code> 
              แล้วออกจากระบบด้วย <code className="bg-emerald-100 px-1 rounded">exit()</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
