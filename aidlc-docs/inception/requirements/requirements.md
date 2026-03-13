# Requirements Document

## Intent Analysis

- **User Request**: もねちゃん（非エンジニア）がポートフォリオコンテンツを自由に編集できるよう、Sanity をヘッドレスCMSとして導入する
- **Request Type**: Migration（静的ハードコードデータ → Sanity CMS）+ Enhancement（About/Contact も CMS 管理に拡張）
- **Scope**: System-wide（データ層 + 全コンテンツページ）
- **Complexity**: Moderate（外部サービス統合・スキーマ設計・Webhook 自動デプロイ・データ移行を含む）

---

## Functional Requirements

### FR-01: Works コンテンツ管理
Sanity Studio から作品（Work）の CRUD（作成・読取・更新・削除）が可能であること。

**管理対象フィールド:**
- タイトル（日本語 / 英語）
- 説明文（日本語 / 英語）- プレーンテキスト
- カテゴリ（uiux / web / graphic）
- サムネイル画像（Sanity Image CDN）
- ギャラリー画像（複数、Sanity Image CDN）
- 担当ロール（日本語 / 英語）
- 使用ツール（複数テキスト）
- 制作年
- Featured フラグ（トップページ掲載有無）
- スラッグ（URL識別子）- **変更不可でロック**

### FR-02: About ページコンテンツ管理
Sanity Studio から About ページの自己紹介テキスト（日本語/英語）を編集できること。

### FR-03: Contact ページコンテンツ管理
Sanity Studio から Contact ページのテキスト（日本語/英語）を編集できること。

### FR-04: 画像管理
Sanity Studio の画像アップロード機能を使い、もねちゃんが直接画像をアップロード・管理できること。画像配信は Sanity Image CDN を使用する。

### FR-05: 既存データ移行
現在 `src/data/works.ts` に存在する6件の作品データを Sanity の `production` データセットに移行すること。

### FR-06: 自動デプロイ連携
もねちゃんが Sanity Studio でコンテンツを保存・公開したら、Vercel Webhook が発火し、数分以内にサイトに反映されること（ISR + On-demand Revalidation）。

### FR-07: 多言語コンテンツ対応
全コンテンツフィールドで日本語（ja）と英語（en）の両方を管理できること。既存の next-intl によるルーティングは維持する。

---

## Non-Functional Requirements

### NFR-01: 管理画面の外部アクセス
Sanity Studio はクラウド（sanity.io）上でアクセス可能とする。サイトへの埋め込みは不要。

### NFR-02: アクセス権限管理
- もねちゃん: **Editor** 権限（コンテンツの作成・編集・公開が可能）
- エンジニア（自分）: **Administrator** 権限

### NFR-03: 環境分離
- `development` データセット: 開発・テスト用
- `production` データセット: 本番用（もねちゃんが編集するデータ）

### NFR-04: データ形式
説明文（description）はプレーンテキスト形式とする。Portable Text（リッチテキスト）は使用しない。

### NFR-05: URL 安定性
スラッグ（URL）は Sanity Studio 上でロック（変更不可）とし、既存URLの破損を防ぐ。

### NFR-06: ホスティング
Vercel を使用。Sanity Webhook → Vercel Deploy Hook の連携を設定する。

---

## Technical Constraints

- **フレームワーク**: Next.js 14 (App Router) — 変更しない
- **i18n**: next-intl — 変更しない（ルーティング構造を維持）
- **追加ライブラリ**: `@sanity/client`, `@sanity/image-url`, `next-sanity`
- **既存コンポーネント**: WorkCard, WorkGrid, CategoryFilter 等のUIは変更しない（データ取得層のみ置換）
- **削除対象**: `src/data/works.ts`（Sanity クエリ関数に完全置換）

---

## Scope Summary

| 対象 | 変更内容 |
|------|---------|
| `src/data/works.ts` | 削除 → Sanity GROQ クエリ関数に置換 |
| `src/app/[locale]/page.tsx` | Sanity からデータ取得に変更 |
| `src/app/[locale]/works/page.tsx` | Sanity からデータ取得に変更 |
| `src/app/[locale]/works/[slug]/page.tsx` | Sanity からデータ取得に変更（Server Component 化） |
| `src/app/[locale]/about/page.tsx` | Sanity からコンテンツ取得に変更 |
| `src/app/[locale]/contact/page.tsx` | Sanity からコンテンツ取得に変更 |
| `src/sanity/` (新規) | Sanity クライアント・スキーマ・クエリ定義 |
| `.env.local` (新規) | Sanity プロジェクトID・データセット・APIトークン |
| Sanity Studio (外部) | Work・About・Contact スキーマを定義 |
| Vercel Dashboard (外部) | Webhook 設定・環境変数設定 |
