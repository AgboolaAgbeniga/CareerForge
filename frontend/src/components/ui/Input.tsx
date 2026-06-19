'use client';

import { InputProps } from '@/components/types';

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  label,
  error,
  required,
  disabled,
  className = '',
  id,
  name,
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`cf-field ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="cf-label"
        >
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-body group-focus-within:text-primary transition-colors">
            <span className={`iconify`} data-icon={icon} data-width="16"></span>
          </div>
        )}
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`cf-control ${icon ? 'pl-9' : 'pl-3'} pr-3`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="type-caption text-primary"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
