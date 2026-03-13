/**
 * データ移行スクリプト: 既存6件の作品データを Sanity にインポートする
 *
 * 実行方法:
 *   npx ts-node --project tsconfig.json scripts/migrate-to-sanity.ts
 *
 * 事前準備:
 *   1. .env.local に NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN を設定
 *   2. SANITY_API_TOKEN は Editor 以上の書き込み権限が必要
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const works = [
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'mobile-banking-app' },
    title: { ja: 'モバイルバンキングアプリ', en: 'Mobile Banking App' },
    description: {
      ja: 'シンプルで使いやすいモバイルバンキングアプリのUI/UXデザイン。ユーザーリサーチから始め、直感的な操作性を実現しました。',
      en: 'UI/UX design for a simple and user-friendly mobile banking app. Starting from user research, we achieved intuitive operability.',
    },
    category: 'uiux',
    role: { ja: 'UI/UXデザイン', en: 'UI/UX Design' },
    tools: ['Figma', 'Protopie'],
    year: 2024,
    featured: true,
  },
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'cafe-website' },
    title: { ja: 'カフェWebサイト', en: 'Cafe Website' },
    description: {
      ja: '地域密着型カフェのWebサイトリニューアル。温かみのあるデザインで、お店の雰囲気を表現しました。',
      en: 'Website renewal for a local cafe. Expressed the shop atmosphere with a warm design.',
    },
    category: 'web',
    role: { ja: 'Webデザイン・コーディング', en: 'Web Design & Coding' },
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    year: 2024,
    featured: true,
  },
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'brand-identity' },
    title: { ja: 'ブランドアイデンティティ', en: 'Brand Identity' },
    description: {
      ja: 'スタートアップ企業のブランドアイデンティティデザイン。ロゴ、名刺、封筒などを一貫したデザインで制作しました。',
      en: 'Brand identity design for a startup. Created logo, business cards, envelopes with consistent design.',
    },
    category: 'graphic',
    role: { ja: 'グラフィックデザイン', en: 'Graphic Design' },
    tools: ['Illustrator', 'Photoshop'],
    year: 2023,
    featured: true,
  },
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'fitness-app' },
    title: { ja: 'フィットネスアプリ', en: 'Fitness App' },
    description: {
      ja: '健康管理とワークアウト記録ができるフィットネスアプリのデザイン。モチベーションを高めるUIを心がけました。',
      en: 'Design for a fitness app for health management and workout tracking. Focused on UI that boosts motivation.',
    },
    category: 'uiux',
    role: { ja: 'UI/UXデザイン', en: 'UI/UX Design' },
    tools: ['Figma', 'Adobe XD'],
    year: 2023,
    featured: false,
  },
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'portfolio-template' },
    title: { ja: 'ポートフォリオテンプレート', en: 'Portfolio Template' },
    description: {
      ja: 'クリエイター向けのポートフォリオテンプレート。カスタマイズしやすい設計を意識しました。',
      en: 'Portfolio template for creators. Designed with easy customization in mind.',
    },
    category: 'web',
    role: { ja: 'Webデザイン', en: 'Web Design' },
    tools: ['Figma', 'React', 'Tailwind CSS'],
    year: 2023,
    featured: false,
  },
  {
    _type: 'work',
    slug: { _type: 'slug', current: 'event-poster' },
    title: { ja: 'イベントポスター', en: 'Event Poster' },
    description: {
      ja: '音楽イベントのポスターデザイン。視覚的なインパクトと情報の伝わりやすさを両立させました。',
      en: 'Poster design for a music event. Balanced visual impact with clear information delivery.',
    },
    category: 'graphic',
    role: { ja: 'グラフィックデザイン', en: 'Graphic Design' },
    tools: ['Illustrator', 'Photoshop'],
    year: 2023,
    featured: false,
  },
];

async function migrate() {
  console.log(`Migrating ${works.length} works to Sanity...`);
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}\n`);

  for (const work of works) {
    try {
      const result = await client.create(work);
      console.log(`✓ Created: ${work.title.ja} (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: ${work.title.ja}`, err);
    }
  }

  console.log('\nMigration complete!');
  console.log('Next: Upload thumbnail images via Sanity Studio.');
}

migrate().catch(console.error);
