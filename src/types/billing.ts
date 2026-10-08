export type SubscriptionStatus = 'active' | 'past_due' | 'trialing' | 'paused' | 'canceled';

export type PaymentMethodType = 'credit_card' | 'pix_recurrent' | 'boleto';

export type PlanInterval = 'month' | 'quarter' | 'semester' | 'year';

export interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in BRL
  interval: PlanInterval;
  trialDays: number;
  activeSubscribers: number;
  mrrContribution: number;
  status: 'active' | 'archived';
  features: string[];
  recommendedBadge?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string; // CPF/CNPJ
  planId: string;
  planName: string;
  amount: number;
  interval: PlanInterval;
  status: SubscriptionStatus;
  paymentMethod: PaymentMethodType;
  cardLast4?: string;
  cardBrand?: 'mastercard' | 'visa' | 'elo' | 'amex';
  pixKey?: string;
  startDate: string;
  nextBillingDate: string;
  lastPaymentDate?: string;
  dunningAttempts: number;
  churnRisk: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface Invoice {
  id: string;
  subscriberId: string;
  subscriberName: string;
  subscriberEmail: string;
  planName: string;
  amount: number;
  feeAmount: number;
  netAmount: number;
  status: 'paid' | 'pending' | 'failed' | 'recovered' | 'refunded';
  paymentMethod: PaymentMethodType;
  dueDate: string;
  paidAt?: string;
  attemptCount: number;
  cardLast4?: string;
  failureReason?: string;
  receiptUrl?: string;
}

export interface DunningStep {
  id: string;
  dayOffset: number; // e.g. -2 (2 days before), 0 (day of billing), +1, +3, +5
  title: string;
  channel: 'auto_retry' | 'whatsapp' | 'email' | 'sms';
  description: string;
  successRate: number;
  active: boolean;
}

export interface WebhookEventLog {
  id: string;
  event: 'subscription.created' | 'subscription.renewed' | 'invoice.paid' | 'invoice.payment_failed' | 'invoice.recovered' | 'subscription.canceled';
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  httpStatus: number;
  endpoint: string;
  payload: Record<string, any>;
}

export interface MetricSummary {
  mrr: number;
  mrrGrowth: number;
  arr: number;
  activeSubscribers: number;
  subscribersGrowth: number;
  netChurnRate: number;
  recoveryRate: number;
  volumeToday: number;
  volumeMonth: number;
  failedInvoicesCount: number;
  recoveredAmountMonth: number;
}
