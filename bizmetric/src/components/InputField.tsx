import type { InputField as InputFieldType } from '@/types';

interface InputFieldProps {
  field: InputFieldType;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function InputField({ field, value, onChange, error }: InputFieldProps) {
  const isCurrency = field.type === 'currency';
  const isPercent = field.type === 'percent';
  const hasAffix = isCurrency || isPercent;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field.id}
        className="text-sm font-medium text-gray-700"
      >
        {field.label}
      </label>

      <div className="relative flex items-stretch">
        {/* Currency prefix */}
        {isCurrency && (
          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm font-medium select-none">
            $
          </span>
        )}

        <input
          id={field.id}
          type="number"
          inputMode="decimal"
          value={value}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step ?? 'any'}
          onChange={(e) => onChange(e.target.value)}
          className={[
            'flex-1 block w-full px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300',
            'placeholder-gray-400 transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'disabled:bg-gray-50 disabled:text-gray-500',
            error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : '',
            isCurrency ? 'rounded-r-lg' : '',
            isPercent ? 'rounded-l-lg' : '',
            !hasAffix ? 'rounded-lg' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={!!error}
          aria-describedby={
            [error ? `${field.id}-error` : '', field.helpText ? `${field.id}-help` : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
        />

        {/* Percent suffix */}
        {isPercent && (
          <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 text-sm font-medium select-none">
            %
          </span>
        )}
      </div>

      {/* Help text */}
      {field.helpText && !error && (
        <p id={`${field.id}-help`} className="text-xs text-gray-500">
          {field.helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p id={`${field.id}-error`} className="flex items-center gap-1 text-xs text-red-600" role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
