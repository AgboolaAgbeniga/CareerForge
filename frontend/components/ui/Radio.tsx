'use client';

interface RadioProps {
  label?: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export default function Radio({
  label,
  value,
  checked,
  onChange,
  disabled,
  className = '',
  id,
  name,
}: RadioProps) {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
      />
      {label && (
        <label htmlFor={radioId} className="ml-2 text-sm text-slate-700">
          {label}
        </label>
      )}
    </div>
  );
}
