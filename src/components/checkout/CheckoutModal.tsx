import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { CheckoutSimulatorView } from './CheckoutSimulatorView';
import { X } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutSimulatorOpen, setIsCheckoutSimulatorOpen } = useBilling();

  if (!isCheckoutSimulatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-auto">
        <button
          onClick={() => setIsCheckoutSimulatorOpen(false)}
          className="absolute -top-10 right-0 sm:top-4 sm:right-4 z-20 p-2 text-[#6d7175] hover:text-[#202223] bg-white border border-[#c9cccf] rounded-full transition-colors cursor-pointer shadow-md"
          title="Fechar Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <CheckoutSimulatorView isModal={true} onClose={() => setIsCheckoutSimulatorOpen(false)} />
      </div>
    </div>
  );
};
