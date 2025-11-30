import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sofa } from '@/data/mockData';

interface SofaCardProps {
  sofa: Sofa;
}

const SofaCard = ({ sofa }: SofaCardProps) => {
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <Link to={`/sofa/${sofa.id}`} className="block group">
      <div className="luxury-card">
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
              {sofa.images.map((image, index) => (
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
                    index === activeImageIndex ? 'bg-foreground' : 'bg-foreground/30'
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
                    index === activeImageIndex ? 'bg-foreground' : 'bg-foreground/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <h3 className="font-serif text-lg md:text-xl font-light text-foreground mb-2 tracking-wide group-hover:opacity-70 transition-opacity">
            {sofa.name[language]}
          </h3>
          <div className="flex items-baseline gap-3">
            {sofa.onSale && sofa.salePrice ? (
              <>
                <span className="text-destructive font-medium">
                  {formatPrice(sofa.salePrice)} {t('price.currency')}
                </span>
                <span className="text-muted-foreground line-through text-sm">
                  {formatPrice(sofa.price)} {t('price.currency')}
                </span>
              </>
            ) : (
              <span className="text-foreground/90 font-medium">
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
