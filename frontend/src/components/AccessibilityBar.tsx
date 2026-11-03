import React from 'react';
import { useAccessibilityStore } from '@/context/useAccessibilityStore';
import { Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
  } = useAccessibilityStore();

  return (
    <div
      role="region"
      aria-label="Barra de Ferramentas de Acessibilidade"
      className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Link para pular direto para o conteúdo principal (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:inline-block focus:bg-brand-500 focus:text-white focus:px-3 focus:py-1 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white z-50 font-medium"
        >
          Pular para o conteúdo principal
        </a>

        <div className="flex items-center gap-1 text-slate-300">
          <span className="font-semibold text-white tracking-wide">Acessibilidade:</span>
          <span className="hidden sm:inline">Ajuste a visualização para melhor conforto</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Botões de Fonte */}
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="p-1 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent rounded transition-colors text-white"
              title="Diminuir tamanho do texto"
              aria-label="Diminuir tamanho do texto"
            >
              <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-brand-300 font-bold select-none">
              A{fontSize === 'normal' ? '' : fontSize === 'large' ? '+' : '++'}
            </span>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'larger'}
              className="p-1 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent rounded transition-colors text-white"
              title="Aumentar tamanho do texto"
              aria-label="Aumentar tamanho do texto"
            >
              <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {fontSize !== 'normal' && (
              <button
                onClick={resetFontSize}
                className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white"
                title="Tamanho padrão de texto"
                aria-label="Restaurar tamanho padrão de texto"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Alto Contraste */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold ring-2 ring-yellow-400'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            aria-pressed={highContrast}
            title="Alternar modo de alto contraste"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{highContrast ? 'Contraste Ativo' : 'Alto Contraste'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

