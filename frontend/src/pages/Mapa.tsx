import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  ShieldCheck,
  Zap,
  Stethoscope,
  MapPin,
  Phone,
  Navigation,
  Clock,
  ChevronRight,
  Filter,
  LocateFixed,
} from 'lucide-react';
import { useUnidadesMapa, useUnidade } from '@/hooks/useQueries';
import { useGeoLocation, RECIFE_COORDS } from '@/hooks/useGeoLocation';
import { PrepBadge, PepBadge, TesteBadge } from '@/components/Badges';
import { formatPhone, calculateDistance } from '@/utils/formatters';

// Correção dos ícones padrão do Leaflet para o Vite
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `
      <div style="
        background-color: ${color};
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
    popupAnchor: [0, -32],
  });
};

const userIcon = L.divIcon({
  className: 'user-location-pin',
  html: `
    <div style="
      background-color: #3b82f6;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4);
      border: 3px solid white;
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const defaultPinIcon = createCustomIcon('#0d9488'); // Brand Teal
const pepPinIcon = createCustomIcon('#e11d48'); // Rose Urgent

// Componente para recentralizar o mapa
const SetMapCenter: React.FC<{ coords: [number, number]; zoom?: number }> = ({ coords, zoom = 14 }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(coords, zoom);
  }, [coords, zoom, map]);
  return null;
};

export const Mapa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtroParam = searchParams.get('filtro') || 'todos';

  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(filtroParam);

  const { data: unidadesMapa, isLoading: loadingMapa } = useUnidadesMapa();
  const { data: selectedUnit, isLoading: loadingUnitDetails } = useUnidade(selectedUnitId || '');
  const { latitude: userLat, longitude: userLon, requestLocation } = useGeoLocation();

  // Atualiza filtro quando mudar a URL
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setSearchParams(filter === 'todos' ? {} : { filtro: filter });
  };

  // Coordenadas centrais (localização do usuário ou Recife)
  const centerCoords: [number, number] = useMemo(() => {
    if (userLat && userLon) return [userLat, userLon];
    return [RECIFE_COORDS.latitude, RECIFE_COORDS.longitude];
  }, [userLat, userLon]);

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] min-h-[550px]">
      {/* Barra de Filtros e Localização */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrar por serviço:</span>
            </span>

            <button
              onClick={() => handleFilterChange('todos')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'todos'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Todos os Postos
            </button>

            <button
              onClick={() => handleFilterChange('pep')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'pep'
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Oferece PEP (Urgência)</span>
            </button>

            <button
              onClick={() => handleFilterChange('prep')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'prep'
                  ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                  : 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Oferece PrEP</span>
            </button>

            <button
              onClick={() => handleFilterChange('teste')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'teste'
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Testagem Rápida</span>
            </button>
          </div>

          <button
            onClick={requestLocation}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 px-3 py-1.5 rounded-full hover:bg-brand-100 transition-colors"
            title="Recentralizar na minha localização"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>Minha Localização</span>
          </button>
        </div>
      </div>

      {/* Container do Mapa e Painel Lateral */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Mapa Leaflet */}
        <div className="flex-1 w-full h-full relative">
          {loadingMapa && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 z-30 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Carregando postos de saúde de Recife...
                </p>
              </div>
            </div>
          )}

          <MapContainer
            center={centerCoords}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
            aria-label="Mapa de Unidades de Saúde de Recife"
          >
            <SetMapCenter coords={centerCoords} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marcador do Usuário */}
            {userLat && userLon && (
              <Marker position={[userLat, userLon]} icon={userIcon}>
                <Popup>
                  <div className="p-2 text-center text-xs">
                    <strong className="text-blue-600 block mb-0.5">Sua Localização Atual</strong>
                    <span>Você está aqui</span>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Marcadores das Unidades de Saúde */}
            {unidadesMapa?.map((unidade) => {
              if (!unidade.latitude || !unidade.longitude) return null;

              return (
                <Marker
                  key={unidade.id}
                  position={[unidade.latitude, unidade.longitude]}
                  icon={activeFilter === 'pep' ? pepPinIcon : defaultPinIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedUnitId(unidade.id);
                    },
                  }}
                >
                  <Popup>
                    <div className="p-3 max-w-[240px] text-xs space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">
                        {unidade.nome}
                      </h4>
                      <p className="text-slate-500">Clique para ver os horários e serviços oferecidos</p>
                      <button
                        onClick={() => setSelectedUnitId(unidade.id)}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-1.5 rounded-lg text-center text-xs block transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Drawer Lateral / Card Flutuante de Unidade Selecionada */}
        {selectedUnitId && (
          <aside
            aria-label="Detalhes da Unidade Selecionada"
            className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:top-4 sm:right-4 sm:left-auto sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 z-30 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-right-4"
          >
            {loadingUnitDetails ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-6 h-6 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Buscando informações da unidade...</p>
              </div>
            ) : selectedUnit ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Unidade de Saúde
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {selectedUnit.nome}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedUnitId(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-xs"
                    aria-label="Fechar detalhes"
                  >
                    ✕
                  </button>
                </div>

                {/* Distância */}
                {userLat && userLon && selectedUnit.latitude && selectedUnit.longitude && (
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 bg-brand-50 dark:bg-brand-950/50 px-2.5 py-1 rounded-full">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Aprox. {calculateDistance(userLat, userLon, selectedUnit.latitude, selectedUnit.longitude)} km de você</span>
                  </div>
                )}

                {/* Badges de Serviços */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <PepBadge active={selectedUnit.oferecePep} />
                  <PrepBadge active={selectedUnit.oferecePrep} />
                  <TesteBadge active={selectedUnit.realizaTesteRapido} />
                </div>

                {/* Endereço e Contato */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {selectedUnit.logradouro}, {selectedUnit.numero} - {selectedUnit.bairro}, {selectedUnit.cidade} - {selectedUnit.uf}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{selectedUnit.horarioFuncionamento}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <a
                      href={`tel:${selectedUnit.telefone}`}
                      className="text-brand-600 hover:underline font-medium"
                    >
                      {formatPhone(selectedUnit.telefone)}
                    </a>
                  </div>
                </div>

                {/* Ações */}
                <div className="pt-2 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedUnit.latitude},${selectedUnit.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Como Chegar</span>
                  </a>

                  <Link
                    to={`/unidade/${selectedUnit.id}`}
                    className="flex-1 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-400 font-semibold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Ficha Completa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : null}
          </aside>
        )}
      </div>
    </div>
  );
};
