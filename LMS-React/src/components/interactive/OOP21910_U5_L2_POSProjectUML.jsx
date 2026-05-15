import React, { useState, useEffect, useRef } from 'react';
import { Network, Database, ShoppingCart, ArrowRight, Store, Play, CircleDot } from 'lucide-react';

export default function OOP21910_U5_L2_POSProjectUML() {
  const [activeClass, setActiveClass] = useState('none');
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'UML Diagram Viewer initialized.' },
    { type: 'system', text: 'Hover over or click a class to view its details.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const classData = {
    'Product': {
      title: 'Class: Product',
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      desc: 'พิมพ์เขียวสำหรับสินค้าแต่ละชิ้น (Model)',
      attrs: ['id (รหัสสินค้า)', 'name (ชื่อ)', 'price (ราคา)', 'stock (จำนวนคงเหลือ)'],
      methods: ['update_stock()', 'get_info()'],
      color: 'border-emerald-300 bg-emerald-50',
      header: 'bg-emerald-200 text-emerald-800'
    },
    'CartItem': {
      title: 'Class: CartItem',
      icon: <ShoppingCart className="w-5 h-5 text-amber-600" />,
      desc: 'รายการสินค้าที่ถูกหยิบใส่ตะกร้า (เก็บจำนวนที่ซื้อ)',
      attrs: ['product (อ้างอิง Product obj)', 'qty (จำนวนที่ซื้อ)'],
      methods: ['get_subtotal()'],
      color: 'border-amber-300 bg-amber-50',
      header: 'bg-amber-200 text-amber-800'
    },
    'POSSystem': {
      title: 'Class: POSSystem',
      icon: <Store className="w-5 h-5 text-indigo-600" />,
      desc: 'ระบบหลัก (Controller) จัดการข้อมูลและควบคุมหน้าจอ',
      attrs: ['products (List ของ Product)', 'cart (List ของ CartItem)', 'total (ราคารวม)'],
      methods: ['add_to_cart()', 'remove_from_cart()', 'checkout()'],
      color: 'border-indigo-300 bg-indigo-50',
      header: 'bg-indigo-200 text-indigo-800'
    }
  };

  const handleSelect = (cls) => {
    setActiveClass(cls);
    if (cls !== 'none') {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ inspect_class("${cls}")` },
        { type: 'output', text: `> Methods: ${classData[cls].methods.join(', ')}` }
      ]);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-200 text-slate-700 rounded-lg">
            <Network size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">การออกแบบ Class Diagram (UML)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-500">
          เรียนรู้การออกแบบโครงสร้างคลาส ความสัมพันธ์ระหว่างคลาส และคุณสมบัติ (Attributes/Methods) สำหรับระบบ POS
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Left: Interactive Diagram */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-slate-50 relative flex items-center justify-center min-h-[450px]">
            <div className="absolute top-4 left-4">
              <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 bg-white/80 backdrop-blur px-3 py-1 rounded shadow-sm border border-slate-200">Interactive UML Diagram</h4>
            </div>

            <div className="w-full max-w-2xl relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 p-4">
              
              {/* Product Box */}
              <div 
                onMouseEnter={() => handleSelect('Product')}
                onMouseLeave={() => setActiveClass('none')}
                className={`w-48 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 z-10 ${activeClass === 'Product' ? 'border-emerald-500 scale-105 shadow-emerald-200/50 shadow-xl' : 'border-slate-300 hover:border-emerald-300'}`}
              >
                <div className="bg-emerald-50 p-2 font-bold text-center border-b border-emerald-100 text-emerald-800 flex justify-center gap-2 items-center text-sm">
                  <Database className="w-4 h-4" /> Product
                </div>
                <div className="p-3 text-[11px] font-mono border-b border-slate-100 text-slate-600 bg-white leading-relaxed">
                  + id<br/>+ name<br/>+ price<br/>+ stock
                </div>
                <div className="p-3 text-[11px] font-mono text-slate-500 bg-slate-50 leading-relaxed">
                  + get_info()<br/>+ update_stock()
                </div>
              </div>

              {/* Relation Line 1 */}
              <div className="hidden md:flex flex-col items-center relative w-20 z-0">
                <div className="text-[10px] font-bold text-slate-400 absolute -top-5 bg-slate-50/80 px-1 rounded">1..1</div>
                <ArrowRight className={`w-8 h-8 transition-colors ${activeClass === 'CartItem' || activeClass === 'Product' ? 'text-amber-400' : 'text-slate-300'}`} />
                <div className="text-[10px] font-bold text-slate-400 absolute -bottom-5 bg-slate-50/80 px-1 rounded">1..*</div>
              </div>

              <div className="md:hidden flex flex-col items-center h-12">
                 <div className="w-1 h-full bg-slate-200"></div>
              </div>

              {/* CartItem Box */}
              <div 
                onMouseEnter={() => handleSelect('CartItem')}
                onMouseLeave={() => setActiveClass('none')}
                className={`w-48 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 z-10 ${activeClass === 'CartItem' ? 'border-amber-500 scale-105 shadow-amber-200/50 shadow-xl' : 'border-slate-300 hover:border-amber-300'}`}
              >
                <div className="bg-amber-50 p-2 font-bold text-center border-b border-amber-100 text-amber-800 flex justify-center gap-2 items-center text-sm">
                  <ShoppingCart className="w-4 h-4" /> CartItem
                </div>
                <div className="p-3 text-[11px] font-mono border-b border-slate-100 text-slate-600 bg-white leading-relaxed">
                  + product (Ref)<br/>+ qty
                </div>
                <div className="p-3 text-[11px] font-mono text-slate-500 bg-slate-50 leading-relaxed">
                  + get_subtotal()
                </div>
              </div>

              {/* Relation Line 2 */}
              <div className="hidden md:flex flex-col items-center relative w-20 z-0">
                <div className="text-[10px] font-bold text-slate-400 absolute -top-5 bg-slate-50/80 px-1 rounded">1..*</div>
                <ArrowRight className={`w-8 h-8 transition-colors ${activeClass === 'POSSystem' || activeClass === 'CartItem' ? 'text-indigo-400' : 'text-slate-300'}`} />
                <div className="text-[10px] font-bold text-slate-400 absolute -bottom-5 bg-slate-50/80 px-1 rounded">1..1</div>
              </div>

              <div className="md:hidden flex flex-col items-center h-12">
                 <div className="w-1 h-full bg-slate-200"></div>
              </div>

              {/* POSSystem Box */}
              <div 
                onMouseEnter={() => handleSelect('POSSystem')}
                onMouseLeave={() => setActiveClass('none')}
                className={`w-52 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 z-10 ${activeClass === 'POSSystem' ? 'border-indigo-500 scale-105 shadow-indigo-200/50 shadow-xl' : 'border-slate-300 hover:border-indigo-300'}`}
              >
                <div className="bg-indigo-50 p-2 font-bold text-center border-b border-indigo-100 text-indigo-800 flex justify-center gap-2 items-center text-sm">
                  <Store className="w-4 h-4" /> POSSystem
                </div>
                <div className="p-3 text-[11px] font-mono border-b border-slate-100 text-slate-600 bg-white leading-relaxed">
                  + products: List<br/>+ cart: List<br/>+ total: float
                </div>
                <div className="p-3 text-[11px] font-mono text-slate-500 bg-slate-50 leading-relaxed">
                  + add_to_cart()<br/>+ remove_cart()<br/>+ checkout()
                </div>
              </div>

            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[350px] bg-white p-6 flex flex-col">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-500 mb-4">Class Inspector</h4>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col flex-1 h-full">
              {activeClass === 'none' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <Network className="w-12 h-12 opacity-30 stroke-1" />
                  <p className="text-sm">นำเมาส์ไปชี้ที่กล่อง Class<br/>เพื่อดูรายละเอียดและคำอธิบาย</p>
                </div>
              ) : (
                <div className={`flex-1 flex flex-col border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 bg-white shadow-sm`}>
                  <div className={`p-3 font-bold flex items-center gap-2 text-sm border-b border-slate-200 ${classData[activeClass].header}`}>
                    {classData[activeClass].icon}
                    {classData[activeClass].title}
                  </div>
                  <div className="p-4 flex-1">
                    <p className="text-xs font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100 leading-relaxed">
                      {classData[activeClass].desc}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Attributes (ตัวแปร)</h4>
                      <ul className="space-y-1.5">
                        {classData[activeClass].attrs.map((attr, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <CircleDot className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                            <span className="font-mono mt-0.5 leading-tight">{attr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Methods (ฟังก์ชัน)</h4>
                      <ul className="space-y-1.5">
                        {classData[activeClass].methods.map((method, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <Play className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" />
                            <span className="font-mono mt-0.5 leading-tight">{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-500 text-xs">UML Output</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-300"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-red-400 font-bold whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-500 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
