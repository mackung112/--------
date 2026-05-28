import React from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Star, 
  Code2, 
  Globe2, 
  Database, 
  BrainCircuit, 
  Bot,
  TerminalSquare,
  BarChart4,
  HeartHandshake,
  Zap,
  CheckCircle2,
  Building2,
  Music,
  Video,
  Camera
} from 'lucide-react';

export default function pyUnit1_4_PythonFeatures() {
  const teacherTaskContent = `คำถามทบทวนความเข้าใจ (1.4):
1. จงบอก "จุดเด่น" ของภาษา Python มาอย่างน้อย 3 ข้อ ที่ทำให้ภาษานี้ได้รับความนิยมมากที่สุดในโลก
2. นักเรียนคิดว่า "ไวยากรณ์ (Syntax) ที่อ่านง่ายเหมือนภาษาอังกฤษ" มีประโยชน์อย่างไรต่อคนที่เพิ่งเริ่มเรียนเขียนโปรแกรม?
3. ยกตัวอย่างแอปพลิเคชันระดับโลกที่ใช้ภาษา Python ในการพัฒนามาอย่างน้อย 2 แอป พร้อมบอกว่าเขาใช้ Python ทำอะไร
4. หากนักเรียนต้องการสร้าง AI หรือโมเดลทำนายข้อมูล (Data Science) ทำไม Python จึงเป็นตัวเลือกแรกๆ ที่ควรใช้?`;

  const platforms = [
    {
      name: "Instagram",
      icon: <Camera className="w-8 h-8 text-pink-500" />,
      color: "from-purple-500 to-pink-500",
      desc: "ใช้ Python (Django framework) เป็นระบบหลังบ้านที่จัดการผู้ใช้งานและรูปภาพหลายร้อยล้านคนทั่วโลก"
    },
    {
      name: "Spotify",
      icon: <Music className="w-8 h-8 text-green-500" />,
      color: "from-green-400 to-green-600",
      desc: "ใช้สำหรับวิเคราะห์ข้อมูลการฟังเพลงของผู้ใช้ (Data Analytics) และแนะนำเพลงที่ตรงใจในเพลย์ลิสต์"
    },
    {
      name: "Netflix",
      icon: <Video className="w-8 h-8 text-red-500" />,
      color: "from-red-500 to-red-700",
      desc: "ใช้ Python ดูแลระบบความปลอดภัย, วิเคราะห์พฤติกรรมการดูหนัง และแนะนำภาพยนตร์เรื่องต่อไป"
    },
    {
      name: "Google",
      icon: <Globe2 className="w-8 h-8 text-blue-500" />,
      color: "from-blue-400 to-blue-600",
      desc: "Python เป็น 1 ใน 3 ภาษาหลักขององค์กร ใช้ทำระบบค้นหา (Search Engine) และระบบ AI ภายใน"
    }
  ];

  return (
    <div className="font-sans text-slate-800 relative pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[0%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section removed (Handled by LessonViewer) */}

        {/* 1.4.1 Features & Syntax */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-bl-full -z-0"></div>
          
          <div className="relative z-10">

            <h3 className="text-3xl font-bold text-slate-800 mb-8">ลักษณะเด่นและไวยากรณ์พื้นฐาน</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">ไวยากรณ์สะอาด อ่านง่าย</h4>
                    <p className="text-slate-600 leading-loose">
                      Python ออกแบบมาให้อ่านง่ายเหมือนภาษาอังกฤษ (Readable) ตัดสัญลักษณ์ที่ซับซ้อนทิ้งไป เช่น ไม่ต้องใส่ <code>;</code> ปิดท้ายบรรทัด และไม่ใช้ <code>{}</code> ในการแบ่งบล็อกคำสั่ง แต่ใช้การย่อหน้า (Indentation) แทน
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">เป็นมิตรกับผู้เริ่มต้น</h4>
                    <p className="text-slate-600 leading-loose">
                      เขียนโค้ดได้สั้นและได้ผลลัพธ์เร็ว ไม่ต้องประกาศชนิดตัวแปรก่อนใช้งาน (Dynamic Typed) ทำให้คนที่เพิ่งเริ่มเรียนไม่ท้อไปซะก่อน
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">มีไลบรารี (Library) มหาศาล</h4>
                    <p className="text-slate-600 leading-loose">
                      มีชุดคำสั่งสำเร็จรูปที่มีคนเขียนไว้แจกฟรีให้เราหยิบมาใช้ได้ทันที (เหมือนมีคนเตรียมวัตถุดิบไว้ให้ทำอาหาร) ทำได้ตั้งแต่ทำเว็บไปจนถึงสร้าง AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Comparison Card */}
              <div className="bg-[#0f172a] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <div className="bg-gradient-to-r from-blue-900 to-slate-900 px-6 py-4 border-b border-slate-700">
                  <h5 className="font-bold text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" /> เปรียบเทียบความสั้นของโค้ด
                  </h5>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-slate-400 text-sm mb-2 font-mono flex items-center justify-between">
                      <span>ภาษา C++ (พิมพ์ข้อความ 1 บรรทัด)</span>
                      <span className="bg-slate-800 px-2 py-1 rounded text-xs">6 บรรทัด</span>
                    </div>
                    <div className="font-mono text-slate-500 text-sm whitespace-pre leading-loose pl-4 border-l-2 border-slate-700">
{`#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!";
    return 0;
}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-300 text-sm mb-2 font-mono flex items-center justify-between">
                      <span className="font-bold text-yellow-400">ภาษา Python</span>
                      <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs font-bold border border-blue-800">1 บรรทัด!</span>
                    </div>
                    <div className="font-mono text-emerald-400 text-base font-bold whitespace-pre leading-loose pl-4 border-l-2 border-yellow-500 bg-blue-900/20 py-2 rounded-r-lg">
{`print("Hello World!")`}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 1.4.2 & 1.4.3 Applications & Importance */}
        <div className="mb-16">
          <div className="text-center mb-10">

            <h3 className="text-3xl font-bold text-slate-800">การประยุกต์ใช้งานและความสำคัญ</h3>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto leading-loose">
              "ภาษาเดียว ครอบคลุมเกือบทุกวงการ" นี่คือเหตุผลว่าทำไม Python จึงสำคัญมากในอุตสาหกรรมซอฟต์แวร์ปัจจุบัน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">AI & Machine Learning</h4>
              <p className="text-slate-600 text-sm leading-loose">
                เป็นภาษาเบอร์ 1 ของวงการปัญญาประดิษฐ์ (AI) ไม่ว่าจะเป็น ChatGPT หรือระบบจดจำใบหน้า ล้วนใช้ Python เป็นหลัก เพราะมี Library ที่ทรงพลัง (เช่น TensorFlow, PyTorch)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <BarChart4 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Data Science</h4>
              <p className="text-slate-600 text-sm leading-loose">
                วิทยาการข้อมูลและการวิเคราะห์ข้อมูล (Data Analytics) นิยมใช้ Python เพื่อประมวลผลข้อมูลมหาศาลและสร้างกราฟสรุปผล (เช่น Pandas, Matplotlib)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Globe2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Web Development</h4>
              <p className="text-slate-600 text-sm leading-loose">
                ใช้สร้างระบบหลังบ้าน (Backend) ของเว็บไซต์ให้ปลอดภัยและรองรับคนเข้าชมจำนวนมากได้อย่างมีเสถียรภาพ (เช่น Django, Flask)
              </p>
            </div>
          </div>
        </div>

        {/* 1.4.4 Platforms Built With Python */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">

              <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Building2 className="w-8 h-8 text-slate-400" />
                แพลตฟอร์มระดับโลกที่สร้างด้วย Python
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 mb-4 group-hover:scale-110 transition-transform`}>
                    {platform.icon}
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">{platform.name}</h4>
                  <p className="text-slate-400 text-sm leading-loose">
                    {platform.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 1.4)" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}
