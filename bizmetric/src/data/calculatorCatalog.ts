// ============================================================
// CALCULATOR CATALOG - BizMetric
// Central data-driven catalog. All UI renders from this.
// ============================================================

import type { CalculatorDefinition, ModuleDefinition, ModuleId } from '@/types';

// ============================================================
// MODULE 1: Investment & TVM
// ============================================================

const investmentCalculators: CalculatorDefinition[] = [
  {
    id: 'roi',
    moduleId: 'investment' as ModuleId,
    name: 'ROI',
    abbreviation: 'ROI',
    fullName: 'Return on Investment (ROI)',
    description:
      'Measures the gain or loss generated on an investment relative to its cost. Expressed as a percentage.',
    formula: 'ROI = (Gain − Cost) / Cost × 100',
    inputs: [
      {
        id: 'gain',
        label: 'Total Gain / Return ($)',
        placeholder: 'e.g. 15000',
        type: 'currency',
      },
      {
        id: 'cost',
        label: 'Initial Investment ($)',
        placeholder: 'e.g. 10000',
        type: 'currency',
      },
    ],
    tags: ['investment', 'returns', 'profitability'],
  },
  {
    id: 'npv',
    moduleId: 'investment' as ModuleId,
    name: 'NPV',
    abbreviation: 'NPV',
    fullName: 'Net Present Value (NPV)',
    description:
      'Calculates the present value of future cash flows minus the initial investment. A positive NPV indicates a profitable investment.',
    formula: 'NPV = Σ [CF_t / (1+r)^t] − Initial Investment',
    inputs: [
      {
        id: 'initialInvestment',
        label: 'Initial Investment ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'cashflow1',
        label: 'Year 1 Cash Flow ($)',
        placeholder: 'e.g. 15000',
        type: 'currency',
      },
      {
        id: 'cashflow2',
        label: 'Year 2 Cash Flow ($)',
        placeholder: 'e.g. 20000',
        type: 'currency',
      },
      {
        id: 'cashflow3',
        label: 'Year 3 Cash Flow ($)',
        placeholder: 'e.g. 25000',
        type: 'currency',
      },
      {
        id: 'discountRate',
        label: 'Discount Rate (%)',
        placeholder: 'e.g. 10',
        type: 'percent',
      },
    ],
    tags: ['investment', 'valuation', 'cash flow', 'time value'],
  },
  {
    id: 'irr',
    moduleId: 'investment' as ModuleId,
    name: 'IRR',
    abbreviation: 'IRR',
    fullName: 'Internal Rate of Return (IRR)',
    description:
      'The discount rate that makes the NPV of all cash flows equal to zero. Used to evaluate the attractiveness of a project or investment.',
    formula: 'NPV = 0 → solve for r',
    inputs: [
      {
        id: 'initialInvestment',
        label: 'Initial Investment ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'cashflow1',
        label: 'Year 1 Cash Flow ($)',
        placeholder: 'e.g. 15000',
        type: 'currency',
      },
      {
        id: 'cashflow2',
        label: 'Year 2 Cash Flow ($)',
        placeholder: 'e.g. 20000',
        type: 'currency',
      },
      {
        id: 'cashflow3',
        label: 'Year 3 Cash Flow ($)',
        placeholder: 'e.g. 25000',
        type: 'currency',
      },
    ],
    tags: ['investment', 'returns', 'cash flow', 'time value'],
  },
  {
    id: 'fv',
    moduleId: 'investment' as ModuleId,
    name: 'FV',
    abbreviation: 'FV',
    fullName: 'Future Value (FV)',
    description:
      'Calculates the value of a current asset at a future date based on an assumed rate of growth. Essential for investment planning.',
    formula: 'FV = PV × (1 + r)^n',
    inputs: [
      {
        id: 'presentValue',
        label: 'Present Value ($)',
        placeholder: 'e.g. 10000',
        type: 'currency',
      },
      {
        id: 'rate',
        label: 'Annual Interest Rate (%)',
        placeholder: 'e.g. 8',
        type: 'percent',
      },
      {
        id: 'periods',
        label: 'Number of Periods (Years)',
        placeholder: 'e.g. 5',
        type: 'number',
      },
    ],
    tags: ['investment', 'time value', 'compounding', 'planning'],
  },
  {
    id: 'pv',
    moduleId: 'investment' as ModuleId,
    name: 'PV',
    abbreviation: 'PV',
    fullName: 'Present Value (PV)',
    description:
      'Determines the current worth of a future sum of money given a specified rate of return. Helps assess whether a future payment is worth a current investment.',
    formula: 'PV = FV / (1 + r)^n',
    inputs: [
      {
        id: 'futureValue',
        label: 'Future Value ($)',
        placeholder: 'e.g. 15000',
        type: 'currency',
      },
      {
        id: 'rate',
        label: 'Annual Discount Rate (%)',
        placeholder: 'e.g. 8',
        type: 'percent',
      },
      {
        id: 'periods',
        label: 'Number of Periods (Years)',
        placeholder: 'e.g. 5',
        type: 'number',
      },
    ],
    tags: ['investment', 'time value', 'discounting', 'planning'],
  },
];

