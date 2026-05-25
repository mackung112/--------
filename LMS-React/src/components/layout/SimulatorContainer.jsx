import React from 'react';

const SimulatorContainer = ({ children, className = '' }) => {
  return (
    <div className={`my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 md:p-12 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      {children}
    </div>
  );
};

export default SimulatorContainer;
