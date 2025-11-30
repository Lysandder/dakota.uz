export interface SofaImage {
  id: string;
  url: string;
  alt: string;
}

export interface SofaSpecSection {
  id: string;
  title: { ru: string; uz: string };
  specs: { key: { ru: string; uz: string }; value: { ru: string; uz: string } }[];
}

export interface Sofa {
  id: string;
  name: { ru: string; uz: string };
  price: number;
  salePrice?: number;
  onSale: boolean;
  images: SofaImage[];
  description: { ru: string; uz: string };
  specSections: SofaSpecSection[];
  comments?: { ru: string; uz: string };
}

export interface Banner {
  id: string;
  type: 'full-image' | 'split-content' | 'card-left' | 'promo';
  title: { ru: string; uz: string };
  subtitle?: { ru: string; uz: string };
  buttonText?: { ru: string; uz: string };
  buttonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  cardImage?: string;
}

export interface FooterData {
  instagram?: string;
  telegram?: string;
  email?: string;
  phone?: string;
  address?: { ru: string; uz: string };
}

export interface SloganData {
  title: { ru: string; uz: string };
  text: { ru: string; uz: string };
}

// Mock data
export const mockBanners: Banner[] = [
  {
    id: '1',
    type: 'full-image',
    title: { ru: 'Новая коллекция 2025', uz: '2025 yangi kolleksiya' },
    subtitle: { ru: 'Элегантность в каждой детали', uz: 'Har bir tafsilotda nafislik' },
    buttonText: { ru: 'Смотреть', uz: "Ko'rish" },
    buttonLink: '/sofas',
    backgroundImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
  },
  {
    id: '2',
    type: 'split-content',
    title: { ru: 'Комфорт премиум класса', uz: 'Premium sinf qulayligi' },
    subtitle: { ru: 'Создан для истинных ценителей', uz: 'Haqiqiy bilimdonlar uchun yaratilgan' },
    buttonText: { ru: 'Подробнее', uz: 'Batafsil' },
    buttonLink: '/sofas',
    cardImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    backgroundColor: '#471e14',
  },
];

export const mockSlogan: SloganData = {
  title: { ru: 'Искусство комфорта', uz: 'Qulaylik san\'ati' },
  text: {
    ru: 'Dakota — это философия безупречного стиля и непревзойденного комфорта. Каждый диван создается с любовью к деталям и стремлением к совершенству.',
    uz: 'Dakota — bu benuqson uslub va tengsiz qulaylik falsafasi. Har bir divan tafsilotlarga muhabbat va mukammallikka intilish bilan yaratilgan.',
  },
};

