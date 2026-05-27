import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'magenta' | 'cyan' | 'success' | 'danger' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  variant?: 'default' | 'glass' | 'gradient' | 'solid';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  glow = 'none',
  padding = 'md',
  variant = 'default'
}: CardProps) {
  
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10'
  };

  const hoverEffect = hover 
    ? 'hover:transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer transition-all duration-300 ease-out' 
    : 'transition-all duration-300';

  const glowEffect = glow !== 'none' ? `glow-${glow}` : '';

  const variants = {
    default: 'bg-dark-800/50 backdrop-blur-sm border border-white/10 hover:border-white/20',
    glass: 'bg-dark-800/30 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-2xl',
    gradient: 'bg-gradient-to-br from-dark-800/60 via-dark-900/60 to-dark-800/60 border border-white/10 hover:border-white/20',
    solid: 'bg-dark-800 border border-white/15 hover:border-white/25'
  };

  return (
    <div
      className={`
        ${variants[variant]}
        ${paddingClasses[padding]}
        ${hoverEffect} 
        ${glowEffect} 
        rounded-xl 
        group 
        relative 
        overflow-hidden
        ${className}
      `}
    >
      {/* Subtle hover gradient overlay */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-security-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
