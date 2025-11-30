import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    if (isOpen) {
      setLanguage(language === 'ru' ? 'uz' : 'ru');
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`flex flex-col-reverse items-center gap-2 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            setLanguage('ru');
            setIsOpen(false);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            language === 'ru'
              ? 'bg-foreground text-background'
              : 'bg-muted text-foreground hover:bg-foreground/20'
          }`}
        >
          RU
        </button>
        <button
          onClick={() => {
            setLanguage('uz');
            setIsOpen(false);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            language === 'uz'
              ? 'bg-foreground text-background'
              : 'bg-muted text-foreground hover:bg-foreground/20'
          }`}
        >
          UZ
        </button>
      </div>
      <button
        onClick={toggleLanguage}
        className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-luxury transition-all duration-300 hover:scale-105 mt-2"
        aria-label="Switch language"
      >
        <Globe className="w-5 h-5" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
