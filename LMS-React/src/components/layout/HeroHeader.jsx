import React from 'react';

const HeroHeader = ({ 
  badgeText, 
  title, 
  subtitle, 
  description 
}) => {
  return (
    <header className="relative pt-16 pb-12 z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-b border-slate-200/60 pb-8">
          {badgeText && (
            <h2 className="text-sm font-bold tracking-widest text-blue-600 mb-4 uppercase">
              {badgeText}
            </h2>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {title} {subtitle && <br className="hidden md:block" />}
            {subtitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                {subtitle}
              </span>
            )}
          </h1>
        </div>
        
        {description && (
          <div className="pt-6 border-l-4 border-blue-500 pl-6 mt-4">
             <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeroHeader;
