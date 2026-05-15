import { useState } from 'react';
import { Lock, Unlock, ShieldAlert, ShieldCheck, Database, KeySquare, ChevronRight } from 'lucide-react';

export default function OOP21910_U2_L6_EncapsulationDemo() {
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState(1000);

  const handleAction = (action) => {
    if (action === 'access_private') {
      setIsError(true);
      setOutput("AttributeError: 'BankAccount' object has no attribute '__money'");
    } else if (action === 'access_property') {
      setIsError(false);
      setOutput(`>>> ${balance}`);
    } else if (action === 'modify_private') {
      setIsError(true);
      setOutput("AttributeError: can't set attribute '__money'");
    } else if (action === 'deposit') {
      setIsError(false);
      setBalance(b => b + 500);
      setOutput(">>> ฝากเงิน 500 บาท สำเร็จ!");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-slate-800 p-6 text-white flex items-center gap-4 border-b-4 border-rose-500">
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
          <Lock className="w-8 h-8 text-rose-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Encapsulation (การห่อหุ้มข้อมูล)</h2>
          <p className="text-slate-300 mt-1">ทดลองเจาะตู้เซฟ เพื่อเข้าใจความสำคัญของ __ (Double Underscore)</p>
        </div>
      </div>

      <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-8 bg-slate-50">
        
        {/* Left: Code Structure */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-500" />
              โครงสร้างคลาส BankAccount
            </h3>
            
            <pre className="font-mono text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 overflow-x-auto">
<span className="text-pink-600">class</span> <span className="text-emerald-600">BankAccount</span>:
    <span className="text-pink-600">def</span> <span className="text-blue-600">__init__</span>(self):
        <span className="text-slate-400"># ซ่อนเงินไว้ ไม่ให้ใครแก้ตรงๆ</span>
        <span className="bg-rose-100 text-rose-700 px-1 rounded font-bold">self.__money</span> = <span className="text-orange-500">1000</span>

    <span className="text-purple-600 font-bold">@property</span>
    <span className="text-pink-600">def</span> <span className="text-blue-600">balance</span>(self):
        <span className="text-slate-400"># ช่องทางสำหรับ "ดู" ยอดเงิน</span>
        <span className="text-pink-600">return</span> <span className="bg-rose-100 text-rose-700 px-1 rounded font-bold">self.__money</span>

    <span className="text-pink-600">def</span> <span className="text-blue-600">deposit</span>(self, amount):
        <span className="text-slate-400"># ช่องทางสำหรับ "ฝาก" เงิน</span>
        <span className="bg-rose-100 text-rose-700 px-1 rounded font-bold">self.__money</span> += amount
            </pre>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex-1">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <KeySquare className="w-5 h-5 text-slate-500" />
              การเรียกใช้งาน (Hacker Zone)
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleAction('access_private')}
                className="w-full text-left p-3 rounded-lg border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:border-rose-300 transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> แฮกดูเงินตรงๆ</div>
                  <code className="text-sm font-mono text-slate-800">print(my_acc<span className="text-rose-600 font-bold">.__money</span>)</code>
                </div>
                <ChevronRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => handleAction('modify_private')}
                className="w-full text-left p-3 rounded-lg border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:border-rose-300 transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> แฮกแก้เงินตรงๆ</div>
                  <code className="text-sm font-mono text-slate-800">my_acc<span className="text-rose-600 font-bold">.__money</span> = 999999</code>
                </div>
                <ChevronRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => handleAction('access_property')}
                className="w-full text-left p-3 rounded-lg border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> ดูเงินผ่านช่องทางที่ถูก</div>
                  <code className="text-sm font-mono text-slate-800">print(my_acc<span className="text-emerald-600 font-bold">.balance</span>)</code>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => handleAction('deposit')}
                className="w-full text-left p-3 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-blue-600 mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> ฝากเงินผ่านระบบ</div>
                  <code className="text-sm font-mono text-slate-800">my_acc<span className="text-blue-600 font-bold">.deposit(500)</span></code>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Safe Visual & Output */}
        <div className="flex flex-col gap-4">
          
          <div className="bg-slate-800 rounded-2xl p-8 shadow-inner flex flex-col items-center justify-center relative overflow-hidden flex-1 border-4 border-slate-700 min-h-[250px]">
            {/* Safe Box Visual */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            
            <div className="z-10 bg-slate-300 w-48 h-48 rounded-xl shadow-2xl border-8 border-slate-400 flex flex-col items-center justify-center relative">
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              
              {/* Dial */}
              <div className={`w-24 h-24 rounded-full border-4 border-slate-500 flex items-center justify-center transition-all duration-500 ${isError ? 'bg-rose-100 rotate-12' : 'bg-slate-200'}`}>
                {isError ? <Lock className="w-10 h-10 text-rose-500" /> : <Unlock className="w-10 h-10 text-slate-500" />}
              </div>

              {/* Display */}
              <div className="mt-4 bg-emerald-900 text-emerald-400 font-mono px-3 py-1 rounded border-2 border-slate-500 text-sm shadow-inner w-32 text-center">
                ฿ {balance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 h-32 flex flex-col">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Terminal Output</h4>
            <div className={`flex-1 font-mono text-sm overflow-y-auto ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>
              {output || <span className="text-slate-600 italic">รอคำสั่ง...</span>}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
