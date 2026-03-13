# Execution Plan

## Detailed Analysis Summary

### Transformation Scope (Brownfield)
- **Transformation Type**: Data Layer Migration + External Service Integration
- **Primary Changes**: `src/data/works.ts`（静的ハードコード）を Sanity CMS に完全置換。About/Contact コンテンツも Sanity 管理に追加。
- **Related Components**: HomePage, WorksPage, WorkDetailPage, AboutPage, ContactPage, WorkCard, WorkGrid

### Change Impact Assessment
- **User-facing changes**: No — サイトのUIは変わらない。データソースのみ変更
- **Structural changes**: Yes — 新規 `src/sanity/` ディレクトリ（クライアント・スキーマ・クエリ）を追加
- **Data model changes**: Yes — TypeScript 型を Sanity スキーマに変換。Works + About + Contact の3スキーマ
- **API changes**: Yes — 静的インポート → Sanity GROQ クエリ（外部 API 呼び出し）
- **NFR impact**: Moderate — ISR + Webhook によるキャッシュ戦略の追加

### Component Relationships (Brownfield)
- **Primary Component**: `src/data/works.ts`（削除・置換）
- **New Module**: `src/sanity/` (client.ts, schemas/, queries/)
- **Dependent Components**: HomePage, WorksPage, WorkDetailPage, AboutPage, ContactPage
- **Supporting**: `.env.local`（新規）、Vercel 環境変数・Webhook 設定

### Risk Assessment
- **Risk Level**: Medium
- **Rollback Complexity**: Easy（`src/data/works.ts` を復元すれば元に戻せる）
- **Testing Complexity**: Moderate（Sanity API 接続・ISR 動作確認が必要）

---

## Workflow Visualization

### Text Representation
```
INCEPTION PHASE
- [x] Workspace Detection         COMPLETED
- [x] Reverse Engineering         COMPLETED
- [x] Requirements Analysis       COMPLETED
- [SKIP] User Stories             SKIP
- [x] Workflow Planning           IN PROGRESS
- [EXECUTE] Application Design    EXECUTE
- [EXECUTE] Units Generation      EXECUTE

CONSTRUCTION PHASE (per unit)
- [EXECUTE] Functional Design     EXECUTE (Unit 1: Schema Design のみ)
- [SKIP] NFR Requirements         SKIP
- [SKIP] NFR Design               SKIP
- [SKIP] Infrastructure Design    SKIP
- [EXECUTE] Code Generation       EXECUTE (ALWAYS)
- [EXECUTE] Build and Test        EXECUTE (ALWAYS)

OPERATIONS PHASE
- [PLACEHOLDER] Operations        PLACEHOLDER
```

---

## Phases to Execute

### 🔵 INCEPTION PHASE
- [x] Workspace Detection — COMPLETED
- [x] Reverse Engineering — COMPLETED
- [x] Requirements Analysis — COMPLETED
- [ ] ~~User Stories~~ — **SKIP**
  - **Rationale**: 技術的なデータ移行であり、UIは変わらない。要件が明確でユーザーストーリーが付加価値をもたらさない
- [x] Workflow Planning — IN PROGRESS
- [ ] Application Design — **EXECUTE**
  - **Rationale**: 新規 `src/sanity/` モジュールの設計が必要。Works/About/Contact の Sanity スキーマ構造を設計する
- [ ] Units Generation — **EXECUTE**
  - **Rationale**: 複数の独立した実装単位（Sanity セットアップ・Next.js 統合・ページ更新・データ移行・Webhook 設定）に分解することで実装が管理しやすくなる

### 🟢 CONSTRUCTION PHASE

#### Unit 1: Sanity スキーマ設計・プロジェクト設定
- [ ] Functional Design — **EXECUTE**
  - **Rationale**: Works/About/Contact の Sanity スキーマ詳細設計（フィールド型・バリデーション・UI設定）が必要
- [ ] NFR Requirements — **SKIP**
  - **Rationale**: NFR は要件書で定義済み（ISR・データセット分離・権限）。追加分析不要
- [ ] NFR Design — **SKIP** (NFR Requirements をスキップするため)
- [ ] Infrastructure Design — **SKIP**
  - **Rationale**: インフラ変更なし。設定は環境変数と Vercel Webhook のみ（コード生成内で扱える）
- [ ] Code Generation — **EXECUTE** (ALWAYS)
- [ ] Build and Test — **EXECUTE** (ALWAYS)

#### Unit 2: Next.js 統合・ページ更新
- [ ] Functional Design — **SKIP** (Unit 1 で設計完了)
- [ ] NFR Requirements — **SKIP**
- [ ] NFR Design — **SKIP**
- [ ] Infrastructure Design — **SKIP**
- [ ] Code Generation — **EXECUTE** (ALWAYS)
- [ ] Build and Test — **EXECUTE** (ALWAYS)

#### Unit 3: データ移行・Webhook 設定
- [ ] Functional Design — **SKIP** (シンプルな移行作業)
- [ ] NFR Requirements — **SKIP**
- [ ] NFR Design — **SKIP**
- [ ] Infrastructure Design — **SKIP**
- [ ] Code Generation — **EXECUTE** (ALWAYS)
- [ ] Build and Test — **EXECUTE** (ALWAYS)

### 🟡 OPERATIONS PHASE
- [ ] Operations — PLACEHOLDER

---

## Implementation Units

| Unit | 内容 | 依存 |
|------|------|------|
| Unit 1 | Sanity プロジェクト作成・スキーマ定義（Work/About/Contact） | なし |
| Unit 2 | Next.js 統合（Sanityクライアント・GROQクエリ・ページ更新） | Unit 1 |
| Unit 3 | 既存データ移行（6件）・Vercel Webhook 設定 | Unit 1, Unit 2 |

---

## Success Criteria
- **Primary Goal**: もねちゃんが Sanity Studio から作品・About・Contact を編集できる
- **Key Deliverables**:
  - Sanity スキーマ（Works / About / Contact）
  - `src/sanity/` モジュール（client・queries）
  - 全ページの Sanity データ取得への移行
  - 既存6件のデータ移行完了
  - ISR + Vercel Webhook による自動反映
- **Quality Gates**:
  - `npm run build` が成功すること
  - 全ページが Sanity データで正しく表示されること
  - もねちゃんが Studio からコンテンツを編集・保存できること
  - 保存後 数分以内にサイトに反映されること
