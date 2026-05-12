import React, { useState } from 'react';
import { Package, Terminal, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick, ArrowRight, Loader2 } from 'lucide-react';

export default function PipInstallDemo() {
  const [command, setCommand] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [installedPackages, setInstalledPackages] = useState([]);

  const [activeTooltip, setActiveTooltip] = useState(null);
  const explanations = {
    'pip-install': { title: 'pip install ชื่อ', desc: 'คำสั่งดาวน์โหลดและติดตั้งไลบรารีจาก PyPI (Python Package Index) เช่น pip install requests', color: 'text-emerald-600' },
    'pip-list': { title: 'pip list', desc: 'แสดงรายชื่อไลบรารีทั้งหมดที่ติดตั้งอยู่ในเครื่อง', color: 'text-blue-600' },
    'pip-uninstall': { title: 'pip uninstall ชื่อ', desc: 'ลบไลบรารีที่ไม่ต้องการออก', color: 'text-red-500' },
  };

  const packageDb = {
    'requests': { version: '2.31.0', desc: 'HTTP library สำหรับเรียก API' },
    'pygame': { version: '2.5.2', desc: 'ไลบรารีสร้างเกม 2D' },
    'numpy': { version: '1.26.4', desc: 'คำนวณทางคณิตศาสตร์ขั้นสูง' },
    'flask': { version: '3.0.3', desc: 'สร้างเว็บแอปพลิเคชัน' },
    'pillow': { version: '10.3.0', desc: 'จัดการรูปภาพ' },
  };

  const showToast = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const runCommand = () => {
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    setOutputs(prev => [...prev, { type: 'input', text: `$ ${command}` }]);
    setIsRunning(true);

    setTimeout(() => {
      if (cmd.startsWith('pip install ')) {
        const pkg = cmd.replace('pip install ', '').trim();
        if (packageDb[pkg]) {
          if (installedPackages.includes(pkg)) {
            setOutputs(prev => [...prev, { type: 'warning', text: `Requirement already satisfied: ${pkg}` }]);
          } else {
            setInstalledPackages(prev => [...prev, pkg]);
            setOutputs(prev => [...prev,
              { type: 'info', text: `Collecting ${pkg}...` },
              { type: 'info', text: `Downloading ${pkg}-${packageDb[pkg].version}.tar.gz` },
              { type: 'success', text: `Successfully installed ${pkg}-${packageDb[pkg].version}` },
            ]);
          }
        } else {
          setOutputs(prev => [...prev, { type: 'error', text: `ERROR: No matching distribution found for ${pkg}` }]);
        }
      } else if (cmd === 'pip list') {
        if (installedPackages.length === 0) {
          setOutputs(prev => [...prev, { type: 'info', text: 'Package    Version\n---------- -------\npip        24.0\nsetuptools 69.5.1' }]);
        } else {
          const list = installedPackages.map(p => `${p.padEnd(12)} ${packageDb[p].version}`).join('\n');
          setOutputs(prev => [...prev, { type: 'info', text: `Package      Version\n------------ -------\npip          24.0\nsetuptools   69.5.1\n${list}` }]);
        }
      } else if (cmd === 'pip --version') {
        setOutputs(prev => [...prev, { type: 'info', text: 'pip 24.0 from C:\\Python312\\Lib\\site-packages\\pip (python 3.12)' }]);
      } else {
        setOutputs(prev => [...prev, { type: 'error', text: `Unknown command: ${cmd}` }]);
      }
      setIsRunning(false);
      setCommand('');
    }, 800);
  };

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState({ 1: null });
  const [quizDropzone, setQuizDropzone] = useState(1);
  const [quizSuccess, setQuizSuccess] = useState(false);

  return (
    <div className="space-y-12 my-8">
      {/* 1. Terminal Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center gap-3">
          <Package size={24} />
          <h3 className="font-bold text-lg">จำลอง Terminal: ทดลองใช้ pip</h3>
          {installedPackages.length > 0 && (
            <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
              📦 ติดตั้งแล้ว {installedPackages.length} แพ็คเกจ
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Terminal */}
          <div className="lg:col-span-2 bg-slate-900 p-4 min-h-[300px] flex flex-col">
            <div className="flex-1 font-mono text-sm overflow-y-auto max-h-[300px] space-y-0.5 mb-3">
              <div className="text-slate-500">## ลองพิมพ์คำสั่ง เช่น: pip install requests</div>
              {outputs.map((out, i) => (
                <div key={i} className={`whitespace-pre-wrap ${
                  out.type === 'input' ? 'text-slate-300' :
                  out.type === 'success' ? 'text-emerald-400' :
                  out.type === 'error' ? 'text-red-400' :
                  out.type === 'warning' ? 'text-yellow-400' :
                  'text-slate-400'
                }`}>{out.text}</div>
              ))}
              {isRunning && <div className="text-sky-400 flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> กำลังดำเนินการ...</div>}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-700 pt-3">
              <span className="text-emerald-400 font-mono text-sm">$</span>
              <input
                type="text"
                value={command}
                onChange={e => setCommand(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') runCommand(); }}
                placeholder="พิมพ์คำสั่ง pip ที่นี่..."
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-slate-600"
                disabled={isRunning}
              />
              <button onClick={runCommand} disabled={isRunning} className="text-slate-400 hover:text-white transition-colors"><ArrowRight size={18} /></button>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="p-4 bg-slate-50 border-l border-slate-200">
            <h4 className="text-sm font-bold text-slate-700 mb-3">🚀 คำสั่งลัด (คลิกเพื่อทดลอง)</h4>
            <div className="space-y-2">
              {[
                { cmd: 'pip install requests', label: 'ติดตั้ง requests' },
                { cmd: 'pip install pygame', label: 'ติดตั้ง pygame' },
                { cmd: 'pip install numpy', label: 'ติดตั้ง numpy' },
                { cmd: 'pip list', label: 'ดูรายชื่อแพ็คเกจ' },
                { cmd: 'pip --version', label: 'ดูเวอร์ชัน pip' },
              ].map(q => (
                <button key={q.cmd} onClick={() => { setCommand(q.cmd); }}
                  className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 transition-colors text-sm group">
                  <code className="text-indigo-600 text-xs font-mono">{q.cmd}</code>
                  <div className="text-slate-500 text-xs">{q.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Syntax Explainer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">คำสั่ง pip ที่ใช้บ่อย</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(explanations).map(([key, info]) => (
            <div key={key} onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${activeTooltip === key ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
              <h4 className={`font-bold font-mono ${info.color} mb-2`}>{info.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">คำสั่งที่ถูกต้องสำหรับติดตั้งไลบรารี <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">pygame</code> คือข้อใด?</p>

        <div className="space-y-3 my-6">
          {[
            { val: 'correct', label: 'pip install pygame', correct: true },
            { val: 'wrong1', label: 'install pip pygame' },
            { val: 'wrong2', label: 'python install pygame' },
            { val: 'wrong3', label: 'pip download pygame' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizSuccess) setQuizAnswers({ 1: opt.val }); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-mono transition-all ${
                quizSuccess && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' :
                quizSuccess && quizAnswers[1] === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' :
                quizAnswers[1] === opt.val ? 'border-indigo-500 bg-slate-700 text-white' :
                'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}>{opt.label}</button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswers({ 1: null }); setQuizSuccess(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => {
            if (!quizAnswers[1]) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; }
            setQuizSuccess(true);
            showToast(quizAnswers[1] === 'correct' ? 'ถูกต้อง! pip install ชื่อไลบรารี คือรูปแบบมาตรฐาน' : 'ไม่ถูกต้อง: คำสั่งที่ถูกคือ pip install pygame', quizAnswers[1] === 'correct' ? 'success' : 'error');
          }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (
        <div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>
          {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="text-red-500" />}
          {toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}
          <div className="font-medium">{toast.message}</div>
        </div>
      )}
    </div>
  );
}
