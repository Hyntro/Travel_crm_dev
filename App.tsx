
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import Login from './components/Login';
import Agents from './components/Agents';
import Suppliers from './components/Suppliers';
import B2CClients from './components/B2CClients';
import MasterSettings from './components/MasterSettings';
import Notifications from './components/Notifications';
import SalesDashboard from './components/SalesDashboard';
import LeadManagement from './components/LeadManagement';
import ActivityManagement from './components/ActivityManagement';
import DocumentManagement from './components/DocumentManagement';
import PackageBuilder from './components/PackageBuilder';
import SeriesManagement from './components/SeriesManagement';
import InvoiceMaster from './components/InvoiceMaster';
import QuotationBuilder from './components/QuotationBuilder';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'sales-dashboard': return <SalesDashboard />;
      case 'quotation': return <QuotationBuilder />;
      case 'lead-manager': return <LeadManagement />;
      case 'activities': return <ActivityManagement />;
      
      // Operations & Finance
      case 'dms': return <DocumentManagement />;
      case 'packages': return <PackageBuilder />;
      case 'series': return <SeriesManagement />;
      case 'invoices': return <InvoiceMaster />;
      
      // CRM
      case 'agents': return <Agents />;
      case 'suppliers': return <Suppliers />;
      case 'b2c': return <B2CClients />;
      case 'users': return <UserManagement />;
      case 'master': return <MasterSettings />;
      
      // Tools
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setIsLoggedIn(false)}
      />
      <main className="flex-1 ml-64 min-h-screen transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
