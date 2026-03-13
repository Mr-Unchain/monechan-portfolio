# API Documentation

## REST APIs
現在、外部APIは使用していない。データは `src/data/works.ts` からの静的インポート。

## Internal APIs（データ層関数）

### getWorkBySlug(slug: string): Work | undefined
- **場所**: `src/data/works.ts`
- **用途**: slug から単一作品を取得（WorkDetailPage で使用）
- **Parameters**: `slug` - URLスラッグ文字列
- **Return**: `Work` オブジェクト or `undefined`

### getWorksByCategory(category: WorkCategory): Work[]
- **場所**: `src/data/works.ts`
- **用途**: カテゴリで絞り込んだ作品一覧を取得
- **Parameters**: `category` - 'uiux' | 'web' | 'graphic'
- **Return**: `Work[]`

### getFeaturedWorks(): Work[]
- **場所**: `src/data/works.ts`
- **用途**: featured フラグが true の作品一覧を取得（トップページで使用）
- **Return**: `Work[]`

## Data Models

### Work
```typescript
interface Work {
  slug: string;              // URL識別子（例: 'mobile-banking-app'）
  title: { ja: string; en: string; };      // 多言語タイトル
  description: { ja: string; en: string; }; // 多言語説明文
  category: 'uiux' | 'web' | 'graphic';   // カテゴリ
  thumbnail: string;         // サムネイル画像パス
  images: string[];          // ギャラリー画像パス一覧
  role: { ja: string; en: string; };       // 多言語担当役割
  tools: string[];           // 使用ツール一覧
  year: number;              // 制作年
  featured: boolean;         // トップページ掲載フラグ
}
```

### WorkCategory
```typescript
type WorkCategory = 'uiux' | 'web' | 'graphic';
```
