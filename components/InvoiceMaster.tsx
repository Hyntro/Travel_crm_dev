
import React, { useState } from 'react';
import { Search, Printer, Download, XCircle, Filter, RefreshCw, Calendar, FileText } from 'lucide-react';
import { Invoice } from '../types';

const initialInvoices: Invoice[] = [
  { 
    id: 'INV-2025-001', 
    date: '2025-05-15', 
    queryId: 'DB25/00785', 
    tourId: 'TI-2025-001',
    clientName: 'Robert Kingsley', 
    companyName: 'Global Travels Inc', 
    amount: 4500, 
    currency: 'USD', 
    status: 'Paid',
    invoiceFormat: 'IGST',
    invoiceType: 'Tax Invoice'
  },
  { 
    id: 'INV-2025-002', 
    date: '2025-05-16', 
    queryId: 'DB25/00786', 
    tourId: 'TI-2025-002',
    clientName: 'Sarah Miller', 
    companyName: 'Direct', 
    amount: 1200, 
    currency: 'EUR', 
    status: 'Unpaid',
    invoiceFormat: 'Proforma',
    invoiceType: 'Proforma Invoice'
  },
  { 
    id: 'INV-2025-003', 
    date: '2025-05-17', 
    queryId: 'DB25/00787', 
    tourId: 'TI-2025-003',
    clientName: 'Alice Li', 
    companyName: 'Direct', 
    amount: 3500, 
    currency: 'USD', 
    status: 'Cancelled',
    invoiceFormat: 'CGST/SGST',
    invoiceType: 'Tax Invoice'
  },
];

