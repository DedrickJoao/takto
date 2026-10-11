import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { Wallet, ArrowDownToLine, Clock, CheckCircle2, Building2, Smartphone, FileText } from 'lucide-react';

export const WithdrawalsView: React.FC = () => {
  const { metrics, withdrawals, setIsReportModalOpen } = useBilling();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Saques & Carteira</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
              M-Pesa • E-Mola • Bancos
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Transfira seus lucros diretamente para suas contas em Meticais ou outras moedas
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowDownToLine className="w-4 h-4" />
          <span>Solicitar Saque</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Saldo Disponível para Saque</p>
          <p className="text-2xl font-extrabold text-[#10b981]">
            MT {metrics.availableBalance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-neutral-500">Pronto para transferência imediata</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Saldo em Processamento</p>
          <p className="text-2xl font-bold text-white">
            MT {metrics.pendingBalance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-neutral-500">Liquidação programada</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Total Já Sacado</p>
          <p className="text-2xl font-bold text-neutral-300">MT 2.350,00</p>
          <p className="text-[11px] text-emerald-400">100% repassado com sucesso</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4">
        <h3 className="text-sm font-bold text-white">Histórico de Saques Realizados</h3>
        <div className="space-y-3">
          {withdrawals.map((req) => (
            <div
              key={req.id}
              className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">MT {req.amount.toFixed(2)}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {req.status === 'completed' ? 'Concluído' : 'Processando'}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">{req.accountDetails}</p>
                <p className="text-[10px] text-neutral-500">Data: {req.requestedAt}</p>
              </div>

              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pago
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
