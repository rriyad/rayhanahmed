// ============================================================
// STARTUP & SAAS FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** CAC = Total Sales & Marketing Spend / New Customers Acquired */
export function calculateCAC(totalSalesMarketingSpend: number, newCustomersAcquired: number): CalcResult {
  const spend = parseInput(String(totalSalesMarketingSpend));
  const customers = parseInput(String(newCustomersAcquired));

  if (spend === null || customers === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (spend < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Sales & marketing spend cannot be negative.' };
  }
  if (customers <= 0) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'New customers acquired must be greater than zero.' };
  }

  const cac = round(safeDivide(spend, customers)!, 2);

  let interpretation: string;
  if (cac <= 100) interpretation = 'Low CAC — very efficient customer acquisition';
  else if (cac <= 500) interpretation = 'Moderate CAC — typical for many SaaS businesses';
  else if (cac <= 1000) interpretation = 'High CAC — ensure LTV justifies acquisition cost';
  else interpretation = 'Very high CAC — review and optimize acquisition channels';

  return { value: cac, unit: 'currency', interpretation };
}

/** LTV = ARPU * Gross Margin % / Churn Rate */
export function calculateLTV(
  averageRevenuePerUser: number,
  grossMargin: number,
  churnRate: number
): CalcResult {
  const arpu = parseInput(String(averageRevenuePerUser));
  const gm = parseInput(String(grossMargin));
  const churn = parseInput(String(churnRate));

  if (arpu === null || gm === null || churn === null) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (arpu < 0) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'ARPU cannot be negative.' };
  }
  if (gm < 0 || gm > 100) {
    return { value: null, unit: 'currency', interpretation: 'Invalid input', error: 'Gross margin must be between 0 and 100.' };
  }
  if (churn <= 0) {
    return { value: null, unit: 'currency', interpretation: 'Cannot calculate', error: 'Churn rate must be greater than zero.' };
  }

  const ltv = round(safeDivide(arpu * (gm / 100), churn / 100)!, 2);

  let interpretation: string;
  if (ltv >= 10000) interpretation = 'Excellent LTV — strong long-term customer value';
  else if (ltv >= 3000) interpretation = 'Healthy LTV — solid customer lifetime value';
  else if (ltv >= 1000) interpretation = 'Moderate LTV — room to improve retention or pricing';
  else interpretation = 'Low LTV — focus on reducing churn or increasing ARPU';

  return { value: ltv, unit: 'currency', interpretation };
}

/** LTV:CAC = LTV / CAC */
export function calculateLTVCACRatio(ltv: number, cac: number): CalcResult {
  const l = parseInput(String(ltv));
  const c = parseInput(String(cac));

  if (l === null || c === null) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (c === 0) {
    return { value: null, unit: 'ratio', interpretation: 'Cannot calculate', error: 'CAC cannot be zero.' };
  }
  if (c < 0) {
    return { value: null, unit: 'ratio', interpretation: 'Invalid input', error: 'CAC cannot be negative.' };
  }

  const ratio = round(safeDivide(l, c)!, 2);

  let interpretation: string;
  if (ratio >= 5) interpretation = 'Excellent LTV:CAC ratio — highly efficient growth economics';
  else if (ratio >= 3) interpretation = 'Healthy LTV:CAC — business is scaling efficiently';
  else if (ratio >= 1) interpretation = 'Marginal LTV:CAC — acquisition costs are high relative to value';
  else interpretation = 'Poor LTV:CAC — losing money on each customer acquired';

  return { value: ratio, unit: 'ratio', interpretation };
}

/** MRR Growth Rate = (Current MRR - Previous MRR) / Previous MRR * 100 */
export function calculateMRRGrowthRate(currentMRR: number, previousMRR: number): CalcResult {
  const curr = parseInput(String(currentMRR));
  const prev = parseInput(String(previousMRR));

  if (curr === null || prev === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (prev === 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Previous MRR cannot be zero.' };
  }

  const growth = round(safeDivide(curr - prev, prev)! * 100, 2);

  let interpretation: string;
  if (growth >= 20) interpretation = 'Exceptional MRR growth — hypergrowth trajectory';
  else if (growth >= 10) interpretation = 'Strong MRR growth — healthy expansion';
  else if (growth >= 5) interpretation = 'Moderate MRR growth — steady progress';
  else if (growth >= 0) interpretation = 'Slow MRR growth — acceleration needed';
  else interpretation = 'Negative MRR growth — revenue contraction occurring';

  return { value: growth, unit: 'percent', interpretation };
}

/** Churn Rate = Customers Lost / Customers at Start * 100 */
export function calculateChurnRate(customersLost: number, customersAtStart: number): CalcResult {
  const lost = parseInput(String(customersLost));
  const start = parseInput(String(customersAtStart));

  if (lost === null || start === null) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (lost < 0) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Customers lost cannot be negative.' };
  }
  if (start <= 0) {
    return { value: null, unit: 'percent', interpretation: 'Cannot calculate', error: 'Customers at start must be greater than zero.' };
  }
  if (lost > start) {
    return { value: null, unit: 'percent', interpretation: 'Invalid input', error: 'Customers lost cannot exceed customers at start.' };
  }

  const churn = round(safeDivide(lost, start)! * 100, 2);

  let interpretation: string;
  if (churn <= 1) interpretation = 'Excellent retention — very low churn rate';
  else if (churn <= 3) interpretation = 'Healthy churn — within acceptable SaaS benchmarks';
  else if (churn <= 7) interpretation = 'Elevated churn — investigate and address root causes';
  else if (churn <= 15) interpretation = 'High churn — significant retention problem';
  else interpretation = 'Critical churn level — urgent action required';

  return { value: churn, unit: 'percent', interpretation };
}
