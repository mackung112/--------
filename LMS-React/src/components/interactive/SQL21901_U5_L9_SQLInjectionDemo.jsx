import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Bug,
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  RefreshCcw,
  AlertCircle,
  TerminalSquare,
} from 'lucide-react';


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

export default function SQL21901_U5_L9_SQLInjectionDemo() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSafeMode, setIsSafeMode] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'SQL Injection Lab loaded.' },
    { type: 'system', text: 'ลองเจาะระบบในโหมดอ่อนแอ แล้วเปรียบเทียบ Prepared Statement' },
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const log = (text, type = 'system') => setConsoleHistory((prev) => [...prev, { text, type }]);

  const handleLogin = (e) => {
    e.preventDefault();
    log(`$ login attempt user="${username}" safe=${isSafeMode}`, 'command');

    if (isSafeMode) {
      if (username === 'admin' && password === '1234') {
        setLoginStatus('success');
        log('> Prepared stmt: credentials verified', 'success');
      } else {
        setLoginStatus('error');
        log('> Access denied (safe mode)', 'error');
      }
      return;
    }

    const lowerUser = username.toLowerCase();
    if (lowerUser.includes("' or 1=1") || lowerUser.includes("' or '1'='1")) {
      setLoginStatus('hacked');
      log('> INJECTION: OR 1=1 bypassed authentication!', 'error');
    } else if (lowerUser.includes("admin' --") || lowerUser.includes("admin'#")) {
      setLoginStatus('hacked');
      log('> INJECTION: comment truncated password check!', 'error');
    } else if (username === 'admin' && password === '1234') {
      setLoginStatus('success');
      log('> Login OK with valid credentials', 'success');
    } else {
      setLoginStatus('error');
      log('> Invalid credentials', 'error');
    }
  };

  const reset = () => {
    setUsername('');
    setPassword('');
    setLoginStatus(null);
    log('> session reset', 'system');
  };

  const toggleSafe = () => {
    setIsSafeMode((s) => !s);
    reset();
    log(`> mode: ${!isSafeMode ? 'Prepared Statement (safe)' : 'String concat (vulnerable)'}`, 'system');
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
          <div className={`p-2 rounded-lg ${isSafeMode ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {isSafeMode ? <ShieldCheck size={20} /> : <Bug size={20} />}
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การป้องกัน SQL Injection</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          จำลองระบบ Login และดูคำสั่ง SQL ด้านหลังบ้านแบบ real-time
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} /> หน้าจอ Login
              </span>
              <button
                type="button"
                onClick={toggleSafe}
                className={`text-xs px-3 py-1.5 rounded-full font-bold border active:scale-95 min-h-[36px] ${
                  isSafeMode ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-rose-100 border-rose-300 text-rose-800'
                }`}
              >
                {isSafeMode ? 'ปลอดภัย (Prepared)' : 'อ่อนแอ (Concat)'}
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 relative">
              {loginStatus === 'hacked' && (
                <div className="absolute inset-0 bg-rose-900/90 z-10 flex flex-col items-center justify-center text-white rounded-xl p-4">
                  <Bug size={48} className="text-rose-300 mb-2" />
                  <p className="font-bold text-lg">SYSTEM HACKED!</p>
                  <button type="button" onClick={reset} className="mt-3 px-4 py-2 bg-white text-rose-900 rounded-lg text-sm font-bold active:scale-95 flex items-center gap-2">
                    <RefreshCcw size={14} /> ลองใหม่
                  </button>
                </div>
              )}
              {loginStatus === 'success' && (
                <div className="absolute inset-0 bg-emerald-600/95 z-10 flex flex-col items-center justify-center text-white rounded-xl p-4">
                  <ShieldCheck size={48} className="mb-2" />
                  <p className="font-bold text-lg">LOGIN SUCCESS</p>
                  <button type="button" onClick={reset} className="mt-3 px-4 py-2 bg-white text-emerald-800 rounded-lg text-sm font-bold active:scale-95">
                    ออกจากระบบ
                  </button>
                </div>
              )}

              {loginStatus === 'error' && (
                <p className="p-2 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                </p>
              )}

              <label className="block text-sm font-medium text-slate-700">
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="admin หรือ ' OR 1=1 --"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="1234"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md active:scale-95 flex justify-center items-center gap-2 min-h-[44px]"
              >
                Login <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div className="lg:w-1/2 p-6 bg-[#1e1e2e] text-white">
            <p className="text-xs text-slate-400 mb-3">Backend SQL (สร้างจาก input)</p>
            <pre className="font-mono text-sm leading-relaxed bg-black/40 p-4 rounded-lg border border-slate-700 overflow-x-auto">
{`SELECT * FROM users
WHERE username = ${isSafeMode ? '?' : `'${username}'`}
  AND password = ${isSafeMode ? '?' : `'${password}'`};`}
            </pre>
            {isSafeMode && (
              <p className="mt-3 text-xs text-emerald-300 leading-relaxed">
                Prepared Statement: ค่าจากฟอร์มเป็นพารามิเตอร์เท่านั้น ไม่ถูกแปลเป็นคำสั่ง SQL
              </p>
            )}
            {!isSafeMode && username.includes("'") && (
              <p className="mt-3 text-xs text-rose-300 leading-relaxed flex gap-2">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                เครื่องหมาย &apos; ปิด string ก่อนกำหนด — ส่วนที่เหลือกลายเป็นคำสั่งของแฮกเกอร์
              </p>
            )}
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              ภารกิจ: ลอง admin/1234 | &apos; OR 1=1 -- | admin&apos; --
            </p>
          </div>
        </div>

        <p className="px-5 py-3 bg-rose-50 text-sm border-b border-rose-100 text-rose-900 leading-relaxed">
          ป้องกันด้วย Prepared Statements และไม่ต่อ string เป็น SQL โดยตรง
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
