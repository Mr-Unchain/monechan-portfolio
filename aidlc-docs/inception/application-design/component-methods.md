# Component Methods

## SanityClient (`src/sanity/client.ts`)

```typescript
// デフォルトエクスポート: 設定済み Sanity クライアント
export const client: SanityClient

// 画像URLビルダー（@sanity/image-url）
export const urlFor: (source: SanityImageSource) => ImageUrlBuilder
```

---

## WorkQueries (`src/sanity/queries/work.ts`)

```typescript
// 全作品を取得（年降順）
export async function getAllWorks(): Promise<Work[]>

// featured フラグが true の作品を取得
export async function getFeaturedWorks(): Promise<Work[]>

// slug で単一作品を取得
export async function getWorkBySlug(slug: string): Promise<Work | null>

// 静的パス生成用：全スラッグ一覧取得
export async function getAllWorkSlugs(): Promise<{ slug: string }[]>
```

### Work 型（Sanity 対応版）
```typescript
export interface Work {
  _id: string
  slug: string                        // readOnly
  title: { ja: string; en: string }
  description: { ja: string; en: string }
  category: 'uiux' | 'web' | 'graphic'
  thumbnail: SanityImageAsset         // Sanity Image
  images: SanityImageAsset[]          // Sanity Image[]
  role: { ja: string; en: string }
  tools: string[]
  year: number
  featured: boolean
}
```

---

## PageContentQueries (`src/sanity/queries/pageContent.ts`)

```typescript
// About ページコンテンツを取得
export async function getAboutContent(): Promise<AboutContent | null>

// Contact ページコンテンツを取得
export async function getContactContent(): Promise<ContactContent | null>
```

### AboutContent 型
```typescript
export interface AboutContent {
  _id: string
  name: { ja: string; en: string }
  bio: { ja: string; en: string }
  skills: string[]
  profileImage?: SanityImageAsset
}
```

### ContactContent 型
```typescript
export interface ContactContent {
  _id: string
  heading: { ja: string; en: string }
  description: { ja: string; en: string }
  email: string
}
```

---

## Sanity スキーマ構造（概要）

### Work スキーマフィールド
| フィールド | 型 | 備考 |
|-----------|-----|------|
| `slug` | slug | readOnly: true |
| `title` | object | ja: string, en: string |
| `description` | object | ja: text, en: text（プレーンテキスト） |
| `category` | string（list） | uiux / web / graphic |
| `thumbnail` | image | hotspot: true |
| `images` | array(image) | hotspot: true |
| `role` | object | ja: string, en: string |
| `tools` | array(string) | |
| `year` | number | |
| `featured` | boolean | |

### AboutPage スキーマフィールド
| フィールド | 型 | 備考 |
|-----------|-----|------|
| `name` | object | ja: string, en: string |
| `bio` | object | ja: text, en: text |
| `skills` | array(string) | |
| `profileImage` | image | optional |

### ContactPage スキーマフィールド
| フィールド | 型 | 備考 |
|-----------|-----|------|
| `heading` | object | ja: string, en: string |
| `description` | object | ja: text, en: text |
| `email` | string | |
