import { getFeaturedWorks } from '@/sanity/queries/work';
import HomepageClient from './HomepageClient';

export default async function HomePage() {
  const featuredWorks = await getFeaturedWorks();
  return <HomepageClient featuredWorks={featuredWorks} />;
}
