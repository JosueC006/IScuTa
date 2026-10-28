import { useState, useEffect } from 'react';

interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

// Coordenadas padrão do centro de Recife/PE caso o usuário não autorize ou falhe
export const RECIFE_COORDS = {
  latitude: -8.0578,
  longitude: -34.8829,
};

export function useGeoLocation() {
  const [state, setState] = useState<GeoLocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  const requestLocation = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!('geolocation' in navigator)) {
      setState({
        latitude: RECIFE_COORDS.latitude,
        longitude: RECIFE_COORDS.longitude,
        error: 'Geolocalização não suportada neste dispositivo.',
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState({
          latitude: RECIFE_COORDS.latitude,
          longitude: RECIFE_COORDS.longitude,
          error: `Não foi possível obter sua localização: ${err.message}`,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { ...state, requestLocation };
}

