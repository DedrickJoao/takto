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
    <aside className="w-64 border-r border-[#e1e3e5] bg-[#f7f7f8] flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-3.5rem)]">
      {/* Navigation list */}
      <div className="p-3 space-y-5">
        <div>
          <span className="text-[11px] font-semibold text-[#6d7175] uppercase tracking-wider px-3">
            Gestão Recorrente
          </span>
          <nav className="mt-2 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#202223] font-semibold shadow-sm border border-[#e1e3e5]'
                      : 'text-[#4a4d50] hover:text-[#202223] hover:bg-[#edeeef]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#008060]' : 'text-[#6d7175]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] bg-[#e3f1df] text-[#004c3f] font-semibold px-1.5 py-0.5 rounded">
                      {item.highlight}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* PIX Recorrente Highlight Box */}
        <div className="p-3.5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm text-xs">
          <div className="flex items-center gap-2 text-[#008060] font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4 text-[#008060]" />
            <span>PIX Automático Ativo</span>
          </div>
          <p className="text-[#6d7175] text-[11px] leading-relaxed">
            Débito em conta sem fricção mensal. Taxa padrão fixada em apenas 0.99%.
          </p>
          <button
            onClick={() => setIsCheckoutSimulatorOpen(true)}
            className="mt-2.5 text-[11px] text-[#008060] hover:text-[#006e52] flex items-center gap-1 font-semibold cursor-pointer"
          >
            Ver fluxo do cliente
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer Account & Status info */}
      <div className="p-3 border-t border-[#e1e3e5] space-y-3 bg-[#f7f7f8]">
        <div className="px-2">
          <div className="flex items-center justify-between text-xs text-[#6d7175]">
            <span>MRR Atual</span>
            <span className="text-[#202223] font-semibold tabular-nums">
              {formatCurrency(metrics.mrr)}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6d7175] mt-1">
            <span>Status Gateway</span>
            <span className="flex items-center gap-1.5 text-[#008060] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#008060]"></span>
              Operacional
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-white border border-[#e1e3e5] shadow-sm flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#e3f1df] border border-[#aee9d1] flex items-center justify-center text-[#004c3f] font-bold text-xs">
            TK
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-[#202223] truncate">Takto Pay Ltda</p>
            <p className="text-[10px] text-[#6d7175] font-mono truncate">48.910.112/0001-90</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
