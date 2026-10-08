import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency, formatDate, getIntervalBadge } from '../../utils/formatters';
import {
  X,
  CreditCard,
  QrCode,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Copy,
  Receipt,
  Sparkles,
} from 'lucide-react';

export const SubscriberDetailModal: React.FC = () => {
  const {
    selectedSubscriber,
    setSelectedSubscriber,
    invoices,
    updateSubscriberStatus,
    retryInvoicePayment,
    addToast,
  } = useBilling();

  if (!selectedSubscriber) return null;

  const subscriberInvoices = invoices.filter(
    (inv) => inv.subscriberId === selectedSubscriber.id
  );

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      `https://takto.pay/portal/${selectedSubscriber.id}/update-payment`
    );
    addToast({
      type: 'success',
      title: 'Link Copiado!',
      message: 'Link de autoatendimento para o cliente atualizar cartão enviado para a área de transferência.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0a100c] border border-[#1b3123] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#142319] flex items-center justify-between bg-[#070b09]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {selectedSubscriber.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {selectedSubscriber.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                <span>{selectedSubscriber.email}</span>
                <span>·</span>
                <span className="font-mono">{selectedSubscriber.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedSubscriber(null)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#121f17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status & Plan Card */}
          <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Status Atual</span>
              <p className="text-xs font-semibold text-emerald-400 mt-1 capitalize">
                {selectedSubscriber.status === 'active'
                  ? 'Ativo'
                  : selectedSubscriber.status === 'past_due'
                  ? 'Em Atraso'
                  : selectedSubscriber.status === 'paused'
                  ? 'Pausado'
                  : selectedSubscriber.status === 'trialing'
                  ? 'Trial'
                  : 'Cancelado'}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Plano Contratado</span>
              <p className="text-xs font-semibold text-white mt-1">
                {selectedSubscriber.planName}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Valor Recorrente</span>
              <p className="text-xs font-mono font-bold text-white mt-1">
                {formatCurrency(selectedSubscriber.amount)}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Próxima Cobrança</span>
              <p className="text-xs font-mono text-neutral-300 mt-1">
                {formatDate(selectedSubscriber.nextBillingDate)}
              </p>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#142319] flex items-center justify-center text-emerald-400">
                {selectedSubscriber.paymentMethod === 'pix_recurrent' ? (
                  <QrCode className="w-5 h-5" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  {selectedSubscriber.paymentMethod === 'pix_recurrent'
                    ? 'PIX Automático Recorrente'
                    : `Cartão ${selectedSubscriber.cardBrand?.toUpperCase()} final ${selectedSubscriber.cardLast4 || '4242'}`}
                </p>
                <p className="text-[11px] text-neutral-400">
                  Documento vinculado: <span className="font-mono">{selectedSubscriber.document}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Link Troca de Cartão</span>
            </button>
          </div>

          {/* Invoices History */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
              Histórico de Faturas do Assinante ({subscriberInvoices.length})
            </h3>
            <div className="rounded-xl border border-[#142319] bg-[#070b09] divide-y divide-[#142319] overflow-hidden text-xs">
              {subscriberInvoices.length === 0 ? (
                <div className="p-4 text-center text-neutral-500">
                  Nenhuma fatura registrada ainda.
                </div>
              ) : (
                subscriberInvoices.map((inv) => (
                  <div key={inv.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-neutral-300">
                          {formatCurrency(inv.amount)}
                        </span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-400">Vencimento {formatDate(inv.dueDate)}</span>
                      </div>
                      {inv.failureReason && (
                        <p className="text-[11px] text-amber-400/90 mt-0.5">
                          {inv.failureReason}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-mono ${
                          inv.status === 'paid'
                            ? 'text-emerald-400'
                            : inv.status === 'recovered'
                            ? 'text-emerald-300'
                            : 'text-amber-400'
                        }`}
                      >
                        {inv.status === 'paid'
                          ? 'Pago'
                          : inv.status === 'recovered'
                          ? 'Recuperado por IA'
                          : 'Em atraso'}
                      </span>

                      {inv.status === 'failed' && (
                        <button
                          onClick={() => retryInvoicePayment(inv.id)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Retentar</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Operational Actions */}
          <div className="pt-4 border-t border-[#142319]">
            <h3 className="text-xs font-semibold text-neutral-400 mb-3">
              Ações Administrativas na Assinatura
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {selectedSubscriber.status === 'active' ? (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'paused')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-[#0c140f] hover:bg-[#121f17] border border-[#1b3123] rounded-lg transition-colors cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pausar Assinatura (Férias)</span>
                </button>
              ) : selectedSubscriber.status === 'paused' ? (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'active')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-[#0c140f] hover:bg-[#121f17] border border-[#1b3123] rounded-lg transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reativar Assinatura</span>
                </button>
              ) : null}

              {selectedSubscriber.status !== 'canceled' && (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'canceled')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancelar Assinatura</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
