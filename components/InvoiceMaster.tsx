
import React from 'react';
import { Search, Printer, Download, MessageCircle, XCircle, MoreVertical } from 'lucide-react';
import { Invoice } from '../types';

const invoices: Invoice[] = [
  { id: 'INV-2025-001', date: '2025-05-15', queryId: 'DB25/00785', clientName: 'Robert Kingsley', companyName: 'Global Travels Inc', amount: 4500, currency: 'USD', status: 'Paid' },
  { id: 'INV-2025-002', date: '2025-05-16', queryId: 'DB25/00786', clientName: 'Sarah Miller', companyName: '-', amount: 1200, currency: 'EUR', status: 'Unpaid' },
  { id: 'INV-2025-003', date: '2025-05-17', queryId: 'DB25/00787', clientName: 'Alice Li', companyName: '-', amount: 3500, currency: 'USD', status: 'Cancelled' },
];

const InvoiceMaster: React.FC = () => {
  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="mb-8">
         <h2 className="text-3xl font-bold text-slate-800">Invoice Master</h2>
         <p className="text-slate-500 mt-1">Financial records and billing history.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search by Invoice No, Client..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Invoice No</th>
                     <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                     <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Client</th>
                     <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                     <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                     <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                           <span className="font-mono text-sm font-medium text-blue-600">{inv.id}</span>
                           <div className="text-xs text-slate-400 mt-0.5">Ref: {inv.queryId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{inv.date}</td>
                        <td className="px-6 py-4">
                           <div className="font-medium text-slate-800 text-sm">{inv.clientName}</div>
                           <div className="text-xs text-slate-500">{inv.companyName !== '-' ? inv.companyName : 'Direct Client'}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700">
                           {inv.amount.toLocaleString()} <span className="text-xs font-normal text-slate-500">{inv.currency}</span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              inv.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              inv.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                           }`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center justify-center gap-2">
                              <button title="Print" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Printer size={18}/></button>
                              <button title="Download" className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Download size={18}/></button>
                              <button title="Share WhatsApp" className="p-1.5 text-green-500 hover:bg-green-50 rounded"><MessageCircle size={18}/></button>
                              <button title="Cancel/Delete" className="p-1.5 text-red-500 hover:bg-red-50 rounded"><XCircle size={18}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default InvoiceMaster;
