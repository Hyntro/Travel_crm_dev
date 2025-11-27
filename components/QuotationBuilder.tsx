
import React, { useState, useEffect, useRef } from 'react';
import { FileText, Map, Settings, MessageSquare, Plus, Trash2, Hotel, Flag, Bus, Plane, Train, MapPin, Copy, Eye, CheckCircle, Calendar, Bed, X, Edit, Users, ArrowRightLeft, RefreshCw, Printer, GripVertical, PackagePlus, Sparkles, Utensils, ArrowLeft, Download, FileText as FileTextIcon } from 'lucide-react';
import { Quotation, QuotationItineraryDay, TourExtension, CostSheet, TravelPackage, CityContent } from '../types';
import CostingSheet from './CostingSheet';
import ProposalTemplates from './ProposalTemplates';
import ServiceModals from './ServiceModals';
import CostSheetPreview from './CostSheetPreview';
import Sortable from 'sortablejs';

// Mock Data
const defaultQuotation: Quotation = {
  id: 'Q1',
  queryId: 'DB25-26/000785',
  quoteCode: 'DB25-26/000771/A',
  version: 'A',
  status: 'Draft',
  hotelCategory: 'Deluxe',
  mealPlan: 'MAP',
  clientName: 'Robert Kingsley',
  destination: 'Japan',
  updatedAt: '2025-05-15',
  paxAdult: 2,
  paxChild: 0,
  travelDate: '2025-11-25'
};

const initialDays: QuotationItineraryDay[] = [
  { 
    id: 'd1', dayNumber: 1, date: '2025-11-25', cityName: 'Tokyo', description: 'Arrival in Tokyo. Transfer to hotel.',
    services: { hotel: true, guide: false, activity: false, monument: false, transfer: true, flight: false, train: false },
    itineraryHotels: [], itineraryTransports: [], itineraryFlights: [], itineraryActivities: [], itineraryRestaurants: [], itineraryAdditionals: []
  },
  { 
    id: 'd2', dayNumber: 2, date: '2025-11-26', cityName: 'Tokyo', description: 'Full day city tour visiting Senso-ji Temple and Shibuya Crossing.',
    services: { hotel: true, guide: true, activity: true, monument: true, transfer: true, flight: false, train: false },
    itineraryHotels: [], itineraryTransports: [], itineraryFlights: [], itineraryActivities: [], itineraryRestaurants: [], itineraryAdditionals: []
  },
];

const initialCostSheet: CostSheet = {
  id: '1',
  quotationId: 'Q1',
  hotelCost: 0,
  transportCost: 0,
  flightCost: 0,
  guideCost: 0,
  activityCost: 0,
  monumentCost: 0,
  mealCost: 0,
  miscCost: 0,
  escortCost: 0,
  enrouteCost: 0,
  permitCost: 0,
  markupPercentage: 15,
  agentCommission: 5,
  isoCommission: 2,
  gstType: 'IGST',
  gstPercentage: 5,
  totalLandCost: 0,
  markupAmount: 0,
  isoAmount: 0,
  gstAmount: 0,
  totalCost: 0,
  finalSalePrice: 0
};

const mockPackages: TravelPackage[] = [
  { id: '1', code: 'PKG001', name: 'Magical Maldives', planType: 'Day Wise', supplier: 'Hilton', totalNights: 4, duration: '5 Days / 4 Nights', destination: 'Maldives', paxType: 'FIT', status: 'Active', description: 'Luxury stay.' },
];

const mockCityContent: CityContent[] = [
  { id: 'cc1', city: 'Tokyo', title: 'Tokyo Highlights', description: 'Explore the vibrant capital of Japan. Visit the historic Senso-ji Temple in Asakusa.', language: 'English' },
];

interface QuotationBuilderProps {
  embedded?: boolean;
  initialData?: Quotation;
  onBack?: () => void;
}

