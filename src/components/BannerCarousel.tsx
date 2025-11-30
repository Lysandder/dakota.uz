import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Banner } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel = ({ banners }: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  const showControls = banners.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (!showControls) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [showControls, nextSlide]);

  const renderBanner = (banner: Banner) => {
    switch (banner.type) {
      case 'full-image':
        return (
          <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{ backgroundImage: `url(${banner.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-background/60" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="luxury-title text-foreground mb-4 animate-fade-up">
                {banner.title[language]}
              </h2>
              {banner.subtitle && (
                <p className="luxury-text text-foreground/80 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  {banner.subtitle[language]}
                </p>
              )}
              {banner.buttonText && banner.buttonLink && (
                <Link
                  to={banner.buttonLink}
                  className="luxury-button animate-fade-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  {banner.buttonText[language]}
                </Link>
              )}
            </div>
          </div>
        );

      case 'split-content':
        return (
          <div className="min-h-[70vh] md:min-h-[80vh] w-full flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 md:py-0 order-2 md:order-1">
              <h2 className="luxury-title text-foreground mb-4 animate-fade-up">
                {banner.title[language]}
              </h2>
              {banner.subtitle && (
                <p className="luxury-text text-foreground/80 mb-8 max-w-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  {banner.subtitle[language]}
                </p>
              )}
              {banner.buttonText && banner.buttonLink && (
                <Link
                  to={banner.buttonLink}
                  className="luxury-button self-start animate-fade-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  {banner.buttonText[language]}
                </Link>
              )}
            </div>
            <div className="flex-1 order-1 md:order-2">
              {banner.cardImage && (
                <img
                  src={banner.cardImage}
                  alt={banner.title[language]}
                  className="w-full h-64 md:h-full object-cover"
                />
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-elegant"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            {renderBanner(banner)}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-foreground transition-all duration-300 hover:bg-background/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-foreground transition-all duration-300 hover:bg-background/40"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-foreground w-6' : 'bg-foreground/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BannerCarousel;
