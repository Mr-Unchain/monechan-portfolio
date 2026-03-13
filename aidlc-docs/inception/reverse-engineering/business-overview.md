# Business Overview

## Business Description

- **Business Description**: もねちゃん（デザイナー）のポートフォリオサイト。過去の制作実績をビジュアル中心に紹介し、クライアントや採用担当者にスキルと実績をアピールする。
- **Business Transactions**:
  1. **実績一覧閲覧** - 全作品をカテゴリフィルター付きで一覧表示する
  2. **実績詳細閲覧** - 個別作品の詳細情報（説明・使用ツール・画像ギャラリー）を表示する
  3. **注目作品閲覧（トップページ）** - featured フラグが立った作品をトップページで紹介する
  4. **言語切り替え** - 日本語と英語を切り替えて表示する
  5. **コンタクト** - 問い合わせページへの誘導
- **Business Dictionary**:
  - `Work` / `実績`: デザイン案件1件を指す。スラッグ・タイトル・説明・カテゴリ・画像・ロール・ツール・年・featured フラグを持つ
  - `Category` / `カテゴリ`: uiux / web / graphic の3分類
  - `featured`: トップページに掲載する注目作品フラグ
  - `slug`: URLに使用する作品識別子（例: `mobile-banking-app`）
  - `locale`: 表示言語（`ja` または `en`）

## Component Level Business Descriptions

### data/works.ts
- **Purpose**: 全作品データの一元管理・提供
- **Responsibilities**: 作品一覧の保持、slug検索、カテゴリ絞り込み、featured絞り込み

### pages/HomePage
- **Purpose**: サイトのトップページ。注目作品を表示
- **Responsibilities**: HeroSection表示、featured作品をWorkGridで表示

### pages/WorksPage
- **Purpose**: 全作品一覧ページ
- **Responsibilities**: カテゴリフィルターと作品グリッドの連携

### pages/WorkDetailPage
- **Purpose**: 個別作品の詳細ページ
- **Responsibilities**: slug から作品データを取得して詳細情報・画像ギャラリーを表示
