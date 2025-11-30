import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sofa } from '@/data/mockData';
import SofaCard from './SofaCard';

interface SofasPreviewProps {
  sofas: Sofa[];
  limit?: number;
}

const SofasPreview = ({ sofas, limit = 5 }: SofasPreviewProps) => {
  const { t } = useLanguage();
  const displaySofas = sofas.slice(0, limit);

  return (
    <section className="py-12 md:py-16">
      <div className="luxury-container">
        <h2 className="luxury-subtitle text-foreground text-center mb-8 md:mb-12">
          {t('section.collection')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displaySofas.map((sofa, index) => (
            <div
              key={sofa.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SofaCard sofa={sofa} />
            </div>
          ))}
        </div>

        {sofas.length > limit && (
          <div className="text-center mt-10 md:mt-12">
            <Link to="/sofas" className="luxury-button inline-block">
              {t('button.more')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SofasPreview;
