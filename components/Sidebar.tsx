
import React from 'react';
import { LayoutDashboard, Users, Map, Settings, LogOut, Briefcase, Sparkles, Building2, Truck, UserCheck, Database, Bell, BarChart2, CheckSquare, Contact, FileText, Package, Layers, CreditCard, FileSignature } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const mainItems = [
    { id: 'dashboard', label: 'Query Dashboard', icon: LayoutDashboard },
    { id: 'sales-dashboard', label: 'Sales Dashboard', icon: BarChart2 },
    { id: 'quotation', label: 'Quotation Builder', icon: FileSignature },
    { id: 'lead-manager', label: 'Lead Manager', icon: Contact },
    { id: 'activities', label: 'Activities', icon: CheckSquare },
  ];

  const opsItems = [
    { id: 'packages', label: 'Package Builder', icon: Package },
    { id: 'series', label: 'Series Master', icon: Layers },
    { id: 'dms', label: 'Document Mgmt', icon: FileText },
    { id: 'invoices', label: 'Invoice Master', icon: CreditCard },
  ];

  const crmItems = [
    { id: 'agents', label: 'Agent Management', icon: Building2 },
    { id: 'suppliers', label: 'Supplier Master', icon: Truck },
    { id: 'b2c', label: 'B2C Customers', icon: UserCheck },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'master', label: 'Master Hub', icon: Database },
  ];

  const toolsItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'leads', label: 'Leads AI', icon: Briefcase },
    { id: 'planner', label: 'Itinerary AI', icon: Map },
    { id: 'settings', label: 'Personal Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-10 shadow-xl font-sans">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          TravelCRM
        </h1>
        <p className="text-xs text-slate-400 mt-1">Enterprise Edition</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Sales & Activity
        </div>
        <nav className="space-y-1 px-2 mb-6">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Operations & Finance
        </div>
        <nav className="space-y-1 px-2 mb-6">
          {opsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Database & CRM
        </div>
        <nav className="space-y-1 px-2 mb-6">
          {crmItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          Tools & System
        </div>
        <nav className="space-y-1 px-2">
          {toolsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} className={item.id.includes('AI') ? "text-purple-400" : ""} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">Operation Manager</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-2 py-2 text-slate-400 hover:text-red-400 transition-colors text-sm"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
