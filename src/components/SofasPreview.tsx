import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sofa } from '@/data/mockData';
import SofaCard from './SofaCard';

interface SofasPreviewProps {
  sofas: Sofa[];
  limit?: number;
}

const SofasPreview = ({ sofas, limit = 4 }: SofasPreviewProps) => {
  const { t } = useLanguage();
  
  // Exclude sale items and limit to specified count
  const displaySofas = sofas
    .filter(sofa => !sofa.onSale)
    .slice(0, limit);

  if (displaySofas.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[hsl(var(--section-light-bg))]">
      <div className="luxury-container">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-[hsl(var(--section-light-fg))] text-center mb-8 md:mb-12 tracking-wide">
          {t('section.collection')}
        </h2>
        
        {/* 2 columns default, 3 on larger screens */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {displaySofas.map((sofa, index) => (
            <div
              key={sofa.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SofaCard sofa={sofa} variant="light" />
            </div>
          ))}
        </div>

        {sofas.filter(s => !s.onSale).length > limit && (
          <div className="text-center mt-10 md:mt-12">
            <Link 
              to="/sofas" 
              className="px-8 py-3 border border-[hsl(var(--section-light-fg))]/30 text-sm tracking-widest uppercase font-light text-[hsl(var(--section-light-fg))] transition-all duration-300 hover:bg-[hsl(var(--section-light-fg))] hover:text-[hsl(var(--section-light-bg))] inline-block"
            >
              {t('button.more')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SofasPreview;
