import { useState } from 'react';
import { Network, Database, ShoppingCart, User, ArrowRight, Server, Store, CheckCircle2 } from 'lucide-react';

export default function OOP21910_U5_L2_POSProjectUML() {
  const [activeClass, setActiveClass] = useState('none');

  const classData = {
    'Product': {
      title: 'Class: Product',
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      desc: 'พิมพ์เขียวสำหรับสินค้าแต่ละชิ้น',
      attrs: ['id (รหัสสินค้า)', 'name (ชื่อ)', 'price (ราคา)', 'stock (จำนวนคงเหลือ)'],
      methods: ['update_stock()', 'get_info()'],
      color: 'border-emerald-300 bg-emerald-50',
      header: 'bg-emerald-200 text-emerald-800'
    },
    'CartItem': {
      title: 'Class: CartItem',
      icon: <ShoppingCart className="w-5 h-5 text-amber-600" />,
      desc: 'รายการสินค้าที่ถูกหยิบใส่ตะกร้า (เก็บจำนวนที่ซื้อ)',
      attrs: ['product (อ้างอิงออบเจ็กต์ Product)', 'qty (จำนวนที่ซื้อ)'],
      methods: ['get_subtotal()'],
      color: 'border-amber-300 bg-amber-50',
      header: 'bg-amber-200 text-amber-800'
    },
    'POSSystem': {
      title: 'Class: POSSystem',
      icon: <Store className="w-5 h-5 text-indigo-600" />,
      desc: 'ระบบหลัก (Main System) จัดการข้อมูลและควบคุมหน้าจอ',
      attrs: ['products (List ของ Product ทั้งหมด)', 'cart (List ของ CartItem)', 'total (ราคารวม)'],
      methods: ['add_to_cart()', 'remove_from_cart()', 'checkout()'],
      color: 'border-indigo-300 bg-indigo-50',
      header: 'bg-indigo-200 text-indigo-800'
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
          <Network className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Interactive UML Diagram</h2>
          <p className="text-slate-300 mt-1">แผนภาพโครงสร้างคลาส (Class Diagram) ของระบบ POS</p>
        </div>
      </div>

      <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-8 bg-slate-50">
        
        {/* Diagram Area */}
        <div className="lg:col-span-2 relative min-h-[400px] bg-white border border-slate-200 rounded-2xl p-6 shadow-inner bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] flex items-center justify-center">
          
          <div className="w-full max-w-2xl relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
            
            {/* Product Box */}
            <div 
              onMouseEnter={() => setActiveClass('Product')}
              onMouseLeave={() => setActiveClass('none')}
              className={`w-48 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${activeClass === 'Product' ? 'border-emerald-500 scale-105 shadow-emerald-200/50 shadow-lg' : 'border-slate-300'}`}
            >
              <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-200 text-slate-800 flex justify-center gap-2 items-center">
                <Database className="w-4 h-4 text-emerald-600" /> Product
              </div>
              <div className="p-3 text-xs font-mono border-b border-slate-100 text-slate-600">
                + id<br/>+ name<br/>+ price<br/>+ stock
              </div>
              <div className="p-3 text-xs font-mono text-slate-600 bg-slate-50">
                + get_info()<br/>+ update_stock()
              </div>
            </div>

            {/* Relation Line 1 */}
            <div className="hidden md:flex flex-col items-center relative w-20">
              <div className="text-[10px] font-bold text-slate-400 absolute -top-4">1..1</div>
              <ArrowRight className={`w-8 h-8 transition-colors ${activeClass === 'CartItem' ? 'text-amber-500' : 'text-slate-300'}`} />
              <div className="text-[10px] font-bold text-slate-400 absolute -bottom-4">1..*</div>
            </div>

            <div className="md:hidden flex flex-col items-center h-12">
               <div className="w-1 h-full bg-slate-200"></div>
            </div>

            {/* CartItem Box */}
            <div 
              onMouseEnter={() => setActiveClass('CartItem')}
              onMouseLeave={() => setActiveClass('none')}
              className={`w-48 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${activeClass === 'CartItem' ? 'border-amber-500 scale-105 shadow-amber-200/50 shadow-lg' : 'border-slate-300'}`}
            >
              <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-200 text-slate-800 flex justify-center gap-2 items-center">
                <ShoppingCart className="w-4 h-4 text-amber-600" /> CartItem
              </div>
              <div className="p-3 text-xs font-mono border-b border-slate-100 text-slate-600">
                + product (Ref)<br/>+ qty
              </div>
              <div className="p-3 text-xs font-mono text-slate-600 bg-slate-50">
                + get_subtotal()
              </div>
            </div>

            {/* Relation Line 2 */}
            <div className="hidden md:flex flex-col items-center relative w-20">
              <div className="text-[10px] font-bold text-slate-400 absolute -top-4">1..*</div>
              <ArrowRight className={`w-8 h-8 transition-colors ${activeClass === 'POSSystem' ? 'text-indigo-500' : 'text-slate-300'}`} />
              <div className="text-[10px] font-bold text-slate-400 absolute -bottom-4">1..1</div>
            </div>

            <div className="md:hidden flex flex-col items-center h-12">
               <div className="w-1 h-full bg-slate-200"></div>
            </div>

            {/* POSSystem Box */}
            <div 
              onMouseEnter={() => setActiveClass('POSSystem')}
              onMouseLeave={() => setActiveClass('none')}
              className={`w-48 bg-white border-2 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${activeClass === 'POSSystem' ? 'border-indigo-500 scale-105 shadow-indigo-200/50 shadow-lg' : 'border-slate-300'}`}
            >
              <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-200 text-slate-800 flex justify-center gap-2 items-center">
                <Store className="w-4 h-4 text-indigo-600" /> POSSystem
              </div>
              <div className="p-3 text-xs font-mono border-b border-slate-100 text-slate-600">
                + products: List<br/>+ cart: List<br/>+ total: float
              </div>
              <div className="p-3 text-xs font-mono text-slate-600 bg-slate-50">
                + add_to_cart()<br/>+ remove_cart()<br/>+ checkout()
              </div>
            </div>

          </div>
        </div>

        {/* Details Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-500" />
            คำอธิบายคลาส (Class Details)
          </h3>
          
          {activeClass === 'none' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 py-8">
              <Network className="w-12 h-12 opacity-30" />
              <p>เอาเมาส์ชี้ (Hover) ที่กล่องคลาส<br/>เพื่อดูรายละเอียด</p>
            </div>
          ) : (
            <div className={`flex-1 flex flex-col border-2 rounded-xl overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-right-4 ${classData[activeClass].color}`}>
              <div className={`p-3 font-bold flex items-center gap-2 ${classData[activeClass].header}`}>
                {classData[activeClass].icon}
                {classData[activeClass].title}
              </div>
              <div className="p-4 bg-white/50 flex-1">
                <p className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-white/50">
                  {classData[activeClass].desc}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attributes (คุณสมบัติ)</h4>
                  <ul className="space-y-1">
                    {classData[activeClass].attrs.map((attr, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                        <span className="font-mono text-xs mt-0.5">{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Methods (พฤติกรรม)</h4>
                  <ul className="space-y-1">
                    {classData[activeClass].methods.map((method, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <Play className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                        <span className="font-mono text-xs mt-0.5">{method}</span>
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
  );
}
