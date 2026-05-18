import fs from 'fs';
import path from 'path';

const OUT = 'd:/Teach/LMS-React/src/components/interactive';
const fix = (s) => s.replace(/__D__/g, 'div');

const terminal = fix(`
        <__D__ className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto border-t border-slate-800">
          <__D__ className="sticky top-0 bg-[#2d2d2d] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
            <TerminalSquare size={14} className="text-slate-500" />
            <span className="text-slate-500 text-xs">TERMINAL</span>
          </__D__>
          <__D__ className="p-4 space-y-1" ref={consoleRef}>
            {consoleHistory.map((l, i) => (
              <p key={i} className={l.type === 'error' ? 'text-rose-400 font-bold' : l.type === 'success' ? 'text-emerald-400 font-bold' : l.type === 'command' ? 'text-teal-300' : 'text-slate-500'}>{l.text}</p>
            ))}
          </__D__>
        </__D__>`);

const files = {};

files['SQL21901_U5_L5_SQLAccessControlDemo.jsx'] = fix(`import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, RefreshCcw, TerminalSquare, CheckCircle2 } from 'lucide-react';

export default function SQL21901_U5_L5_SQLAccessControlDemo() {
  const [user, setUser] = useState('john');
  const [host, setHost] = useState('192.168.1.10');
  const [created, setCreated] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Access Control Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const runCreate = () => {
    log(\`mysql> CREATE USER "\${user}"@"\${host}" IDENTIFIED BY '***';\`, 'command');
    setCreated(c => [...c, { user, host }]);
    log('> Query OK', 'success');
  };
  const reset = () => { setCreated([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'ip' ? '> ถูกต้อง' : '> ผิด', quizAnswer === 'ip' ? 'success' : 'error');
  };
  return (
    <__D__ className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <__D__ className="bg-slate-50 border-b border-slate-200 p-5">
        <__D__ className="flex items-center gap-3 mb-2"><__D__ className="p-2 bg-teal-100 text-teal-600 rounded-lg"><UserPlus size={20}/></__D__><h3 className="font-display text-xl font-semibold text-slate-900">การควบคุมการเข้าถึง</h3></__D__>
        <p className="font-base text-sm leading-relaxed text-slate-700">สร้างผู้ใช้พร้อมจำกัด Host</p>
      </__D__>
      <__D__ className="flex flex-col min-h-[500px]">
        <__D__ className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <__D__ className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-3">
            <label className="block text-sm font-medium text-slate-700">Username<input value={user} onChange={e=>setUser(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/></label>
            <label className="block text-sm font-medium text-slate-700">Host<input value={host} onChange={e=>setHost(e.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-blue-500 outline-none"/></label>
            <button type="button" onClick={runCreate} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium active:scale-95 min-h-[44px]">Run CREATE USER</button>
            <button type="button" onClick={reset} className="text-xs flex items-center gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
            {created.map((c,i)=><p key={i} className="text-xs font-mono bg-white border p-2 rounded">{c.user}@{c.host}</p>)}
          </__D__>
          <__D__ className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">"john"@"192.168.1.10" หมายความว่า?</p>
            {[{v:'ip',l:'John ล็อคอินได้จาก IP นี้เท่านั้น'},{v:'any',l:'ล็อคอินจากที่ไหนก็ได้'},{v:'pw',l:'ใช้ IP เป็นรหัสผ่าน'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] \${quizDone&&o.v==='ip'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-teal-500 bg-teal-50':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </__D__>
        </__D__>
        <p className="px-5 py-3 bg-teal-50 text-sm border-b leading-relaxed">CREATE USER ระบุ Host จำกัดที่มา</p>
        ${terminal}
      </__D__>
    </__D__>
  );
}`);

