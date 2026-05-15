import { useState, useEffect } from 'react';
import { 
  Search, PenTool, Code2, Bug, Rocket, Settings,
  Play, Pause, ArrowRight, Sparkles, Loader2
} from 'lucide-react';

const sdlcPhases = [
  {
    id: 1,
    title: "Analysis (การวิเคราะห์)",
    shortDesc: "รวบรวมและวิเคราะห์ความต้องการ",
    fullDesc: "เป็นขั้นตอนแรกที่สำคัญที่สุด ทีมงานจะพูดคุยกับผู้ใช้งานเพื่อรวบรวมความต้องการ กำหนดขอบเขตของระบบ และวิเคราะห์ความเป็นไปได้ของโครงการ (Feasibility Study) เพื่อให้เข้าใจตรงกันว่าซอฟต์แวร์ต้องทำอะไรได้บ้าง",
    keyActivities: [
      "สัมภาษณ์และรวบรวมความต้องการจากผู้ใช้",
      "วิเคราะห์ปัญหาและกำหนดเป้าหมาย",
      "จัดทำเอกสารข้อกำหนดความต้องการ (SRS)"
    ],
    icon: Search,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-500",
    ringColor: "ring-blue-300"
  },
  {
    id: 2,
    title: "Design (การออกแบบ)",
    shortDesc: "ออกแบบสถาปัตยกรรมและหน้าตา",
    fullDesc: "นำความต้องการที่ได้มาแปลงเป็นการออกแบบทางเทคนิค รวมถึงการออกแบบสถาปัตยกรรมระบบ โครงสร้างฐานข้อมูล และหน้าจอผู้ใช้งาน (UI/UX) เพื่อให้โปรแกรมเมอร์มีแบบแผนในการเขียนโค้ด",
    keyActivities: [
      "ออกแบบสถาปัตยกรรมซอฟต์แวร์",
      "ออกแบบโครงสร้างฐานข้อมูล",
      "ออกแบบหน้าจอผู้ใช้งาน (UI/UX)"
    ],
    icon: PenTool,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    textColor: "text-purple-500",
    ringColor: "ring-purple-300"
  },
  {
    id: 3,
    title: "Development (การพัฒนา)",
    shortDesc: "เขียนโค้ดสร้างซอฟต์แวร์",
    fullDesc: "โปรแกรมเมอร์และนักพัฒนาจะเริ่มเขียนโค้ด (Coding) ตามเอกสารการออกแบบที่ทำไว้ในขั้นตอนก่อนหน้า ขั้นตอนนี้มักจะใช้เวลามากที่สุดในวงจรการพัฒนา",
    keyActivities: [
      "เขียนโปรแกรมด้วยภาษาที่กำหนด",
      "สร้างฐานข้อมูลตามที่ออกแบบ",
      "เชื่อมต่อระบบส่วนหน้าและส่วนหลังเข้าด้วยกัน"
    ],
    icon: Code2,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    textColor: "text-orange-500",
    ringColor: "ring-orange-300"
  },
  {
    id: 4,
    title: "Testing (การทดสอบ)",
    shortDesc: "ค้นหาและแก้ไขข้อผิดพลาด",
    fullDesc: "นำซอฟต์แวร์ที่เขียนเสร็จแล้วมาทดสอบเพื่อหาข้อผิดพลาด (Bugs) และตรวจสอบว่าระบบสามารถทำงานได้ครบถ้วนและถูกต้องตามความต้องการที่ระบุไว้ในขั้นตอนแรกหรือไม่",
    keyActivities: [
      "ทดสอบการทำงานของแต่ละส่วนย่อย (Unit Testing)",
      "ทดสอบการทำงานร่วมกันของระบบ (Integration Testing)",
      "ให้ผู้ใช้งานจริงร่วมทดสอบ (User Acceptance Testing)"
    ],
    icon: Bug,
    color: "bg-red-500",
    lightColor: "bg-red-100",
    textColor: "text-red-500",
    ringColor: "ring-red-300"
  },
  {
    id: 5,
    title: "Deployment (การติดตั้ง)",
    shortDesc: "นำระบบไปใช้งานจริง",
    fullDesc: "เมื่อผ่านการทดสอบและแก้ไขข้อผิดพลาดจนสมบูรณ์แล้ว ซอฟต์แวร์จะถูกนำไปติดตั้งบนเซิร์ฟเวอร์จริง (Production) เพื่อให้ผู้ใช้งานสามารถเริ่มใช้งานได้",
    keyActivities: [
      "ติดตั้งระบบบนเซิร์ฟเวอร์หรือแอปสโตร์",
      "โยกย้ายข้อมูลจากระบบเก่า (ถ้ามี)",
      "ฝึกอบรมการใช้งานให้แก่ผู้ใช้"
    ],
    icon: Rocket,
    color: "bg-green-500",
    lightColor: "bg-green-100",
    textColor: "text-green-500",
    ringColor: "ring-green-300"
  },
  {
    id: 6,
    title: "Maintenance (การบำรุงรักษา)",
    shortDesc: "ดูแลและอัปเดตระบบ",
    fullDesc: "หลังจากเปิดใช้งาน อาจมีข้อผิดพลาดที่เพิ่งถูกค้นพบ หรือมีความต้องการฟีเจอร์ใหม่ๆ ทีมงานจะต้องคอยดูแล แก้ไขปัญหา ปรับปรุงประสิทธิภาพ และอัปเดตซอฟต์แวร์ให้ทันสมัยอยู่เสมอ",
    keyActivities: [
      "แก้ไขบั๊กที่พบหลังจากการเปิดใช้งาน",
      "อัปเดตระบบรักษาความปลอดภัย",
      "เพิ่มคุณสมบัติใหม่ตามความต้องการที่เปลี่ยนไป"
    ],
    icon: Settings,
    color: "bg-slate-700",
    lightColor: "bg-slate-200",
    textColor: "text-slate-700",
    ringColor: "ring-slate-300"
  }
];

