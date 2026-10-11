export type CurrencyCode = 'MZN' | 'ZAR' | 'BRL' | 'USD' | 'EUR' | 'INR' | 'AOA';

export type ProductType = 'subscription' | 'single' | 'saas' | 'course' | 'ebook';

export type ProductStatus = 'active' | 'draft' | 'paused';

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  category: string;
  price: number;
  currency: CurrencyCode;
  salesCount: number;
  revenue: number;
  status: ProductStatus;
  checkoutUrl: string;
  image?: string;
  description: string;
  orderBump?: {
    name: string;
    price: number;
    enabled: boolean;
  };
}

export interface MetricSummary {
  todayRevenue: number;
  yesterdayRevenue: number;
  monthRevenue: number;
  totalSales: number;
  conversionRate: number;
  abandonmentRate: number;
  averageTicket: number;
  availableBalance: number;
  pendingBalance: number;
  level: {
    currentLevel: string;
    currentRevenue: number;
    nextLevelThreshold: number;
    nextLevelName: string;
    progressPercentage: number;
  };
}

export interface UtmMetric {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  clicks: number;
  sales: number;
  revenue: number;
  conversion: number;
}

export interface CurrencyRevenueItem {
  currency: CurrencyCode;
  amount: number;
  salesCount: number;
  symbol: string;
}

export interface Campaign {
  id: string;
  name: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  productName: string;
  usesCount: number;
  maxUses?: number;
  active: boolean;
  expiresAt: string;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  productName: string;
  commissionRate: number; // percentage, e.g. 30
  salesCount: number;
  totalEarned: number;
  status: 'approved' | 'pending' | 'rejected';
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  producer: string;
  category: string;
  price: number;
  currency: CurrencyCode;
  commissionRate: number;
  commissionAmount: number;
  temperature: number; // 1 to 100
  isAffiliated: boolean;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  currency: CurrencyCode;
  method: 'mpesa' | 'emola' | 'bank_transfer' | 'pix';
  accountDetails: string;
  status: 'completed' | 'processing' | 'pending';
  requestedAt: string;
  completedAt?: string;
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  amount: number;
  currency: CurrencyCode;
  createdAt: string;
  recovered: boolean;
}

export interface WebhookLog {
  id: string;
  event: string;
  timestamp: string;
  status: 'success' | 'failed';
  endpoint: string;
  payload: Record<string, any>;
}
