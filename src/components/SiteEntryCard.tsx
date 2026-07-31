import React, { useState } from 'react';
import { Globe, Trash2, ChevronDown, ChevronUp, ExternalLink, Plus } from 'lucide-react';
import { SubEntry } from '../types';
import { AttributeRow } from './AttributeRow';

interface SiteEntryCardProps {
  subEntry: SubEntry;
  onCopyValue: (val: string, keyName: string) => void;
  onDeleteSite: (siteKey: string) => void;
  onDeleteAttribute: (siteKey: string, fieldKey: string) => void;
  onAddAttribute: (siteKey: string, key: string, val: string, note?: string) => void;
}

export const SiteEntryCard: React.FC<SiteEntryCardProps> = ({
  subEntry,
  onCopyValue,
  onDeleteSite,
  onDeleteAttribute,
  onAddAttribute
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [attrKey, setAttrKey] = useState('');
  const [attrVal, setAttrVal] = useState('');
  const [attrNote, setAttrNote] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attrKey.trim() || !attrVal.trim()) return;
    onAddAttribute(subEntry.key, attrKey.trim().toLowerCase(), attrVal.trim(), attrNote.trim() || undefined);
    setAttrKey('');
    setAttrVal('');
    setAttrNote('');
  };

  const fieldsList = subEntry.val || subEntry.values || subEntry.fields || [];

  return (
    <div className="bg-slate-800/20 border border-slate-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-800">
      {/* Accordion title bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-3.5 px-4 bg-slate-900/40 border-b border-slate-900/50 cursor-pointer hover:bg-slate-900/80 transition-colors select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-indigo-400 font-mono shrink-0">
            <Globe className="w-3.5 h-3.5" />
          </span>
          <div className="truncate flex flex-col gap-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold tracking-tight text-slate-200 font-mono">{subEntry.key}</span>
              <a 
                href={subEntry.key.includes('://') ? subEntry.key : `https://${subEntry.key}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()} 
                className="inline-flex items-center gap-1 text-[10.5px] bg-slate-950/60 hover:bg-indigo-600/25 px-1.5 py-0.5 rounded-md border border-slate-800/80 hover:border-indigo-500/30 text-indigo-400 hover:text-indigo-300 font-mono font-medium transition-all"
              >
                Visit <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            {subEntry.note && (
              <span className="block text-[11px] text-slate-400 font-sans italic truncate max-w-xs md:max-w-md">
                {subEntry.note}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => onDeleteSite(subEntry.key)}
            className="p-1.5 text-slate-550 hover:text-rose-450 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/15 cursor-pointer transition-colors inline-flex items-center justify-center"
            title="Remove Site Link"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-500 hover:text-slate-300" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </div>
      </div>

      {/* Accordion details content */}
      {isExpanded && (
        <div className="overflow-hidden bg-slate-900/10 p-4 space-y-4">
          {/* Attributes list */}
          {fieldsList.length === 0 ? (
            <p className="text-[10px] text-slate-500 font-mono italic p-3 text-center">
              No field-value pairings configured yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-900/30 border border-slate-900/50 rounded-xl overflow-hidden bg-slate-850/20">
              {fieldsList.map((field, idx) => (
                <AttributeRow
                  key={`${field.key}-${idx}`}
                  field={field}
                  onCopy={onCopyValue}
                  onDelete={(fieldKey) => onDeleteAttribute(subEntry.key, fieldKey)}
                />
              ))}
            </div>
          )}

          {/* Inline addition form */}
          <form 
            onSubmit={handleFormSubmit}
            className="bg-slate-800/10 p-3.5 rounded-xl border border-slate-900/40 space-y-3"
          >
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Insert custom credential attributes
            </span>
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input 
                type="text" 
                placeholder="Key name (e.g. username)" 
                required 
                value={attrKey}
                onChange={(e) => setAttrKey(e.target.value)}
                className="w-full sm:w-1/3 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none font-mono text-slate-200"
              />
              <textarea 
                placeholder="Password / attribute value" 
                required 
                rows={1}
                value={attrVal}
                onChange={(e) => setAttrVal(e.target.value)}
                className="w-full sm:flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none font-mono text-slate-200 resize-y min-h-[34px]"
              />
              <input 
                type="text" 
                placeholder="Short note" 
                value={attrNote}
                onChange={(e) => setAttrNote(e.target.value)}
                className="w-full sm:w-1/4 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none text-slate-200"
              />
              <button 
                type="submit" 
                className="cursor-pointer bg-indigo-650 hover:bg-indigo-600 text-white text-[11px] px-3.5 py-2 rounded-lg border border-indigo-500/10 w-full sm:w-auto font-bold inline-flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="align-middle">Add</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
