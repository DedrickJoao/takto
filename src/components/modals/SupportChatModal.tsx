import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { X, Send, MessageCircle, Bot, User, CheckCircle2 } from 'lucide-react';

export const SupportChatModal: React.FC = () => {
  const { isSupportChatOpen, setIsSupportChatOpen } = useBilling();

  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Olá Alberto! Sou o assistente de suporte da EscalePay. Como posso te ajudar hoje com saques, integrações ou checkout?',
      time: 'Agora',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isSupportChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputText,
      time: 'Agora',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let botReply =
        'Com certeza! Os saques via M-Pesa e E-Mola são processados automaticamente em até 1 hora útil. Se precisar de suporte com integrações de API ou Webhooks, nosso time técnico está à disposição!';
      if (userMsg.text.toLowerCase().includes('pulseira') || userMsg.text.toLowerCase().includes('vip')) {
        botReply =
          'Assim que atingir 20k de faturamento, sua pulseira VIP será despachada automaticamente e seu ingresso VIP para o evento de Dezembro estará garantido!';
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: botReply,
          time: 'Agora',
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#09110c] border border-[#1b2f21] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="p-4 bg-[#2563eb] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            EP
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Suporte EscalePay</h4>
            <span className="text-[10px] text-blue-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> Online agora
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsSupportChatOpen(false)}
          className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs bg-[#070d09]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#2563eb] text-white rounded-br-xs'
                  : 'bg-[#0f1b13] text-neutral-200 border border-[#182a1d] rounded-bl-xs'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-neutral-500 mt-0.5 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-[#0a140e] border-t border-[#16251b] flex gap-2">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#070d09] border border-[#18271c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2563eb]"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
