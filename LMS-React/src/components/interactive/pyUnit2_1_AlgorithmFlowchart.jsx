import { useState, useEffect } from 'react';
import { 
  ArrowRight, Play, RotateCcw, CheckCircle2,
  ChefHat, Coffee, Droplets, Flame, PackageOpen, Lightbulb, 
  Puzzle, BrainCircuit
} from 'lucide-react';

// ===========================
// 1) Real-world Algorithm Data
// ===========================
const realWorldAlgorithms = [
  {
    id: 1,
    title: "อัลกอริทึมการต้มบะหมี่กึ่งสำเร็จรูป",
    icon: <ChefHat className="w-6 h-6" />,
    description: "การทำสิ่งง่ายๆ ในชีวิตประจำวันก็ถือเป็นอัลกอริทึม หากมีลำดับขั้นตอนที่ชัดเจนและให้ผลลัพธ์ที่แน่นอน",
    steps: [
      { text: "เริ่มต้น", type: "start", icon: <Play className="w-5 h-5 text-white" />, color: "bg-green-500" },
      { text: "ฉีกซองบะหมี่และนำใส่ชาม", type: "process", icon: <PackageOpen className="w-5 h-5 text-blue-600" />, color: "bg-blue-100 border-blue-400" },
      { text: "ต้มน้ำให้เดือด", type: "process", icon: <Flame className="w-5 h-5 text-orange-600" />, color: "bg-orange-100 border-orange-400" },
      { text: "เทน้ำร้อนลงในชามและปิดฝา 3 นาที", type: "process", icon: <Droplets className="w-5 h-5 text-cyan-600" />, color: "bg-cyan-100 border-cyan-400" },
      { text: "ใส่เครื่องปรุงและคนให้เข้ากัน", type: "process", icon: <Coffee className="w-5 h-5 text-amber-600" />, color: "bg-amber-100 border-amber-400" },
      { text: "บะหมี่พร้อมทาน", type: "output", icon: <CheckCircle2 className="w-5 h-5 text-purple-600" />, color: "bg-purple-100 border-purple-400" },
      { text: "จบการทำงาน", type: "end", icon: <Play className="w-5 h-5 text-white" />, color: "bg-green-500" }
    ]
  }
];

// ===========================
// 2) Mini Game: Order the Algorithm
// ===========================
const puzzleSteps = [
  { id: 1, text: "ใส่เครื่องปรุง" },
  { id: 2, text: "รอ 3 นาที" },
  { id: 3, text: "ต้มน้ำร้อน" },
  { id: 4, text: "ฉีกซองใส่ชาม" },
  { id: 5, text: "เทน้ำร้อนใส่ชาม" }
];

const correctOrder = [4, 3, 5, 2, 1]; // Logical order for making noodles

