# 工務店のコーポレートサイト「ひだまり住まい工房」（HTML / CSS / JavaScript）

架空の地域の工務店の、5ページ構成のコーポレートサイトです。

フレームワークを使わず、HTML・CSS・JavaScript だけで作っています。サーバーがなくても動くので、そのまま公開・納品できます。

> このサイトはポートフォリオ用の見本です。会社・住所・電話番号・人物は実在しません。

## ページ構成

| ページ | ファイル | 内容 |
|---|---|---|
| トップ | `index.html` | 大きな写真のファーストビュー、選ばれる理由、事業内容、施工事例の抜粋、お知らせ |
| 事業内容 | `service.html` | 3つの事業と料金の目安（表）、工事の流れ（6ステップ） |
| 施工事例 | `works.html` | 種類での絞り込み、写真の拡大表示（前へ・次へ） |
| 会社概要 | `company.html` | 代表あいさつ、会社情報、沿革、案内図（SVGで作成） |
| お問い合わせ | `contact.html` | 入力チェック付きのフォーム（見本のため送信はしません） |

## 工夫した点

- **複数ページで統一感を出す設計**：色・文字・余白をCSS変数にまとめ、見出し・ボタン・表などの部品を全ページで使い回しています。ページを増やしても、見た目がそろいます
- **写真を活かしたあたたかいデザイン**：見出しに明朝体、背景に生成り色、アクセントに木の茶色と深い緑を使い、工務店らしい信頼感を出しています
- **施工事例の絞り込みと拡大表示**：絞り込んだ事例の中だけで「前へ・次へ」が切り替わります。キーボード（矢印キー・Esc）でも操作でき、閉じると元の写真にフォーカスが戻ります
- **お問い合わせフォーム**：ラジオボタン・メール形式・電話番号の形式・文字数・同意チェックを、欄ごとにチェックしてエラーを表示します
- **スマートフォン対応**：開閉式メニュー、1列レイアウト、写真の上の文字が読みやすい暗さの調整、見出しが変な位置で改行しないサイズ調整
- **アクセシビリティ**：「本文へ移動」リンク、現在のページの表示（`aria-current`）、パンくずリスト、案内図の説明文、「動きを減らす」設定への対応

## 写真のクレジット

写真はすべて [Unsplash](https://unsplash.com/) のものを、[Unsplash License](https://unsplash.com/license) のもとで使用しています。

| ファイル | 撮影者 |
|---|---|
| `images/exterior.jpg` | Se. Tsuchiya |
| `images/hero.jpg` | Polina Kuzovkova |
| `images/craft-pencil.jpg` | Craft Kitties |
| `images/craft-joiner.jpg` | Janosch Lino |
| `images/case-kitchen.jpg` | Clay Banks |
| `images/case-stairs.jpg` | Andrea Davis |
| `images/case-beams.jpg` | rawkkim |
| `images/case-rustic.jpg` | Barnabas Davoti |

## 確認方法

`index.html` をブラウザで開くか、次のコマンドでローカルサーバーを起動して `http://localhost:8000` を開きます。

```bash
python3 -m http.server 8000
```
