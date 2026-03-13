# Code Summary - Unit 2: Next.js 統合・全ページ更新

## 生成ファイル一覧

### 新規作成（Client コンポーネント）
| ファイル | 役割 |
|---------|------|
| `src/app/[locale]/HomepageClient.tsx` | ホームページ Client Component（motion + translations） |
| `src/app/[locale]/works/WorksPageClient.tsx` | Works 一覧 Client Component（useState カテゴリフィルタ） |
| `src/app/[locale]/works/[slug]/WorkDetailClient.tsx` | Works 詳細 Client Component（motion + gallery） |
| `src/app/[locale]/about/AboutPageClient.tsx` | About Client Component（Sanity/i18n フォールバック対応） |
| `src/app/[locale]/contact/ContactPageClient.tsx` | Contact Client Component（フォーム + Sanity heading/desc） |

### 修正済み（Server Component ラッパーに変換）
| ファイル | 変更内容 |
|---------|---------|
| `src/app/[locale]/page.tsx` | async Server Component、`getFeaturedWorks()` 取得 |
| `src/app/[locale]/works/page.tsx` | async Server Component、`getAllWorks()` 取得 |
| `src/app/[locale]/works/[slug]/page.tsx` | async Server Component、`generateStaticParams()` 追加 |
| `src/app/[locale]/about/page.tsx` | async Server Component、`getAboutContent()` 取得 |
| `src/app/[locale]/contact/page.tsx` | async Server Component、`getContactContent()` 取得 |

### 修正済み（インポート更新）
| ファイル | 変更内容 |
|---------|---------|
| `src/components/WorkCard.tsx` | `Work` 型を `@/sanity/queries/work` から取得 |
| `src/components/WorkGrid.tsx` | `Work` 型を `@/sanity/queries/work` から取得 |
| `src/components/CategoryFilter.tsx` | `WorkCategory` 型を `@/sanity/queries/work` から取得 |

### 削除
| ファイル | 理由 |
|---------|------|
| `src/data/works.ts` | Sanity クエリに完全移行 |

## アーキテクチャパターン
- **Server Component**: Sanity API 呼び出し（`async/await`）
- **Client Component**: アニメーション（framer-motion）・状態管理（useState）・i18n フック（useTranslations）
- **フォールバック**: Sanity データなし時は i18n 翻訳で表示（About/Contact）

## 次のステップ（Unit 3: データ移行・Webhook 設定）
1. `npx sanity init` でプロジェクト作成（`sanity.config.ts` に `schemaTypes` を登録）
2. Sanity Studio を sanity.io にデプロイ
3. もねちゃんを Editor として招待
4. 既存 6 件のデータを Sanity に手動移行
5. Vercel に環境変数（`NEXT_PUBLIC_SANITY_PROJECT_ID` 等）を設定
6. Vercel Webhook で Sanity → 自動再デプロイを設定
