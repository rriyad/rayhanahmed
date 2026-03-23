// ============================================================
// PROFIT & PRICING FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** GPM = (Revenue - COGS) / Revenue * 100 */
export function calculateGrossProfitMargin(revenue: number, cogs: number): CalcResult {
  const rev = parseInput(String(revenue));
  const c = parseInput(String(cogs));

  if (rev === null || c === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (rev === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Revenue cannot be zero.' };
  }
  if (c < 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'COGS cannot be negative.' };
  }

  const gpm = round(safeDivide(rev - c, rev)! * 100, 2);

  let interpretation: string;
  if (gpm >= 60) interpretation = 'Excellent gross profit margin';
  else if (gpm >= 40) interpretation = 'Strong gross profit margin';
  else if (gpm >= 20) interpretation = 'Adequate gross profit margin';
  else if (gpm >= 0) interpretation = 'Thin gross profit margin — review cost structure';
  else interpretation = 'Negative margin — COGS exceeds revenue';

  return { value: gpm, unit: 'percent', interpretation };
}

/** NPM = Net Income / Revenue * 100 */
export function calculateNetProfitMargin(netIncome: number, revenue: number): CalcResult {
  const ni = parseInput(String(netIncome));
  const rev = parseInput(String(revenue));

  if (ni === null || rev === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (rev === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Revenue cannot be zero.' };
  }

  const npm = round(safeDivide(ni, rev)! * 100, 2);

  let interpretation: string;
  if (npm >= 20) interpretation = 'Excellent net profit margin';
  else if (npm >= 10) interpretation = 'Healthy net profit margin';
  else if (npm >= 5) interpretation = 'Moderate net profit margin';
  else if (npm >= 0) interpretation = 'Low net profit margin — monitor expenses';
  else interpretation = 'Negative net margin — business is unprofitable';

  return { value: npm, unit: 'percent', interpretation };
}

/** EBITDA Margin = EBITDA / Revenue * 100 */
export function calculateEBITDAMargin(ebitda: number, revenue: number): CalcResult {
  const e = parseInput(String(ebitda));
  const rev = parseInput(String(revenue));

  if (e === null || rev === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (rev === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Revenue cannot be zero.' };
  }

  const margin = round(safeDivide(e, rev)! * 100, 2);

  let interpretation: string;
  if (margin >= 30) interpretation = 'Excellent EBITDA margin — highly profitable operations';
  else if (margin >= 15) interpretation = 'Strong EBITDA margin';
  else if (margin >= 10) interpretation = 'Moderate EBITDA margin';
  else if (margin >= 0) interpretation = 'Thin EBITDA margin — operational efficiency may be a concern';
  else interpretation = 'Negative EBITDA — core operations are unprofitable';

  return { value: margin, unit: 'percent', interpretation };
}

/** Markup = (Price - Cost) / Cost * 100 */
export function calculateMarkup(price: number, cost: number): CalcResult {
  const p = parseInput(String(price));
  const c = parseInput(String(cost));

  if (p === null || c === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (c === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Cost cannot be zero.' };
  }
  if (c < 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Cost cannot be negative.' };
  }

  const markup = round(safeDivide(p - c, c)! * 100, 2);

  let interpretation: string;
  if (markup >= 100) interpretation = 'High markup — strong pricing power';
  else if (markup >= 50) interpretation = 'Healthy markup';
  else if (markup >= 20) interpretation = 'Moderate markup';
  else if (markup >= 0) interpretation = 'Low markup — limited pricing power';
  else interpretation = 'Negative markup — selling below cost';

  return { value: markup, unit: 'percent', interpretation };
}

/** BreakEven = Fixed Costs / (Price per Unit - Variable Cost per Unit) */
export function calculateBreakEven(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): CalcResult {
  const fc = parseInput(String(fixedCosts));
  const p = parseInput(String(pricePerUnit));
  const vc = parseInput(String(variableCostPerUnit));

  if (fc === null || p === null || vc === null) {
    return { value: null, unit: 'number', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (fc < 0) {
    return { value: null, unit: 'number', interpretation: 'Invalid input', error: 'Fixed costs cannot be negative.' };
  }

  const contributionMargin = p - vc;
  if (contributionMargin <= 0) {
    return {
      value: null,
      unit: 'number',
      interpretation: 'Cannot calculate',
      error: 'Price per unit must exceed variable cost per unit to break even.',
    };
  }

  const breakEven = round(safeDivide(fc, contributionMargin)!, 2);

  let interpretation: string;
  if (breakEven <= 100) interpretation = 'Low break-even volume — easily achievable';
  else if (breakEven <= 1000) interpretation = 'Moderate break-even volume';
  else if (breakEven <= 10000) interpretation = 'High break-even volume — requires significant sales';
  else interpretation = 'Very high break-even volume — consider reducing fixed costs';

  return { value: breakEven, unit: 'number', interpretation };
}
