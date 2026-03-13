import { client, urlFor } from '../client';

export type WorkCategory = 'uiux' | 'web' | 'graphic';

export interface SanityWork {
  _id: string;
  slug: { current: string };
  title: { ja: string; en: string };
  description: { ja: string; en: string };
  category: WorkCategory;
  thumbnail: { asset: { _ref: string } };
  images: Array<{ asset: { _ref: string } }>;
  role: { ja: string; en: string };
  tools: string[];
  year: number;
  featured: boolean;
}

// Normalised Work type — mirrors the existing Work interface from src/data/works.ts
export interface Work {
  slug: string;
  title: { ja: string; en: string };
  description: { ja: string; en: string };
  category: WorkCategory;
  thumbnail: string;
  images: string[];
  role: { ja: string; en: string };
  tools: string[];
  year: number;
  featured: boolean;
}

function toWork(raw: SanityWork): Work {
  return {
    slug: raw.slug.current,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    thumbnail: raw.thumbnail ? urlFor(raw.thumbnail).width(800).url() : '',
    images: (raw.images ?? []).map((img) => urlFor(img).width(1200).url()),
    role: raw.role,
    tools: raw.tools ?? [],
    year: raw.year,
    featured: raw.featured ?? false,
  };
}

const WORK_FIELDS = `
  _id,
  slug,
  title,
  description,
  category,
  thumbnail,
  images,
  role,
  tools,
  year,
  featured
`;

export async function getAllWorks(): Promise<Work[]> {
  const raw: SanityWork[] = await client.fetch(
    `*[_type == "work"] | order(year desc) { ${WORK_FIELDS} }`
  );
  return raw.map(toWork);
}

export async function getFeaturedWorks(): Promise<Work[]> {
  const raw: SanityWork[] = await client.fetch(
    `*[_type == "work" && featured == true] | order(year desc) { ${WORK_FIELDS} }`
  );
  return raw.map(toWork);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const raw: SanityWork | null = await client.fetch(
    `*[_type == "work" && slug.current == $slug][0] { ${WORK_FIELDS} }`,
    { slug }
  );
  return raw ? toWork(raw) : null;
}

export async function getAllWorkSlugs(): Promise<string[]> {
  const results: Array<{ slug: { current: string } }> = await client.fetch(
    `*[_type == "work"] { slug }`
  );
  return results.map((r) => r.slug.current);
}
