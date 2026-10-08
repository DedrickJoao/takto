import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { ShoppingCart, UserPlus, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    isSandbox,
    setIsSandbox,
    setIsCheckoutSimulatorOpen,
    setIsNewSubscriberModalOpen,
    activeTab,
    setActiveTab,
  } = useBilling();

  return (
    <header className="h-16 border-b border-[#142319] bg-[#070b09]/95 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Zone 1: Single element brand mark */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <span className="font-extrabold text-sm tracking-wider">T</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              TAKTO
            </span>
          </div>
        </button>

        {/* Environment toggle */}
        <div className="hidden sm:flex items-center ml-2 pl-3 border-l border-[#16271c] text-xs">
          <button
            onClick={() => setIsSandbox(!isSandbox)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium transition-all ${
              isSandbox
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
            title="Alternar entre ambiente Live e Sandbox"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSandbox ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span>{isSandbox ? 'Modo Sandbox' : 'Ambiente Produção'}</span>
            <RefreshCw className="w-3 h-3 ml-1 opacity-60" />
          </button>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-neutral-400">
        <button
          onClick={() => setActiveTab('overview')}
          className={`transition-colors hover:text-white ${
            activeTab === 'overview' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`transition-colors hover:text-white ${
            activeTab === 'subscribers' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Assinantes
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`transition-colors hover:text-white ${
            activeTab === 'plans' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Planos
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`transition-colors hover:text-white ${
            activeTab === 'invoices' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Cobranças
        </button>
        <button
          onClick={() => setActiveTab('dunning')}
          className={`transition-colors hover:text-white ${
            activeTab === 'dunning' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Smart Dunning
        </button>
        <button
          onClick={() => setActiveTab('checkout_builder')}
          className={`transition-colors hover:text-white ${
            activeTab === 'checkout_builder' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Checkout Transparente
        </button>
        <button
          onClick={() => setActiveTab('developers')}
          className={`transition-colors hover:text-white ${
            activeTab === 'developers' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Webhooks & API
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setIsCheckoutSimulatorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm hover:border-emerald-400"
          title="Abrir o checkout como se fosse um cliente comprando"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Simular</span> Checkout
        </button>

        <button
          onClick={() => setIsNewSubscriberModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-emerald-950"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Assinatura</span>
        </button>
      </div>
    </header>
  );
};
