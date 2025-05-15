import React from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center my-12 ${className}`}>
      <div className="w-24 h-px bg-slate-300 dark:bg-slate-700"></div>
      <div className="w-3 h-3 mx-2 rounded-full bg-blue-600"></div>
      <div className="w-24 h-px bg-slate-300 dark:bg-slate-700"></div>
    </div>
  );
};

export default SectionDivider;