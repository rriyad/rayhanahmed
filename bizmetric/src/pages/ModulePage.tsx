import { useParams, useNavigate } from 'react-router-dom';
import { getModuleById } from '@/data/moduleRegistry';
import ModuleHeader from '@/components/ModuleHeader';
import CalculatorCard from '@/components/CalculatorCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const module = moduleId ? getModuleById(moduleId) : undefined;

  if (!module) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Module not found</h2>
          <p className="text-gray-500 mb-6">The module you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/' },
          { label: module.name },
        ]}
      />

      <div className="mt-4 mb-6">
        <ModuleHeader
          icon={module.icon}
          name={module.name}
          description={module.description}
          count={module.calculators.length}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {module.calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
            onClick={() => navigate(`/calculator/${calculator.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
