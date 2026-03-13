'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Work } from '@/sanity/queries/work';

interface WorkCardProps {
  work: Work;
  index: number;
}

export default function WorkCard({ work, index }: WorkCardProps) {
  const locale = useLocale() as 'ja' | 'en';
  const t = useTranslations('works');

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link href={`/works/${work.slug}`} className="group block">
        {/* Number + category row */}
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-display text-5xl leading-none select-none text-neutral-200 dark:text-neutral-800">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
            {t(`categories.${work.category}`)}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={work.thumbnail}
            alt={work.title[locale]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-5 py-2 bg-white dark:bg-neutral-900 text-sm font-semibold tracking-wide">
              {t('viewProject')}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-base font-semibold group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
            {work.title[locale]}
          </h3>
          <span className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
