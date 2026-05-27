import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  hint?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, hint, icon, size = 'md', className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm sm:text-base',
      lg: 'px-5 py-4 text-base'
    };

    const getInputClasses = () => {
      const baseClasses = `
        w-full bg-dark-800/50 backdrop-blur-sm border rounded-xl 
        text-white placeholder-gray-400 
        focus:outline-none transition-all duration-300 group
        ${sizes[size]}
      `;

      if (error) {
        return `${baseClasses} border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20 focus:shadow-lg focus:shadow-red-500/10`;
      }

      if (success) {
        return `${baseClasses} border-green-500/50 focus:border-green-400 focus:ring-2 focus:ring-green-500/20 focus:shadow-lg focus:shadow-green-500/10`;
      }

      return `${baseClasses} border-white/10 hover:border-white/20 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:shadow-lg focus:shadow-primary-500/10`;
    };

    const getLabelClasses = () => {
      const baseClasses = 'block text-sm font-medium mb-2 transition-colors duration-300';
      
      if (error) return `${baseClasses} text-red-400`;
      if (success) return `${baseClasses} text-green-400`;
      if (focused) return `${baseClasses} text-primary-400`;
      return `${baseClasses} text-gray-300`;
    };

    return (
      <div className="w-full group">
        {label && (
          <label className={getLabelClasses()}>
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-primary-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${getInputClasses()} ${icon ? 'pl-10' : ''} ${className}`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />

          {/* Status Icons */}
          {(error || success) && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              error ? 'text-red-400' : 'text-green-400'
            }`}>
              {error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </div>
          )}

          {/* Focus Border Animation */}
          <div className={`absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none ${
            focused ? 'border-primary-400/50 shadow-lg shadow-primary-500/20' : ''
          }`} />
        </div>

        {/* Help Text */}
        {(error || hint) && (
          <div className="mt-2 space-y-1">
            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm animate-slide-up">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {hint && !error && (
              <p className="text-xs text-gray-400 transition-colors duration-300 group-focus-within:text-gray-300">
                {hint}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
