import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockSofas, mockFooter } from '@/data/mockData';

const SofaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sofa = mockSofas.find((s) => s.id === id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  if (!sofa) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Sofa not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-6 md:py-12">
        <div className="luxury-container">
          <Link
            to="/sofas"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-6 md:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wide">{t('section.all_sofas')}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery */}
            <div className="relative">
              {isMobile ? (
                <>
                  <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x-mandatory scrollbar-hide rounded-sm"
                  >
                    {sofa.images.map((image) => (
                      <div key={image.id} className="flex-shrink-0 w-full aspect-square snap-start">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {sofa.images.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-4">
                      {sofa.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === activeImageIndex ? 'bg-foreground' : 'bg-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="aspect-square rounded-sm overflow-hidden bg-luxury-brown-light">
                    <img
                      src={sofa.images[activeImageIndex]?.url}
                      alt={sofa.images[activeImageIndex]?.alt}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>
                  {sofa.images.length > 1 && (
                    <div className="flex gap-3 mt-4">
                      {sofa.images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-20 h-20 rounded-sm overflow-hidden transition-all duration-200 ${
                            index === activeImageIndex
                              ? 'ring-2 ring-foreground opacity-100'
                              : 'opacity-50 hover:opacity-80'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h1 className="luxury-title text-foreground mb-4">{sofa.name[language]}</h1>
                <div className="flex items-baseline gap-4">
                  {sofa.onSale && sofa.salePrice ? (
                    <>
                      <span className="text-2xl text-destructive font-medium">
                        {formatPrice(sofa.salePrice)} {t('price.currency')}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(sofa.price)} {t('price.currency')}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl text-foreground font-medium">
                      {formatPrice(sofa.price)} {t('price.currency')}
                    </span>
                  )}
                </div>
              </div>

              <div className="luxury-divider !mx-0 !w-full" />

              <div>
                <h2 className="font-serif text-xl text-foreground mb-3 tracking-wide">
                  {t('sofa.description')}
                </h2>
                <p className="luxury-text text-foreground/70">{sofa.description[language]}</p>
              </div>

              {sofa.specSections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-serif text-lg text-foreground mb-4 tracking-wide">
                    {section.title[language]}
                  </h3>
                  <div className="space-y-3">
                    {section.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border"
                      >
                        <span className="text-sm text-foreground/60">{spec.key[language]}</span>
                        <span className="text-sm text-foreground">{spec.value[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {sofa.comments && (
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3 tracking-wide">
                    {t('sofa.comments')}
                  </h3>
                  <p className="luxury-text text-foreground/60 italic">
                    {sofa.comments[language]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer data={mockFooter} />
      <LanguageSwitcher />
    </div>
  );
};

export default SofaDetailPage;
