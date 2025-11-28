
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, FileSpreadsheet } from 'lucide-react';
import { HotelCategory } from '../types';
import { initialHotelCategories } from './mockData';

interface HotelCategoryMasterProps {
  onBack: () => void;
}

const HotelCategoryMaster: React.FC<HotelCategoryMasterProps> = ({ onBack }) => {
  const [categories, setCategories] = useState<HotelCategory[]>(initialHotelCategories);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentCategory, setCurrentCategory] = useState<Partial<HotelCategory>>({ status: 'Active', starCategory: 'select' });

  const starCategories = [
    'select', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star', '6 Star', '7 Star', 
    'Heritage', 'Apartment', 'Guest House', 'Home Stay', 'Villa', 'Resort', 
    'Boutique', 'Palace', 'Motel', 'Lodge', 'Inn'
  ];

  const handleEdit = (category: HotelCategory) => {
    setCurrentCategory({ ...category });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this hotel category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentCategory.categoryName) return;

    if (currentCategory.id) {
      setCategories(prev => prev.map(c => c.id === currentCategory.id ? { ...c, ...currentCategory } as HotelCategory : c));
    } else {
      const newCategory: HotelCategory = {
        id: Math.random().toString(),
        categoryName: currentCategory.categoryName!,
        starCategory: currentCategory.starCategory || 'select',
        keyword: currentCategory.keyword || '',
        status: currentCategory.status || 'Active',
        createdBy: 'Demo',
        modifiedBy: 'Demo'
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowModal(false);
    setCurrentCategory({ status: 'Active', starCategory: 'select' });
  };

  const filteredCategories = categories.filter(c => {
    const matchesSearch = c.categoryName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hotel Category Master</h2>
            <p className="text-sm text-slate-500">Manage hotel classifications and ratings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Data
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <FileSpreadsheet size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { setCurrentCategory({ status: 'Active', starCategory: 'select' }); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Hotel Category
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search Hotel Category" 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All Status</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
            </select>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">#</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Hotel Category</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Star Category</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Upload Keyword</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((category, index) => (
                     <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{category.categoryName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{category.starCategory}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{category.keyword}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{category.createdBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{category.modifiedBy}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {category.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(category)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(category.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-400 text-sm">No hotel categories found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentCategory.id ? 'Edit Hotel Category' : 'Add Hotel Category'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Category</label>
                      <input 
                        type="text" 
                        value={currentCategory.categoryName || ''} 
                        onChange={(e) => setCurrentCategory({...currentCategory, categoryName: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Star Category</label>
                      <select 
                        value={currentCategory.starCategory} 
                        onChange={(e) => setCurrentCategory({...currentCategory, starCategory: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {starCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Upload Keyword</label>
                      <input 
                        type="text" 
                        value={currentCategory.keyword || ''} 
                        onChange={(e) => setCurrentCategory({...currentCategory, keyword: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                     <select 
                        value={currentCategory.status} 
                        onChange={(e) => setCurrentCategory({...currentCategory, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
                  <button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-colors">
                    Save
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default HotelCategoryMaster;
