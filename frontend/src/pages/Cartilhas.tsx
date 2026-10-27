import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Tag } from 'lucide-react';
import { useCartilhas } from '@/hooks/useQueries';

export const Cartilhas: React.FC = () => {
  const { data: cartilhas, isLoading } = useCartilhas();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const categories = useMemo(() => {
    if (!cartilhas) return [];
    const set = new Set<string>();
    cartilhas.forEach((c) => {
      if (c.categoria) set.add(c.categoria);
    });
    return Array.from(set);
  }, [cartilhas]);

  const filteredCartilhas = useMemo(() => {
    if (!cartilhas) return [];
    return cartilhas.filter((c) => {
      const matchSearch =
        c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.resumo && c.resumo.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCategory =
        selectedCategory === 'todas' || c.categoria === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [cartilhas, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 px-3 py-1 rounded-full text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Biblioteca de Conhecimento</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Cartilhas e Guias de Prevenção
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Tire dúvidas, entenda métodos preventivos modernos (PrEP e PEP) e conheça seus direitos em saúde sexual
          com linguagem direta, acessível e sem tabus.
        </p>
      </div>

      {/* Controles de Busca e Filtro */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por termo ou tema..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Buscar cartilhas"
          />
        </div>

        {/* Categorias */}
        {categories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'todas'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Todas as Categorias
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid de Cartilhas */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredCartilhas.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Nenhuma cartilha encontrada</h3>
          <p className="text-xs text-slate-500 mt-1">Tente buscar por outras palavras-chave ou limpe os filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCartilhas.map((cartilha) => (
            <Link
              key={cartilha.id}
              to={`/cartilhas/${cartilha.slug}`}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
            >
              <div>
                {cartilha.categoria && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                    <Tag className="w-3 h-3" />
                    {cartilha.categoria}
                  </span>
                )}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cartilha.titulo}
                </h2>
                {cartilha.resumo && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {cartilha.resumo}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Acessar guia completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

