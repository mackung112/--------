import React, { useState } from 'react';
import { PieChart, BarChart3, GripHorizontal, Settings2, Download, Table2 } from 'lucide-react';

export default function SQLReportBuilder() {
  const [xAxis, setXAxis] = useState('dept'); // dept, role
  const [yAxis, setYAxis] = useState('sum'); // count, sum, avg

  const rawData = [
    { dept: 'IT', role: 'Dev', salary: 50 },
    { dept: 'IT', role: 'Dev', salary: 60 },
    { dept: 'IT', role: 'Manager', salary: 100 },
    { dept: 'Sales', role: 'Staff', salary: 30 },
    { dept: 'Sales', role: 'Manager', salary: 80 },
    { dept: 'Sales', role: 'Staff', salary: 35 },
    { dept: 'HR', role: 'Manager', salary: 70 },
    { dept: 'HR', role: 'Staff', salary: 40 },
  ];

  // Process data based on selections
  const getChartData = () => {
    const groups = {};
    rawData.forEach(item => {
      const key = item[xAxis];
      if (!groups[key]) {
        groups[key] = { total: 0, count: 0 };
      }
      groups[key].total += item.salary;
      groups[key].count += 1;
    });

    const result = Object.keys(groups).map(key => {
      let value = 0;
      if (yAxis === 'sum') value = groups[key].total;
      if (yAxis === 'count') value = groups[key].count;
      if (yAxis === 'avg') value = groups[key].total / groups[key].count;
      return { label: key, value };
    });

    return result;
  };

  const chartData = getChartData();
  const maxVal = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
          <PieChart size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Report Builder Studio (ลากวางสร้างกราฟ)</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            หัวใจสำคัญของการดึงข้อมูลคือการ <strong>สรุปผลและทำรายงาน (Reporting)</strong> ลองปรับแต่งแกน X และแกน Y ด้านล่าง เพื่อดูระบบสร้างกราฟและ <code className="bg-slate-100 px-1 rounded text-pink-600">SQL Query</code> ออกมาให้แบบเรียลไทม์!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Panel */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2 font-bold text-slate-700">
            <Settings2 size={20} /> Data Configuration
          </div>
          <div className="p-6 space-y-8 flex-1">
            
            {/* X-Axis */}
            <div>
              <label className="block font-bold text-slate-700 mb-2 flex items-center gap-2">
                แกน X (GROUP BY)
              </label>
              <div className="space-y-2">
                <button 
                  onClick={() => setXAxis('dept')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${xAxis === 'dept' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-md' : 'border-slate-200 hover:border-indigo-300 text-slate-600'}`}
                >
                  <GripHorizontal className="text-slate-400" size={16}/> แผนก (Department)
                </button>
                <button 
                  onClick={() => setXAxis('role')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${xAxis === 'role' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-md' : 'border-slate-200 hover:border-indigo-300 text-slate-600'}`}
                >
                  <GripHorizontal className="text-slate-400" size={16}/> ตำแหน่ง (Role)
                </button>
              </div>
            </div>

            {/* Y-Axis */}
            <div>
              <label className="block font-bold text-slate-700 mb-2 flex items-center gap-2">
                แกน Y (Aggregate)
              </label>
              <div className="space-y-2">
                <button 
                  onClick={() => setYAxis('sum')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${yAxis === 'sum' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-md' : 'border-slate-200 hover:border-emerald-300 text-slate-600'}`}
                >
                  <GripHorizontal className="text-slate-400" size={16}/> ยอดเงินเดือนรวม (SUM)
                </button>
                <button 
                  onClick={() => setYAxis('avg')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${yAxis === 'avg' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-md' : 'border-slate-200 hover:border-emerald-300 text-slate-600'}`}
                >
                  <GripHorizontal className="text-slate-400" size={16}/> เงินเดือนเฉลี่ย (AVG)
                </button>
                <button 
                  onClick={() => setYAxis('count')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${yAxis === 'count' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-md' : 'border-slate-200 hover:border-emerald-300 text-slate-600'}`}
                >
                  <GripHorizontal className="text-slate-400" size={16}/> จำนวนพนักงาน (COUNT)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Chart Panel */}
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center text-white font-bold">
              <div className="flex items-center gap-2"><BarChart3 className="text-sky-400"/> Live Dashboard Preview</div>
              <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm"><Download size={16}/> Export</button>
            </div>
            
            <div className="p-8 h-[300px] flex items-end justify-around gap-4 pb-12 relative">
              {/* Grid Lines */}
              <div className="absolute inset-x-8 inset-y-8 pointer-events-none flex flex-col justify-between opacity-10">
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
              </div>

              {chartData.map((d, i) => (
                <div key={i} className="flex flex-col items-center w-full group relative z-10">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-white text-slate-800 font-bold px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {yAxis === 'count' ? `${d.value} คน` : `฿${d.value.toFixed(0)}k`}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[80px] bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-lg shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-1000 group-hover:brightness-110"
                    style={{ height: `${(d.value / maxVal) * 200}px` }}
                  ></div>
                  
                  {/* Label */}
                  <div className="mt-4 text-slate-300 font-bold bg-slate-800 px-3 py-1 rounded-full text-sm">
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SQL Generated */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow-xl overflow-hidden border border-slate-700 flex flex-col">
             <div className="bg-[#323233] p-3 flex justify-between items-center">
              <div className="text-slate-400 text-xs font-semibold tracking-wider">Generated SQL Query</div>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto text-white">
              <span className="text-purple-400">SELECT</span> <span className="text-sky-300">{xAxis}</span>, <span className="text-emerald-400">{yAxis.toUpperCase()}</span>(<span className="text-sky-300">{yAxis === 'count' ? 'id' : 'salary'}</span>) <span className="text-purple-400">AS</span> <span className="text-yellow-300">result</span><br/>
              <span className="text-purple-400">FROM</span> <span className="text-sky-300">employees</span><br/>
              <span className="text-purple-400">GROUP BY</span> <span className="text-sky-300">{xAxis}</span><br/>
              <span className="text-purple-400">ORDER BY</span> <span className="text-yellow-300">result</span> <span className="text-purple-400">DESC</span>;
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
