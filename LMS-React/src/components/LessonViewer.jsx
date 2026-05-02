import React from 'react';
import SDLC from './SDLC';
import AlgorithmFlowchart from './AlgorithmFlowchart';
import LanguageLevels from './LanguageLevels';
import PythonStructure from './PythonStructure';
import ControlFlow from './ControlFlow';
import MemoryVisualizer from './MemoryVisualizer';
import FunctionBuilder from './FunctionBuilder';
import ErrorHandling from './ErrorHandling';
import MiniPOS from './MiniPOS';
import Quiz from './Quiz';

// Registry ของ Component ที่สามารถแทรกในเนื้อหาได้
const COMPONENT_MAP = {
  '[SDLC_COMPONENT]': SDLC,
  '[ALGORITHM_COMPONENT]': AlgorithmFlowchart,
  '[LANGUAGE_LEVELS_COMPONENT]': LanguageLevels,
  '[PYTHON_STRUCTURE_COMPONENT]': PythonStructure,
  '[CONTROL_FLOW_COMPONENT]': ControlFlow,
  '[MEMORY_COMPONENT]': MemoryVisualizer,
  '[FUNCTION_COMPONENT]': FunctionBuilder,
  '[ERROR_HANDLING_COMPONENT]': ErrorHandling,
  '[MINI_POS_COMPONENT]': MiniPOS,
};

export default function LessonViewer({ lesson, chapter, onComplete }) {
  const renderContent = () => {
    if (!lesson.content) return null;

    // แยกเนื้อหาออกเป็นส่วนๆ ตาม Marker ของ Component ต่างๆ
    const markerPattern = /(\[(?:SDLC|ALGORITHM|LANGUAGE_LEVELS|PYTHON_STRUCTURE|CONTROL_FLOW|MEMORY|FUNCTION|ERROR_HANDLING|MINI_POS)_COMPONENT\])/;
    const parts = lesson.content.split(markerPattern);

    return (
      <div className="lesson-content bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
        <header className="mb-8 border-b border-gray-100 pb-6">
          <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-2 block">
            {chapter?.title}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {lesson.title}
          </h1>
        </header>

        {parts.map((part, idx) => {
          // ถ้าเป็น Marker ให้แสดง Component ที่ตรงกัน
          const Component = COMPONENT_MAP[part];
          if (Component) {
            return <Component key={idx} />;
          }
          // ถ้าเป็น HTML ปกติให้ render ด้วย dangerouslySetInnerHTML
          if (part.trim()) {
            return (
              <div
                key={idx}
                className="prose prose-indigo max-w-none prose-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: part }}
              />
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="pb-20">
      {renderContent()}

      {chapter?.quiz && chapter.quiz.length > 0 && (
        <Quiz quizData={chapter.quiz} onComplete={onComplete} />
      )}

      {(!chapter?.quiz || chapter.quiz.length === 0) && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            ทำเครื่องหมายว่าเรียนจบแล้ว
          </button>
        </div>
      )}
    </div>
  );
}
