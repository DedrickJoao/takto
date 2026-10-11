import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  Menu,
  ChevronDown,
  Crown,
  Bell,
  RefreshCw,
  ExternalLink,
  User,
  LogOut,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedProductId,
    setSelectedProductId,
    products,
    metrics,
    activeCurrency,
    setIsLevelModalOpen,
    isSandbox,
    setIsSandbox,
    setIsCheckoutSimulatorOpen,
  } = useBilling();

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const periods = [
    'Hoje',
    'Ontem',
    'Últimos 7 dias',
    'Últimos 30 dias',
    'Este mês',
    'Todo o período',
  ];

  const currentProductName =
    selectedProductId === 'all'
      ? 'Todos os produtos'
      : products.find((p) => p.id === selectedProductId)?.name || 'Todos os produtos';

  return (
    <header className="h-16 border-b border-[#16201a] bg-[#080d0a] sticky top-0 z-30 px-3 md:px-6 flex items-center justify-between shadow-sm">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#121a14] md:hidden cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* User avatar bubble AA */}
        <div className="w-8 h-8 rounded-full bg-[#008060] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm ring-2 ring-[#008060]/30">
          AA
        </div>

        {/* Brand in mobile / tablet */}
        <div className="hidden sm:block md:hidden">
          <span className="font-bold text-sm tracking-tight text-white">TAKTO</span>
        </div>
      </div>

      {/* Right controls matching EscalePay overview header */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Filter: Todos os produtos */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProductDropdownOpen(!isProductDropdownOpen);
              setIsPeriodDropdownOpen(false);
              setIsProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1b261f] bg-[#0c140e] text-xs font-medium text-neutral-300 hover:text-white hover:border-[#2a3c30] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#008060]"></span>
            <span className="max-w-[130px] truncate">{currentProductName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {isProductDropdownOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-56 rounded-xl bg-[#0f1712] border border-[#1e2b22] shadow-xl py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  setSelectedProductId('all');
                  setIsProductDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-[#152219] flex items-center justify-between cursor-pointer ${
                  selectedProductId === 'all' ? 'text-[#10b981] font-semibold bg-[#111c15]' : 'text-neutral-300'
                }`}
              >
                <span>Todos os produtos (6)</span>
                {selectedProductId === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>}
              </button>
              <div className="h-px bg-[#19241c] my-1"></div>
              {products.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setIsProductDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-[#152219] flex items-center justify-between truncate cursor-pointer ${
                    selectedProductId === prod.id
                      ? 'text-[#10b981] font-semibold bg-[#111c15]'
                      : 'text-neutral-300'
                  }`}
                >
                  <span className="truncate">{prod.name}</span>
                  <span className="text-[10px] text-neutral-500 shrink-0 ml-2">
                    {prod.price} {prod.currency}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter: Período */}
        <div className="relative">
          <button
            onClick={() => {
              setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
              setIsProductDropdownOpen(false);
              setIsProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1b261f] bg-[#0c140e] text-xs font-medium text-neutral-300 hover:text-white hover:border-[#2a3c30] transition-colors cursor-pointer"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {isPeriodDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0f1712] border border-[#1e2b22] shadow-xl py-1.5 z-50 text-xs">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPeriod(p);
                    setIsPeriodDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-[#152219] cursor-pointer ${
                    selectedPeriod === p ? 'text-[#10b981] font-semibold bg-[#111c15]' : 'text-neutral-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gamification Level Button with Mini Progress Bar */}
        <button
          onClick={() => setIsLevelModalOpen(true)}
          className="group relative flex flex-col items-start px-2.5 py-1 rounded-lg border border-[#233127] bg-[#0d1610] hover:bg-[#121e16] hover:border-[#324538] transition-all cursor-pointer"
          title="Ver níveis de premiação e faturamento"
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-neutral-300 hidden sm:inline">
              {metrics.level.currentLevel}
            </span>
            <span className="font-bold text-[#10b981]">
              MZN {metrics.availableBalance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
            </span>
            <ChevronDown className="w-3 h-3 text-neutral-400 ml-0.5" />
          </div>
          {/* Mini progress line under level */}
          <div className="w-full h-1 bg-[#1a261e] rounded-full mt-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-[#10b981] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, metrics.level.progressPercentage)}%` }}
            ></div>
          </div>
        </button>

        {/* Sandbox / Simular Checkout Rápido */}
        <button
          onClick={() => setIsCheckoutSimulatorOpen(true)}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#008060] hover:bg-[#007053] text-white text-xs font-medium shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Testar Checkout</span>
        </button>

        {/* Right user avatar with menu */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
              setIsProductDropdownOpen(false);
              setIsPeriodDropdownOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-[#008060] hover:ring-2 hover:ring-[#10b981] flex items-center justify-center text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            aria-label="Perfil Alberto Almeida"
          >
            AA
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0f1712] border border-[#1e2b22] shadow-2xl py-2 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-[#1b261f]">
                <p className="font-semibold text-white">Alberto Almeida</p>
                <p className="text-[11px] text-neutral-400 truncate">albertoalmeida01@gmail.com</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  <span className="text-[10px] text-neutral-400">Conta Verificada • Vendedor</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsLevelModalOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-neutral-300 hover:bg-[#152219] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Níveis de Faturamento</span>
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutSimulatorOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-neutral-300 hover:bg-[#152219] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Simulador de Checkout</span>
                </button>
                <button
                  onClick={() => setIsSandbox(!isSandbox)}
                  className="w-full text-left px-3.5 py-2 text-neutral-300 hover:bg-[#152219] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Modo Sandbox</span>
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      isSandbox ? 'bg-amber-950/60 text-amber-300 border border-amber-800' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {isSandbox ? 'Ativo' : 'Off'}
                  </span>
                </button>
              </div>

              <div className="border-t border-[#1b261f] pt-1">
                <button
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 text-rose-400 hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair da conta</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
