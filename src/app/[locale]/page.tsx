'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import HeroSection from '@/components/HeroSection';
import WorkGrid from '@/components/WorkGrid';
import { getFeaturedWorks } from '@/data/works';

export default function HomePage() {
  const t = useTranslations('home');
  const featuredWorks = getFeaturedWorks();

  return (
    <div>
      <HeroSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl font-bold">{t('featuredWorks')}</h2>
            <Link
              href="/works"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              {t('viewAll')} →
            </Link>
          </motion.div>

          <WorkGrid works={featuredWorks} />
        </div>
      </section>
    </div>
  );
}
