import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, ShieldAlert, ShieldCheck, RotateCcw, ChevronRight, AlertCircle } from 'lucide-react';

export default function OOP21910_U2_L6_EncapsulationDemo() {
  const [balance, setBalance] = useState(1000);
  const [isError, setIsError] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'system', text: 'my_acc = BankAccount() initialized.' }
  ]);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleHistory]);

  const handleAction = (action) => {
    if (action === 'access_private') {
      setIsError(true);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ print(my_acc.__money)' },
        { type: 'error', text: "AttributeError: 'BankAccount' object has no attribute '__money'" }
      ]);
    } else if (action === 'modify_private') {
      setIsError(true);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ my_acc.__money = 999999' },
        { type: 'error', text: "AttributeError: can't set attribute '__money'" }
      ]);
    } else if (action === 'access_property') {
      setIsError(false);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ print(my_acc.balance)' },
        { type: 'output', text: `${balance}` }
      ]);
    } else if (action === 'deposit') {
      setIsError(false);
      setBalance(b => b + 500);
      setConsoleHistory(prev => [
        ...prev,
        { type: 'command', text: '$ my_acc.deposit(500)' },
        { type: 'output', text: 'Successfully deposited 500.' }
      ]);
    }
  };

  const clear = () => {
    setBalance(1000);
    setIsError(false);
    setConsoleHistory([{ type: 'system', text: 'my_acc = BankAccount() initialized.' }]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8 font-sans">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <Lock size={20} className="stroke-2" />
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">Encapsulation (การห่อหุ้มข้อมูล)</h3>
        </div>
        <p className="font-base text-sm leading-relaxed text-slate-700">
          เรียนรู้การใช้ <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">__</code> (Double Underscore) เพื่อซ่อนข้อมูลสำคัญใน Object ไม่ให้ถูกแก้ไขจากภายนอกโดยตรง
        </p>
      </div>

      <div className="flex flex-col min-h-[500px]">
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Interactive Hack/Deposit */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
              {/* Actions Side */}
              <div className="space-y-3">
                <button onClick={() => handleAction('access_private')}
                  className="w-full text-left p-3 rounded-lg border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:border-rose-300 transition-colors group flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1"><ShieldAlert size={14} /> แฮกดูเงินตรงๆ (อ่าน)</div>
                    <code className="text-xs font-mono text-slate-800">print(my_acc<span className="text-rose-600 font-bold">.__money</span>)</code>
                  </div>
                  <ChevronRight size={16} className="text-rose-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button onClick={() => handleAction('modify_private')}
                  className="w-full text-left p-3 rounded-lg border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:border-rose-300 transition-colors group flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1"><ShieldAlert size={14} /> แฮกแก้เงินตรงๆ (เขียน)</div>
                    <code className="text-xs font-mono text-slate-800">my_acc<span className="text-rose-600 font-bold">.__money</span> = 99999</code>
                  </div>
                  <ChevronRight size={16} className="text-rose-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="border-t border-slate-200 my-4"></div>

                <button onClick={() => handleAction('access_property')}
                  className="w-full text-left p-3 rounded-lg border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-colors group flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1"><ShieldCheck size={14} /> ดูเงินผ่านระบบ (Getter)</div>
                    <code className="text-xs font-mono text-slate-800">print(my_acc<span className="text-emerald-600 font-bold">.balance</span>)</code>
                  </div>
                  <ChevronRight size={16} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button onClick={() => handleAction('deposit')}
                  className="w-full text-left p-3 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors group flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1 flex items-center gap-1"><ShieldCheck size={14} /> ฝากเงินเข้าระบบ (Setter)</div>
                    <code className="text-xs font-mono text-slate-800">my_acc<span className="text-blue-600 font-bold">.deposit(500)</span></code>
                  </div>
                  <ChevronRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Safe Visual */}
              <div className="bg-slate-800 rounded-2xl shadow-inner flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[250px] border-4 border-slate-700">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="z-10 bg-slate-300 w-40 h-40 rounded-xl shadow-2xl border-8 border-slate-400 flex flex-col items-center justify-center relative">
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  
                  <div className={`w-20 h-20 rounded-full border-4 border-slate-500 flex items-center justify-center transition-all duration-500 ${isError ? 'bg-rose-100 rotate-12' : 'bg-slate-200'}`}>
                    {isError ? <Lock size={32} className="text-rose-500" /> : <Unlock size={32} className="text-slate-700" />}
                  </div>

                  <div className="mt-3 bg-emerald-900 text-emerald-400 font-mono px-2 py-1 rounded border-2 border-slate-500 text-xs shadow-inner w-24 text-center truncate">
                    ฿ {balance.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-[360px] bg-white p-6 flex flex-col border-l border-slate-200">
            <h4 className="font-base text-sm font-medium tracking-wide uppercase text-slate-700 mb-4">ไวยากรณ์ (Syntax)</h4>
            
            <div className="bg-[#1e1e1e] text-slate-600 rounded-xl p-4 shadow-inner border border-slate-700 mb-6 font-mono text-[11px] leading-loose">
              <span className="text-pink-400">class</span> <span className="text-yellow-300">BankAccount</span>:<br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">__init__</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.<span className="text-rose-400 font-bold">__money</span> = 1000 <span className="text-slate-700"># Private</span><br />
              <br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">deposit</span>(<span className="text-orange-300">self</span>, amount):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.<span className="text-rose-400 font-bold">__money</span> += amount<br />
              <br />
              &nbsp;&nbsp;<span className="text-blue-300">@property</span><br />
              &nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-300">balance</span>(<span className="text-orange-300">self</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-orange-300">self</span>.<span className="text-rose-400 font-bold">__money</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex-1 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-rose-600 text-sm font-mono mb-1">self.__attribute</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใส่ขีดล่างสองอันไว้ข้างหน้าชื่อตัวแปร ทำให้มันกลายเป็น Private ไม่สามารถเข้าถึงจากภายนอกคลาสได้เลย (พยายามเข้าถึงจะติด Error)
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-emerald-600 text-sm mb-1">ทำไมต้องซ่อน?</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เพื่อป้องกันไม่ให้ผู้ใช้โค้ด (หรือโปรแกรมส่วนอื่น) มาเปลี่ยนแปลงข้อมูลสำคัญได้ตามใจชอบ โดยไม่ได้ผ่านการตรวจสอบจากระบบ
                  </p>
                </div>
              </div>
            </div>

            <button onClick={clear}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl px-4 py-3 active:scale-95 transition-all flex items-center justify-center gap-2">
              <RotateCcw size={16} /> รีเซ็ต
            </button>
          </div>
        </div>

        {/* Bottom Full-Width Terminal */}
        <div className="h-48 bg-[#1e1e1e] font-mono text-[13px] overflow-y-auto flex flex-col w-full border-t border-slate-800">
          <div className="sticky top-0 bg-[#2d2d2d] border-b border-slate-700 px-4 py-2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-wider">TERMINAL</span>
              <span className="text-slate-700 text-xs">Security Log</span>
            </div>
          </div>
          <div className="p-4 space-y-1 flex-1" ref={consoleRef}>
            {consoleHistory.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === 'command' && <div className="text-slate-600"><span className="text-emerald-400 mr-2">&gt;&gt;&gt;</span>{line.text.substring(2)}</div>}
                {line.type === 'output'  && <div className="text-cyan-300 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'system'  && <div className="text-slate-700 whitespace-pre-wrap">{line.text}</div>}
                {line.type === 'error'   && <div className="text-rose-400 whitespace-pre-wrap">{line.text}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
