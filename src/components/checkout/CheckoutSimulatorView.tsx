import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { Plan, PaymentMethodType } from '../../types/billing';
import { formatCurrency, getIntervalBadge, getIntervalLabel } from '../../utils/formatters';
import {
  ShieldCheck,
  Lock,
  QrCode,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

interface CheckoutSimulatorProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const CheckoutSimulatorView: React.FC<CheckoutSimulatorProps> = ({ isModal, onClose }) => {
  const {
    plans,
    selectedPlanForCheckout,
    setSelectedPlanForCheckout,
    processCheckoutOrder,
    addToast,
    setActiveTab,
  } = useBilling();

  const currentPlan = selectedPlanForCheckout || plans[1] || plans[0];

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix_recurrent');
  const [customerName, setCustomerName] = useState('Lucas Gabriel Mendes');
  const [customerEmail, setCustomerEmail] = useState('lucas.mendes@empresa.com.br');
  const [customerPhone, setCustomerPhone] = useState('(11) 98844-3322');
  const [customerDocument, setCustomerDocument] = useState('412.890.312-55');

  // Credit Card fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('LUCAS G MENDES');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('882');

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<boolean>(false);
  const [pixSimulatedPayment, setPixSimulatedPayment] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      processCheckoutOrder({
        customerName,
        customerEmail,
        customerPhone,
        customerDocument,
        planId: currentPlan.id,
        paymentMethod,
        cardLast4: paymentMethod === 'credit_card' ? '4242' : undefined,
      });

      setProcessing(false);
      setSuccessOrder(true);
      addToast({
        type: 'success',
        title: 'Assinatura Realizada com Sucesso!',
        message: `${customerName} acabou de assinar o plano ${currentPlan.name}. Assinatura sincronizada no dashboard!`,
      });
    }, 1200);
  };

  const handleCopyPix = () => {
    setCopiedPix(true);
    navigator.clipboard?.writeText(
      '00020126580014br.gov.bcb.pix0136takto-recorrente-489101120001905204000053039865406247.005802BR5920TAKTO_PAY_SOLUCOES6009SAO_PAULO62070503***6304E8A2'
    );
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isModal ? 'p-1 sm:p-3' : 'pb-12'}`}>
      {!isModal && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e1e3e5]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#202223]">
                Simulador de Checkout Transparente TAKTO
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold text-[#004c3f] bg-[#e3f1df] rounded">
                1-Clique
              </span>
            </div>
            <p className="text-[#6d7175] text-xs mt-0.5">
              Esta é a experiência de alta conversão que seus assinantes veem. Teste o pagamento e veja a assinatura ser criada na hora!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6d7175]">Plano Selecionado:</span>
            <select
              value={currentPlan.id}
              onChange={(e) => {
                const p = plans.find((item) => item.id === e.target.value);
                if (p) setSelectedPlanForCheckout(p);
              }}
              className="px-3 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-xs text-[#202223] font-medium focus:outline-none focus:border-[#008060]"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatCurrency(p.price)}/{getIntervalLabel(p.interval)})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Checkout Container (Shopify clean card) */}
      <div className="max-w-4xl mx-auto rounded-xl bg-white border border-[#e1e3e5] shadow-lg overflow-hidden">
        {/* Top security bar */}
        <div className="px-5 py-2.5 bg-[#f7f7f8] border-b border-[#e1e3e5] flex items-center justify-between text-[11px] text-[#6d7175]">
          <div className="flex items-center gap-1.5 text-[#008060]">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold">Ambiente Criptografado SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Checkout Seguro</span>
            <span className="font-bold text-[#202223]">TAKTO PAY</span>
          </div>
        </div>

        {successOrder ? (
          <div className="p-8 md:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e3f1df] border border-[#aee9d1] flex items-center justify-center text-[#008060] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-[#202223]">
              Assinatura Confirmada com Sucesso!
            </h2>
            <p className="text-xs text-[#6d7175] max-w-md mx-auto leading-relaxed">
              Parabéns! O cliente <span className="text-[#202223] font-semibold">{customerName}</span> foi registrado no plano <span className="text-[#008060] font-semibold">{currentPlan.name}</span>. A primeira fatura foi processada e computada no MRR.
            </p>

            <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e1e3e5] max-w-sm mx-auto text-xs space-y-2 text-left font-mono">
              <div className="flex justify-between text-[#6d7175]">
                <span>Plano:</span>
                <span className="text-[#202223] font-sans font-medium">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between text-[#6d7175]">
                <span>Valor Recorrente:</span>
                <span className="text-[#008060] font-bold">{formatCurrency(currentPlan.price)}</span>
              </div>
              <div className="flex justify-between text-[#6d7175]">
                <span>Método:</span>
                <span className="text-[#202223]">
                  {paymentMethod === 'pix_recurrent' ? 'PIX Automático' : 'Cartão de Crédito'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSuccessOrder(false);
                  if (onClose) onClose();
                  setActiveTab('subscribers');
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-[#008060] hover:bg-[#006e52] rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Ver na Lista de Assinantes
              </button>
              <button
                onClick={() => setSuccessOrder(false)}
                className="px-4 py-2 text-xs font-medium text-[#202223] hover:bg-[#f6f6f7] bg-white border border-[#c9cccf] rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Realizar Novo Teste
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e1e3e5]">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 p-6 md:p-7 space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#008060]">
                  Etapa 1 de 2
                </span>
                <h3 className="text-sm font-bold text-[#202223] mt-0.5">
                  Dados do Titular da Assinatura
                </h3>
              </div>

              {/* Personal Data inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[#4a4d50] font-medium">Nome Completo</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#4a4d50] font-medium">Email Comercial</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#4a4d50] font-medium">WhatsApp / Telefone</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[#4a4d50] font-medium">CPF ou CNPJ</label>
                  <input
                    type="text"
                    value={customerDocument}
                    onChange={(e) => setCustomerDocument(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#c9cccf] rounded-lg text-[#202223] focus:outline-none focus:border-[#008060] focus:ring-1 focus:ring-[#008060]"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-[#f1f2f4]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#008060]">
                    Etapa 2 de 2
                  </span>
                  <h3 className="text-sm font-bold text-[#202223] mt-0.5">
                    Forma de Cobrança Recorrente
                  </h3>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix_recurrent')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'pix_recurrent'
                        ? 'bg-[#e3f1df] border-[#008060] text-[#004c3f] shadow-sm'
                        : 'bg-white border-[#c9cccf] text-[#6d7175] hover:border-[#8c9196]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#aee9d1] flex items-center justify-center text-[#008060]">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#202223] flex items-center gap-1.5">
                        <span>PIX Automático</span>
                        <span className="text-[9px] px-1 bg-[#008060] text-white font-bold rounded">
                          NOVO
                        </span>
                      </div>
                      <span className="text-[10px] text-[#6d7175]">Débito direto mensal</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'credit_card'
                        ? 'bg-[#e3f1df] border-[#008060] text-[#004c3f] shadow-sm'
                        : 'bg-white border-[#c9cccf] text-[#6d7175] hover:border-[#8c9196]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#aee9d1] flex items-center justify-center text-[#008060]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#202223]">Cartão de Crédito</div>
                      <span className="text-[10px] text-[#6d7175]">Todas as bandeiras</span>
                    </div>
                  </button>
                </div>

                {/* Payment Detail Section */}
                {paymentMethod === 'pix_recurrent' ? (
                  <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5] space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#008060] font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Como funciona o PIX Automático TAKTO:</span>
                    </div>
                    <p className="text-[11px] text-[#6d7175] leading-relaxed">
                      Você autoriza o débito recorrente apenas uma vez no seu banco. As cobranças futuras serão debitadas sem precisar escanear QR Code todo mês.
                    </p>

                    <div className="p-2.5 rounded-lg bg-white border border-[#c9cccf] flex items-center justify-between text-xs">
                      <div className="truncate mr-2 font-mono text-[#6d7175] text-[11px]">
                        00020126580014br.gov.bcb.pix0136takto-recorrente-48910112000190...
                      </div>
                      <button
                        onClick={handleCopyPix}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#202223] bg-[#f1f2f4] hover:bg-[#e4e5e7] border border-[#c9cccf] rounded flex items-center gap-1 shrink-0"
                      >
                        {copiedPix ? <Check className="w-3 h-3 text-[#008060]" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg bg-[#f9fafb] border border-[#e1e3e5] space-y-2.5 text-xs">
                    <div className="space-y-1">
                      <label className="text-[#4a4d50]">Número do Cartão</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-[#202223] font-mono focus:outline-none focus:border-[#008060]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[#4a4d50]">Validade</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-[#202223] font-mono focus:outline-none focus:border-[#008060]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[#4a4d50]">CVV</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#c9cccf] rounded-lg text-[#202223] font-mono focus:outline-none focus:border-[#008060]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA (Shopify primary action) */}
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={processing}
                className="w-full py-3 px-4 rounded-lg font-bold text-sm text-white bg-[#008060] hover:bg-[#006e52] active:bg-[#005e46] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processando e Tokenizando...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {currentPlan.trialDays > 0
                        ? `Iniciar Trial de ${currentPlan.trialDays} Dias Gratuitos`
                        : `Confirmar Assinatura (${formatCurrency(currentPlan.price)}/${getIntervalLabel(currentPlan.interval)})`}
                    </span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-[#8c9196]">
                Cobrança recorrente automática. Cancele a qualquer momento com 1 clique pelo portal do assinante.
              </div>
            </div>

            {/* Right Column: Order Summary & Guarantee (Polaris sidebar summary) */}
            <div className="lg:col-span-5 p-6 md:p-7 bg-[#f7f7f8] flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#6d7175]">
                  Resumo da Compra
                </span>

                <div className="mt-2.5 p-4 rounded-xl bg-white border border-[#e1e3e5] shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#202223]">{currentPlan.name}</h4>
                      <p className="text-[11px] text-[#6d7175] mt-0.5">
                        Ciclo {getIntervalBadge(currentPlan.interval)}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-bold text-[#008060]">
                      {formatCurrency(currentPlan.price)}
                    </span>
                  </div>

                  {currentPlan.trialDays > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#f1f2f4] flex items-center justify-between text-xs">
                      <span className="text-[#005bd3]">Período de Testes:</span>
                      <span className="text-[#202223] font-mono font-semibold">{currentPlan.trialDays} dias grátis</span>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-[#f1f2f4] space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6d7175]">
                      <span>Cobrado hoje:</span>
                      <span className="text-[#202223] font-mono font-bold">
                        {currentPlan.trialDays > 0 ? 'R$ 0,00' : formatCurrency(currentPlan.price)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#8c9196] text-[11px]">
                      <span>Próxima renovação:</span>
                      <span>Em 30 dias</span>
                    </div>
                  </div>
                </div>

                {/* Features included */}
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] text-[#4a4d50] font-semibold block">
                    Benefícios Ativados Imediatamente:
                  </span>
                  {currentPlan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6d7175]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008060] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e1e3e5] shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#e3f1df] flex items-center justify-center text-[#008060] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#202223]">Garantia Incondicional TAKTO</h5>
                  <p className="text-[11px] text-[#6d7175] mt-0.5 leading-relaxed">
                    Satisfação total ou devolução em até 7 dias sem burocracia com estorno automático.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
