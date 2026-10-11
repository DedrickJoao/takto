import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency } from '../../utils/formatters';
import {
  TrendingUp,
  CreditCard,
  Smartphone,
  QrCode,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const MetricsView: React.FC = () => {
  const { metrics, activeCurrency, currencyRevenue } = useBilling();

  const paymentStats = [
    {
      method: 'M-Pesa (Vodacom)',
      share: '64%',
      approvalRate: '98.5%',
      volume: 'MT 271,43',
      color: 'bg-rose-500',
    },
    {
      method: 'E-Mola (Movitel)',
      share: '22%',
      approvalRate: '97.2%',
      volume: 'MT 93,30',
      color: 'bg-orange-500',
    },
    {
      method: 'Cartão de Crédito',
      share: '10%',
      approvalRate: '89.4%',
      volume: 'MT 42,41',
      color: 'bg-emerald-500',
    },
    {
      method: 'PIX & Outros',
      share: '4%',
      approvalRate: '99.1%',
      volume: 'MT 16,98',
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Métricas Detalhadas</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
            Tempo Real
          </span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Análise de conversão, aprovação por método de pagamento e faturamento consolidado
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs font-semibold text-neutral-400">Faturamento Acumulado</p>
          <p className="text-2xl font-extrabold text-white">
            MT {metrics.level.currentRevenue.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +100% este mês
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs font-semibold text-neutral-400">Aprovação M-Pesa & Mobile</p>
          <p className="text-2xl font-extrabold text-white">98.2%</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Instantâneo via Push USSD
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs font-semibold text-neutral-400">Taxa de Chargeback</p>
          <p className="text-2xl font-extrabold text-emerald-400">0.0%</p>
          <p className="text-[11px] text-neutral-500 mt-1">Nenhuma contestação</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs font-semibold text-neutral-400">Reembolsos Solicitados</p>
          <p className="text-2xl font-extrabold text-white">0.0%</p>
          <p className="text-[11px] text-neutral-500 mt-1">Zero devoluções</p>
        </div>
      </div>

      {/* Methods breakdown */}
      <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Performance por Método de Pagamento
        </h3>

        <div className="space-y-3">
          {paymentStats.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#0c140e] border border-[#142217] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <div>
                  <p className="text-xs font-semibold text-white">{item.method}</p>
                  <p className="text-[10px] text-neutral-400">Participação: {item.share}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold text-white">Aprovação: {item.approvalRate}</p>
                <p className="text-[10px] text-neutral-400">{item.volume}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
