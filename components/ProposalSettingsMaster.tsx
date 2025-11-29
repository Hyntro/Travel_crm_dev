
import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { ProposalSettings } from '../types';
import { initialProposalSettings } from './mockData';

interface ProposalSettingsMasterProps {
  onBack: () => void;
}

const ProposalSettingsMaster: React.FC<ProposalSettingsMasterProps> = ({ onBack }) => {
  const [proposals, setProposals] = useState<ProposalSettings[]>(initialProposalSettings);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ProposalSettings>>({ 
    status: 'Active',
    isDefault: false,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    photoDimensions: '750x500'
  });

  const handleEdit = (item: ProposalSettings) => {
    setCurrentItem({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete proposal settings?')) {
      setProposals(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentItem.proposalName) return;

    const newItem: ProposalSettings = {
        id: currentItem.id || Math.random().toString(),
        proposalNum: currentItem.proposalNum || '',
        proposalName: currentItem.proposalName,
        backgroundColor: currentItem.backgroundColor || '#ffffff',
        textColor: currentItem.textColor || '#000000',
        headerImage: currentItem.headerImage || '',
        bannerImage: currentItem.bannerImage || '',
        photoDimensions: currentItem.photoDimensions || '750x500',
        isDefault: currentItem.isDefault || false,
        status: currentItem.status || 'Active'
    };

    if (currentItem.id) {
        setProposals(prev => prev.map(p => p.id === currentItem.id ? newItem : p));
    } else {
        setProposals(prev => [...prev, newItem]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentItem({ 
      status: 'Active',
      isDefault: false,
      backgroundColor: '#ffffff',
      textColor: '#000000',
      photoDimensions: '750x500'
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'headerImage' | 'bannerImage') => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              // In real app upload logic happens here
              // For mock we just pretend update state if needed, or handle in separate component
              alert("Image upload simulation: File selected");
          };
          reader.readAsDataURL(file);
      }
  };


  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Proposal Settings Master</h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold uppercase w-16">SRN</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Proposal Num</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Proposal Name</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Background Color</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Text Color</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Header Image(790x100)</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase text-right">Banner Image(800x300)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {proposals.map((item, index) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => handleEdit(item)}>
                            {item.proposalNum}
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 cursor-pointer hover:underline" onClick={() => handleEdit(item)}>
                            {item.proposalName}
                        </td>
                        <td className="px-4 py-3">
                            <div className="w-24 h-6 border border-slate-200" style={{ backgroundColor: item.backgroundColor }}></div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="w-24 h-6 border border-slate-200" style={{ backgroundColor: item.textColor }}></div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                {item.headerImage ? (
                                    <img src={item.headerImage} alt="Header" className="h-8 object-contain border border-slate-200"/>
                                ) : (
                                    <span className="text-xs text-slate-400 italic">No Image</span>
                                )}
                                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold whitespace-nowrap">
                                    + Add
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'headerImage')}/>
                                </label>
                            </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                             <div className="flex items-center justify-end gap-2">
                                {item.bannerImage ? (
                                    <img src={item.bannerImage} alt="Banner" className="h-8 object-contain border border-slate-200"/>
                                ) : (
                                    <div className="w-16 h-8 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 border border-slate-200">No Image</div>
                                )}
                                <div className="text-center">
                                    <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold whitespace-nowrap block mb-1">
                                        + Add Banner Image
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'bannerImage')}/>
                                    </label>
                                    <span className="text-[9px] text-slate-500 block">Required Size {item.photoDimensions}</span>
                                </div>
                            </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase">Edit Proposal Settings</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-6 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Proposal Name</label>
                      <input 
                        type="text" 
                        value={currentItem.proposalName || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, proposalName: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Proposal Num</label>
                      <input 
                        type="text" 
                        value={currentItem.proposalNum || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, proposalNum: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Select Background Color:</label>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1">
                          <input 
                            type="color" 
                            value={currentItem.backgroundColor} 
                            onChange={(e) => setCurrentItem({...currentItem, backgroundColor: e.target.value})} 
                            className="h-8 w-16 p-0 border-0 rounded cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={currentItem.backgroundColor}
                            onChange={(e) => setCurrentItem({...currentItem, backgroundColor: e.target.value})}
                            className="flex-1 outline-none text-sm uppercase"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Select Text Color:</label>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1">
                          <input 
                            type="color" 
                            value={currentItem.textColor} 
                            onChange={(e) => setCurrentItem({...currentItem, textColor: e.target.value})} 
                            className="h-8 w-16 p-0 border-0 rounded cursor-pointer"
                          />
                           <input 
                            type="text" 
                            value={currentItem.textColor}
                            onChange={(e) => setCurrentItem({...currentItem, textColor: e.target.value})}
                            className="flex-1 outline-none text-sm uppercase"
                          />
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Photo Dimensions</label>
                          <select 
                            value={currentItem.photoDimensions} 
                            onChange={(e) => setCurrentItem({...currentItem, photoDimensions: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="750x500">750x500</option>
                             <option value="800x300">800x300</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Set Default</label>
                          <select 
                            value={currentItem.isDefault ? 'Yes' : 'No'} 
                            onChange={(e) => setCurrentItem({...currentItem, isDefault: e.target.value === 'Yes'})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="No">No</option>
                             <option value="Yes">Yes</option>
                          </select>
                      </div>
                  </div>
               </div>

               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
                  <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default ProposalSettingsMaster;
