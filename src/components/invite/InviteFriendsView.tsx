import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Gift, Copy, Check, Users, Sparkles, ArrowRight, Share2, DollarSign } from 'lucide-react';

export const InviteFriendsView: React.FC = () => {
  const { addToast } = useBilling();
  const [copied, setCopied] = useState(false);
  const inviteLink = 'https://escalepay.com/register?ref=alberto_aa';

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Link de Indicação Copiado!',
      message: 'Compartilhe com outros criadores e vendedores para ganhar 1% vitalício.',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Convidar Amigos & Criadores
        </h2>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-semibold flex items-center gap-1">
          <Gift className="w-3.5 h-3.5" />
          Programa Parceiro
        </span>
      </div>

      {/* Hero Invitation Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0e1c14] via-[#09130d] to-[#060a08] border border-[#1b3223] relative overflow-hidden shadow-xl space-y-6">
        <div className="max-w-xl space-y-3 relative z-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Ganhe Comissões Recorrentes
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Ganhe 1% sobre o faturamento de todos os vendedores que indicar
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Convide amigos que vendem infoprodutos, cursos ou serviços digitais para a EscalePay.
            Você recebe uma comissão automática e vitalícia a cada venda aprovada deles.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 max-w-lg">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="bg-[#0c140e] border border-[#1e2f22] rounded-xl py-2 px-3.5 text-xs text-neutral-200 font-mono flex-1 select-all"
            />
            <button
              onClick={handleCopy}
              className="py-2 px-4 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Convite</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Glow decoration */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Total de Amigos Indicados</p>
          <p className="text-2xl font-bold text-white">4 vendedores</p>
          <p className="text-[11px] text-neutral-500">3 ativos faturando</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Cliques no seu Link</p>
          <p className="text-2xl font-bold text-white">128</p>
          <p className="text-[11px] text-neutral-500">Taxa de cadastro: 3.1%</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-1">
          <p className="text-xs text-neutral-400">Comissões Recebidas (1%)</p>
          <p className="text-2xl font-bold text-[#10b981]">MT 184,20</p>
          <p className="text-[11px] text-emerald-400">Creditado automaticamente no seu saldo</p>
        </div>
      </div>
    </div>
  );
};
