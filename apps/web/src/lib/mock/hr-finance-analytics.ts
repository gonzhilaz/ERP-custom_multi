export interface TenantPayrollRatioItem {
  id: string;
  tenantName: string;
  domainCategory: 'HOLDING' | 'MINING' | 'RESTO' | 'HOTEL' | 'RETAIL';
  totalHeadcount: number;
  totalMonthlyRevenue: number;
  totalMonthlyPayrollCost: number;
  payrollToRevenueRatio: number; // Dalam persen (%)
  revenuePerEmployee: number;
  targetRatioThreshold: number; // Ambang batas maksimal ideal (%)
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

export const MOCK_TENANT_PAYROLL_RATIOS: TenantPayrollRatioItem[] = [
  {
    id: 'pr-01',
    tenantName: 'PT Borneo Mining Emas',
    domainCategory: 'MINING',
    totalHeadcount: 320,
    totalMonthlyRevenue: 45000000000,
    totalMonthlyPayrollCost: 4500000000,
    payrollToRevenueRatio: 10.0,
    revenuePerEmployee: 140625000,
    targetRatioThreshold: 15.0,
    status: 'HEALTHY'
  },
  {
    id: 'pr-02',
    tenantName: 'Nusantara Culinary & Catering',
    domainCategory: 'RESTO',
    totalHeadcount: 85,
    totalMonthlyRevenue: 1200000000,
    totalMonthlyPayrollCost: 336000000,
    payrollToRevenueRatio: 28.0,
    revenuePerEmployee: 14117647,
    targetRatioThreshold: 25.0,
    status: 'WARNING'
  },
  {
    id: 'pr-03',
    tenantName: 'Grand Royal Hotel & Resort',
    domainCategory: 'HOTEL',
    totalHeadcount: 110,
    totalMonthlyRevenue: 2800000000,
    totalMonthlyPayrollCost: 616000000,
    payrollToRevenueRatio: 22.0,
    revenuePerEmployee: 25454545,
    targetRatioThreshold: 25.0,
    status: 'HEALTHY'
  },
  {
    id: 'pr-04',
    tenantName: 'Nusa Mart Retail Chain',
    domainCategory: 'RETAIL',
    totalHeadcount: 60,
    totalMonthlyRevenue: 1800000000,
    totalMonthlyPayrollCost: 288000000,
    payrollToRevenueRatio: 16.0,
    revenuePerEmployee: 30000000,
    targetRatioThreshold: 20.0,
    status: 'HEALTHY'
  }
];
