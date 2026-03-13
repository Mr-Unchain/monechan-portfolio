# Dependencies

## Internal Dependencies

```
HomePage
  --> HeroSection
  --> WorkGrid --> WorkCard --> Work (data/works.ts)

WorksPage
  --> CategoryFilter
  --> WorkGrid --> WorkCard --> Work (data/works.ts)

WorkDetailPage
  --> Work (data/works.ts) via getWorkBySlug()

LocaleLayout
  --> Header --> LanguageSwitcher
  --> Footer
  --> NextIntlClientProvider
```

## External Dependencies

### next@14.2.35
- **Purpose**: フレームワーク本体
- **License**: MIT

### react@18
- **Purpose**: UIライブラリ
- **License**: MIT

### next-intl@4.7.0
- **Purpose**: 多言語対応（URL-based locale routing）
- **License**: MIT

### framer-motion@12.29.0
- **Purpose**: アニメーション（scroll-triggered, stagger, layout）
- **License**: MIT

### tailwindcss@3.4.1
- **Purpose**: ユーティリティCSS
- **License**: MIT

### clsx@2.1.1
- **Purpose**: 条件付きclassName結合
- **License**: MIT

## 追加予定依存（Sanity導入時）

### @sanity/client
- **Purpose**: Sanity APIクライアント（GROQ クエリ実行）

### @sanity/image-url
- **Purpose**: Sanity画像URLビルダー

### next-sanity
- **Purpose**: Next.js x Sanity 統合ヘルパー
