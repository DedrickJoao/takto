import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency } from '../../utils/formatters';
import {
  Sparkles,
  Zap,
  Clock,
  MessageSquare,
  Mail,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Play,
  Settings2,
  ArrowRight,
} from 'lucide-react';

export const DunningView: React.FC = () => {
  const {
    dunningSteps,
    toggleDunningStep,
    metrics,
    invoices,
    retryInvoicePayment,
    addToast,
  } = useBilling();

  const [simulating, setSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const failedInvoices = invoices.filter((i) => i.status === 'failed' || i.status === 'pending');

  const runSmartCascadeSimulation = async () => {
    setSimulating(true);
    setSimulationLogs([
      '⚡ Iniciando Motor de Recuperação TAKTO Smart Dunning...',
      '🔍 Analisando 14 transações reprovadas nas últimas 48h...',
      '🕒 Identificando janela bancária ideal: 08:30 às 09:15 (Horário de pico de saldo)',
      '🔄 Roteamento em cascata: Adquirente primário rejeitou (limite temporário). Mudando para rota secundária tokenizada...',
    ]);

    await new Promise((r) => setTimeout(r, 900));

    setSimulationLogs((prev) => [
      ...prev,
      '📲 Disparo automatizado: Enviando link seguro de 1 clique para WhatsApp do assinante...',
      '💳 Transação Carlos Eduardo Ramos autorizada via adquirente Cielo!',
    ]);

    await new Promise((r) => setTimeout(r, 900));

    if (failedInvoices.length > 0) {
      await retryInvoicePayment(failedInvoices[0].id);
    }

    setSimulationLogs((prev) => [
      ...prev,
      '🎉 Sucesso: Assinatura recuperada sem intervenção manual!',
      '📊 Métricas recalculadas: +R$ 247,00 em receita salva.',
    ]);

    setSimulating(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#142319] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Smart Dunning & Recuperação por IA
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded">
              IA Ativa
            </span>
          </div>
          <p className="text-neutral-400 text-xs mt-1">
            Recupere até 83% das cobranças reprovadas automaticamente com retentativas inteligentes e régua omnichannel.
          </p>
        </div>

        <button
          onClick={runSmartCascadeSimulation}
          disabled={simulating}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{simulating ? 'Executando Análise...' : 'Testar Simulação de Dunning'}</span>
        </button>
      </div>

      {/* KPI Stats of Recovery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c]">
          <span className="text-neutral-400 text-xs">Taxa Geral de Recuperação</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              {metrics.recoveryRate}%
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Média de mercado sem dunning: 22%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c]">
          <span className="text-neutral-400 text-xs">Receita Salva no Mês</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white tabular-nums">
              {formatCurrency(metrics.recoveredAmountMonth)}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Valores que seriam perdidos por churn involuntário
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c140f] border border-[#16271c]">
          <span className="text-neutral-400 text-xs">Faturas Reprovadas Pendentes</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
              {failedInvoices.length}
            </span>
            <span className="text-xs text-neutral-500">em fila de retentativa</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Régua automática agendada para hoje
          </p>
        </div>
      </div>

      {/* Simulation Console (if running or completed) */}
      {simulationLogs.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#080e0a] border border-emerald-500/30 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#142319]">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Terminal de Execução Smart Dunning TAKTO
            </span>
            <span className="text-[10px] text-neutral-500">Tempo de resposta: 180ms</span>
          </div>
          <div className="space-y-1.5 pt-2 text-neutral-300">
            {simulationLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-emerald-500 select-none">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dunning Steps Automation Workflow */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Régua Ativa de Cobrança e Retentativas
          </h2>
          <p className="text-xs text-neutral-400">
            Ações disparadas automaticamente em cada ponto do ciclo de vida da cobrança.
          </p>
        </div>

        <div className="space-y-3">
          {dunningSteps.map((step, idx) => {
            const isAutoRetry = step.channel === 'auto_retry';
            const isWhatsapp = step.channel === 'whatsapp';
            const isEmail = step.channel === 'email';

            return (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all ${
                  step.active
                    ? 'bg-[#0a100c] border-[#16271c] hover:border-emerald-500/30'
                    : 'bg-[#080b09] border-[#101912] opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Channel icon */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isAutoRetry
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isWhatsapp
                          ? 'bg-emerald-900/30 text-emerald-300'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {isAutoRetry ? (
                        <Zap className="w-4 h-4" />
                      ) : isWhatsapp ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {step.dayOffset < 0
                            ? `${Math.abs(step.dayOffset)} dias antes`
                            : step.dayOffset === 0
                            ? 'No vencimento'
                            : `D+${step.dayOffset}`}
                        </span>
                        <span className="text-neutral-600">·</span>
                        <h3 className="text-xs font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Recovery Rate and Toggle */}
                  <div className="flex items-center gap-6 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block">Eficiência</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {step.successRate}% sucesso
                      </span>
                    </div>

                    <button
                      onClick={() => toggleDunningStep(step.id)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                        step.active ? 'bg-emerald-500' : 'bg-neutral-800'
                      }`}
                      title={step.active ? 'Desativar etapa' : 'Ativar etapa'}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-black transition-transform ${
                          step.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