const InvoiceMaster: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [filters, setFilters] = useState({
    agentName: '',
    companyName: '',
    dateFilter: 'Excluded',
    fromDate: '2025-11-01',
    toDate: '2025-11-28',
    invoiceType: '',
    searchId: '' // Combined Tour/Query ID/Invoice ID
  });

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this invoice? This action cannot be undone.')) {
        setInvoices(prevInvoices => prevInvoices.map(inv => 
            inv.id === id ? { ...inv, status: 'Cancelled' } : inv
        ));
    }
  };

  const handlePrint = (invoice: Invoice) => {
    const printContent = `
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .invoice-title { font-size: 32px; font-weight: bold; color: #2563eb; text-transform: uppercase; }
            .meta { text-align: right; font-size: 14px; }
            .meta div { margin-bottom: 5px; }
            .section { margin-bottom: 30px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; display: block; }
            .value { font-size: 16px; font-weight: 500; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .total-box { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: right; margin-top: 40px; }
            .total-label { font-size: 14px; font-weight: bold; color: #64748b; }
            .total-amount { font-size: 36px; font-weight: bold; color: #0f172a; margin-top: 5px; }
            .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
            .paid { background: #dcfce7; color: #166534; }
            .unpaid { background: #fef9c3; color: #854d0e; }
            .cancelled { background: #fee2e2; color: #991b1b; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; padding: 12px; background: #f1f5f9; font-size: 12px; text-transform: uppercase; color: #64748b; }
            td { padding: 12px; border-bottom: 1px solid #eee; }
            @media print {
               body { padding: 0; }
               .total-box { background: #eee !important; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
               <div class="invoice-title">${invoice.invoiceType || 'INVOICE'}</div>
               <div>#${invoice.id}</div>
               <span class="status-badge ${invoice.status.toLowerCase()}">${invoice.status}</span>
            </div>
            <div class="meta">
               <div><strong>Date:</strong> ${invoice.date}</div>
               <div><strong>Ref Query:</strong> ${invoice.queryId}</div>
               ${invoice.tourId ? `<div><strong>Tour ID:</strong> ${invoice.tourId}</div>` : ''}
            </div>
          </div>

          <div class="grid section">
             <div>
                <span class="label">Bill To</span>
                <div class="value">${invoice.clientName}</div>
                ${invoice.companyName && invoice.companyName !== 'Direct' ? `<div style="color: #64748b; margin-top: 2px;">${invoice.companyName}</div>` : ''}
             </div>
             <div>
                <span class="label">Details</span>
                <div class="value">Format: ${invoice.invoiceFormat || 'Standard'}</div>
             </div>
          </div>

          <div class="section">
             <table>
                <thead>
                   <tr>
                      <th>Description</th>
                      <th style="text-align: right;">Amount</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td>Travel Services for Query #${invoice.queryId}</td>
                      <td style="text-align: right;">${invoice.amount.toLocaleString()} ${invoice.currency}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div class="total-box">
             <div class="total-label">Total Amount</div>
             <div class="total-amount">${invoice.amount.toLocaleString()} ${invoice.currency}</div>
          </div>

          <div style="margin-top: 60px; text-align: center; color: #94a3b8; font-size: 12px;">
             Thank you for your business.
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      // Small timeout to ensure rendering before print dialog
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      alert("Popup blocked! Please allow popups to print/download the invoice.");
    }
  };

  const handleDownloadCSV = (invoice: Invoice) => {
    const headers = ["Invoice No", "Query ID", "Tour ID", "Invoice Date", "Client Name", "Company Name", "Invoice Format", "Amount", "Currency", "Invoice Type", "Status"];
    const row = [
        `"${invoice.id}"`,
        `"${invoice.queryId}"`,
        `"${invoice.tourId || ''}"`,
        `"${invoice.date}"`,
        `"${invoice.clientName}"`,
        `"${invoice.companyName}"`,
        `"${invoice.invoiceFormat || ''}"`,
        invoice.amount,
        `"${invoice.currency}"`,
        `"${invoice.invoiceType || ''}"`,
        `"${invoice.status}"`
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + row.join(",");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Invoice_${invoice.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      <div className="mb-6">
         <h2 className="text-3xl font-bold text-slate-800">Invoice Master</h2>
         <p className="text-slate-500 mt-1">Financial records and billing history.</p>
      </div>

      {/* Extended Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Agent Name</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.agentName}
                  onChange={(e) => setFilters({...filters, agentName: e.target.value})}
               >
                  <option value="">Select</option>
                  <option value="Global Travels">Global Travels</option>
                  <option value="Direct">Direct</option>
               </select>
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Company Name</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.companyName}
                  onChange={(e) => setFilters({...filters, companyName: e.target.value})}
               >
                  <option value="">Select</option>
                  <option value="Company A">Company A</option>
               </select>
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">With/Without Date</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.dateFilter}
                  onChange={(e) => setFilters({...filters, dateFilter: e.target.value})}
               >
                  <option value="Excluded">Excluded</option>
                  <option value="Included">Included</option>
               </select>
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">From Date</label>
               <input 
                  type="date" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
                  disabled={filters.dateFilter === 'Excluded'}
               />
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">To Date</label>
               <input 
                  type="date" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.toDate}
                  onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                  disabled={filters.dateFilter === 'Excluded'}
               />
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Invoice Type</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.invoiceType}
                  onChange={(e) => setFilters({...filters, invoiceType: e.target.value})}
               >
                  <option value="">All</option>
                  <option value="Tax Invoice">Tax Invoice</option>
                  <option value="Proforma Invoice">Proforma</option>
               </select>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end">
            <div className="relative col-span-2">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Search ID</label>
               <Search className="absolute left-3 top-8 text-slate-400" size={16} />
               <input 
                  type="text" 
                  placeholder="Search by Tour ID, Query ID, or Invoice ID" 
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.searchId}
                  onChange={(e) => setFilters({...filters, searchId: e.target.value})}
               />
            </div>
            <div className="flex gap-2">
               <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Filter size={16}/> Filter
               </button>
               <button className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <RefreshCw size={16}/> Reset
               </button>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left whitespace-nowrap">
               <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice No.</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Query ID</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tour ID</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Date</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Format</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Type</th>
                     <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                     <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                     <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-medium text-blue-600">{inv.id}</td>
                        <td className="px-6 py-4 text-xs text-slate-600">{inv.queryId}</td>
                        <td className="px-6 py-4 text-xs text-slate-600">{inv.tourId || '-'}</td>
                        <td className="px-6 py-4 text-xs text-slate-600">{inv.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{inv.clientName}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{inv.companyName}</td>
                        <td className="px-6 py-4 text-xs text-slate-600">{inv.invoiceFormat || '-'}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-700 text-sm">
                           {inv.amount.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">{inv.currency}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">
                           <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{inv.invoiceType || 'Standard'}</span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              inv.status === 'Paid' ? 'bg-green-100 text-green-700 border border-green-200' :
                              inv.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-red-100 text-red-700 border border-red-200'
                           }`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handlePrint(inv)}
                                title="Print / Download PDF" 
                                className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors border border-blue-100"
                              >
                                <Printer size={16}/>
                              </button>
                              <button 
                                onClick={() => handleDownloadCSV(inv)}
                                title="Download CSV" 
                                className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors border border-green-100"
                              >
                                <Download size={16}/>
                              </button>
                              <button 
                                onClick={() => handleCancel(inv.id)}
                                disabled={inv.status === 'Cancelled'}
                                title={inv.status === 'Cancelled' ? "Invoice Cancelled" : "Cancel Invoice"} 
                                className={`p-1.5 rounded transition-colors border ${
                                    inv.status === 'Cancelled' 
                                    ? 'text-slate-300 bg-slate-50 border-slate-200 cursor-not-allowed' 
                                    : 'text-red-500 bg-red-50 hover:bg-red-100 border-red-100'
                                }`}
                              >
                                <XCircle size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {invoices.length === 0 && (
                     <tr>
                        <td colSpan={11} className="px-6 py-8 text-center text-slate-400 text-sm">
                           No invoices found matching criteria.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
            <div>Showing 1 to {invoices.length} of {invoices.length} entries</div>
            <div className="flex gap-1">
               <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
               <button className="px-3 py-1 border border-slate-300 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
               <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50" disabled>Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InvoiceMaster;
