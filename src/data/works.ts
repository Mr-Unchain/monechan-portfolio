export type WorkCategory = 'uiux' | 'web' | 'graphic';

export interface Work {
  slug: string;
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  category: WorkCategory;
  thumbnail: string;
  images: string[];
  role: {
    ja: string;
    en: string;
  };
  tools: string[];
  year: number;
  featured: boolean;
}

export const works: Work[] = [
  {
    slug: 'mobile-banking-app',
    title: {
      ja: 'モバイルバンキングアプリ',
      en: 'Mobile Banking App'
    },
    description: {
      ja: 'シンプルで使いやすいモバイルバンキングアプリのUI/UXデザイン。ユーザーリサーチから始め、直感的な操作性を実現しました。',
      en: 'UI/UX design for a simple and user-friendly mobile banking app. Starting from user research, we achieved intuitive operability.'
    },
    category: 'uiux',
    thumbnail: '/images/works/banking-thumb.svg',
    images: ['/images/works/banking-thumb.svg', '/images/works/banking-thumb.svg'],
    role: {
      ja: 'UI/UXデザイン',
      en: 'UI/UX Design'
    },
    tools: ['Figma', 'Protopie'],
    year: 2024,
    featured: true
  },
  {
    slug: 'cafe-website',
    title: {
      ja: 'カフェWebサイト',
      en: 'Cafe Website'
    },
    description: {
      ja: '地域密着型カフェのWebサイトリニューアル。温かみのあるデザインで、お店の雰囲気を表現しました。',
      en: 'Website renewal for a local cafe. Expressed the shop atmosphere with a warm design.'
    },
    category: 'web',
    thumbnail: '/images/works/cafe-thumb.svg',
    images: ['/images/works/cafe-thumb.svg', '/images/works/cafe-thumb.svg'],
    role: {
      ja: 'Webデザイン・コーディング',
      en: 'Web Design & Coding'
    },
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    year: 2024,
    featured: true
  },
  {
    slug: 'brand-identity',
    title: {
      ja: 'ブランドアイデンティティ',
      en: 'Brand Identity'
    },
    description: {
      ja: 'スタートアップ企業のブランドアイデンティティデザイン。ロゴ、名刺、封筒などを一貫したデザインで制作しました。',
      en: 'Brand identity design for a startup. Created logo, business cards, envelopes with consistent design.'
    },
    category: 'graphic',
    thumbnail: '/images/works/brand-thumb.svg',
    images: ['/images/works/brand-thumb.svg', '/images/works/brand-thumb.svg'],
    role: {
      ja: 'グラフィックデザイン',
      en: 'Graphic Design'
    },
    tools: ['Illustrator', 'Photoshop'],
    year: 2023,
    featured: true
  },
  {
    slug: 'fitness-app',
    title: {
      ja: 'フィットネスアプリ',
      en: 'Fitness App'
    },
    description: {
      ja: '健康管理とワークアウト記録ができるフィットネスアプリのデザイン。モチベーションを高めるUIを心がけました。',
      en: 'Design for a fitness app for health management and workout tracking. Focused on UI that boosts motivation.'
    },
    category: 'uiux',
    thumbnail: '/images/works/fitness-thumb.svg',
    images: ['/images/works/fitness-thumb.svg', '/images/works/fitness-thumb.svg'],
    role: {
      ja: 'UI/UXデザイン',
      en: 'UI/UX Design'
    },
    tools: ['Figma', 'Adobe XD'],
    year: 2023,
    featured: false
  },
  {
    slug: 'portfolio-template',
    title: {
      ja: 'ポートフォリオテンプレート',
      en: 'Portfolio Template'
    },
    description: {
      ja: 'クリエイター向けのポートフォリオテンプレート。カスタマイズしやすい設計を意識しました。',
      en: 'Portfolio template for creators. Designed with easy customization in mind.'
    },
    category: 'web',
    thumbnail: '/images/works/portfolio-thumb.svg',
    images: ['/images/works/portfolio-thumb.svg', '/images/works/portfolio-thumb.svg'],
    role: {
      ja: 'Webデザイン',
      en: 'Web Design'
    },
    tools: ['Figma', 'React', 'Tailwind CSS'],
    year: 2023,
    featured: false
  },
  {
    slug: 'event-poster',
    title: {
      ja: 'イベントポスター',
      en: 'Event Poster'
    },
    description: {
      ja: '音楽イベントのポスターデザイン。視覚的なインパクトと情報の伝わりやすさを両立させました。',
      en: 'Poster design for a music event. Balanced visual impact with clear information delivery.'
    },
    category: 'graphic',
    thumbnail: '/images/works/poster-thumb.svg',
    images: ['/images/works/poster-thumb.svg', '/images/works/poster-thumb.svg'],
    role: {
      ja: 'グラフィックデザイン',
      en: 'Graphic Design'
    },
    tools: ['Illustrator', 'Photoshop'],
    year: 2023,
    featured: false
  }
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find(work => work.slug === slug);
}

export function getWorksByCategory(category: WorkCategory): Work[] {
  return works.filter(work => work.category === category);
}

export function getFeaturedWorks(): Work[] {
  return works.filter(work => work.featured);
}
