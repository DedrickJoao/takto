import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { PaymentMethodType } from '../../types/billing';
import { X, UserPlus, CreditCard, QrCode } from 'lucide-react';

export const NewSubscriberModal: React.FC = () => {
  const {
    isNewSubscriberModalOpen,
    setIsNewSubscriberModalOpen,
    plans,
    addSubscriber,
  } = useBilling();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [planId, setPlanId] = useState(plans[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix_recurrent');

  if (!isNewSubscriberModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addSubscriber({
      name,
      email,
      phone: phone || '(11) 98000-0000',
      document: document || '000.000.000-00',
      planId,
      paymentMethod,
      cardLast4: paymentMethod === 'credit_card' ? '1234' : undefined,
      cardBrand: 'visa',
    });

    setIsNewSubscriberModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0a100c] border border-[#1b3123] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#142319] flex items-center justify-between bg-[#070b09]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Nova Assinatura Manual</h2>
              <p className="text-[11px] text-neutral-400">Cadastre um cliente diretamente na plataforma</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewSubscriberModalOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#121f17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Nome do Assinante *</label>
            <input
              type="text"
              required
              placeholder="Ex: Gabriela Medeiros"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Email *</label>
              <input
                type="email"
                required
                placeholder="gabriela@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Telefone / WhatsApp</label>
              <input
                type="text"
                placeholder="(11) 98765-4321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">CPF ou CNPJ</label>
            <input
              type="text"
              placeholder="123.456.789-00"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Plano Contratado *</label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - R$ {p.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1.5 pt-1">
            <label className="text-neutral-400 font-medium">Método de Cobrança</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix_recurrent')}
                className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'pix_recurrent'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                    : 'bg-[#060907] border-[#16271c] text-neutral-400'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>PIX Automático</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'credit_card'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                    : 'bg-[#060907] border-[#16271c] text-neutral-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito</span>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#142319]">
            <button
              type="button"
              onClick={() => setIsNewSubscriberModalOpen(false)}
              className="px-4 py-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              Confirmar Assinatura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
