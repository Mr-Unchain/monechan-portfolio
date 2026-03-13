# Business Logic Model - Unit 1

## データ取得ロジック

### getAllWorks()
```
入力: なし
処理: GROQ "*[_type == 'work'] | order(year desc)"
出力: Work[] (年降順)
エラー: Sanity API エラー時は空配列を返す
```

### getFeaturedWorks()
```
入力: なし
処理: GROQ "*[_type == 'work' && featured == true] | order(year desc)"
出力: Work[] (featured=true のみ、年降順)
エラー: Sanity API エラー時は空配列を返す
```

### getWorkBySlug(slug)
```
入力: slug: string
処理: GROQ "*[_type == 'work' && slug.current == $slug][0]"
出力: Work | null
エラー: Sanity API エラー時は null を返す
```

### getAllWorkSlugs()
```
入力: なし
処理: GROQ "*[_type == 'work']{ 'slug': slug.current }"
出力: { slug: string }[]
用途: Next.js generateStaticParams() で使用
```

### getAboutContent()
```
入力: なし
処理: GROQ "*[_type == 'aboutPage'][0]"
出力: AboutContent | null
```

### getContactContent()
```
入力: なし
処理: GROQ "*[_type == 'contactPage'][0]"
出力: ContactContent | null
```

---

## 画像変換ロジック（urlFor）

```
入力: SanityImage (Sanity アセット参照)
処理: @sanity/image-url の urlFor(source).url()
出力: string (Sanity CDN の画像 URL)
使用箇所: WorkCard, WorkDetailPage の <Image src={urlFor(work.thumbnail).url()} />
```

---

## ISR キャッシュ無効化ロジック

```
トリガー: Sanity → Vercel Webhook POST
処理: next/cache の revalidatePath() または revalidateTag()
対象パス:
  - '/' (トップページ)
  - '/works' (一覧)
  - '/works/[slug]' (詳細 - 全スラッグ)
  - '/about'
  - '/contact'
結果: 次のリクエスト時に Sanity から最新データを取得して表示
```

---

## 環境変数ロジック

```
NEXT_PUBLIC_SANITY_PROJECT_ID  → client.ts の projectId
NEXT_PUBLIC_SANITY_DATASET     → client.ts の dataset
                                  開発: 'development'
                                  本番: 'production'
SANITY_API_TOKEN               → サーバーサイド専用（クライアントサイドに渡さない）
```
