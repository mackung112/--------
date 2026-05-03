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
import ProgramMeaning from './ProgramMeaning';
import TranslatorCompare from './TranslatorCompare';
import PythonTimeline from './PythonTimeline';
import SetupGuide from './SetupGuide';
import PythonicWay from './PythonicWay';
import IndentationDemo from './IndentationDemo';
import FlowchartSymbols from './FlowchartSymbols';
import SequenceFlowchart from './SequenceFlowchart';
import SelectionFlowchart from './SelectionFlowchart';
import IterationFlowchart from './IterationFlowchart';
import FlowchartBestPractice from './FlowchartBestPractice';
import PseudocodeIntro from './PseudocodeIntro';
import PseudocodeKeywords from './PseudocodeKeywords';
import PseudocodeCondition from './PseudocodeCondition';
import PseudocodeLoop from './PseudocodeLoop';
import PseudocodeFormat from './PseudocodeFormat';
import NamingConvention from './NamingConvention';
import IntegerExplorer from './IntegerExplorer';
import FloatExplorer from './FloatExplorer';
import StringExplorer from './StringExplorer';
import BooleanExplorer from './BooleanExplorer';
import ImportModule from './ImportModule';
import InputDemo from './InputDemo';
import PrintFormat from './PrintFormat';
import ArithmeticOps from './ArithmeticOps';
import AssignmentOps from './AssignmentOps';
import ComparisonOps from './ComparisonOps';
import LogicalOps from './LogicalOps';
import IdentityOps from './IdentityOps';
import MembershipOps from './MembershipOps';
import BitwiseOps from './BitwiseOps';
import IfStatement from './IfStatement';
import ElifStatement from './ElifStatement';
import ElseStatement from './ElseStatement';
import WhileLoop from './WhileLoop';
import ForLoop from './ForLoop';
import RangeFunction from './RangeFunction';
import ListExplorer from './ListExplorer';
import TupleDictExplorer from './TupleDictExplorer';
import SetStringExplorer from './SetStringExplorer';
import BuiltinFunctions from './BuiltinFunctions';
import DefFunction from './DefFunction';
import ReturnScope from './ReturnScope';
import BusinessDesign from './BusinessDesign';
import BusinessLogic from './BusinessLogic';
import FileHandler from './FileHandler';
import DocGenerator from './DocGenerator';

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
  '[PROGRAM_MEANING_COMPONENT]': ProgramMeaning,
  '[TRANSLATOR_COMPARE_COMPONENT]': TranslatorCompare,
  '[PYTHON_TIMELINE_COMPONENT]': PythonTimeline,
  '[SETUP_GUIDE_COMPONENT]': SetupGuide,
  '[PYTHONIC_WAY_COMPONENT]': PythonicWay,
  '[INDENTATION_DEMO_COMPONENT]': IndentationDemo,
  '[FLOWCHART_SYMBOLS_COMPONENT]': FlowchartSymbols,
  '[SEQUENCE_FLOWCHART_COMPONENT]': SequenceFlowchart,
  '[SELECTION_FLOWCHART_COMPONENT]': SelectionFlowchart,
  '[ITERATION_FLOWCHART_COMPONENT]': IterationFlowchart,
  '[FLOWCHART_BEST_PRACTICE_COMPONENT]': FlowchartBestPractice,
  '[PSEUDOCODE_INTRO_COMPONENT]': PseudocodeIntro,
  '[PSEUDOCODE_KEYWORDS_COMPONENT]': PseudocodeKeywords,
  '[PSEUDOCODE_CONDITION_COMPONENT]': PseudocodeCondition,
  '[PSEUDOCODE_LOOP_COMPONENT]': PseudocodeLoop,
  '[PSEUDOCODE_FORMAT_COMPONENT]': PseudocodeFormat,
  '[NAMING_CONVENTION_COMPONENT]': NamingConvention,
  '[INTEGER_EXPLORER_COMPONENT]': IntegerExplorer,
  '[FLOAT_EXPLORER_COMPONENT]': FloatExplorer,
  '[STRING_EXPLORER_COMPONENT]': StringExplorer,
  '[BOOLEAN_EXPLORER_COMPONENT]': BooleanExplorer,
  '[IMPORT_MODULE_COMPONENT]': ImportModule,
  '[INPUT_DEMO_COMPONENT]': InputDemo,
  '[PRINT_FORMAT_COMPONENT]': PrintFormat,
  '[ARITHMETIC_OPS_COMPONENT]': ArithmeticOps,
  '[ASSIGNMENT_OPS_COMPONENT]': AssignmentOps,
  '[COMPARISON_OPS_COMPONENT]': ComparisonOps,
  '[LOGICAL_OPS_COMPONENT]': LogicalOps,
  '[IDENTITY_OPS_COMPONENT]': IdentityOps,
  '[MEMBERSHIP_OPS_COMPONENT]': MembershipOps,
  '[BITWISE_OPS_COMPONENT]': BitwiseOps,
  '[IF_STATEMENT_COMPONENT]': IfStatement,
  '[ELIF_STATEMENT_COMPONENT]': ElifStatement,
  '[ELSE_STATEMENT_COMPONENT]': ElseStatement,
  '[WHILE_LOOP_COMPONENT]': WhileLoop,
  '[FOR_LOOP_COMPONENT]': ForLoop,
  '[RANGE_FUNCTION_COMPONENT]': RangeFunction,
  '[LIST_EXPLORER_COMPONENT]': ListExplorer,
  '[TUPLE_DICT_COMPONENT]': TupleDictExplorer,
  '[SET_STRING_COMPONENT]': SetStringExplorer,
  '[BUILTIN_FUNCTIONS_COMPONENT]': BuiltinFunctions,
  '[DEF_FUNCTION_COMPONENT]': DefFunction,
  '[RETURN_SCOPE_COMPONENT]': ReturnScope,
  '[BUSINESS_DESIGN_COMPONENT]': BusinessDesign,
  '[BUSINESS_LOGIC_COMPONENT]': BusinessLogic,
  '[FILE_HANDLER_COMPONENT]': FileHandler,
  '[DOC_GENERATOR_COMPONENT]': DocGenerator,
};

