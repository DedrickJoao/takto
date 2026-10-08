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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0a100c] border border-[#1b3123] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#142319] flex items-center justify-between bg-[#070b09]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Criar Novo Plano Recorrente</h2>
              <p className="text-[11px] text-neutral-400">Configure a precificação e ciclo de faturamento</p>
            </div>
          </div>

          <button
            onClick={() => setIsNewPlanModalOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#121f17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Nome do Plano *</label>
            <input
              type="text"
              required
              placeholder="Ex: Comunidade VIP Recorrente"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Descrição Curta</label>
            <input
              type="text"
              placeholder="Ex: Acesso contínuo ao conteúdo exclusivo e mentorias mensais"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Ciclo</label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value as PlanInterval)}
                className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="month">Mensal</option>
                <option value="quarter">Trimestral</option>
                <option value="semester">Semestral</option>
                <option value="year">Anual</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Trial (Dias)</label>
              <input
                type="number"
                min="0"
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 font-medium">Benefícios / Features (separados por vírgula)</label>
            <textarea
              rows={2}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full px-3 py-2 bg-[#060907] border border-[#16271c] rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#142319]">
            <button
              type="button"
              onClick={() => setIsNewPlanModalOpen(false)}
              className="px-4 py-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              Salvar Plano
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
