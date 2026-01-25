'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { WorkCategory } from '@/data/works';

interface CategoryFilterProps {
  activeCategory: WorkCategory | 'all';
  onCategoryChange: (category: WorkCategory | 'all') => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const t = useTranslations('works');

  const categories: (WorkCategory | 'all')[] = ['all', 'uiux', 'web', 'graphic'];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeCategory === category
              ? 'text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${activeCategory === category ? 'text-white dark:text-neutral-900' : ''}`}>
            {category === 'all' ? t('all') : t(`categories.${category}`)}
          </span>
        </button>
      ))}
    </div>
  );
}
