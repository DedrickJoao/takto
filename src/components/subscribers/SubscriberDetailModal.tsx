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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-[#e1e3e5] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Polaris modal title) */}
        <div className="p-5 border-b border-[#e1e3e5] flex items-center justify-between bg-[#f7f7f8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e3f1df] border border-[#aee9d1] flex items-center justify-center text-[#004c3f] font-bold text-xs">
              {selectedSubscriber.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#202223]">
                {selectedSubscriber.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#6d7175] mt-0.5">
                <span>{selectedSubscriber.email}</span>
                <span>·</span>
                <span className="font-mono">{selectedSubscriber.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedSubscriber(null)}
            className="p-1.5 text-[#6d7175] hover:text-[#202223] rounded-lg hover:bg-[#edeeef] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status & Plan Card */}
          <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e1e3e5] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] text-[#6d7175] uppercase font-semibold tracking-wider">Status Atual</span>
              <p className="text-xs font-semibold text-[#008060] mt-1 capitalize">
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
              <span className="text-[10px] text-[#6d7175] uppercase font-semibold tracking-wider">Plano Contratado</span>
              <p className="text-xs font-semibold text-[#202223] mt-1">
                {selectedSubscriber.planName}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[#6d7175] uppercase font-semibold tracking-wider">Valor Recorrente</span>
              <p className="text-xs font-mono font-bold text-[#202223] mt-1">
                {formatCurrency(selectedSubscriber.amount)}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[#6d7175] uppercase font-semibold tracking-wider">Próxima Cobrança</span>
              <p className="text-xs font-mono text-[#4a4d50] mt-1">
                {formatDate(selectedSubscriber.nextBillingDate)}
              </p>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e1e3e5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#e3f1df] flex items-center justify-center text-[#008060]">
                {selectedSubscriber.paymentMethod === 'pix_recurrent' ? (
                  <QrCode className="w-5 h-5" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#202223]">
                  {selectedSubscriber.paymentMethod === 'pix_recurrent'
                    ? 'PIX Automático Recorrente'
                    : `Cartão ${selectedSubscriber.cardBrand?.toUpperCase()} final ${selectedSubscriber.cardLast4 || '4242'}`}
                </p>
                <p className="text-[11px] text-[#6d7175]">
                  Documento vinculado: <span className="font-mono">{selectedSubscriber.document}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#202223] bg-white hover:bg-[#f6f6f7] border border-[#c9cccf] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Link Troca de Cartão</span>
            </button>
          </div>

          {/* Invoices History */}
          <div>
            <h3 className="text-xs font-bold text-[#202223] uppercase tracking-wider mb-2.5">
              Histórico de Faturas do Assinante ({subscriberInvoices.length})
            </h3>
            <div className="rounded-xl border border-[#e1e3e5] bg-white divide-y divide-[#f1f2f4] overflow-hidden text-xs">
              {subscriberInvoices.length === 0 ? (
                <div className="p-4 text-center text-[#8c9196]">
                  Nenhuma fatura registrada ainda.
                </div>
              ) : (
                subscriberInvoices.map((inv) => (
                  <div key={inv.id} className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#202223]">
                          {formatCurrency(inv.amount)}
                        </span>
                        <span className="text-[#c9cccf]">·</span>
                        <span className="text-[#6d7175]">Vencimento {formatDate(inv.dueDate)}</span>
                      </div>
                      {inv.failureReason && (
                        <p className="text-[11px] text-[#b95000] mt-0.5">
                          {inv.failureReason}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-semibold ${
                          inv.status === 'paid'
                            ? 'text-[#008060]'
                            : inv.status === 'recovered'
                            ? 'text-[#004c3f]'
                            : 'text-[#b95000]'
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
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] rounded transition-colors"
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
          <div className="pt-4 border-t border-[#e1e3e5]">
            <h3 className="text-xs font-bold text-[#202223] mb-3">
              Ações Administrativas na Assinatura
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {selectedSubscriber.status === 'active' ? (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'paused')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#b95000] bg-white hover:bg-[#fff5ea] border border-[#fed3d1] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Pause className="w-3.5 h-3.5 text-[#b95000]" />
                  <span>Pausar Assinatura (Férias)</span>
                </button>
              ) : selectedSubscriber.status === 'paused' ? (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'active')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#008060] bg-white hover:bg-[#e3f1df] border border-[#aee9d1] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 text-[#008060]" />
                  <span>Reativar Assinatura</span>
                </button>
              ) : null}

              {selectedSubscriber.status !== 'canceled' && (
                <button
                  onClick={() => updateSubscriberStatus(selectedSubscriber.id, 'canceled')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#d72c0d] bg-white hover:bg-[#fed3d1] border border-[#fed3d1] rounded-lg transition-colors cursor-pointer shadow-sm"
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
