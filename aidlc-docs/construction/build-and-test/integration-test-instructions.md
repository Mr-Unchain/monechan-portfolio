# Integration Test Instructions

## テスト対象の統合ポイント

| 統合 | Unit A | Unit B | テスト内容 |
|------|--------|--------|-----------|
| Sanity → Next.js | Unit 1 (queries) | Unit 2 (pages) | データがページに正しく表示される |
| Sanity → Webhook → Vercel | Unit 1 (Sanity) | Unit 3 (revalidate) | 更新が自動反映される |

---

## シナリオ 1: Sanity データ → ページ表示

**目的**: Unit 1 のクエリが Unit 2 のページで正しくレンダリングされること

**セットアップ**:
1. `.env.local` に有効な Sanity 認証情報を設定
2. Sanity に少なくとも1件のデータが存在すること
3. `npm run dev` でローカルサーバー起動

**テスト手順**:
1. `http://localhost:3000/ja` にアクセス → featured 作品がホームページに表示される
2. `http://localhost:3000/ja/works` にアクセス → 全作品一覧が表示される
3. 作品カードをクリック → 詳細ページ (`/ja/works/[slug]`) が正しく表示される
4. `/en/` に切り替え → 英語コンテンツが表示される

**期待結果**: 全ページで Sanity データが正しく表示される

---

## シナリオ 2: Webhook → ISR 自動更新

**目的**: Sanity で保存 → サイトが自動更新されること

**セットアップ**:
1. Vercel に環境変数 + Webhook 設定済み
2. 本番サイトがデプロイ済み

**テスト手順**:
1. Sanity Studio で任意の作品タイトルを変更して保存
2. Vercel ダッシュボードの Functions ログを確認
   - `POST /api/revalidate` が 200 で呼ばれること
3. 本番サイトの該当ページをリロード
4. 変更が反映されていることを確認

**期待結果**: 保存から数分以内にサイトに反映される（NFR-02）

---

## シナリオ 3: 404 ハンドリング

**テスト手順**:
1. `http://localhost:3000/ja/works/non-existent-slug` にアクセス
2. Next.js の 404 ページが表示されること

**期待結果**: `notFound()` が正しく機能し、404 ページが返る
