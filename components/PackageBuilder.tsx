
import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Trash2, AlignLeft, X, Save, FileText, Bold, Italic, List, Link as LinkIcon, RotateCcw, ArrowLeft, Hotel, MapPin, Users, DollarSign, Calculator, Percent, Edit, Download } from 'lucide-react';
import { TravelPackage, PackageItineraryItem, PackageService, PackageCosting, CostSheet, Quotation, QuotationItineraryDay } from '../types';
import { initialCities } from './mockData';
import CostingSheet from './CostingSheet';
import CostSheetPreview from './CostSheetPreview';

const initialPackages: TravelPackage[] = [
  { 
    id: '1', 
    code: 'MIGJ', 
    name: 'Magical India a Golf Journey', 
    planType: 'Day Wise', 
    supplier: 'Hilton', 
    fromDate: '2026-02-10',
    toDate: '2026-02-24',
    totalNights: 14, 
    duration: '14N/15D', 
    destination: 'India', 
    paxType: 'FIT', 
    status: 'Active', 
    description: 'Luxury stay at water villa.',
    creationDate: '26-04-2025 11:01:21 AM',
    services: [],
    costing: {
        markupType: 'Service Wise',
        markups: { hotel: 5, guide: 5, tourEscort: 5, activity: 5, entrance: 5, enroute: 5, transfer: 5, train: 5, flight: 5, restaurant: 5, other: 5 },
        gstType: 'Other State',
        gstPercentage: 5,
        currency: 'INR',
        roe: 1
    }
  },
];

