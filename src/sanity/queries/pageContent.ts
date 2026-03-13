import { client, urlFor } from '../client';

export interface AboutContent {
  name: { ja: string; en: string };
  bio: { ja: string; en: string };
  skills: string[];
  profileImageUrl: string | null;
}

export interface ContactContent {
  heading: { ja: string; en: string };
  description: { ja: string; en: string };
  email: string;
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const raw = await client.fetch(
    `*[_type == "aboutPage"][0] { name, bio, skills, profileImage }`
  );
  if (!raw) return null;
  return {
    name: raw.name ?? { ja: '', en: '' },
    bio: raw.bio ?? { ja: '', en: '' },
    skills: raw.skills ?? [],
    profileImageUrl: raw.profileImage ? urlFor(raw.profileImage).width(400).url() : null,
  };
}

export async function getContactContent(): Promise<ContactContent | null> {
  return client.fetch(
    `*[_type == "contactPage"][0] { heading, description, email }`
  );
}