files['SQL21901_U5_L6_SQLGrantDemo.jsx'] = fix(`import React, { useState, useEffect, useRef } from 'react';
import { Key, RefreshCcw, TerminalSquare, CheckCircle2, Play } from 'lucide-react';
const PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];
export default function SQL21901_U5_L6_SQLGrantDemo() {
  const [user] = useState('employee');
  const [table] = useState('customers');
  const [selected, setSelected] = useState(['SELECT']);
  const [granted, setGranted] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'GRANT Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const toggle = (p) => setSelected(s => s.includes(p) ? s.filter(x=>x!==p) : [...s,p]);
  const runGrant = () => {
    log(\`mysql> GRANT \${selected.join(', ')} ON \${table} TO "\${user}";\`, 'command');
    log('mysql> FLUSH PRIVILEGES;', 'command');
    setGranted([...selected]);
    log('> Query OK', 'success');
  };
  const reset = () => { setSelected(['SELECT']); setGranted([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'sel' ? '> ถูกต้อง' : '> ผิด', quizAnswer === 'sel' ? 'success' : 'error');
  };
  return (
    <__D__ className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <__D__ className="bg-slate-50 border-b border-slate-200 p-5">
        <__D__ className="flex items-center gap-3 mb-2"><__D__ className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Key size={20}/></__D__><h3 className="font-display text-xl font-semibold text-slate-900">การให้สิทธิ์ (GRANT)</h3></__D__>
        <p className="font-base text-sm leading-relaxed text-slate-700">เลือกสิทธิ์และรัน GRANT</p>
      </__D__>
      <__D__ className="flex flex-col min-h-[500px]">
        <__D__ className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <__D__ className="lg:w-1/2 p-6 bg-[#1e1e2e] text-white border-b lg:border-b-0 lg:border-r border-slate-700">
            <p className="font-mono text-sm leading-loose"><span className="text-yellow-300 font-bold">GRANT</span> {selected.join(', ')}<br/><span className="text-slate-400">ON</span> <span className="text-green-300">{table}</span><br/><span className="text-slate-400">TO</span> <span className="text-green-300">"{user}"</span>;</p>
            <__D__ className="flex flex-wrap gap-2 mt-4">{PRIVS.map(p=><button key={p} type="button" onClick={()=>toggle(p)} className={\`px-2 py-1 rounded text-xs font-bold border active:scale-95 \${selected.includes(p)?'bg-emerald-600 text-white':'border-slate-600 text-slate-400'}\`}>{p}</button>)}</__D__>
            <button type="button" onClick={runGrant} className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg font-bold active:scale-95 flex justify-center gap-2 min-h-[44px]"><Play size={16}/> Run GRANT</button>
            <button type="button" onClick={reset} className="mt-2 text-xs text-slate-400 flex gap-1"><RefreshCcw size={12}/> รีเซ็ต</button>
          </__D__>
          <__D__ className="lg:w-1/2 p-6">
            <p className="text-sm mb-2">สิทธิ์: {(granted.length?granted:['—']).join(', ')}</p>
            <p className="text-sm font-bold mb-3 leading-relaxed">ให้ดู customers อย่างเดียว?</p>
            {[{v:'sel',l:'GRANT SELECT ON customers TO "employee";'},{v:'all',l:'GRANT ALL ON customers TO "employee";'},{v:'view',l:'GRANT VIEW ON customers TO "employee";'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-xs font-mono active:scale-95 min-h-[44px] \${quizDone&&o.v==='sel'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-emerald-300 bg-emerald-50/30':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </__D__>
        </__D__>
        <p className="px-5 py-3 bg-emerald-50 text-sm border-b leading-relaxed">ใช้ SELECT แทน ALL PRIVILEGES สำหรับพนักงานทั่วไป</p>
        ${terminal}
      </__D__>
    </__D__>
  );
}`);

