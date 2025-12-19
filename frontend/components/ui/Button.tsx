'use client';

import { ButtonProps } from './types';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm',
    secondary:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500',
    outline:
      'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    gradient:
      'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 shadow-sm',
  };

  const iconSpacing = children
    ? iconPosition === 'left'
      ? 'mr-2'
      : 'ml-2'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span
          className={`iconify ${iconSpacing}`}
          data-icon={icon}
          data-width="16"
        ></span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span
          className={`iconify ${iconSpacing}`}
          data-icon={icon}
          data-width="16"
        ></span>
      )}
    </button>
  );
}
