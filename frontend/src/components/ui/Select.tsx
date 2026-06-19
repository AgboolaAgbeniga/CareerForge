'use client';

import { SelectProps } from '@/components/types';

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  icon,
  label,
  error,
  required,
  disabled,
  className = '',
  id,
  name,
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`cf-field ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
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
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`cf-control ${icon ? 'pl-9' : 'pl-3'} pr-8 appearance-none cursor-pointer`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-body">
          <span
            className={`iconify`}
            data-icon="lucide:chevron-down"
            data-width="14"
          ></span>
        </div>
      </div>
      {error && (
        <p
          id={`${selectId}-error`}
          className="type-caption text-primary"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
