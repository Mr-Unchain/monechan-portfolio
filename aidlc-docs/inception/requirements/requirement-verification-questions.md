# Requirements Clarification Questions

以下の質問に答えてください。各質問の `[Answer]:` タグの後にアルファベットを記入してください。
選択肢が合わない場合は最後の「Other」を選び、タグの後に説明を記入してください。

---

## Question 1
コンテンツ更新後、サイトへの反映タイミングはどうしたいですか？

A) もねちゃんが Sanity Studio で保存したら、数分以内に自動反映（ISR + Webhook）
B) もねちゃんが保存後、エンジニアが手動でデプロイするまで反映しない（SSG）
C) 即時反映でなくてよい。1日1回などのスケジュールで再ビルドする
D) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 2
About ページ（自己紹介）や Contact ページのテキストも、もねちゃんが Sanity から編集できるようにしますか？

A) はい、About・Contact も Sanity で管理したい
B) いいえ、作品データ（Works）だけを Sanity で管理する
C) 今は Works だけ。将来的に拡張できる設計にしてほしい
D) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 3
作品の説明文（description）の形式はどうしますか？

A) プレーンテキストのみ（現状と同じ）
B) リッチテキスト（太字・リンク・箇条書きなどが使えるPortable Text）
C) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 4
Sanity Studio へのアクセス権限はどう管理しますか？

A) もねちゃんだけが編集できる（Editor権限）、自分（エンジニア）は管理者
B) もねちゃんと自分の両方が同じ権限で編集できる
C) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 5
開発環境と本番環境のデータセットは分けますか？

A) はい、`development` と `production` を分ける（本番データを壊さない）
B) いいえ、1つのデータセットで管理する（シンプルに）
C) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 6
既存の作品データ（現在 works.ts にある6件）は Sanity に移行しますか？

A) はい、既存6件をそのまま Sanity に移行する
B) いいえ、Sanity 側は空から始め、もねちゃんが入力する
C) Other (please describe after [Answer]: tag below)

[Answer]:A

---

## Question 7
作品のスラッグ（URL）について。もねちゃんが Sanity Studio でスラッグを変更した場合、既存のURLが404になります。どう対応しますか？

A) スラッグは変更不可にする（Sanity でロック）
B) 変更可能だが、変更したら古いURLのリダイレクト設定を手動でする
C) スラッグは自動生成のみで、もねちゃんは変更できない
D) Other (please describe after [Answer]: tag below)

[Answer]:A
