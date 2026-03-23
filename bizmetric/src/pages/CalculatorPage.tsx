import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById, getModuleById } from '@/data/moduleRegistry';
import type { CalcResult, InputValues } from '@/types';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import FormulaDisplay from '@/components/FormulaDisplay';
import Breadcrumb from '@/components/Breadcrumb';
import { runCalculator } from '@/modules/calculatorDispatch';

export default function CalculatorPage() {
  const { calcId } = useParams<{ calcId: string }>();
  const navigate = useNavigate();

  const calculator = calcId ? getCalculatorById(calcId) : undefined;
  const module = calculator ? getModuleById(calculator.moduleId) : undefined;

  const [values, setValues] = useState<InputValues>({});
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleChange = useCallback((fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleCalculate = useCallback(() => {
    if (!calculator) return;
    const computed = runCalculator(calculator.id, values);
    setResult(computed);
  }, [calculator, values]);

  const handleReset = useCallback(() => {
    setValues({});
    setResult(null);
  }, []);

  const allFilled = calculator?.inputs.every((inp) => values[inp.id]?.trim() !== '');

  if (!calculator) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Calculator not found</h2>
          <p className="text-gray-500 mb-6">This calculator does not exist or has been moved.</p>
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
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/' },
          ...(module ? [{ label: module.name, path: `/module/${module.id}` }] : []),
          { label: calculator.abbreviation },
        ]}
      />

      {/* Header */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{calculator.fullName}</h1>
        <p className="text-gray-500 mt-1">{calculator.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Inputs
            </h2>
            <div className="space-y-4">
              {calculator.inputs.map((field) => (
                <InputField
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ''}
                  onChange={(val) => handleChange(field.id, val)}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCalculate}
                disabled={!allFilled}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Formula display */}
          <FormulaDisplay formula={calculator.formula} />
        </div>

        {/* Right: Result */}
        <div className="lg:col-span-2">
          <ResultCard result={result} calculatorName={calculator.fullName} />

          {/* About card */}
          <div className="mt-4 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-gray-600">{calculator.description}</p>
            {calculator.tags && calculator.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {calculator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
