import React from 'react';
import type { TipoAviso } from '@/types';
import { ShieldCheck, Zap, Stethoscope, Bell, Calendar, Sparkles } from 'lucide-react';

export const PrepBadge: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = '',
}) => {
  if (!active) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800 ${className}`}
      title="Profilaxia Pré-Exposição ao HIV"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      <span>Oferece PrEP</span>
    </span>
  );
};

export const PepBadge: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = '',
}) => {
  if (!active) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 ${className}`}
      title="Profilaxia Pós-Exposição (Urgência até 72h)"
    >
      <Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
      <span>Oferece PEP (Urgência)</span>
    </span>
  );
};

export const TesteBadge: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = '',
}) => {
  if (!active) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 ${className}`}
      title="Testes rápidos de HIV, Sífilis e Hepatites"
    >
      <Stethoscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <span>Testagem Rápida</span>
    </span>
  );
};

export const TipoAvisoBadge: React.FC<{ tipo?: TipoAviso }> = ({ tipo }) => {
  switch (tipo) {
    case 'CAMPANHA':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-950 dark:text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" aria-hidden="true" />
          Campanha
        </span>
      );
    case 'EVENTO':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300">
          <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          Evento
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950 dark:text-blue-300">
          <Bell className="w-3 h-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          Aviso
        </span>
      );
  }
};

