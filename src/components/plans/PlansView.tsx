import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { Plan } from '../../types/billing';
import { formatCurrency, getIntervalBadge, getIntervalLabel } from '../../utils/formatters';
import {
  Layers,
  Plus,
  Users,
  TrendingUp,
  Link2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
} from 'lucide-react';

export const PlansView: React.FC = () => {
  const {
    plans,
    setIsNewPlanModalOpen,
    setSelectedPlanForCheckout,
    setIsCheckoutSimulatorOpen,
    addToast,
  } = useBilling();

  const handleOpenCheckoutForPlan = (plan: Plan) => {
    setSelectedPlanForCheckout(plan);
    setIsCheckoutSimulatorOpen(true);
  };

  const handleCopyCheckoutLink = (plan: Plan) => {
    navigator.clipboard?.writeText(`https://takto.pay/checkout/${plan.slug}`);
    addToast({
      type: 'success',
      title: 'Link de Checkout Copiado!',
      message: `Link direto para o plano "${plan.name}" pronto para compartilhar em campanhas ou landing pages.`,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#202223]">
            Planos Recorrentes & Precificação
          </h1>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Configure ciclos de cobrança, períodos de trial grátis e links de checkout transparente.
          </p>
        </div>

        <button
          onClick={() => setIsNewPlanModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Criar Novo Plano</span>
        </button>
      </div>

      {/* Grid of Plans (Polaris Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((plan) => {
          return (
            <div
              key={plan.id}
              className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] text-[#008060] uppercase tracking-wider font-semibold">
                      Ciclo {getIntervalBadge(plan.interval)}
                    </span>
                    <h3 className="text-sm font-bold text-[#202223] mt-0.5">
                      {plan.name}
                    </h3>
                  </div>
                  {plan.recommendedBadge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-[#004c3f] bg-[#e3f1df] rounded">
                      {plan.recommendedBadge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6d7175] min-h-[36px] line-clamp-2">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 py-3 border-y border-[#f1f2f4] flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#202223] tabular-nums">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-xs text-[#8c9196] ml-1">
                      /{getIntervalLabel(plan.interval)}
                    </span>
                  </div>
                  {plan.trialDays > 0 ? (
                    <span className="text-[11px] text-[#005bd3] font-medium">
                      {plan.trialDays} dias trial grátis
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#8c9196]">
                      Cobrança imediata
                    </span>
                  )}
                </div>

                {/* Performance stats for this plan */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5]">
                    <span className="text-[10px] text-[#6d7175] block">Assinantes</span>
                    <span className="text-sm font-bold text-[#202223] font-mono tabular-nums">
                      {plan.activeSubscribers}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5]">
                    <span className="text-[10px] text-[#6d7175] block">MRR Gerado</span>
                    <span className="text-sm font-bold text-[#008060] font-mono tabular-nums">
                      {formatCurrency(plan.mrrContribution)}
                    </span>
                  </div>
                </div>

                {/* Features included */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#6d7175] font-semibold block">
                    Incluso na Assinatura:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4a4d50]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008060] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-[#f1f2f4] flex items-center gap-2">
                <button
                  onClick={() => handleOpenCheckoutForPlan(plan)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Testar Checkout</span>
                </button>

                <button
                  onClick={() => handleCopyCheckoutLink(plan)}
                  className="p-1.5 text-[#6d7175] hover:text-[#202223] bg-white border border-[#c9cccf] rounded-lg transition-colors cursor-pointer shadow-sm"
                  title="Copiar Link de Pagamento Recorrente"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture feature callout (Polaris Surface) */}
      <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e3f1df] flex items-center justify-center text-[#008060] shrink-0">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202223]">PIX Automático Sem Fricção</h4>
            <p className="text-[11px] text-[#6d7175] mt-1 leading-relaxed">
              O assinante autoriza uma única vez no app do banco e todas as cobranças subsequentes debitam sem intervenção manual.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e3f1df] flex items-center justify-center text-[#008060] shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202223]">Cobrança Não-Comprometida</h4>
            <p className="text-[11px] text-[#6d7175] mt-1 leading-relaxed">
              Planos anuais podem debitar mensalmente sem travar o limite total do cartão de crédito do cliente, elevando a conversão em até +38%.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e3f1df] flex items-center justify-center text-[#008060] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#202223]">Atualização Automática de Cartão</h4>
            <p className="text-[11px] text-[#6d7175] mt-1 leading-relaxed">
              Integração direta com as bandeiras Mastercard e Visa para atualizar automaticamente cartões reemitidos ou expirados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