export const mockSofas: Sofa[] = [
  {
    id: '1',
    name: { ru: 'Модель Elegance', uz: 'Elegance modeli' },
    price: 15000000,
    salePrice: 12000000,
    onSale: true,
    images: [
      { id: '1a', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Elegance front' },
      { id: '1b', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Elegance side' },
      { id: '1c', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Elegance detail' },
    ],
    description: {
      ru: 'Диван Elegance воплощает в себе изысканность и комфорт. Идеальное сочетание классического дизайна и современных технологий.',
      uz: 'Elegance divani nafislik va qulaylikni o\'zida mujassam etgan. Klassik dizayn va zamonaviy texnologiyalarning mukammal uyg\'unligi.',
    },
    specSections: [
      {
        id: 's1',
        title: { ru: 'Размеры', uz: 'O\'lchamlari' },
        specs: [
          { key: { ru: 'Длина', uz: 'Uzunligi' }, value: { ru: '240 см', uz: '240 sm' } },
          { key: { ru: 'Глубина', uz: 'Chuqurligi' }, value: { ru: '95 см', uz: '95 sm' } },
          { key: { ru: 'Высота', uz: 'Balandligi' }, value: { ru: '85 см', uz: '85 sm' } },
        ],
      },
      {
        id: 's2',
        title: { ru: 'Материалы', uz: 'Materiallar' },
        specs: [
          { key: { ru: 'Обивка', uz: 'Qoplama' }, value: { ru: 'Итальянская кожа', uz: 'Italiya terisi' } },
          { key: { ru: 'Каркас', uz: 'Karkas' }, value: { ru: 'Массив дуба', uz: 'Eman massivi' } },
          { key: { ru: 'Механизм', uz: 'Mexanizm' }, value: { ru: 'Тик-так', uz: 'Tik-tak' } },
        ],
      },
    ],
    comments: {
      ru: 'Рекомендуется для просторных гостиных. Идеально сочетается с мраморными поверхностями и латунным декором.',
      uz: 'Keng zal xonalari uchun tavsiya etiladi. Marmar sirtlar va latun dekor bilan mukammal uyg\'unlashadi.',
    },
  },
  {
    id: '2',
    name: { ru: 'Модель Prestige', uz: 'Prestige modeli' },
    price: 18500000,
    onSale: false,
    images: [
      { id: '2a', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Prestige front' },
      { id: '2b', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Prestige side' },
    ],
    description: {
      ru: 'Prestige — это воплощение роскоши и безупречного вкуса. Для тех, кто ценит эксклюзивность.',
      uz: 'Prestige — hashamat va benuqson didning mujassami. Eksklyuzivlikni qadirlaganlar uchun.',
    },
    specSections: [
      {
        id: 's1',
        title: { ru: 'Размеры', uz: 'O\'lchamlari' },
        specs: [
          { key: { ru: 'Длина', uz: 'Uzunligi' }, value: { ru: '280 см', uz: '280 sm' } },
          { key: { ru: 'Глубина', uz: 'Chuqurligi' }, value: { ru: '100 см', uz: '100 sm' } },
        ],
      },
    ],
  },
  {
    id: '3',
    name: { ru: 'Модель Harmony', uz: 'Harmony modeli' },
    price: 12000000,
    salePrice: 9500000,
    onSale: true,
    images: [
      { id: '3a', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Harmony front' },
      { id: '3b', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Harmony side' },
      { id: '3c', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Harmony angle' },
    ],
    description: {
      ru: 'Harmony создан для гармоничного сочетания стиля и функциональности.',
      uz: 'Harmony uslub va funksionallikning uyg\'un uyg\'unligini yaratish uchun yaratilgan.',
    },
    specSections: [],
  },
  {
    id: '4',
    name: { ru: 'Модель Royal', uz: 'Royal modeli' },
    price: 22000000,
    onSale: false,
    images: [
      { id: '4a', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', alt: 'Royal front' },
    ],
    description: {
      ru: 'Royal — королевский комфорт для вашего дома.',
      uz: 'Royal — uyingiz uchun qirollik qulayligi.',
    },
    specSections: [],
  },
  {
    id: '5',
    name: { ru: 'Модель Classic', uz: 'Classic modeli' },
    price: 14500000,
    onSale: false,
    images: [
      { id: '5a', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', alt: 'Classic front' },
      { id: '5b', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Classic side' },
    ],
    description: {
      ru: 'Classic — вечная классика в современном исполнении.',
      uz: 'Classic — zamonaviy talqinda abadiy klassika.',
    },
    specSections: [],
  },
  {
    id: '6',
    name: { ru: 'Модель Velvet', uz: 'Velvet modeli' },
    price: 16000000,
    onSale: false,
    images: [
      { id: '6a', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Velvet front' },
    ],
    description: {
      ru: 'Velvet — бархатная роскошь для ценителей.',
      uz: 'Velvet — bilimdonlar uchun baxmal hashamati.',
    },
    specSections: [],
  },
];

export const mockFooter: FooterData = {
  instagram: 'https://instagram.com/dakota_sofas',
  telegram: 'https://t.me/dakota_sofas',
  email: 'info@dakota.uz',
  phone: '+998 71 123 45 67',
  address: {
    ru: 'г. Ташкент, ул. Амира Темура, 100',
    uz: 'Toshkent sh., Amir Temur ko\'chasi, 100',
  },
};
