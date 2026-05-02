import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Quiz({ quizData, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // For simplicity, we handle the first quiz question if there's an array
  const question = quizData[0];

  if (!question) return null;

  const handleSubmit = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
    setIsSubmitted(true);
    if (index === question.answer) {
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl mt-12 border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-indigo-900 border-b pb-4">
        แบบทดสอบความเข้าใจ
      </h3>
      <p className="text-lg text-gray-800 mb-6 font-medium">{question.question}</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium ";
          let Icon = null;
          
          if (!isSubmitted) {
            optionClass += "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer";
          } else {
            if (index === question.answer) {
              optionClass += "border-green-500 bg-green-50 text-green-800";
              Icon = <CheckCircle2 className="w-5 h-5 text-green-600 inline ml-2" />;
            } else if (index === selectedOption) {
              optionClass += "border-red-500 bg-red-50 text-red-800";
              Icon = <XCircle className="w-5 h-5 text-red-600 inline ml-2" />;
            } else {
              optionClass += "border-gray-200 opacity-50 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSubmit(index)}
              className={optionClass + " flex justify-between items-center"}
              disabled={isSubmitted}
            >
              <span>{option}</span>
              {Icon}
            </button>
          );
        })}
      </div>
      
      {isSubmitted && selectedOption === question.answer && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-6 h-6" /> ยอดเยี่ยม! คำตอบถูกต้อง
        </div>
      )}
    </div>
  );
}
