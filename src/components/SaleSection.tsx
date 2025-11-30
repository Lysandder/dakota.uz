import { useLanguage } from '@/contexts/LanguageContext';
import { Sofa } from '@/data/mockData';
import SofaCard from './SofaCard';

interface SaleSectionProps {
  sofas: Sofa[];
}

const SaleSection = ({ sofas }: SaleSectionProps) => {
  const { t } = useLanguage();
  const saleSofas = sofas.filter((sofa) => sofa.onSale);

  if (saleSofas.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="luxury-container">
        <h2 className="luxury-subtitle text-foreground text-center mb-8 md:mb-12">
          {t('section.sale')}
        </h2>
      </div>
      <div className="px-6 md:px-8 lg:px-12">
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x-mandatory">
          {saleSofas.map((sofa) => (
            <div key={sofa.id} className="flex-shrink-0 w-72 md:w-80 snap-start">
              <SofaCard sofa={sofa} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleSection;
