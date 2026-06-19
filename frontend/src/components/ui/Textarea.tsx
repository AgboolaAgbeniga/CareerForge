'use client';

import { TextareaProps } from '@/components/types';

export default function Textarea({
  placeholder,
  value,
  onChange,
  label,
  rows = 3,
  error,
  required,
  disabled,
  className = '',
  id,
  name,
}: TextareaProps) {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`cf-field ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="cf-label"
        >
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className="cf-control resize-none"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="type-caption text-primary"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
