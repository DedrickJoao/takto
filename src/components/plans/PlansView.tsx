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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#142319] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Planos Recorrentes & Precificação
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Configure ciclos de cobrança, períodos de trial grátis e links de checkout transparente.
          </p>
        </div>

        <button
          onClick={() => setIsNewPlanModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-emerald-950"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Criar Novo Plano Recorrente</span>
        </button>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isAnnual = plan.interval === 'year';

          return (
            <div
              key={plan.id}
              className="p-6 rounded-2xl bg-[#0a100c] border border-[#16271c] hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider font-semibold">
                      Ciclo {getIntervalBadge(plan.interval)}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                      {plan.name}
                    </h3>
                  </div>
                  {plan.recommendedBadge && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded">
                      {plan.recommendedBadge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 min-h-[36px] line-clamp-2">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-5 py-3 border-y border-[#142319] flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold font-mono text-white tabular-nums">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">
                      /{getIntervalLabel(plan.interval)}
                    </span>
                  </div>
                  {plan.trialDays > 0 ? (
                    <span className="text-[11px] text-sky-400 font-mono">
                      {plan.trialDays} dias trial grátis
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Cobrança imediata
                    </span>
                  )}
                </div>

                {/* Performance stats for this plan */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#060907] border border-[#142319]">
                    <span className="text-[10px] text-neutral-500 block">Assinantes</span>
                    <span className="text-sm font-bold text-neutral-200 font-mono tabular-nums">
                      {plan.activeSubscribers}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#060907] border border-[#142319]">
                    <span className="text-[10px] text-neutral-500 block">MRR Gerado</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      {formatCurrency(plan.mrrContribution)}
                    </span>
                  </div>
                </div>

                {/* Features included */}
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                    Incluso na Assinatura:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#142319] flex items-center gap-2">
                <button
                  onClick={() => handleOpenCheckoutForPlan(plan)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Testar Checkout</span>
                </button>

                <button
                  onClick={() => handleCopyCheckoutLink(plan)}
                  className="p-2 text-neutral-400 hover:text-white bg-[#060907] border border-[#16271c] rounded-lg transition-colors cursor-pointer"
                  title="Copiar Link de Pagamento Recorrente"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture feature callout */}
      <div className="p-6 rounded-2xl bg-[#0c140f] border border-emerald-900/40 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">PIX Automático Sem Fricção</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              O assinante autoriza uma única vez no app do banco e todas as cobranças subsequentes debitam sem intervenção manual.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Cobrança Não-Comprometida</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              Planos anuais podem debitar mensalmente sem travar o limite total do cartão de crédito do cliente, elevando a conversão em até +38%.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Atualização Automática de Cartão</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              Integração direta com as bandeiras Mastercard e Visa para atualizar automaticamente cartões reemitidos ou expirados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
