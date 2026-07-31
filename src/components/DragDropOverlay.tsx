import React from 'react';

interface DragDropOverlayProps {
  isVisible: boolean;
}

export const DragDropOverlay: React.FC<DragDropOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="border-2 border-dashed border-indigo-500/40 bg-indigo-500/10 rounded-2xl p-6 mb-8 text-center transition-all animate-fade-in">
      <p className="text-xs font-mono text-indigo-400">⚡ Drop your JSON credentials template on this card to import instantly ⚡</p>
    </div>
  );
};
