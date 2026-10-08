import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plan, Subscriber, Invoice, DunningStep, WebhookEventLog, MetricSummary, SubscriptionStatus, PaymentMethodType } from '../types/billing';
import { INITIAL_PLANS, INITIAL_SUBSCRIBERS, INITIAL_INVOICES, INITIAL_DUNNING_STEPS, INITIAL_WEBHOOK_LOGS, INITIAL_METRICS } from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}

interface BillingContextType {
  plans: Plan[];
  subscribers: Subscriber[];
  invoices: Invoice[];
  dunningSteps: DunningStep[];
  webhookLogs: WebhookEventLog[];
  metrics: MetricSummary;
  isSandbox: boolean;
  setIsSandbox: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Modals & Drawers
  isNewSubscriberModalOpen: boolean;
  setIsNewSubscriberModalOpen: (val: boolean) => void;
  isNewPlanModalOpen: boolean;
  setIsNewPlanModalOpen: (val: boolean) => void;
  isCheckoutSimulatorOpen: boolean;
  setIsCheckoutSimulatorOpen: (val: boolean) => void;
  selectedPlanForCheckout: Plan | null;
  setSelectedPlanForCheckout: (plan: Plan | null) => void;
  selectedSubscriber: Subscriber | null;
  setSelectedSubscriber: (sub: Subscriber | null) => void;
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (inv: Invoice | null) => void;