export default function PY21910_U2_L2_SDLC() {
  const [activePhaseId, setActivePhaseId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [projectName, setProjectName] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const activePhase = sdlcPhases.find(p => p.id === activePhaseId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAiResponse("");
  }, [activePhaseId]);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
     
    setAiResponse("");

    const currentProject = projectName.trim() || "แอปพลิเคชันสั่งอาหารออนไลน์";
    
    // จำลองผลลัพธ์ AI (เนื่องจากต้องรอใส่ API Key ของจริง)
    setTimeout(() => {
      setAiResponse(`[ข้อความจำลองจาก AI]\\nในขั้นตอน ${activePhase.title} สำหรับโปรเจกต์ "${currentProject}" สิ่งที่คุณต้องทำคือ:\\n1. ประเมินความต้องการหลักของระบบ\\n2. จัดสรรทรัพยากรเบื้องต้น\\n3. ร่างแผนงานตามระยะเวลาที่กำหนด`);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActivePhaseId((prev) => (prev % sdlcPhases.length) + 1);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full my-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg ${
              isPlaying 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isPlaying ? <><Pause className="w-5 h-5" /> หยุดเล่นอัตโนมัติ</> : <><Play className="w-5 h-5" /> เล่นแอนิเมชันอัตโนมัติ</>}
          </button>
        </div>

        <div className="relative mb-16 px-4">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            {sdlcPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhaseId === phase.id;
              
              return (
                <div key={phase.id} className="flex flex-col items-center relative w-full md:w-auto">
                  {index !== 0 && <div className="md:hidden w-1 h-8 bg-gray-200 my-1"></div>}
                  
                  <button
                    onClick={() => { setActivePhaseId(phase.id); setIsPlaying(false); }}
                    className="relative group flex flex-col items-center transition-all duration-300 outline-none"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                      ${isActive ? `${phase.color} ${phase.ringColor} text-white shadow-xl scale-110 ring-4 ring-offset-2` : 'bg-white text-gray-400 hover:bg-gray-100 hover:scale-105 border-2 border-gray-200'}`}
                    >
                      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${isActive ? 'animate-pulse' : ''}`} />
                    </div>
                    
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white
                      ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {phase.id}
                    </div>
                    
                    <span className={`hidden md:block mt-4 font-semibold text-sm transition-colors duration-300
                      ${isActive ? phase.textColor : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {phase.title.split(' ')[0]}
                    </span>
                  </button>
                  
                  <span className={`md:hidden mt-2 font-bold text-lg ${isActive ? phase.textColor : 'text-gray-500'}`}>
                    {phase.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[400px] transition-all duration-500">
          <div className={`${activePhase.color} absolute top-0 left-0 w-2 h-full transition-colors duration-500`}></div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${activePhase.lightColor} ${activePhase.textColor}`}>
                    <activePhase.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">ขั้นตอนที่ {activePhase.id}</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{activePhase.title}</h3>
                  </div>
                </div>
                
                <h4 className={`text-xl font-semibold mb-4 ${activePhase.textColor}`}>{activePhase.shortDesc}</h4>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{activePhase.fullDesc}</p>
              </div>

              <div className="flex-1 w-full bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">กิจกรรมหลักในขั้นตอนนี้</h4>
                <ul className="space-y-4">
                  {activePhase.keyActivities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className={`w-5 h-5 mt-0.5 shrink-0 ${activePhase.textColor}`} />
                      <span className="text-gray-700 text-base">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                  <h4 className="text-xl font-bold text-indigo-900">AI สร้างสถานการณ์จำลอง</h4>
                </div>
                <p className="text-indigo-800 mb-4">อยากรู้ไหมว่าขั้นตอน <strong>{activePhase.title}</strong> ในโปรเจกต์ของคุณต้องทำอะไรบ้าง?</p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <input 
                    type="text" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="เช่น แอปสั่งอาหาร..." 
                    className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
                  />
                  <button 
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition-colors shadow-sm outline-none"
                  >
                    {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> กำลังคิด...</> : <>✨ สร้างตัวอย่าง</>}
                  </button>
                </div>

                {aiResponse && (
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-indigo-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h5 className="font-bold text-indigo-900 mb-4 text-lg border-b pb-2 border-indigo-50 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-500" /> ตัวอย่างโปรเจกต์ของคุณ:
                    </h5>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{aiResponse}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
