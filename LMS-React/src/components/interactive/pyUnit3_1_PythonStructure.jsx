import React, { useState } from 'react';
import {
  Code2,
  Copy,
  CheckCircle2,
  BookOpen,
  AlignLeft,
  GripVertical,
  Play,
  RotateCcw,
  FileCode2,
  TerminalSquare
} from 'lucide-react';

const TeacherTask = ({ title, taskText }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 border border-indigo-200 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-500 mb-1 tracking-widest uppercase">Instructor Task</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${copied
                ? 'bg-indigo-100 text-indigo-600 border border-indigo-300 shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]'
              }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

const BlockSimulator = () => {
  const initialBlocks = [
    { id: 'b1', code: 'print("สอบผ่าน!")', indent: 1, color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
    { id: 'b2', code: 'score = 85', indent: 0, color: 'border-blue-300 bg-blue-50 text-blue-800' },
    { id: 'b3', code: 'print("ยินดีด้วย")', indent: 1, color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
    { id: 'b4', code: 'if score >= 50:', indent: 0, color: 'border-purple-300 bg-purple-50 text-purple-800' },
  ];

  const [blocks, setBlocks] = useState([...initialBlocks]);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [output, setOutput] = useState('');

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndexStr = e.dataTransfer.getData('dragIndex');
    if (!dragIndexStr) return;
    const dragIndex = parseInt(dragIndexStr);
    
    if (dragIndex === dropIndex) return;

    const newBlocks = [...blocks];
    const [draggedItem] = newBlocks.splice(dragIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedItem);
    setBlocks(newBlocks);
    setStatus('idle');
    setOutput('');
  };

  const checkAnswer = () => {
    // Condition for success:
    // 0: score = 85
    // 1: if score >= 50:
    // 2 & 3: prints (any order)
    if (blocks[0].id === 'b2' && blocks[1].id === 'b4' && 
        (blocks[2].id === 'b1' || blocks[2].id === 'b3') &&
        (blocks[3].id === 'b1' || blocks[3].id === 'b3')) {
      setStatus('success');
      setOutput("สอบผ่าน!\nยินดีด้วย");
    } else {
      setStatus('error');
      if (blocks[0].id === 'b4') {
        setOutput("NameError: name 'score' is not defined\n(ต้องกำหนดค่าตัวแปรก่อนเรียกใช้)");
      } else if (blocks[1].id !== 'b4') {
        setOutput("IndentationError: expected an indented block after 'if' statement\n(ตรวจสอบว่าคำสั่งอะไรควรอยู่หลัง if)");
      } else {
        setOutput("SyntaxError: invalid syntax\n(ลำดับบล็อกโค้ดไม่ถูกต้อง)");
      }
    }
  };

  const reset = () => {
    setBlocks([...initialBlocks]);
    setStatus('idle');
    setOutput('');
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <AlignLeft className="w-6 h-6 text-indigo-500" />
          เครื่องจำลองจัดเรียงบล็อกโค้ด (Indentation Puzzle)
        </h3>
        <p className="text-slate-500 mt-2">ลากวางบล็อกโค้ดด้านล่างให้ถูกต้องตามลำดับและกฎ Indentation ของ Python</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {/* Workspace */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-700">พื้นที่จัดเรียงโค้ด (ลากเพื่อสลับที่)</h4>
            <button onClick={reset} className="text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-1 text-sm">
              <RotateCcw className="w-4 h-4" /> รีเซ็ต
            </button>
          </div>
          
          <div className="flex flex-col gap-3 flex-grow relative pb-8">
            {blocks.map((block, index) => (
              <div 
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`group cursor-grab active:cursor-grabbing flex items-center gap-3 p-3 rounded-xl border-2 transition-all hover:shadow-md bg-white ${block.color}`}
                style={{ marginLeft: `${block.indent * 2}rem` }}
              >
                <div className="text-slate-300 group-hover:text-slate-500 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>
                <code className="font-mono font-bold text-[15px]">{block.code}</code>
              </div>
            ))}
          </div>

          <button 
            onClick={checkAnswer}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors active:scale-98 shadow-lg shadow-indigo-200"
          >
            <Play className="w-5 h-5 fill-current" /> รันโปรแกรมตรวจสอบ
          </button>
        </div>

        {/* Console / Result */}
        <div className="bg-[#1e1e1e] rounded-3xl p-6 flex flex-col shadow-2xl border border-slate-800">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-400 font-mono text-sm ml-2">terminal output</span>
          </div>

          <div className="flex-grow font-mono text-[14px] leading-relaxed">
            {status === 'idle' && (
              <span className="text-slate-500 italic">รอการจัดเรียง และรันโปรแกรม...</span>
            )}
            {status === 'success' && (
              <div className="text-emerald-400 whitespace-pre-wrap">
                <div className="flex items-center gap-2 mb-3 text-emerald-300 pb-2 border-b border-emerald-900/50">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold">เยี่ยมมาก! โค้ดทำงานได้ถูกต้อง</span>
                </div>
                {output}
              </div>
            )}
            {status === 'error' && (
              <div className="text-rose-400 whitespace-pre-wrap">
                <div className="flex items-center gap-2 mb-2 text-rose-300 font-bold">
                  เกิดข้อผิดพลาด:
                </div>
                {output}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const teacherTaskContent = `กิจกรรมปฏิบัติ: "นักสืบโค้ดและจิ๊กซอว์ Python"

ข้อที่ 1: การสังเกตและเปรียบเทียบ
ให้นักเรียนลองสังเกตโค้ด Python เทียบกับภาษา C/Java แล้วอภิปรายร่วมกันว่า:
- ภาษา Python ไม่มีอะไรที่ภาษาอื่นมักจะมี? (ตอบ: เครื่องหมายปีกกา { } และเซมิโคลอน ;)
- Python ใช้อะไรแทนการใส่วงเล็บปีกกา? (ตอบ: การเว้นวรรคย่อหน้า หรือ Indentation)

ข้อที่ 2: ปริศนาย่อหน้า (Indentation Puzzle)
ให้นักเรียนเขียนโค้ดด้านล่างลงในสมุด โดยเว้นย่อหน้าให้ถูกต้อง (สมมติให้ใช้ 4 เคาะ)
temperature = 35
if temperature > 30:
print("อากาศร้อนมาก")
print("อย่าลืมดื่มน้ำเยอะๆ")
print("จบการทำงาน")`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-[120px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-b border-slate-200/60 pb-8">
            <h2 className="text-sm font-bold tracking-widest text-indigo-600 mb-4 uppercase">
              หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              โครงสร้างโค้ด Python <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">(Python Structure & Syntax)</span>
            </h1>
          </div>

          <div className="pt-6 border-l-4 border-indigo-500 pl-6 mt-4">
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              จุดเด่นที่ทำให้ภาษา Python ได้รับความนิยมสูงสุด คือ <strong>"ความเรียบง่ายและอ่านง่าย"</strong> โค้ดของ Python ถูกออกแบบมาให้ใกล้เคียงกับภาษาอังกฤษ และตัดเครื่องหมายสัญลักษณ์ที่ซับซ้อนทิ้งไป
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section 3.1.1 Syntax */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-indigo-500" />
            3.1.1 รูปแบบคำสั่งและไวยากรณ์เบื้องต้น
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-rose-100 shadow-md relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold text-rose-700 mb-4">ภาษาอื่น (เช่น C, Java)</h3>
              <p className="text-sm text-slate-600 mb-6">ต้องใช้ปีกกา <code className="bg-slate-100 px-1 rounded">{`{}`}</code> เพื่อจัดกลุ่ม และใช้เซมิโคลอน <code className="bg-slate-100 px-1 rounded">;</code> เพื่อจบคำสั่ง</p>
              
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-loose">
                <span className="text-purple-400">if</span> <span className="text-slate-300">(score &gt;= 50)</span> <span className="text-yellow-400">{`{`}</span><br/>
                &nbsp;&nbsp;<span className="text-blue-400">print</span><span className="text-slate-300">("Pass")</span><span className="text-rose-400 font-bold">;</span><br/>
                <span className="text-yellow-400">{`}`}</span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-indigo-100 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold text-indigo-700 mb-4">ภาษา Python</h3>
              <p className="text-sm text-slate-600 mb-6">ใช้ <strong>"การขึ้นบรรทัดใหม่"</strong> เพื่อจบคำสั่ง และใช้โคลอน <code className="bg-slate-100 px-1 rounded">:</code> ร่วมกับ <strong>"ย่อหน้า"</strong></p>
              
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-loose border-2 border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                <span className="text-purple-400">if</span> <span className="text-slate-300">score &gt;= 50</span><span className="text-amber-400 font-bold">:</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span><span className="text-slate-300">("Pass")</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3.1.2 Indentation */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 border border-slate-800 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-400">
              <TerminalSquare className="w-8 h-8" />
              3.1.2 การเว้นวรรคและย่อหน้า (Indentation)
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-3xl">
              ในภาษา Python การเว้นวรรคข้างหน้าคำสั่ง (Indentation) <strong>ไม่ใช่แค่ความสวยงาม แต่เป็นไวยากรณ์ที่บังคับ!</strong> เพื่อให้คอมพิวเตอร์รู้ว่าคำสั่งใดอยู่ภายใต้บล็อกเดียวกัน 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-slate-400 font-bold mb-3">กฎของการย่อหน้า</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>นิยมใช้การเว้นวรรค (Space) <strong>4 เคาะ</strong> ต่อ 1 ระดับ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>สามารถใช้ปุ่ม Tab แทนการเคาะเว้นวรรค 4 ครั้งได้ในโปรแกรมเขียนโค้ด</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-rose-200">หากเว้นย่อหน้าผิดระดับ โค้ดจะพังทันที (IndentationError)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-indigo-900/30 border-l-4 border-indigo-500 p-5 rounded-r-xl">
                  <strong className="text-indigo-300 block mb-2">รู้หรือไม่?</strong> 
                  <p className="text-sm text-indigo-100/70">การบังคับย่อหน้าแบบนี้ ทำให้โปรแกรมเมอร์ทั่วโลกเขียนโค้ด Python ออกมาเป็นระเบียบและหน้าตาคล้ายคลึงกัน ส่งผลให้อ่านและแก้ไขโค้ดของคนอื่นได้ง่ายมาก!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <BlockSimulator />

        {/* Teacher Task */}
        <TeacherTask title="กิจกรรมปฏิบัติในห้องเรียน" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
