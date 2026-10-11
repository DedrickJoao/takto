import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  X,
  Wallet,
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  Smartphone,
  Building2,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const FinancialReportModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    metrics,
    activeCurrency,
    withdrawals,
    requestWithdrawal,
  } = useBilling();

  const [activeTab, setActiveTab] = useState<'withdraw' | 'history'>('withdraw');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('424.12');
  const [withdrawMethod, setWithdrawMethod] = useState<'mpesa' | 'emola' | 'bank_transfer'>('mpesa');
  const [accountNumber, setAccountNumber] = useState<string>('+258 84 892 0112');
  const [accountHolder, setAccountHolder] = useState<string>('Alberto Almeida');
  const [bankName, setBankName] = useState<string>('Millennium BIM');

  if (!isReportModalOpen) return null;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(withdrawAmount);
    if (isNaN(num) || num <= 0) return;

    let details = '';
    if (withdrawMethod === 'mpesa') {
      details = `M-Pesa: ${accountNumber} (${accountHolder})`;
    } else if (withdrawMethod === 'emola') {
      details = `E-Mola: ${accountNumber} (${accountHolder})`;
    } else {
      details = `${bankName}: Conta ${accountNumber} (${accountHolder})`;
    }

    const success = requestWithdrawal(num, withdrawMethod, details);
    if (success) {
      setActiveTab('history');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-[#09110c] border border-[#1a2c1f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#162319] flex items-center justify-between bg-[#0c1611]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-[#10b981]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Relatório Financeiro & Saques
              </h3>
              <p className="text-xs text-neutral-400">
                Gerencie seus saldos, solicite saques via M-Pesa, E-Mola ou Transferência Bancária
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReportModalOpen(false)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#142217] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance KPI cards */}
        <div className="p-5 bg-[#08100b] border-b border-[#142318] grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b]">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
              Disponível para Saque
            </span>
            <p className="text-xl font-bold text-[#10b981] mt-0.5">
              MT {metrics.availableBalance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b]">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
              Em Processamento
            </span>
            <p className="text-xl font-bold text-neutral-300 mt-0.5">
              MT {metrics.pendingBalance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-3 border-b border-[#162319] flex gap-4">
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'withdraw'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Solicitar Saque
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Histórico ({withdrawals.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'withdraw' ? (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              {/* Method selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Método de Recebimento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('mpesa');
                      setAccountNumber('+258 84 892 0112');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      withdrawMethod === 'mpesa'
                        ? 'bg-rose-950/30 border-rose-600 text-white font-semibold'
                        : 'bg-[#0d1610] border-[#18271c] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs">M-Pesa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('emola');
                      setAccountNumber('+258 86 554 1122');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      withdrawMethod === 'emola'
                        ? 'bg-orange-950/30 border-orange-600 text-white font-semibold'
                        : 'bg-[#0d1610] border-[#18271c] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                    <span className="text-xs">E-Mola</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('bank_transfer');
                      setAccountNumber('44920199201');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      withdrawMethod === 'bank_transfer'
                        ? 'bg-emerald-950/30 border-[#10b981] text-white font-semibold'
                        : 'bg-[#0d1610] border-[#18271c] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs">Banco</span>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Valor do Saque (MT)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                    MT
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    max={metrics.availableBalance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2.5 pl-11 pr-20 text-sm font-bold text-white focus:outline-none focus:border-[#10b981]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(metrics.availableBalance.toString())}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#10b981] hover:text-emerald-300 px-2 py-1 bg-[#122216] rounded-md cursor-pointer"
                  >
                    Máximo
                  </button>
                </div>
              </div>

              {/* Account details */}
              {withdrawMethod === 'bank_transfer' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Banco
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                    >
                      <option value="Millennium BIM">Millennium BIM</option>
                      <option value="BCI">BCI</option>
                      <option value="Standard Bank">Standard Bank</option>
                      <option value="Moza Banco">Moza Banco</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Número da Conta
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Número de Telefone {withdrawMethod === 'mpesa' ? 'M-Pesa' : 'E-Mola'}
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="+258 84 xxx xxxx"
                    className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Titular da Conta
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0c150e] border border-[#16241a] flex items-start gap-2.5 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>
                  Saques via M-Pesa e E-Mola são processados de forma instantânea ou em até 1 hora útil.
                  Taxa zero para saques de produtores verificados.
                </span>
              </div>

              <button
                type="submit"
                disabled={metrics.availableBalance <= 0}
                className="w-full py-2.5 rounded-xl bg-[#008060] hover:bg-[#007053] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Confirmar e Sacar MT {withdrawAmount}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {withdrawals.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  Nenhum saque solicitado ainda.
                </div>
              ) : (
                withdrawals.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          MT {req.amount.toFixed(2)}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            req.status === 'completed'
                              ? 'bg-emerald-950/80 text-[#10b981] border border-emerald-800'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {req.status === 'completed' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> Concluído
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" /> Processando
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">{req.accountDetails}</p>
                      <p className="text-[10px] text-neutral-500">Solicitado em: {req.requestedAt}</p>
                    </div>

                    <button
                      onClick={() => alert(`Comprovante de Saque ${req.id} verificado com sucesso!`)}
                      className="px-2.5 py-1 rounded-lg bg-[#121f15] hover:bg-[#182b1d] text-neutral-300 text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Recibo</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