  // Actions
  createPlan: (newPlan: Omit<Plan, 'id' | 'activeSubscribers' | 'mrrContribution' | 'status'>) => void;
  addSubscriber: (newSub: {
    name: string;
    email: string;
    phone: string;
    document: string;
    planId: string;
    paymentMethod: PaymentMethodType;
    cardLast4?: string;
    cardBrand?: 'mastercard' | 'visa' | 'elo' | 'amex';
  }) => void;
  updateSubscriberStatus: (subscriberId: string, status: SubscriptionStatus) => void;
  retryInvoicePayment: (invoiceId: string) => Promise<boolean>;
  refundInvoice: (invoiceId: string) => void;
  toggleDunningStep: (stepId: string) => void;
  dispatchTestWebhook: (eventType: WebhookEventLog['event']) => void;
  processCheckoutOrder: (order: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerDocument: string;
    planId: string;
    paymentMethod: PaymentMethodType;
    cardLast4?: string;
  }) => boolean;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [dunningSteps, setDunningSteps] = useState<DunningStep[]>(INITIAL_DUNNING_STEPS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookEventLog[]>(INITIAL_WEBHOOK_LOGS);
  const [metrics, setMetrics] = useState<MetricSummary>(INITIAL_METRICS);
  const [isSandbox, setIsSandbox] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals
  const [isNewSubscriberModalOpen, setIsNewSubscriberModalOpen] = useState(false);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [isCheckoutSimulatorOpen, setIsCheckoutSimulatorOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<Plan | null>(INITIAL_PLANS[1]);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const createPlan = (newPlanData: Omit<Plan, 'id' | 'activeSubscribers' | 'mrrContribution' | 'status'>) => {
    const newPlan: Plan = {
      ...newPlanData,
      id: `plan_${Date.now().toString(36)}`,
      activeSubscribers: 0,
      mrrContribution: 0,
      status: 'active',
    };
    setPlans((prev) => [newPlan, ...prev]);
    addToast({
      type: 'success',
      title: 'Plano Criado!',
      message: `O plano "${newPlan.name}" já está pronto para receber novas assinaturas recorrentes.`,
    });
  };

  const addSubscriber = (data: {
    name: string;
    email: string;
    phone: string;
    document: string;
    planId: string;
    paymentMethod: PaymentMethodType;
    cardLast4?: string;
    cardBrand?: 'mastercard' | 'visa' | 'elo' | 'amex';
  }) => {
    const plan = plans.find((p) => p.id === data.planId) || plans[0];
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextDate = nextMonth.toISOString().split('T')[0];

    const newSub: Subscriber = {
      id: `sub_${Date.now().toString(36)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      document: data.document,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      interval: plan.interval,
      status: plan.trialDays > 0 ? 'trialing' : 'active',
      paymentMethod: data.paymentMethod,
      cardLast4: data.cardLast4 || (data.paymentMethod === 'credit_card' ? '7721' : undefined),
      cardBrand: data.cardBrand || (data.paymentMethod === 'credit_card' ? 'visa' : undefined),
      pixKey: data.paymentMethod === 'pix_recurrent' ? data.email : undefined,
      startDate: today,
      nextBillingDate: nextDate,
      lastPaymentDate: today,
      dunningAttempts: 0,
      churnRisk: 'low',
      tags: ['Assinatura Manual', plan.name],
    };

    // Create Invoice
    const newInvoice: Invoice = {
      id: `inv_${Date.now().toString(36)}`,
      subscriberId: newSub.id,
      subscriberName: newSub.name,
      subscriberEmail: newSub.email,
      planName: plan.name,
      amount: plan.price,
      feeAmount: +(plan.price * 0.0299).toFixed(2),
      netAmount: +(plan.price * 0.9701).toFixed(2),
      status: plan.trialDays > 0 ? 'pending' : 'paid',
      paymentMethod: data.paymentMethod,
      dueDate: today,
      paidAt: plan.trialDays > 0 ? undefined : `${today} ${new Date().toLocaleTimeString('pt-BR')}`,
      attemptCount: 1,
      cardLast4: newSub.cardLast4,
    };

    setSubscribers((prev) => [newSub, ...prev]);
    setInvoices((prev) => [newInvoice, ...prev]);

    // Update plan subscriber count & MRR
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === plan.id) {
          const mrrIncrement = plan.interval === 'year' ? plan.price / 12 : plan.price;
          return {
            ...p,
            activeSubscribers: p.activeSubscribers + 1,
            mrrContribution: p.mrrContribution + mrrIncrement,
          };
        }
        return p;
      })
    );

    // Update global metrics
    const addedMRR = plan.interval === 'year' ? plan.price / 12 : plan.price;
    setMetrics((prev) => ({
      ...prev,
      mrr: prev.mrr + addedMRR,
      arr: (prev.mrr + addedMRR) * 12,
      activeSubscribers: prev.activeSubscribers + 1,
      volumeToday: prev.volumeToday + (plan.trialDays > 0 ? 0 : plan.price),
      volumeMonth: prev.volumeMonth + (plan.trialDays > 0 ? 0 : plan.price),
    }));

    // Trigger webhook log
    const webhookItem: WebhookEventLog = {
      id: `wh_${Date.now().toString(36)}`,
      event: 'subscription.created',
      timestamp: 'Agora mesmo',
      status: 'success',
      httpStatus: 200,
      endpoint: 'https://api.empresa.com.br/webhooks/takto',
      payload: {
        event: 'subscription.created',
        subscriber_id: newSub.id,
        plan: plan.slug,
        status: newSub.status,
        amount: newSub.amount,
      },
    };
    setWebhookLogs((prev) => [webhookItem, ...prev]);

    addToast({
      type: 'success',
      title: 'Assinante Ativado!',
      message: `${newSub.name} foi cadastrado no plano ${plan.name} com sucesso.`,
    });
  };

  const updateSubscriberStatus = (subscriberId: string, status: SubscriptionStatus) => {
    setSubscribers((prev) =>
      prev.map((s) => {
        if (s.id === subscriberId) {
          return { ...s, status };
        }
        return s;
      })
    );

    const sub = subscribers.find((s) => s.id === subscriberId);
    if (sub) {
      if (selectedSubscriber && selectedSubscriber.id === subscriberId) {
        setSelectedSubscriber({ ...selectedSubscriber, status });
      }

      const statusLabels: Record<SubscriptionStatus, string> = {
        active: 'Reativada',
        paused: 'Pausada temporariamente',
        canceled: 'Cancelada',
        past_due: 'Marcada em atraso',
        trialing: 'Em período de testes',
      };

      addToast({
        type: 'info',
        title: `Status atualizado: ${statusLabels[status]}`,
        message: `Assinatura de ${sub.name} agora está como ${status}.`,
      });

      if (status === 'canceled') {
        const wh: WebhookEventLog = {
          id: `wh_${Date.now().toString(36)}`,
          event: 'subscription.canceled',
          timestamp: 'Agora mesmo',
          status: 'success',
          httpStatus: 200,
          endpoint: 'https://api.empresa.com.br/webhooks/takto',
          payload: {
            event: 'subscription.canceled',
            subscriber_id: sub.id,
            reason: 'manual_admin_action',
          },
        };
        setWebhookLogs((prev) => [wh, ...prev]);
      }
    }
  };

  const retryInvoicePayment = async (invoiceId: string): Promise<boolean> => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return false;

    // Simulate smart dunning attempt
    addToast({
      type: 'info',
      title: 'Executando Smart Retry TAKTO...',
      message: `Roteando retentativa inteligente com adquirente secundário e tokenização criptográfica.`,
    });

    await new Promise((res) => setTimeout(res, 1200));

    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('pt-BR');

    setInvoices((prev) =>
      prev.map((item) => {
        if (item.id === invoiceId) {
          return {
            ...item,
            status: 'recovered',
            paidAt: `${today} ${nowTime}`,
            attemptCount: item.attemptCount + 1,
            failureReason: 'Cobrança recuperada automaticamente via Smart Dunning TAKTO',
          };
        }
        return item;
      })
    );

    // Update subscriber status to active if they were past_due
    setSubscribers((prev) =>
      prev.map((s) => {
        if (s.id === inv.subscriberId) {
          return {
            ...s,
            status: 'active',
            lastPaymentDate: today,
            churnRisk: 'low',
          };
        }
        return s;
      })
    );

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      volumeToday: prev.volumeToday + inv.amount,
      volumeMonth: prev.volumeMonth + inv.amount,
      recoveredAmountMonth: prev.recoveredAmountMonth + inv.amount,
      failedInvoicesCount: Math.max(0, prev.failedInvoicesCount - 1),
    }));

    // Webhook log
    const wh: WebhookEventLog = {
      id: `wh_${Date.now().toString(36)}`,
      event: 'invoice.recovered',
      timestamp: 'Agora mesmo',
      status: 'success',
      httpStatus: 200,
      endpoint: 'https://api.empresa.com.br/webhooks/takto',
      payload: {
        event: 'invoice.recovered',
        invoice_id: inv.id,
        amount: inv.amount,
        subscriber_name: inv.subscriberName,
        recovery_engine: 'smart_cascade_gateway',
      },
    };
    setWebhookLogs((prev) => [wh, ...prev]);

    addToast({
      type: 'success',
      title: 'Cobrança Recuperada com Sucesso! 🚀',
      message: `Fatura de R$ ${inv.amount.toFixed(2)} liquidada para ${inv.subscriberName}.`,
    });

    return true;
  };

  const refundInvoice = (invoiceId: string) => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return;

    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: 'refunded' } : i))
    );

    addToast({
      type: 'warning',
      title: 'Estorno Processado',
      message: `Valor de R$ ${inv.amount.toFixed(2)} estornado para o cliente ${inv.subscriberName}.`,
    });
  };

  const toggleDunningStep = (stepId: string) => {
    setDunningSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, active: !s.active } : s))
    );
    addToast({
      type: 'info',
      title: 'Régua de Recuperação Atualizada',
      message: 'Configurações de automação de dunning foram salvas com sucesso.',
    });
  };

  const dispatchTestWebhook = (eventType: WebhookEventLog['event']) => {
    const newLog: WebhookEventLog = {
      id: `wh_${Date.now().toString(36)}`,
      event: eventType,
      timestamp: 'Agora mesmo',
      status: 'success',
      httpStatus: 200,
      endpoint: 'https://api.empresa.com.br/webhooks/takto',
      payload: {
        event: eventType,
        environment: isSandbox ? 'sandbox' : 'live',
        timestamp: new Date().toISOString(),
        data: {
          test_mode: true,
          platform: 'TAKTO Subscriptions',
          ping: 'ok',
        },
      },
    };
    setWebhookLogs((prev) => [newLog, ...prev]);
    addToast({
      type: 'success',
      title: 'Webhook Disparado!',
      message: `Evento "${eventType}" enviado e recebido com status HTTP 200.`,
    });
  };

  const processCheckoutOrder = (order: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerDocument: string;
    planId: string;
    paymentMethod: PaymentMethodType;
    cardLast4?: string;
  }): boolean => {
    addSubscriber({
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      document: order.customerDocument,
      planId: order.planId,
      paymentMethod: order.paymentMethod,
      cardLast4: order.cardLast4 || (order.paymentMethod === 'credit_card' ? '5520' : undefined),
      cardBrand: 'mastercard',
    });
    return true;
  };

  return (
    <BillingContext.Provider
      value={{
        plans,
        subscribers,
        invoices,
        dunningSteps,
        webhookLogs,
        metrics,
        isSandbox,
        setIsSandbox,
        activeTab,
        setActiveTab,
        toasts,
        addToast,
        removeToast,
        isNewSubscriberModalOpen,
        setIsNewSubscriberModalOpen,
        isNewPlanModalOpen,
        setIsNewPlanModalOpen,
        isCheckoutSimulatorOpen,
        setIsCheckoutSimulatorOpen,
        selectedPlanForCheckout,
        setSelectedPlanForCheckout,
        selectedSubscriber,
        setSelectedSubscriber,
        selectedInvoice,
        setSelectedInvoice,
        createPlan,
        addSubscriber,
        updateSubscriberStatus,
        retryInvoicePayment,
        refundInvoice,
        toggleDunningStep,
        dispatchTestWebhook,
        processCheckoutOrder,
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
