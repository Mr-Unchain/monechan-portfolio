import { getContactContent } from '@/sanity/queries/pageContent';
import ContactPageClient from './ContactPageClient';

interface Props {
  params: { locale: string };
}

export default async function ContactPage({ params }: Props) {
  const content = await getContactContent();
  const locale = (params.locale === 'en' ? 'en' : 'ja') as 'ja' | 'en';
  return <ContactPageClient content={content} locale={locale} />;
}
