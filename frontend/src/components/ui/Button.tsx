'use client';

import { ButtonProps } from '@/components/types';

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
  const sizeClasses = {
    sm: 'min-h-8 px-lg py-xs text-[13px]',
    md: 'min-h-8 px-2xl py-xs',
    lg: 'min-h-11 px-3xl py-md',
    icon: 'h-11 w-11 p-0',
  };

  const variantClasses = {
    primary: 'cf-button-primary',
    secondary: 'cf-button-secondary-white',
    secondaryMint: 'cf-button-secondary-mint',
    secondaryWhite: 'cf-button-secondary-white',
    outline: 'cf-button-outline',
    ghost: 'cf-button-outline',
    ghostOnDark: 'cf-button-ghost-on-dark',
    gradient: 'cf-button-primary',
    iconCircular: 'cf-button-icon-circular',
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
      className={`${variantClasses[variant]} ${variant === 'iconCircular' ? sizeClasses.icon : sizeClasses[size]} ${className}`}
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
