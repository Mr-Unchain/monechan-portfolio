'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('about');

  const skills = [
    {
      title: t('skillDesign'),
      items: t('skillDesignItems'),
    },
    {
      title: t('skillDevelopment'),
      items: t('skillDevelopmentItems'),
    },
    {
      title: t('skillOther'),
      items: t('skillOtherItems'),
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-12">{t('title')}</h1>
        </motion.div>

        {/* Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                M
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('profile')}</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t('profileText')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-8">{t('skills')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50"
              >
                <h3 className="text-lg font-bold mb-3">{skill.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {skill.items}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
