import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  LayoutDashboard,
  TrendingUp,
  Boxes,
  ChevronDown,
  ChevronRight,
  Package,
  Target,
  Users2,
  UserPlus,
  Gift,
  RefreshCw,
  Wallet,
  Code2,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, products } = useBilling();
  const [isSaasExpanded, setIsSaasExpanded] = useState(true);

  return (
    <aside className="w-64 border-r border-[#16201a] bg-[#070b08] flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-4rem)] select-none">
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* Brand header matching EscalePay seller panel */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-lg bg-[#008060] flex items-center justify-center text-white shadow-md font-black text-sm tracking-tighter">
            E
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              TAKTO
            </h1>
            <p className="text-[11px] text-neutral-400 font-normal">Painel do vendedor</p>
          </div>
        </div>

        {/* Section 1: Dashboard */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-3">
            Dashboard
          </span>
          <nav className="mt-2 space-y-1">
            {/* Visão Geral */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#10b981]" />
              <span>Visão Geral</span>
            </button>

            {/* Métricas */}
            <button
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Métricas</span>
            </button>

            {/* SaaS with sub-items */}
            <div>
              <button
                onClick={() => setIsSaasExpanded(!isSaasExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-[#0f1712] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300">SaaS</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-purple-950/70 border border-purple-800 text-[10px] text-purple-300 font-semibold">
                    1
                  </span>
                </div>
                {isSaasExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              {isSaasExpanded && (
                <div className="pl-6 pr-1 mt-1 space-y-0.5 border-l border-[#16201a] ml-4">
                  <button
                    onClick={() => setActiveTab('saas_links')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      activeTab === 'saas_links'
                        ? 'text-[#10b981] font-semibold bg-[#0f1712]'
                        : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
                    }`}
                  >
                    <span className="truncate">Links de Pagamento</span>
                    <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1 py-0.5 rounded">
                      Em desenvolvimento
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('saas_builder')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      activeTab === 'saas_builder'
                        ? 'text-[#10b981] font-semibold bg-[#0f1712]'
                        : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
                    }`}
                  >
                    <span className="truncate">TaktoBuilder</span>
                    <span className="flex items-center gap-1 text-[9px] bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded-full border border-purple-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                      Novo
                    </span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Section 2: Vendas & marketing */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-3">
            Vendas & marketing
          </span>
          <nav className="mt-2 space-y-1">
            {/* Meus Produtos (6) */}
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Meus Produtos</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-[#121c15] text-neutral-300 text-[10px] font-semibold">
                {products.length}
              </span>
            </button>

            {/* Campanhas */}
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Campanhas</span>
            </button>

            {/* Afiliados */}
            <button
              onClick={() => setActiveTab('affiliates')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'affiliates'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <Users2 className="w-4 h-4" />
              <span>Afiliados</span>
            </button>

            {/* Seja Afiliado */}
            <button
              onClick={() => setActiveTab('become_affiliate')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'become_affiliate'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Seja Afiliado</span>
            </button>

            {/* Convidar Amigos */}
            <button
              onClick={() => setActiveTab('invite_friends')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'invite_friends'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Convidar Amigos</span>
              </div>
              <span className="flex items-center gap-1 text-[9px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Novo
              </span>
            </button>
          </nav>
        </div>

        {/* Section 3: Ferramentas & Carteira */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-3">
            Ferramentas
          </span>
          <nav className="mt-2 space-y-1">
            {/* Recuperação de Vendas */}
            <button
              onClick={() => setActiveTab('recovery')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'recovery'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recuperação de Vendas</span>
            </button>

            {/* Saques / Carteira */}
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'withdrawals'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Saques & Carteira</span>
            </button>

            {/* Configurações & API */}
            <button
              onClick={() => setActiveTab('developers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-[#008060]/20 text-[#10b981] font-semibold border border-[#008060]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-[#0f1712]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Integrações & API</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Profile Section matching EscalePay screenshot */}
      <div className="p-3 border-t border-[#16201a] bg-[#060a07]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#0f1712] transition-colors">
          <div className="w-9 h-9 rounded-full bg-[#008060] flex items-center justify-center text-white font-bold text-xs shrink-0 ring-2 ring-[#008060]/30">
            AA
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">Alberto Almeida</p>
            <p className="text-[11px] text-neutral-400 truncate">albertoalmeida01@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
