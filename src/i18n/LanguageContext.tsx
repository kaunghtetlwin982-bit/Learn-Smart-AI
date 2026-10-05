import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Language } from './translations';

const STORAGE_KEY = 'learn-smart-language';
type Section = keyof typeof translations.en;
type Key<S extends Section> = keyof (typeof translations.en)[S];
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <S extends Section>(section: S, key: Key<S>, values?: Record<string, string | number>) => string;
  subjectLabel: (subject: string) => string;
  difficultyLabel: (difficulty: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'my' ? 'my' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readLanguage);
  useEffect(() => { document.documentElement.lang = language === 'my' ? 'my' : 'en'; }, [language]);
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage(next) {
      setLanguageState(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage may be unavailable */ }
    },
    t(section, key, values = {}) {
      const currentSection = translations[language][section] as Record<string, string>;
      const englishSection = translations.en[section] as Record<string, string>;
      let result = currentSection[String(key)] ?? englishSection[String(key)];
      for (const [name, replacement] of Object.entries(values)) {
        result = result.split(`{${name}}`).join(String(replacement));
      }
      return result;
    },
    subjectLabel(subject) {
      return translations[language].subjects[subject as keyof typeof translations.en.subjects] ?? subject;
    },
    difficultyLabel(difficulty) {
      return translations[language].difficulties[difficulty as keyof typeof translations.en.difficulties] ?? difficulty;
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
