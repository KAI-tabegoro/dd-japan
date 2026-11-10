# 蔵の和 KURA no WA

小さな酒蔵・蒸溜所のお酒を紹介する Web サイトです。
HTML・CSS・JavaScript だけで動く静的サイトなので、ビルドは不要です。
GitHub にファイルを上げると、Vercel が自動でサイトを更新します（和食材カレンダーと同じ仕組み）。

## フォルダの中身

| 場所 | 内容 |
|---|---|
| `index.html` | トップページ |
| `products.html` | お酒を探す |
| `finder.html` | 味わい診断 |
| `breweries.html` | 酒蔵・蒸溜所を訪ねる |
| `learn.html` | 日本のお酒を知る |
| `admin.html` | 管理画面（検索エンジンには載りません） |
| `assets/` | 見た目（style.css）と動き（app.js） |
| `img/` | 画像。同じファイル名で上書きすれば差し替わります |
| `data/breweries.json` | 公開中の酒蔵・銘柄データ |
| `template/` | 酒蔵さんに配る Excel 入力テンプレート |

## 最初の公開手順

1. GitHub の KAI-tabegoro に新しいリポジトリ（例：`kuranowa`）を作ります。
2. このフォルダの中身をすべてリポジトリにアップロードします（「Add file」→「Upload files」）。
3. Vercel の washokuzaicalendar チームで「Add New…」→「Project」を選び、作ったリポジトリを Import します。
   - Framework Preset は「Other」のままで構いません。ビルドコマンドも不要です。
4. 「Deploy」を押すと、数十秒で `〜.vercel.app` のアドレスで公開されます。
5. 独自ドメインを使う場合は、Vercel のプロジェクト設定「Domains」から追加します。

## 公開準備中の設定（正式公開時に外す）

今はサンプル段階のため、検索エンジンに載らない設定にしています。

- 各HTMLの `<meta name="robots" content="noindex,nofollow">`（`admin.html` 以外は正式公開時に削除）
- `robots.txt` の `Disallow: /`（正式公開時は `Disallow: /admin.html` に変更）

この設定は「検索に出さない」だけで、アドレスを知っている人は見られます。
特定の人だけに見せたい場合は、Vercel のプロジェクト設定「Deployment Protection」で制限してください。

## 酒蔵データの更新手順

1. `admin.html`（例：`https://〜/admin.html`）を開きます。
2. 酒蔵さんから届いた Excel をドロップして取り込みます。
3. 一覧の「確認」で表示を確かめます。
4. 「公開用データを保存」を押して `breweries.json` を保存します。
5. GitHub の `data` フォルダに `breweries.json` をアップロードし、「Commit changes」を押します。
6. 1〜2分でサイトに反映されます。

- 作業中の内容は、そのパソコンのブラウザに残ります。別のパソコンで続きをする場合は、先に公開してください。
- 管理画面は誰でも開けますが、サイトを書き換えられるのは GitHub に上げられる人だけです。
- 公開中の酒蔵がひとつもない間は、見本（架空データ）が表示されます。

## 画像の差し替え

`img/` の中の同じファイル名で上書きしてください。推奨サイズは次のとおりです。

| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `hero.jpg` | メインビジュアル（文字なし・16:9） | 横 1600px 以上 |
| `pattern.jpg` | カテゴリー帯・下層ページ見出しの和柄背景 | 横 1600px 以上 |
| `brush.png` | 「JAPANESE SPIRITS」横の金の筆跡（透明背景） | 横 240px 程度 |
| `fuji.jpg` | 「日本のお酒の魅力」バナー | 横 1600px 以上 |
| `r-*.jpg` | 産地 7 枚 | 横 400 × 縦 270px 程度 |
| `f-*.jpg` | 特集カード 3 枚 | 横 800 × 縦 350px 程度 |
| `i-*.png` | カテゴリーアイコン（透明背景） | 128 × 128px |
| `logo-mark.png` | ロゴマーク（透明背景） | 192 × 192px |

縦横比が変わる場合は、`assets/style.css` の該当箇所も調整が必要です。
