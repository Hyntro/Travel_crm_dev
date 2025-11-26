
import React, { useState } from 'react';
import { Folder, FileText, Upload, Plus, ChevronRight, HardDrive, File as FileIcon, Search, ArrowLeft, X, CloudUpload } from 'lucide-react';
import { DMSFolder, DMSDocument } from '../types';

const initialFolders: DMSFolder[] = [
  { id: '1', name: 'Client Passports', parentId: null, createdAt: '2025-01-10' },
  { id: '2', name: 'Hotel Contracts', parentId: null, createdAt: '2025-01-12' },
  { id: '3', name: 'Invoices 2024', parentId: null, createdAt: '2025-01-15' },
  { id: '4', name: 'Asia Region', parentId: '2', createdAt: '2025-01-20' },
];

const initialDocs: DMSDocument[] = [
  { id: 'd1', name: 'Smith_Passport.pdf', folderId: '1', size: '2.4 MB', type: 'pdf', createdAt: '2025-05-10' },
  { id: 'd2', name: 'Dubai_Itinerary.docx', folderId: 'root', size: '1.1 MB', type: 'doc', createdAt: '2025-05-12' },
];

const DocumentManagement: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<DMSFolder[]>(initialFolders);
  const [docs, setDocs] = useState<DMSDocument[]>(initialDocs);
  
  // Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Filter content
  const currentFolders = folders.filter(f => f.parentId === currentFolderId);
  const currentDocs = docs.filter(d => (d.folderId === (currentFolderId || 'root')));

  // Breadcrumb Logic
  const getBreadcrumbs = () => {
    if (!currentFolderId) return [{ id: null, name: 'Root' }];
    
    const path = [];
    let current = folders.find(f => f.id === currentFolderId);
    while (current) {
      path.unshift(current);
      current = folders.find(f => f.id === current?.parentId);
    }
    return [{ id: null, name: 'Root' }, ...path];
  };

  const createFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) {
      setFolders([...folders, { 
        id: Math.random().toString(), 
        name, 
        parentId: currentFolderId, 
        createdAt: new Date().toISOString().split('T')[0] 
      }]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const newDocs = files.map(file => ({
      id: Math.random().toString(),
      name: file.name,
      folderId: currentFolderId || 'root',
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.name.split('.').pop() || 'unknown',
      createdAt: new Date().toISOString().split('T')[0]
    }));
    setDocs([...docs, ...newDocs]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Document Management</h2>
          <p className="text-slate-500 mt-1">Secure file storage and organization.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={createFolder} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={18} /> New Folder
           </button>
           <button 
             onClick={() => setIsUploadModalOpen(true)} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
           >
              <Upload size={18} /> Upload File
           </button>
        </div>
      </div>

      <div className="flex gap-6 h-full">
         {/* Left Sidebar Stats */}
         <div className="w-64 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-6 h-fit">
            <div>
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Storage</h4>
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><HardDrive size={24}/></div>
                  <div>
                     <p className="text-xl font-bold text-slate-800">45.2 GB</p>
                     <p className="text-xs text-slate-500">Used of 100 GB</p>
                  </div>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
               </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Stats</h4>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Total Files</span>
                     <span className="font-semibold text-slate-800">{docs.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Folders</span>
                     <span className="font-semibold text-slate-800">{folders.length}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
            {/* Toolbar & Breadcrumbs */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
               <div className="flex items-center gap-1 text-sm text-slate-600">
                  {getBreadcrumbs().map((crumb, idx, arr) => (
                     <React.Fragment key={crumb.id || 'root'}>
                        <button 
                           onClick={() => setCurrentFolderId(crumb.id as string | null)}
                           className="hover:text-blue-600 hover:underline font-medium px-1"
                        >
                           {crumb.name}
                        </button>
                        {idx < arr.length - 1 && <ChevronRight size={14} className="text-slate-400" />}
                     </React.Fragment>
                  ))}
               </div>
               <div className="flex-1"></div>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search files..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
               </div>
            </div>

            {/* Grid View */}
            <div className="p-6 overflow-y-auto flex-1">
               {currentFolderId && (
                  <button 
                    onClick={() => {
                        const parent = folders.find(f => f.id === currentFolderId)?.parentId;
                        setCurrentFolderId(parent || null);
                    }}
                    className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
                  >
                     <ArrowLeft size={16} /> Back
                  </button>
               )}

               <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Folders</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {currentFolders.length === 0 && <p className="text-sm text-slate-400 italic col-span-full">No sub-folders</p>}
                  {currentFolders.map(folder => (
                     <div 
                        key={folder.id} 
                        onClick={() => setCurrentFolderId(folder.id)}
                        className="group bg-yellow-50 border border-yellow-100 hover:border-yellow-300 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center text-center gap-2"
                     >
                        <Folder size={48} className="text-yellow-400 group-hover:text-yellow-500 transition-colors fill-yellow-400/20" />
                        <span className="text-sm font-medium text-slate-700 truncate w-full">{folder.name}</span>
                        <span className="text-xs text-slate-400">{folder.createdAt}</span>
                     </div>
                  ))}
               </div>

               <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Files</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentDocs.length === 0 && <p className="text-sm text-slate-400 italic col-span-full">No files in this folder</p>}
                  {currentDocs.map(doc => (
                     <div key={doc.id} className="border border-slate-100 hover:border-blue-200 rounded-xl p-3 flex items-center gap-3 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-100 transition-colors">
                           <FileIcon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                           <p className="text-xs text-slate-400">{doc.size} • {doc.createdAt}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center p-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Upload Documents</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-red-500">
                   <X size={20} />
                </button>
             </div>
             <div className="p-6">
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                   <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      <CloudUpload size={32} />
                   </div>
                   <h4 className="text-lg font-medium text-slate-700 mb-1">
                      {isDragging ? 'Drop files to upload' : 'Drag & drop files here'}
                   </h4>
                   <p className="text-sm text-slate-500 mb-6">or click to browse from your computer</p>
                   
                   <label className="cursor-pointer">
                      <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm inline-flex items-center gap-2">
                        <FileIcon size={16} /> Browse Files
                      </span>
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleFileSelect}
                      />
                   </label>
                </div>
                <div className="mt-4 text-xs text-slate-400 text-center">
                   Supported formats: PDF, DOCX, JPG, PNG (Max 25MB)
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
