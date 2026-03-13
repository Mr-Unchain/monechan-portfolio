# Services

## データ取得フロー

```
Sanity Studio (sanity.io)
    |
    | (保存・公開)
    v
Sanity API (api.sanity.io)
    |
    | (GROQ クエリ / @sanity/client)
    v
src/sanity/queries/
    |-- work.ts         ← Work データ取得
    `-- pageContent.ts  ← About/Contact データ取得
    |
    | (Server Component 内で呼び出し)
    v
Next.js Pages (Server Components)
    |-- /[locale]/page.tsx           (getFeaturedWorks)
    |-- /[locale]/works/page.tsx     (getAllWorks)
    |-- /[locale]/works/[slug]/page.tsx (getWorkBySlug)
    |-- /[locale]/about/page.tsx     (getAboutContent)
    `-- /[locale]/contact/page.tsx   (getContactContent)
    |
    | (props として渡す)
    v
UI Components（WorkGrid, WorkCard など）
```

---

## ISR / 自動反映フロー

```
もねちゃんが Sanity Studio で保存
    |
    v
Sanity Webhook (POST) → Vercel Deploy Hook URL
    |
    v
Vercel が On-demand Revalidation を実行
    |
    v
Next.js キャッシュクリア → 次のリクエスト時に最新データ表示
```

---

## 環境変数サービス

`.env.local`（開発）/ Vercel 環境変数（本番）で管理：

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity プロジェクト ID |
| `NEXT_PUBLIC_SANITY_DATASET` | データセット名（development / production） |
| `SANITY_API_TOKEN` | Sanity API トークン（サーバーサイドのみ） |
| `SANITY_WEBHOOK_SECRET` | Webhook 検証用シークレット（任意） |

---

## Sanity Studio 設定サービス

Sanity Studio は `sanity.io` でホスト（または将来的に `/studio` として埋め込み可能）。

スキーマ登録順序：
1. `work` スキーマ
2. `aboutPage` スキーマ（シングルトン）
3. `contactPage` スキーマ（シングルトン）
