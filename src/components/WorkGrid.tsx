'use client';

import type { Work } from '@/data/works';
import WorkCard from './WorkCard';

interface WorkGridProps {
  works: Work[];
}

export default function WorkGrid({ works }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {works.map((work, index) => (
        <WorkCard key={work.slug} work={work} index={index} />
      ))}
    </div>
  );
}
