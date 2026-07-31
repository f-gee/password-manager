import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Check, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Account } from '../types';
import { SiteEntryCard } from './SiteEntryCard';

interface AccountCardProps {
  account: Account;
  searchQuery: string;
  onCopyText: (val: string, label: string) => void;
  onDeleteAccount: (account: Account) => void;
  onDeleteSite: (accountId: string, siteKey: string) => void;
  onAddSite: (accountId: string, siteKey: string, note?: string) => void;
  onDeleteAttribute: (accountId: string, siteKey: string, fieldKey: string) => void;
  onAddAttribute: (accountId: string, siteKey: string, key: string, val: string, note?: string) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  searchQuery,
  onCopyText,
  onDeleteAccount,
  onDeleteSite,
  onAddSite,
  onDeleteAttribute,
  onAddAttribute
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isPrimaryVisible, setIsPrimaryVisible] = useState<boolean>(false);
  const [isCopiedPrimary, setIsCopiedPrimary] = useState<boolean>(false);
  const [showAddSiteForm, setShowAddSiteForm] = useState<boolean>(false);

  const [newSiteKey, setNewSiteKey] = useState('');
  const [newSiteNote, setNewSiteNote] = useState('');

  const handleCopyPrimary = () => {
    onCopyText(account.emailPassword, "Copied mailbox password to clipboard!");
    setIsCopiedPrimary(true);
    setTimeout(() => setIsCopiedPrimary(false), 2000);
  };

  const handleAddSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteKey.trim()) return;
    onAddSite(account.id, newSiteKey.trim().toLowerCase(), newSiteNote.trim() || undefined);
    setNewSiteKey('');
    setNewSiteNote('');
    setShowAddSiteForm(false);
  };

  const displaySubEntries = (account.subEntries || []).filter(sub => {
    if (!searchQuery) return true;
    return sub.key.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl overflow-hidden transition-all hover:border-slate-800">
      {/* Container header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/20 transition-colors select-none"
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold tracking-wide text-slate-200 truncate font-mono">{account.email}</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {account.note && (
                <span className="text-[10px] text-indigo-300/80 font-sans italic max-w-xs md:max-w-md truncate" title={account.note}>
                  {account.note}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onDeleteAccount(account)}
            className="p-1.5 text-slate-550 hover:text-rose-450 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/15 cursor-pointer transition-colors inline-flex items-center justify-center"
            title="Delete Mailbox Container"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-bold font-mono uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-400">
            {account.subEntries.length} site{account.subEntries.length === 1 ? '' : 's'}
          </span>

          <span className="text-slate-500 hover:text-slate-300" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </div>
      </div>

      {/* Collapsible Container Details */}
      {isExpanded && (
        <div className="border-t border-slate-900 bg-slate-950/40 p-6 space-y-6">
          {/* Primary detail row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900/80 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">Mailbox identifier</span>
                <p className="text-xs font-bold font-mono text-slate-300 mt-1 select-all break-all">{account.email}</p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900/80 flex flex-col justify-between">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">Primary access token</span>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs w-full">
                {isPrimaryVisible ? (
                  <span className="text-indigo-300 tracking-wider font-semibold font-mono bg-indigo-950/30 border border-indigo-900/55 rounded-lg px-3 py-1.5 flex-1 min-w-0 truncate select-all">
                    {account.emailPassword}
                  </span>
                ) : (
                  <span className="text-slate-500 tracking-widest bg-slate-950/80 border border-slate-900 rounded-lg px-3 py-1.5 flex-1 select-none font-mono">
                    ••••••••••••••••••••••••
                  </span>
                )}

                <button 
                  onClick={() => setIsPrimaryVisible(!isPrimaryVisible)}
                  className="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer transition-colors inline-flex items-center justify-center"
                  title={isPrimaryVisible ? 'Hide Password' : 'Show Password'}
                >
                  {isPrimaryVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>

                <button 
                  onClick={handleCopyPrimary}
                  className="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer transition-colors inline-flex items-center justify-center"
                  title="Copy Password"
                >
                  {isCopiedPrimary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Nested linked sites section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Mapped Sites & Sub-credentials</h4>
              <button 
                onClick={() => setShowAddSiteForm(!showAddSiteForm)}
                className="cursor-pointer text-[10px] font-bold tracking-tight text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 uppercase"
              >
                {showAddSiteForm ? (
                  'Close form'
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span className="align-middle">Link Custom Site Key</span>
                  </>
                )}
              </button>
            </div>

            {/* Add new site form */}
            {showAddSiteForm && (
              <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-xl max-w-lg mb-2">
                <form onSubmit={handleAddSiteSubmit} className="space-y-3.5">
                  <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    Link Website or portal container
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1.5 font-mono">Site address/key *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. github.com, netflix, aws-console" 
                        required
                        value={newSiteKey}
                        onChange={(e) => setNewSiteKey(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500/40 text-xs p-2.5 rounded-lg outline-none font-mono text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1.5 font-mono">Short note</label>
                      <input 
                        type="text" 
                        placeholder="Short description" 
                        value={newSiteNote}
                        onChange={(e) => setNewSiteNote(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500/40 text-xs p-2.5 rounded-lg outline-none text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1.5">
                    <button 
                      type="button" 
                      onClick={() => setShowAddSiteForm(false)}
                      className="cursor-pointer bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 text-[10px] font-bold px-3 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="cursor-pointer bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-bold px-4 py-2 rounded-lg border border-indigo-500/10 transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="align-middle">Create Site Link</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Sub-entries list */}
            {displaySubEntries.length === 0 ? (
              <div className="text-center py-8 bg-slate-900/35 border border-dashed border-slate-800/60 rounded-xl">
                <p className="text-[11px] text-slate-500 font-mono italic">No matching site entries found in this mailbox.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pl-6 border-l border-slate-800/60">
                {displaySubEntries.map((sub) => (
                  <SiteEntryCard
                    key={sub.key}
                    subEntry={sub}
                    onCopyValue={(val, keyName) => onCopyText(val, `Copied "${keyName}" to clipboard!`)}
                    onDeleteSite={(siteKey) => onDeleteSite(account.id, siteKey)}
                    onDeleteAttribute={(siteKey, fieldKey) => onDeleteAttribute(account.id, siteKey, fieldKey)}
                    onAddAttribute={(siteKey, k, v, n) => onAddAttribute(account.id, siteKey, k, v, n)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
