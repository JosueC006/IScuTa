import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Stethoscope,
  MapPin,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useAvisos, useCartilhas, useVideos } from '@/hooks/useQueries';
import { TipoAvisoBadge } from '@/components/Badges';
import { formatDateRange } from '@/utils/formatters';

export const Home: React.FC = () => {
  const { data: avisos } = useAvisos();
  const { data: cartilhas, isLoading: loadingCartilhas } = useCartilhas();
  const { data: videos } = useVideos();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-teal-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" aria-hidden="true" />
            <span>Saúde Sexual & Prevenção sem Tabus • Recife</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Cuidar de você é um ato de liberdade.
          </h1>

          <p className="text-base sm:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Informação confiável sobre PrEP, PEP e testagem rápida. Encontre postos de saúde perto de você
            em Recife de forma 100% gratuita, segura e acolhedora.
          </p>

          {/* Quick Action Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/mapa?filtro=pep"
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-3 rounded-full text-sm shadow-lg hover:shadow-rose-500/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-rose-300"
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span>Preciso de PEP (Urgência)</span>
            </Link>

            <Link
              to="/mapa?filtro=prep"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-3 rounded-full text-sm shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-sky-300"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Onde Iniciar PrEP</span>
            </Link>

            <Link
              to="/mapa?filtro=teste"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-full text-sm shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 focus:ring-4 focus:ring-emerald-300"
            >
              <Stethoscope className="w-4 h-4" aria-hidden="true" />
              <span>Fazer Teste Rápido</span>
            </Link>

            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-3 rounded-full text-sm backdrop-blur transition-all"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Ver Mapa Completo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Avisos e Campanhas Vigentes */}
      {avisos && avisos.length > 0 && (
        <section aria-labelledby="avisos-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="avisos-heading" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Campanhas & Ações em Andamento</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ações itinerantes, testagens e mutirões de saúde pública
              </p>
            </div>
            <Link
              to="/avisos"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {avisos.slice(0, 3).map((aviso) => (
              <div
                key={aviso.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <TipoAvisoBadge tipo={aviso.tipo} />
                    {(aviso.dataInicio || aviso.dataFim) && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDateRange(aviso.dataInicio, aviso.dataFim)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {aviso.titulo}
                  </h3>
                  {aviso.descricao && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {aviso.descricao}
                    </p>
                  )}
                </div>

                {aviso.local && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span className="truncate">{aviso.local}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cartilhas em Destaque */}
      <section aria-labelledby="cartilhas-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="cartilhas-heading" className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <span>Cartilhas & Conhecimento</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Guias práticos e revisados para tirar dúvidas sem vergonha
            </p>
          </div>
          <Link
            to="/cartilhas"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingCartilhas ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartilhas?.map((cartilha) => (
              <Link
                key={cartilha.id}
                to={`/cartilhas/${cartilha.slug}`}
                className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
              >
                <div>
                  {cartilha.categoria && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 inline-block">
                      {cartilha.categoria}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cartilha.titulo}
                  </h3>
                  {cartilha.resumo && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {cartilha.resumo}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Ler cartilha</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Pílulas em Vídeo */}
      {videos && videos.length > 0 && (
        <section aria-labelledby="videos-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="videos-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
                Vídeos Curtos Educativos
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aprenda em 1 minuto o essencial para sua saúde
              </p>
            </div>
            <Link
              to="/videos"
              className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="aspect-video w-full bg-slate-900">
                  <iframe
                    src={video.urlEmbed}
                    title={video.titulo}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                    {video.titulo}
                  </h3>
                  {video.descricao && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {video.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Banner de Direitos e Acolhimento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-brand-100 dark:border-slate-700 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Você tem direito ao sigilo e atendimento respeitoso no SUS
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Jovens podem realizar testes e receber orientações médicas de forma confidencial. Nenhum
              profissional pode recusar atendimento por preconceito ou julgamento.
            </p>
          </div>
          <Link
            to="/mapa"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>Encontrar Posto em Recife</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
