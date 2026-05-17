import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, PackageOpen, Plus, Trash2, Box, RotateCcw } from 'lucide-react';

export default function OOP21910_U2_L8_ObjectListDemo() {
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [cartArray, setCartArray] = useState([]);
  
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'cart = [] initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleAppend = () => {
    const name = prodName.trim();
    const price = parseFloat(prodPrice);

    if (!name || isNaN(price)) return;

    const newObj = { id: Date.now(), name, price };
    setCartArray(prev => [...prev, newObj]);
    
    setConsoleHistory(prev => [
      ...prev,
      { type: 'command', text: `$ cart.append(Product("${name}", ${price}))` },
      { type: 'output', text: `  -> Added Product("${name}") to cart at index ${cartArray.length}.` }
    ]);
    
    setProdName('');
    setProdPrice('');
  };

  const handleLoopPrint = () => {
    if (cartArray.length === 0) {
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: `$ for item in cart: print(item.name)` },
        { type: 'system', text: `  -> Cart is empty.` }
      ]);
      return;
    }

    const commands = [
      { type: 'command', text: `$ for item in cart:` },
      { type: 'command', text: `>     print(f"Name: {item.name}, Price: {item.price}")` }
    ];
    
    const outputs = cartArray.map(item => ({
      type: 'output',
      text: `Name: ${item.name}, Price: ${item.price}`
    }));

    setConsoleHistory(prev => [...prev, ...commands, ...outputs]);
  };

  const handleClear = () => {
    setCartArray([]);
    setConsoleHistory([
      { type: 'system', text: 'cart = [] initialized.' }
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <ShoppingCart size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">List of Objects (การเก็บออบเจ็กต์ลงใน List)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้วิธีการเก็บ Object หลายๆ ตัวไว้ใน List เดียวกัน (เช่น ตะกร้าสินค้า) และการใช้ Loop เพื่อเข้าถึง Object แต่ละตัว
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Build */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="flex flex-col h-full gap-6">
              {/* Form */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
                  <PackageOpen size={18} className="text-slate-600" /> สร้าง Product Object
                </h4>
                
                <div className="space-y-4 mb-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Name</label>
                      <input 
                        type="text" 
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="Coffee" 
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Price</label>
                      <input 
                        type="number" 
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        placeholder="45" 
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <button onClick={handleAppend}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow flex items-center justify-center gap-2 active:scale-95 text-sm">
                  <Plus size={16} /> .append() ลงใน List
                </button>
              </div>

              {/* Memory Visualizer */}
              <div className="flex-1 bg-slate-800 rounded-2xl p-5 shadow-inner border border-slate-700 flex flex-col min-h-[220px]">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                  <h4 className="font-mono font-bold text-slate-600 text-sm flex items-center gap-2">
                    <span className="text-indigo-600">cart</span> = [ <span className="text-white">{cartArray.length} items</span> ]
                  </h4>
                  <button onClick={handleLoopPrint} className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow transition-colors active:scale-95">
                    Run for-loop
                  </button>
                </div>

                <div className="flex-1 flex gap-3 overflow-x-auto pb-2 custom-scrollbar items-center px-1">
                  {cartArray.length === 0 ? (
                    <div className="w-full text-center text-slate-700 text-xs italic">
                      List ว่างเปล่า ลองเพิ่มสินค้าดูสิ
                    </div>
                  ) : (
                    cartArray.map((item, idx) => (
                      <div key={item.id} className="bg-slate-700 min-w-[120px] rounded-xl border border-slate-600 p-3 flex flex-col items-center animate-in slide-in-from-right-4 shrink-0 relative">
                        <div className="absolute -top-2.5 -right-2 bg-yellow-400 text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          idx: {idx}
                        </div>
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-indigo-400 mb-2 border border-slate-600">
                          <Box size={20} />
                        </div>
                        <div className="text-white font-bold text-sm truncate w-full text-center">{item.name}</div>
                        <div className="text-emerald-400 font-mono text-xs">฿{item.price}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[360px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-slate-700"># 1. เตรียม List ว่าง</span><br />
              <span className="text-indigo-600">cart</span> = []<br />
              <br />
              <span className="text-slate-700"># 2. นำ Object ไปต่อท้าย List ทันที</span><br />
              <span className="text-indigo-600">cart</span>.append(<span className="text-yellow-300">Product</span>(<span className="text-sky-300">"Water"</span>, <span className="text-purple-300">10</span>))<br />
              <br />
              <span className="text-slate-700"># 3. วนลูปเพื่อใช้งาน Object</span><br />
              <span className="text-pink-400">for</span> <span className="text-sky-300">item</span> <span className="text-pink-400">in</span> <span className="text-indigo-600">cart</span>:<br />
              &nbsp;&nbsp;<span className="text-yellow-300">print</span>(<span className="text-sky-300">item</span>.name, <span className="text-sky-300">item</span>.price)
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-indigo-600 text-sm font-mono mb-1">list.append()</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ฟังก์ชันที่ใช้เพิ่มข้อมูลไปต่อท้าย List เสมอ เราสามารถสร้าง Object ใหม่แล้วนำมาใส่ไว้ในวงเล็บของ append ได้โดยตรง
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-pink-600 text-sm font-mono mb-1">for item in list:</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    การวนลูปคือการหยิบ Object ออกมาจาก List ทีละชิ้น มาเก็บไว้ในตัวแปร <code className="bg-slate-200 px-1 rounded">item</code> เพื่อให้เราสามารถใช้ <code className="bg-slate-200 px-1 rounded">item.name</code> หรือ <code className="bg-slate-200 px-1 rounded">item.price</code> ได้
                  </p>
                </div>
              </div>
            </div>

            <button onClick={handleClear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
              <RotateCcw size={16} /> ล้างข้อมูล
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Event Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