export default function pyUnit2_1_AlgorithmFlowchart() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const algorithm = realWorldAlgorithms[0];

  // Game state
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, correct, incorrect

  // Auto-play simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (activeStep < algorithm.steps.length - 1) {
        timer = setTimeout(() => {
          setActiveStep(prev => prev + 1);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, algorithm.steps.length]);

  const handlePlay = () => {
    if (activeStep === algorithm.steps.length - 1) {
      setActiveStep(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  const handleSelectPuzzle = (step) => {
    if (selectedOrder.find(s => s.id === step.id)) return;
    
    const newOrder = [...selectedOrder, step];
    setSelectedOrder(newOrder);

    if (newOrder.length === puzzleSteps.length) {
      // Check answer
      const isCorrect = newOrder.every((s, i) => s.id === correctOrder[i]);
      setGameStatus(isCorrect ? 'correct' : 'incorrect');
    }
  };

  const resetGame = () => {
    setSelectedOrder([]);
    setGameStatus('idle');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 mt-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <BrainCircuit className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">สำรวจแนวคิด: อัลกอริทึม (Algorithm)</h2>
          <p className="text-indigo-100 mt-1">อัลกอริทึมคือลำดับขั้นตอนที่ชัดเจน เพื่อแก้ปัญหาอย่างใดอย่างหนึ่ง</p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Section 1: Theory & Core Concept */}
        <div className="mb-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
          <Lightbulb className="w-8 h-8 text-blue-600 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">ทำไมต้องมีอัลกอริทึม?</h3>
            <p className="text-blue-800 leading-relaxed">
              คอมพิวเตอร์ไม่มีความคิดเป็นของตัวเอง มันจะทำตามคำสั่งของเราแบบ <strong>"เป๊ะๆ"</strong> ทุกบรรทัด 
              ถ้าเราเรียงลำดับคำสั่งผิด ผลลัพธ์ก็จะผิดพลาดทันที อัลกอริทึมจึงเปรียบเสมือน <strong>"สูตรอาหาร"</strong> ที่บอกคอมพิวเตอร์ว่าต้องทำอะไร ก่อน-หลัง อย่างชัดเจน
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          {algorithm.icon} ตัวอย่างในชีวิตประจำวัน: {algorithm.title}
        </h3>

        {/* Explorer Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column: List of steps */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-4 flex justify-between items-center">
              <span>ขั้นตอน (Steps)</span>
              <span className="text-sm px-3 py-1 bg-slate-200 rounded-full">{algorithm.steps.length} ขั้นตอน</span>
            </h4>
            
            <div className="space-y-3">
              {algorithm.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4
                    ${activeStep === idx 
                      ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-105' 
                      : activeStep > idx 
                        ? 'border-green-200 bg-green-50 opacity-70'
                        : 'border-transparent bg-white shadow-sm'
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                    ${activeStep > idx ? 'bg-green-500 text-white' : activeStep === idx ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}
                  `}>
                    {activeStep > idx ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className={`font-medium ${activeStep === idx ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Simulation */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[400px] overflow-hidden">
            {/* Visualizer */}
            <div className="flex-1 flex items-center justify-center w-full relative h-full min-h-[250px]">
              {algorithm.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`absolute transition-all duration-500 flex flex-col items-center gap-4
                    ${activeStep === idx 
                      ? 'opacity-100 scale-100 translate-y-0 z-10' 
                      : activeStep > idx
                        ? 'opacity-0 scale-90 -translate-y-8 z-0 pointer-events-none'
                        : 'opacity-0 scale-90 translate-y-8 z-0 pointer-events-none'
                    }
                  `}
                >
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl ${step.color} ${step.type === 'start' || step.type === 'end' ? 'rounded-full' : ''} border-4`}>
                    {step.icon}
                  </div>
                  <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl border border-white/20 font-medium text-center max-w-[250px]">
                    {step.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-8 flex gap-4 w-full max-w-xs z-20">
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold transition-all"
              >
                <Play className="w-5 h-5" /> จำลอง
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Gamification */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 rounded-2xl border border-indigo-100 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Puzzle className="w-8 h-8 text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">มินิเกม: เรียงลำดับอัลกอริทึม</h3>
          </div>
          <p className="text-indigo-800 mb-6">
            คอมพิวเตอร์ต้องการลำดับขั้นตอนที่ถูกต้อง! จงเรียงลำดับขั้นตอน <strong>"การต้มบะหมี่กึ่งสำเร็จรูป"</strong> ด้านล่างนี้ให้สมเหตุสมผลที่สุด
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Options */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
              <h4 className="font-bold text-slate-700 mb-4 text-center">ตัวเลือกขั้นตอน</h4>
              <div className="flex flex-col gap-3">
                {puzzleSteps.map(step => {
                  const isSelected = selectedOrder.some(s => s.id === step.id);
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectPuzzle(step)}
                      disabled={isSelected}
                      className={`p-4 rounded-xl font-medium transition-all text-left flex items-center gap-3
                        ${isSelected 
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                          : 'bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-500 hover:bg-indigo-50 hover:-translate-y-1 shadow-sm'
                        }
                      `}
                    >
                      <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {step.id}
                      </div>
                      {step.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Area */}
            <div className="bg-slate-900 p-6 rounded-2xl shadow-inner border border-slate-800 flex flex-col">
              <h4 className="font-bold text-indigo-600 mb-4 text-center">ลำดับอัลกอริทึมของคุณ</h4>
              
              <div className="flex-1 flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const step = selectedOrder[idx];
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl flex items-center gap-3 border transition-all
                        ${step 
                          ? 'bg-indigo-900/50 border-indigo-500/50 text-indigo-100' 
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-600 border-dashed'
                        }
                      `}
                    >
                      <div className="font-mono opacity-50 w-6">{idx + 1}.</div>
                      <div className="font-medium">{step ? step.text : 'รอเลือกขั้นตอน...'}</div>
                    </div>
                  );
                })}
              </div>

              {/* Game Result */}
              {gameStatus !== 'idle' && (
                <div className={`mt-6 p-4 rounded-xl font-bold flex items-center justify-between
                  ${gameStatus === 'correct' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}
                `}>
                  <div className="flex items-center gap-2">
                    {gameStatus === 'correct' ? <CheckCircle2 className="w-6 h-6" /> : <RotateCcw className="w-6 h-6" />}
                    <span>{gameStatus === 'correct' ? 'ยอดเยี่ยม! ลำดับอัลกอริทึมถูกต้อง' : 'ยังมีข้อผิดพลาด อัลกอริทึมยังไม่สมบูรณ์!'}</span>
                  </div>
                  <button 
                    onClick={resetGame}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm shrink-0"
                  >
                    เริ่มใหม่
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
