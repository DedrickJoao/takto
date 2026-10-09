import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { X, CheckCircle2, RotateCcw, Download, Copy, Printer, ShieldCheck } from 'lucide-react';

export const InvoiceDetailModal: React.FC = () => {
  const { selectedInvoice, setSelectedInvoice, refundInvoice, addToast } = useBilling();

  if (!selectedInvoice) return null;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(selectedInvoice.id);
    addToast({
      type: 'success',
      title: 'ID Copiado',
      message: `ID da fatura ${selectedInvoice.id} copiado.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-[#e1e3e5] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#e1e3e5] flex items-center justify-between bg-[#f7f7f8]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#e3f1df] border border-[#aee9d1] flex items-center justify-center text-[#004c3f] font-bold text-xs">
              TK
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#202223]">Comprovante de Cobrança Recorrente</h2>
              <p className="text-[11px] font-mono text-[#6d7175]">{selectedInvoice.id}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedInvoice(null)}
            className="p-1.5 text-[#6d7175] hover:text-[#202223] rounded-lg hover:bg-[#edeeef] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Main receipt card */}
          <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e1e3e5] space-y-2.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#e1e3e5]">
              <span className="text-[#6d7175]">Status da Transação</span>
              <span className="font-semibold text-[#008060] capitalize">
                {selectedInvoice.status === 'paid'
                  ? 'Liquidada com Sucesso'
                  : selectedInvoice.status === 'recovered'
                  ? 'Recuperada por Smart Dunning'
                  : selectedInvoice.status === 'refunded'
                  ? 'Estornada / Devolvida'
                  : selectedInvoice.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d7175]">Assinante</span>
              <span className="text-[#202223] font-semibold">{selectedInvoice.subscriberName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d7175]">Email</span>
              <span className="text-[#4a4d50] font-mono">{selectedInvoice.subscriberEmail}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d7175]">Plano Contratado</span>
              <span className="text-[#202223] font-medium">{selectedInvoice.planName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d7175]">Método de Débito</span>
              <span className="text-[#4a4d50]">
                {selectedInvoice.paymentMethod === 'pix_recurrent'
                  ? 'PIX Automático'
                  : `Cartão de Crédito •••• ${selectedInvoice.cardLast4 || '4242'}`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d7175]">Data de Vencimento</span>
              <span className="text-[#4a4d50] font-mono">{formatDate(selectedInvoice.dueDate)}</span>
            </div>

            {selectedInvoice.paidAt && (
              <div className="flex items-center justify-between">
                <span className="text-[#6d7175]">Liquidação Confirmada</span>
                <span className="text-[#008060] font-mono font-medium">{selectedInvoice.paidAt}</span>
              </div>
            )}
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] space-y-2 font-mono">
            <div className="flex items-center justify-between text-[#6d7175]">
              <span>Valor Bruto Cobrado:</span>
              <span className="text-[#202223] font-bold">{formatCurrency(selectedInvoice.amount)}</span>
            </div>
            <div className="flex items-center justify-between text-[#8c9196] text-[11px]">
              <span>Taxa de Processamento TAKTO:</span>
              <span>- {formatCurrency(selectedInvoice.feeAmount)}</span>
            </div>
            <div className="pt-2 border-t border-[#f1f2f4] flex items-center justify-between text-[#008060] font-bold">
              <span>Valor Líquido a Receber:</span>
              <span>{formatCurrency(selectedInvoice.netAmount)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[#202223] bg-white hover:bg-[#f6f6f7] border border-[#c9cccf] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Copy className="w-3.5 h-3.5 text-[#6d7175]" />
              <span>Copiar ID</span>
            </button>

            {selectedInvoice.status !== 'refunded' && (
              <button
                onClick={() => refundInvoice(selectedInvoice.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[#d72c0d] bg-white hover:bg-[#fed3d1] border border-[#fed3d1] rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Emitir Reembolso</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
