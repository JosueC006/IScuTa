import { create } from 'zustand';

type FontSize = 'normal' | 'large' | 'larger';

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  fontSize: (localStorage.getItem('iscuta_font_size') as FontSize) || 'normal',
  highContrast: localStorage.getItem('iscuta_high_contrast') === 'true',

  increaseFontSize: () =>
    set((state) => {
      let next: FontSize = 'large';
      if (state.fontSize === 'normal') next = 'large';
      else if (state.fontSize === 'large') next = 'larger';
      else next = 'larger';

      localStorage.setItem('iscuta_font_size', next);
      return { fontSize: next };
    }),

  decreaseFontSize: () =>
    set((state) => {
      let next: FontSize = 'normal';
      if (state.fontSize === 'larger') next = 'large';
      else next = 'normal';

      localStorage.setItem('iscuta_font_size', next);
      return { fontSize: next };
    }),

  resetFontSize: () => {
    localStorage.setItem('iscuta_font_size', 'normal');
    set({ fontSize: 'normal' });
  },

  toggleHighContrast: () =>
    set((state) => {
      const next = !state.highContrast;
      localStorage.setItem('iscuta_high_contrast', String(next));
      if (next) {
        document.documentElement.classList.add('contrast-more');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('contrast-more');
        document.documentElement.classList.remove('dark');
      }
      return { highContrast: next };
    }),
}));

