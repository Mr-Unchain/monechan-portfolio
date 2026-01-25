'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getWorkBySlug } from '@/data/works';
import { notFound } from 'next/navigation';

export default function WorkDetailPage() {
  const params = useParams();
  const locale = useLocale() as 'ja' | 'en';
  const t = useTranslations('workDetail');
  const tWorks = useTranslations('works');

  const work = getWorkBySlug(params.slug as string);

  if (!work) {
    notFound();
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/works"
            className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white mb-8 transition-colors"
          >
            ← {t('backToWorks')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {tWorks(`categories.${work.category}`)}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-8">{work.title[locale]}</h1>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video mb-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
        >
          <Image
            src={work.thumbnail}
            alt={work.title[locale]}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              {t('role')}
            </h3>
            <p className="font-medium">{work.role[locale]}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              {t('tools')}
            </h3>
            <p className="font-medium">{work.tools.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
              {t('year')}
            </h3>
            <p className="font-medium">{work.year}</p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{t('overview')}</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {work.description[locale]}
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          {work.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <Image
                src={image}
                alt={`${work.title[locale]} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
