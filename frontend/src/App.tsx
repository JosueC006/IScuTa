import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { EmergencyBanner } from '@/components/EmergencyBanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { Home } from '@/pages/Home';
import { Mapa } from '@/pages/Mapa';
import { DetalheUnidade } from '@/pages/DetalheUnidade';
import { Cartilhas } from '@/pages/Cartilhas';
import { LeitorCartilha } from '@/pages/LeitorCartilha';
import { Videos } from '@/pages/Videos';
import { Avisos } from '@/pages/Avisos';
import { Admin } from '@/pages/Admin';

import { useAccessibilityStore } from '@/context/useAccessibilityStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  const { fontSize, highContrast } = useAccessibilityStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('contrast-more', 'dark');
    } else {
      document.documentElement.classList.remove('contrast-more', 'dark');
    }
  }, [highContrast]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
          {/* Barra de Acessibilidade no topo */}
          <AccessibilityBar />

          {/* Faixa de Urgência PEP (72h) */}
          <EmergencyBanner />

          {/* Cabeçalho Principal */}
          <Navbar />

          {/* Conteúdo Principal com Landmark Acessível */}
          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/unidade/:id" element={<DetalheUnidade />} />
              <Route path="/cartilhas" element={<Cartilhas />} />
              <Route path="/cartilhas/:slug" element={<LeitorCartilha />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/avisos" element={<Avisos />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Rodapé Institucional */}
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

