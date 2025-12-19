'use client';

import { SelectProps } from './types';

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
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-500 uppercase tracking-wide"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
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
          className={`
            w-full ${icon ? 'pl-9' : 'pl-3'} pr-8 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            appearance-none cursor-pointer
            transition-all
          `}
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
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
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
          className="text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
