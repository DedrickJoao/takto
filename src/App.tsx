import React from 'react';
import { BillingProvider, useBilling } from './context/BillingContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/dashboard/OverviewView';
import { SubscribersView } from './components/subscribers/SubscribersView';
import { PlansView } from './components/plans/PlansView';
import { InvoicesView } from './components/invoices/InvoicesView';
import { DunningView } from './components/dunning/DunningView';
import { CheckoutSimulatorView } from './components/checkout/CheckoutSimulatorView';
import { WebhooksView } from './components/api/WebhooksView';
import { NewSubscriberModal } from './components/modals/NewSubscriberModal';
import { NewPlanModal } from './components/modals/NewPlanModal';
import { SubscriberDetailModal } from './components/subscribers/SubscriberDetailModal';
import { InvoiceDetailModal } from './components/invoices/InvoiceDetailModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ToastContainer } from './components/layout/ToastContainer';
import {
  LayoutDashboard,
  Users,
  Layers,
  Receipt,
  Sparkles,
  Repeat,
  Code2,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useBilling();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'subscribers':
        return <SubscribersView />;
      case 'plans':
        return <PlansView />;
      case 'invoices':
        return <InvoicesView />;
      case 'dunning':
        return <DunningView />;
      case 'checkout_builder':
        return <CheckoutSimulatorView />;
      case 'developers':
        return <WebhooksView />;
      default:
        return <OverviewView />;
    }
  };

  const mobileNavItems = [
    { id: 'overview', label: 'Visão', icon: LayoutDashboard },
    { id: 'subscribers', label: 'Assinantes', icon: Users },
    { id: 'plans', label: 'Planos', icon: Layers },
    { id: 'invoices', label: 'Faturas', icon: Receipt },
    { id: 'dunning', label: 'Dunning', icon: Sparkles },
    { id: 'checkout_builder', label: 'Checkout', icon: Repeat },
  ];

  return (
    <div className="min-h-screen bg-[#060907] text-neutral-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#070b09]/95 backdrop-blur-md border-t border-[#142319] flex items-center justify-around px-2 z-30">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${
                isActive ? 'text-emerald-400' : 'text-neutral-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modals & Portals */}
      <NewSubscriberModal />
      <NewPlanModal />
      <SubscriberDetailModal />
      <InvoiceDetailModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BillingProvider>
      <MainContent />
    </BillingProvider>
  );
}