files['SQL21901_U5_L7_SQLRevokeDemo.jsx'] = fix(`import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, RefreshCcw, TerminalSquare, CheckCircle2, Play } from 'lucide-react';
export default function SQL21901_U5_L7_SQLRevokeDemo() {
  const [privs, setPrivs] = useState(['SELECT', 'INSERT', 'UPDATE']);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'REVOKE Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const showGrants = () => { log('mysql> SHOW GRANTS FOR "employee";', 'command'); log(\`> Grants: \${privs.join(', ')}\`, 'output'); };
  const revokeInsert = () => {
    log('mysql> REVOKE INSERT ON mydb.* FROM "employee";', 'command');
    setPrivs(p => p.filter(x => x !== 'INSERT'));
    log('> Query OK', 'success');
  };
  const revokeAll = () => {
    log('mysql> REVOKE ALL PRIVILEGES ON mydb.* FROM "employee";', 'command');
    setPrivs([]);
    log('> All privileges revoked', 'success');
  };
  const reset = () => { setPrivs(['SELECT','INSERT','UPDATE']); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'show' ? '> ถูกต้อง SHOW GRANTS' : '> ผิด', quizAnswer === 'show' ? 'success' : 'error');
  };
  return (
    <__D__ className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <__D__ className="bg-slate-50 border-b border-slate-200 p-5">
        <__D__ className="flex items-center gap-3 mb-2"><__D__ className="p-2 bg-rose-100 text-rose-600 rounded-lg"><KeyRound size={20}/></__D__><h3 className="font-display text-xl font-semibold text-slate-900">การยกเลิกสิทธิ์ (REVOKE)</h3></__D__>
        <p className="font-base text-sm leading-relaxed text-slate-700">SHOW GRANTS ก่อน REVOKE</p>
      </__D__>
      <__D__ className="flex flex-col min-h-[500px]">
        <__D__ className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <__D__ className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <button type="button" onClick={showGrants} className="w-full mb-2 bg-slate-800 text-white py-2 rounded-md text-sm active:scale-95 min-h-[44px]">SHOW GRANTS</button>
            <button type="button" onClick={revokeInsert} className="w-full mb-2 bg-rose-600 text-white py-2 rounded-md text-sm active:scale-95 min-h-[44px] flex justify-center gap-2"><Play size={14}/> REVOKE INSERT</button>
            <button type="button" onClick={revokeAll} className="w-full mb-2 border-2 border-rose-300 text-rose-700 py-2 rounded-md text-sm active:scale-95 min-h-[44px]">REVOKE ALL</button>
            <button type="button" onClick={reset} className="text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
            <p className="mt-4 text-sm">สิทธิ์คงเหลือ: <strong>{privs.length ? privs.join(', ') : 'ไม่มี'}</strong></p>
          </__D__>
          <__D__ className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">ก่อน REVOKE ควรใช้คำสั่งใด?</p>
            {[{v:'show',l:'SHOW GRANTS FOR "user";'},{v:'select',l:'SELECT * FROM user_privileges;'},{v:'check',l:'CHECK PRIVILEGES FOR "user";'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-xs font-mono active:scale-95 min-h-[44px] \${quizDone&&o.v==='show'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-rose-300 bg-rose-50':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </__D__>
        </__D__>
        <p className="px-5 py-3 bg-rose-50 text-sm border-b leading-relaxed">REVOKE ต้องระบุระดับเดียวกับที่เคย GRANT</p>
        ${terminal}
      </__D__>
    </__D__>
  );
}`);

