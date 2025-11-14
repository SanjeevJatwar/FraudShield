import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 active:scale-95 group relative overflow-hidden';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg sm:px-6 sm:py-3',
    lg: 'px-6 py-3 text-base rounded-xl sm:px-8 sm:py-4',
    xl: 'px-8 py-4 text-lg rounded-xl sm:px-10 sm:py-5'
  };

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 focus:ring-primary-500 border border-primary-500/20',
    
    secondary: 'bg-gradient-to-r from-security-600 to-fraud-500 hover:from-security-500 hover:to-fraud-400 text-white shadow-lg shadow-security-500/25 hover:shadow-fraud-500/40 focus:ring-security-500 border border-security-500/20',
    
    ghost: 'bg-transparent border-2 border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400 hover:text-primary-300 focus:ring-primary-500 backdrop-blur-sm',
    
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500 border border-red-500/20',
    
    success: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 focus:ring-green-500 border border-green-500/20'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <div className="mr-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
}
