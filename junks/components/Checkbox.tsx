'use client';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  className = '',
  id,
  name,
}: CheckboxProps) {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
      />
      {label && (
        <label htmlFor={checkboxId} className="ml-2 text-sm text-slate-700">
          {label}
        </label>
      )}
    </div>
  );
}
