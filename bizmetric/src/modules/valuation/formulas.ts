// ============================================================
// VALUATION FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** P/E = Stock Price / EPS */
export function calculatePERatio(stockPrice: number, eps: number): CalcResult {
  const price = parseInput(String(stockPrice));
  const e = parseInput(String(eps));

  if (price === null || e === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (price < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Stock price cannot be negative.' };
  }
  if (e === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'EPS cannot be zero — company has no earnings.' };
  }
  if (e < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'P/E ratio is not meaningful with negative earnings.' };
  }

  const pe = round(safeDivide(price, e)!, 2);

  let interpretation: string;
  if (pe <= 10) interpretation = 'Low P/E — potentially undervalued or slow-growth expectations';
  else if (pe <= 20) interpretation = 'Moderate P/E — fairly valued for most industries';
  else if (pe <= 35) interpretation = 'High P/E — growth premium priced in';
  else interpretation = 'Very high P/E — significant growth expected or overvalued';

  return { value: pe, unit: 'ratio', interpretation };
}

/** EV/EBITDA = Enterprise Value / EBITDA */
export function calculateEVEBITDA(enterpriseValue: number, ebitda: number): CalcResult {
  const ev = parseInput(String(enterpriseValue));
  const e = parseInput(String(ebitda));

  if (ev === null || e === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (ev < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Enterprise value cannot be negative.' };
  }
  if (e === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'EBITDA cannot be zero.' };
  }
  if (e < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'EV/EBITDA is not meaningful with negative EBITDA.' };
  }

  const multiple = round(safeDivide(ev, e)!, 2);

  let interpretation: string;
  if (multiple <= 5) interpretation = 'Low multiple — potentially undervalued or distressed';
  else if (multiple <= 10) interpretation = 'Moderate multiple — in line with market norms';
  else if (multiple <= 20) interpretation = 'High multiple — growth or quality premium';
  else interpretation = 'Very high multiple — aggressive valuation, verify assumptions';

  return { value: multiple, unit: 'ratio', interpretation };
}

/** P/B = Stock Price / Book Value Per Share */
export function calculatePBRatio(stockPrice: number, bookValuePerShare: number): CalcResult {
  const price = parseInput(String(stockPrice));
  const bv = parseInput(String(bookValuePerShare));

  if (price === null || bv === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (price < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Stock price cannot be negative.' };
  }
  if (bv === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Book value per share cannot be zero.' };
  }

  const pb = round(safeDivide(price, bv)!, 2);

  let interpretation: string;
  if (pb < 1) interpretation = 'Below book value — potentially undervalued or financially stressed';
  else if (pb <= 2) interpretation = 'Near book value — conservative valuation';
  else if (pb <= 5) interpretation = 'Moderate P/B — market values intangibles and growth';
  else interpretation = 'High P/B — significant intangible assets or growth premium';

  return { value: pb, unit: 'ratio', interpretation };
}

/** DCF = sum of FCF_t/(1+r)^t + Terminal Value/(1+r)^n */
export function calculateDCF(
  cashflows: number[],
  discountRate: number,
  terminalGrowthRate: number
): CalcResult {
  const r = parseInput(String(discountRate));
  const g = parseInput(String(terminalGrowthRate));

  if (r === null || g === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (!Array.isArray(cashflows) || cashflows.length === 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'At least one cash flow is required.' };
  }
  if (r <= 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Discount rate must be greater than zero.' };
  }

  const rate = r / 100;
  const growthRate = g / 100;

  if (rate <= growthRate) {
    return {
      value: null,
      unit: 'currency',
      interpretation: 'Cannot calculate',
      error: 'Discount rate must be greater than terminal growth rate.',
    };
  }

  // PV of explicit forecast period cash flows
  const pvCashflows = cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t + 1), 0);

  // Terminal value using Gordon Growth Model: TV = FCF_last * (1+g) / (r - g)
  const lastCashflow = cashflows[cashflows.length - 1];
  const terminalValue = (lastCashflow * (1 + growthRate)) / (rate - growthRate);
  const pvTerminalValue = terminalValue / Math.pow(1 + rate, cashflows.length);

  const dcf = round(pvCashflows + pvTerminalValue, 2);

  let interpretation: string;
  if (dcf > 0) interpretation = 'Positive intrinsic value — investment may be worthwhile';
  else if (dcf === 0) interpretation = 'Break-even DCF — investment barely justified';
  else interpretation = 'Negative intrinsic value — cash flows do not justify the investment';

  return { value: dcf, unit: 'currency', interpretation };
}
