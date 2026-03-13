# Code Generation Plan - Unit 1: Sanity セットアップ・スキーマ定義

## ユニット概要
- **対象**: Sanity プロジェクト設定・スキーマ・クライアント・クエリ
- **要件カバレッジ**: FR-01〜04, FR-07, NFR-01, NFR-03〜05
- **依存**: なし（Unit 1 は最初に実行）

## 生成場所
- アプリケーションコード: `c:\Git\monechan-portfolio\src\sanity\`
- 設定ファイル: `c:\Git\monechan-portfolio\` (root)

---

## 実行ステップ

### Step 1: パッケージインストール
- [x] `npm install @sanity/client @sanity/image-url` を実行（next-sanity@12 は Next.js 14 と非互換のため直接インストール）
- [x] `package.json` の dependencies に追加されることを確認

### Step 2: Sanity クライアント作成
- [x] `src/sanity/client.ts` を新規作成
  - `createClient` 設定（projectId, dataset, apiVersion, useCdn）
  - `urlFor` 画像URLビルダーのエクスポート

### Step 3: Work スキーマ作成
- [x] `src/sanity/schemas/work.ts` を新規作成
  - slug フィールド（`readOnly: true`）
  - title オブジェクト（ja/en, required）
  - description オブジェクト（ja/en text, required）
  - category リスト（uiux/web/graphic, required）
  - thumbnail 画像（hotspot: true, required）
  - images 画像配列（hotspot: true）
  - role オブジェクト（ja/en）
  - tools 文字列配列
  - year 数値（min: 1900, required）
  - featured ブール値（initialValue: false）

### Step 4: AboutPage スキーマ作成
- [x] `src/sanity/schemas/aboutPage.ts` を新規作成
  - シングルトン設定（`__experimental_actions` で新規作成を制限）
  - name オブジェクト（ja/en）
  - bio オブジェクト（ja/en text）
  - skills 文字列配列
  - profileImage 画像（任意）

### Step 5: ContactPage スキーマ作成
- [x] `src/sanity/schemas/contactPage.ts` を新規作成
  - シングルトン設定
  - heading オブジェクト（ja/en）
  - description オブジェクト（ja/en text）
  - email 文字列（email validation）

### Step 6: スキーマインデックス作成
- [x] `src/sanity/schemas/index.ts` を新規作成
  - work, aboutPage, contactPage をエクスポート

### Step 7: Work クエリ・型定義作成
- [x] `src/sanity/queries/work.ts` を新規作成
  - `Work` TypeScript インターフェース定義
  - `getAllWorks()` 関数（year desc）
  - `getFeaturedWorks()` 関数（featured == true）
  - `getWorkBySlug(slug)` 関数
  - `getAllWorkSlugs()` 関数（generateStaticParams 用）

### Step 8: ページコンテンツクエリ・型定義作成
- [x] `src/sanity/queries/pageContent.ts` を新規作成
  - `AboutContent` TypeScript インターフェース定義
  - `ContactContent` TypeScript インターフェース定義
  - `getAboutContent()` 関数
  - `getContactContent()` 関数

### Step 9: 環境変数テンプレート作成
- [x] `.env.local.example` を新規作成
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`

### Step 10: コードサマリー作成
- [x] `aidlc-docs/construction/unit1-sanity-setup/code/summary.md` を新規作成
  - 生成ファイル一覧
  - 次のステップ（Sanity プロジェクト作成手順）

---

## 要件トレーサビリティ
| ステップ | カバー要件 |
|---------|-----------|
| Step 2 | NFR-01, NFR-03 |
| Step 3 | FR-01, FR-04, FR-07, NFR-04, NFR-05 |
| Step 4 | FR-02, FR-07 |
| Step 5 | FR-03, FR-07 |
| Step 7 | FR-01, FR-04, BR-09〜11 |
| Step 8 | FR-02, FR-03 |
| Step 9 | NFR-03 |
