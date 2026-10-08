import React from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  LayoutDashboard,
  Users,
  Layers,
  Receipt,
  Repeat,
  Sparkles,
  Code2,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, metrics, setIsCheckoutSimulatorOpen } = useBilling();

  const navItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'subscribers', label: 'Assinantes & CRM', icon: Users },
    { id: 'plans', label: 'Planos & Preços', icon: Layers },
    { id: 'invoices', label: 'Cobranças & Faturas', icon: Receipt },
    { id: 'dunning', label: 'Smart Dunning (IA)', icon: Sparkles, highlight: '83% recup.' },
    { id: 'checkout_builder', label: 'Checkout & Links', icon: Repeat },
    { id: 'developers', label: 'Webhooks & API', icon: Code2 },
  ];

  return (
    <aside className="w-64 border-r border-[#142319] bg-[#070b09] flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-4rem)]">
      {/* Navigation list */}
      <div className="p-4 space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500/70 px-3">
            Gestão Recorrente
          </span>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#0c140f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-400' : 'text-neutral-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {item.highlight}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* PIX Recorrente Highlight Box */}
        <div className="p-3.5 rounded-xl bg-[#0c140f] border border-emerald-900/40 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PIX Automático Ativo</span>
          </div>
          <p className="text-neutral-400 text-[11px] leading-relaxed">
            Débito em conta sem fricção mensal. Taxa padrão fixada em apenas 0.99%.
          </p>
          <button
            onClick={() => setIsCheckoutSimulatorOpen(true)}
            className="mt-2.5 text-[11px] text-emerald-300 hover:text-emerald-200 flex items-center gap-1 font-medium"
          >
            Ver fluxo do cliente
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer Account & Status info */}
      <div className="p-4 border-t border-[#142319] space-y-3">
        <div className="px-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>MRR Atual</span>
            <span className="text-white font-mono font-semibold tabular-nums">
              {formatCurrency(metrics.mrr)}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
            <span>Status Gateway</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Operacional
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0a100c] border border-[#142319] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs">
            TK
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-neutral-200 truncate">Takto Pay Ltda</p>
            <p className="text-[10px] text-neutral-500 font-mono truncate">48.910.112/0001-90</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
