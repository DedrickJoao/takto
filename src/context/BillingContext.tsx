import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CurrencyCode,
  Product,
  MetricSummary,
  UtmMetric,
  CurrencyRevenueItem,
  Campaign,
  Affiliate,
  MarketplaceProduct,
  WithdrawalRequest,
  AbandonedCart,
  WebhookLog,
} from '../types/billing';
import {
  INITIAL_PRODUCTS,
  INITIAL_METRICS,
  INITIAL_UTM_DATA,
  CURRENCY_REVENUE_DATA,
  INITIAL_CAMPAIGNS,
  INITIAL_AFFILIATES,
  MARKETPLACE_PRODUCTS,
  INITIAL_WITHDRAWALS,
  INITIAL_ABANDONED_CARTS,
  INITIAL_WEBHOOK_LOGS,
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}

interface BillingContextType {
  // Navigation & Filters
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCurrency: CurrencyCode;
  setActiveCurrency: (cur: CurrencyCode) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  isBalanceVisible: boolean;
  setIsBalanceVisible: (val: boolean) => void;
  isSandbox: boolean;
  setIsSandbox: (val: boolean) => void;

  // Data
  products: Product[];
  metrics: MetricSummary;
  utmData: UtmMetric[];
  currencyRevenue: CurrencyRevenueItem[];
  campaigns: Campaign[];
  affiliates: Affiliate[];
  marketplaceProducts: MarketplaceProduct[];
  withdrawals: WithdrawalRequest[];
  abandonedCarts: AbandonedCart[];
  webhookLogs: WebhookLog[];

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Modals
  isLevelModalOpen: boolean;
  setIsLevelModalOpen: (val: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (val: boolean) => void;
  isNewProductModalOpen: boolean;
  setIsNewProductModalOpen: (val: boolean) => void;
  isSupportChatOpen: boolean;
  setIsSupportChatOpen: (val: boolean) => void;
  isCheckoutSimulatorOpen: boolean;
  setIsCheckoutSimulatorOpen: (val: boolean) => void;
  selectedProductForCheckout: Product | null;
  setSelectedProductForCheckout: (prod: Product | null) => void;

  // Actions
  createProduct: (product: Omit<Product, 'id' | 'salesCount' | 'revenue' | 'checkoutUrl'>) => void;
  toggleProductStatus: (id: string) => void;
  deleteProduct: (id: string) => void;
  requestWithdrawal: (amount: number, method: 'mpesa' | 'emola' | 'bank_transfer' | 'pix', accountDetails: string) => boolean;
  recoverCart: (cartId: string) => void;
  toggleAffiliateProduct: (productId: string) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'usesCount' | 'active'>) => void;
  toggleCampaignStatus: (id: string) => void;
  dispatchTestWebhook: (event: string) => void;
  simulateOrderCheckout: (productId: string, customerName: string, customerPhone: string, paymentMethod: string) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>('MZN');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Hoje');
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [isSandbox, setIsSandbox] = useState<boolean>(false);

  // Core entities
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [metrics, setMetrics] = useState<MetricSummary>(INITIAL_METRICS);
  const [utmData, setUtmData] = useState<UtmMetric[]>(INITIAL_UTM_DATA);
  const [currencyRevenue, setCurrencyRevenue] = useState<CurrencyRevenueItem[]>(CURRENCY_REVENUE_DATA);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [affiliates, setAffiliates] = useState<Affiliate[]>(INITIAL_AFFILIATES);
  const [marketplaceProducts, setMarketplaceProducts] = useState<MarketplaceProduct[]>(MARKETPLACE_PRODUCTS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>(INITIAL_ABANDONED_CARTS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>(INITIAL_WEBHOOK_LOGS);

  // Modals & Drawers
  const [isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState<boolean>(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState<boolean>(false);
  const [isCheckoutSimulatorOpen, setIsCheckoutSimulatorOpen] = useState<boolean>(false);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState<Product | null>(INITIAL_PRODUCTS[0]);

  // Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const createProduct = (productData: Omit<Product, 'id' | 'salesCount' | 'revenue' | 'checkoutUrl'>) => {
    const newId = `prod_${Date.now()}`;
    const slug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProduct: Product = {
      ...productData,
      id: newId,
      slug,
      salesCount: 0,
      revenue: 0,
      checkoutUrl: `https://escalepay.com/pay/${slug}`,
    };

    setProducts((prev) => [newProduct, ...prev]);
    addToast({
      type: 'success',
      title: 'Produto Criado!',
      message: `"${productData.name}" foi cadastrado com sucesso e já possui link de checkout ativo.`,
    });
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'active' ? 'paused' : 'active';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Produto Removido',
      message: 'O produto foi excluído da sua conta.',
    });
  };

  const requestWithdrawal = (
    amount: number,
    method: 'mpesa' | 'emola' | 'bank_transfer' | 'pix',
    accountDetails: string
  ): boolean => {
    if (amount <= 0 || amount > metrics.availableBalance) {
      addToast({
        type: 'error',
        title: 'Saldo Insuficiente',
        message: 'O valor solicitado excede o saldo disponível para saque.',
      });
      return false;
    }

    const newReq: WithdrawalRequest = {
      id: `wd_${Date.now()}`,
      amount,
      currency: activeCurrency,
      method,
      accountDetails,
      status: 'processing',
      requestedAt: new Date().toISOString().split('T')[0],
    };

    setWithdrawals((prev) => [newReq, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      pendingBalance: prev.pendingBalance + amount,
    }));

    addToast({
      type: 'success',
      title: 'Saque Solicitado!',
      message: `Saque de MT ${amount.toFixed(2)} enviado via ${method.toUpperCase()}. Processamento em até 1 hora.`,
    });
    return true;
  };

