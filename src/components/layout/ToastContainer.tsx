import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBilling();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto p-3.5 rounded-xl bg-[#202223] border border-[#303030] shadow-2xl text-xs flex items-start justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  isSuccess
                    ? 'text-[#aee9d1] bg-[#008060]/40'
                    : isError
                    ? 'text-[#fed3d1] bg-[#d72c0d]/40'
                    : 'text-sky-300 bg-sky-500/30'
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isError ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <Info className="w-3.5 h-3.5" />
                )}
              </div>

              <div>
                <h4 className="font-semibold text-white">{toast.title}</h4>
                <p className="text-[#e4e5e7] text-[11px] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#8c9196] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
