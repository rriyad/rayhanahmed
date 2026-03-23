import type { CalcResult } from '@/types';
import { formatByUnit } from '@/utils/formatting';

interface ResultCardProps {
  result: CalcResult | null;
  calculatorName: string;
  isLoading?: boolean;
}

type BadgeTone = 'green' | 'red' | 'yellow';

function classifyInterpretation(interpretation: string): BadgeTone {
  const lower = interpretation.toLowerCase();

  const positiveKeywords = [
    'excellent', 'strong', 'good', 'positive', 'adds value', 'high',
    'acceptable', 'grows', 'profitable', 'healthy', 'above',
  ];
  const negativeKeywords = [
    'negative', 'loss', 'losing', 'destroys', 'below', 'low', 'poor',
    'cannot', 'invalid', 'not recover', 'declines',
  ];

  if (positiveKeywords.some((kw) => lower.includes(kw))) return 'green';
  if (negativeKeywords.some((kw) => lower.includes(kw))) return 'red';
  return 'yellow';
}

const badgeClasses: Record<BadgeTone, string> = {
  green: 'bg-green-100 text-green-800 border-green-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const badgeDotClasses: Record<BadgeTone, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
};

function LoadingPulse() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-white bg-opacity-20 rounded-lg w-48 mx-auto" />
      <div className="h-4 bg-white bg-opacity-20 rounded w-32 mx-auto" />
      <div className="h-8 bg-white bg-opacity-20 rounded-full w-56 mx-auto" />
    </div>
  );
}

export function ResultCard({ result, calculatorName, isLoading = false }: ResultCardProps) {
  const isEmpty = !result || result.value === null;
  const hasError = result?.error;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-lg">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white opacity-5 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white opacity-5 pointer-events-none" />

      <div className="relative px-6 py-8 text-center">
        {/* Calculator name */}
        <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-4">
          {calculatorName}
        </p>

        {/* Content area */}
        {isLoading ? (
          <LoadingPulse />
        ) : hasError ? (
          /* Error state */
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-red-300">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <span className="text-sm font-medium">Calculation Error</span>
            </div>
            <p className="text-white text-sm bg-white bg-opacity-10 rounded-lg px-4 py-2">
              {result!.error}
            </p>
          </div>
        ) : isEmpty ? (
          /* Empty / placeholder state */
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-blue-200 text-sm">Enter values to see result</p>
          </div>
        ) : (
          /* Result state */
          <div className="space-y-4">
            {/* Primary value */}
            <div>
              <span className="text-5xl font-bold text-white tracking-tight">
                {formatByUnit(result!.value!, result!.unit)}
              </span>
              <p className="text-blue-200 text-sm mt-1 capitalize">{result!.unit}</p>
            </div>

            {/* Interpretation badge */}
            {result!.interpretation && (
              <div className="flex justify-center">
                {(() => {
                  const tone = classifyInterpretation(result!.interpretation);
                  return (
                    <span
                      className={[
                        'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border',
                        badgeClasses[tone],
                      ].join(' ')}
                    >
                      <span className={['w-1.5 h-1.5 rounded-full flex-shrink-0', badgeDotClasses[tone]].join(' ')} />
                      {result!.interpretation}
                    </span>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
