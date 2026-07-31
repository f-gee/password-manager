import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, Trash2 } from 'lucide-react';
import { FieldAttribute } from '../types';
import { getDisplayValue } from '../utils/storage';

interface AttributeRowProps {
  field: FieldAttribute;
  onCopy: (val: string, keyName: string) => void;
  onDelete: (fieldKey: string) => void;
}

export const AttributeRow: React.FC<AttributeRowProps> = ({
  field,
  onCopy,
  onDelete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const valStr = getDisplayValue(field.val);

  const handleCopyClick = () => {
    onCopy(valStr, field.key);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-2.5 px-4 flex items-center justify-between gap-4 hover:bg-slate-800/15 transition-colors">
      <div className="min-w-0 flex-1 flex items-center gap-4">
        {/* Attribute Key Badge */}
        <div className="w-24 md:w-32 shrink-0 truncate">
          <span 
            className="text-xs uppercase font-semibold tracking-wider text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80 inline-block max-w-full truncate"
            title={field.key}
          >
            {field.key}
          </span>
        </div>

        {/* Hidden / Revealed value */}
        <div className="flex-1 font-mono text-sm max-w-full truncate flex items-center">
          {isVisible ? (
            <div className="whitespace-pre-line text-emerald-300 font-semibold tracking-wider bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10 text-sm break-all leading-normal text-left">
              {valStr}
            </div>
          ) : (
            <span className="text-slate-500 tracking-widest bg-slate-900/60 px-2.5 py-1 rounded text-sm select-none">
              ••••••••••••
            </span>
          )}

          {field.note && (
            <span className="text-xs text-slate-550 italic ml-2 hidden sm:inline" title={field.note}>
              ({field.note})
            </span>
          )}
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="p-1.5 text-slate-550 hover:text-slate-300 hover:bg-slate-900/60 rounded border border-transparent hover:border-slate-800/60 cursor-pointer transition-colors inline-flex items-center justify-center"
          title={isVisible ? 'Hide Value' : 'Show Value'}
        >
          {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>

        <button 
          onClick={handleCopyClick}
          className="p-1.5 text-slate-550 hover:text-slate-300 hover:bg-slate-900/60 rounded border border-transparent hover:border-slate-800/60 cursor-pointer transition-colors inline-flex items-center justify-center"
          title="Copy Value"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <button 
          onClick={() => onDelete(field.key)}
          className="p-1.5 text-slate-600 hover:text-rose-450 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/15 cursor-pointer transition-colors inline-flex items-center justify-center"
          title="Delete Attribute"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
