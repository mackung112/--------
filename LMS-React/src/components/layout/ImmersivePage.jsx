import React from 'react';

const ImmersivePage = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/50 blur-[120px]"></div>
      </div>
      {children}
    </div>
  );
};

ImmersivePage.Content = ({ children }) => {
  return (
    <main className="max-w-5xl mx-auto px-6 relative z-10">
      {children}
    </main>
  );
};

export default ImmersivePage;
