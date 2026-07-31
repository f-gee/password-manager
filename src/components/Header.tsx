import React, { useRef } from 'react';
import { Shield, Search, Plus, Download, Upload } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreateModal: () => void;
  onExportBackup: () => void;
  onImportFiles: (files: FileList | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  onExportBackup,
  onImportFiles
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImportFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-900 mb-8" id="main-header">
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-950/30">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            SECURE CREDENTIALS MANAGER
          </h1>
          <p className="text-xs text-slate-500 font-mono">OFFLINE-FIRST ENCRYPTED CLIENT VAULT v2</p>
        </div>
      </div>

      {/* Search Bar Input in Top Bar */}
      <div className="relative w-full lg:max-w-md flex-1">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search credentials, sites, or attributes..." 
          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-xs px-4 py-2.5 pl-11 rounded-xl outline-none transition-all placeholder:text-slate-600 text-slate-200"
        />
      </div>

      {/* Import / Export Action Tools */}
      <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 shrink-0 w-full lg:w-auto">
        <button 
          onClick={onOpenCreateModal}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl border border-indigo-500/20 active:translate-y-[1px] transition-all inline-flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/40"
        >
          <Plus className="w-4 h-4 text-white shrink-0" />
          <span className="align-middle">Parent Mailbox</span>
        </button>
        
        <button 
          onClick={onExportBackup}
          className="cursor-pointer bg-slate-900 hover:bg-slate-850 hover:border-slate-700 border border-slate-800 text-slate-300 text-xs font-medium px-4 py-2.5 rounded-xl active:translate-y-[1px] transition-all inline-flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span className="align-middle">Export Backup</span>
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer bg-slate-900 hover:bg-slate-850 hover:border-slate-700 border border-slate-800 text-slate-300 text-xs font-medium px-4 py-2.5 rounded-xl active:translate-y-[1px] transition-all inline-flex items-center justify-center gap-1.5"
        >
          <Upload className="w-4 h-4 shrink-0" />
          <span className="align-middle">Import JSON</span>
        </button>

        {/* Hidden File Uploader */}
        <input 
          ref={fileInputRef}
          type="file" 
          onChange={handleFileChange}
          className="hidden" 
          accept=".json" 
        />
      </div>
    </header>
  );
};
