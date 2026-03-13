import { getContactContent } from '@/sanity/queries/pageContent';
import ContactPageClient from './ContactPageClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Props) {
  const content = await getContactContent();
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <ContactPageClient content={content} locale={locale} />;
}
