import React, { useState } from 'react';
import { FolderTree, ArrowRight, CheckCircle2, XCircle, AlertCircle, RotateCcw, FileCode } from 'lucide-react';

export default function OOP21910_U5_L3_ModelSeparationDemo() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState('main');
  const showToast = (msg, type) => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); };

  const files = {
    main: { name: 'main.py', desc: 'ไฟล์หลัก — รันโปรแกรม', code: [
      { text: 'from product import Product', color: 'text-pink-400' },
      { text: 'from order import Order', color: 'text-pink-400' },
      { text: '', color: '' },
      { text: '# สร้าง object จากไฟล์อื่น', color: 'text-slate-500' },
      { text: 'p = Product("กาแฟ", 50)', color: 'text-white' },
      { text: 'o = Order()', color: 'text-white' },
      { text: 'o.add_item(p)', color: 'text-white' },
      { text: 'print(o.total())', color: 'text-white' },
    ]},
    product: { name: 'product.py', desc: 'คลาส Product — เก็บข้อมูลสินค้า', code: [
      { text: 'class Product:', color: 'text-yellow-300' },
      { text: '    def __init__(self, name, price):', color: 'text-blue-300' },
      { text: '        self.name = name', color: 'text-white' },
      { text: '        self.price = price', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def __str__(self):', color: 'text-blue-300' },
      { text: '        return f"{self.name} - {self.price} บาท"', color: 'text-green-300' },
    ]},
    order: { name: 'order.py', desc: 'คลาส Order — จัดการรายการสั่งซื้อ', code: [
      { text: 'class Order:', color: 'text-yellow-300' },
      { text: '    def __init__(self):', color: 'text-blue-300' },
      { text: '        self.items = []', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def add_item(self, product):', color: 'text-blue-300' },
      { text: '        self.items.append(product)', color: 'text-white' },
      { text: '', color: '' },
      { text: '    def total(self):', color: 'text-blue-300' },
      { text: '        return sum(i.price for i in self.items)', color: 'text-white' },
    ]},
  };

  return (
    <div className="space-y-12 my-8">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white p-5 flex items-center gap-3">
          <FolderTree size={24} />
          <h3 className="font-bold text-lg">การแยกไฟล์โมเดลข้อมูล</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          {/* File List */}
          <div className="p-4 bg-slate-50 border-r border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">📁 Project Files</h4>
            {Object.entries(files).map(([key, f]) => (
              <button key={key} onClick={() => setSelectedFile(key)}
                className={`w-full text-left p-3 rounded-lg mb-1 flex items-center gap-2 transition-all text-sm ${selectedFile === key ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>
                <FileCode size={14} />
                {f.name}
              </button>
            ))}

            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700">
              💡 <strong>หลักการ:</strong> แยก 1 คลาส = 1 ไฟล์ แล้วใช้ <code>from ... import ...</code> เพื่อนำเข้า
            </div>
          </div>

          {/* Code View */}
          <div className="lg:col-span-3 p-6">
            <div className="mb-4">
              <h4 className="font-bold text-slate-800 font-mono text-lg">{files[selectedFile].name}</h4>
              <p className="text-sm text-slate-500">{files[selectedFile].desc}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl font-mono text-sm shadow-lg space-y-0.5">
              {files[selectedFile].code.map((line, i) => (
                <div key={i} className={`flex items-center gap-3 ${line.text === '' ? 'h-4' : ''}`}>
                  <span className="text-slate-600 w-5 text-right text-xs">{line.text ? i + 1 : ''}</span>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}
            </div>

            {/* Architecture Diagram */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-700 text-sm mb-3">🏗️ ความสัมพันธ์ระหว่างไฟล์</h4>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-3 text-center text-sm">
                  <div className="font-bold text-blue-700">main.py</div>
                  <div className="text-blue-500 text-xs">ไฟล์หลัก</div>
                </div>
                <div className="text-slate-400 flex flex-col items-center">
                  <div className="text-xs">import</div>
                  <ArrowRight size={20} />
                </div>
                <div className="flex gap-3">
                  <div className="bg-emerald-100 border-2 border-emerald-400 rounded-xl p-3 text-center text-sm">
                    <div className="font-bold text-emerald-700">product.py</div>
                    <div className="text-emerald-500 text-xs">class Product</div>
                  </div>
                  <div className="bg-purple-100 border-2 border-purple-400 rounded-xl p-3 text-center text-sm">
                    <div className="font-bold text-purple-700">order.py</div>
                    <div className="text-purple-500 text-xs">class Order</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-white !mt-0 flex items-center gap-2"><span className="text-yellow-300">#</span> ทดสอบความเข้าใจ</h2>
        <p className="text-slate-200">ถ้าคลาส <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">Product</code> อยู่ในไฟล์ <code className="text-yellow-300 bg-slate-700 px-2 py-0.5 rounded">product.py</code> จะ import อย่างไร?</p>
        <div className="space-y-3 my-6">
          {[
            { val: 'from', label: 'from product import Product', correct: true },
            { val: 'import', label: 'import Product' },
            { val: 'require', label: 'require("product")' },
          ].map(opt => (
            <button key={opt.val} onClick={() => { if (!quizChecked) setQuizAnswer(opt.val); }}
              className={`w-full text-left p-4 rounded-xl border-2 font-mono text-sm transition-all ${quizChecked && opt.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300' : quizChecked && quizAnswer === opt.val && !opt.correct ? 'border-red-500 bg-red-900/20 text-red-300' : quizAnswer === opt.val ? 'border-indigo-500 bg-slate-700 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700">
          <button onClick={() => { setQuizAnswer(null); setQuizChecked(false); }} className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-sm"><RotateCcw size={16} /> เริ่มใหม่</button>
          <button onClick={() => { if (!quizAnswer) { showToast('เลือกคำตอบก่อน', 'warning'); return; } setQuizChecked(true); showToast(quizAnswer === 'from' ? 'ถูกต้อง!' : 'ไม่ถูกต้อง', quizAnswer === 'from' ? 'success' : 'error'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg">ตรวจคำตอบ</button>
        </div>
      </section>

      {toast.show && (<div className={`fixed bottom-5 right-5 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-slate-800 border-emerald-500' : toast.type === 'error' ? 'bg-slate-800 border-red-500' : 'bg-slate-800 border-yellow-500'}`}>{toast.type === 'success' && <CheckCircle2 className="text-emerald-500" />}{toast.type === 'error' && <XCircle className="text-red-500" />}{toast.type === 'warning' && <AlertCircle className="text-yellow-500" />}<div className="font-medium">{toast.message}</div></div>)}
    </div>
  );
}
