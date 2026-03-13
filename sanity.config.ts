import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'monechan-portfolio',
  title: 'もねちゃんポートフォリオ',

  projectId: 'hxew7m27',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), // GROQ クエリをブラウザ上でテスト可能
  ],

  schema: {
    types: schemaTypes,
  },
});
