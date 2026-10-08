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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0a100c] border border-[#1b3123] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#142319] flex items-center justify-between bg-[#070b09]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              TK
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Comprovante de Cobrança Recorrente</h2>
              <p className="text-[11px] font-mono text-neutral-500">{selectedInvoice.id}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedInvoice(null)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#121f17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs">
          {/* Main receipt card */}
          <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c] space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#142319]">
              <span className="text-neutral-400">Status da Transação</span>
              <span className="font-mono font-bold text-emerald-400 capitalize">
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
              <span className="text-neutral-400">Assinante</span>
              <span className="text-white font-medium">{selectedInvoice.subscriberName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Email</span>
              <span className="text-neutral-300 font-mono">{selectedInvoice.subscriberEmail}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Plano Contratado</span>
              <span className="text-white font-medium">{selectedInvoice.planName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Método de Débito</span>
              <span className="text-neutral-300">
                {selectedInvoice.paymentMethod === 'pix_recurrent'
                  ? 'PIX Automático'
                  : `Cartão de Crédito •••• ${selectedInvoice.cardLast4 || '4242'}`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Data de Vencimento</span>
              <span className="text-neutral-300 font-mono">{formatDate(selectedInvoice.dueDate)}</span>
            </div>

            {selectedInvoice.paidAt && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Liquidação Confirmada</span>
                <span className="text-emerald-400 font-mono">{selectedInvoice.paidAt}</span>
              </div>
            )}
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-[#070b09] border border-[#142319] space-y-2 font-mono">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Valor Bruto Cobrado:</span>
              <span className="text-white font-bold">{formatCurrency(selectedInvoice.amount)}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>Taxa de Processamento TAKTO:</span>
              <span>- {formatCurrency(selectedInvoice.feeAmount)}</span>
            </div>
            <div className="pt-2 border-t border-[#142319] flex items-center justify-between text-emerald-400 font-bold">
              <span>Valor Líquido a Receber:</span>
              <span>{formatCurrency(selectedInvoice.netAmount)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1.5 px-3 py-2 text-neutral-300 bg-[#0c140f] hover:bg-[#121f17] border border-[#1b3123] rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar ID</span>
            </button>

            {selectedInvoice.status !== 'refunded' && (
              <button
                onClick={() => refundInvoice(selectedInvoice.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 rounded-lg transition-colors cursor-pointer"
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
