import React, { useState, useEffect, useRef } from 'react';
import { Shield, RefreshCcw, TerminalSquare, CheckCircle2, Globe } from 'lucide-react';

const ALLOWED = ['192.168.1.10', '10.0.0.5'];
const ATTEMPTS = [
  { ip: '192.168.1.10', label: 'App Server (อนุญาต)' },
  { ip: '8.8.8.8', label: 'Internet สาธารณะ' },
  { ip: '10.0.0.5', label: 'Office VPN' },
  { ip: '203.0.113.99', label: 'Unknown Host' },
];


const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mt-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{taskText}</p>
        </div>
        <button onClick={handleCopy} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${copied ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
          {copied ? <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> คัดลอกแล้ว</> : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> คัดลอกโจทย์</>}
        </button>
      </div>
    </div>
  );
};

export default function SQL21901_U5_L3_SQLFirewallDemo() {
  const [blocked, setBlocked] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Database Firewall Simulator ready.' }]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const log = (t, type = 'system') => setConsoleHistory((p) => [...p, { text: t, type }]);

  const testConnection = (a) => {
    const ok = ALLOWED.includes(a.ip);
    log(`$ connect --from=${a.ip}`, 'command');
    if (ok) log('> ALLOW: Connection on port 3306', 'success');
    else {
      setBlocked((b) => (b.includes(a.ip) ? b : [...b, a.ip]));
      log('> DENY: IP not in allowlist', 'error');
    }
  };

  const reset = () => {
    setBlocked([]);
    setQuizAnswer(null);
    setQuizDone(false);
    log('> reset', 'system');
  };

  const submitQuiz = () => {
    if (!quizAnswer) {
      log('> เลือกคำตอบ', 'error');
      return;
    }
    setQuizDone(true);
    log(quizAnswer === 'port' ? '> ถูกต้อง' : '> ผิด', quizAnswer === 'port' ? 'success' : 'error');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-[100px] rounded-full mix-blend-multiply" />
      </div>
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Shield size={20} />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การใช้ Firewalls</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">จำลอง Database Firewall และ IP Allowlist</p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <p className="text-xs font-bold text-slate-600 mb-2">ALLOWLIST</p>
            {ALLOWED.map((ip) => (
              <p key={ip} className="font-mono text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded mb-2">
                {ip}
              </p>
            ))}
            <p className="text-xs font-bold text-slate-600 mt-4 mb-2">ทดสอบการเชื่อมต่อ</p>
            {ATTEMPTS.map((a) => (
              <button
                key={a.ip}
                type="button"
                onClick={() => testConnection(a)}
                className="w-full text-left p-3 mb-2 rounded-lg border border-slate-200 bg-white hover:border-orange-400 active:scale-95 min-h-[44px] text-sm"
              >
                <Globe size={14} className="inline mr-2 text-orange-500" />
                {a.label} <span className="font-mono text-slate-500">({a.ip})</span>
              </button>
            ))}
            <button type="button" onClick={reset} className="mt-2 text-xs flex items-center gap-1 border px-3 py-2 rounded-lg active:scale-95">
              <RefreshCcw size={12} /> รีเซ็ต
            </button>
          </div>

          <div className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">วิธีป้องกัน DB จากอินเทอร์เน็ตที่ดีที่สุด?</p>
            {[
              { v: 'port', l: 'ปิดจาก Internet สาธารณะ + IP Allowlist' },
              { v: 'pwd', l: 'ตั้งรหัสผ่านยาวมาก' },
              { v: 'portnum', l: 'เปลี่ยน Port 3306' },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => !quizDone && setQuizAnswer(o.v)}
                className={`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] ${
                  quizDone && o.v === 'port'
                    ? 'border-emerald-500 bg-emerald-50'
                    : quizAnswer === o.v
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-slate-200 bg-white'
                }`}
              >
                {o.l}
              </button>
            ))}
            <button
              type="button"
              onClick={submitQuiz}
              disabled={quizDone}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium active:scale-95 min-h-[44px] flex justify-center items-center gap-2"
            >
              <CheckCircle2 size={16} /> ตรวจคำตอบ
            </button>
            {blocked.length > 0 && (
              <p className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded text-sm text-rose-800">
                บล็อกแล้ว: {blocked.join(', ')}
              </p>
            )}
          </div>
        </div>

        <p className="px-5 py-3 bg-orange-50 text-sm border-b border-orange-100 leading-relaxed">
          ห้ามเปิด Port 3306 สู่ Internet — ใช้ Allowlist
        </p>

        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs">TERMINAL</span>
          </div>
          <div className="p-4 space-y-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (
              <p
                key={i}
                className={
                  l.type === 'error'
                    ? 'text-rose-400 font-bold'
                    : l.type === 'success'
                      ? 'text-emerald-400 font-bold'
                      : l.type === 'command'
                        ? 'text-teal-300'
                        : 'text-slate-500'
                }
              >
                {l.text}
              </p>
            ))}
          </div>
        </div>
      </div>
              </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <TeacherTask title="งานที่ได้รับมอบหมาย" taskText="ทำความเข้าใจการทำงานจาก Simulator นี้" />
      </div>
    </div>
  );
}
