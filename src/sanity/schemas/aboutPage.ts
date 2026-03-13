import { defineField, defineType } from '@sanity/types';

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  // Singleton: prevent creating multiple documents
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'ja', title: '日本語', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        { name: 'ja', title: '日本語', type: 'text', rows: 6 },
        { name: 'en', title: 'English', type: 'text', rows: 6 },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
