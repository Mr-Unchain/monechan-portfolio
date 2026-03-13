'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AboutContent } from '@/sanity/queries/pageContent';

const skillCardVariants = {
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

const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

interface AboutPageClientProps {
  content: AboutContent | null;
  locale: 'ja' | 'en';
}

export default function AboutPageClient({ content, locale }: AboutPageClientProps) {
  const t = useTranslations('about');

  const profileName = content?.name?.[locale] ?? null;
  const profileBio = content?.bio?.[locale] ?? t('profileText');
  const skills = content?.skills ?? null;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-12">{t('title')}</h1>
        </motion.div>

        {/* Profile Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="w-48 h-48 relative rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 mx-auto md:mx-0"
            >
              {content?.profileImageUrl ? (
                <Image
                  src={content.profileImageUrl}
                  alt={profileName ?? 'Profile'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  M
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {profileName ?? t('profile')}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {profileBio}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold mb-8"
          >
            {t('skills')}
          </motion.h2>

          {skills ? (
            /* Sanity flat skills array → tag list */
            <motion.div
              variants={skillsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={skillCardVariants}
                  className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            /* Fallback: i18n-based 3-category grid */
            <motion.div
              variants={skillsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: t('skillDesign'), items: t('skillDesignItems') },
                { title: t('skillDevelopment'), items: t('skillDevelopmentItems') },
                { title: t('skillOther'), items: t('skillOtherItems') },
              ].map((skill) => (
                <motion.div
                  key={skill.title}
                  variants={skillCardVariants}
                  className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50"
                >
                  <h3 className="text-lg font-bold mb-3">{skill.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {skill.items}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
