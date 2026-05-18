import fs from 'fs';
import path from 'path';

const OUT = 'd:/Teach/LMS-React/src/components/interactive';

const files = {
  'SQL21901_U5_L4_SQLIAMDemo.jsx': `import React, { useState, useEffect, useRef } from 'react';
import { Users, RefreshCcw, TerminalSquare, CheckCircle2, UserCog } from 'lucide-react';

const ROLES = {
  admin: { label: 'admin', perms: ['SELECT','INSERT','UPDATE','DELETE','GRANT'] },
  editor: { label: 'editor', perms: ['SELECT','INSERT','UPDATE'] },
  viewer: { label: 'viewer', perms: ['SELECT'] },
};

const USERS = [
  { id: 'u1', name: 'สมชาย', role: null },
  { id: 'u2', name: 'สมหญิง', role: null },
  { id: 'u3', name: 'guest01', role: null },
];

export default function SQL21901_U5_L4_SQLIAMDemo() {
  const [users, setUsers] = useState(USERS.map(u => ({ ...u })));
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'IAM / RBAC Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);

  const assignRole = (userId, roleKey) => {
    setUsers(us => us.map(u => u.id === userId ? { ...u, role: roleKey } : u));
    log(\`$ GRANT ROLE '\${roleKey}' TO '\${userId}';\`, 'command');
    log(\`> มอบ Role \${roleKey}: สิทธิ์ [\${ROLES[roleKey].perms.join(', ')}]\`, 'success');
  };

  const reset = () => { setUsers(USERS.map(u => ({ ...u }))); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };

  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'least' ? '> ถูกต้อง Least Privilege' : '> ผิด', quizAnswer === 'least' ? 'success' : 'error');
  };

  return (
    <motionless className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <motionless className="bg-slate-50 border-b border-slate-200 p-5">
        <motionless className="flex items-center gap-3 mb-2"><motionless className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={20}/></motionless><h3 className="font-display text-xl font-semibold text-slate-900">ระบบจัดการสิทธิ์ (IAM)</h3></motionless>
        <p className="font-base text-sm leading-relaxed text-slate-700">มอบ Role ให้ผู้ใช้ตามหลัก RBAC และ Least Privilege</p>
      </motionless>
      <motionless className="flex flex-col min-h-[500px]">
        <motionless className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <motionless className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            {users.map(u => (
              <motionless key={u.id} className="mb-4 p-4 bg-white border border-slate-200 rounded-xl">
                <p className="font-bold text-slate-800 flex items-center gap-2"><UserCog size={16}/>{u.name}</p>
                <p className="text-xs text-slate-500 mb-2">Role: {u.role ? ROLES[u.role].label : 'ยังไม่กำหนด'}</p>
                <motionless className="flex flex-wrap gap-1">
                  {Object.keys(ROLES).map(r => (
                    <button key={r} type="button" onClick={() => assignRole(u.id, r)} className="text-xs px-2 py-1 rounded border border-blue-200 bg-blue-50 text-blue-800 active:scale-95 min-h-[36px]">{r}</button>
                  ))}
                </motionless>
              </motionless>
            ))}
            <button type="button" onClick={reset} className="text-xs flex items-center gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
          </motionless>
          <motionless className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">Least Privilege หมายถึง?</p>
            {[{v:'least',l:'ให้สิทธิ์เฉพาะที่จำเป็นต่อการทำงาน'},{v:'low',l:'ให้ทุกคนเป็น Viewer'},{v:'admin',l:'ให้ Admin คนทำงานนาน'}].map(o => (
              <button key={o.v} type="button" onClick={() => !quizDone && setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] \${quizDone&&o.v==='least'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-blue-500 bg-blue-50':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </motionless>
        </motionless>
        <motionless className="px-5 py-3 bg-blue-50 text-sm border-b leading-relaxed">RBAC: จัดกลุ่มสิทธิ์ผ่าน Role แทนการตั้งทีละคน</motionless>
        <motionless className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto border-t border-slate-800">
          <motionless className="sticky top-0 bg-[#2d2d2d] px-4 py-2 border-b border-slate-700"><TerminalSquare size={14} className="inline text-slate-500"/> <span className="text-slate-500 text-xs ml-1">TERMINAL</span></motionless>
          <motionless className="p-4 space-y-1" ref={consoleRef}>{consoleHistory.map((l,i)=><p key={i} className={l.type==='error'?'text-rose-400':l.type==='success'?'text-emerald-400':l.type==='command'?'text-teal-300':'text-slate-500'}>{l.text}</p>)}</motionless>
        </motionless>
      </motionless>
    </motionless>
  );
}
`,
};

for (const [name, content] of Object.entries(files)) {
  const fixed = content.split('motionless').join('div');
  fs.writeFileSync(path.join(OUT, name), fixed, 'utf8');
  console.log('wrote', name);
}
