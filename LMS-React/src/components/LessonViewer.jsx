import { ChevronLeft, ChevronRight } from 'lucide-react';
const interactiveModules = import.meta.glob('./interactive/*.jsx', { eager: true });

const COMPONENT_MAP = {};
for (const path in interactiveModules) {
  const componentName = path.split('/').pop().replace('.jsx', '');
  COMPONENT_MAP[`[${componentName}]`] = interactiveModules[path].default;
}

export default function LessonViewer({ lesson, chapter, onComplete, onNext, onPrev, hasPrev = false, hasNext = true }) {
  if (!lesson.content) return null;

  // แยกเนื้อหาออกเป็นส่วนๆ ตาม Marker ของ Component ต่างๆ
  const escapedKeys = Object.keys(COMPONENT_MAP).map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]'));
  const markerPattern = escapedKeys.length > 0 ? new RegExp(`(${escapedKeys.join('|')})`) : /(?!)/;
  const parts = lesson.content.split(markerPattern);

  // ตรวจสอบว่าเป็น Component แบบ Immersive หรือไม่
  const immersivePart = parts.find(part => part.includes('[pyUnit') || part.includes('[SQL'));
  const isImmersive = Boolean(immersivePart && COMPONENT_MAP[immersivePart]);

  const renderContent = () => {
    if (isImmersive) {
      const ImmersiveComponent = COMPONENT_MAP[immersivePart];
      return <ImmersiveComponent />;
    }

    return (
      <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
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
            const Component = COMPONENT_MAP[part];
            if (Component) {
              return <Component key={idx} />;
            }
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
      </div>
    );
  };

  return (
    <div className="pb-20 w-full">
      {renderContent()}

      {/* Navigation buttons: Previous / Next */}
      <div className={`mt-12 flex items-center justify-between border-t border-gray-200 pt-8 gap-4 w-full px-6 max-w-5xl mx-auto`}>
        {hasPrev ? (
          <button
            onClick={onPrev}
            className="px-6 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-bold hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 group shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" />
            เนื้อหาก่อนหน้า
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => { if(onComplete) onComplete(); if(onNext) onNext(); }}
          className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 group"
        >
          {hasNext ? 'เนื้อหาถัดไป' : 'กลับหน้ารวมวิชา'}
          <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
