# Component Inventory

## Application Pages
- `src/app/[locale]/page.tsx` - トップページ
- `src/app/[locale]/works/page.tsx` - 作品一覧ページ
- `src/app/[locale]/works/[slug]/page.tsx` - 作品詳細ページ
- `src/app/[locale]/about/page.tsx` - Aboutページ
- `src/app/[locale]/contact/page.tsx` - コンタクトページ

## UI Components
- `src/components/Header.tsx` - ヘッダーナビゲーション
- `src/components/Footer.tsx` - フッター
- `src/components/HeroSection.tsx` - ヒーローセクション
- `src/components/WorkGrid.tsx` - 作品グリッド
- `src/components/WorkCard.tsx` - 作品カード
- `src/components/CategoryFilter.tsx` - カテゴリフィルター
- `src/components/LanguageSwitcher.tsx` - 言語切り替え

## Data / Logic
- `src/data/works.ts` - 作品データ＆ユーティリティ（Sanity導入で置換）
- `src/i18n/routing.ts` - i18nルーティング設定
- `src/i18n/request.ts` - next-intl サーバー設定
- `src/lib/utils.ts` - 汎用ユーティリティ

## Infrastructure
- なし（現状）→ Vercel デプロイ設定（変更後に追加）

## Total Count
- **Total Files**: 17
- **Pages**: 5
- **UI Components**: 7
- **Data/Logic**: 4
- **Infrastructure**: 0（現状）
