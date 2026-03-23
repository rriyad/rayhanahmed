// ============================================================
// CORE TYPES - BizMetric Calculation Engine
// ============================================================

export type ResultUnit = 'percent' | 'currency' | 'ratio' | 'number' | 'days' | 'times';

export interface CalcResult {
  value: number | null;
  unit: ResultUnit;
  interpretation: string;
  error?: string;
}

export interface InputField {
  id: string;
  label: string;
  placeholder: string;
  type: 'number' | 'percent' | 'currency';
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export type ModuleId =
  | 'investment'
  | 'profit-pricing'
  | 'liquidity'
  | 'leverage-debt'
  | 'efficiency-operations'
  | 'returns-performance'
  | 'cashflow-accounting'
  | 'valuation'
  | 'startup-saas'
  | 'forecasting-growth';

export interface CalculatorDefinition {
  id: string;
  moduleId: ModuleId;
  name: string;
  abbreviation: string;
  fullName: string;
  description: string;
  formula: string;
  inputs: InputField[];
  tags?: string[];
}

export interface ModuleDefinition {
  id: ModuleId;
  name: string;
  description: string;
  icon: string;
  color: string;
  calculators: CalculatorDefinition[];
}

export type InputValues = Record<string, string>;
