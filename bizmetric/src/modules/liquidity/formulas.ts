// ============================================================
// LIQUIDITY FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** Current Ratio = Current Assets / Current Liabilities */
export function calculateCurrentRatio(currentAssets: number, currentLiabilities: number): CalcResult {
  const ca = parseInput(String(currentAssets));
  const cl = parseInput(String(currentLiabilities));

  if (ca === null || cl === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (ca < 0 || cl < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Assets and liabilities cannot be negative.' };
  }
  if (cl === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Current liabilities cannot be zero.' };
  }

  const ratio = round(safeDivide(ca, cl)!, 2);

  let interpretation: string;
  if (ratio >= 2) interpretation = 'Strong liquidity — well-positioned to cover short-term obligations';
  else if (ratio >= 1.5) interpretation = 'Healthy liquidity position';
  else if (ratio >= 1) interpretation = 'Adequate liquidity — monitor closely';
  else interpretation = 'Weak liquidity — current liabilities exceed current assets';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** Quick Ratio = (Current Assets - Inventory) / Current Liabilities */
export function calculateQuickRatio(
  currentAssets: number,
  inventory: number,
  currentLiabilities: number
): CalcResult {
  const ca = parseInput(String(currentAssets));
  const inv = parseInput(String(inventory));
  const cl = parseInput(String(currentLiabilities));

  if (ca === null || inv === null || cl === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (ca < 0 || inv < 0 || cl < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Values cannot be negative.' };
  }
  if (cl === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Current liabilities cannot be zero.' };
  }
  if (inv > ca) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Inventory cannot exceed current assets.' };
  }

  const ratio = round(safeDivide(ca - inv, cl)!, 2);

  let interpretation: string;
  if (ratio >= 1.5) interpretation = 'Excellent quick liquidity — strong short-term solvency';
  else if (ratio >= 1) interpretation = 'Healthy quick ratio — can meet short-term obligations without selling inventory';
  else if (ratio >= 0.5) interpretation = 'Moderate quick ratio — may rely on inventory to settle obligations';
  else interpretation = 'Weak quick ratio — liquidity risk without inventory sales';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** Cash Ratio = Cash & Equivalents / Current Liabilities */
export function calculateCashRatio(cashAndEquivalents: number, currentLiabilities: number): CalcResult {
  const cash = parseInput(String(cashAndEquivalents));
  const cl = parseInput(String(currentLiabilities));

  if (cash === null || cl === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (cash < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Cash and equivalents cannot be negative.' };
  }
  if (cl === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Current liabilities cannot be zero.' };
  }

  const ratio = round(safeDivide(cash, cl)!, 2);

  let interpretation: string;
  if (ratio >= 1) interpretation = 'Very strong cash position — can fully cover liabilities with cash alone';
  else if (ratio >= 0.5) interpretation = 'Solid cash ratio — good short-term coverage';
  else if (ratio >= 0.2) interpretation = 'Adequate cash ratio';
  else interpretation = 'Low cash ratio — limited immediate liquidity';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** Working Capital = Current Assets - Current Liabilities */
export function calculateWorkingCapital(currentAssets: number, currentLiabilities: number): CalcResult {
  const ca = parseInput(String(currentAssets));
  const cl = parseInput(String(currentLiabilities));

  if (ca === null || cl === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (ca < 0 || cl < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Assets and liabilities cannot be negative.' };
  }

  const wc = round(ca - cl, 2);

  let interpretation: string;
  if (wc > 0) interpretation = 'Positive working capital — business can fund short-term operations';
  else if (wc === 0) interpretation = 'Break-even working capital — no buffer for short-term obligations';
  else interpretation = 'Negative working capital — short-term obligations exceed current assets';

  return { value: wc, unit: 'currency', interpretation };
}
