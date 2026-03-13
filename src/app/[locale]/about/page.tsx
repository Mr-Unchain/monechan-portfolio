import { getAboutContent } from '@/sanity/queries/pageContent';
import AboutPageClient from './AboutPageClient';

interface Props {
  params: { locale: string };
}

export default async function AboutPage({ params }: Props) {
  const content = await getAboutContent();
  const locale = (params.locale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <AboutPageClient content={content} locale={locale} />;
}
