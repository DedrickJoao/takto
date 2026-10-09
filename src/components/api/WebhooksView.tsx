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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#202223]">
              Desenvolvedores: API & Webhooks
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-[#004c3f] bg-[#e3f1df] rounded">
              v1.4 REST
            </span>
          </div>
          <p className="text-[#6d7175] text-xs mt-0.5">
            Conecte seu backend, CRM ou plataforma externa via Webhooks assinados e endpoints seguros.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6d7175]">Endpoint Configurado:</span>
          <code className="text-xs font-mono text-[#004c3f] bg-[#e3f1df] px-2.5 py-1 rounded border border-[#aee9d1]">
            https://api.empresa.com.br/webhooks/takto
          </code>
        </div>
      </div>

      {/* API Keys Card (Polaris Card) */}
      <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#202223] flex items-center gap-2">
            <Key className="w-4 h-4 text-[#008060]" />
            <span>Chaves de Autenticação da API</span>
          </h2>
          <p className="text-xs text-[#6d7175] mt-0.5">
            Utilize para inicializar o SDK do TAKTO ou autenticar chamadas via Bearer Token.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Public Key */}
          <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5] space-y-1.5">
            <div className="flex items-center justify-between text-[#6d7175]">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Chave Pública (Frontend)</span>
              <button
                onClick={() => handleCopy(publicKey, 'Chave Pública')}
                className="text-[#008060] hover:text-[#006e52] flex items-center gap-1 cursor-pointer font-sans text-[11px] font-medium"
              >
                {copiedKey === 'Chave Pública' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copiar</span>
              </button>
            </div>
            <p className="text-[#202223] font-medium truncate">{publicKey}</p>
          </div>

          {/* Secret Key */}
          <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5] space-y-1.5">
            <div className="flex items-center justify-between text-[#6d7175]">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Chave Secreta (Servidor)</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="text-[#6d7175] hover:text-[#202223] flex items-center gap-1 cursor-pointer font-sans text-[11px]"
                >
                  {showSecretKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecretKey ? 'Ocultar' : 'Revelar'}</span>
                </button>
                <button
                  onClick={() => handleCopy(secretKey, 'Chave Secreta')}
                  className="text-[#008060] hover:text-[#006e52] flex items-center gap-1 cursor-pointer font-sans text-[11px] font-medium"
                >
                  {copiedKey === 'Chave Secreta' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar</span>
                </button>
              </div>
            </div>
            <p className="text-[#202223] font-medium truncate">
              {showSecretKey ? secretKey : '••••••••••••••••••••••••••••••••••••••••'}
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Tester Simulator */}
      <div className="p-5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#202223] flex items-center gap-2">
            <Send className="w-4 h-4 text-[#008060]" />
            <span>Simulador de Disparo de Webhook</span>
          </h2>
          <p className="text-xs text-[#6d7175] mt-0.5">
            Envie payloads em tempo real para verificar como seu sistema reage a assinaturas criadas, renovadas ou canceladas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value as any)}
            className="px-3 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] focus:outline-none focus:border-[#008060]"
          >
            <option value="subscription.created">subscription.created (Nova Assinatura)</option>
            <option value="invoice.paid">invoice.paid (Fatura Paga com Sucesso)</option>
            <option value="invoice.recovered">invoice.recovered (Recuperada por Dunning)</option>
            <option value="invoice.payment_failed">invoice.payment_failed (Falha de Cobrança)</option>
            <option value="subscription.canceled">subscription.canceled (Assinatura Cancelada)</option>
          </select>

          <button
            onClick={() => dispatchTestWebhook(selectedEvent)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Disparar Evento de Teste</span>
          </button>
        </div>
      </div>

      {/* Recent Webhook Logs Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#202223]">
          Registro de Webhooks Enviados ({webhookLogs.length})
        </h2>

        <div className="rounded-xl bg-white border border-[#e1e3e5] divide-y divide-[#f1f2f4] overflow-hidden text-xs shadow-sm">
          {webhookLogs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            const is200 = log.httpStatus === 200;

            return (
              <div key={log.id} className="p-4 space-y-2 hover:bg-[#f9fafb] transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        is200
                          ? 'bg-[#e3f1df] text-[#004c3f]'
                          : 'bg-[#fed3d1] text-[#d72c0d]'
                      }`}
                    >
                      HTTP {log.httpStatus}
                    </span>
                    <span className="font-mono font-semibold text-[#202223]">{log.event}</span>
                    <span className="text-[#8c9196] text-[11px] hidden sm:inline">
                      {log.endpoint}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[#6d7175]">
                    <span className="text-[11px] font-mono">{log.timestamp}</span>
                    <span className="text-[#008060] text-xs font-semibold">
                      {isExpanded ? 'Recolher' : 'Ver Payload'}
                    </span>
                  </div>
                </div>

                {/* Expanded Payload view */}
                {isExpanded && (
                  <div className="mt-3 p-3.5 rounded-lg bg-[#202223] font-mono text-[11px] text-[#aee9d1] overflow-x-auto shadow-inner">
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
