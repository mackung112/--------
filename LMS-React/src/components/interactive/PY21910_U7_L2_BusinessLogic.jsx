import { useState } from 'react';

export default function PY21910_U7_L2_BusinessLogic() {
  const [price, setPrice] = useState(1200);
  const [qty, setQty] = useState(3);
  const total = price * qty;
  const discount = total > 3000 ? total * 0.1 : total > 1000 ? total * 0.05 : 0;
  const net = total - discount;
  const vat = net * 0.07;

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🧮 ตรรกะธุรกิจ: เงื่อนไข + วนซ้ำ</h3>
      <p className="text-gray-500 text-center mb-4 text-sm">ปรับค่าราคาและจำนวน แล้วดูตรรกะการคำนวณ</p>
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center"><label className="text-xs text-gray-500">ราคา/ชิ้น</label><input type="number" value={price} onChange={e => setPrice(+e.target.value)} className="block w-24 text-center font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
        <div className="text-center"><label className="text-xs text-gray-500">จำนวน</label><input type="number" value={qty} onChange={e => setQty(+e.target.value)} className="block w-20 text-center font-bold border-2 border-indigo-300 rounded-xl p-2" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl p-5 font-mono text-xs">
          <div className="text-green-400">total = {price} * {qty}  <span className="text-slate-500"># = {total}</span></div>
          <div className={`mt-1 ${total > 3000 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>if total &gt; 3000:</div>
          <div className={`ml-4 ${total > 3000 ? 'text-yellow-300' : 'text-slate-600'}`}>discount = total * 0.10</div>
          <div className={`${total > 1000 && total <= 3000 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>elif total &gt; 1000:</div>
          <div className={`ml-4 ${total > 1000 && total <= 3000 ? 'text-yellow-300' : 'text-slate-600'}`}>discount = total * 0.05</div>
          <div className={`${total <= 1000 ? 'text-yellow-300 font-bold' : 'text-slate-500'}`}>else:</div>
          <div className={`ml-4 ${total <= 1000 ? 'text-yellow-300' : 'text-slate-600'}`}>discount = 0</div>
          <div className="text-green-400 mt-2">net = total - discount</div>
          <div className="text-green-400">vat = net * 0.07</div>
        </div>
        <div className="space-y-2">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex justify-between"><span className="text-sm">ยอดรวม</span><span className="font-bold">{total.toLocaleString()} ฿</span></div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex justify-between"><span className="text-sm">ส่วนลด</span><span className="font-bold text-green-600">-{discount.toLocaleString()} ฿</span></div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex justify-between"><span className="text-sm">VAT 7%</span><span className="font-bold text-amber-600">+{vat.toFixed(0)} ฿</span></div>
          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-4 flex justify-between"><span className="font-bold">สุทธิ</span><span className="text-xl font-extrabold text-indigo-700">{(net + vat).toFixed(0)} ฿</span></div>
        </div>
      </div>
    </div>
  );
}
