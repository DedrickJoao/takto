import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { CurrencyCode } from '../../types/billing';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  ShoppingCart,
  TrendingUp,
  Percent,
  ChevronDown,
  Sparkles,
  BarChart3,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    activeCurrency,
    setActiveCurrency,
    selectedPeriod,
    metrics,
    isBalanceVisible,
    setIsBalanceVisible,
    setIsLevelModalOpen,
    setIsReportModalOpen,
    utmData,
    currencyRevenue,
    setIsSupportChatOpen,
    setIsCheckoutSimulatorOpen,
  } = useBilling();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCurrencyFilter, setSelectedCurrencyFilter] = useState('+7 moedas');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [ticketDropdownOpen, setTicketDropdownOpen] = useState(false);

  const currencyTabs: CurrencyCode[] = ['MZN', 'ZAR', 'BRL', 'USD', 'EUR', 'INR', 'AOA'];

  const slides = [
    {
      id: 1,
      badge: 'NOVIDADE • 01/02',
      title: 'Fature 20k e ganhe uma pulseira VIP',
      description:
        'Com os primeiros 20k de faturamento ganhas uma pulseira que dá acesso ao nosso evento VIP em Dezembro com grandes players do mercado...',
      ctaText: 'Ver níveis de faturamento',
      action: () => setIsLevelModalOpen(true),
      imageOverlay: 'from-black/80 via-black/40 to-transparent',
    },
    {
      id: 2,
      badge: 'NOVIDADE • 02/02',
      title: 'Checkout Otimizado com M-Pesa & PIX',
      description:
        'Aumente sua taxa de conversão em até 38% com pagamentos instantâneos móveis, 1-clique e recuperação automática de vendas perdidas.',
      ctaText: 'Testar Checkout Agora',
      action: () => setIsCheckoutSimulatorOpen(true),
      imageOverlay: 'from-emerald-950/90 via-black/50 to-transparent',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Row: Hero Banner & Novidades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hero Card: Bem-vindo de volta Alberto (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#0c1611] via-[#09130d] to-[#070f0a] border border-[#18281d] p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 space-y-4">
            {/* Status header */}
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                👋 Bem-vindo de volta
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="text-neutral-500 text-[11px]">atualizado agora</span>
            </div>

            {/* Greeting */}
            <h2 className="text-2xl font-bold text-white tracking-tight">Olá, Alberto</h2>

            {/* Currency Selector Pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {currencyTabs.map((cur) => {
                const isActive = activeCurrency === cur;
                return (
                  <button
                    key={cur}
                    onClick={() => setActiveCurrency(cur)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#008060] text-white shadow-sm ring-1 ring-[#10b981]/50'
                        : 'bg-[#101b13] text-neutral-400 hover:text-white hover:bg-[#15241a] border border-[#19271c]'
                    }`}
                  >
                    {cur}
                  </button>
                );
              })}
            </div>

            {/* Saldo Disponível para Saque */}
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400 font-medium">Saldo disponível para saque</p>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#10b981] hover:text-emerald-300 transition-colors cursor-pointer group"
                >
                  <span>Ver relatório</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-sm font-semibold text-neutral-400">
                  {activeCurrency === 'MZN'
                    ? 'MT'
                    : activeCurrency === 'BRL'
                    ? 'R$'
                    : activeCurrency === 'USD'
                    ? '$'
                    : activeCurrency}
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {isBalanceVisible
                    ? metrics.availableBalance.toLocaleString('pt-MZ', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : '••••••'}
                </span>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#132016] transition-colors cursor-pointer ml-1"
                  title={isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
                >
                  {isBalanceVisible ? (
                    <Eye className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom stats row inside hero */}
          <div className="pt-6 border-t border-[#142318] mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 sm:gap-8">
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Hoje
                </p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {metrics.todayRevenue.toFixed(2)}
                </p>
              </div>
              <div className="h-6 w-px bg-[#142318]"></div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Ontem
                </p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {metrics.yesterdayRevenue.toFixed(2)}
                </p>
              </div>
              <div className="h-6 w-px bg-[#142318]"></div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Este Mês
                </p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  {metrics.monthRevenue.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="sm:hidden flex items-center gap-1.5 text-xs font-semibold text-[#10b981] cursor-pointer"
            >
              <span>Ver relatório</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subtle background glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#008060]/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Novidade / Gamificação VIP Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#09110c] border border-[#18281d] overflow-hidden shadow-xl flex flex-col justify-between relative group">
          {/* Card header with slide counter */}
          <div className="p-4 flex items-center justify-between border-b border-[#142318] bg-[#0c1611]/80 backdrop-blur-sm z-10">
            <span className="text-[11px] font-bold text-amber-400 tracking-wider">
              {slides[currentSlide].badge}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                }
                className="w-6 h-6 rounded-md bg-[#121e16] hover:bg-[#1a2b20] text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
                }
                className="w-6 h-6 rounded-md bg-[#121e16] hover:bg-[#1a2b20] text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Próximo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsLevelModalOpen(true)}
                className="w-6 h-6 rounded-md bg-[#121e16] hover:bg-[#1a2b20] text-neutral-400 hover:text-white flex items-center justify-center transition-colors ml-1 cursor-pointer"
                title="Expandir detalhes"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Banner visual representation with presenter image / VIP concept */}
          <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-t from-[#09110c] to-[#122017] flex items-center justify-center">
            {/* Visual background simulation of the video shown in EscalePay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/30 via-emerald-950/40 to-[#09110c]"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <div
                onClick={slides[currentSlide].action}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 cursor-pointer mb-2"
              >
                <Play className="w-5 h-5 ml-0.5 text-amber-400 fill-amber-400" />
              </div>
              <span className="text-[11px] font-medium text-neutral-300 uppercase tracking-wider">
                Exclusivo para Criadores & Vendedores
              </span>
            </div>

            {/* Video duration badge */}
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-neutral-300">
              01:45
            </span>
          </div>

          {/* Content & Call to action */}
          <div className="p-5 space-y-3 bg-[#08100b] border-t border-[#142318]">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
              {slides[currentSlide].title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {slides[currentSlide].description}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={slides[currentSlide].action}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#10b981] hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>{slides[currentSlide].ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Progress bar indicator */}
              <div className="flex gap-1.5">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all ${
                      idx === currentSlide ? 'w-5 bg-[#10b981]' : 'w-2 bg-[#1a2b20]'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 3 KPI Metric Cards matching EscalePay */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total de Vendas */}
        <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 shadow-sm space-y-3 hover:border-[#1e3323] transition-colors">
          <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-[#10b981]">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400">Total de Vendas</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {metrics.totalSales}
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal">Sem dados no período</p>
        </div>

        {/* Taxa de Conversão */}
        <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 shadow-sm space-y-3 hover:border-[#1e3323] transition-colors">
          <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400">Taxa de Conversão</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {metrics.conversionRate.toFixed(1)}%
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal">Sem dados no período</p>
        </div>

        {/* Taxa de Abandono */}
        <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 shadow-sm space-y-3 hover:border-[#1e3323] transition-colors">
          <div className="w-9 h-9 rounded-xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400">Taxa de Abandono</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {metrics.abandonmentRate.toFixed(1)}%
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal">Sem dados no período</p>
        </div>
      </div>

      {/* Row 3: Receita por moeda & Ticket médio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Receita por moeda */}
        <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white tracking-tight">Receita por moeda</h4>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1 rounded-lg border border-[#1a281e] bg-[#0d1610] text-[11px] text-neutral-300 font-medium flex items-center gap-1.5 hover:text-white cursor-pointer"
              >
                <span>{selectedCurrencyFilter}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <span className="px-2.5 py-1 rounded-lg border border-[#1a281e] bg-[#0d1610] text-[11px] text-neutral-400 font-medium">
                Hoje
              </span>
            </div>
          </div>

          {/* Breakdown cards / state */}
          <div className="space-y-2.5 pt-2">
            {currencyRevenue.map((item) => {
              const percentage =
                metrics.availableBalance > 0
                  ? (item.amount / metrics.availableBalance) * 100
                  : 0;
              return (
                <div
                  key={item.currency}
                  className="p-3 rounded-xl bg-[#0c140e] border border-[#142016] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#142217] flex items-center justify-center text-xs font-bold text-neutral-300">
                      {item.currency}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {item.currency === 'MZN'
                          ? 'Meticais Moçambique'
                          : item.currency === 'BRL'
                          ? 'Real Brasileiro'
                          : item.currency === 'USD'
                          ? 'Dólar Americano'
                          : item.currency === 'ZAR'
                          ? 'Rand Sul-Africano'
                          : item.currency === 'EUR'
                          ? 'Euro'
                          : item.currency === 'AOA'
                          ? 'Kwanza Angolano'
                          : item.currency}
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {item.salesCount} {item.salesCount === 1 ? 'venda' : 'vendas'} registradas
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-white">
                      {item.symbol} {item.amount.toFixed(2)}
                    </p>
                    <div className="w-20 h-1 bg-[#152319] rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#10b981] rounded-full"
                        style={{ width: `${Math.max(percentage > 0 ? 10 : 0, percentage)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white tracking-tight">Ticket médio</h4>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg border border-[#1a281e] bg-[#0d1610] text-[11px] text-neutral-300 font-medium flex items-center gap-1.5">
                  <span>+7 moedas</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </span>

                <span className="px-2.5 py-1 rounded-lg border border-[#1a281e] bg-[#0d1610] text-[11px] text-neutral-400 font-medium">
                  Hoje
                </span>
              </div>
            </div>

            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#0d1811] border border-[#16251b] flex items-center justify-center text-neutral-500 mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-neutral-400">Sem dados no período</p>
              <p className="text-[11px] text-neutral-600 max-w-xs mt-1">
                O ticket médio consolidado por moeda será calculado automaticamente assim que novas vendas forem registradas.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#142016] flex items-center justify-between text-xs">
            <span className="text-neutral-400">Ticket Médio Estimado Geral</span>
            <span className="font-bold text-[#10b981]">MT 650,00</span>
          </div>
        </div>
      </div>

      {/* Row 4: Performance de UTMs matching EscalePay screenshot */}
      <div className="rounded-2xl bg-[#09110c] border border-[#162319] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">Performance de UTMs</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Rastreamento de campanhas de tráfego pago, criativos e canais de conversão
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutSimulatorOpen(true)}
            className="text-xs font-semibold text-[#10b981] hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Simular Conversão</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#162319] text-neutral-500 font-semibold text-[11px]">
                <th className="py-3 px-3">Source (Origem)</th>
                <th className="py-3 px-3">Medium</th>
                <th className="py-3 px-3">Campaign</th>
                <th className="py-3 px-3">Content</th>
                <th className="py-3 px-3 text-right">Cliques</th>
                <th className="py-3 px-3 text-right">Vendas</th>
                <th className="py-3 px-3 text-right">Receita</th>
                <th className="py-3 px-3 text-right">Taxa Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121c14]">
              {utmData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#0c140e] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                    <span>{row.source}</span>
                  </td>
                  <td className="py-3 px-3 text-neutral-300 font-mono text-[11px]">
                    {row.medium}
                  </td>
                  <td className="py-3 px-3 text-neutral-300 font-mono text-[11px]">
                    {row.campaign}
                  </td>
                  <td className="py-3 px-3 text-neutral-400 font-mono text-[11px]">
                    {row.content}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-neutral-300">
                    {formatNumber(row.clicks)}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-white">
                    {row.sales}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">
                    {row.revenue > 0 ? `MT ${row.revenue.toFixed(2)}` : 'MT 0,00'}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-neutral-300">
                    {row.conversion > 0 ? `${row.conversion}%` : '0.0%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating support chat button in bottom right matching EscalePay */}
      <button
        onClick={() => setIsSupportChatOpen(true)}
        className="fixed bottom-6 right-6 w-13 h-13 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-2xl flex items-center justify-center z-40 transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-blue-500/20"
        aria-label="Abrir suporte EscalePay"
        title="Falar com o suporte EscalePay"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
