# Code Summary - Unit 1: Sanity セットアップ・スキーマ定義

## 生成ファイル一覧

### 新規作成
| ファイル | 役割 |
|---------|------|
| `src/sanity/client.ts` | Sanity クライアント・`urlFor` 画像URLビルダー |
| `src/sanity/schemas/work.ts` | Work ドキュメントスキーマ（slug readOnly） |
| `src/sanity/schemas/aboutPage.ts` | AboutPage シングルトンスキーマ |
| `src/sanity/schemas/contactPage.ts` | ContactPage シングルトンスキーマ |
| `src/sanity/schemas/index.ts` | スキーマレジストリ（全スキーマをまとめてエクスポート） |
| `src/sanity/queries/work.ts` | Work GROQ クエリ・`Work` 型定義 |
| `src/sanity/queries/pageContent.ts` | About/Contact GROQ クエリ・型定義 |
| `.env.local.example` | 環境変数テンプレート |

### 変更ファイル
| ファイル | 変更内容 |
|---------|---------|
| `package.json` | `@sanity/client`, `@sanity/image-url` 追加 |

## 注意点
- `next-sanity@12` は Next.js 14 と非互換のため、`@sanity/client` を直接使用
- slug は `readOnly: true` で変更不可（要件 FR-07 / BR-10）
- AboutPage・ContactPage はシングルトン（`__experimental_actions` で新規作成を制限）
- 画像は Sanity Image CDN 経由のため URL 期限切れなし

## 次のステップ（Unit 2: Sanity Studio セットアップ）
1. `npx sanity init` で Sanity プロジェクト作成
2. `sanity.config.ts` に `schemaTypes` を登録
3. Sanity Studio を sanity.io にデプロイ（管理画面の外部化）
4. 既存 6 件のデータを Sanity に移行
