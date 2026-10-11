import React from 'react';
import { BillingProvider, useBilling } from './context/BillingContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/dashboard/OverviewView';
import { ProductsView } from './components/products/ProductsView';
import { MetricsView } from './components/metrics/MetricsView';
import { SaasView } from './components/saas/SaasView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { AffiliatesView } from './components/affiliates/AffiliatesView';
import { InviteFriendsView } from './components/invite/InviteFriendsView';
import { RecoveryView } from './components/recovery/RecoveryView';
import { WithdrawalsView } from './components/withdrawals/WithdrawalsView';
import { WebhooksView } from './components/api/WebhooksView';

// Modals
import { LevelModal } from './components/modals/LevelModal';
import { FinancialReportModal } from './components/modals/FinancialReportModal';
import { NewProductModal } from './components/modals/NewProductModal';
import { SupportChatModal } from './components/modals/SupportChatModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ToastContainer } from './components/layout/ToastContainer';

import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Target,
  Users2,
  Gift,
  Wallet,
  RefreshCw,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useBilling();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'metrics':
        return <MetricsView />;
      case 'saas_links':
        return <SaasView subView="links" />;
      case 'saas_builder':
        return <SaasView subView="builder" />;
      case 'products':
        return <ProductsView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'affiliates':
        return <AffiliatesView initialTab="my_affiliates" />;
      case 'become_affiliate':
        return <AffiliatesView initialTab="marketplace" />;
      case 'invite_friends':
        return <InviteFriendsView />;
      case 'recovery':
        return <RecoveryView />;
      case 'withdrawals':
        return <WithdrawalsView />;
      case 'developers':
        return <WebhooksView />;
      default:
        return <OverviewView />;
    }
  };

  const mobileNavItems = [
    { id: 'overview', label: 'Visão', icon: LayoutDashboard },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'metrics', label: 'Métricas', icon: TrendingUp },
    { id: 'withdrawals', label: 'Saques', icon: Wallet },
    { id: 'invite_friends', label: 'Indicar', icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-[#060a08] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#008060] selection:text-white">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#080d0a]/95 backdrop-blur-md border-t border-[#16201a] flex items-center justify-around px-2 z-30">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${
                isActive ? 'text-[#10b981] font-semibold' : 'text-neutral-500 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modals & Portals */}
      <LevelModal />
      <FinancialReportModal />
      <NewProductModal />
      <SupportChatModal />
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
