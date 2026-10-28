import React, { useState, useMemo } from 'react';
import { Bell, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { useAvisos } from '@/hooks/useQueries';
import { TipoAvisoBadge } from '@/components/Badges';
import { formatDateRange } from '@/utils/formatters';
import type { TipoAviso } from '@/types';

export const Avisos: React.FC = () => {
  const { data: avisos, isLoading } = useAvisos();
  const [selectedType, setSelectedType] = useState<string>('TODOS');

  const filteredAvisos = useMemo(() => {
    if (!avisos) return [];
    if (selectedType === 'TODOS') return avisos;
    return avisos.filter((a) => a.tipo === selectedType);
  }, [avisos, selectedType]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Bell className="w-3.5 h-3.5" />
          <span>Mural de Ações Públicas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Avisos, Eventos e Campanhas
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Acompanhe a linha do tempo com mutirões itinerantes, palestras de conscientização e ações
          de saúde preventiva em Recife.
        </p>
      </div>

      {/* Filtros por Tipo */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['TODOS', 'CAMPANHA', 'EVENTO', 'AVISO'] as const).map((tipo) => (
          <button
            key={tipo}
            onClick={() => setSelectedType(tipo)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === tipo
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {tipo === 'TODOS' ? 'Todos os Comunicados' : tipo === 'CAMPANHA' ? 'Campanhas' : tipo === 'EVENTO' ? 'Eventos' : 'Avisos Gerais'}
          </button>
        ))}
      </div>

      {/* Linha do Tempo (Timeline) */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredAvisos.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Nenhum aviso vigente no momento</h2>
          <p className="text-xs text-slate-500 mt-1">Quando novas campanhas e mutirões forem agendados, eles aparecerão aqui.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-brand-200 dark:border-slate-700 ml-4 sm:ml-6 space-y-8 py-2">
          {filteredAvisos.map((aviso) => (
            <div key={aviso.id} className="relative pl-6 sm:pl-8 group">
              {/* Ponto / Nó da Linha do Tempo */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-500 border-4 border-white dark:border-slate-900 shadow-sm group-hover:scale-125 transition-transform" />

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <TipoAvisoBadge tipo={aviso.tipo as TipoAviso} />

                  {(aviso.dataInicio || aviso.dataFim) && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 px-2.5 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDateRange(aviso.dataInicio, aviso.dataFim)}</span>
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {aviso.titulo}
                </h2>

                {aviso.descricao && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {aviso.descricao}
                  </p>
                )}

                {aviso.local && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    <span>Local da Ação: <strong>{aviso.local}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