// ============================================================
// MODULE 2: Profit & Pricing
// ============================================================

const profitPricingCalculators: CalculatorDefinition[] = [
  {
    id: 'gpm',
    moduleId: 'profit-pricing' as ModuleId,
    name: 'GPM',
    abbreviation: 'GPM',
    fullName: 'Gross Profit Margin (GPM)',
    description:
      'Shows the percentage of revenue remaining after deducting the cost of goods sold. Indicates how efficiently a company produces its goods.',
    formula: 'GPM = (Revenue − COGS) / Revenue × 100',
    inputs: [
      {
        id: 'revenue',
        label: 'Revenue ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
      {
        id: 'cogs',
        label: 'Cost of Goods Sold / COGS ($)',
        placeholder: 'e.g. 300000',
        type: 'currency',
      },
    ],
    tags: ['profitability', 'margin', 'pricing'],
  },
  {
    id: 'npm',
    moduleId: 'profit-pricing' as ModuleId,
    name: 'NPM',
    abbreviation: 'NPM',
    fullName: 'Net Profit Margin (NPM)',
    description:
      'Measures the percentage of revenue that remains as profit after all expenses are deducted. A key indicator of overall business profitability.',
    formula: 'NPM = Net Income / Revenue × 100',
    inputs: [
      {
        id: 'netIncome',
        label: 'Net Income ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'revenue',
        label: 'Total Revenue ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['profitability', 'margin', 'income'],
  },
  {
    id: 'ebitda-margin',
    moduleId: 'profit-pricing' as ModuleId,
    name: 'EBITDA Margin',
    abbreviation: 'EBITDA Margin',
    fullName: 'EBITDA Margin',
    description:
      'Expresses EBITDA as a percentage of total revenue, showing operating profitability before non-cash and financing items.',
    formula: 'EBITDA Margin = EBITDA / Revenue × 100',
    inputs: [
      {
        id: 'ebitda',
        label: 'EBITDA ($)',
        placeholder: 'e.g. 120000',
        type: 'currency',
      },
      {
        id: 'revenue',
        label: 'Revenue ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['profitability', 'margin', 'ebitda', 'operating'],
  },
  {
    id: 'markup',
    moduleId: 'profit-pricing' as ModuleId,
    name: 'Markup',
    abbreviation: 'Markup',
    fullName: 'Markup Percentage',
    description:
      'Calculates the percentage added to the cost price to arrive at the selling price. Useful for setting pricing strategy.',
    formula: 'Markup = (Price − Cost) / Cost × 100',
    inputs: [
      {
        id: 'price',
        label: 'Selling Price ($)',
        placeholder: 'e.g. 150',
        type: 'currency',
      },
      {
        id: 'cost',
        label: 'Cost Price ($)',
        placeholder: 'e.g. 100',
        type: 'currency',
      },
    ],
    tags: ['pricing', 'markup', 'cost'],
  },
  {
    id: 'breakeven',
    moduleId: 'profit-pricing' as ModuleId,
    name: 'BEP',
    abbreviation: 'BEP',
    fullName: 'Break-Even Point (BEP)',
    description:
      'Determines the number of units that must be sold to cover all fixed and variable costs. Essential for pricing and production decisions.',
    formula: 'BEP = Fixed Costs / (Price per Unit − Variable Cost per Unit)',
    inputs: [
      {
        id: 'fixedCosts',
        label: 'Total Fixed Costs ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'pricePerUnit',
        label: 'Selling Price per Unit ($)',
        placeholder: 'e.g. 50',
        type: 'currency',
      },
      {
        id: 'variableCostPerUnit',
        label: 'Variable Cost per Unit ($)',
        placeholder: 'e.g. 30',
        type: 'currency',
      },
    ],
    tags: ['pricing', 'breakeven', 'fixed costs', 'planning'],
  },
];

// ============================================================
// MODULE 3: Liquidity
// ============================================================

const liquidityCalculators: CalculatorDefinition[] = [
  {
    id: 'current-ratio',
    moduleId: 'liquidity' as ModuleId,
    name: 'Current Ratio',
    abbreviation: 'Current Ratio',
    fullName: 'Current Ratio',
    description:
      'Measures a company\'s ability to pay short-term obligations with its current assets. A ratio above 1 indicates good short-term liquidity.',
    formula: 'Current Ratio = Current Assets / Current Liabilities',
    inputs: [
      {
        id: 'currentAssets',
        label: 'Current Assets ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'currentLiabilities',
        label: 'Current Liabilities ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['liquidity', 'solvency', 'balance sheet'],
  },
  {
    id: 'quick-ratio',
    moduleId: 'liquidity' as ModuleId,
    name: 'Quick Ratio',
    abbreviation: 'Quick Ratio',
    fullName: 'Quick Ratio (Acid-Test)',
    description:
      'A more conservative measure of liquidity that excludes inventory from current assets. Shows ability to meet short-term obligations without selling inventory.',
    formula: 'Quick Ratio = (Current Assets − Inventory) / Current Liabilities',
    inputs: [
      {
        id: 'currentAssets',
        label: 'Current Assets ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'inventory',
        label: 'Inventory ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'currentLiabilities',
        label: 'Current Liabilities ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['liquidity', 'solvency', 'acid-test'],
  },
  {
    id: 'cash-ratio',
    moduleId: 'liquidity' as ModuleId,
    name: 'Cash Ratio',
    abbreviation: 'Cash Ratio',
    fullName: 'Cash Ratio',
    description:
      'The most conservative liquidity ratio, measuring a company\'s ability to cover current liabilities using only cash and cash equivalents.',
    formula: 'Cash Ratio = Cash & Equivalents / Current Liabilities',
    inputs: [
      {
        id: 'cashAndEquivalents',
        label: 'Cash & Cash Equivalents ($)',
        placeholder: 'e.g. 80000',
        type: 'currency',
      },
      {
        id: 'currentLiabilities',
        label: 'Current Liabilities ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['liquidity', 'cash', 'solvency'],
  },
  {
    id: 'working-capital',
    moduleId: 'liquidity' as ModuleId,
    name: 'WC',
    abbreviation: 'WC',
    fullName: 'Working Capital (WC)',
    description:
      'The difference between current assets and current liabilities, representing the funds available for day-to-day operations.',
    formula: 'Working Capital = Current Assets − Current Liabilities',
    inputs: [
      {
        id: 'currentAssets',
        label: 'Current Assets ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'currentLiabilities',
        label: 'Current Liabilities ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['liquidity', 'operations', 'working capital'],
  },
];

// ============================================================
// MODULE 4: Leverage & Debt
// ============================================================

const leverageDebtCalculators: CalculatorDefinition[] = [
  {
    id: 'de-ratio',
    moduleId: 'leverage-debt' as ModuleId,
    name: 'D/E',
    abbreviation: 'D/E',
    fullName: 'Debt-to-Equity Ratio (D/E)',
    description:
      'Compares total debt to shareholder equity, indicating how much debt a company is using to finance its assets relative to equity.',
    formula: 'D/E = Total Debt / Shareholder Equity',
    inputs: [
      {
        id: 'totalDebt',
        label: 'Total Debt ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'shareholderEquity',
        label: 'Shareholder Equity ($)',
        placeholder: 'e.g. 300000',
        type: 'currency',
      },
    ],
    tags: ['leverage', 'debt', 'solvency', 'capital structure'],
  },
  {
    id: 'debt-ratio',
    moduleId: 'leverage-debt' as ModuleId,
    name: 'Debt Ratio',
    abbreviation: 'Debt Ratio',
    fullName: 'Debt Ratio',
    description:
      'Measures the proportion of a company\'s assets that are financed by debt. A higher ratio indicates greater financial leverage and risk.',
    formula: 'Debt Ratio = Total Debt / Total Assets',
    inputs: [
      {
        id: 'totalDebt',
        label: 'Total Debt ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'totalAssets',
        label: 'Total Assets ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['leverage', 'debt', 'solvency'],
  },
  {
    id: 'icr',
    moduleId: 'leverage-debt' as ModuleId,
    name: 'ICR',
    abbreviation: 'ICR',
    fullName: 'Interest Coverage Ratio (ICR)',
    description:
      'Measures how easily a company can pay interest on its outstanding debt using its operating earnings. A higher ratio indicates greater financial health.',
    formula: 'ICR = EBIT / Interest Expense',
    inputs: [
      {
        id: 'ebit',
        label: 'EBIT ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
      {
        id: 'interestExpense',
        label: 'Interest Expense ($)',
        placeholder: 'e.g. 20000',
        type: 'currency',
      },
    ],
    tags: ['leverage', 'debt', 'interest', 'coverage'],
  },
];

// ============================================================
// MODULE 5: Efficiency & Operations
// ============================================================

const efficiencyOperationsCalculators: CalculatorDefinition[] = [
  {
    id: 'inventory-turnover',
    moduleId: 'efficiency-operations' as ModuleId,
    name: 'ITR',
    abbreviation: 'ITR',
    fullName: 'Inventory Turnover Ratio (ITR)',
    description:
      'Shows how many times a company has sold and replaced its inventory during a period. A higher ratio indicates efficient inventory management.',
    formula: 'ITR = COGS / Average Inventory',
    inputs: [
      {
        id: 'cogs',
        label: 'Cost of Goods Sold / COGS ($)',
        placeholder: 'e.g. 400000',
        type: 'currency',
      },
      {
        id: 'averageInventory',
        label: 'Average Inventory ($)',
        placeholder: 'e.g. 80000',
        type: 'currency',
      },
    ],
    tags: ['efficiency', 'inventory', 'operations'],
  },
  {
    id: 'dio',
    moduleId: 'efficiency-operations' as ModuleId,
    name: 'DIO',
    abbreviation: 'DIO',
    fullName: 'Days Inventory Outstanding (DIO)',
    description:
      'The average number of days a company holds its inventory before selling it. Lower DIO indicates faster inventory movement.',
    formula: 'DIO = 365 / Inventory Turnover',
    inputs: [
      {
        id: 'inventoryTurnover',
        label: 'Inventory Turnover Ratio',
        placeholder: 'e.g. 5',
        type: 'number',
      },
    ],
    tags: ['efficiency', 'inventory', 'days', 'operations'],
  },
  {
    id: 'dso',
    moduleId: 'efficiency-operations' as ModuleId,
    name: 'DSO',
    abbreviation: 'DSO',
    fullName: 'Days Sales Outstanding (DSO)',
    description:
      'Measures the average number of days it takes a company to collect payment after a sale. Lower DSO indicates faster collections.',
    formula: 'DSO = 365 / Receivables Turnover',
    inputs: [
      {
        id: 'netCreditSales',
        label: 'Net Credit Sales ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
      {
        id: 'averageAccountsReceivable',
        label: 'Average Accounts Receivable ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
    ],
    tags: ['efficiency', 'receivables', 'days', 'collections'],
  },
  {
    id: 'asset-turnover',
    moduleId: 'efficiency-operations' as ModuleId,
    name: 'ATR',
    abbreviation: 'ATR',
    fullName: 'Asset Turnover Ratio (ATR)',
    description:
      'Measures how efficiently a company uses its assets to generate revenue. A higher ratio indicates better asset utilization.',
    formula: 'ATR = Net Sales / Total Assets',
    inputs: [
      {
        id: 'netSales',
        label: 'Net Sales ($)',
        placeholder: 'e.g. 1000000',
        type: 'currency',
      },
      {
        id: 'totalAssets',
        label: 'Total Assets ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['efficiency', 'assets', 'turnover', 'operations'],
  },
];

// ============================================================
// MODULE 6: Returns & Performance
// ============================================================

const returnsPerformanceCalculators: CalculatorDefinition[] = [
  {
    id: 'roa',
    moduleId: 'returns-performance' as ModuleId,
    name: 'ROA',
    abbreviation: 'ROA',
    fullName: 'Return on Assets (ROA)',
    description:
      'Indicates how profitable a company is relative to its total assets. Shows how efficiently management uses assets to generate earnings.',
    formula: 'ROA = Net Income / Total Assets × 100',
    inputs: [
      {
        id: 'netIncome',
        label: 'Net Income ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'totalAssets',
        label: 'Total Assets ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['returns', 'performance', 'assets', 'profitability'],
  },
  {
    id: 'roe',
    moduleId: 'returns-performance' as ModuleId,
    name: 'ROE',
    abbreviation: 'ROE',
    fullName: 'Return on Equity (ROE)',
    description:
      'Measures the return generated on shareholders\' equity. A higher ROE indicates more efficient use of equity capital.',
    formula: 'ROE = Net Income / Shareholder Equity × 100',
    inputs: [
      {
        id: 'netIncome',
        label: 'Net Income ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'shareholderEquity',
        label: 'Shareholder Equity ($)',
        placeholder: 'e.g. 300000',
        type: 'currency',
      },
    ],
    tags: ['returns', 'performance', 'equity', 'profitability'],
  },
  {
    id: 'roic',
    moduleId: 'returns-performance' as ModuleId,
    name: 'ROIC',
    abbreviation: 'ROIC',
    fullName: 'Return on Invested Capital (ROIC)',
    description:
      'Measures how well a company generates returns from all capital invested, including both debt and equity. A key metric for capital allocation efficiency.',
    formula: 'ROIC = NOPAT / Invested Capital × 100',
    inputs: [
      {
        id: 'nopat',
        label: 'NOPAT - Net Operating Profit After Tax ($)',
        placeholder: 'e.g. 75000',
        type: 'currency',
      },
      {
        id: 'investedCapital',
        label: 'Invested Capital ($)',
        placeholder: 'e.g. 400000',
        type: 'currency',
      },
    ],
    tags: ['returns', 'performance', 'capital', 'profitability'],
  },
  {
    id: 'eps',
    moduleId: 'returns-performance' as ModuleId,
    name: 'EPS',
    abbreviation: 'EPS',
    fullName: 'Earnings Per Share (EPS)',
    description:
      'Indicates the portion of a company\'s profit allocated to each outstanding share of common stock. A key metric for investor analysis.',
    formula: 'EPS = (Net Income − Preferred Dividends) / Shares Outstanding',
    inputs: [
      {
        id: 'netIncome',
        label: 'Net Income ($)',
        placeholder: 'e.g. 1000000',
        type: 'currency',
      },
      {
        id: 'preferredDividends',
        label: 'Preferred Dividends ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'sharesOutstanding',
        label: 'Shares Outstanding',
        placeholder: 'e.g. 500000',
        type: 'number',
      },
    ],
    tags: ['returns', 'performance', 'earnings', 'shares'],
  },
];

// ============================================================
// MODULE 7: Cash Flow & Accounting
// ============================================================

const cashflowAccountingCalculators: CalculatorDefinition[] = [
  {
    id: 'fcf',
    moduleId: 'cashflow-accounting' as ModuleId,
    name: 'FCF',
    abbreviation: 'FCF',
    fullName: 'Free Cash Flow (FCF)',
    description:
      'Represents the cash a company generates after accounting for capital expenditures. Indicates how much cash is available for discretionary purposes.',
    formula: 'FCF = Operating Cash Flow − Capital Expenditures',
    inputs: [
      {
        id: 'operatingCashFlow',
        label: 'Operating Cash Flow ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'capitalExpenditures',
        label: 'Capital Expenditures / CapEx ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
    ],
    tags: ['cash flow', 'free cash flow', 'capex'],
  },
  {
    id: 'ebitda',
    moduleId: 'cashflow-accounting' as ModuleId,
    name: 'EBITDA',
    abbreviation: 'EBITDA',
    fullName: 'EBITDA',
    description:
      'Earnings Before Interest, Taxes, Depreciation, and Amortization. A proxy for operating cash flow and commonly used for business valuation.',
    formula: 'EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization',
    inputs: [
      {
        id: 'netIncome',
        label: 'Net Income ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
      {
        id: 'interest',
        label: 'Interest Expense ($)',
        placeholder: 'e.g. 20000',
        type: 'currency',
      },
      {
        id: 'taxes',
        label: 'Income Taxes ($)',
        placeholder: 'e.g. 30000',
        type: 'currency',
      },
      {
        id: 'depreciation',
        label: 'Depreciation ($)',
        placeholder: 'e.g. 15000',
        type: 'currency',
      },
      {
        id: 'amortization',
        label: 'Amortization ($)',
        placeholder: 'e.g. 5000',
        type: 'currency',
      },
    ],
    tags: ['ebitda', 'earnings', 'operating', 'valuation'],
  },
  {
    id: 'ocf-ratio',
    moduleId: 'cashflow-accounting' as ModuleId,
    name: 'OCF',
    abbreviation: 'OCF',
    fullName: 'Operating Cash Flow Ratio (OCF)',
    description:
      'Measures how well current liabilities are covered by the cash flow generated from operations. A ratio above 1 indicates strong liquidity.',
    formula: 'OCF Ratio = Operating Cash Flow / Current Liabilities',
    inputs: [
      {
        id: 'operatingCashFlow',
        label: 'Operating Cash Flow ($)',
        placeholder: 'e.g. 200000',
        type: 'currency',
      },
      {
        id: 'currentLiabilities',
        label: 'Current Liabilities ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['cash flow', 'operating', 'liquidity', 'ratio'],
  },
];

// ============================================================
// MODULE 8: Valuation
// ============================================================

const valuationCalculators: CalculatorDefinition[] = [
  {
    id: 'pe-ratio',
    moduleId: 'valuation' as ModuleId,
    name: 'P/E',
    abbreviation: 'P/E',
    fullName: 'Price-to-Earnings Ratio (P/E)',
    description:
      'Compares a company\'s stock price to its earnings per share. Used to assess whether a stock is overvalued or undervalued relative to earnings.',
    formula: 'P/E = Stock Price / Earnings Per Share',
    inputs: [
      {
        id: 'stockPrice',
        label: 'Stock Price ($)',
        placeholder: 'e.g. 50',
        type: 'currency',
      },
      {
        id: 'eps',
        label: 'Earnings Per Share / EPS ($)',
        placeholder: 'e.g. 3.50',
        type: 'currency',
      },
    ],
    tags: ['valuation', 'stock', 'earnings', 'multiple'],
  },
  {
    id: 'ev-ebitda',
    moduleId: 'valuation' as ModuleId,
    name: 'EV/EBITDA',
    abbreviation: 'EV/EBITDA',
    fullName: 'EV/EBITDA Multiple',
    description:
      'A valuation multiple comparing enterprise value to EBITDA. Widely used for comparing companies across industries and capital structures.',
    formula: 'EV/EBITDA = Enterprise Value / EBITDA',
    inputs: [
      {
        id: 'enterpriseValue',
        label: 'Enterprise Value ($)',
        placeholder: 'e.g. 5000000',
        type: 'currency',
      },
      {
        id: 'ebitda',
        label: 'EBITDA ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
    ],
    tags: ['valuation', 'enterprise value', 'ebitda', 'multiple'],
  },
  {
    id: 'pb-ratio',
    moduleId: 'valuation' as ModuleId,
    name: 'P/B',
    abbreviation: 'P/B',
    fullName: 'Price-to-Book Ratio (P/B)',
    description:
      'Compares a company\'s market value to its book value. A ratio below 1 may indicate an undervalued stock.',
    formula: 'P/B = Stock Price / Book Value Per Share',
    inputs: [
      {
        id: 'stockPrice',
        label: 'Stock Price ($)',
        placeholder: 'e.g. 50',
        type: 'currency',
      },
      {
        id: 'bookValuePerShare',
        label: 'Book Value Per Share ($)',
        placeholder: 'e.g. 25',
        type: 'currency',
      },
    ],
    tags: ['valuation', 'stock', 'book value', 'multiple'],
  },
];

// ============================================================
// MODULE 9: Startup & SaaS Metrics
// ============================================================

const startupSaasCalculators: CalculatorDefinition[] = [
  {
    id: 'cac',
    moduleId: 'startup-saas' as ModuleId,
    name: 'CAC',
    abbreviation: 'CAC',
    fullName: 'Customer Acquisition Cost (CAC)',
    description:
      'The total cost of acquiring a new customer, including all sales and marketing expenses. A critical metric for evaluating growth efficiency.',
    formula: 'CAC = Total Sales & Marketing Spend / New Customers Acquired',
    inputs: [
      {
        id: 'totalSalesMarketingSpend',
        label: 'Total Sales & Marketing Spend ($)',
        placeholder: 'e.g. 50000',
        type: 'currency',
      },
      {
        id: 'newCustomersAcquired',
        label: 'New Customers Acquired',
        placeholder: 'e.g. 100',
        type: 'number',
      },
    ],
    tags: ['saas', 'startup', 'customer', 'acquisition', 'growth'],
  },
  {
    id: 'ltv',
    moduleId: 'startup-saas' as ModuleId,
    name: 'LTV',
    abbreviation: 'LTV',
    fullName: 'Customer Lifetime Value (LTV)',
    description:
      'Predicts the total revenue a business can expect from a single customer over the entire relationship. Key for determining sustainable CAC levels.',
    formula: 'LTV = ARPU × Gross Margin % / Monthly Churn Rate',
    inputs: [
      {
        id: 'averageRevenuePerUser',
        label: 'Average Revenue Per User / ARPU (Monthly $)',
        placeholder: 'e.g. 99',
        type: 'currency',
      },
      {
        id: 'grossMargin',
        label: 'Gross Margin (%)',
        placeholder: 'e.g. 70',
        type: 'percent',
      },
      {
        id: 'churnRate',
        label: 'Monthly Churn Rate (%)',
        placeholder: 'e.g. 2',
        type: 'percent',
      },
    ],
    tags: ['saas', 'startup', 'customer', 'lifetime value', 'retention'],
  },
  {
    id: 'ltv-cac',
    moduleId: 'startup-saas' as ModuleId,
    name: 'LTV:CAC',
    abbreviation: 'LTV:CAC',
    fullName: 'LTV to CAC Ratio (LTV:CAC)',
    description:
      'Compares customer lifetime value to acquisition cost. A ratio of 3:1 or higher is generally considered healthy for SaaS businesses.',
    formula: 'LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost',
    inputs: [
      {
        id: 'ltv',
        label: 'Customer Lifetime Value / LTV ($)',
        placeholder: 'e.g. 3000',
        type: 'currency',
      },
      {
        id: 'cac',
        label: 'Customer Acquisition Cost / CAC ($)',
        placeholder: 'e.g. 500',
        type: 'currency',
      },
    ],
    tags: ['saas', 'startup', 'ltv', 'cac', 'unit economics'],
  },
  {
    id: 'churn-rate',
    moduleId: 'startup-saas' as ModuleId,
    name: 'Churn Rate',
    abbreviation: 'Churn Rate',
    fullName: 'Churn Rate',
    description:
      'The percentage of customers who stop using a service during a given period. Lower churn indicates stronger customer retention.',
    formula: 'Churn Rate = Customers Lost / Customers at Start × 100',
    inputs: [
      {
        id: 'customersLost',
        label: 'Customers Lost in Period',
        placeholder: 'e.g. 50',
        type: 'number',
      },
      {
        id: 'customersAtStart',
        label: 'Customers at Start of Period',
        placeholder: 'e.g. 1000',
        type: 'number',
      },
    ],
    tags: ['saas', 'startup', 'churn', 'retention', 'customer'],
  },
  {
    id: 'mrr-growth',
    moduleId: 'startup-saas' as ModuleId,
    name: 'MRR Growth',
    abbreviation: 'MRR Growth',
    fullName: 'MRR Growth Rate',
    description:
      'Measures the month-over-month percentage increase in Monthly Recurring Revenue. A primary growth indicator for subscription businesses.',
    formula: 'MRR Growth = (Current MRR − Previous MRR) / Previous MRR × 100',
    inputs: [
      {
        id: 'currentMRR',
        label: 'Current Month MRR ($)',
        placeholder: 'e.g. 110000',
        type: 'currency',
      },
      {
        id: 'previousMRR',
        label: 'Previous Month MRR ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['saas', 'startup', 'mrr', 'growth', 'revenue'],
  },
];

// ============================================================
// MODULE 10: Forecasting & Growth
// ============================================================

const forecastingGrowthCalculators: CalculatorDefinition[] = [
  {
    id: 'cagr',
    moduleId: 'forecasting-growth' as ModuleId,
    name: 'CAGR',
    abbreviation: 'CAGR',
    fullName: 'Compound Annual Growth Rate (CAGR)',
    description:
      'Represents the mean annual growth rate of an investment over a specified time period longer than one year. Smooths out volatility for clear comparison.',
    formula: 'CAGR = (End Value / Start Value)^(1/Years) − 1',
    inputs: [
      {
        id: 'endValue',
        label: 'End Value ($)',
        placeholder: 'e.g. 150000',
        type: 'currency',
      },
      {
        id: 'startValue',
        label: 'Start Value ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
      {
        id: 'years',
        label: 'Number of Years',
        placeholder: 'e.g. 5',
        type: 'number',
      },
    ],
    tags: ['forecasting', 'growth', 'cagr', 'compounding'],
  },
  {
    id: 'growth-rate',
    moduleId: 'forecasting-growth' as ModuleId,
    name: 'Growth Rate',
    abbreviation: 'Growth Rate',
    fullName: 'Growth Rate (YoY)',
    description:
      'Calculates the year-over-year percentage change in a metric. A fundamental measure of business momentum and performance.',
    formula: 'Growth Rate = (Current − Previous) / Previous × 100',
    inputs: [
      {
        id: 'currentValue',
        label: 'Current Period Value ($)',
        placeholder: 'e.g. 110000',
        type: 'currency',
      },
      {
        id: 'previousValue',
        label: 'Previous Period Value ($)',
        placeholder: 'e.g. 100000',
        type: 'currency',
      },
    ],
    tags: ['forecasting', 'growth', 'yoy', 'performance'],
  },
  {
    id: 'projected-revenue',
    moduleId: 'forecasting-growth' as ModuleId,
    name: 'Projected Revenue',
    abbreviation: 'Projected Revenue',
    fullName: 'Projected Revenue',
    description:
      'Forecasts future revenue based on a constant annual growth rate applied to current revenue. Useful for financial planning and modeling.',
    formula: 'Projected Revenue = Current Revenue × (1 + Growth Rate)^Years',
    inputs: [
      {
        id: 'currentRevenue',
        label: 'Current Revenue ($)',
        placeholder: 'e.g. 500000',
        type: 'currency',
      },
      {
        id: 'growthRate',
        label: 'Annual Growth Rate (%)',
        placeholder: 'e.g. 15',
        type: 'percent',
      },
      {
        id: 'years',
        label: 'Projection Years',
        placeholder: 'e.g. 3',
        type: 'number',
      },
    ],
    tags: ['forecasting', 'growth', 'revenue', 'planning'],
  },
  {
    id: 'rule-of-72',
    moduleId: 'forecasting-growth' as ModuleId,
    name: 'Rule of 72',
    abbreviation: 'Rule of 72',
    fullName: 'Rule of 72',
    description:
      'A quick estimate of the number of years required to double an investment at a given annual rate. A useful mental shortcut for financial planning.',
    formula: 'Doubling Time = 72 / Annual Rate',
    inputs: [
      {
        id: 'annualRate',
        label: 'Annual Growth / Interest Rate (%)',
        placeholder: 'e.g. 8',
        type: 'percent',
      },
    ],
    tags: ['forecasting', 'growth', 'doubling', 'compounding', 'rule of 72'],
  },
];

// ============================================================
// COMPLETE CALCULATOR CATALOG
// ============================================================

export const CALCULATOR_CATALOG: CalculatorDefinition[] = [
  ...investmentCalculators,
  ...profitPricingCalculators,
  ...liquidityCalculators,
  ...leverageDebtCalculators,
  ...efficiencyOperationsCalculators,
  ...returnsPerformanceCalculators,
  ...cashflowAccountingCalculators,
  ...valuationCalculators,
  ...startupSaasCalculators,
  ...forecastingGrowthCalculators,
];

// ============================================================
// MODULE METADATA (without calculators — assembled in moduleRegistry)
// ============================================================

export const MODULE_METADATA: Omit<ModuleDefinition, 'calculators'>[] = [
  {
    id: 'investment',
    name: 'Investment & TVM',
    description: 'Time value of money, ROI, NPV, IRR, and investment return calculators.',
    icon: '📈',
    color: 'blue',
  },
  {
    id: 'profit-pricing',
    name: 'Profit & Pricing',
    description: 'Gross and net margin, EBITDA margin, markup, and break-even analysis.',
    icon: '💰',
    color: 'green',
  },
  {
    id: 'liquidity',
    name: 'Liquidity',
    description: 'Current ratio, quick ratio, cash ratio, and working capital analysis.',
    icon: '💧',
    color: 'cyan',
  },
  {
    id: 'leverage-debt',
    name: 'Leverage & Debt',
    description: 'Debt-to-equity, debt ratio, and interest coverage ratio calculators.',
    icon: '⚖️',
    color: 'orange',
  },
  {
    id: 'efficiency-operations',
    name: 'Efficiency & Operations',
    description: 'Inventory turnover, DIO, DSO, and asset turnover efficiency metrics.',
    icon: '⚙️',
    color: 'purple',
  },
  {
    id: 'returns-performance',
    name: 'Returns & Performance',
    description: 'ROA, ROE, ROIC, and EPS performance and return metrics.',
    icon: '📊',
    color: 'indigo',
  },
  {
    id: 'cashflow-accounting',
    name: 'Cash Flow & Accounting',
    description: 'Free cash flow, EBITDA, and operating cash flow ratio calculators.',
    icon: '🔄',
    color: 'teal',
  },
  {
    id: 'valuation',
    name: 'Valuation',
    description: 'P/E ratio, EV/EBITDA, and P/B ratio valuation multiples.',
    icon: '🏦',
    color: 'yellow',
  },
  {
    id: 'startup-saas',
    name: 'Startup & SaaS Metrics',
    description: 'CAC, LTV, LTV:CAC ratio, churn rate, and MRR growth metrics.',
    icon: '🚀',
    color: 'pink',
  },
  {
    id: 'forecasting-growth',
    name: 'Forecasting & Growth',
    description: 'CAGR, YoY growth rate, projected revenue, and rule of 72 calculators.',
    icon: '📉',
    color: 'red',
  },
];
