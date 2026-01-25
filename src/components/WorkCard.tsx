'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Work } from '@/data/works';

interface WorkCardProps {
  work: Work;
  index?: number;
}

export default function WorkCard({ work, index = 0 }: WorkCardProps) {
  const locale = useLocale() as 'ja' | 'en';
  const t = useTranslations('works');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/works/${work.slug}`} className="group block">
        <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={work.thumbnail}
            alt={work.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 bg-white dark:bg-neutral-900 rounded-full text-sm font-medium">
              {t('viewProject')}
            </span>
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {t(`categories.${work.category}`)}
          </span>
          <h3 className="mt-1 text-lg font-medium group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {work.title[locale]}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
