import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { PlanInterval } from '../../types/billing';
import { X, Layers, Plus } from 'lucide-react';

export const NewPlanModal: React.FC = () => {
  const { isNewPlanModalOpen, setIsNewPlanModalOpen, createPlan } = useBilling();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('149.00');
  const [interval, setInterval] = useState<PlanInterval>('month');
  const [trialDays, setTrialDays] = useState('7');
  const [features, setFeatures] = useState('Acesso completo à plataforma, Suporte via WhatsApp, Atualizações automáticas');

  if (!isNewPlanModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    createPlan({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description: description || 'Plano de assinatura recorrente TAKTO.',
      price: parseFloat(price) || 97,
      interval,
      trialDays: parseInt(trialDays, 10) || 0,
      features: features.split(',').map((f) => f.trim()).filter(Boolean),
    });

    setIsNewPlanModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-[#e1e3e5] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#e1e3e5] flex items-center justify-between bg-[#f7f7f8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e3f1df] border border-[#aee9d1] flex items-center justify-center text-[#004c3f]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#202223]">Criar Novo Plano Recorrente</h2>
              <p className="text-[11px] text-[#6d7175]">Configure a precificação e ciclo de faturamento</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewPlanModalOpen(false)}
            className="p-1.5 text-[#6d7175] hover:text-[#202223] rounded-lg hover:bg-[#edeeef] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#4a4d50] font-medium">Nome do Plano *</label>
            <input
              type="text"
              required
              placeholder="Ex: Comunidade VIP Recorrente"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#4a4d50] font-medium">Descrição Curta</label>
            <input
              type="text"
              placeholder="Ex: Acesso contínuo ao conteúdo exclusivo e mentorias mensais"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[#4a4d50] font-medium">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] font-mono focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#4a4d50] font-medium">Ciclo</label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value as PlanInterval)}
                className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060]"
              >
                <option value="month">Mensal</option>
                <option value="quarter">Trimestral</option>
                <option value="semester">Semestral</option>
                <option value="year">Anual</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[#4a4d50] font-medium">Trial (Dias)</label>
              <input
                type="number"
                min="0"
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] font-mono focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#4a4d50] font-medium">Benefícios / Features (separados por vírgula)</label>
            <textarea
              rows={2}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#e1e3e5]">
            <button
              type="button"
              onClick={() => setIsNewPlanModalOpen(false)}
              className="px-4 py-2 text-[#6d7175] hover:text-[#202223] rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Salvar Plano
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
