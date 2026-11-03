import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Share2,
  BookOpen,
  MapPin,
  Check,
  Tag,
  Clock,
} from 'lucide-react';
import { useCartilha } from '@/hooks/useQueries';

export const LeitorCartilha: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: cartilha, isLoading, isError } = useCartilha(slug || '');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cartilha?.titulo || 'Cartilha IScuTa',
          text: cartilha?.resumo || 'Saiba mais sobre prevenção e ISTs no IScuTa',
          url: window.location.href,
        });
      } catch {
        // Usuário cancelou o compartilhamento
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 dark:text-slate-400">Carregando cartilha...</p>
      </div>
    );
  }

  if (isError || !cartilha) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Cartilha não encontrada</h2>
        <p className="text-sm text-slate-500">
          O guia que você procurou não existe ou foi arquivado para revisão.
        </p>
        <Link
          to="/cartilhas"
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todas as cartilhas</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Navegação e Ações */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/cartilhas"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a lista</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-slate-50 transition-colors"
          title="Compartilhar esta cartilha"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Link copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </>
          )}
        </button>
      </div>

      {/* Cabeçalho do Artigo */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        {cartilha.categoria && (
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-0.5 rounded-full">
            <Tag className="w-3 h-3" />
            {cartilha.categoria}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {cartilha.titulo}
        </h1>

        {cartilha.resumo && (
          <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {cartilha.resumo}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Leitura rápida (~3 min)
          </span>
          <span>•</span>
          <span>Conteúdo Revisado pelo SUS</span>
        </div>
      </header>

      {/* Conteúdo Renderizado em Markdown */}
      <article className="cartilha-content bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {cartilha.conteudo}
        </ReactMarkdown>
      </article>

      {/* Chamada para o Mapa de Postos */}
      <div className="bg-gradient-to-r from-brand-600 to-teal-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-lg font-bold">Quer saber onde iniciar seu acompanhamento?</h2>
          <p className="text-xs text-brand-100 max-w-lg">
            A PrEP, a PEP e os testes rápidos estão disponíveis gratuitamente nos postos de saúde da Prefeitura do Recife.
          </p>
        </div>
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2 bg-white text-brand-800 hover:bg-brand-50 font-bold px-5 py-2.5 rounded-full text-xs shadow transition-all whitespace-nowrap"
        >
          <MapPin className="w-4 h-4 text-brand-600" />
          <span>Localizar Postos no Mapa</span>
        </Link>
      </div>
    </div>
  );
};

