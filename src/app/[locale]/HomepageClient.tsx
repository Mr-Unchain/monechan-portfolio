'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import HeroSection from '@/components/HeroSection';
import WorkGrid from '@/components/WorkGrid';
import type { Work } from '@/sanity/queries/work';

interface HomepageClientProps {
  featuredWorks: Work[];
}

export default function HomepageClient({ featuredWorks }: HomepageClientProps) {
  const t = useTranslations('home');

  return (
    <div>
      <HeroSection />

      <section className="py-20 px-8 sm:px-14 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-2">Selected</p>
              <h2 className="font-display text-5xl sm:text-6xl leading-none">{t('featuredWorks')}</h2>
            </div>
            <Link
              href="/works"
              className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors pb-1"
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
