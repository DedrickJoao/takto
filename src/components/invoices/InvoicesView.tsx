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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#142319] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Cobranças & Faturas Recorrentes
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Registro unificado de liquidações, tentativas de débito e conciliação bancária automática.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>Total processado:</span>
          <span className="font-mono font-bold text-white text-sm">
            {formatCurrency(invoices.reduce((a, b) => a + (b.status === 'paid' || b.status === 'recovered' ? b.amount : 0), 0))}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#0a100c] border border-[#142319] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ID da fatura, cliente ou email..."
            className="w-full pl-9 pr-4 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#060907] border border-[#16271c] rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'paid'
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Liquidadas
            </button>
            <button
              onClick={() => setStatusFilter('recovered')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'recovered'
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Recuperadas IA
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'failed'
                  ? 'bg-rose-500/20 text-rose-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Com Falha
            </button>
          </div>

          {/* Payment Method selector */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#060907] border border-[#16271c] rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">Todos os Métodos</option>
            <option value="pix_recurrent">PIX Automático</option>
            <option value="credit_card">Cartão de Crédito</option>
          </select>
        </div>
      </div>

      {/* Invoices Data Grid */}
      <div className="rounded-xl bg-[#0a100c] border border-[#142319] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c140f] border-b border-[#142319] text-neutral-400 font-medium">
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
            <tbody className="divide-y divide-[#142319]">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    Nenhuma fatura encontrada.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isPaid = inv.status === 'paid' || inv.status === 'recovered';
                  const isRecovered = inv.status === 'recovered';
                  const isFailed = inv.status === 'failed';
                  const isPending = inv.status === 'pending';

                  return (
                    <tr
                      key={inv.id}
                      className="hover:bg-[#0e1711] transition-colors cursor-pointer group"
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      {/* ID and Due Date */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-medium text-white group-hover:text-emerald-300 transition-colors">
                          {inv.id}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          {formatDate(inv.dueDate)}
                        </div>
                      </td>

                      {/* Subscriber Name & Email */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-neutral-200">
                          {inv.subscriberName}
                        </div>
                        <div className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                          {inv.subscriberEmail}
                        </div>
                      </td>

                      {/* Plan Name */}
                      <td className="py-3 px-4 text-neutral-300">
                        {inv.planName}
                      </td>

                      {/* Amount & Net Amount */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-mono font-bold text-white tabular-nums">
                          {formatCurrency(inv.amount)}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono tabular-nums">
                          Líq: {formatCurrency(inv.netAmount)}
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          {inv.paymentMethod === 'pix_recurrent' ? (
                            <>
                              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-[11px]">PIX</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                              <span className="text-[11px]">Cartão (•••• {inv.cardLast4 || '4242'})</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div>
                          <span
                            className={`font-semibold font-mono text-[11px] ${
                              isRecovered
                                ? 'text-emerald-300'
                                : isPaid
                                ? 'text-emerald-400'
                                : isFailed
                                ? 'text-rose-400'
                                : 'text-amber-400'
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
                            <p className="text-[10px] text-neutral-500 truncate max-w-[200px] mt-0.5">
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
                              className="px-2.5 py-1 text-[11px] font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              {retryingId === inv.id ? 'Retentando...' : 'Retentar'}
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 text-neutral-400 hover:text-white bg-[#060907] border border-[#16271c] rounded transition-colors"
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

        <div className="py-3 px-4 bg-[#080d0a] border-t border-[#142319] flex items-center justify-between text-xs text-neutral-500">
          <span>{filteredInvoices.length} faturas listadas</span>
          <span>Liquidação automática em D+0 para PIX e D+14 para Cartão</span>
        </div>
      </div>
    </div>
  );
};
