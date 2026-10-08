import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { WebhookEventLog } from '../../types/billing';
import {
  Code2,
  Key,
  Copy,
  Check,
  Send,
  Eye,
  EyeOff,
  Terminal,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const WebhooksView: React.FC = () => {
  const { webhookLogs, dispatchTestWebhook, isSandbox, addToast } = useBilling();

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEventLog['event']>('invoice.paid');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const publicKey = isSandbox
    ? 'pk_test_takto_8829fba9012cd4e0'
    : 'pk_live_takto_4901ba83011ee22c';
  const secretKey = isSandbox
    ? 'sk_test_takto_sec_9918204910481230491'
    : 'sk_live_takto_sec_8830192837109283401';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
    addToast({
      type: 'success',
      title: 'Copiado!',
      message: `${label} copiada para a área de transferência.`,
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#142319] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Desenvolvedores: API & Webhooks
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded">
              v1.4 REST
            </span>
          </div>
          <p className="text-neutral-400 text-xs mt-1">
            Conecte seu backend, CRM ou plataforma externa via Webhooks assinados e endpoints seguros.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Endpoint Webhook Configurado:</span>
          <code className="text-xs font-mono text-emerald-400 bg-[#0a100c] px-2.5 py-1 rounded border border-[#16271c]">
            https://api.empresa.com.br/webhooks/takto
          </code>
        </div>
      </div>

      {/* API Keys Card */}
      <div className="p-6 rounded-2xl bg-[#0a100c] border border-[#16271c] space-y-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Chaves de Autenticação da API</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Utilize para inicializar o SDK do TAKTO ou autenticar chamadas via Bearer Token.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Public Key */}
          <div className="p-3.5 rounded-xl bg-[#060907] border border-[#142319] space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">Chave Pública (Frontend)</span>
              <button
                onClick={() => handleCopy(publicKey, 'Chave Pública')}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-sans text-[11px]"
              >
                {copiedKey === 'Chave Pública' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copiar</span>
              </button>
            </div>
            <p className="text-neutral-200 truncate">{publicKey}</p>
          </div>

          {/* Secret Key */}
          <div className="p-3.5 rounded-xl bg-[#060907] border border-[#142319] space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">Chave Secreta (Servidor)</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer font-sans text-[11px]"
                >
                  {showSecretKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecretKey ? 'Ocultar' : 'Revelar'}</span>
                </button>
                <button
                  onClick={() => handleCopy(secretKey, 'Chave Secreta')}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-sans text-[11px]"
                >
                  {copiedKey === 'Chave Secreta' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar</span>
                </button>
              </div>
            </div>
            <p className="text-neutral-200 truncate">
              {showSecretKey ? secretKey : '••••••••••••••••••••••••••••••••••••••••'}
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Tester Simulator */}
      <div className="p-6 rounded-2xl bg-[#0a100c] border border-[#16271c] space-y-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Simulador de Disparo de Webhook</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Envie payloads em tempo real para verificar como seu sistema reage a assinaturas criadas, renovadas ou canceladas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value as any)}
            className="px-3 py-2 bg-[#060907] border border-[#1b3123] rounded-lg text-xs text-white focus:outline-none"
          >
            <option value="subscription.created">subscription.created (Nova Assinatura)</option>
            <option value="invoice.paid">invoice.paid (Fatura Paga com Sucesso)</option>
            <option value="invoice.recovered">invoice.recovered (Recuperada por Dunning)</option>
            <option value="invoice.payment_failed">invoice.payment_failed (Falha de Cobrança)</option>
            <option value="subscription.canceled">subscription.canceled (Assinatura Cancelada)</option>
          </select>

          <button
            onClick={() => dispatchTestWebhook(selectedEvent)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Disparar Evento de Teste</span>
          </button>
        </div>
      </div>

      {/* Recent Webhook Logs Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white">
          Registro de Webhooks Enviados ({webhookLogs.length})
        </h2>

        <div className="rounded-xl bg-[#0a100c] border border-[#142319] divide-y divide-[#142319] overflow-hidden text-xs">
          {webhookLogs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            const is200 = log.httpStatus === 200;

            return (
              <div key={log.id} className="p-4 space-y-2 hover:bg-[#0c140f] transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        is200
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      HTTP {log.httpStatus}
                    </span>
                    <span className="font-mono font-semibold text-white">{log.event}</span>
                    <span className="text-neutral-500 text-[11px] hidden sm:inline">
                      {log.endpoint}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400">
                    <span className="text-[11px] font-mono">{log.timestamp}</span>
                    <span className="text-emerald-400 text-xs font-medium">
                      {isExpanded ? 'Recolher' : 'Ver Payload'}
                    </span>
                  </div>
                </div>

                {/* Expanded Payload view */}
                {isExpanded && (
                  <div className="mt-3 p-3.5 rounded-lg bg-[#060907] border border-[#142319] font-mono text-[11px] text-emerald-300 overflow-x-auto">
                    <pre>{JSON.stringify(log.payload, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
