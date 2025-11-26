
import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Save, Truck, Hotel, Flag, Landmark, Plane, Utensils, Sparkles } from 'lucide-react';
import { CostSheet } from '../types';

interface CostingSheetProps {
  initialCostSheet?: CostSheet;
  onSave?: (sheet: CostSheet) => void;
}

const defaultCostSheet: CostSheet = {
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

const CostingSheet: React.FC<CostingSheetProps> = ({ initialCostSheet = defaultCostSheet, onSave }) => {
  const [sheet, setSheet] = useState<CostSheet>(initialCostSheet);

  // Advanced Calculation Logic (Module 22)
  useEffect(() => {
    // 1. Total Land Cost
    const totalLand = 
      sheet.hotelCost + 
      sheet.transportCost + 
      sheet.flightCost +
      sheet.guideCost + 
      sheet.activityCost + 
      sheet.monumentCost + 
      sheet.mealCost +
      sheet.miscCost +
      sheet.escortCost + 
      sheet.enrouteCost +
      sheet.permitCost;

    // 2. Markup Amount
    const markupAmt = totalLand * (sheet.markupPercentage / 100);
    
    // 3. ISO Amount (Calculated on Cost + Markup)
    const subTotalForIso = totalLand + markupAmt;
    const isoAmt = subTotalForIso * (sheet.isoCommission / 100);
    
    // 4. GST Calculation (On Cost + Markup + ISO)
    const taxableAmount = subTotalForIso + isoAmt;
    const gstAmt = taxableAmount * (sheet.gstPercentage / 100);

    // 5. Final Sale Price
    const finalPrice = taxableAmount + gstAmt;

    setSheet(prev => ({
      ...prev,
      totalLandCost: parseFloat(totalLand.toFixed(2)),
      markupAmount: parseFloat(markupAmt.toFixed(2)),
      isoAmount: parseFloat(isoAmt.toFixed(2)),
      gstAmount: parseFloat(gstAmt.toFixed(2)),
      totalCost: parseFloat((totalLand + markupAmt + isoAmt).toFixed(2)), // Pre-tax total
      finalSalePrice: parseFloat(finalPrice.toFixed(2))
    }));
  }, [
    sheet.hotelCost, sheet.transportCost, sheet.flightCost, sheet.guideCost, sheet.activityCost, 
    sheet.monumentCost, sheet.mealCost, sheet.miscCost, sheet.escortCost, sheet.enrouteCost, sheet.permitCost,
    sheet.markupPercentage, sheet.isoCommission, sheet.gstPercentage
  ]);

  // Sync with parent prop updates (e.g. when Recalculate is clicked in parent)
  useEffect(() => {
    if(initialCostSheet) {
        setSheet(initialCostSheet);
    }
  }, [initialCostSheet]);

  const updateCost = (key: keyof CostSheet, value: number) => {
    setSheet(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Calculator size={18} className="text-blue-600"/> Advanced Costing Engine
        </h3>
        <div className="text-sm text-slate-500">
           Total Land Cost: <span className="font-mono font-bold text-slate-700">${sheet.totalLandCost.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Granular Inputs (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
             {/* 1. Component Costs */}
             <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Hotel size={14} /> Component Costs (Net)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { label: 'Hotel Cost', key: 'hotelCost' },
                     { label: 'Transport', key: 'transportCost' },
                     { label: 'Flights', key: 'flightCost' },
                     { label: 'Guide Cost', key: 'guideCost' },
                     { label: 'Activity Cost', key: 'activityCost' },
                     { label: 'Monument Cost', key: 'monumentCost' },
                     { label: 'Meals/Rest.', key: 'mealCost' },
                     { label: 'Misc/Extras', key: 'miscCost' },
                     { label: 'Escort Cost', key: 'escortCost' },
                     { label: 'Enroute Exp', key: 'enrouteCost' },
                     { label: 'Permit/Visa', key: 'permitCost' },
                   ].map((item) => (
                     <div key={item.key}>
                        <label className="block text-xs font-medium text-slate-600 mb-1">{item.label}</label>
                        <div className="relative">
                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                           <input 
                             type="number" 
                             min="0"
                             value={sheet[item.key as keyof CostSheet] as number}
                             onChange={(e) => updateCost(item.key as keyof CostSheet, parseFloat(e.target.value) || 0)}
                             className="w-full pl-6 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* 2. Markup & Taxes */}
             <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Percent size={14} /> Markups & Taxation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Company Markup (%)</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           min="0"
                           value={sheet.markupPercentage}
                           onChange={(e) => updateCost('markupPercentage', parseFloat(e.target.value) || 0)}
                           className="w-full pl-3 pr-8 py-2 border border-blue-200 bg-blue-50 rounded-lg text-sm font-semibold text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                         <Percent size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"/>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Amt: ${sheet.markupAmount.toFixed(2)}</p>
                   </div>
                   
                   <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">ISO / Mgmt Fee (%)</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           min="0"
                           value={sheet.isoCommission}
                           onChange={(e) => updateCost('isoCommission', parseFloat(e.target.value) || 0)}
                           className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                         <Percent size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Amt: ${sheet.isoAmount.toFixed(2)}</p>
                   </div>

                   <div>
                      <div className="flex justify-between mb-2">
                         <label className="block text-xs font-bold text-slate-700 uppercase">GST / VAT (%)</label>
                         <select 
                            value={sheet.gstType}
                            onChange={(e) => setSheet({...sheet, gstType: e.target.value as any})}
                            className="text-xs border-none bg-transparent text-slate-500 focus:ring-0 p-0"
                         >
                            <option value="IGST">IGST</option>
                            <option value="CGST/SGST">CGST</option>
                         </select>
                      </div>
                      <div className="relative">
                         <input 
                           type="number" 
                           min="0"
                           value={sheet.gstPercentage}
                           onChange={(e) => updateCost('gstPercentage', parseFloat(e.target.value) || 0)}
                           className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                         <Percent size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Amt: ${sheet.gstAmount.toFixed(2)}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Final Calculation Table (4 cols) */}
          <div className="lg:col-span-4">
             <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden sticky top-6">
                {/* Green Header as requested */}
                <div className="bg-green-600 p-4 text-white text-center">
                   <h3 className="text-lg font-bold uppercase tracking-wide">Total Tour Cost</h3>
                   <p className="text-green-100 text-sm">Per Person (Twin Share)</p>
                </div>

                <div className="p-0">
                   <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-100">
                         <tr>
                            <td className="px-4 py-3 text-slate-600">Total Land Cost</td>
                            <td className="px-4 py-3 text-right font-mono font-medium">${sheet.totalLandCost.toFixed(2)}</td>
                         </tr>
                         <tr className="bg-blue-50/30">
                            <td className="px-4 py-3 text-slate-600">Markup ({sheet.markupPercentage}%)</td>
                            <td className="px-4 py-3 text-right font-mono text-blue-600">+${sheet.markupAmount.toFixed(2)}</td>
                         </tr>
                         <tr>
                            <td className="px-4 py-3 text-slate-600">ISO/Fee ({sheet.isoCommission}%)</td>
                            <td className="px-4 py-3 text-right font-mono text-slate-600">+${sheet.isoAmount.toFixed(2)}</td>
                         </tr>
                         <tr className="bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-700">Sub Total</td>
                            <td className="px-4 py-3 text-right font-mono font-bold">${(sheet.totalLandCost + sheet.markupAmount + sheet.isoAmount).toFixed(2)}</td>
                         </tr>
                         <tr>
                            <td className="px-4 py-3 text-slate-600">GST ({sheet.gstPercentage}%)</td>
                            <td className="px-4 py-3 text-right font-mono text-red-500">+${sheet.gstAmount.toFixed(2)}</td>
                         </tr>
                      </tbody>
                   </table>
                   
                   <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Final Sale Price</p>
                      <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1">
                         <DollarSign size={24} strokeWidth={3} />
                         {sheet.finalSalePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Includes all taxes & fees</p>
                   </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                   <button 
                     onClick={() => onSave && onSave(sheet)}
                     className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-lg font-bold shadow-lg shadow-slate-900/10 transition-all flex items-center justify-center gap-2"
                   >
                      <Save size={18} /> Save & Generate
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CostingSheet;
