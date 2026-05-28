import React, { useState } from 'react';
import { 
    Code2, 
    Cpu, 
    Globe, 
    User, 
    Zap, 
    Database, 
    Brain, 
    Terminal, 
    ChevronRight,
    MonitorSmartphone,
    Rocket
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

export default function py1_1() {
    // States for interactives
    const [activeComponent, setActiveComponent] = useState(null);
    const [activePerson, setActivePerson] = useState(0);
    const [relationStep, setRelationStep] = useState(0);
    const [activeScenario, setActiveScenario] = useState(null);

    // Data for interactive sections
    const langComponents = [
        { id: 'syntax', name: 'ไวยากรณ์ (Syntax)', desc: 'กฎเกณฑ์และรูปแบบการเขียนโค้ดที่ต้องพิมพ์ให้ถูกต้องเป๊ะๆ (เช่น การเว้นวรรค, การใส่เครื่องหมาย)', icon: <Code2 className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
        { id: 'semantics', name: 'ความหมาย (Semantics)', desc: 'ผลลัพธ์หรือการทำงานที่เกิดขึ้นจริงเมื่อรันโค้ดนั้นๆ (แม้ไวยากรณ์ถูก แต่ความหมายอาจผิดได้)', icon: <Brain className="w-6 h-6" />, color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
        { id: 'pragmatics', name: 'การนำไปใช้ (Pragmatics)', desc: 'บริบทและจุดประสงค์ของการเขียนโค้ดชุดนั้น เพื่อแก้ปัญหาใดปัญหาหนึ่งในสถานการณ์จริง', icon: <Zap className="w-6 h-6" />, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    ];

    const historicalFigures = [
        { 
            name: 'Ada Lovelace', 
            title: 'โปรแกรมเมอร์คนแรกของโลก', 
            year: 'ค.ศ. 1843', 
            desc: 'ผู้เขียนอัลกอริทึมแรกสำหรับเครื่อง Analytical Engine ของ Charles Babbage ถือเป็นจุดกำเนิดของแนวคิดการเขียนโปรแกรม',
            img: '👩‍💻'
        },
        { 
            name: 'Charles Babbage', 
            title: 'บิดาแห่งคอมพิวเตอร์', 
            year: 'ค.ศ. 1837', 
            desc: 'ผู้ออกแบบเครื่องจักรคำนวณที่เรียกว่า Analytical Engine ซึ่งเป็นต้นแบบของคอมพิวเตอร์ในปัจจุบัน',
            img: '⚙️'
        },
        { 
            name: 'Guido van Rossum', 
            title: 'ผู้สร้างภาษา Python', 
            year: 'ค.ศ. 1991', 
            desc: 'ออกแบบภาษา Python โดยเน้นให้อ่านง่าย โค้ดสะอาด และสามารถนำไปประยุกต์ใช้งานได้หลากหลาย',
            img: '🐍'
        }
    ];

    const timeline = [
        { year: '1940s', name: 'ภาษาเครื่อง (Machine Code)', desc: 'ใช้เลข 0 และ 1 (Binary) สั่งงานโดยตรง เข้าใจยากมาก' },
        { year: '1950s', name: 'ภาษาแอสเซมบลี (Assembly)', desc: 'ใช้ตัวอักษรย่อ (Mnemonic) แทนเลข 0, 1 เริ่มอ่านง่ายขึ้น' },
        { year: '1970s', name: 'ภาษาระดับสูง (C, Pascal)', desc: 'ใช้คำภาษาอังกฤษ โครงสร้างชัดเจน เป็นต้นแบบของภาษาปัจจุบัน' },
        { year: '1990s', name: 'ภาษายุคอินเทอร์เน็ต (Python, Java)', desc: 'เขียนง่ายขึ้น รองรับ OOP และพัฒนาเว็บ' },
        { year: 'ปัจจุบัน', name: 'ภาษาและ AI', desc: 'มีไลบรารีมหาศาล โค้ดสั้นลง และ AI เข้ามาช่วยเขียนโค้ด' },
    ];

    const scenarios = [
        { 
            id: 1, 
            question: 'ต้องการพัฒนาปัญญาประดิษฐ์ (AI) และวิเคราะห์ข้อมูล?', 
            lang: 'Python', 
            reason: 'มีไลบรารีสำหรับ AI/Data (เช่น Pandas, TensorFlow) เยอะที่สุด ใช้งานง่าย',
            icon: <Brain className="w-8 h-8 text-indigo-500" />
        },
        { 
            id: 2, 
            question: 'ต้องการสร้างเว็บไซต์แบบโต้ตอบได้ (Frontend)?', 
            lang: 'JavaScript', 
            reason: 'เป็นภาษาเดียวที่ทำงานบนเว็บบราว์เซอร์ได้โดยตรง ควบคุม UI ได้ทั้งหมด',
            icon: <Globe className="w-8 h-8 text-cyan-500" />
        },
        { 
            id: 3, 
            question: 'ต้องการสร้างแอปพลิเคชันบน iPhone (iOS)?', 
            lang: 'Swift', 
            reason: 'พัฒนาโดย Apple เพื่อให้ทำงานบน iOS ได้อย่างมีประสิทธิภาพสูงสุด',
            icon: <MonitorSmartphone className="w-8 h-8 text-orange-500" />
        },
        { 
            id: 4, 
            question: 'ต้องการเขียนระบบฝังตัวหรือเกมที่ต้องการความเร็วสูงมาก?', 
            lang: 'C++', 
            reason: 'ทำงานใกล้ชิดฮาร์ดแวร์ ควบคุมหน่วยความจำได้เอง จึงทำงานได้เร็วมาก',
            icon: <Cpu className="w-8 h-8 text-red-500" />
        }
    ];

    return (
        <div className="w-full mx-auto space-y-8 font-['Inter',_'Noto_Sans_Thai']">
            {/* Ambient Backdrop Layer */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
            </div>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-8">
                
                {/* 1.1.1 ความหมายและองค์ประกอบ */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-[26px] font-semibold text-zinc-900 leading-relaxed">
                                ความหมายและองค์ประกอบของภาษาคอมพิวเตอร์
                            </h3>
                        </div>
                        
                        <p className="text-[15px] text-zinc-600 leading-relaxed mb-6">
                            <strong>ภาษาคอมพิวเตอร์ (Computer Language)</strong> คือ สื่อกลางที่ใช้ในการสื่อสารระหว่างมนุษย์กับเครื่องคอมพิวเตอร์ เพื่อสั่งให้คอมพิวเตอร์ทำงานตามที่เราต้องการ โดยมีองค์ประกอบหลัก 3 ส่วน ให้ลองคลิกเพื่อดูรายละเอียด:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {langComponents.map((comp) => (
                                <button
                                    key={comp.id}
                                    onClick={() => setActiveComponent(comp.id === activeComponent ? null : comp.id)}
                                    className={`p-4 rounded-xl text-left transition-all duration-300 active:scale-98 border ${
                                        activeComponent === comp.id 
                                        ? `${comp.bg} ${comp.border} shadow-md ring-2 ring-indigo-500/20` 
                                        : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                                        activeComponent === comp.id ? 'bg-white' : comp.bg
                                    } ${comp.color}`}>
                                        {comp.icon}
                                    </div>
                                    <h4 className="text-[18px] font-semibold text-zinc-900 mb-2">{comp.name}</h4>
                                    <div className={`overflow-hidden transition-all duration-300 ${activeComponent === comp.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-[14px] text-zinc-700 leading-relaxed mt-2 border-t border-zinc-200/50 pt-2">
                                            {comp.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 1.1.2 บิดาแห่งภาษาโปรแกรมคอมพิวเตอร์ */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
                                <User className="w-5 h-5" />
                            </div>
                            <h3 className="text-[26px] font-semibold text-zinc-900 leading-relaxed">
                                บุคคลสำคัญในโลกภาษาโปรแกรมคอมพิวเตอร์
                            </h3>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/3 flex flex-col gap-3">
                                {historicalFigures.map((person, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActivePerson(idx)}
                                        className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 active:scale-98 ${
                                            activePerson === idx 
                                            ? 'bg-indigo-600 text-white shadow-md' 
                                            : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                                        }`}
                                    >
                                        <div className="text-3xl">{person.img}</div>
                                        <div className="text-left">
                                            <div className={`font-semibold ${activePerson === idx ? 'text-white' : 'text-zinc-900'}`}>{person.name}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            <div className="w-full md:w-2/3 bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden h-full min-h-[220px] flex items-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
                                <div key={activePerson} className="relative z-10 animate-fade-in-up">
                                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-sm font-mono mb-3 border border-indigo-400/30">
                                        {historicalFigures[activePerson].year}
                                    </span>
                                    <h4 className="text-[24px] font-bold text-white mb-1">
                                        {historicalFigures[activePerson].title}
                                    </h4>
                                    <h5 className="text-[16px] text-cyan-400 mb-4">{historicalFigures[activePerson].name}</h5>
                                    <p className="text-[15px] text-slate-300 leading-relaxed">
                                        {historicalFigures[activePerson].desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1.1.3 & 1.1.5 ความหมายและความสัมพันธ์ระหว่างภาษาคอมพิวเตอร์กับโปรแกรม */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-[26px] font-semibold text-zinc-900 leading-relaxed">
                                ความสัมพันธ์ระหว่างภาษาคอมพิวเตอร์กับโปรแกรม
                            </h3>
                        </div>

                        <p className="text-[15px] text-zinc-600 leading-relaxed mb-8">
                            เพื่อให้เห็นภาพชัดเจน ลองนึกว่าคอมพิวเตอร์คือพ่อครัวที่ทำตามคำสั่งอย่างเคร่งครัด
                        </p>

                        <div className="relative max-w-3xl mx-auto">
                            {/* Connection Line */}
                            <div className="absolute top-[50%] left-0 right-0 h-1 bg-zinc-200 -z-10 hidden md:block">
                                <div 
                                    className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                                    style={{ width: `${(relationStep / 2) * 100}%` }}
                                ></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div 
                                    className={`flex flex-col items-center text-center transition-all duration-500 cursor-pointer ${relationStep >= 0 ? 'opacity-100' : 'opacity-50 blur-sm'}`}
                                    onClick={() => setRelationStep(0)}
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${relationStep >= 0 ? 'bg-indigo-100 text-indigo-600 ring-4 ring-indigo-50 shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>
                                        <User className="w-8 h-8" />
                                    </div>
                                    <h4 className="font-semibold text-zinc-900 mb-2">1. มนุษย์ (Programmer)</h4>
                                    <p className="text-[13px] text-zinc-500">ผู้มีความคิดและต้องการแก้ปัญหา แต่พูดภาษาเครื่องไม่เป็น</p>
                                </div>

                                <div 
                                    className={`flex flex-col items-center text-center transition-all duration-500 cursor-pointer ${relationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                                    onClick={() => setRelationStep(1)}
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${relationStep >= 1 ? 'bg-cyan-100 text-cyan-600 ring-4 ring-cyan-50 shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>
                                        <Code2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="font-semibold text-zinc-900 mb-2">2. ภาษาคอมพิวเตอร์</h4>
                                    <p className="text-[13px] text-zinc-500">เครื่องมือที่มนุษย์ใช้เขียน <strong>"โปรแกรม"</strong> (ชุดคำสั่ง) ที่มีโครงสร้างชัดเจน</p>
                                </div>

                                <div 
                                    className={`flex flex-col items-center text-center transition-all duration-500 cursor-pointer ${relationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                                    onClick={() => setRelationStep(2)}
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${relationStep >= 2 ? 'bg-emerald-100 text-emerald-600 ring-4 ring-emerald-50 shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>
                                        <Cpu className="w-8 h-8" />
                                    </div>
                                    <h4 className="font-semibold text-zinc-900 mb-2">3. คอมพิวเตอร์</h4>
                                    <p className="text-[13px] text-zinc-500">เครื่องจักรที่รับโปรแกรมไปแปลงเป็นภาษาเครื่อง และทำงานตามคำสั่ง</p>
                                </div>
                            </div>
                            
                            <div className="mt-8 text-center">
                                {relationStep < 2 ? (
                                    <button 
                                        onClick={() => setRelationStep(prev => prev + 1)}
                                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 active:scale-98 transition-all shadow-sm"
                                    >
                                        ดูขั้นตอนต่อไป <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-800 text-[15px] font-semibold animate-fade-in">
                                        💡 สรุป: ภาษาคอมพิวเตอร์ คือเครื่องมือสร้างโปรแกรม, ส่วนโปรแกรม คือชุดคำสั่งที่นำไปสั่งคอมพิวเตอร์
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1.1.4 ประวัติและวิวัฒนาการ */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                                <Rocket className="w-5 h-5" />
                            </div>
                            <h3 className="text-[26px] font-semibold text-zinc-900 leading-relaxed">
                                ประวัติและวิวัฒนาการโดยย่อ
                            </h3>
                        </div>

                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Marker */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm transition-all duration-300 group-hover:border-indigo-300 group-hover:shadow-md group-hover:-translate-y-1">
                                        <span className="font-mono text-sm text-indigo-600 font-bold mb-1 block">{item.year}</span>
                                        <h4 className="font-semibold text-zinc-900 mb-1">{item.name}</h4>
                                        <p className="text-[14px] text-zinc-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 1.1.6 & 1.1.7 การเลือกใช้ภาษาคอมพิวเตอร์ */}
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <h3 className="text-[26px] font-semibold text-zinc-900 leading-relaxed">
                                การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสม
                            </h3>
                        </div>

                        <p className="text-[15px] text-zinc-600 leading-relaxed mb-6">
                            ไม่มีภาษาใดที่ดีที่สุดในโลก มีแต่ภาษาที่ <strong>"เหมาะสมกับงาน"</strong> มากที่สุด ลองเลือกความต้องการของคุณด้านล่าง เพื่อดูว่าควรใช้ภาษาอะไร:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {scenarios.map((scenario) => (
                                <button
                                    key={scenario.id}
                                    onClick={() => setActiveScenario(scenario.id)}
                                    className={`text-left p-5 rounded-xl border transition-all duration-200 active:scale-98 flex items-start gap-4 ${
                                        activeScenario === scenario.id 
                                        ? 'bg-indigo-50 border-indigo-500 shadow-md ring-1 ring-indigo-500' 
                                        : 'bg-white border-zinc-200 hover:border-indigo-300 hover:bg-zinc-50'
                                    }`}
                                >
                                    <div className="mt-1 shrink-0">
                                        {scenario.icon}
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold mb-2 leading-relaxed ${activeScenario === scenario.id ? 'text-indigo-900' : 'text-zinc-800'}`}>
                                            {scenario.question}
                                        </h4>
                                        <div className={`overflow-hidden transition-all duration-300 ${activeScenario === scenario.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="pt-3 border-t border-indigo-100">
                                                <div className="font-bold text-indigo-700 text-lg mb-1">{scenario.lang}</div>
                                                <p className="text-[14px] text-zinc-600 leading-relaxed">{scenario.reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <TeacherTask 
                    title="ภารกิจประจำหัวข้อ"
                    description="ให้นักเรียนสรุปความหมายของภาษาคอมพิวเตอร์ และยกตัวอย่างภาษาคอมพิวเตอร์ที่นักเรียนรู้จักหรือเคยได้ยินชื่อ มาอย่างน้อย 2 ภาษา พร้อมบอกเหตุผลว่าทำไมถึงรู้จักภาษาเหล่านั้น"
                    code={`# ตัวอย่างรูปแบบการตอบ
คำตอบ: ภาษาคอมพิวเตอร์ คือ ......

ภาษาที่รู้จัก 1: ......
เหตุผลที่รู้จัก: ......

ภาษาที่รู้จัก 2: ......
เหตุผลที่รู้จัก: ......
`}
                />
            </main>
            
            {/* Custom CSS for Animations in this component scope */}
            <style jsx="true">{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
