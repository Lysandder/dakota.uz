import Header from '@/components/Header';
import BannerCarousel from '@/components/BannerCarousel';
import SloganSection from '@/components/SloganSection';
import SaleSection from '@/components/SaleSection';
import SofasPreview from '@/components/SofasPreview';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { mockBanners, mockSlogan, mockSofas, mockFooter } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BannerCarousel banners={mockBanners} />
        <SloganSection slogan={mockSlogan} />
        <SaleSection sofas={mockSofas} />
        <SofasPreview sofas={mockSofas} limit={5} />
      </main>
      <Footer data={mockFooter} />
      <LanguageSwitcher />
    </div>
  );
};

export default Index;
