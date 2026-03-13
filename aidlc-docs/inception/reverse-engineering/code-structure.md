# Code Structure

## Build System
- **Type**: npm
- **Configuration**: package.json, next.config.js, tailwind.config.js, tsconfig.json
- **Key scripts**: `dev`, `build`, `start`, `lint`

## Existing Files Inventory

### Pages (App Router)
- `src/app/layout.tsx` - ルートレイアウト（html/body）
- `src/app/[locale]/layout.tsx` - ロケール別レイアウト（Header/Footer/NextIntlClientProvider）
- `src/app/[locale]/page.tsx` - トップページ（HeroSection + featured Works）
- `src/app/[locale]/works/page.tsx` - 作品一覧ページ（カテゴリフィルター付き）
- `src/app/[locale]/works/[slug]/page.tsx` - 作品詳細ページ
- `src/app/[locale]/about/page.tsx` - Aboutページ
- `src/app/[locale]/contact/page.tsx` - コンタクトページ
- `src/app/page.tsx` - ルートリダイレクト（→ /ja）

### Components
- `src/components/Header.tsx` - ナビゲーションヘッダー（固定、ハンバーガーメニュー付き）
- `src/components/Footer.tsx` - フッター
- `src/components/HeroSection.tsx` - トップヒーローセクション
- `src/components/WorkGrid.tsx` - 作品グリッドコンテナ
- `src/components/WorkCard.tsx` - 作品カード（サムネイル・タイトル・カテゴリ）
- `src/components/CategoryFilter.tsx` - カテゴリタブフィルター（all/uiux/web/graphic）
- `src/components/LanguageSwitcher.tsx` - 言語切り替えボタン

### Data Layer（今回の変更対象）
- `src/data/works.ts` - **作品データのハードコード＋ユーティリティ関数（Sanityに置換）**

### i18n
- `src/i18n/routing.ts` - ロケール設定（ja/en, defaultLocale: ja）
- `src/i18n/request.ts` - next-intl サーバーサイド設定

### Utilities
- `src/lib/utils.ts` - 汎用ユーティリティ

## Design Patterns

### Server/Client Component 混在
- **Location**: `src/app/[locale]/layout.tsx`（Server） vs `src/app/[locale]/page.tsx`（Client）
- **Purpose**: レイアウトはサーバーサイドでi18nメッセージを取得、ページはクライアントサイドでインタラクション

### データアクセス関数パターン
- **Location**: `src/data/works.ts`
- **Purpose**: データ取得ロジックをページから分離
- **Note**: Sanity導入後はこのファイルをGROQクエリ関数に置き換える

## Critical Dependencies

### next@14.2.35
- **Usage**: App Router, Image最適化, ISR
- **Purpose**: フレームワーク本体

### next-intl@4.7.0
- **Usage**: `[locale]` ルーティング, `useTranslations`, `getMessages`
- **Purpose**: 多言語対応（ja/en）

### framer-motion@12.29.0
- **Usage**: 全コンポーネントのアニメーション
- **Purpose**: ページ遷移・スクロールアニメーション

### tailwindcss@3.4.1
- **Usage**: 全スタイリング
- **Purpose**: ユーティリティCSSフレームワーク
