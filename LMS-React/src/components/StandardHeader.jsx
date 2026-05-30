import React, { useMemo } from 'react';

const GRADIENTS = [
  'from-teal-400 via-emerald-500 to-blue-600',
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-orange-400 via-red-500 to-pink-600',
  'from-fuchsia-500 via-pink-500 to-yellow-400',
  'from-cyan-500 via-blue-600 to-indigo-700',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-violet-600 via-fuchsia-500 to-indigo-500',
  'from-green-400 via-teal-500 to-cyan-600',
  'from-rose-500 via-pink-600 to-violet-600',
  'from-sky-400 via-indigo-500 to-purple-600'
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
    // Generate a consistent deterministic gradient based on title hashing to avoid hydration mismatch
    const textToHash = subTitle || mainTitle || '';
    let hash = 0;
    for (let i = 0; i < textToHash.length; i++) {
      hash = textToHash.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % GRADIENTS.length;
    return GRADIENTS[index];
  }, [mainTitle, subTitle]);

  return (
    <header className={`${transparent ? '' : 'bg-gradient-to-br from-[#f0fdfa] via-white to-[#ecfeff]'} border-b ${transparent ? 'border-transparent' : 'border-gray-100'} relative z-20 ${isCard ? 'p-6 md:p-8' : 'pt-6 pb-2 md:pt-8 md:pb-3 w-full'} overflow-hidden`}>
      <div className="absolute top-0 right-0 p-12 opacity-40 pointer-events-none">
        <div className="w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className={`relative z-10 ${isCard ? '' : 'max-w-7xl mx-auto px-6 lg:px-12'}`}>
        {chapterTitle && (
          <span className="text-orange-500 font-bold tracking-widest text-sm md:text-base mb-2 block uppercase">
            {chapterTitle}
          </span>
        )}
        {mainTitle && (
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight mb-1 md:mb-2 tracking-tight">
            {mainTitle}
          </h1>
        )}
        {subTitle && (
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black mb-3 !border-none pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r ${randomGradient} tracking-tighter drop-shadow-sm`}>
            {subTitle}
          </h2>
        )}
        
        {description && (
          <>
            <div className="w-full h-px bg-gray-200/80 my-3"></div>
            <div className="border-l-[3px] border-teal-500/80 pl-3.5 py-0.5">
              <p className="text-slate-500 text-[15px] md:text-base leading-relaxed !m-0" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
