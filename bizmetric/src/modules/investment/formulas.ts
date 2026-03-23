// ============================================================
// INVESTMENT FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round, npvAtRate, dnpvAtRate } from '@/utils/math';
import type { CalcResult } from '@/types';

/** ROI = (Gain - Cost) / Cost * 100 */
export function calculateROI(gain: number, cost: number): CalcResult {
  const g = parseInput(String(gain));
  const c = parseInput(String(cost));

  if (g === null || c === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (c === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Cost cannot be zero.' };
  }

  const roi = round(safeDivide(g - c, c)! * 100, 2);

  let interpretation: string;
  if (roi >= 20) interpretation = 'Excellent return on investment';
  else if (roi >= 10) interpretation = 'Good return on investment';
  else if (roi >= 0) interpretation = 'Marginal return on investment';
  else interpretation = 'Negative return — investment is losing value';

  return { value: roi, unit: 'percent', interpretation };
}

/** NPV = sum of CF_t / (1+r)^t - initialInvestment */
export function calculateNPV(
  initialInvestment: number,
  cashflows: number[],
  discountRate: number
): CalcResult {
  const inv = parseInput(String(initialInvestment));
  const r = parseInput(String(discountRate));

  if (inv === null || r === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (!Array.isArray(cashflows) || cashflows.length === 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'At least one cash flow is required.' };
  }
  if (r <= -1) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Discount rate must be greater than -100%.' };
  }

  const rate = r / 100;
  const pv = cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t + 1), 0);
  const npv = round(pv - inv, 2);

  let interpretation: string;
  if (npv > 0) interpretation = 'Positive NPV — investment adds value';
  else if (npv === 0) interpretation = 'Break-even — investment neither adds nor destroys value';
  else interpretation = 'Negative NPV — investment destroys value';

  return { value: npv, unit: 'currency', interpretation };
}

/** IRR = rate where NPV = 0, solved via Newton-Raphson iteration */
export function calculateIRR(initialInvestment: number, cashflows: number[]): CalcResult {
  const inv = parseInput(String(initialInvestment));

  if (inv === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Initial investment must be a valid number.' };
  }
  if (!Array.isArray(cashflows) || cashflows.length === 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'At least one cash flow is required.' };
  }

  // Build full cash flow array: [-investment, cf1, cf2, ...]
  const allCashflows = [-inv, ...cashflows];

  let rate = 0.1; // initial guess: 10%
  const MAX_ITER = 1000;
  const TOLERANCE = 1e-7;

  for (let i = 0; i < MAX_ITER; i++) {
    const npv = npvAtRate(allCashflows, rate);
    const dnpv = dnpvAtRate(allCashflows, rate);

    if (Math.abs(dnpv) < TOLERANCE) break;

    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < TOLERANCE) {
      rate = newRate;
      break;
    }
    rate = newRate;
  }

  if (!isFinite(rate) || isNaN(rate)) {
    return { value: null, unit: 'percent', interpretation: 'Cannot converge', error: 'IRR could not be determined for these cash flows.' };
  }

  const irr = round(rate * 100, 2);

  let interpretation: string;
  if (irr >= 20) interpretation = 'High IRR — strong investment opportunity';
  else if (irr >= 10) interpretation = 'Acceptable IRR — meets typical hurdle rates';
  else if (irr >= 0) interpretation = 'Low IRR — below typical cost of capital';
  else interpretation = 'Negative IRR — investment does not recover its cost';

  return { value: irr, unit: 'percent', interpretation };
}

/** FV = PV * (1 + r)^n */
export function calculateFutureValue(presentValue: number, rate: number, periods: number): CalcResult {
  const pv = parseInput(String(presentValue));
  const r = parseInput(String(rate));
  const n = parseInput(String(periods));

  if (pv === null || r === null || n === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (n < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Periods cannot be negative.' };
  }

  const fv = round(pv * Math.pow(1 + r / 100, n), 2);

  let interpretation: string;
  if (fv > pv) interpretation = `Investment grows to ${fv > pv * 2 ? 'more than double' : 'above'} the present value`;
  else if (fv === pv) interpretation = 'Investment value remains unchanged';
  else interpretation = 'Investment declines in value';

  return { value: fv, unit: 'currency', interpretation };
}

/** PV = FV / (1 + r)^n */
export function calculatePresentValue(futureValue: number, rate: number, periods: number): CalcResult {
  const fv = parseInput(String(futureValue));
  const r = parseInput(String(rate));
  const n = parseInput(String(periods));

  if (fv === null || r === null || n === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (n < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Periods cannot be negative.' };
  }

  const divisor = Math.pow(1 + r / 100, n);
  if (divisor === 0) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Invalid rate or period combination.' };
  }

  const pv = round(fv / divisor, 2);

  let interpretation: string;
  if (pv < fv) interpretation = 'Future value is worth less in today\'s terms due to discounting';
  else if (pv === fv) interpretation = 'No discounting applied — present and future values are equal';
  else interpretation = 'Present value exceeds future value — verify inputs';

  return { value: pv, unit: 'currency', interpretation };
}
