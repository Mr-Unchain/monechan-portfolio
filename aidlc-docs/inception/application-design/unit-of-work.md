# Unit of Work

## Unit 1: Sanity セットアップ・スキーマ定義

**目的**: Sanity プロジェクトを初期化し、コンテンツタイプのスキーマを定義する

**責務**:
- Sanity CLI でプロジェクト作成（`development` / `production` データセット）
- `@sanity/client`, `@sanity/image-url`, `next-sanity` パッケージインストール
- `src/sanity/client.ts` 実装（Sanity クライアント設定）
- `src/sanity/schemas/work.ts` 実装（Work スキーマ定義・slug readOnly）
- `src/sanity/schemas/aboutPage.ts` 実装（AboutPage シングルトン）
- `src/sanity/schemas/contactPage.ts` 実装（ContactPage シングルトン）
- `src/sanity/schemas/index.ts` 実装（スキーマ登録）
- `src/sanity/queries/work.ts` 実装（GROQ クエリ + Work 型定義）
- `src/sanity/queries/pageContent.ts` 実装（About/Contact GROQ クエリ + 型定義）
- `.env.local` 環境変数設定

**成果物**:
- `src/sanity/` モジュール一式
- `.env.local`（テンプレート）
- Sanity Studio 上のスキーマ設定

**完了条件**:
- `npx sanity dev` で Studio が起動できる
- Work・AboutPage・ContactPage のコンテンツタイプが Studio に表示される
- GROQ クエリが Sanity Vision で実行できる

---

## Unit 2: Next.js 統合・全ページ更新

**目的**: 全ページを Sanity データ取得に切り替える

**責務**:
- `src/app/[locale]/page.tsx` → Server Component 化 + `getFeaturedWorks()` 使用
- `src/app/[locale]/works/page.tsx` → Server Component 化 + `getAllWorks()` 使用
- `src/app/[locale]/works/[slug]/page.tsx` → Server Component 化 + `getWorkBySlug()` + `generateStaticParams()` 追加
- `src/app/[locale]/about/page.tsx` → `getAboutContent()` でデータ取得
- `src/app/[locale]/contact/page.tsx` → `getContactContent()` でデータ取得
- `src/data/works.ts` 削除
- `src/components/WorkCard.tsx` の画像参照を Sanity Image CDN URL に対応

**成果物**:
- 更新済みページファイル一式
- `src/data/works.ts` 削除

**完了条件**:
- `npm run dev` でサイトが起動し、全ページが Sanity データで表示される
- Works 一覧・詳細・トップページが正しく動作する
- About・Contact ページが Sanity コンテンツを表示する

---

## Unit 3: データ移行・Webhook 設定

**目的**: 既存6件のデータを Sanity に移行し、自動デプロイを設定する

**責務**:
- 既存6件の作品データを Sanity `production` データセットに手動または スクリプトで移行
- Vercel → Sanity Webhook 設定（On-demand Revalidation）
- Vercel 本番環境変数設定
- もねちゃんへの Editor 権限付与

**成果物**:
- Sanity production データセットに移行済みデータ（6件）
- Vercel Webhook 設定完了
- もねちゃんの Sanity アカウント設定

**完了条件**:
- 本番サイトで6件の作品が表示される
- もねちゃんが Studio でコンテンツを保存すると数分以内にサイトに反映される
