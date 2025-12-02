import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'nav.home': 'Главная',
    'nav.sofas': 'Диваны',
    'nav.contact': 'Контакты',
    'hero.discover': 'Открыть коллекцию',
    'section.sale': 'Распродажа',
    'section.collection': 'Коллекция',
    'section.all_sofas': 'Все диваны',
    'button.more': 'Показать все',
    'button.view': 'Подробнее',
    'price.from': 'от',
    'price.currency': 'сум',
    'sale.original': 'Было',
    'footer.rights': 'Все права защищены',
    'footer.owner': '',
    'admin.login': 'Вход в панель управления',
    'admin.password': 'Пароль',
    'admin.enter': 'Войти',
    'admin.error': 'Неверный пароль',
    'sofa.description': 'Описание',
    'sofa.specifications': 'Характеристики',
    'sofa.comments': 'Комментарии',
  },
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.sofas': 'Divanlar',
    'nav.contact': 'Aloqa',
    'hero.discover': "Kolleksiyani ko'rish",
    'section.sale': 'Chegirma',
    'section.collection': 'Kolleksiya',
    'section.all_sofas': 'Barcha divanlar',
    'button.more': "Barchasini ko'rish",
    'button.view': 'Batafsil',
    'price.from': 'dan',
    'price.currency': "so'm",
    'sale.original': 'Eski narx',
    'footer.rights': 'Barcha huquqlar himoyalangan',
    'footer.owner': '',
    'admin.login': 'Boshqaruv paneliga kirish',
    'admin.password': 'Parol',
    'admin.enter': 'Kirish',
    'admin.error': "Noto'g'ri parol",
    'sofa.description': 'Tavsif',
    'sofa.specifications': 'Xususiyatlar',
    'sofa.comments': 'Izohlar',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
