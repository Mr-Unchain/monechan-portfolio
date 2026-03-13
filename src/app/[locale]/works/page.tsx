import { getAllWorks } from '@/sanity/queries/work';
import WorksPageClient from './WorksPageClient';

export default async function WorksPage() {
  const works = await getAllWorks();
  return <WorksPageClient initialWorks={works} />;
}
