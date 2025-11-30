import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SofaCard from '@/components/SofaCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockSofas, mockFooter } from '@/data/mockData';

const SofasPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 md:py-12">
        <div className="luxury-container">
          <h1 className="luxury-title text-foreground text-center mb-10 md:mb-16">
            {t('section.all_sofas')}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockSofas.map((sofa, index) => (
              <div
                key={sofa.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SofaCard sofa={sofa} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer data={mockFooter} />
      <LanguageSwitcher />
    </div>
  );
};

export default SofasPage;
