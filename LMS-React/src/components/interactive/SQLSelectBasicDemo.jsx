import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Play, CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';

export default function SQLSelectBasicDemo() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to SQL Terminal Quest v1.0' },
    { type: 'system', text: 'Type your SQL commands to complete the mission.' },
    { type: 'system', text: '---' },
  ]);
  const [input, setInput] = useState('');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const endRef = useRef(null);

  const missions = {
    1: {
      goal: 'ดึงข้อมูลทั้งหมดจากตาราง employees',
      table: 'employees',
      hint: 'ใช้ SELECT * FROM ชื่อตาราง',
      regex: /^\s*select\s+\*\s+from\s+employees\s*;?\s*$/i,
      successData: [
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob', role: 'User' }
      ]
    },
    2: {
      goal: 'ดึงเฉพาะคอลัมน์ name จากตาราง employees',
      table: 'employees',
      hint: 'ใช้ SELECT ชื่อคอลัมน์ FROM ชื่อตาราง',
      regex: /^\s*select\s+name\s+from\s+employees\s*;?\s*$/i,
      successData: [
        { name: 'Alice' },
        { name: 'Bob' }
      ]
    },
    3: {
      goal: 'Mission Complete! คุณจบหลักสูตร Terminal แล้ว',
      table: '',
      hint: '',
      regex: null,
      successData: []
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim() || level > 2) return;

    const cmd = input;
    setInput('');
    setHistory(prev => [...prev, { type: 'user', text: `> ${cmd}` }]);

    const currentMission = missions[level];
    
    // Check answer
    if (currentMission.regex.test(cmd)) {
      setTimeout(() => {
        setHistory(prev => [
          ...prev, 
          { type: 'success', text: `Query OK. ${currentMission.successData.length} rows affected.` },
          { type: 'data', data: currentMission.successData }
        ]);
        setScore(prev => prev + 100);
        
        setTimeout(() => {
          setLevel(prev => prev + 1);
          setHistory(prev => [...prev, { type: 'system', text: '---' }, { type: 'system', text: `Level UP! New Mission Unlocked.` }]);
        }, 1500);
      }, 500);
    } else {
      setTimeout(() => {
        setHistory(prev => [
          ...prev, 
          { type: 'error', text: `ERROR: You have an error in your SQL syntax or it does not match the mission goal.` }
        ]);
      }, 500);
    }
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-slate-800 text-green-400 rounded-xl shrink-0">
          <Terminal size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Terminal Query Quest</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ฝึกพิมพ์คำสั่งดึงข้อมูล SELECT ลงใน Terminal จำลอง ทำภารกิจให้สำเร็จเพื่อเก็บคะแนนสะสม!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mission Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-indigo-600 p-4 text-white font-bold flex justify-between items-center">
              <span>🎯 ภารกิจที่ {level > 2 ? 'สำเร็จ' : level}</span>
              <span className="flex items-center gap-1 text-yellow-300"><Award size={18}/> {score} XP</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{missions[level].goal}</h3>
              {level <= 2 && (
                <>
                  <p className="text-slate-500 text-sm mb-4">ตารางเป้าหมาย: <code className="bg-slate-100 text-pink-600 px-1 rounded">{missions[level].table}</code></p>
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
                    <strong>คำใบ้:</strong> {missions[level].hint}
                  </div>
                </>
              )}
              {level > 2 && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-emerald-800 text-center font-bold">
                  🎉 ยินดีด้วย! คุณพิมพ์คำสั่ง SELECT พื้นฐานได้คล่องแล้ว
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-sm text-slate-500">
            <strong>ตารางที่มีในระบบ:</strong><br/>
            - employees (id, name, role)
          </div>
        </div>

        {/* Terminal Window */}
        <div className="lg:col-span-2 bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col h-[400px]">
          <div className="bg-[#323233] p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-slate-400 text-xs font-semibold tracking-wider">mysql -u root -p</div>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto font-mono text-sm sm:text-base space-y-2">
            {history.map((h, i) => (
              <div key={i} className="mb-1">
                {h.type === 'system' && <div className="text-sky-400">{h.text}</div>}
                {h.type === 'user' && <div className="text-white">{h.text}</div>}
                {h.type === 'error' && <div className="text-red-400 flex items-start gap-2"><XCircle size={16} className="mt-0.5 shrink-0"/> <span>{h.text}</span></div>}
                {h.type === 'success' && <div className="text-green-400 flex items-center gap-2"><CheckCircle2 size={16}/> {h.text}</div>}
                {h.type === 'data' && (
                  <div className="mt-2 mb-4 bg-[#2D2D2D] border border-slate-700 rounded-lg overflow-hidden inline-block">
                    <table className="text-left text-slate-300">
                      <thead className="bg-[#3D3D3D] border-b border-slate-600">
                        <tr>
                          {Object.keys(h.data[0]).map(k => <th key={k} className="px-4 py-2 border-r border-slate-600 last:border-0">{k}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {h.data.map((row, j) => (
                          <tr key={j} className="border-b border-slate-700 last:border-0">
                            {Object.values(row).map((v, k) => <td key={k} className="px-4 py-2 border-r border-slate-700 last:border-0">{v}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef}></div>
            
            {level <= 2 && (
              <form onSubmit={handleCommand} className="flex items-center text-white mt-2">
                <span className="text-green-400 mr-2 flex items-center"><ChevronRight size={16}/></span>
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 font-mono text-yellow-300 caret-white"
                  autoFocus
                  placeholder="พิมพ์ SQL ที่นี่แล้วกด Enter..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
