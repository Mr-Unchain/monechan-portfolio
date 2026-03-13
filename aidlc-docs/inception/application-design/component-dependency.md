# Component Dependency

## 依存関係マトリクス

| コンポーネント | 依存先 | 依存元 |
|--------------|--------|--------|
| `src/sanity/client.ts` | `@sanity/client`, `next-sanity` | queries/work.ts, queries/pageContent.ts |
| `src/sanity/queries/work.ts` | client.ts | HomePage, WorksPage, WorkDetailPage |
| `src/sanity/queries/pageContent.ts` | client.ts | AboutPage, ContactPage |
| `src/sanity/schemas/work.ts` | Sanity Studio 設定 | Sanity Studio のみ |
| `src/sanity/schemas/aboutPage.ts` | Sanity Studio 設定 | Sanity Studio のみ |
| `src/sanity/schemas/contactPage.ts` | Sanity Studio 設定 | Sanity Studio のみ |
| `HomePage` | queries/work.ts, WorkGrid | なし |
| `WorksPage` | queries/work.ts, WorkGrid, CategoryFilter | なし |
| `WorkDetailPage` | queries/work.ts, next/image | なし |
| `AboutPage` | queries/pageContent.ts | なし |
| `ContactPage` | queries/pageContent.ts | なし |
| `WorkGrid` | WorkCard | HomePage, WorksPage |
| `WorkCard` | next/image, next-intl | WorkGrid |

---

## データフロー図

```
[Sanity Studio]
      |
      | GROQ
      v
[src/sanity/client.ts]
      |
      +---> [queries/work.ts]
      |           |
      |           +---> getAllWorks()        ---> [WorksPage]  ---> [WorkGrid] ---> [WorkCard]
      |           +---> getFeaturedWorks()   ---> [HomePage]   ---> [WorkGrid] ---> [WorkCard]
      |           +---> getWorkBySlug()      ---> [WorkDetailPage]
      |           +---> getAllWorkSlugs()    ---> generateStaticParams()
      |
      +---> [queries/pageContent.ts]
                  |
                  +---> getAboutContent()    ---> [AboutPage]
                  +---> getContactContent()  ---> [ContactPage]
```

---

## ディレクトリ構造（新規）

```
src/
  sanity/
    client.ts              ← Sanity クライアント設定
    schemas/
      index.ts             ← スキーマ一覧エクスポート
      work.ts              ← Work スキーマ
      aboutPage.ts         ← AboutPage スキーマ
      contactPage.ts       ← ContactPage スキーマ
    queries/
      work.ts              ← Work GROQ クエリ & 型定義
      pageContent.ts       ← About/Contact GROQ クエリ & 型定義
  types/
    sanity.ts              ← Sanity 共通型定義（SanityImageAsset 等）
```
