import React, { useState, useEffect } from 'react';
import { ShieldAlert, Bug, ShieldCheck, Terminal, User, Lock, ArrowRight, RotateCcw } from 'lucide-react';

export default function SQL21901_U5_L9_SQLInjectionDemo() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHacked, setIsHacked] = useState(false);
  const [isSafeMode, setIsSafeMode] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // 'success', 'error', 'hacked'

  const rawQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const safeQuery = `SELECT * FROM users WHERE username = ? AND password = ?`;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isSafeMode) {
      if (username === 'admin' && password === '1234') {
        setLoginStatus('success');
      } else {
        setLoginStatus('error');
      }
      return;
    }

    // Vulnerable Logic Simulation
    // If username is "admin' --" or similar, the query effectively becomes SELECT * FROM users WHERE username = 'admin'
    // If username is "' OR 1=1 --", it bypasses completely
    
    const lowerUser = username.toLowerCase();
    if (lowerUser.includes("' or 1=1") || lowerUser.includes("' or '1'='1")) {
      setIsHacked(true);
      setLoginStatus('hacked');
    } else if (lowerUser.includes("admin' --") || lowerUser.includes("admin'#")) {
      setIsHacked(true);
      setLoginStatus('hacked');
    } else if (username === 'admin' && password === '1234') {
      setLoginStatus('success');
    } else {
      setLoginStatus('error');
    }
  };

  const reset = () => {
    setUsername('');
    setPassword('');
    setIsHacked(false);
    setLoginStatus(null);
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className={`p-4 rounded-xl shrink-0 ${isSafeMode ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isSafeMode ? <ShieldCheck size={32} /> : <Bug size={32} />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">The Hacker's Playground (SQL Injection)</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            เรียนรู้การโจมตีและการป้องกัน SQL Injection ผ่านการจำลองระบบ Login จริง ลองสวมบทบาทเป็นแฮกเกอร์เจาะระบบโดยไม่ต้องรู้รหัสผ่าน!
          </p>
        </div>
      </div>

      {/* Simulator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Login Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <div className="font-semibold text-slate-700 flex items-center gap-2">
              <User size={18}/> หน้าจอเข้าสู่ระบบ (Frontend)
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={isSafeMode ? 'text-slate-400' : 'text-rose-600'}>ระบบอ่อนแอ</span>
              <button 
                onClick={() => { setIsSafeMode(!isSafeMode); reset(); }}
                className={`w-12 h-6 rounded-full transition-colors relative ${isSafeMode ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isSafeMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
              <span className={isSafeMode ? 'text-emerald-600' : 'text-slate-400'}>ระบบปลอดภัย (Prepared Stmt)</span>
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col justify-center relative">
            {loginStatus === 'hacked' && (
              <div className="absolute inset-0 bg-rose-900/90 z-10 flex flex-col items-center justify-center text-white animate-in zoom-in duration-300">
                <Bug size={64} className="text-rose-400 mb-4 animate-bounce" />
                <h3 className="text-3xl font-black mb-2">SYSTEM HACKED!</h3>
                <p className="text-rose-200 mb-6">คุณเจาะระบบสำเร็จโดยไม่ต้องใช้รหัสผ่าน!</p>
                <button onClick={reset} className="px-6 py-2 bg-white text-rose-900 rounded-full font-bold flex items-center gap-2 hover:bg-rose-100 transition-colors">
                  <RotateCcw size={18}/> ลองอีกครั้ง
                </button>
              </div>
            )}
            {loginStatus === 'success' && (
              <div className="absolute inset-0 bg-emerald-600/95 z-10 flex flex-col items-center justify-center text-white animate-in zoom-in duration-300">
                <ShieldCheck size={64} className="text-emerald-200 mb-4" />
                <h3 className="text-3xl font-black mb-2">LOGIN SUCCESS!</h3>
                <p className="text-emerald-100 mb-6">คุณเข้าสู่ระบบด้วยรหัสผ่านที่ถูกต้อง</p>
                <button onClick={reset} className="px-6 py-2 bg-white text-emerald-700 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-50 transition-colors">
                  <RotateCcw size={18}/> ออกจากระบบ
                </button>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Welcome Back</h3>
                <p className="text-slate-500 text-sm mt-1">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
              </div>

              {loginStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center gap-2 animate-in shake">
                  <AlertCircle size={16}/> ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="e.g. admin"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="text" // Made text instead of password so user can see what they type
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="e.g. 1234"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                Login <ArrowRight size={18}/>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Backend Terminal */}
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700 flex flex-col">
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="font-semibold text-slate-300 flex items-center gap-2">
              <Terminal size={18}/> คำสั่ง SQL ด้านหลังบ้าน (Backend)
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col font-mono text-sm leading-relaxed">
            <p className="text-slate-400 mb-4">// โค้ด Backend รับค่าจากฟอร์มมาต่อกันตรงๆ</p>
            
            <div className="bg-black/50 p-4 rounded-xl border border-slate-800 break-all">
              <span className="text-purple-400">SELECT</span> <span className="text-white">*</span> <span className="text-purple-400">FROM</span> <span className="text-sky-300">users</span><br/>
              <span className="text-purple-400">WHERE</span> <span className="text-sky-300">username</span> <span className="text-white">=</span> 
              
              {!isSafeMode ? (
                <>
                  <span className="text-green-400"> '{username}'</span><br/>
                  <span className="text-purple-400">AND</span> <span className="text-sky-300">password</span> <span className="text-white">=</span> <span className="text-green-400">'{password}'</span>
                </>
              ) : (
                <>
                  <span className="text-slate-500"> ?</span><br/>
                  <span className="text-purple-400">AND</span> <span className="text-sky-300">password</span> <span className="text-white">=</span> <span className="text-slate-500">?</span>
                </>
              )}
            </div>

            {isSafeMode && (
              <div className="mt-4 bg-emerald-900/30 border border-emerald-500/30 p-4 rounded-xl text-emerald-300">
                <ShieldCheck size={18} className="mb-2" />
                <p>โหมดปลอดภัย (Prepared Statements): ข้อมูลที่พิมพ์มาจะถูกนำไปเป็น "ค่าตัวแปร" เท่านั้น ไม่สามารถแปลความหมายเป็น "คำสั่ง SQL" ได้อีกต่อไป แฮกเกอร์จึงทำอะไรไม่ได้</p>
                <div className="mt-3 text-slate-400 text-xs">
                  Parameters: <br/>
                  [1] = "{username}" <br/>
                  [2] = "{password}"
                </div>
              </div>
            )}

            {!isSafeMode && username.includes("'") && (
              <div className="mt-6 bg-rose-900/30 border border-rose-500/30 p-4 rounded-xl text-rose-300 animate-in fade-in">
                <ShieldAlert size={18} className="mb-2 text-rose-400" />
                <p>สังเกตการจับคู่เครื่องหมาย Quote (<span className="text-white font-bold">'</span>) ให้ดี! การพิมพ์ <span className="text-white font-bold">'</span> เข้ามา ทำให้คำสั่ง SQL ปิด String ก่อนกำหนด และส่วนที่เหลือจะกลายเป็นคำสั่ง SQL ของแฮกเกอร์!</p>
              </div>
            )}

            <div className="mt-auto pt-8">
              <h4 className="text-white font-bold mb-3 border-b border-slate-700 pb-2">🎯 ภารกิจแฮกเกอร์:</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 px-2 bg-slate-800 rounded text-xs">1</div>
                  ลองเข้าสู่ระบบปกติ: ใช้ <code className="text-yellow-400">admin</code> และรหัสผ่าน <code className="text-yellow-400">1234</code>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 px-2 bg-slate-800 rounded text-xs">2</div>
                  ลองเจาะระบบแบบคลาสสิก: พิมพ์ <code className="text-yellow-400">' OR 1=1 --</code> ลงในช่อง Username
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 px-2 bg-slate-800 rounded text-xs">3</div>
                  ลองเจาะระบบแบบตัดจบ: พิมพ์ <code className="text-yellow-400">admin' --</code> ลงในช่อง Username
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
