import React, { useState } from 'react';
import { X } from 'lucide-react';
import { generateRandomToken } from '../utils/storage';

interface CreateMailboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (email: string, pwd: string, note?: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const CreateMailboxModal: React.FC<CreateMailboxModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onShowToast
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleGeneratePwd = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = generateRandomToken(18, true);
    setPassword(token);
    onShowToast('Generated high-strength 18-character access password!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      onShowToast('Please provide both email and main account password.', 'error');
      return;
    }
    onCreate(email.trim(), password.trim(), note.trim() || undefined);
    setEmail('');
    setPassword('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">New Mailbox Vault Container</h3>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-300 p-1.5 hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Mailbox Email Address *
            </label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. adrian.morrison@gmail.com" 
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-xs p-3 rounded-xl outline-none font-mono tracking-wide text-slate-200 placeholder:text-slate-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Mailbox Access Password *
              </label>
              <button 
                type="button" 
                onClick={handleGeneratePwd}
                className="text-[10px] font-bold font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 uppercase cursor-pointer"
              >
                Generate Secure Token
              </button>
            </div>
            <input 
              type="text" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Primary active password" 
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-xs p-3 rounded-xl outline-none font-mono tracking-wide text-slate-200 placeholder:text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Administrative Note (Optional)
            </label>
            <input 
              type="text" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Daily outlook, active directory token, update quarterly..." 
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-xs p-3 rounded-xl outline-none text-slate-200 placeholder:text-slate-700"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="cursor-pointer bg-slate-950 hover:bg-slate-850 hover:border-slate-700 border border-slate-800 text-slate-400 text-xs font-semibold px-4.5 py-3 rounded-xl active:translate-y-[1px] transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold px-5 py-3 rounded-xl border border-indigo-500/20 active:translate-y-[1px] transition-all flex items-center gap-2"
            >
              Create Mailbox
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
