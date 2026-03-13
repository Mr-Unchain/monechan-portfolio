'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import WorkGrid from '@/components/WorkGrid';
import CategoryFilter from '@/components/CategoryFilter';
import type { Work, WorkCategory } from '@/sanity/queries/work';

interface WorksPageClientProps {
  initialWorks: Work[];
}

export default function WorksPageClient({ initialWorks }: WorksPageClientProps) {
  const t = useTranslations('works');
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'all'>('all');

  const filteredWorks = activeCategory === 'all'
    ? initialWorks
    : initialWorks.filter((work) => work.category === activeCategory);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        <WorkGrid works={filteredWorks} />
      </div>
    </div>
  );
}
