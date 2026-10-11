import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import {
  Boxes,
  Sparkles,
  Link2,
  Copy,
  Check,
  Smartphone,
  Eye,
  Sliders,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const SaasView: React.FC<{ subView?: 'links' | 'builder' }> = ({ subView = 'links' }) => {
  const { products, addToast, setIsCheckoutSimulatorOpen, setSelectedProductForCheckout } =
    useBilling();

  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [buttonColor, setButtonColor] = useState('#008060');
  const [urgencyTimer, setUrgencyTimer] = useState(true);
  const [guaranteeBadge, setGuaranteeBadge] = useState(true);

  const handleCopy = (link: string, id: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedLink(id);
    addToast({
      type: 'info',
      title: 'Link Copiado!',
      message: 'Link de pagamento express copiado para sua área de transferência.',
    });
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>{subView === 'builder' ? 'TaktoBuilder' : 'Links de Pagamento Express'}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 font-semibold">
            {subView === 'builder' ? 'Novo' : 'Em desenvolvimento'}
          </span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          {subView === 'builder'
            ? 'Personalize seu checkout de alta conversão com selos, depoimentos e cronômetro de escassez'
            : 'Gere links diretos de cobrança para enviar em 1 segundo pelo WhatsApp ou Instagram'}
        </p>
      </div>

      {subView === 'links' ? (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4">
            <h3 className="text-sm font-bold text-white">Links Rápidos Gerados</h3>
            <div className="space-y-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-[#0c140e] border border-[#16251b] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                    <p className="text-[11px] font-mono text-neutral-400 mt-0.5 truncate max-w-md">
                      {prod.checkoutUrl}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      MT {prod.price.toFixed(2)} • {prod.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(prod.checkoutUrl, prod.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#122016] hover:bg-[#192b1f] border border-[#1b2f21] text-xs font-semibold text-neutral-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink === prod.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10b981]" />
                          <span className="text-[#10b981]">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copiar Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProductForCheckout(prod);
                        setIsCheckoutSimulatorOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Builder View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#09110c] border border-[#162319] space-y-4">
            <h3 className="text-sm font-bold text-white">Configurações do Checkout</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1.5">Cor do Botão de Compra</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-neutral-400">{buttonColor}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#142318]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-neutral-300">Cronômetro de Escassez (15 min)</span>
                  <input
                    type="checkbox"
                    checked={urgencyTimer}
                    onChange={(e) => setUrgencyTimer(e.target.checked)}
                    className="w-4 h-4 accent-[#008060]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-neutral-300">Selo de Garantia Incondicional 7 Dias</span>
                  <input
                    type="checkbox"
                    checked={guaranteeBadge}
                    onChange={(e) => setGuaranteeBadge(e.target.checked)}
                    className="w-4 h-4 accent-[#008060]"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Checkout Salvo',
                    message: 'As alterações de layout do TaktoBuilder foram aplicadas.',
                  });
                }}
                className="w-full py-2 rounded-xl bg-[#008060] text-white font-bold text-xs mt-3 cursor-pointer"
              >
                Salvar Customização
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0c140e] border border-[#1a2b1f] flex flex-col justify-center items-center">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Preview do Checkout em Tempo Real
            </span>

            <div className="w-full max-w-sm p-5 rounded-2xl bg-[#09110c] border border-[#16251b] shadow-2xl space-y-4">
              {urgencyTimer && (
                <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/60 text-center text-xs text-rose-300 font-bold flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400 animate-spin" />
                  <span>Oferta Especial expira em: 14:52</span>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Takto Starter Recorrente</h4>
                <p className="text-xs text-emerald-400 font-extrabold">MT 650,00</p>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Seu Nome Completo"
                  disabled
                  className="w-full p-2 rounded-lg bg-[#0c140e] border border-[#162319] text-xs text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Seu Número M-Pesa / E-Mola"
                  disabled
                  className="w-full p-2 rounded-lg bg-[#0c140e] border border-[#162319] text-xs text-neutral-400"
                />
              </div>

              <button
                style={{ backgroundColor: buttonColor }}
                className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
              >
                Pagar com M-Pesa / Cartão
              </button>

              {guaranteeBadge && (
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>7 Dias de Garantia ou 100% do seu dinheiro de volta</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
