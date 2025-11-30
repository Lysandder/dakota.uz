import { useLanguage } from '@/contexts/LanguageContext';
import { SloganData } from '@/data/mockData';

interface SloganSectionProps {
  slogan: SloganData;
}

const SloganSection = ({ slogan }: SloganSectionProps) => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[hsl(var(--section-light-bg))]">
      <div className="luxury-container max-w-3xl text-center">
        <div className="w-16 h-px bg-[hsl(var(--section-light-fg))]/30 mx-auto mb-8" />
        <h2 className="font-serif text-2xl md:text-3xl font-light text-[hsl(var(--section-light-fg))] mb-6 tracking-wide">
          {slogan.title[language]}
        </h2>
        <p className="luxury-text text-[hsl(var(--section-light-fg))]/70 leading-relaxed">
          {slogan.text[language]}
        </p>
        <div className="w-16 h-px bg-[hsl(var(--section-light-fg))]/30 mx-auto mt-8" />
      </div>
    </section>
  );
};

export default SloganSection;
