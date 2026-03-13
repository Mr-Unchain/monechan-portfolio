# セットアップガイド - Unit 3: データ移行・Webhook 設定

## 概要
このガイドはエンジニア（あなた）が実行する手動セットアップ手順です。
コード生成済みのファイルと組み合わせて、本番環境を完成させます。

---

## Step 1: Sanity プロジェクト作成

```bash
npx sanity init
```

プロンプトの回答:
- **Create new project**: Yes
- **Project name**: monechan-portfolio
- **Default dataset**: `production`
- **Project output path**: `.` (既存プロジェクトに統合)
- **Select project template**: Clean project with no predefined schemas

完了後、`sanity.json` または `.sanity` ディレクトリが生成される。

> ⚠️ `sanity.config.ts` はすでに作成済みのため、生成された設定を上書き注意。

---

## Step 2: 開発データセット作成

```bash
npx sanity dataset create development
```

- `production`: 本番データ（もねちゃんが編集するデータ）
- `development`: 開発・テスト用データ

---

## Step 3: Sanity Studio をローカルで起動・確認

```bash
npx sanity dev
```

- ブラウザで `http://localhost:3333` を開く
- Work / About Page / Contact Page のスキーマが表示されることを確認

---

## Step 4: 環境変数を設定

`.env.local` ファイルを作成（`.env.local.example` をコピー）:

```bash
cp .env.local.example .env.local
```

Sanity 管理画面（`https://www.sanity.io/manage`）から値を取得:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: プロジェクト ID
- `NEXT_PUBLIC_SANITY_DATASET`: `production`
- `SANITY_API_TOKEN`: Settings → API → Tokens → Add API Token（Editor 権限）
- `SANITY_WEBHOOK_SECRET`: 任意のランダム文字列（例: `openssl rand -hex 32`）

---

## Step 5: データ移行スクリプトを実行

```bash
npx ts-node --project tsconfig.json scripts/migrate-to-sanity.ts
```

- 既存 6 件のデータが Sanity `production` データセットに投入される
- 画像は空（もねちゃんが Studio から後で差し替え）

---

## Step 6: Sanity Studio を sanity.io にデプロイ

```bash
npx sanity deploy
```

- Studio の URL を決める（例: `monechan-portfolio.sanity.studio`）
- デプロイ完了後、Studio URL をもねちゃんに共有

---

## Step 7: もねちゃんを Editor として招待

1. `https://www.sanity.io/manage` → プロジェクト → Members
2. 「Add member」→ もねちゃんのメールアドレスを入力
3. Role: **Editor**（コンテンツの作成・編集が可能、スキーマ変更は不可）

---

## Step 8: Vercel に環境変数を設定

Vercel ダッシュボード → プロジェクト → Settings → Environment Variables:

| 変数名 | 値 |
|--------|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity プロジェクト ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Sanity API トークン |
| `SANITY_WEBHOOK_SECRET` | Step 4 で設定したシークレット |

---

## Step 9: Vercel Webhook を設定

1. Sanity 管理画面 → プロジェクト → API → Webhooks → 「Add webhook」
2. 設定値:
   - **Name**: Vercel ISR Revalidate
   - **URL**: `https://あなたのドメイン.vercel.app/api/revalidate`
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **HTTP Headers**: `x-webhook-secret: [SANITY_WEBHOOK_SECRET の値]`
   - **Dataset**: `production`

---

## Step 10: 動作確認

1. `npm run dev` でローカル起動
2. `.env.local` の設定で Sanity からデータが表示されることを確認
3. Sanity Studio でデータを編集 → Vercel の Webhook が発火 → サイトが更新されることを確認

---

## 完了チェックリスト

- [ ] `npx sanity dev` で Studio が起動し、スキーマが表示される
- [ ] 6 件の作品データが Studio に表示される
- [ ] `npm run dev` でサイトが Sanity データを表示する
- [ ] もねちゃんが Studio にログインできる
- [ ] Studio で作品を編集 → Vercel で自動再ビルド → サイトに反映される
