import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { ConfirmModalOptions } from '../types';

interface ConfirmModalProps {
  options: ConfirmModalOptions | null;
  onConfirm: () => void;
  onAlternative?: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  options,
  onConfirm,
  onAlternative,
  onCancel
}) => {
  if (!options) return null;

  const {
    title,
    message,
    confirmText = "Confirm",
    alternativeText,
    isDanger = true
  } = options;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <div className="p-5 border-b border-slate-800/60 font-sans">
          <div className="flex items-center gap-3">
            {isDanger ? (
              <span className="text-rose-500 bg-rose-500/10 p-2 rounded-xl border border-rose-500/10">
                <AlertTriangle className="w-4 h-4" />
              </span>
            ) : (
              <span className="text-indigo-400 bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/10">
                <Info className="w-4 h-4" />
              </span>
            )}
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">{title}</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs text-slate-400 font-mono leading-relaxed whitespace-pre-line">{message}</p>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 font-sans">
            <button 
              onClick={onCancel}
              className="cursor-pointer bg-slate-950 hover:bg-slate-850 hover:border-slate-700 border border-slate-800 text-slate-400 text-xs font-semibold px-4 py-2.5 rounded-xl active:translate-y-[1px] transition-all"
            >
              Cancel
            </button>

            {alternativeText && onAlternative && (
              <button 
                onClick={onAlternative}
                className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-rose-500/30 hover:bg-rose-950/10 text-rose-400 text-xs font-semibold px-4 py-2.5 rounded-xl active:translate-y-[1px] transition-all"
              >
                {alternativeText}
              </button>
            )}

            <button 
              onClick={onConfirm}
              className={`cursor-pointer text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl active:translate-y-[1px] transition-all ${
                isDanger
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 border border-rose-500/20'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
