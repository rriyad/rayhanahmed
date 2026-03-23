import { Link } from 'react-router-dom';
import { MODULES, getAllCalculators } from '@/data/moduleRegistry';

export default function DashboardPage() {
  const totalCalculators = getAllCalculators().length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BizMetric</h1>
        <p className="text-gray-500 text-lg">
          Professional financial calculators for business analysis and decision making.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{totalCalculators}</div>
          <div className="text-sm text-gray-500 mt-1">Calculators</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{MODULES.length}</div>
          <div className="text-sm text-gray-500 mt-1">Modules</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-500 mt-1">Browser-based</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">Free</div>
          <div className="text-sm text-gray-500 mt-1">No signup needed</div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MODULES.map((module) => (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{module.icon}</span>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {module.calculators.length} calcs
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {module.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{module.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick access - featured calculators */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {['roi', 'npv', 'irr', 'gpm', 'npm', 'current-ratio', 'quick-ratio', 'de-ratio', 'roa', 'roe'].map((calcId) => {
            const calc = getAllCalculators().find((c) => c.id === calcId);
            if (!calc) return null;
            return (
              <Link
                key={calcId}
                to={`/calculator/${calcId}`}
                className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-3 hover:bg-blue-50 hover:border-blue-200 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">{calc.abbreviation.slice(0, 3)}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{calc.fullName}</div>
                  <div className="text-xs text-gray-400 truncate">{calc.description.slice(0, 60)}…</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
