
import React, { useState, useEffect, useRef } from 'react';
import { FileText, Map, Settings, MessageSquare, Plus, Trash2, Hotel, Flag, Bus, Plane, Train, MapPin, Copy, Eye, CheckCircle, Calendar, Bed, X, Edit, Users, ArrowRightLeft, RefreshCw, Printer, GripVertical, PackagePlus, Sparkles, Utensils, ArrowLeft, Download, FileText as FileTextIcon, Save } from 'lucide-react';
import { Quotation, QuotationItineraryDay, TourExtension, CostSheet, TravelPackage, CityContent } from '../types';
import CostSheetPreview from './CostSheetPreview';
import ServiceModals from './ServiceModals';
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
  clientName: 'Magical India a Golf Journey',
  destination: 'India',
  updatedAt: '2025-05-15',
  paxAdult: 2,
  paxChild: 0,
  travelDate: '2025-11-25'
};

const initialDays: QuotationItineraryDay[] = [
  { 
    id: 'd1', dayNumber: 1, date: '10-02-2026/Tue', cityName: 'Delhi', description: 'Arrival in Delhi.',
    services: { hotel: false, guide: false, activity: false, monument: false, transfer: false, flight: false, train: false },
    itineraryHotels: [], itineraryTransports: [], itineraryFlights: [], itineraryActivities: [], itineraryRestaurants: [], itineraryAdditionals: []
  },
  { 
    id: 'd2', dayNumber: 2, date: '11-02-2026/Wed', cityName: 'Delhi', description: '',
    services: { hotel: false, guide: false, activity: false, monument: false, transfer: false, flight: false, train: false },
    itineraryHotels: [], itineraryTransports: [], itineraryFlights: [], itineraryActivities: [], itineraryRestaurants: [], itineraryAdditionals: []
  },
  { 
    id: 'd3', dayNumber: 3, date: '12-02-2026/Thu', cityName: 'Agra', description: '',
    services: { hotel: false, guide: false, activity: false, monument: false, transfer: false, flight: false, train: false },
    itineraryHotels: [], itineraryTransports: [], itineraryFlights: [], itineraryActivities: [], itineraryRestaurants: [], itineraryAdditionals: []
  },
];

interface QuotationBuilderProps {
  embedded?: boolean;
  initialData?: Quotation;
  onBack?: () => void;
}

