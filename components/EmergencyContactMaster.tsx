
import React, { useState } from 'react';
import { ArrowLeft, Edit2, Plus, Save, X } from 'lucide-react';
import { EmergencyContact } from '../types';
import { initialEmergencyContacts } from './mockData';

interface EmergencyContactMasterProps {
  onBack: () => void;
}

const EmergencyContactMaster: React.FC<EmergencyContactMasterProps> = ({ onBack }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialEmergencyContacts);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [currentContact, setCurrentContact] = useState<Partial<EmergencyContact>>({});

  // Filter contacts for top and bottom sections
  const proposalContact = contacts.find(c => c.isProposalContact); // Assuming only one main proposal contact for now, or the first one marked true
  const otherContacts = contacts.filter(c => !c.isProposalContact);

  const handleEdit = (contact: EmergencyContact) => {
    setCurrentContact({ ...contact });
    setView('form');
  };

  const handleAddNew = () => {
    setCurrentContact({ isProposalContact: false });
    setView('form');
  };

  const handleSave = () => {
    if (!currentContact.contactName) return;

    const newContact: EmergencyContact = {
        id: currentContact.id || Math.random().toString(),
        contactName: currentContact.contactName || '',
        countryCode: currentContact.countryCode || '',
        mobileNumber: currentContact.mobileNumber || '',
        mobileNumber2: currentContact.mobileNumber2 || '',
        emailId: currentContact.emailId || '',
        availableOn: currentContact.availableOn || '',
        isProposalContact: currentContact.isProposalContact || false
    };

    if (currentContact.id) {
        // Update existing
        setContacts(prev => prev.map(c => {
            // If this one is set to proposal contact, unset others? 
            // The logic might vary, here we allow only one true proposal contact for simplicity if that's the intent
            // But for now let's just update the record.
            return c.id === currentContact.id ? newContact : c;
        }));
    } else {
        setContacts(prev => [...prev, newContact]);
    }
    setView('list');
    setCurrentContact({});
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-slate-800">Proposal Contact Detail</h2>
        </div>
        {view === 'form' && (
             <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm">
                Save
             </button>
        )}
      </div>

      {view === 'list' ? (
        <div className="p-6 space-y-8">
            {/* Top Section: Proposal Contact Detail */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-green-700 font-serif">Proposal Contact Detail</h3>
                    <div className="flex items-center gap-4">
                        {proposalContact && (
                            <button onClick={() => handleEdit(proposalContact)} className="p-1 border border-green-600 rounded text-green-700 hover:bg-green-50">
                                <Edit2 size={16} />
                            </button>
                        )}
                        <button onClick={handleAddNew} className="text-sm font-bold text-green-700 hover:underline">Add/Edit Information</button>
                    </div>
                </div>
                
                <div className="border border-black">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="bg-slate-100 font-bold text-slate-800 border-b border-black">
                                <th className="p-2 border-r border-black">Contact Name</th>
                                <th className="p-2 border-r border-black">Country Code</th>
                                <th className="p-2 border-r border-black">Mobile Number</th>
                                <th className="p-2 border-r border-black">Mobile Number 2</th>
                                <th className="p-2 border-r border-black">Email Id</th>
                                <th className="p-2">Available On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposalContact ? (
                                <tr>
                                    <td className="p-2 border-r border-black">{proposalContact.contactName}</td>
                                    <td className="p-2 border-r border-black">{proposalContact.countryCode}</td>
                                    <td className="p-2 border-r border-black">{proposalContact.mobileNumber}</td>
                                    <td className="p-2 border-r border-black">{proposalContact.mobileNumber2}</td>
                                    <td className="p-2 border-r border-black">{proposalContact.emailId}</td>
                                    <td className="p-2">{proposalContact.availableOn}</td>
                                </tr>
                            ) : (
                                <tr><td colSpan={6} className="p-4 text-slate-400 italic">No proposal contact set.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Section: Contact List Detail */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-green-700 font-serif">Contact List Detail</h3>
                    <button onClick={handleAddNew} className="text-sm font-bold text-green-700 hover:underline">Add/Edit Information</button>
                </div>
                
                <div className="border border-black w-full md:w-2/3">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="bg-slate-100 font-bold text-slate-800 border-b border-black">
                                <th className="p-2 border-r border-black">Contact Name</th>
                                <th className="p-2 border-r border-black">Country Code</th>
                                <th className="p-2 border-r border-black">Mobile Number</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {otherContacts.map((contact) => (
                                <tr key={contact.id} className="border-t border-black">
                                    <td className="p-2 border-r border-black">{contact.contactName}</td>
                                    <td className="p-2 border-r border-black">{contact.countryCode}</td>
                                    <td className="p-2 border-r border-black">{contact.mobileNumber}</td>
                                    <td className="p-2">
                                        <button onClick={() => handleEdit(contact)} className="text-green-600 font-bold hover:underline text-xs">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {otherContacts.length === 0 && (
                                <tr><td colSpan={4} className="p-4 text-slate-400 italic">No other contacts found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      ) : (
        // Form View
        <div className="p-8 max-w-4xl mx-auto w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{currentContact.id ? 'Edit Contact' : 'Add Contact'}</h3>
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Name</label>
                        <input 
                            type="text" 
                            value={currentContact.contactName || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, contactName: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Country Code</label>
                        <input 
                            type="text" 
                            value={currentContact.countryCode || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, countryCode: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                        <input 
                            type="text" 
                            value={currentContact.mobileNumber || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, mobileNumber: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile Number 2</label>
                        <input 
                            type="text" 
                            value={currentContact.mobileNumber2 || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, mobileNumber2: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Id</label>
                        <input 
                            type="email" 
                            value={currentContact.emailId || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, emailId: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Available On</label>
                        <input 
                            type="text" 
                            value={currentContact.availableOn || ''} 
                            onChange={(e) => setCurrentContact({...currentContact, availableOn: e.target.value})}
                            placeholder="e.g. Calls & Whatsapp"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <input 
                        type="checkbox" 
                        id="isProposal" 
                        checked={currentContact.isProposalContact || false} 
                        onChange={(e) => setCurrentContact({...currentContact, isProposalContact: e.target.checked})}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <label htmlFor="isProposal" className="text-sm text-slate-700 font-medium">Set as Proposal Contact (Main Contact)</label>
                </div>

                <div className="flex justify-end gap-4 mt-6 pt-6">
                    <button onClick={() => setView('list')} className="px-6 py-2 border border-slate-300 rounded-full text-slate-600 hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm">Save</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactMaster;
