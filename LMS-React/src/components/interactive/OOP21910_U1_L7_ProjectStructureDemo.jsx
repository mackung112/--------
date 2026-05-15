import React, { useState } from 'react';
import { FolderOpen, File, FolderPlus, FilePlus, CheckCircle2, XCircle, AlertCircle, RotateCcw, ChevronRight, ChevronDown, Lightbulb } from 'lucide-react';

export default function OOP21910_U1_L7_ProjectStructureDemo() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [expandedFolders, setExpandedFolders] = useState({ root: true, src: true, assets: false, tests: false });

  const correctStructure = {
    name: 'my_oop_project', type: 'folder', children: [
      { name: 'src', type: 'folder', desc: 'เก็บไฟล์โค้ดหลักทั้งหมด', children: [
        { name: 'main.py', type: 'file', desc: 'ไฟล์หลักที่ใช้รันโปรแกรม', icon: '🐍' },
        { name: 'student.py', type: 'file', desc: 'ไฟล์คลาส Student', icon: '🐍' },
        { name: 'product.py', type: 'file', desc: 'ไฟล์คลาส Product', icon: '🐍' },
      ]},
      { name: 'assets', type: 'folder', desc: 'เก็บไฟล์รูปภาพ, ไอคอน, ฟอนต์', children: [
        { name: 'logo.png', type: 'file', desc: 'รูปโลโก้โปรเจกต์', icon: '🖼️' },
      ]},
      { name: 'tests', type: 'folder', desc: 'เก็บไฟล์ทดสอบ (Unit Test)', children: [
        { name: 'test_student.py', type: 'file', desc: 'ไฟล์ทดสอบคลาส Student', icon: '🧪' },
      ]},
      { name: 'README.md', type: 'file', desc: 'เอกสารอธิบายโปรเจกต์', icon: '📄' },
      { name: 'requirements.txt', type: 'file', desc: 'รายชื่อไลบรารีที่ใช้ (pip install -r)', icon: '📋' },
    ]
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const toggleFolder = (key) => {
    setExpandedFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTree = (node, depth = 0, parentKey = '') => {
    const key = parentKey ? `${parentKey}/${node.name}` : node.name;
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.name];

    return (
      <div key={key}>
        <button
          onClick={() => { if (isFolder) toggleFolder(node.name); setSelectedItem(node); }}
          className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg transition-all text-sm hover:bg-indigo-50 ${selectedItem?.name === node.name ? 'bg-indigo-100 text-indigo-700' : 'text-slate-700'}`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {isFolder ? (
            isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
          ) : <span className="w-3.5" />}
          {isFolder ? <FolderOpen size={16} className="text-amber-500" /> : <span className="text-xs">{node.icon || '📄'}</span>}
          <span className={`font-mono text-sm ${isFolder ? 'font-bold' : ''}`}>{node.name}</span>
        </button>
        {isFolder && isExpanded && node.children?.map(child => renderTree(child, depth + 1, key))}
      </div>
    );
  };

  const showToast = (msg, type) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Quiz
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  return (
    <div className="space-y-12 my-8">
      {/* 1. File Tree Explorer */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-5 flex items-center gap-3">
          <FolderOpen size={24} />
          <h3 className="font-bold text-lg">โครงสร้างโฟลเดอร์โปรเจกต์ OOP</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* File Tree */}
          <div className="p-6 bg-slate-50 border-r border-slate-200">
            <p className="text-sm text-slate-500 mb-4">คลิกที่โฟลเดอร์/ไฟล์เพื่อดูคำอธิบาย</p>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              {renderTree(correctStructure)}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="p-6 flex items-center justify-center min-h-[250px]">
            {selectedItem ? (
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3">
                  {selectedItem.type === 'folder' ? <FolderOpen size={28} className="text-amber-500" /> : <File size={28} className="text-slate-500" />}
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 font-mono">{selectedItem.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${selectedItem.type === 'folder' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {selectedItem.type === 'folder' ? 'โฟลเดอร์' : 'ไฟล์'}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{selectedItem.desc || 'ไม่มีคำอธิบาย'}</p>
                {selectedItem.type === 'folder' && selectedItem.children && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-500 font-bold mb-1">มีไฟล์ {selectedItem.children.length} รายการ:</div>
                    <div className="text-sm text-slate-600 font-mono">
                      {selectedItem.children.map(c => c.name).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <FolderOpen className="text-slate-300 mx-auto mb-3" size={32} />
                คลิกที่โฟลเดอร์หรือไฟล์<br />เพื่อดูคำอธิบาย
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Tips */}
      <section className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-indigo-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-indigo-800 mb-2">💡 เคล็ดลับการจัดโฟลเดอร์</h3>
            <ul className="text-indigo-700 text-sm space-y-1 list-disc list-inside">
              <li>แยกไฟล์โค้ดออกจากไฟล์สื่อ (รูปภาพ, เสียง) เสมอ</li>
              <li>ตั้งชื่อไฟล์เป็นภาษาอังกฤษ ใช้ตัวพิมพ์เล็ก คั่นด้วย _ (เช่น my_class.py)</li>
              <li>สร้าง <code className="bg-indigo-200/50 px-1 rounded">requirements.txt</code> ไว้เสมอ เพื่อให้คนอื่นติดตั้งไลบรารีได้ง่าย</li>
              <li>ไฟล์ <code className="bg-indigo-200/50 px-1 rounded">README.md</code> ช่วยอธิบายวิธีใช้งานโปรเจกต์</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">โฟลเดอร์ <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">src/</code> ควรใช้เก็บอะไร?</p>

        <div className="space-y-3 my-6">
          {[
            { val: 'code', label: 'ไฟล์โค้ด Python (.py) ที่เป็นส่วนหลักของโปรเจกต์', correct: true },
            { val: 'images', label: 'รูปภาพและสื่อต่างๆ' },
            { val: 'tests', label: 'ไฟล์ทดสอบ (Unit Test)' },
            { val: 'docs', label: 'เอกสารคู่มือการใช้งาน' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' :
                quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' :
                quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' :
                'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}>{opt.label}</button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => {
            if (!quizAnswer) { showToast('กรุณาเลือกคำตอบ', 'warning'); return; }
            setQuizChecked(true);
            showToast(quizAnswer === 'code' ? 'ถูกต้อง! src/ ใช้เก็บซอร์สโค้ดหลักของโปรเจกต์' : 'ไม่ถูกต้อง: src/ ย่อมาจาก source ใช้เก็บไฟล์โค้ดหลัก', quizAnswer === 'code' ? 'success' : 'error');
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
