// ============================================================
// MODULE REGISTRY - BizMetric
// Assembles ModuleDefinition objects from the calculator catalog.
// ============================================================

import type { CalculatorDefinition, ModuleDefinition } from '@/types';
import { CALCULATOR_CATALOG, MODULE_METADATA } from './calculatorCatalog';

// ============================================================
// MODULES — each module's calculators filtered from the catalog
// ============================================================

export const MODULES: ModuleDefinition[] = MODULE_METADATA.map((meta) => ({
  ...meta,
  calculators: CALCULATOR_CATALOG.filter((calc) => calc.moduleId === meta.id),
}));

// ============================================================
// LOOKUP HELPERS
// ============================================================

export function getModuleById(id: string): ModuleDefinition | undefined {
  return MODULES.find((module) => module.id === id);
}

export function getCalculatorById(id: string): CalculatorDefinition | undefined {
  return CALCULATOR_CATALOG.find((calc) => calc.id === id);
}

export function getAllCalculators(): CalculatorDefinition[] {
  return CALCULATOR_CATALOG;
}
