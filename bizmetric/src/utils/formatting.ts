// ============================================================
// FORMATTING UTILITIES
// ============================================================

import type { ResultUnit } from '@/types';

/** Format a number as currency (USD) */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format a number as a percentage */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

/** Format a ratio */
export function formatRatio(value: number): string {
  return `${value.toFixed(2)}x`;
}

/** Format a number with commas */
export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format days */
export function formatDays(value: number): string {
  return `${value.toFixed(1)} days`;
}

/** Dispatch formatter by unit type */
export function formatByUnit(value: number, unit: ResultUnit): string {
  switch (unit) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return formatPercent(value);
    case 'ratio':
    case 'times':
      return formatRatio(value);
    case 'days':
      return formatDays(value);
    case 'number':
    default:
      return formatNumber(value);
  }
}
