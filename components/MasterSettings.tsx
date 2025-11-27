
import React, { useState } from 'react';
import { Settings, Map, Bed, Car, CreditCard, ChevronRight, Globe, Shield, FileText, Flag, Plane, User, Plus, Search, Filter, ArrowLeft, X, Edit2, Trash2, MoreHorizontal, Check, Download, Upload, Eye, Image as ImageIcon, FileJson, History, Palette, Percent } from 'lucide-react';
import CountryMaster from './CountryMaster';
import StateMaster from './StateMaster';
import CityMaster from './CityMaster';
import LeadSourceMaster from './LeadSourceMaster';
import BusinessTypeMaster from './BusinessTypeMaster';
import MarketTypeMaster from './MarketTypeMaster';
import DestinationMaster from './DestinationMaster';
import LanguageMaster from './LanguageMaster';
import CommissionMaster from './CommissionMaster';
import DivisionMaster from './DivisionMaster';
import SeasonMaster from './SeasonMaster';
import TourTypeMaster from './TourTypeMaster';

// Configuration Data Interface
interface MasterItem {
  label: string;
  path: string;
}

interface MasterCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  items: MasterItem[];
}

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
      { label: 'Lead Source Master', path: '/master/lead-source' },
      { label: 'Destination Master', path: '/master/destination' },
      { label: 'Business Type Master', path: '/master/business-type' },
      { label: 'Language Master', path: '/master/language' },
      { label: 'Market Type Master', path: '/master/market-type' },
      { label: 'Commission Master', path: '/master/commission' },
      { label: 'Division Master', path: '/master/division' },
      { label: 'Season Master', path: '/master/season' },
      { label: 'Tour Type Master', path: '/master/tour-type' },
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel',
    icon: Bed,
    color: 'bg-teal-500',
    description: 'Property configurations',
    items: [
      { label: 'Room Type Master', path: '/master/room-type' },
      { label: 'Amenities Master', path: '/master/amenities' },
      { label: 'Hotel Category Master', path: '/master/hotel-category' },
      { label: 'Hotel Type Master', path: '/master/hotel-type' },
      { label: 'Hotel Meal Plan', path: '/master/hotel-meal-plan' },
      { label: 'Weekend Master', path: '/master/weekend' },
      { label: 'Hotel Master', path: '/master/hotel' },
      { label: 'Hotel Chain Master', path: '/master/hotel-chain' },
      { label: 'Operation Restriction', path: '/master/operation-restriction' },
      { label: 'Restaurant Master', path: '/master/restaurant' },
      { label: 'Restaurant Meal Plan', path: '/master/restaurant-meal-plan' },
    ]
  },
  {
    id: 'activity',
    title: 'Monument / Activity',
    icon: Flag,
    color: 'bg-indigo-500',
    description: 'Sightseeing and activities',
    items: [
      { label: 'Monument Master', path: '/master/monument' },
      { label: 'Monument & Activity Package', path: '/master/monument-package' },
      { label: 'Activity Master', path: '/master/activity' },
      { label: 'Enroute Master', path: '/master/enroute' },
    ]
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: Car,
    color: 'bg-orange-500',
    description: 'Fleet and driver management',
    items: [
      { label: 'Transfer Master', path: '/master/transfer' },
      { label: 'Transfer Type', path: '/master/transfer-type' },
      { label: 'Transportation Master', path: '/master/transportation' },
      { label: 'City Distance Master', path: '/master/city-distance' },
      { label: 'Vehicle Type Master', path: '/master/vehicle-type' },
      { label: 'Driver Master', path: '/master/driver' },
      { label: 'Fleet Master', path: '/master/fleet' },
    ]
  },
  {
    id: 'flight',
    title: 'Flight / Train',
    icon: Plane,
    color: 'bg-sky-500',
    description: 'Aviation and Rail',
    items: [
      { label: 'Airline Master', path: '/master/airline' },
      { label: 'Flight Seat Master', path: '/master/flight-seat' },
      { label: 'Flight Cost Master', path: '/master/flight-cost' },
      { label: 'Train Master', path: '/master/train' },
    ]
  },
  {
    id: 'guide',
    title: 'Guide / Tour Mgr',
    icon: User,
    color: 'bg-rose-500',
    description: 'Guide and Manager details',
    items: [
      { label: 'Guide Master', path: '/master/guide' },
      { label: 'Guide Price Master', path: '/master/guide-price' },
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
  }
];

const MasterSettings: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleModuleClick = (path: string) => {
    setActiveModule(path);
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  const renderActiveModule = () => {
    switch(activeModule) {
      case '/master/country': return <CountryMaster onBack={handleBack} />;
      case '/master/state': return <StateMaster onBack={handleBack} />;
      case '/master/city': return <CityMaster onBack={handleBack} />;
      case '/master/lead-source': return <LeadSourceMaster onBack={handleBack} />;
      case '/master/business-type': return <BusinessTypeMaster onBack={handleBack} />;
      case '/master/market-type': return <MarketTypeMaster onBack={handleBack} />;
      case '/master/destination': return <DestinationMaster onBack={handleBack} />;
      case '/master/language': return <LanguageMaster onBack={handleBack} />;
      case '/master/commission': return <CommissionMaster onBack={handleBack} />;
      case '/master/division': return <DivisionMaster onBack={handleBack} />;
      case '/master/season': return <SeasonMaster onBack={handleBack} />;
      case '/master/tour-type': return <TourTypeMaster onBack={handleBack} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Settings size={48} className="mb-4 opacity-50" />
          <h3 className="text-lg font-medium">Module Under Development</h3>
          <button onClick={handleBack} className="mt-4 text-blue-600 hover:underline">Go Back</button>
        </div>
      );
    }
  };

  if (activeModule) {
    return (
      <div className="h-full overflow-y-auto">
        {renderActiveModule()}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Master Configuration Hub</h2>
        <p className="text-slate-500 mt-1">Centralized control panel for system dropdowns and parameters.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MASTER_CONFIG.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 group">
              <div className={`${category.color} p-4 text-white flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Icon size={20} /></div>
                  <span className="font-bold text-lg tracking-tight">{category.title}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-b border-slate-100"><p className="text-xs text-slate-500">{category.description}</p></div>
              <div className="flex-1 p-2">
                <ul className="space-y-1">
                  {category.items.map((item, idx) => (
                    <li key={idx}>
                      <button onClick={() => handleModuleClick(item.path)} className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex justify-between items-center group/item">
                        {item.label}
                        <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                <button className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-blue-600 w-full text-center">Manage {category.title}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MasterSettings;
