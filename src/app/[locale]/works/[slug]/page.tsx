import { notFound } from 'next/navigation';
import { getAllWorkSlugs, getWorkBySlug } from '@/sanity/queries/work';
import WorkDetailClient from './WorkDetailClient';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const work = await getWorkBySlug(params.slug);
  if (!work) notFound();

  const locale = (params.locale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <WorkDetailClient work={work} locale={locale} />;
}
