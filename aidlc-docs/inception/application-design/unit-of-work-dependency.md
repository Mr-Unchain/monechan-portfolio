# Unit of Work Dependency

## 依存関係マトリクス

| ユニット | 依存先 | 依存元 | 変更タイプ |
|---------|--------|--------|-----------|
| Unit 1: Sanity セットアップ | なし | Unit 2, Unit 3 | 新規追加 |
| Unit 2: Next.js 統合 | Unit 1（client.ts・queries） | Unit 3（動作確認のため） | 変更 + 削除 |
| Unit 3: データ移行・Webhook | Unit 1（Sanityプロジェクト）, Unit 2（ページ動作確認） | なし | 設定 |

## 実装順序

```
Unit 1 (Sanity セットアップ)
    |
    | Unit 1 完了後
    v
Unit 2 (Next.js 統合・ページ更新)
    |
    | Unit 2 完了後
    v
Unit 3 (データ移行・Webhook設定)
```

## 重要な依存ポイント

| 依存ポイント | 内容 | リスク |
|------------|------|--------|
| Unit 1 → Unit 2 | `src/sanity/client.ts` と queries が存在しないとページが動作しない | High |
| Unit 1 → Unit 3 | Sanity プロジェクトが存在しないとデータ移行できない | High |
| Unit 2 → Unit 3 | ページ更新が完了してから本番データ移行・Webhook 設定を行う | Medium |

## ロールバック戦略

各ユニットの作業前にブランチを作成し、問題発生時に切り戻せるようにする。
- `src/data/works.ts` は Unit 2 完了・動作確認まで保持する（削除は最後）
