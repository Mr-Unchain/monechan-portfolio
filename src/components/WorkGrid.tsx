'use client';

import { motion } from 'framer-motion';
import type { Work } from '@/sanity/queries/work';
import WorkCard from './WorkCard';

interface WorkGridProps {
  works: Work[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function WorkGrid({ works }: WorkGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {works.map((work, index) => (
        <WorkCard key={`${work.slug}-${index}`} work={work} index={index} />
      ))}
    </motion.div>
  );
}
