import React, { useState } from 'react';
import { 
    Cpu, 
    Code, 
    Database, 
    Brain, 
    Layers, 
    ArrowRight,
    Activity,
    Server,
    Network,
    Sparkles,
    TerminalSquare,
    Globe
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';

export default function py1_2() {
    // States for interactives
    const [activeGen, setActiveGen] = useState(0);
    const [activeTrend, setActiveTrend] = useState(null);
    const [compareStep, setCompareStep] = useState(1); // 1 = Machine, 2 = Assembly, 3 = High-level

    const generations = [
        {
            id: 'gen1',
            name: 'ภาษาเครื่อง (Machine Language)',
            level: 'ต่ำ (Low-Level)',
            desc: 'ภาษารุ่นที่ 1 (1GL) สื่อสารด้วยเลขฐานสอง (0 และ 1) คอมพิวเตอร์เข้าใจทันที แต่มนุษย์เข้าใจยากมากและทำงานช้า',
            icon: <Activity className="w-8 h-8" />,
            color: 'text-red-500',
            bg: 'bg-red-100',
            borderColor: 'border-red-500',
            glowColor: 'bg-red-500/20'
        },
        {
            id: 'gen2',
            name: 'ภาษาแอสเซมบลี (Assembly Language)',
            level: 'ต่ำ (Low-Level)',
            desc: 'ภาษารุ่นที่ 2 (2GL) ใช้สัญลักษณ์ตัวอักษรภาษาอังกฤษ (Mnemonic Code) แทนเลข 0 และ 1 ต้องใช้ตัวแปลภาษา Assembler',
            icon: <Cpu className="w-8 h-8" />,
            color: 'text-orange-500',
            bg: 'bg-orange-100',
            borderColor: 'border-orange-500',
            glowColor: 'bg-orange-500/20'
        },
        {
            id: 'gen3',
            name: 'ภาษาระดับสูง (High-Level Language)',
            level: 'สูง (High-Level)',
            desc: 'ภาษารุ่นที่ 3 (3GL) ไวยากรณ์คล้ายภาษาอังกฤษ (เช่น C, Java, Python) มนุษย์อ่านเข้าใจง่าย เขียนโค้ดได้รวดเร็ว',
            icon: <Code className="w-8 h-8" />,
            color: 'text-indigo-500',
            bg: 'bg-indigo-100',
            borderColor: 'border-indigo-500',
            glowColor: 'bg-indigo-500/20'
        },
        {
            id: 'gen4',
            name: 'ภาษาเฉพาะทาง (4GL)',
            level: 'สูงมาก (Very High-Level)',
            desc: 'ภาษารุ่นที่ 4 (4GL) ออกแบบมาเพื่องานเฉพาะด้าน เช่น SQL สำหรับจัดการฐานข้อมูล หรือเครื่องมือสร้างหน้าจออัตโนมัติ',
            icon: <Database className="w-8 h-8" />,
            color: 'text-cyan-500',
            bg: 'bg-cyan-100',
            borderColor: 'border-cyan-500',
            glowColor: 'bg-cyan-500/20'
        },
        {
            id: 'gen5',
            name: 'ภาษาปัญญาประดิษฐ์ (5GL)',
            level: 'ภาษาธรรมชาติ (Natural)',
            desc: 'ภาษารุ่นที่ 5 (5GL) สั่งการด้วยภาษาธรรมชาติที่มนุษย์ใช้พูดกัน เน้นแก้ปัญหาด้วย AI และระบบผู้เชี่ยวชาญ (Expert Systems)',
            icon: <Brain className="w-8 h-8" />,
            color: 'text-fuchsia-500',
            bg: 'bg-fuchsia-100',
            borderColor: 'border-fuchsia-500',
            glowColor: 'bg-fuchsia-500/20'
        }
    ];

    const futureTrends = [
        {
            title: 'Low-Code / No-Code',
            desc: 'การพัฒนาแอปพลิเคชันโดยเขียนโค้ดให้น้อยที่สุด หรือไม่ต้องเขียนโค้ดเลย ใช้การลากวาง (Drag & Drop) แทน',
            icon: <Layers className="w-6 h-6" />,
            theme: 'from-blue-500 to-cyan-400'
        },
        {
            title: 'AI-Assisted Coding',
            desc: 'AI ช่วยเขียนโค้ด ตรวจจับข้อผิดพลาด และแนะนำโครงสร้างที่ดีที่สุด (เช่น GitHub Copilot)',
            icon: <Sparkles className="w-6 h-6" />,
            theme: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Quantum Computing',
            desc: 'ภาษาโปรแกรมรูปแบบใหม่ที่ออกแบบมาเพื่อทำงานกับควอนตัมคอมพิวเตอร์ (เช่น Q#)',
            icon: <Network className="w-6 h-6" />,
            theme: 'from-amber-500 to-orange-500'
        }
    ];

    return (
        <div className="w-full mx-auto space-y-8 font-['Inter',_'Noto_Sans_Thai'] pb-12">
            {/* Layer 1: Ambient Backdrop */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[0%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
            </div>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-12">
                
                {/* วิวัฒนาการและระดับของภาษาคอมพิวเตอร์ (Interactive Timeline) */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                ระดับของภาษาคอมพิวเตอร์และวิวัฒนาการ
                            </h3>
                        </div>

                        <p className="text-[16px] text-zinc-600 leading-relaxed mb-8">
                            ภาษาคอมพิวเตอร์ถูกแบ่งออกเป็นระดับต่างๆ ตามความใกล้เคียงกับภาษาเครื่อง (ที่คอมพิวเตอร์เข้าใจ) และความใกล้เคียงกับภาษามนุษย์ ยิ่งภาษามีระดับสูงเท่าไหร่ มนุษย์ยิ่งเข้าใจง่ายขึ้นเท่านั้น <strong>คลิกเลือกเพื่อดูรายละเอียดแต่ละรุ่น (Generation)</strong>
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            {generations.map((gen, idx) => (
                                <button
                                    key={gen.id}
                                    onClick={() => setActiveGen(idx)}
                                    className={`relative p-5 rounded-2xl text-left transition-all duration-300 active:scale-95 group overflow-hidden ${
                                        activeGen === idx 
                                        ? `bg-white shadow-xl ring-2 ${gen.borderColor} scale-[1.02]` 
                                        : 'bg-zinc-50 border border-zinc-200 hover:bg-zinc-100'
                                    }`}
                                >
                                    {activeGen === idx && (
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${gen.glowColor}`}></div>
                                    )}
                                    
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors relative z-10 ${
                                        activeGen === idx ? gen.bg + ' ' + gen.color : 'bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300'
                                    }`}>
                                        {gen.icon}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Gen {idx + 1}</div>
                                        <h4 className={`font-bold mb-1 leading-tight ${activeGen === idx ? 'text-zinc-900' : 'text-zinc-700'}`}>
                                            {gen.name}
                                        </h4>
                                        <div className={`text-sm font-semibold mb-3 ${activeGen === idx ? gen.color : 'text-zinc-500'}`}>
                                            {gen.level}
                                        </div>
                                    </div>
                                    
                                    {/* Mobile/Tablet indicator */}
                                    <div className={`lg:hidden mt-2 overflow-hidden transition-all duration-300 ${activeGen === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-[14px] text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                                            {gen.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Detail Panel (Desktop mostly) */}
                        <div className="hidden lg:block mt-6 p-8 rounded-2xl bg-zinc-900 text-white relative overflow-hidden shadow-2xl animate-fade-in-up">
                            <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full transition-colors duration-700 ${generations[activeGen].glowColor}`}></div>
                            
                            <div className="relative z-10 flex gap-8 items-center">
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 backdrop-blur-md ${generations[activeGen].color}`}>
                                    {React.cloneElement(generations[activeGen].icon, { className: "w-12 h-12" })}
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-3">
                                        Generation {activeGen + 1}
                                    </div>
                                    <h4 className="text-[28px] font-bold text-white mb-3">{generations[activeGen].name}</h4>
                                    <p className="text-[16px] text-zinc-300 leading-relaxed max-w-3xl">
                                        {generations[activeGen].desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ภาษาระดับต่ำ vs ภาษาระดับสูง (Code Simulator) */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                                <TerminalSquare className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                เปรียบเทียบความเข้าใจ (มนุษย์ vs เครื่องจักร)
                            </h3>
                        </div>

                        <p className="text-[16px] text-zinc-600 leading-relaxed mb-8">
                            ลองกดปุ่มด้านซ้ายเพื่อดูวิวัฒนาการในการสั่งให้คอมพิวเตอร์แสดงคำว่า <strong>"Hello"</strong> ในแต่ละระดับภาษา
                        </p>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 flex flex-col gap-3">
                                <button 
                                    onClick={() => setCompareStep(1)}
                                    className={`p-4 rounded-xl font-semibold text-left transition-all active:scale-95 flex items-center justify-between ${
                                        compareStep === 1 
                                        ? 'bg-zinc-900 text-white shadow-lg' 
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                                >
                                    <span>ภาษาเครื่อง (Machine)</span>
                                    {compareStep === 1 && <ArrowRight className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => setCompareStep(2)}
                                    className={`p-4 rounded-xl font-semibold text-left transition-all active:scale-95 flex items-center justify-between ${
                                        compareStep === 2 
                                        ? 'bg-zinc-900 text-white shadow-lg' 
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                                >
                                    <span>ภาษาแอสเซมบลี (Assembly)</span>
                                    {compareStep === 2 && <ArrowRight className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => setCompareStep(3)}
                                    className={`p-4 rounded-xl font-semibold text-left transition-all active:scale-95 flex items-center justify-between ${
                                        compareStep === 3 
                                        ? 'bg-indigo-600 text-white shadow-lg' 
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                                >
                                    <span>ภาษาระดับสูง (Python)</span>
                                    {compareStep === 3 && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="w-full md:w-2/3 bg-[#0D1117] rounded-xl border border-zinc-800 p-6 flex items-center justify-center min-h-[200px] relative overflow-hidden font-mono text-sm sm:text-base shadow-inner">
                                {/* Code window decorations */}
                                <div className="absolute top-0 left-0 w-full h-8 bg-[#161B22] border-b border-zinc-800 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-xs text-zinc-500">example.code</div>
                                </div>
                                
                                <div className="mt-6 w-full text-left" key={compareStep}>
                                    {compareStep === 1 && (
                                        <div className="text-green-400 animate-fade-in break-all tracking-widest opacity-80 leading-loose">
                                            01001000 01100101 01101100 01101100 01101111<br/>
                                            <span className="text-zinc-500 text-xs font-sans mt-4 block">/* เครื่องเข้าใจทันที แต่มนุษย์แทบอ่านไม่ออก */</span>
                                        </div>
                                    )}
                                    {compareStep === 2 && (
                                        <div className="text-orange-300 animate-fade-in leading-relaxed">
                                            MOV AH, 09h<br/>
                                            LEA DX, msg<br/>
                                            INT 21h<br/>
                                            <span className="text-zinc-500 text-xs font-sans mt-4 block">/* เริ่มใช้คำย่อภาษาอังกฤษ ต้องแปลเป็นภาษาเครื่องก่อน */</span>
                                        </div>
                                    )}
                                    {compareStep === 3 && (
                                        <div className="text-indigo-300 animate-fade-in leading-relaxed text-xl">
                                            <span className="text-pink-400">print</span>(<span className="text-green-300">"Hello"</span>)<br/>
                                            <span className="text-zinc-500 text-xs font-sans mt-4 block">/* อ่านออกเสียงได้เหมือนภาษาอังกฤษ มนุษย์เข้าใจได้ทันที */</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* แนวโน้มในอนาคต */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60 overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-[28px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                                แนวโน้มภาษาโปรแกรมคอมพิวเตอร์ในอนาคต
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {futureTrends.map((trend, idx) => (
                                <div 
                                    key={idx}
                                    onMouseEnter={() => setActiveTrend(idx)}
                                    onMouseLeave={() => setActiveTrend(null)}
                                    className="relative group p-6 rounded-2xl border border-zinc-200 bg-white hover:border-transparent transition-all duration-300 hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${trend.theme} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                                    <div className={`w-14 h-14 rounded-xl mb-5 flex items-center justify-center text-white bg-gradient-to-br ${trend.theme} shadow-lg shadow-zinc-200 group-hover:scale-110 transition-transform duration-300`}>
                                        {trend.icon}
                                    </div>
                                    <h4 className="text-[20px] font-bold text-zinc-900 mb-3">{trend.title}</h4>
                                    <p className="text-[15px] text-zinc-600 leading-relaxed">{trend.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <TeacherTask 
                    title="ภารกิจประจำหัวข้อ"
                    description="ให้นักเรียนเปรียบเทียบความแตกต่างระหว่าง ภาษาระดับต่ำ (Low-Level) และ ภาษาระดับสูง (High-Level) มาอย่างน้อย 2 ประเด็น พร้อมยกตัวอย่างชื่อภาษามาประกอบ"
                    code={`# ตัวอย่างรูปแบบการตอบ
ความแตกต่างที่ 1: ......
ความแตกต่างที่ 2: ......

ตัวอย่างภาษาระดับต่ำ: ......
ตัวอย่างภาษาระดับสูง: ......
`}
                />
            </main>

            <style jsx="true">{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
