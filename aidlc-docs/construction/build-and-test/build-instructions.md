# Build Instructions

## Prerequisites
- **Node.js**: 18.x 以上
- **npm**: 9.x 以上
- **Sanity プロジェクト**: 作成済み（`npx sanity init` 実行済み）
- **環境変数**: `.env.local` に全変数設定済み

## 必須環境変数
| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity プロジェクト ID |
| `NEXT_PUBLIC_SANITY_DATASET` | データセット名（`production`） |
| `SANITY_API_TOKEN` | Sanity API トークン（読み取り） |
| `SANITY_WEBHOOK_SECRET` | Webhook 検証シークレット |

---

## Build Steps

### 1. 依存パッケージインストール

```bash
npm install
```

#### Sanity Studio パッケージ追加（`npx sanity init` 後）
`npx sanity init` が以下のパッケージを追加します:
- `sanity` — Studio コア
- `sanity/structure` — コンテンツ構造
- `@sanity/vision` — GROQ クエリテスト

### 2. 環境変数設定

```bash
cp .env.local.example .env.local
# .env.local を編集して Sanity の値を入力
```

### 3. TypeScript チェック

```bash
npx tsc --noEmit
```

**期待される結果**: エラー 0（`sanity init` 完了後）

### 4. Next.js ビルド

```bash
npm run build
```

**期待される出力**:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
Route (app) ...
```

**⚠️ 注意**: `generateStaticParams` が Sanity API を呼ぶため、環境変数とデータが必要です。

### 5. ローカル動作確認

```bash
npm run dev
# http://localhost:3000 を開く
```

---

## Sanity Studio ビルド

```bash
npx sanity build   # Studio を静的ファイルにビルド
npx sanity deploy  # sanity.io にデプロイ
```

---

## トラブルシューティング

### `Cannot find module 'sanity'`
- **原因**: `npx sanity init` 未実行
- **解決**: `npx sanity init` を実行して `sanity` パッケージをインストール

### `NEXT_PUBLIC_SANITY_PROJECT_ID is not defined`
- **原因**: `.env.local` 未設定
- **解決**: `.env.local.example` をコピーして値を入力

### `generateStaticParams` でビルドが失敗
- **原因**: Sanity にデータがない、または API トークンが無効
- **解決**: `scripts/migrate-to-sanity.ts` でデータを移行してからビルド
