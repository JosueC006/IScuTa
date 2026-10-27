import React from 'react';
import { Video as VideoIcon, ShieldCheck, Tag } from 'lucide-react';
import { useVideos } from '@/hooks/useQueries';

export const Videos: React.FC = () => {
  const { data: videos, isLoading } = useVideos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 px-3 py-1 rounded-full text-xs font-semibold">
          <VideoIcon className="w-3.5 h-3.5" />
          <span>Educação em Vídeo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Pílulas em Vídeo
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Assista a explicações simples e diretas de especialistas da saúde sobre prevenção, dúvidas comuns
          e o passo a passo para cuidar de si sem medo.
        </p>

        <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Vídeos em modo de privacidade aprimorada (sem rastreadores externos)</span>
        </div>
      </div>

      {/* Grid de Vídeos */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : !videos || videos.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
          <VideoIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Nenhum vídeo disponível no momento</h2>
          <p className="text-xs text-slate-500 mt-1">Novas pílulas educativas estão sendo produzidas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="aspect-video w-full bg-slate-900 relative">
                <iframe
                  src={video.urlEmbed}
                  title={video.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {video.categoria && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1.5">
                      <Tag className="w-3 h-3" />
                      {video.categoria}
                    </span>
                  )}
                  <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {video.titulo}
                  </h2>
                  {video.descricao && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {video.descricao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

