import React, { useState } from 'react';

const steps = [
  {
    id: 'python',
    title: '1. ติดตั้ง Python',
    icon: '🐍',
    os: {
      windows: {
        desc: 'ดาวน์โหลดตัวติดตั้งจาก python.org',
        actions: [
          'ไปที่ python.org/downloads',
          'โหลดตัวติดตั้ง Windows installer',
          '🔥 สำคัญมาก: ตอนติดตั้งต้องติ๊กเครื่องหมายถูกที่ "Add Python to PATH"',
          'กด Install Now'
        ],
        check: 'เปิด Command Prompt พิมพ์ `python --version`'
      },
      mac: {
        desc: 'ติดตั้งผ่าน Homebrew หรือโหลดจากเว็บ',
        actions: [
          'เปิด Terminal',
          'พิมพ์คำสั่ง `brew install python`',
          'หรือโหลดตัวติดตั้ง macOS จาก python.org'
        ],
        check: 'เปิด Terminal พิมพ์ `python3 --version`'
      }
    }
  },
  {
    id: 'ide',
    title: '2. ติดตั้ง IDE (VS Code)',
    icon: '💻',
    os: {
      windows: {
        desc: 'ใช้ Visual Studio Code เป็นเครื่องมือเขียนโปรแกรมหลัก',
        actions: [
          'ไปที่ code.visualstudio.com',
          'โหลดตัวติดตั้งและติดตั้งตามปกติ',
          'เปิด VS Code ขึ้นมา',
          'ไปที่เมนู Extensions (รูปบล็อกต่อกันด้านซ้าย)',
          'ค้นหาคำว่า "Python" (ของ Microsoft) แล้วกด Install'
        ],
        check: 'สร้างไฟล์ test.py พิมพ์ print("Hello") แล้วกดปุ่ม Play มุมขวาบน'
      },
      mac: {
        desc: 'ใช้ Visual Studio Code เป็นเครื่องมือเขียนโปรแกรมหลัก',
        actions: [
          'ไปที่ code.visualstudio.com',
          'โหลดไฟล์ .zip แตกไฟล์แล้วลากเข้าโฟลเดอร์ Applications',
          'เปิด VS Code ขึ้นมา',
          'ไปที่เมนู Extensions',
          'ค้นหาคำว่า "Python" แล้วกด Install'
        ],
        check: 'สร้างไฟล์ test.py พิมพ์ print("Hello") แล้วกดปุ่ม Play มุมขวาบน'
      }
    }
  }
];

export default function SetupGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [os, setOs] = useState('windows');

  const step = steps[activeStep];
  const osData = step.os[os];

  return (
    <div className="w-full my-12">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">⚙️ การติดตั้งเครื่องมือพัฒนา</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">คู่มือทีละขั้นตอนสำหรับ Windows และ macOS</p>

      {/* OS Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex">
          <button 
            onClick={() => setOs('windows')} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${os === 'windows' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🪟 Windows
          </button>
          <button 
            onClick={() => setOs('mac')} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${os === 'mac' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🍎 macOS
          </button>
        </div>
      </div>

      {/* Step Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {steps.map((s, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${activeStep === idx ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            <span className="mr-2 text-lg">{s.icon}</span> {s.title}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
            {activeStep + 1}
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800">{step.title}</h4>
            <p className="text-sm text-gray-500">{osData.desc}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 mb-4 border border-slate-100">
          <p className="font-bold text-slate-700 mb-3 text-sm">ขั้นตอนการทำ:</p>
          <ul className="space-y-3">
            {osData.actions.map((act, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">{i+1}</span>
                <span className={`text-sm ${act.includes('สำคัญมาก') ? 'text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded' : 'text-gray-700'}`}>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 items-center">
          <span className="text-xl">✅</span>
          <div>
            <p className="text-xs font-bold text-green-800 mb-1">วิธีตรวจสอบว่าสำเร็จ</p>
            <code className="text-xs bg-white px-2 py-1 rounded text-green-700 border border-green-100">{osData.check}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
