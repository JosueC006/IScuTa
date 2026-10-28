import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  Navigation,
  ShieldCheck,
  Zap,
  Stethoscope,
  Info,
  Building2,
} from 'lucide-react';
import { useUnidade } from '@/hooks/useQueries';
import { unidadeService } from '@/services/unidadeService';
import { PrepBadge, PepBadge, TesteBadge } from '@/components/Badges';
import { formatPhone, formatCep } from '@/utils/formatters';

const customPin = L.divIcon({
  className: 'unit-detail-pin',
  html: `
    <div style="
      background-color: #0d9488;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">
      <div style="
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const DetalheUnidade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: unidade, isLoading, isError } = useUnidade(id || '');
  const [photoError, setPhotoError] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 dark:text-slate-400">Carregando informações da unidade...</p>
      </div>
    );
  }

  if (isError || !unidade) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Unidade não encontrada</h2>
        <p className="text-sm text-slate-500">
          A unidade solicitada pode estar temporariamente desativada ou não existe.
        </p>
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Mapa</span>
        </Link>
      </div>
    );
  }

  const fotoUrl = unidadeService.getFotoUrl(unidade.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Link
        to="/mapa"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para o Mapa de Unidades</span>
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
        {/* Foto do Posto */}
        <div className="h-64 sm:h-80 w-full bg-gradient-to-r from-brand-600 to-teal-800 relative overflow-hidden flex items-center justify-center">
          {!photoError ? (
            <img
              src={fotoUrl}
              alt={`Foto da fachada da unidade ${unidade.nome}`}
              onError={() => setPhotoError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white/80 space-y-2 p-4">
              <Building2 className="w-16 h-16 mx-auto stroke-1" />
              <p className="text-xs font-medium">Foto oficial em atualização pela equipe de saúde</p>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Título e Serviços */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Rede de Saúde do Recife
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {unidade.nome}
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              <PepBadge active={unidade.oferecePep} />
              <PrepBadge active={unidade.oferecePrep} />
              <TesteBadge active={unidade.realizaTesteRapido} />
            </div>
          </div>

          {/* Dados de Contato e Endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                    Endereço Completo
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300">
                    {unidade.logradouro}, {unidade.numero} - {unidade.bairro}
                    <br />
                    {unidade.cidade} - {unidade.uf} | CEP: {formatCep(unidade.cep)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                    Horário de Atendimento
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {unidade.horarioFuncionamento}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm flex flex-col justify-between">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                    Telefone de Contato
                  </strong>
                  <a
                    href={`tel:${unidade.telefone}`}
                    className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold hover:underline text-base mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{formatPhone(unidade.telefone)}</span>
                  </a>
                </div>
              </div>

              {unidade.latitude && unidade.longitude && (
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${unidade.latitude},${unidade.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors shadow"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Traçar Rota no Google Maps</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mapa de Localização da Unidade */}
          {unidade.latitude && unidade.longitude && (
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Localização no Mapa</span>
              </h2>
              <div className="h-56 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                <MapContainer
                  center={[unidade.latitude, unidade.longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  dragging={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[unidade.latitude, unidade.longitude]}
                    icon={customPin}
                  />
                </MapContainer>
              </div>
            </div>
          )}

          {/* Orientações sobre os serviços oferecidos */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-500" />
              <span>O que você encontra nesta unidade</span>
            </h2>

            <div className="space-y-3">
              {unidade.oferecePep && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                  <h3 className="font-bold text-rose-800 dark:text-rose-300 text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    Profilaxia Pós-Exposição (PEP) Disponível
                  </h3>
                  <p className="text-xs text-rose-700 dark:text-rose-400 mt-1 leading-relaxed">
                    Medicamento gratuito de urgência que previne a infecção pelo HIV caso tomado em até 72 horas após
                    uma relação desprotegida ou rompimento de preservativo. Dirija-se à recepção e informe que busca atendimento para PEP.
                  </p>
                </div>
              )}

              {unidade.oferecePrep && (
                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50">
                  <h3 className="font-bold text-sky-800 dark:text-sky-300 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Profilaxia Pré-Exposição (PrEP)
                  </h3>
                  <p className="text-xs text-sky-700 dark:text-sky-400 mt-1 leading-relaxed">
                    Acompanhamento contínuo e fornecimento gratuito de comprimidos preventivos contra o HIV para pessoas
                    com vida sexual ativa. Você passa por consulta e exames de rotina.
                  </p>
                </div>
              )}

              {unidade.realizaTesteRapido && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4" />
                    Testagem Rápida e Gratuita
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                    Resultados prontos em 15 a 30 minutos com uma gota de sangue no dedo. Diagnóstico seguro e confidencial para HIV, Sífilis e Hepatites B e C.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
