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
        return { label: 'Ativo', color: 'text-emerald-400' };
      case 'past_due':
        return { label: 'Em Atraso', color: 'text-amber-400' };
      case 'trialing':
        return { label: 'Período Teste', color: 'text-sky-400' };
      case 'paused':
        return { label: 'Pausado', color: 'text-neutral-400' };
      case 'canceled':
        return { label: 'Cancelado', color: 'text-rose-400' };
      default:
        return { label: status, color: 'text-neutral-400' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#142319] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Gestão de Assinantes & CRM
          </h1>
          <p className="text-neutral-400 text-xs mt-1">
            Controle unificado de planos ativos, inadimplência e histórico de renovação de cada membro.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewSubscriberModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Adicionar Assinante Manual</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#0a100c] border border-[#142319] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email ou CPF/CNPJ..."
            className="w-full pl-9 pr-4 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Filter Tabs / Segmented controls (Interactive button tabs allowed) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 p-1 bg-[#060907] border border-[#16271c] rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Todos ({subscribers.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Ativos ({subscribers.filter((s) => s.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('past_due')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'past_due'
                  ? 'bg-amber-500/20 text-amber-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Em Atraso ({subscribers.filter((s) => s.status === 'past_due').length})
            </button>
            <button
              onClick={() => setStatusFilter('trialing')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                statusFilter === 'trialing'
                  ? 'bg-sky-500/20 text-sky-300 font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Trial ({subscribers.filter((s) => s.status === 'trialing').length})
            </button>
          </div>

          {/* Plan dropdown filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#060907] border border-[#16271c] rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-emerald-500/50"
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

      {/* High-density Subscribers Data Grid */}
      <div className="rounded-xl bg-[#0a100c] border border-[#142319] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c140f] border-b border-[#142319] text-neutral-400 font-medium">
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
            <tbody className="divide-y divide-[#142319]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
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
                      className="hover:bg-[#0e1711] transition-colors cursor-pointer group"
                    >
                      {/* Subscriber Name & Email */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                          <span>{sub.email}</span>
                          <span className="text-neutral-600">·</span>
                          <span className="font-mono text-neutral-500 text-[10px]">{sub.document}</span>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3 px-4">
                        <div className="text-neutral-200 font-medium">{sub.planName}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">
                          Ciclo {getIntervalBadge(sub.interval)}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right">
                        <div className="font-mono font-bold text-white tabular-nums">
                          {formatCurrency(sub.amount)}
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          {sub.interval === 'year' ? '/ano' : '/mês'}
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          {sub.paymentMethod === 'pix_recurrent' ? (
                            <>
                              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-[11px]">PIX Automático</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                              <span className="text-[11px]">
                                {sub.cardBrand?.toUpperCase() || 'Cartão'} •••• {sub.cardLast4 || '4242'}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        {sub.status === 'past_due' && (
                          <div className="text-[10px] text-amber-400/80 mt-0.5">
                            {sub.dunningAttempts} tentativas feitas
                          </div>
                        )}
                      </td>

                      {/* Next Billing Date */}
                      <td className="py-3 px-4 font-mono text-neutral-400 tabular-nums">
                        {formatDate(sub.nextBillingDate)}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedSubscriber(sub)}
                            className="px-2.5 py-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded transition-colors"
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
        <div className="py-3 px-4 bg-[#080d0a] border-t border-[#142319] flex items-center justify-between text-xs text-neutral-500">
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
