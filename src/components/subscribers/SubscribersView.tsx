import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Subscriber, SubscriptionStatus } from '../../types/billing';
import { formatCurrency, formatDate, getIntervalBadge } from '../../utils/formatters';
import {
  Search,
  UserPlus,
  CreditCard,
  QrCode,
  AlertCircle,
  CheckCircle2,
  Clock,
  PauseCircle,
  XCircle,
  MoreVertical,
  ExternalLink,
  ShieldAlert,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const SubscribersView: React.FC = () => {
  const {
    subscribers,
    plans,
    setSelectedSubscriber,
    setIsNewSubscriberModalOpen,
    updateSubscriberStatus,
    setIsCheckoutSimulatorOpen,
  } = useBilling();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | SubscriptionStatus>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.document.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'all' || sub.planId === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusText = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active':
        return { label: 'Ativo', color: 'text-[#008060] bg-[#e3f1df]' };
      case 'past_due':
        return { label: 'Em Atraso', color: 'text-[#b95000] bg-[#fff5ea]' };
      case 'trialing':
        return { label: 'Período Teste', color: 'text-[#005bd3] bg-[#f1f2f4]' };
      case 'paused':
        return { label: 'Pausado', color: 'text-[#6d7175] bg-[#f1f2f4]' };
      case 'canceled':
        return { label: 'Cancelado', color: 'text-[#d72c0d] bg-[#fed3d1]' };
      default:
        return { label: status, color: 'text-[#6d7175] bg-[#f1f2f4]' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#202223]">
            Gestão de Assinantes & CRM
          </h1>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Controle unificado de planos ativos, inadimplência e histórico de renovação de cada membro.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewSubscriberModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Adicionar Assinante</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar (Polaris Surface) */}
      <div className="p-3.5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c9196]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email ou CPF/CNPJ..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] placeholder-[#8c9196] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
          />
        </div>

        {/* Filter Tabs / Segmented controls (Polaris style) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-0.5 p-1 bg-[#f1f2f4] border border-[#d2d5d8] rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-[#202223] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Todos ({subscribers.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-white text-[#008060] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Ativos ({subscribers.filter((s) => s.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('past_due')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'past_due'
                  ? 'bg-white text-[#b95000] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Em Atraso ({subscribers.filter((s) => s.status === 'past_due').length})
            </button>
            <button
              onClick={() => setStatusFilter('trialing')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'trialing'
                  ? 'bg-white text-[#005bd3] font-semibold shadow-sm'
                  : 'text-[#6d7175] hover:text-[#202223]'
              }`}
            >
              Trial ({subscribers.filter((s) => s.status === 'trialing').length})
            </button>
          </div>

          {/* Plan dropdown filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] focus:outline-none focus:border-[#008060]"
          >
            <option value="all">Todos os Planos</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High-density Subscribers Data Grid (Polaris Table) */}
      <div className="rounded-xl bg-white border border-[#e1e3e5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f7f7f8] border-b border-[#e1e3e5] text-[#6d7175] font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Assinante / Documento</th>
                <th className="py-3 px-4">Plano & Ciclo</th>
                <th className="py-3 px-4 text-right">Valor Recorrente</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Próxima Renovação</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f2f4]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8c9196]">
                    Nenhum assinante encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => {
                  const statusInfo = getStatusText(sub.status);

                  return (
                    <tr
                      key={sub.id}
                      onClick={() => setSelectedSubscriber(sub)}
                      className="hover:bg-[#f9fafb] transition-colors cursor-pointer group"
                    >
                      {/* Subscriber Name & Email */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#202223] group-hover:text-[#008060] transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-[#6d7175] mt-0.5 flex items-center gap-1.5">
                          <span>{sub.email}</span>
                          <span className="text-[#c9cccf]">·</span>
                          <span className="font-mono text-[#8c9196] text-[10px]">{sub.document}</span>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3 px-4">
                        <div className="text-[#202223] font-medium">{sub.planName}</div>
                        <div className="text-[10px] text-[#8c9196] mt-0.5">
                          Ciclo {getIntervalBadge(sub.interval)}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-mono font-bold text-[#202223] tabular-nums">
                          {formatCurrency(sub.amount)}
                        </div>
                        <div className="text-[10px] text-[#8c9196]">
                          {sub.interval === 'year' ? '/ano' : '/mês'}
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[#4a4d50]">
                          {sub.paymentMethod === 'pix_recurrent' ? (
                            <>
                              <QrCode className="w-3.5 h-3.5 text-[#008060]" />
                              <span className="text-[11px]">PIX Automático</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5 text-[#6d7175]" />
                              <span className="text-[11px]">
                                {sub.cardBrand?.toUpperCase() || 'Cartão'} •••• {sub.cardLast4 || '4242'}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        {sub.status === 'past_due' && (
                          <div className="text-[10px] text-[#b95000] mt-0.5">
                            {sub.dunningAttempts} tentativas feitas
                          </div>
                        )}
                      </td>

                      {/* Next Billing Date */}
                      <td className="py-3 px-4 font-mono text-[#6d7175] tabular-nums">
                        {formatDate(sub.nextBillingDate)}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedSubscriber(sub)}
                            className="px-2.5 py-1 text-[11px] font-medium text-[#202223] bg-white hover:bg-[#f6f6f7] border border-[#c9cccf] rounded-lg transition-colors shadow-sm"
                          >
                            Detalhes
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

        {/* Table footer */}
        <div className="py-3 px-4 bg-[#f7f7f8] border-t border-[#e1e3e5] flex items-center justify-between text-xs text-[#6d7175]">
          <span>Exibindo {filteredSubscribers.length} de {subscribers.length} assinantes</span>
          <div className="flex items-center gap-4">
            <span>PIX: {subscribers.filter((s) => s.paymentMethod === 'pix_recurrent').length}</span>
            <span>Cartão: {subscribers.filter((s) => s.paymentMethod === 'credit_card').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
