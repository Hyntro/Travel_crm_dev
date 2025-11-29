
import React, { useState } from 'react';
import { Plus, Minus, UserPlus, X, Save, User } from 'lucide-react';
import { RoleNode } from '../types';
import { initialRoles } from './mockData';

const RoleMaster: React.FC = () => {
  const [roles, setRoles] = useState<RoleNode>(initialRoles);
  const [showModal, setShowModal] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'ceo']));
  
  const [newRole, setNewRole] = useState<Partial<RoleNode>>({ name: '', description: '' });

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const handleAddRole = () => {
    // Simple logic to just close the modal for UI demo
    setShowModal(false);
    setNewRole({ name: '', description: '' });
    alert("Role added successfully (Mock)");
  };

  const renderTree = (node: RoleNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} className="ml-6">
        <div className="flex items-center gap-2 py-2">
          {hasChildren ? (
            <button 
              onClick={() => toggleNode(node.id)} 
              className="w-5 h-5 flex items-center justify-center border border-slate-400 rounded text-slate-600 hover:bg-slate-100"
            >
              {isExpanded ? <Minus size={12} /> : <Plus size={12} />}
            </button>
          ) : (
            <div className="w-5 h-5"></div> // Spacer
          )}
          
          <span className={`text-sm ${level === 0 ? 'font-bold text-slate-800' : 'text-slate-700'}`}>
            {node.name}
          </span>

          {/* Add Button only for leaf nodes or generally available */}
           <button className="text-slate-400 hover:text-blue-600 ml-2">
              <Plus size={16}/>
           </button>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-dotted border-slate-400 ml-2.5 pl-2">
            {node.children!.map(child => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-300">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Role</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-8">
           <button 
             onClick={() => setShowModal(true)}
             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
           >
             <Plus size={16} /> Add New Role
           </button>
        </div>

        <div className="bg-white">
           {renderTree(roles)}
        </div>
      </div>

      {/* Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
               <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800">Add Role</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500"><X size={24}/></button>
               </div>
               
               <div className="p-8 space-y-6 bg-white">
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4">Role Information</h4>
                     <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Role Name</label>
                            <input 
                              type="text" 
                              value={newRole.name || ''}
                              onChange={e => setNewRole({...newRole, name: e.target.value})}
                              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Reports To</label>
                            <div className="relative">
                                <input 
                                  type="text" 
                                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500 pr-8"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 rounded-full p-1 text-white">
                                   <UserPlus size={12} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Role Description</label>
                            <input 
                              type="text" 
                              value={newRole.description || ''}
                              onChange={e => setNewRole({...newRole, description: e.target.value})}
                              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleAddRole} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm">Save</button>
                  <button onClick={() => setShowModal(false)} className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
               </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoleMaster;
