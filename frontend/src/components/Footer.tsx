import React from 'react';
import { PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Faixa de Apoio SUS */}
      <div className="bg-slate-950 py-4 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-brand-400" aria-hidden="true" />
            <span className="font-semibold text-white">Canais de Apoio Gratuitos:</span>
            <span>Disque Saúde <strong>136</strong> (SUS) | CVV <strong>188</strong> (Apoio Emocional)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Navegação 100% anônima e confidencial</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-2">
            <span className="text-brand-400">IScuTa</span> Healthtech
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A prevenção começa na informação. Plataforma focada em acolhimento, acessibilidade e combate à
            desinformação sobre ISTs, PrEP e PEP entre jovens de 14 a 25 anos. Desenvolvido colaborativamente
            no ecossistema do <strong>Recife Resolve</strong>.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Links Rápidos
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="/mapa" className="hover:text-brand-400 transition-colors">
                Encontrar Postos de Saúde em Recife
              </a>
            </li>
            <li>
              <a href="/cartilhas" className="hover:text-brand-400 transition-colors">
                Tudo sobre PrEP (Prevenção Pré-Exposição)
              </a>
            </li>
            <li>
              <a href="/cartilhas" className="hover:text-brand-400 transition-colors">
                Urgência com PEP (Pós-Exposição até 72h)
              </a>
            </li>
            <li>
              <a href="/videos" className="hover:text-brand-400 transition-colors">
                Vídeos Educativos Rápidos
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Compromisso Ético & Acolhimento
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            O acesso aos serviços de saúde sexual pelo SUS é um direito de todos os cidadãos, gratuito e
            livre de qualquer julgamento ou discriminação.
          </p>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" aria-hidden="true" />
            <span>para a juventude de Recife.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} IScuTa - Recife Resolve. Todos os direitos reservados.
      </div>
    </footer>
  );
};

