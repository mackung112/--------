import React, { useState, useEffect, useRef } from 'react';
import { FolderOpen, File, ChevronRight, ChevronDown, Terminal, RotateCcw, MousePointerClick } from 'lucide-react';

export default function OOP21910_U1_L7_ProjectStructureDemo() {
  const [expandedFolders, setExpandedFolders] = useState({ root: true, src: true, assets: false, tests: false });
  const [selectedItem, setSelectedItem] = useState(null);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'Project Structure Explorer Initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const correctStructure = {
    name: 'my_oop_project', type: 'folder', desc: 'โฟลเดอร์หลักของโปรเจกต์', children: [
      { name: 'src', type: 'folder', desc: 'ย่อมาจาก source ใช้เก็บไฟล์โค้ดหลักทั้งหมด', children: [
        { name: 'main.py', type: 'file', desc: 'ไฟล์หลักที่ใช้สั่งรันโปรแกรม', icon: '🐍', code: 'from student import Student\n\ns = Student("Mac")\nprint(f"Hello {s.name}")' },
        { name: 'student.py', type: 'file', desc: 'ไฟล์เก็บคลาส Student แยกเป็นสัดส่วน', icon: '🐍', code: 'class Student:\n    def __init__(self, name):\n        self.name = name' },
      ]},
      { name: 'assets', type: 'folder', desc: 'เก็บไฟล์สื่อ เช่น รูปภาพ, ไอคอน, เสียง, หรือข้อมูล', children: [
        { name: 'logo.png', type: 'file', desc: 'ไฟล์รูปโลโก้', icon: '🖼️' },
      ]},
      { name: 'tests', type: 'folder', desc: 'เก็บไฟล์สำหรับรันระบบทดสอบอัตโนมัติ (Unit Test)', children: [
        { name: 'test_student.py', type: 'file', desc: 'โค้ดทดสอบคลาส Student', icon: '🧪' },
      ]},
      { name: 'README.md', type: 'file', desc: 'คู่มือหรือคำอธิบายโปรเจกต์ (Markdown)', icon: '📄', code: '# My OOP Project\nThis is a sample project.' },
      { name: 'requirements.txt', type: 'file', desc: 'รายชื่อไลบรารีที่จำเป็น (เพื่อใช้กับคำสั่ง pip install -r)', icon: '📋', code: 'requests==2.31.0\nnumpy==1.26.4' },
    ]
  };

  const toggleFolder = (key) => {
    setExpandedFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (node) => {
    setSelectedItem(node);
    setConsoleHistory(prev => [
      ...prev,
      { type: 'system', text: `Selected: ${node.name} (${node.type})` }
    ]);
  };

  const renderTree = (node, depth = 0, parentKey = '') => {
    const key = parentKey ? `${parentKey}/${node.name}` : node.name;
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.name];

    return (
      <div key={key}>
        <button
          onClick={() => { if (isFolder) toggleFolder(node.name); handleSelect(node); }}
          className={`w-full text-left flex items-center gap-2 py-1.5 px-2 transition-all text-sm hover:bg-[#2a2d2e] ${selectedItem?.name === node.name ? 'bg-[#37373d] text-white' : 'text-slate-300'}`}
          style={{ paddingLeft: `${depth * 15 + 10}px` }}
        >
          {isFolder ? (
            isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
          ) : <span className="w-3.5" />}
          {isFolder ? <FolderOpen size={14} className="text-amber-400" /> : <span className="text-xs">{node.icon || '📄'}</span>}
          <span className={`font-mono text-xs ${isFolder ? 'font-bold text-slate-200' : 'text-slate-300'}`}>{node.name}</span>
        </button>
        {isFolder && isExpanded && node.children?.map(child => renderTree(child, depth + 1, key))}
      </div>
    );
  };

  const simulateRun = () => {
    if (selectedItem?.name === 'main.py') {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ python src/main.py' },
        { type: 'output', text: 'Hello Mac' }
      ]);
    } else {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'system', text: 'Please select main.py and click Run' }
      ]);
    }
  };

  const clear = () => {
    setSelectedItem(null);
    setExpandedFolders({ root: true, src: true, assets: false, tests: false });
    setConsoleHistory([{ type: 'system', text: 'Project Structure Explorer Initialized.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <FolderOpen size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การจัดโครงสร้างโปรเจกต์</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้มาตรฐานการจัดเก็บไฟล์ โฟลเดอร์ที่จำเป็นต้องมีในโปรเจกต์ Python ขนาดกลาง-ใหญ่
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: VS Code File Explorer */}
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-[#252526] select-none">
            <div className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700/50">
              Explorer
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {renderTree(correctStructure)}
            </div>
          </div>

          {/* Right: Info / Code Preview */}
          <div className="flex-1 bg-white p-6 flex flex-col">
            {selectedItem ? (
              <div className="animate-in fade-in h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                    {selectedItem.type === 'folder' ? '📂' : selectedItem.icon || '📄'}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-800 font-mono">{selectedItem.name}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide ${selectedItem.type === 'folder' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {selectedItem.type}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-6 shadow-sm">
                  <h5 className="font-bold text-slate-700 text-sm mb-1">หน้าที่/ความสำคัญ</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedItem.desc}
                  </p>
                </div>

                {selectedItem.type === 'file' && selectedItem.code && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-slate-700 text-sm">ตัวอย่างภายในไฟล์</h5>
                      {selectedItem.name === 'main.py' && (
                        <button onClick={simulateRun} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1">
                          <Play size={12} /> ลองรันไฟล์นี้
                        </button>
                      )}
                    </div>
                    <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-xs text-slate-300 flex-1 whitespace-pre-wrap leading-loose shadow-inner border border-slate-700">
                      {selectedItem.code.split('\n').map((line, i) => {
                        let formattedLine = line;
                        if (line.includes('class ') || line.includes('def ')) formattedLine = <span className="text-pink-400">{line}</span>;
                        else if (line.includes('import ')) formattedLine = <span className="text-pink-400">{line}</span>;
                        else if (line.includes('print(')) formattedLine = <><span className="text-sky-300">print</span>(<span className="text-orange-300">{line.substring(line.indexOf('(')+1, line.lastIndexOf(')'))}</span>)</>;
                        return <div key={i}>{formattedLine}</div>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <MousePointerClick size={32} className="mb-2 opacity-50" />
                <p className="text-sm">คลิกที่โฟลเดอร์หรือไฟล์ใน Explorer ด้านซ้าย</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Terminal */}
        <div className="h-40 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
            </div>
            <button onClick={clear} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors">
              <RotateCcw size={14} /> Reset Explorer
            </button>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">$</span>{line.text}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
