# Unit Test Execution

## 現状
このプロジェクトには現時点でテストフレームワークが設定されていません。
以下は推奨セットアップと手動テストシナリオです。

---

## 推奨テストセットアップ（Jest + React Testing Library）

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom \
  jest-environment-jsdom @types/jest ts-jest
```

---

## 手動テストシナリオ（`npm run dev` で確認）

### Unit 1: Sanity クライアント・クエリ

| テスト | 確認方法 | 期待結果 |
|--------|---------|---------|
| `getAllWorks()` | Sanity Vision で GROQ 実行 | 全作品が返る |
| `getFeaturedWorks()` | Sanity Vision: `*[_type=="work" && featured==true]` | featured=true の作品のみ |
| `getWorkBySlug("mobile-banking-app")` | Sanity Vision で slug 指定 | 該当1件が返る |
| `urlFor(image)` | ブラウザで画像 URL を確認 | `cdn.sanity.io` のURLが生成される |

### Unit 2: ページコンポーネント

| テスト | 確認方法 | 期待結果 |
|--------|---------|---------|
| ホームページ | `http://localhost:3000/ja` | featured 作品が表示される |
| Works 一覧 | `http://localhost:3000/ja/works` | 全作品 + カテゴリフィルタが動作する |
| Works 詳細 | `http://localhost:3000/ja/works/mobile-banking-app` | 作品詳細・ギャラリーが表示される |
| About ページ | `http://localhost:3000/ja/about` | Sanity データ または i18n フォールバックが表示される |
| Contact ページ | `http://localhost:3000/ja/contact` | Sanity heading/description + フォームが表示される |
| 多言語切替 | `/en/` → `/ja/` のナビゲーション | 言語が切り替わる |

### Unit 3: Webhook ハンドラ

```bash
# ローカルで Webhook をテスト
curl -X POST http://localhost:3000/api/revalidate \
  -H "x-webhook-secret: your_secret" \
  -H "Content-Type: application/json"
# 期待: {"revalidated":true,"timestamp":...}

# 不正なシークレットのテスト
curl -X POST http://localhost:3000/api/revalidate \
  -H "x-webhook-secret: wrong_secret"
# 期待: {"message":"Invalid secret"} (401)
```