const QuotationBuilder: React.FC<QuotationBuilderProps> = ({ embedded = false, initialData, onBack }) => {
  const [quotation, setQuotation] = useState<Quotation>(initialData || defaultQuotation);
  const [days, setDays] = useState<QuotationItineraryDay[]>(initialDays);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'costing' | 'extensions'>('itinerary');
  const [costSheet, setCostSheet] = useState<CostSheet>(initialCostSheet);
  
  // Amendment & Modal State
  const [showExtModal, setShowExtModal] = useState(false);
  const [extensions, setExtensions] = useState<TourExtension[]>([]);
  const [newExt, setNewExt] = useState<Partial<TourExtension>>({ type: 'Post-Tour', rooms: { sgl: 0, dbl: 0, tpl: 0 } });
  const [showPaxModal, setShowPaxModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showCostSheetPreview, setShowCostSheetPreview] = useState(false); // New state for CostSheet modal
  const [previewTheme, setPreviewTheme] = useState<'Aspire' | 'Simple'>('Aspire');
  const [tempPax, setTempPax] = useState({ adult: quotation.paxAdult, child: quotation.paxChild });
  const [tempDate, setTempDate] = useState(quotation.travelDate);
  const [saveSuccess, setSaveSuccess] = useState(false); // Track save state

  // Service Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [activeServiceType, setActiveServiceType] = useState<'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional'>('hotel');
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [showContentRepo, setShowContentRepo] = useState<string | null>(null);

  const sortableListRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);
  const proposalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(initialData) {
      setQuotation(initialData);
      // In a real app, we would fetch the days and cost sheet for this ID here
    }
  }, [initialData]);

  useEffect(() => {
    if (showRouteModal && sortableListRef.current) {
      sortableInstance.current = new Sortable(sortableListRef.current, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'bg-blue-50',
      });
    }
  }, [showRouteModal]);

  // Calculation Logic when switching to Costing Tab
  useEffect(() => {
    if (activeTab === 'costing') {
        calculateCostsFromItinerary();
    }
  }, [activeTab, days]);

  const calculateCostsFromItinerary = () => {
    const totalPax = quotation.paxAdult + quotation.paxChild;
    let newSheet = { ...costSheet };
    
    // Reset categories
    newSheet.hotelCost = 0;
    newSheet.transportCost = 0;
    newSheet.flightCost = 0;
    newSheet.guideCost = 0;
    newSheet.activityCost = 0;
    newSheet.monumentCost = 0;
    newSheet.mealCost = 0;
    newSheet.miscCost = 0;

    days.forEach(day => {
      // Hotels (Assume Total Cost entered in modal, or per Room - treating as Total for Quote for simplicity)
      day.itineraryHotels.forEach(h => newSheet.hotelCost += (h.overrideCost || h.cost));
      
      // Transports (Assume Total Cost - Disposal/Sector)
      day.itineraryTransports.forEach(t => newSheet.transportCost += (t.overrideCost || t.cost));
      
      // Flights (Assume Per Person)
      day.itineraryFlights.forEach(f => newSheet.flightCost += ((f.overrideCost || f.cost) * totalPax)); 

      // Activities (Assume Per Person)
      day.itineraryActivities.forEach(a => {
         const cost = (a.overrideCost || a.cost);
         // Guide/Transfer are usually Group costs (per service instance), others PP
         if (a.type === 'Guide') newSheet.guideCost += cost; // Assuming Daily rate is per group
         else if (a.type === 'Transfer') newSheet.transportCost += cost; // Transfers grouped to transport
         else {
             const totalActivityCost = cost * totalPax; // Tickets are PP
             if (a.type === 'Monument') newSheet.monumentCost += totalActivityCost;
             else newSheet.activityCost += totalActivityCost;
         }
      });

      // Restaurants (Assume Per Person)
      day.itineraryRestaurants.forEach(r => newSheet.mealCost += ((r.overrideCost || r.cost) * totalPax));

      // Additional (Check costType logic)
      day.itineraryAdditionals.forEach(a => {
         const unitCost = a.overrideCost || a.cost;
         if (a.costType === 'Per Person') {
            newSheet.miscCost += (unitCost * totalPax);
         } else {
            newSheet.miscCost += unitCost; // Group Cost
         }
      });
    });
    
    setCostSheet(newSheet);
  };

  const getStatusStep = () => {
    switch (quotation.status) {
      case 'Draft': return 1;
      case 'Final': return 2;
      case 'Confirmed': return 3;
      default: return 0;
    }
  };

  const handleOpenServiceModal = (dayId: string, type: 'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional') => {
    setActiveDayId(dayId);
    setActiveServiceType(type);
    setServiceModalOpen(true);
  };

  const handleAddService = (serviceData: any) => {
    if (!activeDayId) return;

    setDays(prevDays => prevDays.map(day => {
       if (day.id === activeDayId) {
          const updatedDay = { ...day };
          const newId = Math.random().toString();
          
          if (activeServiceType === 'hotel') {
             updatedDay.itineraryHotels = [...day.itineraryHotels, { 
                id: newId, 
                hotelName: serviceData.name, 
                roomType: serviceData.roomType,
                mealPlan: serviceData.mealPlan,
                checkIn: serviceData.checkIn,
                checkOut: serviceData.checkOut,
                cost: serviceData.cost, 
                supplier: serviceData.supplier,
                overrideCost: serviceData.cost
             }];
             updatedDay.services.hotel = true;
          } else if (activeServiceType === 'flight') {
             updatedDay.itineraryFlights = [...day.itineraryFlights, {
                id: newId,
                carrierName: serviceData.name.split(' ')[0],
                flightNumber: serviceData.name,
                departureTime: serviceData.time.split(' - ')[0],
                arrivalTime: serviceData.time.split(' - ')[1],
                class: 'Economy',
                cost: serviceData.cost,
                overrideCost: serviceData.cost
             }];
             updatedDay.services.flight = true;
          } else if (activeServiceType === 'activity') {
             updatedDay.itineraryActivities = [...day.itineraryActivities, {
                id: newId,
                serviceName: serviceData.name,
                type: serviceData.type,
                duration: serviceData.duration,
                timeSlot: 'Morning',
                cost: serviceData.cost,
                overrideCost: serviceData.cost
             }];
             if (serviceData.type === 'Activity') updatedDay.services.activity = true;
          } else if (activeServiceType === 'transport') {
             updatedDay.itineraryTransports = [...day.itineraryTransports, {
                id: newId,
                vehicleType: 'Sedan', // Mock default
                sector: 'Local',
                disposal: true,
                cost: serviceData.cost,
                overrideCost: serviceData.cost
             }];
             updatedDay.services.transfer = true; // Or logic to toggle
          } else if (activeServiceType === 'restaurant') {
             updatedDay.itineraryRestaurants = [...day.itineraryRestaurants, {
                id: newId,
                restaurantName: serviceData.name,
                mealType: serviceData.mealType,
                supplier: serviceData.supplier,
                cost: serviceData.cost,
                overrideCost: serviceData.cost
             }];
          } else if (activeServiceType === 'additional') {
             updatedDay.itineraryAdditionals = [...day.itineraryAdditionals, {
                id: newId,
                serviceName: serviceData.name,
                type: serviceData.type,
                supplier: serviceData.supplier,
                cost: serviceData.cost,
                overrideCost: serviceData.cost,
                costType: serviceData.costType
             }];
          }
          return updatedDay;
       }
       return day;
    }));
  };

  const handleRemoveService = (dayId: string, serviceType: string, serviceId: string) => {
     setDays(prevDays => prevDays.map(day => {
        if (day.id === dayId) {
           const updatedDay = { ...day };
           if (serviceType === 'hotel') updatedDay.itineraryHotels = day.itineraryHotels.filter(h => h.id !== serviceId);
           if (serviceType === 'flight') updatedDay.itineraryFlights = day.itineraryFlights.filter(f => f.id !== serviceId);
           if (serviceType === 'activity') updatedDay.itineraryActivities = day.itineraryActivities.filter(a => a.id !== serviceId);
           if (serviceType === 'transport') updatedDay.itineraryTransports = day.itineraryTransports.filter(t => t.id !== serviceId);
           if (serviceType === 'restaurant') updatedDay.itineraryRestaurants = day.itineraryRestaurants.filter(r => r.id !== serviceId);
           if (serviceType === 'additional') updatedDay.itineraryAdditionals = day.itineraryAdditionals.filter(a => a.id !== serviceId);
           return updatedDay;
        }
        return day;
     }));
  };

  const handleApplyContent = (dayId: string, description: string) => {
     setDays(prevDays => prevDays.map(day => {
        if (day.id === dayId) return { ...day, description };
        return day;
     }));
     setShowContentRepo(null);
  };

  const handleAddExtension = () => {
    if (!newExt.title) return;
    setExtensions([...extensions, { ...newExt as TourExtension, id: Math.random().toString(), quotationId: quotation.id }]);
    setShowExtModal(false);
  };
  const handleUpdatePax = () => { setQuotation(prev => ({ ...prev, paxAdult: tempPax.adult, paxChild: tempPax.child })); setShowPaxModal(false); };
  const handleUpdateDate = () => { /* Date logic from previous step */ setShowDateModal(false); };
  const handleSaveRoute = () => { /* Sortable logic */ setShowRouteModal(false); };
  const handleInsertPackage = (pkgId: string) => { /* Insert logic */ setShowPackageModal(false); };

  // New Handler for Cost Save
  const handleSaveCostSheet = (sheet: CostSheet) => {
     setCostSheet(sheet);
     setSaveSuccess(true);
     // Simulate API save
     setTimeout(() => setSaveSuccess(true), 500); 
  };

  // Handler for Word Download
  const handleDownloadWord = () => {
    if (!proposalRef.current) return;
    
    const content = proposalRef.current.innerHTML;
    // Add essential styles for Word document structure
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title><style>body { font-family: 'Times New Roman', serif; }</style></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Proposal_${quotation.quoteCode}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`h-full flex flex-col bg-slate-50 overflow-y-auto no-print ${embedded ? '' : 'p-8'}`}>
      
      {/* Header - Hidden if embedded or customized for embedded */}
      {!embedded ? (
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
           <div>
             <h2 className="text-3xl font-bold text-slate-800">Quotation Dashboard</h2>
             <p className="text-slate-500 mt-1">Ref: {quotation.quoteCode} | Client: {quotation.clientName}</p>
           </div>
           <div className="flex gap-2">
              <div className="relative group">
                 <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                    <Edit size={16}/> Tour Change
                 </button>
                 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 hidden group-hover:block z-20">
                    <button onClick={() => setShowPaxModal(true)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><Users size={14}/> Amend Pax</button>
                    <button onClick={() => setShowDateModal(true)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><Calendar size={14}/> Amend Date</button>
                    <button onClick={() => setShowRouteModal(true)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><ArrowRightLeft size={14}/> Modify Route</button>
                 </div>
              </div>
              <button onClick={() => setShowPreviewModal(true)} className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Eye size={16}/> Preview</button>
           </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1"><div className={`bg-blue-600 h-2.5 rounded-full transition-all duration-500`} style={{ width: `${getStatusStep() * 33.3}%` }}></div></div>
      </div>
      ) : (
         <div className="flex justify-between items-center p-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
            <div className="flex flex-col">
               <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600"/> 
                  {quotation.quoteCode || 'New Quotation'}
               </h3>
               <span className="text-xs text-slate-500">{quotation.clientName} | {quotation.travelDate}</span>
            </div>
            
            <div className="flex items-center gap-3">
               {saveSuccess && (
                  <div className="flex items-center gap-2 mr-2 animate-in fade-in slide-in-from-right-2">
                     <button 
                        onClick={() => setShowCostSheetPreview(true)}
                        className="bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm"
                     >
                        Preview CostSheet
                     </button>
                     <button 
                        onClick={() => setShowPreviewModal(true)}
                        className="bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm"
                     >
                        Preview Proposal
                     </button>
                     <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle size={16}/> Quotation is updated Successfully.
                     </span>
                  </div>
               )}
               {onBack && (
                  <button onClick={onBack} className="text-slate-500 hover:text-slate-800 px-3 py-1.5 border border-slate-300 rounded-full text-sm flex items-center gap-1 bg-white hover:bg-slate-50">
                     <ArrowLeft size={14}/> Back
                  </button>
               )}
            </div>
         </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 bg-white px-2 pt-2 shadow-sm sticky top-[68px] z-10">
         <button onClick={() => setActiveTab('itinerary')} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'itinerary' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`}><Map size={16}/> Day-wise Itinerary</button>
         <button onClick={() => setActiveTab('costing')} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'costing' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`}><Settings size={16}/> Costing & Markup</button>
         <button onClick={() => setActiveTab('extensions')} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'extensions' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`}><Plus size={16}/> Tour Extensions</button>
      </div>

      {/* Content */}
      <div className="flex-1">
         {activeTab === 'itinerary' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex gap-4 items-center">
                    <h3 className="font-bold text-blue-800">Itinerary Builder</h3>
                    <div className="flex gap-2 text-sm text-blue-600 border-l border-blue-200 pl-4"><span className="flex items-center gap-1"><Users size={14}/> {quotation.paxAdult} Adult, {quotation.paxChild} Child</span></div>
                  </div>
                  <button onClick={() => setShowPackageModal(true)} className="text-sm bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 flex items-center gap-1"><PackagePlus size={14}/> Insert Package</button>
               </div>

               {days.map((day) => (
                  <div key={day.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                     <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center text-white shadow-sm"><span className="text-xs font-medium uppercase">Day</span><span className="text-xl font-bold leading-none">{day.dayNumber}</span></div>
                           <div><div className="flex items-center gap-2"><h4 className="font-bold text-slate-800 text-lg">{day.cityName}</h4><span className="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">{day.date}</span></div></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           <button onClick={() => handleOpenServiceModal(day.id, 'hotel')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-blue-600 flex items-center gap-1"><Hotel size={12}/> +Hotel</button>
                           <button onClick={() => handleOpenServiceModal(day.id, 'transport')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-orange-600 flex items-center gap-1"><Bus size={12}/> +Trans</button>
                           <button onClick={() => handleOpenServiceModal(day.id, 'flight')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-orange-600 flex items-center gap-1"><Plane size={12}/> +Flight</button>
                           <button onClick={() => handleOpenServiceModal(day.id, 'activity')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-green-600 flex items-center gap-1"><Flag size={12}/> +Act</button>
                           <button onClick={() => handleOpenServiceModal(day.id, 'restaurant')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-red-600 flex items-center gap-1"><Utensils size={12}/> +Rest</button>
                           <button onClick={() => handleOpenServiceModal(day.id, 'additional')} className="px-3 py-1.5 rounded-full text-xs font-bold border bg-white text-slate-500 hover:text-purple-600 flex items-center gap-1"><Sparkles size={12}/> +Misc</button>
                        </div>
                     </div>
                     
                     {/* Content Textarea */}
                     <div className="p-4 relative">
                        <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 min-h-[80px]" value={day.description} onChange={(e) => { const val = e.target.value; setDays(prev => prev.map(d => d.id === day.id ? {...d, description: val} : d)); }} placeholder="Describe the day's itinerary..." />
                        <button onClick={() => setShowContentRepo(showContentRepo === day.id ? null : day.id)} className="absolute top-6 right-6 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 hover:bg-purple-200 flex items-center gap-1 transition-colors"><Sparkles size={12}/> Smart Desc</button>
                        {showContentRepo === day.id && (
                           <div className="absolute right-4 top-14 w-80 bg-white border border-slate-200 shadow-xl rounded-xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                              <div className="bg-purple-50 p-2 border-b border-purple-100 text-xs font-bold text-purple-800">Suggested Descriptions for {day.cityName}</div>
                              <div className="max-h-60 overflow-y-auto">
                                 {mockCityContent.map(content => (
                                    <div key={content.id} onClick={() => handleApplyContent(day.id, content.description)} className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50"><div className="font-bold text-slate-700 text-xs mb-1">{content.title}</div><p className="text-[10px] text-slate-500 line-clamp-2">{content.description}</p></div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Service Lists */}
                     <div className="px-4 pb-4 space-y-2">
                        {day.itineraryHotels.map(h => (
                           <div key={h.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                              <div className="flex items-center gap-3"><div className="p-2 bg-white rounded-full text-blue-500"><Hotel size={16}/></div><div><h5 className="text-sm font-bold text-slate-800">{h.hotelName}</h5><p className="text-xs text-slate-500">{h.roomType} • {h.mealPlan}</p></div></div>
                              <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-700">${h.cost}</span><button onClick={() => handleRemoveService(day.id, 'hotel', h.id)} className="text-slate-400 hover:text-red-500"><X size={16}/></button></div>
                           </div>
                        ))}
                        {day.itineraryFlights.map(f => (
                           <div key={f.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-100 rounded-lg">
                              <div className="flex items-center gap-3"><div className="p-2 bg-white rounded-full text-orange-500"><Plane size={16}/></div><div><h5 className="text-sm font-bold text-slate-800">{f.flightNumber}</h5><p className="text-xs text-slate-500">{f.departureTime}</p></div></div>
                              <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-700">${f.cost}</span><button onClick={() => handleRemoveService(day.id, 'flight', f.id)} className="text-slate-400 hover:text-red-500"><X size={16}/></button></div>
                           </div>
                        ))}
                        {day.itineraryActivities.map(a => (
                           <div key={a.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                              <div className="flex items-center gap-3"><div className="p-2 bg-white rounded-full text-green-500"><Flag size={16}/></div><div><h5 className="text-sm font-bold text-slate-800">{a.serviceName}</h5><p className="text-xs text-slate-500">{a.type}</p></div></div>
                              <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-700">${a.cost}</span><button onClick={() => handleRemoveService(day.id, 'activity', a.id)} className="text-slate-400 hover:text-red-500"><X size={16}/></button></div>
                           </div>
                        ))}
                        {day.itineraryRestaurants.map(r => (
                           <div key={r.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                              <div className="flex items-center gap-3"><div className="p-2 bg-white rounded-full text-red-500"><Utensils size={16}/></div><div><h5 className="text-sm font-bold text-slate-800">{r.restaurantName}</h5><p className="text-xs text-slate-500">{r.mealType}</p></div></div>
                              <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-700">${r.cost}</span><button onClick={() => handleRemoveService(day.id, 'restaurant', r.id)} className="text-slate-400 hover:text-red-500"><X size={16}/></button></div>
                           </div>
                        ))}
                        {day.itineraryAdditionals.map(a => (
                           <div key={a.id} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-lg">
                              <div className="flex items-center gap-3"><div className="p-2 bg-white rounded-full text-purple-500"><Sparkles size={16}/></div><div><h5 className="text-sm font-bold text-slate-800">{a.serviceName}</h5><p className="text-xs text-slate-500">{a.costType}</p></div></div>
                              <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-700">${a.cost}</span><button onClick={() => handleRemoveService(day.id, 'additional', a.id)} className="text-slate-400 hover:text-red-500"><X size={16}/></button></div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         )}
         
         {activeTab === 'costing' && <CostingSheet initialCostSheet={costSheet} onSave={handleSaveCostSheet} />}
         
         {activeTab === 'extensions' && (
            <div>
               {/* Extensions UI simplified for brevity - reusing structure */}
               <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-slate-800 text-lg">Tour Extensions</h3><button onClick={() => setShowExtModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus size={16}/> Make Extension</button></div>
               {extensions.map(ext => (
                  <div key={ext.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-4"><h4 className="font-bold text-slate-800">{ext.title}</h4><p className="text-sm text-slate-500">{ext.nights} Nights ({ext.type})</p></div>
               ))}
            </div>
         )}
      </div>

      {/* Modals (Pax, Date, Route, Package, Preview, Ext) */}
      {showPaxModal && <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl"><h3 className="font-bold mb-4">Amend Pax</h3><input type="number" value={tempPax.adult} onChange={e=>setTempPax({...tempPax, adult: +e.target.value})} className="border p-2 rounded w-full mb-2"/><button onClick={handleUpdatePax} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update</button><button onClick={()=>setShowPaxModal(false)} className="mt-2 text-sm text-slate-500 w-full">Cancel</button></div></div>}
      {showDateModal && <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl"><h3 className="font-bold mb-4">Amend Date</h3><input type="date" value={tempDate} onChange={e=>setTempDate(e.target.value)} className="border p-2 rounded w-full mb-2"/><button onClick={handleUpdateDate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Shift Itinerary</button><button onClick={()=>setShowDateModal(false)} className="mt-2 text-sm text-slate-500 w-full">Cancel</button></div></div>}
      {showPackageModal && <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl w-96"><h3 className="font-bold mb-4">Insert Package</h3>{mockPackages.map(p=><div key={p.id} onClick={()=>handleInsertPackage(p.id)} className="p-3 border mb-2 rounded hover:bg-blue-50 cursor-pointer">{p.name}</div>)}<button onClick={()=>setShowPackageModal(false)} className="mt-2 text-sm text-slate-500 w-full">Cancel</button></div></div>}
      {showRouteModal && <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl w-96"><h3 className="font-bold mb-4">Reorder Days</h3><div ref={sortableListRef}>{days.map(d=><div key={d.id} data-id={d.id} className="p-2 border mb-2 bg-slate-50 drag-handle cursor-move">{d.cityName}</div>)}</div><button onClick={handleSaveRoute} className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4">Save Order</button></div></div>}
      {showExtModal && <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl"><h3 className="font-bold mb-4">Add Extension</h3><input type="text" placeholder="Title" value={newExt.title || ''} onChange={e=>setNewExt({...newExt, title: e.target.value})} className="border p-2 rounded w-full mb-2"/><button onClick={handleAddExtension} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add</button><button onClick={()=>setShowExtModal(false)} className="mt-2 text-sm text-slate-500 w-full">Cancel</button></div></div>}
      
      {/* Preview Modal */}
      {showPreviewModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 overflow-y-auto print:p-0 print:bg-white print:block">
             <div className="bg-slate-100 w-full min-h-screen md:min-h-0 md:max-w-5xl md:h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden print:w-full print:shadow-none print:h-auto print:rounded-none">
                 <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0 print:hidden">
                    <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Proposal Preview</h3>
                    <div className="flex gap-3">
                        <div className="flex bg-slate-700 rounded-lg p-1 mr-4">
                           <button onClick={() => setPreviewTheme('Aspire')} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${previewTheme === 'Aspire' ? 'bg-blue-500' : 'text-slate-300 hover:text-white'}`}>Aspire</button>
                           <button onClick={() => setPreviewTheme('Simple')} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${previewTheme === 'Simple' ? 'bg-blue-500' : 'text-slate-300 hover:text-white'}`}>Simple</button>
                        </div>
                        <button onClick={handleDownloadWord} className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors">
                           <FileTextIcon size={16}/> Word
                        </button>
                        <button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors">
                           <Printer size={16}/> Print / PDF
                        </button>
                        <button onClick={() => setShowPreviewModal(false)} className="bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded text-sm transition-colors">
                           Close
                        </button>
                    </div>
                 </div>
                 <div ref={proposalRef} className="flex-1 overflow-y-auto p-4 md:p-8 print:overflow-visible print:p-0">
                    <ProposalTemplates theme={previewTheme} quotation={quotation} itinerary={days} costSheet={costSheet}/>
                 </div>
             </div>
         </div>
      )}

      {/* Cost Sheet Preview Modal */}
      {showCostSheetPreview && (
         <CostSheetPreview 
            quotation={quotation}
            days={days}
            costSheet={costSheet}
            onClose={() => setShowCostSheetPreview(false)}
         />
      )}

      <ServiceModals 
        isOpen={serviceModalOpen} 
        onClose={() => setServiceModalOpen(false)} 
        type={activeServiceType} 
        city={activeDayId ? days.find(d => d.id === activeDayId)?.cityName || '' : ''} 
        date={activeDayId ? days.find(d => d.id === activeDayId)?.date : undefined}
        onAdd={handleAddService}
      />
    </div>
  );
};

export default QuotationBuilder;
