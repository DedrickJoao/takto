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
    <header className="h-14 border-b border-[#e1e3e5] bg-white sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      {/* Zone 1: Single element brand mark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-7 h-7 rounded-md bg-[#008060] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="font-bold text-xs tracking-wider">T</span>
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#202223]">
              TAKTO
            </span>
          </div>
        </button>

        {/* Environment toggle */}
        <div className="hidden sm:flex items-center ml-2 pl-3 border-l border-[#e1e3e5] text-xs">
          <button
            onClick={() => setIsSandbox(!isSandbox)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer ${
              isSandbox
                ? 'bg-[#fff5ea] text-[#b95000] border-[#fed3d1] hover:bg-[#ffe8d6]'
                : 'bg-[#e3f1df] text-[#004c3f] border-[#aee9d1] hover:bg-[#d4edd0]'
            }`}
            title="Alternar entre ambiente Live e Sandbox"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSandbox ? 'bg-[#b95000]' : 'bg-[#008060]'
              }`}
            />
            <span>{isSandbox ? 'Modo Sandbox' : 'Produção'}</span>
            <RefreshCw className="w-3 h-3 ml-0.5 opacity-60" />
          </button>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#6d7175]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'overview' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'subscribers' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Assinantes
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'plans' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Planos
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'invoices' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Cobranças
        </button>
        <button
          onClick={() => setActiveTab('dunning')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'dunning' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Smart Dunning
        </button>
        <button
          onClick={() => setActiveTab('checkout_builder')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'checkout_builder' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Checkout Transparente
        </button>
        <button
          onClick={() => setActiveTab('developers')}
          className={`transition-colors hover:text-[#202223] py-4 cursor-pointer ${
            activeTab === 'developers' ? 'text-[#008060] font-semibold border-b-2 border-[#008060]' : ''
          }`}
        >
          Webhooks & API
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsCheckoutSimulatorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#202223] bg-white hover:bg-[#f6f6f7] border border-[#c9cccf] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          title="Abrir o checkout como se fosse um cliente comprando"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-[#6d7175]" />
          <span className="hidden sm:inline">Simular</span> Checkout
        </button>

        <button
          onClick={() => setIsNewSubscriberModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Assinatura</span>
        </button>
      </div>
    </header>
  );
};