  const recoverCart = (cartId: string) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === cartId ? { ...c, recovered: true } : c))
    );
    addToast({
      type: 'success',
      title: 'Disparo de WhatsApp Enviado',
      message: 'Mensagem de recuperação com link de pagamento direto enviada com sucesso.',
    });
  };

  const toggleAffiliateProduct = (productId: string) => {
    setMarketplaceProducts((prev) =>
      prev.map((m) => {
        if (m.id === productId) {
          const nextState = !m.isAffiliated;
          addToast({
            type: nextState ? 'success' : 'info',
            title: nextState ? 'Você é um Afiliado!' : 'Afiliação Cancelada',
            message: nextState
              ? `Agora você pode promover "${m.title}" e ganhar ${m.commissionRate}% de comissão!`
              : `Você cancelou sua afiliação de "${m.title}".`,
          });
          return { ...m, isAffiliated: nextState };
        }
        return m;
      })
    );
  };

  const createCampaign = (campaignData: Omit<Campaign, 'id' | 'usesCount' | 'active'>) => {
    const newCamp: Campaign = {
      ...campaignData,
      id: `camp_${Date.now()}`,
      usesCount: 0,
      active: true,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    addToast({
      type: 'success',
      title: 'Campanha Criada',
      message: `Cupom "${campaignData.code}" ativo com ${campaignData.discountValue}${
        campaignData.discountType === 'percentage' ? '%' : ' MT'
      } de desconto.`,
    });
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const dispatchTestWebhook = (event: string) => {
    const newLog: WebhookLog = {
      id: `wh_${Date.now()}`,
      event,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'success',
      endpoint: 'https://api.seusite.com/escalepay-webhook',
      payload: {
        event,
        timestamp: Date.now(),
        seller_id: 'seller_alberto_aa',
        amount: 650.0,
        currency: activeCurrency,
      },
    };
    setWebhookLogs((prev) => [newLog, ...prev]);
    addToast({
      type: 'info',
      title: 'Webhook Disparado (200 OK)',
      message: `Evento "${event}" enviado com sucesso ao endpoint configurado.`,
    });
  };

  const simulateOrderCheckout = (
    productId: string,
    customerName: string,
    customerPhone: string,
    paymentMethod: string
  ) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const amount = prod.price;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, salesCount: p.salesCount + 1, revenue: p.revenue + amount }
          : p
      )
    );

    setMetrics((prev) => {
      const newAvail = prev.availableBalance + amount;
      const nextRev = prev.level.currentRevenue + amount;
      const progress = Math.min(100, (nextRev / prev.level.nextLevelThreshold) * 100);
      return {
        ...prev,
        todayRevenue: prev.todayRevenue + amount,
        monthRevenue: prev.monthRevenue + amount,
        totalSales: prev.totalSales + 1,
        conversionRate: 100.0,
        availableBalance: newAvail,
        level: {
          ...prev.level,
          currentRevenue: nextRev,
          progressPercentage: progress,
        },
      };
    });

    // Update currency item
    setCurrencyRevenue((prev) =>
      prev.map((c) =>
        c.currency === prod.currency
          ? { ...c, amount: c.amount + amount, salesCount: c.salesCount + 1 }
          : c
      )
    );

    addToast({
      type: 'success',
      title: 'Venda Concluída com Sucesso! 🎉',
      message: `${customerName} comprou "${prod.name}" via ${paymentMethod}. Saldo atualizado!`,
    });
  };

  return (
    <BillingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeCurrency,
        setActiveCurrency,
        selectedPeriod,
        setSelectedPeriod,
        selectedProductId,
        setSelectedProductId,
        isBalanceVisible,
        setIsBalanceVisible,
        isSandbox,
        setIsSandbox,
        products,
        metrics,
        utmData,
        currencyRevenue,
        campaigns,
        affiliates,
        marketplaceProducts,
        withdrawals,
        abandonedCarts,
        webhookLogs,
        toasts,
        addToast,
        removeToast,
        isLevelModalOpen,
        setIsLevelModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isNewProductModalOpen,
        setIsNewProductModalOpen,
        isSupportChatOpen,
        setIsSupportChatOpen,
        isCheckoutSimulatorOpen,
        setIsCheckoutSimulatorOpen,
        selectedProductForCheckout,
        setSelectedProductForCheckout,
        createProduct,
        toggleProductStatus,
        deleteProduct,
        requestWithdrawal,
        recoverCart,
        toggleAffiliateProduct,
        createCampaign,
        toggleCampaignStatus,
        dispatchTestWebhook,
        simulateOrderCheckout,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};
