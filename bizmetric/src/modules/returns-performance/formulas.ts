// ============================================================
// RETURNS & PERFORMANCE FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** ROA = Net Income / Total Assets * 100 */
export function calculateROA(netIncome: number, totalAssets: number): CalcResult {
  const ni = parseInput(String(netIncome));
  const assets = parseInput(String(totalAssets));

  if (ni === null || assets === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (assets === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Total assets cannot be zero.' };
  }
  if (assets < 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Total assets cannot be negative.' };
  }

  const roa = round(safeDivide(ni, assets)! * 100, 2);

  let interpretation: string;
  if (roa >= 10) interpretation = 'Excellent ROA — highly efficient use of assets';
  else if (roa >= 5) interpretation = 'Good ROA — solid asset utilization';
  else if (roa >= 1) interpretation = 'Moderate ROA — room for improvement';
  else if (roa >= 0) interpretation = 'Low ROA — poor asset efficiency';
  else interpretation = 'Negative ROA — assets are generating losses';

  return { value: roa, unit: 'percent', interpretation };
}

/** ROE = Net Income / Shareholder Equity * 100 */
export function calculateROE(netIncome: number, shareholderEquity: number): CalcResult {
  const ni = parseInput(String(netIncome));
  const equity = parseInput(String(shareholderEquity));

  if (ni === null || equity === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (equity === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Shareholder equity cannot be zero.' };
  }

  const roe = round(safeDivide(ni, equity)! * 100, 2);

  let interpretation: string;
  if (roe >= 20) interpretation = 'Excellent ROE — outstanding shareholder value creation';
  else if (roe >= 15) interpretation = 'Strong ROE — above average returns for shareholders';
  else if (roe >= 10) interpretation = 'Adequate ROE — meeting typical investor expectations';
  else if (roe >= 0) interpretation = 'Low ROE — underperforming relative to equity invested';
  else interpretation = 'Negative ROE — equity is eroding';

  return { value: roe, unit: 'percent', interpretation };
}

/** ROIC = NOPAT / Invested Capital * 100 */
export function calculateROIC(nopat: number, investedCapital: number): CalcResult {
  const n = parseInput(String(nopat));
  const ic = parseInput(String(investedCapital));

  if (n === null || ic === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (ic === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Invested capital cannot be zero.' };
  }

  const roic = round(safeDivide(n, ic)! * 100, 2);

  let interpretation: string;
  if (roic >= 15) interpretation = 'Excellent ROIC — creating significant value above cost of capital';
  else if (roic >= 10) interpretation = 'Strong ROIC — comfortably above typical cost of capital';
  else if (roic >= 7) interpretation = 'Moderate ROIC — marginally above cost of capital';
  else if (roic >= 0) interpretation = 'Low ROIC — may not be covering cost of capital';
  else interpretation = 'Negative ROIC — destroying invested capital value';

  return { value: roic, unit: 'percent', interpretation };
}

/** EPS = (Net Income - Preferred Dividends) / Shares Outstanding */
export function calculateEPS(
  netIncome: number,
  preferredDividends: number,
  sharesOutstanding: number
): CalcResult {
  const ni = parseInput(String(netIncome));
  const pd = parseInput(String(preferredDividends));
  const shares = parseInput(String(sharesOutstanding));

  if (ni === null || pd === null || shares === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (shares <= 0) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Shares outstanding must be greater than zero.' };
  }
  if (pd < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Preferred dividends cannot be negative.' };
  }

  const eps = round(safeDivide(ni - pd, shares)!, 2);

  let interpretation: string;
  if (eps >= 5) interpretation = 'Strong EPS — high per-share earnings';
  else if (eps >= 1) interpretation = 'Healthy EPS — positive shareholder returns';
  else if (eps >= 0) interpretation = 'Low EPS — minimal per-share earnings';
  else interpretation = 'Negative EPS — company reporting per-share losses';

  return { value: eps, unit: 'currency', interpretation };
}
