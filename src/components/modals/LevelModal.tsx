import React from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  X,
  Crown,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const LevelModal: React.FC = () => {
  const { isLevelModalOpen, setIsLevelModalOpen, metrics, setIsCheckoutSimulatorOpen } =
    useBilling();

  if (!isLevelModalOpen) return null;

  const currentRevenue = metrics.level.currentRevenue;

  const levels = [
    {
      name: 'Sem nível',
      target: 0,
      reward: 'Início da Jornada',
      perks: ['Painel do vendedor completo', 'Checkout de alta conversão', 'Saques via M-Pesa & Bancos'],
      reached: true,
      color: 'text-neutral-400 border-neutral-700 bg-neutral-900/60',
    },
    {
      name: 'Bronze VIP (20k)',
      target: 20000,
      reward: 'Pulseira VIP + Evento Exclusivo',
      perks: [
        'Pulseira VIP enviada para seu endereço',
        'Ingresso VIP para o Evento dos Players em Dezembro',
        'Acesso ao grupo exclusivo de networking',
      ],
      reached: currentRevenue >= 20000,
      color: 'text-amber-400 border-amber-800/80 bg-amber-950/20',
      badge: 'Próxima Conquista',
    },
    {
      name: 'Prata (100k)',
      target: 100000,
      reward: 'Placa Comemorativa 100k Prata',
      perks: [
        'Placa física oficial dos 100k faturados',
        'Gerente de Contas Dedicado no WhatsApp',
        'Antecipação D+1 liberada',
      ],
      reached: currentRevenue >= 100000,
      color: 'text-slate-300 border-slate-700 bg-slate-900/30',
    },
    {
      name: 'Ouro (500k)',
      target: 500000,
      reward: 'Placa Ouro + Jantar Executivo',
      perks: [
        'Placa Ouro de Faturamento',
        'Jantar exclusivo com fundadores e top 10 sellers',
        'Taxas reduzidas na plataforma',
      ],
      reached: currentRevenue >= 500000,
      color: 'text-yellow-400 border-yellow-700 bg-yellow-950/30',
    },
    {
      name: 'Diamante (1M+)',
      target: 1000000,
      reward: 'Troféu Diamante + Imersão VIP',
      perks: [
        'Troféu Diamante EscalePay',
        'Imersão internacional de escala e funis',
        'Taxa mínima exclusiva de 3.9%',
      ],
      reached: currentRevenue >= 1000000,
      color: 'text-cyan-400 border-cyan-700 bg-cyan-950/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-[#09110c] border border-[#1a2c1f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#162319] flex items-center justify-between bg-[#0c1611]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Níveis de Faturamento & Premiações
              </h3>
              <p className="text-xs text-neutral-400">
                Acelere suas vendas, suba de nível e ganhe prêmios exclusivos da EscalePay
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLevelModalOpen(false)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#142217] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Progress Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0e1a13] to-[#09120d] border border-[#1d3324] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Seu Progresso Atual
                </span>
                <p className="text-xl font-bold text-white mt-0.5">
                  MT {currentRevenue.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
                  <span className="text-xs text-neutral-400 font-normal ml-2">
                    de MT 20.000,00 (Bronze VIP)
                  </span>
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-bold text-xs">
                {metrics.level.progressPercentage.toFixed(1)}% concluído
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-[#132017] rounded-full overflow-hidden p-0.5 border border-[#1b2f21]">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#10b981] rounded-full transition-all duration-700"
                style={{ width: `${Math.max(3, metrics.level.progressPercentage)}%` }}
              ></div>
            </div>

            <p className="text-xs text-neutral-400">
              Faltam apenas{' '}
              <strong className="text-white font-semibold">
                MT {(20000 - currentRevenue).toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
              </strong>{' '}
              para você desbloquear a <span className="text-amber-400 font-medium">Pulseira VIP</span>{' '}
              e garantir seu ingresso no evento exclusivo em Dezembro!
            </p>
          </div>

          {/* Level Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Trilha de Premiações Oficiais
            </h4>

            <div className="space-y-2.5">
              {levels.map((lvl, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${
                    lvl.color
                  } ${lvl.reached ? 'ring-1 ring-[#10b981]/40' : 'opacity-85'}`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{lvl.name}</span>
                      {lvl.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          {lvl.badge}
                        </span>
                      )}
                      {lvl.reached && (
                        <span className="flex items-center gap-1 text-[10px] text-[#10b981] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Alcançado
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-neutral-300">{lvl.reward}</p>

                    <ul className="text-[11px] text-neutral-400 space-y-0.5 pt-1">
                      {lvl.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-neutral-300">
                      {lvl.target > 0
                        ? `MT ${lvl.target.toLocaleString('pt-MZ')}`
                        : 'Qualquer valor'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#162319] bg-[#0c1611] flex items-center justify-between">
          <button
            onClick={() => setIsLevelModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
          >
            Fechar
          </button>

          <button
            onClick={() => {
              setIsLevelModalOpen(false);
              setIsCheckoutSimulatorOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acelerar Vendas no Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
