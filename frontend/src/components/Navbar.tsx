import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  MapPin,
  BookOpen,
  Video,
  Bell,
  Home,
  ShieldAlert,
  Menu,
  X,
  HeartHandshake,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/mapa', label: 'Onde Atender (Mapa)', icon: MapPin },
    { to: '/cartilhas', label: 'Cartilhas & Guias', icon: BookOpen },
    { to: '/videos', label: 'Pílulas em Vídeo', icon: Video },
    { to: '/avisos', label: 'Avisos & Ações', icon: Bell },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-brand-500 text-white shadow-sm'
        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-md p-1"
            aria-label="IScuTa - Página Inicial"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center shadow-md">
              <HeartHandshake className="w-6 h-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none text-brand-700 dark:text-brand-400">
                IScuTa
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
                Saúde & Prevenção
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação Principal">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={linkClasses}>
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Admin link + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:border-brand-300 transition-colors"
              title="Acesso Administrativo"
            >
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600"
            >
              <Icon className="w-5 h-5 text-brand-500" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ShieldAlert className="w-5 h-5 text-slate-400" aria-hidden="true" />
            <span>Painel Administrativo</span>
          </Link>
        </div>
      )}
    </header>
  );
};

