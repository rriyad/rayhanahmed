// ============================================================
// CASHFLOW & ACCOUNTING FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** FCF = Operating Cash Flow - Capital Expenditures */
export function calculateFreeCashFlow(operatingCashFlow: number, capitalExpenditures: number): CalcResult {
  const ocf = parseInput(String(operatingCashFlow));
  const capex = parseInput(String(capitalExpenditures));

  if (ocf === null || capex === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (capex < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Capital expenditures cannot be negative.' };
  }

  const fcf = round(ocf - capex, 2);

  let interpretation: string;
  if (fcf > 0) interpretation = 'Positive free cash flow — business generates surplus cash after investments';
  else if (fcf === 0) interpretation = 'Break-even free cash flow — all operating cash is consumed by CapEx';
  else interpretation = 'Negative free cash flow — CapEx exceeds operating cash flow, may need financing';

  return { value: fcf, unit: 'currency', interpretation };
}

/** OCF Ratio = Operating Cash Flow / Current Liabilities */
export function calculateOperatingCashFlowRatio(
  operatingCashFlow: number,
  currentLiabilities: number
): CalcResult {
  const ocf = parseInput(String(operatingCashFlow));
  const cl = parseInput(String(currentLiabilities));

  if (ocf === null || cl === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (cl === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Current liabilities cannot be zero.' };
  }
  if (cl < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Current liabilities cannot be negative.' };
  }

  const ratio = round(safeDivide(ocf, cl)!, 2);

  let interpretation: string;
  if (ratio >= 1) interpretation = 'Strong OCF ratio — operating cash fully covers current liabilities';
  else if (ratio >= 0.5) interpretation = 'Adequate OCF ratio — reasonable short-term coverage';
  else if (ratio >= 0.2) interpretation = 'Weak OCF ratio — limited cash coverage of liabilities';
  else interpretation = 'Very low OCF ratio — operating cash flow insufficient for obligations';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** Cash Flow to Debt = Operating Cash Flow / Total Debt */
export function calculateCashFlowToDebt(operatingCashFlow: number, totalDebt: number): CalcResult {
  const ocf = parseInput(String(operatingCashFlow));
  const debt = parseInput(String(totalDebt));

  if (ocf === null || debt === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (debt === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'Total debt cannot be zero.' };
  }
  if (debt < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'Total debt cannot be negative.' };
  }

  const ratio = round(safeDivide(ocf, debt)!, 2);

  let interpretation: string;
  if (ratio >= 0.4) interpretation = 'Strong cash flow coverage — able to retire debt quickly';
  else if (ratio >= 0.2) interpretation = 'Good cash flow to debt — manageable debt levels';
  else if (ratio >= 0.1) interpretation = 'Moderate coverage — debt repayment will take several years';
  else if (ratio >= 0) interpretation = 'Weak coverage — debt repayment timeline is extended';
  else interpretation = 'Negative coverage — operating cash flow is insufficient to service debt';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization */
export function calculateEBITDA(
  netIncome: number,
  interest: number,
  taxes: number,
  depreciation: number,
  amortization: number
): CalcResult {
  const ni = parseInput(String(netIncome));
  const i = parseInput(String(interest));
  const t = parseInput(String(taxes));
  const d = parseInput(String(depreciation));
  const a = parseInput(String(amortization));

  if (ni === null || i === null || t === null || d === null || a === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (d < 0 || a < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Depreciation and amortization cannot be negative.' };
  }

  const ebitda = round(ni + i + t + d + a, 2);

  let interpretation: string;
  if (ebitda > 0) interpretation = 'Positive EBITDA — core operations are profitable before non-cash charges';
  else if (ebitda === 0) interpretation = 'Break-even EBITDA — operations cover costs exactly';
  else interpretation = 'Negative EBITDA — core operations are not generating profit';

  return { value: ebitda, unit: 'currency', interpretation };
}
