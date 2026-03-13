'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Work } from '@/sanity/queries/work';

const galleryImageVariants = {
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

const galleryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

interface WorkDetailClientProps {
  work: Work;
  locale: 'ja' | 'en';
}

export default function WorkDetailClient({ work, locale }: WorkDetailClientProps) {
  const t = useTranslations('workDetail');
  const tWorks = useTranslations('works');

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video mb-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
        >
          {work.thumbnail && (
            <Image
              src={work.thumbnail}
              alt={work.title[locale]}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{t('overview')}</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {work.description[locale]}
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          variants={galleryContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {work.images.filter(Boolean).map((image, index) => (
            <motion.div
              key={index}
              variants={galleryImageVariants}
              className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <Image
                src={image}
                alt={`${work.title[locale]} ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
