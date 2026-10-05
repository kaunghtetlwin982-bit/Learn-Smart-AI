import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Appearance = 'light' | 'dark';
const STORAGE_KEY = 'learn-smart-appearance';
const AppearanceContext = createContext<{ appearance: Appearance; setAppearance: (appearance: Appearance) => void } | null>(null);

function readAppearance(): Appearance {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  } catch {
    return 'light';
  }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearanceState] = useState<Appearance>(readAppearance);

  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', appearance === 'dark' ? '#0F172A' : '#4F46E5');
  }, [appearance]);

  const value = useMemo(() => ({
    appearance,
    setAppearance(next: Appearance) {
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0F172A' : '#4F46E5');
      setAppearanceState(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage may be unavailable */ }
    },
  }), [appearance]);

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error('useAppearance must be used within AppearanceProvider');
  return context;
}
