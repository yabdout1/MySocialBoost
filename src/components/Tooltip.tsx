import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-x-4 border-x-transparent border-t-4 border-t-slate-900 dark:border-t-zinc-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-x-4 border-x-transparent border-b-4 border-b-slate-900 dark:border-b-zinc-800',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-y-4 border-y-transparent border-l-4 border-l-slate-900 dark:border-l-zinc-800',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-y-4 border-y-transparent border-r-4 border-r-slate-900 dark:border-r-zinc-800'
  };

  return (
    <div className={`relative group/tooltip inline-block ${className}`}>
      {children}
      <div 
        role="tooltip"
        className={`absolute pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 scale-90 group-hover/tooltip:scale-100 bg-slate-900 dark:bg-zinc-800 text-white text-[10px] font-medium py-1 px-2.5 rounded-lg shadow-md whitespace-nowrap z-50 ${positionClasses[position]}`}
      >
        {content}
        <div className={`absolute w-0 h-0 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
}
