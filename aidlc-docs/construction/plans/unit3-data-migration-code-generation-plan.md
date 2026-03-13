# Code Generation Plan - Unit 3: データ移行・Webhook 設定

## ユニット概要
- **対象**: Sanity Studio 設定・データ移行スクリプト・Webhook ハンドラ・デプロイ設定
- **要件カバレッジ**: FR-05, FR-06, NFR-01〜05
- **依存**: Unit 1・Unit 2 完了済み

## 生成場所
- アプリケーションコード: workspace root (`sanity.config.ts`, `src/app/api/`)
- 移行スクリプト: `scripts/`
- ドキュメント: `aidlc-docs/construction/unit3-data-migration/`

---

## 実行ステップ

### Step 1: sanity.config.ts 作成
- [x] `sanity.config.ts` を新規作成（workspace root）
  - `defineConfig` でプロジェクト設定
  - `schemaTypes` を登録（Unit 1 のスキーマ）
  - Sanity Studio の title 設定

### Step 2: Webhook ハンドラ作成
- [x] `src/app/api/revalidate/route.ts` を新規作成
  - POST リクエストを受信
  - `SANITY_WEBHOOK_SECRET` でリクエスト検証
  - `revalidatePath('/')`, `revalidatePath('/works')` 等で ISR キャッシュ無効化

### Step 3: データ移行スクリプト作成
- [x] `scripts/migrate-to-sanity.ts` を新規作成
  - 既存 6 件の作品データを Sanity `production` データセットに投入
  - `@sanity/client` を使って `client.create()` で各 Work ドキュメント作成
  - 画像は placeholder URL をそのまま使用（もねちゃんが後から Sanity Studio で差し替え）

### Step 4: next.config.js に Sanity CDN ドメイン追加
- [x] `next.config.js` を修正（in-place）
  - `images.remotePatterns` に `cdn.sanity.io` を追加

### Step 5: セットアップガイド作成
- [x] `aidlc-docs/construction/unit3-data-migration/setup-guide.md` を新規作成
  - Sanity プロジェクト作成手順（`npx sanity init`）
  - Sanity Studio デプロイ手順（`npx sanity deploy`）
  - Vercel 環境変数設定手順
  - Vercel Webhook 設定手順
  - もねちゃんへの Editor 権限付与手順
  - 移行スクリプト実行手順（`npx ts-node scripts/migrate-to-sanity.ts`）

### Step 6: コードサマリー作成
- [x] `aidlc-docs/construction/unit3-data-migration/code/summary.md` を新規作成

---

## 要件トレーサビリティ
| ステップ | カバー要件 |
|---------|-----------|
| Step 1 | NFR-01 (Sanity Studio 外部アクセス) |
| Step 2 | NFR-02 (ISR Webhook 自動反映) |
| Step 3 | FR-06 (既存データ移行) |
| Step 4 | NFR-04 (Sanity Image CDN) |
| Step 5 | NFR-03, NFR-05 (デプロイ・権限設定) |
