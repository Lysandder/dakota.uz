import { useState } from 'react';
import { Lock, ArrowLeft, Sofa, Image, FileText, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSofasSection from '@/components/admin/AdminSofasSection';

type AdminSection = 'menu' | 'sofas' | 'banners' | 'translations' | 'footer' | 'slogan';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('menu');
  const { t } = useLanguage();
  const { toast } = useToast();

  const getTodayPassword = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const tashkentOffset = 5 * 60 * 60 * 1000;
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

  const handleSectionClick = (section: AdminSection) => {
    if (section === 'sofas') {
      setActiveSection('sofas');
    } else {
      toast({
        title: t('admin.coming_soon.title'),
        description: `${t('admin.coming_soon.desc')}`,
      });
    }
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

  // Main admin panel
  return (
    <div className="min-h-screen bg-background">
      <div className="luxury-container py-8">
        {activeSection !== 'menu' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection('menu')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад в меню
          </Button>
        )}

        {activeSection === 'menu' && (
          <>
            <h1 className="luxury-title text-foreground mb-8">Admin Panel</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AdminCard
                title="Диваны"
                description="Добавить, редактировать или удалить диваны"
                icon={<Sofa className="w-6 h-6" />}
                onClick={() => handleSectionClick('sofas')}
                active
              />
              <AdminCard
                title="Баннеры"
                description="Управление баннерами и каруселью"
                icon={<Image className="w-6 h-6" />}
                onClick={() => handleSectionClick('banners')}
              />
              <AdminCard
                title="Переводы"
                description="Обновить текст для всех языков"
                icon={<FileText className="w-6 h-6" />}
                onClick={() => handleSectionClick('translations')}
              />
              <AdminCard
                title="Футер"
                description="Контактная информация и ссылки"
                icon={<Phone className="w-6 h-6" />}
                onClick={() => handleSectionClick('footer')}
              />
              <AdminCard
                title="Слоган"
                description="Обновить раздел слогана бренда"
                icon={<MessageSquare className="w-6 h-6" />}
                onClick={() => handleSectionClick('slogan')}
              />
            </div>
            <p className="text-muted-foreground text-center mt-12 text-sm">
              Разделы кроме "Диваны" находятся в разработке.
            </p>
          </>
        )}

        {activeSection === 'sofas' && <AdminSofasSection />}
      </div>
    </div>
  );
};

const AdminCard = ({
  title,
  description,
  icon,
  onClick,
  active,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-6 rounded-sm bg-card border transition-colors text-left flex gap-4 items-start ${
      active 
        ? 'border-foreground/50 hover:border-foreground' 
        : 'border-border hover:border-foreground/30 opacity-60'
    }`}
  >
    <div className="text-foreground/70">{icon}</div>
    <div>
      <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {!active && <span className="text-xs text-muted-foreground mt-2 block">(скоро)</span>}
    </div>
  </button>
);

export default AdminPage;
