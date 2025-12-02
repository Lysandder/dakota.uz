import { Instagram, Send, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FooterData } from '@/data/mockData';

interface FooterProps {
  data: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="luxury-container">
        <div className="text-center mb-10">
          <h2 className="brand-name text-foreground mb-2">Dakota</h2>
          <p className="text-sm text-muted-foreground tracking-wide">
            <!-- {t('footer.owner')} -->
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
          {data.instagram && (
            <a
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">Instagram</span>
            </a>
          )}
          {data.telegram && (
            <a
              href={data.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Send className="w-5 h-5" />
              <span className="text-sm">Telegram</span>
            </a>
          )}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">{data.email}</span>
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">{data.phone}</span>
            </a>
          )}
        </div>

        {data.address && (
          <div className="flex items-center justify-center gap-2 text-foreground/60 mb-8">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{data.address[language]}</span>
          </div>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} High Level Sofa. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