files['SQL21901_U5_L8_SQLAuditDemo.jsx'] = fix(`import React, { useState, useEffect, useRef } from 'react';
import { FileSearch, RefreshCcw, TerminalSquare, CheckCircle2 } from 'lucide-react';
const LOG_TYPES = [
  { id: 'log', label: 'General Query Log', sample: 'SELECT * FROM orders;' },
  { id: 'slow', label: 'Slow Query Log', sample: 'SELECT ... (12.4 sec)' },
  { id: 'err', label: 'Error Log', sample: 'ERROR 1062: Duplicate entry' },
  { id: 'trigger', label: 'Audit Table (Trigger)', sample: 'UPDATE salaries SET amount=99999' },
];
export default function SQL21901_U5_L8_SQLAuditDemo() {
  const [active, setActive] = useState('log');
  const [logs, setLogs] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Audit Log Explorer ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const capture = (lt) => {
    setActive(lt.id);
    const entry = { type: lt.label, msg: lt.sample, time: new Date().toLocaleTimeString('th-TH') };
    setLogs(l => [entry, ...l].slice(0, 8));
    log(\`$ audit.capture(type="\${lt.id}")\`, 'command');
    log(\`> [\${entry.time}] \${entry.msg}\`, 'output');
  };
  const reset = () => { setLogs([]); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'slow' ? '> ถูกต้อง Slow Query Log' : '> ผิด', quizAnswer === 'slow' ? 'success' : 'error');
  };
  return (
    <__D__ className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <__D__ className="bg-slate-50 border-b border-slate-200 p-5">
        <__D__ className="flex items-center gap-3 mb-2"><__D__ className="p-2 bg-slate-200 text-slate-700 rounded-lg"><FileSearch size={20}/></__D__><h3 className="font-display text-xl font-semibold text-slate-900">การตรวจสอบการใช้งาน (Auditing)</h3></__D__>
        <p className="font-base text-sm leading-relaxed text-slate-700">เปิดดูประเภท Log ต่างๆ ของ MySQL</p>
      </__D__>
      <__D__ className="flex flex-col min-h-[500px]">
        <__D__ className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <__D__ className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            {LOG_TYPES.map(lt => (
              <button key={lt.id} type="button" onClick={() => capture(lt)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] \${active===lt.id?'border-slate-600 bg-slate-100':'border-slate-200 bg-white'}\`}>{lt.label}</button>
            ))}
            <button type="button" onClick={reset} className="text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
          </__D__>
          <__D__ className="lg:w-1/2 p-6">
            <p className="text-xs font-bold text-slate-500 mb-2">AUDIT STREAM</p>
            {logs.length===0 ? <p className="text-sm text-slate-400">คลิกประเภท Log เพื่อจำลอง</p> : logs.map((e,i)=><p key={i} className="text-xs font-mono mb-2 p-2 bg-slate-900 text-green-300 rounded">[{e.time}] {e.msg}</p>)}
            <p className="text-sm font-bold mt-4 mb-3 leading-relaxed">คำสั่ง SQL ที่ทำให้เว็บช้า ดู Log ใด?</p>
            {[{v:'slow',l:'Slow Query Log'},{v:'err',l:'Error Log'},{v:'gen',l:'General Query Log'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] \${quizDone&&o.v==='slow'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-slate-400 bg-slate-50':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </__D__>
        </__D__>
        <p className="px-5 py-3 bg-slate-100 text-sm border-b leading-relaxed">Slow Query Log ช่วยหาคำสั่งที่ต้อง Optimize</p>
        ${terminal}
      </__D__>
    </__D__>
  );
}`);

