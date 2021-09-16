---
title: ＃7 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - Vue.js
  - VuePress
  - JavaScript
  - CSS
  - Git
  - SQL
  - Firebase
date: 2021-09-21
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

2021/07/20〜09/10

## Laravel

- `.env`を書き換えたら、`php artisan config:cache`しないと反映されない。
- 基本的な使い方が書いてある
  - [Laravel によるアプリ開発のための逆引き Tips](https://qiita.com/kgsi/items/ccb1d70530f92268adfe#database-eloquent-orm)
- `Str::random()`…指定された長さのランダムな文字列を生成。このメソッドは、PHPの`random_bytes`関数と同じ
  - [Laravel日本語ドキュメント](https://readouble.com/laravel/6.x/ja/helpers.html#method-str-random)

```
use Illuminate\Support\Str;
$random = Str::random(40);
```

- Laravel の Storage はファイルダウンロード書き込みなどを行う
  - 具体的には、Blade テンプレートをコンパイルしたものやセッションのファイル、キャッシュファイル、その他フレームワークが作り出したファイルなんかが置かれる。
  - Laravel での画像保存・取得についてはこの記事を読むと良い。見せたいものはどこに置くのか？見られても良いものは？
  - [Laravel5.8 画像アップロード機能を仕組みから理解する](https://qiita.com/kei_Q/items/62cb8747280266956100)
- `make()`と`create()`の違い
  - `make()`…DB 作成し、保存まで一気通貫
  - `create()`…DB 作成した後、保存するメソッドだが、
  - `create()`はデータベースに保持される、`make()`はモデルの新しいインスタンスを作成するだけです。
    - create メソッドは、モデルインスタンスを作成するだけでなく、Eloquent の save メソッドを使用してデータベースに保存します
- `public function index(Request $request)`
  - この引数`（Request $request）`は『`サービスコンテナ`』という機能のおかげで簡単に`$request`が使える
    - `app/△Class/■Service.php`で自作のサービスコンテナを作ることが
      - `public function index(MyService, $myservice)`
- いくらモデルから fillable で使えるようにしていても、ファクトリーで定義しなければ、テストで使えない
  - デフォルト値を選ぶようにする
- `unit`と`Feature`のテストの違い
  - unit は生の PHP のテストである
    - テスト実行が早い
    - 面倒
      - モデルインスタンスを作成した後、テスト実行
  - feature テストは Laravel 用のテストである
    - テスト実行が遅い
    - 簡単
      - テストメソッドを呼び出すだけで済む
    - [https://qiita.com/ggg-mzkr/items/507c2921e442ad3ccab9](https://qiita.com/ggg-mzkr/items/507c2921e442ad3ccab9)
- DB からデータを取ろうとすると`deleted_at`が null のものだけを取ってくる。
  - DB 設計の場合には関連するものは `deleted_at`が必要
- 外部キーのマイグレーション
  - `$table->foreign('user_id')->references('id')->on('users');`
- Laravel の命名まとめ
  - [【laravel】laravel の命名規則](https://qiita.com/gone0021/items/e248c8b0ed3a9e6dbdee)
  - Laravel のコーディングルールの参考になる
    - [Laravel のコーディングルール](https://qiita.com/namizatork/items/79b0a8002575bc74dfd8)
  - bool の名称は`is_`や`can`から始まった方がいい
- [Tinkerwell web](https://web.tinkerwell.app/#/)…Web で Laravel のサンプルプログラムを動かせる
  - [Web で Laravel のサンプルプログラムを動かせる Tinkerwell](https://qiita.com/iitenkida7/items/16e267edec0ed22ba1bb)
- admin 画面を簡単に作ることができる
  - [laravel-admin でお手軽に管理画面を作る](https://enjoyworks.jp/tech-blog/7298)

### PHP

- 三項演算子
  - `変数 = (判定) ? 正の場合 : 偽の場合;`
  - DB のカラム => `snake_case`
  - PHP => `camelCase`

```
$point = 60;
$result = ($point >= 80) ? '合格' : '不合格';
echo $result;
```

## JavaScript

- `push()`…配列の末尾に要素を追加する
- `includes()`…配列に含まれていたら true。無ければ false を返す

```
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// output: true
```

- `console.log()`だけじゃないらしい。
  - [console.log()だけじゃない、覚えておくとデバッグ効率の向上に繋がる Console API](https://www.nxworld.net/js-console-api.html)
- 面白い動きをつけることができる。軽量・簡単[Anime.js をプロダクトで使用する 4 つの理由](https://qiita.com/yitora/items/6f4c917437dc36aa1edb)

## Vue.js(Nuxt)

- ▼この中にあるものはvueのトランザクションを使える。
```
<transition-group appear>
...
</transition-group>
```
- CSSクラスは`.v-enter-active`の方は表示された始まり
`.v-enter`は表示が終わる方
  - [Enter/Leave とトランジション一覧](https://jp.vuejs.org/v2/guide/transitions.html)
```
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
```

- vuex に値が来てないと思ったら、少しは疑った方がいいかも（devtools を疑うなんてしなくて、結構ハマった）
  - [Vue.js devtools が表示されない時のチェックポイント](https://blog.nocorica.jp/2018/08/vue-devtools-not-works/)
- vuepressのスタイルCSSを変えたい場合
  - `.vuepress > styles > index.styl`に CSS を書いていく
  - [デザインを変更する](https://tcsympo2019-test.firebaseapp.com/contents/chapter7.html#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)
- その他VuePressの設定
  - [VuePressで作ったblogに配布されているテーマを設定する](https://qiita.com/tomopict/items/9da7cf28c9bcd5f933cb#_reference-59ac9638e24cd1348e70)

## CSS

- 動的な動きは CSS がいい。JS でやってしまうと改修が難しくなってしまうから。
- メールのデザインや画像変換をした際は、複数のメーラーで確認
  - メーラーによってはデザイン崩れを起こす場合があるため
    - Gmail では svg を弾いてしまうので、png が安定らしい（Docomo メールは行けたけど）
    - > [メールには svg を使わない方が良い](https://docs.komagata.org/5441)
- 何かの要素を左右中央に揃えたいとき、`text-align: center;`でも`display: flex; justify-content: center;`でも、どちらでも同じ見た目になる場合が多い。
  - そもそもがレイアウトをするために存在するプロパティではない。
  - 何かの要素を左右中央に揃えたいときは`display: flex; justify-content: center;`を使い、テキスト`はtext-align: center;`を使う
    - [CSS を書くときは、プロパティや値の意味が自然になるものを選ぼう](https://qiita.com/xrxoxcxox/items/02e9f86a754aa705d2ed)
- [daisyUI Tailwind CSS Components](https://daisyui.com/)
  - 『Tailwind CSS』の使いやすいコンポーネントがまとまっている
- [Headless UI](https://headlessui.dev/)
  - js は依存していない CSS のライブラリのため、headlessUI でカバーできる

## SQL

- `id`には Bigint で決定。脳死で Bigint
  - 数値を扱う点は同じ
  - `Bigint`（こっちの方がメモリが大きい）と`int`（メモリが少なくて済む）
    - ID はとても多くなるため、Bigint なのだ！！
- 関係性が薄いテーブルは中間テーブルにする
  - `album -> page` OK
  - `album -> task_request` NG
    - つまり、もし album と task_request を繋げたいならば、`album_id <-> album_request <-> request_id`という中間テーブルを設ける
- PostgressSQL は`jsonフィールド`を置くことができる
- `unsigned`は整数飲み
- テーブル名は複数形
- `join`…foregin のものを一緒に引っ張ってこれる
  - task_comment -> account -> user
  - `select * from task_comments join users on accout_id = users.accout_id`
- `foreign` の場合には必ず同じ type（型）にする
  - users テーブルの id(int) -> task テーブル user_id(int)
- 本番での数のデータと近い数のデータがローカルにないと負荷対策やコスト対策にならない
- DB 設計においては`join`する際は 3 テーブルはよろしくない。できれば２階層以内がいい
- `ENUM型（列挙型）`…プログラムにデータを列挙しておくこと
  - [Laravel-enum の使い方](https://qiita.com/sayama0402/items/4e8a885fed367090de12)

```
public enum Fruit { //"class" ⇒ "enum" に書き換える
    //列挙子の定義
    APPLE,
    ORANGE,
    PEACH;
}
```

## Git

- 間違えて issue をクローズしてしまった時の対処（戻したい）
  - 「Reopen pull request」で戻せる
  - [GitHub 初歩的な不具合解消法](https://qiita.com/y-matsuya/items/1565d4c1551e0729c2b5#-%E8%AA%A4%E3%81%A3%E3%81%A6%E3%83%97%E3%83%AB%E3%83%AA%E3%82%AF%E3%82%92close%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88)

## その他

### プログラミング・エンジニアに関すること

- ソートをフロントでやるのはアンチパターン（100 件くらいなら OK）
- [画像を Base64 で HTML ファイルに直接埋め込む方法](https://edge.sincar.jp/web/base64-inline-image/)
- [API LIST](https://api.app-rox.com/)…使える API がまとめてある
- `ngrok（エングロック）`…とりあえず、開発環境でもドメインが欲しい場合（Web hook の検証とかで使いたいとか）。使える。
  - [ngrok を使って Mac で起動しているアプリをグローバルに公開してみる](https://blog.nakamu.life/posts/ngrok-mac)
- `Basic認証`…ページごとに ID とパスワードを要求する簡易的な認証システム
  - 特徴
    - ページ毎に毎回 ID とパスワードを検査する
    - 無い場合、一度『401 Authorization Required』を返しつつ、入力ダイアログが出る
    - ディレクトリやファイル単位で指定できる
    - ブラウザを閉じるまで有効である
  - メリット
    - HTMLのみしか使えないサーバー等でも、認証をさせたい時に使える。
    - staging環境などでプロキシを用いるほどでもないときに、簡単に認証を設定することができる
  - デメリット
    - 認証するページは全て 401 が返ってくるため、クローラーが対応できない。SEO 的に良くない
    - アルファベット・数字・特定の記号のみの『Base64』種類の文字を使うため、少ない。セキュリティ的に突破される可能性が高い
    - .htaccess ファイルが存在する部分のみを認証できるので、サーバーを跨いでの活動はできない
    - スマートフォンには対応していない
      - [ベーシック認証（Basic 認証）とは？設定方法と注意点・エラーになる原因を解説](https://www.itra.co.jp/webmedia/basic_authentication.html)
- `シンボリックリンク`…ファイルやフォルダなどの代理。（アクセスして直接触っている、確認や編集しているようで実際はダミーファイルを操作している）
  - 別ものだが、まるでそのファイルを操作しているようか感覚になる
  - 画像は S3 にあったりとか。
- API 一件で 1000 件以上を渡すのは多い。
  - API で 1000 件以内に収める
  - API を飛ばせば飛ばすほど、その API に絡んだプロパティなどの修正も多くなる
- メールアドレス、会社の名前など、影響の範囲が大きい変更可能性が高い定数は定数化する
- これくらいができるようになりたい。エンジニアが使う技術の基本がわかる。
  - [2021 年のエンジニア新人研修の講義資料を公開しました - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2021/07/20/100000)
- 工数見積もりがわかりやすかった
  - [【検証】30 万円のプログラミング案件の値段が妥当かエンジニアが見積もってみた
    ](https://youtu.be/6r-sE4ONYFI)
- `RFC（Request for Comments）`
  - php RFC…ドキュメントに描かれたコメントのこと
  - [PHP 開発者]PHP で〇〇の機能を追加しようと思うんだけど、必要かな？ -> [PHP 使用者]必要ないと思う。。。
    - みたいな正式に機能が実装されているわけではなく、構想段階での相談とコメント
- `技術仕様書`…それを読めば細かい設定も含めて、エンジニアが何も考えず、作れるもの
- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)…draw.io が VScode で書くことができるプラグイン
- Web ページは「F 型に読まれる」スキャンしているに近いため、飽きがこないページにするべし
  - [ウェブページを読む人の視線はどう動くのか、ウェブデザインやコンテンツ作成に役立つ調査結果が公開中](https://gigazine.net/news/20200626-how-people-read-online/)
- [Google Fonts](https://fonts.google.com/icons)
  - どの Web アプリでも活用できそう！
- レスポンシブは想像以上に余白マージンを取って良い（デザイン）
  - ユーザーはスクロールをなんとも思わないから。むしろ、一画面に情報がたくさんだと難しそうと思ってしまう
  - [使い続けてもらえるアプリ UX 開発で気を付けた 8 つのユーザー心理【個人開発】](https://qiita.com/herishiro/items/1f595fcd19e369c5895c)
- freee の UI がいい。
  - デザインかっこいい！とかじゃないけど、「特に無ければ〇〇で大丈夫です」とか
  - ユーザーガイドが先頭に出てきたりするのはすごい
- freee は見積書の提出ができる
- [無料の AI 音声合成ソフト「VOICEVOX」公開。商用利用も可](https://pc.watch.impress.co.jp/docs/news/1341708.html)
- [【Canva】便利すぎる「イラストチートシート」とは？使い方も解説](https://saruwakakun.com/design/canva/illsheet)
- [Twilio - KDDI Web Communications](https://cloudapi.kddi-web.com/?hsLang=ja-jp)

### ビジネス

- `イニシャルコスト`…始めるための初期投資のこと
- `ランニングコスト`…続けてることのコスト（賃料など）
- `サンクコスト`…やめられないコストのこと
- ジョセフ・キャンベルが提唱した『`ヒーローズ・ジャーニー(英雄の旅)`』
  - ① 日常の世界
  - ② 冒険への誘い
  - ③ 冒険への拒絶
  - ④ 賢者との出会い
  - ⑤ 第一関門突破
  - ⑥ 試練、仲間、敵
  - ⑦ 最も危険な場所への接近
  - ⑧ 最大の試練
  - ⑨ 報酬
  - ⑩ 帰路
  - ⑪ 復活
  - ⑫ 宝を持っての帰還
    - 応援したくなるストーリーコンテンツの王道はこれ
- `ヒットの法則`…恋愛と食事シーンを入れると共感されやすい
- クリエイターは作ったプロダクトから`思い出`を引き出せるものが高い価値を提供できる
- `オンボーディング`…新しいお客さんに慣れてもらうこと。
  - アプリだったら、使い慣れてもらうこと。企業だったら、人材を入れて戦力にすること
- メールはどれだけ送っても問題がないデータ
  - https://twitter.com/elmo_marketing/status/1425598081890865155?s=20
- 確定申告書や収支内訳書には年の 1 月 1 日から 12 月 31 日までの収支を記入し、翌年の 2 月 16 日から 3 月 15 日の間に税務署に提出。
- 白色申告に必要なもの
  - 収支内訳書
  - 確定申告書 B
- 青色申告は事業開始から 2 ヶ月以内に申告しないと来年からしかできなくなる。ただし、申告だけいつでも可能なので、来年からだとしてもとりあえず青色申告を行う。（白色申告はしない）

## 雑学

- 毎日おしゃれな壁紙に変わる。テンション上がるツール
  - [Unsplash Wallpapers](https://apps.apple.com/jp/app/unsplash-wallpapers/id1284863847?mt=12)
- 使えるノーコードを探したい時はこの記事を読むと良い
  - [生産性 100 倍！エンジニアが選ぶ明日から実用できる NoCode ツール 10 選](https://note.com/cohki0305/n/n029bae7121d7)
- `Google Language Translator`…WordPressサイトの端っこに翻訳ボタンを追加できるプラグイン
  - [【プラグイン】WordPressサイトにGoogle翻訳を設置する方法](https://tomolog.org/plugin-google-translate/)
- `バタフライエフェクト`…どこかで蝶が羽ばたいただけで、またどこかで嵐が起きること。
  - つまり、世界は複雑に繋がっていて、僕らが大したことないと思っていたことでも、繋がり大きな何かを引き起こすこと。
  - 小さな幸福も繋がると大きな幸福が待っていて、小さな怒りも繋がると大きな不幸をもたらすかもしれない
- `トレッキング`…山歩きのこと。登山ではない
  [8/17](https://sencorp-group.slack.com/archives/D01T0JN25DY/p1629174371000400)
