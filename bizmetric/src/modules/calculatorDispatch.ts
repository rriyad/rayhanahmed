// ============================================================
// CALCULATOR DISPATCH - Routes calculator IDs to formula functions
// No UI dependencies. Pure logic layer.
// ============================================================

import type { CalcResult, InputValues } from '@/types';
import { parseInput } from '@/utils/math';

// Investment
import {
  calculateROI,
  calculateNPV,
  calculateIRR,
  calculateFutureValue,
  calculatePresentValue,
} from './investment/formulas';

// Profit & Pricing
import {
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateEBITDAMargin,
  calculateMarkup,
  calculateBreakEven,
} from './profit-pricing/formulas';

// Liquidity
import {
  calculateCurrentRatio,
  calculateQuickRatio,
  calculateCashRatio,
  calculateWorkingCapital,
} from './liquidity/formulas';

// Leverage & Debt
import {
  calculateDebtToEquity,
  calculateDebtRatio,
  calculateInterestCoverageRatio,
  calculateEquityMultiplier,
} from './leverage-debt/formulas';

// Efficiency & Operations
import {
  calculateInventoryTurnover,
  calculateDaysInventoryOutstanding,
  calculateReceivablesTurnover,
  calculateAssetTurnover,
} from './efficiency-operations/formulas';

// Returns & Performance
import {
  calculateROA,
  calculateROE,
  calculateROIC,
  calculateEPS,
} from './returns-performance/formulas';

// Cash Flow & Accounting
import {
  calculateFreeCashFlow,
  calculateOperatingCashFlowRatio,
  calculateCashFlowToDebt,
  calculateEBITDA,
} from './cashflow-accounting/formulas';

// Valuation
import {
  calculatePERatio,
  calculateEVEBITDA,
  calculatePBRatio,
  calculateDCF,
} from './valuation/formulas';

// Startup & SaaS
import {
  calculateCAC,
  calculateLTV,
  calculateLTVCACRatio,
  calculateMRRGrowthRate,
  calculateChurnRate,
} from './startup-saas/formulas';

// Forecasting & Growth
import {
  calculateCAGR,
  calculateGrowthRate,
  calculateProjectedRevenue,
  calculateRuleOf72,
} from './forecasting-growth/formulas';

// ============================================================
// HELPER
// ============================================================

function p(values: InputValues, key: string): number {
  return parseInput(values[key] ?? '') ?? 0;
}

function errResult(message: string): CalcResult {
  return { value: null, unit: 'number', interpretation: message, error: message };
}

// ============================================================
// DISPATCH
// ============================================================

