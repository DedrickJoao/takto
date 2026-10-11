import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  Users2,
  UserPlus,
  Flame,
  CheckCircle2,
  Share2,
  Copy,
  DollarSign,
  TrendingUp,
  Percent,
} from 'lucide-react';

export const AffiliatesView: React.FC<{ initialTab?: 'my_affiliates' | 'marketplace' }> = ({
  initialTab = 'my_affiliates',
}) => {
  const { affiliates, marketplaceProducts, toggleAffiliateProduct, addToast } = useBilling();
  const [activeTab, setActiveTab] = useState<'my_affiliates' | 'marketplace'>(initialTab);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{activeTab === 'my_affiliates' ? 'Gestão de Afiliados' : 'Mercado de Afiliação'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
              EscalePay Network
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {activeTab === 'my_affiliates'
              ? 'Controle os parceiros que vendem seus produtos e configure comissões automáticas'
              : 'Encontre produtos de alta conversão, afilie-se com 1 clique e ganhe comissões de até 60%'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#09110c] border border-[#162319]">
          <button
            onClick={() => setActiveTab('my_affiliates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'my_affiliates'
                ? 'bg-[#008060] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Meus Afiliados
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'marketplace'
                ? 'bg-[#008060] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Seja Afiliado (Vitrine)
          </button>
        </div>
      </div>

      {activeTab === 'my_affiliates' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#09110c] border border-[#162319]">
              <p className="text-xs text-neutral-400">Total de Afiliados Ativos</p>
              <p className="text-2xl font-bold text-white mt-1">
                {affiliates.filter((a) => a.status === 'approved').length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#09110c] border border-[#162319]">
              <p className="text-xs text-neutral-400">Vendas Geradas por Afiliados</p>
              <p className="text-2xl font-bold text-white mt-1">
                {affiliates.reduce((acc, a) => acc + a.salesCount, 0)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#09110c] border border-[#162319]">
              <p className="text-xs text-neutral-400">Comissões Pagas</p>
              <p className="text-2xl font-bold text-[#10b981] mt-1">
                MT {affiliates.reduce((acc, a) => acc + a.totalEarned, 0).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-3">
            <h3 className="text-sm font-bold text-white">Lista de Afiliados Credenciados</h3>
            <div className="space-y-2.5">
              {affiliates.map((aff) => (
                <div
                  key={aff.id}
                  className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{aff.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.2 rounded-full ${
                          aff.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {aff.status === 'approved' ? 'Aprovado' : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {aff.email} • {aff.phone}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Promovendo: <strong>{aff.productName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-[#10b981]">{aff.commissionRate}% de comissão</p>
                      <p className="text-[11px] text-neutral-400">
                        {aff.salesCount} vendas (MT {aff.totalEarned.toFixed(2)})
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToast({
                          type: 'info',
                          title: 'Link de Divulgação Enviado',
                          message: `Link exclusivo enviado para ${aff.name} via WhatsApp.`,
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#142217] hover:bg-[#1a2d1f] text-neutral-300 font-medium cursor-pointer"
                    >
                      Link Único
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Marketplace */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {marketplaceProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#1e3424] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-neutral-400 px-2 py-0.5 rounded-md bg-[#0e1711] border border-[#16251b]">
                    {prod.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    {prod.temperature}°C
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{prod.title}</h3>
                <p className="text-xs text-neutral-400">Produtor: {prod.producer}</p>

                <div className="pt-2 border-t border-[#142318] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase">Preço Final</span>
                    <p className="text-sm font-extrabold text-white">
                      MT {prod.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 uppercase">Sua Comissão ({prod.commissionRate}%)</span>
                    <p className="text-sm font-extrabold text-[#10b981]">
                      MT {prod.commissionAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleAffiliateProduct(prod.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-98 cursor-pointer ${
                  prod.isAffiliated
                    ? 'bg-[#121f15] border border-[#1d3523] text-[#10b981]'
                    : 'bg-[#008060] hover:bg-[#007053] text-white shadow-sm'
                }`}
              >
                {prod.isAffiliated ? 'Afiliado Ativo (Copiar Link)' : 'Afiliar-se Agora'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
