# Application Design（統合ドキュメント）

## 概要

`src/data/works.ts` の静的データを Sanity CMS に移行し、もねちゃんが Sanity Studio から Works・About・Contact を編集できるようにするための設計。

---

## 新規モジュール: `src/sanity/`

### ファイル構成
```
src/sanity/
  client.ts              ← @sanity/client 設定
  schemas/
    index.ts             ← スキーマ登録
    work.ts              ← Work コンテンツタイプ
    aboutPage.ts         ← AboutPage コンテンツタイプ（シングルトン）
    contactPage.ts       ← ContactPage コンテンツタイプ（シングルトン）
  queries/
    work.ts              ← Work GROQ クエリ + TypeScript 型
    pageContent.ts       ← About/Contact GROQ クエリ + TypeScript 型
```

---

## コンテンツタイプ設計

### Work（複数）
```
slug        [readOnly]  →  URL識別子
title       {ja, en}    →  タイトル
description {ja, en}    →  説明文（プレーンテキスト）
category    [list]      →  uiux / web / graphic
thumbnail   [image]     →  サムネイル（Sanity CDN）
images      [image[]]   →  ギャラリー（Sanity CDN）
role        {ja, en}    →  担当役割
tools       [string[]]  →  使用ツール
year        [number]    →  制作年
featured    [boolean]   →  トップページ掲載フラグ
```

### AboutPage（シングルトン）
```
name          {ja, en}   →  名前
bio           {ja, en}   →  自己紹介文
skills        [string[]] →  スキル一覧
profileImage  [image?]   →  プロフィール画像（任意）
```

### ContactPage（シングルトン）
```
heading     {ja, en}  →  見出し
description {ja, en}  →  説明文
email       [string]  →  連絡先メールアドレス
```

---

## サービス層設計

### データ取得（Server Component）
各ページは Server Component として動作し、Sanity から直接データを取得する。

```
HomePage         → getFeaturedWorks()
WorksPage        → getAllWorks()
WorkDetailPage   → getWorkBySlug(slug) + generateStaticParams(getAllWorkSlugs)
AboutPage        → getAboutContent()
ContactPage      → getContactContent()
```

### 自動反映（ISR + Webhook）
```
Sanity Studio 保存
  → Sanity Webhook
  → Vercel On-demand Revalidation
  → 数分以内にサイト更新
```

---

## 既存コードへの影響

| ファイル | 変更種別 | 内容 |
|---------|---------|------|
| `src/data/works.ts` | 削除 | Sanity クエリに完全置換 |
| `src/app/[locale]/page.tsx` | 変更 | Server Component 化 + Sanity データ取得 |
| `src/app/[locale]/works/page.tsx` | 変更 | Server Component 化 + Sanity データ取得 |
| `src/app/[locale]/works/[slug]/page.tsx` | 変更 | Server Component 化 + `generateStaticParams` 追加 |
| `src/app/[locale]/about/page.tsx` | 変更 | Sanity データ取得追加 |
| `src/app/[locale]/contact/page.tsx` | 変更 | Sanity データ取得追加 |
| `package.json` | 変更 | `@sanity/client`, `@sanity/image-url`, `next-sanity` 追加 |
| `.env.local` | 新規 | Sanity 環境変数 |

---

## 実装ユニット

| Unit | 内容 |
|------|------|
| **Unit 1** | Sanity プロジェクト初期化・スキーマ定義・クライアント設定 |
| **Unit 2** | Next.js ページ・コンポーネントの Sanity 統合（全ページ更新） |
| **Unit 3** | 既存6件データ移行スクリプト・Vercel Webhook 設定 |
