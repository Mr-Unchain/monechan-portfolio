# Domain Entities - Unit 1

## Work エンティティ

```
Work {
  _id:          string          // Sanity ドキュメント ID（自動生成）
  _type:        'work'          // Sanity タイプ識別子
  slug:         string          // URL識別子（readOnly）例: 'mobile-banking-app'
  title:        LocaleString    // { ja: string, en: string }
  description:  LocaleText      // { ja: string, en: string } プレーンテキスト
  category:     WorkCategory    // 'uiux' | 'web' | 'graphic'
  thumbnail:    SanityImage     // Sanity Image アセット（hotspot対応）
  images:       SanityImage[]   // ギャラリー画像配列
  role:         LocaleString    // { ja: string, en: string }
  tools:        string[]        // 使用ツール一覧
  year:         number          // 制作年（例: 2024）
  featured:     boolean         // トップページ掲載フラグ
}
```

## AboutPage エンティティ（シングルトン）

```
AboutPage {
  _id:          'aboutPage'     // 固定ID（シングルトン）
  _type:        'aboutPage'
  name:         LocaleString    // { ja: string, en: string }
  bio:          LocaleText      // { ja: string, en: string } 自己紹介文
  skills:       string[]        // スキル一覧
  profileImage: SanityImage?    // プロフィール画像（任意）
}
```

## ContactPage エンティティ（シングルトン）

```
ContactPage {
  _id:          'contactPage'   // 固定ID（シングルトン）
  _type:        'contactPage'
  heading:      LocaleString    // { ja: string, en: string }
  description:  LocaleText      // { ja: string, en: string }
  email:        string          // 連絡先メールアドレス
}
```

## 共通型定義

```
LocaleString {
  ja: string    // 日本語テキスト（短文）
  en: string    // 英語テキスト（短文）
}

LocaleText {
  ja: string    // 日本語テキスト（長文）
  en: string    // 英語テキスト（長文）
}

WorkCategory = 'uiux' | 'web' | 'graphic'

SanityImage {
  asset:     SanityAssetRef    // Sanity CDN アセット参照
  hotspot?:  ImageHotspot      // トリミングポイント（任意）
  crop?:     ImageCrop         // クロップ設定（任意）
}
```

## エンティティ関係

```
Work (多数) ─── SanityImage (多数)
AboutPage (1) ─── SanityImage (0 or 1)
ContactPage (1) ─── (画像なし)
```
