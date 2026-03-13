# Code Generation Plan - Unit 2: Next.js 統合・全ページ更新

## ユニット概要
- **対象**: 全ページを Sanity データ取得に切り替え、`src/data/works.ts` を削除
- **要件カバレッジ**: FR-01〜06, BR-09〜11
- **依存**: Unit 1 完了済み（`src/sanity/` モジュール利用可能）
- **パターン**: Server Component ラッパー + Client Component（既存アニメーション・状態管理を維持）

## 生成場所
- アプリケーションコード: `src/app/[locale]/`
- 新規 Client コンポーネント: `src/app/[locale]/*/` 配下

---

## 実行ステップ

### Step 1: WorksPageClient.tsx 作成
- [x] `src/app/[locale]/works/WorksPageClient.tsx` を新規作成
  - 既存 `works/page.tsx` の全ロジックを移植
  - `initialWorks: Work[]` を props で受け取る（`useState` はそのまま維持）
  - `'use client'` ディレクティブ

### Step 2: works/page.tsx を Server Component に更新
- [x] `src/app/[locale]/works/page.tsx` を修正（in-place）
  - `'use client'` 削除、`async` 関数に変更
  - `getAllWorks()` を呼び出してデータ取得
  - `WorksPageClient` に `initialWorks` を渡すだけのラッパーに変更

### Step 3: WorkDetailClient.tsx 作成
- [x] `src/app/[locale]/works/[slug]/WorkDetailClient.tsx` を新規作成
  - 既存 `[slug]/page.tsx` の全ロジックを移植
  - `work: Work, locale: string` を props で受け取る
  - `useParams`, `useLocale` フックを削除（props に変更）
  - `'use client'` ディレクティブ

### Step 4: works/[slug]/page.tsx を Server Component に更新
- [x] `src/app/[locale]/works/[slug]/page.tsx` を修正（in-place）
  - `'use client'` 削除、`async` 関数に変更
  - `generateStaticParams()` 追加（`getAllWorkSlugs()` 使用）
  - `getWorkBySlug(params.slug)` でデータ取得
  - `notFound()` ガード
  - `WorkDetailClient` に `work` と `locale` を渡すラッパーに変更

### Step 5: HomepageClient.tsx 作成
- [x] `src/app/[locale]/HomepageClient.tsx` を新規作成
  - 既存 `page.tsx` の全ロジックを移植
  - `featuredWorks: Work[]` を props で受け取る
  - `'use client'` ディレクティブ

### Step 6: [locale]/page.tsx を Server Component に更新
- [x] `src/app/[locale]/page.tsx` を修正（in-place）
  - `'use client'` 削除、`async` 関数に変更
  - `getFeaturedWorks()` でデータ取得
  - `HomepageClient` に `featuredWorks` を渡すラッパーに変更

### Step 7: AboutPageClient.tsx 作成
- [x] `src/app/[locale]/about/AboutPageClient.tsx` を新規作成
  - 既存 `about/page.tsx` の構造を移植
  - `content: AboutContent | null, locale: string` を props で受け取る
  - Sanity の `bio`・`name`・`skills`（flat array）を表示
  - スキルセクションは flat タグリストに変更（スキーマが flat array のため）
  - `'use client'` ディレクティブ

### Step 8: about/page.tsx を Server Component に更新
- [x] `src/app/[locale]/about/page.tsx` を修正（in-place）
  - `'use client'` 削除、`async` 関数に変更
  - `getAboutContent()` でデータ取得
  - `AboutPageClient` に `content` と `locale` を渡すラッパーに変更

### Step 9: ContactPageClient.tsx 作成
- [x] `src/app/[locale]/contact/ContactPageClient.tsx` を新規作成
  - 既存 `contact/page.tsx` のフォームロジックを移植
  - `content: ContactContent | null, locale: string` を props で受け取る
  - heading/description を Sanity から表示
  - `'use client'` ディレクティブ

### Step 10: contact/page.tsx を Server Component に更新
- [x] `src/app/[locale]/contact/page.tsx` を修正（in-place）
  - `'use client'` 削除、`async` 関数に変更
  - `getContactContent()` でデータ取得
  - `ContactPageClient` に `content` と `locale` を渡すラッパーに変更

### Step 11: src/data/works.ts 削除
- [x] `src/data/works.ts` を削除
  - Unit 1 の Sanity クエリで完全に代替済み

### Step 12: コードサマリー作成
- [x] `aidlc-docs/construction/unit2-nextjs-integration/code/summary.md` を新規作成

---

## 要件トレーサビリティ
| ステップ | カバー要件 |
|---------|-----------|
| Step 1〜2 | FR-01, FR-05, BR-09〜11 |
| Step 3〜4 | FR-01, FR-05, FR-06 |
| Step 5〜6 | FR-01, FR-05 |
| Step 7〜8 | FR-02, FR-05 |
| Step 9〜10 | FR-03, FR-05 |
| Step 11 | FR-05（旧データソース削除） |
