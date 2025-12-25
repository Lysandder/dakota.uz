import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const getTodayPassword = () => {
    // Get current date in UTC+5 (Tashkent timezone)
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const tashkentOffset = 5 * 60 * 60 * 1000; // UTC+5
    const tashkentTime = new Date(now.getTime() + utcOffset + tashkentOffset);

    const day = String(tashkentTime.getDate()).padStart(2, '0');
    const month = String(tashkentTime.getMonth() + 1).padStart(2, '0');
    const year = tashkentTime.getFullYear();

    return `${day}${month}${year}`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const todayPassword = getTodayPassword();

    if (password === todayPassword) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleSectionClick = (sectionName: string) => {
    toast({
      title: t('admin.coming_soon.title'),
      description: `${sectionName}: ${t('admin.coming_soon.desc')}`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-foreground/60" />
            </div>
            <h1 className="font-serif text-2xl text-foreground tracking-wide">{t('admin.login')}</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder={t('admin.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              {error && <p className="text-destructive text-sm mt-2">{t('admin.error')}</p>}
            </div>
            <Button type="submit" className="w-full luxury-button bg-transparent hover:bg-foreground">
              {t('admin.enter')}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="luxury-container py-8">
        <h1 className="luxury-title text-foreground mb-8">Admin Panel</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AdminCard
            title="Banners"
            description="Manage hero banners and carousels"
            onClick={() => handleSectionClick('Banners')}
          />
          <AdminCard
            title="Sofas"
            description="Add, edit, or remove sofa products"
            onClick={() => handleSectionClick('Sofas')}
          />
          <AdminCard
            title="Translations"
            description="Update text content for all languages"
            onClick={() => handleSectionClick('Translations')}
          />
          <AdminCard
            title="Footer"
            description="Edit contact information and links"
            onClick={() => handleSectionClick('Footer')}
          />
          <AdminCard
            title="Slogan"
            description="Update brand slogan section"
            onClick={() => handleSectionClick('Slogan')}
          />
        </div>

        <p className="text-muted-foreground text-center mt-12 text-sm">{t('admin.demo_note')}</p>
      </div>
    </div>
  );
};

const AdminCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="p-6 rounded-sm bg-card border border-border hover:border-foreground/30 transition-colors text-left"
  >
    <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </button>
);

export default AdminPage;