export function runCalculator(id: string, values: InputValues): CalcResult {
  switch (id) {
    // ---- Investment & TVM ----
    case 'roi':
      return calculateROI(p(values, 'gain'), p(values, 'cost'));

    case 'npv': {
      const cashflows = [
        p(values, 'cashflow1'),
        p(values, 'cashflow2'),
        p(values, 'cashflow3'),
      ];
      return calculateNPV(p(values, 'initialInvestment'), cashflows, p(values, 'discountRate'));
    }

    case 'irr': {
      const cashflows = [
        p(values, 'cashflow1'),
        p(values, 'cashflow2'),
        p(values, 'cashflow3'),
      ];
      return calculateIRR(p(values, 'initialInvestment'), cashflows);
    }

    case 'fv':
      return calculateFutureValue(p(values, 'presentValue'), p(values, 'rate'), p(values, 'periods'));

    case 'pv':
      return calculatePresentValue(p(values, 'futureValue'), p(values, 'rate'), p(values, 'periods'));

    // ---- Profit & Pricing ----
    case 'gpm':
      return calculateGrossProfitMargin(p(values, 'revenue'), p(values, 'cogs'));

    case 'npm':
      return calculateNetProfitMargin(p(values, 'netIncome'), p(values, 'revenue'));

    case 'ebitda-margin':
      return calculateEBITDAMargin(p(values, 'ebitda'), p(values, 'revenue'));

    case 'markup':
      return calculateMarkup(p(values, 'price'), p(values, 'cost'));

    case 'breakeven':
      return calculateBreakEven(
        p(values, 'fixedCosts'),
        p(values, 'pricePerUnit'),
        p(values, 'variableCostPerUnit')
      );

    // ---- Liquidity ----
    case 'current-ratio':
      return calculateCurrentRatio(p(values, 'currentAssets'), p(values, 'currentLiabilities'));

    case 'quick-ratio':
      return calculateQuickRatio(
        p(values, 'currentAssets'),
        p(values, 'inventory'),
        p(values, 'currentLiabilities')
      );

    case 'cash-ratio':
      return calculateCashRatio(p(values, 'cashAndEquivalents'), p(values, 'currentLiabilities'));

    case 'working-capital':
      return calculateWorkingCapital(p(values, 'currentAssets'), p(values, 'currentLiabilities'));

    // ---- Leverage & Debt ----
    case 'de-ratio':
      return calculateDebtToEquity(p(values, 'totalDebt'), p(values, 'shareholderEquity'));

    case 'debt-ratio':
      return calculateDebtRatio(p(values, 'totalDebt'), p(values, 'totalAssets'));

    case 'icr':
      return calculateInterestCoverageRatio(p(values, 'ebit'), p(values, 'interestExpense'));

    case 'equity-multiplier':
      return calculateEquityMultiplier(p(values, 'totalAssets'), p(values, 'shareholderEquity'));

    // ---- Efficiency & Operations ----
    case 'inventory-turnover':
      return calculateInventoryTurnover(p(values, 'cogs'), p(values, 'averageInventory'));

    case 'dio':
      return calculateDaysInventoryOutstanding(p(values, 'inventoryTurnover'));

    case 'dso': {
      // Compute receivables turnover first, then DSO
      const rt = calculateReceivablesTurnover(
        p(values, 'netCreditSales'),
        p(values, 'averageAccountsReceivable')
      );
      if (rt.value === null) return rt;
      const dso: CalcResult = {
        value: rt.value > 0 ? Math.round(365 / rt.value * 10) / 10 : null,
        unit: 'days',
        interpretation:
          rt.value > 0
            ? `Receivables turnover: ${rt.value.toFixed(2)}x. ${
                365 / rt.value < 30
                  ? 'Excellent — collecting receivables quickly'
                  : 365 / rt.value < 60
                  ? 'Acceptable receivables collection period'
                  : 'Slow collection — consider tightening credit terms'
              }`
            : 'Cannot calculate',
      };
      return dso;
    }

    case 'asset-turnover':
      return calculateAssetTurnover(p(values, 'netSales'), p(values, 'totalAssets'));

    // ---- Returns & Performance ----
    case 'roa':
      return calculateROA(p(values, 'netIncome'), p(values, 'totalAssets'));

    case 'roe':
      return calculateROE(p(values, 'netIncome'), p(values, 'shareholderEquity'));

    case 'roic':
      return calculateROIC(p(values, 'nopat'), p(values, 'investedCapital'));

    case 'eps':
      return calculateEPS(
        p(values, 'netIncome'),
        p(values, 'preferredDividends'),
        p(values, 'sharesOutstanding')
      );

    // ---- Cash Flow & Accounting ----
    case 'fcf':
      return calculateFreeCashFlow(p(values, 'operatingCashFlow'), p(values, 'capitalExpenditures'));

    case 'ebitda':
      return calculateEBITDA(
        p(values, 'netIncome'),
        p(values, 'interest'),
        p(values, 'taxes'),
        p(values, 'depreciation'),
        p(values, 'amortization')
      );

    case 'ocf-ratio':
      return calculateOperatingCashFlowRatio(
        p(values, 'operatingCashFlow'),
        p(values, 'currentLiabilities')
      );

    case 'cf-to-debt':
      return calculateCashFlowToDebt(p(values, 'operatingCashFlow'), p(values, 'totalDebt'));

    // ---- Valuation ----
    case 'pe-ratio':
      return calculatePERatio(p(values, 'stockPrice'), p(values, 'eps'));

    case 'ev-ebitda':
      return calculateEVEBITDA(p(values, 'enterpriseValue'), p(values, 'ebitda'));

    case 'pb-ratio':
      return calculatePBRatio(p(values, 'stockPrice'), p(values, 'bookValuePerShare'));

    case 'dcf': {
      const cashflows = [
        p(values, 'cashflow1'),
        p(values, 'cashflow2'),
        p(values, 'cashflow3'),
        p(values, 'cashflow4'),
        p(values, 'cashflow5'),
      ].filter((v) => v !== 0);
      return calculateDCF(cashflows, p(values, 'discountRate'), p(values, 'terminalGrowthRate'));
    }

    // ---- Startup & SaaS ----
    case 'cac':
      return calculateCAC(p(values, 'totalSalesMarketingSpend'), p(values, 'newCustomersAcquired'));

    case 'ltv':
      return calculateLTV(
        p(values, 'averageRevenuePerUser'),
        p(values, 'grossMargin'),
        p(values, 'churnRate')
      );

    case 'ltv-cac':
      return calculateLTVCACRatio(p(values, 'ltv'), p(values, 'cac'));

    case 'churn-rate':
      return calculateChurnRate(p(values, 'customersLost'), p(values, 'customersAtStart'));

    case 'mrr-growth':
      return calculateMRRGrowthRate(p(values, 'currentMRR'), p(values, 'previousMRR'));

    // ---- Forecasting & Growth ----
    case 'cagr':
      return calculateCAGR(p(values, 'endValue'), p(values, 'startValue'), p(values, 'years'));

    case 'growth-rate':
      return calculateGrowthRate(p(values, 'currentValue'), p(values, 'previousValue'));

    case 'projected-revenue':
      return calculateProjectedRevenue(
        p(values, 'currentRevenue'),
        p(values, 'growthRate'),
        p(values, 'years')
      );

    case 'rule-of-72':
      return calculateRuleOf72(p(values, 'annualRate'));

    default:
      return errResult(`Unknown calculator: ${id}`);
  }
}
