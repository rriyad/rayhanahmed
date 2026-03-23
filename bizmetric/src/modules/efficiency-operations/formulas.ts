// ============================================================
// EFFICIENCY & OPERATIONS FORMULAS - BizMetric Calculation Engine
// ============================================================

import { parseInput, safeDivide, round } from '@/utils/math';
import type { CalcResult } from '@/types';

/** Inventory Turnover = COGS / Average Inventory */
export function calculateInventoryTurnover(cogs: number, averageInventory: number): CalcResult {
  const c = parseInput(String(cogs));
  const inv = parseInput(String(averageInventory));

  if (c === null || inv === null) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (c < 0) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'COGS cannot be negative.' };
  }
  if (inv <= 0) {
    return { value: null, unit: 'times', interpretation: 'Cannot calculate', error: 'Average inventory must be greater than zero.' };
  }

  const turnover = round(safeDivide(c, inv)!, 2);

  let interpretation: string;
  if (turnover >= 12) interpretation = 'High inventory turnover — very efficient stock management';
  else if (turnover >= 6) interpretation = 'Good inventory turnover — healthy stock cycle';
  else if (turnover >= 3) interpretation = 'Moderate inventory turnover — monitor stock levels';
  else interpretation = 'Low inventory turnover — possible overstocking or slow sales';

  return { value: turnover, unit: 'times', interpretation };
}

/** DIO = 365 / Inventory Turnover */
export function calculateDaysInventoryOutstanding(inventoryTurnover: number): CalcResult {
  const it = parseInput(String(inventoryTurnover));

  if (it === null) {
    return { value: null, unit: 'days', interpretation: 'Invalid input', error: 'Inventory turnover must be a valid number.' };
  }
  if (it <= 0) {
    return { value: null, unit: 'days', interpretation: 'Cannot calculate', error: 'Inventory turnover must be greater than zero.' };
  }

  const dio = round(safeDivide(365, it)!, 2);

  let interpretation: string;
  if (dio <= 30) interpretation = 'Excellent DIO — inventory moves very quickly';
  else if (dio <= 60) interpretation = 'Good DIO — efficient inventory management';
  else if (dio <= 90) interpretation = 'Moderate DIO — inventory cycles within a quarter';
  else interpretation = 'High DIO — inventory is sitting too long, consider reducing stock';

  return { value: dio, unit: 'days', interpretation };
}

/** Receivables Turnover = Net Credit Sales / Average Accounts Receivable */
export function calculateReceivablesTurnover(
  netCreditSales: number,
  averageAccountsReceivable: number
): CalcResult {
  const sales = parseInput(String(netCreditSales));
  const ar = parseInput(String(averageAccountsReceivable));

  if (sales === null || ar === null) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (sales < 0) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'Net credit sales cannot be negative.' };
  }
  if (ar <= 0) {
    return { value: null, unit: 'times', interpretation: 'Cannot calculate', error: 'Average accounts receivable must be greater than zero.' };
  }

  const turnover = round(safeDivide(sales, ar)!, 2);

  let interpretation: string;
  if (turnover >= 12) interpretation = 'Excellent receivables turnover — collecting payments very quickly';
  else if (turnover >= 8) interpretation = 'Strong receivables turnover — efficient collections';
  else if (turnover >= 4) interpretation = 'Moderate receivables turnover — acceptable collection period';
  else interpretation = 'Low receivables turnover — slow collections, review credit policy';

  return { value: turnover, unit: 'times', interpretation };
}

/** DSO = 365 / Receivables Turnover */
export function calculateDaysSalesOutstanding(receivablesTurnover: number): CalcResult {
  const rt = parseInput(String(receivablesTurnover));

  if (rt === null) {
    return { value: null, unit: 'days', interpretation: 'Invalid input', error: 'Receivables turnover must be a valid number.' };
  }
  if (rt <= 0) {
    return { value: null, unit: 'days', interpretation: 'Cannot calculate', error: 'Receivables turnover must be greater than zero.' };
  }

  const dso = round(safeDivide(365, rt)!, 2);

  let interpretation: string;
  if (dso <= 30) interpretation = 'Excellent DSO — payments collected within a month';
  else if (dso <= 45) interpretation = 'Good DSO — timely collection of receivables';
  else if (dso <= 60) interpretation = 'Moderate DSO — monitor and follow up on outstanding invoices';
  else interpretation = 'High DSO — slow collections impacting cash flow';

  return { value: dso, unit: 'days', interpretation };
}

/** Asset Turnover = Net Sales / Total Assets */
export function calculateAssetTurnover(netSales: number, totalAssets: number): CalcResult {
  const sales = parseInput(String(netSales));
  const assets = parseInput(String(totalAssets));

  if (sales === null || assets === null) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'All inputs must be valid numbers.' };
  }
  if (sales < 0) {
    return { value: null, unit: 'times', interpretation: 'Invalid input', error: 'Net sales cannot be negative.' };
  }
  if (assets <= 0) {
    return { value: null, unit: 'times', interpretation: 'Cannot calculate', error: 'Total assets must be greater than zero.' };
  }

  const turnover = round(safeDivide(sales, assets)!, 2);

  let interpretation: string;
  if (turnover >= 2) interpretation = 'High asset turnover — excellent revenue generation per asset dollar';
  else if (turnover >= 1) interpretation = 'Good asset turnover — assets are being used productively';
  else if (turnover >= 0.5) interpretation = 'Moderate asset turnover — room to improve asset utilization';
  else interpretation = 'Low asset turnover — assets may be underutilized';

  return { value: turnover, unit: 'times', interpretation };
}
