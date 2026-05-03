import React, { useState } from 'react';

const timeline = [
  { year: '1991', title: 'Python 0.9', desc: 'Guido van Rossum สร้าง Python ขึ้นมาจากภาษา ABC มีฟีเจอร์พื้นฐาน เช่น Exception Handling, Functions, Module', color: 'bg-blue-500', icon: '🌱' },
  { year: '2000', title: 'Python 2.0', desc: 'เพิ่ม List Comprehension, Garbage Collection, Unicode Support ทำให้ Python ใช้งานจริงจังได้', color: 'bg-green-500', icon: '🌿' },
  { year: '2008', title: 'Python 3.0', desc: 'ปรับปรุงใหญ่ แก้ปัญหาเดิม เปลี่ยน print เป็นฟังก์ชัน ปรับ Unicode เป็นค่าเริ่มต้น', color: 'bg-purple-500', icon: '🌳' },
  { year: '2020', title: 'Python 3.9+', desc: 'เพิ่ม Type Hinting, Pattern Matching, Dict Union ทำให้โค้ดอ่านง่ายขึ้น', color: 'bg-orange-500', icon: '🔥' },
  { year: '2024', title: 'Python 3.13', desc: 'GIL Optional (Free-threading), JIT Compiler เบื้องต้น ทำให้ Python เร็วขึ้นมาก', color: 'bg-red-500', icon: '🚀' },
];

const strengths = [
  { icon: '📖', title: 'อ่านง่าย', desc: 'ไวยากรณ์คล้ายภาษาอังกฤษ ทำให้ผู้เริ่มต้นเรียนรู้ได้เร็ว' },
  { icon: '⚡', title: 'เขียนสั้น', desc: 'โค้ด Python สั้นกว่า C/Java หลายเท่า ประหยัดเวลา' },
  { icon: '📦', title: 'ไลบรารีเยอะ', desc: 'มี Package กว่า 500,000 ตัวใน PyPI พร้อมใช้ทันที' },
  { icon: '🌍', title: 'ใช้ได้หลากหลาย', desc: 'Web, AI, Data Science, Game, IoT, Automation' },
  { icon: '👥', title: 'ชุมชนใหญ่', desc: 'มีผู้ใช้ทั่วโลกหลายล้านคน หาคำตอบง่าย' },
  { icon: '🆓', title: 'ฟรี Open Source', desc: 'ดาวน์โหลดใช้ได้ฟรี ไม่มีค่าลิขสิทธิ์' },
];

export default function PythonTimeline() {
  const [activeYear, setActiveYear] = useState(0);
  const [tab, setTab] = useState('timeline');

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">🐍 วิวัฒนาการและจุดเด่นของ Python</h3>
      <div className="flex gap-2 mb-6 justify-center">
        <button onClick={() => setTab('timeline')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === 'timeline' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>📅 ไทม์ไลน์</button>
        <button onClick={() => setTab('strengths')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === 'strengths' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>💪 จุดเด่น</button>
      </div>

      {tab === 'timeline' && (
        <div>
          <div className="flex justify-between items-center mb-6 px-2">
            {timeline.map((t, i) => (
              <button key={i} onClick={() => setActiveYear(i)} className="flex flex-col items-center group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${activeYear === i ? `${t.color} text-white scale-125 shadow-lg` : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'}`}>{t.icon}</div>
                <span className={`text-xs mt-1 font-bold ${activeYear === i ? 'text-gray-800' : 'text-gray-400'}`}>{t.year}</span>
              </button>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full mb-6 mx-4">
            <div className="absolute h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full transition-all duration-500" style={{ width: `${(activeYear / (timeline.length - 1)) * 100}%` }} />
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{timeline[activeYear].icon}</span>
              <div>
                <h4 className="font-bold text-lg text-gray-800">{timeline[activeYear].title}</h4>
                <span className="text-sm text-indigo-600 font-bold">ปี {timeline[activeYear].year}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{timeline[activeYear].desc}</p>
          </div>
        </div>
      )}

      {tab === 'strengths' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {strengths.map((s, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-4 border border-indigo-100 hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <h4 className="font-bold text-sm text-gray-800 mb-1">{s.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