export default function LessonViewer({ lesson, chapter, onComplete }) {
  const renderContent = () => {
    if (!lesson.content) return null;

    // แยกเนื้อหาออกเป็นส่วนๆ ตาม Marker ของ Component ต่างๆ
    const markerPattern = /(\[(?:SDLC|ALGORITHM|LANGUAGE_LEVELS|PYTHON_STRUCTURE|CONTROL_FLOW|MEMORY|FUNCTION|ERROR_HANDLING|MINI_POS|PROGRAM_MEANING|TRANSLATOR_COMPARE|PYTHON_TIMELINE|SETUP_GUIDE|PYTHONIC_WAY|INDENTATION_DEMO|FLOWCHART_SYMBOLS|SEQUENCE_FLOWCHART|SELECTION_FLOWCHART|ITERATION_FLOWCHART|FLOWCHART_BEST_PRACTICE|PSEUDOCODE_INTRO|PSEUDOCODE_KEYWORDS|PSEUDOCODE_CONDITION|PSEUDOCODE_LOOP|PSEUDOCODE_FORMAT|NAMING_CONVENTION|INTEGER_EXPLORER|FLOAT_EXPLORER|STRING_EXPLORER|BOOLEAN_EXPLORER|IMPORT_MODULE|INPUT_DEMO|PRINT_FORMAT|ARITHMETIC_OPS|ASSIGNMENT_OPS|COMPARISON_OPS|LOGICAL_OPS|IDENTITY_OPS|MEMBERSHIP_OPS|BITWISE_OPS|IF_STATEMENT|ELIF_STATEMENT|ELSE_STATEMENT|WHILE_LOOP|FOR_LOOP|RANGE_FUNCTION|LIST_EXPLORER|TUPLE_DICT|SET_STRING|BUILTIN_FUNCTIONS|DEF_FUNCTION|RETURN_SCOPE|BUSINESS_DESIGN|BUSINESS_LOGIC|FILE_HANDLER|DOC_GENERATOR)_COMPONENT\])/;
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
