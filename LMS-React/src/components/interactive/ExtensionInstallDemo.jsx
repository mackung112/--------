import React, { useState } from 'react';
import { Puzzle, Download, Check, Star, CheckCircle2, XCircle, AlertCircle, RotateCcw, MousePointerClick } from 'lucide-react';

export default function ExtensionInstallDemo() {
  const [installed, setInstalled] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selectedExt, setSelectedExt] = useState(null);

  const extensions = [
    { id: 'python', name: 'Python', author: 'Microsoft', desc: 'IntelliSense, Linting, Debug, Code Navigation สำหรับ Python', essential: true, stars: '4.8', downloads: '120M', color: 'bg-blue-500' },
    { id: 'pylance', name: 'Pylance', author: 'Microsoft', desc: 'Fast & Feature-rich Language Support ช่วยให้ VS Code เข้าใจ Python ได้ดีขึ้น', essential: true, stars: '4.7', downloads: '80M', color: 'bg-indigo-500' },
    { id: 'prettier', name: 'Prettier', author: 'Prettier', desc: 'จัดรูปแบบโค้ดให้สวยงามอัตโนมัติ', essential: false, stars: '4.5', downloads: '45M', color: 'bg-pink-500' },
    { id: 'material-icon', name: 'Material Icon', author: 'PKief', desc: 'เปลี่ยนไอคอนไฟล์ในแถบด้านข้างให้สวยงามและแยกประเภทได้ชัดเจน', essential: false, stars: '4.9', downloads: '25M', color: 'bg-amber-500' },
    { id: 'live-share', name: 'Live Share', author: 'Microsoft', desc: 'เขียนโค้ดร่วมกันแบบเรียลไทม์ เหมาะสำหรับทำงานกลุ่ม', essential: false, stars: '4.3', downloads: '18M', color: 'bg-emerald-500' },
  ];

  const showToast = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleInstall = (id) => {
    if (installed[id]) return;
    setInstalled(prev => ({ ...prev, [id]: true }));
    const ext = extensions.find(e => e.id === id);
    showToast(`ติดตั้ง ${ext.name} สำเร็จ!`, 'success');
  };

  const essentialInstalled = extensions.filter(e => e.essential).every(e => installed[e.id]);

  // Quiz
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  return (
    <div className="space-y-12 my-8">
      {/* 1. Extension Marketplace Simulator */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5 flex items-center gap-3">
          <Puzzle size={24} />
          <h3 className="font-bold text-lg">จำลองหน้า Extension Marketplace</h3>
          <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
            ติดตั้งแล้ว {Object.keys(installed).length}/{extensions.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Extension List */}
          <div className="lg:col-span-3 divide-y divide-slate-100">
            {extensions.map(ext => (
              <div key={ext.id} onClick={() => setSelectedExt(ext.id)}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-slate-50 ${selectedExt === ext.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}>
                <div className={`w-10 h-10 ${ext.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow`}>
                  {ext.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{ext.name}</span>
                    {ext.essential && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">จำเป็น</span>}
                  </div>
                  <div className="text-xs text-slate-500">{ext.author} • <Star size={10} className="inline text-amber-400" /> {ext.stars} • <Download size={10} className="inline" /> {ext.downloads}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleInstall(ext.id); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${installed[ext.id] ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow'}`}>
                  {installed[ext.id] ? <span className="flex items-center gap-1"><Check size={14} /> ติดตั้งแล้ว</span> : 'Install'}
                </button>
              </div>
            ))}
          </div>

          {/* Extension Detail */}
          <div className="lg:col-span-2 p-6 bg-slate-50 border-l border-slate-200 min-h-[200px] flex items-center justify-center">
            {selectedExt ? (() => {
              const ext = extensions.find(e => e.id === selectedExt);
              return (
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${ext.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow`}>{ext.name[0]}</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{ext.name}</h4>
                      <div className="text-sm text-slate-500">{ext.author}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">{ext.desc}</p>
                  {ext.essential && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                      ⚠️ <strong>จำเป็นต้องติดตั้ง!</strong> Extension นี้จำเป็นสำหรับการเรียนวิชานี้
                    </div>
                  )}
                </div>
              );
            })() : (
              <div className="text-center text-slate-500">
                <MousePointerClick className="text-slate-300 mx-auto mb-3" size={32} />
                คลิกที่ Extension เพื่อดูรายละเอียด
              </div>
            )}
          </div>
        </div>

        {essentialInstalled && (
          <div className="bg-emerald-50 border-t border-emerald-200 p-4 flex items-center gap-3 text-emerald-700">
            <CheckCircle2 /> <span className="font-semibold">ยอดเยี่ยม! คุณติดตั้ง Extension ที่จำเป็นครบหมดแล้ว</span>
          </div>
        )}
      </section>

      {/* 2. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">Extension ตัวใดที่ <strong className="text-yellow-300">จำเป็นที่สุด</strong> สำหรับเขียน Python ใน VS Code?</p>

        <div className="space-y-3 my-6">
          {[
            { val: 'python', label: 'Python (Microsoft)', correct: true },
            { val: 'prettier', label: 'Prettier' },
            { val: 'live-share', label: 'Live Share' },
            { val: 'material-icon', label: 'Material Icon Theme' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' :
                quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' :
                quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' :
                'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}>
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => {
            if (!quizAnswer) { showToast('กรุณาเลือกคำตอบก่อน', 'warning'); return; }
            setQuizChecked(true);
            if (quizAnswer === 'python') showToast('ถูกต้อง! Python Extension ของ Microsoft เป็นสิ่งจำเป็นที่สุด', 'success');
            else showToast('ยังไม่ถูกต้อง: Extension ที่จำเป็นที่สุดคือ Python ของ Microsoft', 'error');
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
