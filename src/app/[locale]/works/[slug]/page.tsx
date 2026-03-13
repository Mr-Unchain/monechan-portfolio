import { notFound } from 'next/navigation';
import { getAllWorkSlugs, getWorkBySlug } from '@/sanity/queries/work';
import WorkDetailClient from './WorkDetailClient';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const locale = (rawLocale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <WorkDetailClient work={work} locale={locale} />;
}
