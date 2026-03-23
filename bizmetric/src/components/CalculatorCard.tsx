import type { CalculatorDefinition } from '@/types';

interface CalculatorCardProps {
  calculator: CalculatorDefinition;
  onClick: () => void;
}

export function CalculatorCard({ calculator, onClick }: CalculatorCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group w-full text-left bg-white border border-gray-200 rounded-xl px-5 py-4',
        'transition-all duration-200 ease-in-out',
        'hover:border-blue-300 hover:shadow-md hover:shadow-blue-50 hover:-translate-y-0.5',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'active:translate-y-0 active:shadow-none',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Abbreviation badge */}
          <span className="inline-block mb-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded font-mono uppercase tracking-wide">
            {calculator.abbreviation}
          </span>

          {/* Full name */}
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug truncate">
            {calculator.fullName}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
            {calculator.description}
          </p>

          {/* Tags */}
          {calculator.tags && calculator.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {calculator.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow icon */}
        <div
          className={[
            'flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center',
            'bg-gray-100 text-gray-400 transition-all duration-200',
            'group-hover:bg-blue-600 group-hover:text-white',
          ].join(' ')}
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default CalculatorCard;
