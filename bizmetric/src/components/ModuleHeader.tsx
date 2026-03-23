interface ModuleHeaderProps {
  icon: string;
  name: string;
  description: string;
  count: number;
}

export function ModuleHeader({ icon, name, description, count }: ModuleHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        {/* Module icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
          {icon}
        </div>

        {/* Title and description */}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{name}</h1>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed max-w-xl">{description}</p>
        </div>
      </div>

      {/* Calculator count badge */}
      <div className="flex-shrink-0 sm:mt-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          {count} {count === 1 ? 'Calculator' : 'Calculators'}
        </span>
      </div>
    </div>
  );
}

export default ModuleHeader;
