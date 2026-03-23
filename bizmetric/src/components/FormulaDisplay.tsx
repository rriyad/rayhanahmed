interface FormulaDisplayProps {
  formula: string;
  formulaExplanation?: string;
}

export function FormulaDisplay({ formula, formulaExplanation }: FormulaDisplayProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800">
      {/* Code block header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="ml-2 text-xs text-gray-500 font-mono">formula</span>
      </div>

      {/* Formula code block */}
      <div className="bg-gray-950 px-5 py-4">
        <pre className="overflow-x-auto">
          <code className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
            {formula}
          </code>
        </pre>
      </div>

      {/* Optional explanation */}
      {formulaExplanation && (
        <div className="bg-gray-900 px-5 py-3 border-t border-gray-800">
          <p className="text-gray-400 text-xs leading-relaxed font-mono">
            <span className="text-gray-600 select-none">// </span>
            {formulaExplanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default FormulaDisplay;
