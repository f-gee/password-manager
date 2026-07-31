import React, { useState } from 'react';
import { KeyRound, Copy, Check } from 'lucide-react';
import { generateRandomToken } from '../utils/storage';

interface TokenGeneratorProps {
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const TokenGenerator: React.FC<TokenGeneratorProps> = ({ onShowToast }) => {
  const [token, setToken] = useState<string>('');
  const [length, setLength] = useState<number>(18);
  const [charsetMode, setCharsetMode] = useState<'all' | 'alphanumeric'>('all');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    const includeSymbols = charsetMode === 'all';
    const newToken = generateRandomToken(length, includeSymbols);
    setToken(newToken);
    setIsCopied(false);
    onShowToast('Generated high-strength secure token!', 'success');
  };

  const handleCopy = () => {
    if (!token) {
      onShowToast('Please generate a token first', 'error');
      return;
    }
    navigator.clipboard.writeText(token).then(() => {
      setIsCopied(true);
      onShowToast('Token copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      onShowToast('Failed to copy token', 'error');
    });
  };

  return (
    <section className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl mb-8 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto">
          <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <KeyRound className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">QUICK TOKEN GENERATOR</h3>
            <p className="text-[10px] text-slate-500 font-mono">Create enterprise-grade cryptographic secrets instantly</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-2.5 w-full md:w-auto md:max-w-md flex-1">
          <div className="relative flex-1 max-w-full md:max-w-xs">
            <input 
              type="text" 
              value={token}
              readOnly 
              placeholder="Click button to generate..." 
              className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500/40 text-xs px-8 py-2.5 rounded-xl font-mono tracking-wide text-indigo-300 outline-none select-all placeholder:text-slate-700 text-center"
            />
            <button 
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 rounded transition-colors cursor-pointer inline-flex items-center justify-center"
              title="Copy token"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <button 
            onClick={handleGenerate}
            className="bg-indigo-600/10 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-4.5 py-2.5 rounded-xl cursor-pointer active:translate-y-[1px] transition-all whitespace-nowrap"
          >
            Generate Token
          </button>
        </div>
      </div>

      {/* Token config controls row */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-3 border-t border-slate-800/40 text-xs">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Length:</span>
          <input 
            type="range" 
            min="8" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-28 sm:w-36 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/25 min-w-8 text-center">
            {length}
          </span>
        </div>

        <span className="hidden sm:inline text-slate-700 select-none">|</span>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Charset Mode:</span>
          <div className="bg-slate-950 border border-slate-850 p-1 rounded-lg flex items-center gap-1">
            <button 
              type="button"
              onClick={() => setCharsetMode('alphanumeric')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                charsetMode === 'alphanumeric'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-350'
              }`}
            >
              Alphanumeric
            </button>
            <button 
              type="button"
              onClick={() => setCharsetMode('all')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                charsetMode === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-350'
              }`}
            >
              Full (With Symbols)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
