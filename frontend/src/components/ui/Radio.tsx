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
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="h-4 w-4 border-hairline bg-canvas text-primary focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {label && (
        <label htmlFor={radioId} className="type-body-md text-ink">
          {label}
        </label>
      )}
    </div>
  );
}
