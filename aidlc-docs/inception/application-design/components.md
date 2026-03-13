# Components

## 新規コンポーネント（Sanity 統合レイヤー）

### SanityClient (`src/sanity/client.ts`)
- **Purpose**: Sanity API への接続設定を提供する
- **Responsibilities**:
  - `@sanity/client` の初期化（projectId / dataset / apiVersion）
  - `next-sanity` を使った Next.js 向け最適化クライアントの提供
  - 開発/本番環境のデータセット切り替え

### WorkSchema (`src/sanity/schemas/work.ts`)
- **Purpose**: Sanity Studio における Work コンテンツタイプのフィールド定義
- **Responsibilities**:
  - Work の全フィールドを Sanity スキーマとして定義
  - スラッグフィールドの readOnly 設定（URL安定性のため）
  - 画像フィールドに hotspot を有効化（Sanity Image CDN）
  - 多言語フィールド（ja/en）のオブジェクトとして定義

### AboutPageSchema (`src/sanity/schemas/aboutPage.ts`)
- **Purpose**: Sanity Studio における About ページコンテンツタイプの定義
- **Responsibilities**:
  - About ページのテキストフィールドを多言語対応で定義
  - シングルトンドキュメント（1件のみ）として設定

### ContactPageSchema (`src/sanity/schemas/contactPage.ts`)
- **Purpose**: Sanity Studio における Contact ページコンテンツタイプの定義
- **Responsibilities**:
  - Contact ページのテキストフィールドを多言語対応で定義
  - シングルトンドキュメント（1件のみ）として設定

### WorkQueries (`src/sanity/queries/work.ts`)
- **Purpose**: Work データ取得用の GROQ クエリ定義
- **Responsibilities**:
  - `getAllWorksQuery`: 全作品取得
  - `getFeaturedWorksQuery`: featured=true の作品取得
  - `getWorkBySlugQuery`: slug 指定の作品取得
  - `getAllWorkSlugsQuery`: 静的パス生成用スラッグ一覧取得

### PageContentQueries (`src/sanity/queries/pageContent.ts`)
- **Purpose**: About/Contact ページコンテンツ取得用の GROQ クエリ定義
- **Responsibilities**:
  - `getAboutContentQuery`: About ページコンテンツ取得
  - `getContactContentQuery`: Contact ページコンテンツ取得

---

## 既存コンポーネント（変更なし）

| コンポーネント | 変更 | 理由 |
|--------------|------|------|
| `WorkGrid` | なし | `Work[]` を props で受け取る設計のため |
| `WorkCard` | なし | `Work` 型を props で受け取る設計のため |
| `CategoryFilter` | なし | UI のみ |
| `HeroSection` | なし | UI のみ |
| `Header` | なし | ナビゲーションのみ |
| `Footer` | なし | UI のみ |
| `LanguageSwitcher` | なし | UI のみ |

---

## 変更対象ページ

| ページ | 変更内容 |
|--------|---------|
| `src/app/[locale]/page.tsx` | `getFeaturedWorks()` → Sanity クエリに変更 |
| `src/app/[locale]/works/page.tsx` | `works` 静的インポート → Sanity クエリに変更 |
| `src/app/[locale]/works/[slug]/page.tsx` | `getWorkBySlug()` → Sanity クエリに変更。Server Component 化 |
| `src/app/[locale]/about/page.tsx` | Sanity からコンテンツ取得に変更 |
| `src/app/[locale]/contact/page.tsx` | Sanity からコンテンツ取得に変更 |
