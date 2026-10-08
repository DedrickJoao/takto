import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { CheckoutSimulatorView } from './CheckoutSimulatorView';
import { X } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutSimulatorOpen, setIsCheckoutSimulatorOpen } = useBilling();

  if (!isCheckoutSimulatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-auto">
        <button
          onClick={() => setIsCheckoutSimulatorOpen(false)}
          className="absolute -top-10 right-0 sm:top-4 sm:right-4 z-20 p-2 text-neutral-400 hover:text-white bg-[#0c140f] sm:bg-[#070b09]/80 border border-[#1b3123] rounded-full transition-colors cursor-pointer"
          title="Fechar Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <CheckoutSimulatorView isModal={true} onClose={() => setIsCheckoutSimulatorOpen(false)} />
      </div>
    </div>
  );
};
