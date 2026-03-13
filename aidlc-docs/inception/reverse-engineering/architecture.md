# System Architecture

## System Overview

Next.js 14 (App Router) をベースにしたポートフォリオサイト。
現在はコンテンツ（作品データ）が `src/data/works.ts` にハードコードされている。
多言語対応（日本語/英語）に next-intl を使用。デプロイ先は Vercel を想定。

## Architecture Diagram (Text)

```
[Browser]
    |
    v
[Next.js App - Vercel]
    |-- /[locale]/           --> LocaleLayout (Header + Footer)
    |   |-- /                --> HomePage (HeroSection + WorkGrid[featured])
    |   |-- /works           --> WorksPage (CategoryFilter + WorkGrid[all])
    |   |-- /works/[slug]    --> WorkDetailPage
    |   |-- /about           --> AboutPage
    |   `-- /contact         --> ContactPage
    |
    |-- [Data Layer] src/data/works.ts  <-- ハードコード（今回置換対象）
    |
    `-- [i18n] next-intl (ja / en)
```

## Component Descriptions

### src/data/works.ts
- **Purpose**: 作品データの静的ストア
- **Responsibilities**: `Work[]` 配列の保持、`getWorkBySlug`・`getWorksByCategory`・`getFeaturedWorks` ユーティリティ関数
- **Dependencies**: なし
- **Type**: Data / Static Store（今回 Sanity に置換）

### src/components/Header.tsx
- **Purpose**: 固定ナビゲーションバー
- **Dependencies**: next-intl, framer-motion, LanguageSwitcher

### src/components/WorkGrid.tsx
- **Purpose**: 作品カードのグリッドレイアウト
- **Dependencies**: WorkCard, framer-motion

### src/components/WorkCard.tsx
- **Purpose**: 個別作品カード表示
- **Dependencies**: next/image, next-intl, framer-motion, Work型

### src/components/CategoryFilter.tsx
- **Purpose**: カテゴリフィルターUI
- **Dependencies**: next-intl

### src/components/HeroSection.tsx
- **Purpose**: トップページのヒーロー領域
- **Dependencies**: framer-motion, next-intl

### src/components/LanguageSwitcher.tsx
- **Purpose**: 言語切り替えUI
- **Dependencies**: next-intl

## Data Flow

```
現在:
works.ts (static) --> getFeaturedWorks() --> HomePage --> WorkGrid --> WorkCard

変更後（Sanity導入後）:
Sanity Studio (GUI) --> Sanity API --> Next.js (GROQ query) --> WorkGrid --> WorkCard
```

## Integration Points

- **External APIs**: なし（現状）→ Sanity Content API（変更後）
- **Databases**: なし（現状）→ Sanity Dataset（変更後）
- **Third-party Services**: Vercel（ホスティング）

## Infrastructure Components

- **Deployment Model**: Vercel（Next.js最適化済みCDN）
- **Build**: `next build`（SSG/ISR想定）
