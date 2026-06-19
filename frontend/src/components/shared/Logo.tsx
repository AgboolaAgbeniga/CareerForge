import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', dark = false }) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 group ${className}`}
    >
      <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-mono uppercase text-[11px] font-medium tracking-[0.08px] transition-transform duration-300 group-hover:scale-105 ${dark ? 'bg-canvas text-ink' : 'bg-primary text-on-primary dark:bg-canvas dark:text-ink'}`}>
        CF
      </div>
      <span className={`text-[22px] leading-[25.3px] tracking-[-0.22px] font-display font-medium ${dark ? 'text-on-dark' : 'text-ink dark:text-on-dark'}`}>
        CareerForge
      </span>
    </Link>
  );
};
