import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDict, translations, languagesList } from '../lib/translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  languages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('socialboost_user_lang');
    if (saved === 'fr' || saved === 'en' || saved === 'es') {
      return saved as Language;
    }
    // Attempt browser language detection
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'en' || browserLang === 'es') {
      return browserLang as Language;
    }
    return 'fr'; // Fallback to French
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('socialboost_user_lang', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: languagesList }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
