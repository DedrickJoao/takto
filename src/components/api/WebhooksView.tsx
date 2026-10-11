import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
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
  ExternalLink,
} from 'lucide-react';

export const WebhooksView: React.FC = () => {
  const { webhookLogs, dispatchTestWebhook, isSandbox, addToast } = useBilling();

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('payment.approved');

  const publicKey = isSandbox
    ? 'pk_test_escalepay_8829fba9012cd4e0'
    : 'pk_live_escalepay_4901ba83011ee22c';
  const secretKey = isSandbox
    ? 'sk_test_escalepay_sec_9918204910481230491'
    : 'sk_live_escalepay_sec_8830192837109283401';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
    addToast({
      type: 'info',
      title: 'Copiado!',
      message: `${label} copiada para a área de transferência.`,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#162319]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Integrações: API & Webhooks
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold text-[#10b981] bg-[#008060]/20 rounded-full border border-[#008060]/30">
              v2.0 REST
            </span>
          </div>
          <p className="text-neutral-400 text-xs mt-0.5">
            Conecte suas páginas de vendas, CRM ou membros externos via Webhooks automáticos da EscalePay.
          </p>
        </div>
      </div>

      {/* API Keys */}
      <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Key className="w-4 h-4 text-[#10b981]" />
          <span>Suas Chaves de API</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
              Chave Pública (Public Key)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicKey}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 font-mono text-xs text-neutral-300 select-all"
              />
              <button
                onClick={() => handleCopy(publicKey, 'Chave pública')}
                className="p-2 rounded-xl bg-[#121f15] hover:bg-[#1a2d1f] text-neutral-300 cursor-pointer"
              >
                {copiedKey === 'Chave pública' ? (
                  <Check className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
              Chave Secreta (Secret Key)
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showSecretKey ? 'text' : 'password'}
                readOnly
                value={secretKey}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 font-mono text-xs text-neutral-300 select-all"
              />
              <button
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="p-2 rounded-xl bg-[#121f15] hover:bg-[#1a2d1f] text-neutral-300 cursor-pointer"
              >
                {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleCopy(secretKey, 'Chave secreta')}
                className="p-2 rounded-xl bg-[#121f15] hover:bg-[#1a2d1f] text-neutral-300 cursor-pointer"
              >
                {copiedKey === 'Chave secreta' ? (
                  <Check className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Simulator */}
      <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Terminal className="w-4 h-4 text-[#10b981]" />
            <span>Simulador de Disparo de Webhook</span>
          </div>

          <button
            onClick={() => dispatchTestWebhook(selectedEvent)}
            className="px-4 py-2 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-transform active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Disparar Evento</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-neutral-400 font-semibold mb-1">Tipo de Evento</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white"
            >
              <option value="payment.approved">payment.approved (Pagamento Aprovado)</option>
              <option value="cart.abandoned">cart.abandoned (Carrinho Abandonado)</option>
              <option value="subscription.renewed">subscription.renewed (Renovação)</option>
              <option value="withdrawal.completed">withdrawal.completed (Saque Concluído)</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-400 font-semibold mb-1">Endpoint de Destino</label>
            <input
              type="text"
              readOnly
              value="https://api.seusite.com/escalepay-webhook"
              className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-neutral-400"
            />
          </div>
        </div>

        {/* Logs */}
        <div className="pt-3 border-t border-[#142318] space-y-2">
          <h4 className="text-xs font-bold text-neutral-300">Histórico de Disparos Recentes</h4>
          <div className="space-y-2">
            {webhookLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#0c140e] border border-[#16251b] text-xs font-mono flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  <span className="font-bold text-white">{log.event}</span>
                  <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
                </div>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
