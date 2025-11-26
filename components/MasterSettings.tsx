import React from 'react';
import { Settings, Map, Bed, Car, CreditCard, ChevronRight, Globe, Shield, FileText } from 'lucide-react';

// Configuration Data Interface
interface MasterItem {
  label: string;
  path: string; // Placeholder for routing
}

interface MasterCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  items: MasterItem[];
}

// Dynamic Configuration Data
// This could easily be fetched from an API in a real Django app
const MASTER_CONFIG: MasterCategory[] = [
  {
    id: 'general',
    title: 'General',
    icon: Globe,
    color: 'bg-blue-600',
    description: 'Locations and global settings',
    items: [
      { label: 'Country Master', path: '/master/country' },
      { label: 'State Master', path: '/master/state' },
      { label: 'City Master', path: '/master/city' },
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel',
    icon: Bed,
    color: 'bg-teal-500',
    description: 'Property configurations',
    items: [
      { label: 'Room Type', path: '/master/room-type' },
      { label: 'Amenities', path: '/master/amenities' },
      { label: 'Hotel Chain', path: '/master/hotel-chain' },
    ]
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: Car,
    color: 'bg-orange-500',
    description: 'Fleet and driver management',
    items: [
      { label: 'Vehicle Type', path: '/master/vehicle-type' },
      { label: 'Driver Master', path: '/master/driver' },
    ]
  },
  {
    id: 'accounts',
    title: 'Accounts',
    icon: CreditCard,
    color: 'bg-purple-600',
    description: 'Finance and taxation',
    items: [
      { label: 'Currency', path: '/master/currency' },
      { label: 'Bank Master', path: '/master/bank' },
      { label: 'Tax Rules', path: '/master/tax' },
    ]
  },
  // We can easily add more categories here without touching the UI code
  {
    id: 'system',
    title: 'System & Logs',
    icon: Settings,
    color: 'bg-slate-600',
    description: 'Application preferences',
    items: [
      { label: 'Email Templates', path: '/master/email' },
      { label: 'Audit Logs', path: '/master/logs' },
    ]
  }
];

const MasterSettings: React.FC = () => {
  return (
    <div className="p-8 h-full bg-slate-50 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Master Configuration Hub</h2>
        <p className="text-slate-500 mt-1">Centralized control panel for system dropdowns and parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {MASTER_CONFIG.map((category) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 group"
            >
              <div className={`${category.color} p-4 text-white flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon size={20} />
                  </div>
                  <span className="font-bold text-lg tracking-tight">{category.title}</span>
                </div>
              </div>
              
              <div className="p-3 bg-slate-50 border-b border-slate-100">
                 <p className="text-xs text-slate-500">{category.description}</p>
              </div>

              <div className="flex-1 p-2">
                <ul className="space-y-1">
                  {category.items.map((item, idx) => (
                    <li key={idx}>
                      <button className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex justify-between items-center group/item">
                        {item.label}
                        <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                 <button className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-blue-600 w-full text-center">
                    Manage {category.title}
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MasterSettings;