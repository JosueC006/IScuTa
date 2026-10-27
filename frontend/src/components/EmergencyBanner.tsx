import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  return (
    <div
      role="banner"
      aria-label="Aviso de Emergência de Saúde - PEP"
      className="bg-gradient-to-r from-rose-600 to-rose-700 text-white px-4 py-2.5 shadow-md transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="flex-shrink-0 bg-white/20 p-1.5 rounded-full">
            <AlertCircle className="w-5 h-5 text-white" aria-hidden="true" />
          </span>
          <div>
            <span className="font-extrabold tracking-wide uppercase text-rose-100 mr-2 text-xs bg-rose-900/60 px-2 py-0.5 rounded">
              Urgência 72h
            </span>
            <span className="font-medium text-white">
              Teve exposição ao HIV ou relação desprotegida? A <strong>PEP</strong> deve ser iniciada em até 72 horas.
            </span>
          </div>
        </div>

        <Link
          to="/mapa?filtro=pep"
          className="inline-flex items-center gap-1.5 bg-white text-rose-700 hover:bg-rose-50 px-3.5 py-1.5 rounded-full text-xs font-bold shadow transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-700 whitespace-nowrap"
        >
          <span>Onde Encontrar PEP</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

