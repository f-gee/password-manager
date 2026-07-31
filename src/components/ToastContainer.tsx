import React from 'react';
import { Info, Check, AlertCircle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        let leftColor = "bg-indigo-500";
        let IconComponent = Info;

        if (toast.type === "success") {
          leftColor = "bg-emerald-500";
          IconComponent = Check;
        } else if (toast.type === "error") {
          leftColor = "bg-rose-500";
          IconComponent = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 text-slate-150 text-xs py-3 px-4.5 rounded-xl shadow-xl pointer-events-auto animate-slide-in relative overflow-hidden shrink-0 max-w-sm"
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${leftColor}`} />
            <div className="text-slate-400 font-mono shrink-0">
              <IconComponent className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 font-sans text-slate-300 font-medium">{toast.message}</div>
            <button 
              onClick={() => onDismiss(toast.id)} 
              className="text-slate-500 hover:text-slate-300 ml-2 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
