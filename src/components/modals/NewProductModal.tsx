import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { CurrencyCode, ProductType } from '../../types/billing';
import { X, Package, Plus, DollarSign, Tag, Layers, Check } from 'lucide-react';

export const NewProductModal: React.FC = () => {
  const { isNewProductModalOpen, setIsNewProductModalOpen, createProduct } = useBilling();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('490');
  const [currency, setCurrency] = useState<CurrencyCode>('MZN');
  const [type, setType] = useState<ProductType>('single');
  const [category, setCategory] = useState('E-books Digitais');
  const [enableOrderBump, setEnableOrderBump] = useState(false);
  const [bumpName, setBumpName] = useState('Acesso Vitalício + Gravações Bônus');
  const [bumpPrice, setBumpPrice] = useState('190');

  if (!isNewProductModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    createProduct({
      name,
      slug: '',
      type,
      category,
      price: parseFloat(price) || 0,
      currency,
      status: 'active',
      description,
      orderBump: enableOrderBump
        ? {
            name: bumpName,
            price: parseFloat(bumpPrice) || 0,
            enabled: true,
          }
        : undefined,
    });

    setIsNewProductModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-[#09110c] border border-[#1a2c1f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#162319] flex items-center justify-between bg-[#0c1611]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-[#10b981]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Criar Novo Produto</h3>
              <p className="text-xs text-neutral-400">
                Cadastre infoprodutos, cursos, SaaS ou assinaturas recorrentes com checkout automático
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNewProductModalOpen(false)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#142217] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5">Nome do Produto</label>
            <input
              type="text"
              placeholder="Ex: Treinamento Tráfego de Alta Conversão"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1.5">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="490.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                required
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-semibold mb-1.5">Moeda</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="MZN">MZN - Metical (Moçambique)</option>
                <option value="BRL">BRL - Real (Brasil)</option>
                <option value="USD">USD - Dólar Americano</option>
                <option value="ZAR">ZAR - Rand (África do Sul)</option>
                <option value="EUR">EUR - Euro</option>
                <option value="AOA">AOA - Kwanza (Angola)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1.5">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="SaaS & Assinaturas">SaaS & Assinaturas</option>
                <option value="Treinamento Online">Treinamento Online / Curso</option>
                <option value="Mentoria & Consultoria">Mentoria & Consultoria</option>
                <option value="E-books Digitais">E-books Digitais</option>
                <option value="Comunidade Exclusiva">Comunidade Exclusiva</option>
                <option value="Software & Ferramentas">Software & Ferramentas</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-300 font-semibold mb-1.5">Modelo de Cobrança</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ProductType)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              >
                <option value="single">Pagamento Único</option>
                <option value="subscription">Assinatura Recorrente (Mensal)</option>
                <option value="saas">Licença de Software (SaaS)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5">Descrição Curta</label>
            <textarea
              rows={2}
              placeholder="Descreva os principais benefícios que o cliente receberá após a compra..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
            />
          </div>

          {/* Order Bump Option */}
          <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Adicionar Order Bump (Oferta de 1-Clique no Checkout)
              </span>
              <input
                type="checkbox"
                checked={enableOrderBump}
                onChange={(e) => setEnableOrderBump(e.target.checked)}
                className="w-4 h-4 accent-[#008060]"
              />
            </label>

            {enableOrderBump && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#16251b]">
                <input
                  type="text"
                  placeholder="Nome do Order Bump"
                  value={bumpName}
                  onChange={(e) => setBumpName(e.target.value)}
                  className="bg-[#09110c] border border-[#1b2b1f] rounded-lg py-1.5 px-2.5 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Preço (MT)"
                  value={bumpPrice}
                  onChange={(e) => setBumpPrice(e.target.value)}
                  className="bg-[#09110c] border border-[#1b2b1f] rounded-lg py-1.5 px-2.5 text-xs text-white"
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#142318] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewProductModalOpen(false)}
              className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#008060] hover:bg-[#007053] text-white font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              Publicar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
