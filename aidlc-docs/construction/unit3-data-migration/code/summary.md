# Code Summary - Unit 3: データ移行・Webhook 設定

## 生成ファイル一覧

### 新規作成
| ファイル | 役割 |
|---------|------|
| `sanity.config.ts` | Sanity Studio 設定（スキーマ登録・Vision プラグイン） |
| `src/app/api/revalidate/route.ts` | Webhook ハンドラ（ISR キャッシュ無効化） |
| `scripts/migrate-to-sanity.ts` | 既存6件データの Sanity 移行スクリプト |

### 修正済み
| ファイル | 変更内容 |
|---------|---------|
| `next.config.mjs` | `images.remotePatterns` に `cdn.sanity.io` 追加 |

### ドキュメント
| ファイル | 内容 |
|---------|------|
| `aidlc-docs/construction/unit3-data-migration/setup-guide.md` | 10ステップのセットアップ手順 |

## 残タスク（手動作業）

セットアップガイド（`setup-guide.md`）に従って以下を実行:
1. `npx sanity init` でプロジェクト作成
2. `npx sanity deploy` で Studio を公開
3. Vercel に環境変数を設定
4. Sanity Webhook を設定
5. もねちゃんを Editor として招待
6. `scripts/migrate-to-sanity.ts` でデータ移行
