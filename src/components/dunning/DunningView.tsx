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
      '🔍 Analisando transações reprovadas nas últimas 48h...',
      '🕒 Janela bancária ideal identificada: 08:30 às 09:15 (Pico de saldo em conta)',
      '🔄 Roteamento em cascata: Tentativa via adquirente Cielo com tokenização...',
    ]);

    await new Promise((r) => setTimeout(r, 900));

    setSimulationLogs((prev) => [
      ...prev,
      '📲 Disparo automatizado: Enviando link seguro de 1 clique para WhatsApp do assinante...',
      '💳 Transação autorizada via rota secundária com sucesso!',
    ]);

    await new Promise((r) => setTimeout(r, 900));

    if (failedInvoices.length > 0) {
      await retryInvoicePayment(failedInvoices[0].id);
    }

    setSimulationLogs((prev) => [
      ...prev,
      '🎉 Sucesso: Assinatura recuperada sem intervenção manual!',
      '📊 Métricas recalculadas: Receita salva e computada no MRR.',
    ]);

    setSimulating(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#202223]">
              Smart Dunning & Recuperação por IA
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-[#004c3f] bg-[#e3f1df] rounded">
              IA Ativa
            </span>
          </div>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Recupere até 83% das cobranças reprovadas automaticamente com retentativas inteligentes e régua omnichannel.
          </p>
        </div>

        <button
          onClick={runSmartCascadeSimulation}
          disabled={simulating}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{simulating ? 'Executando Análise...' : 'Testar Simulação de Dunning'}</span>
        </button>
      </div>

      {/* KPI Stats of Recovery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm">
          <span className="text-[#6d7175] text-xs font-medium">Taxa Geral de Recuperação</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#008060] tabular-nums">
              {metrics.recoveryRate}%
            </span>
          </div>
          <p className="text-[11px] text-[#8c9196] mt-1">
            Média de mercado sem dunning: 22%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm">
          <span className="text-[#6d7175] text-xs font-medium">Receita Salva no Mês</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#202223] tabular-nums">
              {formatCurrency(metrics.recoveredAmountMonth)}
            </span>
          </div>
          <p className="text-[11px] text-[#8c9196] mt-1">
            Valores resgatados do churn involuntário
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm">
          <span className="text-[#6d7175] text-xs font-medium">Faturas Reprovadas Pendentes</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-[#b95000] tabular-nums">
              {failedInvoices.length}
            </span>
            <span className="text-xs text-[#8c9196]">em fila de retentativa</span>
          </div>
          <p className="text-[11px] text-[#8c9196] mt-1">
            Régua automática agendada para hoje
          </p>
        </div>
      </div>

      {/* Simulation Console (if running or completed) */}
      {simulationLogs.length > 0 && (
        <div className="p-4 rounded-xl bg-[#202223] border border-[#303030] font-mono text-xs space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#303030]">
            <span className="text-[#aee9d1] font-bold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#008060]" />
              Terminal de Execução Smart Dunning TAKTO
            </span>
            <span className="text-[10px] text-[#8c9196]">Tempo de resposta: 180ms</span>
          </div>
          <div className="space-y-1.5 pt-2 text-[#e4e5e7]">
            {simulationLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-[#008060] select-none font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dunning Steps Automation Workflow */}
      <div className="space-y-3.5">
        <div>
          <h2 className="text-sm font-bold text-[#202223]">
            Régua Ativa de Cobrança e Retentativas
          </h2>
          <p className="text-xs text-[#6d7175]">
            Ações disparadas automaticamente em cada ponto do ciclo de vida da cobrança.
          </p>
        </div>

        <div className="space-y-2.5">
          {dunningSteps.map((step) => {
            const isAutoRetry = step.channel === 'auto_retry';
            const isWhatsapp = step.channel === 'whatsapp';

            return (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all ${
                  step.active
                    ? 'bg-white border-[#e1e3e5] shadow-sm hover:border-[#b5b8ba]'
                    : 'bg-[#f9fafb] border-[#e1e3e5] opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Channel icon */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isAutoRetry
                          ? 'bg-[#e3f1df] text-[#008060]'
                          : isWhatsapp
                          ? 'bg-[#e3f1df] text-[#004c3f]'
                          : 'bg-[#f1f2f4] text-[#6d7175]'
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
                        <span className="text-xs font-semibold text-[#008060]">
                          {step.dayOffset < 0
                            ? `${Math.abs(step.dayOffset)} dias antes`
                            : step.dayOffset === 0
                            ? 'No vencimento'
                            : `D+${step.dayOffset}`}
                        </span>
                        <span className="text-[#c9cccf]">·</span>
                        <h3 className="text-xs font-bold text-[#202223]">{step.title}</h3>
                      </div>
                      <p className="text-xs text-[#6d7175] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Recovery Rate and Toggle */}
                  <div className="flex items-center gap-6 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8c9196] block">Eficiência</span>
                      <span className="text-xs font-mono font-bold text-[#008060]">
                        {step.successRate}% sucesso
                      </span>
                    </div>

                    <button
                      onClick={() => toggleDunningStep(step.id)}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                        step.active ? 'bg-[#008060]' : 'bg-[#c9cccf]'
                      }`}
                      title={step.active ? 'Desativar etapa' : 'Ativar etapa'}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
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
