// ============================================================
// LEVERAGE & DEBT FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** D/E = Total Debt / Shareholder Equity */
export function calculateDebtToEquity(totalDebt: number, shareholderEquity: number): CalcResult {
  const debt = parseInput(String(totalDebt));
  const equity = parseInput(String(shareholderEquity));

  if (debt === null || equity === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (debt < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Total debt cannot be negative.' };
  }
  if (equity === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Shareholder equity cannot be zero.' };
  }

  const ratio = round(safeDivide(debt, equity)!, 2);

  let interpretation: string;
  if (ratio < 0) interpretation = 'Negative equity — technically insolvent';
  else if (ratio <= 0.5) interpretation = 'Low leverage — conservatively financed';
  else if (ratio <= 1) interpretation = 'Moderate leverage — balanced capital structure';
  else if (ratio <= 2) interpretation = 'High leverage — significant debt reliance';
  else interpretation = 'Very high leverage — elevated financial risk';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** Debt Ratio = Total Debt / Total Assets */
export function calculateDebtRatio(totalDebt: number, totalAssets: number): CalcResult {
  const debt = parseInput(String(totalDebt));
  const assets = parseInput(String(totalAssets));

  if (debt === null || assets === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (debt < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Total debt cannot be negative.' };
  }
  if (assets === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Total assets cannot be zero.' };
  }

  const ratio = round(safeDivide(debt, assets)!, 2);

  let interpretation: string;
  if (ratio <= 0.3) interpretation = 'Low debt ratio — assets are largely equity-financed';
  else if (ratio <= 0.5) interpretation = 'Moderate debt ratio — balanced financing';
  else if (ratio <= 0.7) interpretation = 'High debt ratio — significant portion of assets financed by debt';
  else interpretation = 'Very high debt ratio — highly leveraged, elevated risk';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** ICR = EBIT / Interest Expense */
export function calculateInterestCoverageRatio(ebit: number, interestExpense: number): CalcResult {
  const e = parseInput(String(ebit));
  const interest = parseInput(String(interestExpense));

  if (e === null || interest === null) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (interest === 0) {
    return { value: null, unit: 'times', interpretation: 'Cannot calculate', error: 'Interest expense cannot be zero.' };
  }
  if (interest < 0) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'Interest expense cannot be negative.' };
  }

  const icr = round(safeDivide(e, interest)!, 2);

  let interpretation: string;
  if (icr >= 5) interpretation = 'Excellent interest coverage — no difficulty servicing debt';
  else if (icr >= 3) interpretation = 'Strong interest coverage';
  else if (icr >= 1.5) interpretation = 'Adequate interest coverage — monitor debt levels';
  else if (icr >= 1) interpretation = 'Thin interest coverage — near the minimum threshold';
  else interpretation = 'Insufficient interest coverage — at risk of default';

  return { value: icr, unit: 'times', interpretation };
}

/** Equity Multiplier = Total Assets / Shareholder Equity */
export function calculateEquityMultiplier(totalAssets: number, shareholderEquity: number): CalcResult {
  const assets = parseInput(String(totalAssets));
  const equity = parseInput(String(shareholderEquity));

  if (assets === null || equity === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (assets < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Total assets cannot be negative.' };
  }
  if (equity === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Shareholder equity cannot be zero.' };
  }

  const multiplier = round(safeDivide(assets, equity)!, 2);

  let interpretation: string;
  if (multiplier < 0) interpretation = 'Negative equity — company is technically insolvent';
  else if (multiplier <= 1.5) interpretation = 'Low leverage — mostly equity-financed';
  else if (multiplier <= 2.5) interpretation = 'Moderate leverage — typical capital structure';
  else if (multiplier <= 4) interpretation = 'High leverage — significant debt amplification';
  else interpretation = 'Very high leverage — elevated financial risk';

  return { value: multiplier, unit: 'ratio', interpretation };
}
