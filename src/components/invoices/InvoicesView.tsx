import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Invoice } from '../../types/billing';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
  Receipt,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  CreditCard,
  QrCode,
  Sparkles,
  RotateCcw,
  Eye,
  Download,
  CheckCircle2,
} from 'lucide-react';

export const InvoicesView: React.FC = () => {
  const {
    invoices,
    retryInvoicePayment,
    refundInvoice,
    setSelectedInvoice,
  } = useBilling();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.subscriberName.toLowerCase().includes(search.toLowerCase()) ||
      inv.subscriberEmail.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || inv.paymentMethod === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleRetry = async (invoiceId: string) => {
    setRetryingId(invoiceId);
    await retryInvoicePayment(invoiceId);
    setRetryingId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#202223]">
            Cobranças & Faturas Recorrentes
          </h1>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Registro unificado de liquidações, tentativas de débito e conciliação bancária automática.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#6d7175]">
          <span>Total processado:</span>
          <span className="font-mono font-bold text-[#202223] text-sm">
            {formatCurrency(invoices.reduce((a, b) => a + (b.status === 'paid' || b.status === 'recovered' ? b.amount : 0), 0))}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c9196]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ID da fatura, cliente ou email..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] placeholder-[#8c9196] focus:outline-none focus:border-[#008060]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status buttons */}
          <div className="flex items-center gap-0.5 p-1 bg-[#f1f2f4] border border-[#d2d5d8] rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-[#202223] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'paid'
                  ? 'bg-white text-[#008060] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Liquidadas
            </button>
            <button
              onClick={() => setStatusFilter('recovered')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'recovered'
                  ? 'bg-white text-[#004c3f] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Recuperadas IA
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'failed'
                  ? 'bg-white text-[#d72c0d] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Com Falha
            </button>
          </div>

          {/* Payment Method selector */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] focus:outline-none focus:border-[#008060]"
          >
            <option value="all">Todos os Métodos</option>
            <option value="pix_recurrent">PIX Automático</option>
            <option value="credit_card">Cartão de Crédito</option>
          </select>
        </div>
      </div>

      {/* Invoices Data Grid */}
      <div className="rounded-xl bg-white border border-[#e1e3e5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f7f7f8] border-b border-[#e1e3e5] text-[#6d7175] font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Fatura ID / Data</th>
                <th className="py-3 px-4">Assinante</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4 text-right">Valor / Líquido</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f2f4]">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8c9196]">
                    Nenhuma fatura encontrada.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isPaid = inv.status === 'paid' || inv.status === 'recovered';
                  const isRecovered = inv.status === 'recovered';
                  const isFailed = inv.status === 'failed';

                  return (
                    <tr
                      key={inv.id}
                      className="hover:bg-[#f9fafb] transition-colors cursor-pointer group"
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      {/* ID and Due Date */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-semibold text-[#202223] group-hover:text-[#008060] transition-colors">
                          {inv.id}
                        </div>
                        <div className="text-[11px] text-[#8c9196] font-mono mt-0.5">
                          {formatDate(inv.dueDate)}
                        </div>
                      </td>

                      {/* Subscriber Name & Email */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#202223]">
                          {inv.subscriberName}
                        </div>
                        <div className="text-[11px] text-[#6d7175] truncate max-w-[180px]">
                          {inv.subscriberEmail}
                        </div>
                      </td>

                      {/* Plan Name */}
                      <td className="py-3 px-4 text-[#4a4d50]">
                        {inv.planName}
                      </td>

                      {/* Amount & Net Amount */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-mono font-bold text-[#202223] tabular-nums">
                          {formatCurrency(inv.amount)}
                        </div>
                        <div className="text-[10px] text-[#8c9196] font-mono tabular-nums">
                          Líq: {formatCurrency(inv.netAmount)}
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[#4a4d50]">
                          {inv.paymentMethod === 'pix_recurrent' ? (
                            <>
                              <QrCode className="w-3.5 h-3.5 text-[#008060]" />
                              <span className="text-[11px]">PIX</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5 text-[#6d7175]" />
                              <span className="text-[11px]">Cartão (•••• {inv.cardLast4 || '4242'})</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isRecovered
                                ? 'bg-[#e3f1df] text-[#004c3f]'
                                : isPaid
                                ? 'bg-[#e3f1df] text-[#008060]'
                                : isFailed
                                ? 'bg-[#fed3d1] text-[#d72c0d]'
                                : 'bg-[#fff5ea] text-[#b95000]'
                            }`}
                          >
                            {isRecovered
                              ? 'Recuperada por IA'
                              : isPaid
                              ? 'Liquidada'
                              : isFailed
                              ? 'Falha no débito'
                              : 'Pendente'}
                          </span>
                          {inv.failureReason && (
                            <p className="text-[10px] text-[#b95000] truncate max-w-[200px] mt-0.5">
                              {inv.failureReason}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {isFailed && (
                            <button
                              onClick={() => handleRetry(inv.id)}
                              disabled={retryingId === inv.id}
                              className="px-2.5 py-1 text-[11px] font-medium text-white bg-[#008060] hover:bg-[#006e52] rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                            >
                              {retryingId === inv.id ? 'Retentando...' : 'Retentar'}
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 text-[#6d7175] hover:text-[#202223] bg-white border border-[#c9cccf] rounded-lg transition-colors shadow-sm cursor-pointer"
                            title="Ver Detalhes e Comprovante"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="py-3 px-4 bg-[#f7f7f8] border-t border-[#e1e3e5] flex items-center justify-between text-xs text-[#6d7175]">
          <span>{filteredInvoices.length} faturas listadas</span>
          <span>Liquidação automática em D+0 para PIX e D+14 para Cartão</span>
        </div>
      </div>
    </div>
  );
};
