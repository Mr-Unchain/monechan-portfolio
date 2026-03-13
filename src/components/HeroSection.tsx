'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';

const MARQUEE_TEXT = 'DESIGN · UI/UX · DEVELOPMENT · CREATIVE · ';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tNav = useTranslations('navigation');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Vertical "PORTFOLIO" label on right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10 hidden lg:flex">
        <div className="w-px h-16 bg-neutral-300 dark:bg-neutral-700" />
        <span
          className="font-display text-xs tracking-[0.4em] text-neutral-400 dark:text-neutral-600"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          PORTFOLIO
        </span>
        <div className="w-px h-16 bg-neutral-300 dark:bg-neutral-700" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center px-8 sm:px-14 lg:px-20 pt-8">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="w-full"
        >
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-10 h-px bg-neutral-900 dark:bg-white" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
              {t('subtitle')}
            </span>
          </motion.div>

          {/* Giant display title */}
          <div className="overflow-hidden leading-none">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-stroke"
              style={{ fontSize: 'clamp(72px, 14vw, 200px)' }}
            >
              MONE
            </motion.div>
          </div>
          <div className="overflow-hidden leading-none">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              className="font-display"
              style={{ fontSize: 'clamp(72px, 14vw, 200px)' }}
            >
              CHAN.
            </motion.div>
          </div>

          {/* Description + buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 max-w-4xl"
          >
            <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-xs leading-relaxed">
              {t('description')}
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/works"
                className="px-7 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold tracking-wide hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors"
              >
                {tNav('works')}
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 border border-neutral-900 dark:border-white text-sm font-semibold tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {tNav('contact')}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[MARQUEE_TEXT, MARQUEE_TEXT, MARQUEE_TEXT, MARQUEE_TEXT].map((text, i) => (
            <span
              key={i}
              className="font-display text-lg tracking-widest text-neutral-300 dark:text-neutral-700"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
