import { useState } from 'react';
import { Layout, Monitor, Code, Settings, PlusSquare, Type, Square, LayoutGrid, CheckCircle } from 'lucide-react';

const layoutOptions = [
  { id: 'grid', name: 'Grid Layout', desc: 'จัดวางแบบตาราง (แถว, คอลัมน์)' },
  { id: 'pack', name: 'Pack Layout', desc: 'จัดเรียงต่อกันบนลงล่าง' }
];

export default function OOP21910_U3_L7_TkinterPreviewer() {
  const [layoutStyle, setLayoutStyle] = useState('grid');
  const [bgColor, setBgColor] = useState('#f0f0f0');
  const [btnColor, setBtnColor] = useState('#4f46e5');
  const [elements, setElements] = useState([
    { id: 1, type: 'label', text: 'เข้าสู่ระบบ', row: 0, col: 0, colspan: 2 },
    { id: 2, type: 'label', text: 'ชื่อผู้ใช้:', row: 1, col: 0, colspan: 1 },
    { id: 3, type: 'entry', text: '', row: 1, col: 1, colspan: 1 },
    { id: 4, type: 'label', text: 'รหัสผ่าน:', row: 2, col: 0, colspan: 1 },
    { id: 5, type: 'entry', text: '', row: 2, col: 1, colspan: 1 },
    { id: 6, type: 'button', text: 'Login', row: 3, col: 0, colspan: 2 }
  ]);

  // Code generator
  const generateCode = () => {
    let code = `import tkinter as tk\n\nroot = tk.Tk()\nroot.title("ระบบล็อกอิน")\nroot.geometry("300x250")\nroot.configure(bg="${bgColor}")\n\n`;
    
    elements.forEach((el, index) => {
      const varName = `${el.type}_${index + 1}`;
      if (el.type === 'label') {
        code += `${varName} = tk.Label(root, text="${el.text}", bg="${bgColor}")\n`;
      } else if (el.type === 'entry') {
        code += `${varName} = tk.Entry(root)\n`;
      } else if (el.type === 'button') {
        code += `${varName} = tk.Button(root, text="${el.text}", bg="${btnColor}", fg="white")\n`;
      }

      if (layoutStyle === 'grid') {
        code += `${varName}.grid(row=${el.row}, column=${el.col}, columnspan=${el.colspan}, pady=5, padx=5)\n\n`;
      } else {
        code += `${varName}.pack(pady=5)\n\n`;
      }
    });

    code += `root.mainloop()`;
    return code;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Monitor className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Tkinter GUI Builder Previewer</h2>
          <p className="text-emerald-100 mt-1">ทดลองปรับแต่ง UI แล้วดูโค้ด Python ที่สร้างขึ้นโดยอัตโนมัติ</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Left: Controls & Python Code */}
        <div className="p-6 md:p-8 bg-slate-50 border-r border-slate-200 flex flex-col">
          
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-teal-600" />
              ตั้งค่าหน้าต่าง (Window Settings)
            </h3>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">รูปแบบการจัดวาง (Layout)</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {layoutOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setLayoutStyle(opt.id)}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${layoutStyle === opt.id ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {opt.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">สีปุ่ม (Button Color)</label>
                <div className="flex gap-2">
                  {['#4f46e5', '#10b981', '#ef4444', '#f59e0b'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setBtnColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${btnColor === c ? 'border-slate-800 ring-2 ring-slate-300' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-teal-600" />
              โค้ด Python (Tkinter)
            </h3>
            <div className="flex-1 bg-slate-900 rounded-xl p-4 overflow-auto relative group">
              <pre className="text-sm font-mono text-emerald-400">
                <code>{generateCode()}</code>
              </pre>
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                อ่านโค้ดนี้เพื่อนำไปใช้จริง
              </div>
            </div>
          </div>
        </div>

        {/* Right: GUI Preview */}
        <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-100">
          
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 w-full max-w-sm">
            <Layout className="w-5 h-5 text-teal-600" />
            ผลลัพธ์หน้าจอ (GUI Preview)
          </h3>

          {/* Simulated OS Window */}
          <div className="w-full max-w-sm bg-white rounded-t-lg rounded-b-md shadow-2xl overflow-hidden border border-slate-300">
            {/* Window Title Bar */}
            <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-bold text-slate-600 font-sans">ระบบล็อกอิน</div>
              <div className="w-12"></div>
            </div>

            {/* Window Content */}
            <div 
              className="p-6 min-h-[250px] transition-colors duration-500"
              style={{ backgroundColor: bgColor }}
            >
              {layoutStyle === 'grid' ? (
                // Grid Layout Simulation
                <div className="grid grid-cols-2 gap-4">
                  {elements.map(el => {
                    let colSpanClass = el.colspan === 2 ? 'col-span-2' : 'col-span-1';
                    
                    if (el.type === 'label') {
                      return <div key={el.id} className={`${colSpanClass} ${el.colspan === 2 ? 'text-center text-lg font-bold mb-2' : 'text-right pr-2'} flex items-center justify-end`}>{el.text}</div>;
                    }
                    if (el.type === 'entry') {
                      return <div key={el.id} className={`${colSpanClass}`}><input type="text" className="w-full border border-slate-300 px-2 py-1 bg-white focus:outline-none" disabled /></div>;
                    }
                    if (el.type === 'button') {
                      return (
                        <div key={el.id} className={`${colSpanClass} mt-4`}>
                          <button 
                            className="w-full text-white py-1.5 px-4 rounded shadow-sm hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: btnColor }}
                          >
                            {el.text}
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                // Pack Layout Simulation
                <div className="flex flex-col items-center gap-3">
                  {elements.map(el => {
                    if (el.type === 'label') {
                      return <div key={el.id} className={el.colspan === 2 ? 'text-lg font-bold mb-2' : ''}>{el.text}</div>;
                    }
                    if (el.type === 'entry') {
                      return <div key={el.id} className="w-3/4"><input type="text" className="w-full border border-slate-300 px-2 py-1 bg-white focus:outline-none" disabled /></div>;
                    }
                    if (el.type === 'button') {
                      return (
                        <div key={el.id} className="w-1/2 mt-2">
                          <button 
                            className="w-full text-white py-1.5 px-4 rounded shadow-sm hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: btnColor }}
                          >
                            {el.text}
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            💡 ลองเปลี่ยนรูปแบบ Layout เพื่อดูความแตกต่างของ <code>.grid()</code> และ <code>.pack()</code>
          </div>

        </div>
      </div>
    </div>
  );
}
