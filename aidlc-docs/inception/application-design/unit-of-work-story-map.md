# Unit of Work - Requirements Map

※ User Stories ステージはスキップしたため、要件書（requirements.md）の機能要件をユニットにマッピングする。

## 要件 → ユニット マッピング

| 要件ID | 内容 | Unit |
|--------|------|------|
| FR-01 | Works コンテンツ管理（Sanity Studio で CRUD） | Unit 1（スキーマ）+ Unit 2（ページ） |
| FR-02 | About ページコンテンツ管理 | Unit 1（スキーマ）+ Unit 2（ページ） |
| FR-03 | Contact ページコンテンツ管理 | Unit 1（スキーマ）+ Unit 2（ページ） |
| FR-04 | 画像管理（Sanity Image CDN） | Unit 1（スキーマ設定）+ Unit 2（urlFor 実装） |
| FR-05 | 既存6件データ移行 | Unit 3 |
| FR-06 | 自動デプロイ連携（ISR + Webhook） | Unit 3（Webhook設定）+ Unit 2（revalidate設定） |
| FR-07 | 多言語コンテンツ対応（ja/en） | Unit 1（スキーマ）+ Unit 2（ページ） |
| NFR-01 | Sanity Studio クラウドアクセス | Unit 1（Sanity プロジェクト設定） |
| NFR-02 | アクセス権限管理（Editor/Admin） | Unit 3（権限設定） |
| NFR-03 | 環境分離（dev/prod） | Unit 1（データセット設定） |
| NFR-04 | プレーンテキスト形式 | Unit 1（スキーマ: text 型使用） |
| NFR-05 | URL 安定性（slug readOnly） | Unit 1（スキーマ: readOnly: true） |
| NFR-06 | Vercel ホスティング | Unit 3（Vercel 設定） |

## ユニット別カバレッジ

### Unit 1: Sanity セットアップ・スキーマ定義
- FR-01（スキーマ部分）, FR-02, FR-03, FR-04, FR-07
- NFR-01, NFR-03, NFR-04, NFR-05

### Unit 2: Next.js 統合・全ページ更新
- FR-01（ページ部分）, FR-02, FR-03, FR-04, FR-06（revalidate）, FR-07

### Unit 3: データ移行・Webhook 設定
- FR-05, FR-06（Webhook）
- NFR-02, NFR-06