const PackageBuilder: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>(initialPackages);
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  
  // Filter States
  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterDestination, setFilterDestination] = useState('All Destination');
  const [filterStatus, setFilterStatus] = useState('All Status');

  // Form State for New Package
  const [newPackage, setNewPackage] = useState<Partial<TravelPackage>>({
    planType: 'Date Wise',
    paxType: 'FIT',
    status: 'Active',
    itinerary: []
  });

  // Detail View State
  const [detailTab, setDetailTab] = useState<'itinerary' | 'costing'>('itinerary');
  const [showCostSheetPreview, setShowCostSheetPreview] = useState(false);
  const [currentCostSheet, setCurrentCostSheet] = useState<CostSheet | null>(null);

  // --- Helper Functions for Cost Sheet ---
  const calculatePackageCosts = (pkg: TravelPackage): CostSheet => {
    const sheet: CostSheet = {
        id: pkg.id,
        quotationId: pkg.code,
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
        markupPercentage: 10, // Default markup
        agentCommission: 0,
        isoCommission: 0,
        gstType: (pkg.costing?.gstType as 'IGST' | 'CGST/SGST') || 'IGST',
        gstPercentage: pkg.costing?.gstPercentage || 5,
        totalLandCost: 0,
        markupAmount: 0,
        isoAmount: 0,
        gstAmount: 0,
        totalCost: 0,
        finalSalePrice: 0
    };

    pkg.services?.forEach(s => {
        const cost = Number(s.totalCost) || 0;
        switch(s.type) {
            case 'Hotel': sheet.hotelCost += cost; break;
            case 'Transfer': 
            case 'TPT':
                sheet.transportCost += cost; break;
            case 'Train': sheet.transportCost += cost; break;
            case 'Flight': sheet.flightCost += cost; break;
            case 'Guide': sheet.guideCost += cost; break;
            case 'Activity': sheet.activityCost += cost; break;
            case 'Monument': sheet.monumentCost += cost; break;
            case 'Restaurant': sheet.mealCost += cost; break;
            case 'Enroute': sheet.enrouteCost += cost; break;
            case 'Additional': 
            case 'Other':
                sheet.miscCost += cost; break;
            default: sheet.miscCost += cost;
        }
    });
    return sheet;
  };

  const mapPackageToPreviewData = (pkg: TravelPackage) => {
      const days: QuotationItineraryDay[] = [];
      // Generate days based on totalNights or itinerary items
      const itineraryItems = pkg.itinerary || Array.from({ length: pkg.totalNights }).map((_, i) => ({ dayNumber: i+1, date: '', destination: 'Unknown' }));
      
      const totalDaysToMap = pkg.totalNights > 0 ? pkg.totalNights : itineraryItems.length;

      for(let i=1; i <= totalDaysToMap; i++) {
          const dayServices = pkg.services?.filter(s => s.dayNumber === i) || [];
          const itinItem = pkg.itinerary?.find(it => it.dayNumber === i);
          
          days.push({
              id: `day-${i}`,
              dayNumber: i,
              date: itinItem?.date || `Day ${i}`,
              cityName: itinItem?.destination || '',
              description: `Itinerary for Day ${i}`,
              services: { hotel: false, guide: false, activity: false, monument: false, transfer: false, flight: false, train: false },
              itineraryHotels: dayServices.filter(s => s.type === 'Hotel').map(s => ({
                  id: s.id, hotelName: s.serviceName, roomType: 'Standard', mealPlan: 'CP', checkIn: '', checkOut: '', cost: s.totalCost, supplier: s.supplierName, overrideCost: s.totalCost
              })),
              itineraryActivities: dayServices.filter(s => ['Activity', 'Monument', 'Guide'].includes(s.type)).map(s => ({
                  id: s.id, serviceName: s.serviceName, type: s.type as any, timeSlot: '', duration: '', cost: s.totalCost, overrideCost: s.totalCost
              })),
              itineraryTransports: dayServices.filter(s => ['Transfer', 'TPT'].includes(s.type)).map(s => ({
                  id: s.id, vehicleType: s.serviceName, sector: '', disposal: false, cost: s.totalCost, overrideCost: s.totalCost
              })),
              itineraryFlights: dayServices.filter(s => s.type === 'Flight').map(s => ({
                  id: s.id, carrierName: s.serviceName, flightNumber: '', departureTime: '', arrivalTime: '', class: 'Economy', cost: s.totalCost, overrideCost: s.totalCost
              })),
              itineraryRestaurants: dayServices.filter(s => s.type === 'Restaurant').map(s => ({
                  id: s.id, restaurantName: s.serviceName, mealType: 'Dinner', supplier: s.supplierName, cost: s.totalCost, overrideCost: s.totalCost
              })),
              itineraryAdditionals: dayServices.filter(s => ['Additional', 'Other'].includes(s.type)).map(s => ({
                  id: s.id, serviceName: s.serviceName, type: 'Misc', supplier: s.supplierName, cost: s.totalCost, overrideCost: s.totalCost, costType: 'Per Person'
              }))
          });
      }

      const quotationMock: Quotation = {
          id: pkg.id,
          queryId: pkg.code,
          quoteCode: pkg.code,
          version: '1',
          status: 'Draft',
          hotelCategory: 'Standard',
          mealPlan: 'CP',
          clientName: 'Package Master',
          destination: pkg.destination,
          updatedAt: new Date().toLocaleDateString(),
          paxAdult: 1,
          paxChild: 0,
          travelDate: pkg.fromDate || ''
      };

      return { quotation: quotationMock, days };
  };

  useEffect(() => {
      if (selectedPackage && detailTab === 'costing') {
          const calculatedSheet = calculatePackageCosts(selectedPackage);
          setCurrentCostSheet(calculatedSheet);
      }
  }, [selectedPackage, detailTab]);


  const generateItinerary = () => {
    if (!newPackage.fromDate || !newPackage.toDate) return;

    const start = new Date(newPackage.fromDate);
    const end = new Date(newPackage.toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    setNewPackage(prev => ({...prev, totalNights: nights}));

    const itinerary: PackageItineraryItem[] = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i <= nights; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dayName = days[currentDate.getDay()];
        const displayDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

        itinerary.push({
            id: Math.random().toString(),
            dayNumber: i + 1,
            date: displayDate,
            dayName: dayName,
            destination: ''
        });
    }
    setNewPackage(prev => ({ ...prev, itinerary }));
  };

  const handleItineraryDestinationChange = (id: string, value: string) => {
      setNewPackage(prev => ({
          ...prev,
          itinerary: prev.itinerary?.map(item => item.id === id ? { ...item, destination: value } : item)
      }));
  };

  const handleSave = () => {
    if (!newPackage.name) return;
    const durationText = `${newPackage.totalNights || 0}N/${(newPackage.totalNights || 0) + 1}D`;
    const newPkg: TravelPackage = { 
        ...newPackage, 
        id: Math.random().toString(), 
        code: `PKG00${packages.length + 2}`,
        duration: durationText,
        supplier: 'Direct',
        creationDate: new Date().toLocaleString(),
        services: [],
        costing: {
            markupType: 'Service Wise',
            markups: { hotel: 5, guide: 5, tourEscort: 5, activity: 5, entrance: 5, enroute: 5, transfer: 5, train: 5, flight: 5, restaurant: 5, other: 5 },
            gstType: 'Other State',
            gstPercentage: 5,
            currency: 'INR',
            roe: 1
        }
    } as TravelPackage;

    setPackages([...packages, newPkg]);
    setShowForm(false);
    setNewPackage({ planType: 'Date Wise', paxType: 'FIT', status: 'Active', itinerary: [] });
  };

  const setShowForm = (show: boolean) => {
      setView(show ? 'add' : 'list');
  };

  const handleViewPackage = (pkg: TravelPackage) => {
      setSelectedPackage(pkg);
      setView('detail');
  };

  const handlePreviewPackage = (pkg: TravelPackage) => {
      setSelectedPackage(pkg);
      const sheet = calculatePackageCosts(pkg);
      setCurrentCostSheet(sheet);
      setShowCostSheetPreview(true);
  };

  const filteredPackages = packages.filter(pkg => {
      const matchId = pkg.code.toLowerCase().includes(filterId.toLowerCase());
      const matchName = pkg.name.toLowerCase().includes(filterName.toLowerCase());
      const matchDest = filterDestination === 'All Destination' || pkg.destination === filterDestination;
      const matchStatus = filterStatus === 'All Status' || pkg.status === filterStatus;
      return matchId && matchName && matchDest && matchStatus;
  });

  // --- Detail View Logic ---
  const handleAddService = (day: number) => {
      if (!selectedPackage) return;
      const newService: PackageService = {
          id: Math.random().toString(),
          dayNumber: day,
          type: 'Hotel',
          serviceName: 'New Service',
          supplierName: 'Select Supplier',
          serviceType: 'Normal',
          dayType: 'Full Day',
          paxRange: 'All',
          paxSlab: 'All Pax',
          perDayCost: 0,
          noOfDays: 1,
          totalCost: 0
      };
      
      const updatedServices = [...(selectedPackage.services || []), newService];
      const updatedPackage = { ...selectedPackage, services: updatedServices };
      
      setPackages(packages.map(p => p.id === selectedPackage.id ? updatedPackage : p));
      setSelectedPackage(updatedPackage);
  };

  const updateService = (id: string, field: keyof PackageService, value: any) => {
      if (!selectedPackage) return;
      
      const updatedServices = selectedPackage.services?.map(s => {
          if (s.id === id) {
              const updatedS = { ...s, [field]: value };
              // Recalculate total cost if perDayCost or noOfDays changes
              if (field === 'perDayCost' || field === 'noOfDays') {
                  updatedS.totalCost = Number(updatedS.perDayCost) * Number(updatedS.noOfDays);
              }
              return updatedS;
          }
          return s;
      }) || [];

      const updatedPackage = { ...selectedPackage, services: updatedServices };
      setPackages(packages.map(p => p.id === selectedPackage.id ? updatedPackage : p));
      setSelectedPackage(updatedPackage);
  };

  const handleSaveCostSheet = (sheet: CostSheet) => {
      // In a real app, we would map the CostSheet back to PackageCosting or save it separately.
      // For now, update the local state for preview
      setCurrentCostSheet(sheet);
      alert('Cost Sheet updated! You can now download the PDF/Excel.');
  };

  // --- RENDER ---

  if (view === 'detail' && selectedPackage) {
      return (
          <div className="p-6 h-full flex flex-col bg-slate-50 font-sans">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                      <button onClick={() => setView('list')} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft size={20}/></button>
                      <div>
                          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Package</div>
                          <h2 className="text-2xl font-bold text-slate-800">{selectedPackage.name}</h2>
                          <div className="text-sm text-slate-500">{selectedPackage.code} | {selectedPackage.duration}</div>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => setView('list')} className="px-4 py-2 border border-slate-300 rounded bg-white text-sm font-medium hover:bg-slate-50">Back</button>
                  </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-lg px-2 pt-2">
                  <button onClick={() => setDetailTab('itinerary')} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${detailTab === 'itinerary' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`}>Itinerary Builder</button>
                  <button onClick={() => setDetailTab('costing')} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${detailTab === 'costing' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`}>Package Costing</button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                  {detailTab === 'itinerary' && (
                      <div className="space-y-6">
                          {/* Loop through logical days based on duration/nights. Assuming generated itinerary exists or we mock it based on total nights */}
                          {Array.from({ length: selectedPackage.totalNights }).map((_, idx) => {
                              const dayNum = idx + 1;
                              const currentDayServices = selectedPackage.services?.filter(s => s.dayNumber === dayNum) || [];
                              const dateStr = selectedPackage.fromDate ? new Date(new Date(selectedPackage.fromDate).setDate(new Date(selectedPackage.fromDate).getDate() + idx)).toLocaleDateString() : `Day ${dayNum}`;

                              return (
                                  <div key={dayNum} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                                          <div className="flex items-center gap-2">
                                              <span className="font-bold text-slate-700">Day {dayNum} | {dateStr}</span>
                                              <button className="text-blue-600 hover:text-blue-800"><Edit size={14}/></button>
                                          </div>
                                          <div className="flex gap-1 text-[10px]">
                                              {['Hotel', 'Guide', 'Activity', 'Monument', 'Transfer', 'TPT', 'Flight', 'Train', 'Enroute', 'Restaurant', 'Additional'].map(t => (
                                                  <button key={t} onClick={() => handleAddService(dayNum)} className="bg-orange-400 text-white px-2 py-1 rounded hover:bg-orange-500 shadow-sm font-bold">
                                                      + {t}
                                                  </button>
                                              ))}
                                          </div>
                                      </div>

                                      {/* Services Table */}
                                      {currentDayServices.length > 0 ? (
                                          <div className="p-4 bg-slate-50/50">
                                              <table className="w-full text-xs text-left border border-slate-300">
                                                  <thead className="bg-slate-200 text-slate-700 font-bold">
                                                      <tr>
                                                          <th className="p-2 border border-slate-300">Type</th>
                                                          <th className="p-2 border border-slate-300">Service Name</th>
                                                          <th className="p-2 border border-slate-300">Supplier Name</th>
                                                          <th className="p-2 border border-slate-300">Pax Range</th>
                                                          <th className="p-2 border border-slate-300">Per Day Cost</th>
                                                          <th className="p-2 border border-slate-300">No.Of Days</th>
                                                          <th className="p-2 border border-slate-300">Total Cost</th>
                                                          <th className="p-2 border border-slate-300">Action</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody className="bg-white">
                                                      {currentDayServices.map(service => (
                                                          <tr key={service.id}>
                                                              <td className="p-2 border border-slate-300">{service.type}</td>
                                                              <td className="p-2 border border-slate-300"><input type="text" value={service.serviceName} onChange={(e) => updateService(service.id, 'serviceName', e.target.value)} className="w-full outline-none"/></td>
                                                              <td className="p-2 border border-slate-300">{service.supplierName}</td>
                                                              <td className="p-2 border border-slate-300">{service.paxRange}</td>
                                                              <td className="p-2 border border-slate-300"><input type="number" value={service.perDayCost} onChange={(e) => updateService(service.id, 'perDayCost', Number(e.target.value))} className="w-16 outline-none"/></td>
                                                              <td className="p-2 border border-slate-300">{service.noOfDays}</td>
                                                              <td className="p-2 border border-slate-300 font-bold">{service.totalCost}</td>
                                                              <td className="p-2 border border-slate-300 text-center">
                                                                  <button className="text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                                                              </td>
                                                          </tr>
                                                      ))}
                                                  </tbody>
                                              </table>
                                          </div>
                                      ) : (
                                          <div className="p-4 text-center text-xs text-slate-400 italic">No services added for this day.</div>
                                      )}
                                  </div>
                              );
                          })}
                      </div>
                  )}

                  {detailTab === 'costing' && currentCostSheet && (
                      <div className="space-y-6 animate-in fade-in">
                          {/* Toolbar */}
                          <div className="flex justify-end gap-2 mb-4">
                              <button 
                                onClick={() => setShowCostSheetPreview(true)}
                                className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-slate-900"
                              >
                                  <Download size={16}/> Preview & Download PDF/Excel
                              </button>
                          </div>

                          <CostingSheet 
                              initialCostSheet={currentCostSheet} 
                              onSave={handleSaveCostSheet} 
                          />
                      </div>
                  )}
              </div>

              {/* Preview Modal */}
              {showCostSheetPreview && selectedPackage && currentCostSheet && (
                  <CostSheetPreview
                      quotation={mapPackageToPreviewData(selectedPackage).quotation}
                      days={mapPackageToPreviewData(selectedPackage).days}
                      costSheet={currentCostSheet}
                      onClose={() => setShowCostSheetPreview(false)}
                  />
              )}
          </div>
      );
  }

  // --- List & Form View ---

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50 font-sans">
      {view === 'list' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Add Package Builder</h2>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow text-sm">Save</button>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded shadow text-sm">Save and New</button>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded shadow text-sm">Cancel</button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 border-b pb-2">General Information</h4>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Package Name</label>
                              <input type="text" className="w-full border-b-2 border-red-500 outline-none text-sm py-1"/>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Package Code</label>
                              <input type="text" className="w-full border-b-2 border-red-500 outline-none text-sm py-1"/>
                          </div>
                      </div>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 border-b pb-2">Package Plan Itinerary</h4>
                      <div className="mb-4">
                          <select className="border border-slate-300 rounded p-1 text-sm w-full mb-2"><option>Date Wise</option></select>
                          <div className="flex gap-2 items-end">
                              <div className="flex-1">
                                  <label className="block text-xs text-slate-500">From Date</label>
                                  <div className="relative">
                                      <input type="text" value="28-11-2025" className="w-full border-b-2 border-red-500 text-sm py-1 outline-none"/>
                                      <Calendar size={14} className="absolute right-0 bottom-2 text-slate-400"/>
                                  </div>
                              </div>
                              <div className="flex-1">
                                  <label className="block text-xs text-slate-500">To Date</label>
                                  <div className="relative">
                                      <input type="text" value="01-12-2025" className="w-full border-b-2 border-red-500 text-sm py-1 outline-none"/>
                                      <Calendar size={14} className="absolute right-0 bottom-2 text-slate-400"/>
                                  </div>
                              </div>
                              <div className="w-16">
                                  <label className="block text-xs text-slate-500">Total Nights</label>
                                  <input type="text" value="3" className="w-full border-b-2 border-red-500 text-sm py-1 outline-none text-center"/>
                              </div>
                              <button className="bg-green-600 text-white px-4 py-1 rounded text-sm font-bold">+ Add</button>
                          </div>
                      </div>
                      <div className="flex justify-end mb-2">
                          <button className="bg-purple-400 text-white px-3 py-1 rounded text-xs">+ Add Destination</button>
                      </div>
                      <table className="w-full text-xs border border-slate-300 text-center">
                          <thead className="bg-slate-50 font-bold text-slate-600">
                              <tr>
                                  <th className="p-2 border-r">Sr.No.</th>
                                  <th className="p-2 border-r">Date/Day</th>
                                  <th className="p-2 border-r">Destination</th>
                                  <th className="p-2"></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="p-2 border-r border-t">Day 1</td>
                                  <td className="p-2 border-r border-t">28-11-2025 /Fri</td>
                                  <td className="p-2 border-r border-t text-slate-400">Select City</td>
                                  <td className="p-2 border-t"></td>
                              </tr>
                              <tr>
                                  <td className="p-2 border-r border-t">Day 2</td>
                                  <td className="p-2 border-r border-t">29-11-2025 /Sat</td>
                                  <td className="p-2 border-r border-t text-slate-400">Select City</td>
                                  <td className="p-2 border-t"></td>
                              </tr>
                              <tr>
                                  <td className="p-2 border-r border-t">Day 3</td>
                                  <td className="p-2 border-r border-t">30-11-2025 /Sun</td>
                                  <td className="p-2 border-r border-t text-slate-400">Select City</td>
                                  <td className="p-2 border-t"></td>
                              </tr>
                              <tr>
                                  <td className="p-2 border-r border-t">Day 4</td>
                                  <td className="p-2 border-r border-t">01-12-2025 /Mon</td>
                                  <td className="p-2 border-r border-t text-slate-400">Select City</td>
                                  <td className="p-2 border-t text-red-500"><Trash2 size={12}/></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div className="mt-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Description</h4>
                  <div className="border border-slate-200 rounded p-1">
                      <div className="flex gap-2 border-b border-slate-100 pb-1 mb-2 text-xs text-slate-500">
                          <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                          <span className="font-bold ml-2">B</span><span className="italic">I</span><AlignLeft size={12}/><List size={12}/>
                      </div>
                      <textarea className="w-full h-16 outline-none text-sm resize-none"></textarea>
                  </div>
              </div>
          </div>

          <div className="bg-green-600 text-white px-4 py-2 font-bold mb-4 rounded-t-lg">Package Generated</div>
          <div className="bg-white border border-slate-200 rounded overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-4">
                  <input type="text" placeholder="Package Id" value={filterId} onChange={e => setFilterId(e.target.value)} className="border p-1 text-xs rounded"/>
                  <input type="text" placeholder="Package Name" value={filterName} onChange={e => setFilterName(e.target.value)} className="border p-1 text-xs rounded"/>
                  <select className="border p-1 text-xs rounded"><option>28-10-2025 - 28-11-2025</option></select>
                  <select value={filterDestination} onChange={e => setFilterDestination(e.target.value)} className="border p-1 text-xs rounded"><option>All Destination</option><option>India</option></select>
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border p-1 text-xs rounded"><option>All Status</option><option>Active</option><option>Inactive</option></select>
              </div>
              <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b font-bold text-slate-600 uppercase">
                      <tr>
                          <th className="p-3">Package ID.</th>
                          <th className="p-3">Creation Date</th>
                          <th className="p-3">From Date</th>
                          <th className="p-3">To Date</th>
                          <th className="p-3">Duration</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {filteredPackages.map(pkg => (
                          <tr key={pkg.id} className="hover:bg-slate-50">
                              <td className="p-3">
                                  <button onClick={() => handleViewPackage(pkg)} className="text-green-600 font-bold hover:underline">{pkg.code}</button>
                              </td>
                              <td className="p-3 text-slate-600">{pkg.creationDate || '26-04-2025'}</td>
                              <td className="p-3 text-slate-600">{pkg.fromDate}</td>
                              <td className="p-3 text-slate-600">{pkg.toDate}</td>
                              <td className="p-3 text-slate-600">{pkg.duration}</td>
                              <td className="p-3 text-green-600 font-medium">{pkg.status}</td>
                              <td className="p-3 flex gap-2">
                                  <button onClick={() => { setSelectedPackage(pkg); setDetailTab('costing'); setView('detail'); }} className="bg-black text-white px-2 py-1 rounded hover:bg-slate-800">Package Costing</button>
                                  <button className="bg-black text-white px-2 py-1 rounded hover:bg-slate-800">Hotel Availability</button>
                                  <button onClick={() => handlePreviewPackage(pkg)} className="bg-slate-200 text-slate-700 px-2 py-1 rounded border border-slate-300 hover:bg-slate-300">Preview</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          {/* Modal for List View */}
          {showCostSheetPreview && selectedPackage && currentCostSheet && (
              <CostSheetPreview
                  quotation={mapPackageToPreviewData(selectedPackage).quotation}
                  days={mapPackageToPreviewData(selectedPackage).days}
                  costSheet={currentCostSheet}
                  onClose={() => { setShowCostSheetPreview(false); if(view === 'list') setSelectedPackage(null); }}
              />
          )}
        </>
      )}
    </div>
  );
};

function ChevronDown({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
}

export default PackageBuilder;
