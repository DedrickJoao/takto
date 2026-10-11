import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Product } from '../../types/billing';
import { formatCurrency } from '../../utils/formatters';
import {
  Package,
  Plus,
  ExternalLink,
  Copy,
  Check,
  MoreVertical,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Tag,
  Search,
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const {
    products,
    toggleProductStatus,
    deleteProduct,
    setIsNewProductModalOpen,
    setSelectedProductForCheckout,
    setIsCheckoutSimulatorOpen,
    addToast,
  } = useBilling();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'SaaS & Assinaturas', 'Mentoria & Consultoria', 'Treinamento Online', 'E-books Digitais', 'Software & Ferramentas'];

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleCopyLink = (prod: Product) => {
    navigator.clipboard?.writeText(prod.checkoutUrl);
    setCopiedId(prod.id);
    addToast({
      type: 'info',
      title: 'Link Copiado!',
      message: `Link de checkout direto de "${prod.name}" copiado para a área de transferência.`,
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleTestCheckout = (prod: Product) => {
    setSelectedProductForCheckout(prod);
    setIsCheckoutSimulatorOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Meus Produtos</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
              {products.length} cadastrados
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Gerencie seus infoprodutos, assinaturas, SaaS e links de checkout transparente de alta conversão
          </p>
        </div>

        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Criar Produto</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#09110c] border border-[#162319]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar produto por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#008060] text-white font-semibold'
                  : 'bg-[#0c140e] text-neutral-400 hover:text-white border border-[#16251b]'
              }`}
            >
              {cat === 'all' ? 'Todas categorias' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 shadow-sm hover:border-[#1e3424] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#101b13] border border-[#182a1d] text-[10px] font-semibold text-[#10b981]">
                  {prod.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleProductStatus(prod.id)}
                    className="cursor-pointer"
                    title={prod.status === 'active' ? 'Pausar produto' : 'Ativar produto'}
                  >
                    {prod.status === 'active' ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                        Pausado
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Price and sales stats */}
              <div className="pt-2 border-t border-[#142318] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Preço</p>
                  <p className="text-base font-extrabold text-white">
                    {formatCurrency(prod.price, prod.currency)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Vendas</p>
                  <p className="text-xs font-bold text-neutral-300">
                    {prod.salesCount} vendas (MT {prod.revenue.toFixed(2)})
                  </p>
                </div>
              </div>

              {/* Order Bump Badge if exists */}
              {prod.orderBump && prod.orderBump.enabled && (
                <div className="p-2 rounded-lg bg-[#0e1811] border border-[#1b2b1f] text-[11px] text-neutral-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">
                    Order Bump ativo: <strong>{prod.orderBump.name}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#142318] flex items-center gap-2">
              <button
                onClick={() => handleCopyLink(prod)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#0c140e] hover:bg-[#121f15] border border-[#18271c] text-xs font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === prod.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10b981]" />
                    <span className="text-[#10b981]">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleTestCheckout(prod)}
                className="py-1.5 px-3 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95 cursor-pointer"
                title="Testar checkout deste produto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Testar</span>
              </button>

              <button
                onClick={() => deleteProduct(prod.id)}
                className="p-1.5 rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors cursor-pointer"
                title="Excluir produto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
