import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { REVENUE_CHART_DATA } from '../../data/mockData';
import {
  TrendingUp,
  Users,
  Repeat,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
  CreditCard,
  QrCode,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    metrics,
    invoices,
    subscribers,
    plans,
    retryInvoicePayment,
    setSelectedSubscriber,
    setSelectedInvoice,
    setIsNewPlanModalOpen,
    setIsNewSubscriberModalOpen,
    setIsCheckoutSimulatorOpen,
    setActiveTab,
  } = useBilling();

  const [chartMetric, setChartMetric] = useState<'mrr' | 'recovered' | 'subs'>('mrr');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const failedInvoices = invoices.filter((i) => i.status === 'failed' || i.status === 'pending');
  const recentInvoices = invoices.slice(0, 5);

  const handleQuickRetry = async (invoiceId: string) => {
    setRetryingId(invoiceId);
    await retryInvoicePayment(invoiceId);
    setRetryingId(null);
  };

  // Find max value for chart scaling
  const maxMrr = Math.max(...REVENUE_CHART_DATA.map((d) => d.mrr));
  const maxRecovered = Math.max(...REVENUE_CHART_DATA.map((d) => d.recovered));
  const maxSubs = Math.max(...REVENUE_CHART_DATA.map((d) => d.newSubs));

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header (Polaris title bar) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#202223]">
            Visão Geral de Faturamento Recorrente
          </h1>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Métricas de assinaturas em tempo real, fluxo de caixa previsível e automação de recuperação.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewPlanModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-[#202223] bg-white hover:bg-[#f6f6f7] border border-[#c9cccf] rounded-lg transition-colors cursor-pointer shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          >
            + Criar Novo Plano
          </button>
          <button
            onClick={() => setIsCheckoutSimulatorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Testar Checkout TAKTO</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Polaris White Cards, Spacing & Borders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: MRR */}
        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba] transition-all">
          <div className="flex items-center justify-between text-[#6d7175] text-xs">
            <span>MRR (Receita Recorrente)</span>
            <span className="text-[#008060] flex items-center font-semibold text-xs bg-[#e3f1df] px-1.5 py-0.5 rounded">
              +{metrics.mrrGrowth}% MoM
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#202223] font-mono tabular-nums">
              {formatCurrency(metrics.mrr)}
            </span>
          </div>
          <div className="mt-2 text-xs text-[#6d7175] flex items-center gap-1.5">
            <span>ARR projetado:</span>
            <span className="text-[#202223] font-semibold font-mono tabular-nums">
              {formatCurrency(metrics.arr)}
            </span>
          </div>
        </div>

        {/* Metric 2: Active Subscribers */}
        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba] transition-all">
          <div className="flex items-center justify-between text-[#6d7175] text-xs">
            <span>Assinantes Ativos</span>
            <span className="text-[#008060] flex items-center font-semibold text-xs bg-[#e3f1df] px-1.5 py-0.5 rounded">
              +{metrics.subscribersGrowth}%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#202223] font-mono tabular-nums">
              {formatNumber(metrics.activeSubscribers)}
            </span>
            <span className="text-xs text-[#6d7175]">membros</span>
          </div>
          <div className="mt-2 text-xs text-[#6d7175]">
            Distribuição em {plans.length} planos ativos
          </div>
        </div>

        {/* Metric 3: Smart Dunning Recovery */}
        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba] transition-all">
          <div className="flex items-center justify-between text-[#6d7175] text-xs">
            <span>Taxa de Recuperação (IA)</span>
            <span className="text-[#004c3f] bg-[#e3f1df] text-[10px] font-semibold px-1.5 py-0.5 rounded">
              Smart Dunning
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#008060] font-mono tabular-nums">
              {metrics.recoveryRate}%
            </span>
          </div>
          <div className="mt-2 text-xs text-[#6d7175] flex items-center gap-1.5">
            <span>Resgatado no mês:</span>
            <span className="text-[#202223] font-semibold font-mono tabular-nums">
              {formatCurrency(metrics.recoveredAmountMonth)}
            </span>
          </div>
        </div>

        {/* Metric 4: Net Churn Rate */}
        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba] transition-all">
          <div className="flex items-center justify-between text-[#6d7175] text-xs">
            <span>Net Churn Mensal</span>
            <span className="text-[#6d7175] text-[11px] font-medium">
              Saúde da Base
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#202223] font-mono tabular-nums">
              {metrics.netChurnRate}%
            </span>
            <span className="text-[11px] text-[#008060] font-medium">Top 5% mercado</span>
          </div>
          <div className="mt-2 text-xs text-[#6d7175]">
            Cancelamento voluntário sob controle
          </div>
        </div>
      </div>

      {/* Smart Alert Banner (Polaris Amber Banner) */}
      {failedInvoices.length > 0 && (
        <div className="p-4 rounded-xl bg-[#fff5ea] border border-[#fed3d1] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ffe8d6] border border-[#fed3d1] flex items-center justify-center text-[#b95000] shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#202223]">
                  {failedInvoices.length} cobranças em atraso prontas para reprocessamento
                </span>
                <span className="text-[#6d7175] text-xs">·</span>
                <span className="text-xs text-[#b95000] font-bold font-mono">
                  {formatCurrency(failedInvoices.reduce((acc, i) => acc + i.amount, 0))} a recuperar
                </span>
              </div>
              <p className="text-[11px] text-[#6d7175] mt-0.5">
                O motor inteligente do TAKTO pode executar retentativas em cascata com múltiplos adquirentes agora mesmo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleQuickRetry(failedInvoices[0].id)}
              disabled={retryingId !== null}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{retryingId ? 'Executando...' : 'Retentar Cobrança Crítica'}</span>
            </button>
            <button
              onClick={() => setActiveTab('dunning')}
              className="px-3 py-1.5 text-xs font-medium text-[#202223] hover:bg-[#f6f6f7] bg-white border border-[#c9cccf] rounded-lg transition-colors shadow-sm"
            >
              Ver Régua Completa
            </button>
          </div>
        </div>
      )}

      {/* Main Chart Section (Polaris Card Styling) */}
      <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-sm font-bold text-[#202223]">
              Crescimento Previsível de Receita Recorrente
            </h2>
            <p className="text-xs text-[#6d7175] mt-0.5">
              Histórico consolidado dos últimos 6 meses com impacto do Smart Dunning
            </p>
          </div>

          {/* Metric selector segmented buttons (Polaris style) */}
          <div className="flex items-center gap-1 p-1 bg-[#f1f2f4] border border-[#d2d5d8] rounded-lg">
            <button
              onClick={() => setChartMetric('mrr')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                chartMetric === 'mrr'
                  ? 'bg-white text-[#202223] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              MRR Total
            </button>
            <button
              onClick={() => setChartMetric('recovered')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                chartMetric === 'recovered'
                  ? 'bg-white text-[#202223] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Recuperado por IA
            </button>
            <button
              onClick={() => setChartMetric('subs')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                chartMetric === 'subs'
                  ? 'bg-white text-[#202223] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Novos Assinantes
            </button>
          </div>
        </div>

        {/* Visual Bar & Trend Chart */}
        <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 border-b border-[#e1e3e5] pb-4">
          {REVENUE_CHART_DATA.map((item, idx) => {
            let heightPercent = 20;
            let displayValue = '';

            if (chartMetric === 'mrr') {
              heightPercent = (item.mrr / maxMrr) * 100;
              displayValue = formatCurrency(item.mrr);
            } else if (chartMetric === 'recovered') {
              heightPercent = (item.recovered / maxRecovered) * 100;
              displayValue = formatCurrency(item.recovered);
            } else {
              heightPercent = (item.newSubs / maxSubs) * 100;
              displayValue = `+${item.newSubs}`;
            }

            const isCurrent = idx === REVENUE_CHART_DATA.length - 1;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#202223] text-white px-2.5 py-1 rounded-md text-[11px] font-mono z-10 whitespace-nowrap shadow-md">
                  {displayValue}
                </div>

                {/* Column bar */}
                <div className="w-full max-w-[52px] bg-[#f1f2f4] rounded-t-lg overflow-hidden flex flex-col justify-end p-0.5">
                  <div
                    style={{ height: `${Math.max(15, heightPercent)}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      isCurrent
                        ? 'bg-[#008060] shadow-sm'
                        : 'bg-[#b4b7ba] group-hover:bg-[#aee9d1]'
                    }`}
                  />
                </div>

                {/* X Axis Label */}
                <span
                  className={`mt-3 text-[11px] ${
                    isCurrent ? 'text-[#008060] font-bold' : 'text-[#6d7175]'
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend / Metrics summary footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#6d7175] gap-4 pt-1">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#008060]" />
              <span className="text-[#202223] font-medium">Mês Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#b4b7ba]" />
              <span>Meses Anteriores</span>
            </div>
          </div>
          <div className="text-[11px] text-[#8c9196]">
            Atualizado a cada 60 segundos com sincronização webhook ativa
          </div>
        </div>
      </div>

      {/* Split Section: Métodos de Pagamento & Faturas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods breakdown */}
        <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#202223]">Métodos de Cobrança</h3>
            <span className="text-[11px] text-[#6d7175]">Eficiência</span>
          </div>

          <div className="space-y-3">
            {/* PIX Recorrente */}
            <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#e3f1df] flex items-center justify-center text-[#008060]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#202223]">PIX Automático Recorrente</span>
                    <p className="text-[10px] text-[#6d7175]">Sem limite de cartão necessário</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#008060]">54%</span>
              </div>
              <div className="mt-2.5 w-full bg-[#e1e3e5] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#008060] h-full w-[54%]" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#6d7175]">
                <span>Aprovação: 99.4%</span>
                <span className="text-[#008060] font-medium">Custo: 0.99%</span>
              </div>
            </div>

            {/* Cartão de Crédito Recorrente */}
            <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#e3f1df] flex items-center justify-center text-[#008060]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#202223]">Cartão de Crédito</span>
                    <p className="text-[10px] text-[#6d7175]">Tokenizado com retentativa</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#202223]">42%</span>
              </div>
              <div className="mt-2.5 w-full bg-[#e1e3e5] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#008060]/70 h-full w-[42%]" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#6d7175]">
                <span>Aprovação: 89.2%</span>
                <span>Taxa média: 2.99%</span>
              </div>
            </div>

            {/* Boleto Recorrente */}
            <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#f1f2f4] flex items-center justify-center text-[#6d7175]">
                    <Repeat className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#202223]">Boleto Bancário</span>
                    <p className="text-[10px] text-[#6d7175]">Compensação D+1 com WhatsApp</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#6d7175]">4%</span>
              </div>
              <div className="mt-2.5 w-full bg-[#e1e3e5] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#6d7175] h-full w-[4%]" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#6d7175]">
                <span>Aprovação: 72.0%</span>
                <span>Custo fixo: R$ 1,90</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices & Transactions */}
        <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#202223]">Últimas Transações Recorrentes</h3>
                <p className="text-xs text-[#6d7175]">Faturamento processado em tempo real</p>
              </div>
              <button
                onClick={() => setActiveTab('invoices')}
                className="text-xs text-[#008060] hover:text-[#006e52] flex items-center gap-1 font-semibold cursor-pointer"
              >
                Ver todas ({invoices.length})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#f1f2f4]">
              {recentInvoices.map((inv) => {
                const isPaid = inv.status === 'paid' || inv.status === 'recovered';
                const isFailed = inv.status === 'failed';
                const isRecovered = inv.status === 'recovered';

                return (
                  <div
                    key={inv.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-[#f9fafb] px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-xs ${
                          isRecovered
                            ? 'bg-[#e3f1df] text-[#004c3f]'
                            : isPaid
                            ? 'bg-[#e3f1df] text-[#008060]'
                            : isFailed
                            ? 'bg-[#fed3d1] text-[#d72c0d]'
                            : 'bg-[#fff5ea] text-[#b95000]'
                        }`}
                      >
                        {isRecovered ? (
                          <Sparkles className="w-3.5 h-3.5" />
                        ) : isPaid ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#202223]">
                            {inv.subscriberName}
                          </span>
                          <span className="text-[#8c9196] text-[10px]">·</span>
                          <span className="text-[11px] text-[#6d7175]">{inv.planName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[#8c9196] mt-0.5">
                          <span>{inv.paymentMethod === 'pix_recurrent' ? 'PIX Recorrente' : 'Cartão de Crédito'}</span>
                          <span>·</span>
                          <span>Vencimento: {formatDate(inv.dueDate)}</span>
                          {isRecovered && (
                            <span className="text-[#008060] font-semibold">· Recuperado por IA</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#202223] font-mono tabular-nums">
                        {formatCurrency(inv.amount)}
                      </div>
                      <div className="mt-0.5">
                        {isFailed ? (
                          <button
                            onClick={() => handleQuickRetry(inv.id)}
                            disabled={retryingId === inv.id}
                            className="text-[11px] text-[#008060] hover:text-[#006e52] font-semibold underline cursor-pointer"
                          >
                            {retryingId === inv.id ? 'Recuperando...' : 'Retentar agora'}
                          </button>
                        ) : (
                          <span
                            className={`text-[10px] font-medium ${
                              isPaid ? 'text-[#008060]' : 'text-[#6d7175]'
                            }`}
                          >
                            {inv.status === 'paid'
                              ? 'Liquidada'
                              : inv.status === 'recovered'
                              ? 'Recuperada'
                              : 'Pendente'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#f1f2f4] flex items-center justify-between text-xs text-[#8c9196]">
            <span>Taxa média de liquidação: 98.6%</span>
            <span className="text-[#008060] font-medium">Proteção antifraude ativa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
