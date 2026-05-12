import { useState } from 'react';
import { Terminal, Play, CheckCircle2, XCircle, AlertCircle, RefreshCcw, ChevronRight } from 'lucide-react';

export default function PracticalExam({ practicalData, onComplete }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect
  const [completed, setCompleted] = useState(false);

  if (!practicalData || practicalData.length === 0) return null;

  const currentQ = practicalData[currentQuestionIdx];

  const checkAnswer = () => {
    if (!userInput.trim()) return;
    
    // Check against the expected regex pattern
    if (currentQ.expectedPattern.test(userInput)) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    setUserInput('');
    setStatus('idle');
    if (currentQuestionIdx < practicalData.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleRetry = () => {
    setStatus('idle');
  };

  if (completed) {
    return (
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-3xl shadow-xl mt-12 text-white text-center border border-indigo-500">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">ยอดเยี่ยมมาก!</h3>
        <p className="text-indigo-200">คุณผ่านข้อสอบปฏิบัติในหน่วยนี้แล้ว สามารถเรียนบทต่อไปได้เลย</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl mt-12 border border-slate-700 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <div className="bg-slate-800 p-2 rounded-lg">
          <Terminal className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">ข้อสอบปฏิบัติ (Coding Challenge)</h3>
          <p className="text-slate-400 text-sm">ข้อที่ {currentQuestionIdx + 1} จาก {practicalData.length}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-lg text-slate-200 font-medium leading-relaxed">
            {currentQ.question}
          </p>
          {status === 'incorrect' && currentQ.hint && (
            <div className="mt-4 flex items-start gap-2 text-amber-400 bg-amber-400/10 p-3 rounded-lg text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span><strong>คำใบ้:</strong> {currentQ.hint}</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-4 text-slate-500 font-mono select-none">1</div>
        <textarea
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            setStatus('idle');
          }}
          disabled={status === 'correct'}
          className="w-full bg-[#1e1e2e] text-[#cdd6f4] font-mono p-4 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[120px] resize-y"
          placeholder="พิมพ์โค้ด Python ของคุณที่นี่..."
          spellCheck="false"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          {status === 'correct' && (
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg inline-flex">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">ถูกต้อง! {currentQ.successMessage || 'เยี่ยมมาก'}</span>
            </div>
          )}
          {status === 'incorrect' && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg inline-flex">
              <XCircle className="w-5 h-5" />
              <span className="font-bold">ยังไม่ถูกต้อง ลองใหม่อีกครั้ง</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {status === 'incorrect' && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> ลองใหม่
            </button>
          )}
          
          {status === 'correct' ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/50"
            >
              ไปข้อต่อไป <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/50"
            >
              <Play className="w-4 h-4" /> รันโค้ด
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
