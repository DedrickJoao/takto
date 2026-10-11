import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Target, Plus, Tag, Check, Copy, Calendar, Percent } from 'lucide-react';

export const CampaignsView: React.FC = () => {
  const { campaigns, createCampaign, toggleCampaignStatus, products, addToast } = useBilling();

  const [isCreating, setIsCreating] = useState(false);
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('15');
  const [productName, setProductName] = useState(products[0]?.name || 'Todos os produtos');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    createCampaign({
      name: `Campanha ${code.toUpperCase()}`,
      code: code.toUpperCase(),
      discountType: 'percentage',
      discountValue: parseFloat(discountValue) || 10,
      productName,
      expiresAt: '2026-12-31',
    });

    setCode('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Campanhas & Cupons</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
              {campaigns.length} ativas
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Crie cupons promocionais para alavancar suas conversões em datas comemorativas e lançamentos
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2.5 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Criar Cupom</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4">
          <h3 className="text-sm font-bold text-white">Novo Cupom de Desconto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Código do Cupom</label>
              <input
                type="text"
                placeholder="EX: BLACKFRIDAY"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white uppercase focus:outline-none focus:border-[#10b981]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Desconto (%)</label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Produto Válido</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="Todos os produtos">Todos os produtos</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 rounded-xl text-neutral-400 hover:text-white text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#008060] text-white font-bold text-xs cursor-pointer"
            >
              Ativar Cupom
            </button>
          </div>
        </form>
      )}

      {/* Campaigns list */}
      <div className="space-y-3">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="p-4 rounded-2xl bg-[#09110c] border border-[#162319] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-xs font-mono font-bold text-[#10b981]">
                  {camp.code}
                </span>
                <span className="text-xs font-bold text-white">{camp.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full ${
                    camp.active ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {camp.active ? 'Ativo' : 'Pausado'}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Desconto de <strong>{camp.discountValue}%</strong> para {camp.productName} • {camp.usesCount} usos registrados
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(camp.code);
                  addToast({
                    type: 'info',
                    title: 'Código Copiado',
                    message: `Cupom ${camp.code} pronto para divulgação.`,
                  });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#0c140e] hover:bg-[#121f15] border border-[#18271c] text-xs text-neutral-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copiar</span>
              </button>
              <button
                onClick={() => toggleCampaignStatus(camp.id)}
                className="px-3 py-1.5 rounded-xl bg-[#0c140e] hover:bg-[#121f15] border border-[#18271c] text-xs text-neutral-300 cursor-pointer"
              >
                {camp.active ? 'Pausar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
