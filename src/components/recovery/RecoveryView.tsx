import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { RefreshCw, MessageSquare, CheckCircle2, Clock, Phone, ArrowUpRight } from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const { abandonedCarts, recoverCart } = useBilling();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Recuperação de Vendas</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#10b981] font-semibold">
            WhatsApp 1-Clique
          </span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Recupere clientes que iniciaram checkout mas não concluíram o pagamento via M-Pesa ou Cartão
        </p>
      </div>

      <div className="space-y-3">
        {abandonedCarts.map((cart) => (
          <div
            key={cart.id}
            className="p-4 rounded-2xl bg-[#09110c] border border-[#162319] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{cart.customerName}</span>
                <span className="text-[10px] text-neutral-500 font-mono">{cart.customerPhone}</span>
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                    cart.recovered
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {cart.recovered ? 'Recuperado com Sucesso' : 'Carrinho Abandonado'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Interesse em: <strong>{cart.productName}</strong> (MT {cart.amount.toFixed(2)}) • {cart.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => recoverCart(cart.id)}
                disabled={cart.recovered}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                  cart.recovered
                    ? 'bg-[#122016] text-[#10b981] border border-[#1b2f21] cursor-default'
                    : 'bg-[#25D366] hover:bg-[#20ba59] text-black shadow-md'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{cart.recovered ? 'Mensagem Enviada' : 'Recuperar no WhatsApp'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
