import { getAboutContent } from '@/sanity/queries/pageContent';
import AboutPageClient from './AboutPageClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const content = await getAboutContent();
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <AboutPageClient content={content} locale={locale} />;
}