files['SQL21901_U5_L10_SQLIntegrityDemo.jsx'] = fix(`import React, { useState, useEffect, useRef } from 'react';
import { Link2, RefreshCcw, TerminalSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
export default function SQL21901_U5_L10_SQLIntegrityDemo() {
  const [depts] = useState([{ id: 1, name: 'IT' }, { id: 2, name: 'HR' }]);
  const [emps, setEmps] = useState([{ id: 1, name: 'สมชาย', dept_id: 1 }]);
  const [newDept, setNewDept] = useState('99');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([{ type: 'system', text: 'Integrity Simulator ready.' }]);
  const consoleRef = useRef(null);
  useEffect(() => { if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight; }, [consoleHistory]);
  const log = (t, type = 'system') => setConsoleHistory(p => [...p, { text: t, type }]);
  const tryInsert = () => {
    const id = parseInt(newDept, 10);
    log(\`mysql> INSERT INTO employees (name, dept_id) VALUES ('ใหม่', \${id});\`, 'command');
    if (depts.some(d => d.id === id)) {
      setEmps(e => [...e, { id: e.length + 1, name: 'ใหม่', dept_id: id }]);
      log('> 1 row inserted — Referential OK', 'success');
    } else {
      log('> ERROR 1452: Cannot add child row — FK constraint fails (Referential Integrity)', 'error');
    }
  };
  const reset = () => { setEmps([{ id: 1, name: 'สมชาย', dept_id: 1 }]); setNewDept('99'); setQuizAnswer(null); setQuizDone(false); log('> reset', 'system'); };
  const submitQuiz = () => {
    if (!quizAnswer) { log('> เลือกคำตอบ', 'error'); return; }
    setQuizDone(true);
    log(quizAnswer === 'ref' ? '> ถูกต้อง Referential Integrity' : '> ผิด', quizAnswer === 'ref' ? 'success' : 'error');
  };
  return (
    <__D__ className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      <__D__ className="bg-slate-50 border-b border-slate-200 p-5">
        <__D__ className="flex items-center gap-3 mb-2"><__D__ className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Link2 size={20}/></__D__><h3 className="font-display text-xl font-semibold text-slate-900">การรักษาความถูกต้องของข้อมูล</h3></__D__>
        <p className="font-base text-sm leading-relaxed text-slate-700">ทดลอง INSERT ที่ละเมิด Foreign Key</p>
      </__D__>
      <__D__ className="flex flex-col min-h-[500px]">
        <__D__ className="flex flex-col lg:flex-row flex-1 border-b border-slate-200">
          <__D__ className="lg:w-1/2 p-6 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            <p className="text-xs font-bold mb-2">departments (PK)</p>
            {depts.map(d=><p key={d.id} className="text-sm font-mono mb-1">id={d.id} {d.name}</p>)}
            <p className="text-xs font-bold mt-4 mb-2">employees (FK dept_id)</p>
            {emps.map(e=><p key={e.id} className="text-sm mb-1">{e.name} → dept {e.dept_id}</p>)}
            <label className="block text-sm mt-4">dept_id ใหม่<input value={newDept} onChange={e=>setNewDept(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md font-mono"/></label>
            <button type="button" onClick={tryInsert} className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><AlertTriangle size={16}/> ลอง INSERT</button>
            <button type="button" onClick={reset} className="mt-2 text-xs flex gap-1 border px-3 py-2 rounded-lg active:scale-95"><RefreshCcw size={12}/> รีเซ็ต</button>
          </__D__>
          <__D__ className="lg:w-1/2 p-6">
            <p className="text-sm font-bold mb-3 leading-relaxed">ห้ามใส่รหัสแผนกที่ไม่มีอยู่ = ประเภทใด?</p>
            {[{v:'ref',l:'Referential Integrity (FK)'},{v:'entity',l:'Entity Integrity (PK)'},{v:'domain',l:'Domain Integrity'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>!quizDone&&setQuizAnswer(o.v)} className={\`w-full text-left p-3 mb-2 rounded-lg border-2 text-sm active:scale-95 min-h-[44px] \${quizDone&&o.v==='ref'?'border-emerald-500 bg-emerald-50':quizAnswer===o.v?'border-indigo-300 bg-indigo-50':'border-slate-200'}\`}>{o.l}</button>
            ))}
            <button type="button" onClick={submitQuiz} disabled={quizDone} className="w-full bg-blue-600 text-white py-2 rounded-md active:scale-95 min-h-[44px] flex justify-center gap-2"><CheckCircle2 size={16}/> ตรวจคำตอบ</button>
          </__D__>
        </__D__>
        <p className="px-5 py-3 bg-indigo-50 text-sm border-b leading-relaxed">Foreign Key รักษา Referential Integrity</p>
        ${terminal}
      </__D__>
    </__D__>
  );
}`);

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), content, 'utf8');
  console.log('wrote', name);
}