const QuotationBuilder: React.FC<QuotationBuilderProps> = ({ embedded = false, initialData, onBack }) => {
  const [quotation, setQuotation] = useState<Quotation>(initialData || defaultQuotation);
  const [days, setDays] = useState<QuotationItineraryDay[]>(initialDays);
  
  // Costing Form State
  const [costing, setCosting] = useState({
      markupType: 'Service Wise',
      markups: { hotel: 5, guide: 5, tourEscort: 5, activity: 5, entrance: 5, enroute: 5, transfer: 5, train: 5, flight: 5, restaurant: 5, other: 5 },
      commMarkup: 0, creditCardFee: 0, clientCom: 0,
      supplements: { flight: 'Supplement Flightwise', tourEscort: 'Tour Escort Supplement', meal: 'None' },
      otherInfo: { gstType: 'Same State', gstPercent: 5, tcs: 'Tax INC', discountType: '%', discount: 0, srs: 'Both', currency: 'INR', roe: 1, rounding: 0 },
      totals: { saleAmount: 0, tax: 5, finalAmount: 0 }
  });

  // Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [activeServiceType, setActiveServiceType] = useState<'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional'>('hotel');
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [showCostSheetPreview, setShowCostSheetPreview] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Handlers
  const handleOpenServiceModal = (dayId: string, type: 'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional') => {
    setActiveDayId(dayId);
    setActiveServiceType(type);
    setServiceModalOpen(true);
  };

  const handleAddService = (serviceData: any) => {
    // Logic to add service to state (simplified)
    console.log("Adding Service", serviceData);
    setServiceModalOpen(false);
  };

  const updateCosting = (field: string, value: any) => {
      // Helper for nested state updates
      if (field.includes('.')) {
          const [parent, child] = field.split('.');
          setCosting(prev => ({
              ...prev,
              [parent]: {
                  ...(prev[parent as keyof typeof prev] as object),
                  [child]: value
              }
          }));
      } else {
          setCosting(prev => ({ ...prev, [field]: value }));
      }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto no-print">
      
      {/* 1. Header Bar */}
      <div className="bg-white px-6 py-3 border-b border-slate-200 sticky top-0 z-20 shadow-sm flex justify-between items-center">
         <div className="flex gap-8 w-full">
             <div className="flex-1">
                 <label className="block text-xs font-bold text-slate-500 mb-1">Subject</label>
                 <div className="flex items-center gap-2">
                     <Edit size={16} className="text-green-600"/>
                     <h3 className="text-lg font-bold text-green-700">{quotation.clientName}</h3>
                 </div>
             </div>
             <div className="flex-1">
                 <label className="block text-xs font-bold text-slate-500 mb-1">Lead Pax / Client Name</label>
                 <div className="flex items-center gap-2">
                     <Edit size={16} className="text-green-600"/>
                     <h3 className="text-lg font-bold text-slate-800">{quotation.quoteCode} | Single Hotel Category</h3>
                 </div>
             </div>
         </div>
         {onBack && <button onClick={onBack} className="px-4 py-2 border border-slate-300 rounded-full text-sm hover:bg-slate-50">Back</button>}
      </div>

      {/* 2. Pax Slab & Itinerary Header */}
      <div className="px-6 py-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded p-2">
              <span className="text-xs font-bold text-slate-700">Define Pax Slab ( Min Pax: 0 | Max Pax: 0 )</span>
          </div>

          {/* Itinerary Rows */}
          <div className="space-y-4">
              {days.map((day) => (
                  <div key={day.id} className="bg-white border border-slate-200 rounded shadow-sm">
                      <div className="flex items-center justify-between p-2 border-b border-slate-100 bg-slate-50/50">
                          <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">Day {day.dayNumber} | {day.date} | {day.cityName}</span>
                              <Edit size={14} className="text-green-600 cursor-pointer"/>
                          </div>
                          {/* Specific Action Buttons */}
                          <div className="flex flex-wrap gap-1">
                              <button className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Itinerary Info</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'hotel')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1">+ Hotel</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'activity')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Guide</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'activity')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Activity</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'activity')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Monument</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'transport')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Transfer</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'transport')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ TPT</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'flight')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Flight</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'transport')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Train</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'additional')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Enroute</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'restaurant')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Restaurant</button>
                              <button onClick={() => handleOpenServiceModal(day.id, 'additional')} className="bg-orange-400 hover:bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold">+ Additional</button>
                          </div>
                      </div>
                      <div className="p-2">
                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer w-fit">
                              <input type="checkbox" className="rounded text-blue-600"/> Destination Description
                          </label>
                      </div>
                  </div>
              ))}
          </div>

          <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer w-fit"><input type="checkbox"/> Optional Experiences</label>
              <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer w-fit"><input type="checkbox"/> Overview/ Inc&Exc/ T&C</label>
          </div>

          {/* 3. Costing Section */}
          <div className="bg-white border border-slate-200 rounded shadow-sm p-4 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-slate-800 text-sm">Brochure Costing validity Period</h4>
                  <Edit size={16} className="text-green-600 cursor-pointer"/>
              </div>

              {/* Add Markup */}
              <div>
                  <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                      <span className="text-xs font-bold text-slate-800">Add Markup</span>
                  </div>
                  <div className="flex gap-4 mb-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="markup" checked={costing.markupType === 'Universal'} onChange={() => updateCosting('markupType', 'Universal')}/> Universal</label>
                      <label className="flex items-center gap-1"><input type="radio" name="markup" checked={costing.markupType === 'Service Wise'} onChange={() => updateCosting('markupType', 'Service Wise')}/> Service Wise</label>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs border border-slate-300">
                          <thead className="bg-slate-50 font-bold text-slate-700">
                              <tr>
                                  {['Hotel', 'Guide', 'TourEscort', 'Activity', 'Entrance', 'Enroute', 'Transfer', 'Train', 'Flight', 'Restaurant', 'Other'].map(h => (
                                      <th key={h} className="border border-slate-300 p-1">{h}</th>
                                  ))}
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  {Object.keys(costing.markups).map((key) => (
                                      <td key={key} className="border border-slate-300 p-1">
                                          <div className="flex flex-col gap-1">
                                              <select className="border border-slate-200 rounded text-[10px] w-full"><option>%</option><option>Flat</option></select>
                                              <input 
                                                  type="number" 
                                                  value={(costing.markups as any)[key]} 
                                                  onChange={(e) => updateCosting(`markups.${key}`, Number(e.target.value))}
                                                  className="border border-slate-200 rounded text-center w-full py-1"
                                              />
                                          </div>
                                      </td>
                                  ))}
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

              {/* Commission & Supplements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                          <span className="text-xs font-bold text-slate-800">Add Commission <span className="font-normal text-slate-500">[Including Airfare]</span></span>
                      </div>
                      <div className="flex gap-2">
                          <div className="flex-1">
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Comm Mark Up(%)</label>
                              <input type="number" value={costing.commMarkup} onChange={(e) => updateCosting('commMarkup', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-center"/>
                          </div>
                          <div className="flex-1">
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Credit Card Fee(%)</label>
                              <input type="number" value={costing.creditCardFee} onChange={(e) => updateCosting('creditCardFee', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-center"/>
                          </div>
                          <div className="flex-1">
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Client Com(%)</label>
                              <input type="number" value={costing.clientCom} onChange={(e) => updateCosting('clientCom', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-center"/>
                          </div>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                              <span className="text-xs font-bold text-slate-800">Supplement Selection</span>
                          </div>
                          <div className="flex gap-2">
                              <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Flight Cost</label>
                                  <select value={costing.supplements.flight} onChange={(e) => updateCosting('supplements.flight', e.target.value)} className="w-full border border-slate-300 rounded px-1 py-1 text-xs bg-white"><option>Supplement Flightwise</option></select>
                              </div>
                              <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Tour Escort</label>
                                  <select value={costing.supplements.tourEscort} onChange={(e) => updateCosting('supplements.tourEscort', e.target.value)} className="w-full border border-slate-300 rounded px-1 py-1 text-xs bg-white"><option>Tour Escort Supplement</option><option>Guide Cost Only</option></select>
                              </div>
                          </div>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                              <span className="text-xs font-bold text-slate-800">Meal Supplement</span>
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Meal Cost</label>
                              <select value={costing.supplements.meal} onChange={(e) => updateCosting('supplements.meal', e.target.value)} className="w-full border border-slate-300 rounded px-1 py-1 text-xs bg-white"><option>None</option></select>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Other Information */}
              <div>
                  <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                      <span className="text-xs font-bold text-slate-800">Other Information</span>
                  </div>
                  <div className="flex flex-wrap items-end gap-2 text-xs">
                      <div className="w-24">
                          <label className="block font-bold text-slate-600 mb-1">GST Type</label>
                          <select value={costing.otherInfo.gstType} onChange={(e) => updateCosting('otherInfo.gstType', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5"><option>Same State</option><option>Other State</option></select>
                      </div>
                      <div className="w-24">
                          <label className="block font-bold text-slate-600 mb-1">GST(%)</label>
                          <select value={costing.otherInfo.gstPercent} onChange={(e) => updateCosting('otherInfo.gstPercent', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1.5"><option value="5">5% GST (5)</option></select>
                      </div>
                      <div className="w-24">
                          <label className="block font-bold text-slate-600 mb-1">TCS(%)</label>
                          <select value={costing.otherInfo.tcs} onChange={(e) => updateCosting('otherInfo.tcs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5"><option>Tax INC</option></select>
                      </div>
                      <div className="w-16">
                          <label className="block font-bold text-slate-600 mb-1">Discount Type</label>
                          <select value={costing.otherInfo.discountType} onChange={(e) => updateCosting('otherInfo.discountType', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5"><option>%</option><option>Flat</option></select>
                      </div>
                      <div className="w-20">
                          <label className="block font-bold text-slate-600 mb-1">Discount</label>
                          <input type="number" value={costing.otherInfo.discount} onChange={(e) => updateCosting('otherInfo.discount', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1.5"/>
                      </div>
                      <div className="w-24">
                          <label className="block font-bold text-slate-600 mb-1">SRS & TRR</label>
                          <select value={costing.otherInfo.srs} onChange={(e) => updateCosting('otherInfo.srs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5"><option>Both</option><option>None</option></select>
                      </div>
                      <div className="w-20">
                          <label className="block font-bold text-slate-600 mb-1">Currency</label>
                          <select value={costing.otherInfo.currency} onChange={(e) => updateCosting('otherInfo.currency', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5"><option>INR</option><option>USD</option></select>
                      </div>
                      <div className="w-24">
                          <label className="block font-bold text-slate-600 mb-1">ROE(For 1 INR)</label>
                          <input type="number" value={costing.otherInfo.roe} onChange={(e) => updateCosting('otherInfo.roe', Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1.5"/>
                          <div className="text-[9px] text-slate-500 mt-0.5">As on :28-11-2025</div>
                      </div>
                      <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-900 shadow-lg">Save</button>
                  </div>
              </div>

              <div className="text-red-500 text-xs mt-2">You have selected Flight as a supplement.</div>

              <div className="flex gap-2 pt-4">
                  <button className="bg-white border border-slate-400 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Preview CostSheet</button>
                  <button className="bg-white border border-slate-400 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Preview Proposal</button>
                  <button onClick={onBack} className="bg-white border border-slate-400 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
              </div>
          </div>
      </div>

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
