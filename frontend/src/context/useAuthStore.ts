import { create } from 'zustand';

interface AuthState {
  adminToken: string | null;
  isAuthenticated: boolean;
  setAdminToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  adminToken: localStorage.getItem('iscuta_admin_token'),
  isAuthenticated: !!localStorage.getItem('iscuta_admin_token'),

  setAdminToken: (token: string) => {
    localStorage.setItem('iscuta_admin_token', token);
    set({ adminToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('iscuta_admin_token');
    set({ adminToken: null, isAuthenticated: false });
  },
}));

