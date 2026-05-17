import React, { useState, useEffect } from 'react';
import { LayoutGrid, ArrowDownCircle, Users, Box, Play, Calculator, RotateCcw } from 'lucide-react';

export default function SQL21901_U4_L9_SQLGroupByDemo() {
  const [step, setStep] = useState(0); // 0: initial, 1: grouping, 2: grouped, 3: aggregating, 4: result
  
  // Initial mixed raw data
  const rawData = [
    { id: 1, dept: 'IT', salary: 50, color: 'bg-sky-500' },
    { id: 2, dept: 'HR', salary: 30, color: 'bg-rose-500' },
    { id: 3, dept: 'IT', salary: 40, color: 'bg-sky-500' },
    { id: 4, dept: 'Sales', salary: 60, color: 'bg-amber-500' },
    { id: 5, dept: 'HR', salary: 35, color: 'bg-rose-500' },
    { id: 6, dept: 'Sales', salary: 45, color: 'bg-amber-500' },
    { id: 7, dept: 'IT', salary: 55, color: 'bg-sky-500' },
    { id: 8, dept: 'Sales', salary: 50, color: 'bg-amber-500' },
  ];

  const runGroupBy = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1500); // Wait for sort animation
  };

  const runAggregate = () => {
    setStep(3);
    setTimeout(() => setStep(4), 1500); // Wait for math animation
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-teal-100 text-teal-600 rounded-xl shrink-0">
          <LayoutGrid size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">The Great Sorter (เครื่องคัดแยก GROUP BY)</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            คำสั่ง <code className="bg-teal-50 text-teal-600 font-bold px-1 rounded">GROUP BY</code> คือการเอาข้อมูลที่กระจัดกระจาย มา "จัดกลุ่ม" ตามหมวดหมู่ ก่อนที่จะเอาไปคำนวณทางสถิติ (Aggregate) เช่น นับจำนวน, หาผลรวม
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl shadow-inner border-2 border-slate-200 p-6 md:p-8 relative overflow-hidden">
        
        {/* Conveyor Belt Background / Factory Theme */}
        <div className="absolute top-1/2 left-0 w-full h-12 bg-slate-200 -translate-y-1/2 flex items-center overflow-hidden z-0">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNCIgZmlsbD0iI2NidDU1ZSIvPjwvc3ZnPg==')] animate-[bg-pan-right_2s_linear_infinite] opacity-50"></div>
        </div>

        {/* Step 0: Mixed Data */}
        <div className="relative z-10 min-h-[400px] flex flex-col justify-between">
          
          <div className="text-center font-bold text-slate-700 mb-4 bg-white/80 backdrop-blur-sm inline-block mx-auto px-4 py-2 rounded-full shadow-sm">
            ตาราง Employees (ยังไม่ได้จัดกลุ่ม)
          </div>

          {/* Mixed Area (Top) */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${step > 0 ? 'opacity-0 translate-y-20 scale-50 absolute pointer-events-none' : 'opacity-100'}`}>
            {rawData.map(d => (
              <div key={d.id} className={`w-20 h-24 ${d.color} rounded-xl shadow-lg border-2 border-white flex flex-col items-center justify-center text-white font-bold transform hover:-translate-y-2 transition-transform`}>
                <Users size={24} className="mb-1 opacity-80" />
                <span>{d.dept}</span>
                <span className="text-xs bg-black/20 px-2 rounded-full mt-1">฿{d.salary}k</span>
              </div>
            ))}
          </div>

          {/* Grouped Area (Bottom) */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${step === 0 ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            
            {/* IT Bucket */}
            <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-sky-200 flex flex-col items-center relative">
              <div className="absolute -top-4 bg-sky-500 text-white font-black px-4 py-1 rounded-full shadow-md">IT</div>
              <div className="min-h-[120px] flex flex-wrap justify-center gap-2 mt-4 pt-4">
                {rawData.filter(d => d.dept === 'IT').map((d, i) => (
                  <div key={d.id} className={`w-16 h-16 ${d.color} rounded-lg shadow-sm border-2 border-white flex flex-col items-center justify-center text-white font-bold text-xs animate-in zoom-in slide-in-from-top-12`} style={{ animationDelay: `${i * 100}ms` }}>
                    <span>{d.dept}</span>
                    <span className="bg-black/20 px-1 rounded-full mt-1">{d.salary}k</span>
                  </div>
                ))}
              </div>
              
              {/* Aggregation Result */}
              <div className={`mt-4 w-full bg-slate-800 text-white rounded-xl p-3 text-center transition-all duration-500 ${step < 3 ? 'opacity-0 h-0 overflow-hidden' : step === 3 ? 'opacity-50 animate-pulse h-[80px]' : 'opacity-100 h-[80px]'}`}>
                {step === 4 ? (
                  <div className="animate-in slide-in-from-bottom-2">
                    <div className="text-xs text-sky-300">COUNT() = 3 คน</div>
                    <div className="font-bold text-lg text-emerald-400">SUM() = ฿145k</div>
                  </div>
                ) : (
                  <Calculator className="mx-auto animate-spin text-slate-600" />
                )}
              </div>
            </div>

            {/* HR Bucket */}
            <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-rose-200 flex flex-col items-center relative">
              <div className="absolute -top-4 bg-rose-500 text-white font-black px-4 py-1 rounded-full shadow-md">HR</div>
              <div className="min-h-[120px] flex flex-wrap justify-center gap-2 mt-4 pt-4">
                {rawData.filter(d => d.dept === 'HR').map((d, i) => (
                  <div key={d.id} className={`w-16 h-16 ${d.color} rounded-lg shadow-sm border-2 border-white flex flex-col items-center justify-center text-white font-bold text-xs animate-in zoom-in slide-in-from-top-12`} style={{ animationDelay: `${i * 100 + 300}ms` }}>
                    <span>{d.dept}</span>
                    <span className="bg-black/20 px-1 rounded-full mt-1">{d.salary}k</span>
                  </div>
                ))}
              </div>
              
              {/* Aggregation Result */}
              <div className={`mt-4 w-full bg-slate-800 text-white rounded-xl p-3 text-center transition-all duration-500 ${step < 3 ? 'opacity-0 h-0 overflow-hidden' : step === 3 ? 'opacity-50 animate-pulse h-[80px]' : 'opacity-100 h-[80px]'}`}>
                {step === 4 ? (
                  <div className="animate-in slide-in-from-bottom-2">
                    <div className="text-xs text-rose-300">COUNT() = 2 คน</div>
                    <div className="font-bold text-lg text-emerald-400">SUM() = ฿65k</div>
                  </div>
                ) : (
                  <Calculator className="mx-auto animate-spin text-slate-600" />
                )}
              </div>
            </div>

            {/* Sales Bucket */}
            <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-amber-200 flex flex-col items-center relative">
              <div className="absolute -top-4 bg-amber-500 text-white font-black px-4 py-1 rounded-full shadow-md">Sales</div>
              <div className="min-h-[120px] flex flex-wrap justify-center gap-2 mt-4 pt-4">
                {rawData.filter(d => d.dept === 'Sales').map((d, i) => (
                  <div key={d.id} className={`w-16 h-16 ${d.color} rounded-lg shadow-sm border-2 border-white flex flex-col items-center justify-center text-white font-bold text-xs animate-in zoom-in slide-in-from-top-12`} style={{ animationDelay: `${i * 100 + 600}ms` }}>
                    <span>{d.dept}</span>
                    <span className="bg-black/20 px-1 rounded-full mt-1">{d.salary}k</span>
                  </div>
                ))}
              </div>
              
              {/* Aggregation Result */}
              <div className={`mt-4 w-full bg-slate-800 text-white rounded-xl p-3 text-center transition-all duration-500 ${step < 3 ? 'opacity-0 h-0 overflow-hidden' : step === 3 ? 'opacity-50 animate-pulse h-[80px]' : 'opacity-100 h-[80px]'}`}>
                {step === 4 ? (
                  <div className="animate-in slide-in-from-bottom-2">
                    <div className="text-xs text-amber-300">COUNT() = 3 คน</div>
                    <div className="font-bold text-lg text-emerald-400">SUM() = ฿155k</div>
                  </div>
                ) : (
                  <Calculator className="mx-auto animate-spin text-slate-600" />
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Controls Overlay */}
        <div className="mt-8 flex flex-col items-center gap-4 relative z-20">
          
          <div className="bg-slate-900 text-white font-mono text-sm md:text-lg px-6 py-4 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700">
            <span className="text-teal-400">SELECT</span> dept, <span className="text-rose-400">COUNT</span>(id), <span className="text-emerald-400">SUM</span>(salary) <br className="md:hidden" />
            <span className="text-teal-400">FROM</span> employees <br className="md:hidden" />
            <span className="text-yellow-400">GROUP BY</span> dept;
          </div>

          <div className="flex gap-4">
            {step === 0 && (
              <button 
                onClick={runGroupBy}
                className="bg-teal-600 hover:bg-teal-500 text-white font-black px-8 py-3 rounded-full shadow-lg hover:shadow-teal-500/50 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <ArrowDownCircle /> 1. เริ่มจัดกลุ่มข้อมูล (GROUP BY)
              </button>
            )}

            {step === 2 && (
              <button 
                onClick={runAggregate}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all hover:-translate-y-1 flex items-center gap-2 animate-in zoom-in"
              >
                <Calculator /> 2. คำนวณผลรวมแต่ละกลุ่ม (Aggregate)
              </button>
            )}

            {step >= 4 && (
              <button 
                onClick={reset}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2 animate-in zoom-in"
              >
                <RotateCcw /> เริ่มใหม่
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
