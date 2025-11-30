import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sofa } from '@/data/mockData';

interface SofaCardProps {
  sofa: Sofa;
  variant?: 'dark' | 'light';
}

const SofaCard = ({ sofa, variant = 'dark' }: SofaCardProps) => {
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDark = variant === 'dark';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || sofa.images.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const zoneWidth = rect.width / sofa.images.length;
    const newIndex = Math.min(Math.floor(x / zoneWidth), sofa.images.length - 1);
    setActiveImageIndex(newIndex);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveImageIndex(0);
  };

  const handleScroll = () => {
    if (!scrollRef.current || !isMobile) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveImageIndex(newIndex);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  // Dynamic colors based on variant
  const bgClass = isDark ? 'bg-card' : 'bg-[hsl(var(--section-light-bg))]';
  const textClass = isDark ? 'text-foreground' : 'text-[hsl(var(--section-light-fg))]';
  const mutedClass = isDark ? 'text-muted-foreground' : 'text-[hsl(var(--section-light-fg))]/60';
  const indicatorActive = isDark ? 'bg-foreground' : 'bg-[hsl(var(--section-light-fg))]';
  const indicatorInactive = isDark ? 'bg-foreground/30' : 'bg-[hsl(var(--section-light-fg))]/30';

  return (
    <Link to={`/sofa/${sofa.id}`} className="block group">
      <div className={`${bgClass} rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1`}>
        {/* Image Gallery */}
        <div
          className="relative aspect-[4/3] bg-luxury-brown-light overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {isMobile ? (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x-mandatory scrollbar-hide h-full"
            >
              {sofa.images.map((image) => (
                <div key={image.id} className="flex-shrink-0 w-full h-full snap-start">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={sofa.images[activeImageIndex]?.url || sofa.images[0]?.url}
              alt={sofa.images[activeImageIndex]?.alt || sofa.name[language]}
              className="w-full h-full object-cover transition-opacity duration-200"
            />
          )}

          {/* Desktop hover indicators */}
          {!isMobile && sofa.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-1">
              {sofa.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-0.5 flex-1 rounded-full transition-all duration-200 ${
                    index === activeImageIndex ? indicatorActive : indicatorInactive
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile dots */}
          {isMobile && sofa.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sofa.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    index === activeImageIndex ? indicatorActive : indicatorInactive
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <h3 className={`font-serif text-xl md:text-2xl font-light ${textClass} mb-2 tracking-wide group-hover:opacity-70 transition-opacity`}>
            {sofa.name[language]}
          </h3>
          <div className="flex items-baseline gap-3">
            {sofa.onSale && sofa.salePrice ? (
              <>
                <span className="text-destructive font-light text-sm md:text-base">
                  {formatPrice(sofa.salePrice)} {t('price.currency')}
                </span>
                <span className={`${mutedClass} line-through text-xs md:text-sm font-light`}>
                  {formatPrice(sofa.price)} {t('price.currency')}
                </span>
              </>
            ) : (
              <span className={`${mutedClass} font-light text-sm md:text-base`}>
                {formatPrice(sofa.price)} {t('price.currency')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SofaCard;
