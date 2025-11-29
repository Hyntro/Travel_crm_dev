
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Department } from '../types';
import { initialDepartments } from './mockData';

const UserDepartmentMaster: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState<Partial<Department>>({});

  const handleSave = () => {
     const dept: Department = {
         id: Math.random().toString(),
         name: newDept.name || '',
         createdBy: 'Administrator CRM',
         createdAt: new Date().toLocaleDateString(),
         modifiedBy: '',
         modifiedAt: ''
     };
     setDepartments([...departments, dept]);
     setShowModal(false);
     setNewDept({});
  };

  const handleDelete = (id: string) => {
      if(window.confirm("Delete department?")) {
          setDepartments(prev => prev.filter(d => d.id !== id));
      }
  };

  return (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-300">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">User Department</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
        >
          <Plus size={16} /> Add New Department
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-white border-b border-slate-200 text-slate-600">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold uppercase w-16 text-center">#</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">DEPARTMENT NAME</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">CREATED BY</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">MODIFIED BY</th>
                     <th className="px-6 py-4 text-right text-xs font-bold uppercase">ACTION</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {departments.map((dept, idx) => (
                     <tr key={dept.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-center text-sm text-slate-500">{idx + 1}</td>
                        <td className={`px-6 py-4 text-sm font-medium text-green-600`}>
                           {dept.name === 'Sales' ? <Edit2 size={14} className="inline mr-2 text-gray-400"/> : null}
                           {dept.name}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                            <div className="text-slate-800 font-medium">{dept.createdBy}</div>
                            <div>{dept.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                            {dept.modifiedBy && (
                                <>
                                    <div className="text-slate-800 font-medium">{dept.modifiedBy}</div>
                                    <div>{dept.modifiedAt}</div>
                                </>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDelete(dept.id)} className="text-green-600 hover:text-green-800 text-sm font-medium">Delete</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span>5 entries</span>
            <select className="border border-slate-300 rounded px-2 py-1"><option>25 Records Per Page</option></select>
         </div>
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
               <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800">Add Department</h3>
                  <div className="flex gap-2">
                      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-sm">Save</button>
                      <button onClick={() => setShowModal(false)} className="bg-white border border-slate-300 text-slate-700 px-6 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
                  </div>
               </div>
               
               <div className="p-8 space-y-8 bg-white">
                  
                  <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Department Information</h4>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">User Department</label>
                          <input 
                            type="text" 
                            value={newDept.name || ''}
                            onChange={e => setNewDept({...newDept, name: e.target.value})}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                          />
                      </div>
                  </div>

               </div>

               <div className="px-6 py-8 bg-slate-50/50 border-t border-slate-100">
                   {/* Spacer for visual match */}
               </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserDepartmentMaster;
