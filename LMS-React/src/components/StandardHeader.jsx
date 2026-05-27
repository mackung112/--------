import React, { useMemo } from 'react';

const GRADIENTS = [
  'from-blue-600 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-fuchsia-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-rose-500 to-red-500'
];

export default function StandardHeader({ 
  chapterTitle, 
  mainTitle, 
  subTitle, 
  description, 
  isCard = false, 
  transparent = false 
}) {
  const randomGradient = useMemo(() => {
    // Generate a consistent gradient based on the title string length to avoid hydration mismatch
    const hash = mainTitle ? mainTitle.length : 0;
    return GRADIENTS[hash % GRADIENTS.length];
  }, [mainTitle]);

  return (
    <header className={`${transparent ? '' : 'bg-gradient-to-br from-[#f0fdfa] via-white to-[#ecfeff]'} border-b ${transparent ? 'border-transparent' : 'border-gray-100'} relative z-20 ${isCard ? 'p-8 md:p-12' : 'pt-12 pb-8 md:pt-16 md:pb-12 w-full'} overflow-hidden`}>
      <div className="absolute top-0 right-0 p-12 opacity-40 pointer-events-none">
        <div className="w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className={`relative z-10 ${isCard ? '' : 'max-w-5xl mx-auto px-6'}`}>
        {chapterTitle && (
          <span className="text-teal-600 font-bold tracking-wider text-sm mb-3 block">
            {chapterTitle}
          </span>
        )}
        {mainTitle && (
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-2">
            {mainTitle}
          </h1>
        )}
        {subTitle && (
          <h2 className={`text-3xl md:text-5xl font-black mb-6 !border-none pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r ${randomGradient}`}>
            {subTitle}
          </h2>
        )}
        
        {description && (
          <>
            <div className="w-full h-px bg-gray-200 my-6"></div>
            <div className="border-l-4 border-teal-500 pl-5 py-2">
              <p className="text-gray-600 text-lg leading-relaxed !m-0" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
