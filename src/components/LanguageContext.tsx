import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'jamiaName': 'Jamia Naqshbandia Barvi Razvia',
    'address': 'Faisalabad, Pakistan',
    'bismillah': 'In the name of Allah, the Most Gracious, the Most Merciful',
    'studentLogin': 'Student Login',
    'adminLogin': 'Admin Login',
    'footer': 'Powered by Barvi Graphics Faisalabad'
  },
  ur: {
    'jamiaName': 'جامعہ نقشبندیہ باروی رضویہ',
    'address': 'فیصل آباد، پاکستان',
    'bismillah': 'بسم اللہ الرحمن الرحیم',
    'studentLogin': 'طالب علم لاگ ان',
    'adminLogin': 'ایڈمن لاگ ان',
    'footer': 'تعاون فرمایا باروی گرافکس فیصل آباد'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ur');
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  const translate = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
