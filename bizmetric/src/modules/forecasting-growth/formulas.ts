// ============================================================
// FORECASTING & GROWTH FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** CAGR = (End Value / Start Value)^(1/years) - 1 */
export function calculateCAGR(endValue: number, startValue: number, years: number): CalcResult {
  const end = parseInput(String(endValue));
  const start = parseInput(String(startValue));
  const y = parseInput(String(years));

  if (end === null || start === null || y === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (start === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Start value cannot be zero.' };
  }
  if (start < 0 || end < 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Start and end values cannot be negative.' };
  }
  if (y <= 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Number of years must be greater than zero.' };
  }

  const ratio = safeDivide(end, start)!;
  const cagr = round((Math.pow(ratio, 1 / y) - 1) * 100, 2);

  if (!isFinite(cagr) || isNaN(cagr)) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Unable to compute CAGR for these inputs.' };
  }

  let interpretation: string;
  if (cagr >= 25) interpretation = 'Exceptional CAGR — outstanding growth trajectory';
  else if (cagr >= 15) interpretation = 'Strong CAGR — well above market average growth';
  else if (cagr >= 7) interpretation = 'Moderate CAGR — solid long-term growth';
  else if (cagr >= 0) interpretation = 'Low CAGR — minimal growth over the period';
  else interpretation = 'Negative CAGR — value has declined over the period';

  return { value: cagr, unit: 'percent', interpretation };
}

/** Growth Rate = (Current - Previous) / Previous * 100 */
export function calculateGrowthRate(currentValue: number, previousValue: number): CalcResult {
  const curr = parseInput(String(currentValue));
  const prev = parseInput(String(previousValue));

  if (curr === null || prev === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (prev === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Previous value cannot be zero.' };
  }

  const growth = round(safeDivide(curr - prev, prev)! * 100, 2);

  let interpretation: string;
  if (growth >= 50) interpretation = 'Exceptional growth — rapid expansion';
  else if (growth >= 20) interpretation = 'Strong growth — significant period-over-period increase';
  else if (growth >= 5) interpretation = 'Healthy growth — positive momentum';
  else if (growth >= 0) interpretation = 'Slow growth — nearly flat performance';
  else interpretation = 'Negative growth — value has declined from previous period';

  return { value: growth, unit: 'percent', interpretation };
}

/** Projected Revenue = Current * (1 + growth rate)^years */
export function calculateProjectedRevenue(
  currentRevenue: number,
  growthRate: number,
  years: number
): CalcResult {
  const rev = parseInput(String(currentRevenue));
  const rate = parseInput(String(growthRate));
  const y = parseInput(String(years));

  if (rev === null || rate === null || y === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (rev < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Current revenue cannot be negative.' };
  }
  if (y <= 0) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Number of years must be greater than zero.' };
  }
  if (rate <= -100) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Growth rate cannot be -100% or less.' };
  }

  const projected = round(rev * Math.pow(1 + rate / 100, y), 2);

  if (!isFinite(projected) || isNaN(projected)) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Unable to compute projected revenue for these inputs.' };
  }

  let interpretation: string;
  if (projected > rev * 5) interpretation = `Revenue projected to grow more than 5x over ${y} year(s)`;
  else if (projected > rev * 2) interpretation = `Revenue projected to more than double over ${y} year(s)`;
  else if (projected > rev) interpretation = `Revenue projected to grow over ${y} year(s)`;
  else if (projected === rev) interpretation = 'No change in revenue projected';
  else interpretation = `Revenue projected to decline over ${y} year(s)`;

  return { value: projected, unit: 'currency', interpretation };
}

/** Rule of 72 = 72 / Annual Rate */
export function calculateRuleOf72(annualRate: number): CalcResult {
  const rate = parseInput(String(annualRate));

  if (rate === null) {
    return { value: null, unit: 'number', interpretation: 'Invalid input', error: 'Annual rate must be a valid number.' };
  }
  if (rate <= 0) {
    return { value: null, unit: 'number', interpretation: 'Cannot calculate', error: 'Annual rate must be greater than zero.' };
  }

  const years = round(safeDivide(72, rate)!, 2);

  let interpretation: string;
  if (years <= 5) interpretation = `Investment doubles in ~${years} years — very rapid growth`;
  else if (years <= 10) interpretation = `Investment doubles in ~${years} years — strong growth rate`;
  else if (years <= 18) interpretation = `Investment doubles in ~${years} years — moderate growth rate`;
  else interpretation = `Investment doubles in ~${years} years — slow growth, consider higher-yield options`;

  return { value: years, unit: 'number', interpretation };
}
