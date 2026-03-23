// ============================================================
// MATH UTILITIES - Pure helper functions
// ============================================================

/** Guard against division by zero — returns null on zero denominator */
export function safeDivide(numerator: number, denominator: number): number | null {
  if (denominator === 0) return null;
  return numerator / denominator;
}

/** Round to N decimal places */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Convert decimal to percentage */
export function toPercent(decimal: number): number {
  return round(decimal * 100, 2);
}

/** Convert percentage to decimal */
export function fromPercent(percent: number): number {
  return percent / 100;
}

/** Check if a value is a finite, valid number */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
}

/** Parse a string input to a number, returning null if invalid */
export function parseInput(value: string): number | null {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = parseFloat(value);
  if (!isFinite(parsed) || isNaN(parsed)) return null;
  return parsed;
}

/** Calculate NPV using Newton's method to find IRR */
export function npvAtRate(cashflows: number[], rate: number): number {
  return cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0);
}

/** Derivative of NPV for Newton's method */
export function dnpvAtRate(cashflows: number[], rate: number): number {
  return cashflows.reduce((acc, cf, t) => acc - (t * cf) / Math.pow(1 + rate, t + 1), 0);
}
