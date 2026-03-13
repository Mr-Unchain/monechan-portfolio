# Business Rules - Unit 1

## Work スキーマのビジネスルール

### BR-01: スラッグは変更不可
- `slug` フィールドは `readOnly: true` で設定する
- Sanity Studio 上でもねちゃんがスラッグを変更できない
- **理由**: URL の安定性。スラッグ変更でサイトに 404 が発生するのを防ぐ

### BR-02: カテゴリは3択のみ
- `category` は `list` 型で `['uiux', 'web', 'graphic']` のみ選択可能
- Studio 上では日本語ラベルで表示する（UI/UX / Web / グラフィック）

### BR-03: featured は boolean
- `featured: true` の作品のみトップページに表示される
- デフォルト値: `false`

### BR-04: 画像は Sanity CDN を使用
- `thumbnail` と `images` は Sanity Image 型
- `hotspot: true` を設定し、Studio 上でトリミングポイントを指定できる
- 外部 URL や相対パスは使用しない

### BR-05: 多言語フィールドは両方必須
- `title`・`description`・`role` の `ja` と `en` は両方入力必須
- Sanity バリデーションで `validation: Rule => Rule.required()` を設定

### BR-06: year は正の整数
- `year` フィールドは 1900 以上・現在年以下の整数のみ許可

---

## AboutPage / ContactPage のビジネスルール

### BR-07: シングルトンドキュメント
- `aboutPage` と `contactPage` はそれぞれ1件のみ存在する
- Sanity Studio で「新規作成」ボタンを非表示にし、誤って複数作成できないようにする

### BR-08: email フォーマット
- `ContactPage.email` は valid なメールアドレス形式のみ許可

---

## GROQ クエリのビジネスルール

### BR-09: Works の並び順
- 全作品取得時は `year` 降順で返す（新しいものが上に来る）

### BR-10: featured 絞り込み
- `getFeaturedWorks()` は `featured == true` のみ返す

### BR-11: slug 検索
- `getWorkBySlug(slug)` は完全一致で1件のみ返す
- 該当なしの場合は `null` を返す（404 処理はページ側で行う）
