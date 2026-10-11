import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { formatCurrency } from '../../utils/formatters';
import {
  X,
  Sparkles,
  Smartphone,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Tag,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutSimulatorOpen,
    setIsCheckoutSimulatorOpen,
    products,
    selectedProductForCheckout,
    setSelectedProductForCheckout,
    simulateOrderCheckout,
  } = useBilling();

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'card' | 'pix'>('mpesa');
  const [customerName, setCustomerName] = useState('Mariana Machava');
  const [customerEmail, setCustomerEmail] = useState('mariana.machava@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+258 84 921 4433');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [includeBump, setIncludeBump] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutSimulatorOpen) return null;

  const currentProduct = selectedProductForCheckout || products[0];
  const bumpPrice =
    includeBump && currentProduct?.orderBump?.enabled ? currentProduct.orderBump.price : 0;
  const rawTotal = (currentProduct?.price || 0) + bumpPrice;
  const discount = couponApplied ? rawTotal * 0.15 : 0;
  const finalTotal = Math.max(0, rawTotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VIP20' || couponCode.toUpperCase() === 'BEMVINDO10') {
      setCouponApplied(true);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      simulateOrderCheckout(
        currentProduct.id,
        customerName,
        customerPhone,
        paymentMethod === 'mpesa'
          ? 'M-Pesa (Push USSD)'
          : paymentMethod === 'emola'
          ? 'E-Mola'
          : paymentMethod === 'card'
          ? 'Cartão de Crédito'
          : 'PIX Instantâneo'
      );
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutSimulatorOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-[#09110c] border border-[#1b2f21] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#162319] flex items-center justify-between bg-[#0c1611]">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#008060] flex items-center justify-center text-white font-bold text-xs">
              E
            </span>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Checkout de Alta Conversão EscalePay
              </h3>
              <p className="text-[10px] text-neutral-400">Ambiente de Simulação de Venda Real</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#142217] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[#10b981] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-extrabold text-white">Pagamento Aprovado com Sucesso!</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              A transação foi confirmada e o valor de{' '}
              <strong className="text-emerald-400 font-bold">
                {formatCurrency(finalTotal, currentProduct.currency)}
              </strong>{' '}
              foi creditado imediatamente no seu saldo do painel de vendedor!
            </p>

            <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-400">Produto:</span>
                <span className="font-semibold text-white">{currentProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Comprador:</span>
                <span className="font-semibold text-white">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Método:</span>
                <span className="font-semibold text-emerald-400 uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="font-bold text-[#10b981]">Liquidação Instantânea</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-[#008060] hover:bg-[#007053] text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer"
            >
              Voltar ao Painel
            </button>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto space-y-4 text-xs">
            {/* Product selection preview */}
            <div>
              <label className="block text-neutral-400 font-semibold mb-1">Produto Selecionado</label>
              <select
                value={currentProduct.id}
                onChange={(e) => {
                  const found = products.find((p) => p.id === e.target.value);
                  if (found) setSelectedProductForCheckout(found);
                }}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatCurrency(p.price, p.currency)}
                  </option>
                ))}
              </select>
            </div>

            {/* Buyer fields */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nome Completo do Cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                />
                <input
                  type="text"
                  placeholder="Telefone (+258 84...)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#0c140e] border border-[#1b2b1f] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-neutral-300 font-semibold mb-2">Método de Pagamento</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'mpesa'
                      ? 'bg-rose-950/40 border-rose-500 text-white font-bold'
                      : 'bg-[#0c140e] border-[#18271c] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px]">M-Pesa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('emola')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'emola'
                      ? 'bg-orange-950/40 border-orange-500 text-white font-bold'
                      : 'bg-[#0c140e] border-[#18271c] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px]">E-Mola</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white font-bold'
                      : 'bg-[#0c140e] border-[#18271c] text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px]">Cartão</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-cyan-950/40 border-cyan-500 text-white font-bold'
                      : 'bg-[#0c140e] border-[#18271c] text-neutral-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px]">PIX</span>
                </button>
              </div>
            </div>

            {/* Order Bump Checkbox */}
            {currentProduct?.orderBump?.enabled && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/30 to-[#0e1711] border border-amber-800/40 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="bump"
                  checked={includeBump}
                  onChange={(e) => setIncludeBump(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#008060] cursor-pointer"
                />
                <label htmlFor="bump" className="cursor-pointer text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    SIM! Quero levar também: {currentProduct.orderBump.name}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Por apenas + MT {currentProduct.orderBump.price.toFixed(2)}
                  </span>
                </label>
              </div>
            )}

            {/* Total and CTA button */}
            <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#16251b] space-y-1">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal:</span>
                <span>{formatCurrency(rawTotal, currentProduct.currency)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Desconto Cupom (15%):</span>
                  <span>- {formatCurrency(discount, currentProduct.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-white pt-1 border-t border-[#16251b]">
                <span>Total a Pagar:</span>
                <span className="text-[#10b981]">
                  {formatCurrency(finalTotal, currentProduct.currency)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-[#008060] hover:bg-[#007053] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Enviando push USSD para {customerPhone}...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    Confirmar Pagamento • {formatCurrency(finalTotal, currentProduct.currency)}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Ambiente seguro EscalePay com criptografia de ponta a ponta</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
